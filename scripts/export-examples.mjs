import { mkdir, writeFile } from 'node:fs/promises';
import { createLetter } from '../server/pdf.js';
import { services } from '../shared/catalog.js';

await mkdir('delivery/contoh-surat',{recursive:true});
const data={name:'Warga Demo',identity:'DEMO-0001',address:'Alamat contoh untuk presentasi',occupation:'Pekerjaan contoh',purpose:'Keperluan administrasi contoh',businessName:'Usaha Contoh',businessType:'Perdagangan contoh',businessAddress:'Lokasi usaha contoh'};
for(const service of services){
  const file=`delivery/contoh-surat/${service.id}-contoh.pdf`;
  await writeFile(file,await createLetter({service_id:service.id,form_data:data,letter_number:`CONTOH/001/${service.code}/2026`,issued_at:'2026-11-19 12:00:00'}));
  console.log(file);
}
