"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Archive,
  Search,
  ChevronLeft,
  ExternalLink,
  FileCheck,
  Calendar,
  Building,
  Filter
} from "lucide-react";

export default function CorrespondenceArchivePage() {
  const { store } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [cabinetFilter, setCabinetFilter] = useState("all");

  const archivedLetters = store.correspondence.filter((c) => {
    if (c.status !== "issued" && c.status !== "approved") return false;
    if (cabinetFilter !== "all" && c.cabinet_id !== cabinetFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchNum = c.generated_letter_number?.toLowerCase().includes(q);
      const matchUnit = c.unit_name.toLowerCase().includes(q);
      if (!matchTitle && !matchNum && !matchUnit) return false;
    }
    return true;
  });

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
                COR-07
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Buku Arsip Persuratan Resmi
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Penyimpanan permanen seluruh surat keluar berstempel dan bernomor resmi lintas periode kabinet HIPMI PT Telkom.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-wine-700 bg-white border border-wine-200 px-3 py-1.5 rounded-xl shadow-2xs">
              {archivedLetters.length} Dokumen Tersimpan
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nomor arsip resmi, perihal, atau unit pengaju..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={cabinetFilter}
            onChange={(e) => setCabinetFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Kabinet</option>
            {store.cabinets.map((cab) => (
              <option key={cab.id} value={cab.id}>
                {cab.name} ({cab.period})
              </option>
            ))}
          </select>
        </div>

        {/* Archive Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nomor Surat Resmi</th>
                  <th className="py-3.5 px-4">Perihal & Tujuan</th>
                  <th className="py-3.5 px-4">Unit Pemohon</th>
                  <th className="py-3.5 px-4">Tanggal Terbit</th>
                  <th className="py-3.5 px-4">Berkas Digital</th>
                  <th className="py-3.5 px-4 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {archivedLetters.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada arsip surat yang sesuai pencarian.
                    </td>
                  </tr>
                ) : (
                  archivedLetters.map((l) => (
                    <tr key={l.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-burgundy">
                        {l.generated_letter_number || "Nomor Belum Digenerate"}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-bold text-wine-950 font-display text-sm">{l.title}</p>
                        <p className="text-[11px] text-wine-500 mt-0.5">Kepada: {l.purpose}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-wine-900">{l.unit_name}</span>
                        <p className="text-[11px] text-wine-500">{l.submitter_name}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-wine-600">
                        {l.issued_at ? new Date(l.issued_at).toLocaleDateString("id-ID") : "-"}
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={l.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-brand-burgundy hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Buka Dokumen
                        </a>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/correspondence/${l.id}`}
                          className="px-2.5 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
                        >
                          Detail Read-Only
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
