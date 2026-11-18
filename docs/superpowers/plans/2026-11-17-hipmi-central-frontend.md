# HIPMI CENTRAL Frontend Implementation Plan (146 Screen IDs)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun website frontend organisasi HIPMI CENTRAL (HIPMI PT Universitas Telkom, kabinet ARTHAKARSA) secara interaktif, mencakup seluruh 146 Screen ID dalam 16 kelompok fungsional, 28 preset akun demo, 22 Business Flow / 21 Demo Journey, berbasis central mock repository di LocalStorage dan visual Aurora Glass Editorial.

**Architecture:** Frontend Single-Page / App Router Application menggunakan Next.js App Router, Tailwind CSS, Framer Motion, dan Lucide React. Seluruh mutasi data dan hak akses dijalankan melalui Single Centralized Mock Store (LocalStorage `hipmi-central-demo:v1.1:mock-store`) dengan permission resolver berbasis `Role × Permission × Assignment × Scope`.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Google Fonts (`Poppins` + `Playfair Display`/Serif Editorial fallback).

**Spec:**
- `docs/PRD_frontend.md` (PRD Frontend v1.1 Audited)
- `docs/design.md` (Design System v1.0 — Aurora Glass Editorial)
- `docs/front end.docx` (System Analyst & Baseline Inventory)

---

## Global Constraints

- **146/146 Screen ID Wajib Tersedia:** Tidak ada Screen ID yang dihapus, diganti, atau dihilangkan. Seluruh route canonical terdaftar.
- **Frontend-Only / Zero Real Backend:** Tidak ada Supabase, PostgreSQL, server API, payment gateway, atau email eksternal. Semua disimulasikan melalui local mock services.
- **Single Source of Truth:** Semua halaman dan widget membaca & memutasi state dari satu mock store terpusat di LocalStorage. Tidak boleh ada array data dummy lokal yang berdiri sendiri di komponen.
- **Permission & Scope Isolation:** Penyembunyian menu visual bukan satu-satunya guard; mock services dan route guard wajib memvalidasi izin dan scope pengguna sebelum mutasi.
- **Visual Aurora Glass Editorial:** Mengikuti token `design.md`: Burgundy `#5A1722`, Dark Wine `#3D0F16`, Warm Ivory `#FDF7F2`, Antique Gold `#E8B577`, Muted Copper `#AF7D66`, Blush `#F2E4DC`. Floating glass capsule navbar untuk publik, solid table/form untuk data-dense panels.
- **Single Agenda Form:** `CAL-04` adalah satu-satunya form pembuatan agenda; `EVT-03` dan tombol Workspace adalah alias/shortcut yang mengisi konteks otomatis.
- **Shared Workspace Engine:** Workspace Bidang, Kompartemen, dan Proker menggunakan template `WRK-01`/`WRK-02` yang sama dengan data dan navigasi dinamis sesuai `workspaceType`.

---

## Review Focus

1. **Session & Persistence Isolation:** Saat switch akun demo via Demo Control Center, state permission, sidebar, dan scope harus berganti bersih tanpa membawa sisa state akun sebelumnya.
2. **Cross-Module Reactive Updates:** Approval pembayaran tiket di `EVT-07` harus seketika mengubah status di `TKT-04`, menerbitkan tiket di `PER-08` / `TKT-08`, menambah kuota terjual di `EVT-09`, dan menambah kas agregat di `FIN-09`.
3. **No Direct Mutation on Read-Only Roles:** Anggota roster biasa hanya boleh melihat record partisipasi miliknya sendiri di `PER-07` dan tidak boleh melihat roster lengkap atau Task Board manager.
4. **Reservation 180s Timer Accuracy:** Countdown reservasi tiket dihitung dari timestamp expiry yang tersimpan di LocalStorage agar tetap akurat saat halaman di-refresh.
5. **No Data Leakage on 403 / 404:** Route guard untuk resource privat yang tidak diizinkan menampilkan `SYS-07` (403) tanpa membocorkan nama atau isi data di dalamnya.

---

## Urutan Rencana Pengerjaan (Phased Roadmap)

```text
Phase 1: Project Scaffolding, Design Tokens & Aurora Glass Baseline
Phase 2: Central Mock Engine, Deterministic Seed (28 Akun) & Demo Control Center
Phase 3: Authentication & Account Security (AUTH-01 s/d AUTH-06)
Phase 4: Shared Layout Shells, Navigation & System Pages (SYS-07, 08, 09, BrandLoader)
Phase 5: Public Website (PUB-01 s/d PUB-22)
Phase 6: Public Ticketing Engine (TKT-01 s/d TKT-08)
Phase 7: Personal Area (PER-01 s/d PER-12)
Phase 8: Admin Panel & Cabinet Center (ADM-01 s/d ADM-12)
Phase 9: Organization Management & Overview (ORG-01 s/d ORG-06)
Phase 10: Workspace System (WRK-01 s/d WRK-10 — Bidang, Kompartemen, Proker)
Phase 11: Core Operational Modules (CAL, COR, FIN, EVT, ATT, DOC, DIR, CMS, SYS)
Phase 12: Cross-Module Integration, E2E Demo Journeys & Final Verification
```

---

### Phase 1: Project Scaffolding, Design Tokens & Aurora Glass Baseline

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`
- Create: `src/app/layout.tsx`, `src/app/globals.css`
- Create: `src/styles/tokens.css`, `src/styles/glass.css`
- Create: `src/components/ui/decorative-lines.tsx`, `src/components/ui/brand-loader.tsx`

**Interfaces:**
- Produces: CSS Variables & Tailwind utilities untuk palet warna, tipografi, radius, shadow, glassmorphism, dan line art dekoratif.

- [ ] **Step 1.1: Inisialisasi dependensi inti**
  - Pasang: `next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`, `clsx`, `tailwind-merge`.
  - Pertahankan `framer-motion` (`^14.14.0`).
- [ ] **Step 1.2: Konfigurasi Tailwind & CSS Tokens sesuai `design.md`**
  - Daftarkan warna: `brand-burgundy` (`#5A1722`), `brand-dark-wine` (`#3D0F16`), `brand-antique-gold` (`#E8B577`), `brand-muted-copper` (`#AF7D66`), `brand-warm-ivory` (`#FDF7F2`), `surface-blush` (`#F2E4DC`), dll.
  - Setup font family: `font-ui` (Poppins) dan `font-display` (Serif Display / Playfair Display Google Fonts fallback).
- [ ] **Step 1.3: Buat utilitas Glassmorphism & SVG Line Art Primitives**
  - Implementasikan `.glass-navbar`, `.glass-floating`, `.glass-dropdown`, `.glass-card`.
  - Buat komponen SVG `DecorativeLines` (Contour, Flowing Ribbon, Orbit/Arch) dengan `aria-hidden="true"` dan `pointer-events-none`.
- [ ] **Step 1.4: Verifikasi build awal**
  - Jalankan `npm run build` atau `npx next build` untuk memastikan kompilasi CSS dan TypeScript lolos tanpa error.

---

### Phase 2: Central Mock Engine, Deterministic Seed & Demo Control Center

**Files:**
- Create: `src/types/domain.ts` (Seluruh tipe data simulasi)
- Create: `src/lib/mock/store.ts` (LocalStorage repository engine)
- Create: `src/lib/mock/seed.ts` (Katalog data fixture Bagian 11.7)
- Create: `src/lib/mock/services/*` (Auth, Cabinet, Project, Roster, Correspondence, Finance, Event, Ticket, Attendance, CMS, Feedback)
- Create: `src/lib/auth/permission-resolver.ts` (Resolver Role × Permission × Assignment × Scope)
- Create: `src/components/demo/demo-control-center.tsx` (Floating dev widget)
- Create: `src/app/__demo/page.tsx` (Halaman kontrol demo penuh)

**Interfaces:**
- Consumes: LocalStorage API.
- Produces: `useMockStore`, `authService`, `permissionService`, `eventService`, dll.

- [ ] **Step 2.1: Definisikan domain TypeScript interfaces**
  - Tulis tipe lengkap: `User`, `Profile`, `Cadre`, `Cabinet`, `Field`, `Compartment`, `Project`, `RosterMember`, `Task`, `CalendarEvent`, `Correspondence`, `FinanceTransaction`, `FundRequest`, `Disbursement`, `TicketType`, `Registration`, `Ticket`, `Attendance`, `Document`, `LPJ`, `Business`, `Company`, `Article`, `Achievement`, `MedpartSubmission`, `Feedback`, `Notification`, `ActivityHistory`, `AuditEvent`.
- [ ] **Step 2.2: Implementasikan seed fixture catalog deterministik**
  - Masukkan data 28 Akun Demo (`DEMO-01` s/d `DEMO-28`) lengkap dengan password `HIPMI-Demo-2026!`, NIM, role, status kader, assignment.
  - Masukkan fixture kabinet (`cab-arthakarsa-2627`, `cab-demo-2526`), 4 bidang, 8 kompartemen, 8 proker, 24 roster records, 12 tasks (To Do, In Progress, Blocked, Done), agenda, jenis tiket, surat, pengajuan dana, bisnis, artikel, medpart.
- [ ] **Step 2.3: Buat LocalStorage Store Engine dengan Auto-Initialize & Reset**
  - Namespace key: `hipmi-central-demo:v1.1:mock-store`, `session`, `preferences`.
  - Fungsi `resetToSeed()`, `getSnapshot()`, `subscribe()`, `mutate()`.
- [ ] **Step 2.4: Implementasikan Permission Resolver**
  - Logika evaluasi: akun aktif, role dasar, assignment aktif pada unit/proker, scope kabinet/bidang/kompartemen/proker, dan status penutupan.
- [ ] **Step 2.5: Buat UI Demo Control Center**
  - Widget mengambang di pojok kanan bawah: Switch 28 Akun Demo dengan 1 klik, tampilkan kode OTP demo (`246810`), countdown timer reset, tombol "Reset ke Data Awal".

---

### Phase 3: Authentication & Account Security (AUTH-01 s/d AUTH-06)

**Files:**
- Create: `src/app/(auth)/layout.tsx` (Card form terpusat, background warm ivory + ribbon)
- Create: `src/app/masuk/page.tsx` (`AUTH-01` Login)
- Create: `src/app/daftar/page.tsx` (`AUTH-02` Registrasi)
- Create: `src/app/verifikasi-email/page.tsx` (`AUTH-03` Verifikasi Email)
- Create: `src/app/lupa-password/page.tsx` (`AUTH-04` Lupa Password)
- Create: `src/app/reset-password/page.tsx` (`AUTH-05` Reset Password)
- Create: `src/app/status-akun/page.tsx` (`AUTH-06` Status Akun Terblokir/Pending)
- Create: `src/components/auth/demo-account-selector.tsx`

**Interfaces:**
- Consumes: `authService`, `useMockStore`.
- Produces: Session demo aktif, route guard redirect.

- [ ] **Step 3.1: Buat AuthLayout & shared auth card**
  - Form card solid white dengan border tipis dan logo ARTHAKARSA / HIPMI.
- [ ] **Step 3.2: Implementasikan AUTH-01 (`/masuk`)**
  - Input email, password, show/hide, tombol Masuk, tombol "Pilih Akun Demo Preset", validasi kredensial.
  - Redirect: Mahasiswa/Kader ke `/personal`, Pengurus/Manager ke `/personal` (dengan Area Switcher), Admin ke `/admin/cabinets`. Jika pending/suspended redirect ke `/status-akun`.
- [ ] **Step 3.3: Implementasikan AUTH-02 (`/daftar`)**
  - Input Nama, NIM, Email, Telepon, Dropdown Fakultas & Program Studi dependen, password, konfirmasi, consent.
  - Registrasi menghasilkan akun Mahasiswa Biasa (`verification_pending`) dan diarahkan ke `/verifikasi-email`.
- [ ] **Step 3.4: Implementasikan AUTH-03 s/d AUTH-06**
  - `/verifikasi-email`: Tombol simulasikan verifikasi dengan OTP `246810`.
  - `/lupa-password` & `/reset-password`: Form reset password demo.
  - `/status-akun`: Menampilkan status `verification_pending`, `inactive`, atau `suspended` dengan instruksi pemulihan.

---

### Phase 4: Shared Layout Shells, Navigation & System UI

**Files:**
- Create: `src/components/layout/public-navbar.tsx` (Floating glass capsule)
- Create: `src/components/layout/public-footer.tsx` (Dark wine statement footer)
- Create: `src/components/layout/dashboard-sidebar.tsx` (Dark wine collapsible sidebar + sliding active pill)
- Create: `src/components/layout/dashboard-topbar.tsx` (Glass topbar, global search, notification bell, user profile, area switcher, workspace switcher)
- Create: `src/components/layout/area-switcher.tsx` & `src/components/layout/workspace-switcher.tsx`
- Create: `src/app/(public)/layout.tsx`, `src/app/(internal)/layout.tsx`
- Create: `src/app/403/page.tsx` (`SYS-07`), `src/app/404/page.tsx` (`SYS-08`), `src/app/500/page.tsx` (`SYS-09`)

**Interfaces:**
- Consumes: `permissionService`, current session.
- Produces: Persistent navigation shell untuk seluruh 146 layar.

- [ ] **Step 4.1: Implementasikan Public Floating Navbar (KPM-Inspired)**
  - Container kapsul melayang dengan 6 menu utama (Beranda, Tentang Kami, Organisasi, Aktivitas, Karya Kader, Kotak Suara) + Search + Masuk/Gabung HIPMI.
  - Mega dropdown dengan asset slot ilustrasi `assest_navbar_dropdown/` untuk masing-masing menu.
  - Sliding active indicator menggunakan Framer Motion.
- [ ] **Step 4.2: Implementasikan Dashboard Shell (Dark Wine Sidebar + Topbar)**
  - Sidebar dinamis yang bereaksi terhadap role dan permission aktif (Personal, Organization, Workspace, Admin).
  - Topbar memuat Workspace Switcher (Bidang, Kompartemen, Proker) dan Area Switcher.
- [ ] **Step 4.3: Implementasikan Halaman Error Sistem (SYS-07, SYS-08, SYS-09)**
  - Menggunakan ilustrasi `01-error.png` dan `02-not-found.png`, pesan aman tanpa kebocoran data teknis/internal.

---

### Phase 5: Public Website (PUB-01 s/d PUB-22)

**Files:**
- Create: `src/app/(public)/page.tsx` (`PUB-01` Beranda)
- Create: `src/app/(public)/tentang-kami/page.tsx` (`PUB-02`)
- Create: `src/app/(public)/organisasi/kabinet/page.tsx` (`PUB-03`) & `[id]/page.tsx` (`PUB-04`)
- Create: `src/app/(public)/organisasi/bidang/page.tsx` (`PUB-05`) & `[id]/page.tsx` (`PUB-06`)
- Create: `src/app/(public)/organisasi/kompartemen/page.tsx` (`PUB-07`) & `[id]/page.tsx` (`PUB-08`)
- Create: `src/app/(public)/organisasi/program-kerja/page.tsx` (`PUB-09`) & `[id]/page.tsx` (`PUB-10`)
- Create: `src/app/(public)/aktivitas/agenda/page.tsx` (`PUB-11`) & `[id]/page.tsx` (`PUB-12`)
- Create: `src/app/(public)/aktivitas/berita/page.tsx` (`PUB-13`) & `[id]/page.tsx` (`PUB-14`)
- Create: `src/app/(public)/aktivitas/media-partner/page.tsx` (`PUB-15`), `ajukan/page.tsx` (`PUB-16`), `cek-status/page.tsx` (`PUB-17`)
- Create: `src/app/(public)/karya-kader/bisnis/page.tsx` (`PUB-18`) & `[id]/page.tsx` (`PUB-19`)
- Create: `src/app/(public)/karya-kader/prestasi/page.tsx` (`PUB-20`) & `[id]/page.tsx` (`PUB-21`)
- Create: `src/app/(public)/kotak-suara/page.tsx` (`PUB-22`)

**Interfaces:**
- Consumes: Proyeksi data publik (hanya data berstatus `published`).
- Produces: 22 halaman publik yang responsif dan interaktif.

- [ ] **Step 5.1: Bangun Beranda PUB-01 (Aurora Glass Editorial Hero)**
  - Hero Warm Ivory/Blush, foto pimpinan/siluet, 4 prestasi terbaru published, bisnis pilihan, agenda mendatang, berita.
- [ ] **Step 5.2: Bangun Organisasi PUB-03 s/d PUB-10**
  - Mindmap interaktif struktur kabinet (PUB-04), kartu bidang (PUB-05/06) dengan aset `asset_bidang/`, kompartemen (PUB-07/08), dan Proker Published (PUB-09/10 dengan badge "Coming Soon" jika tanggal disembunyikan).
- [ ] **Step 5.3: Bangun Aktivitas & Berita PUB-11 s/d PUB-14**
  - Agenda formal gratis/berbayar + detail, artikel berita dan pembaca artikel.
- [ ] **Step 5.4: Bangun Media Partner Flow PUB-15, 16, 17**
  - Formulir pengajuan publik tanpa login (PUB-16) menghasilkan kode tracking unik (misal `MP-DEMO-0007`).
  - Halaman cek status (PUB-17) memvalidasi status pengajuan melalui kode tracking.
- [ ] **Step 5.5: Bangun Karya Kader & Kotak Suara PUB-18 s/d PUB-22**
  - Direktori bisnis kader published (PUB-18/19), prestasi kader (PUB-20/21), dan Kotak Suara (PUB-22) dengan receipt privat.

---

### Phase 6: Public Ticketing Engine (TKT-01 s/d TKT-08)

**Files:**
- Create: `src/app/(public)/aktivitas/agenda/[id]/tiket/page.tsx` (`TKT-01`)
- Create: `src/app/(public)/aktivitas/agenda/[id]/daftar/page.tsx` (`TKT-02`)
- Create: `src/app/(public)/pendaftaran/[id]/bayar/page.tsx` (`TKT-03`)
- Create: `src/app/(public)/pendaftaran/[id]/status/page.tsx` (`TKT-04`)
- Create: `src/app/(public)/aktivitas/agenda/cek-tiket/page.tsx` (`TKT-05`)
- Create: `src/app/(public)/aktivitas/agenda/cek-tiket/verifikasi/page.tsx` (`TKT-06`)
- Create: `src/app/(public)/aktivitas/agenda/cek-tiket/hasil/page.tsx` (`TKT-07`)
- Create: `src/app/(public)/tiket/[id]/page.tsx` (`TKT-08`)
- Create: `src/components/ticket/ticket-card.tsx`, `src/components/ticket/qris-modal.tsx`

**Interfaces:**
- Consumes: `ticketService`, `eventService`.
- Produces: Tiket terbit, token barcode, countdown reservasi.

- [ ] **Step 6.1: Implementasikan TKT-01 (Pilih Tiket) & TKT-02 (Form Registrasi)**
  - Form peserta 6 field: Nama, NIM, Telepon, Email, Fakultas, Prodi.
  - Tiket gratis langsung diterbitkan dan diarahkan ke TKT-04 -> TKT-08.
- [ ] **Step 6.2: Implementasikan TKT-03 (Pembayaran QRIS & Timer 180s)**
  - Countdown 180 detik saat klik "Bayar Sekarang". Upload bukti bayar simulasi sebelum expiry.
  - Submit bukti mengubah status menjadi `pending_verification` (kuota tetap tertahan).
- [ ] **Step 6.3: Implementasikan TKT-04 & TKT-08 (Status & Detail Tiket)**
  - TKT-04: Menampilkan status reserved / pending verification / approved / rejected.
  - TKT-08: Kartu tiket resmi dengan token QR/barcode demo, status check-in, dan tombol Cetak/Unduh PDF preview.
- [ ] **Step 6.4: Implementasikan TKT-05, TKT-06, TKT-07 (Cek Tiket via NIM + OTP)**
  - TKT-05: Input NIM saja -> Minta OTP demo.
  - TKT-06: Verifikasi OTP `246810` dengan cooldown dan limit lockout.
  - TKT-07: Daftar tiket terverifikasi milik NIM tersebut -> Buka TKT-08.

---

### Phase 7: Personal Area (PER-01 s/d PER-12)

**Files:**
- Create: `src/app/(internal)/personal/page.tsx` (`PER-01` Dashboard Saya)
- Create: `src/app/(internal)/personal/profile/page.tsx` (`PER-02`) & `edit/page.tsx` (`PER-03`)
- Create: `src/app/(internal)/personal/security/page.tsx` (`PER-04`)
- Create: `src/app/(internal)/personal/membership/page.tsx` (`PER-05` Khusus Kader Verified)
- Create: `src/app/(internal)/personal/positions/page.tsx` (`PER-06`)
- Create: `src/app/(internal)/personal/projects/page.tsx` (`PER-07` Keterlibatan Proker Sendiri)
- Create: `src/app/(internal)/personal/tickets/page.tsx` (`PER-08` Tiket Saya)
- Create: `src/app/(internal)/personal/attendance/page.tsx` (`PER-09` Riwayat Hadir)
- Create: `src/app/(internal)/personal/businesses/page.tsx` (`PER-10`) & `form/page.tsx` (`PER-11`)
- Create: `src/app/(internal)/personal/notifications/page.tsx` (`PER-12`)

**Interfaces:**
- Consumes: Current logged-in user context.
- Produces: Area personal mahasiswa, kader, dan anggota roster.

- [ ] **Step 7.1: Implementasikan PER-01 (Dashboard Saya) & PER-02/03/04 (Profil & Keamanan)**
  - Widget profil, tiket aktif, agenda mendatang, aktivitas akun. Form edit profil (NIM terkunci).
- [ ] **Step 7.2: Implementasikan PER-05 & PER-06 (Keanggotaan & Riwayat Jabatan - Khusus Kader)**
  - Guard: Mahasiswa biasa tidak dapat mengakses PER-05/06/10/11.
  - Menampilkan status kader, tanggal verifikasi, histori jabatan dan proker.
- [ ] **Step 7.3: Implementasikan PER-07, 08, 09 (Aktivitas, Tiket & Kehadiran)**
  - PER-07: Hanya record keterlibatan proker milik sendiri (bukan roster penuh).
  - PER-08: Seluruh tiket agenda yang dimiliki user.
  - PER-09: Kehadiran hanya dihitung jika sudah dilakukan check-in.
- [ ] **Step 7.4: Implementasikan PER-10 & PER-11 (Bisnis Saya) dan PER-12 (Notifikasi)**
  - Pengajuan bisnis kader (draft, review, revision, approved). Notifikasi personal dengan status read/unread.

---

### Phase 8: Admin Panel & Cabinet Center (ADM-01 s/d ADM-12)

**Files:**
- Create: `src/app/(internal)/admin/cabinets/page.tsx` (`ADM-01` Cabinet Center tanpa sidebar)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/page.tsx` (`ADM-02` Cabinet Dashboard)
- Create: `src/app/(internal)/admin/cabinets/form/page.tsx` (`ADM-03`) & `archive/page.tsx` (`ADM-04`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/structure/page.tsx` (`ADM-05` 3 Tab)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/units/[unitId]/page.tsx` (`ADM-06`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/positions/page.tsx` (`ADM-07`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/users/page.tsx` (`ADM-08`) & `[userId]/page.tsx` (`ADM-09`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/permissions/page.tsx` (`ADM-10`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/modules/page.tsx` (`ADM-11`)
- Create: `src/app/(internal)/admin/cabinets/[cabinetId]/audit/page.tsx` (`ADM-12`)

**Interfaces:**
- Consumes: Role `system_admin`.
- Produces: Manajemen kabinet, struktur, users, permissions, konfigurasi, dan audit log.

- [ ] **Step 8.1: Implementasikan ADM-01 (Cabinet Center) & ADM-02 (Cabinet Dashboard)**
  - ADM-01 terbuka tanpa sidebar admin, menampilkan seluruh kabinet.
  - Memilih kabinet membuka ADM-02 dengan sidebar Admin Panel aktif.
- [ ] **Step 8.2: Implementasikan ADM-03 & ADM-04 (Form Kabinet & Detail/Arsip)**
  - Form kabinet draft/active/archived. Validasi penutupan arsip kabinet.
- [ ] **Step 8.3: Implementasikan ADM-05, 06, 07 (Struktur, Unit & Master Jabatan)**
  - Hierarki Kabinet -> Bidang -> Kompartemen. Master jabatan dan level wewenang.
- [ ] **Step 8.4: Implementasikan ADM-08 & 09 (Manajemen Pengguna & Assignment)**
  - Tab Identitas, Keanggotaan, Jabatan, Permission, Riwayat. Koreksi NIM dan status penugasan.
- [ ] **Step 8.5: Implementasikan ADM-10, 11, 12 (Matriks Akses, Modul & Audit Log)**
  - Grid Role x Permission x Scope. Konfigurasi modul kabinet. Audit log aktivitas administratif read-only.

---

### Phase 9: Organization Management & Overview (ORG-01 s/d ORG-06)

**Files:**
- Create: `src/app/(internal)/organization/dashboard/page.tsx` (`ORG-01`)
- Create: `src/app/(internal)/organization/structure/page.tsx` (`ORG-02`)
- Create: `src/app/(internal)/organization/fields/[fieldId]/monitoring/page.tsx` (`ORG-03`)
- Create: `src/app/(internal)/organization/compartments/[compartmentId]/monitoring/page.tsx` (`ORG-04`)
- Create: `src/app/(internal)/organization/action-center/page.tsx` (`ORG-05`)
- Create: `src/app/(internal)/organization/reports/page.tsx` (`ORG-06`)

**Interfaces:**
- Consumes: Assignment pengurus aktif / Top Management.
- Produces: Dashboard operasional organisasi, monitoring bidang/kompartemen, action center.

- [ ] **Step 9.1: Implementasikan ORG-01 (Dashboard Organisasi)**
  - Template tunggal dengan widget dinamis sesuai role (Top Management, Sekum, Bendum, Kabid, Kakom, Staff).
  - Tidak ada persentase progres numerik proker.
- [ ] **Step 9.2: Implementasikan ORG-02, 03, 04 (Struktur & Monitoring Unit)**
  - ORG-02: Struktur kabinet & overview pengurus.
  - ORG-03: Monitoring Bidang untuk Kabid / Top Management (read-only ke unit anak).
  - ORG-04: Monitoring Kompartemen untuk Kakom / Kabid.
- [ ] **Step 9.3: Implementasikan ORG-05 (Action Center) & ORG-06 (Statistik & Laporan)**
  - ORG-05: Antrean pengajuan dan aktivitas yang menunggu tindakan pengguna.
  - ORG-06: Laporan rekapitulasi agregat organisasi dengan filter periode.

---

### Phase 10: Workspace System (WRK-01 s/d WRK-10 — Tiga Konteks)

**Files:**
- Create: `src/app/(internal)/workspace/[workspaceId]/page.tsx` (`WRK-01` Overview)
- Create: `src/app/(internal)/workspace/[workspaceId]/information/page.tsx` (`WRK-02`)
- Create: `src/app/(internal)/workspace/[workspaceId]/projects/page.tsx` (`WRK-03`)
- Create: `src/app/(internal)/workspace/[workspaceId]/projects/form/page.tsx` (`WRK-04`)
- Create: `src/app/(internal)/workspace/projects/[projectId]/page.tsx` (`WRK-05` Project 360)
- Create: `src/app/(internal)/workspace/projects/[projectId]/team/page.tsx` (`WRK-06` Roster)
- Create: `src/app/(internal)/workspace/projects/[projectId]/managers/page.tsx` (`WRK-07` Assignment Manager)
- Create: `src/app/(internal)/workspace/projects/[projectId]/progress/page.tsx` (`WRK-08` Task Board)
- Create: `src/app/(internal)/workspace/[workspaceId]/pleno/page.tsx` (`WRK-09`)
- Create: `src/app/(internal)/workspace/projects/[projectId]/closure/page.tsx` (`WRK-10` Penutupan Proker)
- Create: `src/components/workspace/task-board.tsx`

**Interfaces:**
- Consumes: Parameter `workspaceType` (field, compartment, project).
- Produces: Ruang kerja operasional unit & proker.

- [ ] **Step 10.1: Implementasikan WRK-01 & WRK-02 (Tiga Konteks Workspace)**
  - Mendukung context: Bidang (read-only monitoring unit turunan), Kompartemen (kelola staff & buat proker), dan Proker (pelaksanaan teknis).
- [ ] **Step 10.2: Implementasikan WRK-03 & WRK-04 (Daftar & Form Proker)**
  - Hanya Kakom yang dapat membuat draft Proker baru. Logo wajib sebelum Ongoing / Published.
- [ ] **Step 10.3: Implementasikan WRK-05 (Project 360 - 8 Tab Terpadu)**
  - 8 Tab: Overview, Informasi, Roster, Agenda, Persuratan, Keuangan, Dokumen & LPJ, Riwayat (semua membaca `project_id` yang sama).
- [ ] **Step 10.4: Implementasikan WRK-06 (Roster) & WRK-07 (Penunjukan Manager)**
  - Tab Anggota Tim dan Pengelola Workspace. Hanya Kakom yang berhak menunjuk Manager (wajib kader verified dan punya akun).
- [ ] **Step 10.5: Implementasikan WRK-08 (Task Board 4 Kolom) & WRK-09 (Pleno)**
  - Task board bersama: To Do, In Progress, Blocked, Done (drag-and-drop, tanpa PIC individual).
  - Catatan capaian, kendala, dan rencana naratif.
- [ ] **Step 10.6: Implementasikan WRK-10 (Penutupan Proker)**
  - Checklist blocker: LPJ Approved, Surat selesai, Seluruh dana settled. Hanya Kakom yang berwenang menutup.

---

### Phase 11: Core Operational Modules (CAL, COR, FIN, EVT, ATT, DOC, DIR, CMS, SYS)

**Files:**
- Create: `src/app/(internal)/organization/calendar/page.tsx` (`CAL-01`) & `src/app/(internal)/calendar/events/form/page.tsx` (`CAL-04`)
- Create: `src/app/(internal)/organization/correspondence/*` (`COR-01` s/d `COR-07`)
- Create: `src/app/(internal)/organization/finance/*` (`FIN-01` s/d `FIN-10`)
- Create: `src/app/(internal)/organization/events/*` (`EVT-01` s/d `EVT-09`, dengan `EVT-03` alias ke `CAL-04`)
- Create: `src/app/(internal)/organization/events/[eventId]/check-in/*` (`ATT-01` s/d `ATT-04`)
- Create: `src/app/(internal)/organization/documents/*` (`DOC-01` s/d `DOC-06`, LPJ 7 bagian)
- Create: `src/app/(internal)/organization/directory/*` (`DIR-01` s/d `DIR-08`)
- Create: `src/app/(internal)/organization/cms/*` (`CMS-01` s/d `CMS-13`)
- Create: `src/app/(internal)/system/*` (`SYS-01` s/d `SYS-06`)

**Interfaces:**
- Consumes: Mock services per domain.
- Produces: 55 Screen ID operasional organisasi.

- [ ] **Step 11.1: Modul Kalender (CAL-01 s/d CAL-04)**
  - Kalender Month/Week/List. Form tunggal `CAL-04` untuk semua agenda.
- [ ] **Step 11.2: Modul Persuratan (COR-01 s/d COR-07)**
  - Central Inbox Sekum (cross-unit). Pengajuan Surat Umum / Untuk Ditmawa langsung oleh Staff berizin tanpa approval Kakom. Penomoran otomatis dan reopen oleh Sekum.
- [ ] **Step 11.3: Modul Keuangan (FIN-01 s/d FIN-10)**
  - Kas & transaksi, pengajuan dana langsung ke Bendum, approval Bendum, pencairan bertahap (tranche), monitoring agregat tiket/medpart tanpa PII.
- [ ] **Step 11.4: Modul Agenda Internal & Presensi (EVT-01 s/d EVT-09 & ATT-01 s/d ATT-04)**
  - Manajemen jenis tiket, database peserta, verifikasi bukti bayar oleh Organizer yang ditunjuk, resend email tiket.
  - Scanner presensi barcode/QR demo + manual fallback, daftar hadir 1 tiket 1 kali check-in.
- [ ] **Step 11.5: Modul Dokumen & LPJ (DOC-01 s/d DOC-06)**
  - Document center & arsip. LPJ 7 bagian terintegrasi data kegiatan & keuangan.
- [ ] **Step 11.6: Modul Direktori (DIR-01 s/d DIR-08)**
  - Database Kader & Verifikasi Penautan (PSDM/Admin). Database Bisnis Kader. Direktori Perusahaan & Mitra Kerja Sama.
- [ ] **Step 11.7: Modul CMS & Publikasi (CMS-01 s/d CMS-13)**
  - Dashboard CMS, Editor Beranda, Media Library, Artikel Berita, Prestasi Kader.
  - Verifikasi Media Partner & Publikasi manual oleh Medkom.
  - Kotak Suara privat: triage, routing, penutupan kasus.
- [ ] **Step 11.8: Modul Sistem (SYS-01 s/d SYS-06)**
  - Statistik organisasi, viewer laporan, Notification Center (`SYS-03`), Approval Center (`SYS-04`), Activity History (`SYS-05`), Global Search (`SYS-06`).

---

### Phase 12: Cross-Module Integration, E2E Demo Journeys & Final Verification

**Files:**
- Create: `tests/e2e/demo-journeys.test.ts` / verification checklist runner
- Modify: `docs/todo.md` (Update status 146/146 Screen ID)

**Interfaces:**
- Consumes: Seluruh 146 Screen ID & 28 Demo Accounts.
- Produces: Laporan pengujian lengkap, bukti traceability 146 layar status DONE.

- [ ] **Step 12.1: Verifikasi 21 Detailed Demo Journeys (Bagian 10.23)**
  - Uji alur 10.23.1 s/d 10.23.21: Login demo, registrasi baru, verifikasi kader, admin kabinet, 3 workspace, proker draft-manager-task, persuratan sekum, keuangan bendum, tiket 180s, check-in, bisnis, medpart tracking code, LPJ, kotak suara.
- [ ] **Step 12.2: Verifikasi 30 Regression Tests Matrix (RT-01 s/d RT-30)**
  - Uji isolasi akses role, route guard 403, deep link, refresh retention, reset demo data.
- [ ] **Step 12.3: Visual & Accessibility QA (Aurora Glass Baseline)**
  - Audit kontras teks (WCAG AA target), responsivitas mobile 320px sampai desktop, fallback font serif, kelancaran motion tab dan navbar.
- [ ] **Step 12.4: Sign-off Definition of Done**
  - Pastikan seluruh 146 Screen ID tercapai tanpa console error dan tercatat di `todo.md`.
