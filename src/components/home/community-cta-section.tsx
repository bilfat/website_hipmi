"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareText, Handshake, ArrowRight, ShieldCheck, Sparkles, Search } from "lucide-react";

export const CommunityCtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-ivory/50 border-b border-wine-950/10 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-burgundy/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100/70 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Layanan Publik & Kolaborasi</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-black tracking-tight">
            Terhubung & <span className="text-brand-burgundy italic">Berkolaborasi</span>
          </h2>
          <p className="font-ui text-xs sm:text-sm text-neutral-muted leading-relaxed">
            Sampaikan gagasan untuk kemajuan organisasi atau ajukan kerja sama publikasi dan kemitraan strategis bersama HIPMI PT Telkom University.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Kotak Suara */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-burgundy/15 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-burgundy/40 to-transparent" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
                <MessageSquareText className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-burgundy uppercase">
                  Saluran Aspirasi Terbuka
                </span>
                <h3 className="font-display text-2xl font-bold text-neutral-black mt-1">
                  Kotak Suara Mahasiswa
                </h3>
              </div>

              <p className="font-ui text-xs sm:text-sm text-neutral-muted leading-relaxed text-pretty">
                Punya kritik, masukan, atau ide program kerja untuk Kabinet ARTHAKARSA? Kirim aspirasi Anda secara aman dan pantau status tindak lanjutnya melalui kode tiket unik.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-brand-burgundy/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/kotak-suara"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-wine-950 text-white font-ui text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
              >
                <span>Kirim Aspirasi</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/kotak-suara?tab=track"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-muted hover:text-brand-burgundy transition-colors focus-visible:underline focus-visible:outline-none"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Lacak Status Tiket</span>
              </Link>
            </div>
          </div>

          {/* Card 2: Media Partner & Kerjasama */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-brand-burgundy/15 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-800 flex items-center justify-center">
                <Handshake className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-brand-burgundy uppercase">
                  Sinergi Ekosistem
                </span>
                <h3 className="font-display text-2xl font-bold text-neutral-black mt-1">
                  Pengajuan Media Partner
                </h3>
              </div>

              <p className="font-ui text-xs sm:text-sm text-neutral-muted leading-relaxed text-pretty">
                Ajukan publikasi acara, kolaborasi konten, atau sponsorship bersama kanal media resmi HIPMI PT Telkom University tanpa birokrasi berbelit.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-brand-burgundy/10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/aktivitas/media-partner/ajukan"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-wine-950 font-ui text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-burgundy focus-visible:outline-none"
              >
                <span>Ajukan Kemitraan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/aktivitas/media-partner/cek-status"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-muted hover:text-gold-700 transition-colors focus-visible:underline focus-visible:outline-none"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cek Status Pengajuan</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
