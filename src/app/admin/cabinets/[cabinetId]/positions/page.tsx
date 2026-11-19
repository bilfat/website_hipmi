"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Briefcase,
  ArrowLeft,
  Users,
  Plus,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Building,
  UserPlus
} from "lucide-react";
import { RosterMember } from "@/types/domain";

export default function PositionsManagementPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];

  // Form assignment state
  const [selectedUserId, setSelectedUserId] = useState(store.users[0]?.id || "");
  const [selectedProjectId, setSelectedProjectId] = useState(store.projects[0]?.id || "");
  const [roleTitle, setRoleTitle] = useState("Staff Pelaksana");
  const [accessLevel, setAccessLevel] = useState<"Manager" | "Member">("Member");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const assignedUser = store.users.find((u) => u.id === selectedUserId);
    const assignedProject = store.projects.find((p) => p.id === selectedProjectId);

    if (!assignedUser || !assignedProject) return;

    const newRoster: RosterMember = {
      id: `ros-${Date.now()}`,
      project_id: assignedProject.id,
      user_id: assignedUser.id,
      name: assignedUser.name,
      nim: assignedUser.nim || null,
      role_title: roleTitle.trim(),
      access_level: accessLevel,
      status: "active",
      is_cadre: assignedUser.cadre_status === "verified",
      joined_at: new Date().toISOString()
    };

    mutateStore((draft) => {
      draft.roster.unshift(newRoster);

      addActivityHistory(
        currentUser.name,
        "menetapkan penugasan pengurus baru",
        `${assignedUser.name} sebagai ${roleTitle} (${assignedProject.name})`,
        "Manajemen Jabatan"
      );

      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "ASSIGN_ROSTER_MEMBER",
        "RosterMember",
        newRoster.id
      );
    });

    setFeedback(`Penugasan berhasil: ${assignedUser.name} sebagai ${roleTitle}!`);
  };

  const handleRemoveAssignment = (rosterId: string) => {
    mutateStore((draft) => {
      const idx = draft.roster.findIndex((r) => r.id === rosterId);
      if (idx !== -1) {
        const removed = draft.roster[idx];
        draft.roster.splice(idx, 1);
        addActivityHistory(
          currentUser.name,
          "mencabut penugasan pengurus",
          `${removed.name} (${removed.role_title})`,
          "Manajemen Jabatan"
        );
      }
    });
    setFeedback("Penugasan berhasil dicabut.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dasbor Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: ADM-07
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Jabatan & Roster
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Manajemen Jabatan & Penugasan Pengurus
        </h1>
        <p className="text-xs text-neutral-dark">
          Atur penempatan kader ke dalam tim kepanitiaan, manajer proker, dan staf operasional kabinet.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Form Assign Pengurus */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-brand-burgundy" />
          <span>Tambah Penugasan / SK Baru</span>
        </h2>

        <form onSubmit={handleAddAssignment} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* User selector */}
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Pilih Pengguna</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-wine-950"
            >
              {store.users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.demo_id})
                </option>
              ))}
            </select>
          </div>

          {/* Project selector */}
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Program Kerja</label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-wine-950"
            >
              {store.projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role Title */}
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Titel Jabatan</label>
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="Contoh: Manager Acara"
              className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-wine-950"
            />
          </div>

          {/* Access Level */}
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Tingkat Akses</label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value as "Manager" | "Member")}
              className="w-full px-3 py-2 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-wine-950"
            >
              <option value="Manager">Manager (Kelola Workspace)</option>
              <option value="Member">Member (Pelaksana)</option>
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-4 flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Simpan Penugasan Roster</span>
            </button>
          </div>
        </form>
      </div>

      {/* Roster Assignment Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950">
          Daftar Roster & Jabatan Aktif ({store.roster.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                <th className="py-2.5 px-3">Nama Anggota</th>
                <th className="py-2.5 px-3">Program Kerja</th>
                <th className="py-2.5 px-3">Jabatan</th>
                <th className="py-2.5 px-3">Akses</th>
                <th className="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wine-950/5">
              {store.roster.map((r) => {
                const project = store.projects.find((p) => p.id === r.project_id);
                return (
                  <tr key={r.id} className="hover:bg-wine-950/5">
                    <td className="py-2.5 px-3 font-semibold text-wine-950">
                      {r.name}
                    </td>
                    <td className="py-2.5 px-3 text-neutral-dark">
                      {project?.name || "Program Kerja"}
                    </td>
                    <td className="py-2.5 px-3 font-serif font-medium text-brand-burgundy">
                      {r.role_title}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-[10px] bg-surface-ivory px-2 py-0.5 rounded border border-wine-950/10">
                        {r.access_level}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleRemoveAssignment(r.id)}
                        className="p-1 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Cabut Penugasan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
