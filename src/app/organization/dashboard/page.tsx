"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { ProjectCardGrid } from "@/components/organization/project-card-grid";
import { CreateProjectModal } from "@/components/organization/create-project-modal";
import {
  Building,
  FolderKanban,
  Mail,
  Wallet,
  Calendar,
  CalendarCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  Handshake,
  Plus,
  Bell,
  Users,
  Store,
  Megaphone,
  Newspaper,
  MessageSquareHeart,
  Award,
  Layers,
  AlertCircle,
  BarChart3,
} from "lucide-react";

export default function OrganizationDashboardPage() {
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const profile = permissions.orgRoleProfile;

  const [createProjOpen, setCreateProjOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Pure Project Manager goes straight to their Project Workspace (never sees Organization Dashboard)
  useEffect(() => {
    if (permissions.isPureProjectManager && permissions.primaryWorkspaceHref) {
      router.replace(permissions.primaryWorkspaceHref);
    }
  }, [permissions.isPureProjectManager, permissions.primaryWorkspaceHref, router]);

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  // Scope-filtered datasets
  const allCabProjects = store.projects.filter((p) => p.cabinet_id === activeCab?.id);
  const scopedProjects =
    profile === "kabid" && permissions.managedFieldId
      ? allCabProjects.filter((p) => p.field_id === permissions.managedFieldId)
      : profile === "kakom" && permissions.managedCompartmentId
      ? allCabProjects.filter((p) => p.compartment_id === permissions.managedCompartmentId)
      : profile === "staff" && permissions.managedCompartmentId
      ? allCabProjects.filter((p) => p.compartment_id === permissions.managedCompartmentId)
      : allCabProjects;

  const activeProjects = scopedProjects.filter((p) => p.operational_status === "ongoing");

  const pendingLetters = store.correspondence.filter(
    (c) => c.status === "submitted" || c.status === "in_review"
  );
  const ditmawaLetters = store.correspondence.filter(
    (c) => c.routing === "Untuk Ditmawa" && c.ditmawa_status && c.ditmawa_status !== "completed"
  );
  const pendingFunds = store.fund_requests.filter(
    (f) => f.status === "submitted" || f.status === "in_review"
  );
  const approvedUndisbursedFunds = store.fund_requests.filter((f) => f.status === "approved");

  const cashBalance = store.finance_transactions.reduce((acc, t) => {
    if (t.type === "income") return acc + t.amount;
    if (t.type === "expense") return acc - t.amount;
    return acc;
  }, 0);

  const ticketRevenue = store.reservations
    .filter((r) => r.payment_status === "approved" || r.payment_status === "paid")
    .reduce((acc, r) => acc + (r.amount || 0), 0);

  const publicEvents = store.events.filter((e) => e.visibility === "public");

  // Today's Announcement Feed (starting 00.01 WIB per front_end.md CAL-01/ORG-01)
  const calendarEvents = store.calendar_events || [];
  const todayStr = new Date().toISOString().split("T")[0];
  const todayCalendarEvents = calendarEvents.filter((ev) =>
    ev.start_time.startsWith(todayStr)
  );
  const upcomingCalendarEvents = [...calendarEvents]
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 3);
  const announcementItems =
    todayCalendarEvents.length > 0 ? todayCalendarEvents : upcomingCalendarEvents.slice(0, 2);

  // Scoped compartments for Kabid
  const managedField = store.fields.find((f) => f.id === permissions.managedFieldId);
  const fieldCompartments = managedField
    ? store.compartments.filter((c) => c.field_id === managedField.id)
    : [];

  const managedComp = store.compartments.find((c) => c.id === permissions.managedCompartmentId);

  // Role-specific KPI definitions (Always 4 crisp cards: 2-col mobile / 4-col desktop)
  const getKpiCards = () => {
    if (profile === "sekum") {
      return [
        {
          label: "Menunggu Review",
          value: pendingLetters.length,
          sub: "Antrean surat masuk",
          href: "/organization/correspondence",
          icon: Mail,
          tone: "bg-amber-500/12 text-amber-700",
        },
        {
          label: "Proses Ditmawa",
          value: ditmawaLetters.length,
          sub: "Pelacakan eksternal",
          href: "/organization/correspondence/ditmawa",
          icon: Clock,
          tone: "bg-brand-burgundy/10 text-brand-burgundy",
        },
        {
          label: "Surat Terbit",
          value: store.correspondence.filter((c) => c.status === "issued" || c.status === "completed").length,
          sub: "Nomor resmi aktif",
          href: "/organization/correspondence/numbering",
          icon: CheckCircle2,
          tone: "bg-emerald-500/12 text-emerald-700",
        },
        {
          label: "Dokumen & LPJ",
          value: store.documents.length + store.lpjs.length,
          sub: "Arsip tersimpan",
          href: "/organization/documents",
          icon: FileText,
          tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
        },
      ];
    }

    if (profile === "bendum") {
      return [
        {
          label: "Saldo Kas Kabinet",
          value: `Rp ${(cashBalance / 1_000_000).toFixed(1)} Jt`,
          sub: "Saldo bersih terkini",
          href: "/organization/finance",
          icon: Wallet,
          tone: "bg-emerald-500/12 text-emerald-700",
        },
        {
          label: "RAB Menunggu",
          value: pendingFunds.length,
          sub: "Perlu review Bendum",
          href: "/organization/finance/requests",
          icon: AlertCircle,
          tone: "bg-amber-500/12 text-amber-700",
        },
        {
          label: "Siap Dicairkan",
          value: approvedUndisbursedFunds.length,
          sub: "Disetujui belum transfer",
          href: "/organization/finance/disbursements",
          icon: CheckCircle2,
          tone: "bg-brand-burgundy/10 text-brand-burgundy",
        },
        {
          label: "Pendapatan Tiket",
          value: `Rp ${(ticketRevenue / 1_000_000).toFixed(1)} Jt`,
          sub: "Tiket & medpart sah",
          href: "/organization/finance/revenue",
          icon: BarChart3,
          tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
        },
      ];
    }

    if (profile === "kabid") {
      return [
        {
          label: "Kompartemen",
          value: fieldCompartments.length,
          sub: "Unit di bawah bidang",
          href: `/workspace/${managedField?.id || "field-demo-01"}`,
          icon: Layers,
          tone: "bg-brand-burgundy/10 text-brand-burgundy",
        },
        {
          label: "Proker Bidang",
          value: scopedProjects.length,
          sub: `${activeProjects.length} sedang berjalan`,
          href: `/workspace/${managedField?.id || "field-demo-01"}`,
          icon: FolderKanban,
          tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
        },
        {
          label: "Persuratan",
          value: store.correspondence.length,
          sub: "Pantau status surat",
          href: "/organization/correspondence",
          icon: Mail,
          tone: "bg-sky-500/12 text-sky-700",
        },
        {
          label: "Direktori Mitra",
          value: store.companies.length,
          sub: "Referensi sponsor",
          href: "/organization/directory/companies",
          icon: Handshake,
          tone: "bg-emerald-500/12 text-emerald-700",
        },
      ];
    }

    if (profile === "kakom") {
      return [
        {
          label: "Proker Kompartemen",
          value: scopedProjects.length,
          sub: `${activeProjects.length} sedang berjalan`,
          href: `/workspace/${managedComp?.id || "comp-demo-01"}`,
          icon: FolderKanban,
          tone: "bg-brand-burgundy/10 text-brand-burgundy",
        },
        {
          label: "Jadwal Kalender",
          value: calendarEvents.length,
          sub: "Pleno & agenda unit",
          href: "/organization/calendar",
          icon: Calendar,
          tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
        },
        {
          label: "Pengajuan Surat",
          value: store.correspondence.length,
          sub: "Administrasi unit",
          href: "/organization/correspondence",
          icon: Mail,
          tone: "bg-sky-500/12 text-sky-700",
        },
        {
          label: "Sponsor & Mitra",
          value: store.companies.length,
          sub: "Referensi kerja sama",
          href: "/organization/directory/companies",
          icon: Handshake,
          tone: "bg-emerald-500/12 text-emerald-700",
        },
      ];
    }

    if (profile === "staff") {
      return [
        {
          label: "Proker Unit",
          value: scopedProjects.length,
          sub: "Kompartemen aktif",
          href: managedComp ? `/workspace/${managedComp.id}` : "/organization/calendar",
          icon: FolderKanban,
          tone: "bg-brand-burgundy/10 text-brand-burgundy",
        },
        {
          label: "Jadwal Terdekat",
          value: calendarEvents.length,
          sub: "Kalender organisasi",
          href: "/organization/calendar",
          icon: Calendar,
          tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
        },
        {
          label: "Event Publik",
          value: publicEvents.length,
          sub: "Agenda aktif",
          href: "/organization/events",
          icon: CalendarCheck,
          tone: "bg-sky-500/12 text-sky-700",
        },
        {
          label: "Sponsor & Mitra",
          value: store.companies.length,
          sub: "Referensi kerja sama",
          href: "/organization/directory/companies",
          icon: Handshake,
          tone: "bg-emerald-500/12 text-emerald-700",
        },
      ];
    }

    // Default: Top Management (Ketum, Waketum, Sekjen)
    return [
      {
        label: "Proker Aktif",
        value: activeProjects.length,
        sub: `Dari ${allCabProjects.length} total proker`,
        href: "/organization/structure",
        icon: FolderKanban,
        tone: "bg-brand-burgundy/10 text-brand-burgundy",
      },
      {
        label: "Menunggu Tindakan",
        value: pendingLetters.length + pendingFunds.length,
        sub: `${pendingLetters.length} surat • ${pendingFunds.length} RAB`,
        href: "/organization/action-center",
        icon: AlertCircle,
        tone: "bg-amber-500/12 text-amber-700",
      },
      {
        label: "Saldo Kas Kabinet",
        value: `Rp ${(cashBalance / 1_000_000).toFixed(1)} Jt`,
        sub: "Pantau arus kas",
        href: "/organization/finance",
        icon: Wallet,
        tone: "bg-emerald-500/12 text-emerald-700",
      },
      {
        label: "Event Publik",
        value: publicEvents.length,
        sub: `${store.users.filter((u) => u.cadre_status === "verified").length} kader aktif`,
        href: "/organization/events",
        icon: CalendarCheck,
        tone: "bg-[#E8B577]/25 text-[#8A5A2B]",
      },
    ];
  };

  const kpiCards = getKpiCards();

  // Assigned Special Service Shortcuts for Staff
  const staffServiceCards = [
    permissions.canManageCadres && {
      title: "Database Kader",
      desc: "Kelola data kader resmi, verifikasi & penautan NIM.",
      href: "/organization/directory/cadres",
      icon: Users,
    },
    permissions.canManagePartnerships && {
      title: "Pengelolaan Bisnis Kader",
      desc: "Kurasi & publikasi usaha kader ke direktori publik.",
      href: "/organization/directory/businesses",
      icon: Store,
    },
    permissions.canManagePartnerships && {
      title: "Database Sponsor & Mitra",
      desc: "Kelola profil perusahaan, kontak PIC & riwayat kerja sama.",
      href: "/organization/directory/companies",
      icon: Handshake,
    },
    (permissions.canReviewMedpart || permissions.canPublishMedpart) && {
      title: "Media Partner (Medpart)",
      desc: "Atur paket medpart gratis/berbayar & review pengajuan.",
      href: "/organization/cms/medpart",
      icon: Megaphone,
    },
    (permissions.canCreateContent || permissions.canPublishContent) && {
      title: "Berita & Artikel",
      desc: "Tulis dan publikasikan berita ke portal publik HIPMI.",
      href: "/organization/cms/articles",
      icon: Newspaper,
    },
    (permissions.canCreateContent || permissions.canPublishContent) && {
      title: "Kader Berprestasi",
      desc: "Posting prestasi kader agar tampil di portal publik.",
      href: "/organization/cms/achievements",
      icon: Award,
    },
    permissions.canManageFeedback && {
      title: "Kotak Suara",
      desc: "Triage dan tindak lanjuti aspirasi masuk dari publik.",
      href: "/organization/cms/feedback",
      icon: MessageSquareHeart,
    },
    (permissions.canManageEvents || permissions.canVerifyTicketPayment || permissions.canScanAttendance) && {
      title: "Agenda, Tiket & Presensi QR",
      desc: "Verifikasi pembayaran tiket & operasikan scanner presensi.",
      href: "/organization/events",
      icon: CalendarCheck,
    },
    permissions.canReviewLPJ && {
      title: "Review Dokumen & LPJ",
      desc: "Periksa kelengkapan LPJ 7-bagian dari program kerja.",
      href: "/organization/documents",
      icon: FileText,
    },
  ].filter(Boolean) as {
    title: string;
    desc: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Feedback Toast */}
      {toastMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Editorial Role-Adaptive Hero Card (Minimalist Aurora Glass matching Personal Dashboard) */}
      <section className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#3D0F16] via-[#5A1722] to-[#340C12] text-white shadow-[0_18px_46px_rgba(61,15,22,0.16)] border border-[#E8B577]/30 relative overflow-hidden">
        <div
          className="absolute -right-14 -top-14 w-56 h-56 rounded-full border border-[#E8B577]/20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-8 -bottom-20 w-64 h-64 rounded-full bg-[#E8B577]/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider bg-[#E8B577]/20 text-[#F5D6A8] border border-[#E8B577]/35">
                {permissions.roleBadgeTitle}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-medium bg-white/10 text-white/90 border border-white/15">
                {activeCab?.name || "Kabinet Arthakarsa"} • {activeCab?.period || "2026/2027"}
              </span>
            </div>

            <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug">
              {profile === "top_management"
                ? "Dashboard Eksekutif Kabinet"
                : profile === "sekum"
                ? "Dashboard Administrasi & Persuratan"
                : profile === "bendum"
                ? "Dashboard Keuangan & Kas"
                : profile === "kabid"
                ? `Dashboard ${managedField?.name || "Bidang"}`
                : profile === "kakom"
                ? `Dashboard ${managedComp?.name || "Kompartemen"}`
                : "Dashboard Tugas Organisasi"}
            </h1>

            <p className="text-xs text-white/75 max-w-xl leading-relaxed">
              {permissions.roleScopeSubtitle} — Menampilkan ringkasan, jadwal hari ini, dan tindakan prioritas sesuai kewenangan jabatan Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {profile === "kakom" && (
              <button
                type="button"
                onClick={() => setCreateProjOpen(true)}
                className="px-4 py-2.5 rounded-full bg-[#E8B577] hover:bg-[#D4A76A] text-[#3D0F16] text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Proker Baru</span>
              </button>
            )}
            {profile === "kabid" && managedField && (
              <Link
                href={`/workspace/${managedField.id}`}
                className="px-4 py-2.5 rounded-full bg-[#E8B577] hover:bg-[#D4A76A] text-[#3D0F16] text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Buka Workspace Bidang</span>
              </Link>
            )}
            {(profile === "top_management" || profile === "sekum" || profile === "bendum") && (
              <Link
                href="/organization/action-center"
                className="px-4 py-2.5 rounded-full bg-[#E8B577] hover:bg-[#D4A76A] text-[#3D0F16] text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pusat Tindakan</span>
              </Link>
            )}

            <Link
              href="/organization/calendar"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender Organisasi</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Automated Daily Announcement Banner (Reads Calendar starting 00.01 WIB per front_end.md) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E8B577]/45 shadow-[0_6px_22px_rgba(61,15,22,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#E8B577]/20 text-[#8A5A2B] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-burgundy">
                {todayCalendarEvents.length > 0
                  ? "Pengumuman Agenda Hari Ini (Aktif sejak 00.01 WIB)"
                  : "Agenda Kalender Terdekat"}
              </span>
              <span className="text-[10px] font-mono text-neutral-light">
                • Sinkron otomatis dari Kalender Organisasi
              </span>
            </div>

            {announcementItems.length > 0 ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {announcementItems.map((ev) => (
                  <div key={ev.id} className="text-xs text-wine-950 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy shrink-0" />
                    <strong className="font-semibold">{ev.title}</strong>
                    <span className="text-[11px] text-neutral-dark font-mono">
                      (
                      {new Date(ev.start_time).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                      {" • "}
                      {new Date(ev.start_time).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark">
                Tidak ada jadwal rapat pleno atau kegiatan internal yang tercatat hari ini.
              </p>
            )}
          </div>
        </div>

        <Link
          href="/organization/calendar"
          className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 hover:text-brand-burgundy inline-flex items-center gap-1.5 shrink-0 self-start md:self-center transition-colors"
        >
          <span>Lihat Kalender</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* Auto-Layout 4 KPI Cards (Always 2-col mobile / 4-col desktop) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-[0_4px_16px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/40 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 pb-2.5">
                <span className="text-neutral-dark text-[11px] font-semibold leading-tight">
                  {card.label}
                </span>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${card.tone}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-wine-950 leading-none truncate">
                  {card.value}
                </div>
                <span className="text-[11px] text-neutral-light mt-1.5 block truncate">
                  {card.sub}
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ROLE-ADAPTIVE PRIORITY BODY */}

      {/* 1. SEKUM FOCUS: Letter Queue & Ditmawa Tracking */}
      {profile === "sekum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950 flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-burgundy" />
                <span>Antrean Review Persuratan ({pendingLetters.length})</span>
              </h2>
              <Link
                href="/organization/correspondence"
                className="text-xs font-semibold text-brand-burgundy hover:underline"
              >
                Buka Semua →
              </Link>
            </div>

            {pendingLetters.length > 0 ? (
              <div className="space-y-2.5">
                {pendingLetters.slice(0, 4).map((letter) => (
                  <Link
                    key={letter.id}
                    href={`/organization/correspondence/${letter.id}`}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-brand-burgundy uppercase">
                        {letter.routing} • {letter.unit_name}
                      </span>
                      <strong className="font-serif text-sm text-wine-950 block truncate">
                        {letter.title}
                      </strong>
                      <span className="text-[11px] text-neutral-dark">
                        Pengaju: {letter.submitter_name}
                      </span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-brand-burgundy text-white text-[11px] font-semibold shrink-0">
                      Periksa
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-4 rounded-2xl bg-[#FCF8F6] text-center">
                Seluruh pengajuan surat telah ditinjau.
              </p>
            )}
          </div>

          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#AF7D66]" />
                <span>Pelacakan Ditmawa</span>
              </h2>
              <Link
                href="/organization/correspondence/ditmawa"
                className="text-xs font-semibold text-brand-burgundy hover:underline"
              >
                Kelola →
              </Link>
            </div>
            <div className="space-y-2.5">
              {ditmawaLetters.slice(0, 3).map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1 text-xs"
                >
                  <strong className="font-serif text-wine-950 block truncate">{l.title}</strong>
                  <span className="text-[11px] text-neutral-dark block">
                    {l.unit_name} • Status Ditmawa:{" "}
                    <strong className="text-brand-burgundy">{l.ditmawa_status}</strong>
                  </span>
                </div>
              ))}
              {ditmawaLetters.length === 0 && (
                <p className="text-xs text-neutral-dark">Belum ada surat aktif di Ditmawa.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. BENDUM FOCUS: RAB Approval Queue & Unit Budget Summary */}
      {profile === "bendum" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-brand-burgundy" />
                <span>Antrean Pengajuan Dana (RAB) ({pendingFunds.length})</span>
              </h2>
              <Link
                href="/organization/finance/requests"
                className="text-xs font-semibold text-brand-burgundy hover:underline"
              >
                Semua RAB →
              </Link>
            </div>

            {pendingFunds.length > 0 ? (
              <div className="space-y-2.5">
                {pendingFunds.slice(0, 4).map((req) => (
                  <Link
                    key={req.id}
                    href={`/organization/finance/requests/${req.id}`}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-mono font-bold text-brand-burgundy uppercase">
                        {req.unit_name}
                      </span>
                      <strong className="font-serif text-sm text-wine-950 block truncate">
                        {req.purpose}
                      </strong>
                      <span className="text-[11px] font-mono text-neutral-dark">
                        Nominal: Rp {req.requested_amount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-brand-burgundy text-white text-[11px] font-semibold shrink-0">
                      Review
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-4 rounded-2xl bg-[#FCF8F6] text-center">
                Tidak ada pengajuan dana yang menunggu persetujuan saat ini.
              </p>
            )}
          </div>

          <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>Pencairan &amp; Transaksi Terbaru</span>
              </h2>
              <Link
                href="/organization/finance"
                className="text-xs font-semibold text-brand-burgundy hover:underline"
              >
                Buku Kas →
              </Link>
            </div>
            <div className="space-y-2.5">
              {store.finance_transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <strong className="text-wine-950 block truncate">{tx.description}</strong>
                    <span className="text-[10px] text-neutral-light">{tx.category}</span>
                  </div>
                  <span
                    className={`font-mono font-bold shrink-0 ${
                      tx.type === "income" ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}Rp {(tx.amount / 1000).toLocaleString("id-ID")}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. STAFF FOCUS: Assigned Special Services Grid */}
      {profile === "staff" && staffServiceCards.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Modul Layanan yang Ditugaskan kepada Anda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staffServiceCards.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.title}
                  href={svc.href}
                  className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="font-serif text-base text-wine-950 block group-hover:text-brand-burgundy transition-colors">
                      {svc.title}
                    </strong>
                    <p className="text-xs text-neutral-dark leading-relaxed">{svc.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-brand-burgundy inline-flex items-center gap-1">
                    <span>Buka Modul</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. LMS-STYLE PROJECT CARD GRID (For Top Management, Kabid, Kakom, & Compartment Staff) */}
      {(profile === "top_management" ||
        profile === "kabid" ||
        profile === "kakom" ||
        (profile === "staff" && permissions.managedCompartmentId)) && (
        <ProjectCardGrid
          store={store}
          projects={scopedProjects}
          showFieldFilter={profile === "top_management"}
          showCompartmentFilter={profile === "top_management" || profile === "kabid"}
          canCreateProject={profile === "kakom"}
          onCreateProject={() => setCreateProjOpen(true)}
          title={
            profile === "top_management"
              ? "Monitoring Program Kerja Kabinet"
              : profile === "kabid"
              ? `Monitoring Program Kerja — ${managedField?.name || "Bidang"}`
              : `Program Kerja — ${managedComp?.name || "Kompartemen"}`
          }
          subtitle={
            profile === "kakom"
              ? "Kelola proker kompartemen Anda, tunjuk Pengelola Proker, atau klik kartu untuk masuk ke Project 360."
              : "Pantau progres naratif, tim, persuratan, keuangan, dan LPJ setiap program kerja."
          }
        />
      )}

      {/* Create Project Modal (Kakom Only) */}
      {profile === "kakom" && (
        <CreateProjectModal
          isOpen={createProjOpen}
          onClose={() => setCreateProjOpen(false)}
          store={store}
          currentUser={currentUser}
          defaultCompartmentId={permissions.managedCompartmentId}
          onCreated={(projName) =>
            setToastMsg(`Draf program kerja "${projName}" berhasil dibuat!`)
          }
        />
      )}
    </div>
  );
}
