"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

const LPJ_STATUS_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  submitted: { label: "Menunggu Review", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Sedang Diperiksa", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  revision_needed: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Disahkan (Approved)", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  archived: { label: "Diarsipkan", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

export default function LPJManagementPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [lpjTitle, setLpjTitle] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const lpjs = (store.lpjs || []).filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const proj = store.projects.find((p) => p.id === l.project_id);
      const matchProj = proj?.name.toLowerCase().includes(q);
      if (!matchTitle && !matchProj) return false;
    }
    return true;
  });

  const projectsWithoutLpj = store.projects.filter(
    (p) => !store.lpjs.some((l) => l.project_id === p.id)
  );

  const canCreateLpj =
    permissions.isKakom ||
    permissions.managedProjectIds.length > 0 ||
    permissions.isTopManagement;

  const handleCreateLpj = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !lpjTitle.trim()) return;
    const proj = store.projects.find((p) => p.id === selectedProjectId);
    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

    const evt = store.events.find((ev) => ev.project_id === selectedProjectId);
    const tickets = evt ? store.tickets.filter((t) => t.event_id === evt.id) : [];
    const checkedIn = tickets.filter((t) => t.is_checked_in).length;

    const fundReqs = store.fund_requests.filter((r) => r.project_id === selectedProjectId);
    const totalFund = fundReqs.reduce((s, r) => s + (r.approved_amount || r.requested_amount), 0);

    mutateStore((draft) => {
      draft.lpjs.unshift({
        id: `lpj-${Date.now()}`,
        project_id: selectedProjectId,
        cabinet_id: proj?.cabinet_id || activeCab?.id || "cab-arthakarsa-2627",
        submitter_user_id: currentUser.id,
        title: lpjTitle.trim(),
        section_1_identity: `Program Kerja: ${proj?.name || "-"}\nPenanggung Jawab: ${proj?.lead_name || currentUser.name}`,
        section_2_summary: proj?.purpose || "Ringkasan pelaksanaan kegiatan program kerja.",
        section_3_execution: `Lokasi: ${proj?.location || "Universitas Telkom"}\nTanggal Main Event: ${proj?.main_event_date || "-"}`,
        section_4_attendance: `Total Tiket Terbit: ${tickets.length} • Kehadiran Check-in: ${checkedIn} peserta (ditarik otomatis dari sistem presensi).`,
        section_5_finance: `Total Realisasi Pengajuan RAB: Rp ${totalFund.toLocaleString("id-ID")} (ditarik otomatis dari buku keuangan proker).`,
        section_6_documentation: "Tautan folder dokumentasi foto & video kegiatan.",
        section_7_evaluation: "Evaluasi pelaksanaan dan rekomendasi untuk periode berikutnya.",
        status: "draft",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      addActivityHistory(
        currentUser.name,
        "membuat draf LPJ 7-bagian baru",
        lpjTitle.trim(),
        "Dokumen & LPJ"
      );
    });

    setCreateOpen(false);
    setSelectedProjectId("");
    setLpjTitle("");
    setFeedback(`Draf LPJ "${lpjTitle.trim()}" berhasil dibuat dengan rekap otomatis kehadiran & keuangan.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/documents"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Dokumen &amp; Arsip</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Laporan Pertanggungjawaban
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Manajemen LPJ Program Kerja
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Standarisasi LPJ 7-bab yang menarik otomatis data kehadiran &amp; keuangan proker. Pengesahan dilakukan oleh reviewer berwenang sebagai syarat penutupan proker.
          </p>
        </div>

        {canCreateLpj && (
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Draft LPJ</span>
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

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul LPJ atau nama program kerja..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status LPJ</option>
          <option value="draft">Draf</option>
          <option value="submitted">Menunggu Review</option>
          <option value="in_review">Sedang Diperiksa</option>
          <option value="revision_needed">Perlu Revisi</option>
          <option value="approved">Disahkan (Approved)</option>
        </select>
      </div>

      {/* LPJ Cards */}
      <div className="space-y-3">
        {lpjs.length > 0 ? (
          lpjs.map((lpj) => {
            const proj = store.projects.find((p) => p.id === lpj.project_id);
            const st = LPJ_STATUS_MAP[lpj.status] || LPJ_STATUS_MAP.draft;
            return (
              <Link
                key={lpj.id}
                href={`/organization/lpj/${lpj.id}`}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-light inline-flex items-center gap-1">
                      <FileCheck className="w-3 h-3 text-brand-burgundy" />
                      <span>7 Bab Lengkap</span>
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">{lpj.title}</strong>
                  <span className="text-xs text-neutral-dark block">
                    Proker: {proj?.name || "Umum"} • Diperbarui{" "}
                    {new Date(lpj.updated_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <span className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950 inline-flex items-center gap-1 shrink-0 self-start sm:self-center">
                  <span>Buka LPJ 7-Bab</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Belum ada LPJ yang sesuai dengan pencarian atau filter.
          </div>
        )}
      </div>

      {/* Modal Buat Draft LPJ */}
      <EditorialModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        badge="Laporan Pertanggungjawaban"
        title="Buat Draft LPJ 7-Bagian"
        subtitle="Sistem otomatis menarik data kehadiran event dan rekap keuangan proker agar tidak perlu input ulang."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="create-lpj-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Buat Draft LPJ
            </button>
          </>
        }
      >
        <form id="create-lpj-form" onSubmit={handleCreateLpj} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Pilih Program Kerja <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                const p = store.projects.find((pr) => pr.id === e.target.value);
                if (p && !lpjTitle) setLpjTitle(`LPJ ${p.name}`);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
            >
              <option value="">-- Pilih Program Kerja --</option>
              {(projectsWithoutLpj.length > 0 ? projectsWithoutLpj : store.projects).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Judul Dokumen LPJ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={lpjTitle}
              onChange={(e) => setLpjTitle(e.target.value)}
              placeholder="Contoh: LPJ Telkom Business Expo 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
        </form>
      </EditorialModal>
    </div>
  );
}
