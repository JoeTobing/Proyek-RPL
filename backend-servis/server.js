// 🚀 Inisialisasi dan konfigurasi
console.log('🚀 Memulai server...');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// 🔌 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📦 Routing
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 🌐 Port dan Host
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

// ▶️ Jalankan server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server berjalan di http://${HOST}:${PORT}`);
});;
