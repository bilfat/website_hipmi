"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Briefcase, ArrowRight, Phone, ExternalLink } from "lucide-react";

export default function CadreBusinessesPage() {
  const { store } = useMockStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const publishedBusinesses = store.businesses.filter(
    (b) => b.publication_status === "published"
  );

  const filteredBusinesses = publishedBusinesses.filter((b) => {
    if (selectedCategory === "all") return true;
    return b.category === selectedCategory;
  });

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Etalase Karya
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Katalog Bisnis Kader HIPMI
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Dukung produk dan jasa wirausaha karya mahasiswa kader HIPMI PT Universitas Telkom yang telah melalui kurasi mutu dan etika bisnis.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 border-b border-wine-950/10 pb-4">
          {[
            { id: "all", label: "Semua Kategori" },
            { id: "Food & Beverage", label: "Kuliner / F&B" },
            { id: "Teknologi & Jasa Kreatif", label: "Teknologi & Digital" },
            { id: "Fashion & Merchandise", label: "Fashion & Apparel" },
            { id: "Pendidikan & Edutech", label: "Edukasi & Jasa" }
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

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((biz) => (
            <div
              key={biz.id}
              className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-300 text-brand-burgundy font-mono text-[10px] font-bold">
                  {biz.category}
                </span>

                <div>
                  <h2 className="font-serif font-bold text-xl text-wine-950">
                    <Link href={`/karya-kader/bisnis/${biz.id}`} className="hover:text-brand-burgundy transition-colors">
                      {biz.name}
                    </Link>
                  </h2>
                  <p className="text-xs text-neutral-light mt-0.5">
                    Pemilik Usaha: <strong className="text-neutral-black">{biz.owner_name}</strong>
                  </p>
                  <p className="text-xs text-neutral-dark mt-2 line-clamp-3 leading-relaxed">
                    {biz.description}
                  </p>
                </div>

                {biz.products_services?.length > 0 && (
                  <div className="space-y-1 pt-2 border-t border-wine-950/10 text-xs">
                    <span className="text-[11px] text-neutral-light font-medium block">Produk / Layanan Unggulan:</span>
                    <ul className="list-disc list-inside text-neutral-dark space-y-0.5 text-[11px]">
                      {biz.products_services.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="truncate">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-wine-950/10 flex items-center justify-between">
                <span className="text-xs text-neutral-light font-mono flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{biz.contact_public}</span>
                </span>

                <Link
                  href={`/karya-kader/bisnis/${biz.id}`}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                >
                  <span>Detail Usaha</span>
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
