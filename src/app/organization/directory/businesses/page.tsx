"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
  addAuditEvent,
} from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { BUSINESS_REVIEW_LABELS } from "@/lib/personal/labels";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { CadreBusiness } from "@/types/domain";
import {
  Store,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Globe,
  Phone,
  ShieldCheck,
  EyeOff,
} from "lucide-react";

export default function CadreBusinessesManagementPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const canCurate = permissions.canManagePartnerships || permissions.isSystemAdmin;

  const [searchTerm, setSearchTerm] = useState("");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [selectedBiz, setSelectedBiz] = useState<CadreBusiness | null>(null);
  const [reviewerNote, setReviewerNote] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const businesses = (store.businesses || []).filter((b) => {
    if (reviewFilter !== "all" && b.review_status !== reviewFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !b.name.toLowerCase().includes(q) &&
        !b.owner_name.toLowerCase().includes(q) &&
        !b.category.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  // Separate Approval vs Publication actions per front_end.md DIR-05!
  const handleReviewAction = (status: "approved" | "revision_needed" | "rejected") => {
    if (!selectedBiz) return;
    mutateStore((draft) => {
      const target = draft.businesses.find((b) => b.id === selectedBiz.id);
      if (target) {
        target.review_status = status;
        target.reviewer_notes = reviewerNote.trim() || undefined;
        if (status !== "approved") {
          target.publication_status = "unpublished";
        }
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        `BUSINESS_REVIEW_${status.toUpperCase()}`,
        "CadreBusiness",
        selectedBiz.id
      );
    });
    setSelectedBiz((prev) =>
      prev
        ? {
            ...prev,
            review_status: status,
            reviewer_notes: reviewerNote.trim() || undefined,
            publication_status: status !== "approved" ? "unpublished" : prev.publication_status,
          }
        : null
    );
    setFeedback(
      status === "approved"
        ? "Usaha kader dinyatakan LOLOS KURASI. Anda dapat memublikasikannya ke portal publik secara terpisah."
        : status === "revision_needed"
        ? "Permintaan revisi dikirimkan kepada kader pemilik usaha."
        : "Pengajuan usaha kader ditolak."
    );
  };

  const handleTogglePublish = () => {
    if (!selectedBiz || selectedBiz.review_status !== "approved") return;
    const nextPub = selectedBiz.publication_status === "published" ? "unpublished" : "published";

    mutateStore((draft) => {
      const target = draft.businesses.find((b) => b.id === selectedBiz.id);
      if (target) {
        target.publication_status = nextPub;
      }
      addActivityHistory(
        currentUser.name,
        nextPub === "published" ? "memublikasikan bisnis kader" : "menarik publikasi bisnis kader",
        selectedBiz.name,
        "Pengelolaan Bisnis Kader"
      );
    });

    setSelectedBiz((prev) => (prev ? { ...prev, publication_status: nextPub } : null));
    setFeedback(
      nextPub === "published"
        ? `Usaha "${selectedBiz.name}" kini TAYANG di Direktori Bisnis Publik.`
        : `Usaha "${selectedBiz.name}" ditarik dari tampilan publik.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Database &amp; Kurasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Pengelolaan Bisnis Kader
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Pusat data usaha mahasiswa kader beserta kurasi kelayakan dan publikasi ke Direktori Bisnis Publik. Persetujuan kurasi dan publikasi dijalankan sebagai dua langkah terpisah.
          </p>
        </div>

        <Link
          href="/karya-kader/bisnis"
          target="_blank"
          className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 hover:text-brand-burgundy inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Lihat Katalog Publik</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
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

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama usaha, pemilik kader, atau kategori..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={reviewFilter}
          onChange={(e) => setReviewFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status Kurasi</option>
          <option value="review">Menunggu Kurasi</option>
          <option value="approved">Lolos Kurasi</option>
          <option value="revision_needed">Perlu Revisi</option>
          <option value="draft">Draf</option>
        </select>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((biz) => {
          const rev = BUSINESS_REVIEW_LABELS[biz.review_status] || BUSINESS_REVIEW_LABELS.draft;
          const isPub = biz.publication_status === "published";
          return (
            <div
              key={biz.id}
              onClick={() => {
                setSelectedBiz(biz);
                setReviewerNote(biz.reviewer_notes || "");
              }}
              className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                    {biz.category}
                  </span>
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${rev.tone}`}>
                    {rev.label}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isPub ? "bg-emerald-600 text-white" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {isPub ? "Tayang Publik" : "Belum Tayang"}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-wine-950 leading-snug">
                    {biz.name}
                  </h3>
                  <span className="text-xs text-neutral-dark">Pemilik: {biz.owner_name}</span>
                </div>

                <p className="text-[11px] text-neutral-dark line-clamp-2 leading-relaxed">
                  {biz.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E9E1DC] flex items-center justify-between text-xs font-semibold text-brand-burgundy">
                <span>{canCurate ? "Kurasi & Publikasi" : "Lihat Detail"}</span>
                <Store className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Kurasi & Publikasi Terpisah (DIR-05) */}
      <EditorialModal
        isOpen={!!selectedBiz}
        onClose={() => setSelectedBiz(null)}
        badge={selectedBiz?.category || "Kurasi Bisnis"}
        title={selectedBiz?.name || "Detail Usaha Kader"}
        subtitle={`Pemilik Kader: ${selectedBiz?.owner_name || "-"}`}
        maxWidth="lg"
        footer={
          canCurate && selectedBiz ? (
            <div className="flex flex-wrap items-center justify-between w-full gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleReviewAction("revision_needed")}
                  className="px-3.5 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold inline-flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Minta Revisi</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleReviewAction("approved")}
                  className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Setujui Kurasi</span>
                </button>
              </div>

              <button
                type="button"
                disabled={selectedBiz.review_status !== "approved"}
                onClick={handleTogglePublish}
                className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {selectedBiz.publication_status === "published" ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Tarik dari Publik</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    <span>Publish ke Web Publik</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSelectedBiz(null)}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Tutup
            </button>
          )
        }
      >
        {selectedBiz && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Langkah 1 — Status Kurasi
                </span>
                <strong className="text-wine-950">
                  {BUSINESS_REVIEW_LABELS[selectedBiz.review_status]?.label || selectedBiz.review_status}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Langkah 2 — Status Publikasi
                </span>
                <strong className="text-wine-950">
                  {selectedBiz.publication_status === "published" ? "Tayang di Portal Publik" : "Belum Tayang"}
                </strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
              <p className="text-wine-950 leading-relaxed">{selectedBiz.description}</p>
              <span className="inline-flex items-center gap-1.5 text-neutral-dark font-mono">
                <Phone className="w-3.5 h-3.5 text-brand-burgundy" />
                {selectedBiz.contact_public}
              </span>
            </div>

            {canCurate && (
              <div className="space-y-1">
                <label className="font-semibold text-wine-950 block">
                  Catatan Internal Reviewer (Tidak Ditampilkan ke Publik)
                </label>
                <textarea
                  rows={2}
                  value={reviewerNote}
                  onChange={(e) => setReviewerNote(e.target.value)}
                  placeholder="Catatan kurasi legalitas atau arahan perbaikan deskripsi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
                />
              </div>
            )}
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
