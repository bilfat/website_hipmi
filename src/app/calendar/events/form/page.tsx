"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { AppEvent } from "@/types/domain";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  Save,
  AlertTriangle,
  Clock,
  MapPin,
  Building,
  Sparkles,
  Info
} from "lucide-react";

function AgendaFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");
  const workspaceId = searchParams.get("workspaceId");
  const source = searchParams.get("source");

  const { store, updateStore, currentUser } = useMockStore();

  // Find workspace context if provided
  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const project = store.projects.find((p) => p.id === workspaceId);
  const defaultUnit = project ? project.name : compartment ? compartment.name : field ? field.name : "HIPMI Telkom";

  const existingEvent = recordId ? store.events.find((e) => e.id === recordId) : null;

  const [formData, setFormData] = useState({
    title: existingEvent?.title || "",
    description: existingEvent?.description || "",
    organizer_unit: existingEvent?.organizer_unit || defaultUnit,
    category: existingEvent?.category || "gratis",
    schedule_start: existingEvent?.schedule_start
      ? existingEvent.schedule_start.slice(0, 16)
      : "2026-11-20T09:00",
    schedule_end: existingEvent?.schedule_end
      ? existingEvent.schedule_end.slice(0, 16)
      : "2026-11-20T12:00",
    location: existingEvent?.location || "Auditorium Gedung Damar, Telkom University",
    visibility: (existingEvent?.visibility as "public" | "internal") || "internal",
    public_terms: existingEvent?.public_terms || "Terbuka untuk seluruh anggota HIPMI PT Telkom.",
    project_id: existingEvent?.project_id || (project ? project.id : undefined)
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Real-time conflict check
  const potentialConflicts = store.events.filter((e) => {
    if (existingEvent && e.id === existingEvent.id) return false;
    const formDate = formData.schedule_start.split("T")[0];
    const eventDate = e.schedule_start.split("T")[0];
    return formDate === eventDate;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (existingEvent) {
      const updated = store.events.map((evt) =>
        evt.id === existingEvent.id
          ? {
              ...evt,
              ...formData,
              schedule_start: new Date(formData.schedule_start).toISOString(),
              schedule_end: new Date(formData.schedule_end).toISOString(),
            }
          : evt
      );
      updateStore({ events: updated });
    } else {
      const newEvent: AppEvent = {
        id: `evt-${Date.now()}`,
        project_id: formData.project_id,
        title: formData.title,
        description: formData.description,
        organizer_unit: formData.organizer_unit,
        lead_organizer_user_id: currentUser?.id || "usr-pres-01",
        poster_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
        category: formData.category as "gratis" | "berbayar",
        schedule_start: new Date(formData.schedule_start).toISOString(),
        schedule_end: new Date(formData.schedule_end).toISOString(),
        location: formData.location,
        public_terms: formData.public_terms,
        visibility: formData.visibility,
        status: "published"
      };
      updateStore({
        events: [newEvent, ...store.events],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            category: "event",
            title: `Jadwal Baru Diterbitkan: ${formData.title}`,
            message: `Agenda baru telah dijadwalkan oleh ${formData.organizer_unit} pada ${formData.schedule_start}.`,
            source_route: `/calendar/events/${newEvent.id}`,
            read: false,
            created_at: new Date().toISOString()
          },
          ...store.notifications
        ]
      });
    }

    setSavedSuccess(true);
    setTimeout(() => {
      if (source === "events") {
        router.push("/organization/events");
      } else if (workspaceId) {
        router.push(`/workspace/${workspaceId}/calendar`);
      } else {
        router.push("/organization/calendar");
      }
    }, 1000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CAL-04 / EVT-03
              </span>
              <span className="text-xs text-wine-500">Single Unified Agenda Form</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Jadwal / Agenda" : "Buat Jadwal / Agenda Baru"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Satu pintu pembuatan jadwal kabinet, pleno, proker, maupun agenda publik terintegrasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-semibold text-wine-600 hover:text-wine-900 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Batal
          </button>
        </div>

        {/* Schedule Conflict Notice */}
        {potentialConflicts.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Peringatan Benturan Jadwal Terdeteksi ({potentialConflicts.length} agenda)</span>
            </div>
            <p className="text-amber-800 text-xs">
              Tanggal yang Anda pilih memiliki agenda lain:{" "}
              {potentialConflicts.map((c) => c.title).join(", ")}. Peringatan ini bersifat informatif dan tidak memblokir penyimpanan.
            </p>
          </div>
        )}

        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            ✓ Data agenda berhasil disimpan! Mengalihkan ke kalender...
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Judul Kegiatan / Agenda *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Rapat Pleno I Arthakarsa / Workshop Public Speaking"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy font-medium text-wine-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Unit Penyelenggara
              </label>
              <input
                type="text"
                required
                value={formData.organizer_unit}
                onChange={(e) => setFormData({ ...formData, organizer_unit: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Visibilitas Kalender
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value as "public" | "internal" })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="internal">🔒 Internal Pengurus & Kader</option>
                <option value="public">🌐 Terbuka untuk Umum (Publik)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Waktu Mulai (WIB) *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.schedule_start}
                onChange={(e) => setFormData({ ...formData, schedule_start: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Waktu Selesai (WIB) *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.schedule_end}
                onChange={(e) => setFormData({ ...formData, schedule_end: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Lokasi / Venue *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Contoh: Gedung Damar R.302 atau Zoom Meeting"
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Kategori Tiket / Akses
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as "gratis" | "berbayar" })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="gratis">Gratis (Tanpa Tiket Bayar)</option>
                <option value="berbayar">Berbayar (Memerlukan Tiket)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan ringkasan materi, agenda bahasan, atau instruksi kehadiran..."
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
            />
          </div>

          <div className="pt-4 border-t border-wine-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl border border-wine-200 text-wine-700 hover:bg-wine-50 text-xs font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Agenda
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}

export default function AgendaFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir agenda...</div>}>
      <AgendaFormContent />
    </Suspense>
  );
}
