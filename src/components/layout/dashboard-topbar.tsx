"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMockStore, setCurrentUserId, mutateStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { formatRoleLabel } from "@/lib/personal/labels";
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
  LogOut,
  Sparkles,
  Menu,
  ArrowRight,
  MailCheck,
  Inbox,
} from "lucide-react";

interface DashboardTopbarProps {
  currentArea: "personal" | "organization" | "admin" | "workspace";
  onToggleMobileSidebar?: () => void;
}

export function DashboardTopbar({
  currentArea,
  onToggleMobileSidebar,
}: DashboardTopbarProps) {
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const showGlobalSearch = currentArea !== "personal";

  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNotifMenuOpen(false);
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Global Command Palette Shortcut (only outside Personal Area)
  useEffect(() => {
    if (!showGlobalSearch) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        (e.target as HTMLElement)?.tagName !== "INPUT" &&
        (e.target as HTMLElement)?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGlobalSearch]);

  const userNotifications = store.notifications.filter(
    (n) => !n.user_id || n.user_id === currentUser.id
  );
  const unreadNotifications = userNotifications.filter((n) => !n.read);
  const unreadNotificationsCount = unreadNotifications.length;

  const previewNotifications =
    unreadNotifications.length > 0
      ? unreadNotifications.slice(0, 4)
      : userNotifications.slice(0, 4);

  const handleMarkSingleRead = (notifId: string, sourceRoute?: string) => {
    mutateStore((draft) => {
      const target = draft.notifications.find((n) => n.id === notifId);
      if (target) target.read = true;
    });
    setNotifMenuOpen(false);
    if (sourceRoute) {
      router.push(sourceRoute);
    }
  };

  const handleMarkAllRead = () => {
    mutateStore((draft) => {
      draft.notifications.forEach((n) => {
        if (!n.user_id || n.user_id === currentUser.id) {
          n.read = true;
        }
      });
    });
  };

  const orgEntryHref = permissions.isPureProjectManager
    ? permissions.primaryWorkspaceHref || "/workspace/projects/proj-business-expo"
    : "/organization/dashboard";

  return (
    <header className="bg-[#FFFBF7]/90 border-b border-[#E9E1DC] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl shadow-[0_2px_16px_rgba(61,15,22,0.04)]">
      {/* Left: Hamburger & Clean Single Area Switcher */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="min-h-[42px] min-w-[42px] -ml-1 rounded-xl text-neutral-dark hover:text-brand-burgundy hover:bg-surface-ivory md:hidden transition-colors flex items-center justify-center active:scale-95"
          aria-label="Buka Menu Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Single Clean Area Switcher (No duplicate workspace dropdown) */}
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
              href={orgEntryHref}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                currentArea === "organization" || currentArea === "workspace"
                  ? "bg-brand-burgundy text-white font-semibold shadow-sm"
                  : "text-neutral-dark hover:text-neutral-black"
              }`}
            >
              {permissions.isPureProjectManager ? (
                <>
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ruang Kerja</span>
                </>
              ) : (
                <>
                  <Building className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Organisasi</span>
                </>
              )}
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
      </div>

      {/* Center: Command Palette Trigger (Hidden in Personal Area) */}
      {showGlobalSearch && (
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden lg:flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-full bg-surface-ivory/80 border border-wine-950/10 text-xs text-neutral-dark hover:border-brand-burgundy/40 hover:bg-white hover:shadow-sm transition-all w-64 text-left group"
          aria-label="Buka Pencarian Cepat"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-neutral-dark/70 group-hover:text-brand-burgundy transition-colors shrink-0" />
            <span className="text-xs text-neutral-dark/80 group-hover:text-wine-950 transition-colors truncate">
              {permissions.isPureProjectManager
                ? "Cari proker, mitra, agenda..."
                : "Cari proker, surat, mitra..."}
            </span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-wine-950/5 border border-wine-950/10 text-neutral-dark font-semibold shrink-0">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Right: Notification Dropdown, Public Link & Profile Dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {showGlobalSearch && (
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full hover:bg-surface-ivory text-neutral-dark hover:text-brand-burgundy lg:hidden transition-colors active:scale-95"
            title="Pencarian Cepat (⌘K)"
            aria-label="Buka Pencarian Cepat"
          >
            <Search className="w-4 h-4" />
          </button>
        )}

        {/* Notification Bell with Recent Summary Dropdown */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifMenuOpen((prev) => !prev);
              setProfileMenuOpen(false);
            }}
            className={`relative min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full transition-colors active:scale-95 ${
              notifMenuOpen
                ? "bg-brand-burgundy/10 text-brand-burgundy"
                : "hover:bg-surface-ivory text-neutral-dark hover:text-brand-burgundy"
            }`}
            title="Pemberitahuan"
            aria-label="Buka Ringkasan Pemberitahuan"
            aria-expanded={notifMenuOpen}
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-brand-burgundy text-white font-mono text-[10px] font-bold flex items-center justify-center shadow">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-[310px] sm:w-[360px] rounded-2xl bg-[#FFFDFB] border border-[#E9E1DC] shadow-[0_20px_54px_rgba(61,15,22,0.16)] overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-[#E9E1DC] bg-[#FCF8F6] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-bold text-wine-950">
                      Notifikasi Terbaru
                    </span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                        {unreadNotificationsCount} baru
                      </span>
                    )}
                  </div>

                  {unreadNotificationsCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
                    >
                      <MailCheck className="w-3 h-3" />
                      <span>Tandai dibaca</span>
                    </button>
                  )}
                </div>

                <div className="max-h-[320px] overflow-y-auto divide-y divide-[#E9E1DC]/70">
                  {previewNotifications.length > 0 ? (
                    previewNotifications.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleMarkSingleRead(item.id, item.source_route)}
                        className={`w-full text-left px-4 py-3 hover:bg-[#FCF8F6] transition-colors flex items-start gap-3 ${
                          !item.read ? "bg-brand-burgundy/[0.03]" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            !item.read
                              ? "bg-brand-burgundy text-white shadow-sm"
                              : "bg-[#FCF8F6] text-neutral-light border border-[#E9E1DC]"
                          }`}
                        >
                          <Bell className="w-3.5 h-3.5" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-mono font-bold uppercase text-brand-burgundy">
                              {item.category}
                            </span>
                            {!item.read && (
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy shrink-0" />
                            )}
                          </div>
                          <strong className="text-xs font-semibold text-wine-950 block line-clamp-1">
                            {item.title}
                          </strong>
                          <p className="text-[11px] text-neutral-dark line-clamp-2 leading-snug">
                            {item.message}
                          </p>
                          <span className="text-[10px] font-mono text-neutral-light block pt-0.5">
                            {new Date(item.created_at).toLocaleString("id-ID", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center space-y-2">
                      <Inbox className="w-8 h-8 text-neutral-300 mx-auto" />
                      <p className="text-xs text-neutral-dark">
                        Belum ada notifikasi baru yang masuk.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-2.5 border-t border-[#E9E1DC] bg-[#FCF8F6]">
                  <Link
                    href="/personal/notifikasi"
                    onClick={() => setNotifMenuOpen(false)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 hover:text-brand-burgundy text-wine-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Lihat Semua Notifikasi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileMenuOpen((prev) => !prev);
              setNotifMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-ivory transition-colors"
            aria-label="Menu Profil"
          >
            <div className="w-7 h-7 rounded-full bg-brand-burgundy text-gold-300 font-bold text-xs flex items-center justify-center shadow-sm">
              {currentUser.name.charAt(0)}
            </div>
            <ChevronDown className="w-3 h-3 text-neutral-light" />
          </button>

          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-64 p-2 rounded-2xl glass-dropdown shadow-2xl border border-[#E9E1DC] z-50"
              >
                <div className="p-3 border-b border-wine-950/10 mb-1">
                  <p className="text-xs font-bold text-wine-950 truncate">{currentUser.name}</p>
                  <p className="text-xs text-neutral-dark truncate">{currentUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-burgundy text-gold-200 font-mono font-bold">
                      {currentUser.demo_id}
                    </span>
                    <span className="text-xs text-neutral-dark">
                      {formatRoleLabel(currentUser.base_role)}
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
                  Pengaturan Akun
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
                    type="button"
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Global Command Palette Modal (Only mounted outside Personal Area) */}
      {showGlobalSearch && (
        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      )}
    </header>
  );
}
