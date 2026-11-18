"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  Briefcase,
  Plus,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building,
  MapPin,
  Globe,
  Phone,
  Sparkles
} from "lucide-react";

export default function MyBusinessesPage() {
  const { store, currentUser } = useMockStore();

  const myBusinesses = store.businesses.filter((b) => b.owner_user_id === currentUser.id);

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRequestReview = (businessId: string) => {
    mutateStore((draft) => {
      const b = draft.businesses.find((item) => item.id === businessId);
      if (b) {
        b.review_status = "review";
        addActivityHistory(
          currentUser.name,
          "mengajukan peninjauan bisnis kader",
          b.name,
          "Karya Kader"
        );
      }
    });
    setFeedback("Bisnis berhasil diajukan untuk ditinjau oleh Kompartemen Bisnis!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: PER-10
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Karya Kader
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Katalog Usaha / Bisnis Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            Kelola profil usaha Anda untuk dipromosikan dalam Direktori Bisnis Resmi HIPMI PT Universitas Telkom.
          </p>
        </div>

        <Link
          href="/personal/bisnis/baru"
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Daftarkan Usaha Baru</span>
        </Link>
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Business List */}
      <div className="space-y-4">
        {myBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {myBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-wine-950/10">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {biz.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          biz.review_status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : biz.review_status === "review"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        Status Review: {biz.review_status}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          biz.publication_status === "published"
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {biz.publication_status === "published" ? "Terpublikasi" : "Belum Tayang"}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-wine-950 mt-1">
                      {biz.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/personal/bisnis/baru?mode=edit&id=${biz.id}`}
                      className="px-4 py-2 rounded-full border border-wine-950/20 text-wine-950 hover:bg-wine-950/5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Profil</span>
                    </Link>

                    {biz.publication_status === "published" ? (
                      <Link
                        href={`/karya-kader/bisnis/${biz.id}`}
                        className="px-4 py-2 rounded-full bg-surface-ivory border border-wine-950/15 text-brand-burgundy hover:bg-wine-950/5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Halaman Publik</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleRequestReview(biz.id)}
                        className="px-4 py-2 rounded-full bg-brand-burgundy text-white hover:bg-brand-darkWine text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ajukan Review</span>
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-dark leading-relaxed">
                  {biz.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="flex items-center gap-2 text-neutral-dark">
                    <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>Bandung, Jawa Barat</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-dark">
                    <Phone className="w-4 h-4 text-brand-burgundy shrink-0" />
                    <span>{biz.contact_public || currentUser.phone || "08123456789"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-4">
            <Briefcase className="w-12 h-12 text-neutral-300 mx-auto" />
            <h2 className="font-serif text-xl font-bold text-wine-950">
              Belum Ada Bisnis Terdaftar
            </h2>
            <p className="text-xs sm:text-sm text-neutral-dark max-w-md mx-auto">
              Sebagai kader HIPMI, daftarkan produk, jasa, atau startup bisnis Anda untuk mendapatkan promosi dan perluasan pasar ke seluruh jejaring HIPMI PT se-Indonesia.
            </p>
            <div className="pt-2">
              <Link
                href="/personal/bisnis/baru"
                className="px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold inline-flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Daftarkan Usaha Sekarang</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
