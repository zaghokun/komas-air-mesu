import mysql from 'mysql2/promise';

export const dbName = process.env.DB_NAME || 'air_mesu_barat_prototype';
if (!/^[a-z][a-z0-9_]*_prototype$/.test(dbName)) throw new Error('Nama database harus khusus prototipe dan berakhiran _prototype.');
export const dbOptions = {
  host: process.env.DB_HOST || '127.0.0.1', port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || '',
  charset: 'utf8mb4', timezone: '+00:00', decimalNumbers: true, dateStrings: true
};
export const pool = mysql.createPool({ ...dbOptions, database: dbName, connectionLimit: 6 });
pool.on('connection', connection => connection.query("SET time_zone = '+00:00'"));
export async function transaction(action) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await action(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally { connection.release(); }
}
