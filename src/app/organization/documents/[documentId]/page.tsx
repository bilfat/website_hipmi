"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  FileText,
  ChevronLeft,
  ExternalLink,
  Download,
  Edit2,
  FolderKanban,
  Clock,
  User,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = use(params);
  const { store } = useMockStore();

  const doc = store.documents.find((d) => d.id === documentId);
  const project = doc?.related_project_id
    ? store.projects.find((p) => p.id === doc.related_project_id)
    : null;

  if (!doc) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Dokumen Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{documentId}" tidak terdaftar.</p>
          <Link
            href="/organization/documents"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Repository
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/documents"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Repository Dokumen
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              DOC-03
            </span>
          </div>

          <Link
            href={`/organization/documents/form?mode=edit&recordId=${doc.id}`}
            className="px-3.5 py-1.5 rounded-xl border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
          >
            <Edit2 className="w-3.5 h-3.5 text-brand-burgundy" /> Edit Metadata
          </Link>
        </div>

        {/* Document Card */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-wine-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                {doc.category}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                Versi v{doc.version}.0
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                doc.status === "active"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {doc.status}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display text-wine-950">
              {doc.title}
            </h1>
            <p className="text-xs text-wine-500 font-mono mt-1">
              Diperbarui: {new Date(doc.updated_at).toLocaleString("id-ID")}
            </p>
          </div>

          {/* Access Link Button */}
          <div className="p-4 rounded-xl bg-surface-base border border-wine-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-wine-900">Berkas Tersimpan di Cloud Drive:</span>
              <p className="text-xs text-wine-500 truncate max-w-sm mt-0.5">{doc.file_or_url}</p>
            </div>
            <a
              href={doc.file_or_url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all shrink-0"
            >
              <ExternalLink className="w-4 h-4" /> Buka Dokumen Online
            </a>
          </div>

          {/* Metadata detail */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-wine-100 space-y-1">
              <span className="text-wine-500">Program Kerja Terkait:</span>
              <p className="font-bold text-wine-900">
                {project ? project.name : "(Dokumen Administratif Umum)"}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-wine-100 space-y-1">
              <span className="text-wine-500">Pengunggah Berkas:</span>
              <p className="font-bold text-wine-900">Pengurus Kabinet Arthakarsa</p>
            </div>
          </div>

          {/* Version History Table representation */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-wine-950">
              Riwayat Versi Berkas
            </h3>
            <div className="rounded-xl border border-wine-100 overflow-hidden text-xs">
              <div className="p-3 bg-wine-50/50 flex items-center justify-between border-b border-wine-100 font-semibold text-wine-700">
                <span>Versi v{doc.version}.0 (Terkini)</span>
                <span className="font-mono text-wine-500">{new Date(doc.updated_at).toLocaleDateString("id-ID")}</span>
              </div>
              <div className="p-3 bg-white text-wine-600 text-[11px]">
                Revisi konten resmi telah disahkan oleh unit pengunggah dan siap diakses pengurus.
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
