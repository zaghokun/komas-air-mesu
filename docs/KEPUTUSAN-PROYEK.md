# Keputusan proyek WP01 sampai WP06

Pembaruan 20 November 2026. Pengguna menyerahkan riset, keputusan, dan pengerjaan prototipe; hosting tetap masuk WP07.

| ID | Keputusan | Alasan dan dampak |
| --- | --- | --- |
| K01 | Sasaran Air Mesu Barat | Mengikuti pengguna; data Air Mesu Timur dikecualikan |
| K02 | Riset publik dengan batas klaim | Antrean, pencatatan manual, dan SOP surat belum terbukti. Manfaat sistem adalah tujuan prototipe |
| K03 | Nama sumber dipertahankan | Data Migas memberi petunjuk penamaan Air Mesu/Barat, bukan penetapan nama administratif |
| K04 | Redesain dari referensi Loa Duri Ilir | Mengambil arah portal, foto pembuka, profil, dan kabar; tidak menyalin identitas, foto pejabat, kode, atau data referensi |
| K05 | Antislop DURING | Dipilih pengguna; dials dan alasan visual ada di DESIGN.md |
| K06 | React, Vite, JavaScript, CSS | Sesuai pembahasan; komponen formulir dan status dipakai bersama |
| K07 | Express dan MySQL Laragon untuk lokal | Arahan terbaru menyediakan Laragon. MySQL 8.4.3 di port 3306 berhasil diuji; tidak memasang Supabase lokal/Docker |
| K08 | Schema aplikasi dan tes dipisahkan | air_mesu_barat_prototype dan air_mesu_barat_tests_prototype; database Laragon lain tidak diubah |
| K09 | Auth lokal berupa sesi HttpOnly dan hash scrypt | Peran ditentukan server; sesi memori hilang saat API restart |
| K10 | Berkas berupa BLOB MySQL | Cukup satu layanan data lokal untuk lampiran dan hasil |
| K11 | pdf-lib dijalankan di API | PDF dihasilkan dari data yang disetujui dan disimpan untuk unduhan ulang yang sama |
| K12 | Penerbitan dalam transaksi dan row lock | Mencegah surat ganda saat klik bersamaan; kegagalan membatalkan transaksi |
| K13 | Operator menyetujui sekaligus menerbitkan | Sesuai alur pengguna; pengesahan hanya simulasi tanpa cap/tanda tangan resmi |
| K14 | Tiga jenis surat adalah skenario contoh | Persyaratan nyata belum terverifikasi, tidak diklaim sebagai SOP desa |
| K15 | Foto Unsplash berlabel ilustrasi | Belum ada foto sasaran yang terverifikasi; tidak diklaim sebagai dokumentasi desa |
| K16 | Tanpa statistik, pejabat, dan kontak perkiraan | Menghindari fakta yang tidak didukung sumber untuk Barat |
| K17 | Lima layar inti plus profil, sumber, login | Memberi bahan laporan dan navigasi dengan tujuan nyata |
| K18 | UTC di database, Asia/Jakarta pada tampilan | Mencegah selisih tujuh jam dari konfigurasi waktu Laragon |
| K19 | Hosting belum dilakukan | Dikerjakan di WP07 sebelum presentasi |
| K20 | Target cloud Vercel/Supabase memerlukan migrasi | MySQL lokal dan sesi memori tidak otomatis berfungsi di cloud; API, auth, schema, dan storage perlu disesuaikan |

## Dasar visual dan aset

Referensi pengguna https://loaduriilir.digitaldesa.id/ diamati melalui browser 19 November 2026. Susunan portal, pembuka fotografis, profil, dan kabar menjadi arah; data Loa Duri Ilir tidak dipindahkan.

Foto: Faried Anzyari, Kalaserena, Gowa, Sulawesi Selatan; terbit 11 Februari 2023. Sumber: https://unsplash.com/photos/an-aerial-view-of-a-forest-with-lots-of-trees-5VcyGQeHv0k . Halaman menyatakan Unsplash License. Salinan di public/assets/forest-illustration.jpg diberi keterangan sebagai ilustrasi. Tidak membuat lambang, foto pejabat, avatar warga, atau tanda tangan palsu.

Font sistem Segoe UI/Arial untuk kontrol dan Georgia/Times New Roman untuk judul; tidak memakai CDN font. Rancangan lama tetap arsip. DESIGN.md dan RANCANGAN-FINAL.md menjadi acuan hasil yang dikerjakan.

## Batas riset

Riset publik sudah menghasilkan catatan dan matriks klaim. Konfirmasi lapangan belum dilakukan; pertanyaan terbuka tetap bagian hasil WP01. Tidak ada pesan dikirim ke perangkat desa. Tidak ada identitas atau berkas warga asli yang dimasukkan ke prototipe.
