"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PublicShell } from "@/components/layout/public-shell";
import {
  Briefcase,
  ArrowRight,
  Phone,
  ExternalLink,
  Sparkles,
  Search,
  X,
  User,
  ShoppingBag,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";
import { BUSINESS_CATALOG_DATA, BusinessCatalogItem } from "../karya-kader-data";

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

export default function CadreBusinessesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalBiz, setActiveModalBiz] = useState<BusinessCatalogItem | null>(null);

  const filteredBusinesses = useMemo(() => {
    return BUSINESS_CATALOG_DATA.filter((b) => {
      // Category filter
      if (selectedCategory !== "all" && b.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchOwner = b.owner_name.toLowerCase().includes(q);
        const matchDesc = b.description.toLowerCase().includes(q);
        const matchProd = b.products.some((p) => p.toLowerCase().includes(q));
        if (!matchName && !matchOwner && !matchDesc && !matchProd) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
                <span>ETALASE USAHA RESMI • KADER ARTHAKARSA</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Katalog Bisnis Kader HIPMI
              </h1>

              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Eksplorasi dan dukung produk karya mahasiswa kader HIPMI PT Universitas Telkom. Mulai dari kuliner nusantara, agensi digital, inovasi kemasan ramah lingkungan, konveksi apparel, hingga edutech anak.
              </p>
            </div>

            {/* Daftarkan Usaha CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/personal/bisnis/baru"
                className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Daftarkan Usaha Kader</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== 2. FILTER & SEARCH CONTROL ==================== */}
        <section className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama brand, produk, atau pemilik..."
                className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-surface-card border border-wine-950/15 text-xs sm:text-sm text-wine-950 placeholder:text-neutral-light focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/10 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-light/20 text-neutral-dark"
                  aria-label="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Counter */}
            <div className="text-xs text-neutral-dark flex items-center justify-between sm:justify-end gap-2">
              <span>
                Menampilkan <strong className="text-wine-950 font-mono">{filteredBusinesses.length}</strong> usaha kader terkurasi
              </span>
              {(selectedCategory !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-burgundy hover:text-brand-darkWine font-semibold underline text-xs ml-2"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
            {[
              { id: "all", label: "Semua Kategori" },
              { id: "Food & Beverage", label: "🍲 Food & Beverage" },
              { id: "Teknologi & Jasa Kreatif", label: "💻 Teknologi & Digital" },
              { id: "Fashion & Merchandise", label: "👕 Fashion & Apparel" },
              { id: "Manufaktur & Ramah Lingkungan", label: "🌿 Eco & Manufaktur" },
              { id: "Pendidikan & Edutech", label: "📚 Edukasi & Edutech" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                    : "bg-surface-card hover:bg-gold-50 text-neutral-dark border border-wine-950/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* ==================== 3. BUSINESS CARDS GRID (HOMEPAGE MATCH) ==================== */}
        {filteredBusinesses.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <ShoppingBag className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada usaha yang cocok
              </h3>
              <p className="text-xs text-neutral-dark">
                Silakan coba kata kunci lain atau pilih kategori sektor usaha yang berbeda.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Product Cover Image (16:9 Aspect Ratio) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={biz.image_url}
                    alt={biz.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />

                  {/* Sector Category Overlay Tag */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-300 border border-gold-400/30 text-[8px] sm:text-[10px] font-mono font-bold uppercase truncate max-w-[130px] inline-block">
                      {biz.category}
                    </span>
                  </div>

                  {/* Owner Overlay Tag */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs text-white/95">
                    <span className="font-serif font-semibold text-[10px] sm:text-xs text-white drop-shadow truncate max-w-[95px] sm:max-w-none">
                      {biz.owner_name}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono text-gold-200 bg-black/40 px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-sm shrink-0">
                      Kader
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 sm:space-y-2.5">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-neutral-light">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-burgundy shrink-0" />
                      <span className="truncate">{biz.faculty}</span>
                    </div>

                    <h2 className="font-serif font-bold text-xs sm:text-xl text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug line-clamp-1 sm:line-clamp-2">
                      {biz.name}
                    </h2>

                    <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed font-sans">
                      {biz.description}
                    </p>

                    {/* Product Chips */}
                    <div className="space-y-1 sm:space-y-1.5 pt-1.5 sm:pt-2 border-t border-wine-950/10">
                      <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-light block">
                        Produk Unggulan:
                      </span>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {biz.products.slice(0, 2).map((prod, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 sm:px-2.5 py-0.5 rounded-md sm:rounded-lg bg-surface-ivory text-neutral-black text-[9px] sm:text-[11px] font-medium border border-wine-950/10 truncate max-w-[120px]"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Modal Trigger Button */}
                  <div className="pt-2.5 sm:pt-4 border-t border-wine-950/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-2">
                    <Link
                      href={`/karya-kader/bisnis/${biz.id}`}
                      className="text-[10px] sm:text-xs font-semibold text-neutral-dark hover:text-brand-burgundy transition-colors text-center sm:text-left py-0.5"
                    >
                      Detail
                    </Link>

                    <button
                      onClick={() => setActiveModalBiz(biz)}
                      className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-[10px] sm:text-xs font-semibold shadow-sm hover:shadow transition-all"
                    >
                      <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Profil Usaha</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== 4. INTERACTIVE BUSINESS PROFILE MODAL ==================== */}
        <AnimatePresence>
          {activeModalBiz && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalBiz(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-surface-card border border-wine-950/20 shadow-2xl z-10 my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalBiz(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
                  aria-label="Tutup modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Header Photo */}
                <div className="relative aspect-[16/8] w-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={activeModalBiz.image_url}
                    alt={activeModalBiz.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/30 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                      {activeModalBiz.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                      {activeModalBiz.name}
                    </h3>
                    <p className="text-xs text-gold-200 mt-1 font-mono">
                      Owner: {activeModalBiz.owner_name} • {activeModalBiz.faculty}
                    </p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy">
                      Tentang Brand &amp; Usaha
                    </h4>
                    <p className="text-sm text-neutral-dark leading-relaxed font-sans">
                      {activeModalBiz.description}
                    </p>
                  </div>

                  {/* Products & Services List */}
                  <div className="space-y-2 pt-2 border-t border-wine-950/10">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy">
                      Katalog Produk &amp; Layanan
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {activeModalBiz.products.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-ivory border border-wine-950/10 text-xs text-wine-950"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Social & Contact Actions */}
                  <div className="space-y-3 pt-2 border-t border-wine-950/10">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy">
                      Kanal Media Sosial &amp; Kontak Pemesanan
                    </h4>

                    <div className="flex flex-wrap gap-2.5">
                      {/* Instagram Button */}
                      {activeModalBiz.instagram && (
                        <a
                          href={`https://instagram.com/${activeModalBiz.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-semibold shadow hover:opacity-95 transition-opacity"
                        >
                          <InstagramIcon className="w-4 h-4" />
                          <span>Instagram {activeModalBiz.instagram}</span>
                        </a>
                      )}

                      {/* TikTok Button */}
                      {activeModalBiz.tiktok && (
                        <a
                          href={`https://tiktok.com/@${activeModalBiz.tiktok.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold shadow hover:bg-neutral-900 transition-colors"
                        >
                          <TikTokIcon className="w-4 h-4" />
                          <span>TikTok {activeModalBiz.tiktok}</span>
                        </a>
                      )}

                      {/* WhatsApp Button */}
                      {activeModalBiz.contact_whatsapp && (
                        <a
                          href={`https://wa.me/${activeModalBiz.contact_whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Hubungi via WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PublicShell>
  );
}
