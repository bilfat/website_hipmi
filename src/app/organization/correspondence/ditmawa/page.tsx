"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { DitmawaDispatchStatus } from "@/types/domain";
import {
  Share2,
  ChevronLeft,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Edit2,
  Save,
  Send
} from "lucide-react";

export default function DitmawaCorrespondencePage() {
  const { store, updateStore } = useMockStore();

  const ditmawaLetters = store.correspondence.filter((c) => c.routing === "Untuk Ditmawa");

  const [selectedLetterId, setSelectedLetterId] = useState<string | null>(null);
  const [ditmawaStatus, setDitmawaStatus] = useState<DitmawaDispatchStatus>("submitted_to_ditmawa");
  const [followupNotes, setFollowupNotes] = useState("");
  const [updateNotice, setUpdateNotice] = useState<string | null>(null);

  const handleUpdateDitmawa = (letterId: string) => {
    const updated = store.correspondence.map((c) =>
      c.id === letterId
        ? {
            ...c,
            ditmawa_status: ditmawaStatus,
            ditmawa_notes: followupNotes,
            updated_at: new Date().toISOString(),
          }
        : c
    );

    updateStore({ correspondence: updated });
    setSelectedLetterId(null);
    setUpdateNotice("Status dan catatan disposisi Ditmawa berhasil diperbarui!");
    setTimeout(() => setUpdateNotice(null), 3000);
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
                COR-06
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Monitoring Persuratan Ditmawa
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pelacakan disposisi pengesahan, izin tempat, dan legalitas kegiatan ke Direktorat Kemahasiswaan Telkom University.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-wine-700 bg-wine-50 px-3 py-1.5 rounded-xl border border-wine-100">
              Total Surat Ditmawa: {ditmawaLetters.length}
            </span>
          </div>
        </div>

        {updateNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{updateNotice}</span>
          </div>
        )}

        {/* Table of Ditmawa Letters */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Judul & Dokumen</th>
                  <th className="py-3.5 px-4">Unit / Pengaju</th>
                  <th className="py-3.5 px-4">Nomor Internal</th>
                  <th className="py-3.5 px-4">Status Ditmawa</th>
                  <th className="py-3.5 px-4">Catatan Tindak Lanjut</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {ditmawaLetters.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Belum ada surat yang diarahkan ke jalur Ditmawa.
                    </td>
                  </tr>
                ) : (
                  ditmawaLetters.map((l) => (
                    <tr key={l.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-bold text-wine-950 font-display text-sm">{l.title}</p>
                        <a
                          href={l.document_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-brand-burgundy hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <ExternalLink className="w-3 h-3" /> Berkas Dokumen
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-wine-900">{l.unit_name}</span>
                        <p className="text-[11px] text-wine-500">{l.submitter_name}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-wine-700">
                        {l.generated_letter_number || "Belum Terbit"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            l.ditmawa_status === "approved_by_ditmawa"
                              ? "bg-emerald-100 text-emerald-800"
                              : l.ditmawa_status === "revision_requested"
                              ? "bg-rose-100 text-rose-800"
                              : l.ditmawa_status === "under_review_ditmawa"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {l.ditmawa_status?.replace(/_/g, " ") || "Belum Dikirim"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-wine-600">
                        {l.ditmawa_notes || "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLetterId(l.id);
                            setDitmawaStatus(l.ditmawa_status || "submitted_to_ditmawa");
                            setFollowupNotes(l.ditmawa_notes || "");
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Update Status
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Modal */}
        {selectedLetterId && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-wine-200 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-wine-950">
                Update Status Disposisi Ditmawa
              </h3>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-wine-900">Status Ditmawa Kampus</label>
                <select
                  value={ditmawaStatus}
                  onChange={(e) => setDitmawaStatus(e.target.value as DitmawaDispatchStatus)}
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy bg-white text-wine-900"
                >
                  <option value="not_dispatched">not_dispatched (Belum Diserahkan)</option>
                  <option value="submitted_to_ditmawa">submitted_to_ditmawa (Telah Diserahkan ke Front Desk)</option>
                  <option value="under_review_ditmawa">under_review_ditmawa (Sedang Diteliti Pembina/Kasie)</option>
                  <option value="approved_by_ditmawa">approved_by_ditmawa (Surat Izin / Pengesahan Terbit)</option>
                  <option value="revision_requested">revision_requested (Ditmawa Minta Perbaikan)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-wine-900">Catatan Tindak Lanjut / No. Agenda Kampus</label>
                <textarea
                  rows={3}
                  value={followupNotes}
                  onChange={(e) => setFollowupNotes(e.target.value)}
                  placeholder="Contoh: Disetujui dengan nomor agenda Ditmawa 819/KMA/2026. Ruangan Damar disetujui."
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLetterId(null)}
                  className="px-3 py-1.5 rounded-lg border border-wine-200 text-xs font-medium text-wine-700"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateDitmawa(selectedLetterId)}
                  className="px-4 py-1.5 rounded-lg bg-brand-burgundy text-white text-xs font-semibold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}
