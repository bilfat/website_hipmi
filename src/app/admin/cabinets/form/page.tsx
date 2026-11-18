"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import { ArrowLeft, Save, Building, AlertCircle, CheckCircle2 } from "lucide-react";
import { Cabinet } from "@/types/domain";

export default function CabinetFormPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat formulir kabinet..." />}>
      <CabinetFormContent />
    </Suspense>
  );
}

function CabinetFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId") || "";

  const { store, currentUser } = useMockStore();

  const existingCab = recordId ? store.cabinets.find((c) => c.id === recordId) : null;

  const [name, setName] = useState(existingCab?.name || "");
  const [periodStart, setPeriodStart] = useState(existingCab?.period_start || "2026");
  const [periodEnd, setPeriodEnd] = useState(existingCab?.period_end || "2027");
  const [status, setStatus] = useState<"active" | "archived">(existingCab?.status || "active");
  const [vision, setVision] = useState(
    existingCab?.vision ||
      "Mewujudkan HIPMI PT Telkom University sebagai episentrum lahirnya wirausahawan muda yang berdaya saing nasional dan global."
  );
  const [mission, setMission] = useState(
    existingCab?.mission?.join("\n") ||
      "1. Penguatan fondasi kaderisasi wirausaha\n2. Inkubasi dan kemitraan strategis bisnis\n3. Tata kelola organisasi modern dan transparan"
  );
  const [philosophy, setPhilosophy] = useState(
    existingCab?.philosophy ||
      "Arthakarsa melambangkan kehendak mulia dalam menciptakan keberdayaan ekonomi dan kemakmuran bersama."
  );

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama kabinet wajib diisi.");
      return;
    }

    setIsSaving(true);

    mutateStore((draft) => {
      const missionsList = mission.split("\n").filter((m) => m.trim().length > 0);

      if (mode === "edit" && existingCab) {
        const c = draft.cabinets.find((item) => item.id === existingCab.id);
        if (c) {
          c.name = name.trim();
          c.period_start = periodStart.trim();
          c.period_end = periodEnd.trim();
          c.status = status;
          c.vision = vision.trim();
          c.mission = missionsList;
          c.philosophy = philosophy.trim();
        }

        addActivityHistory(
          currentUser.name,
          "memperbarui data kabinet",
          `Kabinet ${name}`,
          "Administrasi Kabinet"
        );
      } else {
        const newCab: Cabinet = {
          id: `cab-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-4)}`,
          name: name.trim(),
          logo: "/placeholder/logo.png",
          period_start: periodStart.trim(),
          period_end: periodEnd.trim(),
          status,
          vision: vision.trim(),
          mission: missionsList,
          philosophy: philosophy.trim()
        };

        draft.cabinets.push(newCab);

        addActivityHistory(
          currentUser.name,
          "menambahkan kabinet baru",
          `Kabinet ${name}`,
          "Administrasi Kabinet"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "CREATE_CABINET",
          "Cabinet",
          newCab.id
        );
      }
    });

    setIsSaving(false);
    router.push("/admin/cabinets");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href="/admin/cabinets"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Cabinet Center</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: ADM-03
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            {mode === "edit" ? "Edit Kabinet" : "Kabinet Baru"}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          {mode === "edit" ? `Ubah Data Kabinet ${existingCab?.name}` : "Tambah Periode Kabinet Baru"}
        </h1>
        <p className="text-xs text-neutral-dark">
          Tentukan identitas kabinet, filosofi, visi-misi, dan masa bakti kepengurusan.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nama Kabinet */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Nama Kabinet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: ARTHAKARSA"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-serif"
              />
            </div>

            {/* Periode Mulai & Selesai */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Tahun Mulai
              </label>
              <input
                type="text"
                required
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                placeholder="2026"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Tahun Selesai
              </label>
              <input
                type="text"
                required
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                placeholder="2027"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-mono"
              />
            </div>

            {/* Status Kabinet */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Status Operasional
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "archived")}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              >
                <option value="active">Aktif (Periode Berjalan)</option>
                <option value="archived">Arsip (Demisioner)</option>
              </select>
            </div>

            {/* Filosofi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Filosofi & Makna Identitas Kabinet
              </label>
              <textarea
                rows={3}
                value={philosophy}
                onChange={(e) => setPhilosophy(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Visi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Visi Kabinet
              </label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Misi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Misi Kabinet (1 baris per butir misi)
              </label>
              <textarea
                rows={4}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/cabinets"
            className="px-6 py-2.5 rounded-full border border-wine-950/20 text-xs font-medium text-wine-950 hover:bg-wine-950/5 transition-colors"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Menyimpan..." : "Simpan Data Kabinet"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
