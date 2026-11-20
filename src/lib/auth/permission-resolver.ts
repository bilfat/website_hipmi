import { User, MockStoreData } from "@/types/domain";
import { formatRoleLabel } from "@/lib/personal/labels";

export type OrgRoleProfile =
  | "top_management"
  | "sekum"
  | "bendum"
  | "kabid"
  | "kakom"
  | "staff"
  | "project_manager"
  | "none";

export interface ResolvedPermissions {
  canAccessPersonal: boolean;
  canAccessKeanggotaan: boolean; // Only verified cadres
  canAccessOrganization: boolean;
  canAccessWorkspace: boolean;
  canAccessAdmin: boolean;
  orgRoleProfile: OrgRoleProfile;
  isPureProjectManager: boolean;
  roleBadgeTitle: string;
  roleScopeSubtitle: string;
  primaryWorkspaceHref: string | null;
  managedFieldId: string | null;
  managedCompartmentId: string | null;
  managedProjectIds: string[];
  isSekum: boolean;
  isBendum: boolean;
  isKakom: boolean;
  isKabid: boolean;
  isTopManagement: boolean;
  isSystemAdmin: boolean;
  canManageLetters: boolean;
  canCreateLetter: boolean;
  canReviewLetter: boolean;
  canManageFinance: boolean;
  canCreateFundRequest: boolean;
  canApproveFundRequest: boolean;
  canDisburseFund: boolean;
  canManageEvents: boolean;
  canVerifyTicketPayment: boolean;
  canScanAttendance: boolean;
  canReviewMedpart: boolean;
  canPublishMedpart: boolean;
  canCreateContent: boolean;
  canPublishContent: boolean;
  canManageCadres: boolean;
  canVerifyCadres: boolean;
  canManageBusinesses: boolean;
  canManagePartnerships: boolean;
  canReadSponsors: boolean;
  canManageFeedback: boolean;
  canReviewLPJ: boolean;
  allowedAreas: ("personal" | "organization" | "workspace" | "admin")[];
  assignedWorkspaces: {
    type: "field" | "compartment" | "project";
    id: string;
    name: string;
    roleTitle: string;
    href: string;
  }[];
}

export function resolveUserPermissions(user: User, store: MockStoreData): ResolvedPermissions {
  const isAccountActive = user.account_status === "active";
  const isVerifiedCadre = user.cadre_status === "verified";
  const role = user.base_role;
  const perms = user.additional_permissions || [];

  const isSystemAdmin = role === "system_admin" || perms.includes("system:superadmin");
  const isTopManagement =
    ["ketum", "waketum", "sekjen"].includes(role) || perms.includes("org:monitor_full");
  const isSekum = role === "sekum" || perms.includes("correspondence:review");
  const isBendum = role === "bendum" || perms.includes("finance:review");
  const isKabid = role === "kabid" || perms.includes("field:manage");
  const isKakom = role === "kakom" || perms.includes("manager:assign");

  // Assigned Workspaces
  const assignedWorkspaces: ResolvedPermissions["assignedWorkspaces"] = [];
  let managedFieldId: string | null = null;
  let managedCompartmentId: string | null = null;
  const managedProjectIds: string[] = [];

  // 1. Fields (Kabid)
  if (isKabid) {
    const fields = store.fields.filter((f) => f.leader_user_id === user.id);
    fields.forEach((f) => {
      if (!managedFieldId) managedFieldId = f.id;
      assignedWorkspaces.push({
        type: "field",
        id: f.id,
        name: f.name,
        roleTitle: "Kepala Bidang",
        href: `/workspace/${f.id}`,
      });
    });
  }

  // 2. Compartments (Kakom or Staff assigned to compartment)
  if (isKakom) {
    const comps = store.compartments.filter((c) => c.leader_user_id === user.id);
    comps.forEach((c) => {
      if (!managedCompartmentId) managedCompartmentId = c.id;
      assignedWorkspaces.push({
        type: "compartment",
        id: c.id,
        name: c.name,
        roleTitle: "Kepala Kompartemen",
        href: `/workspace/${c.id}`,
      });
    });
  } else if (role === "staff" && user.id !== "usr-demo-04") {
    // Staff demo accounts linked to compartment
    const ledComp = store.compartments.find((c) => c.leader_user_id === user.id);
    if (ledComp) {
      managedCompartmentId = ledComp.id;
      assignedWorkspaces.push({
        type: "compartment",
        id: ledComp.id,
        name: ledComp.name,
        roleTitle: "Staff Kompartemen",
        href: `/workspace/${ledComp.id}`,
      });
    } else if (["usr-demo-05", "usr-demo-06", "usr-demo-07", "usr-demo-26"].includes(user.id)) {
      managedCompartmentId = "comp-demo-01";
      assignedWorkspaces.push({
        type: "compartment",
        id: "comp-demo-01",
        name: "Kompartemen Kaderisasi",
        roleTitle: "Staff Kompartemen",
        href: "/workspace/comp-demo-01",
      });
    }
  }

  // 3. Projects (Project Managers)
  const managedProjects = store.projects.filter((p) =>
    (p.managers || []).some((m) => m.user_id === user.id && m.status === "active")
  );
  managedProjects.forEach((p) => {
    managedProjectIds.push(p.id);
    assignedWorkspaces.push({
      type: "project",
      id: p.id,
      name: p.name,
      roleTitle: "Pengelola Proker",
      href: `/workspace/projects/${p.id}`,
    });
  });

  // Service-specific permissions
  const canManageEvents = perms.includes("event:manage") || isTopManagement || isKakom;
  const canVerifyTicketPayment = perms.includes("payment:verify") || perms.includes("ticket:deliver");
  const canScanAttendance = perms.includes("attendance:scan") || perms.includes("attendance:manual");
  const canReviewMedpart = perms.includes("medpart:review");
  const canPublishMedpart = perms.includes("medpart:publish_manual");
  const canCreateContent = perms.includes("content_creator");
  const canPublishContent = perms.includes("publisher");
  const canManageCadres = perms.includes("cadre:manage") || isSystemAdmin;
  const canVerifyCadres = perms.includes("cadre:verify") || isSystemAdmin;
  const canManagePartnerships = perms.includes("partnership:manage");
  const canManageBusinesses = canManagePartnerships || isTopManagement;
  const canManageFeedback = perms.includes("feedback:triage") || perms.includes("feedback:close");
  const canReviewLPJ = perms.includes("lpj:review") || isTopManagement;

  const hasSpecialServicePerm =
    canVerifyTicketPayment ||
    canScanAttendance ||
    canReviewMedpart ||
    canPublishMedpart ||
    canCreateContent ||
    canPublishContent ||
    canManageCadres ||
    canManagePartnerships ||
    canManageFeedback ||
    perms.includes("lpj:review") ||
    perms.includes("correspondence:create") ||
    perms.includes("finance:create");

  // Pure Project Manager: manages project(s) ONLY, no structural/BPH/compartment/service-staff role
  const isPureProjectManager =
    isAccountActive &&
    !isTopManagement &&
    !isSekum &&
    !isBendum &&
    !isKabid &&
    !isKakom &&
    !isSystemAdmin &&
    !managedCompartmentId &&
    !hasSpecialServicePerm &&
    (managedProjectIds.length > 0 || user.id === "usr-demo-04");

  const hasWorkspace = assignedWorkspaces.length > 0;

  const canAccessPersonal = isAccountActive;
  const canAccessKeanggotaan = isAccountActive && isVerifiedCadre;

  const canAccessOrganization =
    isAccountActive &&
    (isTopManagement ||
      isSekum ||
      isBendum ||
      isKabid ||
      isKakom ||
      role === "staff" ||
      hasWorkspace);

  const canAccessWorkspace = isAccountActive && hasWorkspace;
  const canAccessAdmin = isAccountActive && isSystemAdmin;

  // Determine unified Role Profile & Specific Sidebar Badge
  let orgRoleProfile: OrgRoleProfile = "none";
  let roleBadgeTitle = formatRoleLabel(role);
  let roleScopeSubtitle = "Personal Area";

  if (isTopManagement) {
    orgRoleProfile = "top_management";
    roleBadgeTitle = "Pimpinan Kabinet";
    roleScopeSubtitle = `${formatRoleLabel(role)} • Seluruh Kabinet`;
  } else if (isSekum) {
    orgRoleProfile = "sekum";
    roleBadgeTitle = "Sekretaris Umum";
    roleScopeSubtitle = "Administrasi & Persuratan";
  } else if (isBendum) {
    orgRoleProfile = "bendum";
    roleBadgeTitle = "Bendahara Umum";
    roleScopeSubtitle = "Keuangan & Kas Kabinet";
  } else if (isKabid) {
    orgRoleProfile = "kabid";
    const fieldObj = store.fields.find((f) => f.id === managedFieldId);
    roleBadgeTitle = "Kepala Bidang";
    roleScopeSubtitle = fieldObj ? fieldObj.name : "Monitoring Bidang";
  } else if (isKakom) {
    orgRoleProfile = "kakom";
    const compObj = store.compartments.find((c) => c.id === managedCompartmentId);
    roleBadgeTitle = "Kepala Kompartemen";
    roleScopeSubtitle = compObj ? compObj.name : "Operasional Kompartemen";
  } else if (isPureProjectManager) {
    orgRoleProfile = "project_manager";
    const projObj = store.projects.find((p) => p.id === managedProjectIds[0]);
    roleBadgeTitle = "Pengelola Proker";
    roleScopeSubtitle = projObj ? projObj.name : "Workspace Proker";
  } else if (role === "staff" && canAccessOrganization) {
    orgRoleProfile = "staff";
    const compObj = store.compartments.find((c) => c.id === managedCompartmentId);
    roleBadgeTitle = "Staff Organisasi";
    if (canManageCadres) roleScopeSubtitle = "Layanan Database Kader";
    else if (canManagePartnerships) roleScopeSubtitle = "Layanan Bisnis & Mitra";
    else if (canReviewMedpart) roleScopeSubtitle = "Layanan Media Partner";
    else if (canCreateContent || canPublishContent) roleScopeSubtitle = "Layanan Berita & Prestasi";
    else if (canManageFeedback) roleScopeSubtitle = "Layanan Kotak Suara";
    else if (canVerifyTicketPayment || canScanAttendance) roleScopeSubtitle = "Layanan Event & Presensi";
    else if (perms.includes("lpj:review")) roleScopeSubtitle = "Reviewer LPJ Organisasi";
    else roleScopeSubtitle = compObj ? compObj.name : "Operasional Unit";
  }

  // Primary Workspace entry link
  let primaryWorkspaceHref: string | null = null;
  if (isPureProjectManager && managedProjectIds[0]) {
    primaryWorkspaceHref = `/workspace/projects/${managedProjectIds[0]}`;
  } else if (isKabid && managedFieldId) {
    primaryWorkspaceHref = `/workspace/${managedFieldId}`;
  } else if (isKakom && managedCompartmentId) {
    primaryWorkspaceHref = `/workspace/${managedCompartmentId}`;
  } else if (assignedWorkspaces[0]) {
    primaryWorkspaceHref = assignedWorkspaces[0].href;
  }

  // Special Rule: Sponsor & Mitra Directory is accessible for reference to ALL org roles + Project Managers!
  const canReadSponsors = canAccessOrganization || isPureProjectManager;

  const allowedAreas: ("personal" | "organization" | "workspace" | "admin")[] = [];
  if (canAccessPersonal) allowedAreas.push("personal");
  if (canAccessOrganization) allowedAreas.push("organization");
  if (canAccessWorkspace) allowedAreas.push("workspace");
  if (canAccessAdmin) allowedAreas.push("admin");

  return {
    canAccessPersonal,
    canAccessKeanggotaan,
    canAccessOrganization,
    canAccessWorkspace,
    canAccessAdmin,
    orgRoleProfile,
    isPureProjectManager,
    roleBadgeTitle,
    roleScopeSubtitle,
    primaryWorkspaceHref,
    managedFieldId,
    managedCompartmentId,
    managedProjectIds,
    isSekum,
    isBendum,
    isKakom,
    isKabid,
    isTopManagement,
    isSystemAdmin,
    canManageLetters: isSekum || perms.includes("correspondence:review"),
    canCreateLetter:
      isSekum ||
      perms.includes("correspondence:create") ||
      isKakom ||
      isKabid ||
      managedProjectIds.length > 0,
    canReviewLetter: isSekum || perms.includes("correspondence:review"),
    canManageFinance: isBendum || perms.includes("finance:monitor"),
    canCreateFundRequest:
      isBendum ||
      perms.includes("fund_request:create") ||
      perms.includes("finance:create") ||
      isKakom ||
      managedProjectIds.length > 0,
    canApproveFundRequest: isBendum || perms.includes("finance:approve"),
    canDisburseFund: isBendum || perms.includes("finance:disburse"),
    canManageEvents,
    canVerifyTicketPayment,
    canScanAttendance,
    canReviewMedpart,
    canPublishMedpart,
    canCreateContent,
    canPublishContent,
    canManageCadres,
    canVerifyCadres,
    canManageBusinesses,
    canManagePartnerships,
    canReadSponsors,
    canManageFeedback,
    canReviewLPJ,
    allowedAreas,
    assignedWorkspaces,
  };
}
