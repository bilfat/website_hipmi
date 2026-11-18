"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { DocumentItem } from "@/types/domain";
import {
  FileText,
  ChevronLeft,
  Save,
  Link2,
  FolderKanban,
  CheckCircle2
} from "lucide-react";

function DocumentFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore, currentUser } = useMockStore();
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const existing = recordId ? store.documents.find((d) => d.id === recordId) : null;

  const [formData, setFormData] = useState({
    title: existing?.title || "",
    category: existing?.category || "Proposal",
    file_or_url: existing?.file_or_url || "https://drive.google.com/file/d/demo-document",
    related_project_id: existing?.related_project_id || "",
    version: existing?.version || 1,
    status: (existing?.status as "draft" | "active" | "archived") || "active",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.file_or_url) {
      alert("Mohon lengkapi judul dokumen dan tautan URL berkas.");
      return;
    }

    if (existing) {
      const updated = store.documents.map((d) =>
        d.id === existing.id
          ? {
              ...d,
              ...formData,
              category: formData.category as any,
              version: Number(formData.version),
              updated_at: new Date().toISOString(),
            }
          : d
      );
      updateStore({ documents: updated });
    } else {
      const newDoc: DocumentItem = {
        id: `doc-${Date.now()}`,
        cabinet_id: activeCab.id,
        uploader_user_id: currentUser?.id || "usr-demo-01",
        title: formData.title,
        category: formData.category as any,
        file_or_url: formData.file_or_url,
        version: Number(formData.version),
        status: formData.status as any,
        related_project_id: formData.related_project_id || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      updateStore({
        documents: [newDoc, ...store.documents],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            category: "lpj",
            title: `Dokumen Diunggah: ${newDoc.title}`,
            message: `Berkas kategori ${newDoc.category} baru telah ditambahkan ke repositori sentral.`,
            source_route: `/organization/documents/${newDoc.id}`,
            read: false,
            created_at: new Date().toISOString()
          },
          ...store.notifications
        ]
      });
    }

    setSuccess(true);
    setTimeout(() => {
      router.push("/organization/documents");
    }, 1000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/documents"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Repositori Dokumen
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DOC-02
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Metadata Dokumen" : "Unggah / Daftarkan Dokumen"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Registrasi URL berkas proposal, surat pengantar, modul pelatihan, atau berkas legalitas.
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

        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dokumen berhasil disimpan ke repositori! Mengalihkan...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Judul Dokumen Resmi *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Proposal Sponsorship HIPMI Business Expo 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Kategori Berkas *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="Proposal">Proposal Kegiatan</option>
                <option value="Surat">Surat Resmi</option>
                <option value="LPJ">Laporan Pertanggungjawaban (LPJ)</option>
                <option value="Dokumentasi">Dokumentasi & Media</option>
                <option value="Lainnya">Lainnya / Berkas Umum</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Tautkan ke Program Kerja
              </label>
              <select
                value={formData.related_project_id}
                onChange={(e) => setFormData({ ...formData, related_project_id: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="">(Tidak Terkait Proker Khusus)</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Tautan URL Berkas (Cloud Storage / Google Drive / Docs) *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={formData.file_or_url}
                onChange={(e) => setFormData({ ...formData, file_or_url: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-sm text-wine-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Versi Dokumen
              </label>
              <input
                type="number"
                min={1}
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: Number(e.target.value) })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Status Dokumen
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="active">Active (Tersedia)</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived (Diarsipkan)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-wine-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Dokumen
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}

export default function DocumentFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir dokumen...</div>}>
      <DocumentFormContent />
    </Suspense>
  );
}
