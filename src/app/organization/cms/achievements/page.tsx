"use client";

import { useState } from "react";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { AchievementItem } from "@/types/domain";
import {
  Search,
  Plus,
  Edit3,
  Globe,
  CheckCircle2,
  Eye,
  Award,
  Trash2,
} from "lucide-react";

const STATUS_MAP: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  review: { label: "Terverifikasi (Belum Tayang)", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  published: { label: "Tayang di Karya Kader", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
};

export default function AchievementsManagementPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const canCreate = permissions.canCreateContent || permissions.canPublishContent;
  const canPublish = permissions.canPublishContent;

  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AchievementItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states (supports multi-cadre per front_end.md CMS-06!)
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Kompetisi Bisnis");
  const [level, setLevel] = useState<AchievementItem["level"]>("Nasional");
  const [year, setYear] = useState("2026");
  const [cadreNamesInput, setCadreNamesInput] = useState("");
  const [description, setDescription] = useState("");
  const [docUrl, setDocUrl] = useState("");

  const achievements = (store.achievements || []).filter((ach) => {
    if (levelFilter !== "all" && ach.level !== levelFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      const matchTitle = ach.title.toLowerCase().includes(q);
      const matchCadre = ach.cadre_names.some((n) => n.toLowerCase().includes(q));
      if (!matchTitle && !matchCadre) return false;
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Kompetisi Bisnis");
    setLevel("Nasional");
    setYear("2026");
    setCadreNamesInput("");
    setDescription("");
    setDocUrl("");
    setModalOpen(true);
  };

  const openEditModal = (ach: AchievementItem) => {
    setEditingItem(ach);
    setTitle(ach.title);
    setCategory(ach.category);
    setLevel(ach.level);
    setYear(ach.year);
    setCadreNamesInput(ach.cadre_names.join(", "));
    setDescription(ach.description);
    setDocUrl(ach.documentation_url);
    setModalOpen(true);
  };

  const handleSave = (nextStatus: AchievementItem["status"]) => {
    if (!title.trim() || !cadreNamesInput.trim()) return;
    if (nextStatus === "published" && !canPublish) return;

    const parsedNames = cadreNamesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    mutateStore((draft) => {
      if (editingItem) {
        const target = draft.achievements.find((a) => a.id === editingItem.id);
        if (target) {
          target.title = title.trim();
          target.category = category;
          target.level = level;
          target.year = year;
          target.cadre_names = parsedNames;
          target.description = description.trim();
          target.documentation_url = docUrl.trim() || "/assets/assets_foto/hero_2.jpg";
          target.status = nextStatus;
          if (nextStatus === "published") target.published_at = new Date().toISOString();
        }
      } else {
        draft.achievements.unshift({
          id: `ach-${Date.now()}`,
          title: title.trim(),
          category,
          level,
          year,
          description: description.trim() || title.trim(),
          linked_cadre_ids: [],
          cadre_names: parsedNames,
          documentation_url: docUrl.trim() || "/assets/assets_foto/hero_2.jpg",
          status: nextStatus,
          published_at: nextStatus === "published" ? new Date().toISOString() : undefined,
        });
      }
      addActivityHistory(
        currentUser.name,
        nextStatus === "published" ? "memublikasikan prestasi kader" : "mencatat prestasi kader",
        title.trim(),
        "Kader Berprestasi"
      );
    });

    setModalOpen(false);
    setFeedback(
      nextStatus === "published"
        ? `Prestasi "${title.trim()}" resmi tayang di portal publik Karya Kader.`
        : `Data prestasi "${title.trim()}" berhasil disimpan (${nextStatus}).`
    );
  };

  const handleTogglePublish = (ach: AchievementItem) => {
    if (!canPublish) return;
    const nextStatus = ach.status === "published" ? "review" : "published";
    mutateStore((draft) => {
      const target = draft.achievements.find((a) => a.id === ach.id);
      if (target) {
        target.status = nextStatus;
        if (nextStatus === "published") target.published_at = new Date().toISOString();
      }
    });
    setFeedback(
      nextStatus === "published"
        ? `Prestasi "${ach.title}" kini tayang di halaman Karya Kader.`
        : `Prestasi "${ach.title}" diturunkan dari publikasi publik.`
    );
  };

  const handleDelete = (ach: AchievementItem) => {
    if (!canCreate) return;
    mutateStore((draft) => {
      draft.achievements = draft.achievements.filter((a) => a.id !== ach.id);
    });
    setFeedback(`Data prestasi "${ach.title}" berhasil dihapus.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Layanan Khusus • Publikasi Karya Kader
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Kader Berprestasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Catat, verifikasi, dan publikasikan prestasi kompetisi bisnis &amp; inovasi kader (mendukung multi-kader/tim) untuk tampil di portal Karya Kader publik.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Posting Prestasi Baru</span>
          </button>
        )}
      </div>

      {!canCreate && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            Mode Pemantauan ({permissions.roleBadgeTitle}) — Penambahan &amp; publikasi prestasi kader dikelola oleh unit berwenang.
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
            placeholder="Cari judul penghargaan atau nama kader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
          />
        </div>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs text-wine-950"
        >
          <option value="all">Semua Tingkat ({store.achievements.length})</option>
          <option value="Internasional">Internasional</option>
          <option value="Nasional">Nasional</option>
          <option value="Regional">Regional</option>
          <option value="Universitas">Universitas</option>
        </select>
      </div>

      {/* Achievements Cards */}
      <div className="space-y-3">
        {achievements.length > 0 ? (
          achievements.map((ach) => {
            const st = STATUS_MAP[ach.status] || STATUS_MAP.draft;
            return (
              <div
                key={ach.id}
                className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/35 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy inline-flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {ach.level} • {ach.year}
                    </span>
                  </div>
                  <strong className="font-serif text-base text-wine-950 block">{ach.title}</strong>
                  <span className="text-[11px] text-neutral-dark block">
                    Kader: <strong className="text-wine-950">{ach.cadre_names.join(", ")}</strong> • {ach.category}
                  </span>
                </div>

                {canCreate && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => openEditModal(ach)}
                      className="px-3 py-1.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold inline-flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    {canPublish && (
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(ach)}
                        className={`px-3.5 py-1.5 rounded-full font-semibold inline-flex items-center gap-1 ${
                          ach.status === "published"
                            ? "bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100"
                            : "bg-emerald-700 hover:bg-emerald-800 text-white"
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>{ach.status === "published" ? "Unpublish" : "Publish"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(ach)}
                      className="p-1.5 rounded-full text-neutral-light hover:text-rose-600 hover:bg-rose-50"
                      aria-label="Hapus prestasi"
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
            Belum ada prestasi kader yang sesuai dengan filter.
          </div>
        )}
      </div>

      {/* Modal Posting / Verifikasi Prestasi Kader */}
      <EditorialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        badge="Kader Berprestasi"
        title={editingItem ? "Edit & Verifikasi Prestasi Kader" : "Posting Prestasi Kader Baru"}
        subtitle="Satu prestasi dapat melibatkan beberapa nama kader (pisahkan dengan tanda koma)."
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
              onClick={() => handleSave("review")}
              className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-xs font-semibold text-wine-950"
            >
              Simpan &amp; Verifikasi
            </button>
            {canPublish && (
              <button
                type="button"
                onClick={() => handleSave("published")}
                className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Publish ke Karya Kader</span>
              </button>
            )}
          </>
        }
      >
        <div className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">
                Judul Prestasi / Penghargaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Juara 1 National Business Plan Competition 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">
                Nama Kader Terlibat (pisahkan dengan koma) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={cadreNamesInput}
                onChange={(e) => setCadreNamesInput(e.target.value)}
                placeholder="Contoh: Raka Pratama, Nadira Aulia"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tingkat Kompetisi</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as AchievementItem["level"])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              >
                <option value="Internasional">Internasional</option>
                <option value="Nasional">Nasional</option>
                <option value="Regional">Regional</option>
                <option value="Universitas">Universitas</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tahun &amp; Kategori</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-20 px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs font-mono text-wine-950"
                />
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">URL Dokumentasi / Foto</label>
            <input
              type="text"
              value={docUrl}
              onChange={(e) => setDocUrl(e.target.value)}
              placeholder="https://drive.google.com/... atau /assets/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Deskripsi Singkat</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan konteks kompetisi dan pencapaian kader..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>
        </div>
      </EditorialModal>
    </div>
  );
}
