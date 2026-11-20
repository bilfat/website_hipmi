"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  REGISTRATION_STATUS_LABELS,
  PROJECT_STATUS_LABELS,
} from "@/lib/personal/labels";
import { IssuedTicket, TicketReservation, RosterMember } from "@/types/domain";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { TicketQrModal } from "@/components/personal/ticket-qr-modal";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  Ticket,
  CalendarCheck,
  FolderKanban,
  Calendar,
  MapPin,
  QrCode,
  Award,
  Printer,
  Clock,
  ArrowRight,
  Filter,
  Building,
  Layers,
  Info,
  RotateCcw,
} from "lucide-react";

type AktivitasTab = "tiket" | "kehadiran" | "proker";

export default function MyActivitiesPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat aktivitas pribadi..." />}>
      <MyActivitiesContent />
    </Suspense>
  );
}

function MyActivitiesContent() {
  const searchParams = useSearchParams();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  // User data slices
  const userTickets = store.tickets.filter(
    (t) => t.participant_nim === currentUser.nim || t.participant_email === currentUser.email
  );
  const userReservations = store.reservations.filter(
    (r) => r.participant_nim === currentUser.nim || r.participant_email === currentUser.email
  );
  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);
  const userActivities = store.activity_history.filter(
    (a) => a.actor_name === currentUser.name
  );

  // Can view Proker tab only if verified cadre or explicitly assigned to a roster
  const showProkerTab = permissions.canAccessKeanggotaan || userRosters.length > 0;

  const paramTab = searchParams.get("tab") as AktivitasTab | null;
  const resolveInitialTab = (): AktivitasTab => {
    if (paramTab === "kehadiran") return "kehadiran";
    if (paramTab === "proker" && showProkerTab) return "proker";
    return "tiket";
  };

  const [activeTab, setActiveTab] = useState<AktivitasTab>(resolveInitialTab);
  const [ticketFilter, setTicketFilter] = useState<"all" | "active" | "checked_in">("all");

  // Cascading organizational filter for Proker History (front_end.md lines 2834-2856)
  const [filterCabinet, setFilterCabinet] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterCompartment, setFilterCompartment] = useState("");
  const [filterProject, setFilterProject] = useState("");

  // Modal states
  const [selectedTicket, setSelectedTicket] = useState<IssuedTicket | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<TicketReservation | null>(null);
  const [selectedCertTicket, setSelectedCertTicket] = useState<IssuedTicket | null>(null);
  const [selectedRoster, setSelectedRoster] = useState<RosterMember | null>(null);

  useEffect(() => {
    if (paramTab === "tiket" || paramTab === "kehadiran") {
      setActiveTab(paramTab);
    } else if (paramTab === "proker" && showProkerTab) {
      setActiveTab("proker");
    }
  }, [paramTab, showProkerTab]);

  useEffect(() => {
    if (!showProkerTab) {
      setActiveTab((prev) => (prev === "proker" ? "tiket" : prev));
    }
  }, [showProkerTab]);

  const handleTabChange = (tab: AktivitasTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/personal/aktivitas?tab=${tab}`);
    }
  };

  // Filtered tickets
  const filteredTickets = userTickets.filter((t) => {
    if (ticketFilter === "active") return !t.is_checked_in;
    if (ticketFilter === "checked_in") return t.is_checked_in;
    return true;
  });

  const attendedTickets = userTickets.filter((t) => t.is_checked_in);

  // Cascading dropdown options for Proker filter
  const availableFields = store.fields.filter(
    (f) => !filterCabinet || f.cabinet_id === filterCabinet
  );
  const availableCompartments = store.compartments.filter(
    (c) =>
      (!filterCabinet || c.cabinet_id === filterCabinet) &&
      (!filterField || c.field_id === filterField)
  );
  const availableProjects = store.projects.filter(
    (p) =>
      (!filterCabinet || p.cabinet_id === filterCabinet) &&
      (!filterField || p.field_id === filterField) &&
      (!filterCompartment || p.compartment_id === filterCompartment)
  );

  const filteredRosters = userRosters.filter((r) => {
    const project = store.projects.find((p) => p.id === r.project_id);
    if (!project) return !filterCabinet && !filterField && !filterCompartment && !filterProject;
    if (filterCabinet && project.cabinet_id !== filterCabinet) return false;
    if (filterField && project.field_id !== filterField) return false;
    if (filterCompartment && project.compartment_id !== filterCompartment) return false;
    if (filterProject && project.id !== filterProject) return false;
    return true;
  });

  const hasProkerFilter = !!(filterCabinet || filterField || filterCompartment || filterProject);

  const tabs: {
    id: AktivitasTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count: number;
  }[] = [
    { id: "tiket", label: "Registrasi & Tiket", icon: Ticket, count: userTickets.length },
    { id: "kehadiran", label: "Agenda & Kehadiran", icon: CalendarCheck, count: attendedTickets.length },
  ];

  if (showProkerTab) {
    tabs.push({
      id: "proker",
      label: "Keikutsertaan Proker",
      icon: FolderKanban,
      count: userRosters.length,
    });
  }

  // Helpers for active modal entities
  const selectedTicketEvent = selectedTicket
    ? store.events.find((e) => e.id === selectedTicket.event_id)
    : undefined;
  const selectedTicketType = selectedTicket
    ? store.ticket_types.find((tt) => tt.id === selectedTicket.ticket_type_id)
    : undefined;

  const selectedResEvent = selectedReservation
    ? store.events.find((e) => e.id === selectedReservation.event_id)
    : undefined;

  const selectedCertEvent = selectedCertTicket
    ? store.events.find((e) => e.id === selectedCertTicket.event_id)
    : undefined;

  const selectedRosterProject = selectedRoster
    ? store.projects.find((p) => p.id === selectedRoster.project_id)
    : undefined;
  const selectedRosterComp = selectedRosterProject
    ? store.compartments.find((c) => c.id === selectedRosterProject.compartment_id)
    : undefined;
  const selectedRosterField = selectedRosterProject
    ? store.fields.find((f) => f.id === selectedRosterProject.field_id)
    : undefined;
  const selectedRosterCabinet = selectedRosterProject
    ? store.cabinets.find((c) => c.id === selectedRosterProject.cabinet_id)
    : undefined;

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Rekam Aktivitas Pribadi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Aktivitas Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            {showProkerTab
              ? "Pantau seluruh tiket kegiatan, presensi & e-sertifikat, serta riwayat keterlibatan program kerja Anda."
              : "Akses e-tiket kegiatan, status pendaftaran, serta riwayat kehadiran & e-sertifikat Anda."}
          </p>
        </div>

        <Link
          href="/aktivitas/agenda"
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Cari Agenda Baru</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sliding Segmented Tab Bar */}
      <div className="p-1.5 rounded-2xl bg-white/90 border border-[#E9E1DC] shadow-sm inline-flex flex-wrap gap-1 w-full sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                isActive ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="aktivitas-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-[#FCF8F6] text-neutral-dark"
                  }`}
                >
                  {tab.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: REGISTRASI & TIKET (PER-08) */}
      {activeTab === "tiket" && (
        <div className="space-y-6">
          {/* Sub-filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { key: "all", label: `Semua (${userTickets.length})` },
              { key: "active", label: `Siap Digunakan (${userTickets.filter((t) => !t.is_checked_in).length})` },
              { key: "checked_in", label: `Sudah Hadir (${attendedTickets.length})` },
            ].map((pill) => (
              <button
                key={pill.key}
                type="button"
                onClick={() => setTicketFilter(pill.key as "all" | "active" | "checked_in")}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all border ${
                  ticketFilter === pill.key
                    ? "bg-wine-950 text-white border-wine-950 shadow-sm"
                    : "bg-white text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Tickets Auto-Layout Grid */}
          {filteredTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTickets.map((t) => {
                const evt = store.events.find((e) => e.id === t.event_id);
                const ticketType = store.ticket_types.find((tt) => tt.id === t.ticket_type_id);

                return (
                  <div
                    key={t.id}
                    className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                          {t.ticket_token}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#E8B577]/20 text-[#6F4518]">
                          {ticketType?.name || "Reguler"}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            t.is_checked_in
                              ? "bg-neutral-100 text-neutral-700 border-neutral-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {t.is_checked_in ? "Sudah Check-In" : "Siap Digunakan"}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-wine-950 leading-snug">
                        {evt?.title || "Agenda HIPMI"}
                      </h3>

                      <div className="space-y-1 text-xs text-neutral-dark">
                        <span className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                          {evt?.schedule_start
                            ? new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "-"}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <MapPin className="w-3.5 h-3.5 text-[#AF7D66] shrink-0" />
                          <span className="truncate">{evt?.location || "Telkom University"}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E9E1DC] flex items-center justify-between gap-2">
                      <span className="text-[10px] text-neutral-light font-mono">
                        Pemegang: {t.participant_name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(t)}
                        className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Buka E-Tiket</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-3">
              <Ticket className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-xs text-neutral-dark">
                Tidak ada tiket kegiatan pada kategori filter ini.
              </p>
            </div>
          )}

          {/* Registration & Payment Status List */}
          {userReservations.length > 0 && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#AF7D66]" />
                  <span>Riwayat Pendaftaran &amp; Pembayaran ({userReservations.length})</span>
                </h2>
              </div>

              <div className="space-y-3">
                {userReservations.map((res) => {
                  const evt = store.events.find((e) => e.id === res.event_id);
                  const regInfo = REGISTRATION_STATUS_LABELS[res.registration_status] || {
                    label: res.registration_status,
                    tone: "bg-neutral-100 text-neutral-700 border-neutral-200",
                  };

                  return (
                    <div
                      key={res.id}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] text-neutral-light">{res.id}</span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${regInfo.tone}`}
                          >
                            {regInfo.label}
                          </span>
                        </div>
                        <strong className="font-serif text-sm text-wine-950 block truncate">
                          {evt?.title || "Agenda HIPMI"}
                        </strong>
                        <span className="text-[11px] text-neutral-dark font-mono">
                          Total:{" "}
                          {res.amount > 0
                            ? `Rp ${res.amount.toLocaleString("id-ID")}`
                            : "Gratis"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedReservation(res)}
                        className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white hover:bg-[#FCF8F6] text-wine-950 text-xs font-semibold shrink-0 self-start sm:self-center transition-colors"
                      >
                        Rincian Status
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: AGENDA & KEHADIRAN (PER-09) */}
      {activeTab === "kehadiran" && (
        <div className="space-y-6">
          {/* 2-col Mobile / 3-col Desktop Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-neutral-dark block">
                Total Agenda Terdaftar
              </span>
              <strong className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 block">
                {userTickets.length}
              </strong>
              <span className="text-[10px] text-neutral-light">Seluruh tiket terdaftar</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-neutral-dark block">
                Kehadiran Sah
              </span>
              <strong className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 block">
                {attendedTickets.length}
              </strong>
              <span className="text-[10px] text-neutral-light">Tervalidasi check-in</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-neutral-dark block">
                E-Sertifikat Tersedia
              </span>
              <strong className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy block">
                {attendedTickets.length}
              </strong>
              <span className="text-[10px] text-neutral-light">Siap pratinjau &amp; cetak</span>
            </div>
          </div>

          {/* Attended Events List */}
          {attendedTickets.length > 0 ? (
            <div className="space-y-4">
              {attendedTickets.map((ticket) => {
                const evt = store.events.find((e) => e.id === ticket.event_id);
                const certNumber = `CERT-HIPMI-${ticket.ticket_token.replace("DEMO-TKT-", "")}-2026`;

                return (
                  <div
                    key={ticket.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-emerald-200/80 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Hadir Sah
                          </span>
                          <span className="text-[10px] font-mono text-neutral-light">
                            No. Sertifikat: {certNumber}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-wine-950">
                          {evt?.title || "Agenda HIPMI"}
                        </h3>
                        <p className="text-xs text-neutral-dark">
                          Check-in tervalidasi:{" "}
                          <strong className="font-mono text-wine-950">
                            {ticket.checked_in_at
                              ? new Date(ticket.checked_in_at).toLocaleString("id-ID")
                              : "Tercatat hadir"}
                          </strong>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedCertTicket(ticket)}
                        className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-2 self-start sm:self-center shrink-0"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Lihat E-Sertifikat</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-3">
              <CalendarCheck className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-xs text-neutral-dark">
                Belum ada agenda dengan status check-in sah untuk akun ini. E-Sertifikat akan muncul otomatis setelah presensi kegiatan Anda terverifikasi.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: KEIKUTSERTAAN PROKER (PER-07 — KHUSUS KADER/TIM) */}
      {activeTab === "proker" && showProkerTab && (
        <div className="space-y-6">
          {/* Cascading Organizational Filter (front_end.md spec) */}
          <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-burgundy" />
                <h2 className="font-serif text-base font-bold text-wine-950">
                  Filter Riwayat Organisasi
                </h2>
              </div>
              {hasProkerFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setFilterCabinet("");
                    setFilterField("");
                    setFilterCompartment("");
                    setFilterProject("");
                  }}
                  className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-dark block">Kabinet</label>
                <select
                  value={filterCabinet}
                  onChange={(e) => {
                    setFilterCabinet(e.target.value);
                    setFilterField("");
                    setFilterCompartment("");
                    setFilterProject("");
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25"
                >
                  <option value="">Semua Kabinet</option>
                  {store.cabinets.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-dark block">Bidang</label>
                <select
                  value={filterField}
                  onChange={(e) => {
                    setFilterField(e.target.value);
                    setFilterCompartment("");
                    setFilterProject("");
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25"
                >
                  <option value="">Semua Bidang</option>
                  {availableFields.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-dark block">
                  Kompartemen
                </label>
                <select
                  value={filterCompartment}
                  onChange={(e) => {
                    setFilterCompartment(e.target.value);
                    setFilterProject("");
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25"
                >
                  <option value="">Semua Kompartemen</option>
                  {availableCompartments.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-dark block">
                  Program Kerja
                </label>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25"
                >
                  <option value="">Semua Program Kerja</option>
                  {availableProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Filtered Proker Cards */}
          {filteredRosters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRosters.map((roster) => {
                const project = store.projects.find((p) => p.id === roster.project_id);
                const comp = store.compartments.find((c) => c.id === project?.compartment_id);
                const cabinet = store.cabinets.find((c) => c.id === project?.cabinet_id);
                const statusInfo =
                  PROJECT_STATUS_LABELS[project?.operational_status || "ongoing"] ||
                  PROJECT_STATUS_LABELS.ongoing;

                return (
                  <div
                    key={roster.id}
                    className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                          {roster.role_title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.tone}`}
                        >
                          {statusInfo.label}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-wine-950 leading-snug">
                        {project?.name || "Program Kerja HIPMI"}
                      </h3>

                      <div className="space-y-1 text-xs text-neutral-dark">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#AF7D66] shrink-0" />
                          <span className="truncate">{comp?.name || "Kompartemen"}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-neutral-light">
                          <Building className="w-3.5 h-3.5 shrink-0" />
                          <span>{cabinet?.name || "Kabinet Arthakarsa"}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E9E1DC] flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-neutral-light">
                        Akses: {roster.access_level === "Manager" ? "Pengelola" : "Anggota Tim"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedRoster(roster)}
                        className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <span>Rincian Amanah</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-2.5">
              <FolderKanban className="w-10 h-10 text-neutral-300 mx-auto" />
              <p className="text-xs text-neutral-dark">
                {hasProkerFilter
                  ? "Tidak ada keterlibatan program kerja yang cocok dengan filter yang dipilih."
                  : "Anda belum tercatat dalam roster kepanitiaan program kerja mana pun."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recent Personal Activity Log */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/90 border border-[#E9E1DC] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
          <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#AF7D66]" />
            <span>Catatan Aktivitas Akun Terbaru</span>
          </h2>
          <span className="text-[11px] text-neutral-light">
            {Math.min(userActivities.length, 5)} terakhir
          </span>
        </div>

        {userActivities.length > 0 ? (
          <div className="space-y-2.5">
            {userActivities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <span className="text-wine-950 block truncate">
                    Anda <strong className="text-brand-burgundy">{act.action}</strong>: {act.target}
                  </span>
                  <span className="text-[10px] text-neutral-light">{act.module}</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-light shrink-0">
                  {new Date(act.timestamp).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-light">Belum ada catatan aktivitas akun terbaru.</p>
        )}
      </section>

      {/* MODAL 1: E-Tiket & QR Code */}
      <TicketQrModal
        ticket={selectedTicket}
        event={selectedTicketEvent}
        ticketType={selectedTicketType}
        onClose={() => setSelectedTicket(null)}
      />

      {/* MODAL 2: Rincian Status Pendaftaran */}
      <EditorialModal
        isOpen={!!selectedReservation}
        onClose={() => setSelectedReservation(null)}
        badge="Rincian Pendaftaran"
        title={selectedResEvent?.title || "Status Pendaftaran Agenda"}
        subtitle="Pantau status verifikasi pembayaran dan penerbitan tiket digital Anda."
        maxWidth="md"
        footer={
          <button
            type="button"
            onClick={() => setSelectedReservation(null)}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold hover:bg-brand-darkWine transition-colors"
          >
            Tutup
          </button>
        }
      >
        {selectedReservation && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Kode Pendaftaran
                </span>
                <strong className="font-mono text-wine-950">{selectedReservation.id}</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Nominal
                </span>
                <strong className="font-mono text-wine-950">
                  {selectedReservation.amount > 0
                    ? `Rp ${selectedReservation.amount.toLocaleString("id-ID")}`
                    : "Gratis"}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Status Pendaftaran
                </span>
                <strong className="text-wine-950">
                  {REGISTRATION_STATUS_LABELS[selectedReservation.registration_status]?.label ||
                    selectedReservation.registration_status}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Tanggal Daftar
                </span>
                <strong className="font-mono text-wine-950">
                  {new Date(selectedReservation.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>

            {selectedReservation.registration_status === "reserved" && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
                <span className="text-amber-900">
                  Menunggu konfirmasi bukti pembayaran sebelum batas waktu berakhir.
                </span>
                <Link
                  href={`/pendaftaran/${selectedReservation.id}/bayar`}
                  className="px-3.5 py-1.5 rounded-full bg-brand-burgundy text-white font-semibold shrink-0"
                >
                  Bayar →
                </Link>
              </div>
            )}
          </div>
        )}
      </EditorialModal>

      {/* MODAL 3: Pratinjau & Cetak E-Sertifikat */}
      <EditorialModal
        isOpen={!!selectedCertTicket}
        onClose={() => setSelectedCertTicket(null)}
        badge="E-Sertifikat Resmi"
        title="Pratinjau Sertifikat Kehadiran"
        subtitle="Sertifikat tervalidasi digital atas kehadiran sah Anda pada kegiatan HIPMI PT Universitas Telkom."
        maxWidth="xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setSelectedCertTicket(null)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6]"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
          </>
        }
      >
        {selectedCertTicket && (
          <div className="p-6 sm:p-10 rounded-3xl border-4 border-double border-[#5A1722] bg-gradient-to-b from-[#FFFDF9] to-[#FCF6EE] text-center space-y-6 shadow-inner">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-brand-burgundy font-bold block">
                HIPMI PERGURUAN TINGGI UNIVERSITAS TELKOM
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
                SERTIFIKAT KEIKUTSERTAAN
              </h3>
              <p className="text-[11px] font-mono text-neutral-dark">
                No: CERT-HIPMI-{selectedCertTicket.ticket_token.replace("DEMO-TKT-", "")}-2026
              </p>
            </div>

            <div className="py-4 space-y-1.5 border-y border-[#E8B577]/45">
              <p className="text-xs text-neutral-dark">Diberikan dengan hormat kepada:</p>
              <strong className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy block">
                {currentUser.name}
              </strong>
              <span className="text-xs font-mono text-neutral-dark block">
                NIM: {currentUser.nim || "-"}
              </span>
            </div>

            <p className="text-xs text-neutral-dark max-w-lg mx-auto leading-relaxed">
              Atas partisipasi aktif dan kehadiran penuh dalam agenda resmi{" "}
              <strong className="text-wine-950">
                {selectedCertEvent?.title || "Kegiatan HIPMI PT Universitas Telkom"}
              </strong>{" "}
              di bawah kepengurusan Kabinet Arthakarsa Periode 2026/2027.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-neutral-light block">Ketua Umum</span>
                <strong className="font-serif text-wine-950 block">Muhammad Fathur</strong>
                <span className="text-[10px] font-mono text-neutral-light">Kabinet Arthakarsa</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-neutral-light block">Verifikasi Digital</span>
                <strong className="font-serif text-wine-950 block">HIPMI Central</strong>
                <span className="text-[10px] font-mono text-emerald-700">Sah &amp; Terverifikasi</span>
              </div>
            </div>
          </div>
        )}
      </EditorialModal>

      {/* MODAL 4: Rincian Amanah Program Kerja (Read-Only) */}
      <EditorialModal
        isOpen={!!selectedRoster}
        onClose={() => setSelectedRoster(null)}
        badge="Rincian Keikutsertaan Proker"
        title={selectedRosterProject?.name || "Program Kerja HIPMI"}
        subtitle="Informasi keterlibatan dan konteks organisasi untuk program kerja yang Anda ikuti."
        maxWidth="lg"
        footer={
          <button
            type="button"
            onClick={() => setSelectedRoster(null)}
            className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        }
      >
        {selectedRoster && (
          <div className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Peran / Amanah Anda
                </span>
                <strong className="text-sm font-serif text-brand-burgundy">
                  {selectedRoster.role_title}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Status Program Kerja
                </span>
                <strong className="text-sm text-wine-950">
                  {PROJECT_STATUS_LABELS[selectedRosterProject?.operational_status || "ongoing"]
                    ?.label || "Sedang Berjalan"}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Kabinet &amp; Bidang
                </span>
                <strong className="text-wine-950 block">
                  {selectedRosterCabinet?.name || "Kabinet Arthakarsa"}
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  {selectedRosterField?.name || "-"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Kompartemen Pengampu
                </span>
                <strong className="text-wine-950 block">
                  {selectedRosterComp?.name || "-"}
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  Lokasi: {selectedRosterProject?.location || "Telkom University"}
                </span>
              </div>
            </div>

            {selectedRosterProject?.description && (
              <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Deskripsi Program Kerja
                </span>
                <p className="text-xs text-neutral-dark leading-relaxed">
                  {selectedRosterProject.description}
                </p>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-950">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                Tampilan ini merupakan ringkasan keterlibatan Anda pada Personal Area. Pengelolaan operasional internal proker (persuratan, keuangan, dan papan tugas) hanya diakses oleh Pengelola Proker melalui Workspace Organisasi.
              </span>
            </div>
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
