# TODO — IMPLEMENTASI FRONTEND HIPMI CENTRAL (146 SCREEN IDS)

**Status Proyek:** Selesai (100% Complete)  
**Baseline Dokumen:** `PRD_frontend.md` v1.1 Audited, `design.md` v1.0 (Aurora Glass Editorial), `front end.docx`  
**Cakupan:** 146/146 Screen ID, 16 Kelompok, 28 Akun Demo, 22 Business Flow / 21 Demo Journey  
**Hasil Uji Build:** `next build` Selesai (Exit Code 0, 0 TypeScript Errors)

---

## 📌 Phase Progress Tracker

- [x] **Phase 1: Project Scaffolding, Design Tokens & Aurora Glass Baseline** (Next.js, Tailwind, Tokens, Fonts, Icons)
- [x] **Phase 2: Central Mock Engine & Seed Data** (LocalStorage Store, 28 Akun Demo, Permission Resolver, Demo Control Center `/__demo`)
- [x] **Phase 3: Authentication & Security** (`AUTH-01` s/d `AUTH-06`)
- [x] **Phase 4: Shared Layout Shells & Navigation** (Public Floating Capsule Navbar, Dark Wine Sidebar, Workspace Switcher, `SYS-07..09`)
- [x] **Phase 5: Public Website** (`PUB-01` s/d `PUB-22`)
- [x] **Phase 6: Public Ticketing Engine** (`TKT-01` s/d `TKT-08`)
- [x] **Phase 7: Personal Area** (`PER-01` s/d `PER-12`)
- [x] **Phase 8: Admin Panel & Cabinet Center** (`ADM-01` s/d `ADM-12`)
- [x] **Phase 9: Organization Management & Overview** (`ORG-01` s/d `ORG-06`)
- [x] **Phase 10: Workspace System (Bidang, Kompartemen, Proker)** (`WRK-01` s/d `WRK-10`)
- [x] **Phase 11: Core Operational Modules** (`CAL-01..04`, `COR-01..07`, `FIN-01..10`, `EVT-01..09`, `ATT-01..04`, `DOC-01..06`, `DIR-01..08`, `CMS-01..13`, `SYS-01..06`)
- [x] **Phase 12: Cross-Module Integration, E2E Demo Journeys & Verification** (21 Journeys, Build Validation, Console Error Fix)

---

## 📋 146 Screen Traceability Matrix

### 1. Public Website (`PUB` — 22 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| PUB-01 | `/` | Beranda (Hero Aurora Glass, 4 Prestasi Terbaru, Agenda, Berita) | [x] DONE |
| PUB-02 | `/tentang-kami` | Profil & Sejarah HIPMI PT Universitas Telkom | [x] DONE |
| PUB-03 | `/organisasi/kabinet` | Daftar Kabinet Aktif & Arsip | [x] DONE |
| PUB-04 | `/organisasi/kabinet/:id` | Detail Kabinet & Mindmap Struktur Interaktif | [x] DONE |
| PUB-05 | `/organisasi/bidang` | Daftar Bidang (4 Bidang Utama) | [x] DONE |
| PUB-06 | `/organisasi/bidang/:id` | Detail Profil Bidang & Kompartemen Terkait | [x] DONE |
| PUB-07 | `/organisasi/kompartemen` | Daftar Kompartemen Organisasi | [x] DONE |
| PUB-08 | `/organisasi/kompartemen/:id` | Detail Profil Kompartemen & Proker Terkait | [x] DONE |
| PUB-09 | `/organisasi/program-kerja` | Direktori Program Kerja Terpublikasi | [x] DONE |
| PUB-10 | `/organisasi/program-kerja/:id` | Detail Program Kerja (dengan Coming Soon jika tanggal disembunyikan) | [x] DONE |
| PUB-11 | `/aktivitas/agenda` | Daftar Agenda & Tiket Publik | [x] DONE |
| PUB-12 | `/aktivitas/agenda/:id` | Detail Agenda & Pilihan Tiket | [x] DONE |
| PUB-13 | `/aktivitas/berita` | Portal Berita & Artikel Organisasi | [x] DONE |
| PUB-14 | `/aktivitas/berita/:id` | Detail Baca Berita & Artikel | [x] DONE |
| PUB-15 | `/aktivitas/media-partner` | Informasi Layanan & Paket Media Partner | [x] DONE |
| PUB-16 | `/aktivitas/media-partner/ajukan` | Formulir Pengajuan Media Partner (Tanpa Login) | [x] DONE |
| PUB-17 | `/aktivitas/media-partner/cek-status` | Cek Status Pengajuan Media Partner via Kode Tracking Unik | [x] DONE |
| PUB-18 | `/karya-kader/bisnis` | Direktori Publik Bisnis Kader | [x] DONE |
| PUB-19 | `/karya-kader/bisnis/:id` | Detail Profil Usaha & Kontak Bisnis Kader | [x] DONE |
| PUB-20 | `/karya-kader/prestasi` | Daftar Prestasi Kader Terpublikasi | [x] DONE |
| PUB-21 | `/karya-kader/prestasi/:id` | Detail Prestasi Kader (Tunggal & Multi-Kader) | [x] DONE |
| PUB-22 | `/kotak-suara` | Formulir Aspirasi / Kotak Suara Publik (Receipt Privat) | [x] DONE |

### 2. Public Ticketing (`TKT` — 8 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| TKT-01 | `/aktivitas/agenda/:id/tiket` | Pemilihan Jenis Tiket Berbayar | [x] DONE |
| TKT-02 | `/aktivitas/agenda/:id/daftar` | Formulir Registrasi Peserta (6 Field Identitas) | [x] DONE |
| TKT-03 | `/pendaftaran/:id/bayar` | Instruksi QRIS Demo & Countdown Reservasi 180s | [x] DONE |
| TKT-04 | `/pendaftaran/:id/status` | Status Registrasi & Pembayaran Tiket | [x] DONE |
| TKT-05 | `/aktivitas/agenda/cek-tiket` | Cek Status Tiket via NIM | [x] DONE |
| TKT-06 | `/aktivitas/agenda/cek-tiket/verifikasi` | Verifikasi OTP Demo (`246810`) | [x] DONE |
| TKT-07 | `/aktivitas/agenda/cek-tiket/hasil` | Daftar Tiket Milik Identitas Terverifikasi | [x] DONE |
| TKT-08 | `/tiket/:id` | Detail, Barcode/QR Token & Unduh/Cetak Tiket Demo | [x] DONE |

### 3. Authentication (`AUTH` — 6 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| AUTH-01 | `/masuk` | Login Pengguna + Preset Akun Demo Selector | [x] DONE |
| AUTH-02 | `/daftar` | Registrasi Akun Mahasiswa Biasa (Fakultas & Prodi dependen) | [x] DONE |
| AUTH-03 | `/verifikasi-email` | Simulasi Verifikasi Email Akun Baru | [x] DONE |
| AUTH-04 | `/lupa-password` | Formulir Permintaan Reset Password | [x] DONE |
| AUTH-05 | `/reset-password` | Formulir Password Baru | [x] DONE |
| AUTH-06 | `/status-akun` | Informasi Status Akun (Pending / Inactive / Suspended) | [x] DONE |

### 4. Personal Area (`PER` — 12 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| PER-01 | `/personal/dashboard` | Dashboard Personal Saya | [x] DONE |
| PER-02 | `/personal/profil` | Tampilan Profil Pengguna | [x] DONE |
| PER-03 | `/personal/profil/edit` | Formulir Edit Profil (NIM Terkunci) | [x] DONE |
| PER-04 | `/personal/keamanan` | Pengaturan Keamanan & Password Akun | [x] DONE |
| PER-05 | `/personal/keanggotaan` | Status & Histori Kader (Khusus Kader Verified) / e-KTA Digital | [x] DONE |
| PER-06 | `/personal/riwayat-jabatan` | Riwayat Jabatan & Kepengurusan Organisasi | [x] DONE |
| PER-07 | `/personal/aktivitas` | Rekord Keterlibatan Proker Milik Sendiri | [x] DONE |
| PER-08 | `/personal/tiket` | Daftar Pembelian Tiket & Registrasi Saya | [x] DONE |
| PER-09 | `/personal/presensi` | Riwayat Agenda & Kehadiran Sah (Check-in) | [x] DONE |
| PER-10 | `/personal/bisnis` | Daftar Bisnis Milik Kader | [x] DONE |
| PER-11 | `/personal/bisnis/baru` | Pengajuan / Edit Bisnis Kader | [x] DONE |
| PER-12 | `/personal/notifikasi` | Notifikasi Personal Pengguna | [x] DONE |

### 5. Admin Panel (`ADM` — 12 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| ADM-01 | `/admin/cabinets` | Cabinet Center (Tanpa Sidebar Internal) | [x] DONE |
| ADM-02 | `/admin/cabinets/:cabinetId` | Cabinet Dashboard (Sidebar Internal Aktif) | [x] DONE |
| ADM-03 | `/admin/cabinets/form` | Formulir Tambah / Edit Kabinet | [x] DONE |
| ADM-04 | `/admin/cabinets/:cabinetId/archive` | Detail & Validasi Arsip Kabinet | [x] DONE |
| ADM-05 | `/admin/cabinets/:cabinetId/structure` | Struktur Organisasi (Tab Struktur, Jabatan, Penempatan) | [x] DONE |
| ADM-06 | `/admin/cabinets/:cabinetId/units/:unitId` | Detail / Edit Unit Bidang & Kompartemen | [x] DONE |
| ADM-07 | `/admin/cabinets/:cabinetId/positions` | Master Jabatan & Wewenang | [x] DONE |
| ADM-08 | `/admin/cabinets/:cabinetId/users` | Manajemen Pengguna & Database Kader | [x] DONE |
| ADM-09 | `/admin/cabinets/:cabinetId/users/:userId` | Detail Pengguna & Penetapan Assignment | [x] DONE |
| ADM-10 | `/admin/cabinets/:cabinetId/permissions` | Matriks Role × Permission × Scope | [x] DONE |
| ADM-11 | `/admin/cabinets/:cabinetId/modules` | Konfigurasi Modul & Unit Pengelola | [x] DONE |
| ADM-12 | `/admin/cabinets/:cabinetId/audit` | System Audit Log Administratif (Read-Only) | [x] DONE |

### 6. Organization Management (`ORG` — 6 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| ORG-01 | `/organization/dashboard` | Dashboard Organisasi (Widget Dinamis per Role) | [x] DONE |
| ORG-02 | `/organization/structure` | Overview Struktur Kabinet & Hirarki Unit | [x] DONE |
| ORG-03 | `/organization/fields/:fieldId/monitoring` | Monitoring Bidang (Khusus Kabid / Top Management) | [x] DONE |
| ORG-04 | `/organization/compartments/:compartmentId/monitoring` | Monitoring Kompartemen (Kakom / Kabid) | [x] DONE |
| ORG-05 | `/organization/action-center` | Activity & Action Center (Tindak Lanjut Tugas) | [x] DONE |
| ORG-06 | `/organization/reports` | Statistik & Laporan Kinerja Organisasi | [x] DONE |

### 7. Workspace System (`WRK` — 10 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| WRK-01 | `/workspace/:workspaceId` | Workspace Overview (Bidang, Kompartemen, Proker) | [x] DONE |
| WRK-02 | `/workspace/:workspaceId/information` | Profil Informasi Workspace | [x] DONE |
| WRK-03 | `/workspace/:workspaceId/projects` | Daftar Proker Internal Unit Kompartemen | [x] DONE |
| WRK-04 | `/workspace/:workspaceId/projects/form` | Form Buat Proker (Khusus Kakom) / Edit | [x] DONE |
| WRK-05 | `/workspace/projects/:projectId` | Project 360 Terpadu (8 Tab Terintegrasi) | [x] DONE |
| WRK-06 | `/workspace/projects/:projectId/team` | Roster Tim Pelaksana & Pengelola Workspace | [x] DONE |
| WRK-07 | `/workspace/projects/:projectId/managers` | Assignment Manager Proker (Khusus Kakom) | [x] DONE |
| WRK-08 | `/workspace/projects/:projectId/progress` | Task Board Bersama 4 Kolom & Progres Naratif | [x] DONE |
| WRK-09 | `/workspace/:workspaceId/pleno` | Jadwal Pleno, Notulensi & Keputusan Unit | [x] DONE |
| WRK-10 | `/workspace/projects/:projectId/closure` | Penutupan & Arsip Proker (Checklist Blocker) | [x] DONE |

### 8. Calendar (`CAL` — 4 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| CAL-01 | `/organization/calendar` | Kalender Organisasi (Month / Week / List View) | [x] DONE |
| CAL-02 | `/workspace/:workspaceId/calendar` | Kalender Terfilter Konteks Workspace | [x] DONE |
| CAL-03 | `/calendar/events/:eventId` | Detail Kegiatan Kalender | [x] DONE |
| CAL-04 | `/calendar/events/form` | Form Utama Buat / Edit Jadwal & Agenda (Satu Pintu) | [x] DONE |

### 9. Correspondence (`COR` — 7 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| COR-01 | `/organization/correspondence` | Central Correspondence Dashboard Sekum | [x] DONE |
| COR-02 | `/organization/correspondence/requests` | Daftar Pengajuan Surat Masuk & Keluar | [x] DONE |
| COR-03 | `/organization/correspondence/form` | Form Pengajuan Surat (Umum / Untuk Ditmawa) | [x] DONE |
| COR-04 | `/organization/correspondence/:requestId` | Detail & Review Persuratan (Checklist & Catatan) | [x] DONE |
| COR-05 | `/organization/correspondence/numbering` | Administrasi & Penomoran Surat Otomatis | [x] DONE |
| COR-06 | `/organization/correspondence/ditmawa` | Tracking & Monitoring Dispatch Ditmawa | [x] DONE |
| COR-07 | `/organization/correspondence/archive` | Arsip Persuratan Organisasi | [x] DONE |

### 10. Financial Management (`FIN` — 10 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| FIN-01 | `/organization/finance` | Financial Overview Dashboard Bendum | [x] DONE |
| FIN-02 | `/organization/finance/transactions` | Buku Kas & Daftar Transaksi Organisasi | [x] DONE |
| FIN-03 | `/organization/finance/transactions/form` | Input Transaksi Kas | [x] DONE |
| FIN-04 | `/organization/finance/requests` | Daftar Pengajuan Dana Unit & Proker | [x] DONE |
| FIN-05 | `/organization/finance/requests/form` | Form Pengajuan Dana (Direct ke Bendum) | [x] DONE |
| FIN-06 | `/organization/finance/requests/:requestId` | Review & Persetujuan Dana oleh Bendum | [x] DONE |
| FIN-07 | `/organization/finance/disbursements` | Pencairan Termin & Konfirmasi Penerimaan Dana | [x] DONE |
| FIN-08 | `/organization/finance/units/:unitId` | Buku Kas Internal Unit / Proker | [x] DONE |
| FIN-09 | `/organization/finance/revenue` | Monitoring Agregat Pendapatan Tiket & Medpart | [x] DONE |
| FIN-10 | `/organization/finance/reports` | Laporan Keuangan Organisasi (Arus Kas & Neraca) | [x] DONE |

### 11. Event Management (`EVT` — 9 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| EVT-01 | `/organization/events/dashboard` | Dashboard Pengelolaan Event & Tiket Internal | [x] DONE |
| EVT-02 | `/organization/events` | Daftar Agenda & Event Internal | [x] DONE |
| EVT-03 | `/organization/events/form` | Entry Shortcut Buat Agenda (Alias ke CAL-04) | [x] DONE |
| EVT-04 | `/organization/events/:eventId` | Detail & Pengaturan Event (6 Tab) | [x] DONE |
| EVT-05 | `/organization/events/:eventId/ticket-types` | Manajemen Jenis Tiket, Harga & Kuota | [x] DONE |
| EVT-06 | `/organization/events/:eventId/participants` | Database Peserta Terdaftar | [x] DONE |
| EVT-07 | `/organization/events/:eventId/payments` | Verifikasi Bukti Pembayaran Tiket oleh Organizer | [x] DONE |
| EVT-08 | `/organization/events/:eventId/delivery` | Pengiriman & Riwayat Email Tiket Demo | [x] DONE |
| EVT-09 | `/organization/events/:eventId/reports` | Laporan Penjualan Tiket & Kehadiran Event | [x] DONE |

### 12. Attendance (`ATT` — 4 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| ATT-01 | `/organization/events/:eventId/check-in` | Dashboard Presensi & Kehadiran Event | [x] DONE |
| ATT-02 | `/organization/events/:eventId/scanner` | Scanner Barcode/QR Demo + Fallback Manual | [x] DONE |
| ATT-03 | `/organization/events/:eventId/attendance` | Rekapitulasi Daftar Hadir Peserta | [x] DONE |
| ATT-04 | `/organization/events/:eventId/check-in/:ticketId` | Check-in Manual Petugas | [x] DONE |

### 13. Documents & LPJ (`DOC` — 6 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| DOC-01 | `/organization/documents` | Document Center Organisasi | [x] DONE |
| DOC-02 | `/organization/documents/form` | Form Tambah / Update Dokumen | [x] DONE |
| DOC-03 | `/organization/documents/:documentId` | Detail Metadata, Riwayat Versi & Relasi | [x] DONE |
| DOC-04 | `/organization/lpj` | Manajemen Antrean LPJ Proker | [x] DONE |
| DOC-05 | `/organization/lpj/:lpjId` | Form & Review LPJ 7 Bagian Terintegrasi | [x] DONE |
| DOC-06 | `/organization/documents/archive` | Arsip Dokumen Historis Kabinet | [x] DONE |

### 14. Directories (`DIR` — 8 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| DIR-01 | `/organization/directory/cadres` | Database Kader HIPMI (PSDM / Admin) | [x] DONE |
| DIR-02 | `/organization/directory/cadres/:cadreId` | Detail Profil & Rekam Jejak Kader | [x] DONE |
| DIR-03 | `/organization/directory/cadres/verification` | Verifikasi & Penautan Akun Mahasiswa ke Kader | [x] DONE |
| DIR-04 | `/organization/directory/businesses` | Database Pengajuan Bisnis Kader | [x] DONE |
| DIR-05 | `/organization/directory/businesses/:businessId` | Verifikasi & Keputusan Publikasi Bisnis | [x] DONE |
| DIR-06 | `/organization/directory/companies` | Direktori Perusahaan & Mitra Strategis | [x] DONE |
| DIR-07 | `/organization/directory/companies/:companyId` | Detail Perusahaan & Kontak PIC Privat | [x] DONE |
| DIR-08 | `/organization/directory/partnership-history` | Riwayat Kerja Sama & Kemitraan Proker | [x] DONE |

### 15. CMS & Content Management (`CMS` — 13 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| CMS-01 | `/organization/cms` | CMS Dashboard | [x] DONE |
| CMS-02 | `/organization/cms/homepage` | Homepage & Public Content Section Editor | [x] DONE |
| CMS-03 | `/organization/cms/media` | Media Library & Asset Manager | [x] DONE |
| CMS-04 | `/organization/cms/articles` | Manajemen Berita & Artikel Organisasi | [x] DONE |
| CMS-05 | `/organization/cms/articles/form` | Editor Artikel (Draft, Preview, Publish) | [x] DONE |
| CMS-06 | `/organization/cms/achievements` | Manajemen Prestasi Kader | [x] DONE |
| CMS-07 | `/organization/cms/achievements/form` | Form & Verifikasi Prestasi (Single / Multi-Kader) | [x] DONE |
| CMS-08 | `/organization/cms/medpart` | Dashboard Pengajuan Media Partner | [x] DONE |
| CMS-09 | `/organization/cms/medpart/:submissionId` | Detail & Verifikasi Pengajuan Medpart | [x] DONE |
| CMS-10 | `/organization/cms/medpart/packages` | Konfigurasi Paket & QRIS Demo Medpart | [x] DONE |
| CMS-11 | `/organization/cms/medpart/publication` | Antrean & Eksekusi Publikasi Manual Medpart | [x] DONE |
| CMS-12 | `/organization/cms/feedback` | Manajemen Kotak Suara Privat | [x] DONE |
| CMS-13 | `/organization/cms/feedback/:feedbackId` | Triage, Routing & Tindak Lanjut Aspirasi | [x] DONE |

### 16. System Shared & Error States (`SYS` — 9 Screens)
| Screen ID | Canonical Route | Deskripsi Halaman | Status |
|---|---|---|---|
| SYS-01 | `/system/statistics` | Dashboard Statistik Organisasi | [x] DONE |
| SYS-02 | `/system/reports/:reportId` | Detailed Organization Report Viewer | [x] DONE |
| SYS-03 | `/notifications` | Shared Notification Center | [x] DONE |
| SYS-04 | `/approvals` | Shared Approval Center (Deep Link ke Modul Asli) | [x] DONE |
| SYS-05 | `/activity` | Activity History Organisasi | [x] DONE |
| SYS-06 | `/search` | Global Search Results (Scope-Filtered) | [x] DONE |
| SYS-07 | `/403` | Halaman Unauthorized / Access Denied | [x] DONE |
| SYS-08 | `/404` | Halaman Not Found | [x] DONE |
| SYS-09 | `/500` | Halaman System Error / Safe Unavailable | [x] DONE |

---

## 🛠️ Demo Control Center (`/__demo`)
Fitur utilitas pengujian pengembang:
- [x] Selector 28 Akun Preset Demo (1-click switch via floating panel)
- [x] Tampilan Kode OTP Uji Demo (`246810`)
- [x] Tombol Reset Database LocalStorage ke Seed Asli
- [x] Indikator Status Akun & Workspace Aktif
