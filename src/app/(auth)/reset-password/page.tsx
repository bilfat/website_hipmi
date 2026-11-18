"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { DEMO_PASSWORD } from "@/lib/mock/seed";
import { BrandLoader } from "@/components/ui/brand-loader";
import { Lock, ArrowRight, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "demo.mahasiswa@example.test";

  const { store } = useMockStore();
  const [otp, setOtp] = useState("246810");
  const [newPassword, setNewPassword] = useState(DEMO_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useState(DEMO_PASSWORD);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (otp.trim() !== "246810") {
      setErrorMsg("Kode verifikasi OTP salah. Dalam mode demo, gunakan kode: 246810");
      return;
    }

    if (!newPassword || newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    const user = store.users.find(
      (u) => u.email.toLowerCase() === emailParam.toLowerCase()
    );

    if (user) {
      addActivityHistory(
        user.name,
        "mengatur ulang kata sandi akun",
        user.email,
        "Autentikasi"
      );
    }

    setIsSuccess(true);
    setTimeout(() => {
      router.push("/masuk");
    }, 2000);
  };

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200/60 text-gold-900 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5 text-gold-700" />
          <span>Atur Ulang Kata Sandi</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          Buat Kata Sandi Baru
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark">
          Untuk akun: <strong className="text-brand-burgundy">{emailParam}</strong>
        </p>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">Kata Sandi Berhasil Diperbarui!</p>
            <p className="text-emerald-700">Mengalihkan ke halaman masuk dalam beberapa detik...</p>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Kode Verifikasi OTP Demo
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black font-mono focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
          <span className="text-[10px] text-neutral-light mt-1 block">
            Kode universal simulasi: <code className="text-brand-burgundy font-bold">246810</code>
          </span>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Kata Sandi Baru
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Konfirmasi Kata Sandi Baru
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSuccess}
          className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group mt-2"
        >
          <span>Simpan Kata Sandi Baru</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-wine-950/10 text-center">
        <Link
          href="/masuk"
          className="text-xs text-neutral-dark hover:text-brand-burgundy font-medium transition-colors"
        >
          Batal &amp; Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
