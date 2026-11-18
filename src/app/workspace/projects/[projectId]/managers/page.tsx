"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Briefcase,
  ArrowLeft,
  Users,
  ShieldCheck,
  CheckCircle2,
  Crown,
  UserCheck
} from "lucide-react";

export default function ProjectManagersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const managers = store.roster.filter(
    (r) => r.project_id === project?.id && r.access_level === "Manager"
  );
  const members = store.roster.filter(
    (r) => r.project_id === project?.id && r.access_level !== "Manager"
  );

  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || "");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePromoteToManager = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    mutateStore((draft) => {
      const rosterItem = draft.roster.find((r) => r.id === selectedMemberId);
      if (rosterItem) {
        rosterItem.access_level = "Manager";
        rosterItem.role_title = `Project Manager (${project.name})`;

        addActivityHistory(
          currentUser.name,
          "menunjuk manajer proker baru",
          `${rosterItem.name} untuk ${project.name}`,
          "Manajer Proker"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "APPOINT_PROJECT_MANAGER",
          "RosterMember",
          rosterItem.id
        );
      }
    });

    setFeedback("Anggota berhasil dipromosikan sebagai Manajer Proker!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview {project.name}</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: WRK-07
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
            Pimpinan Proker
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Manajer Program Kerja: {project.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Pengaturan otoritas manajerial, hak kelola task board, dan penanggung jawab operasional kegiatan.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Current Managers Cards */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <Crown className="w-5 h-5 text-gold-600" />
          <span>Manajer Proker Aktif ({managers.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {managers.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-darkWine text-gold-300 font-serif text-xl font-bold flex items-center justify-center border border-gold-400/30">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <strong className="font-serif text-base text-wine-950 block">
                    {m.name}
                  </strong>
                  <span className="text-xs font-mono text-neutral-light">
                    NIM: {m.nim || "-"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-wine-950/10 text-xs space-y-1">
                <span className="text-neutral-light block">Jabatan Formal:</span>
                <strong className="text-brand-burgundy font-serif block">{m.role_title}</strong>
                <span className="text-[10px] text-emerald-700 font-mono">
                  Akses Penuh: Task Board, Roster, LPJ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appoint Manager from Roster */}
      {members.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-brand-burgundy" />
            <span>Tunjuk Manajer Tambahan dari Tim Roster</span>
          </h2>

          <form onSubmit={handlePromoteToManager} className="flex flex-col sm:flex-row gap-3 text-xs">
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-wine-950"
            >
              {members.map((mem) => (
                <option key={mem.id} value={mem.id}>
                  {mem.name} — {mem.role_title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs shadow-md transition-all shrink-0"
            >
              Tetapkan Sebagai Manajer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
