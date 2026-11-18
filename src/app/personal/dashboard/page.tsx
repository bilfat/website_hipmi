"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  User,
  Ticket,
  CalendarCheck,
  FolderKanban,
  Award,
  Bell,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  ExternalLink,
  Briefcase,
  AlertCircle
} from "lucide-react";

export default function PersonalDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  // Tickets belonging to current user
  const userTickets = store.tickets.filter(
    (t) => t.participant_nim === currentUser.nim || t.participant_email === currentUser.email
  );
  const activeTickets = userTickets.filter((t) => !t.is_checked_in);
  const attendedTickets = userTickets.filter((t) => t.is_checked_in);

  // Proker participation from roster
  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);

  // Unread notifications
  const unreadNotifications = store.notifications.filter(
    (n) => (!n.user_id || n.user_id === currentUser.id) && !n.read
  );

  // User's cadre business if any
  const userBusinesses = store.businesses.filter((b) => b.owner_user_id === currentUser.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-darkWine via-brand-burgundy to-brand-darkWine text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-gold-400/40 flex items-center justify-center text-white font-serif text-2xl sm:text-3xl font-bold shrink-0 shadow-lg">
              {currentUser.name.charAt(0)}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-gold-300 border border-gold-400/30">
                  {currentUser.base_role}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-white/10 text-white/90">
                  {currentUser.cadre_status === "verified"
                    ? "Kader Resmi Terverifikasi"
                    : currentUser.cadre_status === "candidate"
                    ? "Calon Kader (Diklat)"
                    : "Anggota Umum"}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Selamat Datang, {currentUser.name}
              </h1>

              <p className="text-xs text-blush-200">
                NIM: <span className="font-mono">{currentUser.nim || "-"}</span> • Akun Demo:{" "}
                <strong className="text-gold-300">{currentUser.demo_id}</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-center">
            <Link
              href="/personal/profil"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
            >
              Lihat Profil
            </Link>

            {permissions.canAccessKeanggotaan && (
              <Link
                href="/personal/keanggotaan"
                className="px-4 py-2 rounded-full bg-gold-500 hover:bg-gold-600 text-wine-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Award className="w-3.5 h-3.5" />
                <span>e-KTA Digital</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Tiket Aktif */}
        <Link
          href="/personal/tiket"
          className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider">
              Tiket Agenda Aktif
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-wine-950">
            {activeTickets.length}
          </div>
          <span className="text-[11px] text-neutral-dark mt-1 block">
            {activeTickets.length > 0 ? "Siap digunakan check-in" : "Belum ada tiket aktif"}
          </span>
        </Link>

        {/* Stat 2: Keikutsertaan Proker */}
        <Link
          href="/personal/aktivitas"
          className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider">
              Kepanitiaan Proker
            </span>
            <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-wine-950">
            {userRosters.length}
          </div>
          <span className="text-[11px] text-neutral-dark mt-1 block">
            Tercatat di tim pelaksana
          </span>
        </Link>

        {/* Stat 3: Presensi Hadir */}
        <Link
          href="/personal/presensi"
          className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider">
              Riwayat Hadir
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-wine-950">
            {attendedTickets.length}
          </div>
          <span className="text-[11px] text-neutral-dark mt-1 block">
            Kegiatan terverifikasi
          </span>
        </Link>

        {/* Stat 4: Notifikasi */}
        <Link
          href="/personal/notifikasi"
          className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between pb-3">
            <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider">
              Notifikasi Baru
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-brand-burgundy">
            {unreadNotifications.length}
          </div>
          <span className="text-[11px] text-neutral-dark mt-1 block">
            {unreadNotifications.length > 0 ? "Pesan belum dibaca" : "Semua telah terbaca"}
          </span>
        </Link>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Announcements & Active Tickets */}
        <div className="lg:col-span-7 space-y-6">
          {/* Daily Announcement / Pengumuman Organisasi */}
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-wine-950/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Pengumuman Resmi Organisasi
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy font-bold">
                Hari Ini
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <strong className="text-sm text-wine-950 block font-serif">
                Rapat Pleno & Pemantapan Proker Semester Ganjil 2026/2027
              </strong>
              <p className="text-xs text-neutral-dark leading-relaxed">
                Seluruh pengurus harian, ketua kompartemen, dan manajer proker dimohon hadir pada Rapat Pleno Koordinasi di Aula Gedung B Telkom University. Pastikan laporan progres telah diunggah ke workspace masing-masing.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-neutral-light pt-2 font-mono">
                <span>Waktu: 19:30 WIB</span>
                <span>•</span>
                <span>Dresscode: PDH HIPMI Telkom</span>
              </div>
            </div>
          </div>

          {/* Active Tickets Quick Access */}
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-burgundy" />
                <span>Tiket Agenda Anda</span>
              </h2>
              <Link
                href="/personal/tiket"
                className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activeTickets.length > 0 ? (
              <div className="space-y-3">
                {activeTickets.slice(0, 2).map((t) => {
                  const evt = store.events.find((e) => e.id === t.event_id);
                  return (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-brand-burgundy bg-brand-burgundy/10 px-2 py-0.5 rounded">
                          {t.ticket_token}
                        </span>
                        <strong className="font-serif text-sm text-wine-950 block">
                          {evt?.title || "Agenda Organisasi"}
                        </strong>
                        <span className="text-[11px] text-neutral-light block">
                          {evt?.location || "Telkom University"}
                        </span>
                      </div>

                      <Link
                        href={`/tiket/${t.id}`}
                        className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shrink-0"
                      >
                        Buka Tiket
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-surface-ivory text-center space-y-2 text-xs text-neutral-dark">
                <p>Anda belum memiliki tiket aktif untuk agenda mendatang.</p>
                <Link
                  href="/aktivitas/agenda"
                  className="inline-block text-brand-burgundy font-semibold hover:underline"
                >
                  Jelajahi Agenda Kegiatan →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): e-KTA Preview & Cadre Business */}
        <div className="lg:col-span-5 space-y-6">
          {/* Digital Cadre Card (e-KTA) Preview */}
          {permissions.canAccessKeanggotaan ? (
            <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>e-KTA Anggota Resmi</span>
                </h2>
                <Link
                  href="/personal/keanggotaan"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Kartu Lengkap
                </Link>
              </div>

              {/* Mini Card Representation */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-darkWine to-wine-950 text-white shadow-xl space-y-4 border border-gold-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                    KARTU TANDA ANGGOTA
                  </span>
                  <span className="text-[9px] font-mono text-white/70">
                    KABINET ARTHAKARSA
                  </span>
                </div>

                <div className="space-y-0.5">
                  <strong className="font-serif text-lg font-bold tracking-tight block">
                    {currentUser.name}
                  </strong>
                  <span className="text-xs font-mono text-gold-300 block">
                    NIM: {currentUser.nim || "1301213001"}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-blush-200">
                  <span>Status: Kader Terverifikasi</span>
                  <span className="font-mono text-gold-400">HIPMI-PT-2026</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-3">
              <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                <Award className="w-4 h-4 text-neutral-light" />
                <span>Status Keanggotaan</span>
              </h2>
              <p className="text-xs text-neutral-dark leading-relaxed">
                Anda saat ini terdaftar sebagai <strong>Anggota Umum / Calon Kader</strong>. Ikuti Diklat Kaderisasi untuk mendapatkan e-KTA digital resmi dan hak akses kepengurusan.
              </p>
            </div>
          )}

          {/* User Business Card */}
          {permissions.canAccessKeanggotaan && (
            <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-burgundy" />
                  <span>Katalog Usaha / Bisnis Saya</span>
                </h2>
                <Link
                  href="/personal/bisnis"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Kelola
                </Link>
              </div>

              {userBusinesses.length > 0 ? (
                <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-wine-950 font-serif">
                      {userBusinesses[0].name}
                    </strong>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {userBusinesses[0].publication_status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-dark line-clamp-2">
                    {userBusinesses[0].description}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-surface-ivory text-center space-y-2 text-xs">
                  <p className="text-neutral-dark">Belum ada profil bisnis yang didaftarkan.</p>
                  <Link
                    href="/personal/bisnis/baru"
                    className="inline-block px-4 py-1.5 rounded-full bg-brand-burgundy text-white text-[11px] font-semibold"
                  >
                    + Daftarkan Usaha Anda
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
