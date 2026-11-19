"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PublicShell } from "@/components/layout/public-shell";
import { DecorativeLines } from "@/components/ui/decorative-lines";
import { 
  Award, 
  Target, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ArrowRight,
  GraduationCap,
  Briefcase,
  Rocket,
  Network,
  Store,
  Coins,
  Compass,
  BookOpen,
  HeartHandshake,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Building,
  Scale,
  Lightbulb,
  ExternalLink
} from "lucide-react";

export default function AboutPage() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: "inkubasi",
      title: "Inkubasi & Mentoring Bisnis Praktis",
      tag: "PRAKTIKAL • KURIKULUM BISNIS",
      icon: Rocket,
      desc: "Menyelenggarakan kurikulum akselerasi kewirausahaan praktis: validasi produk, bedah unit ekonomi bisnis, simulasi pasar, dan bimbingan 1-on-1 bersama praktisi serta CEO alumni HIPMI.",
      highlights: [
        "Workshop Bootcamp dari Ide Menuju Minimum Viable Product (MVP)",
        "Mentorship privat bersama pengusaha beromzet ratusan juta",
        "Akses modul pembelajaran dan audit berkala kesiapan pasar"
      ]
    },
    {
      id: "konektivitas",
      title: "Konektivitas Ekosistem & Akses Modal",
      tag: "NETWORKING • INVESTOR ACCESS",
      icon: Network,
      desc: "Membuka pintu emas menuju jejaring pengusaha lintas generasi di BPC Kab. Bandung, BPD Jawa Barat, korporasi mitra, perbankan, dan pemodal ventura untuk pendanaan ekspansi usaha.",
      highlights: [
        "Pertemuan berkala Business Matching & Forum Investor",
        "Sinergi rantai pasok (supply chain) antar sesama usaha kader",
        "Akses jejaring ke puluhan ribu anggota HIPMI di 34 provinsi"
      ]
    },
    {
      id: "etalase",
      title: "Etalase Digital & Fasilitasi Legalitas",
      tag: "LEGALITAS • PROMOSI PRODUK",
      icon: Store,
      desc: "Mendampingi legalitas dasar usaha (NIB, sertifikasi halal, HAKI) dan menyediakan etalase digital resmi HIPMI CENTRAL serta expo kewirausahaan skala kampus hingga nasional.",
      highlights: [
        "Showcase etalase digital bisnis mahasiswa di portal HIPMI",
        "Pendampingan perizinan berusaha dan kelengkapan dokumen resmi",
        "Partisipasi stand pameran pada perhelatan akbar tahunan"
      ]
    }
  ];

  const values = [
    {
      title: "Integritas & Etika Bisnis",
      subtitle: "Fondasi Moral Pengusaha",
      desc: "Kejujuran dalam bertransaksi, transparansi pengelolaan modal, dan kepatuhan mutlak terhadap etika bisnis serta hukum.",
      icon: Scale
    },
    {
      title: "Inovasi & Daya Cipta Digital",
      subtitle: "Adaptasi Sains & Teknologi",
      desc: "Mengintegrasikan keunggulan teknologi Telkom University untuk menciptakan produk bernilai tambah dan tahan terhadap disrupsi.",
      icon: Lightbulb
    },
    {
      title: "Solidaritas Seperjuangan",
      subtitle: "Bertanding untuk Bersanding",
      desc: "Bersaing secara sehat dan tajam di pasar bebas, namun bersatu padu menopang satu sama lain sebagai keluarga besar pengusaha muda.",
      icon: HeartHandshake
    },
    {
      title: "Dampak Sosial Berkelanjutan",
      subtitle: "Bakti Nyata bagi Nusantara",
      desc: "Membangun entitas bisnis yang tidak hanya berorientasi laba, tetapi membukakan lapangan kerja dan memberdayakan masyarakat sekitar.",
      icon: Globe2
    }
  ];

  return (
    <PublicShell>
      <div className="space-y-16 sm:space-y-24 pb-24">
        
        {/* ========================================================
            1. HERO EDITORIAL: "Pengusaha Pejuang, Pejuang Pengusaha"
           ======================================================== */}
        <section className="relative overflow-hidden pt-6 pb-16 sm:py-20 border-b border-wine-950/10">
          <DecorativeLines variant="contour" className="inset-0 w-full h-full opacity-35 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-gold-300/15 via-rose-300/10 to-brand-burgundy/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100/90 text-brand-burgundy border border-gold-300 text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Mengenal HIPMI PT Universitas Telkom</span>
              </motion.div>

              {/* Main Editorial Title */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3"
              >
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-wine-950 tracking-tight leading-tight">
                  Pengusaha Pejuang, <br />
                  <span className="text-brand-burgundy italic">Pejuang Pengusaha</span>
                </h1>
                <p className="font-ui text-sm sm:text-base text-neutral-dark max-w-2xl mx-auto leading-relaxed font-normal">
                  Wadah resmi berhimpun dan bertumbuhnya mahasiswa wirausaha di lingkungan Universitas Telkom, bernaung di bawah Himpunan Pengusaha Muda Indonesia (HIPMI).
                </p>
              </motion.div>

              {/* Visual Medallion: Dual Emblem (HIPMI & Telkom ARTHAKARSA) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-2 flex justify-center"
              >
                <div className="inline-flex items-center gap-6 sm:gap-10 p-4 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-gold-400/50 shadow-xl">
                  {/* Logo HIPMI */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-2xl bg-surface-ivory p-2.5 border border-gold-400/40 flex items-center justify-center shadow-inner hover:scale-105 transition-transform">
                      <Image
                        src="/assets/assets_logo/logo_hipmi.png"
                        alt="Logo Resmi HIPMI"
                        fill
                        className="object-contain p-1.5"
                        priority
                      />
                    </div>
                    <span className="font-serif font-bold text-[11px] sm:text-xs text-wine-950 tracking-wider">
                      HIPMI PT UNVERSITAS TELKOM
                    </span>
                  </div>

                  {/* Divider Symbol */}
                  <div className="flex flex-col items-center gap-1 text-gold-600">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
                    <span className="text-xs font-mono font-bold">✕</span>
                    <div className="w-0.5 h-8 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
                  </div>

                  {/* Logo ARTHAKARSA */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-2xl bg-gradient-to-b from-brand-darkWine to-brand-burgundy p-2.5 border border-gold-400/40 flex items-center justify-center shadow-inner hover:scale-105 transition-transform">
                      <Image
                        src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                        alt="Logo Kabinet ARTHAKARSA"
                        fill
                        className="object-contain p-2"
                        priority
                      />
                    </div>
                    <span className="font-serif font-bold text-[11px] sm:text-xs text-brand-burgundy tracking-wider">
                      KABINET ARTHAKARSA
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 3 Metric Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
                <div className="p-4 rounded-2xl bg-white border border-gold-400/40 shadow-sm flex flex-col items-center text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">1972</span>
                  <span className="font-ui text-xs font-semibold text-wine-950">Sejarah Nasional</span>
                  <p className="text-[11px] text-neutral-dark">Tradisi panjang pembinaan pengusaha muda di Indonesia.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gold-400/40 shadow-sm flex flex-col items-center text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">Job Creator</span>
                  <span className="font-ui text-xs font-semibold text-wine-950">Paradigma Utama</span>
                  <p className="text-[11px] text-neutral-dark">Mentransformasi mahasiswa dari pencari kerja menjadi pencipta lapangan kerja.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gold-400/40 shadow-sm flex flex-col items-center text-center space-y-1">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-burgundy">7 Fakultas</span>
                  <span className="font-ui text-xs font-semibold text-wine-950">Ekosistem Kampus</span>
                  <p className="text-[11px] text-neutral-dark">Kolaborasi lintas disiplin sains, rekayasa, bisnis, dan industri kreatif.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            2. DNA & SEJARAH SINGKAT (Storytelling 2 Kolom Asimetris)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-100 border border-gold-300 inline-block">
                  Jejak Langkah &amp; Kelahiran
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight leading-snug">
                  Membangkitkan Semangat Kemandirian Ekonomi Bangsa
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-dark leading-relaxed font-ui">
                <p>
                  Himpunan Pengusaha Muda Indonesia (HIPMI) didirikan pada tanggal <strong>10 Juni 1972</strong> oleh para tokoh perintis muda nasional — di antaranya Abdul Latief, Siswono Yudo Husodo, Teuku Syahrul, dan kawan-kawan — yang bertekad mengangkat martabat ekonomi bangsa melalui lahirnya wirausahawan mandiri dan tangguh.
                </p>
                <p>
                  Seiring berjalannya waktu dan pesatnya disrupsi digital, gerakan kewirausahaan ini melebarkan sayapnya ke dunia akademisi. <strong>HIPMI Perguruan Tinggi (PT) Universitas Telkom</strong> hadir sebagai entitas otonom di bawah bimbingan <em>Badan Pengurus Cabang (BPC) HIPMI Kabupaten Bandung</em> serta bermitra strategis dengan <em>Direktorat Kemahasiswaan (Ditmawa) Universitas Telkom</em>.
                </p>
                <p>
                  Kehadiran HIPMI PT Telkom University menjadi jembatan akselerasi krusial: mengubah riset teknologi, ide rintisan digital, serta produk kreatif mahasiswa menjadi bisnis nyata yang berdaya saing pasar dan siap didanai investor.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-300/60 space-y-1">
                  <p className="font-mono text-xs font-bold text-gold-700">10 JUNI 1972</p>
                  <p className="font-serif text-base font-bold text-wine-950">Kelahiran HIPMI</p>
                  <p className="text-[11px] text-neutral-dark">Diresmikan di Jakarta oleh para tokoh pelopor wirausaha muda nasional.</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-300/60 space-y-1">
                  <p className="font-mono text-xs font-bold text-gold-700">BADAN OTONOM</p>
                  <p className="font-serif text-base font-bold text-wine-950">HIPMI PT Tel-U</p>
                  <p className="text-[11px] text-neutral-dark">Afiliasi resmi BPC Kabupaten Bandung &amp; mitra Rektorat Telkom University.</p>
                </div>
              </div>
            </div>

            {/* Right Card: Anatomy of Official HIPMI Logo */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl bg-white border-2 border-gold-400/60 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header Logo Card */}
                <div className="flex items-center gap-4 pb-5 border-b border-wine-950/10">
                  <div className="w-20 h-20 relative rounded-2xl bg-gradient-to-b from-surface-warm-white to-surface-ivory p-2.5 border-2 border-gold-400/50 flex items-center justify-center shrink-0 shadow-md">
                    <Image
                      src="/assets/assets_logo/logo_hipmi.png"
                      alt="Lambang Resmi HIPMI"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-burgundy px-2 py-0.5 rounded bg-gold-100 border border-gold-300 inline-block mb-1">
                      Identitas Resmi
                    </span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-wine-950">
                      Makna Filosofis Lambang HIPMI
                    </h3>
                    <p className="text-xs text-neutral-dark">
                      Simbol luhur kepribadian pengusaha pejuang di nusantara.
                    </p>
                  </div>
                </div>

                {/* 3 Anatomy Breakdown Items */}
                <div className="space-y-3.5">
                  <div className="p-3.5 rounded-2xl bg-surface-ivory/80 border border-gold-300/50 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-gold-100 border border-gold-300 text-brand-burgundy flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-0.5">
                      <strong className="text-xs sm:text-sm font-serif font-bold text-wine-950 block">
                        Keris Luk Tiga
                      </strong>
                      <p className="text-xs text-neutral-dark leading-relaxed">
                        Melambangkan keperkasaan, ketajaman intuisi bisnis, serta semangat keberanian pantang menyerah pengusaha muda dalam menghadapi dinamika persaingan pasar.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-ivory/80 border border-gold-300/50 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-gold-100 border border-gold-300 text-brand-burgundy flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-0.5">
                      <strong className="text-xs sm:text-sm font-serif font-bold text-wine-950 block">
                        Pohon Beringin
                      </strong>
                      <p className="text-xs text-neutral-dark leading-relaxed">
                        Melambangkan kekuatan moral yang kokoh, persatuan yang saling mengayomi, dan komitmen memberikan naungan keteduhan ekonomi bagi masyarakat luas.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-ivory/80 border border-gold-300/50 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-gold-100 border border-gold-300 text-brand-burgundy flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-0.5">
                      <strong className="text-xs sm:text-sm font-serif font-bold text-wine-950 block">
                        Untaian Padi, Kapas, &amp; Warna Emas
                      </strong>
                      <p className="text-xs text-neutral-dark leading-relaxed">
                        Mencerminkan cita-cita kemakmuran berkeadilan, kemandirian sandang dan pangan, serta kejayaan martabat bangsa melalui penguatan ekonomi domestik.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            3. 3 PILAR GERAKAN (Apa yang Sebenarnya Dilakukan HIPMI?)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 inline-block shadow-sm">
              Aksi Nyata &amp; Nilai Tambah
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
              3 Pilar Gerakan HIPMI PT Telkom University
            </h2>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-2xl mx-auto leading-relaxed">
              Bukan sekadar organisasi kemahasiswaan umum, HIPMI hadir sebagai akselerator terintegrasi yang mendampingi kader dari titik nol hingga skala pasar regional dan nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.id}
                  className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group space-y-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gold-50 border border-gold-300 text-brand-burgundy flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-6 h-6 text-brand-burgundy" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-ivory text-gold-700 border border-gold-300">
                        PILAR 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-lg text-wine-950 group-hover:text-brand-burgundy transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-neutral-dark leading-relaxed mt-2 font-ui">
                        {p.desc}
                      </p>
                    </div>

                    {/* Highlights bullet points */}
                    <div className="pt-3 border-t border-wine-950/10 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-wine-900 font-bold block">
                        Bentuk Program Utama:
                      </span>
                      <ul className="space-y-1.5">
                        {p.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="text-[11px] font-ui text-neutral-dark flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-wine-950/10">
                    <span className="text-[10px] font-mono font-bold text-brand-burgundy tracking-wider block">
                      {p.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            4. PETA SINERGI & JEJARING KELEMBAGAAN (Ecosystem Hierarchy)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-white via-surface-ivory to-surface-warm-white border-2 border-gold-400/50 shadow-xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
            
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-100 border border-gold-300 inline-block shadow-sm">
                Afiliasi &amp; Kedudukan Kelembagaan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-wine-950 tracking-tight">
                Peta Hubungan Sinergi Ekosistem HIPMI
              </h2>
              <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-2xl mx-auto leading-relaxed">
                Struktur berjenjang yang memberikan legitimasi hukum, pengakuan nasional, serta akses jaringan wirausaha tanpa sekat bagi mahasiswa Telkom University.
              </p>
            </div>

            {/* Hierarchy Pathway (Horizontal Cards on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Level 1: BPP */}
              <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-sm flex flex-col justify-between space-y-3 relative group">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy">
                      TINGKAT NASIONAL
                    </span>
                    <Building className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-wine-950">BPP HIPMI</h4>
                  <p className="text-[11px] text-neutral-dark mt-1 leading-snug">
                    Badan Pengurus Pusat berkedudukan di Jakarta. Penentu kebijakan makro wirausaha muda RI.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gold-700 font-semibold border-t border-wine-950/10 pt-2">
                  Komando Kebijakan Pusat
                </div>
              </div>

              {/* Level 2: BPD Jabar */}
              <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-sm flex flex-col justify-between space-y-3 relative group">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy">
                      TINGKAT PROVINSI
                    </span>
                    <Building className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-wine-950">BPD HIPMI Jabar</h4>
                  <p className="text-[11px] text-neutral-dark mt-1 leading-snug">
                    Badan Pengurus Daerah Jawa Barat. Penggerak ekosistem wirausaha di 27 kab/kota.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gold-700 font-semibold border-t border-wine-950/10 pt-2">
                  Koordinasi Wilayah Jabar
                </div>
              </div>

              {/* Level 3: BPC Bandung */}
              <div className="p-4 rounded-2xl bg-white border border-gold-300 shadow-sm flex flex-col justify-between space-y-3 relative group">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-100 text-brand-burgundy">
                      INDUK PEMBINA CABANG
                    </span>
                    <Building className="w-3.5 h-3.5 text-gold-600" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-wine-950">BPC Kab. Bandung</h4>
                  <p className="text-[11px] text-neutral-dark mt-1 leading-snug">
                    Badan Pengurus Cabang Kabupaten Bandung. Pengawas dan pembina operasional HIPMI PT.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gold-700 font-semibold border-t border-wine-950/10 pt-2">
                  Pembina Langsung Cabang
                </div>
              </div>

              {/* Level 4: HIPMI PT Telkom */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-brand-darkWine to-brand-burgundy text-white border-2 border-gold-400 shadow-md flex flex-col justify-between space-y-3 relative group">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-500/20 text-gold-200 border border-gold-400/40">
                      BADAN OTONOM KAMPUS
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white">HIPMI PT Tel-U</h4>
                  <p className="text-[11px] text-white/80 mt-1 leading-snug">
                    Wadah resmi civitas akademika wirausaha Universitas Telkom bermitra dengan Ditmawa.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gold-300 font-semibold border-t border-white/20 pt-2">
                  Episentrum Eksekusi Kampus
                </div>
              </div>
            </div>

            {/* Strategic Campus Partnership Badge */}
            <div className="p-4 rounded-2xl bg-white border border-gold-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-ivory border border-gold-300 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-brand-burgundy" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-wine-950">
                    Kemitraan Strategis Direktorat Kemahasiswaan (Ditmawa)
                  </h5>
                  <p className="text-[11px] text-neutral-dark">
                    Universitas Telkom secara resmi mendukung pembinaan wirausaha mahasiswa melalui sinkronisasi SK, legalitas kegiatan, dan fasilitas inkubasi kampus.
                  </p>
                </div>
              </div>

              <Link
                href="/organisasi/kabinet"
                className="shrink-0 px-4 py-2 rounded-full bg-surface-ivory hover:bg-gold-50 border border-gold-400 text-xs font-semibold text-brand-burgundy transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lihat Struktur Kabinet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================
            5. DOKTRIN & NILAI LUHUR KADER (Core Values & Ethos)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3.5 py-1 rounded-full bg-gold-100 border border-gold-300 inline-block shadow-sm">
              Etos &amp; Prinsip Kepemimpinan
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wine-950 tracking-tight">
              4 Nilai Luhur Kader HIPMI
            </h2>
            <p className="font-ui text-xs sm:text-sm text-neutral-dark max-w-2xl mx-auto leading-relaxed">
              Karakter pembeda yang ditanamkan dalam sanubari setiap kader saat membangun bisnis, memimpin organisasi, dan berkontribusi bagi masyarakat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-gold-400/40 hover:border-gold-400 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-surface-ivory border border-gold-300 text-brand-burgundy flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5 text-brand-burgundy" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-wider block">
                        {v.subtitle}
                      </span>
                      <h4 className="font-serif font-bold text-base text-wine-950 group-hover:text-brand-burgundy transition-colors mt-0.5">
                        {v.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-dark leading-relaxed font-ui">
                      {v.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-wine-950/10 text-[10px] font-mono text-neutral-muted">
                    NILAI INTI #{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            6. CALL TO ACTION (CTA BANNER): Ajakan Bergabung
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-brand-darkWine via-brand-burgundy to-wine-950 text-white p-8 sm:p-12 lg:p-14 shadow-2xl border-2 border-gold-400/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-200 border border-gold-400/40 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                Peluang Emas Mahasiswa Wirausaha
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Siap Mengubah Gagasan Menjadi Bisnis Nyata?
              </h2>

              <p className="font-ui text-xs sm:text-sm text-gold-100/90 leading-relaxed max-w-xl mx-auto">
                Bergabunglah bersama komunitas wirausaha mahasiswa paling dinamis di Telkom University. Dapatkan kurikulum praktis, jejaring bisnis terpercaya, dan panggung karya terbaikmu.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/daftar"
                  className="px-6 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-wine-950 font-serif font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <span>Daftar Menjadi Kader</span>
                  <ArrowRight className="w-4 h-4 text-wine-950" />
                </Link>
                <Link
                  href="/karya-kader/bisnis"
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-ui font-semibold text-xs sm:text-sm border border-white/25 transition-all flex items-center gap-2"
                >
                  <span>Jelajahi Karya Bisnis Kader</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gold-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PublicShell>
  );
}
