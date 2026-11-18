"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { User } from "@/types/domain";
import { DEMO_PASSWORD } from "@/lib/mock/seed";
import { UserPlus, ArrowRight, AlertCircle, CheckCircle2, Lock, Mail, Phone, User as UserIcon, GraduationCap } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { store, saveStore } = useMockStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nim, setNim] = useState("");
  const [phone, setPhone] = useState("");
  const [facultyId, setFacultyId] = useState(store.faculties[0]?.id || "");
  const [studyProgramId, setStudyProgramId] = useState(
    store.faculties[0]?.study_programs?.[0]?.id || ""
  );
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useState(DEMO_PASSWORD);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter study programs based on selected faculty
  const currentFaculty = store.faculties.find((f) => f.id === facultyId);
  const availablePrograms: { id: string; name: string }[] = currentFaculty?.study_programs || [];

  const handleFacultyChange = (newFacId: string) => {
    setFacultyId(newFacId);
    const fac = store.faculties.find((f) => f.id === newFacId);
    if (fac && fac.study_programs && fac.study_programs.length > 0) {
      setStudyProgramId(fac.study_programs[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !nim.trim() || !phone.trim()) {
      setErrorMsg("Semua kolom bertanda wajib harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok dengan kata sandi baru.");
      return;
    }

    if (!agreed) {
      setErrorMsg("Anda harus menyetujui pernyataan keabsahan data.");
      return;
    }

    // Check if email or NIM already registered
    const exists = store.users.some(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() ||
        (u.nim && u.nim.toLowerCase() === nim.trim().toLowerCase())
    );

    if (exists) {
      setErrorMsg("Email atau NIM ini sudah terdaftar dalam sistem.");
      return;
    }

    // Create new registered user
    const newUserId = `usr-reg-${Date.now()}`;
    const newDemoId = `REG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: User = {
      id: newUserId,
      demo_id: newDemoId,
      name: name.trim(),
      email: email.trim(),
      nim: nim.trim(),
      phone: phone.trim(),
      faculty_id: facultyId,
      study_program_id: studyProgramId,
      account_status: "verification_pending",
      cadre_status: "not_verified",
      base_role: "mahasiswa",
      additional_permissions: [],
      created_at: new Date().toISOString()
    };

    store.users.push(newUser);
    addActivityHistory(
      newUser.name,
      "mendaftarkan akun mahasiswa baru",
      newUser.email,
      "Autentikasi"
    );
    saveStore(store);

    router.push(`/verifikasi-email?email=${encodeURIComponent(newUser.email)}`);
  };

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200/60 text-gold-900 text-xs font-semibold">
          <UserPlus className="w-3.5 h-3.5 text-gold-700" />
          <span>Registrasi Mahasiswa</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          Buat Akun HIPMI CENTRAL
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark">
          Daftarkan diri Anda untuk mengakses pemesanan tiket, program wirausaha, dan pendaftaran kader.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Nama Lengkap Sesuai KTM <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <UserIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Rian Pratama"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Email Telkom University <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@student.telkomuniversity.ac.id"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Nomor Induk Mahasiswa (NIM) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Contoh: 1201220001"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Nomor WhatsApp Aktif <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Fakultas <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={facultyId}
                onChange={(e) => handleFacultyChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
              >
                {store.faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.code} — {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Program Studi <span className="text-red-500">*</span>
          </label>
          <select
            value={studyProgramId}
            onChange={(e) => setStudyProgramId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
          >
            {availablePrograms.map((p: { id: string; name: string }) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Kata Sandi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-black mb-1.5">
              Konfirmasi Kata Sandi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
              />
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded border-neutral-light/40 text-brand-burgundy focus:ring-brand-burgundy"
            />
            <span className="text-xs text-neutral-dark leading-relaxed">
              Saya menyatakan bahwa data yang saya masukkan adalah benar mahasiswa aktif Telkom University dan bersedia mematuhi kode etik organisasi HIPMI PT Universitas Telkom.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group mt-4"
        >
          <span>Daftar Akun Mahasiswa</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-wine-950/10 text-center">
        <p className="text-xs text-neutral-dark">
          Sudah memiliki akun terdaftar?{" "}
          <Link
            href="/masuk"
            className="font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-2 ml-1"
          >
            Masuk di Sini
          </Link>
        </p>
      </div>
    </div>
  );
}
