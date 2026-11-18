"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Image as ImageIcon,
  ChevronLeft,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  CheckCircle2
} from "lucide-react";

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState([
    {
      id: "med-01",
      title: "Hero Banner Musang",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      tag: "Banner",
      uploaded_at: "2026-11-10",
    },
    {
      id: "med-02",
      title: "Poster Business Expo",
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
      tag: "Event Poster",
      uploaded_at: "2026-11-12",
    },
    {
      id: "med-03",
      title: "Logo HIPMI Telkom",
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
      tag: "Brand Identity",
      uploaded_at: "2026-11-01",
    },
    {
      id: "med-04",
      title: "Dokumentasi Pleno I",
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      tag: "Kegiatan",
      uploaded_at: "2026-11-14",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newTag, setNewTag] = useState("Kegiatan");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    const newItem = {
      id: `med-${Date.now()}`,
      title: newTitle,
      url: newUrl,
      tag: newTag,
      uploaded_at: new Date().toISOString().split("T")[0],
    };

    setMediaList([newItem, ...mediaList]);
    setNewTitle("");
    setNewUrl("");
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/organization/cms"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> CMS Dashboard
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-03
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Media & Assets Library
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Repositori aset foto kegiatan, logo partner, poster acara, dan banner editorial HIPMI PT Telkom.
            </p>
          </div>
        </div>

        {/* Add Media Bar */}
        <form onSubmit={handleAddMedia} className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 space-y-1 text-xs w-full">
            <label className="font-bold text-wine-900">Judul / Keterangan Media *</label>
            <input
              type="text"
              required
              placeholder="Contoh: Foto Sambutan Ketum di Musang"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-wine-200"
            />
          </div>

          <div className="flex-1 space-y-1 text-xs w-full">
            <label className="font-bold text-wine-900">URL Gambar (Unsplash / Cloud Drive) *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="w-full p-2 rounded-lg border border-wine-200 font-mono"
            />
          </div>

          <div className="w-full sm:w-36 space-y-1 text-xs">
            <label className="font-bold text-wine-900">Label Kategori</label>
            <select
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full p-2 rounded-lg border border-wine-200 bg-white"
            >
              <option value="Kegiatan">Kegiatan</option>
              <option value="Banner">Banner</option>
              <option value="Event Poster">Event Poster</option>
              <option value="Brand Identity">Brand</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Tambah Media
          </button>
        </form>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mediaList.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl bg-white border border-wine-100 overflow-hidden shadow-xs hover:border-wine-300 transition-all flex flex-col"
            >
              <div className="h-44 w-full bg-slate-900 relative group overflow-hidden">
                <img
                  src={m.url}
                  alt={m.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-xs">
                  {m.tag}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-xs text-wine-950 font-display line-clamp-1">{m.title}</h4>
                  <p className="text-[10px] text-wine-400 font-mono mt-0.5">{m.uploaded_at}</p>
                </div>

                <div className="pt-2 border-t border-wine-50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(m.url, m.id)}
                    className="text-[11px] font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                  >
                    {copiedId === m.id ? (
                      <span className="text-emerald-700">✓ Disalin</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Salin URL
                      </>
                    )}
                  </button>

                  <a
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-wine-400 hover:text-wine-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OrganizationShell>
  );
}
