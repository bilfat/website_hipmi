"use client";

import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { 
  Building2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  Users, 
  Sparkles, 
  ChevronRight,
  Award,
  Layers
} from "lucide-react";

export default function CabinetsListPage() {
  const { store } = useMockStore();

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const activeFields = store.fields.filter((f) => f.cabinet_id === activeCab.id);

  const bphMembers = [
    { role: "Ketua Umum", name: "Muhammad Fathur", tag: "Presidium", desc: "Pimpinan tertinggi organisasi & penanggung jawab visi ARTHAKARSA" },
    { role: "Wakil Ketua Umum", name: "Sarah Andini", tag: "Presidium", desc: "Pengarah operasional internal & koordinasi 4 pilar bidang" },
    { role: "Sekretaris Jenderal", name: "Rizky Pratama", tag: "Kesekjenan", desc: "Pengendali tata kelola birokrasi, persuratan & sinergi kelembagaan" },
    { role: "Sekretaris Umum", name: "Nabila Azzahra", tag: "Administrasi", desc: "Manajemen arsip legal, dokumentasi pleno & notulensi kepengurusan" },
    { role: "Bendahara Umum", name: "Dimas Aditya", tag: "Kebendaharaan", desc: "Otoritas pengelolaan arus kas, kepatuhan LPJ & transparansi keuangan" },
  ];

  const fieldAssetMap: Record<string, string> = {
    "B-01": "/assets/asset_bidang/01-bidang-okk.png",
    "B-02": "/assets/asset_bidang/04-bidang-ekraf.png",
    "B-03": "/assets/asset_bidang/02-bidang-eksternal.png",
    "B-04": "/assets/asset_bidang/03-bidang-medkominfo.png",
  };

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header & Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-wine-950/10 pb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Kabinet Aktif • 2026/2027
              </span>
              <span className="text-xs font-mono text-neutral-dark px-2.5 py-1 rounded-full bg-surface-ivory border border-gold-300">
                {activeCab.period_start} s/d {activeCab.period_end}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-wine-950">
              Kabinet {activeCab.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-dark max-w-2xl leading-relaxed">
              Struktur kepengurusan resmi HIPMI Perguruan Tinggi Universitas Telkom periode 2026–2027.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/organisasi/program-kerja"
              className="px-4 py-2 rounded-full text-xs font-medium text-brand-burgundy bg-gold-50 hover:bg-gold-100 border border-gold-400/40 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Katalog Program Kerja</span>
            </Link>
          </div>
        </div>

        {/* Grand Narrative & Filosofi Banner */}
        {/* Variant 1: Warm Ivory Porcelain Canvas (Ultra High Contrast Dark-on-Light) */}
        <div className="rounded-3xl bg-white border-2 border-gold-400/60 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start gap-4 border-b lg:border-b-0 lg:border-r border-wine-950/10 pb-6 lg:pb-0 lg:pr-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-3xl bg-brand-darkWine p-4 border-2 border-gold-400/60 flex items-center justify-center shadow-lg">
                <Image
                  src="/assets/assets_logo/logo_ARTHAKARSA.PNG"
                  alt="Logo ARTHAKARSA"
                  width={84}
                  height={84}
                  className="object-contain"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-burgundy font-bold px-2.5 py-0.5 rounded bg-gold-100 border border-gold-300 inline-block">
                  Filosofi Kabinet
                </span>
                <p className="text-xs sm:text-sm font-medium italic text-wine-950 mt-2 leading-relaxed">
                  "{activeCab.philosophy}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-surface-ivory border border-gold-400/40 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2 text-brand-burgundy font-bold text-xs uppercase tracking-wide">
                  <Target className="w-4 h-4 text-brand-burgundy" />
                  <span>Visi Strategis</span>
                </div>
                <p className="text-xs sm:text-sm text-wine-950 font-medium leading-relaxed">
                  {activeCab.vision}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-ivory border border-gold-400/40 space-y-2.5 shadow-sm">
                <div className="flex items-center gap-2 text-brand-burgundy font-bold text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
                  <span>4 Misi Inti</span>
                </div>
                <ul className="text-xs sm:text-sm text-wine-950 font-medium space-y-1.5 list-disc list-inside">
                  {activeCab.mission.map((m, idx) => (
                    <li key={idx} className="leading-snug">{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BPH Leadership Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy">
                Pimpinan Inti
              </span>
              <h2 className="font-serif text-2xl font-bold text-wine-950 mt-0.5">
                Badan Pengurus Harian (BPH)
              </h2>
            </div>
            <span className="text-xs text-neutral-dark font-medium">5 Pimpinan Eksekutif</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {bphMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface-card border border-gold-400/30 hover:border-gold-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gold-50 text-wine-900 border border-gold-300">
                      {member.tag}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center font-bold text-xs">
                      0{idx + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-wine-950 group-hover:text-brand-burgundy transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-brand-burgundy mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-dark leading-snug line-clamp-3">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pilar Bidang & Kompartemen */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy">
              Pilar Organisasi
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-0.5">
              4 Bidang Pembinaan &amp; 8 Kompartemen
            </h2>
            <p className="text-xs text-neutral-dark mt-1">
              Struktur operasional pelaksana program kerja dan pembinaan wirausaha mahasiswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeFields.map((field) => {
              const compList = store.compartments.filter((c) => c.field_id === field.id);
              const iconSrc = fieldAssetMap[field.code] || "/assets/assets_logo/logo_hipmi.png";

              return (
                <div
                  key={field.id}
                  className="p-6 rounded-3xl bg-surface-card border border-gold-400/40 hover:border-gold-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group space-y-6"
                >
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-2xl bg-surface-ivory p-2 border border-gold-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <Image
                            src={iconSrc}
                            alt={field.name}
                            width={52}
                            height={52}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-gold-50 text-brand-burgundy border border-gold-300 font-mono text-xs font-bold">
                              {field.code}
                            </span>
                            <span className="text-[11px] text-neutral-dark font-medium">
                              Ketua: {field.leader_name}
                            </span>
                          </div>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-wine-950 mt-1">
                            {field.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-dark leading-relaxed">
                      {field.description}
                    </p>

                    {/* Kompartemen Unit */}
                    <div className="p-4 rounded-2xl bg-surface-ivory/80 border border-wine-950/10 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-wine-900 font-bold">
                        Unit Kompartemen ({compList.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {compList.map((comp) => (
                          <Link
                            key={comp.id}
                            href={`/organisasi/kompartemen/${comp.id}`}
                            className="p-2.5 rounded-xl bg-white/80 hover:bg-gold-50/90 border border-gold-500/20 hover:border-gold-400 transition-all flex items-center justify-between group/comp"
                          >
                            <div className="min-w-0 pr-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-gold-100 text-gold-900 font-bold">
                                  {comp.code}
                                </span>
                                <p className="text-xs font-semibold text-wine-950 group-hover/comp:text-brand-burgundy truncate">
                                  {comp.name.replace("Kompartemen ", "")}
                                </p>
                              </div>
                              <p className="text-[10px] text-neutral-dark truncate mt-0.5">
                                {comp.leader_name}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-light group-hover/comp:text-brand-burgundy group-hover/comp:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-wine-950/10 flex items-center justify-between">
                    <Link
                      href={`/organisasi/program-kerja?field=${field.id}`}
                      className="text-xs text-neutral-dark hover:text-brand-burgundy flex items-center gap-1 font-medium transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Lihat Proker Bidang</span>
                    </Link>
                    <Link
                      href={`/organisasi/bidang/${field.id}`}
                      className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
                    >
                      <span>Buka Detail Bidang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicShell>
  );
}
