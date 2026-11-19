"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Award,
  ArrowRight,
  ExternalLink,
  Sparkles,
  User,
  X,
  Phone,
  CheckCircle2,
  Calendar,
  Layers,
  ShoppingBag,
  ShieldCheck,
  Trophy,
} from "lucide-react";

// Social Media Icons
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

interface BusinessItem {
  id: string;
  name: string;
  category: string;
  owner_name: string;
  faculty: string;
  description: string;
  image_url: string;
  products: string[];
  contact_whatsapp: string;
  instagram: string;
  tiktok: string;
}

interface AchievementItemData {
  id: string;
  title: string;
  category: string;
  level: "Nasional" | "Internasional" | "Regional";
  year: string;
  description: string;
  cadre_names: string[];
  image_url: string;
}

const BUSINESS_DATA: BusinessItem[] = [
  {
    id: "biz-01",
    name: "Dapur Kreasi Nusantara",
    category: "Food & Beverage",
    owner_name: "Nabila Putri",
    faculty: "Fakultas Ekonomi dan Bisnis (S1 MBTI)",
    description:
      "Catering harian mahasiswa dan olahan sambal kemasan higienis berbasis rempah nusantara. Menghadirkan cita rasa autentik dengan kemasan praktis dan ramah lingkungan.",
    image_url:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    products: ["Rice Bowl Nusantara", "Sambal Cumi Botol", "Snack Box Rapat Ormawa"],
    contact_whatsapp: "+62 812-9999-0001",
    instagram: "@dapurkreasi.telu",
    tiktok: "@dapurkreasi.official",
  },
  {
    id: "biz-02",
    name: "Karya Digital Studio",
    category: "Teknologi & Jasa Kreatif",
    owner_name: "Fajar Ramadhan",
    faculty: "Fakultas Rekayasa Industri (S1 Teknik Industri)",
    description:
      "Agensi digital yang membantu UMKM dan startup kampus bertumbuh melalui pembuatan website modern Next.js, UI/UX design, dan identitas visual brand berkarakter.",
    image_url:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    products: ["Pembuatan Website Next.js", "Design System Figma", "Social Media Kit"],
    contact_whatsapp: "+62 812-9999-0002",
    instagram: "@karyadigital.studio",
    tiktok: "@karyadigital.id",
  },
  {
    id: "biz-03",
    name: "GreenLoop Eco Packaging",
    category: "Manufaktur & Ramah Lingkungan",
    owner_name: "Sarah Andini",
    faculty: "Fakultas Rekayasa Industri (S1 Teknik Industri)",
    description:
      "Solusi kemasan ramah lingkungan berbahan dasar serat alami dan bioplastik singkong yang mudah terurai untuk industri F&B dan retail kampus.",
    image_url:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    products: ["Cassava Eco Bag", "Paper Food Box", "Biodegradable Cassava Straw"],
    contact_whatsapp: "+62 812-9999-0003",
    instagram: "@greenloop.pack",
    tiktok: "@greenloop.eco",
  },
];

const ACHIEVEMENT_DATA: AchievementItemData[] = [
  {
    id: "ach-01",
    title: "Juara 1 National Business Plan Competition Entrepreneur Festival 2026",
    category: "Kompetisi Bisnis",
    level: "Nasional",
    year: "2026",
    description:
      "Menyabet medali emas tingkat nasional dengan inovasi pengolahan limbah organik berbasis biokonversi maggot yang bernilai ekspor tinggi.",
    cadre_names: ["Nabila Putri", "Fajar Ramadhan"],
    image_url:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ach-02",
    title: "Best Social Enterprise Award pada ASEAN Youth Socialpreneur Summit",
    category: "Wirausaha Sosial",
    level: "Internasional",
    year: "2026",
    description:
      "Penghargaan bergengsi tingkat Asia Tenggara atas inisiatif pemberdayaan perajin lokal Jawa Barat menembus pasar ritel modern.",
    cadre_names: ["Sarah Andini", "Tim Mahasiswa"],
    image_url:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ach-03",
    title: "Juara 2 Kategori Teknologi Tepat Guna KMI Expo Kemendikbudristek",
    category: "Inovasi Teknologi",
    level: "Nasional",
    year: "2026",
    description:
      "Apresiasi nasional atas purwarupa platform Internet of Things (IoT) untuk pemantauan hidroponik pintar petani milenial kampus.",
    cadre_names: ["Farhan Hakim", "Doni Kurniawan"],
    image_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

export const BusinessAchievementShowcase: React.FC = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessItem | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItemData | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedBusiness(null);
        setSelectedAchievement(null);
      }
    };
    if (selectedBusiness || selectedAchievement) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBusiness, selectedAchievement]);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#F8EFF1] via-[#FCF8F6] to-[#FFFFFF] relative overflow-hidden border-b border-wine-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* ========================================================
            PART 1: ETALASE BISNIS KADER (DENGAN FOTO & MODAL POP-UP)
           ======================================================== */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-wine-950/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/90 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-gold-600" />
                <span>Karya Nyata Kader</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-wine-950 tracking-tight">
                Etalase Bisnis <span className="text-brand-burgundy italic">Kader Mahasiswa</span>
              </h2>
              <p className="font-ui text-xs sm:text-sm text-neutral-dark mt-1">
                Portofolio brand, produk kreatif, dan rintisan usaha binaan HIPMI PT Telkom University.
              </p>
            </div>

            <Link
              href="/karya-kader/bisnis"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-4 group"
            >
              <span>Buka Direktori Bisnis Lengkap</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Business Cards Grid with Photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {BUSINESS_DATA.map((biz) => (
              <div
                key={biz.id}
                className="rounded-2xl sm:rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-32 sm:h-52 overflow-hidden bg-surface-ivory">
                    <Image
                      src={biz.image_url}
                      alt={biz.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-sm text-brand-burgundy border border-gold-400/50 text-[8px] sm:text-[11px] font-mono font-bold tracking-wide uppercase shadow-sm truncate max-w-[120px]">
                      {biz.category}
                    </span>

                    <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[10px] sm:text-xs font-ui text-white font-medium flex items-center gap-1 sm:gap-1.5 drop-shadow truncate max-w-[95px] sm:max-w-none">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-300 shrink-0" />
                      <span className="truncate">{biz.owner_name}</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 sm:p-6 space-y-1.5 sm:space-y-3">
                    <h3 className="font-serif font-bold text-xs sm:text-xl text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                      {biz.name}
                    </h3>
                    <p className="font-ui text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed hidden sm:block">
                      {biz.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action: Trigger Modal */}
                <div className="p-2.5 sm:p-4 sm:px-6 bg-surface-warm-white border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1 sm:gap-2">
                  <span className="hidden sm:inline text-[11px] font-mono text-neutral-dark truncate max-w-[140px]">
                    {biz.contact_whatsapp}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedBusiness(biz)}
                    className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-1.5 rounded-full bg-gold-100 hover:bg-gold-200 text-brand-burgundy text-[10px] sm:text-xs font-semibold transition-colors shadow-sm w-full sm:w-auto"
                  >
                    <span>Profil Usaha</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 2: REKAM JEJAK PRESTASI KADER (DENGAN FOTO JUARA)
           ======================================================== */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-wine-950/10 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/90 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5 text-gold-600" />
                <span>Wall of Fame</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-wine-950 tracking-tight">
                Prestasi &amp; Rekam Jejak <span className="text-brand-burgundy italic">Kader</span>
              </h2>
              <p className="font-ui text-xs sm:text-sm text-neutral-dark mt-1">
                Dedikasi, kompetensi bisnis, dan supremasi prestasi kader Telkom University di panggung nasional &amp; internasional.
              </p>
            </div>

            <Link
              href="/karya-kader/prestasi"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-4 group"
            >
              <span>Arsip Seluruh Prestasi</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Achievement Cards Grid with Photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {ACHIEVEMENT_DATA.map((ach) => (
              <div
                key={ach.id}
                className="rounded-2xl sm:rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                <div>
                  {/* Photo Documentation of Achievement */}
                  <div
                    onClick={() => setSelectedAchievement(ach)}
                    className="relative w-full h-32 sm:h-48 overflow-hidden bg-surface-ivory cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Buka Piagam ${ach.title}`}
                  >
                    <Image
                      src={ach.image_url}
                      alt={ach.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Ribbon Tag */}
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gold-400 text-wine-950 font-serif text-[8px] sm:text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-wine-950 shrink-0" />
                      <span>{ach.level}</span>
                    </span>

                    <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-1.5 sm:px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white font-mono text-[8px] sm:text-[11px] font-bold">
                      {ach.year}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-3 sm:p-6 space-y-1.5 sm:space-y-3">
                    <span className="text-[8px] sm:text-[11px] font-mono font-bold uppercase text-brand-burgundy tracking-wider block truncate">
                      {ach.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAchievement(ach)}
                      className="block text-left w-full cursor-pointer group/title"
                    >
                      <h3 className="font-serif font-bold text-xs sm:text-lg text-wine-950 group-hover/title:text-brand-burgundy transition-colors leading-snug line-clamp-2">
                        {ach.title}
                      </h3>
                    </button>
                    <p className="font-ui text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed hidden sm:block">
                      {ach.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Delegasi Kader & Tombol Lihat Piagam */}
                <div className="p-2.5 sm:p-4 sm:px-6 bg-surface-warm-white border-t border-wine-950/10 flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="font-ui text-neutral-dark font-medium truncate max-w-[95px] sm:max-w-none">
                    <strong className="text-wine-950">{ach.cadre_names.join(", ")}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedAchievement(ach)}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine cursor-pointer group/btn shrink-0"
                  >
                    <span>Lihat Piagam</span>
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-600 shrink-0 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================
          MODAL POP-UP: PROFIL BISNIS KADER (DENGAN IG & TIKTOK)
         ======================================================== */}
      <AnimatePresence>
        {selectedBusiness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-wine-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col border-2 border-gold-400 shadow-2xl overflow-hidden relative"
            >
              {/* Image Banner */}
              <div className="relative w-full h-36 sm:h-48 bg-wine-950 shrink-0">
                <Image
                  src={selectedBusiness.image_url}
                  alt={selectedBusiness.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <button
                  type="button"
                  onClick={() => setSelectedBusiness(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-400 text-wine-950 text-[11px] font-mono font-bold uppercase tracking-wider mb-1 inline-block">
                    {selectedBusiness.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight truncate">
                    {selectedBusiness.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
                {/* Owner Information */}
                <div className="p-3.5 rounded-2xl bg-surface-ivory border border-gold-300/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold block">
                      Founder / Kader Pemilik
                    </span>
                    <p className="text-sm font-bold text-wine-950">{selectedBusiness.owner_name}</p>
                    <p className="text-xs text-neutral-dark">{selectedBusiness.faculty}</p>
                  </div>
                  <User className="w-6 h-6 text-brand-burgundy/40" />
                </div>

                {/* About Business */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold block">
                    Tentang Produk &amp; Usaha
                  </span>
                  <p className="text-xs sm:text-sm text-wine-950 leading-relaxed font-ui">
                    {selectedBusiness.description}
                  </p>
                </div>

                {/* Products and Services */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-gold-600" />
                    Katalog Produk / Layanan Unggulan:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBusiness.products.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-wine-950 text-xs font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SOCIAL MEDIA & WHATSAPP ROW */}
                <div className="space-y-2 pt-2 border-t border-wine-950/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-burgundy font-bold block">
                    Media Sosial &amp; Kontak Resmi:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Instagram Button */}
                    <a
                      href={`https://instagram.com/${selectedBusiness.instagram.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 text-white font-ui font-semibold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      <span>{selectedBusiness.instagram}</span>
                    </a>

                    {/* TikTok Button */}
                    <a
                      href={`https://tiktok.com/@${selectedBusiness.tiktok.replace(/^@/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-black text-white font-ui font-semibold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-neutral-900 transition-colors"
                    >
                      <TikTokIcon className="w-4 h-4" />
                      <span>{selectedBusiness.tiktok}</span>
                    </a>
                  </div>
                </div>

                {/* Direct Action Contact */}
                <div className="pt-2 flex items-center justify-between border-t border-wine-950/10">
                  <span className="text-xs text-neutral-dark font-mono">
                    {selectedBusiness.contact_whatsapp}
                  </span>
                  <a
                    href={`https://wa.me/${selectedBusiness.contact_whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo ${selectedBusiness.name}, saya menemukan produk Anda melalui Website HIPMI PT Telkom University.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hubungi / Pesan Produk</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ========================================================
            MODAL POP-UP: PIAGAM PENGHARGAAN PRESTASI KADER
           ======================================================== */}
        {selectedAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Plaque Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDF8F3] border-2 border-gold-400 shadow-2xl z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Top Golden Sheen Trim */}
              <div className="h-2 w-full bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 shrink-0" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                aria-label="Tutup piagam"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto">
                {/* Modal Cover Photo Banner */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={selectedAchievement.image_url}
                    alt={selectedAchievement.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                      🏆 {selectedAchievement.level} • {selectedAchievement.year}
                    </span>
                  </div>
                </div>

                {/* Plaque Content Body */}
                <div className="p-5 sm:p-8 space-y-6">
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300 inline-block shadow-2xs">
                      Kategori: {selectedAchievement.category}
                    </span>

                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-wine-950 leading-tight">
                      {selectedAchievement.title}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans pt-3 border-t border-wine-950/10">
                    {selectedAchievement.description}
                  </p>

                  {/* Kader Pengukir Prestasi */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-3">
                    <span className="text-[11px] text-neutral-light font-mono uppercase tracking-wider block">
                      Kader Mahasiswa Pengukir Prestasi:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedAchievement.cadre_names?.map((name, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-white border border-gold-300 text-wine-950 text-xs font-semibold flex items-center gap-2 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-brand-burgundy text-gold-200 text-[10px] font-bold flex items-center justify-center">
                            {name.charAt(0)}
                          </div>
                          <span>{name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Official Verification Seal */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-gold-50/80 to-surface-ivory border border-gold-300/80 flex items-center gap-3.5 text-xs text-neutral-dark">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-wine-950 block">Terverifikasi Resmi HIPMI CENTRAL</strong>
                      <span className="text-[11px] text-neutral-dark">
                        Portofolio kejuaraan ini telah diverifikasi dalam pangkalan data resmi Kabinet Arthakarsa.
                      </span>
                    </div>
                  </div>

                  {/* Modal Action Button */}
                  <div className="pt-4 border-t border-wine-950/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedAchievement(null)}
                      className="px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold hover:bg-brand-darkWine transition-colors cursor-pointer"
                    >
                      Tutup Piagam
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
