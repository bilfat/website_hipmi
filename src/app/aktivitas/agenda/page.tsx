"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Calendar, MapPin, Ticket, ArrowRight, Sparkles, Search } from "lucide-react";

export default function PublicEventsPage() {
  const { store } = useMockStore();
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const publicEvents = store.events.filter((e) => e.visibility === "public");

  const filteredEvents = publicEvents.filter((e) => {
    if (filterCategory === "all") return true;
    return e.category === filterCategory;
  });

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Kalender Acara
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
              Agenda &amp; Tiket Acara Resmi
            </h1>
            <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
              Ikuti expo kewirausahaan, workshop praktis, dan seminar bisnis mahasiswa HIPMI PT Universitas Telkom.
            </p>
          </div>

          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="px-5 py-2.5 rounded-full bg-gold-50 hover:bg-gold-100 text-brand-burgundy border border-gold-400 text-xs font-semibold shadow-sm transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Ticket className="w-4 h-4 text-gold-700" />
            <span>Cek Status E-Tiket Saya</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "berbayar", label: "Event Berbayar (QRIS)" },
            { id: "gratis", label: "Event Gratis Mahasiswa" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filterCategory === tab.id
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => {
            const ticketTypes = store.ticket_types.filter((tt) => tt.event_id === evt.id);

            return (
              <div
                key={evt.id}
                className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        evt.category === "berbayar"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      }`}
                    >
                      {evt.category}
                    </span>

                    <span className="text-xs text-neutral-light flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                      <span>{new Date(evt.schedule_start).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-lg text-wine-950">
                      {evt.title}
                    </h2>
                    <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-wine-950/10 text-xs text-neutral-dark">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-light pt-1">
                      <span>Penyelenggara:</span>
                      <strong className="text-wine-950 truncate max-w-[170px]">{evt.organizer_unit}</strong>
                    </div>

                    {ticketTypes.length > 0 && (
                      <div className="flex items-center justify-between text-[11px] text-neutral-light">
                        <span>Pilihan Tiket:</span>
                        <strong className="text-brand-burgundy">{ticketTypes.length} Tipe Tersedia</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-between">
                  <Link
                    href={`/aktivitas/agenda/${evt.id}`}
                    className="text-xs font-semibold text-neutral-dark hover:text-wine-950"
                  >
                    Detail Acara
                  </Link>

                  <Link
                    href={`/aktivitas/agenda/${evt.id}/tiket`}
                    className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Pesan Tiket</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PublicShell>
  );
}
