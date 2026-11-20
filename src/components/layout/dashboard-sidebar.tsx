"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { formatRoleLabel } from "@/lib/personal/labels";
import {
  LayoutDashboard,
  User,
  Shield,
  Award,
  Briefcase,
  Building,
  Calendar,
  Mail,
  Wallet,
  CalendarCheck,
  QrCode,
  FileText,
  Users,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FolderKanban,
  CheckCircle2,
  X,
  Compass,
  SlidersHorizontal,
  Handshake,
  Store,
  Newspaper,
  Megaphone,
  MessageSquareHeart,
  BarChart3,
  Layers,
  ClipboardList,
  ArrowLeftRight,
  History,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface DashboardSidebarProps {
  currentArea: "personal" | "organization" | "admin" | "workspace";
  onCloseMobile?: () => void;
  isMobileDrawer?: boolean;
}

export function DashboardSidebar({
  currentArea,
  onCloseMobile,
  isMobileDrawer,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const [collapsed, setCollapsed] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [activeQueryTab, setActiveQueryTab] = useState<string>("overview");

  useEffect(() => {
    const syncTab = () => {
      if (typeof window === "undefined") return;
      const sp = new URLSearchParams(window.location.search);
      setActiveQueryTab(sp.get("tab") || "overview");
    };
    syncTab();
    window.addEventListener("popstate", syncTab);
    window.addEventListener("hipmi-project-tab-change", syncTab);
    return () => {
      window.removeEventListener("popstate", syncTab);
      window.removeEventListener("hipmi-project-tab-change", syncTab);
    };
  }, [pathname]);

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const cabId = activeCab?.id || "cab-arthakarsa-2627";

  const isCollapsed = !isMobileDrawer && collapsed;

  // Detect active workspace entity from pathname if inside /workspace/*
  const projectMatch = pathname.match(/^\/workspace\/projects\/([^/]+)/);
  const unitMatch = pathname.match(/^\/workspace\/(?!projects\/)([^/]+)/);
  const activeProjectId = projectMatch?.[1] || (permissions.isPureProjectManager ? permissions.managedProjectIds[0] : null);
  const activeUnitId = unitMatch?.[1] || null;

  const activeProject = activeProjectId
    ? store.projects.find((p) => p.id === activeProjectId)
    : null;
  const activeField = activeUnitId
    ? store.fields.find((f) => f.id === activeUnitId)
    : null;
  const activeCompartment = activeUnitId
    ? store.compartments.find((c) => c.id === activeUnitId)
    : null;

  // Should we show a compact Context Switcher in the sidebar?
  // Only when user has multiple contexts (e.g., Staff/Kakom who also manages projects, or Pure Manager with >1 project)
  const switcherOptions: { label: string; sub: string; href: string; type: string }[] = [];
  if (currentArea === "organization" || currentArea === "workspace") {
    if (!permissions.isPureProjectManager) {
      switcherOptions.push({
        label: "Organisasi (Umum)",
        sub: permissions.roleBadgeTitle,
        href: "/organization/dashboard",
        type: "ORG",
      });
    }
    permissions.assignedWorkspaces.forEach((ws) => {
      switcherOptions.push({
        label: ws.name,
        sub: ws.roleTitle,
        href: ws.href,
        type: ws.type === "field" ? "BIDANG" : ws.type === "compartment" ? "UNIT" : "PROKER",
      });
    });
  }

  const showContextSwitcher =
    (currentArea === "organization" || currentArea === "workspace") &&
    !permissions.isTopManagement &&
    !permissions.isSekum &&
    !permissions.isBendum &&
    switcherOptions.length > 1;

  // Smart active route matching
  const isItemActive = (itemHref: string) => {
    const [cleanHref, queryPart] = itemHref.split("?");
    if (queryPart && pathname === cleanHref) {
      const targetTab = new URLSearchParams(queryPart).get("tab") || "overview";
      return activeQueryTab === targetTab;
    }
    if (pathname === cleanHref) return true;

    if (cleanHref === "/personal/dashboard") {
      return pathname === "/personal/dashboard" || pathname === "/personal";
    }
    if (cleanHref === "/personal/profil") {
      return pathname === "/personal/profil" || pathname.startsWith("/personal/profil/");
    }
    if (cleanHref === "/personal/keanggotaan") {
      return (
        pathname === "/personal/keanggotaan" ||
        pathname.startsWith("/personal/keanggotaan/") ||
        pathname === "/personal/riwayat-jabatan" ||
        pathname === "/personal/bisnis" ||
        pathname.startsWith("/personal/bisnis/")
      );
    }
    if (cleanHref === "/personal/aktivitas") {
      return (
        pathname === "/personal/aktivitas" ||
        pathname.startsWith("/personal/aktivitas/") ||
        pathname === "/personal/tiket" ||
        pathname === "/personal/presensi"
      );
    }
    if (cleanHref === "/organization/dashboard") {
      return pathname === "/organization/dashboard" || pathname === "/organisasi/dashboard";
    }
    if (cleanHref === "/admin/cabinets") {
      return (
        pathname === "/admin/cabinets" ||
        pathname === "/admin" ||
        pathname === "/admin/kabinet" ||
        pathname === "/admin/cabinets/form"
      );
    }
    if (cleanHref === `/admin/cabinets/${cabId}` || cleanHref === "/admin/cabinets/cab-arthakarsa-2627") {
      return (
        pathname === `/admin/cabinets/${cabId}` ||
        pathname === "/admin/cabinets/cab-arthakarsa-2627" ||
        pathname === "/admin/dashboard"
      );
    }

    // Avoid prefix collisions on workspace root links
    if (cleanHref.startsWith("/workspace/")) {
      return pathname === cleanHref;
    }

    if (pathname.startsWith(cleanHref + "/")) {
      return true;
    }

    return false;
  };

  // Build dynamic role-based navigation sections strictly following Master Blueprint
  const getNavSections = (): NavSection[] => {
    // 1. PERSONAL AREA (Baseline 06.4.2: 4 menus Mahasiswa Biasa / 5 menus Kader)
    if (currentArea === "personal") {
      const items: NavItem[] = [
        { label: "Dashboard Saya", href: "/personal/dashboard", icon: LayoutDashboard },
        { label: "Profil Saya", href: "/personal/profil", icon: User },
      ];

      if (permissions.canAccessKeanggotaan) {
        items.push({
          label: "Keanggotaan",
          href: "/personal/keanggotaan",
          icon: Award,
          badge: "Kader",
        });
      }

      items.push(
        { label: "Aktivitas Saya", href: "/personal/aktivitas", icon: Compass },
        { label: "Pengaturan Akun", href: "/personal/keamanan", icon: SlidersHorizontal }
      );

      const sections: NavSection[] = [{ title: "Personal Area", items }];

      const extraAccess: NavItem[] = [];
      if (permissions.canAccessOrganization) {
        extraAccess.push({
          label: permissions.isPureProjectManager ? "Ruang Kerja Proker" : "Organization Management",
          href: permissions.isPureProjectManager
            ? permissions.primaryWorkspaceHref || "/workspace/projects/proj-business-expo"
            : "/organization/dashboard",
          icon: permissions.isPureProjectManager ? FolderKanban : Building,
        });
      }
      if (permissions.canAccessAdmin) {
        extraAccess.push({
          label: "Admin Panel",
          href: "/admin/cabinets",
          icon: Shield,
        });
      }
      if (extraAccess.length > 0) {
        sections.push({ title: "Akses Tambahan", items: extraAccess });
      }

      return sections;
    }

    // 2. PURE PROJECT MANAGER OR ACTIVE PROJECT WORKSPACE SIDEBAR
    if (
      (currentArea === "workspace" && activeProject) ||
      (permissions.isPureProjectManager && (currentArea === "organization" || currentArea === "workspace"))
    ) {
      const projId = activeProject?.id || permissions.managedProjectIds[0] || "proj-business-expo";
      const projSections: NavSection[] = [
        {
          title: "Workspace Proker",
          items: [
            { label: "Ringkasan & Progres", href: `/workspace/projects/${projId}?tab=overview`, icon: LayoutDashboard },
            { label: "Tim & Roster Panitia", href: `/workspace/projects/${projId}?tab=roster`, icon: Users },
            { label: "Agenda, Tiket & Presensi", href: `/workspace/projects/${projId}?tab=events`, icon: CalendarCheck },
            { label: "Persuratan Proker", href: `/workspace/projects/${projId}?tab=letters`, icon: Mail },
            { label: "Keuangan & RAB Proker", href: `/workspace/projects/${projId}?tab=finance`, icon: Wallet },
            { label: "Dokumen & LPJ", href: `/workspace/projects/${projId}?tab=lpj`, icon: FileText },
            { label: "Riwayat & Audit", href: `/workspace/projects/${projId}?tab=history`, icon: History },
            { label: "Kalender Proker", href: `/workspace/${projId}/calendar`, icon: Calendar },
          ],
        },
        {
          title: "Referensi Eksternal",
          items: [
            {
              label: "Direktori Sponsor & Mitra",
              href: "/organization/directory/companies",
              icon: Handshake,
              badge: "Mitra",
            },
          ],
        },
      ];

      // Kakom gets Manager Assignment & Proker Closure shortcuts when inspecting their own project
      if (permissions.isKakom) {
        projSections[0].items.push(
          { label: "Atur Pengelola Proker", href: `/workspace/projects/${projId}/managers`, icon: Briefcase },
          { label: "Penutupan & Arsip", href: `/workspace/projects/${projId}/closure`, icon: Shield }
        );
      }

      if (!permissions.isPureProjectManager) {
        projSections.push({
          title: "Kembali ke Organisasi",
          items: [
            { label: "Dashboard Organisasi", href: "/organization/dashboard", icon: Building },
          ],
        });
      }

      return projSections;
    }

    // 3. ORGANIZATION & UNIT WORKSPACE SIDEBAR (Dynamic across 6 Organizational Role Profiles — ZERO generic "CMS"!)
    if (currentArea === "organization" || currentArea === "workspace") {
      const profile = permissions.orgRoleProfile;

      // 3A. TOP MANAGEMENT (Ketum, Waketum, Sekjen -> 1 unified executive profile)
      if (profile === "top_management") {
        return [
          {
            title: "Eksekutif & Monitoring",
            items: [
              { label: "Dashboard Eksekutif", href: "/organization/dashboard", icon: LayoutDashboard },
              { label: "Pusat Tindakan & Approval", href: "/organization/action-center", icon: CheckCircle2 },
              { label: "Struktur & Monitoring Unit", href: "/organization/structure", icon: Building },
              { label: "Kalender Organisasi", href: "/organization/calendar", icon: Calendar },
              { label: "Agenda & Event", href: "/organization/events", icon: CalendarCheck },
            ],
          },
          {
            title: "Pantau Operasional",
            items: [
              { label: "Persuratan & Ditmawa", href: "/organization/correspondence", icon: Mail },
              { label: "Keuangan & Kas", href: "/organization/finance", icon: Wallet },
              { label: "Dokumen & LPJ", href: "/organization/documents", icon: FileText },
              { label: "Statistik & Laporan", href: "/organization/reports", icon: BarChart3 },
            ],
          },
          {
            title: "Pantau 7 Layanan Khusus",
            items: [
              { label: "Direktori Sponsor & Mitra", href: "/organization/directory/companies", icon: Handshake },
              { label: "Database Kader", href: "/organization/directory/cadres", icon: Users },
              { label: "Pengelolaan Bisnis Kader", href: "/organization/directory/businesses", icon: Store },
              { label: "Kader Berprestasi", href: "/organization/cms/achievements", icon: Award },
              { label: "Media Partner", href: "/organization/cms/medpart", icon: Megaphone },
              { label: "Berita & Artikel", href: "/organization/cms/articles", icon: Newspaper },
              { label: "Kotak Suara", href: "/organization/cms/feedback", icon: MessageSquareHeart },
            ],
          },
        ];
      }

      // 3B. SEKRETARIS UMUM (Sekum)
      if (profile === "sekum") {
        return [
          {
            title: "Pusat Administrasi",
            items: [
              { label: "Dashboard Administrasi", href: "/organization/dashboard", icon: LayoutDashboard },
              { label: "Pusat Tindakan (Surat)", href: "/organization/action-center", icon: CheckCircle2 },
              { label: "Persuratan & Ditmawa", href: "/organization/correspondence", icon: Mail },
              { label: "Arsip Dokumen & LPJ", href: "/organization/documents", icon: FileText },
              { label: "Kalender Organisasi", href: "/organization/calendar", icon: Calendar },
            ],
          },
          {
            title: "Pantau & Referensi",
            items: [
              { label: "Struktur & Unit", href: "/organization/structure", icon: Building },
              { label: "Direktori Sponsor & Mitra", href: "/organization/directory/companies", icon: Handshake },
              { label: "Database Kader", href: "/organization/directory/cadres", icon: Users },
              { label: "Berita & Artikel", href: "/organization/cms/articles", icon: Newspaper },
              { label: "Kotak Suara", href: "/organization/cms/feedback", icon: MessageSquareHeart },
            ],
          },
        ];
      }

      // 3C. BENDAHARA UMUM (Bendum)
      if (profile === "bendum") {
        return [
          {
            title: "Pusat Keuangan",
            items: [
              { label: "Dashboard Keuangan", href: "/organization/dashboard", icon: LayoutDashboard },
              { label: "Pusat Tindakan (RAB)", href: "/organization/action-center", icon: CheckCircle2 },
              { label: "Buku Kas & Transaksi", href: "/organization/finance", icon: Wallet },
              { label: "Pengajuan Dana & Pencairan", href: "/organization/finance/requests", icon: ClipboardList },
              { label: "Pendapatan Tiket & Medpart", href: "/organization/finance/revenue", icon: BarChart3 },
              { label: "Laporan Keuangan", href: "/organization/finance/reports", icon: FileText },
            ],
          },
          {
            title: "Pantau & Referensi",
            items: [
              { label: "Kalender Organisasi", href: "/organization/calendar", icon: Calendar },
              { label: "Media Partner (Berbayar)", href: "/organization/cms/medpart", icon: Megaphone },
              { label: "Direktori Sponsor & Mitra", href: "/organization/directory/companies", icon: Handshake },
            ],
          },
        ];
      }

      // 3D. KEPALA BIDANG (Kabid)
      if (profile === "kabid") {
        const fId = activeField?.id || permissions.managedFieldId || "field-demo-01";
        return [
          {
            title: "Monitoring Bidang",
            items: [
              { label: "Dashboard Bidang", href: "/organization/dashboard", icon: LayoutDashboard },
              { label: "Kompartemen & Proker", href: `/workspace/${fId}`, icon: Layers },
              { label: "Kalender Bertingkat", href: "/organization/calendar", icon: Calendar },
              { label: "Struktur Kabinet", href: "/organization/structure", icon: Building },
            ],
          },
          {
            title: "Pantau Operasional Bidang",
            items: [
              { label: "Agenda & Event", href: "/organization/events", icon: CalendarCheck },
              { label: "Persuratan Bidang", href: "/organization/correspondence", icon: Mail },
              { label: "Keuangan Bidang", href: "/organization/finance", icon: Wallet },
              { label: "Dokumen & LPJ", href: "/organization/documents", icon: FileText },
              { label: "Direktori Sponsor & Mitra", href: "/organization/directory/companies", icon: Handshake },
            ],
          },
        ];
      }

      // 3E. KEPALA KOMPARTEMEN (Kakom)
      if (profile === "kakom") {
        const cId = activeCompartment?.id || permissions.managedCompartmentId || "comp-demo-01";
        return [
          {
            title: "Workspace Kompartemen",
            items: [
              { label: "Dashboard Kompartemen", href: "/organization/dashboard", icon: LayoutDashboard },
              { label: "Program Kerja Unit", href: `/workspace/${cId}`, icon: FolderKanban },
              { label: "Pleno & Aktivitas Unit", href: `/workspace/${cId}/pleno`, icon: ClipboardList },
              { label: "Kalender Bertingkat", href: "/organization/calendar", icon: Calendar },
            ],
          },
          {
            title: "Operasional & Pengajuan",
            items: [
              { label: "Agenda & Event Unit", href: "/organization/events", icon: CalendarCheck },
              { label: "Persuratan Unit", href: "/organization/correspondence", icon: Mail },
              { label: "Keuangan & RAB Unit", href: "/organization/finance", icon: Wallet },
              { label: "Dokumen & LPJ Unit", href: "/organization/documents", icon: FileText },
              { label: "Direktori Sponsor & Mitra", href: "/organization/directory/companies", icon: Handshake },
            ],
          },
        ];
      }

      // 3F. STAFF ORGANISASI (Dynamic Service Modules strictly assigned by Admin!)
      const staffCore: NavItem[] = [
        { label: "Dashboard Tugas", href: "/organization/dashboard", icon: LayoutDashboard },
        { label: "Kalender Organisasi", href: "/organization/calendar", icon: Calendar },
      ];
      if (permissions.managedCompartmentId) {
        staffCore.push({
          label: "Workspace Kompartemen",
          href: `/workspace/${permissions.managedCompartmentId}`,
          icon: FolderKanban,
        });
      }

      const staffServices: NavItem[] = [
        {
          label: "Direktori Sponsor & Mitra",
          href: "/organization/directory/companies",
          icon: Handshake,
        },
      ];

      if (permissions.canManageCadres) {
        staffServices.push({
          label: "Database Kader",
          href: "/organization/directory/cadres",
          icon: Users,
        });
      }
      if (permissions.canManagePartnerships) {
        staffServices.push({
          label: "Pengelolaan Bisnis Kader",
          href: "/organization/directory/businesses",
          icon: Store,
        });
      }
      if (permissions.canReviewMedpart || permissions.canPublishMedpart) {
        staffServices.push({
          label: "Media Partner",
          href: "/organization/cms/medpart",
          icon: Megaphone,
        });
      }
      if (permissions.canCreateContent || permissions.canPublishContent) {
        staffServices.push(
          { label: "Berita & Artikel", href: "/organization/cms/articles", icon: Newspaper },
          { label: "Kader Berprestasi", href: "/organization/cms/achievements", icon: Award }
        );
      }
      if (permissions.canManageFeedback) {
        staffServices.push({
          label: "Kotak Suara",
          href: "/organization/cms/feedback",
          icon: MessageSquareHeart,
        });
      }
      if (permissions.canManageEvents || permissions.canVerifyTicketPayment || permissions.canScanAttendance) {
        staffServices.push(
          { label: "Agenda & Event", href: "/organization/events", icon: CalendarCheck },
          { label: "Presensi & Scanner QR", href: "/organization/events/evt-business-expo/check-in", icon: QrCode }
        );
      }
      if (permissions.canCreateLetter) {
        staffServices.push({
          label: "Persuratan Unit",
          href: "/organization/correspondence",
          icon: Mail,
        });
      }
      if (permissions.canCreateFundRequest) {
        staffServices.push({
          label: "Keuangan & RAB Unit",
          href: "/organization/finance",
          icon: Wallet,
        });
      }
      if (permissions.canReviewLPJ) {
        staffServices.push({
          label: "Dokumen & Review LPJ",
          href: "/organization/documents",
          icon: FileText,
        });
      }

      return [
        { title: "Ruang Tugas", items: staffCore },
        { title: "Layanan & Referensi", items: staffServices },
      ];
    }

    // 4. ADMIN PANEL
    if (currentArea === "admin") {
      return [
        {
          title: "Kabinet & Struktur",
          items: [
            { label: "Pusat Kabinet", href: "/admin/cabinets", icon: Building },
            { label: "Dasbor Kabinet", href: `/admin/cabinets/${cabId}`, icon: LayoutDashboard },
            { label: "Struktur Organisasi", href: `/admin/cabinets/${cabId}/structure`, icon: FolderKanban },
            { label: "Master Jabatan", href: `/admin/cabinets/${cabId}/positions`, icon: Briefcase },
          ],
        },
        {
          title: "Akun & Keamanan",
          items: [
            { label: "Manajemen Pengguna", href: `/admin/cabinets/${cabId}/users`, icon: Users },
            { label: "Peran & Hak Akses", href: `/admin/cabinets/${cabId}/permissions`, icon: Shield },
            { label: "Verifikasi Kader PSDM", href: "/organization/directory/cadres/verification", icon: Award },
          ],
        },
        {
          title: "Sistem & Konfigurasi",
          items: [
            { label: "Konfigurasi Modul", href: `/admin/cabinets/${cabId}/modules`, icon: Settings },
            { label: "Log Audit Sistem", href: `/admin/cabinets/${cabId}/audit`, icon: ShieldAlert },
            { label: "Validasi Arsip", href: `/admin/cabinets/${cabId}/archive`, icon: Building },
          ],
        },
      ];
    }

    return [];
  };

  const navSections = getNavSections();
  const layoutPrefix = isMobileDrawer ? "mobile-sidebar" : "desktop-sidebar";

  const activeContextLabel = activeProject
    ? activeProject.name
    : activeField
    ? activeField.name
    : activeCompartment
    ? activeCompartment.name
    : permissions.isPureProjectManager
    ? permissions.roleScopeSubtitle
    : "Organisasi (Umum)";

  return (
    <aside
      className={`bg-gradient-to-b from-[#3D0F16] via-[#340C12] to-[#26080D] text-neutral-100 border-r border-[#E8B577]/15 flex flex-col justify-between transition-[width] duration-300 ease-out z-30 shrink-0 select-none ${
        isMobileDrawer ? "h-full w-full" : "h-dvh"
      } ${isCollapsed ? "w-[78px]" : "w-[268px]"}`}
    >
      {/* Top Brand Header */}
      <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
        <Link
          href="/"
          onClick={onCloseMobile}
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-9 h-9 relative rounded-xl overflow-hidden shadow-md border border-[#E8B577]/45 bg-white p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Image
              src="/assets/assets_logo/logo_hipmi.png"
              alt="Logo HIPMI Telkom"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-serif font-bold text-xs text-[#F5D6A8] tracking-[0.14em] leading-tight">
                HIPMI CENTRAL
              </span>
              <span className="text-[10px] text-[#E8B577]/75 uppercase tracking-widest font-mono mt-0.5 truncate">
                {currentArea === "personal"
                  ? "Area Pribadi"
                  : currentArea === "admin"
                  ? "Pengelola Sistem"
                  : permissions.isPureProjectManager
                  ? "Ruang Kerja Proker"
                  : "Area Organisasi"}
              </span>
            </div>
          )}
        </Link>

        {isMobileDrawer ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:text-[#E8B577] hover:bg-white/10 transition-colors active:scale-95"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-[#E8B577] hover:bg-white/10 transition-colors shrink-0"
            title={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
            aria-label={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Role Identity & Scope Card (Shown in Organization & Workspace contexts) */}
      {!isCollapsed && (currentArea === "organization" || currentArea === "workspace") && (
        <div className="px-3 pt-3 pb-1 shrink-0 space-y-2">
          <div className="p-3 rounded-2xl bg-white/[0.06] border border-[#E8B577]/25 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-[#E8B577] font-bold">
                Jabatan Aktif
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
            <strong className="text-xs font-serif font-bold text-white block leading-snug truncate">
              {permissions.roleBadgeTitle}
            </strong>
            <span className="text-[11px] text-white/70 block truncate">
              {activeProject ? activeProject.name : permissions.roleScopeSubtitle}
            </span>
          </div>

          {/* Compact Context Switcher inside Sidebar (ONLY when user holds >1 context) */}
          {showContextSwitcher && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setContextMenuOpen((prev) => !prev)}
                className="w-full px-3 py-2 rounded-xl bg-[#E8B577]/15 hover:bg-[#E8B577]/22 border border-[#E8B577]/35 flex items-center justify-between gap-2 text-left transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#E8B577] shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono uppercase text-[#E8B577]/85 block leading-none">
                      Pindah Konteks
                    </span>
                    <span className="text-[11px] font-semibold text-white block truncate mt-0.5">
                      {activeContextLabel}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#E8B577] shrink-0 transition-transform ${
                    contextMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {contextMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="mt-1.5 p-1.5 rounded-2xl bg-[#26080D] border border-[#E8B577]/30 shadow-xl space-y-1"
                  >
                    {switcherOptions.map((opt) => (
                      <Link
                        key={opt.href}
                        href={opt.href}
                        onClick={() => {
                          setContextMenuOpen(false);
                          onCloseMobile?.();
                        }}
                        className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="text-[11px] font-semibold text-white block truncate">
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-white/60 block truncate">
                            {opt.sub}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E8B577]/20 text-[#E8B577] font-bold shrink-0">
                          {opt.type}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Navigation Sections with Framer Motion Sliding Active Indicator */}
      <nav
        className="flex-1 px-3 py-3 space-y-5 overflow-y-auto min-h-0"
        aria-label="Navigasi Dashboard"
      >
        {navSections.map((section, idx) => (
          <div key={section.title + idx} className="space-y-1.5">
            {!isCollapsed && (
              <p className="px-3 text-[10px] uppercase font-mono font-bold tracking-[0.16em] text-[#E8B577]/65">
                {section.title}
              </p>
            )}
            <div className="space-y-1 relative">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item.href);

                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={(e) => {
                      const [cleanHref, queryPart] = item.href.split("?");
                      if (queryPart && pathname === cleanHref) {
                        e.preventDefault();
                        const targetTab = new URLSearchParams(queryPart).get("tab") || "overview";
                        setActiveQueryTab(targetTab);
                        if (typeof window !== "undefined") {
                          window.history.replaceState(null, "", item.href);
                          window.dispatchEvent(
                            new CustomEvent("hipmi-project-tab-change", { detail: targetTab })
                          );
                        }
                      }
                      onCloseMobile?.();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`relative flex items-center ${
                      isCollapsed ? "justify-center px-0" : "justify-between px-3.5"
                    } py-2.5 min-h-[42px] rounded-xl text-xs font-medium transition-colors group`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`${layoutPrefix}-active-pill`}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E8B577]/22 via-[#E8B577]/14 to-transparent border border-[#E8B577]/35 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                        aria-hidden="true"
                      />
                    )}

                    {isActive && (
                      <motion.span
                        layoutId={`${layoutPrefix}-active-rail`}
                        transition={{
                          type: "spring",
                          stiffness: 460,
                          damping: 34,
                        }}
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#E8B577] shadow-[0_0_10px_rgba(232,181,119,0.75)]"
                        aria-hidden="true"
                      />
                    )}

                    <div
                      className={`relative z-10 flex items-center gap-3 min-w-0 ${
                        isActive
                          ? "text-[#FFF6E8] font-semibold"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`w-[17px] h-[17px] shrink-0 transition-transform duration-200 ${
                          isActive
                            ? "text-[#E8B577] scale-105"
                            : "text-white/55 group-hover:text-[#E8B577]/90 group-hover:translate-x-0.5"
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`relative z-10 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                          isActive
                            ? "bg-[#E8B577] text-[#3D0F16] font-bold"
                            : "bg-white/10 text-[#E8B577]/90"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar User Profile Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20 shrink-0">
        <Link
          href="/personal/profil"
          onClick={onCloseMobile}
          className={`flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/10 transition-colors overflow-hidden ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-burgundy to-[#6E1F2D] text-[#F5D6A8] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#E8B577]/40 shadow-sm">
            {currentUser.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate min-w-0">
              <span className="text-xs font-semibold text-white truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-[#E8B577]/85 truncate">
                {formatRoleLabel(currentUser.base_role)}
              </span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
