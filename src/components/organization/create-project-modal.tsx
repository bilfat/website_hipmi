"use client";

import { useState, useEffect } from "react";
import { MockStoreData, Project, User } from "@/types/domain";
import { mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { CadreNimLookup } from "@/components/organization/cadre-nim-lookup";
import { Save, AlertCircle, Info } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  defaultCompartmentId?: string | null;
  onCreated?: (projectName: string) => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  store,
  currentUser,
  defaultCompartmentId,
  onCreated,
}: CreateProjectModalProps) {
  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const compId = defaultCompartmentId || store.compartments[0]?.id || "comp-demo-01";
  const comp = store.compartments.find((c) => c.id === compId) || store.compartments[0];
  const field = store.fields.find((f) => f.id === comp?.field_id);

  // Only verified cadres can be assigned as Project Manager (front_end.md WRK-06)
  const verifiedCadres = store.users.filter(
    (u) => u.account_status === "active" && u.cadre_status === "verified"
  );

  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [mainEventDate, setMainEventDate] = useState("");
  const [location, setLocation] = useState("Universitas Telkom, Bandung");
  const [managerUserId, setManagerUserId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    setPurpose("");
    setDescription("");
    setStartDate(new Date().toISOString().split("T")[0]);
    setMainEventDate("");
    setLocation("Universitas Telkom, Bandung");
    setManagerUserId("");
    setErrorMsg("");
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !purpose.trim()) {
      setErrorMsg("Mohon lengkapi nama program kerja dan tujuan utamanya.");
      return;
    }

    const managerUser = verifiedCadres.find((u) => u.id === managerUserId);
    const newProjectId = `proj-${Date.now()}`;

    mutateStore((draft) => {
      const newProj: Project = {
        id: newProjectId,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        field_id: comp?.field_id || "field-demo-01",
        compartment_id: comp?.id || "comp-demo-01",
        name: name.trim(),
        purpose: purpose.trim(),
        description: description.trim() || purpose.trim(),
        lead_name: managerUser?.name || currentUser.name,
        start_date: startDate || new Date().toISOString().split("T")[0],
        main_event_date: mainEventDate || startDate || new Date().toISOString().split("T")[0],
        target_date: mainEventDate || startDate || new Date().toISOString().split("T")[0],
        hide_main_event_date_public: !mainEventDate,
        location: location.trim() || "Universitas Telkom",
        logo_url: "",
        operational_status: "draft",
        publication_status: "unpublished",
        managers: managerUser
          ? [
              {
                user_id: managerUser.id,
                assigned_by: currentUser.id,
                assigned_at: new Date().toISOString(),
                status: "active",
              },
            ]
          : [],
        progress_notes: [],
      };

      draft.projects.unshift(newProj);

      if (managerUser) {
        draft.roster.push({
          id: `ros-${Date.now()}`,
          project_id: newProjectId,
          user_id: managerUser.id,
          name: managerUser.name,
          nim: managerUser.nim,
          role_title: "Ketua Pelaksana (Manager)",
          access_level: "Manager",
          status: "active",
          is_cadre: true,
          joined_at: new Date().toISOString(),
        });
      }

      addActivityHistory(
        currentUser.name,
        "membuat draf program kerja baru",
        name.trim(),
        comp?.name || "Workspace Kompartemen"
      );

      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "CREATE_PROJECT",
        "Project",
        newProjectId
      );
    });

    onCreated?.(name.trim());
    onClose();
  };

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge={`Khusus Kepala Kompartemen • ${comp?.name || "Unit"}`}
      title="Buat Program Kerja Baru"
      subtitle={`Proker baru akan dibuat sebagai Draf di bawah ${comp?.name || "Kompartemen"} (${field?.name || "Bidang"}).`}
      maxWidth="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6]"
          >
            Batal
          </button>
          <button
            type="submit"
            form="create-project-modal-form"
            className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Draf Proker</span>
          </button>
        </>
      }
    >
      <form id="create-project-modal-form" onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Nama Program Kerja <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: HIPMI Startup Pitching Day 2026"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Tujuan Utama Proker <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Contoh: Mempertemukan startup kader dengan mentor dan investor."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">Deskripsi Singkat</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Gambaran singkat rangkaian acara dan target peserta..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">Tanggal Mulai Persiapan</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs text-wine-950"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Tanggal Main Event (Opsional)
            </label>
            <input
              type="date"
              value={mainEventDate}
              onChange={(e) => setMainEventDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs text-wine-950"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">Lokasi Rencana</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Gedung / Aula / Online"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
            />
          </div>

          <div className="sm:col-span-2 space-y-2 pt-2 border-t border-[#E9E1DC]">
            <label className="text-xs font-semibold text-wine-950 block">
              Tunjuk Pengelola Proker (Cari berdasarkan NIM / Nama Kader — Opsional)
            </label>
            <CadreNimLookup
              users={store.users}
              selectedUserId={managerUserId}
              mode="select"
              onSelect={(u) => setManagerUserId(u.id)}
              onClearSelection={() => setManagerUserId("")}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/75 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            Proker dibuat sebagai <strong>Draf</strong> terlebih dahulu. Pengelola Proker (Manager) wajib melengkapi detail dan mengunggah <strong>Logo Proker</strong> sebelum status dinaikkan menjadi <em>Sedang Berjalan</em> atau <em>Publikasi</em>.
          </span>
        </div>
      </form>
    </EditorialModal>
  );
}
