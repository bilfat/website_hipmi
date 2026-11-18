"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Search, ShieldCheck, KeyRound, Sparkles } from "lucide-react";

export default function CheckTicketLookupPage() {
  const router = useRouter();
  const { store } = useMockStore();

  const [nim, setNim] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Suggested demo NIMs that have tickets in seed data
  const demoNims = [
    { label: "Bintang Al-Fath (Ketum)", nim: "1301213001" },
    { label: "Siti Rahmawati (Sekum)", nim: "1301213002" },
    { label: "Andi Wijaya (Bendum)", nim: "1201210045" },
    { label: "Rizky Pratama (Kader)", nim: "1101210101" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!nim.trim()) {
      setErrorMsg("Harap masukkan Nomor Induk Mahasiswa (NIM).");
      return;
    }

    setIsSubmitting(true);
    // Neutral privacy-preserving behavior: without revealing whether tickets exist,
    // proceed to OTP verification step
    setTimeout(() => {
      router.push(`/aktivitas/agenda/cek-tiket/verifikasi?nim=${encodeURIComponent(nim.trim())}`);
    }, 400);
  };

  return (
    <PublicShell>
      <div className="max-w-xl mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/aktivitas/agenda"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Agenda</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-05
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Langkah 1 dari 3
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Cek Status & Unduh E-Tiket
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark max-w-md mx-auto">
            Masukkan Nomor Induk Mahasiswa (NIM) Telkom University yang Anda gunakan saat mendaftar agenda HIPMI.
          </p>
        </div>

        {/* Privacy Info Alert */}
        <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm flex items-start gap-3 text-xs text-neutral-dark">
          <ShieldCheck className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Perlindungan Privasi:</strong> Untuk menjaga kerahasiaan kepemilikan tiket, sistem akan meminta verifikasi kode OTP 6-digit yang dikirimkan ke email terdaftar sebelum menampilkan tiket Anda.
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Nomor Induk Mahasiswa (NIM)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Contoh: 1301213001"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-mono tracking-wider"
                />
                <Search className="w-5 h-5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isSubmitting ? "Mengirimkan Kode..." : "Minta Kode OTP Verifikasi"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Demo Fast Fill Presets */}
        <div className="p-5 rounded-2xl bg-gold-400/10 border border-gold-400/25 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
            <span className="text-xs font-bold text-wine-950">
              Preset Akun Demo untuk Uji Tiket
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {demoNims.map((item) => (
              <button
                key={item.nim}
                type="button"
                onClick={() => setNim(item.nim)}
                className="p-2.5 rounded-xl bg-white border border-gold-400/30 text-left hover:bg-gold-50 transition-colors text-xs space-y-0.5"
              >
                <span className="font-semibold text-wine-950 block">{item.label}</span>
                <span className="font-mono text-[11px] text-brand-burgundy">{item.nim}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
