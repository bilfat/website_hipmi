"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  Plus,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  FolderKanban,
  Layers,
  ArrowRight
} from "lucide-react";

export default function WorkspaceCalendarPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { store } = useMockStore();

  // Find workspace context (Field, Compartment, or Project)
  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const project = store.projects.find((p) => p.id === workspaceId);

  const unitName = project ? project.name : compartment ? compartment.name : field ? field.name : "Workspace Unit";

  // Filter events belonging to or matching this unit or project
  const workspaceEvents = store.events.filter(
    (e) =>
      e.project_id === workspaceId ||
      e.organizer_unit.toLowerCase().includes(unitName.toLowerCase()) ||
      (project && e.project_id === project.id)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/workspace/${workspaceId}`}
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Kembali ke Workspace
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              CAL-02
            </span>
          </div>
          <h1 className="text-2xl font-display font-bold text-wine-950">
            Kalender {unitName}
          </h1>
          <p className="text-sm text-wine-600 mt-1">
            Jadwal operasional khusus untuk lingkup kerja {unitName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/calendar/events/form?mode=create&workspaceId=${workspaceId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Jadwal Baru Unit Ini</span>
          </Link>
        </div>
      </div>

      {/* Events List or Empty State */}
      {workspaceEvents.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-wine-50 flex items-center justify-center text-wine-400">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-base font-bold text-wine-900 font-display">
              Belum Ada Jadwal Khusus Unit
            </h3>
            <p className="text-xs text-wine-600 mt-1">
              Tambahkan agenda rapat, milestone, atau deadline proker untuk unit {unitName} agar tim selalu sinkron.
            </p>
          </div>
          <Link
            href={`/calendar/events/form?mode=create&workspaceId=${workspaceId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white font-medium text-xs hover:bg-wine-900 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Agenda Sekarang</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workspaceEvents.map((evt) => {
            const startDate = new Date(evt.schedule_start);
            const endDate = new Date(evt.schedule_end);
            return (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      evt.visibility === "public"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {evt.visibility === "public" ? "🌐 Publik" : "🔒 Internal Unit"}
                  </span>
                  <span className="text-xs text-wine-400 capitalize">{evt.status}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-wine-950 font-display">{evt.title}</h3>
                  <p className="text-xs text-wine-600 line-clamp-2 mt-1">{evt.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-surface-base border border-wine-100 text-xs text-wine-700 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-wine-500" />
                    <span className="font-medium">
                      {startDate.toLocaleDateString("id-ID", {
                        weekday: "short",
                        day: "numeric",
                        month: "short"
                      })}
                      , {startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-wine-500" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Link
                    href={`/calendar/events/${evt.id}`}
                    className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-medium transition-all"
                  >
                    Detail Agenda (CAL-03)
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
      )}
    </div>
  );
}
