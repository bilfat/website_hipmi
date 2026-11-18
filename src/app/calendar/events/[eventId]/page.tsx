"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  Clock,
  MapPin,
  Users,
  Edit3,
  XCircle,
  CheckCircle2,
  Tag,
  Share2,
  ExternalLink,
  Ticket,
  AlertCircle
} from "lucide-react";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const router = useRouter();
  const { store, updateStore } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticketTypes = store.ticket_types.filter((t) => t.event_id === eventId);
  const leadUser = store.users.find((u) => u.id === event?.lead_organizer_user_id);

  const [notification, setNotification] = useState<string | null>(null);

  if (!event) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Jadwal / Agenda Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{eventId}" tidak terdaftar dalam sistem.</p>
          <Link
            href="/organization/calendar"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Kalender
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const startDate = new Date(event.schedule_start);
  const endDate = new Date(event.schedule_end);

  const handleToggleStatus = (newStatus: "draft" | "published" | "cancelled" | "completed") => {
    const updatedEvents = store.events.map((e) =>
      e.id === event.id ? { ...e, status: newStatus } : e
    );
    updateStore({ events: updatedEvents });
    setNotification(`Status agenda berhasil diubah menjadi: ${newStatus}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/calendar"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Kalender Organisasi
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              CAL-03
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/calendar/events/form?mode=edit&recordId=${event.id}`}
              className="px-3.5 py-1.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Jadwal (CAL-04)
            </Link>
          </div>
        </div>

        {notification && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wine-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  event.visibility === "public"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {event.visibility === "public" ? "🌐 Publik" : "🔒 Internal"}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                {event.category.toUpperCase()}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-200">
                Unit: {event.organizer_unit}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-wine-500 font-medium">Status Agenda:</span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  event.status === "published"
                    ? "bg-emerald-100 text-emerald-800"
                    : event.status === "cancelled"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              {event.title}
            </h1>
            <p className="text-sm text-wine-700 mt-2 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Key Schedule Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-base border border-wine-100 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-wine-500 text-xs font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-burgundy" /> Waktu Pelaksanaan (WIB)
              </span>
              <p className="font-semibold text-wine-900 font-mono">
                {startDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
              <p className="text-wine-600 text-xs font-mono">
                {startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} -{" "}
                {endDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-wine-500 text-xs font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-burgundy" /> Lokasi / Ruangan
              </span>
              <p className="font-semibold text-wine-900">{event.location}</p>
              <p className="text-wine-500 text-xs">Penanggung Jawab: {leadUser?.full_name || event.organizer_unit}</p>
            </div>
          </div>

          {/* If Event has Tickets / Public Link */}
          {ticketTypes.length > 0 && (
            <div className="p-4 rounded-xl bg-wine-50/50 border border-wine-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-brand-burgundy" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-wine-900">
                    Tiket & Pendaftaran Peserta
                  </h4>
                </div>
                <Link
                  href={`/aktivitas/agenda/${event.id}`}
                  className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                >
                  Lihat Halaman Publik <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ticketTypes.map((t) => (
                  <div key={t.id} className="p-3 rounded-lg bg-white border border-wine-100 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-wine-900">{t.name}</span>
                      <span className="font-semibold text-brand-burgundy">
                        {t.price === 0 ? "GRATIS" : `Rp ${t.price.toLocaleString("id-ID")}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-wine-500">{t.description}</p>
                    <div className="text-[11px] text-wine-600 flex justify-between pt-1 border-t border-wine-50">
                      <span>Terjual: {t.quota_sold}</span>
                      <span>Total Kuota: {t.quota_total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin / Action Controls */}
          <div className="pt-4 border-t border-wine-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-wine-500 font-medium">Ubah Status Cepat:</span>
              <button
                onClick={() => handleToggleStatus("published")}
                className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all"
              >
                Set Published
              </button>
              <button
                onClick={() => handleToggleStatus("cancelled")}
                className="px-2.5 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 transition-all"
              >
                Batalkan
              </button>
            </div>

            <div className="flex items-center gap-2">
              {event.project_id && (
                <Link
                  href={`/workspace/projects/${event.project_id}`}
                  className="text-xs font-medium text-wine-700 hover:text-brand-burgundy underline"
                >
                  Buka Proker Terkait
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
