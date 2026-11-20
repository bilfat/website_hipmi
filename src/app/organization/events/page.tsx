"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
} from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { AppEvent, TicketCategory } from "@/types/domain";
import {
  Calendar,
  Search,
  Plus,
  MapPin,
  Ticket,
  Users,
  QrCode,
  Settings,
  CheckCircle2,
  ExternalLink,
  CalendarCheck,
  Info,
} from "lucide-react";

export default function OrganizationEventsPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Create Event modal form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("gratis");
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [timeStr, setTimeStr] = useState("09:00");
  const [location, setLocation] = useState("Auditorium Gedung Damar Telkom University");
  const [projectId, setProjectId] = useState("");
  const [price, setPrice] = useState("25000");
  const [quota, setQuota] = useState("150");

  const allEvents = store.events || [];
  const filteredEvents = allEvents.filter((e) => {
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !e.title.toLowerCase().includes(q) &&
        !e.organizer_unit.toLowerCase().includes(q) &&
        !e.location.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const totalIssuedTickets = store.tickets.length;
  const totalCheckedIn = store.tickets.filter((t) => t.is_checked_in).length;
  const pendingPayments = store.reservations.filter(
    (r) => r.registration_status === "pending_verification"
  ).length;

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateStr) return;

    const newEventId = `evt-${Date.now()}`;
    const startIso = `${dateStr}T${timeStr}:00+07:00`;
    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
    const proj = store.projects.find((p) => p.id === projectId);

    const newEvent: AppEvent = {
      id: newEventId,
      project_id: projectId || undefined,
      title: title.trim(),
      description: description.trim() || "Agenda resmi HIPMI Perguruan Tinggi Universitas Telkom.",
      organizer_unit: proj ? proj.name : permissions.roleScopeSubtitle,
      lead_organizer_user_id: currentUser.id,
      poster_url: "/assets/assets_logo/logo_hipmi.png",
      category,
      schedule_start: startIso,
      schedule_end: startIso,
      location: location.trim() || "Universitas Telkom",
      public_terms: "Terbuka untuk mahasiswa Telkom University & umum.",
      visibility: "public",
      status: "published",
    };

    mutateStore((draft) => {
      draft.events.unshift(newEvent);

      // Auto-create default ticket type
      draft.ticket_types.push({
        id: `tt-${Date.now()}`,
        event_id: newEventId,
        name: category === "gratis" ? "Tiket Gratis Mahasiswa" : "Tiket Reguler",
        description: "Akses penuh seluruh sesi acara & e-sertifikat.",
        price: category === "gratis" ? 0 : Number(price) || 25000,
        quota_total: Number(quota) || 100,
        quota_reserved: 0,
        quota_sold: 0,
        sales_start: new Date().toISOString(),
        sales_end: startIso,
        status: "open",
      });

      // Auto-sync date milestone into Kalender Organisasi (zero duplicate manual input!)
      if (!draft.calendar_events) draft.calendar_events = [];
      draft.calendar_events.push({
        id: `cal-evt-${Date.now()}`,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        title: `Event Publik: ${title.trim()}`,
        category: "Main Event Proker",
        start_time: startIso,
        end_time: startIso,
        location: location.trim() || "Universitas Telkom",
        description: `Disinkronkan otomatis dari Agenda & Event (${category}).`,
        visibility: "public",
        linked_event_id: newEventId,
        linked_project_id: projectId || undefined,
        owner_user_id: currentUser.id,
        created_at: new Date().toISOString(),
      });

      addActivityHistory(
        currentUser.name,
        "membuat agenda event publik baru",
        title.trim(),
        "Agenda & Event"
      );
    });

    setTitle("");
    setDescription("");
    setProjectId("");
    setCreateOpen(false);
    setFeedback(
      `Event "${newEvent.title}" berhasil dibuat, tayang di halaman publik, dan otomatis disinkronkan ke Kalender Organisasi.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Publikasi Event, Ticketing &amp; Presensi QR
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Agenda &amp; Event Publik
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Kelola acara resmi gratis maupun berbayar yang tayang di portal publik, atur jenis tiket, verifikasi pembayaran, kirim ulang e-tiket, dan jalankan check-in QR / manual.
          </p>
        </div>

        {(permissions.canManageEvents || permissions.managedProjectIds.length > 0 || permissions.isKakom) && (
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Event Baru</span>
          </button>
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Event", val: allEvents.length, sub: "Tayang di portal publik", icon: CalendarCheck, tone: "bg-brand-burgundy/10 text-brand-burgundy" },
          { label: "Tiket Terbit", val: totalIssuedTickets, sub: "E-Tiket resmi peserta", icon: Ticket, tone: "bg-[#E8B577]/25 text-[#8A5A2B]" },
          { label: "Verifikasi Bayar", val: pendingPayments, sub: "Bukti bayar menunggu", icon: Users, tone: "bg-amber-500/12 text-amber-700" },
          { label: "Presensi Hadir", val: totalCheckedIn, sub: "Check-in QR & manual", icon: QrCode, tone: "bg-emerald-500/12 text-emerald-700" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 pb-2">
                <span className="text-[11px] font-semibold text-neutral-dark">{k.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${k.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <strong className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none block">
                  {k.val}
                </strong>
                <span className="text-[11px] text-neutral-light mt-1 block">{k.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari judul event, unit penyelenggara, atau lokasi..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Kategori Tiket</option>
          <option value="gratis">Gratis</option>
          <option value="berbayar">Berbayar</option>
        </select>
      </div>

      {/* Events Auto-Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((evt) => {
          const evtTickets = store.tickets.filter((t) => t.event_id === evt.id);
          const checkedIn = evtTickets.filter((t) => t.is_checked_in).length;

          return (
            <div
              key={evt.id}
              className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        evt.category === "gratis"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-brand-burgundy/10 text-brand-burgundy border-brand-burgundy/25"
                      }`}
                    >
                      {evt.category === "gratis" ? "Gratis" : "Berbayar"}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                      {evt.organizer_unit}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-dark">
                    Hadir: {checkedIn}/{evtTickets.length}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-wine-950 leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-1 text-xs text-neutral-dark">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                    {new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#AF7D66] shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E9E1DC] flex flex-wrap items-center gap-2">
                <Link
                  href={`/organization/events/${evt.id}`}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Kelola 6-Tab Event</span>
                </Link>
                <Link
                  href={`/organization/events/${evt.id}/check-in`}
                  className="px-3.5 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Presensi QR</span>
                </Link>
                <Link
                  href={`/aktivitas/agenda/${evt.id}`}
                  target="_blank"
                  className="px-3 py-2 rounded-full text-xs font-semibold text-neutral-dark hover:text-brand-burgundy inline-flex items-center gap-1 ml-auto"
                >
                  <span>Publik</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Buat Event Baru (Auto-syncs to Kalender Organisasi!) */}
      <EditorialModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        badge="Agenda & Event Publik"
        title="Buat Event Publik Baru"
        subtitle="Event yang dibuat langsung tayang di portal Agenda & Tiket publik dan otomatis disinkronkan ke Kalender Organisasi."
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="create-event-modal-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan &amp; Tayangkan Event
            </button>
          </>
        }
      >
        <form id="create-event-modal-form" onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">Nama Event *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Seminar Nasional Kewirausahaan Muda 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kategori Tiket</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="gratis">Gratis</option>
                <option value="berbayar">Berbayar</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Program Kerja Terkait</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="">Event Umum / Kompartemen</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tanggal Pelaksanaan *</label>
              <input
                type="date"
                required
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Jam Mulai</label>
              <input
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>

            {category === "berbayar" && (
              <div className="space-y-1">
                <label className="font-semibold text-wine-950">Harga Tiket Awal (Rp)</label>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kuota Tiket Awal</label>
              <input
                type="number"
                min={1}
                value={quota}
                onChange={(e) => setQuota(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">Lokasi Event</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">Deskripsi Singkat</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ringkasan acara, pembicara, dan manfaat untuk peserta..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start gap-2 text-[11px] text-neutral-dark">
            <Info className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
            <span>
              Jenis tiket tambahan (Early Bird, VIP, dll.) dapat diatur lebih lanjut melalui tab <strong>Jenis Tiket</strong> di halaman 6-Tab Event.
            </span>
          </div>
        </form>
      </EditorialModal>
    </div>
  );
}
