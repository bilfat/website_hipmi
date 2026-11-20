"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMockStore, mutateStore, addAuditEvent } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { formatRoleLabel } from "@/lib/personal/labels";
import { CadreStatus } from "@/types/domain";
import {
  ChevronLeft,
  User as UserIcon,
  Award,
  Briefcase,
  FolderKanban,
  CalendarCheck,
  Store,
  History,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";

type CadreTab = "identitas" | "keanggotaan" | "jabatan" | "proker" | "agenda" | "bisnis" | "riwayat";

export default function CadreDetailPage({
  params,
}: {
  params: Promise<{ cadreId: string }>;
}) {
  const { cadreId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const canManage = permissions.canManageCadres || permissions.canVerifyCadres;

  const user = store.users.find((u) => u.id === cadreId);

  const [activeTab, setActiveTab] = useState<CadreTab>("identitas");
  const [cadreStatus, setCadreStatus] = useState<CadreStatus>(user?.cadre_status || "candidate");
  const [memberId, setMemberId] = useState(user?.member_id || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white/95 border border-[#E9E1DC] space-y-4">
        <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
        <h2 className="font-serif text-xl font-bold text-wine-950">Kader Tidak Ditemukan</h2>
        <Link
          href="/organization/directory/cadres"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Database Kader
        </Link>
      </div>
    );
  }

  // Pull real relational data across modules for the 7 tabs (DIR-02)
  const userRoster = store.roster.filter(
    (r) => r.user_id === user.id || (user.nim && r.nim === user.nim)
  );
  const userTickets = store.tickets.filter(
    (t) => (user.nim && t.participant_nim === user.nim) || t.participant_email === user.email
  );
  const userBusinesses = store.businesses.filter((b) => b.owner_user_id === user.id);
  const userActivities = store.activity_history.filter((a) =>
    a.actor_name.toLowerCase().includes(user.name.toLowerCase())
  );

  const tabs: { id: CadreTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "identitas", label: "1. Identitas", icon: UserIcon },
    { id: "keanggotaan", label: "2. Keanggotaan", icon: Award },
    { id: "jabatan", label: "3. Jabatan", icon: Briefcase },
    { id: "proker", label: "4. Proker", icon: FolderKanban },
    { id: "agenda", label: "5. Agenda", icon: CalendarCheck },
    { id: "bisnis", label: "6. Bisnis", icon: Store },
    { id: "riwayat", label: "7. Riwayat", icon: History },
  ];

  const handleSaveMembership = () => {
    let finalMemberId = memberId.trim();
    if (cadreStatus === "verified" && !finalMemberId) {
      finalMemberId = `HIPMI-PT-${user.batch_year || "2024"}-${Math.floor(1000 + Math.random() * 9000)}`;
      setMemberId(finalMemberId);
    }

    mutateStore((draft) => {
      const target = draft.users.find((u) => u.id === user.id);
      if (target) {
        target.cadre_status = cadreStatus;
        target.member_id = finalMemberId || undefined;
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "UPDATE_CADRE_MEMBERSHIP",
        "User",
        user.id,
        user.cadre_status,
        `${cadreStatus} (${finalMemberId || "-"})`
      );
    });
    setNotice("Status keanggotaan dan nomor e-KTA berhasil diperbarui.");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/organization/directory/cadres"
          className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Database Kader</span>
        </Link>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
          {user.name || user.full_name}
        </h1>
        <p className="text-xs text-neutral-dark">
          NIM: <span className="font-mono font-semibold text-wine-950">{user.nim || "-"}</span> •{" "}
          {user.study_program || "Telkom University"} • {formatRoleLabel(user.base_role)}
        </p>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* 7 Sliding Tabs */}
      <div className="p-1.5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="cadre-detail-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm text-xs space-y-4">
        {activeTab === "identitas" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { label: "Nama Lengkap", value: user.name || user.full_name || "-" },
              { label: "NIM Telkom University", value: user.nim || "-" },
              { label: "Email Resmi", value: user.email || "-" },
              { label: "Program Studi", value: user.study_program || "-" },
              { label: "Angkatan", value: user.batch_year || "-" },
              { label: "Status Akun", value: user.account_status },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  {item.label}
                </span>
                <strong className="text-sm text-wine-950 mt-0.5 block">{item.value}</strong>
              </div>
            ))}
          </div>
        )}

        {activeTab === "keanggotaan" && (
          <div className="space-y-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950 block">Status Kaderisasi</label>
              <select
                disabled={!canManage}
                value={cadreStatus}
                onChange={(e) => setCadreStatus(e.target.value as CadreStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 disabled:opacity-70"
              >
                <option value="verified">Kader Terverifikasi</option>
                <option value="pending_verification">Menunggu Verifikasi</option>
                <option value="candidate">Calon Anggota</option>
                <option value="not_verified">Belum Terverifikasi</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950 block">Nomor e-KTA Resmi</label>
              <input
                type="text"
                disabled={!canManage}
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Terbit otomatis saat diset Terverifikasi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-mono text-wine-950 disabled:opacity-70"
              />
            </div>
            {canManage && (
              <button
                type="button"
                onClick={handleSaveMembership}
                className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold inline-flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Keanggotaan</span>
              </button>
            )}
          </div>
        )}

        {activeTab === "jabatan" && (
          <div className="space-y-3">
            <h2 className="font-serif text-base font-bold text-wine-950">
              Riwayat Jabatan Struktural (Tetap Tersimpan Lintas Kabinet)
            </h2>
            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between">
              <div>
                <strong className="font-serif text-sm text-wine-950 block">
                  {formatRoleLabel(user.base_role)}
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  Kabinet Arthakarsa (2026/2027) • Aktif
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase">
                Aktif
              </span>
            </div>
          </div>
        )}

        {activeTab === "proker" && (
          <div className="space-y-3">
            <h2 className="font-serif text-base font-bold text-wine-950">
              Keikutsertaan Program Kerja ({userRoster.length})
            </h2>
            {userRoster.length > 0 ? (
              userRoster.map((r) => {
                const proj = store.projects.find((p) => p.id === r.project_id);
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3"
                  >
                    <div>
                      <strong className="font-serif text-sm text-wine-950 block">
                        {proj?.name || r.project_id}
                      </strong>
                      <span className="text-[11px] text-neutral-dark">
                        Peran: {r.role_title} ({r.access_level})
                      </span>
                    </div>
                    <Link
                      href={`/workspace/projects/${r.project_id}`}
                      className="text-brand-burgundy font-semibold hover:underline"
                    >
                      Buka Proker →
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum tercatat dalam kepanitiaan program kerja.
              </p>
            )}
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="space-y-3">
            <h2 className="font-serif text-base font-bold text-wine-950">
              Riwayat Kehadiran &amp; Tiket Event ({userTickets.length})
            </h2>
            {userTickets.length > 0 ? (
              userTickets.map((t) => {
                const evt = store.events.find((e) => e.id === t.event_id);
                return (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3"
                  >
                    <div>
                      <strong className="font-serif text-sm text-wine-950 block">
                        {evt?.title || t.event_id}
                      </strong>
                      <span className="text-[11px] font-mono text-neutral-dark">
                        Kode Tiket: {t.ticket_token}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        t.is_checked_in
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {t.is_checked_in ? "Hadir (Check-in)" : "Terdaftar"}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada riwayat kehadiran agenda tercatat.
              </p>
            )}
          </div>
        )}

        {activeTab === "bisnis" && (
          <div className="space-y-3">
            <h2 className="font-serif text-base font-bold text-wine-950">
              Portofolio Bisnis Kader ({userBusinesses.length})
            </h2>
            {userBusinesses.length > 0 ? (
              userBusinesses.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3"
                >
                  <div>
                    <strong className="font-serif text-sm text-wine-950 block">{b.name}</strong>
                    <span className="text-[11px] text-neutral-dark">
                      {b.category} • Publikasi: {b.publication_status}
                    </span>
                  </div>
                  <Link
                    href="/organization/directory/businesses"
                    className="text-brand-burgundy font-semibold hover:underline"
                  >
                    Lihat di Direktori →
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Kader ini belum mendaftarkan usaha / bisnis.
              </p>
            )}
          </div>
        )}

        {activeTab === "riwayat" && (
          <div className="space-y-3">
            <h2 className="font-serif text-base font-bold text-wine-950">
              Riwayat Aktivitas Sistem ({userActivities.length})
            </h2>
            {userActivities.length > 0 ? (
              userActivities.map((a) => (
                <div
                  key={a.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3"
                >
                  <span>
                    <strong>{a.actor_name}</strong> {a.action}{" "}
                    <span className="text-brand-burgundy font-semibold">{a.target}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-light shrink-0">
                    {new Date(a.timestamp).toLocaleDateString("id-ID")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada riwayat aktivitas terekam.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
