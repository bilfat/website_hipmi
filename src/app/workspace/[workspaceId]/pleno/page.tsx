"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  FileText,
  ArrowLeft,
  Plus,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";

export default function WorkspacePlenoNotesPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { store, currentUser } = useMockStore();

  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const unit = field || compartment || store.compartments[0];

  const [notes, setNotes] = useState([
    {
      id: "pleno-1",
      title: "Rapat Pleno Koordinasi Awal Semester",
      date: "2026-09-12",
      leader: "Ketua Kompartemen",
      summary: "Penyusunan timeline proker utama dan penunjukan manajer operasional.",
      decisions: ["Target pendaftaran proker disahkan", "SK Roster tim pelaksana diterbitkan", "RAB diajukan ke Bendum"]
    },
    {
      id: "pleno-2",
      title: "Evaluasi Progres Tengah Periode",
      date: "2026-10-24",
      leader: "Sekretaris Kompartemen",
      summary: "Review capaian task board dan kesiapan logistik jelang main event.",
      decisions: ["Percepatan publikasi media partner", "Pemberitahuan rundown ke Ditmawa"]
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newDecisions, setNewDecisions] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: `pleno-${Date.now()}`,
      title: newTitle.trim(),
      date: new Date().toISOString().split("T")[0],
      leader: currentUser.name,
      summary: newSummary.trim(),
      decisions: newDecisions.split("\n").filter((d) => d.trim().length > 0)
    };

    setNotes([newEntry, ...notes]);
    mutateStore((draft) => {
      addActivityHistory(
        currentUser.name,
        "mencatat notulensi rapat pleno baru",
        `${newTitle.trim()} (${unit.name})`,
        "Notulensi Pleno"
      );
    });

    setNewTitle("");
    setNewSummary("");
    setNewDecisions("");
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/${workspaceId}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview {unit.name}</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: WRK-09
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Notulensi Pleno
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Catatan Rapat Pleno: {unit.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Dokumentasi keputusan strategis, evaluasi berkala, dan butir arahan rapat kerja.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Notulensi</span>
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form
          onSubmit={handleAddNote}
          className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-wine-950/20 shadow-xl space-y-4 text-xs"
        >
          <h3 className="font-serif text-base font-bold text-wine-950">
            Catat Risalah Rapat Baru
          </h3>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Agenda / Judul Rapat</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Rapat Pleno Persiapan H-7 Seminar"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-sm text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Ringkasan Diskusi</label>
            <textarea
              rows={3}
              value={newSummary}
              onChange={(e) => setNewSummary(e.target.value)}
              placeholder="Catatan poin-poin yang dibahas selama rapat berlangsung..."
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-xs text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Butir Keputusan (1 baris per butir)
            </label>
            <textarea
              rows={3}
              value={newDecisions}
              onChange={(e) => setNewDecisions(e.target.value)}
              placeholder="1. Pembagian tugas koordinator disepakati&#10;2. Pengajuan dana kas final"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-xs text-wine-950"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-full border border-wine-950/20 text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md"
            >
              Simpan Risalah Rapat
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-3xl bg-surface-card border border-wine-950/10 shadow-lg space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-wine-950/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-brand-burgundy flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{note.date}</span>
                </span>
                <h3 className="font-serif text-xl font-bold text-wine-950">
                  {note.title}
                </h3>
              </div>
              <span className="text-xs text-neutral-light font-mono">
                Dipimpin oleh: <strong className="text-wine-950">{note.leader}</strong>
              </span>
            </div>

            <p className="text-xs text-neutral-dark leading-relaxed">
              {note.summary}
            </p>

            {note.decisions.length > 0 && (
              <div className="p-4 rounded-2xl bg-surface-ivory border border-wine-950/10 space-y-2 text-xs">
                <strong className="text-wine-950 font-serif block">
                  Keputusan & Tindak Lanjut:
                </strong>
                <ul className="space-y-1 list-disc pl-5 text-neutral-dark">
                  {note.decisions.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
