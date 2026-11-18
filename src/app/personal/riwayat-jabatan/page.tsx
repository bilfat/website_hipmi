"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function PositionHistoryPage() {
  const { store, currentUser } = useMockStore();

  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: PER-06
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Rekam Jejak Organisasi
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Riwayat Jabatan & Kepengurusan
        </h1>
        <p className="text-xs text-neutral-dark">
          Daftar posisi struktural, amanah manajerial, dan kepanitiaan resmi Anda di HIPMI PT Universitas Telkom.
        </p>
      </div>

      {/* Main Structural Position Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-wine-950/10">
          <Briefcase className="w-5 h-5 text-brand-burgundy" />
          <h2 className="font-serif text-xl font-bold text-wine-950">
            Jabatan Struktural Aktif
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Masa Bakti Aktif 2026/2027
              </span>
              <h3 className="font-serif text-xl font-bold text-wine-950">
                {currentUser.base_role} — Kabinet Arthakarsa
              </h3>
              <p className="text-xs text-neutral-dark">
                Badan Pengurus Cabang (BPC) HIPMI PT Universitas Telkom
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-[10px] font-mono text-neutral-light block uppercase">
                Nomor Surat Keputusan
              </span>
              <strong className="text-xs font-mono text-wine-950">
                SK-BPC/004/ARTHA/2026
              </strong>
            </div>
          </div>

          <p className="text-xs text-neutral-dark leading-relaxed pt-2 border-t border-wine-950/10">
            Bertanggung jawab penuh dalam mengemban amanah tata kelola organisasi, koordinasi antar bidang, perumusan kebijakan strategis, serta pembinaan kader HIPMI PT Universitas Telkom.
          </p>
        </div>
      </div>

      {/* Roster & Project Assignments */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-wine-950/10">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-600" />
            <h2 className="font-serif text-xl font-bold text-wine-950">
              Amanah Kepanitiaan & Program Kerja
            </h2>
          </div>
          <span className="text-xs text-neutral-light">
            Total {userRosters.length} Penugasan
          </span>
        </div>

        {userRosters.length > 0 ? (
          <div className="space-y-4">
            {userRosters.map((r) => {
              const project = store.projects.find((p) => p.id === r.project_id);
              return (
                <div
                  key={r.id}
                  className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {r.role_title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-neutral-dark border border-wine-950/10">
                        {project?.operational_status || "ongoing"}
                      </span>
                    </div>

                    <strong className="font-serif text-base text-wine-950 block">
                      {project?.name || "Program Kerja HIPMI"}
                    </strong>

                    <p className="text-xs text-neutral-dark">
                      Ditugaskan sejak:{" "}
                      <span className="font-mono">
                        {new Date(r.joined_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/personal/aktivitas`}
                    className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors shrink-0 self-start sm:self-center"
                  >
                    Rincian Tugas
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-surface-ivory text-center space-y-2 text-xs text-neutral-dark">
            <p>Belum ada riwayat penugasan kepanitiaan proker khusus untuk akun ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
