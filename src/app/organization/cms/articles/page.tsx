"use client";

import { useState } from "react";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { ArticleItem } from "@/types/domain";
import {
  Search,
  Plus,
  Edit3,
  Globe,
  CheckCircle2,
  Eye,
  Trash2,
} from "lucide-react";

const STATUS_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf Penulis", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  review: { label: "Menunggu Publisher", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  published: { label: "Tayang Publik", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  archived: { label: "Diarsipkan", tone: "bg-neutral-100 text-neutral-500 border-neutral-200" },
};

export default function ArticlesManagementPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const canCreate = permissions.canCreateContent || permissions.canPublishContent;
  const canPublish = permissions.canPublishContent;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kabar Organisasi");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [coverUrl, setCoverUrl] = useState("");

  const articles = (store.articles || []).filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      if (
        !a.title.toLowerCase().includes(q) &&
        !a.category.toLowerCase().includes(q) &&
        !a.author_name.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle("");
    setCategory("Kabar Organisasi");
    setExcerpt("");
    setBody("");
    setCoverUrl("/assets/assets_foto/hero_1.jpg");
    setModalOpen(true);
  };

  const openEditModal = (a: ArticleItem) => {
    setEditingArticle(a);
    setTitle(a.title);
    setCategory(a.category);
    setExcerpt(a.excerpt);
    setBody(a.body);
    setCoverUrl(a.cover_url);
    setModalOpen(true);
  };

  const handleSave = (nextStatus: "draft" | "review" | "published") => {
    if (!title.trim()) return;
    if (nextStatus === "published" && !canPublish) return;

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    mutateStore((draft) => {
      if (editingArticle) {
        const target = draft.articles.find((a) => a.id === editingArticle.id);
        if (target) {
          target.title = title.trim();
          target.slug = slug;
          target.category = category;
          target.excerpt = excerpt.trim() || title.trim();
          target.body = body.trim() || excerpt.trim();
          target.cover_url = coverUrl.trim() || "/assets/assets_foto/hero_1.jpg";
          target.status = nextStatus;
          if (nextStatus === "published") target.published_at = new Date().toISOString();
        }
      } else {
        draft.articles.unshift({
          id: `art-${Date.now()}`,
          title: title.trim(),
          slug,
          category,
          excerpt: excerpt.trim() || title.trim(),
          body: body.trim() || excerpt.trim(),
          cover_url: coverUrl.trim() || "/assets/assets_foto/hero_1.jpg",
          author_name: currentUser.name,
          status: nextStatus,
          published_at: nextStatus === "published" ? new Date().toISOString() : undefined,
          created_at: new Date().toISOString(),
        });
      }
      addActivityHistory(
        currentUser.name,
        nextStatus === "published"
          ? "menerbitkan berita/artikel ke web publik"
          : "menyimpan draf berita/artikel",
        title.trim(),
        "Berita & Artikel"
      );
    });

    setModalOpen(false);
    setFeedback(
      nextStatus === "published"
        ? `Artikel "${title.trim()}" resmi tayang di portal Berita publik.`
        : nextStatus === "review"
        ? `Artikel "${title.trim()}" dikirim ke Publisher untuk peninjauan.`
        : `Draf artikel "${title.trim()}" berhasil disimpan.`
    );
  };

  const handleTogglePublish = (a: ArticleItem) => {
    if (!canPublish) return;
    const nextStatus = a.status === "published" ? "draft" : "published";
    mutateStore((draft) => {
      const target = draft.articles.find((item) => item.id === a.id);
      if (target) {
        target.status = nextStatus;
        if (nextStatus === "published") target.published_at = new Date().toISOString();
      }
    });
    setFeedback(
      nextStatus === "published"
        ? `Artikel "${a.title}" kini tayang di portal publik.`
        : `Artikel "${a.title}" diturunkan kembali menjadi draf.`
    );
  };

  const handleDelete = (a: ArticleItem) => {
    if (!canCreate) return;
    mutateStore((draft) => {
      draft.articles = draft.articles.filter((item) => item.id !== a.id);
    });
    setFeedback(`Artikel "${a.title}" dihapus.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Redaksi &amp; Publikasi
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Berita &amp; Artikel Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Kelola kabar kegiatan, rilis pers, dan opini wirausaha kader. Pemisahan hak Content Creator &amp; Publisher menjaga kualitas publikasi web publik.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>
        )}
      </div>

      {!canCreate && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan ({permissions.roleBadgeTitle}) — Pembuatan &amp; publikasi berita dikelola oleh unit Media Komunikasi dengan permission Content Creator / Publisher.
          </span>
        </div>
      )}

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

      {/* Filter */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul artikel, kategori, atau penulis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Status ({store.articles.length})</option>
          <option value="published">Tayang Publik</option>
          <option value="review">Menunggu Publisher</option>
          <option value="draft">Draf Penulis</option>
        </select>
      </div>

      {/* Articles Cards */}
      <div className="space-y-3">
        {articles.length > 0 ? (
          articles.map((a) => {
            const st = STATUS_MAP[a.status] || STATUS_MAP.draft;
            return (
              <div
                key={a.id}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/35 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                      {a.category}
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">{a.title}</strong>
                  <p className="text-[11px] text-neutral-dark line-clamp-1">{a.excerpt}</p>
                  <span className="text-[10px] font-mono text-neutral-light block">
                    Penulis: {a.author_name} • {new Date(a.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>

                {canCreate && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => openEditModal(a)}
                      className="px-3 py-1.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    {canPublish && (
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(a)}
                        className={`px-3.5 py-1.5 rounded-full font-semibold inline-flex items-center gap-1 ${
                          a.status === "published"
                            ? "bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100"
                            : "bg-emerald-700 hover:bg-emerald-800 text-white"
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>{a.status === "published" ? "Unpublish" : "Publish"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(a)}
                      className="p-1.5 rounded-full text-neutral-light hover:text-rose-600 hover:bg-rose-50"
                      aria-label="Hapus artikel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
            Tidak ada artikel yang cocok dengan filter ini.
          </div>
        )}
      </div>

      {/* Modal Tulis / Edit Artikel */}
      <EditorialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        badge="Redaksi Berita & Artikel"
        title={editingArticle ? "Edit Berita / Artikel" : "Tulis Berita / Artikel Baru"}
        subtitle={
          canPublish
            ? "Anda memiliki hak Publisher — dapat langsung menayangkan artikel ke portal Berita publik."
            : "Hak Content Creator: simpan sebagai Draf atau kirim ke Publisher untuk ditayangkan."
        }
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleSave("draft")}
              className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950"
            >
              Simpan Draf
            </button>
            {!canPublish && (
              <button
                type="button"
                onClick={() => handleSave("review")}
                className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
              >
                Kirim ke Publisher
              </button>
            )}
            {canPublish && (
              <button
                type="button"
                onClick={() => handleSave("published")}
                className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Publish ke Publik</span>
              </button>
            )}
          </>
        }
      >
        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: HIPMI Telkom Sukses Gelar Business Expo 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              >
                <option value="Kabar Organisasi">Kabar Organisasi</option>
                <option value="Liputan Kegiatan">Liputan Kegiatan</option>
                <option value="Opini & Bisnis">Opini &amp; Bisnis</option>
                <option value="Pengumuman">Pengumuman</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">URL Gambar Cover</label>
              <input
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="/assets/assets_foto/hero_1.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Ringkasan Singkat (Excerpt)</label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu berita..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Isi Lengkap Berita / Artikel</label>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tuliskan isi berita atau liputan kegiatan secara lengkap..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
            />
          </div>
        </div>
      </EditorialModal>
    </div>
  );
}
