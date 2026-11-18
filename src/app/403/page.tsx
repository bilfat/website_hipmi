import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Sparkles } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-surface-ivory flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-50 border border-red-200/80 flex items-center justify-center text-red-700 shadow-inner">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
            HTTP 403 • FORBIDDEN
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 pt-2">
            Akses Ditolak
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Peran atau tingkat izin akun Anda saat ini tidak memiliki otorisasi untuk membuka modul atau halaman ini.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-ivory/80 border border-wine-950/10 text-xs text-neutral-dark text-left space-y-2">
          <p className="font-semibold text-wine-950">Kemungkinan Penyebab:</p>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-dark">
            <li>Akun mahasiswa biasa mencoba mengakses area organisasi atau admin.</li>
            <li>Akun pengurus tidak memiliki permission spesifik yang ditugaskan.</li>
            <li>Akun belum diverifikasi atau sedang dalam penangguhan.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/personal/dashboard"
            className="flex-1 py-2.5 px-4 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Ke Dashboard</span>
          </Link>

          <Link
            href="/__demo"
            className="flex-1 py-2.5 px-4 rounded-xl bg-gold-50 hover:bg-gold-100 text-brand-burgundy border border-gold-400/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-700" />
            <span>Ganti Role Demo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
