"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Users, HeartHandshake, Compass } from "lucide-react";
import Link from "next/link";

interface LogoShard {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
  description: string;
  asset: string;
  accentColor: string;
  tag: string;
}

const LOGO_SHARDS: LogoShard[] = [
  {
    id: "shard-1",
    name: "Bintang Nilai & Dampak",
    symbol: "Bintang",
    meaning: "Nilai luhur dan dampak nyata bagi mahasiswa serta almamater",
    description:
      "Melambangkan cita-cita tinggi mahasiswa wirausaha Telkom University untuk terus menciptakan terobosan yang berdampak nyata, berintegritas, dan menjunjung nilai etika bisnis.",
    asset: "/assets/assets_pecahan_logo/01_bintang_nilai_dan_dampak.png",
    accentColor: "from-amber-400 to-amber-600",
    tag: "IMPACT & EXCELLENCE",
  },
  {
    id: "shard-2",
    name: "Siluet Arah Pertumbuhan",
    symbol: "Siluet Arah Emas",
    meaning: "Akselerasi kapasitas, progresivitas, dan pertumbuhan berkelanjutan",
    description:
      "Arah lengkung ke atas melambangkan akselerasi bisnis kader dan peningkatan kapasitas kepemimpinan wirausaha muda menuju masa depan ekonomi digital.",
    asset: "/assets/assets_pecahan_logo/02_siluet_arah_pertumbuhan_emas.png",
    accentColor: "from-gold-400 to-gold-600",
    tag: "GROWTH & PROGRESS",
  },
  {
    id: "shard-3",
    name: "Alur Dinamis Kolaborasi",
    symbol: "Alur Dinamis Merah",
    meaning: "Sinergi aktif antarbidang, jejaring alumni, dan mitra strategis",
    description:
      "Garis merah yang dinamis mencerminkan semangat kolaborasi tanpa sekat antaranggota, kompartemen, universitas, hingga pelaku industri skala nasional.",
    asset: "/assets/assets_pecahan_logo/03_alur_dinamis_kolaborasi_merah.png",
    accentColor: "from-rose-500 to-brand-burgundy",
    tag: "DYNAMIC COLLABORATION",
  },
  {
    id: "shard-4",
    name: "Lengkung Penopang",
    symbol: "Lengkung Emas",
    meaning: "Keberlanjutan tata kelola dan akuntabilitas organisasi",
    description:
      "Menopang seluruh gerak kabinet dengan administrasi yang rapi, transparansi keuangan, serta komitmen menjaga kesinambungan antarperiode kepengurusan.",
    asset: "/assets/assets_pecahan_logo/04_lengkung_penopang_keberlanjutan_emas.png",
    accentColor: "from-gold-300 to-gold-500",
    tag: "SUSTAINABILITY & GOVERNANCE",
  },
  {
    id: "shard-5",
    name: "Lengkung Fondasi Ekosistem",
    symbol: "Lengkung Burgundy",
    meaning: "Pondasi ekosistem inkubasi kewirausahaan kampus yang kokoh",
    description:
      "Merupakan basis kokoh di mana seluruh kader berakar: ruang bertumbuh yang inklusif, membina mahasiswa dari ide awal hingga mandiri secara bisnis.",
    asset: "/assets/assets_pecahan_logo/05_lengkung_fondasi_ekosistem_burgundy.png",
    accentColor: "from-brand-burgundy to-brand-dark-wine",
    tag: "FOUNDATION & ECOSYSTEM",
  },
];

export const LogoPhilosophySection: React.FC = () => {
  const [activeShardId, setActiveShardId] = useState(LOGO_SHARDS[0].id);

  const activeShard =
    LOGO_SHARDS.find((s) => s.id === activeShardId) || LOGO_SHARDS[0];

  return (
    <section className="py-20 md:py-28 bg-surface-warm-white relative overflow-hidden border-b border-wine-950/10">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-burgundy/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100/70 border border-gold-300/80 text-brand-burgundy text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Filosofi Lambang ARTHAKARSA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-black tracking-tight">
            Lima Elemen Penopang <span className="text-brand-burgundy italic">Visi</span>
          </h2>
          <p className="font-ui text-sm sm:text-base text-neutral-muted leading-relaxed">
            Setiap lengkung dan garis lambang ARTHAKARSA merepresentasikan nilai luhur serta komitmen kami dalam menggerakkan ekosistem wirausaha muda.
          </p>
        </div>

        {/* Shard Selector Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10 max-w-4xl mx-auto">
          {LOGO_SHARDS.map((shard) => {
            const isActive = shard.id === activeShardId;
            return (
              <button
                key={shard.id}
                onClick={() => setActiveShardId(shard.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full font-ui text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-brand-burgundy text-white shadow-[0_6px_20px_rgba(90,23,34,0.25)] scale-105"
                    : "bg-white/80 hover:bg-white text-neutral-dark border border-brand-burgundy/15 hover:border-gold-400"
                }`}
              >
                <div className="w-5 h-5 relative flex-shrink-0">
                  <Image
                    src={shard.asset}
                    alt={shard.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{shard.symbol}</span>
              </button>
            );
          })}
        </div>

        {/* Active Shard Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeShard.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 0.8, 0.3, 1] }}
              className="p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border border-brand-burgundy/15 shadow-[0_12px_40px_rgba(61,15,22,0.06)] relative overflow-hidden"
            >
              {/* Subtle accent bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Visual Shard Asset */}
                <div className="md:col-span-5 flex items-center justify-center">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 p-6 rounded-2xl bg-surface-ivory/80 border border-gold-300/40 flex items-center justify-center shadow-inner group">
                    <div className="absolute inset-0 bg-gold-400/10 rounded-2xl blur-xl" />
                    <div className="relative w-full h-full filter drop-shadow-[0_10px_20px_rgba(61,15,22,0.15)] transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={activeShard.asset}
                        alt={activeShard.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="md:col-span-7 space-y-4 text-center md:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-ui text-[11px] font-bold tracking-wider">
                    {activeShard.tag}
                  </span>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-black tracking-tight">
                    {activeShard.name}
                  </h3>

                  <p className="font-ui text-sm font-semibold text-brand-burgundy">
                    &ldquo;{activeShard.meaning}&rdquo;
                  </p>

                  <p className="font-ui text-xs sm:text-sm text-neutral-muted leading-relaxed font-normal">
                    {activeShard.description}
                  </p>

                  <div className="pt-4 border-t border-brand-burgundy/10 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <Link
                      href="/tentang-kami"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-burgundy hover:text-wine-950 transition-colors group"
                    >
                      <span>Pelajari Profil & Visi Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
