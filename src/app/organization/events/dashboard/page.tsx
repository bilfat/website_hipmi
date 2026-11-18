"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Calendar,
  Ticket,
  Users,
  CreditCard,
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function EventsDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const events = store.events || [];
  const tickets = store.tickets || [];
  const reservations = store.reservations || [];

  const pendingPayments = reservations.filter((r) => r.payment_status === "pending_verification");
  const totalRevenue = tickets.reduce((sum, t) => {
    const tier = store.ticket_types.find((tt) => tt.id === t.ticket_type_id);
    return sum + (tier ? tier.price : 0);
  }, 0);

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-01
              </span>
              <span className="text-xs font-medium text-wine-500">Operasional Agenda & Ticketing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Agenda & Event Operations Desk
            </h1>
            <p className="text-sm text-wine-600 mt-1">
              Manajemen registrasi, kuota tiket, desk verifikasi pembayaran peserta, dan operasional check-in.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/calendar/events/form?mode=create&source=events"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Agenda Baru (EVT-03)</span>
            </Link>
          </div>
        </div>

        {/* Aggregated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Total Agenda Aktif</span>
              <Calendar className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-wine-950">
              {events.length}
            </p>
            <p className="text-[11px] text-wine-500">{events.filter((e) => e.visibility === "public").length} agenda publik</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">E-Tiket Diterbitkan</span>
              <Ticket className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-emerald-700">
              {tickets.length}
            </p>
            <p className="text-[11px] text-emerald-600">Peserta teregistrasi tuntas</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Pembayaran Pending</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-amber-800">
              {pendingPayments.length}
            </p>
            <p className="text-[11px] text-amber-700">Bukti bayar butuh verifikasi panitia</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span className="font-medium">Total Pendapatan Tiket</span>
              <TrendingUp className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-brand-burgundy">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">Omzet penjualan tiket resmi</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/organization/events"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Daftar Agenda (EVT-02)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Seluruh agenda internal, publik, seminar, & expo.</p>
          </Link>

          <Link
            href="/organization/events/evt-business-expo/payments"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Desk Verifikasi Bayar (EVT-07)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Periksa bukti transfer QRIS dan terbitkan e-tiket.</p>
          </Link>

          <Link
            href="/organization/events/evt-business-expo/check-in"
            className="p-4 rounded-xl bg-surface-base border border-wine-100 hover:border-wine-300 hover:bg-white transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-wine-900 uppercase">Scanner Presensi (ATT-01)</span>
              <ArrowRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-xs text-wine-600">Buka kamera check-in barcode/QR di venue acara.</p>
          </Link>
        </div>

        {/* Events Table Overview */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-wine-950">
              Daftar Agenda Dalam Pelaksanaan
            </h3>
            <Link
              href="/organization/events"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              Lihat Semua ({events.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-wine-50">
            {events.map((evt) => {
              const eventTickets = tickets.filter((t) => t.event_id === evt.id);
              const eventTiers = store.ticket_types.filter((t) => t.event_id === evt.id);
              const totalQuota = eventTiers.reduce((s, t) => s + t.quota_total, 0);

              return (
                <div
                  key={evt.id}
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          evt.visibility === "public"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {evt.visibility}
                      </span>
                      <span className="text-xs font-medium text-wine-600">{evt.organizer_unit}</span>
                      <span className="text-xs text-wine-400">•</span>
                      <span className="text-xs text-wine-500 font-mono">
                        {new Date(evt.schedule_start).toLocaleDateString("id-ID")}
                      </span>
                    </div>

                    <h4 className="font-bold text-wine-900 font-display text-base">
                      <Link href={`/organization/events/${evt.id}`} className="hover:text-brand-burgundy hover:underline">
                        {evt.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-wine-600 line-clamp-1 mt-0.5">{evt.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-xs font-bold text-wine-900 font-mono">
                        {eventTickets.length} / {totalQuota || 100}
                      </span>
                      <p className="text-[10px] text-wine-500">Tiket Terisi</p>
                    </div>

                    <Link
                      href={`/organization/events/${evt.id}`}
                      className="px-3.5 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                    >
                      Kelola Event <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
