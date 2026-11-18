"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory, addAuditEvent } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  ArrowLeft,
  Save,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Building,
  Upload,
  Globe,
  Phone,
  MapPin
} from "lucide-react";
import { CadreBusiness } from "@/types/domain";

export default function BusinessFormPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat formulir usaha..." />}>
      <BusinessFormContent />
    </Suspense>
  );
}

function BusinessFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const editId = searchParams.get("id") || "";

  const { store, currentUser } = useMockStore();

  const existing = editId ? store.businesses.find((b) => b.id === editId) : null;

  const [name, setName] = useState(existing?.name || "");
  const [category, setCategory] = useState(existing?.category || "Teknologi & Digital");
  const [description, setDescription] = useState(existing?.description || "");
  const [address, setAddress] = useState("Bandung, Jawa Barat");
  const [whatsapp, setWhatsapp] = useState(existing?.contact_public || currentUser.phone || "08123456789");
  const [instagram, setInstagram] = useState(existing?.social_links?.[0]?.url || "@bisnis.kader");
  const [website, setWebsite] = useState("https://");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const categories = [
    "Teknologi & Digital",
    "Kuliner & F&B",
    "Fashion & Lifestyle",
    "Jasa Kreatif & Media",
    "Konsultan & Edukasi",
    "Agribisnis & Manufaktur",
    "Retail & E-commerce"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !description.trim() || !whatsapp.trim()) {
      setErrorMsg("Harap isi nama usaha, deskripsi profil, dan nomor WhatsApp.");
      return;
    }

    setIsSubmitting(true);

    mutateStore((draft) => {
      if (mode === "edit" && existing) {
        const b = draft.businesses.find((item) => item.id === existing.id);
        if (b) {
          b.name = name.trim();
          b.category = category;
          b.description = description.trim();
          b.contact_public = whatsapp.trim();
          b.social_links = [{ platform: "Instagram", url: instagram.trim() }];
        }

        addActivityHistory(
          currentUser.name,
          "memperbarui data profil bisnis",
          name.trim(),
          "Karya Kader"
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
          social_links: [{ platform: "Instagram", url: instagram.trim() }],
          review_status: "draft",
          publication_status: "unpublished",
          created_at: new Date().toISOString()
        };

        draft.businesses.unshift(newBiz);

        addActivityHistory(
          currentUser.name,
          "mendaftarkan profil bisnis kader baru",
          name.trim(),
          "Karya Kader"
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

    setIsSubmitting(false);
    router.push("/personal/bisnis");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Navigation Breadcrumb */}
      <Link
        href="/personal/bisnis"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Bisnis Saya</span>
      </Link>

      {/* Header Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
            Screen ID: PER-11
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
            {mode === "edit" ? "Edit Bisnis" : "Pendaftaran Baru"}
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-wine-950">
          {mode === "edit" ? "Perbarui Profil Bisnis" : "Daftarkan Usaha Kader Baru"}
        </h1>
        <p className="text-xs text-neutral-dark">
          Lengkapi profil produk/jasa Anda untuk peninjauan Kompartemen Bisnis dan publikasi ke direktori.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nama Bisnis */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Nama Usaha / Brand / Merk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Artha Coffee & Roastery"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Kategori */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Kategori Industri / Sektor Bisnis <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Deskripsi Singkat Profil & Keunggulan Produk <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan produk utama, target pasar, dan keunikan usaha Anda..."
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Alamat */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Alamat Operasional / Kota Domisili Usaha
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Sukabirus No. 45, Bandung"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Nomor WhatsApp Bisnis <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-wine-950">
                Akun Instagram Bisnis
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Contoh: @arthacoffee"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>

            {/* Website URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-wine-950">
                Website / Tokopedia / Shopee Link
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Contoh: https://arthacoffee.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/personal/bisnis"
            className="px-6 py-2.5 rounded-full border border-wine-950/20 text-xs font-medium text-wine-950 hover:bg-wine-950/5 transition-colors"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs sm:text-sm font-semibold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? "Menyimpan Data..." : "Simpan Profil Usaha"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
