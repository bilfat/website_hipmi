"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Newspaper,
  Calendar,
  User,
  ArrowRight,
  Search,
  Sparkles,
  X,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { getArticleVisual } from "../aktivitas-data";

export default function PublicArticlesPage() {
  const { store } = useMockStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const publishedArticles = useMemo(() => {
    return store.articles.filter((a) => a.status === "published");
  }, [store.articles]);

  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((art) => {
      const matchCategory = selectedCategory === "all" || art.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author_name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  // Featured article (first one if no search/filter)
  const featuredArticle = useMemo(() => {
    return publishedArticles[0];
  }, [publishedArticles]);

  const otherArticles = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery.trim() !== "") {
      return filteredArticles;
    }
    return filteredArticles.slice(1);
  }, [filteredArticles, selectedCategory, searchQuery]);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
                <span>WARTA &amp; PUBLIKASI RESMI • ARTHAKARSA</span>
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
                Berita &amp; Wawasan Bisnis Mahasiswa
              </h1>
              <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
                Kumpulan liputan resmi kepengurusan, siaran pers, profil kader berprestasi, serta artikel edukasi praktis seputar ekosistem kewirausahaan kampus.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-light absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul artikel atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
          </div>
        </section>

        {/* ==================== 2. FEATURED ARTICLE SPOTLIGHT (HEADLINE) ==================== */}
        {featuredArticle && !searchQuery && selectedCategory === "all" && (
          <section className="relative overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-8 lg:p-10">
              
              {/* Left Column: Big Cover Photo (16:10 / 16:9) */}
              <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] bg-neutral-900 border border-wine-950/10 shadow-md">
                <Image
                  src={getArticleVisual(featuredArticle.id).image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                    ★ Berita Utama (Headline)
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-mono">
                  <span className="px-2.5 py-0.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 text-gold-300">
                    {featuredArticle.category}
                  </span>
                  <span>{getArticleVisual(featuredArticle.id).readTime}</span>
                </div>
              </div>

              {/* Right Column: Editorial Text */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-neutral-light font-mono">
                  <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span>
                    {new Date(featuredArticle.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <Link href={`/aktivitas/berita/${featuredArticle.id}`} className="block group">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 group-hover:text-brand-burgundy transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed font-sans line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-3 border-t border-wine-950/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-neutral-dark">
                    <div className="w-6 h-6 rounded-full bg-brand-burgundy text-gold-200 text-[10px] font-serif font-bold flex items-center justify-center">
                      {featuredArticle.author_name.charAt(0)}
                    </div>
                    <span>{featuredArticle.author_name}</span>
                  </div>

                  <Link
                    href={`/aktivitas/berita/${featuredArticle.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-all"
                  >
                    <span>Baca Warta</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== 3. CATEGORY FILTER TABS ==================== */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wine-950/10 pb-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "Semua Kategori" },
                { id: "Organisasi", label: "Organisasi" },
                { id: "Edukasi Bisnis", label: "Edukasi Bisnis" },
                { id: "Proker", label: "Program Kerja" },
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

            <div className="text-xs text-neutral-dark">
              <span>
                Menampilkan <strong className="text-wine-950 font-mono">{filteredArticles.length}</strong> warta wirausaha
              </span>
            </div>
          </div>
        </section>

        {/* ==================== 4. ARTICLES GRID (COMPACT EDITORIAL) ==================== */}
        {otherArticles.length === 0 ? (
          <div className="py-16 px-6 text-center rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center mx-auto text-brand-burgundy">
              <Newspaper className="w-8 h-8 opacity-70" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wine-950">
                Tidak ada artikel yang cocok
              </h3>
              <p className="text-xs text-neutral-dark">
                Silakan coba kata kunci lain atau pilih kategori yang berbeda.
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
            {otherArticles.map((art) => {
              const visual = getArticleVisual(art.id);
              const pubDate = new Date(art.created_at);

              return (
                <div
                  key={art.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-2xl hover:border-gold-400/60 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* COMPACT THUMBNAIL (16:9 Aspect Ratio) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={visual.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                      <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-mono font-bold uppercase bg-black/60 backdrop-blur-md text-gold-300 border border-gold-400/30 truncate max-w-[120px] inline-block">
                        {art.category}
                      </span>
                    </div>

                    {/* Read Time Overlay */}
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3">
                      <span className="text-[8px] sm:text-[10px] font-mono text-white/80 bg-black/40 px-1.5 sm:px-2 py-0.5 rounded backdrop-blur-sm">
                        {visual.readTime}
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] text-neutral-light font-mono">
                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-burgundy" />
                        <span>
                          {pubDate.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <Link href={`/aktivitas/berita/${art.id}`} className="block">
                        <h3 className="font-serif font-bold text-xs sm:text-base text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h3>
                      </Link>

                      <p className="text-[10px] sm:text-xs text-neutral-dark line-clamp-2 leading-relaxed font-sans hidden sm:block">
                        {art.excerpt}
                      </p>
                    </div>

                    {/* CARD FOOTER */}
                    <div className="pt-2 sm:pt-3 border-t border-wine-950/10 flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs text-neutral-dark">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold-100 text-brand-burgundy font-serif font-bold text-[8px] sm:text-[10px] flex items-center justify-center shrink-0">
                          {art.author_name.charAt(0)}
                        </div>
                        <span className="text-[9px] sm:text-[11px] truncate max-w-[70px] sm:max-w-[120px]">{art.author_name}</span>
                      </div>

                      <Link
                        href={`/aktivitas/berita/${art.id}`}
                        className="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine group/btn shrink-0"
                      >
                        <span>Baca</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </PublicShell>
  );
}
