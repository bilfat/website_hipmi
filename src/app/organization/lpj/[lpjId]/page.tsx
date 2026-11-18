"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  BookOpen,
  ChevronLeft,
  Save,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  Camera,
  Award,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export default function LPJDetailEditorPage({
  params,
}: {
  params: Promise<{ lpjId: string }>;
}) {
  const { lpjId } = use(params);
  const router = useRouter();
  const { store, updateStore, currentUser } = useMockStore();

  const lpj = store.lpjs.find((l) => l.id === lpjId);
  const project = lpj ? store.projects.find((p) => p.id === lpj.project_id) : null;

  // Auto-connect with event & finance data per PRD rule
  const event = store.events.find((e) => e.project_id === lpj?.project_id);
  const tickets = event ? store.tickets.filter((t) => t.event_id === event.id) : [];
  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;

  const fundReqs = store.fund_requests.filter((r) => r.project_id === lpj?.project_id);
  const totalFundUsed = fundReqs.reduce((sum, r) => sum + (r.approved_amount || r.requested_amount), 0);

  const [activeSection, setActiveSection] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: lpj?.title || "",
    section_1_identity: lpj?.section_1_identity || `Program Kerja: ${project?.name || "Expo"}\nPenanggung Jawab: ${project?.lead_name || "Manager Proker"}\nPeriode: Semester Ganjil 2026/2027`,
    section_2_summary: lpj?.section_2_summary || "Kegiatan terlaksana dengan lancar bertujuan memajukan wirausaha muda mahasiswa Telkom University.",
    section_3_execution: lpj?.section_3_execution || "Pelaksanaan dilakukan secara hybrid di Auditorium Gedung Damar pada tanggal 20-21 November 2026.",
    section_4_attendance: lpj?.section_4_attendance || `Total Peserta Terdaftar: ${tickets.length || 120} orang\nKehadiran Fisik Check-in: ${checkedInCount || 98} orang (Tingkat kehadiran 82%)`,
    section_5_finance: lpj?.section_5_finance || `Realisasi Anggaran Diserap: Rp ${totalFundUsed.toLocaleString("id-ID")}\nSisa Anggaran: Rp 0 (Selesai direkonsiliasi)`,
    section_6_documentation: lpj?.section_6_documentation || "Dokumentasi foto, video aftermovie, dan liputan media telah diarsipkan di Google Drive Panitia.",
    section_7_evaluation: lpj?.section_7_evaluation || "Kendala teknis sound system teratasi cepat. Saran untuk periode mendatang agar publikasi dimulai H-21.",
    reviewer_notes: lpj?.reviewer_notes || "",
  });

  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!lpj) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">LPJ Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{lpjId}" tidak terdaftar.</p>
          <Link
            href="/organization/lpj"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar LPJ
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleSaveDraft = () => {
    const updated = store.lpjs.map((l) =>
      l.id === lpj.id
        ? {
            ...l,
            ...formData,
            updated_at: new Date().toISOString(),
          }
        : l
    );
    updateStore({ lpjs: updated });
    setActionNotice("Draft 7 bab LPJ berhasil disimpan!");
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleSubmitForReview = () => {
    const updated = store.lpjs.map((l) =>
      l.id === lpj.id
        ? {
            ...l,
            ...formData,
            status: "submitted" as const,
            updated_at: new Date().toISOString(),
          }
        : l
    );
    updateStore({
      lpjs: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "lpj",
          title: `LPJ Diajukan untuk Review: ${formData.title}`,
          message: `Laporan pertanggungjawaban proker ${project?.name} siap diperiksa oleh reviewer yang ditugaskan.`,
          source_route: `/organization/lpj/${lpj.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });
    setActionNotice("LPJ berhasil disubmit untuk pemeriksaan reviewer!");
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleApproveLPJ = () => {
    const updated = store.lpjs.map((l) =>
      l.id === lpj.id
        ? {
            ...l,
            ...formData,
            status: "approved" as const,
            updated_at: new Date().toISOString(),
          }
        : l
    );
    updateStore({
      lpjs: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "lpj",
          title: `LPJ Resmi Disahkan: ${formData.title}`,
          message: `LPJ ${project?.name} telah disetujui penuh oleh tim reviewer organisasi. Proker kini memenuhi syarat penutupan (WRK-10).`,
          source_route: `/organization/lpj/${lpj.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });
    setActionNotice("LPJ resmi DISAHKAN (Approved)! Proker siap ditutup.");
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRequestRevision = () => {
    if (!formData.reviewer_notes) {
      alert("Mohon sertakan catatan perbaikan pada kolom catatan reviewer.");
      return;
    }

    const updated = store.lpjs.map((l) =>
      l.id === lpj.id
        ? {
            ...l,
            ...formData,
            status: "revision_needed" as const,
            updated_at: new Date().toISOString(),
          }
        : l
    );
    updateStore({
      lpjs: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "lpj",
          title: `Revisi LPJ Diperlukan: ${formData.title}`,
          message: `Reviewer meminta revisi: "${formData.reviewer_notes}"`,
          source_route: `/organization/lpj/${lpj.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });
    setActionNotice("Permintaan revisi berhasil dikirim ke panitia.");
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/lpj"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Daftar LPJ
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DOC-05
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              {lpj.title}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Program Kerja: <span className="font-semibold text-wine-900">{project?.name || "Umum"}</span> • Status:{" "}
              <span className="font-bold uppercase text-brand-burgundy">{lpj.status}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Save className="w-4 h-4" /> Simpan Draft
            </button>

            <button
              type="button"
              onClick={handleSubmitForReview}
              className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </div>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* 7 Section Tabs Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { num: 1, title: "1. Identitas" },
            { num: 2, title: "2. Ringkasan" },
            { num: 3, title: "3. Pelaksanaan" },
            { num: 4, title: "4. Kehadiran" },
            { num: 5, title: "5. Keuangan" },
            { num: 6, title: "6. Dokumentasi" },
            { num: 7, title: "7. Evaluasi" },
          ].map((sec) => (
            <button
              key={sec.num}
              type="button"
              onClick={() => setActiveSection(sec.num)}
              className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                activeSection === sec.num
                  ? "bg-brand-burgundy text-white border-brand-burgundy shadow-xs"
                  : "bg-white text-wine-700 border-wine-100 hover:border-wine-300"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Section Content Card */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          {activeSection === 1 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-wine-950">
                Bab 1: Identitas & Struktur Kepanitiaan Program Kerja
              </h3>
              <p className="text-xs text-wine-500">
                Meliputi nama proker, penanggung jawab, susunan panitia, dan SK kepengurusan.
              </p>
              <textarea
                rows={6}
                value={formData.section_1_identity}
                onChange={(e) => setFormData({ ...formData, section_1_identity: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeSection === 2 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-wine-950">
                Bab 2: Ringkasan Eksekutif Kegiatan (Executive Summary)
              </h3>
              <p className="text-xs text-wine-500">
                Latar belakang, maksud, tujuan, dan capaian target strategis kegiatan.
              </p>
              <textarea
                rows={6}
                value={formData.section_2_summary}
                onChange={(e) => setFormData({ ...formData, section_2_summary: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed"
              />
            </div>
          )}

          {activeSection === 3 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-wine-950">
                Bab 3: Realisasi Pelaksanaan Acara
              </h3>
              <p className="text-xs text-wine-500">
                Jadwal aktual, tempat kegiatan, rundown pelaksanaan, dan pemateri/tamu undangan.
              </p>
              <textarea
                rows={6}
                value={formData.section_3_execution}
                onChange={(e) => setFormData({ ...formData, section_3_execution: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed"
              />
            </div>
          )}

          {activeSection === 4 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-wine-950">
                  Bab 4: Laporan Peserta & Kehadiran (Tersinkron Modul EVT & ATT)
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Data Otomatis dari Presensi
                </span>
              </div>
              <p className="text-xs text-wine-500">
                Rekapitulasi target vs realisasi kehadiran peserta di venue acara.
              </p>
              <textarea
                rows={6}
                value={formData.section_4_attendance}
                onChange={(e) => setFormData({ ...formData, section_4_attendance: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeSection === 5 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-wine-950">
                  Bab 5: Ringkasan Realisasi Keuangan & Anggaran (Tersinkron FIN)
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Data Otomatis dari Bendum
                </span>
              </div>
              <p className="text-xs text-wine-500">
                Pemasukan tiket/sponsor, pencairan termin proker, dan realisasi pembelanjaan RAB.
              </p>
              <textarea
                rows={6}
                value={formData.section_5_finance}
                onChange={(e) => setFormData({ ...formData, section_5_finance: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed font-mono"
              />
            </div>
          )}

          {activeSection === 6 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-wine-950">
                Bab 6: Dokumentasi Visual & Publikasi
              </h3>
              <p className="text-xs text-wine-500">
                Tautan folder cloud dokumentasi resmi, dokumentasi media partner, dan sertifikat.
              </p>
              <textarea
                rows={6}
                value={formData.section_6_documentation}
                onChange={(e) => setFormData({ ...formData, section_6_documentation: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed"
              />
            </div>
          )}

          {activeSection === 7 && (
            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-wine-950">
                Bab 7: Evaluasi, Hambatan, & Rekomendasi Selanjutnya
              </h3>
              <p className="text-xs text-wine-500">
                Analisis kendala lapangan, solusi yang diterapkan, dan rekomendasi untuk kepengurusan selanjutnya.
              </p>
              <textarea
                rows={6}
                value={formData.section_7_evaluation}
                onChange={(e) => setFormData({ ...formData, section_7_evaluation: e.target.value })}
                className="w-full text-xs p-3.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 leading-relaxed"
              />
            </div>
          )}

          {/* Reviewer Action Desk */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4 pt-4 mt-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Desk Pemeriksaan Tim Reviewer LPJ Organisasi
              </h4>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-wine-900">Catatan Reviewer / Instruksi Revisi:</label>
              <input
                type="text"
                placeholder="Tuliskan catatan kelengkapan atau instruksi perbaikan..."
                value={formData.reviewer_notes}
                onChange={(e) => setFormData({ ...formData, reviewer_notes: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleRequestRevision}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all"
              >
                Minta Revisi Bab
              </button>

              <button
                type="button"
                onClick={handleApproveLPJ}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Sahkan LPJ (Approve 7 Bab)
              </button>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
