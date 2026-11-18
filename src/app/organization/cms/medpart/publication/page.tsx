"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Globe,
  ChevronLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Calendar,
  Share2
} from "lucide-react";

export default function MedpartPublicationDeskPage() {
  const { store, updateStore } = useMockStore();

  const approvedMedparts = store.medpart_submissions.filter(
    (m) => m.status === "approved" || m.status === "published"
  );

  const [notice, setNotice] = useState<string | null>(null);

  const handleTogglePublish = (submissionId: string) => {
    const item = store.medpart_submissions.find((m) => m.id === submissionId);
    if (!item) return;

    const newStatus = item.status === "published" ? "approved" : "published";
    const updated = store.medpart_submissions.map((m) =>
      m.id === submissionId
        ? {
            ...m,
            status: newStatus as any,
            published_at: newStatus === "published" ? new Date().toISOString() : undefined,
          }
        : m
    );

    updateStore({
      medpart_submissions: updated,
      notifications: [
        {
          id: `notif-${Date.now()}`,
          category: "cms",
          title: `Medpart Dipublikasikan Manual: ${item.event_name}`,
          message: `Materi promosi media partner telah ditayangkan resmi di feed/story Instagram oleh tim Medkom.`,
          source_route: `/organization/cms/medpart/publication`,
          read: false,
          created_at: new Date().toISOString()
        },
        ...store.notifications
      ]
    });

    setNotice(
      newStatus === "published"
        ? `Materi ${item.event_name} resmi DITAYANGKAN (Published) secara manual oleh Medkom!`
        : `Materi ${item.event_name} ditarik kembali (Unpublished).`
    );
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/cms/medpart"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Media Partner
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-11
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Meja Tayang / Publikasi Manual Medpart
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Sesuai aturan PRD v1.1, publikasi materi media partner dilakukan secara manual oleh tim Medkom setelah verifikasi materi feed & story selesai.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Manual Publish Enforced</span>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Ready to Publish Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Acara & Pemohon</th>
                  <th className="py-3.5 px-4">Paket & Format</th>
                  <th className="py-3.5 px-4">Materi Siap Tayang</th>
                  <th className="py-3.5 px-4">Status Tayang</th>
                  <th className="py-3.5 px-4 text-right">Aksi Manual Medkom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {approvedMedparts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-wine-500">
                      Belum ada materi medpart yang disetujui untuk ditayangkan.
                    </td>
                  </tr>
                ) : (
                  approvedMedparts.map((m) => (
                    <tr key={m.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-wine-950 font-display text-sm">{m.event_name}</span>
                        <p className="text-[11px] text-wine-500">{m.organization} (PIC: {m.applicant_name})</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                          {m.package_name}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={m.poster_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-brand-burgundy hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Buka Poster
                        </a>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            m.status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {m.status === "published" ? "Sudah Tayang" : "Siap Tayang"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(m.id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-all ${
                            m.status === "published"
                              ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                              : "bg-brand-burgundy hover:bg-wine-900 text-white"
                          }`}
                        >
                          {m.status === "published" ? (
                            <>
                              <RotateCcw className="w-3.5 h-3.5" /> Unpublish
                            </>
                          ) : (
                            <>
                              <Globe className="w-3.5 h-3.5" /> Tayangkan Manual
                            </>
                          )}
                        </button>
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
