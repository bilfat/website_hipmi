"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Hash,
  ChevronLeft,
  CheckCircle2,
  FileCheck,
  Building,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

export default function CorrespondenceNumberingPage() {
  const { store, updateStore } = useMockStore();

  const approvedLetters = store.correspondence.filter((c) => c.status === "approved");
  const alreadyIssued = store.correspondence.filter((c) => c.status === "issued");

  const [generatedSuccess, setGeneratedSuccess] = useState<string | null>(null);

  const handleGenerateNumber = (letterId: string, unitName: string) => {
    // Generate deterministic next number
    const count = alreadyIssued.length + 1;
    const formattedCount = String(count).padStart(3, "0");
    const monthRoman = "XI"; // November
    const year = "2026";
    let unitCode = "SEKUM";
    if (unitName.toLowerCase().includes("medkom")) unitCode = "MEDKOM";
    else if (unitName.toLowerCase().includes("kaderisasi") || unitName.toLowerCase().includes("bidang 1")) unitCode = "BID-01";
    else if (unitName.toLowerCase().includes("usaha")) unitCode = "PU";
    else if (unitName.toLowerCase().includes("expo")) unitCode = "EXPO";

    const officialNumber = `${formattedCount}/HIPMI-TELKOM/${unitCode}/${monthRoman}/${year}`;

    const updated = store.correspondence.map((c) =>
      c.id === letterId
        ? {
            ...c,
            status: "issued" as const,
            generated_letter_number: officialNumber,
            issued_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        : c
    );

    updateStore({
      correspondence: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "correspondence",
          title: `Nomor Surat Resmi Diterbitkan: ${officialNumber}`,
          message: `Surat untuk ${unitName} telah resmi memiliki nomor surat dan tercatat dalam buku arsip.`,
          source_route: `/organization/correspondence/${letterId}`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setGeneratedSuccess(`Nomor resmi "${officialNumber}" berhasil diterbitkan!`);
    setTimeout(() => setGeneratedSuccess(null), 4000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/correspondence"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Persuratan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                COR-05
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Administrasi & Generator Nomor Surat
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Penomoran otomatis resmi Sekum. Format penomoran terkunci sesuai regulasi tata naskah organisasi.
            </p>
          </div>

          <Link
            href="/organization/correspondence/archive"
            className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
          >
            Lihat Buku Arsip Resmi (COR-07) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {generatedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{generatedSuccess}</span>
          </div>
        )}

        {/* Section 1: Ready to Number */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-wine-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-burgundy" />
              Surat Disetujui Menunggu Penomoran ({approvedLetters.length})
            </h3>
            <span className="text-xs text-wine-500">Kewenangan Khusus Sekretariat Jenderal</span>
          </div>

          {approvedLetters.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-surface-base border border-wine-100 text-wine-500 text-xs">
              Tidak ada surat yang sedang menunggu nomor. Seluruh surat disetujui telah memiliki nomor resmi.
            </div>
          ) : (
            <div className="space-y-3">
              {approvedLetters.map((l) => (
                <div
                  key={l.id}
                  className="p-4 rounded-xl border border-wine-200 bg-surface-base flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                        {l.status}
                      </span>
                      <span className="text-xs font-medium text-wine-600">{l.unit_name}</span>
                      <span className="text-xs text-wine-400">•</span>
                      <span className="text-xs text-wine-500">Pengaju: {l.submitter_name}</span>
                    </div>

                    <h4 className="font-bold text-wine-900 font-display text-sm">
                      <Link href={`/organization/correspondence/${l.id}`} className="hover:underline hover:text-brand-burgundy">
                        {l.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-wine-600 mt-0.5">Tujuan: {l.purpose}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGenerateNumber(l.id, l.unit_name)}
                    className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all shrink-0 self-end md:self-center"
                  >
                    <Hash className="w-4 h-4" />
                    <span>Generate Nomor Resmi</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Recently Numbered Log */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-wine-950">
            Riwayat Surat yang Baru Saja Diterbitkan Nomor ({alreadyIssued.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3 px-4">Nomor Resmi</th>
                  <th className="py-3 px-4">Perihal Surat</th>
                  <th className="py-3 px-4">Unit Pemohon</th>
                  <th className="py-3 px-4">Tanggal Terbit</th>
                  <th className="py-3 px-4 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {alreadyIssued.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-base">
                    <td className="py-3 px-4 font-mono font-bold text-brand-burgundy">
                      {item.generated_letter_number}
                    </td>
                    <td className="py-3 px-4 max-w-xs font-medium text-wine-900 truncate">
                      {item.title}
                    </td>
                    <td className="py-3 px-4 text-wine-600">{item.unit_name}</td>
                    <td className="py-3 px-4 text-wine-500 font-mono">
                      {item.issued_at ? new Date(item.issued_at).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/organization/correspondence/${item.id}`}
                        className="text-xs text-brand-burgundy font-semibold hover:underline"
                      >
                        Buka
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
