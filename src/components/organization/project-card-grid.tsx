"use client";

import { useState } from "react";
import Link from "next/link";
import { MockStoreData, Project } from "@/types/domain";
import { PROJECT_STATUS_LABELS } from "@/lib/personal/labels";
import {
  FolderKanban,
  Search,
  Calendar,
  Users,
  Mail,
  Wallet,
  FileText,
  ArrowRight,
  AlertTriangle,
  Plus,
} from "lucide-react";

interface ProjectCardGridProps {
  store: MockStoreData;
  projects: Project[];
  showFieldFilter?: boolean;
  showCompartmentFilter?: boolean;
  canCreateProject?: boolean;
  onCreateProject?: () => void;
  title?: string;
  subtitle?: string;
}

export function ProjectCardGrid({
  store,
  projects,
  showFieldFilter = false,
  showCompartmentFilter = true,
  canCreateProject = false,
  onCreateProject,
  title = "Daftar Program Kerja",
  subtitle = "Klik kartu program kerja untuk membuka ruang kerja Project 360 dan memantau seluruh progres, surat, dana, serta LPJ.",
}: ProjectCardGridProps) {
  const [selectedField, setSelectedField] = useState("");
  const [selectedCompartment, setSelectedCompartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [query, setQuery] = useState("");

  // Available compartments scoped to the passed projects + selected field
  const relevantFieldIds = Array.from(new Set(projects.map((p) => p.field_id)));
  const fieldOptions = store.fields.filter((f) => relevantFieldIds.includes(f.id));

  const relevantCompIds = Array.from(
    new Set(
      projects
        .filter((p) => !selectedField || p.field_id === selectedField)
        .map((p) => p.compartment_id)
    )
  );
  const compOptions = store.compartments.filter((c) => relevantCompIds.includes(c.id));

  const filteredProjects = projects.filter((p) => {
    if (selectedField && p.field_id !== selectedField) return false;
    if (selectedCompartment && p.compartment_id !== selectedCompartment) return false;
    if (selectedStatus && p.operational_status !== selectedStatus) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const compName = store.compartments.find((c) => c.id === p.compartment_id)?.name || "";
      if (
        !p.name.toLowerCase().includes(q) &&
        !compName.toLowerCase().includes(q) &&
        !(p.lead_name || "").toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <section className="space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-0.5">
          <h2 className="font-serif text-lg sm:text-xl font-bold text-wine-950 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-brand-burgundy" />
            <span>{title}</span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
              {filteredProjects.length}
            </span>
          </h2>
          <p className="text-xs text-neutral-dark">{subtitle}</p>
        </div>

        {canCreateProject && onCreateProject && (
          <button
            type="button"
            onClick={onCreateProject}
            className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Buat Proker Baru</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3">
        {/* Compartment Pill Switcher (ideal for Bidang with many compartments!) */}
        {showCompartmentFilter && compOptions.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCompartment("")}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors border ${
                selectedCompartment === ""
                  ? "bg-brand-burgundy text-white border-brand-burgundy"
                  : "bg-[#FCF8F6] text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
              }`}
            >
              Semua Kompartemen ({projects.filter((p) => !selectedField || p.field_id === selectedField).length})
            </button>
            {compOptions.map((c) => {
              const count = projects.filter(
                (p) => p.compartment_id === c.id && (!selectedField || p.field_id === selectedField)
              ).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCompartment(c.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors border ${
                    selectedCompartment === c.id
                      ? "bg-brand-burgundy text-white border-brand-burgundy"
                      : "bg-[#FCF8F6] text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
                  }`}
                >
                  {c.name.replace("Kompartemen ", "")} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Search + Field/Status Dropdowns */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama proker, kompartemen, atau pengelola..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 text-xs text-wine-950"
            />
          </div>

          {showFieldFilter && fieldOptions.length > 1 && (
            <select
              value={selectedField}
              onChange={(e) => {
                setSelectedField(e.target.value);
                setSelectedCompartment("");
              }}
              className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
            >
              <option value="">Semua Bidang</option>
              {fieldOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20"
          >
            <option value="">Semua Status</option>
            <option value="draft">Perencanaan Awal</option>
            <option value="planned">Terjadwal</option>
            <option value="ongoing">Sedang Berjalan</option>
            <option value="completed">Selesai</option>
            <option value="archived">Diarsipkan</option>
          </select>
        </div>
      </div>

      {/* LMS-Style Operational Project Cards Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => {
            const comp = store.compartments.find((c) => c.id === project.compartment_id);
            const statusInfo =
              PROJECT_STATUS_LABELS[project.operational_status] || PROJECT_STATUS_LABELS.ongoing;

            const rosterCount = store.roster.filter((r) => r.project_id === project.id).length;
            const projLetters = store.correspondence.filter((c) => c.project_id === project.id);
            const projFunds = store.fund_requests.filter((f) => f.project_id === project.id);
            const projLpj = store.lpjs.find((l) => l.project_id === project.id);

            const activeManagers = (project.managers || []).filter((m) => m.status === "active");
            const managerName =
              activeManagers.length > 0
                ? store.users.find((u) => u.id === activeManagers[0].user_id)?.name ||
                  project.lead_name ||
                  "Belum ditunjuk"
                : project.lead_name || "Belum ditunjuk";

            const needsAttention =
              activeManagers.length === 0 ||
              projLetters.some((l) => l.status === "revision" || l.status === "revision_needed") ||
              projFunds.some((f) => f.status === "revision") ||
              (!project.logo_url && project.operational_status === "draft");

            return (
              <Link
                key={project.id}
                href={`/workspace/projects/${project.id}`}
                className="group p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-[0_4px_18px_rgba(61,15,22,0.04)] hover:border-brand-burgundy/45 hover:shadow-[0_12px_32px_rgba(61,15,22,0.09)] transition-all flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy truncate max-w-[60%]">
                      {comp?.name.replace("Kompartemen ", "") || "Unit"}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${statusInfo.tone}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Title & Purpose */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-wine-950 leading-snug group-hover:text-brand-burgundy transition-colors line-clamp-2">
                      {project.name}
                    </h3>
                    <p className="text-[11px] text-neutral-dark line-clamp-2 leading-relaxed">
                      {project.purpose || project.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-dark">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-brand-burgundy shrink-0" />
                      {project.main_event_date
                        ? new Date(project.main_event_date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Belum ditentukan"}
                    </span>
                    <span className="text-neutral-light">•</span>
                    <span className="truncate">
                      PIC: <strong className="text-wine-950">{managerName}</strong>
                    </span>
                  </div>

                  {/* Attention Signal if needed */}
                  {needsAttention && (
                    <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[10px] text-amber-900 flex items-center gap-1.5 font-medium">
                      <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">
                        {activeManagers.length === 0
                          ? "Pengelola Proker belum ditunjuk"
                          : !project.logo_url && project.operational_status === "draft"
                          ? "Menunggu logo proker sebelum aktif"
                          : "Ada surat atau dana perlu revisi"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Operational Health Strip + Action Footer */}
                <div className="pt-3 border-t border-[#E9E1DC] space-y-2.5">
                  <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="p-1.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC]">
                      <Users className="w-3 h-3 text-brand-burgundy mx-auto mb-0.5" />
                      <strong className="text-wine-950 block font-mono">{rosterCount}</strong>
                      <span className="text-[9px] text-neutral-light">Tim</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC]">
                      <Mail className="w-3 h-3 text-[#AF7D66] mx-auto mb-0.5" />
                      <strong className="text-wine-950 block font-mono">{projLetters.length}</strong>
                      <span className="text-[9px] text-neutral-light">Surat</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC]">
                      <Wallet className="w-3 h-3 text-emerald-700 mx-auto mb-0.5" />
                      <strong className="text-wine-950 block font-mono">{projFunds.length}</strong>
                      <span className="text-[9px] text-neutral-light">RAB</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC]">
                      <FileText className="w-3 h-3 text-wine-950 mx-auto mb-0.5" />
                      <strong className="text-wine-950 block font-mono">
                        {projLpj?.status === "approved" ? "Sah" : projLpj ? "Ada" : "-"}
                      </strong>
                      <span className="text-[9px] text-neutral-light">LPJ</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-brand-burgundy">
                    <span>Buka Ruang Kerja Proker</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-2.5">
          <FolderKanban className="w-9 h-9 text-neutral-300 mx-auto" />
          <p className="text-xs text-neutral-dark">
            Belum ada program kerja yang cocok dengan filter saat ini.
          </p>
        </div>
      )}
    </section>
  );
}
