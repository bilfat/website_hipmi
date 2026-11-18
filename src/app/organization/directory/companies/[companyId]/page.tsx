"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Building2,
  ChevronLeft,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Clock,
  Briefcase
} from "lucide-react";

export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = use(params);
  const { store, updateStore } = useMockStore();

  const company = store.companies.find((c) => c.id === companyId);

  const [formData, setFormData] = useState({
    name: company?.name || "",
    category: company?.category || "Sponsor",
    industry: company?.industry || "",
    official_contact: company?.official_contact || "",
    pic_private_name: company?.pic_private_name || "",
    pic_private_contact: company?.pic_private_contact || "",
    relation_status: company?.relation_status || "Aktif",
  });

  const [notice, setNotice] = useState<string | null>(null);

  if (!company) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertCircle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Perusahaan Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{companyId}" tidak terdaftar.</p>
          <Link
            href="/organization/directory/companies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Database
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = store.companies.map((c) =>
      c.id === company.id ? { ...c, ...formData } : c
    );

    updateStore({ companies: updated });
    setNotice("Data profil kemitraan perusahaan berhasil disimpan!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div className="flex items-center gap-2">
            <Link
              href="/organization/directory/companies"
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Database Perusahaan
            </Link>
            <span className="text-xs text-wine-300">/</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
              DIR-07
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">PIC Private Protected</span>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Company Card Form */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-wine-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-wine-50 text-brand-burgundy border border-wine-100">
                {company.category}
              </span>
              <h1 className="text-2xl font-bold font-display text-wine-950 mt-1">{company.name}</h1>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                company.relation_status === "Aktif"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {company.relation_status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900 uppercase">Nama Entitas Perusahaan *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 font-medium text-wine-900"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900 uppercase">Sektor Industri *</label>
              <input
                type="text"
                required
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900 uppercase">Kategori Kemitraan *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900 bg-white"
              >
                <option value="Sponsor">Sponsor</option>
                <option value="Mitra Strategis">Mitra Strategis</option>
                <option value="Media Partner">Media Partner</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-wine-900 uppercase">Status Relasi *</label>
              <select
                value={formData.relation_status}
                onChange={(e) => setFormData({ ...formData, relation_status: e.target.value as any })}
                className="w-full p-2.5 rounded-lg border border-wine-200 text-wine-900 bg-white"
              >
                <option value="Aktif">Aktif</option>
                <option value="Penjajakan">Penjajakan (MoU In Progress)</option>
                <option value="Selesai">Selesai (Periode Berakhir)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-bold text-wine-900 uppercase">Kontak Resmi Perusahaan (Publik)</label>
            <input
              type="text"
              value={formData.official_contact}
              onChange={(e) => setFormData({ ...formData, official_contact: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-wine-200 font-mono text-wine-900"
            />
          </div>

          {/* Protected PIC Data */}
          <div className="p-4 rounded-xl bg-surface-base border border-wine-100 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-wine-950">
                Kontak Privat Person in Charge (PIC) Korporasi (Akses Tim Partnership)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-wine-500 font-medium">Nama PIC:</label>
                <input
                  type="text"
                  value={formData.pic_private_name}
                  onChange={(e) => setFormData({ ...formData, pic_private_name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-wine-200 bg-white text-wine-900 mt-0.5"
                />
              </div>
              <div>
                <label className="text-wine-500 font-medium">Kontak Privat PIC:</label>
                <input
                  type="text"
                  value={formData.pic_private_contact}
                  onChange={(e) => setFormData({ ...formData, pic_private_contact: e.target.value })}
                  className="w-full p-2 rounded-lg border border-wine-200 bg-white font-mono text-wine-900 mt-0.5"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-wine-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" /> Simpan Profil Mitra
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}
