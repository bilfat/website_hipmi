"use client";

import { useState, useEffect } from "react";
import {
  MockStoreData,
  User,
  CorrespondenceRequest,
  CorrespondenceType,
  DitmawaDispatchStatus,
} from "@/types/domain";
import {
  mutateStore,
  addActivityHistory,
  addAuditEvent,
} from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  Plus,
  Trash2,
  Send,
  ExternalLink,
  CheckCircle2,
  Circle,
  AlertCircle,
  FileCheck,
  Hash,
} from "lucide-react";

const QUICK_REQUIREMENT_PRESETS = [
  "Nomor Surat Resmi BPC HIPMI",
  "Tanda Tangan Ketua Umum",
  "Stempel Basah / Digital BPC",
  "Lampiran Proposal Kegiatan",
  "Lampiran RAB / Anggaran",
  "Pengantar ke Ditmawa",
];

const LETTER_STATUS_LABELS: Record<string, string> = {
  draft: "Draf",
  submitted: "Menunggu Review Sekum",
  in_review: "Sedang Diperiksa Sekum",
  revision: "Perlu Revisi",
  revision_needed: "Perlu Revisi",
  approved: "Disetujui Sekum",
  issued: "Nomor Terbit",
  completed: "Selesai",
  archived: "Diarsipkan",
};

interface CreateLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  defaultUnitName: string;
  lockedProjectId?: string;
  onSuccess?: (msg: string) => void;
}

export function CreateLetterModal({
  isOpen,
  onClose,
  store,
  currentUser,
  defaultUnitName,
  lockedProjectId,
  onSuccess,
}: CreateLetterModalProps) {
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [routing, setRouting] = useState<CorrespondenceType>("Surat Umum");
  const [docUrl, setDocUrl] = useState("");
  const [projectId, setProjectId] = useState(lockedProjectId || "");
  const [requirements, setRequirements] = useState<string[]>([
    "Pemeriksaan format kop & tata bahasa surat",
    "Tanda tangan Ketua Umum / Pejabat Berwenang",
    "Penerbitan Nomor Surat Resmi",
  ]);
  const [newReqInput, setNewReqInput] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setTitle("");
    setPurpose("");
    setRouting("Surat Umum");
    setDocUrl("");
    setProjectId(lockedProjectId || "");
    setRequirements([
      "Pemeriksaan format kop & tata bahasa surat",
      "Tanda tangan Ketua Umum / Pejabat Berwenang",
      "Penerbitan Nomor Surat Resmi",
    ]);
    setNewReqInput("");
  }, [isOpen, lockedProjectId]);

  const handleAddRequirement = (text?: string) => {
    const val = (text ?? newReqInput).trim();
    if (!val) return;
    if (!requirements.includes(val)) {
      setRequirements((prev) => [...prev, val]);
    }
    if (!text) setNewReqInput("");
  };

  const handleRemoveRequirement = (idx: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !docUrl.trim()) return;

    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
    const resolvedProjectId = lockedProjectId || projectId || undefined;
    const proj = resolvedProjectId
      ? store.projects.find((p) => p.id === resolvedProjectId)
      : undefined;

    const finalChecklist =
      requirements.length > 0
        ? requirements.map((item) => ({ item, checked: false }))
        : [{ item: "Pemeriksaan kelengkapan dokumen surat", checked: false }];

    mutateStore((draft) => {
      draft.correspondence.unshift({
        id: `corr-${Date.now()}`,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        project_id: resolvedProjectId,
        submitter_user_id: currentUser.id,
        submitter_name: currentUser.name,
        unit_name: proj ? proj.name : defaultUnitName,
        title: title.trim(),
        purpose: purpose.trim() || "Keperluan operasional organisasi",
        routing,
        description: purpose.trim() || title.trim(),
        document_url: docUrl.trim(),
        status: "submitted",
        checklist: finalChecklist,
        ditmawa_status: routing === "Untuk Ditmawa" ? "not_dispatched" : "not_required",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      addActivityHistory(
        currentUser.name,
        "mengajukan surat baru beserta poin kebutuhan",
        title.trim(),
        "Persuratan"
      );
    });

    onSuccess?.(
      `Pengajuan surat "${title.trim()}" (${finalChecklist.length} poin kebutuhan) berhasil dikirim ke Sekum.`
    );
    onClose();
  };

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge="Pengajuan Persuratan"
      title="Ajukan Surat Baru"
      subtitle="Lampirkan URL Google Docs / Drive dan tentukan poin kebutuhan surat secara fleksibel agar progres pengecekan Sekum dapat dipantau."
      maxWidth="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
          >
            Batal
          </button>
          <button
            type="submit"
            form="shared-create-letter-form"
            className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim ke Sekum</span>
          </button>
        </>
      }
    >
      <form id="shared-create-letter-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-wine-950">
              Judul Surat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Surat Peminjaman Aula Gedung B"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Routing Surat</label>
            <select
              value={routing}
              onChange={(e) => setRouting(e.target.value as CorrespondenceType)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            >
              <option value="Surat Umum">Surat Umum (Internal / Eksternal)</option>
              <option value="Untuk Ditmawa">Untuk Ditmawa Telkom University</option>
            </select>
          </div>

          {!lockedProjectId && (
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Program Kerja Terkait</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="">Surat Unit / Umum</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-wine-950">
              URL Dokumen (Google Docs / Drive) <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              required
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
              placeholder="https://docs.google.com/document/d/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>

          <div className="sm:col-span-2 space-y-1">
            <label className="font-semibold text-wine-950">Keperluan &amp; Keterangan</label>
            <textarea
              rows={2}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Jelaskan konteks atau tenggat waktu surat..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>
        </div>

        {/* Flexible Letter Requirements Checklist Builder */}
        <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <strong className="text-wine-950 block">
                Poin Kebutuhan Surat (Fleksibel — {requirements.length} poin)
              </strong>
              <span className="text-[11px] text-neutral-dark">
                Poin ini akan muncul sebagai checklist di Sekum; setiap poin yang dicentang Sekum langsung terlihat progresnya oleh Anda.
              </span>
            </div>
          </div>

          {/* Current Points */}
          <div className="space-y-1.5">
            {requirements.map((req, idx) => (
              <div
                key={`${req}-${idx}`}
                className="px-3 py-2 rounded-xl bg-white border border-[#E9E1DC] flex items-center justify-between gap-2"
              >
                <span className="text-wine-950 font-medium">{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(idx)}
                  className="text-neutral-light hover:text-rose-600 p-1 rounded-lg transition-colors shrink-0"
                  aria-label="Hapus poin kebutuhan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Custom Requirement Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newReqInput}
              onChange={(e) => setNewReqInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddRequirement();
                }
              }}
              placeholder="Tambah poin kebutuhan lain (misal: Tanda Tangan Pembina)..."
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
            />
            <button
              type="button"
              onClick={() => handleAddRequirement()}
              className="px-3.5 py-2 rounded-xl bg-brand-burgundy/10 hover:bg-brand-burgundy hover:text-white text-brand-burgundy font-semibold inline-flex items-center gap-1 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_REQUIREMENT_PRESETS.filter((p) => !requirements.includes(p)).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleAddRequirement(preset)}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-[10px] text-neutral-dark hover:text-brand-burgundy transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      </form>
    </EditorialModal>
  );
}

interface LetterDetailModalProps {
  letter: CorrespondenceRequest | null;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  canReviewLetter: boolean;
  onUpdated?: (msg: string) => void;
}

export function LetterDetailModal({
  letter,
  onClose,
  store,
  currentUser,
  canReviewLetter,
  onUpdated,
}: LetterDetailModalProps) {
  // Always read the live letter from store so Sekum checklist toggles reflect instantaneously!
  const liveLetter = letter
    ? store.correspondence.find((c) => c.id === letter.id) || letter
    : null;

  const [reviewNote, setReviewNote] = useState("");
  const [ditmawaStatus, setDitmawaStatus] = useState<DitmawaDispatchStatus>("pending");
  const [newChecklistItem, setNewChecklistItem] = useState("");

  useEffect(() => {
    if (!liveLetter) return;
    setReviewNote(liveLetter.reviewer_notes || "");
    setDitmawaStatus(liveLetter.ditmawa_status || "not_dispatched");
    setNewChecklistItem("");
  }, [liveLetter?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const checklist = liveLetter?.checklist || [];
  const checkedCount = checklist.filter((c) => c.checked).length;

  const handleToggleChecklist = (idx: number) => {
    if (!canReviewLetter || !liveLetter) return;
    mutateStore((draft) => {
      const target = draft.correspondence.find((c) => c.id === liveLetter.id);
      if (target && target.checklist[idx]) {
        target.checklist[idx].checked = !target.checklist[idx].checked;
        if (target.status === "submitted") {
          target.status = "in_review";
        }
        target.updated_at = new Date().toISOString();
      }
    });
  };

  const handleAddChecklistPoint = () => {
    if (!canReviewLetter || !liveLetter || !newChecklistItem.trim()) return;
    mutateStore((draft) => {
      const target = draft.correspondence.find((c) => c.id === liveLetter.id);
      if (target) {
        target.checklist.push({ item: newChecklistItem.trim(), checked: false });
        target.updated_at = new Date().toISOString();
      }
    });
    setNewChecklistItem("");
  };

  const handleRemoveChecklistPoint = (idx: number) => {
    if (!canReviewLetter || !liveLetter) return;
    mutateStore((draft) => {
      const target = draft.correspondence.find((c) => c.id === liveLetter.id);
      if (target) {
        target.checklist = target.checklist.filter((_, i) => i !== idx);
        target.updated_at = new Date().toISOString();
      }
    });
  };

  const handleSekumDecision = (action: "issue" | "revision") => {
    if (!liveLetter) return;
    const autoNumber = `${String(store.correspondence.length + 1).padStart(3, "0")}/BPC-HIPMI/TU/ARTHA/${new Date().getFullYear()}`;

    mutateStore((draft) => {
      const target = draft.correspondence.find((c) => c.id === liveLetter.id);
      if (target) {
        if (action === "issue") {
          target.status = "issued";
          target.generated_letter_number = target.generated_letter_number || autoNumber;
          target.issued_at = new Date().toISOString();
          target.reviewer_notes = reviewNote.trim() || "Disetujui dan nomor resmi diterbitkan.";
          if (target.routing === "Untuk Ditmawa") {
            target.ditmawa_status =
              ditmawaStatus === "not_dispatched" ? "submitted_to_ditmawa" : ditmawaStatus;
          }
        } else {
          target.status = "revision_needed";
          target.reviewer_notes = reviewNote.trim() || "Mohon perbaiki sesuai catatan Sekum.";
        }
        target.updated_at = new Date().toISOString();
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        action === "issue" ? "ISSUE_LETTER_NUMBER" : "REQUEST_LETTER_REVISION",
        "Correspondence",
        liveLetter.id
      );
    });

    onUpdated?.(
      action === "issue"
        ? `Surat disetujui! Nomor otomatis (${liveLetter.generated_letter_number || autoNumber}) diterbitkan.`
        : "Catatan revisi dikirimkan ke pengaju pada pengajuan yang sama."
    );
    onClose();
  };

  return (
    <EditorialModal
      isOpen={!!liveLetter}
      onClose={onClose}
      badge={liveLetter?.routing || "Detail Surat"}
      title={liveLetter?.title || "Rincian Pengajuan Surat"}
      subtitle={`Unit: ${liveLetter?.unit_name || "-"} • Pengaju: ${liveLetter?.submitter_name || "-"}`}
      maxWidth="lg"
      footer={
        canReviewLetter && liveLetter ? (
          <>
            <button
              type="button"
              onClick={() => handleSekumDecision("revision")}
              className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Minta Revisi</span>
            </button>
            <button
              type="button"
              onClick={() => handleSekumDecision("issue")}
              className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Setujui &amp; Terbitkan Nomor Otomatis</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Tutup
          </button>
        )
      }
    >
      {liveLetter && (
        <div className="space-y-4 text-xs">
          {/* Status & Letter Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Status Proses Sekum
              </span>
              <strong className="text-wine-950">
                {LETTER_STATUS_LABELS[liveLetter.status] || liveLetter.status}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">
                Nomor Surat Resmi
              </span>
              <strong className="font-mono text-brand-burgundy inline-flex items-center gap-1">
                {liveLetter.generated_letter_number ? (
                  <>
                    <Hash className="w-3 h-3" />
                    {liveLetter.generated_letter_number}
                  </>
                ) : (
                  "Otomatis saat disetujui Sekum"
                )}
              </strong>
            </div>
          </div>

          {/* Document URL */}
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
            <strong className="text-wine-950 block">Tautan Dokumen (Google Docs/Drive)</strong>
            <a
              href={liveLetter.document_url}
              target="_blank"
              rel="noreferrer"
              className="text-brand-burgundy font-mono text-[11px] hover:underline inline-flex items-center gap-1.5 break-all"
            >
              <span>{liveLetter.document_url}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
            <p className="text-neutral-dark pt-1">{liveLetter.description}</p>
          </div>

          {/* Interactive Flexible Checklist Progress */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8B577]/45 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <strong className="text-wine-950 block">
                  Progres Poin Kebutuhan &amp; Ceklis Sekum
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  {canReviewLetter
                    ? "Centang poin yang sudah beres, atau tambah/hapus poin sesuai kebutuhan surat ini."
                    : "Pantau secara langsung poin kebutuhan surat mana saja yang sudah diselesaikan Sekum."}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                {checkedCount} / {checklist.length} Selesai
              </span>
            </div>

            <div className="space-y-1.5">
              {checklist.map((item, idx) => (
                <div
                  key={`${item.item}-${idx}`}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 transition-colors ${
                    item.checked
                      ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                      : "bg-[#FCF8F6] border-[#E9E1DC] text-wine-950"
                  }`}
                >
                  <button
                    type="button"
                    disabled={!canReviewLetter}
                    onClick={() => handleToggleChecklist(idx)}
                    className={`flex items-center gap-2.5 text-left flex-1 min-w-0 ${
                      canReviewLetter ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    {item.checked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-neutral-light shrink-0" />
                    )}
                    <span className={item.checked ? "line-through opacity-80" : "font-medium"}>
                      {item.item}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.checked
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-white border border-[#E9E1DC] text-neutral-light"
                      }`}
                    >
                      {item.checked ? "Beres" : "Proses"}
                    </span>
                    {canReviewLetter && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChecklistPoint(idx)}
                        className="p-1 text-neutral-light hover:text-rose-600 transition-colors"
                        aria-label="Hapus poin checklist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {canReviewLetter && (
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newChecklistItem}
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddChecklistPoint();
                    }
                  }}
                  placeholder="Tambah poin ceklis baru untuk surat ini..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistPoint}
                  className="px-3.5 py-2 rounded-xl bg-brand-burgundy/10 hover:bg-brand-burgundy hover:text-white text-brand-burgundy font-semibold inline-flex items-center gap-1 transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah</span>
                </button>
              </div>
            )}
          </div>

          {/* Reviewer Notes (Visible to submitter if present) */}
          {!canReviewLetter && liveLetter.reviewer_notes && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1">
              <strong className="block">Catatan dari Sekretaris Umum:</strong>
              <p>{liveLetter.reviewer_notes}</p>
            </div>
          )}

          {/* Sekum Controls */}
          {canReviewLetter && (
            <div className="space-y-3 pt-2 border-t border-[#E9E1DC]">
              {liveLetter.routing === "Untuk Ditmawa" && (
                <div className="space-y-1">
                  <label className="font-semibold text-wine-950 block">
                    Status Pelacakan Ditmawa (Terpisah dari Status Sekum)
                  </label>
                  <select
                    value={ditmawaStatus}
                    onChange={(e) => setDitmawaStatus(e.target.value as DitmawaDispatchStatus)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                  >
                    <option value="not_dispatched">Belum Dikirim ke Ditmawa</option>
                    <option value="submitted_to_ditmawa">Sudah Diajukan ke Ditmawa</option>
                    <option value="under_review_ditmawa">Sedang Diperiksa Ditmawa</option>
                    <option value="approved_by_ditmawa">Disetujui Ditmawa</option>
                    <option value="completed">Selesai Tindak Lanjut Ditmawa</option>
                  </select>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-wine-950 block">Catatan Review Sekum</label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Tambahkan catatan pemeriksaan atau arahan revisi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </EditorialModal>
  );
}
