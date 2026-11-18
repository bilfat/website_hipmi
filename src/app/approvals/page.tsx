"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  FileText,
  DollarSign,
  Ticket,
  Share2,
  Award,
  Users,
  AlertCircle
} from "lucide-react";

export default function UniversalApprovalCenterPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  // 1. Pending Letters
  const pendingLetters = store.correspondence.filter(
    (c) => c.status === "submitted" || c.status === "in_review"
  );

  // 2. Pending Funds
  const pendingFunds = store.fund_requests.filter(
    (f) => f.status === "submitted" || f.status === "in_review"
  );

  // 3. Pending Ticket Payments
  const pendingTicketPayments = store.reservations.filter(
    (r) => r.payment_status === "pending_verification"
  );

  // 4. Pending Medparts
  const pendingMedparts = store.medpart_submissions.filter(
    (m) => m.status === "pending" || m.status === "payment_verified"
  );

  // 5. Pending Cadre Verifications
  const pendingCadres = store.users.filter(
    (u) => u.cadre_status === "candidate" || u.cadre_status === "pending_verification"
  );

  // 6. Pending LPJs
  const pendingLPJs = store.lpjs.filter(
    (l) => l.status === "submitted" || l.status === "in_review"
  );

  const totalPending =
    pendingLetters.length +
    pendingFunds.length +
    pendingTicketPayments.length +
    pendingMedparts.length +
    pendingCadres.length +
    pendingLPJs.length;

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                SYS-04
              </span>
              <span className="text-xs font-medium text-wine-500">Antrean Persetujuan Terpadu</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Universal Approval Center
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pusat agregasi berkas, permohonan anggaran, dan tiket yang membutuhkan pemeriksaan pimpinan serta PIC berwenang.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-900 font-bold">{totalPending} Tindakan Menunggu</span>
          </div>
        </div>

        {/* Queues List */}
        <div className="space-y-4">
          {/* Section: Persuratan Sekum */}
          {pendingLetters.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-wine-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-burgundy" />
                  Surat Keluar Menunggu Verifikasi Sekum ({pendingLetters.length})
                </h3>
                <Link
                  href="/organization/correspondence/requests"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Modul Persuratan →
                </Link>
              </div>

              <div className="divide-y divide-wine-50">
                {pendingLetters.map((l) => (
                  <div key={l.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-wine-900">{l.title}</p>
                      <p className="text-[11px] text-wine-500">
                        {l.unit_name} • Pengaju: {l.submitter_name}
                      </p>
                    </div>
                    <Link
                      href={`/organization/correspondence/${l.id}`}
                      className="px-3 py-1 rounded-lg bg-surface-base hover:bg-wine-100 text-wine-900 font-semibold border border-wine-100"
                    >
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Keuangan Bendum */}
          {pendingFunds.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-wine-950 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Pengajuan Anggaran Menunggu Bendum ({pendingFunds.length})
                </h3>
                <Link
                  href="/organization/finance/requests"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Modul Keuangan →
                </Link>
              </div>

              <div className="divide-y divide-wine-50">
                {pendingFunds.map((f) => (
                  <div key={f.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-wine-900">{f.purpose}</p>
                      <p className="text-[11px] text-wine-500">
                        {f.unit_name} • Rp {f.requested_amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Link
                      href={`/organization/finance/requests/${f.id}`}
                      className="px-3 py-1 rounded-lg bg-surface-base hover:bg-wine-100 text-wine-900 font-semibold border border-wine-100"
                    >
                      Persetujuan
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Tiket Event */}
          {pendingTicketPayments.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-wine-950 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-purple-600" />
                  Pembayaran Tiket Event Menunggu Verifikasi ({pendingTicketPayments.length})
                </h3>
                <Link
                  href="/organization/events/dashboard"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Event Desk →
                </Link>
              </div>

              <div className="divide-y divide-wine-50">
                {pendingTicketPayments.map((r) => (
                  <div key={r.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-wine-900">{r.participant_name} (NIM: {r.participant_nim})</p>
                      <p className="text-[11px] text-wine-500 font-mono">
                        Nominal: Rp {r.amount.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <Link
                      href={`/organization/events/${r.event_id}/payments`}
                      className="px-3 py-1 rounded-lg bg-surface-base hover:bg-wine-100 text-wine-900 font-semibold border border-wine-100"
                    >
                      Periksa Bukti
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Verifikasi Kader PSDM */}
          {pendingCadres.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-wine-950 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Verifikasi Keanggotaan Kader ({pendingCadres.length})
                </h3>
                <Link
                  href="/organization/directory/cadres/verification"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Desk PSDM →
                </Link>
              </div>

              <div className="divide-y divide-wine-50">
                {pendingCadres.map((u) => (
                  <div key={u.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-wine-900">{u.full_name} (NIM: {u.nim})</p>
                      <p className="text-[11px] text-wine-500">{u.study_program}</p>
                    </div>
                    <Link
                      href="/organization/directory/cadres/verification"
                      className="px-3 py-1 rounded-lg bg-surface-base hover:bg-wine-100 text-wine-900 font-semibold border border-wine-100"
                    >
                      Verifikasi
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalPending === 0 && (
            <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 text-wine-500 text-xs">
              Semua tindakan persetujuan telah tuntas! Tidak ada antrean pending saat ini.
            </div>
          )}
        </div>
      </div>
    </OrganizationShell>
  );
}
