"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMockStore, setCurrentUserId } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Ticket, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export function PublicNavbar() {
  const pathname = usePathname();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  return (
    <nav aria-label="Navigasi Utama" className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-7xl">
      <div className="glass-navbar rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xl border border-white/60 transition-all duration-300">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 relative rounded-xl overflow-hidden shadow-sm border border-gold-400/40 bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/assets/assets_logo/logo_hipmi.png"
              alt="Logo HIPMI PT Telkom"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xs sm:text-sm text-wine-950 tracking-wider">
              HIPMI CENTRAL
            </span>
            <span className="text-[9px] text-neutral-dark tracking-widest uppercase font-semibold">
              ARTHAKARSA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* 1. Beranda */}
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === "/"
                ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
            }`}
          >
            Beranda
          </Link>

          {/* 2. Tentang Kami */}
          <Link
            href="/tentang-kami"
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname.startsWith("/tentang-kami")
                ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
            }`}
          >
            Tentang Kami
          </Link>

          {/* 3. Organisasi (Mega Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("organisasi")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                pathname.startsWith("/organisasi")
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
              }`}
            >
              <span>Organisasi</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mega Dropdown Organisasi */}
            {activeDropdown === "organisasi" && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1.5">
                {[
                  {
                    title: "Kabinet Aktif",
                    desc: "Struktur kepengurusan & arsip",
                    href: "/organisasi/kabinet",
                    img: "/assets/assest_navbar_dropdown/01-kabinet.png"
                  },
                  {
                    title: "Bidang Organisasi",
                    desc: "4 pilar bidang pembinaan",
                    href: "/organisasi/bidang",
                    img: "/assets/assest_navbar_dropdown/02-bidang.png"
                  },
                  {
                    title: "Kompartemen",
                    desc: "8 unit spesialis pelaksana",
                    href: "/organisasi/kompartemen",
                    img: "/assets/assest_navbar_dropdown/01-kompartemen.png"
                  },
                  {
                    title: "Program Kerja",
                    desc: "Direktori agenda proker",
                    href: "/organisasi/program-kerja",
                    img: "/assets/assest_navbar_dropdown/02-program-kerja.png"
                  }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2 rounded-xl bg-white/50 hover:bg-gold-50/80 border border-gold-500/15 hover:border-gold-400/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden bg-surface-ivory/60 flex items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-wine-950 group-hover:text-brand-burgundy transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-dark truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 4. Aktivitas (Mega Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("aktivitas")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                pathname.startsWith("/aktivitas")
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
              }`}
            >
              <span>Aktivitas</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mega Dropdown Aktivitas */}
            {activeDropdown === "aktivitas" && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1.5">
                {[
                  {
                    title: "Agenda & Tiket",
                    desc: "Event, workshop & e-tiket",
                    href: "/aktivitas/agenda",
                    img: "/assets/assest_navbar_dropdown/05-agenda-tiket.png"
                  },
                  {
                    title: "Berita & Artikel",
                    desc: "Kabar ormawa & edukasi bisnis",
                    href: "/aktivitas/berita",
                    img: "/assets/assest_navbar_dropdown/06-berita.png"
                  },
                  {
                    title: "Media Partner",
                    desc: "Kerjasama promosi acara",
                    href: "/aktivitas/media-partner",
                    img: "/assets/assest_navbar_dropdown/07-media-partner.png"
                  }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2 rounded-xl bg-white/50 hover:bg-gold-50/80 border border-gold-500/15 hover:border-gold-400/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden bg-surface-ivory/60 flex items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-wine-950 group-hover:text-brand-burgundy transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-dark truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 5. Karya Kader (Mega Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("karya")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
                pathname.startsWith("/karya-kader")
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
              }`}
            >
              <span>Karya Kader</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mega Dropdown Karya */}
            {activeDropdown === "karya" && (
              <div className="absolute top-full left-0 mt-2 w-72 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col gap-1.5">
                {[
                  {
                    title: "Bisnis Kader",
                    desc: "Produk & jasa wirausaha",
                    href: "/karya-kader/bisnis",
                    img: "/assets/assest_navbar_dropdown/03-bisnis-kader.png"
                  },
                  {
                    title: "Prestasi Kader",
                    desc: "Rekam jejak juara & karya",
                    href: "/karya-kader/prestasi",
                    img: "/assets/assest_navbar_dropdown/04-prestasi-kader.png"
                  }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2 rounded-xl bg-white/50 hover:bg-gold-50/80 border border-gold-500/15 hover:border-gold-400/40 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 relative flex-shrink-0 rounded-lg overflow-hidden bg-surface-ivory/60 flex items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-wine-950 group-hover:text-brand-burgundy transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-dark truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 6. Kotak Suara */}
          <Link
            href="/kotak-suara"
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === "/kotak-suara"
                ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                : "text-neutral-black hover:text-brand-burgundy hover:bg-wine-950/5"
            }`}
          >
            Kotak Suara
          </Link>
        </div>

        {/* Right Section: Cek Tiket Shortcut + User Session / Auth */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Cek Tiket Shortcut */}
          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-brand-burgundy hover:text-brand-darkWine bg-gold-50/90 hover:bg-gold-100 border border-gold-400/40 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5 text-gold-700" />
            <span>Cek Tiket</span>
          </Link>

          {/* User Session Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-ivory/90 hover:bg-white border border-wine-950/15 text-xs text-wine-950 transition-all shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-brand-burgundy text-gold-300 font-bold text-[10px] flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <span className="font-medium max-w-[100px] truncate">{currentUser.name}</span>
              <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-gold-500/20 text-gold-800 font-bold">
                {currentUser.demo_id}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-dark" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="px-3 py-2 border-b border-wine-950/10 mb-1">
                  <p className="text-xs font-bold text-wine-950 truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-neutral-dark truncate">{currentUser.email}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-wine-900 text-gold-200 capitalize font-medium">
                      {currentUser.base_role.replace("_", " ")}
                    </span>
                    {currentUser.cadre_status === "verified" && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                        Kader Aktif
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href="/personal/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Personal Dashboard</span>
                </Link>

                {permissions.canAccessOrganization && (
                  <Link
                    href="/organization/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Organization Area</span>
                  </Link>
                )}

                {permissions.canAccessAdmin && (
                  <Link
                    href="/admin/cabinets"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
                    <span>Admin Panel (ADM-01)</span>
                  </Link>
                )}

                <Link
                  href="/__demo"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  <span>Demo Switcher Panel</span>
                </Link>

                <div className="border-t border-wine-950/10 my-1 pt-1">
                  <button
                    onClick={() => {
                      setCurrentUserId("usr-demo-01");
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar (Reset ke Mahasiswa)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/aktivitas/agenda/cek-tiket"
            className="p-2 rounded-full bg-gold-50 border border-gold-400/40 text-brand-burgundy"
          >
            <Ticket className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-wine-950/10 text-wine-950 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl glass-dropdown shadow-2xl border border-white/70 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
          {/* User profile row */}
          <div className="p-3 rounded-2xl bg-white/70 border border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-burgundy text-gold-300 font-bold text-xs flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-wine-950">{currentUser.name}</p>
                <p className="text-[10px] text-neutral-dark font-mono">{currentUser.demo_id} • {currentUser.base_role}</p>
              </div>
            </div>
            <Link
              href="/personal/dashboard"
              className="px-2.5 py-1 rounded-xl bg-brand-burgundy text-white text-[11px] font-medium"
            >
              Dashboard
            </Link>
          </div>

          {/* Links list */}
          <div className="space-y-1 text-xs font-medium text-neutral-black">
            <Link href="/" className="block p-2.5 rounded-xl hover:bg-gold-50">Beranda</Link>
            <Link href="/tentang-kami" className="block p-2.5 rounded-xl hover:bg-gold-50">Tentang Kami</Link>
            <Link href="/organisasi/kabinet" className="block p-2.5 rounded-xl hover:bg-gold-50">Struktur Kabinet</Link>
            <Link href="/organisasi/bidang" className="block p-2.5 rounded-xl hover:bg-gold-50">Bidang &amp; Kompartemen</Link>
            <Link href="/organisasi/program-kerja" className="block p-2.5 rounded-xl hover:bg-gold-50">Program Kerja</Link>
            <Link href="/aktivitas/agenda" className="block p-2.5 rounded-xl hover:bg-gold-50">Agenda &amp; Tiket</Link>
            <Link href="/aktivitas/berita" className="block p-2.5 rounded-xl hover:bg-gold-50">Berita &amp; Artikel</Link>
            <Link href="/aktivitas/media-partner" className="block p-2.5 rounded-xl hover:bg-gold-50">Pengajuan Media Partner</Link>
            <Link href="/karya-kader/bisnis" className="block p-2.5 rounded-xl hover:bg-gold-50">Etalase Bisnis Kader</Link>
            <Link href="/karya-kader/prestasi" className="block p-2.5 rounded-xl hover:bg-gold-50">Prestasi Kader</Link>
            <Link href="/kotak-suara" className="block p-2.5 rounded-xl hover:bg-gold-50">Kotak Suara Aspirasi</Link>
          </div>

          <div className="pt-2 border-t border-wine-950/10 flex items-center justify-between text-xs">
            <Link href="/masuk" className="text-brand-burgundy font-semibold">
              Masuk / Ganti Akun
            </Link>
            <Link href="/daftar" className="text-neutral-dark hover:text-neutral-black">
              Daftar Mahasiswa
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
