"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addAuditEvent } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  ChevronLeft,
  Save,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  Users,
  Wallet,
} from "lucide-react";

const SECTIONS = [
  { num: 1, key: "section_1_identity", title: "1. Identitas Proker", desc: "Nama program kerja, penanggung jawab, dan periode kabinet." },
  { num: 2, key: "section_2_summary", title: "2. Ringkasan Kegiatan", desc: "Tujuan utama dan gambaran umum pelaksanaan." },
  { num: 3, key: "section_3_execution", title: "3. Pelaksanaan", desc: "Waktu, tempat, rangkaian acara, dan dinamika lapangan." },
  { num: 4, key: "section_4_attendance", title: "4. Peserta & Kehadiran", desc: "Rekap peserta yang ditarik otomatis dari sistem presensi." },
  { num: 5, key: "section_5_finance", title: "5. Ringkasan Keuangan", desc: "Realisasi RAB & kas proker tanpa menggandakan transaksi." },
  { num: 6, key: "section_6_documentation", title: "6. Dokumentasi", desc: "Tautan foto, video aftermovie, dan bukti publikasi." },
  { num: 7, key: "section_7_evaluation", title: "7. Evaluasi & Kesimpulan", desc: "Kendala, solusi, dan rekomendasi perbaikan periode mendatang." },
] as const;

export default function LPJDetailEditorPage({
  params,
}: {
  params: Promise<{ lpjId: string }>;
}) {
  const { lpjId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const lpj = store.lpjs.find((l) => l.id === lpjId);
  const project = lpj ? store.projects.find((p) => p.id === lpj.project_id) : null;

  // Auto-connect with event & finance data per front_end.md DOC-05
  const event = store.events.find((e) => e.project_id === lpj?.project_id);
  const tickets = event ? store.tickets.filter((t) => t.event_id === event.id) : [];
  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;

  const fundReqs = store.fund_requests.filter((r) => r.project_id === lpj?.project_id);
  const totalFundUsed = fundReqs.reduce((sum, r) => sum + (r.approved_amount || r.requested_amount), 0);

  const canEditLpj =
    permissions.isKakom ||
    permissions.managedProjectIds.includes(lpj?.project_id || "") ||
    lpj?.submitter_user_id === currentUser.id;

  // Enforce front_end.md line 17639: Bendum monitors finance only; LPJ approval is strictly by designated Reviewer!
  const canApproveLpj = permissions.canReviewLPJ && !permissions.isBendum;

  const [activeSection, setActiveSection] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: lpj?.title || "",
    section_1_identity:
      lpj?.section_1_identity ||
      `Program Kerja: ${project?.name || "Proker"}\nPenanggung Jawab: ${project?.lead_name || "Manager Proker"}`,
    section_2_summary: lpj?.section_2_summary || "",
    section_3_execution: lpj?.section_3_execution || "",
    section_4_attendance:
      lpj?.section_4_attendance ||
      `Total Tiket Terbit: ${tickets.length} orang\nKehadiran Check-in: ${checkedInCount} orang`,
    section_5_finance:
      lpj?.section_5_finance ||
      `Realisasi RAB Proker: Rp ${totalFundUsed.toLocaleString("id-ID")}`,
    section_6_documentation: lpj?.section_6_documentation || "",
    section_7_evaluation: lpj?.section_7_evaluation || "",
    reviewer_notes: lpj?.reviewer_notes || "",
  });

  const [notice, setNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!lpj) {
    return (
      <div className="p-12 text-center rounded-3xl bg-white/95 border border-[#E9E1DC] space-y-4">
        <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
        <h2 className="font-serif text-xl font-bold text-wine-950">LPJ Tidak Ditemukan</h2>
        <p className="text-xs text-neutral-dark">Data LPJ yang dimaksud tidak tersedia.</p>
        <Link
          href="/organization/lpj"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar LPJ
        </Link>
      </div>
    );
  }

  const updateLpjStatus = (
    nextStatus: "draft" | "submitted" | "approved" | "revision_needed",
    msg: string
  ) => {
    setErrorMsg(null);
    if (nextStatus === "revision_needed" && !formData.reviewer_notes.trim()) {
      setErrorMsg("Mohon tuliskan catatan revisi pada kolom Catatan Reviewer sebelum meminta revisi.");
      return;
    }

    mutateStore((draft) => {
      const target = draft.lpjs.find((l) => l.id === lpj.id);
      if (target) {
        Object.assign(target, formData, {
          status: nextStatus,
          updated_at: new Date().toISOString(),
        });
      }
      if (nextStatus === "approved" || nextStatus === "revision_needed") {
        addAuditEvent(
          currentUser.id,
          currentUser.name,
          nextStatus === "approved" ? "APPROVE_LPJ" : "REQUEST_LPJ_REVISION",
          "LPJ",
          lpj.id
        );
      }
    });
    setNotice(msg);
  };

  const currentSectionObj = SECTIONS.find((s) => s.num === activeSection) || SECTIONS[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/organization/lpj"
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Daftar LPJ</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            {lpj.title}
          </h1>
          <p className="text-xs text-neutral-dark">
            Program Kerja: <strong className="text-wine-950">{project?.name || "Umum"}</strong> •
            Status: <strong className="uppercase text-brand-burgundy">{lpj.status}</strong>
          </p>
        </div>

        {canEditLpj && lpj.status !== "approved" && (
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => updateLpjStatus("draft", "Draf 7-bab LPJ berhasil disimpan.")}
              className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Draf</span>
            </button>
            <button
              type="button"
              onClick={() =>
                updateLpjStatus("submitted", "LPJ berhasil diajukan ke Reviewer untuk pemeriksaan.")
              }
              className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit untuk Review</span>
            </button>
          </div>
        )}
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notice}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Auto-Synced Source Data Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-light block">
              Sinkronisasi Presensi Event
            </span>
            <strong className="text-wine-950">
              {checkedInCount} Hadir dari {tickets.length} Tiket Terbit
            </strong>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-neutral-light block">
              Sinkronisasi Keuangan Proker
            </span>
            <strong className="font-mono text-emerald-700">
              Rp {totalFundUsed.toLocaleString("id-ID")} ({fundReqs.length} RAB)
            </strong>
          </div>
        </div>
      </div>

      {/* 7 Section Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {SECTIONS.map((sec) => (
          <button
            key={sec.num}
            type="button"
            onClick={() => setActiveSection(sec.num)}
            className={`px-3 py-2.5 rounded-2xl text-xs font-semibold text-center border transition-all ${
              activeSection === sec.num
                ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm"
                : "bg-white/95 text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40 hover:text-wine-950"
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Active Section Editor */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4 text-xs">
        <div className="pb-3 border-b border-[#E9E1DC]">
          <h2 className="font-serif text-lg font-bold text-wine-950">{currentSectionObj.title}</h2>
          <p className="text-neutral-dark mt-0.5">{currentSectionObj.desc}</p>
        </div>

        <textarea
          rows={7}
          disabled={!canEditLpj || lpj.status === "approved"}
          value={formData[currentSectionObj.key]}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [currentSectionObj.key]: e.target.value }))
          }
          className="w-full p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] text-sm text-wine-950 leading-relaxed disabled:opacity-75"
        />

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={activeSection === 1}
            onClick={() => setActiveSection((s) => Math.max(1, s - 1))}
            className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold disabled:opacity-40"
          >
            ← Bab Sebelumnya
          </button>
          <button
            type="button"
            disabled={activeSection === 7}
            onClick={() => setActiveSection((s) => Math.min(7, s + 1))}
            className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-brand-burgundy font-semibold disabled:opacity-40"
          >
            Bab Selanjutnya →
          </button>
        </div>
      </section>

      {/* Reviewer Panel */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E8B577]/50 shadow-sm space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E9E1DC]">
          <div>
            <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <span>Panel Review &amp; Pengesahan LPJ</span>
            </h2>
            <p className="text-[11px] text-neutral-dark">
              {canApproveLpj
                ? "Anda memiliki kewenangan sebagai Reviewer LPJ untuk mengesahkan atau meminta revisi."
                : permissions.isBendum
                ? "Bendahara Umum memantau ringkasan keuangan secara read-only; pengesahan LPJ dilakukan oleh Reviewer yang ditunjuk."
                : "Catatan hasil pemeriksaan dari Reviewer organisasi akan tampil di bawah ini."}
            </p>
          </div>
        </div>

        <textarea
          rows={3}
          disabled={!canApproveLpj}
          value={formData.reviewer_notes}
          onChange={(e) => setFormData((prev) => ({ ...prev, reviewer_notes: e.target.value }))}
          placeholder="Catatan review atau poin revisi dari reviewer..."
          className="w-full p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950 disabled:opacity-75 resize-none"
        />

        {canApproveLpj && (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() =>
                updateLpjStatus("revision_needed", "Permintaan revisi LPJ telah dikirim ke pengaju.")
              }
              className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Minta Revisi</span>
            </button>
            <button
              type="button"
              onClick={() =>
                updateLpjStatus(
                  "approved",
                  "LPJ resmi disahkan (Approved). Program kerja kini memenuhi syarat penutupan."
                )
              }
              className="px-5 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sahkan LPJ (Approve)</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
