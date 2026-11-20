"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
  addAuditEvent,
  setCurrentUserId,
} from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  KeyRound,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Laptop,
  Bell,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function AccountSettingsPage() {
  const router = useRouter();
  const { currentUser } = useMockStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifInApp, setNotifInApp] = useState(true);
  const [notifEvent, setNotifEvent] = useState(true);

  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const passwordStrength =
    newPassword.length === 0
      ? 0
      : newPassword.length < 8
      ? 1
      : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
      ? 3
      : 2;

  const strengthLabels = ["", "Lemah (minimal 8 karakter)", "Cukup Kuat", "Sangat Kuat"];
  const strengthColors = ["", "bg-red-500", "bg-amber-500", "bg-emerald-600"];

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
      mutateStore(() => {
        addActivityHistory(
          currentUser.name,
          "memperbarui kata sandi akun",
          `Akun ${currentUser.demo_id}`,
          "Pengaturan Akun"
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
      setFeedback("Kata sandi akun berhasil diperbarui dengan aman.");
    }, 350);
  };

  const handleConfirmLogout = () => {
    setLogoutModalOpen(false);
    setCurrentUserId("usr-demo-01");
    router.push("/masuk");
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
          Keamanan &amp; Preferensi
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
          Pengaturan Akun
        </h1>
        <p className="text-xs text-neutral-dark">
          Kelola kata sandi, preferensi pemberitahuan, autentikasi dua langkah, dan sesi login Anda.
        </p>
      </div>

      {/* Feedback Alerts */}
      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline shrink-0"
          >
            Tutup
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Password + Notification Preferences */}
        <div className="lg:col-span-7 space-y-6">
          {/* Change Password Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E9E1DC]">
              <div className="w-9 h-9 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950">
                  Ubah Kata Sandi
                </h2>
                <p className="text-[11px] text-neutral-dark">
                  Gunakan kombinasi huruf besar, huruf kecil, dan angka minimal 8 karakter.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  Kata Sandi Saat Ini
                </label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Masukkan kata sandi saat ini"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-light hover:text-brand-burgundy"
                    aria-label="Tampilkan atau sembunyikan kata sandi"
                  >
                    {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">Kata Sandi Baru</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-light hover:text-brand-burgundy"
                    aria-label="Tampilkan atau sembunyikan kata sandi baru"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {newPassword.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full transition-colors ${
                            passwordStrength >= step
                              ? strengthColors[passwordStrength]
                              : "bg-[#E9E1DC]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-dark block">
                      Kekuatan: <strong>{strengthLabels[passwordStrength]}</strong>
                    </span>
                  </div>
                )}
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs sm:text-sm text-wine-950"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isChangingPass ? "Menyimpan..." : "Perbarui Kata Sandi"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences Card (per front_end.md line 2866) */}
          <div className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E9E1DC]">
              <div className="w-9 h-9 rounded-xl bg-[#E8B577]/20 text-[#8A5A2B] flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base sm:text-lg font-bold text-wine-950">
                  Preferensi Notifikasi
                </h2>
                <p className="text-[11px] text-neutral-dark">
                  Atur saluran pemberitahuan untuk pembaruan akun dan kegiatan Anda.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Pemberitahuan di Aplikasi (Lonceng Topbar)",
                  desc: "Tampilkan notifikasi langsung di kotak masuk Personal Area.",
                  checked: notifInApp,
                  toggle: () => setNotifInApp(!notifInApp),
                },
                {
                  title: "Notifikasi Email untuk Perubahan Penting",
                  desc: "Kirim ringkasan tiket, verifikasi pembayaran, dan status keanggotaan via email.",
                  checked: notifEmail,
                  toggle: () => setNotifEmail(!notifEmail),
                },
                {
                  title: "Pengingat Jadwal Agenda & Kegiatan",
                  desc: "Dapatkan pengingat H-1 sebelum kegiatan yang Anda daftarkan dimulai.",
                  checked: notifEvent,
                  toggle: () => setNotifEvent(!notifEvent),
                },
              ].map((pref) => (
                <div
                  key={pref.title}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <strong className="text-xs text-wine-950 block">{pref.title}</strong>
                    <span className="text-[11px] text-neutral-dark block">{pref.desc}</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={pref.checked}
                    onClick={() => {
                      pref.toggle();
                      setFeedback("Preferensi notifikasi berhasil diperbarui.");
                    }}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 shrink-0 ${
                      pref.checked ? "bg-brand-burgundy" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        pref.checked ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): 2FA + Active Sessions + Logout */}
        <div className="lg:col-span-5 space-y-6">
          {/* 2FA Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-burgundy" />
                <h3 className="font-serif text-base font-bold text-wine-950">
                  Verifikasi 2-Langkah
                </h3>
              </div>
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  twoFactorEnabled
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-neutral-100 text-neutral-600 border-neutral-200"
                }`}
              >
                {twoFactorEnabled ? "Aktif" : "Nonaktif"}
              </span>
            </div>

            <p className="text-xs text-neutral-dark leading-relaxed">
              Tambahkan lapisan perlindungan ekstra dengan kode OTP ke email{" "}
              <strong className="text-wine-950">{currentUser.email}</strong> setiap kali masuk dari perangkat baru.
            </p>

            <button
              type="button"
              onClick={() => {
                setTwoFactorEnabled(!twoFactorEnabled);
                setFeedback(
                  !twoFactorEnabled
                    ? "Verifikasi 2-Langkah berhasil diaktifkan."
                    : "Verifikasi 2-Langkah dinonaktifkan."
                );
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 transition-colors"
            >
              {twoFactorEnabled ? "Nonaktifkan Verifikasi 2-Langkah" : "Aktifkan Verifikasi 2-Langkah"}
            </button>
          </div>

          {/* Active Sessions & Logout */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E9E1DC]">
              <Laptop className="w-4 h-4 text-[#AF7D66]" />
              <h3 className="font-serif text-base font-bold text-wine-950">Sesi Perangkat Aktif</h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-wine-950">Perangkat Saat Ini</strong>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Aktif
                </span>
              </div>
              <p className="text-[11px] text-neutral-dark flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sesi terenkripsi • Bandung, Indonesia</span>
              </p>
            </div>

            <div className="pt-2 border-t border-[#E9E1DC]">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(true)}
                className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50/40 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar dari Akun (Logout)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Logout Modal */}
      <EditorialModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        badge="Konfirmasi Sesi"
        title="Keluar dari HIPMI Central?"
        subtitle="Anda perlu masuk kembali menggunakan email dan kata sandi untuk mengakses Personal Area."
        maxWidth="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6]"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirmLogout}
              className="px-5 py-2 rounded-full bg-red-700 hover:bg-red-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Ya, Keluar</span>
            </button>
          </>
        }
      >
        <p className="text-xs text-neutral-dark leading-relaxed">
          Anda sedang masuk sebagai <strong className="text-wine-950">{currentUser.name}</strong> (
          <span className="font-mono">{currentUser.email}</span>). Pastikan seluruh perubahan data Anda telah tersimpan sebelum keluar.
        </p>
      </EditorialModal>
    </div>
  );
}
