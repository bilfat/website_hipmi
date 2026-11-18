"use client";

import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { Sparkles, CheckCircle2, ArrowRight, Search, FileText, Send } from "lucide-react";

export default function MediaPartnerLandingPage() {
  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
            Publikasi &amp; Kemitraan
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950">
            Layanan Media Partner Resmi
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
            Dukung publikasi kegiatan organisasi Anda melalui kanal resmi HIPMI PT Universitas Telkom yang menjangkau ribuan mahasiswa dan jejaring wirausaha muda.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/aktivitas/media-partner/ajukan"
              className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-md transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Ajukan Kerjasama Sekarang</span>
            </Link>

            <Link
              href="/aktivitas/media-partner/cek-status"
              className="px-6 py-3 rounded-full bg-surface-card hover:bg-gold-50 text-wine-950 border border-gold-400 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-burgundy" />
              <span>Cek Status via Kode Tracking</span>
            </Link>
          </div>
        </div>

        {/* Paket Kerjasama Grid */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Pilihan Paket
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Paket Kerjasama Media Partner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Paket 1: Barter Media (Gratis) */}
            <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase">
                  Paket Barter Media
                </span>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-wine-950">Gratis (Barter Konten)</h3>
                  <p className="text-xs text-neutral-dark mt-1">Khusus Organisasi Mahasiswa &amp; Komunitas Kampus</p>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-dark pt-2 border-t border-wine-950/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Penayangan 1x Instagram Story @hipmitelkom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pencantuman logo HIPMI Telkom di seluruh media promosi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Barter feed Instagram promosi timbal balik</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/aktivitas/media-partner/ajukan?package=Gratis"
                className="w-full py-3 rounded-xl bg-surface-ivory hover:bg-gold-50 text-wine-950 border border-gold-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Pilih Paket Barter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Paket 2: Premium Berbayar */}
            <div className="p-8 rounded-3xl bg-surface-card border border-gold-500/50 shadow-xl ring-1 ring-gold-500/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-mono font-bold uppercase">
                    Paket Premium Komersial
                  </span>
                  <span className="text-xs font-bold text-brand-burgundy font-mono">POPULER</span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-2xl text-wine-950">Rp250.000</h3>
                  <p className="text-xs text-neutral-dark mt-1">Jangkauan Luas untuk Instansi, Brand &amp; Event Akbar</p>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-dark pt-2 border-t border-wine-950/10">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Penayangan 2x Instagram Feed &amp; Story @hipmitelkom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Siaran berita &amp; liputan resmi di Portal Web HIPMI CENTRAL</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Broadcast pesan ke grup internal kader wirausaha</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Review cepat 1x24 jam oleh tim redaksi Medkom</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/aktivitas/media-partner/ajukan?package=Berbayar"
                className="w-full py-3 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Pilih Paket Premium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Alur Prosedur Pengajuan */}
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 space-y-6">
          <div>
            <h2 className="font-serif font-bold text-xl text-wine-950">
              Alur Pengajuan Media Partner
            </h2>
            <p className="text-xs text-neutral-dark mt-1">
              Proses transparan dan dapat dipantau setiap saat menggunakan kode tracking unik tanpa perlu membuat akun login.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-gold-500 text-wine-950 font-bold font-mono text-xs flex items-center justify-center">1</span>
              <strong className="block text-wine-950">Isi Formulir Publik</strong>
              <p className="text-neutral-dark text-[11px]">Masukkan identitas acara, tautan poster, dan pilih paket kemitraan.</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-gold-500 text-wine-950 font-bold font-mono text-xs flex items-center justify-center">2</span>
              <strong className="block text-wine-950">Dapatkan Kode Tracking</strong>
              <p className="text-neutral-dark text-[11px]">Simpan kode unik (contoh: MP-DEMO-0001) pada lembar tanda terima.</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-gold-500 text-wine-950 font-bold font-mono text-xs flex items-center justify-center">3</span>
              <strong className="block text-wine-950">Review &amp; Konfirmasi</strong>
              <p className="text-neutral-dark text-[11px]">Tim Medkom memeriksa materi dan kelayakan logo.</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-1.5">
              <span className="w-6 h-6 rounded-full bg-gold-500 text-wine-950 font-bold font-mono text-xs flex items-center justify-center">4</span>
              <strong className="block text-wine-950">Publikasi Tayang</strong>
              <p className="text-neutral-dark text-[11px]">Materi dipublikasikan manual oleh operator sesuai tanggal tayang.</p>
            </div>
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
