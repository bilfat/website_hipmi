"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Search,
  X,
  FolderKanban,
  Mail,
  Wallet,
  CalendarCheck,
  Calendar,
  FileText,
  Users,
  Handshake,
  ArrowRight,
  Sparkles,
  Command,
  Store,
  Newspaper,
  MessageSquareHeart,
  Megaphone,
  Award,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryType = "all" | "projects" | "correspondence" | "finance" | "modules";

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: Exclude<CategoryType, "all">;
  badge: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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

  // Permission-filtered modules (No generic "CMS" menu!)
  const moduleItems: PaletteItem[] = [];

  if (!permissions.isPureProjectManager) {
    moduleItems.push({
      id: "mod-cal",
      title: "Kalender Organisasi",
      subtitle: "Jadwal pleno, rapat, oprec, wawancara & milestone bertingkat",
      href: "/organization/calendar",
      icon: Calendar,
      category: "modules",
      badge: "Kalender",
    });
  }

  if (permissions.canReadSponsors) {
    moduleItems.push({
      id: "mod-spo",
      title: "Direktori Sponsor & Mitra",
      subtitle: "Referensi perusahaan, kontak mitra & riwayat kerja sama HIPMI",
      href: "/organization/directory/companies",
      icon: Handshake,
      category: "modules",
      badge: "Referensi",
    });
  }

  if (permissions.isTopManagement || permissions.isSekum || permissions.canCreateLetter) {
    moduleItems.push({
      id: "mod-cor",
      title: "Persuratan & Ditmawa",
      subtitle: "Pengajuan surat URL dokumen, review Sekum & pelacakan Ditmawa",
      href: "/organization/correspondence",
      icon: Mail,
      category: "modules",
      badge: "Administrasi",
    });
  }

  if (permissions.isTopManagement || permissions.isBendum || permissions.canCreateFundRequest) {
    moduleItems.push({
      id: "mod-fin",
      title: "Keuangan & Kas",
      subtitle: "Buku kas umum, pengajuan dana (RAB) & pencairan",
      href: "/organization/finance",
      icon: Wallet,
      category: "modules",
      badge: "Keuangan",
    });
  }

  if (permissions.isTopManagement || permissions.canManageEvents || permissions.canScanAttendance) {
    moduleItems.push({
      id: "mod-evt",
      title: "Agenda, Event & Presensi",
      subtitle: "Kelola event publik, tiket, verifikasi bayar & check-in QR",
      href: "/organization/events",
      icon: CalendarCheck,
      category: "modules",
      badge: "Event",
    });
  }

  if (permissions.isTopManagement || permissions.isSekum || permissions.canReviewLPJ || permissions.isKakom || permissions.isKabid) {
    moduleItems.push({
      id: "mod-doc",
      title: "Dokumen & LPJ",
      subtitle: "Arsip dokumen versioning & laporan pertanggungjawaban 7-bagian",
      href: "/organization/documents",
      icon: FileText,
      category: "modules",
      badge: "Arsip",
    });
  }

  if (permissions.isTopManagement || permissions.isSekum || permissions.canManageCadres) {
    moduleItems.push({
      id: "mod-cadre",
      title: "Database Kader",
      subtitle: "Data kader resmi, verifikasi & penautan NIM",
      href: "/organization/directory/cadres",
      icon: Users,
      category: "modules",
      badge: "Layanan",
    });
  }

  if (permissions.isTopManagement || permissions.canManageBusinesses) {
    moduleItems.push({
      id: "mod-biz",
      title: "Pengelolaan Bisnis Kader",
      subtitle: "Database & kurasi publikasi bisnis mahasiswa kader",
      href: "/organization/directory/businesses",
      icon: Store,
      category: "modules",
      badge: "Layanan",
    });
  }

  if (permissions.isTopManagement || permissions.isBendum || permissions.canReviewMedpart) {
    moduleItems.push({
      id: "mod-med",
      title: "Media Partner (Medpart)",
      subtitle: "Paket medpart gratis/berbayar & review pengajuan",
      href: "/organization/cms/medpart",
      icon: Megaphone,
      category: "modules",
      badge: "Layanan",
    });
  }

  if (permissions.isTopManagement || permissions.isSekum || permissions.canCreateContent || permissions.canPublishContent) {
    moduleItems.push(
      {
        id: "mod-news",
        title: "Berita & Artikel",
        subtitle: "Publikasi warta kegiatan ke portal publik",
        href: "/organization/cms/articles",
        icon: Newspaper,
        category: "modules",
        badge: "Layanan",
      },
      {
        id: "mod-ach",
        title: "Kader Berprestasi",
        subtitle: "Posting & kelola rekam jejak prestasi kader",
        href: "/organization/cms/achievements",
        icon: Award,
        category: "modules",
        badge: "Layanan",
      }
    );
  }

  if (permissions.isTopManagement || permissions.isSekum || permissions.canManageFeedback) {
    moduleItems.push({
      id: "mod-fbk",
      title: "Kotak Suara",
      subtitle: "Triage & tindak lanjut aspirasi publik",
      href: "/organization/cms/feedback",
      icon: MessageSquareHeart,
      category: "modules",
      badge: "Layanan",
    });
  }

  // Permission-filtered projects
  const allowedProjects = store.projects.filter((p) => {
    if (permissions.isTopManagement || permissions.isSekum || permissions.isBendum) return true;
    if (permissions.isKabid && permissions.managedFieldId) return p.field_id === permissions.managedFieldId;
    if (permissions.isKakom && permissions.managedCompartmentId) return p.compartment_id === permissions.managedCompartmentId;
    if (permissions.managedProjectIds.includes(p.id)) return true;
    if (permissions.managedCompartmentId && p.compartment_id === permissions.managedCompartmentId) return true;
    return false;
  });

  const projectItems: PaletteItem[] = allowedProjects.map((p) => ({
    id: `proj-${p.id}`,
    title: p.name,
    subtitle: p.description,
    href: `/workspace/projects/${p.id}`,
    icon: FolderKanban,
    category: "projects",
    badge: p.operational_status === "ongoing" ? "Berjalan" : "Proker",
  }));

  // Permission-filtered correspondence
  const canSeeLetters =
    permissions.isTopManagement || permissions.isSekum || permissions.canCreateLetter;
  const letterItems: PaletteItem[] = canSeeLetters
    ? store.correspondence
        .filter((c) => {
          if (permissions.isTopManagement || permissions.isSekum) return true;
          return c.submitter_user_id === currentUser.id;
        })
        .map((c) => ({
          id: `cor-${c.id}`,
          title: `${c.generated_letter_number || "Pengajuan Surat"} — ${c.title}`,
          subtitle: `Pengaju: ${c.submitter_name || "-"} • ${c.unit_name}`,
          href: `/organization/correspondence`,
          icon: Mail,
          category: "correspondence",
          badge: c.routing || "Surat",
        }))
    : [];

  // Permission-filtered fund requests
  const canSeeFinance =
    permissions.isTopManagement || permissions.isBendum || permissions.canCreateFundRequest;
  const financeItems: PaletteItem[] = canSeeFinance
    ? store.fund_requests
        .filter((f) => {
          if (permissions.isTopManagement || permissions.isBendum) return true;
          return f.submitter_user_id === currentUser.id;
        })
        .map((f) => ({
          id: `fin-${f.id}`,
          title: f.purpose,
          subtitle: `${f.unit_name} • Rp ${f.requested_amount.toLocaleString("id-ID")}`,
          href: `/organization/finance`,
          icon: Wallet,
          category: "finance",
          badge: "RAB",
        }))
    : [];

  const allItems: PaletteItem[] = [
    ...moduleItems,
    ...projectItems,
    ...letterItems,
    ...financeItems,
  ];

  const q = query.trim().toLowerCase();
  const filtered = allItems.filter((item) => {
    const matchCategory = activeCategory === "all" || item.category === activeCategory;
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-wine-950/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#FFFDFB] border border-[#E8B577]/45 shadow-[0_24px_64px_rgba(61,15,22,0.25)] overflow-hidden">
        {/* Search Input */}
        <div className="px-5 py-4 border-b border-[#E9E1DC] flex items-center gap-3 bg-[#FCF8F6]">
          <Search className="w-4 h-4 text-brand-burgundy shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari proker, surat, mitra, atau menu sesuai hak akses Anda..."
            className="flex-1 bg-transparent text-sm text-wine-950 placeholder:text-neutral-light focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E1DC] flex items-center justify-center text-neutral-dark hover:text-brand-burgundy"
            aria-label="Tutup pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-5 py-2.5 border-b border-[#E9E1DC] flex flex-wrap items-center gap-1.5 text-[11px]">
          {[
            { id: "all", label: "Semua" },
            { id: "modules", label: "Menu & Layanan" },
            { id: "projects", label: "Proker" },
            ...(canSeeLetters ? [{ id: "correspondence", label: "Persuratan" }] : []),
            ...(canSeeFinance ? [{ id: "finance", label: "Keuangan" }] : []),
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as CategoryType)}
              className={`px-3 py-1 rounded-full font-semibold transition-colors ${
                activeCategory === cat.id
                  ? "bg-brand-burgundy text-white"
                  : "bg-[#FCF8F6] text-neutral-dark hover:text-wine-950"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto p-2.5 space-y-1">
          {filtered.length > 0 ? (
            filtered.slice(0, 12).map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl transition-colors ${
                    selectedIndex === idx
                      ? "bg-[#FCF8F6] border border-[#E8B577]/45"
                      : "hover:bg-[#FCF8F6] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <strong className="text-xs font-semibold text-wine-950 block truncate">
                        {item.title}
                      </strong>
                      <span className="text-[11px] text-neutral-dark block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-neutral-dark">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-light" />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="py-10 text-center space-y-2 text-xs text-neutral-dark">
              <Sparkles className="w-6 h-6 text-[#AF7D66] mx-auto" />
              <p>Tidak ditemukan hasil yang sesuai dengan hak akses akun Anda.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[#E9E1DC] bg-[#FCF8F6] flex items-center justify-between text-[10px] text-neutral-light font-mono">
          <span className="inline-flex items-center gap-1">
            <Command className="w-3 h-3" />
            Menampilkan data sesuai izin: {permissions.roleBadgeTitle}
          </span>
          <span>ESC untuk tutup</span>
        </div>
      </div>
    </div>
  );
}
