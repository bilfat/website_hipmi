"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { Building2, Calendar, Target, ShieldCheck, ArrowRight, ArrowLeft, Users } from "lucide-react";

export default function CabinetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { store } = useMockStore();

  const cabinet = store.cabinets.find((c) => c.id === id) || store.cabinets[0];
  const fields = store.fields.filter((f) => f.cabinet_id === cabinet.id);

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Breadcrumb Back */}
        <Link
          href="/organisasi/kabinet"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Daftar Kabinet</span>
        </Link>

        {/* Header Profile */}
        <div className="p-8 rounded-3xl bg-surface-card border border-gold-400/40 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 relative rounded-3xl bg-surface-ivory p-3 border border-gold-400/50 flex items-center justify-center shrink-0">
              <Image
                src="/assets/assets_logo/logo_hipmi.png"
                alt={cabinet.name}
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {cabinet.status}
                </span>
                <span className="text-xs text-neutral-light font-mono">
                  {cabinet.period_start} — {cabinet.period_end}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                Kabinet {cabinet.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed italic max-w-3xl">
                "{cabinet.philosophy}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-wine-950/10">
            <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-wine-950 font-bold">
                <Target className="w-4 h-4 text-brand-burgundy" />
                <span>Visi Kabinet</span>
              </div>
              <p className="text-neutral-dark leading-relaxed">{cabinet.vision}</p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-wine-950 font-bold">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Misi Utama</span>
              </div>
              <ul className="space-y-1 text-neutral-dark list-disc list-inside">
                {cabinet.mission.slice(0, 3).map((m, idx) => (
                  <li key={idx} className="line-clamp-2">{m}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mindmap / Struktur Hirarki Interaktif */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy">
              Bagan Struktur
            </span>
            <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
              Hierarki Struktur &amp; Kompartemen
            </h2>
            <p className="text-xs text-neutral-dark">
              Klik pada kartu bidang atau kompartemen untuk mempelajari deskripsi tupoksi dan program kerja terkait.
            </p>
          </div>

          {/* Top Level BPH */}
          <div className="p-6 rounded-3xl bg-brand-darkWine text-white border border-gold-500/40 text-center space-y-4">
            <p className="text-xs font-mono font-bold text-gold-300 uppercase tracking-widest">
              Badan Pengurus Harian (BPH Inti)
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-wine-900/90 border border-gold-500/30 text-xs font-semibold text-gold-200">
                Ketua Umum
              </span>
              <span className="px-4 py-2 rounded-xl bg-wine-900/90 border border-gold-500/30 text-xs font-semibold text-gold-200">
                Wakil Ketua Umum
              </span>
              <span className="px-4 py-2 rounded-xl bg-wine-900/90 border border-gold-500/30 text-xs font-semibold text-gold-200">
                Sekretaris Jenderal
              </span>
              <span className="px-4 py-2 rounded-xl bg-wine-900/90 border border-gold-500/30 text-xs font-semibold text-gold-200">
                Sekretaris Umum
              </span>
              <span className="px-4 py-2 rounded-xl bg-wine-900/90 border border-gold-500/30 text-xs font-semibold text-gold-200">
                Bendahara Umum
              </span>
            </div>
          </div>

          {/* 4 Bidang & Their Compartments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => {
              const compartments = store.compartments.filter((c) => c.field_id === field.id);

              return (
                <div
                  key={field.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="px-2.5 py-1 rounded-xl bg-gold-50 text-brand-burgundy border border-gold-300 font-mono text-xs font-bold">
                        {field.code}
                      </span>
                      <Link
                        href={`/organisasi/bidang/${field.id}`}
                        className="text-xs font-semibold text-brand-burgundy hover:text-brand-darkWine flex items-center gap-1"
                      >
                        <span>Buka Bidang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div>
                      <h3 className="font-serif font-bold text-lg text-wine-950">
                        {field.name}
                      </h3>
                      <p className="text-xs text-neutral-dark mt-1 leading-relaxed">
                        {field.description}
                      </p>
                      <p className="text-[11px] text-neutral-light mt-2 font-medium">
                        Kepala Bidang: <strong className="text-wine-950">{field.leader_name}</strong>
                      </p>
                    </div>

                    {/* Sub-Kompartemen List */}
                    <div className="pt-3 border-t border-wine-950/10 space-y-2">
                      <p className="text-[11px] font-semibold text-neutral-dark uppercase font-mono">
                        Kompartemen di Bawah Bidang ({compartments.length}):
                      </p>
                      <div className="space-y-2">
                        {compartments.map((comp) => (
                          <Link
                            key={comp.id}
                            href={`/organisasi/kompartemen/${comp.id}`}
                            className="p-3 rounded-2xl bg-surface-ivory hover:bg-gold-50/70 border border-wine-950/10 hover:border-gold-400 transition-all flex items-center justify-between text-xs group"
                          >
                            <div>
                              <span className="font-mono text-[10px] text-brand-burgundy font-bold mr-2">
                                {comp.code}
                              </span>
                              <strong className="text-wine-950 group-hover:text-brand-burgundy">
                                {comp.name}
                              </strong>
                              <p className="text-[10px] text-neutral-light mt-0.5">Kakom: {comp.leader_name}</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-light group-hover:text-brand-burgundy transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
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
