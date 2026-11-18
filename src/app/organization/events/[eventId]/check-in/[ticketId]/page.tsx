"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  UserCheck,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Building,
  User,
  Ticket
} from "lucide-react";

export default function ManualCheckInDetailPage({
  params,
}: {
  params: Promise<{ eventId: string; ticketId: string }>;
}) {
  const { eventId, ticketId } = use(params);
  const router = useRouter();
  const { store, updateStore, currentUser } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const ticket = store.tickets.find((t) => t.id === ticketId || t.ticket_token === ticketId);

  const [operatorNotes, setOperatorNotes] = useState("");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!event || !ticket) {
    return (
      <OrganizationShell>
        <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 space-y-4">
          <AlertTriangle className="w-10 h-10 text-brand-burgundy mx-auto" />
          <h2 className="text-xl font-bold font-display text-wine-950">Tiket Tidak Ditemukan</h2>
          <p className="text-sm text-wine-600">ID "{ticketId}" tidak terdaftar.</p>
          <Link
            href={`/organization/events/${eventId}/attendance`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy text-white text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Daftar Kehadiran
          </Link>
        </div>
      </OrganizationShell>
    );
  }

  const handleToggleCheckIn = () => {
    const newStatus = !ticket.is_checked_in;
    const updatedTickets = store.tickets.map((t) =>
      t.id === ticket.id
        ? {
            ...t,
            is_checked_in: newStatus,
            checked_in_at: newStatus ? new Date().toISOString() : null,
            check_in_operator_id: currentUser?.id || "manual-staff",
          }
        : t
    );

    updateStore({ tickets: updatedTickets });
    setActionNotice(
      newStatus
        ? `Status peserta "${ticket.participant_name}" berhasil diubah menjadi HADIR (Manual).`
        : `Check-in peserta "${ticket.participant_name}" telah dibatalkan.`
    );
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <OrganizationShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex items-center justify-between border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/organization/events/${eventId}/attendance`}
                className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Log Presensi
              </Link>
              <span className="text-xs text-wine-300">/</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                ATT-04
              </span>
            </div>
            <h1 className="text-2xl font-display font-bold text-wine-950">
              Detail / Manual Check-in
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pemeriksaan identitas fisik peserta dan override check-in manual oleh petugas registrasi.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Petugas Resmi Meja Registrasi</span>
          </div>
        </div>

        {actionNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Ticket & Participant Card */}
        <div className="p-6 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-wine-100 pb-4">
            <div>
              <span className="text-xs text-wine-500 font-medium">Token E-Tiket:</span>
              <p className="font-mono font-bold text-xl text-brand-burgundy">{ticket.ticket_token}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                ticket.is_checked_in
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {ticket.is_checked_in ? "Sudah Hadir" : "Belum Hadir"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-surface-base border border-wine-100 space-y-1">
              <span className="text-wine-500 font-medium">Nama Peserta:</span>
              <p className="font-bold text-wine-900 text-sm">{ticket.participant_name}</p>
              <p className="text-wine-600 font-mono">NIM Telkom: {ticket.participant_nim}</p>
            </div>

            <div className="p-3 rounded-xl bg-surface-base border border-wine-100 space-y-1">
              <span className="text-wine-500 font-medium">Kontak Terdaftar:</span>
              <p className="font-mono text-wine-800">{ticket.participant_email}</p>
              <p className="text-wine-500">Agenda: {event.title}</p>
            </div>
          </div>

          {ticket.is_checked_in && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Waktu Check-in Tercatat:
              </span>
              <p className="font-mono">
                {ticket.checked_in_at ? new Date(ticket.checked_in_at).toLocaleString("id-ID") : "-"} WIB
              </p>
              <p className="text-[11px] text-emerald-700">Operator ID: {ticket.check_in_operator_id || "Petugas Presensi"}</p>
            </div>
          )}

          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-wine-900 uppercase">Catatan Petugas Meja (Opsional)</label>
            <input
              type="text"
              placeholder="Contoh: Identitas diverifikasi via KTM Telkom fisik / KTP"
              value={operatorNotes}
              onChange={(e) => setOperatorNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-wine-200 focus:outline-none focus:ring-1 focus:ring-brand-burgundy text-wine-900"
            />
          </div>

          <div className="pt-4 border-t border-wine-100 flex items-center justify-between">
            <Link
              href={`/tiket/${ticket.id}`}
              target="_blank"
              className="text-xs font-semibold text-brand-burgundy hover:underline"
            >
              Lihat E-Tiket Digital Peserta
            </Link>

            <button
              type="button"
              onClick={handleToggleCheckIn}
              className={`px-5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-all ${
                ticket.is_checked_in
                  ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{ticket.is_checked_in ? "Batalkan Hadir (Reset)" : "Tandai Hadir Manual"}</span>
            </button>
          </div>
        </div>
      </div>
    </OrganizationShell>
  );
}
