import Image from "next/image";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-surface-ivory flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
        <div className="w-36 h-36 mx-auto relative rounded-3xl overflow-hidden flex items-center justify-center">
          <Image
            src="/assets/aessets_information/01-error.png"
            alt="Terjadi Kesalahan Sistem"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
            HTTP 500 • INTERNAL ERROR
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 pt-2">
            Terjadi Kendala Sistem
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Terjadi gangguan teknis sementara pada simulasi server. Demi keamanan dan integritas platform, rincian teknis mendalam tidak ditampilkan ke publik.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left">
          <p className="font-semibold mb-1">Catatan Simulasi Demo:</p>
          <p className="text-[11px] leading-relaxed">
            Jika data browser Anda mengalami konflik state lokal, Anda dapat menggunakan tombol reset state pabrik pada Demo Control Center.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 py-2.5 px-4 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/__demo"
            className="flex-1 py-2.5 px-4 rounded-xl bg-surface-ivory hover:bg-neutral-light/20 text-neutral-black border border-wine-950/10 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-dark" />
            <span>Panel Pemulihan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
