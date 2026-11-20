# Menjalankan prototipe lokal

Prasyarat: Node.js minimal 22.12, npm, dan MySQL Laragon aktif di 127.0.0.1:3306. Setup diuji dengan Node 24.19.0 dan MySQL 8.4.3.

Jalankan dari folder proyek:

```powershell
npm ci
Copy-Item .env.example .env
npm run db:setup
npm run dev
```

Sesuaikan DB_USER dan DB_PASSWORD pada .env jika konfigurasi Laragon berbeda. Tanpa .env, aplikasi memakai default development pada .env.example. Jangan memasukkan .env ke paket publik.

Buka http://127.0.0.1:5173/ . API: http://127.0.0.1:3001/api/health . Ctrl+C menghentikan server development.

Setup membuat database khusus, tabel, akun, dan data contoh; tidak menghapus data ketika pengajuan sudah tersedia. MySQL dipakai, tanpa kebutuhan Apache/PHP/Supabase CLI/Docker untuk versi lokal.

```powershell
npm run build
npm run preview
```

Preview pada http://127.0.0.1:4173/ membutuhkan API aktif. Jika dev utama tidak berjalan, jalankan npm run dev:api di terminal terpisah.

```powershell
npm test
```

Tes memakai air_mesu_barat_tests_prototype, terpisah dari database demo utama. Akun dan skenario ada di docs/PANDUAN-DEMO.md. Hosting belum dilakukan.
