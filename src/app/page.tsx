"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { PublicShell } from "@/components/layout/public-shell";
import { HeroSection } from "@/components/hero/hero-section";
import { BenefitSection } from "@/components/home/benefit-section";
import { PillarsSection } from "@/components/home/pillars-section";
import { AgendaTicketShowcase } from "@/components/home/agenda-ticket-showcase";
import { BusinessAchievementShowcase } from "@/components/home/business-achievement-showcase";
import { CommunityCtaSection } from "@/components/home/community-cta-section";
import { Newspaper, ArrowRight, Sparkles, Calendar, User } from "lucide-react";

export default function HomePage() {
  const { store } = useMockStore();

  // Filter latest published articles
  const publishedArticles = store.articles
    .filter((a) => a.status === "published")
    .slice(0, 3);

  const mainArticle = publishedArticles[0];
  const sideArticles = publishedArticles.slice(1);

  return (
    <PublicShell>
      {/* 1. ARTHAKARSA Premium Leadership Editorial Hero Slider */}
      <HeroSection />

      {/* 2. Benefit Masuk HIPMI (3 Keuntungan Utama Bergabung) */}
      <BenefitSection />

      {/* 3. 4 Pilar Bidang Utama ARTHAKARSA (Interactive Stage Bento) */}
      <PillarsSection />

      {/* 4. Agenda & Tiket Acara Terkini (VIP Perforated Tickets) */}
      <AgendaTicketShowcase />

      {/* 5. Etalase Bisnis Kader & Rekam Jejak Prestasi (Photos + Modals + IG/TikTok) */}
      <BusinessAchievementShowcase />

      {/* 6. Berita & Warta Terkini (Asymmetric Editorial Layout) */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#FAF6F3] to-[#F5ECE8] border-b border-wine-950/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-wine-950/10 pb-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/90 border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm">
                <Newspaper className="w-3.5 h-3.5 text-gold-600" />
                <span>Warta &amp; Inspirasi</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-wine-950 tracking-tight">
                Berita &amp; Artikel <span className="text-brand-burgundy italic">Terkini</span>
              </h2>
              <p className="font-ui text-xs sm:text-sm text-neutral-dark">
                Kabar kegiatan, rilis pers kabinet, dan gagasan seputar dunia wirausaha muda.
              </p>
            </div>
            <Link
              href="/aktivitas/berita"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-4 group"
            >
              <span>Semua Berita</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Asymmetric 1 Major + 2 Stacked Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Major Featured Article (Left - 7 cols) */}
            {mainArticle && (
              <div className="lg:col-span-7">
                <Link
                  href={`/aktivitas/berita/${mainArticle.id}`}
                  className="h-full p-8 rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-gold-100 text-brand-burgundy border border-gold-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                        {mainArticle.category} • UTAMA
                      </span>
                      <span className="text-xs font-mono text-neutral-dark flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-600" />
                        <span>Terbitan Terbaru</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug">
                      {mainArticle.title}
                    </h3>

                    <p className="font-ui text-xs sm:text-sm text-neutral-dark line-clamp-4 leading-relaxed text-pretty">
                      {mainArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-wine-950/10 flex items-center justify-between text-xs text-neutral-dark">
                    <span className="font-ui font-medium flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-burgundy" />
                      <span>{mainArticle.author_name}</span>
                    </span>
                    <span className="text-brand-burgundy font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* 2 Compact Articles Stacked (Right - 5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {sideArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/aktivitas/berita/${art.id}`}
                  className="p-6 rounded-3xl bg-white border-2 border-gold-400/30 hover:border-gold-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-ivory text-brand-burgundy border border-gold-300 text-[11px] font-mono font-bold uppercase">
                        {art.category}
                      </span>
                      <span className="text-[11px] font-mono text-stone-600 font-medium">
                        KABAR KABINET
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h3>

                    <p className="font-ui text-xs text-neutral-dark line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-wine-950/10 flex items-center justify-between text-xs text-neutral-dark">
                    <span className="font-ui text-[11px] truncate">{art.author_name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-burgundy group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Layanan Publik: Kotak Suara & Media Partner */}
      <CommunityCtaSection />
    </PublicShell>
  );
}
