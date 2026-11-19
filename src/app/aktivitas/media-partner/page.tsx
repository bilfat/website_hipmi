"use client";

import Link from "next/link";
import Image from "next/image";
import { PublicShell } from "@/components/layout/public-shell";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  Send,
  Users,
  ShieldCheck,
  TrendingUp,
  Clock,
  Radio,
  FileCheck,
  Megaphone,
} from "lucide-react";

export default function MediaPartnerLandingPage() {
  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        
        {/* ==================== 1. EDITORIAL HEADER ==================== */}
        <section className="relative pt-4 sm:pt-6 space-y-4">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50/90 border border-gold-300 text-brand-burgundy text-xs font-mono font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-slow" />
              <span>PUBLIKASI &amp; KEMITRAAN RESMI • ARTHAKARSA</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950 tracking-tight leading-[1.15]">
              Layanan Media Partner &amp; Publikasi
            </h1>
            <p className="text-sm sm:text-base text-neutral-dark leading-relaxed font-sans">
              Dukung publikasi kegiatan organisasi, kompetisi nasional, seminar, maupun produk inovasi Anda melalui kanal resmi HIPMI PT Universitas Telkom yang menjangkau ribuan mahasiswa dan jejaring pengusaha muda.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/aktivitas/media-partner/ajukan"
                className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Ajukan Kerjasama Sekarang</span>
              </Link>

              <Link
                href="/aktivitas/media-partner/cek-status"
                className="px-6 py-3 rounded-full bg-surface-card hover:bg-gold-50 text-wine-950 border border-gold-400 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-2xs"
              >
                <Search className="w-4 h-4 text-brand-burgundy" />
                <span>Cek Status via Kode Tracking</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== 2. SOCIAL PROOF METRICS BAR ==================== */}
        <section className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="block font-serif font-bold text-2xl sm:text-3xl text-brand-burgundy">
                5.000+
              </span>
              <span className="text-xs text-neutral-dark font-sans">Mahasiswa Aktif Terjangkau</span>
            </div>

            <div className="space-y-1">
              <span className="block font-serif font-bold text-2xl sm:text-3xl text-gold-600">
                15+
              </span>
              <span className="text-xs text-neutral-dark font-sans">Ormawa &amp; Komunitas Mitra</span>
            </div>

            <div className="space-y-1">
              <span className="block font-serif font-bold text-2xl sm:text-3xl text-wine-950">
                1x24 Jam
              </span>
              <span className="text-xs text-neutral-dark font-sans">SLA Verifikasi &amp; Review</span>
            </div>

            <div className="space-y-1">
              <span className="block font-serif font-bold text-2xl sm:text-3xl text-emerald-700">
                100%
              </span>
              <span className="text-xs text-neutral-dark font-sans">Tracking Kode Transparan</span>
            </div>
          </div>
        </section>

        {/* ==================== 3. PAKET KERJASAMA GRID ==================== */}
        <section className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Pilihan Kerjasama
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-2">
              Paket Kemitraan Media Partner
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark mt-1 font-sans">
              Pilih opsi yang paling sesuai dengan kebutuhan acara ormawa kampus maupun peluncuran brand komersial Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* Paket 1: Barter Media (Gratis) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold uppercase">
                  Paket Barter Media
                </span>
                
                <div>
                  <h3 className="font-serif font-bold text-2xl text-wine-950">Gratis (Barter)</h3>
                  <p className="text-xs text-neutral-dark mt-1 font-sans">Khusus Ormawa, BEM, Himpunan &amp; UKM Telkom University</p>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-dark pt-3 border-t border-wine-950/10 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Penayangan 1x Instagram Story resmi @hipmitelkom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Pencantuman logo HIPMI Telkom pada poster &amp; virtual background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Barter promosi silang (cross-promote event kampus)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/aktivitas/media-partner/ajukan?package=Gratis"
                className="w-full py-3 rounded-2xl bg-surface-ivory hover:bg-gold-50 text-wine-950 border border-wine-950/15 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Pilih Paket Barter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Paket 2: Premium Komersial (Highlight Terpopuler) */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-surface-card border-2 border-gold-400 shadow-xl ring-2 ring-gold-400/20 flex flex-col justify-between space-y-6 transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-gold-400 text-wine-950 text-[11px] font-mono font-bold uppercase shadow-sm">
                  ★ Paling Populer
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-mono font-bold uppercase">
                  Paket Komersial &amp; Brand
                </span>

                <div>
                  <h3 className="font-serif font-bold text-3xl text-wine-950">Rp 250.000</h3>
                  <p className="text-xs text-neutral-dark mt-1 font-sans">Jangkauan Luas untuk Instansi, Startup &amp; Event Akbar Nasional</p>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-dark pt-3 border-t border-wine-950/10 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Penayangan 2x Feed &amp; 3x Story Instagram @hipmitelkom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Siaran berita &amp; liputan resmi di Portal Web HIPMI CENTRAL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Broadcast pesan ke jaringan komunitas pebisnis muda kampus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>Prioritas review cepat 1x24 jam oleh tim redaksi Medkom</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/aktivitas/media-partner/ajukan?package=Berbayar"
                className="w-full py-3 rounded-2xl bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Pilih Paket Premium</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Paket 3: Liputan Khusus & Press Release */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-mono font-bold uppercase">
                  Paket Liputan Khusus
                </span>

                <div>
                  <h3 className="font-serif font-bold text-2xl text-wine-950">Rp 400.000</h3>
                  <p className="text-xs text-neutral-dark mt-1 font-sans">Paket All-in Press Release, Wawancara, &amp; Dokumentasi</p>
                </div>

                <ul className="space-y-2.5 text-xs text-neutral-dark pt-3 border-t border-wine-950/10 font-sans">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Artikel liputan eksklusif mendalam di laman Warta Organisasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Semua benefit Paket Premium Komersial (Feed + Story)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>Pemasangan banner acara di sidebar publik HIPMI CENTRAL</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/aktivitas/media-partner/ajukan?package=Liputan"
                className="w-full py-3 rounded-2xl bg-surface-ivory hover:bg-gold-50 text-wine-950 border border-wine-950/15 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Pilih Paket Liputan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ==================== 4. ALUR PROSEDUR PENGAJUAN (4 LANGKAH MUDAH) ==================== */}
        <section className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-surface-card border border-wine-950/10 space-y-6 shadow-sm">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Tata Cara Kemitraan
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-wine-950 mt-1">
              Alur Pengajuan Media Partner
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark mt-1 font-sans">
              Proses transparan dan dapat dipantau setiap saat menggunakan kode tracking unik tanpa perlu membuat akun login.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-brand-burgundy text-gold-200 font-bold font-mono text-xs flex items-center justify-center shadow-2xs">
                1
              </span>
              <strong className="block text-wine-950 font-serif text-sm">Isi Formulir Publik</strong>
              <p className="text-neutral-dark text-[11px] leading-relaxed">
                Lengkapi identitas acara, kontak narahubung, tautan Google Drive poster, dan pilih paket.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-brand-burgundy text-gold-200 font-bold font-mono text-xs flex items-center justify-center shadow-2xs">
                2
              </span>
              <strong className="block text-wine-950 font-serif text-sm">Dapatkan Kode Tracking</strong>
              <p className="text-neutral-dark text-[11px] leading-relaxed">
                Simpan tanda terima kode unik (misal: <code className="font-mono text-brand-burgundy">MP-DEMO-0001</code>) untuk pelacakan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-brand-burgundy text-gold-200 font-bold font-mono text-xs flex items-center justify-center shadow-2xs">
                3
              </span>
              <strong className="block text-wine-950 font-serif text-sm">Review &amp; Konfirmasi</strong>
              <p className="text-neutral-dark text-[11px] leading-relaxed">
                Tim redaksi Medkominfo memeriksa kelayakan materi promosi dan penempatan logo dalam 24 jam.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-brand-burgundy text-gold-200 font-bold font-mono text-xs flex items-center justify-center shadow-2xs">
                4
              </span>
              <strong className="block text-wine-950 font-serif text-sm">Publikasi Tayang</strong>
              <p className="text-neutral-dark text-[11px] leading-relaxed">
                Materi promosi dipublikasikan secara terjadwal di Instagram Story/Feed dan portal warta website.
              </p>
            </div>
          </div>
        </section>

      </div>
    </PublicShell>
  );
}
