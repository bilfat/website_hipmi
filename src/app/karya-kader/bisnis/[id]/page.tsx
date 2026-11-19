"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Tag,
  User,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { BUSINESS_CATALOG_DATA, BusinessCatalogItem } from "../../karya-kader-data";

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

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  // Find in rich catalog or in store
  const richBiz = BUSINESS_CATALOG_DATA.find((b: BusinessCatalogItem) => b.id === id);
  const storeBiz = store.businesses.find((b) => b.id === id) || store.businesses[0];

  const biz = richBiz || {
    id: storeBiz.id,
    name: storeBiz.name,
    category: storeBiz.category,
    owner_name: storeBiz.owner_name,
    faculty: "Telkom University",
    description: storeBiz.description,
    image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    products: storeBiz.products_services || [],
    contact_whatsapp: storeBiz.contact_public || "+62 812-9999-0001",
    instagram: "@hipmitelkom",
    tiktok: "@hipmitelkom",
  };

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
        
        {/* Breadcrumb */}
        <div className="pt-2">
          <Link
            href="/karya-kader/bisnis"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card hover:bg-gold-50 text-xs text-neutral-dark hover:text-brand-burgundy border border-wine-950/10 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Katalog Bisnis Kader</span>
          </Link>
        </div>

        {/* Business Main Profile Header */}
        <div className="overflow-hidden rounded-3xl bg-surface-card border border-wine-950/15 shadow-xl">
          {/* Cover Photo */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden">
            <Image
              src={biz.image_url}
              alt={biz.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wine-950 via-wine-950/30 to-transparent" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold-400 text-wine-950 text-xs font-mono font-bold uppercase shadow-sm">
                {biz.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kader Terkurasi</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs text-gold-200 font-mono block">
                Owner: {biz.owner_name} • {biz.faculty}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                  {biz.name}
                </h1>
                <p className="text-xs text-neutral-light mt-1">
                  Pendiri &amp; Pemilik Usaha: <strong className="text-wine-950">{biz.owner_name}</strong>
                </p>
              </div>

              {/* WhatsApp direct CTA */}
              <a
                href={`https://wa.me/${biz.contact_whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>Hubungi via WhatsApp</span>
              </a>
            </div>

            <p className="text-sm text-neutral-dark leading-relaxed font-sans pt-2 border-t border-wine-950/10">
              {biz.description}
            </p>

            {/* Social Media Action Buttons */}
            <div className="pt-2 border-t border-wine-950/10 space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-brand-burgundy tracking-wider block">
                Kanal Media Sosial Resmi:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {biz.instagram && (
                  <a
                    href={`https://instagram.com/${biz.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-semibold shadow hover:opacity-95 transition-opacity"
                  >
                    <InstagramIcon className="w-4 h-4" />
                    <span>Instagram {biz.instagram}</span>
                  </a>
                )}

                {biz.tiktok && (
                  <a
                    href={`https://tiktok.com/@${biz.tiktok.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold shadow hover:bg-neutral-900 transition-colors"
                  >
                    <TikTokIcon className="w-4 h-4" />
                    <span>TikTok {biz.tiktok}</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Products & Services Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-4 shadow-sm">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Katalog Penawaran
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-2">
              Produk &amp; Layanan Unggulan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {biz.products.map((item: string, idx: number) => (
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

      </div>
    </PublicShell>
  );
}
