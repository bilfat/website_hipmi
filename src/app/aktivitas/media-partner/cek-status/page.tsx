"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import { MedpartSubmission } from "@/types/domain";
import { Search, ArrowLeft, CheckCircle2, Clock, AlertTriangle, XCircle, FileText, ArrowRight } from "lucide-react";

function CheckMedpartContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";

  const { store } = useMockStore();
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [result, setResult] = useState<MedpartSubmission | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialCode) {
      handleSearchCode(initialCode);
    }
  }, [initialCode]);

  const handleSearchCode = (code: string) => {
    setTrackingCode(code);
    const found = store.medpart_submissions.find(
      (m) => m.tracking_code.toLowerCase() === code.trim().toLowerCase()
    );
    setResult(found || null);
    setHasSearched(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    handleSearchCode(trackingCode);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-8">
      {/* Breadcrumb */}
      <Link
        href="/aktivitas/media-partner"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Informasi Media Partner</span>
      </Link>

      {/* Search Header Box */}
      <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Pelacakan Status
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
            Cek Status Pengajuan Media Partner
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Masukkan kode tracking unik yang tertera pada tanda terima pengajuan Anda.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Contoh: MP-DEMO-0001"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-ivory border border-neutral-light/40 text-xs sm:text-sm font-mono font-bold text-brand-burgundy placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs sm:text-sm transition-colors shadow"
          >
            Lacak
          </button>
        </form>

        {/* Demo Fast-Lookup Chips */}
        <div className="pt-4 border-t border-wine-950/10 space-y-2">
          <span className="text-[11px] font-semibold text-neutral-light uppercase font-mono">
            Contoh Kode Tracking Demo:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { code: "MP-DEMO-0001", label: "Submitted" },
              { code: "MP-DEMO-0002", label: "Payment Pending" },
              { code: "MP-DEMO-0003", label: "Approved" },
              { code: "MP-DEMO-0004", label: "Published" },
              { code: "MP-DEMO-0005", label: "Revision" },
              { code: "MP-DEMO-0006", label: "Rejected" }
            ].map((chip) => (
              <button
                key={chip.code}
                type="button"
                onClick={() => handleSearchCode(chip.code)}
                className="px-2.5 py-1 rounded-xl bg-surface-ivory hover:bg-gold-50 border border-wine-950/10 text-[11px] font-mono transition-colors text-left"
              >
                <strong className="text-brand-burgundy">{chip.code}</strong>
                <span className="text-neutral-light ml-1.5 text-[10px]">({chip.label})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Display */}
      {hasSearched && (
        <div className="space-y-6">
          {!result ? (
            <div className="p-8 rounded-3xl bg-surface-card border border-red-200 text-center space-y-2 text-xs text-red-800">
              <p className="font-semibold text-sm">Kode Tracking Tidak Ditemukan</p>
              <p>Mohon periksa kembali kode yang Anda masukkan atau ajukan permohonan baru bila belum terdaftar.</p>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-surface-card border border-gold-500/40 shadow-xl space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-wine-950/10">
                <div>
                  <span className="font-mono text-xs font-bold text-brand-burgundy px-2.5 py-0.5 rounded-full bg-gold-50 border border-gold-300">
                    {result.tracking_code}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
                    {result.event_name}
                  </h2>
                  <p className="text-xs text-neutral-light mt-0.5">
                    Pemohon: <strong className="text-neutral-black">{result.applicant_name}</strong> ({result.organization})
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                    result.status === "published"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : result.status === "approved"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : result.status === "revision"
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : result.status === "rejected"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-surface-ivory text-neutral-dark border"
                  }`}
                >
                  {result.status}
                </span>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                  <span className="text-neutral-light block">Paket:</span>
                  <strong className="text-wine-950 text-sm">{result.package_name}</strong>
                </div>

                <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                  <span className="text-neutral-light block">Biaya:</span>
                  <strong className="text-wine-950 text-sm font-mono">
                    {result.amount === 0 ? "Gratis" : `Rp${result.amount.toLocaleString("id-ID")}`}
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                  <span className="text-neutral-light block">Jadwal Diminta:</span>
                  <strong className="text-wine-950 text-sm font-mono">{result.requested_publish_date}</strong>
                </div>
              </div>

              {/* Reviewer Notes if present */}
              {result.reviewer_notes && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300/60 space-y-1 text-xs text-amber-950">
                  <strong className="block text-amber-900 font-semibold">Catatan dari Redaksi Medkom:</strong>
                  <p className="leading-relaxed">{result.reviewer_notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-wine-950/10 flex justify-between items-center text-xs">
                <span className="text-neutral-light">
                  Diajukan pada: {new Date(result.created_at).toLocaleDateString("id-ID")}
                </span>

                <Link
                  href="/aktivitas/media-partner"
                  className="font-semibold text-brand-burgundy hover:text-brand-darkWine"
                >
                  Kembali ke Info Medpart
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CheckMedpartStatusPage() {
  return (
    <PublicShell>
      <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
        <CheckMedpartContent />
      </Suspense>
    </PublicShell>
  );
}
