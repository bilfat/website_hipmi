"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ArrowRight, Clock, Sparkles } from "lucide-react";
import { useMockStore } from "@/lib/mock/store";

export const AgendaTicketShowcase: React.FC = () => {
  const { store } = useMockStore();

  const publishedEvents = store.events
    .filter((e) => e.status === "published" || e.status === "draft")
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF5F2] to-[#F8EFF1] border-b border-wine-950/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-wine-950/10 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/90 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-gold-600" />
              <span>Agenda &amp; Tiket Acara</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-wine-950 tracking-tight">
              Event &amp; Kegiatan <span className="text-brand-burgundy italic">Mendatang</span>
            </h2>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark">
              Ikuti lokakarya bisnis, seminar inspiratif, dan jejaring eksklusif wirausaha Telkom University.
            </p>
          </div>

          <Link
            href="/aktivitas/agenda"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-4 group"
          >
            <span>Lihat Seluruh Kalender Agenda</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* VIP PERFORATED TICKET CARDS GRID (Anti-Boring Ticket Stub Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {publishedEvents.map((evt) => {
            const isFree = evt.category === "gratis";
            const dateObj = evt.schedule_start ? new Date(evt.schedule_start) : null;
            const dayStr = dateObj ? dateObj.getDate() : "28";
            const monthStr = dateObj
              ? dateObj.toLocaleDateString("id-ID", { month: "short" }).toUpperCase()
              : "NOV";
            const yearStr = dateObj ? dateObj.getFullYear() : "2026";

            return (
              <div
                key={evt.id}
                className="rounded-2xl sm:rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
              >
                {/* Perforated Ticket Notches */}
                <div className="absolute left-0 top-16 sm:top-24 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FAF5F2] border-r border-gold-400/40" />
                <div className="absolute right-0 top-16 sm:top-24 translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FAF5F2] border-l border-gold-400/40" />

                {/* Ticket Top: Date & Badge */}
                <div className="p-3 sm:p-6 border-b border-dashed border-wine-950/20 bg-surface-ivory/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-gold-400/60 shadow-sm flex flex-col items-center justify-center text-center shrink-0">
                      <span className="font-serif font-black text-sm sm:text-xl text-brand-burgundy leading-none">
                        {dayStr}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[11px] font-bold text-gold-800 uppercase tracking-widest mt-0.5">
                        {monthStr}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[11px] font-mono text-neutral-dark block">
                        {yearStr}
                      </span>
                      <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded-full bg-gold-200 text-wine-950 font-mono text-[7px] sm:text-[11px] font-bold uppercase tracking-wider mt-0.5 truncate max-w-[85px] sm:max-w-none">
                        {isFree ? "GRATIS" : "TERBUKA"}
                      </span>
                    </div>
                  </div>

                  <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600/70 hidden sm:inline-block" />
                </div>

                {/* Ticket Body: Title & Info */}
                <div className="p-3 sm:p-6 space-y-2 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="font-serif font-bold text-xs sm:text-lg text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                      {evt.title}
                    </h3>
                    <p className="font-ui text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed hidden sm:block">
                      {evt.description}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1.5 sm:pt-2 text-[10px] sm:text-xs font-ui text-neutral-dark">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-600 shrink-0" />
                      <span className="truncate">09.00 WIB</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-burgundy shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Footer Action */}
                <div className="p-2.5 sm:p-4 sm:px-6 bg-surface-warm-white border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1 sm:gap-2">
                  <span className="hidden sm:inline text-xs font-mono font-bold text-brand-burgundy">
                    KUOTA TERSEDIA
                  </span>

                  <Link
                    href={`/aktivitas/agenda/${evt.id}`}
                    className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-1.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-[10px] sm:text-xs font-semibold shadow transition-colors w-full sm:w-auto"
                  >
                    <span>Pesan Tiket</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
