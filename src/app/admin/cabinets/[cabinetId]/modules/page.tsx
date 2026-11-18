"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  Settings,
  ArrowLeft,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Save,
  Sparkles
} from "lucide-react";

export default function ModuleConfigurationPage({
  params,
}: {
  params: Promise<{ cabinetId: string }>;
}) {
  const { cabinetId } = use(params);
  const { store, currentUser } = useMockStore();

  const cab = store.cabinets.find((c) => c.id === cabinetId) || store.cabinets[0];

  const [modules, setModules] = useState([
    { id: "cor", name: "Modul Persuratan Digital & TTD", enabled: true, desc: "Pengajuan surat masuk/keluar, format nomor otomatis, dan disposisi Sekum." },
    { id: "fin", name: "Modul Anggaran & Kas Organisasi", enabled: true, desc: "Pengajuan pencairan dana proker, verifikasi bukti belanja, dan approval Bendum." },
    { id: "tkt", name: "Modul Ticketing & QRIS Demo 180s", enabled: true, desc: "Pemesanan tiket berbayar/gratis, countdown 180 detik, dan penerbitan e-pass." },
    { id: "att", name: "Modul Presensi & Scanner QR", enabled: true, desc: "Check-in kehadiran peserta di lokasi acara dan penerbitan e-sertifikat otomatis." },
    { id: "mp", name: "Modul Kerjasama Media Partner", enabled: true, desc: "Penerimaan proposal publik tanpa login dan pelacakan status dengan kode unik." },
    { id: "fb", name: "Modul Kotak Suara & Aspirasi", enabled: true, desc: "Penyampaian kritik/saran anonim dengan receipt rahasia." },
    { id: "biz", name: "Modul Direktori Bisnis Kader", enabled: true, desc: "Katalog publik promosi usaha binaan kader HIPMI Telkom." }
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const handleSave = () => {
    mutateStore((draft) => {
      addActivityHistory(
        currentUser.name,
        "memperbarui konfigurasi modul sistem",
        "Pengaturan Fitur",
        "Konfigurasi Modul"
      );
    });
    setFeedback("Konfigurasi modul berhasil diperbarui!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/admin/cabinets/${cab.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Dashboard Kabinet</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: ADM-11
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Fitur & Konfigurasi
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Konfigurasi Modul Sistem
          </h1>
          <p className="text-xs text-neutral-dark">
            Aktifkan atau nonaktifkan modul operasional sesuai kebutuhan kerja kabinet {cab.name}.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Konfigurasi</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm flex items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-wine-950 font-serif text-base block">
                  {m.name}
                </strong>
                <span
                  className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    m.enabled ? "bg-emerald-100 text-emerald-800" : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {m.enabled ? "Aktif" : "Nonaktif"}
                </span>
              </div>
              <p className="text-xs text-neutral-dark">{m.desc}</p>
            </div>

            <button
              onClick={() => handleToggle(m.id)}
              className={`p-2 rounded-xl border transition-colors shrink-0 ${
                m.enabled
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                  : "bg-neutral-100 border-neutral-300 text-neutral-500"
              }`}
            >
              {m.enabled ? (
                <ToggleRight className="w-6 h-6 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-neutral-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
