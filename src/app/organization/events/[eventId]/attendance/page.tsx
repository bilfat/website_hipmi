"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  UserCheck,
  Search,
  Filter,
  ChevronLeft,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  Camera,
  ExternalLink
} from "lucide-react";

export default function EventAttendanceLogPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!event) return null;

  const filteredTickets = tickets.filter((tkt) => {
    if (statusFilter === "checked_in" && !tkt.is_checked_in) return false;
    if (statusFilter === "pending" && tkt.is_checked_in) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = tkt.participant_name.toLowerCase().includes(q);
      const matchNim = tkt.participant_nim.toLowerCase().includes(q);
      const matchToken = tkt.ticket_token.toLowerCase().includes(q);
      if (!matchName && !matchNim && !matchToken) return false;
    }
    return true;
  });

  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}/check-in`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Meja Presensi
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                ATT-03
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Daftar Kehadiran Realtime (Attendance Log)
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Log kehadiran fisik peserta di venue, waktu scan barcode, dan metode validasi registrasi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/organization/events/${eventId}/scanner`}
              className="px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Camera className="w-4 h-4" /> Buka Scanner
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl bg-white border border-wine-200 hover:bg-wine-50 text-wine-900 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4 text-brand-burgundy" /> Cetak Presensi
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama peserta, NIM, atau token e-tiket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Status ({tickets.length})</option>
            <option value="checked_in">Hadir di Venue ({checkedInCount})</option>
            <option value="pending">Belum Hadir ({tickets.length - checkedInCount})</option>
          </select>
        </div>

        {/* Attendance Log Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Peserta & NIM</th>
                  <th className="py-3.5 px-4">Token E-Tiket</th>
                  <th className="py-3.5 px-4">Status Kehadiran</th>
                  <th className="py-3.5 px-4">Waktu Check-in (WIB)</th>
                  <th className="py-3.5 px-4">Metode Check-in</th>
                  <th className="py-3.5 px-4 text-right">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada catatan presensi yang cocok.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((tkt) => (
                    <tr key={tkt.id} className="hover:bg-surface-base">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-wine-950 font-display text-sm">
                          {tkt.participant_name}
                        </span>
                        <p className="font-mono text-[11px] text-brand-burgundy font-semibold">
                          NIM {tkt.participant_nim}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-wine-900">
                        {tkt.ticket_token}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            tkt.is_checked_in
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tkt.is_checked_in ? "Hadir" : "Belum Hadir"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-wine-700">
                        {tkt.checked_in_at
                          ? new Date(tkt.checked_in_at).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit"
                            }) + " WIB"
                          : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-wine-600">
                        {tkt.is_checked_in ? "Kamera Barcode/QR" : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/organization/events/${eventId}/check-in/${tkt.id}`}
                          className="px-2.5 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold"
                        >
                          Manual (ATT-04)
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
