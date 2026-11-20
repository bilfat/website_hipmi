"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { User, CadreStatus } from "@/types/domain";
import {
  Search,
  Plus,
  UserCheck,
  Edit3,
  Trash2,
  ChevronRight,
  CheckCircle2,
  Eye,
  GraduationCap,
} from "lucide-react";

const CADRE_STATUS_MAP: Record<string, { label: string; tone: string }> = {
  verified: { label: "Kader Terverifikasi", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  pending_verification: { label: "Menunggu Verifikasi", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  candidate: { label: "Calon Anggota", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  not_verified: { label: "Belum Terverifikasi", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
  rejected: { label: "Ditolak", tone: "bg-rose-50 text-rose-700 border-rose-200" },
};

export default function CadreDirectoryPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const canManage = permissions.canManageCadres;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [studyProgram, setStudyProgram] = useState("S1 Informatika");
  const [batchYear, setBatchYear] = useState("2024");
  const [cadreStatus, setCadreStatus] = useState<CadreStatus>("verified");
  const [cadreLevel, setCadreLevel] = useState("Anggota Biasa");
  const [memberId, setMemberId] = useState("");

  const users = store.users.filter((u) => {
    if (statusFilter !== "all" && u.cadre_status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchName = (u.full_name || u.name || "").toLowerCase().includes(q);
      const matchNim = (u.nim || "").toLowerCase().includes(q);
      const matchMajor = (u.study_program || "").toLowerCase().includes(q);
      if (!matchName && !matchNim && !matchMajor) return false;
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setNim("");
    setEmail("");
    setStudyProgram("S1 Informatika");
    setBatchYear("2024");
    setCadreStatus("verified");
    setCadreLevel("Anggota Biasa");
    setMemberId("");
    setModalOpen(true);
  };

  const openEditModal = (u: User) => {
    setEditingId(u.id);
    setName(u.name || u.full_name || "");
    setNim(u.nim || "");
    setEmail(u.email || "");
    setStudyProgram(u.study_program || "S1 Informatika");
    setBatchYear(u.batch_year || "2024");
    setCadreStatus(u.cadre_status);
    setCadreLevel(u.cadre_level || "Anggota Biasa");
    setMemberId(u.member_id || "");
    setModalOpen(true);
  };

  const handleSaveCadre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !nim.trim()) return;

    const autoKta =
      cadreStatus === "verified" && !memberId.trim()
        ? `HIPMI-PT-${batchYear || "2024"}-${Math.floor(1000 + Math.random() * 9000)}`
        : memberId.trim() || undefined;

    mutateStore((draft) => {
      if (editingId) {
        const target = draft.users.find((u) => u.id === editingId);
        if (target) {
          target.name = name.trim();
          target.full_name = name.trim();
          target.nim = nim.trim();
          target.email = email.trim() || target.email;
          target.study_program = studyProgram.trim();
          target.batch_year = batchYear.trim();
          target.cadre_status = cadreStatus;
          target.cadre_level = cadreLevel.trim();
          target.member_id = autoKta;
        }
        addAuditEvent(currentUser.id, currentUser.name, "UPDATE_CADRE", "User", editingId, undefined, name.trim());
      } else {
        const newId = `usr-cadre-${Date.now()}`;
        draft.users.unshift({
          id: newId,
          demo_id: `KDR-${Math.floor(100 + Math.random() * 900)}`,
          name: name.trim(),
          full_name: name.trim(),
          nim: nim.trim(),
          email: email.trim() || `${nim.trim()}@student.telkomuniversity.ac.id`,
          phone: "081200000000",
          faculty_id: "fac-fif",
          study_program_id: "sp-if",
          study_program: studyProgram.trim(),
          batch_year: batchYear.trim(),
          account_status: "active",
          cadre_status: cadreStatus,
          cadre_level: cadreLevel.trim(),
          member_id: autoKta,
          base_role: "kader",
          additional_permissions: [],
          created_at: new Date().toISOString(),
        });
        addActivityHistory(currentUser.name, "menambahkan data kader baru", name.trim(), "Database Kader");
      }
    });

    setModalOpen(false);
    setFeedback(
      editingId
        ? `Data kader "${name.trim()}" berhasil diperbarui.`
        : `Kader baru "${name.trim()}" berhasil ditambahkan ke Database Kader.`
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const removedName = deleteTarget.name;
    mutateStore((draft) => {
      draft.users = draft.users.filter((u) => u.id !== deleteTarget.id);
      addAuditEvent(currentUser.id, currentUser.name, "DELETE_CADRE", "User", deleteTarget.id, removedName, "DELETED");
    });
    setDeleteTarget(null);
    setFeedback(`Data kader "${removedName}" berhasil dihapus dari database.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Direktori &amp; PSDM
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Database Kader HIPMI Telkom
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Satu pangkalan data keanggotaan kader untuk verifikasi NIM, nomor e-KTA resmi, tingkatan, serta rekam jejak jabatan lintas kabinet.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {canManage && (
            <button
              type="button"
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Kader</span>
            </button>
          )}
          {(canManage || permissions.canVerifyCadres) && (
            <Link
              href="/organization/directory/cadres/verification"
              className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Verifikasi &amp; Penautan NIM</span>
            </Link>
          )}
        </div>
      </div>

      {!canManage && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan ({permissions.roleBadgeTitle}) — Pengelolaan (Tambah/Edit/Hapus) Database Kader dipegang oleh unit PSDM / Admin Sistem yang ditunjuk.
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
            placeholder="Cari nama kader, NIM Telkom, atau program studi..."
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
          <option value="all">Semua Status Kader ({store.users.length})</option>
          <option value="verified">Kader Terverifikasi</option>
          <option value="pending_verification">Menunggu Verifikasi</option>
          <option value="candidate">Calon Anggota</option>
          <option value="not_verified">Belum Terverifikasi</option>
        </select>
      </div>

      {/* Cadres Cards Grid */}
      <div className="space-y-3">
        {users.length > 0 ? (
          users.map((u) => {
            const st = CADRE_STATUS_MAP[u.cadre_status] || CADRE_STATUS_MAP.not_verified;
            return (
              <div
                key={u.id}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/35 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-light">
                      NIM: {u.nim || "-"}
                    </span>
                    {u.member_id && (
                      <span className="text-[10px] font-mono font-bold text-brand-burgundy bg-brand-burgundy/10 px-2 py-0.5 rounded-md">
                        {u.member_id}
                      </span>
                    )}
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">
                    {u.name || u.full_name}
                  </strong>
                  <span className="text-[11px] text-neutral-dark inline-flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#AF7D66]" />
                    <span>
                      {u.study_program || "Telkom University"} • Angkatan {u.batch_year || "-"} •{" "}
                      {u.cadre_level || "Anggota"}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                  {canManage && (
                    <>
                      <button
                        type="button"
                        onClick={() => openEditModal(u)}
                        className="px-3 py-1.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      {u.id !== currentUser.id && (
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(u)}
                          className="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      )}
                    </>
                  )}
                  <Link
                    href={`/organization/directory/cadres/${u.id}`}
                    className="px-3.5 py-1.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold inline-flex items-center gap-1 shadow-sm"
                  >
                    <span>Profil 7-Tab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Tidak ada data kader yang sesuai dengan pencarian.
          </div>
        )}
      </div>

      {/* Modal Tambah / Edit Kader */}
      <EditorialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        badge="Database Kader PSDM"
        title={editingId ? "Edit Data Kader" : "Tambah Kader Baru"}
        subtitle="NIM digunakan sebagai identitas pencocokan; status Terverifikasi otomatis menerbitkan nomor e-KTA."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="cadre-crud-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              {editingId ? "Simpan Perubahan" : "Simpan Kader"}
            </button>
          </>
        }
      >
        <form id="cadre-crud-form" onSubmit={handleSaveCadre} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Aulia Putri Rahmadani"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">
                NIM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="1301220xxx"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Angkatan</label>
              <input
                type="text"
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                placeholder="2024"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Program Studi</label>
              <input
                type="text"
                value={studyProgram}
                onChange={(e) => setStudyProgram(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@student.telkomuniversity.ac.id"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Status Keanggotaan</label>
              <select
                value={cadreStatus}
                onChange={(e) => setCadreStatus(e.target.value as CadreStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              >
                <option value="verified">Kader Terverifikasi</option>
                <option value="pending_verification">Menunggu Verifikasi</option>
                <option value="candidate">Calon Anggota</option>
                <option value="not_verified">Belum Terverifikasi</option>
                <option value="rejected">Ditolak</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tingkatan / Nomor e-KTA</label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Otomatis jika kosong (Terverifikasi)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 font-mono"
              />
            </div>
          </div>
        </form>
      </EditorialModal>

      {/* Modal Konfirmasi Hapus Kader */}
      <EditorialModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        badge="Konfirmasi Hapus Data"
        title={`Hapus ${deleteTarget?.name || "Kader"}?`}
        subtitle="Penghapusan data kader akan dicatat pada Log Audit Sistem."
        maxWidth="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-5 py-2 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm"
            >
              Ya, Hapus Data
            </button>
          </>
        }
      >
        <p className="text-xs text-neutral-dark">
          Pastikan data kader dengan NIM <strong className="font-mono text-wine-950">{deleteTarget?.nim || "-"}</strong> memang duplikat atau tidak valid sebelum menghapusnya.
        </p>
      </EditorialModal>
    </div>
  );
}
