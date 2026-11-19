"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Calendar, User, Share2, Clock, Sparkles } from "lucide-react";
import { getArticleVisual } from "../../aktivitas-data";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const article = store.articles.find((a) => a.id === id) || store.articles[0];
  const relatedArticles = store.articles
    .filter((a) => a.id !== article?.id && a.status === "published")
    .slice(0, 3);
  const visual = getArticleVisual(article?.id || "");

  if (!article) {
    return (
      <PublicShell>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="font-serif text-2xl font-bold text-wine-950">Warta Tidak Ditemukan</h1>
          <p className="text-neutral-dark text-sm">Artikel atau liputan yang Anda cari tidak tersedia.</p>
          <Link
            href="/aktivitas/berita"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Warta Organisasi</span>
          </Link>
        </div>
      </PublicShell>
    );
  }

  const pubDate = new Date(article.created_at);

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/aktivitas/berita"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Warta &amp; Berita Organisasi</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold uppercase">
              {article.category}
            </span>
            <span className="text-xs text-neutral-light font-mono">• {visual.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950 leading-[1.2]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-light pt-2 border-y border-wine-950/10 py-3">
            <span className="flex items-center gap-2 text-neutral-dark font-medium">
              <div className="w-6 h-6 rounded-full bg-brand-burgundy text-gold-200 text-[10px] font-serif font-bold flex items-center justify-center">
                {article.author_name.charAt(0)}
              </div>
              <span>Penulis: <strong>{article.author_name}</strong></span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>
                {pubDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>
        </header>

        {/* Cover Photo */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-wine-950/10 bg-neutral-900">
          <Image
            src={visual.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Article Excerpt Lead */}
        <p className="font-serif italic text-base sm:text-lg text-wine-900 border-l-4 border-brand-burgundy pl-4 leading-relaxed bg-surface-ivory p-4 rounded-r-2xl">
          {article.excerpt}
        </p>

        {/* Article Body */}
        <article className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-dark leading-relaxed space-y-4 font-sans">
          <p>{article.body}</p>
          <p>
            Kegiatan dan publikasi ini merupakan bagian dari realisasi komitmen HIPMI Perguruan Tinggi Universitas Telkom dalam mendukung tridharma perguruan tinggi, pembinaan jiwa kepemimpinan mandiri, dan akselerasi wirausaha muda kampus menuju kemandirian ekonomi nasional.
          </p>
        </article>

        {/* Related Articles */}
        <section className="pt-10 border-t border-wine-950/10 space-y-6">
          <h3 className="font-serif font-bold text-xl text-wine-950">
            Warta Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => {
              const relVisual = getArticleVisual(rel.id);

              return (
                <Link
                  key={rel.id}
                  href={`/aktivitas/berita/${rel.id}`}
                  className="group p-4 rounded-2xl bg-surface-card border border-wine-950/10 hover:border-gold-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-900">
                      <Image
                        src={relVisual.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gold-700 font-bold uppercase block">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-wine-950 group-hover:text-brand-burgundy line-clamp-2 transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-brand-burgundy font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Baca Warta</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </PublicShell>
  );
}
