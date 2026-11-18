"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { IssuedTicket } from "@/types/domain";
import {
  CreditCard,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Eye,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  QrCode
} from "lucide-react";

export default function EventPaymentsVerificationPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store, updateStore } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const reservations = store.reservations.filter((r) => r.event_id === eventId);

  const pendingPayments = reservations.filter(
    (r) => r.payment_status === "pending_verification" || r.payment_status === "pending"
  );
  const approvedPayments = reservations.filter((r) => r.payment_status === "paid");

  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!event) return null;

  const handleApprovePayment = (reservationId: string) => {
    const reservation = reservations.find((r) => r.id === reservationId);
    if (!reservation) return;

    // 1. Issue Ticket
    const newTicket: IssuedTicket = {
      id: `tkt-${Date.now()}`,
      reservation_id: reservation.id,
      event_id: eventId,
      ticket_type_id: reservation.ticket_type_id,
      ticket_token: `HIPMI-${Date.now().toString().slice(-4)}`,
      participant_name: reservation.participant_name,
      participant_nim: reservation.participant_nim,
      participant_email: reservation.participant_email,
      issued_at: new Date().toISOString(),
      is_checked_in: false,
    };

    // 2. Update reservation status
    const updatedReservations = store.reservations.map((r) =>
      r.id === reservationId
        ? {
            ...r,
            payment_status: "paid" as const,
            registration_status: "confirmed" as const,
          }
        : r
    );

    // 3. Update quota sold
    const updatedTicketTypes = store.ticket_types.map((tt) =>
      tt.id === reservation.ticket_type_id
        ? {
            ...tt,
            quota_sold: tt.quota_sold + 1,
            quota_reserved: Math.max(0, tt.quota_reserved - 1),
          }
        : tt
    );

    updateStore({
      reservations: updatedReservations,
      tickets: [newTicket, ...store.tickets],
      ticket_types: updatedTicketTypes,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "event",
          title: `Pembayaran Tiket Disetujui: ${newTicket.ticket_token}`,
          message: `Pembayaran ${reservation.participant_name} telah diverifikasi panitia. E-tiket telah diterbitkan.`,
          source_route: `/organization/events/${eventId}/participants`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setActionNotice(
      `Pembayaran peserta ${reservation.participant_name} disetujui! Token ${newTicket.ticket_token} resmi terbit.`
    );
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleRejectPayment = (reservationId: string) => {
    if (!rejectReason) {
      alert("Alasan penolakan bukti transfer wajib disertakan.");
      return;
    }

    const updatedReservations = store.reservations.map((r) =>
      r.id === reservationId
        ? {
            ...r,
            payment_status: "failed" as const,
            registration_status: "cancelled" as const,
          }
        : r
    );

    updateStore({ reservations: updatedReservations });
    setRejectId(null);
    setRejectReason("");
    setActionNotice("Pembayaran ditolak. Kuota telah dikembalikan.");
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> {event.title}
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-07
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Payment Verification Desk
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pemeriksaan bukti transfer QRIS pendaftar. Verifikator pembayaran adalah panitia pelaksana agenda (bukan Bendum).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Organizer Verification Role</span>
          </div>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Pending Payments Queue */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-wine-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Bukti Bayar Menunggu Verifikasi ({pendingPayments.length})
            </h3>
            <span className="text-xs text-wine-500">Persetujuan menerbitkan e-tiket secara otomatis</span>
          </div>

          {pendingPayments.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-surface-base border border-wine-100 text-wine-500 text-xs">
              Tidak ada pembayaran pending. Seluruh transaksi telah diperiksa.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPayments.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-wine-100 bg-surface-base flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {res.payment_status}
                      </span>
                      <span className="text-xs font-mono font-semibold text-brand-burgundy">
                        NIM: {res.participant_nim}
                      </span>
                    </div>

                    <h4 className="font-bold text-wine-900 font-display text-sm">
                      {res.participant_name}
                    </h4>
                    <p className="text-xs text-wine-600">
                      {res.participant_email} • {res.participant_phone}
                    </p>

                    <div className="text-xs text-wine-500 mt-1 flex items-center gap-3">
                      <span>Nominal: <strong className="text-brand-burgundy font-mono">Rp {res.amount.toLocaleString("id-ID")}</strong></span>
                      <span>Bukti: {res.proof_file_name || "struk-qris-demo.jpg"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      type="button"
                      onClick={() => setSelectedProof(res.proof_file_name || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80")}
                      className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat Bukti
                    </button>

                    <button
                      type="button"
                      onClick={() => setRejectId(res.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Tolak
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApprovePayment(res.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Setujui & Terbitkan Tiket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rejection Modal */}
        {rejectId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-wine-200 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-wine-950">
                Alasan Penolakan Bukti Pembayaran
              </h3>
              <p className="text-xs text-wine-600">
                Peserta akan menerima notifikasi status pembayaran ditolak beserta alasan penolakan ini.
              </p>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Contoh: Nominal transfer kurang / bukti tidak terbaca..."
                className="w-full text-xs p-3 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectId(null)}
                  className="px-3 py-1.5 rounded-lg border border-wine-200 text-xs font-medium text-wine-700"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleRejectPayment(rejectId)}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold"
                >
                  Konfirmasi Tolak
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Proof Modal Preview */}
        {selectedProof && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-2xl p-6 border border-wine-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-wine-950 text-sm">
                  Pratinjau Bukti Pembayaran QRIS
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedProof(null)}
                  className="text-xs font-semibold text-wine-600 hover:text-wine-950"
                >
                  Tutup [×]
                </button>
              </div>

              <div className="w-full h-80 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedProof.startsWith("http") ? selectedProof : "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80"}
                  alt="Bukti Transfer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setSelectedProof(null)}
                  className="px-4 py-1.5 rounded-lg bg-brand-burgundy text-white text-xs font-semibold"
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}
