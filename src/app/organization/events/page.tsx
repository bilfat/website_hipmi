"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar,
  Search,
  Filter,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Ticket,
  Users,
  Eye,
  Settings
} from "lucide-react";

export default function EventsListPage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const events = (store.events || []).filter((e) => {
    if (visibilityFilter !== "all" && e.visibility !== visibilityFilter) return false;
    if (categoryFilter !== "all" && e.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchUnit = e.organizer_unit.toLowerCase().includes(q);
      const matchLoc = e.location.toLowerCase().includes(q);
      if (!matchTitle && !matchUnit && !matchLoc) return false;
    }
    return true;
  });

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/events/dashboard"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Event Operations
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-02
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Daftar Agenda & Acara Organisasi
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Sentralisasi seluruh agenda kepanitiaan, pleno, seminar publik, dan expo HIPMI PT Telkom.
            </p>
          </div>

          <Link
            href="/calendar/events/form?mode=create&source=events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Agenda (EVT-03)</span>
          </Link>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari judul acara, unit penyelenggara, atau lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Visibilitas</option>
              <option value="public">Publik</option>
              <option value="internal">Internal</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Kategori</option>
              <option value="gratis">Gratis</option>
              <option value="berbayar">Berbayar</option>
            </select>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Agenda / Acara</th>
                  <th className="py-3.5 px-4">Penyelenggara / Unit</th>
                  <th className="py-3.5 px-4">Waktu & Tempat</th>
                  <th className="py-3.5 px-4">Kategori & Akses</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada agenda yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 max-w-xs">
                        <Link
                          href={`/organization/events/${evt.id}`}
                          className="font-bold text-wine-950 font-display text-sm hover:text-brand-burgundy hover:underline line-clamp-1"
                        >
                          {evt.title}
                        </Link>
                        <p className="text-[11px] text-wine-500 line-clamp-1 mt-0.5">
                          {evt.description}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-wine-900">{evt.organizer_unit}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-[11px] text-wine-700">
                          {new Date(evt.schedule_start).toLocaleDateString("id-ID")}
                        </div>
                        <p className="text-[11px] text-wine-500 line-clamp-1">{evt.location}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            evt.visibility === "public"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {evt.visibility}
                        </span>
                        <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-wine-50 text-brand-burgundy border border-wine-100">
                          {evt.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            evt.status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : evt.status === "cancelled"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/events/${evt.id}`}
                          className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          Kelola <Settings className="w-3 h-3" />
                        </Link>
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
