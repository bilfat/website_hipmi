"use client";

import { use } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Shield,
  ArrowLeft,
  Check,
  X,
  Lock,
  Sparkles,
  Info
} from "lucide-react";

export default function RolePermissionMatrixPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];

  const roles = [
    { key: "system_admin", label: "System Admin" },
    { key: "ketum", label: "Ketua Umum" },
    { key: "sekum", label: "Sekretaris Umum" },
    { key: "bendum", label: "Bendahara Umum" },
    { key: "kakom", label: "Ketua Kompartemen" },
    { key: "staff", label: "Staff Pelaksana" },
    { key: "cadre", label: "Kader Resmi" },
    { key: "member", label: "Anggota Umum" }
  ];

  const permissions = [
    { key: "personal", label: "Personal Area & Profil", allowed: ["system_admin", "ketum", "sekum", "bendum", "kakom", "staff", "cadre", "member"] },
    { key: "membership", label: "e-KTA & Keanggotaan Kader", allowed: ["ketum", "sekum", "bendum", "kakom", "staff", "cadre"] },
    { key: "cadre_biz", label: "Daftar Bisnis Kader", allowed: ["ketum", "sekum", "bendum", "kakom", "staff", "cadre"] },
    { key: "workspace", label: "Workspace Operasional", allowed: ["ketum", "sekum", "bendum", "kakom", "staff"] },
    { key: "letters_approve", label: "Verifikasi & TTD Surat (Sekum)", allowed: ["sekum", "ketum"] },
    { key: "finance_disburse", label: "Pencairan Kas & Approval (Bendum)", allowed: ["bendum", "ketum"] },
    { key: "event_manage", label: "Kelola Event & Tiket", allowed: ["ketum", "sekum", "bendum", "kakom", "staff"] },
    { key: "attendance_scan", label: "Operator Scanner Presensi", allowed: ["ketum", "sekum", "bendum", "kakom", "staff"] },
    { key: "cms_manage", label: "Kelola Berita & Publikasi", allowed: ["ketum", "sekum", "kakom", "staff"] },
    { key: "admin_panel", label: "Admin Panel & Cabinet Center", allowed: ["system_admin"] }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
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
            Screen ID: ADM-10
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Hak Akses Kelembagaan
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Matriks Role & Permission
        </h1>
        <p className="text-xs text-neutral-dark">
          Pemetaan otoritas Role × Permission × Scope berdasarkan regulasi organisasi HIPMI CENTRAL.
        </p>
      </div>

      {/* Notice info */}
      <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 flex items-start gap-3 text-xs text-neutral-dark">
        <Info className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Aturan Keamanan Sistem:</strong> Otoritas Sekum (surat) dan Bendum (keuangan) berlaku sentral lintas kompartemen dan tidak diberikan secara otomatis ke admin sistem (prinsip segregation of duties).
        </p>
      </div>

      {/* Matrix Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-wine-950/10 text-neutral-light font-mono uppercase text-[10px]">
                <th className="py-3 px-3 min-w-[200px]">Modul & Wewenang</th>
                {roles.map((r) => (
                  <th key={r.key} className="py-3 px-2 text-center">
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-wine-950/5">
              {permissions.map((perm) => (
                <tr key={perm.key} className="hover:bg-wine-950/5">
                  <td className="py-3 px-3 font-semibold text-wine-950">
                    {perm.label}
                  </td>
                  {roles.map((r) => {
                    const isAllowed = perm.allowed.includes(r.key);
                    return (
                      <td key={r.key} className="py-3 px-2 text-center">
                        {isAllowed ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-300 flex items-center justify-center mx-auto">
                            <X className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
