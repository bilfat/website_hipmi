"use client";

import { useState } from "react";
import Link from "next/link";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import {
  Bell,
  CheckCircle2,
  Clock,
  MailCheck,
  Trash2,
  ExternalLink,
  Filter,
  Sparkles,
  Inbox
} from "lucide-react";

export default function MyNotificationsPage() {
  const { store, currentUser } = useMockStore();

  const userNotifications = store.notifications.filter(
    (n) => !n.user_id || n.user_id === currentUser.id
  );

  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const filtered = userNotifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    return true;
  });

  const handleMarkAllAsRead = () => {
    mutateStore((draft) => {
      draft.notifications.forEach((n) => {
        if (!n.user_id || n.user_id === currentUser.id) {
          n.read = true;
        }
      });
      addActivityHistory(
        currentUser.name,
        "menandai semua notifikasi telah dibaca",
        "Inbox Notifikasi",
        "Pusat Notifikasi"
      );
    });
  };

  const handleMarkSingleAsRead = (notifId: string) => {
    mutateStore((draft) => {
      const n = draft.notifications.find((item) => item.id === notifId);
      if (n) {
        n.read = true;
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-brand-burgundy/10 text-brand-burgundy">
              Screen ID: PER-12
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase bg-wine-950/5 text-neutral-light">
              Pusat Pemberitahuan
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-wine-950">
            Kotak Masuk Pemberitahuan
          </h1>
          <p className="text-xs text-neutral-dark">
            Pemberitahuan resmi sistem mengenai agenda, verifikasi pembayaran, surat, dan pembaruan program kerja.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-full bg-surface-card border border-wine-950/20 text-xs font-semibold text-wine-950 hover:bg-wine-950/5 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <MailCheck className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-wine-950/10 pb-3 text-xs">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
            activeFilter === "all"
              ? "bg-brand-burgundy text-white font-semibold"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          Semua ({userNotifications.length})
        </button>

        <button
          onClick={() => setActiveFilter("unread")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
            activeFilter === "unread"
              ? "bg-brand-burgundy text-white font-semibold"
              : "text-neutral-dark hover:text-wine-950 bg-surface-card"
          }`}
        >
          Belum Dibaca ({userNotifications.filter((n) => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkSingleAsRead(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !item.read
                  ? "bg-surface-card border-brand-burgundy/40 shadow-md ring-1 ring-brand-burgundy/10"
                  : "bg-surface-card/60 border-wine-950/10 hover:border-wine-950/30 opacity-90"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    !item.read
                      ? "bg-brand-burgundy text-white shadow-sm"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                      {item.category}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-burgundy" />
                    )}
                  </div>

                  <strong className="font-serif text-base text-wine-950 block">
                    {item.title}
                  </strong>

                  <p className="text-xs text-neutral-dark leading-relaxed">
                    {item.message}
                  </p>

                  <span className="text-[10px] font-mono text-neutral-light block pt-1">
                    {new Date(item.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </div>

              {item.source_route && (
                <div className="shrink-0 self-end sm:self-center">
                  <Link
                    href={item.source_route}
                    className="px-4 py-1.5 rounded-full border border-wine-950/20 text-wine-950 hover:bg-wine-950/5 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>Buka Tautan</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 rounded-3xl bg-surface-card border border-wine-950/10 text-center space-y-3">
            <Inbox className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              Tidak ada notifikasi dalam kotak masuk saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
