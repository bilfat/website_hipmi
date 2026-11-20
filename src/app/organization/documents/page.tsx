"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
} from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { DocumentItem } from "@/types/domain";
import {
  FileText,
  Search,
  Plus,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  History,
  ArrowRight,
} from "lucide-react";

type DocTab = "docs" | "lpj";

export default function OrganizationDocumentsAndLpjPage() {
  const { store, currentUser } = useMockStore();

  const [activeTab, setActiveTab] = useState<DocTab>("docs");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Upload Document form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DocumentItem["category"]>("Proposal");
  const [fileUrl, setFileUrl] = useState("");
  const [projectId, setProjectId] = useState("");

  const documents = (store.documents || []).filter((doc) => {
    if (categoryFilter !== "all" && doc.category !== categoryFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (!doc.title.toLowerCase().includes(q) && !doc.category.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const lpjs = store.lpjs || [];

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fileUrl.trim()) return;
    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

    mutateStore((draft) => {
      draft.documents.unshift({
        id: `doc-${Date.now()}`,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        uploader_user_id: currentUser.id,
        title: title.trim(),
        category,
        file_or_url: fileUrl.trim(),
        version: 1,
        status: "active",
        related_project_id: projectId || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      addActivityHistory(currentUser.name, "mengunggah dokumen baru", title.trim(), "Dokumen & LPJ");
    });

    setTitle("");
    setFileUrl("");
    setProjectId("");
    setUploadOpen(false);
    setFeedback("Dokumen berhasil disimpan ke Arsip Digital (Versi 1).");
  };

  const handleBumpVersion = (docId: string) => {
    mutateStore((draft) => {
      const target = draft.documents.find((d) => d.id === docId);
      if (target) {
        target.version += 1;
        target.updated_at = new Date().toISOString();
      }
    });
    setSelectedDoc((prev) => (prev ? { ...prev, version: prev.version + 1 } : null));
    setFeedback("Versi dokumen diperbarui. Versi sebelumnya tetap tersimpan di riwayat.");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Repositori Versioning &amp; Pertanggungjawaban
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Dokumen &amp; LPJ Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Arsip dokumen dengan riwayat versi persetujuan serta manajemen LPJ 7-bagian yang menarik data kehadiran &amp; keuangan secara otomatis.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Unggah Dokumen</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Sliding Tab Switcher */}
      <div className="p-1.5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm inline-flex gap-1">
        {[
          { id: "docs", label: `Arsip Dokumen (${store.documents.length})`, icon: FileText },
          { id: "lpj", label: `LPJ 7-Bagian (${lpjs.length})`, icon: BookOpen },
        ].map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as DocTab)}
              className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                active ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="doc-lpj-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DOKUMEN & VERSI */}
      {activeTab === "docs" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul atau kategori dokumen..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
            >
              <option value="all">Semua Kategori</option>
              <option value="Proposal">Proposal</option>
              <option value="Surat">Surat</option>
              <option value="LPJ">LPJ</option>
              <option value="Dokumentasi">Dokumentasi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => {
              const proj = doc.related_project_id
                ? store.projects.find((p) => p.id === doc.related_project_id)
                : null;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {doc.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                        Versi {doc.version}.0
                      </span>
                    </div>
                    <strong className="font-serif text-base text-wine-950 block">{doc.title}</strong>
                    {proj && (
                      <span className="text-[11px] text-neutral-dark block">
                        Proker: {proj.name}
                      </span>
                    )}
                  </div>
                  <div className="pt-2 border-t border-[#E9E1DC] flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-neutral-light">
                      Diperbarui {new Date(doc.updated_at).toLocaleDateString("id-ID")}
                    </span>
                    <span className="font-semibold text-brand-burgundy inline-flex items-center gap-1">
                      <History className="w-3.5 h-3.5" />
                      Riwayat Versi
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LPJ 7-BAGIAN */}
      {activeTab === "lpj" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lpjs.map((lpj) => {
            const proj = store.projects.find((p) => p.id === lpj.project_id);
            return (
              <div
                key={lpj.id}
                className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                      Status: {lpj.status}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-light">LPJ 7-Bagian</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-wine-950">{lpj.title}</h3>
                  <p className="text-xs text-neutral-dark line-clamp-2">{lpj.section_2_summary}</p>
                  {proj && (
                    <span className="text-[11px] text-neutral-dark block">
                      Proker: <strong>{proj.name}</strong>
                    </span>
                  )}
                </div>

                <Link
                  href={`/organization/lpj/${lpj.id}`}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 self-start shadow-sm"
                >
                  <span>Buka &amp; Periksa 7 Bagian</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Unggah Dokumen */}
      <EditorialModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        badge="Repositori Dokumen"
        title="Unggah / Daftarkan Dokumen Baru"
        subtitle="Simpan tautan dokumen resmi organisasi agar riwayat versinya tercatat rapi."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setUploadOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="upload-doc-form"
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Simpan Dokumen
            </button>
          </>
        }
      >
        <form id="upload-doc-form" onSubmit={handleUploadDoc} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Judul Dokumen *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Proposal Sponsorship Business Expo 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DocumentItem["category"])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="Proposal">Proposal</option>
                <option value="Surat">Surat</option>
                <option value="LPJ">LPJ</option>
                <option value="Dokumentasi">Dokumentasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Proker Terkait</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="">Dokumen Umum Organisasi</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">URL Dokumen (Google Drive / Docs) *</label>
            <input
              type="url"
              required
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 2: Detail & Riwayat Versi Dokumen */}
      <EditorialModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        badge={selectedDoc?.category || "Dokumen"}
        title={selectedDoc?.title || "Detail Dokumen"}
        subtitle="Setiap perubahan dokumen final tetap mempertahankan versi sebelumnya yang digunakan untuk persetujuan."
        maxWidth="md"
        footer={
          selectedDoc && (
            <>
              <button
                type="button"
                onClick={() => handleBumpVersion(selectedDoc.id)}
                className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white hover:bg-[#FCF8F6] text-xs font-semibold text-wine-950"
              >
                Catat Versi Baru (v{selectedDoc.version + 1}.0)
              </button>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </>
          )
        }
      >
        {selectedDoc && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Tautan Dokumen Aktif (Versi {selectedDoc.version}.0)
              </span>
              <a
                href={selectedDoc.file_or_url}
                target="_blank"
                rel="noreferrer"
                className="text-brand-burgundy font-mono text-[11px] hover:underline inline-flex items-center gap-1.5 break-all"
              >
                <span>{selectedDoc.file_or_url}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <div className="space-y-2">
              <strong className="text-wine-950 block">Riwayat Versi Tersimpan</strong>
              {Array.from({ length: selectedDoc.version }, (_, idx) => selectedDoc.version - idx).map(
                (v) => (
                  <div
                    key={v}
                    className="p-3 rounded-xl bg-white border border-[#E9E1DC] flex items-center justify-between"
                  >
                    <span className="font-mono font-bold text-wine-950">Versi {v}.0</span>
                    <span className="text-[10px] text-neutral-dark">
                      {v === selectedDoc.version ? "Versi Aktif Terbaru" : "Arsip Versi Sebelumnya"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
