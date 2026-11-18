"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMockStore, setCurrentUserId } from "@/lib/mock/store";
import { DEMO_PASSWORD } from "@/lib/mock/seed";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { BrandLoader } from "@/components/ui/brand-loader";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifiedNotice = searchParams.get("verified");

  const { store } = useMockStore();
  const [emailOrNim, setEmailOrNim] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleQuickLogin = (demoId: string) => {
    const targetUser = store.users.find((u) => u.demo_id === demoId);
    if (!targetUser) return;
    setEmailOrNim(targetUser.email);
    setPassword(DEMO_PASSWORD);
    executeLogin(targetUser.email, DEMO_PASSWORD);
  };

  const executeLogin = (identifier: string, pass: string) => {
    setErrorMsg(null);

    const user = store.users.find(
      (u) =>
        u.email.toLowerCase() === identifier.trim().toLowerCase() ||
        (u.nim && u.nim.toLowerCase() === identifier.trim().toLowerCase())
    );

    if (!user) {
      setErrorMsg("Akun tidak ditemukan. Pastikan email atau NIM Anda terdaftar.");
      return;
    }

    if (pass !== DEMO_PASSWORD) {
      setErrorMsg(`Password salah. Gunakan password default demo: ${DEMO_PASSWORD}`);
      return;
    }

    if (user.account_status === "verification_pending") {
      router.push(`/status-akun?status=verification_pending&userId=${user.id}`);
      return;
    }

    if (user.account_status === "suspended") {
      router.push(`/status-akun?status=suspended&userId=${user.id}`);
      return;
    }

    setCurrentUserId(user.id);
    const perms = resolveUserPermissions(user, store);

    startTransition(() => {
      if (user.base_role === "system_admin") {
        router.push("/admin/kabinet");
      } else if (perms.canAccessOrganization && user.base_role !== "mahasiswa") {
        router.push("/personal/dashboard");
      } else {
        router.push("/personal/dashboard");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrNim.trim() || !password) {
      setErrorMsg("Harap masukkan email/NIM dan password Anda.");
      return;
    }
    executeLogin(emailOrNim, password);
  };

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200/60 text-burgundy-900 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-burgundy-700" />
          <span>Autentikasi Akun</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          Masuk ke HIPMI CENTRAL
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark">
          Gunakan akun mahasiswa, kader, atau pengurus kabinet Anda untuk melanjutkan.
        </p>
      </div>

      {verifiedNotice && (
        <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Email Anda telah berhasil diverifikasi! Silakan masuk dengan kata sandi Anda.</span>
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
            Email Kampus atau NIM
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={emailOrNim}
              onChange={(e) => setEmailOrNim(e.target.value)}
              placeholder="contoh: demo.mahasiswa@example.test atau DEMO-2026-001"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-neutral-black">
              Kata Sandi
            </label>
            <Link
              href="/lupa-password"
              className="text-xs text-brand-burgundy hover:text-brand-darkWine font-medium transition-colors"
            >
              Lupa sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-light">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={`Password default: ${DEMO_PASSWORD}`}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs sm:text-sm text-neutral-black placeholder-neutral-light/70 focus:outline-none focus:border-brand-burgundy focus:ring-1 focus:ring-brand-burgundy transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-light hover:text-neutral-dark"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-neutral-light/40 text-brand-burgundy focus:ring-brand-burgundy"
            />
            <span className="text-xs text-neutral-dark">Ingat sesi saya</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group mt-2"
        >
          <span>{isPending ? "Memproses Autentikasi..." : "Masuk ke Akun"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-wine-950/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-dark uppercase tracking-wider">
            Masuk Cepat Demo (1-Click)
          </span>
          <span className="text-[10px] text-neutral-light">Pass: {DEMO_PASSWORD}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "DEMO-01", label: "Mahasiswa", desc: "Non-kader" },
            { id: "DEMO-02", label: "Kader Aktif", desc: "Profil kader" },
            { id: "DEMO-04", label: "Pengelola", desc: "3 Proker" },
            { id: "DEMO-08", label: "Kakom", desc: "Kaderisasi" },
            { id: "DEMO-13", label: "Sekum", desc: "Cross-unit" },
            { id: "DEMO-14", label: "Bendum", desc: "Cross-unit" },
            { id: "DEMO-25", label: "Admin", desc: "Superadmin" },
            { id: "DEMO-27", label: "Pending", desc: "Test AUTH-06" }
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleQuickLogin(chip.id)}
              className="p-2 rounded-xl bg-surface-ivory hover:bg-gold-50 border border-wine-950/10 hover:border-gold-400 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-brand-burgundy group-hover:text-gold-700">
                  {chip.id}
                </span>
              </div>
              <p className="text-xs font-medium text-neutral-black truncate">{chip.label}</p>
              <p className="text-[10px] text-neutral-light truncate">{chip.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-wine-950/10 text-center">
        <p className="text-xs text-neutral-dark">
          Belum memiliki akun mahasiswa?{" "}
          <Link
            href="/daftar"
            className="font-semibold text-brand-burgundy hover:text-brand-darkWine underline underline-offset-2 ml-1"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
