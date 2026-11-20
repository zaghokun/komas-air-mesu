# Prototipe Profil dan Layanan Surat Desa Air Mesu Barat

Proyek tugas akhir mata kuliah **Komputer dan Masyarakat**: prototipe website untuk memperkenalkan desa dan mendemonstrasikan alur pengajuan hingga penerbitan surat. Hasil digunakan untuk presentasi dan bahan tangkapan layar laporan.

**Desa sasaran sesuai arahan pengguna:** Desa Air Mesu Barat, Kecamatan Pangkalan Baru, Kabupaten Bangka Tengah, Provinsi Kepulauan Bangka Belitung.

**Catatan penamaan:** sumber publik menggunakan sebutan Air Mesu Barat, sementara daftar administrasi Pemkab yang ditemukan mencantumkan Air Mesu dan Air Mesu Timur. Hubungan sebutan Barat dengan nama administratif Air Mesu perlu dipastikan sebelum menulis identitas resmi. Data Air Mesu Timur dikecualikan dari profil proyek; data berlabel Air Mesu tanpa keterangan Barat diperiksa kecocokannya terlebih dahulu.

**Pembaruan terakhir:** 19 November 2026, WIB.

## Status dan keputusan aktif

| Hal | Status |
| --- | --- |
| Tahap aktif | Pendokumentasian rancangan sistem dan persiapan development lokal |
| Riset awal sumber publik | Tersedia; dua sumber yang menyebut Barat ditambahkan. Pencocokan sumber awal dengan sasaran Barat masih terbuka |
| Validasi masalah layanan surat | Terbuka; belum ada bukti yang cukup untuk menyatakan layanan masih manual |
| Mockup sebelumnya | Dikesampingkan sementara sesuai arahan pengguna; bukan acuan desain yang disetujui |
| Instalasi skills dan alat tambahan | Disiapkan pengguna; belum dinyatakan selesai |
| Nama aplikasi dan identitas visual | Belum diputuskan |
| Stack yang direncanakan | React + Vite + JavaScript + CSS biasa + Supabase + pdf-lib; Vercel untuk hosting menjelang presentasi |
| Lingkungan development | Lokal terlebih dahulu; frontend dan layanan Supabase lokal direncanakan berjalan di komputer pengembang |
| Deployment online | Dilakukan setelah alur lokal siap dan sebelum presentasi; belum dilakukan sekarang |
| Implementasi website | Belum dimulai |
| Paket delivery final | Belum dibuat; daftar hasil dan kriteria tersedia di bawah |
| Penanggung jawab riset dan prototipe | Pengguna mengerjakan riset desa sekaligus perancangan, development, pengujian, dan persiapan delivery prototipe |

**Arahan kerja:** mulai dari riset. Pengembangan mockup dan antarmuka menunggu pengguna menyelesaikan persiapan skills/alat dan memberi arahan berikutnya. Jangan memakai mockup terdahulu sebagai desain final atau persetujuan implementasi.

**Urutan pengerjaan yang disepakati:** development dan pengujian di lokal → persiapan lingkungan online → deployment ke Vercel dan Supabase → uji tautan sebelum presentasi. Tahap saat ini hanya mencatat rencana; belum memasang dependency, menjalankan layanan, atau membuat deployment.

## Dokumen proyek

| Berkas | Fungsi | Kedudukan |
| --- | --- | --- |
| `Draft Laporan Proyek Akhir — Landing Page Desa & Persuratan Desa.docx` | Sumber kebutuhan tugas, pembagian peran, daftar layar, dan jadwal kelompok | Draf pengguna; isian sementara perlu dilengkapi |
| `README.md` | Pelacakan progres, keputusan, dan paket serah terima | Catatan utama progres proyek |
| `docs/RISET-DESA-AIR-MESU.md` | Fakta, sumber, keterbatasan akses, dan pertanyaan verifikasi desa | Hasil riset awal 19 November 2026 |
| `docs/RANCANGAN-SISTEM.md` | Stack, arsitektur, pembuatan surat otomatis, dan perpindahan dari lokal ke hosting | Acuan teknis terbaru; belum diimplementasikan |
| `RANCANGAN-WEBSITE.md` | Usulan rancangan dari tahap sebelumnya | Dikesampingkan sementara; belum disetujui |

Belum ada aplikasi yang dapat dijalankan. Petunjuk instalasi dan perintah menjalankan aplikasi ditambahkan setelah implementasi tersedia.

## Stack dan lingkungan kerja

| Bagian | Stack | Saat development lokal | Menjelang presentasi |
| --- | --- | --- | --- |
| Antarmuka | React + JavaScript | Berjalan melalui development server Vite di localhost | Hasil build statis di Vercel |
| Build | Vite | Pengembangan dan pemeriksaan hasil build di komputer pengembang | Build untuk deployment |
| Tampilan | CSS biasa | Dikembangkan dan diperiksa secara lokal | Disertakan dalam hasil build |
| Database | Supabase PostgreSQL | Supabase lokal melalui CLI dan Docker | Project Supabase cloud |
| Login dan peran | Supabase Auth | Akun warga dan operator contoh di lingkungan lokal | Akun demo pada lingkungan cloud |
| Lampiran dan hasil surat | Supabase Storage | Berkas contoh di penyimpanan lokal Supabase | Berkas contoh di Storage cloud |
| Surat otomatis | pdf-lib | Draf dari template dan pembuatan PDF di browser lokal | Script yang sama berjalan pada website online |

Target lokal mencakup frontend dan layanan data. Supabase CLI/Docker belum diperiksa atau dipasang. localStorage tidak direncanakan sebagai database utama; bila dipakai untuk preferensi tampilan, pengajuan tetap disimpan di Supabase.

Saat pindah ke hosting, struktur database dan aturan akses diterapkan lewat migration, lalu akun serta data demo disiapkan di cloud. Data, akun, dan berkas dari lingkungan lokal tidak diasumsikan ikut berpindah otomatis. Detailnya ada pada [rancangan sistem](docs/RANCANGAN-SISTEM.md).

## Tujuan dan cakupan

Portal warga mempertemukan profil desa, pengumuman, informasi persyaratan, pengajuan surat, dan pelacakan status. Area perangkat desa memperlihatkan pemeriksaan, permintaan perbaikan, pengesahan sesuai peran, penerbitan surat contoh, dan arsip.

Daftar awal dari draf laporan adalah **lima layar utama**:

1. Beranda dan profil desa.
2. Daftar layanan surat dan persyaratan.
3. Formulir pengajuan dan lampiran contoh.
4. Pelacakan status pengajuan.
5. Dasbor operator.

Daftar tersebut adalah kebutuhan awal, bukan penetapan tata letak atau gaya visual. Jenis surat, kolom formulir, persyaratan, nama aplikasi, serta cara menerima surat belum final.

Prototipe memakai data fiktif dan simulasi. Backend menggunakan layanan Supabase; integrasi Dukcapil, tanda tangan elektronik resmi, pembayaran, serta pengelolaan data penduduk asli belum menjadi cakupan tugas. Surat disusun otomatis dari template, diperiksa operator, lalu diterbitkan sebagai PDF contoh setelah persetujuan.

## Temuan riset yang memengaruhi proyek

- **Sasaran proyek adalah Air Mesu Barat.** Sumber tentang administrasi Air Mesu Timur tidak digunakan sebagai bukti masalah desa sasaran.
- Sumber kepolisian dan artikel penelitian secara eksplisit menyebut Air Mesu Barat. Penamaan administratifnya masih perlu dicocokkan dengan sumber resmi wilayah.
- Profil Air Mesu pada portal Pemkab serta informasi durian, Pujadesa, dan nganggung dari riset awal perlu diperiksa kecocokannya dengan sasaran Barat sebelum dijadikan konten.
- Belum tersedia bukti terverifikasi tentang antrean surat, pencatatan manual, layanan surat daring yang sudah ada, standar persyaratan, biaya, atau lama pelayanan.

Rujukan dan tingkat verifikasi masing-masing temuan ada pada [catatan riset](docs/RISET-DESA-AIR-MESU.md). Temuan konteks desa tidak otomatis membuktikan masalah layanan persuratan.

## Pelacakan progres

Legenda: **Selesai** berarti hasil sudah tersedia, **Terbuka** masih membutuhkan pekerjaan atau bukti, **Menunggu** mengikuti arahan/persiapan pengguna, dan **Belum dimulai** belum dikerjakan. Jangan memakai persentase tanpa ukuran yang jelas.

| ID | Pekerjaan | Status | Hasil atau syarat selesai |
| --- | --- | --- | --- |
| P01 | Membaca kebutuhan dalam draf laporan | Selesai | Cakupan dan lima layar awal diketahui |
| P02 | Mengonfirmasi desa sasaran | Selesai | Pengguna menetapkan Air Mesu Barat; penamaan administratif masih diperiksa |
| P03 | Menyusun README progres dan delivery | Selesai | Berkas ini |
| P04 | Riset awal sumber publik | Selesai untuk penelusuran awal | Sumber khusus Barat ditambahkan; kecocokan sumber awal masih diperiksa |
| P05 | Memvalidasi masalah serta proses surat desa | Terbuka | Bukti khusus Air Mesu; jenis surat, syarat, dan alur dikonfirmasi |
| P06 | Melengkapi fakta profil dan aset | Terbuka | Pastikan penamaan Barat, cocokkan sumber awal, lengkapi data bertahun, kontak resmi, dan aset |
| P07 | Menyiapkan skills dan alat | Menunggu pengguna | Pengguna menyatakan alat siap atau memberikan instruksi |
| P08 | Mendokumentasikan kebutuhan, nama, dan stack | Sebagian selesai | Stack serta urutan lokal ke hosting tercatat; nama dan desain final masih terbuka |
| P09 | Membuat rancangan baru setelah riset | Menunggu | Rancangan yang ditinjau pengguna; mockup lama tidak diasumsikan diterima |
| P10 | Implementasi portal dan alur persuratan | Belum dimulai | Skenario pengajuan sampai hasil dapat didemokan |
| P11 | Pemeriksaan responsif dan alur demo | Belum dimulai | Hasil pemeriksaan serta keterbatasan dicatat |
| P12 | Tangkapan layar dan keterangan laporan | Belum dimulai | Lima layar final dengan data contoh |
| P13 | Menyusun dan memeriksa paket delivery | Belum dimulai | Paket memenuhi daftar serah terima di bawah |
| P14 | Menyiapkan lingkungan lokal | Belum dimulai | Vite dan Supabase lokal dapat dijalankan; akun serta data demo tersedia |
| P15 | Deployment menjelang presentasi | Belum dimulai | Build di Vercel, database/Auth/Storage di Supabase cloud, dan alur diuji melalui tautan online |

## Paket kerja dan proses delivery prototipe

**Penanggung jawab: pengguna**, untuk riset Desa Air Mesu Barat dan pembuatan prototipe sampai siap dipresentasikan. Penugasan riset dan prototipe mengikuti arahan terbaru ini apabila berbeda dengan pembagian tugas pada draf laporan awal. Hasil riset, screenshot, dan panduan demo menjadi bahan yang dapat digunakan kelompok untuk menyusun laporan serta presentasi.

Paket kerja berikut menunjukkan urutan pengerjaan dan hasil yang perlu tersedia pada setiap tahap. Daftar paket serah terima pada bagian sesudahnya menjelaskan isi hasil akhirnya.

| Paket | Pekerjaan pengguna | Delivery tahap tersebut | Status |
| --- | --- | --- | --- |
| WP01 — Riset desa | Memastikan sasaran Barat, menelusuri sumber, mencocokkan fakta, dan memvalidasi kebutuhan layanan surat | Catatan riset, daftar sumber bertanggal akses, matriks bukti masalah, dan daftar informasi yang masih terbuka; bagian dari D03 | Riset awal tersedia; validasi masih terbuka |
| WP02 — Kebutuhan dan rancangan | Menentukan isi profil, layanan yang didemokan, isian formulir, alur persetujuan, template surat, dan rancangan layar | Kebutuhan yang dapat diperiksa, rancangan sistem, rancangan layar baru, dan skenario demo; bagian dari D04 | Rancangan teknis tersedia; kebutuhan rinci dan desain belum final |
| WP03 — Lingkungan lokal dan data | Menyiapkan React/Vite, Supabase lokal melalui CLI/Docker, struktur database, aturan akses, akun, dan data contoh | Proyek yang dapat dijalankan di localhost, migration, seed, konfigurasi contoh, dan petunjuk setup; bagian dari D01/D02 | Belum dimulai |
| WP04 — Portal dan pengajuan | Membuat beranda/profil, layanan, formulir, lampiran contoh, dan pelacakan yang terhubung ke Supabase lokal | Alur warga yang dapat dicoba dari memilih layanan sampai pengajuan tercatat; bagian dari D01 | Belum dimulai |
| WP05 — Operator dan surat otomatis | Membuat pemeriksaan, catatan perbaikan, persetujuan, pengisian template, penerbitan PDF, dan arsip | Alur lengkap pengajuan → pemeriksaan → persetujuan → surat contoh tersedia; bagian dari D01 | Belum dimulai |
| WP06 — Pemeriksaan dan bahan laporan | Mencoba alur berhasil dan gagal, memeriksa tampilan serta PDF, menyiapkan reset demo, dan mengambil screenshot | Catatan hasil pemeriksaan, lima screenshot berketerangan, dan panduan demonstrasi; D05/D06 serta bahan D02 | Belum dimulai |
| WP07 — Hosting dan serah terima | Menyiapkan Supabase cloud, menerapkan migration dan data demo, deploy ke Vercel, lalu memeriksa akses dari perangkat lain | Tautan online teruji, petunjuk lokal sebagai cadangan, dan ZIP final; D07/D08 | Sebelum presentasi, setelah versi lokal siap |

### Titik pemeriksaan hasil

1. **Riset siap menjadi dasar rancangan:** sumber cocok dengan sasaran desa, fakta memiliki rujukan, dan hal yang belum terbukti ditulis sebagai pertanyaan atau asumsi. Bahan profil dan kebutuhan surat dapat ditelusuri kembali ke sumbernya.
2. **Rancangan siap dikembangkan:** jenis surat demo, data yang dibutuhkan, peran, status, template, serta urutan demo sudah dicatat. Stack dan lingkungan lokal mengikuti rancangan sistem yang tersedia.
3. **Versi lokal siap didemokan:** warga dapat mengajukan; operator dapat memeriksa, meminta perbaikan, dan menyetujui; PDF sesuai data yang disetujui; status dapat dilacak; demo dapat diulang dari kondisi awal.
4. **Versi online siap dipresentasikan:** seluruh alur lokal sudah dicoba pada tautan Vercel dengan Supabase cloud, termasuk login, data antarperangkat, dan unduhan hasil. Screenshot serta panduan sesuai versi yang akan ditunjukkan.
5. **Paket siap diserahkan:** isi D01–D08 yang diperlukan sudah tersedia, ZIP diperiksa ulang, dan catatan keterbatasan disertakan. Hasil riset tetap masuk paket agar kelompok dapat memeriksa dasar konten dan masalah yang dibahas.

### Cara mencatat delivery setiap tahap

Setiap paket yang selesai dicatat di riwayat progres dengan tanggal, kode WP, lokasi berkas atau tautan, hasil pemeriksaan singkat, dan pekerjaan yang masih terbuka. Status Selesai diberikan setelah hasil tahap tersebut tersedia dan sudah diperiksa. Perubahan kebutuhan dari hasil riset dicatat sebelum melanjutkan implementasi bagian yang terdampak.

Development tetap dilakukan di lokal terlebih dahulu. WP07 dikerjakan setelah pemeriksaan versi lokal, dengan waktu untuk mencoba tautan online sebelum presentasi. Jadwal rinci tiap paket disesuaikan dengan tenggat kelompok pada bagian jadwal acuan.

## Paket serah terima atau delivery

Delivery di sini berarti paket hasil yang akan diserahkan untuk presentasi dan laporan. Ini belum berarti instalasi dependency atau pembuatan `package.json`.

| Kode | Hasil | Isi minimum | Status |
| --- | --- | --- | --- |
| D01 | Source prototipe | Kode, aset, template surat, migration database, seed data demo, berkas dependency, serta contoh variabel lingkungan tanpa rahasia | Belum dibuat |
| D02 | Petunjuk menjalankan | Prasyarat lokal termasuk Supabase CLI/Docker, perintah menjalankan/build, dan cara reset demo | Belum dibuat |
| D03 | Riset dan sumber | Ringkasan fakta, sumber langsung, tanggal akses, serta data yang belum terverifikasi | Riset awal tersedia |
| D04 | Dokumentasi rancangan final | Daftar halaman, alur warga/operator, status, arsitektur, dan keputusan desain | Rancangan teknis tersedia; desain final menunggu |
| D05 | Tangkapan layar | Lima gambar layar utama dengan keterangan singkat untuk laporan | Belum dibuat |
| D06 | Panduan demonstrasi | Urutan klik 3–5 menit, data contoh, pergantian peran, dan pengulangan demo | Belum dibuat |
| D07 | Akses presentasi | Tautan Vercel yang terhubung ke Supabase cloud dan sudah diuji; cara menjalankan lokal sebagai cadangan | Belum dibuat |
| D08 | Paket arsip final | ZIP berisi hasil final, petunjuk, sumber, dan catatan versi | Belum dibuat |

Struktur berikut adalah **rencana**, bukan daftar folder yang semuanya sudah tersedia:

```text
komas-landing-page/
├── README.md
├── docs/
│   ├── RISET-DESA-AIR-MESU.md
│   ├── RANCANGAN-SISTEM.md
│   ├── RANCANGAN-FINAL.md            [nanti]
│   ├── PANDUAN-DEMO.md              [nanti]
│   └── CATATAN-VERIFIKASI.md         [nanti]
├── [source dan konfigurasi stack]    [nanti]
└── delivery/                        [nanti]
    ├── screenshots/
    ├── panduan-menjalankan.md
    └── prototipe-desa-air-mesu-barat.zip
```

## Kriteria paket siap diserahkan

- [ ] Aplikasi dapat dibuka mengikuti petunjuk pada lingkungan presentasi.
- [ ] Warga dapat melihat layanan, mengisi data contoh, dan memperoleh nomor pengajuan.
- [ ] Pelacakan menampilkan status dan catatan yang sesuai tindakan operator.
- [ ] Alur perbaikan berkas dan penerbitan hasil contoh dapat didemokan.
- [ ] Draf surat terisi otomatis dari formulir; PDF hasil sesuai data yang disetujui operator.
- [ ] Jika pengesahan ditampilkan, peran operator dan pejabat dijelaskan.
- [ ] Data dapat dikembalikan ke kondisi awal untuk mengulang presentasi.
- [ ] Konten fakta memiliki sumber; data demo diberi penanda.
- [ ] Tidak ada identitas atau lampiran warga asli pada layar dan paket.
- [ ] Tampilan utama terbaca pada laptop dan ponsel.
- [ ] Lima tangkapan layar serta keterangannya sesuai versi final.
- [ ] Sumber aset, keterbatasan simulasi, dan petunjuk akses disertakan.
- [ ] Sebelum presentasi, tautan online diuji dari perangkat lain untuk pengajuan, persetujuan, pelacakan, dan unduhan PDF.
- [ ] Lingkungan cloud memiliki migration, akun demo, data contoh, serta berkas yang dibutuhkan; seluruh konfigurasi sudah mengarah ke cloud.
- [ ] ZIP dibuka ulang dan isinya diperiksa sebelum penyerahan.

## Jadwal acuan dari draf laporan

Jadwal ini berasal dari draf kelompok dan belum merupakan pembaruan tenggat dari pengguna:

| Tanggal | Target draf |
| --- | --- |
| 19–20 November 2026 | Riset sumber, profil desa, dan persiapan prototipe |
| 23 November 2026 | Tangkapan layar dan tautan prototipe untuk penulis Bab 3 |
| 24 November 2026 | Penyatuan laporan dan berkas presentasi |
| 25 November 2026 | Unggah laporan kelompok |

## Catatan keputusan

| Tanggal | Keputusan | Dasar |
| --- | --- | --- |
| 19 November 2026 | Proyek untuk presentasi akademik; fokus pada prototipe | Arahan awal pengguna |
| 19 November 2026 | Mockup terdahulu belum dipakai; persiapan skills dilakukan dahulu | Arahan lanjutan pengguna |
| 19 November 2026 | Langkah pertama adalah riset Air Mesu dengan lokasi administratif lengkap | Arahan lanjutan pengguna |
| 19 November 2026 | Sasaran diperjelas menjadi Desa Air Mesu Barat; data Air Mesu Timur dikecualikan, sumber berlabel Air Mesu diperiksa kecocokannya | Koreksi terbaru pengguna |
| 19 November 2026 | Nama aplikasi dan desain final belum ditetapkan; stack telah direncanakan pada keputusan berikut | Menjaga nama dan desain tetap terbuka |
| 19 November 2026 | Menggunakan React, Vite, JavaScript, CSS biasa, Supabase, dan pdf-lib; hosting frontend di Vercel | Stack dari pembahasan yang diminta pengguna untuk dicatat |
| 19 November 2026 | Development dan pengujian dilakukan di lokal; hosting disiapkan sebelum presentasi | Arahan terbaru pengguna |
| 19 November 2026 | Surat disusun dari template otomatis dan diterbitkan setelah operator memeriksa serta menyetujui | Pembahasan fitur surat otomatis |
| 19 November 2026 | Pengguna menjadi penanggung jawab riset desa sekaligus pembuatan dan delivery prototipe; pekerjaan dibagi menjadi WP01–WP07 | Arahan terbaru pengguna tentang cakupan pekerjaannya |

## Riwayat progres

| Tanggal | Perubahan | Pekerjaan berikutnya |
| --- | --- | --- |
| 19 November 2026 | Membuat README; mencatat paket delivery; menyusun riset awal dan sumber; menandai rancangan sebelumnya sebagai belum dipakai | Validasi data desa dan layanan; persiapan skills oleh pengguna; menunggu arahan desain baru |
| 19 November 2026 | Memperjelas sasaran Barat dan menambahkan dua sumber yang menyebutnya; mencatat perbedaan penamaan administratif | Cocokkan sumber Air Mesu dengan Barat sebelum mengisi profil final |
| 19 November 2026 | Mencatat stack, rancangan sistem, surat otomatis, serta urutan development lokal lalu hosting | Persiapan alat dan lingkungan lokal sesuai arahan berikutnya; belum melakukan deployment |
| 19 November 2026 | Menambahkan penanggung jawab riset/prototipe, paket kerja WP01–WP07, dan titik pemeriksaan delivery dari riset hingga presentasi | Melanjutkan paket sesuai status dan mencatat hasil yang sudah diperiksa |

Pada pembaruan berikutnya, perbarui tanggal, tabel progres, keputusan yang berubah, dan hasil delivery yang benar-benar sudah tersedia. Bedakan fakta, usulan, dan pekerjaan yang belum dilakukan.
