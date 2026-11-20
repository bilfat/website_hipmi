"use client";

import { useState } from "react";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { MedpartSubmission, MedpartPackageConfig } from "@/types/domain";
import {
  Search,
  Settings,
  Globe,
  CheckCircle2,
  Eye,
  Plus,
  Trash2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const DEFAULT_MEDPART_PACKAGES: MedpartPackageConfig[] = [
  {
    id: "pkg-free",
    name: "Paket Medpart Gratis (Barter Follow)",
    type: "Gratis",
    price: 0,
    benefits: ["1x IG Story Poster Event", "Pencantuman logo pada media partner"],
    requirements: "Wajib follow akun resmi HIPMI Telkom minimal 15 panitia.",
    active: true,
  },
  {
    id: "pkg-silver",
    name: "Paket Silver (Berbayar)",
    type: "Berbayar",
    price: 50000,
    benefits: ["2x IG Story + 1x Feed Carousel", "Tag & Repost H-3 acara"],
    requirements: "Transfer ke QRIS Resmi HIPMI Telkom dan unggah bukti bayar.",
    qris_note: "QRIS Resmi BPC HIPMI PT Telkom — No. Ref Medkom",
    active: true,
  },
  {
    id: "pkg-gold",
    name: "Paket Gold Spotlight (Berbayar)",
    type: "Berbayar",
    price: 120000,
    benefits: ["3x IG Story + 1x Feed Utama + 1x Reels Teaser", "Tampil di Portal Berita HIPMI"],
    requirements: "Transfer ke QRIS Resmi HIPMI Telkom minimal H-7 tayang.",
    qris_note: "QRIS Resmi BPC HIPMI PT Telkom — Paket Prioritas",
    active: true,
  },
];

const MEDPART_STATUS_MAP: Record<string, { label: string; tone: string }> = {
  submitted: { label: "Menunggu Review Medkom", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Sedang Diperiksa", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision_needed: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Disetujui (Siap Tayang)", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  published: { label: "Sudah Tayang (Manual)", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  rejected: { label: "Ditolak", tone: "bg-red-50 text-red-700 border-red-200" },
};

export default function MedpartManagementPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const canReview = permissions.canReviewMedpart || permissions.canPublishMedpart;
  const canPublish = permissions.canPublishMedpart;

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedSub, setSelectedSub] = useState<MedpartSubmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New Package form states inside Packages Modal
  const [pkgName, setPkgName] = useState("");
  const [pkgType, setPkgType] = useState<"Gratis" | "Berbayar">("Berbayar");
  const [pkgPrice, setPkgPrice] = useState("75000");
  const [pkgBenefits, setPkgBenefits] = useState("");
  const [pkgReqs, setPkgReqs] = useState("");

  const packages =
    store.medpart_packages && store.medpart_packages.length > 0
      ? store.medpart_packages
      : DEFAULT_MEDPART_PACKAGES;

  const submissions = (store.medpart_submissions || []).filter((m) => {
    if (typeFilter !== "all" && m.package_type !== typeFilter) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !m.organization.toLowerCase().includes(q) &&
        !m.event_name.toLowerCase().includes(q) &&
        !m.tracking_code.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const liveSelected = selectedSub
    ? store.medpart_submissions.find((m) => m.id === selectedSub.id) || selectedSub
    : null;

  const openReviewModal = (sub: MedpartSubmission) => {
    setSelectedSub(sub);
    setReviewNotes(sub.reviewer_notes || "");
  };

  const handleMedpartDecision = (
    nextStatus: "approved" | "published" | "revision" | "rejected"
  ) => {
    if (!liveSelected) return;
    mutateStore((draft) => {
      const target = draft.medpart_submissions.find((m) => m.id === liveSelected.id);
      if (target) {
        target.status = nextStatus;
        target.reviewer_notes = reviewNotes.trim() || target.reviewer_notes;
        if (nextStatus === "published") {
          target.published_at = new Date().toISOString();
        }
      }
      addActivityHistory(
        currentUser.name,
        `memperbarui status medpart menjadi ${nextStatus}`,
        `${liveSelected.event_name} (${liveSelected.tracking_code})`,
        "Media Partner"
      );
    });
    setSelectedSub(null);
    setFeedback(
      nextStatus === "published"
        ? `Media Partner "${liveSelected.event_name}" resmi ditayangkan secara manual.`
        : `Status Media Partner "${liveSelected.event_name}" diperbarui menjadi ${nextStatus}.`
    );
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName.trim()) return;
    const newPkg: MedpartPackageConfig = {
      id: `pkg-${Date.now()}`,
      name: pkgName.trim(),
      type: pkgType,
      price: pkgType === "Gratis" ? 0 : Number(pkgPrice) || 0,
      benefits: pkgBenefits
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      requirements: pkgReqs.trim() || "Mengikuti ketentuan resmi Medkom HIPMI Telkom.",
      qris_note: pkgType === "Berbayar" ? "QRIS Resmi BPC HIPMI PT Telkom" : undefined,
      active: true,
    };

    mutateStore((draft) => {
      if (!draft.medpart_packages || draft.medpart_packages.length === 0) {
        draft.medpart_packages = [...DEFAULT_MEDPART_PACKAGES];
      }
      draft.medpart_packages.push(newPkg);
    });
    setPkgName("");
    setPkgBenefits("");
    setPkgReqs("");
    setFeedback(`Paket Media Partner "${newPkg.name}" berhasil ditambahkan.`);
  };

  const handleDeletePackage = (pkgId: string) => {
    mutateStore((draft) => {
      if (!draft.medpart_packages) {
        draft.medpart_packages = DEFAULT_MEDPART_PACKAGES.filter((p) => p.id !== pkgId);
      } else {
        draft.medpart_packages = draft.medpart_packages.filter((p) => p.id !== pkgId);
      }
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Media Komunikasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Pengelolaan Media Partner
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Atur jenis paket gratis/berbayar beserta keuntungan &amp; QRIS, verifikasi bukti bayar pengajuan eksternal, dan lakukan publikasi manual.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPkgModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{canReview ? "Atur Paket & Benefit Medpart" : "Lihat Daftar Paket"}</span>
        </button>
      </div>

      {!canReview && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan ({permissions.roleBadgeTitle}) — Verifikasi bukti pembayaran dan publikasi manual Medpart dilakukan oleh unit Media Komunikasi. Bendum memantau rekap pendapatan.
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
            placeholder="Cari kode tracking (MP-...), nama event, atau instansi pemohon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Paket</option>
          <option value="Gratis">Gratis</option>
          <option value="Berbayar">Berbayar</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status</option>
          <option value="submitted">Menunggu Review</option>
          <option value="approved">Siap Tayang</option>
          <option value="published">Sudah Tayang</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>

      {/* Submissions List */}
      <div className="space-y-3">
        {submissions.length > 0 ? (
          submissions.map((m) => {
            const st = MEDPART_STATUS_MAP[m.status] || MEDPART_STATUS_MAP.submitted;
            return (
              <div
                key={m.id}
                onClick={() => openReviewModal(m)}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                      {m.tracking_code}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950">
                      {m.package_type} {m.amount > 0 ? `• Rp ${m.amount.toLocaleString("id-ID")}` : ""}
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">{m.event_name}</strong>
                  <span className="text-[11px] text-neutral-dark block">
                    {m.organization} • Pemohon: {m.applicant_name} • Request tayang: {m.requested_publish_date}
                  </span>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950 shrink-0 self-start sm:self-center">
                  {canReview ? "Review & Tayangkan" : "Rincian"}
                </span>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Belum ada pengajuan media partner yang cocok dengan filter ini.
          </div>
        )}
      </div>

      {/* Modal 1: Review & Publish Manual Medpart */}
      <EditorialModal
        isOpen={!!liveSelected}
        onClose={() => setSelectedSub(null)}
        badge={`Tracking ${liveSelected?.tracking_code || ""}`}
        title={liveSelected?.event_name || "Detail Pengajuan Medpart"}
        subtitle={`${liveSelected?.organization || "-"} • Paket: ${liveSelected?.package_name || "-"}`}
        maxWidth="md"
        footer={
          liveSelected && canReview ? (
            <>
              <button
                type="button"
                onClick={() => handleMedpartDecision("rejected")}
                className="px-3.5 py-2 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold"
              >
                Tolak
              </button>
              <button
                type="button"
                onClick={() => handleMedpartDecision("revision")}
                className="px-3.5 py-2 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold"
              >
                Revisi
              </button>
              {liveSelected.status !== "approved" && liveSelected.status !== "published" && (
                <button
                  type="button"
                  onClick={() => handleMedpartDecision("approved")}
                  className="px-4 py-2 rounded-full bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold"
                >
                  Setujui
                </button>
              )}
              {canPublish && liveSelected.status !== "published" && (
                <button
                  type="button"
                  onClick={() => handleMedpartDecision("published")}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Publish Manual</span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => setSelectedSub(null)}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Tutup
            </button>
          )
        }
      >
        {liveSelected && (
          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">Paket</span>
                <strong className="text-wine-950">
                  {liveSelected.package_type} ({liveSelected.package_name})
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">Nominal</span>
                <strong className="font-mono text-brand-burgundy">
                  {liveSelected.amount > 0
                    ? `Rp ${liveSelected.amount.toLocaleString("id-ID")}`
                    : "Gratis"}
                </strong>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1">
              <strong className="text-wine-950 block">Kontak &amp; Materi Poster</strong>
              <p className="text-neutral-dark">
                {liveSelected.applicant_name} • {liveSelected.contact_email} • {liveSelected.contact_phone}
              </p>
              {liveSelected.poster_url && (
                <a
                  href={liveSelected.poster_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-burgundy font-mono text-[11px] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Lihat Poster / Materi</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {liveSelected.package_type === "Berbayar" && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Bukti Pembayaran QRIS:{" "}
                  <strong>{liveSelected.payment_proof_url || "Terlampir pada pengajuan"}</strong>
                </span>
              </div>
            )}

            {canReview && (
              <div className="space-y-1 pt-2 border-t border-[#E9E1DC]">
                <label className="font-semibold text-wine-950 block">Catatan Review Medkom</label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Catatan verifikasi bukti bayar atau arahan revisi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
                />
              </div>
            )}
          </div>
        )}
      </EditorialModal>

      {/* Modal 2: Konfigurasi Paket, Benefit & QRIS Medpart */}
      <EditorialModal
        isOpen={pkgModalOpen}
        onClose={() => setPkgModalOpen(false)}
        badge="Konfigurasi Paket Media Partner"
        title="Daftar Paket & Keuntungan Medpart"
        subtitle="Kelola jenis paket gratis maupun berbayar beserta daftar benefit dan instruksi QRIS yang tampil di halaman pengajuan publik."
        maxWidth="lg"
        footer={
          <button
            type="button"
            onClick={() => setPkgModalOpen(false)}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Selesai
          </button>
        }
      >
        <div className="space-y-5 text-xs">
          <div className="space-y-2.5">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                      {pkg.type} • {pkg.price > 0 ? `Rp ${pkg.price.toLocaleString("id-ID")}` : "Gratis"}
                    </span>
                    <strong className="font-serif text-sm text-wine-950 block mt-1">{pkg.name}</strong>
                  </div>
                  {canReview && (
                    <button
                      type="button"
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-1.5 text-neutral-light hover:text-rose-600"
                      aria-label="Hapus paket"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-neutral-dark">
                  {pkg.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-neutral-light">Syarat: {pkg.requirements}</p>
              </div>
            ))}
          </div>

          {canReview && (
            <form onSubmit={handleAddPackage} className="p-4 rounded-2xl bg-white border border-[#E8B577]/50 space-y-3">
              <strong className="text-wine-950 block">Tambah Paket Medpart Baru</strong>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  required
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  placeholder="Nama Paket (misal: Paket Platinum)"
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs"
                />
                <select
                  value={pkgType}
                  onChange={(e) => setPkgType(e.target.value as "Gratis" | "Berbayar")}
                  className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs"
                >
                  <option value="Berbayar">Berbayar</option>
                  <option value="Gratis">Gratis</option>
                </select>
              </div>
              {pkgType === "Berbayar" && (
                <input
                  type="number"
                  min={0}
                  value={pkgPrice}
                  onChange={(e) => setPkgPrice(e.target.value)}
                  placeholder="Harga Paket (Rp)"
                  className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-mono"
                />
              )}
              <textarea
                rows={2}
                value={pkgBenefits}
                onChange={(e) => setPkgBenefits(e.target.value)}
                placeholder="Daftar keuntungan / benefit (1 baris per poin)..."
                className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs resize-none"
              />
              <input
                type="text"
                value={pkgReqs}
                onChange={(e) => setPkgReqs(e.target.value)}
                placeholder="Syarat & ketentuan paket..."
                className="w-full px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Paket</span>
              </button>
            </form>
          )}
        </div>
      </EditorialModal>
    </div>
  );
}
