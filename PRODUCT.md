# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Publik / Calon Peserta & Partner Eksternal**: Pengunjung umum yang mencari profil organisasi, agenda acara terbuka, katalog bisnis kader, media partner, serta tracking status permohonan partnership/sponsorship.
- **Kader / Anggota Aktif HIPMI PT Telkom University**: Mahasiswa wirausaha yang mengakses Personal Area untuk verifikasi keanggotaan, kartu tanda anggota digital (KTA), mendaftarkan & mengelola etalase bisnis, serta mendaftar program kerja.
- **Pengurus & Pengelola Organisasi (Bidang, Kompartemen, Panitia Proker)**: Mahasiswa pengurus yang menjalankan tata kelola organisasi melalui Workspace (Bidang, Kompartemen, Proker), manajemen persuratan/proposal, pengajuan anggaran keuangan, penyusunan agenda kalender, dan monitoring tugas.
- **BPH & Pimpinan (Ketum, Sekum, Bendum, Kadiv/Kakom)**: Pengambil keputusan yang memvalidasi approval lintas bidang, otorisasi pengeluaran dana, legalitas surat/MoU, serta memonitor kinerja kepengurusan.
- **Superadmin / System Admin**: Pengelola sistem yang mengontrol hak akses pengguna, verifikasi kader baru, audit log aktivitas, manajemen peran, dan konfigurasi master data.

## Product Purpose
HIPMI CENTRAL adalah sentral ekosistem digital terpadu untuk Himpunan Pengusaha Muda Indonesia Perguruan Tinggi (HIPMI PT) Universitas Telkom di bawah kepengurusan Kabinet ARTHAKARSA. Platform ini hadir untuk mengintegrasikan seluruh fungsi organisasi—mulai dari etalase publik dan branding, aktivasi kader wirausaha muda, hingga tata kelola internal (administrasi, keuangan, persuratan, approval berjenjang, dan koordinasi program kerja)—ke dalam satu sistem terpusat yang profesional, transparan, dan terstruktur.

## Positioning
Berbeda dari sekadar website profil organisasi statis atau platform manajemen tugas generik, HIPMI CENTRAL memadukan repositori bisnis kader (katalog & profil usaha mahasiswa), sistem tata kelola organisasi kampus berstandar korporat (persuratan resmi, disposisi, penganggaran bertingkat), serta manajemen program kerja terdistribusi dengan identitas visual khas Kabinet ARTHAKARSA.

## Operating Context
- Beroperasi dalam siklus kepengurusan organisasi mahasiswa tingkat universitas (HIPMI PT Universitas Telkom, Kabinet ARTHAKARSA).
- Alur kerja utama: pendaftaran & kurasi kader baru, penerbitan KTA digital, pengajuan & persetujuan proposal/surat resmi berjenjang (Staff -> Kakom -> Sekum/BPH), pengajuan RAB & pencairan dana (Staff/Panitia -> Bendum), serta penjadwalan kalender agenda sentral.
- Dioperasikan lintas perangkat (desktop untuk manajemen & admin, responsif mobile/tablet untuk publik dan personal area anggota).

## Capabilities and Constraints
- **Cakupan Fungsional**: 146 Screen ID lengkap yang mencakup 6 area aplikasi:
  1. Area Publik (Beranda, Profil, Berita, Acara, Direktori Bisnis, Kontak/Medpart tracking).
  2. Area Autentikasi (Masuk, Daftar, Verifikasi Email, Lupa/Reset Password, Status Akun).
  3. Personal Area (Profil Kader, KTA Digital, Bisnis Saya, Aktivitas & Riwayat Acara).
  4. Organization Management (Ringkasan Organisasi, Pengurus, Anggaran Global, Dokumen Sentral, Log Aktivitas).
  5. Workspace (3 konteks: Bidang, Kompartemen, Proker dengan kanban tugas, dokumen, dan agenda tim).
  6. Admin Panel (Manajemen Pengguna, Verifikasi Kader, Role & Permission, Audit Log, Pengaturan Sistem).
- **Batasan Arsitektur & Persistensi (Terkonfirmasi)**: Pure Frontend Interactive Demo. Tidak ada integrasi backend nyata, Supabase, database server, email/OTP eksternal, atau payment gateway. Seluruh data, alur bisnis, dan perubahan status disimulasikan menggunakan LocalStorage browser key-value store dengan layer data fixture terpusat.
- **Akun Demo Terstandarisasi**: 28 akun demo deterministik yang mencakup seluruh kombinasi role, permission, assignment, dan scope organisasi untuk demonstrasi interaktif langsung.
- **Konsistensi Navigasi & Routing**: Pemetaan 146 route frontend terkunci sesuai PRD v1.1.

## Brand Commitments
- **Organisasi & Kabinet**: HIPMI Perguruan Tinggi Universitas Telkom — Kabinet ARTHAKARSA.
- **Integritas Aset Brand**: Logo HIPMI, wordmark Telkom University, dan logo Kabinet ARTHAKARSA adalah entitas terpisah; tidak boleh di-redraw, di-stretch, di-crop, atau di-recolor secara sewenang-wenang.
- **Arah Visual Resmi**: Aurora Glass Editorial (Burgundy `#5A1722`, Dark Wine `#3D0F16`, Warm Ivory `#FDFBF7`, ARTHAKARSA Serif Display + Poppins).
- **Gaya Komunikasi**: Profesional, berbobot wirausaha muda (enterprising, visionary), hangat, dan akuntabel.

## Evidence on Hand
- PRD normatif frontend v1.1: `docs/PRD_frontend.md` (146 Screen ID, mapping route, 28 demo accounts, 21 user journeys, mock data schema).
- Panduan Design System v1.0: `docs/design.md` (Token warna, typography, glassmorphism, floating navbar, layout rules).
- Aset visual & logo kabinet: direktori `assets/` dan `public/`.
- Tidak ada data riil pengurus/keuangan yang boleh direkayasa sebagai fakta hukum/organisasi di luar skema demo terstandarisasi.

## Product Principles
1. **Integritas Fungsional Penuh**: Seluruh 146 screen dan kontrol interaktif harus dapat dicoba secara nyata dalam simulasi (bukan dummy mati atau sekadar placeholder).
2. **Keterbacaan Data di Atas Dekorasi**: Estetika Aurora Glass memperkaya pengalaman visual tanpa mengorbankan kontras, keterbacaan tabel data, formulir persuratan, dan efisiensi scan dashboard.
3. **Pemisahan Otoritas & Hak Akses**: Setiap role (Publik, Anggota, Pengurus Bidang/Kompartemen, BPH, Admin) melihat navigasi, data scope, dan tindakan yang sesuai dengan hak otorisasinya.
4. **Determinisme & Keandalan Simulasi**: Data LocalStorage dan skenario akun demo memberikan hasil yang konsisten, dapat diulang, dan mudah di-reset ke kondisi awal.

## Accessibility & Inclusion
- Target kepatuhan kontras WCAG 2.1 AA untuk seluruh teks dan komponen fungsional utama (terutama teks pada surface glassmorphism dan background warna).
- Dukungan navigasi keyboard dan focus visible pada form, modal, dan drawer.
- Fallback `prefers-reduced-motion` untuk semua animasi Framer Motion.
