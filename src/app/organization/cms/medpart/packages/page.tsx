"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Settings,
  ChevronLeft,
  Save,
  QrCode,
  CheckCircle2,
  DollarSign,
  Share2
} from "lucide-react";

export default function MedpartPackagesConfigPage() {
  const [packages, setPackages] = useState([
    {
      id: "pkg-1",
      name: "Paket Barter / Cross-Promotion",
      type: "Gratis",
      price: 0,
      features: "1x Post Story Instagram, Pencantuman Logo di Poster Acara, Live Mention",
      active: true,
    },
    {
      id: "pkg-2",
      name: "Paket Feed Premium",
      type: "Berbayar",
      price: 50000,
      features: "1x Carousel Feed Instagram Resmi, 2x Instagram Story, Link Bio H-3 Acara",
      active: true,
    },
    {
      id: "pkg-3",
      name: "Paket Mega Broadcast",
      type: "Berbayar",
      price: 100000,
      features: "1x Reels Video Promosi, 1x Feed Carousel, 3x Story, Broadcast Grup Komunitas",
      active: true,
    },
  ]);

  const [qrisDemoUrl, setQrisDemoUrl] = useState("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80");
  const [notice, setNotice] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("Konfigurasi paket media partner dan QRIS rekening kas berhasil diperbarui!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
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
                CMS-10
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Konfigurasi Paket Medpart & Rekening QRIS
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pengaturan harga paket kerja sama promosi Instagram Medkom dan gambar barcode QRIS penerimaan pembayaran.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Packages List */}
          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-wine-950">
              Daftar Paket Kerja Sama Media Partner
            </h3>

            <div className="space-y-3">
              {packages.map((pkg, idx) => (
                <div key={pkg.id} className="p-4 rounded-xl border border-wine-100 bg-surface-base space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="font-bold text-sm text-wine-900">{pkg.name}</span>
                      <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-100 text-brand-burgundy">
                        {pkg.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-burgundy font-mono">
                        {pkg.price === 0 ? "GRATIS" : `Rp ${pkg.price.toLocaleString("id-ID")}`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-wine-600">{pkg.features}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QRIS Config Box */}
          <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-wine-950 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-brand-burgundy" /> Rekening QRIS Demo Medpart
            </h3>

            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-wine-900">URL Gambar Barcode QRIS *</label>
              <input
                type="url"
                required
                value={qrisDemoUrl}
                onChange={(e) => setQrisDemoUrl(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-wine-200 font-mono text-wine-900"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all"
            >
              <Save className="w-4 h-4" /> Simpan Konfigurasi Paket
            </button>
          </div>
        </form>
      </div>
    </OrganizationShell>
  );
}
