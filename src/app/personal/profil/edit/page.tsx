"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { ArrowLeft, Save, Lock, CheckCircle2, AlertCircle, Camera } from "lucide-react";

export default function EditPersonalProfilePage() {
  const router = useRouter();
  const { store, currentUser } = useMockStore();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || "081234567890");
  const [facultyId, setFacultyId] = useState(currentUser.faculty_id || store.faculties[0]?.id);

  const selectedFacultyObj = store.faculties.find((f) => f.id === facultyId) || store.faculties[0];
  const [studyProgramId, setStudyProgramId] = useState(
    currentUser.study_program_id || selectedFacultyObj?.study_programs?.[0]?.id || ""
  );

  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleFacultyChange = (newFacId: string) => {
    setFacultyId(newFacId);
    const f = store.faculties.find((item) => item.id === newFacId);
    if (f && f.study_programs && f.study_programs.length > 0) {
      setStudyProgramId(f.study_programs[0].id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
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
        "memperbarui data profil pengguna",
        `Akun ${currentUser.demo_id}`,
        "Profil Personal"
      );
    });

    setIsSaving(false);
    setFeedback("Profil berhasil diperbarui!");
    setTimeout(() => {
      router.push("/personal/profil");
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Navigation Breadcrumb */}
      <Link
        href="/personal/profil"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Profil Saya</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: PER-03
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            Formulir Edit
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Ubah Data Diri & Profil
        </h1>
        <p className="text-xs text-neutral-dark">
          Perbarui kontak dan informasi akademik akun Anda. NIM bersifat tetap dan terkunci.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
          {/* Avatar edit simulation */}
          <div className="flex items-center gap-5 pb-6 border-b border-wine-950/10">
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl bg-brand-darkWine text-gold-300 font-serif text-3xl font-bold flex items-center justify-center border-2 border-gold-400/40 shadow-md">
                {name.charAt(0) || "U"}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-burgundy text-white flex items-center justify-center shadow-md hover:bg-brand-darkWine transition-colors"
                title="Ganti Foto Profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-0.5">
              <strong className="text-sm text-wine-950 block">Foto Profil</strong>
              <p className="text-[11px] text-neutral-light">
                Unggah pas foto formal atau foto resmi kader (Maks. 2 MB, PNG/JPG).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nama Lengkap */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* NIM (Read-Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950 flex items-center gap-1.5">
                <span>Nomor Induk Mahasiswa (NIM)</span>
                <Lock className="w-3 h-3 text-neutral-light" />
              </label>
              <input
                type="text"
                readOnly
                disabled
                value={currentUser.nim || "1301213001"}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-300 text-sm text-neutral-500 font-mono cursor-not-allowed"
              />
              <span className="text-[10px] text-neutral-light">
                NIM terverifikasi Telkom University dan tidak dapat diubah mandiri.
              </span>
            </div>

            {/* Nomor Telepon / WA */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Nomor WhatsApp / HP
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Fakultas */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Fakultas
              </label>
              <select
                value={facultyId}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              >
                {store.faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Studi */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Program Studi
              </label>
              <select
                value={studyProgramId}
                onChange={(e) => setStudyProgramId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              >
                {selectedFacultyObj?.study_programs?.map((sp: { id: string; name: string }) => (
                  <option key={sp.id} value={sp.id}>
                    {sp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/personal/profil"
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
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
