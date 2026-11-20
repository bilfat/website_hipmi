"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { LetterDetailModal } from "@/components/organization/letter-modals";
import { FundRequestDetailModal } from "@/components/organization/finance-modals";
import { CorrespondenceRequest, FundRequest } from "@/types/domain";
import {
  Mail,
  Wallet,
  FileText,
  Ticket,
  Store,
  Megaphone,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";

type ActionTab = "all" | "surat" | "keuangan" | "lpj" | "tiket" | "layanan";

export default function OrganizationActionCenterPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [categoryFilter, setCategoryFilter] = useState<ActionTab>("all");
  const [selectedLetter, setSelectedLetter] = useState<CorrespondenceRequest | null>(null);
  const [selectedFund, setSelectedFund] = useState<FundRequest | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Scope queues strictly by role/permission
  const showLetters = permissions.isTopManagement || permissions.isSekum || permissions.canReviewLetter;
  const showFunds = permissions.isTopManagement || permissions.isBendum || permissions.canApproveFundRequest;
  const showLpjs = permissions.isTopManagement || permissions.canReviewLPJ || permissions.isSekum;
  const showTickets = permissions.isTopManagement || permissions.canVerifyTicketPayment || permissions.canManageEvents;
  const showServices =
    permissions.isTopManagement ||
    permissions.canManagePartnerships ||
    permissions.canReviewMedpart ||
    permissions.canPublishMedpart;

  const pendingLetters = showLetters
    ? (store.correspondence || []).filter((c) => ["submitted", "in_review"].includes(c.status))
    : [];
  const pendingFunds = showFunds
    ? (store.fund_requests || []).filter((f) => ["submitted", "in_review", "approved"].includes(f.status))
    : [];
  const pendingLpjs = showLpjs
    ? (store.lpjs || []).filter((l) => ["submitted", "in_review"].includes(l.status))
    : [];
  const pendingTickets = showTickets
    ? (store.reservations || []).filter((r) => r.payment_status === "pending_verification")
    : [];
  const pendingBusinesses =
    permissions.isTopManagement || permissions.canManagePartnerships
      ? (store.businesses || []).filter((b) => b.review_status === "review")
      : [];
  const pendingMedparts =
    permissions.isTopManagement || permissions.canReviewMedpart
      ? (store.medpart_submissions || []).filter((m) => m.status === "submitted")
      : [];

  const serviceCount = pendingBusinesses.length + pendingMedparts.length;
  const totalPending =
    pendingLetters.length +
    pendingFunds.length +
    pendingLpjs.length +
    pendingTickets.length +
    serviceCount;

  const filterButtons: { id: ActionTab; label: string; count: number; visible: boolean }[] = [
    { id: "all", label: "Semua Antrean", count: totalPending, visible: true },
    { id: "surat", label: "Persuratan", count: pendingLetters.length, visible: showLetters },
    { id: "keuangan", label: "Keuangan & RAB", count: pendingFunds.length, visible: showFunds },
    { id: "lpj", label: "Review LPJ", count: pendingLpjs.length, visible: showLpjs },
    { id: "tiket", label: "Pembayaran Tiket", count: pendingTickets.length, visible: showTickets },
    { id: "layanan", label: "Bisnis & Medpart", count: serviceCount, visible: showServices },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Pusat Tindakan &amp; Approval • {permissions.roleBadgeTitle}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Action Center Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Antrean pengajuan yang membutuhkan tindak lanjut sesuai kewenangan Anda. Data tersinkronisasi langsung dengan modul sumber.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span>{totalPending} Menunggu Tindakan</span>
        </span>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filterButtons
          .filter((b) => b.visible)
          .map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setCategoryFilter(btn.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                categoryFilter === btn.id
                  ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm"
                  : "bg-white text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40 hover:text-wine-950"
              }`}
            >
              {btn.label} ({btn.count})
            </button>
          ))}
      </div>

      {totalPending === 0 ? (
        <div className="p-12 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h2 className="font-serif text-lg font-bold text-wine-950">Semua Antrean Sudah Bersih</h2>
          <p className="text-xs text-neutral-dark">
            Tidak ada pengajuan tertunda pada lingkup kewenangan Anda saat ini.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. Pending Letters */}
          {(categoryFilter === "all" || categoryFilter === "surat") && pendingLetters.length > 0 && (
            <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-burgundy" />
                  <span>Antrean Persuratan Sekum ({pendingLetters.length})</span>
                </h2>
                <Link
                  href="/organization/correspondence"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Persuratan →
                </Link>
              </div>
              <div className="space-y-2.5">
                {pendingLetters.map((l) => {
                  const checked = (l.checklist || []).filter((c) => c.checked).length;
                  return (
                    <div
                      key={l.id}
                      onClick={() => setSelectedLetter(l)}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                            {l.routing}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                            Ceklis: {checked}/{(l.checklist || []).length}
                          </span>
                        </div>
                        <strong className="font-serif text-sm text-wine-950 block">{l.title}</strong>
                        <span className="text-[11px] text-neutral-dark">
                          {l.unit_name} • Pengaju: {l.submitter_name}
                        </span>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-brand-burgundy text-white font-semibold shrink-0 self-start sm:self-center">
                        {permissions.canReviewLetter ? "Ceklis & Review" : "Pantau Detail"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 2. Pending Fund Requests */}
          {(categoryFilter === "all" || categoryFilter === "keuangan") && pendingFunds.length > 0 && (
            <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-700" />
                  <span>Antrean Pengajuan Dana / RAB ({pendingFunds.length})</span>
                </h2>
                <Link
                  href="/organization/finance"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Buka Keuangan →
                </Link>
              </div>
              <div className="space-y-2.5">
                {pendingFunds.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFund(f)}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                          Rp {f.requested_amount.toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950">
                          {f.status}
                        </span>
                      </div>
                      <strong className="font-serif text-sm text-wine-950 block">{f.purpose}</strong>
                      <span className="text-[11px] text-neutral-dark">
                        {f.unit_name} • Pengaju: {f.submitter_name}
                      </span>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-brand-burgundy text-white font-semibold shrink-0 self-start sm:self-center">
                      {permissions.isBendum ? "Review / Cairkan" : "Pantau Detail"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. Pending LPJ Reviews */}
          {(categoryFilter === "all" || categoryFilter === "lpj") && pendingLpjs.length > 0 && (
            <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#AF7D66]" />
                  <span>Antrean Review LPJ Proker ({pendingLpjs.length})</span>
                </h2>
                <Link
                  href="/organization/lpj"
                  className="text-xs font-semibold text-brand-burgundy hover:underline"
                >
                  Semua LPJ →
                </Link>
              </div>
              <div className="space-y-2.5">
                {pendingLpjs.map((lpj) => {
                  const proj = store.projects.find((p) => p.id === lpj.project_id);
                  return (
                    <Link
                      key={lpj.id}
                      href={`/organization/lpj/${lpj.id}`}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-bold">
                          LPJ • {lpj.status}
                        </span>
                        <strong className="font-serif text-sm text-wine-950 block">{lpj.title}</strong>
                        <span className="text-[11px] text-neutral-dark">
                          Proker: {proj?.name || "-"}
                        </span>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold inline-flex items-center gap-1 shrink-0 self-start sm:self-center">
                        <span>Periksa LPJ</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* 4. Pending Ticket Payments */}
          {(categoryFilter === "all" || categoryFilter === "tiket") && pendingTickets.length > 0 && (
            <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-brand-burgundy" />
                  <span>Verifikasi Pembayaran Tiket ({pendingTickets.length})</span>
                </h2>
              </div>
              <div className="space-y-2.5">
                {pendingTickets.map((res) => {
                  const evt = store.events.find((e) => e.id === res.event_id);
                  return (
                    <Link
                      key={res.id}
                      href={`/organization/events/${res.event_id}/payments`}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <strong className="font-serif text-sm text-wine-950 block">
                          {res.participant_name} • Rp {res.amount.toLocaleString("id-ID")}
                        </strong>
                        <span className="text-[11px] text-neutral-dark">
                          Event: {evt?.title || res.event_id}
                        </span>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold inline-flex items-center gap-1 shrink-0 self-start sm:self-center">
                        <span>Verifikasi</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* 5. Businesses & Medpart */}
          {(categoryFilter === "all" || categoryFilter === "layanan") && serviceCount > 0 && (
            <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E9E1DC]">
                <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
                  <Store className="w-4 h-4 text-[#AF7D66]" />
                  <span>Kurasi Bisnis Kader &amp; Media Partner ({serviceCount})</span>
                </h2>
              </div>
              <div className="space-y-2.5">
                {pendingBusinesses.map((b) => (
                  <Link
                    key={b.id}
                    href="/organization/directory/businesses"
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#AF7D66]">
                        Bisnis Kader
                      </span>
                      <strong className="font-serif text-sm text-wine-950 block">{b.name}</strong>
                      <span className="text-[11px] text-neutral-dark">Pemilik: {b.owner_name}</span>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold shrink-0 self-start sm:self-center">
                      Review Bisnis →
                    </span>
                  </Link>
                ))}
                {pendingMedparts.map((m) => (
                  <Link
                    key={m.id}
                    href="/organization/cms/medpart"
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono font-bold uppercase text-brand-burgundy inline-flex items-center gap-1">
                        <Megaphone className="w-3 h-3" /> Media Partner ({m.package_type})
                      </span>
                      <strong className="font-serif text-sm text-wine-950 block">
                        {m.event_name} — {m.organization}
                      </strong>
                      <span className="text-[11px] font-mono text-neutral-dark">
                        Kode: {m.tracking_code}
                      </span>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold shrink-0 self-start sm:self-center">
                      Review Medpart →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Centralized Modals right inside Action Center */}
      <LetterDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        store={store}
        currentUser={currentUser}
        canReviewLetter={permissions.canReviewLetter}
        onUpdated={(msg) => setFeedback(msg)}
      />

      <FundRequestDetailModal
        request={selectedFund}
        onClose={() => setSelectedFund(null)}
        store={store}
        currentUser={currentUser}
        isBendum={permissions.isBendum}
        canConfirmReceipt={false}
        onUpdated={(msg) => setFeedback(msg)}
      />
    </div>
  );
}
