"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  ShieldCheck,
  Sparkles,
  ArrowUp,
  Clock
} from "lucide-react";

// ==================== OFFICIAL SOCIAL MEDIA ICONS (SVG) ====================

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.34 22a6.34 6.34 0 006.33-6.32V8.9a8.16 8.16 0 004.92 1.63v-3.45a4.85 4.85 0 01-1-.39z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function LineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

// 5 Official Social Media Channels
const SOCIAL_MEDIA = [
  {
    name: "Instagram",
    handle: "@hipmitelkom",
    href: "https://instagram.com/hipmitelkom",
    label: "Akun Resmi Instagram",
    icon: InstagramIcon,
    badgeBg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    cardHover: "hover:border-pink-400/80 hover:bg-wine-900/90",
  },
  {
    name: "WhatsApp",
    handle: "0812-0000-0026",
    href: "https://wa.me/6281200000026",
    label: "Hotline Sekretariat",
    icon: WhatsAppIcon,
    badgeBg: "bg-[#25D366]",
    cardHover: "hover:border-emerald-400/80 hover:bg-wine-900/90",
  },
  {
    name: "TikTok",
    handle: "@hipmitelkom",
    href: "https://tiktok.com/@hipmitelkom",
    label: "Video & Kreatif",
    icon: TikTokIcon,
    badgeBg: "bg-neutral-900 border border-neutral-700",
    cardHover: "hover:border-neutral-300 hover:bg-wine-900/90",
  },
  {
    name: "LinkedIn",
    handle: "HIPMI PT Telkom",
    href: "https://linkedin.com/company/hipmitelkom",
    label: "Jejaring Profesional",
    icon: LinkedInIcon,
    badgeBg: "bg-[#0A66C2]",
    cardHover: "hover:border-sky-400/80 hover:bg-wine-900/90",
  },
  {
    name: "LINE",
    handle: "@hipmitelkom",
    href: "https://line.me/R/ti/p/@hipmitelkom",
    label: "Official Account",
    icon: LineIcon,
    badgeBg: "bg-[#06C755]",
    cardHover: "hover:border-emerald-400/80 hover:bg-wine-900/90",
  },
];

export function PublicFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-brand-burgundy text-white rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[52px] border-t-2 border-gold-400/40 shadow-[0_-16px_40px_rgba(45,10,15,0.16)] overflow-hidden">
      {/* Top Center Gold Accent Glow Bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 sm:w-72 h-1 bg-gradient-to-r from-transparent via-gold-400/90 to-transparent rounded-full shadow-[0_0_16px_rgba(232,181,119,0.8)]" />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-wine-950/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 relative z-10 space-y-10">
        
        {/* ==================== 1. PRE-FOOTER: SOCIAL MEDIA & CHANNELS HUB ==================== */}
        <div className="pb-8 border-b border-gold-400/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/35 text-gold-300 text-[11px] font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Kanal Resmi &amp; Jejaring Media</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Terhubung dengan <span className="text-gold-200">HIPMI PT Telkom University</span>
              </h3>
              <p className="text-xs text-white/75 font-sans">
                Ikuti perkembangan warta, agenda seminar, info kaderisasi, serta kolaborasi bisnis terkini.
              </p>
            </div>

            {/* Quick Slogan Badge */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-wine-950/60 border border-gold-400/25 text-xs text-gold-200 font-serif italic">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>&ldquo;Pengusaha Pejuang • Pejuang Pengusaha&rdquo;</span>
            </div>
          </div>

          {/* 5 Social Media Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {SOCIAL_MEDIA.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-wine-950/70 border border-gold-400/30 ${item.cardHover} transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg last:col-span-2 sm:last:col-span-1`}
                title={`${item.name} HIPMI PT Telkom (${item.handle})`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${item.badgeBg} flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-gold-100 group-hover:text-gold-200 transition-colors">
                      {item.name}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-gold-300/60 group-hover:text-gold-200 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <span className="text-[10px] font-mono text-white/70 group-hover:text-white truncate block">
                    {item.handle}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ==================== 2. MAIN NAVIGATION & DIRECTORY GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-gold-400/20">
          
          {/* Col 1 (Span 4): Brand Identity & Secretariat */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-2xl overflow-hidden shadow-lg border border-gold-400/60 bg-white p-1.5 flex items-center justify-center shrink-0">
                <Image
                  src="/assets/assets_logo/logo_hipmi.png"
                  alt="Logo HIPMI Telkom"
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gold-200 tracking-wider">
                  HIPMI CENTRAL
                </h3>
                <p className="text-[10px] sm:text-[11px] text-white/80 font-medium tracking-widest uppercase">
                  HIPMI PT UNIVERSITAS TELKOM • ARTHAKARSA
                </p>
              </div>
            </div>

            <p className="text-xs text-white/85 leading-relaxed pr-2 text-pretty">
              Episentrum pembinaan kader pengusaha muda Telkom University. Mengintegrasikan layanan publik, tata kelola organisasi, direktori program kerja, dan etalase karya bisnis kader.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-white/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                <span className="leading-snug">Gedung Student Center Lt. 2, Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung 40257</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-300 shrink-0" />
                <span className="font-mono text-gold-100">sekretariat@hipmi-telu.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-300 shrink-0" />
                <span className="font-mono text-gold-100">0812-0000-0026 (Sekretariat Resmi)</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-white/70">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Pelayanan: Senin – Jumat (09.00 – 17.00 WIB)</span>
              </div>
            </div>
          </div>

          {/* Col 2 (Span 2): Struktur & Profil */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1.5 border-b border-gold-400/25">
              Struktur &amp; Profil
            </h4>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li>
                <Link href="/" className="hover:text-gold-200 transition-colors inline-block">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-gold-200 transition-colors inline-block">
                  Tentang Kami &amp; Sejarah
                </Link>
              </li>
              <li>
                <Link href="/organisasi/kabinet" className="hover:text-gold-200 transition-colors inline-block">
                  Kabinet ARTHAKARSA
                </Link>
              </li>
              <li>
                <Link href="/organisasi/bidang" className="hover:text-gold-200 transition-colors inline-block">
                  4 Bidang Kepengurusan
                </Link>
              </li>
              <li>
                <Link href="/organisasi/kompartemen" className="hover:text-gold-200 transition-colors inline-block">
                  8 Kompartemen Kerja
                </Link>
              </li>
              <li>
                <Link href="/organisasi/program-kerja" className="hover:text-gold-200 transition-colors inline-block">
                  Direktori Program Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 (Span 3): Layanan Publik & Interaksi */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1.5 border-b border-gold-400/25">
              Layanan &amp; Interaksi
            </h4>
            <ul className="space-y-2 text-xs text-white/85">
              <li>
                <Link href="/aktivitas/agenda" className="hover:text-gold-200 transition-colors inline-block">
                  Agenda &amp; Beli E-Tiket
                </Link>
              </li>
              <li>
                <Link href="/aktivitas/agenda/cek-tiket" className="hover:text-gold-200 transition-colors inline-block">
                  Cek Status E-Tiket (NIM)
                </Link>
              </li>
              <li>
                <Link href="/aktivitas/berita" className="hover:text-gold-200 transition-colors inline-block">
                  Portal Berita &amp; Artikel
                </Link>
              </li>
              <li>
                <Link href="/aktivitas/media-partner" className="hover:text-gold-200 transition-colors inline-block">
                  Layanan Media Partner
                </Link>
              </li>
              <li>
                <Link href="/aktivitas/media-partner/cek-status" className="hover:text-gold-200 transition-colors inline-block">
                  Cek Status Pengajuan Medpart
                </Link>
              </li>
              <li>
                <Link href="/karya-kader/bisnis" className="hover:text-gold-200 transition-colors inline-block">
                  Etalase Bisnis Kader
                </Link>
              </li>
              <li>
                <Link href="/karya-kader/prestasi" className="hover:text-gold-200 transition-colors inline-block">
                  Galeri Prestasi Kader
                </Link>
              </li>
              <li>
                <Link href="/kotak-suara" className="hover:text-gold-200 transition-colors inline-block">
                  Kotak Suara Aspirasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 (Span 3): Area Akun & Demo */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1.5 border-b border-gold-400/25">
              Area Akun &amp; Demo
            </h4>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li>
                <Link href="/masuk" className="hover:text-gold-200 transition-colors flex items-center gap-1">
                  <span>Masuk Akun Anggota</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-300" />
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-gold-200 transition-colors">
                  Daftar Akun Baru
                </Link>
              </li>
              <li>
                <Link href="/personal/dashboard" className="hover:text-gold-200 transition-colors">
                  Dasbor Anggota Pribadi
                </Link>
              </li>
              <li>
                <Link href="/organization/dashboard" className="hover:text-gold-200 transition-colors">
                  Area Tata Kelola Organisasi
                </Link>
              </li>
              <li>
                <Link href="/admin/cabinets" className="hover:text-gold-200 transition-colors">
                  Pusat Kabinet (Pengelola Sistem)
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/__demo"
                  className="px-3.5 py-2 rounded-xl bg-gold-400/20 text-gold-200 hover:bg-gold-400/30 border border-gold-400/50 inline-flex items-center gap-1.5 font-medium transition-colors text-xs shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                  <span>Pengalih Peran Demo (28 Akun)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ==================== 3. BOTTOM BAR ==================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/85">
          <p className="text-center sm:text-left">
            © 2026 HIPMI PT Universitas Telkom • Kabinet ARTHAKARSA. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulasi Frontend Interaktif</span>
            </span>

            <span>•</span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-wine-950/80 hover:bg-gold-400/20 text-gold-300 hover:text-gold-100 border border-gold-400/30 transition-colors text-[11px] font-medium"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Kembali ke Atas</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
