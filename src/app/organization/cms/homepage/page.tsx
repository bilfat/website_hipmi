"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  LayoutTemplate,
  ChevronLeft,
  Save,
  CheckCircle2,
  ExternalLink,
  Eye,
  Sparkles
} from "lucide-react";

export default function HomepageEditorPage() {
  const { store } = useMockStore();

  const [formData, setFormData] = useState({
    hero_badge: "KABINET ARTHAKARSA 2026/2027",
    hero_headline: "Mencetak Wirausaha Muda Berintegritas & Berdaya Saing Global",
    hero_subheadline: "Wadah kolaborasi inkubasi bisnis, akselerasi karier pengusaha, dan kepemimpinan strategis mahasiswa Universitas Telkom.",
    cta_primary_label: "Jelajahi Program Kerja",
    cta_primary_link: "/organisasi/bidang",
    cta_secondary_label: "Daftar Anggota / Diklat",
    cta_secondary_link: "/daftar",
    featured_quote: "Pengusaha Pejuang — Pejuang Pengusaha. Menumbuhkan ekosistem wirausaha yang inklusif dan berkelanjutan di tanah Telkom University.",
  });

  const [notice, setNotice] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Konfigurasi konten beranda berhasil diperbarui!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/cms"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> CMS Dashboard
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-02
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Homepage Content Editor
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengaturan copywriting section hero beranda publik, tombol ajakan aksi (CTA), dan kutipan editorial pimpinan.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Eye className="w-4 h-4 text-brand-burgundy" /> Lihat Beranda Publik
          </Link>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Editor Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-wine-950 border-b border-wine-100 pb-2">
              1. Hero Banner Utama
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Pill / Badge Atas *</label>
              <input
                type="text"
                required
                value={formData.hero_badge}
                onChange={(e) => setFormData({ ...formData, hero_badge: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 font-mono text-wine-900"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Headline Judul Besar *</label>
              <input
                type="text"
                required
                value={formData.hero_headline}
                onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 font-display font-bold text-wine-950 text-base"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Sub-headline / Deskripsi Pengantar *</label>
              <textarea
                rows={2}
                required
                value={formData.hero_subheadline}
                onChange={(e) => setFormData({ ...formData, hero_subheadline: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-800 leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-wine-950 border-b border-wine-100 pb-2">
              2. Tombol Navigasi Cepat (Call to Action)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-wine-900">Label Tombol Primer</label>
                <input
                  type="text"
                  value={formData.cta_primary_label}
                  onChange={(e) => setFormData({ ...formData, cta_primary_label: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-wine-900">URL Tombol Primer</label>
                <input
                  type="text"
                  value={formData.cta_primary_link}
                  onChange={(e) => setFormData({ ...formData, cta_primary_link: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-wine-200 font-mono text-wine-900"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-wine-950 border-b border-wine-100 pb-2">
              3. Kutipan Editorial Pimpinan
            </h3>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Kutipan Semboyan / Vision Statement</label>
              <textarea
                rows={3}
                value={formData.featured_quote}
                onChange={(e) => setFormData({ ...formData, featured_quote: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 font-serif italic text-wine-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-wine-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" /> Simpan Pengaturan Beranda
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}
