"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Share2,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Eye,
  Save,
  Globe,
  DollarSign
} from "lucide-react";

export default function MedpartVerificationDetailPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = use(params);
  const { store, updateStore } = useMockStore();

  const submission = store.medpart_submissions.find(
    (m) => m.id === submissionId || m.tracking_code === submissionId
  );

  const [status, setStatus] = useState(submission?.status || "pending");
  const [reviewerNotes, setReviewerNotes] = useState(submission?.reviewer_notes || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!submission) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Pengajuan Medpart Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{submissionId}" tidak terdaftar.</p>
          <Link
            href="/organization/cms/medpart"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleUpdate = (newStatus: any) => {
    const updated = store.medpart_submissions.map((m) =>
      m.id === submission.id
        ? {
            ...m,
            status: newStatus,
            reviewer_notes: reviewerNotes,
          }
        : m
    );

    updateStore({
      medpart_submissions: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "cms",
          title: `Status Medpart Diperbarui: ${submission.event_name}`,
          message: `Pengajuan ${submission.tracking_code} kini berstatus: ${newStatus}.`,
          source_route: `/organization/cms/medpart/${submission.id}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setStatus(newStatus);
    setNotice(`Status pengajuan medpart berhasil diubah menjadi: ${newStatus}!`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/cms/medpart"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Media Partner
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              CMS-09
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-brand-burgundy px-3 py-1 rounded-lg bg-surface-base border border-wine-100">
              Kode: {submission.tracking_code}
            </span>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Card Details */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-wine-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                {submission.package_name} ({submission.package_type})
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  status === "published"
                    ? "bg-emerald-100 text-emerald-800"
                    : status === "approved"
                    ? "bg-blue-100 text-blue-800"
                    : status === "rejected"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                Status: {status}
              </span>
            </div>

            <p className="text-xs text-wine-500 font-mono">
              Permintaan Tayang: {submission.requested_publish_date}
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display text-wine-950">
              {submission.event_name}
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Institusi Pemohon: <span className="font-semibold text-wine-900">{submission.organization}</span> (PIC: {submission.applicant_name})
            </p>
          </div>

          {/* Contact and Pricing info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-base border border-wine-100 space-y-1">
              <span className="text-wine-500 font-medium">Kontak Pemohon:</span>
              <p className="font-mono text-wine-900">{submission.contact_email}</p>
              <p className="font-mono text-wine-600">{submission.contact_phone}</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-base border border-wine-100 space-y-1">
              <span className="text-wine-500 font-medium">Biaya Paket Promosi:</span>
              <p className="text-lg font-bold font-mono text-brand-burgundy">
                {submission.amount === 0 ? "GRATIS (Cross-Promotion)" : `Rp ${submission.amount.toLocaleString("id-ID")}`}
              </p>
              {submission.payment_proof_url && (
                <a
                  href={submission.payment_proof_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-burgundy font-semibold hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  <ExternalLink className="w-3 h-3" /> Lihat Bukti Transfer
                </a>
              )}
            </div>
          </div>

          {/* Poster asset preview link */}
          <div className="p-4 rounded-xl border border-wine-100 bg-white flex items-center justify-between text-xs">
            <span className="text-wine-700 font-medium">Poster / Materi Siap Tayang:</span>
            <a
              href={submission.poster_url}
              target="_blank"
              rel="noreferrer"
              className="text-brand-burgundy font-semibold hover:underline inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Buka Poster Digital
            </a>
          </div>

          {/* Medkom Reviewer Desk */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Desk Verifikasi Medkom (Media Komunikasi)
              </h3>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Catatan Internal / Umpan Balik:</label>
              <input
                type="text"
                placeholder="Catatan kelengkapan logo atau instruksi materi feed..."
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleUpdate("rejected")}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-all"
              >
                Tolak Pengajuan
              </button>

              <button
                type="button"
                onClick={() => handleUpdate("approved")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Setujui Pengajuan
              </button>

              <Link
                href="/organization/cms/medpart/publication"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Globe className="w-4 h-4" /> Meja Tayang (CMS-11)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
