import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  ShieldCheck,
  Sparkles,
  Share2
} from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-brand-burgundy text-white relative overflow-hidden border-t-2 border-gold-400/40">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-wine-950/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gold-400/25">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
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
                <p className="text-[11px] text-white/80 font-medium tracking-widest uppercase">
                  HIPMI PT UNIVERSITAS TELKOM • ARTHAKARSA
                </p>
              </div>
            </div>

            <p className="text-xs text-white/90 leading-relaxed pr-6">
              Episentrum pembinaan kader pengusaha muda Telkom University. Mengintegrasikan informasi publik, manajemen operasional kepengurusan, pengelolaan program kerja, dan etalase karya bisnis mahasiswa.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-white/95">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                <span>Gedung Student Center Lt. 2, Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung, Jawa Barat 40257</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-300 shrink-0" />
                <span className="font-mono text-gold-100">sekretariat@hipmi-telu.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-300 shrink-0" />
                <span className="font-mono text-gold-100">0812-0000-0026 (Sekretariat Demo)</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <span className="text-[11px] text-white/70 font-medium">Kanal Resmi:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-wine-950/70 text-gold-200 border border-gold-400/40 text-[10px] font-mono font-medium shadow-xs">
                  @hipmitelkom
                </span>
                <span className="px-3 py-1 rounded-full bg-wine-950/70 text-gold-200 border border-gold-400/40 text-[10px] font-mono font-medium shadow-xs">
                  HIPMI PT Telkom
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigasi Organisasi */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1 border-b border-gold-400/20">
              Struktur &amp; Profil
            </h4>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li>
                <Link href="/" className="hover:text-gold-200 transition-colors">Beranda Utama</Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-gold-200 transition-colors">Tentang Kami &amp; Sejarah</Link>
              </li>
              <li>
                <Link href="/organisasi/kabinet" className="hover:text-gold-200 transition-colors">Kabinet ARTHAKARSA</Link>
              </li>
              <li>
                <Link href="/organisasi/bidang" className="hover:text-gold-200 transition-colors">4 Bidang Kepengurusan</Link>
              </li>
              <li>
                <Link href="/organisasi/kompartemen" className="hover:text-gold-200 transition-colors">8 Kompartemen Kerja</Link>
              </li>
              <li>
                <Link href="/organisasi/program-kerja" className="hover:text-gold-200 transition-colors">Direktori Program Kerja</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Layanan Publik & Interaksi */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1 border-b border-gold-400/20">
              Layanan &amp; Interaksi
            </h4>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li>
                <Link href="/aktivitas/agenda" className="hover:text-gold-200 transition-colors">Agenda &amp; Beli E-Tiket</Link>
              </li>
              <li>
                <Link href="/aktivitas/agenda/cek-tiket" className="hover:text-gold-200 transition-colors">Cek Status E-Tiket (NIM)</Link>
              </li>
              <li>
                <Link href="/aktivitas/berita" className="hover:text-gold-200 transition-colors">Portal Berita &amp; Artikel</Link>
              </li>
              <li>
                <Link href="/aktivitas/media-partner" className="hover:text-gold-200 transition-colors">Layanan Media Partner</Link>
              </li>
              <li>
                <Link href="/aktivitas/media-partner/cek-status" className="hover:text-gold-200 transition-colors">Cek Status Medpart (Kode)</Link>
              </li>
              <li>
                <Link href="/karya-kader/bisnis" className="hover:text-gold-200 transition-colors">Etalase Bisnis Kader</Link>
              </li>
              <li>
                <Link href="/karya-kader/prestasi" className="hover:text-gold-200 transition-colors">Galeri Prestasi Kader</Link>
              </li>
              <li>
                <Link href="/kotak-suara" className="hover:text-gold-200 transition-colors">Kotak Suara Aspirasi</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Akses Internal & Demo */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-200 tracking-wide pb-1 border-b border-gold-400/20">
              Area Akun &amp; Demo
            </h4>
            <ul className="space-y-2.5 text-xs text-white/85">
              <li>
                <Link href="/masuk" className="hover:text-gold-200 transition-colors flex items-center gap-1">
                  <span>Masuk Akun</span>
                  <ArrowUpRight className="w-3 h-3 text-gold-300" />
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="hover:text-gold-200 transition-colors">Daftar Akun Baru</Link>
              </li>
              <li>
                <Link href="/personal/dashboard" className="hover:text-gold-200 transition-colors">Personal Dashboard</Link>
              </li>
              <li>
                <Link href="/organisasi/dashboard" className="hover:text-gold-200 transition-colors">Organization Area</Link>
              </li>
              <li>
                <Link href="/admin/kabinet" className="hover:text-gold-200 transition-colors">Admin Cabinet Center</Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/__demo"
                  className="px-3.5 py-1.5 rounded-xl bg-gold-400/20 text-gold-200 hover:bg-gold-400/30 border border-gold-400/50 inline-flex items-center gap-1.5 font-medium transition-colors text-[11px] shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-gold-300" />
                  <span>Demo Switcher (28 Akun)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/85">
          <p>
            © 2026 HIPMI PT Universitas Telkom • Kabinet ARTHAKARSA. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-white/90">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulasi Frontend Interaktif (LocalStorage)</span>
            </span>
            <span>•</span>
            <Link href="/__demo" className="text-gold-300 hover:text-gold-200 underline underline-offset-2">
              Status Data Engine v1.1
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
