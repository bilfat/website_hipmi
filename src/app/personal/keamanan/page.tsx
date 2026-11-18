"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import {
  Shield,
  KeyRound,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Laptop,
  Check
} from "lucide-react";

export default function AccountSecurityPage() {
  const router = useRouter();
  const { store, currentUser } = useMockStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setFeedback(null);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Mohon lengkapi seluruh kolom kata sandi.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("Kata sandi baru minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok dengan kata sandi baru.");
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      mutateStore((draft) => {
        addActivityHistory(
          currentUser.name,
          "memperbarui kata sandi akun",
          `Akun ${currentUser.demo_id}`,
          "Keamanan Akun"
        );
        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "CHANGE_PASSWORD",
          "UserSecurity",
          currentUser.id
        );
      });

      setIsChangingPass(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFeedback("Kata sandi berhasil diperbarui dengan aman!");
    }, 500);
  };

  const handleLogout = () => {
    router.push("/masuk");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          Pengaturan Keamanan & Kredensial
        </h1>
        <p className="text-xs text-neutral-dark">
          Kelola kata sandi akun, autentikasi dua langkah, dan pantau sesi perangkat aktif.
        </p>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Change Password (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-wine-950/10">
              <KeyRound className="w-5 h-5 text-brand-burgundy" />
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Ubah Kata Sandi
              </h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  Kata Sandi Saat Ini
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isChangingPass ? "Menyimpan..." : "Perbarui Kata Sandi"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: 2FA & Active Sessions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Two-Factor Authentication */}
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-wine-950/10">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-burgundy" />
                <h3 className="font-serif text-base font-bold text-wine-950">
                  Autentikasi 2-Langkah
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  twoFactorEnabled
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-neutral-200 text-neutral-700"
                }`}
              >
                {twoFactorEnabled ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-neutral-dark leading-relaxed">
              Verifikasi login tambahan dengan kode OTP yang dikirimkan ke email terdaftar untuk mengamankan hak akses organisasi Anda.
            </p>

            <button
              type="button"
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="px-4 py-2 rounded-xl bg-surface-ivory border border-wine-950/15 hover:bg-wine-950/5 text-xs font-semibold text-wine-950 transition-colors w-full text-center"
            >
              {twoFactorEnabled ? "Nonaktifkan 2FA" : "Aktifkan 2FA (Rekomendasi)"}
            </button>
          </div>

          {/* Active Sessions */}
          <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-wine-950/10 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-gold-600" />
              <span>Sesi Perangkat Aktif</span>
            </h3>

            <div className="p-3.5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-wine-950">Google Chrome / Windows 11</strong>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Sesi Ini
                </span>
              </div>
              <p className="text-[11px] text-neutral-light font-mono">
                IP: 182.253.112.45 • Bandung, Indonesia
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar dari Akun (Logout)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
