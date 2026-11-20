"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  useMockStore,
  mutateStore,
  addActivityHistory,
  addAuditEvent,
} from "@/lib/mock/store";
import { resolveUserPermissions } from "@/lib/auth/permission-resolver";
import { PROJECT_STATUS_LABELS } from "@/lib/personal/labels";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  CreateLetterModal,
  LetterDetailModal,
} from "@/components/organization/letter-modals";
import {
  CreateFundRequestModal,
  RecordTransactionModal,
  FundRequestDetailModal,
} from "@/components/organization/finance-modals";
import { CadreNimLookup } from "@/components/organization/cadre-nim-lookup";
import {
  ProjectOperationalStatus,
  CorrespondenceRequest,
  FundRequest,
  User,
} from "@/types/domain";
import {
  ArrowLeft,
  Users,
  Briefcase,
  CheckCircle2,
  Calendar,
  CalendarCheck,
  FileText,
  Wallet,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Archive,
  Edit3,
  Plus,
  Eye,
  QrCode,
  Sparkles,
  UserPlus,
  UserMinus,
  MapPin,
  Lock,
  Info,
  Handshake,
  Banknote,
  Paperclip,
  TrendingUp,
  TrendingDown,
  History,
  Trash2,
  ArrowDownCircle,
} from "lucide-react";

type ProjectTab = "overview" | "roster" | "events" | "letters" | "finance" | "lpj" | "history";

const VALID_TABS: ProjectTab[] = [
  "overview",
  "roster",
  "events",
  "letters",
  "finance",
  "lpj",
  "history",
];

export default function Project360Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { store, currentUser } = useMockStore();
  const permissions = resolveUserPermissions(currentUser, store);

  const project = store.projects.find((p) => p.id === projectId) || store.projects[0];
  const compartment = store.compartments.find((c) => c.id === project?.compartment_id);
  const field = store.fields.find((f) => f.id === project?.field_id);
  const cabinet = store.cabinets.find((c) => c.id === project?.cabinet_id);

  const isClosed = project?.operational_status === "archived";
  const isOwnerKakom =
    permissions.isKakom &&
    (!permissions.managedCompartmentId ||
      permissions.managedCompartmentId === project?.compartment_id);
  const isAssignedManager = (project?.managers || []).some(
    (m) => m.user_id === currentUser.id && m.status === "active"
  );
  const canOperate = !isClosed && (isOwnerKakom || isAssignedManager);

  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const syncFromUrl = () => {
      if (typeof window === "undefined") return;
      const tabParam = new URLSearchParams(window.location.search).get("tab") as ProjectTab | null;
      if (tabParam && VALID_TABS.includes(tabParam)) {
        setActiveTab(tabParam);
      }
    };
    const handleSidebarTab = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail as ProjectTab | undefined;
      if (detail && VALID_TABS.includes(detail)) {
        setActiveTab(detail);
      } else {
        syncFromUrl();
      }
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hipmi-project-tab-change", handleSidebarTab);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hipmi-project-tab-change", handleSidebarTab);
    };
  }, [projectId]);

  const handleSelectTab = (tab: ProjectTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const nextUrl = `${window.location.pathname}?tab=${tab}`;
      window.history.replaceState(null, "", nextUrl);
      window.dispatchEvent(new CustomEvent("hipmi-project-tab-change", { detail: tab }));
    }
  };

  // Modal triggers
  const [editInfoOpen, setEditInfoOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [rosterModalOpen, setRosterModalOpen] = useState(false);
  const [editingRosterId, setEditingRosterId] = useState<string | null>(null);
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<CorrespondenceRequest | null>(null);
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [selectedFund, setSelectedFund] = useState<FundRequest | null>(null);
  const [txModalOpen, setTxModalOpen] = useState(false);
  const [closureModalOpen, setClosureModalOpen] = useState(false);

  // Form states: Edit Info & Logo
  const [editName, setEditName] = useState(project?.name || "");
  const [editPurpose, setEditPurpose] = useState(project?.purpose || "");
  const [editLocation, setEditLocation] = useState(project?.location || "");
  const [editLogoUrl, setEditLogoUrl] = useState(project?.logo_url || "");
  const [editOpStatus, setEditOpStatus] = useState<ProjectOperationalStatus>(
    project?.operational_status || "draft"
  );
  const [editPubStatus, setEditPubStatus] = useState(project?.publication_status || "unpublished");
  const [editError, setEditError] = useState("");

  // Form states: Narrative Progress Note (No percentages per front_end.md WRK-08!)
  const [progStage, setProgStage] = useState("Persiapan Teknis");
  const [progAchievements, setProgAchievements] = useState("");
  const [progObstacles, setProgObstacles] = useState("");
  const [progPlans, setProgPlans] = useState("");

  // Form states: Add/Edit Roster Member
  const [rosterName, setRosterName] = useState("");
  const [rosterNim, setRosterNim] = useState("");
  const [rosterRole, setRosterRole] = useState("Staff Acara");

  // Scoped Project Data
  const projectRoster = store.roster.filter((r) => r.project_id === project?.id);
  const projectEvents = store.events.filter((e) => e.project_id === project?.id);
  const projectLetters = store.correspondence.filter((c) => c.project_id === project?.id);
  const projectFunds = store.fund_requests.filter((f) => f.project_id === project?.id);
  const projectTransactions = (store.finance_transactions || []).filter(
    (t) => t.project_id === project?.id
  );
  const projectDocs = store.documents.filter((d) => d.related_project_id === project?.id);
  const projectLpj = store.lpjs.find((l) => l.project_id === project?.id);
  const progressNotes = project?.progress_notes || [];

  const projectAudits = (store.audit_events || []).filter(
    (a) =>
      a.resource_id === project?.id ||
      projectLetters.some((l) => l.id === a.resource_id) ||
      projectFunds.some((f) => f.id === a.resource_id)
  );
  const projectActivities = (store.activity_history || []).filter(
    (act) =>
      act.module === project?.name ||
      act.target.toLowerCase().includes((project?.name || "").toLowerCase()) ||
      act.module === "Workspace Proker"
  );

  const activeManagers = (project?.managers || []).filter((m) => m.status === "active");
  const verifiedCadres = store.users.filter(
    (u) => u.account_status === "active" && u.cadre_status === "verified"
  );

  // Closure 3-requirement check (front_end.md WRK-10)
  const isLpjApproved = projectLpj?.status === "approved";
  const allLettersDone =
    projectLetters.length === 0 ||
    projectLetters.every((l) =>
      ["issued", "completed", "archived"].includes(l.status)
    );
  const allFundsSettled =
    projectFunds.length === 0 ||
    projectFunds.every((f) => ["settled", "rejected"].includes(f.status));
  const canCloseProject = isLpjApproved && allLettersDone && allFundsSettled;

  const statusInfo =
    PROJECT_STATUS_LABELS[project?.operational_status || "ongoing"] ||
    PROJECT_STATUS_LABELS.ongoing;

  const openEditInfo = () => {
    setEditName(project?.name || "");
    setEditPurpose(project?.purpose || "");
    setEditLocation(project?.location || "");
    setEditLogoUrl(project?.logo_url || "");
    setEditOpStatus(project?.operational_status || "draft");
    setEditPubStatus(project?.publication_status || "unpublished");
    setEditError("");
    setEditInfoOpen(true);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");

    // Enforce WRK-04 rule: Logo is mandatory before Ongoing or Published!
    if ((editOpStatus === "ongoing" || editPubStatus === "published") && !editLogoUrl.trim()) {
      setEditError(
        "Sesuai aturan sistem, Logo Proker wajib diisi sebelum status berubah menjadi Sedang Berjalan (Ongoing) atau Terpublikasi."
      );
      return;
    }

    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      if (target) {
        target.name = editName.trim();
        target.purpose = editPurpose.trim();
        target.location = editLocation.trim();
        target.logo_url = editLogoUrl.trim();
        target.operational_status = editOpStatus;
        target.publication_status = editPubStatus;
      }
      addActivityHistory(
        currentUser.name,
        "memperbarui identitas program kerja",
        editName.trim(),
        "Workspace Proker"
      );
    });

    setEditInfoOpen(false);
    setFeedback("Identitas dan status program kerja berhasil diperbarui.");
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progAchievements.trim()) return;

    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      if (target) {
        if (!target.progress_notes) target.progress_notes = [];
        target.progress_notes.unshift({
          id: `prog-${Date.now()}`,
          stage: progStage.trim() || "Tahap Pelaksanaan",
          achievements: progAchievements.trim(),
          obstacles: progObstacles.trim() || "Tidak ada kendala berarti.",
          plans: progPlans.trim() || "Lanjut sesuai linimasa.",
          created_at: new Date().toISOString(),
        });
      }
      addActivityHistory(
        currentUser.name,
        "mencatat perkembangan naratif proker",
        project.name,
        "Workspace Proker"
      );
    });

    setProgAchievements("");
    setProgObstacles("");
    setProgPlans("");
    setProgressModalOpen(false);
    setFeedback("Catatan perkembangan naratif berhasil ditambahkan.");
  };

  const openCreateRoster = () => {
    setEditingRosterId(null);
    setRosterName("");
    setRosterNim("");
    setRosterRole("Staff Acara");
    setRosterModalOpen(true);
  };

  const openEditRoster = (memberId: string) => {
    const member = projectRoster.find((r) => r.id === memberId);
    if (!member) return;
    setEditingRosterId(member.id);
    setRosterName(member.name);
    setRosterNim(member.nim || "");
    setRosterRole(member.role_title);
    setRosterModalOpen(true);
  };

  const handleSaveRoster = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rosterName.trim()) return;

    mutateStore((draft) => {
      const matchedUser = draft.users.find(
        (u) => rosterNim.trim() && u.nim === rosterNim.trim()
      );
      if (editingRosterId) {
        const target = draft.roster.find((r) => r.id === editingRosterId);
        if (target) {
          target.name = rosterName.trim();
          target.nim = rosterNim.trim() || null;
          target.role_title = rosterRole.trim() || "Anggota Tim";
          if (matchedUser) {
            target.user_id = matchedUser.id;
            target.is_cadre = matchedUser.cadre_status === "verified";
          }
        }
        addActivityHistory(
          currentUser.name,
          "memperbarui anggota roster proker",
          `${rosterName.trim()} (${rosterRole.trim()})`,
          project.name
        );
      } else {
        draft.roster.push({
          id: `ros-${Date.now()}`,
          project_id: project.id,
          user_id: matchedUser?.id || null,
          name: rosterName.trim(),
          nim: rosterNim.trim() || null,
          role_title: rosterRole.trim() || "Anggota Tim",
          access_level: "Member",
          status: "active",
          is_cadre: matchedUser?.cadre_status === "verified",
          joined_at: new Date().toISOString(),
        });
        addActivityHistory(
          currentUser.name,
          "menambahkan anggota roster proker",
          `${rosterName.trim()} (${rosterRole.trim()})`,
          project.name
        );
      }
    });

    setEditingRosterId(null);
    setRosterName("");
    setRosterNim("");
    setRosterRole("Staff Acara");
    setRosterModalOpen(false);
    setFeedback(
      editingRosterId
        ? "Data anggota roster berhasil diperbarui."
        : "Anggota baru berhasil ditambahkan ke daftar roster panitia."
    );
  };

  const handleDeleteRoster = (memberId: string, memberName: string) => {
    mutateStore((draft) => {
      draft.roster = draft.roster.filter((r) => r.id !== memberId);
      addActivityHistory(
        currentUser.name,
        "menghapus anggota dari roster proker",
        memberName,
        project.name
      );
    });
    setFeedback(`${memberName} dihapus dari daftar roster panitia.`);
  };

  const handleDemoteManagerToMember = (memberId: string, userId: string | null, memberName: string) => {
    mutateStore((draft) => {
      const rosterTarget = draft.roster.find((r) => r.id === memberId);
      if (rosterTarget) {
        rosterTarget.access_level = "Member";
      }
      if (userId) {
        const projTarget = draft.projects.find((p) => p.id === project.id);
        const mgr = projTarget?.managers?.find((m) => m.user_id === userId);
        if (mgr) mgr.status = "revoked";
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "DEMOTE_MANAGER_TO_MEMBER",
        "Project",
        project.id,
        "Manager",
        `${memberName} -> Member`
      );
    });
    setFeedback(`${memberName} diturunkan dari Pengelola menjadi Anggota Tim dan dicatat dalam audit.`);
  };

  const handleAssignManagerUser = (candidate: User) => {
    if (candidate.account_status !== "active" || candidate.cadre_status !== "verified") return;

    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      if (target) {
        if (!target.managers) target.managers = [];
        const existing = target.managers.find((m) => m.user_id === candidate.id);
        if (existing) {
          existing.status = "active";
        } else {
          target.managers.push({
            user_id: candidate.id,
            assigned_by: currentUser.id,
            assigned_at: new Date().toISOString(),
            status: "active",
          });
        }
        target.lead_name = candidate.name;
      }
      const existingRoster = draft.roster.find(
        (r) => r.project_id === project.id && r.user_id === candidate.id
      );
      if (existingRoster) {
        existingRoster.access_level = "Manager";
      } else {
        draft.roster.push({
          id: `ros-${Date.now()}`,
          project_id: project.id,
          user_id: candidate.id,
          name: candidate.name,
          nim: candidate.nim,
          role_title: "Pengelola Proker (Manager)",
          access_level: "Manager",
          status: "active",
          is_cadre: true,
          joined_at: new Date().toISOString(),
        });
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "ASSIGN_PROJECT_MANAGER",
        "Project",
        project.id,
        undefined,
        `${candidate.name} (NIM: ${candidate.nim || "-"})`
      );
    });

    setFeedback(`${candidate.name} (NIM: ${candidate.nim || "-"}) resmi ditunjuk sebagai Pengelola Proker.`);
  };

  const handleRevokeManager = (userId: string) => {
    const revokedUser = store.users.find((u) => u.id === userId);
    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      const mgr = target?.managers?.find((m) => m.user_id === userId);
      if (mgr) mgr.status = "revoked";
      const rosterTarget = draft.roster.find(
        (r) => r.project_id === project.id && r.user_id === userId
      );
      if (rosterTarget) rosterTarget.access_level = "Member";
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "REVOKE_PROJECT_MANAGER",
        "Project",
        project.id,
        "Active Manager",
        revokedUser?.name || userId
      );
    });
    setFeedback("Hak Pengelola Proker berhasil dicabut dan dicatat dalam histori audit.");
  };

  const handleCloseProject = () => {
    if (!canCloseProject) return;
    mutateStore((draft) => {
      const target = draft.projects.find((p) => p.id === project.id);
      if (target) {
        target.operational_status = "archived";
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        "CLOSE_AND_ARCHIVE_PROJECT",
        "Project",
        project.id
      );
    });
    setClosureModalOpen(false);
    setFeedback("Program kerja berhasil ditutup dan diarsipkan dalam mode Read-Only.");
  };

  const tabs: {
    id: ProjectTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    { id: "overview", label: "Ringkasan & Progres", icon: Sparkles, count: progressNotes.length },
    { id: "roster", label: "Tim & Roster", icon: Users, count: projectRoster.length },
    { id: "events", label: "Agenda & Presensi", icon: CalendarCheck, count: projectEvents.length },
    { id: "letters", label: "Persuratan", icon: Mail, count: projectLetters.length },
    {
      id: "finance",
      label: "Keuangan",
      icon: Wallet,
      count: projectFunds.length + projectTransactions.length,
    },
    { id: "lpj", label: "Dokumen & LPJ", icon: FileText, count: projectDocs.length + (projectLpj ? 1 : 0) },
    {
      id: "history",
      label: "Riwayat & Audit",
      icon: History,
      count: projectAudits.length + projectActivities.length,
    },
  ];

  const handleGoBack = () => {
    if (permissions.isPureProjectManager) {
      router.push("/personal/dashboard");
    } else if (compartment) {
      router.push(`/workspace/${compartment.id}`);
    } else {
      router.push("/organization/dashboard");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb & Back */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {!permissions.isPureProjectManager && (
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 font-semibold hover:border-brand-burgundy/40 hover:text-brand-burgundy transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          )}
          <span className="text-neutral-dark hidden sm:inline">
            {field?.name || "Bidang"} / {compartment?.name || "Kompartemen"} /{" "}
            <strong className="text-wine-950">{project.name}</strong>
          </span>
        </div>

        <Link
          href="/organization/directory/companies"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-xs font-semibold text-wine-950 hover:text-brand-burgundy transition-colors"
        >
          <Handshake className="w-3.5 h-3.5 text-emerald-700" />
          <span>Referensi Sponsor &amp; Mitra</span>
        </Link>
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

      {/* Read-Only Monitoring Notice for Topman / Kabid / Archived */}
      {!canOperate && (
        <div className="p-3.5 rounded-2xl bg-amber-50/85 border border-amber-200/90 text-xs text-amber-950 flex items-center gap-2.5">
          {isClosed ? (
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          ) : (
            <Eye className="w-4 h-4 text-amber-700 shrink-0" />
          )}
          <span>
            {isClosed
              ? "Program kerja ini telah ditutup & diarsipkan (Read-Only). Seluruh histori roster, surat, keuangan, dan dokumen tetap tersimpan."
              : `Mode Pemantauan (${permissions.roleBadgeTitle}) — Anda dapat memantau seluruh progres, surat, keuangan, dan LPJ secara transparan tanpa mengubah data operasional pengelola.`}
          </span>
        </div>
      )}

      {/* Project 360 Hero Header */}
      <section className="p-5 sm:p-7 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-[0_10px_32px_rgba(61,15,22,0.05)] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusInfo.tone}`}
              >
                {statusInfo.label}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] text-neutral-dark">
                Publikasi: {project.publication_status === "published" ? "Tayang Publik" : "Internal"}
              </span>
              <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                {cabinet?.name || "Kabinet Arthakarsa"}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wine-950 tracking-tight leading-snug">
              {project.name}
            </h1>

            <p className="text-xs text-neutral-dark max-w-2xl leading-relaxed">
              {project.purpose || project.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-dark pt-1">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-brand-burgundy" />
                Main Event:{" "}
                <strong className="text-wine-950">
                  {project.main_event_date
                    ? new Date(project.main_event_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Belum ditentukan"}
                </strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#AF7D66]" />
                {project.location || "Universitas Telkom"}
              </span>
            </div>
          </div>

          {/* Primary Actions (Modals) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {canOperate && (
              <button
                type="button"
                onClick={openEditInfo}
                className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Edit Info &amp; Logo</span>
              </button>
            )}

            {isOwnerKakom && !isClosed && (
              <>
                <button
                  type="button"
                  onClick={() => setManagerModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#AF7D66]" />
                  <span>Atur Manager</span>
                </button>
                <button
                  type="button"
                  onClick={() => setClosureModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Tutup Proker</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 6 Sliding Tabs Bar (Instant 0ms switching) */}
      <div className="p-1.5 rounded-2xl bg-white/95 border border-[#E9E1DC] shadow-sm flex flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectTab(tab.id)}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive ? "text-white" : "text-neutral-dark hover:text-wine-950"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="project360-active-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-brand-burgundy shadow-sm"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#FCF8F6] text-neutral-dark"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: RINGKASAN & PROGRES NARATIF (No progress bar/percentage per WRK-08!) */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1DC]">
              <div>
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Catatan Perkembangan Proker (Naratif)
                </h2>
                <p className="text-[11px] text-neutral-dark">
                  Rekaman tahapan capaian, kendala, dan rencana tindak lanjut tanpa angka persentase.
                </p>
              </div>
              {canOperate && (
                <button
                  type="button"
                  onClick={() => setProgressModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Catat Progres</span>
                </button>
              )}
            </div>

            {progressNotes.length > 0 ? (
              <div className="space-y-4">
                {progressNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-burgundy/10 text-brand-burgundy">
                        {note.stage}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {new Date(note.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-white border border-[#E9E1DC] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                          Capaian
                        </span>
                        <p className="text-wine-950 leading-relaxed">{note.achievements}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E1DC] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-amber-700 block">
                          Kendala
                        </span>
                        <p className="text-wine-950 leading-relaxed">{note.obstacles}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#E9E1DC] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-brand-burgundy block">
                          Rencana Selanjutnya
                        </span>
                        <p className="text-wine-950 leading-relaxed">{note.plans}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#FCF8F6] border border-dashed border-[#E9E1DC] text-center text-xs text-neutral-dark">
                Belum ada catatan perkembangan naratif. Klik <strong>Catat Progres</strong> untuk menambahkan laporan capaian &amp; kendala terbaru.
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3 text-xs">
              <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-[#E9E1DC]">
                Pengelola Proker Aktif
              </h3>
              {activeManagers.length > 0 ? (
                <div className="space-y-2">
                  {activeManagers.map((m) => {
                    const mgrUser = store.users.find((u) => u.id === m.user_id);
                    return (
                      <div
                        key={m.user_id}
                        className="p-3 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-brand-burgundy text-[#F5D6A8] font-bold flex items-center justify-center shrink-0">
                          {(mgrUser?.name || "M").charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <strong className="text-wine-950 block truncate">
                            {mgrUser?.name || "Pengelola"}
                          </strong>
                          <span className="text-[10px] font-mono text-neutral-light">
                            NIM: {mgrUser?.nim || "-"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-neutral-dark">
                  Belum ada Manager ditunjuk oleh Kepala Kompartemen.
                </p>
              )}
            </div>

            <div className="p-5 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-3 text-xs">
              <h3 className="font-serif text-base font-bold text-wine-950 pb-2 border-b border-[#E9E1DC]">
                Kesiapan Penutupan Proker
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "LPJ Proker Approved", ok: isLpjApproved },
                  { label: "Seluruh Surat Selesai", ok: allLettersDone },
                  { label: "Seluruh Pencairan Dana Settled", ok: allFundsSettled },
                ].map((req) => (
                  <li key={req.label} className="flex items-center justify-between gap-2">
                    <span className="text-neutral-dark">{req.label}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        req.ok
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {req.ok ? "Terpenuhi" : "Belum"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIM & ROSTER PANITIA */}
      {activeTab === "roster" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
            <div>
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Tim &amp; Roster Panitia ({projectRoster.length})
              </h2>
              <p className="text-xs text-neutral-dark">
                Anggota tim tidak wajib punya akun; hanya Pengelola (Manager) yang wajib kader terverifikasi.
              </p>
            </div>
            {canOperate && (
              <button
                type="button"
                onClick={openCreateRoster}
                className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Tambah Anggota</span>
              </button>
            )}
          </div>

          {projectRoster.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {projectRoster.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-2.5 text-xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md ${
                          member.access_level === "Manager"
                            ? "bg-brand-burgundy text-white"
                            : "bg-white border border-[#E9E1DC] text-neutral-dark"
                        }`}
                      >
                        {member.access_level === "Manager" ? "Pengelola" : "Anggota Tim"}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {member.nim || "Non-Akun"}
                      </span>
                    </div>
                    <strong className="font-serif text-sm text-wine-950 block">
                      {member.name}
                    </strong>
                    <span className="text-[11px] text-neutral-dark block">{member.role_title}</span>
                  </div>

                  {canOperate && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-[#E9E1DC]">
                      <button
                        type="button"
                        onClick={() => openEditRoster(member.id)}
                        className="px-2.5 py-1 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold text-[10px] inline-flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      {isOwnerKakom && member.access_level === "Manager" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDemoteManagerToMember(member.id, member.user_id ?? null, member.name)
                          }
                          className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 font-semibold text-[10px] inline-flex items-center gap-1"
                        >
                          <ArrowDownCircle className="w-3 h-3" />
                          <span>Turunkan ke Member</span>
                        </button>
                      )}

                      {member.access_level !== "Manager" && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRoster(member.id, member.name)}
                          className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold text-[10px] inline-flex items-center gap-1 ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
              Belum ada anggota roster yang tercatat untuk program kerja ini.
            </p>
          )}
        </div>
      )}

      {/* TAB 3: AGENDA, TIKET & PRESENSI */}
      {activeTab === "events" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
            <div>
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Agenda, Event &amp; Presensi ({projectEvents.length})
              </h2>
              <p className="text-xs text-neutral-dark">
                Kelola publikasi event proker, jenis tiket, verifikasi pembayaran, dan scanner QR hari-H.
              </p>
            </div>
            <Link
              href="/organization/events"
              className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Buka Manajemen Event</span>
            </Link>
          </div>

          {projectEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectEvents.map((evt) => {
                const evtTickets = store.tickets.filter((t) => t.event_id === evt.id);
                const checkedIn = evtTickets.filter((t) => t.is_checked_in).length;
                return (
                  <div
                    key={evt.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {evt.category === "gratis" ? "Gratis" : "Berbayar"}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-dark">
                        Hadir: {checkedIn}/{evtTickets.length} tiket
                      </span>
                    </div>
                    <strong className="font-serif text-base text-wine-950 block">
                      {evt.title}
                    </strong>
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E9E1DC]">
                      <Link
                        href={`/organization/events/${evt.id}`}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold"
                      >
                        Kelola 6-Tab Event
                      </Link>
                      <Link
                        href={`/organization/events/${evt.id}/check-in`}
                        className="px-3.5 py-1.5 rounded-full bg-brand-burgundy text-white font-semibold inline-flex items-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Presensi QR</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
              Belum ada event publik/internal yang ditautkan ke program kerja ini.
            </p>
          )}
        </div>
      )}

      {/* TAB 4: PERSURATAN PROKER (URL Dokumen + Poin Kebutuhan & Ceklis Live Sekum) */}
      {activeTab === "letters" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
            <div>
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Persuratan Program Kerja ({projectLetters.length})
              </h2>
              <p className="text-xs text-neutral-dark">
                Ajukan surat dengan tautan dokumen &amp; poin kebutuhan fleksibel. Progres ceklis dari Sekum tampil langsung di sini.
              </p>
            </div>
            {canOperate && (
              <button
                type="button"
                onClick={() => setLetterModalOpen(true)}
                className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajukan Surat Baru</span>
              </button>
            )}
          </div>

          {projectLetters.length > 0 ? (
            <div className="space-y-3">
              {projectLetters.map((letter) => {
                const checklist = letter.checklist || [];
                const checkedCount = checklist.filter((c) => c.checked).length;
                const allChecked = checklist.length > 0 && checkedCount === checklist.length;
                return (
                  <div
                    key={letter.id}
                    onClick={() => setSelectedLetter(letter)}
                    className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                          {letter.routing}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 uppercase">
                          {letter.status}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            allChecked
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          Ceklis: {checkedCount}/{checklist.length}
                        </span>
                        {letter.generated_letter_number && (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold">
                            No: {letter.generated_letter_number}
                          </span>
                        )}
                      </div>
                      <strong className="font-serif text-sm text-wine-950 block truncate">
                        {letter.title}
                      </strong>
                      <p className="text-[11px] text-neutral-dark line-clamp-1">
                        {letter.purpose}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLetter(letter);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold inline-flex items-center gap-1 shrink-0 self-start sm:self-center"
                    >
                      <span>{permissions.canReviewLetter ? "Ceklis & Review" : "Lihat Progres"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
              Belum ada pengajuan surat untuk program kerja ini.
            </p>
          )}
        </div>
      )}

      {/* TAB 5: KEUANGAN PROKER (RAB + CATAT TRANSAKSI WAJIB BUKTI) */}
      {activeTab === "finance" && (
        <div className="space-y-6">
          {/* Section A: Pengajuan Dana (RAB) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
              <div>
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Pengajuan Dana / RAB ({projectFunds.length})
                </h2>
                <p className="text-xs text-neutral-dark">
                  Ajukan RAB ke Bendahara Umum, pantau bukti transfer pencairan, dan konfirmasi saat dana diterima.
                </p>
              </div>
              {canOperate && (
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setFundModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajukan Dana (RAB)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <Banknote className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Catat Transaksi</span>
                  </button>
                </div>
              )}
            </div>

            {projectFunds.length > 0 ? (
              <div className="space-y-3">
                {projectFunds.map((f) => {
                  const needsReceiptConfirm =
                    canOperate &&
                    (f.status === "fully_disbursed" ||
                      f.status === "partially_disbursed" ||
                      f.tranches.some((tr) => tr.disbursement_status === "transferred"));

                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFund(f)}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] hover:border-brand-burgundy/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950 uppercase">
                            {f.status}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-brand-burgundy">
                            Rp {f.requested_amount.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <strong className="font-serif text-sm text-wine-950 block">
                          {f.purpose}
                        </strong>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <span
                          className={`px-3.5 py-1.5 rounded-full font-semibold inline-flex items-center gap-1 ${
                            needsReceiptConfirm
                              ? "bg-emerald-700 text-white"
                              : "bg-white border border-[#E9E1DC] text-wine-950"
                          }`}
                        >
                          {needsReceiptConfirm ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Konfirmasi Terima</span>
                            </>
                          ) : (
                            <span>Rincian</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada pengajuan dana (RAB) untuk program kerja ini.
              </p>
            )}
          </div>

          {/* Section B: Buku Transaksi Proker (Direct Income/Expense + Mandatory Proof) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
              <div>
                <h2 className="font-serif text-lg font-bold text-wine-950">
                  Buku Transaksi Proker ({projectTransactions.length})
                </h2>
                <p className="text-xs text-neutral-dark">
                  Pencatatan pemasukan (tiket/sponsor) &amp; pengeluaran operasional proker disertai bukti transaksi wajib, terpantau langsung oleh Bendum.
                </p>
              </div>
              {canOperate && (
                <button
                  type="button"
                  onClick={() => setTxModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span>Catat Transaksi + Bukti</span>
                </button>
              )}
            </div>

            {projectTransactions.length > 0 ? (
              <div className="space-y-2.5">
                {projectTransactions.map((tx) => {
                  const isIncome = tx.type === "income";
                  return (
                    <div
                      key={tx.id}
                      className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isIncome
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {isIncome ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono text-neutral-light">
                              {tx.date}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#E9E1DC] text-wine-950">
                              {tx.category}
                            </span>
                            {tx.proof_file_name && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <Paperclip className="w-3 h-3" />
                                <span className="truncate max-w-[160px]">{tx.proof_file_name}</span>
                              </span>
                            )}
                          </div>
                          <strong className="text-wine-950 block">{tx.description}</strong>
                        </div>
                      </div>

                      <span
                        className={`font-mono font-bold text-sm shrink-0 ${
                          isIncome ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {isIncome ? "+" : "-"} Rp {tx.amount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada transaksi kas yang dicatat pada buku proker ini.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: DOKUMEN & LPJ 7-BAGIAN */}
      {activeTab === "lpj" && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1DC]">
            <div>
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Dokumen &amp; LPJ Program Kerja
              </h2>
              <p className="text-xs text-neutral-dark">
                LPJ 7-bagian menarik otomatis rekap kehadiran &amp; keuangan dari sistem.
              </p>
            </div>
            <Link
              href={projectLpj ? `/organization/lpj/${projectLpj.id}` : "/organization/lpj"}
              className="px-4 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold inline-flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{projectLpj ? "Buka LPJ 7-Bagian" : "Kelola LPJ"}</span>
            </Link>
          </div>

          {projectLpj ? (
            <div className="p-4 rounded-2xl bg-[#FCF8F6] border border-[#E8B577]/45 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                  Status LPJ: {projectLpj.status}
                </span>
                <strong className="font-serif text-base text-wine-950 block">
                  {projectLpj.title}
                </strong>
                <p className="text-neutral-dark">{projectLpj.section_2_summary}</p>
              </div>
              <Link
                href={`/organization/lpj/${projectLpj.id}`}
                className="px-4 py-2 rounded-full bg-white border border-[#E9E1DC] hover:border-brand-burgundy/40 text-wine-950 font-semibold shrink-0"
              >
                Periksa LPJ →
              </Link>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-[#FCF8F6] border border-dashed border-[#E9E1DC] text-xs text-neutral-dark text-center">
              LPJ untuk program kerja ini belum disusun.
            </div>
          )}

          {projectDocs.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h3 className="font-serif text-sm font-bold text-wine-950">
                Dokumen Terkait ({projectDocs.length})
              </h3>
              {projectDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <strong className="text-wine-950 block truncate">{doc.title}</strong>
                    <span className="text-[10px] font-mono text-neutral-light">
                      {doc.category} • Versi {doc.version}
                    </span>
                  </div>
                  <Link
                    href={`/organization/documents/${doc.id}`}
                    className="text-brand-burgundy font-semibold hover:underline shrink-0"
                  >
                    Riwayat Versi →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: RIWAYAT & AUDIT PROKER */}
      {activeTab === "history" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audit Events */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Log Audit Kewenangan ({projectAudits.length})
              </h2>
              <p className="text-xs text-neutral-dark">
                Rekam jejak penunjukan/pencabutan Manager, persetujuan surat, pencairan RAB, dan penutupan proker.
              </p>
            </div>
            {projectAudits.length > 0 ? (
              <div className="space-y-2.5 text-xs">
                {projectAudits.map((aud) => (
                  <div
                    key={aud.id}
                    className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-burgundy/10 text-brand-burgundy">
                        {aud.action.replace(/_/g, " ")}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {new Date(aud.timestamp).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-wine-950">
                      <strong>{aud.actor_name}</strong>
                      {aud.after_state ? ` → ${aud.after_state}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada catatan audit khusus untuk program kerja ini.
              </p>
            )}
          </div>

          {/* Activity History */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border border-[#E9E1DC] shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#E9E1DC]">
              <h2 className="font-serif text-lg font-bold text-wine-950">
                Aktivitas Operasional ({projectActivities.length})
              </h2>
              <p className="text-xs text-neutral-dark">
                Kronologi perubahan roster, catatan perkembangan naratif, dan pengajuan operasional proker.
              </p>
            </div>
            {projectActivities.length > 0 ? (
              <div className="space-y-2.5 text-xs">
                {projectActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-wine-950">
                        <strong>{act.actor_name}</strong> {act.action}{" "}
                        <span className="font-semibold text-brand-burgundy">{act.target}</span>
                      </p>
                      <span className="text-[10px] font-mono text-neutral-light">
                        {act.module}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-light shrink-0">
                      {new Date(act.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-dark p-6 rounded-2xl bg-[#FCF8F6] text-center">
                Belum ada riwayat aktivitas operasional tercatat.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* MODAL 1: Edit Identitas & Logo Proker (WRK-04 Logo Mandatory Rule) */}
      <EditorialModal
        isOpen={editInfoOpen}
        onClose={() => setEditInfoOpen(false)}
        badge="Identitas & Status Proker"
        title="Edit Informasi & Logo Proker"
        subtitle="Status operasional dan status publikasi dipisahkan. Logo wajib diisi sebelum Proker berstatus Berjalan atau Terpublikasi."
        maxWidth="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditInfoOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="edit-project-info-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan Perubahan
            </button>
          </>
        }
      >
        <form id="edit-project-info-form" onSubmit={handleSaveInfo} className="space-y-4 text-xs">
          {editError && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{editError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-wine-950">Nama Program Kerja</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-wine-950">Tujuan Proker</label>
              <textarea
                rows={2}
                value={editPurpose}
                onChange={(e) => setEditPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950">Lokasi</label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950">URL / Path Logo Proker</label>
              <input
                type="text"
                value={editLogoUrl}
                onChange={(e) => setEditLogoUrl(e.target.value)}
                placeholder="/assets/assets_logo/logo_hipmi.png"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950">Status Operasional</label>
              <select
                value={editOpStatus}
                onChange={(e) => setEditOpStatus(e.target.value as ProjectOperationalStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="draft">Perencanaan Awal (Draf)</option>
                <option value="planned">Terjadwal</option>
                <option value="ongoing">Sedang Berjalan (Wajib Logo)</option>
                <option value="completed">Selesai</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-wine-950">Status Publikasi Web</label>
              <select
                value={editPubStatus}
                onChange={(e) => setEditPubStatus(e.target.value as typeof editPubStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="unpublished">Internal (Belum Tayang)</option>
                <option value="review">Menunggu Review Publikasi</option>
                <option value="published">Terpublikasi ke Web Publik (Wajib Logo)</option>
              </select>
            </div>
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 2: Catat Perkembangan Naratif (WRK-08) */}
      <EditorialModal
        isOpen={progressModalOpen}
        onClose={() => setProgressModalOpen(false)}
        badge="Perkembangan Naratif"
        title="Catat Perkembangan Program Kerja"
        subtitle="Tuliskan capaian terbaru, kendala di lapangan, dan rencana selanjutnya secara naratif."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setProgressModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-progress-form"
              className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              Simpan Catatan
            </button>
          </>
        }
      >
        <form id="add-progress-form" onSubmit={handleSaveProgress} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Tahapan Saat Ini</label>
            <input
              type="text"
              required
              value={progStage}
              onChange={(e) => setProgStage(e.target.value)}
              placeholder="Contoh: Finalisasi Venue & Sponsor"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Capaian Terbaru <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={progAchievements}
              onChange={(e) => setProgAchievements(e.target.value)}
              placeholder="Apa yang sudah berhasil diselesaikan minggu ini?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Kendala / Hambatan</label>
            <textarea
              rows={2}
              value={progObstacles}
              onChange={(e) => setProgObstacles(e.target.value)}
              placeholder="Kendala yang perlu dukungan Kakom/Kabid/BPH..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Rencana Selanjutnya</label>
            <textarea
              rows={2}
              value={progPlans}
              onChange={(e) => setProgPlans(e.target.value)}
              placeholder="Langkah berikutnya yang akan dijalankan..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 resize-none"
            />
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 3: Tambah / Edit Anggota Roster */}
      <EditorialModal
        isOpen={rosterModalOpen}
        onClose={() => {
          setRosterModalOpen(false);
          setEditingRosterId(null);
        }}
        badge="Tim & Roster Panitia"
        title={editingRosterId ? "Edit Anggota Panitia" : "Tambah Anggota Panitia"}
        subtitle="Kelola identitas dan divisi kepanitiaan anggota dalam daftar roster proker ini."
        maxWidth="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => {
                setRosterModalOpen(false);
                setEditingRosterId(null);
              }}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-roster-form"
              className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
            >
              {editingRosterId ? "Simpan Perubahan" : "Tambahkan"}
            </button>
          </>
        }
      >
        <form id="add-roster-form" onSubmit={handleSaveRoster} className="space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={rosterName}
              onChange={(e) => setRosterName(e.target.value)}
              placeholder="Contoh: Naufal Ramadhan"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">NIM (Opsional)</label>
            <input
              type="text"
              value={rosterNim}
              onChange={(e) => setRosterNim(e.target.value)}
              placeholder="1301220xxx"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Jabatan / Divisi Kepanitiaan</label>
            <input
              type="text"
              required
              value={rosterRole}
              onChange={(e) => setRosterRole(e.target.value)}
              placeholder="Contoh: Staff Acara / Koordinator Sponsorship"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            />
          </div>
        </form>
      </EditorialModal>

      {/* MODAL 4: Atur Pengelola Proker (Khusus Kakom — Cari NIM / Nama Kader) */}
      <EditorialModal
        isOpen={managerModalOpen}
        onClose={() => setManagerModalOpen(false)}
        badge="Kewenangan Kepala Kompartemen"
        title="Atur Pengelola Proker (Manager)"
        subtitle="Cari kader berdasarkan NIM atau nama akun untuk melihat identitas & status verifikasi sebelum menunjuk sebagai Pengelola Proker."
        maxWidth="lg"
        footer={
          <button
            type="button"
            onClick={() => setManagerModalOpen(false)}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Selesai
          </button>
        }
      >
        <div className="space-y-5 text-xs">
          <div className="space-y-2">
            <strong className="text-wine-950 block">
              Manager Aktif Saat Ini ({activeManagers.length})
            </strong>
            {activeManagers.length > 0 ? (
              activeManagers.map((m) => {
                const u = store.users.find((usr) => usr.id === m.user_id);
                return (
                  <div
                    key={m.user_id}
                    className="p-3 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <strong className="text-wine-950 block truncate">{u?.name || m.user_id}</strong>
                      <span className="text-[11px] font-mono text-neutral-dark block truncate">
                        NIM: {u?.nim || "-"} {u?.email ? `• ${u.email}` : ""}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRevokeManager(m.user_id)}
                      className="px-3 py-1 rounded-full border border-red-200 text-red-700 hover:bg-red-50 text-[11px] font-semibold inline-flex items-center gap-1 shrink-0"
                    >
                      <UserMinus className="w-3 h-3" />
                      <span>Cabut</span>
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-neutral-dark">Belum ada Manager aktif.</p>
            )}
          </div>

          <div className="space-y-2.5 pt-3 border-t border-[#E9E1DC]">
            <label className="font-semibold text-wine-950 block">
              Cari &amp; Tunjuk Kader Terverifikasi berdasarkan NIM / Nama
            </label>
            <CadreNimLookup
              users={store.users}
              assignedUserIds={activeManagers.map((m) => m.user_id)}
              mode="assign"
              onSelect={handleAssignManagerUser}
            />
          </div>
        </div>
      </EditorialModal>

      {/* MODAL 5 & 5B: Ajukan Surat Baru (Poin Kebutuhan Fleksibel) & Detail/Ceklis Sekum */}
      <CreateLetterModal
        isOpen={letterModalOpen}
        onClose={() => setLetterModalOpen(false)}
        store={store}
        currentUser={currentUser}
        defaultUnitName={`${compartment?.name || "Unit"} • ${project.name}`}
        lockedProjectId={project.id}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <LetterDetailModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
        store={store}
        currentUser={currentUser}
        canReviewLetter={permissions.canReviewLetter}
        onUpdated={(msg) => setFeedback(msg)}
      />

      {/* MODAL 6, 6B & 6C: Ajukan Dana RAB, Catat Transaksi Wajib Bukti, & Rincian/Konfirmasi RAB */}
      <CreateFundRequestModal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        store={store}
        currentUser={currentUser}
        defaultUnitName={`${compartment?.name || "Unit"} • ${project.name}`}
        lockedProjectId={project.id}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <RecordTransactionModal
        isOpen={txModalOpen}
        onClose={() => setTxModalOpen(false)}
        store={store}
        currentUser={currentUser}
        lockedProjectId={project.id}
        sourceAccountLabel={`Kas Proker: ${project.name}`}
        onSuccess={(msg) => setFeedback(msg)}
      />

      <FundRequestDetailModal
        request={selectedFund}
        onClose={() => setSelectedFund(null)}
        store={store}
        currentUser={currentUser}
        isBendum={permissions.isBendum}
        canConfirmReceipt={canOperate}
        onUpdated={(msg) => setFeedback(msg)}
      />

      {/* MODAL 7: Tutup & Arsipkan Proker (Khusus Kakom — 3-Requirement Checklist WRK-10) */}
      <EditorialModal
        isOpen={closureModalOpen}
        onClose={() => setClosureModalOpen(false)}
        badge="Penutupan & Arsip Proker"
        title={`Tutup Proker ${project.name}?`}
        subtitle="Sistem memvalidasi 3 prasyarat wajib sebelum program kerja dapat ditutup dan diubah menjadi arsip Read-Only."
        maxWidth="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setClosureModalOpen(false)}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={!canCloseProject}
              onClick={handleCloseProject}
              className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tutup &amp; Arsipkan Proker</span>
            </button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="space-y-2.5">
            {[
              { label: "LPJ Proker berstatus Approved", ok: isLpjApproved },
              { label: "Seluruh pengajuan surat telah selesai", ok: allLettersDone },
              { label: "Seluruh pencairan dana telah Settled", ok: allFundsSettled },
            ].map((item) => (
              <div
                key={item.label}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${
                  item.ok
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                    : "bg-red-50/70 border-red-200 text-red-900"
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className="font-mono font-bold text-[10px] uppercase">
                  {item.ok ? "✓ Terpenuhi" : "✕ Belum"}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC] flex items-start gap-2 text-[11px] text-neutral-dark">
            <Info className="w-4 h-4 text-brand-burgundy shrink-0 mt-0.5" />
            <span>
              Setelah ditutup, hak kelola Manager berakhir namun seluruh data roster, persuratan, keuangan, dan dokumen tetap tersimpan sebagai arsip sejarah kabinet.
            </span>
          </div>
        </div>
      </EditorialModal>
    </div>
  );
}
