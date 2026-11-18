"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  CheckCircle2,
  ArrowLeft,
  Plus,
  Clock,
  AlertTriangle,
  MoveRight,
  MoveLeft,
  Trash2,
  Sparkles
} from "lucide-react";
import { ProjectTask, TaskStatus } from "@/types/domain";

export default function ProjectTaskBoardPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { store, currentUser } = useMockStore();

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const tasks = store.tasks.filter((t) => t.project_id === project?.id);

  // Form states for creating new task
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const columns: { key: TaskStatus; title: string; color: string; badge: string }[] = [
    { key: "To Do", title: "To Do", color: "border-blue-300 bg-blue-50/50", badge: "bg-blue-100 text-blue-900" },
    { key: "In Progress", title: "In Progress", color: "border-amber-300 bg-amber-50/50", badge: "bg-amber-100 text-amber-900" },
    { key: "Blocked", title: "Blocked", color: "border-red-300 bg-red-50/50", badge: "bg-red-100 text-red-900" },
    { key: "Done", title: "Done", color: "border-emerald-300 bg-emerald-50/50", badge: "bg-emerald-100 text-emerald-900" }
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: ProjectTask = {
      id: `task-${Date.now()}`,
      project_id: project.id,
      title: newTitle.trim(),
      description: newDesc.trim(),
      status: "To Do",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mutateStore((draft) => {
      draft.tasks.push(newTask);

      addActivityHistory(
        currentUser.name,
        "menambahkan tugas baru pada task board",
        `${newTitle.trim()} (${project.name})`,
        "Task Board"
      );
    });

    setNewTitle("");
    setNewDesc("");
    setIsAdding(false);
  };

  const handleMoveTask = (taskId: string, targetStatus: TaskStatus) => {
    mutateStore((draft) => {
      const task = draft.tasks.find((t) => t.id === taskId);
      if (task) {
        task.status = targetStatus;
        task.updated_at = new Date().toISOString();

        addActivityHistory(
          currentUser.name,
          "memindahkan status tugas",
          `${task.title} → ${targetStatus}`,
          "Task Board"
        );
      }
    });
  };

  const handleDeleteTask = (taskId: string) => {
    mutateStore((draft) => {
      const idx = draft.tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        draft.tasks.splice(idx, 1);
      }
    });
  };

  const doneCount = tasks.filter((t) => t.status === "Done").length;
  const progressPercent = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <Link
        href={`/workspace/projects/${project.id}`}
        className="inline-flex items-center gap-1.5 text-xs text-neutral-dark hover:text-brand-burgundy transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Overview {project.name}</span>
      </Link>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: WRK-08
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              4-Column Board
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Task Board & Progres Proker: {project.name}
          </h1>
          <p className="text-xs text-neutral-dark">
            Papan kerja kolaboratif tim tanpa individual PIC (akuntabilitas tim bersama).
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tugas Baru</span>
        </button>
      </div>

      {/* Progress Bar Banner */}
      <div className="p-5 rounded-2xl bg-surface-card border border-wine-950/10 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-wine-950">
            Tingkat Penyelesaian Tugas Tim: <strong className="text-brand-burgundy">{progressPercent}%</strong>
          </span>
          <span className="font-mono text-neutral-light text-[11px]">
            {doneCount} dari {tasks.length} Tugas Selesai
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-brand-burgundy h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Task Modal / Collapse */}
      {isAdding && (
        <form
          onSubmit={handleCreateTask}
          className="p-6 rounded-3xl bg-surface-card border border-wine-950/20 shadow-xl space-y-4 text-xs"
        >
          <h3 className="font-serif text-base font-bold text-wine-950">
            Buat Tugas Baru untuk Tim
          </h3>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Judul Tugas</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Finalisasi rundown seminar dan konfirmasi narasumber"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-wine-950/15 text-sm text-wine-950"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Deskripsi Tugas</label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Rincian teknis pekerjaan yang harus diselesaikan bersama..."
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
              Tambahkan ke Board (To Do)
            </button>
          </div>
        </form>
      )}

      {/* 4 Columns Task Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              className={`p-4 rounded-3xl border flex flex-col space-y-3 ${col.color} min-h-[420px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-wine-950/10">
                <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${col.badge}`}>
                  {col.title}
                </span>
                <span className="font-mono text-xs font-bold text-wine-950">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-white border border-wine-950/10 shadow-sm hover:shadow-md transition-shadow space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <strong className="text-wine-950 font-medium block">
                        {t.title}
                      </strong>
                      <button
                        onClick={() => handleDeleteTask(t.id)}
                        className="text-neutral-300 hover:text-red-600 transition-colors p-0.5"
                        title="Hapus Tugas"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {t.description && (
                      <p className="text-neutral-dark text-[11px] leading-relaxed">
                        {t.description}
                      </p>
                    )}

                    {/* Move controls */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-neutral-400">Pindahkan:</span>
                      <select
                        value={t.status}
                        onChange={(e) => handleMoveTask(t.id, e.target.value as TaskStatus)}
                        className="px-2 py-0.5 rounded bg-surface-ivory border border-neutral-200 text-wine-950 font-medium cursor-pointer"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-neutral-400">
                    Kosong
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
