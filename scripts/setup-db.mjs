import mysql from 'mysql2/promise';
import { dbName, dbOptions, pool, transaction } from '../server/db.js';
import { hashPassword } from '../server/auth.js';
import { createLetter } from '../server/pdf.js';

export async function setup() {
  const admin = await mysql.createConnection(dbOptions);
  await admin.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.end();
  for (const statement of [
    `CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(100) UNIQUE NOT NULL, name VARCHAR(100) NOT NULL, role ENUM('citizen','operator') NOT NULL, password_hash VARCHAR(255) NOT NULL) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS requests (id CHAR(36) PRIMARY KEY, code VARCHAR(50) UNIQUE NOT NULL, owner_id INT NOT NULL, service_id VARCHAR(30) NOT NULL, form_data JSON NOT NULL, status VARCHAR(30) NOT NULL, letter_number VARCHAR(80) UNIQUE NULL, issued_at DATETIME NULL, letter_pdf LONGBLOB NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(owner_id) REFERENCES users(id)) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS history (id INT PRIMARY KEY AUTO_INCREMENT, request_id CHAR(36) NOT NULL, status VARCHAR(30) NOT NULL, note TEXT NOT NULL, actor VARCHAR(100) NOT NULL, created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(request_id) REFERENCES requests(id) ON DELETE CASCADE) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS attachments (id CHAR(36) PRIMARY KEY, request_id CHAR(36) NOT NULL, name VARCHAR(150) NOT NULL, mime VARCHAR(80) NOT NULL, data MEDIUMBLOB NOT NULL, FOREIGN KEY(request_id) REFERENCES requests(id) ON DELETE CASCADE) ENGINE=InnoDB`,
    `CREATE TABLE IF NOT EXISTS counters (name VARCHAR(40) PRIMARY KEY, value INT NOT NULL DEFAULT 0) ENGINE=InnoDB`
  ]) await pool.query(statement);
  for (const user of [
    ['warga@demo.test','Warga Demo','citizen','WargaDemo123!'],
    ['operator@demo.test','Operator Demo','operator','OperatorDemo123!'],
    ['warga2@demo.test','Warga Demo Kedua','citizen','WargaDemo123!']
  ]) await pool.execute('INSERT IGNORE INTO users (email,name,role,password_hash) VALUES (?,?,?,?)',[user[0],user[1],user[2],hashPassword(user[3])]);
  const [[count]] = await pool.query('SELECT COUNT(*) AS total FROM requests');
  if (count.total === 0) await seedDemo();
  console.log(`Database ${dbName} siap. Akun demo tercantum di README dan layar masuk.`);
}
export async function seedDemo(connection) {
  const action = async c => {
    const [[user]] = await c.execute('SELECT id FROM users WHERE email=?',['warga@demo.test']);
    const attachment = await createLetter({}, {attachment:true});
    const samples = [
      ['00000000-0000-4000-8000-000000000001','DEMO-AM-001','domisili','submitted','Pengajuan contoh menunggu pemeriksaan operator.'],
      ['00000000-0000-4000-8000-000000000002','DEMO-AM-002','usaha','revision','Mohon jelaskan bidang usaha contoh dengan lebih lengkap.'],
      ['00000000-0000-4000-8000-000000000003','DEMO-AM-003','sktm','completed','Surat contoh telah diterbitkan.']
    ];
    for (const [id,code,service,status,note] of samples) {
      const data = { name:'Warga Demo', identity:'DEMO-0001', address:'Alamat contoh untuk presentasi', occupation:'Pekerjaan contoh', purpose:'Keperluan administrasi contoh', businessName:'Usaha Contoh',businessType:'Perdagangan contoh',businessAddress:'Lokasi usaha contoh' };
      const letterNumber = status==='completed' ? 'CONTOH/001/SKTM/2026' : null;
      const issued = status==='completed' ? new Date().toISOString().slice(0,19).replace('T',' ') : null;
      const pdf = status==='completed' ? await createLetter({service_id:service,form_data:data,letter_number:letterNumber,issued_at:issued}) : null;
      await c.execute('INSERT INTO requests (id,code,owner_id,service_id,form_data,status,letter_number,issued_at,letter_pdf) VALUES (?,?,?,?,?,?,?,?,?)',[id,code,user.id,service,JSON.stringify(data),status,letterNumber,issued,pdf]);
      await c.execute('INSERT INTO history (request_id,status,note,actor) VALUES (?,?,?,?)',[id,'submitted','Pengajuan dibuat sebagai data contoh.','Warga Demo']);
      if(status!=='submitted') await c.execute('INSERT INTO history (request_id,status,note,actor) VALUES (?,?,?,?)',[id,status,note,'Operator Demo']);
      await c.execute('INSERT INTO attachments (id,request_id,name,mime,data) VALUES (?,?,?,?,?)',[`10000000-0000-4000-8000-${code.slice(-3).padStart(12,'0')}`,id,'lampiran-contoh.pdf','application/pdf',attachment]);
    }
    await c.execute('INSERT INTO counters (name,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=GREATEST(value,VALUES(value))',['request',3]);
    await c.execute('INSERT INTO counters (name,value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=GREATEST(value,VALUES(value))',['letter',1]);
  };
  return connection ? action(connection) : transaction(action);
}
if (process.argv[1]?.replaceAll('\\','/').endsWith('/setup-db.mjs')) {
  try { await setup(); } catch(error) {console.error(error.message);process.exitCode=1;} finally {await pool.end();}
}
