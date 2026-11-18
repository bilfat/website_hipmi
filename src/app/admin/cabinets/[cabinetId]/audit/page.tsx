"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  ShieldAlert,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function AdminAuditLogPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];

  const [search, setSearch] = useState("");

  const filteredLogs = store.audit_events.filter(
    (a) =>
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.actor_name.toLowerCase().includes(search.toLowerCase()) ||
      a.resource_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dashboard Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: ADM-12
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Sistem Audit
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Log Audit Administratif
        </h1>
        <p className="text-xs text-neutral-dark">
          Rekaman jejak mutasi data, otorisasi peran, dan persetujuan transaksi yang bersifat permanen dan read-only.
        </p>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari aksi, aktor, atau tipe entitas..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-xs text-wine-950"
          />
          <Search className="w-4 h-4 text-neutral-light absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <span className="text-xs text-neutral-light font-mono">
          Total {filteredLogs.length} Peristiwa
        </span>
      </div>

      {/* Audit Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Waktu Kejadian</th>
                <th className="py-2.5 px-3">Aktor Pelaksana</th>
                <th className="py-2.5 px-3">Tindakan (Action)</th>
                <th className="py-2.5 px-3">Entitas Sumber</th>
                <th className="py-2.5 px-3">Perubahan State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wine-950/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-wine-950/5">
                  <td className="py-2.5 px-3 font-mono text-[11px] text-neutral-light">
                    {new Date(log.timestamp).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-wine-950">
                    {log.actor_name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-brand-burgundy font-bold">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-dark font-mono text-[11px]">
                    {log.resource_type} ({log.resource_id.slice(-8)})
                  </td>
                  <td className="py-2.5 px-3">
                    {log.before_state && log.after_state ? (
                      <span className="font-mono text-[10px] text-neutral-dark">
                        {log.before_state} → <strong className="text-emerald-700">{log.after_state}</strong>
                      </span>
                    ) : (
                      <span className="text-neutral-300 font-mono text-[10px]">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
