"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArticleItem } from "@/types/domain";
import {
  Newspaper,
  ChevronLeft,
  Save,
  Globe,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Link2
} from "lucide-react";

function ArticleFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore, currentUser } = useMockStore();
  const existing = recordId ? store.articles.find((a) => a.id === recordId) : null;

  const [formData, setFormData] = useState({
    title: existing?.title || "",
    slug: existing?.slug || "",
    excerpt: existing?.excerpt || "",
    body: existing?.body || "",
    cover_url: existing?.cover_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    category: existing?.category || "Kabar Organisasi",
    author_name: existing?.author_name || currentUser?.full_name || "Redaksi HIPMI",
    status: (existing?.status as "draft" | "review" | "published" | "archived") || "draft",
  });

  const [notice, setNotice] = useState<string | null>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (val: string) => {
    setFormData({
      ...formData,
      title: val,
      slug: mode === "create" ? generateSlug(val) : formData.slug,
    });
  };

  const handleSave = (publishMode: "draft" | "published") => {
    if (!formData.title || !formData.body) {
      alert("Mohon lengkapi judul dan isi badan artikel.");
      return;
    }

    if (existing) {
      const updated = store.articles.map((a) =>
        a.id === existing.id
          ? {
              ...a,
              ...formData,
              status: publishMode,
              published_at: publishMode === "published" ? new Date().toISOString() : a.published_at,
            }
          : a
      );
      updateStore({ articles: updated });
    } else {
      const newArt: ArticleItem = {
        id: `art-${Date.now()}`,
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        body: formData.body,
        cover_url: formData.cover_url,
        category: formData.category,
        author_name: formData.author_name,
        status: publishMode,
        published_at: publishMode === "published" ? new Date().toISOString() : undefined,
        created_at: new Date().toISOString(),
      };
      updateStore({ articles: [newArt, ...store.articles] });
    }

    setNotice(
      publishMode === "published"
        ? "Artikel resmi DIPUBLIKASIKAN ke portal publik (PUB-13)!"
        : "Draft artikel berhasil disimpan!"
    );

    setTimeout(() => {
      router.push("/organization/cms/articles");
    }, 1200);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/cms/articles"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Manajemen Berita
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-05
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Artikel Berita" : "Tulis Artikel Baru"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Editor publikasi kabar organisasi, wawasan entrepreneurship, dan rilis pers resmi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-semibold text-wine-600 hover:text-wine-900 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Batal
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Judul Artikel *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: HIPMI PT Telkom Gelar Seminar Nasional Kewirausahaan Pemuda"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-base font-bold font-display px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Slug URL (Kanonikal)
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-wine-200 text-wine-700 bg-surface-base"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Kategori Berita *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-wine-200 text-wine-900 bg-white"
              >
                <option value="Kabar Organisasi">Kabar Organisasi</option>
                <option value="Opini & Wawasan">Opini & Wawasan</option>
                <option value="Siaran Pers">Siaran Pers</option>
                <option value="Liputan Kegiatan">Liputan Kegiatan</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              URL Gambar Cover Utama *
            </label>
            <input
              type="url"
              required
              value={formData.cover_url}
              onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
              className="w-full text-xs font-mono p-2.5 rounded-xl border border-wine-200 text-wine-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Ringkasan / Excerpt (Lead Paragraph)
            </label>
            <textarea
              rows={2}
              placeholder="1-2 kalimat ringkasan yang menarik untuk cuplikan kartu berita..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-wine-200 text-wine-800 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Isi Lengkap Artikel (Body Markdown / Teks) *
            </label>
            <textarea
              rows={10}
              required
              placeholder="Tuliskan berita lengkap di sini..."
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full text-xs p-3.5 rounded-xl border border-wine-200 text-wine-900 leading-relaxed font-sans"
            />
          </div>

          <div className="pt-4 border-t border-wine-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSave("draft")}
              className="px-4 py-2.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" /> Simpan Draft
            </button>

            <button
              type="button"
              onClick={() => handleSave("published")}
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
            >
              <Globe className="w-4 h-4" /> Publikasikan Artikel
            </button>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}

export default function ArticleFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat editor artikel...</div>}>
      <ArticleFormContent />
    </Suspense>
  );
}
