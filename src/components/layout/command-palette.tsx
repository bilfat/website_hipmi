"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import {
  Search,
  X,
  FolderKanban,
  Mail,
  Wallet,
  CalendarCheck,
  QrCode,
  FileText,
  Users,
  Globe,
  ArrowRight,
  Sparkles,
  Command
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryType = "all" | "projects" | "correspondence" | "finance" | "modules";

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { store } = useMockStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Operational Modules list
  const operationalModules = [
    {
      id: "mod-cor",
      title: "Persuratan Sentral (Biro Administrasi)",
      subtitle: "Surat tugas, permohonan SK, review 4-item Sekum & nomor Ditmawa",
      href: "/organization/correspondence",
      icon: Mail,
      category: "modules",
      badge: "Administrasi"
    },
    {
      id: "mod-fin",
      title: "Keuangan & Kas (Kebendaharaan)",
      subtitle: "Buku kas umum, review RAB Bendum & pencairan termin",
      href: "/organization/finance",
      icon: Wallet,
      category: "modules",
      badge: "Keuangan"
    },
    {
      id: "mod-evt",
      title: "Manajemen Acara & Tiket",
      subtitle: "Hub operasional agenda, kuota tiket & verifikasi panitia",
      href: "/organization/events",
      icon: CalendarCheck,
      category: "modules",
      badge: "Acara"
    },
    {
      id: "mod-att",
      title: "Presensi & Pindai QR",
      subtitle: "Meja presensi tiket, scanner QR kamera langsung & log real-time",
      href: "/organization/events/evt-business-expo/check-in",
      icon: QrCode,
      category: "modules",
      badge: "Kehadiran"
    },
    {
      id: "mod-doc",
      title: "Dokumen & LPJ Kabinet",
      subtitle: "Bank arsip dokumen resmi, versioning & review LPJ 7-bagian",
      href: "/organization/documents",
      icon: FileText,
      category: "modules",
      badge: "Arsip"
    },
    {
      id: "mod-dir",
      title: "Direktori Kader & Mitra",
      subtitle: "Database kader terverifikasi PSDM & katalog bisnis anggota",
      href: "/organization/directory/cadres",
      icon: Users,
      category: "modules",
      badge: "PSDM"
    },
    {
      id: "mod-cms",
      title: "CMS Portal & Mitra Media",
      subtitle: "Editor beranda, publikasi warta berita & verifikasi mitra media",
      href: "/organization/cms",
      icon: Globe,
      category: "modules",
      badge: "Publikasi"
    },
    {
      id: "mod-act",
      title: "Pusat Tindakan & Persetujuan",
      subtitle: "Pusat persetujuan lintas fungsi (surat, RAB, LPJ)",
      href: "/organization/action-center",
      icon: Sparkles,
      category: "modules",
      badge: "Persetujuan"
    }
  ];

  // Projects list
  const projectItems = store.projects.map((p) => ({
    id: `proj-${p.id}`,
    title: p.name,
    subtitle: p.description,
    href: `/workspace/${p.id}`,
    icon: FolderKanban,
    category: "projects" as const,
    badge: p.operational_status === "ongoing" ? "Berjalan" : "Rencana"
  }));

  // Correspondence list
  const letterItems = store.correspondence.map((c) => ({
    id: `cor-${c.id}`,
    title: `${c.generated_letter_number || c.reference_number_preview || "Pengajuan Surat"} - ${c.title}`,
    subtitle: `Pemohon: ${c.submitter_name || c.requester_name || "-"} • Status: ${c.status.toUpperCase()}`,
    href: `/organization/correspondence`,
    icon: Mail,
    category: "correspondence" as const,
    badge: c.routing || "Surat"
  }));

  // Aggregate items
  const allItems = [...operationalModules, ...projectItems, ...letterItems];

  // Filter items based on query & activeCategory
  const filteredItems = allItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-surface-card rounded-2xl shadow-2xl border border-wine-950/15 overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in zoom-in-95 duration-150">
        {/* Top Input Bar */}
        <div className="p-4 border-b border-wine-950/10 flex items-center gap-3 bg-surface-ivory/60">
          <Search className="w-5 h-5 text-brand-burgundy shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari program kerja, nomor surat, modul, atau dokumen..."
            className="w-full bg-transparent border-none outline-none text-sm text-wine-950 placeholder:text-neutral-dark/80 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-neutral-dark hover:text-wine-950 hover:bg-wine-950/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-surface-card border border-wine-950/15 text-neutral-dark shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Filter Category Chips */}
        <div className="px-4 py-2.5 border-b border-wine-950/10 flex items-center gap-1.5 overflow-x-auto bg-surface-card text-xs">
          <span className="text-[11px] text-neutral-dark/80 font-semibold mr-1 uppercase font-mono tracking-wider">
            Filter:
          </span>
          {(
            [
              { key: "all", label: "Semua" },
              { key: "projects", label: "Program Kerja" },
              { key: "correspondence", label: "Persuratan" },
              { key: "modules", label: "Modul Kerja" }
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveCategory(tab.key);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === tab.key
                  ? "bg-brand-burgundy text-white shadow-sm font-semibold"
                  : "bg-surface-ivory hover:bg-wine-100/60 text-neutral-dark hover:text-wine-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-wine-950/5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-neutral-dark/40 mx-auto" />
              <p className="text-sm font-semibold text-wine-950">Tidak ada hasil ditemukan</p>
              <p className="text-xs text-neutral-dark max-w-xs mx-auto">
                Coba gunakan kata kunci lain seperti nama proker, jenis surat, atau nama biro operasional.
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => onClose()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                    isSelected ? "bg-gold-500/15 text-wine-950" : "hover:bg-surface-ivory"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? "bg-brand-burgundy text-white border-brand-burgundy"
                          : "bg-surface-ivory text-brand-burgundy border-wine-950/10 group-hover:border-brand-burgundy/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-wine-950 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-wine-950/5 text-wine-900 border border-wine-950/10 font-semibold shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-dark truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected
                        ? "text-brand-burgundy translate-x-1"
                        : "text-neutral-dark/40 group-hover:translate-x-1 group-hover:text-brand-burgundy"
                    }`}
                  />
                </Link>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-surface-ivory/80 border-t border-wine-950/10 flex items-center justify-between text-xs text-neutral-dark">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="font-mono px-1.5 py-0.5 rounded bg-surface-card border border-wine-950/15 text-[10px]">
                ↑↓
              </kbd>
              <span>Navigasi</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="font-mono px-1.5 py-0.5 rounded bg-surface-card border border-wine-950/15 text-[10px]">
                ↵
              </kbd>
              <span>Pilih</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="font-mono px-1.5 py-0.5 rounded bg-surface-card border border-wine-950/15 text-[10px]">
                Esc
              </kbd>
              <span>Tutup</span>
            </span>
          </div>

          <span className="font-mono text-[11px] text-wine-950 font-semibold">
            {filteredItems.length} Hasil
          </span>
        </div>
      </div>
    </div>
  );
}
