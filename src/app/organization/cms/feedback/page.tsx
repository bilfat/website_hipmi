"use client";

import { useState } from "react";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { FeedbackItem, FeedbackStatus } from "@/types/domain";
import {
  Search,
  Lock,
  Eye,
  CheckCircle2,
  MessageSquareHeart,
} from "lucide-react";

const STATUS_MAP: Record<string, { label: string; tone: string }> = {
  Baru: { label: "Masuk (Baru)", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  submitted: { label: "Masuk (Baru)", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  under_review: { label: "Sedang Ditelaah", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  routed_to_unit: { label: "Diteruskan ke Unit", tone: "bg-purple-50 text-purple-800 border-purple-200" },
  "Dalam Tindak Lanjut": { label: "Dalam Tindak Lanjut", tone: "bg-brand-burgundy/10 text-brand-burgundy border-brand-burgundy/25" },
  in_progress: { label: "Dalam Tindak Lanjut", tone: "bg-brand-burgundy/10 text-brand-burgundy border-brand-burgundy/25" },
  Selesai: { label: "Selesai / Ditutup", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  closed: { label: "Selesai / Ditutup", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
};

export default function FeedbackInboxPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const canManage = permissions.canManageFeedback;

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null);
  const [nextStatus, setNextStatus] = useState<FeedbackStatus>("under_review");
  const [routedUnit, setRoutedUnit] = useState("");
  const [followupNotes, setFollowupNotes] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const feedbacks = (store.feedback || []).filter((f) => {
    if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
    if (statusFilter !== "all" && f.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !f.title.toLowerCase().includes(q) &&
        !f.receipt_code.toLowerCase().includes(q) &&
        !f.message.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const liveSelected = selectedItem
    ? store.feedback.find((f) => f.id === selectedItem.id) || selectedItem
    : null;

  const openDetailModal = (item: FeedbackItem) => {
    setSelectedItem(item);
    setNextStatus(item.status);
    setRoutedUnit(item.routed_to_unit || "");
    setFollowupNotes(item.followup_notes || "");
  };

  const handleSaveFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveSelected || !canManage) return;

    mutateStore((draft) => {
      const target = draft.feedback.find((f) => f.id === liveSelected.id);
      if (target) {
        target.status = nextStatus;
        target.routed_to_unit = routedUnit.trim() || undefined;
        target.followup_notes = followupNotes.trim() || undefined;
      }
      addActivityHistory(
        currentUser.name,
        `memperbarui tindak lanjut kotak suara (${nextStatus})`,
        liveSelected.receipt_code,
        "Kotak Suara"
      );
    });

    setSelectedItem(null);
    setFeedback(`Tindak lanjut aspirasi ${liveSelected.receipt_code} berhasil diperbarui.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Kanal Aspirasi Privat
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Kotak Suara Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Inbox privat untuk aspirasi, kritik, dan saran mahasiswa. Bersifat tertutup (bukan konten publik) dan melindungi kerahasiaan identitas pengirim.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 shadow-sm self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-brand-burgundy" />
          <span>Kanal Privat Terproteksi</span>
        </span>
      </div>

      {!canManage && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan ({permissions.roleBadgeTitle}) — Tindak lanjut dan penutupan tiket Kotak Suara dilakukan oleh operator unit berwenang.
          </span>
        </div>
      )}

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
            placeholder="Cari perihal, kode tanda terima (KS-...), atau isi aspirasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Kategori</option>
          <option value="Aspirasi">Aspirasi</option>
          <option value="Kritik">Kritik</option>
          <option value="Saran">Saran</option>
          <option value="Pertanyaan">Pertanyaan</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status</option>
          <option value="submitted">Masuk (Baru)</option>
          <option value="under_review">Sedang Ditelaah</option>
          <option value="routed_to_unit">Diteruskan ke Unit</option>
          <option value="in_progress">Dalam Tindak Lanjut</option>
          <option value="closed">Selesai / Ditutup</option>
        </select>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-3">
        {feedbacks.length > 0 ? (
          feedbacks.map((f) => {
            const st = STATUS_MAP[f.status] || STATUS_MAP.submitted;
            return (
              <div
                key={f.id}
                onClick={() => openDetailModal(f)}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                      {f.receipt_code}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                      {f.category}
                    </span>
                    {f.routed_to_unit && (
                      <span className="text-[10px] font-medium text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                        → {f.routed_to_unit}
                      </span>
                    )}
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">{f.title}</strong>
                  <p className="text-[11px] text-neutral-dark line-clamp-1">{f.message}</p>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950 shrink-0 self-start sm:self-center">
                  {canManage ? "Tindak Lanjuti" : "Baca Detail"}
                </span>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Belum ada aspirasi kotak suara yang sesuai filter.
          </div>
        )}
      </div>

      {/* Modal Detail & Tindak Lanjut Kotak Suara */}
      <EditorialModal
        isOpen={!!liveSelected}
        onClose={() => setSelectedItem(null)}
        badge={`Kotak Suara • ${liveSelected?.receipt_code || ""}`}
        title={liveSelected?.title || "Detail Aspirasi"}
        subtitle={`Kategori: ${liveSelected?.category || "-"} • Pengirim: ${liveSelected?.sender_name_optional || "Anonim (Terlindungi)"}`}
        maxWidth="md"
        footer={
          canManage ? (
            <>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
              >
                Batal
              </button>
              <button
                type="submit"
                form="feedback-followup-form"
                className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
              >
                Simpan Tindak Lanjut
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Tutup
            </button>
          )
        }
      >
        {liveSelected && (
          <form id="feedback-followup-form" onSubmit={handleSaveFollowup} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
              <strong className="text-wine-950 flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Isi Masukan / Aspirasi</span>
              </strong>
              <p className="text-wine-950 leading-relaxed whitespace-pre-line">
                {liveSelected.message}
              </p>
            </div>

            {canManage ? (
              <div className="space-y-3 pt-2 border-t border-[#E9E1DC]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-wine-950">Status Penanganan</label>
                    <select
                      value={nextStatus}
                      onChange={(e) => setNextStatus(e.target.value as FeedbackStatus)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                    >
                      <option value="submitted">Masuk (Baru)</option>
                      <option value="under_review">Sedang Ditelaah</option>
                      <option value="routed_to_unit">Diteruskan ke Unit</option>
                      <option value="in_progress">Dalam Tindak Lanjut</option>
                      <option value="closed">Selesai / Ditutup</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-wine-950">Arahkan ke Unit Berwenang</label>
                    <select
                      value={routedUnit}
                      onChange={(e) => setRoutedUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                    >
                      <option value="">-- Belum diarahkan --</option>
                      <option value="BPH / Pimpinan Kabinet">BPH / Pimpinan Kabinet</option>
                      {store.compartments.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-wine-950">Catatan Tindak Lanjut Internal</label>
                  <textarea
                    rows={3}
                    value={followupNotes}
                    onChange={(e) => setFollowupNotes(e.target.value)}
                    placeholder="Catat langkah penanganan atau hasil koordinasi unit..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
                  />
                </div>
              </div>
            ) : (
              liveSelected.followup_notes && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
                  <strong className="block">Catatan Tindak Lanjut:</strong>
                  <p>{liveSelected.followup_notes}</p>
                </div>
              )
            )}
          </form>
        )}
      </EditorialModal>
    </div>
  );
}
