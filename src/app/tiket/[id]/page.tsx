"use client";

import { use, useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  ArrowLeft,
  Printer,
  Download,
  Calendar,
  MapPin,
  Ticket,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  QrCode,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const ticket = store.tickets.find((t) => t.id === id || t.ticket_token === id);
  const evt = store.events.find((e) => e.id === ticket?.event_id);
  const ticketType = store.ticket_types.find((tt) => tt.id === ticket?.ticket_type_id);

  const [feedback, setFeedback] = useState<string | null>(null);

  if (!ticket) {
    return (
      <PublicShell>
        <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            E-Tiket Tidak Ditemukan
          </h1>
          <p className="text-xs text-neutral-dark">
            Nomor token atau ID tiket tidak terdaftar dalam pangkalan data.
          </p>
          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Cari Tiket dengan NIM
          </Link>
        </div>
      </PublicShell>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  // Demo interactive toggle: simulate operator checking in this ticket
  const handleToggleCheckIn = () => {
    mutateStore((draft) => {
      const t = draft.tickets.find((item) => item.id === ticket.id);
      if (t) {
        if (!t.is_checked_in) {
          t.is_checked_in = true;
          t.checked_in_at = new Date().toISOString();
          t.check_in_operator_id = "OP-DEMO-DESK";
          addActivityHistory(
            "Operator Meja Registrasi (Demo)",
            "melakukan check-in tiket peserta",
            `${t.ticket_token} (${t.participant_name})`,
            "Presensi & Event"
          );
          addAuditEvent(
            "OP-DEMO-DESK",
            "Operator Meja Registrasi",
            "CHECK_IN_TICKET",
            "IssuedTicket",
            t.id,
            "UNCHECKED",
            "CHECKED_IN"
          );
          setFeedback("Tiket berhasil di-check in! Status kehadiran telah diperbarui.");
        } else {
          t.is_checked_in = false;
          t.checked_in_at = null;
          t.check_in_operator_id = null;
          setFeedback("Status check-in tiket dibatalkan.");
        }
      }
    });
  };

  return (
    <PublicShell>
      <div className="max-w-3xl mx-auto px-6 space-y-8 pb-16 print:p-0 print:m-0 print:max-w-none">
        {/* Navigation Breadcrumb (hidden in print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Pencarian Tiket</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-surface-card border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Tiket (PDF)</span>
            </button>
          </div>
        </div>

        {/* Screen Tag & Feedback */}
        <div className="flex items-center justify-between print:hidden">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: TKT-08 — E-Pass Resmi
          </span>
          <span className="text-xs text-neutral-light">
            Diterbitkan: {new Date(ticket.issued_at).toLocaleDateString("id-ID")}
          </span>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Digital Boarding Pass Ticket Card */}
        <div className="rounded-3xl bg-surface-card border-2 border-wine-950/20 shadow-2xl overflow-hidden print:border-black print:shadow-none">
          {/* Ticket Header Band */}
          <div className="p-6 sm:p-8 bg-brand-darkWine text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-bold block">
                  HIPMI PT UNIVERSITAS TELKOM • ARTHAKARSA
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {evt?.title || "Seminar Akbar Kewirausahaan"}
                </h1>
                <p className="text-xs text-blush-200">
                  Tiket Resmi Masuk Acara & Verifikasi Kehadiran
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-[10px] font-mono text-gold-300 uppercase block">
                  Kategori Tiket
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-mono text-xs font-bold uppercase">
                  {ticketType?.name || "VIP Regular"}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Event Time & Venue Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 text-xs">
              <div className="space-y-1">
                <span className="text-neutral-light block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span>Waktu & Tanggal Acara</span>
                </span>
                <strong className="text-wine-950 text-sm block font-mono">
                  {evt?.schedule_start
                    ? new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    : "Sabtu, 28 November 2026"}
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  Pintu dibuka pukul 08:30 WIB
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-neutral-light block flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>Lokasi Acara</span>
                </span>
                <strong className="text-wine-950 text-sm block">
                  {evt?.location || "Auditorium Damar Telkom University"}
                </strong>
                <span className="text-[11px] text-neutral-dark">
                  Kawasan Bandung Technoplex
                </span>
              </div>
            </div>

            {/* Participant Details */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs uppercase font-mono font-bold text-neutral-light tracking-wider">
                Identitas Pemegang Tiket
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-light block">Nama Peserta:</span>
                  <strong className="text-base text-wine-950 font-serif">
                    {ticket.participant_name}
                  </strong>
                </div>

                <div>
                  <span className="text-neutral-light block">NIM:</span>
                  <strong className="text-base text-wine-950 font-mono tracking-wider">
                    {ticket.participant_nim}
                  </strong>
                </div>

                <div>
                  <span className="text-neutral-light block">Alamat Email:</span>
                  <span className="text-wine-950">{ticket.participant_email}</span>
                </div>

                <div>
                  <span className="text-neutral-light block">Status Kehadiran:</span>
                  {ticket.is_checked_in ? (
                    <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sudah Check-In ({ticket.checked_in_at ? new Date(ticket.checked_in_at).toLocaleTimeString("id-ID") : "Hadir"})</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-brand-burgundy font-bold bg-brand-burgundy/10 px-2 py-0.5 rounded text-[11px]">
                      <span>Belum Check-In</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Dotted Tear-Off Line */}
            <div className="relative py-2">
              <div className="border-t-2 border-dashed border-wine-950/20" />
              <div className="absolute -left-10 -top-2 w-6 h-6 rounded-full bg-surface-base" />
              <div className="absolute -right-10 -top-2 w-6 h-6 rounded-full bg-surface-base" />
            </div>

            {/* Barcode & Security Token Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Token Verifikasi Kehadiran
                </span>
                <span className="font-mono text-2xl font-bold tracking-widest text-brand-burgundy">
                  {ticket.ticket_token}
                </span>
                <p className="text-[10px] text-neutral-light max-w-xs">
                  Tunjukkan barcode atau token ini kepada panitia registrasi di gerbang masuk.
                </p>
              </div>

              {/* Simulated High-Density Barcode Strip */}
              <div className="p-3 bg-white rounded-xl border border-wine-950/20 flex flex-col items-center gap-1 shrink-0">
                <div className="flex items-center gap-[2px] h-14">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9].map(
                    (val, i) => (
                      <div
                        key={i}
                        className="bg-black h-full"
                        style={{ width: `${(val % 3) + 1.5}px` }}
                      />
                    )
                  )}
                </div>
                <span className="font-mono text-[9px] text-neutral-600 tracking-widest">
                  {ticket.ticket_token}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Interactive Operator Simulator Box (hidden in print) */}
        <div className="p-5 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
              <strong className="text-xs font-serif text-wine-950">
                Simulasi Petugas Meja Registrasi (Check-In Desk)
              </strong>
            </div>
            <p className="text-[11px] text-neutral-dark">
              Uji coba alur kehadiran presensi langsung dari layar ini atau melalui menu modul ATT.
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleCheckIn}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all shrink-0 flex items-center gap-1.5 ${
              ticket.is_checked_in
                ? "bg-neutral-800 text-white hover:bg-neutral-900"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>
              {ticket.is_checked_in ? "Batalkan Check-In (Reset)" : "Simulasikan Scan & Hadir"}
            </span>
          </button>
        </div>
      </div>
    </PublicShell>
  );
}
