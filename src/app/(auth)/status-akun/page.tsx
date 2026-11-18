"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import { ShieldAlert, Clock, AlertTriangle, ArrowRight, RotateCw, CheckCircle2, LogOut } from "lucide-react";

function AccountStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") || "verification_pending";
  const userIdParam = searchParams.get("userId");

  const { store, saveStore } = useMockStore();

  const user = userIdParam
    ? store.users.find((u) => u.id === userIdParam)
    : store.users.find((u) => u.id === store.current_user_id);

  const handleDemoActivate = () => {
    if (!user) return;
    user.account_status = "active";
    addActivityHistory(
      user.name,
      "mengaktifkan akun lewat demo bypass",
      user.email,
      "Admin Simulasi"
    );
    saveStore(store);
    router.push("/masuk?verified=true");
  };

  const isSuspended = statusParam === "suspended" || user?.account_status === "suspended";
  const isPending = statusParam === "verification_pending" || user?.account_status === "verification_pending";

  return (
    <div className="bg-surface-card border border-wine-950/10 rounded-3xl p-6 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Icon Badge */}
      <div className="mb-6 flex items-center justify-center sm:justify-start">
        {isSuspended ? (
          <div className="w-14 h-14 rounded-2xl bg-red-100 border border-red-200 text-red-700 flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-7 h-7" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shadow-inner">
            <Clock className="w-7 h-7" />
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-2 mb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
          {isSuspended ? "Akun Ditangguhkan" : "Verifikasi Akun Diperlukan"}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
          {isSuspended
            ? "Akun Anda dinonaktifkan sementara oleh Administrator Sistem HIPMI PT Universitas Telkom. Seluruh akses menu Personal, Organisasi, dan Workspace dibatasi."
            : "Akun Anda belum menyelesaikan tahapan verifikasi alamat email kampus atau menunggu persetujuan verifikasi administratif."}
        </p>
      </div>

      {/* Account Details Box */}
      {user && (
        <div className="p-4 rounded-2xl bg-surface-ivory/90 border border-wine-950/10 space-y-2 text-xs text-neutral-dark mb-6">
          <div className="flex justify-between">
            <span className="text-neutral-light">Nama Akun:</span>
            <strong className="text-neutral-black">{user.name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-light">Email:</span>
            <span className="font-mono text-neutral-black">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-light">ID Simulasi:</span>
            <span className="font-mono text-brand-burgundy font-bold">{user.demo_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-light">Status Saat Ini:</span>
            <span
              className={`px-2 py-0.5 rounded font-mono uppercase text-[10px] font-bold ${
                isSuspended
                  ? "bg-red-100 text-red-800 border border-red-300"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }`}
            >
              {user.account_status}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {isPending && (
          <>
            <Link
              href={`/verifikasi-email?email=${encodeURIComponent(user?.email || "")}`}
              className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Masukkan Kode OTP Email</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Demo Override Bypass */}
            <button
              type="button"
              onClick={handleDemoActivate}
              className="w-full py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 text-gold-900 border border-gold-500/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-700" />
              <span>[Demo Tool] Aktifkan Akun Ini Seketika</span>
            </button>
          </>
        )}

        {isSuspended && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-900 leading-relaxed">
            <p className="font-semibold mb-1">Hubungi Administrator Organisasi:</p>
            <p>
              Email: <code className="font-bold">admin.central@hipmi-telu.org</code> | WhatsApp Helpdesk: <code className="font-bold">0812-0000-0025</code>
            </p>
          </div>
        )}

        <Link
          href="/masuk"
          className="w-full py-2.5 rounded-xl bg-surface-ivory hover:bg-neutral-light/20 text-neutral-black border border-wine-950/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5 text-neutral-light" />
          <span>Ganti Akun Demo Lain</span>
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-wine-950/10 text-center">
        <Link
          href="/"
          className="text-xs text-neutral-dark hover:text-brand-burgundy underline underline-offset-2 transition-colors"
        >
          Kembali ke Halaman Beranda Utama
        </Link>
      </div>
    </div>
  );
}

export default function AccountStatusPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
      <AccountStatusContent />
    </Suspense>
  );
}
