"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  Calendar,
  Ticket,
  Users,
  CreditCard,
  QrCode,
  ChevronLeft,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Mail,
} from "lucide-react";

type EventTab = "info" | "tickets" | "participants" | "payments" | "attendance" | "reports";

export default function EventDetailManagementPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store, currentUser } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticketTypes = store.ticket_types.filter((t) => t.event_id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);
  const reservations = store.reservations.filter((r) => r.event_id === eventId);
  const pendingPayments = reservations.filter((r) => r.payment_status === "pending_verification");
  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;

  const [activeTab, setActiveTab] = useState<EventTab>("info");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(event?.title || "");
  const [editLocation, setEditLocation] = useState(event?.location || "");
  const [editDesc, setEditDesc] = useState(event?.description || "");
  const [editTerms, setEditTerms] = useState(event?.public_terms || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!event) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white/95 border border-[#E9E1DC] space-y-4">
        <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
        <h2 className="font-serif text-xl font-bold text-wine-950">Agenda Tidak Ditemukan</h2>
        <Link
          href="/organization/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Agenda
        </Link>
      </div>
    );
  }

  const totalRevenue = tickets.reduce((sum, tkt) => {
    const tier = ticketTypes.find((tt) => tt.id === tkt.ticket_type_id);
    return sum + (tier ? tier.price : 0);
  }, 0);

  const handleTogglePublish = () => {
    const nextStatus: "draft" | "published" = event.status === "published" ? "draft" : "published";
    mutateStore((draft) => {
      const target = draft.events.find((e) => e.id === event.id);
      if (target) target.status = nextStatus;
      addActivityHistory(
        currentUser.name,
        nextStatus === "published" ? "memublikasikan event ke portal publik" : "mengembalikan event ke draf",
        event.title,
        "Agenda & Event"
      );
    });
    setNotice(
      nextStatus === "published"
        ? "Event kini tayang di halaman Agenda & Event publik."
        : "Event dikembalikan ke status Draf."
    );
  };

  const openEdit = () => {
    setEditTitle(event.title);
    setEditLocation(event.location);
    setEditDesc(event.description);
    setEditTerms(event.public_terms);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    mutateStore((draft) => {
      const target = draft.events.find((ev) => ev.id === event.id);
      if (target) {
        target.title = editTitle.trim();
        target.location = editLocation.trim();
        target.description = editDesc.trim();
        target.public_terms = editTerms.trim();
      }
    });
    setEditModalOpen(false);
    setNotice("Detail agenda & event berhasil diperbarui.");
  };

  const tabs: { id: EventTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "info", label: "Informasi", icon: Calendar },
    { id: "tickets", label: `Jenis Tiket (${ticketTypes.length})`, icon: Ticket },
    { id: "participants", label: `Peserta (${tickets.length})`, icon: Users },
    { id: "payments", label: `Pembayaran (${pendingPayments.length})`, icon: CreditCard },
    { id: "attendance", label: `Presensi (${checkedInCount})`, icon: QrCode },
    { id: "reports", label: "Laporan", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/organization/events"
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Agenda &amp; Event</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            {event.title}
          </h1>
          <p className="text-xs text-neutral-dark">
            Penyelenggara: <strong className="text-wine-950">{event.organizer_unit}</strong> •
            Status: <strong className="uppercase text-brand-burgundy">{event.status}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={openEdit}
            className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>Edit Detail</span>
          </button>
          <button
            type="button"
            onClick={handleTogglePublish}
            className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm ${
              event.status === "published"
                ? "bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100"
                : "bg-emerald-700 hover:bg-emerald-800 text-white"
            }`}
          >
            {event.status === "published" ? "Kembalikan Draf" : "Publikasikan Event"}
          </button>
          {event.visibility === "public" && (
            <Link
              href={`/aktivitas/agenda/${event.id}`}
              target="_blank"
              className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Portal Publik</span>
            </Link>
          )}
        </div>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 6 Sliding Tabs */}
      <div className="p-1.5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="event-detail-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Informasi */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
          <div className="lg:col-span-2 space-y-5">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Deskripsi &amp; Ketentuan Agenda
              </h2>
              <p className="text-neutral-dark leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
              <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1">
                <strong className="text-wine-950 block">Syarat &amp; Ketentuan Publik</strong>
                <p className="text-neutral-dark">{event.public_terms}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <Link
                href={`/organization/events/${event.id}/ticket-types`}
                className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] hover:border-brand-burgundy/40 shadow-sm space-y-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-wine-950">Kelola Jenis Tiket</strong>
                  <Ticket className="w-4 h-4 text-brand-burgundy" />
                </div>
                <p className="text-[11px] text-neutral-dark">Atur harga, kuota, dan periode penjualan tiket.</p>
              </Link>
              <Link
                href={`/organization/events/${event.id}/delivery`}
                className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] hover:border-brand-burgundy/40 shadow-sm space-y-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-wine-950">Pengiriman Email Tiket</strong>
                  <Mail className="w-4 h-4 text-brand-burgundy" />
                </div>
                <p className="text-[11px] text-neutral-dark">Pantau status pengiriman &amp; kirim ulang e-tiket.</p>
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
            <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-[#E9E1DC]">
              Metadata Pelaksanaan
            </h3>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">Jadwal (WIB)</span>
              <strong className="text-wine-950 block">
                {new Date(event.schedule_start).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">Lokasi Venue</span>
              <strong className="text-wine-950 block">{event.location}</strong>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">Kategori &amp; QRIS</span>
              <strong className="text-brand-burgundy capitalize block">
                {event.category} • 1 QRIS khusus agenda ini
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2–6: Live Summary + Full-Screen Action Link */}
      {activeTab !== "info" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
            <div>
              <h2 className="font-serif text-lg font-bold text-wine-950">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h2>
              <p className="text-neutral-dark">
                Ringkasan data langsung untuk agenda ini atau buka layar kerja penuh untuk tindakan massal.
              </p>
            </div>
            <Link
              href={`/organization/events/${event.id}/${
                activeTab === "tickets"
                  ? "ticket-types"
                  : activeTab === "participants"
                  ? "participants"
                  : activeTab === "payments"
                  ? "payments"
                  : activeTab === "attendance"
                  ? "check-in"
                  : "reports"
              }`}
              className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold shadow-sm self-start sm:self-auto"
            >
              Buka Layar Penuh →
            </Link>
          </div>

          {activeTab === "tickets" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ticketTypes.map((tt) => (
                <div key={tt.id} className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1">
                  <strong className="font-serif text-sm text-wine-950 block">{tt.name}</strong>
                  <span className="font-mono font-bold text-brand-burgundy block">
                    {tt.price > 0 ? `Rp ${tt.price.toLocaleString("id-ID")}` : "Gratis"}
                  </span>
                  <span className="text-[11px] text-neutral-dark">
                    Terjual: {tt.quota_sold} / {tt.quota_total} kuota
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "participants" && (
            <div className="space-y-2">
              {tickets.slice(0, 6).map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-2"
                >
                  <div>
                    <strong className="text-wine-950 block">{t.participant_name}</strong>
                    <span className="text-[11px] font-mono text-neutral-dark">
                      {t.ticket_token} • {t.participant_nim}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      t.is_checked_in
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {t.is_checked_in ? "Hadir" : "Belum Check-in"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "payments" && (
            <p className="text-neutral-dark">
              Terdapat <strong className="text-brand-burgundy">{pendingPayments.length}</strong>{" "}
              bukti pembayaran menunggu verifikasi penyelenggara dari total {reservations.length} reservasi.
            </p>
          )}

          {activeTab === "attendance" && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">Total Hadir</span>
                <strong className="font-serif text-xl text-emerald-700">
                  {checkedInCount} / {tickets.length}
                </strong>
              </div>
              <Link
                href={`/organization/events/${event.id}/scanner`}
                className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold inline-flex items-center gap-1.5 shadow-sm"
              >
                <QrCode className="w-4 h-4" />
                <span>Buka QR Scanner</span>
              </Link>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] inline-block">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Estimasi Pendapatan Tiket Terbit
              </span>
              <strong className="font-mono text-xl text-emerald-700">
                Rp {totalRevenue.toLocaleString("id-ID")}
              </strong>
            </div>
          )}
        </div>
      )}

      {/* Modal Edit Detail Event */}
      <EditorialModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        badge="Pengaturan Agenda & Event"
        title="Edit Informasi Event"
        subtitle="Perbarui judul, lokasi venue, deskripsi, atau syarat ketentuan publik."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="edit-event-detail-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan Perubahan
            </button>
          </>
        }
      >
        <form id="edit-event-detail-form" onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Judul Event</label>
            <input
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Lokasi Venue</label>
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Deskripsi</label>
            <textarea
              rows={3}
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Syarat &amp; Ketentuan Publik</label>
            <textarea
              rows={2}
              value={editTerms}
              onChange={(e) => setEditTerms(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>
        </form>
      </EditorialModal>
    </div>
  );
}
