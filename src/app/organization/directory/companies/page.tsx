"use client";

import { useState } from "react";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
} from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { CompanyPartner } from "@/types/domain";
import {
  Building2,
  Search,
  Plus,
  Handshake,
  Phone,
  User,
  CheckCircle2,
  Lock,
  History,
  Info,
} from "lucide-react";

export default function CompaniesAndSponsorsPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const canManage = permissions.canManagePartnerships || permissions.isSystemAdmin;

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyPartner | null>(null);
  const [newHistoryNote, setNewHistoryNote] = useState("");
  const [newHistoryProj, setNewHistoryProj] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Add Company form
  const [compName, setCompName] = useState("");
  const [compCategory, setCompCategory] = useState<CompanyPartner["category"]>("Sponsor");
  const [compIndustry, setCompIndustry] = useState("");
  const [officialContact, setOfficialContact] = useState("");
  const [picName, setPicName] = useState("");
  const [picContact, setPicContact] = useState("");

  const companies = (store.companies || []).filter((c) => {
    if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (!c.name.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName.trim() || !compIndustry.trim()) return;

    const newItem: CompanyPartner = {
      id: `comp-partner-${Date.now()}`,
      name: compName.trim(),
      category: compCategory,
      industry: compIndustry.trim(),
      official_contact: officialContact.trim() || "partnership@perusahaan.co.id",
      pic_private_name: picName.trim() || "PIC Partnership",
      pic_private_contact: picContact.trim() || "0812-xxxx-xxxx",
      relation_status: "Penjajakan",
      history_notes: [
        {
          date: new Date().toISOString().split("T")[0],
          notes: "Ditambahkan ke Database Sponsor & Mitra HIPMI PT Universitas Telkom.",
        },
      ],
    };

    mutateStore((draft) => {
      draft.companies.unshift(newItem);
      addActivityHistory(
        currentUser.name,
        "menambahkan perusahaan sponsor/mitra",
        newItem.name,
        "Direktori Sponsor & Mitra"
      );
    });

    setCompName("");
    setCompIndustry("");
    setOfficialContact("");
    setPicName("");
    setPicContact("");
    setAddModalOpen(false);
    setFeedback(`Perusahaan "${newItem.name}" berhasil ditambahkan ke Direktori Sponsor & Mitra.`);
  };

  const handleAddInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany || !newHistoryNote.trim()) return;

    const noteEntry = {
      date: new Date().toISOString().split("T")[0],
      notes: newHistoryNote.trim(),
      project_name: newHistoryProj.trim() || undefined,
    };

    mutateStore((draft) => {
      const target = draft.companies.find((c) => c.id === selectedCompany.id);
      if (target) {
        target.history_notes.unshift(noteEntry);
      }
    });

    setSelectedCompany((prev) =>
      prev ? { ...prev, history_notes: [noteEntry, ...prev.history_notes] } : null
    );
    setNewHistoryNote("");
    setNewHistoryProj("");
    setFeedback("Catatan riwayat kerja sama berhasil ditambahkan.");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Referensi Lintas Unit &amp; Proker
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Direktori Sponsor, Mitra &amp; Riwayat Kerja Sama
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Database perusahaan sponsor, mitra strategis, dan riwayat kolaborasi HIPMI untuk membantu bidang, kompartemen, dan pengelola proker mencari mitra kegiatan.
          </p>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Perusahaan</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Role Clarity Banner */}
      <div className="p-3.5 rounded-2xl bg-white/90 border border-[#E9E1DC] flex items-start gap-2.5 text-xs text-neutral-dark">
        <Info className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
        <span>
          {canManage
            ? "Anda memiliki hak kelola penuh (Tambah/Edit/Catat Riwayat & lihat kontak PIC privat) sebagai pengampu kemitraan yang ditunjuk Admin."
            : "Mode Referensi Pengurus & Proker — Anda dapat mencari perusahaan, melihat kontak resmi & riwayat kerja sama. Penambahan/perubahan master data dikelola oleh Kompartemen Partnership."}
        </span>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama perusahaan atau industri..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Kategori</option>
          <option value="Sponsor">Sponsor</option>
          <option value="Mitra Strategis">Mitra Strategis</option>
          <option value="Media Partner">Media Partner</option>
          <option value="Vendor">Vendor</option>
        </select>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((comp) => (
          <div
            key={comp.id}
            onClick={() => setSelectedCompany(comp)}
            className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                  {comp.category}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    comp.relation_status === "Aktif"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  {comp.relation_status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-wine-950">{comp.name}</h3>
                <span className="text-xs text-neutral-dark">{comp.industry}</span>
              </div>

              <div className="space-y-1 text-[11px] text-neutral-dark pt-1">
                <span className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                  <span className="truncate">{comp.official_contact}</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-light">
                  <History className="w-3.5 h-3.5 shrink-0" />
                  <span>{comp.history_notes.length} catatan riwayat kerja sama</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E1DC] flex items-center justify-between text-xs font-semibold text-brand-burgundy">
              <span>Lihat Profil &amp; Riwayat</span>
              <Handshake className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: Tambah Perusahaan (Partnership / Admin Only) */}
      <EditorialModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        badge="Pengelolaan Mitra"
        title="Tambah Perusahaan Sponsor / Mitra"
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-company-form"
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Simpan Perusahaan
            </button>
          </>
        }
      >
        <form id="add-company-form" onSubmit={handleAddCompany} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">Nama Perusahaan / Instansi *</label>
              <input
                type="text"
                required
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="Contoh: PT Bank Mandiri (Persero) Tbk"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kategori</label>
              <select
                value={compCategory}
                onChange={(e) => setCompCategory(e.target.value as CompanyPartner["category"])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="Sponsor">Sponsor</option>
                <option value="Mitra Strategis">Mitra Strategis</option>
                <option value="Media Partner">Media Partner</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Sektor Industri *</label>
              <input
                type="text"
                required
                value={compIndustry}
                onChange={(e) => setCompIndustry(e.target.value)}
                placeholder="Perbankan / Teknologi / F&B"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">Kontak Resmi Perusahaan</label>
              <input
                type="text"
                value={officialContact}
                onChange={(e) => setOfficialContact(e.target.value)}
                placeholder="csr@perusahaan.co.id / (022) xxx"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Nama PIC (Privat)</label>
              <input
                type="text"
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kontak PIC (Privat)</label>
              <input
                type="text"
                value={picContact}
                onChange={(e) => setPicContact(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 2: Detail Perusahaan & Riwayat Kerja Sama */}
      <EditorialModal
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        badge={selectedCompany?.category || "Perusahaan"}
        title={selectedCompany?.name || "Detail Perusahaan"}
        subtitle={`${selectedCompany?.industry || "-"} • Status Relasi: ${selectedCompany?.relation_status || "-"}`}
        maxWidth="lg"
        footer={
          <button
            type="button"
            onClick={() => setSelectedCompany(null)}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Tutup
          </button>
        }
      >
        {selectedCompany && (
          <div className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light block">
                  Kontak Resmi
                </span>
                <strong className="text-wine-950">{selectedCompany.official_contact}</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
                <span className="text-[10px] font-mono uppercase text-neutral-light flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Kontak PIC Privat
                </span>
                {canManage || permissions.isTopManagement ? (
                  <strong className="text-wine-950 block mt-0.5">
                    {selectedCompany.pic_private_name} • {selectedCompany.pic_private_contact}
                  </strong>
                ) : (
                  <span className="text-[11px] text-neutral-dark block mt-0.5">
                    Terbatas khusus Partnership &amp; Pimpinan (hubungi Partnership untuk pengantar resmi).
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <strong className="text-wine-950 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-brand-burgundy" />
                <span>Riwayat Kerja Sama ({selectedCompany.history_notes.length})</span>
              </strong>
              <div className="space-y-2">
                {selectedCompany.history_notes.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-light">
                      <span>{h.date}</span>
                      {h.project_name && (
                        <span className="text-brand-burgundy font-bold">{h.project_name}</span>
                      )}
                    </div>
                    <p className="text-wine-950 leading-relaxed">{h.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {canManage && (
              <form
                onSubmit={handleAddInteraction}
                className="space-y-2.5 pt-3 border-t border-[#E9E1DC]"
              >
                <strong className="text-wine-950 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#AF7D66]" />
                  <span>Tambah Catatan Riwayat Kerja Sama</span>
                </strong>
                <input
                  type="text"
                  value={newHistoryProj}
                  onChange={(e) => setNewHistoryProj(e.target.value)}
                  placeholder="Nama Proker / Event terkait (opsional)"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newHistoryNote}
                    onChange={(e) => setNewHistoryNote(e.target.value)}
                    placeholder="Contoh: Sponsorship dana Rp 5 Jt & booth di Business Expo..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-burgundy text-white font-semibold shrink-0"
                  >
                    Catat
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
