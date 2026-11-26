# Prototipe Desa Air Mesu Barat

Website profil desa dan simulasi layanan surat untuk tugas akhir Komputer dan Masyarakat. Pengguna menangani riset dan pembuatan prototipe; asisten mengerjakan penelusuran publik, implementasi, serta dokumentasi berdasarkan arahan pengguna.

**Pembaruan: 20 November 2026. Development lokal terlebih dahulu; hosting sebelum presentasi pada WP07.**

## Cara menjalankan proyek di lokal

Siapkan Node.js minimal 22.12 beserta npm dan MySQL dari Laragon. Proyek diuji dengan Node.js 24.19.0 dan MySQL 8.4.3. Laragon menyediakan database; frontend dan API dijalankan melalui Node.js, sehingga Apache/PHP tidak diperlukan.

### Persiapan pertama kali

1. Buka Laragon dan nyalakan MySQL. Jika memakai tombol Start All, pastikan MySQL ikut berjalan.
2. Buka PowerShell atau terminal VS Code, lalu masuk ke folder proyek:

   ```powershell
   Set-Location 'D:\project\komas-landing-page'
   node --version
   npm --version
   npm ci
   ```

3. Buat konfigurasi lokal jika `.env` belum ada:

   ```powershell
   if (!(Test-Path .env)) { Copy-Item .env.example .env }
   ```

   Buka `.env` di editor. Konfigurasi awal memakai `DB_HOST=127.0.0.1`, `DB_PORT=3306`, `DB_USER=root`, `DB_PASSWORD=` (kosong), dan `DB_NAME=air_mesu_barat_prototype`. Sesuaikan dengan MySQL Laragon Anda. Perintah di atas mempertahankan `.env` yang sudah ada.

4. Siapkan database, lalu jalankan proyek:

   ```powershell
   npm run db:setup
   npm run dev
   ```

   Setup membuat database khusus, tabel, akun, dan data contoh jika belum tersedia. Setup tidak menghapus pengajuan yang sudah ada. Database Laragon lain tidak digunakan.

5. Biarkan terminal tetap terbuka. `npm run dev` menjalankan frontend Vite dan API Express sekaligus. Buka [website lokal](http://127.0.0.1:5173/), pilih **Masuk demo**, lalu pilih akun warga atau operator dan tekan **Masuk**.

### Menjalankan kembali saat development atau presentasi

Setelah persiapan pertama selesai, nyalakan MySQL Laragon dan jalankan:

```powershell
Set-Location 'D:\project\komas-landing-page'
npm run dev
```

Buka http://127.0.0.1:5173/ . Tidak perlu mengulang instalasi dependency atau setup database setiap kali menjalankan proyek. Jika server sudah berjalan di terminal lain, langsung buka website tersebut.

Tekan **Ctrl+C** pada terminal server untuk menghentikan frontend dan API. Data pengajuan tetap tersimpan di MySQL. Saat API dijalankan kembali, masuk ulang menggunakan akun demo.

| Komponen | Alamat atau nama |
| --- | --- |
| Website | http://127.0.0.1:5173/ |
| Pemeriksaan API | http://127.0.0.1:3001/api/health |
| Database demo | `air_mesu_barat_prototype` |
| Database tes | `air_mesu_barat_tests_prototype` |

### Jika proyek belum bisa dibuka

| Kendala | Langkah pemeriksaan |
| --- | --- |
| `node` atau `npm` tidak dikenali | Pasang Node.js yang memenuhi versi minimum, lalu buka ulang terminal. |
| PowerShell menolak menjalankan `npm.ps1` | Gunakan `npm.cmd` sebagai pengganti `npm`, misalnya `npm.cmd run dev`. |
| Koneksi database ditolak atau `Access denied` | Pastikan MySQL Laragon aktif, lalu cocokkan host, port, pengguna, dan kata sandi di `.env`. Setelah mengubah `.env`, hentikan dan jalankan ulang server. |
| Database atau tabel belum ditemukan | Jalankan `npm run db:setup` dari folder proyek. |
| Port 5173 atau 3001 sedang dipakai | Jika proses sebelumnya milik proyek ini, gunakan website yang sudah berjalan atau hentikan lewat Ctrl+C pada terminalnya sebelum menjalankan ulang. |
| Halaman terbuka tetapi login/data gagal dimuat | Periksa [alamat health API](http://127.0.0.1:3001/api/health) dan pesan pada terminal; pastikan frontend, API, dan MySQL tetap aktif. |

Panduan langkah presentasi dan akun contoh juga tersedia di [Panduan Demo](docs/PANDUAN-DEMO.md).

| Peran | Email | Kata sandi demo |
| --- | --- | --- |
| Warga | warga@demo.test | WargaDemo123! |
| Operator | operator@demo.test | OperatorDemo123! |
| Warga kedua untuk uji akses | warga2@demo.test | WargaDemo123! |

Kredensial ini khusus akun contoh dan sengaja tersedia untuk demonstrasi. Pilih akun pada layar masuk, kemudian tekan Masuk.

## Stack dan perubahan keputusan

| Bagian | Implementasi lokal | Rencana sebelum presentasi |
| --- | --- | --- |
| Frontend | React, React Router, JavaScript, CSS biasa | Build Vite di Vercel |
| Development/build | Vite | Build dan pemeriksaan deployment |
| API | Express di Node.js | Adapter/API yang sesuai hosting |
| Database | MySQL Laragon melalui mysql2 | Migrasi ke Supabase PostgreSQL |
| Login | Sesi cookie HttpOnly, hash scrypt | Menyesuaikan auth untuk cloud, misalnya Supabase Auth |
| Lampiran dan hasil | BLOB MySQL pada schema demo | Migrasi ke Storage cloud |
| Surat otomatis | pdf-lib di server | Mempertahankan penerbitan dan penomoran konsisten di cloud |

Arahan terbaru menyediakan Laragon, sehingga rencana Supabase lokal melalui Docker digantikan MySQL untuk development. Supabase, Docker, dan hosting belum disiapkan. Vercel tidak dapat mengakses MySQL localhost; WP07 membutuhkan migrasi API, sesi, schema, dan berkas. Bukan sekadar mengganti alamat database.

Keputusan lengkap: [KEPUTUSAN-PROYEK.md](docs/KEPUTUSAN-PROYEK.md). Arsitektur aktual: [RANCANGAN-SISTEM.md](docs/RANCANGAN-SISTEM.md). Versi dependency terpasang ada pada `package-lock.json`.

## Cakupan prototipe

Portal mencakup beranda, profil, kabar bersumber, daftar layanan, formulir, dan pengajuan saya. Operator dapat mencari/filter pengajuan, memeriksa lampiran dan draf, meminta perbaikan, menolak dengan alasan, menyetujui sekaligus menerbitkan, serta membuka arsip.

Alur utama: **pengajuan warga → pemeriksaan operator → persetujuan → nomor dan PDF otomatis → pelacakan Selesai**. Perbaikan mempertahankan nomor pengajuan. Unduhan ulang memakai PDF terbit yang sama. Klik persetujuan bersamaan ditangani dalam transaksi dan tidak membuat surat ganda.

Tiga layanan contoh adalah domisili, usaha, dan tidak mampu. Semua persyaratan merupakan skenario akademik. Identitas memakai awalan DEMO-, bukan NIK asli. Lampiran PDF/PNG/JPG maksimal tiga berkas dengan ukuran 2 MB per berkas. Gunakan berkas contoh yang disediakan pada formulir.

Surat bertanda **CONTOH - TIDAK BERLAKU**, tanpa cap atau tanda tangan resmi. Tidak ada integrasi Dukcapil, pembayaran, data penduduk asli, maupun pengesahan resmi.

## Riset dan desain

Sasaran mengikuti pengguna: Desa Air Mesu Barat, Kecamatan Pangkalan Baru, Kabupaten Bangka Tengah, Provinsi Kepulauan Bangka Belitung. Sejumlah sumber memakai Air Mesu; hubungan penamaannya dicatat sebagai hal yang perlu dikonfirmasi. Data Air Mesu Timur dikecualikan dari profil sasaran.

Riset publik dan matriks sumber tersedia, tetapi bukti antrean, pencatatan manual, SOP, waktu, dan biaya layanan belum terverifikasi. Tidak mengarang wawancara atau bukti masalah. Statistik, kontak, dan pejabat yang belum cocok dengan sasaran Barat tidak ditampilkan sebagai fakta.

Referensi antarmuka pengguna: [portal Loa Duri Ilir](https://loaduriilir.digitaldesa.id/). Redesain mengikuti antislop **DURING** yang dipilih pengguna, dengan dials ENERGY 2 / RHYTHM 2 / MOTION 1. Arah serta alasan visual ada di [DESIGN.md](DESIGN.md). Mockup lama tetap arsip dan tidak menjadi persetujuan desain baru.

Foto hutan di Gowa oleh Faried Anzyari dari Unsplash diberi label ilustrasi, bukan dokumentasi desa. Sumber dan catatan penggunaan ada di dokumen keputusan. Tidak ada logo atau foto pejabat karangan.

## Paket kerja dan progres

Paket berikut menjadi lingkup pekerjaan pengguna. Asisten mengerjakan dan mencatat hasil sesuai instruksi WP01 sampai WP06.

| Paket | Hasil dan titik pemeriksaan | Status |
| --- | --- | --- |
| WP01 Riset desa | Catatan sumber, penyaringan Barat/Timur, bahan profil, dan matriks bukti/pertanyaan terbuka | Penelusuran publik selesai; konfirmasi lapangan terbuka |
| WP02 Kebutuhan dan rancangan | Rancangan sistem aktual, alur, template, navigasi, dan keputusan desain | Selesai untuk versi lokal |
| WP03 Lingkungan lokal | React/Vite, API, MySQL Laragon, setup, akun dan data contoh | Selesai |
| WP04 Portal dan pengajuan | Beranda/profil/kabar/layanan, formulir dan pelacakan tersambung database | Selesai |
| WP05 Operator dan surat otomatis | Perbaikan, penolakan, persetujuan, PDF, penomoran, dan arsip | Selesai; alur API dan browser diuji |
| WP06 Pemeriksaan dan bahan laporan | Build, tes, pemeriksaan PDF/antarmuka, screenshot, dan panduan demo | Pemeriksaan akhir dan screenshot sedang dilengkapi |
| WP07 Hosting dan serah terima online | Migrasi cloud, deploy Vercel/Supabase, dan uji antarperangkat | Belum dimulai, sebelum presentasi |

Riset selesai berarti hasil penelusuran dan keterbatasannya tersedia. Itu tidak berarti semua dugaan masalah desa sudah terbukti. WP07 menunggu kesiapan lokal dan arahan hosting berikutnya.

## Paket delivery

| Kode | Hasil | Lokasi/status |
| --- | --- | --- |
| D01 | Source, template, setup schema dan seed, dependency terkunci | src/, server/, shared/, scripts/, tests/, package-lock.json |
| D02 | Petunjuk setup, build, preview, dan reset | [Panduan menjalankan](delivery/panduan-menjalankan.md) |
| D03 | Riset, sumber, batas klaim | [Riset desa](docs/RISET-DESA-AIR-MESU.md) |
| D04 | Rancangan dan keputusan | [Rancangan final](docs/RANCANGAN-FINAL.md), [sistem](docs/RANCANGAN-SISTEM.md), [keputusan](docs/KEPUTUSAN-PROYEK.md) |
| D05 | Lima layar inti dan keterangannya | delivery/screenshots/, sedang dilengkapi |
| D06 | Skenario demonstrasi dan pemeriksaan di laptop | [Panduan demo](docs/PANDUAN-DEMO.md), [checklist verifikasi manual](docs/VERIFIKASI-MANUAL.md) |
| D07 | Tautan online teruji | WP07, belum tersedia |
| D08 | Arsip final untuk serah terima | WP07; source lokal sudah berada di folder proyek |

Contoh PDF tiga jenis surat tersedia di `delivery/contoh-surat/`. Screenshot dan PDF memakai data contoh. Tidak ada deployment atau akun cloud dibuat.

## Perintah pemeriksaan

```powershell
npm test
npm run build
npm run preview
```

Tes memakai schema uji terpisah. Preview build tersedia di http://127.0.0.1:4173/ dan tetap membutuhkan API. Jika `npm run dev` tidak berjalan, buka terminal lain dan jalankan `npm run dev:api`.

## Dokumen dan struktur

```text
src/                         antarmuka dan CSS
server/                      API, auth, database, PDF
shared/                      jenis layanan dan konten bersumber
scripts/                     dev, setup database, ekspor PDF contoh
tests/                       uji integrasi API
public/assets/               foto ilustrasi lokal
docs/                        riset, keputusan, rancangan, panduan, verifikasi
delivery/screenshots/        bahan gambar laporan
delivery/contoh-surat/       PDF contoh
```

Draf laporan DOCX dari pengguna tetap menjadi sumber kebutuhan tugas. Rancangan lama di RANCANGAN-WEBSITE.md, RANCANGAN-SISTEM-AWAL.md, dan README-PLAN-AWAL.md disimpan sebagai riwayat; status aktual mengikuti README ini.

## Kriteria sebelum presentasi

Pakai [checklist verifikasi manual](docs/VERIFIKASI-MANUAL.md) untuk mencoba alur lengkap dan mencatat hasil di laptop sebelum presentasi.

- [x] Source dapat dibuild dan setup database lokal tersedia.
- [x] Pengajuan, perbaikan, persetujuan, penolakan, dan PDF diuji melalui API.
- [x] Warga tidak dapat membaca pengajuan/lampiran akun lain atau melakukan persetujuan operator.
- [x] Surat contoh diperiksa secara visual dan tidak memakai identitas asli.
- [ ] Pemeriksaan akhir antarmuka dan lima screenshot lengkap.
- [ ] Migrasi cloud serta tautan online diuji dari perangkat lain pada WP07.
- [ ] Paket serah terima final diperiksa ulang.

## Jadwal acuan kelompok

Jadwal berasal dari draf awal: 23 November 2026 bahan screenshot/tautan untuk Bab 3; 24 November penyatuan laporan dan presentasi; 25 November unggah. Waktu hosting perlu disiapkan sebelum bahan final diserahkan. Jadwal ini belum merupakan tenggat baru dari pengguna.

## Riwayat keputusan dan progres

| Tanggal | Catatan |
| --- | --- |
| 19 November 2026 | Membaca draf, menulis riset awal, memperjelas sasaran Barat, dan menyusun paket kerja |
| 19 November 2026 | Pengguna memilih development lokal dahulu, stack React/Vite/Supabase/pdf-lib, dan hosting Vercel sebelum presentasi |
| 19 November 2026 | Pengguna memberikan referensi, mengizinkan pengerjaan WP01 sampai WP06, menyediakan Laragon, dan memilih antislop DURING |
| 19 November 2026 | MySQL Laragon terhubung; API/portal/formulir/operator/PDF dibuat; 18 tes integrasi lulus |
| 20 November 2026 | Melanjutkan pengujian yang terputus, memperbaiki jarak judul PDF, memeriksa tiga PDF, menguji kembali API, dan memperbarui arsitektur sesuai implementasi |

Pembaruan progres berikutnya harus menyebut hasil yang benar-benar tersedia dan batas verifikasinya.
