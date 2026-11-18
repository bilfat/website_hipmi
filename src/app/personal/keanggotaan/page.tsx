"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Award,
  ShieldCheck,
  Calendar,
  Download,
  Printer,
  QrCode,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function MembershipCardPage() {
  const { store, currentUser } = useMockStore();

  const isCadre = currentUser.cadre_status === "verified";
  const userFaculty = store.faculties.find((f) => f.id === currentUser.faculty_id);
  const userStudyProgram = userFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === currentUser.study_program_id
  );

  const ktaNumber = `HIPMI-TELKOM-${currentUser.nim || "2026"}-042`;

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 print:p-0 print:m-0 print:max-w-none">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            e-KTA & Status Keanggotaan Kader
          </h1>
          <p className="text-xs text-neutral-dark">
            Identitas resmi kader HIPMI Perguruan Tinggi Universitas Telkom Kabinet Arthakarsa.
          </p>
        </div>

        {isCadre && (
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintCard}
              className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh e-KTA</span>
            </button>
          </div>
        )}
      </div>

      {isCadre ? (
        <div className="space-y-8">
          {/* Digital e-KTA Card (Aurora Glass Editorial design) */}
          <div className="max-w-xl mx-auto rounded-3xl bg-gradient-to-br from-brand-darkWine via-brand-burgundy to-wine-950 text-white shadow-2xl p-7 sm:p-9 border-2 border-gold-400/40 relative overflow-hidden print:border-black print:shadow-none">
            {/* Background watermarked emblem */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
              <Award className="w-72 h-72 text-gold-300" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Card Top Band */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gold-400/30">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-gold-300 block">
                    KARTU TANDA ANGGOTA DIGITAL (e-KTA)
                  </span>
                  <strong className="font-serif text-base sm:text-lg font-bold tracking-tight block">
                    HIPMI PT UNIVERSITAS TELKOM
                  </strong>
                  <span className="text-[10px] text-blush-200">
                    Kabinet Arthakarsa 2026/2027
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              {/* Member Details */}
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-gold-400/40 flex items-center justify-center font-serif text-3xl font-bold text-gold-300 shadow-md shrink-0">
                  {currentUser.name.charAt(0)}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-400/20 text-gold-300 inline-block">
                    Kader Terverifikasi
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs text-blush-200 font-mono">
                    NIM: {currentUser.nim || "1301213001"}
                  </p>
                  <p className="text-[11px] text-blush-200">
                    {userFaculty?.name} • {userStudyProgram?.name}
                  </p>
                </div>
              </div>

              {/* Card Footer Barcode & Token */}
              <div className="pt-4 border-t border-gold-400/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] font-mono text-gold-300 block uppercase">
                    Nomor Induk Anggota (NIA)
                  </span>
                  <strong className="font-mono text-xs sm:text-sm text-white tracking-wider">
                    {ktaNumber}
                  </strong>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono text-gold-300 block uppercase">
                    Masa Berlaku
                  </span>
                  <span className="font-mono text-xs text-white">
                    2026 — 2027
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cadre Stages & History (hidden in print) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6 print:hidden">
            <h2 className="font-serif text-xl font-bold text-wine-950 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Riwayat Tahapan Kaderisasi Organisasi</span>
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-sm text-wine-950 font-serif block">
                    Pelantikan Anggota & Penerbitan e-KTA Resmi
                  </strong>
                  <p className="text-xs text-neutral-dark">
                    Dinyatakan lulus seluruh rangkaian pembinaan kader dan resmi dilantik oleh Ketua Umum BPC HIPMI Kabinet Arthakarsa.
                  </p>
                  <span className="text-[11px] font-mono text-neutral-light block">
                    Tanggal: 14 September 2026 • Status: Sah
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-sm text-wine-950 font-serif block">
                    Latihan Kepemimpinan Kader (LKK) HIPMI
                  </strong>
                  <p className="text-xs text-neutral-dark">
                    Menyelesaikan pelatihan kepemimpinan wirausaha, simulasi bisnis canvas, dan studi etika organisasi.
                  </p>
                  <span className="text-[11px] font-mono text-neutral-light block">
                    Predikat: Sangat Memuaskan (A)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <strong className="text-sm text-wine-950 font-serif block">
                    Diklat Pengenalan Organisasi (DPO)
                  </strong>
                  <p className="text-xs text-neutral-dark">
                    Orientasi awal pengenalan visi misi HIPMI Perguruan Tinggi dan jejaring BPC/BPD HIPMI Jawa Barat.
                  </p>
                  <span className="text-[11px] font-mono text-neutral-light block">
                    Tanggal: 22 Agustus 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-wine-950/10 flex justify-between items-center">
              <Link
                href="/personal/riwayat-jabatan"
                className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Lihat Riwayat Jabatan Struktural Saya →</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Notice for candidate / unverified */
        <div className="p-8 rounded-3xl bg-surface-card border border-amber-300 shadow-xl space-y-4 text-center">
          <Award className="w-12 h-12 text-amber-600 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-wine-950">
            e-KTA Belum Tersedia untuk Akun Ini
          </h2>
          <p className="text-xs sm:text-sm text-neutral-dark max-w-md mx-auto">
            Status akun Anda saat ini adalah <strong>{currentUser.cadre_status}</strong>. Kartu Tanda Anggota (e-KTA) resmi hanya diterbitkan setelah mahasiswa menyelesaikan program Diklat Kaderisasi HIPMI Telkom.
          </p>
          <div className="pt-2">
            <Link
              href="/aktivitas/agenda"
              className="px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold inline-block"
            >
              Lihat Jadwal Diklat & Kegiatan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
