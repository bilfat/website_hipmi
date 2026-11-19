# HIPMI CENTRAL — ARTHAKARSA

# DESIGN SYSTEM & VISUAL IMPLEMENTATION GUIDE

**Nama dokumen:** `design.md`  
**Versi:** 1.2 — Aurora Glass Editorial · Next.js Frontend Stack  
**Tanggal:** 18 November 2026  
**Proyek:** HIPMI CENTRAL — HIPMI Perguruan Tinggi Universitas Telkom  
**Identitas kabinet aktif:** ARTHAKARSA  
**Status:** Arah visual disetujui sebagai referensi desain; detail teknis menjadi baseline implementasi dan tetap wajib melalui pemeriksaan aset, kontras, responsivitas, serta performa.  
**Ruang lingkup:** Visual identity website publik, personal area, organization management, Workspace, Admin Panel, komponen bersama, motion, glassmorphism, background ornament, responsive, accessibility, dan visual QA.

------------------------------------------------------------------------

# 0. CARA MEMBACA DAN MENGGUNAKAN DOKUMEN

## 0.1 Tujuan dokumen

Dokumen ini adalah **kontrak visual** untuk membangun frontend HIPMI CENTRAL dengan arah desain **Aurora Glass Editorial**. Dokumen harus cukup jelas untuk diikuti AI Agent atau frontend developer tanpa menebak-nebak warna, tipografi, komposisi, bentuk section, glass effect, animasi, state komponen, maupun aturan penggunaan aset.

Dokumen ini bukan pengganti PRD Frontend. Pembagian kewenangan dokumen adalah:

| Dokumen                                           | Menjadi sumber kebenaran untuk                                                                                                                                        |
|:--------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `PRD_frontend.md` / versi terbaru yang disepakati | Seluruh screen, route, navbar, sidebar, role, permission, data dummy, business flow, simulasi, dan acceptance test fungsional                                         |
| `design.md` ini                                   | Arah visual, design token, typography, layout, background, ornament, glass, card, navbar styling, dashboard styling, motion, responsive, accessibility, dan visual QA |
| `desingsystem_revisi_v2.1.md`                     | Rekam keputusan dan sumber historis. Untuk aspek visual yang secara eksplisit diperbarui oleh dokumen ini, gunakan `design.md` terbaru                                |
| Asset repository                                  | File logo, font, foto, ilustrasi, pecahan logo, poster, dan media aktual                                                                                              |

**Aturan utama:** perubahan visual tidak boleh mengubah route, struktur halaman, data, status, role, permission, business rule, maupun alur persetujuan yang telah ditetapkan di PRD.

## 0.2 Prioritas keputusan visual

Arah visual yang berlaku adalah **Aurora Glass Editorial — White-Dominant Burgundy**. Layar menggunakan putih sebagai dasar, sementara setiap bagian halaman boleh memakai warna latar pendukung yang sangat lembut dan saling menyambung. Burgundy tetap menjadi identitas utama.

| Aspek                                 | Ketentuan visual terbaru                                                    |
|---------------------------------------|-----------------------------------------------------------------------------|
| Arah visual                           | Aurora Glass Editorial                                                      |
| Karakter                              | Bersih, elegan, hangat, berlapis, editorial, modern                         |
| Warna utama                           | Burgundy `#5A1722`                                                          |
| Warna utama gelap                     | Dark Wine `#3D0F16`                                                         |
| Huruf judul                           | ARTHAKARSA Serif Display                                                    |
| Huruf antarmuka dan isi               | Poppins                                                                     |
| Dasar layar                           | Putih `#FFFFFF`                                                             |
| Latar bagian                          | Putih, putih hangat, merah muda pucat, merah muda lembut, dan gading hangat |
| Aksen                                 | Emas antik dan tembaga                                                      |
| Hiasan khas                           | Garis kontur, pita mengalir, lengkungan, orbit, dan garis penghubung        |
| Efek kaca                             | Digunakan secara selektif                                                   |
| Gerakan                               | Gerakan masuk dan keluar untuk tulisan, ikon, kartu, gambar, serta hiasan   |
| Bilah navigasi publik                 | Bentuk kapsul mengambang, terinspirasi susunan navigasi KPM                 |
| Dasbor                                | Bilah samping, bilah atas, kartu ringkasan, aktivitas, dan agenda yang rapi |
| Perpindahan tab                       | Penanda aktif bergeser mendatar dengan halus                                |
| Kartu                                 | Satu keluarga bentuk dengan beberapa variasi sudut                          |
| Menu turun                            | Memakai aset visual yang sesuai untuk setiap kelompok menu                  |
| Pemuatan                              | Logo ARTHAKARSA di tengah dengan gerakan orbit                              |
| Halaman tidak ditemukan dan kesalahan | Memakai ilustrasi aset sesuai jenis keadaan                                 |
| Kerangka aplikasi                     | Next.js dengan App Router sebagai acuan proyek baru                         |
| Antarmuka                             | React + TypeScript                                                          |
| Gaya antarmuka                        | Tailwind CSS + token CSS terpusat                                           |
| Gerakan antarmuka                     | Motion for React                                                            |
| Ikon                                  | Lucide React                                                                |
| Visual tiga dimensi                   | Three.js + React Three Fiber + Drei                                         |
| Formulir dan validasi                 | React Hook Form + Zod                                                       |
| Tabel data                            | TanStack Table                                                              |
| Grafik                                | Recharts                                                                    |
| Batas tahap implementasi              | Frontend dengan data contoh; tanpa layanan peladen dan basis data           |

### 0.2.1 Perubahan eksplisit dari Design System v2.1

Ketentuan berikut diperbarui untuk tampilan situs:

1.  Pasangan huruf Anton + Plus Jakarta Sans diganti menjadi Poppins + ARTHAKARSA Serif Display.
2.  Gaya judul editorial menggunakan huruf serif ARTHAKARSA, sedangkan navigasi, isi, formulir, tabel, dan komponen menggunakan Poppins.
3.  Warna dasar seluruh layar adalah putih. Bagian-bagian halaman boleh berganti menggunakan warna pendukung yang sangat lembut agar tidak monoton.
4.  Perpindahan warna antarbagiannya harus terasa menyambung melalui gradasi lembut, bentuk tepi melengkung, garis kontur, pita mengalir, atau lapisan latar yang saling bertemu. Jangan membuat susunan blok warna yang terputus seperti garis-garis belang.
5.  Burgundy `#5A1722` dan Dark Wine `#3D0F16` tetap menjadi warna identitas utama. Keduanya digunakan pada judul, tombol utama, keadaan terpilih, bilah samping, bagian sorotan, dan bagian penutup secara terukur.
6.  Efek kaca tetap digunakan secara selektif pada bilah navigasi, panel mengambang, menu turun, dan elemen sorotan; bukan pada seluruh permukaan.
7.  Garis kontur, pita mengalir, lengkungan, dan orbit menjadi ciri latar yang konsisten, dengan kepadatan berbeda sesuai fungsi bagian.
8.  Semua tulisan yang terlihat oleh pengguna, termasuk tulisan pada navigasi, formulir, pemberitahuan, petunjuk, keadaan kosong, halaman tidak ditemukan, dan halaman kesalahan, wajib menggunakan Bahasa Indonesia.
9.  Setiap menu utama pada bilah navigasi memiliki pemetaan aset visual. Menu yang memiliki submenu menggunakan aset unggulan pada panel menu turun; menu yang langsung menuju halaman menggunakan aset yang sesuai pada bagian pembuka halamannya.
10. Halaman tidak ditemukan dan setiap jenis halaman kesalahan wajib memiliki ilustrasi aset yang sesuai atau pengganti visual terarah jika aset belum tersedia.

### 0.2.2 Ketentuan yang TIDAK berubah

Hal-hal berikut tetap mengikuti dokumen sistem dan PRD:

- Logo HIPMI, wordmark Telkom University, dan logo kabinet ARTHAKARSA adalah tiga identitas berbeda.
- Logo master tidak boleh digambar ulang, diregangkan, dipotong, diubah warna, atau diberi efek langsung.
- Struktur enam menu utama dan seluruh submenu tetap mengikuti PRD.
- Seluruh identitas layar, alamat halaman, peran, izin, cakupan akses, alur bisnis, dan data tetap mengikuti PRD.
- Perubahan visual tidak boleh mengubah alur kerja, aturan persetujuan, atau batas akses.
- Implementasi tetap mengikuti batas frontend yang ditetapkan dalam PRD.
- Data, foto, statistik, nama pengurus, agenda, dan dokumentasi tidak boleh dikarang sebagai data organisasi sungguhan.
- Komponen yang memuat banyak data harus mengutamakan keterbacaan, bukan efek kaca atau hiasan.

## 0.3 Status nilai desain

Setiap nilai dalam dokumen diberi kategori berikut:

- **OFFICIAL:** nilai brand yang sudah tercantum dalam sumber identitas visual proyek. Jangan diubah tanpa keputusan pemilik proyek.
- **EXTENSION:** warna atau token pendukung yang diusulkan untuk menghidupkan visual Aurora Glass Editorial. Boleh disesuaikan setelah review visual dan contrast test.
- **IMPLEMENTATION BASELINE:** angka awal untuk ukuran, radius, spacing, blur, motion, dan breakpoint. Boleh dituning berdasarkan prototype tanpa mengubah karakter desain.
- **VERIFY ASSET:** file atau path yang harus dicocokkan dengan repository sebenarnya.
- **DO NOT INVENT:** jangan mengarang file, font, logo, foto, atau konten yang belum tersedia.

## 0.4 Aturan penggunaan

1.  Baca PRD terbaru dan dokumen ini sebelum mengimplementasikan komponen.
2.  Gunakan token terpusat; jangan menulis HEX, radius, shadow, atau duration secara acak per halaman.
3.  Buat komponen reusable dengan variants. Jangan membuat desain baru yang berbeda hanya karena screen berbeda.
4.  Terapkan visual sesuai konteks halaman: public editorial, personal, management, workspace, atau admin.
5.  Gunakan logo dan asset yang benar-benar ada. Periksa filename dan format sebelum menulis path.
6.  Semua animasi harus memiliki fallback reduced-motion.
7.  Semua kontrol yang terlihat interaktif harus benar-benar memiliki perilaku sesuai PRD.
8.  Jangan menambahkan konten fiktif, angka statistik palsu, foto stok yang seolah dokumentasi, atau nama pejabat palsu.
9.  Bila sebuah asset tidak tersedia, gunakan fallback yang dirancang; jangan mengarang seolah file tersebut ada.
10. Bila ada konflik antara desain dekoratif dan keterbacaan, keterbacaan selalu menang.

------------------------------------------------------------------------

## 0.5 Bahasa antarmuka wajib Bahasa Indonesia

**Semua kalimat dan label yang terlihat oleh pengguna wajib menggunakan Bahasa Indonesia yang baik, jelas, alami, dan konsisten.** Ketentuan ini berlaku untuk seluruh area situs, bukan hanya halaman publik.

Cakupan wajib: - nama menu, submenu, bilah navigasi, bilah samping, dan judul halaman; - judul bagian, keterangan, paragraf, kartu, label, tombol, tautan, dan petunjuk; - nama kolom tabel, penyaring, pilihan, penanda status, dan keterangan singkat; - formulir pendaftaran, masuk, pengubahan profil, pengajuan, persetujuan, dan pengaturan; - pesan validasi, pesan berhasil, pesan gagal, pemberitahuan singkat, jendela konfirmasi, dan peringatan; - keadaan memuat, keadaan kosong, hasil pencarian kosong, halaman tidak ditemukan, halaman tanpa izin, gangguan sistem, dan halaman pemeliharaan; - teks alternatif gambar, nama aksesibel tombol, keterangan ikon, serta teks yang dibacakan pembaca layar; - judul halaman peramban, keterangan halaman, dan pesan yang muncul pada tautan berbagi.

**Larangan pada teks yang terlihat:** - Jangan menampilkan kalimat berbahasa Inggris. - Jangan mencampur Bahasa Indonesia dan Bahasa Inggris dalam satu kalimat. - Jangan memakai singkatan, julukan, istilah internal pengembang, atau istilah teknis yang tidak dipahami pengguna. - Jangan menampilkan teks bawaan pustaka, contoh bawaan templat, atau tulisan pengganti seperti “Lorem ipsum”. - Jangan menampilkan label seperti “Dashboard”, “Workspace”, “Search”, “Profile”, “Settings”, “Loading”, “Error”, “Not Found”, “Pending”, “Approved”, “Rejected”, “Draft”, “Published”, “CTA”, “FAQ”, “PIC”, “NIM”, “ID”, atau “Admin Panel” sebagai tulisan antarmuka. - Jangan menampilkan nama teknis komponen, nama variabel, nama rute, kode kesalahan internal, atau pesan kesalahan pemrograman.

**Pengecualian terbatas:** nama resmi organisasi, merek, nama kabinet, nama produk, nama orang, nama acara resmi, dan istilah resmi yang wajib dipertahankan boleh tetap memakai nama aslinya. Pengecualian ini tidak boleh menjadi alasan untuk membiarkan kalimat antarmuka berbahasa Inggris. Singkatan yang diperlukan dalam data organisasi harus ditulis lengkap pada tampilan pengguna, kecuali singkatan tersebut merupakan bagian dari nama resmi.

### 0.5.1 Gaya bahasa

- Gunakan Bahasa Indonesia yang ramah, profesional, ringkas, dan tidak kaku.
- Gunakan sapaan “Anda” secara konsisten pada pesan sistem dan formulir.
- Gunakan kalimat aktif dan kata kerja yang menjelaskan tindakan.
- Hindari istilah gaul, julukan, dan kalimat promosi berlebihan pada area operasional.
- Gunakan ejaan, tanda baca, huruf kapital, dan penulisan tanggal Indonesia secara konsisten.
- Jangan menyingkat nama jabatan. Tampilkan “Ketua Umum”, “Wakil Ketua Umum”, “Sekretaris Umum”, “Bendahara Umum”, “Kepala Bidang”, “Kepala Kompartemen”, dan “Pengelola Program Kerja” secara lengkap.
- Tampilkan “Nomor Induk Mahasiswa”, bukan singkatannya.
- Tampilkan “Penanggung Jawab”, bukan singkatannya.
- Tampilkan “Program Kerja”, bukan singkatan internalnya.
- Tampilkan “Ketua Umum”, “Wakil Ketua Umum”, “Sekretaris Jenderal”, “Sekretaris Umum”, “Bendahara Umum”, dan “Kepala Kompartemen” secara lengkap, bukan singkatannya.
- Tampilkan “Staf”, bukan “Staff”.
- Tampilkan “Mitra Media”, bukan “Media Partner”.
- Tampilkan “Ruang Kerja”, bukan “Workspace”.
- Tampilkan “Dasbor”, bukan “Dashboard”.
- Tampilkan “Panel Pengelola Sistem”, bukan “Admin Panel”.
- Nama teknis dalam kode sumber boleh mengikuti konvensi pemrograman, tetapi tidak boleh diteruskan mentah-mentah ke antarmuka.

### 0.5.2 Padanan tulisan antarmuka

| Jangan ditampilkan   | Gunakan pada antarmuka                 |
|----------------------|----------------------------------------|
| Dashboard            | Dasbor                                 |
| Workspace            | Ruang Kerja                            |
| Profile              | Profil                                 |
| Settings             | Pengaturan                             |
| Search               | Cari                                   |
| Login / Sign In      | Masuk                                  |
| Register / Sign Up   | Daftar                                 |
| Logout / Sign Out    | Keluar                                 |
| Notifications        | Pemberitahuan                          |
| Activity             | Aktivitas                              |
| Upcoming             | Akan Datang                            |
| View All             | Lihat Semua                            |
| View Details         | Lihat Rincian                          |
| Learn More           | Pelajari Lebih Lanjut                  |
| Get Started          | Mulai                                  |
| Contact Us           | Hubungi Kami                           |
| Submit               | Kirim                                  |
| Save                 | Simpan                                 |
| Save Changes         | Simpan Perubahan                       |
| Cancel               | Batal                                  |
| Delete               | Hapus                                  |
| Edit                 | Ubah                                   |
| Add                  | Tambah                                 |
| Create               | Buat                                   |
| Close                | Tutup                                  |
| Back                 | Kembali                                |
| Next                 | Berikutnya                             |
| Previous             | Sebelumnya                             |
| Continue             | Lanjutkan                              |
| Retry / Try Again    | Coba Lagi                              |
| Loading              | Memuat                                 |
| Not Found            | Halaman Tidak Ditemukan                |
| Access Denied        | Akses Tidak Diizinkan                  |
| System Error         | Terjadi Kesalahan                      |
| Empty State          | Belum Ada Data                         |
| No Results Found     | Data yang Dicari Tidak Ditemukan       |
| Pending              | Menunggu                               |
| Pending Verification | Menunggu Verifikasi                    |
| Approved             | Disetujui                              |
| Rejected             | Ditolak                                |
| Published            | Diterbitkan                            |
| Draft                | Konsep                                 |
| Archived             | Diarsipkan                             |
| Active               | Aktif                                  |
| Inactive             | Tidak Aktif                            |
| Filter               | Saring                                 |
| Sort By              | Urutkan Berdasarkan                    |
| Upload File          | Unggah Berkas                          |
| Choose File          | Pilih Berkas                           |
| Download             | Unduh                                  |
| Email Address        | Alamat Surel                           |
| Password             | Kata Sandi                             |
| Forgot Password?     | Lupa Kata Sandi?                       |
| Remember Me          | Ingat Saya                             |
| Members              | Anggota                                |
| Team                 | Tim                                    |
| Task                 | Tugas                                  |
| Progress             | Kemajuan                               |
| Overview             | Ringkasan                              |
| Statistics           | Statistik                              |
| Report               | Laporan                                |
| Help Center          | Pusat Bantuan                          |
| Something Went Wrong | Terjadi Kendala. Silakan Coba Kembali. |

Padanan di atas menjadi aturan awal. Jika ada istilah baru, tulis padanan Bahasa Indonesia sebelum komponen dipakai. Jangan menampilkan dua versi bahasa secara berdampingan kecuali pengguna secara khusus meminta pilihan bahasa.

## 0.6 Aturan pemakaian aset untuk navigasi dan halaman keadaan khusus

Aset visual bukan hiasan acak. Setiap kelompok menu, halaman tidak ditemukan, halaman kesalahan, dan keadaan kosong harus memiliki pemetaan aset yang jelas.

1.  Periksa seluruh folder aset dan catat nama berkas yang benar-benar tersedia.
2.  Buat daftar aset berdasarkan fungsi, bukan berdasarkan nama berkas yang ditebak.
3.  Gunakan foto, poster, logo, ilustrasi, ikon khusus, dan pecahan logo yang memang sesuai dengan konteksnya.
4.  Jangan memakai satu gambar yang sama untuk semua menu jika gambar tersebut tidak mewakili isi menu.
5.  Jangan memakai foto stok seolah-olah dokumentasi HIPMI atau kabinet.
6.  Jangan mengarang alamat berkas. Nama kunci aset dalam dokumen adalah nama fungsi, bukan klaim bahwa berkas tersebut sudah ada.
7.  Jika aset yang sesuai belum ditemukan, catat sebagai aset yang belum tersedia dan gunakan pengganti sementara yang terarah dari ikon Lucide serta garis dekoratif. Jangan mengambil gambar acak dari internet.
8.  Semua aset informatif wajib memiliki teks alternatif dalam Bahasa Indonesia. Hiasan murni harus diabaikan pembaca layar.
9.  Logo master tetap menggunakan aturan pada Bagian 2; aset menu tidak boleh menggantikan atau memodifikasi logo resmi.

## 0.7 Spesifikasi teknologi frontend

**Susunan teknologi berikut menjadi pilihan resmi untuk implementasi frontend HIPMI CENTRAL.** Seluruh teknologi harus digunakan sesuai tanggung jawabnya. Jangan memasang pustaka lain yang memiliki fungsi sama tanpa alasan teknis dan persetujuan.

### 0.7.1 Daftar teknologi utama

| Lapisan                          | Teknologi         | Paket utama                  | Tanggung jawab                                                                              |
|----------------------------------|-------------------|------------------------------|---------------------------------------------------------------------------------------------|
| Kerangka aplikasi                | Next.js           | `next`                       | Struktur aplikasi, halaman, tata letak, navigasi, pemuatan aset, dan proses pengembangan    |
| Pustaka antarmuka                | React             | `react`, `react-dom`         | Komponen, susunan antarmuka, state, dan interaksi                                           |
| Bahasa pemrograman               | TypeScript        | `typescript`                 | Tipe data, kontrak komponen, model data contoh, dan pemeriksaan kesalahan saat pengembangan |
| Sistem gaya                      | Tailwind CSS      | `tailwindcss`                | Tata letak responsif dan penerapan kelas gaya                                               |
| Token visual                     | CSS Variables     | CSS bawaan                   | Sumber tunggal warna, tipografi, jarak, radius, bayangan, dan gerakan                       |
| Animasi antarmuka                | Motion for React  | `motion`                     | Gerakan tulisan, ikon, kartu, menu, tab, transisi halaman, dan bagian                       |
| Ikon antarmuka                   | Lucide React      | `lucide-react`               | Ikon navigasi dan kontrol                                                                   |
| Mesin visual tiga dimensi        | Three.js          | `three`                      | Perenderan objek dan adegan tiga dimensi                                                    |
| Penghubung Three.js dengan React | React Three Fiber | `@react-three/fiber`         | Pembuatan adegan Three.js melalui komponen React                                            |
| Komponen bantu tiga dimensi      | Drei              | `@react-three/drei`          | Komponen bantu kamera, pencahayaan, kontrol, lingkungan, dan objek tiga dimensi             |
| Pengelolaan formulir             | React Hook Form   | `react-hook-form`            | Nilai formulir, status isian, dan pengiriman simulasi                                       |
| Validasi formulir                | Zod               | `zod`, `@hookform/resolvers` | Aturan validasi dan bentuk data formulir                                                    |
| Pengelolaan tabel                | TanStack Table    | `@tanstack/react-table`      | Pengurutan, penyaringan, halaman data, pemilihan baris, dan pengelolaan kolom               |
| Grafik dan statistik             | Recharts          | `recharts`                   | Grafik dua dimensi untuk ringkasan dan analisis data contoh                                 |

### 0.7.2 Pembagian tanggung jawab pustaka

Setiap pustaka memiliki tanggung jawab khusus:

1.  **Next.js** mengatur struktur aplikasi, halaman, tata letak, navigasi, pemuatan aset, dan pembagian kode.
2.  **React** membangun komponen antarmuka dan mengelola perubahan tampilan.
3.  **TypeScript** memastikan bentuk data, properti komponen, dan fungsi memiliki tipe yang jelas.
4.  **Tailwind CSS** menerapkan tata letak dan gaya menggunakan token yang telah ditentukan.
5.  **CSS Variables** menjadi sumber utama nilai desain. Jangan membuat warna atau jarak baru langsung pada banyak komponen.
6.  **Motion for React** mengatur gerakan antarmuka berbasis elemen HTML/SVG.
7.  **Lucide React** menyediakan ikon antarmuka. Ikon tidak boleh menggantikan aset logo atau ilustrasi resmi.
8.  **Three.js + React Three Fiber + Drei** hanya menangani visual tiga dimensi pada bagian yang memang membutuhkan kedalaman visual.
9.  **React Hook Form + Zod** mengelola isian dan validasi formulir pada sisi pengguna.
10. **TanStack Table** mengelola perilaku tabel, sedangkan tampilan tabel tetap dibuat mengikuti design system HIPMI CENTRAL.
11. **Recharts** menampilkan grafik dua dimensi menggunakan warna dan tipografi design system.

Jangan menggunakan Three.js untuk menggantikan Motion pada animasi tulisan, ikon, tombol, kartu, tab, atau menu. Jangan menggunakan Recharts untuk menggantikan tabel data rinci. Jangan menggunakan TanStack Table untuk daftar sederhana yang tidak membutuhkan perilaku tabel.

### 0.7.3 Aturan versi dan kecocokan paket

- Periksa `package.json` dan lockfile sebelum menambah atau memperbarui paket.
- Jangan memasang versi terbaru secara membabi buta.
- Gunakan versi stabil yang saling kompatibel dengan versi Next.js, React, dan TypeScript pada repository.
- Jangan memasang versi alfa, beta, canary, atau pratinjau untuk kebutuhan utama tanpa persetujuan.
- Jangan memasang dua paket berbeda untuk fungsi yang sama.
- Jangan memperbarui Next.js, React, atau paket inti hanya untuk mengejar versi terbaru jika tidak diperlukan.
- Catat paket yang sudah tersedia, paket yang perlu ditambahkan, dan alasan penambahannya.
- Pertahankan satu package manager dan satu lockfile yang digunakan repository.
- Setelah perubahan dependency, jalankan pemeriksaan tipe, lint, dan build sesuai perintah proyek.

**Catatan khusus React Three Fiber:** versi utama React Three Fiber harus cocok dengan versi utama React. Dokumentasi resminya mencatat pasangan React Three Fiber 8 untuk React 18 dan React Three Fiber 9 untuk React 19. Dokumentasi yang diperiksa juga menandai versi 10 sebagai pratinjau/alfa; jangan menjadikannya pilihan produksi tanpa keputusan dan pemeriksaan kompatibilitas baru. Versi Drei harus dipilih agar cocok dengan versi React Three Fiber yang digunakan.

### 0.7.4 Aturan pemakaian App Router

Untuk proyek Next.js baru, gunakan **App Router** sebagai pola utama.

- Gunakan direktori `app/` atau `src/app/` mengikuti struktur repository.
- Setiap halaman mengikuti route yang ditetapkan PRD.
- Gunakan `layout.tsx` untuk kerangka tampilan yang dipakai bersama.
- Gunakan `page.tsx` untuk halaman pada alamat yang sesuai.
- Gunakan `loading.tsx`, `error.tsx`, dan `not-found.tsx` jika sesuai dengan kebutuhan halaman dan pola Next.js.
- Gunakan `next/link` untuk navigasi internal.
- Gunakan `next/image` untuk gambar yang sesuai dengan kebutuhan optimasi.
- Gunakan metadata halaman dalam Bahasa Indonesia.
- Jangan membuat ulang struktur route yang telah ada tanpa memeriksa repository.
- Jika repository yang sedang dikerjakan ternyata masih memakai Pages Router, jangan melakukan migrasi besar secara otomatis. Catat kondisi tersebut dan minta keputusan sebelum mengubah arsitektur route.

### 0.7.5 Aturan Server Component dan Client Component

- Komponen halaman dan tata letak yang tidak memerlukan interaksi dapat tetap menjadi Server Component bawaan App Router.
- Gunakan Client Component hanya ketika membutuhkan state, event handler, efek React, API peramban, Motion, formulir interaktif, tabel interaktif, grafik interaktif, atau Three.js.
- Letakkan penanda `'use client'` pada batas komponen interaktif yang paling kecil.
- Jangan menjadikan seluruh halaman sebagai Client Component hanya karena satu tombol atau satu bagian membutuhkan interaksi.
- Komponen server boleh menyusun komponen klien sebagai bagian dari tampilan.
- Jangan memasukkan akses basis data, rahasia, token privat, atau layanan bisnis ke dalam komponen klien.
- Jangan menyamakan penggunaan Server Component bawaan Next.js dengan kewajiban membuat backend bisnis. Pada tahap ini, Server Component hanya digunakan untuk penyusunan dan perenderan antarmuka yang sesuai.
- Props yang dikirim dari Server Component ke Client Component harus berupa data yang dapat diserialisasi.

### 0.7.6 Aturan TypeScript

- Gunakan TypeScript untuk seluruh komponen, halaman, data contoh, utilitas, dan konfigurasi yang mendukungnya.
- Utamakan tipe eksplisit untuk data yang berasal dari PRD.
- Gunakan `type` atau `interface` untuk model akun, peran, izin tampilan, agenda, surat, transaksi, Program Kerja, anggota, produk, dan entitas lain yang dibutuhkan halaman.
- Gunakan tipe gabungan yang jelas untuk status, misalnya status agenda atau status pengajuan.
- Hindari `any`. Jika tipe belum diketahui, gunakan `unknown` lalu lakukan pemeriksaan tipe.
- Jangan memakai nilai teks bebas untuk status yang seharusnya memiliki pilihan terbatas.
- Jangan membuat model data contoh berbeda-beda untuk halaman yang menampilkan entitas yang sama.
- Data contoh harus mengikuti kontrak data dan hubungan yang ditetapkan PRD.
- Jangan menaruh aturan bisnis baru di dalam tipe data visual.

### 0.7.7 Aturan Tailwind CSS dan token visual

- Tailwind CSS digunakan untuk menerapkan tata letak, ukuran, jarak, susunan, dan responsivitas.
- CSS Variables pada Bagian 3 dan Bagian 29 tetap menjadi sumber utama warna dan token visual.
- Jangan menulis warna HEX secara acak pada kelas komponen.
- Jangan membuat palet warna Tailwind kedua yang bertentangan dengan token utama.
- Gunakan kelas utilitas untuk pola sederhana dan komponen bersama untuk pola yang berulang.
- Gunakan CSS biasa atau CSS Module bila dibutuhkan untuk efek kompleks seperti garis kontur, bentuk khusus, gradasi berlapis, atau pembungkus adegan tiga dimensi.
- Jangan menambahkan pustaka komponen visual besar yang membuat tampilan menyimpang dari design system.
- Jangan mencampur beberapa pendekatan gaya pada satu komponen tanpa kebutuhan yang jelas.
- Penamaan kelas dan komponen internal boleh berbahasa Inggris sesuai kebiasaan pengembangan; tulisan yang tampil kepada pengguna tetap wajib Bahasa Indonesia.

### 0.7.8 Aturan Motion for React

- Motion menjadi satu-satunya mesin utama untuk animasi antarmuka berbasis elemen HTML dan SVG.
- Untuk implementasi baru, gunakan paket `motion` dan impor API React dari `motion/react`.
- Jika repository telah memakai `framer-motion`, gunakan dependency yang sudah ada dan jangan memasang `motion` sebagai mesin kedua.
- Jangan mengendalikan properti `transform` atau `opacity` pada elemen yang sama melalui dua mesin animasi.
- Gunakan Motion untuk judul, paragraf, ikon, kartu, tab, menu turun, dialog, transisi halaman, dan gerakan bagian.
- Gunakan CSS transition untuk hover sederhana yang tidak membutuhkan urutan atau state animasi kompleks.
- Gunakan Motion untuk animasi DOM; gunakan Three.js/React Three Fiber untuk animasi objek di dalam kanvas tiga dimensi.
- Terapkan seluruh aturan Bagian 22, termasuk gerakan masuk/keluar, pengulangan, dan pengurangan gerakan.

### 0.7.9 Aturan Lucide React

- Gunakan paket `lucide-react`.
- Gunakan nama ikon yang tersedia pada versi paket yang terpasang.
- Gunakan ukuran, ketebalan garis, dan warna sesuai token.
- Ikon dekoratif diberi atribut agar tidak dibaca sebagai informasi oleh pembaca layar.
- Ikon yang menjadi satu-satunya penanda tindakan harus memiliki nama aksesibel dalam Bahasa Indonesia.
- Jangan mengganti logo HIPMI, logo Telkom University, logo ARTHAKARSA, atau ilustrasi aset dengan ikon Lucide.
- Jangan menggunakan emoji sebagai pengganti ikon antarmuka resmi.

### 0.7.10 Aturan Three.js, React Three Fiber, dan Drei

Three.js adalah teknologi visual tambahan, bukan fondasi seluruh halaman. Gunakan hanya pada bagian yang memperoleh manfaat nyata dari visual tiga dimensi.

**Lokasi penggunaan yang disarankan:** - Hero Beranda sebagai objek atau komposisi tiga dimensi yang mewakili karakter ARTHAKARSA. - Bagian pengenalan organisasi jika ada objek visual yang benar-benar memperkuat cerita. - Satu atau dua bagian editorial unggulan yang telah disetujui. - Elemen dekoratif tiga dimensi yang tidak menghalangi isi atau navigasi.

**Lokasi yang tidak disarankan:** - Setiap kartu pada dasbor. - Tabel anggota, transaksi, surat, dan keuangan. - Formulir pendaftaran atau pengajuan. - Seluruh latar setiap halaman. - Setiap ikon kecil dan tombol. - Grafik angka yang seharusnya ditampilkan menggunakan Recharts. - Halaman kesalahan dan keadaan kosong yang sudah memiliki ilustrasi aset khusus. - Semua halaman hanya agar terlihat lebih ramai.

**Aturan arsitektur adegan tiga dimensi:** 1. Buat komponen pembungkus khusus, misalnya `ThreeScene` atau `BrandScene`. 2. Letakkan adegan tiga dimensi dalam Client Component terisolasi. 3. Muat adegan menggunakan pemuatan dinamis agar paket Three.js tidak masuk ke semua halaman sejak awal. 4. Jika perenderan sisi server menimbulkan masalah pada komponen yang bergantung pada WebGL atau API peramban, nonaktifkan perenderan sisi server untuk komponen tersebut melalui `next/dynamic` dari dalam Client Component. 5. Gunakan `Suspense` dengan tampilan pengganti yang sesuai. 6. Sediakan pengganti gambar, SVG, atau CSS jika WebGL tidak tersedia, adegan gagal, atau perangkat tidak mendukungnya. 7. Jangan menaruh tulisan penting, tombol, formulir, atau navigasi di dalam kanvas tiga dimensi. 8. Jika adegan hanya dekoratif, buat kanvas tidak menghalangi klik dan berikan penandaan aksesibilitas yang sesuai. 9. Jika objek dapat berinteraksi, sediakan kontrol yang dapat digunakan dengan papan ketik dan alternatif dua dimensi. 10. Gunakan Drei hanya untuk kebutuhan yang benar-benar digunakan; jangan mengimpor seluruh contoh atau komponen bantu tanpa alasan. 11. Gunakan aset model tiga dimensi yang tersedia dan memiliki izin. Jangan mengarang file model atau alamat aset. 12. Jangan mengubah logo resmi menjadi model tiga dimensi, kecuali ada aset tiga dimensi resmi yang disediakan dan disetujui.

**Aturan kinerja adegan:** - Muat adegan hanya saat bagian terkait dibutuhkan atau mendekati area pandang. - Gunakan satu kanvas utama pada satu halaman sebagai batas awal. - Hindari beberapa kanvas aktif yang berjalan bersamaan. - Gunakan `frameloop="demand"` untuk adegan yang tidak membutuhkan animasi terus-menerus. - Gunakan putaran terus-menerus hanya jika memang menjadi bagian dari rancangan dan tetap ringan. - Batasi rasio piksel perangkat, misalnya rentang awal `[1, 1.5]`, lalu uji pada perangkat sasaran. - Utamakan geometri sederhana, material ringan, dan jumlah objek yang wajar. - Hindari bayangan waktu nyata, efek pascaproses, partikel berlebihan, dan tekstur resolusi sangat tinggi. - Hentikan atau sederhanakan animasi saat adegan tidak terlihat. - Hormati `prefers-reduced-motion`. - Jangan menjalankan animasi tiga dimensi yang tidak terlihat atau tidak memberikan nilai bagi pengguna. - Uji pemakaian memori, waktu pemuatan, dan kelancaran pada perangkat kelas menengah serta telepon.

**Aturan hubungan dengan Motion:** - Motion mengatur elemen HTML/SVG di luar kanvas. - React Three Fiber mengatur objek tiga dimensi di dalam kanvas. - Jangan menganimasikan elemen DOM yang sama dengan Motion dan mesin animasi lain secara bersamaan. - Sinkronisasi antara gerakan gulir dan adegan tiga dimensi hanya dilakukan bila dibutuhkan oleh rancangan dan tetap ringan. - Gerakan masuk/keluar tulisan dan ikon tetap mengikuti Motion, bukan dipindahkan ke Three.js.

### 0.7.11 Aturan React Hook Form dan Zod

- Gunakan React Hook Form untuk mengelola nilai, status, dan interaksi formulir.
- Gunakan Zod untuk mendefinisikan aturan validasi dan bentuk data.
- Gunakan `@hookform/resolvers` untuk menghubungkan Zod dengan React Hook Form.
- Definisikan skema validasi terpisah dan gunakan kembali bila formulir memiliki aturan yang sama.
- Tipe data formulir sebaiknya diturunkan dari skema Zod agar tidak terjadi perbedaan antara validasi dan tipe.
- Pesan validasi wajib berbahasa Indonesia.
- Tampilkan kesalahan di dekat kolom yang bermasalah.
- Pertahankan nilai yang telah diisi ketika terjadi kesalahan validasi.
- Bedakan kesalahan wajib isi, format, panjang karakter, dan ketentuan pilihan.
- Pada tahap frontend, pengiriman formulir hanya menjalankan simulasi lokal dan umpan balik antarmuka.
- Validasi sisi pengguna tidak boleh disebut sebagai pengamanan data atau validasi server.
- Jangan menyimpan kata sandi asli atau data sensitif ke penyimpanan peramban.
- Jangan mengklaim surel verifikasi benar-benar dikirim jika belum ada layanan backend.

### 0.7.12 Aturan TanStack Table

- Gunakan TanStack Table untuk tabel yang membutuhkan pengurutan, penyaringan, halaman data, pemilihan baris, visibilitas kolom, atau tindakan per baris.
- Gunakan tabel HTML biasa untuk daftar sederhana yang tidak membutuhkan fitur tersebut.
- TanStack Table bertugas mengelola logika tabel; seluruh tampilan tetap dibuat menggunakan komponen dan token HIPMI CENTRAL.
- Jangan menggunakan tampilan bawaan dari pustaka lain tanpa penyesuaian.
- Semua nama kolom, penyaring, tombol halaman, dan pesan kosong wajib berbahasa Indonesia.
- Data tabel berasal dari data contoh yang terpusat dan bertipe.
- Penyaringan, pengurutan, dan halaman data dilakukan secara lokal.
- Kolom yang ditampilkan dapat menyesuaikan akun demo dan izin tampilan yang ditetapkan PRD.
- Penyembunyian kolom berdasarkan peran pada tahap ini hanya simulasi antarmuka, bukan pengamanan akses data.
- Pada telepon, gunakan kartu ringkas atau gulir mendatar dengan judul kolom yang tetap jelas.
- Jangan menghilangkan informasi penting hanya untuk memaksakan tabel muat pada layar kecil.

### 0.7.13 Aturan Recharts

- Gunakan Recharts untuk grafik dua dimensi seperti batang, garis, area, dan lingkaran sesuai kebutuhan data.
- Grafik hanya dibuat pada halaman yang memang membutuhkan ringkasan atau analisis visual berdasarkan PRD.
- Gunakan warna Burgundy, Dark Wine, Gold, Copper, Mauve, dan warna status dari token.
- Jangan menggunakan warna bawaan pustaka tanpa penyesuaian.
- Judul, label sumbu, keterangan, tooltip, dan legenda wajib berbahasa Indonesia.
- Tooltip harus menampilkan nilai yang jelas dan format angka/tanggal yang sesuai.
- Setiap grafik harus memiliki ringkasan teks atau alternatif tabel agar informasi tidak hanya bergantung pada bentuk visual.
- Animasi grafik harus singkat dan tidak mengaburkan perubahan nilai.
- Gunakan pembungkus responsif dan pastikan grafik tidak terpotong pada telepon.
- Grafik harus menggunakan data contoh yang konsisten dengan kartu ringkasan dan tabel terkait.
- Jangan mengarang angka statistik organisasi seolah-olah data nyata.
- Jangan menggunakan Three.js untuk grafik data dua dimensi.

### 0.7.14 Struktur direktori acuan

Struktur berikut adalah contoh pengelompokan, bukan perintah untuk merombak repository yang sudah ada. Ikuti pola yang sudah digunakan proyek apabila lebih konsisten.

``` text
src/
├── app/
│   ├── (public)/
│   ├── (auth-demo)/
│   ├── (personal)/
│   ├── (organization)/
│   ├── (workspace)/
│   ├── (system-admin)/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── forms/
│   ├── tables/
│   ├── charts/
│   └── three/
├── features/
│   ├── public/
│   ├── authentication-demo/
│   ├── personal/
│   ├── organization/
│   ├── workspace/
│   └── system-admin/
├── data/
│   ├── mock/
│   └── fixtures/
├── lib/
│   ├── validation/
│   ├── formatters/
│   └── utilities/
├── types/
├── styles/
└── assets/
```

Ketentuan struktur: - Jangan membuat seluruh halaman di satu berkas besar. - Pisahkan komponen visual umum dari komponen khusus fitur. - Pisahkan data contoh dari komponen tampilan. - Pisahkan skema validasi dari halaman formulir. - Pisahkan adegan tiga dimensi dari komponen teks dan tata letak. - Jangan memindahkan atau mengganti nama aset yang sudah digunakan tanpa pemeriksaan. - Nama direktori dan kode boleh berbahasa Inggris; seluruh teks antarmuka tetap Bahasa Indonesia.

### 0.7.15 Dokumentasi teknologi resmi

Gunakan dokumentasi resmi berikut ketika memeriksa API, kompatibilitas, dan pola implementasi:

- [Next.js — Server dan Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Next.js — Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading)
- [React Three Fiber — Pengenalan](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Drei — Dokumentasi komponen](https://drei.docs.pmnd.rs/)
- [Motion for React](https://motion.dev/docs/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod](https://zod.dev/)
- [TanStack Table](https://tanstack.com/table/latest/docs/introduction)
- [Recharts](https://recharts.org/en-US/guide)

Dokumentasi resmi menjadi rujukan API dan kecocokan versi. Namun, kebutuhan visual, alur, peran, izin, dan data tetap mengikuti PRD serta dokumen proyek.

## 0.8 Batas implementasi frontend saja

Tahap implementasi saat ini adalah **frontend terlebih dahulu**. Teknologi yang dipilih tidak boleh membuat AI Agent memperluas pekerjaan menjadi backend atau basis data.

### 0.8.1 Yang wajib dibuat pada tahap frontend

- Seluruh halaman dan tata letak sesuai PRD.
- Seluruh navigasi publik, bilah samping, menu turun, tab, dan perpindahan halaman.
- Komponen formulir, tabel, grafik, kartu, dialog, pemberitahuan, dan keadaan khusus.
- Data contoh untuk setiap halaman.
- Akun demo untuk setiap kelompok peran yang ditetapkan PRD.
- Simulasi masuk, pendaftaran, keluar, pemilihan akun demo, dan perpindahan tampilan sesuai peran.
- Simulasi pengiriman formulir, perubahan status, persetujuan, penyaringan, pengurutan, dan tindakan lain yang memang ditetapkan PRD.
- Hubungan data contoh yang konsisten ant halaman.
- Tampilan responsif dan seluruh keadaan interaksi.
- Umpan balik lokal untuk tindakan berhasil, gagal, kosong, memuat, dan tidak memiliki izin.

### 0.8.2 Yang tidak boleh dibuat pada tahap ini

- Basis data, tabel basis data, migrasi, atau rancangan penyimpanan produksi.
- API backend, route handler, layanan server bisnis, atau endpoint eksternal.
- Server Actions untuk menyimpan atau mengubah data bisnis.
- Integrasi autentikasi sungguhan, penyedia identitas, atau pengelolaan sesi produksi.
- Pengiriman surel sungguhan, verifikasi surel sungguhan, dan pemulihan kata sandi melalui layanan.
- Pembayaran, QRIS, tiket, pengiriman, pelacakan, atau integrasi pihak ketiga sungguhan.
- Unggah berkas ke penyimpanan awan atau penyimpanan produksi.
- Koneksi ke basis data atau layanan backend.
- Pengaturan rahasia, kunci API, dan token produksi.

### 0.8.3 Aturan data contoh dan simulasi

- Semua data contoh diletakkan di satu tempat yang mudah ditemukan dan memiliki tipe TypeScript.
- Data contoh harus mengikuti nama, relasi, status, dan struktur entitas dari PRD.
- Gunakan identitas contoh yang jelas dan konsisten; jangan menyamarkan data contoh sebagai data nyata.
- Satu akun demo harus menghasilkan tampilan, menu, dan data yang sesuai dengan peran yang sedang disimulasikan.
- Jika status atau data diubah melalui antarmuka, perubahan cukup terjadi pada state lokal atau penyimpanan demo yang disetujui.
- Jika simulasi perlu bertahan setelah halaman dimuat ulang, simpan hanya identitas sesi demo dan data non-sensitif. Jangan menyimpan kata sandi.
- Jangan menyatakan data telah tersimpan secara permanen atau tersinkronisasi ke server.
- Tindakan yang membutuhkan layanan backend harus menampilkan hasil simulasi yang jujur dan tidak mengklaim tindakan eksternal benar-benar terjadi.

### 0.8.4 Keamanan dan batas simulasi

- Akun demo bukan autentikasi aman.
- Penyaringan tampilan berdasarkan peran bukan pengamanan data.
- Validasi formulir di peramban bukan validasi server.
- Data contoh tidak boleh memuat kata sandi, token, atau informasi pribadi sungguhan.
- Jangan menaruh rahasia pada kode frontend atau variabel lingkungan yang diekspos ke peramban.
- Beri komentar pada fungsi simulasi agar mudah diganti saat backend mulai dikerjakan.
- Jangan membuat struktur backend sementara yang seolah-olah sudah siap produksi.

# 1. DESIGN DIRECTION — AURORA GLASS EDITORIAL

## 1.1 Nama dan karakter

**Aurora Glass Editorial** adalah arah desain yang menggabungkan:

- kehangatan Burgundy, Dark Wine, Warm Ivory, Gold, dan Copper;
- tipografi serif display yang elegan untuk headline;
- Poppins yang bersih untuk navigasi, isi, label, dan komponen;
- glassmorphism dengan blur dan translucency yang terukur;
- background line art berupa lengkung, garis kontur, ribbon, dan orbit;
- komposisi section yang bervariasi tetapi tetap memiliki sistem;
- card dengan bentuk khas, bukan kumpulan kotak seragam;
- motion halus yang membantu orientasi dan memberi kesan hidup;
- dashboard yang rapi dan mudah dipindai.

Visual harus terasa **premium dan khas**, tetapi tidak menjadi ramai, berlebihan, atau mengorbankan kemudahan penggunaan.

## 1.2 Lima prinsip utama

### A. Clean, not empty

Gunakan whitespace sebagai bagian dari desain. Area kosong boleh memiliki gradient sangat lembut, garis lengkung, atau satu ornamen bermakna. Jangan mengisi semua ruang dengan card dan teks.

### B. Glass with purpose

Glass digunakan pada navbar, floating panel, mega dropdown, hero callout, overlay, dan beberapa panel ringkasan. Glass tidak boleh digunakan pada semua komponen.

### C. Editorial hierarchy

Headline serif display menjadi identitas visual. Poppins menjaga seluruh informasi tetap rapi dan mudah dibaca. Satu section harus memiliki satu fokus visual yang jelas.

### D. Layered but controlled

Gunakan kombinasi background, panel, image, line art, dan shadow untuk membangun kedalaman. Hindari menumpuk lebih dari tiga lapisan visual yang saling bersaing dalam satu area.

### E. Motion with meaning

Gerakan harus membantu pengguna memahami perubahan state, perpindahan tab, pembukaan dropdown, pergantian workspace, dan kemunculan konten. Animasi bukan sekadar hiasan yang terus bergerak.

## 1.3 Kata kunci visual

`Aurora` · `Glass` · `Editorial` · `Warm Ivory` · `Burgundy` · `Serif Display` · `Layered Depth` · `Fine Lines` · `Flowing Ribbons` · `Soft Motion` · `Premium Utility` · `Distinctive Cards`

## 1.4 Hal yang harus dihindari

- Seluruh website berwarna Burgundy tanpa jeda surface terang.
- Seluruh section menggunakan layout, bentuk, dan background yang sama.
- Glass dengan opacity terlalu rendah sehingga teks sulit dibaca.
- Garis dekoratif melintasi teks atau menutupi foto.
- Glow neon, gradient pelangi, shadow hitam pekat, atau warna yang tidak harmonis.
- Semua card dibuat pill atau rounded penuh tanpa variasi.
- Semua judul menggunakan serif, termasuk label form dan tabel.
- Semua dashboard terlihat seperti landing page promosi.
- Animasi bounce berlebihan, parallax berat, atau autoplay yang tidak bisa dihentikan.
- Mengubah bentuk, warna, proporsi, atau detail logo master.

------------------------------------------------------------------------

# 2. BRAND IDENTITY & LOGO APPLICATION

## 2.1 Tiga identitas yang harus dibedakan

| Identitas                  | Peran                      | Penggunaan utama                                                      |
|:---------------------------|:---------------------------|:----------------------------------------------------------------------|
| Logo HIPMI                 | Identitas organisasi HIPMI | Public navbar dan konteks identitas organisasi                        |
| Wordmark Telkom University | Identitas institusi        | Di samping logo HIPMI pada public navbar sesuai aset resmi            |
| Logo ARTHAKARSA            | Identitas kabinet aktif    | Loading screen, identitas kabinet, section kabinet, dan media kabinet |

**Penting:** logo ARTHAKARSA tidak menggantikan logo HIPMI atau wordmark Telkom University pada public navbar.

## 2.2 Aturan logo

- Gunakan master asset asli.
- Pertahankan aspect ratio.
- Gunakan `object-fit: contain`.
- Jangan mengubah warna, bentuk, outline, shadow, glow, bevel, atau efek 3D pada logo.
- Jangan memotong bagian logo untuk menyesuaikan container.
- Sediakan clear space di sekeliling logo.
- Background di belakang logo boleh disesuaikan, bukan file logonya.
- Jika logo tidak terbaca pada background gelap, gunakan contained light surface.
- Jangan membuat ulang logo menggunakan teks, CSS, SVG tracing, atau AI-generated imitation.

## 2.3 Asset ARTHAKARSA

Dokumen sumber menyebut `public/assets/logo.png` sebagai master logo ARTHAKARSA. Path aktual tetap harus diverifikasi pada repository sebelum implementasi.

Gunakan logo kabinet pada: - branded loading screen; - dashboard atau area yang secara eksplisit menampilkan identitas kabinet; - hero/section kabinet bila relevan; - footer identitas kabinet; - media yang memang mewakili kabinet aktif.

Jangan memasang logo kabinet di setiap card atau setiap sudut halaman.

## 2.4 Lima elemen/pecahan logo

Lima elemen brand memiliki fungsi semantik:

| Elemen            | Makna                 | Penggunaan visual              |
|:------------------|:----------------------|:-------------------------------|
| Bintang           | Nilai dan dampak      | Highlight prestasi/capaian     |
| Siluet arah       | Pertumbuhan           | Section pengembangan kapasitas |
| Alur dinamis      | Kolaborasi dan proses | Connected lines/divider        |
| Lengkung penopang | Keberlanjutan         | Footer/penutup section         |
| Lengkung fondasi  | Ekosistem             | Komposisi hero/foundation      |

Aturan: - Gunakan asset pecahan asli jika tersedia. - Jangan mengubah warna, proporsi, atau memotong bagian penting. - Jangan menumpuk kelima pecahan dalam satu section. - Jangan menggunakan pecahan logo sebagai pola berulang yang terlalu padat. - Jika asset tidak ditemukan, jangan menggambar ulang seolah asset resmi; gunakan line art dekoratif generik yang tidak diklaim sebagai logo.

## 2.5 Asset foto

- Foto pengurus dan kader harus berasal dari sumber organisasi yang benar dan memiliki izin publikasi.
- Foto stok tidak boleh disajikan sebagai dokumentasi kegiatan HIPMI.
- Foto pimpinan tidak boleh dimanipulasi wajahnya.
- Foto profil kosong/gagal dimuat menggunakan `siluet.png` sesuai keputusan proyek, setelah path aktual diverifikasi.
- Logo selalu menggunakan `contain`; foto menggunakan rasio sesuai konteks.
- Foto tidak boleh dipotong pada wajah atau bagian penting.

## 2.6 Asset manifest wajib

Sebelum coding final, AI Agent harus memeriksa folder aset dan mengisi manifest:

| Field manifest | Keterangan                                                         |
|:---------------|:-------------------------------------------------------------------|
| `asset_name`   | Nama file aktual                                                   |
| `path`         | Path aktual di repository                                          |
| `asset_type`   | Logo, font, illustration, decoration, profile, poster, background  |
| `source`       | Master resmi, user-provided, licensed, generated, atau placeholder |
| `format`       | PNG, SVG, WebP, JPG, WOFF2, dan sebagainya                         |
| `dimensions`   | Lebar × tinggi jika berupa gambar                                  |
| `aspect_ratio` | Rasio asli                                                         |
| `transparency` | Ada/tidak                                                          |
| `usage`        | Halaman/komponen yang boleh memakai                                |
| `alt_text`     | Teks alternatif                                                    |
| `notes`        | Lisensi, crop, fallback, dan batasan                               |

Jangan membuat path palsu untuk memenuhi tabel manifest.

------------------------------------------------------------------------

# 3. COLOR SYSTEM — BURGUNDY, IVORY & SUPPORTING COLORS

## 3.1 Prinsip palet

Primary Burgundy dan Dark Wine tetap menjadi inti identitas. Warna pendukung dipilih agar desain tidak monoton: Ivory, Blush, Antique Gold, Copper, Dusty Mauve, dan Cool Mist.

Warna pendukung di bawah ini tidak menggantikan nilai brand resmi. Nilai EXTENSION berfungsi sebagai variasi surface, dekorasi, dan state visual.

## 3.2 Official brand colors

| Token                | HEX       | Status   | Fungsi                                     |
|:---------------------|:----------|:---------|:-------------------------------------------|
| `brand-burgundy`     | `#5A1722` | OFFICIAL | Primary, CTA, active state, brand headline |
| `brand-dark-wine`    | `#3D0F16` | OFFICIAL | Kedalaman, dark panel, footer, sidebar     |
| `brand-antique-gold` | `#E8B577` | OFFICIAL | Garis, highlight, detail dekoratif         |
| `brand-muted-copper` | `#AF7D66` | OFFICIAL | Border aksen, ornamen sekunder             |
| `brand-warm-ivory`   | `#FDF7F2` | OFFICIAL | Background pendamping                      |
| `neutral-white`      | `#FFFFFF` | OFFICIAL | Surface utama                              |
| `neutral-black`      | `#171313` | OFFICIAL | Teks utama                                 |
| `neutral-muted`      | `#6B6260` | OFFICIAL | Teks sekunder                              |
| `neutral-border`     | `#E9E1DC` | OFFICIAL | Border netral                              |
| `neutral-surface`    | `#FAF8F6` | OFFICIAL | Surface alternatif                         |

## 3.3 Warna pendukung dan warna latar bagian

Warna pendukung berikut adalah warna perluasan untuk latar, permukaan, dan hiasan. Warna ini tidak menggantikan dua warna utama.

| Token                  | HEX       | Status    | Fungsi                                                         |
|------------------------|-----------|-----------|----------------------------------------------------------------|
| `surface-warm-white`   | `#FCF8F6` | EXTENSION | Putih hangat untuk pergantian bagian yang sangat lembut        |
| `surface-blush-mist`   | `#F8EFF1` | EXTENSION | Latar merah muda pucat untuk bagian editorial                  |
| `surface-soft-rose`    | `#F2E5E8` | EXTENSION | Latar sorotan, panel, dan kelompok kartu                       |
| `surface-warm-ivory`   | `#FDF7F2` | OFFICIAL  | Gading hangat sebagai warna pendamping resmi                   |
| `surface-soft-neutral` | `#F5F3F2` | EXTENSION | Latar netral untuk tabel ringkas, panel informasi, dan pemisah |
| `accent-soft-gold`     | `#D4A76A` | EXTENSION | Aksen emas lembut untuk garis dan penanda dekoratif            |
| `accent-copper-deep`   | `#B8734E` | EXTENSION | Aksen tembaga pada ilustrasi dan garis                         |
| `accent-dusty-mauve`   | `#A07A8E` | EXTENSION | Variasi visual kecil pada ilustrasi dan kartu khusus           |

Warna pendukung hanya dipakai dalam bidang yang luas jika tingkat warnanya tetap sangat lembut. Teks utama tidak boleh menggunakan warna emas, tembaga, atau merah muda pucat jika kontrasnya tidak cukup.

### Prinsip warna latar

- Putih `#FFFFFF` adalah dasar utama layar dan tetap menjadi warna yang paling dominan.
- Bagian halaman boleh memakai latar pendukung yang berbeda, tetapi perpindahannya harus menyatu.
- Warna merah muda hanya menjadi semburat lembut, bukan warna dominan yang memenuhi seluruh halaman.
- Burgundy digunakan sebagai penekanan, bukan sebagai latar semua bagian.
- Dark Wine digunakan untuk bagian pernyataan, bilah samping, atau penutup yang memang membutuhkan kontras kuat.
- Jangan membuat pola warna bergantian yang terlalu kontras atau tampak seperti garis-garis blok.

## 3.4 Semantic colors

Semantic colors dipakai untuk status sistem, bukan untuk mengganti brand.

| Token            | Rekomendasi awal | Surface rekomendasi | Makna                   |
|:-----------------|:-----------------|:--------------------|:------------------------|
| `status-success` | `#2F7A59`        | `#EAF5EE`           | Berhasil/Approved       |
| `status-warning` | `#A96C16`        | `#FFF4DF`           | Perlu perhatian/Pending |
| `status-error`   | `#B83A42`        | `#FCEBED`           | Gagal/Rejected          |
| `status-info`    | `#356C9A`        | `#EAF2FA`           | Informasi               |
| `status-neutral` | `#6B6260`        | `#F1EEEB`           | Draft/Inactive/Unknown  |

Nilai semantic di atas adalah EXTENSION awal dan wajib melalui contrast test pada prototype. Status tidak boleh disampaikan hanya dengan warna; sertakan label dan/atau ikon.

## 3.5 Hierarki penggunaan warna

Gunakan proporsi visual sebagai pedoman, bukan hitungan kaku:

- 60–70%: putih dan putih hangat.
- 12–20%: warna latar bagian yang sangat lembut, seperti Blush Mist, Soft Rose, Warm Ivory, dan Soft Neutral.
- 10–18%: Burgundy dan Dark Wine untuk identitas, judul, tombol utama, bilah samping, serta bagian sorotan.
- 2–5%: Emas antik, tembaga, dan mauve sebagai aksen.
- Warna status hanya muncul ketika diperlukan oleh keadaan sistem.

Jangan memaksa setiap halaman menggunakan seluruh warna. Setiap halaman cukup memakai putih, satu atau dua warna latar pendamping, warna utama, dan aksen seperlunya.

## 3.6 Hover, active, focus, disabled

| State          | Aturan visual                                                          |
|:---------------|:-----------------------------------------------------------------------|
| Default        | Warna brand/surface sesuai fungsi                                      |
| Hover primary  | Burgundy sedikit lebih terang, shadow lembut, lift 1–2 px              |
| Active/pressed | Dark Wine atau pressed surface, scale maksimal sekitar 0.98            |
| Focus-visible  | Ring Burgundy yang jelas dan tidak hanya mengandalkan shadow           |
| Disabled       | Kontras tetap cukup, opacity/surface lebih tenang, cursor nonaktif     |
| Loading        | Dimensi komponen tetap, spinner/progress tampil tanpa menggeser layout |
| Success/error  | Semantic surface + label/ikon yang eksplisit                           |

## 3.7 Sistem latar layar dan bagian

| Token                  | HEX       | Penggunaan                                                |
|------------------------|-----------|-----------------------------------------------------------|
| `screen-background`    | `#FFFFFF` | Dasar seluruh layar                                       |
| `section-white`        | `#FFFFFF` | Bagian utama dan area yang membutuhkan keterbacaan tinggi |
| `section-warm-white`   | `#FCF8F6` | Pergantian bagian yang hampir putih                       |
| `section-blush-mist`   | `#F8EFF1` | Bagian pengenalan, sorotan, atau konten editorial         |
| `section-soft-rose`    | `#F2E5E8` | Panel sorotan dan kelompok kartu tertentu                 |
| `section-warm-ivory`   | `#FDF7F2` | Bagian cerita, nilai, dan konten yang terasa hangat       |
| `section-soft-neutral` | `#F5F3F2` | Panel informasi sekunder dan permukaan netral             |
| `section-dark`         | `#3D0F16` | Bagian penutup atau pernyataan khusus, secara terbatas    |

**Putih tetap menjadi dasar layar.** Warna pendukung hanya dipakai pada bagian tertentu. Tidak semua bagian harus memiliki latar berbeda; bagian yang memuat tabel, formulir, atau informasi padat boleh tetap putih.

## 3.8 CSS color tokens

``` css
:root {
  /* Warna utama */
  --color-brand-burgundy: #5A1722;
  --color-brand-dark-wine: #3D0F16;
  --color-brand-antique-gold: #E8B577;
  --color-brand-muted-copper: #AF7D66;

  /* Dasar layar */
  --color-screen-background: #FFFFFF;
  --color-surface-white: #FFFFFF;
  --color-surface-warm-white: #FCF8F6;
  --color-surface-blush-mist: #F8EFF1;
  --color-surface-soft-rose: #F2E5E8;
  --color-surface-warm-ivory: #FDF7F2;
  --color-surface-soft-neutral: #F5F3F2;

  /* Aksen pendukung */
  --color-accent-soft-gold: #D4A76A;
  --color-accent-deep-copper: #B8734E;
  --color-accent-dusty-mauve: #A07A8E;

  /* Teks dan garis */
  --color-text-primary: #171313;
  --color-text-secondary: #6B6260;
  --color-border-default: #E9E1DC;
  --color-stroke-soft: #E7DDD5;

  /* Status */
  --color-status-success: #2F7A59;
  --color-status-warning: #A96C16;
  --color-status-error: #B83A42;
  --color-status-info: #356C9A;
  --color-status-neutral: #6B6260;

  /* Alias */
  --color-primary: var(--color-brand-burgundy);
  --color-primary-strong: var(--color-brand-dark-wine);
  --color-background: var(--color-screen-background);
  --color-surface: var(--color-surface-white);
}
```

## 3.9 Perpindahan warna antarbagiannya

Perpindahan latar harus terasa seperti satu bidang visual yang berlanjut, bukan kumpulan kotak warna yang berdiri sendiri.

### Pola urutan yang disarankan

``` text
Putih
  ↓ gradasi putih ke putih hangat
Putih Hangat
  ↓ lengkungan lembut dan garis kontur
Merah Muda Pucat
  ↓ pita mengalir beropacity rendah
Putih
  ↓ semburat gading hangat
Gading Hangat
  ↓ kembali memudar ke putih
Putih
  ↓ bagian penutup khusus
Dark Wine
```

Urutan tersebut adalah contoh ritme, bukan susunan wajib untuk setiap halaman. Pilih warna sesuai isi dan panjang halaman.

### Aturan penyambung bagian

- Gunakan gradasi vertikal atau radial yang sangat lembut pada tepi bagian.
- Bentuk gelombang, lengkungan, atau pita boleh melewati batas dua bagian sebagai penghubung visual.
- Garis kontur boleh berlanjut dari satu bagian ke bagian berikutnya, tetapi jangan menutupi tulisan atau gambar.
- Hindari pergantian langsung dari putih ke merah muda pekat atau dari putih ke Dark Wine tanpa alasan komposisi.
- Hindari memakai warna latar berbeda pada setiap kartu dalam satu kelompok.
- Bagian formulir, tabel, dan data padat tetap menggunakan permukaan putih atau warna sangat netral.
- Pada layar kecil, sederhanakan bentuk sambungan agar tidak menimbulkan gulir mendatar.

### Contoh penerapan

``` css
.section-intro {
  background: linear-gradient(
    180deg,
    #FFFFFF 0%,
    #FCF8F6 100%
  );
}

.section-feature {
  background:
    radial-gradient(
      circle at 85% 12%,
      rgba(242, 229, 232, 0.72),
      transparent 38%
    ),
    #F8EFF1;
}

.section-content {
  background: linear-gradient(
    180deg,
    #F8EFF1 0%,
    #FFFFFF 34%
  );
}
```

Contoh ini adalah pola awal. Jangan menerapkan gradasi yang sama pada semua bagian; pilih komposisi berdasarkan kebutuhan visual dan keterbacaan.

# 4. TYPOGRAPHY — ARTHAKARSA SERIF DISPLAY + POPPINS

## 4.1 Typeface roles

Website menggunakan dua keluarga font:

1.  **ARTHAKARSA Serif Display** — display/headline editorial, elegan, berkarakter, dan menjadi identitas visual.
2.  **Poppins** — UI/body/interface, modern, bersih, mudah dibaca, dan konsisten untuk seluruh komponen.

Jangan menggunakan serif display untuk tabel, form label, navigasi, atau metadata yang padat.

## 4.2 ARTHAKARSA Serif Display

Digunakan untuk: - Hero headline. - Judul section publik. - Editorial feature title. - Judul statement panel. - Judul halaman publik yang membutuhkan karakter editorial. - Angka/statement dekoratif tertentu jika keterbacaan tetap baik. - Headline loading/error page yang memang bersifat display.

Aturan: - Gunakan ukuran besar dengan line-height rapat tetapi tidak saling bertabrakan. - Gunakan regular/medium sesuai file font aktual. - Italic boleh digunakan untuk satu frasa penekanan, bukan seluruh heading. - Jangan memaksakan bold palsu jika font file tidak memiliki weight tersebut. - Hindari serif pada paragraf panjang. - Jangan menggunakan serif display untuk seluruh dashboard operasional.

**VERIFY ASSET:** file font ARTHAKARSA Serif Display harus dicari di repository/assets. Nama family di CSS tidak membuktikan file font tersedia. Jika belum ditemukan, jangan menggantinya diam-diam dengan font lain; tandai dan minta file atau persetujuan fallback.

## 4.3 Poppins

Digunakan untuk: - Public navbar. - Sidebar dan topbar. - Body text. - Label, helper text, caption, overline. - Button dan CTA. - Form dan validation. - Table dan data grid. - Badge dan status. - Metadata tanggal/lokasi. - Dashboard metrics. - Dropdown dan tooltip.

Bobot yang disarankan: - 400: body normal. - 500: label, metadata, body emphasis ringan. - 600: navigation, button, card title UI. - 700: heading sans, statistic label, active menu. - 800: emphasis pendek jika dibutuhkan.

## 4.4 Type scale

| Token         |   Desktop |   Mobile | Font                     | Penggunaan                  |
|:--------------|----------:|---------:|:-------------------------|:----------------------------|
| `display-2xl` | 76–112 px | 44–64 px | ARTHAKARSA Serif Display | Hero utama                  |
| `display-xl`  |  64–80 px | 40–52 px | ARTHAKARSA Serif Display | Headline besar              |
| `display-lg`  |  48–64 px | 34–44 px | ARTHAKARSA Serif Display | Judul section utama         |
| `display-md`  |  36–48 px | 28–36 px | ARTHAKARSA Serif Display | Editorial title             |
| `heading-xl`  |  36–44 px | 28–34 px | Poppins 700              | Dashboard/page heading      |
| `heading-lg`  |  28–36 px | 24–30 px | Poppins 700              | Section heading operasional |
| `heading-md`  |  22–28 px | 20–24 px | Poppins 600–700          | Card/panel title            |
| `heading-sm`  |  18–22 px | 17–20 px | Poppins 600              | Subsection                  |
| `body-lg`     |     18 px | 16–17 px | Poppins 400–500          | Intro paragraph             |
| `body-md`     |     16 px | 15–16 px | Poppins 400              | Body default                |
| `body-sm`     |     14 px |    14 px | Poppins 400–500          | Helper/secondary            |
| `caption`     |  12–13 px | 12–13 px | Poppins 400–500          | Metadata                    |
| `overline`    |  11–12 px | 11–12 px | Poppins 600–700          | Eyebrow/section label       |

Nilai merupakan implementation baseline. Gunakan `clamp()` agar judul tidak meluber pada viewport kecil.

## 4.5 Line-height dan letter spacing

| Elemen          | Line-height | Letter spacing         |
|:----------------|------------:|:-----------------------|
| Serif display   |   0.98–1.12 | -0.02em sampai normal  |
| Poppins heading |   1.12–1.28 | -0.02em sampai -0.01em |
| Body            |     1.5–1.7 | Normal                 |
| Button          |     1.1–1.3 | Normal                 |
| Overline        |     1.3–1.5 | 0.12em–0.18em          |
| Metadata        |     1.4–1.5 | Normal                 |

## 4.6 Fluid typography

``` css
:root {
  --font-display-2xl: clamp(2.75rem, 7vw, 7rem);
  --font-display-xl: clamp(2.5rem, 5.6vw, 5rem);
  --font-display-lg: clamp(2.1rem, 4.4vw, 4rem);
  --font-heading-xl: clamp(1.75rem, 3.2vw, 2.75rem);
  --font-heading-lg: clamp(1.5rem, 2.5vw, 2.25rem);
  --font-body-lg: clamp(1rem, 1.2vw, 1.125rem);
}
```

## 4.7 Font loading

- Prioritaskan font file lokal bila tersedia.
- Jika memakai font provider eksternal, pastikan kebijakan build dan koneksi proyek mengizinkan.
- Gunakan `font-display: swap`.
- Preload hanya font yang benar-benar dipakai di above-the-fold.
- Jangan preload seluruh weight.
- Siapkan fallback serif dan sans-serif yang proporsional.
- Hindari layout shift saat font selesai dimuat.
- Uji karakter Bahasa Indonesia, angka, tanda baca, uppercase, italic, dan font weight.

Contoh token:

``` css
:root {
  --font-display: "ARTHAKARSA Serif Display", Georgia, serif;
  --font-ui: "Poppins", Arial, sans-serif;
}

body,
button,
input,
textarea,
select {
  font-family: var(--font-ui);
}

.display-heading,
.editorial-title {
  font-family: var(--font-display);
}
```

------------------------------------------------------------------------

# 5. BACKGROUND SIGNATURE — FINE LINES, CONTOUR & FLOWING RIBBONS

## 5.1 Background line art sebagai identitas

**Garis lengkung pada moodboard menjadi signature visual ARTHAKARSA.** Garis tidak boleh diperlakukan sebagai pattern acak. Garis harus membangun arah, kedalaman, koneksi, pertumbuhan, dan kontinuitas antar-section.

Background harus tetap terasa bersih. Garis terlihat ketika diperhatikan, tetapi tidak mengganggu konten utama.

## 5.2 Lima keluarga garis

### A. Contour Lines

Garis lengkung berlapis seperti kontur topografi/gelombang yang mengikuti tepi section.

Penggunaan: - pojok kanan atas hero; - pojok kiri bawah section; - sisi luar background dashboard; - area kosong di belakang featured card; - background loading screen.

Aturan: - 2–5 garis dalam satu kelompok. - Stroke 0.75–1.25 px. - Jarak antar-garis 10–24 px. - Warna Antique Gold/Copper dengan opacity 0.12–0.30. - Tidak melewati paragraf atau form.

### B. Flowing Ribbon Lines

Garis panjang yang mengalir dari satu sisi section ke sisi lain. Bisa berupa satu ribbon utama dan satu garis tipis pendamping.

Penggunaan: - divider antar-section; - transisi dari hero ke content; - section impact/statistik; - footer; - bagian bawah hero image.

Aturan: - Satu ribbon utama per section besar. - Maksimal dua garis pendamping. - Jangan membuat gelombang terlalu tinggi hingga mengambil ruang konten. - Gold/Copper hanya sebagai garis aksen. - Jika ribbon memakai gradient, gunakan transisi Burgundy → Copper → Antique Gold secara halus.

### C. Arch / Orbital Lines

Garis berbentuk orbit, setengah lingkaran, oval besar, atau lengkungan yang mengitari foto/objek.

Penggunaan: - foto utama hero; - featured image; - loading animation; - visual highlight card.

Aturan: - Gunakan garis tipis dengan satu titik highlight jika relevan. - Tidak mengitari semua card. - Hindari animasi orbit yang terus berjalan pada elemen dekoratif besar jika mengganggu performa.

### D. Connected Lines

Garis penghubung antarelemen yang mewakili kolaborasi dan struktur.

Penggunaan: - struktur organisasi; - relasi Bidang–Kompartemen; - hubungan proker; - timeline; - diagram proses.

Aturan: - Garis mengikuti hubungan data yang benar. - Warna netral/Copper tipis. - Titik koneksi memiliki makna. - Tidak menampilkan garis dekoratif yang seolah menunjukkan relasi data palsu.

### E. Frame / Inset Lines

Garis frame tipis yang membentuk bingkai di dalam hero atau section.

Penggunaan: - frame hero; - container editorial; - background poster/cover; - panel identitas kabinet.

Aturan: - Stroke 1 px. - Radius mengikuti container. - Opacity rendah. - Frame tidak boleh mengurangi ruang visual atau menabrak navbar.

## 5.3 Warna dan tingkat kepekatan garis

| Token                | Warna dasar | Tingkat kepekatan awal | Penggunaan                            |
|----------------------|-------------|-----------------------:|---------------------------------------|
| `line-gold-soft`     | `#E8B577`   |              0.12–0.26 | Garis kontur dan pita di atas putih   |
| `line-copper-soft`   | `#AF7D66`   |              0.10–0.22 | Garis pendamping                      |
| `line-burgundy-soft` | `#5A1722`   |              0.04–0.10 | Garis tipis di atas putih hangat      |
| `line-rose-soft`     | `#F2E5E8`   |              0.45–0.70 | Garis terang di atas Burgundy         |
| `line-ivory-soft`    | `#FDF7F2`   |              0.12–0.24 | Garis di atas Dark Wine               |
| `line-white-soft`    | `#FFFFFF`   |              0.10–0.22 | Bingkai dan kontur di permukaan gelap |

Garis dekoratif harus tetap terlihat lembut. Jika garis lebih menonjol daripada judul, foto, atau isi bagian, turunkan tingkat kepekatannya.

## 5.4 Aturan penempatan

- Letakkan line art di area pinggir, sudut, atau ruang kosong.
- Jangan melintasi wajah/foto utama.
- Jangan melintasi teks body, tabel, field, atau tombol.
- Jangan menempatkan garis di bawah teks dengan kontras yang tidak terkontrol.
- Gunakan `pointer-events: none`.
- Gunakan `aria-hidden="true"` untuk dekorasi murni.
- Hindari background pattern yang membuat scroll terasa berisik.
- Gunakan satu fokus line art dominan per section, bukan semua keluarga garis sekaligus.

## 5.5 Section background composition

Section boleh memiliki bentuk berbeda:

| Pattern                   | Bentuk                          | Penggunaan                       |
|:--------------------------|:--------------------------------|:---------------------------------|
| `section-plain`           | White/Ivory solid               | Form, data, intro, dashboard     |
| `section-aurora`          | Ivory + soft radial glow        | Hero publik                      |
| `section-wave`            | Batas section melengkung/ribbon | Transisi hero ke content         |
| `section-glass-block`     | Panel besar translucent         | Program highlights               |
| `section-angled`          | Satu sisi diagonal              | Impact/statistics                |
| `section-dark-statement`  | Burgundy/Dark Wine panel        | Statement/featured impact        |
| `section-editorial-split` | Teks dan foto asimetris         | About, article, organization     |
| `section-layered`         | Card/panel bertumpuk            | Showcase dan feature             |
| `section-connected`       | Connected lines/cards           | Organization/workspace hierarchy |

## 5.6 Background implementation

- Utamakan CSS gradient ringan untuk glow dan SVG untuk line art kompleks.
- SVG dekoratif harus memiliki `viewBox`, tidak blur pada high DPI, dan tidak mengambil fokus keyboard.
- Hindari gambar raster besar hanya untuk membuat garis sederhana.
- Bila menggunakan asset pecahan logo, pakai file asli dan jangan mengubah bentuk.
- Background tidak boleh menghalangi text selection, klik, scroll, atau responsive layout.
- Pada mobile, kurangi jumlah garis dan panjang ribbon.

Contoh CSS konseptual:

``` css
.background-aurora {
  background:
    radial-gradient(
      circle at 82% 16%,
      rgba(232, 181, 119, 0.16),
      transparent 30%
    ),
    radial-gradient(
      circle at 8% 86%,
      rgba(175, 125, 102, 0.10),
      transparent 34%
    ),
    var(--color-brand-warm-ivory);
}

.decorative-lines {
  pointer-events: none;
  position: absolute;
  inset: 0;
  overflow: hidden;
  aria-hidden: true;
}
```

Contoh di atas adalah baseline konsep. Jangan membuat semua section memakai gradient yang sama; setiap section memilih satu pattern yang relevan.

## 5.7 Background density scale

| Level | Kepadatan                          | Penggunaan                                                     |
|:------|:-----------------------------------|:---------------------------------------------------------------|
| `L0`  | Tanpa ornament                     | Form, tabel, halaman sensitif                                  |
| `L1`  | Satu kelompok garis halus          | Halaman publik standar                                         |
| `L2`  | Dua kelompok garis + glow ringan   | Hero/section editorial                                         |
| `L3`  | Ribbon + contour + layered surface | Hero utama atau showcase khusus                                |
| `L4`  | Ornament sangat kaya               | Hanya loading/cover/visual campaign, bukan halaman operasional |

Default website adalah L1–L2. L3 digunakan selektif. L4 tidak digunakan untuk dashboard harian.

------------------------------------------------------------------------

# 6. GLASSMORPHISM SYSTEM

## 6.1 Prinsip glass

Glass harus menciptakan kedalaman dan pemisahan layer, bukan membuat seluruh UI transparan. Setiap glass panel harus memiliki: - background translucent; - backdrop blur yang cukup; - border terang/halus; - shadow lembut; - teks dengan kontras aman; - fallback solid ketika blur tidak didukung.

## 6.2 Glass variants

| Variant           | Background              |     Blur | Border                   | Penggunaan                     |
|:------------------|:------------------------|---------:|:-------------------------|:-------------------------------|
| `glass-navbar`    | `rgba(255,251,247,.78)` | 18–22 px | White 0.65 + warm border | Public navbar                  |
| `glass-floating`  | `rgba(255,255,255,.54)` | 20–24 px | White 0.70               | Hero callout                   |
| `glass-dropdown`  | `rgba(255,251,247,.94)` | 14–18 px | `#E9E1DC`                | Mega dropdown                  |
| `glass-panel`     | `rgba(255,255,255,.66)` | 16–20 px | White 0.60               | Editorial panel                |
| `glass-dashboard` | `rgba(255,255,255,.82)` | 12–18 px | `#E9E1DC`                | Topbar/panel tertentu          |
| `glass-modal`     | `rgba(255,251,247,.90)` | 18–24 px | White 0.70               | Overlay/modal terpilih         |
| `glass-dark`      | `rgba(61,15,22,.78)`    | 16–20 px | White 0.16               | Floating panel di dark surface |

## 6.3 Glass shadow

``` css
:root {
  --glass-shadow-soft: 0 8px 28px rgba(61, 15, 22, 0.07);
  --glass-shadow-medium: 0 14px 40px rgba(61, 15, 22, 0.10);
  --glass-shadow-floating: 0 20px 54px rgba(61, 15, 22, 0.13);
}
```

Shadow tidak boleh tampak hitam pekat. Gunakan warna Dark Wine dengan opacity rendah.

## 6.4 Kapan glass digunakan

**Boleh digunakan:** - Public navbar. - Floating callout pada hero. - Mega dropdown. - Feature overlay pada foto. - Selected dashboard topbar/panel. - Modal ringan yang membutuhkan layer. - Floating quick action jika memang dibutuhkan.

**Tidak boleh digunakan sebagai default:** - Data table. - Form panjang. - Payment proof viewer. - QR code/ticket QR. - Scanner camera frame. - Dense financial report. - Teks panjang yang harus dibaca. - Area yang membutuhkan kontras sangat tinggi. - Semua card secara serentak.

## 6.5 Fallback

Jika `backdrop-filter` tidak tersedia: - gunakan White/Blush solid dengan opacity tinggi; - pertahankan border; - pertahankan shadow ringan; - pastikan teks tetap terbaca; - jangan membuat komponen hilang atau berubah ukuran.

------------------------------------------------------------------------

# 7. LAYOUT, GRID, SPACING & SECTION RHYTHM

## 7.1 Container

| Token                | Nilai baseline | Penggunaan                 |
|:---------------------|---------------:|:---------------------------|
| `container-sm`       |         720 px | Form, article body         |
| `container-md`       |         960 px | Content page               |
| `container-lg`       |        1200 px | Standard content           |
| `container-xl`       |        1360 px | Dashboard/public feature   |
| `container-2xl`      |        1480 px | Wide hero/showcase         |
| `page-gutter`        | 24–64 px fluid | Padding horizontal desktop |
| `page-gutter-mobile` |       16–20 px | Padding horizontal mobile  |

## 7.2 Grid

- Desktop: 12-column grid.
- Tablet: 8-column grid.
- Mobile: 4-column grid.
- Gap desktop: 20–28 px.
- Gap tablet: 16–24 px.
- Gap mobile: 12–16 px.
- Hindari grid yang memaksa text column terlalu sempit.
- Untuk hero, gunakan grid asimetris seperti 5/7 atau 6/6 sesuai foto.
- Untuk dashboard, sidebar dan main content harus memiliki lebar stabil.

## 7.3 Spacing scale

Gunakan basis 4 px:

| Token      |  Nilai |
|:-----------|-------:|
| `space-1`  |   4 px |
| `space-2`  |   8 px |
| `space-3`  |  12 px |
| `space-4`  |  16 px |
| `space-5`  |  20 px |
| `space-6`  |  24 px |
| `space-8`  |  32 px |
| `space-10` |  40 px |
| `space-12` |  48 px |
| `space-16` |  64 px |
| `space-20` |  80 px |
| `space-24` |  96 px |
| `space-28` | 112 px |

## 7.4 Section spacing

- Section publik besar: 88–120 px vertical desktop.
- Section publik medium: 64–88 px.
- Section dashboard: 24–40 px.
- Card internal: 16–28 px padding.
- Form group: 20–28 px vertical.
- Data dense: 12–20 px.

## 7.5 Section shape variation

Setiap halaman boleh memiliki bentuk section berbeda, tetapi harus memakai token dan pattern yang telah didefinisikan.

**Contoh ritme Beranda:**

1.  Hero `section-aurora` — ivory, photo, glass, fine-line orbit.
2.  Value proposition `section-plain` — putih, icon tiles, divider tipis.
3.  Program highlight `section-glass-block` — panel besar rounded, cards image-led.
4.  Impact `section-angled` — dark Burgundy panel dan statistik terang.
5.  Editorial insight `section-editorial-split` — foto horizontal, serif title, ribbon divider.
6.  Footer `section-dark-statement` — Dark Wine, gold contour, informasi organisasi.

Jangan membuat seluruh section Beranda menjadi panel glass. Gunakan pergantian visual agar halaman memiliki ritme.

------------------------------------------------------------------------

# 8. RADIUS, BORDER, SHADOW & CARD SHAPE SYSTEM

## 8.1 Radius tokens

| Token         |  Nilai | Penggunaan            |
|:--------------|-------:|:----------------------|
| `radius-xs`   |   6 px | Badge kecil           |
| `radius-sm`   |  10 px | Input/compact control |
| `radius-md`   |  14 px | Button operasional    |
| `radius-lg`   |  18 px | Standard card         |
| `radius-xl`   |  24 px | Feature card          |
| `radius-2xl`  |  32 px | Hero glass panel      |
| `radius-3xl`  |  40 px | Large editorial panel |
| `radius-pill` | 999 px | CTA pill/tab pill     |

## 8.2 Border tokens

- Default: 1 px solid `#E9E1DC`.
- Glass: 1 px solid rgba(255,255,255,.60).
- Gold decorative: 1 px solid rgba(232,181,119,.30).
- Dark surface: 1 px solid rgba(255,255,255,.14).
- Focus ring: 2–3 px dengan offset yang cukup.

## 8.3 Shadow tokens

``` css
:root {
  --shadow-card: 0 6px 20px rgba(61, 15, 22, 0.06);
  --shadow-card-hover: 0 14px 30px rgba(61, 15, 22, 0.10);
  --shadow-floating: 0 18px 44px rgba(61, 15, 22, 0.12);
  --shadow-navbar: 0 8px 28px rgba(61, 15, 22, 0.08);
  --shadow-modal: 0 24px 64px rgba(61, 15, 22, 0.18);
}
```

## 8.4 Card family

### A. Standard Card

- White/Neutral Surface.
- Radius 18–24 px.
- Border netral.
- Shadow ringan.
- Untuk konten umum dan informasi ringkas.

### B. Editorial Feature Card

- Foto dominan.
- Eyebrow kecil.
- Serif title.
- Deskripsi singkat.
- CTA/link di bagian bawah.
- Rounded 24–32 px.
- Dapat menggunakan satu sisi image bleed.

### C. Glass Card

- Surface translucent.
- Blur terukur.
- Border terang.
- Shadow lembut.
- Untuk floating content/hero, bukan tabel.

### D. Angled Corner Card

- Satu sudut memiliki cut/diagonal treatment.
- Maksimal satu atau dua sudut unik.
- Konten tetap berada dalam safe padding.
- Digunakan untuk statistik/program unggulan.

### E. Notched Card

- Memiliki notch atau cut corner yang halus.
- Digunakan untuk metric/highlight, bukan seluruh list.

### F. Arch/Curve Card

- Salah satu sisi atau top edge memiliki curve/arch.
- Digunakan pada visual editorial atau image highlight.

### G. Pill Card

- Radius sangat besar.
- Untuk status/summary singkat atau feature strip.
- Jangan dipakai untuk konten panjang.

### H. Dark Feature Card

- Burgundy/Dark Wine.
- Teks putih/ivory.
- Gold line art tipis.
- Untuk satu highlight utama per area.

### I. Statistic Card

- Label, nilai, unit, perubahan, dan periode.
- Bentuk boleh berbeda, tetapi informasi harus memiliki struktur sama.
- Tidak boleh menampilkan tren persentase jika dummy data tidak memiliki pembanding yang jelas.

## 8.5 Card interaction

- Hover hanya jika card benar-benar interaktif.
- Lift maksimal 2–4 px.
- Shadow bertambah halus.
- Arrow boleh bergerak 2–4 px.
- Jangan mengubah ukuran card ketika hover.
- Focus-visible harus terlihat.
- Card non-interaktif tidak boleh tampak seperti tombol.
- Seluruh card dapat dibaca tanpa hover.

------------------------------------------------------------------------

# 9. PUBLIC NAVBAR — KPM-INSPIRED FLOATING GLASS NAVBAR

## 9.1 Tujuan

Public navbar harus memiliki komposisi seperti referensi KPM yang dikirim pengguna: - satu container horizontal lebar; - rounded capsule/rounded rectangle; - identitas/logo di kiri; - menu utama di tengah; - search dan tombol akun di kanan; - background putih/glass; - shadow halus dan border tipis; - tinggi proporsional dan tidak terlalu besar.

Referensi KPM hanya digunakan sebagai inspirasi komposisi dan hierarki. Jangan menyalin identitas, logo, tulisan, atau warna KPM.

## 9.2 Desktop composition

``` text
┌─────────────────────────────────────────────────────────────────────────────┐
│ [LOGO HIPMI] [TELKOM WORDMARK]   Beranda  Tentang Kami  Organisasi⌄          │
│                                      Aktivitas⌄  Karya Kader⌄  Kotak Suara   │
│                                           [Search] [Masuk] [Gabung HIPMI ↗]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.3 Layout specification

| Bagian      | Spesifikasi                                                |
|:------------|:-----------------------------------------------------------|
| Container   | Lebar `calc(100% - 48px)` sampai max-width sekitar 1840 px |
| Position    | Sticky/floating di area atas                               |
| Top spacing | 16–28 px desktop                                           |
| Height      | 76–92 px desktop                                           |
| Radius      | 22–30 px                                                   |
| Background  | White/Glass 0.78–0.92                                      |
| Border      | 1 px warm neutral/white                                    |
| Shadow      | Soft warm shadow                                           |
| Logo area   | Kiri, fixed minimum width                                  |
| Navigation  | Tengah, horizontal, gap 24–36 px                           |
| Action area | Kanan, search + Masuk + Gabung                             |
| Z-index     | Di atas page content, di bawah modal                       |
| Mobile      | Compact bar + drawer                                       |

## 9.4 Logo group

- Gunakan logo HIPMI resmi dan wordmark Telkom University sesuai aset aktual.
- Jaga proporsi dan clear space.
- Logo dan wordmark harus terlihat sebagai satu kelompok identitas institusi, tetapi tetap dua aset berbeda.
- Jangan menggunakan logo ARTHAKARSA sebagai pengganti.
- Jika nama kabinet ditampilkan, letakkan sebagai teks/brand area terpisah dan sesuai konteks.

## 9.5 Enam menu utama dan pemetaan aset visual

Nama, urutan, tujuan, dan submenu tetap mengikuti PRD. Tampilan bilah navigasi utama tetap ringkas dan mengutamakan tulisan. Aset visual ditampilkan pada panel menu turun, pratinjau menu jika tersedia, dan bagian pembuka halaman tujuan. Jangan memaksa gambar besar masuk ke bilah navigasi horizontal.

| Menu utama   | Aset visual yang harus dicari                                                              | Penggunaan pada panel menu/halaman                   |
|--------------|--------------------------------------------------------------------------------------------|------------------------------------------------------|
| Beranda      | Foto resmi kegiatan atau foto utama kabinet yang telah diizinkan; ornamen resmi ARTHAKARSA | Visual utama halaman Beranda dan pratinjau identitas |
| Tentang Kami | Foto resmi organisasi, kegiatan, atau dokumentasi sejarah yang sah                         | Panel pengenalan dan bagian cerita organisasi        |
| Organisasi   | Logo kabinet, foto pengurus resmi, ikon Bidang dan Kompartemen, aset struktur organisasi   | Panel menu Organisasi dan halaman struktur           |
| Aktivitas    | Poster agenda, sampul berita/artikel, dan materi kegiatan                                  | Panel menu Aktivitas, kartu agenda, dan kartu berita |
| Karya Kader  | Logo usaha, foto produk, dokumentasi prestasi, atau gambar penghargaan yang sah            | Panel menu Karya Kader dan halaman pameran karya     |
| Kotak Suara  | Ilustrasi kotak aspirasi, pesan, atau penyampaian masukan                                  | Panel pengantar dan halaman Kotak Suara              |

### 9.5.1 Daftar submenu dan aset pendukung

| Menu dan submenu             | Aset yang dicari                                                                    |
|------------------------------|-------------------------------------------------------------------------------------|
| Organisasi → Kabinet         | Logo kabinet yang sesuai periode dan foto resmi kabinet                             |
| Organisasi → Bidang          | Ikon atau lambang resmi Bidang dan foto kegiatan terkait                            |
| Organisasi → Kompartemen     | Ikon atau lambang resmi Kompartemen dan foto kegiatan terkait                       |
| Organisasi → Program Kerja   | Poster, sampul, atau dokumentasi Program Kerja yang sah                             |
| Aktivitas → Agenda & Tiket   | Poster agenda, gambar lokasi, atau materi kegiatan                                  |
| Aktivitas → Berita & Artikel | Sampul berita, foto artikel, atau dokumentasi yang relevan                          |
| Aktivitas → Mitra Media      | Ilustrasi kemitraan atau logo mitra yang telah diizinkan                            |
| Karya Kader → Bisnis Kader   | Logo usaha, foto produk, atau foto layanan milik kader                              |
| Karya Kader → Prestasi Kader | Foto penghargaan, sertifikat yang boleh dipublikasikan, atau dokumentasi pencapaian |

### 9.5.2 Aturan visual aset pada navigasi

- Setiap menu utama harus memiliki satu pemetaan aset pada daftar aset proyek.
- Menu yang memiliki submenu wajib menampilkan satu aset unggulan pada panel menu turun dan ikon atau gambar pendamping yang sesuai untuk setiap submenu.
- Menu yang langsung menuju halaman tanpa submenu menggunakan aset terkait pada bagian pembuka halaman tujuannya.
- Bilah navigasi utama tidak boleh dipenuhi gambar kecil yang membuat menu sulit dibaca.
- Aset pada panel menu harus membantu pengguna mengenali isi menu, bukan hanya menjadi hiasan.
- Jangan menampilkan aset kabinet aktif pada arsip kabinet lain.
- Jangan menampilkan foto, logo usaha, atau prestasi yang belum memiliki izin publikasi.
- Jika aset belum tersedia, catat sebagai aset yang belum tersedia dan gunakan pengganti sementara yang terarah. Jangan mengarang nama berkas atau mengambil foto acak.

Nama menu: 1. Beranda 2. Tentang Kami 3. Organisasi - Kabinet - Bidang - Kompartemen - Program Kerja 4. Aktivitas - Agenda & Tiket - Berita & Artikel - Mitra Media 5. Karya Kader - Bisnis Kader - Prestasi Kader 6. Kotak Suara

Jangan mengganti nama menu atau menghilangkan submenu hanya demi komposisi desain.

## 9.6 Keadaan bilah navigasi

| Keadaan              | Tampilan                                                       |
|----------------------|----------------------------------------------------------------|
| Awal halaman         | Kapsul kaca putih, garis tepi tipis, bayangan lembut           |
| Setelah digulir      | Latar lebih pekat, efek kabur dan bayangan sedikit meningkat   |
| Menu aktif           | Garis bawah Burgundy atau bidang Burgundy lembut yang bergeser |
| Saat disorot         | Teks Burgundy lebih tegas, latar merah muda sangat lembut      |
| Menu turun terbuka   | Pemicu terlihat aktif, tanda panah berputar                    |
| Fokus papan ketik    | Garis fokus terlihat jelas                                     |
| Menu telepon terbuka | Panel samping atau panel menu dengan latar penutup lembut      |

## 9.7 Tombol tindakan

- Pencarian: tombol ikon dengan nama aksesibel “Cari”.
- Masuk: tombol sekunder dengan latar putih atau gading.
- Gabung HIPMI: tombol utama Burgundy, tulisan putih, dan ikon panah.
- Jangan menambahkan tombol bahasa atau tombol lain jika tidak ada dalam PRD/keputusan produk.

## 9.8 Menu turun dan panel menu bergambar

Menu turun bukan panel tulisan polos. Gunakan susunan visual yang memiliki tempat khusus untuk aset.

**Susunan panel menu:** - Kolom kiri: aset unggulan, kategori, judul serif, keterangan singkat, dan tautan tindakan. - Kolom tengah: daftar submenu dengan ikon atau gambar pendamping, judul, keterangan singkat, dan tanda panah. - Kolom kanan jika diperlukan: kartu visual unggulan atau informasi terkait. - Latar: putih hangat dengan efek kaca yang ringan. - Sudut: 24–30 px. - Garis tepi: netral lembut. - Bayangan: mengambang dan lembut. - Saat dibuka: memudar, bergerak naik 8–14 px, dan membesar sangat sedikit. - Saat ditutup: memudar dan bergerak 4–8 px. - Komputer: dapat dibuka dengan klik dan papan ketik; sorotan penunjuk hanya sebagai bantuan tambahan. - Telepon: gunakan panel atau daftar buka-tutup, bukan tindakan sorot penunjuk.

Jika aset belum tersedia, tampilkan tempat gambar pengganti yang sudah dirancang, bukan gambar acak.

## 9.9 Navigasi pada telepon

- Logo tetap terbaca.
- Pencarian dapat menjadi tombol ikon atau item di panel navigasi sesuai ruang.
- Tombol menu berubah menjadi tanda tutup dengan gerakan halus.
- Panel navigasi memuat semua menu dan submenu.
- Tombol Masuk/Daftar atau Profil tetap tersedia sesuai keadaan akun.
- Gulir halaman di belakang panel dikunci saat panel terbuka.
- Tombol Escape menutup panel pada perangkat yang memiliki papan ketik.
- Fokus dikembalikan ke tombol pembuka setelah panel ditutup.
- Semua item dapat diakses tanpa mengandalkan sorotan penunjuk.

------------------------------------------------------------------------

# 10. DASHBOARD VISUAL SYSTEM

## 10.1 Prinsip dashboard

Dashboard harus **rapi, data-first, mudah dipindai, dan terasa premium**. Jangan membuat dashboard seperti landing page yang terlalu dekoratif.

Setiap role mengikuti sidebar, menu, data, dan permission dari PRD. Dokumen ini hanya mengatur tampilan visual shell dan komponen dashboard.

## 10.2 Dashboard shell

Struktur umum:

``` text
┌───────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR DARK WINE │ TOPBAR: Search | Notification | Profile               │
│                   ├───────────────────────────────────────────────────────┤
│ Logo/Brand        │ Breadcrumb / Page title                               │
│                   │                                                       │
│ Role menu         │ Welcome / Page intro                                  │
│                   │                                                       │
│ Sliding active    │ Quick tabs / Context switcher                         │
│ indicator         │                                                       │
│                   │ Stats cards                                           │
│                   │                                                       │
│                   │ Activity / Agenda / Main data panel                   │
│                   │                                                       │
│                   │ Tables / forms / details                              │
└───────────────────────────────────────────────────────────────────────────┘
```

## 10.3 Sidebar

- Background utama Dark Wine `#3D0F16` atau Burgundy `#5A1722`.
- Logo ARTHAKARSA/HIPMI sesuai konteks area dan asset rule.
- Teks menu White/Ivory.
- Icon Lucide dengan stroke konsisten.
- Selected item menggunakan sliding pill/soft Burgundy surface.
- Hover menggunakan surface putih dengan opacity rendah.
- Group menu dipisahkan dengan divider tipis.
- Footer sidebar dapat memuat cabinet label atau versi sistem jika dibutuhkan.
- Decorative line art hanya di area bawah/sudut sidebar dan tidak mengganggu menu.
- Sidebar collapse/expand tidak boleh mengubah permission.
- Label menu tetap dapat diketahui saat collapsed melalui tooltip yang aksesibel.

## 10.4 Topbar

- White/Glass surface.
- Search field dengan radius pill/rounded.
- Notification bell dengan unread indicator.
- User avatar, nama, role, dropdown profile.
- Workspace switcher bila role memiliki lebih dari satu konteks.
- Breadcrumb/page title berada pada content area bila topbar sudah padat.
- Topbar tidak memuat seluruh menu sidebar sekali lagi.

## 10.5 Dashboard welcome/header

- Eyebrow kecil Poppins uppercase.
- Headline dapat menggunakan ARTHAKARSA Serif Display hanya pada greeting atau heading utama yang tidak terlalu panjang.
- Deskripsi Poppins.
- Background ivory/white dengan line art halus di salah satu sisi.
- Foto/illustration hanya jika relevan dan tersedia.
- Jangan menggunakan hero setinggi landing page pada dashboard operasional.

## 10.6 Statistic cards

- 3–4 kolom desktop sesuai ruang.
- 2 kolom tablet.
- 1–2 kolom mobile.
- Label dan nilai terlihat jelas.
- Icon tile boleh memiliki background blush/gold.
- Variasi bentuk boleh digunakan dalam satu kelompok, tetapi tinggi dan baseline harus konsisten.
- Angka memakai Poppins semibold/bold atau serif display hanya untuk highlight editorial.
- Perubahan/trend hanya ditampilkan jika ada data pembanding.
- Jangan menggunakan dummy statistic seolah angka real.

## 10.7 Activity panel

- Timeline vertikal dengan connector line.
- Icon tile kecil.
- Title + timestamp + category.
- Link “Lihat Semua” jika route tersedia.
- State kosong menggunakan empty illustration ringan.
- Activity item dapat membuka detail jika memang interaktif di PRD.

## 10.8 Upcoming agenda panel

- Date tile.
- Agenda title.
- Location/time.
- Status.
- Bookmark/quick action hanya jika ditetapkan di PRD.
- Panel tidak boleh mengasumsikan agenda Published jika fixture belum berstatus Published.

## 10.9 Dashboard page patterns

| Pattern          | Struktur                                                            |
|:-----------------|:--------------------------------------------------------------------|
| Overview         | Greeting, stats, activity, upcoming agenda                          |
| Management list  | Page header, filters, summary, table/list                           |
| Detail           | Breadcrumb, title/status, key info, tabs, activity/history          |
| Create/Edit form | Header, grouped fields, helper text, actions                        |
| Approval queue   | Summary, filter, list/table, detail drawer, decision actions        |
| Workspace        | Workspace header, context switcher, roster/task/progress/documents  |
| Report           | Date filter, metrics, chart, data table, export action if available |

## 10.10 Jangan dilakukan pada dashboard

- Hero image besar tanpa fungsi.
- Banyak floating cards yang menutupi data.
- Glass pada semua tabel.
- Animasi angka yang mengganggu.
- Statistik yang tidak memiliki sumber.
- Sidebar dengan menu yang tidak sesuai role.
- Warna berbeda untuk setiap role tanpa dasar identitas.
- Menyembunyikan permission hanya dengan opacity/disabled.

------------------------------------------------------------------------

# 11. SLIDING TAB & NAVIGATION MOTION

## 11.1 Tujuan

Tab harus terasa **menggelinding/bergeser ke samping** ketika pengguna berpindah pilihan. Indicator tidak muncul tiba-tiba; ia berpindah dari item sebelumnya ke item aktif.

## 11.2 Variants

| Variant          | Bentuk                        | Penggunaan                         |
|:-----------------|:------------------------------|:-----------------------------------|
| `tab-underline`  | Garis bawah bergerak          | Public subnav, tab ringan          |
| `tab-pill`       | Background pill bergerak      | Dashboard section tabs             |
| `tab-segmented`  | Segmented surface             | Pilihan mode yang saling eksklusif |
| `tab-scrollable` | Horizontal scroll + indicator | Tab banyak di mobile               |

## 11.3 Motion baseline

- Duration: 260–360 ms.
- Easing: ease-out halus; tidak memakai overshoot besar.
- Indicator mengikuti ukuran item aktif.
- Active state berasal dari route/tab state, bukan hover.
- `layoutId` harus unik per kelompok tab.
- Tab yang dipilih di mobile harus otomatis digeser ke area terlihat.
- Perpindahan konten dapat memakai fade 120–180 ms.
- Jangan menumpuk panel lama dan panel baru sehingga data dua tab terlihat bersamaan.

## 11.4 Interaction rules

- Klik tab mengganti panel/route sesuai PRD.
- Keyboard ArrowLeft/ArrowRight untuk navigasi tab sesuai semantics.
- Enter/Space memilih tab.
- Focus-visible tetap jelas.
- Jika tab berfungsi sebagai route, gunakan link.
- Jika tab mengubah panel lokal, gunakan tab semantics.
- Deep link/refresh harus mengembalikan selected state yang benar bila tab tersebut disinkronkan dengan URL.

## 11.5 Reduced motion

Jika `prefers-reduced-motion: reduce`: - hilangkan slide panjang; - gunakan perubahan state langsung atau fade sangat singkat; - jangan menghilangkan selected indicator; - seluruh fungsi tetap tersedia.

------------------------------------------------------------------------

# 12. DROPDOWN, POPOVER, MEGA MENU & ASSET SLOTS

## 12.1 Dropdown standard

- Background White/Glass.
- Radius 14–20 px.
- Border soft.
- Shadow floating.
- Item height minimal 44 px.
- Icon 18–20 px.
- Active item memiliki background blush/soft Burgundy.
- Chevron berputar 180°.
- Escape menutup panel.
- Klik luar menutup panel jika tidak mengganggu interaksi.
- Tidak boleh keluar viewport.

## 12.2 Mega dropdown

Mega dropdown dapat memiliki: - featured illustration/photo di kiri; - kategori/eyebrow; - heading serif; - deskripsi pendek; - daftar submenu; - icon tile; - featured CTA card di kanan.

## 12.3 Tempat aset visual

Gunakan tempat aset visual untuk: - ilustrasi setiap kelompok menu utama dan submenu; - ilustrasi program dan Program Kerja; - foto utama atau foto unggulan; - poster kegiatan; - logo kabinet dan logo mitra yang diizinkan; - gambar produk dan usaha kader; - dokumentasi prestasi; - ilustrasi halaman tidak ditemukan dan halaman kesalahan; - ilustrasi keadaan kosong per kelompok data.

Setiap tempat aset harus memiliki: - kunci aset yang jelas; - nama berkas dan alamat berkas aktual setelah diverifikasi; - rasio gambar; - cara penyesuaian gambar; - latar pengganti; - teks alternatif dalam Bahasa Indonesia; - sumber dan status izin penggunaan; - ukuran yang konsisten; - aturan pengganti jika gambar gagal dimuat.

Jangan menulis alamat berkas berdasarkan tebakan. Kunci aset boleh memakai nama fungsi, tetapi alamat berkas wajib diambil dari hasil pemeriksaan folder aset.

## 12.4 Dropdown state

| State    | Perilaku                                      |
|:---------|:----------------------------------------------|
| Closed   | Trigger terlihat                              |
| Open     | Panel muncul dan trigger active               |
| Hover    | Item mendapat soft surface                    |
| Focus    | Focus ring                                    |
| Selected | Item aktif berdasarkan route                  |
| Loading  | Skeleton hanya jika benar-benar menunggu data |
| Empty    | Empty text/asset jika tidak ada submenu data  |

------------------------------------------------------------------------

# 13. BUTTON, CTA & INTERACTIVE STATES

## 13.1 Button variants

| Variant         | Tampilan                                          | Penggunaan                 |
|:----------------|:--------------------------------------------------|:---------------------------|
| Primary         | Burgundy, White text                              | Aksi utama                 |
| Primary Hover   | Burgundy lebih terang + lift                      | Hover                      |
| Secondary       | Ivory/White + Burgundy border                     | Aksi alternatif            |
| Tertiary/Ghost  | Transparan/soft surface                           | Aksi ringan                |
| Outline         | Border Burgundy                                   | Link/CTA alternatif        |
| Gold Accent     | Gold surface dengan teks gelap yang lolos kontras | Highlight khusus           |
| Destructive     | Semantic error                                    | Hapus/tolak/tutup sensitif |
| Icon Button     | Icon-only dengan aria-label                       | Search/close/menu          |
| Public CTA Pill | Radius full, arrow icon                           | CTA publik                 |
| Loading         | Spinner/progress + label                          | Submit/action              |

## 13.2 Sizing

- Small: 36–40 px.
- Medium: 44–48 px.
- Large: 50–56 px.
- Icon target di mobile: minimal 44×44 px bila memungkinkan.
- Public CTA pill: 46–54 px.
- Input height: 44–50 px.

## 13.3 Hover and pressed

- Hover: lift 1–2 px, shadow lembut, warna sedikit berubah.
- Pressed: scale sekitar 0.98 atau shadow lebih rendah.
- Arrow icon: translateX 2–4 px.
- Tidak ada bounce besar.
- Jangan mengubah layout width/height pada hover.

## 13.4 Loading and success

- Loading harus mempertahankan ukuran button.
- Spinner kecil menggunakan stroke Burgundy/White sesuai surface.
- Tidak boleh mengklaim proses berhasil sebelum simulasi/aksi selesai.
- Error menampilkan pesan yang dapat dimengerti.
- Success memakai toast/status label dan tidak hanya flash warna.

------------------------------------------------------------------------

# 14. FORMS, INPUTS, TABLES & DATA-DENSE UI

## 14.1 Forms

Form harus menggunakan surface solid agar field mudah dibaca.

**Teknologi:** React Hook Form + Zod + `@hookform/resolvers`.

- React Hook Form mengelola nilai, status, dan interaksi formulir.

- Zod mendefinisikan skema dan aturan validasi.

- Gunakan resolver Zod agar aturan validasi dan tipe formulir konsisten.

- Pesan kesalahan dan bantuan wajib menggunakan Bahasa Indonesia.

- Pengiriman pada tahap ini hanya simulasi lokal; tidak boleh mengaku tersimpan ke server.

- Label selalu terlihat.

- Placeholder bukan pengganti label.

- Helper text berada dekat field.

- Error message langsung di bawah field.

- Required marker konsisten.

- Grouping field menggunakan heading Poppins.

- Form panjang dibagi section/step bila PRD memang menetapkan.

- Button action memiliki hirarki jelas.

- Focus ring konsisten.

- Pada mobile, keyboard tidak menutupi tombol submit.

## 14.2 Inputs

- White surface.
- Border `#E9E1DC`.
- Radius 10–14 px.
- Height 44–50 px.
- Focus border Burgundy + ring.
- Error border semantic red + message.
- Disabled surface neutral.
- Search field boleh radius pill.
- Date/time/select mengikuti komponen yang konsisten.

## 14.3 Tables

**Teknologi:** TanStack Table (`@tanstack/react-table`) untuk tabel yang memerlukan pengurutan, penyaringan, halaman data, pemilihan baris, atau pengaturan kolom. Tabel sederhana boleh menggunakan elemen tabel HTML biasa.

**Table tidak menggunakan glass.**

- Header White/Neutral Surface.
- Body White.
- Border horizontal soft.
- Text Poppins 13–15 px.
- Row height 52–64 px sesuai kepadatan.
- Sticky header jika tabel panjang.
- Hover row sangat lembut.
- Status badge disertai teks.
- Action menu tidak memotong viewport.
- Mobile dapat berubah menjadi card list atau horizontal scroll dengan label jelas.
- Kolom sensitif tetap mengikuti permission PRD.

## 14.4 Data visualization

**Teknologi:** Recharts (`recharts`) untuk grafik dua dimensi. TanStack Table tetap digunakan untuk rincian data berbentuk tabel.

- Warna chart memakai Burgundy, Dark Wine, Gold, Copper, Mauve, dan semantic colors.
- Jangan menggunakan palet default library tanpa token.
- Selalu sertakan label/legend.
- Tooltip menggunakan solid/glass ringan dengan kontras.
- Chart harus memiliki alternatif data tabel atau ringkasan teks.
- Tidak menggunakan animasi yang mengaburkan pembacaan nilai.

------------------------------------------------------------------------

# 15. PENGALAMAN PEMUATAN — LOGO ARTHAKARSA DI TENGAH

## 15.1 Tujuan

Layar pemuatan harus menjadi pengalaman merek yang berkesan, tetapi tidak boleh membuat pengguna menunggu lebih lama dari proses sebenarnya. Semua tulisan pada layar pemuatan wajib menggunakan Bahasa Indonesia.

## 15.2 Susunan visual

- Memenuhi layar.
- Latar putih hangat atau Dark Wine sesuai konteks pemuatan.
- Garis kontur emas dan tembaga di bagian luar.
- Logo ARTHAKARSA asli di tengah.
- Nama ARTHAKARSA di bawah logo bila sesuai kebutuhan.
- Tulisan status seperti “Sedang menyiapkan halaman…” atau pesan Bahasa Indonesia yang sesuai.
- Indikator pemuatan berupa lingkaran gerak yang mengitari area logo atau garis kemajuan di bawah.
- Jangan menggunakan logo HIPMI sebagai pengganti logo kabinet pada pemuatan bermerek kabinet.

## 15.3 Gerakan

1.  Cahaya latar muncul perlahan.
2.  Logo memudar masuk dan membesar dari 0,96 menjadi 1.
3.  Garis orbit bergerak perlahan.
4.  Kilau emas bergerak di sepanjang lingkaran.
5.  Tulisan status muncul setelah logo.
6.  Garis kemajuan hanya menunjukkan nilai nyata jika tersedia. Jika tidak, gunakan indikator bergerak tanpa angka.

## 15.4 Durasi dan perilaku

- Kemunculan awal: 350–600 milidetik.
- Gerakan orbit: 2,4–4 detik per putaran jika bergerak terus-menerus.
- Kemunculan tulisan: 250–400 milidetik.
- Jangan menambahkan waktu tunggu palsu.
- Jangan menutupi halaman setelah konten siap.
- Gunakan tampilan kerangka untuk pemuatan bagian yang singkat.
- Jika pengguna mengurangi gerakan, logo tetap diam dan lingkaran berubah menjadi indikator sederhana.

## 15.5 Jenis pemuatan

| Jenis                    | Penggunaan                                                                     |
|--------------------------|--------------------------------------------------------------------------------|
| Pemuatan layar penuh     | Pembukaan aplikasi atau perpindahan besar yang benar-benar memerlukan pemuatan |
| Pemuatan lapisan halaman | Perubahan bagian yang membutuhkan penguncian sementara                         |
| Pemuatan tombol          | Pengiriman formulir atau tindakan                                              |
| Tampilan kerangka        | Kartu, daftar, dan tabel yang sedang dimuat                                    |
| Pemuatan bagian          | Panel data tertentu                                                            |

------------------------------------------------------------------------

# 16. HALAMAN TIDAK DITEMUKAN, HALAMAN TANPA IZIN, KESALAHAN, DAN KEADAAN KOSONG

## 16.1 Arah visual

Semua halaman khusus ini harus tetap menjadi bagian dari identitas ARTHAKARSA: - latar putih, putih hangat, atau warna lembut sesuai konteks; - judul besar menggunakan huruf serif ARTHAKARSA; - isi menggunakan Poppins; - ilustrasi aset yang sesuai dengan jenis keadaan; - garis kontur yang lembut; - tombol tindakan yang jelas; - seluruh tulisan menggunakan Bahasa Indonesia; - jangan menampilkan pesan teknis, alamat berkas, atau rincian kesalahan internal.

## 16.2 Halaman tidak ditemukan

- Kode `404` boleh ditampilkan sebagai kode teknis, tetapi judul dan seluruh penjelasan harus berbahasa Indonesia.
- Judul: “Halaman Tidak Ditemukan”.
- Penjelasan: “Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.”
- Aset utama: ilustrasi arah, jalan, penunjuk, atau perjalanan yang tidak menemukan tujuan.
- Tombol utama: “Kembali ke Beranda”.
- Tombol tambahan hanya ditampilkan jika tujuan tersebut benar-benar tersedia.
- Latar putih hangat dengan garis kontur di sudut.
- Ilustrasi harus menjadi aset khusus halaman tidak ditemukan, bukan foto profil atau logo yang dimodifikasi.

## 16.3 Halaman akses tidak diizinkan

- Kode `403` boleh menjadi penanda teknis kecil.
- Judul: “Akses Tidak Diizinkan”.
- Penjelasan: “Akun Anda tidak memiliki izin untuk membuka halaman ini.”
- Aset utama: ilustrasi perisai, kunci, atau pintu tertutup.
- Tombol: “Kembali”.
- Tombol pengajuan akses hanya jika proses tersebut memang tersedia dalam PRD.
- Jangan membocorkan nama halaman, data, atau tindakan yang tidak boleh diketahui pengguna.

## 16.4 Halaman gangguan sistem

- Kode `500` boleh menjadi penanda teknis kecil.
- Judul: “Terjadi Gangguan pada Sistem”.
- Penjelasan: “Kami belum dapat memuat halaman ini. Silakan coba kembali beberapa saat lagi.”
- Aset utama: ilustrasi sambungan terputus, bagian sistem yang tidak tersambung, atau gangguan teknis.
- Tombol utama: “Coba Lagi”.
- Tombol tambahan: “Kembali ke Beranda”.
- Jangan menampilkan jejak kesalahan, nama tabel, nama layanan, atau pesan pemrograman.

## 16.5 Halaman layanan sedang tidak tersedia

- Judul: “Layanan Sementara Tidak Tersedia”.
- Penjelasan: “Layanan sedang diperiksa. Silakan kembali beberapa saat lagi.”
- Aset utama: ilustrasi pemeliharaan, perkakas, atau perbaikan.
- Tombol: “Kembali ke Beranda” jika sesuai.
- Jangan menampilkan perkiraan waktu selesai jika belum ada informasi yang pasti.

## 16.6 Gangguan jaringan

- Judul: “Koneksi Terputus”.
- Penjelasan: “Periksa sambungan internet Anda, lalu coba kembali.”
- Aset utama: ilustrasi perangkat atau sambungan jaringan yang terputus.
- Tombol: “Coba Lagi”.
- Jangan menyatakan data telah tersimpan jika penyimpanan belum berhasil.

## 16.7 Keadaan kosong per kelompok data

Setiap kelompok data memiliki ilustrasi atau aset pendukung yang sesuai:

| Keadaan                | Aset yang dicari                 | Judul Bahasa Indonesia  |
|------------------------|----------------------------------|-------------------------|
| Agenda kosong          | Kalender atau ilustrasi kegiatan | Belum Ada Agenda        |
| Surat kosong           | Dokumen atau amplop              | Belum Ada Surat         |
| Transaksi kosong       | Bukti transaksi atau dompet      | Belum Ada Transaksi     |
| Program Kerja kosong   | Folder atau ilustrasi program    | Belum Ada Program Kerja |
| Prestasi kosong        | Piala atau medali                | Belum Ada Prestasi      |
| Bisnis kader kosong    | Toko atau produk                 | Belum Ada Bisnis Kader  |
| Pemberitahuan kosong   | Lonceng atau pesan               | Belum Ada Pemberitahuan |
| Hasil pencarian kosong | Kaca pembesar                    | Data Tidak Ditemukan    |
| Anggota kosong         | Kelompok orang                   | Belum Ada Anggota       |
| Dokumen kosong         | Berkas                           | Belum Ada Dokumen       |

Keadaan kosong memuat: 1. ilustrasi atau ikon; 2. judul; 3. penjelasan singkat; 4. tombol tindakan hanya jika pengguna memiliki izin; 5. penjelasan bahwa data memang belum tersedia, bukan pesan kesalahan.

## 16.8 Aturan aset halaman tidak ditemukan dan kesalahan

Aset berikut wajib dicari di folder aset proyek dan dicatat dalam daftar aset:

| Kunci fungsi aset                | Halaman                          | Ciri ilustrasi                                          |
|----------------------------------|----------------------------------|---------------------------------------------------------|
| `illustration-not-found`         | Halaman tidak ditemukan          | Arah, jalan, penunjuk, atau tujuan yang tidak ditemukan |
| `illustration-no-access`         | Akses tidak diizinkan            | Perisai, kunci, atau pintu tertutup                     |
| `illustration-system-error`      | Gangguan sistem                  | Sambungan atau susunan sistem yang terganggu            |
| `illustration-maintenance`       | Layanan sementara tidak tersedia | Perkakas atau perbaikan                                 |
| `illustration-offline`           | Gangguan jaringan                | Sambungan jaringan terputus                             |
| `illustration-empty-calendar`    | Agenda kosong                    | Kalender                                                |
| `illustration-empty-document`    | Dokumen kosong                   | Dokumen                                                 |
| `illustration-empty-transaction` | Transaksi kosong                 | Bukti transaksi                                         |
| `illustration-empty-members`     | Anggota kosong                   | Kelompok orang                                          |
| `illustration-empty-achievement` | Prestasi kosong                  | Piala atau medali                                       |
| `illustration-empty-business`    | Bisnis kader kosong              | Toko atau produk                                        |
| `illustration-empty-search`      | Hasil pencarian kosong           | Kaca pembesar                                           |

Nama di tabel adalah **kunci fungsi**, bukan alamat berkas. AI Agent harus memeriksa nama berkas sebenarnya sebelum menggunakannya.

- Gunakan aset ilustrasi dari folder proyek jika tersedia.
- Jangan mengarang alamat berkas.
- Jangan memakai satu ilustrasi untuk semua jenis kesalahan jika maknanya berbeda.
- Jika aset khusus belum tersedia, gunakan susunan ikon Lucide dan garis dekoratif sebagai pengganti sementara yang konsisten; catat aset yang belum tersedia.
- Jangan mengganti ilustrasi kesalahan dengan `siluet.png`. Berkas tersebut hanya untuk foto profil manusia.
- Semua teks alternatif ilustrasi harus berbahasa Indonesia.
- Pastikan ilustrasi tidak mengandung tulisan Inggris yang tertanam di dalam gambar. Jika aset memiliki tulisan asing, gunakan versi tanpa tulisan atau buat lapisan teks antarmuka berbahasa Indonesia di luar gambar.

------------------------------------------------------------------------

# 17. PUBLIC WEBSITE PAGE VISUAL PATTERNS

Struktur dan isi setiap halaman tetap mengikuti PRD. Bagian ini menentukan pola visual yang digunakan.

## 17.1 Beranda

**Karakter:** paling editorial, paling kaya visual, tetapi tetap terkontrol.

Ritme yang direkomendasikan:

1.  **Floating public navbar** — capsule white/glass, logo HIPMI + wordmark Telkom, menu center, action kanan.
2.  **Hero Aurora** — Warm Ivory/Blush gradient lembut, headline serif besar, copy ringkas, CTA Burgundy, hero photo di kanan, floating glass callout.
3.  **Contour/ribbon divider** — satu flowing line sebagai transisi.
4.  **Value proposition** — heading serif di kiri, 3 value items di kanan, icon tiles.
5.  **Program highlights** — large glass block dengan feature text dan 2–3 program cards.
6.  **Impact/statistics** — panel angled/dark Burgundy di satu sisi dan metric cards di sisi lain.
7.  **Editorial insights** — headline serif, image-led article card, metadata.
8.  **Footer** — Dark Wine, identity, navigation, contact resmi, gold contour.

Hero: - jangan memakai data foto yang belum tersedia; - jangan mengarang angka statistik; - floating cards harus punya informasi yang relevan; - line orbit tidak menutupi foto/teks; - CTA menuju route yang ada di PRD.

## 17.2 Tentang Kami

- Section intro putih/ivory dengan heading serif.
- Narasi organisasi menggunakan Poppins.
- Foto kegiatan/organisasi dalam editorial split.
- Values/mission menggunakan icon tiles atau connected card.
- Sejarah/timeline menggunakan connected lines.
- Jangan mengubah isi resmi atau membuat sejarah fiktif.

## 17.3 Organisasi

- Heading serif untuk judul section.
- Organization chart menggunakan connected lines.
- Struktur Bidang–Kompartemen terlihat jelas.
- Card pimpinan menggunakan foto/aset resmi.
- Carousel pengurus dapat memakai image-led cards.
- Mobile menggunakan tree/accordion vertikal.
- Jangan mengubah struktur jabatan/relasi.

## 17.4 Aktivitas

- Page header dengan heading serif dan deskripsi Poppins.
- Filter dan tabs menggunakan sliding indicator.
- Agenda menggunakan event cards dengan poster/tanggal/status.
- Berita & Artikel menggunakan editorial cards.
- Mitra Media menggunakan form/data-first surface.
- Bukti pembayaran dan data peserta tetap solid/terbaca, tidak memakai glass yang mengganggu.

## 17.5 Karya Kader

- Bisnis Kader menggunakan business cards/gallery.
- Prestasi Kader menggunakan achievement cards.
- Foto harus relevan dengan bisnis/prestasi yang benar.
- Filter kategori dapat memakai tab/segmented control.
- Statistik hanya dari data valid.
- Gunakan satu featured card, bukan semua card berukuran besar.

## 17.6 Kotak Suara

- Desain tenang, privat, dan tidak seperti halaman promosi.
- Form solid White.
- Instruksi jelas.
- Status pengajuan menggunakan badge + teks.
- Line art hanya sangat ringan di background.
- Tidak menampilkan identitas/isi aspirasi yang harus privat.

------------------------------------------------------------------------

# 18. PERSONAL AREA VISUAL PATTERNS

## 18.1 Prinsip

Personal Area harus terasa lebih sederhana daripada public website dan dashboard pengurus. Fokusnya adalah kebutuhan pengguna terhadap akun, profil, keanggotaan, aktivitas, notifikasi, dan pengaturan.

## 18.2 Layout

- Topbar sederhana.
- Sidebar/personal navigation mengikuti PRD.
- Profile header dengan avatar.
- Section content memakai White/Ivory.
- Tabs bergerak horizontal.
- Card radius 18–24 px.
- Form solid.
- Empty states sesuai domain.
- Jangan memakai hero dekoratif besar pada setiap halaman personal.

## 18.3 Profile card

- Foto 1:1.
- Nama.
- Status/role sesuai izin.
- Informasi profil yang memang boleh dilihat pemilik.
- Edit action sesuai permission.
- Fallback foto menggunakan `siluet.png` jika tersedia.

## 18.4 Membership and activity

- Status keanggotaan memakai badge dan label.
- Aktivitas menggunakan timeline.
- Daftar proker/agenda menggunakan card compact.
- Detail sensitif tidak boleh muncul hanya karena tersedia di dummy fixture; tampilkan sesuai permission PRD.

------------------------------------------------------------------------

# 19. ORGANIZATION MANAGEMENT VISUAL PATTERNS

## 19.1 Prinsip

Management area memiliki informasi yang lebih padat. Visual harus tegas, konsisten, dan berorientasi tindakan.

## 19.2 Shared dashboard shell

- Sidebar dark wine.
- Topbar glass/white.
- Page header dengan breadcrumb.
- Context/scope selector bila dibutuhkan.
- Summary cards.
- Data list/table.
- Detail drawer/modal bila sesuai.
- Tabs sliding indicator.
- Activity/history panel.

## 19.3 Role-aware navigation

Sidebar item, urutan, submenu, active state, dan visibility harus berasal dari konfigurasi role/permission PRD. `design.md` tidak membuat daftar menu role baru.

## 19.4 Approval queue

- Queue list menggunakan solid table/card.
- Status badge jelas.
- Detail dapat muncul di side panel/drawer.
- Action approval/destructive dipisahkan.
- Konfirmasi harus jelas.
- Tidak menggunakan gold sebagai teks kecil.
- Loading/error/empty state tersedia.

## 19.5 Calendar and scheduling

- Calendar surface solid.
- Event card memiliki status.
- Today/selected/disabled date dibedakan.
- Filter dan view switch memakai sliding/segmented control.
- Kalender mobile dapat berubah menjadi agenda list.
- Tidak menggunakan glass pada seluruh grid kalender.

------------------------------------------------------------------------

# 20. WORKSPACE VISUAL PATTERNS

## 20.1 Tiga konteks Workspace

PRD menetapkan tiga konteks: - Workspace Bidang; - Workspace Kompartemen; - Workspace Proker.

Ketiganya menggunakan sistem visual yang sama dengan konteks/isi yang mengikuti data dan permission PRD. Jangan menciptakan shell berbeda yang mengubah business flow.

## 20.2 Workspace header

- Nama workspace.
- Jenis/konteks workspace.
- Breadcrumb.
- Status.
- Context switcher.
- Action sesuai permission.
- Background line art ringan pada area header saja.

## 20.3 Workspace switcher

- Dropdown/command menu.
- Menampilkan pilihan workspace yang benar-benar tersedia untuk akun demo.
- Selected workspace memakai Burgundy pill/indicator.
- Transisi pergantian workspace menggunakan slide/fade halus.
- Tidak menampilkan workspace yang tidak memiliki akses.
- Deep link dan refresh harus menjaga konteks yang benar.

## 20.4 Roster and members

- Avatar, nama, jabatan/tugas sesuai data yang boleh dilihat.
- Card/list solid.
- Filter dan search.
- Jangan menampilkan seluruh roster kepada role yang hanya boleh melihat record dirinya.
- `siluet.png` sebagai fallback avatar.

## 20.5 Task/progress/document panels

- Gunakan card/table yang rapi.
- Status jelas.
- Progress hanya menampilkan nilai yang memang didefinisikan PRD.
- Jangan menambah PIC individual pada Task Board jika business rule melarangnya.
- Dokumen memakai file card dengan nama, tanggal, versi/status, dan action sesuai permission.
- Activity history menggunakan timeline.

------------------------------------------------------------------------

# 21. ADMIN PANEL VISUAL PATTERNS

## 21.1 Prinsip

Admin Panel mengutamakan kontrol, struktur, dan kejelasan. Visual premium tidak boleh mengurangi presisi pengelolaan data.

## 21.2 Layout

- Sidebar dark wine yang lebih compact.
- Topbar dengan search/notification/profile.
- Breadcrumb dan page title.
- Data table solid.
- Form section terkelompok.
- Role/permission matrix menggunakan grid yang dapat discan.
- Modal konfirmasi untuk tindakan berisiko.
- Audit/activity history menggunakan timeline.

## 21.3 Permission matrix

- Gunakan kolom dan row yang konsisten.
- Tampilkan role/permission label.
- Status on/off harus memiliki label atau icon.
- Jangan mengandalkan warna saja.
- Perubahan permission harus memiliki konfirmasi.
- Layout mobile berubah menjadi grouped permission cards atau horizontal scroll dengan label yang tetap terlihat.

## 21.4 Cabinet Center

- Cabinet card memakai logo/brand kabinet sesuai data.
- Periode dan status terlihat jelas.
- Current cabinet dapat diberi highlight Burgundy.
- Arsip kabinet mempertahankan identitas historis masing-masing.
- Jangan mengganti logo/foto kabinet lama menjadi ARTHAKARSA.

------------------------------------------------------------------------

# 22. MOTION SYSTEM — MOTION FOR REACT

## 22.1 Prinsip motion

Gunakan satu motion system terpusat. Untuk implementasi baru, gunakan paket `motion` dengan API React dari `motion/react`. Jika repository sudah menggunakan `framer-motion`, pertahankan paket yang tersedia sampai ada keputusan migrasi. Jangan memasang dua engine animasi yang mengontrol properti yang sama.

## 22.2 Motion tokens

| Token             | Duration baseline | Penggunaan                     |
|:------------------|------------------:|:-------------------------------|
| `motion-instant`  |        100–140 ms | Press/feedback cepat           |
| `motion-fast`     |        150–200 ms | Hover, icon, micro interaction |
| `motion-standard` |        220–300 ms | Dropdown, button, panel        |
| `motion-slide`    |        260–360 ms | Tabs, navbar indicator         |
| `motion-page`     |        320–450 ms | Page transition                |
| `motion-section`  |        400–600 ms | Section reveal                 |
| `motion-stagger`  |    40–80 ms delay | List/card reveal               |
| `motion-orbit`    |         2.4–4.0 s | Decorative orbit loop          |

## 22.3 Easing

Baseline easing: - `ease-out`: `cubic-bezier(0.22, 1, 0.36, 1)` - `ease-standard`: `cubic-bezier(0.2, 0.8, 0.2, 1)` - `ease-in-out`: `cubic-bezier(0.65, 0, 0.35, 1)`

Hindari overshoot berlebihan, elastic bounce, dan gerakan yang membuat elemen terlihat tidak stabil.

## 22.4 Daftar gerakan antarmuka

| Kode     | Gerakan                   | Pemicu                        | Perilaku                                                       |
|----------|---------------------------|-------------------------------|----------------------------------------------------------------|
| `MOT-01` | Penanda menu bergeser     | Alamat halaman berubah        | Garis atau bidang aktif bergerak ke menu terpilih              |
| `MOT-02` | Penanda tab bergeser      | Tab dipilih                   | Penanda bergerak mendatar                                      |
| `MOT-03` | Penanda bilah samping     | Menu area pribadi berubah     | Bidang aktif berpindah                                         |
| `MOT-04` | Menu turun muncul         | Menu dibuka                   | Memudar dan bergerak turun atau naik sedikit                   |
| `MOT-05` | Panel menu bergambar      | Panel dibuka                  | Memudar dan membesar sangat sedikit                            |
| `MOT-06` | Judul bagian muncul       | Bagian memasuki layar         | Huruf muncul bertahap dengan gerakan dari bawah                |
| `MOT-07` | Isi bagian muncul         | Bagian memasuki layar         | Paragraf memudar dan bergerak naik sedikit                     |
| `MOT-08` | Ikon bagian muncul        | Bagian memasuki layar         | Ikon membesar, memudar, atau berputar ringan                   |
| `MOT-09` | Kartu muncul bertahap     | Kelompok kartu memasuki layar | Kartu muncul satu demi satu                                    |
| `MOT-10` | Gambar utama muncul       | Halaman atau bagian dibuka    | Gambar terlihat melalui pembukaan bidang atau pembesaran halus |
| `MOT-11` | Garis tergambar           | Bagian memasuki layar         | Garis SVG tergambar mengikuti jalurnya                         |
| `MOT-12` | Pita mengalir muncul      | Bagian memasuki layar         | Pita memudar atau terbuka melalui bidang pembatas              |
| `MOT-13` | Bagian meninggalkan layar | Bagian keluar dari layar      | Tulisan, ikon, dan kartu memudar serta bergeser sedikit        |
| `MOT-14` | Perpindahan ruang kerja   | Ruang kerja berubah           | Isi memudar dan bergeser pendek                                |
| `MOT-15` | Orbit pemuatan            | Pemuatan aktif                | Lingkaran bergerak perlahan                                    |
| `MOT-16` | Pemberitahuan muncul      | Pemberitahuan diterima        | Memudar dan membesar ringan                                    |
| `MOT-17` | Jendela dialog muncul     | Dialog dibuka                 | Memudar dan membesar ringan                                    |
| `MOT-18` | Ikon tindakan             | Tindakan berhasil/gagal       | Ikon muncul dengan gerakan singkat dan jelas                   |

## 22.5 Gerakan masuk dan keluar setiap bagian

**Setiap bagian yang memiliki judul, tulisan, ikon, gambar, kartu, atau tombol wajib memiliki gerakan masuk dan gerakan keluar yang terkoordinasi.** Ketentuan ini berlaku untuk halaman publik, area pribadi, pengelolaan organisasi, ruang kerja, dan panel pengelola sistem. Tingkat gerak boleh lebih tenang pada halaman yang padat data.

### 22.5.1 Urutan gerakan ketika bagian masuk

Urutan dasar ketika bagian mulai terlihat:

1.  Hiasan garis atau bentuk latar muncul lebih dahulu dengan memudar atau tergambar.
2.  Label kecil bagian muncul dengan memudar dan bergerak naik sedikit.
3.  Judul utama muncul dengan gerakan dari bawah ke atas; judul dapat muncul per kata atau per baris.
4.  Paragraf muncul setelah judul dengan jeda singkat.
5.  Ikon atau ilustrasi muncul dengan perubahan ukuran dan tingkat kepekatan.
6.  Kartu muncul satu demi satu dengan jeda teratur.
7.  Tombol tindakan muncul terakhir agar urutan perhatian tetap jelas.

Urutan dapat disederhanakan jika bagian hanya memiliki sedikit elemen. Jangan membuat semua elemen bergerak bersamaan.

### 22.5.2 Gerakan ketika bagian keluar

Ketika bagian meninggalkan area pandang: - judul memudar dan bergeser sedikit ke arah atas atau bawah; - paragraf memudar dengan jarak gerak lebih kecil daripada judul; - ikon mengecil sangat sedikit dan memudar; - kartu memudar secara berurutan atau sebagai satu kelompok; - hiasan garis kembali memudar atau berhenti pada posisi akhir; - tombol tidak boleh bergerak jauh atau terlihat seperti sedang ditekan.

Gerakan keluar harus lebih singkat dan lebih halus daripada gerakan masuk. Jangan menggeser elemen terlalu jauh hingga tampak terlempar keluar layar.

### 22.5.3 Gerakan berbeda sesuai jenis elemen

| Elemen             | Ketika masuk                             | Ketika keluar                              |
|--------------------|------------------------------------------|--------------------------------------------|
| Label kecil bagian | Memudar + naik 6–10 px                   | Memudar + naik 3–6 px                      |
| Judul utama        | Memudar + naik 16–24 px; dapat per kata  | Memudar + bergeser 8–12 px                 |
| Paragraf           | Memudar + naik 10–16 px                  | Memudar + bergeser 5–8 px                  |
| Ikon sederhana     | Memudar + membesar dari 0,88 ke 1        | Memudar + mengecil ke 0,94                 |
| Ikon garis         | Garis tergambar atau putaran ringan      | Garis memudar atau kembali ke keadaan awal |
| Ilustrasi          | Memudar + membesar dari 0,96 ke 1        | Memudar + mengecil ke 0,98                 |
| Kartu              | Memudar + naik 14–20 px secara bertahap  | Memudar + naik/turun 6–10 px               |
| Gambar             | Bidang pembuka atau pembesaran 1,02 ke 1 | Memudar ringan; jangan mengubah rasio      |
| Tombol             | Memudar + naik 6–10 px setelah isi       | Memudar ringan tanpa gerakan besar         |
| Garis dekoratif    | Tergambar mengikuti jalur                | Memudar atau berhenti dengan halus         |

### 22.5.4 Pemicu gulir

- Gunakan pengamatan area layar untuk mengetahui kapan bagian masuk dan keluar.
- Gerakan masuk dimulai saat bagian mulai terlihat, bukan setelah seluruh bagian melewati layar.
- Gerakan keluar dimulai saat bagian benar-benar meninggalkan area pandang atau melewati ambang yang telah ditetapkan.
- Gunakan ambang yang stabil agar animasi tidak berkedip saat pengguna berhenti menggulir di batas layar.
- Gerakan dapat diputar kembali ketika pengguna kembali ke bagian tersebut, sesuai aturan pengulangan.
- Pada bagian yang sangat panjang, gunakan pemicu untuk kelompok konten, bukan satu pemicu untuk setiap baris teks.
- Jangan menyembunyikan isi sebelum mesin gerak siap. Jika skrip gagal, seluruh tulisan dan gambar harus tetap terlihat.

### 22.5.5 Aturan khusus area padat data

Pada tabel, formulir, matriks izin, dan daftar panjang: - gerakan masuk cukup berupa pemudaran dan pergeseran 4–8 px; - gerakan keluar tidak boleh membuat pengguna kehilangan konteks saat membaca; - jangan menganimasikan setiap sel tabel; - animasikan judul bagian dan panel utama saja; - data harus tetap terlihat dan dapat dipilih saat animasi berjalan.

### 22.5.6 Pengulangan gerakan

- Halaman publik dapat mengulang gerakan masuk dan keluar ketika pengguna kembali menggulir ke bagian yang sama.
- Gerakan yang terus berulang tidak boleh terjadi selama pengguna diam.
- Untuk halaman operasional, utamakan gerakan pertama kali dan transisi yang lebih singkat.
- Jangan mengulang gerakan pada setiap perubahan satu atau dua piksel posisi gulir.
- Gunakan jeda pemicu dan ambang yang stabil untuk mencegah gerakan berulang tanpa sengaja.

### 22.5.7 Durasi dan jeda

- Judul dan isi bagian: 400–700 milidetik.
- Ikon: 300–550 milidetik.
- Kartu: 350–600 milidetik.
- Gerakan keluar: 180–350 milidetik.
- Jeda antarkelompok: 50–100 milidetik.
- Gerakan hover: 150–220 milidetik.
- Semua angka merupakan nilai awal dan harus diuji pada perangkat nyata.

## 22.6 Hover motion

- Card interaktif: lift 2–4 px.
- Button: lift 1–2 px.
- Arrow: translateX 2–4 px.
- Chevron: rotate 180°.
- Image: scale maksimal 1.02–1.04 di container overflow-hidden.
- Tidak semua card harus memiliki hover.
- Tidak ada hover-only content yang menyembunyikan informasi penting.

## 22.7 Page transition

- Fade 120–180 ms.
- Slide horizontal maksimal 8–14 px jika konteks mendukung.
- Tidak boleh mengganggu browser Back/Forward.
- Tidak boleh menahan navigasi.
- Deep link/refresh harus tetap bekerja.
- Reduced-motion menghilangkan slide besar.

## 22.8 Reduced motion

Jika pengguna mengaktifkan `prefers-reduced-motion`: - nonaktifkan orbit loop dekoratif; - nonaktifkan parallax; - hilangkan stagger panjang; - ganti slide besar dengan fade/instant; - pertahankan active state; - pertahankan informasi dan feedback; - jangan menghilangkan loader/status yang dibutuhkan.

------------------------------------------------------------------------

# 23. ICONOGRAPHY & ILLUSTRATION

## 23.1 UI icons

Gunakan Lucide sebagai library ikon UI utama sesuai dependency proyek.

- 16 px: inline/metadata.
- 20 px: navbar/sidebar/button.
- 24 px: card/action utama.
- 32 px: empty state.
- Stroke 1.5–2 px.
- Icon button wajib memiliki accessible label.
- Icon status selalu didampingi teks.
- Jangan mencampur beberapa library ikon untuk fungsi standar.

## 23.2 Brand illustration

- Gunakan ilustrasi yang sesuai dengan identitas ARTHAKARSA.
- Gunakan Burgundy, Ivory, Gold, Copper, Mauve.
- Hindari ilustrasi neon/cartoon yang tidak konsisten.
- Jangan meniru logo resmi melalui ilustrasi.
- Jangan menggunakan stok orang sebagai foto kegiatan organisasi.
- Gunakan asset ilustrasi yang benar-benar tersedia.

## 23.3 Dropdown illustrations

Mega menu dapat memiliki satu visual utama: - gedung/arsitektur; - abstract growth; - networking; - program/learning; - agenda/event; - business ecosystem.

Asset dipilih berdasarkan isi submenu, bukan random.

## 23.4 Error illustrations

Gunakan ilustrasi sesuai konteks: - 404: arah/jalan/signpost. - 403: shield/lock. - 500: broken connection/system. - Empty event: calendar. - Empty document: file. - Empty member: people. - Empty achievement: award.

------------------------------------------------------------------------

## 23.5 Pemetaan aset ilustrasi untuk semua menu dan keadaan khusus

Aset berikut harus diperiksa pada folder aset dan dimasukkan ke daftar aset proyek. Pemetaan ini tidak berarti berkas dengan nama tersebut sudah tersedia.

| Kunci fungsi aset              | Menu/keadaan                 | Isi visual yang dibutuhkan                             |
|--------------------------------|------------------------------|--------------------------------------------------------|
| `menu-home-visual`             | Beranda                      | Foto utama atau dokumentasi resmi yang sesuai          |
| `menu-about-visual`            | Tentang Kami                 | Foto organisasi atau kegiatan resmi                    |
| `menu-organization-visual`     | Organisasi                   | Logo kabinet, struktur, atau foto pengurus resmi       |
| `menu-activity-visual`         | Aktivitas                    | Poster agenda atau sampul berita                       |
| `menu-karya-kader-visual`      | Karya Kader                  | Foto produk, logo usaha, atau dokumentasi prestasi     |
| `menu-kotak-suara-visual`      | Kotak Suara                  | Ilustrasi penyampaian aspirasi atau kotak pesan        |
| `submenu-kabinet-visual`       | Organisasi → Kabinet         | Logo kabinet dan foto resmi                            |
| `submenu-bidang-visual`        | Organisasi → Bidang          | Ikon atau lambang Bidang                               |
| `submenu-kompartemen-visual`   | Organisasi → Kompartemen     | Ikon atau lambang Kompartemen                          |
| `submenu-program-kerja-visual` | Organisasi → Program Kerja   | Poster atau sampul Program Kerja                       |
| `submenu-agenda-visual`        | Aktivitas → Agenda & Tiket   | Poster agenda                                          |
| `submenu-berita-visual`        | Aktivitas → Berita & Artikel | Sampul berita atau foto artikel                        |
| `submenu-media-partner-visual` | Aktivitas → Mitra Media      | Ilustrasi kemitraan atau logo mitra yang diizinkan     |
| `submenu-bisnis-visual`        | Karya Kader → Bisnis Kader   | Logo usaha atau foto produk                            |
| `submenu-prestasi-visual`      | Karya Kader → Prestasi Kader | Foto penghargaan atau dokumentasi prestasi             |
| `page-not-found-visual`        | Halaman tidak ditemukan      | Ilustrasi arah atau tujuan yang tidak ditemukan        |
| `page-no-access-visual`        | Akses tidak diizinkan        | Ilustrasi pintu tertutup, kunci, atau perisai          |
| `page-system-error-visual`     | Gangguan sistem              | Ilustrasi sambungan atau susunan sistem yang terganggu |
| `page-maintenance-visual`      | Pemeliharaan layanan         | Ilustrasi perbaikan atau perkakas                      |
| `page-offline-visual`          | Gangguan jaringan            | Ilustrasi sambungan jaringan terputus                  |

Setiap menu utama dan submenu harus memiliki satu pemetaan aset. Jika aset foto/ilustrasi belum tersedia, gunakan ikon yang tepat dan ornamen garis sebagai pengganti sementara; catat kekurangannya dan jangan mengarang alamat berkas.

# 24. RESPONSIVE DESIGN

## 24.1 Breakpoints

Gunakan breakpoint proyek yang konsisten. Baseline:

| Breakpoint |        Lebar | Keterangan                |
|:-----------|-------------:|:--------------------------|
| `xs`       |   320–359 px | Small mobile              |
| `sm`       |   360–479 px | Mobile                    |
| `md`       |   480–767 px | Large mobile/small tablet |
| `lg`       |  768–1023 px | Tablet                    |
| `xl`       | 1024–1279 px | Small desktop             |
| `2xl`      | 1280–1535 px | Desktop                   |
| `3xl`      |     1536 px+ | Wide desktop              |

Nilai disesuaikan dengan Tailwind/config repository aktual.

## 24.2 Public navbar

- Desktop: full floating capsule.
- Tablet: menu dapat dipadatkan atau berubah ke drawer.
- Mobile: logo + hamburger + account CTA seperlunya.
- Dropdown desktop menjadi accordion/drawer di mobile.
- Tidak boleh ada horizontal overflow halaman.

## 24.3 Hero

- Desktop: text/photo split.
- Tablet: komposisi 45/55 atau stacked sesuai lebar.
- Mobile: headline dahulu, CTA, baru image.
- Floating cards dapat disusun ulang menjadi stack.
- Line art dikurangi.
- Jangan menutupi wajah atau headline.

## 24.4 Cards

- Desktop: 3–4 kolom sesuai konten.
- Tablet: 2 kolom.
- Mobile: 1 kolom atau horizontal carousel bila cocok.
- Semua informasi tetap dapat diakses tanpa hover.
- Card tidak boleh terlalu kecil untuk disentuh.

## 24.5 Dashboard

- Sidebar collapse atau drawer.
- Topbar tetap ringkas.
- Statistik menjadi 2 kolom/1 kolom.
- Activity dan agenda dapat ditumpuk.
- Tabel menjadi mobile card list atau horizontal scroll yang terkontrol.
- Filter menjadi sheet/select bila perlu.
- Tidak menghapus field penting hanya untuk menghemat ruang.

## 24.6 Motion on mobile

- Kurangi jarak slide.
- Hindari parallax.
- Kurangi continuous animation.
- Prioritaskan swipe dengan fallback tombol.
- Tab terpilih auto-scroll ke area terlihat.
- Tidak mengganggu vertical scroll.

------------------------------------------------------------------------

# 25. ACCESSIBILITY & USABILITY

## 25.1 General

- Semua elemen penting dapat digunakan dengan keyboard.
- Focus-visible jelas.
- Text contrast harus diuji pada background sebenarnya.
- Jangan mengandalkan warna saja.
- Semua image informatif memiliki alt.
- Decorative SVG memiliki `aria-hidden`.
- Icon-only button memiliki accessible name.
- Form label selalu tersedia.
- Error message terhubung ke field.
- Modal/drawer memiliki focus management.
- Semua menu dapat digunakan tanpa hover.
- Zoom browser tidak merusak layout.

## 25.2 Motion accessibility

- Hormati `prefers-reduced-motion`.
- Tidak ada flashing/strobing.
- Autoplay carousel harus dapat dihentikan/dikontrol.
- Animasi dekoratif tidak boleh menjadi satu-satunya indikator loading/status.
- Jangan membuat motion terus menerus tanpa tujuan.

## 25.3 Glass accessibility

- Uji teks pada glass di atas seluruh background.
- Jika kontras tidak cukup, tingkatkan opacity atau gunakan solid fallback.
- Jangan menempatkan teks kecil di atas garis gold.
- Hindari blur berlebihan yang membuat panel sulit dibedakan.

## 25.4 Target

Gunakan WCAG 2.2 AA sebagai target evaluasi. Jangan menyatakan sudah compliant sebelum dilakukan audit pada prototype dan implementasi aktual.

------------------------------------------------------------------------

# 26. PERFORMANCE & IMPLEMENTATION SAFETY

## 26.1 Performance

- Animasi mengutamakan `transform` dan `opacity`.
- Hindari animasi layout berat berulang.
- Hindari filter blur besar pada area fullscreen yang terus bergerak.
- Lazy-load media di bawah fold.
- Tetapkan aspect ratio gambar sebelum load.
- Gunakan ukuran gambar responsif.
- Jangan preload semua font.
- Jangan render dekorasi SVG yang sangat kompleks di setiap section.
- Jangan re-render seluruh dashboard setiap pixel scroll.
- Gunakan intersection observer untuk scroll state jika sesuai.
- Uji pada perangkat mobile kelas menengah/rendah.

## 26.2 Glass performance

- Blur besar digunakan hanya pada komponen penting.
- Hindari nested backdrop-filter bertingkat.
- Kurangi blur pada mobile.
- Sediakan fallback solid.
- Jangan membuat seluruh background menjadi video/animated canvas.

## 26.3 Asset performance

- Gunakan file master sebagai sumber.
- Buat optimized variant tanpa menimpa master.
- Lazy-load image.
- Preload hanya hero asset yang benar-benar penting.
- Pastikan font dan logo tidak menyebabkan layout shift.
- Tangani image error satu kali agar tidak terjadi fallback loop.

## 26.4 Implementation safety

- Jangan menambahkan dependency hanya untuk satu efek kecil jika CSS cukup.
- Gunakan Motion untuk shared layout/complex transition.
- Jangan mengontrol `transform` pada elemen yang sama melalui dua engine.
- Jangan mengubah permission berdasarkan state visual.
- Jangan membuat button yang hanya dekoratif tetapi tampak aktif.
- Jangan membuat fake progress bar yang menunjukkan angka palsu.

## 26.5 Three.js dan visual tiga dimensi

- Three.js hanya digunakan pada adegan yang telah disetujui dan memiliki nilai visual yang jelas.
- Adegan tiga dimensi harus berada pada komponen klien yang terisolasi.
- Gunakan pemuatan dinamis dan pemisahan kode agar halaman yang tidak memakai 3D tidak mengunduh paket 3D.
- Gunakan `next/dynamic` dengan `ssr: false` hanya dari Client Component ketika komponen memerlukan lingkungan peramban.
- Gunakan `Suspense`, tampilan pengganti, dan penanganan kegagalan adegan.
- Sediakan gambar, SVG, atau CSS sebagai pengganti jika WebGL tidak tersedia.
- Batasi jumlah kanvas aktif dan hentikan animasi saat tidak terlihat.
- Gunakan `frameloop="demand"` untuk adegan statis atau interaksi yang tidak memerlukan render terus-menerus.
- Batasi rasio piksel perangkat, misalnya rentang awal `[1, 1.5]`, lalu uji pada perangkat sasaran.
- Utamakan geometri sederhana, material ringan, dan jumlah objek yang wajar.
- Hindari bayangan waktu nyata, efek pascaproses, partikel besar, dan tekstur resolusi sangat tinggi.
- Jangan membuat kanvas tiga dimensi sebagai latar penuh untuk setiap halaman.
- Jangan menjalankan adegan tiga dimensi di halaman formulir, tabel, atau panel data padat tanpa alasan yang kuat.
- Hormati `prefers-reduced-motion` dan sediakan tampilan statis.
- Jangan biarkan kanvas menutupi tombol, teks, navigasi, atau sasaran sentuh.
- Pastikan sumber daya geometri, material, tekstur, dan model dibersihkan ketika komponen dilepas.
- Uji pemakaian memori, waktu pemuatan, dan kelancaran pada telepon kelas menengah.

## 26.6 Pemisahan animasi DOM dan adegan 3D

- Motion mengatur animasi elemen HTML/SVG.
- React Three Fiber mengatur animasi objek di dalam kanvas.
- Jangan menerapkan dua mesin animasi pada elemen DOM yang sama.
- Jangan membuat gerakan teks, ikon, tombol, dan kartu melalui Three.js.
- Sinkronisasi gerak gulir dengan adegan tiga dimensi harus terbatas, terukur, dan tidak menghambat gulir.
- Jika adegan tiga dimensi gagal, konten halaman harus tetap lengkap dan dapat digunakan.

## 26.7 Kinerja formulir, tabel, dan grafik

- Formulir panjang harus menggunakan komponen dan skema yang dapat digunakan kembali.
- Jangan menjalankan validasi berat pada setiap perubahan karakter jika validasi saat blur atau submit sudah cukup.
- Gunakan TanStack Table hanya untuk tabel yang membutuhkan fitur interaktif.
- Hindari merender ulang seluruh tabel ketika satu kontrol kecil berubah.
- Grafik Recharts harus memiliki ukuran wadah yang jelas dan responsif.
- Jangan merender grafik yang tidak terlihat atau tidak dibutuhkan pada halaman aktif.
- Hindari animasi grafik yang berlebihan.
- Gunakan data contoh dengan ukuran yang wajar; jangan membuat ribuan baris hanya untuk memenuhi tampilan.
- Jika data contoh berukuran besar diperlukan untuk menguji tabel, buat skenario uji terpisah dan bukan data awal setiap halaman.

## 26.8 Pengelolaan dependency

- Satu fungsi utama hanya boleh memiliki satu pustaka utama.
- Jangan memasang pustaka animasi kedua jika Motion sudah tersedia.
- Jangan memasang pustaka tabel visual tambahan jika TanStack Table dan komponen proyek sudah mencukupi.
- Jangan memasang pustaka grafik tambahan jika Recharts sudah mencukupi.
- Jangan memasang pustaka formulir tambahan jika React Hook Form dan Zod sudah mencukupi.
- Jangan memasang pustaka 3D lain di luar Three.js, React Three Fiber, dan Drei tanpa persetujuan.
- Hapus dependency yang tidak digunakan hanya setelah memastikan tidak dipakai bagian lain.
- Semua penambahan dan penghapusan dependency harus dicatat pada perubahan proyek.

## 26.9 Batas backend dan basis data

- Jangan membuat API Route, Route Handler, Server Action, layanan server bisnis, koneksi basis data, migrasi, atau skema basis data pada tahap frontend ini.

- Jangan membuat autentikasi produksi atau mengklaim simulasi akun demo sebagai autentikasi sungguhan.

- Jangan menghubungkan formulir ke layanan eksternal.

- Jangan menyimpan data bisnis sebagai data produksi.

- Gunakan data contoh lokal yang bertipe dan konsisten.

- Jika suatu tampilan membutuhkan respons server, simulasikan respons tersebut pada lapisan data contoh dan beri penamaan yang jelas.

- ## Jangan menambahkan paket backend hanya karena Next.js menyediakan kemampuan server.

# 27. COMPONENT REGISTRY

Komponen di bawah menjadi baseline visual reusable. Props teknis mengikuti implementasi dan kebutuhan PRD.

| Component                | Variants                                    | Visual responsibility                        |
|:-------------------------|:--------------------------------------------|:---------------------------------------------|
| `PublicNavbar`           | Default, Scrolled, Mobile                   | Floating capsule, active underline, dropdown |
| `PublicMegaMenu`         | Organization, Activity, Karya Kader         | Asset slot, feature panel, submenu list      |
| `MobileNavigationDrawer` | Open, Closed                                | Drawer/accordion                             |
| `DashboardShell`         | Standard, Compact                           | Sidebar + topbar + content                   |
| `Sidebar`                | Expanded, Collapsed                         | Dark wine, sliding active pill               |
| `Topbar`                 | Standard, SearchFocused                     | Glass/white surface                          |
| `WorkspaceSwitcher`      | Closed, Open, Selected                      | Context selector                             |
| `PageHeader`             | Public, Dashboard, Detail                   | Eyebrow, title, description, breadcrumb      |
| `SectionHeader`          | Editorial, Compact                          | Serif/Poppins hierarchy                      |
| `GlassPanel`             | Light, Dark, Floating                       | Selective glass                              |
| `Card`                   | Standard, Hoverable, Static                 | General content                              |
| `EditorialFeatureCard`   | Horizontal, Vertical, Featured              | Image-led editorial                          |
| `StatCard`               | Standard, Angled, Notched, Dark             | Metrics                                      |
| `ProfileCard`            | Compact, Portrait, Featured                 | Avatar, name, role                           |
| `ProgramCard`            | Standard, Featured                          | Program content                              |
| `EventCard`              | Standard, Featured, Compact                 | Poster, date, location, status               |
| `ArticleCard`            | Horizontal, Vertical, Featured              | Editorial content                            |
| `BusinessCard`           | Grid, Featured                              | Business showcase                            |
| `AchievementCard`        | Grid, Featured                              | Achievement showcase                         |
| `Tabs`                   | Underline, Pill, Scrollable                 | Sliding indicator                            |
| `SegmentedControl`       | Compact, Wide                               | Mode selection                               |
| `Dropdown`               | Standard, AssetMenu                         | Menu surface and motion                      |
| `Button`                 | Primary, Secondary, Ghost, CTA, Destructive | Actions                                      |
| `Input`                  | Text, Search, Date, Select                  | Form controls                                |
| `FormSection`            | Standard, Grouped                           | Form hierarchy                               |
| `DataTable`              | Standard, Dense, Responsive                 | TanStack Table logic + custom solid UI       |
| `DataChart`              | Bar, Line, Area, Pie                        | Recharts chart with Indonesian labels        |
| `FormProvider`           | Standard, MultiStep                         | React Hook Form context and field state      |
| `FormField`              | Text, Email, Password, Select, Date         | React Hook Form field and Zod validation     |
| `ThreeScene`             | Hero, Editorial, Decorative                 | Isolated React Three Fiber canvas            |
| `ThreeSceneFallback`     | Image, SVG, Static                          | Static visual when WebGL is unavailable      |
| `StatusBadge`            | Success, Warning, Error, Info, Neutral      | Text + semantic state                        |
| `ActivityTimeline`       | Compact, Detailed                           | Activity history                             |
| `AgendaList`             | Compact, Detailed                           | Upcoming agenda                              |
| `Modal`                  | Standard, Confirmation                      | Overlay/dialog                               |
| `Drawer`                 | Side, BottomSheet, Fullscreen               | Detail/mobile interaction                    |
| `Toast`                  | Success, Error, Warning, Info               | Feedback                                     |
| `Skeleton`               | Text, Card, Table, Avatar                   | Loading placeholder                          |
| `BrandLoader`            | Fullscreen, Overlay                         | Center logo + orbit                          |
| `ErrorState`             | 404, 403, 500                               | Illustration + recovery                      |
| `EmptyState`             | Domain-specific                             | Empty illustration + CTA                     |
| `DecorativeLineGroup`    | Contour, Ribbon, Orbit, Frame               | Background ornament                          |
| `BrandOrnament`          | Five approved brand fragments               | Semantic decoration                          |

Komponen serupa harus menggunakan satu primitive dengan variants, bukan salinan terpisah yang tidak konsisten.

------------------------------------------------------------------------

# 28. PAGE-TO-VISUAL MAPPING

Tabel ini bukan pengganti inventaris screen PRD. Tujuannya memetakan kelompok halaman ke pola visual utama.

| Area                    | Visual shell          | Komponen utama                         | Dekorasi |
|:------------------------|:----------------------|:---------------------------------------|:---------|
| Public Home             | Editorial Aurora      | Navbar, hero, feature, metric, article | L2–L3    |
| Public About            | Editorial split       | Section header, image/text, timeline   | L1–L2    |
| Public Organization     | Connected editorial   | Org tree, profile card, carousel       | L1–L2    |
| Public Activity         | Data/editorial hybrid | Filter, event, article, medpart        | L0–L1    |
| Public Karya Kader      | Image-led showcase    | Business, achievement, filters         | L1–L2    |
| Public Kotak Suara      | Form-first            | Form, status, instruction              | L0–L1    |
| Authentication          | Minimal clean         | Form, card, validation                 | L0–L1    |
| Personal Area           | Compact dashboard     | Profile, tabs, activity, settings      | L0–L1    |
| Organization Management | Data-first dashboard  | Sidebar, topbar, table, approval       | L0–L1    |
| Workspace Bidang        | Workspace shell       | Switcher, summary, unit content        | L1       |
| Workspace Kompartemen   | Workspace shell       | Members, progress, history             | L1       |
| Workspace Proker        | Workspace shell       | Roster, task, documents, status        | L1       |
| Admin Panel             | Control dashboard     | Permission matrix, table, forms        | L0–L1    |
| Loading                 | Branded immersive     | Logo, orbit, progress                  | L3       |
| Error/Empty             | Illustration-led      | Error state, CTA, icon                 | L1–L2    |

## 28.1 Public Home section template

| Section  | Pattern          | Dominant surface | Primary visual          |
|:---------|:-----------------|:-----------------|:------------------------|
| Navbar   | Floating capsule | White Glass      | Logo + navigation       |
| Hero     | Aurora split     | Warm Ivory/Blush | Serif headline + photo  |
| Values   | Editorial row    | White            | Icon tiles              |
| Programs | Glass block      | Glass/Blush      | Feature + program cards |
| Impact   | Angled statement | Burgundy + White | Metric                  |
| Articles | Editorial split  | Ivory/White      | Horizontal feature card |
| Footer   | Dark statement   | Dark Wine        | Brand identity + links  |

## 28.2 Dashboard template

| Section     | Pattern           | Surface                 |
|:------------|:------------------|:------------------------|
| Sidebar     | Fixed/collapsible | Dark Wine               |
| Topbar      | Floating/solid    | White Glass             |
| Page header | Editorial compact | White/Ivory             |
| Quick tabs  | Sliding pill      | White/Glass             |
| Statistics  | Card family       | White/Blush/Gold accent |
| Activity    | Timeline panel    | White                   |
| Agenda      | List/card panel   | White                   |
| Data table  | Solid table       | White                   |
| Footer      | Minimal           | Transparent/White       |

------------------------------------------------------------------------

# 29. DESIGN TOKEN REGISTRY

## 29.1 Token categories

Semua token disimpan terpusat: - color; - semantic color; - typography; - spacing; - container; - radius; - border; - shadow; - glass; - motion duration; - motion easing; - z-index; - responsive breakpoints.

Jangan menyimpan nilai yang sama dengan nama berbeda tanpa alasan.

## 29.2 CSS token baseline

``` css
:root {
  /* Color */
  --brand-primary: #5A1722;
  --brand-deep: #3D0F16;
  --brand-gold: #E8B577;
  --brand-copper: #AF7D66;
  --surface-ivory: #FDF7F2;
  --surface-white: #FFFFFF;
  --surface-neutral: #FAF8F6;
  --surface-blush: #F2E4DC;
  --text-primary: #171313;
  --text-secondary: #6B6260;
  --border-default: #E9E1DC;

  /* Typography */
  --font-display: "ARTHAKARSA Serif Display", Georgia, serif;
  --font-ui: "Poppins", Arial, sans-serif;

  /* Radius */
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-2xl: 32px;
  --radius-3xl: 40px;
  --radius-pill: 999px;

  /* Glass */
  --glass-bg: rgba(255, 251, 247, 0.78);
  --glass-border: rgba(255, 255, 255, 0.65);
  --glass-blur: 20px;
  --glass-shadow: 0 8px 28px rgba(61, 15, 22, 0.08);

  /* Motion */
  --motion-fast: 180ms;
  --motion-standard: 260ms;
  --motion-slide: 320ms;
  --motion-page: 420ms;
  --motion-ease: cubic-bezier(0.22, 1, 0.36, 1);

  /* Layout */
  --container-content: 1200px;
  --container-wide: 1360px;
  --container-ultra: 1480px;
  --page-gutter: clamp(16px, 4vw, 64px);
}
```

## 29.3 Token governance

- Official colors tidak diubah.
- Extension colors hanya digunakan sesuai fungsi.
- Typography tidak ditambah tanpa persetujuan.
- Setiap token harus memiliki nama semantik.
- Token baru harus dicatat pada changelog.
- Jangan hardcode nilai berulang pada screen.
- Bila warna token gagal contrast test, sesuaikan state/surface atau gunakan solid fallback; jangan mengubah official brand color secara sepihak.

------------------------------------------------------------------------

# 30. IMPLEMENTATION RULES FOR AI AGENT

## 30.1 Wajib dibaca sebelum implementasi

AI Agent harus membaca: 1. PRD Frontend terbaru. 2. `design.md` ini. 3. Struktur repository. 4. Asset manifest/folder assets. 5. Package manifest dan lockfile. 6. Route/layout yang sudah ada.

Jangan mulai coding berdasarkan moodboard saja tanpa memahami PRD dan repository.

## 30.2 Prioritas implementasi visual

Urutan implementasi: 1. Font loading dan color tokens. 2. Global background, line art primitives, spacing, radius, shadow. 3. Public navbar dan dropdown. 4. Dashboard shell, sidebar, topbar. 5. Button, card, form, table, tabs, status. 6. Glass variants. 7. Motion registry. 8. Loading/error/empty states. 9. Responsive behavior. 10. Page-specific compositions berdasarkan PRD.

## 30.3 Larangan AI Agent

AI Agent dilarang: - mengganti font tanpa alasan dan persetujuan; - mengubah logo resmi; - mengarang alamat berkas aset; - menghilangkan pemetaan aset untuk salah satu menu utama atau submenu; - mengganti nama menu resmi pada PRD; - mengubah alamat halaman, identitas layar, peran, izin, cakupan akses, atau alur bisnis; - membuat setiap halaman dengan susunan yang tidak konsisten; - menggunakan efek kaca pada seluruh komponen; - menambahkan warna baru secara acak; - membuat animasi berat tanpa pengganti untuk pengurangan gerakan; - menampilkan data contoh seolah-olah data organisasi asli; - menambahkan tombol yang tidak memiliki fungsi; - menampilkan tulisan antarmuka berbahasa Inggris atau singkatan yang tidak diperlukan; - membiarkan tulisan bawaan pustaka atau templat muncul pada halaman; - membuat halaman tidak ditemukan atau halaman kesalahan tanpa ilustrasi aset/pengganti visual yang sesuai; - menghilangkan informasi penting pada telepon; - mengklaim visual sudah sama dengan acuan sebelum diperiksa di peramban.

## 30.4 Jika asset belum tersedia

1.  Periksa folder asset aktual.
2.  Cari nama file dan format.
3.  Cocokkan visualnya dengan kebutuhan.
4.  Catat asset yang hilang.
5.  Gunakan fallback yang sesuai.
6.  Jangan membuat path fiktif.
7.  Jangan mengganti logo dengan teks atau bentuk buatan.
8.  Jangan mengarang foto dokumentasi.

## 30.5 Jika ada konflik dokumen

- PRD menentukan kebutuhan, halaman, alur, role, permission, dan data.
- `design.md` menentukan visual.
- Keputusan pengguna terbaru yang eksplisit memperbarui bagian yang disebutkan.
- Perubahan visual tidak mengubah business rule.
- Jika konflik tidak dapat diselesaikan dari dokumen, tandai sebagai unresolved dan minta keputusan; jangan menebak.

## 30.6 Pemeriksaan Bahasa Indonesia dan kelengkapan aset

Sebelum menyatakan satu halaman selesai, AI Agent wajib: 1. Memeriksa semua tulisan yang terlihat pada halaman dalam keadaan awal, sorotan, fokus, terbuka, memuat, berhasil, gagal, kosong, dan tidak memiliki izin. 2. Memastikan semua tulisan menggunakan Bahasa Indonesia sesuai Bagian 0.5. 3. Memeriksa teks pada gambar, poster, ilustrasi, dan aset yang mengandung tulisan. Jangan memakai aset yang memuat tulisan asing jika tulisan tersebut menjadi bagian penting dari tampilan. 4. Memastikan semua enam menu utama memiliki pemetaan aset dan semua submenu memiliki aset pendamping atau catatan pengganti sementara. 5. Memastikan halaman tidak ditemukan, halaman akses tidak diizinkan, gangguan sistem, pemeliharaan, gangguan jaringan, dan keadaan kosong memakai ilustrasi yang sesuai. 6. Memastikan teks alternatif, nama aksesibel, judul halaman, dan pesan pembaca layar juga berbahasa Indonesia. 7. Menjalankan pencarian teks pada kode sumber untuk menemukan tulisan antarmuka berbahasa Inggris yang tertinggal. 8. Mencatat setiap aset yang belum tersedia. Jangan menandai aset sebagai selesai hanya karena pengganti sementara telah dipasang.

------------------------------------------------------------------------

# 31. VISUAL QUALITY ASSURANCE CHECKLIST

## 31.1 Brand and identity

- [ ] Logo HIPMI memakai asset resmi.
- [ ] Wordmark Telkom University memakai asset resmi.
- [ ] Logo ARTHAKARSA memakai master asset.
- [ ] Tidak ada logo yang di-recolor/redraw/crop/stretch.
- [ ] Lima pecahan logo digunakan sesuai makna.
- [ ] Foto pengurus/kader sesuai sumber dan izin.
- [ ] Semua aset menu utama dan submenu sudah dipetakan.
- [ ] Ilustrasi halaman tidak ditemukan dan seluruh jenis kesalahan sudah dipetakan.
- [ ] Tidak ada tulisan asing yang tertanam pada aset visual tanpa alasan resmi.

## 31.2 Typography

- [ ] Poppins tersedia dan termuat.
- [ ] ARTHAKARSA Serif Display tersedia dan termuat.
- [ ] Font fallback disiapkan.
- [ ] Heading tidak overflow.
- [ ] Body nyaman dibaca.
- [ ] Form/table tidak menggunakan serif display.
- [ ] Font tidak menyebabkan layout shift berlebihan.

## 31.3 Color and surface

- [ ] Official colors tidak berubah.
- [ ] Extension colors dicatat.
- [ ] Text contrast diuji.
- [ ] Gold tidak dipakai sebagai teks kecil di atas White.
- [ ] Semantic status memiliki label.
- [ ] Glass surface tetap readable.

## 31.4 Background and line art

- [ ] Contour lines tidak menutupi teks/foto.
- [ ] Ribbon tidak mengganggu scroll.
- [ ] Setiap section memilih pattern sesuai fungsi.
- [ ] Tidak semua section menggunakan bentuk yang sama.
- [ ] Mobile memiliki versi dekorasi yang lebih ringan.
- [ ] Ornamen tidak menyebabkan overflow horizontal.
- [ ] Dekorasi tidak dapat diklik dan tidak mengganggu screen reader.

## 31.5 Navbar and dropdown

- [ ] Public navbar mengikuti komposisi KPM-inspired.
- [ ] Identitas logo benar.
- [ ] Semua enam menu utama tersedia.
- [ ] Semua submenu mengikuti PRD.
- [ ] Active route benar.
- [ ] Sliding indicator bergerak halus.
- [ ] Dropdown dapat dibuka tanpa hover.
- [ ] Mobile drawer berfungsi.
- [ ] Escape/focus behavior benar.

## 31.6 Dashboard

- [ ] Sidebar sesuai role dari PRD.
- [ ] Topbar rapi.
- [ ] Workspace switcher sesuai scope.
- [ ] Statistik tidak terpotong.
- [ ] Activity dan agenda terbaca.
- [ ] Table solid, bukan glass.
- [ ] Layout mobile tidak rusak.

## 31.7 Components and motion

- [ ] Card variants konsisten.
- [ ] Button states lengkap.
- [ ] Tabs menggunakan sliding indicator.
- [ ] Dropdown dan modal memiliki exit state.
- [ ] Loading mempertahankan ukuran.
- [ ] Reduced motion tersedia.
- [ ] Tidak ada motion yang menghambat penggunaan.
- [ ] Tulisan setiap bagian memiliki gerakan masuk dan keluar.
- [ ] Ikon dan ilustrasi setiap bagian memiliki gerakan masuk dan keluar yang terkoordinasi.
- [ ] Gerakan keluar tidak membuat isi sulit dibaca atau hilang ketika skrip gagal.

## 31.8 Teknologi dan implementasi frontend

- [ ] Next.js dan App Router mengikuti struktur repository yang disepakati.
- [ ] React dan TypeScript digunakan untuk komponen dan data contoh.
- [ ] Tidak ada kesalahan pemeriksaan tipe TypeScript.
- [ ] Tailwind CSS menggunakan token design system yang sama.
- [ ] Hanya ada satu mesin animasi antarmuka.
- [ ] Lucide React digunakan untuk ikon antarmuka, bukan untuk mengganti logo resmi.
- [ ] Three.js hanya dimuat pada halaman yang benar-benar membutuhkan adegan 3D.
- [ ] React Three Fiber cocok dengan versi utama React yang terpasang.
- [ ] Drei cocok dengan versi React Three Fiber yang digunakan.
- [ ] Adegan 3D memiliki pemuatan dinamis dan pengganti statis.
- [ ] Adegan 3D tidak menghalangi teks, tombol, atau navigasi.
- [ ] React Hook Form dan Zod digunakan untuk formulir interaktif.
- [ ] TanStack Table digunakan hanya pada tabel yang membutuhkan fitur interaktif.
- [ ] Recharts digunakan untuk grafik dua dimensi yang diperlukan PRD.
- [ ] Semua formulir, tabel, grafik, dan adegan 3D memakai data contoh lokal.
- [ ] Tidak ada integrasi backend, basis data, atau autentikasi produksi.
- [ ] Tidak ada dependency ganda untuk fungsi yang sama.
- [ ] Versi dependency dan lockfile tetap konsisten.

## 31.9 Loading/error/responsive

- [ ] Loader menggunakan logo master ARTHAKARSA.
- [ ] Loader tidak membuat fake progress.
- [ ] 404/403/500 memiliki visual yang sesuai.
- [ ] Empty state per domain tersedia.
- [ ] Responsive 320 px ke atas diuji.
- [ ] Zoom 200% tidak merusak halaman.
- [ ] Tidak ada horizontal overflow.
- [ ] Tidak ada gambar yang gagal dimuat.
- [ ] Semua pesan halaman tidak ditemukan dan kesalahan menggunakan Bahasa Indonesia.
- [ ] Semua tombol, label, petunjuk, pesan validasi, dan pemberitahuan menggunakan Bahasa Indonesia.

------------------------------------------------------------------------

# 32. ACCEPTANCE CRITERIA — DESIGN BASELINE

Dokumen visual dianggap telah diterapkan dengan benar pada frontend apabila:

1.  Website menggunakan arah Aurora Glass Editorial yang konsisten.
2.  Warna primary `#5A1722` dan deep primary `#3D0F16` digunakan sebagai inti identitas.
3.  Poppins dan ARTHAKARSA Serif Display diterapkan sesuai peran.
4.  Background memiliki signature fine lines/contour/ribbon yang terkontrol.
5.  Section memiliki variasi bentuk yang terarah, bukan repetisi satu template.
6.  Public navbar menggunakan komposisi rounded floating capsule seperti referensi KPM tanpa menyalin identitas KPM.
7.  Navbar, dropdown, sidebar, dan tabs memiliki active/hover/focus state.
8.  Sliding tab indicator benar-benar bergerak horizontal.
9.  Glass digunakan selektif dengan fallback solid.
10. Card memiliki variasi yang tetap konsisten dalam satu card family.
11. Dashboard rapi, data-first, dan mudah dipindai.
12. Dropdown dapat menampilkan asset/illustration yang sesuai.
13. Loading screen memiliki logo di tengah dan motion yang halus.
14. Error/empty page memiliki artwork/asset yang sesuai atau fallback terarah.
15. Seluruh halaman tetap mengikuti route, data, role, permission, dan flow pada PRD.
16. Seluruh tampilan responsive dan tetap dapat digunakan dengan keyboard.
17. Tidak ada klaim lulus aksesibilitas/kinerja sebelum pengujian aktual.
18. Putih menjadi dasar layar, sedangkan warna latar bagian berganti secara lembut dan saling menyambung.
19. Semua tulisan yang terlihat oleh pengguna menggunakan Bahasa Indonesia tanpa istilah Inggris atau singkatan yang tidak diperlukan.
20. Keenam menu utama dan seluruh submenu memiliki pemetaan aset visual yang sesuai.
21. Halaman tidak ditemukan, akses tidak diizinkan, gangguan sistem, pemeliharaan, gangguan jaringan, dan keadaan kosong memiliki ilustrasi aset yang sesuai atau pengganti sementara yang tercatat.
22. Tulisan, ikon, kartu, dan hiasan setiap bagian memiliki gerakan masuk dan keluar yang halus.
23. Semua gerakan tetap dapat digunakan dengan pengaturan pengurangan gerakan dan ketika pustaka animasi gagal dimuat.
24. Frontend menggunakan Next.js, React, dan TypeScript sesuai struktur repository.
25. Tailwind CSS dan CSS Variables menggunakan satu sumber token visual.
26. Motion menjadi satu-satunya mesin animasi antarmuka.
27. Three.js, React Three Fiber, dan Drei hanya digunakan pada bagian yang disetujui serta memiliki pengganti statis.
28. React Three Fiber dan Drei kompatibel dengan versi React yang digunakan.
29. Formulir menggunakan React Hook Form dan Zod untuk simulasi serta validasi sisi pengguna.
30. Tabel interaktif menggunakan TanStack Table dengan tampilan khusus design system.
31. Grafik dua dimensi menggunakan Recharts dengan alternatif tabel atau ringkasan.
32. Data seluruh halaman berasal dari data contoh lokal yang konsisten.
33. Tidak ada backend, basis data, API bisnis, atau autentikasi produksi pada tahap frontend.

------------------------------------------------------------------------

# 33. OPEN ITEMS / PERLU VERIFIKASI

| Item                             | Status                                            | Tindakan                                                                      |
|:---------------------------------|:--------------------------------------------------|:------------------------------------------------------------------------------|
| Logo ARTHAKARSA master           | Path disebut `public/assets/logo.png` pada sumber | Cocokkan file aktual                                                          |
| Logo HIPMI                       | File aktual perlu dicocokkan                      | Gunakan asset resmi                                                           |
| Wordmark Telkom University       | File aktual perlu dicocokkan                      | Gunakan asset resmi                                                           |
| Font Poppins                     | Perlu pemeriksaan asset/dependency                | Pastikan file/loading/lisensi                                                 |
| Font ARTHAKARSA Serif Display    | Perlu pemeriksaan asset                           | Cari file font resmi; jangan mengganti diam-diam                              |
| Lima pecahan logo                | Perlu asset manifest                              | Cocokkan nama dan fungsi                                                      |
| `siluet.png`                     | Nama keputusan tersedia; path perlu diverifikasi  | Cocokkan file aktual                                                          |
| Ilustrasi dropdown               | Perlu asset manifest                              | Gunakan asset sesuai kategori                                                 |
| Ilustrasi 404/403/500            | Perlu asset manifest                              | Gunakan asset/fallback                                                        |
| Motion dependency                | Perlu cek package/lockfile                        | Gunakan satu engine                                                           |
| Glass fallback                   | Perlu uji browser                                 | Sediakan solid fallback                                                       |
| Semantic colors                  | Extension awal                                    | Contrast test                                                                 |
| Responsive                       | Belum diuji di build                              | QA seluruh breakpoint                                                         |
| Aset enam menu utama dan submenu | Belum diverifikasi satu per satu                  | Cocokkan semua aset dengan folder proyek                                      |
| Ilustrasi halaman khusus         | Belum diverifikasi                                | Periksa aset 404, akses, gangguan, pemeliharaan, jaringan, dan keadaan kosong |
| Bahasa antarmuka                 | Belum diaudit pada hasil implementasi             | Periksa seluruh teks yang terlihat dalam Bahasa Indonesia                     |
| Gerakan masuk dan keluar         | Belum diuji pada halaman nyata                    | Uji judul, paragraf, ikon, kartu, dan ilustrasi saat digulir                  |
| Framework Next.js dan App Router | Belum diverifikasi pada repository                | Cocokkan struktur dan versi yang terpasang                                    |
| React dan TypeScript             | Belum diverifikasi pada repository                | Periksa package.json, konfigurasi, dan lockfile                               |
| Tailwind CSS                     | Perlu pemeriksaan versi                           | Cocokkan versi dan pola konfigurasi yang digunakan                            |
| Motion                           | Perlu pemeriksaan dependency                      | Gunakan satu mesin animasi saja                                               |
| Lucide React                     | Perlu pemeriksaan dependency                      | Pastikan paket ikon tersedia                                                  |
| Three.js dan React Three Fiber   | Belum dipasang/diperiksa                          | Pilih versi yang cocok dengan React                                           |
| Drei                             | Belum dipasang/diperiksa                          | Cocokkan dengan versi React Three Fiber                                       |
| React Hook Form dan Zod          | Belum dipasang/diperiksa                          | Pastikan resolver dan tipe formulir konsisten                                 |
| TanStack Table                   | Belum dipasang/diperiksa                          | Terapkan hanya pada tabel interaktif                                          |
| Recharts                         | Belum dipasang/diperiksa                          | Terapkan pada grafik dua dimensi yang dibutuhkan                              |
| Batas frontend saja              | Harus dijaga selama implementasi                  | Gunakan data contoh; jangan membuat backend atau basis data                   |
| Visual match                     | Review screenshot setelah implementasi            |                                                                               |

------------------------------------------------------------------------

# 34. CHANGELOG

## v1.2 — 18 November 2026

Pembaruan spesifikasi teknologi frontend berdasarkan keputusan pengguna.

Perubahan: - Menetapkan Next.js sebagai kerangka aplikasi dengan App Router sebagai acuan proyek baru. - Menetapkan React sebagai pustaka antarmuka dan TypeScript sebagai bahasa pemrograman. - Menetapkan Tailwind CSS sebagai sistem gaya yang terhubung dengan CSS Variables design token. - Menetapkan Motion for React sebagai satu-satunya mesin animasi antarmuka. - Menetapkan Lucide React sebagai pustaka ikon antarmuka. - Menambahkan Three.js, React Three Fiber, dan Drei untuk adegan tiga dimensi yang terbatas dan terisolasi. - Menambahkan React Hook Form dan Zod untuk formulir serta validasi sisi pengguna. - Menambahkan TanStack Table untuk tabel interaktif. - Menambahkan Recharts untuk grafik dua dimensi. - Menambahkan aturan kompatibilitas versi, pemuatan dinamis, pemisahan komponen server/klien, dan pengelolaan dependency. - Menambahkan aturan kinerja dan pengganti statis untuk adegan tiga dimensi. - Memperjelas batas implementasi frontend saja: data contoh lokal, simulasi akun dan formulir, tanpa backend, basis data, API bisnis, atau autentikasi produksi. - Menambahkan struktur direktori acuan, pemeriksaan teknologi, dan kriteria penerimaan frontend.

## v1.1 — 18 November 2026

Penyempurnaan arah visual Aurora Glass Editorial berdasarkan arahan terbaru pengguna.

Perubahan: - Memastikan putih menjadi dasar seluruh layar. - Menambahkan warna latar bagian yang sangat lembut dan saling menyambung. - Mempertahankan Burgundy `#5A1722` dan Dark Wine `#3D0F16`. - Menambahkan kewajiban Bahasa Indonesia untuk seluruh tulisan yang terlihat oleh pengguna. - Memetakan aset untuk keenam menu utama dan seluruh submenu. - Memetakan ilustrasi halaman tidak ditemukan, akses tidak diizinkan, gangguan sistem, pemeliharaan, gangguan jaringan, dan keadaan kosong. - Menambahkan gerakan masuk dan keluar untuk tulisan, ikon, gambar, kartu, dan hiasan pada setiap bagian. - Memperluas daftar pemeriksaan dan kriteria penerimaan untuk bahasa, aset, latar, serta gerakan.

## v1.0 — 17 November 2026

Arah visual Aurora Glass Editorial disusun berdasarkan moodboard yang disetujui pengguna.

Perubahan awal: - Menggunakan Poppins + ARTHAKARSA Serif Display. - Mempertahankan Burgundy `#5A1722` dan Dark Wine `#3D0F16`. - Menetapkan garis kontur, pita mengalir, lengkungan, orbit, dan garis penghubung sebagai ciri latar. - Menetapkan bilah navigasi kapsul mengambang yang terinspirasi komposisi KPM. - Menetapkan dasbor editorial berkaca yang terstruktur. - Menetapkan penanda tab yang bergeser mendatar. - Menetapkan keluarga kartu dengan beberapa variasi sudut. - Menetapkan panel menu bergambar, pemuatan bermerek, serta ilustrasi halaman khusus.

**Catatan:** dokumen ini adalah spesifikasi visual dan teknologi frontend. Pemeriksaan repository, kompatibilitas dependency, implementasi, pengujian peramban, aksesibilitas, kinerja, dan kecocokan aset tetap wajib dilakukan sebelum menyatakan pekerjaan selesai.

# 35. KAMUS TULISAN ANTARMUKA DAN CONTOH PESAN

Bagian ini menjadi contoh tulisan siap pakai. AI Agent boleh menyesuaikan kalimat berdasarkan konteks, tetapi seluruh pesan tetap harus berbahasa Indonesia.

| Keadaan                 | Judul                            | Penjelasan                                                                    | Tombol             |
|-------------------------|----------------------------------|-------------------------------------------------------------------------------|--------------------|
| Halaman tidak ditemukan | Halaman Tidak Ditemukan          | Halaman yang Anda cari tidak tersedia atau alamatnya telah berubah.           | Kembali ke Beranda |
| Akses tidak diizinkan   | Akses Tidak Diizinkan            | Akun Anda tidak memiliki izin untuk membuka halaman ini.                      | Kembali            |
| Gangguan sistem         | Terjadi Gangguan pada Sistem     | Kami belum dapat memuat halaman ini. Silakan coba kembali beberapa saat lagi. | Coba Lagi          |
| Pemeliharaan            | Layanan Sementara Tidak Tersedia | Layanan sedang diperiksa. Silakan kembali beberapa saat lagi.                 | Kembali ke Beranda |
| Koneksi terputus        | Koneksi Terputus                 | Periksa sambungan internet Anda, lalu coba kembali.                           | Coba Lagi          |
| Pencarian kosong        | Data Tidak Ditemukan             | Coba gunakan kata pencarian lain atau ubah penyaring yang dipilih.            | Hapus Penyaring    |
| Agenda kosong           | Belum Ada Agenda                 | Belum ada agenda yang dapat ditampilkan saat ini.                             | Lihat Agenda       |
| Dokumen kosong          | Belum Ada Dokumen                | Dokumen belum tersedia pada bagian ini.                                       | Kembali            |
| Pemuatan                | Sedang Menyiapkan Halaman        | Mohon tunggu sebentar.                                                        | Tidak perlu tombol |
| Berhasil                | Perubahan Berhasil Disimpan      | Informasi Anda telah diperbarui.                                              | Tutup              |
| Gagal menyimpan         | Perubahan Belum Tersimpan        | Periksa kembali informasi Anda, lalu coba lagi.                               | Coba Lagi          |
| Sesi berakhir           | Sesi Telah Berakhir              | Silakan masuk kembali untuk melanjutkan.                                      | Masuk              |

## 35.1 Pemeriksaan akhir bahasa

Sebelum halaman dinyatakan selesai, cari tulisan yang terlihat oleh pengguna pada: - berkas komponen; - berkas halaman; - data contoh; - berkas terjemahan; - pesan validasi; - pemberitahuan; - dialog konfirmasi; - keadaan pemuatan; - keadaan kosong; - halaman kesalahan; - teks alternatif dan nama aksesibel; - metadata halaman.

Tulisan teknis dalam kode seperti nama pustaka, nama fungsi, nama properti, nama berkas, alamat halaman, dan nama kelas tidak perlu diterjemahkan jika tidak terlihat oleh pengguna. Namun, setiap nilai yang dirender ke layar harus mengikuti aturan Bahasa Indonesia pada Bagian 0.5.

------------------------------------------------------------------------

# 36. DAFTAR PEMERIKSAAN ASET MENU DAN HALAMAN KHUSUS

Sebelum implementasi halaman, AI Agent wajib membuat daftar pemeriksaan aset dengan kolom:

| Kolom                | Isi                                               |
|----------------------|---------------------------------------------------|
| Kunci fungsi         | Nama kebutuhan aset, bukan nama berkas tebakan    |
| Menu/halaman         | Lokasi penggunaan                                 |
| Nama berkas aktual   | Nama berkas setelah ditemukan                     |
| Alamat berkas aktual | Lokasi yang benar di proyek                       |
| Jenis aset           | Logo, foto, poster, ilustrasi, ikon, atau ornamen |
| Sumber               | Aset resmi, kiriman pengguna, atau sumber berizin |
| Izin penggunaan      | Status izin publikasi                             |
| Rasio dan ukuran     | Dimensi dan rasio gambar                          |
| Teks alternatif      | Penjelasan gambar dalam Bahasa Indonesia          |
| Keadaan              | Tersedia, belum tersedia, atau perlu pengganti    |

**Daftar minimum yang wajib diperiksa:** - Beranda, Tentang Kami, Organisasi, Aktivitas, Karya Kader, dan Kotak Suara. - Kabinet, Bidang, Kompartemen, dan Program Kerja. - Agenda & Tiket, Berita & Artikel, dan Mitra Media. - Bisnis Kader dan Prestasi Kader. - Halaman tidak ditemukan. - Halaman akses tidak diizinkan. - Gangguan sistem. - Pemeliharaan layanan. - Gangguan jaringan. - Keadaan kosong untuk agenda, surat, transaksi, Program Kerja, prestasi, bisnis, pemberitahuan, pencarian, anggota, dan dokumen.

Tidak boleh ada menu atau halaman khusus yang luput dari daftar aset. Aset yang belum tersedia harus dicatat, bukan dianggap sudah selesai.
