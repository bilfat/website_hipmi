"use client";

import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Shield,
  Award,
  Edit3,
  Calendar,
  KeyRound,
  CheckCircle2
} from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  ketum: "Ketua Umum",
  waketum: "Wakil Ketua Umum",
  sekjen: "Sekretaris Jenderal",
  sekum: "Sekretaris Umum",
  bendum: "Bendahara Umum",
  kabid: "Kepala Bidang",
  kakom: "Kepala Kompartemen",
  staff: "Staf Pelaksana",
  system_admin: "Pengelola Sistem",
  mahasiswa: "Mahasiswa Telkom"
};

const CADRE_LABELS: Record<string, string> = {
  verified: "Kader Terverifikasi",
  candidate: "Calon Kader",
  unverified: "Anggota Umum"
};

const STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  suspended: "Ditangguhkan",
  inactive: "Tidak Aktif"
};

export default function PersonalProfilePage() {
  const { store, currentUser } = useMockStore();

  const userFaculty = store.faculties.find((f) => f.id === currentUser.faculty_id);
  const userStudyProgram = userFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === currentUser.study_program_id
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Profil Pribadi Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            Informasi identitas akun terdaftar pada sistem HIPMI CENTRAL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/personal/profil/edit"
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Ubah Profil</span>
          </Link>

          <Link
            href="/personal/keamanan"
            className="px-5 py-2.5 rounded-full bg-surface-card border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Keamanan</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Identity Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-wine-950/10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-darkWine text-gold-300 font-serif text-3xl sm:text-4xl font-bold flex items-center justify-center border-2 border-gold-400/40 shadow-xl shrink-0">
            {currentUser.name.charAt(0)}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                {ROLE_LABELS[currentUser.base_role] || currentUser.base_role}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-gold-400/20 text-wine-950">
                {CADRE_LABELS[currentUser.cadre_status] || currentUser.cadre_status}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {STATUS_LABELS[currentUser.account_status] || currentUser.account_status}
              </span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-wine-950">
              {currentUser.name}
            </h2>

            <p className="text-xs text-neutral-dark font-mono">
              Nomor Induk Mahasiswa: <strong className="text-wine-950">{currentUser.nim || "-"}</strong> • Akun Demo:{" "}
              <strong className="text-brand-burgundy">{currentUser.demo_id}</strong>
            </p>
          </div>
        </div>

        {/* Detailed Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          {/* Email */}
          <div className="p-4 rounded-2xl bg-surface-warm-white border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Alamat Surel</span>
            </span>
            <strong className="text-wine-950 block text-sm">{currentUser.email}</strong>
            <span className="text-[10px] text-emerald-700 font-medium">
              Terverifikasi via OTP
            </span>
          </div>

          {/* Telepon */}
          <div className="p-4 rounded-2xl bg-surface-warm-white border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>Nomor WhatsApp / Telepon</span>
            </span>
            <strong className="text-wine-950 block text-sm">
              {currentUser.phone || "+62 812-3456-7890"}
            </strong>
            <span className="text-[10px] text-neutral-light">Kontak utama pemberitahuan</span>
          </div>

          {/* Fakultas */}
          <div className="p-4 rounded-2xl bg-surface-warm-white border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gold-600" />
              <span>Fakultas Telkom University</span>
            </span>
            <strong className="text-wine-950 block text-sm">
              {userFaculty?.name || "Fakultas Informatika"}
            </strong>
            <span className="text-[10px] text-neutral-light font-mono">
              Kode: {userFaculty?.code || "FIF"}
            </span>
          </div>

          {/* Program Studi */}
          <div className="p-4 rounded-2xl bg-surface-warm-white border border-wine-950/10 space-y-1">
            <span className="text-neutral-light block flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-gold-600" />
              <span>Program Studi</span>
            </span>
            <strong className="text-wine-950 block text-sm">
              {userStudyProgram?.name || "S1 Informatika"}
            </strong>
            <span className="text-[10px] text-neutral-light">Jenjang Sarjana (S1)</span>
          </div>
        </div>

        {/* Membership Details */}
        <div className="pt-4 border-t border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-dark">
            <Calendar className="w-4 h-4 text-brand-burgundy" />
            <span>
              Terdaftar sejak:{" "}
              <strong className="font-mono text-wine-950">
                {new Date(currentUser.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </strong>
            </span>
          </div>

          <Link
            href="/personal/keanggotaan"
            className="text-xs font-semibold text-brand-burgundy hover:underline flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Lihat Rincian Status Keanggotaan Kader →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
