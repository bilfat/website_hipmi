"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Eye,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
  Filter
} from "lucide-react";

export default function OrganizationCalendarPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVisibility, setSelectedVisibility] = useState<string>("all");

  const events = store.events.filter((evt) => {
    if (selectedCategory !== "all" && evt.category !== selectedCategory) return false;
    if (selectedVisibility !== "all" && evt.visibility !== selectedVisibility) return false;
    return true;
  });

  // Simple conflict detection: events sharing identical day
  const dayOccurrences: { [dateStr: string]: string[] } = {};
  store.events.forEach((e) => {
    const day = e.schedule_start.split("T")[0];
    if (!dayOccurrences[day]) dayOccurrences[day] = [];
    dayOccurrences[day].push(e.title);
  });
  const conflictingDays = Object.entries(dayOccurrences).filter(([_, titles]) => titles.length > 1);

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CAL-01
              </span>
              <span className="text-xs font-medium text-wine-500">Operasional Organisasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Kalender Organisasi
            </h1>
            <p className="text-sm text-wine-600 mt-1">
              Jadwal sentral agenda kabinet, rapat pleno, kegiatan bidang, dan acara eksternal HIPMI Telkom.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/calendar/events/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Jadwal (CAL-04)</span>
            </Link>
          </div>
        </div>

        {/* Schedule Conflict Alert */}
        {conflictingDays.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3 shadow-xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-semibold text-amber-950">
                Peringatan Benturan Jadwal Terdeteksi ({conflictingDays.length} tanggal padat)
              </p>
              <p className="text-amber-800 mt-0.5">
                Terdapat lebih dari satu agenda pada tanggal yang sama:{" "}
                {conflictingDays.map(([date, titles]) => (
                  <span key={date} className="inline-block mr-2 font-mono font-medium underline">
                    {date} ({titles.join(", ")})
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-wine-100 shadow-xs">
          {/* View Toggles */}
          <div className="inline-flex p-1 rounded-lg bg-surface-base border border-wine-100">
            <button
              onClick={() => setViewMode("month")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "month"
                  ? "bg-brand-burgundy text-white shadow-xs"
                  : "text-wine-700 hover:text-wine-900"
              }`}
            >
              Bulan (Month)
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "week"
                  ? "bg-brand-burgundy text-white shadow-xs"
                  : "text-wine-700 hover:text-wine-900"
              }`}
            >
              Minggu (Week)
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === "list"
                  ? "bg-brand-burgundy text-white shadow-xs"
                  : "text-wine-700 hover:text-wine-900"
              }`}
            >
              Daftar / List
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-wine-600">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Kategori</option>
              <option value="gratis">Gratis / Open</option>
              <option value="berbayar">Berbayar / Tiket</option>
            </select>

            <select
              value={selectedVisibility}
              onChange={(e) => setSelectedVisibility(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            >
              <option value="all">Semua Visibilitas</option>
              <option value="public">Publik</option>
              <option value="internal">Internal Pengurus</option>
            </select>
          </div>
        </div>

        {/* View Content */}
        {viewMode === "list" ? (
          <div className="space-y-3">
            {events.map((evt) => {
              const startDate = new Date(evt.schedule_start);
              const endDate = new Date(evt.schedule_end);
              return (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-wine-50 border border-wine-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-wine-600 uppercase">
                        {startDate.toLocaleDateString("id-ID", { month: "short" })}
                      </span>
                      <span className="text-lg font-bold font-display text-brand-burgundy leading-none">
                        {startDate.getDate()}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            evt.visibility === "public"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {evt.visibility === "public" ? "🌐 Publik" : "🔒 Internal"}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-wine-50 text-brand-burgundy border border-wine-100">
                          {evt.organizer_unit}
                        </span>
                        <span className="text-xs text-wine-400">•</span>
                        <span className="text-xs text-wine-500 capitalize">{evt.status}</span>
                      </div>

                      <h3 className="text-base font-bold text-wine-950 font-display">
                        <Link href={`/calendar/events/${evt.id}`} className="hover:text-brand-burgundy">
                          {evt.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-wine-600 line-clamp-1 mt-0.5">{evt.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-wine-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-wine-400" />
                          {startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} -{" "}
                          {endDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-wine-400" />
                          {evt.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <Link
                      href={`/calendar/events/${evt.id}`}
                      className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-medium transition-all inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail (CAL-03)</span>
                    </Link>
                    <Link
                      href={`/calendar/events/form?mode=edit&recordId=${evt.id}`}
                      className="px-3 py-1.5 rounded-lg bg-wine-100 hover:bg-wine-200 text-wine-900 text-xs font-medium transition-all"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Grid Month/Week View representation */
          <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
            <div className="p-4 bg-wine-50/50 border-b border-wine-100 flex items-center justify-between">
              <span className="font-display font-bold text-wine-900 text-sm">
                November 2026 (Periode Aktif Arthakarsa)
              </span>
              <div className="text-xs text-wine-500 flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Publik
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-burgundy"></span> Internal
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {events.map((evt) => {
                const startDate = new Date(evt.schedule_start);
                return (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl border border-wine-100 bg-surface-base hover:border-wine-300 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-brand-burgundy">
                        {startDate.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          evt.visibility === "public"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-wine-100 text-wine-800"
                        }`}
                      >
                        {evt.visibility}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-wine-950 font-display line-clamp-1">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-wine-600 line-clamp-2 mt-1">{evt.description}</p>
                    </div>

                    <div className="text-xs text-wine-500 space-y-1 pt-2 border-t border-wine-100">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-wine-400" />
                        <span>
                          {startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}{" "}
                          WIB
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-wine-400" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-wine-600">
                        {evt.organizer_unit}
                      </span>
                      <Link
                        href={`/calendar/events/${evt.id}`}
                        className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                      >
                        Buka Detail <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}
