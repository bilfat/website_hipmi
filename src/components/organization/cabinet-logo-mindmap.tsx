"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LogoShardItem {
  id: string;
  name: string;
  category: "left" | "right";
  description: string;
  asset: string;
  accent: string;
  tag: string;
  fullPhilosophy: string;
}

const SHARD_ITEMS: LogoShardItem[] = [
  // SISI KIRI (3 Elemen)
  {
    id: "api",
    name: "Api",
    category: "left",
    description: "Semangat, keberanian, dan dorongan untuk bertindak.",
    asset: "/assets/assets_pecahan_logo/03_alur_dinamis_kolaborasi_merah.png",
    accent: "from-rose-500 to-brand-burgundy",
    tag: "SPIRIT & COURAGE",
    fullPhilosophy:
      "Melambangkan kobaran semangat pantang menyerah, keberanian mengambil risiko terukur, dan energi progresif mahasiswa wirausaha Telkom University dalam melahirkan inovasi bernilai tambah.",
  },
  {
    id: "daun",
    name: "Daun",
    category: "left",
    description: "Pertumbuhan, keberlanjutan, dan kontribusi yang berdampak.",
    asset: "/assets/assets_pecahan_logo/04_lengkung_penopang_keberlanjutan_emas.png",
    accent: "from-emerald-600 to-gold-500",
    tag: "GROWTH & SUSTAINABILITY",
    fullPhilosophy:
      "Mencerminkan pertumbuhan bisnis yang organik dan berkesinambungan. Menjaga keseimbangan antara profitabilitas usaha, kelestarian lingkungan, serta kontribusi sosial yang nyata bagi almamater dan masyarakat.",
  },
  {
    id: "gelombang",
    name: "Gelombang",
    category: "left",
    description: "Pergerakan, kolaborasi, dan dinamika organisasi.",
    asset: "/assets/assets_pecahan_logo/04_lengkung_penopang_keberlanjutan_emas.png",
    accent: "from-gold-400 to-brand-burgundy",
    tag: "DYNAMICS & SYNERGY",
    fullPhilosophy:
      "Irama gerak organisasi yang lincah dan adaptif terhadap arus disrupsi. Menghubungkan seluruh kompartemen, bidang, alumni, dan pemangku kepentingan dalam satu frekuensi kolaborasi tanpa sekat.",
  },

  // SISI KANAN (3 Elemen)
  {
    id: "sayap",
    name: "Sayap",
    category: "right",
    description: "Inovasi, perluasan peluang, dan keberanian melampaui batas.",
    asset: "/assets/assets_pecahan_logo/02_siluet_arah_pertumbuhan_emas.png",
    accent: "from-gold-300 to-gold-600",
    tag: "INNOVATION & VISION",
    fullPhilosophy:
      "Membentangkan sayap eksplorasi wirausaha muda untuk menembus pasar nasional hingga global. Daya cipta inovasi yang bebas membubung tinggi dengan visi visioner ke masa depan ekonomi digital.",
  },
  {
    id: "pilar",
    name: "Pilar",
    category: "right",
    description: "Fondasi yang kuat, integritas, dan konsistensi dalam berkarya.",
    asset: "/assets/assets_pecahan_logo/05_lengkung_fondasi_ekosistem_burgundy.png",
    accent: "from-brand-burgundy to-brand-darkWine",
    tag: "FOUNDATION & INTEGRITY",
    fullPhilosophy:
      "Tiang penyangga organisasi yang kokoh berasaskan tata kelola transparan, akuntabilitas birokrasi, kepatuhan legalitas, dan etika kepemimpinan yang berintegritas tinggi.",
  },
  {
    id: "bintang",
    name: "Bintang",
    category: "right",
    description: "Cita-cita, keunggulan, dan dampak nyata bagi lingkungan sekitar.",
    asset: "/assets/assets_pecahan_logo/01_bintang_nilai_dan_dampak.png",
    accent: "from-amber-400 to-gold-500",
    tag: "EXCELLENCE & IMPACT",
    fullPhilosophy:
      "Titik pandu keunggulan moral dan prestasi kader. Menjadi teladan yang menerangi ekosistem kewirausahaan kampus serta menorehkan jejak kemanfaatan nyata yang abadi.",
  },
];

export const CabinetLogoMindmap: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const leftShards = SHARD_ITEMS.filter((s) => s.category === "left");
  const rightShards = SHARD_ITEMS.filter((s) => s.category === "right");

  const activeShard = SHARD_ITEMS.find((s) => s.id === (selectedId || hoveredId));

  return (
    <section className="relative w-full py-12 sm:py-16 overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFF9F7] via-[#FCF4F2] to-[#FAF0EE] border-2 border-gold-400/50 shadow-xl p-4 sm:p-8 lg:p-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-gold-300/15 via-rose-300/10 to-brand-burgundy/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-brand-burgundy/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 relative z-20">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
          Makna Pecahan Lambang <span className="text-brand-burgundy italic">ARTHAKARSA</span>
        </h2>
        <p className="font-ui text-xs sm:text-sm text-neutral-muted max-w-2xl mx-auto leading-relaxed">
          Setiap lengkung, siluet, dan alur lambang merupakan kesatuan nilai terpadu yang memandu gerak kepemimpinan Kabinet HIPMI PT Universitas Telkom.
        </p>
      </div>

      {/* DESKTOP MINDMAP VIEW (lg and above >= 1024px) */}
      <div className="hidden lg:block relative w-full max-w-6xl mx-auto h-[480px]">
        {/* SVG Curved Connecting Lines & Nodes */}
        <svg
          viewBox="0 0 1000 480"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mindmap-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AF7D66" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#5A1722" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#E8B577" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* SISI KIRI: Line 1 (Api - Top Left) */}
          <path
            d="M 370 170 C 330 170 340 75 295 75"
            stroke={hoveredId === "api" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "api" ? "3" : "1.8"}
            strokeDasharray={hoveredId === "api" ? "none" : "none"}
            className="transition-all duration-300"
          />
          <circle cx="370" cy="170" r="4.5" fill="#AF7D66" />
          <circle cx="295" cy="75" r="4.5" fill="#5A1722" />

          {/* SISI KIRI: Line 2 (Daun - Mid Left) */}
          <path
            d="M 355 240 L 295 240"
            stroke={hoveredId === "daun" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "daun" ? "3" : "1.8"}
            className="transition-all duration-300"
          />
          <circle cx="355" cy="240" r="4.5" fill="#AF7D66" />
          <circle cx="295" cy="240" r="4.5" fill="#5A1722" />

          {/* SISI KIRI: Line 3 (Gelombang - Bottom Left) */}
          <path
            d="M 370 310 C 330 310 340 405 295 405"
            stroke={hoveredId === "gelombang" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "gelombang" ? "3" : "1.8"}
            className="transition-all duration-300"
          />
          <circle cx="370" cy="310" r="4.5" fill="#AF7D66" />
          <circle cx="295" cy="405" r="4.5" fill="#5A1722" />

          {/* SISI KANAN: Line 4 (Sayap - Top Right) */}
          <path
            d="M 630 170 C 670 170 660 75 705 75"
            stroke={hoveredId === "sayap" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "sayap" ? "3" : "1.8"}
            className="transition-all duration-300"
          />
          <circle cx="630" cy="170" r="4.5" fill="#AF7D66" />
          <circle cx="705" cy="75" r="4.5" fill="#5A1722" />

          {/* SISI KANAN: Line 5 (Pilar - Mid Right) */}
          <path
            d="M 645 240 L 705 240"
            stroke={hoveredId === "pilar" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "pilar" ? "3" : "1.8"}
            className="transition-all duration-300"
          />
          <circle cx="645" cy="240" r="4.5" fill="#AF7D66" />
          <circle cx="705" cy="240" r="4.5" fill="#5A1722" />

          {/* SISI KANAN: Line 6 (Bintang - Bottom Right) */}
          <path
            d="M 630 310 C 670 310 660 405 705 405"
            stroke={hoveredId === "bintang" ? "#5A1722" : "url(#mindmap-line-grad)"}
            strokeWidth={hoveredId === "bintang" ? "3" : "1.8"}
            className="transition-all duration-300"
          />
          <circle cx="630" cy="310" r="4.5" fill="#AF7D66" />
          <circle cx="705" cy="405" r="4.5" fill="#5A1722" />
        </svg>

        {/* LEFT COLUMN: 3 Shard Cards */}
        <div className="absolute left-0 top-0 bottom-0 w-[295px] flex flex-col justify-between z-20 py-2">
          {leftShards.map((shard) => {
            const isHovered = hoveredId === shard.id;
            const isSelected = selectedId === shard.id;

            return (
              <motion.div
                key={shard.id}
                onMouseEnter={() => setHoveredId(shard.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(selectedId === shard.id ? null : shard.id)}
                whileHover={{ scale: 1.03, x: -4 }}
                className={`p-3.5 pr-4 rounded-full bg-white/90 backdrop-blur-md border transition-all duration-300 cursor-pointer flex items-center gap-3.5 relative group ${
                  isHovered || isSelected
                    ? "border-brand-burgundy shadow-[0_12px_28px_rgba(90,23,34,0.16)] bg-white ring-2 ring-brand-burgundy/15"
                    : "border-gold-300/40 hover:border-gold-400 shadow-[0_6px_20px_rgba(61,15,22,0.06)]"
                }`}
              >
                {/* Visual Icon */}
                <div className="w-12 h-12 relative flex-shrink-0 p-1.5 rounded-full bg-surface-ivory/90 border border-gold-300/40 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(90,23,34,0.12)] group-hover:scale-105 transition-transform">
                  <Image
                    src={shard.asset}
                    alt={shard.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-display font-bold text-sm sm:text-base text-neutral-black group-hover:text-brand-burgundy transition-colors leading-tight">
                    {shard.name}
                  </h4>
                  <p className="font-ui text-[11px] text-neutral-muted line-clamp-2 mt-0.5 leading-snug">
                    {shard.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CENTER NODE: Master ARTHAKARSA Emblem wrapped in static positioning div to prevent transform override */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <motion.div
            className="w-64 h-64 rounded-full bg-gradient-to-b from-white via-[#FCF8F6] to-[#F8EFF1] border-2 border-gold-300/70 shadow-[0_18px_45px_rgba(90,23,34,0.14)] p-4 flex flex-col items-center justify-center text-center group cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
          >
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border border-gold-400/30 pointer-events-none" />

            {/* Master Logo Image */}
            <div className="relative w-24 h-24 filter drop-shadow-[0_8px_18px_rgba(90,23,34,0.22)] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                alt="Logo Master ARTHAKARSA"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Emblem Typography */}
            <div className="mt-2 space-y-0.5">
              <span className="block font-serif font-extrabold text-base tracking-wide text-brand-burgundy uppercase">
                ARTHAKARSA
              </span>
              <span className="block font-ui text-[10px] tracking-[0.2em] font-semibold text-wine-950/70 uppercase">
                — KABINET HIPMI —
              </span>
              <span className="inline-block font-mono text-[9px] text-gold-700/80 font-semibold tracking-wider">
                2026 / 2027
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3 Shard Cards */}
        <div className="absolute right-0 top-0 bottom-0 w-[295px] flex flex-col justify-between z-20 py-2">
          {rightShards.map((shard) => {
            const isHovered = hoveredId === shard.id;
            const isSelected = selectedId === shard.id;

            return (
              <motion.div
                key={shard.id}
                onMouseEnter={() => setHoveredId(shard.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(selectedId === shard.id ? null : shard.id)}
                whileHover={{ scale: 1.03, x: 4 }}
                className={`p-3.5 pl-4 rounded-full bg-white/90 backdrop-blur-md border transition-all duration-300 cursor-pointer flex items-center gap-3.5 relative group ${
                  isHovered || isSelected
                    ? "border-brand-burgundy shadow-[0_12px_28px_rgba(90,23,34,0.16)] bg-white ring-2 ring-brand-burgundy/15"
                    : "border-gold-300/40 hover:border-gold-400 shadow-[0_6px_20px_rgba(61,15,22,0.06)]"
                }`}
              >
                {/* Visual Icon */}
                <div className="w-12 h-12 relative flex-shrink-0 p-1.5 rounded-full bg-surface-ivory/90 border border-gold-300/40 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(90,23,34,0.12)] group-hover:scale-105 transition-transform">
                  <Image
                    src={shard.asset}
                    alt={shard.name}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="font-display font-bold text-sm sm:text-base text-neutral-black group-hover:text-brand-burgundy transition-colors leading-tight">
                    {shard.name}
                  </h4>
                  <p className="font-ui text-[11px] text-neutral-muted line-clamp-2 mt-0.5 leading-snug">
                    {shard.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MOBILE / TABLET VIEW (< 1024px) */}
      <div className="block lg:hidden space-y-6 relative z-20">
        {/* Center Emblem in Mobile */}
        <div className="flex justify-center mb-6">
          <div className="w-56 h-56 rounded-full bg-gradient-to-b from-white via-[#FCF8F6] to-[#F8EFF1] border-2 border-gold-300/70 shadow-lg p-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-20 h-20 mb-2">
              <Image
                src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                alt="Logo Master ARTHAKARSA"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif font-extrabold text-sm tracking-wide text-brand-burgundy uppercase">
              ARTHAKARSA
            </span>
            <span className="font-ui text-[9px] tracking-[0.2em] font-semibold text-wine-950/70 uppercase">
              — KABINET HIPMI —
            </span>
          </div>
        </div>

        {/* 6 Shards in Mobile Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SHARD_ITEMS.map((shard) => {
            const isSelected = selectedId === shard.id;
            return (
              <div
                key={shard.id}
                onClick={() => setSelectedId(isSelected ? null : shard.id)}
                className={`p-3.5 rounded-2xl bg-white/90 border transition-all flex items-center gap-3.5 shadow-sm cursor-pointer ${
                  isSelected
                    ? "border-brand-burgundy ring-2 ring-brand-burgundy/15 bg-white"
                    : "border-gold-300/40"
                }`}
              >
                <div className="w-12 h-12 relative flex-shrink-0 p-1.5 rounded-full bg-surface-ivory border border-gold-300/40 flex items-center justify-center">
                  <Image
                    src={shard.asset}
                    alt={shard.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-display font-bold text-sm text-neutral-black">
                    {shard.name}
                  </h4>
                  <p className="font-ui text-xs text-neutral-muted line-clamp-2 mt-0.5 leading-snug">
                    {shard.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE EXPANDED PHILOSOPHY DRAWER */}
      <AnimatePresence>
        {activeShard && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white/95 border border-gold-400/50 shadow-md relative z-30 max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4"
          >
            <div className="w-14 h-14 relative flex-shrink-0 p-1.5 rounded-xl bg-gold-50 border border-gold-300 flex items-center justify-center shadow-inner">
              <Image
                src={activeShard.asset}
                alt={activeShard.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy px-2 py-0.5 rounded bg-gold-100 border border-gold-300">
                  {activeShard.tag}
                </span>
                <span className="font-display font-bold text-base text-neutral-black">
                  Filosofi Bagian: {activeShard.name}
                </span>
              </div>
              <p className="font-ui text-xs sm:text-sm text-neutral-dark leading-relaxed pt-1">
                {activeShard.fullPhilosophy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
