"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Calendar, User, Share2 } from "lucide-react";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const article = store.articles.find((a) => a.id === id) || store.articles[0];
  const relatedArticles = store.articles
    .filter((a) => a.id !== article.id && a.status === "published")
    .slice(0, 3);

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Breadcrumb */}
        <Link
          href="/aktivitas/berita"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Indeks Berita</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-light pt-2 border-y border-wine-950/10 py-3">
            <span className="flex items-center gap-1.5 text-neutral-dark font-medium">
              <User className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Oleh: {article.author_name}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </span>
          </div>
        </header>

        {/* Article Excerpt Lead */}
        <p className="font-serif italic text-base sm:text-lg text-wine-900 border-l-2 border-brand-burgundy pl-4 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Article Body */}
        <article className="prose prose-neutral max-w-none text-xs sm:text-sm text-neutral-dark leading-relaxed space-y-4">
          <p>{article.body}</p>
          <p>
            Kegiatan dan publikasi ini merupakan bagian dari realisasi komitmen HIPMI Perguruan Tinggi Universitas Telkom dalam mendukung tridharma perguruan tinggi dan akselerasi wirausaha muda kampus.
          </p>
        </article>

        {/* Related Articles */}
        <section className="pt-10 border-t border-wine-950/10 space-y-6">
          <h3 className="font-serif font-bold text-xl text-wine-950">
            Artikel Terkait Lainnya
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/aktivitas/berita/${rel.id}`}
                className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 hover:border-gold-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-gold-700 font-bold uppercase">{rel.category}</span>
                  <h4 className="font-serif font-bold text-sm text-wine-950 line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[10px] text-brand-burgundy font-semibold mt-3 flex items-center gap-1">
                  <span>Baca</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
