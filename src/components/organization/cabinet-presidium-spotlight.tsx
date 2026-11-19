"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Sparkles,
  Quote,
  GraduationCap,
  Briefcase,
  ChevronRight,
  Mail,
  X,
  ExternalLink
} from "lucide-react";

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface PresidiumMember {
  id: string;
  name: string;
  role: string;
  subRole: string;
  tag: string;
  faculty: string;
  program: string;
  quote: string;
  duties: string[];
  achievements: string[];
  contactEmail: string;
  linkedinUrl: string;
  flipSilhouette?: boolean;
}

const PRESIDIUM_DATA: PresidiumMember[] = [
  {
    id: "ketum",
    name: "Muhammad Fathur",
    role: "Ketua Umum",
    subRole: "Presidium Utama Mandataris Muscab",
    tag: "PRESIDIUM 01",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Manajemen Bisnis Telekomunikasi & Informatika",
    quote:
      "Menjadikan HIPMI PT Telkom University sebagai rahim lahirnya pengusaha muda berdaya saing global, berkarakter luhur, dan berakar kuat pada nilai kemanfaatan nyata bagi bangsa.",
    duties: [
      "Pemegang otoritas tertinggi kebijakan strategis dan representasi kelembagaan",
      "Penanggung jawab mutlak pelaksanaan Visi & Misi Kabinet ARTHAKARSA",
      "Pembangun sinergi kemitraan tingkat tinggi dengan Rektorat, Korporasi, & BPC/BPD HIPMI"
    ],
    achievements: [
      "Inisiator Program Inkubasi ARTHAKARSA Fast-Track",
      "Delegasi HIPMI PT Jawa Barat Youth Business Summit 2025",
      "Founder & CEO EduTech Synergy Nusantara"
    ],
    contactEmail: "ketum.arthakarsa@hipmitelkom.org",
    linkedinUrl: "https://linkedin.com",
    flipSilhouette: false
  },
  {
    id: "waketum",
    name: "Sarah Andini",
    role: "Wakil Ketua Umum",
    subRole: "Pengarah Operasional Internal & Sinergi Bidang",
    tag: "PRESIDIUM 02",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Teknik Industri",
    quote:
      "Mengorkestrasi tata kelola internal secara adaptif, menjaga sinergi 4 pilar bidang, dan memastikan setiap karya kader berdaya guna secara berkelanjutan.",
    duties: [
      "Pengendali operasional harian 4 Pilar Bidang dan pembina 8 Kompartemen",
      "Penyelarasan eksekusi program kerja agar tepat mutu, waktu, dan kepatuhan anggaran",
      "Representasi kepemimpinan pengganti mandataris pada forum koordinasi internal-eksternal"
    ],
    achievements: [
      "Arsitek Standard Operating Procedure (SOP) Digital HIPMI CENTRAL",
      "Best Project Director HIPMI Entrepreneur Fair 2025",
      "Co-Founder GreenLoop Sustainable Packaging"
    ],
    contactEmail: "waketum.arthakarsa@hipmitelkom.org",
    linkedinUrl: "https://linkedin.com",
    flipSilhouette: true
  }
];

export const CabinetPresidiumSpotlight: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<PresidiumMember | null>(null);

  return (
    <section className="relative w-full py-10 sm:py-14 select-none">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-50/20 to-transparent pointer-events-none rounded-3xl" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-ivory border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Crown className="w-3.5 h-3.5 text-gold-600" />
          <span>Pimpinan Mandataris Kabinet</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
          Ketua Umum &amp; Wakil Ketua Umum
        </h2>
        <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-xl mx-auto leading-relaxed">
          Dua figur nakhoda kepemimpinan yang memegang komando strategis dan operasional ARTHAKARSA dalam menggerakkan ekosistem wirausaha muda Telkom University.
        </p>
      </div>

      {/* 2 Symmetrical Editorial Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PRESIDIUM_DATA.map((leader, idx) => (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 0.8, 0.3, 1] }}
            className="group relative rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top decorative gradient bar */}
            <div
              className={`h-2 w-full bg-gradient-to-r ${
                idx === 0
                  ? "from-brand-darkWine via-brand-burgundy to-gold-400"
                  : "from-gold-400 via-brand-burgundy to-brand-darkWine"
              }`}
            />

            <div className="p-6 sm:p-8 space-y-6">
              {/* Top Row: Tag & Faculty */}
              <div className="flex items-center justify-between gap-2 border-b border-wine-950/10 pb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100/90 text-brand-burgundy font-mono text-[11px] font-bold tracking-wider border border-gold-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-burgundy" />
                  {leader.tag}
                </span>
                <span className="text-[11px] font-ui text-neutral-dark font-medium flex items-center gap-1.5 truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="truncate">{leader.faculty}</span>
                </span>
              </div>

              {/* Middle Row: Silhouette & Typography */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Silhouette Figure Frame */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="relative w-40 h-48 sm:w-44 sm:h-52 rounded-2xl bg-gradient-to-b from-surface-warm-white via-surface-ivory to-surface-blush-mist border border-gold-400/50 p-3 shadow-inner flex items-end justify-center overflow-hidden group-hover:scale-102 transition-transform duration-300">
                    {/* Subtle Backdrop Ring */}
                    <div className="absolute inset-2 rounded-xl border border-gold-300/30 pointer-events-none" />

                    {/* Silhouette Image */}
                    <div
                      className={`relative w-full h-full filter contrast-125 drop-shadow-[0_10px_16px_rgba(90,23,34,0.3)] transition-transform duration-500 group-hover:scale-105 ${
                        leader.flipSilhouette ? "scale-x-[-1]" : ""
                      }`}
                    >
                      <Image
                        src="/assets/siluet.png"
                        alt={`Siluet Resmi ${leader.role} ARTHAKARSA`}
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>

                    {/* Official badge overlay */}
                    <div className="absolute bottom-2 left-2 right-2 py-1 px-2 rounded-lg bg-brand-darkWine/90 backdrop-blur-sm border border-gold-400/40 text-center">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-gold-200 uppercase">
                        RESMI • 2026/2027
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typography and Role */}
                <div className="sm:col-span-7 space-y-2.5 text-center sm:text-left">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-700 font-bold">
                      {leader.role}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-wine-950 mt-0.5 tracking-tight group-hover:text-brand-burgundy transition-colors">
                      {leader.name}
                    </h3>
                    <p className="font-ui text-xs font-medium text-neutral-dark mt-1">
                      {leader.program}
                    </p>
                  </div>

                  {/* Leader Quote Card */}
                  <div className="relative p-3.5 rounded-2xl bg-surface-ivory border border-gold-300/60 shadow-sm text-left">
                    <Quote className="w-4 h-4 text-gold-500 absolute top-2.5 right-3 opacity-60" />
                    <p className="font-ui text-xs text-brand-darkWine italic leading-relaxed pr-3">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Duties (Bullet points) */}
              <div className="space-y-2 pt-2 border-t border-wine-950/10">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-burgundy flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-brand-burgundy" />
                  Mandat &amp; Tanggung Jawab Inti
                </span>
                <ul className="space-y-1.5">
                  {leader.duties.map((duty, dIdx) => (
                    <li
                      key={dIdx}
                      className="text-xs font-ui text-neutral-dark flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="px-6 py-4 bg-surface-warm-white border-t border-wine-950/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${leader.contactEmail}`}
                  title="Kirim Email"
                  className="w-8 h-8 rounded-full bg-white hover:bg-gold-50 border border-gold-300/60 text-brand-burgundy flex items-center justify-center transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <a
                  href={leader.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Profil LinkedIn"
                  className="w-8 h-8 rounded-full bg-white hover:bg-gold-50 border border-gold-300/60 text-brand-burgundy flex items-center justify-center transition-colors shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLeader(leader)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine px-3.5 py-1.5 rounded-full bg-gold-100/70 hover:bg-gold-200/80 border border-gold-300 transition-colors shadow-sm"
              >
                <span>Lihat Profil Lengkap</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal Dialog */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-xl w-full border-2 border-gold-400 shadow-2xl overflow-hidden relative"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-brand-darkWine to-brand-burgundy text-white flex items-start justify-between relative">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-gold-500/20 text-gold-200 border border-gold-400/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedLeader.tag} • KABINET ARTHAKARSA
                  </span>
                  <h3 className="font-serif text-2xl font-bold">{selectedLeader.name}</h3>
                  <p className="text-xs text-gold-200/90 font-ui font-medium">
                    {selectedLeader.role} • {selectedLeader.subRole}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLeader(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Academic Background */}
                <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-300/60 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-burgundy font-bold">
                    Latar Belakang Akademik
                  </span>
                  <p className="text-sm font-semibold text-wine-950">
                    {selectedLeader.program}
                  </p>
                  <p className="text-xs text-neutral-dark">{selectedLeader.faculty} • Telkom University</p>
                </div>

                {/* Visi Kepemimpinan Quote */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold">
                    Visi &amp; Komitmen Kepemimpinan
                  </span>
                  <p className="text-xs text-wine-950 italic bg-gold-50/70 p-3.5 rounded-xl border border-gold-200 leading-relaxed">
                    &ldquo;{selectedLeader.quote}&rdquo;
                  </p>
                </div>

                {/* Rekam Jejak & Prestasi */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    Rekam Jejak &amp; Inisiatif Unggulan
                  </span>
                  <ul className="space-y-2">
                    {selectedLeader.achievements.map((ach, idx) => (
                      <li
                        key={idx}
                        className="text-xs font-ui text-neutral-dark flex items-start gap-2 bg-white p-2.5 rounded-xl border border-gold-300/40"
                      >
                        <ShieldCheck className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-wine-950/10">
                  <span className="text-xs text-neutral-dark font-mono">{selectedLeader.contactEmail}</span>
                  <a
                    href={`mailto:${selectedLeader.contactEmail}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors"
                  >
                    <span>Kirim Pesan Resmi</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
