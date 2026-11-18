"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  FileText,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send,
  RotateCcw,
  Hash,
  Share2,
  Building,
  User,
  CheckSquare,
  Square
} from "lucide-react";

export default function CorrespondenceDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = use(params);
  const router = useRouter();
  const { store, updateStore, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const letter = store.correspondence.find((c) => c.id === requestId);

  const [checklist, setChecklist] = useState(
    letter?.checklist || [
      { item: "Format proposal / isi surat sesuai template resmi HIPMI PT Telkom", checked: false },
      { item: "Kop surat resmi Kabinet Arthakarsa terpasang benar", checked: false },
      { item: "Tanda tangan Ketua Pelaksana / Kakom pengaju telah lengkap", checked: false },
      { item: "Lampiran administrasi pendukung telah disematkan", checked: false }
    ]
  );
  const [reviewerNotes, setReviewerNotes] = useState(letter?.reviewer_notes || "");
  const [reopenReason, setReopenReason] = useState("");
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!letter) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Surat Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID pengajuan "{requestId}" tidak terdaftar.</p>
          <Link
            href="/organization/correspondence/requests"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Surat
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const allChecklistCompleted = checklist.every((c) => c.checked);

  const toggleChecklistItem = (index: number) => {
    const updated = [...checklist];
    updated[index].checked = !updated[index].checked;
    setChecklist(updated);

    const updatedLetters = store.correspondence.map((c) =>
      c.id === letter.id ? { ...c, checklist: updated, updated_at: new Date().toISOString() } : c
    );
    updateStore({ correspondence: updatedLetters });
  };

  const handleApprove = () => {
    if (!allChecklistCompleted) {
      alert("Seluruh 4 butir checklist kelengkapan administrasi wajib dicentang sebelum persetujuan Sekum.");
      return;
    }

    const updatedLetters = store.correspondence.map((c) =>
      c.id === letter.id
        ? {
            ...c,
            status: "approved" as const,
            checklist,
            reviewer_notes: reviewerNotes,
            updated_at: new Date().toISOString(),
          }
        : c
    );
    updateStore({
      correspondence: updatedLetters,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "correspondence",
          title: `Surat Disetujui Sekum: ${letter.title}`,
          message: `Surat Anda telah disetujui dan siap untuk proses penomoran resmi (COR-05).`,
          source_route: `/organization/correspondence/${letter.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });
    setActionNotice("Surat berhasil disetujui! Anda dapat langsung menerbitkan nomor surat resmi.");
  };

  const handleRequestRevision = () => {
    if (!reviewerNotes) {
      alert("Mohon berikan catatan revisi agar pengaju memahami bagian yang harus diperbaiki.");
      return;
    }

    const updatedLetters = store.correspondence.map((c) =>
      c.id === letter.id
        ? {
            ...c,
            status: "revision_needed" as const,
            checklist,
            reviewer_notes: reviewerNotes,
            updated_at: new Date().toISOString(),
          }
        : c
    );
    updateStore({
      correspondence: updatedLetters,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "correspondence",
          title: `Revisi Surat Diperlukan: ${letter.title}`,
          message: `Sekum meminta revisi: "${reviewerNotes}"`,
          source_route: `/organization/correspondence/${letter.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });
    setActionNotice("Permintaan revisi berhasil dikirim ke pengaju.");
  };

  const handleReopen = () => {
    if (!reopenReason) {
      alert("Alasan pembukaan kembali (reopen) wajib diisi sesuai aturan audit persuratan.");
      return;
    }

    const updatedLetters = store.correspondence.map((c) =>
      c.id === letter.id
        ? {
            ...c,
            status: "in_review" as const,
            reopen_reason: reopenReason,
            updated_at: new Date().toISOString(),
          }
        : c
    );
    updateStore({ correspondence: updatedLetters });
    setShowReopenModal(false);
    setActionNotice("Surat berhasil di-reopen untuk peninjauan ulang.");
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/correspondence/requests"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Daftar Pengajuan
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              COR-04
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/organization/correspondence/form?mode=edit&recordId=${letter.id}`}
              className="px-3 py-1.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
            >
              Edit Form
            </Link>
          </div>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Letter Details Card */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-wine-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  letter.status === "issued"
                    ? "bg-emerald-100 text-emerald-800"
                    : letter.status === "revision_needed"
                    ? "bg-rose-100 text-rose-800"
                    : letter.status === "approved"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {letter.status}
              </span>

              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                {letter.routing}
              </span>

              {letter.generated_letter_number && (
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                  {letter.generated_letter_number}
                </span>
              )}
            </div>

            <div className="text-xs text-wine-500 font-mono">
              Diajukan: {new Date(letter.created_at).toLocaleDateString("id-ID")}
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-wine-950">
              {letter.title}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Tujuan / Instansi: <span className="font-semibold text-wine-900">{letter.purpose}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-base border border-wine-100 text-xs">
            <div>
              <span className="text-wine-500">Pengaju:</span>
              <p className="font-bold text-wine-900">{letter.submitter_name}</p>
              <p className="text-wine-600">{letter.unit_name}</p>
            </div>
            <div>
              <span className="text-wine-500">Tautan Berkas Dokumen:</span>
              <p className="mt-0.5">
                <a
                  href={letter.document_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Buka Google Docs Surat
                </a>
              </p>
            </div>
          </div>

          {letter.description && (
            <div className="text-xs space-y-1">
              <span className="font-bold text-wine-900 uppercase">Keterangan / Latar Belakang:</span>
              <p className="text-wine-700 bg-wine-50/50 p-3 rounded-lg border border-wine-100 whitespace-pre-line">
                {letter.description}
              </p>
            </div>
          )}

          {/* Sekum Mandatory Checklist per PRD */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                  Checklist Verifikasi Administrasi Sekum (Wajib Lengkap Sebelum Approve)
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-brand-burgundy">
                {checklist.filter((c) => c.checked).length} / {checklist.length} Lengkap
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleChecklistItem(idx)}
                  className="w-full text-left p-2.5 rounded-lg bg-white border border-wine-100 hover:border-wine-300 flex items-start gap-3 transition-all text-xs"
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-wine-400 shrink-0 mt-0.5" />
                  )}
                  <span className={item.checked ? "text-wine-950 font-medium line-through opacity-80" : "text-wine-800"}>
                    {item.item}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Reviewer Notes & Revision Section */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-wine-900 uppercase">
              Catatan Peninjauan / Feedback Sekum
            </label>
            <textarea
              rows={3}
              value={reviewerNotes}
              onChange={(e) => setReviewerNotes(e.target.value)}
              placeholder="Berikan instruksi revisi atau persetujuan untuk pengaju..."
              className="w-full text-xs p-3 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900"
            />
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-wine-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {letter.status === "issued" && (
                <button
                  type="button"
                  onClick={() => setShowReopenModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reopen Surat
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRequestRevision}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all"
              >
                Minta Revisi
              </button>

              <button
                type="button"
                disabled={!allChecklistCompleted}
                onClick={handleApprove}
                className={`px-5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                  allChecklistCompleted
                    ? "bg-brand-burgundy hover:bg-wine-900 text-white shadow-sm"
                    : "bg-wine-100 text-wine-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Setujui Surat (Sekum)
              </button>

              {letter.status === "approved" && (
                <Link
                  href="/organization/correspondence/numbering"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Hash className="w-4 h-4" /> Terbitkan Nomor Resmi (COR-05)
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Reopen Modal */}
        {showReopenModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-wine-200 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-wine-950">
                Konfirmasi Reopen Surat Selesai
              </h3>
              <p className="text-xs text-wine-600">
                Sesuai aturan audit COR, pembukaan kembali surat yang telah berstatus issued wajib menyertakan alasan resmi.
              </p>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-wine-900">Alasan Reopen *</label>
                <textarea
                  rows={3}
                  value={reopenReason}
                  onChange={(e) => setReopenReason(e.target.value)}
                  placeholder="Contoh: Perubahan tanggal kegiatan dari pihak Dekanat Telkom..."
                  className="w-full text-xs p-3 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReopenModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-wine-200 text-xs font-medium text-wine-700"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleReopen}
                  className="px-4 py-1.5 rounded-lg bg-brand-burgundy text-white text-xs font-semibold"
                >
                  Konfirmasi Reopen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}
