"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  QrCode,
  Upload,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function PaymentQRISPage({
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

  // 180s countdown state
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (!reservation?.reservation_expires_at) return 180;
    const expires = new Date(reservation.reservation_expires_at).getTime();
    const now = Date.now();
    const diff = Math.floor((expires - now) / 1000);
    return diff > 0 ? diff : 0;
  });

  const [isExpired, setIsExpired] = useState(timeLeft <= 0);
  const [proofFileName, setProofFileName] = useState("bukti_transfer_qris_telkom.jpg");
  const [confirmedPayment, setConfirmedPayment] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          // Mark reservation as expired in store
          if (reservation && reservation.registration_status !== "issued" && reservation.registration_status !== "approved") {
            mutateStore((draft) => {
              const r = draft.reservations.find((res) => res.id === id);
              if (r) {
                r.registration_status = "expired";
                r.payment_status = "expired";
              }
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [id, isExpired, reservation]);

  if (!reservation) {
    return (
      <PublicShell>
        <div className="max-w-xl mx-auto px-6 py-20 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-600 mx-auto" />
          <h1 className="font-serif text-2xl font-bold text-wine-950">
            Data Reservasi Tidak Ditemukan
          </h1>
          <p className="text-xs text-neutral-dark">
            ID reservasi tidak valid atau telah kadaluarsa. Silakan periksa kembali tautan Anda.
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

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleUploadProofAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExpired) return;
    setIsSubmitting(true);

    mutateStore((draft) => {
      const res = draft.reservations.find((r) => r.id === reservation.id);
      if (res) {
        res.payment_status = "pending_verification";
        res.registration_status = "pending_verification";
        res.proof_file_name = proofFileName;
        res.proof_submitted_at = new Date().toISOString();
      }

      addActivityHistory(
        reservation.participant_name,
        "mengunggah bukti pembayaran QRIS",
        `Order ${reservation.id} (Rp ${reservation.amount.toLocaleString("id-ID")})`,
        "Tiket & Keuangan"
      );

      addAuditEvent(
        reservation.participant_nim,
        reservation.participant_name,
        "UPLOAD_PAYMENT_PROOF",
        "TicketReservation",
        reservation.id,
        "reserved",
        "pending_verification"
      );
    });

    router.push(`/pendaftaran/${reservation.id}/status`);
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
              Screen ID: TKT-03
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Langkah 3 dari 3
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Pembayaran QRIS Demo
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Selesaikan pembayaran dalam batas waktu reservasi untuk mengamankan tiket Anda.
          </p>
        </div>

        {/* 180s Countdown Timer Banner */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isExpired
              ? "bg-red-50 border-red-200 text-red-900"
              : timeLeft <= 60
              ? "bg-amber-500/10 border-amber-500/30 text-amber-950 animate-pulse"
              : "bg-surface-card border-brand-burgundy/30 text-wine-950"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isExpired
                    ? "bg-red-200 text-red-800"
                    : "bg-brand-burgundy/10 text-brand-burgundy"
                }`}
              >
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-neutral-light block">
                  {isExpired ? "Status Reservasi" : "Sisa Waktu Pembayaran"}
                </span>
                <span className="font-serif text-2xl font-bold font-mono">
                  {isExpired ? "WAKTU HABIS" : formatTimer(timeLeft)}
                </span>
              </div>
            </div>

            <div className="text-xs sm:text-right">
              <span className="text-neutral-light block text-[11px]">Batas Waktu Reservasi</span>
              <span className="font-mono font-medium">
                180 Detik (Auto-Expire jika belum bayar)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          {!isExpired && (
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-4 overflow-hidden">
              <div
                className="bg-brand-burgundy h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 180) * 100}%` }}
              />
            </div>
          )}
        </div>

        {isExpired ? (
          <div className="p-8 rounded-3xl bg-surface-card border border-red-200 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-wine-950">
              Masa Berlaku Reservasi Telah Habis
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark max-w-md mx-auto">
              Waktu 180 detik telah berakhir sebelum konfirmasi pembayaran diunggah. Kuota tiket telah dikembalikan secara otomatis ke publik. Silakan lakukan pemesanan ulang.
            </p>
            <div className="pt-2">
              <Link
                href={`/aktivitas/agenda/${reservation.event_id}/tiket`}
                className="px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold inline-flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Pesan Ulang Tiket</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: QRIS Demo Card (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6 text-center">
                {/* QRIS Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-wine-950/10">
                  <div className="text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-burgundy block">
                      QRIS STANDAR NASIONAL
                    </span>
                    <strong className="text-xs text-wine-950 font-serif">
                      HIPMI PT Telkom University
                    </strong>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold-400/20 text-wine-950 font-mono font-bold">
                    NMID: ID102026ARTHA
                  </span>
                </div>

                {/* Simulated QR Code Canvas with Corner Target Marks */}
                <div className="max-w-[280px] mx-auto p-5 rounded-2xl bg-white border-2 border-wine-950 shadow-inner flex flex-col items-center justify-center space-y-3">
                  <div className="w-56 h-56 bg-neutral-900 rounded-xl p-3 flex flex-col items-center justify-between relative overflow-hidden">
                    {/* Simulated dense QR pattern */}
                    <div className="w-full h-full border-4 border-white flex flex-col justify-between p-2">
                      <div className="flex justify-between">
                        <div className="w-10 h-10 border-4 border-white bg-black flex items-center justify-center">
                          <div className="w-4 h-4 bg-white" />
                        </div>
                        <div className="w-10 h-10 border-4 border-white bg-black flex items-center justify-center">
                          <div className="w-4 h-4 bg-white" />
                        </div>
                      </div>
                      <div className="text-center font-mono text-[9px] text-white tracking-widest uppercase py-2 bg-brand-burgundy/80 rounded my-auto">
                        ARTHAKARSA QRIS DEMO
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="w-10 h-10 border-4 border-white bg-black flex items-center justify-center">
                          <div className="w-4 h-4 bg-white" />
                        </div>
                        <div className="text-[8px] font-mono text-neutral-300">
                          {reservation.id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-neutral-dark">
                    Scan via BCA, Mandiri, GoPay, OVO, ShopeePay
                  </span>
                </div>

                {/* Nominal snapshot */}
                <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1">
                  <span className="text-[10px] text-neutral-light uppercase font-mono block">
                    Total Nominal Transfer
                  </span>
                  <span className="font-serif text-3xl font-bold text-brand-burgundy">
                    Rp {reservation.amount.toLocaleString("id-ID")}
                  </span>
                  <p className="text-[11px] text-neutral-dark">
                    Harap transfer tepat hingga nominal di atas untuk mempermudah verifikasi panitia.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Proof Upload (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Order Snapshot Box */}
              <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
                <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-wine-950/10">
                  Ringkasan Pesanan
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-light">ID Reservasi:</span>
                    <span className="font-mono font-semibold text-wine-950">{reservation.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-light">Agenda:</span>
                    <span className="font-medium text-wine-950 text-right truncate max-w-[180px]">
                      {evt?.title || "Seminar Organisasi"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-light">Kategori Tiket:</span>
                    <span className="font-medium text-wine-950">{ticketType?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-light">Nama Peserta:</span>
                    <span className="font-medium text-wine-950">{reservation.participant_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-light">NIM:</span>
                    <span className="font-mono text-wine-950">{reservation.participant_nim}</span>
                  </div>
                </div>
              </div>

              {/* Upload Proof Form */}
              <form
                onSubmit={handleUploadProofAndSubmit}
                className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4"
              >
                <h3 className="font-serif text-base font-bold text-wine-950">
                  Unggah Bukti Pembayaran
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-wine-950">
                    File Bukti Transfer (Demo Mock)
                  </label>
                  <div className="border-2 border-dashed border-wine-950/20 rounded-2xl p-4 text-center hover:bg-wine-950/5 transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-brand-burgundy mx-auto mb-1" />
                    <span className="text-xs font-medium text-wine-950 block">
                      {proofFileName}
                    </span>
                    <span className="text-[10px] text-neutral-light">
                      Format simulasi PNG, JPG, PDF (Maks. 5 MB)
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-[11px] text-neutral-dark cursor-pointer">
                    <input
                      type="checkbox"
                      checked={confirmedPayment}
                      onChange={(e) => setConfirmedPayment(e.target.checked)}
                      className="mt-0.5 rounded border-wine-950/20 text-brand-burgundy"
                    />
                    <span>
                      Saya telah mentransfer nominal sesuai instruksi QRIS dan mengunggah bukti yang sah.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !confirmedPayment}
                  className="w-full py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? "Mengirimkan Bukti..." : "Kirim Bukti Pembayaran"}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}
