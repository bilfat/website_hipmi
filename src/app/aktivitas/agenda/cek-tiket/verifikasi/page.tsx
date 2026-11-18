"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  Sparkles,
  RefreshCw,
  AlertCircle
} from "lucide-react";

export default function TicketOTPVerificationPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat verifikasi OTP..." />}>
      <TicketOTPContent />
    </Suspense>
  );
}

function TicketOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nim = searchParams.get("nim") || "1301213001";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [cooldown, setCooldown] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleAutofillUniversalOtp = () => {
    setOtp(["2", "4", "6", "8", "1", "0"]);
    setErrorMsg("");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setErrorMsg("Harap masukkan 6 digit kode OTP secara lengkap.");
      return;
    }

    setIsVerifying(true);

    // Verify against universal demo OTP: 246810
    setTimeout(() => {
      if (fullOtp === "246810") {
        router.push(`/aktivitas/agenda/cek-tiket/hasil?nim=${encodeURIComponent(nim)}`);
      } else {
        setIsVerifying(false);
        setErrorMsg("Kode OTP tidak valid atau salah. Gunakan kode universal demo: 246810");
      }
    }, 400);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setCooldown(60);
    setOtp(["", "", "", "", "", ""]);
    setErrorMsg("");
  };

  return (
    <PublicShell>
      <div className="max-w-md mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/aktivitas/agenda/cek-tiket"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ubah NIM Pencarian</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-06
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Langkah 2 dari 3
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Verifikasi Kode OTP
          </h1>
          <p className="text-xs text-neutral-dark">
            Kode 6-digit verifikasi telah dikirimkan ke email yang terdaftar untuk NIM:{" "}
            <strong className="font-mono text-wine-950">{nim}</strong>
          </p>
        </div>

        {/* Universal Demo OTP Helper Banner */}
        <div className="p-4 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-light block uppercase font-mono">
                Universal Demo OTP
              </span>
              <strong className="font-mono text-base text-wine-950 tracking-wider">
                246810
              </strong>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutofillUniversalOtp}
            className="px-3 py-1.5 rounded-lg bg-white border border-gold-400/30 text-wine-950 font-medium hover:bg-gold-50 transition-colors text-[11px] shadow-sm"
          >
            Autofill 246810
          </button>
        </div>

        {/* OTP Input Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-xl border border-wine-950/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/40 text-wine-950 shadow-inner"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isVerifying ? "Memverifikasi..." : "Verifikasi & Tampilkan Tiket"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Resend Cooldown */}
          <div className="pt-2 text-center text-xs">
            {cooldown > 0 ? (
              <span className="text-neutral-light">
                Kirim ulang kode dalam <strong className="font-mono text-wine-950">{cooldown} detik</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Kirim Ulang Kode OTP</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
