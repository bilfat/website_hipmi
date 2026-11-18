"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Users,
  ArrowLeft,
  UserPlus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { RosterMember } from "@/types/domain";

export default function ProjectTeamRosterPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const projectRoster = store.roster.filter((r) => r.project_id === project?.id);

  // Check if current user is manager or higher in this project
  const myRoster = projectRoster.find((r) => r.user_id === currentUser.id);
  const canManageRoster =
    currentUser.base_role === "system_admin" ||
    currentUser.base_role === "ketum" ||
    currentUser.base_role === "sekum" ||
    currentUser.base_role === "kakom" ||
    myRoster?.access_level === "Manager";

  // Form states for adding member
  const [selectedUserId, setSelectedUserId] = useState(store.users[0]?.id || "");
  const [roleTitle, setRoleTitle] = useState("Staff Divisi");
  const [accessLevel, setAccessLevel] = useState<"Manager" | "Member">("Member");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManageRoster) return;

    const user = store.users.find((u) => u.id === selectedUserId);
    if (!user) return;

    const newMember: RosterMember = {
      id: `ros-${Date.now()}`,
      project_id: project.id,
      user_id: user.id,
      name: user.name,
      nim: user.nim || null,
      role_title: roleTitle.trim(),
      access_level: accessLevel,
      status: "active",
      is_cadre: user.cadre_status === "verified",
      joined_at: new Date().toISOString()
    };

    mutateStore((draft) => {
      draft.roster.push(newMember);

      addActivityHistory(
        currentUser.name,
        "menambahkan anggota tim pelaksana proker",
        `${user.name} sebagai ${roleTitle} (${project.name})`,
        "Roster Proker"
      );

      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "ADD_PROJECT_ROSTER",
        "RosterMember",
        newMember.id
      );
    });

    setFeedback(`Anggota ${user.name} berhasil ditambahkan ke tim!`);
  };

  const handleRemoveMember = (rosterId: string) => {
    if (!canManageRoster) return;

    mutateStore((draft) => {
      const idx = draft.roster.findIndex((r) => r.id === rosterId);
      if (idx !== -1) {
        const removed = draft.roster[idx];
        draft.roster.splice(idx, 1);

        addActivityHistory(
          currentUser.name,
          "menghapus anggota tim pelaksana",
          `${removed.name} (${removed.role_title})`,
          "Roster Proker"
        );
      }
    });

    setFeedback("Anggota tim berhasil dikeluarkan dari roster.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
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
            Screen ID: WRK-06
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Tim Pelaksana
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Roster Tim Pelaksana: {project.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Pengelolaan susunan kepanitiaan, hierarki wewenang, dan delegasi tugas anggota.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add Member Form (Only if authorized) */}
      {canManageRoster && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-burgundy" />
            <span>Tambah Anggota ke Tim</span>
          </h2>

          <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Pilih Pengguna</label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 text-wine-950"
              >
                {store.users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.demo_id})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Titel Peran / Divisi</label>
              <input
                type="text"
                required
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="Contoh: Koordinator Logistik"
                className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tingkat Akses</label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as "Manager" | "Member")}
                className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 text-wine-950"
              >
                <option value="Member">Member (Pelaksana)</option>
                <option value="Manager">Manager (Pimpinan Tim)</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Tambahkan ke Roster</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Roster Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Daftar Anggota Tim ({projectRoster.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Nama Anggota</th>
                <th className="py-2.5 px-3">NIM</th>
                <th className="py-2.5 px-3">Titel Jabatan</th>
                <th className="py-2.5 px-3">Tingkat Akses</th>
                <th className="py-2.5 px-3">Status Kader</th>
                {canManageRoster && <th className="py-2.5 px-3 text-right">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-wine-950/5">
              {projectRoster.map((r) => (
                <tr key={r.id} className="hover:bg-wine-950/5">
                  <td className="py-2.5 px-3 font-semibold text-wine-950">
                    {r.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-neutral-dark">
                    {r.nim || "-"}
                  </td>
                  <td className="py-2.5 px-3 font-serif font-medium text-brand-burgundy">
                    {r.role_title}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-mono text-[10px] bg-surface-ivory px-2 py-0.5 rounded border border-wine-950/10">
                      {r.access_level}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        r.is_cadre
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {r.is_cadre ? "Kader" : "Anggota"}
                    </span>
                  </td>
                  {canManageRoster && (
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleRemoveMember(r.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
