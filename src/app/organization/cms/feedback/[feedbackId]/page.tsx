"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Inbox,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
  Save,
  Send,
  Building,
  ShieldCheck
} from "lucide-react";

export default function FeedbackDetailTriagePage({
  params,
}: {
  params: Promise<{ feedbackId: string }>;
}) {
  const { feedbackId } = use(params);
  const { store, updateStore } = useMockStore();

  const feedback = store.feedback.find(
    (f) => f.id === feedbackId || f.receipt_code === feedbackId
  );

  const [status, setStatus] = useState(feedback?.status || "Baru");
  const [routedUnit, setRoutedUnit] = useState(feedback?.routed_to_unit || "Bidang 1: Kaderisasi & Organisasi");
  const [followupNotes, setFollowupNotes] = useState(feedback?.followup_notes || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!feedback) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Aspirasi Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{feedbackId}" tidak terdaftar.</p>
          <Link
            href="/organization/cms/feedback"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Kotak Suara
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleSaveTriage = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = store.feedback.map((f) =>
      f.id === feedback.id
        ? {
            ...f,
            status: status as any,
            routed_to_unit: routedUnit,
            followup_notes: followupNotes,
          }
        : f
    );

    updateStore({ feedback: updated });
    setNotice("Tindak lanjut disposisi aspirasi berhasil disimpan!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/cms/feedback"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Kotak Suara
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              CMS-13
            </span>
          </div>

          <span className="font-mono text-xs font-bold text-brand-burgundy px-3 py-1 rounded-lg bg-surface-base border border-wine-100">
            Resi: {feedback.receipt_code}
          </span>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Feedback Message Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-wine-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                {feedback.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  status === "Selesai"
                    ? "bg-emerald-100 text-emerald-800"
                    : status === "Dalam Tindak Lanjut"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {status}
              </span>
            </div>

            <p className="text-xs text-wine-500 font-mono">
              Masuk: {new Date(feedback.created_at).toLocaleString("id-ID")}
            </p>
          </div>

          <div>
            <h1 className="text-xl font-bold font-display text-wine-950">
              {feedback.title}
            </h1>
            <p className="text-sm text-wine-800 mt-3 p-4 rounded-xl bg-surface-base border border-wine-100 leading-relaxed whitespace-pre-line">
              {feedback.message}
            </p>
          </div>

          {/* Sender information (if provided) */}
          <div className="p-4 rounded-xl border border-wine-100 bg-white text-xs space-y-1">
            <span className="text-wine-500 font-medium">Informasi Pengirim (Opsional):</span>
            <p className="font-semibold text-wine-900">
              {feedback.sender_name_optional || "Anonim (Mahasiswa Telkom University)"}
            </p>
            {feedback.sender_contact_optional && (
              <p className="text-wine-600 font-mono">{feedback.sender_contact_optional}</p>
            )}
          </div>

          {/* Triage & Routing Action Form */}
          <form onSubmit={handleSaveTriage} className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Triage & Disposisi Tindak Lanjut Operator
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-wine-900">Status Tindak Lanjut *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900 font-medium"
                >
                  <option value="Baru">Baru (Belum Ditindaklanjuti)</option>
                  <option value="Dalam Tindak Lanjut">Dalam Tindak Lanjut (Sedang Diproses)</option>
                  <option value="Selesai">Selesai (Aspirasi Terjawab/Tuntas)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-wine-900">Disposisi ke Unit Terkait *</label>
                <select
                  value={routedUnit}
                  onChange={(e) => setRoutedUnit(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900"
                >
                  <option value="Bidang 1: Kaderisasi & Organisasi">Bidang 1: Kaderisasi & Organisasi</option>
                  <option value="Bidang 2: Ekonomi Kreatif & Bisnis">Bidang 2: Ekonomi Kreatif & Bisnis</option>
                  <option value="Kompartemen Media Komunikasi (Medkom)">Kompartemen Media Komunikasi (Medkom)</option>
                  <option value="Sekretariat Jenderal">Sekretariat Jenderal</option>
                  <option value="Bendahara Umum">Bendahara Umum</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Catatan Tindak Lanjut / Jawaban Resmi Operator</label>
              <textarea
                rows={3}
                placeholder="Tuliskan langkah konkret yang diambil atau jawaban untuk pengirim..."
                value={followupNotes}
                onChange={(e) => setFollowupNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
              >
                <Save className="w-4 h-4" /> Simpan Tindak Lanjut
              </button>
            </div>
          </form>
        </div>
      </div>
    </OrganizationShell>
  );
}
