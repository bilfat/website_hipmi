"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  CalendarCheck,
  Award,
  CheckCircle2,
  Clock,
  Download,
  Printer,
  FileCheck,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function MyAttendancePage() {
  const { store, currentUser } = useMockStore();

  const userTickets = store.tickets.filter(
    (t) => t.participant_nim === currentUser.nim || t.participant_email === currentUser.email
  );

  const attended = userTickets.filter((t) => t.is_checked_in);
  const pending = userTickets.filter((t) => !t.is_checked_in);

  const [activeCert, setActiveCert] = useState<string | null>(null);

  const handlePrintCertificate = (ticketId: string) => {
    setActiveCert(ticketId);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 print:p-0 print:m-0 print:max-w-none">
      {/* Header Section (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: PER-09
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
              Presensi & Sertifikat
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Riwayat Kehadiran & E-Sertifikat
          </h1>
          <p className="text-xs text-neutral-dark">
            Catatan presensi resmi kegiatan organisasi dan sertifikat kepesertaan terverifikasi.
          </p>
        </div>
      </div>

      {/* Summary Stats Row (hidden in print) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
        <div className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
          <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider block">
            Total Agenda Terdaftar
          </span>
          <strong className="font-serif text-3xl font-bold text-wine-950">
            {userTickets.length}
          </strong>
          <span className="text-[11px] text-neutral-dark block">Seluruh riwayat tiket</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
          <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider block">
            Kehadiran Sah (Check-in)
          </span>
          <strong className="font-serif text-3xl font-bold text-emerald-700">
            {attended.length}
          </strong>
          <span className="text-[11px] text-neutral-dark block">Presensi tervalidasi operator</span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-1">
          <span className="text-neutral-light text-[11px] font-semibold uppercase tracking-wider block">
            E-Sertifikat Diterbitkan
          </span>
          <strong className="font-serif text-3xl font-bold text-brand-burgundy">
            {attended.length}
          </strong>
          <span className="text-[11px] text-neutral-dark block">Siap diunduh & dicetak</span>
        </div>
      </div>

      {/* Attended Events & Certificates List (hidden in print unless printing whole page) */}
      <div className="space-y-4 print:hidden">
        <h2 className="font-serif text-xl font-bold text-wine-950 flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-600" />
          <span>Agenda Telah Dihadiri ({attended.length})</span>
        </h2>

        {attended.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {attended.map((ticket) => {
              const evt = store.events.find((e) => e.id === ticket.event_id);
              const certNumber = `CERT-HIPMI-${ticket.ticket_token.replace("DEMO-TKT-", "")}-2026`;

              return (
                <div
                  key={ticket.id}
                  className="p-6 rounded-3xl bg-surface-card border border-emerald-200 shadow-md space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-wine-950/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Hadir Sah
                        </span>
                        <span className="text-[10px] font-mono text-neutral-light">
                          Token: {ticket.ticket_token}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-wine-950">
                        {evt?.title || "Agenda Organisasi"}
                      </h3>
                      <p className="text-xs text-neutral-dark">
                        Check-in pada:{" "}
                        <strong className="font-mono text-wine-950">
                          {ticket.checked_in_at ? new Date(ticket.checked_in_at).toLocaleString("id-ID") : "10:15 WIB"}
                        </strong>
                      </p>
                    </div>

                    <button
                      onClick={() => handlePrintCertificate(ticket.id)}
                      className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh E-Sertifikat</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-light font-mono">
                    <span>Nomor Sertifikat: <strong className="text-wine-950">{certNumber}</strong></span>
                    <span>Tervalidasi Digital BPC HIPMI Telkom</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
            <CalendarCheck className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              Belum ada agenda yang selesai dihadiri (check-in) untuk akun ini.
            </p>
          </div>
        )}
      </div>

      {/* Printable Certificate Template (shown when print is triggered) */}
      {activeCert && (
        <div className="hidden print:block p-12 border-8 border-brand-burgundy bg-white text-wine-950 text-center space-y-8 rounded-3xl">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-burgundy font-bold">
              BADAN PENGURUS CABANG HIPMI PT UNIVERSITAS TELKOM
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight">
              SERTIFIKAT PENGHARGAAN
            </h1>
            <p className="text-xs text-neutral-dark font-mono">
              Nomor: CERT-HIPMI-TELKOM-2026-ARTHA
            </p>
          </div>

          <div className="py-6 space-y-2">
            <p className="text-sm text-neutral-dark">Diberikan dengan hormat kepada:</p>
            <h2 className="font-serif text-3xl font-bold text-brand-burgundy underline decoration-gold-500 decoration-2">
              {currentUser.name}
            </h2>
            <p className="text-xs font-mono text-neutral-light">
              NIM: {currentUser.nim || "1301213001"}
            </p>
          </div>

          <p className="text-xs text-neutral-dark max-w-lg mx-auto leading-relaxed">
            Atas partisipasi aktif dan kehadiran penuh dalam agenda resmi organisasi HIPMI Perguruan Tinggi Universitas Telkom Kabinet Arthakarsa Periode 2026/2027.
          </p>

          <div className="pt-12 flex justify-between items-end text-xs font-mono">
            <div className="text-left space-y-1">
              <span>Bandung, 2026</span>
              <strong className="block font-serif text-sm">Ketua Umum BPC HIPMI</strong>
              <span className="text-[10px] text-neutral-light">Muhammad Bintang Al-Fath</span>
            </div>

            <div className="text-right space-y-1">
              <span>Verifikasi Digital</span>
              <strong className="block font-serif text-sm">Sekretaris Umum</strong>
              <span className="text-[10px] text-neutral-light">Siti Rahmawati</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
