"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore } from "@/lib/mock/store";
import {
  Ticket,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Search
} from "lucide-react";

export default function MyTicketsPage() {
  const { store, currentUser } = useMockStore();

  const userTickets = store.tickets.filter(
    (t) => t.participant_nim === currentUser.nim || t.participant_email === currentUser.email
  );
  const userReservations = store.reservations.filter(
    (r) => r.participant_nim === currentUser.nim || r.participant_email === currentUser.email
  );

  const [filter, setFilter] = useState<"all" | "active" | "checked_in">("all");

  const filteredTickets = userTickets.filter((t) => {
    if (filter === "active") return !t.is_checked_in;
    if (filter === "checked_in") return t.is_checked_in;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: PER-08 / TKT
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Registrasi & Tiket
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Daftar Tiket & Pendaftaran Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            Akses e-tiket resmi Anda dan pantau status verifikasi pembayaran agenda.
          </p>
        </div>

        <Link
          href="/aktivitas/agenda"
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 self-start sm:self-center"
        >
          <span>Pesan Tiket Baru</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-wine-950/10 pb-3 text-xs">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
            filter === "all"
              ? "bg-brand-burgundy text-white font-semibold"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          Semua Tiket ({userTickets.length})
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
            filter === "active"
              ? "bg-brand-burgundy text-white font-semibold"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          Siap Digunakan ({userTickets.filter((t) => !t.is_checked_in).length})
        </button>

        <button
          onClick={() => setFilter("checked_in")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
            filter === "checked_in"
              ? "bg-brand-burgundy text-white font-semibold"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          Sudah Hadir ({userTickets.filter((t) => t.is_checked_in).length})
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredTickets.map((t) => {
              const evt = store.events.find((e) => e.id === t.event_id);
              const ticketType = store.ticket_types.find((tt) => tt.id === t.ticket_type_id);

              return (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {t.ticket_token}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-400/20 text-wine-950">
                        {ticketType?.name || "VIP Regular"}
                      </span>
                      {t.is_checked_in ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">
                          Sudah Check-In
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Siap Digunakan
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-wine-950">
                      {evt?.title || "Agenda Organisasi"}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-dark pt-1">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                        <span>
                          {evt?.schedule_start
                            ? new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })
                            : "-"}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-600" />
                        <span>{evt?.location || "Telkom University"}</span>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={`/tiket/${t.id}`}
                      className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Buka E-Tiket</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
            <Ticket className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              Tidak ada tiket yang cocok dengan kriteria filter saat ini.
            </p>
          </div>
        )}
      </div>

      {/* Pending Reservations Section */}
      {userReservations.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-wine-950/10">
          <h2 className="font-serif text-lg font-bold text-wine-950 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Pendaftaran & Status Pembayaran ({userReservations.length})</span>
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {userReservations.map((res) => {
              const evt = store.events.find((e) => e.id === res.event_id);
              return (
                <div
                  key={res.id}
                  className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-light">
                        {res.id}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          res.registration_status === "issued" || res.registration_status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : res.registration_status === "pending_verification"
                            ? "bg-amber-100 text-amber-800"
                            : res.registration_status === "reserved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {res.registration_status}
                      </span>
                    </div>
                    <strong className="text-wine-950 block font-serif text-sm">
                      {evt?.title}
                    </strong>
                  </div>

                  <Link
                    href={`/pendaftaran/${res.id}/status`}
                    className="px-4 py-1.5 rounded-full border border-wine-950/20 text-wine-950 hover:bg-wine-950/5 text-xs font-medium self-start sm:self-center"
                  >
                    Rincian Status
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
