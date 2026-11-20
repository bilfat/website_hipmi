"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { CadreNimLookup } from "@/components/organization/cadre-nim-lookup";
import { User } from "@/types/domain";
import {
  ArrowLeft,
  CheckCircle2,
  UserMinus,
  ShieldCheck,
  Eye,
} from "lucide-react";

export default function ProjectManagersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const isOwnerKakom =
    permissions.isKakom &&
    (!permissions.managedCompartmentId ||
      permissions.managedCompartmentId === project?.compartment_id);

  const activeManagers = (project?.managers || []).filter((m) => m.status === "active");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAssignManager = (candidate: User) => {
    if (!isOwnerKakom) return;
    if (candidate.account_status !== "active" || candidate.cadre_status !== "verified") return;

    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      if (target) {
        if (!target.managers) target.managers = [];
        const existing = target.managers.find((m) => m.user_id === candidate.id);
        if (existing) {
          existing.status = "active";
        } else {
          target.managers.push({
            user_id: candidate.id,
            assigned_by: currentUser.id,
            assigned_at: new Date().toISOString(),
            status: "active",
          });
        }
        target.lead_name = candidate.name;
      }

      const existingRoster = draft.roster.find(
        (r) => r.project_id === project.id && r.user_id === candidate.id
      );
      if (existingRoster) {
        existingRoster.access_level = "Manager";
      } else {
        draft.roster.push({
          id: `ros-${Date.now()}`,
          project_id: project.id,
          user_id: candidate.id,
          name: candidate.name,
          nim: candidate.nim,
          role_title: "Pengelola Proker (Manager)",
          access_level: "Manager",
          status: "active",
          is_cadre: true,
          joined_at: new Date().toISOString(),
        });
      }

      addActivityHistory(
        currentUser.name,
        "menunjuk pengelola proker baru",
        `${candidate.name} (NIM: ${candidate.nim || "-"}) — ${project.name}`,
        "Pengelola Proker"
      );

      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "ASSIGN_PROJECT_MANAGER",
        "Project",
        project.id,
        undefined,
        `${candidate.name} (NIM: ${candidate.nim || "-"})`
      );
    });

    setFeedback(`${candidate.name} (NIM: ${candidate.nim || "-"}) resmi ditunjuk sebagai Pengelola Proker.`);
  };

  const handleRevokeManager = (userId: string) => {
    if (!isOwnerKakom) return;
    const revokedUser = store.users.find((u) => u.id === userId);
    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      const mgr = target?.managers?.find((m) => m.user_id === userId);
      if (mgr) mgr.status = "revoked";
      const rosterTarget = draft.roster.find(
        (r) => r.project_id === project.id && r.user_id === userId
      );
      if (rosterTarget) rosterTarget.access_level = "Member";
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "REVOKE_PROJECT_MANAGER",
        "Project",
        project.id,
        "Active Manager",
        revokedUser?.name || userId
      );
    });
    setFeedback("Hak Pengelola Proker berhasil dicabut dan diturunkan ke Anggota Tim.");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href={`/workspace/projects/${project.id}`}
          className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke {project.name}</span>
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold block pt-1">
          Kewenangan Kepala Kompartemen
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
          Pengelola Proker: {project.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Cari kader berdasarkan NIM atau nama akun untuk melihat identitas &amp; status verifikasi, lalu tunjuk atau cabut hak Pengelola Proker.
        </p>
      </div>

      {!isOwnerKakom && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan — Hanya Kepala Kompartemen pemilik yang berwenang menunjuk atau mencabut Pengelola Proker.
          </span>
        </div>
      )}

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Active Managers */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
          <span>Pengelola Proker Aktif ({activeManagers.length})</span>
        </h2>

        {activeManagers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {activeManagers.map((m) => {
              const u = store.users.find((usr) => usr.id === m.user_id);
              return (
                <div
                  key={m.user_id}
                  className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-brand-burgundy text-[#F5D6A8] font-bold flex items-center justify-center shrink-0">
                      {(u?.name || "M").charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <strong className="font-serif text-sm text-wine-950 block truncate">
                        {u?.name || m.user_id}
                      </strong>
                      <span className="text-[11px] font-mono text-brand-burgundy font-semibold block">
                        NIM: {u?.nim || "-"}
                      </span>
                      <span className="text-[10px] text-neutral-dark block truncate">
                        {u?.email || "-"}
                      </span>
                    </div>
                  </div>
                  {isOwnerKakom && (
                    <button
                      type="button"
                      onClick={() => handleRevokeManager(m.user_id)}
                      className="px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] inline-flex items-center gap-1 shrink-0"
                    >
                      <UserMinus className="w-3.5 h-3.5" />
                      <span>Cabut</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-neutral-dark p-5 rounded-2xl bg-[#FCF8F6] text-center">
            Belum ada Pengelola Proker aktif pada program kerja ini.
          </p>
        )}
      </section>

      {/* NIM / Name Lookup Assignment */}
      {isOwnerKakom && (
        <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-wine-950">
              Cari &amp; Tunjuk Kader Terverifikasi berdasarkan NIM
            </h2>
            <p className="text-xs text-neutral-dark">
              Masukkan NIM atau nama kader; sistem langsung menampilkan identitas akun, email, prodi, dan status verifikasi kadernya.
            </p>
          </div>
          <CadreNimLookup
            users={store.users}
            assignedUserIds={activeManagers.map((m) => m.user_id)}
            mode="assign"
            onSelect={handleAssignManager}
          />
        </section>
      )}
    </div>
  );
}
