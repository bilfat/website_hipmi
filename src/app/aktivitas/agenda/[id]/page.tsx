"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Ticket,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { getEventVisual } from "../../aktivitas-data";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const evt = store.events.find((e) => e.id === id) || store.events[0];
  const ticketTypes = store.ticket_types.filter((tt) => tt.event_id === evt?.id);
  const visual = getEventVisual(evt?.id || "");

  if (!evt) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Acara Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Agenda acara yang Anda cari tidak tersedia dalam direktori.</p>
          <Link
            href="/aktivitas/agenda"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Kalender Agenda</span>
          </Link>
        </div>
      </PublicShell>
    );
  }

  const eventDate = new Date(evt.schedule_start);

  return (
    <PublicShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/aktivitas/agenda"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Agenda</span>
          </Link>
        </div>

        {/* Event Main Banner */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl">
          {/* Cover Photo */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden">
            <Image
              src={visual.image}
              alt={evt.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                  evt.category === "berbayar"
                    ? "bg-amber-600/90 text-white border-amber-300/40"
                    : "bg-emerald-600/90 text-white border-emerald-300/40"
                }`}
              >
                {evt.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-mono text-gold-300 font-semibold">
                {visual.tag}
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-mono text-white">
                {visual.priceDisplay}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-neutral-light uppercase tracking-wider block">
                  Diselenggarakan oleh: <strong className="text-brand-burgundy">{evt.organizer_unit}</strong>
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950">
                  {evt.title}
                </h1>
              </div>

              {evt.category === "berbayar" ? (
                <Link
                  href={`/aktivitas/agenda/${evt.id}/tiket`}
                  className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-brand-burgundy/20 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Beli / Pesan E-Tiket</span>
                </Link>
              ) : (
                <Link
                  href={`/aktivitas/agenda/${evt.id}/daftar`}
                  className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Daftar Gratis Mahasiswa</span>
                </Link>
              )}
            </div>

            <p className="text-sm text-neutral-dark leading-relaxed font-sans pt-2 border-t border-wine-950/10">
              {evt.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                <span className="text-neutral-light block uppercase font-mono text-[10px]">Waktu Pelaksanaan:</span>
                <strong className="text-wine-950 text-sm flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-brand-burgundy shrink-0" />
                  <span>
                    {eventDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} • {eventDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </span>
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                <span className="text-neutral-light block uppercase font-mono text-[10px]">Tempat / Venue:</span>
                <strong className="text-wine-950 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* Ticket Types Cards */}
        {ticketTypes.length > 0 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
                Kategori Tiket
              </span>
              <h2 className="font-serif text-2xl font-bold text-wine-950 mt-2">
                Pilihan Jenis Tiket Tersedia ({ticketTypes.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ticketTypes.map((tt) => {
                const isFree = tt.price === 0;

                return (
                  <div
                    key={tt.id}
                    className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-lg text-wine-950">
                          {tt.name}
                        </span>
                        <span className="font-mono font-bold text-brand-burgundy text-base">
                          {isFree ? "Gratis" : `Rp ${tt.price.toLocaleString("id-ID")}`}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-dark leading-relaxed font-sans">
                        {tt.description}
                      </p>

                      <div className="pt-2 text-xs text-neutral-light font-mono flex items-center justify-between">
                        <span>Kuota: {tt.quota_total} Peserta</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>QRIS Instant</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-wine-950/10 flex items-center justify-end">
                      <Link
                        href={`/aktivitas/agenda/${evt.id}/tiket`}
                        className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                      >
                        <span>Pilih Tiket Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </PublicShell>
  );
}
