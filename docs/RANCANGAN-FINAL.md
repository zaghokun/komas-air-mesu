# Rancangan prototipe lokal Air Mesu Barat

Pembaruan 20 November 2026. Berdasarkan referensi pengguna dan antislop DURING. Arah visual ada di ../DESIGN.md dan keputusan teknis di KEPUTUSAN-PROYEK.md.

| Halaman | Tujuan |
| --- | --- |
| / | Pembuka foto berlabel ilustrasi, akses layanan, profil singkat, kabar dan catatan wilayah |
| /profil | Konteks lingkungan dan penamaan dengan rujukan |
| /kabar dan /kabar/:slug | Artikel ringkasan dan sumber asli |
| /layanan | Tiga layanan contoh serta dialog syarat |
| /masuk | Login akun warga/operator demo |
| /pengajuan/:jenis | Data fiktif, keperluan, lampiran, dan konfirmasi |
| /lacak dan /lacak/:id | Daftar milik akun, pencarian, riwayat, catatan, dan PDF |
| /perbaikan/:id | Kirim ulang dengan nomor yang sama |
| /operator | Antrean, filter, pemeriksaan, persetujuan, penolakan, arsip, dan reset |

## Alur

Pilih layanan → masuk sebagai warga → isi data dan lampiran contoh → Diajukan → operator memeriksa draf → Diproses bila perlu → Setujui dan terbitkan → nomor dan PDF tersimpan → Selesai → warga mengunduh hasil.

Perbaikan memerlukan catatan operator dan pengiriman ulang warga dengan nomor tetap. Penolakan memerlukan alasan dan menutup pengajuan. Surat selesai tidak dapat diedit atau ditolak ulang.

## Formulir

Isian umum adalah nama, identitas berawalan DEMO-, alamat contoh, pekerjaan, dan keperluan. Usaha menambahkan nama/bidang/alamat usaha. Lampiran PDF/PNG/JPG maksimal tiga berkas, masing-masing 2 MB. Tombol Isi data contoh dan Gunakan berkas contoh mempercepat demo; lampiran contoh bukan KTP atau KK sungguhan.

## Tampilan dan keadaan

Tema terang, hijau hutan dan aksen kuning pada tindakan utama. Desktop memakai komposisi editorial dan dua panel pemeriksaan. Ponsel memakai menu berlabel, satu kolom, teks membungkus, serta area tekan minimum 44 px. Tidak ada statistik atau kontak perkiraan, carousel otomatis, atau foto pejabat.

Daftar data memiliki loading berteks, keadaan kosong, hasil pencarian kosong, dan pesan error dengan Coba lagi. Formulir mempunyai validasi native dan error server; pengiriman menampilkan umpan balik. Dialog ditutup lewat tombol atau Escape.

Lima gambar inti berada di ../delivery/screenshots/. Keterangan dan skenario ada di PANDUAN-DEMO.md. Hasil pemeriksaan dicatat di CATATAN-VERIFIKASI.md.
