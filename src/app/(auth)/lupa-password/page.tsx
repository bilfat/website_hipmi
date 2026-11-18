"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { KeyRound, ArrowRight, ArrowLeft, Mail, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { store } = useMockStore();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const user = store.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      setErrorMsg("Alamat email tidak terdaftar dalam sistem akun demo.");
      return;
    }

    router.push(`/reset-password?email=${encodeURIComponent(user.email)}`);
  };

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 border border-gold-200/60 text-gold-900 text-xs font-semibold">
          <KeyRound className="w-3.5 h-3.5 text-gold-700" />
          <span>Pemulihan Kata Sandi</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          Lupa Kata Sandi?
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark">
          Masukkan alamat email akun Anda. Kami akan mengirimkan instruksi kode verifikasi untuk mengatur ulang kata sandi.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-neutral-black mb-1.5">
            Email Akun Terdaftar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh: demo.mahasiswa@example.test"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group mt-2"
        >
          <span>Kirim Kode Pemulihan</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-wine-950/10 text-center">
        <Link
          href="/masuk"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
      </div>
    </div>
  );
}
