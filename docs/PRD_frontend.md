# PRD FRONTEND --- HIPMI CENTRAL

**Proyek:** HIPMI CENTRAL --- HIPMI Perguruan Tinggi Universitas Telkom\
**Identitas kabinet/visual:** ARTHAKARSA\
**Dokumen:** `PRD_frontend.md`\
**Versi:** 1.1\
**Tanggal:** 17 November 2026\
**Status:** Revisi audit frontend-only; spesifikasi halaman, navigasi, role, demo account, seed, route, dan simulasi diperluas. Audit repository aktual tetap menjadi prasyarat sebelum coding.\
**Cakupan:** 146/146 Screen ID, 16 kelompok fungsional, enam area aplikasi, tiga konteks Workspace (Bidang, Kompartemen, Proker)\
**Mode implementasi:** Interactive frontend demo dengan data simulasi
dan LocalStorage
*REFERENSI ANALYST* : DARI FILE front end.docx

------------------------------------------------------------------------

## Catatan Revisi v1.1 — Hasil Audit dan Aturan Prioritas

Revisi ini dibuat setelah mencocokkan PRD Frontend v1.0 dengan `front end_analyst.docx`, `front end.docx`, `prd_master.md`, serta keputusan final proyek yang tersedia.

**Status audit v1.1:**
- Inventaris 146 Screen ID dan 16 kelompok: lengkap secara jumlah.
- Enam area aplikasi: dipertahankan.
- Public navbar dan Personal Area: struktur utama sesuai baseline; pemetaan halaman/submenu diperjelas.
- Workspace: dikoreksi menjadi tiga konteks (Bidang, Kompartemen, Proker) menggunakan template dan Screen ID WRK yang sama; tidak menambah Screen ID.
- Demo account: diperluas dari preset ringkas menjadi matriks akun, role, permission, assignment, scope, area, dan sidebar.
- Route: 146 Screen ID mempunyai pemetaan route frontend; route AUTH dikoreksi mengikuti baseline terkunci.
- Screen-to-data: ditambahkan kontrak rinci per Screen ID, field, komponen, aksi, fixture, dan akses.
- Business flow: diperjelas dengan urutan screen dan state simulasi.
- Implementasi tetap frontend-only; tidak ada backend, database server, Supabase, API, Edge Function, email, OTP eksternal, payment gateway, atau transaksi nyata.

**Aturan konflik:** jika isi bagian lama bertentangan dengan koreksi v1.1 di dokumen ini, gunakan ketentuan v1.1. Keputusan bisnis final tidak boleh diubah oleh AI Agent hanya demi menyederhanakan UI. Hal yang benar-benar bergantung pada repository (misalnya file asset, dependency, dan route yang sudah ada) harus diverifikasi saat audit repository; jangan mengarang hasil audit tersebut.

## 0.1 Matriks Temuan Audit v1.0 → Perbaikan v1.1

| Area | Kondisi pada PRD v1.0 | Hasil cross-check dengan Analyst/keputusan final | Perbaikan v1.1 |
|---|---|---|---|
| Inventaris | 146 Screen ID/16 kelompok sudah dicantumkan | Jumlah sesuai baseline; TKT dan AUTH sudah dikunci dan tidak menambah ID | Dipertahankan 146/146; setiap ID diberi kontrak detail |
| Workspace | Workspace Kompartemen dan Proker dijelaskan | Analyst menetapkan tiga konteks: Bidang, Kompartemen, Proker | Workspace Bidang ditambahkan memakai WRK-01/WRK-02; tidak menambah ID |
| AUTH routes | Menggunakan `/auth/login`, `/auth/register`, dan seterusnya | Baseline terkunci memakai `/masuk`, `/daftar`, `/verifikasi-email`, `/lupa-password`, `/reset-password`, `/status-akun` | Route AUTH dikoreksi |
| Route registry | Route usulan ada, tetapi beberapa New/Edit memakai `atau`; draft menyebut 116 | Analyst mencatat 110 entri route sumber internal masih perlu dikonsolidasikan; TKT/AUTH mempunyai baseline route eksplisit | 146 route frontend dipetakan satu kali; TKT/AUTH dikunci; route internal tetap perlu audit repository |
| Screen detail | Ringkasan data/action per layar | Field-level mapping 146 layar sebelumnya masih partial | Ditambahkan 146 baris detail layout, field/data, aksi, akses, dan fixture pada 9.19 |
| Demo accounts | 18 akun ringkas; multi-role belum diberi akun/assignment eksplisit | Perlu membuktikan status kader, role, permission, assignment, scope, dan sidebar secara terpisah | Diperluas menjadi 28 akun demo dengan kredensial, status, permission, scope, dan area |
| Sidebar | Menu per role masih umum | Perlu pemetaan Personal, Organization, Workspace, Admin dan permission profile | Sidebar/submenu, screen tujuan, dan batas akses diperjelas pada 8.3 |
| Personal Area | Bisnis/notifikasi/aktivitas belum dipetakan ke submenu secara eksplisit | PER-05/06/10/11, PER-07/08/09, PER-12 perlu mapping | Keanggotaan dan Aktivitas Saya dipetakan sampai screen/submenu |
| Kalender/Agenda | CAL-04 dan EVT-03 tampak seperti dua form | Analyst mengunci CAL-04 sebagai form utama; EVT-03 hanya shortcut/alias | Satu AgendaForm, satu event object, context prefill dari Workspace |
| Medpart | Mekanisme cek status masih `DEC-10` | Keputusan final memakai kode tracking dari pengajuan publik tanpa login | PUB-16 menghasilkan kode; PUB-17 memeriksa kode |
| Persuratan/Keuangan | Kewenangan sentral disebut, tetapi akses lintas unit dan direct submit belum cukup rinci | Sekum/Bendum cross-unit; Staff berizin submit langsung tanpa approval tambahan Kakom | Cross-unit dan direct-submit ditulis sebagai aturan eksplisit |
| Notifikasi/Approval | PER-12/SYS-03 dan ORG-05/SYS-04 berpotensi tampak duplikat | Analyst membedakan personal/shared notifications dan activity/approval queue | Sumber data dan fungsi setiap screen dipisahkan |
| Bisnis/Publikasi | Approval dan publikasi berpotensi terbaca satu state | Persetujuan dan publish adalah tindakan berbeda | Status approval dan publication dipisahkan |
| Seed data | Hanya jumlah minimum per domain | AI Agent memerlukan contoh record yang terhubung untuk mengisi semua screen | Ditambahkan katalog fixture deterministik dan mapping screen pada 11.7 |
| Demo journey | Flow BF sudah ada, tetapi belum selalu menunjukkan urutan screen | Implementasi perlu langkah UI, akun uji, status sebelum/sesudah, dan efek lintas modul | Ditambahkan 21 detailed demo journeys pada 10.23 |
| Batas frontend | Sudah menyebut mock/local storage | Perlu ditegaskan tidak ada database/backend sama sekali | LocalStorage dinyatakan sebagai mock key-value browser store; tidak membuat DB/API/server |

**Gap yang masih terbuka setelah v1.1:** audit route aktual terhadap repository, ketersediaan asset/logo/foto/font, dependency PDF/QR/scanner, serta approval visual final. Gap ini tidak mengurangi kelengkapan spesifikasi frontend; AI Agent harus memverifikasinya, bukan mengarang statusnya.

## Ringkasan Eksekutif

Dokumen ini menjadi pedoman normatif implementasi frontend HIPMI
CENTRAL. Tujuannya bukan menghasilkan website pajangan, melainkan
aplikasi frontend interaktif yang seluruh halaman, navigasi, formulir,
tabel, tombol, alur status, role, permission, dan hubungan antarmodulnya
dapat dicoba menggunakan data dummy.

Implementasi pada tahap ini **hanya frontend**. Tidak ada integrasi
Supabase, database sungguhan, API backend, Edge Function, email, OTP
eksternal, QRIS, transaksi pembayaran, atau deployment produksi. Seluruh
perilaku bisnis disimulasikan melalui mock service dan data lokal.

### Keputusan implementasi

  ---------------------------------------------------------------------
  Area                               Keputusan
  ---------------------------------- ----------------------------------
  Persistence                        LocalStorage

  Akun demo                          Preset Demo Accounts per
                                     role/permission

  Cakupan halaman                    Seluruh 146 Screen ID wajib
                                     tersedia dan dapat dicoba

  Data                               Satu sumber data dummy terpusat
                                     dan saling terhubung

  Interaksi                          Seluruh kontrol interaktif harus
                                     memiliki fungsi nyata dalam
                                     simulasi

  Authentication                     Login, registrasi, verifikasi,
                                     pemulihan, dan status akun
                                     disimulasikan

  Permission                         Role, permission, assignment, dan
                                     scope disimulasikan secara
                                     konsisten

  Design system                      Mengacu pada
                                     `desing.md`
                                     sebagai spesifikasi visual
                                     terbaru; status persetujuan
                                     dicatat terpisah

  Backend                            Tidak diimplementasikan pada tahap
                                     ini
  ---------------------------------------------------------------------

### Definisi selesai

Frontend dianggap selesai apabila seluruh 146 Screen ID dapat dibuka
melalui navigasi yang benar, menampilkan data dummy yang relevan,
mempunyai state UI yang layak, mengikuti hak akses demo, serta seluruh
interaksi yang dijanjikan benar-benar mengubah state simulasi dan
memperbarui halaman terkait. Tidak cukup hanya membuat halaman kosong,
screenshot, atau tombol yang sekadar menampilkan toast.

------------------------------------------------------------------------

# 1. Identitas Produk, Tujuan, dan Prinsip

## 1.1 Identitas

HIPMI CENTRAL adalah platform pengelolaan organisasi HIPMI Perguruan
Tinggi Universitas Telkom yang menyatukan informasi publik, akun
personal, operasional organisasi, workspace, serta administrasi sistem
dalam satu aplikasi.

## 1.2 Tujuan frontend

1.  Mengimplementasikan seluruh struktur aplikasi dan seluruh 146 Screen
    ID.
2.  Menyediakan pengalaman berbeda berdasarkan identitas, role,
    permission, assignment, dan scope pengguna.
3.  Memperlihatkan data yang realistis dan saling terhubung pada setiap
    halaman.
4.  Menyediakan simulasi alur bisnis dari awal sampai selesai.
5.  Memungkinkan pengujian tanpa backend dan tanpa layanan eksternal.
6.  Menjaga kesesuaian dengan business flow dan keputusan produk yang
    sudah ditetapkan.
7.  Menjadi baseline bagi pembuatan `todo.md` dan implementasi frontend
    berikutnya.

## 1.3 Prinsip produk

-   **Single identity:** satu orang menggunakan satu akun; tidak membuat
    akun terpisah untuk setiap jabatan.
-   **Role ≠ status kader ≠ jabatan ≠ assignment:** keempatnya tidak
    boleh disamakan.
-   **Permission-based navigation:** menu hanya muncul jika pengguna
    mempunyai akses.
-   **Scope-based data:** data dibatasi berdasarkan kabinet, bidang,
    kompartemen, proker, agenda, atau kepemilikan data.
-   **Shared engines, scoped data:** komponen dan halaman dapat
    digunakan ulang, tetapi isi dan aksinya mengikuti scope.
-   **Public projection only:** halaman publik hanya menampilkan data
    yang memang berstatus publik/terbit.
-   **Audit, not silent overwrite:** perubahan penting meninggalkan
    riwayat simulasi.
-   **No fake completion:** tindakan tidak boleh dianggap berhasil jika
    mock service belum mengubah state.
-   **Mobile and accessibility first:** semua halaman harus dapat
    digunakan pada layar kecil dan dengan keyboard.
-   **No scope creep:** fitur yang masih rencana tidak otomatis masuk
    implementasi.

------------------------------------------------------------------------

# 2. Ruang Lingkup dan Batas Implementasi

## 2.1 Termasuk dalam pekerjaan

-   Public Website.
-   Authentication dan account onboarding.
-   Personal Area.
-   Organization Management.
-   Workspace Kompartemen.
-   Workspace Proker.
-   Admin Panel dan Cabinet Center.
-   Seluruh 146 Screen ID.
-   Seluruh route dan navigasi.
-   Sidebar dan topbar dinamis.
-   Demo accounts.
-   Data dummy terpusat.
-   LocalStorage persistence.
-   Mock service/repository.
-   Form, validasi, CRUD, filter, search, sorting, pagination.
-   Simulasi perubahan status.
-   Simulasi approval/revision/rejection/publish/close.
-   Simulasi QRIS, pembayaran, OTP, tiket, barcode, dan check-in.
-   Simulasi dokumen, LPJ, persuratan, dan keuangan.
-   Notifikasi dan activity history.
-   Demo Scenario Library.
-   Demo Control Center khusus development.
-   Responsive, accessibility, UI states, dan visual QA.

## 2.2 Tidak termasuk dalam pekerjaan

-   Supabase Auth, PostgreSQL, Storage, RLS, RPC, Edge Functions,
    trigger, cron, atau queue sungguhan.
-   Pengiriman email melalui Brevo atau layanan email lain.
-   Pengiriman OTP melalui email/SMS.
-   Pembayaran QRIS atau transfer uang sungguhan.
-   Payment gateway.
-   Integrasi WhatsApp/Instagram eksternal.
-   Scanner barcode yang memvalidasi tiket pada server.
-   AI Agent, diagnosis AI, affiliate dua arah, atau fitur yang masih
    berstatus rencana.
-   Deployment produksi.

## 2.3 Aturan simulasi

  ---------------------------------------------------------------------
  Fitur produksi                     Padanan frontend demo
  ---------------------------------- ----------------------------------
  Login Supabase                     Validasi akun demo lokal

  Verifikasi email                   Status verifikasi demo

  OTP email                          Kode demo yang ditampilkan di Demo
                                     Control Center

  Upload bukti pembayaran            File metadata/preview lokal atau
                                     bukti placeholder

  QRIS                               Gambar QRIS demo dengan label
                                     simulasi

  Email tiket                        Email outbox simulasi

  PDF tiket                          Ticket preview dan unduhan demo
                                     jika library tersedia; jika tidak,
                                     print view

  QR/barcode                         Token demo untuk alur scanner
                                     simulasi

  Approval                           Perubahan status di mock
                                     repository

  Audit log                          Activity record lokal

  Storage dokumen                    Metadata dokumen dan file demo
                                     lokal

  Export                             File hasil export dari data dummy
                                     yang sedang ditampilkan
  ---------------------------------------------------------------------

LocalStorage hanya dipakai sebagai penyimpanan key-value di browser untuk mempertahankan state mock demo. Ini bukan database aplikasi, bukan server, bukan API, dan bukan mekanisme keamanan. Jangan membuat PostgreSQL, SQLite, IndexedDB, Supabase, atau database/backend lain pada tahap ini. Data demo tidak boleh berisi PII nyata.

Semua halaman simulasi wajib menampilkan penanda bahwa data dan
transaksi adalah **DEMO**. Jangan membuat pengguna mengira pembayaran,
email, atau pengiriman dokumen benar-benar terjadi.

------------------------------------------------------------------------

# 3. Sumber Acuan, Prioritas, dan Konflik Dokumen

## 3.1 Sumber acuan

  ---------------------------------------------------------------------
  Dokumen                            Peran
  ---------------------------------- ----------------------------------
  `prd_master.md`                    Sumber utama aturan produk, role,
                                     permission, business flow, data,
                                     dan 146 Screen ID

  `front end_analyst.docx`           Acuan analisis sistem frontend,
                                     keputusan area, role, permission,
                                     sidebar, workspace, dan business flow

  `front end.docx`                   Acuan detail struktur halaman,
                                     Master Screen Inventory, route,
                                     field-level mapping, dan cross-check
                                     Tahap 06

  `desing.md`      Acuan visual digital terbaru

  Keputusan final proyek             Mengunci revisi yang lebih baru
                                     daripada contoh/opsi lama
  ---------------------------------------------------------------------

## 3.2 Aturan prioritas

1.  Keputusan eksplisit pemilik proyek yang paling baru.
2.  Business rule dan role/permission final pada PRD Master.
3.  Struktur dan keputusan navigasi final pada dokumen frontend.
4.  Design System terbaru untuk keputusan visual.
5.  Rekomendasi implementasi dalam dokumen ini, sepanjang tidak mengubah
    aturan bisnis.
6.  Jika dua sumber bertentangan dan tidak ada keputusan terbaru yang
    jelas, tandai `DECISION_REQUIRED`; jangan memilih solusi termudah
    secara sepihak.

## 3.3 Konflik dan keputusan yang wajib dijaga

-   Inventaris resmi adalah **146 Screen ID dalam 16 kelompok**, bukan
    157 screen.
-   Enam area aplikasi tidak sama dengan 16 kelompok screen.
-   Authentication adalah pintu akses bersama, bukan area aplikasi
    ketujuh.
-   `ADM-01` dipetakan ke **Cabinet Center** pada alur frontend terbaru;
    nama Master Inventory-nya adalah Admin Control Center.
-   `ADM-02` dipetakan ke **Cabinet Dashboard** untuk kabinet terpilih;
    nama Master Inventory-nya adalah Cabinet Management. Pertahankan
    Screen ID, jangan menambah screen baru.
-   Workspace Switcher berada di topbar/area switcher, bukan menu
    "Workspace Saya" yang menduplikasi navigasi.
-   Workspace Bidang, Workspace Kompartemen, dan Workspace Proker berada pada kelompok Workspace tersendiri sebagai tiga konteks kerja; tidak menambah area aplikasi atau Screen ID.
-   Task Board Proker adalah board bersama beberapa Pengelola Proker,
    tanpa PIC individual, dengan kolom To Do, In Progress, Blocked, dan
    Done.
-   Tidak membuat menu "Tugas Saya" yang menganggap pekerjaan Task Board
    sebagai tugas personal ber-PIC.
-   **Roster visibility baseline:** Kakom dan Pengelola Proker yang
    mendapat kewenangan dapat melihat roster lengkap. Anggota biasa
    hanya melihat data keterlibatan/record miliknya sendiri. Top
    Management melihat proyeksi monitoring yang sesuai. Catatan frontend
    lama yang menyebut semua anggota dapat melihat seluruh roster secara
    read-only tidak boleh diterapkan tanpa keputusan baru yang
    eksplisit.
-   Pengelola Proker harus merupakan kader terverifikasi yang memiliki
    akun dan ditunjuk Kakom. Anggota roster boleh nonkader atau belum
    mempunyai akun.
-   Hanya Kakom yang dapat menunjuk/mencabut Pengelola Proker dan
    menutup Proker.
-   Sekum menjadi pusat persuratan; Bendum menjadi pusat keuangan.
-   Bendum tidak menjadi verifikator bukti pembayaran tiket atau Media
    Partner dan tidak otomatis memperoleh PII peserta.
-   Medpart yang sudah dibayar/disetujui belum tentu sudah
    dipublikasikan. Publikasi dilakukan manual oleh Kompartemen Media
    Komunikasi.
-   Tanggal publikasi yang diminta pemohon Medpart bukan jadwal
    publikasi otomatis.
-   Kalender penuh untuk Ketum, Waketum, Sekjen, Sekum, dan Bendum
    sesuai hak baca. Prioritas tampilan Kabid dan Kakom mengikuti
    lingkupnya; prioritas UI bukan pemberian izin tambahan.
-   Proker yang tanggal main event-nya disembunyikan pada halaman publik
    menampilkan `Coming Soon`, bukan tanggal internal.
-   Tidak ada persentase progres Proker pada UI, grafik, maupun laporan.

-   **Workspace mempunyai tiga konteks:** Bidang, Kompartemen, dan Proker. Ketiganya menggunakan kerangka WRK-01/WRK-02 yang sama, tetapi sidebar, data, dan tindakan mengikuti jenis Workspace. Workspace Bidang tidak menambah Screen ID.
-   **Sekum mempunyai cross-unit access untuk Persuratan** pada seluruh Bidang, Kompartemen, dan Proker. Akses ini berdasarkan fungsi, bukan keanggotaan workspace; Sekum tidak mengambil alih roster/progres/operasional Proker.
-   **Bendum mempunyai cross-unit access untuk Keuangan** pada seluruh Bidang, Kompartemen, dan Proker. Akses ini berdasarkan fungsi, bukan keanggotaan workspace; Bendum tidak mengambil alih roster/progres/operasional Proker.
-   Staff dengan permission yang relevan boleh mengajukan surat langsung ke Sekum dan mengajukan dana langsung ke Bendum tanpa persetujuan tambahan Kakom. Staff tidak otomatis mendapat permission tersebut.
-   Kepala Bidang dapat membuka Workspace Kompartemen dan Proker di bawah bidangnya untuk monitoring; operasi unit tetap read-only kecuali ada permission eksplisit yang memang sah.
-   Seluruh agenda dibuat melalui satu form utama CAL-04. EVT-03 dan tombol pintasan Workspace adalah entry point/alias ke form yang sama dengan konteks otomatis terisi; tidak boleh membuat agenda ganda.
-   Workspace Proker menampilkan agenda terkait dan menyediakan pintasan membuat agenda dengan konteks Proker otomatis; pengelolaan tiket/peserta/pembayaran tetap melalui EVT.
-   Media Partner publik menghasilkan kode tracking unik setelah submit. Cek status menggunakan kode tersebut; jangan menggunakan pencarian bebas nama/kegiatan sebagai mekanisme utama.
-   Content Creator dan Publisher adalah permission berbeda. Pengguna yang memiliki keduanya dapat membuat dan memublikasikan konten sesuai scope; memiliki salah satunya tidak otomatis memberi permission lainnya.
-   Persetujuan bisnis kader dan publikasi bisnis adalah dua state/tindakan yang berbeda. Prestasi Kader dikelola dan dipublikasikan melalui CMS; DIR hanya menampilkan relasi profil/riwayat.
-   PER-12 adalah proyeksi notifikasi personal; SYS-03 adalah Notification Center bersama. Keduanya membaca sumber notifikasi yang sama, bukan membuat notifikasi ganda.
-   ORG-05 adalah ringkasan aktivitas/tindak lanjut organisasi sesuai scope dan mengarahkan ke modul sumber; SYS-04 adalah daftar formal pekerjaan yang menunggu keputusan/approval. Keduanya tidak membuat workflow approval baru.
-   CAL-04 adalah pintu pembuatan jadwal/agenda. EVT-03 tidak memiliki form kedua yang berdiri sendiri.
-   Tidak ada fitur refund tiket atau Media Partner pada tahap ini.
-   Tidak menjanjikan offline check-in dengan sinkronisasi otomatis. Jika koneksi/kamera gagal, sediakan pemulihan dan input manual yang sah sesuai permission.

## 3.4 Status Design System v2.1

`desing.md` bertanggal 17 November 2026 merupakan
spesifikasi visual terbaru yang ditemukan. Dokumen tersebut menyebut
status revisi v2.1 sebagai **draft revisi untuk persetujuan visual
pemilik proyek**. Karena itu: - Gunakan v2.1 sebagai baseline visual
terbaru untuk prototype. - Catat bahwa approval final visual masih perlu
dikonfirmasi. - Jangan menganggap asset foto pimpinan, master logo,
wordmark Telkom, file `siluet.png`, atau font sudah tersedia/teruji
sebelum diverifikasi di repository. - Jangan mengklaim hasil sudah
pixel-perfect, lulus WCAG, atau lulus performance sebelum pengujian
aktual.

------------------------------------------------------------------------

# 4. Arsitektur Area Aplikasi

HIPMI CENTRAL mempunyai enam area aplikasi utama yang menggunakan satu identitas pengguna. Di dalam Organization Management/Workspace Switcher terdapat tiga konteks kerja: Bidang, Kompartemen, dan Proker. Workspace Bidang adalah konteks Workspace, bukan area aplikasi ketujuh dan bukan Screen ID baru.

| Area | Pengguna | Fungsi |
|---|---|---|
| 01. Public Website | Semua pengunjung | Informasi, publikasi, agenda, tiket, Media Partner, karya kader, aspirasi |
| 02. Personal Area | Semua akun terdaftar | Profil, keanggotaan, aktivitas, tiket, bisnis, notifikasi, pengaturan |
| 03. Organization Management | Pengurus/Staff/Pengelola Proker sesuai assignment | Dashboard, operasional organisasi, administrasi, keuangan, direktori, publikasi, monitoring, dan Workspace Switcher |
| 04. Workspace Kompartemen | Kakom dan Staff berizin; Kabid read-only untuk unit bawahannya | Operasional Kompartemen, Staff, Proker, progres, pleno, agenda, surat, keuangan, dokumen |
| 05. Workspace Proker | Kakom/Manager sesuai akses; anggota hanya proyeksi pribadi | Pelaksanaan satu Proker, roster, Task Board, agenda, surat, keuangan, dokumen, LPJ, riwayat |
| 06. Admin Panel | `system_admin` | Cabinet Center, struktur, akun, kader, permission, konfigurasi sistem |

**Konteks Workspace Bidang:** dibuka dari Workspace Switcher oleh Kepala Bidang/pengguna berizin. Menggunakan WRK-01/WRK-02 dan modul kalender, persuratan, keuangan, monitoring yang relevan. Tidak membuat screen ID tambahan.

```text
HIPMI CENTRAL
├── Public Website
├── Authentication (shared entry point; bukan area aplikasi terpisah)
├── Personal Area
├── Organization Management
│   ├── Dashboard
│   ├── Operasional Organisasi
│   ├── Administrasi & Keuangan
│   ├── Direktori & Relasi
│   ├── Publikasi & Layanan
│   ├── Monitoring & Tindak Lanjut
│   └── Workspace Switcher
│       ├── Workspace Bidang
│       ├── Workspace Kompartemen
│       └── Workspace Proker
└── Admin Panel
    ├── Cabinet Center (tanpa sidebar)
    └── Cabinet Dashboard (sidebar setelah kabinet dipilih)
```

# 4.1 Area switcher

Area Switcher hanya menampilkan area yang benar-benar dimiliki akun aktif. Satu akun dapat memiliki Personal Area sekaligus Organization Management atau Admin Panel tanpa login ulang.

Contoh:
- Mahasiswa biasa: Personal.
- Kader tanpa penugasan: Personal.
- Anggota roster Proker: Personal.
- Pengelola Proker: Personal + Organization.
- Pengurus struktural: Personal + Organization.
- Admin Sistem: Personal + Admin Panel.
- Pengguna dengan beberapa assignment: Personal + Organization dengan beberapa Workspace.
- Kabid: Personal + Organization + Workspace Bidang sesuai scope.
- Kakom: Personal + Organization + Workspace Kompartemen dan Proker bawahannya.
- Pengelola Proker: Personal + Organization + Workspace Proker yang ditugaskan.
- Admin yang juga mempunyai jabatan organisasi: area yang dimiliki masing-masing ditampilkan, tanpa mencampur permission.

Area Switcher memilih area aplikasi. Workspace Switcher memilih konteks kerja di dalam Organization Management. Workspace Switcher menampilkan tiga tipe: Bidang, Kompartemen, Proker. Kedua switcher tidak boleh dicampur menjadi satu dropdown yang membingungkan.

------------------------------------------------------------------------

# 5. Persona, Role, Permission, dan Scope

## 5.1 Pemisahan konsep

  Konsep               Makna
  -------------------- ----------------------------------------------------
  Akun                 Identitas login seseorang
  Status kader         Status keanggotaan HIPMI
  Jabatan struktural   Posisi formal dalam kabinet
  Role                 Kelompok kewenangan
  Permission           Aksi spesifik yang diizinkan
  Assignment           Penempatan pengguna pada kabinet/unit/proker/event
  Scope                Batas objek/data yang boleh diakses
  Workspace            Konteks kerja yang sedang dipilih

## 5.2 Persona utama

  ---------------------------------------------------------------------
  Persona                            Kebutuhan
  ---------------------------------- ----------------------------------
  Pengunjung                         Membaca informasi dan memakai
                                     layanan publik

  Mahasiswa Biasa                    Profil, agenda, pendaftaran,
                                     tiket, riwayat sendiri

  Kader HIPMI                        Fitur mahasiswa ditambah
                                     keanggotaan dan bisnis sendiri

  Anggota Tim Proker                 Informasi Proker dan keterlibatan
                                     pribadi

  Pengelola Proker                   Mengelola Proker yang ditugaskan

  Staff                              Menjalankan modul sesuai penugasan

  Kepala Kompartemen                 Mengelola kompartemen, membuat
                                     Proker, menunjuk Manager, menutup
                                     Proker

  Kepala Bidang                      Monitoring bidang dan kompartemen
                                     turunannya

  Ketua Umum/Wakil Ketua Umum/Sekjen Monitoring organisasi sesuai hak
                                     baca

  Sekum                              Persuratan, checklist, penomoran,
                                     Ditmawa, reopen

  Bendum                             Approval/pencairan dana,
                                     pembukuan, monitoring agregat

  Organizer/Ticketing                Mengelola agenda, peserta,
                                     verifikasi pembayaran, tiket

  Check-in Staff                     Check-in event yang ditugaskan

  Kompartemen Media Komunikasi       Review dan publikasi Media Partner

  CMS Editor/Publisher               Mengelola konten sesuai permission

  Admin Sistem                       Mengelola kabinet, struktur, akun,
                                     role, permission, konfigurasi
  ---------------------------------------------------------------------

## 5.3 Permission resolution

Permission demo harus mempertimbangkan: - akun aktif/tidak aktif; - role
yang dimiliki; - assignment yang masih aktif; - kabinet yang sedang
dipilih; - bidang/kompartemen/proker/event yang menjadi scope; -
kepemilikan data; - status record; - status workspace/Proker; -
permission tambahan yang diberikan.

Menyembunyikan menu saja tidak cukup. Setiap mock service juga harus
memeriksa permission sebelum mengubah data. Jika pengguna mengakses
route atau menjalankan aksi yang tidak sah, tampilkan `403` atau state
unauthorized yang sesuai.

## 5.4 Kewenangan yang tidak boleh tertukar

| Aktor | Kewenangan utama | Batasan yang wajib diterapkan |
|---|---|---|
| Mahasiswa Biasa | Profil, agenda, registrasi/tiket, riwayat sendiri | Tidak mengelola organisasi; tidak melihat Keanggotaan |
| Kader HIPMI | Informasi kader, riwayat jabatan/Proker, bisnis sendiri | Tidak otomatis mendapat jabatan, assignment, atau Organization Management |
| Anggota roster | Melihat record keterlibatan Proker sendiri | Tidak melihat roster penuh, tidak mengelola task/progres/keuangan |
| Pengelola Proker | Mengelola Proker yang ditugaskan, Task Board bersama, roster/progres sesuai permission | Tidak menunjuk Manager lain, tidak menutup Proker, tidak mengakses Proker lain |
| Kepala Kompartemen | Mengelola Kompartemen sendiri, membuat Proker, mengelola roster, menunjuk/mencabut Manager, mengelola progres, menutup Proker setelah syarat | Tidak menyetujui surat sebagai Sekum atau mencairkan dana sebagai Bendum |
| Kepala Bidang | Monitoring Bidang dan seluruh unit turunannya; akses Workspace Bidang dan child Workspace read-only | Tidak mutasi lintas bidang; tidak otomatis mengelola roster/Manager/menutup Proker |
| Staff | Melaksanakan modul sesuai permission dan assignment | Tidak otomatis mempunyai permission; tidak approve/disburse; tidak melihat PII/roster/keuangan di luar scope |
| Sekum | Central Inbox, review/checklist surat, nomor surat, Ditmawa, reopen | Cross-unit seluruh persuratan; tidak menyetujui dana dan tidak mengelola operasional Proker |
| Bendum | Approval/pencairan dana, pembukuan, laporan, monitoring agregat pendapatan | Cross-unit seluruh keuangan; tidak verifikasi bukti tiket/Medpart, tidak melihat PII peserta, tidak menutup Proker |
| Top Management (Ketum/Waketum/Sekjen) | Monitoring organisasi lintas unit sesuai hak baca | Tidak otomatis mendapat semua aksi mutasi/approval |
| Admin Sistem | Administrasi kabinet, struktur, akun, kader, role, permission, konfigurasi, audit | `system_admin` diberikan khusus; tidak otomatis mengambil alih fungsi Sekum/Bendum/Organizer/Medkom |
| Organizer (permission profile) | Operasi agenda/event yang ditugaskan; verifikasi pembayaran tiket jika ditunjuk | Bukan akses global; tidak otomatis mendapat fungsi keuangan Bendum |
| Check-in Staff (permission profile) | Check-in agenda yang ditugaskan | Tidak mengelola pembayaran atau agenda lain |
| Medkom (permission profile) | Review bukti/pengajuan Media Partner dan publikasi manual | Bukan pemilik approval keuangan; tidak otomatis Bendum |
| Content Creator (permission) | Membuat/edit/preview konten sesuai scope | Tidak publish tanpa permission Publisher |
| Publisher (permission) | Publish/unpublish konten sesuai scope | Tidak otomatis membuat/edit konten tanpa Content Creator |
| PSDM (permission profile) | Pengelolaan/verifikasi/penautan kader sesuai scope | Tidak otomatis Admin Sistem |
| Partnership (permission profile) | Edit perusahaan, PIC, dan riwayat kerja sama | Pengurus lain read-only sesuai permission |
| Feedback Operator (permission profile) | Triage, routing, tindak lanjut Kotak Suara privat | Tidak membuka data di luar assignment |
| LPJ Reviewer (permission profile) | Review LPJ yang ditugaskan | Bendum tidak otomatis menjadi reviewer LPJ |

**Cross-unit access Sekum/Bendum:** akses lintas unit diberikan karena fungsi sentral organisasi, bukan karena pengguna menjadi anggota setiap Workspace. Sekum dapat membuka seluruh surat dari Bidang, Kompartemen, dan Proker. Bendum dapat membuka seluruh transaksi/pengajuan/keuangan dari Bidang, Kompartemen, dan Proker. Akses lintas unit ini tidak memperluas hak mereka ke roster, task board, atau pengelolaan Proker.

**Pengajuan langsung Staff:** Staff yang mempunyai `correspondence:create` dapat submit langsung ke Sekum; Staff dengan `fund_request:create` dapat submit langsung ke Bendum. Tidak ada approval tambahan Kakom kecuali keputusan final baru secara eksplisit menambahkannya. Permission submit tidak sama dengan permission review/approve/disburse.

# 6. Authentication dan Preset Demo Accounts

## 6.1 Login

Screen `AUTH-01` menyediakan email, password, show/hide password, tombol
login, link lupa password, link registrasi, pesan validasi,
loading/error state, serta opsi mengisi akun demo dari preset.

Login demo memeriksa pasangan email/password dari daftar preset. Setelah
berhasil, sistem memuat profile, status akun, kader, role, permission,
assignment, dan workspace yang tersedia.

## 6.2 Registrasi

Screen `AUTH-02` menyediakan: 1. Nama lengkap. 2. NIM. 3. Email. 4.
Nomor telepon. 5. Fakultas. 6. Program studi. 7. Password. 8. Konfirmasi
password. 9. Persetujuan ketentuan yang relevan.

Aturan: - akun baru berstatus Mahasiswa Biasa; - NIM/email harus unik di
data demo; - program studi bergantung pada fakultas; - registrasi tidak
memberikan status kader; - kecocokan NIM hanya kandidat tautan, bukan
bukti kader terverifikasi; - role organisasi tidak dapat dipilih sendiri
oleh pendaftar.

## 6.3 Verifikasi dan pemulihan

-   `AUTH-03`: simulasi verifikasi email.
-   `AUTH-04`: input email untuk meminta reset password.
-   `AUTH-05`: password baru dan konfirmasi.
-   `AUTH-06`: informasi akun pending verification, inactive, suspended,
    atau pembatasan akses.

Tidak ada email sungguhan. Untuk uji OTP, gunakan kode demo `246810`
yang hanya ditampilkan di Demo Control Center. Kode ini bukan OTP
produksi dan tidak boleh dikirim ke layanan eksternal.

## 6.4 Preset Demo Accounts — Matriks Lengkap v1.1

Semua akun di bawah adalah fiktif. Seluruh akun aktif menggunakan password demo `HIPMI-Demo-2026!`, kecuali bila status akun memang menghalangi login. Password ini hanya untuk demo lokal dan tidak boleh digunakan pada akun produksi.

**Aturan pembacaan akun:**
- `Base role` adalah role utama sistem.
- `Cadre status` adalah status keanggotaan dan tidak sama dengan role.
- `Permission tambahan` adalah izin spesifik; Organizer, Check-in, Medkom, Content Creator, Publisher, PSDM, Partnership, Feedback Operator, dan LPJ Reviewer adalah profil permission/assignment, bukan role struktural baru.
- `Assignment/scope` menentukan data yang terlihat.
- Satu akun dapat mempunyai beberapa assignment dan beberapa permission.
- Tidak ada akun terpisah untuk setiap jabatan seseorang jika identitasnya sama.

| Demo ID | Nama tampilan | Email login | Base role / status | Permission atau assignment | Scope dan area yang harus terlihat |
|---|---|---|---|---|---|
| DEMO-01 | Raka Pratama | `demo.mahasiswa@example.test` | Mahasiswa Biasa; nonkader; active | Tidak ada | Public + Personal; tanpa Keanggotaan dan tanpa Organization Management |
| DEMO-02 | Nabila Putri | `demo.kader@example.test` | Kader HIPMI terverifikasi; active | Cadre profile milik sendiri | Public + Personal; sidebar Keanggotaan aktif; tanpa Organization Management karena tidak ada assignment |
| DEMO-03 | Dimas Wicaksono | `demo.anggota@example.test` | Mahasiswa Biasa; akun tertaut ke record roster nonkader | Member pada `proj-business-expo` | Public + Personal; Aktivitas Saya menampilkan record Proker sendiri; tidak mendapat Organization Management dan tidak melihat roster lengkap |
| DEMO-04 | Fajar Ramadhan | `demo.pengelola@example.test` | Kader HIPMI terverifikasi + Pengelola Proker | Manager aktif pada `proj-business-expo`, `proj-workshop`, dan `proj-campus-day` | Personal + Organization + tiga Workspace Proker yang ditugaskan; Task Board bersama; tidak boleh menunjuk Manager lain atau menutup Proker |
| DEMO-05 | Alya Safitri | `demo.staff.basic@example.test` | Staff; active | Assignment Staff pada `comp-demo-01`, tanpa permission mutasi tambahan | Personal + Organization; Dashboard, Agenda/Calendar sesuai read access, Workspace Kompartemen sesuai assignment; tidak ada menu Persuratan/Keuangan jika permission tidak diberikan |
| DEMO-06 | Bima Saputra | `demo.staff.surat@example.test` | Staff; active | `correspondence:create` | Personal + Organization + Workspace Kompartemen `comp-demo-01`; dapat mengajukan surat langsung kepada Sekum tanpa approval tambahan Kakom |
| DEMO-07 | Citra Maharani | `demo.staff.finance@example.test` | Staff; active | `finance:create`, `fund_request:create` | Personal + Organization + Workspace Kompartemen `comp-demo-01`; dapat mencatat transaksi draft dan mengajukan dana langsung kepada Bendum; tidak dapat approve/disburse |
| DEMO-08 | Gita Permata | `demo.kakom@example.test` | Kepala Kompartemen; kader terverifikasi | Assignment Kakom pada `comp-demo-01` | Personal + Organization + Workspace Kompartemen `comp-demo-01` dan seluruh Proker di bawahnya; dapat membuat Proker, mengelola roster, menunjuk Manager, dan menutup Proker setelah checklist lolos |
| DEMO-09 | Arif Nugraha | `demo.kabid@example.test` | Kepala Bidang; kader terverifikasi | Assignment Kabid pada `field-demo-01` | Personal + Organization + Workspace Bidang `field-demo-01`; dapat membuka Workspace Kompartemen/Proker bawahannya untuk monitoring read-only |
| DEMO-10 | Ketua Umum Demo | `demo.ketum@example.test` | Ketua Umum; active | Top Management monitoring | Personal + Organization; dashboard, struktur, kalender, statistik/laporan dan monitoring organisasi; tidak otomatis approve atau mutate |
| DEMO-11 | Wakil Ketua Umum Demo | `demo.waketum@example.test` | Wakil Ketua Umum; active | Top Management monitoring | Personal + Organization; cakupan monitoring setara Ketua Umum; tidak otomatis approve atau mutate |
| DEMO-12 | Sekretaris Jenderal Demo | `demo.sekjen@example.test` | Sekretaris Jenderal; active | Top Management monitoring | Personal + Organization; monitoring organisasi sesuai hak baca; tidak otomatis mendapat fungsi Sekum/Bendum |
| DEMO-13 | Sekretaris Umum Demo | `demo.sekum@example.test` | Sekretaris Umum; active | `correspondence:review`, `correspondence:complete`, `correspondence:reopen`, `letter:number`, `ditmawa:manage` | Personal + Organization; Central Inbox dan seluruh persuratan lintas Bidang/Kompartemen/Proker; kalender organisasi penuh; bukan pengelola operasional Proker |
| DEMO-14 | Bendahara Umum Demo | `demo.bendum@example.test` | Bendahara Umum; active | `finance:review`, `finance:approve`, `finance:disburse`, `finance:monitor` | Personal + Organization; keuangan lintas Bidang/Kompartemen/Proker, kas, pencairan, laporan, agregat tiket/Medpart; tanpa PII peserta/bukti pembayaran tiket dan tanpa approval surat |
| DEMO-15 | Organizer Demo | `demo.organizer@example.test` | Staff; active | `event:manage`, `payment:verify`, `ticket:deliver` | Event assignment `evt-business-expo`; Personal + menu Agenda/Event terbatas pada agenda yang ditugaskan |
| DEMO-16 | Check-in Staff Demo | `demo.checkin@example.test` | Staff; active | `attendance:scan`, `attendance:manual` | Event assignment `evt-business-expo`; hanya ATT-01 sampai ATT-04 untuk agenda yang ditugaskan |
| DEMO-17 | Medkom Demo | `demo.medkom@example.test` | Staff; active | `medpart:review`, `medpart:payment_verify`, `medpart:publish_manual` | Scope Kompartemen Media Komunikasi; CMS Medpart, verifikasi, dan publikasi manual; bukan Bendum |
| DEMO-18 | Content Creator Demo | `demo.editor@example.test` | Staff; active | `content_creator` | CMS sesuai scope; dapat membuat/edit draft dan preview; tidak dapat publish tanpa permission Publisher |
| DEMO-19 | Publisher Demo | `demo.publisher@example.test` | Staff; active | `publisher` | CMS sesuai scope; dapat melakukan publikasi yang diizinkan; tidak otomatis dapat membuat/mengedit konten jika tidak memiliki Content Creator |
| DEMO-20 | Editor + Publisher Demo | `demo.editorpublisher@example.test` | Staff; active | `content_creator`, `publisher` | CMS sesuai scope; dapat membuat/edit dan memublikasikan konten sendiri sesuai aturan |
| DEMO-21 | PSDM Demo | `demo.psdm@example.test` | Staff; active | `cadre:manage`, `cadre:verify` | DIR-01 sampai DIR-03 sesuai scope; memakai sumber data kader yang sama dengan Admin |
| DEMO-22 | Partnership Demo | `demo.partnership@example.test` | Staff; active | `partnership:read`, `partnership:manage` | DIR-06 sampai DIR-08; dapat mengelola perusahaan/PIC/riwayat; pengurus lain read-only sesuai hak |
| DEMO-23 | Feedback Operator Demo | `demo.feedback@example.test` | Staff; active | `feedback:triage`, `feedback:route`, `feedback:close` | CMS-12 dan CMS-13 untuk data Kotak Suara privat yang ditugaskan |
| DEMO-24 | LPJ Reviewer Demo | `demo.lpjreviewer@example.test` | Staff; active | `lpj:review` | DOC-04 dan DOC-05 untuk LPJ yang ditugaskan; tidak otomatis menjadi Bendum atau Kakom |
| DEMO-25 | Admin Sistem Demo | `demo.admin@example.test` | `system_admin`; active | Administrasi kabinet, struktur, akun, role, permission, konfigurasi, audit | Personal + Admin Panel; masuk ADM-01 tanpa sidebar; setelah memilih kabinet masuk ADM-02 dengan sidebar; tidak otomatis mendapat kewenangan Sekum/Bendum |
| DEMO-26 | Multi-Assignment Demo | `demo.multirole@example.test` | Kader terverifikasi + Staff; active | Staff `comp-demo-01`, Manager Proker `proj-business-expo` dan `proj-workshop`, `content_creator` | Personal + Organization + beberapa Workspace; membuktikan Area Switcher dan Workspace Switcher; pergantian konteks tidak boleh membawa data/permission workspace sebelumnya |
| DEMO-27 | Akun Belum Verifikasi | `demo.pending@example.test` | Mahasiswa Biasa; `verification_pending` | Tidak ada | Login diarahkan ke AUTH-06; menu internal tidak tersedia |
| DEMO-28 | Akun Ditangguhkan | `demo.suspended@example.test` | Mahasiswa Biasa; `suspended` | Tidak ada | Login ditolak dengan AUTH-06; tidak boleh masuk Personal/Organization/Admin |

**Data identitas fiktif:** untuk akun mahasiswa/kader gunakan NIM placeholder `DEMO-2026-001` dan seterusnya; untuk akun staff/admin nonmahasiswa, NIM boleh `null` atau memakai kode `DEMO-STAFF-xxx` jika form memerlukannya. Fakultas/program studi menggunakan label Demo dan nomor telepon memakai placeholder. Jangan memakai NIM, nomor telepon, atau email nyata. Untuk semua akun yang membutuhkan kader terverifikasi, seed `cadre_status=verified`; akun DEMO-03 adalah contoh anggota roster nonkader.

**Default landing setelah login:**

| Demo ID | Default landing | Perilaku setelah masuk |
|---|---|---|
| DEMO-01 sampai DEMO-03 | PER-01 | Personal Area; tidak ada Organization Management kecuali assignment yang sah kemudian ditambahkan |
| DEMO-04 sampai DEMO-24 | PER-01 | Area Switcher tersedia untuk Organization Management; setelah memilih area, default ke ORG-01 atau modul pertama yang diizinkan; jika memilih Workspace, buka WRK-01 dengan scope assignment |
| DEMO-25 | ADM-01 | Cabinet Center tanpa sidebar; pilih kabinet untuk masuk ADM-02 |
| DEMO-26 | PER-01 | Personal + Organization; Workspace Switcher menampilkan Kompartemen dan dua Proker yang ditugaskan |
| DEMO-27 | AUTH-06 | Status verification_pending; tidak masuk Personal Area |
| DEMO-28 | AUTH-06 | Status suspended; login ditolak |

**Akun yang wajib diuji saat demo:**
1. Mahasiswa biasa: DEMO-01.
2. Kader terverifikasi tanpa jabatan: DEMO-02.
3. Anggota roster tanpa hak kelola: DEMO-03.
4. Pengelola Proker: DEMO-04.
5. Staff tanpa permission tambahan: DEMO-05.
6. Staff dengan permission surat: DEMO-06.
7. Staff dengan permission keuangan: DEMO-07.
8. Kakom, Kabid, Top Management, Sekum, Bendum: DEMO-08 sampai DEMO-14.
9. Permission operasional: DEMO-15 sampai DEMO-24.
10. Admin Sistem: DEMO-25.
11. Multi-assignment: DEMO-26.
12. Status akun: DEMO-27 dan DEMO-28.

## 6.5 Skenario akun multi-role

Akun `demo.multirole@example.test` wajib dipakai untuk menguji satu identitas dengan beberapa konteks:
- Status kader terverifikasi.
- Role struktural Staff pada satu Kompartemen.
- Assignment Pengelola Proker pada dua Proker yang berbeda.
- Permission tambahan Content Creator.
- Area yang tersedia: Personal Area dan Organization Management.
- Workspace yang tersedia: satu Workspace Kompartemen dan dua Workspace Proker.

Aturan:
- Pengguna tidak mengganti role melalui dropdown profil.
- Pengguna berpindah area melalui Area Switcher dan berpindah konteks kerja melalui Workspace Switcher.
- Role, permission, dan scope dihitung ulang pada setiap perpindahan.
- Assignment yang dicabut tidak boleh tetap muncul setelah refresh atau navigasi.
- Permission dari satu workspace tidak boleh diwariskan ke workspace lain.
- Admin Sistem yang juga mempunyai assignment organisasi tetap memisahkan Admin Panel dari Organization Management.

## 6.6 Alur login dan redirect

``` text
Public Website
  → Login
  → Validasi demo account
  → Muat profile + role + permission + assignment
  → Tentukan area yang dimiliki
      ├── Mahasiswa/Kader/Anggota → Personal Dashboard
      ├── Pengurus/Manager → Personal Dashboard + Area Switcher
      └── system_admin → Cabinet Center (tanpa sidebar)
```

Jika akun memiliki beberapa area, tampilkan Area Switcher dan arahkan ke area terakhir yang dipilih hanya jika masih sah. Jika akun memiliki beberapa Workspace, tampilkan Workspace Switcher pada topbar.

**Perilaku demo login:**
1. Halaman `/masuk` menampilkan email, password, show/hide password, tombol Masuk, link Daftar, Lupa Password, dan tombol/selector `Gunakan Akun Demo`.
2. `Gunakan Akun Demo` hanya mengisi email/password preset; tidak langsung mengubah identitas tanpa menekan Masuk.
3. Setelah Masuk, validasi status akun terlebih dahulu. `verification_pending`, `inactive`, dan `suspended` diarahkan ke AUTH-06.
4. Jika valid, muat profile, status kader, base role, permission, assignment, scope, dan area yang tersedia.
5. Mahasiswa/Kader/Anggota roster diarahkan ke PER-01.
6. Pengurus/Pengelola Proker diarahkan ke PER-01 dan melihat Area Switcher untuk Organization Management.
7. `system_admin` diarahkan ke ADM-01 Cabinet Center tanpa sidebar.
8. `returnTo` hanya dipakai jika route tujuan masih valid dan boleh diakses; jika tidak, gunakan redirect default.
9. Refresh mempertahankan session demo sesuai konfigurasi LocalStorage; Logout menghapus session saja, bukan seed mock store.

------------------------------------------------------------------------

# 7. Public Website --- Navbar dan Halaman Publik

## 7.1 Navbar publik final

Navbar publik memiliki tepat enam menu utama:

1.  **Beranda**
2.  **Tentang Kami**
3.  **Organisasi**
    -   Kabinet
    -   Bidang
    -   Kompartemen
    -   Program Kerja
4.  **Aktivitas**
    -   Agenda & Tiket
    -   Berita & Artikel
    -   Media Partner
5.  **Karya Kader**
    -   Bisnis Kader
    -   Prestasi Kader
6.  **Kotak Suara**

Kontrol akun `Login / Daftar` terpisah dari enam menu utama.
`Cek Status Tiket` merupakan CTA di halaman Agenda & Tiket, bukan menu
navbar ketujuh.

## 7.2 Aturan halaman publik

-   Tidak perlu login untuk membaca konten publik.
-   Media Partner dapat diajukan tanpa akun.
-   Setelah submit, pemohon memperoleh kode tracking unik; cek status Media Partner menggunakan kode tersebut, bukan pencarian bebas berdasarkan nama.
-   Kotak Suara dapat dikirim publik.
-   Halaman publik hanya menampilkan data Published/approved yang memang
    boleh dipublikasikan.
-   Jangan mengirim data internal atau PII ke komponen publik.
-   Proker yang tanggalnya disembunyikan menampilkan `Coming Soon`.
-   Bisnis yang belum approved/published tidak muncul di direktori
    publik.
-   Prestasi hanya muncul setelah status publik sesuai alur.
-   Beranda menampilkan empat prestasi Published terbaru, bukan empat
    baris snapshot yang disalin manual.

------------------------------------------------------------------------

# 8. Sidebar, Topbar, dan Workspace per Area/Role

## 8.1 Personal Area

Struktur sidebar utama:
1. Dashboard Saya → PER-01.
2. Profil Saya → PER-02 dan PER-03.
3. Keanggotaan → khusus Kader HIPMI terverifikasi; PER-05, PER-06, PER-10, PER-11.
   - Status & Informasi Kader → PER-05.
   - Riwayat Jabatan → PER-06.
   - Bisnis Saya → PER-10.
   - Tambah/Edit Bisnis → PER-11.
4. Aktivitas Saya → PER-07, PER-08, PER-09.
   - Keikutsertaan Proker.
   - Registrasi & Tiket.
   - Agenda & Kehadiran.
5. Pengaturan Akun → PER-04.

Notifikasi berada di Notification Center/ikon lonceng → PER-12, bukan menu sidebar utama tambahan. PER-12 dan SYS-03 menggunakan record notifikasi yang sama.

### Mahasiswa Biasa

-   Dashboard Saya.
-   Profil Saya.
-   Aktivitas Saya.
-   Pengaturan Akun.

Tidak menampilkan Keanggotaan jika belum menjadi kader.

### Kader HIPMI

-   Dashboard Saya.
-   Profil Saya.
-   Keanggotaan.
-   Aktivitas Saya.
-   Pengaturan Akun.

Keanggotaan menampilkan status kader, tingkatan kader, tanggal/status
verifikasi, riwayat kabinet/jabatan, Proker, kehadiran, bisnis, dan
prestasi yang memang dimiliki.

### Anggota Tim Proker

-   Tetap menggunakan Personal Area.
-   Menampilkan keterlibatan Proker sendiri.
-   Menampilkan informasi roster miliknya sendiri sesuai aturan akses
    final.
-   Tidak mendapat Organization Management hanya karena tercatat sebagai
    anggota roster.
-   Tidak mendapat akses untuk mengelola seluruh Proker.

### Aktivitas Saya

Tab/section: - Agenda & Tiket. - Program Kerja. - Riwayat.

Jangan membuat menu `Tugas Saya` sebagai tugas personal ber-PIC karena
Task Board Proker adalah board bersama tanpa PIC individual.

## 8.2 Organization Management

Gunakan satu template dashboard dan satu sidebar dinamis. Struktur
kelompok menu:

1.  **Dashboard**
2.  **Operasional Organisasi**
    -   Program Kerja
    -   Agenda & Event
    -   Kalender Organisasi
3.  **Administrasi & Keuangan**
    -   Persuratan
    -   Keuangan
    -   Arsip Dokumen & LPJ
4.  **Direktori & Relasi**
    -   Direktori Kader
    -   Bisnis Kader
    -   Sponsor & Mitra
5.  **Publikasi & Layanan**
    -   CMS/Pengelolaan Website
    -   Media Partner
    -   Kotak Suara
6.  **Monitoring & Tindak Lanjut**
    -   Statistik & Laporan
    -   Approval Center
7.  **Workspace** --- kelompok terpisah
    -   Workspace Bidang
    -   Workspace Kompartemen
    -   Workspace Proker

Topbar: - Workspace Switcher; - pencarian; - Notification Center; -
profil pengguna; - Area Switcher jika akun memiliki area lebih dari
satu.

Menu yang dinonaktifkan pada konfigurasi kabinet tidak muncul. Menu yang
tidak boleh digunakan tidak boleh tetap menampilkan tombol aksi aktif.

## 8.3 Variasi Sidebar per Role, Permission, dan Scope

### 8.3.1 Public Website

Public Website tidak memakai sidebar internal. Navbar publik selalu memiliki enam menu utama:
1. Beranda.
2. Tentang Kami.
3. Organisasi: Kabinet, Bidang, Kompartemen, Program Kerja.
4. Aktivitas: Agenda & Tiket, Berita & Artikel, Media Partner.
5. Karya Kader: Bisnis Kader, Prestasi Kader.
6. Kotak Suara.

Kontrol `Login / Daftar` terpisah dari enam menu utama. `Cek Status Tiket` adalah CTA pada halaman Agenda & Tiket yang menuju TKT-05, bukan menu navbar. `Cek Status Media Partner` adalah CTA pada PUB-15/PUB-17.

### 8.3.2 Personal Area — semua akun terdaftar

Sidebar Personal Area:
1. **Dashboard Saya** → PER-01.
2. **Profil Saya** → PER-02, PER-03.
3. **Keanggotaan** → khusus Kader HIPMI terverifikasi; PER-05, PER-06, PER-10, PER-11.
   - Status & Informasi Kader → PER-05.
   - Riwayat Jabatan → PER-06.
   - Bisnis Saya → PER-10.
   - Tambah/Edit Bisnis → PER-11.
4. **Aktivitas Saya** → PER-07, PER-08, PER-09.
   - Keikutsertaan Proker → PER-07.
   - Registrasi & Tiket → PER-08.
   - Agenda & Kehadiran → PER-09.
5. **Pengaturan Akun** → PER-04.

Notification Center dibuka dari ikon lonceng pada topbar → PER-12. Notifikasi tidak menjadi item sidebar utama.

**Mahasiswa Biasa:** tidak melihat Keanggotaan, Bisnis Saya, atau riwayat kader.  
**Kader HIPMI:** melihat Keanggotaan dan seluruh submenu yang memang menjadi hak pemilik.  
**Anggota roster:** tetap memakai Personal Area sesuai status kadernya; Aktivitas Saya hanya menampilkan record keterlibatan miliknya.  
**Kader tanpa assignment:** tidak otomatis memperoleh Organization Management.  
**Anggota roster tanpa akun:** record roster tetap ada; Personal Area baru tersedia setelah akun ditautkan dan identitasnya diverifikasi.

### 8.3.3 Organization Management — kelompok sidebar

Gunakan kelompok navigasi berikut. Menu hanya tampil jika role, permission, assignment, status kabinet, dan scope mengizinkan.

| Kelompok | Menu / submenu | Screen ID tujuan utama |
|---|---|---|
| Dashboard | Dashboard Organisasi | ORG-01 |
| Operasional Organisasi | Program Kerja | WRK-03, WRK-05 |
| Operasional Organisasi | Agenda & Event | EVT-01, EVT-02, EVT-04 |
| Operasional Organisasi | Kalender Organisasi | CAL-01 |
| Administrasi & Keuangan | Persuratan | COR-01, COR-02 |
| Administrasi & Keuangan | Keuangan | FIN-01, FIN-02, FIN-04 |
| Administrasi & Keuangan | Arsip Dokumen & LPJ | DOC-01, DOC-04, DOC-06 |
| Direktori & Relasi | Direktori Kader | DIR-01 |
| Direktori & Relasi | Bisnis Kader | DIR-04 |
| Direktori & Relasi | Sponsor & Mitra | DIR-06 |
| Publikasi & Layanan | CMS & Publikasi | CMS-01 |
| Publikasi & Layanan | Media Partner | CMS-08 |
| Publikasi & Layanan | Kotak Suara | CMS-12 |
| Monitoring & Tindak Lanjut | Statistik & Laporan | ORG-06, SYS-01, SYS-02 |
| Monitoring & Tindak Lanjut | Approval Center | SYS-04 |
| Workspace | Workspace Bidang | WRK-01 dengan `workspace_type=field` |
| Workspace | Workspace Kompartemen | WRK-01 dengan `workspace_type=compartment` |
| Workspace | Workspace Proker | WRK-01 dengan `workspace_type=project` |

`ORG-05 Activity & Action Center` adalah halaman ringkasan aktivitas dan tindak lanjut organisasi sesuai scope. `SYS-04 Approval Center` adalah daftar formal proses yang menunggu keputusan. Keduanya hanya mengarahkan ke modul sumber dan tidak membuat workflow approval baru.

### 8.3.4 Topbar Organization Management

Urutan kontrol topbar:
1. Workspace Switcher jika akun mempunyai lebih dari satu assignment Workspace.
2. Global Search.
3. Notification Center (SYS-03).
4. Area Switcher jika akun mempunyai lebih dari satu area aplikasi.
5. Profil pengguna dan Logout.

Workspace Switcher menampilkan nama Workspace, jenis, kabinet, unit induk, dan status. Setelah berpindah, data, breadcrumb, sidebar, dan active state harus berubah bersama. Tidak boleh ada data Workspace sebelumnya yang tertinggal.

### 8.3.5 Sidebar yang diharapkan per role

| Akun / role | Sidebar dan halaman yang muncul | Batas akses penting |
|---|---|---|
| Mahasiswa Biasa | Personal Area: Dashboard Saya, Profil Saya, Aktivitas Saya, Pengaturan Akun; notifikasi melalui lonceng | Tidak melihat Keanggotaan, Workspace, Organization Management, atau Admin Panel |
| Kader HIPMI | Personal Area: Dashboard Saya, Profil Saya, Keanggotaan (Status Kader, Riwayat Jabatan, Bisnis Saya, Pengajuan Bisnis), Aktivitas Saya, Pengaturan Akun | Status kader tidak otomatis memberi jabatan atau akses Organization Management |
| Anggota Tim Proker | Sidebar Personal Area mengikuti status kader; Aktivitas Saya memuat Proker yang diikuti | Hanya record keterlibatan sendiri; tidak melihat roster penuh, Task Board pengelola, atau menu kelola Proker |
| Pengelola Proker | Personal Area + Organization Management; menu Program Kerja, Agenda & Kalender, Persuratan/Keuangan/Dokumen sesuai permission; Workspace Proker yang ditugaskan | Tidak menunjuk Manager lain, tidak menutup Proker, tidak mengakses Proker lain |
| Staff tanpa permission tambahan | Personal Area + Organization Management hanya jika ada assignment; Dashboard, Kalender read-only, Workspace sesuai assignment | Tidak otomatis melihat Persuratan, Keuangan, PII, roster lengkap, atau approval |
| Staff dengan `correspondence:create` | Sidebar Staff + Persuratan/Form Pengajuan Surat pada scope unit | Boleh submit langsung ke Sekum; tidak review/complete/reopen |
| Staff dengan `finance:create` dan `fund_request:create` | Sidebar Staff + Keuangan Unit/Form Pengajuan Dana pada scope unit | Boleh mencatat sesuai izin dan mengajukan langsung ke Bendum; tidak approve/disburse |
| Kepala Kompartemen | Dashboard, Struktur Kompartemen, Program Kerja, Agenda & Kalender, Persuratan, Keuangan, Dokumen & LPJ sesuai izin, Workspace Kompartemen, Workspace Proker bawahannya | Kelola penuh hanya dalam Kompartemen sendiri; hanya Kakom menunjuk Manager dan menutup Proker |
| Kepala Bidang | Dashboard, Struktur/Monitoring Bidang, Agenda & Kalender, Statistik/Laporan, Workspace Bidang; tautan read-only ke Workspace Kompartemen/Proker di bawahnya | Monitoring penuh dalam bidang sendiri; tidak otomatis mengubah operasional unit, roster, Manager, atau penutupan Proker |
| Ketua Umum | Dashboard, Organization Overview, Agenda & Kalender, Monitoring, Statistik/Laporan, Activity Center | Monitoring organisasi; tidak otomatis memperoleh approval atau mutasi |
| Wakil Ketua Umum | Sama dengan Ketua Umum | Monitoring organisasi; tidak otomatis memperoleh approval atau mutasi |
| Sekjen | Dashboard, Organization Overview, Agenda & Kalender, Monitoring, Statistik/Laporan, Activity Center | Monitoring organisasi; tidak otomatis memperoleh fungsi Sekum/Bendum |
| Sekum | Dashboard, Persuratan (Central Inbox), Arsip Persuratan, Administrasi Nomor, Monitoring Ditmawa, Kalender Organisasi, Approval Center terkait | Cross-unit seluruh surat Bidang/Kompartemen/Proker; tidak mengelola roster/progres/operasional Proker |
| Bendum | Dashboard, Keuangan, Kas & Transaksi, Pengajuan Dana, Persetujuan, Pencairan, Pendapatan Tiket/Medpart agregat, Laporan Keuangan, Kalender Organisasi | Cross-unit seluruh keuangan Bidang/Kompartemen/Proker; tidak memverifikasi bukti tiket/Medpart, tidak melihat PII peserta, tidak menutup Proker |
| Organizer | Dashboard Agenda, Daftar Agenda, Peserta, Verifikasi Pembayaran, Ticket Delivery, Laporan untuk event assignment | Hanya agenda yang ditugaskan; bukan akses global |
| Check-in Staff | Check-in Dashboard, Scanner, Daftar Kehadiran, Manual Check-in untuk event assignment | Tidak mengelola pembayaran, tidak mengakses event lain |
| Medkom | CMS Dashboard, Media Partner Management, Verifikasi, Paket/QRIS jika diberi permission, Publikasi Manual | Medkom memeriksa bukti dan pengajuan serta memublikasikan manual; bukan Bendum |
| Content Creator | CMS Dashboard, Homepage Editor/Media Library/Article Editor atau konten sesuai permission | Dapat membuat/edit/preview; tidak publish tanpa Publisher |
| Publisher | Queue konten yang boleh dipublikasikan dan tindakan Publish/Unpublish sesuai scope | Tidak otomatis dapat membuat atau mengedit konten |
| PSDM | Direktori Kader dan Verifikasi/Penautan Kader sesuai permission | Mengelola satu sumber database kader; tidak otomatis menjadi Admin Sistem |
| Partnership | Direktori Perusahaan/Sponsor/Mitra dan Riwayat Kerja Sama | Edit hanya pada scope Partnership; pengurus lain read-only |
| Feedback Operator | Kotak Suara privat: CMS-12 dan CMS-13 | Tidak membuat daftar aspirasi publik; data identitas pengirim dibatasi |
| LPJ Reviewer | LPJ yang ditugaskan: DOC-04 dan DOC-05 | Review sesuai assignment; Bendum tidak otomatis menjadi reviewer |
| Admin Sistem | Admin Panel terpisah; ADM-01 tanpa sidebar, ADM-02 dengan sidebar setelah kabinet dipilih | `system_admin` harus diberikan khusus; tidak otomatis mendapat fungsi Sekum/Bendum |

### 8.3.6 Sidebar Admin Panel

Sebelum kabinet dipilih:
- Tampilkan ADM-01 Cabinet Center.
- Tidak ada sidebar Admin Panel.
- Hanya `system_admin` yang boleh masuk.

Setelah kabinet dipilih, tampilkan dua kelompok sidebar:
1. **Pengelolaan Struktur & Akun**
   - Overview → ADM-02.
   - Struktur Organisasi → ADM-05.
   - Jabatan & Pengurus → ADM-05 tab Jabatan/Penempatan dan ADM-07.
   - Manajemen Pengguna → ADM-08 dan ADM-09.
   - Database Kader → ADM-08/ADM-09 atau DIR-01 sampai DIR-03 sesuai permission.
2. **Pengelolaan Sistem & Akses**
   - Role & Permission → ADM-10.
   - Konfigurasi Modul → ADM-11.
   - Audit Log → ADM-12.

ADM-06 dan ADM-07 adalah halaman/detail yang dibuka dari bagian terkait, bukan item sidebar tingkat pertama. ADM-05 memiliki tiga tab: Struktur, Jabatan, Penempatan. ADM-08/ADM-09 memakai tab Identitas, Keanggotaan, Jabatan, Permission, Riwayat.

### 8.3.7 Aturan resolusi sidebar

- Sidebar bukan daftar role statis; ia hasil gabungan role + permission + assignment + scope + status kabinet.
- Menu yang tidak berizin tidak ditampilkan.
- Deep link ke route terlarang tetap harus menampilkan SYS-07/403.
- Menu yang tidak aktif karena status Proker/kabinet harus disabled dengan alasan, bukan tombol palsu.
- Permission tambahan tidak memperluas scope melebihi assignment.
- Workspace Bidang, Kompartemen, dan Proker adalah konteks dari satu area Workspace, bukan area aplikasi baru.

## 8.4 Dashboard berdasarkan role

Satu template dashboard dengan empat bagian dasar: 1. Ringkasan. 2.
Agenda Mendatang. 3. Aktivitas Terbaru. 4. Notifikasi.

Isi dan urutan widget dapat menyesuaikan role, tetapi tidak membuat
dashboard berbeda dari nol untuk setiap jabatan.

Fokus: - Top Management: monitoring organisasi. - Sekum: persuratan dan
administrasi. - Bendum: saldo, transaksi, pengajuan, pencairan, dan
laporan. - Kabid: monitoring bidang dan kompartemen. - Kakom:
operasional kompartemen dan Proker. - Staff: pekerjaan sesuai
assignment. - Pengelola Proker: pelaksanaan Proker yang ditugaskan.

Jangan menampilkan persentase progres Proker.

## 8.5 Workspace Bidang

Workspace Bidang menggunakan template WRK-01/WRK-02 dengan `workspace_type=field`. Workspace ini ditujukan terutama untuk Kepala Bidang dan pengguna lain yang diberi permission monitoring bidang.

**Navigasi Workspace Bidang:**
1. Overview → WRK-01.
2. Informasi Bidang → WRK-02.
3. Kompartemen → ORG-03/ORG-04 atau daftar unit dalam konteks Bidang.
4. Agenda & Kalender → CAL-02.
5. Persuratan → COR sesuai scope.
6. Keuangan → FIN sesuai scope dan permission.
7. Dokumen/Laporan → DOC/SYS sesuai permission.

**Data pada header:** nama Bidang, kabinet, Kepala Bidang, periode, status, jumlah Kompartemen, jumlah Proker, agenda terdekat.

**Aturan:**
- Kabid dapat membuka semua Workspace Kompartemen dan Workspace Proker di bawah bidangnya untuk monitoring.
- Tampilan operasional unit bersifat read-only bagi Kabid kecuali ada permission mutasi yang diberikan secara eksplisit dan tidak melanggar kewenangan Kakom/Manager.
- Kabid tidak otomatis dapat membuat Proker, mengelola roster, menunjuk Manager, atau menutup Proker.
- Workspace Bidang tidak memiliki menu pembuatan Proker karena kepemilikan Proker berada pada Kompartemen.
- Workspace Bidang tidak menambah Screen ID baru; gunakan WRK-01/WRK-02 dan screen modul terkait.

## 8.6 Workspace Kompartemen

Pengguna utama: Kepala Kompartemen dan Staff yang mempunyai assignment/permission. Kabid dapat masuk sebagai pembaca monitoring pada Kompartemen di bawah bidangnya.

**Navigasi Workspace Kompartemen:**
1. Overview → WRK-01.
2. Informasi Kompartemen → WRK-02.
3. Anggota/Staff → WRK-06 sesuai permission.
4. Program Kerja → WRK-03, WRK-04, WRK-05.
5. Progres & Pleno → WRK-08, WRK-09.
6. Kalender & Agenda → CAL-02; tombol Buat Agenda membuka CAL-04 dengan Kompartemen otomatis terisi.
7. Persuratan → COR sesuai permission.
8. Keuangan → FIN sesuai permission.
9. Dokumen & LPJ → DOC sesuai permission.

**Data utama:** identitas Kompartemen, Bidang induk, Kakom, Staff, daftar Proker, agenda, pleno, pengajuan surat, keuangan sesuai permission, dokumen, dan aktivitas unit.

**Kewenangan Kakom:**
- Mengelola Kompartemen sendiri.
- Menambah Staff sesuai kewenangan.
- Membuat Proker dalam Kompartemen sendiri.
- Menunjuk/mencabut Pengelola Proker yang memenuhi syarat.
- Mengelola roster sesuai aturan.
- Mengelola progres Kompartemen secara terpisah dari progres Proker.
- Memantau seluruh Proker di bawah Kompartemen.
- Menutup Proker setelah seluruh prasyarat terpenuhi.

**Batasan Staff:** Staff hanya memperoleh fitur sesuai permission. Staff tidak otomatis dapat melihat seluruh PII, seluruh roster, seluruh keuangan, atau seluruh Workspace. Staff dengan `correspondence:create` atau `fund_request:create` dapat mengirim pengajuan langsung ke Sekum/Bendum tanpa approval tambahan Kakom.

## 8.7 Workspace Proker

Workspace Proker adalah konteks satu Proker. Pengguna: Kakom pemilik, Pengelola Proker yang ditunjuk, anggota roster sebagai pembaca informasi pribadi, dan role monitoring sesuai scope.

**Navigasi Workspace Proker:**
1. Overview → WRK-01.
2. Informasi Proker → WRK-02/WRK-05.
3. Tim Pelaksana → WRK-06.
4. Tugas & Progres → WRK-08.
5. Kalender & Agenda → CAL-02; tombol Buat Agenda membuka CAL-04 dengan Proker otomatis terisi.
6. Persuratan → COR sesuai permission.
7. Keuangan → FIN sesuai permission.
8. Dokumen & LPJ → DOC sesuai permission.
9. Riwayat → WRK-05 tab Riwayat.

**Project 360 (WRK-05) mempunyai tab:**
- Overview.
- Informasi.
- Roster.
- Agenda.
- Persuratan.
- Keuangan.
- Dokumen & LPJ.
- Riwayat.

Setiap tab harus memakai `project_id` yang sama dan membaca record dari modul sumber; jangan membuat salinan data baru hanya untuk tab Project 360.

**Aturan:**
- Satu Proker dapat memiliki beberapa Pengelola Proker.
- Pengelola Proker mengelola Task Board bersama.
- Task Board tidak mempunyai PIC individual; kolom: To Do, In Progress, Blocked, Done.
- Agenda dibuat melalui CAL-04; Workspace Proker hanya menampilkan agenda terkait dan menyediakan shortcut dengan konteks Proker otomatis.
- Pengelolaan jenis tiket, peserta, pembayaran, dan check-in tetap menggunakan EVT/TKT/ATT.
- Tim dapat terdiri dari kader, nonkader, dan anggota yang belum mempunyai akun.
- Pengelola Proker harus memiliki akun aktif dan status kader terverifikasi.
- Hanya Kakom yang dapat menunjuk/mencabut Pengelola Proker.
- Pengelola Proker tidak dapat menunjuk Manager lain atau menutup Proker.
- Pengelola Proker hanya mengakses Proker yang ditugaskan.
- Anggota biasa tidak mendapatkan Organization Management dan hanya melihat record keterlibatan miliknya.
- Setelah Proker ditutup, workspace menjadi read-only/arsip bagi pihak berwenang; riwayat tetap tersedia.

## 8.8 Admin Panel dan Cabinet Center

Alur wajib:

``` text
Admin Login
  → ADM-01 Cabinet Center (tanpa sidebar)
  → Pilih kabinet
  → ADM-02 Cabinet Dashboard (sidebar aktif)
  → Modul administrasi kabinet terpilih
```

Cabinet Center menampilkan seluruh kabinet, status, periode, identitas,
tombol tambah kabinet, dan tombol buka kabinet.

Setelah kabinet dipilih, tampilkan sidebar Admin Panel: 1. Dashboard. 2.
Struktur Organisasi (tab Struktur, Jabatan, Penempatan Pengurus). 3.
Pengguna & Kader. 4. Akses & Permission (Template Role, Permission
Khusus). 5. Pengaturan & Aktivitas (Pengaturan Kabinet, Konfigurasi
Sistem, Audit Aktivitas).

Admin mengelola struktur, akun, kader, permission, dan konfigurasi.
Admin tidak otomatis dapat menyetujui surat, menyetujui dana,
memverifikasi tiket, atau menutup Proker.

Audit Aktivitas administratif hanya untuk Admin Sistem. Catatan audit
tidak dapat diedit/dihapus melalui UI.



---

# 9. Master Screen Inventory dan Spesifikasi Data 146 Screen

## 9.1 Aturan inventaris

- Jumlah final: **146 Screen ID**.
- Prefix: 16 kelompok.
- Satu template boleh dipakai oleh beberapa Screen ID.
- Screen ID tidak sama dengan jumlah komponen.
- Tab, section, modal, drawer, dan dialog bukan otomatis Screen ID baru.
- Setiap Screen ID harus mempunyai route registry, page owner, data, permission, action, UI states, dan acceptance criteria.
- Screen yang hanya dapat diakses melalui deep link tetap wajib dibuat dan diuji.
- Data pada setiap halaman harus berasal dari shared mock repository, bukan array dummy terpisah per komponen.

## 9.2 Rekap inventaris

| Prefix | Area fungsional | Jumlah |
|---|---|---:|
| PUB | Public Website | 22 |
| TKT | Public Ticketing | 8 |
| AUTH | Authentication | 6 |
| PER | Personal Area | 12 |
| ADM | Admin Panel | 12 |
| ORG | Organization Management | 6 |
| WRK | Workspace & Proker | 10 |
| CAL | Calendar | 4 |
| COR | Correspondence | 7 |
| FIN | Financial Management | 10 |
| EVT | Event Management | 9 |
| ATT | Attendance | 4 |
| DOC | Documents & LPJ | 6 |
| DIR | Directories | 8 |
| CMS | CMS & Content Management | 13 |
| SYS | Shared System & Error States | 9 |
| **TOTAL** | **16 kelompok** | **146** |

## 9.3 Area PUB — 22 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| PUB-01 | Beranda | Hero/tagline ARTHAKARSA, foto Ketum/Waketum, benefit, profil, kabinet, struktur, bidang/kompartemen, Proker, 4 prestasi terbaru, bisnis, agenda, berita, footer | CTA Tentang Kami, detail kabinet/unit/Proker, lihat semua prestasi/bisnis/agenda | Publik |
| PUB-02 | Tentang Kami | Profil HIPMI PT Universitas Telkom, sejarah, tujuan, nilai, manfaat, informasi organisasi | Navigasi section dan tautan Organisasi | Publik |
| PUB-03 | Daftar Kabinet | Kabinet aktif/arsip, logo, nama, periode, status | Filter periode, lihat detail | Publik |
| PUB-04 | Detail Kabinet | Logo/filosofi, visi-misi, periode, struktur, pengurus dari Ketum sampai Kakom | Buka cabang mind map, pilih pengurus, carousel manual/pause, buka detail unit | Publik |
| PUB-05 | Daftar Bidang | Kartu bidang, ringkasan tugas, Kepala Bidang, kompartemen di bawahnya | Buka detail bidang/kompartemen | Publik |
| PUB-06 | Detail Bidang | Profil bidang, pimpinan, deskripsi tugas, kompartemen, Proker/agenda publik terkait | Buka kompartemen atau Proker | Publik |
| PUB-07 | Daftar Kompartemen | Tab Semua/Bidang 1–4, kartu kompartemen | Ganti tab, cari, lihat detail | Publik |
| PUB-08 | Detail Kompartemen | Profil kompartemen, Kakom, bidang induk, tugas, Proker dan agenda publik | Buka bidang, Proker, atau agenda | Publik |
| PUB-09 | Daftar Program Kerja | Proker Published, kabinet, bidang, kompartemen, status publikasi | Search, filter kabinet/bidang/kompartemen, buka detail | Publik |
| PUB-10 | Detail Program Kerja | Logo, nama, tujuan, deskripsi, kompartemen, status publik, tanggal jika diizinkan, dokumentasi, agenda Published | Buka agenda, kembali ke daftar | Publik |
| PUB-11 | Daftar Agenda & Tiket | Poster, nama agenda, jadwal publik, lokasi, kategori Gratis/Berbayar, status pendaftaran | Search/filter, detail, CTA Cek Status Tiket | Publik |
| PUB-12 | Detail Agenda | Informasi lengkap agenda, penyelenggara, jadwal, lokasi, ketentuan, jenis tiket | Pilih tiket atau Daftar Gratis | Publik |
| PUB-13 | Berita & Artikel | Judul, kategori, cover, ringkasan, tanggal, pencarian | Filter kategori, search, buka detail | Publik |
| PUB-14 | Detail Berita/Artikel | Judul, isi, gambar, tanggal, kategori, sumber eksternal bila ada | Baca sumber asli, kembali ke daftar | Publik |
| PUB-15 | Informasi Media Partner | Penjelasan layanan, paket Gratis/Berbayar, syarat, harga, materi terbit | Ajukan Medpart, cek status | Publik |
| PUB-16 | Pengajuan Media Partner | Identitas pengaju, kegiatan, paket, poster/dokumen, kontak, tanggal publikasi yang diminta, tahap pembayaran jika paid | Submit, lanjut pembayaran demo, simpan kode tracking | Publik tanpa login |
| PUB-17 | Cek Status Media Partner | Kode tracking unik yang diterima pemohon; status aman, tanggal pengajuan, tahapan proses, catatan revisi yang boleh dibuka | Masukkan kode, cek status, tampilkan ringkasan aman; jangan membuka detail/PII tanpa verifikasi | Publik pemilik kode |
| PUB-18 | Direktori Bisnis Kader | Bisnis Published, foto, nama, kategori, pemilik, ringkasan | Search/filter, buka detail | Publik |
| PUB-19 | Detail Bisnis Kader | Profil usaha, galeri, produk/layanan, kontak yang disetujui | Buka kanal kontak publik | Publik |
| PUB-20 | Daftar Prestasi Kader | Prestasi Published, foto kader, judul, kategori, tahun | Filter kategori/tahun, detail | Publik |
| PUB-21 | Detail Prestasi Kader | Foto kader, judul, pencapaian, deskripsi, bukti/dokumentasi publik | Buka dokumentasi/tautan yang disetujui | Publik |
| PUB-22 | Kotak Suara | Kategori masukan, judul, deskripsi, identitas opsional, consent privasi | Kirim masukan, tampilkan receipt | Publik |

Aturan PUB khusus:
- `PUB-01`: fallback foto memakai `siluet.png` jika aset profil kosong; statistik ilustrasi tidak boleh ditampilkan sebagai data real.
- `PUB-09` dan `PUB-10`: hanya Proker Published; tanggal internal yang disembunyikan tidak boleh terkirim ke client publik.
- `PUB-11` dan `PUB-12`: kategori gratis tidak diarahkan ke QRIS.
- `PUB-16` dan `PUB-17`: pengajuan Medpart tidak memerlukan akun; detail pengajuan tidak boleh terbuka dari pencarian bebas.
- `PUB-22`: tidak ada halaman publik yang menampilkan daftar aspirasi.

## 9.4 Area TKT — 8 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| TKT-01 | Pilih Tiket | Nama agenda, jenis tiket, harga, deskripsi, ketersediaan/status | Pilih satu jenis tiket paid dan lanjut daftar | Pembeli publik/login |
| TKT-02 | Form Registrasi | Nama lengkap, NIM, telepon, email, fakultas, program studi, consent | Validasi, review ringkasan, submit | Pembeli publik/login |
| TKT-03 | Pembayaran QRIS | Ringkasan order, nominal snapshot, QRIS demo per agenda, countdown 180 detik, upload proof | Simulasi upload bukti dan submit | Pemilik order |
| TKT-04 | Hasil/Status Registrasi | Temporary Reserved, Expired, Pending Verification, Approved, Rejected | Lihat status, kembali ke agenda, lihat tiket jika sudah issued | Pemilik order |
| TKT-05 | Cek Status Tiket | Form NIM dan instruksi OTP | Minta OTP demo dengan cooldown | Publik |
| TKT-06 | Verifikasi Email/OTP | Input OTP, expiry, resend cooldown, lockout | Verifikasi OTP demo | Pemilik identitas |
| TKT-07 | Hasil Pencarian Tiket | Tiket milik identitas terverifikasi, event, jenis, status | Pilih tiket yang sah | Pemilik identitas |
| TKT-08 | Detail/Unduh Tiket | Identitas tiket, agenda, jenis, status, QR/barcode demo, status check-in, PDF preview | Buka/unduh/print tiket demo | Pemilik tiket |

Aturan TKT:
- Satu order paid untuk satu tiket.
- Satu QRIS per agenda.
- Reservasi dimulai saat klik Bayar Sekarang dan berlangsung 180 detik.
- Jika bukti valid disubmit dalam waktu tersebut, status menjadi Pending Verification.
- Setelah Pending Verification, kuota tetap tertahan sampai organizer memutuskan; tidak ada timeout verifikasi otomatis.
- Rejection melepaskan kuota.
- Tiket gratis langsung diterbitkan setelah registrasi berhasil dan tidak memerlukan QRIS/bukti pembayaran.
- Email gagal tidak membatalkan tiket yang sudah issued.
- Resend email tidak menerbitkan tiket baru.
- OTP tidak ditentukan caller pada sistem produksi; pada demo kode uji hanya tersedia melalui Demo Control Center.
- Tautan tiket demo tetap dibatasi pada pemilik demo session/akun yang sesuai.

## 9.5 Area AUTH — 6 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| AUTH-01 | Login | Email, password, show/hide, opsi preset demo | Login, lupa password, daftar, isi akun demo | Anon |
| AUTH-02 | Registrasi Akun | Nama, NIM, email, telepon, fakultas, prodi, password, konfirmasi | Buat akun, kembali login | Anon |
| AUTH-03 | Verifikasi Email | Status verifikasi, alamat email tersamarkan, petunjuk | Simulasikan verifikasi/kirim ulang | Akun baru |
| AUTH-04 | Lupa Password | Email akun dan petunjuk pemulihan | Kirim permintaan reset demo | Anon |
| AUTH-05 | Reset Password | Password baru dan konfirmasi | Simpan password demo | Pemilik token demo |
| AUTH-06 | Status/Informasi Akun | Status pending verification, inactive, suspended, atau restriction | Periksa status, logout, lanjut tindakan pemulihan | Akun terkait |

## 9.6 Area PER — 12 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| PER-01 | Dashboard Personal | Nama, status akun/kader, tiket aktif, agenda mendatang, aktivitas, Daily Announcement | Buka profil, tiket, agenda, area/workspace yang sah | Pemilik akun |
| PER-02 | Profil Saya | Foto, nama, NIM, email, telepon, fakultas, prodi, status | Edit profil, pengaturan keamanan | Pemilik akun |
| PER-03 | Edit Profil | Foto, nama/kontak yang diizinkan, fakultas/prodi jika boleh diubah | Ganti foto, simpan | Pemilik akun |
| PER-04 | Keamanan Akun | Status verifikasi, ubah password, pengaturan keamanan dasar | Ubah password, logout | Pemilik akun |
| PER-05 | Informasi & Riwayat Kader | Tingkatan kader, status verifikasi, tanggal resmi, histori keanggotaan, statistik kehadiran/Proker | Lihat riwayat | Kader terverifikasi |
| PER-06 | Riwayat Jabatan Organisasi | Kabinet, jabatan, bidang/kompartemen, periode, status assignment | Buka konteks organisasi yang masih aktif | Pemilik riwayat |
| PER-07 | Keikutsertaan Proker | Proker, kompartemen, bidang, jabatan kepanitiaan, status, perkembangan umum | Lihat detail keterlibatan | Pemilik record |
| PER-08 | Registrasi dan Tiket Saya | Registrasi, agenda, jenis tiket, pembayaran, status tiket | Lihat/unduh tiket, cek status | Pemilik akun |
| PER-09 | Riwayat Agenda & Kehadiran | Agenda terdaftar, agenda benar-benar dihadiri, tanggal, status check-in | Filter dan buka detail agenda | Pemilik akun |
| PER-10 | Bisnis Saya | Bisnis milik kader, status draft/review/revision/published | Tambah bisnis, edit pengajuan, detail | Kader pemilik |
| PER-11 | Pengajuan/Edit Bisnis | Nama usaha, deskripsi, kategori, foto, produk/layanan, kontak, media sosial | Simpan draft, submit, revisi | Kader pemilik |
| PER-12 | Notifikasi Saya | Notifikasi akun, kategori, waktu, status baca | Buka detail, tandai dibaca | Pemilik akun |

Aturan PER:
- Mahasiswa biasa tidak melihat menu Keanggotaan.
- Riwayat kader/jabatan tetap ada meskipun kabinet berakhir.
- NIM tidak dapat diedit langsung oleh pengguna; koreksi mengikuti proses Admin setelah pemeriksaan.
- Pendaftaran agenda tidak sama dengan kehadiran.
- Hanya check-in sah yang dihitung sebagai kehadiran.
- Bisnis yang masih direview tidak tampil di direktori publik.
- Aktivitas Proker menampilkan record yang menjadi hak pengguna; tidak membocorkan roster anggota lain.
- Tidak ada menu tugas personal ber-PIC.

## 9.7 Area ADM — 12 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| ADM-01 | Cabinet Center (alias Admin Control Center) | Semua kabinet, identitas, periode, status, jumlah struktur, tombol tambah/buka | Tambah kabinet, pilih kabinet | system_admin; tanpa sidebar |
| ADM-02 | Cabinet Dashboard (alias Cabinet Management) | Overview kabinet terpilih, status, periode, ringkasan struktur, aktivitas konfigurasi | Buka modul kabinet, kembali ke Cabinet Center | system_admin; sidebar aktif |
| ADM-03 | Tambah/Edit Kabinet | Nama, logo, deskripsi, filosofi, visi, misi, tahun mulai/selesai, status | Simpan draft, perbarui | system_admin |
| ADM-04 | Detail & Arsip Kabinet | Detail kabinet, struktur, status, histori, kesiapan arsip | Aktifkan/arsipkan sesuai syarat | system_admin |
| ADM-05 | Organization Structure | Hierarki kabinet → bidang → kompartemen | Tambah bidang, tambah kompartemen, atur struktur | system_admin |
| ADM-06 | Detail/Edit Bidang & Kompartemen | Nama, deskripsi, parent, informasi struktur | Edit, ubah struktur sesuai validasi | system_admin |
| ADM-07 | Position Management | Master jabatan, scope, kapasitas, permission dasar | Tambah/edit jabatan | system_admin |
| ADM-08 | User Management | Nama, NIM, email, status akun, kader, jabatan | Cari, filter, detail | system_admin |
| ADM-09 | Detail & Assignment Pengguna | Profil, status kader, assignment, histori, permission | Tetapkan/cabut jabatan, atur akses, nonaktifkan akun | system_admin |
| ADM-10 | Role & Permission Management | Matriks role × permission × scope | Atur permission, assign/revoke, preview dampak | system_admin |
| ADM-11 | Module Configuration | Daftar modul, pengelola, status konfigurasi, dependensi | Aktif/nonaktif modul dan pengelola sesuai aturan | system_admin |
| ADM-12 | System Audit Log | Pelaku, tindakan, objek, waktu, hasil, perubahan penting | Cari, filter, detail read-only | system_admin |

Aturan ADM:
- Admin login masuk ke ADM-01 Cabinet Center tanpa sidebar.
- Setelah memilih kabinet, baru masuk ke ADM-02 Cabinet Dashboard.
- Permission diatur per kabinet; perubahan kabinet A tidak otomatis mengubah kabinet B.
- Admin mengelola template/permission sistem, bukan menunjuk seluruh Manager Proker.
- Kakom tetap menjadi pihak yang menunjuk Pengelola Proker.
- Admin tidak otomatis mendapat hak approval surat/dana/tiket.
- Audit Log administratif hanya dapat dilihat Admin Sistem dan tidak dapat diedit/dihapus.

## 9.8 Area ORG — 6 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| ORG-01 | Dashboard Organisasi | Kabinet aktif, statistik sesuai role, Daily Announcement, aktivitas, agenda, tindak lanjut | Buka modul/aksi yang relevan | Pengurus sesuai scope |
| ORG-02 | Organization Overview & Structure | Struktur kabinet, bidang, kompartemen, pengurus, ringkasan | Pilih unit, lihat informasi struktur | Pengurus sesuai scope |
| ORG-03 | Monitoring Bidang | Ringkasan bidang, unit bawahan, Proker, agenda, surat, keuangan sesuai permission | Filter dan drill-down | Top Management/Kabid sesuai scope |
| ORG-04 | Monitoring Kompartemen | Ringkasan kompartemen, Proker, agenda, administrasi, keuangan sesuai permission | Buka workspace/detail Proker | Top Management/Kabid/Kakom sesuai scope |
| ORG-05 | Activity & Action Center | Pengajuan/aktivitas yang benar-benar menunggu tindakan pengguna | Buka proses, filter status | Pengguna yang dapat bertindak |
| ORG-06 | Statistics & Organization Reports | Statistik/laporan organisasi sesuai lingkup | Filter periode/kabinet/unit, buka detail | Role monitoring sesuai permission |

Aturan ORG:
- Dashboard bukan halaman mutasi universal.
- Monitoring tidak otomatis memberi hak edit/approve.
- Action Center hanya menampilkan tugas yang benar-benar dapat ditindaklanjuti pengguna.
- Widget yang gagal tidak boleh menghilangkan widget lain yang berhasil dimuat.
- Data keuangan hanya muncul pada role/scope yang berwenang.



## 9.9 Area WRK — 10 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| WRK-01 | Workspace Overview | Identitas workspace, kabinet/unit, agenda, surat, keuangan sesuai izin, aktivitas terbaru | Buka modul, ganti workspace | Pengguna dengan assignment |
| WRK-02 | Workspace Information | Profil unit/Proker, deskripsi, struktur, identitas pengelola | Edit informasi sesuai hak | Owner/role berizin |
| WRK-03 | Daftar Proker Internal | Nama Proker, kompartemen, Manager, status, main event | Tambah Proker khusus Kakom, detail, filter | Kakom/Kabid/Manager sesuai scope |
| WRK-04 | Buat/Edit Proker | Nama, tujuan, deskripsi, tanggal mulai, tanggal main event, tanggal target, lokasi, informasi publikasi, logo; Kompartemen terisi otomatis | Kakom membuat Draft; Manager melengkapi detail/logo; logo wajib sebelum status Ongoing atau Published | Kakom membuat; Manager melengkapi sesuai assignment |
| WRK-05 | Project 360 / Detail Proker | Tab Overview, Informasi, Roster, Agenda, Persuratan, Keuangan, Dokumen & LPJ, Riwayat; seluruhnya memakai satu `project_id` | Pindah tab, buka record modul sumber, kembali ke Proker | Kakom/Manager/role monitoring sesuai scope |
| WRK-06 | Roster & Team Management | Dua tab: Anggota Tim dan Pengelola Workspace; nama, NIM, jabatan kepanitiaan, level Manager/Member, status, periode aktif | Tambah/ubah/akhiri/rejoin sesuai hak; assignment Manager hanya oleh Kakom | Roster penuh hanya Kakom/Manager berizin; anggota hanya record sendiri |
| WRK-07 | Assignment Pengelola Proker | Akun kandidat, NIM, status kader terverifikasi, daftar Manager | Tambah/cabut Manager | Hanya Kakom |
| WRK-08 | Informasi & Status Perkembangan Proker | Tahap, narasi capaian, kendala, rencana, tanggal, histori, lampiran | Tambah catatan/perbarui status, Task Board bersama | Pengelola Proker; monitoring sesuai scope |
| WRK-09 | Pleno & Aktivitas Unit | Jadwal pleno, notulensi, keputusan, tindak lanjut, histori | Buat jadwal, tambah notulensi, detail | Pengelola unit sesuai scope |
| WRK-10 | Penutupan & Arsip Proker | Status LPJ, surat, disbursement, histori, checklist penutupan | Tutup Proker, buka arsip | Hanya Kakom yang berwenang menutup |

Task Board pada WRK-08:
- Kolom: `To Do`, `In Progress`, `Blocked`, `Done`.
- Beberapa Pengelola Proker mengelola board bersama.
- Tidak ada PIC/assignee individual.
- Drag-and-drop mengubah status task.
- Setiap task memiliki judul, deskripsi, status, tanggal, riwayat perubahan, dan lampiran opsional.
- Jangan membuat `My Tasks` sebagai penugasan personal.
- Jika anggota biasa membuka area Proker, tampilkan hanya informasi dan record yang memang menjadi haknya.

Penutupan Proker:
- LPJ harus Approved.
- Surat yang menjadi kewajiban harus selesai.
- Seluruh disbursement harus settled sesuai aturan.
- Checklist pre-close harus menampilkan alasan blocker.
- Dialog konfirmasi wajib.
- Hanya Kakom.
- Setelah ditutup, akses operasional aktif berakhir; roster, progres, dokumen, dan histori tetap tersimpan.

## 9.10 Area CAL — 4 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| CAL-01 | Kalender Organisasi | Agenda, rapat, pleno, kategori, visibilitas, kabinet | Month/Week/List, filter, detail | Top/Sekum/Bendum full read sesuai hak; Kabid/Kakom prioritas scope; Manager scoped |
| CAL-02 | Kalender Workspace | Kalender bidang/kompartemen/Proker aktif | Tambah jadwal, filter, detail | Workspace assignment |
| CAL-03 | Detail Kegiatan | Judul, kategori, tanggal, jam, lokasi, owner, deskripsi, status | Edit/batal jika berizin, buka agenda/Proker terkait | Sesuai scope |
| CAL-04 | Buat/Edit Jadwal/Agenda | Judul, kategori, tanggal mulai/selesai, jam mulai/selesai, lokasi, owner otomatis dari konteks, deskripsi, visibilitas | Satu pintu pembuatan; shortcut dari Workspace mengisi konteks; warning benturan tidak memblokir penyimpanan | Pengelola sesuai permission |

Aturan CAL:
- Satu kejadian tidak boleh dibuat dua kali hanya karena berasal dari agenda dan kalender.
- Agenda formal ditautkan ke event object yang sama.
- Kalender internal tidak otomatis menjadi publik.
- Main-event date yang disembunyikan tidak boleh bocor melalui mock/public data.
- Render waktu mengikuti WIB untuk tampilan demo.

## 9.11 Area COR — 7 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| COR-01 | Central Correspondence Dashboard | Statistik surat masuk, revisi, selesai, Ditmawa | Buka inbox, filter status | Sekum dan pengaju sesuai scope |
| COR-02 | Daftar Pengajuan Surat | Judul, jenis/routing, pengaju, unit, tanggal, status, proses | Ajukan surat, detail, filter | Pengaju scope sendiri; Sekum sesuai kewenangan |
| COR-03 | Form Pengajuan Surat | Judul bebas, tujuan, jenis, deskripsi, URL dokumen, keterangan, kebutuhan administrasi | Simpan draft, submit | Pengaju yang sah |
| COR-04 | Detail & Review Surat | Detail, URL dokumen, checklist, catatan Sekum, histori | Review, minta revisi, selesaikan, reopen sesuai hak | Sekum reviewer; pemohon melihat surat miliknya |
| COR-05 | Administrasi Surat & Penomoran | Nomor surat otomatis dan unik, tanggal surat, informasi administrasi, histori penerbitan | Generate nomor; pengguna tidak mengisi nomor resmi manual | Sekum |
| COR-06 | Monitoring Ditmawa | Judul, tanggal pengiriman, referensi pengiriman, status Ditmawa, catatan tindak lanjut, URL dokumen, histori | Catat dispatch dan tindak lanjut; status Ditmawa dipisah dari status penyelesaian internal Sekum | Sekum |
| COR-07 | Arsip Persuratan | Surat selesai/arsip, kabinet, periode, unit, histori | Cari, filter, detail read-only | Sesuai permission |

Aturan COR:
- Judul surat bebas.
- Routing: `Surat Umum` atau `Untuk Ditmawa`.
- Dokumentasi menggunakan URL dokumen; tidak mewajibkan unggah Word.
- Checklist wajib harus lengkap sebelum approval.
- Nomor surat unik dan tidak boleh dibuat ganda.
- Reopen oleh Sekum harus menyertakan alasan.
- Riwayat pengajuan, revisi, nomor, dan pengiriman tetap tersimpan.

## 9.12 Area FIN — 10 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| FIN-01 | Financial Overview | Kas pusat, saldo, pemasukan, pengeluaran, dana tertunda, statistik | Buka transaksi, pengajuan, laporan | Bendum dan pembaca agregat berizin |
| FIN-02 | Kas & Daftar Transaksi | Tanggal, jenis, sumber/tujuan, nominal, status, referensi | Tambah transaksi, detail, filter | Bendum/owner unit sesuai scope |
| FIN-03 | Detail/Input Transaksi | Tanggal, jenis, nominal, keterangan, bukti/referensi, akun kas | Simpan, koreksi sesuai izin | Bendum/owner unit sesuai scope |
| FIN-04 | Daftar Pengajuan Dana | Pengaju, unit, tujuan, nominal, tanggal, status | Ajukan, detail, filter | Pengaju scope sendiri; Bendum |
| FIN-05 | Form Pengajuan Dana | Judul, unit pengaju otomatis, Proker terkait jika ada, tujuan, rincian kebutuhan/item biaya, nominal, dokumen pendukung/URL, tanggal, catatan | Simpan draft, submit langsung ke Bendum; Staff berizin tidak memerlukan approval tambahan Kakom | Pengaju berizin |
| FIN-06 | Detail & Persetujuan Dana | Nominal diminta/disetujui, catatan, histori pemeriksaan, dokumen | Setujui/tolak dengan konfirmasi | Bendum |
| FIN-07 | Pencairan & Penerimaan Dana | Termin, nominal, sumber/tujuan, bukti transfer, konfirmasi | Catat pencairan, konfirmasi penerimaan per termin | Bendum dan unit penerima |
| FIN-08 | Keuangan Unit/Proker | Kas unit, pemasukan, pengeluaran, transfer, histori | Catat transaksi berizin, detail | Owner unit/Bendum sesuai scope |
| FIN-09 | Monitoring Pendapatan Tiket & Medpart | Agregat nominal/volume per kabinet, unit, Proker/event, jenis tiket | Filter, detail rekap | Bendum/monitoring berizin; tanpa PII bukti |
| FIN-10 | Laporan Keuangan | Kas, pemasukan, pengeluaran, saldo, perbandingan periode | Filter, rincian, export sesuai izin | Bendum dan pembaca yang diizinkan |

Aturan FIN:
- Saldo pusat, saldo unit, dana transit, dan pendapatan organisasi dibedakan.
- Transfer internal bukan pendapatan baru.
- Jurnal posted seimbang dan immutable.
- Pencairan tidak melebihi approved amount.
- Multiple tranche tidak dianggap settled sebelum seluruh kewajiban selesai.
- Satu konfirmasi penerimaan hanya mengubah termin terkait.
- Bendum boleh melihat agregat pendapatan tiket/Medpart, bukan bukti pembayaran atau PII peserta.
- Approval dana hanya Bendum; Top Management monitoring saja.
- Tidak boleh ada tombol verifikasi bukti tiket pada dashboard Bendum.

## 9.13 Area EVT — 9 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| EVT-01 | Agenda Management Dashboard | Total agenda, pendaftar, tiket, pembayaran pending, pendapatan | Buka agenda, verifikasi, laporan | Organizer berizin |
| EVT-02 | Daftar Agenda Internal | Nama, owner, kategori, tanggal, status, publikasi | Tambah, detail, filter | Organizer sesuai assignment |
| EVT-03 | Entry Buat/Edit Agenda | Entry point ke form CAL-04 yang sama; identitas, deskripsi, jadwal, lokasi, kategori, poster, visibilitas | Buka AgendaForm bersama dengan konteks `source=events`; harga/kuota/masa jual di EVT-05; QRIS satu per agenda di pengaturan pembayaran EVT-04 | Organizer pemilik |
| EVT-04 | Detail & Pengaturan Agenda | Tab Informasi, Tiket, Peserta, Pembayaran, Presensi, Laporan | Kelola dan publish sesuai izin | Organizer event |
| EVT-05 | Ticket Type Management | Nama jenis tiket, deskripsi, harga, kuota, awal/akhir penjualan, status, sold/reserved | Tambah/edit/aktifkan jenis tiket; snapshot nominal pada order yang sudah dibuat tidak berubah | Organizer event |
| EVT-06 | Participant Database | Enam field identitas peserta, tiket, pembayaran, kehadiran | Detail, edit/batalkan/resend sesuai izin | Organizer event |
| EVT-07 | Payment Verification | Pembayaran pending, nominal, waktu, bukti, status | Setujui/tolak dengan alasan | Verifikator agenda yang ditunjuk |
| EVT-08 | Ticket Delivery & Email History | Tiket issued, peserta, email queued/sent/failed, waktu, attempts | Kirim ulang tiket yang sama | Organizer berizin |
| EVT-09 | Ticket Sales Report | Penjualan per jenis, pendapatan, pendaftaran, kehadiran | Filter, detail, export sesuai izin | Organizer event |

Aturan EVT:
- Organizer yang ditunjuk adalah verifikator pembayaran; bukan Bendum.
- Satu agenda dapat memiliki beberapa jenis tiket.
- Satu agenda menggunakan satu QRIS.
- Perubahan jenis tiket setelah ada pembeli harus mempertahankan snapshot nominal/nama jenis tiket pada transaksi yang sudah ada.
- Email resend tidak mengeluarkan tiket baru.
- Bukti pembayaran dilihat melalui akses simulasi privat.
- Rejection melepaskan kuota.
- Agenda yang dibatalkan/ditutup menampilkan status yang jelas.

## 9.14 Area ATT — 4 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| ATT-01 | Check-in Dashboard | Total peserta valid, hadir, belum hadir, hasil check-in | Buka scanner, daftar kehadiran | Event lead/check-in staff |
| ATT-02 | Barcode/QR Scanner | Kamera scanner, petunjuk, hasil validasi, identitas secukupnya, jenis tiket, tombol Scan Berikutnya | Scan QR/barcode atau input kode demo manual; tidak menjanjikan offline sync otomatis | Check-in staff |
| ATT-03 | Daftar Kehadiran | Peserta, status hadir, waktu, metode check-in | Filter, detail, export sesuai izin | Check-in staff/organizer |
| ATT-04 | Detail/Manual Check-in | Detail registrasi/tiket, status, catatan, histori | Check-in manual sesuai izin | Check-in staff |

Aturan ATT:
- Scan QR adalah metode utama.
- Pencarian nama/NIM adalah alternatif.
- Satu tiket hanya boleh check-in satu kali.
- Tiket dari event lain, token palsu, revoked, atau expired ditolak.
- Kehadiran hanya dihitung setelah check-in berhasil.
- Jika kamera tidak tersedia/izin ditolak, sediakan input kode demo manual.
- Offline atau kegagalan scan tidak boleh membuat check-in palsu.

## 9.15 Area DOC — 6 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| DOC-01 | Document Center | Judul, kategori, pemilik, sumber, versi, tanggal, status | Tambah, cari, filter, detail | Owner/uploader/reviewer sesuai scope |
| DOC-02 | Tambah/Edit Dokumen | Judul, kategori, keterangan, URL/file metadata, relasi modul | Simpan/perbarui | Uploader berizin |
| DOC-03 | Detail & Riwayat Dokumen | Metadata, dokumen, versi, relasi surat/Proker/agenda | Buka dokumen, lihat versi | Sesuai scope |
| DOC-04 | LPJ Management | Daftar LPJ, Proker, status, owner, tanggal, kelengkapan | Buat/buka LPJ | Pemilik/reviewer sesuai permission |
| DOC-05 | Detail/Edit LPJ | Tujuh bagian: Identitas Proker, Ringkasan Kegiatan, Pelaksanaan, Peserta/Kehadiran, Ringkasan Keuangan, Dokumentasi, Evaluasi & Kesimpulan; data tersedia ditarik dari sumber modul | Simpan draft, submit, review, minta revisi, approve sesuai reviewer | Pemilik dan reviewer yang ditunjuk |
| DOC-06 | Document Archives | Arsip kabinet, unit, Proker, periode | Cari, filter, buka read-only | Sesuai permission |

Aturan DOC:
- LPJ terhubung dengan data kegiatan dan keuangan, bukan salinan angka baru.
- Bendum tidak otomatis menjadi approver LPJ.
- Reviewer LPJ mengikuti role/assignment eksplisit.
- Histori versi dokumen tetap terlihat.
- Arsip read-only tidak menampilkan aksi edit.

## 9.16 Area DIR — 8 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| DIR-01 | Database Kader | Nama, NIM, tingkatan, status, akun terhubung, kabinet/jabatan | Tambah, cari, filter, detail | Admin/PSDM sesuai permission |
| DIR-02 | Detail/Edit Kader | Identitas, keanggotaan, riwayat jabatan, Proker, agenda, bisnis | Edit sesuai izin, lihat riwayat | Admin/PSDM sesuai scope |
| DIR-03 | Verifikasi & Penautan Kader | Kandidat NIM, akun, bukti identitas, status tautan | Verifikasi, tautkan akun, tolak | Admin/verifikator |
| DIR-04 | Database Bisnis Kader | Nama usaha, pemilik, kategori, status verifikasi/publikasi | Cari, filter, detail | Reviewer bisnis sesuai permission |
| DIR-05 | Detail & Verifikasi Bisnis | Informasi usaha, foto, kontak publik yang disetujui, perubahan, catatan internal reviewer, status persetujuan, status publikasi | Setujui, minta revisi, tolak, lalu publish sebagai tindakan terpisah | Reviewer bisnis |
| DIR-06 | Database Perusahaan/Sponsor/Mitra | Nama, kategori, kontak resmi, status | Tambah, cari, filter, detail | Semua pengurus read sesuai izin; edit oleh Partnership |
| DIR-07 | Detail/Edit Perusahaan | Profil perusahaan, PIC, kontak, kategori, keterangan, histori | Edit sesuai permission | Partnership untuk edit; pembaca lain read-only |
| DIR-08 | Database Riwayat Kerja Sama | Perusahaan, unit/Proker, periode, catatan kerja sama | Lihat riwayat, tambah catatan berizin | Partnership dan pembaca berizin |

Aturan DIR:
- NIM cocok bukan bukti identitas kader terverifikasi.
- Satu bisnis dapat memiliki status draft/review/revision/published.
- Public hanya melihat snapshot bisnis yang approved/published.
- Kontak PIC perusahaan bersifat privat sesuai permission.
- Seluruh pengurus dapat membaca direktori perusahaan sesuai hak baca; edit oleh Partnership.

## 9.17 Area CMS — 13 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| CMS-01 | CMS Dashboard | Ringkasan berita, prestasi, Medpart, Published/Draft | Buka modul sesuai permission | CMS role |
| CMS-02 | Homepage & Public Content Editor | Section beranda, banner, konten editorial, preview | Edit section, preview, publish | CMS Editor/Publisher sesuai permission |
| CMS-03 | Media Library | Galeri gambar/media dan metadata | Tambah, pilih, arsip sesuai izin | CMS role |
| CMS-04 | Berita/Artikel Management | Judul, kategori, penulis, tanggal, status | Tambah, detail, filter | CMS Editor |
| CMS-05 | Article Editor | Slug, judul, isi, cover, kategori, sumber, status publikasi | Simpan draft, preview, publish sesuai permission | Editor; publish oleh Publisher |
| CMS-06 | Prestasi Kader Management | Kader, judul prestasi, kategori, waktu, status verifikasi/publikasi | Tambah/periksa prestasi | Reviewer/Editor sesuai permission |
| CMS-07 | Form & Verifikasi Prestasi | Kader tunggal/multi-kader, judul, kategori, tingkat, tanggal, deskripsi, dokumentasi | Review, minta revisi, setujui, publish | Reviewer berizin |
| CMS-08 | Medpart Management | Statistik Medpart Gratis/Berbayar, pengajuan, status proses | Buka pengajuan, filter | Medkom |
| CMS-09 | Detail/Verifikasi Medpart | Pengaju, kegiatan, paket, bukti pembayaran, dokumentasi, histori | Periksa bukti, revisi, setujui/tolak | Medkom |
| CMS-10 | Medpart Package & QRIS Configuration | Paket, syarat, harga, QRIS demo, periode, histori revisi | Tambah/edit paket dan ketentuan | Permission Medpart |
| CMS-11 | Medpart Publication | Materi siap tayang, poster, status, histori publikasi | Publish manual, unpublish sesuai izin | Medkom/Publisher berizin |
| CMS-12 | Kotak Suara Management | Daftar masukan privat, kategori, status, tanggal, ringkasan | Cari, filter, detail | Feedback operator |
| CMS-13 | Detail & Tindak Lanjut Kotak Suara | Isi masukan, catatan tindak lanjut, status, histori | Triage, routing, update, close sesuai scope | Operator yang ditugaskan |

Aturan CMS:
- Konten publik hanya jika statusnya sesuai (approved/published).
- Draft dan preview tidak tampil di halaman publik.
- Satu prestasi dapat melibatkan beberapa kader.
- Beranda mengambil empat prestasi Published terbaru.
- Medpart payment approval, submission approval, dan publication adalah status berbeda.
- Publikasi Medpart dilakukan manual oleh Medkom.
- `requested_publish_date` hanya informasi permintaan.
- Bendum hanya melihat agregat keuangan Medpart, bukan bukti/PII.
- Kotak Suara privat; pimpinan dapat monitoring read-only sesuai scope, tetapi monitoring bukan triage.

## 9.18 Area SYS — 9 Screen

| ID | Halaman | Data utama yang ditampilkan | Aksi/interaksi | Akses |
|---|---|---|---|---|
| SYS-01 | Statistics Dashboard | Statistik organisasi, kabinet, bidang, kompartemen, Proker | Filter dan drill-down | Role monitoring |
| SYS-02 | Detailed Report Viewer | Detail laporan dan data sumber yang diizinkan | Filter, export | Role sesuai permission |
| SYS-03 | Notification Center | Notifikasi berdasarkan aktivitas dan permission | Tandai dibaca, buka sumber | Pengguna sesuai hak |
| SYS-04 | Approval Center | Queue tindakan yang menunggu pemeriksaan/persetujuan | Buka pengajuan, filter | Hanya reviewer yang berhak |
| SYS-05 | Activity/Audit History | Riwayat aktivitas yang relevan bagi user/unit | Cari, filter, detail | User/unit sesuai scope; audit administratif terpisah |
| SYS-06 | Global Search Results | Hasil pencarian lintas modul yang boleh diakses | Cari, filter, buka hasil | Sesuai permission |
| SYS-07 | Unauthorized / 403 | Informasi akses tidak diizinkan tanpa membocorkan data | Kembali ke dashboard/area yang sah | Semua |
| SYS-08 | Not Found / 404 | Informasi halaman/data tidak ditemukan | Kembali, ke Beranda | Semua |
| SYS-09 | System Error / Unavailable | Pesan gangguan, kode referensi demo, status retry | Coba lagi, kembali | Semua |

Aturan SYS:
- Notification Center tidak memberikan permission baru.
- Approval Center hanya mengagregasi deep link ke workflow asli; tidak membuat workflow approval baru.
- Activity History berbeda dari Admin Audit Log.
- Audit Log administratif hanya Admin Sistem.
- Global Search tidak menampilkan data di luar permission.
- 403 dan 404 harus dibedakan sesuai aturan privasi.
- Error satu widget tidak boleh mematikan seluruh dashboard.



---

# 9.19 Screen-by-Screen Implementation Contract — 146 Screen

Bagian ini adalah kontrak implementasi per layar. Tabel Bagian 9.3–9.18 tetap menjadi inventaris ringkas; tabel berikut memperjelas layout, data/field, aksi, akses, dan sumber dummy. Jika ada perbedaan, gunakan rincian 9.19 bersama keputusan v1.1.

**Aturan untuk semua 146 screen:**
- Setiap screen wajib memiliki Page Title, breadcrumb bila berada di area internal, konten utama, aksi yang diizinkan, dan state loading/empty/error/unauthorized yang sesuai.
- List page wajib mempunyai data dummy terisi, empty state, search/filter yang relevan, sorting bila kolom dapat diurutkan, pagination atau progressive list untuk data panjang, dan detail link.
- Form page wajib mempunyai label field, helper text bila perlu, validasi inline, pesan error, disabled/loading state saat submit, konfirmasi berhasil, serta perlindungan double submit.
- Detail page wajib menampilkan identitas record, status, metadata tanggal, pemilik/unit jika boleh dilihat, relasi, histori, dan aksi yang sah.
- Status badge harus selalu disertai teks, bukan warna saja. Aksi berisiko memakai dialog konfirmasi.
- Semua route dan screen harus dapat dibuka dari navigasi atau deep link yang terdaftar. Tab/modal/drawer tidak menambah Screen ID.
- Fixture yang disebut pada kolom terakhir berasal dari shared mock repository Bagian 11.7; jangan membuat array data terpisah di komponen.

### 9.19.1 PUB — 22 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| PUB-01 | Hero; Ketua Umum/Wakil; benefit; profil; kabinet aktif; struktur; Bidang/Kompartemen; Proker; 4 prestasi terbaru; bisnis; agenda mendatang; berita terbaru; footer. | Identitas kabinet aktif, pimpinan, 4 achievement Published terbaru, bisnis Published, agenda Published, artikel Published. | CTA menuju Tentang Kami/Organisasi/Aktivitas/Karya Kader; carousel pause/swipe; klik kartu menuju detail; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-02 | Profil dan sejarah HIPMI PT Universitas Telkom; identitas; visi-misi; tujuan; nilai; manfaat organisasi. | Konten profil, sejarah, visi, misi, nilai, manfaat; semua berupa konten publik. | Navigasi section dan tautan ke Organisasi; publik; tidak perlu tab. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-03 | Daftar kabinet aktif dan arsip; kartu kabinet; logo; periode; status. | Cabinet ID, nama, logo, periode mulai/selesai, status active/archived. | Search/filter periode/status; klik kartu menuju PUB-04; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-04 | Detail kabinet; filosofi/logo; visi-misi; periode; struktur pengurus; mind map interaktif. | Cabinet detail, Ketum/Waketum/Sekjen/Sekum/Bendum/Kabid/Kakom, relasi Bidang-Kompartemen. | Expand/collapse node; klik node tampil ringkasan lalu buka halaman detail unit; mobile accordion; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-05 | Kartu daftar Bidang; pimpinan; ringkasan fungsi; Kompartemen turunan. | Field ID, nama, Kepala Bidang, deskripsi, daftar Compartment ID. | Klik kartu menuju PUB-06; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-06 | Profil Bidang; pimpinan; tugas; Kompartemen; Proker dan agenda publik terkait. | Field detail, Kabid, unit turunan, Proker Published, agenda Published. | Klik Kompartemen/Proker/agenda menuju detail; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-07 | Daftar Kompartemen; tab Semua dan Bidang 1–4; kartu unit. | Compartment ID, nama, Bidang induk, Kakom, ringkasan. | Tab/filter/search; klik menuju PUB-08; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-08 | Detail Kompartemen; profil; Kakom; Bidang induk; tugas; Proker dan agenda publik. | Compartment detail, parent field, Kakom, Proker Published, agenda Published. | Klik Bidang/Proker/agenda; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-09 | Daftar Proker Published; filter kabinet, Bidang, Kompartemen; kartu Proker. | Project ID, nama, logo, tujuan ringkas, unit, status publikasi, tanggal publik jika diizinkan. | Search/filter; buka PUB-10; tanggal internal yang disembunyikan tidak boleh dikirim ke publik; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-10 | Detail Proker; logo; nama; tujuan; deskripsi; unit; status; dokumentasi; agenda Published. | Project detail, parent compartment/field, public description, allowed dates, published events. | Buka agenda/dokumentasi; tanggal tersembunyi tampil Coming Soon; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-11 | Daftar Agenda; poster; nama; jadwal publik; lokasi; kategori; gratis/berbayar; status pendaftaran. | Event Published, public schedule, venue, ticket category, registration status. | Search/filter; buka PUB-12; CTA Cek Status Tiket menuju TKT-05; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-12 | Detail Agenda; penyelenggara; jadwal; lokasi; ketentuan; jenis tiket; kuota yang boleh ditampilkan. | Event detail, organizer display, ticket types, public rules, ticket availability. | Pilih tiket menuju TKT-01; daftar gratis menuju TKT-02; tidak menampilkan data internal; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-13 | Daftar berita/artikel; cover; kategori; ringkasan; penulis; tanggal terbit. | Article Published, title, slug, category, cover, excerpt, author, published_at. | Search/filter kategori; buka PUB-14; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-14 | Detail artikel; judul; cover; isi; kategori; penulis; tanggal; sumber. | Article body, SEO/public metadata, source URL. | Baca artikel, buka sumber eksternal jika ada, kembali; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-15 | Informasi Media Partner; layanan; paket gratis/berbayar; harga; syarat; materi; CTA. | Medpart packages active, requirements, pricing, QRIS info demo bila berbayar. | Ajukan menuju PUB-16; cek status menuju PUB-17; publik tanpa login. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-16 | Wizard pengajuan; identitas pengaju/organisasi; kontak; kegiatan; paket; tanggal publikasi diminta; poster/dokumen; pembayaran hanya jika paid. | Applicant name, organization, contact email/phone, event name/description, package ID, requested_publish_date, poster metadata, consent. | Validasi; submit; buat tracking code unik; tampilkan dan izinkan salin/simpan kode; jika paid lanjut instruksi QRIS demo; tanpa login. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-17 | Form cek status dengan kode tracking; hasil status aman; tahapan; tanggal; catatan revisi yang boleh dibuka. | Tracking code, submission status, safe status message, next action; tidak memuat PII lengkap. | Input kode dan cek; invalid code menampilkan pesan netral; detail hanya untuk pemilik kode; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-18 | Direktori bisnis kader; kartu bisnis; nama; kategori; ringkasan; pemilik bila disetujui. | Business Published snapshot, owner display name, category, image, summary. | Search/filter; buka PUB-19; hanya bisnis Published. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-19 | Detail bisnis; profil usaha; galeri; produk/layanan; kontak publik yang disetujui. | Business public snapshot, products/services, approved contact/social links. | Buka kanal kontak publik; tidak menampilkan reviewer note/private contact; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-20 | Daftar prestasi; foto kader; judul; kategori; tingkat; tahun/tanggal. | Achievement Published, linked cadre profiles, category, level, year. | Filter kategori/tahun; buka PUB-21; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-21 | Detail prestasi; satu atau beberapa kader; pencapaian; deskripsi; bukti publik. | Achievement detail, linked cadre IDs, description, public evidence. | Buka dokumentasi/tautan yang disetujui; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |
| PUB-22 | Form aspirasi/kritik/saran; kategori; judul; pesan; identitas opsional; persetujuan privasi. | Feedback category, title, message, optional name/contact, consent, receipt ID. | Validasi dan kirim; tampilkan receipt; tidak ada daftar aspirasi publik; publik. | public projection fixtures (cabinet, fields, compartments, published projects, published events, articles, businesses, achievements) |

### 9.19.2 TKT — 8 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| TKT-01 | Ringkasan agenda; jenis tiket; harga; deskripsi; ketersediaan/status; satu order untuk satu tiket. | Event ID, ticket type ID, price snapshot, quota available/reserved/sold, sales status. | Pilih satu jenis tiket; lanjut TKT-02; hanya ticket type yang open/available. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-02 | Form peserta enam field dan ringkasan tiket. | Nama lengkap, NIM, nomor telepon, email, fakultas, program studi; event/ticket type snapshot. | Validasi required/format; submit; paid menuju TKT-03, free menuju TKT-04 setelah tiket issued; peserta publik/login. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-03 | Instruksi QRIS demo; nominal snapshot; countdown reservasi 180 detik; upload bukti; status reservasi. | Reservation ID, event QRIS demo, amount, expires_at, proof metadata, payment status. | Klik Bayar Sekarang membuat reservasi; submit bukti sebelum expiry; tidak ada transaksi uang; pending verification tidak auto-expire. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-04 | Hasil registrasi; status reservation/payment/registration/ticket; instruksi langkah berikutnya. | Registration ID, reservation status, payment status, ticket status, timestamps. | Refresh status; kembali ke agenda; jika issued buka TKT-08; jika expired/rejected tampilkan alasan aman. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-05 | Form pencarian tiket dengan NIM saja; instruksi OTP. | NIM; hasil respons netral; challenge state. | Minta OTP demo; jangan membocorkan apakah tiket/NIM terdaftar sebelum verifikasi; menuju TKT-06. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-06 | Form OTP; masa berlaku; cooldown resend; jumlah percobaan. | OTP demo 246810 melalui Demo Control Center, expires_at, resend_at, attempt count, lockout. | Verifikasi, resend setelah cooldown, tampilkan invalid/expired/locked; sukses menuju TKT-07. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-07 | Daftar tiket milik identitas yang sudah diverifikasi; event; jenis; status. | Verified identity, ticket IDs owned by identity, event, ticket type, status. | Pilih tiket sah menuju TKT-08; tidak menampilkan tiket orang lain. | event, ticket type, registration, reservation, payment proof, ticket fixtures |
| TKT-08 | Detail tiket; peserta; agenda; jenis; nomor; QR/barcode demo; status; status check-in; email. | Ticket ID/token, participant snapshot, event snapshot, type, issued_at, email status, checkin state. | Print/download demo PDF jika tersedia atau print view; QR/barcode token demo; resend melalui EVT-08 tidak membuat tiket baru. | event, ticket type, registration, reservation, payment proof, ticket fixtures |

### 9.19.3 AUTH — 6 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| AUTH-01 | Login; email; password; show/hide; preset akun demo; link daftar/lupa password. | Email, password preset, account status, demo account selector. | Login; status pending/inactive/suspended menuju AUTH-06; mahasiswa/kader menuju PER-01; admin menuju ADM-01; route `/masuk`. | demo account, verification, password reset, account status fixtures |
| AUTH-02 | Registrasi; nama; NIM; email; telepon; fakultas; program studi; password; konfirmasi; consent. | Full name, unique NIM, unique email, phone, faculty_id, study_program_id, password, confirmation. | Dependent dropdown prodi; validasi duplikasi/format; buat akun Mahasiswa Biasa; tidak ada pilihan role/kader/jabatan; route `/daftar`. | demo account, verification, password reset, account status fixtures |
| AUTH-03 | Informasi verifikasi email; alamat tersamarkan; status; instruksi kode demo. | Email masked, verification state, demo code 246810, resend state. | Simulasikan verifikasi/kirim ulang; sukses mengaktifkan akun dan menuju PER-01; route `/verifikasi-email`. | demo account, verification, password reset, account status fixtures |
| AUTH-04 | Form lupa password; email; konfirmasi instruksi pemulihan. | Email akun; request status; pesan netral. | Submit permintaan reset demo; jangan mengungkap apakah email terdaftar; route `/lupa-password`. | demo account, verification, password reset, account status fixtures |
| AUTH-05 | Form password baru dan konfirmasi; status token demo. | Reset token demo, new password, confirmation. | Validasi password/konfirmasi; simpan password demo; kembali ke `/masuk`; route `/reset-password`. | demo account, verification, password reset, account status fixtures |
| AUTH-06 | Status akun pending verification, inactive, suspended, locked/restricted; petunjuk tindakan. | Account status, reason safe, next step, support info placeholder. | Kirim ulang verifikasi atau logout; tidak boleh membuka area internal; route `/status-akun`. | demo account, verification, password reset, account status fixtures |

### 9.19.4 PER — 12 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| PER-01 | Dashboard personal satu template; sapaan; profil; tiket aktif; agenda; aktivitas; pengumuman; area/workspace sah. | Profile, account status, cadre status, upcoming events, ticket cards, activity feed, announcements. | Klik kartu ke PER-02/PER-08/PER-09/area switcher; konten menyesuaikan mahasiswa/kader/assignment. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-02 | Profil Saya; informasi pribadi; tab Informasi Pribadi, Keanggotaan, Riwayat Organisasi, Keamanan sebagai tautan ke screen terkait. | Name, NIM read-only, email, phone, faculty, study program, photo, account status. | Edit menuju PER-03; keamanan menuju PER-04; riwayat menuju PER-05/PER-06; pemilik akun. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-03 | Form edit profil; foto; nama/kontak yang diizinkan; fakultas/prodi jika aturan membolehkan. | Photo metadata, name, phone, email and editable fields; NIM locked. | Preview foto; validasi; simpan; update PER-01/PER-02; NIM hanya koreksi Admin. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-04 | Keamanan akun; status verifikasi; ubah password; sesi demo. | Verification status, current/new password fields, session status. | Ubah password, logout; tidak ada integrasi security provider. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-05 | Informasi kader; tingkat; status verifikasi; tanggal resmi; statistik keterlibatan. | Cadre status/level, verification date, attendance count, project participation count. | Lihat riwayat; khusus kader terverifikasi; sumber data roster/check-in. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-06 | Riwayat jabatan; kabinet; jabatan; Bidang/Kompartemen; periode; status assignment. | Historical assignments, position, unit, cabinet, start/end date. | Buka konteks organisasi aktif bila masih sah; histori tidak dihapus saat kabinet berakhir. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-07 | Keikutsertaan Proker; nama; unit; jabatan kepanitiaan; status; jadwal yang diizinkan. | Project membership record milik pengguna, role Member/Manager, period, allowed public progress. | Buka detail Proker sesuai akses; member hanya record sendiri; tanpa kelola roster/tugas. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-08 | Registrasi dan tiket; agenda; jenis tiket; pembayaran; status; QR/tiket. | Registration/ticket records milik akun, payment status, ticket status. | Buka TKT-08, print/download, cek status; pemilik akun saja. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-09 | Riwayat agenda; registrasi vs kehadiran; tanggal; check-in status. | Event registrations and attendance/checkin records; attendance counted only after successful check-in. | Filter, buka detail agenda; bedakan Registered, Issued, Checked-in, Absent. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-10 | Daftar Bisnis Saya; status draft/review/revision/approved/published; tanggal pengajuan. | Businesses owned by current cadre profile; review/publication status. | Tambah bisnis menuju PER-11; edit hanya pada status yang diizinkan; tidak dapat self-publish. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-11 | Form bisnis; nama usaha; deskripsi; kategori; foto; produk/layanan; kontak; media sosial. | Business name, description, category, image metadata, products/services, public contact consent, social URLs. | Simpan draft/submit/revisi; validasi; reviewer notes hanya pemilik dan reviewer; kader pemilik. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |
| PER-12 | Notification personal; belum/sudah dibaca; kategori; waktu; sumber. | Notifications owned by current user; read_at; source entity. | Tandai dibaca/buka sumber; data sama dengan SYS-03, bukan salinan; diakses dari lonceng. | current user profile, cadre, roster participation, ticket, attendance, business, notification fixtures |

### 9.19.5 ADM — 12 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| ADM-01 | Cabinet Center tanpa sidebar; kartu seluruh kabinet; status; periode; identitas; jumlah struktur. | Cabinet ID, name, logo, period, active/archived status, structure counts. | Tambah kabinet menuju ADM-03; pilih kabinet menuju ADM-02; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-02 | Dashboard kabinet terpilih; statistik; aktivitas admin; quick actions; kabinet aktif. | Selected cabinet, structure counts, account/assignment counts, recent admin activity. | Buka ADM-03 sampai ADM-12; sidebar aktif; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-03 | Form tambah/edit kabinet; nama; logo; deskripsi; filosofi; visi; misi; tahun/periode; status. | Cabinet fields, period validation, logo metadata. | Simpan draft/update; create/edit melalui satu form mode; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-04 | Detail dan arsip kabinet; identitas; struktur; pengurus; histori; pekerjaan yang belum selesai. | Cabinet detail, assignments, open projects, open correspondence/funds/documents. | Arsipkan setelah warning dan daftar blocker; tidak hard-delete; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-05 | Tiga tab: Struktur, Jabatan, Penempatan; hierarki kabinet → Bidang → Kompartemen. | Fields, compartments, positions, assignments within selected cabinet. | Tambah/edit struktur; buka ADM-06/ADM-07 dari konteks; hanya system_admin; perubahan cabinet scoped. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-06 | Detail/edit Bidang atau Kompartemen; parent; nama; deskripsi; pimpinan; status. | Unit ID, type, parent ID, name, description, leader, status. | Simpan perubahan; struktur berubah hanya pada kabinet aktif; tidak menetapkan pengangkatan politik. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-07 | Master jabatan; level; scope; kapasitas; permission dasar. | Position ID, name, hierarchy level, scope type, capacity, default permission mapping. | Tambah/edit jabatan; assignment aktual dicatat terpisah; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-08 | Daftar pengguna; nama; NIM; email; status akun; status kader; jabatan; filter. | User/profile/cadre summary, account status, assignment summary. | Cari/filter/detail menuju ADM-09; data sensitif dibatasi permission. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-09 | Detail pengguna dengan tab Identitas, Keanggotaan, Jabatan, Permission, Riwayat. | Profile, cadre verification, positions, assignments, permission grants, history. | Assign/revoke/disable/correct NIM setelah pemeriksaan; Admin mencatat assignment, bukan menetapkan pengangkatan. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-10 | Matriks Role × Modul × Tindakan; tab Template Role dan Permission Khusus; scope. | Role templates, permissions, grants, scope global/cabinet/field/compartment/project/event/owner/public. | Preview dampak, simpan, perubahan langsung memengaruhi sidebar/service; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-11 | Konfigurasi modul; pengelola/unit pemilik; status; dependensi; scope. | Module config, managing unit, permissions required, enabled state. | Aktif/nonaktif modul; konfigurasi modul tidak otomatis memberi semua anggota unit permission. | cabinet, structure, position, user, permission, module config, audit fixtures |
| ADM-12 | Audit administratif; actor; action; object; time; result; perubahan. | Audit events, before/after summary, actor, timestamp, result. | Cari/filter/detail read-only; tidak dapat edit/delete; hanya system_admin. | cabinet, structure, position, user, permission, module config, audit fixtures |

### 9.19.6 ORG — 6 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| ORG-01 | Dashboard organisasi; identitas kabinet; 4–6 kartu statistik; agenda hari ini; agenda terdekat; aktivitas; tindak lanjut. | Cabinet, scoped KPIs, today's announcements from 00:01 WIB, events, recent activities, actionable items. | Kartu statistik/drilldown; widget sesuai role; satu template; data keuangan hanya untuk role/scope berizin. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |
| ORG-02 | Organization Overview & Structure; kabinet; Bidang; Kompartemen; pengurus; ringkasan. | Cabinet, fields, compartments, leaders, position assignments. | Drill-down Cabinet → Bidang → Kompartemen → Proker; monitoring only, bukan admin structure edit. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |
| ORG-03 | Monitoring Bidang; identitas; Kompartemen; Proker; agenda; surat; keuangan sesuai permission. | Field and child unit summary, proker statuses, events, correspondence counts, finance summary. | Filter/drill-down; Kabid read-only untuk operasi unit; data mengikuti scope bidang. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |
| ORG-04 | Monitoring Kompartemen; identitas; Staff; Proker; agenda; administrasi; keuangan. | Compartment, staff summary, projects, events, correspondence, finance summary. | Buka Workspace Kompartemen/Proker; read/write hanya sesuai Kakom/permission. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |
| ORG-05 | Activity & Action Center; aktivitas, pengajuan, revisi, pengingat, tindakan yang relevan. | Scoped action feed from source modules; actor, status, timestamp, source link. | Filter status; buka modul sumber; tidak melakukan approval duplikat dan tidak menyimpan workflow sendiri. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |
| ORG-06 | Statistics & Organization Reports; Proker; aktivitas unit; surat; keuangan; agenda; kehadiran. | Aggregated source metrics, period, cabinet, field, compartment, status. | Filter dan drill-down; export PDF/Excel; tidak menghitung ganda; scope-limited. | cabinet hierarchy, scoped organization activity, agenda, correspondence, finance aggregates and reports |

### 9.19.7 WRK — 10 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| WRK-01 | Workspace Overview dengan header identitas, jenis, kabinet, unit induk, status; ringkasan; agenda; surat/keuangan sesuai izin; aktivitas; shortcut. | Workspace type field/compartment/project, owner, unit hierarchy, scoped events/correspondence/finance/activity. | Switcher; sidebar dan isi berubah sesuai workspace type; data lama dibersihkan saat switch. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-02 | Informasi Workspace; nama; deskripsi; tujuan; struktur; pengelola; identitas. | Workspace metadata; field/compartment/project attributes; manager/leader. | Edit hanya sesuai permission; konteks Bidang tidak memiliki create Proker langsung. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-03 | Daftar Proker internal; nama; Kompartemen; Manager; status; main event; filter. | Projects within selected compartment/field scope, status, main event date, manager. | Search/filter/detail; Tambah Proker hanya Kakom; Kabid read-only. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-04 | Form Proker; nama; tujuan; deskripsi; tanggal mulai; main event; target date; lokasi; publikasi; logo. | Project form; compartment ID auto; status Draft; logo metadata. | Kakom membuat Draft; Manager melengkapi; logo wajib sebelum Ongoing/Published; status operasional terpisah dari publikasi. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-05 | Project 360 tabs Overview, Informasi, Roster, Agenda, Persuratan, Keuangan, Dokumen & LPJ, Riwayat. | Semua record yang mempunyai project_id yang sama; tab hanya proyeksi modul sumber. | Pindah tab dan deep-link; tidak membuat data salinan; access per tab permission. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-06 | Roster dengan tab Anggota Tim dan Pengelola Workspace; nama; NIM; jabatan kepanitiaan; level; status; periode. | Roster records, cadre link optional, manager assignment, member periods. | Kakom/Manager berizin mengelola roster; Member hanya record sendiri; anggota boleh nonkader/tanpa akun. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-07 | Assignment Manager; pencarian nama/NIM; status kader; status akun; daftar Manager aktif. | Candidate user, cadre verification, account status, project assignment. | Hanya Kakom assign/revoke/demote Manager; Manager tidak dapat menunjuk Manager lain; catat histori. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-08 | Status perkembangan naratif; capaian; kendala; rencana; jadwal; surat; dana; agenda; LPJ; Task Board. | Project progress entries, task cards, status operational; no numeric percentage. | Task Board bersama tanpa PIC; To Do/In Progress/Blocked/Done; Pengelola Proker update; progres Kompartemen terpisah. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-09 | Pleno & Aktivitas Unit; jadwal; rapat; notulensi; keputusan; tindak lanjut; deadline. | Meeting records, notes, decisions, action follow-up, linked calendar event. | Tambah notulensi/tindak lanjut; jangan membuat event kalender duplikat. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |
| WRK-10 | Penutupan & Arsip; checklist LPJ; surat; disbursement; blocker; histori. | LPJ status, correspondence status, disbursement status, project state, manager assignment. | Hanya Kakom menutup setelah LPJ Approved, surat wajib selesai, seluruh disbursement Settled; arsip read-only. | field, compartment, project, roster, manager assignment, task, progress, meeting fixtures |

### 9.19.8 CAL — 4 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| CAL-01 | Kalender organisasi Month/Week/List; filter kategori/kabinet; detail kegiatan. | Calendar events, category, date/time, visibility, cabinet, owner. | Full read Ketum/Waketum/Sekjen/Sekum/Bendum; Kabid/Kakom prioritas scope; mobile default List. | calendar event fixtures linked to cabinet/unit/project/event |
| CAL-02 | Kalender Workspace berdasarkan konteks Bidang/Kompartemen/Proker. | Satu sumber calendar event dengan workspace context filter. | Workspace shortcut; create opens CAL-04 with context prefilled; mobile List default. | calendar event fixtures linked to cabinet/unit/project/event |
| CAL-03 | Detail kegiatan; judul; kategori; tanggal/jam; lokasi; owner; deskripsi; status; visibilitas; relasi. | Calendar event and linked event/project/unit IDs. | Edit/batalkan jika permission; internal visibility tidak bocor ke public. | calendar event fixtures linked to cabinet/unit/project/event |
| CAL-04 | Form utama jadwal/agenda; judul; kategori; tanggal mulai/selesai; jam mulai/selesai; lokasi; owner auto; deskripsi; visibilitas. | Calendar event draft and context IDs. | Satu pintu pembuatan; shortcut Workspace prefill; conflict warning non-blocking; dua event boleh waktu/lokasi sama. | calendar event fixtures linked to cabinet/unit/project/event |

### 9.19.9 COR — 7 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| COR-01 | Central Correspondence Dashboard; total; menunggu review; revisi; diproses; selesai; Ditmawa; aktivitas terbaru. | All correspondence requests across cabinet/fields/compartments/projects for Sekum; applicant-scoped view for submitter. | Kartu statistik clickable ke COR-02; central inbox Sekum cross-unit. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-02 | Daftar surat; judul; jenis/routing; pengaju; unit; tanggal; status; tindakan. | Correspondence requests and status history. | Filter kabinet/status/unit/jenis/tanggal/pengaju; submitter sees own scope; Sekum all units. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-03 | Form surat; judul bebas; tujuan/keperluan; routing Surat Umum/Untuk Ditmawa; deskripsi; URL dokumen; keterangan; identitas/unit auto. | Request form fields; submitter and unit from current session. | Simpan draft/ajukan; URL document only, no required Word upload; Staff berizin direct to Sekum. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-04 | Tabs Informasi, Dokumen, Checklist, Catatan, Riwayat. | Request, document URL, checklist by letter type, reviewer notes, state history. | Sekum review/revision/complete/reopen with reason; applicant edits same request and resubmits. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-05 | Nomor surat; tanggal; administrasi; histori penerbitan. | Letter number, issue date, sequence and request relation. | Generate unique number automatically; no manual official number entry; Sekum only. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-06 | Tracking Ditmawa; judul; tanggal kirim; referensi; status; catatan; URL; histori. | Dispatch records and status separate from internal correspondence completion. | Update dispatch/tindak lanjut; Sekum only; completed internal letter may still await Ditmawa. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |
| COR-07 | Arsip surat; kabinet; unit; periode; status; histori. | Completed/archived correspondence and version/history. | Search/filter/detail read-only unless explicit permission; no hard-delete. | correspondence request, checklist, review, letter number, Ditmawa dispatch fixtures |

### 9.19.10 FIN — 10 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| FIN-01 | Financial Overview; kas pusat; saldo; pemasukan/pengeluaran; pending requests; approved-not-disbursed; unit finance; revenue; recent transactions. | Finance accounts, aggregates, fund requests, disbursements, ticket/Medpart revenue. | Drill-down; Bendum cross-unit; financial cards hidden from unauthorized roles. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-02 | Daftar transaksi; tanggal; jenis; unit; nominal; status; referensi. | Transactions/journals by authorized scope. | Filter date/type/unit/amount/status; create only if permission. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-03 | Detail/input transaksi; tanggal; jenis; nominal; keterangan; bukti/referensi; akun kas. | Transaction fields, journal status, account, source/destination. | Create draft or view; posted record immutable; Staff only permissions granted. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-04 | Daftar pengajuan dana; pengaju; unit; tujuan; nominal; tanggal; status. | Fund request records and status. | Ajukan/detail/filter; applicant own scope; Bendum cross-unit. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-05 | Form dana; judul; unit auto; Proker terkait; tujuan; rincian item; nominal; proposal URL; tanggal; catatan. | Fund request with line items and attachments metadata. | Draft/submit; Staff with permission submits directly to Bendum without Kakom approval. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-06 | Detail dan persetujuan; nominal diminta/disetujui; rincian; dokumen; catatan; histori. | Fund request and review history. | Approve/reject with reason; Bendum only; Top Management monitoring only. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-07 | Pencairan; termin; nominal; bukti transfer; penerimaan unit; status per termin. | Disbursement tranches, transfer proof metadata, recipient confirmation. | Catat pencairan; konfirmasi tiap termin; settled only after all obligations complete. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-08 | Keuangan unit/Proker; kas; pemasukan; pengeluaran; transfer; histori. | Unit-scoped accounts, transactions, transfers, project finance. | Record transaction per permission; cross-unit Bendum; transfer not new income. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-09 | Agregat pendapatan tiket/Medpart; agenda; jenis tiket; harga; approved count; total. | Aggregated ticket/Medpart sales, no buyer PII/proof. | Filter/drill-down aggregates; Bendum/authorized monitoring; no proof verification. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |
| FIN-10 | Laporan; saldo; pemasukan; pengeluaran; periode; kabinet; unit; jenis/sumber. | Aggregated financial reports from source transactions. | Filter; export PDF/Excel; no duplicate internal transfer as revenue. | finance account, transaction, fund request, tranche, receipt, ticket/Medpart aggregate fixtures |

### 9.19.11 EVT — 9 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| EVT-01 | Agenda Management Dashboard; total agenda; agenda aktif; pendaftar; tiket terbit; payment pending; revenue approved; attendance. | Events, registrations, tickets, payment status, check-ins. | Open agenda/verifications/reports; organizer assignment only. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-02 | Daftar agenda internal; nama; owner; kategori; tanggal; status; publikasi. | Internal events and ownership/assignment. | Tambah via CAL-04/EVT-03 alias; search/filter/detail; organizer scope. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-03 | Entry point Buat/Edit Agenda ke CAL-04 shared form; tidak mempunyai form terpisah. | Same event/calendar record and event context; source route marker only. | Open shared CAL-04 AgendaForm; event price/quota in EVT-05; one agenda object. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-04 | Detail agenda tabs Informasi, Jenis Tiket, Peserta, Pembayaran, Presensi, Laporan. | One event object, ticket types, registrations, payment proofs, attendance, report. | Manage event and navigate tabs; same event_id; organizer assignment. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-05 | Jenis tiket; nama; deskripsi; harga; kuota; awal/akhir penjualan; status. | Ticket type records and sold/reserved counters. | Add/edit/activate; price snapshot for existing orders immutable. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-06 | Database peserta; enam field identitas; tiket; pembayaran; kehadiran. | Participant registration snapshot, ticket, payment and check-in. | Search/filter/detail/edit/cancel/resend per permission; PII event-assigned organizer only. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-07 | Verifikasi pembayaran; peserta; nominal; waktu; bukti; status. | Payment proof metadata, order, ticket type, reservation state. | Approve/reject with reason; organizer/verifier assigned; no auto timeout while pending. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-08 | Ticket Delivery & Email History; tiket issued; tujuan tersamarkan; email status; waktu; attempts. | Ticket IDs, email_outbox attempts, sent/failed state. | Resend same ticket/token; no new ticket; no actual email. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |
| EVT-09 | Laporan penjualan; jenis tiket; harga; transaksi Approved; revenue; pendaftar; hadir. | Aggregated sales and attendance metrics. | Filter/export; no unauthorized participant PII. | event, organizer, ticket type, participant, payment proof, email outbox, sales fixtures |

### 9.19.12 ATT — 4 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| ATT-01 | Check-in Dashboard; agenda; registrasi valid; tiket issued; hadir; belum hadir; failed attempts. | Event registrations, tickets, check-ins. | Open scanner/list; event assignment only. | ticket token, registration, check-in, attendance and failed-scan fixtures |
| ATT-02 | Scanner camera; instructions; validation result; minimal participant identity; ticket type; next scan. | QR/barcode token demo and ticket status. | Scan or manual code fallback; reject wrong/revoked/expired/used token; no offline auto-sync. | ticket token, registration, check-in, attendance and failed-scan fixtures |
| ATT-03 | Daftar hadir/belum hadir; peserta; tiket; status; waktu; metode check-in. | Attendance records and participant ticket snapshot. | Tabs Hadir/Belum Hadir; filter ticket type/search; CSV export if permission. | ticket token, registration, check-in, attendance and failed-scan fixtures |
| ATT-04 | Detail/manual check-in; registrasi; tiket; status; catatan; histori. | Valid registration/ticket, operator ID, timestamp, reason. | Manual check-in only for authorized staff; one ticket one check-in. | ticket token, registration, check-in, attendance and failed-scan fixtures |

### 9.19.13 DOC — 6 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| DOC-01 | Document Center; judul; kategori; pemilik; sumber; versi; tanggal; status. | Document metadata, source URL/file metadata, owner, related entities. | Add/search/filter/detail; scope owner/uploader/reviewer. | document, version, LPJ, review and archive fixtures |
| DOC-02 | Form dokumen; judul; kategori; keterangan; pemilik; URL/file metadata; relasi kegiatan/Proker. | Document metadata and relation IDs. | Save/update; letter requests remain URL-only; no mandatory Word/PDF upload for letters. | document, version, LPJ, review and archive fixtures |
| DOC-03 | Tabs Informasi, Dokumen, Riwayat Versi, Relasi. | Document details, versions, source links, related module IDs. | Open version/source; preserve approved version history. | document, version, LPJ, review and archive fixtures |
| DOC-04 | LPJ Management; Proker; owner; status; periode; kelengkapan; tindakan. | LPJ records linked to projects. | Create/open LPJ by permission; reviewer assignments. | document, version, LPJ, review and archive fixtures |
| DOC-05 | Seven sections: Identitas Proker, Ringkasan Kegiatan, Pelaksanaan, Peserta/Kehadiran, Ringkasan Keuangan, Dokumentasi, Evaluasi & Kesimpulan. | Project/event/attendance/finance data pulled from source records; reviewer comments and status. | Draft/submit/revision/approve; no duplicate re-entry of source data; reviewer by assignment. | document, version, LPJ, review and archive fixtures |
| DOC-06 | Document Archives; cabinet; field; compartment; project; period; historical records. | Archived documents, versions, parent entity and permission. | Search/filter/open read-only; preserve history. | document, version, LPJ, review and archive fixtures |

### 9.19.14 DIR — 8 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| DIR-01 | Database kader; nama; NIM; tingkatan; status; akun terhubung; kabinet/jabatan. | Cadre profiles, verification, account link, assignments. | Add/search/filter/detail; Admin or PSDM permission; one source of truth. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-02 | Tabs Identitas, Keanggotaan, Jabatan, Proker, Agenda, Bisnis, Riwayat. | Cadre identity, membership, positions, roster history, attendance, business links. | Edit allowed fields; view persistent history; authorized Admin/PSDM. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-03 | Verifikasi & Penautan; NIM match candidate; akun; bukti; status. | Candidate profile, user account, NIM match, verification status. | Admin/PSDM verifies identity then links account; NIM match alone never auto-verifies. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-04 | Database bisnis; nama usaha; pemilik; kategori; tanggal pengajuan; status review; status publish. | Business records and owner cadre IDs. | Search/filter/detail; only reviewer scope for internal status. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-05 | Detail/verifikasi bisnis; info usaha; foto; kontak; riwayat; reviewer notes. | Business submission, review status, publication status, public contact consent. | Approve/request revision/reject then publish separately; reviewer notes private. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-06 | Database perusahaan/sponsor/mitra; nama; kategori; industri; kontak resmi; PIC per permission; status relasi. | Company records, public contact, private PIC, partnership status. | All pengurus read according permission; edit only Partnership/authorized. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-07 | Detail perusahaan tabs Profil, Kontak, PIC, Kerja Sama, Proker/Agenda, Riwayat Interaksi. | Company profile, private PIC, contacts, linked partnership. | Edit only Partnership; hide private contact from unauthorized users. | cadre, verification, business, company, PIC and partnership fixtures |
| DIR-08 | Riwayat kerja sama; perusahaan; unit/Proker; periode; catatan; tanggal; status. | Partnership records and interaction history. | View/add notes per permission; timeline; no separate sponsorship contract system. | cadre, verification, business, company, PIC and partnership fixtures |

### 9.19.15 CMS — 13 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| CMS-01 | CMS dashboard; berita; prestasi; Medpart; draft/published; aktivitas; pekerjaan pending. | Article, achievement, Medpart counts/status, recent activity. | Open module according permission. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-02 | Homepage editor; sections; banners; editorial content; desktop/mobile preview. | Homepage section content, media references, publication state. | Edit section/preview/publish; only CMS Editor/Publisher per action. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-03 | Media Library; image/poster/photo/article asset; metadata. | Media asset ID, filename, type, size, dimensions, alt text, owner, status. | Add/select/archive; use verified repository assets or labeled placeholders. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-04 | List artikel; judul; kategori; penulis; tanggal; status. | Article records and publication state. | Add/detail/search/filter; Content Creator permission. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-05 | Editor artikel; judul; slug; body; cover; kategori; source URL; SEO title/description. | Article fields and content blocks. | Save draft/preview; Publisher may edit before publication if permission; publish requires Publisher. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-06 | Daftar prestasi; kader; judul; kategori; tingkat; tanggal; status verifikasi/publikasi. | Achievement records with one/multiple cadre links. | Add/detail/filter; management remains in CMS, profile relation in DIR. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-07 | Form/verifikasi prestasi; kader terkait; judul; kategori/tingkat; tanggal; deskripsi; dokumentasi. | Achievement submission and reviewer state. | Review/request revision/approve/publish; multiple cadres allowed. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-08 | Medpart dashboard; total; gratis/berbayar; pending review; selesai; ditolak. | Medpart submissions, package and payment status. | Open submission/filter; Medkom permission. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-09 | Detail Medpart; pengaju; kegiatan; paket; bukti paid; poster; histori review. | Submission, payment proof metadata, review history, tracking code. | Medkom verifies proof and application; Bendum only aggregate; approve does not auto-publish. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-10 | Paket & QRIS; nama paket; syarat; harga; QRIS demo; periode; histori perubahan. | Medpart package records, one configured demo QRIS per package/payment context as defined. | Add/edit package; QRIS display only, no payment gateway. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-11 | Publication queue; materi siap tayang; poster; status tayang; histori. | Approved Medpart submission and publication record. | Publish manually/unpublish if permission; requested date is informational only. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-12 | Kotak Suara private list; kategori; tanggal; status; ringkasan; operator. | Private feedback submissions; identity masked by permission. | Search/filter/open; no public list; assigned operator/pimpinan read-only scope. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |
| CMS-13 | Detail feedback; isi; kategori; catatan tindak lanjut; status; histori. | Feedback record, routing, action history, identity access policy. | Triage/route/update/close; private; authorized operator only. | homepage section, media, article, achievement, Medpart, QRIS package, feedback fixtures |

### 9.19.16 SYS — 9 Screen

| Screen ID | Struktur/isi wajib | Data/field yang wajib dirender | Interaksi dan akses | Sumber dummy |
|---|---|---|---|---|
| SYS-01 | Statistics dashboard; organisasi/kabinet/Bidang/Kompartemen/Proker. | Aggregated metrics by cabinet/unit/period. | Filter and drill-down; scope-limited; no double counting. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-02 | Detailed Report Viewer; module; period; source data; details. | Report definition, source records, scoped aggregations. | Filter/export; does not create duplicate records. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-03 | Notification Center; unread/read; category; time; source. | Shared notifications collection; same records projected by PER-12. | Mark read/open source; no new notification copy. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-04 | Approval Center; formal pending actions for surat, dana, prestasi, Medpart, LPJ if reviewer. | Approval task references to source entity and current reviewer. | Filter and deep-link to source module; actual decision in source module; no second approval engine. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-05 | Activity/Audit History for user/unit; actor; action; time; module; change summary. | Activity history within permitted scope. | Search/filter/detail; distinct from ADM-12 administrative audit log. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-06 | Global search results for kader, Proker, agenda, surat, dokumen, berita, perusahaan. | Search index/projections from accessible entities only. | Search/filter/open; re-check permission on destination. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-07 | 403 unauthorized; explanation; safe message; back to allowed dashboard. | No restricted record details. | Back to permitted area; never reveal private data existence. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-08 | 404 not found; neutral message; back/home. | No private entity existence leakage. | Back or Public Home; distinguish from 403. | notification, approval reference, activity history, report, search and error fixtures |
| SYS-09 | System error/unavailable; user-safe explanation; demo reference; retry/back. | Error reference ID and safe status only; no stack trace. | Retry or return; isolate failed widget/page; no internal technical details. | notification, approval reference, activity history, report, search and error fixtures |


# 10. Business Flow dan State Transition

Semua flow di bawah wajib dapat dijalankan dalam mode demo. Setiap flow harus mempunyai happy path, negative path, status, feedback UI, serta perubahan data yang dapat dilihat di halaman terkait.

## BF-01 — Registrasi, login, verifikasi email, identitas kader, aktivasi akun

**Aktor:** Pengunjung, akun demo, Admin/verifikator kader.  
**Input:** Nama, NIM, email, telepon, fakultas, prodi, password.

**Normal flow:**
1. Pengguna mengisi registrasi.
2. Sistem memvalidasi field dan duplikasi NIM/email.
3. Sistem membuat akun demo.
4. Status awal Mahasiswa Biasa.
5. Simulasi verifikasi email.
6. Jika ada kandidat kader, tampilkan proses tautan kandidat.
7. Admin/verifikator memutuskan verified/rejected.
8. Dashboard dan menu Keanggotaan diperbarui setelah verifikasi.

**Status:** registered → verification_pending → active; cadre_link pending/verified/rejected.  
**Negative path:** NIM/email duplikat, password tidak cocok, fakultas/prodi tidak valid, akun suspended.  
**Invariant:** NIM match tidak otomatis mengubah status kader.

## BF-02 — Siklus kabinet, struktur, jabatan, dan pergantian kepengurusan

**Aktor:** Admin Sistem.

**Normal flow:**
1. Admin membuka Cabinet Center.
2. Membuat kabinet draft.
3. Mengisi bidang, kompartemen, jabatan.
4. Menempatkan pengurus.
5. Validasi kabinet aktif dan periode.
6. Aktifkan kabinet.
7. Kabinet lama diarsipkan dengan histori.
8. Scope assignment diperbarui.

**Status:** draft/active/archived; assignment active/ended.  
**Negative path:** penugasan dobel, periode tumpang tindih, perubahan kabinet saat sesi aktif.  
**Invariant:** histori lama tidak hilang dan arsip tidak memberi hak mutasi.

## BF-03 — Penetapan role, permission, dan workspace switching

**Aktor:** Admin Sistem, Kakom, pengguna multi-workspace.

**Normal flow:**
1. Admin mengatur role/permission dan scope.
2. Kakom memilih kader terverifikasi untuk Manager Proker.
3. Sistem membuat assignment.
4. Sidebar dan Area Switcher diperbarui.
5. Pengguna berpindah workspace.
6. Data berubah mengikuti scope workspace.

**Status:** granted/revoked/expired; workspace active/closed.  
**Negative path:** user mencoba memberi role sendiri, assignment dicabut saat halaman terbuka, akses cross-project.  
**Invariant:** menu tersembunyi bukan satu-satunya proteksi; mock service harus menolak aksi yang tidak sah.

## BF-04 — Pembuatan Proker dan workspace otomatis

**Aktor:** Kepala Kompartemen.  
**Input:** Nama, tujuan, deskripsi, tanggal, lokasi, cover/informasi publik.

**Normal flow:**
1. Kakom memilih kompartemen aktif.
2. Mengisi form Proker.
3. Menyimpan.
4. Sistem membuat record Proker demo.
5. Workspace Proker tersedia.
6. Proker muncul di daftar internal.
7. Kakom dapat menunjuk Manager.

**Status:** draft/planned/ongoing/completed/cancelled/archived sesuai semantic state yang dipakai.  
**Negative path:** kompartemen salah, kabinet tidak aktif, submit berulang.  
**Invariant:** refresh tidak membuat Proker ganda; tanggal main event terlewati tidak otomatis menutup Proker.

## BF-05 — Roster, rejoin, penugasan Manager, dan hak baca

**Aktor:** Kakom, Manager, anggota roster.

**Normal flow:**
1. Kakom/Manager memasukkan NIM, nama, dan jabatan kepanitiaan anggota.
2. Sistem menautkan ke kader jika data cocok dan terverifikasi.
3. Record roster disimpan.
4. Kakom menunjuk Manager yang memenuhi syarat.
5. Saat anggota keluar, periode keikutsertaan diakhiri.
6. Jika kembali, buat periode rejoin tanpa menggandakan hitungan identitas.

**Status:** member active/ended; manager appointment active/expired.  
**Negative path:** NIM duplikat, nonkader ditunjuk Manager, Manager menunjuk Manager lain, rejoin ganda.  
**Invariant:** satu identitas per Proker dengan histori periode; anggota biasa hanya melihat record miliknya sendiri.

## BF-06 — Timeline kerja, laporan progres, Task Board, dan pleno

**Aktor:** Manager Proker, pengurus kompartemen, Kakom/Kabid/pimpinan sebagai pembaca sesuai scope.

**Normal flow:**
1. Pengelola menambah tahap/tugas.
2. Task dimasukkan ke To Do.
3. Pengelola memindahkan task ke In Progress, Blocked, atau Done.
4. Pengelola mencatat capaian, kendala, dan rencana.
5. Jadwal pleno dibuat melalui kalender.
6. Notulensi, keputusan, dan tindak lanjut disimpan.
7. Monitoring menampilkan histori.

**Status task:** To Do → In Progress/Blocked → Done; perubahan dapat dilakukan sesuai permission.  
**Invariant:** Task Board bersama tanpa PIC; tidak ada persen progres Proker; progres Kompartemen terpisah dari progres Proker.

## BF-07 — Kalender internal, agenda publik, dan perubahan jadwal

**Aktor:** Pengelola unit/organizer/pembaca sesuai scope.

**Normal flow:**
1. Pengelola membuka Agenda & Kalender atau shortcut dari Workspace.
2. Semua entry point membuka satu form CAL-04.
3. Workspace Bidang/Kompartemen/Proker mengisi owner dan konteks otomatis.
4. Pengelola menentukan kategori, tanggal/jam mulai-selesai, lokasi, deskripsi, dan visibility.
5. Jika berasal dari Agenda Management, EVT-03 hanya menjadi alias/shortcut ke CAL-04; tidak membuat form kedua.
6. Kalender menampilkan event object yang sama sesuai scope.
7. Halaman publik hanya menampilkan jadwal Published.
8. Perubahan/cancel tercatat dalam histori.

**Negative path:** bentrok, acara batal, tanggal main event disembunyikan, lintas kompartemen.  
**Invariant:** tidak ada jadwal kembar; warning benturan tidak memblokir penyimpanan; data internal tidak bocor ke Public Website.

## BF-08 — Persuratan Surat Umum / Untuk Ditmawa

**Aktor:** Pengurus/Staff/Pengelola Proker dengan `correspondence:create` dan Sekum.

**Normal flow:**
1. Pemohon berizin membuka COR-03; identitas dan unit terisi otomatis.
2. Mengisi judul bebas.
3. Memilih routing Surat Umum atau Untuk Ditmawa.
4. Menyertakan URL dokumen.
5. Submit langsung ke Central Inbox Sekum; tidak memerlukan approval tambahan Kakom.
6. Sekum memeriksa dan mengisi checklist sesuai jenis surat.
7. Jika perlu, Sekum meminta revisi.
8. Pemohon memperbaiki pengajuan yang sama dan submit ulang.
9. Sekum menyelesaikan dan menghasilkan nomor surat otomatis/unik.
10. Jika Ditmawa, catat dispatch dan tindak lanjut terpisah.
11. Hanya Sekum dapat reopen dengan alasan.

**Status:** draft/submitted/revision/completed/dispatch.  
**Negative path:** checklist kosong, URL rusak, nomor ganda.  
**Invariant:** unggah Word bukan kewajiban; histori tidak dihapus.

## BF-09 — Permintaan dana, keputusan Bendum, dan pencairan bertahap

**Aktor:** Unit pengaju/Staff/Pengelola Proker dengan permission, Bendum, unit penerima.

**Normal flow:**
1. Pengaju berizin menyusun item kebutuhan dan nominal pada FIN-05; unit terisi otomatis.
2. Submit langsung ke Bendum tanpa approval tambahan Kakom.
3. Bendum review melalui FIN-06.
4. Bendum approve/reject dan menetapkan nominal approved.
5. Bendum mencatat satu atau beberapa termin pencairan.
6. Bukti transfer demo dicatat.
7. Unit mengonfirmasi setiap termin.
8. Request settled setelah seluruh kewajiban selesai.

**Status:** draft/submitted/approved/rejected/disbursed/settled.  
**Negative path:** pencairan berulang, nilai melebihi approved, salah konfirmasi termin.  
**Invariant:** total disbursed tidak melebihi approved; satu termin confirmed tidak menyelesaikan semua termin.

## BF-10 — Ledger, kas pusat, dan transfer internal

**Aktor:** Bendum dan pengirim/penerima unit.

**Normal flow:**
1. Catat transaksi sumber eksternal.
2. Buat jurnal seimbang.
3. Jika transfer internal, catat sisi pengirim dan penerima.
4. Catat dana transit.
5. Penerima mengonfirmasi.
6. Laporan menunjukkan perpindahan kedua pihak.

**Status:** draft/posted/reversed; transfer pending/confirmed/disputed.  
**Negative path:** akun tidak aktif, double post, reversal salah.  
**Invariant:** transfer internal bukan pendapatan; jurnal posted immutable.

## BF-11 — Pembuatan dan publikasi Agenda/Event

**Aktor:** Organizer Bidang/Kompartemen/Proker.

**Normal flow:**
1. Organizer membuka Agenda & Kalender utama atau shortcut dari Workspace.
2. Form utama CAL-04 dibuka; EVT-03 adalah entry alias ke komponen yang sama.
3. Isi identitas agenda, deskripsi, tanggal/jam, lokasi, kategori, poster, owner/context, dan visibility.
4. Preview dan simpan Draft/Publish sesuai permission.
5. Pengaturan jenis tiket (nama, harga, kuota, masa jual) dilakukan pada EVT-05, bukan di form CAL-04.
6. Satu QRIS demo per agenda diatur pada konteks pembayaran EVT-04.
7. Event object yang sama muncul di CAL-01/CAL-02 dan EVT-04.

**Status:** draft/published/cancelled/completed; ticket type scheduled/open/closed/soldout.  
**Negative path:** owner tidak valid, kuota tidak sesuai, publish sebelum data wajib lengkap.  
**Invariant:** membuat event tidak otomatis memberi payment verification global.

## BF-12 — Reservasi 180 detik dan pembayaran tiket manual

**Aktor:** Pembeli publik/login dan organizer verifikator.

**Normal flow:**
1. Pembeli memilih tiket di TKT-01.
2. Mengisi enam field peserta di TKT-02.
3. Klik Bayar Sekarang di TKT-03.
4. Sistem membuat reservation demo dengan expiry 180 detik dan menampilkan satu QRIS demo agenda.
5. Pembeli melakukan simulasi upload bukti.
6. Jika submit sebelum expiry, status menjadi Pending Verification dan TKT-04 menampilkan status tersebut.
7. Pending Verification tidak auto-timeout; kuota tetap tertahan sampai Organizer memutuskan.
8. Organizer menyetujui/menolak melalui EVT-07.
9. Hasil status diperbarui di TKT-04.
10. Jika approved, tiket PDF/barcode demo diterbitkan, TKT-08 dapat dibuka, dan email outbox demo berubah.

**Status:** reserved/expired/pending_verification/approved/rejected/issued.  
**Negative path:** timer habis, file format tidak sesuai, bukti ditolak, double submit.  
**Invariant:** pending verification tidak auto-timeout; rejection mengembalikan kuota; tidak ada transaksi uang sungguhan.

## BF-13 — Tiket gratis dan pendaftaran tanpa tiket

**Aktor:** Pengunjung/mahasiswa dan organizer.

**Normal flow:**
1. Peserta mengisi data.
2. Sistem validasi.
3. Untuk gratis dengan tiket, tiket demo langsung diterbitkan.
4. Untuk agenda tanpa tiket, registrasi dicatat sesuai konfigurasi.
5. Email outbox demo dibuat jika diperlukan.

**Negative path:** duplikasi registrasi, kuota habis, event closed.  
**Invariant:** jangan menampilkan QRIS atau payment proof untuk agenda gratis.

## BF-14 — Cek status tiket menggunakan NIM dan OTP

**Aktor:** Peserta.

**Normal flow:**
1. Input NIM.
2. Klik minta OTP.
3. Demo Control Center memperlihatkan kode uji.
4. Peserta memasukkan kode.
5. Sistem memverifikasi.
6. Hasil hanya berisi tiket milik identitas demo yang terverifikasi.
7. Peserta membuka/unduh tiket demo.

**Status:** otp_sent/verified/expired/locked.  
**Negative path:** OTP salah, cooldown, lockout, NIM tidak ditemukan.  
**Invariant:** respons pencarian netral; jangan membocorkan tiket orang lain.

## BF-15 — Scan tiket, check-in, dan partisipasi kader

**Aktor:** Check-in staff, peserta, sistem kader demo.

**Normal flow:**
1. Scan barcode demo atau input token.
2. Validasi event, status tiket, dan token.
3. Simpan check-in.
4. Tampilkan sukses/duplikat.
5. Update daftar hadir dan dashboard.
6. Jika identitas kader sudah terverifikasi, hubungkan ke riwayat kehadiran.

**Status:** unscanned/checked_in/rejected_attempt.  
**Negative path:** QR salah event, double scan, token palsu, offline.  
**Invariant:** kehadiran tidak dihitung hanya dari registrasi atau tiket issued.

## BF-16 — Pengajuan bisnis kader dan moderasi

**Aktor:** Kader pemilik dan reviewer bisnis.

**Normal flow:**
1. Kader mengisi profil usaha, foto, kontak, produk/layanan.
2. Simpan draft/submit.
3. Reviewer memeriksa.
4. Approve/publish atau request revision.
5. Pemilik mengubah draft revisi.
6. Reviewer memeriksa ulang.
7. Public directory menampilkan snapshot approved/published.

**Status:** draft/review/published/rejected/needs_revision.  
**Negative path:** pemilik lain mencoba edit, foto kosong, kontak sensitif tidak disetujui.  
**Invariant:** reviewer notes tidak tampil di publik.

## BF-17 — Manajemen perusahaan, sponsor, dan kemitraan

**Aktor:** Petugas Partnership dan pengurus read-only.

**Normal flow:**
1. Buat/kelola profil perusahaan.
2. Tambah PIC dan kontak privat.
3. Catat interaksi.
4. Tautkan partnership ke kabinet/unit/Proker/periode.
5. Monitor dan arsipkan histori.

**Negative path:** perusahaan duplikat, PIC privat bocor, user non-Partnership mencoba edit.  
**Invariant:** seluruh pengurus dapat membaca direktori sesuai permission; edit hanya Partnership.

## BF-18 — Pengajuan Media Partner dan publikasi manual

**Aktor:** Pemohon publik, Medkom, Bendum untuk agregat.

**Normal flow:**
1. Publik mengisi data dan memilih paket tanpa login.
2. Upload poster/dokumen demo.
3. Jika berbayar, tampilkan QRIS demo dan simulasi bukti.
4. Submit membuat submission dan kode tracking unik yang ditampilkan pada receipt.
5. Pemohon mengecek status melalui PUB-17 menggunakan kode tracking.
6. Medkom memeriksa bukti (jika berbayar) dan pengajuan.
7. Status approval pengajuan disimpan.
8. Medkom memublikasikan secara manual dan terpisah.
9. Public Website menampilkan hanya materi Published.

**Status:** submitted/payment_pending/pending_review/approved/rejected/published.  
**Negative path:** nama/kegiatan bertabrakan, bukti ditolak, payment approved tetapi belum publish, requested date berlalu.  
**Invariant:** requested date bukan scheduler; Bendum bukan verifikator proof.

## BF-19 — Dokumen, LPJ, dan penutupan Proker

**Aktor:** Pengelola Proker, LPJ Reviewer, Kakom.

**Normal flow:**
1. Pengelola menambah dokumen/URL dan versi.
2. Menyusun LPJ dari kegiatan, keuangan, kehadiran, dokumentasi, evaluasi.
3. Submit ke reviewer.
4. Reviewer approve atau request revision.
5. Sistem mengecek surat, dana, LPJ.
6. Kakom menutup Proker.
7. Assignment Manager berakhir; histori tetap ada.

**Status:** draft/submitted/revision/approved; project completed/archived.  
**Negative path:** LPJ belum approved, dana belum settled, surat terbuka, role tidak sah.  
**Invariant:** hanya Kakom menutup; Bendum tidak otomatis menjadi approver LPJ.

## BF-20 — CMS, berita, prestasi, dan homepage

**Aktor:** CMS Editor, Achievement Reviewer, Publisher, publik.

**Normal flow:**
1. Editor membuat draft artikel/section.
2. Preview.
3. Reviewer/publisher menyelesaikan pemeriksaan.
4. Publish.
5. Prestasi dapat terkait satu atau beberapa kader.
6. Homepage mengambil empat prestasi Published terbaru.

**Status:** draft/review/published/archived.  
**Negative path:** gambar kosong/rusak, slug duplikat, kabinet historis.  
**Invariant:** konten publik hanya jika approved dan Published.

## BF-21 — Kotak Suara privat dan tindak lanjut

**Aktor:** Pengunjung publik, feedback operator, pimpinan monitoring.

**Normal flow:**
1. Pengunjung mengirim aspirasi.
2. Sistem membuat receipt.
3. Masukan tersimpan privat.
4. Operator melakukan triage.
5. Operator merutekan ke unit berwenang.
6. Pihak terkait menindaklanjuti.
7. Kasus ditutup dengan histori.

**Status:** submitted/triaged/in_progress/closed.  
**Negative path:** spam, operator di luar scope, ekspor PII.  
**Invariant:** tidak ada daftar aspirasi publik; monitoring tidak sama dengan triage.

## BF-22 — Notifikasi, email outbox, retry, dan audit

**Aktor:** Pemicu transaksi demo, mock worker, penerima.

**Normal flow:**
1. Mock service menyelesaikan perubahan domain.
2. Buat notification record dan email outbox demo.
3. Status queued.
4. Simulasi sent/failed.
5. Retry idempotent.
6. User melihat Notification Center dan deep link.

**Status:** queued/sent/failed/retry_scheduled.  
**Negative path:** duplicate queue, email kosong, retry berulang.  
**Invariant:** kegagalan email tidak menerbitkan tiket baru dan tidak membatalkan transaksi demo yang sudah sukses.

---

# 10.23 Detailed Frontend Demo Journeys — Step-by-Step

Semua journey berikut harus bisa dicoba dari UI tanpa backend. Setiap langkah mengubah shared mock repository, menampilkan feedback, dan memperbarui screen lain yang memakai record sama.

## 10.23.1 Login akun demo dan pemetaan area

**Akun uji:** DEMO-01, DEMO-02, DEMO-04, DEMO-13, DEMO-14, DEMO-25, DEMO-26.

1. Pengunjung membuka Public Website dan memilih `Login`.
2. Sistem membuka AUTH-01 (`/masuk`).
3. Pengguna memilih `Gunakan Akun Demo` atau mengisi email/password.
4. Sistem memeriksa akun dan status.
5. Jika `verification_pending`/`inactive`/`suspended`, tampilkan AUTH-06; jangan render sidebar internal.
6. Jika aktif, muat identitas, status kader, base role, permission, assignment, scope, dan area.
7. DEMO-01/02 diarahkan ke PER-01; DEMO-04/26 diarahkan ke PER-01 dengan Area Switcher; DEMO-25 diarahkan ke ADM-01 tanpa sidebar.
8. Klik Logout menghapus session demo, bukan seluruh seed data.
9. Login ulang setelah refresh harus menghasilkan area dan sidebar yang sama selama assignment belum berubah.

**Acceptance:** satu sistem login untuk semua; tidak ada pilihan role saat login/registrasi; route `returnTo` divalidasi; session tidak mengubah permission.

## 10.23.2 Registrasi mahasiswa baru

**Akun awal:** pengunjung anonim. **Screen:** AUTH-02 → AUTH-03 → PER-01.

1. Pengunjung memilih Daftar.
2. Isi nama lengkap, NIM demo unik, email unik, telepon placeholder, Fakultas Demo, Program Studi Demo, password, konfirmasi, consent.
3. Dropdown Program Studi hanya menampilkan opsi yang terkait dengan Fakultas yang dipilih.
4. Sistem menolak NIM/email duplikat dan field invalid.
5. Submit membuat akun dengan status `verification_pending`, base role Mahasiswa Biasa, `cadre_status=not_verified`, tanpa assignment.
6. AUTH-03 menampilkan email tersamarkan dan kode demo.
7. Pengguna memasukkan kode demo atau menekan tombol Simulasikan Verifikasi yang tersedia hanya pada mode demo.
8. Setelah valid, status akun menjadi `active`; pengguna diarahkan ke PER-01.
9. Sidebar Personal Area hanya berisi Dashboard Saya, Profil Saya, Aktivitas Saya, Pengaturan Akun. Keanggotaan tidak muncul.

**Acceptance:** pengguna tidak dapat memilih Kader, Staff, Pengurus, Pengelola Proker, atau Admin saat registrasi.

## 10.23.3 Verifikasi dan penautan akun kader

**Aktor:** Admin/PSDM; **Screen:** DIR-01 → DIR-02 → DIR-03 → PER-05.

1. Admin/PSDM membuka Database Kader.
2. Cari kandidat berdasarkan NIM.
3. Sistem menampilkan kemungkinan kecocokan akun, tetapi status tetap `pending`.
4. Admin/PSDM memeriksa identitas dan menekan Verifikasi.
5. Setelah verifikasi, tautkan akun dengan kader yang benar.
6. `cadre_status` berubah menjadi `verified`; PER-05/PER-06/PER-10/PER-11 muncul pada akun kader.
7. Histori keanggotaan dan assignment lama tetap dipertahankan.
8. Jika identitas tidak cocok, tolak penautan; akun tetap Mahasiswa Biasa.

**Acceptance:** NIM match saja tidak pernah mengubah status kader.

## 10.23.4 Admin memilih kabinet dan membuka Admin Panel

**Akun:** DEMO-25; **Screen:** AUTH-01 → ADM-01 → ADM-02 → ADM-03..ADM-12.

1. Admin login menggunakan `demo.admin@example.test`.
2. Sistem memeriksa `system_admin`.
3. Admin masuk ADM-01 Cabinet Center tanpa sidebar.
4. ADM-01 menampilkan kabinet aktif dan arsip, periode, logo, status, jumlah Bidang/Kompartemen.
5. Admin memilih `cab-arthakarsa-2627`.
6. Sistem membuka ADM-02 Cabinet Dashboard dan menampilkan sidebar Admin Panel.
7. Admin membuka Struktur Organisasi, Manajemen Pengguna, Database Kader, Role & Permission, Konfigurasi Modul, atau Audit Log.
8. Jika Admin memilih kabinet lain, scope dan seluruh data berubah ke kabinet tersebut.
9. Admin tidak otomatis memperoleh akses COR/FIN/EVT sebagai operator.

**Acceptance:** ADM-01 tidak memiliki sidebar; ADM-02 memiliki sidebar; permission kabinet A tidak bocor ke kabinet B.

## 10.23.5 Workspace Switcher — tiga jenis Workspace

**Akun:** DEMO-09 dan DEMO-26; **Screen:** ORG-01 → WRK-01/WRK-02.

1. Pengguna membuka Organization Management.
2. Topbar menampilkan Workspace Switcher hanya untuk assignment yang aktif.
3. DEMO-09 memilih Workspace Bidang `field-demo-01`.
4. WRK-01 menampilkan ringkasan Bidang dan child compartments; sidebar menjadi sidebar Workspace Bidang.
5. DEMO-26 memilih Workspace Kompartemen `comp-demo-01`; WRK-01 menampilkan Staff dan Proker unit.
6. DEMO-26 memilih Workspace Proker `proj-business-expo`; WRK-01 menampilkan konteks satu Proker.
7. Saat berpindah, breadcrumb, sidebar, active state, data, filter, dan tombol berubah bersama.
8. Data Workspace sebelumnya tidak boleh terlihat setelah switch.
9. Jika assignment dicabut, Workspace hilang dari switcher dan deep link menghasilkan 403.

**Acceptance:** tiga Workspace memakai template yang sama tetapi data, sidebar, dan permission berbeda.

## 10.23.6 Pembuatan Proker dan Workspace otomatis

**Akun:** DEMO-08; **Screen:** WRK-01 → WRK-03 → WRK-04 → WRK-05 → WRK-07.

1. Kakom membuka Workspace Kompartemen sendiri.
2. Pilih Program Kerja lalu Tambah Proker.
3. Sistem membuka WRK-04 dengan Kompartemen terisi otomatis.
4. Kakom mengisi nama, tujuan, deskripsi, tanggal mulai, main event, target date, lokasi, informasi publikasi.
5. Simpan sebagai Draft.
6. Sistem membuat satu Project ID dan menampilkan Proker pada WRK-03.
7. Workspace Proker tersedia melalui WRK-05.
8. Kakom menunjuk Manager yang akun aktif dan kader terverifikasi.
9. Manager menerima assignment dan dapat melengkapi deskripsi/logo.
10. Logo wajib tersedia sebelum status Ongoing atau Published.
11. Status operasional dan status publikasi tetap terpisah.

**Acceptance:** refresh tidak membuat Proker duplikat; hanya Kakom membuat Proker; tidak ada approval Admin/Kabid/Top Management untuk pembuatan Draft.

## 10.23.7 Roster, anggota nonkader, dan Manager

**Akun:** DEMO-08, DEMO-04, DEMO-03; **Screen:** WRK-06 → WRK-07 → PER-07.

1. Kakom/Manager berizin membuka Tim Pelaksana.
2. Tambahkan anggota dengan nama, NIM bila ada, jabatan kepanitiaan, level Member/Manager, status, tanggal mulai.
3. Anggota boleh nonkader atau belum mempunyai akun.
4. Jika NIM cocok dengan kader verified, record roster dapat ditautkan; jika tidak, tetap menjadi record roster nonkader.
5. Hanya Kakom dapat menetapkan atau mencabut Manager.
6. Manager harus mempunyai akun aktif dan kader verified.
7. Anggota biasa DEMO-03 membuka PER-07 dan hanya melihat record dirinya.
8. Anggota biasa tidak dapat melihat roster lengkap, menambah anggota, mengubah progres, atau mengelola keuangan.

**Acceptance:** jabatan kepanitiaan bukan permission Manager; rejoin membuat periode baru pada identitas roster yang sama.

## 10.23.8 Task Board dan progres naratif

**Akun:** DEMO-04/DEMO-26; **Screen:** WRK-08.

1. Pengelola Proker membuka Tugas & Progres.
2. Task Board menampilkan To Do, In Progress, Blocked, Done.
3. Tambah task dengan judul, deskripsi, tanggal, status awal, lampiran opsional.
4. Drag task antar kolom; simpan status baru dan histori.
5. Tidak ada PIC/assignee individual.
6. Tambah catatan capaian, kendala, dan rencana selanjutnya.
7. Kakom/Kabid/pimpinan melihat proyeksi sesuai scope.
8. Progres Kompartemen dicatat terpisah dari progres Proker.
9. Tidak ada progress bar/persentase.

## 10.23.9 Kalender dan pembuatan agenda satu pintu

**Akun:** Organizer/Kakom/Manager; **Screen:** CAL-01/CAL-02/CAL-04/EVT-03/EVT-04.

1. Pengguna membuka Agenda & Kalender utama atau shortcut Buat Agenda dari Workspace.
2. Semua entry point membuka satu `AgendaForm` CAL-04.
3. Jika berasal dari Workspace Kompartemen, Kompartemen otomatis terisi.
4. Jika berasal dari Workspace Proker, Proker otomatis terisi.
5. Isi judul, kategori, tanggal/jam mulai-selesai, lokasi, deskripsi, owner otomatis, visibilitas.
6. Validasi tanggal dan jam; tampilkan warning jika bentrok, tetapi jangan memblokir penyimpanan hanya karena waktu/lokasi sama.
7. Simpan sebagai draft atau publish sesuai permission.
8. Event yang sama muncul pada CAL-01, CAL-02, EVT-02/EVT-04 dan halaman publik jika Published.
9. EVT-03 hanya shortcut/alias ke form yang sama.
10. Workspace hanya menampilkan agenda terkait; ticketing tetap melalui EVT.

**Acceptance:** tidak ada agenda ganda; satu event object menjadi sumber seluruh tampilan.

## 10.23.10 Pengajuan surat langsung ke Sekum

**Akun:** DEMO-06, DEMO-08, DEMO-04, DEMO-13; **Screen:** COR-03 → COR-01/COR-02 → COR-04 → COR-05/COR-06/COR-07.

1. Pengurus/Staff dengan `correspondence:create` membuka Form Pengajuan Surat.
2. Identitas pengaju dan unit terisi otomatis.
3. Isi judul bebas, tujuan/keperluan, routing Surat Umum atau Untuk Ditmawa, deskripsi, URL dokumen, keterangan.
4. Simpan Draft atau Ajukan Surat.
5. Pengajuan masuk ke Central Inbox Sekum lintas unit.
6. Sekum membuka COR-04; tab Informasi, Dokumen, Checklist, Catatan, Riwayat.
7. Sekum meminta revisi atau menyelesaikan.
8. Jika revisi, pemohon memperbaiki pengajuan yang sama dan submit ulang.
9. Jika selesai, nomor surat dibuat otomatis dan unik di COR-05.
10. Jika Untuk Ditmawa, lanjutkan tracking pada COR-06; status internal selesai tidak sama dengan status Ditmawa selesai.
11. Sekum dapat reopen surat selesai dengan alasan; role lain tidak dapat reopen.

**Acceptance:** Staff berizin tidak memerlukan approval tambahan Kakom; hanya Sekum yang reopen.

## 10.23.11 Pengajuan dana langsung ke Bendum

**Akun:** DEMO-07, DEMO-08, DEMO-04, DEMO-14; **Screen:** FIN-05 → FIN-04 → FIN-06 → FIN-07 → FIN-08/FIN-10.

1. Staff/pengurus berizin membuka Form Pengajuan Dana.
2. Unit pengaju terisi otomatis; pilih Proker terkait bila ada.
3. Isi tujuan, item biaya, nominal, dokumen/URL, tanggal, catatan.
4. Submit langsung ke Bendum; tidak ada approval tambahan Kakom.
5. Bendum membuka FIN-06, memeriksa, lalu approve/reject atau meminta revisi sesuai status.
6. Jika approved, nominal disetujui menjadi batas maksimal pencairan.
7. Bendum mencatat satu atau beberapa termin di FIN-07.
8. Unit penerima mengonfirmasi setiap termin.
9. Status settled hanya jika semua termin dan kewajiban selesai.
10. FIN-08 dan FIN-10 memperbarui data dari transaksi sumber.

**Acceptance:** Staff tidak dapat approve/disburse; Top Management monitoring saja; total pencairan tidak melebihi approved amount.

## 10.23.12 Pembelian tiket berbayar

**Aktor:** pengunjung; **Screen:** PUB-11 → PUB-12 → TKT-01 → TKT-02 → TKT-03 → TKT-04 → EVT-07 → TKT-08.

1. Pengunjung memilih agenda Published.
2. Pilih satu jenis tiket pada TKT-01.
3. Isi enam field peserta pada TKT-02.
4. Klik Bayar Sekarang pada TKT-03.
5. Sistem membuat reservation dan mengurangi kuota tersedia selama 180 detik.
6. Tampilkan satu QRIS demo milik agenda dan nominal snapshot.
7. Peserta mengunggah bukti demo sebelum expiry.
8. Jika proof disubmit tepat waktu, status menjadi Pending Verification dan kuota tetap tertahan tanpa timeout verifikasi otomatis.
9. Organizer yang ditugaskan memeriksa di EVT-07.
10. Jika Approved, ticket issued; email outbox demo dibuat; TKT-04 menampilkan status.
11. Peserta membuka TKT-08 untuk melihat/print tiket dan barcode demo.
12. Jika Rejected, kuota dilepas dan status/alasan ditampilkan.
13. Tidak ada refund atau pembayaran sungguhan.

## 10.23.13 Pendaftaran tiket gratis

**Screen:** PUB-11 → PUB-12 → TKT-02 → TKT-04 → TKT-08.

1. Peserta memilih agenda gratis.
2. Isi enam field TKT-02.
3. Sistem memvalidasi dan menerbitkan tiket demo sesuai konfigurasi agenda.
4. TKT-04 menampilkan Confirmed/Issued.
5. TKT-08 menampilkan tiket/QR demo.
6. Tidak ada QRIS, upload bukti, atau payment verification.

## 10.23.14 Cek status tiket dengan NIM dan OTP

**Screen:** TKT-05 → TKT-06 → TKT-07 → TKT-08.

1. Peserta membuka Cek Status Tiket.
2. Input NIM saja di TKT-05.
3. Klik Minta OTP; Demo Control Center memperlihatkan kode uji.
4. Masukkan OTP di TKT-06.
5. Jika valid, TKT-07 menampilkan hanya tiket milik identitas yang terverifikasi.
6. Pilih tiket untuk membuka TKT-08.
7. OTP salah/expired/cooldown/locked menampilkan state sesuai.
8. Respons sebelum verifikasi tidak membocorkan keberadaan tiket.

## 10.23.15 Check-in tiket

**Akun:** DEMO-16; **Screen:** ATT-01 → ATT-02 → ATT-03/ATT-04 → PER-09.

1. Petugas membuka event assignment yang benar.
2. ATT-01 menampilkan total registrasi valid, issued, hadir, belum hadir, failed scan.
3. Buka scanner ATT-02 dan scan token demo.
4. Validasi event, token, status tiket, dan apakah sudah digunakan.
5. Jika valid, simpan check-in dan tampilkan sukses.
6. Jika token salah, event lain, revoked, expired, atau sudah digunakan, tolak dengan alasan.
7. Jika kamera tidak tersedia, petugas berizin memakai input kode manual.
8. ATT-03 dan ATT-01 diperbarui.
9. Jika identitas kader terverifikasi, PER-09/riwayat kader diperbarui.
10. Jangan menjanjikan offline sync otomatis.

## 10.23.16 Bisnis kader

**Akun:** DEMO-02; **Screen:** PER-10 → PER-11 → DIR-04/DIR-05 → PUB-18/PUB-19.

1. Kader membuka Bisnis Saya.
2. Tambah bisnis melalui PER-11; isi profil, kategori, foto, produk/layanan, kontak dan media sosial.
3. Simpan draft atau submit review.
4. Reviewer membuka DIR-04/DIR-05.
5. Reviewer dapat request revision, reject, atau approve.
6. Publish adalah tindakan terpisah setelah approved.
7. Pemilik melihat status dan catatan revisi yang boleh dilihat.
8. Public Website hanya menampilkan snapshot Published; reviewer note dan kontak privat tidak tampil.

## 10.23.17 Media Partner publik dan tracking code

**Aktor:** publik tanpa login; **Screen:** PUB-15 → PUB-16 → receipt tracking → PUB-17 → CMS-08/CMS-09/CMS-11.

1. Pengunjung membuka Informasi Media Partner.
2. Isi form pengajuan tanpa login.
3. Jika paket berbayar, tampilkan instruksi pembayaran QRIS demo dan bukti; jika gratis, lewati pembayaran.
4. Submit membuat `submission_id` dan kode tracking unik, misalnya `MP-DEMO-0007`.
5. Receipt menampilkan kode dengan tombol salin/simpan.
6. Pemohon mengecek status menggunakan kode pada PUB-17.
7. Medkom memeriksa bukti pembayaran (jika paid) dan isi pengajuan.
8. Status approved tidak otomatis berarti Published.
9. Medkom melakukan publikasi manual di CMS-11.
10. `requested_publish_date` hanya informasi; tidak ada scheduler otomatis.
11. Bendum hanya melihat agregat pendapatan, bukan bukti/PII.

## 10.23.18 Artikel dan prestasi kader

**Screen artikel:** CMS-04 → CMS-05 → preview → Publisher → PUB-13/PUB-14.  
**Screen prestasi:** CMS-06 → CMS-07 → review → approve → publish → PUB-20/PUB-21.

- Content Creator membuat/mengedit draft dan preview.
- Publisher melakukan pemeriksaan dan publish sesuai permission.
- Pengguna dengan kedua permission dapat membuat dan memublikasikan sesuai scope.
- Prestasi dapat melibatkan beberapa kader.
- Konten Draft/Review/Revision tidak muncul pada halaman publik.
- Homepage menampilkan empat prestasi Published terbaru.

## 10.23.19 Kotak Suara privat

**Screen:** PUB-22 → receipt → CMS-12 → CMS-13.

1. Pengunjung mengisi kategori, judul, isi, identitas opsional, consent.
2. Submit membuat receipt.
3. Masukan masuk ke antrean privat.
4. Operator berizin melakukan triage, routing ke unit, update, close.
5. Pimpinan hanya monitoring read-only sesuai scope.
6. Tidak ada daftar aspirasi publik, komentar publik, atau publikasi otomatis.

## 10.23.20 LPJ dan penutupan Proker

**Akun:** DEMO-04/DEMO-08/DEMO-24; **Screen:** DOC-04 → DOC-05 → WRK-10.

1. Pengelola Proker membuka LPJ.
2. Isi tujuh bagian; data agenda, kehadiran, dan keuangan ditarik dari sumber modul.
3. Simpan Draft atau Submit.
4. Reviewer yang ditugaskan membuka LPJ, approve atau request revision.
5. Pengelola memperbaiki LPJ yang sama.
6. Setelah Approved, Kakom membuka checklist penutupan.
7. Sistem memeriksa surat wajib selesai dan seluruh disbursement Settled.
8. Jika ada blocker, tampilkan alasan dan link ke modul sumber.
9. Hanya Kakom menutup Proker.
10. Setelah ditutup, akses operasional berakhir; roster/progres/dokumen/keuangan/histori tetap read-only bagi pihak berwenang.

## 10.23.21 Notification dan Activity History

- Aksi domain penting membuat satu notification dan satu activity history yang terhubung dengan source entity.
- PER-12 menampilkan proyeksi personal; SYS-03 menampilkan Notification Center bersama.
- ORG-05 menampilkan aktivitas organisasi dan tindak lanjut sesuai scope.
- SYS-04 menampilkan formal approval tasks dan deep-link ke modul sumber.
- ADM-12 hanya audit administratif; SYS-05 adalah activity history umum.
- Mark Read dari PER-12 atau SYS-03 memperbarui record notifikasi yang sama.



# 11. Dummy Data, Seed Data, dan Relasi Antarmodul

## 11.1 Prinsip seed data

- Semua data bersifat fiktif.
- Jangan menyalin data pribadi orang nyata.
- Jangan menggunakan nomor telepon/email/NIM nyata.
- Semua record memiliki ID deterministik.
- Data saling terhubung melalui ID, bukan menyalin record berbeda di setiap halaman.
- Seed harus mencakup status normal, pending, revision, rejected, completed, archived, expired, dan error.
- Data contoh bukan statistik organisasi yang sebenarnya.
- Jika data resmi belum tersedia, tampilkan placeholder atau label data demo.

## 11.2 Struktur data demo minimum

| Domain | Entitas simulasi |
|---|---|
| Identity | users, profiles, account_status, demo_sessions |
| Academic | faculties, study_programs |
| Cadre | cadres, cadre_verifications, cadre_history |
| Organization | cabinets, fields, compartments, positions, assignments |
| Authorization | roles, permissions, role_permissions, user_roles |
| Workspace | projects, project_members, manager_assignments, project_progress, tasks |
| Calendar | calendar_events, meetings, meeting_notes |
| Correspondence | correspondence_requests, checklist_items, review_notes, letter_numbers, dispatch_history |
| Finance | finance_accounts, journals, transactions, fund_requests, disbursements, receipts |
| Event | events, organizers, ticket_types, registrations, reservations, payment_proofs, tickets, checkins |
| Documents | documents, document_versions, lpjs, lpj_reviews |
| Directory | businesses, business_reviews, companies, partnerships |
| CMS | articles, homepage_sections, achievements, media_assets |
| Medpart | medpart_submissions, medpart_packages, medpart_payment_reviews, medpart_publications |
| Feedback | feedback_submissions, feedback_actions |
| System | notifications, email_outbox, activity_history, audit_events |

Nama entitas di atas adalah struktur mock data frontend, bukan instruksi membuat tabel database baru.

## 11.3 Fakultas dan program studi

| Kode | Fakultas |
|---|---|
| FIT | Fakultas Ilmu Terapan |
| FKS | Fakultas Komunikasi Sosial |
| FEB | Fakultas Ekonomi Bisnis |
| FIK | Fakultas Industri Kreatif |
| FK | Fakultas Kedokteran |
| FTE | Fakultas Teknik Elektro |
| FIF | Fakultas Informatika |
| FTI | Fakultas Teknik Industri |

Master program studi resmi belum ditetapkan dalam sumber yang tersedia. Untuk menguji dependent dropdown, gunakan label `Program Studi Demo` atau placeholder yang secara eksplisit diberi tanda **data simulasi**, bukan mengarang nama prodi resmi.

## 11.4 Minimum dataset yang disarankan

Jumlah berikut adalah rekomendasi seed untuk menguji UI, bukan jumlah data organisasi yang sebenarnya.

| Data | Minimum demo |
|---|---:|
| Akun demo | 28 akun preset |
| Kabinet | 2 (1 aktif demo, 1 arsip demo) |
| Bidang | 4 fixture demo |
| Kompartemen | 8 fixture demo |
| Proker | 8–12 dengan status bervariasi |
| Roster | 20–30 record demo, termasuk kader/nonkader |
| Task | 12–20 lintas empat kolom |
| Agenda/Event | 8–10, gratis/berbayar/published/closed |
| Ticket type | 2–3 per agenda berbayar |
| Registrasi | 15–20 |
| Payment proof | Pending, approved, rejected |
| Ticket | Issued, checked-in, belum check-in |
| Surat | 8–10 dengan status bervariasi |
| Fund request | 6–8 dengan status bervariasi |
| Disbursement | Beberapa request multi-termin |
| Dokumen/LPJ | Draft, submitted, revision, approved |
| Bisnis | Draft, review, revision, published |
| Perusahaan/mitra | 5–8 fixture |
| Artikel | 6–8 fixture |
| Prestasi | 6–8 fixture, satu prestasi boleh multi-kader |
| Medpart | 5–6 fixture dengan status berbeda |
| Feedback | 4–6 fixture privat |
| Notifikasi | 15–20 read/unread |
| Activity history | 20–30 record |

Jangan menafsirkan fixture di atas sebagai data kabinet resmi. Semua nama, tanggal, jumlah, nominal, kontak, dan dokumen harus jelas bertanda DEMO.

## 11.5 Relasi wajib

- Cabinet → Field → Compartment → Project.
- Profile → Cadre (jika terverifikasi).
- User → Role/Permission → Assignment → Scope.
- Project → Project Members → Manager Assignments.
- Project → Tasks/Progress/Meeting/Correspondence/Fund Request/Document/LPJ.
- Event → Ticket Types → Registration → Reservation → Payment → Ticket → Check-in.
- Event → Calendar Event.
- Ticket Payment → aggregate finance reporting; Bendum hanya membaca agregat yang diizinkan.
- Business → Owner Profile/Cadre → Review → Public Snapshot.
- Medpart → Package → Payment Review → Submission Review → Manual Publication.
- Article/Achievement → CMS → Public Website.
- Feedback → Private Operator Queue → Action History.
- Domain action → Notification → Activity History.

## 11.6 Data per halaman

Setiap baris Screen ID pada Bagian 9 mendefinisikan data utama yang wajib muncul. AI Agent wajib memastikan halaman tidak hanya menampilkan nama entitas, tetapi juga status yang relevan, relasi induk, metadata waktu, owner/pemilik jika boleh dilihat, tindakan yang tersedia, filter/search bila relevan, empty state, serta pagination/sorting untuk daftar panjang.

---

## 11.7 Seed Fixture Catalog — Data Dummy Konkret dan Saling Terhubung

Seluruh record di bawah adalah contoh fiktif untuk simulasi. Semua ID deterministik dan harus dipakai ulang lintas screen. Label `DEMO` wajib terlihat pada aplikasi. Tanggal dan nominal adalah data uji, bukan informasi resmi organisasi.

### 11.7.1 Identitas kabinet dan struktur

| Fixture ID | Nama | Parent | Status | Data utama |
|---|---|---|---|---|
| `cab-arthakarsa-2627` | ARTHAKARSA 2026/2027 | — | active | Periode 2026–2027; kabinet aktif demo |
| `cab-demo-2526` | Kabinet Contoh 2025/2026 | — | archived | Periode 2025–2026; arsip demo |
| `field-demo-01` | Bidang Demo A | `cab-arthakarsa-2627` | active | Kepala Bidang: DEMO-09 |
| `field-demo-02` | Bidang Demo B | `cab-arthakarsa-2627` | active | Kepala Bidang placeholder |
| `field-demo-03` | Bidang Demo C | `cab-arthakarsa-2627` | active | Kepala Bidang placeholder |
| `field-demo-04` | Bidang Demo D | `cab-arthakarsa-2627` | active | Kepala Bidang placeholder |
| `comp-demo-01` | Kompartemen Demo A1 | `field-demo-01` | active | Kakom: DEMO-08 |
| `comp-demo-02` | Kompartemen Demo A2 | `field-demo-01` | active | Staff demo |
| `comp-demo-03` | Kompartemen Demo B1 | `field-demo-02` | active | Manager Proker demo |
| `comp-demo-04` | Kompartemen Demo B2 | `field-demo-02` | active | Proker publik demo |
| `comp-demo-05` | Kompartemen Demo C1 | `field-demo-03` | active | Proker completed demo |
| `comp-demo-06` | Kompartemen Demo C2 | `field-demo-03` | active | Staff demo |
| `comp-demo-07` | Kompartemen Demo D1 | `field-demo-04` | active | Proker archived demo |
| `comp-demo-08` | Kompartemen Demo D2 | `field-demo-04` | active | Proker cancelled demo |

Nama Bidang/Kompartemen di atas adalah label fixture. Jangan menggantinya dengan nama unit resmi sebelum pemilik proyek menyediakan master struktur final.

### 11.7.2 Program Kerja dan roster

| Project ID | Nama Proker | Kompartemen | Status operasional | Status publikasi | Manager | Tanggal demo |
|---|---|---|---|---|---|---|
| `proj-business-expo` | Business Expo Demo | `comp-demo-01` | ongoing | published | DEMO-04 dan DEMO-26 | Main event 15 Desember 2026 |
| `proj-company-visit` | Company Visit Demo | `comp-demo-01` | planned | draft | Belum ditetapkan | Main event 20 Desember 2026 |
| `proj-cadre-training` | Cadre Training Demo | `comp-demo-02` | draft | unpublished | Belum ditetapkan | Main event 10 Januari 2027 |
| `proj-workshop` | Workshop Kewirausahaan Demo | `comp-demo-03` | ongoing | published | DEMO-04 dan DEMO-26 | Main event 5 Desember 2026 |
| `proj-campus-day` | Campus Business Day Demo | `comp-demo-04` | planned | published | DEMO-04 | Main event 12 Desember 2026 |
| `proj-collab-festival` | Collaboration Festival Demo | `comp-demo-05` | completed | published | DEMO-26 (assignment historis) | Main event 1 November 2026 |
| `proj-market-day` | Market Day Demo | `comp-demo-07` | archived | published | Mantan Manager DEMO | Main event 1 Oktober 2026 |
| `proj-leadership-class` | Leadership Class Demo | `comp-demo-08` | cancelled | unpublished | — | Main event dibatalkan |

**Roster fixture minimum 24 record:**
- `member-demo-001` DEMO-04, Manager, kader verified, Business Expo.
- `member-demo-002` DEMO-26, Manager, kader verified, Business Expo.
- `member-demo-003` DEMO-03, Member, nonkader, Business Expo.
- `member-demo-004` Anggota Demo 04, Member, nonkader, belum memiliki akun, Business Expo.
- `member-demo-005` DEMO-04, Manager, Workshop.
- `member-demo-006` DEMO-26, Manager, Workshop.
- `member-demo-007` sampai `member-demo-024` adalah anggota demo tambahan yang tersebar di delapan Proker dengan kombinasi kader/nonkader, aktif/ended, dan rejoin.
- Setiap roster record wajib menyimpan `project_id`, nama, NIM placeholder bila tersedia, jabatan kepanitiaan, level akses Member/Manager, status, tanggal mulai, tanggal akhir, dan histori periode.
- Satu orang yang keluar lalu masuk kembali memakai identitas roster yang sama dengan periode baru; jangan menggandakan hitungan orang hanya karena rejoin.

**Task Board fixture minimum 12 task:**
- 3 `To Do`, 3 `In Progress`, 3 `Blocked`, 3 `Done`.
- Setiap task mempunyai `task_id`, `project_id`, judul, deskripsi, status, tanggal dibuat/diubah, histori perubahan, dan lampiran opsional.
- Tidak ada field `assignee`, `PIC`, atau individual owner pada Task Board.

### 11.7.3 Agenda, tiket, dan kehadiran

| Event ID | Nama Agenda | Jenis | Status event | Status pendaftaran | Relasi |
|---|---|---|---|---|---|
| `evt-business-expo` | Business Expo Demo | Berbayar | published | open | `proj-business-expo` |
| `evt-workshop` | Workshop Kewirausahaan Demo | Gratis | published | open | `proj-workshop` |
| `evt-company-visit` | Company Visit Demo | Berbayar | draft | not_open | `proj-company-visit` |
| `evt-pleno` | Pleno Kompartemen Demo | Internal | scheduled | internal_only | `comp-demo-01` |
| `evt-market-day` | Market Day Demo | Berbayar | completed | closed | `proj-market-day` |
| `evt-collab` | Collaboration Festival Demo | Gratis | completed | closed | `proj-collab-festival` |
| `evt-payment-pending` | Seminar Bisnis Demo | Berbayar | published | open | `proj-campus-day` |
| `evt-soldout` | Mini Expo Demo | Berbayar | published | soldout | `proj-business-expo` |
| `evt-cancelled` | Leadership Class Demo | Gratis | cancelled | closed | `proj-leadership-class` |

**Ticket type fixture:**
- `tt-business-regular`: Business Expo, Regular, Rp50.000, kuota 100.
- `tt-business-vip`: Business Expo, VIP, Rp100.000, kuota 20.
- `tt-workshop-free`: Workshop, Gratis, Rp0, kuota 80.
- `tt-company-early`: Company Visit, Early Bird, Rp35.000, kuota 30.
- `tt-company-regular`: Company Visit, Regular, Rp50.000, kuota 50.
- `tt-payment-regular`: Seminar Bisnis, Regular, Rp25.000, kuota 60.
- `tt-soldout-regular`: Mini Expo, Regular, Rp40.000, kuota 10; seluruh kuota terjual/tertahan.
- Satu agenda berbayar mempunyai tepat satu QRIS demo pada tingkat agenda; bukan satu QRIS per ticket type.

**Registration/ticket fixture minimum 18 record:**
- `reg-demo-001`: DEMO-01, Business Expo Regular, payment approved, ticket issued, belum check-in.
- `reg-demo-002`: DEMO-02, Business Expo VIP, pending verification, belum issued.
- `reg-demo-003`: DEMO-03, Workshop Gratis, confirmed/issued, belum check-in.
- `reg-demo-004`: peserta demo nonkader, Business Expo Regular, issued, checked-in.
- `reg-demo-005`: peserta demo, Seminar Bisnis, payment rejected.
- `reg-demo-006`: peserta demo, Company Visit, reservation expired.
- `reg-demo-007` sampai `reg-demo-018`: variasikan status registered, reserved, pending_verification, approved, rejected, expired, issued, checked_in, dan absent.
- Setiap ticket menyimpan token unik `DEMO-TKT-0001` dan seterusnya. Token bukan QR produksi.
- Data peserta menggunakan nama demo, NIM `DEMO-2026-xxx`, email `pesertaNN@example.test`, telepon placeholder, fakultas/program studi Demo.

### 11.7.4 Persuratan dan keuangan

| ID | Modul | Contoh data | Status |
|---|---|---|---|
| `corr-demo-001` | Surat Umum | Pengajuan DEMO-06 dari `comp-demo-01` | submitted |
| `corr-demo-002` | Surat Ditmawa | Pengajuan dari `proj-business-expo` | revision |
| `corr-demo-003` | Surat Umum | Nomor surat demo `ORG/DEMO/001/XI/2026` | completed |
| `corr-demo-004` | Surat Ditmawa | Selesai internal, menunggu tindak lanjut | dispatch_pending |
| `corr-demo-005` | Arsip surat | Surat periode kabinet arsip | archived |
| `corr-demo-006` | Draft surat | Pengajuan belum dikirim | draft |
| `fund-demo-001` | Pengajuan dana | Rp1.500.000 dari `comp-demo-01` | submitted |
| `fund-demo-002` | Pengajuan dana | Rp2.000.000 dari `proj-business-expo` | approved |
| `fund-demo-003` | Pengajuan dana | Rp750.000 dari `proj-workshop` | revision |
| `fund-demo-004` | Pengajuan dana | Rp500.000 dari `comp-demo-02` | rejected |
| `fund-demo-005` | Pengajuan dana | Rp3.000.000, dua termin | disbursed_partial |
| `fund-demo-006` | Pengajuan dana | Rp1.200.000 seluruh termin diterima | settled |

Finance transaction fixture minimal 12 record dengan kombinasi pemasukan eksternal, pengeluaran, transfer internal, reversal demo, draft, dan posted. Transfer internal wajib menampilkan sisi pengirim dan penerima tetapi tidak dihitung sebagai pendapatan baru organisasi. Jurnal posted tidak dapat diedit; koreksi memakai record reversal demo bila skenario membutuhkan.

### 11.7.5 Dokumen dan LPJ

- `doc-demo-001`: Proposal Business Expo, URL demo, versi 1.
- `doc-demo-002`: Surat permohonan, URL demo, versi 2.
- `doc-demo-003`: Poster Workshop, media placeholder.
- `doc-demo-004`: Bukti transaksi demo.
- `lpj-demo-001`: LPJ Cadre Training, draft.
- `lpj-demo-002`: LPJ Business Expo, revision.
- `lpj-demo-003`: LPJ Collaboration Festival, approved.
- `lpj-demo-004`: LPJ Market Day, archived.
- Dokumen mempunyai `document_id`, judul, kategori, owner, source URL/file metadata, version, created_at, updated_at, status, dan relasi modul.
- LPJ mempunyai tujuh bagian sesuai DOC-05. Ringkasan keuangan dan kehadiran mengambil data dari transaksi/attendance yang sama; jangan menggandakan angka.

### 11.7.6 Bisnis, perusahaan, artikel, prestasi

**Bisnis kader:**
- `business-demo-001`: Dapur Kreasi Demo — draft.
- `business-demo-002`: Karya Digital Demo — review.
- `business-demo-003`: Snack Corner Demo — needs_revision.
- `business-demo-004`: Apparel Kampus Demo — approved tetapi belum published.
- `business-demo-005`: Edukasi Kreatif Demo — published.
- Setiap bisnis terkait satu owner cadre profile; kontak publik hanya tampil jika disetujui.

**Perusahaan/mitra:**
- `company-demo-001`: PT Contoh Mitra Nusantara.
- `company-demo-002`: CV Mitra Kampus Demo.
- `company-demo-003`: Brand Teknologi Demo.
- `company-demo-004`: Media Partner Demo.
- `company-demo-005`: Sponsor Kegiatan Demo.
- Setiap company mempunyai kategori, industri, kontak resmi, PIC privat, status relasi, tanggal pembaruan, dan histori interaksi. PIC privat tidak tampil kepada semua pengurus.

**Artikel dan prestasi:**
- 6 artikel: 2 Published, 2 Draft, 1 Archived, 1 Review.
- 6 prestasi: 3 Published, 1 Review, 1 Revision, 1 Draft.
- `achievement-demo-001` harus terhubung dengan dua kader untuk menguji prestasi multi-kader.
- Homepage menampilkan tepat empat prestasi Published terbaru berdasarkan `published_at`, bukan empat baris yang disalin manual.

### 11.7.7 Media Partner, Kotak Suara, notifikasi, dan histori

**Media Partner:**
- `medpart-demo-001`, tracking `MP-DEMO-0001`: submitted, gratis.
- `medpart-demo-002`, tracking `MP-DEMO-0002`: payment_pending, berbayar.
- `medpart-demo-003`, tracking `MP-DEMO-0003`: approved, belum published.
- `medpart-demo-004`, tracking `MP-DEMO-0004`: published manual.
- `medpart-demo-005`, tracking `MP-DEMO-0005`: revision.
- `medpart-demo-006`, tracking `MP-DEMO-0006`: rejected.
- Kode tracking unik dibuat saat submit; pemohon harus melihat kode pada receipt. Tanggal publikasi diminta bukan scheduler.

**Kotak Suara:**
- `feedback-demo-001`: submitted.
- `feedback-demo-002`: under_review.
- `feedback-demo-003`: routed_to_unit.
- `feedback-demo-004`: closed.
- Isi dan identitas pengirim bersifat privat; hanya operator/pimpinan sesuai scope yang dapat membuka.

**Sistem:**
- Minimal 20 notification records dengan kategori correspondence, finance, event, task, LPJ, cadre, CMS; campurkan unread/read.
- Minimal 30 activity history records yang terhubung ke entitas nyata di seed.
- Minimal 20 admin audit events yang hanya dapat dilihat DEMO-25.
- Email outbox minimal 8 records: queued, sent, failed, retry_scheduled. Tidak ada email sungguhan.
- Error fixture minimal 1 record untuk SYS-09 dengan pesan aman dan tanpa stack trace.

### 11.7.8 Mapping fixture ke halaman

| Kelompok Screen | Fixture utama |
|---|---|
| PUB-01 sampai PUB-10 | `cab-arthakarsa-2627`, fields, compartments, projects Published, achievements Published, businesses Published |
| PUB-11 sampai PUB-14 | Published events, articles, event schedules, article bodies |
| PUB-15 sampai PUB-17 | Medpart packages, `medpart-demo-001..006`, tracking codes |
| PUB-18 sampai PUB-21 | `business-demo-005`, achievement fixtures |
| PUB-22 | `feedback-demo` receipt scenario |
| TKT-01 sampai TKT-08 | `evt-*`, `tt-*`, `reg-demo-*`, reservations, payment proofs, tickets |
| AUTH-01 sampai AUTH-06 | DEMO-01 sampai DEMO-28, verification/reset/account status |
| PER-01 sampai PER-12 | current demo account profile, cadre, roster, tickets, attendance, business, notifications |
| ADM-01 sampai ADM-12 | cabinets, fields, compartments, positions, users, permissions, module config, audit |
| ORG-01 sampai ORG-06 | cabinet hierarchy, scoped activity, agenda, surat, finance aggregates, reports |
| WRK-01 sampai WRK-10 | three workspace contexts, projects, roster, manager assignments, tasks, progress, meetings |
| CAL-01 sampai CAL-04 | all calendar events and linked unit/project/event contexts |
| COR-01 sampai COR-07 | `corr-demo-001..006`, checklist, review notes, number, dispatch |
| FIN-01 sampai FIN-10 | `fund-demo-001..006`, transactions, tranches, receipts, revenue aggregates |
| EVT-01 sampai EVT-09 | event, ticket type, participant, payment proof, email outbox, sales |
| ATT-01 sampai ATT-04 | ticket token, registrations, check-ins, failed attempts |
| DOC-01 sampai DOC-06 | `doc-demo-001..004`, `lpj-demo-001..004`, versions |
| DIR-01 sampai DIR-08 | cadre, business, company, PIC, partnership history |
| CMS-01 sampai CMS-13 | homepage, media, articles, achievements, Medpart, feedback |
| SYS-01 sampai SYS-09 | notifications, approvals, activity, reports, search, error fixtures |

## 11.8 Status Dictionary Frontend Demo

Status berikut adalah semantic state untuk mock frontend. Status ini tidak boleh diklaim identik dengan enum backend. Gunakan status terpisah jika satu domain mempunyai dua lifecycle berbeda.

| Domain | Status demo | Makna / aturan |
|---|---|---|
| Account | `verification_pending` | Registrasi selesai, email belum diverifikasi; tidak boleh masuk area internal |
| Account | `active` | Akun dapat login sesuai permission |
| Account | `inactive` | Akun dinonaktifkan; tampilkan AUTH-06 |
| Account | `suspended` | Akun ditangguhkan; tampilkan AUTH-06 dan blokir session baru |
| Cadre | `not_linked` | Akun belum ditautkan ke record kader |
| Cadre | `candidate` | Ada kandidat kecocokan NIM, belum diverifikasi |
| Cadre | `pending_verification` | Menunggu verifikasi Admin/PSDM |
| Cadre | `verified` | Status kader terverifikasi |
| Cadre | `rejected` | Penautan/verifikasi ditolak |
| Assignment | `active` | Penugasan berlaku |
| Assignment | `ended` | Penugasan berakhir, histori tetap ada |
| Assignment | `revoked` | Penugasan dicabut |
| Workspace | `active` | Workspace dapat digunakan sesuai permission |
| Workspace | `closed` | Akses operasional dihentikan; histori tetap tersedia |
| Workspace | `archived` | Hanya pembacaan arsip sesuai permission |
| Project operational | `draft` | Draft internal |
| Project operational | `planned` | Direncanakan |
| Project operational | `ongoing` | Sedang berjalan |
| Project operational | `completed` | Pelaksanaan selesai |
| Project operational | `cancelled` | Dibatalkan |
| Project operational | `archived` | Arsip; tidak ada mutasi operasional |
| Project publication | `unpublished` | Tidak tampil di halaman publik |
| Project publication | `draft` | Konten publik masih disusun |
| Project publication | `review` | Menunggu pemeriksaan publikasi |
| Project publication | `published` | Tampil di Public Website jika visibility mengizinkan |
| Task | `To Do` | Belum dikerjakan |
| Task | `In Progress` | Sedang dikerjakan |
| Task | `Blocked` | Mengalami hambatan |
| Task | `Done` | Selesai |
| Correspondence | `draft` | Belum diajukan |
| Correspondence | `submitted` | Masuk ke Central Inbox Sekum |
| Correspondence | `revision` | Perlu diperbaiki pemohon |
| Correspondence | `completed` | Proses internal Sekum selesai |
| Correspondence | `reopened` | Dibuka kembali oleh Sekum dengan alasan |
| Correspondence | `archived` | Arsip read-only |
| Ditmawa dispatch | `not_required` | Routing Surat Umum |
| Ditmawa dispatch | `pending` | Menunggu pengiriman |
| Ditmawa dispatch | `sent` | Sudah dikirim |
| Ditmawa dispatch | `follow_up` | Perlu tindak lanjut |
| Ditmawa dispatch | `completed` | Tindak lanjut Ditmawa selesai |
| Fund request | `draft` | Belum diajukan |
| Fund request | `submitted` | Menunggu Bendum |
| Fund request | `revision` | Perlu perbaikan pemohon |
| Fund request | `approved` | Disetujui dengan approved amount |
| Fund request | `rejected` | Ditolak dengan alasan |
| Fund request | `disbursed_partial` | Sebagian termin dicairkan |
| Fund request | `settled` | Semua kewajiban/termin selesai |
| Disbursement | `pending` | Belum ditransfer |
| Disbursement | `transferred` | Transfer dicatat Bendum |
| Disbursement | `received` | Unit mengonfirmasi penerimaan |
| Disbursement | `disputed` | Ada ketidaksesuaian yang perlu ditinjau |
| Event | `draft` | Belum dipublikasikan |
| Event | `published` | Tampil di Public Website sesuai visibility |
| Event | `cancelled` | Dibatalkan |
| Event | `completed` | Sudah berlangsung |
| Registration | `registered` | Form peserta tercatat |
| Registration | `reserved` | Kuota tertahan selama 180 detik |
| Registration | `expired` | Reservasi habis sebelum bukti dikirim |
| Registration | `pending_verification` | Bukti dikirim dan menunggu Organizer |
| Registration | `approved` | Pembayaran disetujui |
| Registration | `rejected` | Pembayaran ditolak |
| Registration | `issued` | Tiket diterbitkan |
| Registration | `checked_in` | Tiket berhasil check-in |
| Registration | `absent` | Tidak hadir/check-in sampai event selesai |
| Payment | `not_required` | Agenda gratis/tanpa pembayaran |
| Payment | `unpaid` | Belum membayar |
| Payment | `pending_verification` | Bukti menunggu pemeriksaan |
| Payment | `approved` | Bukti disetujui |
| Payment | `rejected` | Bukti ditolak |
| Payment | `expired` | Reservasi expired sebelum bukti disubmit |
| Ticket type | `scheduled` | Belum masuk periode penjualan |
| Ticket type | `open` | Penjualan aktif |
| Ticket type | `closed` | Penjualan ditutup |
| Ticket type | `soldout` | Kuota habis/tertahan penuh |
| Medpart | `submitted` | Pengajuan diterima |
| Medpart | `payment_pending` | Menunggu bukti pembayaran |
| Medpart | `pending_review` | Menunggu pemeriksaan Medkom |
| Medpart | `revision` | Perlu perbaikan pemohon |
| Medpart | `approved` | Pengajuan disetujui tetapi belum tentu tayang |
| Medpart | `rejected` | Pengajuan ditolak |
| Medpart | `published` | Materi telah dipublikasikan manual |
| Business | `draft` | Disimpan pemilik |
| Business | `review` | Menunggu reviewer |
| Business | `revision` | Perlu perbaikan |
| Business | `approved` | Lolos pemeriksaan; belum tentu tayang |
| Business | `rejected` | Ditolak |
| Business | `published` | Tampil di direktori publik |
| Content | `draft` | Belum dikirim review/publish |
| Content | `review` | Menunggu review |
| Content | `revision` | Perlu perbaikan |
| Content | `approved` | Disetujui untuk publikasi |
| Content | `published` | Tampil publik |
| Content | `archived` | Tidak tampil publik, histori tetap ada |
| LPJ | `draft` | Sedang disusun |
| LPJ | `submitted` | Menunggu reviewer |
| LPJ | `revision` | Perlu perbaikan |
| LPJ | `approved` | Disetujui reviewer |
| LPJ | `rejected` | Ditolak dengan alasan |
| LPJ | `archived` | Arsip read-only |
| Feedback | `submitted` | Baru masuk |
| Feedback | `under_review` | Sedang ditinjau |
| Feedback | `routed_to_unit` | Diteruskan ke unit |
| Feedback | `in_progress` | Ditindaklanjuti |
| Feedback | `closed` | Ditutup |
| Notification | `unread` | Belum dibaca |
| Notification | `read` | Sudah dibaca |
| Email outbox | `queued` | Menunggu simulasi pengiriman |
| Email outbox | `sent` | Berhasil dalam simulasi |
| Email outbox | `failed` | Gagal dalam simulasi |
| Email outbox | `retry_scheduled` | Menunggu retry demo |

**Aturan pemisahan lifecycle:**
- Status operasional Proker tidak sama dengan status publikasi Proker.
- Status event tidak sama dengan status ticket type.
- Status registrasi tidak sama dengan status pembayaran dan status tiket.
- Status persetujuan bisnis tidak sama dengan status publikasi bisnis.
- Status persetujuan Medpart tidak sama dengan status publikasi Medpart.
- Status penyelesaian surat internal tidak sama dengan status dispatch Ditmawa.
- Status pengajuan dana tidak sama dengan status termin pencairan.
- Status LPJ tidak sama dengan status penutupan Proker.
- Tidak boleh mengubah satu status hanya karena status lain berubah, kecuali efek tersebut ditentukan oleh flow.

# 12. Mock Interaction Engine

## 12.1 Arsitektur simulasi

```text
UI Components
   ↓
Page/Feature Hooks
   ↓
Mock Services (domain-specific)
   ↓
Mock Repository / Central Store
   ↓
LocalStorage
```

Komponen UI tidak boleh mengubah data global secara langsung dengan membuat array dummy baru. Semua perubahan harus melewati mock service agar validasi, permission, histori, dan sinkronisasi konsisten.

## 12.2 Domain service

Pisahkan mock service sekurang-kurangnya:
- `authService`
- `profileService`
- `permissionService`
- `cabinetService`
- `organizationService`
- `workspaceService`
- `projectService`
- `rosterService`
- `taskService`
- `calendarService`
- `correspondenceService`
- `financeService`
- `eventService`
- `ticketService`
- `attendanceService`
- `documentService`
- `lpjService`
- `directoryService`
- `businessService`
- `cmsService`
- `medpartService`
- `feedbackService`
- `notificationService`
- `reportService`
- `auditService`

Nama service dapat disesuaikan dengan pola repository, tetapi capability tidak boleh hilang atau diduplikasi.

## 12.3 Perilaku tombol

| Aksi | Hasil wajib |
|---|---|
| Tambah | Membuat record baru dan menampilkan record tersebut di list terkait |
| Edit | Memperbarui record yang sama |
| Hapus/Arsip | Mengikuti aturan domain; data histori kritis tidak di-hard-delete |
| Approve | Mengubah status dan membuat histori/notifikasi |
| Reject | Mengubah status, menyimpan alasan, dan menjalankan efek domain terkait |
| Request Revision | Mengubah status ke revision dan memberi pemohon akses edit |
| Publish | Membuat data tampil pada halaman publik yang terkait |
| Unpublish | Menghilangkan dari proyeksi publik tanpa menghapus histori |
| Assign | Membuat assignment dengan scope |
| Revoke | Mengakhiri assignment dan memperbarui akses |
| Close Proker | Hanya Kakom setelah checklist lolos |
| Drag Task | Memindahkan task dan menyimpan status baru |
| Filter | Mengubah record yang terlihat |
| Search | Menyaring hasil sesuai kata kunci dan permission |
| Export | Menghasilkan file dari data yang memang boleh diakses |
| Mark Read | Memperbarui status notifikasi |
| Retry Email | Membuat attempt baru, tidak membuat tiket baru |
| Resend Ticket | Mengirim ulang tiket issued yang sama, bukan menerbitkan tiket baru |
| Reset Demo | Mengembalikan data ke seed awal setelah konfirmasi |

Tidak boleh ada tombol yang tidak melakukan apa-apa. Jika aksi belum tersedia karena permission atau status, tampilkan disabled state dengan alasan yang jelas.

## 12.4 Simulasi upload

- File picker boleh dipakai untuk menguji UI; file tidak diunggah ke server.
- Simpan metadata file (nama, tipe, ukuran, waktu, preview reference) pada LocalStorage.
- Gunakan object URL untuk preview sementara dan revoke saat tidak digunakan.
- Jangan menyimpan file besar/base64 ke LocalStorage.
- Poster/bukti pembayaran demo menerima JPG/JPEG/PNG/PDF sampai 5 MB.
- Foto/media demo menerima JPG/JPEG/PNG/WEBP sampai 5 MB.
- Sediakan placeholder asset untuk bukti pembayaran, poster, foto, dan dokumen demo.
- Jika file invalid, tampilkan error inline; jangan mengubah status record.
- File tidak diunggah ke server dan tidak boleh dianggap sebagai bukti transaksi nyata.

## 12.5 Simulasi waktu

- Countdown reservasi 180 detik berasal dari timestamp expiry yang disimpan pada record demo.
- Setelah refresh, hitung sisa waktu dari timestamp tersebut.
- Jika expiry tercapai tanpa proof submit, reservation menjadi expired.
- Jika proof valid sudah disubmit sebelum expiry, status pending verification tidak auto-expire.
- Clock browser hanya untuk simulasi; jangan menyebutnya server clock produksi.

## 12.6 Simulasi tiket dan scanner

- Buat token barcode/QR demo unik.
- QR hanya merepresentasikan ticket ID/token demo.
- Scanner menyediakan mode input manual dan pilihan sample code.
- Jika camera API/library tersedia dan sudah diizinkan proyek, kamera boleh menjadi enhancement; bukan syarat agar flow demo dapat diuji.
- Double scan harus ditolak.
- Check-in mengubah data yang sama pada ATT, EVT, PER, dan report yang relevan.

## 12.7 Simulasi email

- Setiap aksi yang seharusnya mengirim email membuat record `email_outbox`.
- Status: queued/sent/failed/retry_scheduled.
- UI menampilkan waktu, tujuan tersamarkan, tipe email, attempt, dan status.
- Retry tidak mengulangi transaksi domain yang sudah sukses.
- Tidak ada email sungguhan yang dikirim.

# 13. LocalStorage, Persistence, dan Cross-Module Synchronization

## 13.1 LocalStorage keys

Gunakan namespace dan versioning yang konsisten, misalnya:
- `hipmi-central-demo:v1.1:mock-store`
- `hipmi-central-demo:v1.1:session`
- `hipmi-central-demo:v1.1:preferences`

Nama final dapat mengikuti konvensi repository, tetapi wajib ada namespace proyek dan schema version.

## 13.2 Aturan persistence

- Seed hanya dibuat saat mock store belum tersedia.
- Refresh tidak mengembalikan data ke awal.
- Perubahan CRUD/status tersimpan.
- Session demo dapat dipulihkan sesuai setting demo.
- Password demo tidak perlu disimpan ulang pada session.
- LocalStorage tidak digunakan untuk menyimpan data sensitif sungguhan.
- Data file besar tidak disimpan sebagai base64.
- Gunakan versi schema mock store dan compatibility upgrade ringan untuk perubahan struktur data lokal; ini bukan migrasi database.
- Sediakan Reset Demo Data dengan konfirmasi.
- Sediakan logout yang menghapus session, bukan seluruh mock store.

## 13.3 Cross-module synchronization

Perubahan satu record harus memperbarui seluruh tampilan yang memakai record tersebut.

Contoh wajib:
1. Payment approved → ticket issued → PER-08 berubah → EVT-08 berubah → sales report berubah → email outbox bertambah → notification bertambah.
2. Check-in sukses → ATT-03 berubah → ATT-01 berubah → PER-09 berubah → statistik kehadiran berubah.
3. Surat direvisi → COR-02 berubah → COR-04 berubah → Action Center Sekum/pemohon berubah → notification bertambah.
4. Fund disbursed → FIN-07 berubah → FIN-08 berubah → FIN-01/FIN-10 berubah → activity history bertambah.
5. Artikel Published → CMS-04 berubah → PUB-13/PUB-14 berubah → homepage jika ditampilkan berubah.
6. Bisnis approved/published → PER-10 berubah → DIR-04/DIR-05 berubah → PUB-18/PUB-19 berubah.
7. Medpart dipublish manual → CMS-11 berubah → halaman publik terkait berubah; approval saja tidak cukup.
8. Proker ditutup Kakom → workspace operasional menjadi read-only/closed → Manager access berakhir → histori tetap tersedia.
9. Agenda disimpan melalui CAL-04 → CAL-01/CAL-02/EVT-02/EVT-04 memakai event object yang sama → EVT-03 hanya alias ke CAL-04 → tidak ada agenda ganda.
10. Medpart disubmit → submission ID dan tracking code dibuat → PUB-17 dapat membaca status yang sama → CMS-08/CMS-09 menampilkan record yang sama → CMS-11 membuat publication record hanya setelah publish manual.
11. Staff mengajukan surat → COR-02/COR-01 Sekum berubah → PER/SYS notification dan activity berubah; Staff tidak membuat salinan surat baru.
12. Staff mengajukan dana → FIN-04 Bendum berubah → approval/disbursement memperbarui FIN-06/FIN-07/FIN-08/FIN-10.
13. Perubahan status operasional Proker tidak otomatis mengubah status publikasi Proker; kedua state disimpan terpisah.
14. Mark Read pada PER-12 atau SYS-03 memperbarui notification record yang sama.
15. Assignment roster berubah → WRK-06, PER-07, PER-05/PER-06 dan monitoring sesuai scope diperbarui tanpa membocorkan roster anggota lain.
16. Approval LPJ → WRK-10 checklist berubah; hanya penutupan oleh Kakom mengakhiri akses operasional Proker.
17. Perubahan Company/PIC di DIR-06/DIR-07 memperbarui DIR-08; tampilan read-only pengurus tetap memakai record yang sama.

Jangan membuat data ganda untuk setiap halaman. Semua view harus membaca entity yang sama.

## 13.4 Reset dan seed scenarios

Reset harus meminta konfirmasi, menghapus mock store versi berjalan, menginisialisasi ulang seed, mengakhiri session jika diperlukan, menampilkan hasil reset, dan mengarahkan pengguna ke halaman demo yang aman.



---

# 14. Design System dan Visual Baseline

## 14.1 Sumber visual resmi terkunci

Visual resmi mengacu penuh pada `design.md` (Versi 1.0 — **Aurora Glass Editorial**). Segala ketentuan visual lama pada draf sebelumnya dibatalkan dan digantikan oleh `design.md`.

## 14.2 Arah visual Aurora Glass Editorial

- **Karakter:** Clean, premium, warm, layered, editorial, modern, glassmorphic.
- **Warna Utama:** Burgundy `#5A1722` (Primary) dan Dark Wine `#3D0F16` (Deep Primary).
- **Surface & Background:** White, Warm Ivory `#FDF7F2`, dan Blush Beige `#F2E4DC`.
- **Aksen & Detail:** Antique Gold `#E8B577`, Muted Copper `#AF7D66`, dan Dusty Mauve `#A07A8E`.
- **Signature Dekoratif:** Fine-line contour, flowing ribbon, arch, orbit, dan connected lines.
- **Glassmorphism:** Digunakan secara selektif pada floating navbar, dropdown/mega menu, hero callout, dan modal tertentu; tidak digunakan pada data-dense tables/form panjang.
- **Public Navbar:** Rounded floating glass capsule terinspirasi komposisi KPM.
- **Hero Beranda:** Komposisi Aurora (Warm Ivory/Blush gradient lembut, headline serif besar, copy ringkas, foto utama, floating glass callout, dan orbit line art).
- **Dashboard:** Terstruktur, data-first, sidebar Dark Wine `#3D0F16`, topbar glass/white, card family teratur.

## 14.3 Typography

| Peran | Typeface | Keterangan & Fallback |
|---|---|---|
| Display / Headline Editorial | ARTHAKARSA Serif Display / Serif Editorial | Fallback resmi menggunakan Google Fonts Serif (misal: `Playfair Display` / `Cormorant Garamond`, Georgia, serif) |
| UI, Body, Form, Label, Table, Navigation | Poppins | Menggunakan Google Fonts (`Poppins`, sans-serif: 400, 500, 600, 700) |

## 14.4 Color tokens & Surface

Mengacu ke token `design.md`:
- `brand-burgundy`: `#5A1722`
- `brand-dark-wine`: `#3D0F16`
- `brand-antique-gold`: `#E8B577`
- `brand-muted-copper`: `#AF7D66`
- `brand-warm-ivory`: `#FDF7F2`
- `neutral-white`: `#FFFFFF`
- `neutral-black`: `#171313`
- `neutral-muted`: `#6B6260`
- `neutral-border`: `#E9E1DC`
- `neutral-surface`: `#FAF8F6`
- `surface-blush`: `#F2E4DC`
- Semantic status (success, warning, error, info) wajib disertai label/ikon, bukan hanya warna.

## 14.5 Aturan integrasi visual halaman

- **Beranda:** Hero Aurora Glass Editorial (Warm Ivory/Blush), section berikutnya bervariasi dengan ritme editorial (white, blush, glass block, angled dark panel, footer dark wine).
- **Halaman Non-Beranda:** Section konten pertama bersih dan mudah dibaca (White/Ivory).
- **Dashboard & Workspace:** Mengutamakan keterbacaan data; tabel dan form menggunakan solid surface putih, bukan glass transparan.
- **Logo Master:** Logo HIPMI, wordmark Telkom University, dan logo ARTHAKARSA adalah aset berbeda; tidak boleh di-redraw, di-stretch, di-crop, atau di-recolor. Foto profil kosong menggunakan `siluet.png`.
- **Motion:** Menggunakan Framer Motion / Motion dengan durasi terukur dan wajib mematuhi `prefers-reduced-motion`.
- **Technology baseline:** Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.

---

# 15. UI States, Responsive, Accessibility, dan Error Handling

## 15.1 UI states wajib

| State | Perilaku |
|---|---|
| Initial | Tampilan awal sebelum data dimuat |
| Loading | Skeleton/loading tanpa layout shift |
| Empty | Pesan jelas dan CTA yang relevan |
| Populated | Data tampil sesuai scope |
| Validation Error | Error inline pada field |
| Server/Mock Error | Pesan gagal dan opsi retry jika aman |
| Pending | Menunggu proses/reviewer |
| Success | Konfirmasi perubahan yang benar-benar terjadi |
| Disabled | Aksi tidak tersedia dengan alasan |
| Unauthorized/Forbidden | Akses ditolak |
| Archived | Data historis/read-only |
| Expired | Aksi terkait expiry dinonaktifkan |
| Rejected | Status dan alasan penolakan |
| Revision | Tampilkan catatan yang harus diperbaiki |

State domain khusus seperti sold out, closed, suspended, pending verification, approved, dan checked-in harus disediakan bila relevan.

## 15.2 Responsive

Uji sekurang-kurangnya:
- 320 px.
- 375 px.
- 390 px.
- 768 px.
- 1024 px.
- 1280 px.
- 1440 px ke atas.

Aturan:
- Navbar desktop berubah menjadi drawer/accordion mobile.
- Sidebar private menjadi drawer.
- Table panjang berubah menjadi mobile card atau scroll yang terkontrol dengan label jelas.
- Form satu kolom di mobile.
- Modal dapat discroll tanpa clipping.
- CTA utama tetap mudah dijangkau.
- QRIS, timer, upload, dan status berada dalam urutan jelas.
- Scanner mempunyai fallback manual.
- Tidak boleh ada horizontal clipping yang tidak disengaja.

## 15.3 Accessibility

- Semua tombol dan link dapat digunakan dengan keyboard.
- Focus ring jelas.
- Label input eksplisit.
- Error dikaitkan dengan field terkait.
- Dialog memiliki focus management dan dapat ditutup dengan Escape bila aman.
- Icon-only button memiliki accessible label.
- Alt text untuk media informatif.
- Dekorasi murni diabaikan screen reader.
- Informasi tidak disampaikan hanya dengan warna.
- Reduced motion dihormati.
- Kontras harus diuji sebelum dinyatakan lulus.

## 15.4 Error handling

- Kegagalan satu widget tidak boleh merusak seluruh halaman.
- Tampilkan pesan yang bisa dipahami.
- Retry tidak boleh menggandakan transaksi.
- Form unsaved changes memberi konfirmasi sebelum navigasi.
- Deep link setelah refresh harus memulihkan halaman dan state yang benar.
- 403 tidak membocorkan record privat.
- 404 tidak mengonfirmasi keberadaan record privat.
- 500/unavailable menyediakan opsi kembali/coba lagi.

---

# 16. Route Registry dan Navigation Rules

## 16.1 Aturan route

- Setiap Screen ID memiliki satu canonical route.
- Route dapat menerima parameter entity ID.
- Tab/modal tidak otomatis menjadi route baru.
- New/Edit dapat menggunakan satu Screen ID dengan mode route/parameter yang berbeda.
- Route yang tidak dicantumkan pada sumber asli ditandai sebagai **usulan route PRD** dan harus dicek terhadap repository sebelum implementasi.
- Jangan membuat route duplikat untuk setiap role.
- Gunakan route guard dan permission resolver.
- Deep link harus tetap berfungsi setelah refresh.
- Browser Back/Forward tidak boleh mengulang mutation.
- `returnTo` setelah login harus divalidasi.
- Route statis seperti `/aktivitas/agenda/cek-tiket` harus diprioritaskan di atas dynamic route `/aktivitas/agenda/:id`; jangan sampai string `cek-tiket` diperlakukan sebagai ID agenda.
- `/auth/confirm` adalah callback teknis verifikasi, bukan Screen ID tambahan; pada demo, callback disimulasikan secara lokal dan diarahkan ke AUTH-03/hasil verifikasi.
- Route invalid menuju SYS-08; akses ditolak menuju SYS-07.
- Route AUTH wajib mengikuti baseline yang sudah dikunci: `/masuk`, `/daftar`, `/verifikasi-email`, `/lupa-password`, `/reset-password`, `/status-akun`. Jangan mengembalikan prefix `/auth/` untuk halaman screen AUTH.
- Route TKT wajib mengikuti baseline: `/aktivitas/agenda/:id/tiket`, `/aktivitas/agenda/:id/daftar`, `/pendaftaran/:id/bayar`, `/pendaftaran/:id/status`, `/aktivitas/agenda/cek-tiket`, `/aktivitas/agenda/cek-tiket/verifikasi`, `/aktivitas/agenda/cek-tiket/hasil`, `/tiket/:id`.
- Untuk screen Create/Edit, satu canonical route menggunakan query `mode=create|edit` dan `recordId` opsional. Jangan menulis dua URL alternatif sebagai dua screen.
- `EVT-03` adalah entry route ke komponen/form CAL-04 yang sama, bukan form kedua. Jika `EVT-03` dibuka, tampilkan `AgendaForm` dengan sumber navigasi `events`.
- `WRK-01`/`WRK-02` menggunakan `workspaceType=field|compartment|project`; jenis Workspace tidak menambah route atau Screen ID baru.
- Parameter `workspaceId`, `projectId`, `eventId`, `recordId`, `mode`, dan `returnTo` harus divalidasi sebelum digunakan. Jangan percaya query string sebagai sumber permission.

## 16.2 Route PUB dan TKT

Route berikut berasal dari inventaris Master Screen:

| ID | Route |
|---|---|
| PUB-01 | `/` |
| PUB-02 | `/tentang-kami` |
| PUB-03 | `/organisasi/kabinet` |
| PUB-04 | `/organisasi/kabinet/:id` |
| PUB-05 | `/organisasi/bidang` |
| PUB-06 | `/organisasi/bidang/:id` |
| PUB-07 | `/organisasi/kompartemen` |
| PUB-08 | `/organisasi/kompartemen/:id` |
| PUB-09 | `/organisasi/program-kerja` |
| PUB-10 | `/organisasi/program-kerja/:id` |
| PUB-11 | `/aktivitas/agenda` |
| PUB-12 | `/aktivitas/agenda/:id` |
| PUB-13 | `/aktivitas/berita` |
| PUB-14 | `/aktivitas/berita/:id` |
| PUB-15 | `/aktivitas/media-partner` |
| PUB-16 | `/aktivitas/media-partner/ajukan` |
| PUB-17 | `/aktivitas/media-partner/cek-status` |
| PUB-18 | `/karya-kader/bisnis` |
| PUB-19 | `/karya-kader/bisnis/:id` |
| PUB-20 | `/karya-kader/prestasi` |
| PUB-21 | `/karya-kader/prestasi/:id` |
| PUB-22 | `/kotak-suara` |
| TKT-01 | `/aktivitas/agenda/:id/tiket` |
| TKT-02 | `/aktivitas/agenda/:id/daftar` |
| TKT-03 | `/pendaftaran/:id/bayar` |
| TKT-04 | `/pendaftaran/:id/status` |
| TKT-05 | `/aktivitas/agenda/cek-tiket` |
| TKT-06 | `/aktivitas/agenda/cek-tiket/verifikasi` |
| TKT-07 | `/aktivitas/agenda/cek-tiket/hasil` |
| TKT-08 | `/tiket/:id` |

## 16.3 Route AUTH dan PER — baseline terkunci untuk AUTH; route PER adalah usulan PRD

| ID | Proposed route |
|---|---|
| AUTH-01 | `/masuk` |
| AUTH-02 | `/daftar` |
| AUTH-03 | `/verifikasi-email` |
| AUTH-04 | `/lupa-password` |
| AUTH-05 | `/reset-password` |
| AUTH-06 | `/status-akun` |
| PER-01 | `/personal` |
| PER-02 | `/personal/profile` |
| PER-03 | `/personal/profile/edit` |
| PER-04 | `/personal/security` |
| PER-05 | `/personal/membership` |
| PER-06 | `/personal/positions` |
| PER-07 | `/personal/projects` |
| PER-08 | `/personal/tickets` |
| PER-09 | `/personal/attendance` |
| PER-10 | `/personal/businesses` |
| PER-11 | `/personal/businesses/form?mode=create\|edit&recordId=:businessId` |
| PER-12 | `/personal/notifications` |

## 16.4 Route ADM — usulan PRD

| ID | Proposed route |
|---|---|
| ADM-01 | `/admin/cabinets` |
| ADM-02 | `/admin/cabinets/:cabinetId` |
| ADM-03 | `/admin/cabinets/form?mode=create\|edit&recordId=:cabinetId` |
| ADM-04 | `/admin/cabinets/:cabinetId/archive` |
| ADM-05 | `/admin/cabinets/:cabinetId/structure` |
| ADM-06 | `/admin/cabinets/:cabinetId/units/:unitId` |
| ADM-07 | `/admin/cabinets/:cabinetId/positions` |
| ADM-08 | `/admin/cabinets/:cabinetId/users` |
| ADM-09 | `/admin/cabinets/:cabinetId/users/:userId` |
| ADM-10 | `/admin/cabinets/:cabinetId/permissions` |
| ADM-11 | `/admin/cabinets/:cabinetId/modules` |
| ADM-12 | `/admin/cabinets/:cabinetId/audit` |

## 16.5 Route ORG, WRK, CAL, COR, FIN — usulan PRD

| ID | Proposed route |
|---|---|
| ORG-01 | `/organization/dashboard` |
| ORG-02 | `/organization/structure` |
| ORG-03 | `/organization/fields/:fieldId/monitoring` |
| ORG-04 | `/organization/compartments/:compartmentId/monitoring` |
| ORG-05 | `/organization/action-center` |
| ORG-06 | `/organization/reports` |
| WRK-01 | `/workspace/:workspaceId` |
| WRK-02 | `/workspace/:workspaceId/information` |
| WRK-03 | `/workspace/:workspaceId/projects` |
| WRK-04 | `/workspace/:workspaceId/projects/form?mode=create\|edit&recordId=:projectId` |
| WRK-05 | `/workspace/projects/:projectId` |
| WRK-06 | `/workspace/projects/:projectId/team` |
| WRK-07 | `/workspace/projects/:projectId/managers` |
| WRK-08 | `/workspace/projects/:projectId/progress` |
| WRK-09 | `/workspace/:workspaceId/pleno` |
| WRK-10 | `/workspace/projects/:projectId/closure` |
| CAL-01 | `/organization/calendar` |
| CAL-02 | `/workspace/:workspaceId/calendar` |
| CAL-03 | `/calendar/events/:eventId` |
| CAL-04 | `/calendar/events/form?mode=create\|edit&recordId=:eventId` |
| COR-01 | `/organization/correspondence` |
| COR-02 | `/organization/correspondence/requests` |
| COR-03 | `/organization/correspondence/form?mode=create\|edit&recordId=:requestId` |
| COR-04 | `/organization/correspondence/:requestId` |
| COR-05 | `/organization/correspondence/numbering` |
| COR-06 | `/organization/correspondence/ditmawa` |
| COR-07 | `/organization/correspondence/archive` |
| FIN-01 | `/organization/finance` |
| FIN-02 | `/organization/finance/transactions` |
| FIN-03 | `/organization/finance/transactions/form?mode=create\|edit&recordId=:transactionId` |
| FIN-04 | `/organization/finance/requests` |
| FIN-05 | `/organization/finance/requests/form?mode=create\|edit&recordId=:requestId` |
| FIN-06 | `/organization/finance/requests/:requestId` |
| FIN-07 | `/organization/finance/disbursements` |
| FIN-08 | `/organization/finance/units/:unitId` |
| FIN-09 | `/organization/finance/revenue` |
| FIN-10 | `/organization/finance/reports` |

## 16.6 Route EVT, ATT, DOC, DIR, CMS, SYS — usulan PRD

| ID | Proposed route |
|---|---|
| EVT-01 | `/organization/events/dashboard` |
| EVT-02 | `/organization/events` |
| EVT-03 | `/organization/events/form?mode=create\|edit&recordId=:eventId` (alias CAL-04) |
| EVT-04 | `/organization/events/:eventId` |
| EVT-05 | `/organization/events/:eventId/ticket-types` |
| EVT-06 | `/organization/events/:eventId/participants` |
| EVT-07 | `/organization/events/:eventId/payments` |
| EVT-08 | `/organization/events/:eventId/delivery` |
| EVT-09 | `/organization/events/:eventId/reports` |
| ATT-01 | `/organization/events/:eventId/check-in` |
| ATT-02 | `/organization/events/:eventId/scanner` |
| ATT-03 | `/organization/events/:eventId/attendance` |
| ATT-04 | `/organization/events/:eventId/check-in/:ticketId` |
| DOC-01 | `/organization/documents` |
| DOC-02 | `/organization/documents/form?mode=create\|edit&recordId=:documentId` |
| DOC-03 | `/organization/documents/:documentId` |
| DOC-04 | `/organization/lpj` |
| DOC-05 | `/organization/lpj/:lpjId` |
| DOC-06 | `/organization/documents/archive` |
| DIR-01 | `/organization/directory/cadres` |
| DIR-02 | `/organization/directory/cadres/:cadreId` |
| DIR-03 | `/organization/directory/cadres/verification` |
| DIR-04 | `/organization/directory/businesses` |
| DIR-05 | `/organization/directory/businesses/:businessId` |
| DIR-06 | `/organization/directory/companies` |
| DIR-07 | `/organization/directory/companies/:companyId` |
| DIR-08 | `/organization/directory/partnership-history` |
| CMS-01 | `/organization/cms` |
| CMS-02 | `/organization/cms/homepage` |
| CMS-03 | `/organization/cms/media` |
| CMS-04 | `/organization/cms/articles` |
| CMS-05 | `/organization/cms/articles/form?mode=create\|edit&recordId=:articleId` |
| CMS-06 | `/organization/cms/achievements` |
| CMS-07 | `/organization/cms/achievements/form?mode=create\|review&recordId=:achievementId` |
| CMS-08 | `/organization/cms/medpart` |
| CMS-09 | `/organization/cms/medpart/:submissionId` |
| CMS-10 | `/organization/cms/medpart/packages` |
| CMS-11 | `/organization/cms/medpart/publication` |
| CMS-12 | `/organization/cms/feedback` |
| CMS-13 | `/organization/cms/feedback/:feedbackId` |
| SYS-01 | `/system/statistics` |
| SYS-02 | `/system/reports/:reportId` |
| SYS-03 | `/notifications` |
| SYS-04 | `/approvals` |
| SYS-05 | `/activity` |
| SYS-06 | `/search` |
| SYS-07 | `/403` |
| SYS-08 | `/404` |
| SYS-09 | `/500` |

**Status Route Registry:** inventaris frontend mempunyai 146 Screen ID dan tabel ini memetakan 146 ID tersebut. Baseline Analyst mencatat 110 entri route internal masih perlu dikonsolidasikan ke satu registry; angka 116 pada draft v1.0 adalah hitungan lama yang tidak boleh dipakai sebagai jumlah screen hilang. Angka tersebut menjelaskan gap dokumentasi route sumber, bukan pengurangan inventaris. Route AUTH dan TKT di atas mengikuti baseline route yang telah dikunci. Route internal lainnya adalah canonical route usulan PRD v1.1 dan tetap harus dicocokkan dengan repository aktual sebelum coding. Jika route sudah ada, pertahankan path aktual melalui alias/redirect dan catat mapping ke Screen ID; jangan membuat dua route berbeda untuk satu tujuan tanpa alasan.



---

# 17. Acceptance Criteria, Testing, dan Definition of Done

## 17.1 Coverage test 146 screen

- [ ] Seluruh 146 Screen ID terdaftar pada route registry.
- [ ] Tidak ada ID duplikat atau hilang.
- [ ] Seluruh 16 prefix sesuai jumlah.
- [ ] Setiap screen dapat dibuka dari navigasi atau deep link.
- [ ] Setiap screen mempunyai data dummy, UI states, permission guard, dan acceptance test.

## 17.2 Role/sidebar test

- [ ] Mahasiswa biasa tidak melihat Keanggotaan.
- [ ] Kader terverifikasi melihat Keanggotaan.
- [ ] Kader tanpa assignment tidak melihat Organization Management.
- [ ] Anggota roster tidak mendapat Organization Management hanya karena menjadi anggota.
- [ ] Pengelola Proker mendapat workspace yang ditugaskan.
- [ ] Staff hanya mendapat menu sesuai permission.
- [ ] Kakom hanya mengelola kompartemen scope-nya.
- [ ] Kabid memprioritaskan lingkup bidang.
- [ ] Sekum mendapat Persuratan.
- [ ] Bendum mendapat Keuangan.
- [ ] Bendum tidak mendapat verifikasi bukti tiket/Medpart.
- [ ] Organizer mendapat event sesuai assignment.
- [ ] Medkom mendapat review/publikasi Medpart sesuai permission.
- [ ] Publisher dapat publish hanya jika permission ada.
- [ ] Admin login masuk Cabinet Center tanpa sidebar.
- [ ] Admin harus memilih kabinet sebelum Cabinet Dashboard.
- [ ] Admin tidak otomatis mendapat permission Sekum/Bendum.
- [ ] Roster penuh hanya terlihat oleh Kakom/Manager yang berwenang.
- [ ] Anggota biasa hanya melihat record miliknya.
- [ ] Role dicabut langsung mengubah menu dan aksi yang tersedia.

## 17.3 Business flow test

- [ ] Registrasi menghasilkan akun Mahasiswa Biasa.
- [ ] Verifikasi kader tidak otomatis dari NIM match.
- [ ] Kabinet dapat dibuat/diarsipkan tanpa menghapus histori.
- [ ] Role/permission dapat ditambah/dicabut melalui Admin demo.
- [ ] Workspace muncul sesuai assignment.
- [ ] Proker baru menghasilkan workspace dan record yang terhubung.
- [ ] Manager hanya ditunjuk Kakom.
- [ ] Task Board empat kolom bekerja tanpa PIC.
- [ ] Persuratan dapat submit, revision, completed, dispatch, reopen.
- [ ] Nomor surat tidak duplikat pada data demo.
- [ ] Fund request dapat approve/reject dan multi-termin.
- [ ] Ledger tidak menghitung transfer internal sebagai pendapatan.
- [ ] Event dapat dibuat dan dipublish.
- [ ] Ticket type dan kuota dapat dikelola.
- [ ] Reservasi 180 detik berfungsi.
- [ ] Pending Verification tidak auto-expire.
- [ ] Tiket gratis langsung issued.
- [ ] OTP demo hanya membuka tiket milik identitas yang terverifikasi.
- [ ] Tiket dapat diunduh/print dalam bentuk demo.
- [ ] Check-in sukses hanya satu kali.
- [ ] Kehadiran tidak dihitung dari registrasi saja.
- [ ] Bisnis melalui review sebelum tampil publik.
- [ ] Medpart dapat diajukan tanpa login.
- [ ] Medpart approval tidak otomatis publish.
- [ ] Publish Medpart dilakukan manual.
- [ ] LPJ dapat submit/revision/approve.
- [ ] Hanya Kakom dapat menutup Proker.
- [ ] Artikel/prestasi Published tampil di halaman publik.
- [ ] Kotak Suara tidak mempunyai public listing.
- [ ] Notification dan activity history terbentuk dari aksi.
- [ ] Retry email tidak menerbitkan tiket baru.

## 17.4 Persistence test

- [ ] Login demo tetap sesuai setelah refresh jika session persistence diaktifkan.
- [ ] Perubahan profil, CRUD, approval, dan Task Board tersimpan setelah refresh.
- [ ] Countdown reservasi menghitung expiry dari timestamp tersimpan.
- [ ] Reset Demo Data mengembalikan seed awal.
- [ ] Logout tidak menghapus seluruh mock store.
- [ ] Tidak ada file besar/base64 yang memenuhi LocalStorage.

## 17.5 Responsive dan accessibility test

- [ ] 320 px tidak mengalami horizontal clipping.
- [ ] 375/390 px nyaman untuk form dan dashboard.
- [ ] Tablet dan desktop memiliki layout yang sesuai.
- [ ] Sidebar mobile dapat dibuka/tutup.
- [ ] Dropdown dapat digunakan dengan keyboard.
- [ ] Modal memiliki focus management.
- [ ] Form mempunyai label dan error message.
- [ ] Kontras status diuji.
- [ ] Reduced motion dihormati.
- [ ] Scanner memiliki fallback manual.
- [ ] Tabel panjang memiliki strategi mobile.

## 17.6 Role, route, data, and cross-module regression matrix

| Test ID | Akun | Screen/flow | Expected result |
|---|---|---|---|
| RT-01 | DEMO-01 | Personal Area | Sidebar tanpa Keanggotaan/Organization/Admin |
| RT-02 | DEMO-02 | Personal Area | Keanggotaan tampil; tidak ada Organization tanpa assignment |
| RT-03 | DEMO-03 | PER-07/WRK-06 | Hanya record roster milik sendiri; tidak melihat roster lengkap |
| RT-04 | DEMO-04 | Workspace Proker | Hanya tiga Proker assignment; Task Board tanpa PIC; tidak bisa close |
| RT-05 | DEMO-05 | Staff | Tidak ada menu mutasi tanpa permission |
| RT-06 | DEMO-06 | COR-03 | Dapat submit langsung ke Sekum tanpa approval Kakom |
| RT-07 | DEMO-07 | FIN-05 | Dapat submit langsung ke Bendum; tidak dapat approve/disburse |
| RT-08 | DEMO-08 | WRK-04/06/07/10 | Kakom membuat Proker, mengelola roster, menunjuk Manager, menutup setelah checklist |
| RT-09 | DEMO-09 | Workspace Bidang | Dapat membuka child Workspace untuk monitoring read-only |
| RT-10 | DEMO-10/11/12 | ORG/CAL/SYS | Top Management monitoring; tidak otomatis approve |
| RT-11 | DEMO-13 | COR | Cross-unit surat; hanya Sekum reopen |
| RT-12 | DEMO-14 | FIN | Cross-unit finance; tidak melihat PII/bukti tiket; tidak approve surat |
| RT-13 | DEMO-15 | EVT | Hanya event assignment; dapat verify payment jika ditugaskan |
| RT-14 | DEMO-16 | ATT | Hanya check-in event assignment; satu tiket satu kali |
| RT-15 | DEMO-17 | CMS Medpart | Review proof dan publish manual; bukan Bendum |
| RT-16 | DEMO-18/19/20 | CMS | Content Creator dan Publisher terpisah; gabungan keduanya dapat create+publish |
| RT-17 | DEMO-21 | DIR | PSDM mengelola kader sesuai permission; satu source data |
| RT-18 | DEMO-22 | DIR | Partnership edit perusahaan; pengurus lain read-only |
| RT-19 | DEMO-23 | CMS Feedback | Kotak Suara privat; operator scope-limited |
| RT-20 | DEMO-24 | DOC | Reviewer hanya LPJ yang ditugaskan |
| RT-21 | DEMO-25 | ADM | ADM-01 tanpa sidebar; ADM-02 setelah cabinet selection; tidak otomatis Sekum/Bendum |
| RT-22 | DEMO-26 | Area/Workspace Switcher | Multi-assignment; data dan permission berganti bersih |
| RT-23 | DEMO-27/28 | AUTH-06 | Pending/suspended tidak bisa masuk area internal |
| RT-24 | Public | PUB-16/PUB-17 | Submit Medpart tanpa login; tracking code unik; status hanya via kode |
| RT-25 | Organizer/Public | CAL/EVT | CAL-04 dan EVT-03 membuka satu AgendaForm; tidak ada event duplikat |
| RT-26 | All | PER-12/SYS-03 | Mark read memperbarui notifikasi yang sama |
| RT-27 | All | ORG-05/SYS-04 | Action Center dan Approval Center tidak membuat workflow ganda |
| RT-28 | All | TKT/EVT/FIN | Paid/free ticket flow; tidak ada refund; Bendum hanya aggregate |
| RT-29 | Check-in Staff | ATT | Kamera gagal → manual fallback; tidak menjanjikan offline sync |
| RT-30 | All | Route guard | Deep link terlarang menuju 403; route hilang menuju 404 tanpa data leak |

## 17.7 Frontend field-level coverage

- [ ] Setiap Screen ID mempunyai kontrak layout, data/field, interaksi, akses, dan fixture pada Bagian 9.19.
- [ ] Setiap Screen ID mempunyai sumber dummy pada shared seed catalog Bagian 11.7.
- [ ] Semua form mempunyai required/optional field, validasi, success, error, dan disabled/loading state.
- [ ] Semua list mempunyai kolom, search/filter, sort/pagination sesuai kebutuhan.
- [ ] Semua detail page mempunyai status, metadata, relasi, histori, dan aksi sesuai permission.
- [ ] Tidak ada halaman yang hanya berupa placeholder kosong kecuali placeholder tersebut memang merupakan UI state yang disengaja.

## 17.8 Definition of Done

Satu Screen ID baru boleh ditandai DONE jika:
1. Halaman dan canonical route tersedia.
2. Detail field, layout, komponen, dan aksi sesuai Bagian 9.19.
3. Data dummy terhubung ke shared mock repository/fixture Bagian 11.7.
4. Permission dan scope diterapkan pada navigasi, route, dan mock service.
5. Semua tombol/form bekerja dan mengubah state yang benar.
6. Loading, empty, populated, validation error, request error, unauthorized, dan state domain tersedia sesuai kebutuhan.
7. Desktop dan mobile diuji.
8. Tidak ada console error kritis.
9. Acceptance test lulus.
10. Screen ID tercatat pada traceability matrix.
11. Perubahan lintas modul yang terkait sudah diuji.

Status `DESIGNED`, `IMPLEMENTED`, `FUNCTIONALLY_TESTED`, dan `VISUAL_QA_PASSED` harus dibedakan. Jangan menyamakan halaman yang sudah dibuat dengan halaman yang sudah diuji.

---

# 18. AI Agent Implementation Rules

Aturan berikut wajib dipatuhi AI Agent selama mengerjakan frontend.

## 18.1 Sebelum coding

1. Baca seluruh `PRD_frontend.md` termasuk Bagian 8.3, 9.19, 10.23, 11.7, 16, dan 17.7.
2. Baca `prd_master.md`.
3. Baca `front end_analyst.docx` dan `front end.docx`.
4. Baca `desing.md`.
5. Audit repository dan struktur file yang sudah ada.
6. Verifikasi framework, versi dependency, asset, font, dan komponen existing.
7. Buat pemetaan Screen ID → route → layout → data → permission → test.
8. Catat konflik atau keputusan yang belum final sebagai `DECISION_REQUIRED`.
9. Jangan langsung membangun halaman sebelum fondasi dan shared component dipahami.

## 18.2 Saat implementasi

1. Wajib mengimplementasikan 146/146 Screen ID; template bersama boleh digunakan, tetapi setiap ID tetap mempunyai route/entry, data, akses, dan test.
2. Dilarang menghilangkan atau mengganti Screen ID.
3. Dilarang menambah fitur bisnis atau Screen ID tanpa persetujuan.
4. Dilarang mengubah aturan role, permission, status, dan scope.
5. Dilarang menghubungkan Supabase atau backend sungguhan pada tahap ini.
6. Semua data demo harus berasal dari shared repository dan seed Bagian 11.7.
7. Semua perubahan harus melalui mock service.
8. Semua tombol harus berfungsi.
9. Semua form harus mempunyai validasi.
10. Semua aksi penting harus menghasilkan feedback.
11. Semua aksi mutation harus mempunyai loading/pending dan anti-double-submit.
12. Semua list harus mempunyai search/filter/sort/pagination jika dibutuhkan.
13. Semua data harus tetap konsisten setelah refresh.
14. Semua route harus mempunyai guard dan dipetakan ke Screen ID.
15. Sidebar harus mengikuti role, permission, assignment, dan scope.
16. Jangan memberi permission dengan hanya mengandalkan hide/show menu; mock service wajib memeriksa permission.
17. Jangan menampilkan data privat pada public page.
18. Jangan menampilkan PII peserta atau bukti pembayaran tiket kepada Bendum.
19. Jangan memberi Admin hak approval operasional secara otomatis.
20. Jangan membuat PIC individual pada Task Board.
21. Jangan menampilkan persentase progres Proker.
22. Jangan membuat Tugas Saya personal dari Task Board bersama.
23. Jangan menghapus histori transaksi, roster, surat, atau aktivitas secara diam-diam.
24. Jangan menandai fitur selesai sebelum acceptance test lulus.
25. Jangan membuat data dummy terpisah yang menyebabkan halaman saling tidak sinkron.
26. Gunakan tepat 28 preset demo pada Bagian 6.4; jangan membuat akun/role demo baru tanpa persetujuan.
27. Implementasikan tiga konteks Workspace (Bidang, Kompartemen, Proker) melalui WRK-01/WRK-02; jangan menambah Screen ID.
28. Gunakan canonical route AUTH dan TKT pada Bagian 16; jangan mengembalikan route AUTH ke prefix `/auth/`.
29. EVT-03 adalah alias/entry point ke CAL-04 AgendaForm; jangan membuat form agenda kedua.
30. PUB-17 memeriksa kode tracking Media Partner; jangan gunakan pencarian bebas nama/kegiatan sebagai mekanisme utama.
31. Sekum dan Bendum memiliki cross-unit access berdasarkan fungsi; jangan mewajibkan membership Workspace untuk memproses surat/keuangan lintas unit.
32. Staff berizin dapat submit surat/dana langsung ke Sekum/Bendum tanpa approval tambahan Kakom.
33. PER-12 dan SYS-03 memakai notifikasi yang sama; ORG-05 dan SYS-04 tetap berbeda fungsi.

## 18.3 Saat menggunakan Design System

1. Gunakan token terpusat mengacu ke `design.md` (Aurora Glass Editorial).
2. Jangan menulis HEX acak di setiap komponen; gunakan CSS variables / Tailwind tokens.
3. Gunakan Poppins (UI/Body) dan Serif Editorial dengan Google Fonts fallback untuk Headline/Display.
4. Terapkan hero Aurora Glass Editorial (Warm Ivory/Blush) pada Beranda dan floating glass navbar kpm-inspired.
5. Section konten pertama halaman non-Beranda harus bersih dan mudah dibaca (White/Ivory solid).
6. Jangan mengganti atau memodifikasi logo master (HIPMI, Telkom, ARTHAKARSA).
7. Gunakan glassmorphism secara selektif (navbar, callout, dropdown); hindari glass pada tabel data padat dan formulir panjang.
8. Motion tidak boleh menghambat penggunaan dan wajib mendukung `prefers-reduced-motion`.
9. Semua komponen harus responsive (320px sampai desktop besar) dan accessible.

## 18.4 Jika ada masalah atau konflik

- Jangan mengarang data.
- Jangan mengarang route yang dianggap final tanpa mencatatnya sebagai usulan.
- Jangan membuat role/permission baru untuk mempermudah UI.
- Jangan mengubah struktur database.
- Jangan menghapus file existing sebelum memeriksa dependensinya.
- Jangan mengubah nama Screen ID.
- Jangan mengubah business flow karena keterbatasan komponen.
- Jika spesifikasi tidak cukup, tandai `DECISION_REQUIRED`, jelaskan dampak, dan lanjutkan bagian lain yang tidak terblokir.
- Jika dependency belum tersedia, verifikasi package yang sudah ada sebelum menambah dependency.
- Jika asset belum tersedia, gunakan placeholder yang jelas dan catat asset pending.

## 18.5 Urutan pengerjaan yang direkomendasikan

1. Phase 0 — Read & Audit: pahami PRD v1.1, PRD Master, Frontend Analyst, repository, assets, dependency, dan 146 Screen ID.
2. Phase 1 — Foundation: framework existing, typography, token, font loading, motion, route groups, shared layout, responsive shell.
3. Phase 2 — Mock Data: central store, seed 28 akun, seluruh fixture Bagian 11.7, LocalStorage, mock services, permission resolver.
4. Phase 3 — Authentication & Area Switcher: login, registrasi, verifikasi, reset, status akun, demo account selector.
5. Phase 4 — Public Website dan Ticketing publik: PUB 22 screen dan TKT 8 screen.
6. Phase 5 — Personal Area: PER 12 screen untuk Mahasiswa, Kader, Anggota roster, dan akun multi-assignment.
7. Phase 6 — Admin Panel dan Cabinet Center: ADM 12 screen.
8. Phase 7 — Organization Management: ORG 6 screen dan sidebar per role.
9. Phase 8 — Workspace Bidang, Workspace Kompartemen, dan Workspace Proker: WRK 10 screen dengan konteks dan permission masing-masing.
10. Phase 9 — Kalender, Persuratan, Keuangan, Dokumen, LPJ: CAL/COR/FIN/DOC.
11. Phase 10 — Agenda, Ticketing internal, Check-in, Medpart: EVT/TKT/ATT/CMS Medpart.
12. Phase 11 — Direktori, CMS, Kotak Suara, Reporting, Notification: DIR/CMS/SYS.
13. Phase 12 — Cross-module integration, seluruh demo journey Bagian 10.23, responsive/visual QA, dan acceptance test.

Urutan ini adalah dependency recommendation, bukan izin mengurangi cakupan. Semua 146 Screen ID tetap wajib selesai. AI Agent boleh membangun reusable component, tetapi tidak boleh menghilangkan halaman/route/entry yang diwajibkan.

# 19. Demo Scenario Library

| Scenario ID | Nama skenario | Akun utama | Hasil yang harus terlihat |
|---|---|---|---|
| DEMO-01 | Mahasiswa registrasi dan login | Mahasiswa | Akun Mahasiswa Biasa dan Personal Dashboard |
| DEMO-02 | Verifikasi kader | Admin + Kader | Status kader berubah setelah keputusan verifikator |
| DEMO-03 | Pengajuan bisnis kader | Kader + Reviewer | Draft → Review → Revision/Published |
| DEMO-04 | Surat sampai selesai | Staff/Manager + Sekum | Submitted → Revision/Completed → nomor/dispatch |
| DEMO-05 | Pengajuan dana multi-termin | Manager + Bendum | Submitted → Approved → Disbursed → Settled |
| DEMO-06 | Proker dan Task Board | Kakom + Manager | Proker dibuat, Manager ditunjuk, task berpindah empat kolom |
| DEMO-07 | Tiket berbayar | Publik + Organizer | Reserve 180 detik → proof → Pending → Approved → Ticket Issued |
| DEMO-08 | Tiket gratis | Publik | Registrasi berhasil → tiket issued tanpa QRIS |
| DEMO-09 | Cek status tiket | Peserta | NIM → OTP demo → daftar tiket sendiri |
| DEMO-10 | Check-in | Check-in Staff | QR demo → hadir → riwayat diperbarui |
| DEMO-11 | Medpart | Publik + Medkom | Submit → review/payment → approved → manual publish |
| DEMO-12 | Kotak Suara | Publik + Operator | Submit privat → triage → tindak lanjut → close |
| DEMO-13 | CMS artikel | Editor + Publisher | Draft → Preview → Published → tampil publik |
| DEMO-14 | Penutupan Proker | Manager + Kakom | Checklist blocker/ready → hanya Kakom menutup |
| DEMO-15 | Admin kabinet | Admin | Login → Cabinet Center → pilih kabinet → Cabinet Dashboard |

Setiap skenario harus mempunyai precondition, akun, data awal, langkah, expected result, record yang berubah, halaman yang harus ikut berubah, dan cara reset.

---

# 20. Demo Control Center

Demo Control Center adalah panel khusus development/demo dan **bukan Screen ID tambahan**. Panel tidak tampil pada navbar publik, Personal Area, Organization Management, atau Admin Panel produksi. Jika perlu route langsung, gunakan `/__demo` hanya pada development/demo build; route ini tidak masuk inventaris 146 dan harus tidak tersedia pada build produksi.

Fungsi:
1. Melihat seluruh preset demo accounts.
2. Mengisi form login dengan akun demo.
3. Melihat kode OTP demo.
4. Reset data ke seed awal.
5. Memilih skenario demo.
6. Mengaktifkan fixture status tertentu untuk pengujian.
7. Melihat versi seed/schema demo.
8. Melihat ringkasan LocalStorage.
9. Menjalankan export/import data demo bila aman untuk debugging.

Ketentuan:
- Hanya aktif pada development/demo mode.
- Tidak dapat diakses sebagai fitur publik.
- Tidak mengubah permission akun produksi.
- Tidak menampilkan data rahasia karena seluruh data bersifat dummy.
- Jangan membuat Demo Control Center sebagai menu Admin Panel permanen.

---

# 21. Cross-Module Synchronization Matrix

| Perubahan utama | Halaman yang wajib ikut berubah |
|---|---|
| Profil diperbarui | PER-01, PER-02, PER-03, direktori terkait sesuai izin |
| Kader diverifikasi | PER-05, DIR-01, DIR-02, assignment/fitur kader yang terkait |
| Proker dibuat | WRK-03, WRK-05, ORG-04, workspace switcher, kalender jika ada |
| Manager ditunjuk | WRK-07, sidebar/area switcher, WRK-01, activity history |
| Roster berubah | WRK-06, PER-07, monitoring sesuai scope |
| Task Board berubah | WRK-08, WRK-05, aktivitas/notifikasi |
| Agenda dibuat | EVT-02, EVT-04, CAL-01, CAL-02, PUB-11 setelah Published |
| Pembayaran tiket disetujui | EVT-07, EVT-08, TKT-04, TKT-08, PER-08, FIN-09 agregat, notification |
| Check-in berhasil | ATT-01, ATT-03, ATT-04, PER-09, report kehadiran |
| Surat berubah | COR-01, COR-02, COR-04, COR-07, SYS-04, notification |
| Dana dicairkan | FIN-01, FIN-02, FIN-07, FIN-08, FIN-10, WRK-05 |
| LPJ disetujui | DOC-04, DOC-05, WRK-10, checklist penutupan |
| Proker ditutup | WRK-03, WRK-05, WRK-10, workspace access, PER-07 historis |
| Bisnis dipublish | PER-10, DIR-04, DIR-05, PUB-18, PUB-19 |
| Artikel dipublish | CMS-04, CMS-05, PUB-13, PUB-14, homepage jika dipilih |
| Prestasi dipublish | CMS-06, CMS-07, PUB-20, PUB-21, PUB-01 |
| Medpart dipublish | CMS-08, CMS-09, CMS-11, PUB-15, halaman publik yang relevan |
| Feedback ditindaklanjuti | CMS-12, CMS-13, SYS-05, notification |
| Notification dibaca | SYS-03, PER-12, topbar unread count |

---

# 22. Screen-to-TODO Traceability

Dokumen ini menjadi sumber bagi `todo.md`. Setiap pekerjaan implementasi harus merujuk ke Screen ID dan requirement yang jelas.

## 22.1 Format traceability

| Field | Isi wajib |
|---|---|
| Phase | Phase implementasi |
| Subphase | Kelompok pekerjaan |
| Task ID | ID tugas unik |
| Screen ID | Satu atau lebih Screen ID terkait |
| Feature | Nama fitur/komponen |
| Requirement | Bagian PRD yang menjadi acuan |
| Dependency | Task/komponen yang harus selesai lebih dahulu |
| Acceptance | Cara membuktikan selesai |
| Test ID | Pengujian terkait |
| Status | Todo/In Progress/Blocked/Review/Done |

## 22.2 Aturan coverage

- Setiap Screen ID harus muncul minimal satu kali di `todo.md`.
- Screen yang menggunakan shared component tetap harus memiliki acceptance khusus.
- Satu task boleh mencakup beberapa screen jika benar-benar satu pekerjaan reusable.
- Setiap screen harus mempunyai task untuk data, interaksi, permission, responsive, dan test sesuai kebutuhan.
- Tidak boleh menandai Phase selesai jika masih ada Screen ID atau flow yang belum terimplementasi.
- Perubahan PRD harus memperbarui traceability matrix dan TODO terkait.

---

# 23. Open Decisions dan Hal yang Harus Diverifikasi

Bagian ini hanya berisi hal yang memang belum dapat dipastikan dari dokumen dan membutuhkan verifikasi asset/repository atau keputusan pemilik. Hal yang sudah dikunci pada v1.1 tidak boleh dibuka kembali oleh AI Agent.

| ID | Hal yang perlu diverifikasi | Aturan implementasi frontend |
|---|---|---|
| DEC-01 | Approval final Design System v2.1 | Gunakan v2.1 sebagai baseline visual draft terbaru; approval final pemilik proyek tetap perlu dicatat |
| DEC-02 | Asset logo HIPMI, wordmark Telkom, logo kabinet, pecahan logo | Verifikasi file aktual di repository; jangan redraw atau mengganti logo master |
| DEC-03 | Foto Ketum/Waketum yang boleh dipublikasikan | Gunakan placeholder sampai asset resmi dan izin penggunaan tersedia |
| DEC-04 | `siluet.png` | Verifikasi path; jika tidak tersedia gunakan placeholder netral dengan nama asset fallback yang konsisten |
| DEC-05 | Font Anton dan Plus Jakarta Sans | Verifikasi font loading dan lisensi/source di repository; fallback font harus ditentukan |
| DEC-06 | Master Fakultas/Program Studi resmi | Gunakan fixture `Fakultas Demo`/`Program Studi Demo`; jangan mengarang nomenklatur resmi |
| DEC-07 | Rekonsiliasi route usulan internal dengan repository | PRD v1.1 menyediakan route mapping 146/146; baseline Analyst mencatat 110 entri route sumber belum dikonsolidasikan. Audit repository sebelum coding; pertahankan route existing melalui alias/redirect bila diperlukan |
| DEC-08 | Enum backend yang belum tersedia pada tahap frontend | Gunakan semantic state demo pada Bagian 10/11; jangan mengklaim identik dengan enum backend |
| DEC-09 | Penetapan reviewer LPJ pada data organisasi nyata | Untuk demo gunakan assignment `lpj:review` eksplisit; jangan memberi Bendum approval LPJ otomatis |
| DEC-10 | Mekanisme cek status Media Partner | **RESOLVED v1.1:** submit publik menghasilkan kode tracking unik; PUB-17 mengecek status menggunakan kode; tidak menggunakan pencarian bebas nama/kegiatan sebagai mekanisme utama |
| DEC-11 | Format/ukuran file untuk demo | Konfigurasi demo: gambar poster/bukti menerima JPG/JPEG/PNG/PDF sampai 5 MB; foto/media menerima JPG/JPEG/PNG/WEBP sampai 5 MB. Ini validasi frontend demo, bukan batas produksi |
| DEC-12 | Library PDF/QR/scanner | Audit dependency; PDF memakai library yang sudah tersedia atau print view; QR/barcode berupa token demo; scanner kamera enhancement, manual input wajib tersedia |
| DEC-13 | Backend Screen Data Mapping/DB dictionary | Di luar scope implementasi ini. Bagian 9.19 dan 11.7 adalah kontrak UI/mock-data frontend, bukan bukti schema database atau API sudah selesai |

**Catatan status:** field-level mapping frontend untuk 146 Screen ID sudah didefinisikan pada Bagian 9.19. Status tersebut tidak berarti pemetaan query/API/database backend telah selesai. Repository route, asset, font, dan dependency belum boleh dinyatakan terverifikasi sebelum benar-benar diperiksa.

Jika keputusan baru diterima, catat change request dengan before/after, Screen ID terdampak, flow, data, permission, test, dan TODO terkait.

---

# 24. Final Cross-Check Checklist

Checklist ini adalah daftar pemeriksaan implementasi. Kotak belum dicentang berarti implementasi/QA aktual masih harus dilakukan; jangan menandai lulus hanya karena spesifikasi sudah tertulis.

## Dokumen dan cakupan
- [ ] PRD Frontend v1.1 dibaca lengkap oleh AI Agent.
- [ ] PRD Master dibaca lengkap untuk business rules.
- [ ] Frontend Analyst dan Frontend doc dibaca lengkap untuk navigasi dan struktur screen.
- [ ] Design System v2.1 dibaca lengkap.
- [ ] Repository diaudit sebelum implementasi.
- [ ] Konflik sumber dicatat dan tidak diselesaikan dengan asumsi.
- [ ] Tidak ada backend, database server, API, Supabase, Edge Function, email/OTP eksternal, atau transaksi produksi pada tahap ini.

## Area dan navigasi
- [ ] Enam area aplikasi utama tersedia.
- [ ] Public navbar enam menu dan seluruh submenu tersedia.
- [ ] Login/Daftar terpisah dari navbar utama.
- [ ] Personal sidebar sesuai status kader.
- [ ] Mahasiswa Biasa tidak melihat Keanggotaan.
- [ ] Kader terverifikasi melihat Keanggotaan, Riwayat Jabatan, Bisnis Saya, dan Pengajuan Bisnis.
- [ ] Organization sidebar permission-based.
- [ ] Workspace Bidang tersedia sebagai konteks WRK.
- [ ] Workspace Kompartemen tersedia.
- [ ] Workspace Proker tersedia.
- [ ] Workspace Switcher hanya menampilkan assignment yang sah.
- [ ] Admin masuk Cabinet Center tanpa sidebar.
- [ ] Cabinet Dashboard hanya setelah memilih kabinet.
- [ ] Sekum/Bendum cross-unit berdasarkan fungsi, bukan membership Workspace.

## Screen inventory dan detail
- [ ] PUB 22/22.
- [ ] TKT 8/8.
- [ ] AUTH 6/6.
- [ ] PER 12/12.
- [ ] ADM 12/12.
- [ ] ORG 6/6.
- [ ] WRK 10/10.
- [ ] CAL 4/4.
- [ ] COR 7/7.
- [ ] FIN 10/10.
- [ ] EVT 9/9.
- [ ] ATT 4/4.
- [ ] DOC 6/6.
- [ ] DIR 8/8.
- [ ] CMS 13/13.
- [ ] SYS 9/9.
- [ ] TOTAL 146/146.
- [ ] Setiap Screen ID memiliki route mapping.
- [ ] Setiap Screen ID memiliki layout, data/field, action, permission, dan fixture pada Bagian 9.19.
- [ ] Tidak ada screen kosong yang hanya menjadi placeholder tanpa state/tujuan yang dijelaskan.

## Demo accounts dan permission
- [ ] 28 preset demo tersedia.
- [ ] DEMO-01 Mahasiswa Biasa.
- [ ] DEMO-02 Kader terverifikasi tanpa assignment.
- [ ] DEMO-03 Anggota roster nonkader hanya melihat record sendiri.
- [ ] DEMO-04 Pengelola Proker pada beberapa Proker.
- [ ] DEMO-05 Staff tanpa permission mutasi.
- [ ] DEMO-06 Staff permission surat.
- [ ] DEMO-07 Staff permission keuangan.
- [ ] DEMO-08 Kakom.
- [ ] DEMO-09 Kabid.
- [ ] DEMO-10/11/12 Top Management.
- [ ] DEMO-13 Sekum cross-unit.
- [ ] DEMO-14 Bendum cross-unit.
- [ ] DEMO-15 Organizer.
- [ ] DEMO-16 Check-in Staff.
- [ ] DEMO-17 Medkom.
- [ ] DEMO-18/19/20 Content Creator/Publisher.
- [ ] DEMO-21 PSDM.
- [ ] DEMO-22 Partnership.
- [ ] DEMO-23 Feedback Operator.
- [ ] DEMO-24 LPJ Reviewer.
- [ ] DEMO-25 Admin Sistem.
- [ ] DEMO-26 Multi-Assignment.
- [ ] DEMO-27/28 pending/suspended.
- [ ] Menu tersembunyi dan route guard diuji bersama; hide/show sidebar saja tidak cukup.

## Demo engine dan dummy data
- [ ] Login/registrasi/verifikasi/reset berfungsi secara lokal.
- [ ] Shared mock repository menjadi satu sumber data.
- [ ] Seed catalog Bagian 11.7 terisi dan relasinya konsisten.
- [ ] Seluruh halaman menggunakan fixture yang sama sesuai mapping.
- [ ] LocalStorage persistence berfungsi.
- [ ] Mock services digunakan oleh seluruh halaman.
- [ ] CRUD dan status transition berfungsi.
- [ ] Cross-module sync berfungsi.
- [ ] Demo Control Center tersedia hanya pada mode demo/development.
- [ ] Reset data berfungsi dengan konfirmasi.
- [ ] Tidak ada file besar/base64 yang memenuhi LocalStorage.

## Flow dan permission
- [ ] BF-01 sampai BF-22 dapat diuji.
- [ ] Journey 10.23.1 sampai 10.23.21 dapat diuji.
- [ ] Registrasi menghasilkan Mahasiswa Biasa setelah verifikasi email.
- [ ] NIM match tidak otomatis memverifikasi kader.
- [ ] Proker baru menghasilkan Workspace yang terhubung.
- [ ] Hanya Kakom menunjuk/mencabut Manager dan menutup Proker.
- [ ] Roster visibility sesuai keputusan final.
- [ ] Task Board empat kolom tanpa PIC.
- [ ] CAL-04 adalah satu pintu pembuatan agenda; EVT-03 alias/entry point.
- [ ] Persuratan Staff berizin langsung ke Sekum; hanya Sekum reopen.
- [ ] Pengajuan dana Staff berizin langsung ke Bendum; hanya Bendum approve/disburse.
- [ ] Bendum tidak memverifikasi bukti tiket/Medpart dan tidak melihat PII peserta.
- [ ] Reservasi tiket 180 detik berfungsi; Pending Verification tidak auto-expire.
- [ ] Tiket gratis tidak menampilkan QRIS/bukti pembayaran.
- [ ] Cek tiket memakai NIM lalu OTP.
- [ ] Check-in satu tiket satu kali; tidak menjanjikan offline sync otomatis.
- [ ] Bisnis kader melalui review dan publish terpisah.
- [ ] Medpart tracking code dibuat saat submit; approval tidak otomatis publish.
- [ ] Kotak Suara privat.
- [ ] PER-12/SYS-03 memakai notifikasi yang sama.
- [ ] ORG-05/SYS-04 berbeda fungsi dan tidak membuat approval engine kedua.
- [ ] Tidak ada refund tiket/Medpart.

## Quality
- [ ] Semua tombol berfungsi.
- [ ] Semua form mempunyai validasi.
- [ ] Loading/empty/error/success/unauthorized tersedia.
- [ ] Responsive 320 px sampai desktop besar.
- [ ] Keyboard/focus/accessibility diuji.
- [ ] Tidak ada horizontal clipping yang tidak disengaja.
- [ ] Tidak ada console error kritis.
- [ ] Semua acceptance test lulus.
- [ ] `todo.md` memiliki traceability 146/146.

---

## Penutup

`PRD_frontend.md` ini adalah kontrak implementasi frontend-only HIPMI CENTRAL. AI Agent harus membangun seluruh halaman, navigasi, data dummy, role, permission, state, dan business flow sesuai dokumen ini. Tidak boleh mengurangi cakupan hanya karena jumlah halaman besar atau karena sebagian halaman memakai template yang sama.

**Target akhirnya adalah satu website HIPMI CENTRAL yang dapat dijelajahi dan diuji dari awal sampai akhir menggunakan akun demo, dengan data yang saling terhubung, perubahan yang tersimpan di LocalStorage, dan pengalaman yang terasa seperti aplikasi organisasi yang benar-benar berjalan — tanpa mengklaim adanya backend atau transaksi produksi.**
