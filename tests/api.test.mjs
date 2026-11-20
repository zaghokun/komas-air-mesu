import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument } from 'pdf-lib';

process.env.DB_NAME='air_mesu_barat_tests_prototype';
const { setup }=await import('../scripts/setup-db.mjs');
const { pool }=await import('../server/db.js');
const { app }=await import('../server/index.js');

test('alur persuratan dan pembatasan peran pada database uji terpisah',async t=>{
  await setup();
  const server=app.listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  const base=`http://127.0.0.1:${server.address().port}/api`;
  async function request(url,{method='GET',body,cookie,headers={}}={}) {
    const options={method,headers:{'X-Requested-With':'AirMesuPrototype',...headers}};
    if(cookie)options.headers.Cookie=cookie;
    if(body instanceof FormData) options.body=body;
    else if(body!==undefined){options.headers['Content-Type']='application/json';options.body=JSON.stringify(body);}
    return fetch(base+url,options);
  }
  async function login(email,password){const response=await request('/login',{method:'POST',body:{email,password}});assert.equal(response.status,200);return response.headers.get('set-cookie').split(';')[0];}
  let citizen,operator,other,id,code;
  const form={name:'Pemohon Demo Uji',identity:'DEMO-UJI-01',address:'Alamat contoh uji',occupation:'Pekerjaan contoh',purpose:'Keperluan pengujian sistem'};
  let attachment;
  function submission(data=form,withFile=true){const body=new FormData();body.set('service','domisili');body.set('form',JSON.stringify(data));body.set('consent','true');if(withFile)body.append('attachments',new Blob([attachment],{type:'application/pdf'}),'lampiran-uji.pdf');return body;}
  try {
    await t.test('kesehatan database dan penolakan akses anonim',async()=>{assert.equal((await request('/health')).status,200);assert.equal((await request('/requests')).status,401);});
    await t.test('login salah dan asal permintaan ditolak',async()=>{assert.equal((await request('/login',{method:'POST',body:{email:'warga@demo.test',password:'salah'}})).status,401);assert.equal((await request('/login',{method:'POST',body:{},headers:{Origin:'https://example.com'}})).status,403);});
    citizen=await login('warga@demo.test','WargaDemo123!');operator=await login('operator@demo.test','OperatorDemo123!');other=await login('warga2@demo.test','WargaDemo123!');
    attachment=await (await request('/sample-attachment',{cookie:citizen})).arrayBuffer();
    await t.test('reset hanya untuk operator dan database contoh uji',async()=>{assert.equal((await request('/demo/reset',{method:'POST',cookie:citizen,body:{confirm:'RESET DATA CONTOH'}})).status,403);assert.equal((await request('/demo/reset',{method:'POST',cookie:operator,body:{confirm:'RESET DATA CONTOH'}})).status,200);});
    await t.test('akun warga kedua melihat daftar kosong',async()=>{const response=await request('/requests',{cookie:other});assert.deepEqual(await response.json(),[]);});
    await t.test('identitas asli dan lampiran tidak valid ditolak',async()=>{
      assert.equal((await request('/requests',{method:'POST',cookie:citizen,body:submission({...form,identity:'1234567890123456'})})).status,422);
      assert.equal((await request('/requests',{method:'POST',cookie:citizen,body:submission(form,false)})).status,422);
      const bad=submission(form,false);bad.append('attachments',new Blob(['not-a-pdf'],{type:'application/pdf'}),'berkas.pdf');assert.equal((await request('/requests',{method:'POST',cookie:citizen,body:bad})).status,422);
    });
    await t.test('pengajuan tersimpan dengan nomor dari server',async()=>{const response=await request('/requests',{method:'POST',cookie:citizen,body:submission()});assert.equal(response.status,201);const data=await response.json();id=data.id;code=data.code;const detail=await(await request('/requests/'+id,{cookie:citizen})).json();assert.equal(detail.status,'submitted');assert.equal(detail.form_data.name,form.name);assert.equal(detail.attachments.length,1);});
    await t.test('warga lain tidak bisa membaca data, lampiran, atau PDF',async()=>{assert.equal((await request('/requests/'+id,{cookie:other})).status,404);const detail=await(await request('/requests/'+id,{cookie:citizen})).json();assert.equal((await request('/attachments/'+detail.attachments[0].id,{cookie:other})).status,404);assert.equal((await request('/requests/'+id+'/pdf?draft=1',{cookie:other})).status,404);});
    await t.test('warga tidak dapat menyetujui surat dan PDF terbit belum tersedia',async()=>{assert.equal((await request('/requests/'+id+'/action',{method:'POST',cookie:citizen,body:{action:'approve'}})).status,403);assert.equal((await request('/requests/'+id+'/pdf',{cookie:citizen})).status,409);});
    await t.test('draf merupakan PDF yang dapat dibuka',async()=>{const response=await request('/requests/'+id+'/pdf?draft=1',{cookie:operator});assert.equal(response.status,200);const pdf=await PDFDocument.load(await response.arrayBuffer());assert.ok(pdf.getPageCount()>=1);assert.equal(pdf.getTitle(),'Draf surat contoh');});
    await t.test('permintaan perbaikan harus memiliki alasan',async()=>{assert.equal((await request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'revision',note:''}})).status,422);assert.equal((await request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'revision',note:'Mohon perjelas keperluan contoh.'}})).status,200);assert.equal((await request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'approve'}})).status,409);});
    await t.test('perbaikan mempertahankan nomor dan riwayat',async()=>{assert.equal((await request('/requests/'+id,{method:'PUT',cookie:citizen,body:submission({...form,purpose:'Keperluan contoh setelah perbaikan'},false)})).status,200);const data=await(await request('/requests/'+id,{cookie:citizen})).json();assert.equal(data.code,code);assert.equal(data.status,'submitted');assert.equal(data.history.length,3);assert.equal(data.attachments.length,1);});
    await t.test('operator memproses berkas',async()=>{const response=await request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'process'}});assert.equal(response.status,200);assert.equal((await response.json()).status,'processing');});
    await t.test('persetujuan bersamaan menghasilkan satu surat dan satu peristiwa',async()=>{
      const replies=await Promise.all([1,2].map(()=>request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'approve'}})));
      assert.deepEqual(replies.map(r=>r.status),[200,200]);const results=await Promise.all(replies.map(r=>r.json()));assert.equal(results[0].letter_number,results[1].letter_number);
      const detail=await(await request('/requests/'+id,{cookie:citizen})).json();assert.equal(detail.history.filter(h=>h.status==='completed').length,1);assert.equal(detail.status,'completed');
    });
    await t.test('PDF terbit tersimpan dan identik pada unduhan ulang',async()=>{
      const first=Buffer.from(await(await request('/requests/'+id+'/pdf',{cookie:citizen})).arrayBuffer());
      const second=Buffer.from(await(await request('/requests/'+id+'/pdf?download=1',{cookie:citizen})).arrayBuffer());assert.deepEqual(first,second);
      const pdf=await PDFDocument.load(first);assert.ok(pdf.getTitle().startsWith('Surat contoh CONTOH/'));assert.ok(pdf.getPageCount()>=1);
    });
    await t.test('surat terbit tidak bisa diedit atau ditolak ulang',async()=>{assert.equal((await request('/requests/'+id,{method:'PUT',cookie:citizen,body:submission()})).status,409);assert.equal((await request('/requests/'+id+'/action',{method:'POST',cookie:operator,body:{action:'reject',note:'Alasan uji'}})).status,409);});
    await t.test('penolakan dicatat dengan alasan',async()=>{const created=await(await request('/requests',{method:'POST',cookie:citizen,body:submission()})).json();const response=await request('/requests/'+created.id+'/action',{method:'POST',cookie:operator,body:{action:'reject',note:'Pengajuan contoh tidak sesuai keperluan.'}});assert.equal(response.status,200);assert.equal((await response.json()).status,'rejected');});
    await t.test('logout menghapus akses sesi',async()=>{assert.equal((await request('/logout',{method:'POST',cookie:other})).status,200);assert.equal((await request('/requests',{cookie:other})).status,401);});
  } finally {await new Promise(resolve=>server.close(resolve));await pool.end();}
});
