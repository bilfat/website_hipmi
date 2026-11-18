"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { CorrespondenceRequest, CorrespondenceType } from "@/types/domain";
import {
  FileText,
  ChevronLeft,
  Save,
  Send,
  Link2,
  Building,
  Info,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

function CorrespondenceFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId");

  const { store, updateStore, currentUser } = useMockStore();

  const existing = recordId ? store.correspondence.find((c) => c.id === recordId) : null;
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

  const [formData, setFormData] = useState({
    title: existing?.title || "",
    purpose: existing?.purpose || "",
    unit_name: existing?.unit_name || "Bidang 1: Kaderisasi & Organisasi",
    routing: (existing?.routing as CorrespondenceType) || "Surat Umum",
    description: existing?.description || "",
    document_url: existing?.document_url || "https://docs.google.com/document/d/demo-hipmi-letter",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (actionType: "draft" | "submitted") => {
    if (!formData.title || !formData.purpose) {
      alert("Mohon lengkapi judul dan tujuan surat.");
      return;
    }

    if (existing) {
      const updated = store.correspondence.map((c) =>
        c.id === existing.id
          ? {
              ...c,
              ...formData,
              status: actionType,
              updated_at: new Date().toISOString(),
            }
          : c
      );
      updateStore({ correspondence: updated });
    } else {
      const newLetter: CorrespondenceRequest = {
        id: `corr-${Date.now()}`,
        cabinet_id: activeCab.id,
        submitter_user_id: currentUser?.id || "usr-demo-01",
        submitter_name: currentUser?.full_name || "Pengaju Surat Demo",
        unit_name: formData.unit_name,
        title: formData.title,
        purpose: formData.purpose,
        routing: formData.routing,
        description: formData.description,
        document_url: formData.document_url,
        status: actionType,
        checklist: [
          { item: "Format proposal / isi surat sesuai template resmi HIPMI PT Telkom", checked: false },
          { item: "Kop surat resmi Kabinet Arthakarsa terpasang benar", checked: false },
          { item: "Tanda tangan Ketua Pelaksana / Kakom pengaju telah lengkap", checked: false },
          { item: "Lampiran administrasi pendukung telah disematkan", checked: false }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      updateStore({
        correspondence: [newLetter, ...store.correspondence],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            category: "correspondence",
            title: `Pengajuan Surat Baru: ${formData.title}`,
            message: `${newLetter.submitter_name} (${formData.unit_name}) telah mengajukan surat untuk direview Sekum.`,
            source_route: `/organization/correspondence/${newLetter.id}`,
            read: false,
            created_at: new Date().toISOString()
          },
          ...store.notifications
        ]
      });
    }

    setStatusMessage(
      actionType === "submitted"
        ? "Surat berhasil diajukan langsung ke Sekum! Mengalihkan..."
        : "Draft surat berhasil disimpan!"
    );

    setTimeout(() => {
      router.push("/organization/correspondence/requests");
    }, 1200);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/correspondence"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Persuratan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                COR-03
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              {mode === "edit" ? "Edit Pengajuan Surat" : "Form Pengajuan Surat Resmi"}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengajuan surat dinas, permohonan dispensasi, izin kegiatan, atau pengantar Ditmawa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-semibold text-wine-600 hover:text-wine-900 inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali
          </button>
        </div>

        {/* Direct Submit Notice per PRD */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Kewenangan Direct Submit Berizin</p>
            <p className="text-amber-800 text-xs mt-0.5">
              Sesuai aturan PRD v1.1, staf berizin dapat mengajukan surat langsung ke Sekretariat Jenderal tanpa memerlukan persetujuan berjenjang tambahan dari Kakom.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="p-4 rounded-xl bg-surface-base border border-wine-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-wine-500 font-medium">Pengaju Dokumen:</span>
              <p className="font-bold text-wine-900">{currentUser?.full_name || "Pengguna Demo"}</p>
              <p className="text-wine-600 font-mono text-[11px]">{currentUser?.email}</p>
            </div>
            <div>
              <span className="text-wine-500 font-medium">Kabinet Berjalan:</span>
              <p className="font-bold text-wine-900">{activeCab.name} ({activeCab.period})</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Judul Bebas Surat / Perihal *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Permohonan Peminjaman Gedung Damar untuk Seminar Kewirausahaan"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy font-medium text-wine-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Unit Pengaju / Kompartemen *
              </label>
              <select
                value={formData.unit_name}
                onChange={(e) => setFormData({ ...formData, unit_name: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="Bidang 1: Kaderisasi & Organisasi">Bidang 1: Kaderisasi & Organisasi</option>
                <option value="Kompartemen Media Komunikasi (Medkom)">Kompartemen Media Komunikasi (Medkom)</option>
                <option value="Kompartemen Pengembangan Usaha (PU)">Kompartemen Pengembangan Usaha (PU)</option>
                <option value="Kepanitiaan HIPMI Business Expo 2026">Kepanitiaan HIPMI Business Expo 2026</option>
                <option value="Sekretariat Jenderal">Sekretariat Jenderal</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
                Jalur Routing Pengajuan *
              </label>
              <select
                value={formData.routing}
                onChange={(e) => setFormData({ ...formData, routing: e.target.value as CorrespondenceType })}
                className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900 bg-white"
              >
                <option value="Surat Umum">Surat Umum (Internal / Eksternal Mitra)</option>
                <option value="Untuk Ditmawa">Untuk Ditmawa (Pengantar & Izin Kampus)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Tujuan Surat / Instansi Penerima *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Direktur Kemahasiswaan (Ditmawa) Telkom University / Pimpinan Bank BJB"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              URL Tautan Dokumen (Google Docs / Cloud Drive) *
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                placeholder="https://docs.google.com/document/d/..."
                value={formData.document_url}
                onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-sm text-wine-900"
              />
            </div>
            <p className="text-[11px] text-wine-500">
              *Dokumentasi persuratan menggunakan URL dokumen online (Google Docs); tidak mewajibkan unggah berkas mentah.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-wine-900 uppercase tracking-wider">
              Deskripsi Singkat / Kebutuhan Administrasi
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan latar belakang surat, batas waktu respons yang diharapkan, atau keterangan lain..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy text-wine-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-wine-100 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              className="px-4 py-2.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              Simpan Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("submitted")}
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              Submit Langsung ke Sekum
            </button>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}

export default function CorrespondenceFormPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat formulir persuratan...</div>}>
      <CorrespondenceFormContent />
    </Suspense>
  );
}
