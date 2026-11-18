"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Ticket,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { IssuedTicket } from "@/types/domain";

export default function RegistrationStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { store } = useMockStore();

  const reservation = store.reservations.find((r) => r.id === id);
  const evt = store.events.find((e) => e.id === reservation?.event_id);
  const ticketType = store.ticket_types.find((t) => t.id === reservation?.ticket_type_id);
  const ticket = store.tickets.find((t) => t.reservation_id === id);

  const [demoActionFeedback, setDemoActionFeedback] = useState<string | null>(null);

  if (!reservation) {
    return (
      <PublicShell>
        <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            Data Registrasi Tidak Ditemukan
          </h1>
          <p className="text-xs text-neutral-dark">
            ID registrasi tidak ditemukan dalam sistem demo.
          </p>
          <Link
            href="/aktivitas/agenda"
            className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Kembali ke Daftar Agenda
          </Link>
        </div>
      </PublicShell>
    );
  }

  const isConfirmed =
    reservation.registration_status === "issued" ||
    reservation.registration_status === "approved" ||
    reservation.payment_status === "approved";
  const isPendingVerification =
    reservation.registration_status === "pending_verification" ||
    reservation.payment_status === "pending_verification";
  const isTemporaryReserved =
    reservation.registration_status === "reserved" ||
    reservation.payment_status === "unpaid";
  const isExpired =
    reservation.registration_status === "expired" ||
    reservation.payment_status === "expired";
  const isRejected =
    reservation.payment_status === "rejected" ||
    reservation.registration_status === "rejected";

  // Demo helper: simulate Bendum approving the payment and issuing the ticket immediately
  const handleSimulateApprove = () => {
    let issuedId = "";
    mutateStore((draft) => {
      const res = draft.reservations.find((r) => r.id === reservation.id);
      if (res) {
        res.payment_status = "approved";
        res.registration_status = "issued";
      }

      // Check if ticket already exists
      const existingTicket = draft.tickets.find((t) => t.reservation_id === reservation.id);
      if (!existingTicket) {
        issuedId = `tkt-${Date.now()}`;
        const newTicket: IssuedTicket = {
          id: issuedId,
          reservation_id: reservation.id,
          event_id: reservation.event_id,
          ticket_type_id: reservation.ticket_type_id,
          ticket_token: `DEMO-TKT-${Math.floor(1000 + Math.random() * 9000)}`,
          participant_name: reservation.participant_name,
          participant_nim: reservation.participant_nim,
          participant_email: reservation.participant_email,
          issued_at: new Date().toISOString(),
          is_checked_in: false,
          checked_in_at: null,
          check_in_operator_id: null
        };
        draft.tickets.unshift(newTicket);
      } else {
        issuedId = existingTicket.id;
      }

      addActivityHistory(
        "Bendum Organisasi (Demo)",
        "menyetujui verifikasi pembayaran tiket",
        `Order ${reservation.id} (${reservation.participant_name})`,
        "Tiket & Keuangan"
      );

      addAuditEvent(
        "usr-bendum-01",
        "Bendahara Umum",
        "APPROVE_TICKET_PAYMENT",
        "TicketReservation",
        reservation.id,
        "pending_verification",
        "approved"
      );
    });

    setDemoActionFeedback("Pembayaran berhasil disetujui! Tiket resmi telah diterbitkan.");
  };

  const handleSimulateReject = () => {
    mutateStore((draft) => {
      const res = draft.reservations.find((r) => r.id === reservation.id);
      if (res) {
        res.payment_status = "rejected";
        res.registration_status = "rejected";
      }
    });
    setDemoActionFeedback("Pembayaran ditolak (simulasi penolakan bukti tidak sah).");
  };

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/aktivitas/agenda/${reservation.event_id}`}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Detail Agenda</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-04
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Status Registrasi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Hasil & Status Pendaftaran
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Pantau status verifikasi pembayaran dan akses tiket resmi Anda di bawah ini.
          </p>
        </div>

        {demoActionFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{demoActionFeedback}</span>
          </div>
        )}

        {/* Status Card Banner */}
        {isConfirmed ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-emerald-300 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-wine-950/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Terverifikasi / Tiket Diterbitkan
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
                    Pendaftaran Berhasil!
                  </h2>
                  <p className="text-xs text-neutral-dark">
                    E-tiket Anda telah diterbitkan dan siap digunakan untuk check-in di lokasi acara.
                  </p>
                </div>
              </div>

              {ticket && (
                <Link
                  href={`/tiket/${ticket.id}`}
                  className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center gap-2 shrink-0"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Buka E-Tiket Saya</span>
                </Link>
              )}
            </div>

            {ticket && (
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-light block text-[10px]">Kode Token Tiket</span>
                  <strong className="text-base text-brand-burgundy">{ticket.ticket_token}</strong>
                </div>
                <div>
                  <span className="text-neutral-light block text-[10px]">Waktu Terbit</span>
                  <span className="text-wine-950">
                    {new Date(ticket.issued_at).toLocaleString("id-ID")}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-light block text-[10px]">Status Check-in</span>
                  <span className="text-emerald-700 font-bold">
                    {ticket.is_checked_in ? "Sudah Hadir" : "Belum Check-In"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : isPendingVerification ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-amber-300 shadow-xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  Menunggu Verifikasi Pembayaran
                </span>
                <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
                  Bukti Pembayaran Diterima
                </h2>
                <p className="text-xs text-neutral-dark">
                  Tim Bendahara sedang memeriksa bukti transfer Anda. Status tiket akan otomatis terbarui setelah diverifikasi.
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-light pt-2 border-t border-wine-950/10">
              File bukti terlampir: <strong className="font-mono text-wine-950">{reservation.proof_file_name || "bukti-transfer.jpg"}</strong> (Diunggah: {reservation.proof_submitted_at ? new Date(reservation.proof_submitted_at).toLocaleTimeString("id-ID") : "-"})
            </p>
          </div>
        ) : isTemporaryReserved ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-blue-200 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                    Temporary Reserved
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
                    Menunggu Pembayaran QRIS
                  </h2>
                  <p className="text-xs text-neutral-dark">
                    Selesaikan transfer via QRIS dalam batas waktu 180 detik.
                  </p>
                </div>
              </div>
              <Link
                href={`/pendaftaran/${reservation.id}/bayar`}
                className="px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
              >
                Bayar Sekarang
              </Link>
            </div>
          </div>
        ) : isExpired ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-red-200 shadow-xl space-y-4 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-wine-950">
              Reservasi Kadaluarsa
            </h2>
            <p className="text-xs text-neutral-dark max-w-md mx-auto">
              Waktu pembayaran 180 detik telah berakhir. Kuota telah dikembalikan secara otomatis.
            </p>
            <Link
              href={`/aktivitas/agenda/${reservation.event_id}/tiket`}
              className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Pesan Tiket Ulang
            </Link>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-rose-300 shadow-xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-wine-950">
                  Pembayaran Ditolak
                </h2>
                <p className="text-xs text-neutral-dark">
                  Bukti transfer tidak sesuai atau tidak dapat dibaca oleh tim verifikator.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Details Card */}
        <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
          <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-wine-950/10">
            Rincian Pendaftaran
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-neutral-light block">Nama Peserta:</span>
              <strong className="text-wine-950">{reservation.participant_name}</strong>
            </div>
            <div>
              <span className="text-neutral-light block">NIM:</span>
              <strong className="text-wine-950 font-mono">{reservation.participant_nim}</strong>
            </div>
            <div>
              <span className="text-neutral-light block">Fakultas / Prodi:</span>
              <span className="text-wine-950">
                {reservation.participant_faculty} — {reservation.participant_study_program}
              </span>
            </div>
            <div>
              <span className="text-neutral-light block">Nomor WhatsApp:</span>
              <span className="text-wine-950">{reservation.participant_phone}</span>
            </div>
            <div>
              <span className="text-neutral-light block">Agenda Kegiatan:</span>
              <strong className="text-wine-950">{evt?.title}</strong>
            </div>
            <div>
              <span className="text-neutral-light block">Kategori & Harga Tiket:</span>
              <strong className="text-wine-950">
                {ticketType?.name} ({reservation.amount === 0 ? "Gratis" : `Rp ${reservation.amount.toLocaleString("id-ID")}`})
              </strong>
            </div>
          </div>
        </div>

        {/* Developer / Demo Simulator Sandbox Box */}
        <div className="p-5 rounded-2xl bg-gold-400/10 border border-gold-400/30 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
            <span className="text-xs font-serif font-bold text-wine-950">
              Demo Simulation Sandbox (Bendahara Helper)
            </span>
          </div>
          <p className="text-[11px] text-neutral-dark leading-relaxed">
            Dalam skenario uji mandiri tanpa admin manual, Anda dapat menekan tombol di bawah untuk menyimulasikan persetujuan instan dari Bendahara dan langsung menerbitkan e-tiket.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSimulateApprove}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Simulasi Setujui Pembayaran (Terbitkan Tiket)</span>
            </button>

            <button
              type="button"
              onClick={handleSimulateReject}
              className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Simulasi Tolak Pembayaran</span>
            </button>
          </div>
        </div>

        {/* Navigation Action */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/aktivitas/agenda"
            className="text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
          >
            ← Kembali ke Katalog Agenda
          </Link>

          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="text-xs font-semibold text-brand-burgundy hover:underline"
          >
            Cek Tiket Lain via NIM →
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
