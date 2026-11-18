"use client";

import { useState } from "react";
import Link from "next/link";
import { PublicShell } from "@/components/layout/public-shell";
import { useMockStore, addActivityHistory } from "@/lib/mock/store";
import { FeedbackItem } from "@/types/domain";
import { MessageSquare, Send, CheckCircle2, Copy, Shield, Lock, AlertCircle } from "lucide-react";

export default function PublicFeedbackPage() {
  const { store, saveStore } = useMockStore();

  const [category, setCategory] = useState<"Aspirasi" | "Kritik" | "Saran" | "Pertanyaan">("Saran");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");

  const [receiptCode, setReceiptCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim() || !message.trim()) {
      setErrorMsg("Mohon isi judul dan isi pesan aspirasi Anda.");
      return;
    }

    const code = `FB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newFeedback: FeedbackItem = {
      id: `feedback-${Date.now()}`,
      category,
      title: title.trim(),
      message: message.trim(),
      sender_name_optional: senderName.trim() || "Anonim",
      sender_contact_optional: senderContact.trim() || undefined,
      receipt_code: code,
      status: "submitted",
      created_at: new Date().toISOString()
    };

    store.feedback.unshift(newFeedback);
    addActivityHistory(
      senderName.trim() || "Publik Anonim",
      "mengirimkan aspirasi ke kotak suara",
      `${category}: ${title.trim()} (${code})`,
      "Kotak Suara"
    );
    saveStore(store);

    setReceiptCode(code);
  };

  const handleCopy = () => {
    if (receiptCode) {
      navigator.clipboard.writeText(receiptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PublicShell>
      <div className="max-w-3xl mx-auto px-6 space-y-8">
        {!receiptCode ? (
          <div className="p-8 rounded-3xl bg-surface-card border border-wine-950/10 shadow-xl space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono font-bold text-brand-burgundy px-3 py-1 rounded-full bg-gold-50 border border-gold-300">
                Saluran Partisipasi Publik
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wine-950">
                Kotak Suara HIPMI CENTRAL
              </h1>
              <p className="text-xs sm:text-sm text-neutral-dark leading-relaxed">
                Kirimkan aspirasi, kritik membangun, saran program kerja, atau pertanyaan Anda untuk kepengurusan HIPMI PT Universitas Telkom.
              </p>
            </div>

            {/* Privacy Assurance Banner */}
            <div className="p-4 rounded-2xl bg-surface-ivory border border-gold-400/40 text-xs text-neutral-dark flex items-start gap-3">
              <Lock className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-wine-950 block">Privasi &amp; Kerahasiaan Terjamin:</strong>
                <span>
                  Isi masukan Anda bersifat tertutup dan hanya dapat dibaca oleh tim operator dan jajaran pimpinan yang berwenang. Identitas nama dan kontak bersifat opsional.
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Kategori Masukan <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Aspirasi", "Kritik", "Saran", "Pertanyaan"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        category === cat
                          ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm"
                          : "bg-surface-ivory text-neutral-dark border-wine-950/10 hover:bg-gold-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Pokok Masukan / Judul <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Usulan kurasi tenant halal pada expo tahunan"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-black mb-1.5">
                  Uraian Lengkap Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan aspirasi, kritik, atau saran Anda secara santun dan konstruktif..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-wine-950/10">
                <div>
                  <label className="block text-xs font-medium text-neutral-black mb-1.5">
                    Nama Anda (Opsional)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Kosongkan bila ingin anonim"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-black mb-1.5">
                    Kontak WhatsApp / Email (Opsional)
                  </label>
                  <input
                    type="text"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="Diisi jika membutuhkan tindak lanjut balasan"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-ivory/80 border border-neutral-light/40 text-xs text-neutral-black focus:outline-none focus:border-brand-burgundy"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-burgundy hover:bg-brand-darkWine text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>Kirimkan Aspirasi Saya</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Receipt Code View */
          <div className="p-8 rounded-3xl bg-surface-card border border-gold-500/50 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-wine-950">
                Aspirasi Anda Berhasil Terkirim!
              </h2>
              <p className="text-xs text-neutral-dark max-w-md mx-auto leading-relaxed">
                Terima kasih atas partisipasi aktif Anda dalam memajukan organisasi HIPMI PT Universitas Telkom. Masukan Anda telah masuk ke dalam antrean tinjauan tim sekretariat.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-6 rounded-2xl bg-surface-ivory border border-gold-400/50 max-w-md mx-auto space-y-3">
              <span className="text-[11px] font-mono text-neutral-light uppercase font-bold tracking-widest block">
                Kode Tanda Terima Privat:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-brand-burgundy tracking-wider">
                  {receiptCode}
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
              <button
                type="button"
                onClick={() => {
                  setReceiptCode(null);
                  setTitle("");
                  setMessage("");
                }}
                className="px-6 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow transition-colors"
              >
                Kirim Aspirasi Lain
              </button>

              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-surface-ivory hover:bg-neutral-light/20 text-neutral-black border border-wine-950/10 text-xs font-medium transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </PublicShell>
  );
}
