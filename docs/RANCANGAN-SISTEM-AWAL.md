# Rancangan Sistem Prototipe Desa Air Mesu Barat

**Pembaruan:** 19 November 2026, WIB.  
**Status:** rencana teknis berdasarkan pembahasan pengguna; belum diimplementasikan.  
**Urutan kerja:** development lokal terlebih dahulu, kemudian hosting sebelum presentasi.

Dokumen ini mencatat stack dan cara kerja sistem profil desa serta layanan surat otomatis. Rancangan visual sebelumnya tetap dikesampingkan. Nama aplikasi, desain, jenis surat final, dan fakta profil desa masih mengikuti hasil riset serta keputusan berikutnya.

## Stack yang direncanakan

| Bagian | Teknologi | Tanggung jawab |
| --- | --- | --- |
| Antarmuka | React | Portal warga, formulir, pelacakan, dan dasbor operator |
| Bahasa | JavaScript | Logika pengajuan, validasi, komunikasi layanan, dan pengisian template |
| Development dan build | Vite | Menjalankan frontend di localhost dan menghasilkan build statis |
| Tampilan | CSS biasa | Tata letak dan gaya antarmuka |
| Database | Supabase PostgreSQL | Menyimpan data pengajuan, status, catatan, serta nomor surat |
| Autentikasi | Supabase Auth | Akun demo warga dan operator |
| Berkas | Supabase Storage | Lampiran contoh dan PDF yang telah diterbitkan |
| Pembuatan dokumen | pdf-lib | Menghasilkan PDF dari template dan data yang disetujui |
| Hosting frontend | Vercel | Menyajikan hasil build website menjelang presentasi |

Supabase menjadi layanan backend. Server Express terpisah belum diperlukan dalam rancangan ini. localStorage bukan sumber utama data pengajuan; data bersama disimpan di PostgreSQL.

## Development lokal

Frontend direncanakan berjalan melalui Vite di komputer pengembang. Database, Auth, dan Storage direncanakan memakai Supabase lokal melalui Supabase CLI dan Docker. Dengan demikian, development tidak bergantung pada deployment Vercel atau project Supabase cloud.

```text
Browser di komputer pengembang
  └── React + JavaScript + CSS melalui Vite di localhost
      ├── Supabase lokal: PostgreSQL, Auth, dan Storage
      └── Template surat + pdf-lib: pratinjau dan pembuatan PDF
```

Supabase CLI, Docker, Node.js, serta dependency proyek belum diperiksa atau dipasang. Versi dan perintah menjalankan dicatat setelah setup benar-benar tersedia. Tahap dokumentasi ini tidak memulai pemasangan atau development antarmuka.

Gunakan migration untuk struktur database dan aturan akses, seed untuk data contoh, serta konfigurasi lingkungan untuk alamat layanan lokal. Akun demo dan berkas contoh disiapkan dengan prosedur yang dapat diulang. Tidak memakai identitas atau lampiran warga asli.

## Lingkungan hosting sebelum presentasi

```text
Browser warga, operator, atau dosen
  └── Website React hasil build Vite di Vercel
      ├── Supabase cloud: PostgreSQL, Auth, dan Storage
      └── Template surat + pdf-lib: pembuatan PDF di browser
```

Kode aplikasi tetap sama saat pindah dari lokal ke online; konfigurasi alamat layanan dan kunci publik disesuaikan. Pengajuan dari perangkat berbeda akan memakai database cloud yang sama. Mekanisme pembaruan dasbor dapat berupa pengambilan ulang data setelah tindakan; realtime bukan persyaratan awal.

Migration diterapkan ke cloud, akun serta seed demo dibuat, dan berkas contoh diunggah. Data lokal, pengguna Auth, dan isi Storage tidak otomatis tersalin bersama deployment frontend. Tujuan tahap ini adalah menyediakan tautan demo yang siap dipakai dosen.

## Penyimpanan dan akses

| Kelompok data | Isi yang direncanakan |
| --- | --- |
| Profil akun demo | Identitas fiktif dan peran warga/operator; autentikasi ditangani Supabase Auth |
| Jenis surat | Nama layanan, persyaratan contoh, dan pengenal versi template |
| Pengajuan | Pemohon, jenis surat, data formulir, nomor pengajuan, status, dan waktu |
| Riwayat pemeriksaan | Perubahan status, catatan, pelaku tindakan, dan waktu |
| Surat terbit | Nomor surat, data yang disetujui, versi template, waktu penerbitan, dan lokasi PDF |
| Storage | Berkas contoh persyaratan dan hasil PDF |

Nama tabel dan detail kolom ditetapkan saat implementasi. Nomor pengajuan berbeda dari nomor surat terbit.

Akses direncanakan melalui Supabase Auth dan aturan akses database atau Row Level Security. Warga hanya mengakses pengajuannya sendiri; operator memeriksa dan menyetujui pengajuan sesuai peran. Peran operator tidak diberikan melalui isian yang bisa diubah warga. Lampiran dan hasil surat memakai aturan akses Storage yang sesuai.

Frontend hanya menggunakan konfigurasi publik yang memang ditujukan untuk browser. Kunci rahasia atau service role tidak dimasukkan ke frontend maupun paket serah terima. Contoh konfigurasi dibagikan tanpa kredensial rahasia.

## Pembuatan surat otomatis

1. Warga memilih jenis surat dan mengirim data contoh beserta lampiran yang diperlukan.
2. Sistem mencatat pengajuan dan menyusun draf berdasarkan template jenis surat tersebut.
3. Operator memeriksa data, lampiran, dan pratinjau. Jika ada kekurangan, operator memberi catatan perbaikan.
4. Operator memilih **Setujui dan terbitkan** sebagai simulasi pengesahan pada prototipe.
5. Sistem menetapkan nomor surat dan tanggal, lalu membuat PDF dengan pdf-lib dari data yang disetujui.
6. PDF disimpan ke Storage, dicatat pada arsip, dan status menjadi **Selesai** setelah hasil tersedia.
7. Warga melihat status dan mengunduh PDF yang sama dengan hasil penerbitan.

Isi surat memakai template tetap dengan bagian yang diisi dari formulir, tanpa AI untuk menulis isi surat. Operator tidak perlu mengetik ulang data yang sudah diajukan. Dokumen diberi penanda **CONTOH — TIDAK BERLAKU**.

Pemberian nomor dan persetujuan perlu ditangani secara konsisten di database, misalnya melalui fungsi database yang memeriksa peran dan status. Pengulangan klik atau percobaan ulang setelah gagal tidak boleh membuat nomor surat baru untuk penerbitan yang sama. Data dan versi template yang disetujui disimpan agar PDF tidak berubah karena formulir diedit kemudian.

Jika pembuatan atau penyimpanan PDF gagal, pengajuan belum ditandai Selesai dan tersedia cara mencoba ulang. Akun warga tidak dapat mengubah status atau nomor surat melalui permintaan langsung. Rincian mekanisme ini diuji pada tahap implementasi.

Persetujuan operator pada demo menyederhanakan alur untuk presentasi. Kewenangan dan bentuk pengesahan layanan desa nyata masih perlu dikonfirmasi; sistem tidak mengklaim menghasilkan dokumen resmi yang sah.

## Perpindahan dari lokal ke hosting

| Tahap | Hasil yang harus tersedia |
| --- | --- |
| Development lokal | Portal, akun demo, pengajuan, pemeriksaan, dan surat otomatis berjalan di localhost dengan Supabase lokal |
| Pemeriksaan lokal | Alur berhasil, perbaikan berkas, kegagalan penerbitan, reset demo, serta hasil PDF diperiksa |
| Persiapan cloud | Project Supabase, migration, aturan akses, akun demo, dan berkas contoh tersedia |
| Deployment frontend | Build Vite dipasang di Vercel dan konfigurasi mengarah ke Supabase cloud |
| Uji sebelum presentasi | Pengajuan dari satu perangkat dapat diperiksa di perangkat lain; status dan PDF sesuai |
| Serah terima | Tautan, petunjuk lokal, akun demo, screenshot, dan paket source tersedia |

Pemeriksaan online juga mencakup konfigurasi login, pemuatan halaman melalui tautan langsung, dan unduhan berkas. Pastikan layanan cloud aktif sebelum presentasi. Salinan lokal tetap disiapkan sebagai cadangan demo.

Belum ada hosting, database lokal/cloud, akun, migration, atau script pembuatan surat yang dibuat pada tahap ini. Progres implementasi dicatat di `README.md`.
