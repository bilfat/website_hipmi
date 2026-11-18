"use client";

import { useState } from "react";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import {
  Layers,
  Newspaper,
  Award,
  Share2,
  Inbox,
  ArrowRight,
  ChevronRight,
  Eye,
  Plus,
  Image as ImageIcon,
  Sparkles,
  LayoutTemplate
} from "lucide-react";

export default function CMSDashboardPage() {
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const articles = store.articles || [];
  const achievements = store.achievements || [];
  const medparts = store.medpart_submissions || [];
  const feedback = store.feedback || [];

  return (
    <OrganizationShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                CMS-01
              </span>
              <span className="text-xs font-medium text-wine-500">Media Komunikasi & Publikasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Content Management System (CMS)
            </h1>
            <p className="text-sm text-wine-600 mt-1">
              Pusat kendali portal editorial berita, kurasi etalase prestasi kader, kemitraan media partner, dan kotak suara aspirasi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organization/cms/articles/form?mode=create"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-burgundy hover:bg-wine-900 text-white font-medium text-sm shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel (CMS-05)</span>
            </Link>
          </div>
        </div>

        {/* Aggregated KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Artikel Berita</span>
              <Newspaper className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-wine-950">
              {articles.length}
            </p>
            <p className="text-[11px] text-wine-500">
              {articles.filter((a) => a.status === "published").length} artikel tayang
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Prestasi Kader</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-amber-700">
              {achievements.length}
            </p>
            <p className="text-[11px] text-wine-500">
              {achievements.filter((a) => a.status === "published").length} terkurasi publik
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Media Partner</span>
              <Share2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-emerald-700">
              {medparts.length}
            </p>
            <p className="text-[11px] text-wine-500">Pengajuan kemitraan publikasi</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-wine-100 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs text-wine-500">
              <span>Kotak Suara Masuk</span>
              <Inbox className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-display text-blue-700">
              {feedback.length}
            </p>
            <p className="text-[11px] text-wine-500">Aspirasi privat mahasiswa</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/organization/cms/articles"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Kelola Berita (CMS-04)</span>
              <Newspaper className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-xs text-wine-600">Publikasi artikel pers, siaran kabar organisasi, dan ulasan kegiatan.</p>
          </Link>

          <Link
            href="/organization/cms/achievements"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Prestasi Kader (CMS-06)</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-xs text-wine-600">Pencatatan penghargaan, multi-kader award, dan etalase karya kader.</p>
          </Link>

          <Link
            href="/organization/cms/medpart"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Media Partner (CMS-08)</span>
              <Share2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-wine-600">Verifikasi berkas, paket promosi berbayar/gratis, dan publikasi manual.</p>
          </Link>

          <Link
            href="/organization/cms/feedback"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Kotak Suara (CMS-12)</span>
              <Inbox className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-wine-600">Triage masukan tertutup, routing disposisi unit, dan tindak lanjut aspirasi.</p>
          </Link>

          <Link
            href="/organization/cms/homepage"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Homepage Editor (CMS-02)</span>
              <LayoutTemplate className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-xs text-wine-600">Kurasi section beranda publik, banner kegiatan, dan editorial visual.</p>
          </Link>

          <Link
            href="/organization/cms/media"
            className="p-5 rounded-2xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs hover:shadow-md transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-wine-900 uppercase">Media Library (CMS-03)</span>
              <ImageIcon className="w-4 h-4 text-brand-burgundy" />
            </div>
            <p className="text-xs text-wine-600">Galeri aset foto kegiatan, logo sponsor, dan poster digital.</p>
          </Link>
        </div>
      </div>
    </OrganizationShell>
  );
}
