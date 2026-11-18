"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  DollarSign,
  ChevronLeft,
  Building,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  Plus
} from "lucide-react";

export default function UnitFinancePage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = use(params);
  const { store } = useMockStore();

  const field = store.fields.find((f) => f.id === unitId);
  const compartment = store.compartments.find((c) => c.id === unitId);
  const project = store.projects.find((p) => p.id === unitId);
  const unitName = project ? project.name : compartment ? compartment.name : field ? field.name : "Unit Organisasi";

  const unitTransactions = store.finance_transactions.filter(
    (t) =>
      t.unit_id === unitId ||
      t.description.toLowerCase().includes(unitName.toLowerCase()) ||
      t.category.toLowerCase().includes(unitName.toLowerCase())
  );

  const unitFundRequests = store.fund_requests.filter(
    (r) =>
      r.project_id === unitId ||
      r.unit_name.toLowerCase().includes(unitName.toLowerCase())
  );

  const totalDisbursed = unitFundRequests
    .filter((r) => r.status === "approved" || r.status === "partially_disbursed" || r.status === "fully_disbursed")
    .reduce((sum, r) => sum + (r.approved_amount || r.requested_amount), 0);

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
                <ChevronLeft className="w-3.5 h-3.5" /> Keuangan Sentral
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                FIN-08
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Keuangan Unit: {unitName}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Buku kas khusus alokasi anggaran dan pengeluaran terdistribusi untuk lingkup {unitName}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organization/finance/requests/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Dana Unit Ini</span>
            </Link>
          </div>
        </div>

        {/* Aggregate KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Total Anggaran Disetujui</span>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1">
              Rp {totalDisbursed.toLocaleString("id-ID")}
            </p>
            <p className="text-[11px] text-wine-500">{unitFundRequests.length} proposal diajukan</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Transaksi Kas Terkait</span>
            <p className="text-xl font-bold font-mono text-wine-900 mt-1">
              {unitTransactions.length} Transaksi
            </p>
            <p className="text-[11px] text-wine-500">Mutasi kas langsung unit</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
            <span className="text-xs text-wine-500 font-medium">Status Realisasi Pos</span>
            <p className="text-xl font-bold font-display text-brand-burgundy mt-1">
              Aktif Terkelola
            </p>
            <p className="text-[11px] text-wine-500">Tersinkron dengan Bendum</p>
          </div>
        </div>

        {/* Transactions & Requests */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-wine-950">
            Jurnal Mutasi Kas Khusus {unitName}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Uraian Transaksi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {unitTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-wine-500">
                      Belum ada transaksi kas spesifik yang dicatat untuk unit ini.
                    </td>
                  </tr>
                ) : (
                  unitTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-surface-base">
                      <td className="py-3 px-4 font-mono text-wine-500">{t.date}</td>
                      <td className="py-3 px-4 font-medium text-wine-900">{t.description}</td>
                      <td className="py-3 px-4 text-wine-600">{t.category}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-wine-900">
                        Rp {t.amount.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
