"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  CreateLetterModal,
  LetterDetailModal,
} from "@/components/organization/letter-modals";
import { CorrespondenceRequest } from "@/types/domain";
import {
  Mail,
  Clock,
  CheckCircle2,
  Building,
  Plus,
  Search,
  Layers,
  List,
  Hash,
  ListChecks,
} from "lucide-react";

const LETTER_STATUS_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  submitted: { label: "Menunggu Review", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Sedang Diperiksa", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  revision_needed: { label: "Perlu Revisi", tone: "bg-rose-50 text-rose-700 border-rose-200" },
  approved: { label: "Disetujui Sekum", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  issued: { label: "Nomor Terbit", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  completed: { label: "Selesai", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  archived: { label: "Diarsipkan", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

export default function CorrespondenceMultiUnitPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [displayMode, setDisplayMode] = useState<"list" | "units">("list");
  const [filterField, setFilterField] = useState("");
  const [filterComp, setFilterComp] = useState("");
  const [filterProj, setFilterProj] = useState("");
  const [filterRouting, setFilterRouting] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [query, setQuery] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<CorrespondenceRequest | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const letters = store.correspondence || [];

  const filteredLetters = letters.filter((l) => {
    const proj = l.project_id ? store.projects.find((p) => p.id === l.project_id) : null;
    if (filterField && proj?.field_id !== filterField) return false;
    if (filterComp && proj?.compartment_id !== filterComp) return false;
    if (filterProj && l.project_id !== filterProj) return false;
    if (filterRouting && l.routing !== filterRouting) return false;
    if (filterStatus && l.status !== filterStatus) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      if (
        !l.title.toLowerCase().includes(q) &&
        !(l.generated_letter_number || "").toLowerCase().includes(q) &&
        !l.unit_name.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const pendingCount = letters.filter(
    (l) => l.status === "submitted" || l.status === "in_review"
  ).length;
  const ditmawaCount = letters.filter((l) => l.routing === "Untuk Ditmawa").length;
  const issuedCount = letters.filter(
    (l) => l.status === "issued" || l.status === "completed"
  ).length;

  const availableComps = store.compartments.filter(
    (c) => !filterField || c.field_id === filterField
  );
  const availableProjs = store.projects.filter(
    (p) =>
      (!filterField || p.field_id === filterField) &&
      (!filterComp || p.compartment_id === filterComp)
  );

  const unitBuckets = store.compartments.map((c) => {
    const compProjIds = store.projects
      .filter((p) => p.compartment_id === c.id)
      .map((p) => p.id);
    const compLetters = letters.filter(
      (l) =>
        (l.project_id && compProjIds.includes(l.project_id)) ||
        l.unit_name.toLowerCase().includes(c.name.replace("Kompartemen ", "").toLowerCase())
    );
    return {
      comp: c,
      total: compLetters.length,
      pending: compLetters.filter((l) => l.status === "submitted" || l.status === "in_review")
        .length,
      ditmawa: compLetters.filter((l) => l.routing === "Untuk Ditmawa").length,
      done: compLetters.filter((l) => l.status === "issued" || l.status === "completed").length,
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Administrasi, Checklist Fleksibel &amp; Ditmawa
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Persuratan Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Ajukan surat berbasis URL dokumen dengan poin kebutuhan fleksibel. Progres ceklis Sekretaris Umum langsung terlihat real-time oleh unit &amp; pengelola proker.
          </p>
        </div>

        {permissions.canCreateLetter && (
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
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

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Surat", val: letters.length, sub: "Seluruh pengajuan", icon: Mail, tone: "bg-brand-burgundy/10 text-brand-burgundy" },
          { label: "Review Sekum", val: pendingCount, sub: "Menunggu verifikasi", icon: Clock, tone: "bg-amber-500/12 text-amber-700" },
          { label: "Routing Ditmawa", val: ditmawaCount, sub: "Pelacakan terpisah", icon: Building, tone: "bg-sky-500/12 text-sky-700" },
          { label: "Terbit / Selesai", val: issuedCount, sub: "Nomor resmi sah", icon: CheckCircle2, tone: "bg-emerald-500/12 text-emerald-700" },
        ].map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 pb-2">
                <span className="text-[11px] font-semibold text-neutral-dark">{k.label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${k.tone}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <strong className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 leading-none block">
                  {k.val}
                </strong>
                <span className="text-[11px] text-neutral-light mt-1 block">{k.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mode Switcher + Cascading Filters */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex p-1 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] self-start">
            {[
              { id: "list", label: "Daftar Surat", icon: List },
              { id: "units", label: "Rekap per Unit", icon: Layers },
            ].map((m) => {
              const Icon = m.icon;
              const active = displayMode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDisplayMode(m.id as "list" | "units")}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    active ? "text-white" : "text-neutral-dark hover:text-wine-950"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="corr-mode-toggle"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-brand-burgundy"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul surat, nomor surat, atau unit..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-xs">
          <select
            value={filterField}
            onChange={(e) => {
              setFilterField(e.target.value);
              setFilterComp("");
              setFilterProj("");
            }}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950"
          >
            <option value="">Semua Bidang</option>
            {store.fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={filterComp}
            onChange={(e) => {
              setFilterComp(e.target.value);
              setFilterProj("");
            }}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950"
          >
            <option value="">Semua Kompartemen</option>
            {availableComps.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterProj}
            onChange={(e) => setFilterProj(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950"
          >
            <option value="">Semua Proker</option>
            {availableProjs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={filterRouting}
            onChange={(e) => setFilterRouting(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950"
          >
            <option value="">Semua Routing</option>
            <option value="Surat Umum">Surat Umum</option>
            <option value="Untuk Ditmawa">Untuk Ditmawa</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-wine-950"
          >
            <option value="">Semua Status</option>
            <option value="submitted">Menunggu Review</option>
            <option value="in_review">Sedang Diperiksa</option>
            <option value="revision_needed">Perlu Revisi</option>
            <option value="issued">Nomor Terbit</option>
            <option value="completed">Selesai</option>
          </select>
        </div>
      </div>

      {/* MODE 1: REKAP PER UNIT */}
      {displayMode === "units" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unitBuckets.map(({ comp, total, pending, ditmawa, done }) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => {
                setFilterComp(comp.id);
                setDisplayMode("list");
              }}
              className="text-left p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                  {comp.code}
                </span>
                <span className="text-xs font-mono font-bold text-wine-950">{total} Surat</span>
              </div>
              <strong className="font-serif text-base text-wine-950 block">{comp.name}</strong>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E9E1DC] text-center text-[10px]">
                <div className="p-2 rounded-xl bg-[#FCF8F6]">
                  <strong className="block font-mono text-amber-700">{pending}</strong>
                  <span className="text-neutral-light">Review</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FCF8F6]">
                  <strong className="block font-mono text-sky-700">{ditmawa}</strong>
                  <span className="text-neutral-light">Ditmawa</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FCF8F6]">
                  <strong className="block font-mono text-emerald-700">{done}</strong>
                  <span className="text-neutral-light">Terbit</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* MODE 2: DAFTAR SURAT (With Live Sekum Checklist Progress Badge!) */}
      {displayMode === "list" && (
        <div className="space-y-3">
          {filteredLetters.length > 0 ? (
            filteredLetters.map((letter) => {
              const st = LETTER_STATUS_MAP[letter.status] || LETTER_STATUS_MAP.submitted;
              const totalPoints = (letter.checklist || []).length;
              const checkedPoints = (letter.checklist || []).filter((c) => c.checked).length;

              return (
                <div
                  key={letter.id}
                  onClick={() => setSelectedLetter(letter)}
                  className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                        {st.label}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                        {letter.routing}
                      </span>
                      {totalPoints > 0 && (
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${
                            checkedPoints === totalPoints
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-[#FCF8F6] text-wine-950 border-[#E9E1DC]"
                          }`}
                        >
                          <ListChecks className="w-3 h-3" />
                          Ceklis: {checkedPoints}/{totalPoints}
                        </span>
                      )}
                      {letter.generated_letter_number && (
                        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          {letter.generated_letter_number}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-wine-950 truncate">
                      {letter.title}
                    </h3>

                    <p className="text-xs text-neutral-dark">
                      {letter.unit_name} • Pengaju:{" "}
                      <strong className="text-wine-950">{letter.submitter_name}</strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 hover:text-brand-burgundy shrink-0 self-start sm:self-center transition-colors"
                  >
                    {permissions.canReviewLetter ? "Ceklis & Review" : "Pantau Progres"}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
              Tidak ada pengajuan surat yang cocok dengan filter saat ini.
            </div>
          )}
        </div>
      )}

      {/* Centralized Modals */}
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
