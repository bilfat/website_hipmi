## gas lanjut bahas tetapi dengan prinsip simple yaa<br>HIPMI CENTRAL — Project Roadmap

Status berdasarkan hasil cross-check saat ini

**01**

**Struktur Website & Navigasi**

Selesai

Area utama, navbar, sidebar, workspace switcher, Cabinet Center.

**02**

**Pengguna & Role**

Selesai

Role, tanggung jawab, batas kewenangan dan penugasan.

**03**

**Matriks Akses dan Kewenangan**

Selesai

View, Create, Edit, Approve/Publish, Close dan scope.

**04**

**Daftar Fitur per Modul**

selesai

Fitur enam modul sudah dibahas; perlu pemeriksaan konsistensi akhir.

**05**

**Business Flow**

SELESAI

Sejumlah alur sudah dibahas, tetapi belum seluruhnya difinalisasi end-to-end.

**06**

**Struktur Halaman**

SEDANG BERJALAN

Inventaris halaman, subhalaman, detail dan navigasi.

**07**

**Wireframe / High-Fidelity & UI/UX serta Design System**

Belum dimulai

Komponen, warna, tipografi, layout, interaksi dan responsive.

**08**

**Implementasi Frontend**

Belum dimulai

Implementasi berdasarkan desain dan flow yang sudah disetujui.

**OKE! Sekarang kita satukan seluruh hasil brainstorming kita menjadi satu rancangan besar Struktur Keseluruhan Website HIPMI CENTRAL.**

**Aku ingin hasil pembahasan ini menjadi semacam *****Master Navigation Blueprint***** yang nantinya menjadi pegangan sebelum kita masuk ke:**

1. **Finalisasi role dan tanggung jawab.**

1. **Finalisasi fitur setiap modul.**

1. **Business flow setiap fitur.**

1. **Wireframe dan UI/UX.**

1. **Implementasi frontend.**

**Aku juga akan mempertahankan keputusan yang sudah kita sepakati. Jadi kita tidak mengulang pembahasan dari nol.**

# **MASTER NAVIGATION BLUEPRINT — HIPMI CENTRAL**

## **1. Gambaran besar website**

**Menurutku, HIPMI CENTRAL terdiri dari empat area utama yang terhubung dalam satu aplikasi.**

# **HIPMI CENTRAL**

**Integrated Organization Management Platform**

**Satu aplikasi · Satu akun**

**Authentication**

**Login · Registrasi · Verifikasi · Pemulihan akun**

**01. Public Website**

**Untuk semua pengunjung.**

**Informasi dan layanan publik HIPMI.**

**02. Personal Area**

**Untuk semua akun terdaftar.**

**Dashboard mahasiswa dan kader.**

**03. Organization Management**

**Untuk pengguna dengan penugasan aktif.**

**Operasional organisasi dan workspace.**

**04. System Administration**

**Untuk Admin Sistem.**

**Pengelolaan kabinet dan konfigurasi platform.**

**Keempat area ini bukan empat website terpisah. Semuanya berada dalam satu aplikasi, menggunakan satu akun pengguna, tetapi akses dan navigasinya menyesuaikan status serta penugasan.**

**Authentication bukan dashboard tersendiri, melainkan pintu masuk untuk mengakses area yang diizinkan.**

## **2. Prinsip dasar pengguna dan akses**

**Sebelum masuk ke navigasi, kita harus memahami bahwa HIPMI CENTRAL membedakan empat hal:**

| **Konsep** | **Artinya** |
| --- | --- |
| **Akun** | **Identitas pengguna untuk login** |
| **Status keanggotaan** | **Mahasiswa biasa atau kader HIPMI** |
| **Jabatan struktural** | **Jabatan dalam organisasi** |
| **Penugasan operasional** | **Tugas seperti Staff atau Pengelola Proker** |

**Satu orang dapat memiliki beberapa jabatan dan penugasan sekaligus, tetapi tetap menggunakan satu akun.**

**Contohnya:**

**Andi adalah:**

- **Kader HIPMI.**

- **Staff Partnership.**

- **Pengelola Proker Business Expo.**

- **Pengelola Proker Company Visit.**

**Andi tidak membutuhkan empat akun. Sistem mengenali seluruh akses yang dimilikinya.**

**Ini mengikuti konsep satu akun dan beberapa penugasan yang dijelaskan dalam dokumen analisis.**

**analisis arsitektur.docx**

### **Alur perubahan akses pengguna**

**Registrasi**

**NIM, nama, email, nomor telepon, password**

**Mahasiswa Biasa**

**Status default**

**Personal Area**

**Verifikasi Kader**

**Jika memenuhi persyaratan keanggotaan**

**Kader HIPMI**

**Personal Area dengan fitur kader tambahan.**

**Penugasan Organisasi**

**Jika diangkat atau ditugaskan, mendapatkan Organization Access.**

**Aturan akses yang sudah kita sepakati:**

| **Kondisi pengguna** | **Personal** | **Organisasi** | **Admin** |
| --- | --- | --- | --- |
| **Mahasiswa biasa** | **Ya** | **Tidak** | **Tidak** |
| **Kader biasa** | **Ya** | **Tidak** | **Tidak** |
| **Anggota roster Proker** | **Ya** | **Tidak** | **Tidak** |
| **Pengelola Proker** | **Ya** | **Ya** | **Tidak** |
| **Staff** | **Ya** | **Ya** | **Tidak** |
| **Pengurus struktural** | **Ya** | **Ya** | **Tidak** |
| **Admin Sistem** | **Ya** | **Jika punya penugasan** | **Ya** |

**Penting: Admin Sistem tidak otomatis menjadi pengurus. Begitu juga kader tidak otomatis mendapatkan Organization Access.**

**analisis arsitektur.docx**

**analisis arsitektur.docx**

# **3. Area 01 — Public Website**

**Bisa diakses semua orang · Tanpa login**

**Ini merupakan website utama yang memperkenalkan HIPMI kepada mahasiswa, calon kader, mitra, dan masyarakat umum.**

**Kita mempertahankan keputusan PRD: navbar utama memiliki tepat enam menu.**

## **Struktur navigasi publik**

**HIPMI CENTRAL**

**Navbar**

**01. Beranda**

- **Profil singkat HIPMI**

- **Ketua Umum & Wakil Ketua Umum**

- **Benefit menjadi kader**

- **Kabinet aktif**

- **Struktur pengurus**

- **Bidang & kompartemen**

- **Program kerja yang dipublikasikan**

- **Bisnis kader**

- **Agenda mendatang**

- **Berita terbaru<br>02. Tentang Kami**

- **Sejarah organisasi**

- **Identitas organisasi**

- **Visi dan misi**

- **Tujuan organisasi**

- **Nilai organisasi<br>03. Organisasi**

- **Kabinet**

- **Bidang**

- **Kompartemen**

- **Program Kerja<br>04. Aktivitas**

- **Agenda & Tiket**

- **Berita & Artikel**

- **Media Partner<br>05. Karya Kader**

- **Bisnis Kader**

- **Prestasi Kader<br>06. Kotak Suara**

- **Aspirasi**

- **Kritik dan saran**

- **Pengiriman masukan secara privat<br>Login / Daftar<br>Kontrol akun terpisah**

**Aturan navigasi publik:**

- **Login/Daftar bukan menu navbar ketujuh.**

- **Cek Status Tiket merupakan tombol/CTA di halaman Agenda & Tiket.**

- **Media Partner bisa diajukan oleh publik tanpa login.**

- **Data organisasi yang ditampilkan harus mengikuti status publikasinya.**

- **Program kerja yang tanggalnya disembunyikan dapat ditampilkan dengan label Coming Soon.**

**prd\_master.md**

**analisis arsitektur.docx**

# **4. Area 02 — Personal Area**

**Untuk semua pengguna yang memiliki akun**

**Personal Area merupakan ruang pribadi setiap pengguna.**

**Di sini kita membedakan dua pengalaman: Mahasiswa Biasa dan Kader HIPMI.**

**Keduanya tetap menggunakan desain dashboard yang sama. Yang membedakan adalah informasi dan menu yang tersedia.**

## **A. Dashboard Mahasiswa Biasa**

[<u>**University Dashboard - Learn, Manage, Graduate by Tobias Schmidt - BitBitHooray on Dribbble**</u>](https://images.openai.com/static-rsc-4/Bf_X8MCfyjfUZSNDcntXt0OfXKy4OGLxDd2MvZG9J78aqPFLbAiuXrTFhmpLY9O6NGo183VzIa3V7tCTBsWC7txVy3PmElSIcDOlSmqniPCZ4Heaa-a6zbqCxSFR2uZxSbsfAeOb-BbKz_9rs0B_QXRieZ2sRlrkhnrcyjegA7k?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/24594740-University-Dashboard-Learn-Manage-Graduate?utm_source=chatgpt.com)

**Mahasiswa biasa mendapatkan menu:**

| **Menu** | **Fungsi** |
| --- | --- |
| **Dashboard** | **Ringkasan aktivitas pribadi** |
| **Profil Saya** | **Mengelola profil** |
| **Agenda Publik** | **Melihat agenda yang tersedia** |
| **Pendaftaran Saya** | **Melihat riwayat pendaftaran** |
| **Tiket Saya** | **Mengakses tiket kegiatan** |
| **Direktori Bisnis** | **Melihat bisnis kader** |
| **Informasi Organisasi** | **Melihat informasi HIPMI** |
| **Notifikasi** | **Pemberitahuan akun** |

**Mahasiswa biasa tidak mendapatkan akses ke informasi internal organisasi dan workspace.**

## **B. Dashboard Kader HIPMI**

[<u>**Member Management Software East Africa | JamiiCore Cloud**</u>](https://images.openai.com/static-rsc-4/GfZybXHNlA0kJYfZFoEKAkskhC7EPJNLoMouIr17Fa_RQPm69rgF5JVeiQZft3kPLNe53DrFd_pN1U0MhUNPRkMg4YZNAOD0rp_chXLBJFuSjyxm_rIAOufly9CZ31UNzR5UZ7e_GNreT5GBpwxYW6FjBLT1fos2bFG8uEoEQ64?purpose=inline)

[<u>**nyangorialumni.cloud**</u>](https://nyangorialumni.cloud/?utm_source=chatgpt.com)

**Kader mendapatkan semua fitur dasar mahasiswa biasa, ditambah:**

| **Menu** | **Fungsi** |
| --- | --- |
| **Profil Kader** | **Informasi keanggotaan** |
| **Riwayat Kader** | **Riwayat kabinet dan kepengurusan** |
| **Proker Saya** | **Riwayat keikutsertaan proker** |
| **Kehadiran Saya** | **Riwayat kehadiran kegiatan** |
| **Bisnis Saya** | **Mengelola pengajuan bisnis** |
| **Prestasi Saya** | **Melihat atau mengajukan informasi prestasi** |

**Catatan penting:**

- **Kader biasa tetap tidak mendapatkan Organization Management.**

- **Jika hanya menjadi anggota roster Proker, dia dapat melihat informasi keterlibatannya melalui Personal Area sesuai izin.**

- **Jika menjadi Pengelola Proker, dia mendapatkan akses Organization Management.**

- **Kader tidak otomatis mendapatkan akses seluruh data internal Proker.**

**analisis arsitektur.docx**

**analisis arsitektur.docx**

# **5. Area 03 — Organization Management**

**Untuk pengurus dan pengguna dengan penugasan aktif**

**Ini merupakan pusat aktivitas internal organisasi.**

**Kita tidak akan membuat dashboard dan website berbeda untuk setiap jabatan. Kita menggunakan satu sistem dashboard dengan sidebar, konten, dan tindakan yang berubah berdasarkan hak akses.**

## **A. Siapa yang mendapatkan akses?**

**Ada dua kelompok utama.**

**Pengurus struktural:**

- **Ketua Umum.**

- **Wakil Ketua Umum.**

- **Sekretaris Jenderal.**

- **Sekretaris Umum.**

- **Bendahara Umum.**

- **Kepala Bidang.**

- **Kepala Kompartemen.**

**Penugasan operasional:**

- **Staff.**

- **Pengelola Proker.**

**Anggota roster biasa tidak termasuk dalam kelompok yang mendapatkan Organization Management.**

## **B. Struktur sidebar Organization Management**

**Menurutku kita bisa mengelompokkan seluruh modul menjadi enam kelompok supaya navigasinya ringkas.**

**HIPMI CENTRAL**

**Organization**

**Workspace Switcher**

**Pilih workspace yang sedang dikelola.**

**01. Dashboard**

**Ringkasan sesuai jabatan dan lingkup kewenangan.**

**02. Operasional Organisasi**

- **Program Kerja**

- **Agenda & Event**

- **Kalender Organisasi<br>03. Administrasi & Keuangan**

- **Persuratan**

- **Keuangan**

- **Arsip Dokumen & LPJ<br>04. Direktori & Relasi**

- **Direktori Kader**

- **Bisnis Kader**

- **Sponsor & Mitra<br>05. Publikasi & Layanan**

- **CMS / Pengelolaan Website**

- **Media Partner**

- **Kotak Suara<br>06. Monitoring & Tindak Lanjut**

- **Statistik & Laporan**

- **Approval Center**

**Ini struktur kelompok menu yang kita usulkan. Bukan berarti seluruh menu muncul pada semua pengguna.**

### **Komponen topbar**

**Di bagian atas dashboard terdapat:**

- **Workspace Switcher.**

- **Pencarian.**

- **Notifikasi.**

- **Profil pengguna.**

- **Area Switcher jika pengguna juga memiliki akses ke area lain.**

**Keputusan penting: Workspace Switcher berada di topbar, bukan membuat menu Workspace Saya yang terpisah dan menduplikasi fungsi navigasi.**

**Sidebar hanya menampilkan fitur yang benar-benar bisa digunakan pengguna.**

**prd\_master.md**

**analisis arsitektur.docx**

## **C. Bagaimana dashboard setiap jabatan bekerja?**

**Kita tidak perlu membuat desain dashboard yang benar-benar berbeda untuk setiap jabatan.**

**Cukup menggunakan satu pola dashboard, tetapi konten dan kewenangannya berbeda.**

| **Pengguna** | **Fokus dashboard** |
| --- | --- |
| **Ketum, Waketum, Sekjen** | **Monitoring keseluruhan organisasi** |
| **Sekum** | **Persuratan dan administrasi organisasi** |
| **Bendum** | **Keuangan dan transaksi organisasi** |
| **Kepala Bidang** | **Monitoring bidang dan kompartemen** |
| **Kepala Kompartemen** | **Operasional kompartemen dan proker** |
| **Staff** | **Pekerjaan sesuai penugasan** |
| **Pengelola Proker** | **Pelaksanaan proker yang ditugaskan** |

**Top Management memiliki cakupan monitoring yang sama. Sekum menjadi pusat persuratan, sedangkan Bendum menjadi pusat keuangan.**

**analisis arsitektur.docx**

**analisis arsitektur.docx**

# **6. Workspace System**

**Nah, ini bagian yang menjadi inti pengelolaan aktivitas organisasi.**

**Kita perlu membedakan Dashboard Organisasi dan Workspace.**

- **Dashboard Organisasi: melihat ringkasan dan kondisi organisasi.**

- **Workspace: tempat menjalankan pekerjaan dan mengelola aktivitas.**

**Aku mengusulkan dua workspace utama.**

## **A. Workspace Kompartemen**

[<u>**QuickSuite: Project Page by Filllo Design Agency on Dribbble**</u>](https://images.openai.com/static-rsc-4/0OS8Sp35hdxn5YkoRtfAc1mBoHtTmMcykBkQpesWqYhi4YK4j0cqnkXMKD03hXbBifU29_mgczX4ExxwOYbIEmxXcphnTur-lwxCUNmksZgaTN9RDIrOtiohoeZN__RcNMM1hg1NN5F0KFQY18Pbdqe_4w72ZL_S8bGfiQbNi_U?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26618390-QuickSuite-Project-Page?utm_source=chatgpt.com)

**Workspace ini digunakan oleh Kepala Kompartemen dan Staff yang memiliki akses.**

**Fitur di dalamnya:**

| **Menu** | **Fungsi** |
| --- | --- |
| **Overview** | **Ringkasan kompartemen** |
| **Profil Kompartemen** | **Informasi kompartemen** |
| **Staff & Tim** | **Pengelolaan anggota** |
| **Progres Kompartemen** | **Mencatat progres kegiatan kompartemen** |
| **Program Kerja** | **Mengelola seluruh proker di bawah kompartemen** |
| **Pleno & Rapat** | **Mengelola kegiatan internal** |
| **Agenda** | **Mengelola agenda kompartemen** |
| **Kalender** | **Jadwal kompartemen** |
| **Keuangan** | **Informasi keuangan sesuai permission** |
| **Statistik** | **Ringkasan kinerja kompartemen** |

**Kepala Kompartemen dapat membuat Proker, menambahkan Staff, menunjuk Pengelola Proker, dan mengelola workspace proker di bawahnya.**

**Staff mendapatkan akses sesuai permission yang diberikan.**

## **B. Workspace Proker**

[<u>**Coorda – Calm event planning software for modern planners**</u>](https://images.openai.com/static-rsc-4/NUHTaw3scCwQ-2MoWi4-gvehlTc-iqffosWnEqcd0aFygmRtpPlcoaUiZV_QSxDnfBtGlBCEKfv7xdRVh9ynydhJfiMaprkoE2uc26CrPP1N6C5ZcS7E6Jqs1-LTvNvCFfl53ucougrQ3vpJdeH2wiRLf42N2Jk3QZFbuXjbB2I?purpose=inline)

[<u>**coorda.io**</u>](https://coorda.io/?utm_source=chatgpt.com)

**Setiap program kerja mempunyai workspace tersendiri.**

**Fitur di dalamnya:**

| **Menu** | **Fungsi** |
| --- | --- |
| **Overview** | **Ringkasan Proker** |
| **Informasi Proker** | **Detail dan identitas Proker** |
| **Tim & Roster** | **Daftar panitia dan pengelola** |
| **Timeline & Progres** | **Tahapan dan perkembangan pekerjaan** |
| **Agenda & Event** | **Mengelola agenda dan kegiatan** |
| **Ticketing** | **Pendaftaran dan tiket jika diperlukan** |
| **Persuratan** | **Pengajuan surat dan proposal** |
| **Keuangan** | **Pengajuan dana dan pencatatan** |
| **Dokumen** | **Mengelola dokumen kegiatan** |
| **LPJ** | **Laporan pertanggungjawaban** |
| **Riwayat Aktivitas** | **Histori pekerjaan** |

### **Perbedaan Pengelola Proker dan Anggota Tim**

| **Hak akses** | **Pengelola Proker** | **Anggota Tim** |
| --- | --- | --- |
| **Area Organization** | **Ya** | **Tidak** |
| **Membuka workspace Proker** | **Ya** | **Melalui informasi keterlibatan yang diizinkan** |
| **Mengelola roster** | **Ya** | **Tidak** |
| **Mengelola progres** | **Ya** | **Sesuai tugas** |
| **Mengajukan surat** | **Ya** | **Tidak otomatis** |
| **Mengajukan dana** | **Ya** | **Tidak** |
| **Mengelola agenda** | **Ya** | **Tidak** |
| **Mengelola LPJ** | **Ya** | **Sesuai penugasan** |
| **Menutup Proker** | **Tidak** | **Tidak** |

**Hanya Kepala Kompartemen yang memiliki kewenangan menutup Proker.**

**Ketika Proker ditutup, akses pengelolaannya berakhir, tetapi histori tetap tersedia.**

**analisis arsitektur.docx**

**analisis arsitektur.docx**

## **C. Bagaimana perpindahan Workspace?**

**Workspace Switcher di topbar hanya menampilkan workspace yang memang boleh diakses pengguna.**

**Contoh:**

**Workspace Saya**

**Contoh akun Staff Partnership sekaligus Pengelola Proker.**

**Struktural / Operasional**

**Kompartemen Partnership**

**Staff Kompartemen**

**Penugasan Proker**

**Business Expo**

**Pengelola Proker**

**Penugasan Proker**

**Company Visit**

**Pengelola Proker**

**Ketika berpindah workspace, data, breadcrumb, dan menu mengikuti workspace yang dipilih.**

**Tidak perlu logout dan tidak perlu membuat akun tambahan.**

# **7. Area 04 — System Administration**

**Khusus Admin Sistem**

**Ini merupakan area yang sudah kita bahas dan sepakati secara khusus.**

**Admin Sistem tidak mengelola aktivitas operasional organisasi. Tugasnya adalah mengelola struktur, akun, dan konfigurasi platform.**

**Tetapi kita punya perubahan penting dari konsep Admin sebelumnya:**

**Admin tidak langsung masuk ke dashboard dengan sidebar. Admin harus memilih kabinet terlebih dahulu.**

## **A. Alur Admin**

**Admin Login**

**Cabinet Center**

**Tanpa Sidebar**

**Menampilkan seluruh kabinet.**

**Pilih Kabinet**

**Active**

**Kabinet A**

**Archived**

**Kabinet B**

**Tambah Kabinet**

**Cabinet Dashboard**

**Sidebar Aktif**

**Khusus kabinet yang dipilih.**

## **B. Cabinet Center**

**Cabinet Center merupakan halaman awal Admin.**

**Informasi yang ditampilkan:**

- **Semua kabinet.**

- **Status kabinet.**

- **Periode kabinet.**

- **Identitas kabinet.**

- **Tombol tambah kabinet.**

- **Tombol untuk membuka kabinet.**

**Admin dapat mengelola lebih dari satu kabinet dalam satu tempat.**

## **C. Cabinet Dashboard**

**Setelah memilih kabinet, baru sidebar ditampilkan.**

**Kabinet 2026–2027**

**Active**

**Cabinet Administration**

**Overview**

**01. Pengelolaan Struktur & Akun**

- **Struktur Organisasi**

- **Jabatan & Pengurus**

- **Manajemen Pengguna**

- **Manajemen Kader**

**02. Pengelolaan Sistem & Akses**

- **Role & Permission**

- **Konfigurasi Modul**

- **Audit Log**

- **Pengaturan Sistem**

### **Dua domain utama Admin**

**1. Pengelolaan Struktur & Akun**

- **Kabinet.**

- **Bidang.**

- **Kompartemen.**

- **Jabatan.**

- **Pengurus.**

- **Akun pengguna.**

- **Kader dan verifikasi kader.**

**2. Pengelolaan Sistem & Akses**

- **Role & Permission.**

- **Template permission.**

- **Konfigurasi modul.**

- **Audit Log.**

- **Pengaturan sistem.**

### **Aturan yang sudah kita sepakati**

1. **Admin boleh mengelola akun dan melakukan verifikasi kader.**

1. **Role & Permission dikelola masing-masing kabinet.**

1. **Pengaturan permission satu kabinet tidak otomatis mengubah kabinet lain.**

1. **Admin mengatur template akses, bukan menunjuk semua Pengelola Proker.**

1. **Kepala Kompartemen menunjuk Pengelola Proker dan Staff sesuai kewenangannya.**

1. **Admin Panel terpisah dari Organization Management.**

1. **Admin tidak otomatis memiliki hak menyetujui surat atau mencairkan dana.**

**analisis arsitektur.docx**

**analisis arsitektur.docx**

# **8. Peta keseluruhan navigasi**

**Sekarang kita gabungkan seluruhnya menjadi satu sitemap.**

****

**HIPMI CENTRAL**

**│**

**├── PUBLIC WEBSITE**

**│   ├── Beranda**

**│   ├── Tentang Kami**

**│   ├── Organisasi**

**│   │   ├── Kabinet**

**│   │   ├── Bidang**

**│   │   ├── Kompartemen**

**│   │   └── Program Kerja**

**│   ├── Aktivitas**

**│   │   ├── Agenda & Tiket**

**│   │   ├── Berita & Artikel**

**│   │   └── Media Partner**

**│   ├── Karya Kader**

**│   │   ├── Bisnis Kader**

**│   │   └── Prestasi Kader**

**│   └── Kotak Suara**

**│**

**├── AUTHENTICATION**

**│   ├── Login**

**│   ├── Registrasi**

**│   ├── Verifikasi**

**│   └── Pemulihan Akun**

**│**

**├── PERSONAL AREA**

**│   ├── Dashboard**

**│   ├── Profil Saya**

**│   ├── Aktivitas Saya**

**│   │   ├── Agenda**

**│   │   ├── Pendaftaran**

**│   │   └── Tiket**

**│   ├── Direktori & Informasi**

**│   ├── Notifikasi**

**│   │**

**│   └── FITUR TAMBAHAN KADER**

**│       ├── Profil Kader**

**│       ├── Riwayat Kader**

**│       ├── Proker Saya**

**│       ├── Kehadiran Saya**

**│       ├── Bisnis Saya**

**│       └── Prestasi Saya**

**│**

**├── ORGANIZATION MANAGEMENT**

**│   ├── Dashboard**

**│   ├── Operasional Organisasi**

**│   │   ├── Program Kerja**

**│   │   ├── Agenda & Event**

**│   │   └── Kalender Organisasi**

**│   ├── Administrasi & Keuangan**

**│   │   ├── Persuratan**

**│   │   ├── Keuangan**

**│   │   └── Arsip Dokumen & LPJ**

**│   ├── Direktori & Relasi**

**│   │   ├── Direktori Kader**

**│   │   ├── Bisnis Kader**

**│   │   └── Sponsor & Mitra**

**│   ├── Publikasi & Layanan**

**│   │   ├── CMS**

**│   │   ├── Media Partner**

**│   │   └── Kotak Suara**

**│   ├── Monitoring & Tindak Lanjut**

**│   │   ├── Statistik & Laporan**

**│   │   └── Approval Center**

**│   │**

**│   └── WORKSPACE SWITCHER**

**│       ├── Workspace Kompartemen**

**│       │   ├── Overview**

**│       │   ├── Staff & Tim**

**│       │   ├── Progres Kompartemen**

**│       │   ├── Program Kerja**

**│       │   ├── Pleno & Rapat**

**│       │   ├── Agenda & Kalender**

**│       │   ├── Keuangan**

**│       │   └── Statistik**

**│       │**

**│       └── Workspace Proker**

**│           ├── Overview**

**│           ├── Informasi Proker**

**│           ├── Tim & Roster**

**│           ├── Timeline & Progres**

**│           ├── Agenda & Event**

**│           ├── Ticketing**

**│           ├── Persuratan**

**│           ├── Keuangan**

**│           ├── Dokumen**

**│           ├── LPJ**

**│           └── Riwayat Aktivitas**

**│**

**└── SYSTEM ADMINISTRATION**

**    │**

**    ├── CABINET CENTER**

**    │   ├── Daftar Kabinet**

**    │   ├── Tambah Kabinet**

**    │   └── Pilih Kabinet**

**    │**

**    └── CABINET DASHBOARD**

**        ├── Overview**

**        ├── Pengelolaan Struktur & Akun**

**        │   ├── Struktur Organisasi**

**        │   ├── Jabatan & Pengurus**

**        │   ├── Manajemen Pengguna**

**        │   └── Manajemen Kader**

**        │**

**        └── Pengelolaan Sistem & Akses**

**            ├── Role & Permission**

**            ├── Konfigurasi Modul**

**            ├── Audit Log**

**            └── Pengaturan Sistem**

# ******9. Bagaimana pengguna berpindah antararea?**

**Ini juga bagian dari navigasi yang harus kita tetapkan.**

**Aku mengusulkan konsep Area Switcher.**

**Area Switcher**

**Contoh pengguna yang memiliki beberapa akses.**

**Personal**

**Area aktif**

**Organisasi**

**Admin Sistem**

**Hanya area yang memang dimiliki pengguna yang ditampilkan. Admin Sistem membuka Cabinet Center, bukan dashboard operasional organisasi.**

**Contohnya:**

- **Mahasiswa biasa hanya melihat Personal.**

- **Kader biasa hanya melihat Personal.**

- **Pengelola Proker melihat Personal dan Organisasi.**

- **Staff sekaligus Pengelola Proker melihat Personal dan Organisasi dengan beberapa workspace.**

- **Pengguna yang juga Admin Sistem dapat melihat Admin Sistem.**

- **Jika seseorang mempunyai jabatan struktural sekaligus Admin, ia dapat memiliki akses ke kedua area tanpa akun tambahan.**

# **10. Aturan navigasi yang perlu dijaga**

**Ada beberapa prinsip yang menurutku wajib menjadi standar seluruh website.**

| **Prinsip** | **Aturan** |
| --- | --- |
| **Satu akun** | **Tidak ada akun berbeda untuk setiap jabatan** |
| **Satu dashboard pattern** | **Tampilan mengikuti template yang konsisten** |
| **Permission-based menu** | **Menu hanya muncul jika pengguna memiliki akses** |
| **Scope-based data** | **Data dibatasi sesuai lingkup kewenangan** |
| **Workspace switcher** | **Hanya menampilkan workspace yang ditugaskan** |
| **Cabinet context** | **Setiap dashboard organisasi menunjukkan kabinet aktif** |
| **Riwayat** | **Pergantian jabatan tidak menghilangkan histori** |
| **Public/private** | **Data internal tidak otomatis dipublikasikan** |
| **Responsive** | **Navigasi harus nyaman di desktop, tablet, dan mobile** |

**prd\_master.md**

**analisis arsitektur.docx**

# **11. Bagian yang sudah disepakati dan yang masih perlu difinalisasi**

**Aku tidak ingin semua hal langsung dianggap final, karena ada beberapa keputusan kecil tetapi penting yang masih perlu kita bereskan.**

**Sudah disepakati**

**Locked**

- **Empat area utama aplikasi.**

- **Public Website memiliki enam menu.**

- **Semua akun baru berstatus Mahasiswa Biasa.**

- **Kader tidak otomatis mendapatkan Organization Access.**

- **Pengelola Proker mendapatkan Organization Access.**

- **Anggota roster biasa tidak mendapatkan akses pengelolaan.**

- **Workspace Switcher berada di topbar.**

- **Sidebar internal mengikuti permission.**

- **Admin Panel terpisah dari Organization Management.**

- **Admin login masuk ke Cabinet Center tanpa sidebar.**

- **Memilih kabinet membuka Cabinet Dashboard.**

- **Role & Permission dikelola per kabinet.**

- **Admin memiliki dua domain pengelolaan.**

SIPPP! 🔥 Kita tetapkan keputusan CMS HIPMI CENTRAL sebagai **keputusan final untuk mekanisme publikasi**.

## **1. Pembagian tanggung jawab CMS**

**1. Content Creator — Pengurus**

Pembuat konten

- Membuat konten.

- Mengedit konten.

- Mengunggah gambar dan materi.

- Menyiapkan konten untuk dipublikasikan.

**2. Publisher — Pengurus**

Publikasi

- Memeriksa konten.

- Melakukan preview.

- Mempublikasikan konten.

- Mengubah atau menarik publikasi.

**3. Admin Sistem**

Pengawasan sistem

- Mengatur permission CMS.

- Menentukan akses pengelola CMS.

- Mengawasi aktivitas publikasi.

- Memantau audit log.

- Mengelola konfigurasi CMS.

## **2. Alur bisnis publikasi**

**Pengurus membuat konten**

**Konten disimpan sebagai Draft**

**Publisher memeriksa konten**

**Publisher melakukan Publish**

Published

**Konten tampil di Public Website**

Tidak ada kewajiban meminta persetujuan Admin untuk setiap publikasi.

## **3. Aturan yang kita kunci**

| **Ketentuan** | **Keputusan** |
| --- | --- |
| Pembuat konten | Pengurus |
| Publisher | Pengurus yang ditunjuk |
| Pengaturan permission | Admin |
| Pengawasan publikasi | Admin |
| Persetujuan Admin setiap publish | Tidak wajib |
| Konfigurasi CMS | Per kabinet |

Keputusan final

Keputusan ini akan menjadi dasar perancangan CMS, sidebar, role, dan business flow HIPMI CENTRAL.

**Selanjutnya kita masuk ke Role & Responsibility Matrix**, agar setiap jabatan dan penugasan mempunyai tanggung jawab yang jelas, tanpa ada pekerjaan yang tumpang tindih.

# **02. Role & Responsibility Matrix**

## **A. Top Management**

3 jabatan · 1 kelompok pengawasan

Top Management terdiri dari:

1. Ketua Umum (Ketum).

1. Wakil Ketua Umum (Waketum).

1. Sekretaris Jenderal (Sekjen).

Menurut keputusan sebelumnya, ketiganya memiliki hak monitoring organisasi yang setara dan menggunakan pola dashboard yang sama. Namun, tanggung jawab jabatannya tetap berbeda.

analisis arsitektur.docx

### **1. Ketua Umum**

**Fokus utama: Memimpin organisasi.**

Tanggung jawab:

- Memimpin jalannya organisasi HIPMI.

- Menentukan arah dan prioritas organisasi.

- Mengawasi pelaksanaan program kerja.

- Memantau kinerja seluruh bidang dan kompartemen.

- Memantau perkembangan administrasi dan keuangan.

- Mengambil keputusan strategis organisasi.

### **2. Wakil Ketua Umum**

**Fokus utama: Membantu kepemimpinan organisasi.**

Tanggung jawab:

- Membantu Ketua Umum menjalankan organisasi.

- Mendukung koordinasi antarbidang.

- Memantau pelaksanaan program kerja.

- Membantu memastikan kegiatan organisasi berjalan sesuai arah kebijakan.

- Menindaklanjuti tugas yang didelegasikan Ketua Umum.

### **3. Sekretaris Jenderal**

**Fokus utama: Mengawasi dan mengoordinasikan jalannya organisasi.**

Tanggung jawab:

- Memantau pelaksanaan kegiatan seluruh bidang dan kompartemen.

- Mengawasi perkembangan program kerja.

- Memantau koordinasi internal organisasi.

- Memastikan perkembangan organisasi dapat dipantau secara menyeluruh.

- Membantu koordinasi tindak lanjut permasalahan organisasi.

## **B. Kesamaan hak ketiganya**

Ketiga jabatan mendapatkan dashboard monitoring dengan informasi yang sama.

| **Informasi** | **Akses** |
| --- | --- |
| Struktur organisasi | Melihat |
| Bidang & kompartemen | Monitoring |
| Program kerja | Monitoring |
| Progres organisasi | Monitoring |
| Persuratan | Monitoring |
| Keuangan | Monitoring |
| Agenda & kalender | Melihat |
| Penjualan tiket | Monitoring |
| Laporan organisasi | Melihat |
| Direktori kader | Sesuai kewenangan |

**Penting:** Hak monitoring bukan berarti otomatis berhak melakukan seluruh tindakan operasional.

Contohnya:

- Ketum dapat melihat pengajuan dana, tetapi persetujuan dan pencairan merupakan kewenangan Bendum.

- Waketum dapat melihat perkembangan surat, tetapi pengelolaan persuratan merupakan kewenangan Sekum.

- Sekjen dapat memantau seluruh proker, tetapi penutupan proker tetap menjadi kewenangan Kepala Kompartemen pemilik.

analisis arsitektur.docx

analisis arsitektur.docx

## **C. Ringkasan tanggung jawab**

| **Role** | **Tanggung jawab utama** |
| --- | --- |
| Ketua Umum | Memimpin organisasi |
| Wakil Ketua Umum | Membantu kepemimpinan |
| Sekretaris Jenderal | Mengawasi dan mengoordinasikan organisasi |

Ketiganya menggunakan satu pola dashboard Top Management, tanpa perlu membuat tiga sistem dashboard berbeda.

# **B. Sekretaris Umum & Bendahara Umum**

## **1. Sekretaris Umum (Sekum)**

Fokus utama

**Administrasi dan Persuratan**

**Tanggung jawab Sekum:**

1. Mengelola seluruh persuratan organisasi.

1. Memeriksa dan memproses pengajuan surat dari Bidang, Kompartemen, dan Proker.

1. Mengelola nomor dan kop surat.

1. Mengoordinasikan kebutuhan tanda tangan.

1. Mengelola pengajuan dan pencatatan dokumen Ditmawa.

1. Mengelola arsip dan riwayat persuratan.

1. Memantau kalender dan seluruh detail agenda organisasi.

**Kewenangan khusus:**

- Memeriksa kelengkapan administrasi surat.

- Memberikan catatan revisi.

- Menyelesaikan proses persuratan.

- Membuka kembali surat yang sudah selesai atau diarsipkan (*reopen*).

**Batasan:**

- Tidak menyetujui atau mencairkan dana.

- Tidak mengelola transaksi keuangan.

- Tidak mengambil alih pengelolaan Proker.

- Tidak menutup Proker.

**Gambaran dashboard Sekum**

- Overview

- Persuratan

- Pengajuan Ditmawa

- Agenda & Kalender

- Arsip Dokumen

- Statistik & Laporan

Sekum mempunyai akses melihat seluruh detail kalender organisasi, tetapi tidak otomatis memiliki hak mengubah semua agenda.

analisis arsitektur.docx

analisis arsitektur.docx

## **2. Bendahara Umum (Bendum)**

Fokus utama

**Keuangan dan Pengelolaan Dana**

**Tanggung jawab Bendum:**

1. Mengelola kas pusat organisasi.

1. Mencatat seluruh pemasukan dan pengeluaran.

1. Mengelola iuran pengurus dan dana Ditmawa.

1. Memeriksa dan menyetujui pengajuan dana.

1. Melakukan penyaluran atau pencairan dana.

1. Memantau keuangan Bidang, Kompartemen, dan Proker.

1. Memantau pendapatan tiket kegiatan.

1. Menyusun laporan dan rekonsiliasi keuangan.

1. Memantau kalender dan seluruh detail agenda organisasi.

**Kewenangan khusus:**

- Menyetujui pengajuan dana tanpa persetujuan tambahan Ketum.

- Menyetujui nominal sesuai pengajuan atau nominal lebih kecil.

- Mencairkan dana sekaligus atau bertahap.

- Mencatat transfer dana internal.

- Memantau saldo dan transaksi seluruh unit.

**Batasan:**

- Tidak mengelola persuratan sebagai Sekum.

- Tidak memverifikasi bukti pembayaran tiket atau Media Partner.

- Tidak mengambil alih operasional Proker.

- Tidak menutup Proker atau LPJ.

**Gambaran dashboard Bendum**

- Overview

- Kas Pusat

- Pengajuan Dana

- Transfer Internal

- Monitoring Keuangan Unit

- Agenda & Pendapatan Tiket

- Laporan & Rekonsiliasi

- Kalender Organisasi

Bendum memonitor keuangan Proker, tetapi pengelolaan operasional dan penutupan Proker tetap menjadi kewenangan Kepala Kompartemen.

analisis arsitektur.docx

analisis arsitektur.docx

## **3. Perbedaan tanggung jawab Sekum dan Bendum**

Ini yang paling penting agar tidak terjadi tumpang tindih.

| **Aktivitas** | **Sekum** | **Bendum** |
| --- | --- | --- |
| Mengelola persuratan | Utama | — |
| Nomor dan kop surat | Utama | — |
| Pengajuan Ditmawa | Utama | Monitoring dana terkait |
| Arsip surat | Utama | — |
| Kas pusat | — | Utama |
| Pengajuan dana | — | Utama |
| Persetujuan dana | — | Utama |
| Pencairan dana | — | Utama |
| Monitoring keuangan unit | — | Utama |
| Pendapatan tiket | Melihat sesuai kebutuhan | Monitoring |
| Kalender organisasi | Melihat penuh | Melihat penuh |

Keduanya sama-sama dapat melihat seluruh detail agenda dan kalender organisasi. Namun, hak melihat tidak otomatis berarti hak mengelola agenda milik unit lain.

analisis arsitektur.docx

## **4. Ringkasan Role & Responsibility**

**Sekretaris Umum**

Sekum

# **Mengurus administrasi organisasi.**

Fokus pada surat, dokumen, Ditmawa, arsip, dan kalender organisasi.

**Bendahara Umum**

Bendum

# **Mengurus keuangan organisasi.**

Fokus pada kas pusat, pengajuan dana, pencairan, monitoring keuangan, dan laporan.

# **C. Kepala Bidang (Kabid)**

Fokus utama

**Mengelola dan Mengawasi Bidang**

Menurutku, Kepala Bidang memiliki posisi sebagai penghubung antara Top Management dan Kompartemen yang berada di bawah bidangnya.

### **1. Tanggung jawab Kepala Bidang**

1. Mengelola dan mengoordinasikan kegiatan bidang.

1. Memantau kinerja dan progres seluruh kompartemen di bawahnya.

1. Memantau pelaksanaan program kerja di bawah bidangnya.

1. Mengelola agenda dan kegiatan bidang.

1. Mengelola keuangan bidang.

1. Mengajukan persuratan kepada Sekum.

1. Mengajukan kebutuhan dana kepada Bendum.

1. Memantau laporan dan perkembangan unit di bawahnya.

### **2. Kewenangan Kepala Bidang**

- Melihat dashboard dan statistik bidang.

- Memantau seluruh kompartemen di bawahnya.

- Memantau seluruh Proker di bawah bidangnya.

- Melihat detail agenda dan kalender organisasi.

- Membuat dan mengelola agenda bidang.

- Mengakses laporan unit di bawahnya.

- Mengelola operasional bidang sesuai kewenangannya.

**Gambaran Dashboard Kepala Bidang**

- Overview Bidang

- Struktur Bidang

- Monitoring Kompartemen

- Monitoring Program Kerja

- Agenda & Kalender

- Keuangan Bidang

- Persuratan

- Laporan & Statistik

### **3. Batasan kewenangan**

Ini penting supaya tidak tumpang tindih dengan Kepala Kompartemen, Sekum, dan Bendum.

| **Aktivitas** | **Kepala Bidang** |
| --- | --- |
| Monitoring kompartemen | Boleh |
| Monitoring Proker | Boleh |
| Mengelola agenda bidang | Boleh |
| Mengajukan surat | Boleh |
| Mengajukan dana | Boleh |
| Mengambil alih workspace kompartemen | Tidak otomatis |
| Menyetujui pencairan dana | Tidak |
| Menutup Proker | Tidak |

**Prinsip penting:** Kepala Bidang bertanggung jawab atas pengawasan bidang, bukan mengambil alih seluruh pekerjaan operasional kompartemen.

Kepala Kompartemen tetap memiliki kendali penuh atas kompartemennya, termasuk pengelolaan Proker dan penutupannya.

analisis arsitektur.docx

## **4. Ringkasan tanggung jawab**

**Kepala Bidang**

Kabid

# **Mengelola dan mengawasi bidang.**

Memastikan kompartemen dan program kerja di bawah bidangnya berjalan sesuai arah organisasi, sekaligus mengelola agenda dan administrasi bidang.

# **D. Kepala Kompartemen (Kakom)**

Fokus utama

**Mengelola Operasional Kompartemen**

Menurutku, Kepala Kompartemen merupakan salah satu role paling penting karena menjadi penanggung jawab langsung seluruh kegiatan dan program kerja di bawah kompartemennya.

## **1. Tanggung jawab Kepala Kompartemen**

1. Mengelola dan mengoordinasikan seluruh aktivitas kompartemen.

1. Membuat dan mengelola program kerja.

1. Menunjuk serta mengelola Pengelola Proker.

1. Menambahkan dan mengelola anggota tim.

1. Memantau progres kompartemen dan seluruh Proker.

1. Mengelola pleno dan rapat kompartemen.

1. Mengelola agenda dan kalender kompartemen.

1. Mengelola kebutuhan keuangan kompartemen.

1. Mengajukan persuratan kepada Sekum.

1. Mengajukan kebutuhan dana kepada Bendum.

## **2. Kewenangan Kepala Kompartemen**

Ini yang membedakannya dengan Kepala Bidang.

- Memiliki akses penuh terhadap workspace kompartemennya.

- Membuat program kerja baru.

- Menunjuk dan mencabut penugasan Pengelola Proker.

- Menambahkan anggota roster Proker.

- Mengelola progres kompartemen.

- Memantau seluruh Proker di bawahnya.

- Mengelola dokumen dan administrasi kompartemen.

- Menutup atau mengarsipkan Proker.

**Gambaran Dashboard Kepala Kompartemen**

- Overview Kompartemen

- Staff & Tim

- Program Kerja

- Progres Kompartemen

- Pleno & Rapat

- Agenda & Kalender

- Keuangan

- Persuratan

- Statistik & Laporan

## **3. Batasan kewenangan**

| **Aktivitas** | **Kepala Kompartemen** |
| --- | --- |
| Mengelola kompartemennya | Boleh |
| Membuat Proker | Boleh |
| Menunjuk Pengelola Proker | Boleh |
| Mengelola roster | Boleh |
| Menutup Proker | Boleh |
| Mengelola kompartemen lain | Tidak |
| Menyetujui pencairan dana | Tidak |
| Memproses persuratan sebagai Sekum | Tidak |
| Mengatur permission sistem global | Tidak |

**Prinsip penting:** Kepala Kompartemen mempunyai kendali penuh terhadap kompartemennya sendiri, tetapi tidak mengambil alih kewenangan Sekum, Bendum, Admin, atau kompartemen lain.

analisis arsitektur.docx

## **4. Perbedaan Kepala Bidang dan Kepala Kompartemen**

| **Aspek** | **Kepala Bidang** | **Kepala Kompartemen** |
| --- | --- | --- |
| Fokus | Pengawasan bidang | Operasional kompartemen |
| Monitoring kompartemen | Seluruh di bawah bidang | Kompartemennya sendiri |
| Membuat Proker | Tidak menjadi kewenangan otomatis | Ya |
| Menunjuk Pengelola Proker | Tidak | Ya |
| Mengelola roster | Tidak otomatis | Ya |
| Menutup Proker | Tidak | Ya |
| Mengelola pleno | Monitoring sesuai kebutuhan | Ya |

## **5. Ringkasan tanggung jawab**

**Kepala Kompartemen**

Kakom

# **Mengelola seluruh operasional kompartemen.**

Bertanggung jawab atas tim, program kerja, progres, agenda, dan administrasi kompartemen.

# **E. Staff**

Fokus utama

**Membantu Operasional Organisasi**

## **1. Tanggung jawab Staff**

Secara umum, Staff bertanggung jawab untuk:

1. Membantu Kepala Bidang atau Kepala Kompartemen menjalankan kegiatan.

1. Melaksanakan tugas sesuai penempatan.

1. Memperbarui progres pekerjaan.

1. Mengelola dokumen dan administrasi sesuai tugas.

1. Membantu persiapan dan pelaksanaan agenda.

1. Menyampaikan laporan perkembangan pekerjaan.

## **2. Perbedaan berdasarkan penempatan**

Kita tidak membuat role baru. Cukup membedakan lingkup kerjanya.

| **Penempatan** | **Lingkup tanggung jawab** |
| --- | --- |
| Staff Bidang | Membantu kegiatan, administrasi, agenda, dan progres bidang. |
| Staff Kompartemen | Membantu kegiatan, administrasi, agenda, dan progres kompartemen. |

## **3. Hak akses Staff**

- Melihat dashboard sesuai penempatan.

- Mengakses workspace sesuai tugas.

- Menginput dan memperbarui progres.

- Mengelola dokumen sesuai izin.

- Mengakses agenda dan data yang diberikan.

- Mengakses keuangan apabila diberikan permission khusus.

**Contoh tampilan dashboard Staff**

- Dashboard Saya

- Workspace Saya

- Tugas & Progres

- Agenda

- Dokumen

- Notifikasi

## **4. Batasan kewenangan**

| **Aktivitas** | **Staff** |
| --- | --- |
| Melaksanakan tugas | Boleh |
| Menginput progres | Boleh |
| Mengelola dokumen sesuai izin | Boleh |
| Mengelola seluruh kompartemen | Tidak |
| Mengubah penugasan Pengelola Proker | Tidak |
| Menutup Proker | Tidak |
| Menyetujui pencairan dana | Tidak |
| Mengubah permission sistem | Tidak |

**Prinsip penting:** Staff membantu menjalankan pekerjaan, bukan mengambil alih kewenangan Kepala Bidang atau Kepala Kompartemen.

Hak akses tambahan seperti Publisher boleh diberikan melalui permission tanpa membuat role Staff baru.

analisis arsitektur.docx

## **5. Ringkasan tanggung jawab**

**Staff**

Satu Role

# **Membantu operasional sesuai penempatan.**

Tanggung jawab dan akses mengikuti apakah Staff ditempatkan di Bidang atau Kompartemen.

# **F. Pengelola Proker**

Fokus utama

**Mengelola Pelaksanaan Program Kerja**

## **1. Tanggung jawab Pengelola Proker**

1. Mengelola dan menjalankan program kerja yang ditugaskan.

1. Mengelola anggota tim dan roster Proker.

1. Menginput dan memperbarui perkembangan Proker.

1. Mengelola agenda dan tiket kegiatan.

1. Mengajukan kebutuhan persuratan kepada Sekum.

1. Mengajukan kebutuhan dana kepada Bendum.

1. Mengelola administrasi dan keuangan Proker.

1. Mengelola dokumen dan laporan pertanggungjawaban (LPJ).

## **2. Kewenangan Pengelola Proker**

- Mengakses workspace Proker yang ditugaskan.

- Menambahkan dan mengelola anggota tim.

- Mengatur jabatan kepanitiaan anggota.

- Mengunggah logo Proker.

- Mengelola timeline dan progres.

- Membuat agenda dan mengelola tiket.

- Mengajukan surat dan dana.

- Mengelola dokumen serta LPJ.

Satu Proker boleh memiliki beberapa Pengelola Proker, dan satu orang boleh mengelola beberapa Proker sekaligus.

## **3. Persyaratan menjadi Pengelola Proker**

**Persyaratan wajib**

- Memiliki akun HIPMI CENTRAL.

- Merupakan kader HIPMI aktif.

- Status kader sudah terverifikasi.

- Ditunjuk oleh Kepala Kompartemen pemilik Proker.

Penunjukan hanya dilakukan oleh Kepala Kompartemen. Pengelola Proker tidak boleh menunjuk Pengelola Proker lainnya.

## **4. Batasan kewenangan**

| **Aktivitas** | **Pengelola Proker** |
| --- | --- |
| Mengelola workspace Proker | Boleh |
| Mengelola anggota tim | Boleh |
| Mengelola agenda dan tiket | Boleh |
| Mengajukan surat dan dana | Boleh |
| Mengelola dokumen dan LPJ | Boleh |
| Menunjuk Pengelola Proker lain | Tidak |
| Menyetujui pencairan dana | Tidak |
| Menutup Proker | Tidak |

**Prinsip penting:** Pengelola Proker memiliki kendali operasional terhadap Proker yang ditugaskan, tetapi tidak memiliki kewenangan struktural untuk menunjuk pengelola lain atau menutup Proker.

Penutupan Proker tetap menjadi kewenangan Kepala Kompartemen pemilik. Persetujuan surat tetap Sekum dan persetujuan serta pencairan dana tetap Bendum.

analisis arsitektur.docx

prd\_master.md

## **5. Perbedaan Pengelola Proker dan Anggota Tim**

Ini perlu diperjelas karena keduanya sama-sama terdaftar dalam roster.

| **Aspek** | **Pengelola Proker** | **Anggota Tim** |
| --- | --- | --- |
| Status | Penugasan pengelola | Keanggotaan Proker |
| Harus kader | Ya | Tidak |
| Harus punya akun | Ya | Tidak wajib |
| Mengelola roster | Ya | Tidak |
| Mengelola progres | Ya | Sesuai tugas |
| Mengelola agenda | Ya | Tidak otomatis |
| Mengakses workspace | Penuh sesuai permission | Terbatas |
| Menutup Proker | Tidak | Tidak |

prd\_master.md

analisis arsitektur.docx

## **6. Ringkasan tanggung jawab**

**Pengelola Proker**

Operational Assignment

# **Mengelola pelaksanaan program kerja.**

Bertanggung jawab atas tim, progres, agenda, administrasi, keuangan operasional, dan laporan Proker yang ditugaskan.

# **G. Admin Sistem**

Fokus utama

**Mengelola Sistem dan Administrasi Platform**

## **1. Tanggung jawab Admin Sistem**

Aku membaginya menjadi dua kelompok besar sesuai keputusan kita.

**A. Pengelolaan Struktur & Akun**

1. Mengelola seluruh kabinet.

1. Membuat dan mengatur struktur bidang serta kompartemen.

1. Mengatur master jabatan organisasi.

1. Mengelola akun pengguna secara global.

1. Mengelola data dan verifikasi kader.

1. Menetapkan pengurus ke dalam jabatan sesuai kabinet.

**B. Pengelolaan Sistem & Akses**

1. Mengatur Role & Permission setiap kabinet.

1. Mengatur konfigurasi modul setiap kabinet.

1. Mengatur hak akses pengelola CMS.

1. Memantau aktivitas dan perubahan sistem melalui Audit Log.

1. Mengelola pengaturan administrasi platform.

analisis arsitektur.docx

analisis arsitektur.docx

## **2. Kewenangan Admin**

| **Aktivitas** | **Admin** |
| --- | --- |
| Membuat kabinet | Boleh |
| Mengarsipkan kabinet | Boleh |
| Mengelola bidang & kompartemen | Boleh |
| Mengatur jabatan | Boleh |
| Mengelola akun global | Boleh |
| Memverifikasi kader | Boleh |
| Menetapkan pengurus | Boleh |
| Mengatur permission | Boleh |
| Mengatur modul kabinet | Boleh |
| Menunjuk Pengelola Proker | Tidak |
| Menyetujui surat sebagai Sekum | Tidak |
| Menyetujui pencairan dana sebagai Bendum | Tidak |
| Menutup Proker | Tidak |

## **3. Bagaimana pembagian area Admin?**

Kita mengikuti keputusan navigasi sebelumnya.

**1. Cabinet Center**

Tanpa Sidebar

- Melihat seluruh kabinet.

- Menambahkan kabinet.

- Mengelola status kabinet.

- Membuka kabinet aktif.

- Melihat arsip kabinet.

**2. Manajemen Akun Global**

Global

- Mengelola seluruh akun.

- Mengelola status akun.

- Mengelola data kader.

- Memverifikasi hubungan akun dengan data kader.

**3. Cabinet Dashboard**

Per kabinet

- Mengelola struktur organisasi.

- Mengelola jabatan dan penempatan pengurus.

- Mengatur Role & Permission.

- Mengatur konfigurasi modul.

- Mengelola akses CMS.

- Memantau Audit Log.

Penting: akun dan identitas pengguna dikelola secara global. Penempatan jabatan, struktur, dan konfigurasi akses mengikuti kabinet yang dipilih.

## **4. Batasan Admin Sistem**

Ada prinsip yang wajib kita pertahankan:

- Admin tidak otomatis menjadi pengurus organisasi.

- Admin tidak otomatis mendapatkan akses Organization Management.

- Admin tidak mengambil alih pekerjaan Sekum dan Bendum.

- Admin tidak menunjuk Pengelola Proker.

- Admin tidak mengambil keputusan operasional organisasi.

- Admin mengatur akses CMS, sedangkan pembuatan konten dan publikasi dilakukan pengurus yang ditugaskan.

Admin boleh mempunyai jabatan organisasi juga, tetapi akses tersebut harus berasal dari penugasan tersendiri, bukan karena status Admin.

analisis arsitektur.docx

analisis arsitektur.docx

## **5. Ringkasan tanggung jawab**

**Admin Sistem**

System Administration

# **Mengelola struktur, akun, dan konfigurasi platform.**

Bertanggung jawab atas kabinet, akun, kader, struktur organisasi, Role & Permission, konfigurasi modul, serta pengawasan sistem.

# **03. Matriks Akses dan Kewenangan**

## **1. Prinsip dasar akses**

Menurutku, kita cukup menggunakan lima jenis kewenangan utama.

| **Kewenangan** | **Fungsi** |
| --- | --- |
| **View** | Melihat informasi dan data. |
| **Create** | Membuat atau mengajukan sesuatu. |
| **Edit** | Mengubah atau memperbarui data. |
| **Approve / Publish** | Menyetujui atau memublikasikan. |
| **Close** | Menutup atau mengarsipkan pekerjaan. |

Tidak semua role harus memiliki kelima kewenangan tersebut.

Contohnya:

- Staff bisa membuat dan memperbarui progres.

- Sekum memproses persuratan.

- Bendum menyetujui dan mencairkan dana.

- Publisher memublikasikan konten.

- Kepala Kompartemen menutup Proker.

## **2. Matriks akses berdasarkan area website**

Ini rancangan awal yang kita gunakan.

| **Pengguna** | **Public Website** | **Personal Area** | **Organization** | **Admin Panel** |
| --- | --- | --- | --- | --- |
| Pengunjung | View | — | — | — |
| Mahasiswa Biasa | View | Ya | — | — |
| Kader HIPMI | View | Ya | — | — |
| Anggota Tim Proker | View | Ya | — | — |
| Pengelola Proker | View | Ya | Ya | — |
| Staff | View | Ya | Ya | — |
| Pengurus Struktural | View | Ya | Ya | — |
| Admin Sistem | View | Ya | Jika punya penugasan | Ya |

Catatan: akses Organization hanya berlaku selama penugasan dalam kabinet aktif.

## **3. Matriks akses berdasarkan workspace**

Sekarang kita bedakan akses dashboard organisasi dan workspace.

| **Role** | **Dashboard Organisasi** | **Workspace Kompartemen** | **Workspace Proker** |
| --- | --- | --- | --- |
| Ketua Umum | Monitoring | Monitoring | Monitoring |
| Wakil Ketua Umum | Monitoring | Monitoring | Monitoring |
| Sekjen | Monitoring | Monitoring | Monitoring |
| Sekum | Administrasi | Sesuai kebutuhan administrasi | Sesuai kebutuhan administrasi |
| Bendum | Keuangan | Monitoring keuangan | Monitoring keuangan |
| Kepala Bidang | Dashboard bidang | Monitoring | Monitoring |
| Kepala Kompartemen | Dashboard kompartemen | Kelola | Kelola Proker bawahannya |
| Staff | Sesuai penempatan | Sesuai penempatan | Sesuai penugasan |
| Pengelola Proker | Dashboard operasional | — | Kelola Proker yang ditugaskan |
| Anggota Tim Proker | — | — | Informasi keterlibatan terbatas |

Ini masih rancangan awal untuk kita validasi. Monitoring tidak berarti dapat mengubah atau mengambil alih pekerjaan unit lain.

## **4. Batas kewenangan khusus**

Ada beberapa tindakan yang harus mempunyai pemilik yang jelas.

| **Tindakan** | **Role yang berwenang** |
| --- | --- |
| Menunjuk Pengelola Proker | Kepala Kompartemen |
| Mengelola roster Proker | Kepala Kompartemen dan Pengelola Proker |
| Menutup Proker | Kepala Kompartemen |
| Memproses persuratan | Sekum |
| Reopen surat | Sekum |
| Menyetujui pencairan dana | Bendum |
| Mengelola akun global | Admin Sistem |
| Memverifikasi kader | Admin Sistem |
| Mengatur permission kabinet | Admin Sistem |
| Publish konten | Publisher yang ditugaskan |

RINGKASAN LENGKAP

# **03. MASTER ACCESS & AUTHORITY MATRIX**

HIPMI CENTRAL · Access Control & Authorization Specification

## **1. Jenis akses yang digunakan**

Kita cukup menggunakan lima kategori akses.

| **Jenis akses** | **Fungsi** |
| --- | --- |
| View | Melihat informasi dan data. |
| Create | Membuat atau mengajukan sesuatu. |
| Edit | Mengubah atau memperbarui data. |
| Approve / Publish | Menyetujui atau memublikasikan. |
| Close | Menutup atau mengarsipkan pekerjaan. |

Tidak semua pengguna harus mendapatkan seluruh jenis akses.

## **2. Matriks akses berdasarkan pengguna**

Ini merupakan ringkasan utama seluruh keputusan kita.

| **Pengguna / Role** | **Area akses** | **Lingkup akses** |
| --- | --- | --- |
| Pengunjung | Public Website | Seluruh informasi publik |
| Mahasiswa Biasa | Personal Area | Aktivitas pribadi |
| Kader HIPMI | Personal Area | Profil dan aktivitas kader |
| Anggota Tim Proker | Personal Area | Informasi dan tugas pribadi |
| Ketua Umum | Organization | Monitoring seluruh organisasi |
| Wakil Ketua Umum | Organization | Monitoring seluruh organisasi |
| Sekretaris Jenderal | Organization | Monitoring seluruh organisasi |
| Sekretaris Umum | Organization | Persuratan lintas unit |
| Bendahara Umum | Organization | Keuangan lintas unit |
| Kepala Bidang | Organization | Monitoring bidang dan unit bawahannya |
| Kepala Kompartemen | Organization | Pengelolaan kompartemen dan Proker bawahannya |
| Staff | Organization | Sesuai penempatan dan penugasan |
| Pengelola Proker | Organization | Pengelolaan Proker yang ditugaskan |
| Admin Sistem | System Administration | Pengelolaan platform |

Catatan: satu pengguna dapat mempunyai beberapa penugasan dalam satu kabinet aktif. Admin juga dapat memiliki penugasan organisasi tersendiri apabila memang ditunjuk.

## **3. Matriks akses per role**

### **A. Top Management**

MONITOR PENUH

| **Area** | **Kewenangan** |
| --- | --- |
| Dashboard organisasi | View |
| Seluruh Workspace Kompartemen | View |
| Seluruh Workspace Proker | View |
| Progres dan timeline | View |
| Dokumen dan laporan | View |
| Persuratan | View |
| Keuangan | View |
| Agenda dan kalender | View |

**Batasan:** Tidak mengubah pekerjaan operasional, memproses surat sebagai Sekum, menyetujui dana sebagai Bendum, atau menutup Proker.

Ketiga jabatan menggunakan pola dashboard yang sama.

### **B. Sekretaris Umum (Sekum)**

ADMINISTRASI LINTAS UNIT

| **Area** | **Kewenangan** |
| --- | --- |
| Seluruh Bidang | Akses persuratan |
| Seluruh Kompartemen | Akses persuratan |
| Seluruh Proker | Akses persuratan |
| Pengajuan surat | View, Edit, Process |
| Arsip surat | View, Manage |
| Reopen surat | Boleh |
| Kalender organisasi | View penuh |
| Keuangan | View sesuai kebutuhan |

**Batasan:** Tidak mengelola operasional kompartemen atau Proker.

### **C. Bendahara Umum (Bendum)**

KEUANGAN LINTAS UNIT

| **Area** | **Kewenangan** |
| --- | --- |
| Seluruh Bidang | Akses keuangan |
| Seluruh Kompartemen | Akses keuangan |
| Seluruh Proker | Akses keuangan |
| Pengajuan dana | View, Process |
| Persetujuan dana | Approve |
| Pencairan dana | Boleh |
| Monitoring transaksi | View, Manage |
| Kalender organisasi | View penuh |
| Persuratan | View sesuai kebutuhan |

**Batasan:** Tidak mengelola operasional Proker atau memproses persuratan sebagai Sekum.

### **D. Kepala Bidang**

MONITORING BIDANG

| **Area** | **Kewenangan** |
| --- | --- |
| Dashboard bidang | View, Manage bidang |
| Kompartemen bawahannya | Monitoring penuh |
| Proker bawahannya | Monitoring penuh |
| Progres dan timeline | View |
| Dokumen dan laporan | View |
| Agenda bidang | Manage |
| Persuratan | Create, Edit pengajuan |
| Keuangan bidang | Monitoring dan pengajuan |

**Batasan:** Tidak mengambil alih pekerjaan operasional kompartemen, menunjuk Pengelola Proker, atau menutup Proker.

### **E. Kepala Kompartemen**

KELOLA PENUH

| **Area** | **Kewenangan** |
| --- | --- |
| Workspace Kompartemen sendiri | Kelola penuh |
| Seluruh Proker bawahannya | Kelola penuh |
| Staff dan tim | Kelola |
| Roster Proker | Kelola |
| Penunjukan Pengelola Proker | Boleh |
| Timeline dan progres | Kelola |
| Agenda dan tiket | Kelola |
| Persuratan | Create, Edit pengajuan |
| Keuangan | Create, Edit pengajuan |
| Penutupan Proker | Close |

**Batasan:** Tidak mengelola kompartemen lain, menyetujui pencairan dana, atau mengambil alih kewenangan Sekum dan Bendum.

### **F. Staff**

AKSES TERBATAS

| **Area** | **Kewenangan** |
| --- | --- |
| Workspace sesuai penempatan | View |
| Tugas yang diberikan | View, Edit |
| Progres pekerjaan | Create, Edit |
| Dokumen | Sesuai permission |
| Agenda | Sesuai permission |
| Keuangan | Sesuai permission |

**Batasan:** Tidak otomatis mengelola seluruh workspace, menunjuk Pengelola Proker, menyetujui dana, atau menutup Proker.

Staff Bidang dan Staff Kompartemen tetap satu role. Penempatan menentukan lingkup akses.

### **G. Pengelola Proker**

KELOLA PENUH PROKER

| **Area** | **Kewenangan** |
| --- | --- |
| Workspace Proker yang ditugaskan | Kelola penuh |
| Timeline dan progres | Create, Edit |
| Roster dan anggota tim | Kelola |
| Agenda dan tiket | Kelola |
| Persuratan | Create, Edit pengajuan |
| Keuangan | Create, Edit pengajuan |
| Dokumen dan LPJ | Kelola |
| Penutupan Proker | Tidak |

**Batasan:** Tidak menunjuk Pengelola Proker lain, menyetujui pencairan dana, atau mengakses Proker yang tidak ditugaskan.

### **H. Anggota Tim Proker**

PERSONAL AREA SAJA

| **Area** | **Kewenangan** |
| --- | --- |
| Informasi Proker yang diikuti | View |
| Agenda kegiatan | View |
| Tugas pribadi | View, Edit |
| Progres tugas sendiri | Create, Edit |
| Hasil pekerjaan | Upload sesuai tugas |
| Dokumen internal lainnya | Tidak otomatis |

**Batasan:** Tidak mendapatkan Organization Management dan tidak mengelola Proker.

### **I. Admin Sistem**

SYSTEM ADMINISTRATION

| **Area** | **Kewenangan** |
| --- | --- |
| Cabinet Center | Kelola |
| Manajemen Akun Global | Kelola |
| Kabinet Active | Administrasi penuh |
| Kabinet Archived | Lihat dan kelola arsip |
| Struktur Organisasi | Kelola |
| Jabatan dan Pengurus | Kelola |
| Manajemen Kader | Kelola dan verifikasi |
| Role & Permission | Kelola per kabinet |
| Konfigurasi Modul | Kelola per kabinet |
| Audit Log | View dan monitor |
| Konfigurasi CMS | Kelola akses |
| Aktivitas publikasi | Monitor dan audit |

**Batasan:** Tidak otomatis menjadi pengurus, Publisher, Sekum, Bendum, atau Pengelola Proker.

## **4. Matriks kewenangan khusus**

Bagian ini penting karena beberapa tindakan hanya boleh dilakukan oleh role tertentu.

| **Tindakan** | **Penanggung jawab** |
| --- | --- |
| Menetapkan arah organisasi | Ketua Umum |
| Monitoring organisasi | Top Management |
| Mengelola seluruh persuratan | Sekum |
| Reopen surat | Sekum |
| Menyetujui pengajuan dana | Bendum |
| Mencairkan dana | Bendum |
| Mengawasi bidang | Kepala Bidang |
| Mengelola kompartemen | Kepala Kompartemen |
| Menunjuk Pengelola Proker | Kepala Kompartemen |
| Mengelola roster Proker | Kepala Kompartemen / Pengelola Proker |
| Menutup Proker | Kepala Kompartemen |
| Mengelola Proker | Pengelola Proker |
| Mengelola akun global | Admin Sistem |
| Memverifikasi kader | Admin Sistem |
| Mengatur permission | Admin Sistem |
| Membuat konten website | Pengurus yang ditugaskan |
| Publish / Unpublish | Publisher yang ditugaskan |
| Mengatur akses CMS | Admin Sistem |

## **5. Aturan akses lintas kabinet dan penugasan**

Ini berlaku untuk semua role.

**Aturan kabinet**

- Hanya satu kabinet yang berstatus Active dalam satu periode.

- Satu pengguna hanya boleh memiliki penugasan organisasi aktif dalam satu kabinet.

- Satu pengguna boleh memiliki beberapa jabatan atau penugasan dalam kabinet tersebut.

- Setiap kabinet mempunyai konfigurasi modul dan permission sendiri.

- Kabinet Archived hanya dapat dilihat dan dikelola Admin.

**Ketika kabinet berakhir**

**Organization Access**

Berakhir

Workspace aktif tidak lagi tampil pada dashboard pengguna.

**Personal Area**

Tetap aktif

Profil, akun, dan riwayat pribadi tetap tersedia.

## **6. Mekanisme Publisher**

Publisher bukan role baru.

- Pengurus yang ditugaskan sebagai Content Creator dapat membuat dan mengedit konten.

- Pengurus yang diberikan permission Publisher dapat memeriksa dan memublikasikan konten.

- Admin mengatur permission serta mengawasi aktivitas publikasi.

- Admin tidak wajib menyetujui setiap konten.

Permission publikasi mengikuti kabinet masing-masing.

# **7. Hasil final matriks akses**

# **Access Control Summary**

# **5**

Jenis kewenangan utama

# **9**

Kelompok role yang dimatangkan dalam matriks akses

Keputusan akses disepakati

**Seluruh kelompok pengguna sudah memiliki batas akses dan kewenangan utama.**

Matriks ini merupakan spesifikasi bisnis awal. Detail permission per tombol dan halaman akan ditetapkan ketika kita membahas fitur masing-masing modul.

MANTAP! Kita kunci pilihan **MONITOR PENUH untuk Top Management**. Selanjutnya kita masuk ke Sekum dan Bendum.

# **03. Matriks Akses dan Kewenangan**

## **A. Top Management**

DIKUNCI — MONITOR PENUH

Ketum, Waketum, dan Sekjen memiliki akses untuk:

- Melihat seluruh Dashboard Organisasi.

- Membuka seluruh Workspace Kompartemen.

- Membuka seluruh Workspace Proker.

- Melihat detail progres, dokumen, agenda, dan laporan.

- Memantau persuratan dan keuangan.

- Melihat kalender organisasi secara penuh.

**Batasan:** akses tersebut bersifat monitoring (read-only). Mereka tidak otomatis dapat mengubah pekerjaan operasional, menyetujui surat sebagai Sekum, mencairkan dana sebagai Bendum, atau menutup Proker.

## **B. Sekretaris Umum (Sekum) & Bendahara Umum (Bendum)**

Menurutku, kedua role ini sebaiknya memiliki **akses lintas unit berdasarkan fungsi pekerjaannya**, bukan akses penuh untuk mengelola seluruh workspace.

**Sekretaris Umum**

Administrasi

Bisa mengakses:

- Seluruh pengajuan persuratan dari Bidang, Kompartemen, dan Proker.

- Detail dan lampiran surat.

- Proses revisi dan penyelesaian surat.

- Arsip dan riwayat persuratan.

- Kalender organisasi secara penuh.

Tidak bisa mengambil alih progres, roster, dan operasional Proker.

**Bendahara Umum**

Keuangan

Bisa mengakses:

- Seluruh pengajuan dana dari Bidang, Kompartemen, dan Proker.

- Detail transaksi dan bukti pendukung.

- Persetujuan dan pencairan dana.

- Monitoring kas dan keuangan seluruh unit.

- Pendapatan tiket kegiatan.

- Kalender organisasi secara penuh.

Tidak bisa mengambil alih progres, roster, dan operasional Proker.

### **Perbandingan akses**

| **Area** | **Sekum** | **Bendum** |
| --- | --- | --- |
| Dashboard organisasi | Administrasi | Keuangan |
| Workspace Kompartemen | Data surat | Data keuangan |
| Workspace Proker | Data surat | Data keuangan |
| Persuratan | Kelola penuh | Lihat sesuai kebutuhan |
| Keuangan | Lihat sesuai kebutuhan | Kelola penuh |
| Kalender organisasi | Lihat penuh | Lihat penuh |
| Monitoring seluruh unit | Administrasi | Keuangan |

## **B. Keputusan final akses Sekum & Bendum**

**Sekretaris Umum**

Cross-Unit Access

Mengelola seluruh persuratan dari:

- Semua Bidang

- Semua Kompartemen

- Semua Proker

Kewenangan: memeriksa, merevisi, memproses, menyelesaikan, dan reopen surat.

**Bendahara Umum**

Cross-Unit Access

Mengelola dan memantau keuangan dari:

- Semua Bidang

- Semua Kompartemen

- Semua Proker

Kewenangan: memeriksa pengajuan, menyetujui, mencairkan, dan memantau transaksi.

### **Aturan penting**

Mereka memiliki akses lintas unit berdasarkan fungsi, bukan mengambil alih seluruh operasional unit.

Contohnya:

- Sekum dapat memproses surat Proker Business Expo tanpa menjadi anggota workspace Business Expo.

- Bendum dapat menyetujui dana Proker Business Expo tanpa menjadi pengelola Proker tersebut.

Dikunci

Top Management = Monitoring penuh. Sekum = Administrasi lintas unit. Bendum = Keuangan lintas unit.

## **C. Kepala Bidang —**

## **Dikunci**

## **Akses: Monitoring penuh dalam lingkup bidangnya sendiri.**

## **Kepala Bidang dapat:**

## **Membuka seluruh Workspace Kompartemen di bawah bidangnya.**

## **Membuka seluruh Workspace Proker di bawah bidangnya.**

## **Melihat detail aktivitas, progres, dokumen, agenda, dan laporan.**

## **Memantau perkembangan seluruh kompartemen.**

## **Memantau keuangan dan persuratan bidang.**

## **Batasan: Bersifat read-only untuk operasional unit. Tidak otomatis dapat mengubah pekerjaan Kompartemen, mengelola roster, menunjuk Pengelola Proker, atau menutup Proker.**

## **D. Kepala Kompartemen —**

## **Dikunci**

**Akses: Kelola penuh dalam lingkup kompartemennya sendiri.**

Kepala Kompartemen dapat:

- Mengelola Workspace Kompartemen sendiri.

- Mengelola seluruh Workspace Proker di bawahnya.

- Mengelola Staff dan anggota tim.

- Membuat dan mengelola Proker.

- Menunjuk Pengelola Proker.

- Mengelola roster.

- Menutup Proker.

- Mengajukan surat kepada Sekum.

- Mengajukan dana kepada Bendum.

Batasan:

- Tidak mengelola kompartemen lain.

- Tidak menyetujui pencairan dana.

- Tidak mengambil alih kewenangan Sekum dan Bendum.

## **E. Staff —**

## **Dikunci**

**Akses: Terbatas sesuai penempatan dan penugasan.**

Ketentuannya:

- Dapat membuka Workspace Bidang atau Kompartemen sesuai penempatan.

- Dapat melihat tugas dan pekerjaan.

- Dapat memperbarui progres tugas.

- Dapat mengunggah dan mengelola dokumen sesuai izin.

- Dapat menggunakan fitur lain sesuai penugasan.

**Batasan:**

- Tidak otomatis mengelola seluruh workspace.

- Tidak menunjuk Pengelola Proker.

- Tidak menyetujui pencairan dana.

- Tidak menutup Proker.

## **F. Pengelola Proker —**

## **Dikunci**

**Akses: Kelola penuh terhadap Proker yang ditugaskan.**

- Mengelola timeline dan progres.

- Mengelola roster dan anggota tim.

- Mengelola agenda dan tiket.

- Mengelola dokumen dan LPJ.

- Mengajukan surat kepada Sekum.

- Mengajukan dana kepada Bendum.

Batasan:

- Tidak menunjuk Pengelola Proker lain.

- Tidak menyetujui pencairan dana.

- Tidak menutup Proker.

- Tidak mengakses Proker lain yang tidak ditugaskan.

## **G. Anggota Tim Proker —**

## **Dikunci**

**Akses: Terbatas melalui Personal Area.**

Anggota Tim dapat:

- Melihat informasi Proker yang diikuti.

- Melihat agenda kegiatan.

- Melihat tugas pribadi.

- Memperbarui progres tugas sendiri.

- Mengunggah hasil pekerjaan sesuai penugasan.

Tidak dapat:

- Mengakses Organization Management.

- Mengelola roster.

- Mengelola keseluruhan Proker.

- Mengajukan atau menyetujui dana.

- Menutup Proker.

Anggota Tim boleh kader maupun mahasiswa biasa.

| **No.** | **Modul** | **Fokus** |
| --- | --- | --- |
| 1 | Public Website | Informasi publik HIPMI |
| 2 | Personal Area | Akun dan aktivitas pribadi |
| 3 | Organization Management | Pengelolaan organisasi |
| 4 | Workspace Kompartemen | Operasional kompartemen |
| 5 | Workspace Proker | Pelaksanaan program kerja |
| 6 | Admin Panel | Administrasi sistem |

# **MODUL 01 — PUBLIC WEBSITE**

Pengunjung umum

Tujuannya adalah menjadi pusat informasi dan publikasi HIPMI.

## **A. Struktur navigasi**

Berikut struktur navbar yang sudah kita sepakati sebelumnya.

**HIPMI CENTRAL**

**1. Beranda**

Halaman utama dan informasi terbaru.

**2. Tentang Kami**

Profil, visi, misi, dan informasi organisasi.

**3. Organisasi**

- Kabinet

- Bidang

- Kompartemen

- Program Kerja

**4. Aktivitas**

- Agenda & Tiket

- Berita & Artikel

- Media Partner

**5. Karya Kader**

- Bisnis Kader

- Prestasi Kader

**6. Kotak Suara**

Kanal aspirasi dan masukan.

Akun pengguna

Login / Daftar

## **B. Daftar fitur Public Website**

| **Halaman** | **Fitur utama** |
| --- | --- |
| Beranda | Informasi utama, agenda terdekat, berita terbaru |
| Tentang Kami | Profil, visi, misi, sejarah |
| Organisasi | Informasi kabinet dan struktur organisasi |
| Agenda & Tiket | Daftar agenda, pendaftaran, pembayaran, tiket |
| Berita & Artikel | Daftar dan detail publikasi |
| Media Partner | Pengajuan kerja sama dan cek status |
| Bisnis Kader | Direktori bisnis kader |
| Prestasi Kader | Publikasi prestasi kader |
| Kotak Suara | Pengiriman aspirasi dan masukan |

## **C. Dropdown Organisasi**

Kita buat satu halaman Organisasi yang mempunyai empat tingkatan navigasi.

| **Dropdown** | **Isi yang ditampilkan** |
| --- | --- |
| Kabinet | Informasi kabinet aktif |
| Bidang | Daftar bidang dalam kabinet |
| Kompartemen | Daftar kompartemen dalam bidang |
| Program Kerja | Daftar Proker dalam kompartemen |

Contoh alur pengunjung:

**Kabinet 2026–2027**

**Bidang Organisasi**

**Kompartemen Pengembangan Organisasi**

**Program Kerja Leadership Camp**

Ilustrasi hierarki penelusuran organisasi, bukan nama struktur final.

Pengunjung dapat menelusuri struktur dan melihat informasi publik setiap tingkatan. Kabinet yang diarsipkan tetap tidak ditampilkan di Public Website.

## **D. Fitur yang perlu dipertahankan sederhana**

Aku merekomendasikan:

- Agenda dan Tiket berada dalam satu modul.

- Berita dan Artikel berada dalam satu modul.

- Bisnis dan Prestasi Kader berada dalam satu kelompok Karya Kader.

- Pengajuan Media Partner tidak perlu membuat akun.

- Cek Status Tiket dapat dilakukan melalui halaman khusus.

- Kotak Suara dapat diakses tanpa harus menjadi pengurus.

SIAPPP! Kita kunci pilihan Public Website dan lanjut ke **Personal Area**. 🔥

Keputusan Public Website dikunci

Menu Organisasi menggunakan empat menu terpisah, bukan dropdown bertingkat:

1. Kabinet

1. Bidang

1. Kompartemen

1. Program Kerja

Keempatnya memiliki halaman masing-masing dan saling terhubung melalui informasi organisasi.

# **MODUL 02 — PERSONAL AREA**

Mahasiswa Biasa & Kader HIPMI

## **1. Tujuan Personal Area**

Personal Area merupakan ruang pribadi setiap pengguna untuk mengelola akun, profil, keanggotaan, dan aktivitasnya di HIPMI CENTRAL.

Prinsipnya:

- Semua pengguna yang login memiliki Personal Area.

- Mahasiswa Biasa menjadi status awal pengguna.

- Kader HIPMI mendapatkan fitur keanggotaan tambahan.

- Anggota Tim Proker mendapatkan informasi aktivitas dan tugasnya.

- Pengurus dan Pengelola Proker tetap memiliki Personal Area, tetapi juga mendapatkan akses Organization Management sesuai penugasannya.

## **2. Struktur sidebar Personal Area**

Aku merekomendasikan hanya lima menu utama.

**HIPMI CENTRAL**

Personal Area

**Dashboard Saya**

**Profil Saya**

**Keanggotaan**

Khusus Kader

**Aktivitas Saya**

**Pengaturan Akun**

**Organization Management**

Hanya tampil apabila pengguna memiliki penugasan organisasi aktif atau penugasan Pengelola Proker.

Ilustrasi konsep sidebar.

## **3. Daftar fitur setiap menu**

### **A. Dashboard Saya**

Menjadi halaman utama setelah pengguna login.

Fitur:

- Sapaan dan informasi pengguna.

- Status akun dan keanggotaan.

- Informasi agenda mendatang.

- Ringkasan tiket kegiatan.

- Ringkasan aktivitas Proker.

- Notifikasi terbaru.

Konten dashboard menyesuaikan status pengguna. Mahasiswa biasa tidak perlu melihat informasi kader yang belum dimilikinya.

### **B. Profil Saya**

Tempat pengguna mengelola informasi pribadinya.

Fitur:

- Foto profil.

- Nama lengkap.

- NIM.

- Email.

- Nomor telepon.

- Fakultas dan program studi.

- Informasi profil lainnya.

Pengguna dapat memperbarui informasi profil yang memang diizinkan.

### **C. Keanggotaan**

Khusus Kader HIPMI

Fitur:

- Informasi status kader.

- Tingkatan kader (Kader 1, 2, dan 3).

- Informasi keanggotaan.

- Riwayat keterlibatan organisasi.

- Riwayat jabatan dan penugasan.

Mahasiswa Biasa tidak perlu mendapatkan menu ini apabila belum menjadi kader.

### **D. Aktivitas Saya**

Menurutku, semua aktivitas pribadi sebaiknya digabung di sini agar sidebar tidak terlalu panjang.

Fitur dibagi menjadi beberapa tab:

| **Tab** | **Isi** |
| --- | --- |
| Agenda & Tiket | Pendaftaran kegiatan dan tiket pribadi |
| Program Kerja | Riwayat keterlibatan dalam Proker |
| Tugas Saya | Tugas dan progres pekerjaan apabila menjadi anggota tim Proker |
| Riwayat | Rekaman aktivitas terdahulu |

**Khusus riwayat Program Kerja**, informasi organisasinya tetap harus jelas:

**Filter Riwayat Organisasi**

**Kabinet**

Pilih kabinet

**Bidang**

Pilih bidang

**Kompartemen**

Pilih kompartemen

**Program Kerja**

Pilih program kerja

Dropdown saling terhubung. Pengguna dapat mengosongkan filter untuk melihat seluruh riwayat yang menjadi haknya.

Riwayat keterlibatan tetap dipertahankan meskipun kabinet sudah berakhir.

### **E. Pengaturan Akun**

Fitur:

- Ubah password.

- Pengaturan informasi akun.

- Pengaturan notifikasi.

- Logout.

Notifikasi cukup ditampilkan melalui ikon lonceng di bagian atas dashboard agar tidak perlu membuat menu sidebar tambahan.

## **4. Perbedaan Personal Area berdasarkan pengguna**

Ini penting supaya tidak semua pengguna melihat menu yang sama.

| **Pengguna** | **Fitur tambahan** |
| --- | --- |
| Mahasiswa Biasa | Profil dan aktivitas pribadi |
| Kader HIPMI | Keanggotaan dan riwayat kader |
| Anggota Tim Proker | Tugas dan aktivitas Proker |
| Pengelola Proker | Personal Area + Organization Management |
| Staff | Personal Area + Organization Management |
| Pengurus Struktural | Personal Area + Organization Management |
| Admin Sistem | Personal Area + Admin Panel |

## **5. Mekanisme perpindahan workspace**

Kita pertahankan keputusan sebelumnya.

**Contoh pengguna yang menjadi Kader sekaligus Pengurus**

**Login**

**Personal Area**

Profil, kader, aktivitas pribadi.

**Organization**

Workspace berdasarkan jabatan.

Pengguna dapat berpindah melalui workspace switcher. Tidak perlu login ulang.

Aturannya:

- Mahasiswa biasa: hanya Personal Area.

- Kader tanpa penugasan: hanya Personal Area.

- Anggota Tim Proker: hanya Personal Area.

- Pengelola Proker: Personal Area dan akses organisasi.

- Pengurus: Personal Area dan akses organisasi.

- Admin: Personal Area dan Admin Panel.

Ketika kabinet berakhir, akses Organization Management hilang dari pengguna, tetapi Personal Area tetap tersedia.

## **6. Ringkasan keputusan Personal Area**

## **Personal Area**

Rancangan awal

**5 menu utama**

1. Dashboard Saya

1. Profil Saya

1. Keanggotaan

1. Aktivitas Saya

1. Pengaturan Akun

**Prinsip akses**

- Menu menyesuaikan status pengguna.

- Keanggotaan khusus kader.

- Aktivitas Proker sesuai keterlibatan.

- Workspace organisasi hanya untuk pengguna dengan penugasan aktif.

Personal Area dikunci

Keputusan:

- Menu Keanggotaan hanya muncul untuk Kader HIPMI.

- Mahasiswa Biasa tidak melihat menu Keanggotaan.

- Ketika pengguna menjadi kader, menu Keanggotaan otomatis tersedia.

- Pengurus dan Pengelola Proker tetap memiliki Personal Area.

- Workspace organisasi muncul berdasarkan penugasan aktif.

## **Struktur sidebar Organization Management**

Aku mengusulkan tujuh menu utama, tetapi tidak semuanya muncul untuk setiap role.

**HIPMI CENTRAL**

Organization

**1. Dashboard Organisasi**

Ringkasan organisasi sesuai jabatan dan kewenangan.

**2. Struktur Organisasi**

Kabinet, Bidang, Kompartemen, dan Program Kerja.

**3. Agenda & Kalender**

Agenda rapat, pleno, kegiatan, dan kalender organisasi.

**4. Persuratan**

Pengajuan, pemrosesan, dan arsip surat.

**5. Keuangan**

Pengajuan dana, transaksi, pencairan, dan laporan.

**6. CMS & Publikasi**

Pengelolaan konten website dan publikasi.

**7. Workspace**

Akses Workspace Kompartemen dan Workspace Program Kerja sesuai penugasan.

## **4. Fungsi setiap menu**

| **Menu** | **Fitur utama** |
| --- | --- |
| Dashboard Organisasi | Statistik, progres, ringkasan kegiatan |
| Struktur Organisasi | Kabinet, Bidang, Kompartemen, Proker |
| Agenda & Kalender | Kalender, agenda, pleno, rapat |
| Persuratan | Pengajuan, proses, revisi, arsip |
| Keuangan | Pengajuan dana, persetujuan, pencairan, laporan |
| CMS & Publikasi | Konten, berita, artikel, Publisher |
| Workspace | Pintasan workspace sesuai penugasan |

**Catatan penyederhanaan:**

- Tidak membuat menu khusus Monitoring karena sudah menjadi bagian Dashboard.

- Tidak membuat menu khusus Laporan karena laporan masuk ke modul terkait.

- Tidak membuat menu khusus Publisher karena Publisher merupakan permission.

- Workspace Kompartemen dan Proker tetap dibahas secara terpisah dan mendalam pada modul berikutnya.

## **5. Perbedaan sidebar berdasarkan role**

| **Role** | **Menu utama yang ditampilkan** |
| --- | --- |
| Top Management | Dashboard, Struktur, Agenda, Workspace |
| Sekum | Dashboard, Persuratan, Agenda, Workspace |
| Bendum | Dashboard, Keuangan, Agenda, Workspace |
| Kepala Bidang | Dashboard, Struktur, Agenda, Workspace |
| Kepala Kompartemen | Dashboard, Struktur, Agenda, Workspace |
| Staff | Dashboard, Workspace, Agenda sesuai akses |
| Pengelola Proker | Dashboard, Workspace, Agenda sesuai akses |

CMS & Publikasi muncul untuk pengurus yang diberikan kewenangan. Persuratan dan Keuangan juga dapat menampilkan fitur pengajuan kepada pengguna unit yang membutuhkannya.

# **MODUL 03 — ORGANIZATION MANAGEMENT**

## **01. Dashboard Organisasi**

Rancangan fitur

### **A. Tujuan Dashboard**

Dashboard Organisasi merupakan halaman utama pengurus setelah masuk ke Organization Management.

Fungsinya untuk memberikan gambaran singkat mengenai:

- Kondisi organisasi.

- Perkembangan program kerja.

- Agenda dan kegiatan mendatang.

- Persuratan.

- Keuangan.

- Aktivitas dan pekerjaan yang membutuhkan tindak lanjut.

**Prinsip desain:** dashboard bukan tempat mengerjakan semua pekerjaan. Dashboard adalah pusat informasi, monitoring, dan pintasan menuju fitur terkait.

## **B. Dropdown organisasi**

Kita wajib menyediakan konteks organisasi yang konsisten.

**Organization Filter**

KabinetKabinet 2026–2027 (Active)

BidangSemua Bidang

KompartemenSemua Kompartemen

Program KerjaSemua Program Kerja

Ilustrasi dropdown. Nama unit dan Proker hanya contoh, bukan data organisasi aktual.

**Aturan dropdown:**

| **Dropdown** | **Fungsi** |
| --- | --- |
| Kabinet | Menentukan konteks kabinet aktif |
| Bidang | Memfilter bidang |
| Kompartemen | Mengikuti Bidang yang dipilih |
| Program Kerja | Mengikuti Kompartemen yang dipilih |

Hak pilihan mengikuti role:

- Top Management: seluruh Bidang, Kompartemen, dan Proker.

- Sekum: seluruh unit untuk persuratan.

- Bendum: seluruh unit untuk keuangan.

- Kepala Bidang: bidang dan unit bawahannya.

- Kepala Kompartemen: kompartemen dan Proker bawahannya.

- Staff: sesuai penempatan.

- Pengelola Proker: Proker yang ditugaskan.

Kabinet pengguna biasa otomatis menggunakan kabinet aktif. Tidak perlu pilihan kabinet arsip di sini.

## **C. Komponen Dashboard**

Aku menyarankan enam komponen utama. Tidak perlu membuat terlalu banyak kartu statistik.

## **Dashboard Organisasi**

Kabinet 2026–2027

**1. Ringkasan Statistik**

# **10**

Kompartemen

# **18**

Program Kerja

# **8**

Proker Berlangsung

# **5**

Agenda Mendatang

**2. Ringkasan Program Kerja**

Berlangsung

**8**

Selesai

**6**

Belum dimulai

**4**

**3. Agenda Mendatang**

## **20**

NOV

**Rapat Koordinasi**

10.00 WIB · Ruang Rapat

**4. Aktivitas Terbaru**

- Pengajuan surat baru.

- Pembaruan progres Proker.

- Pengajuan dana.<br>**5. Pekerjaan Perlu Tindak Lanjut**

- Surat menunggu pemeriksaan.

- Pengajuan dana menunggu persetujuan.

- Proker membutuhkan pembaruan.<br>**6. Pintasan<br>**Persuratan<br>Keuangan<br>Agenda<br>Workspace<br>Mockup konseptual. Data hanya ilustrasi, bukan data aktual HIPMI.

## **D. Dashboard menyesuaikan Role**

Nah, ini bagian yang penting. Kita tidak perlu membuat dashboard berbeda-beda secara keseluruhan. Cukup satu sistem dashboard dengan isi kartu dan informasi yang menyesuaikan role.

| **Role** | **Isi utama dashboard** |
| --- | --- |
| Ketua Umum | Ringkasan dan perkembangan seluruh organisasi |
| Wakil Ketua Umum | Monitoring organisasi dan tindak lanjut |
| Sekjen | Koordinasi dan perkembangan organisasi |
| Sekum | Statistik persuratan, surat masuk, revisi, dan penyelesaian |
| Bendum | Saldo, pengajuan dana, pencairan, dan transaksi |
| Kepala Bidang | Progres bidang, kompartemen, dan Proker bawahannya |
| Kepala Kompartemen | Progres kompartemen, tim, dan seluruh Proker bawahannya |
| Staff | Tugas, progres, dan agenda sesuai penempatan |
| Pengelola Proker | Progres, roster, agenda, tiket, dan pekerjaan Proker |

**Contohnya:**

- Ketum melihat kondisi organisasi secara keseluruhan.

- Sekum melihat berapa surat yang menunggu pemeriksaan.

- Bendum melihat berapa pengajuan dana yang menunggu persetujuan.

- Kepala Bidang melihat kompartemen mana yang progresnya tertinggal.

- Kepala Kompartemen melihat perkembangan seluruh Proker miliknya.

- Pengelola Proker melihat pekerjaan yang harus segera diselesaikan.

Jadi tidak semua orang melihat statistik keuangan atau persuratan yang sama.

## **E. Batasan Dashboard**

Supaya tidak terjadi duplikasi fitur:

| **Aktivitas** | **Tempat** |
| --- | --- |
| Melihat ringkasan | Dashboard |
| Melihat detail Proker | Workspace Proker |
| Mengelola surat | Persuratan |
| Mengelola dana | Keuangan |
| Mengelola agenda | Agenda & Kalender |
| Mengelola anggota | Workspace terkait |

Dashboard hanya menyediakan ringkasan dan tombol menuju halaman pekerjaan sebenarnya.

Dashboard Organisasi — Dikunci

1. Satu template dashboard untuk seluruh role.

1. Isi dashboard menyesuaikan Role & Permission.

1. Informasi keuangan hanya tampil kepada pengguna yang memiliki hak akses.

1. Dashboard berfungsi sebagai pusat informasi dan pintasan, bukan tempat mengerjakan seluruh pekerjaan.

# **MODUL 03 — ORGANIZATION MANAGEMENT**

## **02. Agenda & Kalender**

Rancangan fitur

### **A. Tujuan**

Agenda & Kalender merupakan pusat pengelolaan jadwal dan kegiatan internal organisasi.

Fungsinya:

- Mengelola jadwal rapat dan pleno.

- Mengelola agenda kegiatan organisasi.

- Melihat jadwal seluruh unit.

- Memantau agenda Program Kerja.

- Menghindari bentrok jadwal.

- Mengetahui kegiatan yang akan datang.

**Prinsip:** satu kalender organisasi, tetapi tampilan dan kewenangan menyesuaikan role.

Perlu dibedakan: Kalender ini merupakan kalender internal organisasi. Halaman Agenda & Tiket di Public Website tetap menjadi tempat publik melihat kegiatan dan melakukan pendaftaran.

## **B. Dropdown organisasi**

Kita gunakan empat dropdown standar yang sudah disepakati.

**Filter Agenda Organisasi**

KabinetKabinet Aktif 2026–2027

BidangSemua Bidang

KompartemenSemua Kompartemen

Program KerjaSemua Program Kerja

Tampilan kalender mengikuti filter yang dipilih. Dropdown berikutnya mengikuti pilihan sebelumnya.

Contoh UI

Empat tingkatan ini juga menentukan kepemilikan agenda:

| **Lingkup agenda** | **Contoh** |
| --- | --- |
| Kabinet | Rapat besar seluruh pengurus |
| Bidang | Rapat koordinasi bidang |
| Kompartemen | Pleno kompartemen |
| Program Kerja | Rapat persiapan kegiatan |

Jadi, setiap agenda memiliki pemilik atau lingkup organisasi yang jelas.

## **C. Daftar fitur Agenda & Kalender**

Aku menyarankan cukup lima fitur utama.

| **Fitur** | **Fungsi** |
| --- | --- |
| Kalender | Melihat seluruh jadwal dalam tampilan kalender |
| Daftar Agenda | Melihat agenda dalam bentuk daftar |
| Buat Agenda | Membuat jadwal baru sesuai kewenangan |
| Detail Agenda | Melihat informasi lengkap kegiatan |
| Pengingat & Notifikasi | Memberikan pemberitahuan agenda mendatang atau perubahan jadwal |

### **Informasi dalam satu agenda**

Setiap agenda cukup memiliki:

- Nama kegiatan.

- Jenis kegiatan (rapat, pleno, acara, dan lainnya).

- Tanggal dan waktu.

- Lokasi atau tautan pertemuan.

- Penanggung jawab.

- Lingkup organisasi.

- Deskripsi.

- Peserta atau pihak yang dituju.

- Lampiran jika diperlukan.

Tidak perlu membuat formulir yang terlalu panjang.

## **D. Hak akses berdasarkan Role**

Bagian ini mengikuti keputusan akses yang sudah kita sepakati.

| **Role** | **Melihat kalender** | **Membuat/mengelola agenda** |
| --- | --- | --- |
| Ketua Umum | Seluruh organisasi | Tidak otomatis |
| Wakil Ketua Umum | Seluruh organisasi | Tidak otomatis |
| Sekjen | Seluruh organisasi | Tidak otomatis |
| Sekum | Seluruh agenda internal | Tidak otomatis |
| Bendum | Seluruh agenda internal | Tidak otomatis |
| Kepala Bidang | Seluruh kalender, fokus bidangnya | Agenda bidangnya |
| Kepala Kompartemen | Seluruh kalender, fokus kompartemennya | Agenda kompartemen dan Prokernya |
| Staff | Sesuai penempatan | Sesuai permission |
| Pengelola Proker | Proker yang ditugaskan | Agenda Proker yang ditugaskan |
| Anggota Tim Proker | Agenda terkait keterlibatan | Tidak otomatis |

Untuk Top Management, Sekum, Bendum, Kepala Bidang, dan Kepala Kompartemen, kita pertahankan akses kalender organisasi secara menyeluruh. Tampilan awalnya bisa difokuskan pada lingkup kerja masing-masing.

## **E. Alur bisnis pembuatan agenda**

**Pengguna membuka Agenda & Kalender**

**Memilih lingkup organisasi**

Kabinet / Bidang / Kompartemen / Proker

**Mengisi informasi agenda**

**Agenda tersimpan di kalender**

**Peserta mendapatkan informasi dan pengingat**

Agenda yang dibuat pada suatu lingkup tidak otomatis memberikan hak pengelolaan kepada unit lain.

## **F. Hubungan dengan Public Website**

Ini juga penting agar tidak ada fitur ganda.

- Agenda internal digunakan untuk koordinasi pengurus.

- Agenda yang memang ditujukan untuk publik dapat diteruskan ke halaman Agenda & Tiket.

- Tidak semua rapat dan pleno harus tampil di website publik.

- Jika kegiatan membutuhkan pendaftaran dan tiket, pengelolaannya dilanjutkan melalui modul Agenda & Tiket.

- Publikasi tetap mengikuti kewenangan Publisher.

Agenda & Kalender — Dikunci

1. Satu kalender terpadu untuk seluruh kabinet.

1. Memiliki filter Kabinet, Bidang, Kompartemen, dan Program Kerja.

1. Agenda dapat ditandai Internal atau Publik.

1. Agenda Publik dapat diteruskan ke halaman Agenda & Tiket.

1. Agenda Internal tidak ditampilkan di Public Website.

# **03. Persuratan**

Fokus utama: Sekretaris Umum (Sekum)

## **A. Tujuan**

Persuratan menjadi pusat pengajuan, pemeriksaan, pemrosesan, dan pengarsipan surat organisasi.

Prinsip yang kita gunakan:

- Semua unit menggunakan satu sistem persuratan.

- Pengurus tidak perlu menghubungi Sekum secara manual untuk mengajukan surat.

- Sekum dapat memproses pengajuan dari seluruh unit.

- Riwayat dan status surat dapat dipantau.

- Alur dibuat sederhana, tanpa terlalu banyak tahapan persetujuan.

Persuratan harus dapat digunakan oleh Bidang, Kompartemen, dan Program Kerja tanpa membuat sistem terpisah untuk setiap unit.

## **B. Standar dropdown organisasi**

Setiap pengajuan mempunyai identitas asal organisasi yang jelas.

**Identitas Pengajuan**

Kabinet

**Kabinet Aktif**

Bidang

**Bidang pemilik pengajuan**

Kompartemen

**Kompartemen pemilik pengajuan**

Program Kerja

**Proker terkait (jika ada)**

Identitas unit otomatis mengikuti workspace asal. Pengaju tidak perlu memilih atau mengubah unit lain yang bukan kewenangannya.

Dalam Central Inbox Sekum, keempatnya menjadi filter untuk mencari pengajuan berdasarkan asal organisasi.

analisis arsitektur.docx

## **C. Jenis pengajuan surat**

Kita cukup menggunakan **dua jalur persuratan**.

**Surat Umum**

Surat yang diproses untuk kebutuhan administrasi umum organisasi.

**Untuk Ditmawa**

Dokumen yang diproses untuk pengajuan atau tindak lanjut ke Ditmawa.

Judul surat bebas. Tidak dibatasi hanya proposal atau jenis template tertentu.

Contoh dokumen:

- Surat undangan.

- Surat permohonan.

- Surat peminjaman ruangan.

- Proposal kegiatan.

- TAK kolektif.

- Dokumen administrasi lainnya.

analisis arsitektur.docx

analisis arsitektur.docx

## **D. Form pengajuan surat**

Aku menyarankan formulir cukup dibagi menjadi dua bagian.

**Form Pengajuan Persuratan**

Tujuan Pengajuan

Surat Umum

Untuk Ditmawa

**Identitas Pengajuan**

Judul Pengajuan

Tujuan / Keperluan

Link Dokumen

Gunakan tautan Google Docs atau Google Drive dengan akses yang sesuai.

**Kebutuhan Administrasi**

Pengaju dapat menuliskan beberapa kebutuhan sekaligus.

Nomor surat

Kop surat

TTD Ketua Umum

TTD Pembina

Surat pengantar

Contoh interaksi formulir, bukan form pengajuan sungguhan.

Catatan desain:

- Lampiran menggunakan URL, bukan kewajiban upload Word/PDF langsung.

- Sistem memeriksa format tautan dan memberikan petunjuk akses dokumen.

- Checklist administrasi bersifat fleksibel sesuai kebutuhan masing-masing pengajuan.

- Tidak semua surat wajib mempunyai persyaratan yang sama.

prd\_master.md

analisis arsitektur.docx

## **E. Central Inbox Sekum**

Ini merupakan pusat pengelolaan seluruh pengajuan surat.

Khusus Sekum

## **Central Inbox**

# **24**

Total Pengajuan

# **5**

Menunggu Pemeriksaan

# **3**

Perlu Revisi

# **16**

Selesai

**Filter pengajuan**

KabinetKabinet Aktif

BidangSemua Bidang

KompartemenSemua Kompartemen

Program KerjaSemua Program Kerja

StatusSemua Status

**Contoh daftar pengajuan**

**Permohonan Peminjaman Ruangan**

Bidang Organisasi · Proker Leadership Camp

Menunggu Pemeriksaan

**Surat Undangan Kerja Sama**

Bidang Eksternal · Kompartemen Partnership

Perlu Revisi

Mockup konsep UI dengan data ilustrasi.

Sekum dapat membuka setiap pengajuan, memeriksa tautan dokumen, memberikan catatan, memperbarui status, dan mengelola administrasi surat.

## **F. Alur bisnis persuratan**

Ini alur utama yang kita gunakan.

1. **Pengajuan oleh unit<br>**Pengurus Bidang, Kompartemen, atau Pengelola Proker mengisi form dari workspace asal.

1. **Masuk ke Central Inbox<br>**Sekum menerima pengajuan dan dapat melihat asal unitnya.

1. **Pemeriksaan Sekum<br>**Sekum memeriksa dokumen, kebutuhan administrasi, dan kelengkapan.

1. **Revisi jika diperlukan<br>**Sekum memberikan catatan. Pengaju memperbaiki dokumen dan mengirimkan kembali.

1. **Penyelesaian administrasi<br>**Sekum melakukan checklist, mengelola nomor surat jika diperlukan, dan menyelesaikan proses internal.

1. **Selesai atau tindak lanjut Ditmawa<br>**Surat Umum dapat diselesaikan. Surat Ditmawa dilanjutkan dengan pencatatan pengiriman dan pemantauan tindak lanjut.

### **Status surat**

Kita pisahkan dua hal agar tidak membingungkan.

| **Status proses internal** | **Keterangan** |
| --- | --- |
| Draft | Belum dikirim |
| Submitted | Menunggu pemeriksaan |
| Revision | Menunggu perbaikan pengaju |
| Completed | Administrasi internal selesai |

Khusus surat Ditmawa, ada status pelacakan tambahan:

- Belum dikirim.

- Menunggu respons.

- Perlu tindak lanjut.

- Selesai.

Jadi, surat dapat berstatus Completed secara internal tetapi masih menunggu respons Ditmawa. Pengiriman ulang juga masuk ke riwayat, bukan menimpa catatan sebelumnya.

**Reopen:** hanya Sekum yang boleh membuka kembali pengajuan Completed. Alasan dan tindakan reopen harus tercatat.

prd\_master.md

prd\_master.md

prd\_master.md

## **G. Tampilan pengaju dan Sekum**

Kita tidak membuat dua sistem persuratan.

| **Fitur** | **Pengaju** | **Sekum** |
| --- | --- | --- |
| Membuat pengajuan | Ya | Tidak perlu |
| Melihat pengajuan sendiri | Ya | Ya, seluruh unit |
| Melihat catatan revisi | Ya | Ya |
| Memperbaiki pengajuan | Ya | Tidak |
| Memproses surat | Tidak | Ya |
| Mengelola checklist | Tidak | Ya |
| Reopen surat | Tidak | Ya |
| Melihat riwayat | Pengajuan sendiri | Seluruh pengajuan |

Pengajuan yang sama muncul di Central Inbox Sekum dan di workspace asal. Tidak ada penginputan ulang.

analisis arsitektur.docx

# **H. Rekomendasi sidebar Persuratan**

Supaya sederhana, aku menyarankan:

**Sidebar Sekum**

1. Overview Persuratan.

1. Central Inbox.

1. Ditmawa Tracking.

1. Arsip & Riwayat.

Fitur nomor surat, checklist, revisi, dan detail administrasi berada di halaman detail pengajuan, bukan menjadi menu tersendiri.

**Sidebar unit pengaju**

1. Ajukan Surat.

1. Riwayat Pengajuan.

Persuratan — Dikunci

1. Kepala Bidang, Kepala Kompartemen, Pengelola Proker, dan Staff yang memiliki permission boleh mengajukan surat.

1. Semua pengajuan masuk ke Central Inbox Sekum.

1. Ditmawa tetap satu modul dengan Persuratan.

1. Ditmawa memiliki halaman Tracking tersendiri.

1. Hanya Sekum yang dapat melakukan Reopen terhadap surat yang sudah selesai.

# **04. Keuangan**

Fokus utama: Bendahara Umum (Bendum)

## **A. Tujuan**

Modul Keuangan menjadi pusat pengelolaan dan pemantauan keuangan organisasi, mulai dari kas pusat, pengajuan dana unit, pencairan, transaksi, hingga laporan keuangan.

Prinsip yang kita gunakan:

- Satu sistem keuangan untuk seluruh kabinet.

- Setiap Bidang, Kompartemen, dan Program Kerja dapat memiliki catatan keuangan masing-masing.

- Bendum memiliki akses lintas unit.

- Pengajuan dana dan pencairan tidak dilakukan melalui proses manual di luar sistem.

- Setiap transaksi mempunyai riwayat dan bukti.

- Tidak ada pencatatan transaksi yang sama dua kali.

**Penting:** mengajukan dana berbeda dengan menyetujui dan mencairkan dana. Pengajuan dilakukan unit, sedangkan persetujuan dan pencairan menjadi kewenangan Bendum.

## **B. Dropdown organisasi**

Kita tetap menggunakan empat dropdown standar.

**Filter Keuangan**

Kabinet

Kabinet Aktif

Bidang

Semua Bidang

Kompartemen

Semua Kompartemen

Program Kerja

Semua Program Kerja

Dropdown saling terhubung dan pilihan mengikuti kewenangan pengguna.

Aturannya:

- Bendum dapat memilih seluruh Bidang, Kompartemen, dan Proker.

- Kepala Bidang melihat bidang dan unit bawahannya.

- Kepala Kompartemen melihat kompartemen dan Proker bawahannya.

- Pengelola Proker melihat Proker yang ditugaskan.

- Staff hanya melihat unit sesuai permission.

**Tidak semua dropdown wajib diisi.** Jika transaksi merupakan milik Bidang, cukup pilih Kabinet dan Bidang. Jika milik Kompartemen, pilih sampai Kompartemen. Jika milik Proker, pilih keempatnya.

Identitas unit pada transaksi otomatis mengikuti workspace asal.

## **C. Struktur menu Keuangan**

Aku menyarankan tujuh menu utama untuk Bendum.

**FINANCIAL MANAGEMENT**

Bendum

**1. Overview**

Ringkasan keuangan organisasi

**2. Kas Pusat**

Pemasukan dan pengeluaran pusat

**3. Pengajuan Dana**

Permintaan dan keputusan dana

**4. Transfer Internal**

Penyaluran dan setoran dana

**5. Keuangan Unit**

Keuangan seluruh unit

**6. Pendapatan Agenda & Tiket**

Monitoring pendapatan kegiatan

**7. Laporan & Rekonsiliasi**

Rekap dan pemeriksaan keuangan

Tidak perlu membuat menu terpisah untuk penyaluran dana dan setoran dana. Keduanya menggunakan Transfer Internal yang sama.

analisis arsitektur.docx

analisis arsitektur.docx

## **D. Fitur setiap menu**

### **1. Overview Keuangan**

Halaman utama Bendum.

Informasi yang ditampilkan:

## **Financial Overview**

Ilustrasi tampilan, bukan data aktual.

Saldo tersedia Kas Pusat

# **Rp15.000.000**

Pemasukan Pusat

**Rp25 jt**

Pengeluaran & Penyaluran

**Rp10 jt**

Pengajuan Pending

**5**

Transfer Berlangsung

**3**

**Ringkasan keuangan unit**

| **Unit** | **Saldo** |
| --- | --- |
| Bidang A | Rp5 jt |
| Kompartemen B | Rp2 jt |
| Proker C | Rp3 jt |

**Aktivitas terbaru**

- Pengajuan dana baru.

- Transfer menunggu konfirmasi.

- Penerimaan dana Ditmawa.

- Pembayaran tiket terverifikasi.

Dashboard juga dapat menampilkan pendapatan tiket dan pemasukan Medpart jika berbayar.

Angka harus membedakan saldo pusat, saldo unit, dana dalam perjalanan, dan pendapatan organisasi agar tidak terjadi penghitungan ganda.

analisis arsitektur.docx

### **2. Kas Pusat**

Merupakan buku keuangan utama Bendum.

Fitur:

- Mencatat pemasukan.

- Mencatat pengeluaran.

- Mencatat iuran pengurus.

- Mencatat dana Ditmawa yang benar-benar diterima.

- Melihat riwayat transaksi.

- Melihat bukti transaksi.

Contoh sumber pemasukan:

- Iuran pengurus.

- Dana Ditmawa.

- Sponsorship.

- Pemasukan lainnya.

Contoh pengeluaran:

- Kebutuhan operasional pusat.

- Administrasi organisasi.

- Pengeluaran lain yang sah.

Khusus dana Ditmawa, Bendum dapat menghubungkan penerimaan dana dengan dokumen yang sebelumnya dicatat Sekum. Dana baru dicatat masuk ketika benar-benar diterima, bukan hanya karena proposal selesai diproses.

analisis arsitektur.docx

### **3. Pengajuan Dana**

Bendum memiliki kewenangan persetujuan

Pengajuan berasal dari:

- Bidang.

- Kompartemen.

- Program Kerja.

Form pengajuan cukup memuat:

| **Informasi** | **Keterangan** |
| --- | --- |
| Unit pengaju | Otomatis |
| Tujuan dana | Keperluan penggunaan |
| Nominal | Jumlah yang diminta |
| Rincian kebutuhan | Daftar kebutuhan |
| Dokumen pendukung | Link atau lampiran |
| Keterangan | Informasi tambahan |

**Alur pengajuan:**

1. Unit membuat pengajuan dana.

1. Pengajuan masuk ke daftar Bendum.

1. Bendum memeriksa kebutuhan dan dokumen.

1. Bendum menyetujui, menolak, atau meminta revisi.

1. Nominal yang disetujui dicatat.

1. Pengajuan yang disetujui dilanjutkan ke pencairan.

Ketentuan yang kita pertahankan:

- Bendum dapat menyetujui sesuai nominal yang diminta atau nominal lebih kecil.

- Tidak membutuhkan persetujuan tambahan Ketua Umum.

- Pengajuan yang ditolak atau direvisi tetap mempunyai riwayat.

- Persetujuan tidak otomatis berarti dana sudah ditransfer.

analisis arsitektur.docx

### **4. Transfer Internal**

Ini salah satu fitur terpenting. Aku merekomendasikan satu sistem transfer untuk dua arah.

**A. Penyaluran dana pusat ke unit**

**Kas Pusat — Bendum**

**Bidang / Kompartemen / Proker**

Bendum mencatat transfer dan bukti. Unit penerima mengonfirmasi dana yang benar-benar diterima.

**B. Setoran keuntungan unit ke pusat**

**Bidang / Kompartemen / Proker**

**Kas Pusat — Bendum**

Unit mencatat setoran dan bukti. Bendum memeriksa serta mengonfirmasi penerimaan.

Satu modul menangani kedua transaksi tersebut.

Prinsipnya:

- Pengirim mencatat transaksi.

- Penerima mengonfirmasi.

- Saldo diperbarui berdasarkan status penerimaan.

- Transfer internal bukan pendapatan baru organisasi.

- Semua bukti dan riwayat tetap tersimpan.

Dengan demikian kita tidak perlu membuat menu Dana Keluar dan Setoran Dana secara terpisah.

analisis arsitektur.docx

### **5. Keuangan Unit**

Setiap unit memiliki catatan keuangan sendiri.

| **Tingkatan** | **Lingkup keuangan** |
| --- | --- |
| Kabinet | Kas pusat |
| Bidang | Keuangan bidang |
| Kompartemen | Keuangan kompartemen |
| Program Kerja | Keuangan Proker |

Fitur:

- Saldo unit.

- Pemasukan.

- Pengeluaran.

- Dana diterima.

- Pengajuan dana.

- Transfer masuk dan keluar.

- Bukti transaksi.

- Riwayat dan laporan.

Kepala Kompartemen dan Pengelola Proker mengelola keuangan sesuai lingkup kewenangan masing-masing. Kepala Bidang memantau unit bawahannya sesuai hak akses.

Tidak perlu membuat desain halaman berbeda untuk setiap unit. Cukup satu template Keuangan Unit dengan data dan lingkup yang menyesuaikan.

analisis arsitektur.docx

analisis arsitektur.docx

### **6. Pendapatan Agenda & Tiket**

Bagian ini khusus untuk monitoring pendapatan kegiatan.

Bendum dapat melihat:

- Agenda milik Bidang.

- Agenda mandiri Kompartemen.

- Agenda milik Program Kerja.

- Jenis tiket.

- Harga tiket.

- Kuota.

- Jumlah tiket terjual.

- Pembayaran menunggu verifikasi.

- Pembayaran terverifikasi.

- Total pendapatan.

Dropdown penelusurannya:

**Pendapatan Kegiatan HIPMI**

**Kabinet**

**Bidang**

**Kompartemen**

**Program Kerja**

**Agenda**

**Jenis Tiket**

Agenda yang dimiliki langsung oleh Bidang atau Kompartemen tidak harus melewati Proker.

**Pembagian kewenangan penting:**

| **Aktivitas** | **Penyelenggara** | **Bendum** |
| --- | --- | --- |
| Membuat agenda | Ya | Tidak otomatis |
| Mengelola tiket | Ya | Tidak otomatis |
| Verifikasi pembayaran | Ya | Tidak otomatis |
| Melihat transaksi tiket | Agendanya sendiri | Seluruh organisasi |
| Monitoring pendapatan | Agendanya sendiri | Seluruh organisasi |

Pembayaran yang belum diverifikasi tidak dihitung sebagai pendapatan final. Bendum memantau transaksi, bukan mengambil alih pekerjaan verifikasi penyelenggara.

analisis arsitektur.docx

### **7. Laporan & Rekonsiliasi**

Menu ini digunakan untuk memeriksa apakah pencatatan di sistem sesuai dengan uang yang benar-benar diterima atau dikeluarkan.

Cukup lima kelompok laporan:

| **Laporan** | **Isi** |
| --- | --- |
| Kas Pusat | Pemasukan dan pengeluaran pusat |
| Keuangan Unit | Laporan Bidang, Kompartemen, Proker |
| Transfer Internal | Penyaluran dan setoran |
| Pendapatan Agenda | Penjualan tiket dan pemasukan kegiatan |
| Rekonsiliasi | Pemeriksaan selisih saldo dan bukti |

Laporan dapat difilter berdasarkan periode dan empat tingkatan organisasi.

Laporan yang sudah ditutup tetap menjadi arsip dan koreksi transaksi tidak boleh menghilangkan histori sebelumnya.

analisis arsitektur.docx

analisis arsitektur.docx

## **E. Pembagian akses Keuangan berdasarkan Role**

| **Role** | **Kewenangan** |
| --- | --- |
| Ketua Umum, Waketum, Sekjen | Monitoring seluruh keuangan |
| Sekum | Tidak memiliki kewenangan pengelolaan keuangan; akses sesuai permission jika diperlukan |
| Bendum | Kelola seluruh keuangan dan persetujuan |
| Kepala Bidang | Kelola kebutuhan keuangan bidang dan monitor unit bawahannya |
| Kepala Kompartemen | Kelola keuangan kompartemen dan Proker bawahannya |
| Staff | Sesuai permission keuangan |
| Pengelola Proker | Kelola keuangan Proker yang ditugaskan |
| Anggota Tim Proker | Tidak memiliki akses keuangan organisasi |
| Admin Sistem | Tidak otomatis mempunyai akses keuangan |

Persetujuan dan pencairan dana tetap hanya kewenangan Bendum.

## **F. Sidebar berdasarkan role**

**Sidebar Bendum**

1. Overview

1. Kas Pusat

1. Pengajuan Dana

1. Transfer Internal

1. Keuangan Unit

1. Pendapatan Agenda & Tiket

1. Laporan & Rekonsiliasi

**Sidebar Kepala Bidang**

1. Dashboard Bidang

1. Keuangan Bidang

1. Pengajuan Dana

1. Riwayat Keuangan

**Sidebar Kepala Kompartemen**

1. Dashboard Kompartemen

1. Keuangan Kompartemen

1. Keuangan Proker

1. Pengajuan Dana

1. Riwayat Keuangan

**Sidebar Pengelola Proker**

1. Overview Keuangan Proker

1. Pemasukan & Pengeluaran

1. Pengajuan Dana

1. Transfer Internal

1. Laporan Keuangan

Staff mendapatkan menu sesuai permission. Menu yang tidak menjadi tanggung jawabnya tidak perlu ditampilkan.

Keuangan — Dikunci

1. Staff yang memiliki permission boleh mencatat keuangan dan mengajukan dana atas nama unit.

1. Staff tidak boleh menyetujui atau mencairkan dana.

1. Keuangan Bidang, Kompartemen, dan Program Kerja menggunakan satu template dinamis.

1. Persetujuan dan pencairan tetap menjadi kewenangan Bendum.

# **05. CMS & Publikasi**

Pengelolaan konten website organisasi

## **A. Tujuan**

CMS (Content Management System) merupakan pusat pengelolaan konten yang ditampilkan di Public Website HIPMI CENTRAL.

Fungsinya:

- Membuat dan mengedit konten website.

- Mengelola berita dan artikel.

- Mengelola informasi organisasi.

- Mengelola publikasi agenda.

- Mengelola karya kader.

- Mengatur proses publikasi dan penarikan konten.

**Prinsip utama yang sudah kita sepakati:**

- Pengurus membuat dan mengedit konten.

- Publisher dari kalangan pengurus bertugas memublikasikan dan menarik publikasi.

- Admin Sistem mengatur akses dan mengawasi aktivitas publikasi.

- Admin tidak wajib menyetujui setiap konten.

- Publisher bukan role baru, melainkan permission yang diberikan kepada pengurus.

## **B. Prinsip utama CMS: Jangan input data dua kali**

Ini keputusan desain yang sangat penting.

CMS hanya mengelola konten editorial yang memang perlu diperbarui. Informasi yang sudah tersedia dari modul organisasi harus mengambil data dari sumber aslinya.

Contohnya:

| **Informasi** | **Sumber informasi** |
| --- | --- |
| Nama dan logo kabinet | Data Kabinet |
| Ketua Umum dan Waketum | Penugasan aktif |
| Nama pengurus | Struktur organisasi |
| Bidang dan Kompartemen | Struktur organisasi |
| Program Kerja | Data Proker yang Published |
| Agenda publik | Agenda yang Published |
| Bisnis Kader | Data bisnis yang Published |
| Prestasi Kader | Data prestasi yang Published |
| Berita dan Artikel | CMS |
| Banner dan slogan beranda | CMS |

Artinya, jika Ketua Umum berganti, website otomatis menampilkan pengurus baru berdasarkan penugasan aktif. Tidak perlu mengedit teks secara manual di CMS.

analisis arsitektur.docx

prd\_master.md

## **C. Struktur menu CMS & Publikasi**

Aku merekomendasikan enam menu utama.

**CMS & PUBLIKASI**

Organization

**1. Overview CMS**

Ringkasan konten dan aktivitas publikasi

**2. Konten Website**

Konten editorial beranda dan halaman publik

**3. Berita & Artikel**

Membuat dan mengelola artikel

**4. Karya Kader**

Pengelolaan Bisnis dan Prestasi Kader

**5. Media Partner**

Pengajuan, pemeriksaan, pembayaran dan publikasi

**6. Kotak Suara**

Masukan, kritik, saran dan tindak lanjut

**Media Library**

Pengelolaan aset gambar dan media.

Rekomendasi struktur sidebar. Publish, Unpublish, Preview, dan riwayat menjadi tindakan di halaman detail konten, bukan menu terpisah.

## **D. Dropdown organisasi CMS**

Untuk konten yang berkaitan dengan unit organisasi, kita tetap menggunakan standar empat dropdown.

**Filter Konten Organisasi**

**Kabinet**

Kabinet pemilik konten

**Bidang**

Bidang pemilik konten

**Kompartemen**

Kompartemen pemilik konten

**Program Kerja**

Proker terkait konten

Dropdown digunakan untuk filter dan penentuan lingkup konten. Konten umum seperti banner beranda tidak perlu dipaksakan mempunyai Bidang, Kompartemen, atau Proker.

## **E. Fitur setiap menu**

### **1. Overview CMS**

Dashboard pengelolaan konten.

Informasi:

- Total konten.

- Draft.

- Published.

- Unpublished.

- Aktivitas publikasi terbaru.

- Prestasi menunggu pemeriksaan.

- Media Partner menunggu tindak lanjut.

Tampilan menyesuaikan permission pengguna. Pengelola berita tidak harus melihat informasi administrasi Media Partner.

### **2. Konten Website**

Digunakan untuk mengelola konten editorial yang tampil di website publik.

Konten yang dapat dikelola:

| **Konten** | **Tindakan** |
| --- | --- |
| Slogan / Hero | Edit |
| Banner beranda | Edit |
| Benefit HIPMI | Edit |
| Gambar pendukung | Edit |
| Teks pengantar section | Edit |
| Konten editorial beranda | Edit |

**Tentang Kami tidak perlu dibuatkan editor khusus**, sesuai rancangan sebelumnya. Begitu pula data struktur organisasi, pengurus, dan Proker tidak perlu diketik ulang.

prd\_master.md

analisis arsitektur.docx

### **3. Berita & Artikel**

Fitur:

- Daftar berita dan artikel.

- Buat artikel.

- Edit artikel.

- Simpan Draft.

- Preview.

- Publish dan Unpublish.

- Arsip.

- Riwayat perubahan.

Form artikel cukup berisi:

| **Field** | **Keterangan** |
| --- | --- |
| Judul | Judul artikel |
| Kategori | Kategori artikel |
| Ringkasan | Deskripsi singkat |
| Isi artikel | Rich text editor |
| Cover | Gambar utama |
| Sumber | URL opsional |
| Lingkup organisasi | Jika berkaitan dengan unit |
| Status | Draft / Published |

Artikel yang mempunyai sumber asli dapat menampilkan tautan referensi.

analisis arsitektur.docx

prd\_master.md

### **4. Karya Kader**

Kita gabungkan Bisnis Kader dan Prestasi Kader dalam satu kelompok navigasi, tetapi alur pengelolaannya tetap dibedakan.

**A. Bisnis Kader**

Alurnya:

1. **Kader mengajukan bisnis** melalui Personal Area.

1. **Pengelola memeriksa** informasi dan kelengkapan bisnis.

1. **Revisi jika diperlukan** dikembalikan kepada kader.

1. **Disetujui dan dipublikasikan** oleh pengelola berwenang.

1. **Tampil di website** pada Karya Kader → Bisnis Kader.

Informasi bisnis:

- Nama usaha.

- Pemilik.

- Foto usaha.

- Deskripsi.

- Kategori.

- Instagram.

- WhatsApp.

- Website jika tersedia.

**B. Prestasi Kader**

Alurnya:

1. Pengajuan atau pencatatan prestasi.

1. Pemeriksaan oleh kompartemen yang diberikan permission.

1. Revisi jika diperlukan.

1. Verifikasi.

1. Publikasi.

Informasi prestasi:

- Kader terkait.

- Nama prestasi.

- Kategori.

- Tingkat pencapaian.

- Tanggal.

- Deskripsi.

- Dokumentasi.

- Referensi pendukung jika tersedia.

Pengelola Prestasi ditentukan melalui permission Admin, bukan ditetapkan permanen pada satu Kompartemen.

analisis arsitektur.docx

analisis arsitektur.docx

prd\_master.md

### **5. Media Partner**

Media Partner tetap mempunyai alur khusus karena melibatkan pengajuan publik, paket layanan, pembayaran, dokumentasi, dan publikasi.

Kita tidak mencampurkannya dengan editor artikel.

Pembagian tanggung jawab:

| **Pengguna** | **Tugas** |
| --- | --- |
| Pengaju publik | Mengajukan Media Partner |
| Kompartemen Media Komunikasi | Memeriksa dan memverifikasi |
| Kompartemen Media Komunikasi | Memeriksa dokumentasi dan memublikasikan |
| Bendum | Monitoring pendapatan dan pencatatan keuangan |
| Admin Sistem | Mengatur permission dan audit |

Detail pengajuan dapat memiliki tab:

- Informasi Pengajuan

- Layanan

- Pembayaran

- Dokumentasi

- Publikasi

- Riwayat

Publikasi dilakukan manual setelah persyaratan terpenuhi. Tanggal publikasi yang diminta pengaju bukan jadwal publikasi otomatis.

Bendum tidak menjadi verifikator pembayaran Medpart.

analisis arsitektur.docx

analisis arsitektur.docx

analisis arsitektur.docx

### **6. Kotak Suara**

Digunakan untuk menerima aspirasi, kritik, dan saran dari mahasiswa maupun anggota HIPMI.

Fitur:

- Daftar masukan.

- Detail masukan.

- Kategori masukan.

- Catatan tindak lanjut.

- Status penanganan.

- Riwayat tindak lanjut.

Aksesnya dibatasi kepada pengurus yang diberi kewenangan. Data pribadi pengirim tidak ditampilkan kepada publik.

analisis arsitektur.docx

analisis arsitektur.docx

### **7. Media Library**

Media Library menjadi tempat pengelolaan aset gambar dan media yang digunakan pada website.

Fitur:

- Upload gambar.

- Melihat daftar media.

- Preview.

- Kategori media.

- Informasi penggunaan.

- Arsip media sesuai permission.

Tidak perlu membuat halaman media terpisah di setiap editor. Pengguna cukup memilih aset dari Media Library.

## **F. Mekanisme publikasi**

Ini inti dari CMS kita.

## **Content Publishing Flow**

**Content Creator**

Pengurus membuat dan mengedit konten

**Save Draft & Preview**

Konten disimpan dan diperiksa tampilannya

**Publisher**

Pengurus dengan permission publikasi

**Publish**

Tampil di Public Website

**Unpublish / Archive**

Jika konten perlu ditarik atau diarsipkan

Alur publikasi konten editorial. Alur verifikasi khusus Bisnis Kader, Prestasi Kader, dan Media Partner tetap mengikuti proses masing-masing.

Setiap tindakan harus memiliki riwayat:

- Siapa pembuat konten.

- Siapa yang mengedit.

- Siapa yang memublikasikan.

- Waktu perubahan.

- Riwayat Publish dan Unpublish.

Admin dapat memantau aktivitas ini melalui audit, tetapi tidak perlu menyetujui setiap konten.

analisis arsitektur.docx

## **G. Pembagian kewenangan CMS**

| **Role** | **Kewenangan** |
| --- | --- |
| Top Management | Monitoring sesuai permission |
| Sekum | Tidak otomatis mengelola CMS |
| Bendum | Monitoring pendapatan terkait |
| Kepala Bidang | Mengelola konten sesuai lingkup dan permission |
| Kepala Kompartemen | Mengelola konten kompartemen sesuai permission |
| Staff | Membuat dan mengedit konten sesuai permission |
| Pengelola Proker | Mengelola konten Proker sesuai permission |
| Publisher | Publish dan Unpublish sesuai permission |
| Admin Sistem | Mengatur akses dan audit |

Publisher bukan role tersendiri. Seseorang dapat diberi permission Content Creator, Publisher, atau keduanya sesuai penugasan.

CMS & Publikasi — Dikunci

1. Satu pengurus boleh memiliki permission Content Creator sekaligus Publisher.

1. Media Partner dan Kotak Suara tetap berada dalam kelompok CMS & Publikasi.

1. Media Partner dan Kotak Suara memiliki alur pengelolaan masing-masing.

1. Publisher tetap berupa permission, bukan role baru.

1. Admin Sistem mengatur akses dan mengawasi aktivitas publikasi.

# **09. Persuratan — Workspace Proker**

## **A. Konsep utama**

Kita tidak membuat sistem persuratan baru untuk Proker.

Workspace Proker menggunakan modul Persuratan yang sama dengan Workspace Kompartemen. Semua pengajuan diarahkan ke **Central Inbox Sekum**.

Perbedaannya hanya pada konteks pengajuan:

- Pengajuan dari Kompartemen membawa identitas Kompartemen.

- Pengajuan dari Proker membawa identitas Proker dan Kompartemen induknya.

- Kepala Kompartemen dapat memantau pengajuan Proker bawahannya.

- Sekum tetap menjadi pihak yang memproses administrasi surat.

Dengan demikian, tidak ada penginputan ulang atau proses persetujuan ganda.

## **B. Form Pengajuan Surat**

Aku menyarankan satu formulir untuk semua jenis pengajuan. Perbedaannya hanya pada tujuan surat.

## **Buat Pengajuan Surat**

Workspace Proker

Jenis Pengajuan

Surat Umum

Untuk Ditmawa

**Identitas Organisasi**

Kabinet

**Kabinet Aktif**

Bidang

**Bidang OKK**

Kompartemen

**PSDM**

Program Kerja

**Business Expo**

Identitas terisi otomatis berdasarkan Workspace Proker.

**Informasi Pengajuan**

Judul Pengajuan

Tujuan / Keperluan

Agenda/Event Terkait (Opsional)Pilih agenda terkait

Link Dokumen

Dokumen dikelola melalui tautan eksternal. Tidak perlu upload Word/PDF langsung.

Keterangan Tambahan

Simpan Draft

Ajukan ke Sekum

Contoh rancangan antarmuka, bukan formulir pengajuan aktif.

Aku sengaja tidak memasukkan terlalu banyak kolom.

Untuk jenis pengajuan, cukup dua pilihan yang sudah kita sepakati:

- Surat Umum.

- Untuk Ditmawa.

Judul surat tetap bebas, tidak dibatasi template tertentu.

web hipmi(2).docx

## **C. Tampilan daftar pengajuan**

Pengelola Proker tidak membutuhkan banyak submenu.

Cukup satu halaman dengan tombol Buat Pengajuan dan daftar pengajuan sebelumnya.

**Persuratan**

Business Expo

# **5**

Total Pengajuan

# **2**

Perlu Tindak Lanjut

Filter StatusSemua Pengajuan

**Daftar Pengajuan**

**Permohonan Surat Undangan**

Surat Umum

Perlu Revisi

15 November 2026 · PRK-001

Catatan Sekum tersedia

**Proposal Kegiatan Business Expo**

Untuk Ditmawa

Menunggu Respons

12 November 2026 · PRK-002

Dokumen telah dikirim ke Ditmawa

Mockup dengan data ilustrasi. Status Ditmawa ditampilkan terpisah dari status administrasi internal.

## **D. Detail pengajuan**

Saat pengajuan dibuka, aku menyarankan lima bagian informasi:

| **Bagian** | **Isi** |
| --- | --- |
| Informasi | Judul, jenis, pengaju, tujuan |
| Dokumen | Link dokumen |
| Checklist | Kelengkapan administrasi |
| Catatan | Catatan dan revisi Sekum |
| Riwayat | Seluruh perubahan status |

Untuk pengajuan Ditmawa, tampilkan informasi Tracking Ditmawa pada halaman detail yang sama.

Jadi pengaju tidak harus berpindah-pindah menu. Sekum tetap memiliki halaman Ditmawa Tracking tersendiri di modul Persuratan pusat.

web hipmi(2).docx

## **E. Alur bisnis final**

1. **Pengelola Proker membuat pengajuan<br>**Memilih Surat Umum atau Untuk Ditmawa, mengisi formulir dan menyertakan URL dokumen.

1. **Pengajuan masuk Central Inbox<br>**Sekum menerima pengajuan dari seluruh unit.

1. **Sekum melakukan pemeriksaan<br>**Sekum memeriksa dokumen dan checklist sesuai jenis pengajuan.

1. **Jika revisi<br>**Pengelola menerima catatan Sekum, memperbarui dokumen, kemudian mengirim revisi.

1. **Jika sesuai<br>**Sekum melanjutkan administrasi, termasuk pemberian nomor surat jika diperlukan dan proses tanda tangan.

1. **Jika Untuk Ditmawa<br>**Sekum mencatat pengiriman dan memperbarui tracking sampai ada hasil atau tindak lanjut.

1. **Hasil terlihat di Workspace Proker<br>**Pengelola dapat melihat status, dokumen, catatan, dan riwayat pengajuan.

web hipmi(2).docx

web hipmi(2).docx

## **F. Status pengajuan**

Kita harus membedakan status internal dan status Ditmawa.

**1. Status administrasi internal**

| **Status** | **Makna** |
| --- | --- |
| Draft | Belum diajukan |
| Menunggu Pemeriksaan | Sudah masuk Sekum |
| Perlu Revisi | Menunggu perbaikan |
| Diproses | Sedang ditangani Sekum |
| Completed | Administrasi internal selesai |

**2. Tracking Ditmawa**

| **Status** | **Makna** |
| --- | --- |
| Belum Dikirim | Belum dikirim ke Ditmawa |
| Sudah Dikirim | Pengiriman tercatat |
| Menunggu Respons | Menunggu tanggapan |
| Perlu Tindak Lanjut | Ada tindakan lanjutan |
| Selesai | Proses Ditmawa selesai |

Contoh: surat bisa berstatus Completed secara internal, tetapi tracking Ditmawa masih Menunggu Respons.

Ini penting agar pengguna tidak salah memahami bahwa surat selesai diproses Sekum berarti urusan Ditmawa juga sudah selesai.

web hipmi(2).docx

## **G. Pembagian kewenangan**

| **Role** | **Kewenangan** |
| --- | --- |
| Pengelola Proker | Membuat, mengajukan, revisi, melihat status |
| Kepala Kompartemen | Monitoring dan menangani pengajuan Proker bawahannya sesuai izin |
| Kepala Bidang | Monitoring sesuai lingkup Bidang |
| Staff | Mengajukan jika memiliki permission |
| Sekum | Pemeriksaan, administrasi, penyelesaian, Reopen, tracking Ditmawa |
| Top Management | Monitoring |
| Anggota Tim | Tidak memiliki akses pengelolaan persuratan |

Hanya Sekum yang dapat mengubah status resmi administrasi dan mencatat pengiriman Ditmawa. Reopen juga hanya kewenangan Sekum.

web hipmi(2).docx

**Integrasi Keuangan:** jika proposal mencantumkan kebutuhan dana, informasi nominal dapat menjadi referensi Bendum. Namun pengajuan dana resmi tetap dilakukan melalui modul Keuangan. Persetujuan proposal tidak otomatis menambah saldo kas.

web hipmi(2).docx

# **H. Kita kunci satu keputusan terakhir**

Menurutku, agar sistem ini tidak memiliki lapisan persetujuan yang berulang:

**Apakah Pengelola Proker boleh langsung mengajukan surat ke Sekum tanpa persetujuan Kepala Kompartemen terlebih dahulu?**

Persuratan Workspace Proker — Dikunci

1. Pengelola Proker boleh langsung mengajukan surat ke Sekum.

1. Tidak memerlukan persetujuan Kepala Kompartemen.

1. Kepala Kompartemen tetap dapat memonitor seluruh pengajuan Proker bawahannya.

1. Semua pengajuan masuk ke Central Inbox Sekum.

1. Sekum tetap memegang kewenangan pemeriksaan, penyelesaian administrasi, dan Reopen.

# **08. Kalender & Agenda — Workspace Proker**

Rancangan fitur

## **A. Konsep utama**

Kita tidak membuat kalender baru khusus Proker.

Workspace Proker menggunakan kalender organisasi yang sudah kita sepakati, tetapi tampilannya otomatis difilter berdasarkan Proker yang sedang dibuka.

Hierarki organisasinya:

**Kabinet → Bidang → Kompartemen → Program Kerja**

Jadi, Pengelola Proker cukup bekerja dalam konteks Prokernya sendiri.

## **B. Fitur utama**

Cukup empat fitur:

| **Fitur** | **Fungsi** |
| --- | --- |
| Kalender | Melihat jadwal kegiatan Proker |
| Agenda | Membuat dan mengelola agenda |
| Event & Tiket | Mengelola pendaftaran dan tiket |
| Kehadiran | Memeriksa peserta yang hadir |

Tidak perlu menu tambahan untuk masing-masing fitur tersebut.

## **C. Alur pembuatan agenda**

1. Pengelola Proker memilih **Buat Agenda**.

1. Mengisi nama, deskripsi, tanggal, waktu, dan lokasi.

1. Menentukan jenis agenda: Internal atau Publik.

1. Jika Publik, agenda dapat diteruskan ke halaman Agenda & Tiket Public Website.

1. Jika membutuhkan pendaftaran, Pengelola Proker mengaktifkan fitur registrasi dan tiket.

**Pembedaan penting:**

- Internal: hanya untuk kebutuhan organisasi.

- Publik: dapat dilihat masyarakat melalui Public Website.

- Tidak semua agenda harus memiliki tiket.

- Tidak semua agenda harus dipublikasikan.

## **D. Sistem Ticketing**

Kita gunakan alur sederhana yang sudah menjadi rancangan HIPMI CENTRAL.

**Alur Ticketing**

1. **Peserta mendaftar<br>**Mengisi nama, NIM, nomor telepon, email, fakultas, dan program studi.

1. **Pembayaran<br>**Jika berbayar, peserta mendapatkan instruksi pembayaran dan QRIS agenda.

1. **Verifikasi<br>**Peserta mengirim bukti pembayaran. Penyelenggara memeriksa secara manual tanpa batas waktu verifikasi yang ditentukan sistem.

1. **Tiket diterbitkan<br>**Setelah pembayaran diverifikasi, tiket PDF dengan barcode dikirim melalui email.

1. **Kehadiran<br>**Penyelenggara memindai barcode untuk memverifikasi kehadiran peserta.

Ketentuan yang kita pertahankan:

- Satu QRIS untuk setiap agenda.

- Kuota direservasi ketika peserta membuka instruksi pembayaran.

- Tiket PDF terpusat dengan barcode.

- Email tiket dikirim otomatis.

- Tombol Cek Status Tiket tersedia di Public Website.

- Pengecekan menggunakan NIM dan verifikasi email/OTP.

## **E. Pembagian kewenangan**

| **Aktivitas** | **Pengelola Proker** | **Bendum** |
| --- | --- | --- |
| Membuat agenda | Ya | Tidak otomatis |
| Mengatur tiket | Ya | Tidak |
| Mengatur kuota | Ya | Tidak |
| Verifikasi pembayaran | Ya | Tidak |
| Memeriksa kehadiran | Ya | Tidak |
| Monitoring pendapatan | Ya, Prokernya | Seluruh organisasi |

Bendum hanya memonitor pendapatan dan pencatatan keuangan. Tidak mengambil alih verifikasi pembayaran tiket.

## **F. Kita kunci satu keputusan**

Ada satu hal yang ingin aku pastikan.

**Apakah satu Program Kerja boleh memiliki beberapa Agenda/Event?**

Agenda & Event — Dikunci

1. Satu Program Kerja boleh memiliki beberapa Agenda/Event.

1. Setiap agenda memiliki pengaturan publikasi sendiri.

1. Setiap agenda memiliki pengaturan ticketing sendiri.

1. Agenda Internal dan Publik tetap dibedakan.

1. Semua agenda tetap terhubung dengan kalender organisasi terpadu.

# **10. Keuangan — Workspace Proker**

Rancangan fitur

## **A. Konsep utama**

Setiap Proker mempunyai buku keuangan sendiri, tetapi tetap terhubung dengan sistem keuangan organisasi dan Bendum.

Kita tidak membuat sistem keuangan baru. Workspace Proker, Kompartemen, dan Bidang menggunakan satu template dinamis sesuai lingkup unitnya.

## **B. Struktur menu**

Menurutku cukup empat bagian dalam satu halaman Keuangan.

**Keuangan Proker**

Business Expo · PSDM

Saldo Tersedia

# **Rp3,5 jt**

Pengajuan Pending

# **1**

Total Pemasukan

# **Rp5 jt**

Total Pengeluaran

# **Rp1,5 jt**

**Ringkasan**

Saldo dan kondisi keuangan

**Transaksi**

Pemasukan, pengeluaran, dan riwayat

**Pengajuan Dana**

Permintaan dana kepada Bendum

**Setoran ke Kas HIPMI**

Setoran dana dari Proker ke kas pusat

Mockup ilustrasi, bukan data keuangan aktual.

## **C. Fungsi masing-masing bagian**

**1. Ringkasan**

Menampilkan:

- Saldo tersedia.

- Total pemasukan.

- Total pengeluaran.

- Pengajuan dana yang masih diproses.

- Ringkasan pendapatan tiket.

**2. Transaksi**

Satu tempat untuk mencatat pemasukan dan pengeluaran.

| **Pemasukan** | **Pengeluaran** |
| --- | --- |
| Dana dari Bendum | Konsumsi |
| Penjualan tiket | Transportasi |
| Sponsorship | Perlengkapan |
| Donasi | Publikasi |
| Pemasukan lainnya | Pengeluaran lainnya |

Setiap pencatatan berisi nominal, tanggal, keterangan, dan bukti transaksi.

Pemasukan tiket yang sudah diverifikasi otomatis masuk ke buku keuangan Proker. Tidak perlu dicatat ulang secara manual.

web hipmi.docx

**3. Pengajuan Dana**

Pengelola Proker dapat mengajukan dana kepada Bendum.

Form cukup berisi:

- Sumber kebutuhan.

- Tujuan penggunaan.

- Nominal yang diminta.

- Proposal terkait jika ada.

- Keterangan.

- Dokumen pendukung.

Status pengajuan:

1. Draft

1. Diajukan

1. Diproses Bendum

1. Disetujui / Ditolak

1. Disalurkan

1. Diterima

Penting: dana yang baru disetujui belum otomatis masuk saldo Proker.

**4. Setoran ke Kas HIPMI**

Jika Proker ingin menyetorkan sebagian keuntungan kepada kas pusat:

1. Pengelola memasukkan nominal setoran.

1. Memilih sumber dana atau agenda.

1. Memasukkan tanggal dan bukti transfer.

1. Mengirim pengajuan setoran.

1. Bendum memeriksa dan mengonfirmasi penerimaan.

Setoran internal tidak dihitung sebagai pendapatan baru organisasi karena pendapatan kegiatan sudah tercatat sebelumnya.

web hipmi.docx

## **D. Alur pengajuan dan pencairan dana**

Ini bagian yang harus kita jaga agar tidak terjadi kesalahan pencatatan.

1. Pengelola Proker mengajukan dana.

1. Bendum memeriksa dan menyetujui atau menolak.

1. Jika disetujui, Bendum melakukan transfer dan mengunggah bukti.

1. Status berubah menjadi Menunggu Konfirmasi.

1. Pengelola Proker mengonfirmasi penerimaan dana.

1. Saldo Proker bertambah otomatis.

Prinsip pencatatan

Dana baru masuk saldo setelah penerimaan dikonfirmasi.

Jika ada ketidaksesuaian, pengelola dapat melaporkan masalah agar masuk pemeriksaan, bukan otomatis menambah saldo.

web hipmi(2).docx

## **E. Pembagian kewenangan**

| **Role** | **Kewenangan** |
| --- | --- |
| Pengelola Proker | Mencatat transaksi dan mengajukan dana |
| Staff dengan permission | Membantu pencatatan dan pengajuan |
| Kepala Kompartemen | Monitoring keuangan Proker bawahannya |
| Kepala Bidang | Monitoring sesuai lingkup |
| Bendum | Menyetujui dan mencairkan dana |
| Top Management | Monitoring |
| Anggota Tim | Tidak memiliki akses keuangan |

Bendum tidak mengambil alih pencatatan transaksi harian Proker dan tidak mengelola LPJ Proker.

## **F. Kita kunci satu keputusan**

Ada satu hal yang perlu dipastikan supaya tidak terjadi approval berlapis.

**Apakah pencatatan pemasukan dan pengeluaran Proker boleh langsung dilakukan Pengelola Proker tanpa persetujuan Bendum?**

Keuangan Workspace Proker — Dikunci

**Pencatatan transaksi tidak memerlukan persetujuan Bendum.**

1. Pengelola Proker boleh langsung mencatat pemasukan.

1. Pengelola Proker boleh langsung mencatat pengeluaran.

1. Setiap transaksi wajib disertai bukti.

1. Transaksi langsung tercatat dalam buku keuangan Proker.

1. Bendum dapat memonitor seluruh transaksi tanpa harus menyetujui satu per satu.

1. Persetujuan dan pencairan pengajuan dana tetap menjadi kewenangan Bendum.

Dengan demikian, kita membedakan dua proses:

- **Pencatatan transaksi:** kewenangan operasional Pengelola Proker.

- **Pengajuan dan pencairan dana:** kewenangan Bendum.

Tidak ada approval berulang untuk transaksi harian.

# **11. Dokumen & LPJ — Workspace Proker**

Modul berikutnya

Aku sudah mencocokkan bagian Dokumen & LPJ pada PRD dan Analysis System. Rekomendasiku: **satu tempat penyimpanan dokumen dengan satu fitur LPJ yang terintegrasi.** Tidak perlu membuat banyak submenu.

## **A. Konsep utama**

Semua dokumen kegiatan berada di satu tempat, mulai dari proposal sampai LPJ.

**Dokumen & LPJ**

**Semua Dokumen**

Proposal, surat, materi rapat, dokumentasi, dan bukti transaksi.

**LPJ**

Laporan akhir dan kelengkapan kegiatan.

## **B. Semua Dokumen**

Jenis dokumen yang dapat disimpan:

| **Kategori** | **Contoh** |
| --- | --- |
| Perencanaan | Proposal, TOR |
| Administrasi | Surat, notulen |
| Pelaksanaan | Rundown, daftar hadir |
| Dokumentasi | Foto dan video kegiatan |
| Keuangan | Bukti pemasukan dan pengeluaran |
| Pelaporan | LPJ dan dokumen final |

Form tambah dokumen cukup sederhana:

- Nama dokumen.

- Kategori.

- Link atau file.

- Deskripsi (opsional).

- Tanggal dokumen.

- Status Draft atau Final.

Fitur lainnya cukup Tambah, Buka, Edit Informasi, Lihat Riwayat, dan Arsipkan.

web hipmi(2).docx

## **C. Sistem LPJ**

Ini bagian yang ingin aku sederhanakan.

Menurutku, LPJ jangan hanya berupa upload file PDF. Sistem sebaiknya membantu mengumpulkan informasi kegiatan yang sudah tersedia.

**LPJ Business Expo**

Dalam Penyusunan

**Ringkasan kegiatan**

- Informasi Proker.

- Progres dan hasil kegiatan.

- Agenda yang telah dilaksanakan.

- Jumlah peserta.

- Ringkasan pemasukan dan pengeluaran.

- Dokumentasi kegiatan.

**Dokumen LPJ**

**LPJ\_Final.pdf**

Dokumen ilustrasi

Final

**Dokumentasi Kegiatan**

Tersedia

Ringkasan diambil dari data yang sudah tercatat pada menu lain. Pengelola tidak perlu menginput ulang semuanya.

Jadi, LPJ menggabungkan:

1. Data progres.

1. Data agenda.

1. Jumlah peserta dan kehadiran.

1. Data keuangan.

1. Dokumentasi kegiatan.

1. Dokumen LPJ final.

Ini sesuai rancangan integrasi LPJ dalam dokumen acuan.

web hipmi(2).docx

## **D. Alur penyelesaian dan penutupan Proker**

1. **Main Event selesai<br>**Status Proker berubah menjadi Pasca-kegiatan.

1. **Pengelola melengkapi dokumen<br>**Mengumpulkan dokumentasi, laporan, dan bukti transaksi.

1. **Pengelola menyelesaikan LPJ<br>**Melengkapi ringkasan dan mengunggah dokumen final.

1. **Kepala Kompartemen melakukan pemeriksaan<br>**Memeriksa kelengkapan dokumen dan hasil kegiatan.

1. **Proker ditutup<br>**Kepala Kompartemen melakukan penutupan resmi.

1. **Workspace menjadi arsip<br>**Akses operasional berakhir, tetapi histori tetap tersimpan.

Catatan penting:

- Main Event selesai tidak otomatis menutup Workspace.

- Bendum tetap memonitor keuangan, bukan mengambil alih penutupan Proker atau LPJ.

- Pengelola tetap memiliki akses selama penyelesaian administrasi.

- Setelah ditutup, histori dokumen, keuangan, agenda, dan progres tetap tersedia bagi pihak berwenang.<br> web hipmi.docx<br>

## **E. Pembagian kewenangan**

| **Aktivitas** | **Pengelola Proker** | **Kepala Kompartemen** | **Anggota Tim** |
| --- | --- | --- | --- |
| Tambah dokumen | Ya | Ya | Tidak |
| Edit dokumen | Ya | Ya | Tidak |
| Melihat dokumen | Ya | Ya | Read-only sesuai akses |
| Menyusun LPJ | Ya | Monitoring | Tidak |
| Memeriksa LPJ | Tidak | Ya | Tidak |
| Menutup Proker | Tidak | Ya | Tidak |

## **F. Satu keputusan terakhir untuk Dokumen & LPJ**

Aku ingin memastikan bagaimana LPJ akan dibuat supaya tidak merepotkan Pengelola Proker.

**Bagaimana mekanisme pembuatan LPJ yang kita inginkan?**

LPJ Semiotomatis — Dikunci

**Sistem membantu menyusun LPJ berdasarkan data yang sudah tersedia.**

**Otomatis dikumpulkan oleh sistem:**

- Informasi Proker.

- Riwayat progres.

- Agenda dan kegiatan.

- Jumlah peserta dan kehadiran.

- Pemasukan dan pengeluaran.

**Dilengkapi Pengelola Proker:**

- Narasi laporan kegiatan.

- Hasil dan evaluasi kegiatan.

- Dokumentasi.

- File LPJ final.

## **06. Workspace Kompartemen**

Fokus: Kepala Kompartemen & Staff

Tujuan modul ini adalah menyediakan ruang kerja bagi setiap Kompartemen untuk mengelola aktivitas, anggota, tugas, dan administrasi internalnya.

Prinsip kita tetap sama: satu sistem, sederhana, dan mengikuti struktur organisasi.

## **A. Konsep dasar Workspace Kompartemen**

Aku merekomendasikan **Workspace Kompartemen dan Workspace Proker menggunakan satu kerangka navigasi yang sama, tetapi isi, fungsi, dan lingkup aksesnya berbeda.**

Jadi kita tidak membuat dua sistem yang berbeda.

Contohnya:

- Workspace Kompartemen PSDM mengelola seluruh aktivitas Kompartemen PSDM.

- Workspace Proker Leadership Camp hanya mengelola pelaksanaan Leadership Camp.

- Kepala Kompartemen dapat berpindah dan memonitor seluruh Workspace Proker bawahannya.

- Pengelola Proker hanya mendapatkan akses ke Proker yang ditugaskan kepadanya.<br> analisis arsitektur.docx

## **B. Struktur navigasi Workspace Kompartemen**

Aku menyederhanakan struktur menu menjadi delapan menu utama.

## **HIPMI CENTRAL**

Workspace Aktif

Organization Management

KONTEKS WORKSPACE

**Kompartemen PSDM**

Kabinet Aktif · Bidang OKK

Ganti Workspace

**Overview**

Ringkasan aktivitas

**Anggota**

Staff Kompartemen

**Program Kerja**

Daftar dan pengelolaan Proker

**Progres & Pleno**

Progres unit dan monitoring Proker

**Kalender & Agenda**

Jadwal dan kegiatan

**Persuratan**

Pengajuan surat ke Sekum

**Keuangan**

Kas dan pengajuan dana

**Dokumen & LPJ**

Dokumen dan laporan

Statistik dan riwayat aktivitas digabungkan ke Overview serta halaman terkait agar sidebar tidak terlalu panjang.

Menurutku delapan menu ini sudah cukup. Kita tidak perlu membuat menu statistik, tugas, dan riwayat menjadi sidebar tersendiri untuk Kompartemen.

## **C. Fungsi setiap menu**

### **1. Overview**

Halaman pertama ketika Kepala Kompartemen membuka workspace.

Informasi yang ditampilkan:

# **Overview Kompartemen**

Bidang OKK · Kompartemen PSDM

# **6**

Total Program Kerja

# **3**

Proker Berjalan

# **4**

Agenda Terlaksana

# **2**

Pleno Belum Dilaporkan

**Monitoring Program Kerja**

**Seminar Kewirausahaan**

Berjalan

**Business Expo**

Persiapan

**Business Competition**

Pasca-kegiatan

**Informasi lainnya**

- Agenda terdekat.

- Jadwal pleno.

- Ringkasan keuangan (jika memiliki permission).

- Pengajuan surat terbaru.

- Pengajuan dana terbaru.

- Aktivitas terbaru.<br>Ilustrasi UI dan angka, bukan data aktual. Progres ditampilkan dengan status operasional, bukan persentase bebas.

Overview tidak perlu memiliki formulir input sendiri. Informasi diperoleh dari aktivitas pada menu lainnya.

web hipmi(2).docx

### **2. Anggota**

Menampilkan Staff yang berada di bawah Kompartemen.

Informasi:

- Nama.

- Foto profil.

- Jabatan.

- Kontak sesuai izin.

- Status penugasan.

- Tugas atau tanggung jawab sesuai permission.

Penting: daftar Staff Kompartemen berbeda dengan daftar anggota tim Proker.

Penempatan jabatan Staff mengikuti pengelolaan struktur organisasi. Sementara roster kepanitiaan dikelola dalam Workspace Proker.

### **3. Program Kerja**

Fitur operasional utama Kepala Kompartemen

Kepala Kompartemen dapat:

- Membuat Proker baru.

- Mengedit informasi Proker bawahannya.

- Melihat seluruh Proker.

- Menunjuk Pengelola Proker.

- Mencabut penugasan Pengelola Proker.

- Menambahkan anggota tim.

- Menutup Proker.

- Mengarsipkan Proker sesuai ketentuan.

Tampilan daftar Proker:

**Program Kerja**

Aktif

**Seminar Kewirausahaan**

Ketua Pelaksana: Andi

Berjalan

**Business Expo**

Ketua Pelaksana: Budi

Persiapan

**Business Competition**

Ketua Pelaksana: Citra

Pasca-kegiatan

Tambah Program KerjaContoh tampilan daftar Proker.

**Alur membuat Proker:**

1. **Kepala Kompartemen membuka Program Kerja.**

1. Memilih Tambah Proker.

1. Mengisi nama, deskripsi, tujuan, Ketua Pelaksana, tanggal, lokasi, dan informasi yang diperlukan.

1. Menyimpan Draft atau membuat Proker.

1. Workspace Proker otomatis tersedia.

1. Proker muncul di daftar monitoring Kompartemen.

Form pembuatan cukup sederhana:

| **Informasi** | **Keterangan** |
| --- | --- |
| Nama Proker | Wajib |
| Deskripsi | Penjelasan kegiatan |
| Tujuan | Tujuan pelaksanaan |
| Ketua Pelaksana | Nama dan NIM |
| Tanggal mulai | Perencanaan |
| Main Event | Tanggal pelaksanaan utama |
| Target selesai | Target penyelesaian |
| Lokasi | Opsional |
| Foto/banner | Opsional |

Identitas Kabinet, Bidang, dan Kompartemen otomatis mengikuti workspace asal.

web hipmi(2).docx

### **4. Progres & Pleno**

Ini penting karena Kompartemen juga mempunyai perkembangan pekerjaan sendiri, bukan sekadar memonitor Proker.

Aku menyarankan dua tab:

**Progres & Pleno**

**Progres Kompartemen**

**Monitoring Proker**

**A. Progres Kompartemen**

- Penyusunan rencana kerja.

- Koordinasi Staff.

- Evaluasi internal.

- Catatan perkembangan.

- Dokumentasi pendukung.

**B. Monitoring Progres Proker**

| **Program Kerja** | **Status** | **Pleno** |
| --- | --- | --- |
| Seminar | Berjalan | Sudah |
| Expo | Persiapan | Belum |
| Kompetisi | Pasca-kegiatan | Sudah |

Untuk Pleno, Kepala Kompartemen dapat:

- Membuat jadwal pleno.

- Mencatat hasil pleno.

- Melihat laporan pleno Proker.

- Memantau Proker yang belum menyampaikan laporan.

**Aturan penting:** Progres Kompartemen dan Progres Proker tidak boleh dicampur. Progres Kompartemen memiliki catatan sendiri, bukan hasil rata-rata perkembangan Proker.

analisis arsitektur.docx

### **5. Kalender & Agenda**

Menjadi akses kalender dalam konteks Kompartemen.

Fitur:

- Melihat kalender organisasi.

- Melihat agenda Kompartemen.

- Membuat agenda mandiri Kompartemen.

- Memantau agenda Proker.

- Melihat jadwal pleno dan rapat.

- Mengelola agenda sesuai permission.

Kalender tetap satu dengan kalender organisasi yang telah kita sepakati. Tidak membuat kalender baru khusus Kompartemen.

### **6. Persuratan**

Fitur:

- Mengajukan surat umum.

- Mengajukan surat untuk Ditmawa.

- Melihat status pengajuan.

- Melihat catatan revisi.

- Melihat arsip surat Kompartemen.

Seluruh pengajuan masuk ke Central Inbox Sekum.

Kepala Kompartemen tidak bisa melewati proses administrasi Sekum.

### **7. Keuangan**

Fitur:

- Melihat saldo Kompartemen.

- Mencatat pemasukan dan pengeluaran.

- Melihat transfer masuk dan keluar.

- Mengajukan dana kepada Bendum.

- Melihat pengajuan dana.

- Melihat riwayat transaksi.

- Monitoring keuangan Proker bawahannya.

Staff dapat membantu pencatatan dan pengajuan dana apabila memiliki permission, tetapi tidak bisa menyetujui atau mencairkan dana.

### **8. Dokumen & LPJ**

Tempat penyimpanan dokumen administrasi Kompartemen.

Fitur:

- Dokumen perencanaan.

- Dokumen rapat dan pleno.

- Proposal kegiatan.

- Dokumen pendukung.

- LPJ Proker.

- Arsip dokumen.

LPJ Proker tetap dikerjakan dalam Workspace Proker, sedangkan Kepala Kompartemen dapat memantau dan mengakses laporan sesuai kewenangan.

## **D. Pembagian tugas dalam Workspace Kompartemen**

Ini harus jelas supaya Kepala Kompartemen dan Staff tidak saling mengambil alih pekerjaan.

| **Aktivitas** | **Kepala Kompartemen** | **Staff** |
| --- | --- | --- |
| Melihat Overview | Ya | Ya |
| Membuat Proker | Ya | Tidak otomatis |
| Mengedit Proker | Ya | Sesuai izin |
| Menunjuk Pengelola Proker | Ya | Tidak |
| Mengelola roster tim Proker | Ya | Sesuai izin |
| Input progres Kompartemen | Ya | Sesuai izin |
| Monitoring Proker | Ya | Ya |
| Mengelola pleno | Ya | Sesuai izin |
| Membuat agenda | Ya | Sesuai izin |
| Mengajukan surat | Ya | Sesuai permission |
| Mengelola keuangan | Ya | Sesuai permission |
| Mengajukan dana | Ya | Sesuai permission |
| Menutup Proker | Ya | Tidak |

Hak Staff memang tidak harus sama. Admin menyediakan template permission, lalu akses Staff mengikuti tanggung jawabnya.

web hipmi (1).docx

**Kewenangan monitoring lainnya:**

- Kepala Bidang dapat memantau Kompartemen di bawah Bidangnya, tetapi tidak otomatis menjadi pengelola Workspace Kompartemen.

- Top Management memperoleh akses monitoring, bukan otomatis hak mengubah operasional unit.

- Pengelola Proker hanya mengakses Workspace Proker yang ditugaskan, bukan Workspace Kompartemen.

## **E. Mekanisme roster dan akses Proker**

Ini bagian yang tidak boleh kita campur.

Ada dua daftar yang berbeda:

**Pengelola Proker**

Akses workspace

- Kader terverifikasi.

- Memiliki akun.

- Ditunjuk Kepala Kompartemen.

- Dapat mengelola Workspace Proker.

**Anggota Tim**

Keanggotaan tim

- Kader atau nonkader.

- Tercatat sebagai panitia.

- Memiliki jabatan kepanitiaan.

- Tidak otomatis memiliki akses pengelolaan.

Satu Proker boleh mempunyai beberapa Pengelola Proker. Namun, Pengelola Proker tidak boleh menunjuk Pengelola Proker lainnya.

Kepala Kompartemen mengatur pemberian akses, sedangkan Pengelola Proker mengelola daftar anggota tim.

analisis arsitektur.docx

Workspace Kompartemen — Dikunci

**1. Navigasi**

- Menggunakan delapan menu utama.

- Statistik dan riwayat digabung ke halaman terkait.

- Tidak ada menu tambahan yang membuat sidebar terlalu panjang.

**2. Kewenangan Kepala Kompartemen**

- Dapat membuat dan menjalankan Proker secara langsung.

- Tidak memerlukan persetujuan tambahan Kepala Bidang, Top Management, atau Admin.

- Pengajuan surat tetap melalui Sekum.

- Persetujuan dan pencairan dana tetap melalui Bendum.

## **07. Workspace Proker**

Fokus: Pengelola Proker dan Anggota Tim

Tujuan Workspace Proker adalah menjadi ruang kerja khusus untuk menjalankan satu Program Kerja, mulai dari persiapan, pembagian tugas, pelaksanaan, sampai evaluasi dan LPJ.

Prinsip pentingnya: **Workspace Kompartemen mengelola banyak Proker, sedangkan Workspace Proker mengelola satu kegiatan secara spesifik.**

## **A. Konsep dasar Workspace Proker**

Satu Proker memiliki satu Workspace sendiri.

Contohnya:

**Kabinet Aktif**

BIDANG OKK

**Kompartemen PSDM**

**Leadership Camp**

Workspace

**Business Expo**

Workspace

**Seminar Kewirausahaan**

Workspace

Setiap Proker memiliki ruang kerja dan informasi yang terpisah.

Kepala Kompartemen dapat memonitor dan mengelola seluruh Workspace Proker di bawahnya. Pengelola Proker hanya mengakses Proker yang ditugaskan kepadanya.

web hipmi (1).docx

## **B. Struktur navigasi Workspace Proker**

Aku merekomendasikan tujuh menu utama. Beberapa fitur kita gabungkan supaya tidak terlalu banyak menu.

**HIPMI CENTRAL**

Workspace Aktif

Organization Management

WORKSPACE SWITCHER

**Business Expo**

Kabinet Aktif → OKK → PSDM

Ganti Workspace

**1. Overview**

Ringkasan kegiatan dan informasi Proker

**2. Tim Pelaksana**

Roster, jabatan, dan keanggotaan

**3. Tugas & Progres**

Pembagian tugas dan perkembangan kegiatan

**4. Kalender & Agenda**

Jadwal, rapat, event, dan tiket

**5. Persuratan**

Surat dan proposal

**6. Keuangan**

Dana, transaksi, dan saldo

**7. Dokumen & LPJ**

Dokumen, dokumentasi, dan laporan

Rekomendasi sidebar Workspace Proker. Riwayat aktivitas berada di halaman terkait, bukan menu terpisah.

Perbedaan dengan Workspace Kompartemen:

| **Workspace Kompartemen** | **Workspace Proker** |
| --- | --- |
| Mengelola Staff | Mengelola tim pelaksana |
| Mengelola banyak Proker | Mengelola satu Proker |
| Progres & Pleno unit | Tugas & Progres kegiatan |
| Monitoring agenda seluruh Proker | Agenda kegiatan sendiri |
| Keuangan Kompartemen | Keuangan Proker |
| Dokumen & LPJ | Dokumen & LPJ |

Struktur ini menyederhanakan beberapa rancangan navigasi lama dan mempertahankan konsep Project 360 dari PRD.

web hipmi(2).docx

prd\_master.md

## **C. Fungsi setiap menu**

### **1. Overview**

Halaman pertama saat Pengelola Proker membuka workspace.

# **Business Expo**

Kompartemen PSDM · Bidang OKK

Persiapan

Workspace Aktif

# **24**

Anggota Tim

# **3**

Tugas Belum Selesai

# **2**

Agenda Mendatang

# **1**

Pengajuan Dana

**Informasi Proker**

- Ketua Pelaksana

- Pengelola Proker

- Tanggal mulai

- Tanggal main event

- Target penyelesaian

**Aktivitas terbaru**

- Poster kegiatan diperbarui.

- Tugas rundown diperbarui.

- Proposal dikirim ke Sekum.

**Agenda terdekat**

- Rapat koordinasi.

- Persiapan pelaksanaan.<br>Ilustrasi UI, bukan data aktual. Informasi keuangan hanya tampil sesuai permission.

Overview tidak menjadi tempat input seluruh data. Semua informasi berasal dari menu masing-masing.

Informasi Proker juga bisa diedit melalui tombol Edit Informasi di halaman ini. Jadi tidak perlu menu tambahan.

### **2. Tim Pelaksana**

Menu ini mengelola seluruh orang yang terlibat dalam kegiatan.

Fitur:

- Tambah anggota.

- Edit anggota.

- Mengubah jabatan kepanitiaan.

- Melihat status anggota.

- Mengeluarkan anggota.

- Melihat riwayat keanggotaan.

Contoh:

| **Nama** | **Jabatan** | **Status** |
| --- | --- | --- |
| Andi | Ketua Pelaksana | Aktif |
| Budi | Sekretaris | Aktif |
| Citra | Bendahara | Aktif |
| Deni | Divisi Acara | Aktif |

**Penting: pisahkan roster dan akses workspace.**

- Pengelola Proker adalah kader terverifikasi yang memiliki akses pengelolaan.

- Anggota Tim adalah orang yang tercatat sebagai panitia, boleh kader maupun nonkader.

- Anggota biasa tidak otomatis memperoleh akses sebagai Pengelola Proker.

Satu Proker dapat mempunyai beberapa Pengelola Proker dengan kewenangan pengelolaan yang sama. Hanya Kepala Kompartemen yang dapat memberikan atau mencabut akses tersebut.

analisis arsitektur.docx

### **3. Tugas & Progres**

Aku sengaja menggabungkan keduanya dalam satu menu, tetapi tetap membedakan fungsi masing-masing.

## **Tugas & Progres**

**Tugas**

**Progres**

**Contoh daftar tugas**

**Membuat surat undangan**

PIC: Budi

Done

**Membuat poster acara**

PIC: Citra

In Progress

**Menghubungi narasumber**

PIC: Andi

Blocked

**Menyiapkan rundown**

PIC: Deni

To Do

**A. Tugas**

Pengelola Proker dapat:

- Membuat tugas.

- Menentukan penanggung jawab.

- Menentukan tenggat waktu.

- Menentukan prioritas.

- Memantau pengerjaan.

- Mengubah atau mengalihkan tugas.

Status tugas cukup empat:

| **Status** | **Arti** |
| --- | --- |
| To Do | Belum dikerjakan |
| In Progress | Sedang dikerjakan |
| Blocked | Terhambat |
| Done | Selesai |

Penanggung jawab harus anggota aktif Proker. Anggota tidak boleh mengubah pekerjaan anggota lain secara otomatis.

**B. Progres**

Digunakan untuk mencatat perkembangan keseluruhan kegiatan.

Form pembaruan progres:

- Tanggal laporan.

- Aktivitas yang telah dilakukan.

- Hasil yang dicapai.

- Kendala.

- Rencana selanjutnya.

- Lampiran jika ada.

Tugas dan progres tidak boleh dianggap sama. Selesainya beberapa tugas tidak otomatis berarti seluruh Proker selesai.

web hipmi(2).docx

### **4. Kalender & Agenda**

Kita tetap menggunakan satu kalender organisasi, bukan membuat kalender terpisah untuk setiap Proker.

Di Workspace Proker, tampilannya difilter berdasarkan kegiatan Proker tersebut.

Fitur:

- Kalender persiapan.

- Jadwal rapat.

- Timeline internal.

- Main Event.

- Tenggat tugas.

- Agenda dan event.

- Pleno dan rapat.

Untuk agenda/event, Pengelola Proker dapat mengelola:

- Informasi acara.

- Jenis tiket.

- Harga tiket.

- Kuota.

- Periode penjualan.

- QRIS.

- Daftar peserta.

- Verifikasi pembayaran.

- Pemindaian barcode.

- Laporan kehadiran.

Agenda yang ditandai publik dapat diteruskan ke halaman Agenda & Tiket website publik sesuai permission publikasi.

### **5. Persuratan**

Fitur:

- Pengajuan surat umum.

- Pengajuan proposal Ditmawa.

- Melihat status pengajuan.

- Melihat catatan revisi Sekum.

- Mengakses dokumen final.

Alur:

1. Pengelola Proker membuat pengajuan.

1. Mengisi judul, keperluan, dan tautan dokumen.

1. Pengajuan masuk ke Central Inbox Sekum.

1. Sekum memeriksa atau meminta revisi.

1. Dokumen final dan status pengajuan dapat dilihat kembali oleh pengaju.

Pengelola Proker tidak bisa menyetujui suratnya sendiri.

### **6. Keuangan**

Fitur:

- Ringkasan saldo.

- Pengajuan dana.

- Pencatatan pemasukan.

- Pencatatan pengeluaran.

- Riwayat transaksi.

- Bukti transaksi.

- Monitoring pencairan dana.

Alur utama:

Pengelola Proker mengajukan dana → Bendum memeriksa → Bendum menyetujui atau menolak → Bendum mencairkan dana → Pengelola mencatat penerimaan dan transaksi sesuai kewenangannya.

Penjualan tiket juga perlu ditampilkan secara terpisah dari dana yang dicairkan Bendum agar tidak terjadi pencampuran pemasukan.

### **7. Dokumen & LPJ**

Tempat penyimpanan:

- Proposal.

- Surat.

- Rundown.

- Dokumentasi kegiatan.

- Bukti transaksi.

- Laporan kegiatan.

- LPJ.

**Prinsip penting:** LPJ tidak boleh meminta pengelola menginput ulang data yang sudah ada di Agenda dan Keuangan.

Contohnya, pemasukan dan pengeluaran yang sudah dicatat tinggal ditampilkan sebagai referensi dalam LPJ.

## **D. Pembagian kewenangan Workspace Proker**

| **Aktivitas** | **Kepala Kompartemen** | **Pengelola Proker** | **Anggota Tim** |
| --- | --- | --- | --- |
| Melihat Overview | Ya | Ya | Terbatas |
| Melihat seluruh roster | Ya | Ya | Tidak |
| Menambah anggota | Ya | Ya | Tidak |
| Menunjuk Pengelola Proker | Ya | Tidak | Tidak |
| Mengelola tugas | Monitoring | Ya | Tugas sendiri sesuai izin |
| Input progres | Ya | Ya | Sesuai penugasan |
| Mengelola agenda | Monitoring | Ya | Tidak |
| Mengajukan surat | Sesuai izin | Sesuai izin | Tidak otomatis |
| Mengelola keuangan | Monitoring | Sesuai izin | Tidak |
| Mengunggah LPJ | Monitoring | Ya | Sesuai tugas |
| Menutup Proker | Ya | Tidak | Tidak |

Top Management tetap berorientasi pada monitoring organisasi, bukan pengelolaan operasional harian.

## **E. Alur penutupan Proker**

Ini salah satu bagian paling penting.

**Tanggal Main Event lewat tidak otomatis menutup Proker.**

Alurnya:

1. **Kegiatan selesai** — Proker masuk tahap pasca-kegiatan.

1. **Penyelesaian administrasi** — Dokumen, keuangan, dan LPJ diperiksa.

1. **Kepala Kompartemen melakukan pemeriksaan** — Melihat kelengkapan dan kendala yang masih ada.

1. **Konfirmasi penutupan** — Sistem menampilkan informasi dan peringatan administrasi.

1. **Proker ditutup** — Hanya Kepala Kompartemen yang berwenang.

1. **Workspace menjadi arsip** — Akses operasional dihentikan, tetapi riwayat tetap tersedia bagi pihak yang berhak.

Keputusan ini mengikuti ketentuan PRD mengenai penutupan, arsip, dan akses read-only.

prd\_master.md

## **F. Ada dua hal yang perlu kita selesaikan**

Saat mencocokkan PRD dan Analysis System, aku menemukan dua ketidakkonsistenan yang sebaiknya tidak kita biarkan.

1. **Hak Anggota Tim:** dokumen analisis lama memperbolehkan anggota memperbarui tugas miliknya, sedangkan PRD master menetapkan Member read-only dan tidak boleh mengelola tugas atau menginput progres.

web hipmi (1).docx

prd\_master.md

2. **Persentase progres:** dokumen analisis lama masih menggunakan persentase progres, sedangkan PRD master menetapkan tidak menggunakan angka progres 0–100%. Ini perlu diseragamkan.

web hipmi(2).docx

prd\_master.md

Untuk poin kedua, rekomendasiku adalah memakai status tahapan, tugas, catatan perkembangan, kendala, dan hasil. Tidak perlu persentase manual.

### **Pertanyaan pertama: hak Anggota Tim**

**Anggota Tim biasa boleh melakukan apa di Workspace Proker?**

Dikunci — Akses Anggota Tim

**Anggota Tim Workspace Proker: Read-only**

Anggota Tim hanya dapat:

- Melihat informasi Proker.

- Melihat jadwal yang relevan.

- Melihat perkembangan umum Proker.

Anggota Tim tidak dapat:

- Mengubah informasi Proker.

- Mengelola atau memperbarui tugas.

- Menginput progres.

- Menambah atau menghapus anggota.

- Mengakses pengelolaan keuangan dan persuratan.

- Mengubah dokumen dan LPJ.

**Pembagian akses sekarang:**

| **Pengguna** | **Akses** |
| --- | --- |
| Kepala Kompartemen | Monitoring dan kewenangan pengelolaan |
| Pengelola Proker | Pengelolaan operasional Proker |
| Anggota Tim | Read-only |
| Top Management | Monitoring organisasi |

## **Selanjutnya: Finalisasi Tugas & Progres**

Aku ingin menyederhanakan sistem ini dengan memisahkan dua hal:

1. **Tugas:** pekerjaan yang dibagikan Pengelola Proker kepada anggota tim.

1. **Progres:** laporan perkembangan keseluruhan kegiatan Proker.

Untuk progres, rekomendasiku mengikuti PRD master: tidak menggunakan persentase manual 0–100%, tetapi menggunakan status tahapan, hasil pekerjaan, kendala, dan catatan perkembangan.

**Apakah kita tetapkan sistem progres tanpa persentase tersebut?**

Progres Proker — Dikunci

**Tidak menggunakan persentase manual 0–100%.**

Perkembangan Proker dinilai melalui:

1. Status tahapan kegiatan.

1. Penyelesaian tugas.

1. Hasil pekerjaan.

1. Catatan perkembangan.

1. Kendala dan tindak lanjut.

## **1. Finalisasi sistem Tugas & Progres**

Kita pisahkan menjadi dua tab dalam satu menu.

### **Tab A — Tugas**

Status tugas hanya empat:

| **Status** | **Keterangan** |
| --- | --- |
| To Do | Belum dikerjakan |
| In Progress | Sedang dikerjakan |
| Blocked | Terhambat |
| Done | Selesai |

Pengelola Proker dapat membuat tugas, menentukan PIC, tenggat, dan memperbarui status.

### **Tab B — Progres**

Setiap laporan perkembangan berisi:

- Tanggal laporan.

- Aktivitas yang dilakukan.

- Hasil yang dicapai.

- Kendala.

- Rencana tindak lanjut.

- Dokumentasi atau lampiran.

Laporan ditampilkan secara kronologis sehingga perkembangan kegiatan mudah ditelusuri.

## **2. Hubungan Tugas dan Progres**

Kita tetapkan aturan berikut:

- Tugas selesai tidak otomatis berarti Proker selesai.

- Progres dapat dicatat meskipun tidak berasal dari tugas.

- Penyelesaian surat, konfirmasi sponsor, pendaftaran peserta, dan pelaksanaan kegiatan dapat menjadi bukti perkembangan.

- Penutupan Proker tetap menjadi kewenangan Kepala Kompartemen.

## **3. Hak akses final**

| **Aktivitas** | **Pengelola Proker** | **Anggota Tim** |
| --- | --- | --- |
| Membuat tugas | Ya | Tidak |
| Mengubah tugas | Ya | Tidak |
| Memperbarui status | Ya | Tidak |
| Menginput progres | Ya | Tidak |
| Melihat perkembangan umum | Ya | Ya |
| Mengelola laporan | Ya | Tidak |

## **4. Satu hal kecil yang perlu kita pastikan**

Karena Anggota Tim sudah kita tetapkan sebagai read-only, bagaimana dengan penentuan PIC tugas?

**Apakah Pengelola Proker boleh menunjuk anggota tim sebagai PIC tugas, meskipun anggota tersebut tidak bisa melihat detail tugas di website?**

PIC Tugas — Dikunci

**Hanya Pengelola Proker yang boleh menjadi PIC tugas.**

- PIC tugas harus merupakan Pengelola Proker yang memiliki akses workspace.

- Anggota Tim tidak dapat menjadi PIC.

- Anggota Tim tetap memiliki akses Read-only.

- Pengelola Proker bertanggung jawab mengelola tugas dan memperbarui statusnya.

## **Rekap final Tugas & Progres**

| **Komponen** | **Keputusan** |
| --- | --- |
| Pengelolaan tugas | Pengelola Proker |
| PIC tugas | Pengelola Proker |
| Status tugas | To Do, In Progress, Blocked, Done |
| Input progres | Pengelola Proker |
| Persentase 0–100% | Tidak digunakan |
| Laporan progres | Aktivitas, hasil, kendala, tindak lanjut |
| Akses Anggota Tim | Read-only |
| Penutupan Proker | Kepala Kompartemen |

# **1. Struktur final navigasi Admin Panel**

**ADMIN PANEL**

5 Menu Utama

Kabinet Aktif · 2026/2027

**Dashboard**

Ringkasan pengelolaan kabinet

**Struktur Organisasi**

Bidang, Kompartemen, jabatan, penugasan

**Pengguna & Kader**

Akun, profil, dan status kader

**Akses & Permission**

Role, hak akses, dan penugasan akses

**Pengaturan & Aktivitas**

Konfigurasi kabinet, modul, dan audit

# **2. Menu pertama — Dashboard Admin**

Menurutku, Dashboard Admin harus berfungsi sebagai pusat pemantauan administrasi kabinet, bukan tempat Admin mengerjakan seluruh kegiatan organisasi.

Karena setiap kabinet memiliki dashboard sendiri, seluruh informasi di sini mengikuti kabinet yang sedang dipilih.

## **A. Informasi yang ditampilkan**

Aku merekomendasikan empat bagian saja.

**1. Ringkasan kabinet**

KABINET AKTIF

# **Kabinet HIPMI 2026/2027**

Aktif

# **150**

Pengguna terkait

# **85**

Kader terkait

# **4**

Bidang

# **12**

Kompartemen

**2. Administrasi yang membutuhkan tindakan**

- Verifikasi kader.

- Akun bermasalah.

- Penempatan pengurus yang belum selesai.

- Konflik data.

- Konfigurasi yang perlu diperiksa.

**3. Ringkasan struktur organisasi**

- Jumlah Bidang.

- Jumlah Kompartemen.

- Jabatan terisi.

- Jabatan belum terisi.

**4. Aktivitas terbaru**

- Pengguna baru terdaftar.

- Perubahan status akun.

- Verifikasi kader.

- Pengangkatan pengurus.

- Perubahan permission.

Informasi ini mengikuti cakupan Dashboard Admin dalam Analysis System.

analisis arsitektur.docx

## **B. Hal yang tidak perlu ditampilkan**

Agar Dashboard Admin tidak terlalu ramai, menurutku tidak perlu menampilkan:

- Detail transaksi keuangan.

- Detail persuratan.

- Tugas harian pengurus.

- Detail pelaksanaan Proker.

- Kalender kegiatan secara lengkap.

- Progres operasional Kompartemen.

Itu merupakan tanggung jawab masing-masing pengurus. Admin cukup mengelola sistem dan mengawasi aspek administratif.

Dashboard Admin — Final

Dashboard menggunakan konsep **System Administration Overview**.

Hanya menampilkan empat bagian:

1. Ringkasan kabinet.

1. Administrasi yang membutuhkan tindakan.

1. Ringkasan struktur organisasi.

1. Aktivitas terbaru.

Seluruh informasi mengikuti kabinet yang sedang dipilih. Tidak mengambil alih pekerjaan operasional pengurus.

# **Menu 2 — Struktur Organisasi**

Selanjutnya kita bahas pengelolaan struktur organisasi dengan urutan:

**Kabinet → Bidang → Kompartemen → Jabatan → Penempatan Pengurus.**

## **A. Konsep utama**

Admin mengelola struktur organisasi kabinet, mulai dari pembentukan Bidang sampai penempatan pengurus.

Kita gunakan tampilan hierarki, bukan form yang terpisah-pisah.

**Kabinet HIPMI 2026/2027**

**Bidang External**

Aktif

**Partnership**

Belum diisi

**Media Komunikasi**

Terisi

**Bidang Internal**

Aktif

**PSDM**

Terisi

**Organisasi**

Belum diisi

Ilustrasi hierarki dan status pengisian pengurus. Tambah Bidang

## **B. Fungsi yang tersedia**

Cukup tiga kelompok pengelolaan:

| **Kelompok** | **Fungsi** |
| --- | --- |
| Bidang | Tambah, edit, dan lihat Bidang |
| Kompartemen | Tambah, edit, dan lihat Kompartemen |
| Jabatan & Penempatan | Mengatur jabatan dan menempatkan pengurus |

Struktur Bidang dan Kompartemen mengikuti hierarki kabinet yang sudah ditetapkan dalam PRD.

web hipmi(2).docx

## **C. Alur pengelolaan**

1. Admin membuka Struktur Organisasi.

1. Admin menambahkan Bidang.

1. Admin membuka Bidang tersebut.

1. Admin menambahkan Kompartemen.

1. Sistem menampilkan jabatan yang tersedia dan status pengisiannya.

1. Admin dapat melakukan penempatan pengurus berdasarkan keputusan organisasi.

Kalau belum ada pengurus, cukup tampilkan status **Belum Diisi**. Admin tidak harus langsung mengisi seluruh jabatan.

web hipmi(2).docx

## **D. Hal penting: Bedakan Jabatan, Role, dan Permission**

Ini perlu kita pertahankan agar sistem tidak membingungkan.

| **Istilah** | **Contoh** |
| --- | --- |
| Jabatan | Kepala Kompartemen |
| Role | Kepala Kompartemen |
| Permission | Mengelola Proker di Kompartemennya |

Untuk Staff, kita tetap menggunakan satu Role Staff. Lingkup Bidang atau Kompartemen menentukan cakupan aksesnya.

**Pengelola Proker juga berbeda:** penugasannya merupakan akses operasional Proker, bukan jabatan struktural. Kepala Kompartemen yang memberikan penugasan tersebut.

## **E. Rekomendasi UI**

Aku menyarankan satu halaman dengan tiga tab:

- **Struktur:** hierarki Bidang dan Kompartemen.

- **Jabatan:** daftar master jabatan.

- **Penempatan Pengurus:** daftar jabatan yang sudah dan belum terisi.

Tidak perlu tiga menu sidebar terpisah.

## **F. Kita tentukan satu keputusan**

**Siapa yang bertanggung jawab melakukan penempatan pengurus ke jabatan struktural?**

Penempatan Pengurus — Dikunci

**Admin bertugas melakukan penempatan administratif berdasarkan keputusan resmi organisasi.**

- Top Management/organisasi menentukan pengangkatan pengurus.

- Admin menerima keputusan resmi tersebut.

- Admin memilih akun pengguna dan jabatan yang sesuai.

- Admin menetapkan penempatan pada kabinet, Bidang, atau Kompartemen.

- Sistem memberikan akses berdasarkan jabatan dan permission.

- Riwayat penempatan tetap tersimpan.

**Batas kewenangan:** Admin tidak berhak menentukan atau mengangkat pengurus atas keputusan pribadi.

SIAPPP! 🔥 Kita tetapkan sebagai keputusan final.

Aturan Jabatan Struktural — Dikunci

1. Satu pengguna hanya boleh memiliki satu jabatan struktural aktif dalam satu kabinet.

1. Pengguna tidak boleh merangkap jabatan struktural dalam kabinet yang sama.

1. Penugasan sebagai Pengelola Proker diperbolehkan karena bukan jabatan struktural.

1. Penempatan dan pergantian pengurus dilakukan Admin berdasarkan keputusan resmi organisasi.

1. Riwayat jabatan sebelumnya tetap dapat dilihat.

Dengan ini, bagian **Struktur Organisasi** selesai kita rancang secara konseptual.

MANTAPPP! 🔥 Kita kunci aturan tersebut.

Aturan Jabatan — Final

- Satu pengguna maksimal satu jabatan struktural aktif dalam satu kabinet.

- Tidak boleh merangkap jabatan struktural.

- Boleh mendapatkan penugasan sebagai Pengelola Proker.

- Riwayat jabatan sebelumnya tetap tersimpan.

# **Menu 3 — Pengguna & Kader**

Sekarang kita masuk ke pengelolaan akun dan keanggotaan.

## **A. Konsep utama**

Menurutku, menu ini menjadi pusat pengelolaan seluruh pengguna HIPMI CENTRAL.

Admin dapat mencari, melihat, memeriksa, dan mengelola akun pengguna serta status keanggotaannya.

## **B. Tampilan utama**

**Pengguna & Kader**

# **150**

Total Pengguna

# **85**

Kader

Pencarian pengguna

Semua

Mahasiswa Biasa

Kader

Inactive

**Andi Pratama**

220101001 · Kader 2

Aktif

**Budi Santoso**

220101002 · Mahasiswa Biasa

Aktif

**Citra Amelia**

220101003 · Kader 1

Menunggu Verifikasi

Ilustrasi UI dengan data fiktif.

## **C. Fungsi utama**

Cukup empat fungsi:

| **Fungsi** | **Keterangan** |
| --- | --- |
| Daftar Pengguna | Melihat seluruh akun |
| Detail Pengguna | Melihat profil dan informasi keanggotaan |
| Verifikasi Kader | Memeriksa status keanggotaan |
| Pengelolaan Akun | Mengaktifkan atau menonaktifkan akun |

Pada Detail Pengguna, cukup ada empat kelompok informasi:

1. Identitas: NIM, nama, email, telepon, foto.

1. Keanggotaan: status mahasiswa/kader, level kader, verifikasi.

1. Organisasi: kabinet, jabatan, Bidang, Kompartemen.

1. Aktivitas: Proker, agenda yang dihadiri, dan riwayat jabatan.

web hipmi(2).docx

**Catatan penting:** Status akun, status kader, dan status penugasan jabatan harus tetap dibedakan. Ketiganya bukan hal yang sama.

Pengelolaan Database Kader yang lebih luas juga dapat diberikan kepada pengguna berpermission PSDM, tidak harus selalu Admin Sistem.

web hipmi(2).docx

## **D. Kita tentukan satu keputusan**

Bagaimana jika ada pengguna yang sudah tidak aktif atau tidak lagi menggunakan akun HIPMI CENTRAL?

**Apakah Admin boleh menghapus akun secara permanen?**

**Pengguna & Kader — Dikunci**

**Admin tidak boleh menghapus akun secara permanen.**

- **Admin hanya dapat mengaktifkan atau menonaktifkan akun.**

- **Data dan riwayat organisasi tetap dipertahankan.**

- **Riwayat jabatan, Proker, kehadiran, dan aktivitas tidak ikut terhapus.**

# **1. Penambahan data dan konversi akun menjadi Kader**

**Menurutku, kita perlu membedakan dua kondisi:**

- **Database Kader: tempat Admin mengelola data keanggotaan kader.**

- **Akun Pengguna: akun yang digunakan mahasiswa untuk login ke HIPMI CENTRAL.**

**Keduanya saling terhubung melalui NIM.**

## **1.1 Tambah Data Kader**

**Di dalam menu Pengguna & Kader, kita tambahkan dua tab saja:**

**Pengguna & Kader**

**Akun Pengguna**

**Database Kader**

**Database Kader**

**Daftar keanggotaan kader**

**Admin**

**Tambah Data Kader**

| **NIM** | **Nama** | **Tingkat** |
| --- | --- | --- |
| **220101001** | **Andi** | **Kader 2** |
| **220101002** | **Budi** | **Kader 1** |
| **220101003** | **Citra** | **Kader 3** |

**Ilustrasi tampilan.**

**Saat Admin menekan Tambah Data Kader, formulirnya cukup berisi:**

1. **NIM.**

1. **Nama lengkap.**

1. **Tingkat kader (Kader 1, 2, atau 3).**

1. **Tanggal resmi menjadi kader.**

1. **Status keanggotaan (Aktif/Nonaktif).**

1. **Status verifikasi.**

**Data ini mengikuti informasi keanggotaan yang sudah dibahas dalam PRD.**

**web hipmi(2).docx**

## **1.2 Mekanisme tombol Jadikan Akun Kader**

**Nah, ini bagian yang menurutku penting.**

**Tombol Jadikan Akun Kader hanya muncul ketika NIM pengguna ditemukan dalam Database Kader.**

**Contoh tampilan pada detail akun:**

**Andi Pratama**

**NIM: 220101001**

**Mahasiswa Biasa**

**NIM ditemukan dalam Database Kader**

**Data keanggotaan ditemukan dan cocok dengan NIM pengguna.**

**Tingkat Kader**

**Kader 2**

**Status Verifikasi**

**Terverifikasi**

**Jadikan Akun KaderContoh rancangan tombol Admin. Belum merupakan aksi aktif.**

**Ketika Admin menekan tombol tersebut:**

1. **Sistem menampilkan konfirmasi.**

1. **Admin memastikan identitas dan kecocokan NIM.**

1. **Admin mengonfirmasi pengaitan akun dengan data kader.**

1. **Status keanggotaan akun diperbarui.**

1. **Pengguna mendapatkan akses Dashboard Kader.**

**Penting: tombol ini bukan untuk mengangkat seseorang menjadi pengurus. Penempatan jabatan struktural dan penugasan Pengelola Proker tetap melalui proses masing-masing.**

**Jika NIM tidak ditemukan, tampilkan:**

**NIM belum ditemukan**

**Pengguna ini belum memiliki data keanggotaan dalam Database Kader.**

**Admin dapat memeriksa keanggotaan resmi dan menambahkan data kader terlebih dahulu jika memenuhi persyaratan.**

**Alur pencocokan NIM dan pengaitan akun ini memang sudah tercantum dalam PRD.**

**web hipmi(2).docx**

## **2. Detail Kader dan Riwayat**

**Aku setuju banget kalau Detail Kader memiliki halaman Riwayat tersendiri.**

**Cukup tiga tab:**

**Detail Kader**

**Profil**

**Keanggotaan**

**Riwayat**

**Riwayat Aktivitas**

- **2026 — Business Expo<br>Program Kerja · Ketua Pelaksana**

- **2026 — Seminar Nasional<br>Program Kerja · Divisi Acara**

- **2026 — HIPBOND<br>Agenda · Hadir**

- **2025 — Workshop<br>Agenda · Tidak Hadir**

**Contoh riwayat fiktif untuk menggambarkan UI.**

**Riwayat yang ditampilkan:**

- **Riwayat keikutsertaan Proker.**

- **Riwayat jabatan dalam Proker.**

- **Riwayat jabatan organisasi.**

- **Riwayat pendaftaran agenda.**

- **Riwayat kehadiran.**

- **Riwayat kegiatan lainnya.**

**Riwayat diambil otomatis dari aktivitas yang tercatat dalam sistem, bukan diinput manual oleh Admin atau kader.**

**web hipmi(2).docx**

## **2.1 Bagaimana mempertahankan riwayat ketika akun dinonaktifkan?**

**Nah, ini tidak memerlukan tombol khusus untuk menyimpan riwayat.**

**Riwayat tetap tersimpan otomatis. Kita hanya menyediakan tindakan untuk mengelola status akun.**

**Tindakan pada Detail Pengguna**

**Status Akun**

**Aktif**

**Nonaktifkan Akun**

**Ketika tombol ditekan, tampil konfirmasi:**

**Nonaktifkan akun ini?**

**Pengguna tidak dapat login ke HIPMI CENTRAL setelah akun dinonaktifkan.**

**Riwayat organisasi, jabatan, Proker, kehadiran, dan aktivitas tetap tersimpan.**

**Batal**

**Nonaktifkan**

**Ilustrasi dialog konfirmasi.**

**Ada tiga hal yang tetap harus dipisahkan:**

| **Tindakan** | **Dampak** |
| --- | --- |
| **Nonaktifkan Akun** | **Pengguna tidak bisa login** |
| **Nonaktifkan Keanggotaan Kader** | **Status keanggotaannya berakhir** |
| **Akhiri Penugasan** | **Jabatan atau penugasannya berakhir** |

**Jadi, kalau seseorang tidak lagi menjadi pengurus, kita cukup mengakhiri penugasannya. Tidak perlu menonaktifkan akun atau menghapus riwayatnya.**

**Ini sesuai dengan pemisahan status akun, status kader, dan status penugasan dalam PRD.**

**web hipmi(2).docx**

## **Rekap keputusan tambahan Menu 3**

**Rancangan Pengguna & Kader lengkap**

| **No.** | **Keputusan** |
| --- | --- |
| **1** | **Akun tidak boleh dihapus permanen** |
| **2** | **Penambahan data kader melalui Database Kader** |
| **3** | **Pencocokan menggunakan NIM** |
| **4** | **Tombol Jadikan Akun Kader muncul jika NIM cocok** |
| **5** | **Pengaitan akun dilakukan melalui konfirmasi Admin** |
| **6** | **Detail Kader memiliki tab Riwayat** |
| **7** | **Riwayat diperoleh otomatis dari aktivitas sistem** |
| **8** | **Penonaktifan akun tidak menghapus riwayat** |

# **Menu 4 — Akses & Permission**

## **A. Prinsip pengelolaan**

Kita gunakan tiga komponen:

| **Komponen** | **Menentukan** |
| --- | --- |
| Role | Siapa pengguna tersebut? |
| Permission | Apa yang boleh dilakukan? |
| Scope | Di bagian organisasi mana akses berlaku? |

Contoh:

Seorang Staff di Kompartemen PSDM tetap memiliki Role Staff. Namun, Admin dapat memberikan Permission untuk mengajukan surat dan mencatat keuangan. Aksesnya hanya berlaku dalam lingkup unit yang menjadi penugasannya.

## **B. Struktur halaman Akses & Permission**

Aku menyarankan cukup **dua tab utama**, bukan banyak submenu.

**Akses & Permission**

**Template Role**

**Permission Khusus**

**Template Role**

Role yang sudah ditetapkan

**Top Management**

**Sekum**

**Bendum**

**Kepala Bidang**

**Kepala Kompartemen**

**Staff**

**Kader**

**Mahasiswa Biasa**

**Admin Sistem**

### **1. Tab Template Role**

Admin memilih salah satu Role, kemudian mengatur hak akses default untuk Role tersebut.

Contoh jika memilih Staff:

| **Modul** | **Permission** |
| --- | --- |
| Dashboard | View |
| Progres | View, Create |
| Persuratan | Create |
| Keuangan | View, Create |
| Agenda | View |
| Pengaturan Role | Tidak ada |

Ini hanya contoh konfigurasi, bukan permission final.

### **2. Tab Permission Khusus**

Digunakan untuk memberikan akses tambahan kepada pengguna tertentu.

Contoh:

- Content Creator.

- Publisher.

- Pengelolaan database kader.

- Pengelolaan konten tertentu.

Satu pengurus boleh memiliki permission Content Creator sekaligus Publisher.

Admin memilih pengguna, permission tambahan, dan lingkup aksesnya.

## **C. Sistem Scope atau Lingkup Akses**

Ini penting supaya pengguna tidak bisa mengakses seluruh organisasi hanya karena mempunyai permission tertentu.

Kita menggunakan hierarki:

**Pilih lingkup permission**

**Global**

Seluruh sistem (khusus kewenangan global)

**Kabinet**

Satu kabinet

**Bidang**

Satu Bidang

**Kompartemen**

Satu Kompartemen

**Program Kerja**

Satu Proker

**Data Milik Sendiri**

Data pribadi pengguna

**Konten Publik**

Konten yang sudah dipublikasikan

Pilihan lingkup ini mengikuti konsep scope yang sudah tercantum dalam dokumen acuan.

web hipmi(2).docx

## **D. Aturan khusus yang perlu dipertahankan**

Ada tiga aturan penting:

1. **Staff:** tetap satu Role Staff. Admin menentukan template permission berdasarkan kebutuhan penempatan. Kepala Kompartemen boleh menambahkan Staff, tetapi tidak boleh mengubah permission-nya.

web hipmi(2).docx

2. **Pengelola Proker:** akses diberikan Kepala Kompartemen melalui penugasan pada Proker, bukan melalui pembuatan Role baru oleh Admin.

web hipmi(2).docx

3. **Admin Sistem:** boleh mengatur akses, tetapi tidak otomatis menjadi operator persuratan, keuangan, ticketing, atau penutupan Proker.

web hipmi(2).docx

## **E. Satu keputusan sebelum kita kunci struktur permission**

Khusus untuk Staff, bagaimana cara Admin mengatur permission-nya?

Permission Staff — Dikunci

**Satu Role Staff dengan template permission yang fleksibel.**

- Role Staff tetap satu.

- Template permission mengikuti penempatan Bidang atau Kompartemen.

- Admin menentukan kemampuan Staff berdasarkan kebutuhan pekerjaan.

- Kepala Kompartemen boleh menambahkan Staff, tetapi tidak boleh mengubah permission.

- Jika ada kebutuhan akses khusus, pengaturannya tetap melalui Admin.

# **Menu 4 — Alur Pemberian Permission**

Menurutku, kita harus menghindari Admin memberikan izin satu per satu kepada semua pengguna. Sistem sebaiknya memberikan akses dasar secara otomatis berdasarkan jabatan, lalu Admin mengatur pengecualian jika diperlukan.

## **A. Alur pemberian akses otomatis**

1. **Pengguna mendapatkan jabatan<br>**Contoh: Kepala Kompartemen Partnership.

1. **Sistem mengenali Role<br>**Jabatan Kepala Kompartemen otomatis memperoleh Role Kepala Kompartemen.

1. **Sistem menerapkan Permission<br>**Hak akses mengikuti template Role dan lingkup Kompartemen Partnership.

1. **Dashboard dan sidebar menyesuaikan<br>**Pengguna hanya melihat menu dan tindakan yang memang diizinkan.

Jadi Admin tidak perlu memberikan permission satu per satu untuk jabatan yang sudah memiliki template. Ini juga sesuai dengan pemetaan jabatan dan Role dalam dokumen acuan.

web hipmi(2).docx

## **B. Alur khusus Staff**

Untuk Staff, alurnya sedikit berbeda karena permission mengikuti penempatan dan kebutuhan pekerjaan.

**Penempatan Staff**

**Staff Bidang**

Template Staff Bidang

**Staff Kompartemen**

Template Staff Kompartemen

**Sistem menerapkan Permission**

Berdasarkan template yang ditetapkan Admin

**Staff mendapatkan akses**

Sesuai unit dan tugasnya

Contoh:

- Staff A boleh mengajukan surat.

- Staff B boleh mencatat keuangan.

- Staff C boleh mengelola progres dan agenda.

Ketiganya tetap memiliki Role Staff.

## **C. Alur Permission Tambahan**

Jika ada pengurus yang membutuhkan akses tambahan, Admin dapat memberikannya tanpa membuat Role baru.

Contohnya:

**Detail Akses Pengguna**

**Andi Pratama**

Role: Staff Kompartemen

**Permission tambahan**

Content Creator

Aktif

Publisher

Aktif

**Lingkup akses**

Kompartemen Media Komunikasi

Ilustrasi pengaturan akses khusus.

Alurnya:

1. Admin mencari pengguna.

1. Admin melihat Role dan Permission yang sudah dimiliki.

1. Admin menambahkan Permission yang diperlukan.

1. Admin menentukan lingkup akses.

1. Admin menyimpan perubahan.

1. Sistem memperbarui akses pengguna.

Satu pengguna boleh memiliki beberapa Permission tambahan sekaligus.

## **D. Jika Permission atau Jabatan Dicabut**

Ini juga harus sederhana.

| **Kondisi** | **Tindakan sistem** |
| --- | --- |
| Jabatan berakhir | Akses dari jabatan tersebut berakhir |
| Permission tambahan dicabut | Akses khusus tersebut dihentikan |
| Staff berpindah unit | Akses mengikuti penempatan baru |
| Pengelola Proker dicabut | Akses pengelolaan Proker berakhir |
| Akun dinonaktifkan | Pengguna tidak dapat login |

Riwayat penugasan dan aktivitas tetap dipertahankan. Pencabutan akses tidak menghapus catatan aktivitas sebelumnya.

web hipmi(2).docx

## **E. Struktur UI final Menu 4**

Kita pertahankan dua tab yang sudah dirancang:

| **Tab** | **Fungsi** |
| --- | --- |
| Template Role | Mengatur Permission dasar setiap Role dan template Staff |
| Permission Khusus | Menambah atau mencabut Permission khusus pengguna |

Tidak perlu submenu tambahan.

## **F. Satu keputusan berikutnya**

Aku ingin memastikan mekanisme permintaan Permission tambahan.

Menurutku, yang paling sederhana:

**Siapa yang boleh mengajukan kebutuhan Permission tambahan kepada Admin?**

Permission Tambahan — Dikunci

**Hanya Admin yang mengatur dan memberikan Permission tambahan.**

- Tidak ada fitur pengajuan Permission.

- Admin menentukan kebutuhan akses berdasarkan kebutuhan organisasi.

- Admin memberikan Permission kepada pengguna yang bersangkutan.

- Admin menentukan lingkup aksesnya.

- Admin dapat mengubah atau mencabut Permission.

- Seluruh perubahan akses tercatat dalam riwayat aktivitas.

## **Rekap Menu 4 — Akses & Permission**

| **Komponen** | **Keputusan** |
| --- | --- |
| Role | Sudah ditentukan, tidak bebas membuat Role baru |
| Permission | Dapat disesuaikan Admin |
| Scope | Global, Kabinet, Bidang, Kompartemen, Proker, Own, Published |
| Staff | Satu Role dengan template fleksibel |
| Pengelola Proker | Melalui penugasan Kepala Kompartemen |
| Permission tambahan | Hanya Admin |
| Pencabutan akses | Admin atau berakhir mengikuti penugasan |

Menu 4 selesai dirancang

# **Menu 5 — Pengaturan & Aktivitas**

Sekarang kita masuk ke menu terakhir Admin Panel.

Aku menyarankan tetap menggunakan tiga tab:

## **Pengaturan & Aktivitas**

**Pengaturan Kabinet**

Nama, logo, periode, dan status kabinet

**Konfigurasi Sistem**

Pengaturan dan aktivasi modul

**Audit Aktivitas**

Riwayat tindakan dan perubahan sistem

**Prinsipnya:** Pengaturan Kabinet mengatur identitas kabinet, Konfigurasi Sistem mengatur perilaku modul, sedangkan Audit Aktivitas hanya untuk melihat riwayat.

Kita mulai dari satu keputusan:

**Apakah Admin boleh mengaktifkan atau menonaktifkan modul tertentu pada kabinet?**

Contohnya, menonaktifkan modul Media Partner jika kabinet belum menggunakannya, tanpa menghapus data maupun riwayat sebelumnya.

BETULLL! Jadi kalau modul dinonaktifkan, modul tersebut otomatis hilang dari sidebar pengguna pada kabinet tersebut. Kita tetapkan mekanismenya seperti ini. 🔥

Konfigurasi Modul — Disepakati

**Jika Modul Aktif**

- Muncul di sidebar pengguna yang memiliki permission.

- Fitur dapat digunakan sesuai kewenangan.

**Jika Modul Nonaktif**

- Hilang dari sidebar seluruh pengguna kabinet tersebut.

- Tidak dapat diakses melalui URL langsung.

- Data dan riwayat sebelumnya tetap tersimpan.

- Admin tetap dapat melihat status modul dan mengaktifkannya kembali.

- Setelah diaktifkan, modul muncul kembali sesuai permission pengguna.

Contoh:

| **Modul** | **Status** | **Sidebar** |
| --- | --- | --- |
| Persuratan | Aktif | Muncul |
| Keuangan | Aktif | Muncul |
| Media Partner | Nonaktif | Tersembunyi |
| Kotak Suara | Nonaktif | Tersembunyi |

**Catatan:** Pengaturan ini berlaku per kabinet, sehingga menonaktifkan Media Partner di Kabinet A tidak otomatis menonaktifkannya di Kabinet B.

Selanjutnya kita bahas apakah konfigurasi modul cukup berupa tombol Aktif/Nonaktif atau membutuhkan pengaturan tambahan.

## **1. Konfigurasi Sistem**

Aku merekomendasikan cukup menggunakan **toggle Aktif/Nonaktif untuk setiap modul pada masing-masing kabinet.**

**Konfigurasi Modul**

Kabinet Aktif · 2026/2027

**Agenda & Kalender**

Modul aktif

**Persuratan**

Modul aktif

**Keuangan**

Modul aktif

**CMS & Publikasi**

Modul aktif

**Media Partner**

Modul nonaktif

**Kotak Suara**

Modul aktif

Simulasi interaktif, perubahan belum diterapkan ke sistem.

Ketentuannya:

- Toggle ON: modul muncul sesuai permission pengguna.

- Toggle OFF: modul hilang dari sidebar dan tidak dapat diakses melalui URL.

- Data dan riwayat tidak dihapus.

- Pengaktifan kembali mengembalikan akses sesuai permission.

- Pengaturan berlaku hanya untuk kabinet yang dipilih.

Tidak perlu pengaturan tambahan lainnya.

## **2. Audit Aktivitas**

Selanjutnya, kita buat halaman untuk memantau aktivitas penting dalam sistem.

Contoh:

**Audit Aktivitas**

Semua Aktivitas

Pengguna

Permission

Konfigurasi

**Admin Sistem<br>**Mengubah permission Staff

17 Nov 2026 · 14.30

**Admin Sistem<br>**Menonaktifkan modul Media Partner

17 Nov 2026 · 13.15

**Admin Sistem<br>**Menambahkan data kader

17 Nov 2026 · 10.20

Ilustrasi data audit.

Informasi yang dicatat:

- Siapa yang melakukan tindakan.

- Aktivitas yang dilakukan.

- Data atau modul yang terdampak.

- Waktu tindakan.

Admin dapat mencari dan memfilter riwayat, tetapi tidak mengubah catatan audit.

## **3. Kita kunci satu keputusan**

**Apakah Audit Aktivitas hanya boleh dilihat Admin Sistem atau Top Management juga boleh melihatnya?**

**Audit Aktivitas — Dikunci**

**Hanya Admin Sistem yang dapat melihat Audit Aktivitas administratif.**

- **Top Management tidak memiliki akses ke halaman Audit Aktivitas.**

- **Admin dapat melihat seluruh riwayat tindakan administratif.**

- **Admin dapat mencari dan memfilter aktivitas.**

- **Catatan audit tidak dapat diedit atau dihapus oleh Admin.**

- **Setiap tindakan penting tercatat beserta pelaku dan waktunya.**

## **Rekap Menu 5 — Pengaturan & Aktivitas**

| **Tab** | **Fungsi** |
| --- | --- |
| **Pengaturan Kabinet** | **Mengatur identitas dan periode kabinet** |
| **Konfigurasi Sistem** | **Mengaktifkan/menonaktifkan modul per kabinet** |
| **Audit Aktivitas** | **Melihat riwayat tindakan administratif (Admin saja)** |

**Menu 5 selesai dirancang**

# **ADMIN PANEL — SELESAI DIRANCANG**

**Enam kelompok pembahasan Admin Panel sudah kita selesaikan:**

1. **Dashboard Admin.**

1. **Struktur Organisasi.**

1. **Pengguna & Kader.**

1. **Akses & Permission.**

1. **Pengaturan & Aktivitas.**

**Seluruhnya tetap mengikuti prinsip:**

- **Sederhana dan ringkas.**

- **Tidak mengambil alih tugas pengurus.**

- **Role tidak dibuat sembarangan.**

- **Permission dikelola Admin.**

- **Setiap kabinet memiliki pengaturan sendiri.**

**Dengan demikian, keenam modul utama HIPMI CENTRAL sudah selesai kita bahas secara konseptual.**

**Urutan penyelesaian Business Flow**

1. **Authentication & Account Lifecycle<br>**Alur akun dari registrasi sampai mendapatkan atau kehilangan akses.

1. **Admin Panel & Cabinet Lifecycle<br>**Alur pengelolaan kabinet, struktur, pengguna, kader, dan permission.

1. **Public Website<br>**Alur pengunjung, publikasi, tiket, Media Partner, Karya Kader, dan Kotak Suara.

1. **Personal Area<br>**Alur aktivitas pribadi mahasiswa, kader, dan anggota tim.

1. **Organization Management<br>**Alur dashboard, kalender, persuratan, keuangan, dan CMS.

1. **Workspace Kompartemen<br>**Alur pengelolaan unit, Staff, Proker, dan monitoring.

1. **Workspace Proker<br>**Alur pelaksanaan kegiatan sampai LPJ dan penutupan.

1. **Cross-Module Validation<br>**Memeriksa hubungan antarproses, perubahan status, notifikasi, dan kondisi pengecualian.

**Peta pembahasan**

8 Sub-Tahap

1. **05.1 Authentication & Account Lifecycle<br>**Alur akun dari registrasi sampai mendapatkan atau kehilangan akses.

  - 05.1.1 Registrasi akun

  - 05.1.2 Verifikasi akun dan login

  - 05.1.3 Status awal Mahasiswa Biasa

  - 05.1.4 Pencocokan NIM dan pengaitan Kader

  - 05.1.5 Pemberian akses organisasi

  - 05.1.6 Perubahan dan berakhirnya akses

1. **05.2 Admin Panel & Cabinet Lifecycle<br>**Alur administrasi kabinet dan pengelolaan sistem.

  - 05.2.1 Cabinet Center

  - 05.2.2 Tambah dan pengelolaan kabinet

  - 05.2.3 Struktur organisasi dan jabatan

  - 05.2.4 Pengelolaan pengguna dan kader

  - 05.2.5 Role, Permission, dan konfigurasi modul

  - 05.2.6 Pengarsipan kabinet

1. **05.3 Public Website<br>**Alur pengunjung dan layanan publik.

  - 05.3.1 Beranda dan informasi organisasi

  - 05.3.2 Informasi Kabinet, Bidang, Kompartemen, Proker

  - 05.3.3 Agenda, pendaftaran, pembayaran, dan tiket

  - 05.3.4 Berita dan publikasi

  - 05.3.5 Media Partner

  - 05.3.6 Bisnis dan Prestasi Kader

  - 05.3.7 Kotak Suara

1. **05.4 Personal Area<br>**Alur aktivitas pribadi berdasarkan status pengguna.

  - 05.4.1 Dashboard dan profil

  - 05.4.2 Personal Area Mahasiswa Biasa

  - 05.4.3 Personal Area Kader

  - 05.4.4 Aktivitas dan pendaftaran agenda

  - 05.4.5 Aktivitas Anggota Tim Proker

  - 05.4.6 Perubahan informasi dan status pengguna

1. **05.5 Organization Management<br>**Alur operasional organisasi secara keseluruhan.

  - 05.5.1 Masuk dan berpindah area organisasi

  - 05.5.2 Dashboard dinamis berdasarkan Role

  - 05.5.3 Sidebar dan Permission

  - 05.5.4 Agenda dan Kalender

  - 05.5.5 Persuratan dan Ditmawa

  - 05.5.6 Keuangan organisasi

  - 05.5.7 CMS dan Publikasi

  - 05.5.8 Monitoring dan laporan

1. **05.6 Workspace Kompartemen<br>**Alur pengelolaan operasional Kompartemen.

  - 05.6.1 Membuka Workspace Kompartemen

  - 05.6.2 Profil, Staff, dan Tim

  - 05.6.3 Progres Kompartemen

  - 05.6.4 Membuat dan mengelola Proker

  - 05.6.5 Menunjuk Pengelola Proker

  - 05.6.6 Pleno, rapat, agenda, dan kalender

  - 05.6.7 Persuratan dan keuangan

  - 05.6.8 Monitoring dan penutupan Proker

1. **05.7 Workspace Proker<br>**Alur pelaksanaan Program Kerja dari awal sampai selesai.

  - 05.7.1 Pembukaan Workspace Proker

  - 05.7.2 Informasi Proker

  - 05.7.3 Tim dan Roster

  - 05.7.4 Timeline, tugas, dan progres

  - 05.7.5 Agenda, Event, dan Ticketing

  - 05.7.6 Persuratan

  - 05.7.7 Keuangan

  - 05.7.8 Dokumen dan LPJ

  - 05.7.9 Monitoring dan penutupan Proker

1. **05.8 — Admin Panel<br>**

1. **Final Cross-Check**

Pemeriksaan hubungan seluruh alur agar tidak saling bertentangan.

# **05.1 Authentication & Account Lifecycle**

## **05.1.1 — Registrasi Akun**

### **A. Rancangan UI Registrasi**

Menurutku, formulir registrasi cukup dibagi menjadi tiga kelompok agar rapi.

# **Buat Akun**

Daftar untuk bergabung dengan HIPMI CENTRAL

**1. Identitas Mahasiswa**

NIM

Nama Lengkap

FakultasPilih fakultas

Jurusan

Diisi secara manual menggunakan teks.

**2. Informasi Kontak**

Email

Nomor Telepon

**3. Keamanan Akun**

Password

Konfirmasi Password

Buat Akun

Sudah memiliki akun? Login

Mockup rancangan UI, bukan formulir registrasi aktif. Nama fakultas masih berupa placeholder.

### **B. Ketentuan formulir**

| **Field** | **Bentuk** | **Ketentuan** |
| --- | --- | --- |
| NIM | Input teks | Wajib |
| Nama lengkap | Input teks | Wajib |
| Fakultas | Dropdown | 8 pilihan, wajib |
| Jurusan | Input teks | Wajib |
| Email | Input email | Wajib |
| Nomor telepon | Input teks | Wajib |
| Password | Password | Wajib |
| Konfirmasi password | Password | Harus sama |

**Keputusan UI yang kita tetapkan:**

- Fakultas tidak boleh diketik manual.

- Jurusan boleh diketik manual.

- Tidak perlu dropdown jurusan.

- Semua field wajib diisi.

- Password dan konfirmasi password harus cocok.

## **C. Business Flow Registrasi**

1. Pengunjung membuka halaman Registrasi.

1. Mengisi seluruh informasi mahasiswa dan akun.

1. Sistem memeriksa kelengkapan dan kesesuaian input.

1. Pengunjung menekan tombol Buat Akun.

1. Sistem memproses pendaftaran dan aktivasi akun.

1. Setelah aktivasi berhasil, pengguna mendapatkan status awal Mahasiswa Biasa.

1. Pengguna diarahkan ke halaman Login atau langsung masuk sesuai mekanisme aktivasi yang ditetapkan.

Penting: mendaftar tidak otomatis menjadikan seseorang Kader HIPMI atau pengurus organisasi.

Pengaitan akun Kader tetap melalui proses pencocokan NIM dan konfirmasi Admin yang sudah kita sepakati.

## **D. Kita tetapkan satu keputusan berikutnya**

**Bagaimana mekanisme aktivasi akun setelah registrasi?**

**SIAP! Kita catat keputusan 05.1.1, tetapi ada satu detail yang perlu dipastikan agar alurnya tidak ambigu.**

**05.1.1 — Registrasi**

- **Form registrasi menggunakan 8 pilihan Fakultas dalam dropdown.**

- **Jurusan menggunakan input teks.**

- **Setelah formulir berhasil dikirim, akun dibuat.**

- **Verifikasi email tetap digunakan.**

- **Status awal pengguna adalah Mahasiswa Biasa.**

**Satu pertanyaan tentang aktivasi email:**

**Bagaimana mekanismenya?**

**Bagaimana mekanismenya?**

**A. Verifikasi sebelum akun aktif**

**Setelah mengisi formulir, pengguna menerima kode OTP atau tautan email. Setelah berhasil diverifikasi, akun langsung aktif.**

# **05.1.2 — Login, Logout & Pemulihan Password**

## **A. Login**

**Menurutku, UI Login cukup sederhana.**

# **Selamat Datang!**

**Masuk ke HIPMI CENTRAL**

**Email**

**Password**

**Lupa Password?**

**Login**

**Belum memiliki akun? Registrasi**

**Ilustrasi rancangan UI.**

## **B. Alur Login**

1. **Pengguna memasukkan email dan password.**

1. **Sistem memeriksa kecocokan informasi akun.**

1. **Jika benar dan email sudah terverifikasi, pengguna berhasil login.**

1. **Sistem mengarahkan pengguna ke Personal Area sesuai status dan aksesnya.**

**Jika gagal:**

- **Password salah: tampilkan pesan kesalahan.**

- **Email belum terverifikasi: tampilkan instruksi verifikasi ulang.**

- **Akun dinonaktifkan: tampilkan informasi bahwa akun tidak dapat digunakan.**

## **C. Lupa Password**

**Alurnya cukup melalui email:**

1. **Pengguna memilih Lupa Password.**

1. **Memasukkan email terdaftar.**

1. **Sistem mengirim tautan pemulihan password.**

1. **Pengguna membuka tautan.**

1. **Membuat password baru dan konfirmasi.**

1. **Password berhasil diperbarui.**

1. **Pengguna kembali ke halaman Login.**

## **D. Logout**

**Logout cukup ditempatkan pada menu profil pengguna.**

**Alurnya:**

1. **Pengguna membuka menu profil.**

1. **Memilih Logout.**

1. **Sistem mengakhiri sesi login.**

1. **Pengguna diarahkan ke halaman Login.**

**Tidak perlu membuat halaman logout tersendiri.**

## **E. Kita tetapkan satu keputusan**

**Login menggunakan identitas apa?**

**5.1.2 — Login, Logout & Pemulihan Password**

- **Login menggunakan Email + Password.**

- **Email harus sudah terverifikasi.**

- **Lupa Password menggunakan tautan pemulihan melalui email.**

- **Logout tersedia melalui menu profil.**

- **Akun nonaktif tidak dapat login.**

# **05.1.3 — Status Awal Pengguna**

**Untuk bagian ini, kita mempertahankan keputusan yang sudah pernah kita sepakati.**

**Semua akun baru otomatis berstatus Mahasiswa Biasa setelah email berhasil diverifikasi.**

## **A. Alur sistem**

1. **Pengguna menyelesaikan verifikasi email.**

1. **Sistem mengaktifkan akun.**

1. **Sistem menetapkan status awal Mahasiswa Biasa.**

1. **Pengguna diarahkan ke Personal Area.**

## **B. Aturan akses awal**

| **Kondisi pengguna** | **Akses** |
| --- | --- |
| **Mahasiswa Biasa** | **Personal Area** |
| **Sudah menjadi Kader** | **Personal Area Kader** |
| **Pengurus aktif** | **Personal Area + Organization Management** |
| **Pengelola Proker saja** | **Personal Area + akses Workspace melalui Organization Management** |

**Catatan penting:**

- **Menjadi Kader tidak otomatis menjadikan seseorang pengurus.**

- **Kader tidak otomatis mendapatkan akses Organization Management.**

- **Pengelola Proker tetap mendapatkan akses organisasi meskipun bukan pengurus struktural.**

**05.1.3 — Dikunci berdasarkan keputusan sebelumnya**

# **Selanjutnya: 05.1.4 — Pencocokan NIM & Pengaitan Akun Kader**

**Kita sudah memiliki konsep bahwa Admin dapat melihat apakah NIM pengguna ditemukan dalam Database Kader.**

**Alurnya:**

1. **Sistem mencocokkan NIM pengguna.**

1. **Jika ditemukan, tampil keterangan NIM tersedia dalam Database Kader.**

1. **Admin dapat menekan Jadikan Akun Kader.**

1. **Admin mengonfirmasi kecocokan identitas.**

1. **Akun pengguna terhubung dengan status Kader.**

**Jika tidak ditemukan, pengguna tetap Mahasiswa Biasa.**

## **05.1.4 — Pencocokan NIM & Pengaitan Akun Kader**

**Keputusan dikunci**

**Pencocokan NIM dilakukan otomatis setelah pengguna mengirim registrasi.**

**Alurnya:**

1. **Pengguna mengisi NIM saat registrasi.**

1. **Sistem otomatis mencocokkan NIM dengan Database Kader.**

1. **Hasil kecocokan ditampilkan pada Detail Pengguna di Admin Panel.**

1. **Jika cocok, Admin melihat informasi bahwa NIM ditemukan.**

1. **Admin dapat menekan Jadikan Akun Kader dan mengonfirmasi.**

1. **Jika tidak cocok, pengguna tetap berstatus Mahasiswa Biasa.**

**Penting: pencocokan otomatis, tetapi pengubahan status menjadi Kader tetap memerlukan tindakan Admin.**

# **05.1.5 — Pemberian Akses Organisasi**

**Kita gunakan keputusan yang sudah disepakati sebelumnya:**

| **Kondisi pengguna** | **Akses Organization Management** |
| --- | --- |
| **Mahasiswa Biasa** | **Tidak** |
| **Kader tanpa penugasan** | **Tidak** |
| **Pengurus struktural aktif** | **Ya** |
| **Pengelola Proker aktif saja** | **Ya** |
| **Kader sekaligus Pengurus** | **Ya** |

**Ketentuannya:**

- **Switcher Organisasi muncul jika pengguna mempunyai penugasan aktif.**

- **Sidebar menyesuaikan Role dan Permission.**

- **Pengelola Proker tetap mendapatkan akses meskipun bukan pengurus struktural.**

- **Status Kader saja tidak otomatis memberikan akses organisasi.**

**05.1.5 — Mengikuti keputusan sebelumnya**

# **05.1.6 — Perubahan & Berakhirnya Akses**

**Sekarang kita perlu memastikan satu kondisi terakhir.**

**Jika masa jabatan seseorang berakhir, bagaimana aksesnya?**

**Menurutku:**

- **Akses jabatan struktural otomatis berakhir.**

- **Jika tidak memiliki penugasan lain, Switcher Organisasi menghilang.**

- **Personal Area tetap tersedia.**

- **Riwayat jabatan, Proker, dan aktivitas tetap tersimpan.**

- **Jika masih memiliki penugasan Pengelola Proker yang aktif, akses Proker tersebut tetap tersedia.**

**Apakah mekanisme ini kita sepakati?**

**05.1.6 — Dikunci**

**Akses organisasi mengikuti penugasan aktif pengguna.**

- **Masa jabatan berakhir → akses jabatan berakhir.**

- **Tidak ada penugasan lain → Switcher Organisasi menghilang.**

- **Masih memiliki penugasan Pengelola Proker aktif → akses Proker tersebut tetap tersedia.**

- **Personal Area tetap dapat digunakan.**

- **Seluruh riwayat organisasi tetap tersimpan.**

# **Rekap 05.1 — Authentication & Account Lifecycle**

**Selesai**

| **Sub-tahap** | **Hasil** |
| --- | --- |
| **05.1.1 Registrasi** | **Form 8 Fakultas, Jurusan teks, verifikasi email** |
| **05.1.2 Login** | **Email + Password, lupa password, logout** |
| **05.1.3 Status awal** | **Mahasiswa Biasa** |
| **05.1.4 Pencocokan NIM** | **Otomatis, pengaitan Kader oleh Admin** |
| **05.1.5 Akses organisasi** | **Berdasarkan penugasan aktif** |
| **05.1.6 Perubahan akses** | **Mengikuti masa berlaku penugasan** |

**Catatan pengerjaan**

**Seluruh pembahasan ini merupakan rancangan UI dan Business Flow. Belum ada keputusan implementasi database atau backend.**

# **Lanjut 05.2 — Admin Panel & Cabinet Lifecycle**

Kita mulai dari keputusan yang sudah pernah disepakati, bukan mengulangnya.

## **05.2.1 — Cabinet Center**

Sudah disepakati sebelumnya

Alur Admin:

1. Admin login.

1. Admin langsung masuk ke halaman Cabinet Center tanpa sidebar.

1. Halaman menampilkan Card Kabinet.

1. Admin dapat menambahkan kabinet.

1. Admin memilih salah satu Card Kabinet.

1. Admin masuk ke Dashboard khusus kabinet tersebut dan sidebar muncul.

Kabinet arsip hanya dapat dilihat Admin. Setiap kabinet memiliki ruang pengelolaan sendiri.

## **05.2.2 — Tambah dan Pengelolaan Kabinet**

Aku ingin memastikan satu hal terlebih dahulu.

**Ketika Admin membuat kabinet baru, bagaimana status awal kabinet tersebut?**

SIAPPP! 🔥 Kita tetapkan keputusan 05.2.2.

05.2.2 — Status Awal Kabinet Dikunci

- Admin dapat membuat kabinet baru.

- Kabinet baru otomatis berstatus **Draft**.

- Admin dapat melengkapi dan mengedit informasi kabinet.

- Kabinet Draft belum menjadi kabinet aktif.

- Admin dapat mengaktifkannya setelah siap.

## **Alur pembuatan kabinet**

1. Admin membuka Cabinet Center.

1. Menekan Tambah Kabinet.

1. Mengisi nama kabinet, periode, dan informasi kabinet.

1. Sistem membuat kabinet dengan status Draft.

1. Admin dapat membuka dan melengkapi kabinet tersebut.

1. Admin mengaktifkan kabinet ketika sudah siap.

## **Pertanyaan berikutnya — Pergantian Kabinet Aktif**

Kita tetap mempertahankan keputusan sebelumnya bahwa hanya ada satu kabinet aktif dalam satu periode.

Misalnya:

- Kabinet 2026/2027 berstatus Aktif.

- Kabinet 2027/2028 masih Draft.

- Periode kabinet lama berakhir dan kabinet baru siap diaktifkan.

**Bagaimana mekanisme pergantiannya?**

05.2.2 — Pergantian Kabinet Dikunci

**Pergantian kabinet dilakukan secara manual oleh Admin.**

1. Admin membuka kabinet lama.

1. Admin memilih Arsipkan Kabinet.

1. Kabinet lama berubah menjadi Arsip.

1. Admin membuka kabinet baru berstatus Draft.

1. Admin memilih Aktifkan Kabinet.

1. Kabinet baru menjadi kabinet aktif.

Hanya satu kabinet yang berstatus Aktif. Kabinet arsip hanya dapat dilihat Admin.

# **05.2.3 — Pengelolaan Struktur Organisasi**

Kita gunakan keputusan yang sudah disepakati sebelumnya.

**Hierarki organisasi:**

**Kabinet**

**Bidang**

**Kompartemen**

**Jabatan**

## **A. Alur pengelolaan**

1. Admin membuka Struktur Organisasi.

1. Admin menambahkan Bidang.

1. Admin menambahkan Kompartemen pada Bidang.

1. Sistem menampilkan jabatan yang tersedia.

1. Admin melakukan penempatan pengurus berdasarkan keputusan resmi organisasi.

1. Sistem menerapkan Role dan Permission sesuai jabatan serta lingkup penempatannya.

## **B. Aturan yang sudah dikunci**

- Admin boleh menambah dan mengubah struktur.

- Admin melakukan penempatan pengurus, bukan menentukan pengangkatan.

- Satu pengguna hanya boleh memiliki satu jabatan struktural aktif dalam satu kabinet.

- Pengelola Proker boleh menjadi penugasan tambahan.

- Riwayat jabatan sebelumnya tetap tersimpan.

## **C. Satu keputusan yang perlu kita pastikan**

**Apakah Admin boleh mengubah struktur organisasi ketika kabinet sudah berstatus Aktif**

05.2.3 — Perubahan Struktur Dikunci

Admin boleh menambah, mengubah, dan menonaktifkan Bidang maupun Kompartemen selama kabinet berstatus Aktif.

Riwayat struktur dan penempatan sebelumnya tetap dipertahankan.

# **Lanjut 05.2.4 — Pengelolaan Pengguna & Kader**

Kita sudah membahas fitur ini pada Admin Panel sebelumnya. Jadi tidak perlu mengulang.

Fokus Business Flow-nya adalah:

1. Melihat daftar pengguna.

1. Melihat hasil pencocokan NIM.

1. Menambahkan data kader.

1. Menjadikan akun sebagai Kader melalui konfirmasi Admin.

1. Mengelola status akun dan keanggotaan.

1. Mempertahankan riwayat organisasi.

**Pertanyaan berikutnya:**

Jika ada perubahan status keanggotaan kader, misalnya seorang kader sudah tidak aktif sebagai kader, menurutku Admin cukup mengubah status keanggotaannya menjadi Nonaktif tanpa menonaktifkan akun pengguna.

Apakah kita sepakati bahwa akun pengguna dan status keanggotaan kader tetap dikelola secara terpisah?

05.2.4 — Pengguna & Kader Dikunci

**Status Akun dan Status Keanggotaan Kader dikelola secara terpisah.**

- Akun aktif, pengguna dapat login.

- Akun nonaktif, pengguna tidak dapat login.

- Status Kader Aktif atau Nonaktif tidak otomatis mengubah status akun.

- Riwayat keanggotaan dan organisasi tetap tersimpan.

# **05.2.5 — Pengelolaan Role & Permission**

Bagian ini sebenarnya sudah kita sepakati sebelumnya. Sekarang kita pastikan alur kerjanya.

## **A. Alur sistem**

1. Admin membuka menu Akses & Permission.

1. Admin memilih pengguna atau template Role.

1. Sistem menampilkan Role, Permission, dan lingkup akses yang dimiliki.

1. Admin mengatur Permission sesuai kebutuhan organisasi.

1. Admin menyimpan perubahan.

1. Sistem menyesuaikan akses dan sidebar pengguna.

## **B. Aturan yang sudah dikunci**

| **Pengguna** | **Mekanisme akses** |
| --- | --- |
| Top Management | Otomatis berdasarkan jabatan |
| Sekum dan Bendum | Otomatis berdasarkan jabatan |
| Kepala Bidang | Otomatis berdasarkan jabatan dan Bidang |
| Kepala Kompartemen | Otomatis berdasarkan jabatan dan Kompartemen |
| Staff | Template Permission berdasarkan unit dan kebutuhan pekerjaan |
| Pengelola Proker | Penugasan oleh Kepala Kompartemen |
| Kader dan Mahasiswa Biasa | Akses berdasarkan status dan hak pengguna |
| Admin Sistem | Mengelola Permission dan konfigurasi sistem |

Permission tambahan hanya dapat diberikan atau dicabut oleh Admin. Tidak ada fitur pengajuan Permission.

## **C. Satu keputusan yang perlu kita tetapkan**

Ketika Admin mengubah Permission seseorang, kapan perubahan tersebut berlaku?

SIAPPP! 🔥 Kita tetapkan keputusan 05.2.5.

05.2.5 — Permission Dikunci

**Perubahan Permission langsung berlaku setelah Admin menyimpan.**

- Tidak perlu menunggu login ulang.

- Sidebar otomatis menyesuaikan.

- Akses menu dan tindakan langsung mengikuti Permission terbaru.

- Pencabutan Permission juga langsung berlaku.

# **05.2.6 — Pengarsipan Kabinet**

Ini merupakan sub-tahap terakhir Admin Panel dalam Business Flow.

Kita pertahankan keputusan sebelumnya:

- Admin mengarsipkan kabinet lama secara manual.

- Kabinet baru diaktifkan setelah kabinet lama diarsipkan.

- Kabinet arsip hanya dapat dilihat Admin.

- Riwayat organisasi tetap dipertahankan.

- Workspace kabinet lama tidak lagi tersedia bagi pengurus.

## **A. Rekomendasi alur**

1. Admin membuka kabinet yang sedang Aktif.

1. Admin memilih menu Arsipkan Kabinet.

1. Sistem menampilkan konfirmasi pengarsipan.

1. Admin mengonfirmasi tindakan.

1. Status kabinet berubah menjadi Arsip.

1. Workspace organisasi kabinet tersebut tidak lagi dapat diakses pengurus.

1. Seluruh data dan riwayat tetap tersimpan dan dapat dilihat Admin.

1. Admin dapat mengaktifkan kabinet baru yang sebelumnya berstatus Draft.

## **B. Kondisi setelah kabinet diarsipkan**

| **Bagian** | **Kondisi** |
| --- | --- |
| Dashboard kabinet | Hanya Admin |
| Workspace pengurus | Tidak tersedia |
| Sidebar organisasi | Hilang |
| Riwayat Proker | Tetap tersimpan |
| Riwayat jabatan | Tetap tersimpan |
| Riwayat keuangan | Tetap tersimpan |
| Riwayat persuratan | Tetap tersimpan |
| Riwayat agenda | Tetap tersimpan |

## **C. Satu keputusan yang perlu kita pastikan**

Bagaimana jika Admin ingin mengarsipkan kabinet, tetapi masih ada Proker yang belum selesai, LPJ belum lengkap, atau pengajuan keuangan yang masih berjalan?

SIAPPP! 🔥 Kita tetapkan keputusan 05.2.6.

05.2.6 — Pengarsipan Kabinet Dikunci

**Pengarsipan menggunakan sistem peringatan dan konfirmasi Admin.**

- Sistem menampilkan daftar Proker yang belum selesai.

- Sistem menampilkan LPJ yang belum lengkap.

- Sistem menampilkan pengajuan atau urusan keuangan yang masih berjalan.

- Admin memeriksa seluruh peringatan.

- Admin tetap dapat mengonfirmasi pengarsipan.

- Seluruh data dan riwayat kabinet tetap dipertahankan.

05.2 — Admin Panel & Cabinet Lifecycle SELESAI

# **05.3 — Public Website**

Sekarang kita masuk ke alur pengunjung website HIPMI CENTRAL.

Kita tetap menggunakan navigasi publik yang sudah disepakati, tidak membuat menu baru.

## **05.3.1 — Beranda & Informasi Organisasi**

### **A. Alur pengunjung**

1. Pengunjung membuka website HIPMI CENTRAL.

1. Sistem menampilkan halaman Beranda.

1. Pengunjung melihat informasi umum organisasi, kabinet aktif, agenda publik, dan berita terbaru.

1. Pengunjung memilih informasi atau menu yang ingin dibuka.

1. Sistem mengarahkan pengunjung ke halaman terkait.

### **B. Prinsip konten Beranda**

Menurutku, cukup menampilkan:

1. Informasi dan identitas HIPMI.

1. Ringkasan kabinet aktif.

1. Agenda publik mendatang.

1. Berita dan artikel terbaru.

1. Informasi kegiatan dan karya kader.

1. Akses menuju halaman informasi lainnya.

Konten yang belum dipublikasikan tidak boleh muncul di website publik.

## **C. Satu keputusan yang perlu kita tetapkan**

Untuk informasi kabinet pada website publik:

SIAPPP! 🔥 Kita tetapkan keputusan 05.3.1.

05.3.1 — Beranda & Informasi Organisasi Dikunci

- Public Website hanya menampilkan kabinet aktif.

- Kabinet arsip tidak ditampilkan kepada publik.

- Kabinet arsip hanya dapat dilihat Admin.

# **05.3.2 — Informasi Organisasi**

Kita mengikuti keputusan navigasi sebelumnya: **empat halaman terpisah**, bukan digabung menjadi satu halaman panjang.

**ORGANISASI**

**Kabinet**

Informasi kabinet dan jajaran pengurus

**Bidang**

Daftar Bidang dan informasi masing-masing

**Kompartemen**

Daftar Kompartemen dan profilnya

**Program Kerja**

Daftar Proker dan informasi kegiatannya

## **A. Alur pengunjung**

1. Pengunjung membuka menu Organisasi.

1. Memilih Kabinet, Bidang, Kompartemen, atau Program Kerja.

1. Sistem menampilkan daftar informasi sesuai halaman.

1. Pengunjung memilih salah satu informasi.

1. Sistem menampilkan halaman detail.

## **B. Informasi yang ditampilkan**

| **Halaman** | **Informasi utama** |
| --- | --- |
| Kabinet | Profil kabinet, visi misi, Top Management, dan pengurus |
| Bidang | Profil Bidang, Kepala Bidang, dan Kompartemen |
| Kompartemen | Profil, Kepala Kompartemen, dan program kerja |
| Program Kerja | Nama, deskripsi, penyelenggara, dan informasi kegiatan |

Informasi internal seperti catatan keuangan, dokumen internal, dan progres tugas tidak ditampilkan kepada publik.

## **C. Satu keputusan yang perlu kita tetapkan**

Khusus halaman **Program Kerja**, bagaimana menentukan Proker yang boleh dilihat publik?

05.3.2 — Informasi Organisasi Dikunci

- Public Website memiliki empat halaman Organisasi terpisah.

- Hanya Proker yang ditandai dan dipublikasikan untuk publik yang ditampilkan.

- Proker internal tidak ditampilkan.

- Detail informasi internal tetap terlindungi.

# **05.3.3 — Agenda, Pendaftaran, Pembayaran & Ticketing**

Ini salah satu alur penting Public Website. Kita gabungkan seluruh proses dalam satu alur agar tidak membingungkan pengunjung.

## **A. Konsep utama**

Pengunjung membuka menu **Aktivitas → Agenda & Tiket**.

**AGENDA & TIKET**

Ilustrasi halaman publik

[<u>Buka Ruang Diskusi Internasional, Untag Surabaya Gelar International Conference on Communication and Community Engagement 2024 - Portal JTV</u>](https://images.openai.com/static-rsc-4/EoustnDMvSJAKft0v-aY5W66L6Yp9a59r6HWvcTGK0kWz5thlVeJGOorQLzbTZ9zo-Byfe9GJB_MZ-QfcFwsftoX6xt2YG44ksaYEtmqHN-d-aMecjAAmW3qkDWOCA6PiCqo-xRw3yuwLXMnump0roDn-GE6cAILmBT6FV3yV1g?purpose=inline)

[<u>portaljtv.com</u>](https://portaljtv.com/news/buka-ruang-diskusi-internasional-untag-surabaya-gelar-international-conference-on-communication-and-community-engagement-2024?utm_source=chatgpt.com)

**Seminar Nasional Kewirausahaan**

18 Desember 2026 · Seminar · Pendaftaran tersedia

Pendaftaran Dibuka

[<u>Industry Events & Workshops | myBCom | Sauder School of Business at UBC, Vancouver, Canada</u>](https://images.openai.com/static-rsc-4/Ruqqyt2Wpy1VkwZdYu-T7jsPBZh2JdB6gIyfvKH2WyGoaeteHmSas76-lg21uf1nwTw-SJu9xpxbG9Y-JorHT_iGvLazNJBZhRDzm7Fo4tc-xJoa9QoWaGR5v69Xp6Hg-OMNdU_wcWBVYVwBniGhyHLjDxf5K4jbCIRIqeFIpjk?purpose=inline)

[<u>mybcom.sauder.ubc.ca</u>](https://mybcom.sauder.ubc.ca/career-experience/industry-events-%26-workshops?utm_source=chatgpt.com)

**Business Networking**

22 Desember 2026 · Networking

Pendaftaran Dibuka

Contoh ilustrasi tampilan kartu agenda, bukan agenda aktual.

Satu Program Kerja boleh mempunyai beberapa Agenda/Event. Setiap agenda memiliki pengaturan publikasi dan ticketing masing-masing.

## **B. Business Flow**

1. **Agenda dipublikasikan<br>**Pengelola Proker mengatur agenda menjadi publik dan membuka pendaftaran.

1. **Pengunjung memilih agenda<br>**Pengunjung membuka detail agenda dan melihat informasi, jadwal, kuota, serta biaya.

1. **Pengunjung mengisi formulir<br>**Mengisi identitas dan informasi pendaftaran.

1. **Instruksi pembayaran dibuka<br>**Sistem menampilkan QRIS khusus agenda tersebut dan mengubah kuota menjadi reserved.

1. **Pengunjung mengirim bukti pembayaran<br>**Bukti pembayaran masuk ke daftar verifikasi penyelenggara.

1. **Penyelenggara memverifikasi pembayaran<br>**Penyelenggara memeriksa bukti dan menyetujui atau menolak pembayaran.

1. **Tiket diterbitkan<br>**Jika disetujui, sistem membuat tiket PDF dengan barcode dan mengirimkannya melalui email.

1. **Pengunjung melakukan check-in<br>**Barcode tiket digunakan untuk verifikasi kehadiran.

## **C. Keputusan sebelumnya yang kita pertahankan**

| **Bagian** | **Ketentuan** |
| --- | --- |
| QRIS | Satu QRIS untuk setiap agenda |
| Kuota | Reserved ketika instruksi pembayaran dibuka |
| Verifikasi | Manual oleh penyelenggara |
| Batas verifikasi | Tidak ada batas waktu verifikasi |
| Tiket | PDF dengan barcode |
| Pengiriman | Email otomatis |
| Cek status tiket | NIM + verifikasi email/OTP |
| Peserta | Kader maupun non-kader boleh mendaftar |

Data pendaftaran yang dikumpulkan:

- Nama lengkap.

- NIM.

- Nomor telepon.

- Email.

- Fakultas.

- Program studi/jurusan.

## **D. Satu keputusan yang perlu kita pastikan**

**Apakah pengunjung harus memiliki akun HIPMI CENTRAL untuk mendaftar agenda?**

Menurutku ada dua pilihan:

SIAPPP! 🔥 Kita tetapkan keputusan 05.3.3.

Pendaftaran Agenda Tanpa Login — Dikunci

**Pengunjung boleh mendaftar agenda tanpa memiliki akun HIPMI CENTRAL.**

- Tidak wajib login.

- Kader maupun non-kader boleh mendaftar.

- Mengisi formulir pendaftaran secara langsung.

- Menggunakan email untuk menerima informasi dan tiket.

- Dapat mengecek status tiket melalui NIM dan verifikasi email/OTP.

## **Lanjutan alur 05.3.3 — Pembayaran**

Kita pertahankan alur yang sudah disepakati:

1. Pengunjung memilih agenda.

1. Mengisi formulir pendaftaran.

1. Sistem membuat data pendaftaran.

1. Instruksi pembayaran dan QRIS ditampilkan.

1. Kuota menjadi Reserved.

1. Pengunjung mengunggah bukti pembayaran.

1. Penyelenggara memverifikasi pembayaran.

1. Jika disetujui, tiket PDF dan barcode diterbitkan serta dikirim melalui email.

**Ada satu kondisi yang perlu kita pastikan:**

Jika penyelenggara menolak bukti pembayaran karena salah nominal, bukti tidak jelas, atau pembayaran belum diterima, apakah pendaftar boleh mengunggah ulang bukti pembayaran?

Menurutku, **boleh mengunggah ulang**. Status pendaftaran kembali menjadi Menunggu Verifikasi setelah bukti baru dikirim. Jadi pendaftar tidak perlu mengisi formulir dari awal.

Apakah kita sepakati?

NAHH, SIPPP! 🔥 Kita tetapkan keputusan ini.

Upload Ulang Bukti Pembayaran — Dikunci

Jika bukti pembayaran ditolak:

1. Status pendaftaran menjadi **Perlu Perbaikan**.

1. Pendaftar dapat melihat alasan penolakan.

1. Pendaftar boleh mengunggah ulang bukti pembayaran.

1. Tidak perlu mengisi formulir dari awal.

1. Setelah bukti baru dikirim, status kembali menjadi **Menunggu Verifikasi**.

1. Penyelenggara memeriksa ulang bukti pembayaran.

## **Lanjutan 05.3.3 — Penerbitan Tiket & Check-in**

Setelah pembayaran disetujui:

- Sistem menerbitkan tiket PDF.

- Tiket memiliki barcode unik.

- Tiket dikirim otomatis melalui email.

- Pendaftar dapat mengecek status tiket melalui NIM dan verifikasi email/OTP.

**Pertanyaan berikutnya: bagaimana mekanisme check-in?**

MANTAPPP! 🔥 Kita tetapkan keputusan C.

05.3.3 — Ticketing & Check-in Dikunci

**Scan barcode menjadi metode utama, pencarian manual menjadi alternatif.**

- Panitia dapat memindai barcode tiket.

- Jika barcode valid, kehadiran tercatat sebagai Hadir.

- Jika tiket sudah digunakan, sistem memberikan peringatan dan mencegah check-in ganda.

- Jika barcode tidak dapat dipindai, panitia dapat mencari peserta berdasarkan nama atau NIM.

- Kedua metode menggunakan pemeriksaan tiket yang sama.

Dengan ini, alur Agenda, Pendaftaran, Pembayaran, Ticketing, dan Check-in selesai dirancang.

# **05.3.4 — Berita & Artikel**

Kita menggunakan keputusan CMS yang sudah disepakati:

- Pengurus membuat konten.

- Publisher dari kalangan pengurus melakukan publikasi.

- Admin mengatur akses dan mengawasi.

- Satu pengurus boleh memiliki permission Content Creator sekaligus Publisher.

## **A. Business Flow**

1. **Content Creator membuat artikel<br>**Mengisi judul, kategori, gambar, dan isi artikel.

1. **Menyimpan sebagai Draft<br>**Artikel belum tampil di Public Website.

1. **Publisher memeriksa artikel<br>**Memeriksa isi, gambar, dan kelayakan publikasi.

1. **Publisher melakukan publikasi<br>**Artikel berubah menjadi Published dan tampil di website publik.

1. **Pengunjung membaca artikel<br>**Artikel dapat ditemukan melalui halaman Berita & Artikel.

## **B. Status artikel**

| **Status** | **Keterangan** |
| --- | --- |
| Draft | Belum dipublikasikan |
| Published | Sudah tampil di website |
| Archived | Tidak lagi ditampilkan, tetapi riwayat dipertahankan |

## **C. Satu keputusan**

Jika Publisher menemukan artikel yang perlu diperbaiki, bagaimana mekanismenya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.3.4.

05.3.4 — Berita & Artikel Dikunci

**Publisher boleh mengedit artikel secara langsung sebelum publikasi.**

- Content Creator membuat artikel.

- Publisher dapat memeriksa dan mengedit artikel.

- Publisher bertanggung jawab melakukan publikasi.

- Admin mengatur permission dan mengawasi.

- Artikel yang belum dipublikasikan tidak tampil di Public Website.

# **05.3.5 — Media Partner**

Kita pertahankan keputusan sebelumnya:

- Pengajuan Media Partner bisa dilakukan publik tanpa login.

- Pemohon mendapatkan kode untuk mengecek status pengajuan.

- Publikasi Media Partner dilakukan secara manual oleh Kompartemen Media Komunikasi.

## **A. Business Flow**

1. **Pengunjung membuka Media Partner<br>**Melihat informasi dan persyaratan kerja sama.

1. **Mengisi formulir pengajuan<br>**Mengisi identitas organisasi, kontak, informasi kegiatan, dan mengunggah proposal atau dokumen pendukung.

1. **Mengirim pengajuan<br>**Tidak perlu login atau membuat akun HIPMI CENTRAL.

1. **Mendapatkan kode pengajuan<br>**Sistem memberikan kode unik untuk mengecek status.

1. **Media Komunikasi memeriksa pengajuan<br>**Memeriksa kelengkapan dan kesesuaian permohonan.

1. **Hasil pengajuan<br>**Pengajuan dapat diterima, ditolak, atau dikembalikan untuk diperbaiki.

1. **Publikasi Media Partner<br>**Jika disetujui, Media Komunikasi mengelola publikasinya secara manual.

## **B. UI halaman Media Partner**

# **Media Partner**

Mari berkolaborasi dan tumbuh bersama HIPMI.

**Ajukan Kerja Sama**

Ajukan permohonan Media Partner tanpa harus memiliki akun.

Ajukan Media Partner

**Cek Status Pengajuan**

Cek StatusIlustrasi rancangan UI.

## **C. Status pengajuan**

| **Status** | **Keterangan** |
| --- | --- |
| Submitted | Pengajuan berhasil dikirim |
| Under Review | Sedang diperiksa |
| Revision | Perlu perbaikan |
| Approved | Pengajuan diterima |
| Rejected | Pengajuan ditolak |

## **D. Satu keputusan yang perlu kita tetapkan**

Jika pengajuan Media Partner belum lengkap atau ada dokumen yang perlu diperbaiki, bagaimana mekanismenya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.3.5.

05.3.5 — Media Partner Dikunci

**Pengajuan yang memerlukan perbaikan dikembalikan kepada pemohon.**

- Media Komunikasi memberikan catatan revisi.

- Pemohon memperbaiki dokumen atau informasi.

- Pemohon mengirim ulang menggunakan kode pengajuan yang sama.

- Tidak perlu membuat pengajuan baru.

- Setelah dikirim ulang, status kembali menjadi Under Review.

# **05.3.6 — Karya Kader**

Kita mengikuti navigasi publik yang sudah disepakati:

**KARYA KADER**

**Bisnis Kader**

Informasi usaha dan bisnis milik kader HIPMI.

**Prestasi Kader**

Pencapaian dan penghargaan kader HIPMI.

## **A. Rekomendasi Business Flow**

Menurutku, kedua halaman menggunakan pola yang sama agar sederhana.

1. Kader mengajukan informasi bisnis atau prestasi.

1. Sistem menerima pengajuan.

1. Pengelola konten memeriksa informasi.

1. Publisher melakukan publikasi.

1. Informasi tampil di halaman Karya Kader.

1. Pengunjung dapat melihat detailnya.

Untuk Bisnis Kader, informasi dapat mencakup nama usaha, kategori, deskripsi, foto, dan kontak bisnis.

Untuk Prestasi Kader, informasi dapat mencakup nama kader, nama prestasi, penyelenggara, tanggal, deskripsi, dan bukti pendukung.

## **B. Satu keputusan yang perlu kita tetapkan**

**Siapa yang boleh mengajukan Bisnis Kader dan Prestasi Kader?**

SIAPPP! 🔥 Kita tetapkan keputusan B sebagai keputusan final.

05.3.6 — Karya Kader Dikunci

**Siapa saja boleh mengajukan Bisnis Kader dan Prestasi Kader tanpa login.**

- Tidak wajib memiliki akun HIPMI CENTRAL.

- Formulir pengajuan dapat diakses publik.

- Pengajuan tetap diperiksa sebelum dipublikasikan.

- Publikasi mengikuti mekanisme CMS: Content Creator dan Publisher.

- Informasi yang belum dipublikasikan tidak tampil di website.

## **A. Business Flow Karya Kader**

Kita gunakan satu pola untuk kedua jenis pengajuan.

1. Pengunjung memilih Bisnis Kader atau Prestasi Kader.

1. Mengisi formulir dan melampirkan informasi pendukung.

1. Mengirim pengajuan tanpa login.

1. Pengajuan masuk ke daftar pemeriksaan pengelola.

1. Content Creator memeriksa dan menyiapkan konten.

1. Publisher melakukan publikasi.

1. Informasi tampil di halaman Karya Kader.

## **B. Satu keputusan berikutnya**

Apakah pemohon perlu mendapatkan **kode pengajuan untuk mengecek status**, seperti mekanisme Media Partner?

NAHH, SIPPP! 🔥 Kita tetapkan keputusan ini.

05.3.6 — Kode Pengajuan Dikunci

**Bisnis Kader dan Prestasi Kader menggunakan kode pengajuan.**

- Pemohon tidak perlu login.

- Setelah mengirim pengajuan, sistem memberikan kode unik.

- Pemohon dapat mengecek status menggunakan kode tersebut.

- Revisi menggunakan kode pengajuan yang sama.

- Publikasi dilakukan setelah pemeriksaan dan persetujuan Publisher.

# **05.3.7 — Kotak Suara**

Sekarang kita masuk ke fitur terakhir Public Website.

Menurutku, Kotak Suara cukup menjadi tempat publik menyampaikan aspirasi, saran, kritik, atau pengaduan kepada HIPMI.

## **A. Rekomendasi Business Flow**

1. Pengunjung membuka halaman Kotak Suara.

1. Memilih jenis aspirasi.

1. Mengisi pesan atau pengaduan.

1. Mengirimkan formulir.

1. Sistem memberikan kode pengaduan.

1. Pengelola memeriksa dan menindaklanjuti.

1. Pengirim dapat mengecek status melalui kode pengaduan.

## **B. Satu keputusan pertama**

Bagaimana mekanisme pengiriman aspirasi?

SIAPPP! 🔥 Kita tetapkan keputusan 05.3.7 dengan identitas wajib dan tetap menjaga kerahasiaan pengirim.

05.3.7 — Kotak Suara Dikunci

**Pengirim wajib mencantumkan identitas.**

Informasi yang wajib diisi:

- Nama lengkap.

- NIM.

- Nomor telepon / WhatsApp.

Ketentuan:

- Tidak wajib login.

- Identitas digunakan untuk tindak lanjut melalui WhatsApp.

- Data pengirim harus dilindungi dengan enkripsi.

- Identitas tidak ditampilkan secara publik.

- Pengirim mendapatkan kode untuk mengecek status aspirasi.

## **A. Informasi pada UI Kotak Suara**

Aku menyarankan menampilkan keterangan berikut di bawah formulir:

**Privasi dan Keamanan Data**

Identitas dan informasi yang Anda kirimkan dijaga kerahasiaannya serta dilindungi dengan enkripsi. Data hanya digunakan untuk keperluan tindak lanjut aspirasi melalui WhatsApp.

Catatan: perlindungan enkripsi ini kita tetapkan sebagai persyaratan sistem yang wajib dipenuhi saat implementasi keamanan nanti, bukan sekadar tulisan di UI.

## **B. Alur Kotak Suara**

1. Pengunjung membuka Kotak Suara.

1. Memilih jenis aspirasi.

1. Mengisi nama, NIM, nomor WhatsApp, dan pesan.

1. Mengirimkan aspirasi.

1. Sistem memberikan kode pengaduan.

1. Pengelola menerima dan memeriksa aspirasi.

1. Pengelola menghubungi pengirim melalui WhatsApp jika diperlukan.

1. Pengirim dapat mengecek status menggunakan kode pengaduan.

## **C. Keputusan berikutnya**

Siapa yang bertanggung jawab mengelola aspirasi masuk?

Menurutku, sebaiknya **pengurus yang diberikan Permission pengelolaan Kotak Suara**, sehingga tidak semua pengurus bisa membaca identitas dan aspirasi yang masuk. Admin Sistem hanya mengatur aksesnya.

Apakah kita sepakati mekanisme tersebut?

Setelah ini, kita bisa menyelesaikan 05.3 Public Website dan melanjutkan ke 05.4 Personal Area.

GASSS! 🔥 Kita tetapkan keputusan Kotak Suara dan lanjut ke sub-tahap berikutnya. Tetap satu per satu, sederhana, dan tidak mengulang pembahasan yang sudah selesai.

05.3.7 — Kotak Suara Dikunci

- Identitas wajib: Nama, NIM, dan nomor telepon.

- Pengajuan tanpa login.

- Mendapatkan kode untuk cek status.

- Identitas dilindungi dengan enkripsi.

- Tindak lanjut dapat dilakukan melalui WhatsApp.

- Hanya pengurus dengan Permission khusus yang dapat mengelola aspirasi.

- Admin Sistem mengatur Permission tersebut.

## **05.4.1 — Dashboard & Profil**

### **A. Rekomendasi struktur UI**

Menurutku, kita tidak perlu membuat dashboard terpisah untuk setiap jenis pengguna.

Gunakan **satu template Personal Area yang dinamis berdasarkan status dan aktivitas pengguna.**

**Personal Area**

Dashboard

**Nama Pengguna**

Mahasiswa Biasa / Kader / Pengurus

**Menu Personal Area**

Dashboard

Profil Saya

Agenda & Tiket Saya

Riwayat Aktivitas

**Organization Management**

Switcher hanya muncul jika pengguna memiliki penugasan organisasi aktif.

Ilustrasi konsep navigasi, bukan desain final.

### **B. Perbedaan informasi dashboard**

| **Status pengguna** | **Informasi tambahan** |
| --- | --- |
| Mahasiswa Biasa | Profil dan aktivitas pribadi |
| Kader | Status keanggotaan dan riwayat kader |
| Pengurus | Informasi jabatan dan penugasan |
| Pengelola Proker | Informasi Proker yang dikelola |
| Anggota Tim | Informasi Proker yang diikuti |

Menu utama tetap sama. Yang berubah hanya informasi dan akses sesuai status pengguna.

## **C. Keputusan pertama**

Bagaimana menurutmu struktur Personal Area ini?

SIAPPP! 🔥 Kita tetapkan keputusan 05.4.1.

05.4.1 — Dashboard Personal Area Dikunci

**Satu Dashboard Dinamis untuk seluruh pengguna.**

- Semua pengguna menggunakan template dashboard yang sama.

- Informasi menyesuaikan status dan aktivitas pengguna.

- Menu menyesuaikan hak akses.

- Switcher Organization Management hanya muncul jika ada penugasan aktif.

# **05.4.2 — Profil Saya**

Menurutku, halaman Profil Saya cukup dibagi menjadi tiga bagian agar tidak terlalu ramai.

## **A. Rancangan UI**

## **Profil Saya**

**Nama Pengguna**

Kader Aktif

NIM: 2410000000

**1. Informasi Akademik**

| **Informasi** | **Data** |
| --- | --- |
| NIM | 2410000000 |
| Nama | Nama Pengguna |
| Fakultas | Fakultas |
| Jurusan | Jurusan |

**2. Informasi Kontak**

| **Informasi** | **Data** |
| --- | --- |
| Email | email@contoh.com |
| Nomor Telepon | 08xxxxxxxxxx |

**3. Informasi Keanggotaan**

| **Informasi** | **Data** |
| --- | --- |
| Status | Kader Aktif |
| Jabatan | Jika ada |
| Penugasan | Jika ada |

Edit ProfilMockup konseptual, bukan data pengguna sebenarnya.

## **B. Rekomendasi aturan pengeditan**

Supaya aman dan sederhana:

| **Informasi** | **Aturan** |
| --- | --- |
| NIM | Tidak dapat diedit langsung |
| Nama | Dapat diperbarui |
| Fakultas | Dropdown 8 fakultas |
| Jurusan | Input teks |
| Email | Dapat diubah dengan verifikasi email baru |
| Nomor telepon | Dapat diperbarui |
| Status Kader | Dikelola Admin |
| Jabatan dan riwayat organisasi | Tidak dapat diedit pengguna |

Status Kader, jabatan, dan riwayat organisasi tetap menjadi informasi resmi yang dikelola melalui Admin dan penugasan organisasi.

## **C. Satu keputusan yang perlu kita tetapkan**

Bagaimana jika pengguna ingin memperbaiki NIM atau identitas akademiknya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.4.2.

05.4.2 — Profil Saya Dikunci

- NIM tidak dapat diedit langsung oleh pengguna.

- Koreksi identitas dilakukan melalui Admin setelah pemeriksaan.

- Fakultas dan Jurusan dapat diperbarui sesuai ketentuan profil.

- Email baru harus diverifikasi jika diubah.

- Status Kader dan riwayat organisasi dikelola melalui sistem organisasi.

# **05.4.3 — Personal Area Kader**

Sekarang kita membahas informasi khusus pengguna yang sudah berstatus Kader.

Menurutku, tidak perlu membuat dashboard baru. Tetap menggunakan Dashboard Personal Area yang sama, tetapi terdapat tambahan informasi keanggotaan.

## **A. Informasi yang ditampilkan**

**Keanggotaan HIPMI**

**Status Kader**

Aktif

**Riwayat Organisasi**

**Riwayat Jabatan**

Jabatan struktural dan periode penugasan

**Riwayat Program Kerja**

Proker yang pernah diikuti dan dikelola

**Riwayat Kehadiran**

Kehadiran dalam agenda dan kegiatan

**Riwayat Aktivitas**

Aktivitas organisasi yang tercatat

Riwayat tetap dipertahankan meskipun status keanggotaan atau penugasan sudah berakhir.

## **B. Aturan akses**

| **Kondisi** | **Tampilan** |
| --- | --- |
| Kader aktif | Status Kader Aktif |
| Kader nonaktif | Status Kader Nonaktif |
| Kader sekaligus pengurus | Informasi Kader + akses organisasi |
| Kader tanpa jabatan | Personal Area saja |
| Mantan pengurus | Riwayat jabatan tetap terlihat |

Kader tidak otomatis memperoleh akses Workspace organisasi.

## **C. Satu keputusan**

Menurutku, riwayat organisasi sebaiknya bersifat **read-only** bagi Kader.

Artinya, Kader hanya dapat melihat riwayat jabatan, Proker, kehadiran, dan aktivitasnya sendiri. Tidak dapat mengubah atau menghapusnya.

**Apakah kita sepakati bahwa seluruh riwayat organisasi di Personal Area Kader bersifat read-only?**

SIPPP! Kita tetapkan. 🔥

05.4.3 — Personal Area Kader Dikunci

**Seluruh riwayat organisasi bersifat Read-Only.**

- Riwayat jabatan hanya dapat dilihat.

- Riwayat Proker hanya dapat dilihat.

- Riwayat kehadiran hanya dapat dilihat.

- Riwayat aktivitas hanya dapat dilihat.

- Kader tidak dapat mengedit atau menghapus riwayat.

- Data historis tetap dipertahankan.

# **05.4.4 — Aktivitas & Pendaftaran Agenda**

Kita hubungkan Personal Area dengan modul Agenda & Tiket yang sudah dibahas.

## **A. Rancangan UI**

**Agenda & Tiket Saya**

# **3**

Total pendaftaran

# **2**

Tiket terbit

# **1**

Menunggu

**Seminar Kewirausahaan**

Tiket Terbit

18 Desember 2026

**Business Networking**

Menunggu Verifikasi

22 Desember 2026

Ilustrasi tampilan Personal Area.

## **B. Rekomendasi alur**

- Pengguna login ke Personal Area.

- Membuka Agenda & Tiket Saya.

- Melihat seluruh pendaftaran yang terhubung dengan akunnya.

- Memeriksa status pembayaran dan tiket.

- Membuka atau mengunduh tiket PDF jika sudah diterbitkan.

## **C. Satu keputusan penting**

Karena sebelumnya kita sudah menyepakati bahwa pendaftaran agenda boleh dilakukan tanpa login, kita perlu menentukan bagaimana pendaftaran tersebut masuk ke Personal Area.

Menurutku:

**A. Dua jalur pendaftaran (Rekomendasiku)**

1. Pengguna yang sedang login: data pendaftaran otomatis terhubung ke akunnya dan muncul di Agenda & Tiket Saya.

1. Pengunjung tanpa login: tetap dapat mendaftar seperti biasa, tetapi mengecek tiket melalui fitur Cek Status Tiket menggunakan NIM dan verifikasi email/OTP.

Dengan begitu, kita tidak mengubah keputusan bahwa pendaftaran publik tidak wajib login.

MANTAPPP! 🔥 Kita tetapkan keputusan 05.4.4.

05.4.4 — Agenda & Tiket Saya Dikunci

- Pengguna yang mendaftar saat login: pendaftaran otomatis terhubung ke akunnya.

- Pengunjung tanpa login: dapat mendaftar tanpa akun.

- Pengunjung tanpa login mengecek tiket melalui NIM dan verifikasi email/OTP.

- Tiket PDF dapat dibuka dan diunduh melalui Personal Area jika sudah diterbitkan.

# **05.4.5 — Aktivitas Anggota Tim Proker**

Kita pertahankan keputusan sebelumnya: **Anggota Tim hanya memiliki akses Read-Only.**

## **A. Informasi yang dapat dilihat**

**Proker yang Saya Ikuti**

**Seminar Kewirausahaan 2026**

Sedang Berjalan

- Informasi dan deskripsi Proker.

- Susunan tim.

- Jadwal kegiatan yang relevan.

- Perkembangan umum Proker.<br>Lihat Detail

Ilustrasi tampilan Personal Area Anggota Tim.

## **B. Batas akses**

| **Aktivitas** | **Akses** |
| --- | --- |
| Melihat informasi Proker | Boleh |
| Melihat jadwal | Boleh |
| Melihat perkembangan | Boleh |
| Mengedit Proker | Tidak |
| Membuat tugas | Tidak |
| Menjadi PIC tugas | Tidak |
| Mengelola keuangan | Tidak |

## **C. Satu keputusan**

Menurutku, Anggota Tim cukup mengakses informasi Proker melalui Personal Area, tanpa mendapatkan switcher Organization Management.

Jadi:

- Pengurus struktural → akses Organization Management.

- Pengelola Proker → akses Organization Management dan Workspace Proker sesuai penugasan.

- Anggota Tim → Personal Area dan tampilan Proker Read-Only.

**Apakah mekanisme ini kita sepakati?**

Setelah itu kita lanjut ke 05.4.6 — Perubahan Informasi & Status Pengguna. 🤝

MANTAPPP! 🔥 Kita tetapkan keputusan 05.4.5.

05.4.5 — Aktivitas Anggota Tim Dikunci

- Anggota Tim mengakses informasi Proker melalui Personal Area.

- Akses bersifat Read-Only.

- Tidak mendapatkan Switcher Organization Management.

- Tidak dapat mengedit Proker atau menjadi PIC tugas.

- Pengelola Proker tetap memiliki akses Workspace Proker sesuai penugasan.

# **05.4.6 — Perubahan Informasi & Status Pengguna**

Ini sub-tahap terakhir Personal Area. Kita gabungkan aturan yang sudah disepakati, tanpa mengulang pembahasan sebelumnya.

## **A. Alur perubahan informasi**

| **Informasi** | **Mekanisme** |
| --- | --- |
| Nama | Dapat diperbarui |
| Email | Verifikasi email baru |
| Nomor telepon | Dapat diperbarui |
| Fakultas dan Jurusan | Dapat diperbarui |
| NIM | Melalui Admin |
| Status Kader | Dikelola Admin |
| Jabatan | Mengikuti penempatan resmi |
| Penugasan Proker | Mengikuti penugasan aktif |

## **B. Alur perubahan status**

1. Admin atau pihak berwenang melakukan perubahan status atau penugasan.

1. Sistem memperbarui status pengguna.

1. Personal Area menampilkan informasi terbaru.

1. Jika penugasan berubah, akses organisasi menyesuaikan secara otomatis.

1. Riwayat dan aktivitas sebelumnya tetap dipertahankan.

## **C. Satu keputusan terakhir**

Menurutku, setiap perubahan penting sebaiknya diinformasikan kepada pengguna.

Contohnya:

- Akun berhasil dijadikan Kader.

- Mendapatkan jabatan baru.

- Mendapatkan penugasan Pengelola Proker.

- Masa jabatan berakhir.

- Penugasan Proker dicabut.

**Rekomendasiku: notifikasi muncul di Personal Area dan dikirim melalui email untuk perubahan penting.**

Dengan begitu, pengguna mengetahui perubahan status dan aksesnya tanpa harus memeriksa dashboard terus-menerus.

Apakah kita sepakati mekanisme notifikasi tersebut?

MANTAPPP! 🔥 Kita tetapkan keputusan 05.4.5.

05.4.5 — Aktivitas Anggota Tim Dikunci

- Anggota Tim mengakses informasi Proker melalui Personal Area.

- Akses bersifat Read-Only.

- Tidak mendapatkan Switcher Organization Management.

- Tidak dapat mengedit Proker atau menjadi PIC tugas.

- Pengelola Proker tetap memiliki akses Workspace Proker sesuai penugasan.

# **05.4.6 — Perubahan Informasi & Status Pengguna**

Ini sub-tahap terakhir Personal Area. Kita gabungkan aturan yang sudah disepakati, tanpa mengulang pembahasan sebelumnya.

## **A. Alur perubahan informasi**

| **Informasi** | **Mekanisme** |
| --- | --- |
| Nama | Dapat diperbarui |
| Email | Verifikasi email baru |
| Nomor telepon | Dapat diperbarui |
| Fakultas dan Jurusan | Dapat diperbarui |
| NIM | Melalui Admin |
| Status Kader | Dikelola Admin |
| Jabatan | Mengikuti penempatan resmi |
| Penugasan Proker | Mengikuti penugasan aktif |

## **B. Alur perubahan status**

1. Admin atau pihak berwenang melakukan perubahan status atau penugasan.

1. Sistem memperbarui status pengguna.

1. Personal Area menampilkan informasi terbaru.

1. Jika penugasan berubah, akses organisasi menyesuaikan secara otomatis.

1. Riwayat dan aktivitas sebelumnya tetap dipertahankan.

## **C. Satu keputusan terakhir**

Menurutku, setiap perubahan penting sebaiknya diinformasikan kepada pengguna.

Contohnya:

- Akun berhasil dijadikan Kader.

- Mendapatkan jabatan baru.

- Mendapatkan penugasan Pengelola Proker.

- Masa jabatan berakhir.

- Penugasan Proker dicabut.

**Rekomendasiku: notifikasi muncul di Personal Area dan dikirim melalui email untuk perubahan penting.**

Dengan begitu, pengguna mengetahui perubahan status dan aksesnya tanpa harus memeriksa dashboard terus-menerus.

Apakah kita sepakati mekanisme notifikasi tersebut?

MANTAPPP! 🔥 Kita tetapkan keputusan 05.4.6.

05.4.6 — Dikunci

**Notifikasi perubahan status dan penugasan pengguna.**

- Notifikasi muncul di Personal Area.

- Perubahan penting juga dikirim melalui email.

- Meliputi perubahan status Kader, jabatan, penugasan, dan berakhirnya akses.

- Riwayat perubahan tetap dipertahankan.

# **05.5 — Organization Management**

Sekarang kita masuk ke pengelolaan organisasi oleh pengurus.

Kita tidak mengulang pembahasan fitur. Kita fokus memastikan alur pengguna masuk, bekerja, dan berpindah antarbagian organisasi.

## **05.5.1 — Masuk ke Organization Management**

### **A. Alur masuk**

1. Pengguna login ke HIPMI CENTRAL.

1. Pengguna masuk ke Personal Area.

1. Sistem memeriksa apakah pengguna memiliki penugasan organisasi aktif.

1. Jika memiliki penugasan, Switcher Organisasi ditampilkan.

1. Pengguna memilih Organization Management.

1. Sistem menampilkan Dashboard Organisasi sesuai Role dan Permission.

### **B. Ketentuan akses**

| **Pengguna** | **Switcher Organisasi** |
| --- | --- |
| Mahasiswa Biasa | Tidak |
| Kader tanpa jabatan | Tidak |
| Pengurus struktural aktif | Ya |
| Pengelola Proker aktif | Ya |
| Anggota Tim read-only | Tidak |
| Admin Sistem | Cabinet Center khusus |

### **C. Konsep UI Switcher**

**Area Pengguna**

**Personal Area**

Aktif

**Organization Management**

Ilustrasi switcher, bukan desain final.

**Prinsipnya:** pengguna tidak perlu login ulang untuk berpindah area. Hak akses mengikuti penugasan aktif.

## **D. Satu keputusan kecil**

Ketika pengguna menekan Organization Management, bagaimana halaman awalnya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.5.1.

05.5.1 — Dikunci

- Setiap kali berpindah ke Organization Management, pengguna masuk ke Dashboard Organisasi.

- Tidak perlu login ulang.

- Dashboard menyesuaikan Role, Permission, dan lingkup penugasan.

# **05.5.2 — Dashboard Organisasi**

Kita sebenarnya sudah pernah menetapkan dua keputusan penting untuk dashboard ini. Jadi tidak perlu mengulang dari awal.

Keputusan Sebelumnya — Dikunci

1. Menggunakan **satu template dashboard dinamis berdasarkan Role**.

1. Informasi keuangan hanya ditampilkan kepada pengguna yang memiliki Permission terkait.

## **A. Struktur Dashboard**

Aku merekomendasikan satu template dengan empat bagian utama:

**Dashboard Organisasi**

Contoh struktur tampilan

**Selamat Datang, Andi!**

Kepala Bidang External · Kabinet Aktif

**1. Ringkasan**

Statistik organisasi

Progres pekerjaan

Agenda mendatang

Informasi keuangan\*

**2. Agenda Mendatang**

Jadwal rapat dan kegiatan

Sesuai lingkup akses pengguna

**3. Aktivitas Terbaru**

Perkembangan dan aktivitas organisasi

Sesuai Role dan Permission

**4. Notifikasi**

Informasi dan pemberitahuan terbaru

\*Informasi keuangan hanya tampil jika pengguna memiliki Permission.

## **B. Perbedaan informasi berdasarkan Role**

| **Role** | **Fokus Dashboard** |
| --- | --- |
| Top Management | Monitoring seluruh Bidang, Kompartemen, dan Proker |
| Sekum | Persuratan dan tracking Ditmawa |
| Bendum | Informasi dan aktivitas keuangan |
| Kepala Bidang | Perkembangan Bidang dan Kompartemen di bawahnya |
| Kepala Kompartemen | Aktivitas Kompartemen dan Proker |
| Staff | Aktivitas sesuai tugas dan Permission |
| Pengelola Proker | Proker yang menjadi tanggung jawabnya |

Top Management tetap berfungsi sebagai pemantau, bukan otomatis menjadi operator seluruh unit.

## **C. Business Flow**

1. Pengguna masuk ke Dashboard Organisasi.

1. Sistem mengenali Role dan Permission.

1. Sistem menentukan lingkup informasi yang boleh dilihat.

1. Dashboard menampilkan ringkasan sesuai pengguna.

1. Pengguna memilih informasi atau modul yang ingin dibuka.

1. Sistem mengarahkan pengguna ke halaman terkait.

## **D. Satu keputusan kecil**

Supaya dashboard tidak terlalu ramai, bagaimana jika kita tetapkan bahwa **empat bagian utama di atas selalu menjadi struktur dasar**, sedangkan isi kartu dan informasinya berubah sesuai Role dan Permission?

Jadi kita tidak membuat dashboard berbeda-beda dari nol untuk setiap jabatan.

Apakah setuju dengan konsep ini?

Setelah itu kita lanjut ke **05.5.3 — Sidebar & Permission**. 🤝

MANTAPPP! 🔥 Kita tetapkan keputusan 05.5.2.

05.5.2 — Dashboard Organisasi Dikunci

- Satu template Dashboard Organisasi.

- Empat bagian dasar: Ringkasan, Agenda Mendatang, Aktivitas Terbaru, dan Notifikasi.

- Informasi menyesuaikan Role dan Permission.

- Informasi keuangan hanya tampil kepada pengguna yang berwenang.

- Lingkup informasi mengikuti penempatan organisasi.

# **05.5.3 — Sidebar & Permission**

Kita sudah menyepakati bahwa Organization Management menggunakan sidebar dinamis berdasarkan Role dan Permission.

Menurutku, cukup gunakan satu struktur sidebar. Tidak perlu membuat sidebar berbeda untuk setiap jabatan.

## **A. Struktur sidebar**

**HIPMI CENTRAL**

Aktif

Dashboard

Agenda & Kalender

Persuratan

Keuangan

CMS & Publikasi

WORKSPACE (jika memiliki penugasan)

Workspace Kompartemen

Opsional

Workspace Proker

Opsional

Ilustrasi struktur navigasi. Menu aktual mengikuti Role, Permission, dan penugasan.

## **B. Aturan sidebar**

1. Dashboard selalu tersedia bagi pengguna Organization Management.

1. Modul hanya muncul jika pengguna memiliki Permission.

1. Modul yang dinonaktifkan Admin tidak muncul di sidebar.

1. Pengguna hanya melihat informasi sesuai lingkup penugasannya.

1. Workspace Kompartemen dan Workspace Proker hanya tersedia bagi pengguna yang memiliki penugasan terkait.

1. Admin Panel tetap terpisah melalui Cabinet Center.

## **C. Contoh perbedaan akses**

| **Pengguna** | **Menu utama** |
| --- | --- |
| Top Management | Dashboard, Agenda, Persuratan, Keuangan sesuai Permission |
| Sekum | Dashboard, Agenda, Persuratan |
| Bendum | Dashboard, Agenda, Keuangan |
| Kepala Bidang | Dashboard, Agenda, modul sesuai Permission |
| Kepala Kompartemen | Dashboard, Agenda, Workspace Kompartemen |
| Staff | Dashboard dan modul sesuai Permission |
| Pengelola Proker | Dashboard dan Workspace Proker |

## **D. Satu keputusan yang perlu kita tetapkan**

Bagaimana cara menampilkan akses Workspace di sidebar?

SIAPPP! 🔥 Kita tetapkan keputusan 05.5.3.

05.5.3 — Sidebar Dikunci

**Workspace dipisahkan dari menu utama Organization Management.**

- Menu utama berada di bagian atas.

- Workspace Kompartemen dan Workspace Proker berada dalam kelompok Workspace tersendiri.

- Workspace hanya muncul sesuai penugasan dan Permission pengguna.

# **05.5.4 — Agenda & Kalender**

Kita sudah memiliki tiga keputusan sebelumnya. Tidak perlu mengulang.

Keputusan Sebelumnya — Dikunci

1. Satu kalender terpadu untuk seluruh kabinet.

1. Filter berdasarkan Kabinet, Bidang, Kompartemen, dan Program Kerja.

1. Agenda dapat ditandai Internal atau Publik. Agenda publik dapat diteruskan ke halaman Agenda & Tiket.

## **A. Rekomendasi UI**

Menurutku, cukup satu halaman kalender dengan beberapa pilihan tampilan.

**Agenda & Kalender**

Semua Agenda

Internal

Publik

Filter Bidang

**Semua Bidang**

Filter Kompartemen

**Semua Kompartemen**

Filter Program Kerja

**Semua Proker**

Tampilan

**Bulanan**

**November 2026**

Min

Sen

Sel

Rab

Kam

Jum

Sab

1

2

3

4

5

6

7

8

9

10

11

12

13

14

15

16

**17**

18

19

20

21

22

23

24

25

26

27

28

29

30

Ilustrasi kalender, bukan data agenda aktual.

## **B. Business Flow**

1. Pengguna membuka Agenda & Kalender.

1. Sistem menampilkan agenda sesuai Role, Permission, dan lingkup akses.

1. Pengguna memilih filter atau tanggal.

1. Pengguna membuka detail agenda.

1. Pengguna yang memiliki Permission dapat membuat atau mengelola agenda.

1. Agenda ditentukan sebagai Internal atau Publik.

1. Jika Publik, agenda dapat ditampilkan di halaman Agenda & Tiket.

1. Jika Internal, agenda hanya dapat dilihat pengguna yang memiliki akses.

## **C. Satu hal yang perlu kita tetapkan**

Menurutku, supaya tidak membingungkan, kita perlu membedakan tempat pembuatan agenda:

SIAPPP! 🔥 Kita tetapkan keputusan B dan tambahan penggunaan warna pada kalender.

05.5.4 — Agenda & Kalender Dikunci

**Semua agenda dibuat melalui satu halaman Agenda & Kalender.**

- Agenda organisasi dibuat melalui Agenda & Kalender.

- Agenda Proker juga dibuat melalui Agenda & Kalender.

- Workspace Proker hanya menampilkan agenda yang berkaitan dengan Proker tersebut.

- Semua agenda masuk ke satu kalender terpadu.

- Warna digunakan untuk membedakan jenis atau asal agenda.

## **A. Panduan warna kalender**

Aku menyarankan cukup dua warna utama:

**Biru — Agenda Organisasi**

Rapat kabinet, pleno, dan agenda organisasi.

**Ungu — Agenda Program Kerja**

Event, seminar, workshop, dan kegiatan Proker.

Status Internal atau Publik tetap ditampilkan menggunakan label tersendiri, bukan menambah warna kategori.

Dengan begitu, kalender tetap mudah dibaca dan tidak terlalu banyak warna.

# **05.5.5 — Persuratan**

Kita gunakan keputusan sebelumnya:

- Kepala Bidang, Kepala Kompartemen, Pengelola Proker, dan Staff dengan Permission boleh mengajukan surat.

- Semua pengajuan masuk ke Sekretaris Umum (Sekum).

- Ditmawa tetap satu modul Persuratan, tetapi memiliki halaman tracking tersendiri.

- Persetujuan surat tetap menjadi kewenangan Sekum.

## **A. Business Flow**

1. Pengguna membuka Persuratan.

1. Membuat pengajuan surat dan melengkapi dokumen.

1. Memilih jenis surat: Surat Ditmawa atau Surat Umum.

1. Pengajuan masuk ke Sekum.

1. Sekum memeriksa pengajuan.

1. Jika perlu perbaikan, pengajuan dikembalikan kepada pemohon.

1. Jika disetujui, proses surat dilanjutkan.

1. Khusus Surat Ditmawa, perkembangannya dapat dipantau melalui halaman Tracking Ditmawa.

## **B. Struktur UI Persuratan**

**PERSURATAN**

**Ajukan Surat**

Membuat pengajuan surat baru

**Daftar Pengajuan**

Melihat seluruh pengajuan surat sesuai akses

**Tracking Ditmawa**

Memantau status surat yang ditujukan kepada Ditmawa

## **C. Satu keputusan berikutnya**

Jika Sekum mengembalikan surat untuk diperbaiki, bagaimana alurnya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.5.5.

05.5.5 — Persuratan Dikunci

**Revisi dilakukan pada pengajuan surat yang sama.**

- Sekum memberikan catatan revisi.

- Pemohon memperbaiki dokumen.

- Pemohon mengirim ulang pengajuan.

- Tidak perlu membuat pengajuan baru.

- Riwayat revisi tetap dapat dilihat.

# **05.5.6 — Keuangan Organisasi**

Kita pertahankan keputusan sebelumnya:

- Keuangan Bidang, Kompartemen, dan Proker menggunakan satu template dinamis berdasarkan lingkup unit.

- Staff dengan Permission boleh mencatat pemasukan dan pengeluaran serta mengajukan dana.

- Staff tidak boleh menyetujui atau mencairkan dana.

- Bendum berwenang menyetujui dan mencairkan pengajuan dana.

- Bendum dapat memonitor keuangan seluruh unit sesuai kewenangannya.

## **A. Struktur UI Keuangan**

Menurutku cukup tiga bagian utama.

**KEUANGAN ORGANISASI**

**Ringkasan Keuangan**

Pemasukan, pengeluaran, dan saldo

**Transaksi**

Pencatatan pemasukan dan pengeluaran

**Pengajuan Dana**

Pengajuan dan pencairan dana

**Laporan Keuangan**

Rekap dan riwayat keuangan

Empat bagian dalam satu modul, menggunakan template yang sama sesuai lingkup akses.

## **B. Business Flow**

**1. Pencatatan transaksi**

1. Staff atau pengurus dengan Permission membuka Keuangan.

1. Memilih pemasukan atau pengeluaran.

1. Mengisi nominal, keterangan, dan bukti transaksi.

1. Menyimpan pencatatan.

1. Transaksi muncul dalam laporan keuangan unit.

**2. Pengajuan dana**

1. Pengurus atau Staff dengan Permission membuat pengajuan dana.

1. Mengisi tujuan, nominal, dan dokumen pendukung.

1. Pengajuan masuk ke Bendum.

1. Bendum memeriksa pengajuan.

1. Bendum menyetujui, menolak, atau meminta revisi.

1. Jika disetujui, Bendum melakukan pencairan dana.

1. Status pencairan diperbarui dan pemohon mendapatkan notifikasi.

Catatan: pencatatan transaksi langsung oleh Pengelola Proker di Workspace Proker tetap mengikuti keputusan khusus yang sudah kita sepakati sebelumnya, yaitu tanpa persetujuan Bendum, dengan Bendum tetap dapat memonitor.

## **C. Satu keputusan berikutnya**

Jika Bendum meminta revisi pengajuan dana, bagaimana mekanismenya?

SIAPPP! 🔥 Kita tetapkan keputusan 05.5.6.

05.5.6 — Keuangan Dikunci

**Revisi pengajuan dana dilakukan pada pengajuan yang sama.**

- Bendum memberikan catatan revisi.

- Pemohon memperbaiki nominal, keterangan, atau dokumen.

- Pemohon mengirim ulang pengajuan.

- Tidak perlu membuat pengajuan baru.

- Riwayat revisi tetap dipertahankan.

# **05.5.7 — CMS & Publikasi**

Kita menggunakan keputusan yang sudah disepakati. Tidak perlu membuat sistem CMS baru yang rumit.

## **A. Struktur fitur**

Menurutku cukup tiga kelompok pengelolaan:

**CMS & PUBLIKASI**

**Berita & Artikel**

Membuat, mengedit, dan mempublikasikan konten.

**Media Partner**

Memeriksa dan menindaklanjuti pengajuan kerja sama.

**Kotak Suara**

Melihat dan menindaklanjuti aspirasi masyarakat.

Karya Kader tetap masuk dalam pengelolaan konten CMS melalui alur pengajuan yang sudah kita bahas.

## **B. Business Flow**

**1. Berita & Artikel**

1. Content Creator membuat konten.

1. Konten disimpan sebagai Draft.

1. Publisher memeriksa dan boleh mengedit langsung.

1. Publisher mempublikasikan konten.

1. Konten tampil di Public Website.

**2. Media Partner**

- Pengajuan masuk dari Public Website.

- Pengurus dengan akses terkait memeriksa pengajuan.

- Pemohon dapat diminta melakukan revisi.

- Pengurus menindaklanjuti dan menyetujui atau menolak.

- Publikasi dilakukan manual oleh Kompartemen Media Komunikasi.

**3. Kotak Suara**

- Aspirasi masuk melalui Public Website.

- Pengurus dengan Permission khusus dapat melihat dan mengelolanya.

- Pengurus menindaklanjuti melalui WhatsApp.

- Status tindak lanjut diperbarui.

## **C. Pembagian kewenangan**

| **Pengguna** | **Tanggung jawab** |
| --- | --- |
| Content Creator | Membuat konten |
| Publisher | Mengedit dan mempublikasikan |
| Pengurus Media Komunikasi | Mengelola Media Partner |
| Pengurus dengan Permission Kotak Suara | Mengelola aspirasi |
| Admin Sistem | Mengatur Permission dan mengawasi |

Satu pengurus boleh memiliki Permission Content Creator sekaligus Publisher.

## **D. Satu keputusan terakhir**

Jika satu pengurus memiliki kedua Permission tersebut, apakah dia boleh langsung mempublikasikan konten yang dibuatnya sendiri?

GASSS! 🔥 Kita tetapkan keputusan 05.5.7.

05.5.7 — CMS & Publikasi Dikunci

- Pengurus boleh memiliki Permission Content Creator sekaligus Publisher.

- Jika memiliki keduanya, pengurus boleh mempublikasikan kontennya sendiri.

- Publisher boleh mengedit konten sebelum publikasi.

- Admin mengatur Permission dan mengawasi CMS.

# **05.5.8 — Monitoring & Laporan Organisasi**

Kita masuk ke bagian terakhir Organization Management.

Menurutku, **tidak perlu membuat modul Laporan baru**. Lebih sederhana jika laporan tersedia di dalam masing-masing modul.

## **A. Konsep monitoring**

| **Role** | **Lingkup monitoring** |
| --- | --- |
| Top Management | Seluruh Bidang, Kompartemen, dan Proker |
| Kepala Bidang | Bidang dan Kompartemen di bawahnya |
| Kepala Kompartemen | Kompartemen dan Proker di bawahnya |
| Sekum | Persuratan dan tracking Ditmawa |
| Bendum | Seluruh aktivitas keuangan sesuai kewenangannya |
| Staff | Sesuai Permission |
| Pengelola Proker | Proker yang dikelolanya |

Top Management berperan sebagai pemantau lintas unit, bukan otomatis menjadi operator seluruh pekerjaan.

## **B. Penempatan laporan**

Aku merekomendasikan:

**Laporan terintegrasi dalam setiap modul**

**Agenda & Kalender**

Rekap agenda dan pelaksanaan kegiatan

**Persuratan**

Rekap pengajuan dan status surat

**Keuangan**

Pemasukan, pengeluaran, dan laporan keuangan

**CMS & Publikasi**

Rekap konten dan publikasi

Dengan begitu, pengguna tidak perlu membuka menu Laporan terpisah untuk mencari data setiap modul.

## **C. Satu keputusan yang perlu kita tetapkan**

Bagaimana dengan fitur unduh laporan?

GASSS! 🔥 Kita tetapkan keputusan 05.5.8.

05.5.8 — Monitoring & Laporan Dikunci

- Laporan tersedia di dalam masing-masing modul.

- Format unduhan PDF dan Excel.

- Akses laporan mengikuti Role dan Permission.

- Top Management dapat melakukan monitoring lintas Bidang, Kompartemen, dan Proker.

# **05.6 — Workspace Kompartemen**

Sekarang kita masuk ke ruang kerja khusus Kepala Kompartemen dan Staff.

Kita sudah menetapkan **8 menu utama**. Jadi tidak perlu membahas ulang struktur menunya.

## **A. Struktur menu Workspace Kompartemen**

**WORKSPACE KOMPARTEMEN**

8 Menu Final

01

**Overview**

Ringkasan aktivitas Kompartemen

02

**Anggota**

Pengelolaan Staff Kompartemen

03

**Program Kerja**

Pembuatan dan pengelolaan Proker

04

**Progres & Pleno**

Progres unit dan monitoring Proker

05

**Kalender & Agenda**

Jadwal dan kegiatan Kompartemen

06

**Persuratan**

Pengajuan surat kepada Sekum

07

**Keuangan**

Kas dan pengajuan dana

08

**Dokumen & LPJ**

Dokumen dan laporan pertanggungjawaban

Statistik dan riwayat aktivitas digabungkan ke Overview atau halaman terkait, bukan menjadi menu tersendiri.

## **B. Aturan utama yang sudah disepakati**

- Kepala Kompartemen boleh langsung membuat dan menjalankan Proker tanpa approval tambahan.

- Pengajuan surat tetap melalui Sekum.

- Persetujuan dan pencairan dana tetap menjadi kewenangan Bendum.

- Staff mendapatkan akses sesuai Permission.

- Anggota Tim Proker tetap Read-Only.

## **05.6.1 — Overview**

Kita mulai dari halaman pertama.

Menurutku, Overview cukup menampilkan empat bagian:

**Overview Kompartemen**

**Jumlah Anggota**

Ringkasan Staff

**Program Kerja**

Proker aktif dan selesai

**Progres**

Perkembangan kegiatan

**Agenda Mendatang**

Jadwal Kompartemen

**Aktivitas Terbaru**

Menampilkan perubahan dan aktivitas terbaru di Kompartemen.

Informasi keuangan hanya ditampilkan jika pengguna memiliki Permission terkait.

**Satu keputusan:**

Bagaimana tampilan Overview untuk Kepala Kompartemen dan Staff?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.1.

05.6.1 — Overview Dikunci

**Kepala Kompartemen dan Staff melihat informasi Overview yang sama.**

- Struktur tampilan sama.

- Informasi ringkasan sama.

- Hak akses dan tindakan tetap mengikuti Role dan Permission masing-masing.

# **05.6.2 — Anggota**

Kita masuk ke pengelolaan anggota Kompartemen.

## **A. Struktur halaman**

Menurutku cukup menampilkan:

**Anggota Kompartemen**

Daftar anggota dalam Kompartemen

Anggota Aktif

Cari nama atau NIM anggota...

**Andi Pratama**

Kepala Kompartemen

**Budi Santoso**

Staff

**Citra Amelia**

Staff

Ilustrasi daftar anggota, bukan data sebenarnya.

## **B. Informasi anggota**

Saat anggota dipilih, tampilkan:

- Nama dan NIM.

- Fakultas dan Jurusan.

- Jabatan atau Role.

- Status keanggotaan.

- Riwayat aktivitas dalam Kompartemen.

## **C. Satu keputusan**

Bagaimana mekanisme penempatan Staff ke Kompartemen?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.2.

05.6.2 — Anggota Dikunci

**Kepala Kompartemen dapat menambahkan dan mengeluarkan Staff dari Kompartemennya.**

- Kepala Kompartemen mengelola anggota unitnya.

- Penambahan dan pengeluaran Staff tidak memerlukan Admin.

- Admin tetap mengelola penempatan jabatan struktural resmi.

- Riwayat keanggotaan dan aktivitas tetap dipertahankan.

Catatan: pengelolaan anggota ini tidak berarti Kepala Kompartemen dapat mengangkat seseorang menjadi Kepala Bidang atau jabatan struktural lainnya.

# **05.6.3 — Program Kerja**

Kita gunakan keputusan yang sudah pernah disepakati:

- Kepala Kompartemen boleh langsung membuat dan menjalankan Proker.

- Tidak membutuhkan approval tambahan dari Kepala Bidang, Top Management, maupun Admin.

- Satu Proker boleh memiliki beberapa Agenda/Event.

- Pengelolaan agenda tetap melalui menu Agenda & Kalender.

- Workspace Proker menampilkan agenda yang berkaitan dengan Proker tersebut.

## **A. Struktur halaman**

**Program Kerja**

Daftar Proker Kompartemen

Aktif

**Seminar Kewirausahaan**

Berjalan

Program kerja Kompartemen

Progres: 65%

**Business Networking**

Persiapan

Program kerja Kompartemen

Progres: 20%

Ilustrasi tampilan, bukan data Proker aktual.

## **B. Business Flow**

1. Kepala Kompartemen memilih Tambah Program Kerja.

1. Mengisi nama, deskripsi, tujuan, dan periode Proker.

1. Menyimpan Proker.

1. Proker langsung masuk ke Workspace Proker.

1. Kepala Kompartemen menunjuk Pengelola Proker.

1. Pengelola Proker menjalankan kegiatan sesuai tanggung jawabnya.

1. Kepala Kompartemen dapat memonitor perkembangan Proker.

## **C. Satu keputusan**

**Apakah Staff boleh membuat Program Kerja juga?**

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.3.

05.6.3 — Program Kerja Dikunci

- Hanya Kepala Kompartemen yang dapat membuat Proker.

- Tidak memerlukan approval tambahan.

- Kepala Kompartemen menunjuk Pengelola Proker.

- Staff membantu pelaksanaan sesuai Permission.

- Pengelola Proker bertanggung jawab menjalankan Proker.

# **05.6.4 — Progres & Pleno**

Kita fokus pada dua hal: pemantauan perkembangan Kompartemen dan pencatatan hasil pleno.

## **A. Struktur halaman**

**Progres & Pleno**

**Progres Kompartemen**

Perkembangan kegiatan dan Proker

**Catatan Pleno**

Hasil dan dokumentasi pleno

**Riwayat Progres**

Menampilkan catatan perkembangan yang pernah dimasukkan.

**Riwayat Pleno**

Menampilkan hasil pleno berdasarkan tanggal pelaksanaan.

## **B. Business Flow**

1. Pengguna membuka Progres & Pleno.

1. Melihat perkembangan Kompartemen.

1. Menambahkan catatan progres sesuai kewenangan.

1. Mencatat hasil pleno dan melampirkan dokumentasi.

1. Sistem menyimpan catatan beserta waktu dan penginputnya.

1. Riwayat dapat dilihat kembali.

## **C. Satu keputusan**

Siapa yang boleh menginput progres dan hasil pleno?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.4.

05.6.4 — Progres & Pleno Dikunci

- Kepala Kompartemen boleh menginput progres dan hasil pleno.

- Staff dengan Permission juga boleh menginput.

- Setiap catatan menyimpan waktu dan identitas penginput.

- Riwayat progres dan pleno tetap tersedia.

# **05.6.5 — Kalender & Agenda**

Kita pertahankan keputusan yang sudah dibuat sebelumnya:

- Semua agenda dibuat melalui menu utama Agenda & Kalender.

- Agenda Kompartemen otomatis dapat ditampilkan dalam Workspace Kompartemen.

- Kalender menggunakan warna:

  - Biru<br> Agenda Organisasi.

  - Ungu<br> Agenda Program Kerja.

## **A. Struktur halaman**

**Kalender Kompartemen**

Agenda Organisasi

Agenda Proker

**Agenda Mendatang**

**Rapat Koordinasi Kompartemen**

20 November 2026 · 10.00 WIB

**Seminar Kewirausahaan**

25 November 2026 · 09.00 WIB

Ilustrasi tampilan kalender.

## **B. Business Flow**

1. Pengguna membuka Kalender & Agenda.

1. Sistem menampilkan agenda yang berkaitan dengan Kompartemennya.

1. Pengguna melihat jadwal dan detail agenda.

1. Jika ingin membuat agenda, pengguna diarahkan ke menu utama Agenda & Kalender.

1. Agenda yang dibuat dan dikaitkan dengan Kompartemen otomatis muncul di Workspace ini.

## **C. Satu keputusan**

Bagaimana akses pengelolaan agenda dari Workspace Kompartemen?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.5.

05.6.5 — Kalender & Agenda Dikunci

- Workspace Kompartemen menampilkan agenda terkait.

- Tersedia tombol **Buat Agenda**.

- Tombol mengarahkan pengguna ke Agenda & Kalender.

- Kompartemen otomatis terpilih.

- Seluruh agenda tetap berada dalam satu kalender terpadu.

# **05.6.6 — Persuratan**

Kita pertahankan keputusan sebelumnya:

- Kepala Kompartemen boleh mengajukan surat.

- Staff dengan Permission boleh mengajukan surat.

- Semua pengajuan masuk ke Sekretaris Umum (Sekum).

- Persetujuan surat tetap menjadi kewenangan Sekum.

- Kepala Kompartemen dapat memonitor pengajuan surat dari Proker bawahannya.

## **A. Struktur halaman**

**Persuratan Kompartemen**

**Ajukan Surat**

Membuat pengajuan surat Kompartemen

**Daftar Pengajuan**

Melihat pengajuan surat Kompartemen

**Status Pengajuan**

Memantau proses persetujuan Sekum

## **B. Business Flow**

1. Kepala Kompartemen atau Staff dengan Permission membuka Persuratan.

1. Memilih Ajukan Surat.

1. Mengisi informasi surat dan lampiran.

1. Mengirim pengajuan langsung kepada Sekum.

1. Sekum memeriksa dan memberikan keputusan.

1. Jika perlu revisi, pemohon memperbaiki pengajuan yang sama.

1. Status pengajuan diperbarui dan dapat dipantau.

## **C. Satu keputusan**

Bagaimana mekanisme pengajuan surat oleh Staff?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.6.

05.6.6 — Persuratan Dikunci

- Kepala Kompartemen boleh mengajukan surat langsung kepada Sekum.

- Staff dengan Permission juga boleh mengajukan langsung kepada Sekum.

- Tidak memerlukan persetujuan tambahan Kepala Kompartemen.

- Revisi dilakukan pada pengajuan yang sama.

- Kepala Kompartemen tetap dapat memonitor pengajuan surat.

# **05.6.7 — Keuangan**

Kita pertahankan keputusan keuangan yang sudah disepakati sebelumnya.

## **A. Struktur halaman**

**KEUANGAN KOMPARTEMEN**

**Ringkasan Keuangan**

Pemasukan, pengeluaran, dan saldo

**Transaksi**

Pencatatan pemasukan dan pengeluaran

**Pengajuan Dana**

Pengajuan kebutuhan dana kepada Bendum

**Laporan Keuangan**

Rekap dan riwayat keuangan

## **B. Business Flow**

**1. Pencatatan transaksi**

1. Kepala Kompartemen atau Staff dengan Permission membuka Keuangan.

1. Memilih pemasukan atau pengeluaran.

1. Mengisi nominal dan keterangan.

1. Melampirkan bukti transaksi.

1. Menyimpan pencatatan.

1. Transaksi masuk ke laporan keuangan Kompartemen.

**2. Pengajuan dana**

1. Pengguna dengan Permission memilih Ajukan Dana.

1. Mengisi kebutuhan, nominal, dan bukti pendukung jika ada.

1. Pengajuan diteruskan kepada Bendum.

1. Bendum memeriksa pengajuan.

1. Bendum menyetujui, menolak, atau meminta revisi.

1. Jika disetujui, Bendum melakukan pencairan dana.

**3. Monitoring**

Kepala Kompartemen dapat memantau keuangan Kompartemennya, sedangkan Bendum dapat memonitor keuangan lintas unit sesuai kewenangannya.

## **C. Aturan akses**

| **Aktivitas** | **Kepala Kompartemen** | **Staff ber-Permission** | **Bendum** |
| --- | --- | --- | --- |
| Melihat keuangan | Ya | Sesuai akses | Ya |
| Mencatat transaksi | Ya | Ya | Ya |
| Mengajukan dana | Ya | Ya | Ya |
| Menyetujui dana | Tidak | Tidak | Ya |
| Mencairkan dana | Tidak | Tidak | Ya |

## **D. Satu keputusan yang perlu kita tetapkan**

Ketika Staff mengajukan dana atas nama Kompartemen, apakah pengajuan boleh langsung dikirim kepada Bendum?

SIAPPP! 🔥 Kita tetapkan keputusan 05.6.7.

05.6.7 — Keuangan Dikunci

- Kepala Kompartemen boleh mengajukan dana kepada Bendum.

- Staff dengan Permission boleh mengajukan dana langsung kepada Bendum.

- Tidak memerlukan persetujuan tambahan Kepala Kompartemen.

- Bendum tetap memegang kewenangan persetujuan dan pencairan.

- Kepala Kompartemen dapat memonitor keuangan Kompartemennya.

# **05.6.8 — Dokumen & LPJ**

Ini merupakan menu terakhir dari Workspace Kompartemen.

Menurutku, kita cukup membaginya menjadi dua bagian.

## **A. Struktur halaman**

**DOKUMEN & LPJ**

**Dokumen Kompartemen**

Surat, dokumen administrasi, dan arsip kegiatan.

**Laporan Pertanggungjawaban (LPJ)**

LPJ dan dokumentasi penyelesaian Proker.

## **B. Rekomendasi Business Flow**

**1. Dokumen Kompartemen**

- Kepala Kompartemen atau Staff dengan Permission mengunggah dokumen.

- Dokumen dikelompokkan berdasarkan kategori.

- Dokumen dapat dilihat dan diunduh sesuai Permission.

**2. LPJ**

- Pengelola Proker menyusun dan mengunggah LPJ melalui Workspace Proker.

- LPJ otomatis terhubung dengan Proker terkait.

- Kepala Kompartemen dapat melihat dan memonitor LPJ seluruh Proker bawahannya.

- Riwayat dokumen tetap dipertahankan.

Kita tetap mempertahankan keputusan bahwa Kepala Kompartemen berwenang menutup Proker.

## **C. Satu keputusan yang perlu kita tetapkan**

Untuk pengelolaan LPJ, apakah kita sepakat dengan mekanisme berikut?

GASSS! 🔥 Kita tetapkan keputusan 05.6.8.

05.6.8 — Dokumen & LPJ Dikunci

- LPJ dibuat dan diunggah melalui Workspace Proker.

- Pengelola Proker bertanggung jawab mengelola LPJ.

- Workspace Kompartemen menampilkan LPJ seluruh Proker bawahannya.

- Kepala Kompartemen dapat memonitor LPJ.

- Tidak ada pengunggahan LPJ ganda.

# **05.7 — Workspace Proker**

Sekarang kita masuk ke ruang kerja khusus pelaksanaan Program Kerja.

Kita pertahankan keputusan yang sudah disepakati:

- Pengelola Proker menjadi penanggung jawab operasional.

- Satu Proker dapat memiliki beberapa Agenda/Event.

- PIC tugas hanya boleh berasal dari Pengelola Proker.

- Anggota Tim memiliki akses Read-Only.

- Persuratan langsung diajukan kepada Sekum.

- Pencatatan pemasukan dan pengeluaran dapat dilakukan tanpa persetujuan Bendum, tetapi tetap dapat dimonitor Bendum.

## **05.7.1 — Overview Workspace Proker**

Menurutku, halaman Overview cukup menampilkan:

**WORKSPACE PROKER**

**Seminar Kewirausahaan 2026**

Sedang Berjalan

Kompartemen Partnership

**Progres**

# **65%**

**Anggota Tim**

# **12**

**Agenda**

# **3**

**Tugas**

# **8**

**Agenda Terdekat**

Menampilkan jadwal kegiatan Proker.

**Aktivitas Terbaru**

Menampilkan perkembangan dan aktivitas tim.

Ilustrasi konsep dashboard, bukan data aktual.

**Rekomendasiku:** Pengelola Proker dan Anggota Tim menggunakan Overview yang sama. Namun, tombol tindakan seperti mengelola tugas, anggota, dan dokumen hanya muncul bagi Pengelola Proker. Anggota Tim tetap Read-Only.

Apakah kita sepakati konsep Overview ini? 🤝

MANTAPPP! 🔥 Kita tetapkan keputusan 05.7.1.

05.7.1 — Overview Workspace Proker Dikunci

- Pengelola Proker dan Anggota Tim menggunakan Overview yang sama.

- Informasi Proker ditampilkan secara konsisten.

- Tombol pengelolaan hanya tersedia bagi Pengelola Proker.

- Anggota Tim tetap Read-Only.

- Statistik, agenda, tugas, dan aktivitas ditampilkan dalam satu halaman Overview.

# **05.7.2 — Tim Pelaksana**

Kita tetapkan struktur halaman ini menjadi **dua tab**, supaya keanggotaan tim tidak tercampur dengan hak akses Workspace.

**TIM PELAKSANA**

**Data Anggota**

Roster kepanitiaan

**Pengelola Workspace**

Akses pengelolaan

## **A. Tab Data Anggota**

Dikelola oleh Pengelola Proker.

Fitur:

- Menambahkan anggota.

- Mengedit informasi anggota.

- Mengubah jabatan kepanitiaan.

- Mengeluarkan anggota.

- Melihat status keanggotaan.

- Melihat riwayat keanggotaan.

Informasi anggota:

- Nama lengkap.

- NIM.

- Jabatan kepanitiaan.

- Status kader.

- Status keanggotaan.

Anggota boleh berasal dari kader maupun nonkader.

front end.docx

## **B. Tab Pengelola Workspace**

Bagian ini khusus menampilkan orang yang memiliki akses mengelola Workspace Proker.

Ketentuannya:

- Harus kader aktif dan terverifikasi.

- Harus memiliki akun HIPMI CENTRAL.

- Penunjukan dan pencabutan akses dilakukan Kepala Kompartemen.

- Satu Proker boleh memiliki beberapa Pengelola Proker.

- Pengelola Proker tidak boleh menunjuk pengelola lainnya.<br> front end.docx

## **C. Batasan akses**

| **Aktivitas** | **Pengelola Proker** | **Anggota Tim** |
| --- | --- | --- |
| Mengelola roster | Ya | Tidak |
| Mengelola tugas | Ya | Tidak |
| Menjadi PIC tugas | Ya | Tidak |
| Menginput progres | Ya | Tidak |
| Melihat informasi Proker | Ya | Ya |
| Melihat agenda relevan | Ya | Ya |
| Mengelola keuangan | Ya | Tidak |

Anggota Tim tetap Read-Only sesuai keputusan kita sebelumnya.

## **D. Satu keputusan yang perlu kita tetapkan**

**Apakah anggota boleh ditambahkan ke roster meskipun belum memiliki akun HIPMI CENTRAL?**

Keputusan 05.7.2 — Ditetapkan

**Penambahan anggota roster tanpa akun: Opsi A disetujui.**

Ketentuannya:

- Anggota boleh ditambahkan meskipun belum memiliki akun HIPMI CENTRAL.

- Data awal menggunakan nama lengkap, NIM, dan jabatan kepanitiaan.

- Jika anggota mendaftar kemudian, sistem mencocokkan data melalui NIM.

- Riwayat keikutsertaan Proker sebelumnya tetap dipertahankan.

Catatan teknis: pencocokan NIM perlu disertai verifikasi identitas sebelum akun dihubungkan ke data keanggotaan yang sudah ada.

## **05.7.3 — Tim dan Roster**

Fokus pembahasan: mengatur anggota, jabatan kepanitiaan, status keanggotaan, dan akses pengelolaan Proker.

Ada tiga prinsip dasar:

1. **Keanggotaan berbeda dari akses.** Tercatat sebagai anggota tidak otomatis menjadi Pengelola Proker.

1. Jabatan kepanitiaan seperti Ketua Pelaksana, Sekretaris, Bendahara, dan Divisi Acara tidak otomatis menentukan permission.

1. Satu orang boleh mengikuti beberapa Proker. Riwayat keikutsertaan tetap tersimpan meskipun sudah keluar.<br> web hipmi (1).docx

### **05.7.3.1 — Pencabutan akses Pengelola Proker**

Misalnya, seseorang sebelumnya menjadi Pengelola Proker, tetapi kemudian tidak lagi bertugas sebagai pengelola.

Bagaimana mekanismenya?

Rekomendasi: A

**A. Dua tindakan terpisah**

**1. Ubah menjadi Anggota**

- Akses pengelolaan dicabut.

- Tetap tercatat sebagai anggota tim.

- Riwayat keanggotaan tidak berubah menjadi berakhir.

**2. Keluarkan dari Tim**

- Akses pengelolaan berakhir.

- Status keanggotaan menjadi Ended.

- Riwayat keanggotaan tetap tersimpan.

**B. Satu tindakan pencabutan**

Pencabutan akses sekaligus mengakhiri keanggotaan dalam tim.

Menurutku A lebih tepat karena pencabutan jabatan pengelola tidak selalu berarti orang tersebut keluar dari kepanitiaan. Mekanisme ini juga sesuai rancangan roster sebelumnya.

web hipmi (1).docx

**Keputusan 05.7.3.1 — Pilih mekanisme**

SIAPPP! 🔥 Keputusan 05.7.3.1 kita tetapkan.

05.7.3.1 — Dikunci

**Pencabutan akses Pengelola Proker menggunakan dua tindakan terpisah:**

1. **Ubah menjadi Anggota:** akses pengelolaan dicabut, tetapi keanggotaan tetap aktif.

1. **Keluarkan dari Tim:** keanggotaan berakhir dan riwayat tetap tersimpan.

Kedua tindakan tidak menonaktifkan akun HIPMI CENTRAL atau status kader.

## **05.7.3.2 — Visibilitas Roster Anggota Tim**

Kita sudah menetapkan Anggota Tim memiliki akses Read-Only. Sekarang kita tentukan informasi roster yang boleh mereka lihat.

**Rekomendasiku mengikuti rancangan sebelumnya:**

**A. Anggota hanya melihat data dirinya sendiri**

Rekomendasi

- Melihat nama dan jabatan sendiri.

- Melihat status keanggotaan sendiri.

- Melihat riwayat keikutsertaan sendiri.

- Tidak dapat melihat detail roster anggota lainnya.

**B. Anggota dapat melihat seluruh roster**

- Dapat melihat daftar nama seluruh anggota.

- Dapat melihat jabatan dan status anggota.

- Tetap tidak dapat mengedit atau mengelola data.

Jika memilih A:

- Pengelola Proker dapat melihat seluruh roster.

- Kepala Kompartemen dapat melihat dan mengelola seluruh roster Proker bawahannya.

- Anggota Tim hanya melihat data keanggotaannya sendiri.

Ini juga sesuai rancangan akses roster sebelumnya.

analisis arsitektur.docx

**Keputusan 05.7.3.2**

SIAPPP! 🔥 Kita tetapkan keputusan 05.7.3.2.

05.7.3.2 — Dikunci

**Anggota Tim dapat melihat seluruh roster secara Read-Only.**

- Dapat melihat daftar anggota.

- Dapat melihat jabatan kepanitiaan.

- Dapat melihat status keanggotaan.

- Tidak dapat menambah, mengedit, atau mengeluarkan anggota.

- Pengelolaan roster tetap menjadi kewenangan Pengelola Proker dan Kepala Kompartemen.

Dengan ini, pembahasan **05.7.3 Tim dan Roster selesai.**

# **05.7.4 — Tugas & Progres**

Kita menggunakan satu menu dengan dua tab, supaya tidak terlalu banyak navigasi.

**TUGAS & PROGRES**

**Tugas**

Pembagian dan pemantauan pekerjaan.

**Progres**

Laporan perkembangan kegiatan.

## **A. Tab Tugas**

Pengelola Proker dapat:

- Membuat dan mengedit tugas.

- Menentukan PIC.

- Menentukan tenggat waktu.

- Menentukan prioritas.

- Memantau status pekerjaan.

**Aturan PIC yang sudah kita sepakati:**

- PIC hanya boleh berasal dari Pengelola Proker.

- Anggota Tim biasa tidak boleh menjadi PIC.

- Anggota Tim tetap Read-Only.

## **B. Tab Progres**

Setiap laporan progres berisi:

1. Tanggal laporan.

1. Aktivitas yang dilakukan.

1. Hasil yang dicapai.

1. Kendala.

1. Rencana tindak lanjut.

1. Dokumentasi atau lampiran.

Progres tidak menggunakan persentase manual 0–100%. Perkembangan dinilai berdasarkan tahapan, penyelesaian tugas, hasil pekerjaan, dan kendala.

front end.docx

## **C. Satu keputusan pertama**

Bagaimana status pengerjaan tugas?

Aku merekomendasikan empat status berikut sesuai rancangan sebelumnya.

**Status Tugas**

Rekomendasi

**To Do**

Belum dikerjakan

To Do

**In Progress**

Sedang dikerjakan

In Progress

**Blocked**

Terhambat

Blocked

**Done**

Selesai

Done

Apakah kita tetapkan empat status tersebut?

WAAAA SETUJU KITA KUNCI! 🔥

05.7.4.1 — Status Tugas Dikunci

Empat status resmi tugas:

| **Status** | **Keterangan** |
| --- | --- |
| To Do | Belum dikerjakan |
| In Progress | Sedang dikerjakan |
| Blocked | Terhambat |
| Done | Selesai |

Tidak menambahkan status lain agar pengelolaan tetap sederhana.

NAHHH, SEKARANG AKU PAHAMM! 😭🔥 Justru konsep ini lebih sederhana dan cocok karena satu Proker bisa memiliki beberapa Pengelola Proker.

Kita revisi dan kunci konsep 05.7.4 sesuai arahanmu.

05.7.4 — Tugas & Progres Dikunci

**Tugas menjadi papan catatan pekerjaan bersama untuk seluruh Pengelola Proker.**

- Tidak ada PIC atau penanggung jawab individual.

- Semua Pengelola Proker dapat melihat dan mengelola daftar tugas yang sama.

- Tugas berfungsi sebagai pengingat pekerjaan agar tidak terlupakan.

- Tidak digunakan sebagai sistem penilaian pekerjaan individu.

- Anggota Tim biasa tetap Read-Only dan tidak mengakses pengelolaan tugas.

## **Tampilan Tugas — Kanban Board**

Konsepnya seperti papan Trello: tugas dipindahkan dengan drag-and-drop antarkolom.

**Papan Tugas Proker**

Catatan bersama Pengelola Proker

Kanban

**To Do**

2

Menyusun proposal

Menyiapkan rundown

**In Progress**

1

Menghubungi sponsor

**Blocked**

1

Menunggu konfirmasi venue

**Done**

1

Membuat desain poster

Ilustrasi empat kolom. Bukan papan interaktif final.

**Aturan penggunaannya:**

1. Pengelola Proker dapat menambahkan catatan tugas.

1. Semua Pengelola Proker dapat memindahkan tugas antarkolom.

1. Tugas dapat diedit atau dihapus oleh Pengelola Proker.

1. Tugas yang selesai dipindahkan ke Done.

1. Riwayat perubahan status tetap tersimpan.

Tab Progres tetap terpisah untuk laporan perkembangan kegiatan, hasil, kendala, dan tindak lanjut.

# **05.7.5 — Kalender & Agenda**

Kita tetap menggunakan keputusan sebelumnya:

- Satu kalender terpadu untuk seluruh kabinet.

- Semua agenda dibuat melalui Organization Management → Agenda & Kalender.

- Workspace Proker hanya menampilkan agenda yang berkaitan dengan Proker tersebut.

- Satu Proker boleh memiliki beberapa Agenda/Event.

- Setiap agenda memiliki pengaturan publikasi dan ticketing masing-masing.

## **A. Struktur halaman**

**KALENDER & AGENDA**

**Agenda Proker**

Program Kerja

Agenda Proker

Internal

Publik

**Agenda Mendatang**

**Rapat Persiapan**

20 November 2026

Internal

**Seminar Kewirausahaan**

25 November 2026

Publik

**Evaluasi Kegiatan**

28 November 2026

Internal

Kalender terintegrasi dengan Agenda & Kalender organisasi.

Ilustrasi tampilan, bukan jadwal aktual.

Fitur yang ditampilkan:

1. Kalender persiapan.

1. Jadwal rapat.

1. Timeline internal.

1. Main Event.

1. Tenggat tugas jika digunakan.

1. Agenda dan Event.

1. Pleno dan rapat.

Fitur ticketing juga tersedia pada detail agenda yang bersangkutan, termasuk jenis tiket, harga, kuota, QRIS, peserta, verifikasi pembayaran, dan check-in barcode.

front end.docx

## **B. Satu keputusan**

Bagaimana cara Pengelola Proker membuat agenda dari Workspace Proker?

SIAPPP! 🔥 Kita tetapkan keputusan 05.7.5.

05.7.5 — Kalender & Agenda Dikunci

- Tersedia tombol **Buat Agenda** di Workspace Proker.

- Pengguna diarahkan ke Agenda & Kalender utama.

- Proker otomatis terpilih.

- Agenda yang dibuat otomatis terhubung dengan Workspace Proker terkait.

- Tidak membuat kalender terpisah.

# **05.7.6 — Persuratan**

Kita pertahankan alur yang sudah disepakati sebelumnya.

## **A. Struktur halaman**

**PERSURATAN PROKER**

**Ajukan Surat**

Membuat pengajuan surat atau proposal

**Daftar Pengajuan**

Melihat seluruh pengajuan Proker

**Tracking Ditmawa**

Memantau perkembangan pengajuan Ditmawa

## **B. Business Flow**

1. Pengelola Proker memilih Ajukan Surat.

1. Memilih jenis pengajuan: Surat Umum atau Untuk Ditmawa.

1. Mengisi judul, keperluan, dan melampirkan tautan dokumen.

1. Pengajuan masuk ke Central Inbox Sekum.

1. Sekum memeriksa dan menyetujui proses administrasi atau meminta revisi.

1. Jika revisi, Pengelola memperbaiki pengajuan yang sama.

1. Pengelola dapat melihat status, catatan, dokumen final, dan riwayat pengajuan.

## **C. Status pengajuan**

Kita bedakan dua status agar tidak membingungkan.

**Status administrasi internal**

| **Status** | **Keterangan** |
| --- | --- |
| Draft | Belum diajukan |
| Menunggu Pemeriksaan | Menunggu Sekum |
| Perlu Revisi | Perlu diperbaiki |
| Diproses | Ditangani Sekum |
| Completed | Administrasi internal selesai |

**Tracking Ditmawa**

| **Status** | **Keterangan** |
| --- | --- |
| Belum Dikirim | Belum dikirim |
| Sudah Dikirim | Pengiriman tercatat |
| Menunggu Respons | Menunggu tanggapan |
| Perlu Tindak Lanjut | Ada tindak lanjut |
| Selesai | Proses Ditmawa selesai |

Keduanya terpisah. Surat bisa sudah Completed secara internal, tetapi masih Menunggu Respons dari Ditmawa.

front end.docx

## **D. Hak akses**

- Pengelola Proker: membuat, mengajukan, merevisi, dan memantau surat.

- Kepala Kompartemen: memonitor pengajuan Proker bawahannya.

- Sekum: memeriksa, memproses, menyelesaikan, dan melakukan Reopen.

- Anggota Tim: tidak memiliki akses pengelolaan persuratan.

Tidak ada approval tambahan Kepala Kompartemen sebelum pengajuan dikirim ke Sekum.

front end.docx

05.7.6 — Persuratan Dikunci

Seluruh alur ini sudah sesuai keputusan sebelumnya. Tidak perlu menambah lapisan persetujuan baru.

# **05.7.7 — Keuangan**

Berikutnya kita bahas Keuangan Proker.

Kita sudah punya satu keputusan khusus:

- Pengelola Proker boleh langsung mencatat pemasukan dan pengeluaran beserta bukti transaksi.

- Tidak memerlukan persetujuan Bendum untuk pencatatan tersebut.

- Bendum tetap dapat memonitor.

- Pengajuan dana dan pencairan tetap melalui Bendum.

## **A. Struktur halaman**

**KEUANGAN PROKER**

**Ringkasan Keuangan**

Saldo dan ringkasan transaksi

**Pengajuan Dana**

Pengajuan kebutuhan dana kepada Bendum

**Transaksi**

Pemasukan dan pengeluaran beserta bukti

**Laporan Keuangan**

Rekap dan riwayat keuangan

## **B. Satu keputusan**

Untuk transaksi pemasukan dan pengeluaran yang dicatat Pengelola Proker, apakah kita gunakan mekanisme berikut?

GASSS! 🔥 Kita tetapkan keputusan 05.7.7.

05.7.7 — Keuangan Dikunci

- Pengelola Proker mencatat pemasukan dan pengeluaran.

- Transaksi langsung tersimpan tanpa persetujuan Bendum.

- Wajib mencantumkan nominal, keterangan, dan bukti transaksi.

- Bendum tetap dapat memonitor seluruh transaksi.

- Pengajuan dan pencairan dana tetap melalui Bendum.

- Pendapatan tiket dipisahkan dari dana pencairan Bendum.

# **05.7.8 — Dokumen & LPJ**

Ini menu terakhir Workspace Proker. Kita gunakan konsep yang sudah ada dalam rancangan sebelumnya: **LPJ semiotomatis**, supaya Pengelola Proker tidak perlu memasukkan ulang data yang sudah tersedia.

## **A. Dokumen Proker**

**DOKUMEN & LPJ**

**Proposal**

Proposal kegiatan dan pengajuan

**Surat**

Surat pengajuan dan dokumen final

**Rundown**

Susunan acara dan jadwal kegiatan

**Dokumentasi**

Foto dan dokumentasi kegiatan

**Bukti Transaksi**

Bukti pemasukan dan pengeluaran

**Laporan & LPJ**

Laporan kegiatan dan pertanggungjawaban

## **B. LPJ Semiotomatis**

Konsep rancangan sebelumnya

**Data yang dikumpulkan otomatis oleh sistem:**

- Informasi Proker.

- Riwayat progres.

- Agenda dan kegiatan.

- Jumlah peserta dan kehadiran.

- Pemasukan dan pengeluaran.

**Data yang dilengkapi Pengelola Proker:**

- Narasi laporan kegiatan.

- Hasil dan evaluasi kegiatan.

- Dokumentasi.

- File LPJ final.

Dengan demikian, LPJ tidak mengharuskan Pengelola menginput ulang informasi yang sudah tercatat di menu lain.

front end.docx

## **C. Business Flow**

1. Pengelola Proker membuka Dokumen & LPJ.

1. Memilih dokumen yang ingin diunggah atau dilihat.

1. Ketika menyusun LPJ, sistem mengumpulkan data Proker secara otomatis.

1. Pengelola melengkapi narasi, evaluasi, dan dokumentasi.

1. Pengelola mengunggah LPJ final.

1. Kepala Kompartemen dapat melihat dan memonitor LPJ.

## **D. Hak akses**

| **Pengguna** | **Akses** |
| --- | --- |
| Pengelola Proker | Mengelola dokumen dan LPJ |
| Kepala Kompartemen | Melihat dan memonitor |
| Anggota Tim | Read-Only |
| Top Management | Monitoring sesuai kewenangan |

05.7.8 — Rancangan Dokumen & LPJ

**Dengan ini, seluruh tujuh menu utama Workspace Proker sudah kita bahas.**

05.7 — WORKSPACE PROKER SELESAI

1. Overview

1. Tim Pelaksana

1. Tugas & Progres

1. Kalender & Agenda

1. Persuratan

1. Keuangan

1. Dokumen & LPJ

## **05.8.1 — Authentication & Cabinet Center**

Sesuai rancangan Word sebelumnya

### **A. Alur masuk Admin Panel**

Alur yang kita pertahankan:

**Admin Login**

Menggunakan akun HIPMI CENTRAL

Tanpa Sidebar

**CABINET CENTER**

Halaman pemilihan dan pengelolaan kabinet

**Pilih Kabinet Aktif**

Admin memilih kabinet yang akan dikelola

Sidebar Aktif

**CABINET DASHBOARD**

Dashboard administrasi kabinet terpilih

Jadi, Admin tidak langsung masuk ke Dashboard setelah login. Admin harus memilih kabinet terlebih dahulu.

front end.docx

### **B. Desain Cabinet Center**

Aku menyarankan tampilan berbentuk card agar mudah membedakan kabinet.

# **Cabinet Center**

Kelola seluruh kabinet HIPMI CENTRAL

Admin

**Kabinet 2026–2027**

Active

Periode 2026–2027

Buka Kabinet

**Kabinet 2025–2026**

Archived

Periode 2025–2026

Kabinet arsip

Tambah KabinetIlustrasi struktur UI, bukan kabinet aktual.

Informasi yang ditampilkan:

- Identitas kabinet.

- Nama dan periode kabinet.

- Status Active atau Archived.

- Tombol membuka kabinet.

- Tombol tambah kabinet.

Kabinet aktif menjadi pilihan untuk pengelolaan operasional. Kabinet arsip tetap dapat dilihat melalui pengelolaan arsip.

front end.docx

## **C. Apakah kader/pengurus boleh mengakses Admin Panel?**

Nah, ini bagian yang perlu kita luruskan.

Bisa, dengan pemberian Role khusus

**Satu akun boleh memiliki dua jenis kewenangan sekaligus.**

Contohnya:

**Andi**

- Status: Kader HIPMI.

- Jabatan: Kepala Bidang.

- Role tambahan: Admin Sistem.

Maka Andi memiliki:

- Organization Management berdasarkan jabatan Kepala Bidang.

- Admin Panel berdasarkan Role Admin Sistem.

Tetapi perlu dibedakan:

| **Kondisi pengguna** | **Akses Admin Panel** |
| --- | --- |
| Kader biasa | Tidak otomatis |
| Staff | Tidak otomatis |
| Kepala Bidang | Tidak otomatis |
| Ketua Umum | Tidak otomatis |
| Kader yang diberi Role Admin Sistem | Ya |
| Pengurus yang diberi Role Admin Sistem | Ya |

Hal ini memang sesuai dokumen: Admin Sistem merupakan Role terpisah dari jabatan organisasi, diberikan melalui penugasan Role system\_admin dengan cakupan global. Admin juga boleh mempunyai jabatan organisasi, tetapi akses organisasi harus berasal dari penugasan tersendiri.

web hipmi(2).docx

front end.docx

### **D. Flow pemberian akses Admin Sistem**

1. Pengguna sudah memiliki akun HIPMI CENTRAL.

1. Pihak yang memiliki kewenangan memberikan Role Admin Sistem.

1. Sistem memeriksa kewenangan pemberi Role.

1. Role system\_admin diberikan dan dicatat.

1. Permission Admin berlaku secara global.

1. Pengguna mendapatkan akses Admin Panel.

1. Saat masuk Admin Panel, pengguna diarahkan ke Cabinet Center.

Catatan penting:

- Admin Sistem tidak otomatis menjadi Ketua Umum atau pengurus.

- Pengurus yang menjadi Admin Sistem tidak otomatis memperoleh kewenangan menyetujui surat sebagai Sekum atau mencairkan dana sebagai Bendum.

- Pemberian akses Admin Sistem harus terpisah dari penempatan jabatan struktural.

## **E. Keputusan yang perlu kita kunci**

Menurutku, aturan akses ini sebaiknya menjadi keputusan final:

**A. Admin Panel hanya dapat diakses oleh pengguna yang secara khusus mendapatkan Role Admin Sistem (**system\_admin**).**

Kader dan pengurus boleh mendapatkan Role tersebut, tetapi jabatan struktural saja tidak otomatis memberikan akses Admin Panel.

SIAPPP! 🔥 Kita tetapkan keputusan 05.8.1.

05.8.1 — Akses Admin Panel Dikunci

- Hanya pengguna dengan Role khusus system\_admin yang dapat mengakses Admin Panel.

- Kader maupun pengurus boleh diberikan Role tersebut.

- Jabatan struktural tidak otomatis memberikan akses Admin Panel.

- Role Admin Sistem terpisah dari Role organisasi.

- Admin Panel tetap menjadi area khusus administrasi sistem.

# **05.8.2 — Dashboard Admin Sistem**

Setelah Admin memilih kabinet di Cabinet Center, sistem membuka Dashboard kabinet yang dipilih dan menampilkan sidebar administrasi.

## **A. Isi Dashboard**

Berdasarkan Word acuan, terdapat empat bagian utama.

web hipmi (1).docx

**CABINET DASHBOARD**

# **Overview**

Kabinet 2026–2027

Active

**1. System Overview**

Total Users

# **—**

Active Users

# **—**

Inactive Users

# **—**

Total Cadres

# **—**

Pending Verification

# **—**

Active Cabinet

# **—**

Archived Cabinets

# **—**

**2. Organization Overview**

Jumlah Bidang

**—**

Jumlah Kompartemen

**—**

Jabatan Terisi

**—**

Jabatan Kosong

**—**

**3. User Activity**

Aktivitas administratif terbaru:

- Registrasi pengguna.

- Perubahan status akun.

- Penambahan data kader.

- Verifikasi kader.

- Pengangkatan pengurus.

- Pencabutan Role.<br>**4. System Alerts**

Peringatan sistem:

- Akun bermasalah.

- Verifikasi belum selesai.

- Konflik data.

- Kegagalan proses administratif.

- Masalah konfigurasi sistem.<br>Mockup konseptual. Angka belum diisi karena bukan data aktual.

## **B. Struktur navigasi Dashboard**

Setelah memilih kabinet, sidebar muncul dengan dua kelompok utama.

**CABINET ADMINISTRATION**

**Overview**

**01. Pengelolaan Struktur & Akun**

Struktur Organisasi

Jabatan & Pengurus

Manajemen Pengguna

Manajemen Kader

**02. Pengelolaan Sistem & Akses**

Role & Permission

Konfigurasi Modul

Audit Log

Pengaturan Sistem

Struktur tersebut mengikuti pembagian menu yang sudah ditetapkan dalam dokumen acuan.

front end.docx

## **C. Satu keputusan yang perlu kita pastikan**

Ada satu hal yang perlu diperjelas karena Dashboard ini dibuka setelah memilih kabinet.

Data System Overview seperti Total Users, Total Cadres, dan Archived Cabinets bersifat keseluruhan platform. Sementara Organization Overview berkaitan dengan kabinet yang dipilih.

MANTAPPP! 🔥 Kita tetapkan keputusan 05.8.2.

05.8.2 — Dashboard Admin Dikunci

**Dashboard menggunakan dua cakupan data.**

- **System Overview:** data seluruh HIPMI CENTRAL.

- **Organization Overview:** hanya kabinet yang sedang dipilih.

- **User Activity:** aktivitas administratif seluruh sistem.

- **System Alerts:** peringatan administratif seluruh sistem.

Catatan konsistensi: keputusan ini menjadi pembaruan terhadap front end.docx sebelumnya yang menggunakan cakupan kabinet untuk seluruh Dashboard. Keputusan terbaru kita yang berlaku.

front end.docx

# **05.8.3 — Struktur Organisasi**

Kita lanjut sesuai urutan navigasi Admin Panel yang sudah dirancang.

## **A. Hierarki pengelolaan**

**Kabinet Aktif**

**Bidang**

**Kompartemen**

**Jabatan**

**Penempatan Pengurus**

## **B. Struktur UI**

Rekomendasiku menggunakan satu halaman dengan tiga tab.

**Struktur Organisasi**

Kabinet Aktif

**Struktur**

**Jabatan**

**Penempatan**

**Struktur**

**Bidang External**

Aktif

**Partnership**

Kompartemen

Belum Diisi

**Media Komunikasi**

Kompartemen

Terisi

Ilustrasi hierarki organisasi, bukan data aktual.

Ketiga tab memiliki fungsi:

1. **Struktur:** tambah, edit, dan lihat Bidang serta Kompartemen.

1. **Jabatan:** mengelola daftar master jabatan.

1. **Penempatan:** menempatkan pengurus ke jabatan berdasarkan keputusan resmi organisasi.

## **C. Aturan yang sudah kita sepakati**

- Admin melakukan penempatan berdasarkan keputusan resmi, bukan menentukan pengangkatan.

- Satu pengguna maksimal memiliki satu jabatan struktural aktif dalam satu kabinet.

- Tidak boleh merangkap jabatan struktural.

- Pengelola Proker bukan jabatan struktural.

- Riwayat jabatan sebelumnya tetap dipertahankan.

- Struktur dapat diubah selama kabinet aktif.

front end.docx

## **D. Satu keputusan**

Bagaimana bentuk navigasi Struktur Organisasi?

SIAPPP! 🔥 Keputusan 05.8.3 kita tetapkan.

05.8.3 — Struktur Organisasi Dikunci

Admin Panel menggunakan **satu halaman dengan tiga tab**:

1. Struktur.

1. Jabatan.

1. Penempatan Pengurus.

Tidak perlu tiga halaman atau menu sidebar terpisah.

# **05.8.4 — Pengguna & Kader**

Sesuai dokumen acuan, modul ini menjadi pusat pengelolaan seluruh akun pengguna dan status keanggotaan kader HIPMI CENTRAL.

front end.docx

## **A. Struktur halaman**

Kita gunakan **satu halaman dengan dua tab**.

**PENGGUNA & KADER**

**Akun Pengguna**

Seluruh akun HIPMI CENTRAL

**Database Kader**

Data resmi keanggotaan kader

### **Tab 1 — Akun Pengguna**

Fitur:

- Daftar seluruh pengguna.

- Pencarian berdasarkan nama atau NIM.

- Filter Mahasiswa Biasa, Kader, Aktif, dan Nonaktif.

- Detail pengguna.

- Verifikasi dan pengelolaan status akun.

Detail pengguna memiliki empat kelompok informasi:

1. Identitas.

1. Keanggotaan.

1. Organisasi.

1. Aktivitas.

### **Tab 2 — Database Kader**

Admin dapat menambahkan data kader dengan formulir sederhana:

| **Informasi** | **Isian** |
| --- | --- |
| NIM | Input |
| Nama lengkap | Input |
| Tingkat kader | Kader 1, 2, 3 |
| Tanggal resmi menjadi kader | Tanggal |
| Status keanggotaan | Aktif/Nonaktif |
| Status verifikasi | Terverifikasi/Belum |

front end.docx

## **B. Flow Jadikan Akun Kader**

Ini tetap mengikuti keputusan kita sebelumnya.

**Detail Akun Pengguna**

**Andi Pratama**

NIM: 220101001

Mahasiswa Biasa

**NIM ditemukan dalam Database Kader**

Tingkat Kader: Kader 2 · Terverifikasi

**Jadikan Akun Kader**

Ilustrasi tampilan.

Alurnya:

1. Sistem mencocokkan NIM akun dengan Database Kader.

1. Jika ditemukan, informasi kader ditampilkan.

1. Admin memeriksa kecocokan identitas.

1. Admin menekan **Jadikan Akun Kader**.

1. Sistem meminta konfirmasi.

1. Akun mendapatkan status Kader dan akses Dashboard Kader.

Jika NIM tidak ditemukan, tombol tersebut tidak muncul. Admin dapat memeriksa dan menambahkan data kader terlebih dahulu.

## **C. Detail Kader & Riwayat**

Kita gunakan tiga tab:

## **Detail Kader**

**Profil**

**Keanggotaan**

**Riwayat**

**Riwayat yang ditampilkan:**

- Keikutsertaan Proker.

- Jabatan dalam Proker.

- Riwayat jabatan organisasi.

- Pendaftaran agenda.

- Kehadiran.

- Aktivitas lainnya.<br>Riwayat diambil otomatis dari aktivitas yang tercatat, bukan diinput manual.

## **D. Aturan status akun**

Ini sudah kita tetapkan sebelumnya dan tidak perlu dibahas ulang.

- Akun tidak boleh dihapus permanen.

- Akun hanya dapat diaktifkan atau dinonaktifkan.

- Riwayat organisasi tetap tersimpan.

- Menonaktifkan akun berbeda dengan menonaktifkan keanggotaan kader.

- Mengakhiri jabatan tidak berarti menonaktifkan akun.

front end.docx

## **E. Satu keputusan tambahan**

Ada satu hal yang perlu kita pastikan: siapa yang boleh mengelola Database Kader?

Dokumen sebelumnya menyebutkan bahwa pengelolaan database kader yang lebih luas juga dapat diberikan kepada pengguna dengan Permission PSDM.

SIAPPP! 🔥 Keputusan 05.8.4.1 kita tetapkan.

05.8.4.1 — Database Kader Dikunci

- Admin Sistem mengelola Database Kader melalui Admin Panel.

- Pengurus PSDM dengan Permission khusus dapat mengelolanya melalui Organization Management.

- Keduanya menggunakan Database Kader yang sama.

- Permission PSDM tidak otomatis memberikan akses Admin Panel.

# **05.8.5 — Role & Permission**

Kita lanjut ke pengaturan hak akses pengguna dalam HIPMI CENTRAL.

## **A. Struktur halaman Akses & Permission**

Kita gunakan **satu halaman dengan dua tab utama**, sesuai Word acuan.

front end.docx

**AKSES & PERMISSION**

**Template Role**

Permission dasar setiap Role

**Permission Khusus**

Permission tambahan pengguna

### **Tab 1 — Template Role**

Daftar Role yang tersedia:

| **Role** | **Pengaturan** |
| --- | --- |
| Top Management | Template akses |
| Sekum | Template akses |
| Bendum | Template akses |
| Kepala Bidang | Template akses |
| Kepala Kompartemen | Template akses |
| Staff | Template fleksibel |
| Kader | Template akses |
| Mahasiswa Biasa | Template akses |
| Admin Sistem | Template akses |

Pengelola Proker tidak dibuat sebagai Role baru. Aksesnya berasal dari penugasan Kepala Kompartemen.

### **Tab 2 — Permission Khusus**

Admin dapat memberikan Permission tambahan kepada pengguna tertentu, misalnya:

- Content Creator.

- Publisher.

- Pengelolaan Database Kader.

- Pengelolaan konten tertentu.

Satu pengurus boleh memiliki beberapa Permission sekaligus.

## **B. Scope Permission**

Setiap Permission memiliki lingkup akses agar tidak melebar ke seluruh organisasi.

| **Scope** | **Cakupan** |
| --- | --- |
| Global | Seluruh sistem |
| Kabinet | Satu kabinet |
| Bidang | Satu Bidang |
| Kompartemen | Satu Kompartemen |
| Program Kerja | Satu Proker |
| Own | Data milik sendiri |
| Published | Konten yang sudah dipublikasikan |

front end.docx

## **C. Alur pemberian Permission**

**Jabatan struktural**

1. Pengguna mendapatkan jabatan resmi.

1. Sistem mengenali Role.

1. Permission dasar diterapkan otomatis sesuai template dan scope.

1. Sidebar dan tindakan menyesuaikan hak akses.

**Permission tambahan**

1. Admin mencari pengguna.

1. Memilih Permission tambahan.

1. Menentukan scope.

1. Menyimpan perubahan.

1. Permission langsung berlaku.

## **D. Keputusan sebelumnya yang tetap berlaku**

- Staff tetap satu Role dengan template fleksibel berdasarkan penempatan.

- Kepala Kompartemen tidak dapat mengubah Permission Staff.

- Hanya Admin yang mengatur Permission tambahan.

- Tidak ada fitur pengajuan Permission.

- Perubahan langsung berlaku setelah Admin menyimpan.

- Pencabutan Permission tidak menghapus riwayat aktivitas.

- Admin Sistem tidak otomatis menjadi operator seluruh modul organisasi.

05.8.5 — Akses & Permission Dikunci

# **05.8.6 — Pengaturan & Aktivitas**

Ini adalah menu terakhir Admin Panel menurut Word acuan. Kita gunakan tiga tab saja.

**PENGATURAN & AKTIVITAS**

**Pengaturan Kabinet**

Nama, logo, periode, dan status kabinet.

**Konfigurasi Sistem**

Pengaturan dan aktivasi modul.

**Audit Aktivitas**

Riwayat tindakan dan perubahan sistem.

front end.docx

## **05.8.6.1 — Pengaturan Kabinet**

Admin dapat mengatur:

- Nama kabinet.

- Logo kabinet.

- Periode kabinet.

- Status kabinet.

Keputusan sebelumnya tetap berlaku:

- Kabinet baru otomatis Draft.

- Admin dapat mengaktifkan kabinet setelah siap.

- Kabinet lama diarsipkan sebelum kabinet baru diaktifkan.

- Pengarsipan menampilkan peringatan dan pekerjaan yang belum selesai.

**Satu keputusan:**

Jika Admin mengubah nama atau logo kabinet aktif, apakah perubahan langsung tampil di Public Website?

SIAPPP! 🔥 Keputusan 05.8.6.1 kita tetapkan.

05.8.6.1 — Pengaturan Kabinet Dikunci

- Nama kabinet langsung diperbarui setelah disimpan.

- Logo kabinet langsung diperbarui.

- Perubahan berlaku di seluruh tampilan terkait.

- Tidak membutuhkan persetujuan Publisher.

# **05.8.6.2 — Konfigurasi Sistem**

Sesuai Word acuan, bagian ini digunakan untuk mengaktifkan atau menonaktifkan modul pada masing-masing kabinet.

front end.docx

## **A. Struktur halaman**

**Konfigurasi Modul**

Kabinet yang sedang dipilih

**Agenda & Kalender**

Pengaturan status modul

Aktif / Nonaktif

**Persuratan**

Pengaturan status modul

Aktif / Nonaktif

**Keuangan**

Pengaturan status modul

Aktif / Nonaktif

**CMS & Publikasi**

Pengaturan status modul

Aktif / Nonaktif

**Media Partner**

Pengaturan status modul

Aktif / Nonaktif

**Kotak Suara**

Pengaturan status modul

Aktif / Nonaktif

Ilustrasi daftar konfigurasi, bukan status aktual modul.

## **B. Aturan sistem**

| **Kondisi** | **Perilaku sistem** |
| --- | --- |
| Modul Aktif | Muncul sesuai Permission |
| Modul Nonaktif | Hilang dari seluruh sidebar kabinet |
| Akses URL langsung | Ditolak jika modul nonaktif |
| Data sebelumnya | Tetap tersimpan |
| Riwayat sebelumnya | Tetap tersimpan |
| Diaktifkan kembali | Akses kembali sesuai Permission |

**Penting:** Konfigurasi berlaku per kabinet. Menonaktifkan Media Partner di Kabinet A tidak otomatis menonaktifkannya di Kabinet B.

## **C. Mekanisme pengaturan**

Rekomendasiku cukup menggunakan satu tombol Toggle Aktif/Nonaktif untuk setiap modul.

Tidak perlu pengaturan tambahan seperti konfigurasi fitur satu per satu, karena akan membuat Admin Panel terlalu rumit.

Rekomendasi A

**Satu Toggle per Modul**

- Admin memilih kabinet.

- Membuka Konfigurasi Sistem.

- Mengaktifkan atau menonaktifkan modul.

- Sistem langsung menerapkan perubahan.

- Perubahan tercatat dalam Audit Aktivitas.

## **D. Keputusan 05.8.6.2**

**Bagaimana konfigurasi modul dilakukan?**

## **Struktur CMS & Publikasi yang benar**

**CMS & PUBLIKASI**

Dikoreksi

**Overview CMS**

Ringkasan publikasi dan aktivitas

**Konten Website**

Banner, hero, dan konten beranda

**Berita & Artikel**

Pengelolaan artikel

**Karya Kader**

Bisnis dan prestasi kader

**Bisnis Kader**

**Prestasi Kader**

**Media Partner**

Pengajuan dan publikasi kerja sama

**Kotak Suara**

Aspirasi dan tindak lanjut

**Media Library**

Pengelolaan aset gambar dan media

## **Alur pengelolaan Karya Kader**

| **Bisnis Kader** | **Prestasi Kader** |
| --- | --- |
| Pengajuan bisnis | Pengajuan prestasi |
| Pemeriksaan informasi | Pemeriksaan prestasi |
| Revisi jika diperlukan | Revisi jika diperlukan |
| Persetujuan | Verifikasi |
| Publikasi | Publikasi |

Pengelolaan Prestasi Kader dilakukan oleh Kompartemen yang diberikan Permission khusus oleh Admin, bukan otomatis menjadi kewenangan satu Kompartemen tertentu.

front end.docx

## **Koreksi keputusan 05.8.6.2**

Opsi A ditetapkan

Konfigurasi tetap menggunakan satu Toggle Aktif/Nonaktif per modul.

Daftar modul yang perlu ditampilkan:

| **Modul** | **Konfigurasi** |
| --- | --- |
| Agenda & Kalender | Toggle |
| Persuratan | Toggle |
| Keuangan | Toggle |
| CMS & Publikasi (termasuk Karya Kader) | Toggle |
| Media Partner | Toggle |
| Kotak Suara | Toggle |

**Tidak perlu membuat Toggle Prestasi Kader tersendiri.** Pengaturan akses pengelolaannya tetap melalui Permission.

Jadi, kita tidak menambah modul baru. Kita hanya melengkapi struktur CMS yang sebelumnya belum tertulis lengkap dalam daftar konfigurasi.

## **05.8.6.3 — Audit Aktivitas**

Bagian ini sebenarnya sudah kita sepakati sebelumnya:

- Hanya Admin Sistem yang dapat melihat Audit Aktivitas administratif.

- Admin dapat mencari dan memfilter aktivitas.

- Setiap tindakan mencatat pelaku, aktivitas, objek yang terdampak, dan waktu.

- Catatan audit tidak dapat diedit atau dihapus.

05.8.6 — SELESAI

# **Final Cross-Check 05.1**

## **Integrasi Pengguna & Hak Akses**

Tujuannya memastikan alur dari seseorang mendaftar sampai memperoleh Dashboard sudah saling terhubung.

### **A. Alur utama**

**Registrasi Akun**

Nama, NIM, email, telepon, password

**Verifikasi Email**

Akun aktif setelah email diverifikasi

**Akun Mahasiswa Biasa**

Status awal seluruh pengguna baru

**Pencocokan Database Kader**

NIM dicocokkan dengan data kader

**Verifikasi Kader & Hubungan Akun**

Keduanya merupakan proses terpisah

**Penempatan Jabatan**

Berdasarkan keputusan resmi organisasi

**Role & Permission**

Mengikuti jabatan dan penugasan tambahan

**Dashboard Pengguna**

Menu mengikuti hak akses pengguna

Alur ini mengikuti rancangan User Management dan Onboarding dalam dokumen arsitektur.

analisis arsitektur.docx

### **B. Kondisi yang harus tetap benar**

| **Kondisi** | **Respons sistem** |
| --- | --- |
| NIM tidak ditemukan | Tetap Mahasiswa Biasa |
| NIM ditemukan | Tampilkan kecocokan Database Kader |
| Kader belum diverifikasi | Belum boleh diangkat |
| Akun belum diverifikasi email | Belum aktif |
| Akun dinonaktifkan | Akses operasional ditolak |
| Jabatan berakhir | Permission jabatan berakhir |
| Admin Sistem dicabut | Akses Admin Panel dicabut |

analisis arsitektur.docx

### **C. Integrasi tambahan yang sudah kita sepakati**

- Anggota roster Proker boleh belum mempunyai akun.

- Jika mendaftar kemudian, NIM dicocokkan.

- Identitas harus diverifikasi sebelum data keanggotaan dihubungkan.

- Riwayat Proker tetap dipertahankan.

- Satu akun dapat memiliki beberapa penugasan Workspace.

- Role system\_admin tetap terpisah dari jabatan struktural.

## **Keputusan pemeriksaan 05.1**

Rekomendasi: Pertahankan

Menurutku seluruh alur ini sudah konsisten dengan keputusan kita. Tidak perlu membuat fitur atau tahapan baru.

05.1 — LOLOS FINAL CROSS-CHECK

Integrasi Registrasi, Kader, Jabatan, Role, Permission, dan Dashboard dinyatakan konsisten.

Kita lanjut ke kelompok kedua. Tidak akan mengulang keputusan yang sudah dikunci.

# **Final Cross-Check 05.2**

## **Integrasi Kegiatan — Proker sampai LPJ**

Tujuan pemeriksaan ini adalah memastikan data yang dimasukkan sekali dapat digunakan oleh modul lain tanpa input ulang.

## **A. Alur utama kegiatan**

**Pembuatan Proker**

Kepala Kompartemen membuat Proker

**Penetapan Pengelola**

Kepala Kompartemen memberikan akses Pengelola Proker

**Tim & Task Board**

Roster dan catatan pekerjaan bersama

**Agenda & Event**

Dibuat melalui Agenda & Kalender utama

**Pendaftaran Peserta**

Publik dapat mendaftar tanpa login

**Pembayaran & Tiket**

QRIS, verifikasi, PDF dan barcode

**Check-in**

Scan barcode atau pencarian nama/NIM

**Keuangan & Dokumentasi**

Transaksi, bukti, dan dokumentasi kegiatan

**LPJ & Penutupan**

LPJ dilengkapi dan Proker ditutup Kepala Kompartemen

## **B. Pemeriksaan integrasi per bagian**

**1. Proker dan Task Board**

Keputusan terakhir kita tetap berlaku:

- Satu Proker dapat memiliki beberapa Pengelola.

- Task Board digunakan bersama oleh para Pengelola Proker.

- Tidak menggunakan PIC atau penanggung jawab individual.

- Pekerjaan ditampilkan dalam empat kolom.

To Do

Belum dikerjakan

In Progress

Sedang dikerjakan

Blocked

Terhambat

Done

Selesai

Pengelola dapat drag and drop pekerjaan antarstatus. Fungsinya sebagai catatan bersama agar pekerjaan tidak terlupakan, bukan sistem pembagian tugas personal.

**2. Agenda dan Ticketing**

Sudah terhubung dengan keputusan sebelumnya:

- Satu Proker dapat memiliki beberapa agenda.

- Agenda dibuat melalui Agenda & Kalender.

- Proker otomatis terpilih ketika membuat agenda dari Workspace.

- QRIS tersedia per agenda.

- Pendaftaran tidak harus login.

- Formulir berisi nama, NIM, nomor telepon, email, fakultas, dan program studi.

**3. Pembayaran dan tiket**

**Tiket berbayar**

1. Peserta memilih jenis tiket.

1. Kuota direservasi selama 3 menit.

1. Peserta mengunggah bukti pembayaran.

1. Jika bukti berhasil dikirim, status menjadi Pending Verification.

1. Kuota tetap ditahan sampai penyelenggara memutuskan, tanpa batas waktu verifikasi otomatis.

1. Penyelenggara menyetujui atau menolak pembayaran.

1. Jika disetujui, tiket PDF dengan barcode diterbitkan dan email dikirim.

**Tiket gratis**

- Tidak memerlukan QRIS.

- Tidak memerlukan verifikasi pembayaran.

- Tiket otomatis diterbitkan setelah registrasi berhasil.

analisis arsitektur.docx

analisis arsitektur.docx

**4. Check-in dan riwayat kader**

- Scan barcode menjadi metode utama.

- Pencarian nama atau NIM menjadi alternatif.

- Satu tiket hanya dapat digunakan untuk satu check-in sah.

- Kehadiran tercatat setelah check-in berhasil, bukan hanya karena peserta mendaftar.

- Riwayat kehadiran dapat dihubungkan dengan profil kader melalui identitas yang terverifikasi.

analisis arsitektur.docx

analisis arsitektur.docx

**5. Keuangan**

Ini bagian penting agar tidak terjadi penghitungan ganda.

| **Aktivitas** | **Penanggung jawab** |
| --- | --- |
| Pengajuan dana | Pengelola Proker |
| Persetujuan dan pencairan | Bendum |
| Pencatatan pemasukan/pengeluaran Proker | Pengelola Proker |
| Verifikasi pembayaran tiket | Penyelenggara |
| Monitoring pendapatan tiket | Bendum |

Pendapatan tiket yang sudah tercatat dari transaksi ticketing tidak boleh dimasukkan ulang sebagai pemasukan manual. Pencairan dana Bendum juga bukan pendapatan baru Proker.

analisis arsitektur.docx

analisis arsitektur.docx

**6. Dokumen dan LPJ**

Sistem mengambil data yang sudah tersedia:

- Identitas Proker.

- Agenda dan pelaksanaan.

- Peserta dan kehadiran.

- Anggaran, pemasukan, dan pengeluaran.

- Dokumen dan dokumentasi.

Pengelola melengkapi narasi, evaluasi, dan kesimpulan. Kepala Kompartemen menjadi satu-satunya pihak yang berwenang menutup Proker. Data historis tetap dipertahankan setelah penutupan.

analisis arsitektur.docx

analisis arsitektur.docx

## **C. Hasil cross-check**

Integrasi utama konsisten

| **Bagian** | **Hasil** |
| --- | --- |
| Proker → Tim | Sesuai |
| Proker → Task Board | Sesuai keputusan terbaru |
| Proker → Agenda | Sesuai |
| Agenda → Ticketing | Sesuai |
| Ticketing → Check-in | Sesuai |
| Ticketing → Keuangan | Sesuai |
| Keuangan → LPJ | Sesuai |
| LPJ → Penutupan Proker | Sesuai |

## **D. Kebijakan pendaftaran ganda**

Bagaimana jika seseorang menggunakan NIM yang sama untuk mendaftar dua kali pada satu agenda?

Rekomendasiku:

**A. Satu NIM hanya boleh memiliki satu registrasi aktif dalam satu agenda**, meskipun agenda tersebut mempunyai beberapa jenis tiket.

Setiap peserta yang ingin mendapatkan tiket harus mengisi identitasnya sendiri. Satu transaksi tetap hanya untuk satu tiket.

**B. Satu NIM boleh memiliki satu registrasi aktif untuk setiap jenis tiket.**

Contohnya, seseorang bisa mendaftar tiket Regular dan VIP pada agenda yang sama.

Menurutku A lebih sederhana, mencegah data peserta ganda, dan memudahkan check-in serta laporan kehadiran.

MANTAPPP! ❤️ Keputusan **05.2 — Pendaftaran Ganda** kita tetapkan:

DISETUJUI

**Satu NIM hanya boleh memiliki satu registrasi aktif dalam satu agenda**, meskipun agenda menyediakan beberapa jenis tiket.

Artinya:

- NIM yang sama tidak bisa mendaftar tiket Regular dan VIP sekaligus.

- Registrasi yang sudah tidak aktif mengikuti ketentuan pembatalan yang berlaku.

- Satu transaksi tetap hanya untuk satu tiket.

- Sistem mencegah registrasi ganda sebelum pembayaran atau penerbitan tiket.

05.2 — LOLOS FINAL CROSS-CHECK

**Integrasi Kegiatan**

Proker → Tim → Task Board → Agenda → Ticketing → Check-in → Keuangan → LPJ → Penutupan.

# **Final Cross-Check 05.3**

## **Integrasi Administrasi, CMS & Monitoring**

Kita periksa apakah seluruh aktivitas administrasi dan publikasi sudah terhubung.

### **A. Persuratan**

**Alur persuratan**

1. Staff/Pengelola dengan Permission mengajukan surat dari Workspace.

1. Sekum menerima pengajuan melalui Central Inbox.

1. Jika perlu revisi, pengajuan dikembalikan dengan catatan.

1. Pemohon memperbaiki pengajuan yang sama dan mengirim ulang.

1. Sekum memproses surat, termasuk administrasi dan penomoran.

1. Jika ditujukan ke Ditmawa, status tindak lanjut dipantau terpisah.

1. Surat selesai disimpan dalam arsip.

analisis arsitektur.docx

### **B. Keuangan**

**Alur keuangan**

1. Unit mengajukan dana.

1. Bendum memeriksa dan menyetujui atau menolak.

1. Jika revisi, pemohon memperbaiki pengajuan yang sama.

1. Bendum melakukan pencairan.

1. Unit mencatat penerimaan dan pengeluaran.

1. Transaksi masuk ke laporan dan monitoring organisasi.

Batas kewenangan tetap:

- Bendum mengelola dan memantau keuangan.

- Sekum mengelola persuratan.

- Admin Sistem mengelola konfigurasi sistem.

- Top Management memonitor tanpa otomatis mengambil alih tugas operasional.

analisis arsitektur.docx

analisis arsitektur.docx

### **C. CMS dan publikasi**

Ini penting karena kita sebelumnya juga membahas Prestasi Kader.

| **Konten** | **Alur** |
| --- | --- |
| Berita & Artikel | Content Creator → Publisher → Publikasi |
| Prestasi Kader | Pengajuan → Verifikasi → Publikasi |
| Bisnis Kader | Pengajuan → Pemeriksaan → Publikasi |
| Media Partner | Pengajuan → Pemeriksaan → Revisi bila perlu → Publikasi |
| Kotak Suara | Pengajuan → Pengelola menerima → Tindak lanjut privat |

Beberapa aturan yang sudah kita sepakati:

- Pengurus dengan Permission Content Creator dan Publisher boleh memublikasikan kontennya sendiri.

- Artikel boleh diedit langsung sebelum publikasi.

- Pengajuan Bisnis Kader dan Prestasi Kader boleh dilakukan tanpa login.

- Prestasi Kader yang sudah Published masuk ke halaman Karya Kader dan konten beranda.

- Revisi Media Partner menggunakan kode pengajuan yang sama.

- Kotak Suara tidak ditampilkan kepada publik. Identitas pengirim berupa nama, NIM, dan nomor telepon digunakan untuk tindak lanjut melalui WhatsApp, dengan keterangan perlindungan data.

analisis arsitektur.docx

### **D. Monitoring dan laporan**

Seluruh data ditampilkan berdasarkan sumber modul masing-masing.

| **Pengguna** | **Fokus monitoring** |
| --- | --- |
| Ketua Umum, Waketum, Sekjen | Organisasi secara keseluruhan |
| Kepala Bidang | Bidang dan turunannya |
| Kepala Kompartemen | Kompartemen dan Proker |
| Sekum | Persuratan |
| Bendum | Keuangan |
| Admin Sistem | Konfigurasi dan administrasi sistem |

Laporan organisasi dapat diunduh dalam PDF dan Excel sesuai keputusan sebelumnya.

analisis arsitektur.docx

## **E. Hasil pemeriksaan 05.3**

Konsisten dengan keputusan sebelumnya

| **Integrasi** | **Hasil** |
| --- | --- |
| Workspace → Persuratan | Sesuai |
| Persuratan → Ditmawa | Sesuai |
| Workspace → Keuangan | Sesuai |
| Keuangan → Monitoring | Sesuai |
| CMS → Publikasi | Sesuai |
| Prestasi Kader → Beranda | Sesuai |
| Medpart → Keuangan & Publikasi | Sesuai |
| Kotak Suara → Tindak Lanjut | Sesuai |
| Organisasi → Laporan | Sesuai |

**Rekomendasiku:** Tidak perlu menambahkan modul baru. Kita cukup mempertahankan seluruh alur dan batas Permission yang sudah ditetapkan.

### **Keputusan pemeriksaan**

Apakah integrasi 05.3 ini kita nyatakan LOLOS?

GASSS! 🔥 Kita lanjut ke pemeriksaan terakhir Tahap 05.

05.3 — LOLOS FINAL CROSS-CHECK

Integrasi Persuratan, Keuangan, CMS, Publikasi, dan Monitoring dinyatakan konsisten.

# **Final Cross-Check 05.4**

## **Integrasi Sistem & Audit**

Kita pastikan seluruh modul bekerja sebagai satu sistem, bukan fitur yang berdiri sendiri.

### **A. Satu sistem identitas dan Permission**

Semua area menggunakan identitas dan sumber Permission yang sama:

- Public Website.

- Personal Area.

- Organization Management.

- Workspace Kompartemen dan Proker.

- Admin Panel.

Setiap tindakan harus memeriksa status akun, Role, penempatan, Permission, dan scope akses.

analisis arsitektur.docx

analisis arsitektur.docx

### **B. Notifikasi dan Approval Center**

**Notification Center**

Notifikasi otomatis ketika:

- Ada pengajuan surat atau revisi.

- Dana disetujui atau dicairkan.

- Pembayaran tiket menunggu verifikasi.

- Tiket berhasil dikirim.

- Pengajuan Media Partner masuk.

- Ada Kotak Suara baru untuk pengelola.

**Approval Center**

Menampilkan pekerjaan yang membutuhkan tindakan:

- Sekum → Persuratan.

- Bendum → Pengajuan dana.

- Penyelenggara → Verifikasi pembayaran tiket.

- Pengelola bisnis → Pengajuan bisnis.

- Media Komunikasi → Media Partner.

Keduanya tidak memberikan Permission baru. Jika Permission dicabut, notifikasi lama tidak boleh membuka data yang sudah tidak berhak diakses.

analisis arsitektur.docx

analisis arsitektur.docx

### **C. Audit Aktivitas**

Keputusan sebelumnya tetap berlaku:

Keputusan dikunci

**Hanya Admin Sistem yang dapat melihat Audit Log administratif sistem.**

Pemisahannya:

- Activity History: riwayat aktivitas yang relevan dengan pengguna atau unit.

- Audit Log: rekaman administratif sistem yang hanya dapat dilihat Admin Sistem.

Audit mencatat pelaku, waktu, tindakan, objek, perubahan sebelum/sesudah jika relevan, dan alasan jika diwajibkan.

Audit tidak boleh diedit sembarangan. Koreksi dibuat sebagai catatan baru. Password, OTP, API key, dan token QR mentah tidak boleh direkam.

analisis arsitektur.docx

analisis arsitektur.docx

### **D. Penanganan kegagalan sistem**

Contoh: pembayaran tiket sudah disetujui, tetapi layanan email mengalami gangguan.

| **Komponen** | **Status** |
| --- | --- |
| Pembayaran | Approved |
| Tiket | Issued |
| Email | Failed / Queued |
| Pengiriman ulang | Dapat dilakukan |
| Penerbitan tiket baru | Tidak dilakukan |

Contoh lain: Bendum berhasil mencatat pencairan, tetapi Dashboard gagal memuat data. Transaksi tetap tersimpan dan tidak boleh terjadi pencairan ulang.

Sistem juga mencegah tindakan ganda seperti pembayaran dua kali, check-in dua kali, atau persetujuan berulang.

analisis arsitektur.docx

### **E. Privasi dan akses**

- Global Search hanya menampilkan data sesuai Permission.

- Export tidak boleh memuat data melebihi hak akses pengguna.

- Data peserta dan bukti pembayaran tidak boleh terbuka untuk umum.

- Kotak Suara tetap privat.

- Jika tidak memiliki akses, tampilkan halaman 403.

- Jika layanan terganggu, tampilkan pesan error dan tombol coba lagi.

- Jika satu widget gagal, widget lain yang berhasil tetap dapat ditampilkan.

analisis arsitektur.docx

analisis arsitektur.docx

## **Hasil Final Cross-Check 05.4**

| **Pemeriksaan** | **Hasil** |
| --- | --- |
| Identitas terpusat | Sesuai |
| Permission lintas modul | Sesuai |
| Notification Center | Sesuai |
| Approval Center | Sesuai |
| Audit administratif | Sesuai |
| Penanganan kegagalan | Sesuai |
| Pencegahan duplikasi | Sesuai |
| Privasi dan keamanan akses | Sesuai |

**Rekomendasiku: tidak perlu menambahkan modul atau fitur baru.** Seluruh aturan integrasi sudah tercakup dalam rancangan dan keputusan kita.

## **Konfirmasi terakhir Tahap 05**

**Apakah Final Cross-Check 05.4 kita nyatakan LOLOS dan Tahap 05 — Business Flow resmi SELESAI?**

Kode

Pembahasan

06.1

Standar Struktur Halaman

06.2

Sitemap Enam Area Aplikasi

06.3

Master Screen Inventory (daftar seluruh halaman)

06.4

Subhalaman, Detail, Tab & Modal

06.5

Final Cross-Check Struktur Halaman

# **06.1 — Standar Struktur Halaman**

Sebelum membuat daftar halaman, kita sepakati tiga jenis tampilan agar jumlah halaman tidak membengkak.

[<u>Pro UIux Dashboard Wireframe Generator ChatGPT Image Prompt | PromptBase</u>](https://images.openai.com/static-rsc-4/tn-2grn4-keZtNOccWX4vh9fVov17I2C60kOrP3rDOyWknjBDodWvX3oKr7UxSOpWqayzdBCjNFK-_zjAAuSakX-0HoCH1kaZo2TAXrhQxkq3HG0tNhdVLFbrHEjlNlVRyqs3kn5p3HVaVo03aIwAUHxYv6BN43-IGID65pDq0E?purpose=inline)

**1. Page / Screen**

Halaman tersendiri yang memiliki tujuan dan navigasi sendiri.

Contoh: Dashboard, Daftar Proker, Detail Proker.

[<u>UI with multiple tab levels by Stephen on Dribbble</u>](https://images.openai.com/static-rsc-4/95T-0cbpMRivOm8s-NHrZ53C8EjSQjfaSC-2uIL51Gfgc6_3BzB9ytLqlXEbBdtOCGKNr8T3lzLsVXCryge837RoSLnSv_Jv3DSAkSIc51qK5FxzSb1snvKJg-BLJb0ynridEjLoDEtXnCi0GjkAa4Egts42JFeU89L7GomMCgg?purpose=inline)

**2. Tab / Section**

Bagian di dalam satu halaman, bukan halaman baru.

Contoh: tab Roster, Informasi, dan Riwayat Proker.

[<u>组件详解｜弹窗、抽屉、折叠面板，用法有什么区别？ | 人人都是产品经理</u>](https://images.openai.com/static-rsc-4/2aHUkAXe6ShbIYDR3gUoO2yYEzL9ivYXzAPMXmMrDUJ6265-Je4bCtZRTgxmEC9tTMMaKb9Wd-bBCBkNq6QS33gn04Wv3hn4rJLnAsx9MsODPP483IQPlA-q-VWAQzWQuK2HM6rbkGdjQTtgwoI2ZnSc8ehOpQ-1EJkhHz8h8CQ?purpose=inline)

**3. Modal / Drawer**

Tampilan sementara untuk tindakan tertentu.

Contoh: Tambah Anggota, Konfirmasi Hapus, dan Arsipkan Kabinet.

Prinsipnya: **jangan membuat halaman baru jika cukup menggunakan tab atau modal.** Ini juga sesuai standar inventaris dalam dokumen arsitektur.

analisis arsitektur.docx

### **Baseline yang sudah dikunci**

Kita tetap menggunakan enam area:

1. Public Website

1. Personal Area

1. Organization Management

1. Workspace Kompartemen

1. Workspace Proker

1. Admin Panel

Authentication menjadi alur akses bersama, bukan area aplikasi ketujuh.

front end.docx

Khusus Admin, alurnya tetap:

**Admin Login**

**Cabinet Center**

Kartu seluruh kabinet, tanpa sidebar

**Pilih Kabinet**

**Cabinet Dashboard**

Sidebar dan administrasi kabinet terpilih

front end.docx

### **Keputusan 06.1**

Apakah standar Page, Tab/Section, dan Modal/Drawer ini kita tetapkan sebagai aturan seluruh HIPMI CENTRAL?

**Rekomendasiku: A. Setuju.** Supaya struktur tetap sederhana, tidak banyak halaman yang sebenarnya memiliki fungsi sama, dan lebih mudah diterapkan saat frontend.

GASSS! ❤️ 06.1 resmi kita sepakati. Sekarang masuk ke sitemap seluruh aplikasi.

GASSS! ❤️ 06.1 resmi kita sepakati. Sekarang masuk ke sitemap seluruh aplikasi.

# **06.2 — Sitemap Enam Area Aplikasi**

Tujuannya menentukan posisi setiap menu supaya tidak ada fitur yang salah tempat, berulang, atau membingungkan pengguna.

Kita gunakan struktur yang sudah disepakati sebelumnya.

## **1. Public Website**

Tanpa login

**HIPMI CENTRAL — PUBLIC**

- Beranda

- Tentang Kami

- Organisasi

  - Kabinet

  - Bidang

  - Kompartemen

  - Program Kerja

- Aktivitas

  - Agenda & Tiket

  - Berita & Artikel

  - Media Partner

- Karya Kader

  - Bisnis Kader

  - Prestasi Kader

- Kotak Suara

**Kontrol akun:** Login / Daftar

front end.docx

## **2. Personal Area**

Pengguna login

**PERSONAL AREA**

1. Dashboard Saya

1. Profil Saya

1. Keanggotaan (khusus kader)

1. Aktivitas Saya

  - Agenda & Tiket

  - Program Kerja

  - Tugas Saya

  - Riwayat

1. Pengaturan Akun

front end.docx

Notifikasi tetap melalui Notification Center, bukan menu utama tambahan.

## **3. Organization Management**

Pengurus dengan akses aktif

**ORGANIZATION MANAGEMENT**

- **01. Dashboard Organisasi**

- **02. Operasional Organisasi**

  - Program Kerja

  - Agenda & Kalender

- **03. Administrasi & Keuangan**

  - Persuratan

  - Keuangan

  - Arsip Dokumen & LPJ

- **04. Direktori & Relasi**

  - Direktori Kader

  - Bisnis Kader

  - Sponsor & Mitra

- **05. Publikasi & Layanan**

  - CMS & Publikasi

  - Media Partner

  - Kotak Suara

- **06. Monitoring & Tindak Lanjut**

  - Statistik & Laporan

  - Approval Center

- **07. Workspace**

  - Workspace Kompartemen

  - Workspace Proker

Workspace ditempatkan dalam kelompok tersendiri, bukan dicampur dengan menu operasional utama. Menu yang muncul tetap mengikuti Permission pengguna.

front end.docx

## **4. Workspace Kompartemen**

Kepala Kompartemen & Staff berizin

**WORKSPACE KOMPARTEMEN**

1. Overview

1. Anggota

1. Program Kerja

1. Progres & Pleno

1. Kalender & Agenda

1. Persuratan

1. Keuangan

1. Dokumen & LPJ

Statistik dan riwayat aktivitas digabungkan ke Overview dan halaman terkait. Tidak perlu sidebar tambahan.

front end.docx

## **5. Workspace Proker**

Pengelola Proker & Anggota Tim

**WORKSPACE PROKER**

1. Overview

1. Tim Pelaksana

1. Tugas & Progres

1. Kalender & Agenda

1. Persuratan

1. Keuangan

1. Dokumen & LPJ

Catatan:

- Tugas & Progres memuat Task Board To Do, In Progress, Blocked, Done.

- Beberapa Pengelola Proker mengelola board bersama tanpa PIC individual.

- Anggota Tim melihat roster secara Read-Only.

- Agenda dibuat melalui Agenda & Kalender utama; Workspace Proker hanya menampilkan agenda terkait.

front end.docx

## **6. Admin Panel**

Khusus system\_admin

Alur masuknya tetap sesuai keputusan kita.

**Admin Login**

**Cabinet Center**

Kartu kabinet, status, periode, dan tombol tambah kabinet. Tanpa sidebar.

**Pilih Kabinet**

**Cabinet Dashboard**

Sidebar aktif untuk kabinet terpilih.

Lima menu utama Admin Panel:

**ADMIN PANEL**

1. Dashboard

1. Struktur Organisasi

  - Tab Struktur

  - Tab Jabatan

  - Tab Penempatan Pengurus

1. Pengguna & Kader

1. Akses & Permission

  - Template Role

  - Permission Khusus

1. Pengaturan & Aktivitas

  - Pengaturan Kabinet

  - Konfigurasi Sistem

  - Audit Aktivitas

front end.docx

front end.docx

Catatan: identitas akun dan Database Kader tetap terpusat. Pengaturan struktur dan Permission mengikuti kabinet yang dipilih.

## **Hasil sementara 06.2**

# **6 Area Aplikasi**

Struktur awal lengkap

| **Area** | **Jumlah menu utama** |
| --- | --- |
| Public Website | 6 |
| Personal Area | 5 |
| Organization Management | 7 kelompok |
| Workspace Kompartemen | 8 |
| Workspace Proker | 7 |
| Admin Panel | 5 |

**Prinsip yang kita pertahankan:**

- Tidak membuat menu baru jika sudah tercakup dalam menu lain.

- Tidak menduplikasi fitur antararea.

- Satu akun dapat berpindah area sesuai akses tanpa login ulang.

- Setiap area memiliki navigasi yang sesuai dengan tanggung jawab penggunanya.

## **Konfirmasi 06.2**

Apakah sitemap enam area ini kita tetapkan sebagai baseline untuk membuat Master Screen Inventory?

MANTAPPP! ❤️ **Sitemap 06.2 resmi kita kunci sebagai baseline.**

**06.2 — Sitemap Enam Area**

SELESAI

**06.3 — Master Screen Inventory**

MULAI

Sekarang kita mengubah sitemap menjadi daftar halaman yang benar-benar akan dibangun.

Prinsipnya:

- Setiap halaman memiliki ID unik.

- Tab, modal, dan drawer tidak dihitung sebagai halaman utama.

- Tidak membuat halaman ganda untuk fitur yang sama.

- Setiap halaman memiliki tujuan dan pengguna yang jelas.

- Tetap mengikuti keputusan Business Flow yang sudah dikunci.

## **A. Standar Master Screen Inventory**

Dokumen acuan mencatat inventaris awal sebanyak **146 screen dalam 16 kelompok fungsional**. Angka ini bukan 146 desain berbeda yang harus dibuat dari nol. Kita akan menghitung ulang setelah menyesuaikan keputusan terbaru.

web hipmi(2).docx

Enam area aplikasi tetap menjadi struktur utama. Kelompok fungsional hanya membantu mengelompokkan screen agar mudah dikerjakan.

## **B. 06.3.1 — Public Website (PUB)**

Baseline inventaris: 22 screen

Berikut daftar halaman publik:

| **ID** | **Nama Screen** | **Route** |
| --- | --- | --- |
| PUB-01 | Beranda | / |
| PUB-02 | Tentang Kami | /tentang-kami |
| PUB-03 | Daftar Kabinet | /organisasi/kabinet |
| PUB-04 | Detail Kabinet | /organisasi/kabinet/:id |
| PUB-05 | Daftar Bidang | /organisasi/bidang |
| PUB-06 | Detail Bidang | /organisasi/bidang/:id |
| PUB-07 | Daftar Kompartemen | /organisasi/kompartemen |
| PUB-08 | Detail Kompartemen | /organisasi/kompartemen/:id |
| PUB-09 | Daftar Program Kerja | /organisasi/program-kerja |
| PUB-10 | Detail Program Kerja | /organisasi/program-kerja/:id |
| PUB-11 | Daftar Agenda & Tiket | /aktivitas/agenda |
| PUB-12 | Detail Agenda | /aktivitas/agenda/:id |
| PUB-13 | Berita & Artikel | /aktivitas/berita |
| PUB-14 | Detail Berita/Artikel | /aktivitas/berita/:id |
| PUB-15 | Informasi Media Partner | /aktivitas/media-partner |
| PUB-16 | Pengajuan Media Partner | /aktivitas/media-partner/ajukan |
| PUB-17 | Cek Status Media Partner | /aktivitas/media-partner/cek-status |
| PUB-18 | Direktori Bisnis Kader | /karya-kader/bisnis |
| PUB-19 | Detail Bisnis Kader | /karya-kader/bisnis/:id |
| PUB-20 | Daftar Prestasi Kader | /karya-kader/prestasi |
| PUB-21 | Detail Prestasi Kader | /karya-kader/prestasi/:id |
| PUB-22 | Kotak Suara | /kotak-suara |

web hipmi(2).docx

**Catatan penting:**

- Login dan Daftar bukan bagian dari 22 screen ini.

- Cek Status Tiket bukan menu navbar baru.

- Bisnis Kader dan Prestasi Kader tetap berada dalam Karya Kader.

- Kabinet arsip tidak ditampilkan kepada publik.

- Data yang belum dipublikasikan tidak boleh muncul.

## **C. Screen yang tidak dihitung sebagai menu baru**

Contohnya:

**Aktivitas → Agenda & Tiket**

1. Pilih Tiket

1. Form Registrasi

1. Pembayaran QRIS

1. Hasil/Status Registrasi

1. Cek Status Tiket

1. Verifikasi Email/OTP

1. Hasil Pencarian Tiket

1. Detail/Unduh Tiket

Delapan screen ticketing tersendiri, tetapi tetap berada dalam alur Aktivitas.

web hipmi(2).docx

## **D. Keputusan 06.3.1**

Apakah inventaris Public Website sebanyak 22 screen ini kita tetapkan?

Siap! **PUB-01 sampai PUB-22 resmi dikunci** sebagai bagian Master Screen Inventory 06.3. Kita tidak mengubah sitemap 06.2.

Sekarang mengikuti urutan dokumen acuan, kita lanjut ke kelompok berikutnya.

## **06.3.2 — Public Ticketing (TKT)**

8 screen terinventarisasi

Ticketing merupakan bagian dari **Aktivitas → Agenda & Tiket**, bukan menu navbar baru.

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| TKT-01 | Pilih Tiket | Memilih jenis tiket agenda |
| TKT-02 | Form Registrasi | Mengisi data peserta |
| TKT-03 | Pembayaran QRIS | Menampilkan instruksi pembayaran |
| TKT-04 | Hasil/Status Registrasi | Menampilkan status pendaftaran |
| TKT-05 | Cek Status Tiket | Mencari tiket menggunakan NIM |
| TKT-06 | Verifikasi Email/OTP | Memverifikasi identitas |
| TKT-07 | Hasil Pencarian Tiket | Menampilkan hasil pencarian |
| TKT-08 | Detail/Unduh Tiket | Melihat dan mengunduh tiket PDF |

web hipmi(2).docx

**Ketentuan yang tetap dipertahankan:**

1. Satu QRIS untuk setiap agenda.

1. Kuota direservasi ketika pengguna membuka instruksi pembayaran, sesuai ketentuan alur yang sudah disepakati.

1. Verifikasi pembayaran dilakukan penyelenggara.

1. Tiket PDF dikirim melalui email.

1. Tiket peserta tidak boleh dapat diakses bebas hanya dengan menebak URL.

1. Pengecekan tiket menggunakan NIM dan verifikasi email/OTP.

### **Alur sederhana**

**Detail Agenda**

**Pilih Tiket**

**Form Registrasi**

**Pembayaran QRIS**

**Status Registrasi**

**Tiket PDF**

Cek status tiket merupakan jalur alternatif untuk peserta yang ingin menemukan kembali tiketnya.

## **06.3.3 — Authentication (AUTH)**

Berikutnya, enam halaman autentikasi:

| **ID** | **Nama Screen** |
| --- | --- |
| AUTH-01 | Login |
| AUTH-02 | Registrasi Akun |
| AUTH-03 | Verifikasi Email |
| AUTH-04 | Lupa Password |
| AUTH-05 | Reset Password |
| AUTH-06 | Status/Informasi Akun |

**Aturan utama:** satu sistem autentikasi untuk seluruh role. Tidak perlu membuat sistem login terpisah untuk mahasiswa biasa, kader, pengurus, maupun admin.

## **06.3.4 — Personal Area (PER)**

Area pribadi pengguna memiliki 12 screen.

| **ID** | **Nama Screen** |
| --- | --- |
| PER-01 | Dashboard Personal |
| PER-02 | Profil Saya |
| PER-03 | Edit Profil |
| PER-04 | Keamanan Akun |
| PER-05 | Informasi & Riwayat Kader |
| PER-06 | Riwayat Jabatan Organisasi |
| PER-07 | Keikutsertaan Proker |
| PER-08 | Registrasi dan Tiket Saya |
| PER-09 | Riwayat Agenda & Kehadiran |
| PER-10 | Bisnis Saya |
| PER-11 | Pengajuan/Edit Bisnis |
| PER-12 | Notifikasi Saya |

web hipmi(2).docx

**Prinsip penting PER:**

- Mahasiswa biasa, kader, dan pengurus menggunakan dashboard dengan kerangka yang sama.

- Informasi yang muncul menyesuaikan role dan permission.

- Riwayat kader, jabatan, dan keikutsertaan proker terintegrasi.

- Pengguna hanya dapat mengelola informasi yang menjadi kewenangannya.

## **Rekap sementara Master Screen Inventory**

**06.3 — Progress Inventory**

3 kelompok PUB, TKT, AUTH, PER

| **Kelompok** | **Jumlah** |
| --- | --- |
| Public Website (PUB) | 22 |
| Public Ticketing (TKT) | 8 |
| Authentication (AUTH) | 6 |
| Personal Area (PER) | 12 |
| **Subtotal** | **48** |

PUB sudah disetujui. TKT, AUTH, dan PER menunggu persetujuan inventaris.

GASSS! 🔥 Kita lanjut. Sekarang masuk inventaris Admin Panel dengan tetap mengikuti keputusan terbaru tentang Cabinet Center.

## **06.3.5 — System Administration (ADM)**

12 screen — baseline inventaris

Admin Panel hanya dapat diakses oleh pengguna dengan Role system\_admin.

### **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| ADM-01 | Cabinet Center | Daftar kartu seluruh kabinet dan pemilihan kabinet |
| ADM-02 | Cabinet Dashboard | Dashboard setelah memilih kabinet |
| ADM-03 | Tambah/Edit Kabinet | Membuat atau mengubah kabinet |
| ADM-04 | Detail & Arsip Kabinet | Melihat detail dan mengarsipkan kabinet |
| ADM-05 | Organization Structure | Mengelola struktur organisasi |
| ADM-06 | Detail/Edit Bidang & Kompartemen | Mengelola unit organisasi |
| ADM-07 | Position Management | Mengelola jabatan dan penempatan pengurus |
| ADM-08 | User Management | Mengelola akun pengguna |
| ADM-09 | Detail & Assignment Pengguna | Detail identitas, kader, jabatan, dan riwayat |
| ADM-10 | Role & Permission Management | Mengelola template dan Permission khusus |
| ADM-11 | Module Configuration | Mengaktifkan/menonaktifkan modul |
| ADM-12 | System Audit Log | Melihat audit administratif |

web hipmi(2).docx

### **B. Alur khusus Admin**

**Admin Login**

**ADM-01 — Cabinet Center**

Seluruh kabinet, tanpa sidebar

**Pilih Kabinet**

**ADM-02 — Cabinet Dashboard**

Overview dan sidebar administrasi

**ADM-03 sampai ADM-12**

Pengelolaan kabinet, struktur, pengguna, akses, dan audit.

**Catatan penyesuaian:** Cabinet Center sekaligus menjadi tempat pengelolaan daftar kabinet. Dengan begitu, kita tidak membuat halaman daftar kabinet terpisah yang menduplikasi fungsi Cabinet Center.

### **C. Detail halaman yang tetap mengikuti keputusan**

- ADM-05 memiliki tiga tab: Struktur, Jabatan, Penempatan Pengurus.

- ADM-08 dan ADM-09 terhubung dengan Database Kader.

- ADM-10 memiliki Template Role dan Permission Khusus.

- ADM-11 menggunakan satu Toggle per modul.

- ADM-12 hanya dapat diakses Admin Sistem.

## **D. Konfirmasi 06.3.5**

**Apakah inventaris ADM-01 sampai ADM-12 kita tetapkan?**

GASSS! 🔥 **ADM-01 sampai ADM-12 resmi dikunci.**

06.3.5 — SELESAI

Master Screen Inventory Admin Panel: 12 screen.

# **06.3.6 — Organization Management (ORG)**

6 screen — baseline dokumen acuan

Berdasarkan inventaris dalam dokumen arsitektur, Organization Management memiliki enam screen utama.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| ORG-01 | Dashboard Organisasi | Ringkasan kondisi organisasi |
| ORG-02 | Organization Overview & Structure | Melihat gambaran dan struktur organisasi |
| ORG-03 | Monitoring Bidang | Memantau aktivitas Bidang |
| ORG-04 | Monitoring Kompartemen | Memantau aktivitas Kompartemen |
| ORG-05 | Activity & Action Center | Melihat aktivitas dan tindakan yang membutuhkan perhatian |
| ORG-06 | Statistics & Organization Reports | Statistik dan laporan organisasi |

web hipmi(2).docx

## **B. Variasi Dashboard**

Sesuai dokumen, ORG-01 menggunakan satu kerangka Dashboard dengan informasi menyesuaikan jabatan.

| **Pengguna** | **Fokus Dashboard** |
| --- | --- |
| Ketua Umum & Waketum | Organisasi secara keseluruhan |
| Sekjen | Koordinasi organisasi |
| Sekum | Persuratan |
| Bendum | Keuangan |
| Kepala Bidang | Bidang dan Kompartemen di bawahnya |
| Kepala Kompartemen | Kompartemen dan Proker |
| Staff | Aktivitas sesuai Permission |

Tidak perlu membuat Dashboard terpisah untuk setiap jabatan. Cukup satu screen dinamis.

## **C. Hubungan navigasi**

**ORGANIZATION MANAGEMENT**

**ORG-01 — Dashboard Organisasi**

**ORG-02**

Overview & Structure

**ORG-03**

Monitoring Bidang

**ORG-04**

Monitoring Kompartemen

**ORG-05**

Activity & Action Center

**ORG-06**

Statistics & Reports

Catatan: Persuratan, Keuangan, Agenda, dan Workspace tetap menggunakan screen dari kelompok fungsional masing-masing. Tidak dibuat ulang di ORG.

## **D. Keputusan 06.3.6**

**Apakah inventaris ORG-01 sampai ORG-06 kita tetapkan?**

GASSS! ❤️ Kita lanjut. **ORG-01 sampai ORG-06 resmi dikunci**, sekarang masuk inventaris Workspace.

06.3.6 — SELESAI

Organization Management: 6 screen.

06.3.7 — SEDANG DIBAHAS

Workspace & Program Kerja: 10 screen.

# **06.3.7 — Workspace & Program Kerja (WRK)**

10 screen — baseline dokumen acuan

Kita tetap menggunakan dua jenis Workspace yang sudah disepakati:

- **Workspace Kompartemen:** mengelola banyak Proker dan aktivitas unit.

- **Workspace Proker:** mengelola satu Proker secara khusus.

Keduanya menggunakan kerangka UI yang konsisten, tetapi isi dan kewenangannya berbeda.

web hipmi(2).docx

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| WRK-01 | Workspace Overview | Ringkasan workspace |
| WRK-02 | Workspace Information | Informasi dan identitas workspace |
| WRK-03 | Daftar Proker Internal | Daftar Proker Kompartemen |
| WRK-04 | Buat/Edit Proker | Form pembuatan dan perubahan Proker |
| WRK-05 | Project 360 / Detail Proker | Detail keseluruhan Proker |
| WRK-06 | Roster & Team Management | Pengelolaan anggota tim |
| WRK-07 | Assignment Pengelola Proker | Penempatan dan pencabutan Pengelola Proker |
| WRK-08 | Informasi & Status Perkembangan Proker | Catatan dan perkembangan pekerjaan |
| WRK-09 | Pleno & Aktivitas Unit | Pleno dan aktivitas Kompartemen |
| WRK-10 | Penutupan & Arsip Proker | Penutupan dan riwayat Proker |

web hipmi(2).docx

## **B. Pembagian penggunaan screen**

**WORKSPACE KOMPARTEMEN**

Mengelola banyak Proker

- WRK-01 — Overview

- WRK-02 — Informasi Kompartemen

- WRK-03 — Daftar Proker

- WRK-04 — Buat/Edit Proker

- WRK-07 — Assignment Pengelola

- WRK-09 — Pleno & Aktivitas Unit

- WRK-10 — Penutupan & Arsip<br>**WORKSPACE PROKER<br>**Mengelola satu Proker

- WRK-01 — Overview

- WRK-02 — Informasi Proker

- WRK-05 — Project 360

- WRK-06 — Roster & Tim

- WRK-08 — Tugas & Status Perkembangan

- WRK-10 — Informasi Penutupan & Arsip

Pembagian ini merupakan pemetaan penggunaan screen, bukan penambahan jumlah screen baru.

## **C. Penyesuaian berdasarkan keputusan terbaru**

Ada tiga hal yang harus kita pastikan masuk ke inventaris final.

**1. WRK-06 — Roster & Team Management**

- Anggota boleh ditambahkan meskipun belum memiliki akun.

- Pencocokan dilakukan melalui NIM ketika mendaftar.

- Anggota melihat roster secara Read-Only.

- Roster berbeda dengan daftar Pengelola Proker.

**2. WRK-07 — Assignment Pengelola Proker**

- Kepala Kompartemen yang menunjuk Pengelola Proker.

- Satu Proker boleh memiliki beberapa Pengelola.

- Pencabutan akses memiliki dua tindakan: Ubah menjadi Anggota atau Keluarkan dari Tim.

**3. WRK-08 — Tugas & Status Perkembangan**

**Task Board**

**To Do**

Belum dikerjakan

**In Progress**

Sedang dikerjakan

**Blocked**

Terhambat

**Done**

Selesai

Keputusan terbaru dipertahankan

- Bisa drag and drop.

- Dikelola bersama oleh seluruh Pengelola Proker.

- Tidak menggunakan PIC individual.

- Tidak menggunakan persentase progres.

## **D. Halaman yang tidak dibuat ulang**

Kalender, Persuratan, Keuangan, serta Dokumen & LPJ sudah mempunyai kelompok screen tersendiri.

Di dalam Workspace, semuanya ditampilkan berdasarkan konteks Kompartemen atau Proker. Jadi tidak perlu membuat halaman duplikat.

## **E. Konfirmasi 06.3.7**

**Apakah Master Screen Inventory WRK-01 sampai WRK-10 kita tetapkan dengan pembagian Workspace Kompartemen dan Workspace Proker seperti di atas?**

GASSS! 🔥 **WRK-01 sampai WRK-10 resmi dikunci.**

06.3.7 — SELESAI

- 10 screen Workspace.

- Pemetaan Workspace Kompartemen dan Workspace Proker.

- Task Board bersama tanpa PIC individual.

- Seluruh keputusan roster dan Pengelola Proker dipertahankan.<br>06.3.8 — MULAI<br>**Calendar (CAL)**

# **06.3.8 — Calendar (CAL)**

4 screen — baseline dokumen acuan

Kita tetap memakai **satu sistem kalender organisasi**. Kalender Workspace hanya menampilkan jadwal berdasarkan konteks dan Permission pengguna.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| CAL-01 | Kalender Organisasi | Kalender seluruh organisasi sesuai akses |
| CAL-02 | Kalender Workspace | Kalender Bidang, Kompartemen, atau Proker |
| CAL-03 | Detail Kegiatan | Informasi lengkap kegiatan |
| CAL-04 | Buat/Edit Jadwal | Form pembuatan dan perubahan jadwal |

web hipmi(2).docx

## **B. Tampilan kalender**

**Pilihan tampilan**

**Month**

Bulanan

**Week**

Mingguan

**List**

Daftar agenda

Mobile: List/Agenda View menjadi tampilan awal yang direkomendasikan.

## **C. Kategori dan warna**

Kita gunakan warna pembeda agar kalender mudah dibaca.

| **Kategori** | **Penanda** |
| --- | --- |
| Rapat Pengurus | Biru |
| Rapat BPH/Top Management | Ungu |
| Rapat Bidang | Hijau |
| Rapat Kompartemen | Oranye |
| Rapat Proker | Toska |
| Agenda/Event | Merah |

Warna ini contoh pengelompokan sementara. Warna final mengikuti Design System Tahap 07.

## **D. Aturan integrasi**

Ada beberapa keputusan lama yang wajib dipertahankan:

1. Semua agenda dibuat melalui Agenda & Kalender utama.

1. Tombol Buat Agenda dari Workspace mengarahkan ke halaman utama dengan konteks Kompartemen atau Proker otomatis terpilih.

1. Workspace hanya menampilkan agenda yang relevan.

1. Kalender tidak mengunci ruangan atau waktu seperti sistem reservasi.

1. Informasi kalender mengikuti Permission masing-masing pengguna.

1. Dashboard menampilkan pengumuman kegiatan hari ini mulai pukul 00.01 WIB.

web hipmi(2).docx

web hipmi(2).docx

## **E. Konfirmasi 06.3.8**

Apakah **CAL-01 sampai CAL-04** kita tetapkan dengan prinsip satu kalender terpusat, tampilan berdasarkan Permission, serta warna pembeda kategori?

Rekomendasiku: **A. Setuju, kunci empat screen dan lanjut ke 06.3.9 — Persuratan & Ditmawa (COR).**

GASSS! 🔥 **CAL-01 sampai CAL-04 resmi dikunci.**

06.3.8 — SELESAI

Kalender organisasi dan Workspace menggunakan satu sumber jadwal yang sama.

06.3.9 — MULAI

**Persuratan & Ditmawa (COR)**

# **06.3.9 — Persuratan & Ditmawa (COR)**

7 screen — baseline dokumen acuan

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| COR-01 | Central Correspondence Dashboard | Ringkasan seluruh pengajuan surat |
| COR-02 | Daftar Pengajuan Surat | Inbox dan daftar surat |
| COR-03 | Form Pengajuan Surat | Pengajuan surat baru |
| COR-04 | Detail & Review Surat | Pemeriksaan, revisi, dan riwayat |
| COR-05 | Administrasi Surat & Penomoran | Nomor dan administrasi surat |
| COR-06 | Monitoring Ditmawa | Pemantauan proses Ditmawa |
| COR-07 | Arsip Persuratan | Surat selesai dan riwayat |

web hipmi(2).docx

## **B. Pembagian penggunaan**

**SEKRETARIS UMUM (SEKUM)**

- COR-01 Dashboard

- COR-02 Central Inbox

- COR-04 Review & Revision

- COR-05 Administrasi Surat

- COR-06 Monitoring Ditmawa

- COR-07 Arsip

**PENGAJU SURAT**

- COR-03 Form Pengajuan

- COR-04 Detail dan catatan revisi pengajuan sendiri

## **C. Ketentuan yang dipertahankan**

1. Judul surat bebas, tidak dibatasi template.

1. Jenis pengajuan: Untuk Ditmawa atau Surat Umum.

1. Lampiran menggunakan URL dokumen, bukan upload file Word/PDF langsung.

1. Revisi dilakukan pada pengajuan yang sama.

1. Sekum dapat membuka kembali surat yang sudah selesai.

1. Status internal dan status Ditmawa dipisahkan.

1. Riwayat pengajuan tetap tersimpan.

web hipmi(2).docx

## **D. Alur halaman**

**Workspace Kompartemen / Proker**

**COR-03 — Form Pengajuan**

**COR-02 — Central Inbox**

**COR-04 — Review Sekum**

**Jika revisi**

Kembali ke pemohon pada pengajuan yang sama

**COR-05 — Administrasi & Penomoran**

**COR-06 — Monitoring Ditmawa**

**COR-07 — Arsip**

## **E. Konfirmasi 06.3.9**

Apakah **COR-01 sampai COR-07** kita tetapkan sebagai Master Screen Inventory Persuratan & Ditmawa?

Rekomendasiku: setuju dengan tujuh screen tersebut. Tidak perlu menambah halaman statistik atau revisi terpisah karena sudah tercakup dalam Dashboard dan Detail & Review.

GASSS! 🔥 Kita lanjut ke kelompok berikutnya. Tetap sederhana dan mengikuti dokumen acuan.

# **06.3.10 — Financial Management (FIN)**

10 screen — baseline dokumen acuan

Modul ini menghubungkan pengelolaan keuangan Bendum dengan keuangan Bidang, Kompartemen, dan Proker.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| FIN-01 | Financial Overview | Ringkasan keuangan |
| FIN-02 | Kas & Daftar Transaksi | Daftar seluruh transaksi |
| FIN-03 | Detail/Input Transaksi | Melihat dan mencatat transaksi |
| FIN-04 | Daftar Pengajuan Dana | Daftar permintaan dana |
| FIN-05 | Form Pengajuan Dana | Mengajukan kebutuhan dana |
| FIN-06 | Detail & Persetujuan Dana | Pemeriksaan dan keputusan Bendum |
| FIN-07 | Pencairan & Penerimaan Dana | Mencatat pencairan dan penerimaan |
| FIN-08 | Keuangan Unit/Proker | Keuangan berdasarkan unit |
| FIN-09 | Monitoring Pendapatan Tiket & Medpart | Memantau pendapatan |
| FIN-10 | Laporan Keuangan | Rekap dan laporan keuangan |

web hipmi(2).docx

## **B. Pembagian penggunaan**

**BENDUM**

- FIN-01 Financial Overview

- FIN-02 Kas & Transaksi

- FIN-03 Detail/Input Transaksi

- FIN-04 Daftar Pengajuan Dana

- FIN-06 Persetujuan Dana

- FIN-07 Pencairan

- FIN-09 Monitoring Pendapatan

- FIN-10 Laporan Keuangan

**PENGURUS UNIT / PENGELOLA PROKER**

- FIN-04 Daftar Pengajuan Dana

- FIN-05 Form Pengajuan Dana

- FIN-08 Keuangan Unit/Proker

- Melihat status dan riwayat pengajuan sesuai Permission.

## **C. Aturan penting yang dipertahankan**

1. Pengajuan dana dibuat melalui Workspace terkait.

1. Identitas unit otomatis mengikuti Workspace.

1. Bendum berwenang menyetujui, menolak, dan mencairkan dana.

1. Revisi dilakukan pada pengajuan yang sama.

1. Persetujuan, pencairan, dan penerimaan merupakan tiga status berbeda.

**Diajukan**

**Disetujui**

**Dicairkan**

Diterima Unit

1. Pendapatan tiket dan Medpart ditampilkan secara agregat kepada Bendum, tanpa data pribadi pembeli.

1. Transfer antarkas tidak dihitung dua kali sebagai pendapatan.

1. Tidak ada fitur Refund.

1. Koreksi transaksi tetap mempertahankan riwayat.

web hipmi(2).docx

## **D. Hubungan antarhalaman**

**Workspace**

**FIN-05 — Form Pengajuan Dana**

**FIN-04 — Daftar Pengajuan**

**FIN-06 — Persetujuan Bendum**

**FIN-07 — Pencairan & Penerimaan**

**FIN-02 / FIN-03 — Transaksi**

**FIN-10 — Laporan Keuangan**

FIN-01 dan FIN-09 menjadi halaman monitoring yang mengambil data dari transaksi serta modul terkait. FIN-08 menampilkan keuangan berdasarkan lingkup unit.

## **E. Konfirmasi 06.3.10**

Apakah FIN-01 sampai FIN-10 kita tetapkan sebagai Master Screen Inventory Financial Management?

GASSS! ❤️ **FIN-01 sampai FIN-10 resmi dikunci.**

06.3.10 — SELESAI

Financial Management: 10 screen.

06.3.11 — MULAI

Agenda Management (EVT).

# **06.3.11 — Agenda Management (EVT)**

9 screen — baseline dokumen acuan

Modul ini khusus untuk pengurus atau penyelenggara yang mengelola agenda, peserta, tiket, dan pembayaran.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| EVT-01 | Agenda Management Dashboard | Ringkasan seluruh agenda |
| EVT-02 | Daftar Agenda Internal | Mengelola daftar agenda |
| EVT-03 | Buat/Edit Agenda | Membuat dan mengubah agenda |
| EVT-04 | Detail & Pengaturan Agenda | Mengelola informasi agenda |
| EVT-05 | Ticket Type Management | Mengatur jenis, harga, dan kuota tiket |
| EVT-06 | Participant Database | Mengelola data peserta |
| EVT-07 | Payment Verification | Memeriksa bukti pembayaran |
| EVT-08 | Ticket Delivery & Email History | Mengelola penerbitan tiket dan riwayat email |
| EVT-09 | Ticket Sales Report | Melihat laporan penjualan tiket |

web hipmi(2).docx

## **B. Hubungan antarhalaman**

**EVT-01 — Dashboard**

**EVT-02 — Daftar Agenda**

**EVT-03 — Buat/Edit Agenda**

**EVT-04 — Detail Agenda**

**EVT-05**

Jenis Tiket

**EVT-06**

Database Peserta

**EVT-07**

Verifikasi Pembayaran

**EVT-08**

Penerbitan Tiket & Email

**EVT-09**

Laporan Penjualan

## **C. Ketentuan yang wajib dipertahankan**

1. Semua agenda dibuat melalui Agenda & Kalender utama.

1. Agenda dapat dikategorikan Gratis atau Berbayar.

1. Setiap agenda menggunakan satu QRIS.

1. Jenis tiket, harga, dan kuota diatur oleh penyelenggara.

1. Data peserta terdiri dari nama, NIM, nomor telepon, email, fakultas, dan program studi.

1. Bukti pembayaran diverifikasi oleh penyelenggara.

1. Tidak ada batas waktu khusus untuk verifikasi pembayaran.

1. Tiket PDF diterbitkan setelah pembayaran disetujui dan dikirim melalui email.

1. Riwayat pengiriman email dapat diperiksa dan tiket dapat dikirim ulang.

## **D. Jangan sampai tertukar**

Ada dua modul berbeda tetapi saling terhubung:

| **Modul** | **Pengguna** | **Fungsi** |
| --- | --- | --- |
| EVT — Agenda Management | Penyelenggara | Mengelola agenda dan peserta |
| TKT — Public Ticketing | Pengunjung | Mendaftar dan mendapatkan tiket |
| ATT — Attendance | Petugas | Melakukan check-in peserta |

Ketiganya menggunakan data agenda dan tiket yang saling terhubung. Tidak perlu membuat sistem data peserta terpisah.

## **E. Konfirmasi 06.3.11**

Apakah **EVT-01 sampai EVT-09** kita tetapkan sebagai Master Screen Inventory Agenda Management?

GASSS! 🔥 **EVT-01 sampai EVT-09 resmi dikunci.**

06.3.11 — SELESAI

Agenda Management: 9 screen.

06.3.12 — MULAI

Attendance & QR/Barcode Check-in (ATT).

# **06.3.12 — Attendance & QR/Barcode Check-in (ATT)**

4 screen — baseline dokumen acuan

Modul ini digunakan petugas untuk mencatat dan memantau kehadiran peserta agenda.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| ATT-01 | Check-in Dashboard | Ringkasan kehadiran peserta |
| ATT-02 | Barcode/QR Scanner | Memindai barcode tiket |
| ATT-03 | Daftar Kehadiran | Melihat daftar peserta hadir |
| ATT-04 | Detail/Manual Check-in | Melihat detail dan mencatat kehadiran manual |

web hipmi(2).docx

## **B. Alur check-in**

**ATT-01 — Check-in Dashboard**

**ATT-02 — Barcode/QR Scanner**

**Validasi Tiket**

Memeriksa keabsahan dan status tiket

**Valid**

Check-in berhasil

**Tidak Valid**

Tampilkan alasan

**ATT-03 — Daftar Kehadiran**

## **C. Aturan yang dipertahankan**

1. Scan barcode menjadi metode utama.

1. Pencarian nama atau NIM menjadi alternatif melalui manual check-in.

1. Satu tiket hanya boleh digunakan untuk satu check-in.

1. Check-in berhasil langsung memperbarui daftar kehadiran.

1. Kehadiran sah dapat ditambahkan ke riwayat kader setelah identitas tervalidasi.

1. Registrasi saja tidak dihitung sebagai kehadiran.

1. Petugas dan waktu check-in tercatat.

1. Sistem menampilkan status jika tiket sudah digunakan, dicabut, tidak ditemukan, atau bukan untuk agenda tersebut.

**Tampilan mobile:** Scanner menjadi tampilan utama agar petugas mudah melakukan scan menggunakan HP.

Catatan: kita tidak menjanjikan fitur check-in offline karena belum menjadi kemampuan yang disepakati.

web hipmi(2).docx

## **D. Konfirmasi 06.3.12**

Apakah **ATT-01 sampai ATT-04** kita tetapkan sebagai Master Screen Inventory Attendance?

GASSS! ❤️ **ATT-01 sampai ATT-04 resmi dikunci.**

06.3.12 — SELESAI

Attendance & QR/Barcode Check-in: 4 screen.

06.3.13 — MULAI

Documents & LPJ (DOC).

# **06.3.13 — Documents & LPJ (DOC)**

6 screen — baseline dokumen acuan

Modul ini menjadi pusat pengelolaan dokumen, versi dokumen, arsip, dan Laporan Pertanggungjawaban.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| DOC-01 | Document Center | Daftar seluruh dokumen |
| DOC-02 | Tambah/Edit Dokumen | Membuat dan mengubah dokumen |
| DOC-03 | Detail & Riwayat Dokumen | Informasi, versi, dan relasi dokumen |
| DOC-04 | LPJ Management | Daftar dan status LPJ |
| DOC-05 | Detail/Edit LPJ | Mengisi, memeriksa, dan memperbarui LPJ |
| DOC-06 | Document Archives | Arsip dokumen berdasarkan kategori dan periode |

web hipmi(2).docx

## **B. Struktur isi**

**DOC-01 sampai DOC-03 — Document Center**

Informasi dokumen meliputi:

- Judul dan kategori.

- Pemilik (Bidang, Kompartemen, atau Proker).

- Versi dan status.

- Tanggal pembaruan.

- Relasi dengan kegiatan atau Proker.

**DOC-04 sampai DOC-05 — LPJ**

LPJ memiliki delapan bagian:

1. Identitas Proker.

1. Ringkasan Kegiatan.

1. Pelaksanaan.

1. Peserta/Kehadiran.

1. Ringkasan Keuangan.

1. Dokumentasi.

1. Evaluasi.

1. Kesimpulan.

Data yang sudah tersedia otomatis mengambil dari modul sumbernya.

web hipmi(2).docx

## **C. Alur sederhana**

**DOC-01 — Document Center**

**DOC-02 — Tambah/Edit Dokumen**

**DOC-03 — Detail & Riwayat**

**DOC-04 — LPJ Management**

**DOC-05 — Detail/Edit LPJ**

**DOC-06 — Document Archives**

## **D. Aturan yang dipertahankan**

- Dokumen memiliki riwayat versi.

- Dokumen final yang pernah digunakan untuk persetujuan tetap dapat dirujuk.

- Surat tetap menggunakan URL sesuai keputusan persuratan; tidak diwajibkan mengunggah Word/PDF.

- Bendum dapat memonitor keuangan LPJ, tetapi tidak otomatis memiliki kewenangan menutup LPJ.

- Arsip tetap mengikuti Permission.

- Form LPJ panjang dibagi menjadi beberapa bagian agar nyaman digunakan di HP.

web hipmi(2).docx

**Penting:** DOC tidak menggantikan halaman LPJ di Workspace. Workspace menjadi pintasan untuk LPJ Proker terkait, sedangkan DOC menjadi pusat pengelolaannya. Jadi tidak ada halaman ganda.

## **E. Konfirmasi 06.3.13**

Apakah DOC-01 sampai DOC-06 kita tetapkan?

GASSS! ❤️ **DOC-01 sampai DOC-06 resmi dikunci.**

06.3.13 — SELESAI

Documents & LPJ: 6 screen.

06.3.14 — MULAI

Organization Directories (DIR).

# **06.3.14 — Organization Directories (DIR)**

8 screen — baseline dokumen acuan

Modul ini menjadi pusat database Kader, Bisnis Kader, Perusahaan, Sponsor, dan Mitra.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| DIR-01 | Database Kader | Daftar seluruh kader |
| DIR-02 | Detail/Edit Kader | Identitas dan riwayat kader |
| DIR-03 | Verifikasi & Penautan Kader | Menghubungkan akun dengan data kader |
| DIR-04 | Database Bisnis Kader | Daftar usaha kader |
| DIR-05 | Detail & Verifikasi Bisnis | Pemeriksaan dan publikasi bisnis |
| DIR-06 | Database Perusahaan/Sponsor/Mitra | Daftar perusahaan dan mitra |
| DIR-07 | Detail/Edit Perusahaan | Informasi dan relasi perusahaan |
| DIR-08 | Database Riwayat Kerja Sama | Riwayat hubungan organisasi dengan mitra |

web hipmi(2).docx

## **B. Pembagian fungsi**

**1. Database Kader**

Informasi utama:

- Nama dan NIM.

- Tingkatan dan status kader.

- Status akun.

- Jabatan aktif.

- Riwayat keanggotaan, jabatan, Proker, dan agenda.

Detail kader menggunakan tab agar tidak perlu membuat banyak halaman tambahan.

**2. Database Bisnis Kader**

- Nama usaha dan pemilik.

- Kategori usaha.

- Status pemeriksaan.

- Status publikasi.

- Detail, foto, kontak, dan riwayat perubahan.

Persetujuan dan publikasi merupakan dua tindakan berbeda.

**3. Database Perusahaan/Sponsor/Mitra**

- Profil perusahaan.

- Industri dan kategori.

- Kontak resmi.

- PIC sesuai Permission.

- Status relasi.

- Riwayat interaksi dan kerja sama.

web hipmi(2).docx

## **C. Aturan penting**

Ada beberapa ketentuan yang wajib dipertahankan:

1. Database Kader yang dikelola Admin Sistem dan PSDM tetap satu sumber data.

1. Penautan akun kader menggunakan NIM dan verifikasi kepemilikan yang aman.

1. NIM saja tidak cukup untuk memberikan akses ke riwayat seseorang.

1. Penggabungan data duplikat harus mempertahankan riwayat.

1. Seluruh pengurus dapat memperoleh akses baca database perusahaan sesuai keputusan organisasi.

1. Pengelolaan perusahaan dilakukan Bidang Eksternal/Partnership atau pengguna dengan Permission khusus.

1. Kontak privat perusahaan tidak otomatis ditampilkan di Public Website.

1. Tidak perlu membuat sistem kontrak sponsorship baru.

web hipmi(2).docx

## **D. Gambaran navigasi**

**ORGANIZATION DIRECTORIES**

**Kader**

DIR-01 · DIR-02 · DIR-03

**Bisnis Kader**

DIR-04 · DIR-05

**Perusahaan, Sponsor & Mitra**

DIR-06 · DIR-07 · DIR-08

## **E. Konfirmasi 06.3.14**

Apakah DIR-01 sampai DIR-08 kita tetapkan?

GASSS! ❤️ **DIR-01 sampai DIR-08 resmi dikunci.**

06.3.14 — SELESAI

Organization Directories: 8 screen.

06.3.15 — MULAI

CMS, News & Achievement Management.

# **06.3.15 — CMS, News & Achievement Management**

7 screen — sesuai dokumen acuan

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| CMS-01 | CMS Dashboard | Ringkasan konten dan aktivitas editorial |
| CMS-02 | Homepage & Public Content Editor | Mengelola konten editorial beranda |
| CMS-03 | Media Library | Mengelola gambar dan media |
| CMS-04 | Berita/Artikel Management | Daftar dan pengelolaan artikel |
| CMS-05 | Article Editor | Membuat dan mengedit artikel |
| CMS-06 | Prestasi Kader Management | Daftar dan monitoring prestasi |
| CMS-07 | Form & Verifikasi Prestasi | Pengajuan, pemeriksaan, dan publikasi prestasi |

web hipmi(2).docx

## **B. Pembagian fungsi**

**1. CMS Dashboard**

- Jumlah konten.

- Draft dan Published.

- Konten yang perlu diperiksa.

- Prestasi menunggu verifikasi.

- Aktivitas editorial terbaru.

**2. Homepage Content Editor**

Mengelola:

- Banner.

- Teks hero dan pengantar.

- Benefit HIPMI.

- Gambar pendukung.

- Konten editorial dinamis.

Tentang Kami tetap hardcode, jadi tidak perlu halaman editor khusus.

**3. Berita & Artikel**

Alurnya:

**CMS-04 — Article Management**

**CMS-05 — Article Editor**

**Preview**

Publish

**PUB-13 / PUB-14**

Publisher boleh mengedit artikel secara langsung sebelum publikasi, sesuai keputusan sebelumnya.

**4. Prestasi Kader**

Pengelolaan dilakukan oleh Kompartemen yang ditunjuk Admin melalui Permission khusus.

- Pemeriksaan dan publikasi merupakan status berbeda.

- Pengelola dapat meminta revisi.

- Prestasi yang Published masuk ke Karya Kader → Prestasi Kader.

- Empat prestasi terbaru otomatis ditampilkan di Beranda.

- Prestasi kelima menggantikan kartu terlama pada preview Beranda, bukan menghapus data prestasinya.

web hipmi(2).docx

## **C. Catatan penting: Bisnis Kader vs Prestasi Kader**

Kita pertahankan pembagian agar tidak terjadi duplikasi.

| **Konten** | **Pengelolaan internal** | **Tampilan publik** |
| --- | --- | --- |
| Bisnis Kader | DIR-04 / DIR-05 | PUB-18 / PUB-19 |
| Prestasi Kader | CMS-06 / CMS-07 | PUB-20 / PUB-21 |
| Berita & Artikel | CMS-04 / CMS-05 | PUB-13 / PUB-14 |

Jadi, keduanya tetap tampil dalam satu kelompok **Karya Kader** di Public Website, tetapi pengelolaan internalnya berbeda.

## **D. Prinsip yang dipertahankan**

- Tidak membuat editor Tentang Kami.

- Nama pengurus dan struktur organisasi mengambil data utama.

- Agenda dan Proker mengambil data modul masing-masing.

- Media Library tidak boleh sembarangan mengganti logo master.

- Preview artikel menggunakan komponen yang sama dengan halaman publik.

- Semua tindakan mengikuti Permission.

## **E. Konfirmasi 06.3.15**

Apakah CMS-01 sampai CMS-07 kita tetapkan sebagai Master Screen Inventory?

GASSS! ❤️ **CMS-01 sampai CMS-07 resmi dikunci.**

06.3.15 — SELESAI

CMS, News & Achievement Management: 7 screen.

06.3.16 — MULAI

Internal Medpart & Private Kotak Suara.

# **06.3.16 — Internal Medpart & Private Kotak Suara**

6 screen — CMS-08 sampai CMS-13

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| CMS-08 | Medpart Management | Dashboard pengajuan Media Partner |
| CMS-09 | Detail/Verifikasi Medpart | Pemeriksaan pengajuan, pembayaran, dan dokumentasi |
| CMS-10 | Medpart Package & QRIS Configuration | Pengaturan paket dan QRIS |
| CMS-11 | Medpart Publication | Preview, publikasi, dan penarikan publikasi |
| CMS-12 | Kotak Suara Management | Daftar aspirasi dan monitoring |
| CMS-13 | Detail & Tindak Lanjut Kotak Suara | Membaca aspirasi dan mencatat tindak lanjut |

web hipmi(2).docx

## **B. Internal Media Partner**

**1. CMS-08 — Dashboard**

Memiliki tiga tab:

- Semua

- Gratis

- Berbayar

Menampilkan jumlah pengajuan baru, perlu pemeriksaan, pembayaran pending, dokumentasi, siap publikasi, dan Published.

**2. CMS-09 — Detail & Verifikasi**

Tab:

- Informasi Pengajuan

- Layanan

- Pembayaran

- Dokumentasi

- Publikasi

- Riwayat

Pengelola dapat:

- Memeriksa informasi pengajuan.

- Memverifikasi pembayaran.

- Memeriksa poster dan dokumentasi.

- Memberikan catatan revisi.

- Menyetujui atau menolak sesuai Permission.

**3. CMS-10 — Paket & QRIS**

Mengatur:

- Nama paket.

- Gratis/Berbayar.

- Deskripsi dan persyaratan.

- Harga.

- QRIS.

- Status paket.

**4. CMS-11 — Publikasi**

- Preview sebelum publikasi.

- Publish secara manual.

- Unpublish jika diperlukan.

- Riwayat publikasi tetap tersimpan.

web hipmi(2).docx

## **C. Alur Media Partner**

**Pengajuan Public Website**

Tanpa login, mendapatkan kode pengajuan

**CMS-08 — Pengajuan Masuk**

**CMS-09 — Pemeriksaan**

**Disetujui**

**Revisi**

Jika revisi, pemohon memperbaiki pengajuan menggunakan kode yang sama.

**Verifikasi Persyaratan**

**CMS-11 — Preview & Publish Manual**

Tampil di Public Website

**Pembagian kewenangan:**

- Kompartemen Media Komunikasi dengan Permission Admin: pemeriksaan pembayaran, dokumentasi, dan publikasi.

- Bendum: monitoring pendapatan saja, bukan pihak yang menyetujui pembayaran Medpart.

## **D. Private Kotak Suara**

Bagian ini penting karena menyangkut privasi pengirim.

**CMS-12 — Kotak Suara Management**

Menampilkan:

- ID pengaduan/aspirasi.

- Kategori.

- Judul atau ringkasan.

- Tanggal.

- Status.

- Aksi.

**CMS-13 — Detail & Tindak Lanjut**

Menampilkan:

- Isi aspirasi.

- Identitas pengirim sesuai kewenangan.

- Catatan tindak lanjut.

- Status penanganan.

- Riwayat aktivitas.

**Ketentuan identitas pengirim:**

| **Data** | **Ketentuan** |
| --- | --- |
| Nama | Wajib |
| NIM | Wajib |
| Nomor telepon | Wajib |
| Email | Tidak wajib |

Identitas digunakan untuk tindak lanjut melalui WhatsApp.

Tampilan formulir publik juga memberikan informasi bahwa data pengirim dilindungi dan dienkripsi dengan aman. Klaim enkripsi harus didukung penerapan enkripsi sebenarnya pada sistem.

**Permission:**

- Admin menunjuk Kompartemen pengelola.

- Top Management dan seluruh Kepala Bidang dapat melakukan monitoring.

- Monitoring tidak otomatis memberikan hak mengedit atau mengubah status.

- Pengelola berwenang mencatat tindak lanjut sesuai Permission.

Privat — tidak untuk publikasi

Kotak Suara tidak boleh memiliki:

- Publish.

- Unpublish.

- Public Preview.

- Share to Public.

web hipmi(2).docx

## **E. Konfirmasi 06.3.16**

Apakah CMS-08 sampai CMS-13 kita tetapkan sebagai Master Screen Inventory?

GASSS! ❤️ **CMS-08 sampai CMS-13 resmi dikunci.**

06.3.16 — SELESAI

Internal Medpart & Private Kotak Suara: 6 screen.

06.3.17 — MULAI

Reporting, Monitoring & Shared System (SYS).

# **06.3.17 — Reporting, Monitoring & Shared System (SYS)**

9 screen — sesuai dokumen acuan

Kelompok ini berfungsi sebagai pusat laporan, notifikasi, persetujuan, pencarian, dan penanganan error seluruh aplikasi.

## **A. Master Screen Inventory**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| SYS-01 | Statistics Dashboard | Statistik organisasi sesuai akses |
| SYS-02 | Detailed Report Viewer | Detail laporan dan export |
| SYS-03 | Notification Center | Notifikasi seluruh aktivitas |
| SYS-04 | Approval Center | Daftar tindakan yang membutuhkan persetujuan |
| SYS-05 | Activity/Audit History | Riwayat aktivitas sesuai Permission |
| SYS-06 | Global Search Results | Hasil pencarian lintas modul |
| SYS-07 | Unauthorized / 403 | Halaman akses ditolak |
| SYS-08 | Not Found / 404 | Halaman atau data tidak ditemukan |
| SYS-09 | System Error | Gangguan sistem dan kegagalan pemuatan data |

web hipmi(2).docx

web hipmi(2).docx

## **B. Fungsi utama**

**1. SYS-01 & SYS-02 — Statistik dan Laporan**

Statistik meliputi:

- Struktur organisasi dan pengurus.

- Program Kerja.

- Aktivitas Bidang dan Kompartemen.

- Persuratan dan keuangan.

- Agenda, tiket, dan kehadiran.

- Partisipasi kader.

- Media Partner dan publikasi.

Laporan dapat difilter berdasarkan kabinet, periode, unit, kategori, dan status.

Export mengikuti Permission pengguna.

**2. SYS-03 — Notification Center**

Menampilkan:

- Judul dan pesan singkat.

- Kategori notifikasi.

- Waktu.

- Status sudah dibaca atau belum.

- Referensi halaman terkait.

Klik notifikasi membuka halaman sumber jika Permission masih berlaku.

**3. SYS-04 — Approval Center**

Satu tempat untuk melihat pekerjaan yang memerlukan tindakan.

| **Pengguna** | **Tindakan** |
| --- | --- |
| Sekum | Pengajuan surat |
| Bendum | Pengajuan dana |
| Penyelenggara | Verifikasi pembayaran tiket |
| Pengelola Bisnis | Pengajuan bisnis |
| Media Komunikasi | Pengajuan Medpart |

Approval Center tidak memberikan kewenangan baru. Hanya mengumpulkan pekerjaan sesuai Permission.

**4. SYS-05 — Activity/Audit History**

Menampilkan riwayat aktivitas yang boleh dilihat pengguna.

Catatan penting:

- Activity History mengikuti Permission.

- Audit Log administratif sistem tetap berada di ADM-12.

- Audit Log administratif hanya dapat dilihat Admin Sistem.

Jadi keduanya tidak dicampur.

**5. SYS-06 — Global Search**

Pencarian lintas modul, misalnya:

- Proker.

- Agenda.

- Dokumen.

- Data master.

Hasil pencarian hanya menampilkan data yang boleh diakses pengguna.

**6. SYS-07 sampai SYS-09 — System Protection**

403

**Akses Ditolak**

Pengguna tidak memiliki Permission.

404

**Halaman Tidak Ditemukan**

Halaman atau data tidak tersedia.

ERROR

**Gangguan Sistem**

Data gagal dimuat atau layanan mengalami gangguan. Tersedia tombol Coba Lagi.

web hipmi(2).docx

## **C. Prinsip integrasi**

Ada lima aturan yang kita pertahankan:

1. Satu Notification Center untuk seluruh aplikasi.

1. Satu Approval Center untuk seluruh pengajuan yang membutuhkan tindakan.

1. Statistik menyesuaikan jabatan dan lingkup Permission.

1. Pencarian tidak boleh membocorkan informasi privat.

1. Jika akses dicabut, notifikasi lama tidak boleh membuka data yang sudah tidak boleh diakses.

## **D. Konfirmasi 06.3.17**

Apakah SYS-01 sampai SYS-09 kita tetapkan sebagai Master Screen Inventory Reporting, Monitoring & Shared System?

GASSS! ❤️ **SYS-01 sampai SYS-09 resmi dikunci.**

Dengan ini seluruh kelompok Master Screen Inventory 06.3 sudah selesai dibahas. Sekarang kita cocokkan jumlahnya dengan baseline dokumen HIPMI CENTRAL.

# **Rekap Tahap 06.3 — Master Screen Inventory**

HASIL CROSS-CHECK: SESUAI

# **146**

Screen ID

# **16**

Kelompok fungsional

Jumlah akhir sesuai Master Screen Inventory dalam dokumen acuan.

prd\_master.md

prd\_master.md

## **A. Rekap 16 kelompok**

| **No.** | **Kelompok** | **Rentang ID** | **Jumlah** |
| --- | --- | --- | --- |
| 1 | Public Website (PUB) | PUB-01–22 | 22 |
| 2 | Public Ticketing (TKT) | TKT-01–08 | 8 |
| 3 | Authentication (AUTH) | AUTH-01–06 | 6 |
| 4 | Personal Area (PER) | PER-01–12 | 12 |
| 5 | System Administration (ADM) | ADM-01–12 | 12 |
| 6 | Organization Management (ORG) | ORG-01–06 | 6 |
| 7 | Workspace & Proker (WRK) | WRK-01–10 | 10 |
| 8 | Calendar (CAL) | CAL-01–04 | 4 |
| 9 | Correspondence (COR) | COR-01–07 | 7 |
| 10 | Financial Management (FIN) | FIN-01–10 | 10 |
| 11 | Agenda Management (EVT) | EVT-01–09 | 9 |
| 12 | Attendance (ATT) | ATT-01–04 | 4 |
| 13 | Documents & LPJ (DOC) | DOC-01–06 | 6 |
| 14 | Organization Directories (DIR) | DIR-01–08 | 8 |
| 15 | CMS, Medpart & Kotak Suara | CMS-01–13 | 13 |
| 16 | Reporting & Shared System (SYS) | SYS-01–09 | 9 |
|  | **TOTAL** | **16 kelompok** | **146** |

## **B. Pemeriksaan jumlah**

**Perhitungan keseluruhan**

\\\[ \\begin{aligned} 22+8+6+12+12+6+10+4\\\\ +7+10+9+4+6+8+13+9 &=146 \\end{aligned} \\\]

146 / 146 ID terhitung

- Tidak ada kekurangan jumlah ID.

- Tidak ada kelebihan jumlah ID.

- Seluruh 16 prefix tercakup.

- Rentang ID sesuai baseline.

prd\_master.md

## **C. Enam area aplikasi dan kelompok fungsional**

Supaya tidak tertukar, enam area aplikasi tetap menjadi struktur navigasi utama. Enam belas kelompok di atas merupakan pengelompokan fungsional yang mendukung area tersebut.

Jadi, **enam area ≠ enam belas menu utama**.

## **D. Catatan penting sebelum masuk desain**

Ada tiga aturan yang perlu kita pertahankan:

1. **146 Screen ID bukan berarti harus membuat 146 desain berbeda.** Komponen dan template dapat digunakan kembali.

1. Tab, section, modal, dan drawer tidak otomatis dihitung sebagai Screen ID baru.

1. Inventaris ini belum berarti seluruh field, validasi, dan desain setiap screen sudah final. Detailnya akan diperiksa pada tahap berikutnya.

prd\_master.md

# **Status Roadmap HIPMI CENTRAL**

| **Tahap** | **Nama** | **Status** |
| --- | --- | --- |
| 01 | Struktur Website & Navigasi | Selesai |
| 02 | Pengguna & Role | Selesai |
| 03 | Matriks Akses & Kewenangan | Selesai |
| 04 | Daftar Fitur per Modul | Selesai |
| 05 | Business Flow | Selesai |
| 06.1–06.2 | Standar & Sitemap | Selesai |
| 06.3 | Master Screen Inventory | Selesai |
| 06.4–06.6 | Detail Struktur Halaman | Berikutnya |
| 07 | Wireframe, High-Fidelity & Design System | Belum dimulai |
| 08 | Implementasi Frontend | Belum dimulai |

06.3 — SELESAI

**Master Screen Inventory resmi memiliki 146 Screen ID dalam 16 kelompok fungsional.**

Tidak perlu menambah screen hanya untuk memperbanyak jumlah halaman.

# **06.4.1 — Detail Struktur Public Website**

Sedang dibahas

**Tujuan:** menentukan isi setiap halaman, pembagian section, tab, dan interaksi sederhana.

PUB tetap terdiri dari 22 screen. Kita hanya memperjelas susunan di dalamnya, bukan menambah jumlah screen.

web hipmi(2).docx

## **A. Struktur enam menu utama**

**01. BERANDA — PUB-01**

[<u>University Landing Page designs, themes, templates and downloadable graphic elements on Dribbble</u>](https://images.openai.com/static-rsc-4/I2a3xAsAhYMFKwAL6VZF-FPuDtFa-cm5HV7pYypRC57g0cYsfF3Gb-gtsMmtvk6j_auXPcBo7KOzbvgKNxZbLsyEcMUnAWC3lXHxBH-xMWrw7PYqwQ5TKdEYSsfVRTl9lwI8mZ_yQWkPcA6M7N0SndEoq8iBpYM3sECGYKaFWJE?purpose=inline)

[<u>dribbble.com</u>](https://dribbble.com/tags/university-landing-page?utm_source=chatgpt.com)

Susunan section:

1. Hero + Ketua Umum/Wakil Ketua Umum.

1. Benefit HIPMI.

1. Tentang HIPMI.

1. Kabinet Aktif.

1. Struktur Organisasi.

1. Bidang & Kompartemen.

1. Program Kerja.

1. Prestasi Kader (4 terbaru).

1. Bisnis Kader.

1. Agenda Mendatang.

1. Berita Terbaru.

1. Footer.

**02. TENTANG KAMI — PUB-02**

[<u>Browse thousands of Mission And Vision Website Design images for design inspiration | Dribbble</u>](https://images.openai.com/static-rsc-4/cCoXjxNdQLD9IdgkoCY-Fk4BHxcudBacTpUZmHdye3yztNNzp7dmheZecEGK_Kl4Vvmx08BbaLYgFcUF6eMnZsXmcnx-GRJHA9mBurPxw05X5kOpJPhSOltMAqWmU1aeImQ1_-sAVHYeHDk3Npno_KUHA637sqbpgDhBV_5aBjQ?purpose=inline)

[<u>dribbble.com</u>](https://dribbble.com/search/mission-and-vision-website-design?utm_source=chatgpt.com)

Isi satu halaman dengan beberapa section:

- Profil dan sejarah HIPMI.

- Identitas organisasi.

- Visi dan misi.

- Tujuan.

- Nilai organisasi.

- Manfaat organisasi.

Tidak memerlukan tab atau halaman editor khusus.

**03. ORGANISASI — PUB-03 sampai PUB-10**

[<u>Org Chart Software | Company Organizational Charts | Built</u>](https://images.openai.com/static-rsc-4/xKAFhtglUTXWnCvolO1HokFgj-MDoMBwdusGfFKSLHN5bCCTH4Xf2ZeOUlomzS0yB_2YPocbk2bq4fpUMPsmrH_DYjXgb4TvoS3FSZxMA9yUj8h_HW7oTPPR0PDN8HKpz6W0lhrfj3NjPjRfANMX9YwIm17AYkRqkj-A1kplMLQ?purpose=inline)

[<u>builtapp.com</u>](https://www.builtapp.com/built-org-chart-software/?utm_source=chatgpt.com)

Struktur navigasinya:

| **Halaman** | **Screen** |
| --- | --- |
| Daftar Kabinet | PUB-03 |
| Detail Kabinet | PUB-04 |
| Daftar Bidang | PUB-05 |
| Detail Bidang | PUB-06 |
| Daftar Kompartemen | PUB-07 |
| Detail Kompartemen | PUB-08 |
| Daftar Proker | PUB-09 |
| Detail Proker | PUB-10 |

Catatan:

- PUB-04 memakai mind map interaktif.

- PUB-07 memakai tab Semua dan Bidang 1–4.

- PUB-09 memakai filter Bidang dan Kompartemen.

- Detail unit dan Proker menggunakan halaman masing-masing, bukan modal.

**04. AKTIVITAS — PUB-11 sampai PUB-17**

[<u>UngInfo has implemented the Broadcast widget on their website! | Broadcast Events | Broadcast</u>](https://images.openai.com/static-rsc-4/QndDPjLlHdr8Hp7an42SumhI5FpWZ-KrProATkJN8gss_4xkUaetnG5cntwZSqRWVAIkxj8q_h-Zw1S0_YK0SsR7F9dqBVK5gp4uT1mZxUqrO_A1q1nKtzMaOmPhMBFQCl8rpPWvRBlRNKRYtBT_xYTP5oBjUQ-QzWoZO64los0?purpose=inline)

[<u>broadcast.events</u>](https://www.broadcast.events/news/unginfo-now-have-the-broadcast-widget-on-their-website?utm_source=chatgpt.com)

Tiga kelompok:

- Agenda & Tiket: PUB-11 dan PUB-12.

- Berita & Artikel: PUB-13 dan PUB-14.

- Media Partner: PUB-15, PUB-16, PUB-17.

Cek Status Tiket tetap berupa CTA pada halaman Agenda yang terhubung ke TKT-05.

**05. KARYA KADER — PUB-18 sampai PUB-21**

[<u>Portfolio Awards And Recognition: Badge Or Icon Grid by Shadcn UI Blocks | Stow</u>](https://images.openai.com/static-rsc-4/ke_NSWrXyRuEayq82nmsa-XVUwch1DvZKNIB0qwkjm5YgptK_CpbGNqmoV8iLSCOhKuTn52tlJyP8AFQGAnkmgVT-M4fQ0XPYRquKECjjbPTuDjeRvc4jp7CTTOEX8zqRlQHsPP2D8bvcDc_X2ZTGvE05R4-l-Z__KrWnbKhnno?purpose=inline)

[<u>stow.build</u>](https://www.stow.build/product/portfolio-awards-and-recognition-badge-or-icon-grid-272?utm_source=chatgpt.com)

Dua kelompok:

- Bisnis Kader: direktori dan detail bisnis.

- Prestasi Kader: daftar lengkap dan detail prestasi.

**06. KOTAK SUARA — PUB-22**

[<u>Feedback Management Tool | ClearFlask</u>](https://images.openai.com/static-rsc-4/6TbC6u4T1aQ1YR9iLQc_MNLKcREABYz-dr0XYisxio5Gn6I8fq6WmKSpD58Wl2HcDYXINJOT0vZhL4iDStkaA1RB_TnfmE59v60qyTP7mUll7W6by5YH84Lbr6wnV2y1oXvxhI5pEBlB_cyKXlwzeApw0EP0EWDhTuB2qmqS03c?purpose=inline)

[<u>clearflask.com</u>](https://clearflask.com/?utm_source=chatgpt.com)

Satu halaman formulir aspirasi, kritik, dan saran.

Setelah dikirim, tampilkan konfirmasi keberhasilan. Tidak ada daftar aspirasi publik, komentar, atau tombol publikasi.

## **B. Aturan penggunaan tab, modal, dan halaman**

Supaya tidak terlalu banyak halaman, kita gunakan aturan berikut.

| **Komponen** | **Penggunaan** |
| --- | --- |
| Section | Membagi konten dalam satu halaman |
| Tab | Berpindah kategori dalam halaman yang sama |
| Filter | Menyaring daftar data |
| Modal/panel | Menampilkan informasi singkat atau konfirmasi |
| Halaman detail | Untuk informasi lengkap suatu objek |
| Drawer | Navigasi pada perangkat mobile |

Contohnya, ketika pengunjung memilih salah satu simpul di mind map kabinet, cukup tampilkan informasi ringkas pimpinan dan unit. Untuk melihat lengkap, arahkan ke halaman detail yang sudah tersedia.

## **C. Ketentuan responsif**

- Desktop: navbar dan layout horizontal.

- Tablet: layout menyesuaikan lebar layar.

- Mobile: navbar menjadi drawer.

- Mind map berubah menjadi hierarki vertikal atau accordion.

- Carousel mendukung swipe.

- Form menggunakan satu kolom.

- Tabel panjang berubah menjadi kartu atau scroll yang sesuai.

web hipmi(2).docx

## **D. Keputusan 06.4.1**

Rekomendasiku adalah **A**, yaitu menetapkan struktur enam menu di atas sebagai baseline detail Public Website.

**Apakah setuju?**

Kita lanjut ke **06.4.2 — Personal Area (PER-01 sampai PER-12)**.

# **06.4.2 — Detail Struktur Personal Area**

Usulan keputusan

Personal Area tetap menjadi ruang pribadi semua pengguna yang sudah login. Tampilan menyesuaikan status dan aktivitas, bukan membuat dashboard berbeda untuk setiap role.

front end.docx

## **A. Struktur sidebar**

Rekomendasiku tetap menggunakan **5 menu utama**.

**PERSONAL AREA**

Dashboard Saya

Profil Saya

Keanggotaan

Khusus Kader

Aktivitas Saya

Pengaturan Akun

Akses tambahan jika mempunyai kewenangan

Organization Management

Admin Panel

## **B. Pembagian 12 Screen**

| **Menu** | **Screen** | **Isi** |
| --- | --- | --- |
| Dashboard Saya | PER-01 | Dashboard dinamis |
| Profil Saya | PER-02–03 | Profil dan edit profil |
| Keanggotaan | PER-05–06 | Status kader dan riwayat jabatan |
| Aktivitas Saya | PER-07–09 | Proker, tiket, agenda dan kehadiran |
| Keanggotaan | PER-10–11 | Bisnis Saya dan pengajuan bisnis |
| Pengaturan Akun | PER-04 | Keamanan akun |
| Notifikasi | PER-12 | Diakses melalui ikon lonceng |

## **C. Aturan penting**

1. Dashboard tetap satu, informasi menyesuaikan pengguna.

1. Mahasiswa biasa tidak melihat menu Keanggotaan.

1. NIM tidak bisa diedit langsung. Koreksi melalui Admin setelah pemeriksaan.

1. Riwayat kader dan jabatan tidak hilang meskipun kabinet berakhir.

1. Anggota Proker hanya melihat informasi keikutsertaan sesuai aksesnya.

1. Bisnis yang masih diperiksa tidak bisa langsung dipublikasikan oleh pemilik.

1. Organization Management dan Admin Panel tetap menjadi area terpisah.

web hipmi(2).docx

front end.docx

## **D. Satu hal yang perlu kita pastikan**

Ada catatan dari keputusan sebelumnya mengenai Task Board Proker: sistem menggunakan kolom TODO, IN PROGRESS, BLOCKED, dan DONE tanpa PIC. Task Board tersebut merupakan catatan bersama Pengelola Proker, bukan penugasan personal.

Karena itu, aku merekomendasikan tidak membuat menu Tugas Saya tersendiri di Personal Area. Aktivitas Proker cukup menampilkan riwayat keikutsertaan.

## **E. Keputusan 06.4.2**

**Apakah setuju dengan struktur Personal Area ini?**

06.4.2 — RESMI DIKUNCI

Struktur Personal Area ditetapkan menjadi baseline. Selanjutnya kita masuk ke Admin Panel.

# **06.4.3 — Detail Struktur System Administration (ADM)**

12 Screen · Usulan struktur halaman

Prinsip utamanya: Admin mengelola kabinet, struktur, akun, dan konfigurasi sistem. Admin bukan pengganti Sekum, Bendum, atau pengurus operasional.

## **A. Alur masuk Admin Panel**

Ini keputusan sebelumnya yang tetap kita pertahankan.

**Admin Login**

**ADM-01 — Cabinet Center**

Tanpa Sidebar

Kartu seluruh kabinet dan tombol Tambah Kabinet

**Pilih kabinet**

**ADM-02 — Cabinet Dashboard**

Sidebar Aktif

Dashboard administrasi kabinet yang dipilih

**ADM-03 sampai ADM-12**

Jadi benar: kabinet diatur dan dipilih sebelum masuk dashboard administrasi.

## **B. Struktur sidebar Admin**

Setelah memilih kabinet, sidebar dibagi menjadi dua kelompok saja.

**CABINET ADMINISTRATION**

**PENGELOLAAN STRUKTUR & AKUN**

- Overview

- Struktur Organisasi

- Jabatan & Pengurus

- Manajemen Pengguna

- Database Kader

**PENGELOLAAN SISTEM & AKSES**

- Role & Permission

- Konfigurasi Modul

- Audit Log

## **C. Detail 12 Screen**

| **Screen** | **Struktur dan isi** |
| --- | --- |
| ADM-01 Cabinet Center | Kartu kabinet, status, periode, tambah kabinet |
| ADM-02 Cabinet Dashboard | Statistik, aktivitas admin, Quick Actions |
| ADM-03 Tambah/Edit Kabinet | Nama, logo, deskripsi, visi, misi, periode |
| ADM-04 Detail & Arsip Kabinet | Identitas, struktur, pengurus, riwayat dan arsip |
| ADM-05 Organization Structure | Tiga tab struktur, jabatan, penempatan pengurus |
| ADM-06 Detail/Edit Unit | Detail Bidang dan Kompartemen |
| ADM-07 Position Management | Master jabatan dan assignment |
| ADM-08 User Management | Daftar dan pencarian akun |
| ADM-09 Detail & Assignment Pengguna | Identitas, kader, jabatan, permission, riwayat |
| ADM-10 Role & Permission | Template dan matriks Permission |
| ADM-11 Module Configuration | Pengaturan pengelola dan kewenangan modul |
| ADM-12 System Audit Log | Riwayat aktivitas administratif |

prd\_master.md

## **D. Pengaturan halaman yang penting**

**1. ADM-05 — Organization Structure**

Tiga tab dalam satu halaman:

Struktur

Jabatan

Penempatan

Struktur: Kabinet → Bidang → Kompartemen. Jabatan dan penempatan memiliki pengelolaan masing-masing.

ADM-06 dan ADM-07 menjadi halaman pengelolaan detail yang dibuka dari bagian terkait, bukan menu sidebar tambahan.

**2. ADM-08 dan ADM-09 — User Management**

Detail pengguna menggunakan lima tab:

- Identitas

- Keanggotaan

- Jabatan

- Permission

- Riwayat

Database Kader tetap satu sumber data. Admin Sistem dan PSDM dengan Permission khusus mengelola data yang sama.

**3. ADM-10 — Role & Permission**

Menggunakan matriks sederhana berdasarkan modul dan tindakan.

Perubahan Permission langsung berlaku setelah Admin menyimpan, sesuai keputusan sebelumnya.

**4. ADM-11 — Module Configuration**

Mengatur siapa atau unit mana yang berwenang mengelola modul, misalnya:

- Kompartemen pengelola Prestasi Kader.

- Media Komunikasi pengelola Medpart.

- Pengurus dengan Permission Content Creator dan Publisher.

Konfigurasi modul tidak otomatis memberikan seluruh anggotanya akses pengelolaan.

**5. ADM-12 — Audit Log**

Menampilkan pelaku, objek, tindakan, waktu, dan hasil perubahan. Bersifat Read-Only bagi pengguna yang hanya mempunyai akses melihat.

prd\_master.md

## **E. Aturan yang tidak boleh berubah**

1. Hanya system\_admin yang dapat masuk Admin Panel.

1. Kader atau pengurus boleh menjadi Admin jika diberikan Role tersebut secara khusus.

1. Jabatan struktural tidak otomatis memberikan akses Admin.

1. Admin boleh mengubah struktur organisasi selama kabinet Aktif.

1. Penempatan pengurus oleh Admin merupakan pencatatan assignment berdasarkan keputusan pihak berwenang, bukan kewenangan menentukan pengangkatan.

1. Permission setiap kabinet terpisah.

1. Admin tidak otomatis mempunyai kewenangan menyetujui surat atau mencairkan dana.

1. Pengarsipan kabinet menampilkan peringatan dan daftar pekerjaan yang belum selesai sebelum konfirmasi.

front end.docx

## **F. Konfirmasi 06.4.3**

Apakah struktur Admin Panel ini kita tetapkan?

06.4.3 — RESMI DIKUNCI

Struktur System Administration ditetapkan sebagai baseline: 12 screen ADM, dengan Cabinet Center sebelum Dashboard dan sidebar aktif setelah kabinet dipilih.

Sekarang lanjut! 🔥

# **06.4.4 — Detail Struktur Organization Management (ORG)**

6 Screen · Usulan baseline

Tujuan area ini adalah membantu pengurus memantau organisasi dan menjalankan kewenangannya. Satu sistem digunakan bersama, tetapi informasi dan tindakan menyesuaikan jabatan serta Permission.

## **A. Struktur sidebar**

Rekomendasiku menggunakan pengelompokan berikut:

**ORGANIZATION MANAGEMENT**

**01. Dashboard**

- Dashboard Organisasi

**02. Operasional Organisasi**

- Program Kerja

- Agenda & Kalender

**03. Administrasi & Keuangan**

- Persuratan

- Keuangan

- Arsip Dokumen & LPJ

**04. Direktori & Relasi**

- Direktori Kader

- Bisnis Kader

- Sponsor & Mitra

**05. Publikasi & Layanan**

- CMS & Publikasi

- Media Partner

- Kotak Suara

**06. Monitoring & Tindak Lanjut**

- Statistik & Laporan

- Approval Center

**07. Workspace**

- Workspace Kompartemen

- Workspace Proker

Catatan:

- Workspace Kompartemen dan Workspace Proker tetap dipisahkan dalam kelompok Workspace.

- Workspace Switcher berada di topbar.

- Sidebar otomatis menyesuaikan Permission.

- Tidak semua menu muncul untuk setiap pengguna.

## **B. Detail enam Screen ORG**

| **ID** | **Nama Screen** | **Isi utama** |
| --- | --- | --- |
| ORG-01 | Dashboard Organisasi | Ringkasan sesuai jabatan |
| ORG-02 | Organization Overview & Structure | Struktur dan informasi organisasi |
| ORG-03 | Monitoring Bidang | Monitoring Bidang dan unit bawahannya |
| ORG-04 | Monitoring Kompartemen | Monitoring Kompartemen |
| ORG-05 | Activity & Action Center | Pengajuan dan tindakan tertunda |
| ORG-06 | Statistics & Organization Reports | Statistik dan laporan organisasi |

prd\_master.md

## **C. Detail masing-masing halaman**

**ORG-01 — Dashboard Organisasi**

[<u>HRMS Dashboard Design by Md. Imran Hasan on Dribbble</u>](https://images.openai.com/static-rsc-4/9nudMmlegE3di-c2TcNArM57me87Z8rkGhMS0Yg56kBeGiWZGKr-e1UyA0HdIdPPXGVQkYiLWmm38Czv-5lGJsUuMqyYmvRE5MDIx4pwGoTRfEbCDlO2ajlUgwIp_0gyH6VgtQ71UwkLTgTRgpTIcGCn2sSWl6SwSO1P2zgVnlE?purpose=inline)

[<u>dribbble.com</u>](https://dribbble.com/shots/24053363-HRMS-Dashboard-Design?utm_source=chatgpt.com)

Komponen:

1. Identitas kabinet aktif.

1. 4–6 kartu statistik sesuai jabatan.

1. Pengumuman agenda hari ini.

1. Agenda terdekat.

1. Aktivitas terbaru.

1. Tindakan yang perlu ditindaklanjuti.

Pengumuman agenda hari ini mulai pukul **00.01 WIB** dan mengikuti perubahan jadwal terbaru.

**ORG-02 — Organization Overview & Structure**

[<u>Browse thousands of Hr Dashboard UI images for design inspiration | Dribbble</u>](https://images.openai.com/static-rsc-4/yE8-jBCu1lvD7BHucbtFeUFwPgflZN4WDiNz1TjfBCTZQLiRlMETevhlhgqiPzTnixpUJku-8Q-ZDt2BKXZmCjAjp4gTHNgAlbNrZH6v19MURGAcqWWowubpNvzj7hn4QnZVBb5JDxbm-pFo9CKeiNYcPvP-6tbt7o1uyCVU7W8?purpose=inline)

[<u>dribbble.com</u>](https://dribbble.com/search/hr-dashboard-ui?utm_source=chatgpt.com)

Menampilkan:

- Kabinet.

- Bidang.

- Kompartemen.

- Pengurus.

- Ringkasan organisasi.

Pengguna dapat memilih unit untuk melihat informasi strukturalnya. Halaman ini untuk monitoring, bukan menggantikan pengelolaan struktur di Admin Panel.

**ORG-03 — Monitoring Bidang**

Menampilkan:

- Informasi Bidang.

- Kompartemen di bawahnya.

- Program Kerja.

- Agenda dan kalender.

- Persuratan.

- Keuangan.

Kepala Bidang dapat melihat perkembangan unit bawahannya sesuai kewenangan.

**ORG-04 — Monitoring Kompartemen**

Menampilkan:

- Identitas Kompartemen.

- Staff.

- Daftar Proker.

- Agenda.

- Administrasi.

- Keuangan.

Tersedia pintasan menuju Workspace Kompartemen dan Workspace Proker.

**ORG-05 — Activity & Action Center**

Menampilkan pengajuan dan aktivitas yang membutuhkan tindakan pengguna.

Contoh:

- Pengajuan surat.

- Pengajuan dana.

- Verifikasi pembayaran.

- Revisi pengajuan.

Tersedia filter status dan tombol menuju halaman proses terkait.

Catatan: halaman ini menggunakan data pengajuan dari modul sumber, bukan membuat sistem persetujuan baru. SYS-04 tetap menjadi pusat Approval lintas sistem.

**ORG-06 — Statistics & Organization Reports**

Menampilkan:

- Statistik organisasi.

- Perkembangan Proker.

- Aktivitas Bidang dan Kompartemen.

- Persuratan.

- Keuangan.

- Agenda dan kehadiran.

Filter:

- Periode.

- Kabinet.

- Bidang.

- Kompartemen.

Format unduhan mengikuti keputusan sebelumnya: **PDF dan Excel**.

## **D. Perbedaan Dashboard berdasarkan jabatan**

Ini penting agar satu dashboard bisa digunakan seluruh pengurus tanpa membuat banyak desain berbeda.

| **Jabatan** | **Informasi prioritas** |
| --- | --- |
| Ketum | Monitoring keseluruhan |
| Waketum | Monitoring keseluruhan |
| Sekjen | Monitoring keseluruhan |
| Sekum | Persuratan dan administrasi |
| Bendum | Kas, dana, pencairan dan pendapatan |
| Kepala Bidang | Bidang, Kompartemen, Proker, agenda dan kalender |
| Kepala Kompartemen | Operasional Kompartemen dan Proker |
| Staff | Informasi dan aktivitas sesuai penugasan |

**Aturan penting:** Top Management memiliki cakupan monitoring setara, tetapi tidak otomatis mendapatkan kewenangan persetujuan Sekum atau Bendum.

web hipmi(2).docx

prd\_master.md

## **E. Tampilan Mobile**

- Dashboard menjadi satu kolom.

- Agenda hari ini dan tindakan tertunda diprioritaskan.

- Statistik menggunakan grid satu atau dua kolom.

- Monitoring Bidang dan Kompartemen menggunakan kartu.

- Tabel panjang dapat digulir atau diubah menjadi kartu.

## **F. Konfirmasi Keputusan 06.4.4**

Rekomendasiku adalah **A**, karena struktur ini mempertahankan enam screen ORG dan tidak menduplikasi fungsi Workspace maupun Admin Panel.

**06.4.4 — APPROVED & LOCKED**

**Baik! Struktur Organization Management (ORG) resmi disetujui sebagai baseline.**

**Keputusan yang dikunci:**

- **6 screen ORG-01 sampai ORG-06.**

- **Dashboard menyesuaikan jabatan dan Permission.**

- **Monitoring organisasi bertingkat.**

- **Approval Center tidak menduplikasi SYS-04.**

- **Workspace Kompartemen dan Workspace Proker tetap terpisah.**

- **Tampilan desktop dan mobile wajib diperhitungkan.**

**Tidak ada perubahan pada keputusan yang sudah disetujui tanpa persetujuan terlebih dahulu.**

# **06.4.5 — Detail Workspace & Program Kerja (WRK)**

**10 Screen · Baseline untuk persetujuan**

**Bagian ini mengatur bagaimana pengurus bekerja di dalam Workspace masing-masing. Prinsip utamanya: satu sistem, beberapa konteks kerja, dengan akses dan menu sesuai tanggung jawab pengguna.**

## **A. Arsitektur Workspace**

[<u>**Saas Productivity Dashboard - FlowDesk by Miguel Villamizar on Dribbble**</u>](https://images.openai.com/static-rsc-4/pw8e9bHzyJ2yCzhPRJVaU5b9QB2SwV4RkfAYiCuOMMZ936SrdE1v5Fd36Z8b8nbdlguMLrurznSLCpN61q2GnJm6hXPRSbfcNY4u9UKMSBe7l-5Y-k5mYqmRiJXoDsE1iErFX39i7s-Do38RNL0_b_aTl4CBoyijRCP1mGh4H1Y?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26694853-Saas-Productivity-Dashboard-FlowDesk?utm_source=chatgpt.com)

**Ada tiga jenis Workspace utama:**

**1. Workspace Bidang**

- **Identitas Bidang.**

- **Kompartemen.**

- **Agenda dan kalender.**

- **Persuratan.**

- **Keuangan.**

**Kabid berfokus pada monitoring Bidang dan unit bawahannya. Tidak otomatis memiliki menu pembuatan Proker karena kepemilikan Proker berada pada Kompartemen.**

**2. Workspace Kompartemen**

- **Identitas Kompartemen.**

- **Staff.**

- **Daftar Proker.**

- **Agenda.**

- **Pleno.**

- **Persuratan.**

- **Keuangan.**

- **Aktivitas unit.**

**Kepala Kompartemen dapat membuat Proker dan mengelola penugasan pengelolanya.**

**3. Workspace Proker**

- **Identitas Proker.**

- **Manager.**

- **Status operasional.**

- **Roster.**

- **Agenda.**

- **Persuratan.**

- **Keuangan.**

- **Dokumen dan LPJ.**

- **Riwayat aktivitas.**

**Workspace khusus satu Proker. Tidak perlu menu Daftar Proker karena konteksnya sudah berada di dalam satu Proker.**

**prd\_master.md**

## **B. Workspace Switcher**

[<u>**Tracekit - Switch Workspace Menu Popovers by Effa Krisma on Dribbble**</u>](https://images.openai.com/static-rsc-4/BsLvO7vpyAgWiabCtwsFWsMe18Q6BhTJl9g6O7V0TcDl8fuMkQI9Q8_ZZWXvj2K-I3wL_LNNVmebY38Frw0PTFUTMtomYn-NdiE_r8wZj_m81VodwTMpY7JjPzeg_dEL_poGzyJ5sBiK3U7mVj61a2wicz6v81BkbQ8_akYn_9E?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/27051855-Tracekit-Switch-Workspace-Menu-Popovers?utm_source=chatgpt.com)

**Workspace Switcher ditempatkan di topbar.**

**Ketika diklik, pengguna dapat memilih Workspace yang memang menjadi hak aksesnya.**

**Informasi setiap pilihan:**

- **Nama Workspace.**

- **Jenis Workspace.**

- **Kabinet.**

- **Status.**

**Saat berpindah:**

1. **Sistem memvalidasi Permission.**

1. **Konteks Workspace diperbarui.**

1. **Data baru dimuat.**

1. **Sidebar menyesuaikan.**

1. **Konten berpindah.**

1. **Indikator halaman aktif diperbarui.**

**Data Workspace sebelumnya tidak boleh tertinggal atau terlihat setelah perpindahan.**

**prd\_master.md**

## **C. Struktur 10 Screen WRK**

**Berikut seluruh screen yang menjadi cakupan tahap ini.**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| **WRK-01** | **Workspace Overview** | **Ringkasan Workspace** |
| **WRK-02** | **Workspace Information** | **Informasi Workspace** |
| **WRK-03** | **Daftar Proker Internal** | **Daftar Proker Kompartemen** |
| **WRK-04** | **Buat/Edit Proker** | **Form pengelolaan Proker** |
| **WRK-05** | **Project 360 / Detail Proker** | **Pusat informasi Proker** |
| **WRK-06** | **Roster & Team Management** | **Pengelolaan anggota** |
| **WRK-07** | **Assignment Pengelola Proker** | **Penentuan Manager** |
| **WRK-08** | **Informasi & Status Perkembangan Proker** | **Catatan perkembangan** |
| **WRK-09** | **Pleno & Aktivitas Unit** | **Aktivitas dan pleno** |
| **WRK-10** | **Penutupan & Arsip Proker** | **Penutupan dan pengarsipan** |

**prd\_master.md**

## **D. Detail masing-masing Screen**

**WRK-01 — Workspace Overview**

[<u>**Projectify - Project Management Dashboard :: Behance**</u>](https://images.openai.com/static-rsc-4/wQ46PGzf_YqydPaaRL0Iy8C0yq_lZLo5z6Gy4W2GgFaX5eahkXqi7eDJXGvK6-79oO0kZ1zrmwENhzVPbnWW2BC0y4unybUAo-KB5txPY6TKomkGSXGRhN-g7JS2M0s5LvAJEO15vlYC3W5FMMtqtWgbB-vS1urJKHtlXYn2di4?purpose=inline)

[<u>**behance.net**</u>](https://www.behance.net/gallery/148227689/Projectify-Project-Management-Dashboard?utm_source=chatgpt.com)

**Komponen:**

- **Identitas Workspace.**

- **Ringkasan aktivitas.**

- **Agenda terdekat.**

- **Surat dan keuangan terkait.**

- **Aktivitas terbaru.**

- **Pintasan modul.**

**Konten berubah berdasarkan Workspace Bidang, Kompartemen, atau Proker.**

**WRK-02 — Workspace Information**

[<u>**User Types in Wrike – Wrike Help Center**</u>](https://images.openai.com/static-rsc-4/P06U3JCGl_keCayshsTd3EwHmMsVy7ixvJ0Ot4CTb1VscCCC7hXX-AX1AZdjj-mTyWYZLEBSPOTaZTAV1B2kc5KoqEKVoGT0IV64xT6v7fxbWLfk-c-jZ6rU9U0QF9oIEgEoHs8327rvYmlDBuzilqSR6Gtju6Ch_fEHXXPn1mI?purpose=inline)

[<u>**help.wrike.com**</u>](https://help.wrike.com/hc/en-us/articles/4410034413079-User-Types-in-Wrike?utm_source=chatgpt.com)

**Menampilkan informasi:**

- **Nama Workspace.**

- **Deskripsi.**

- **Tujuan.**

- **Struktur.**

- **Identitas pengelola.**

**Tombol Edit hanya tersedia sesuai Permission.**

**WRK-03 — Daftar Proker Internal**

[<u>**MS Project Alternative: Top 15 Tools Compared For 2026**</u>](https://images.openai.com/static-rsc-4/bvGm8EY6r8RQEq1a78NPcMLHlKyLTs7IZ0g5GKw6xEb503xigSoUKFRUk8whjC8vznTJ9_uuJJknhMJtllWCPyxbp3Zu3adqCk1pwdfn95nf2mO2BK2tcIokkZsxOqKi7OOiBrpS_6y7hk-E6B0t_N9lEfR8LqZp_dwTpExcNI8?purpose=inline)

[<u>**monday.com**</u>](https://monday.com/blog/project-management/ms-project-alternative/?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama Proker.**

- **Kompartemen.**

- **Manager.**

- **Status.**

- **Tanggal main event.**

**Fitur:**

- **Pencarian.**

- **Filter.**

- **Detail Proker.**

- **Tambah Proker khusus Kepala Kompartemen.**

**WRK-04 — Buat/Edit Proker**

[<u>**Productive Monthly Updates: July - Productive**</u>](https://images.openai.com/static-rsc-4/ehGh19HZhfOBGGWM0cyvfr3gGrhwXSZGcmxjVIkt2C2d8jCcolOlwlitv-iOlAaAajJxxvrrKOPgj5avmO-zAusCSdYQ3_caJmd1EcFaWYhAPtwAVcAyLKMvRk2qPLLk4Rp4E7arh9dW3O4be7_HUgZjVEyNrkRLsNRZ1QpeiJo?purpose=inline)

[<u>**productive.io**</u>](https://productive.io/blog/productive-monthly-updates-july-2023/?utm_source=chatgpt.com)

**Informasi form:**

- **Nama Proker.**

- **Tujuan.**

- **Deskripsi.**

- **Tanggal mulai.**

- **Tanggal main event.**

- **Tanggal target.**

- **Lokasi.**

- **Informasi publikasi.**

- **Logo Proker.**

**Alur yang dikunci:**

1. **Kepala Kompartemen membuat Draft.**

1. **Kepala Kompartemen mengisi identitas awal dan menetapkan Manager.**

1. **Manager melengkapi informasi dan mengunggah logo.**

1. **Logo wajib tersedia sebelum Proker memasuki Ongoing atau Published.**

**Status operasional dan status publikasi harus dipisahkan. Mengaktifkan Proker tidak otomatis memublikasikan informasi internalnya.**

**WRK-05 — Project 360 / Detail Proker**

[<u>**Teletype - Webflow Ecommerce Website Template**</u>](https://images.openai.com/static-rsc-4/TfnZc-CZ7Y_gQmxpjF6YVbhRw_lSlyJ1hO9C-XFuh68go8thRcBisEzDjI1Aydgp1irRVJs7X3QLyqhw5ZUeRyUVIF0iqw6afwL2PZ9Z8AjZm5QyAoeerJfmSeQ2uBS1VQSxiTrgzE_Dwn5On3E7iEnEZw1RWspPV1cuSWhQOKI?purpose=inline)

[<u>**teletype-template.webflow.io**</u>](https://teletype-template.webflow.io/?utm_source=chatgpt.com)

**Ini merupakan pusat informasi satu Proker.**

**Tab yang ditampilkan:**

- **Overview.**

- **Informasi.**

- **Roster.**

- **Agenda.**

- **Persuratan.**

- **Keuangan.**

- **Dokumen & LPJ.**

- **Riwayat.**

**Seluruh tab harus merujuk pada ID Proker yang sama dan mengikuti Permission.**

**WRK-06 — Roster & Team Management**

[<u>**TeamPulse**</u>](https://images.openai.com/static-rsc-4/jSt3FouxiOzbue4T-5y_rvIIQ-8P9fLnHznUE_QPi5EDwXSQF27V5xlxl2Rq2CiqBbEL0je_YrcKYw5KyaMFrtC7TShe97fUUcv4H1k_wxLwsxf1pPwgvDG3b8GvJI3mlLlVBl_IAf7ZJ8Dyf70OM0HFCv5xawOffBsX07_Dugg?purpose=inline)

[<u>**teampulse.net**</u>](https://www.teampulse.net/articles-blog/cr%C3%A9er-un-club?utm_source=chatgpt.com)

**Dua tab utama:**

- **Anggota Tim.**

- **Pengelola Workspace.**

**Ketentuan:**

- **Kakom dan Manager memiliki akses pengelolaan roster sesuai kewenangannya.**

- **Member hanya melihat informasi keikutsertaan yang diizinkan.**

- **Member tidak wajib memiliki akun.**

- **Manager wajib memiliki akun aktif dan status kader terverifikasi.**

- **Jabatan kepanitiaan tidak otomatis memberikan hak Manager.**

**WRK-07 — Assignment Pengelola Proker**

[<u>**Assigning Users - Project management tool - UX visual design by Sandy Galabada on Dribbble**</u>](https://images.openai.com/static-rsc-4/EHn_YZMzcgDIdb4IqHVpERF-Zr-kLpyAkVCOCujKf-qaa3IyzQivIGeTOP4qFY-aqohyw1pHFuUNWeKjPFMp9TaQwNxB1dr05EdDAOw8tJQ2Z3321vXS-RG6l19Bv2f1rFIC4pVyCq9oNUxG_KoJZKIwRuWf4q_UIQcy30njcu0?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/17178502-Assigning-Users-Project-management-tool-UX-visual-design?utm_source=chatgpt.com)

**Fitur:**

- **Pencarian berdasarkan NIM atau nama.**

- **Informasi verifikasi kader.**

- **Penunjukan Manager.**

- **Penurunan Manager menjadi Member.**

- **Pengeluaran Manager dari roster.**

**Aturan dikunci**

**Hanya Kepala Kompartemen yang berwenang menentukan Manager. Manager tidak dapat menunjuk Manager lainnya.**

**Perubahan assignment harus tercatat dalam histori.**

**WRK-08 — Informasi & Status Perkembangan Proker**

[<u>**Overview - Phases | Online Help | Zoho Projects**</u>](https://images.openai.com/static-rsc-4/wH_VgVniP7RoG-MiaMRBDAKhl7HxV01BCuhkZWvne8s2ZMRs8PQ_U1y01franKdoq4UTQDAHcK-IETIA8RWDO9g8RcQ_rOpLm9bCO26IJjJH7vcTPVNtnMu4hilauN_e_iQ6-ZYnfMUafBkr23F01-vCnTiHwGxWhZyOJv9d5VQ?purpose=inline)

[<u>**help.zoho.com**</u>](https://help.zoho.com/portal/en/kb/projects/portal-home/overview/articles/work-overview-phases?utm_source=chatgpt.com)

**Tidak menggunakan progress bar atau persentase.**

**Informasi perkembangan meliputi:**

- **Status operasional.**

- **Catatan kegiatan terbaru.**

- **Capaian.**

- **Kendala.**

- **Rencana selanjutnya.**

- **Jadwal penting.**

- **Perkembangan surat.**

- **Pengajuan dan pencairan dana.**

- **Agenda terkait.**

- **LPJ jika memasuki tahap penyelesaian.**

**Perkembangan Kompartemen tetap dicatat terpisah dari perkembangan Proker.**

**WRK-09 — Pleno & Aktivitas Unit**

[<u>**Referenzen Management Suite | GuideCom**</u>](https://images.openai.com/static-rsc-4/k3OrUq8-dM88whaF8__srJwiUjNCUYZz36kshPZL_s1527c6yMMz2zo_KX3_cZ0K1rVE3yvUBt5_DdRhfYSEGrfeDBTCInFyAyIDNHPqcKUdjXChZ40Bkit-XBpQr4ffXyZNPvhmRejfaF1hOmS740Pws_agseikwOIzosNU7Wo?purpose=inline)

[<u>**guidecom.de**</u>](https://www.guidecom.de/management-referenzen/?utm_source=chatgpt.com)

**Menampilkan:**

- **Jadwal pleno.**

- **Riwayat rapat.**

- **Notulensi.**

- **Keputusan.**

- **Tindak lanjut.**

- **Deadline.**

- **Aktivitas unit.**

**Jadwal pleno yang sudah terdaftar di kalender tidak boleh dibuat sebagai jadwal duplikat.**

**WRK-10 — Penutupan & Arsip Proker**

[<u>**Gantt Artificial Construction Cloud**</u>](https://images.openai.com/static-rsc-4/TIxTSQlhxFQvOQ6d8d1J1fjhMNrnPoaY7Htxx0rCvaambdGlUHk-w2fame7eVbS3c8MNSEgPrxDs9oJdJBHgm1axwR5c3Ridv2pU6RRTjTJXfiI2Z3TOB2cROiRXR7Zl49FhTLBFir62Wv9iqEHMGDJPIEX7cK3E53MWEjLnKzI?purpose=inline)

[<u>**gantt-acc.co.za**</u>](https://gantt-acc.co.za/?utm_source=chatgpt.com)

**Sebelum Proker ditutup, sistem memeriksa:**

- **LPJ sudah Approved.**

- **Seluruh surat sudah selesai.**

- **Seluruh pencairan dana sudah Settled.**

- **Tidak ada persyaratan penutupan yang belum dipenuhi.**

**Tombol ****Tutup Proker**** hanya tersedia untuk Kepala Kompartemen pemilik.**

**Setelah ditutup:**

- **Data roster tetap tersimpan.**

- **Histori keuangan tetap tersimpan.**

- **Persuratan tetap tersimpan.**

- **Dokumen tetap tersimpan.**

- **Workspace berubah menjadi akses arsip/read-only bagi pihak yang berwenang.**

**Main event yang sudah berlalu tidak otomatis menutup Proker.**

**prd\_master.md**

**prd\_master.md**

## **E. Ketentuan desain dan teknis**

| **Aspek** | **Ketentuan** |
| --- | --- |
| **Desktop** | **Sidebar khusus Workspace** |
| **Mobile** | **Drawer dan satu kolom** |
| **Switcher** | **Berada di topbar** |
| **Navigasi** | **Mengikuti jenis Workspace** |
| **Permission** | **Divalidasi backend/RLS** |
| **Riwayat** | **Tetap tersedia setelah penutupan** |
| **Progress** | **Naratif, tanpa persentase** |
| **Arsip** | **Read-only** |

**Pada HP, Project 360 menggunakan tab atau subsection, roster berubah menjadi kartu anggota, dan penutupan menggunakan dialog konfirmasi.**

**prd\_master.md**

## **F. Konfirmasi 06.4.5**

**Menunggu persetujuan**

**Ada tiga keputusan besar yang perlu dikunci:**

1. **Tiga jenis Workspace menggunakan satu template visual, tetapi sidebar dan kontennya berbeda.**

1. **Hanya Kepala Kompartemen yang dapat membuat Proker, menunjuk Manager, dan menutup Proker miliknya.**

1. **Pengelolaan Proker menggunakan status dan catatan perkembangan, bukan persentase progress.**

**Apakah struktur 06.4.5 ini disetujui?**

**06.4.5 — RESMI DIKUNCI**

**Seluruh struktur Workspace & Program Kerja (WRK-01 sampai WRK-10) resmi menjadi baseline.**

**Sekarang kita lanjut ke kalender. Ini penting karena kalender menjadi penghubung kegiatan organisasi, Bidang, Kompartemen, dan Proker.**

# **06.4.6 — Detail Struktur Calendar & Scheduling (CAL)**

**4 Screen · Usulan baseline**

## **A. Prinsip utama**

**Satu sumber kalender digunakan bersama oleh seluruh organisasi.**

**Kalender dapat diakses dari:**

- **Organization Management.**

- **Workspace Bidang.**

- **Workspace Kompartemen.**

- **Workspace Proker.**

**Tidak perlu membuat kalender terpisah untuk masing-masing unit. Perbedaannya hanya pada konteks dan Permission.**

## **B. Struktur 4 Screen**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| **CAL-01** | **Kalender Organisasi** | **Kalender keseluruhan organisasi** |
| **CAL-02** | **Kalender Workspace** | **Kalender sesuai Workspace aktif** |
| **CAL-03** | **Detail Kegiatan** | **Informasi lengkap kegiatan** |
| **CAL-04** | **Buat/Edit Jadwal** | **Membuat dan mengubah jadwal** |

**prd\_master.md**

## **C. Detail halaman**

**1. CAL-01 — Kalender Organisasi**

[<u>**WorkWise - Productivity Dashboard - Calendar Page by Ryan Indra for Kretya Studio on Dribbble**</u>](https://images.openai.com/static-rsc-4/e6OjFEJ7XYG0nX8yn_w9cclMhSTlXD50Z-o0gGjv4UHpvUyw-23EUyb0EPUw3RRbUEN7E2xDRFlFwD9pHFMwadFcOV9GUNngfpMeAGB1Z2c7VIn6FTx758-OSSFzk1GzP4hib5Rr0nVNZWcNhszOufLpLeMuj5N8z8JOcyyrtGg?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/23808367-WorkWise-Productivity-Dashboard-Calendar-Page?utm_source=chatgpt.com)

**Komponen:**

- **Month View.**

- **Week View.**

- **List View.**

- **Filter kategori.**

- **Filter kabinet.**

- **Detail kegiatan.**

**Day View boleh ditambahkan jika nantinya dibutuhkan.**

**2. CAL-02 — Kalender Workspace**

[<u>**Project Schedule Dashboard by Creava on Dribbble**</u>](https://images.openai.com/static-rsc-4/Wu5Zy-U9c5IBYBBOTbyMdTWCt6YPtvN9uIXNNmax9R0ocMoOEcI5SupCqPAdAH944Uvs7v4kw5hY4NlpAcqH_PMEVQbV_8vJrO_nLrwkcnfOFZXfogHQjQj9s1IPlqXxw9z28yU3uUVpCmqYAt_jbcKuv8p-nX3DqsdGz1nz4is?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26768547-Project-Schedule-Dashboard?utm_source=chatgpt.com)

**Menampilkan jadwal berdasarkan Workspace aktif.**

**Contoh:**

- **Kabid melihat kegiatan Bidang dan Kompartemen bawahannya.**

- **Kakom melihat kegiatan Kompartemennya dan Proker di bawahnya.**

- **Manager melihat agenda Proker yang dikelolanya.**

**3. CAL-03 — Detail Kegiatan**

**Menampilkan:**

- **Judul kegiatan.**

- **Kategori.**

- **Tanggal dan jam.**

- **Lokasi.**

- **Penyelenggara/pemilik.**

- **Deskripsi.**

- **Status dan visibilitas.**

- **Agenda atau Proker terkait.**

**Tombol Edit dan Batalkan hanya muncul jika pengguna memiliki Permission.**

**4. CAL-04 — Buat/Edit Jadwal**

**Form cukup sederhana:**

| **Field** | **Keterangan** |
| --- | --- |
| **Judul** | **Nama kegiatan** |
| **Kategori** | **Jenis kegiatan** |
| **Tanggal** | **Tanggal mulai dan selesai** |
| **Jam** | **Jam mulai dan selesai** |
| **Lokasi** | **Tempat kegiatan** |
| **Pemilik** | **Otomatis dari konteks** |
| **Deskripsi** | **Keterangan kegiatan** |
| **Visibilitas** | **Sesuai kebutuhan akses** |

**Tanggal dan jam harus divalidasi.**

**prd\_master.md**

## **D. Kategori dan warna kalender**

**Kategori yang digunakan:**

| **Kategori** | **Contoh** |
| --- | --- |
| **Rapat Pengurus** | **Rapat organisasi** |
| **Rapat BPH** | **Rapat Top Management** |
| **Rapat Bidang** | **Rapat internal Bidang** |
| **Rapat Kompartemen** | **Rapat pleno** |
| **Rapat Proker** | **Rapat tim Proker** |
| **Agenda/Event** | **Kegiatan organisasi** |
| **Internal Lainnya** | **Kegiatan internal** |

**Setiap kategori memiliki warna konsisten.**

**Warna final belum ditentukan. Akan mengikuti Design System ARTHAKARSA pada Tahap 07.**

## **E. Aturan Permission**

| **Pengguna** | **Akses kalender** |
| --- | --- |
| **Ketum, Waketum, Sekjen** | **Detail organisasi** |
| **Sekum dan Bendum** | **Detail organisasi** |
| **Kepala Bidang** | **Prioritas Bidang dan bawahannya** |
| **Kepala Kompartemen** | **Prioritas Kompartemen dan Proker** |
| **Manager Proker** | **Sesuai Proker yang dikelola** |
| **Staff/Anggota** | **Sesuai hak akses** |

**Informasi privat tidak boleh terlihat hanya karena pengguna mengetahui tautan kegiatan.**

**prd\_master.md**

## **F. Integrasi penting dengan Agenda & Kalender**

**Mengikuti keputusan sebelumnya**

**Ini harus konsisten dengan keputusan 05.5.4, 05.6.5, dan 05.7.5.**

**Agenda & Kalender Utama**

**Satu pintu pembuatan agenda**

**Workspace Kompartemen**

**Buat Agenda**

**Kompartemen otomatis terpilih**

**Workspace Proker**

**Buat Agenda**

**Proker otomatis terpilih**

**Form Agenda & Pengelolaan Kegiatan**

**Kalender dan Workspace terkait diperbarui**

**Ketentuannya:**

1. **Semua agenda dibuat melalui Agenda & Kalender utama.**

1. **Workspace Kompartemen dan Proker hanya menyediakan tombol pintasan.**

1. **Konteks Kompartemen atau Proker otomatis terisi.**

1. **Workspace Proker hanya menampilkan agenda yang terkait dengannya.**

1. **Pengelolaan tiket, peserta, dan pembayaran tetap terhubung dengan modul Agenda Management (EVT).**

**Jadi tidak ada pembuatan agenda ganda.**

## **G. Aturan tambahan**

- **Dashboard menampilkan kegiatan hari ini mulai pukul 00.01 WIB.**

- **Perubahan dan pembatalan kegiatan langsung memperbarui informasi kalender.**

- **Dua kegiatan boleh berlangsung pada waktu atau lokasi yang sama.**

- **Sistem boleh memberikan peringatan benturan, tetapi tidak mengunci ruangan atau waktu.**

- **Pada HP, List/Agenda View menjadi tampilan awal. Month View tetap tersedia.**

**prd\_master.md**

## **H. Keputusan 06.4.6**

**Menurutku struktur ini sudah konsisten dengan keputusan sebelumnya dan tidak membutuhkan penambahan Screen ID.**

**Apakah setuju dengan baseline Calendar & Scheduling?**

**06.4.6 — RESMI DIKUNCI**

**Baseline Calendar & Scheduling ditetapkan:**

- **CAL-01 sampai CAL-04.**

- **Satu sumber data kalender.**

- **Integrasi dengan Workspace dan Agenda Management.**

- **Permission berdasarkan jabatan dan penugasan.**

- **Tampilan mobile menggunakan List View sebagai default.**

# **06.4.7 — Detail Struktur Correspondence & Persuratan (COR)**

**7 Screen · Usulan baseline**

**Tujuan modul ini adalah memusatkan pengajuan surat, pemeriksaan Sekum, administrasi penomoran, pelacakan Ditmawa, dan arsip.**

**Area utama: Organization Management dan Workspace terkait.**

**prd\_master.md**

## **A. Struktur 7 Screen**

| **ID** | **Nama Screen** | **Fungsi** |
| --- | --- | --- |
| **COR-01** | **Central Correspondence Dashboard** | **Dashboard persuratan Sekum** |
| **COR-02** | **Daftar Pengajuan Surat** | **Daftar pengajuan** |
| **COR-03** | **Form Pengajuan Surat** | **Pengajuan dan revisi** |
| **COR-04** | **Detail & Review Surat** | **Pemeriksaan oleh Sekum** |
| **COR-05** | **Administrasi Surat & Penomoran** | **Nomor dan administrasi** |
| **COR-06** | **Monitoring Ditmawa** | **Pelacakan surat Ditmawa** |
| **COR-07** | **Arsip Persuratan** | **Arsip surat** |

**prd\_master.md**

## **B. Detail masing-masing halaman**

**1. COR-01 — Central Correspondence Dashboard**

[<u>**Correspondence Management System by Lama on Dribbble**</u>](https://images.openai.com/static-rsc-4/Goroviw7ydv-6W4pDIlmoxfq4DvrOEPgZdP71r7odNdCIU5mUMJz8s7Y6B3apbGRNOuCQ7Qq_Eo3GZovZYACnZLvRChM3Kdwfn5AZsKt2R7p7JEBRcWCU-8onIHt5wKbr4CPBGPKG13Qs2muLJKM-MKEaS9vkOhLU7SFm_jX1gM?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26624181-Correspondence-Management-System?utm_source=chatgpt.com)

**Dashboard utama Sekum berisi:**

- **Total pengajuan.**

- **Menunggu pemeriksaan.**

- **Perlu revisi.**

- **Sedang diproses.**

- **Selesai.**

- **Pengajuan Ditmawa.**

- **Aktivitas terbaru.**

**Kartu statistik dapat diklik untuk membuka daftar pengajuan sesuai status.**

**2. COR-02 — Daftar Pengajuan Surat**

[<u>**capterra.co.nz**</u>](https://www.capterra.co.nz/software/1074951/Document-Management-Net-Core?utm_source=chatgpt.com)

**Tabel menampilkan:**

- **Judul surat.**

- **Jenis surat.**

- **Pengaju.**

- **Unit.**

- **Tanggal.**

- **Status.**

- **Tindakan.**

**Filter:**

- **Kabinet.**

- **Status.**

- **Unit.**

- **Jenis surat.**

- **Tanggal.**

**Pengaju melihat pengajuannya sesuai hak akses, sedangkan Sekum memiliki Central Inbox untuk pemeriksaan bersama.**

**3. COR-03 — Form Pengajuan Surat**

[<u>**How To Create a Customer Portal from Scratch in 4 Steps - ManyRequests**</u>](https://images.openai.com/static-rsc-4/1ob9ZhHaerMM7ySA26tRJfrtjiAgaIfQH97TolmsZbhCG2Bgc-lTGtnXzRb5KvQd2TF7qQ87g3F5GRIQL1KaA9MG2nWFRnTkNpWqP4suVfIZ2E-gyFEeqZ7_HjiY06vO4ocUnZA5_CjbdcjUehApWqQzOHnWihPzWXkq9dKzEMw?purpose=inline)

[<u>**manyrequests.com**</u>](https://www.manyrequests.com/blog/how-to-create-a-customer-portal?utm_source=chatgpt.com)

**Form cukup memuat:**

| **Field** | **Keterangan** |
| --- | --- |
| **Judul** | **Bebas** |
| **Tujuan/Keperluan** | **Keperluan surat** |
| **Routing** | **Surat Umum / Untuk Ditmawa** |
| **Deskripsi** | **Penjelasan pengajuan** |
| **URL Dokumen** | **Google Docs/Drive** |
| **Keterangan** | **Informasi tambahan** |
| **Identitas Pengaju** | **Otomatis** |
| **Unit Pengaju** | **Otomatis** |

**Tombol:**

- **Simpan Draft.**

- **Ajukan Surat.**

**Catatan penting: Dokumen menggunakan URL, bukan upload file Word/PDF. Jika ada revisi, pengaju memperbaiki pengajuan yang sama, bukan membuat pengajuan baru.**

**prd\_master.md**

**4. COR-04 — Detail & Review Surat**

[<u>**Document Approval Flow by Jeremy Blaze for Never Before Seen on Dribbble**</u>](https://images.openai.com/static-rsc-4/kATuVKNTs8qQuN13q61dAxUAM1o8iatqqPvmDIM5S9SllRInameJ-Fbky3-AeJVe4dQqeslM_OyWLHd46JXH3gbE82OgoEO9M1R_H0eC21avpXbZi7lYNGwu_2Zfoj62-ab8I5iw6NfFwZGDvFLiPRU4Qbupo11X0YDPiNBuKYI?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/24355993-Document-Approval-Flow?utm_source=chatgpt.com)

**Tab:**

- **Informasi.**

- **Dokumen.**

- **Checklist.**

- **Catatan.**

- **Riwayat.**

**Sekum dapat:**

- **Memeriksa dokumen.**

- **Memeriksa checklist.**

- **Memberikan catatan.**

- **Meminta revisi.**

- **Menyelesaikan proses sesuai kewenangan.**

**Checklist menyesuaikan jenis surat. Tidak semua surat diwajibkan mempunyai persyaratan dokumen yang sama.**

**5. COR-05 — Administrasi Surat & Penomoran**

**Menampilkan:**

- **Nomor surat.**

- **Tanggal surat.**

- **Informasi administrasi.**

- **Riwayat penerbitan.**

**Kewenangan Sekum**

**Nomor surat dibuat secara otomatis oleh sistem, unik, dan tercatat dalam histori. Pengguna tidak mengisi nomor resmi secara manual.**

**prd\_master.md**

**6. COR-06 — Monitoring Ditmawa**

[<u>**MigRun – EU Residence Permit from €530 | Assistance & Free Guides**</u>](https://images.openai.com/static-rsc-4/d69H6lkOkdurqXBJTIhK41ZCqm9P_HOntmrRLXiDtE1EC0N08YQtq_5rGxih3jB9AQ2INO6wb1ecegHfk-4S7-65P5zr3g9Zqo8rLeasAfFvECDiJ47hDy9aFrlM-VN9gBx7F_i5TzaLy542s2MzKOfee_B-uM4yTkUQgH0__BM?purpose=inline)

[<u>**migrun.tech**</u>](https://www.migrun.tech/?utm_source=chatgpt.com)

**Menampilkan:**

- **Judul surat.**

- **Tanggal pengiriman.**

- **Referensi pengiriman.**

- **Status Ditmawa.**

- **Catatan tindak lanjut.**

- **URL dokumen.**

- **Riwayat pengiriman.**

**Penting: status penyelesaian internal oleh Sekum berbeda dengan status tindak lanjut Ditmawa. Surat dapat selesai diproses Sekum tetapi masih menunggu tindak lanjut Ditmawa.**

**7. COR-07 — Arsip Persuratan**

[<u>**SoftExpert ECM | Enterprise Content Management**</u>](https://images.openai.com/static-rsc-4/EbsCO8zcXUiDgP4mZT5GmPuirAyI1XcX4HiZqfOllQHdroAACMf-MAVWLkR1u2ytJse_qqBbsveA--YBITsBdgtXWXKmvApCEuHY8PPPxDrsSQAk_8njWnQDyovQ_PAlLOYOhCblEFhPcyVQieoyo-KHe3rQ2cwjK1xw75VJBYI?purpose=inline)

[<u>**softexpert.com**</u>](https://www.softexpert.com/en/products/enterprise-content-management-ecm/?utm_source=chatgpt.com)

**Fitur:**

- **Pencarian surat.**

- **Filter kabinet.**

- **Filter unit.**

- **Filter periode.**

- **Detail surat.**

- **Riwayat pengajuan.**

**Arsip bersifat Read-Only bagi pengguna yang tidak memiliki Permission perubahan.**

**prd\_master.md**

## **C. Business Flow Persuratan**

**Ini bagian terpenting yang harus konsisten dengan keputusan sebelumnya.**

**1. Pengajuan**

**Pengaju**

- **Pengurus atau Staff dengan Permission mengajukan surat.**

- **Memilih Surat Umum atau Untuk Ditmawa.**

- **Mengisi informasi dan URL dokumen.**

- **Mengirim kepada Sekum.**

**2. Pemeriksaan**

**Sekum**

- **Memeriksa informasi.**

- **Memeriksa dokumen.**

- **Memeriksa checklist.**

**3. Keputusan**

**Perlu Revisi**

**Pengajuan dikembalikan dengan catatan Sekum.**

**Pengaju memperbaiki**

**Mengirim ulang pengajuan yang sama.**

**Kembali ke pemeriksaan.**

**Selesai Diproses**

**Sekum menyelesaikan administrasi dan penomoran.**

**Arsip**

**Jika Surat Umum, proses selesai. Jika Ditmawa, lanjut monitoring.**

**prd\_master.md**

## **D. Aturan Permission**

| **Pengguna** | **Kewenangan** |
| --- | --- |
| **Ketum/Waketum/Sekjen** | **Monitoring sesuai scope** |
| **Sekum** | **Review, revisi, penomoran, Ditmawa, reopen** |
| **Kepala Bidang** | **Monitoring lingkup Bidang** |
| **Kepala Kompartemen** | **Monitoring Kompartemen** |
| **Staff ber-Permission** | **Mengajukan surat** |
| **Pengelola Proker ber-Permission** | **Mengajukan surat Proker** |
| **Anggota biasa** | **Melihat informasi yang diizinkan** |

**Keputusan yang sudah kita sepakati:**

**Staff Kompartemen dengan Permission boleh mengajukan surat langsung kepada Sekum tanpa persetujuan tambahan Kepala Kompartemen.**

## **E. Aturan penting yang dikunci sebagai usulan**

1. **Revisi dilakukan pada pengajuan yang sama.**

1. **Catatan revisi Sekum harus terlihat oleh pengaju.**

1. **Sekum dapat membuka kembali pengajuan selesai dengan alasan yang tercatat.**

1. **Histori pengajuan dan setiap pengiriman tidak boleh hilang.**

1. **Surat Umum dan Ditmawa memiliki proses lanjutan berbeda.**

1. **Penerimaan dana Ditmawa tidak otomatis masuk keuangan; pencatatan tetap melalui Financial Management.**

1. **Nomor surat tidak boleh ganda.**

**prd\_master.md**

**prd\_master.md**

## **F. Tampilan Mobile**

- **Dashboard menggunakan kartu statistik.**

- **Inbox menggunakan kartu pengajuan.**

- **Form satu kolom.**

- **Dokumen dapat dibuka melalui URL.**

- **Review dan revisi dapat dilakukan melalui HP.**

- **Arsip menggunakan daftar kartu dengan filter.**

## **G. Konfirmasi 06.4.7**

**Menunggu persetujuan**

**Menurutku tujuh screen ini sudah mencakup seluruh kebutuhan persuratan tanpa membuat halaman yang berlebihan.**

**COR-01 s.d. COR-07 DIKUNCI **

# **06.4.8 — Financial Management (FIN)**

**10 Screen · Usulan baseline**

**Tujuan: mengelola keuangan organisasi, pengajuan dana, persetujuan Bendum, pencairan, penerimaan, dan laporan.**

## **A. Struktur 10 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **FIN-01** | **Financial Overview** | **Dashboard keuangan** |
| **FIN-02** | **Kas & Daftar Transaksi** | **Riwayat transaksi** |
| **FIN-03** | **Detail/Input Transaksi** | **Pencatatan transaksi** |
| **FIN-04** | **Daftar Pengajuan Dana** | **Daftar permintaan dana** |
| **FIN-05** | **Form Pengajuan Dana** | **Mengajukan dana** |
| **FIN-06** | **Detail & Persetujuan Dana** | **Review Bendum** |
| **FIN-07** | **Pencairan & Penerimaan Dana** | **Pencairan dan konfirmasi** |
| **FIN-08** | **Keuangan Unit/Proker** | **Keuangan masing-masing unit** |
| **FIN-09** | **Monitoring Pendapatan Tiket & Medpart** | **Monitoring pendapatan** |
| **FIN-10** | **Laporan Keuangan** | **Rekap dan unduhan** |

**prd\_master.md**

## **B. Struktur sidebar**

**FINANCIAL MANAGEMENT**

**Overview**

**- Financial Overview**

**Transactions**

**- Kas & Daftar Transaksi**

**Fund Requests**

- **Daftar Pengajuan Dana**

- **Buat Pengajuan Dana**

- **Persetujuan Dana**

- **Pencairan & Penerimaan**

**Financial Monitoring**

- **Keuangan Unit/Proker**

- **Pendapatan Tiket & Medpart**

- **Laporan Keuangan**

**Menu menyesuaikan jabatan dan Permission. Bendum memiliki akses pengelolaan pusat, sedangkan pengurus unit mengakses keuangan sesuai lingkupnya.**

## **C. Detail halaman**

**FIN-01 — Financial Overview**

[<u>**Ideas de paleta de colores oro y burdeos (20 opciones + Hex)**</u>](https://images.openai.com/static-rsc-4/bxczQTKZ_lIlHo6QpC4pSOb0RrtF8v-qp8-uRLfPM3e7FsJGw-c14aJn8xiBb9TvlahfZ7phIp7OaXzhFv5jhdgvMy_IBTinMA3qcjXYQBodfumvDoc61f8JA_tbs207gZ6c8y2jv_UTnXdYHujIxmraLkD4NslcWIDrcYdeWEI?purpose=inline)

[<u>**media.io**</u>](https://www.media.io/es/color-palette/gold-burgundy-color-palette.html?utm_source=chatgpt.com)

**Menampilkan:**

- **Saldo kas pusat.**

- **Total pemasukan dan pengeluaran.**

- **Pengajuan dana pending.**

- **Dana disetujui belum dicairkan.**

- **Keuangan unit.**

- **Pendapatan tiket dan Medpart.**

- **Transaksi terbaru.**

**FIN-02 & FIN-03 — Transaksi**

[<u>**Cleaner books without the busywork | Mercury**</u>](https://images.openai.com/static-rsc-4/IcBsO2DV4yCDa4ndClRrsUD15mm7K5Edljc3lKXSy5Gqd3kRIY6ABE5hcHk_YjPrZZl72EU27gBlZgpAO0oN0Y9Ybb3JguiHW9CLJg-NiLmHgiHWIQDAe9tEnvi2x-b0ngSmrreap9jyCsrhvMe5g9ZLeQWEoEZFGeIdvmxG4XY?purpose=inline)

[<u>**mercury.com**</u>](https://mercury.com/blog/cleaner-books-without-the-busywork?utm_source=chatgpt.com)

**FIN-02 menampilkan daftar transaksi dengan filter tanggal, jenis, unit, nominal dan status.**

**FIN-03 digunakan untuk melihat atau mencatat transaksi sesuai Permission.**

**FIN-04 & FIN-05 — Pengajuan Dana**

[<u>**Public Sector Solutions Series: Transforming Grants Management | by Mahathi Devulapalli | Medium**</u>](https://images.openai.com/static-rsc-4/vam8hT1GuVCp7kLec6afxjN45fMCA0y5kQ3kKBv2nshG1FcyN4erwAW7G7aHiHUphu9yl37wKr37WO-lm4wha2jpHDol0rTCnvt2xg5t99lFbQbg1BbM6YS7PogK8liP4oj9pfNx8yHH397f2XlwNsE3EvZj4W_rqUNvxjz5x9g?purpose=inline)

[<u>**medium.com**</u>](https://medium.com/%40mahathidevulapalli/public-sector-solutions-series-6201b36543ff?utm_source=chatgpt.com)

**Form memuat:**

- **Judul pengajuan.**

- **Unit pengaju (otomatis).**

- **Proker terkait jika ada.**

- **Tujuan dana.**

- **Rincian kebutuhan.**

- **Nominal.**

- **Dokumen pendukung.**

**FIN-06 — Detail & Persetujuan Dana**

[<u>**Revamping Spendesk's Brand and Product Identity | Figma**</u>](https://images.openai.com/static-rsc-4/JKh4wYjmSyzznAJR3PeDXRokVVaF9y6VTkfU8M7w2PthbNOj9MigDeBBAAYzxRgPBqegvfnspIOrne5kSV-HGHmlULjJDYP9GKjEeWtIBiZdB4tnb-fj6ZZnjroiRLgSbu5H_AriuViqE9fIJtn2txkpf0ZBfQEqWM5a_TEpHE4?purpose=inline)

[<u>**figma.com**</u>](https://www.figma.com/customers/spendesk-identite-marque-figma/?utm_source=chatgpt.com)

**Bendum dapat:**

- **Memeriksa pengajuan.**

- **Melihat rincian dan dokumen.**

- **Menyetujui.**

- **Menolak.**

- **Memberikan catatan.**

**FIN-07 — Pencairan & Penerimaan Dana**

[<u>**Manage payments for multiple entities**</u>](https://images.openai.com/static-rsc-4/0_-cH1Ud-THVPKfQcloq3GtIcL7IHX4Ci4SWdEKKkytjbZX4oYdZ1bcKB_L8xBRrgPxL-FR-k21SEZvaqJd2QXx-r37_7DJDuG6Pa_tgpBY2YAR2370I9YlEzmYOVOYPDb9odZxYmfLPcuACu8Lsh3hcXbgsqFUmv1MTw7qZ044?purpose=inline)

[<u>**telleroo.com**</u>](https://www.telleroo.com/payments-for-multiple-entities?utm_source=chatgpt.com)

**Menampilkan nominal disetujui, pencairan, bukti transfer, dan konfirmasi penerimaan oleh unit.**

**FIN-08 — Keuangan Unit/Proker**

[<u>**什么样的项目管理软件适合创业型公司**</u>](https://images.openai.com/static-rsc-4/RLcYgwF79n9-M-9IyfRqk-O9X3qX7mNuYtKAWcRhl_Sm4znvJXgv_i6jAaPRW9e_xew9srrCFoy2OU5lhZ6qlkWPFWljj8BQy3f2GUEvGsd9FnA0qJx0FrJLjLW188KGIKz_aDmW_7c17gXKH34HH9InwBVAjL50jsKrT0Q6l4c?purpose=inline)

[<u>**junnysoft.com**</u>](https://www.junnysoft.com/know_detail/299.htm?utm_source=chatgpt.com)

**Menampilkan kas, pemasukan, pengeluaran, transfer diterima, dan riwayat keuangan sesuai unit atau Proker.**

**FIN-09 — Monitoring Pendapatan Tiket & Medpart**

[<u>**Event Revenue Tracking & Performance Dashboard Template | Mokkup.ai**</u>](https://images.openai.com/static-rsc-4/n4SR_7j6EAiF2BC5P7fjXdzm9eCUe_d-adLXIWuCf-K4wyXRzbWEdlB6Gr8Pe-UYyqiKfMNUZnBgOmWE8N8T9BtuOBbltnArsOrX4jZ9EK4CqvIC1wmhf2FdmH7smIzzqHW7MeNPOnqPd5kbV9CKXc8_Wbg4Zj_VXYjxCXxwj10?purpose=inline)

[<u>**mokkup.ai**</u>](https://www.mokkup.ai/templates/event-revenue-tracking-performance-dashboard-template/?utm_source=chatgpt.com)

**Bendum melihat agregat:**

- **Agenda.**

- **Jenis tiket.**

- **Harga.**

- **Jumlah transaksi Approved.**

- **Total pendapatan.**

**Data pribadi pembeli seperti NIM, email, nomor telepon dan bukti pembayaran tidak ditampilkan.**

**FIN-10 — Laporan Keuangan**

[<u>**Flowlu Help Center | Finance**</u>](https://images.openai.com/static-rsc-4/F9PjW4XHSoBORZx4YV0eGEz7tgSJA-V-TUsNWb7TItGg873W58SwacHbUvzG3Ti1F0Qmim2KDdU_67F64KeI1WMmfGe1ZpKrsWvQfxSaQik_hKOtqlSUWvKlZ30BbLV3Kgxa1ypfhoFhGpfIEXNQMSCoJxfSnsimAtbR834ebwE?purpose=inline)

[<u>**flowlu.com**</u>](https://www.flowlu.com/help/articles/250--finance/?utm_source=chatgpt.com)

**Filter periode, kabinet, unit, jenis transaksi, dan sumber pemasukan/pengeluaran.**

**Unduhan tersedia dalam PDF dan Excel, mengikuti keputusan sebelumnya.**

**prd\_master.md**

## **D. Business Flow Pengajuan Dana**

**Pengurus Unit / Pengelola Proker**

**Mengajukan dana**

**Bendum**

**Memeriksa dan menyetujui atau menolak**

**Pencairan Dana**

**Bendum mencatat pencairan**

**Unit Penerima**

**Mengonfirmasi dana diterima**

**Laporan Keuangan**

**Settled**

**Status harus membedakan:**

- **Diajukan.**

- **Disetujui.**

- **Dicairkan.**

- **Diterima.**

**Jika pencairan bertahap, setiap termin harus mempunyai konfirmasi sendiri. Dana disetujui tidak otomatis berarti dana sudah diterima.**

## **E. Aturan yang wajib dipertahankan**

1. **Bendum menjadi pihak yang menyetujui dan mencairkan pengajuan dana.**

1. **Staff dengan Permission boleh mengajukan langsung kepada Bendum tanpa persetujuan tambahan Kepala Kompartemen.**

1. **Pengajuan revisi dilakukan pada pengajuan yang sama berdasarkan catatan Bendum.**

1. **Total pencairan tidak boleh melebihi nominal yang disetujui.**

1. **Transfer antarkas tidak dihitung dua kali sebagai pemasukan organisasi.**

1. **Bendum memonitor pendapatan Medpart, bukan memverifikasi bukti pembayarannya.**

1. **Tidak ada fitur refund tiket maupun Medpart.**

1. **Bendum tidak otomatis berwenang menutup Proker atau menyetujui LPJ.**

**prd\_master.md**

## **F. Konfirmasi 06.4.8**

**Menurutku struktur FIN ini sudah cukup lengkap tanpa membuat menu keuangan terlalu rumit.**

**Apakah setuju dengan baseline Financial Management?**

**06.4.8 FIN — RESMI DIKUNCI**

**FIN-01 sampai FIN-10 ditetapkan sebagai baseline Master Screen Structure Financial Management.**

**Seluruh ketentuan pengajuan dana, kewenangan Bendum, pencairan, penerimaan, monitoring tiket dan Medpart tetap dipertahankan.**

**Sekarang kita lanjut ke 06.4.9 — Agenda Management (EVT).**

# **06.4.9 — Agenda Management (EVT)**

**9 Screen · Usulan baseline**

**Tujuan: mengelola agenda internal, pendaftaran peserta, tiket, pembayaran, penerbitan tiket, dan laporan penjualan.**

## **A. Struktur 9 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **EVT-01** | **Agenda Management Dashboard** | **Ringkasan seluruh agenda** |
| **EVT-02** | **Daftar Agenda Internal** | **Mengelola daftar agenda** |
| **EVT-03** | **Buat/Edit Agenda** | **Membuat dan mengubah agenda** |
| **EVT-04** | **Detail & Pengaturan Agenda** | **Pusat pengelolaan satu agenda** |
| **EVT-05** | **Ticket Type Management** | **Mengelola jenis tiket** |
| **EVT-06** | **Participant Database** | **Mengelola peserta** |
| **EVT-07** | **Payment Verification** | **Memverifikasi pembayaran** |
| **EVT-08** | **Ticket Delivery & Email History** | **Mengelola pengiriman tiket** |
| **EVT-09** | **Ticket Sales Report** | **Laporan penjualan tiket** |

**prd\_master.md**

## **B. Struktur navigasi**

**AGENDA MANAGEMENT**

- **Dashboard**

- **Daftar Agenda**

- **Buat Agenda**

- **Jenis Tiket**

- **Database Peserta**

- **Verifikasi Pembayaran**

- **Pengiriman Tiket**

- **Laporan Penjualan**

**Detail dan pengaturan masing-masing agenda menjadi pusat pengelolaan dengan enam tab:**

**Informasi | Jenis Tiket | Peserta | Pembayaran | Presensi | Laporan**

**Tidak perlu membuat halaman baru untuk setiap tab.**

## **C. Detail fungsi halaman**

**EVT-01 — Agenda Management Dashboard**

**Menampilkan:**

- **Total agenda.**

- **Agenda aktif.**

- **Jumlah pendaftar.**

- **Tiket terbit.**

- **Pembayaran pending.**

- **Pendapatan Approved.**

- **Kehadiran.**

**EVT-02 — Daftar Agenda Internal**

**Tabel berisi nama agenda, penyelenggara, tanggal, kategori, status publikasi, dan tindakan.**

**EVT-03 — Buat/Edit Agenda**

**Form dibagi menjadi:**

1. **Identitas agenda.**

1. **Deskripsi dan informasi.**

1. **Jadwal dan lokasi.**

1. **Kategori.**

1. **Poster.**

1. **Preview dan publikasi.**

**Harga, kuota, dan masa penjualan tiket diatur terpisah pada Ticket Type Management.**

**EVT-04 — Detail & Pengaturan Agenda**

[<u>**Ventixe Event Page – Event Management Dashboard Figma by Ahmad S. Afandi for Peterdraw Studio on Dribbble**</u>](https://images.openai.com/static-rsc-4/78D-Yl8UdK9IXu8h5MWEWWIFed85yPgIPn4JPyuvOkhQIWBGXjpaAzaPX8vdI3jnqRFUStQly0NJL3C2L_dRk8HzlgyAjNgSz7wDXbnj4rbo9ch3hfNQ0qGN2IhO7RXcix0M7tX4bM3TExe0NwDivUBv5wp6iWErOreLEJjfqxw?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/25835170-Ventixe-Event-Page-Event-Management-Dashboard-Figma?utm_source=chatgpt.com)

**Menjadi pusat pengelolaan agenda dengan enam tab yang sudah ditetapkan.**

**EVT-05 — Ticket Type Management**

**Mengelola:**

- **Nama jenis tiket.**

- **Deskripsi.**

- **Harga.**

- **Kuota.**

- **Awal dan akhir penjualan.**

- **Status tiket.**

**EVT-06 — Participant Database**

**Menampilkan peserta berdasarkan agenda, identitas registrasi, tiket, pembayaran, dan kehadiran.**

**EVT-07 — Payment Verification**

[<u>**Help Center | RegToEvent**</u>](https://images.openai.com/static-rsc-4/LAyfOAhoDrgO3z6s5prkV-pGdLOYO1XeiPaPUDhFp2n6R7obV60tYAx1yimAyuRBCtEq7Etpcenx_R4T7JJoXAjC2LQP06kzFObAKfwnV-6omuH72V21zpAj5oz0pJbiqvHDkKiLAGbe7iYkRydeQch0AIwIc7LoEn-w9p-WDJE?purpose=inline)

[<u>**help.regtoevent.com**</u>](https://help.regtoevent.com/iak-zminiti-status-zamovlennia?utm_source=chatgpt.com)

**Penyelenggara dapat:**

- **Melihat bukti pembayaran.**

- **Memeriksa nominal.**

- **Menyetujui pembayaran.**

- **Menolak pembayaran.**

**EVT-08 — Ticket Delivery & Email History**

**Menampilkan tiket yang sudah terbit, status email, waktu pengiriman, dan kegagalan pengiriman.**

**Tombol kirim ulang menggunakan tiket dan barcode yang sama, bukan menerbitkan tiket baru.**

**EVT-09 — Ticket Sales Report**

**Menampilkan statistik penjualan berdasarkan jenis tiket, harga, jumlah transaksi Approved, dan pendapatan.**

**prd\_master.md**

## **D. Business Flow**

**1. Pembuatan agenda**

1. **Pengelola membuat agenda.**

1. **Mengatur informasi dan jadwal.**

1. **Mengatur tiket jika diperlukan.**

1. **Preview dan Publish.**

**2. Agenda berbayar**

1. **Peserta memilih tiket.**

1. **Mengisi formulir pendaftaran.**

1. **Membuka instruksi pembayaran QRIS.**

1. **Kuota tiket di-reserve.**

1. **Mengunggah bukti pembayaran.**

1. **Penyelenggara memverifikasi pembayaran.**

1. **Jika Approved, tiket PDF dan barcode diterbitkan.**

1. **Email tiket dikirim otomatis.**

**3. Agenda gratis**

1. **Peserta mengisi enam field pendaftaran.**

1. **Registrasi berhasil.**

1. **Tiket otomatis diterbitkan.**

1. **Email tiket dikirim otomatis.**

**prd\_master.md**

## **E. Aturan penting yang dipertahankan**

1. **Satu QRIS untuk satu agenda.**

1. **Penyelenggara agenda yang berwenang memverifikasi pembayaran.**

1. **Tidak ada verifikasi pembayaran untuk agenda gratis.**

1. **Tiket diterbitkan otomatis setelah pembayaran Approved atau registrasi gratis berhasil.**

1. **Email otomatis dikirim melalui Brevo.**

1. **Penolakan pembayaran memperbarui status dan kuota sesuai aturan.**

1. **Pengiriman ulang tidak menghasilkan tiket baru.**

1. **Bendum hanya melihat rekap pendapatan, bukan data pribadi peserta.**

1. **Status agenda dan tiket harus jelas: Draft, Published, Pending, Approved, Rejected, Issued, Sold Out, dan selesai.**

**prd\_master.md**

## **F. Konfirmasi 06.4.9**

**Apakah setuju dengan struktur Agenda Management ini?**

# **06.4.10 — Attendance & QR/Barcode Check-in (ATT)**

**4 Screen · Usulan baseline**

**Tujuan: mengelola kehadiran peserta agenda melalui QR/Barcode, termasuk check-in manual dan pencatatan riwayat kehadiran.**

## **A. Struktur 4 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **ATT-01** | **Check-in Dashboard** | **Ringkasan kehadiran** |
| **ATT-02** | **Barcode/QR Scanner** | **Pemindaian tiket** |
| **ATT-03** | **Daftar Kehadiran** | **Daftar peserta hadir dan belum hadir** |
| **ATT-04** | **Detail/Manual Check-in** | **Detail peserta dan check-in manual** |

**prd\_master.md**

## **B. Detail halaman**

**ATT-01 — Check-in Dashboard**

[<u>**Eventpack: Seamless On-Site Event Management Platform**</u>](https://images.openai.com/static-rsc-4/uQD2YSIpeutjF6SZqgPPhwYya6-qufh12zhH3cJeNYOxkQX9qFTxsuBpze3oDUXa4Ovng74t25FtTQiHQah5VQGpWq9hacvZdQaYqH9lHJTwVvJ55TkjMEhTnSOygh0VXEQEY2uYAai8LbKJ5oyZOBsdy2sRi2jpWQQw_x5iT3c?purpose=inline)

[<u>**eventpack.com**</u>](https://www.eventpack.com/?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama agenda.**

- **Total registrasi valid.**

- **Total tiket diterbitkan.**

- **Total hadir.**

- **Belum hadir.**

- **Pemeriksaan gagal jika dicatat.**

**Tombol utama:**

- **Buka Scanner.**

- **Daftar Kehadiran.**

**ATT-02 — Barcode/QR Scanner**

[<u>**Use the Quicket Access Control mobile scanning app**</u>](https://images.openai.com/static-rsc-4/aJEkn0q2u9lmpJ3a38NxWllyMPvTAhAk5oIBf-AsV4kv0n6wOBOkcxvIjHWTwIWGZU4B-33WCWYg_ZtzwBqzGy_kEAsw-WTaRH7C98WidqB48Q1b9HP14dGkqATTE641knKG3Wp1-IgRlvepWUeujz-7_duSVRt5h9VWDcXOU5E?purpose=inline)

[<u>**help.quicket.com**</u>](https://help.quicket.com/portal/en/kb/articles/quicket-access-control?utm_source=chatgpt.com)

**Komponen:**

- **Kamera scanner.**

- **Petunjuk pemindaian.**

- **Hasil validasi.**

- **Identitas peserta secukupnya.**

- **Jenis tiket.**

- **Tombol Scan Berikutnya.**

**Hasil pemindaian:**

| **Kondisi** | **Hasil** |
| --- | --- |
| **Tiket valid** | **Berhasil check-in** |
| **Sudah digunakan** | **Ditolak** |
| **Tiket dicabut** | **Ditolak** |
| **Tiket tidak ditemukan** | **Ditolak** |
| **Bukan agenda tersebut** | **Ditolak** |
| **Kamera gagal** | **Tampilkan bantuan** |
| **Koneksi terganggu** | **Tampilkan pemulihan** |

**ATT-03 — Daftar Kehadiran**

[<u>**Event Reception Management and Checkin | Eventmaker**</u>](https://images.openai.com/static-rsc-4/xiIUS1o2hjzv2NGApsAuHliGGnvy-MxnTjkffGc85k4LFMFEV389KmoL21l58ttFSmH3_olV1cil1hF9H66fjoMov1etc-E_Ej11FXlPftP73tSZ6wnYL0cCXbVgsOSxWPWoltmhk7BonqZTLrhRRr8ZpJThOHAK3JrhXb6lD3U?purpose=inline)

[<u>**eventmaker.com**</u>](https://www.eventmaker.com/en/features/event-management/checkin/?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama peserta.**

- **Jenis tiket.**

- **Status kehadiran.**

- **Waktu check-in.**

- **Metode check-in.**

**Fitur:**

- **Tab Hadir.**

- **Tab Belum Hadir.**

- **Filter jenis tiket.**

- **Pencarian peserta.**

- **Detail peserta.**

- **Export CSV sesuai Permission.**

**ATT-04 — Detail/Manual Check-in**

**Menampilkan:**

- **Identitas registrasi.**

- **Informasi tiket.**

- **Status check-in.**

- **Catatan.**

- **Riwayat aktivitas.**

**Petugas yang memiliki Permission dapat melakukan check-in manual melalui pencarian registrasi yang valid.**

**Sistem mencatat waktu, identitas petugas, dan alasan jika diperlukan.**

**prd\_master.md**

## **C. Business Flow**

**Peserta datang ke lokasi agenda**

**Petugas membuka Scanner**

**Scan QR/Barcode tiket**

**Valid**

**Check-in berhasil**

**Status menjadi Hadir**

**Tidak valid**

**Check-in ditolak**

**Tampilkan alasan**

**Daftar Kehadiran diperbarui**

**Riwayat kehadiran tersimpan**

**Jika QR tidak dapat dipindai, petugas berizin dapat menggunakan Manual Check-in melalui ATT-04.**

## **D. Aturan penting**

1. **Satu tiket hanya boleh digunakan untuk satu kali check-in.**

1. **Tiket yang sudah digunakan tidak boleh mencatat kehadiran kedua.**

1. **Check-in hanya berlaku untuk agenda yang sesuai.**

1. **Check-in manual hanya untuk petugas berizin.**

1. **Setiap check-in harus menyimpan waktu dan identitas petugas.**

1. **Kehadiran sah dapat terhubung dengan profil kader setelah identitas kader tervalidasi.**

1. **Registrasi saja tidak dihitung sebagai kehadiran.**

1. **Tidak boleh menjanjikan fitur offline dengan sinkronisasi otomatis karena kemampuan tersebut belum ditetapkan.**

**prd\_master.md**

## **E. Permission**

| **Pengguna** | **Akses** |
| --- | --- |
| **Event Lead** | **Mengelola check-in agenda** |
| **Ticketing Admin** | **Mengelola check-in sesuai penugasan** |
| **Check-in Staff** | **Scan dan mencatat kehadiran** |
| **Penyelenggara** | **Monitoring kehadiran sesuai agenda** |
| **Bendum** | **Tidak mendapat akses data pribadi peserta hanya karena jabatan Bendum** |

## **F. Tampilan Mobile**

**Mobile-first untuk Scanner**

- **Scanner menjadi tampilan kamera utama.**

- **Hasil scan muncul langsung.**

- **Tombol Scan Berikutnya mudah dijangkau.**

- **Bukti hasil scan menggunakan indikator warna dan teks.**

- **Jika koneksi terputus, sistem menampilkan pesan dan jalur pemulihan yang aman.**

**Tidak perlu membuat screen tambahan khusus mobile.**

## **G. Konfirmasi 06.4.10**

**Menurutku empat screen ini sudah mencakup seluruh kebutuhan Attendance tanpa menambah halaman yang tidak diperlukan.**

**Apakah setuju dengan baseline Attendance?**

**A**

**06.4.10 ATT — RESMI DIKUNCI**

**ATT-01 sampai ATT-04 resmi ditetapkan sebagai baseline Attendance & QR/Barcode Check-in.**

**Ketentuan check-in satu kali, validasi tiket, check-in manual, dan integrasi riwayat kehadiran kader dipertahankan.**

# **06.4.11 — Documents & LPJ (DOC)**

**6 Screen · Usulan baseline**

**Tujuan modul ini adalah memusatkan pengelolaan dokumen organisasi, riwayat versi, LPJ, dan arsip.**

## **A. Struktur 6 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **DOC-01** | **Document Center** | **Pusat daftar dokumen** |
| **DOC-02** | **Tambah/Edit Dokumen** | **Form dokumen** |
| **DOC-03** | **Detail & Riwayat Dokumen** | **Informasi dan versi dokumen** |
| **DOC-04** | **LPJ Management** | **Daftar dan monitoring LPJ** |
| **DOC-05** | **Detail/Edit LPJ** | **Pengisian dan pemeriksaan LPJ** |
| **DOC-06** | **Document Archives** | **Arsip dokumen** |

**prd\_master.md**

## **B. Detail masing-masing halaman**

**DOC-01 — Document Center**

[<u>**Signify Reviews 2026: Details, Pricing, & Features | G2**</u>](https://images.openai.com/static-rsc-4/B2g7h8hg09s79IVQaz0TO-SBo5vNKTL2cWSEenShCFBAF8WJIPgB1XmnoOVNPJdgB7pPV1KenUUzQB0hIsk7i7HraDTXQHMuSK6ISFwtk69ao2q-X_i2yHL5SG4WjkMuzpy8qSDsneC_-R-8fB-_3fpwVcuKgrelTAXzjwpdf_s?purpose=inline)

[<u>**g2.com**</u>](https://www.g2.com/products/signify-signify/reviews?utm_source=chatgpt.com)

**Menampilkan:**

- **Judul dokumen.**

- **Kategori.**

- **Pemilik.**

- **Sumber dokumen.**

- **Versi.**

- **Tanggal.**

- **Status.**

**Fitur: Tambah, Cari, Filter, dan Detail.**

**DOC-02 — Tambah/Edit Dokumen**

[<u>**Upload document UI by Kenny Tran on Dribbble**</u>](https://images.openai.com/static-rsc-4/gGL6LAW1PhuVU6HyMo_a5grR8ofFGYGS4X3tF81S6hTiTY8kp1aYHuIjN5w4CGHlADd2zAVPUdCam-oOtbialB1vRdtaZrw_mdrmLQIRv4CEQuKw49Vxj_3U3vQdFNpLncVwLLRuZvOiUrhbg885FgMKmkLdRgIbClOOLUOORMo?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26024875-Upload-document-UI?utm_source=chatgpt.com)

**Form berisi:**

- **Judul.**

- **Kategori.**

- **Keterangan.**

- **Pemilik.**

- **Sumber dokumen (URL atau unggahan sesuai jenis).**

- **Relasi kegiatan/Proker jika ada.**

**Catatan: Pengajuan surat tetap menggunakan URL dokumen. Tidak boleh mewajibkan upload Word/PDF.**

**DOC-03 — Detail & Riwayat Dokumen**

[<u>**Document Management System - Docs**</u>](https://images.openai.com/static-rsc-4/_swBVFALoZF62oY7nuKomiWYymtdIH_VfEc-GkiV8oPpRzHWEmfzKBUwW5C4yG8yGyZTPrJ3-txYe7pssDO74OqKFFCl4hEaeVEGNx8pRJVAo87E3bXO2W2ZQycG2HKDA8M_7lCF5mGe2d6Ezm9aO7JFDoK5EdYMXn1VVWOzY74?purpose=inline)

[<u>**docs.mlglobtech.com**</u>](https://docs.mlglobtech.com/doc-mgt?utm_source=chatgpt.com)

**Menggunakan empat tab:**

1. **Informasi.**

1. **Dokumen.**

1. **Riwayat Versi.**

1. **Relasi.**

**Setiap perubahan dokumen final harus mempertahankan versi yang sebelumnya digunakan untuk persetujuan.**

**DOC-04 — LPJ Management**

[<u>**LinkSpace features in detail | Ctrl O Ltd**</u>](https://images.openai.com/static-rsc-4/OmpV4r66TuJ8hGbVTVHNtc3NsOJahI3ODjvNRDb4FgTpriuUmJ_10ydJ4inj6FqbysT-VE0EKAFXHRbgyB7WnLeqps2kM3XQbMVxlEg2iCttKOvanP3HamaxOjqjz2QjX8nzdB4uhJHlIqbMno4UdW6_waY0UTNywPkqE3wx8fA?purpose=inline)

[<u>**ctrlo.com**</u>](https://www.ctrlo.com/details?utm_source=chatgpt.com)

**Menampilkan daftar LPJ berdasarkan:**

- **Nama Proker.**

- **Pemilik.**

- **Status.**

- **Periode.**

- **Kelengkapan.**

- **Tindakan.**

**Pengguna dapat membuat atau membuka LPJ sesuai Permission.**

**DOC-05 — Detail/Edit LPJ**

[<u>**Het Groeiportaal | Home**</u>](https://images.openai.com/static-rsc-4/r1-Jerxj7J3yu5u6tVpJBwfvUuXkZQn5IPZwJj3dc-NRRtcJjnhr6FdkhoCDUkAF9bVH_ZF0HglAjU4F6_HJaC2BG9z1xfpGd33cCVfp_dJqn-I7ocJfHQeYHqq9aqz2wROSyiGt_RqgfHmd54MAw65zhuvOocOrlW4cqrwbMRg?purpose=inline)

[<u>**groeiportaal.nl**</u>](https://groeiportaal.nl/en/?utm_source=chatgpt.com)

**Form LPJ menggunakan tujuh bagian:**

1. **Identitas Proker.**

1. **Ringkasan Kegiatan.**

1. **Pelaksanaan.**

1. **Peserta/Kehadiran.**

1. **Ringkasan Keuangan.**

1. **Dokumentasi.**

1. **Evaluasi dan Kesimpulan.**

**Data yang sudah tersedia di sistem diambil dari sumbernya, sehingga tidak perlu diinput ulang.**

**Fitur:**

- **Simpan Draft.**

- **Submit LPJ.**

- **Review.**

- **Catatan revisi.**

- **Persetujuan sesuai kewenangan.**

**DOC-06 — Document Archives**

[<u>**GED Doc Virtual | Software de Gestão Eletrônica de Documentos com IA e LGPD**</u>](https://images.openai.com/static-rsc-4/-GDiLnH1zsbT1ezNQlRMyte9I3ikHRLKNGRWlKOF2lYhoAEoJdAxv3uN6pWlsyWL6YtKr16mCTRWRNZ_UQOIN2pqNg5NKHgMqJnmn9uIXowgMLm7A_7JaW50h2RJY139MCnTbQHLDXYvct_kT_0d7Pot67vQjGoqnTQ-8DgTZzQ?purpose=inline)

[<u>**docvirtual.com.br**</u>](https://www.docvirtual.com.br/pages/ged/?utm_source=chatgpt.com)

**Arsip dapat difilter berdasarkan:**

- **Kabinet.**

- **Bidang.**

- **Kompartemen.**

- **Proker.**

- **Periode.**

**Dokumen historis tetap tersimpan dan dapat dibuka sesuai Permission.**

**prd\_master.md**

**prd\_master.md**

## **C. Business Flow LPJ**

**Proker selesai dilaksanakan**

**Pengelola Proker menyusun LPJ**

**Simpan Draft / Submit**

**Reviewer berwenang memeriksa**

**Perlu Revisi**

**Pengelola memperbaiki LPJ yang sama.**

**Approved**

**LPJ disetujui dan tersimpan.**

**Arsip LPJ**

## **D. Aturan Permission**

| **Pengguna** | **Kewenangan** |
| --- | --- |
| **Pengelola Proker** | **Menyusun dan mengirim LPJ** |
| **Kepala Kompartemen** | **Mengelola sesuai kewenangan** |
| **Reviewer yang ditunjuk** | **Memeriksa dan memberikan keputusan** |
| **Sekum** | **Mengakses administrasi sesuai Permission** |
| **Bendum** | **Monitoring informasi keuangan** |
| **Top Management** | **Monitoring sesuai scope** |

**Penting**

**Bendum tidak otomatis mempunyai kewenangan menyetujui atau menutup LPJ hanya karena memiliki jabatan Bendum. Persetujuan LPJ mengikuti reviewer yang ditunjuk.**

## **E. Ketentuan tambahan**

1. **Dokumen final tidak boleh kehilangan histori versinya.**

1. **LPJ terhubung dengan data kegiatan dan keuangan.**

1. **Ringkasan keuangan tidak boleh menggandakan transaksi.**

1. **Dokumen yang sudah diarsipkan tetap dapat ditelusuri.**

1. **URL rusak, file tidak ditemukan, versi berubah, dan akses tidak diizinkan harus memiliki pesan kesalahan yang jelas.**

1. **Tampilan mobile menggunakan section vertikal; form LPJ panjang dibagi per bagian.**

**prd\_master.md**

## **F. Konfirmasi 06.4.11**

**Menunggu persetujuan**

**Menurutku enam screen ini sudah cukup. Tidak perlu membuat halaman terpisah untuk setiap bagian LPJ atau setiap versi dokumen.**

**Apakah setuju dengan baseline Documents & LPJ?**

**06.4.11 DOC — RESMI DIKUNCI**

**DOC-01 sampai DOC-06 resmi menjadi baseline Documents & LPJ.**

**Ketentuan LPJ, histori dokumen, revisi, reviewer, dan arsip dipertahankan.**

# **06.4.12 — Organization Directories (DIR)**

**8 Screen · Usulan baseline**

**Tujuan modul ini adalah menyediakan satu pusat database organisasi untuk kader, bisnis kader, perusahaan, sponsor, mitra, dan riwayat kerja sama.**

## **A. Struktur 8 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **DIR-01** | **Database Kader** | **Daftar seluruh kader** |
| **DIR-02** | **Detail/Edit Kader** | **Profil dan riwayat kader** |
| **DIR-03** | **Verifikasi & Penautan Kader** | **Verifikasi identitas dan akun** |
| **DIR-04** | **Database Bisnis Kader** | **Daftar usaha kader** |
| **DIR-05** | **Detail & Verifikasi Bisnis** | **Review dan publikasi usaha** |
| **DIR-06** | **Database Perusahaan/Sponsor/Mitra** | **Database relasi eksternal** |
| **DIR-07** | **Detail/Edit Perusahaan** | **Profil dan kontak perusahaan** |
| **DIR-08** | **Database Riwayat Kerja Sama** | **Histori kerja sama organisasi** |

**prd\_master.md**

## **B. Detail halaman**

**DIR-01 — Database Kader**

**Menampilkan:**

- **Nama kader.**

- **NIM.**

- **Tingkatan.**

- **Status kader.**

- **Status akun terhubung.**

- **Kabinet dan jabatan jika relevan.**

**Fitur: Tambah, Cari, Filter, Detail.**

**DIR-02 — Detail/Edit Kader**

[<u>**BOMA San Diego**</u>](https://images.openai.com/static-rsc-4/6ujewdZglPPJ258ADXKoNjdajQDtdWyX6K5DRVBsRLtgOFAaxErmjSrik_proGE8LS2b4gATlapQhigFqtogey64hz8ZOG5RrnywTwB0hVEMrEUKUolD7Cm2ZoV6A_XAsBXioaAs6fVGkTFxeLy0WU7Jz7nMwfaYxXRvhMe6bz8?purpose=inline)

[<u>**bomasd.org**</u>](https://www.bomasd.org/directory_instructions?utm_source=chatgpt.com)

**Menggunakan tujuh tab:**

1. **Identitas.**

1. **Keanggotaan.**

1. **Jabatan.**

1. **Proker.**

1. **Agenda.**

1. **Bisnis.**

1. **Riwayat.**

**Riwayat jabatan dan keikutsertaan Proker harus tetap tersimpan meskipun kabinet atau periode sudah berakhir.**

**DIR-03 — Verifikasi & Penautan Kader**

[<u>**Biometric Authentication, passwordless 2FA at $0.10 | Didit**</u>](https://images.openai.com/static-rsc-4/ARTh7aQyk6mEHIoxHmwVU6Jnus29y1aE1K6X4FCoDaKXTklRpqkf_tRywRVT_DgXGMQTTxE5S4KMh0lJb_RM4MnCTPZeDeC6AYyUwIb-iVIOTIw1on88Qj9E5RQ5Uw1cC_HV6v5lVB46B-6Qp0LTCevHaYjonVfhf_SJtkl8EBE?purpose=inline)

[<u>**didit.me**</u>](https://didit.me/products/biometric-authentication/?utm_source=chatgpt.com)

**Alur:**

1. **Sistem mencari kecocokan NIM.**

1. **Admin memeriksa identitas.**

1. **Admin melakukan verifikasi.**

1. **Akun ditautkan setelah kepemilikan identitas dipastikan.**

**Aturan penting**

**NIM yang cocok tidak otomatis berarti identitas sudah terverifikasi. Koreksi NIM juga tidak dapat dilakukan langsung oleh pengguna; dilakukan melalui Admin setelah pemeriksaan.**

**DIR-04 — Database Bisnis Kader**

[<u>**ListifyPro – Laravel Business Directory, Service Booking & Vendor Marketplace by clustercoding**</u>](https://images.openai.com/static-rsc-4/cQvoLyEZ17qSi-3JWx4IlHtmDBkpiNZvsqHgJMA4ieu-1A7Q-2Z_N_h6hTno-1tT_bBFThC2RhBUMNXv4EgR1WbFA8dZ4Sr0v3zqcvhD4TJQHKUg-2ktyupVR__e5mkwH8zcdn-Dat5DnnbJSxMKl8eLATiQN2NIpC4ST0a81-8?purpose=inline)

[<u>**codecanyon.net**</u>](https://codecanyon.net/item/business-directory-pro/20446795?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama usaha.**

- **Pemilik.**

- **Kategori.**

- **Tanggal pengajuan.**

- **Status pemeriksaan.**

- **Status publikasi.**

**DIR-05 — Detail & Verifikasi Bisnis**

[<u>**Yext AI | Agentic Execution Across Every Channel | Yext**</u>](https://images.openai.com/static-rsc-4/GE4yclJT_rgR52mDX6gzHP94LiMXv2IeW3z79ed90j5lIcaJakdo0cVtI8k63qDZpsOJlls5vp4BOgR6yMNNheLeSAJme4rekRrIGUEkheH-rvaMsKFqGIby-XqTXQeBlxYnT08bIfUUQ-Qsspa2hoyiHZNLmbfWjb7oNKm3PmY?purpose=inline)

[<u>**yext.com**</u>](https://www.yext.com/platform/yext-ai?utm_source=chatgpt.com)

**Menampilkan:**

- **Informasi usaha.**

- **Foto.**

- **Kontak.**

- **Riwayat perubahan.**

- **Catatan pemeriksaan.**

**Tindakan:**

- **Setujui.**

- **Minta Revisi.**

- **Tolak.**

- **Publish.**

**Persetujuan dan publikasi merupakan dua tindakan berbeda. Catatan internal reviewer tidak boleh ditampilkan kepada publik.**

**DIR-06 — Database Perusahaan/Sponsor/Mitra**

[<u>**Launching a new path for partnerships | Suger**</u>](https://images.openai.com/static-rsc-4/7rqgHDdC3wkmCrDT24XqnUl9PmqMdINIet_txwfTEuGpxIxawjOZuZtryqKpoH94GjmK1UeV5rQA2LbDSeUdz664tc9qEAq34veH9qtzpoQO1ZsZyAuwkcPJ2ZwUvDgry2x0Y4g1IEa7JCfHj5YVBer-EoY6bHsNiHEh2YzjwlE?purpose=inline)

[<u>**suger.io**</u>](https://www.suger.io/resources/blog/partner-relationship-management/?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama perusahaan.**

- **Kategori.**

- **Industri.**

- **Kontak resmi.**

- **PIC sesuai Permission.**

- **Status relasi.**

- **Tanggal pembaruan.**

**Seluruh pengurus dapat memperoleh akses membaca sesuai keputusan organisasi. Pengelolaan dilakukan Bidang Eksternal/Partnership atau pihak dengan Permission khusus.**

**DIR-07 — Detail/Edit Perusahaan**

[<u>**Sharaka 360 — Corporate Partnership Management System**</u>](https://images.openai.com/static-rsc-4/w1-kGSNY7uhon-_I-tQ4u5Vu15hghcPDj4OfzB454GCSg3SLfR4EA4YdOZQYGeJGVoLp-hi2cz7mCYcDERLegZXCzmDhuZFkrZ4fgXlVMU8oLeX6bCofmLM2S4R3iGPUnm4eIkorgVHDPB-GHC4-YOLoymtA7YQa_oQvGtzFT7Y?purpose=inline)

[<u>**sharaka360.com**</u>](https://sharaka360.com/?utm_source=chatgpt.com)

**Bagian halaman:**

1. **Profil Perusahaan.**

1. **Kontak.**

1. **PIC.**

1. **Informasi kerja sama.**

1. **Proker/agenda terkait.**

1. **Riwayat interaksi.**

**Kontak privat hanya tersedia bagi pengguna yang memiliki Permission. Pengelolaan dan perubahan data dilakukan Partnership.**

**DIR-08 — Database Riwayat Kerja Sama**

[<u>**GAIA Global B2B Partner Relationship Management for the energy and maritime industries.**</u>](https://images.openai.com/static-rsc-4/xkB_EI86RDHaoAwUbClTahiI1IwonHymxhM8x06ga2vsWcVjOQXO0htQsOdJr0bfyR8CkQEjEczRmxcj94U3Pyg7dwArR7luLY8mh01J965DeLH5jhqe3kk3QNYL6Mc8OprnbWXNDBf6zUioH-M3xr9DQTZUnIpQDcJJaZCmRPs?purpose=inline)

[<u>**gaia.global**</u>](https://gaia.global/platform?utm_source=chatgpt.com)

**Menampilkan:**

- **Nama perusahaan.**

- **Unit atau Proker terkait.**

- **Riwayat kerja sama.**

- **Catatan interaksi.**

- **Tanggal kegiatan.**

- **Status relasi.**

**Tersedia fitur Lihat Riwayat dan Tambah Catatan sesuai Permission.**

**prd\_master.md**

## **C. Struktur navigasi sederhana**

**ORGANIZATION DIRECTORIES**

**Database Kader**

**DIR-01 · DIR-02 · DIR-03**

**Bisnis Kader**

**DIR-04 · DIR-05**

**Perusahaan & Mitra**

**DIR-06 · DIR-07 · DIR-08**

## **D. Aturan yang harus dipertahankan**

1. **Database Kader hanya satu sumber data. Admin Sistem dan PSDM dengan Permission khusus mengelola database yang sama.**

1. **NIM menjadi identitas pencocokan, tetapi bukan bukti verifikasi otomatis.**

1. **Riwayat jabatan tidak boleh hilang ketika kabinet berakhir.**

1. **Bisnis kader harus melalui pemeriksaan sebelum dipublikasikan.**

1. **Persetujuan bisnis berbeda dari publikasi.**

1. **Data perusahaan tidak boleh diduplikasi ketika terjadi pembaruan.**

1. **Sistem memberikan peringatan jika menemukan kandidat data perusahaan yang sama.**

1. **Penggabungan data harus mempertahankan histori.**

1. **Tidak perlu membuat sistem kontrak sponsorship baru pada modul ini.**

**prd\_master.md**

**Catatan integrasi: pengelolaan dan publikasi Prestasi Kader tetap berada di CMS, bukan dibuat ulang sebagai fitur pengelolaan DIR.**

## **E. Tampilan Mobile**

- **Database menggunakan kartu atau tabel yang dapat digulir.**

- **Detail kader menggunakan tab vertikal.**

- **Form bisnis dan perusahaan satu kolom.**

- **Verifikasi menggunakan tampilan sederhana.**

- **Riwayat kerja sama menggunakan timeline.**

## **F. Konfirmasi 06.4.12**

**Menunggu persetujuan**

**Menurutku delapan screen ini sudah mencakup kebutuhan direktori organisasi tanpa perlu menambah halaman lagi.**

**06.4.12 DIR — RESMI DIKUNCI**

**DIR-01 sampai DIR-08 resmi ditetapkan sebagai baseline Organization Directories.**

**Database Kader, Bisnis Kader, Perusahaan/Mitra, dan Riwayat Kerja Sama menjadi satu modul direktori dengan sumber data yang terintegrasi.**

# **06.4.13 — CMS & Content Management**

**13 Screen · Usulan baseline**

**Tujuan: mengelola seluruh konten publik HIPMI CENTRAL serta pengelolaan internal Media Partner dan Kotak Suara.**

## **A. Struktur 13 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **CMS-01** | **CMS Dashboard** | **Ringkasan aktivitas konten** |
| **CMS-02** | **Homepage & Public Content Editor** | **Mengelola konten beranda** |
| **CMS-03** | **Media Library** | **Mengelola gambar dan media** |
| **CMS-04** | **Berita/Artikel Management** | **Daftar berita dan artikel** |
| **CMS-05** | **Article Editor** | **Menulis dan menerbitkan artikel** |
| **CMS-06** | **Prestasi Kader Management** | **Mengelola data prestasi** |
| **CMS-07** | **Form & Verifikasi Prestasi** | **Memeriksa dan memublikasikan prestasi** |
| **CMS-08** | **Medpart Management** | **Daftar pengajuan Medpart** |
| **CMS-09** | **Detail/Verifikasi Medpart** | **Memeriksa pengajuan dan pembayaran** |
| **CMS-10** | **Medpart Package & QRIS Configuration** | **Mengelola paket dan QRIS** |
| **CMS-11** | **Medpart Publication** | **Publikasi Media Partner** |
| **CMS-12** | **Kotak Suara Management** | **Daftar masukan privat** |
| **CMS-13** | **Detail & Tindak Lanjut Kotak Suara** | **Pengelolaan tindak lanjut** |

**prd\_master.md**

## **B. Struktur navigasi**

**CMS & CONTENT MANAGEMENT**

**1. Content Management**

- **CMS Dashboard**

- **Homepage Editor**

- **Media Library**

- **Berita & Artikel**

- **Prestasi Kader**

**2. Media Partner Management**

- **Daftar Pengajuan**

- **Verifikasi Medpart**

- **Paket & QRIS**

- **Publikasi Medpart**

**3. Private Kotak Suara**

- **Daftar Masukan**

- **Detail & Tindak Lanjut**

## **C. Detail halaman**

**CMS-01 — CMS Dashboard**

[<u>**Diggama - The Headless CMS for Modern Teams**</u>](https://images.openai.com/static-rsc-4/zuE0-vjA9pJAuIFXItDn2j52MILYsdCZiXcVZLS0GBEFvdrEabcfdw3GdZCKxNkPum1uIkWo_C8WH9UqcWR67jLxjqwLi7oSDfjhJe7DxXNZ4vRfiDJmvBiFxjDsVl2kg15X1J7_ppqzRmJLU7uEQFo5vCcgOeLRN8Dr7So6qBQ?purpose=inline)

[<u>**diggama.com**</u>](https://diggama.com/?utm_source=chatgpt.com)

**Menampilkan:**

- **Jumlah berita dan artikel.**

- **Prestasi kader.**

- **Pengajuan Medpart.**

- **Konten Draft dan Published.**

- **Aktivitas terbaru.**

- **Daftar pekerjaan yang membutuhkan tindakan.**

**CMS-02 — Homepage & Public Content Editor**

[<u>**What is a static site CMS? (5 benefits) | Storyblok Blog**</u>](https://images.openai.com/static-rsc-4/P4i1pVBqQd8CbPkr4RYfSJbChs0njVGXQ33-7QEB6fBFgCztGoj5FKSShepaULMDrX2r-90DVsRSl775P0sAjZM2Ow7dYAFT21Zw-irmq1AW0HTFNhBsQCo-TxDvfgyYwBbKe8c9wwW5_fO0JfkFqIXfDKz-D_rbU05NSuWuDX8?purpose=inline)

[<u>**storyblok.com**</u>](https://www.storyblok.com/mp/static-site-cms?utm_source=chatgpt.com)

**Fitur:**

- **Mengubah section beranda.**

- **Mengelola banner.**

- **Mengatur konten editorial.**

- **Preview desktop/mobile.**

- **Publish konten.**

**CMS-03 — Media Library**

[<u>**The New Cloudimage 2025 is here**</u>](https://images.openai.com/static-rsc-4/HVhxL_m7NXV91a1ia-AINosPxXCWLTp-9Yv_C98jgIWmJLdYUBw6cdufeV381hrErYw0S3xtIDqkGWLWE5PLCTLXMoVdZ8rZSQXIbIZIykbcH6cejuC9DemH6sdsESMaOKnuaV5_HCer-rw3uPPqb0OgDccrOztHouqlN3CHHPE?purpose=inline)

[<u>**cloudimage.io**</u>](https://www.cloudimage.io/new-q3-2025?utm_source=chatgpt.com)

**Mengelola:**

- **Gambar.**

- **Poster.**

- **Foto kegiatan.**

- **Media artikel.**

- **Aset publikasi.**

**Tersedia Tambah Media, Pilih Media, dan Arsip sesuai Permission.**

**CMS-04 — Berita/Artikel Management**

**Menampilkan tabel:**

- **Judul.**

- **Kategori.**

- **Penulis.**

- **Tanggal.**

- **Status publikasi.**

**Tersedia Tambah Artikel, Detail, Pencarian dan Filter.**

**CMS-05 — Article Editor**

[<u>**Blog CMS — Article Page Builder UI by Endi on Dribbble**</u>](https://images.openai.com/static-rsc-4/qotRY1Al0hwdsGE77fe93eU1NwU-ysv19pHfQpbeVhzAFISGtqH3bHog-p0c-bGsAndRSUGE5RW_9nhACuiVnsqYxZ03JTz7EiIC8t8vyLbWOsdSliqII3smumFnGnS5W6DwdvQ07tU1BmK3kA6ZIAt-jF_7pAr0ipEz1p_tOX4?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/26453356-Blog-CMS-Article-Page-Builder-UI?utm_source=chatgpt.com)

**Editor berisi:**

- **Judul.**

- **Slug.**

- **Isi artikel.**

- **Cover.**

- **Kategori.**

- **URL sumber.**

- **Metadata SEO.**

**Tombol: Simpan Draft, Preview, Publish.**

**CMS-06 — Prestasi Kader Management**

**Menampilkan daftar prestasi:**

- **Nama kader.**

- **Judul prestasi.**

- **Kategori.**

- **Tingkat prestasi.**

- **Tanggal.**

- **Status verifikasi.**

- **Status publikasi.**

**Satu prestasi dapat melibatkan beberapa kader.**

**CMS-07 — Form & Verifikasi Prestasi**

[<u>**Certifi | Refreshingly Simple Compliance Software | mmtm**</u>](https://images.openai.com/static-rsc-4/4q1FJCRDg8Dr2Y23XqcRsKvotzikQ6HGHw5Oixj2mJFL9FH-fU_DydS24LfxTNYidJGjkDfacqBuZR2-wY7UViulXzPVaLVl6JvBze99VOYlf98zv72XvkduK21u5fbu0sR9EceAHWepalWD4XbQMuwVPdYASFDXpVfN2eSFYo4?purpose=inline)

[<u>**mmtm.io**</u>](https://mmtm.io/case_studies/certifi?utm_source=chatgpt.com)

**Informasi:**

- **Kader terkait.**

- **Judul prestasi.**

- **Kategori dan tingkat.**

- **Tanggal.**

- **Deskripsi.**

- **Dokumentasi.**

**Tindakan:**

- **Review.**

- **Minta Revisi.**

- **Setujui.**

- **Publish.**

**Keputusan integrasi**

**Prestasi Kader dikelola melalui CMS, sedangkan database profil dan riwayat kader tetap terhubung dengan DIR.**

**Prestasi yang sudah Published dapat ditampilkan di halaman publik Karya Kader.**

**CMS-08 — Medpart Management**

**Menampilkan:**

- **Total pengajuan.**

- **Medpart gratis.**

- **Medpart berbayar.**

- **Pengajuan menunggu pemeriksaan.**

- **Pengajuan selesai.**

- **Pengajuan ditolak.**

**CMS-09 — Detail/Verifikasi Medpart**

[<u>**Wobb Price, Features, Reviews & Ratings - Capterra India**</u>](https://images.openai.com/static-rsc-4/px8mVX1Z2QMobOdVFWAi8-5mg3hIsvy8zKZnCRrAYCTr5qByJK3CJ6LL95sWw3Cvxh8alcyqtXu0b6onTnDoK9zO2Uws_gX9LKLi8_UGtJ9TLcJRhwB-bNZ8N57sHr3QATV5c0VLZZHqY1Rea93V3RDBIzHia3Rgxr0Z2btp-vo?purpose=inline)

[<u>**capterra.in**</u>](https://www.capterra.in/software/1050565/wobb?utm_source=chatgpt.com)

**Menampilkan:**

- **Identitas pengaju.**

- **Informasi kegiatan.**

- **Paket Medpart.**

- **Bukti pembayaran jika berbayar.**

- **Dokumentasi.**

- **Riwayat pemeriksaan.**

**Tindakan:**

- **Periksa Bukti.**

- **Minta Revisi.**

- **Setujui.**

- **Tolak.**

**Pemeriksaan bukti pembayaran dilakukan oleh Medkom sesuai Permission, bukan Bendum. Bendum memperoleh rekap pendapatan saja.**

**CMS-10 — Medpart Package & QRIS Configuration**

**Mengelola:**

- **Nama paket.**

- **Ketentuan.**

- **Harga.**

- **QRIS.**

- **Periode berlaku.**

- **Riwayat perubahan paket.**

**Konfigurasi QRIS tidak otomatis berarti integrasi payment gateway.**

**CMS-11 — Medpart Publication**

[<u>**Top 15 Hootsuite Alternatives to Consider in 2026 | Sprout Social**</u>](https://images.openai.com/static-rsc-4/mPcHjNyMpVSqloT5a3muyhA-ZuRR2NkGmBQ1tTpY9ugMfd9-oUs-OY3M-0eqSrjIv89QhaR8IAdUtXyBXvbot49iYvCU5NdVahOFRp5bbEGizqhoBPVP3pKZztPGIl5Eorz36N7rx3ECigTi-sHoUD4FtlbJBBjKibvzzOIKJ5Y?purpose=inline)

[<u>**sproutsocial.com**</u>](https://sproutsocial.com/insights/hootsuite-alternatives/?utm_source=chatgpt.com)

**Menampilkan:**

- **Pengajuan yang siap dipublikasikan.**

- **Poster.**

- **Informasi publikasi.**

- **Status tayang.**

- **Riwayat publikasi.**

**Tindakan:**

- **Publish Manual.**

- **Unpublish sesuai Permission.**

**Publikasi dilakukan manual oleh Medkom melalui Media Komunikasi. Tidak otomatis tayang berdasarkan tanggal permintaan.**

**CMS-12 — Kotak Suara Management**

**Menampilkan:**

- **Daftar masukan.**

- **Kategori.**

- **Tanggal.**

- **Status.**

- **Ringkasan.**

- **Operator yang menangani.**

**CMS-13 — Detail & Tindak Lanjut Kotak Suara**

[<u>**GovMetric CaseTracker | Compliant Complaint Management Software**</u>](https://images.openai.com/static-rsc-4/WtEBsnm1R_wHmSqHO5W6JDrIf1Ja8gE9SQamn4NWcA7e7LgYdKOOgcZcTebRxwlLAoJDe5STg-CHAp8MN62sndGg7FMzQBXwpJa40LHzThLVtSPW5sOe7EC2nP6p3Ifctqo0SWWp46VzWDhSRsbUr8dezLdcnrb_KF03J7-zWg0?purpose=inline)

[<u>**govmetric.com**</u>](https://www.govmetric.com/casetracker?utm_source=chatgpt.com)

**Menampilkan:**

- **Isi masukan.**

- **Kategori.**

- **Catatan tindak lanjut.**

- **Status.**

- **Riwayat tindakan.**

**Operator berizin dapat:**

- **Memeriksa masukan.**

- **Mengarahkan ke unit berwenang.**

- **Memperbarui tindak lanjut.**

- **Menutup masukan setelah selesai.**

**Kotak Suara bersifat privat, bukan konten CMS publik.**

**prd\_master.md**

## **D. Business Flow**

**1. Berita dan Artikel**

**CMS Editor**

**Membuat artikel**

**Simpan Draft**

**Preview**

**Publish**

**Tampil di Website Publik**

**2. Prestasi Kader**

**Pengajuan Prestasi**

**Verifikasi**

**Setujui**

**Publish**

**Tampil di Karya Kader**

**3. Media Partner**

**Pengajuan Publik Tanpa Login**

**Kode untuk Cek Status**

**Pemeriksaan Medkom**

**Verifikasi Pembayaran jika Berbayar**

**Persetujuan**

**Publikasi Manual**

**Selesai**

**4. Kotak Suara**

**Masukan Publik**

**Masuk ke Sistem Privat**

**Operator Memeriksa**

**Tindak Lanjut ke Unit Berwenang**

**Selesai / Ditutup**

## **E. Aturan penting**

1. **Content Creator dan Publisher merupakan Permission yang berbeda.**

1. **Pengurus yang memiliki kedua Permission boleh memublikasikan kontennya sendiri.**

1. **Prestasi Kader memiliki proses verifikasi dan publikasi tersendiri.**

1. **Pengajuan Medpart tidak wajib login.**

1. **Status pengajuan Medpart dapat diperiksa menggunakan kode.**

1. **Verifikasi pembayaran Medpart dilakukan Medkom, bukan Bendum.**

1. **Publikasi Medpart dilakukan secara manual.**

1. **Kotak Suara tidak boleh muncul pada CMS publik.**

1. **Pimpinan dapat memonitor Kotak Suara secara Read-Only sesuai scope.**

1. **Data sensitif dan identitas pengirim Kotak Suara harus dilindungi.**

## **F. Konfirmasi 06.4.13**

**Menunggu persetujuan**

**Menurutku struktur 13 screen ini sudah mencakup CMS, Prestasi Kader, Medpart, dan Kotak Suara tanpa membuat modul tambahan yang tumpang tindih.**

**Apakah setuju dengan baseline CMS-01 sampai CMS-13?**

**06.4.13 CMS — RESMI DIKUNCI**

**CMS-01 sampai CMS-13 resmi menjadi baseline CMS & Content Management.**

**Termasuk:**

- **Berita dan artikel.**

- **Homepage dan Media Library.**

- **Prestasi Kader.**

- **Media Partner.**

- **Kotak Suara privat.**

**Seluruh keputusan mengenai Content Creator, Publisher, verifikasi, dan publikasi manual tetap dipertahankan.**

**Sekarang kita masuk ke kelompok terakhir Tahap 06.4! 🎉**

# **06.4.14 — Reporting, Monitoring & Shared System (SYS)**

**9 Screen · Usulan baseline terakhir**

**Tujuan modul ini adalah menyediakan statistik organisasi, laporan, notifikasi, monitoring persetujuan, riwayat aktivitas, pencarian global, dan halaman penanganan kesalahan sistem.**

**Prinsipnya: satu pusat monitoring, data mengikuti sumber modul masing-masing, dan akses mengikuti Permission.**

## **A. Struktur 9 Screen**

| **ID** | **Nama halaman** | **Fungsi** |
| --- | --- | --- |
| **SYS-01** | **Statistics Dashboard** | **Statistik organisasi** |
| **SYS-02** | **Detailed Report Viewer** | **Melihat dan mengunduh laporan** |
| **SYS-03** | **Notification Center** | **Pusat notifikasi** |
| **SYS-04** | **Approval Center** | **Pusat daftar tindakan yang menunggu** |
| **SYS-05** | **Activity/Audit History** | **Riwayat aktivitas** |
| **SYS-06** | **Global Search Results** | **Pencarian lintas modul** |
| **SYS-07** | **Unauthorized / 403** | **Akses tidak diizinkan** |
| **SYS-08** | **Not Found / 404** | **Halaman tidak ditemukan** |
| **SYS-09** | **System Error / Unavailable** | **Gangguan sistem** |

**prd\_master.md**

## **B. Detail halaman**

**SYS-01 — Statistics Dashboard**

[<u>**AI Automation and Business Software Insights - Artifision**</u>](https://images.openai.com/static-rsc-4/vYNIQfTDD3hysk9pRj3u5wkRhy9ASEkWjdXax6Uiv09prPvprEp56EqxNKKjK6xPiw1b6-eT9YyHVrxQuomMGEJJgw3UaU-TvZH5RZfQtGE7JGGNxUlXJ4-RhcD4ySYj2cuAMfB8cr75SG4GYNu_F9zKNhK8FX8rDunE7zjDBN8?purpose=inline)

[<u>**artifision.com**</u>](https://artifision.com/insights?utm_source=chatgpt.com)

**Menampilkan statistik sesuai akses pengguna:**

- **Statistik organisasi.**

- **Statistik kabinet.**

- **Statistik Bidang.**

- **Statistik Kompartemen.**

- **Statistik Proker.**

**Filter: Kabinet, Unit, dan Periode.**

**Pengguna dapat membuka detail statistik sesuai kewenangannya.**

**SYS-02 — Detailed Report Viewer**

[<u>**Générateur de rapports PHP — Créez des rapports professionnels en quelques minutes avec Scriptcase**</u>](https://images.openai.com/static-rsc-4/3xvKJ48V8jiiZyuDUXQHy2EK7znZqeWsZNz8pTahAhtZFAvrksU37GLQMQANMTr-oCh6KKFDc_ZeWGi9B-qLta61eJFu78tNU06PUd-JFFIOV243JqR87jOJNVYh1H1IM8wztOYQ5JZ4vj2DeSn3JFTaSaSuN4uEdgR9hBLdHfA?purpose=inline)

[<u>**scriptcase.net**</u>](https://www.scriptcase.net/fr/generateur-rapport-php/?utm_source=chatgpt.com)

**Menampilkan laporan terperinci berdasarkan modul dan scope pengguna.**

**Fitur:**

- **Filter laporan.**

- **Periode.**

- **Detail data.**

- **Export.**

**Tidak membuat salinan data baru. Laporan mengambil data dari sumber modul masing-masing.**

**SYS-03 — Notification Center**

[<u>**Notifications Card - Dashboard by Leonardo Minatti on Dribbble**</u>](https://images.openai.com/static-rsc-4/F-XBSSopT-iZC0T6jkXeEU98kqpnHmNnOc7nHyv1v3VGMQPIrSW0xqoGtCMrQgoGDfmJSgQXueAmNLdJe9B-Qu5n-CPnxGo3BIWswvz2K6m7NCgU7Y2IC-XY6h8KUfLjYkr9wgFrsQblRtqYqKITK9LvhwIH1LCWX-xwtrMuq_Y?purpose=inline)

[<u>**dribbble.com**</u>](https://dribbble.com/shots/21633615-Notifications-Card-Dashboard?utm_source=chatgpt.com)

**Menampilkan:**

- **Notifikasi baru.**

- **Notifikasi sudah dibaca.**

- **Kategori.**

- **Waktu.**

- **Sumber aktivitas.**

**Tindakan:**

- **Tandai Dibaca.**

- **Buka Sumber.**

**Contoh notifikasi:**

- **Pengajuan surat perlu revisi.**

- **Pengajuan dana disetujui.**

- **Ada agenda baru.**

- **LPJ membutuhkan pemeriksaan.**

- **Ada penugasan baru.**

**SYS-04 — Approval Center**

[<u>**Approve before it becomes a problem | Elevate Approvals**</u>](https://images.openai.com/static-rsc-4/hHFYNJYAXDdF1saYej7mWkUu_3sbfaIBTG_1oj-R4DXjez_Ii9zBZXuIja8LeoQ-jNV3OKLu92UeP1ge3Xc0_Zo6SJdq_5wfQRdb0GWtY44d-hwIbXJhz9D91NC9_HnKXye6oDsNyirUNdz5dp8A1z7WpF8Gaj1KJL9S8xYMHVU?purpose=inline)

[<u>**elevateapprovals.com**</u>](https://elevateapprovals.com/?utm_source=chatgpt.com)

**Menampilkan daftar pekerjaan yang menunggu tindakan:**

- **Persuratan.**

- **Pengajuan dana.**

- **Verifikasi prestasi.**

- **Pengajuan Medpart.**

- **LPJ jika menjadi reviewer.**

**Tersedia:**

- **Filter kategori.**

- **Filter status.**

- **Buka Pengajuan.**

**Mengikuti keputusan sebelumnya**

**Approval Center hanya menjadi pusat daftar pekerjaan dan pengarah menuju modul aslinya. Tidak membuat sistem persetujuan kedua atau menggantikan kewenangan Sekum, Bendum, dan reviewer masing-masing.**

**SYS-05 — Activity/Audit History**

[<u>**History and Audit for Trades | Service Opus**</u>](https://images.openai.com/static-rsc-4/I7FAGG3NBnQ9pZVTfHAx-b-DVIBqk-W9jS0W3MLVazQEk8w5THJTvNA2D4uBihF8UNq745DOyvzzakwnzj5Am6OzG0dVG4mptUhHRxWsnBJ61_P-9QBMJsbUPoqSZiuLqwC9rLqjaPaSzDk0L4RKDTALK6FfQru28vsRRk1-kjs?purpose=inline)

[<u>**serviceopus.com**</u>](https://www.serviceopus.com/features/history?utm_source=chatgpt.com)

**Menampilkan:**

- **Pengguna yang melakukan tindakan.**

- **Jenis aktivitas.**

- **Waktu.**

- **Modul terkait.**

- **Riwayat perubahan yang diizinkan.**

**Fitur pencarian, filter, dan detail aktivitas.**

**Riwayat sensitif hanya dapat diakses pengguna dengan Permission khusus.**

**SYS-06 — Global Search Results**

[<u>**servicenow.com**</u>](https://www.servicenow.com/docs/r/employee-service-management/employee-experience-foundation/empworks-moveworks-capabilities.html?contentId=a7AHLPI6vL6rR~BntDZPug&utm_source=chatgpt.com)

**Pencarian lintas modul, misalnya:**

- **Kader.**

- **Proker.**

- **Agenda.**

- **Surat.**

- **Dokumen.**

- **Berita.**

- **Perusahaan.**

**Hasil pencarian hanya menampilkan informasi yang boleh diakses pengguna. Sistem tetap memeriksa Permission ketika hasil dibuka.**

**SYS-07 — Unauthorized / 403**

[<u>**Error Pages Design | Get Inspired**</u>](https://images.openai.com/static-rsc-4/28g5fGeaTAvrg9xmSKZ_Ra8f1zEmJtVQM-uvJp5z1y1i98f6kXR4NARA1-P7DSbbe_UUZYiWBuILuOUJxgO-WCr4_eFFButNpbf5TZxajkbA3HRl-mCnbB842QVweJKq_Elot4VfOyYAJtVRmgZlbCA-11iNkuQEiBWNjQDcL74?purpose=inline)

[<u>**errors.svitlanalutsenko.com**</u>](https://errors.svitlanalutsenko.com/inspiration.html?utm_source=chatgpt.com)

**Ditampilkan ketika pengguna tidak memiliki hak akses.**

**Isi:**

- **Pesan akses tidak diizinkan.**

- **Penjelasan singkat.**

- **Tombol Kembali ke Dashboard.**

**Tidak boleh menampilkan informasi rahasia dari halaman yang ditolak.**

**SYS-08 — Not Found / 404**

[<u>**FoodHill - Restaurant Elementor Template Kit by Tokotema | ThemeForest**</u>](https://images.openai.com/static-rsc-4/_TQn0Wzv8H7z4_paU6lEM2Da_CmJzSK16-4Ho12_iwrBLO01ziHJPgBD_MY6B2ry83pVYnDwPDH0N472XrTQ_DdvTUbtYroemhRmpHKWo5WN1yZKkJErc0GZY-DUykj1BdcWWLQpV_dBvH_KWy2ShaRsioPjjxyRZmgI4ab9j3g?purpose=inline)

[<u>**themeforest.net**</u>](https://themeforest.net/item/foodhill-restaurant-elementor-template-kit/53557140?utm_source=chatgpt.com)

**Ditampilkan ketika halaman atau data tidak ditemukan.**

**Tombol:**

- **Kembali.**

- **Ke Beranda.**

**Jangan membocorkan keberadaan data privat melalui pesan error.**

**SYS-09 — System Error / Unavailable**

[<u>**Anthropic Claude down today: Is it linked to the quit ChatGPT campaign? - Technology News | The Financial Express**</u>](https://images.openai.com/static-rsc-4/rt8oHHCI56xyy1pqDGwZTQQHDeeOccUKALPA8-QKfMdrh6Ezr02-wZo-cH21COp5Ed5zrP6wZih941St75flMB4LQ_RzzBPXhEvd37oAg3bRKCAP0MLhRO1tEfKwjfVLsRpJqdqK2uBltOtsfRsAvzb2aSPs1Ce3gIkkEMTp0UQ?purpose=inline)

[<u>**financialexpress.com**</u>](https://www.financialexpress.com/life/technology-anthropic-claude-down-today-is-it-linked-to-the-quit-chatgpt-campaign-4160948/?utm_source=chatgpt.com)

**Ditampilkan ketika terjadi gangguan sistem atau data gagal dimuat.**

**Isi:**

- **Informasi gangguan.**

- **Referensi laporan error jika tersedia.**

- **Coba Lagi.**

- **Kembali.**

**Tidak menampilkan detail teknis internal atau stack trace kepada pengguna.**

**prd\_master.md**

## **C. Struktur navigasi**

**REPORTING & MONITORING**

- **Statistics Dashboard**

- **Detailed Report Viewer**

**SHARED SYSTEM**

- **Notification Center**

- **Approval Center**

- **Activity/Audit History**

- **Global Search**

**SYSTEM PAGES**

- **Unauthorized / 403**

- **Not Found / 404**

- **System Error / Unavailable**

## **D. Aturan penting**

1. **Statistik mengikuti kabinet dan scope pengguna.**

1. **Data laporan tidak boleh dihitung ganda.**

1. **Notifikasi mengarahkan pengguna ke sumber aktivitas.**

1. **Approval Center tidak menggantikan sistem approval masing-masing modul.**

1. **Audit History hanya dapat dibuka oleh pihak berwenang.**

1. **Global Search tidak boleh membocorkan data yang tidak memiliki izin akses.**

1. **Halaman 403, 404, dan System Error menggunakan satu pola desain yang konsisten.**

1. **Semua halaman harus memiliki kondisi Loading, Empty, Error, dan Unauthorized yang jelas.**

1. **Tampilan mobile menggunakan satu kolom, kartu, dan navigasi sederhana.**

## **E. Ketentuan Design System**

**Seluruh SYS mengikuti Design System ARTHAKARSA:**

- **Warna Burgundy, Wine, Gold, Copper, Ivory, dan White.**

- **Font DM Serif Display untuk heading editorial yang sesuai.**

- **Plus Jakarta Sans untuk antarmuka operasional.**

- **Komponen tabel, kartu statistik, filter, badge status, dan notifikasi digunakan ulang.**

- **Desktop, tablet, dan mobile harus konsisten.**

**prd\_master.md**

## **F. Konfirmasi terakhir 06.4.14**

**Menunggu persetujuan terakhir**

**Ini adalah kelompok terakhir dari pembahasan Detail Struktur Halaman Tahap 06.4.**

**Apakah setuju dengan baseline SYS-01 sampai SYS-09?**

06.4.14 SYS — RESMI DIKUNCI

SYS-01 sampai SYS-09 resmi menjadi baseline Reporting, Monitoring & Shared System.

Dengan ini, seluruh kelompok pembahasan 06.4 yang sudah kita lalui telah ditetapkan. Sekarang aku melakukan pemeriksaan keseluruhan, bukan sekadar menghitung halaman, tetapi juga memeriksa hubungan antarmodul agar tidak ada fitur ganda atau kewenangan yang bertabrakan.

# **FINAL CROSS-CHECK — TAHAP 06 STRUKTUR HALAMAN**

## **1. Pemeriksaan jumlah Master Screen Inventory**

# **146**

Total Screen ID

# **16**

Kelompok Prefix

**Jumlah sesuai baseline PRD Master.**

Tidak ada penambahan atau pengurangan jumlah Screen ID.

| **Kelompok** | **Jumlah** | **Pemeriksaan** |
| --- | --- | --- |
| PUB | 22 | Disetujui |
| TKT | 8 | Konfirmasi detail |
| AUTH | 6 | Konfirmasi detail |
| PER | 12 | Disetujui |
| ADM | 12 | Disetujui |
| ORG | 6 | Disetujui |
| WRK | 10 | Disetujui |
| CAL | 4 | Disetujui |
| COR | 7 | Disetujui |
| FIN | 10 | Disetujui |
| EVT | 9 | Disetujui |
| ATT | 4 | Disetujui |
| DOC | 6 | Disetujui |
| DIR | 8 | Disetujui |
| CMS | 13 | Disetujui |
| SYS | 9 | Disetujui |
| **TOTAL** | **146** | **16 kelompok** |

prd\_master.md

Hasilnya:

- 146 Screen ID terdaftar.

- 16 kelompok teridentifikasi.

- Tidak ada Screen ID tambahan yang diperlukan.

- Tab, modal, drawer, dan komponen bukan otomatis Screen ID baru.

**Catatan:** TKT dan AUTH sudah masuk inventaris 146, tetapi persetujuan eksplisit untuk detail struktur halamannya belum ditemukan dalam riwayat keputusan.

## **2. Pemeriksaan konsistensi keputusan utama**

Berikut hasil pemeriksaan terhadap keputusan yang telah kita sepakati.

| **Area** | **Hasil pemeriksaan** |
| --- | --- |
| Admin login dan pemilihan kabinet | Konsisten |
| Role system\_admin | Konsisten |
| Admin Panel dan Organization Management | Terpisah |
| Workspace Kompartemen dan Proker | Terpisah |
| Roster dan Manager Proker | Konsisten |
| Task Board tanpa PIC | Konsisten |
| Calendar dan Agenda | Perlu pemetaan satu pintu |
| Persuratan dan revisi Sekum | Konsisten |
| Keuangan dan revisi Bendum | Konsisten |
| Tiket dan pembayaran | Konsisten secara konsep |
| Attendance | Terhubung dengan tiket |
| LPJ dan penutupan Proker | Konsisten |
| Database Kader dan PSDM | Satu sumber data |
| Prestasi Kader dan CMS | Konsisten |
| Medpart dan Kotak Suara | Terpisah dari CMS publik |
| Reporting dan Monitoring | Perlu batas tampilan yang jelas |

## **3. Pemeriksaan duplikasi antarmodul**

Ini bagian yang paling penting. Beberapa modul memang memiliki fungsi yang berhubungan, tetapi tidak boleh menciptakan proses atau penyimpanan data ganda.

Berikut aturan konsolidasi yang harus dipakai.

**A. Calendar vs Agenda Management**

**CAL-04 — Buat/Edit Jadwal**

Menjadi form utama dan pintu pembuatan seluruh agenda.

**EVT-03 — Buat/Edit Agenda**

Menjadi pintasan ke form utama dengan konteks agenda/event otomatis terpilih.

Satu proses pembuatan

EVT-04 tetap menjadi pusat pengelolaan event, sedangkan CAL-03 menampilkan detail kegiatan dalam konteks kalender.

Dengan begitu, tidak ada agenda yang dibuat dua kali.

**B. Notification dan Approval**

- PER-12 adalah tampilan notifikasi personal.

- SYS-03 adalah pusat notifikasi bersama.

- ORG-05 adalah pusat aktivitas organisasi sesuai lingkup pengguna.

- SYS-04 adalah daftar pekerjaan yang menunggu tindakan dan mengarahkan ke modul sumber.

Tidak ada sistem approval kedua.

**C. Reporting dan Audit**

- ORG-06: laporan organisasi sesuai lingkup.

- SYS-01 dan SYS-02: statistik serta laporan lintas modul.

- ADM-12: audit administrasi sistem.

- SYS-05: riwayat aktivitas bersama sesuai Permission.

Semua menggunakan sumber data yang terintegrasi.

**D. Database Kader, Bisnis dan Prestasi**

| **Modul** | **Tanggung jawab** |
| --- | --- |
| PER | Kader mengelola informasi bisnis miliknya |
| DIR | Pengelolaan database dan verifikasi |
| CMS | Pengelolaan serta publikasi prestasi |
| PUB | Menampilkan bisnis dan prestasi yang sudah Published |

Tidak membuat database bisnis atau prestasi baru hanya untuk halaman publik.

**E. Tiket dan Attendance**

- TKT: pengalaman pendaftaran dan pembelian tiket peserta.

- EVT: pengelolaan agenda, tiket dan pembayaran oleh penyelenggara.

- ATT: pemindaian dan pencatatan kehadiran.

- PER: riwayat tiket dan kehadiran milik pengguna.

Semua terhubung ke data transaksi dan tiket yang sama.

**F. Workspace dan modul operasional**

Workspace Proker menjadi tempat mengakses konteks pekerjaan. Pengelolaan surat, keuangan, agenda, dan dokumen tetap menggunakan modul pemiliknya.

Task Board tetap menjadi catatan pekerjaan bersama para Pengelola Proker:

**TASK BOARD — TANPA PIC**

**TODO**

Belum dikerjakan

**IN PROGRESS**

Sedang dikerjakan

**BLOCKED**

Mengalami hambatan

**DONE**

Sudah selesai

Drag-and-drop antarstatus. Tidak ada PIC, penugasan individu, atau kewajiban memilih penanggung jawab. Semua Pengelola Proker yang memiliki akses dapat melihat board bersama.

## **4. Pemeriksaan khusus Admin Panel**

Flow yang sudah kamu setujui tetap menjadi aturan final.

**Login menggunakan satu sistem Auth**

**Pemeriksaan Role dan Permission**

**system\_admin?**

Pemeriksaan hak akses Admin Panel

Ya

**ADM-01<br>**Cabinet Center

Pilih kabinet aktif melalui kartu kabinet

**ADM-02<br>**Dashboard kabinet

Tidak

**Dashboard sesuai akses**

Personal / Organization Management / Workspace

Ketentuannya:

- Jabatan struktural tidak otomatis memberikan akses Admin Panel.

- Kader maupun pengurus boleh diberikan system\_admin secara khusus.

- system\_admin tidak otomatis mendapatkan kewenangan operasional Sekum atau Bendum.

- ADM-01 merupakan pintu pemilihan kabinet, bukan dashboard dengan sidebar.

Nama tampilan ADM-01 dan ADM-02 harus diselaraskan pada Master Screen Inventory tanpa mengubah jumlah ID.

## **5. Temuan yang masih harus diselesaikan**

Ada tiga pekerjaan dokumentasi yang belum boleh kita anggap selesai.

| **No.** | **Temuan** | **Tindakan** |
| --- | --- | --- |
| 1 | Detail TKT dan AUTH belum mendapat persetujuan eksplisit | Finalisasi persetujuan |
| 2 | Route internal masih banyak TBD | Finalisasi Route Registry |
| 3 | Pemetaan field, validasi, dan permission per screen masih sebagian | Lengkapi Screen-to-Data Mapping |

PRD Master sendiri membedakan spesifikasi domain dengan pemetaan field yang sudah lengkap. Status Domain Mapped / Field-Level PARTIAL bukan berarti seluruh field dan integrasi sudah diverifikasi.

SCREEN\_DATA\_MAPPING.md

Jadi, kita tidak akan mengklaim 146 halaman sudah siap diimplementasikan hanya karena ID-nya sudah lengkap.

## **6. Keputusan penutupan Tahap 06**

**Status sementara Tahap 06**

Inventaris 146 Screen ID

Lolos

Struktur 16 kelompok

Lolos

Persetujuan detail 132 screen

Lolos

Detail TKT dan AUTH

Pending

Route Registry

Partial

Field-level mapping

Partial

**Satu langkah lagi sebelum penutupan final:** kita perlu mengesahkan dua kelompok yang belum memiliki persetujuan detail eksplisit.

**TKT — Public Ticketing (8 Screen)**

TKT-01 Pilih Tiket, TKT-02 Form Registrasi, TKT-03 Pembayaran QRIS, TKT-04 Hasil/Status Registrasi, TKT-05 Cek Status Tiket, TKT-06 Verifikasi Email/OTP, TKT-07 Hasil Pencarian Tiket, TKT-08 Detail/Unduh Tiket.

Aturan utamanya: satu QRIS per agenda, reservasi kuota 180 detik, pembayaran manual dengan bukti transfer, pencarian tiket melalui NIM dan OTP, serta PDF dan barcode dengan pengiriman email Brevo. Tidak ada payment gateway otomatis atau refund.

**AUTH — Authentication & Onboarding (6 Screen)**

AUTH-01 Login, AUTH-02 Registrasi Akun, AUTH-03 Verifikasi Email, AUTH-04 Lupa Password, AUTH-05 Reset Password, AUTH-06 Status/Informasi Akun.

Aturan utamanya: satu sistem login untuk semua role, registrasi awal menjadi Mahasiswa Biasa setelah verifikasi email, dan pengguna tidak dapat menentukan sendiri status kader atau jabatan.

prd\_master.md

**Apakah setuju kita kunci kedua baseline TKT-01 sampai TKT-08 dan AUTH-01 sampai AUTH-06 berdasarkan ketentuan tersebut?**

GASSS! 🔥 Kita kunci!

BASELINE TKT & AUTH DISETUJUI

Mulai sekarang keputusan berikut menjadi bagian resmi baseline Tahap 06.4.14:

- **TKT-01 sampai TKT-08:** Public Ticketing.

- **AUTH-01 sampai AUTH-06:** Authentication & Onboarding.

- Tidak menambah Screen ID baru.

- Tidak mengubah jumlah total inventaris 146 layar.

- Tidak membuat sistem login terpisah untuk setiap role.

- Seluruh alur tetap mengikuti keputusan bisnis dan kontrak backend yang sudah disepakati.

## **Baseline yang dikunci**

**TKT — 8 layar**

1. TKT-01 — Pilih Tiket

1. TKT-02 — Form Registrasi

1. TKT-03 — Pembayaran QRIS

1. TKT-04 — Hasil/Status Registrasi

1. TKT-05 — Cek Status Tiket

1. TKT-06 — Verifikasi Email/OTP

1. TKT-07 — Hasil Pencarian Tiket

1. TKT-08 — Detail/Unduh Tiket

**AUTH — 6 layar**

1. AUTH-01 — Login

1. AUTH-02 — Registrasi Akun

1. AUTH-03 — Verifikasi Email

1. AUTH-04 — Lupa Password

1. AUTH-05 — Reset Password

1. AUTH-06 — Status/Informasi Akun

Keputusan ini sekarang menjadi baseline yang tidak boleh diubah diam-diam pada tahap berikutnya.

## **1. Finalisasi Route Registry**

Aku menemukan bahwa AUTH sebenarnya sudah memiliki bukti rute pada laporan implementasi Phase 4. Jadi, kita tidak perlu menebak nama URL-nya.

### **TKT — Route baseline**

| **ID** | **Canonical route** |
| --- | --- |
| TKT-01 | /aktivitas/agenda/:id/tiket |
| TKT-02 | /aktivitas/agenda/:id/daftar |
| TKT-03 | /pendaftaran/:id/bayar |
| TKT-04 | /pendaftaran/:id/status |
| TKT-05 | /aktivitas/agenda/cek-tiket |
| TKT-06 | /aktivitas/agenda/cek-tiket/verifikasi |
| TKT-07 | /aktivitas/agenda/cek-tiket/hasil |
| TKT-08 | /tiket/:id |

prd\_master.md

### **AUTH — Route baseline**

| **ID** | **Canonical route** |
| --- | --- |
| AUTH-01 | /masuk |
| AUTH-02 | /daftar |
| AUTH-03 | /verifikasi-email |
| AUTH-04 | /lupa-password |
| AUTH-05 | /reset-password |
| AUTH-06 | /status-akun |

Rute ini sesuai dengan laporan Phase 4 dan struktur Next.js yang tercatat. /auth/confirm merupakan callback teknis verifikasi, bukan Screen ID tambahan.

PHASE\_4\_FINAL\_REPORT.md

14 route baseline berhasil direkonsiliasi

Catatan: rute TKT bersumber dari usulan Route Registry Tahap 3, sedangkan AUTH memiliki bukti struktur implementasi. Keduanya belum berarti seluruh 14 rute sudah lolos pengujian integrasi nyata.

## **2. Finalisasi field-level mapping TKT dan AUTH**

Berikut hasil pencocokan data dan interaksi dengan sumber asli.

**TKT**

| **ID** | **Data dan interaksi utama** |
| --- | --- |
| TKT-01 | Informasi agenda, jenis tiket, deskripsi, harga, status |
| TKT-02 | Nama, NIM, telepon, email, fakultas, prodi |
| TKT-03 | QRIS, nominal, reservasi, countdown 180 detik, upload bukti |
| TKT-04 | Status reservasi, pembayaran, registrasi, dan tiket |
| TKT-05 | NIM saja untuk pencarian |
| TKT-06 | OTP, masa berlaku, resend, pembatasan percobaan |
| TKT-07 | Daftar tiket hasil identitas terverifikasi |
| TKT-08 | Identitas peserta, agenda, jenis tiket, QR/barcode, PDF, status email |

web hipmi(2).docx

**AUTH**

| **ID** | **Data dan interaksi utama** |
| --- | --- |
| AUTH-01 | Email, password, tampil/sembunyikan password |
| AUTH-02 | Nama, NIM, email, telepon, fakultas, prodi, password, konfirmasi |
| AUTH-03 | Informasi verifikasi dan status akun |
| AUTH-04 | Email akun dan pemulihan password |
| AUTH-05 | Password baru dan konfirmasi |
| AUTH-06 | Status verifikasi, nonaktif, atau pembatasan akses |

web hipmi(2).docx

Ketentuan lintas layar tetap berlaku:

- Satu master Fakultas digunakan bersama.

- Program Studi mengikuti Fakultas.

- Registrasi menghasilkan status awal Mahasiswa Biasa setelah email terverifikasi.

- Tidak ada pemilihan role Kader, Staff, atau Pengurus oleh pengguna.

- Foto profil tidak wajib saat registrasi.

## **3. Temuan penting: API Ticketing perlu direkonsiliasi**

Ada satu ketidaksesuaian dokumentasi yang harus kita selesaikan sebelum handoff.

Pada laporan traceability Tahap 5, beberapa API ditempatkan pada Screen ID yang berbeda dengan urutan proses sebenarnya.

Pemetaan yang sesuai dengan alur pengguna dan API Registry adalah:

**Alur tiket berbayar**

1. **TKT-01** — Pilih jenis tiket.

1. **TKT-02** — Isi formulir registrasi.

1. **TKT-03** — reserve\_ticket() saat Bayar Sekarang, kemudian upload bukti melalui Edge.

1. **TKT-04** — Tampilkan status pembayaran dan registrasi.

1. **EVT-07** — Penyelenggara memverifikasi pembayaran.

1. **TKT-08** — Tiket diterbitkan dan dapat diakses setelah otorisasi.

**Alur tiket gratis**

1. **TKT-02** — Isi formulir registrasi.

1. **issue\_free\_ticket()** — Penerbitan tiket sesuai aturan persetujuan agenda.

1. **TKT-04** — Tampilkan status Confirmed/Issued.

1. **TKT-08** — Detail dan unduh tiket.

**Alur pencarian tiket**

1. **TKT-05** — Masukkan NIM dan minta OTP.

1. **TKT-06** — Verifikasi OTP.

1. **TKT-07** — Tampilkan tiket yang berhasil diverifikasi.

1. **TKT-08** — Detail/unduh tiket.

Pemisahan ini mengikuti proses asli: reservasi terjadi ketika peserta memulai pembayaran, sedangkan permintaan OTP dimulai dari pencarian menggunakan NIM.

prd\_master.md

web hipmi(2).docx

Ini koreksi traceability, bukan perubahan business rules atau penambahan fitur.

## **4. Final Cross-Check keseluruhan Tahap 06**

# **146 Screen Inventory**

# **146/146**

Screen ID tercakup

# **16/16**

Kelompok tercakup

**Hasil pemeriksaan**

Struktur dan jumlah layar

PASS

Baseline 06.4.14 SYS

LOCKED

Baseline TKT dan AUTH

LOCKED

Pemeriksaan duplikasi antarmodul

PASS

Route Registry keseluruhan

PARTIAL

Field-level mapping 146 layar

PARTIAL

Bukti visual dan integrasi seluruh layar

PENDING

Ada dua gap yang tidak boleh kita tutup-tutupi:

1. **Route Registry:** dalam PRD, masih terdapat 110 entri route yang perlu dikonsolidasikan. Beberapa laporan implementasi memang sudah mencatat route aktual, tetapi belum semuanya tersatukan dalam satu registry.

1. **Field-level mapping:** dokumen SCREEN\_DATA\_MAPPING.md secara eksplisit menyatakan bahwa pemetaan 146 layar belum sampai ke kolom query, input dan validasi per layar. Ini membutuhkan verifikasi terhadap data dictionary, bukan sekadar mencocokkan nama tabel.<br> SCREEN\_DATA\_MAPPING.md

Laporan Tahap 5 memang mencatat 15/15 suite pengujian lokal PASS. Namun, itu tidak otomatis membuktikan seluruh integrasi hosted, Figma, atau UAT sudah selesai.

TAHAP\_5\_TESTING\_SECURITY\_AND\_STAGING\_REPORT.md

## **5. Keputusan status Tahap 06**

BASELINE STRUKTUR HALAMAN TERKUNCI

Aku menetapkan:

- Baseline 146 Screen ID tidak berubah.

- Seluruh 16 kelompok dipertahankan.

- Semua keputusan 06.4 yang sudah disetujui tetap berlaku.

- TKT dan AUTH resmi ditambahkan sebagai baseline yang disetujui.

- Tidak ada perubahan database atau migrasi.

- Tidak ada fitur baru yang disisipkan tanpa persetujuan.

**Tetapi status administrasi Tahap 06 belum FINAL SIGN-OFF.** Kita harus menyelesaikan Route Registry dan pemetaan field terlebih dahulu. Dokumen PRD sendiri mensyaratkan pemisahan antara spesifikasi, implementasi lokal, integrasi nyata, dan persetujuan produksi.

prd\_master.md
