"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore } from "@/lib/mock/store";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket, Check, ShieldAlert } from "lucide-react";

export default function TicketSelectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { store } = useMockStore();

  const evt = store.events.find((e) => e.id === id) || store.events[0];
  const ticketTypes = store.ticket_types.filter((tt) => tt.event_id === evt.id);

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    ticketTypes[0]?.id || ""
  );

  const selectedTicket = ticketTypes.find((t) => t.id === selectedTicketId) || ticketTypes[0];

  const handleContinue = () => {
    if (!selectedTicket) return;
    router.push(`/aktivitas/agenda/${evt.id}/daftar?ticket_type_id=${selectedTicket.id}`);
  };

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/aktivitas/agenda/${evt.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Detail Agenda</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-01
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Langkah 1 dari 3
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Pilih Jenis Tiket
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Silakan pilih kategori tiket untuk menghadiri <strong>{evt.title}</strong>.
          </p>
        </div>

        {/* Event Quick Info Capsule */}
        <div className="p-4 rounded-2xl bg-surface-card border border-wine-950/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-neutral-light block text-[10px]">Waktu Acara</span>
              <strong className="text-wine-950 font-mono">
                {new Date(evt.schedule_start).toLocaleDateString("id-ID", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-neutral-light block text-[10px]">Lokasi Acara</span>
              <strong className="text-wine-950">{evt.location}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-light/10 text-wine-950 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-neutral-light block text-[10px]">Penyelenggara</span>
              <strong className="text-wine-950">{evt.organizer_unit}</strong>
            </div>
          </div>
        </div>

        {/* Ticket Options Grid */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-wine-950/80 font-mono">
            Pilihan Kategori Tiket
          </h2>

          <div className="space-y-3">
            {ticketTypes.map((tt) => {
              const remaining = Math.max(0, tt.quota_total - tt.quota_reserved - tt.quota_sold);
              const isSelected = selectedTicketId === tt.id;
              const isSoldOut = remaining === 0;

              return (
                <div
                  key={tt.id}
                  onClick={() => !isSoldOut && setSelectedTicketId(tt.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative ${
                    isSoldOut
                      ? "opacity-50 bg-neutral-100 border-neutral-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-surface-card border-brand-burgundy shadow-lg ring-2 ring-brand-burgundy/20"
                      : "bg-surface-card border-wine-950/10 hover:border-brand-burgundy/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-brand-burgundy border-brand-burgundy text-white"
                              : "border-neutral-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-wine-950">
                          {tt.name}
                        </h3>
                        {isSoldOut ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-mono font-bold">
                            Habis
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                            Tersedia ({remaining} Kuota)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-dark pl-8">
                        {tt.description || "Akses seminar, e-certificate resmi, coffee break, & merchandise pack."}
                      </p>
                    </div>

                    <div className="sm:text-right pl-8 sm:pl-0 shrink-0">
                      <span className="text-[10px] text-neutral-light block uppercase font-mono">
                        Harga Tiket
                      </span>
                      <strong className="font-serif text-xl sm:text-2xl font-bold text-wine-950">
                        {tt.price === 0 ? "GRATIS" : `Rp ${tt.price.toLocaleString("id-ID")}`}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notice box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Ketentuan Pemesanan:</strong> Satu pemesanan hanya berlaku untuk 1 tiket per peserta (single ticket order). Pembayaran tiket berbayar diselesaikan via simulasi QRIS dengan countdown 180 detik.
          </p>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-wine-950 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono text-gold-300 block">
              Kategori Terpilih
            </span>
            <div className="font-serif text-lg sm:text-xl font-bold flex items-center gap-2">
              <span>{selectedTicket?.name || "Belum dipilih"}</span>
              <span className="text-xs font-mono text-gold-400 font-normal">
                ({selectedTicket?.price === 0 ? "Gratis" : `Rp ${selectedTicket?.price.toLocaleString("id-ID")}`})
              </span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedTicket}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-brand-burgundy hover:bg-brand-burgundy/90 text-white font-medium text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Lanjut ke Formulir Data Diri</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PublicShell>
  );
}
