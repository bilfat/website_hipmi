"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Network,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Rocket
} from "lucide-react";

export const BenefitSection: React.FC = () => {
  const benefits = [
    {
      id: "b-01",
      number: "01",
      title: "Dibimbing Menjadi Pengusaha Bisnis",
      tag: "MENTORING & KURIKULUM PRAKTIKAL",
      icon: GraduationCap,
      accentColor: "from-brand-burgundy to-wine-950",
      description:
        "Didampingi langsung 1-on-1 oleh praktisi bisnis dan CEO alumni HIPMI. Anda belajar langsung dari pengalaman riil di lapangan, mulai dari validasi ide produk, strategi harga, hingga pengelolaan arus kas.",
      points: [
        "Kurikulum terstruktur dari ide dasar hingga produk siap jual (MVP)",
        "Mentoring privat bersama pengusaha beromzet ratusan juta",
        "Bedah studi kasus nyata dan mitigasi risiko kegagalan bisnis",
      ],
    },
    {
      id: "b-02",
      number: "02",
      title: "Mendapatkan Relasi Bisnis Tanpa Batas",
      tag: "JEJARING NASIONAL & FORUM INVESTOR",
      icon: Network,
      accentColor: "from-gold-600 to-amber-700",
      description:
        "Pintu gerbang emas menuju ekosistem wirausaha terbesar di Indonesia. Bangun konektivitas dengan ribuan pengusaha muda di BPC Kab. Bandung, BPD Jabar, hingga BPP HIPMI se-Indonesia.",
      points: [
        "Akses eksklusif forum Business Matching & temu investor",
        "Sinergi rantai pasok (supply chain) antar sesama bisnis kader",
        "Jejaring persaudaraan pengusaha di 34 provinsi seluruh Indonesia",
      ],
    },
    {
      id: "b-03",
      number: "03",
      title: "Mengembangkan & Mengakselerasi Bisnis",
      tag: "SCALING UP & FASILITASI LEGALITAS",
      icon: TrendingUp,
      accentColor: "from-emerald-700 to-teal-900",
      description:
        "Tingkatkan omzet dan skala pasar bisnis Anda ke tingkat berikutnya. HIPMI menyediakan etalase digital, panggung pameran (expo), pendampingan legalitas izin usaha, dan akses permodalan.",
      points: [
        "Etalase prioritas produk di platform digital HIPMI CENTRAL",
        "Pendampingan perizinan berusaha resmi (NIB, HAKI, dan sertifikasi)",
        "Panggung expo tahunan dan fasilitasi akses permodalan ventura",
      ],
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#FCF8F6] via-[#FAF3F0] to-[#FFFFFF] overflow-hidden border-b border-wine-950/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-gold-300/15 via-rose-300/10 to-brand-burgundy/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-wine-950/10 pb-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100/90 text-brand-burgundy text-xs font-semibold uppercase tracking-wider border border-gold-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Nilai Tambah &amp; Keuntungan Kader</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wine-950 tracking-tight leading-tight">
              3 Keuntungan Utama <br className="hidden sm:inline" />
              <span className="text-brand-burgundy italic">Bergabung dengan HIPMI</span>
            </h2>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark leading-relaxed font-normal">
              Kami tidak sekadar berhimpun, melainkan menjadi inkubator dan akselerator terpadu yang memastikan setiap mahasiswa wirausaha memiliki fondasi kokoh untuk bertumbuh.
            </p>
          </div>

          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all shrink-0 self-start md:self-end focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none"
          >
            <span>Daftar Menjadi Kader</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Asymmetrical Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Subtle Gradient Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${item.accentColor}`}
                />

                <div className="space-y-5">
                  {/* Card Header: Icon & Big Ordinal Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-surface-ivory border border-gold-400/50 flex items-center justify-center text-brand-burgundy group-hover:scale-110 transition-transform shadow-inner">
                      <IconComp className="w-7 h-7 text-brand-burgundy" />
                    </div>
                    <span className="font-serif font-black text-3xl sm:text-4xl text-gold-600/80 group-hover:text-brand-burgundy transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-gold-700 uppercase px-2.5 py-0.5 rounded bg-gold-50 border border-gold-300 inline-block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-ui text-xs sm:text-sm text-neutral-dark leading-relaxed">
                    {item.description}
                  </p>

                  {/* Checklist Highlights */}
                  <div className="pt-4 border-t border-wine-950/10 space-y-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-wine-900 font-bold block">
                      Program &amp; Fasilitas:
                    </span>
                    <ul className="space-y-2">
                      {item.points.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-xs font-ui text-neutral-dark flex items-start gap-2.5 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-6 mt-6 border-t border-wine-950/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-brand-burgundy">
                    HIPMI VALUE ACCELERATOR
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-brand-burgundy group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
