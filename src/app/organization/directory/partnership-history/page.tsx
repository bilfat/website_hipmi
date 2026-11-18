"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Building2,
  ChevronLeft,
  Calendar,
  Briefcase,
  ExternalLink,
  Plus,
  Save,
  CheckCircle2
} from "lucide-react";

export default function PartnershipHistoryPage() {
  const { store, updateStore } = useMockStore();

  const companies = store.companies || [];

  const [selectedCompanyId, setSelectedCompanyId] = useState(companies[0]?.id || "");
  const [newNote, setNewNote] = useState("");
  const [newProjectName, setNewProjectName] = useState("HIPMI Business Expo 2026");
  const [notice, setNotice] = useState<string | null>(null);

  const handleAddHistoryNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote) return;

    const company = store.companies.find((c) => c.id === selectedCompanyId);
    if (!company) return;

    const newHistory = {
      date: new Date().toISOString().split("T")[0],
      notes: newNote,
      project_name: newProjectName,
    };

    const updated = store.companies.map((c) =>
      c.id === selectedCompanyId
        ? {
            ...c,
            history_notes: [newHistory, ...c.history_notes],
          }
        : c
    );

    updateStore({ companies: updated });
    setNewNote("");
    setNotice(`Catatan riwayat kerja sama dengan ${company.name} berhasil ditambahkan!`);
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
                href="/organization/directory/companies"
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Database Perusahaan
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                DIR-08
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Database Riwayat Kerja Sama Mitra & Sponsor
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Rekam jejak kontribusi sponsor, kolaborasi program kerja, dan evaluasi hubungan mitra korporat.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Add History Note Form */}
        <form onSubmit={handleAddHistoryNote} className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-sm text-wine-950 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-burgundy" /> Catat Riwayat Kolaborasi Baru
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-wine-900">Pilih Mitra Perusahaan *</label>
              <select
                value={selectedCompanyId}
                onChange={(e) => setSelectedCompanyId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900 bg-white"
              >
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-wine-900">Program Kerja Terkait *</label>
              <input
                type="text"
                required
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-wine-900">Uraian Kolaborasi / Kontribusi Sponsor *</label>
            <textarea
              rows={2}
              required
              placeholder="Contoh: Menjadi sponsor platinum senilai Rp 15.000.000 + pengadaan booth 3x3m..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Tambah Catatan Riwayat
            </button>
          </div>
        </form>

        {/* Timeline of All Collaborations */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-base text-wine-950">
            Linimasa Kerja Sama Korporasi Lintas Proker
          </h3>

          <div className="space-y-4">
            {companies.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-wine-50 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-display text-base text-wine-950">{c.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                      {c.category}
                    </span>
                  </div>
                  <Link
                    href={`/organization/directory/companies/${c.id}`}
                    className="text-xs text-brand-burgundy font-semibold hover:underline"
                  >
                    Profil Lengkap →
                  </Link>
                </div>

                <div className="space-y-2">
                  {c.history_notes.map((h, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-base border border-wine-100 text-xs flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-wine-900 font-mono">{h.date}</span>
                          {h.project_name && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-wine-100 text-wine-800">
                              {h.project_name}
                            </span>
                          )}
                        </div>
                        <p className="text-wine-700">{h.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
