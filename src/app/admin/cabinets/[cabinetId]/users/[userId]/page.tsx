"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  ArrowLeft,
  User,
  Shield,
  Award,
  Briefcase,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Mail,
  Phone,
  Building,
  GraduationCap
} from "lucide-react";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ cabinetId: string; userId: string }>;
}) {
  const { cabinetId, userId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];
  const targetUser = store.users.find((u) => u.id === userId) || store.users[0];

  const targetFaculty = store.faculties.find((f) => f.id === targetUser?.faculty_id);
  const targetStudyProgram = targetFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === targetUser?.study_program_id
  );

  const targetRosters = store.roster.filter((r) => r.user_id === targetUser?.id);
  const targetActivities = store.activity_history.filter(
    (a) => a.actor_name === targetUser?.name
  );

  const [activeTab, setActiveTab] = useState<
    "identity" | "membership" | "position" | "permission" | "history"
  >("identity");

  if (!targetUser) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-wine-950">
          Pengguna Tidak Ditemukan
        </h1>
        <Link
          href={`/admin/cabinets/${cab.id}/users`}
          className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          Kembali ke Manajemen Pengguna
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}/users`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Database Kader & Pengguna</span>
      </Link>

      {/* Header Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-darkWine text-gold-300 font-serif text-2xl font-bold flex items-center justify-center border border-gold-400/40">
              {targetUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
                  {targetUser.demo_id}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
                  {targetUser.base_role}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                {targetUser.name}
              </h1>
              <p className="text-xs text-neutral-dark font-mono">
                NIM: {targetUser.nim || "-"} • Email: {targetUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Tab Segmented Control */}
      <div className="flex flex-wrap items-center gap-2 border-b border-wine-950/10 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("identity")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === "identity"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          1. Identitas
        </button>

        <button
          onClick={() => setActiveTab("membership")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === "membership"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          2. Keanggotaan
        </button>

        <button
          onClick={() => setActiveTab("position")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === "position"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          3. Jabatan ({targetRosters.length})
        </button>

        <button
          onClick={() => setActiveTab("permission")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === "permission"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          4. Permission
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === "history"
              ? "bg-brand-burgundy text-white shadow-sm"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          5. Riwayat Aktivitas
        </button>
      </div>

      {/* Tab 1: Identitas */}
      {activeTab === "identity" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Informasi Data Diri Lengkap
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Nama Lengkap</span>
              <strong className="text-wine-950 text-sm block">{targetUser.name}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Nomor Induk Mahasiswa</span>
              <strong className="text-wine-950 font-mono text-sm block">
                {targetUser.nim || "-"}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Alamat Email</span>
              <strong className="text-wine-950 text-sm block">{targetUser.email}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Nomor Telepon</span>
              <strong className="text-wine-950 text-sm block">
                {targetUser.phone || "-"}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Fakultas</span>
              <strong className="text-wine-950 text-sm block">
                {targetFaculty?.name || "Fakultas Informatika"}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Program Studi</span>
              <strong className="text-wine-950 text-sm block">
                {targetStudyProgram?.name || "S1 Informatika"}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Keanggotaan */}
      {activeTab === "membership" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Status Keanggotaan & Kaderisasi
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Status Kader</span>
              <strong className="text-emerald-700 font-serif text-base block uppercase">
                {targetUser.cadre_status}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
              <span className="text-neutral-light block">Status Akun Login</span>
              <strong className="text-wine-950 font-serif text-base block uppercase">
                {targetUser.account_status}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Jabatan */}
      {activeTab === "position" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Penempatan Jabatan & Tim Kerja
          </h2>

          <div className="space-y-3">
            {targetRosters.length > 0 ? (
              targetRosters.map((r) => {
                const project = store.projects.find((p) => p.id === r.project_id);
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="text-brand-burgundy font-serif text-sm block">
                        {r.role_title}
                      </strong>
                      <span className="text-wine-950">{project?.name || "Program Kerja"}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-wine-950/10">
                      {r.access_level}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-neutral-light">Tidak ada penugasan roster aktif.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Permission */}
      {activeTab === "permission" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Hak Akses & Additional Permissions
          </h2>

          <div className="flex flex-wrap gap-2 text-xs">
            {targetUser.additional_permissions?.length > 0 ? (
              targetUser.additional_permissions.map((perm, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-brand-burgundy/10 text-brand-burgundy font-mono text-[11px] font-semibold"
                >
                  {perm}
                </span>
              ))
            ) : (
              <p className="text-neutral-light text-xs">
                Tidak ada izin tambahan khusus. Mengikuti aturan base role: {targetUser.base_role}.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Riwayat */}
      {activeTab === "history" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h2 className="font-serif text-lg font-bold text-wine-950">
            Log Aktivitas Pengguna
          </h2>

          <div className="space-y-2 text-xs">
            {targetActivities.length > 0 ? (
              targetActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-xl bg-surface-ivory border border-wine-950/10 flex items-center justify-between"
                >
                  <span>
                    {act.action}: <strong className="text-wine-950">{act.target}</strong>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-light">
                    {new Date(act.timestamp).toLocaleTimeString("id-ID")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-neutral-light text-xs">Belum ada rekaman aktivitas.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
