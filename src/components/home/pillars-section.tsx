"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, ShieldCheck, Sparkles, ChevronRight, ExternalLink } from "lucide-react";
import { useMockStore } from "@/lib/mock/store";

export const PillarsSection: React.FC = () => {
  const { store } = useMockStore();
  const [selectedFieldCode, setSelectedFieldCode] = useState<string>("B-01");

  const assetMap: Record<string, string> = {
    "B-01": "/assets/asset_bidang/01-bidang-okk.png",
    "B-02": "/assets/asset_bidang/04-bidang-ekraf.png",
    "B-03": "/assets/asset_bidang/02-bidang-eksternal.png",
    "B-04": "/assets/asset_bidang/03-bidang-medkominfo.png",
  };

  const fields = store.fields;
  const activeField = fields.find((f) => f.code === selectedFieldCode) || fields[0];
  const activeCompartments = store.compartments.filter((c) => c.field_id === activeField.id);
  const activeAsset = assetMap[activeField.code] || "/assets/asset_bidang/01-bidang-okk.png";

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#FCF8F6] to-[#F8EFF1] text-wine-950 relative overflow-hidden border-b border-wine-950/10">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5 text-gold-600" />
            <span>Pilar Operasional Organisasi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-wine-950 tracking-tight">
            4 Pilar Bidang Utama <span className="text-brand-burgundy italic">ARTHAKARSA</span>
          </h2>
          <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-2xl mx-auto leading-relaxed">
            Menjalankan fungsi kaderisasi, pengembangan bisnis, hubungan eksternal, dan orkestrasi media informasi di lingkungan Universitas Telkom.
          </p>
        </div>

        {/* INTERACTIVE STAGE / BENTO DISPLAY (Anti-Boring Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Field Selectors */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3">
            {fields.map((field) => {
              const isSelected = field.code === activeField.code;
              const fieldIcon = assetMap[field.code] || "/assets/asset_bidang/01-bidang-okk.png";

              return (
                <button
                  key={field.id}
                  type="button"
                  onClick={() => setSelectedFieldCode(field.code)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:outline-none ${
                    isSelected
                      ? "bg-white border-2 border-gold-400 shadow-lg scale-102"
                      : "bg-surface-ivory/80 border-gold-300/40 hover:bg-white hover:border-gold-400/80 shadow-sm"
                  }`}
                >
                  {/* Left indicator bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-burgundy" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-surface-ivory p-1.5 border border-gold-300/60 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <Image
                        src={fieldIcon}
                        alt={field.name}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-gold-100 text-brand-burgundy">
                          {field.code}
                        </span>
                        <span className="text-[11px] text-neutral-dark truncate font-medium">
                          {field.leader_name}
                        </span>
                      </div>
                      <span className="font-serif font-bold text-sm sm:text-base text-wine-950 truncate mt-0.5 group-hover:text-brand-burgundy transition-colors block">
                        {field.name.replace(/Bidang \d+: /, "")}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-brand-burgundy translate-x-1"
                        : "text-neutral-light group-hover:text-brand-burgundy"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Card with 3D Illustration & Depth */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeField.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 0.8, 0.3, 1] }}
                className="h-full rounded-3xl bg-white border-2 border-gold-400/60 shadow-xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Top Ambient Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-6">
                  {/* Top Bar inside stage */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wine-950/10 pb-5">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-gold-100 text-brand-burgundy border border-gold-300 font-mono text-xs font-bold uppercase tracking-wider">
                        {activeField.code} • PILAR UTAMA
                      </span>
                      <span className="text-xs font-ui text-neutral-dark font-medium">
                        Kepala Bidang: <strong className="text-wine-950">{activeField.leader_name}</strong>
                      </span>
                    </div>

                    <span className="text-xs font-mono text-gold-700 font-semibold">
                      ARTHAKARSA LEADERSHIP
                    </span>
                  </div>

                  {/* Main Showcase Body: 3D Asset & Description */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 flex justify-center">
                      <div className="relative w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 filter drop-shadow-[0_16px_32px_rgba(90,23,34,0.22)] group-hover:scale-105 transition-transform duration-500">
                        <Image
                          src={activeAsset}
                          alt={activeField.name}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      <div>
                        <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-wine-950 leading-tight">
                          {activeField.name}
                        </h3>
                        <p className="font-ui text-xs sm:text-sm text-neutral-dark leading-relaxed mt-2">
                          {activeField.description}
                        </p>
                      </div>

                      {/* Kompartemen Units under this Bidang */}
                      <div className="pt-3 border-t border-wine-950/10 space-y-2.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-wine-900 font-bold block">
                          Unit Kompartemen Pelaksana ({activeCompartments.length}):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeCompartments.map((comp) => (
                            <Link
                              key={comp.id}
                              href={`/organisasi/kompartemen/${comp.id}`}
                              className="p-2.5 rounded-xl bg-surface-ivory hover:bg-gold-50 border border-gold-300/60 hover:border-gold-400 transition-all flex items-center justify-between text-xs group/comp"
                            >
                              <div className="truncate pr-1">
                                <span className="font-mono text-[11px] font-bold text-gold-800 mr-1.5">
                                  {comp.code}
                                </span>
                                <span className="font-semibold text-wine-950 group-hover/comp:text-brand-burgundy">
                                  {comp.name.replace("Kompartemen ", "")}
                                </span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-light group-hover/comp:text-brand-burgundy shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row inside stage */}
                <div className="pt-6 mt-6 border-t border-wine-950/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/organisasi/program-kerja?field=${activeField.id}`}
                    className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5 transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Lihat Rincian Program Kerja Bidang</span>
                  </Link>

                  <Link
                    href={`/organisasi/bidang/${activeField.id}`}
                    className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Buka Lembar Kerja Bidang</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
