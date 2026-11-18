"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Users,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building,
  Briefcase,
  Calendar,
  CreditCard,
  Edit2,
  Save
} from "lucide-react";

export default function CadreDetailPage({
  params,
}: {
  params: Promise<{ cadreId: string }>;
}) {
  const { cadreId } = use(params);
  const { store, updateStore } = useMockStore();

  const user = store.users.find((u) => u.id === cadreId);
  const userBusinesses = store.businesses.filter((b) => b.owner_user_id === cadreId);

  const [cadreStatus, setCadreStatus] = useState(user?.cadre_status || "candidate");
  const [memberId, setMemberId] = useState(user?.member_id || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!user) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Kader Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{cadreId}" tidak terdaftar.</p>
          <Link
            href="/organization/directory/cadres"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Database Kader
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleUpdateStatus = () => {
    let finalMemberId = memberId;
    if (cadreStatus === "verified" && !finalMemberId) {
      const nimPrefix = user.nim ? user.nim.slice(0, 4) : "2024";
      finalMemberId = `HIPMI-PT-${nimPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;
      setMemberId(finalMemberId);
    }

    const updated = store.users.map((u) =>
      u.id === user.id
        ? {
            ...u,
            cadre_status: cadreStatus as any,
            member_id: finalMemberId || undefined,
          }
        : u
    );

    updateStore({
      users: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "cadre",
          title: `Status Keanggotaan Diperbarui: ${user.full_name}`,
          message: `Status kader Anda telah diperbarui menjadi ${cadreStatus}. e-KTA resmi: ${finalMemberId || "-"}.`,
          source_route: `/personal/keanggotaan`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setNotice("Status keanggotaan dan e-KTA kader berhasil diperbarui!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/directory/cadres"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Database Kader
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              DIR-02
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/personal/keanggotaan"
              className="px-3.5 py-1.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
            >
              Pratinjau e-KTA Fisik
            </Link>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Cadre Profile Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy font-display font-bold text-2xl flex items-center justify-center border border-brand-burgundy/20">
                {(user.full_name || user.name || "K").charAt(0)}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-display text-wine-950">
                  {user.full_name || user.name}
                </h1>
                <p className="text-xs text-wine-600 font-mono mt-0.5">
                  NIM: {user.nim || "-"} • {user.email}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      user.cadre_status === "verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {user.cadre_status}
                  </span>
                  <span className="text-xs text-wine-500 font-mono">
                    e-KTA: {user.member_id || "Belum Terbit"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-base border border-wine-100 text-xs space-y-1">
              <span className="text-wine-500">Program Studi Telkom:</span>
              <p className="font-bold text-wine-900">{user.study_program}</p>
              <p className="text-wine-600 font-mono">No. HP: {user.phone}</p>
            </div>
          </div>

          {/* PSDM Management Desk */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Desk Pengesahan & Keanggotaan (PSDM / Admin)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-wine-900">Status Kader *</label>
                <select
                  value={cadreStatus}
                  onChange={(e) => setCadreStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900 font-medium"
                >
                  <option value="verified">Verified (Kader Sah / Lulus Diklat)</option>
                  <option value="candidate">Candidate (Calon Anggota)</option>
                  <option value="pending_verification">Pending Verification</option>
                  <option value="rejected">Rejected (Ditolak)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-wine-900">Nomor e-KTA Resmi</label>
                <input
                  type="text"
                  placeholder="Auto-generate jika kosong"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white font-mono text-wine-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleUpdateStatus}
                className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Simpan Status Keanggotaan
              </button>
            </div>
          </div>

          {/* Linked Cadre Businesses */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-wine-950 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-burgundy" />
              Usaha / Bisnis Kader ({userBusinesses.length})
            </h3>

            {userBusinesses.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-surface-base border border-wine-100 text-wine-500 text-xs">
                Kader ini belum mendaftarkan unit usaha bisnis.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userBusinesses.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl border border-wine-100 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-wine-900">{b.name}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-wine-50 text-wine-800">
                        {b.category}
                      </span>
                    </div>
                    <p className="text-xs text-wine-600 line-clamp-2">{b.description}</p>
                    <div className="pt-2 flex justify-between items-center text-[11px] border-t border-wine-50">
                      <span className="text-emerald-700 font-semibold">{b.publication_status}</span>
                      <Link
                        href={`/organization/directory/businesses/${b.id}`}
                        className="text-brand-burgundy font-semibold hover:underline"
                      >
                        Buka Bisnis →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
