"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  formatRoleLabel,
  formatCadreStatus,
  isStructuralRole,
  getCadreLevel,
  BUSINESS_REVIEW_LABELS,
  PROJECT_STATUS_LABELS,
} from "@/lib/personal/labels";
import { CadreBusiness } from "@/types/domain";
import { KtaModal } from "@/components/personal/kta-modal";
import { BusinessFormModal } from "@/components/personal/business-form-modal";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  Award,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Printer,
  Plus,
  Edit3,
  ExternalLink,
  Sparkles,
  Phone,
  MapPin,
  Store,
  History,
  FileText,
  QrCode,
  Info,
} from "lucide-react";

type KeanggotaanTab = "kta" | "jabatan" | "bisnis";

export default function KeanggotaanPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat data keanggotaan kader..." />}>
      <KeanggotaanContent />
    </Suspense>
  );
}

function KeanggotaanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const isCadre = permissions.canAccessKeanggotaan;

  const initialTab = (searchParams.get("tab") as KeanggotaanTab) || "kta";
  const [activeTab, setActiveTab] = useState<KeanggotaanTab>(
    ["kta", "jabatan", "bisnis"].includes(initialTab) ? initialTab : "kta"
  );

  const [ktaModalOpen, setKtaModalOpen] = useState(false);
  const [bizModalOpen, setBizModalOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<CadreBusiness | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const paramTab = searchParams.get("tab") as KeanggotaanTab | null;
    if (paramTab && ["kta", "jabatan", "bisnis"].includes(paramTab)) {
      setActiveTab(paramTab);
    }
    if (searchParams.get("new") === "true" && isCadre) {
      setActiveTab("bisnis");
      setEditingBusiness(null);
      setBizModalOpen(true);
      router.replace("/personal/keanggotaan?tab=bisnis", { scroll: false });
    }
  }, [searchParams, isCadre, router]);

  const handleTabChange = (tab: KeanggotaanTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/personal/keanggotaan?tab=${tab}`);
    }
  };

  const userFaculty = store.faculties.find((f) => f.id === currentUser.faculty_id);
  const userStudyProgram = userFaculty?.study_programs?.find(
    (sp: { id: string; name: string }) => sp.id === currentUser.study_program_id
  );
  const userRosters = store.roster.filter((r) => r.user_id === currentUser.id);
  const myBusinesses = store.businesses.filter((b) => b.owner_user_id === currentUser.id);
  const activeCabinet = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const cadreLevel = getCadreLevel(currentUser.base_role, currentUser.cadre_status);
  const hasStructuralRole = isStructuralRole(currentUser.base_role);
  const ktaNumber = `HIPMI-TU-${currentUser.nim || "2026"}-042`;

  const handleRequestReview = (businessId: string) => {
    mutateStore((draft) => {
      const b = draft.businesses.find((item) => item.id === businessId);
      if (b) {
        b.review_status = "review";
        addActivityHistory(
          currentUser.name,
          "mengajukan kurasi bisnis kader",
          b.name,
          "Keanggotaan & Bisnis"
        );
      }
    });
    setFeedback("Usaha berhasil diajukan untuk proses kurasi oleh Kompartemen Bisnis.");
  };

  if (!isCadre) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-[#E8B577]/45 shadow-[0_12px_36px_rgba(61,15,22,0.06)] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E8B577]/20 text-[#8A5A2B] flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            Menu Keanggotaan Khusus Kader HIPMI
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed max-w-md mx-auto">
            Status akun Anda saat ini adalah <strong>{formatCadreStatus(currentUser.cadre_status)}</strong>. Fitur e-KTA Digital, Riwayat Jabatan, dan Katalog Bisnis Saya otomatis terbuka setelah Anda terverifikasi sebagai Kader Resmi HIPMI PT Universitas Telkom.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/aktivitas/agenda"
              className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Lihat Jadwal Diklat &amp; Agenda
            </Link>
            <Link
              href="/personal/dashboard"
              className="px-5 py-2.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 text-xs font-semibold hover:bg-[#FCF8F6] transition-colors"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: KeanggotaanTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: "kta", label: "Informasi & e-KTA", icon: Award },
    { id: "jabatan", label: "Riwayat Jabatan", icon: History, count: userRosters.length + (hasStructuralRole ? 1 : 0) },
    { id: "bisnis", label: "Bisnis Saya", icon: Store, count: myBusinesses.length },
  ];

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Khusus Kader Terverifikasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Keanggotaan Kader
          </h1>
          <p className="text-xs text-neutral-dark">
            Pusat informasi status kader, e-KTA digital, riwayat jabatan lintas kabinet, serta katalog usaha Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {activeTab === "kta" && (
            <button
              type="button"
              onClick={() => setKtaModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Perbesar &amp; Cetak e-KTA</span>
            </button>
          )}
          {activeTab === "bisnis" && (
            <button
              type="button"
              onClick={() => {
                setEditingBusiness(null);
                setBizModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Daftarkan Usaha Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Sliding Segmented Tab Switcher */}
      <div className="p-1.5 rounded-2xl bg-white/90 border border-[#E9E1DC] shadow-sm inline-flex flex-wrap gap-1 w-full sm:w-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${
                isActive ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="keanggotaan-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#FCF8F6] text-neutral-dark"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INFORMASI & e-KTA KADER (PER-05) */}
      {activeTab === "kta" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Digital e-KTA Card */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#2B090F] via-[#5A1722] to-[#3D0F16] text-white shadow-xl border border-[#E8B577]/45 relative overflow-hidden">
              <div
                className="absolute -right-10 -bottom-12 w-56 h-56 rounded-full bg-[#E8B577]/12 blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 space-y-5">
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#E8B577]/25">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.16em] uppercase font-bold text-[#E8B577] block">
                      e-KTA RESMI KADER
                    </span>
                    <strong className="font-serif text-base font-bold block mt-0.5">
                      HIPMI PT UNIVERSITAS TELKOM
                    </strong>
                    <span className="text-[11px] text-white/75">
                      {activeCabinet?.name || "Kabinet Arthakarsa"} ({activeCabinet?.period || "2026/2027"})
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#E8B577]/20 border border-[#E8B577]/40 text-[#F5D6A8] text-[10px] font-mono font-bold">
                    Kader Tk. {cadreLevel.level}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border-2 border-[#E8B577]/45 flex items-center justify-center font-serif text-2xl font-bold text-[#F5D6A8] shrink-0">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h2 className="font-serif text-xl font-bold truncate">{currentUser.name}</h2>
                    <p className="text-xs font-mono text-[#E8B577]">NIM: {currentUser.nim || "-"}</p>
                    <p className="text-[11px] text-white/80 truncate">
                      {userFaculty?.name || "Telkom University"}
                      {userStudyProgram ? ` • ${userStudyProgram.name}` : ""}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8B577]/25 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-[#E8B577]/85 block">
                      Nomor Induk Anggota
                    </span>
                    <strong className="font-mono text-xs tracking-wider">{ktaNumber}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setKtaModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Buka QR &amp; Cetak</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tingkatan Kader Stepper (Kader 1, 2, 3 per front_end.md) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-base font-bold text-wine-950">
                  Jenjang &amp; Tingkatan Kader
                </h2>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                  Tingkat {cadreLevel.level} / 3
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { lv: 1, label: "Kader 1", sub: "DPO / Muda" },
                  { lv: 2, label: "Kader 2", sub: "LKK / Pengurus" },
                  { lv: 3, label: "Kader 3", sub: "Strategis / BPH" },
                ].map((step) => {
                  const achieved = cadreLevel.level >= step.lv;
                  return (
                    <div
                      key={step.lv}
                      className={`p-3 rounded-2xl border text-center space-y-1 ${
                        achieved
                          ? "bg-[#FCF8F6] border-brand-burgundy/35"
                          : "bg-neutral-50/80 border-[#E9E1DC] opacity-65"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[11px] font-mono font-bold ${
                          achieved
                            ? "bg-brand-burgundy text-white"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {step.lv}
                      </div>
                      <strong className="text-xs text-wine-950 block">{step.label}</strong>
                      <span className="text-[10px] text-neutral-dark block">{step.sub}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-neutral-dark leading-relaxed bg-[#FCF8F6] p-3.5 rounded-2xl border border-[#E9E1DC]">
                <strong className="text-wine-950">{cadreLevel.title}:</strong> {cadreLevel.description}
              </p>
            </div>
          </div>

          {/* Right: Cadre Stages Timeline */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E9E1DC]">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Riwayat Tahapan Kaderisasi
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Pelantikan Anggota & Penerbitan e-KTA Resmi",
                  desc: "Lulus rangkaian pembinaan kader dan resmi dilantik pada periode Kabinet Arthakarsa.",
                  meta: "14 September 2026 • Status: Sah",
                },
                {
                  title: "Latihan Kepemimpinan Kader (LKK) HIPMI",
                  desc: "Menyelesaikan pelatihan kepemimpinan wirausaha, simulasi model bisnis, dan etika organisasi.",
                  meta: "Predikat: Sangat Memuaskan",
                },
                {
                  title: "Diklat Pengenalan Organisasi (DPO)",
                  desc: "Orientasi visi-misi HIPMI Perguruan Tinggi serta pengenalan jejaring BPC/BPD HIPMI Jawa Barat.",
                  meta: "22 Agustus 2026 • Lulus",
                },
              ].map((stage) => (
                <div
                  key={stage.title}
                  className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm text-wine-950 font-serif block leading-snug">
                      {stage.title}
                    </strong>
                    <p className="text-xs text-neutral-dark leading-relaxed">{stage.desc}</p>
                    <span className="text-[11px] font-mono text-neutral-light block">
                      {stage.meta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RIWAYAT JABATAN ORGANISASI (PER-06) */}
      {activeTab === "jabatan" && (
        <div className="space-y-6">
          {/* Structural Position Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-burgundy" />
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Status Jabatan Struktural
                </h2>
              </div>
              <span className="text-[11px] font-mono text-neutral-dark">
                {activeCabinet?.name || "Kabinet Arthakarsa"}
              </span>
            </div>

            {hasStructuralRole ? (
              <div className="p-5 rounded-2xl bg-[#FCF8F6] border border-[#E8B577]/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Masa Bakti Aktif • {activeCabinet?.period || "2026/2027"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-wine-950">
                      {formatRoleLabel(currentUser.base_role)}
                    </h3>
                    <p className="text-xs text-neutral-dark">
                      HIPMI Perguruan Tinggi Universitas Telkom — {activeCabinet?.name || "Kabinet Arthakarsa"}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase text-neutral-light block">
                      Nomor Surat Keputusan
                    </span>
                    <strong className="text-xs font-mono text-wine-950">
                      SK-BPC/004/ARTHA/2026
                    </strong>
                  </div>
                </div>
                <p className="text-xs text-neutral-dark leading-relaxed pt-3 border-t border-[#E9E1DC]">
                  Mengemban amanah kepengurusan sesuai struktur kabinet aktif. Rekam jejak jabatan akan tetap tersimpan pada riwayat keanggotaan meskipun masa bakti kabinet berakhir.
                </p>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
                <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#E8B577]/20 text-[#6F4518]">
                  Kader Aktif (Non-Struktural)
                </span>
                <p className="text-xs text-neutral-dark leading-relaxed">
                  Saat ini Anda tercatat sebagai <strong>Kader Resmi HIPMI</strong> tanpa jabatan struktural kabinet. Anda tetap dapat berpartisipasi pada program kerja sebagai anggota kepanitiaan maupun mengajukan etalase usaha pada tab Bisnis Saya.
                </p>
              </div>
            )}
          </div>

          {/* Project Roster History */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#AF7D66]" />
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Riwayat Amanah Kepanitiaan Proker
                </h2>
              </div>
              <span className="text-xs font-mono text-neutral-dark">
                {userRosters.length} Penugasan
              </span>
            </div>

            {userRosters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userRosters.map((r) => {
                  const project = store.projects.find((p) => p.id === r.project_id);
                  const cabinet = store.cabinets.find((c) => c.id === project?.cabinet_id);
                  const statusInfo =
                    PROJECT_STATUS_LABELS[project?.operational_status || "ongoing"] ||
                    PROJECT_STATUS_LABELS.ongoing;

                  return (
                    <div
                      key={r.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                            {r.role_title}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusInfo.tone}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                        <strong className="font-serif text-base text-wine-950 block">
                          {project?.name || "Program Kerja HIPMI"}
                        </strong>
                        <p className="text-[11px] text-neutral-dark">
                          {cabinet?.name || "Kabinet Arthakarsa"} • Bergabung{" "}
                          {new Date(r.joined_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <Link
                        href="/personal/aktivitas?tab=proker"
                        className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                      >
                        <span>Lihat di Aktivitas Proker →</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FCF8F6] text-center text-xs text-neutral-dark">
                Belum ada riwayat penugasan kepanitiaan program kerja untuk akun ini.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: BISNIS SAYA (PER-10 & PER-11 VIA MODAL) */}
      {activeTab === "bisnis" && (
        <div className="space-y-5">
          {/* Curation Policy Info */}
          <div className="p-4 rounded-2xl bg-white/90 border border-[#E9E1DC] flex items-start gap-3 text-xs text-neutral-dark">
            <Info className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Setiap usaha yang didaftarkan kader akan melewati tahap <strong>kurasi Kompartemen Bisnis</strong> terlebih dahulu sebelum tayang pada Direktori Bisnis Publik HIPMI PT Universitas Telkom.
            </p>
          </div>

          {myBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {myBusinesses.map((biz) => {
                const reviewInfo =
                  BUSINESS_REVIEW_LABELS[biz.review_status] || BUSINESS_REVIEW_LABELS.draft;
                const isPublished = biz.publication_status === "published";
                const canRequestReview =
                  biz.review_status === "draft" ||
                  biz.review_status === "revision" ||
                  biz.review_status === "revision_needed";

                return (
                  <div
                    key={biz.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/35 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                          {biz.category}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${reviewInfo.tone}`}
                        >
                          {reviewInfo.label}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                            isPublished
                              ? "bg-emerald-600 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {isPublished ? "Tayang Publik" : "Belum Tayang"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-wine-950 leading-snug">
                        {biz.name}
                      </h3>

                      <p className="text-xs text-neutral-dark leading-relaxed line-clamp-3">
                        {biz.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-neutral-dark pt-1">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#AF7D66]" />
                          Bandung, Jawa Barat
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono">
                          <Phone className="w-3.5 h-3.5 text-brand-burgundy" />
                          {biz.contact_public || currentUser.phone || "-"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E9E1DC] flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBusiness(biz);
                          setBizModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white hover:bg-[#FCF8F6] text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Usaha</span>
                      </button>

                      {isPublished ? (
                        <Link
                          href={`/karya-kader/bisnis/${biz.id}`}
                          className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E8B577]/50 text-brand-burgundy hover:bg-[#E8B577]/15 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Lihat Publik</span>
                        </Link>
                      ) : canRequestReview ? (
                        <button
                          type="button"
                          onClick={() => handleRequestReview(biz.id)}
                          className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Ajukan Kurasi</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-amber-800 font-medium px-2">
                          Menunggu persetujuan pengurus
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center mx-auto">
                <Store className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-bold text-wine-950">
                  Belum Ada Usaha Terdaftar
                </h2>
                <p className="text-xs text-neutral-dark max-w-md mx-auto leading-relaxed">
                  Daftarkan produk, jasa, atau startup Anda agar tampil di Direktori Bisnis Resmi HIPMI PT Universitas Telkom dan memperluas jejaring pasar kampus.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingBusiness(null);
                  setBizModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Daftarkan Usaha Pertama</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <KtaModal
        isOpen={ktaModalOpen}
        onClose={() => setKtaModalOpen(false)}
        currentUser={currentUser}
        faculty={userFaculty}
        studyProgramName={userStudyProgram?.name}
      />

      <BusinessFormModal
        isOpen={bizModalOpen}
        onClose={() => {
          setBizModalOpen(false);
          setEditingBusiness(null);
        }}
        currentUser={currentUser}
        editingBusiness={editingBusiness}
        onSuccess={(msg) => setFeedback(msg)}
      />
    </div>
  );
}
