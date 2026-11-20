"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
} from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { EditorialModal } from "@/components/ui/editorial-modal";
import { CalendarEvent } from "@/types/domain";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  AlertTriangle,
  List,
  Grid,
  CheckCircle2,
  Trash2,
  Building,
  Info,
} from "lucide-react";

const CATEGORY_STYLES: Record<string, { label: string; tone: string; dot: string }> = {
  Pleno: {
    label: "Rapat Pleno",
    tone: "bg-brand-burgundy/10 text-brand-burgundy border-brand-burgundy/25",
    dot: "bg-brand-burgundy",
  },
  Rapat: {
    label: "Rapat Internal",
    tone: "bg-sky-50 text-sky-800 border-sky-200",
    dot: "bg-sky-600",
  },
  "Main Event Proker": {
    label: "Main Event Proker",
    tone: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-600",
  },
  "Event Formal": {
    label: "Oprec / WWC / Formal",
    tone: "bg-[#E8B577]/25 text-[#6F4518] border-[#E8B577]/50",
    dot: "bg-[#AF7D66]",
  },
  Lainnya: {
    label: "Milestone Lainnya",
    tone: "bg-neutral-100 text-neutral-700 border-neutral-200",
    dot: "bg-neutral-500",
  },
};

export default function OrganizationCalendarPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  // Default List View on mobile, Month View on desktop (front_end.md CAL-01)
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const firstEv = store.calendar_events?.[0];
    if (firstEv) {
      const d = new Date(firstEv.start_time);
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("list");
    }
  }, []);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states for + Tambah Jadwal
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CalendarEvent["category"]>("Pleno");
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("21:00");
  const [location, setLocation] = useState("Aula Gedung B Telkom University");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"internal" | "public">("internal");

  const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];
  const calendarEvents = store.calendar_events || [];

  const filteredEvents = calendarEvents
    .filter((ev) => categoryFilter === "all" || ev.category === categoryFilter)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  // Soft Conflict Detection (Warning only, never blocks creation per front_end.md CAL-01)
  const dayCounts: Record<string, CalendarEvent[]> = {};
  calendarEvents.forEach((ev) => {
    const d = ev.start_time.split("T")[0];
    if (!dayCounts[d]) dayCounts[d] = [];
    dayCounts[d].push(ev);
  });
  const conflictingDays = Object.entries(dayCounts).filter(([, list]) => list.length > 1);
  const formDayConflicts = dayCounts[dateStr] || [];

  // Month grid computation
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dateStr) return;

    const newItem: CalendarEvent = {
      id: `cal-${Date.now()}`,
      cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
      title: title.trim(),
      category,
      start_time: `${dateStr}T${startTime}:00+07:00`,
      end_time: `${dateStr}T${endTime}:00+07:00`,
      location: location.trim() || "Telkom University",
      description: description.trim() || "Jadwal kegiatan internal organisasi.",
      visibility,
      owner_user_id: currentUser.id,
      created_at: new Date().toISOString(),
    };

    mutateStore((draft) => {
      if (!draft.calendar_events) draft.calendar_events = [];
      draft.calendar_events.push(newItem);
      addActivityHistory(
        currentUser.name,
        "menambahkan jadwal ke Kalender Organisasi",
        title.trim(),
        "Kalender Organisasi"
      );
    });

    setTitle("");
    setDescription("");
    setAddModalOpen(false);
    setFeedback(`Jadwal "${newItem.title}" berhasil ditambahkan ke Kalender Organisasi.`);
  };

  const handleDeleteSchedule = (id: string) => {
    mutateStore((draft) => {
      draft.calendar_events = (draft.calendar_events || []).filter((ev) => ev.id !== id);
    });
    setSelectedEvent(null);
    setFeedback("Jadwal berhasil dibatalkan dan dihapus dari kalender.");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Penjadwalan Internal &amp; Milestone Bertingkat
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Kalender Organisasi
          </h1>
          <p className="text-xs text-neutral-dark max-w-2xl">
            Pusat jadwal rapat pleno, oprec, wawancara, dan penanda tanggal Main Event. Jadwal tanggal hari ini otomatis tampil sebagai Pengumuman Dashboard mulai pukul <strong>00.01 WIB</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal</span>
        </button>
      </div>

      {/* Feedback Banner */}
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

      {/* Soft Conflict Warning */}
      {conflictingDays.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong className="block">
              Catatan Kepadatan Jadwal ({conflictingDays.length} tanggal memiliki &gt;1 kegiatan)
            </strong>
            <span className="text-amber-900">
              Sistem tidak memblokir jadwal paralel, namun pastikan koordinasi ruangan dan kehadiran pengurus tetap terjaga.
            </span>
          </div>
        </div>
      )}

      {/* Controls Row: View Switcher + Category Filter */}
      <div className="p-4 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: "all", label: `Semua (${calendarEvents.length})` },
            { key: "Pleno", label: "Pleno" },
            { key: "Rapat", label: "Rapat" },
            { key: "Event Formal", label: "Oprec / WWC" },
            { key: "Main Event Proker", label: "Main Event" },
          ].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
                categoryFilter === cat.key
                  ? "bg-brand-burgundy text-white border-brand-burgundy"
                  : "bg-[#FCF8F6] text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] self-start md:self-auto">
          {[
            { id: "month", label: "Bulanan", icon: Grid },
            { id: "list", label: "Daftar", icon: List },
          ].map((m) => {
            const Icon = m.icon;
            const active = viewMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setViewMode(m.id as "month" | "list")}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  active ? "text-white" : "text-neutral-dark hover:text-wine-950"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="calendar-view-toggle"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-brand-burgundy"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{m.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MONTH VIEW */}
      {viewMode === "month" && (
        <section className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-wine-950 capitalize">
              {currentMonth.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
            </h2>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="w-8 h-8 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 flex items-center justify-center text-wine-950"
                aria-label="Bulan sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="w-8 h-8 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 flex items-center justify-center text-wine-950"
                aria-label="Bulan berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-mono font-bold uppercase text-neutral-dark">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
              <div key={day} className="py-1.5">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarCells.map((dayNum, idx) => {
              if (!dayNum) {
                return <div key={`empty-${idx}`} className="min-h-[78px] rounded-xl bg-[#FCF8F6]/40" />;
              }
              const cellIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
              const dayItems = filteredEvents.filter((ev) => ev.start_time.startsWith(cellIso));

              return (
                <div
                  key={cellIso}
                  className="min-h-[84px] p-1.5 sm:p-2 rounded-xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col gap-1"
                >
                  <span className="text-[11px] font-mono font-semibold text-wine-950">
                    {dayNum}
                  </span>
                  <div className="space-y-1 overflow-hidden">
                    {dayItems.slice(0, 2).map((ev) => {
                      const st = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.Lainnya;
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          onClick={() => setSelectedEvent(ev)}
                          className={`w-full text-left px-1.5 py-1 rounded-md text-[10px] font-semibold truncate border ${st.tone} hover:opacity-90 transition-opacity`}
                        >
                          {ev.title}
                        </button>
                      );
                    })}
                    {dayItems.length > 2 && (
                      <span className="text-[9px] font-mono text-neutral-light block px-1">
                        +{dayItems.length - 2} lainnya
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* LIST / AGENDA VIEW (Always accessible & mobile default) */}
      {viewMode === "list" && (
        <section className="space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => {
              const st = CATEGORY_STYLES[ev.category] || CATEGORY_STYLES.Lainnya;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEvent(ev)}
                  className="w-full text-left p-4 sm:p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm hover:border-brand-burgundy/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono uppercase text-brand-burgundy font-bold">
                        {new Date(ev.start_time).toLocaleDateString("id-ID", { month: "short" })}
                      </span>
                      <strong className="font-serif text-lg font-bold text-wine-950 leading-none">
                        {new Date(ev.start_time).getDate()}
                      </strong>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${st.tone}`}>
                          {st.label}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-light uppercase">
                          {ev.visibility === "internal" ? "Internal" : "Publik"}
                        </span>
                      </div>
                      <strong className="font-serif text-base text-wine-950 block">
                        {ev.title}
                      </strong>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-dark">
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-brand-burgundy" />
                          {new Date(ev.start_time).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          WIB
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#AF7D66]" />
                          {ev.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-10 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
              Belum ada jadwal yang sesuai dengan filter kategori ini.
            </div>
          )}
        </section>
      )}

      {/* MODAL 1: Tambah Jadwal Kalender */}
      <EditorialModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        badge="Kalender Organisasi"
        title="Tambah Jadwal Baru"
        subtitle="Tambahkan rapat pleno, jadwal oprec/wawancara, atau penanda tanggal penting ke Kalender Organisasi."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-calendar-schedule-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan Jadwal
            </button>
          </>
        }
      >
        <form id="add-calendar-schedule-form" onSubmit={handleCreateSchedule} className="space-y-3.5 text-xs">
          {formDayConflicts.length > 0 && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-2 text-[11px]">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Peringatan Benturan:</strong> Sudah ada {formDayConflicts.length} kegiatan pada tanggal ini ({formDayConflicts[0].title}). Anda tetap dapat menyimpan jadwal ini.
              </span>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Judul Kegiatan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Rapat Pleno Evaluasi Triwulan I / Wawancara Oprec"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CalendarEvent["category"])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="Pleno">Rapat Pleno</option>
                <option value="Rapat">Rapat Internal / Bidang</option>
                <option value="Event Formal">Oprec / Wawancara / Formal</option>
                <option value="Main Event Proker">Main Event Proker</option>
                <option value="Lainnya">Milestone Lainnya</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Visibilitas</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as "internal" | "public")}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="internal">Internal Pengurus</option>
                <option value="public">Terbuka (Publik)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Tanggal</label>
              <input
                type="date"
                required
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Jam Mulai</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Jam Selesai</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Lokasi / Tautan Rapat</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Gedung / Zoom / Google Meet"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Catatan / Agenda Rapat</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ringkasan poin bahasan atau perlengkapan yang dibawa..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 2: Detail Jadwal */}
      <EditorialModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        badge={selectedEvent?.category || "Jadwal"}
        title={selectedEvent?.title || "Detail Jadwal"}
        maxWidth="sm"
        footer={
          <div className="flex items-center justify-between w-full gap-2">
            {(permissions.isTopManagement ||
              permissions.isSekum ||
              selectedEvent?.owner_user_id === currentUser.id) &&
            selectedEvent ? (
              <button
                type="button"
                onClick={() => handleDeleteSchedule(selectedEvent.id)}
                className="px-3.5 py-2 rounded-full border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold inline-flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Batalkan Jadwal</span>
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
            >
              Tutup
            </button>
          </div>
        }
      >
        {selectedEvent && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2">
              <div className="flex items-center gap-2 text-wine-950">
                <CalendarIcon className="w-3.5 h-3.5 text-brand-burgundy shrink-0" />
                <span>
                  {new Date(selectedEvent.start_time).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-wine-950 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#AF7D66] shrink-0" />
                <span>
                  {new Date(selectedEvent.start_time).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(selectedEvent.end_time).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WIB
                </span>
              </div>
              <div className="flex items-center gap-2 text-wine-950">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-dark">
                <Building className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Visibilitas: {selectedEvent.visibility === "internal" ? "Internal Pengurus" : "Publik"}
                </span>
              </div>
            </div>
            <p className="text-neutral-dark leading-relaxed">{selectedEvent.description}</p>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-2 text-[11px] text-amber-950">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-700" />
              <span>
                Jadwal ini tampil otomatis di Pengumuman Hari Ini Dashboard mulai pukul 00.01 WIB pada tanggal pelaksanaan.
              </span>
            </div>
          </div>
        )}
      </EditorialModal>
    </div>
  );
}
