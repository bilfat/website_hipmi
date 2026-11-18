"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  ArrowLeft,
  ArrowRight,
  Ticket,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export default function TicketSearchResultPage() {
  return (
    <Suspense fallback={<BrandLoader message="Memuat tiket terdaftar..." />}>
      <TicketSearchResultContent />
    </Suspense>
  );
}

function TicketSearchResultContent() {
  const searchParams = useSearchParams();
  const nim = searchParams.get("nim") || "";
  const { store } = useMockStore();

  const tickets = store.tickets.filter((t) => t.participant_nim === nim);
  const reservations = store.reservations.filter((r) => r.participant_nim === nim);

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href="/aktivitas/agenda/cek-tiket"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Pencarian NIM</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-07
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-emerald-100 text-emerald-800">
              Identitas Terverifikasi
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Daftar Tiket & Registrasi
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Berikut adalah seluruh tiket resmi dan status pendaftaran untuk NIM:{" "}
            <strong className="font-mono text-wine-950">{nim || "Semua Tiket"}</strong>
          </p>
        </div>

        {/* Section 1: E-Tickets Issued */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wine-950/80 font-mono flex items-center gap-2">
              <Ticket className="w-4 h-4 text-brand-burgundy" />
              <span>Tiket Resmi Diterbitkan ({tickets.length})</span>
            </h2>
          </div>

          {tickets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {tickets.map((t) => {
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
                          {ticketType?.name || "Regular"}
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
                        <span>Lihat & Cetak Tiket</span>
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
                Belum ada tiket aktif yang diterbitkan untuk NIM ini.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Pending Reservations / Payments */}
        {reservations.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-wine-950/10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wine-950/80 font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Riwayat Pengajuan & Pembayaran ({reservations.length})</span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {reservations.map((res) => {
                const evt = store.events.find((e) => e.id === res.event_id);
                return (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
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
                      <strong className="text-wine-950 block mt-1 font-serif text-sm">
                        {evt?.title}
                      </strong>
                    </div>

                    <Link
                      href={`/pendaftaran/${res.id}/status`}
                      className="px-4 py-1.5 rounded-full border border-wine-950/20 text-wine-950 hover:bg-wine-950/5 text-xs font-medium self-start sm:self-center"
                    >
                      Buka Rincian Status
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
          <h3 className="font-serif text-lg font-bold text-wine-950">
            Ingin Mengikuti Agenda Lainnya?
          </h3>
          <p className="text-xs text-neutral-dark max-w-md mx-auto">
            Jelajahi seminar, workshop, dan networking session eksklusif bersama para pengusaha muda HIPMI PT Telkom University.
          </p>
          <Link
            href="/aktivitas/agenda"
            className="inline-block px-6 py-2.5 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Lihat Semua Agenda
          </Link>
        </div>
      </div>
    </PublicShell>
  );
}
