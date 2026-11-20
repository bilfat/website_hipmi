"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  formatRoleLabel,
  formatCadreStatus,
  getCadreLevel,
  BUSINESS_REVIEW_LABELS,
} from "@/lib/personal/labels";
import { IssuedTicket } from "@/types/domain";
import { TicketQrModal } from "@/components/personal/ticket-qr-modal";
import { KtaModal } from "@/components/personal/kta-modal";
import { BusinessFormModal } from "@/components/personal/business-form-modal";
import {
  Ticket,
  CalendarCheck,
  FolderKanban,
  Award,
  Bell,
  ArrowRight,
  Sparkles,
  Briefcase,
  Calendar,
  MapPin,
  Store,
  Plus,
  QrCode,
  CheckCircle2,
  Compass,
} from "lucide-react";

export default function PersonalDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const isCadre = permissions.canAccessKeanggotaan;

  const [selectedTicket, setSelectedTicket] = useState<IssuedTicket | null>(null);
  const [ktaOpen, setKtaOpen] = useState(false);
  const [bizModalOpen, setBizModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const userFaculty = store.faculties.find((f) => f.id === currentUser.faculty_id);
  const userStudyProgram = userFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === currentUser.study_program_id
  );

  // User tickets
  const userTickets = store.tickets.filter(
    (t) => t.participant_nim === currentUser.nim || t.participant_email === currentUser.email
  );
  const activeTickets = userTickets.filter((t) => !t.is_checked_in);
  const attendedTickets = userTickets.filter((t) => t.is_checked_in);

  // Public upcoming events (safe for Mahasiswa Biasa)
  const publicEvents = store.events.filter(
    (e) => e.visibility === "public" && e.status !== "cancelled" && e.status !== "archived"
  );

  // Proker participation (only meaningful for cadres / roster members)
  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);

  // Notifications
  const unreadNotifications = store.notifications.filter(
    (n) => (!n.user_id || n.user_id === currentUser.id) && !n.read
  );

  // Cadre businesses
  const userBusinesses = store.businesses.filter((b) => b.owner_user_id === currentUser.id);

  const cadreLevel = getCadreLevel(currentUser.base_role, currentUser.cadre_status);

  const selectedTicketEvent = selectedTicket
    ? store.events.find((e) => e.id === selectedTicket.event_id)
    : undefined;
  const selectedTicketType = selectedTicket
    ? store.ticket_types.find((tt) => tt.id === selectedTicket.ticket_type_id)
    : undefined;

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Editorial Welcome Hero Card */}
      <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#3D0F16] via-[#5A1722] to-[#340C12] text-white shadow-[0_18px_46px_rgba(61,15,22,0.18)] border border-[#E8B577]/30 relative overflow-hidden">
        {/* Subtle decorative circles matching public hero */}
        <div
          className="absolute -right-14 -top-14 w-56 h-56 rounded-full border border-[#E8B577]/20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-8 -bottom-20 w-64 h-64 rounded-full bg-[#E8B577]/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-white/10 border-2 border-[#E8B577]/45 flex items-center justify-center text-[#F5D6A8] font-serif text-2xl sm:text-3xl font-bold shrink-0 shadow-lg backdrop-blur-sm">
              {currentUser.name.charAt(0)}
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider bg-[#E8B577]/20 text-[#F5D6A8] border border-[#E8B577]/35">
                  {formatRoleLabel(currentUser.base_role)}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-white/10 text-white/90 border border-white/15">
                  {formatCadreStatus(currentUser.cadre_status)}
                </span>
              </div>

              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug">
                Selamat Datang, {currentUser.name}
              </h1>

              <p className="text-xs text-white/75 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span>
                  NIM: <strong className="font-mono text-white/95">{currentUser.nim || "-"}</strong>
                </span>
                <span className="opacity-50">•</span>
                <span>{userFaculty?.name || "Universitas Telkom"}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/personal/profil"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
            >
              Profil Saya
            </Link>

            {isCadre ? (
              <button
                type="button"
                onClick={() => setKtaOpen(true)}
                className="px-4 py-2 rounded-full bg-[#E8B577] hover:bg-[#D4A76A] text-[#3D0F16] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Tampilkan e-KTA</span>
              </button>
            ) : (
              <Link
                href="/aktivitas/agenda"
                className="px-4 py-2 rounded-full bg-[#E8B577] hover:bg-[#D4A76A] text-[#3D0F16] text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Jelajahi Agenda</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Auto-Layout Quick Stats Grid: Always 2 cols on mobile, 4 cols on desktop */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1: Tiket Aktif (All users) */}
        <Link
          href="/personal/aktivitas?tab=tiket"
          className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2 pb-2.5">
            <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
              Tiket Aktif
            </span>
            <div className="w-8 h-8 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
              {activeTickets.length}
            </div>
            <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
              {activeTickets.length > 0 ? "Siap untuk check-in" : "Belum ada tiket aktif"}
            </span>
          </div>
        </Link>

        {/* Stat 2: Role-specific (Kader -> Proker | Mahasiswa Biasa -> Agenda Publik) */}
        {isCadre ? (
          <Link
            href="/personal/aktivitas?tab=proker"
            className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 pb-2.5">
              <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
                Proker Diikuti
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E8B577]/25 text-[#8A5A2B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FolderKanban className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {userRosters.length}
              </div>
              <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
                Rekor keikutsertaan
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/aktivitas/agenda"
            className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 pb-2.5">
              <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
                Agenda Terbuka
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E8B577]/25 text-[#8A5A2B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
                {publicEvents.length}
              </div>
              <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
                Terbuka untuk mahasiswa
              </span>
            </div>
          </Link>
        )}

        {/* Stat 3: Riwayat Hadir & Sertifikat (All users) */}
        <Link
          href="/personal/aktivitas?tab=kehadiran"
          className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between gap-2 pb-2.5">
            <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
              Hadir &amp; Sertifikat
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/12 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none">
              {attendedTickets.length}
            </div>
            <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
              Presensi terverifikasi
            </span>
          </div>
        </Link>

        {/* Stat 4: Role-specific (Kader -> Bisnis Saya | Mahasiswa Biasa -> Notifikasi) */}
        {isCadre ? (
          <Link
            href="/personal/keanggotaan?tab=bisnis"
            className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 pb-2.5">
              <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
                Usaha / Bisnis Saya
              </span>
              <div className="w-8 h-8 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy leading-none">
                {userBusinesses.length}
              </div>
              <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
                {userBusinesses.length > 0 ? "Tercatat di katalog" : "Belum mendaftar usaha"}
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/personal/notifikasi"
            className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2 pb-2.5">
              <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
                Pemberitahuan
              </span>
              <div className="w-8 h-8 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Bell className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy leading-none">
                {unreadNotifications.length}
              </div>
              <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
                {unreadNotifications.length > 0 ? "Belum dibaca" : "Semua sudah terbaca"}
              </span>
            </div>
          </Link>
        )}
      </section>

      {/* Main Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Role-Accurate Feed: Cadre Internal Info vs Public Upcoming Events */}
          {isCadre ? (
            <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#AF7D66]" />
                  <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950">
                    Informasi Internal Kader
                  </h2>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy font-bold">
                  Kabinet Arthakarsa
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
                <strong className="text-sm text-wine-950 block font-serif leading-snug">
                  Pemutakhiran Data Kader &amp; Kurasi Katalog Bisnis Semester Ganjil 2026/2027
                </strong>
                <p className="text-xs text-neutral-dark leading-relaxed">
                  Seluruh kader resmi HIPMI PT Universitas Telkom dipersilakan melengkapi data profil akademik dan mendaftarkan profil usaha melalui menu Keanggotaan agar masuk dalam katalog resmi direktori bisnis kampus.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-light pt-1 font-mono">
                  <span>Tingkatan Anda: Kader Tk. {cadreLevel.level}</span>
                  <span>•</span>
                  <Link
                    href="/personal/keanggotaan?tab=bisnis"
                    className="text-brand-burgundy font-sans font-semibold hover:underline"
                  >
                    Kelola Bisnis →
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-burgundy" />
                  <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950">
                    Agenda Publik Mendatang
                  </h2>
                </div>
                <Link
                  href="/aktivitas/agenda"
                  className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
                >
                  <span>Lihat Semua</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {publicEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {publicEvents.slice(0, 2).map((evt) => (
                    <Link
                      key={evt.id}
                      href={`/aktivitas/agenda/${evt.id}`}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all space-y-2 group"
                    >
                      <span className="inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                        {evt.category === "gratis" ? "Gratis" : "Berbayar"}
                      </span>
                      <strong className="font-serif text-sm text-wine-950 block line-clamp-2 group-hover:text-brand-burgundy transition-colors">
                        {evt.title}
                      </strong>
                      <div className="space-y-1 text-[11px] text-neutral-dark">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-brand-burgundy shrink-0" />
                          {new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-[#AF7D66] shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#FCF8F6] text-center text-xs text-neutral-dark">
                  Belum ada agenda publik terbuka dalam waktu dekat.
                </div>
              )}
            </div>
          )}

          {/* Active Tickets Quick Access (Opens QR Modal directly!) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-brand-burgundy" />
                <span>Tiket Kegiatan Aktif</span>
              </h2>
              <Link
                href="/personal/aktivitas?tab=tiket"
                className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
              >
                <span>Semua Tiket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activeTickets.length > 0 ? (
              <div className="space-y-3">
                {activeTickets.slice(0, 3).map((t) => {
                  const evt = store.events.find((e) => e.id === t.event_id);
                  return (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-burgundy/30 transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-burgundy bg-brand-burgundy/10 px-2 py-0.5 rounded-md">
                            {t.ticket_token}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Siap Check-In
                          </span>
                        </div>
                        <strong className="font-serif text-sm text-wine-950 block truncate">
                          {evt?.title || "Agenda HIPMI"}
                        </strong>
                        <span className="text-[11px] text-neutral-dark flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#AF7D66] shrink-0" />
                          <span className="truncate">{evt?.location || "Telkom University"}</span>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedTicket(t)}
                        className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shrink-0 inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Buka E-Tiket</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FCF8F6] border border-dashed border-[#E9E1DC] text-center space-y-2.5 text-xs text-neutral-dark">
                <p>Anda belum memiliki tiket aktif untuk agenda mendatang.</p>
                <Link
                  href="/aktivitas/agenda"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy text-white font-semibold hover:bg-brand-darkWine transition-colors"
                >
                  <span>Jelajahi Agenda Kegiatan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {isCadre ? (
            <>
              {/* Digital e-KTA Mini Preview (Opens KtaModal) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#AF7D66]" />
                    <span>e-KTA Anggota Resmi</span>
                  </h2>
                  <Link
                    href="/personal/keanggotaan"
                    className="text-xs font-semibold text-brand-burgundy hover:underline"
                  >
                    Detail Keanggotaan
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setKtaOpen(true)}
                  className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-[#2B090F] via-[#5A1722] to-[#3D0F16] text-white shadow-lg space-y-3.5 border border-[#E8B577]/40 hover:scale-[1.01] transition-transform group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-[#E8B577] font-bold">
                      KARTU TANDA ANGGOTA
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#E8B577]/20 text-[#F5D6A8]">
                      Kader Tk. {cadreLevel.level}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <strong className="font-serif text-lg font-bold tracking-tight block">
                      {currentUser.name}
                    </strong>
                    <span className="text-xs font-mono text-[#E8B577] block">
                      NIM: {currentUser.nim || "-"}
                    </span>
                  </div>

                  <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-[10px] text-white/80">
                    <span>Klik untuk perbesar &amp; QR</span>
                    <span className="font-mono text-[#E8B577] group-hover:translate-x-0.5 transition-transform">
                      ARTHAKARSA 26/27 →
                    </span>
                  </div>
                </button>
              </div>

              {/* Cadre Business Summary (Opens BusinessFormModal directly!) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-burgundy" />
                    <span>Bisnis Saya</span>
                  </h2>
                  <Link
                    href="/personal/keanggotaan?tab=bisnis"
                    className="text-xs font-semibold text-brand-burgundy hover:underline"
                  >
                    Kelola Semua
                  </Link>
                </div>

                {userBusinesses.length > 0 ? (
                  <div className="space-y-2.5">
                    {userBusinesses.slice(0, 2).map((biz) => {
                      const revInfo =
                        BUSINESS_REVIEW_LABELS[biz.review_status] || BUSINESS_REVIEW_LABELS.draft;
                      return (
                        <div
                          key={biz.id}
                          className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <strong className="text-xs text-wine-950 font-serif truncate">
                              {biz.name}
                            </strong>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${revInfo.tone}`}
                            >
                              {biz.publication_status === "published"
                                ? "Tayang Publik"
                                : revInfo.label}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-dark line-clamp-2">
                            {biz.description}
                          </p>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => setBizModalOpen(true)}
                      className="w-full py-2 rounded-xl border border-dashed border-brand-burgundy/35 text-brand-burgundy hover:bg-brand-burgundy/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Daftarkan Usaha Baru</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-[#FCF8F6] border border-dashed border-[#E9E1DC] text-center space-y-2.5 text-xs">
                    <p className="text-neutral-dark">
                      Belum ada usaha yang didaftarkan ke Direktori Bisnis Kader.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBizModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Daftarkan Usaha Anda</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Non-Cadre (Mahasiswa Biasa) Membership Info Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E8B577]/25 text-[#8A5A2B] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base font-bold text-wine-950">
                      Status Keanggotaan
                    </h2>
                    <span className="text-[11px] text-neutral-dark">
                      {formatCadreStatus(currentUser.cadre_status)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-dark leading-relaxed">
                  Akun Anda saat ini berstatus <strong>Mahasiswa Umum</strong>. Ikuti rangkaian{" "}
                  <strong>Diklat Pengenalan Organisasi (DPO)</strong> HIPMI PT Telkom University untuk mendapatkan e-KTA digital resmi, akses direktori promosi bisnis kader, dan peluang kepengurusan.
                </p>

                <Link
                  href="/tentang-kami"
                  className="w-full py-2.5 px-4 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Pelajari Manfaat Menjadi Kader</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Public Business Directory Quick Link */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_8px_28px_rgba(61,15,22,0.05)] space-y-3">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-brand-burgundy" />
                  <h2 className="font-serif text-base font-bold text-wine-950">
                    Eksplorasi Karya Kader
                  </h2>
                </div>
                <p className="text-xs text-neutral-dark leading-relaxed">
                  Temukan produk, layanan, dan kolaborasi bisnis dari wirausaha muda mahasiswa Telkom University di Direktori Bisnis HIPMI.
                </p>
                <Link
                  href="/karya-kader/bisnis"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  <span>Buka Direktori Bisnis Publik</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <TicketQrModal
        ticket={selectedTicket}
        event={selectedTicketEvent}
        ticketType={selectedTicketType}
        onClose={() => setSelectedTicket(null)}
      />

      {isCadre && (
        <>
          <KtaModal
            isOpen={ktaOpen}
            onClose={() => setKtaOpen(false)}
            currentUser={currentUser}
            faculty={userFaculty}
            studyProgramName={userStudyProgram?.name}
          />

          <BusinessFormModal
            isOpen={bizModalOpen}
            onClose={() => setBizModalOpen(false)}
            currentUser={currentUser}
            onSuccess={(msg) => setToastMsg(msg)}
          />
        </>
      )}
    </div>
  );
}
