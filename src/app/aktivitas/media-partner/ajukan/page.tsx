"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { MedpartSubmission } from "@/types/domain";
import { BrandLoader } from "@/components/ui/brand-loader";
import { Send, ArrowLeft, ArrowRight, CheckCircle2, Copy, AlertCircle, FileCheck } from "lucide-react";

function SubmitMedpartContent() {
  const searchParams = useSearchParams();
  const initialPackage = (searchParams.get("package") as any) || "Gratis";

  const { store, saveStore } = useMockStore();

  const [applicantName, setApplicantName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventName, setEventName] = useState("");
  const [packageType, setPackageType] = useState<"Gratis" | "Berbayar">(initialPackage);
  const [publishDate, setPublishDate] = useState("");
  const [posterUrl, setPosterUrl] = useState("https://drive.google.com/demo-poster.jpg");

  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!applicantName.trim() || !organization.trim() || !email.trim() || !eventName.trim()) {
      setErrorMsg("Mohon lengkapi seluruh formulir bertanda wajib.");
      return;
    }

    const uniqueCode = `MP-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;

    const newMedpart: MedpartSubmission = {
      id: `medpart-${Date.now()}`,
      tracking_code: uniqueCode,
      applicant_name: applicantName.trim(),
      organization: organization.trim(),
      contact_email: email.trim(),
      contact_phone: phone.trim(),
      event_name: eventName.trim(),
      package_type: packageType,
      package_name: packageType === "Gratis" ? "Paket Barter Media" : "Paket Premium Berbayar",
      amount: packageType === "Gratis" ? 0 : 250000,
      requested_publish_date: publishDate || "2026-12-01",
      poster_url: posterUrl,
      status: "submitted",
      created_at: new Date().toISOString()
    };

    store.medpart_submissions.unshift(newMedpart);
    addActivityHistory(
      applicantName.trim(),
      "mengajukan kerjasama media partner publik",
      `${eventName.trim()} (${uniqueCode})`,
      "Media Partner"
    );
    saveStore(store);

    setSubmittedCode(uniqueCode);
  };

  const handleCopy = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-8">
      {/* Breadcrumb */}
      <Link
        href="/aktivitas/media-partner"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Informasi Media Partner</span>
      </Link>

      {!submittedCode ? (
        <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
              Formulir Pengajuan
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950">
              Pengajuan Kerjasama Media Partner
            </h1>
            <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
              Isi data lengkap kegiatan Anda. Setelah formulir dikirim, sistem akan menerbitkan tanda terima berisikan <strong>Kode Tracking Unik</strong> untuk memeriksa progres review.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Nama Lengkap Pemohon / PIC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Contoh: Dimas Pratama"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Nama Organisasi / Komunitas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Contoh: BEM Fakultas Teknik"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Email Kontak PIC <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="pic@organisasi.test"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Nomor WhatsApp PIC <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-black mb-1.5">
                Nama Acara / Event <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Contoh: National Youth Summit 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Pilihan Paket Media Partner <span className="text-red-500">*</span>
                </label>
                <select
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                >
                  <option value="Gratis">Paket Barter Media (Rp0)</option>
                  <option value="Berbayar">Paket Premium Komersial (Rp250.000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Tanggal Publikasi yang Diminta <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-black mb-1.5">
                Tautan File Poster / Drive Desain Promosi <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
              />
              <span className="text-[10px] text-neutral-light mt-1 block">
                Pastikan akses tautan Google Drive terbuka (anyone with the link can view).
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <span>Kirim Permohonan Media Partner</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Success Receipt View */
        <div className="p-8 rounded-3xl bg-surface-card border border-gold-500/50 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-wine-950">
              Pengajuan Berhasil Dikirim!
            </h2>
            <p className="text-xs text-neutral-dark max-w-md mx-auto">
              Simpan kode tracking unik di bawah ini untuk memeriksa status persetujuan redaksi dan jadwal publikasi acara Anda.
            </p>
          </div>

          {/* Tracking Code Highlight Box */}
          <div className="p-6 rounded-2xl bg-surface-ivory border border-gold-400/50 max-w-md mx-auto space-y-3">
            <span className="text-[11px] font-mono text-neutral-light uppercase font-bold tracking-widest block">
              Kode Tracking Pengajuan Anda:
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-brand-burgundy tracking-wider">
                {submittedCode}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-2 rounded-xl bg-gold-50 hover:bg-gold-100 text-brand-burgundy border border-gold-300 transition-colors"
                title="Salin Kode"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-700 font-semibold block">Kode disalin ke clipboard!</span>}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link
              href={`/aktivitas/media-partner/cek-status?code=${submittedCode}`}
              className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Periksa Status Pengajuan Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/aktivitas/media-partner"
              className="px-6 py-2.5 rounded-full bg-surface-ivory hover:bg-neutral-light/20 text-neutral-black border border-wine-950/10 text-xs font-medium transition-colors"
            >
              Selesai
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SubmitMedpartPage() {
  return (
    <PublicShell>
      <Suspense fallback={<div className="flex justify-center p-12"><BrandLoader size="md" /></div>}>
        <SubmitMedpartContent />
      </Suspense>
    </PublicShell>
  );
}
