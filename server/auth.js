import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(password, salt, 64).toString('hex');
}
export function checkPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === candidate.length && timingSafeEqual(candidate, expected);
}
export const sessions = new Map();
export function newSession(user) {
  const token = randomBytes(32).toString('hex');
  sessions.set(token, { user, expires: Date.now() + 8 * 60 * 60 * 1000 });
  return token;
}
export function sessionToken(req) {
  return (req.headers.cookie || '').split(';').map(value => value.trim()).find(value => value.startsWith('amb_session='))?.slice(12);
}
export function currentUser(req) {
  const token = sessionToken(req);
  const session = sessions.get(token);
  if (!session || session.expires < Date.now()) { sessions.delete(token); return null; }
  return session.user;
}
export function requireUser(req, res, next) {
  req.user = currentUser(req);
  if (!req.user) return res.status(401).json({ error: 'Masuk dengan akun demo untuk melanjutkan.' });
  next();
}
export function requireOperator(req, res, next) {
  if (req.user.role !== 'operator') return res.status(403).json({ error: 'Tindakan ini hanya untuk operator demo.' });
  next();
}
