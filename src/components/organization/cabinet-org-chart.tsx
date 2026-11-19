"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Network,
  Crown,
  Shield,
  FileText,
  DollarSign,
  Layers,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Info,
  Maximize2
} from "lucide-react";
import { useMockStore } from "@/lib/mock/store";

interface NodeDetail {
  title: string;
  role: string;
  leader: string;
  code?: string;
  description: string;
  href?: string;
  type: "presidium" | "bph" | "bidang" | "kompartemen";
}

export const CabinetOrgChart: React.FC = () => {
  const { store } = useMockStore();
  const [activeFilter, setActiveFilter] = useState<string>("all"); // "all", "B-01", "B-02", "B-03", "B-04"
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);

  const fieldAssetMap: Record<string, string> = {
    "B-01": "/assets/asset_bidang/01-bidang-okk.png",
    "B-02": "/assets/asset_bidang/04-bidang-ekraf.png",
    "B-03": "/assets/asset_bidang/02-bidang-eksternal.png",
    "B-04": "/assets/asset_bidang/03-bidang-medkominfo.png",
  };

  const fields = store.fields;
  const compartments = store.compartments;

  return (
    <section className="relative w-full py-12 sm:py-16 select-none overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDFC] via-[#FCF7F4] to-[#FAF2EE] rounded-3xl border-2 border-gold-400/40 shadow-xl pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-wine-950/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/90 text-brand-burgundy text-xs font-semibold uppercase tracking-wider border border-gold-300 shadow-sm">
              <Network className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Hierarki Struktur Resmi</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
              Bagan Alur Struktural Kabinet
            </h2>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-2xl leading-relaxed">
              Arsitektur koordinasi komando dari Presidium, Kesekjenan, Kebendaharaan, hingga 4 Pilar Bidang dan 8 Kompartemen operasional.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-brand-burgundy text-white shadow-md"
                  : "bg-white text-wine-950 hover:bg-gold-50 border border-gold-300"
              }`}
            >
              Semua Pilar (Full Tree)
            </button>
            {fields.map((f) => (
              <button
                key={f.code}
                type="button"
                onClick={() => setActiveFilter(f.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f.code
                    ? "bg-brand-burgundy text-white shadow-md"
                    : "bg-white text-neutral-dark hover:bg-gold-50 border border-gold-300"
                }`}
              >
                {f.code}
              </button>
            ))}
          </div>
        </div>

        {/* Legend bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-neutral-dark bg-white/70 backdrop-blur-sm p-3.5 rounded-2xl border border-gold-300/50 gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-burgundy" />
              <span className="font-medium text-xs">Jalur Komando Presidium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold-400" />
              <span className="font-medium text-xs">Jalur Koordinasi &amp; Administrasi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
              <span className="font-medium text-xs">Unit Pelaksana Kompartemen</span>
            </div>
          </div>
          <span className="text-[11px] text-brand-burgundy italic font-medium hidden sm:inline">
            *Klik setiap kotak bagan untuk membuka rincian wewenang
          </span>
        </div>

        {/* ORGANIZATIONAL CHART CONTAINER */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] text-brand-burgundy font-medium sm:hidden px-1">
            <span>↔ Geser horizontal untuk menjelajahi bagan</span>
          </div>
          <div className="relative w-full overflow-x-auto pb-8 pt-4">
            <div className="min-w-[940px] flex flex-col items-center">
            
            {/* ========================================================
                TIER 1: PRESIDIUM (Ketua Umum & Wakil Ketua Umum)
               ======================================================== */}
            <div className="relative flex flex-col items-center">
              <div
                className="relative group cursor-pointer"
                onClick={() =>
                  setSelectedNode({
                    title: "Presidium Utama Mandataris Muscab",
                    role: "Ketua Umum & Wakil Ketua Umum",
                    leader: "Muhammad Fathur & Sarah Andini",
                    description:
                      "Pucuk pimpinan tertinggi yang memegang mandat kepemimpinan, perumus haluan strategis, dan pengarah keselarasan kerja seluruh elemen organisasi HIPMI PT Telkom University.",
                    type: "presidium",
                  })
                }
              >
                <div className="w-[420px] rounded-3xl bg-gradient-to-r from-brand-darkWine via-brand-burgundy to-wine-900 text-white p-5 shadow-[0_12px_32px_rgba(90,23,34,0.25)] border-2 border-gold-400 relative overflow-hidden group-hover:scale-102 transition-transform duration-300">
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-gold-400/20 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-500/30 text-gold-200 text-[10px] font-mono font-bold uppercase tracking-wider border border-gold-400/40">
                      <Crown className="w-3 h-3 text-gold-300" />
                      Presidium Utama
                    </span>
                    <span className="text-[11px] font-mono text-gold-200/90 font-semibold">
                      MANDATARIS 2026/2027
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-r border-white/15 pr-2">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-gold-300 font-semibold">
                        Ketua Umum
                      </p>
                      <h4 className="font-serif text-base font-bold text-white truncate">
                        Muhammad Fathur
                      </h4>
                      <p className="text-[10px] text-white/70">FEB • S1 Manajemen Bisnis</p>
                    </div>
                    <div className="pl-1">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-gold-300 font-semibold">
                        Wakil Ketua Umum
                      </p>
                      <h4 className="font-serif text-base font-bold text-white truncate">
                        Sarah Andini
                      </h4>
                      <p className="text-[10px] text-white/70">FRI • S1 Teknik Industri</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Connector Line 1: Tier 1 to Tier 2 */}
              <div className="w-0.5 h-12 bg-gradient-to-b from-brand-burgundy to-gold-400 relative my-0.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-gold-400 absolute left-1/2 -translate-x-1/2"
                  animate={{ y: [0, 44, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* ========================================================
                TIER 2: KESEKJENAN & KEBENDAHARAAN (BPH Inti)
               ======================================================== */}
            <div className="relative flex flex-col items-center w-full max-w-4xl">
              <div className="grid grid-cols-3 gap-6 w-full">
                
                {/* 2A: Sekretariat Jenderal */}
                <div
                  className="p-4 rounded-2xl bg-white border-2 border-gold-300/60 hover:border-brand-burgundy shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() =>
                    setSelectedNode({
                      title: "Sekretariat Jenderal",
                      role: "Sekretaris Jenderal",
                      leader: "Rizky Pratama",
                      description:
                        "Pengendali tata kelola birokrasi, regulasi internal, kepatuhan AD/ART, dan pengawas tertib administrasi seluruh kegiatan kepengurusan.",
                      type: "bph",
                    })
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy border border-gold-300">
                      BPH 01
                    </span>
                    <Shield className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-wine-950 group-hover:text-brand-burgundy transition-colors">
                    Rizky Pratama
                  </h4>
                  <p className="text-xs font-semibold text-brand-burgundy">Sekretaris Jenderal</p>
                  <p className="text-[10px] text-neutral-dark mt-1">FKB • S1 Administrasi Bisnis</p>
                </div>

                {/* 2B: Sekretariat Umum */}
                <div
                  className="p-4 rounded-2xl bg-white border-2 border-gold-300/60 hover:border-brand-burgundy shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() =>
                    setSelectedNode({
                      title: "Sekretariat Umum",
                      role: "Sekretaris Umum",
                      leader: "Nabila Azzahra",
                      description:
                        "Otoritas manajemen arsip legalitas, penomoran surat resmi kampus, notulensi rapat pleno, dan koordinasi birokrasi dengan Ditmawa Telkom University.",
                      type: "bph",
                    })
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy border border-gold-300">
                      BPH 02
                    </span>
                    <FileText className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-wine-950 group-hover:text-brand-burgundy transition-colors">
                    Nabila Azzahra
                  </h4>
                  <p className="text-xs font-semibold text-brand-burgundy">Sekretaris Umum</p>
                  <p className="text-[10px] text-neutral-dark mt-1">FKB • S1 Ilmu Komunikasi</p>
                </div>

                {/* 2C: Kebendaharaan Umum */}
                <div
                  className="p-4 rounded-2xl bg-white border-2 border-gold-300/60 hover:border-brand-burgundy shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() =>
                    setSelectedNode({
                      title: "Kebendaharaan Umum",
                      role: "Bendahara Umum",
                      leader: "Dimas Aditya",
                      description:
                        "Pengendali arus kas organisasi, perumus anggaran belanja kabinet, verifikator pencairan dana proker, dan penanggung jawab transparansi LPJ keuangan.",
                      type: "bph",
                    })
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy border border-gold-300">
                      BPH 03
                    </span>
                    <DollarSign className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-wine-950 group-hover:text-brand-burgundy transition-colors">
                    Dimas Aditya
                  </h4>
                  <p className="text-xs font-semibold text-brand-burgundy">Bendahara Umum</p>
                  <p className="text-[10px] text-neutral-dark mt-1">FEB • S1 Akuntansi</p>
                </div>

              </div>

              {/* Animated Connector Line 2: Bus Branching to 4 Fields */}
              <div className="relative w-full h-14 flex flex-col items-center">
                {/* Vertical drop from center */}
                <div className="w-0.5 h-6 bg-gradient-to-b from-gold-400 to-brand-burgundy" />
                {/* Horizontal Bar spanning across 4 branches */}
                <div className="w-[84%] h-0.5 bg-gradient-to-r from-gold-400 via-brand-burgundy to-gold-400 relative">
                  {/* Left 1 */}
                  <div className="absolute left-[8%] top-0 w-0.5 h-8 bg-brand-burgundy" />
                  {/* Left 2 */}
                  <div className="absolute left-[36%] top-0 w-0.5 h-8 bg-brand-burgundy" />
                  {/* Right 1 */}
                  <div className="absolute left-[64%] top-0 w-0.5 h-8 bg-brand-burgundy" />
                  {/* Right 2 */}
                  <div className="absolute left-[92%] top-0 w-0.5 h-8 bg-brand-burgundy" />
                </div>
              </div>
            </div>

            {/* ========================================================
                TIER 3 & 4: 4 PILAR BIDANG & 8 KOMPARTEMEN
               ======================================================== */}
            <div className="grid grid-cols-4 gap-5 w-full mt-2">
              {fields.map((field) => {
                const compList = compartments.filter((c) => c.field_id === field.id);
                const isFilteredOut = activeFilter !== "all" && activeFilter !== field.code;
                const iconSrc = fieldAssetMap[field.code] || "/assets/assets_logo/logo_hipmi.png";

                return (
                  <div
                    key={field.id}
                    className={`flex flex-col items-center space-y-4 transition-all duration-300 ${
                      isFilteredOut ? "opacity-30 pointer-events-none filter grayscale" : "opacity-100"
                    }`}
                  >
                    {/* TIER 3: Bidang Node Card */}
                    <div
                      className="w-full p-4 rounded-3xl bg-white border-2 border-gold-400/50 hover:border-gold-500 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between min-h-[175px] relative overflow-hidden"
                      onClick={() =>
                        setSelectedNode({
                          title: field.name,
                          role: "Kepala Bidang",
                          leader: field.leader_name,
                          code: field.code,
                          description: field.description,
                          href: `/organisasi/bidang/${field.id}`,
                          type: "bidang",
                        })
                      }
                    >
                      <div className="absolute top-0 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-brand-burgundy to-transparent" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-lg bg-gold-100 text-brand-burgundy border border-gold-300 font-mono text-[10px] font-bold">
                            {field.code}
                          </span>
                          <div className="w-10 h-10 relative rounded-xl bg-surface-ivory p-1 border border-gold-300/40 flex items-center justify-center shrink-0">
                            <Image
                              src={iconSrc}
                              alt={field.name}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug">
                            {field.name.replace(/Bidang \d+: /, "")}
                          </h4>
                          <p className="text-[11px] font-semibold text-brand-burgundy mt-1">
                            Ketua: {field.leader_name}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-wine-950/10 flex items-center justify-between text-[10px] text-neutral-dark font-medium">
                        <span>{compList.length} Kompartemen</span>
                        <ArrowRight className="w-3 h-3 text-gold-600 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Vertical Connector Line to Kompartemen */}
                    <div className="w-0.5 h-6 bg-gradient-to-b from-brand-burgundy to-gold-400" />

                    {/* TIER 4: Kompartemen Nodes under this Bidang */}
                    <div className="w-full space-y-2.5">
                      {compList.map((comp) => (
                        <div
                          key={comp.id}
                          className="p-3 rounded-2xl bg-surface-warm-white hover:bg-gold-50/80 border border-gold-400/40 hover:border-brand-burgundy shadow-sm hover:shadow-md transition-all cursor-pointer group"
                          onClick={() =>
                            setSelectedNode({
                              title: comp.name,
                              role: "Kepala Kompartemen",
                              leader: comp.leader_name,
                              code: comp.code,
                              description: comp.description,
                              href: `/organisasi/kompartemen/${comp.id}`,
                              type: "kompartemen",
                            })
                          }
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gold-200/80 text-wine-950 font-bold">
                              {comp.code}
                            </span>
                            <span className="text-[9px] text-brand-burgundy font-medium">
                              Kakom
                            </span>
                          </div>
                          <h5 className="font-serif text-xs font-bold text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug">
                            {comp.name.replace("Kompartemen ", "")}
                          </h5>
                          <p className="text-[10px] text-neutral-dark truncate mt-0.5 font-medium">
                            {comp.leader_name}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

        {/* Informative Detail Modal Dialog when a node is clicked */}
        <AnimatePresence>
          {selectedNode && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl max-w-lg w-full border-2 border-gold-400 shadow-2xl overflow-hidden relative"
              >
                <div className="p-6 bg-gradient-to-r from-brand-darkWine to-brand-burgundy text-white flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-gold-500/20 text-gold-200 border border-gold-400/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {selectedNode.code || "STRUKTUR UTAMA"} • {selectedNode.type.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      {selectedNode.title}
                    </h3>
                    <p className="text-xs text-gold-200/90 font-ui font-medium">
                      {selectedNode.role}: <span className="font-bold text-white">{selectedNode.leader}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNode(null)}
                    className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-300/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-burgundy font-bold block mb-1">
                      Deskripsi Tugas &amp; Tanggung Jawab
                    </span>
                    <p className="text-xs sm:text-sm text-wine-950 leading-relaxed font-ui">
                      {selectedNode.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedNode(null)}
                      className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-neutral-dark hover:bg-neutral-50 transition-colors"
                    >
                      Tutup
                    </button>
                    {selectedNode.href ? (
                      <Link
                        href={selectedNode.href}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors"
                      >
                        <span>Buka Halaman Detail</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <span className="text-xs text-brand-burgundy font-mono font-medium">
                        ARTHAKARSA LEADERSHIP
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
