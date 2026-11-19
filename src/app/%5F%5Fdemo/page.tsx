"use client";

import { useState } from "react";
import { useMockStore, setCurrentUserId } from "@/lib/mock/store";
import { DEMO_PASSWORD } from "@/lib/mock/seed";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import Link from "next/link";
import { 
  Shield, 
  RotateCcw, 
  KeyRound, 
  CheckCircle2, 
  ExternalLink, 
  Users, 
  FolderKanban, 
  Calendar, 
  Ticket, 
  Mail, 
  Wallet, 
  FileText, 
  Sparkles,
  ArrowRight,
  Database
} from "lucide-react";

export default function DemoDeveloperDashboard() {
  const { store, currentUser, resetToSeed } = useMockStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"accounts" | "store-metrics" | "route-directory">("accounts");
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const permissions = resolveUserPermissions(currentUser, store);

  const filteredUsers = store.users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.demo_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.base_role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-wine-950 text-neutral-100 p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background Aurora Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-burgundy-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-wine-800/80">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-gold-500/20 text-gold-300 font-mono text-xs border border-gold-500/30">
                DEVELOPER TOOL
              </span>
              <span className="text-xs text-neutral-400">LocalStorage Engine v1.1</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold-200 mt-2">
              HIPMI CENTRAL — Demo Control Center
            </h1>
            <p className="text-sm text-neutral-300 mt-1">
              Simulasi interaktif 28 akun demo, RBAC/Assignment resolver, dan verifikasi alur bisnis organisasi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-wine-900/60 hover:bg-wine-800 text-neutral-200 border border-wine-700/60 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <span>Buka Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800/50 text-xs font-medium transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State ke Seed</span>
            </button>
          </div>
        </header>

        {/* Confirmation Modal */}
        {showConfirmReset && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-wine-900 border border-gold-500/40 p-6 rounded-2xl max-w-md w-full shadow-2xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-200 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-400" />
                Konfirmasi Reset LocalStorage
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Tindakan ini akan mengembalikan seluruh data pengguna, proker, task, tiket, surat, transaksi keuangan, LPJ, dan direktori ke nilai awal (seed deterministik).
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 rounded-lg bg-wine-950 text-neutral-300 text-xs hover:bg-wine-800"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    resetToSeed();
                    setShowConfirmReset(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 text-white text-xs font-semibold"
                >
                  Ya, Reset Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Active User Banner */}
        <section className="bg-gradient-to-r from-burgundy-950 to-wine-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-300 font-serif text-2xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-mono font-bold text-xs border border-gold-500/30">
                  {currentUser.demo_id}
                </span>
                <h2 className="text-lg font-serif font-bold text-white">{currentUser.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-wine-800 text-neutral-300 capitalize">
                  {currentUser.base_role.replace("_", " ")}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1">{currentUser.email}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-300">
                <span>NIM: <strong className="text-gold-300 font-mono">{currentUser.nim || "-"}</strong></span>
                <span>•</span>
                <span>Status Kader: <strong className="capitalize text-emerald-400">{currentUser.cadre_status}</strong></span>
                <span>•</span>
                <span>Akun: <strong className="capitalize text-gold-400">{currentUser.account_status}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Area Terbuka:</span>
              {permissions.allowedAreas.map((area) => (
                <span key={area} className="px-2 py-0.5 rounded bg-wine-800 text-gold-300 uppercase font-mono text-[10px]">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <span>OTP Universal: <strong className="text-gold-300 font-mono">246810</strong></span>
              <span>|</span>
              <span>Sandi: <code className="text-gold-300">{DEMO_PASSWORD}</code></span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <nav aria-label="Demo Tabs" className="flex border-b border-wine-800/80 gap-4 text-sm">
          {[
            { id: "accounts", label: "Matriks 28 Akun Demo", icon: Users },
            { id: "store-metrics", label: "Inspeksi Mock Data Store", icon: Database },
            { id: "route-directory", label: "Jalur Navigasi Cepat (6 Area)", icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-medium flex items-center gap-2 transition-colors relative ${
                  activeTab === tab.id ? "text-gold-300" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab 1: Matriks 28 Akun Demo */}
        {activeTab === "accounts" && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-neutral-300">
                Klik tombol <strong className="text-gold-300">"Pilih Akun Ini"</strong> untuk langsung beralih sesi login tanpa perlu logout.
              </p>
              <input
                type="text"
                placeholder="Cari berdasarkan nama, peran, email, atau DEMO-ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl bg-wine-900/60 border border-wine-700/60 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-gold-500/60"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => {
                const isSelected = user.id === currentUser.id;
                const userPerms = resolveUserPermissions(user, store);

                return (
                  <article
                    key={user.id}
                    className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-burgundy-900/40 border-gold-500/50 shadow-lg ring-1 ring-gold-500/40"
                        : "bg-wine-900/30 border-wine-800/60 hover:bg-wine-900/50"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/30">
                          {user.demo_id}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-mono ${
                            user.account_status === "active"
                              ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40"
                              : "bg-amber-950/60 text-amber-300 border border-amber-800/40"
                          }`}
                        >
                          {user.account_status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif font-semibold text-base text-white">{user.name}</h3>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5">{user.email}</p>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-wine-800/40">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Base Role:</span>
                          <span className="font-medium capitalize text-gold-200">
                            {user.base_role.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Status Kader:</span>
                          <span className="capitalize">{user.cadre_status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Akses Area:</span>
                          <span className="font-mono text-[11px] text-gold-300">
                            {userPerms.allowedAreas.join(", ") || "-"}
                          </span>
                        </div>
                      </div>

                      {user.additional_permissions?.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] text-neutral-400 block mb-1">Permissions:</span>
                          <div className="flex flex-wrap gap-1">
                            {user.additional_permissions.map((p) => (
                              <span
                                key={p}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-copper-950/80 text-copper-300 border border-copper-800/40"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-3 border-t border-wine-800/40">
                      {isSelected ? (
                        <div className="w-full py-2 rounded-xl bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-semibold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Sedang Digunakan</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCurrentUserId(user.id)}
                          className="w-full py-2 rounded-xl bg-wine-800 hover:bg-wine-700 text-neutral-100 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Pilih Akun Ini</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Tab 2: Inspeksi Mock Data Store */}
        {activeTab === "store-metrics" && (
          <section className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: "Total Pengguna Demo", count: store.users.length, icon: Users, desc: "28 akun prasetel" },
                { title: "Program Kerja", count: store.projects.length, icon: FolderKanban, desc: "8 proker terdaftar" },
                { title: "Task Board", count: store.tasks.length, icon: CheckCircle2, desc: "12 tasks (4 kolom)" },
                { title: "Agenda & Event", count: store.events.length, icon: Calendar, desc: "Publik & internal" },
                { title: "E-Tiket Diterbitkan", count: store.tickets.length, icon: Ticket, desc: "Token DEMO-TKT" },
                { title: "Pengajuan Surat", count: store.correspondence.length, icon: Mail, desc: "Umum & Ditmawa" },
                { title: "Pengajuan Dana", count: store.fund_requests.length, icon: Wallet, desc: "Multi-termin" },
                { title: "Jurnal Transaksi Kas", count: store.finance_transactions.length, icon: Wallet, desc: "Kas masuk/keluar" },
                { title: "Dokumen LPJ", count: store.lpjs.length, icon: FileText, desc: "7 bagian DOC-05" },
                { title: "Bisnis Kader", count: store.businesses.length, icon: Sparkles, desc: "Etalase karya" },
                { title: "Media Partner", count: store.medpart_submissions.length, icon: Sparkles, desc: "Kode tracking MP" },
                { title: "Kotak Suara Aspirasi", count: store.feedback.length, icon: Mail, desc: "Privat non-publik" }
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.title}
                    className="p-5 rounded-2xl bg-wine-900/30 border border-wine-800/60 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-400">{metric.title}</span>
                      <Icon className="w-4 h-4 text-gold-400" />
                    </div>
                    <p className="text-2xl font-serif font-bold text-gold-200">{metric.count}</p>
                    <p className="text-[11px] text-neutral-400">{metric.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Audit & Activity Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-wine-900/30 border border-wine-800/60 space-y-3">
                <h3 className="font-serif font-semibold text-gold-200 text-sm flex items-center justify-between">
                  <span>Riwayat Aktivitas Terakhir ({store.activity_history.length})</span>
                </h3>
                <div className="space-y-2 max-h-72 overflow-y-auto text-xs pr-1">
                  {store.activity_history.slice(0, 10).map((act) => (
                    <div key={act.id} className="p-2 rounded-lg bg-wine-950/60 border border-wine-800/40 flex justify-between gap-2">
                      <div>
                        <strong className="text-gold-300">{act.actor_name}</strong> {act.action}{" "}
                        <span className="text-neutral-300">"{act.target}"</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 whitespace-nowrap font-mono">
                        {new Date(act.timestamp).toLocaleTimeString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-wine-900/30 border border-wine-800/60 space-y-3">
                <h3 className="font-serif font-semibold text-gold-200 text-sm flex items-center justify-between">
                  <span>Log Audit Sistem (Hanya Admin DEMO-25) ({store.audit_events.length})</span>
                </h3>
                <div className="space-y-2 max-h-72 overflow-y-auto text-xs pr-1 font-mono">
                  {store.audit_events.slice(0, 10).map((aud) => (
                    <div key={aud.id} className="p-2 rounded-lg bg-wine-950/60 border border-wine-800/40 text-[11px]">
                      <div className="flex justify-between text-gold-400 font-bold">
                        <span>{aud.action}</span>
                        <span className="text-neutral-400 font-normal">
                          {new Date(aud.timestamp).toLocaleTimeString("id-ID")}
                        </span>
                      </div>
                      <p className="text-neutral-300 mt-0.5">
                        {aud.resource_type}: {aud.resource_id}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Jalur Navigasi Cepat (6 Area) */}
        {activeTab === "route-directory" && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "1. Public Area",
                desc: "Landing page, profil, aktivitas, karya kader, medpart & aspirasi.",
                routes: [
                  { label: "Homepage (PUB-01)", href: "/" },
                  { label: "Tentang Kami (PUB-02..05)", href: "/tentang" },
                  { label: "Struktur Organisasi (PUB-06..10)", href: "/organisasi-kami" },
                  { label: "Aktivitas & Berita (PUB-11..14)", href: "/aktivitas" },
                  { label: "Etalase Bisnis Kader (PUB-18..21)", href: "/karya-kader" },
                  { label: "Pengajuan Media Partner (PUB-15..17)", href: "/medpart/pengajuan" },
                  { label: "Kotak Suara Publik (PUB-22)", href: "/kotak-suara" }
                ]
              },
              {
                title: "2. Ticketing Flow",
                desc: "Pemesanan tiket, countdown 180s, QRIS, dan cek status tiket via OTP.",
                routes: [
                  { label: "Pesan Tiket Expo (TKT-01..05)", href: "/event/evt-business-expo/tiket" },
                  { label: "Cek Status E-Tiket (TKT-06..08)", href: "/tiket/cek" }
                ]
              },
              {
                title: "3. Auth Pages",
                desc: "Masuk, daftar, verifikasi email, lupa sandi, dan status akun.",
                routes: [
                  { label: "Masuk Akun (AUTH-01)", href: "/masuk" },
                  { label: "Daftar Akun Baru (AUTH-02)", href: "/daftar" },
                  { label: "Verifikasi Email (AUTH-03)", href: "/verifikasi-email" },
                  { label: "Lupa Password (AUTH-04)", href: "/lupa-password" },
                  { label: "Reset Password (AUTH-05)", href: "/reset-password" },
                  { label: "Status Akun Terkunci (AUTH-06)", href: "/status-akun" }
                ]
              },
              {
                title: "4. Personal Area",
                desc: "Dashboard personal kader/mahasiswa, riwayat proker, tiket, bisnis.",
                routes: [
                  { label: "Personal Dashboard (PER-01)", href: "/personal/dashboard" },
                  { label: "Profil Pengguna (PER-02..04)", href: "/personal/profil" },
                  { label: "Keanggotaan Kader (PER-05..06)", href: "/personal/keanggotaan" },
                  { label: "Aktivitas & Proker Saya (PER-07..09)", href: "/personal/aktivitas" },
                  { label: "Bisnis Saya (PER-10..11)", href: "/personal/bisnis" },
                  { label: "Notifikasi Saya (PER-12)", href: "/personal/notifikasi" }
                ]
              },
              {
                title: "5. Organization & Workspace Area",
                desc: "Pengelolaan organisasi, workspace bidang/kompartemen/proker.",
                routes: [
                  { label: "Organization Dashboard (ORG-01)", href: "/organisasi/dashboard" },
                  { label: "Workspace Proker Expo (WRK-01..10)", href: "/organisasi/workspace/proker?id=proj-business-expo" },
                  { label: "Workspace Kompartemen (WRK)", href: "/organisasi/workspace/kompartemen?id=comp-demo-01" },
                  { label: "Workspace Bidang 1 (WRK)", href: "/organisasi/workspace/bidang?id=field-demo-01" },
                  { label: "Sentral Persuratan Sekum (COR)", href: "/organisasi/surat" },
                  { label: "Sentral Keuangan Bendum (FIN)", href: "/organisasi/keuangan" }
                ]
              },
              {
                title: "6. Area Pengelola Sistem (Admin)",
                desc: "Pusat kabinet (ADM-01), dasbor kabinet (ADM-02..12), layar kesalahan.",
                routes: [
                  { label: "Pusat Kabinet (ADM-01)", href: "/admin/cabinets" },
                  { label: "Dasbor Kabinet (ADM-02)", href: "/admin/dashboard" },
                  { label: "Akses Ditolak (SYS-07)", href: "/403" },
                  { label: "Halaman Tidak Ditemukan (SYS-08)", href: "/404" },
                  { label: "Kesalahan Sistem (SYS-09)", href: "/500" }
                ]
              }
            ].map((section) => (
              <div
                key={section.title}
                className="p-5 rounded-2xl bg-wine-900/30 border border-wine-800/60 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif font-bold text-gold-200 text-sm">{section.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 mb-3">{section.desc}</p>
                  <ul className="space-y-1.5">
                    {section.routes.map((r) => (
                      <li key={r.href}>
                        <Link
                          href={r.href}
                          className="text-xs text-neutral-200 hover:text-gold-300 flex items-center justify-between p-1.5 rounded-lg hover:bg-wine-900/50 transition-colors"
                        >
                          <span>{r.label}</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
