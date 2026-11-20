"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  ChevronLeft,
  Ticket,
  Megaphone,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function FinanceRevenueMonitoringPage() {
  const { store } = useMockStore();

  // Aggregate ticket revenue (per event — zero participant PII exposed to Bendum!)
  const eventRevenueRows = store.events.map((evt) => {
    const evtTickets = store.tickets.filter((t) => t.event_id === evt.id);
    const revenue = evtTickets.reduce((sum, tkt) => {
      const tier = store.ticket_types.find((tt) => tt.id === tkt.ticket_type_id);
      return sum + (tier ? tier.price : 0);
    }, 0);
    return {
      id: evt.id,
      title: evt.title,
      unit: evt.organizer_unit,
      ticketCount: evtTickets.length,
      revenue,
    };
  });

  const ticketRevenue = eventRevenueRows.reduce((sum, r) => sum + r.revenue, 0);
  const medpartPaid = store.medpart_submissions.filter((m) => m.package_type === "Berbayar");
  const medpartRevenue = medpartPaid.reduce((sum, m) => sum + m.amount, 0);
  const grandTotalRevenue = ticketRevenue + medpartRevenue;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/finance"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Keuangan Sentral</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Rekap Pendapatan
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Monitoring Pendapatan Tiket &amp; Medpart
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Agregasi pendapatan dari penjualan tiket event dan paket Media Partner berbayar tanpa menampilkan data pribadi (PII) peserta.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 shadow-sm self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-burgundy" />
          <span>Privasi PII Terproteksi</span>
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Total Pendapatan</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <strong className="font-mono text-2xl font-bold text-emerald-700 block">
            Rp {grandTotalRevenue.toLocaleString("id-ID")}
          </strong>
          <span className="text-[11px] text-neutral-dark">Gabungan tiket &amp; medpart</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Pendapatan Tiket Event</span>
            <Ticket className="w-4 h-4 text-brand-burgundy" />
          </div>
          <strong className="font-mono text-2xl font-bold text-brand-burgundy block">
            Rp {ticketRevenue.toLocaleString("id-ID")}
          </strong>
          <span className="text-[11px] text-neutral-dark">{store.tickets.length} tiket diterbitkan</span>
        </div>

        <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Pendapatan Media Partner</span>
            <Megaphone className="w-4 h-4 text-[#AF7D66]" />
          </div>
          <strong className="font-mono text-2xl font-bold text-wine-950 block">
            Rp {medpartRevenue.toLocaleString("id-ID")}
          </strong>
          <span className="text-[11px] text-neutral-dark">{medpartPaid.length} paket berbayar</span>
        </div>
      </div>

      {/* Breakdown per Event */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Rekap Agregat per Agenda &amp; Event
        </h2>
        <div className="space-y-2.5 text-xs">
          {eventRevenueRows.map((row) => (
            <div
              key={row.id}
              className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <strong className="font-serif text-sm text-wine-950 block">{row.title}</strong>
                <span className="text-[11px] text-neutral-dark">
                  {row.unit} • {row.ticketCount} e-tiket terbit
                </span>
              </div>
              <strong className="font-mono text-sm text-emerald-700">
                Rp {row.revenue.toLocaleString("id-ID")}
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
