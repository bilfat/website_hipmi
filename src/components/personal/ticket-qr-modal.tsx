"use client";

import { IssuedTicket, AppEvent, EventTicketType } from "@/types/domain";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { Calendar, MapPin, CheckCircle2, Clock, Printer, QrCode, ShieldCheck } from "lucide-react";

interface TicketQrModalProps {
  ticket: IssuedTicket | null;
  event?: AppEvent;
  ticketType?: EventTicketType;
  onClose: () => void;
}

export function TicketQrModal({ ticket, event, ticketType, onClose }: TicketQrModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <EditorialModal
      isOpen={!!ticket}
      onClose={onClose}
      badge={ticket?.is_checked_in ? "Sudah Check-In" : "E-Tiket Resmi"}
      title={event?.title || "E-Tiket Kegiatan HIPMI"}
      subtitle="Tunjukkan kode QR atau token tiket ini kepada panitia saat registrasi ulang di lokasi acara."
      maxWidth="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6] transition-colors"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak E-Tiket</span>
          </button>
        </>
      }
    >
      {ticket && (
        <div className="space-y-5">
          {/* Editorial Ticket Pass Visual */}
          <div className="rounded-2xl overflow-hidden border border-[#E8B577]/40 shadow-md bg-white">
            {/* Ticket Top Band */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-brand-darkWine via-brand-burgundy to-wine-950 text-white space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B577] font-bold">
                  HIPMI PT TELKOM UNIVERSITY
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    ticket.is_checked_in
                      ? "bg-white/15 text-white"
                      : "bg-emerald-400/20 text-emerald-200 border border-emerald-400/40"
                  }`}
                >
                  {ticket.is_checked_in ? "Sudah Digunakan" : "Siap Check-In"}
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug">
                {event?.title || "Agenda HIPMI"}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E8B577]" />
                  {event?.schedule_start
                    ? new Date(event.schedule_start).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E8B577]" />
                  {event?.location || "Telkom University"}
                </span>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative flex items-center justify-between bg-[#FCF8F6] px-4 py-2 border-y border-dashed border-[#E8B577]/50">
              <span className="text-[10px] font-mono text-neutral-dark uppercase tracking-wider">
                Kategori: <strong className="text-wine-950">{ticketType?.name || "Reguler"}</strong>
              </span>
              <span className="text-[10px] font-mono font-bold text-brand-burgundy">
                {ticket.ticket_token}
              </span>
            </div>

            {/* QR & Holder Info */}
            <div className="p-5 flex flex-col sm:flex-row items-center gap-5">
              {/* Visual QR Pass Box */}
              <div className="w-32 h-32 rounded-2xl bg-[#FCF8F6] border-2 border-brand-burgundy/20 p-3 flex flex-col items-center justify-center shrink-0 relative">
                <QrCode className="w-20 h-20 text-brand-darkWine" strokeWidth={1.6} />
                <span className="text-[9px] font-mono text-neutral-dark mt-1 tracking-wider">
                  SCAN ME
                </span>
              </div>

              {/* Holder Info Grid */}
              <div className="flex-1 w-full space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-light block">
                    Nama Pemegang Tiket
                  </span>
                  <strong className="text-sm font-serif text-wine-950">
                    {ticket.participant_name}
                  </strong>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-light block">
                      NIM
                    </span>
                    <strong className="font-mono text-wine-950">
                      {ticket.participant_nim || "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-light block">
                      Terbit Pada
                    </span>
                    <strong className="font-mono text-wine-950">
                      {new Date(ticket.issued_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9E1DC] flex items-center gap-1.5 text-[11px]">
                  {ticket.is_checked_in ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-800 font-medium">
                        Check-in terverifikasi{" "}
                        {ticket.checked_in_at
                          ? `(${new Date(ticket.checked_in_at).toLocaleString("id-ID")})`
                          : ""}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="text-neutral-dark">
                        Belum check-in • Berlaku untuk 1 orang peserta
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start gap-2.5 text-[11px] text-neutral-dark">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
            <span>
              E-Tiket ini terhubung langsung dengan sistem presensi panitia HIPMI Central. Simpan tangkapan layar atau cetak untuk kelancaran verifikasi di lokasi.
            </span>
          </div>
        </div>
      )}
    </EditorialModal>
  );
}
