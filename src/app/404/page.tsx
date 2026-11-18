import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-ivory flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
        <div className="w-36 h-36 mx-auto relative rounded-3xl overflow-hidden flex items-center justify-center">
          <Image
            src="/assets/aessets_information/02-not-found.png"
            alt="Halaman Tidak Ditemukan"
            width={140}
            height={140}
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
            HTTP 404 • NOT FOUND
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 pt-2">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Halaman yang Anda tuju mungkin telah dipindahkan, dinonaktifkan, atau tautan yang Anda masukkan salah.
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
            <span>Daftar Rute Demo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
