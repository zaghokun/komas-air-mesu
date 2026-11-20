import express from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pool, transaction } from './db.js';
import { checkPassword, newSession, currentUser, requireUser, requireOperator, sessions, sessionToken } from './auth.js';
import { createLetter } from './pdf.js';
import { seedDemo } from '../scripts/setup-db.mjs';
import { services, getService } from '../shared/catalog.js';

export const app = express();
app.disable('x-powered-by');
app.use(express.json({limit:'32kb'}));
app.use((req,res,next) => {
  res.set('Cache-Control','no-store');
  res.set('X-Content-Type-Options','nosniff');
  if (!['GET','HEAD','OPTIONS'].includes(req.method)) {
    if(req.get('X-Requested-With')!=='AirMesuPrototype') return res.status(403).json({error:'Permintaan tidak dikenali.'});
    const origin = req.get('origin');
    if(origin && !/^http:\/\/(localhost|127\.0\.0\.1):(5173|4173|3001)$/.test(origin)) return res.status(403).json({error:'Asal permintaan tidak diizinkan pada server lokal.'});
  }
  next();
});
const upload = multer({storage:multer.memoryStorage(),limits:{fileSize:2*1024*1024,files:3,fields:5}});
const fail = (status,message) => Object.assign(new Error(message),{status});
const decode = row => ({...row, form_data:typeof row.form_data==='string'?JSON.parse(row.form_data):row.form_data});
function parseForm(body,service) {
  let data;
  try {data=JSON.parse(body.form);} catch {throw fail(422,'Data formulir tidak terbaca. Periksa isian lalu kirim ulang.');}
  const clean={};
  for(const [key,max] of [['name',80],['identity',30],['address',250],['occupation',80],['purpose',500],...service.fields.map(field=>[field.key,150])]) {
    if(typeof data[key]!=='string'||data[key].trim().length<2||data[key].trim().length>max) throw fail(422,`Isian ${key} wajib diisi dan maksimal ${max} karakter.`);
    clean[key]=data[key].trim();
  }
  if(!/^DEMO-[A-Z0-9-]{2,24}$/.test(clean.identity)) throw fail(422,'Gunakan identitas contoh berawalan DEMO-, bukan NIK asli.');
  if(body.consent!=='true') throw fail(422,'Konfirmasi penggunaan data contoh sebelum mengirim.');
  return clean;
}
function validateFiles(files) {
  for(const file of files||[]) {
    const b=file.buffer;
    const valid=(file.mimetype==='application/pdf'&&b.subarray(0,5).toString()==='%PDF-')||
      (file.mimetype==='image/png'&&b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))||
      (file.mimetype==='image/jpeg'&&b[0]===255&&b[1]===216&&b[2]===255);
    if(!valid) throw fail(422,'Lampiran harus PDF, PNG, atau JPG yang valid, maksimal 2 MB per berkas.');
  }
}
async function insertFiles(c,id,files) {
  for(const file of files) await c.execute('INSERT INTO attachments (id,request_id,name,mime,data) VALUES (?,?,?,?,?)',[randomUUID(),id,file.originalname.replace(/[^a-zA-Z0-9._ -]/g,'_').slice(0,120),file.mimetype,file.buffer]);
}
async function accessible(id,user,c=pool,lock=false) {
  const [rows]=await c.execute(`SELECT id,code,owner_id,service_id,form_data,status,letter_number,issued_at,created_at,updated_at FROM requests WHERE id=?${lock?' FOR UPDATE':''}`,[id]);
  const row=rows[0];
  if(!row||(user.role!=='operator'&&row.owner_id!==user.id)) throw fail(404,'Pengajuan tidak ditemukan atau tidak dapat diakses akun ini.');
  return decode(row);
}
async function countUp(c,name) {
  await c.execute('INSERT IGNORE INTO counters (name,value) VALUES (?,0)',[name]);
  const [[row]]=await c.execute('SELECT value FROM counters WHERE name=? FOR UPDATE',[name]);
  await c.execute('UPDATE counters SET value=? WHERE name=?',[row.value+1,name]);
  return row.value+1;
}
async function addHistory(c,id,status,note,user) {
  await c.execute('INSERT INTO history (request_id,status,note,actor) VALUES (?,?,?,?)',[id,status,note,user.name]);
}
app.get('/api/health',async(req,res)=>{await pool.query('SELECT 1');res.json({ok:true,database:'MySQL Laragon',mode:'local'});});
app.get('/api/services',(req,res)=>res.json(services));
app.get('/api/session',(req,res)=>res.json({user:currentUser(req)}));
const loginAttempts=new Map();
app.post('/api/login',async(req,res)=>{
  const key=req.ip;
  const attempt=loginAttempts.get(key);
  if(attempt&&attempt.until>Date.now()&&attempt.count>=15) throw fail(429,'Terlalu banyak percobaan. Tunggu satu menit lalu coba lagi.');
  if(!attempt||attempt.until<Date.now()) loginAttempts.set(key,{count:0,until:Date.now()+60000});
  loginAttempts.get(key).count++;
  const {email,password}=req.body;
  if(typeof email!=='string'||typeof password!=='string'||email.length>100||password.length>128) throw fail(422,'Isi email dan kata sandi akun demo.');
  const [[user]]=await pool.execute('SELECT * FROM users WHERE email=?',[email.toLowerCase().trim()]);
  if(!user||!checkPassword(password,user.password_hash)) throw fail(401,'Email atau kata sandi tidak sesuai. Gunakan akun demo yang tersedia.');
  const publicUser={id:user.id,email:user.email,name:user.name,role:user.role};
  const token=newSession(publicUser);
  res.cookie('amb_session',token,{httpOnly:true,sameSite:'strict',maxAge:8*60*60*1000,path:'/'});
  res.json({user:publicUser});
});
app.post('/api/logout',requireUser,(req,res)=>{sessions.delete(sessionToken(req));res.clearCookie('amb_session',{path:'/'});res.json({ok:true});});
app.get('/api/sample-attachment',requireUser,async(req,res)=>{res.type('pdf');res.set('Content-Disposition','inline; filename="lampiran-contoh.pdf"');res.send(await createLetter({}, {attachment:true}));});
app.get('/api/requests',requireUser,async(req,res)=>{
  const operator=req.user.role==='operator';
  const [rows]=await pool.execute(`SELECT id,code,owner_id,service_id,form_data,status,letter_number,issued_at,created_at,updated_at FROM requests ${operator?'':'WHERE owner_id=?'} ORDER BY created_at DESC, code DESC LIMIT 200`,operator?[]:[req.user.id]);
  res.json(rows.map(decode));
});
app.get('/api/requests/:id',requireUser,async(req,res)=>{
  const row=await accessible(req.params.id,req.user);
  const [history]=await pool.execute('SELECT status,note,actor,created_at FROM history WHERE request_id=? ORDER BY id',[row.id]);
  const [attachments]=await pool.execute('SELECT id,name,mime,OCTET_LENGTH(data) AS size FROM attachments WHERE request_id=?',[row.id]);
  res.json({...row,history,attachments});
});
app.post('/api/requests',requireUser,upload.array('attachments',3),async(req,res)=>{
  if(req.user.role!=='citizen') throw fail(403,'Gunakan akun warga untuk membuat pengajuan.');
  const service=getService(req.body.service);
  if(!service) throw fail(422,'Pilih jenis surat yang tersedia.');
  const data=parseForm(req.body,service);
  validateFiles(req.files);
  if(!req.files?.length) throw fail(422,'Tambahkan lampiran contoh atau gunakan berkas contoh yang tersedia.');
  const result=await transaction(async c=>{
    const seq=await countUp(c,'request');
    const id=randomUUID();const code=`DEMO-AM-${String(seq).padStart(3,'0')}`;
    await c.execute('INSERT INTO requests (id,code,owner_id,service_id,form_data,status) VALUES (?,?,?,?,?,?)',[id,code,req.user.id,service.id,JSON.stringify(data),'submitted']);
    await insertFiles(c,id,req.files);
    await addHistory(c,id,'submitted','Pengajuan diterima dan menunggu pemeriksaan operator.',req.user);
    return {id,code};
  });
  res.status(201).json(result);
});
app.put('/api/requests/:id',requireUser,upload.array('attachments',3),async(req,res)=>{
  validateFiles(req.files);
  const result=await transaction(async c=>{
    const row=await accessible(req.params.id,req.user,c,true);
    if(req.user.role!=='citizen'||row.owner_id!==req.user.id) throw fail(403,'Hanya pemohon yang dapat memperbaiki pengajuan.');
    if(row.status!=='revision') throw fail(409,'Pengajuan ini tidak sedang menunggu perbaikan.');
    const data=parseForm(req.body,getService(row.service_id));
    if(req.files?.length) {await c.execute('DELETE FROM attachments WHERE request_id=?',[row.id]);await insertFiles(c,row.id,req.files);}
    await c.execute('UPDATE requests SET form_data=?,status=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[JSON.stringify(data),'submitted',row.id]);
    await addHistory(c,row.id,'submitted','Pemohon mengirim perbaikan untuk diperiksa kembali.',req.user);
    return {id:row.id,code:row.code};
  });
  res.json(result);
});
app.post('/api/requests/:id/action',requireUser,requireOperator,async(req,res)=>{
  const {action,note=''}=req.body;
  if(!['process','revision','reject','approve'].includes(action)) throw fail(422,'Tindakan tidak tersedia.');
  if(typeof note!=='string'||note.length>1000) throw fail(422,'Catatan maksimal 1000 karakter.');
  if(['revision','reject'].includes(action)&&note.trim().length<5) throw fail(422,'Tuliskan alasan atau catatan perbaikan minimal 5 karakter.');
  const result=await transaction(async c=>{
    const row=await accessible(req.params.id,req.user,c,true);
    if(action==='approve'&&row.status==='completed') return {id:row.id,status:row.status,letter_number:row.letter_number};
    if(['completed','rejected'].includes(row.status)) throw fail(409,'Pengajuan sudah ditutup dan tidak dapat diubah.');
    if(row.status==='revision') throw fail(409,'Tunggu pemohon mengirim perbaikan sebelum melanjutkan.');
    const next={process:'processing',revision:'revision',reject:'rejected',approve:'completed'}[action];
    let number=null;
    if(action==='approve') {
      const [[files]]=await c.execute('SELECT COUNT(*) AS total FROM attachments WHERE request_id=?',[row.id]);
      if(!files.total) throw fail(422,'Lampiran pengajuan belum tersedia.');
      const sequence=await countUp(c,'letter');
      const year=new Date().toLocaleDateString('en',{year:'numeric',timeZone:'Asia/Jakarta'});
      number=`CONTOH/${String(sequence).padStart(3,'0')}/${getService(row.service_id).code}/${year}`;
      const issued=new Date().toISOString().slice(0,19).replace('T',' ');
      const pdf=await createLetter({...row,letter_number:number,issued_at:issued});
      await c.execute('UPDATE requests SET status=?,letter_number=?,issued_at=?,letter_pdf=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[next,number,issued,pdf,row.id]);
    } else await c.execute('UPDATE requests SET status=?,updated_at=UTC_TIMESTAMP() WHERE id=?',[next,row.id]);
    const message=note.trim()||{process:'Berkas diperiksa dan draf sedang diproses.',approve:'Operator menyetujui pengajuan. Surat contoh tersedia untuk diunduh.'}[action];
    await addHistory(c,row.id,next,message,req.user);
    return {id:row.id,status:next,letter_number:number};
  });
  res.json(result);
});
app.get('/api/requests/:id/pdf',requireUser,async(req,res)=>{
  const row=await accessible(req.params.id,req.user);
  const draft=req.query.draft==='1';
  let bytes;
  if(draft) bytes=await createLetter(row,{draft:true});
  else {
    if(row.status!=='completed') throw fail(409,'Surat belum diterbitkan.');
    const [[record]]=await pool.execute('SELECT letter_pdf FROM requests WHERE id=?',[row.id]);
    if(!record.letter_pdf) throw fail(409,'Hasil PDF belum tersedia. Hubungi operator demo.');
    bytes=record.letter_pdf;
  }
  res.type('pdf');res.set('Content-Disposition',`${req.query.download==='1'?'attachment':'inline'}; filename="${draft?'draf':'surat'}-${row.code}.pdf"`);res.send(bytes);
});
app.get('/api/attachments/:id',requireUser,async(req,res)=>{
  const [[file]]=await pool.execute('SELECT * FROM attachments WHERE id=?',[req.params.id]);
  if(!file) throw fail(404,'Lampiran tidak ditemukan.');
  await accessible(file.request_id,req.user);
  res.type(file.mime);res.set('Content-Disposition',`inline; filename="${file.name}"`);res.send(file.data);
});
app.post('/api/demo/reset',requireUser,requireOperator,async(req,res)=>{
  if(req.body.confirm!=='RESET DATA CONTOH') throw fail(422,'Konfirmasi reset data contoh diperlukan.');
  await transaction(async c=>{
    await c.execute('DELETE FROM requests');
    await c.execute('DELETE FROM counters');
    await seedDemo(c);
  });
  res.json({ok:true});
});
app.use('/api',(req,res)=>res.status(404).json({error:'Alamat API tidak ditemukan.'}));
app.use((error,req,res,next)=>{
  if(res.headersSent) return next(error);
  if(error instanceof multer.MulterError) return res.status(422).json({error:'Maksimal 3 lampiran, masing-masing 2 MB.'});
  const status=error.status||503;
  if(!error.status) console.error(error.code||error.message);
  res.status(status).json({error:error.status?error.message:'Layanan data belum terhubung. Pastikan MySQL Laragon aktif dan jalankan npm run db:setup.'});
});
if(process.argv[1]&&fileURLToPath(import.meta.url)===fileURLToPath(new URL('file:///'+process.argv[1].replaceAll('\\','/')))) {
  app.listen(Number(process.env.API_PORT||3001),process.env.HOST||'127.0.0.1',()=>console.log('API lokal: http://127.0.0.1:3001'));
}
