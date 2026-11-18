"use client";

import { use } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  QrCode,
  Users,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ArrowRight,
  Camera,
  UserCheck,
  ShieldCheck,
  Search
} from "lucide-react";

export default function CheckInDashboardPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  const { store } = useMockStore();

  const event = store.events.find((e) => e.id === eventId);
  const tickets = store.tickets.filter((t) => t.event_id === eventId);

  const checkedInCount = tickets.filter((t) => t.is_checked_in).length;
  const remainingCount = tickets.length - checkedInCount;
  const percentage = tickets.length > 0 ? Math.round((checkedInCount / tickets.length) * 100) : 0;

  if (!event) return null;

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
                ATT-01
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Check-in Desk & Presensi Venue
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Pusat kendali kehadiran peserta di lokasi acara, pemindaian barcode/QR e-tiket, dan validasi fisik.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/organization/events/${eventId}/scanner`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-semibold text-xs shadow-md transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Buka QR Scanner (ATT-02)</span>
            </Link>
          </div>
        </div>

        {/* Aggregated KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Total Peserta Terdaftar</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-wine-950">
              {tickets.length} Orang
            </p>
            <p className="text-[11px] text-wine-500">Pemilik e-tiket valid</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Sudah Hadir di Venue</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
              {checkedInCount} ({percentage}%)
            </p>
            <p className="text-[11px] text-emerald-600">Check-in terverifikasi barcode/QR</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <span className="text-xs text-wine-500 font-medium">Belum Tiba / Belum Hadir</span>
            <p className="text-2xl sm:text-3xl font-bold font-mono text-amber-800">
              {remainingCount} Orang
            </p>
            <p className="text-[11px] text-amber-700">Menunggu kedatangan di meja registrasi</p>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/organization/events/${eventId}/scanner`}
            className="p-6 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-wine-950 group-hover:text-brand-burgundy">
                Scanner Barcode & QR (ATT-02)
              </h3>
              <p className="text-xs text-wine-600 mt-1">
                Kamera pemindai e-tiket langsung dengan feedback instan suara/visual dan input token manual.
              </p>
            </div>
          </Link>

          <Link
            href={`/organization/events/${eventId}/attendance`}
            className="p-6 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-wine-950 group-hover:text-brand-burgundy">
                Daftar Kehadiran Realtime (ATT-03)
              </h3>
              <p className="text-xs text-wine-600 mt-1">
                Tabel log presensi, filter kehadiran, pencarian manual peserta, dan ekspor daftar hadir.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </OrganizationShell>
  );
}
