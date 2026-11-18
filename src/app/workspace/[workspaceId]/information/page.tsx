"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  Info,
  ArrowLeft,
  Building,
  FolderKanban,
  Edit3,
  Save,
  CheckCircle2,
  Calendar,
  Users
} from "lucide-react";

export default function WorkspaceInformationPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { store, currentUser } = useMockStore();

  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const project = store.projects.find((p) => p.id === workspaceId);

  const contextType = field ? "Bidang" : compartment ? "Kompartemen" : "Program Kerja";
  const unit = field || compartment || project || store.compartments[0];

  const [description, setDescription] = useState(unit?.description || "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    mutateStore((draft) => {
      if (field) {
        const f = draft.fields.find((item) => item.id === workspaceId);
        if (f) f.description = description.trim();
      } else if (compartment) {
        const c = draft.compartments.find((item) => item.id === workspaceId);
        if (c) c.description = description.trim();
      } else if (project) {
        const p = draft.projects.find((item) => item.id === workspaceId);
        if (p) p.description = description.trim();
      }

      addActivityHistory(
        currentUser.name,
        "memperbarui profil informasi ruang kerja",
        unit.name,
        "Workspace"
      );
    });

    setIsSaving(false);
    setFeedback("Profil ruang kerja berhasil disimpan!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/${workspaceId}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview Workspace</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: WRK-02
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Informasi Workspace
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Profil Ruang Kerja: {unit.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Tipe Ruang Kerja: <strong className="text-wine-950">{contextType}</strong> • Tata kelola operasional
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Profile Card & Edit Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Deskripsi & Tujuan Operasional Ruang Kerja</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-wine-950/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block">Dasar Pembentukan</span>
            <strong className="text-wine-950 font-serif text-sm block">
              SK BPC HIPMI PT Telkom No. 004/2026
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block">Hak Akses Workspace</span>
            <strong className="text-brand-burgundy font-serif text-sm block">
              Terbatas Berdasarkan Roster & Role
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
