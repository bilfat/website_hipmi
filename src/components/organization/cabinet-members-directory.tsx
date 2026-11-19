"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Mail,
  Filter,
  X,
  ExternalLink,
  Building,
  UserCheck
} from "lucide-react";
import { useMockStore } from "@/lib/mock/store";

interface CabinetRosterItem {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentKey: "all" | "presidium" | "b-01" | "b-02" | "b-03" | "b-04";
  faculty: string;
  program: string;
  nim: string;
  email: string;
  avatarUrl?: string;
  isVerified: boolean;
  tier: "Presidium" | "BPH" | "Kabid" | "Kakom" | "Staff";
  bio: string;
}

const ROSTER_MEMBERS: CabinetRosterItem[] = [
  // Presidium
  {
    id: "m-01",
    name: "Muhammad Fathur",
    role: "Ketua Umum",
    department: "Presidium Utama",
    departmentKey: "presidium",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Manajemen Bisnis",
    nim: "DEMO-2026-010",
    email: "demo.ketum@example.test",
    avatarUrl: "/assets/demo/avatars/usr-10.jpg",
    isVerified: true,
    tier: "Presidium",
    bio: "Pimpinan mandataris tertinggi organisasi dan penanggung jawab visi ARTHAKARSA.",
  },
  {
    id: "m-02",
    name: "Sarah Andini",
    role: "Wakil Ketua Umum",
    department: "Presidium Operasional",
    departmentKey: "presidium",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Teknik Industri",
    nim: "DEMO-2026-011",
    email: "demo.waketum@example.test",
    avatarUrl: "/assets/demo/avatars/usr-11.jpg",
    isVerified: true,
    tier: "Presidium",
    bio: "Pengarah operasional 4 pilar bidang dan pembina 8 kompartemen kerja.",
  },

  // BPH Kesekjenan & Kebendaharaan
  {
    id: "m-03",
    name: "Rizky Pratama",
    role: "Sekretaris Jenderal",
    department: "Kesekretariatan Jenderal",
    departmentKey: "presidium",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Administrasi Bisnis",
    nim: "DEMO-2026-012",
    email: "demo.sekjen@example.test",
    avatarUrl: "/assets/demo/avatars/usr-12.jpg",
    isVerified: true,
    tier: "BPH",
    bio: "Pengendali tata kelola birokrasi, persuratan resmi, dan regulasi internal kabinet.",
  },
  {
    id: "m-04",
    name: "Nabila Azzahra",
    role: "Sekretaris Umum",
    department: "Administrasi & Legal",
    departmentKey: "presidium",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Ilmu Komunikasi",
    nim: "DEMO-2026-013",
    email: "demo.sekum@example.test",
    avatarUrl: "/assets/demo/avatars/usr-13.jpg",
    isVerified: true,
    tier: "BPH",
    bio: "Manajemen arsip dokumen pleno, notulensi eksekutif, dan sinkronisasi Ditmawa.",
  },
  {
    id: "m-05",
    name: "Dimas Aditya",
    role: "Bendahara Umum",
    department: "Kebendaharaan Umum",
    departmentKey: "presidium",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Akuntansi",
    nim: "DEMO-2026-014",
    email: "demo.bendum@example.test",
    avatarUrl: "/assets/demo/avatars/usr-14.jpg",
    isVerified: true,
    tier: "BPH",
    bio: "Otoritas pengelolaan arus kas, kepatuhan LPJ anggaran, dan transparansi keuangan.",
  },

  // Bidang 1: OKK
  {
    id: "m-06",
    name: "Arif Nugraha",
    role: "Kepala Bidang 1",
    department: "Bidang 1: Organisasi & Kaderisasi",
    departmentKey: "b-01",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Manajemen Bisnis",
    nim: "DEMO-2026-009",
    email: "demo.kabid@example.test",
    avatarUrl: "/assets/demo/avatars/usr-09.jpg",
    isVerified: true,
    tier: "Kabid",
    bio: "Penanggung jawab rekrutmen kader, standarisasi pembinaan, dan tata kelola internal.",
  },
  {
    id: "m-07",
    name: "Gita Permata",
    role: "Kepala Kompartemen Kaderisasi",
    department: "Kompartemen K-01",
    departmentKey: "b-01",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Sistem Informasi",
    nim: "DEMO-2026-008",
    email: "demo.kakom@example.test",
    avatarUrl: "/assets/demo/avatars/usr-08.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Pelaksana masa bimbingan wirausaha muda dan verifikasi jenjang kader.",
  },
  {
    id: "m-08",
    name: "Hendra Wijaya",
    role: "Kepala Kompartemen Riset & SOP",
    department: "Kompartemen K-02",
    departmentKey: "b-01",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Manajemen Bisnis",
    nim: "DEMO-2026-021",
    email: "demo.psdm@example.test",
    avatarUrl: "/assets/demo/avatars/usr-21.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Standardisasi pedoman operasional dan riset tren bisnis mahasiswa kampus.",
  },
  {
    id: "m-09",
    name: "Fajar Ramadhan",
    role: "Staf Pengelola Kaderisasi",
    department: "Bidang 1: Organisasi & Kaderisasi",
    departmentKey: "b-01",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Teknik Industri",
    nim: "DEMO-2026-004",
    email: "demo.pengelola@example.test",
    avatarUrl: "/assets/demo/avatars/usr-04.jpg",
    isVerified: true,
    tier: "Staff",
    bio: "Fasilitator pendataan kader dan koordinasi kegiatan masa keakraban.",
  },

  // Bidang 2: Ekraf & Usaha
  {
    id: "m-10",
    name: "Rizky Fauzi",
    role: "Kepala Bidang 2",
    department: "Bidang 2: Ekonomi Kreatif & Usaha",
    departmentKey: "b-02",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Teknik Industri",
    nim: "DEMO-2026-015",
    email: "demo.kabid2@example.test",
    avatarUrl: "/assets/demo/avatars/usr-04.jpg",
    isVerified: true,
    tier: "Kabid",
    bio: "Pengembang program inkubasi bisnis rintisan, expo komersial, dan dana mandiri.",
  },
  {
    id: "m-11",
    name: "Maya Novita",
    role: "Kepala Kompartemen Inkubasi",
    department: "Kompartemen K-03",
    departmentKey: "b-02",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Manajemen Bisnis",
    nim: "DEMO-2026-016",
    email: "demo.kakom3@example.test",
    avatarUrl: "/assets/demo/avatars/usr-02.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Mentorship praktikal usaha kader pemula dan kurasi portofolio produk.",
  },
  {
    id: "m-12",
    name: "Doni Kurniawan",
    role: "Kepala Kompartemen Akselerasi",
    department: "Kompartemen K-04",
    departmentKey: "b-02",
    faculty: "Fakultas Teknik Elektro",
    program: "S1 Teknik Elektro",
    nim: "DEMO-2026-026",
    email: "demo.kakom4@example.test",
    avatarUrl: "/assets/demo/avatars/usr-03.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Perluasan akses pasar, pameran produk nasional, dan temu investor.",
  },
  {
    id: "m-13",
    name: "Citra Maharani",
    role: "Staf Usaha & Finansial",
    department: "Bidang 2: Ekonomi Kreatif & Usaha",
    departmentKey: "b-02",
    faculty: "Fakultas Ekonomi dan Bisnis",
    program: "S1 Akuntansi",
    nim: "DEMO-2026-007",
    email: "demo.staff.finance@example.test",
    avatarUrl: "/assets/demo/avatars/usr-07.jpg",
    isVerified: true,
    tier: "Staff",
    bio: "Pengelolaan pencatatan transaksi dagang etalase karya kader.",
  },

  // Bidang 3: Hubungan Eksternal
  {
    id: "m-14",
    name: "Dian Anggraini",
    role: "Kepala Bidang 3",
    department: "Bidang 3: Hubungan Eksternal & Kerjasama",
    departmentKey: "b-03",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Administrasi Bisnis",
    nim: "DEMO-2026-022",
    email: "demo.kabid3@example.test",
    avatarUrl: "/assets/demo/avatars/usr-22.jpg",
    isVerified: true,
    tier: "Kabid",
    bio: "Penggagas nota kesepahaman (MoU) kemitraan dengan korporasi dan jaringan alumni.",
  },
  {
    id: "m-15",
    name: "Anisa Rahma",
    role: "Kepala Kompartemen Kelembagaan",
    department: "Kompartemen K-05",
    departmentKey: "b-03",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Ilmu Komunikasi",
    nim: "DEMO-2026-018",
    email: "demo.kakom5@example.test",
    avatarUrl: "/assets/demo/avatars/usr-05.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Hubungan sinergis dengan ormawa kampus, Ditmawa, dan BPC HIPMI Bandung.",
  },
  {
    id: "m-16",
    name: "Budi Santoso",
    role: "Kepala Kompartemen Kemitraan",
    department: "Kompartemen K-06",
    departmentKey: "b-03",
    faculty: "Fakultas Rekayasa Industri",
    program: "S1 Teknik Industri",
    nim: "DEMO-2026-019",
    email: "demo.kakom6@example.test",
    avatarUrl: "/assets/demo/avatars/usr-06.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Penggalangan sponsor strategis dan kolaborasi ventura industri.",
  },
  {
    id: "m-17",
    name: "Bima Saputra",
    role: "Staf Hubungan Kerjasama",
    department: "Bidang 3: Hubungan Eksternal & Kerjasama",
    departmentKey: "b-03",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Ilmu Komunikasi",
    nim: "DEMO-2026-006",
    email: "demo.staff.surat@example.test",
    avatarUrl: "/assets/demo/avatars/usr-06.jpg",
    isVerified: true,
    tier: "Staff",
    bio: "Manajemen korespondensi proposal eksternal dan audiensi pimpinan.",
  },

  // Bidang 4: Medkominfo
  {
    id: "m-18",
    name: "Kevin Sanjaya",
    role: "Kepala Bidang 4",
    department: "Bidang 4: Media, Komunikasi & Informasi",
    departmentKey: "b-04",
    faculty: "Fakultas Industri Kreatif",
    program: "S1 Desain Komunikasi Visual",
    nim: "DEMO-2026-017",
    email: "demo.kabid4@example.test",
    avatarUrl: "/assets/demo/avatars/usr-17.jpg",
    isVerified: true,
    tier: "Kabid",
    bio: "Pengarah identitas visual kabinet, narasi publikasi, dan ekosistem digital.",
  },
  {
    id: "m-19",
    name: "Sarah Amanda",
    role: "Kepala Kompartemen Media",
    department: "Kompartemen K-07",
    departmentKey: "b-04",
    faculty: "Fakultas Komunikasi dan Bisnis",
    program: "S1 Ilmu Komunikasi",
    nim: "DEMO-2026-027",
    email: "demo.kakom7@example.test",
    avatarUrl: "/assets/demo/avatars/usr-02.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Pengelola konten media sosial resmi, rilis berita, dan liputan proker.",
  },
  {
    id: "m-20",
    name: "Farhan Hakim",
    role: "Kepala Kompartemen TI",
    department: "Kompartemen K-08",
    departmentKey: "b-04",
    faculty: "Fakultas Informatika",
    program: "S1 Informatika",
    nim: "DEMO-2026-020",
    email: "demo.kakom8@example.test",
    avatarUrl: "/assets/demo/avatars/usr-20.jpg",
    isVerified: true,
    tier: "Kakom",
    bio: "Pemeliharaan arsitektur sistem informasi HIPMI CENTRAL dan database kader.",
  },
  {
    id: "m-21",
    name: "Gita Larasati",
    role: "Staf Desain & Konten Kreatif",
    department: "Bidang 4: Media, Komunikasi & Informasi",
    departmentKey: "b-04",
    faculty: "Fakultas Industri Kreatif",
    program: "S1 Desain Komunikasi Visual",
    nim: "DEMO-2026-029",
    email: "demo.staff.creative@example.test",
    avatarUrl: "/assets/demo/avatars/usr-05.jpg",
    isVerified: true,
    tier: "Staff",
    bio: "Desainer aset grafis, layout editorial, dan animasi promosi organisasi.",
  },
];

const DEPARTMENT_TABS = [
  { key: "all", label: "Semua Fungsionaris" },
  { key: "presidium", label: "Presidium & BPH" },
  { key: "b-01", label: "Bidang 1: OKK" },
  { key: "b-02", label: "Bidang 2: Ekraf" },
  { key: "b-03", label: "Bidang 3: Eksternal" },
  { key: "b-04", label: "Bidang 4: Medkominfo" },
];

export const CabinetMembersDirectory: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<CabinetRosterItem | null>(null);

  const filteredMembers = useMemo(() => {
    return ROSTER_MEMBERS.filter((m) => {
      const matchDept = selectedDept === "all" || m.departmentKey === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.department.toLowerCase().includes(query) ||
        m.faculty.toLowerCase().includes(query) ||
        m.nim.toLowerCase().includes(query);

      return matchDept && matchSearch;
    });
  }, [selectedDept, searchQuery]);

  return (
    <section className="relative w-full py-12 sm:py-16 select-none">
      {/* Background container styling */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-ivory border border-gold-300 text-brand-burgundy text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Users className="w-3.5 h-3.5 text-gold-600" />
          <span>Direktori Lengkap Kepengurusan</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
          Jajaran Pengurus &amp; Anggota Kabinet
        </h2>
        <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-xl mx-auto leading-relaxed">
          Kader-kader terpilih yang mendedikasikan komitmen, gagasan, dan energinya dalam mengemban amanah Kabinet ARTHAKARSA.
        </p>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="space-y-4 max-w-6xl mx-auto mb-8">
        {/* Search Input & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gold-400/40 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, jabatan, atau fakultas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-surface-ivory border border-gold-300/60 focus:outline-none focus:border-brand-burgundy text-wine-950 placeholder:text-neutral-light"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-dark hover:text-brand-burgundy"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-neutral-dark font-medium self-end sm:self-center">
            Menampilkan <span className="font-bold text-brand-burgundy">{filteredMembers.length}</span> dari {ROSTER_MEMBERS.length} Fungsionaris
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {DEPARTMENT_TABS.map((tab) => {
            const isActive = selectedDept === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedDept(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand-burgundy text-white shadow-md"
                    : "bg-white text-wine-950 hover:bg-gold-50 border border-gold-300/70"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="p-5 rounded-3xl bg-white border border-gold-400/40 hover:border-gold-400 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            <div className="space-y-4">
              {/* Header: Department Tag & Tier */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy border border-gold-300">
                  {member.tier}
                </span>
                {member.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Terverifikasi</span>
                  </span>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-surface-warm-white via-surface-ivory to-surface-blush border border-gold-400/50 flex items-center justify-center shrink-0 shadow-sm overflow-hidden text-brand-burgundy font-serif font-bold text-base">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-sm text-wine-950 group-hover:text-brand-burgundy transition-colors truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-brand-burgundy truncate">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Details: Faculty & Unit */}
              <div className="space-y-1.5 pt-2 border-t border-wine-950/10 text-[11px] font-ui text-neutral-dark">
                <p className="truncate font-medium text-wine-950">
                  {member.department}
                </p>
                <div className="flex items-center gap-1.5 text-neutral-muted truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                  <span className="truncate">{member.program}</span>
                </div>
              </div>
            </div>

            {/* Bottom: Contact Pill */}
            <div className="pt-3 mt-3 border-t border-wine-950/10 flex items-center justify-between text-[11px]">
              <span className="font-mono text-neutral-light truncate text-[10px]">
                {member.nim}
              </span>
              <span className="text-brand-burgundy font-semibold group-hover:underline inline-flex items-center gap-1">
                <span>Rincian</span>
                <span className="text-xs">→</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-16 max-w-md mx-auto space-y-3 bg-white p-8 rounded-3xl border border-gold-300">
          <p className="font-serif text-lg font-bold text-wine-950">
            Tidak ada fungsionaris ditemukan
          </p>
          <p className="text-xs text-neutral-dark">
            Tidak ada hasil yang sesuai dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("all");
            }}
            className="px-4 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold shadow"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Member Detail Dialog */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-md w-full border-2 border-gold-400 shadow-2xl overflow-hidden relative"
            >
              <div className="p-6 bg-gradient-to-r from-brand-darkWine to-brand-burgundy text-white flex items-start justify-between">
                <div className="space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-gold-500/20 text-gold-200 border border-gold-400/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {selectedMember.tier} • KABINET ARTHAKARSA
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-gold-200/90 font-ui font-medium">
                    {selectedMember.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-300/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-dark font-medium">Unit Kerja:</span>
                    <span className="font-bold text-wine-950">{selectedMember.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-dark font-medium">Program Studi:</span>
                    <span className="font-bold text-wine-950">{selectedMember.program}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-dark font-medium">Fakultas:</span>
                    <span className="font-bold text-wine-950">{selectedMember.faculty}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-dark font-medium">Nomor Induk Mahasiswa:</span>
                    <span className="font-mono font-bold text-brand-burgundy">{selectedMember.nim}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-burgundy font-bold">
                    Fokus Tugas &amp; Portofolio
                  </span>
                  <p className="text-xs text-wine-950 bg-white p-3 rounded-xl border border-gold-300/40 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-wine-950/10 flex items-center justify-between">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-burgundy font-semibold hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMember.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-1.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold shadow"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
