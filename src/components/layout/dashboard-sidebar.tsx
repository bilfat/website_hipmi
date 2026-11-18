"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  LayoutDashboard,
  User,
  Shield,
  Award,
  Briefcase,
  Ticket,
  Bell,
  Building,
  Calendar,
  Mail,
  Wallet,
  CalendarCheck,
  QrCode,
  FileText,
  Users,
  Globe,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  CheckCircle2,
  X
} from "lucide-react";

interface DashboardSidebarProps {
  currentArea: "personal" | "organization" | "admin" | "workspace";
  onCloseMobile?: () => void;
  isMobileDrawer?: boolean;
}

export function DashboardSidebar({ currentArea, onCloseMobile, isMobileDrawer }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);
  const [collapsed, setCollapsed] = useState(false);

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const cabId = activeCab?.id || "cab-arthakarsa-2627";

  // Check if a link is active without ambiguous prefix collision
  const isItemActive = (itemHref: string) => {
    // Exact match is always active
    if (pathname === itemHref) return true;

    // Cabinet Center (ADM-01) - only active on cabinet listing/selection/form
    if (itemHref === "/admin/cabinets") {
      return (
        pathname === "/admin/cabinets" ||
        pathname === "/admin" ||
        pathname === "/admin/kabinet" ||
        pathname === "/admin/cabinets/form"
      );
    }

    // Cabinet Root Dashboard (ADM-02) - only active on cabinet root or direct dashboard alias
    if (itemHref === `/admin/cabinets/${cabId}` || itemHref === "/admin/cabinets/cab-arthakarsa-2627") {
      return (
        pathname === `/admin/cabinets/${cabId}` ||
        pathname === "/admin/cabinets/cab-arthakarsa-2627" ||
        pathname === "/admin/dashboard"
      );
    }

    // General Root Dashboards
    if (itemHref === "/personal/dashboard") {
      return pathname === "/personal/dashboard" || pathname === "/personal";
    }
    if (itemHref === "/organization/dashboard") {
      return pathname === "/organization/dashboard" || pathname === "/organisasi/dashboard";
    }

    // Sub-module routes (e.g. /admin/cabinets/.../structure or /organization/correspondence/...)
    // Active if current path starts with itemHref + "/"
    if (pathname.startsWith(itemHref + "/")) {
      return true;
    }

    return false;
  };

  // Generate menu items based on area & permissions
  const getNavSections = () => {
    if (currentArea === "personal") {
      const items = [
        { label: "Dashboard", href: "/personal/dashboard", icon: LayoutDashboard },
        { label: "Profil Saya", href: "/personal/profil", icon: User },
        { label: "Keamanan Akun", href: "/personal/keamanan", icon: Shield }
      ];

      // Kader only menus
      if (permissions.canAccessKeanggotaan) {
        items.push(
          { label: "Keanggotaan Kader", href: "/personal/keanggotaan", icon: Award },
          { label: "Riwayat Jabatan", href: "/personal/riwayat-jabatan", icon: Briefcase }
        );
      }

      // General member & cadre menus
      items.push(
        { label: "Aktivitas Proker Saya", href: "/personal/aktivitas", icon: FolderKanban },
        { label: "Tiket & Registrasi", href: "/personal/tiket", icon: Ticket },
        { label: "Presensi & Sertifikat", href: "/personal/presensi", icon: CalendarCheck }
      );

      // Kader business menus
      if (permissions.canAccessKeanggotaan) {
        items.push(
          { label: "Bisnis Saya", href: "/personal/bisnis", icon: Briefcase }
        );
      }

      items.push(
        { label: "Notifikasi Saya", href: "/personal/notifikasi", icon: Bell }
      );

      return [{ title: "Area Personal", items }];
    }

    if (currentArea === "organization" || currentArea === "workspace") {
      const generalItems = [
        { label: "Overview Organisasi", href: "/organization/dashboard", icon: LayoutDashboard },
        { label: "Struktur Kabinet", href: "/organization/structure", icon: Building },
        { label: "Action & Approval Center", href: "/organization/action-center", icon: CheckCircle2 },
        { label: "Kalender & Agenda", href: "/organization/calendar", icon: Calendar }
      ];

      const opItems = [
        { label: "Persuratan Sentral", href: "/organization/correspondence", icon: Mail },
        { label: "Keuangan & Kas", href: "/organization/finance", icon: Wallet },
        { label: "Manajemen Event", href: "/organization/events", icon: CalendarCheck },
        { label: "Presensi & Scanner", href: "/organization/events/evt-business-expo/check-in", icon: QrCode },
        { label: "Dokumen & LPJ", href: "/organization/documents", icon: FileText },
        { label: "Direktori & Mitra", href: "/organization/directory/cadres", icon: Users },
        { label: "CMS Portal Web", href: "/organization/cms", icon: Globe },
        { label: "Laporan & Statistik", href: "/organization/reports", icon: LayoutDashboard }
      ];

      return [
        { title: "Dashboard Utama", items: generalItems },
        { title: "Modul & Tata Kelola Operasional", items: opItems }
      ];
    }

    if (currentArea === "admin") {
      return [
        {
          title: "Kabinet & Struktur",
          items: [
            { label: "Cabinet Center", href: "/admin/cabinets", icon: Building },
            { label: "Dashboard Kabinet", href: `/admin/cabinets/${cabId}`, icon: LayoutDashboard },
            { label: "Struktur Organisasi", href: `/admin/cabinets/${cabId}/structure`, icon: FolderKanban },
            { label: "Master Jabatan", href: `/admin/cabinets/${cabId}/positions`, icon: Briefcase }
          ]
        },
        {
          title: "Akun & Keamanan",
          items: [
            { label: "Manajemen Pengguna", href: `/admin/cabinets/${cabId}/users`, icon: Users },
            { label: "Role & Permission", href: `/admin/cabinets/${cabId}/permissions`, icon: Shield },
            { label: "Verifikasi Kader PSDM", href: "/organization/directory/cadres/verification", icon: Award }
          ]
        },
        {
          title: "Sistem & Konfigurasi",
          items: [
            { label: "Konfigurasi Modul", href: `/admin/cabinets/${cabId}/modules`, icon: Settings },
            { label: "Log Audit Sistem", href: `/admin/cabinets/${cabId}/audit`, icon: ShieldAlert },
            { label: "Validasi Arsip", href: `/admin/cabinets/${cabId}/archive`, icon: Building }
          ]
        }
      ];
    }

    return [];
  };

  const navSections = getNavSections();

  return (
    <aside
      className={`bg-brand-darkWine text-neutral-100 border-r border-wine-800/80 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        isMobileDrawer ? "h-full w-full" : "h-screen sticky top-0"
      } ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Top Header */}
      <div className="p-4 border-b border-wine-800/80 flex items-center justify-between shrink-0">
        <Link href="/" onClick={onCloseMobile} className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 relative rounded-xl overflow-hidden shadow-sm border border-gold-400/40 bg-white p-1 flex items-center justify-center shrink-0">
            <Image
              src="/assets/assets_logo/logo_hipmi.png"
              alt="Logo HIPMI Telkom"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-serif font-bold text-xs text-gold-200 tracking-wider">
                HIPMI CENTRAL
              </span>
              <span className="text-xs text-gold-300/80 uppercase tracking-widest font-mono">
                {currentArea === "personal"
                  ? "Personal Area"
                  : currentArea === "admin"
                  ? "Admin Panel"
                  : "Organization"}
              </span>
            </div>
          )}
        </Link>

        {isMobileDrawer ? (
          <button
            type="button"
            onClick={onCloseMobile}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-neutral-400 hover:text-gold-300 hover:bg-wine-900/60 transition-colors active:scale-95"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-neutral-400 hover:text-gold-300 hover:bg-wine-900/60 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 p-3 space-y-6 overflow-y-auto min-h-0">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {!collapsed && (
              <p className="px-3 text-xs uppercase font-mono font-bold tracking-wider text-gold-300/80">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 px-3 py-2.5 min-h-[42px] rounded-xl text-xs font-medium transition-all group active:scale-[0.99] ${
                      isActive
                        ? "bg-gold-500/20 text-gold-200 border border-gold-500/40 shadow-sm"
                        : "text-neutral-300 hover:text-white hover:bg-wine-900/50 active:bg-wine-900/70"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? "text-gold-400" : "text-neutral-400 group-hover:text-gold-300"
                      }`}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User profile footer in sidebar */}
      <div className="p-3 border-t border-wine-800/80 bg-wine-950/60 shrink-0">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-brand-burgundy text-gold-300 font-bold text-xs flex items-center justify-center shrink-0 border border-gold-500/30">
            {currentUser.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate text-xs">
              <span className="font-semibold text-white truncate">{currentUser.name}</span>
              <span className="text-xs text-gold-200/80 font-mono">
                {currentUser.demo_id} • {currentUser.base_role}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
