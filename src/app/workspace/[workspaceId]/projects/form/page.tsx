"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import { ArrowLeft, Save, FolderKanban, AlertCircle, CheckCircle2 } from "lucide-react";
import { Project, ProjectOperationalStatus, ProjectPublicationStatus } from "@/types/domain";

export default function ProjectFormPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  return (
    <Suspense fallback={<BrandLoader message="Memuat formulir proker..." />}>
      <ProjectFormContent params={params} />
    </Suspense>
  );
}

function ProjectFormContent({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const recordId = searchParams.get("recordId") || "";

  const { store, currentUser } = useMockStore();

  const existingProject = recordId ? store.projects.find((p) => p.id === recordId) : null;
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const fieldId = compartment?.field_id || "field-internal";

  const [name, setName] = useState(existingProject?.name || "");
  const [purpose, setPurpose] = useState(existingProject?.purpose || "");
  const [description, setDescription] = useState(existingProject?.description || "");
  const [startDate, setStartDate] = useState(existingProject?.start_date || "2026-09-01");
  const [mainEventDate, setMainEventDate] = useState(existingProject?.main_event_date || "2026-11-20");
  const [targetDate, setTargetDate] = useState(existingProject?.target_date || "2026-12-15");
  const [hideMainEvent, setHideMainEvent] = useState(existingProject?.hide_main_event_date_public || false);
  const [location, setLocation] = useState(existingProject?.location || "Auditorium Telkom University");
  const [operationalStatus, setOperationalStatus] = useState<ProjectOperationalStatus>(
    existingProject?.operational_status || "planned"
  );
  const [publicationStatus, setPublicationStatus] = useState<ProjectPublicationStatus>(
    existingProject?.publication_status || "draft"
  );

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama program kerja wajib diisi.");
      return;
    }

    setIsSaving(true);

    mutateStore((draft) => {
      const activeCab = draft.cabinets.find((c) => c.status === "active") || draft.cabinets[0];

      if (mode === "edit" && existingProject) {
        const p = draft.projects.find((item) => item.id === existingProject.id);
        if (p) {
          p.name = name.trim();
          p.purpose = purpose.trim();
          p.description = description.trim();
          p.start_date = startDate;
          p.main_event_date = mainEventDate;
          p.target_date = targetDate;
          p.hide_main_event_date_public = hideMainEvent;
          p.location = location.trim();
          p.operational_status = operationalStatus;
          p.publication_status = publicationStatus;
        }

        addActivityHistory(
          currentUser.name,
          "memperbarui data program kerja",
          name.trim(),
          "Program Kerja"
        );
      } else {
        const newProj: Project = {
          id: `proj-${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString().slice(-4)}`,
          compartment_id: compartment?.id || workspaceId,
          field_id: fieldId,
          cabinet_id: activeCab.id,
          name: name.trim(),
          purpose: purpose.trim() || name.trim(),
          description: description.trim(),
          start_date: startDate,
          main_event_date: mainEventDate,
          target_date: targetDate,
          hide_main_event_date_public: hideMainEvent,
          location: location.trim(),
          operational_status: operationalStatus,
          publication_status: publicationStatus
        };

        draft.projects.push(newProj);

        addActivityHistory(
          currentUser.name,
          "membuat program kerja baru",
          name.trim(),
          "Program Kerja"
        );

        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "CREATE_PROJECT",
          "Project",
          newProj.id
        );
      }
    });

    setIsSaving(false);
    router.push(`/workspace/${workspaceId}/projects`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/${workspaceId}/projects`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar Proker</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: WRK-04
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            {mode === "edit" ? "Edit Proker" : "Proker Baru"}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          {mode === "edit" ? `Ubah Proker: ${existingProject?.name}` : "Formulir Program Kerja Baru"}
        </h1>
        <p className="text-xs text-neutral-dark">
          Tentukan identitas proker, jadwal pelaksanaan, lokasi, serta status operasional dan publikasi.
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
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nama Proker */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Nama Program Kerja <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Telkom Business Expo 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-serif"
              />
            </div>

            {/* Tujuan */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Tujuan / Output Utama Proker
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Contoh: Wadah promosi dan inkubasi 50+ bisnis kader mahasiswa"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Deskripsi Lengkap Program Kerja
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Jadwal Pelaksanaan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Tanggal Mulai Kerja
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-wine-950/15 text-xs text-wine-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Tanggal Main Event
              </label>
              <input
                type="date"
                value={mainEventDate}
                onChange={(e) => setMainEventDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-wine-950/15 text-xs text-wine-950"
              />
            </div>

            {/* Checkbox Sembunyikan Tanggal Main Event (Coming Soon logic) */}
            <div className="sm:col-span-2 pt-1">
              <label className="flex items-center gap-2.5 text-xs text-neutral-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideMainEvent}
                  onChange={(e) => setHideMainEvent(e.target.checked)}
                  className="rounded border-wine-950/20 text-brand-burgundy"
                />
                <span>
                  Sembunyikan tanggal main event dari publik (Tampilkan status &quot;Coming Soon&quot; pada katalog publik)
                </span>
              </label>
            </div>

            {/* Lokasi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Lokasi / Venue Acara
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Gedung Damar / Online Zoom"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-sm text-wine-950"
              />
            </div>

            {/* Status Operasional */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Status Operasional
              </label>
              <select
                value={operationalStatus}
                onChange={(e) => setOperationalStatus(e.target.value as ProjectOperationalStatus)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-sm text-wine-950"
              >
                <option value="draft">Draft</option>
                <option value="planned">Planned (Terencana)</option>
                <option value="ongoing">Ongoing (Sedang Berjalan)</option>
                <option value="completed">Completed (Selesai)</option>
                <option value="cancelled">Cancelled (Dibatalkan)</option>
              </select>
            </div>

            {/* Status Publikasi */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Status Publikasi
              </label>
              <select
                value={publicationStatus}
                onChange={(e) => setPublicationStatus(e.target.value as ProjectPublicationStatus)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-sm text-wine-950"
              >
                <option value="unpublished">Unpublished (Internal)</option>
                <option value="draft">Draft Publikasi</option>
                <option value="review">Review</option>
                <option value="published">Published (Tayang di Publik)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/workspace/${workspaceId}/projects`}
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
            <span>{isSaving ? "Menyimpan..." : "Simpan Program Kerja"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
