"use client";

import { useState, useMemo } from "react";
import { User } from "@/types/domain";
import { Search, CheckCircle2, ShieldAlert, X, UserCheck } from "lucide-react";

interface CadreNimLookupProps {
  users: User[];
  assignedUserIds?: string[];
  selectedUserId?: string;
  mode: "assign" | "select";
  onSelect: (user: User) => void;
  onClearSelection?: () => void;
}

export function CadreNimLookup({
  users,
  assignedUserIds = [],
  selectedUserId,
  mode,
  onSelect,
  onClearSelection,
}: CadreNimLookupProps) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();

  const matchedUsers = useMemo(() => {
    if (!trimmed) {
      // Show top 4 verified active cadres as quick preview when empty
      return users
        .filter((u) => u.account_status === "active" && u.cadre_status === "verified")
        .slice(0, 4);
    }

    return users
      .filter((u) => {
        const nimMatch = (u.nim || "").toLowerCase().includes(trimmed);
        const nameMatch = (u.name || "").toLowerCase().includes(trimmed);
        const fullNameMatch = (u.full_name || "").toLowerCase().includes(trimmed);
        const emailMatch = (u.email || "").toLowerCase().includes(trimmed);
        const ktaMatch = (u.member_id || "").toLowerCase().includes(trimmed);
        return nimMatch || nameMatch || fullNameMatch || emailMatch || ktaMatch;
      })
      .slice(0, 6);
  }, [users, trimmed]);

  const selectedUser = selectedUserId
    ? users.find((u) => u.id === selectedUserId) || null
    : null;

  return (
    <div className="space-y-3 text-xs">
      {/* Selected Candidate Preview (for "select" mode like Create Project Modal) */}
      {mode === "select" && selectedUser && (
        <div className="p-3 rounded-2xl bg-emerald-50/75 border border-emerald-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-brand-burgundy text-[#F5D6A8] font-bold flex items-center justify-center shrink-0">
              {selectedUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <strong className="text-wine-950 truncate">{selectedUser.name}</strong>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  Terpilih
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-900 block truncate">
                NIM: {selectedUser.nim || "-"} • {selectedUser.email}
              </span>
            </div>
          </div>
          {onClearSelection && (
            <button
              type="button"
              onClick={onClearSelection}
              className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100 shrink-0"
              aria-label="Hapus pilihan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* NIM / Name Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-light absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari berdasarkan NIM atau nama kader (misal: 130121...)"
          className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#E9E1DC] focus:outline-none focus:ring-2 focus:ring-brand-burgundy/25 text-xs text-wine-950 font-medium placeholder:font-normal"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-neutral-light hover:text-wine-950"
            aria-label="Bersihkan pencarian"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Helper label */}
      <div className="flex items-center justify-between text-[11px] text-neutral-dark">
        <span>
          {trimmed
            ? `Hasil pencarian "${query.trim()}" (${matchedUsers.length} akun ditemukan)`
            : "Ketik NIM untuk mencari identitas akun, atau pilih cepat kader terverifikasi:"}
        </span>
      </div>

      {/* Results List */}
      {matchedUsers.length > 0 ? (
        <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
          {matchedUsers.map((u) => {
            const isVerified =
              u.account_status === "active" && u.cadre_status === "verified";
            const isAlreadyAssigned = assignedUserIds.includes(u.id);
            const isPicked = selectedUserId === u.id;

            return (
              <div
                key={u.id}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                  isPicked
                    ? "bg-brand-burgundy/5 border-brand-burgundy/40"
                    : isVerified
                    ? "bg-[#FCF8F6] border-[#E9E1DC] hover:border-brand-burgundy/35"
                    : "bg-neutral-50 border-neutral-200 opacity-80"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl font-bold flex items-center justify-center shrink-0 text-xs ${
                      isVerified
                        ? "bg-brand-burgundy text-[#F5D6A8]"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {(u.name || "U").charAt(0)}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <strong className="text-wine-950 font-semibold truncate">
                        {u.name}
                      </strong>
                      {isVerified ? (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Kader Terverifikasi</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 shrink-0">
                          <ShieldAlert className="w-3 h-3" />
                          <span>Belum Terverifikasi</span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-neutral-dark">
                      <span className="font-mono font-bold text-brand-burgundy">
                        NIM: {u.nim || "-"}
                      </span>
                      <span className="text-neutral-light">•</span>
                      <span className="truncate">{u.email}</span>
                    </div>
                    {(u.study_program || u.member_id) && (
                      <span className="text-[10px] text-neutral-light block truncate">
                        {u.study_program || "Telkom University"}
                        {u.member_id ? ` • e-KTA: ${u.member_id}` : ""}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="shrink-0">
                  {isAlreadyAssigned ? (
                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold inline-flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      <span>Aktif</span>
                    </span>
                  ) : !isVerified ? (
                    <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-medium">
                      Tidak Memenuhi
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(u);
                        if (mode === "assign") setQuery("");
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold transition-colors ${
                        isPicked
                          ? "bg-emerald-700 text-white"
                          : "bg-brand-burgundy hover:bg-brand-darkWine text-white shadow-sm"
                      }`}
                    >
                      {mode === "assign" ? "Tunjuk" : isPicked ? "Dipilih" : "Pilih"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-[#FCF8F6] border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
          Tidak ditemukan akun dengan NIM atau nama{" "}
          <strong className="text-wine-950">&ldquo;{query.trim()}&rdquo;</strong>. Pastikan kader sudah terdaftar di HIPMI CENTRAL.
        </div>
      )}
    </div>
  );
}
