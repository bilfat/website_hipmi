import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DecorativeLines } from "@/components/ui/decorative-lines";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-ivory text-neutral-black relative flex flex-col justify-between overflow-hidden">
      {/* Decorative Lines & Radial Glow */}
      <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-40" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-burgundy-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Brand Link */}
      <header className="relative z-10 p-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
        >
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-sm border border-gold-500/30 bg-surface-ivory flex items-center justify-center">
            <Image
              src="/assets/logo/hipmi.png"
              alt="Logo HIPMI PT Telkom"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm text-wine-950 tracking-wider">
              HIPMI CENTRAL
            </span>
            <span className="text-[10px] text-neutral-dark tracking-widest uppercase font-medium">
              ARTHAKARSA 2026/2027
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-medium text-neutral-dark hover:text-wine-950 flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-wine-950/5 transition-colors border border-transparent hover:border-wine-900/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </header>

      {/* Center Auth Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-xl">
          {children}
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-[11px] text-neutral-light border-t border-wine-950/5">
        <p>
          © 2026 HIPMI PT Universitas Telkom • Kabinet ARTHAKARSA • Platform Pengelolaan Organisasi Terpadu
        </p>
      </footer>
    </div>
  );
}
