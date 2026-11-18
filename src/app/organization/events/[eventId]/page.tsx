"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar,
  Ticket,
  Users,
  CreditCard,
  QrCode,
  FileText,
  ChevronLeft,
  Edit3,
  ExternalLink,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  BarChart3,
  Mail
} from "lucide-react";

export default function EventDetailManagementPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store, updateStore } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticketTypes = store.ticket_types.filter((t) => t.event_id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);
  const reservations = store.reservations.filter((r) => r.event_id === eventId);
  const pendingPayments = reservations.filter((r) => r.payment_status === "pending_verification");

  const [activeTab, setActiveTab] = useState<"info" | "tickets" | "participants" | "payments" | "attendance" | "reports">("info");
  const [notice, setNotice] = useState<string | null>(null);

  if (!event) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Agenda Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{eventId}" tidak terdaftar.</p>
          <Link
            href="/organization/events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleTogglePublish = () => {
    const newStatus: "draft" | "published" = event.status === "published" ? "draft" : "published";
    const updated = store.events.map((e) => (e.id === event.id ? { ...e, status: newStatus } : e));
    updateStore({ events: updated });
    setNotice(`Status agenda berhasil diubah menjadi: ${newStatus}`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/events"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Daftar Agenda
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-04
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              {event.title}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Penyelenggara: {event.organizer_unit} • Status:{" "}
              <span className="font-bold uppercase text-brand-burgundy">{event.status}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleTogglePublish}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                event.status === "published"
                  ? "bg-amber-100 hover:bg-amber-200 text-amber-900"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              }`}
            >
              {event.status === "published" ? "Unpublish (Kembalikan Draft)" : "Publikasikan Agenda"}
            </button>

            <Link
              href={`/calendar/events/form?mode=edit&recordId=${event.id}&source=events`}
              className="px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-burgundy" /> Edit Detail (EVT-03)
            </Link>

            {event.visibility === "public" && (
              <Link
                href={`/aktivitas/agenda/${event.id}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Halaman Publik
              </Link>
            )}
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* 6 Tabs Navigation Bar */}
        <div className="flex border-b border-wine-200 gap-1 overflow-x-auto pb-px">
          {[
            { id: "info", label: "Informasi Agenda", icon: Calendar },
            { id: "tickets", label: `Jenis Tiket (${ticketTypes.length})`, icon: Ticket, link: `/organization/events/${event.id}/ticket-types` },
            { id: "participants", label: `Peserta (${tickets.length})`, icon: Users, link: `/organization/events/${event.id}/participants` },
            { id: "payments", label: `Verifikasi Bayar (${pendingPayments.length})`, icon: CreditCard, link: `/organization/events/${event.id}/payments` },
            { id: "attendance", label: "Check-in Presensi", icon: QrCode, link: `/organization/events/${event.id}/check-in` },
            { id: "reports", label: "Laporan Penjualan", icon: BarChart3, link: `/organization/events/${event.id}/reports` },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-xs font-semibold inline-flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-brand-burgundy text-brand-burgundy bg-wine-50/50"
                    : "border-transparent text-wine-600 hover:text-wine-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Info Overview */}
        {activeTab === "info" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-base text-wine-950">
                  Deskripsi & Ketentuan Agenda
                </h3>
                <p className="text-sm text-wine-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>

                <div className="p-4 rounded-xl bg-surface-base border border-wine-100 text-xs space-y-1">
                  <span className="font-bold text-wine-900 uppercase">Syarat & Ketentuan Publik:</span>
                  <p className="text-wine-600">{event.public_terms}</p>
                </div>
              </div>

              {/* Sub-links quick shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href={`/organization/events/${event.id}/ticket-types`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-wine-900 uppercase">Kelola Tiket (EVT-05)</span>
                    <Ticket className="w-4 h-4 text-brand-burgundy" />
                  </div>
                  <p className="text-xs text-wine-600">Atur harga, kuota, dan masa penjualan tiket.</p>
                </Link>

                <Link
                  href={`/organization/events/${event.id}/delivery`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-wine-900 uppercase">Ticket Delivery & Broadcast (EVT-08)</span>
                    <Mail className="w-4 h-4 text-brand-burgundy" />
                  </div>
                  <p className="text-xs text-wine-600">Log pengiriman e-tiket & pengiriman ulang email peserta.</p>
                </Link>
              </div>
            </div>

            {/* Sidebar Meta */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4 text-xs">
                <h4 className="font-bold text-wine-950 uppercase tracking-wider text-xs border-b border-wine-100 pb-2">
                  Metadata Pelaksanaan
                </h4>

                <div className="space-y-1">
                  <span className="text-wine-500 font-medium">Jadwal (WIB):</span>
                  <p className="font-bold text-wine-900 font-mono">
                    {new Date(event.schedule_start).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                  <p className="text-wine-600 font-mono">
                    {new Date(event.schedule_start).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {new Date(event.schedule_end).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-wine-500 font-medium">Lokasi Venue:</span>
                  <p className="font-bold text-wine-900">{event.location}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-wine-500 font-medium">Visibilitas Sistem:</span>
                  <p className="font-semibold text-brand-burgundy capitalize">{event.visibility}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-wine-500 font-medium">QRIS Demo Agenda:</span>
                  <p className="text-wine-600 font-mono text-[11px]">Satu rekening QRIS aktif per agenda</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Shortcut for other tabs if clicked directly */}
        {activeTab !== "info" && (
          <div className="p-8 rounded-2xl bg-white border border-wine-100 text-center space-y-4">
            <h3 className="text-base font-bold text-wine-900 font-display">
              Buka Modul Khusus: {activeTab.toUpperCase()}
            </h3>
            <p className="text-xs text-wine-600 max-w-md mx-auto">
              Setiap tab memiliki layar kanonikal tersendiri sesuai spesifikasi PRD v1.1.
            </p>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-burgundy text-white text-xs font-semibold shadow-xs"
            >
              Buka Layar Penuh {activeTab.toUpperCase()}
            </Link>
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}
