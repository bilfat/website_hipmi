"use client";

import Image from "next/image";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import { PublicShell } from "@/components/layout/public-shell";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Ticket, 
  Award, 
  Briefcase, 
  Newspaper, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  MapPin, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function HomePage() {
  const { store } = useMockStore();

  const activeCabinet = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const ketum = store.users.find((u) => u.base_role === "ketum");
  const waketum = store.users.find((u) => u.base_role === "waketum");

  // Filter 4 latest published achievements
  const publishedAchievements = store.achievements
    .filter((a) => a.status === "published")
    .slice(0, 4);

  // Filter published businesses
  const publishedBusinesses = store.businesses
    .filter((b) => b.publication_status === "published")
    .slice(0, 3);

  // Filter upcoming published events
  const publishedEvents = store.events
    .filter((e) => e.status === "published" || e.status === "draft")
    .slice(0, 3);

  // Filter latest published articles
  const publishedArticles = store.articles
    .filter((a) => a.status === "published")
    .slice(0, 3);

  return (
    <PublicShell>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-16 md:pb-28">
        <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-35" />
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-burgundy-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-gold-300/70 text-brand-burgundy text-xs font-semibold shadow-sm animate-in fade-in slide-in-from-top-3 duration-500 hover:border-gold-500 transition-colors">
              <div className="w-5 h-5 rounded-full bg-surface-ivory border border-gold-400/50 flex items-center justify-center overflow-hidden p-0.5 flex-shrink-0 shadow-xs">
                <img
                  src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                  alt="Logo Kabinet ARTHAKARSA"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="tracking-tight">Kabinet ARTHAKARSA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <span className="text-neutral-dark font-normal">Periode 2026–2027</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-wine-950 tracking-tight leading-[1.15]">
             <span className="text-brand-burgundy italic">Pengusaha Muda</span> Berintegritas &amp; Berdaya Saing
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-dark max-w-2xl leading-relaxed">
              Mewadahi inovasi, akselerasi bisnis kader, dan kepemimpinan visioner mahasiswa wirausaha Telkom University untuk membangun masa depan ekonomi digital Indonesia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href="/organisasi/program-kerja"
                className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-burgundy-900/20 hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                <span>Jelajahi Program Kerja</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/aktivitas/agenda"
                className="px-6 py-3 rounded-full bg-white hover:bg-gold-50/80 text-wine-950 border border-gold-400/50 hover:border-gold-500 text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
              >
                <Ticket className="w-4 h-4 text-brand-burgundy" />
                <span>Pesan E-Tiket Event</span>
              </Link>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-10 border-t border-wine-950/10 w-full max-w-3xl">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">40+</p>
                <p className="text-[11px] sm:text-xs text-neutral-dark font-medium">Tenant Bisnis Kader</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">8</p>
                <p className="text-[11px] sm:text-xs text-neutral-dark font-medium">Kompartemen Spesialis</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">15+</p>
                <p className="text-[11px] sm:text-xs text-neutral-dark font-medium">Prestasi &amp; Juara</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">1000+</p>
                <p className="text-[11px] sm:text-xs text-neutral-dark font-medium">Peserta Acara Aktif</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Pimpinan Kabinet ARTHAKARSA */}
      <section className="py-20 bg-surface-ivory border-y border-wine-950/10 relative overflow-hidden">
        <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100/80 border border-gold-300/70 text-brand-burgundy text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
              Pimpinan Kabinet
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-wine-950 tracking-tight">
              <span className="text-brand-burgundy italic">ARTHAKARSA</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark">
              Membawa kepemimpinan visioner dan akselerasi wirausaha muda Universitas Telkom
            </p>
          </div>

          {/* Duo Figures: No Card Background, Standing Free */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-end">
            {/* Ketua Umum */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full flex items-end justify-center h-80 sm:h-96 md:h-[420px] transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/assets/siluet.png"
                  alt={ketum?.name || "Ketua Umum"}
                  width={340}
                  height={440}
                  className="h-full w-auto object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </div>
              {/* Kotak Nama & Jabatan di bawahnya */}
              <div className="w-full max-w-sm mt-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-400/40 shadow-lg text-center space-y-1.5 group-hover:border-gold-500 transition-colors">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-wine-950 tracking-tight">
                  {ketum?.name || "Ketua Umum Demo"}
                </h3>
                <p className="text-xs uppercase tracking-widest font-mono font-bold text-brand-burgundy">
                  Ketua Umum
                </p>
                <p className="text-[11px] text-neutral-dark font-medium pt-1 border-t border-wine-950/10">
                  Fakultas Ekonomi dan Bisnis • Periode 2026/2027
                </p>
              </div>
            </div>

            {/* Wakil Ketua Umum */}
            <div className="flex flex-col items-center group">
              <div className="relative w-full flex items-end justify-center h-80 sm:h-96 md:h-[420px] transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src="/assets/siluet.png"
                  alt={waketum?.name || "Wakil Ketua Umum"}
                  width={340}
                  height={440}
                  className="h-full w-auto object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </div>
              {/* Kotak Nama & Jabatan di bawahnya */}
              <div className="w-full max-w-sm mt-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-gold-400/40 shadow-lg text-center space-y-1.5 group-hover:border-gold-500 transition-colors">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-wine-950 tracking-tight">
                  {waketum?.name || "Wakil Ketua Umum Demo"}
                </h3>
                <p className="text-xs uppercase tracking-widest font-mono font-bold text-brand-darkWine">
                  Wakil Ketua Umum
                </p>
                <p className="text-[11px] text-neutral-dark font-medium pt-1 border-t border-wine-950/10">
                  Fakultas Rekayasa Industri • Periode 2026/2027
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Link */}
          <div className="text-center mt-12">
            <Link
              href="/organisasi/kabinet"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-gold-50/80 text-brand-burgundy border border-gold-400/50 hover:border-gold-500 text-xs font-semibold shadow-sm transition-all group"
            >
              <span>Lihat Struktur Kabinet Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Empat Pilar Bidang Organisasi */}
      <section className="py-20 bg-gradient-to-b from-[#2D0B10] via-brand-darkWine to-[#24080D] text-white relative overflow-hidden border-y border-gold-400/25">
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-burgundy-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-gold-400 bg-gold-400/15 px-3 py-1 rounded-full border border-gold-400/30">
              Struktur Kepengurusan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              4 Pilar Bidang Utama ARTHAKARSA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200">
              Menggerakkan kompartemen spesifik untuk regenerasi kader, kemandirian bisnis, dan kemitraan strategis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {store.fields.map((field) => {
              const assetMap: Record<string, string> = {
                "B-01": "/assets/asset_bidang/01-bidang-okk.png",
                "B-02": "/assets/asset_bidang/04-bidang-ekraf.png",
                "B-03": "/assets/asset_bidang/02-bidang-eksternal.png",
                "B-04": "/assets/asset_bidang/03-bidang-medkominfo.png",
              };
              const assetSrc = assetMap[field.code] || "/assets/asset_bidang/01-bidang-okk.png";

              return (
                <Link
                  key={field.id}
                  href={`/organisasi/bidang/${field.id}`}
                  className="p-6 rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-gold-400/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* 3D Asset Icon with Glow */}
                    <div className="relative w-full h-28 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gold-400/10 rounded-2xl blur-lg group-hover:bg-gold-400/20 transition-colors" />
                      <Image
                        src={assetSrc}
                        alt={field.name}
                        width={112}
                        height={112}
                        className="h-24 w-24 object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300 relative z-10"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 font-mono font-bold uppercase tracking-wider border border-gold-400/30">
                        {field.code}
                      </span>
                      <h3 className="font-serif font-bold text-base text-white group-hover:text-gold-200 transition-colors mt-2">
                        {field.name}
                      </h3>
                      <p className="text-xs text-neutral-200/80 line-clamp-3 mt-2 leading-relaxed">
                        {field.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-gold-300 group-hover:text-white transition-colors">
                    <span>Pelajari Bidang</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Prestasi Terbaru (Tepat 4 record published terbaru per PRD) */}
      <section className="py-16 bg-surface-card border-y border-wine-950/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand-burgundy">
                Rekam Jejak Kader
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                Prestasi Membanggakan
              </h2>
            </div>
            <Link
              href="/karya-kader/prestasi"
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Lihat Semua Prestasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedAchievements.map((item) => (
              <Link
                key={item.id}
                href={`/karya-kader/prestasi/${item.id}`}
                className="p-5 rounded-3xl bg-surface-ivory/80 hover:bg-gold-50/80 border border-gold-400/30 hover:border-gold-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-mono font-bold">
                      {item.level}
                    </span>
                    <span className="text-[11px] text-neutral-light font-mono font-semibold">{item.year}</span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-wine-950 group-hover:text-brand-burgundy line-clamp-2 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-dark line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-wine-950/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-dark truncate max-w-[150px]">
                    {item.cadre_names.join(", ")}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-burgundy group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Agenda & Tiket Mendatang */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand-burgundy">
                Aktivitas &amp; Kegiatan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                Agenda Terdekat
              </h2>
            </div>
            <Link
              href="/aktivitas/agenda"
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Lihat Kalender Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        evt.category === "berbayar"
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      }`}
                    >
                      {evt.category}
                    </span>
                    <span className="text-xs text-neutral-light flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(evt.schedule_start).toLocaleDateString("id-ID", { month: "short", day: "numeric" })}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-wine-950 hover:text-brand-burgundy transition-colors">
                      <Link href={`/aktivitas/agenda/${evt.id}`}>{evt.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-dark line-clamp-3 mt-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-dark pt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-burgundy flex-shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                <div className="p-4 bg-surface-ivory border-t border-wine-950/10 flex items-center justify-between">
                  <Link
                    href={`/aktivitas/agenda/${evt.id}`}
                    className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine"
                  >
                    Detail Acara
                  </Link>

                  <Link
                    href={`/aktivitas/agenda/${evt.id}/tiket`}
                    className="px-4 py-1.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold flex items-center gap-1 shadow transition-colors"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Daftar / Tiket</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Etalase Bisnis Kader Pilihan */}
      <section className="py-16 bg-surface-card border-y border-wine-950/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand-burgundy">
                Karya Wirausaha
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                Etalase Bisnis Kader Terpilih
              </h2>
            </div>
            <Link
              href="/karya-kader/bisnis"
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Lihat Semua Bisnis Kader</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedBusinesses.map((biz) => (
              <Link
                key={biz.id}
                href={`/karya-kader/bisnis/${biz.id}`}
                className="p-6 rounded-3xl bg-surface-ivory hover:bg-gold-50/60 border border-gold-400/30 hover:border-gold-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-wine-900/10 text-brand-burgundy text-[10px] font-mono font-semibold">
                    {biz.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-xs text-neutral-dark line-clamp-3 leading-relaxed">
                    {biz.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-wine-950/10 flex items-center justify-between text-xs text-neutral-dark">
                  <span>Pemilik: <strong className="text-wine-950">{biz.owner_name}</strong></span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-burgundy group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Berita & Artikel Terbaru */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-brand-burgundy">
                Warta &amp; Inspirasi
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 mt-1">
                Berita &amp; Artikel Terkini
              </h2>
            </div>
            <Link
              href="/aktivitas/berita"
              className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedArticles.map((art) => (
              <Link
                key={art.id}
                href={`/aktivitas/berita/${art.id}`}
                className="p-6 rounded-3xl bg-surface-card hover:bg-gold-50/50 border border-wine-950/10 hover:border-gold-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-mono font-bold">
                    {art.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-neutral-dark line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-wine-950/10 flex items-center justify-between text-xs text-neutral-light">
                  <span>{art.author_name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-burgundy group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner (Kotak Suara & Medpart) */}
      <section className="py-16 bg-surface-ivory border-y border-gold-300/60 relative overflow-hidden">
        <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-300/80 text-brand-burgundy text-[11px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              Kanal Aspirasi &amp; Kemitraan
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-wine-950 tracking-tight">
              Punya Aspirasi atau Ingin Bermitra?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-dark max-w-xl leading-relaxed">
              Salurkan masukan Anda melalui Kotak Suara privat, atau ajukan kerja sama publikasi kegiatan melalui portal Media Partner resmi.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <Link
              href="/kotak-suara"
              className="px-6 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>Kirim Aspirasi (Kotak Suara)</span>
            </Link>

            <Link
              href="/aktivitas/media-partner/ajukan"
              className="px-6 py-3 rounded-full bg-white hover:bg-gold-50 text-wine-950 font-semibold text-xs sm:text-sm border border-gold-400/60 transition-all shadow-sm flex items-center gap-2"
            >
              <span>Ajukan Media Partner</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
