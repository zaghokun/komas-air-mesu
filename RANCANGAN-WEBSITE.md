# Rancangan Prototipe Sapa Air Mesu

> **Koreksi sasaran:** pengguna menetapkan Desa Air Mesu Barat. Dokumen lama ini belum disesuaikan dengan hasil verifikasi penamaan dan wilayah; isinya tidak boleh langsung dipakai sebagai profil final.

> **Pembaruan teknis:** stack dan urutan development lokal lalu hosting dicatat dalam [rancangan sistem](docs/RANCANGAN-SISTEM.md). Keputusan teknis tersebut menggantikan usulan localStorage dan simulasi tanpa backend pada dokumen lama ini. Gaya visual, susunan layar, dan nama aplikasi di bawah tetap merupakan usulan yang belum disetujui.

> **Status per 19 November 2026: dikesampingkan sementara.** Pengguna meminta riset desa dan persiapan skills/alat terlebih dahulu. Nama, gaya visual, serta mockup yang terkait dokumen ini belum disetujui dan tidak menjadi acuan implementasi. Lihat `README.md` untuk progres aktif dan `docs/RISET-DESA-AIR-MESU.md` untuk hasil riset terbaru.

Rancangan awal website profil dan layanan surat Desa Air Mesu untuk tugas akhir mata kuliah Komputer dan Masyarakat. Nama **Sapa Air Mesu** merupakan usulan nama aplikasi. Rancangan ini menjadi acuan sebelum implementasi website.

## Dasar rancangan

Sumber kebutuhan: `Draft Laporan Proyek Akhir — Landing Page Desa & Persuratan Desa.docx` di folder proyek, khususnya Bab 2 dan Bab 3.

Dokumen menyebut Desa Air Mesu pada judul, tetapi profil desa, bukti masalah, jenis layanan, dan ketentuan penerbitan masih berupa isian sementara. Rancangan mengikuti kebutuhan aplikasi dalam draf; rancangan tidak menyatakan bahwa masalah maupun informasi desa tersebut sudah terverifikasi.

Tujuan presentasi adalah menunjukkan hubungan antara informasi layanan yang mudah ditemukan, pengajuan surat, pemeriksaan operator, dan hasil yang dapat dipantau warga. Lima layar mengikuti daftar pada Bab 3 agar mudah dijadikan tangkapan layar laporan.

## Konsep dan pengguna

Website memiliki dua area yang menggunakan bahasa dan identitas visual yang sama:

- **Portal warga:** informasi desa dan pengajuan surat. Prioritas tampilan ponsel, tombol besar, dan kalimat sederhana.
- **Area operator:** pemeriksaan pengajuan dan arsip surat. Prioritas keterbacaan daftar, rincian berkas, dan tindakan yang jelas.

| Pengguna | Kebutuhan utama | Representasi pada prototipe |
| --- | --- | --- |
| Warga | Menemukan informasi, mengetahui syarat, mengajukan dan melacak surat | Beranda, layanan, formulir, dan lacak status |
| Operator desa | Memeriksa berkas, meminta perbaikan, menyiapkan surat, dan mencatat arsip | Dasbor dan panel rincian pengajuan |
| Pejabat penanda tangan | Menyetujui atau menolak surat yang memerlukan pengesahan | Langkah pengesahan simulasi dalam panel rincian, dengan label peran terpisah |

Pergantian peran pada presentasi merupakan alat demo. Itu bukan sistem autentikasi atau pembatasan akses yang sesungguhnya.

## Struktur navigasi

```text
Sapa Air Mesu
├── Beranda                          /
│   ├── Profil desa                  /#profil
│   ├── Pengumuman                   /#pengumuman
│   └── Kontak dan informasi kantor  /#kontak
├── Layanan Surat                    /layanan
│   └── Detail syarat                panel pada halaman layanan
├── Ajukan Surat                     /pengajuan/:jenis
├── Lacak Pengajuan                  /lacak
│   └── Hasil dan riwayat status     pada halaman yang sama
└── Area Operator                    /operator
    ├── Daftar pengajuan
    ├── Rincian dan verifikasi       panel rincian
    └── Arsip surat                  tab pada dasbor
```

Profil dan pengumuman tetap menjadi bagian beranda untuk menjaga cakupan lima layar. Detail layanan, bukti pengajuan, rincian operator, dan pratinjau surat menggunakan panel atau dialog, bukan halaman utama tambahan.

## Arah visual

**Karakter:** ramah, jelas, tertata, dengan identitas desa yang terasa modern. Portal warga menggunakan ruang kosong yang cukup; dasbor lebih ringkas untuk membaca data.

| Elemen | Usulan |
| --- | --- |
| Warna utama | Hijau tua `#164B3C` untuk identitas, header, dan tombol utama |
| Warna pendukung | Hijau muda `#EAF3EE` untuk bagian informasi |
| Latar | Putih `#FFFFFF` dan abu muda `#F5F7F6` |
| Teks | Gelap `#182C25`, teks sekunder `#52645C` |
| Aksen | Emas `#D4AD58` untuk detail ilustrasi, bukan warna teks utama |
| Tipografi | Plus Jakarta Sans bila tersedia, cadangan Segoe UI dan sans-serif |
| Ukuran teks | Isi 16 px, label 14–16 px, judul layar 28–40 px, judul utama 40–56 px |
| Bentuk | Sudut membulat 12–20 px, garis pembatas tipis, bayangan ringan |
| Ikon | Ikon garis yang konsisten; selalu disertai teks untuk tindakan penting |
| Foto dan identitas | Tempat untuk foto desa dan logo terverifikasi; gunakan ilustrasi netral sementara |

Status selalu ditulis dengan teks. Warna hijau untuk selesai, kuning untuk perlu tindakan, biru untuk proses, dan merah untuk penolakan tidak menjadi satu-satunya pembeda.

## Rincian lima layar

### Beranda desa

**Tujuan:** warga langsung mengetahui informasi yang tersedia dan cara mengurus surat.

Urutan konten:

1. Header dengan nama aplikasi, nama desa, navigasi, dan tombol **Ajukan surat**.
2. Bagian pembuka dengan judul “Desa lebih dekat. Layanan lebih mudah.”, deskripsi singkat, tombol **Lihat layanan surat**, dan **Lacak pengajuan**.
3. Akses cepat ke informasi syarat, pengajuan, dan pelacakan.
4. Profil singkat: deskripsi, wilayah administratif, dan potensi desa. Data yang belum tersedia diberi keterangan belum dikonfirmasi.
5. Pengumuman dengan judul, tanggal, dan penanda konten contoh selama demo.
6. Kontak, alamat kantor, dan jam layanan setelah informasinya tersedia.

Jangan menampilkan statistik penduduk, nama kepala desa, peta, jam buka, atau klaim layanan gratis sebelum ada sumbernya.

**Tangkapan layar:** bagian pembuka, akses layanan, dan awal profil. Keterangan laporan: warga dapat menemukan informasi desa dan masuk ke layanan surat melalui beranda.

### Daftar layanan surat

**Tujuan:** warga memahami kegunaan surat dan dokumen yang perlu disiapkan sebelum mengisi formulir.

Usulan tiga layanan untuk demo: **Surat Keterangan Domisili**, **Surat Keterangan Usaha**, dan **Surat Keterangan Tidak Mampu**. Pilihan ini berasal dari contoh dalam draf dan perlu dikonfirmasi sebagai layanan yang sesuai untuk desa.

Setiap layanan memuat nama, kegunaan singkat, tombol **Lihat persyaratan**, dan **Ajukan surat**. Panel persyaratan memuat dokumen contoh, informasi proses, dan cara menerima hasil.

Persyaratan seperti KTP dan KK hanya merupakan skenario demo, bukan ketentuan resmi desa. Biaya dan waktu penyelesaian tidak diisi dengan angka perkiraan tanpa dasar.

**Tangkapan layar:** daftar layanan dengan satu panel syarat terbuka. Keterangan laporan: warga memilih jenis surat dan memeriksa kelengkapan berkas.

### Formulir pengajuan

**Tujuan:** pengisian terasa pendek dan warga memahami apa yang akan dikirim.

Gunakan satu halaman dengan tiga kelompok isian agar mudah dipresentasikan:

| Kelompok | Isian atau komponen |
| --- | --- |
| Data pemohon | Nama, identitas contoh yang disamarkan, alamat contoh, kontak contoh bila diperlukan |
| Keperluan surat | Jenis surat terpilih, keperluan, serta isian khusus sesuai jenis surat |
| Berkas dan konfirmasi | Lampiran contoh, ringkasan data, dan persetujuan penggunaan data untuk pengajuan |

Isian khusus: nama dan bidang usaha untuk surat usaha; keperluan pengajuan untuk domisili dan keterangan tidak mampu. Daftar isian final mengikuti layanan yang disepakati.

Pada demo, gunakan tombol **Isi data contoh** dan **Gunakan berkas contoh** agar presentasi tidak memerlukan identitas atau dokumen warga. Unggahan sebenarnya tidak diperlukan untuk rancangan awal.

Tindakan utama: **Kirim pengajuan**. Setelah berhasil, tampilkan bukti dengan nomor contoh `DEMO-AM-001`, kode akses demo, status **Diajukan**, dan tombol **Lihat status**. Nomor pengajuan dan nomor surat terbit adalah dua hal berbeda.

Keadaan yang dirancang: isian wajib kosong, lampiran belum lengkap, data sudah siap dikirim, berhasil dikirim, dan perbaikan pengajuan. Pesan kesalahan diletakkan dekat isian dan data yang sudah diisi tetap tersimpan selama proses demo.

**Tangkapan layar:** formulir berisi data contoh atau bukti pengajuan. Keterangan laporan: warga mengisi data dan melampirkan persyaratan untuk memperoleh nomor pengajuan.

### Lacak pengajuan

**Tujuan:** warga mengetahui posisi pengajuan dan tindakan selanjutnya.

Bagian awal memuat nomor pengajuan dan kode akses. Prototipe menyediakan **Gunakan pengajuan contoh**. Kode akses adalah gambaran kebutuhan privasi; simulasi tanpa backend tidak memberikan perlindungan akses sesungguhnya.

Hasil menampilkan nomor pengajuan, jenis surat, nama pemohon yang disamarkan, status saat ini, riwayat perubahan, catatan operator, dan tindakan yang relevan.

| Status | Penjelasan kepada warga | Tindakan warga |
| --- | --- | --- |
| Diajukan | Pengajuan tercatat dan menunggu pemeriksaan | Lihat ringkasan |
| Perlu perbaikan | Ada isian atau lampiran yang harus diperbaiki | Perbaiki pengajuan dengan nomor yang sama |
| Diproses | Berkas lengkap dan surat sedang disiapkan | Pantau perkembangan |
| Menunggu pengesahan | Draf surat menunggu persetujuan pejabat | Pantau perkembangan |
| Selesai | Surat telah disahkan dan hasil tersedia | Lihat atau unduh surat contoh |
| Ditolak | Pengajuan tidak dapat dilanjutkan; alasan ditampilkan | Baca alasan dan petunjuk berikutnya |

Usulan untuk demo: hasil berupa surat contoh yang dapat dilihat dan dicetak/disimpan sebagai PDF dari browser. Beri penanda **CONTOH — TIDAK BERLAKU**. Pilihan pengambilan fisik dapat disesuaikan setelah keputusan kelompok tersedia.

Keadaan tambahan: nomor tidak ditemukan dan kode akses tidak sesuai, dengan pesan yang tidak membocorkan isi pengajuan.

**Tangkapan layar:** riwayat status dan satu catatan operator. Keterangan laporan: warga memantau perkembangan dan melihat tindakan lanjutan tanpa harus menanyakan langsung ke kantor desa.

### Dasbor operator

**Tujuan:** menunjukkan bagaimana pengajuan warga diperiksa hingga menjadi arsip surat.

Susunan: navigasi samping **Pengajuan**, **Arsip surat**, dan **Kembali ke portal**; judul halaman; pencarian nomor atau nama contoh; filter status; daftar pengajuan; panel rincian saat satu baris dipilih.

Kolom daftar: nomor pengajuan, pemohon contoh, jenis surat, tanggal, status, dan tombol **Periksa**. Hindari menampilkan identitas lengkap pada tabel.

Panel rincian berisi ringkasan data, lampiran contoh, riwayat, catatan operator, serta tindakan menurut tahap:

- **Minta perbaikan:** catatan wajib, status menjadi Perlu perbaikan.
- **Verifikasi berkas:** status menjadi Diproses.
- **Ajukan pengesahan:** status menjadi Menunggu pengesahan.
- **Simulasi pejabat:** setujui atau tolak, dengan peran penanda tangan ditulis jelas. Penolakan memerlukan alasan.
- **Terbitkan surat contoh:** tersedia setelah persetujuan; memberi nomor surat contoh, hasil bertanda CONTOH, dan status Selesai.

Tab arsip menampilkan surat yang sudah terbit dengan pencarian dan pratinjau. Tidak perlu halaman manajemen pegawai, penduduk, anggaran, atau statistik tambahan.

**Tangkapan layar:** daftar pengajuan dengan panel pemeriksaan terbuka. Keterangan laporan: operator memeriksa kelengkapan, meminta perbaikan bila perlu, dan menyiapkan surat untuk pengesahan dan penerbitan.

## Alur presentasi

```text
Beranda
  → Layanan dan persyaratan
  → Formulir dengan data contoh
  → Bukti pengajuan dan nomor DEMO-AM-001
  → Lacak status Diajukan
  → Dasbor operator dan pemeriksaan
  → Diproses
  → Menunggu pengesahan
  → Persetujuan pejabat secara simulasi
  → Penerbitan surat contoh
  → Lacak status Selesai dan lihat hasil
```

Cabang perbaikan: operator mengisi catatan → status Perlu perbaikan → warga membuka formulir yang sama → memperbaiki dan mengirim ulang → status Diajukan. Riwayat lama dan nomor pengajuan tetap dipertahankan.

Skenario utama cukup satu pengajuan domisili. Sediakan pengajuan lain untuk memperlihatkan contoh status perbaikan dan selesai tanpa harus mengulang semua langkah. Tombol **Reset data demo** mengembalikan kondisi awal presentasi.

## Tata letak responsif

| Ukuran | Portal warga | Operator |
| --- | --- | --- |
| Ponsel, di bawah 768 px | Menu ringkas, satu kolom, tombol mudah disentuh, label di atas isian | Daftar menjadi kartu ringkas; rincian tampil penuh |
| Tablet, 768–1023 px | Daftar layanan dua kolom bila cukup | Navigasi ringkas dan tabel yang tetap terbaca |
| Desktop, 1024 px ke atas | Konten maksimum sekitar 1200 px; pembuka dua kolom; layanan tiga kolom | Navigasi samping, tabel utama, panel rincian |

Gunakan fokus keyboard yang jelas, label isian permanen, sasaran sentuh sekitar 44 px, dan pesan status berbentuk teks. Animasi dibuat ringan agar perhatian tetap pada alur layanan.

## Rencana implementasi setelah rancangan disepakati

Stack yang direncanakan: **React + Vite + JavaScript + CSS biasa + Supabase + pdf-lib**, dengan **Vercel** untuk hosting sebelum presentasi. Detail arsitektur dan perpindahan lingkungan ada pada [rancangan sistem terbaru](docs/RANCANGAN-SISTEM.md).

Development dan pengujian direncanakan di lokal dahulu, termasuk Supabase lokal melalui CLI/Docker. Pengajuan, status, akun, serta berkas contoh memakai PostgreSQL, Auth, dan Storage dari Supabase. localStorage bukan database utama. Surat disusun otomatis dari template dan diterbitkan sebagai PDF menggunakan pdf-lib setelah operator memeriksa serta menyetujui. Hosting Vercel dan Supabase cloud disiapkan setelah alur lokal siap, sebelum presentasi.

Pada implementasi demo, penanda **Prototipe akademik — seluruh data contoh** tetap terlihat. Jangan menggunakan NIK, nomor kontak, alamat rumah, berkas, tanda tangan, atau wajah warga asli. Login dan aturan akses direncanakan melalui Supabase Auth serta kebijakan akses database/Storage; semuanya masih perlu diimplementasikan dan diuji.

## Batas hasil tahap rancangan

Hasil tahap ini adalah struktur, arah visual, rincian layar, alur, dan pratinjau antarmuka. Website operasional, penyimpanan pengajuan, penerbitan dokumen, serta pengujian interaksi penuh dikerjakan pada tahap implementasi.

Sebelum mengisi konten final, kelompok perlu melengkapi profil dan sumber desa, memastikan jenis surat dan persyaratannya, memilih cara penyerahan hasil, serta menentukan informasi kontak dan aset visual yang dapat digunakan. Sambil menunggu, semua bagian tersebut dapat memakai contoh yang diberi label jelas.
