"use client";

import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  FileText,
  ArrowLeft,
  Printer,
  Download,
  FolderKanban,
  DollarSign,
  Ticket,
  Users,
  CalendarCheck,
  CheckCircle2
} from "lucide-react";

export default function OrganizationReportsPage() {
  const { store } = useMockStore();

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const prokers = store.projects.filter((p) => p.cabinet_id === activeCab.id);

  // Financial aggregates
  const totalFundRequested = store.fund_requests.reduce((sum, f) => sum + (f.amount_requested || f.requested_amount || 0), 0);
  const totalFundDisbursed = store.fund_requests
    .filter((f) => f.disbursement_status === "transferred" || f.disbursement_status === "received")
    .reduce((sum, f) => sum + (f.amount_requested || f.requested_amount || 0), 0);

  // Ticket aggregates
  const totalTicketsIssued = store.tickets.length;
  const totalCheckedIn = store.tickets.filter((t) => t.is_checked_in).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <OrganizationShell>
      <div className="max-w-5xl mx-auto space-y-8 pb-16 print:p-0 print:m-0 print:max-w-none">
        {/* Navigation Breadcrumb (hidden in print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/organization/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Dashboard Organisasi</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Unduh Laporan (PDF)</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 print:hidden">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ORG-06
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Laporan Eksekutif
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Laporan Kinerja & Statistik Organisasi
          </h1>
          <p className="text-xs text-neutral-dark">
            Rekapitulasi berkala pelaksanaan program kerja, tata kelola keuangan, persuratan, dan presensi Kabinet {activeCab.name}.
          </p>
        </div>

        {/* Summary Aggregates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Total Program Kerja
            </span>
            <strong className="text-wine-950 font-serif text-2xl block">{prokers.length}</strong>
            <span className="text-[11px] text-neutral-dark">Kabinet Aktif</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Dana Dicairkan
            </span>
            <strong className="text-emerald-700 font-serif text-xl block truncate">
              Rp {totalFundDisbursed.toLocaleString("id-ID")}
            </strong>
            <span className="text-[11px] text-neutral-dark">Disetujui Bendum</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Surat Dikeluarkan
            </span>
            <strong className="text-brand-burgundy font-serif text-2xl block">
              {store.correspondence.length}
            </strong>
            <span className="text-[11px] text-neutral-dark">Tervalidasi Sekum</span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
            <span className="text-neutral-light block uppercase font-mono text-[10px]">
              Presensi Peserta
            </span>
            <strong className="text-gold-700 font-serif text-2xl block">
              {totalCheckedIn} / {totalTicketsIssued}
            </strong>
            <span className="text-[11px] text-neutral-dark">Tingkat kehadiran sah</span>
          </div>
        </div>

        {/* Prokers Detail Performance Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Status Pelaksanaan Program Kerja ({prokers.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                  <th className="py-2.5 px-3">Nama Program Kerja</th>
                  <th className="py-2.5 px-3">Kompartemen</th>
                  <th className="py-2.5 px-3">Status Operasional</th>
                  <th className="py-2.5 px-3">Status Publikasi</th>
                  <th className="py-2.5 px-3">Venue / Lokasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-950/5">
                {prokers.map((p) => {
                  const comp = store.compartments.find((c) => c.id === p.compartment_id);
                  return (
                    <tr key={p.id} className="hover:bg-wine-950/5">
                      <td className="py-2.5 px-3 font-semibold text-wine-950">
                        {p.name}
                      </td>
                      <td className="py-2.5 px-3 text-neutral-dark font-serif">
                        {comp?.name || "Kompartemen"}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                          {p.operational_status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            p.publication_status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {p.publication_status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-neutral-dark">
                        {p.location}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
