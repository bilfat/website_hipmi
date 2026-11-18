"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  UserCheck,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertCircle,
  GraduationCap
} from "lucide-react";

export default function CadreVerificationDeskPage() {
  const { store, updateStore } = useMockStore();

  const candidates = store.users.filter(
    (u) => u.cadre_status === "candidate" || u.cadre_status === "pending_verification"
  );
  const verifiedCadres = store.users.filter((u) => u.cadre_status === "verified");

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleVerifyCadre = (userId: string) => {
    const user = store.users.find((u) => u.id === userId);
    if (!user) return;

    const nimPrefix = user.nim ? user.nim.slice(0, 4) : "2024";
    const newMemberId = `HIPMI-PT-${nimPrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    const updated = store.users.map((u) =>
      u.id === userId
        ? {
            ...u,
            cadre_status: "verified" as const,
            member_id: newMemberId,
          }
        : u
    );

    updateStore({
      users: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "cadre",
          title: `Keanggotaan Kader Terverifikasi: ${user.full_name}`,
          message: `Selamat! Keanggotaan Anda telah diverifikasi oleh PSDM. Nomor e-KTA resmi: ${newMemberId}.`,
          source_route: `/personal/keanggotaan`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setActionNotice(`Kader ${user.full_name} berhasil diverifikasi! Nomor e-KTA: ${newMemberId}.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleRejectCadre = (userId: string) => {
    const user = store.users.find((u) => u.id === userId);
    if (!user) return;

    const updated = store.users.map((u) =>
      u.id === userId ? { ...u, cadre_status: "rejected" as const } : u
    );

    updateStore({ users: updated });
    setActionNotice(`Kandidat ${user.full_name} ditolak.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/directory/cadres"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Database Kader
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DIR-03
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Verifikasi & Penautan Kader (PSDM)
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pemeriksaan bukti kelulusan Diklat / Makrab dan validasi identitas mahasiswa Telkom University.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Validasi Resmi PSDM</span>
          </div>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Candidates Queue */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-wine-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Kandidat Menunggu Verifikasi ({candidates.length})
            </h3>
            <span className="text-xs text-wine-500">Kesesuaian NIM + Bukti Sertifikat Diklat</span>
          </div>

          {candidates.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-surface-base border border-wine-100 text-wine-500 text-xs">
              Seluruh kandidat telah terverifikasi. Tidak ada antrean pending.
            </div>
          ) : (
            <div className="space-y-3">
              {candidates.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-wine-100 bg-surface-base flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {c.cadre_status}
                      </span>
                      <span className="text-xs font-mono font-semibold text-brand-burgundy">
                        NIM: {c.nim}
                      </span>
                    </div>

                    <h4 className="font-bold text-wine-900 font-display text-sm">
                      {c.full_name}
                    </h4>
                    <p className="text-xs text-wine-600">
                      Prodi: {c.study_program} • {c.email} • {c.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => handleRejectCadre(c.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Tolak
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVerifyCadre(c.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verifikasi & Terbitkan e-KTA
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OrganizationShell>
  );
}
