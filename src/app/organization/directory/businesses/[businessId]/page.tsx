"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Briefcase,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Globe,
  Phone,
  Eye,
  Save
} from "lucide-react";

export default function BusinessDetailVerificationPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = use(params);
  const { store, updateStore } = useMockStore();

  const business = store.businesses.find((b) => b.id === businessId);

  const [reviewStatus, setReviewStatus] = useState(business?.review_status || "in_review");
  const [publicationStatus, setPublicationStatus] = useState(business?.publication_status || "draft");
  const [reviewerNotes, setReviewerNotes] = useState(business?.reviewer_notes || "");
  const [notice, setNotice] = useState<string | null>(null);

  if (!business) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Bisnis Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{businessId}" tidak terdaftar.</p>
          <Link
            href="/organization/directory/businesses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Database Bisnis
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleUpdate = () => {
    const updated = store.businesses.map((b) =>
      b.id === business.id
        ? {
            ...b,
            review_status: reviewStatus as any,
            publication_status: publicationStatus as any,
            reviewer_notes: reviewerNotes,
          }
        : b
    );

    updateStore({
      businesses: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "cadre",
          title: `Kurasi Bisnis Diperbarui: ${business.name}`,
          message: `Status review: ${reviewStatus}. Status tayang publik: ${publicationStatus}.`,
          source_route: `/personal/bisnis`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setNotice("Pembaruan status verifikasi dan publikasi bisnis berhasil disimpan!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/directory/businesses"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Database Bisnis
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              DIR-05
            </span>
          </div>

          {publicationStatus === "published" && (
            <Link
              href={`/karya-kader/bisnis/${business.id}`}
              target="_blank"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              Halaman Publik (PUB-19) <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Business Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                {business.category}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                  reviewStatus === "approved"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                Review: {reviewStatus}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                  publicationStatus === "published"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Publikasi: {publicationStatus}
              </span>
            </div>

            <p className="text-xs text-wine-500">
              Pemilik: <span className="font-semibold text-wine-900">{business.owner_name}</span>
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display text-wine-950">{business.name}</h1>
            <p className="text-sm text-wine-700 mt-2 leading-relaxed">{business.description}</p>
          </div>

          {/* Products & Services */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-wine-900">
              Produk & Layanan Utama:
            </h4>
            <div className="flex flex-wrap gap-2">
              {business.products_services.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-surface-base border border-wine-100 text-xs text-wine-800 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-surface-base border border-wine-100 text-xs space-y-1">
            <span className="text-wine-500 font-medium">Kontak Publik Terverifikasi:</span>
            <p className="font-bold text-wine-900 font-mono">{business.contact_public}</p>
          </div>

          {/* Separate Approval & Publication Desk per PRD */}
          <div className="p-5 rounded-xl bg-wine-50/40 border border-wine-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-wine-950">
                Desk Kurasi & Publikasi Katalog (Aksi Terpisah Sesuai PRD)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-wine-900">1. Status Persetujuan Usaha (Review) *</label>
                <select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900 font-medium"
                >
                  <option value="in_review">In Review (Sedang Diteliti)</option>
                  <option value="approved">Approved (Lolos Kurasi Legalitas)</option>
                  <option value="revision_needed">Revision Needed (Minta Perbaikan)</option>
                  <option value="rejected">Rejected (Ditolak)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-wine-900">2. Status Publikasi ke Katalog Publik *</label>
                <select
                  value={publicationStatus}
                  onChange={(e) => setPublicationStatus(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900 font-medium"
                >
                  <option value="draft">Draft (Belum Ditampilkan di Beranda/Katalog)</option>
                  <option value="published">Published (Tayang Resmi di Katalog Publik)</option>
                  <option value="archived">Archived (Diarsipkan)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900">Catatan Internal Reviewer</label>
              <input
                type="text"
                placeholder="Catatan keabsahan usaha atau rekomendasi perbaikan..."
                value={reviewerNotes}
                onChange={(e) => setReviewerNotes(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 bg-white text-wine-900"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleUpdate}
                className="px-5 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" /> Simpan Status Kurasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
