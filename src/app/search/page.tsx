"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrganizationShell } from "@/components/layout/organization-shell";
import { useMockStore } from "@/lib/mock/store";
import {
  Search,
  ChevronRight,
  FileText,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  Newspaper,
  BookOpen,
  ArrowRight
} from "lucide-react";

function UniversalSearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { store } = useMockStore();
  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState("all");

  const q = query.toLowerCase().trim();

  // 1. Search Events
  const matchedEvents = q
    ? store.events.filter(
        (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      )
    : [];

  // 2. Search Letters
  const matchedLetters = q
    ? store.correspondence.filter(
        (l) => l.title.toLowerCase().includes(q) || l.purpose.toLowerCase().includes(q)
      )
    : [];

  // 3. Search Fund Requests
  const matchedFunds = q
    ? store.fund_requests.filter(
        (f) => f.purpose.toLowerCase().includes(q) || f.unit_name.toLowerCase().includes(q)
      )
    : [];

  // 4. Search Cadres
  const matchedCadres = q
    ? store.users.filter(
        (u) =>
          (u.full_name || u.name || "").toLowerCase().includes(q) ||
          (u.nim || "").toLowerCase().includes(q) ||
          (u.study_program || "").toLowerCase().includes(q)
      )
    : [];

  // 5. Search Businesses
  const matchedBusinesses = q
    ? store.businesses.filter(
        (b) => b.name.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
      )
    : [];

  // 6. Search Articles
  const matchedArticles = q
    ? store.articles.filter(
        (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedEvents.length +
    matchedLetters.length +
    matchedFunds.length +
    matchedCadres.length +
    matchedBusinesses.length +
    matchedArticles.length;

  return (
    <OrganizationShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-wine-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-burgundy/10 text-brand-burgundy border border-brand-burgundy/20">
                SYS-06
              </span>
              <span className="text-xs font-medium text-wine-500">Universal Search Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-wine-950">
              Pencarian Global Terpadu
            </h1>
            <p className="text-xs text-wine-600 mt-1">
              Cari data secara instan lintas modul agenda, persuratan, keuangan, direktori kader, bisnis, dan portal berita.
            </p>
          </div>
        </div>

        {/* Big Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-wine-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Ketik kata kunci (contoh: Expo, Rania, Surat, Pleno, Dana, Bisnis)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-wine-200 text-sm font-medium text-wine-950 focus:outline-none focus:ring-2 focus:ring-brand-burgundy/20 focus:border-brand-burgundy shadow-xs"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium pb-1">
          {[
            { id: "all", label: `Semua (${totalResults})` },
            { id: "events", label: `Agenda (${matchedEvents.length})` },
            { id: "letters", label: `Surat (${matchedLetters.length})` },
            { id: "funds", label: `Keuangan (${matchedFunds.length})` },
            { id: "cadres", label: `Kader (${matchedCadres.length})` },
            { id: "businesses", label: `Bisnis (${matchedBusinesses.length})` },
            { id: "articles", label: `Artikel (${matchedArticles.length})` },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap border transition-all ${
                filterType === f.id
                  ? "bg-brand-burgundy text-white border-brand-burgundy shadow-xs font-semibold"
                  : "bg-white text-wine-700 border-wine-100 hover:border-wine-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Search Results Display */}
        {!q ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 text-wine-500 text-xs">
            Masukkan kata kunci di atas untuk mencari data lintas sistem HIPMI CENTRAL.
          </div>
        ) : totalResults === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-wine-100 text-wine-500 text-xs">
            Tidak ada data yang cocok dengan kata kunci "{query}".
          </div>
        ) : (
          <div className="space-y-4">
            {/* Events */}
            {(filterType === "all" || filterType === "events") &&
              matchedEvents.map((e) => (
                <Link
                  key={e.id}
                  href={`/calendar/events/${e.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-brand-burgundy">Agenda & Event</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{e.title}</h4>
                      <p className="text-xs text-wine-600 line-clamp-1">{e.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}

            {/* Letters */}
            {(filterType === "all" || filterType === "letters") &&
              matchedLetters.map((l) => (
                <Link
                  key={l.id}
                  href={`/organization/correspondence/${l.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-wine-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-wine-600">Persuratan Sekum</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{l.title}</h4>
                      <p className="text-xs text-wine-600 line-clamp-1">Tujuan: {l.purpose} • {l.unit_name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}

            {/* Funds */}
            {(filterType === "all" || filterType === "funds") &&
              matchedFunds.map((f) => (
                <Link
                  key={f.id}
                  href={`/organization/finance/requests/${f.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-emerald-700">Keuangan Bendum</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{f.purpose}</h4>
                      <p className="text-xs text-wine-600 font-mono">Rp {f.requested_amount.toLocaleString("id-ID")} • {f.unit_name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}

            {/* Cadres */}
            {(filterType === "all" || filterType === "cadres") &&
              matchedCadres.map((u) => (
                <Link
                  key={u.id}
                  href={`/organization/directory/cadres/${u.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-700">Database Kader PSDM</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{u.full_name}</h4>
                      <p className="text-xs text-wine-600">NIM: {u.nim} • {u.study_program}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}

            {/* Businesses */}
            {(filterType === "all" || filterType === "businesses") &&
              matchedBusinesses.map((b) => (
                <Link
                  key={b.id}
                  href={`/organization/directory/businesses/${b.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-700">Bisnis Kader</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{b.name}</h4>
                      <p className="text-xs text-wine-600">{b.category} • Pemilik: {b.owner_name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}

            {/* Articles */}
            {(filterType === "all" || filterType === "articles") &&
              matchedArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/organization/cms/articles/form?mode=edit&recordId=${a.id}`}
                  className="p-4 rounded-xl bg-white border border-wine-100 hover:border-wine-300 shadow-xs flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-start gap-3">
                    <Newspaper className="w-5 h-5 text-brand-burgundy shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-brand-burgundy">Artikel CMS</span>
                      <h4 className="font-bold text-sm text-wine-950 font-display group-hover:text-brand-burgundy">{a.title}</h4>
                      <p className="text-xs text-wine-600">{a.category} • Penulis: {a.author_name}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-wine-400 group-hover:text-brand-burgundy" />
                </Link>
              ))}
          </div>
        )}
      </div>
    </OrganizationShell>
  );
}

export default function UniversalSearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-wine-600">Memuat mesin pencari...</div>}>
      <UniversalSearchContent />
    </Suspense>
  );
}
