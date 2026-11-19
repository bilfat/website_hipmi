"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Sparkles, Calendar, Layers } from "lucide-react";
import Link from "next/link";
import { Cabinet } from "@/types/domain";

interface CabinetHeaderHeroProps {
  cabinet: Cabinet;
}

export const CabinetHeaderHero: React.FC<CabinetHeaderHeroProps> = ({ cabinet }) => {
  return (
    <section className="relative w-full pt-4 pb-8 select-none">
      {/* Central Identity: Logo on Top, Name of Cabinet Below */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6">
        
        {/* Periode Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100/80 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Kabinet Aktif • {cabinet.period_start.slice(0, 4)} / {cabinet.period_end.slice(0, 4)}</span>
        </motion.div>

        {/* 1. LOGO KABINET DI TENGAH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 0.8, 0.3, 1] }}
          className="relative group cursor-pointer"
        >
          <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-gradient-to-b from-white via-[#FCF8F6] to-[#F8EFF1] border-2 border-gold-400/60 shadow-[0_16px_40px_rgba(90,23,34,0.14)] p-5 flex items-center justify-center relative">
            <div className="absolute inset-2 rounded-full border border-gold-400/25 pointer-events-none" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 filter drop-shadow-[0_8px_20px_rgba(90,23,34,0.22)] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                alt="Logo Kabinet ARTHAKARSA"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* 2. NAMA KABINET DI BAWAH LOGO */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.8, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-wine-950 tracking-tight">
            KABINET <span className="text-brand-burgundy uppercase">ARTHAKARSA</span>
          </h1>
          <p className="font-ui text-sm sm:text-base text-neutral-dark font-medium max-w-2xl mx-auto leading-relaxed">
            HIPMI Perguruan Tinggi Universitas Telkom Masa Bakti 2026–2027
          </p>
          <div className="max-w-2xl mx-auto pt-1">
            <p className="font-ui text-xs sm:text-sm text-brand-burgundy italic bg-gold-50/70 border border-gold-300/60 rounded-2xl p-3.5 sm:p-4 shadow-sm leading-relaxed">
              &ldquo;{cabinet.philosophy}&rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Visi & 4 Misi Strategis Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 0.8, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-10 max-w-6xl mx-auto"
      >
        {/* Visi Strategis Card */}
        <div className="p-6 rounded-3xl bg-white border border-gold-400/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-burgundy font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4 text-brand-burgundy" />
              <span>Visi Strategis</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-wine-950 leading-snug">
              Episentrum Pengusaha Muda Berdaya Saing Global
            </h3>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark leading-relaxed font-normal">
              {cabinet.vision}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-between text-xs text-gold-700 font-mono font-semibold">
            <span>ARTHAKARSA EXCELLENCE</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4 Misi Inti Card */}
        <div className="p-6 rounded-3xl bg-white border border-gold-400/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-brand-burgundy to-transparent" />
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-burgundy font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <span>4 Misi Inti Organisasi</span>
            </div>
            <ul className="font-ui text-xs sm:text-sm text-neutral-dark space-y-2">
              {cabinet.mission.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-gold-100 border border-gold-300 text-brand-burgundy font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 mt-4 border-t border-wine-950/10 flex items-center justify-between text-xs text-brand-burgundy font-semibold">
            <Link
              href="/organisasi/program-kerja"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Katalog Lengkap Program Kerja</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
