# Panduan demonstrasi prototipe

Versi lokal 0.1.0, 20 November 2026. Jalankan proyek di komputer lokal sebelum memulai demonstrasi.

## Cara menjalankan proyek

Siapkan Node.js minimal 22.12 beserta npm dan MySQL Laragon. Apache/PHP tidak diperlukan karena website dan API berjalan melalui Node.js.

### Persiapan pertama kali

1. Buka Laragon, lalu nyalakan MySQL. Jika memilih Start All, pastikan MySQL ikut berjalan.
2. Buka PowerShell atau terminal VS Code dan jalankan:

   ```powershell
   Set-Location 'D:\project\komas-landing-page'
   node --version
   npm --version
   npm ci
   if (!(Test-Path .env)) { Copy-Item .env.example .env }
   ```

3. Periksa `.env` melalui editor. Default MySQL adalah host `127.0.0.1`, port `3306`, pengguna `root`, kata sandi kosong, dan database `air_mesu_barat_prototype`. Sesuaikan jika konfigurasi Laragon berbeda. Pertahankan `.env` yang sudah disesuaikan.
4. Jalankan setup database, kemudian server:

   ```powershell
   npm run db:setup
   npm run dev
   ```

   Setup menyiapkan database khusus, tabel, akun, dan pengajuan contoh. Pengajuan yang sudah ada dipertahankan.

5. Biarkan terminal terbuka dan buka [beranda lokal](http://127.0.0.1:5173/). Perintah `npm run dev` menjalankan frontend dan API sekaligus.

### Saat akan presentasi atau menjalankan ulang

Nyalakan MySQL Laragon, lalu jalankan dari terminal:

```powershell
Set-Location 'D:\project\komas-landing-page'
npm run dev
```

Jika server proyek sudah berjalan, langsung buka http://127.0.0.1:5173/ . Instalasi dependency dan setup database cukup dilakukan saat persiapan pertama, bukan setiap kali presentasi.

Sebelum mulai, pastikan beranda terbuka dan [API lokal](http://127.0.0.1:3001/api/health) dapat diakses. Buka **Masuk demo**, pilih akun yang diperlukan, kemudian tekan **Masuk**. Gunakan data fiktif dan berkas contoh saat demonstrasi.

Tekan **Ctrl+C** pada terminal untuk menghentikan server. Data pengajuan tetap tersimpan; restart API memerlukan login ulang.

Jika ada kendala:

- `node`/`npm` tidak dikenali: periksa instalasi Node.js dan buka ulang terminal.
- PowerShell memblokir `npm.ps1`: ganti `npm` dengan `npm.cmd`, misalnya `npm.cmd run dev`.
- Koneksi MySQL gagal: nyalakan MySQL dan periksa konfigurasi `.env`, lalu jalankan ulang server.
- Database/tabel belum tersedia: jalankan `npm run db:setup`.
- Port 5173/3001 sudah dipakai proyek ini: gunakan server yang sudah aktif atau hentikan lewat Ctrl+C pada terminal sebelumnya.

Rincian setup dan pemecahan masalah juga ada di [README](../README.md#cara-menjalankan-proyek-di-lokal).

## Akun demonstrasi

| Peran | Email | Kata sandi contoh |
| --- | --- | --- |
| Warga | warga@demo.test | WargaDemo123! |
| Operator | operator@demo.test | OperatorDemo123! |
| Warga kedua untuk uji akses | warga2@demo.test | WargaDemo123! |

Tombol akun pada layar masuk mengisi kredensial; tekan Masuk. Akun khusus demo, bukan akun warga asli. Restart API memerlukan login ulang.

## Urutan sekitar lima menit

1. Tampilkan beranda, profil, dan sumber; jelaskan sasaran Barat serta batas verifikasi.
2. Buka layanan Domisili dan dialog persyaratan contoh.
3. Masuk sebagai warga, pilih Isi data contoh dan Gunakan berkas contoh, centang konfirmasi, lalu kirim.
4. Tampilkan nomor, status Diajukan, lampiran, serta riwayat.
5. Keluar dan masuk operator. Pilih pengajuan baru, periksa data dan pratinjau draf.
6. Pilih Setujui dan terbitkan lalu konfirmasi. Tampilkan nomor surat, PDF, dan arsip.
7. Masuk kembali sebagai warga dan buka pengajuan yang sama. Tampilkan Selesai serta Unduh surat PDF.

Alur tambahan: minta perbaikan dengan catatan, warga memperbaiki, lalu operator menyetujui. Nomor pengajuan tetap sama.

## Mengulang demo

Operator memilih Reset data demo, mengetik RESET DATA CONTOH, lalu konfirmasi. Ini mengganti pengajuan dalam schema khusus prototipe dengan tiga data awal: DEMO-AM-001 Domisili/Diajukan, DEMO-AM-002 Usaha/Perlu perbaikan, DEMO-AM-003 Tidak mampu/Selesai. Akun tetap ada. Jangan reset jika ingin menyimpan hasil demo sebelumnya.

## Keterangan gambar laporan

| Berkas delivery/screenshots | Keterangan |
| --- | --- |
| 01-beranda.jpg | Warga menemukan profil, kabar bersumber, dan akses layanan. Foto pembuka adalah ilustrasi. |
| 02-layanan-surat.jpg | Warga memilih surat dan membaca persyaratan contoh. |
| 03-formulir-pengajuan.jpg | Warga mengisi data fiktif dan melampirkan berkas contoh. |
| 04-pelacakan.jpg | Warga melihat status, riwayat, dan hasil surat. |
| 05-operator.jpg | Operator memeriksa data serta draf dan menentukan tindakan. |

Contoh PDF ada di delivery/contoh-surat/. Surat bertanda CONTOH dan tidak berlaku sebagai dokumen resmi. Uji hosting dilakukan pada WP07.
