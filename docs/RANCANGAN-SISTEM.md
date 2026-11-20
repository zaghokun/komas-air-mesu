# Rancangan sistem prototipe Desa Air Mesu Barat

Pembaruan 20 November 2026. Menggambarkan implementasi lokal WP03 sampai WP06. Rencana awal Supabase/Docker disimpan sebagai RANCANGAN-SISTEM-AWAL.md. Pengguna kemudian menyediakan MySQL Laragon; keputusan perubahan ada di KEPUTUSAN-PROYEK.md.

## Stack lokal yang digunakan

| Bagian | Teknologi | Letak |
| --- | --- | --- |
| Antarmuka | React, React Router, JavaScript | src/main.jsx |
| Development/build | Vite | vite.config.js |
| Tampilan | CSS biasa | src/styles.css |
| API | Node.js, Express | server/index.js |
| Database | MySQL Laragon 8.4.3, mysql2 | server/db.js |
| Login | Sesi cookie HttpOnly/SameSite Strict, hash scrypt | server/auth.js |
| Lampiran dan hasil | BLOB MySQL | attachments dan requests |
| Pembuatan dokumen | pdf-lib di server | server/pdf.js |
| Setup dan seed | Script JavaScript | scripts/setup-db.mjs |
| Tes integrasi | Node test runner | tests/api.test.mjs |

Versi dependency terkunci pada package-lock.json. Node yang tersedia saat setup adalah 24.19.0; minimum proyek 22.12. Tidak memakai Supabase lokal, Docker, Apache, atau PHP pada implementasi ini.

```text
Browser
  → Vite di 127.0.0.1:5173
    → Proxy /api ke Express di 127.0.0.1:3001
      → MySQL Laragon di 127.0.0.1:3306
      → pdf-lib menyusun draf dan hasil surat
```

Server mengikat loopback. Schema utama air_mesu_barat_prototype dan schema tes air_mesu_barat_tests_prototype dipisahkan dari database Laragon lain. localStorage bukan database utama.

## Penyimpanan

| Tabel | Isi |
| --- | --- |
| users | Email akun demo, nama, peran, hash kata sandi |
| requests | UUID, nomor pengajuan, pemilik, layanan, formulir JSON, status, nomor/waktu surat, PDF |
| history | Status, catatan, pelaku, waktu |
| attachments | Nama, MIME, isi BLOB, hubungan pengajuan |
| counters | Penghitung nomor pengajuan dan surat |

Template tetap berada di source versi 0.1.0. Kolom versi template per-record belum dibuat; arsip menyimpan PDF final yang sama untuk unduhan ulang. Waktu disimpan UTC dan ditampilkan Asia/Jakarta. Sesi berada di memori API, maksimum delapan jam; restart API memerlukan login ulang.

## API dan akses

| Tujuan | Endpoint |
| --- | --- |
| Kesehatan database | GET /api/health |
| Login/sesi/logout | POST /api/login, GET /api/session, POST /api/logout |
| Daftar/detail | GET /api/requests, GET /api/requests/:id |
| Buat/perbaiki | POST /api/requests, PUT /api/requests/:id |
| Tindakan operator | POST /api/requests/:id/action |
| Draf/hasil | GET /api/requests/:id/pdf |
| Lampiran | GET /api/attachments/:id |
| Berkas contoh | GET /api/sample-attachment |
| Reset data | POST /api/demo/reset, operator dan konfirmasi khusus |

Warga hanya membaca pengajuan dan lampiran miliknya. Operator dapat memeriksa pengajuan contoh dan mengubah status. Peran ditentukan dari sesi server; SQL menggunakan parameter. Permintaan perubahan memerlukan header aplikasi dan origin localhost yang diizinkan.

Upload menerima PDF/PNG/JPEG dengan pemeriksaan MIME serta tanda awal file, maksimum tiga berkas dan 2 MB per berkas. Ini validasi demo, bukan pemindai malware. Identitas wajib berawalan DEMO- dan tidak memakai NIK asli.

## Surat otomatis

Data formulir mengisi template. Operator memeriksa draf lalu memilih Setujui dan terbitkan. Dalam satu transaksi, API mengunci pengajuan, memeriksa status, memberikan nomor, menghasilkan PDF, menyimpan hasil, dan mencatat riwayat.

Jika gagal, transaksi dibatalkan dan status belum Selesai. Persetujuan yang dikirim ulang untuk pengajuan selesai mengembalikan nomor yang sama. Tes bersamaan memeriksa satu peristiwa Selesai. Setelah terbit, data ditutup untuk perubahan warga.

Hasil bertanda CONTOH - TIDAK BERLAKU, tanpa cap/tanda tangan resmi. Unduhan mengambil BLOB tersimpan sehingga isi tidak berubah saat diunduh ulang.

## Reset presentasi

Setup menyiapkan tiga akun dan tiga pengajuan contoh. Operator dapat mengganti data pengajuan dan counter dengan kondisi awal melalui reset berkonfirmasi. Akun tetap ada dan database lain tidak disentuh. Setup biasa tidak menghapus pengajuan yang sudah tersedia.

## WP07 sebelum presentasi

Target cloud tetap Vercel dan Supabase sesuai pembahasan. Perubahan ke Laragon membuat migrasi cloud membutuhkan pekerjaan berikut:

1. Memetakan schema MySQL ke PostgreSQL serta aturan akses.
2. Mengganti lapisan koneksi mysql2 dengan PostgreSQL/Supabase atau menyesuaikan API.
3. Mengubah sesi memori menjadi mekanisme login yang cocok untuk hosting, misalnya Supabase Auth.
4. Memindahkan berkas ke Storage cloud.
5. Mempertahankan transaksi penerbitan dan penomoran.
6. Menyiapkan akun/data demo, deploy frontend dan API, lalu uji antarperangkat.

Build frontend saja tidak menyediakan API/database di internet. Vercel tidak dapat diarahkan ke MySQL localhost pengguna. Tidak ada akun cloud, migrasi cloud, atau deployment pada tahap lokal ini.
