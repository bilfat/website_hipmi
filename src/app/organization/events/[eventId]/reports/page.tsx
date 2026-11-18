"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  BarChart3,
  ChevronLeft,
  Printer,
  Download,
  Ticket,
  Users,
  CheckCircle2,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default function EventSalesReportPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticketTypes = store.ticket_types.filter((t) => t.event_id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;
  const attendanceRate = tickets.length > 0 ? Math.round((checkedInCount / tickets.length) * 100) : 0;

  const totalRevenue = ticketTypes.reduce((sum, tt) => sum + tt.price * tt.quota_sold, 0);

  if (!event) return null;

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> {event.title}
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-09
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Laporan Penjualan Tiket & Kehadiran
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Statistik kuota terjual, realisasi pendapatan tiket, dan tingkat konversi presensi peserta.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 font-medium text-xs shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4 text-brand-burgundy" />
              <span>Cetak Laporan Penjualan</span>
            </button>
          </div>
        </div>

        {/* Aggregated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Total Omzet Penjualan</span>
            <p className="text-xl font-bold font-mono text-brand-burgundy mt-1">
              Rp {totalRevenue.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">Dari seluruh tier tiket</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Tiket Terdistribusi</span>
            <p className="text-xl font-bold font-mono text-wine-900 mt-1">
              {tickets.length} Peserta
            </p>
            <p className="text-[11px] text-wine-500">E-tiket resmi diterbitkan</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Tingkat Kehadiran (Presensi)</span>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1">
              {attendanceRate}%
            </p>
            <p className="text-[11px] text-emerald-600">{checkedInCount} peserta hadir di venue</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Status Penjualan</span>
            <p className="text-xl font-bold font-display text-wine-950 mt-1">
              Terkendali
            </p>
            <p className="text-[11px] text-wine-500">Kuota terjaga sistem</p>
          </div>
        </div>

        {/* Sales by Tier Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs space-y-4 p-6">
          <h3 className="font-display font-bold text-base text-wine-950">
            Rincian Penjualan per Kategori Tiket
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3 px-4">Nama Tier Tiket</th>
                  <th className="py-3 px-4">Harga Tiket</th>
                  <th className="py-3 px-4 text-center">Terjual</th>
                  <th className="py-3 px-4 text-center">Sisa Kuota</th>
                  <th className="py-3 px-4 text-right">Akumulasi Omzet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {ticketTypes.map((tier) => (
                  <tr key={tier.id} className="hover:bg-surface-base">
                    <td className="py-3 px-4 font-bold text-wine-950 font-display">
                      {tier.name}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-wine-800">
                      {tier.price === 0 ? "GRATIS" : `Rp ${tier.price.toLocaleString("id-ID")}`}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                      {tier.quota_sold}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-wine-500">
                      {Math.max(0, tier.quota_total - tier.quota_sold)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-brand-burgundy">
                      Rp {(tier.price * tier.quota_sold).toLocaleString("id-ID")}
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
