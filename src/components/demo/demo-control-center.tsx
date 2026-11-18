"use client";

import { useState, useEffect } from "react";
import { useMockStore, setCurrentUserId } from "@/lib/mock/store";
import { DEMO_PASSWORD } from "@/lib/mock/seed";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { 
  Users, 
  RotateCcw, 
  KeyRound, 
  ChevronUp, 
  ChevronDown, 
  Shield, 
  ExternalLink,
  CheckCircle2,
  X
} from "lucide-react";
import Link from "next/link";

export function DemoControlCenter() {
  const { store, currentUser, resetToSeed } = useMockStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [confirmReset, setConfirmReset] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const permissions = resolveUserPermissions(currentUser, store);

  const handleSelectUser = (userId: string) => {
    setCurrentUserId(userId);
    setIsOpen(false);
  };

  const handleReset = () => {
    resetToSeed();
    setConfirmReset(false);
  };

  const filteredUsers = store.users.filter((u) => {
    if (filterRole === "all") return true;
    if (filterRole === "kader") return u.cadre_status === "verified";
    if (filterRole === "staff") return u.base_role === "staff";
    if (filterRole === "leadership") return ["kakom", "kabid", "ketum", "waketum", "sekjen", "sekum", "bendum"].includes(u.base_role);
    if (filterRole === "special") return ["system_admin", "mahasiswa"].includes(u.base_role);
    return true;
  });

  if (!mounted) {
    return null;
  }

  return (
    <aside aria-label="Demo Controller" className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-burgundy text-white border-2 border-gold-400 shadow-2xl hover:bg-brand-darkWine transition-all text-xs font-semibold tracking-wide"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Demo Role Switcher</span>
          <span className="px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-200 border border-gold-400/30 text-xs font-mono font-bold">
            {currentUser.demo_id}
          </span>
          <ChevronUp className="w-4 h-4 text-gold-300" />
        </button>
      )}

      {isOpen && (
        <div className="w-[420px] max-w-[95vw] bg-surface-ivory border-2 border-gold-400/70 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-black max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
          {/* Header: Burgundy Bar */}
          <div className="p-4 bg-brand-burgundy text-white flex items-center justify-between border-b border-gold-400/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-gold-400/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-gold-300" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-gold-200">
                  Demo Control Center
                </h3>
                <p className="text-[11px] text-white/80">
                  Simulasi 28 Akun &amp; State LocalStorage
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active Profile Info Banner */}
          <div className="p-4 bg-white border-b border-gold-300/50 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-burgundy text-white">
                  {currentUser.demo_id}
                </span>
                <span className="font-bold text-sm text-wine-950">{currentUser.name}</span>
              </div>
              <span className="text-[11px] capitalize px-2.5 py-0.5 rounded-full bg-gold-100 text-wine-950 border border-gold-300 font-medium">
                {currentUser.base_role.replace("_", " ")}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-dark">
              <span className="flex items-center gap-1.5 bg-surface-ivory px-2.5 py-1 rounded-lg border border-gold-200">
                <KeyRound className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>OTP: <strong className="text-wine-950 font-mono">246810</strong></span>
              </span>
              <span className="bg-surface-ivory px-2.5 py-1 rounded-lg border border-gold-200">
                Pass: <code className="text-wine-950 font-semibold">{DEMO_PASSWORD}</code>
              </span>
              {currentUser.account_status !== "active" && (
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                  {currentUser.account_status}
                </span>
              )}
            </div>

            {/* Quick access info */}
            <div className="text-[11px] text-neutral-600 flex items-center justify-between pt-1">
              <span>Area: <strong className="text-wine-950">{permissions.allowedAreas.join(", ") || "none"}</strong></span>
              <Link 
                href="/__demo" 
                className="text-brand-burgundy hover:text-brand-darkWine font-semibold flex items-center gap-1 underline underline-offset-2"
                onClick={() => setIsOpen(false)}
              >
                <span>Panel Lengkap</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="px-4 py-2.5 bg-surface-card border-b border-gold-200 flex gap-1.5 overflow-x-auto text-[11px]">
            {[
              { id: "all", label: "Semua (28)" },
              { id: "leadership", label: "Pimpinan" },
              { id: "staff", label: "Staff" },
              { id: "kader", label: "Kader" },
              { id: "special", label: "Lainnya" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterRole(tab.id)}
                className={`px-3 py-1 rounded-full transition-all whitespace-nowrap font-medium ${
                  filterRole === tab.id
                    ? "bg-brand-burgundy text-white shadow-xs font-semibold"
                    : "text-neutral-dark hover:text-wine-950 hover:bg-gold-100/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User List: Clean White Cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-surface-ivory">
            {filteredUsers.map((u) => {
              const isCurrent = u.id === currentUser.id;
              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 shadow-xs ${
                    isCurrent
                      ? "bg-white border-2 border-brand-burgundy text-wine-950 ring-1 ring-brand-burgundy/20"
                      : "bg-white hover:bg-gold-50/70 border border-gold-200 text-neutral-black hover:border-gold-400"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-gold-100 text-brand-burgundy">
                        {u.demo_id}
                      </span>
                      <span className="text-xs font-bold text-wine-950">{u.name}</span>
                      {isCurrent && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-600 font-mono truncate max-w-[260px]">
                      {u.email}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-wine-950/10 text-wine-950 font-medium">
                        {u.base_role}
                      </span>
                      {u.cadre_status === "verified" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                          Kader
                        </span>
                      )}
                      {u.additional_permissions?.slice(0, 2).map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 font-mono font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                    {u.account_status}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer Reset Action */}
          <div className="p-3 border-t border-gold-300/60 bg-white flex items-center justify-between text-xs">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="flex items-center gap-1.5 text-neutral-dark hover:text-red-700 transition-colors text-[11px] font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Reset Data Simulasi</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-red-700 font-semibold">Yakin reset?</span>
                <button
                  onClick={handleReset}
                  className="px-2.5 py-0.5 rounded bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold"
                >
                  Ya, Reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-0.5 rounded bg-neutral-200 text-neutral-700 text-[10px]"
                >
                  Batal
                </button>
              </div>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 rounded-lg bg-surface-ivory hover:bg-gold-100 text-wine-950 font-medium text-[11px] border border-gold-300 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
