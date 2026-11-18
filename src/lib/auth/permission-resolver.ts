import { User, MockStoreData } from "@/types/domain";

export interface ResolvedPermissions {
  canAccessPersonal: boolean;
  canAccessKeanggotaan: boolean; // Only verified cadres
  canAccessOrganization: boolean;
  canAccessWorkspace: boolean;
  canAccessAdmin: boolean;
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
  canManagePartnerships: boolean;
  canManageFeedback: boolean;
  canReviewLPJ: boolean;
  allowedAreas: ("personal" | "organization" | "workspace" | "admin")[];
  assignedWorkspaces: {
    type: "field" | "compartment" | "project";
    id: string;
    name: string;
    roleTitle: string;
  }[];
}

export function resolveUserPermissions(user: User, store: MockStoreData): ResolvedPermissions {
  const isAccountActive = user.account_status === "active";
  const isVerifiedCadre = user.cadre_status === "verified";
  const role = user.base_role;
  const perms = user.additional_permissions || [];

  const isSystemAdmin = role === "system_admin" || perms.includes("system:superadmin");
  const isTopManagement = ["ketum", "waketum", "sekjen"].includes(role) || perms.includes("org:monitor_full");
  const isSekum = role === "sekum" || perms.includes("correspondence:review");
  const isBendum = role === "bendum" || perms.includes("finance:review");
  const isKabid = role === "kabid" || perms.includes("field:manage");
  const isKakom = role === "kakom" || perms.includes("manager:assign");

  // Check workspaces assigned
  const assignedWorkspaces: ResolvedPermissions["assignedWorkspaces"] = [];

  // 1. Fields
  if (isKabid) {
    const fields = store.fields.filter((f) => f.leader_user_id === user.id);
    fields.forEach((f) => {
      assignedWorkspaces.push({
        type: "field",
        id: f.id,
        name: f.name,
        roleTitle: "Kepala Bidang"
      });
    });
  }

  // 2. Compartments
  if (isKakom) {
    const comps = store.compartments.filter((c) => c.leader_user_id === user.id);
    comps.forEach((c) => {
      assignedWorkspaces.push({
        type: "compartment",
        id: c.id,
        name: c.name,
        roleTitle: "Kepala Kompartemen"
      });
    });
  } else if (role === "staff") {
    // For staff, comp-demo-01 is assigned for staff demo accounts
    if (["usr-demo-05", "usr-demo-06", "usr-demo-07", "usr-demo-26"].includes(user.id)) {
      assignedWorkspaces.push({
        type: "compartment",
        id: "comp-demo-01",
        name: "Kompartemen Kaderisasi",
        roleTitle: "Staff Kompartemen"
      });
    }
  }

  // 3. Projects
  const managedProjects = store.projects.filter((p) =>
    (p.managers || []).some((m) => m.user_id === user.id && m.status === "active")
  );
  managedProjects.forEach((p) => {
    assignedWorkspaces.push({
      type: "project",
      id: p.id,
      name: p.name,
      roleTitle: "Project Manager"
    });
  });

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
    isSekum,
    isBendum,
    isKakom,
    isKabid,
    isTopManagement,
    isSystemAdmin,
    canManageLetters: isSekum || perms.includes("correspondence:review"),
    canCreateLetter: isSekum || perms.includes("correspondence:create") || isKakom || isKabid,
    canReviewLetter: isSekum || perms.includes("correspondence:review"),
    canManageFinance: isBendum || perms.includes("finance:monitor"),
    canCreateFundRequest: isBendum || perms.includes("fund_request:create") || perms.includes("finance:create") || hasWorkspace,
    canApproveFundRequest: isBendum || perms.includes("finance:approve"),
    canDisburseFund: isBendum || perms.includes("finance:disburse"),
    canManageEvents: perms.includes("event:manage") || isTopManagement || isKakom,
    canVerifyTicketPayment: perms.includes("payment:verify") || perms.includes("ticket:deliver"),
    canScanAttendance: perms.includes("attendance:scan") || perms.includes("attendance:manual"),
    canReviewMedpart: perms.includes("medpart:review"),
    canPublishMedpart: perms.includes("medpart:publish_manual"),
    canCreateContent: perms.includes("content_creator"),
    canPublishContent: perms.includes("publisher"),
    canManageCadres: perms.includes("cadre:manage") || isSystemAdmin,
    canVerifyCadres: perms.includes("cadre:verify") || isSystemAdmin,
    canManagePartnerships: perms.includes("partnership:manage"),
    canManageFeedback: perms.includes("feedback:triage") || perms.includes("feedback:close"),
    canReviewLPJ: perms.includes("lpj:review") || isTopManagement,
    allowedAreas,
    assignedWorkspaces
  };
}
