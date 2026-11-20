"use client";

import Image from "next/image";
import { User, Faculty } from "@/types/domain";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { getCadreLevel } from "@/lib/personal/labels";
import { Award, Printer, QrCode, ShieldCheck } from "lucide-react";

interface KtaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  faculty?: Faculty;
  studyProgramName?: string;
}

export function KtaModal({
  isOpen,
  onClose,
  currentUser,
  faculty,
  studyProgramName,
}: KtaModalProps) {
  const ktaNumber = `HIPMI-TU-${currentUser.nim || "2026"}-042`;
  const cadreLevel = getCadreLevel(currentUser.base_role, currentUser.cadre_status);

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge="Kartu Tanda Anggota Digital"
      title="e-KTA Resmi Kader HIPMI"
      subtitle="Identitas resmi kader HIPMI Perguruan Tinggi Universitas Telkom — Kabinet Arthakarsa."
      maxWidth="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6] transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </>
      }
    >
      <div className="space-y-5">
        {/* High-craft e-KTA Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#2B090F] via-[#5A1722] to-[#3D0F16] text-white p-6 sm:p-8 border border-[#E8B577]/45 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Gold Rings */}
          <div
            className="absolute -right-12 -top-12 w-48 h-48 rounded-full border border-[#E8B577]/20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 -bottom-16 w-60 h-60 rounded-full bg-[#E8B577]/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8B577]/25">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
                  <Image
                    src="/assets/assets_logo/logo_hipmi.png"
                    alt="Logo HIPMI"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#E8B577] font-bold block">
                    KARTU TANDA ANGGOTA DIGITAL
                  </span>
                  <strong className="font-serif text-sm sm:text-base font-bold tracking-tight block">
                    HIPMI PT UNIVERSITAS TELKOM
                  </strong>
                  <span className="text-[10px] text-white/75">
                    Kabinet ARTHAKARSA • 2026/2027
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#E8B577]/20 border border-[#E8B577]/40 text-[#E8B577] text-[10px] font-mono font-bold uppercase shrink-0">
                Kader Tk. {cadreLevel.level}
              </span>
            </div>

            {/* Body Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-[#E8B577]/45 flex items-center justify-center font-serif text-3xl font-bold text-[#E8B577] shrink-0 shadow-inner">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                    {currentUser.name}
                  </h3>
                  <p className="text-xs font-mono text-[#E8B577]">
                    NIM: {currentUser.nim || "-"}
                  </p>
                  <p className="text-[11px] text-white/80">
                    {faculty?.name || "Telkom University"}
                    {studyProgramName ? ` • ${studyProgramName}` : ""}
                  </p>
                </div>
              </div>

              <div className="w-20 h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 self-start sm:self-center shadow-md">
                <QrCode className="w-full h-full text-brand-darkWine" strokeWidth={1.7} />
              </div>
            </div>

            {/* Footer Row */}
            <div className="pt-4 border-t border-[#E8B577]/25 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#E8B577]/90 block">
                  Nomor Induk Anggota (NIA)
                </span>
                <strong className="font-mono text-xs sm:text-sm tracking-wider text-white">
                  {ktaNumber}
                </strong>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#E8B577]/90 block">
                  Status Keanggotaan
                </span>
                <span className="inline-flex items-center gap-1 font-medium text-emerald-300 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Terverifikasi Aktif (2026–2027)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start gap-2.5 text-[11px] text-neutral-dark">
          <Award className="w-4 h-4 text-[#AF7D66] shrink-0 mt-0.5" />
          <span>
            Gunakan e-KTA ini sebagai identitas resmi kader saat menghadiri Musyawarah Cabang, Diklat, atau kegiatan jejaring BPC/BPD HIPMI.
          </span>
        </div>
      </div>
    </EditorialModal>
  );
}
