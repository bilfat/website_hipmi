"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  DollarSign,
  ChevronLeft,
  Ticket,
  Share2,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Building,
  CheckCircle2
} from "lucide-react";

export default function FinanceRevenueMonitoringPage() {
  const { store } = useMockStore();

  // Aggregate ticket revenue
  const ticketRevenue = store.tickets.reduce((sum, tkt) => {
    const tier = store.ticket_types.find((tt) => tt.id === tkt.ticket_type_id);
    return sum + (tier ? tier.price : 0);
  }, 0);

  // Aggregate medpart revenue
  const medpartPaid = store.medpart_submissions.filter((m) => m.package_type === "Berbayar");
  const medpartRevenue = medpartPaid.reduce((sum, m) => sum + m.amount, 0);

  const grandTotalRevenue = ticketRevenue + medpartRevenue;

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/finance"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Keuangan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-09
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Monitoring Pendapatan Tiket & Medpart
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Agregasi nominal volume per event dan paket publikasi. Akses Bendum bersifat ringkasan agregat tanpa menampilkan PII peserta per regulasi privasi.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Privasi PII Terproteksi</span>
          </div>
        </div>

        {/* Aggregated Revenue Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Total Pendapatan Terhimpun</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
              Rp {grandTotalRevenue.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">Tiket event & kemitraan medpart</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Pendapatan Tiket Agenda</span>
              <Ticket className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-brand-burgundy">
              Rp {ticketRevenue.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">{store.tickets.length} e-tiket diterbitkan</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Pendapatan Media Partner</span>
              <Share2 className="w-4 h-4 text-wine-700" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-wine-900">
              Rp {medpartRevenue.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">{medpartPaid.length} paket berbayar disetujui</p>
          </div>
        </div>

        {/* Breakdown by Event */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-wine-950">
            Rekapitulasi Volume & Penjualan Tiket per Agenda
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3 px-4">Nama Agenda / Event</th>
                  <th className="py-3 px-4">Kategori Tiket</th>
                  <th className="py-3 px-4 text-center">Terjual</th>
                  <th className="py-3 px-4 text-center">Total Kuota</th>
                  <th className="py-3 px-4 text-right">Akumulasi Pendapatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {store.ticket_types.map((type) => {
                  const event = store.events.find((e) => e.id === type.event_id);
                  const revenue = type.price * type.quota_sold;
                  return (
                    <tr key={type.id} className="hover:bg-surface-base">
                      <td className="py-3 px-4 font-medium text-wine-900">
                        {event?.title || "Agenda Umum"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-brand-burgundy">{type.name}</span>
                        <p className="text-[11px] text-wine-500 font-mono">
                          Rp {type.price.toLocaleString("id-ID")} / tiket
                        </p>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                        {type.quota_sold}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-wine-500">
                        {type.quota_total}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-brand-burgundy">
                        Rp {revenue.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown by Media Partner */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-wine-950">
            Rekapitulasi Paket Media Partner Kompartemen Medkom
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3 px-4">Kode Tracking</th>
                  <th className="py-3 px-4">Event Pemohon</th>
                  <th className="py-3 px-4">Paket Terpilih</th>
                  <th className="py-3 px-4">Status Pembayaran</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {store.medpart_submissions.map((med) => (
                  <tr key={med.id} className="hover:bg-surface-base">
                    <td className="py-3 px-4 font-mono font-bold text-wine-700">
                      {med.tracking_code}
                    </td>
                    <td className="py-3 px-4 font-medium text-wine-900">{med.event_name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                        {med.package_name} ({med.package_type})
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          med.status === "approved" || med.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {med.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-brand-burgundy">
                      Rp {med.amount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
