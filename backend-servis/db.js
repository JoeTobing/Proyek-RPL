const db = require('./db');

(async () => {
  const res = await db.query('SELECT NOW()');
  console.log('Koneksi berhasil:', res.rows[0]);
})();