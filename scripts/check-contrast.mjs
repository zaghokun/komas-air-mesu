const luminance=hex=>{
  const channels=hex.replace('#','').match(/../g).map(value=>parseInt(value,16)/255).map(value=>value<=.03928?value/12.92:((value+.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
};
const pairs=[
  ['Isi utama','#203a31','#ffffff',4.5],['Teks sekunder','#53665d','#f3f6f3',4.5],
  ['Tombol utama','#ffffff','#174c3c',4.5],['Tombol aksen','#23382d','#edcd80',4.5],
  ['Status diajukan','#3b5143','#edf1ed',4.5],['Status perbaikan','#694909','#fff0c9',4.5],
  ['Status proses','#215343','#e4eeeb',4.5],['Status selesai','#1e5032','#dceee1',4.5],
  ['Status ditolak','#8a202b','#fbe7e9',4.5],['Catatan berhasil','#20503a','#edf5ef',4.5],
  ['Bantuan footer','#cddcd2','#102f26',4.5],['Teks band layanan','#e1eae3','#174c3c',4.5],
  ['Tautan pada band','#f0d79a','#174c3c',4.5],['Batas input','#73857a','#ffffff',3],
  ['Fokus pada putih','#a05d0b','#ffffff',3],['Fokus pada hijau','#edcd80','#174c3c',3],
  ['Teks hero, batas atas latar putih di bawah scrim','#ffffff','#4a5a53',4.5],
  ['Judul besar aksen hero','#edcd80','#4a5a53',3]
];
let failed=false;
for(const [label,foreground,background,minimum] of pairs){
  const values=[luminance(foreground),luminance(background)].sort((a,b)=>b-a);
  const ratio=(values[0]+.05)/(values[1]+.05);
  const pass=ratio>=minimum;if(!pass)failed=true;
  console.log(`${pass?'PASS':'FAIL'} ${label}: ${ratio.toFixed(2)}:1 (minimum ${minimum})`);
}
if(failed)process.exitCode=1;
