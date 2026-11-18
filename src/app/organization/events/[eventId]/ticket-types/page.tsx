"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { EventTicketType } from "@/types/domain";
import {
  Ticket,
  ChevronLeft,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Save
} from "lucide-react";

export default function TicketTypesManagementPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store, updateStore } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticketTypes = store.ticket_types.filter((t) => t.event_id === eventId);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quota_total: 50,
    sales_start: "2026-11-15T00:00",
    sales_end: "2026-11-25T23:59",
    status: "active" as any,
  });
  const [notice, setNotice] = useState<string | null>(null);

  if (!event) return null;

  const handleOpenCreate = () => {
    setIsEditing("new");
    setFormData({
      name: "",
      description: "",
      price: 0,
      quota_total: 50,
      sales_start: "2026-11-15T00:00",
      sales_end: "2026-11-25T23:59",
      status: "active",
    });
  };

  const handleOpenEdit = (tier: EventTicketType) => {
    setIsEditing(tier.id);
    setFormData({
      name: tier.name,
      description: tier.description,
      price: tier.price,
      quota_total: tier.quota_total,
      sales_start: tier.sales_start.slice(0, 16),
      sales_end: tier.sales_end.slice(0, 16),
      status: tier.status,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing === "new") {
      const newType: EventTicketType = {
        id: `tt-${Date.now()}`,
        event_id: eventId,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        quota_total: Number(formData.quota_total),
        quota_reserved: 0,
        quota_sold: 0,
        sales_start: new Date(formData.sales_start).toISOString(),
        sales_end: new Date(formData.sales_end).toISOString(),
        status: formData.status,
      };
      updateStore({ ticket_types: [...store.ticket_types, newType] });
      setNotice(`Jenis tiket "${newType.name}" berhasil ditambahkan!`);
    } else {
      const updated = store.ticket_types.map((tt) =>
        tt.id === isEditing
          ? {
              ...tt,
              ...formData,
              price: Number(formData.price),
              quota_total: Number(formData.quota_total),
              sales_start: new Date(formData.sales_start).toISOString(),
              sales_end: new Date(formData.sales_end).toISOString(),
            }
          : tt
      );
      updateStore({ ticket_types: updated });
      setNotice("Pengaturan jenis tiket berhasil diperbarui (snapshot transaksi lama terjaga)!");
    }

    setIsEditing(null);
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
                href={`/organization/events/${eventId}`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> {event.title}
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-05
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Ticket Type Management
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Konfigurasi tingkatan tiket (Early Bird, Regular, VIP), kuota kursi, dan batas masa penjualan.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jenis Tiket</span>
          </button>
        </div>

        {/* Snapshot Protection Notice per PRD */}
        <div className="p-4 rounded-xl bg-surface-base border border-wine-200 text-wine-900 text-xs sm:text-sm flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-wine-950">Aturan Snapshot Nilai Tiket Terkunci</p>
            <p className="text-wine-600 text-xs mt-0.5">
              Sesuai aturan PRD v1.1, perubahan nama atau harga tiket pada tingkatan ini tidak akan mengubah snapshot nominal pada transaksi atau e-tiket peserta yang sudah terbit sebelumnya.
            </p>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Create/Edit Form Modal */}
        {isEditing && (
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-wine-200 shadow-md space-y-4">
            <h3 className="font-display font-bold text-base text-wine-950">
              {isEditing === "new" ? "Buat Tingkatan Tiket Baru" : "Edit Tingkatan Tiket"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-wine-900">Nama Tingkatan Tiket *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Early Bird / Presale 1 / VIP Pass"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-wine-900">Harga Tiket (Rp) *</label>
                <input
                  type="number"
                  required
                  min={0}
                  step={1000}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 font-mono font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-wine-900">Total Kuota Tiket *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.quota_total}
                  onChange={(e) => setFormData({ ...formData, quota_total: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-wine-900">Status Penjualan *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900 bg-white"
                >
                  <option value="active">Active (Dapat Dipesan)</option>
                  <option value="sold_out">Sold Out (Habis)</option>
                  <option value="closed">Closed (Ditutup)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-wine-900">Deskripsi / Fasilitas Tiket</label>
              <input
                type="text"
                placeholder="Contoh: Termasuk sertifikat resmi, snack box, dan e-book materi"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(null)}
                className="px-3.5 py-1.5 rounded-lg border border-wine-200 text-xs font-medium text-wine-700 hover:bg-wine-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-brand-burgundy text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" /> Simpan Jenis Tiket
              </button>
            </div>
          </form>
        )}

        {/* Ticket Types Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Jenis Tiket</th>
                  <th className="py-3.5 px-4">Harga Satuan</th>
                  <th className="py-3.5 px-4 text-center">Terjual</th>
                  <th className="py-3.5 px-4 text-center">Total Kuota</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {ticketTypes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Belum ada jenis tiket yang dibuat untuk agenda ini.
                    </td>
                  </tr>
                ) : (
                  ticketTypes.map((tier) => (
                    <tr key={tier.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-wine-950 font-display text-sm">{tier.name}</span>
                        <p className="text-[11px] text-wine-500 line-clamp-1">{tier.description}</p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-burgundy">
                        {tier.price === 0 ? "GRATIS" : `Rp ${tier.price.toLocaleString("id-ID")}`}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold text-emerald-700">
                        {tier.quota_sold}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-wine-600">
                        {tier.quota_total}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            tier.status === "active"
                              ? "bg-emerald-100 text-emerald-800"
                              : tier.status === "sold_out"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {tier.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(tier)}
                          className="px-2.5 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
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
