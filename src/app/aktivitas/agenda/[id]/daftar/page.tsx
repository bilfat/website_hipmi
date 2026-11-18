"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { BrandLoader } from "@/components/ui/brand-loader";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Ticket,
  Clock,
  Sparkles
} from "lucide-react";
import { TicketReservation, IssuedTicket, PaymentStatus, RegistrationStatus } from "@/types/domain";

export default function TicketRegistrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<BrandLoader message="Memuat formulir pendaftaran..." />}>
      <TicketRegistrationContent params={params} />
    </Suspense>
  );
}

function TicketRegistrationContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const ticketTypeId = searchParams.get("ticket_type_id");
  const router = useRouter();
  const { store, currentUser } = useMockStore();

  const evt = store.events.find((e) => e.id === id) || store.events[0];
  const ticketTypes = store.ticket_types.filter((tt) => tt.event_id === evt.id);
  const selectedTicket =
    ticketTypes.find((tt) => tt.id === ticketTypeId) || ticketTypes[0];

  // Map faculty & study program from currentUser if available
  const userFacultyObj = store.faculties.find((f) => f.id === currentUser?.faculty_id) || store.faculties[0];
  const userStudyProgramObj = userFacultyObj?.study_programs?.find((sp: { id: string; name: string }) => sp.id === currentUser?.study_program_id) || userFacultyObj?.study_programs?.[0];

  // 6 Identity fields state
  const [name, setName] = useState(currentUser?.name || "");
  const [nim, setNim] = useState(currentUser?.nim || "1301213001");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "081234567890");
  const [faculty, setFaculty] = useState(userFacultyObj?.name || "Fakultas Informatika");

  const currentFacultyObj = store.faculties.find((f) => f.name === faculty) || store.faculties[0];
  const [studyProgram, setStudyProgram] = useState(
    userStudyProgramObj?.name || currentFacultyObj?.study_programs?.[0]?.name || "S1 Informatika"
  );

  const [agreedConsent, setAgreedConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFacultyChange = (newFaculty: string) => {
    setFaculty(newFaculty);
    const fObj = store.faculties.find((f) => f.name === newFaculty);
    if (fObj && fObj.study_programs && fObj.study_programs.length > 0) {
      setStudyProgram(fObj.study_programs[0].name);
    }
  };

  const handlePrefillCurrentUser = () => {
    if (currentUser) {
      setName(currentUser.name);
      setNim(currentUser.nim || "1301213001");
      setEmail(currentUser.email);
      setPhone(currentUser.phone || "081234567890");
      const f = store.faculties.find((item) => item.id === currentUser.faculty_id);
      if (f) {
        setFaculty(f.name);
        const sp = f.study_programs?.find((item: { id: string; name: string }) => item.id === currentUser.study_program_id);
        if (sp) {
          setStudyProgram(sp.name);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !nim.trim() || !email.trim() || !phone.trim() || !faculty || !studyProgram) {
      setErrorMsg("Mohon lengkapi seluruh 6 kolom identitas yang wajib diisi.");
      return;
    }

    if (!agreedConsent) {
      setErrorMsg("Anda harus menyetujui syarat & ketentuan sebelum melanjutkan.");
      return;
    }

    setIsSubmitting(true);

    const isPaid = selectedTicket ? selectedTicket.price > 0 : false;
    const reservationId = `res-${Date.now()}`;
    const expiresAt = new Date(Date.now() + 180 * 1000).toISOString(); // 180 seconds countdown

    const paymentStatus: PaymentStatus = isPaid ? "unpaid" : "approved";
    const regStatus: RegistrationStatus = isPaid ? "reserved" : "issued";

    const newReservation: TicketReservation = {
      id: reservationId,
      event_id: evt.id,
      ticket_type_id: selectedTicket.id,
      participant_name: name.trim(),
      participant_nim: nim.trim(),
      participant_email: email.trim(),
      participant_phone: phone.trim(),
      participant_faculty: faculty,
      participant_study_program: studyProgram,
      amount: selectedTicket.price,
      reservation_expires_at: expiresAt,
      payment_status: paymentStatus,
      registration_status: regStatus,
      created_at: new Date().toISOString()
    };

    mutateStore((draft) => {
      draft.reservations.unshift(newReservation);

      // Increment quota_reserved or quota_sold on ticket type
      const tt = draft.ticket_types.find((t) => t.id === selectedTicket.id);
      if (tt) {
        if (isPaid) {
          tt.quota_reserved += 1;
        } else {
          tt.quota_sold += 1;
        }
      }

      // If free ticket, issue ticket immediately
      if (!isPaid) {
        const newTicket: IssuedTicket = {
          id: `tkt-${Date.now()}`,
          reservation_id: reservationId,
          event_id: evt.id,
          ticket_type_id: selectedTicket.id,
          ticket_token: `DEMO-TKT-${Math.floor(1000 + Math.random() * 9000)}`,
          participant_name: name.trim(),
          participant_nim: nim.trim(),
          participant_email: email.trim(),
          issued_at: new Date().toISOString(),
          is_checked_in: false,
          checked_in_at: null,
          check_in_operator_id: null
        };
        draft.tickets.unshift(newTicket);
      }

      addActivityHistory(
        name.trim(),
        isPaid ? "membuat reservasi tiket berbayar" : "mendaftar tiket gratis",
        `${evt.title} (${selectedTicket.name})`,
        "Tiket & Agenda"
      );
    });

    if (isPaid) {
      router.push(`/pendaftaran/${reservationId}/bayar`);
    } else {
      router.push(`/pendaftaran/${reservationId}/status`);
    }
  };

  return (
    <PublicShell>
      <div className="max-w-4xl mx-auto px-6 space-y-8 pb-16">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/aktivitas/agenda/${evt.id}/tiket`}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Pemilihan Tiket</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: TKT-02
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Langkah 2 dari 3
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
            Formulir Data Diri Peserta
          </h1>
          <p className="text-xs sm:text-sm text-neutral-dark">
            Pastikan data diri Anda akurat untuk penerbitan e-tiket resmi dan verifikasi kehadiran.
          </p>
        </div>

        {/* Ticket Summary Capsule */}
        <div className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-brand-burgundy" />
              <span className="text-xs font-mono font-bold uppercase text-brand-burgundy">
                {selectedTicket?.name || "Kategori Tiket"}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-wine-950">
              {evt.title}
            </h3>
            <p className="text-xs text-neutral-light">
              Venue: {evt.location}
            </p>
          </div>

          <div className="sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-wine-950/10">
            <span className="text-[10px] text-neutral-light block uppercase font-mono">
              Total Biaya
            </span>
            <span className="font-serif text-2xl font-bold text-brand-burgundy">
              {selectedTicket?.price === 0
                ? "GRATIS"
                : `Rp ${selectedTicket?.price.toLocaleString("id-ID")}`}
            </span>
          </div>
        </div>

        {/* Demo Autofill Hint */}
        <div className="p-3.5 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-between text-xs text-wine-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
            <span>
              Sedang login sebagai <strong>{currentUser?.name || "Pengguna Demo"}</strong>?
            </span>
          </div>
          <button
            type="button"
            onClick={handlePrefillCurrentUser}
            className="px-3 py-1 rounded-lg bg-white border border-gold-500/30 text-wine-950 font-medium hover:bg-gold-50 transition-colors text-[11px]"
          >
            Gunakan Data Akun Ini
          </button>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-wine-950/80 font-mono">
              6 Kolom Identitas Peserta
            </h2>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 1: Nama Lengkap */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-wine-950">
                  1. Nama Lengkap (Sesuai KTP / KTM) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Bintang Al-Fath"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
              </div>

              {/* Field 2: NIM */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  2. Nomor Induk Mahasiswa (NIM) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Contoh: 1301213001"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950 font-mono"
                />
              </div>

              {/* Field 3: WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  3. Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
              </div>

              {/* Field 4: Email */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-wine-950">
                  4. Alamat Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Contoh: bintang@telkomuniversity.ac.id"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                />
                <span className="text-[11px] text-neutral-light">
                  E-tiket dan konfirmasi pemesanan akan dikirimkan ke alamat email ini.
                </span>
              </div>

              {/* Field 5: Fakultas */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  5. Fakultas <span className="text-red-500">*</span>
                </label>
                <select
                  value={faculty}
                  onChange={(e) => handleFacultyChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                >
                  {store.faculties.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 6: Program Studi */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-wine-950">
                  6. Program Studi <span className="text-red-500">*</span>
                </label>
                <select
                  value={studyProgram}
                  onChange={(e) => setStudyProgram(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/30 text-sm text-wine-950"
                >
                  {currentFacultyObj?.study_programs?.map((sp: { id: string; name: string }) => (
                    <option key={sp.id} value={sp.name}>
                      {sp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-4 border-t border-wine-950/10">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-dark">
                <input
                  type="checkbox"
                  checked={agreedConsent}
                  onChange={(e) => setAgreedConsent(e.target.checked)}
                  className="mt-0.5 rounded border-wine-950/20 text-brand-burgundy focus:ring-brand-burgundy/30"
                />
                <span className="leading-relaxed">
                  Saya menyatakan bahwa data yang saya masukkan adalah sah dan benar. Saya menyetujui seluruh ketentuan tata tertib acara HIPMI CENTRAL serta penggunaan data pribadi untuk keperluan verifikasi kehadiran acara ini.
                </span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/aktivitas/agenda/${evt.id}/tiket`}
              className="px-6 py-2.5 rounded-full border border-wine-950/20 text-xs font-medium text-wine-950 hover:bg-wine-950/5 transition-colors"
            >
              Ubah Tiket
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white font-medium text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Memproses Data...</span>
              ) : selectedTicket?.price > 0 ? (
                <>
                  <span>Lanjut ke Pembayaran QRIS (180s)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Konfirmasi & Terbitkan E-Tiket Gratis</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </PublicShell>
  );
}
