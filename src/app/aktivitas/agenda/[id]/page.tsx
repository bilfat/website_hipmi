"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const evt = store.events.find((e) => e.id === id) || store.events[0];
  const ticketTypes = store.ticket_types.filter((tt) => tt.event_id === evt.id);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb */}
        <Link
          href="/aktivitas/agenda"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Agenda</span>
        </Link>

        {/* Event Main Banner */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                  evt.category === "berbayar"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                }`}
              >
                {evt.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                {evt.title}
              </h1>
              <p className="text-xs text-neutral-light">
                Diselenggarakan oleh: <strong className="text-wine-950">{evt.organizer_unit}</strong>
              </p>
            </div>

            <Link
              href={`/aktivitas/agenda/${evt.id}/tiket`}
              className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-colors flex items-center gap-2 shrink-0"
            >
              <Ticket className="w-4 h-4" />
              <span>Beli / Pesan Tiket</span>
            </Link>
          </div>

          <p className="text-sm text-neutral-dark leading-relaxed pt-4 border-t border-wine-950/10">
            {evt.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-wine-950/10 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Waktu Pelaksanaan:</span>
              <strong className="text-wine-950 text-sm flex items-center gap-1.5 font-mono">
                <Calendar className="w-4 h-4 text-brand-burgundy" />
                <span>
                  {new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Tempat / Venue:</span>
              <strong className="text-wine-950 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-600" />
                <span>{evt.location}</span>
              </strong>
            </div>
          </div>
        </div>

        {/* Ticket Types Cards */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Kategori Tiket
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Pilihan Jenis Tiket Tersedia
            </h2>
          </div>

          {ticketTypes.length === 0 ? (
            <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 text-center text-xs text-neutral-light">
              Pemesanan tiket untuk acara ini belum dibuka.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ticketTypes.map((tt) => {
                const sisaKuota = tt.quota_total - tt.quota_sold;
                const isSoldOut = sisaKuota <= 0 || tt.status === "soldout";

                return (
                  <div
                    key={tt.id}
                    className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-brand-burgundy px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-300">
                          {tt.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            isSoldOut
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isSoldOut ? "Habis" : "Tersedia"}
                        </span>
                      </div>

                      <div className="pt-2">
                        <p className="font-serif text-2xl font-bold text-wine-950">
                          {tt.price === 0 ? "Gratis" : `Rp${tt.price.toLocaleString("id-ID")}`}
                        </p>
                        <p className="text-xs text-neutral-dark mt-1 leading-relaxed">
                          {tt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-wine-950/10 text-xs text-neutral-light space-y-1">
                        <p>Total Kuota: <strong className="text-wine-950">{tt.quota_total}</strong> kursi</p>
                        <p>Sisa Kuota: <strong className="text-brand-burgundy font-bold">{Math.max(0, sisaKuota)}</strong> kursi</p>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-wine-950/10">
                      {isSoldOut ? (
                        <div className="w-full py-2.5 rounded-xl bg-neutral-light/20 text-neutral-dark text-xs font-semibold text-center cursor-not-allowed">
                          Tiket Habis Terjual
                        </div>
                      ) : (
                        <Link
                          href={`/aktivitas/agenda/${evt.id}/tiket`}
                          className="w-full py-2.5 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Pilih Tiket Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 space-y-3 text-xs text-neutral-dark">
          <div className="flex items-center gap-2 text-wine-950 font-bold">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span>Ketentuan &amp; Tata Tertib Peserta:</span>
          </div>
          <p className="leading-relaxed">{evt.public_terms}</p>
        </div>
      </div>
    </PublicShell>
  );
}
