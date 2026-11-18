"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Newspaper, Calendar, User, ArrowRight, Search } from "lucide-react";

export default function PublicArticlesPage() {
  const { store } = useMockStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const publishedArticles = store.articles.filter((a) => a.status === "published");

  const filteredArticles = publishedArticles.filter((art) => {
    const matchCategory = selectedCategory === "all" || art.category === selectedCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Warta &amp; Publikasi
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
              Berita &amp; Artikel Organisasi
            </h1>
            <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
              Liputan resmi kegiatan kepengurusan, siaran pers, dan kumpulan wawasan bisnis praktis untuk mahasiswa wirausaha.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari judul artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-card border border-wine-950/10 text-xs text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "Organisasi", label: "Organisasi" },
            { id: "Edukasi Bisnis", label: "Edukasi Bisnis" },
            { id: "Proker", label: "Program Kerja" }
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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-mono font-bold">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-neutral-light font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-burgundy" />
                    <span>{new Date(art.created_at).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </span>
                </div>

                <div>
                  <h2 className="font-serif font-bold text-lg text-wine-950 hover:text-brand-burgundy transition-colors line-clamp-2">
                    <Link href={`/aktivitas/berita/${art.id}`}>{art.title}</Link>
                  </h2>
                  <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-wine-950/10 flex items-center justify-between text-xs">
                <span className="text-neutral-light flex items-center gap-1.5 truncate max-w-[150px]">
                  <User className="w-3.5 h-3.5 text-neutral-dark" />
                  <span>{art.author_name}</span>
                </span>

                <Link
                  href={`/aktivitas/berita/${art.id}`}
                  className="font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1"
                >
                  <span>Baca Artikel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}
