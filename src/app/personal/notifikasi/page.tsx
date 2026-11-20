"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockStore, mutateStore, addActivityHistory } from "@/lib/mock/store";
import { Bell, MailCheck, ExternalLink, Inbox, ArrowLeft } from "lucide-react";

export default function MyNotificationsPage() {
  const router = useRouter();
  const { store, currentUser } = useMockStore();

  const userNotifications = store.notifications.filter(
    (n) => !n.user_id || n.user_id === currentUser.id
  );

  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const filtered = userNotifications.filter((n) => {
    if (activeFilter === "unread") return !n.read;
    return true;
  });

  const unreadCount = userNotifications.filter((n) => !n.read).length;

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
        "Kotak Masuk Pemberitahuan",
        "Notifikasi"
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

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/personal/dashboard");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={handleGoBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 hover:border-brand-burgundy/40 hover:text-brand-burgundy transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#AF7D66] font-bold">
            Pusat Pemberitahuan
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight">
            Notifikasi Saya
          </h1>
          <p className="text-xs text-neutral-dark">
            Pembaruan terkait tiket, agenda kegiatan, status keanggotaan, dan aktivitas akun Anda.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] text-xs font-semibold text-wine-950 hover:border-brand-burgundy/40 hover:bg-[#FCF8F6] transition-colors inline-flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
          >
            <MailCheck className="w-3.5 h-3.5 text-brand-burgundy" />
            <span>Tandai Semua Dibaca</span>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-1.5 rounded-full font-semibold border transition-colors ${
            activeFilter === "all"
              ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm"
              : "bg-white text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
          }`}
        >
          Semua ({userNotifications.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("unread")}
          className={`px-4 py-1.5 rounded-full font-semibold border transition-colors ${
            activeFilter === "unread"
              ? "bg-brand-burgundy text-white border-brand-burgundy shadow-sm"
              : "bg-white text-neutral-dark border-[#E9E1DC] hover:border-brand-burgundy/40"
          }`}
        >
          Belum Dibaca ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMarkSingleAsRead(item.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                !item.read
                  ? "bg-white border-brand-burgundy/35 shadow-[0_6px_22px_rgba(90,23,34,0.08)]"
                  : "bg-white/75 border-[#E9E1DC] hover:border-[#D4C7C2]"
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                    !item.read
                      ? "bg-brand-burgundy text-white shadow-sm"
                      : "bg-[#FCF8F6] text-neutral-light border border-[#E9E1DC]"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-brand-burgundy/10 text-brand-burgundy">
                      {item.category}
                    </span>
                    {!item.read && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-burgundy">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy" />
                        Baru
                      </span>
                    )}
                  </div>

                  <strong className="font-serif text-base text-wine-950 block leading-snug">
                    {item.title}
                  </strong>

                  <p className="text-xs text-neutral-dark leading-relaxed">{item.message}</p>

                  <span className="text-[10px] font-mono text-neutral-light block pt-1">
                    {new Date(item.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {item.source_route && (
                <div className="shrink-0 self-start sm:self-center">
                  <Link
                    href={item.source_route}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-[#FCF8F6] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Buka</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 rounded-3xl bg-white/95 border border-dashed border-[#E9E1DC] text-center space-y-3">
            <Inbox className="w-10 h-10 text-neutral-300 mx-auto" />
            <p className="text-xs text-neutral-dark">
              {activeFilter === "unread"
                ? "Semua pemberitahuan sudah terbaca."
                : "Belum ada pemberitahuan di kotak masuk Anda."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
