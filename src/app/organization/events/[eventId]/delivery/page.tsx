"use client";

import { use, useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Mail,
  ChevronLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCw,
  Send,
  Ticket,
  ShieldCheck
} from "lucide-react";

export default function TicketDeliveryHistoryPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const [deliveryStatus, setDeliveryStatus] = useState<{ [token: string]: { status: string; attempts: number } }>({});
  const [notice, setNotice] = useState<string | null>(null);

  if (!event) return null;

  const handleResend = (ticketToken: string, email: string) => {
    const current = deliveryStatus[ticketToken] || { status: "sent", attempts: 1 };
    setDeliveryStatus({
      ...deliveryStatus,
      [ticketToken]: { status: "sent", attempts: current.attempts + 1 },
    });

    setNotice(
      `E-tiket ${ticketToken} telah dikirimkan ulang ke ${email}. Nomor tiket tetap sama sesuai aturan integritas ID.`
    );
    setTimeout(() => setNotice(null), 3000);
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
                EVT-08
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Ticket Delivery & Email History
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Log pengiriman e-tiket digital ke email peserta. Fitur resend menjaga integritas nomor tiket tanpa menerbitkan token baru.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface-base border border-wine-100 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span className="text-wine-700 font-medium">Idempotent Resend Enforced</span>
          </div>
        </div>

        {notice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}

        {/* Delivery Log Table */}
        <div className="bg-white rounded-2xl border border-wine-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-wine-50/50 text-wine-700 font-semibold border-b border-wine-100">
                <tr>
                  <th className="py-3.5 px-4">Token Tiket</th>
                  <th className="py-3.5 px-4">Nama Peserta & NIM</th>
                  <th className="py-3.5 px-4">Alamat Email Tujuan</th>
                  <th className="py-3.5 px-4">Status Pengiriman</th>
                  <th className="py-3.5 px-4 text-center">Percobaan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wine-50 text-wine-800">
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-wine-500">
                      Belum ada e-tiket yang diterbitkan untuk agenda ini.
                    </td>
                  </tr>
                ) : (
                  tickets.map((tkt) => {
                    const delivery = deliveryStatus[tkt.ticket_token] || { status: "sent", attempts: 1 };
                    return (
                      <tr key={tkt.id} className="hover:bg-surface-base">
                        <td className="py-3.5 px-4 font-mono font-bold text-brand-burgundy">
                          <Link href={`/tiket/${tkt.id}`} target="_blank" className="hover:underline">
                            {tkt.ticket_token}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-wine-950 font-display text-sm">
                            {tkt.participant_name}
                          </span>
                          <p className="text-[11px] text-wine-500 font-mono">NIM {tkt.participant_nim}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-wine-700">
                          {tkt.participant_email}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                            {delivery.status} (Terkirim)
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-wine-900">
                          {delivery.attempts}x
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleResend(tkt.ticket_token, tkt.participant_email)}
                            className="px-3 py-1.5 rounded-lg border border-wine-200 hover:bg-wine-50 text-wine-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                          >
                            <RotateCw className="w-3 h-3 text-brand-burgundy" /> Kirim Ulang
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
