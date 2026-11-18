"use client";

import { use } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Phone, Globe, ShieldCheck, CheckCircle2, Tag } from "lucide-react";

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const biz = store.businesses.find((b) => b.id === id) || store.businesses[0];

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        {/* Breadcrumb */}
        <Link
          href="/karya-kader/bisnis"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Bisnis</span>
        </Link>

        {/* Business Profile Header */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-brand-burgundy font-mono text-xs font-bold">
                  {biz.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Kader Terkurasi</span>
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                {biz.name}
              </h1>
              <p className="text-xs text-neutral-light">
                Founder &amp; Owner: <strong className="text-wine-950">{biz.owner_name}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 text-xs space-y-1">
              <span className="text-neutral-light block">Kontak Resmi Pemesanan:</span>
              <a
                href={`https://wa.me/${biz.contact_public.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm font-bold text-brand-burgundy hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{biz.contact_public}</span>
              </a>
            </div>
          </div>

          <p className="text-sm text-neutral-dark leading-relaxed pt-4 border-t border-wine-950/10">
            {biz.description}
          </p>
        </div>

        {/* Products & Services Section */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Katalog Penawaran
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Produk &amp; Layanan Unggulan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {biz.products_services.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex items-start gap-3"
              >
                <Tag className="w-4 h-4 text-gold-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-xs text-wine-950 block">{item}</strong>
                  <span className="text-[10px] text-neutral-light">Tersedia untuk pesanan langsung</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        {biz.social_links.length > 0 && (
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 space-y-3">
            <h3 className="font-serif font-bold text-base text-wine-950">
              Tautan Sosial &amp; Media Online
            </h3>
            <div className="flex flex-wrap gap-3">
              {biz.social_links.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-surface-ivory hover:bg-gold-50 border border-wine-950/10 text-xs font-semibold text-brand-burgundy flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-neutral-dark" />
                  <span>{s.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}
