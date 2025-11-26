const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const db = require('../db');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // folder lokal untuk simpan dokumen

router.post('/register', upload.single('docs'), async (req, res) => {
  try {
    const {
      name, email, phone, password, role,
      shop_name, operating_hours, skills
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Data wajib belum lengkap' });
    }

    // Enkripsi password
    const hashed = await bcrypt.hash(password, 10);

    // Simpan ke tabel users
    const userRes = await db.query(`
      INSERT INTO users (name, email, phone, password_hash, role)
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `, [name, email, phone, hashed, role]);

    const userId = userRes.rows[0].id;

    // Jika teknisi, simpan ke tabel technicians
    if (role === 'technician') {
      const filePath = req.file?.path || null;
      await db.query(`
        INSERT INTO technicians (user_id, shop_name, operating_hours, skills, verification_docs)
        VALUES ($1, $2, $3, $4, $5)
      `, [userId, shop_name, operating_hours, skills, filePath]);
    }

    res.status(201).json({ message: 'Registrasi berhasil', user_id: userId });
  } catch (err) {
    console.error('❌ Error registrasi:', err);
    res.status(500).json({ message: 'Gagal registrasi' });
  }
});

module.exports = router;