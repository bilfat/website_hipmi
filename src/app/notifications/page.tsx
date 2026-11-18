"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Award,
  Sparkles
} from "lucide-react";

export default function UniversalNotificationCenterPage() {
  const { store, updateStore, currentUser } = useMockStore();

  const [categoryFilter, setCategoryFilter] = useState("all");

  const notifications = (store.notifications || []).filter((n) => {
    if (categoryFilter !== "all" && n.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    const updated = store.notifications.map((n) => ({ ...n, read: true }));
    updateStore({ notifications: updated });
  };

  const handleToggleRead = (id: string) => {
    const updated = store.notifications.map((n) =>
      n.id === id ? { ...n, read: !n.read } : n
    );
    updateStore({ notifications: updated });
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                SYS-03
              </span>
              <span className="text-xs font-medium text-wine-500">Notifikasi Sentral</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Universal Notification Center
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pusat notifikasi lintas modul: persuratan, permohonan dana, verifikasi e-tiket, tugas proker, dan audit sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="px-3.5 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tandai Semua Dibaca</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-base border border-wine-100 overflow-x-auto text-xs font-medium">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "correspondence", label: "Persuratan" },
            { id: "finance", label: "Keuangan" },
            { id: "event", label: "Agenda & Tiket" },
            { id: "lpj", label: "Dokumen & LPJ" },
            { id: "cadre", label: "Kader & Bisnis" },
            { id: "system", label: "Sistem" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                categoryFilter === cat.id
                  ? "bg-brand-burgundy text-white font-bold shadow-xs"
                  : "text-wine-700 hover:text-wine-950"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notification Feed */}
        <div className="bg-white rounded-2xl border border-wine-100 shadow-xs divide-y divide-wine-50 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-xs text-wine-500">
              Tidak ada notifikasi dalam kategori ini.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  notif.read ? "bg-white" : "bg-wine-50/40"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.read
                        ? "bg-surface-base text-wine-400"
                        : "bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-wine-100 text-brand-burgundy">
                        {notif.category}
                      </span>
                      <span className="text-[11px] font-mono text-wine-400">
                        {new Date(notif.created_at).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-wine-950 font-display">
                      <Link href={notif.source_route} className="hover:text-brand-burgundy hover:underline">
                        {notif.title}
                      </Link>
                    </h4>

                    <p className="text-xs text-wine-700">{notif.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleRead(notif.id)}
                    className="text-[11px] text-wine-500 hover:text-wine-900 font-medium px-2 py-1"
                  >
                    {notif.read ? "Tandai Belum Dibaca" : "Tandai Dibaca"}
                  </button>

                  <Link
                    href={notif.source_route}
                    className="px-3 py-1.5 rounded-lg bg-surface-base hover:bg-wine-100 text-wine-900 text-xs font-semibold inline-flex items-center gap-1 border border-wine-100 transition-all"
                  >
                    Buka <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </OrganizationShell>
  );
}
