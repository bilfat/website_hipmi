"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Camera,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  QrCode,
  Search,
  Check,
  UserCheck,
  XCircle
} from "lucide-react";

export default function EventScannerPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store, updateStore, currentUser } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const [inputToken, setInputToken] = useState("");
  const [scanResult, setScanResult] = useState<{
    status: "success" | "already_checked_in" | "not_found";
    ticket?: any;
    message: string;
  } | null>(null);

  if (!event) return null;

  const processScan = (tokenToScan: string) => {
    const trimmed = tokenToScan.trim().toUpperCase();
    if (!trimmed) return;

    const ticket = tickets.find(
      (t) =>
        t.ticket_token.toUpperCase() === trimmed ||
        t.participant_nim === trimmed ||
        t.id === trimmed
    );

    if (!ticket) {
      setScanResult({
        status: "not_found",
        message: `Token/NIM "${trimmed}" tidak terdaftar pada acara ini.`,
      });
      return;
    }

    if (ticket.is_checked_in) {
      setScanResult({
        status: "already_checked_in",
        ticket,
        message: `PERINGATAN: Tiket sudah pernah check-in pada ${new Date(ticket.checked_in_at || "").toLocaleTimeString("id-ID")} WIB!`,
      });
      return;
    }

    // Success check-in!
    const updatedTickets = store.tickets.map((t) =>
      t.id === ticket.id
        ? {
            ...t,
            is_checked_in: true,
            checked_in_at: new Date().toISOString(),
            check_in_operator_id: currentUser?.id || "staff-checkin",
          }
        : t
    );

    updateStore({ tickets: updatedTickets });
    setScanResult({
      status: "success",
      ticket: { ...ticket, is_checked_in: true },
      message: "Check-in BERHASIL! Selamat datang di venue.",
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processScan(inputToken);
  };

  const resetScanner = () => {
    setInputToken("");
    setScanResult(null);
  };

  return (
    <OrganizationShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}/check-in`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Meja Presensi
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                ATT-02
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              Kamera Scanner Barcode / QR
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Arahkan kamera ke e-tiket peserta atau ketikkan token/NIM manual di bawah.
            </p>
          </div>

          <Link
            href={`/organization/events/${eventId}/attendance`}
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            Lihat Log Presensi (ATT-03)
          </Link>
        </div>

        {/* Viewfinder Camera Simulation */}
        <div className="relative rounded-3xl bg-slate-950 border-4 border-wine-900/60 overflow-hidden shadow-2xl h-80 sm:h-96 flex flex-col items-center justify-center text-center p-6">
          {/* Animated Scanning Beam */}
          <div className="absolute inset-x-8 top-1/4 h-0.5 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-pulse"></div>

          {/* Viewfinder Target Box */}
          <div className="w-56 h-56 rounded-2xl border-2 border-dashed border-rose-400/80 flex flex-col items-center justify-center p-4 relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-500"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rose-500"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rose-500"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-500"></div>

            <QrCode className="w-16 h-16 text-rose-300/40" />
            <p className="text-[11px] font-mono text-rose-200/80 mt-2">
              Posisikan QR code dalam bingkai
            </p>
          </div>

          {/* Quick Demo Scan Buttons */}
          <div className="absolute bottom-3 inset-x-4 flex items-center justify-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono">Uji Coba Cepat:</span>
            {tickets.slice(0, 3).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => processScan(t.ticket_token)}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition-all"
              >
                Scan {t.ticket_token}
              </button>
            ))}
          </div>
        </div>

        {/* Scan Result Feedback Card */}
        {scanResult && (
          <div
            className={`p-5 rounded-2xl border shadow-md space-y-3 transition-all ${
              scanResult.status === "success"
                ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                : scanResult.status === "already_checked_in"
                ? "bg-amber-50 border-amber-300 text-amber-950"
                : "bg-rose-50 border-rose-300 text-rose-950"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {scanResult.status === "success" ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : scanResult.status === "already_checked_in" ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <h3 className="font-display font-bold text-base">
                  {scanResult.status === "success"
                    ? "Check-in Berhasil Valid!"
                    : scanResult.status === "already_checked_in"
                    ? "Tiket Sudah Pernah Hadir!"
                    : "Tiket Tidak Ditemukan!"}
                </h3>
              </div>

              <button
                type="button"
                onClick={resetScanner}
                className="px-3 py-1 rounded-lg bg-white/80 hover:bg-white text-xs font-semibold shadow-xs transition-all"
              >
                Scan Berikutnya
              </button>
            </div>

            <p className="text-xs font-medium">{scanResult.message}</p>

            {scanResult.ticket && (
              <div className="p-3 rounded-xl bg-white/90 border border-black/5 text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Nama Peserta:</span>
                  <span>{scanResult.ticket.participant_name}</span>
                </div>
                <div className="flex justify-between">
                  <span>NIM Telkom:</span>
                  <span className="font-mono font-semibold">{scanResult.ticket.participant_nim}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token E-Tiket:</span>
                  <span className="font-mono font-bold text-brand-burgundy">{scanResult.ticket.ticket_token}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manual Input Fallback per PRD */}
        <form onSubmit={handleManualSubmit} className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
          <label className="text-xs font-bold text-wine-900 uppercase tracking-wider flex items-center justify-between">
            <span>Input Kode / NIM Manual (Cadangan Kamera)</span>
            <span className="text-[11px] text-wine-500 font-normal">Ketik NIM atau Token Tiket</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: HIPMI-0001 atau 1201220001"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 font-mono font-semibold uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Check className="w-4 h-4" /> Check-in
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}
