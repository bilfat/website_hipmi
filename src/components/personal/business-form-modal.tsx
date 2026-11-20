"use client";

import { useState, useEffect } from "react";
import { CadreBusiness, User } from "@/types/domain";
import { mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { AlertCircle, Save, Info } from "lucide-react";

const BUSINESS_CATEGORIES = [
  "Teknologi & Digital",
  "Kuliner & F&B",
  "Fashion & Lifestyle",
  "Jasa Kreatif & Media",
  "Konsultan & Edukasi",
  "Agribisnis & Manufaktur",
  "Retail & E-commerce",
];

interface BusinessFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  editingBusiness?: CadreBusiness | null;
  onSuccess?: (message: string) => void;
}

export function BusinessFormModal({
  isOpen,
  onClose,
  currentUser,
  editingBusiness,
  onSuccess,
}: BusinessFormModalProps) {
  const isEdit = !!editingBusiness;

  const [name, setName] = useState("");
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitForReview, setSubmitForReview] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg("");
    if (editingBusiness) {
      setName(editingBusiness.name || "");
      setCategory(editingBusiness.category || BUSINESS_CATEGORIES[0]);
      setDescription(editingBusiness.description || "");
      setWhatsapp(editingBusiness.contact_public || currentUser.phone || "");
      setInstagram(editingBusiness.social_links?.[0]?.url || "");
      setSubmitForReview(editingBusiness.review_status === "review");
    } else {
      setName("");
      setCategory(BUSINESS_CATEGORIES[0]);
      setDescription("");
      setWhatsapp(currentUser.phone || "");
      setInstagram("");
      setSubmitForReview(true);
    }
  }, [isOpen, editingBusiness, currentUser.phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !description.trim() || !whatsapp.trim()) {
      setErrorMsg("Mohon lengkapi nama usaha, deskripsi singkat, dan nomor WhatsApp bisnis.");
      return;
    }

    setIsSaving(true);

    mutateStore((draft) => {
      if (isEdit && editingBusiness) {
        const target = draft.businesses.find((b) => b.id === editingBusiness.id);
        if (target) {
          target.name = name.trim();
          target.category = category;
          target.description = description.trim();
          target.contact_public = whatsapp.trim();
          target.social_links = instagram.trim()
            ? [{ platform: "Instagram", url: instagram.trim() }]
            : [];
          if (submitForReview && target.review_status !== "approved") {
            target.review_status = "review";
          }
        }
        addActivityHistory(
          currentUser.name,
          "memperbarui profil usaha kader",
          name.trim(),
          "Keanggotaan & Bisnis"
        );
      } else {
        const newBiz: CadreBusiness = {
          id: `biz-${Date.now()}`,
          owner_user_id: currentUser.id,
          owner_name: currentUser.name,
          name: name.trim(),
          category,
          description: description.trim(),
          image_url: "/placeholder/biz.jpg",
          products_services: [category],
          contact_public: whatsapp.trim(),
          social_links: instagram.trim()
            ? [{ platform: "Instagram", url: instagram.trim() }]
            : [],
          review_status: submitForReview ? "review" : "draft",
          publication_status: "unpublished",
          created_at: new Date().toISOString(),
        };
        draft.businesses.unshift(newBiz);
        addActivityHistory(
          currentUser.name,
          "mendaftarkan usaha kader baru",
          name.trim(),
          "Keanggotaan & Bisnis"
        );
        addAuditEvent(
          currentUser.id,
          currentUser.name,
          "REGISTER_CADRE_BUSINESS",
          "CadreBusiness",
          newBiz.id
        );
      }
    });

    setIsSaving(false);
    onSuccess?.(
      isEdit
        ? `Profil usaha "${name.trim()}" berhasil diperbarui.`
        : submitForReview
        ? `Usaha "${name.trim()}" berhasil didaftarkan & diajukan untuk kurasi Kompartemen Bisnis.`
        : `Usaha "${name.trim()}" disimpan sebagai draf.`
    );
    onClose();
  };

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge={isEdit ? "Edit Profil Usaha" : "Pendaftaran Usaha Kader"}
      title={isEdit ? `Perbarui ${editingBusiness?.name}` : "Daftarkan Usaha Baru"}
      subtitle="Lengkapi informasi usaha Anda untuk masuk dalam kurasi Direktori Bisnis Kader HIPMI PT Telkom University."
      maxWidth="lg"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950 hover:bg-[#FCF8F6] transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            form="business-modal-form"
            disabled={isSaving}
            className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Daftarkan Usaha"}</span>
          </button>
        </>
      }
    >
      <form id="business-modal-form" onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Nama Usaha / Brand <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Artha Coffee & Roastery"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Sektor / Kategori Industri <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
            >
              {BUSINESS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Deskripsi Produk / Layanan & Keunggulan <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan produk utama, nilai tambah, serta target pasar usaha Anda..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Nomor WhatsApp Bisnis <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="081234567890"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-wine-950">
              Instagram / Tautan Sosial
            </label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@namausaha.id"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 focus:border-brand-burgundy/50 text-xs sm:text-sm text-wine-950"
            />
          </div>
        </div>

        {/* Curation rule checkbox & notice */}
        {(!isEdit || editingBusiness?.review_status !== "approved") && (
          <label className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] cursor-pointer">
            <input
              type="checkbox"
              checked={submitForReview}
              onChange={(e) => setSubmitForReview(e.target.checked)}
              className="mt-0.5 rounded border-wine-950/30 text-brand-burgundy focus:ring-brand-burgundy"
            />
            <span className="text-xs text-wine-950 leading-relaxed">
              <strong className="block">Langsung ajukan ke kurasi Kompartemen Bisnis</strong>
              <span className="text-[11px] text-neutral-dark">
                Jika tidak dicentang, usaha akan disimpan sebagai draf terlebih dahulu.
              </span>
            </span>
          </label>
        )}

        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-[11px] text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            Sesuai tata kelola HIPMI Central, usaha yang masih dalam tahap pemeriksaan/kurasi tidak dapat langsung dipublikasikan secara mandiri hingga disetujui oleh pengurus terkait.
          </span>
        </div>
      </form>
    </EditorialModal>
  );
}
