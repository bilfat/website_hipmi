"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Clock,
  Search,
  Filter,
  ChevronLeft,
  Activity,
  Layers,
  FileText,
  DollarSign,
  Ticket,
  UserCheck
} from "lucide-react";

export default function ActivityHistoryPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");

  const activities = (store.activity_history || []).filter((act) => {
    if (moduleFilter !== "all" && act.module !== moduleFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchActor = act.actor_name.toLowerCase().includes(q);
      const matchAction = act.action.toLowerCase().includes(q);
      const matchTarget = act.target.toLowerCase().includes(q);
      if (!matchActor && !matchAction && !matchTarget) return false;
    }
    return true;
  });

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                SYS-05
              </span>
              <span className="text-xs font-medium text-wine-500">Jejak Operasional</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Activity & Operation History
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Kronologi aktivitas operasional tim kerja, pembaruan status surat, transaksi dana, presensi acara, dan kurasi berita.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama pelaku, tindakan, atau objek target..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Modul</option>
            <option value="Correspondence">Persuratan (COR)</option>
            <option value="Finance">Keuangan (FIN)</option>
            <option value="Events">Agenda & Tiket (EVT)</option>
            <option value="Workspace">Workspace (WRK)</option>
            <option value="Cadre">Kaderisasi (DIR)</option>
            <option value="CMS">Publikasi (CMS)</option>
          </select>
        </div>

        {/* Timeline representation */}
        <div className="bg-white rounded-2xl border border-wine-100 shadow-xs p-6 space-y-4">
          <div className="divide-y divide-wine-50">
            {activities.length === 0 ? (
              <div className="py-8 text-center text-xs text-wine-500">
                Tidak ada aktivitas yang sesuai dengan filter.
              </div>
            ) : (
              activities.map((item) => (
                <div key={item.id} className="py-3.5 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-wine-50 border border-wine-100 flex items-center justify-center shrink-0 mt-0.5 text-brand-burgundy">
                    <Activity className="w-4 h-4" />
                  </div>

                  <div className="flex-1 space-y-0.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-wine-950 font-display text-sm">
                        {item.actor_name}
                      </span>
                      <span className="font-mono text-[11px] text-wine-400">
                        {new Date(item.timestamp).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className="text-wine-700">
                      <span className="font-medium text-brand-burgundy">{item.action}</span>{" "}
                      pada target: <strong className="text-wine-900">{item.target}</strong>
                    </p>

                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-base border border-wine-100 text-wine-600">
                      Modul: {item.module}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
