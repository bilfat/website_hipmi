"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Users,
  Search,
  Filter,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Mail,
  Send,
  ExternalLink,
  Download
} from "lucide-react";

export default function EventParticipantsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  if (!event) return null;

  const filteredTickets = tickets.filter((tkt) => {
    if (attendanceFilter === "checked_in" && !tkt.is_checked_in) return false;
    if (attendanceFilter === "not_checked_in" && tkt.is_checked_in) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = tkt.participant_name.toLowerCase().includes(q);
      const matchNim = tkt.participant_nim.toLowerCase().includes(q);
      const matchToken = tkt.ticket_token.toLowerCase().includes(q);
      const matchEmail = tkt.participant_email.toLowerCase().includes(q);
      if (!matchName && !matchNim && !matchToken && !matchEmail) return false;
    }
    return true;
  });

  const handleResend = (ticketToken: string, email: string) => {
    setResendNotice(`Tiket ${ticketToken} telah dikirim ulang ke ${email} melalui antrean broadcast.`);
    setTimeout(() => setResendNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> {event.title}
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                EVT-06
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Database Peserta & Pendaftar
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Daftar peserta terverifikasi, nomor token e-tiket, data akademik Telkom, dan status kehadiran.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-wine-700 bg-white border border-wine-200 px-3 py-1.5 rounded-xl shadow-2xs">
              Total Peserta Terdaftar: {tickets.length}
            </span>
          </div>
        </div>

        {resendNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{resendNotice}</span>
          </div>
        )}

        {/* Filter bar */}
        <div className="p-4 rounded-xl bg-white border border-wine-100 shadow-xs flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-wine-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari nama peserta, NIM Telkom, atau token tiket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-wine-200 text-xs text-wine-900 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
            />
          </div>

          <select
            value={attendanceFilter}
            onChange={(e) => setAttendanceFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-wine-200 bg-white text-wine-800 focus:outline-none focus:ring-1 focus:ring-brand-burgundy"
          >
            <option value="all">Semua Presensi</option>
            <option value="checked_in">Sudah Hadir (Checked-in)</option>
            <option value="not_checked_in">Belum Hadir</option>
          </select>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Nama Peserta & NIM</th>
                  <th className="py-3.5 px-4">Token E-Tiket</th>
                  <th className="py-3.5 px-4">Jenis Tiket</th>
                  <th className="py-3.5 px-4">Kontak Peserta</th>
                  <th className="py-3.5 px-4">Status Presensi</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Tidak ada peserta yang cocok dengan kriteria pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((tkt) => {
                    const tier = store.ticket_types.find((tt) => tt.id === tkt.ticket_type_id);
                    return (
                      <tr key={tkt.id} className="hover:bg-surface-base">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-wine-950 font-display text-sm">
                            {tkt.participant_name}
                          </span>
                          <p className="font-mono text-[11px] text-brand-burgundy font-semibold">
                            NIM: {tkt.participant_nim}
                          </p>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-wine-900">
                          <Link href={`/tiket/${tkt.id}`} target="_blank" className="hover:underline hover:text-brand-burgundy">
                            {tkt.ticket_token}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-wine-50 text-wine-800 border border-wine-100">
                            {tier?.name || "Regular"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-wine-800 font-mono text-[11px]">{tkt.participant_email}</p>
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
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleResend(tkt.ticket_token, tkt.participant_email)}
                            className="px-2.5 py-1 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Send className="w-3 h-3 text-brand-burgundy" /> Resend
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
