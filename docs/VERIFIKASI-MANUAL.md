# Checklist verifikasi manual di laptop

Uji prototipe lokal Desa Air Mesu Barat sebelum presentasi. Kerjakan bagian 1 sampai 5 secara berurutan dengan satu pengajuan baru. Centang setiap kotak setelah hasilnya sesuai. Jika ada langkah yang gagal, catat hasilnya dan lanjutkan ke pemeriksaan lain yang masih bisa dilakukan.

Gunakan tombol **Isi data contoh** dan **Gunakan berkas contoh**. Tombol **Reset data demo** menghapus pengajuan yang sudah dibuat pada database prototipe, jadi alur ini dimulai tanpa reset.

## 1. Nyalakan proyek

- [ ] Buka Laragon dan nyalakan MySQL.
- [ ] Buka PowerShell di folder proyek dan jalankan perintah di bawah. Sesuaikan alamat folder jika proyek disimpan di lokasi lain. Untuk laptop yang baru disiapkan, ikuti [persiapan pertama kali di Panduan Demo](PANDUAN-DEMO.md#persiapan-pertama-kali) terlebih dahulu. Jika server sudah berjalan, lanjut ke pemeriksaan beranda dan API.

  ```powershell
  Set-Location 'D:\project\komas-landing-page'
  npm run dev
  ```

- [ ] Biarkan terminal terbuka. Buka [beranda](http://127.0.0.1:5173/) dan [health API](http://127.0.0.1:3001/api/health). Beranda menampilkan Air Mesu Barat dan API mengembalikan `"ok": true`. Jika salah satu gagal, lihat [pemecahan masalah di README](../README.md#jika-proyek-belum-bisa-dibuka) sebelum menguji pengajuan.

## 2. Periksa halaman publik

- [ ] Buka **Profil desa**. Pastikan profil menyebut Kecamatan Pangkalan Baru, Kabupaten Bangka Tengah, dan Provinsi Kepulauan Bangka Belitung. Foto diberi keterangan sebagai ilustrasi.
- [ ] Buka **Kabar & sumber**, pilih satu artikel, lalu buka tautan sumbernya. Artikel menampilkan tanggal dan sumber, dan tautan mengarah ke dokumen atau situs yang disebut. Jika situs sumber gagal dimuat, catat alamatnya.
- [ ] Buka **Layanan surat**. Pastikan ada Domisili, Usaha, dan Keterangan Tidak Mampu. Klik **Lihat persyaratan** pada Domisili, periksa daftar syarat contoh, lalu tekan `Esc`. Dialog tertutup.

## 3. Ajukan surat sebagai warga

- [ ] Jika akun operator atau warga kedua masih aktif, klik **Keluar**. Dari layanan Domisili, klik **Ajukan surat**. Jika belum masuk, pilih **Gunakan akun warga** lalu **Masuk**. Formulir Domisili terbuka.
- [ ] Klik **Kirim pengajuan** saat formulir kosong. Formulir menandai kolom wajib dan pengiriman tertahan.
- [ ] Klik **Isi data contoh** dan centang pernyataan penggunaan data fiktif. Coba kirim sebelum menambahkan lampiran. Formulir meminta lampiran.
- [ ] Klik **Gunakan berkas contoh**. Pastikan `lampiran-contoh.pdf` muncul, lalu klik **Kirim pengajuan**. Rincian menampilkan status **Diajukan**, nomor pengajuan, lampiran, dan riwayat. Salin **nomor pengajuan** dan **URL rincian** untuk dipakai pada langkah berikutnya.
- [ ] Saat masih memakai akun warga, buka [Meja operator](http://127.0.0.1:5173/operator). Halaman meminta akun operator dan antrean tidak tampil.

## 4. Minta perbaikan, lalu terbitkan sebagai operator

- [ ] Dari halaman akses operator, klik **Ganti akun demo**, **Gunakan akun operator**, lalu **Masuk**. Di **Antrean pengajuan**, cari nomor dari bagian 3, pilih status **Diajukan**, dan buka baris yang cocok. Rincian menunjukkan data warga yang tadi dikirim.
- [ ] Buka `lampiran-contoh.pdf`, lalu di halaman operator klik **Pratinjau draf surat**. Lampiran bisa dibuka dan pratinjau menampilkan tulisan `DRAF - BELUM DITERBITKAN`. Jika PDF tidak tampil di dalam dialog, gunakan **Buka PDF di tab terpisah** dan catat kondisi pratinjaunya.
- [ ] Klik **Minta perbaikan**. Coba **Simpan tindakan** dengan catatan kosong dan pastikan pengiriman tertahan. Masukkan `Mohon perjelas keperluan surat contoh.` lalu simpan. Status menjadi **Perlu perbaikan**.
- [ ] Klik **Keluar**, lalu masuk lagi sebagai warga. Buka URL rincian yang disalin. Catatan operator muncul. Klik **Perbaiki pengajuan**, ubah **Keperluan pengajuan** menjadi `Keperluan administrasi contoh setelah dilengkapi.`, centang pernyataan, lalu klik **Kirim perbaikan**. Status kembali **Diajukan**, nomor pengajuan tetap sama, dan lampiran sebelumnya masih tersedia.
- [ ] Masuk kembali sebagai operator, buka pengajuan yang sama, lalu klik **Mulai proses** dan **Simpan tindakan**. Status menjadi **Diproses**. Jika daftar kosong karena filter, ubah **Status** ke **Semua status**.
- [ ] Klik **Setujui dan terbitkan**, lalu **Ya, terbitkan surat**. Status menjadi **Selesai** dan nomor surat terbit dengan format `CONTOH/<nomor urut>/DOM/<tahun>`. Buka **Arsip surat** dan pastikan pengajuan yang sama bisa ditemukan di sana.

## 5. Unduh hasil dan periksa akses

- [ ] Masuk kembali sebagai warga dan buka URL rincian tadi. Pastikan status **Selesai** dan riwayat menampilkan permintaan perbaikan, pengiriman ulang, proses, dan persetujuan.
- [ ] Klik **Lihat surat terbit** dan **Unduh surat PDF**. Buka berkas hasil unduhan. Pastikan nomor surat sama dengan yang tampil di halaman, isi mencerminkan keperluan yang sudah diperbaiki, dan tulisan `CONTOH - TIDAK BERLAKU` terlihat.
- [ ] Tekan `Ctrl+R` pada halaman rincian. Nomor dan status **Selesai** tetap tampil. Jika perlu memeriksa penyimpanan setelah server dimulai ulang, hentikan server dengan `Ctrl+C`, jalankan `npm run dev` lagi, lalu masuk ulang dan buka rincian yang sama.
- [ ] **Keluar**, lalu buka lagi URL rincian. Halaman mengarahkan ke layar masuk. Ketik `warga2@demo.test` dengan kata sandi `WargaDemo123!`, masuk, lalu buka kembali URL yang sama. Pengajuan akun pertama tidak tampil dan halaman memberi pesan bahwa pengajuan tidak ditemukan atau tidak dapat diakses.

## 6. Pemeriksaan tambahan jika ada waktu

- [ ] **Penolakan.** Buat pengajuan contoh kedua dengan akun warga pertama, misalnya Surat Keterangan Usaha. Masuk sebagai operator, pilih pengajuan baru itu, klik **Tolak pengajuan**, isi alasan contoh, lalu **Simpan tindakan**. Sebagai warga, periksa status **Ditolak**, alasan pada riwayat, dan pastikan tombol **Unduh surat PDF** tidak tersedia. Pengajuan yang sudah selesai pada bagian 4 tetap dapat diunduh.
- [ ] **Pencarian.** Di meja operator, cari nomor yang tidak ada. Daftar menunjukkan keadaan kosong. Klik **Bersihkan filter** dan periksa daftar kembali muncul.
- [ ] **Ponsel.** Persempit jendela browser atau gunakan simulasi 375 px di DevTools. Coba beranda, formulir, dan meja operator. Menu bisa dibuka dan ditutup, teks serta tombol tetap terlihat, dan halaman tidak perlu digeser ke samping.
- [ ] **Keyboard.** Tekan `Tab` untuk berpindah ke tombol **Lihat persyaratan**. Fokus terlihat. `Enter` membuka dialog dan `Esc` menutupnya.

## Catat hasil dan tindak lanjut

Isi satu baris per kendala. Salin pesan yang tampil dan sertakan tangkapan layar bila ada. Untuk bahan laporan, simpan gambar setelah langkah operator menampilkan rincian pengajuan dan setelah warga melihat surat berstatus **Selesai**.

- Tanggal dan browser
- Nomor pengajuan dan nomor surat
- Bagian yang lulus, gagal, atau belum dicoba

| Bagian dan langkah | Hasil yang diharapkan | Hasil di laptop | Tangkapan layar atau pesan |
| --- | --- | --- | --- |
| | | | |

Jika ada yang gagal, simpan catatan sebelum mencoba ulang. Untuk pengiriman yang tampak gagal, buka **Pengajuan saya** dan cari pengajuannya sebelum mengirim lagi. Setelah kendala diperbaiki, ulangi langkah yang gagal dan langkah setelahnya yang bergantung pada hasil tersebut.
