"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import { MailCheck, ArrowRight, AlertCircle, CheckCircle2, RotateCw, KeyRound } from "lucide-react";

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "demo.pending@example.test";

  const { store, saveStore } = useMockStore();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAutoFill = () => {
    setOtp("246810");
    setErrorMsg(null);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (otp.trim() !== "246810") {
      setErrorMsg("Kode verifikasi salah. Dalam mode demo, gunakan kode OTP: 246810");
      return;
    }

    const user = store.users.find(
      (u) => u.email.toLowerCase() === emailParam.toLowerCase()
    );

    if (user) {
      user.account_status = "active";
      addActivityHistory(
        user.name,
        "memverifikasi alamat email akun",
        user.email,
        "Autentikasi"
      );
      saveStore(store);
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push("/masuk?verified=true");
    }, 1500);
  };

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="space-y-2 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
          <MailCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verifikasi Alamat Email</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          Masukkan Kode Verifikasi
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark">
          Kode 6-digit telah dikirimkan ke alamat email:{" "}
          <strong className="text-brand-burgundy font-medium">{emailParam}</strong>
        </p>
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-gold-50/80 border border-gold-300/60 text-gold-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-gold-700 flex-shrink-0" />
          <span>
            Kode OTP Universal Demo: <strong className="font-mono text-sm tracking-wider font-bold">246810</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={handleAutoFill}
          className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          Isi Otomatis (246810)
        </button>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Verifikasi Berhasil!</p>
            <p className="text-emerald-700">Mengalihkan Anda ke halaman login...</p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label className="block text-xs font-medium text-neutral-black mb-2 text-center">
            Kode Verifikasi 6-Digit
          </label>
          <input
            type="text"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="246810"
            className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold py-3.5 rounded-2xl bg-surface-ivory/80 border border-neutral-light/40 text-brand-burgundy placeholder-neutral-light/40 focus:outline-none focus:border-brand-burgundy focus:ring-2 focus:ring-brand-burgundy/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSuccess || otp.length < 6}
          className="w-full py-3.5 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine disabled:bg-neutral-light/50 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Verifikasi Akun Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-wine-950/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-dark">
        <div>
          {timer > 0 ? (
            <span>Kirim ulang kode dalam <strong className="font-mono text-brand-burgundy">{timer}s</strong></span>
          ) : (
            <button
              onClick={() => setTimer(60)}
              className="text-brand-burgundy hover:text-brand-darkWine font-semibold flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Kirim Ulang Kode OTP</span>
            </button>
          )}
        </div>

        <Link
          href="/masuk"
          className="hover:text-brand-burgundy underline underline-offset-2 transition-colors"
        >
          Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
      <EmailVerificationContent />
    </Suspense>
  );
}
