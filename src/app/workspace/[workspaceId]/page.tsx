"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { ProjectCardGrid } from "@/components/organization/project-card-grid";
import { CreateProjectModal } from "@/components/organization/create-project-modal";
import {
  Layers,
  FolderKanban,
  Calendar,
  Mail,
  Wallet,
  Plus,
  CheckCircle2,
  ClipboardList,
  ArrowRight,
  Building,
  Eye,
  Handshake,
} from "lucide-react";

export default function WorkspaceOverviewPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [createProjOpen, setCreateProjOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const project = store.projects.find((p) => p.id === workspaceId);

  // If URL is a Project ID, redirect cleanly to Project 360
  useEffect(() => {
    if (project) {
      router.replace(`/workspace/projects/${project.id}`);
    }
  }, [project, router]);

  if (project) {
    return null;
  }

  const contextType: "field" | "compartment" = field ? "field" : "compartment";
  const currentUnit = field || compartment || store.compartments[0];

  const unitProjects =
    contextType === "field" && field
      ? store.projects.filter((p) => p.field_id === field.id)
      : compartment
      ? store.projects.filter((p) => p.compartment_id === compartment.id)
      : [];

  const fieldComps = field
    ? store.compartments.filter((c) => c.field_id === field.id)
    : [];

  const parentField = compartment
    ? store.fields.find((f) => f.id === compartment.field_id)
    : null;

  const canCreateHere =
    contextType === "compartment" &&
    permissions.isKakom &&
    (!permissions.managedCompartmentId || permissions.managedCompartmentId === compartment?.id);

  const unitProjectIds = unitProjects.map((p) => p.id);
  const unitLettersCount = store.correspondence.filter(
    (c) => c.project_id && unitProjectIds.includes(c.project_id)
  ).length;
  const unitFundsCount = store.fund_requests.filter(
    (f) => f.project_id && unitProjectIds.includes(f.project_id)
  ).length;

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      {/* Feedback Toast */}
      {toastMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Workspace Editorial Header */}
      <section className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-[0_10px_32px_rgba(61,15,22,0.05)] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                {contextType === "field" ? "Workspace Bidang" : "Workspace Kompartemen"}
              </span>
              {parentField && (
                <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                  {parentField.name}
                </span>
              )}
              {contextType === "field" && (
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 inline-flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  Mode Pemantauan Kepala Bidang
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
              {currentUnit.name}
            </h1>

            <p className="text-xs text-neutral-dark max-w-2xl leading-relaxed">
              {currentUnit.description ||
                "Ruang kerja terpadu untuk memantau kompartemen, program kerja, jadwal pleno, dan pengajuan operasional unit."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {canCreateHere && (
              <button
                type="button"
                onClick={() => setCreateProjOpen(true)}
                className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Proker Baru</span>
              </button>
            )}

            {contextType === "compartment" && (
              <Link
                href={`/workspace/${workspaceId}/pleno`}
                className="px-4 py-2.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <ClipboardList className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Pleno &amp; Aktivitas Unit</span>
              </Link>
            )}

            <Link
              href={`/workspace/${workspaceId}/calendar`}
              className="px-4 py-2.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#AF7D66]" />
              <span>Kalender Unit</span>
            </Link>
          </div>
        </div>

        {/* 4 Compact Unit Stats (2-col mobile / 4-col desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-[#E9E1DC]">
          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-semibold text-neutral-dark flex items-center gap-1.5">
              {contextType === "field" ? (
                <Layers className="w-3.5 h-3.5 text-brand-burgundy" />
              ) : (
                <Building className="w-3.5 h-3.5 text-brand-burgundy" />
              )}
              <span>{contextType === "field" ? "Kompartemen" : "Pemimpin Unit"}</span>
            </span>
            <strong className="font-serif text-lg sm:text-xl font-bold text-wine-950 block mt-1 truncate">
              {contextType === "field" ? fieldComps.length : currentUnit.leader_name || "-"}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-semibold text-neutral-dark flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-[#AF7D66]" />
              <span>Program Kerja</span>
            </span>
            <strong className="font-serif text-lg sm:text-xl font-bold text-wine-950 block mt-1">
              {unitProjects.length}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-semibold text-neutral-dark flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-sky-700" />
              <span>Persuratan Terkait</span>
            </span>
            <strong className="font-serif text-lg sm:text-xl font-bold text-wine-950 block mt-1">
              {unitLettersCount}
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
            <span className="text-[10px] font-semibold text-neutral-dark flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Pengajuan RAB</span>
            </span>
            <strong className="font-serif text-lg sm:text-xl font-bold text-wine-950 block mt-1">
              {unitFundsCount}
            </strong>
          </div>
        </div>
      </section>

      {/* For Workspace Bidang: Quick Compartment Cards */}
      {contextType === "field" && fieldComps.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-burgundy" />
            <span>Kompartemen di Bawah {field?.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fieldComps.map((c) => {
              const compProjs = store.projects.filter((p) => p.compartment_id === c.id);
              return (
                <Link
                  key={c.id}
                  href={`/workspace/${c.id}`}
                  className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all group space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                      {c.code}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-dark">
                      {compProjs.length} Proker
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block group-hover:text-brand-burgundy transition-colors">
                    {c.name}
                  </strong>
                  <p className="text-[11px] text-neutral-dark line-clamp-2">{c.description}</p>
                  <div className="pt-2 border-t border-[#E9E1DC] flex items-center justify-between text-[11px]">
                    <span className="text-neutral-light truncate">Kakom: {c.leader_name}</span>
                    <span className="font-semibold text-brand-burgundy inline-flex items-center gap-1 shrink-0">
                      Pantau <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* LMS-Style Project Cards Grid */}
      <ProjectCardGrid
        store={store}
        projects={unitProjects}
        showFieldFilter={false}
        showCompartmentFilter={contextType === "field"}
        canCreateProject={canCreateHere}
        onCreateProject={() => setCreateProjOpen(true)}
        title={
          contextType === "field"
            ? `Seluruh Program Kerja di ${field?.name || "Bidang"}`
            : `Program Kerja ${compartment?.name || "Kompartemen"}`
        }
        subtitle={
          contextType === "field"
            ? "Gunakan filter kompartemen di atas untuk menyaring proker. Klik kartu proker untuk inspeksi Project 360."
            : "Klik kartu program kerja untuk mengelola roster panitia, progres naratif, surat, keuangan, dan LPJ."
        }
      />

      {/* Sponsor & Mitra Quick Banner */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white/90 border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <strong className="font-serif text-sm text-wine-950 block">
              Butuh Referensi Sponsor atau Mitra Perusahaan?
            </strong>
            <p className="text-xs text-neutral-dark">
              Akses Direktori Sponsor &amp; Mitra untuk melihat daftar perusahaan dan riwayat kerja sama HIPMI.
            </p>
          </div>
        </div>
        <Link
          href="/organization/directory/companies"
          className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 hover:text-brand-burgundy inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center transition-colors"
        >
          <span>Buka Direktori Mitra</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* Modal Buat Proker Baru (Kakom Only) */}
      {canCreateHere && (
        <CreateProjectModal
          isOpen={createProjOpen}
          onClose={() => setCreateProjOpen(false)}
          store={store}
          currentUser={currentUser}
          defaultCompartmentId={compartment?.id}
          onCreated={(projName) =>
            setToastMsg(`Draf program kerja "${projName}" berhasil dibuat di ${compartment?.name}!`)
          }
        />
      )}
    </div>
  );
}
