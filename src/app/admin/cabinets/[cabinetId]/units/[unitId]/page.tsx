"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  ArrowLeft,
  Building,
  Users,
  FolderKanban,
  Edit3,
  Save,
  CheckCircle2,
  Calendar,
  AlertTriangle
} from "lucide-react";

export default function UnitDetailPage({
  params,
}: {
  params: Promise<{ cabinetId: string; unitId: string }>;
}) {
  const { cabinetId, unitId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];
  const field = store.fields.find((f) => f.id === unitId);
  const compartment = store.compartments.find((c) => c.id === unitId);

  const isField = !!field;
  const unit = field || compartment;

  // Prokers under this unit
  const relatedProjects = store.projects.filter(
    (p) => (isField ? p.field_id === unitId : p.compartment_id === unitId)
  );

  const [description, setDescription] = useState(unit?.description || "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (!unit) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
        <h1 className="font-serif text-2xl font-bold text-wine-950">
          Unit Organisasi Tidak Ditemukan
        </h1>
        <Link
          href={`/admin/cabinets/${cab.id}/structure`}
          className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          Kembali ke Struktur Organisasi
        </Link>
      </div>
    );
  }

  const handleSaveDescription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    mutateStore((draft) => {
      if (isField) {
        const f = draft.fields.find((item) => item.id === unitId);
        if (f) f.description = description.trim();
      } else {
        const c = draft.compartments.find((item) => item.id === unitId);
        if (c) c.description = description.trim();
      }

      addActivityHistory(
        currentUser.name,
        "memperbarui deskripsi unit organisasi",
        unit.name,
        "Struktur Organisasi"
      );
    });

    setIsSaving(false);
    setFeedback("Deskripsi unit berhasil disimpan!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}/structure`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Struktur Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: ADM-06
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
            {isField ? "Bidang Utama" : "Kompartemen"}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          {unit.name}
        </h1>
        <p className="text-xs text-neutral-dark">
          Kabinet {cab.name} • Unit Kelembagaan Organisasi
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Overview & Edit Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <form onSubmit={handleSaveDescription} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950 flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Deskripsi Tugas Pokok & Fungsi (Tupoksi) Unit</span>
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
              <span>{isSaving ? "Menyimpan..." : "Simpan Tupoksi"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Related Prokers */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
        <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-brand-burgundy" />
          <span>Program Kerja Di Bawah Naungan Unit Ini ({relatedProjects.length})</span>
        </h2>

        {relatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-wine-950 font-serif text-sm block">
                    {p.name}
                  </strong>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase bg-gold-400/20 text-wine-950">
                    {p.operational_status}
                  </span>
                </div>
                <p className="text-neutral-dark line-clamp-2">
                  {p.description}
                </p>
                <span className="text-[10px] font-mono text-neutral-light block">
                  Lokasi: {p.location}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-dark">
            Belum ada program kerja yang diasosiasikan langsung dengan unit ini.
          </p>
        )}
      </div>
    </div>
  );
}
