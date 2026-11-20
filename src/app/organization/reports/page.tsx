"use client";

import { useState, useMemo } from "react";
import { useMockStore } from "@/lib/mock/store";
import { PROJECT_STATUS_LABELS } from "@/lib/personal/labels";
import {
  Printer,
  Download,
  FolderKanban,
  Wallet,
  Mail,
  Ticket,
  Filter,
} from "lucide-react";

export default function OrganizationReportsPage() {
  const { store } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  const [cabinetId, setCabinetId] = useState(activeCab?.id || "all");
  const [fieldId, setFieldId] = useState("all");
  const [compartmentId, setCompartmentId] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  const availableFields = useMemo(
    () =>
      store.fields.filter((f) => cabinetId === "all" || f.cabinet_id === cabinetId),
    [store.fields, cabinetId]
  );

  const availableCompartments = useMemo(
    () =>
      store.compartments.filter((c) => {
        if (cabinetId !== "all" && c.cabinet_id !== cabinetId) return false;
        if (fieldId !== "all" && c.field_id !== fieldId) return false;
        return true;
      }),
    [store.compartments, cabinetId, fieldId]
  );

  const filteredProjects = useMemo(
    () =>
      store.projects.filter((p) => {
        if (cabinetId !== "all" && p.cabinet_id !== cabinetId) return false;
        if (fieldId !== "all" && p.field_id !== fieldId) return false;
        if (compartmentId !== "all" && p.compartment_id !== compartmentId) return false;
        if (periodFilter !== "all" && p.main_event_date) {
          const month = new Date(p.main_event_date).getMonth() + 1;
          if (periodFilter === "smt1" && month > 6) return false;
          if (periodFilter === "smt2" && month <= 6) return false;
        }
        return true;
      }),
    [store.projects, cabinetId, fieldId, compartmentId, periodFilter]
  );

  const projectIds = new Set(filteredProjects.map((p) => p.id));

  const filteredLetters = store.correspondence.filter(
    (c) =>
      (cabinetId === "all" || c.cabinet_id === cabinetId) &&
      (fieldId === "all" && compartmentId === "all"
        ? true
        : c.project_id
        ? projectIds.has(c.project_id)
        : false)
  );

  const filteredFunds = store.fund_requests.filter(
    (f) =>
      (cabinetId === "all" || f.cabinet_id === cabinetId) &&
      (fieldId === "all" && compartmentId === "all"
        ? true
        : f.project_id
        ? projectIds.has(f.project_id)
        : false)
  );

  const totalFundDisbursed = filteredFunds
    .filter((f) => ["fully_disbursed", "partially_disbursed", "settled"].includes(f.status))
    .reduce((sum, f) => sum + (f.approved_amount || f.requested_amount), 0);

  const filteredEvents = store.events.filter((e) =>
    fieldId === "all" && compartmentId === "all"
      ? true
      : e.project_id
      ? projectIds.has(e.project_id)
      : false
  );
  const filteredEventIds = new Set(filteredEvents.map((e) => e.id));
  const filteredTickets = store.tickets.filter((t) => filteredEventIds.has(t.event_id));
  const totalCheckedIn = filteredTickets.filter((t) => t.is_checked_in).length;

  const selectedCabinet =
    store.cabinets.find((c) => c.id === cabinetId) || activeCab;

  const handlePrintPdf = () => {
    window.print();
  };

  const handleExportCsv = () => {
    const headers = [
      "Nama Program Kerja",
      "Bidang",
      "Kompartemen",
      "Penanggung Jawab",
      "Status Operasional",
      "Main Event",
      "Jumlah Surat",
      "Total RAB (Rp)",
    ];

    const rows = filteredProjects.map((p) => {
      const fName = store.fields.find((f) => f.id === p.field_id)?.name || "-";
      const cName = store.compartments.find((c) => c.id === p.compartment_id)?.name || "-";
      const letterCount = store.correspondence.filter((l) => l.project_id === p.id).length;
      const rabTotal = store.fund_requests
        .filter((r) => r.project_id === p.id)
        .reduce((s, r) => s + r.requested_amount, 0);
      return [
        `"${p.name.replace(/"/g, '""')}"`,
        `"${fName.replace(/"/g, '""')}"`,
        `"${cName.replace(/"/g, '""')}"`,
        `"${(p.lead_name || "-").replace(/"/g, '""')}"`,
        `"${p.operational_status}"`,
        `"${p.main_event_date || "-"}"`,
        letterCount,
        rabTotal,
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan-organisasi-${selectedCabinet?.name?.toLowerCase().replace(/\s+/g, "-") || "hipmi"}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 print:p-0 print:m-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold print:hidden">
            Statistik &amp; Laporan Eksekutif
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Laporan Kinerja &amp; Statistik Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Rekapitulasi pelaksanaan program kerja, persuratan, realisasi keuangan, dan kehadiran event {selectedCabinet?.name || "Kabinet Aktif"}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export Excel (CSV)</span>
          </button>
          <button
            type="button"
            onClick={handlePrintPdf}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Filters (Kabinet, Bidang, Kompartemen, Periode) */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 print:hidden">
        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase font-bold text-neutral-light flex items-center gap-1">
            <Filter className="w-3 h-3" /> Kabinet
          </label>
          <select
            value={cabinetId}
            onChange={(e) => {
              setCabinetId(e.target.value);
              setFieldId("all");
              setCompartmentId("all");
            }}
            className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Semua Kabinet</option>
            {store.cabinets.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.period})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase font-bold text-neutral-light block">
            Bidang
          </label>
          <select
            value={fieldId}
            onChange={(e) => {
              setFieldId(e.target.value);
              setCompartmentId("all");
            }}
            className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Semua Bidang</option>
            {availableFields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase font-bold text-neutral-light block">
            Kompartemen
          </label>
          <select
            value={compartmentId}
            onChange={(e) => setCompartmentId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Semua Kompartemen</option>
            {availableCompartments.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono uppercase font-bold text-neutral-light block">
            Periode
          </label>
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Sepanjang Periode</option>
            <option value="smt1">Semester 1 (Jan–Jun)</option>
            <option value="smt2">Semester 2 (Jul–Des)</option>
          </select>
        </div>
      </div>

      {/* KPI Grid (2 cols mobile, 4 cols desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Program Kerja</span>
            <FolderKanban className="w-4 h-4 text-brand-burgundy" />
          </div>
          <strong className="font-serif text-2xl font-bold text-wine-950 block">
            {filteredProjects.length}
          </strong>
          <span className="text-[11px] text-neutral-dark">
            {filteredProjects.filter((p) => p.operational_status === "ongoing").length} sedang berjalan
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Dana Dicairkan</span>
            <Wallet className="w-4 h-4 text-emerald-700" />
          </div>
          <strong className="font-mono text-lg sm:text-xl font-bold text-emerald-700 block truncate">
            Rp {totalFundDisbursed.toLocaleString("id-ID")}
          </strong>
          <span className="text-[11px] text-neutral-dark">{filteredFunds.length} pengajuan RAB</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Persuratan</span>
            <Mail className="w-4 h-4 text-[#AF7D66]" />
          </div>
          <strong className="font-serif text-2xl font-bold text-brand-burgundy block">
            {filteredLetters.length}
          </strong>
          <span className="text-[11px] text-neutral-dark">
            {filteredLetters.filter((l) => ["issued", "completed"].includes(l.status)).length} terbit nomor
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-neutral-light">
            <span className="text-[10px] font-mono uppercase font-bold">Kehadiran Event</span>
            <Ticket className="w-4 h-4 text-amber-700" />
          </div>
          <strong className="font-serif text-2xl font-bold text-wine-950 block">
            {totalCheckedIn} / {filteredTickets.length}
          </strong>
          <span className="text-[11px] text-neutral-dark">
            {filteredEvents.length} agenda tercatat
          </span>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Rekapitulasi Program Kerja ({filteredProjects.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FCF8F6] text-neutral-dark border-y border-[#E9E1DC]">
              <tr>
                <th className="py-3 px-4 font-semibold">Program Kerja</th>
                <th className="py-3 px-4 font-semibold">Bidang / Kompartemen</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Surat</th>
                <th className="py-3 px-4 font-semibold text-right">Pengajuan RAB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1DC]/60">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-dark">
                    Tidak ada data program kerja sesuai filter terpilih.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const fName = store.fields.find((f) => f.id === p.field_id)?.name || "-";
                  const cName = store.compartments.find((c) => c.id === p.compartment_id)?.name || "-";
                  const st =
                    PROJECT_STATUS_LABELS[p.operational_status] || PROJECT_STATUS_LABELS.ongoing;
                  const lCount = store.correspondence.filter((l) => l.project_id === p.id).length;
                  const rab = store.fund_requests
                    .filter((r) => r.project_id === p.id)
                    .reduce((s, r) => s + r.requested_amount, 0);
                  return (
                    <tr key={p.id} className="hover:bg-[#FCF8F6]/70">
                      <td className="py-3.5 px-4">
                        <strong className="font-serif text-sm text-wine-950 block">{p.name}</strong>
                        <span className="text-[11px] text-neutral-dark">
                          PJ: {p.lead_name || "Belum ditentukan"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-wine-950 font-medium block">{cName}</span>
                        <span className="text-[11px] text-neutral-dark">{fName}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-wine-950">{lCount} surat</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-burgundy">
                        Rp {rab.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
