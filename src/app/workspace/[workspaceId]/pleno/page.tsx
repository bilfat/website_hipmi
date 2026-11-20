"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { PlenoNote } from "@/types/domain";
import {
  ArrowLeft,
  Plus,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Trash2,
} from "lucide-react";

const DEFAULT_SEED_PLENO: PlenoNote[] = [
  {
    id: "pleno-seed-1",
    workspace_id: "comp-demo-01",
    title: "Rapat Pleno Koordinasi Awal Semester",
    date: "2026-09-12",
    leader: "Kepala Kompartemen",
    summary: "Penyusunan linimasa program kerja utama dan penetapan pengelola proker.",
    decisions: [
      "Target pendaftaran proker disahkan bersama Bidang",
      "Roster tim pelaksana dibuka untuk kader terverifikasi",
      "RAB tahap awal segera diajukan ke Bendahara Umum",
    ],
    follow_ups: ["Finalisasi proposal & surat peminjaman ruangan ke Sekum"],
    deadline: "2026-09-25",
    created_at: "2026-09-12T10:00:00Z",
  },
  {
    id: "pleno-seed-2",
    workspace_id: "comp-demo-01",
    title: "Evaluasi Progres Tengah Periode",
    date: "2026-10-24",
    leader: "Sekretaris Kompartemen",
    summary: "Review capaian naratif proker dan kesiapan logistik jelang main event.",
    decisions: [
      "Percepatan publikasi media partner eksternal",
      "Penyelarasan rundown acara dan pengantar ke Ditmawa",
    ],
    follow_ups: ["Koordinasi sponsor dari Direktori Mitra"],
    deadline: "2026-11-05",
    created_at: "2026-10-24T15:00:00Z",
  },
];

export default function WorkspacePlenoNotesPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const field = store.fields.find((f) => f.id === workspaceId);
  const compartment = store.compartments.find((c) => c.id === workspaceId);
  const unit = field || compartment || store.compartments[0];

  const canManagePleno =
    permissions.isKakom || permissions.isTopManagement || permissions.isSekum;

  // Linked Pleno schedules from Organization Calendar (prevents duplicate scheduling per front_end.md!)
  const calendarPlenoSchedules = (store.calendar_events || []).filter(
    (ev) =>
      ev.category === "Pleno" ||
      ev.title.toLowerCase().includes("pleno") ||
      ev.title.toLowerCase().includes("rapat")
  );

  // Combine persisted store notes with fallback seed notes if none created yet for demo
  const storedNotes = (store.pleno_notes || []).filter(
    (n) => n.workspace_id === workspaceId
  );
  const notes =
    storedNotes.length > 0
      ? storedNotes
      : DEFAULT_SEED_PLENO.map((n) => ({ ...n, workspace_id: workspaceId }));

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [linkedCalId, setLinkedCalId] = useState("");
  const [summary, setSummary] = useState("");
  const [decisionsText, setDecisionsText] = useState("");
  const [followUpsText, setFollowUpsText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setLinkedCalId("");
    setSummary("");
    setDecisionsText("");
    setFollowUpsText("");
    setDeadline("");
    setModalOpen(true);
  };

  const handleSelectCalendarLink = (calId: string) => {
    setLinkedCalId(calId);
    const matched = calendarPlenoSchedules.find((c) => c.id === calId);
    if (matched) {
      if (!title.trim()) setTitle(`Notulensi: ${matched.title}`);
      if (matched.start_time) setDate(matched.start_time.slice(0, 10));
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEntry: PlenoNote = {
      id: `pleno-${Date.now()}`,
      workspace_id: workspaceId,
      title: title.trim(),
      date: date || new Date().toISOString().split("T")[0],
      leader: currentUser.name,
      summary: summary.trim() || "Rapat koordinasi dan evaluasi unit.",
      decisions: decisionsText
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean),
      follow_ups: followUpsText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      deadline: deadline || undefined,
      calendar_event_id: linkedCalId || undefined,
      created_at: new Date().toISOString(),
    };

    mutateStore((draft) => {
      if (!draft.pleno_notes) {
        draft.pleno_notes = DEFAULT_SEED_PLENO.map((n) => ({
          ...n,
          workspace_id: workspaceId,
        }));
      }
      draft.pleno_notes.unshift(newEntry);
      addActivityHistory(
        currentUser.name,
        "mencatat notulensi rapat pleno baru",
        `${title.trim()} (${unit?.name || "Unit"})`,
        "Pleno Unit"
      );
    });

    setModalOpen(false);
    setFeedback(`Notulensi "${title.trim()}" berhasil disimpan ke riwayat pleno unit.`);
  };

  const handleDeleteNote = (id: string) => {
    mutateStore((draft) => {
      if (!draft.pleno_notes) return;
      draft.pleno_notes = draft.pleno_notes.filter((n) => n.id !== id);
    });
    setFeedback("Notulensi pleno berhasil dihapus.");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/workspace/${workspaceId}`}
              className="text-xs font-semibold text-brand-burgundy hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Workspace {unit?.name || "Unit"}</span>
            </Link>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
              • Pleno &amp; Aktivitas Unit
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Pleno &amp; Notulensi: {unit?.name || "Unit"}
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Dokumentasi rapat pleno, keputusan strategis, tindak lanjut, serta tautan jadwal pleno dari Kalender Organisasi tanpa duplikasi jadwal.
          </p>
        </div>

        {canManagePleno && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Notulensi Pleno</span>
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Synced Calendar Pleno Schedule Strip */}
      <section className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-serif text-base font-bold text-wine-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-burgundy" />
              <span>Jadwal Pleno Terdaftar di Kalender ({calendarPlenoSchedules.length})</span>
            </h2>
            <p className="text-[11px] text-neutral-dark">
              Jadwal rapat yang sudah tercatat di Kalender Organisasi otomatis muncul di sini agar tidak terjadi duplikasi jadwal.
            </p>
          </div>
          <Link
            href="/organization/calendar"
            className="text-xs font-semibold text-brand-burgundy hover:underline"
          >
            Buka Kalender Organisasi →
          </Link>
        </div>

        {calendarPlenoSchedules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {calendarPlenoSchedules.slice(0, 6).map((cal) => (
              <div
                key={cal.id}
                className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] text-xs space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-brand-burgundy">
                  {cal.start_time ? new Date(cal.start_time).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}{" "}
                  {cal.start_time
                    ? `• ${new Date(cal.start_time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`
                    : ""}
                </span>
                <strong className="text-wine-950 block truncate">{cal.title}</strong>
                <span className="text-[11px] text-neutral-dark block truncate">
                  {cal.location || "Lokasi menyesuaikan"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-dark p-4 rounded-2xl bg-[#FCF8F6]">
            Belum ada jadwal pleno mendatang pada Kalender Organisasi.
          </p>
        )}
      </section>

      {/* Pleno Notes Feed */}
      <div className="space-y-4">
        {notes.map((note) => (
          <article
            key={note.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                    {note.date}
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                    Pimpinan / Notulis: {note.leader}
                  </span>
                  {note.deadline && (
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Deadline: {note.deadline}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-bold text-wine-950">{note.title}</h3>
              </div>

              {canManagePleno && !note.id.startsWith("pleno-seed-") && (
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-2 rounded-xl text-neutral-light hover:text-rose-600 hover:bg-rose-50 transition-colors self-start"
                  aria-label="Hapus notulensi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-neutral-dark leading-relaxed">{note.summary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {note.decisions.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
                  <strong className="text-wine-950 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-brand-burgundy" />
                    <span>Keputusan Rapat</span>
                  </strong>
                  <ul className="space-y-1.5">
                    {note.decisions.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-wine-950">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {note.follow_ups && note.follow_ups.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
                  <strong className="text-wine-950 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#AF7D66]" />
                    <span>Tindak Lanjut</span>
                  </strong>
                  <ul className="space-y-1.5">
                    {note.follow_ups.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-neutral-dark">
                        <span className="font-mono text-brand-burgundy font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Modal Tambah Notulensi Pleno */}
      <EditorialModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        badge="Pleno & Notulensi Unit"
        title="Tambah Notulensi Rapat Pleno"
        subtitle="Catat hasil rapat, keputusan, tindak lanjut, dan tautkan dengan jadwal kalender bila sudah ada."
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-pleno-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan Notulensi
            </button>
          </>
        }
      >
        <form id="add-pleno-form" onSubmit={handleAddNote} className="space-y-3.5 text-xs">
          {calendarPlenoSchedules.length > 0 && (
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">
                Tautkan Jadwal Pleno dari Kalender (Opsional — cegah duplikasi)
              </label>
              <select
                value={linkedCalId}
                onChange={(e) => handleSelectCalendarLink(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              >
                <option value="">-- Tidak menautkan jadwal kalender --</option>
                {calendarPlenoSchedules.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.start_time ? c.start_time.slice(0, 10) : "-"} — {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-wine-950">
                Judul Rapat Pleno <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pleno Persiapan H-14 Business Expo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tanggal Pelaksanaan</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Deadline Tindak Lanjut</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Ringkasan Pembahasan</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan poin evaluasi dan koordinasi rapat..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Butir Keputusan (1 baris per poin)
            </label>
            <textarea
              rows={3}
              value={decisionsText}
              onChange={(e) => setDecisionsText(e.target.value)}
              placeholder={"Target peserta ditetapkan 300 orang\nPembukaan pendaftaran dimulai Senin depan"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Tindak Lanjut (1 baris per poin)
            </label>
            <textarea
              rows={2}
              value={followUpsText}
              onChange={(e) => setFollowUpsText(e.target.value)}
              placeholder={"Kirim surat peminjaman aula ke Sekum\nAjukan RAB konsumsi ke Bendum"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
            />
          </div>
        </form>
      </EditorialModal>
    </div>
  );
}
