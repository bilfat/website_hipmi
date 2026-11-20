"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  CreateLetterModal,
  LetterDetailModal,
} from "@/components/organization/letter-modals";
import { CorrespondenceRequest } from "@/types/domain";
import {
  Search,
  Plus,
  ChevronLeft,
  CheckCircle2,
  Hash,
} from "lucide-react";

const STATUS_BADGE_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  submitted: { label: "Menunggu Sekum", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Diperiksa Sekum", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  revision_needed: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Disetujui", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  issued: { label: "Nomor Terbit", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  completed: { label: "Selesai", tone: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  archived: { label: "Diarsipkan", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

export default function CorrespondenceRequestsPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routingFilter, setRoutingFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<CorrespondenceRequest | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const letters = (store.correspondence || []).filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (routingFilter !== "all" && l.routing !== routingFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchSubmitter = l.submitter_name.toLowerCase().includes(q);
      const matchUnit = l.unit_name.toLowerCase().includes(q);
      const matchNum = l.generated_letter_number?.toLowerCase().includes(q);
      if (!matchTitle && !matchSubmitter && !matchUnit && !matchNum) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/correspondence"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Persuratan</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Daftar Pengajuan
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Daftar Pengajuan Surat
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Pantau seluruh pengajuan surat resmi bidang, kompartemen, dan proker lengkap dengan progres ceklis kebutuhan dari Sekretaris Umum.
          </p>
        </div>

        {permissions.canCreateLetter && (
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Surat Baru</span>
          </button>
        )}
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

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul surat, pengaju, unit, atau nomor surat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Semua Status</option>
            <option value="submitted">Menunggu Sekum</option>
            <option value="in_review">Diperiksa Sekum</option>
            <option value="revision_needed">Perlu Revisi</option>
            <option value="approved">Disetujui</option>
            <option value="issued">Nomor Terbit</option>
          </select>

          <select
            value={routingFilter}
            onChange={(e) => setRoutingFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          >
            <option value="all">Semua Routing</option>
            <option value="Surat Umum">Surat Umum</option>
            <option value="Untuk Ditmawa">Untuk Ditmawa</option>
          </select>
        </div>
      </div>

      {/* Letters List */}
      <div className="space-y-3">
        {letters.length > 0 ? (
          letters.map((l) => {
            const st = STATUS_BADGE_MAP[l.status] || STATUS_BADGE_MAP.submitted;
            const checklist = l.checklist || [];
            const checkedCount = checklist.filter((c) => c.checked).length;
            const allChecked = checklist.length > 0 && checkedCount === checklist.length;

            return (
              <div
                key={l.id}
                onClick={() => setSelectedLetter(l)}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                      {l.routing}
                    </span>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        allChecked
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      Ceklis: {checkedCount}/{checklist.length}
                    </span>
                    {l.generated_letter_number && (
                      <span className="text-[10px] font-mono font-bold text-emerald-700 inline-flex items-center gap-0.5">
                        <Hash className="w-3 h-3" />
                        {l.generated_letter_number}
                      </span>
                    )}
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">
                    {l.title}
                  </strong>
                  <span className="text-xs text-neutral-dark block">
                    {l.unit_name} • Pengaju: {l.submitter_name}
                  </span>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950 shrink-0 self-start sm:self-center">
                  {permissions.canReviewLetter ? "Ceklis & Review" : "Lihat Progres"}
                </span>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Tidak ada pengajuan surat yang sesuai kriteria pencarian.
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateLetterModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        store={store}
        currentUser={currentUser}
        defaultUnitName={permissions.roleScopeSubtitle}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <LetterDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        store={store}
        currentUser={currentUser}
        canReviewLetter={permissions.canReviewLetter}
        onUpdated={(msg) => setFeedback(msg)}
      />
    </div>
  );
}
