import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import { getService } from '../shared/catalog.js';

const safeText = value => String(value ?? '').replace(/[^\x20-\x7E\u00A0-\u00FF]/g, ' ');
export async function createLetter(record, { draft = false, attachment = false } = {}) {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);
  let page = doc.addPage([595.28, 841.89]);
  let y = 790;
  const ink = rgb(.1,.18,.15);
  function line(text, size = 12, opts = {}) {
    const font = opts.bold ? bold : regular;
    const clean = safeText(text);
    const x = opts.center ? (595.28 - font.widthOfTextAtSize(clean, size)) / 2 : 58;
    page.drawText(clean, { x, y, size, font, color: ink });
    y -= opts.space || size * 1.65;
  }
  function paragraph(text, size = 12) {
    let current = '';
    const words = safeText(text).split(/\s+/).flatMap(word => {
      const parts=[];
      while(regular.widthOfTextAtSize(word,size)>475) {
        let end=1;
        while(end<word.length&&regular.widthOfTextAtSize(word.slice(0,end+1),size)<=475) end++;
        parts.push(word.slice(0,end));word=word.slice(end);
      }
      return [...parts,word];
    });
    for (const word of words) {
      if (regular.widthOfTextAtSize(current + ' ' + word, size) > 475 && current) {
        line(current, size); current = word;
        if (y < 140) { page = doc.addPage([595.28,841.89]); y = 780; }
      } else current = current ? current + ' ' + word : word;
    }
    if (current) line(current,size);
    y -= 10;
  }
  line('PROTOTIPE AKADEMIK', 11, { bold:true, center:true });
  line('DESA AIR MESU BARAT', 18, { bold:true, center:true });
  line('Kecamatan Pangkalan Baru, Kabupaten Bangka Tengah',11,{center:true});
  line('Provinsi Kepulauan Bangka Belitung',11,{center:true});
  line('CONTOH - TIDAK BERLAKU',12,{bold:true,center:true,space:28});
  page.drawLine({start:{x:58,y:y+12},end:{x:537,y:y+12},thickness:1,color:ink});
  y -= 14;
  if (attachment) {
    line('LAMPIRAN CONTOH UNTUK DEMONSTRASI',15,{bold:true,center:true});
    paragraph('Berkas ini bukan KTP atau kartu keluarga. Seluruh isi merupakan data contoh untuk menguji alur pengajuan surat.');
    paragraph('Pemohon contoh: Warga Demo. Identitas contoh: DEMO-0001.');
  } else {
    const service = getService(record.service_id);
    const data = typeof record.form_data === 'string' ? JSON.parse(record.form_data) : record.form_data;
    line(service.title.toUpperCase(),14,{bold:true,center:true});
    line(draft ? 'DRAF - BELUM DITERBITKAN' : `Nomor: ${record.letter_number}`,12,{center:true,space:28});
    paragraph('Dalam simulasi layanan administrasi desa ini, diterangkan bahwa pemohon dengan data berikut mengajukan surat untuk keperluan yang tercantum.');
    for (const [label,key] of [['Nama','name'],['Identitas contoh','identity'],['Alamat contoh','address'],['Pekerjaan','occupation'],['Keperluan','purpose']]) {
      paragraph(`${label}: ${data[key] || '-'}`);
    }
    if (service.id==='usaha') {
      for (const field of service.fields) paragraph(`${field.label}: ${data[field.key]}`);
    }
    paragraph('Surat ini dibuat otomatis dari data contoh yang diajukan. Dokumen ini hanya digunakan untuk demonstrasi mata kuliah Komputer dan Masyarakat dan tidak memiliki fungsi administratif resmi.');
    if (y < 200) { page = doc.addPage([595.28,841.89]); y=780; }
    y -= 16;
    const date = new Date(record.issued_at ? record.issued_at.replace(' ','T')+'Z' : Date.now()).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Jakarta'});
    line(`Tanggal ${draft ? 'pratinjau' : 'penerbitan'}: ${date}`,12);
    line(draft ? 'Menunggu pemeriksaan operator demo' : 'Disetujui oleh operator demo',12,{bold:true});
    line('Pengesahan simulasi, tanpa tanda tangan atau cap resmi',10);
  }
  for (const p of doc.getPages()) {
    p.drawText('CONTOH', {x:120,y:350,size:75,font:bold,color:rgb(.9,.92,.9),rotate:degrees(28),opacity:.35});
    p.drawText('Prototipe akademik | Seluruh data merupakan contoh', {x:58,y:45,size:9,font:regular,color:ink});
  }
  doc.setTitle(attachment ? 'Lampiran contoh' : draft ? 'Draf surat contoh' : `Surat contoh ${record.letter_number}`);
  doc.setAuthor('Prototipe Desa Air Mesu Barat');
  return Buffer.from(await doc.save());
}
