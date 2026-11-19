"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  User,
  ShieldCheck,
  Building,
  Sparkles
} from "lucide-react";

export default function MyActivitiesPage() {
  const { store, currentUser } = useMockStore();

  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);

  // Filter activities in store for currentUser
  const userActivities = store.activity_history.filter(
    (a) => a.actor_name === currentUser.name
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: PER-07
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Aktivitas Personal
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Kepanitiaan & Keterlibatan Program Kerja
        </h1>
        <p className="text-xs text-neutral-dark">
          Rekor partisipasi dan amanah program kerja milik Anda. Hanya menampilkan data yang diizinkan untuk akun Anda.
        </p>
      </div>

      {/* Projects Participation List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-brand-burgundy" />
            <span>Program Kerja Yang Diikuti ({userRosters.length})</span>
          </h2>
        </div>

        {userRosters.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {userRosters.map((roster) => {
              const project = store.projects.find((p) => p.id === roster.project_id);
              const comp = store.compartments.find((c) => c.id === project?.compartment_id);

              return (
                <div
                  key={roster.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        Peran: {roster.role_title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-400/20 text-wine-950 font-bold uppercase">
                        {project?.operational_status || "ongoing"}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-wine-950">
                      {project?.name || "Program Kerja"}
                    </h3>

                    <p className="text-xs text-neutral-dark">
                      Kompartemen: <strong className="text-wine-950">{comp?.name || "Kompartemen"}</strong>
                    </p>

                    <div className="flex items-center gap-4 text-xs text-neutral-light font-mono pt-1">
                      <span>Bergabung: {new Date(roster.joined_at).toLocaleDateString("id-ID")}</span>
                      <span>•</span>
                      <span>Tingkat Akses: {roster.access_level}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={`/personal/aktivitas/${project?.id || roster.project_id}`}
                      className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
                    >
                      <span>Rincian Amanah</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
            <FolderKanban className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              Anda belum ditugaskan pada program kerja atau kepanitiaan manapun.
            </p>
          </div>
        )}
      </div>

      {/* System Activity Stream */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold-600" />
          <span>Catatan Aktivitas Akun Saya</span>
        </h2>

        {userActivities.length > 0 ? (
          <div className="space-y-3">
            {userActivities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                className="p-3.5 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="text-wine-950">
                    Anda <strong className="text-brand-burgundy">{act.action}</strong>: {act.target}
                  </span>
                  <span className="text-[10px] text-neutral-light block">
                    Modul: {act.module}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-light shrink-0">
                  {new Date(act.timestamp).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-light">Belum ada riwayat aktivitas yang tercatat.</p>
        )}
      </div>
    </div>
  );
}
