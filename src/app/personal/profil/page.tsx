"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  formatRoleLabel,
  formatCadreStatus,
  formatAccountStatus,
} from "@/lib/personal/labels";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  Mail,
  Phone,
  GraduationCap,
  Building,
  Shield,
  Award,
  Edit3,
  Calendar,
  Lock,
  Save,
  CheckCircle2,
  IdCard,
  Info,
} from "lucide-react";

export default function PersonalProfilePage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat profil pribadi..." />}>
      <PersonalProfileContent />
    </Suspense>
  );
}

function PersonalProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Edit form states
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [facultyId, setFacultyId] = useState(currentUser.faculty_id || store.faculties[0]?.id || "");
  const [studyProgramId, setStudyProgramId] = useState(currentUser.study_program_id || "");
  const [isSaving, setIsSaving] = useState(false);

  // Open edit modal automatically when navigated via ?edit=true
  useEffect(() => {
    if (searchParams.get("edit") === "true") {
      openEditModal();
      router.replace("/personal/profil", { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const openEditModal = () => {
    const facId = currentUser.faculty_id || store.faculties[0]?.id || "";
    const facObj = store.faculties.find((f) => f.id === facId) || store.faculties[0];
    setName(currentUser.name);
    setPhone(currentUser.phone || "");
    setFacultyId(facId);
    setStudyProgramId(currentUser.study_program_id || facObj?.study_programs?.[0]?.id || "");
    setEditModalOpen(true);
  };

  const selectedFacultyObj =
    store.faculties.find((f) => f.id === facultyId) || store.faculties[0];

  const handleFacultyChange = (newFacId: string) => {
    setFacultyId(newFacId);
    const f = store.faculties.find((item) => item.id === newFacId);
    if (f?.study_programs && f.study_programs.length > 0) {
      setStudyProgramId(f.study_programs[0].id);
    } else {
      setStudyProgramId("");
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSaving(true);

    mutateStore((draft) => {
      const user = draft.users.find((u) => u.id === currentUser.id);
      if (user) {
        user.name = name.trim();
        user.phone = phone.trim();
        user.faculty_id = facultyId;
        user.study_program_id = studyProgramId;
      }
      addActivityHistory(
        name.trim(),
        "memperbarui data profil pribadi",
        `Akun ${currentUser.demo_id}`,
        "Profil Saya"
      );
    });

    setIsSaving(false);
    setEditModalOpen(false);
    setFeedback("Data profil pribadi berhasil diperbarui.");
  };

  const userFaculty = store.faculties.find((f) => f.id === currentUser.faculty_id);
  const userStudyProgram = userFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === currentUser.study_program_id
  );

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Identitas Pengguna
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Profil Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            Kelola informasi kontak dan data akademik Anda pada ekosistem HIPMI Central.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={openEditModal}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Ubah Profil</span>
          </button>

          <Link
            href="/personal/keamanan"
            className="px-4 py-2.5 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 hover:border-brand-burgundy/35 hover:bg-[#FCF8F6] transition-colors flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>Pengaturan Akun</span>
          </Link>
        </div>
      </div>

      {/* Save Feedback */}
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

      {/* Main Editorial Profile Card */}
      <div className="p-5 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-sm border border-[#E9E1DC] shadow-[0_10px_34px_rgba(61,15,22,0.06)] space-y-6">
        {/* Identity Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#E9E1DC]">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#3D0F16] to-[#5A1722] text-[#F5D6A8] font-serif text-3xl sm:text-4xl font-bold flex items-center justify-center border-2 border-[#E8B577]/45 shadow-lg shrink-0">
            {currentUser.name.charAt(0)}
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                {formatRoleLabel(currentUser.base_role)}
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E8B577]/20 text-[#6F4518]">
                {formatCadreStatus(currentUser.cadre_status)}
              </span>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {formatAccountStatus(currentUser.account_status)}
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-wine-950 leading-tight">
              {currentUser.name}
            </h2>

            <p className="text-xs text-neutral-dark flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="inline-flex items-center gap-1.5 font-mono">
                <IdCard className="w-3.5 h-3.5 text-brand-burgundy" />
                NIM: <strong className="text-wine-950">{currentUser.nim || "-"}</strong>
              </span>
              <span className="text-neutral-light">•</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-neutral-light">
                <Lock className="w-3 h-3" />
                NIM terkunci sistem
              </span>
            </p>
          </div>
        </div>

        {/* Auto-Layout Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Email */}
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
            <span className="text-neutral-dark flex items-center gap-1.5 text-[11px] font-medium">
              <Mail className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Alamat Email</span>
            </span>
            <strong className="text-wine-950 block text-sm break-all">{currentUser.email}</strong>
            <span className="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Terverifikasi
            </span>
          </div>

          {/* Telepon */}
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
            <span className="text-neutral-dark flex items-center gap-1.5 text-[11px] font-medium">
              <Phone className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Nomor WhatsApp / Telepon</span>
            </span>
            <strong className="text-wine-950 block text-sm font-mono">
              {currentUser.phone || "-"}
            </strong>
            <span className="text-[10px] text-neutral-light">Kontak aktif untuk koordinasi</span>
          </div>

          {/* Fakultas */}
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
            <span className="text-neutral-dark flex items-center gap-1.5 text-[11px] font-medium">
              <Building className="w-3.5 h-3.5 text-[#AF7D66]" />
              <span>Fakultas</span>
            </span>
            <strong className="text-wine-950 block text-sm">
              {userFaculty?.name || "Belum dipilih"}
            </strong>
            <span className="text-[10px] text-neutral-light font-mono">
              Kode Fakultas: {userFaculty?.code || "-"}
            </span>
          </div>

          {/* Program Studi */}
          <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5">
            <span className="text-neutral-dark flex items-center gap-1.5 text-[11px] font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-[#AF7D66]" />
              <span>Program Studi</span>
            </span>
            <strong className="text-wine-950 block text-sm">
              {userStudyProgram?.name || "Belum dipilih"}
            </strong>
            <span className="text-[10px] text-neutral-light">Universitas Telkom</span>
          </div>
        </div>

        {/* NIM Policy Notice */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Kebijakan Integritas Data:</strong> NIM tidak dapat diubah secara mandiri untuk menjaga keabsahan riwayat kaderisasi, tiket, dan sertifikat. Jika terdapat kesalahan penulisan NIM, silakan ajukan koreksi melalui Admin Sistem.
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-dark">
            <Calendar className="w-4 h-4 text-brand-burgundy" />
            <span>
              Terdaftar sejak:{" "}
              <strong className="font-mono text-wine-950">
                {new Date(currentUser.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </span>
          </div>

          {permissions.canAccessKeanggotaan ? (
            <Link
              href="/personal/keanggotaan"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Lihat Status Keanggotaan Kader →</span>
            </Link>
          ) : (
            <span className="text-[11px] text-neutral-light">
              Status keanggotaan: Mahasiswa Umum
            </span>
          )}
        </div>
      </div>

      {/* Edit Profile Modal (PER-03) */}
      <EditorialModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        badge="Pembaruan Data Diri"
        title="Ubah Profil Saya"
        subtitle="Perbarui nama tampilan, nomor telepon, dan informasi akademik Anda. NIM bersifat tetap."
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              form="edit-profile-modal-form"
              disabled={isSaving}
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
            </button>
          </>
        }
      >
        <form id="edit-profile-modal-form" onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950 flex items-center gap-1.5">
                <span>Nomor Induk Mahasiswa (NIM)</span>
                <Lock className="w-3 h-3 text-neutral-light" />
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={currentUser.nim || "-"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs sm:text-sm text-neutral-500 font-mono cursor-not-allowed"
              />
              <span className="text-[10px] text-neutral-light block">
                Hubungi Admin Sistem untuk koreksi NIM.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Nomor WhatsApp / HP <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">Fakultas</label>
              <select
                value={facultyId}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
              >
                {store.faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">Program Studi</label>
              <select
                value={studyProgramId}
                onChange={(e) => setStudyProgramId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
              >
                {selectedFacultyObj?.study_programs?.map((sp: { id: string; name: string }) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </EditorialModal>
    </div>
  );
}
