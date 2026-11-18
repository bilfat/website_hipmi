"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { AchievementItem } from "@/types/domain";
import {
  Award,
  ChevronLeft,
  Save,
  Globe,
  Link2,
  Users,
  CheckCircle2
} from "lucide-react";

function AchievementFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore } = useMockStore();
  const existing = recordId ? store.achievements.find((a) => a.id === recordId) : null;

  const [formData, setFormData] = useState({
    title: existing?.title || "",
    category: existing?.category || "Kompetisi Bisnis",
    level: (existing?.level as "Nasional" | "Internasional" | "Regional" | "Universitas") || "Nasional",
    year: existing?.year || "2026",
    description: existing?.description || "",
    cadre_names_input: existing ? existing.cadre_names.join(", ") : "Muhammad Rizky Pratama",
    documentation_url: existing?.documentation_url || "https://drive.google.com/drive/folders/prestasi-demo",
    status: (existing?.status as "draft" | "review" | "published") || "published",
  });

  const [notice, setNotice] = useState<string | null>(null);

  const handleSave = (publishState: "draft" | "published") => {
    if (!formData.title) {
      alert("Mohon isi judul kejuaraan/prestasi.");
      return;
    }

    const cadresArray = formData.cadre_names_input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (existing) {
      const updated = store.achievements.map((a) =>
        a.id === existing.id
          ? {
              ...a,
              ...formData,
              cadre_names: cadresArray,
              status: publishState,
              published_at: publishState === "published" ? new Date().toISOString() : a.published_at,
            }
          : a
      );
      updateStore({ achievements: updated });
    } else {
      const newAch: AchievementItem = {
        id: `ach-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        level: formData.level,
        year: formData.year,
        description: formData.description,
        linked_cadre_ids: ["usr-demo-01"],
        cadre_names: cadresArray,
        documentation_url: formData.documentation_url,
        status: publishState,
        published_at: publishState === "published" ? new Date().toISOString() : undefined,
      };
      updateStore({ achievements: [newAch, ...store.achievements] });
    }

    setNotice(
      publishState === "published"
        ? "Prestasi kader berhasil diverifikasi dan DIPUBLIKASIKAN ke Beranda (PUB-01) & Showcase (PUB-20)!"
        : "Draft data prestasi kader berhasil disimpan!"
    );

    setTimeout(() => {
      router.push("/organization/cms/achievements");
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
                href="/organization/cms/achievements"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Manajemen Prestasi
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-07
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "review" ? "Review & Verifikasi Prestasi Kader" : "Catat Prestasi Kader"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pencatatan rekor penghargaan individu maupun tim perwakilan HIPMI PT Telkom (Multi-Kader Support).
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
              Nama Prestasi / Gelar Juara *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Juara 1 Business Plan Competition Telkom University 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-base font-bold font-display px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-950"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Nama Kader Peraih (Dukungan Multi-Kader / Tim) *
            </label>
            <input
              type="text"
              required
              placeholder="Pisahkan nama dengan koma jika terdiri dari beberapa kader (contoh: Ahmad Fauzan, Rania Az-Zahra)"
              value={formData.cadre_names_input}
              onChange={(e) => setFormData({ ...formData, cadre_names_input: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-wine-200 font-medium text-wine-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Tingkat Kejuaraan *
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                className="w-full text-xs p-2.5 rounded-xl border border-wine-200 text-wine-900 bg-white"
              >
                <option value="Internasional">Internasional</option>
                <option value="Nasional">Nasional</option>
                <option value="Regional">Regional</option>
                <option value="Universitas">Universitas</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Tahun Pencapaian *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-wine-200 text-wine-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Kategori Kompetisi
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-wine-200 text-wine-900"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Tautan URL Dokumentasi / Sertifikat Bukti *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={formData.documentation_url}
                onChange={(e) => setFormData({ ...formData, documentation_url: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wine-200 text-xs font-mono text-wine-900"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Deskripsi Singkat Karya / Produk yang Dilombakan
            </label>
            <textarea
              rows={3}
              placeholder="Ceritakan ringkasan produk atau inovasi yang membawa kemenangan..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-wine-200 text-wine-900 leading-relaxed"
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
              <Globe className="w-4 h-4" /> Sahkan & Publish ke Beranda (PUB-01)
            </button>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}

export default function AchievementFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir prestasi...</div>}>
      <AchievementFormContent />
    </Suspense>
  );
}
