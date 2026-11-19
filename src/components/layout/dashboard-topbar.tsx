"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMockStore, setCurrentUserId } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { CommandPalette } from "@/components/layout/command-palette";
import { 
  Building, 
  User, 
  Shield, 
  FolderKanban, 
  Bell, 
  ChevronDown, 
  ExternalLink,
  Search,
  CheckCircle2,
  LogOut,
  Sparkles,
  Menu
} from "lucide-react";

interface DashboardTopbarProps {
  currentArea: "personal" | "organization" | "admin" | "workspace";
  onToggleMobileSidebar?: () => void;
}

export function DashboardTopbar({ currentArea, onToggleMobileSidebar }: DashboardTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global Command Palette Shortcut (⌘K / Ctrl+K / /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (e.key === "/" && (e.target as HTMLElement)?.tagName !== "INPUT" && (e.target as HTMLElement)?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadNotificationsCount = store.notifications.filter(
    (n) => (!n.user_id || n.user_id === currentUser.id) && !n.read
  ).length;

  return (
    <header className="bg-surface-card border-b border-wine-950/10 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      {/* Left: Hamburger & Area Switcher */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="min-h-[44px] min-w-[44px] -ml-1 rounded-xl text-neutral-dark hover:text-brand-burgundy hover:bg-surface-ivory md:hidden transition-colors flex items-center justify-center active:scale-95"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Area Switcher Segmented Control */}
        <div className="flex items-center p-1 rounded-xl bg-surface-ivory border border-wine-950/10 text-xs">
          <Link
            href="/personal/dashboard"
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentArea === "personal"
                ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                : "text-neutral-dark hover:text-neutral-black"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pribadi</span>
          </Link>

          {permissions.canAccessOrganization && (
            <Link
              href="/organization/dashboard"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentArea === "organization" || currentArea === "workspace"
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-dark hover:text-neutral-black"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Organisasi</span>
            </Link>
          )}

          {permissions.canAccessAdmin && (
            <Link
              href="/admin/cabinets"
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentArea === "admin"
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-dark hover:text-neutral-black"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pengelola</span>
            </Link>
          )}
        </div>

        {/* Workspace Switcher (Visible in Organization & Workspace contexts) */}
        {(currentArea === "organization" || currentArea === "workspace") && permissions.assignedWorkspaces.length > 0 && (
          <div className="relative hidden md:block">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold-50/80 hover:bg-gold-100 border border-gold-400/40 text-xs font-semibold text-brand-burgundy transition-all"
            >
              <FolderKanban className="w-3.5 h-3.5 text-gold-700" />
              <span>Pilih Ruang Kerja ({permissions.assignedWorkspaces.length})</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <p className="px-3 py-1 text-[10px] uppercase font-mono font-bold tracking-wider text-neutral-dark">
                  Ruang Kerja yang Ditugaskan
                </p>
                <div className="space-y-1 mt-1">
                  {permissions.assignedWorkspaces.map((ws) => (
                    <Link
                      key={ws.id}
                      href={`/workspace/${ws.id}`}
                      onClick={() => setWorkspaceMenuOpen(false)}
                      className="block p-2.5 rounded-xl hover:bg-gold-50/80 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-wine-900 text-gold-300 font-bold">
                          {ws.type.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-neutral-light">{ws.roleTitle}</span>
                      </div>
                      <p className="text-xs font-semibold text-wine-950 mt-1 truncate">{ws.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="hidden lg:flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-surface-ivory/80 border border-wine-950/10 text-xs text-neutral-dark hover:border-brand-burgundy/40 hover:bg-white hover:shadow-sm transition-all w-64 text-left group"
        aria-label="Buka Pencarian Cepat"
      >
        <div className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-neutral-dark/70 group-hover:text-brand-burgundy transition-colors shrink-0" />
          <span className="text-xs text-neutral-dark/80 group-hover:text-wine-950 transition-colors">
            Cari program kerja, surat, modul...
          </span>
        </div>
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-wine-950/5 border border-wine-950/10 text-neutral-dark font-semibold">
          ⌘K
        </kbd>
      </button>

      {/* Right: Notification Bell & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-surface-ivory text-neutral-dark hover:text-brand-burgundy lg:hidden transition-colors active:scale-95"
          title="Pencarian Cepat (⌘K)"
          aria-label="Buka Pencarian Cepat"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <Link
          href="/personal/notifikasi"
          className="relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-surface-ivory text-neutral-dark hover:text-brand-burgundy transition-colors active:scale-95"
          title="Pemberitahuan"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-burgundy text-white font-mono text-[10px] font-bold flex items-center justify-center shadow">
              {unreadNotificationsCount}
            </span>
          )}
        </Link>

        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1 text-xs text-neutral-dark hover:text-brand-burgundy px-2.5 py-1.5 rounded-lg hover:bg-surface-ivory transition-colors"
        >
          <span>Web Publik</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-ivory transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-brand-burgundy text-gold-300 font-bold text-xs flex items-center justify-center shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <ChevronDown className="w-3 h-3 text-neutral-light" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl glass-dropdown shadow-2xl border border-white/70 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
              <div className="p-3 border-b border-wine-950/10 mb-1">
                <p className="text-xs font-bold text-wine-950 truncate">{currentUser.name}</p>
                <p className="text-xs text-neutral-dark truncate">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs px-2 py-0.5 rounded bg-brand-burgundy text-gold-200 font-mono font-bold">
                    {currentUser.demo_id}
                  </span>
                  <span className="text-xs text-neutral-dark capitalize">
                    {currentUser.base_role.replace("_", " ")}
                  </span>
                </div>
              </div>

              <Link
                href="/personal/profil"
                onClick={() => setProfileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
              >
                Profil Akun
              </Link>
              <Link
                href="/personal/keamanan"
                onClick={() => setProfileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
              >
                Keamanan &amp; Kata Sandi
              </Link>
              <Link
                href="/__demo"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-neutral-black hover:bg-gold-50/80 hover:text-brand-burgundy transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Buka Demo Switcher</span>
              </Link>

              <div className="border-t border-wine-950/10 my-1 pt-1">
                <button
                  onClick={() => {
                    setCurrentUserId("usr-demo-01");
                    setProfileMenuOpen(false);
                    router.push("/masuk");
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  );
}
