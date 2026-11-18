"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Sparkles,
  ArrowLeft,
  FileText,
  DollarSign,
  Ticket,
  Briefcase,
  Share2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";

export default function OrganizationActionCenterPage() {
  const { store } = useMockStore();

  const [categoryFilter, setCategoryFilter] = useState("all");

  const pendingLetters = store.correspondence.filter((c) => c.status === "submitted");
  const pendingFunds = store.fund_requests.filter((f) => f.status === "submitted");
  const pendingTickets = store.reservations.filter((r) => r.payment_status === "pending_verification");
  const pendingBusinesses = store.businesses.filter((b) => b.review_status === "review");
  const pendingMedparts = store.medpart_submissions.filter((m) => m.status === "submitted");

  const totalPending =
    pendingLetters.length +
    pendingFunds.length +
    pendingTickets.length +
    pendingBusinesses.length +
    pendingMedparts.length;

  return (
    <OrganizationShell>
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/organization/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Dashboard Organisasi</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ORG-05
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-amber-100 text-amber-800">
              Antrean Tindak Lanjut ({totalPending})
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Action Center Organisasi
          </h1>
          <p className="text-xs text-neutral-dark">
            Daftar pengajuan operasional lintas modul yang sedang menunggu keputusan, tanda tangan, atau verifikasi pengurus berwenang.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-wine-950/10 pb-3 text-xs">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              categoryFilter === "all"
                ? "bg-brand-burgundy text-white font-semibold"
                : "text-neutral-dark hover:text-wine-950 bg-surface-card"
            }`}
          >
            Semua Tindakan ({totalPending})
          </button>

          <button
            onClick={() => setCategoryFilter("surat")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              categoryFilter === "surat"
                ? "bg-brand-burgundy text-white font-semibold"
                : "text-neutral-dark hover:text-wine-950 bg-surface-card"
            }`}
          >
            Surat Sekum ({pendingLetters.length})
          </button>

          <button
            onClick={() => setCategoryFilter("keuangan")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              categoryFilter === "keuangan"
                ? "bg-brand-burgundy text-white font-semibold"
                : "text-neutral-dark hover:text-wine-950 bg-surface-card"
            }`}
          >
            Kas Bendum ({pendingFunds.length})
          </button>

          <button
            onClick={() => setCategoryFilter("tiket")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              categoryFilter === "tiket"
                ? "bg-brand-burgundy text-white font-semibold"
                : "text-neutral-dark hover:text-wine-950 bg-surface-card"
            }`}
          >
            Tiket Bayar ({pendingTickets.length})
          </button>

          <button
            onClick={() => setCategoryFilter("lainnya")}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-colors ${
              categoryFilter === "lainnya"
                ? "bg-brand-burgundy text-white font-semibold"
                : "text-neutral-dark hover:text-wine-950 bg-surface-card"
            }`}
          >
            Bisnis & Medpart ({pendingBusinesses.length + pendingMedparts.length})
          </button>
        </div>

        {/* Action Items Feed */}
        <div className="space-y-4">
          {/* Letters Pending (Sekum) */}
          {(categoryFilter === "all" || categoryFilter === "surat") &&
            pendingLetters.map((letter) => (
              <div
                key={letter.id}
                className="p-5 rounded-3xl bg-surface-card border border-gold-400/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        Surat Keluar
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {letter.reference_number_preview || letter.id}
                      </span>
                    </div>
                    <strong className="text-wine-950 font-serif text-base block">
                      {letter.subject}
                    </strong>
                    <p className="text-xs text-neutral-dark">
                      Pemohon: <span className="font-semibold">{letter.requester_name}</span> • Tujuan: {letter.destination}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/surat/${letter.id}`}
                  className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                >
                  <span>Verifikasi Sekum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {/* Fund Requests Pending (Bendum) */}
          {(categoryFilter === "all" || categoryFilter === "keuangan") &&
            pendingFunds.map((fund) => (
              <div
                key={fund.id}
                className="p-5 rounded-3xl bg-surface-card border border-emerald-400/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Pencairan Dana Kas
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {fund.id}
                      </span>
                    </div>
                    <strong className="text-wine-950 font-serif text-base block">
                      {fund.title || fund.purpose} (Rp {(fund.amount_requested || fund.requested_amount || 0).toLocaleString("id-ID")})
                    </strong>
                    <p className="text-xs text-neutral-dark">
                      Pemohon: <span className="font-semibold">{fund.requester_name}</span> • Rekening: {fund.disbursement_bank} ({fund.disbursement_account_number})
                    </p>
                  </div>
                </div>

                <Link
                  href={`/keuangan/${fund.id}`}
                  className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                >
                  <span>Tinjau Kas Bendum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {/* Ticket Payment Verifications */}
          {(categoryFilter === "all" || categoryFilter === "tiket") &&
            pendingTickets.map((tkt) => (
              <div
                key={tkt.id}
                className="p-5 rounded-3xl bg-surface-card border border-amber-400/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Pembayaran Tiket QRIS
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {tkt.id}
                      </span>
                    </div>
                    <strong className="text-wine-950 font-serif text-base block">
                      {tkt.participant_name} (Rp {tkt.amount.toLocaleString("id-ID")})
                    </strong>
                    <p className="text-xs text-neutral-dark">
                      NIM: {tkt.participant_nim} • Bukti: {tkt.proof_file_name || "transfer.jpg"}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/pendaftaran/${tkt.id}/status`}
                  className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                >
                  <span>Verifikasi Tiket</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}

          {totalPending === 0 && (
            <div className="p-12 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="font-serif text-xl font-bold text-wine-950">
                Seluruh Tindakan Telah Selesai!
              </h2>
              <p className="text-xs text-neutral-dark">
                Tidak ada pengajuan surat, pencairan dana, atau verifikasi pembayaran yang tertunda saat ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </OrganizationShell>
  );
}
