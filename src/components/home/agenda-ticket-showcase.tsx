"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Ticket, ArrowRight, Clock } from "lucide-react";
import { useMockStore } from "@/lib/mock/store";
import { getEventVisual } from "@/app/aktivitas/aktivitas-data";

export const AgendaTicketShowcase: React.FC = () => {
  const { store } = useMockStore();

  const publishedEvents = store.events
    .filter((e) => e.status === "published" || e.status === "draft")
    .slice(0, 3);

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#FFFFFF] via-[#FAF5F2] to-[#F8EFF1] border-b border-wine-950/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
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

        {/* COMPACT VIP PERFORATED TICKET CARDS GRID (Sleek, Not Overly Tall, with Image at Top) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {publishedEvents.map((evt) => {
            const visual = getEventVisual(evt.id);
            const isFree = evt.category === "gratis";
            const dateObj = evt.schedule_start ? new Date(evt.schedule_start) : null;
            const dayStr = dateObj ? dateObj.getDate() : "28";
            const monthStr = dateObj
              ? dateObj.toLocaleDateString("id-ID", { month: "short" }).toUpperCase()
              : "NOV";
            const yearStr = dateObj ? dateObj.getFullYear() : "2026";
            const timeStr = dateObj
              ? dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
              : "09.00";

            return (
              <div
                key={evt.id}
                className="rounded-2xl sm:rounded-3xl bg-white border border-gold-400/40 hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
              >
                {/* 1. Small Top Image Header */}
                <div className="relative h-28 sm:h-36 w-full overflow-hidden bg-wine-950/20 shrink-0">
                  <Image
                    src={visual.image}
                    alt={evt.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/25" />

                  {/* Floating Date Badge (Top-Left) */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/95 backdrop-blur-md shadow-xs border border-gold-400/50 flex items-center gap-1 sm:gap-1.5">
                    <span className="font-serif font-black text-xs sm:text-sm text-brand-burgundy leading-none">
                      {dayStr} {monthStr}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-dark/80 hidden sm:inline">
                      {yearStr}
                    </span>
                  </div>

                  {/* Floating Category Badge (Top-Right) */}
                  <span
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md shadow-xs border ${
                      isFree
                        ? "bg-emerald-900/80 text-emerald-200 border-emerald-400/40"
                        : "bg-wine-950/85 text-gold-200 border-gold-400/50"
                    }`}
                  >
                    {isFree ? "GRATIS" : "TERBUKA"}
                  </span>

                  {/* Floating Tag (Bottom-Left) */}
                  <span className="absolute bottom-1.5 left-2 px-1.5 sm:px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] sm:text-[10px] font-medium text-white/90 truncate max-w-[85%]">
                    {visual.tag}
                  </span>
                </div>

                {/* 2. Perforated Ticket Notches Divider */}
                <div className="relative border-b border-dashed border-wine-950/20 bg-surface-ivory/40">
                  <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-[#FAF5F2] border-r border-gold-400/40" />
                  <div className="absolute -right-1.5 -top-1.5 w-3 h-3 rounded-full bg-[#FAF5F2] border-l border-gold-400/40" />
                </div>

                {/* 3. Ticket Body: Title & Meta Info */}
                <div className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <Link href={`/aktivitas/agenda/${evt.id}`} className="block">
                      <h3 className="font-serif font-bold text-xs sm:text-base text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                        {evt.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="space-y-1 pt-1 text-[10px] sm:text-xs font-ui text-neutral-dark">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gold-600 shrink-0" />
                      <span className="truncate">{timeStr} WIB</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-brand-burgundy shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>

                {/* 4. Ticket Footer: Price & Compact Action */}
                <div className="p-2 sm:p-3 sm:px-4 bg-surface-warm-white border-t border-wine-950/10 flex items-center justify-between gap-1.5">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-brand-burgundy truncate">
                    {visual.priceDisplay}
                  </span>

                  <Link
                    href={`/aktivitas/agenda/${evt.id}`}
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-brand-burgundy hover:bg-wine-950 text-white text-[10px] sm:text-xs font-semibold shadow-xs transition-all shrink-0"
                  >
                    <Ticket className="w-3 h-3" />
                    <span>Pesan</span>
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
