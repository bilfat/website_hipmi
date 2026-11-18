// ============================================================================
// HIPMI CENTRAL — DOMAIN TYPES & STATUS DEFINITIONS
// Based on PRD_frontend.md Section 11 & 11.8
// ============================================================================

export type AccountStatus = "active" | "verification_pending" | "inactive" | "suspended";

export type BaseRole = 
  | "mahasiswa" 
  | "kader" 
  | "staff" 
  | "kakom" 
  | "kabid" 
  | "ketum" 
  | "waketum" 
  | "sekjen" 
  | "sekum" 
  | "bendum" 
  | "system_admin";

export type CadreStatus = "not_verified" | "candidate" | "pending_verification" | "verified" | "rejected";

export type WorkspaceType = "field" | "compartment" | "project";

export type ProjectOperationalStatus = "draft" | "planned" | "ongoing" | "completed" | "cancelled" | "archived";
export type ProjectPublicationStatus = "unpublished" | "draft" | "review" | "published";

export type TaskStatus = "To Do" | "In Progress" | "Blocked" | "Done";

export type CorrespondenceType = "Surat Umum" | "Untuk Ditmawa";
export type CorrespondenceStatus = 
  | "draft" 
  | "submitted" 
  | "in_review" 
  | "revision" 
  | "revision_needed" 
  | "approved" 
  | "issued" 
  | "completed" 
  | "reopened" 
  | "archived";

export type DitmawaDispatchStatus = 
  | "not_required" 
  | "not_dispatched" 
  | "pending" 
  | "submitted_to_ditmawa" 
  | "under_review_ditmawa" 
  | "sent" 
  | "follow_up" 
  | "approved_by_ditmawa" 
  | "revision_requested" 
  | "completed";

export type FundRequestStatus = 
  | "draft" 
  | "submitted" 
  | "in_review" 
  | "revision" 
  | "approved" 
  | "partially_disbursed" 
  | "disbursed_partial" 
  | "fully_disbursed" 
  | "settled" 
  | "rejected";

export type DisbursementStatus = 
  | "pending" 
  | "transferred" 
  | "received" 
  | "confirmed" 
  | "disputed";

export type EventVisibility = "public" | "internal";
export type EventStatus = "draft" | "published" | "cancelled" | "completed" | "ongoing" | "archived" | string;
export type TicketCategory = "gratis" | "berbayar";

export type TicketTypeStatus = 
  | "scheduled" 
  | "open" 
  | "active" 
  | "closed" 
  | "soldout" 
  | "sold_out"
  | "draft";

export type RegistrationStatus = 
  | "registered" 
  | "reserved" 
  | "expired" 
  | "pending_verification" 
  | "approved" 
  | "confirmed"
  | "cancelled"
  | "rejected" 
  | "issued" 
  | "checked_in" 
  | "absent";

export type PaymentStatus = 
  | "not_required" 
  | "unpaid" 
  | "pending" 
  | "pending_verification" 
  | "approved" 
  | "paid" 
  | "rejected" 
  | "failed" 
  | "expired";

export type LPJStatus = 
  | "draft" 
  | "submitted" 
  | "in_review" 
  | "revision" 
  | "revision_needed" 
  | "approved" 
  | "rejected" 
  | "archived";

export type BusinessReviewStatus = 
  | "draft" 
  | "review" 
  | "in_review" 
  | "revision" 
  | "revision_needed" 
  | "approved" 
  | "rejected";

export type BusinessPublicationStatus = 
  | "unpublished" 
  | "draft" 
  | "published" 
  | "archived";

export type MedpartStatus = 
  | "submitted" 
  | "pending" 
  | "payment_pending" 
  | "payment_verified" 
  | "pending_review" 
  | "revision" 
  | "approved" 
  | "rejected" 
  | "published";

export type FeedbackStatus = 
  | "Baru" 
  | "submitted" 
  | "under_review" 
  | "routed_to_unit" 
  | "Dalam Tindak Lanjut" 
  | "in_progress" 
  | "Selesai" 
  | "closed";

// ----------------------------------------------------------------------------
// Entity Models
// ----------------------------------------------------------------------------

export interface User {
  id: string; // e.g. "usr-01"
  demo_id: string; // e.g. "DEMO-01"
  name: string;
  full_name?: string;
  email: string;
  nim: string | null;
  phone: string;
  faculty_id: string;
  study_program_id: string;
  study_program?: string;
  member_id?: string;
  avatar_url?: string;
  account_status: AccountStatus;
  cadre_status: CadreStatus;
  base_role: BaseRole;
  additional_permissions: string[];
  created_at: string;
}

export interface Faculty {
  id: string;
  code: string;
  name: string;
  study_programs?: { id: string; name: string }[];
}

export interface StudyProgram {
  id: string;
  faculty_id: string;
  code: string;
  name: string;
}

export interface Cabinet {
  id: string; // e.g. "cab-arthakarsa-2627"
  name: string;
  period?: string;
  logo: string;
  philosophy: string;
  vision: string;
  mission: string[];
  period_start: string;
  period_end: string;
  status: "active" | "archived";
}

export interface Field {
  id: string; // e.g. "field-demo-01"
  cabinet_id: string;
  name: string;
  code: string;
  leader_name: string;
  lead_name?: string;
  leader_user_id: string;
  description: string;
  icon_path: string;
}

export interface Compartment {
  id: string; // e.g. "comp-demo-01"
  field_id: string;
  cabinet_id: string;
  name: string;
  code: string;
  leader_name: string;
  leader_user_id: string;
  description: string;
}

export interface ManagerAssignment {
  user_id: string;
  assigned_by: string; // Kakom user_id
  assigned_at: string;
  status: "active" | "ended" | "revoked";
}

export interface RosterMember {
  id: string;
  project_id: string;
  user_id?: string | null;
  name: string;
  nim: string | null;
  role_title: string; // e.g. "Ketua Pelaksana", "Staff Acara"
  access_level: "Manager" | "Member";
  status: "active" | "ended";
  is_cadre: boolean;
  joined_at: string;
  ended_at?: string | null;
}

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string; // e.g. "proj-business-expo"
  compartment_id: string;
  field_id: string;
  cabinet_id: string;
  name: string;
  purpose: string;
  description: string;
  lead_name?: string;
  start_date: string;
  main_event_date: string;
  target_date: string;
  hide_main_event_date_public: boolean;
  location: string;
  logo_url?: string;
  operational_status: ProjectOperationalStatus;
  publication_status: ProjectPublicationStatus;
  managers?: ManagerAssignment[];
  progress_notes?: {
    id: string;
    stage: string;
    achievements: string;
    obstacles: string;
    plans: string;
    created_at: string;
  }[];
}

export interface CalendarEvent {
  id: string; // e.g. "cal-01"
  cabinet_id: string;
  title: string;
  category: "Rapat" | "Pleno" | "Event Formal" | "Main Event Proker" | "Lainnya";
  start_time: string; // ISO
  end_time: string;   // ISO
  location: string;
  description: string;
  visibility: EventVisibility;
  related_project_id?: string;
  linked_event_id?: string;
  linked_project_id?: string;
  owner_user_id?: string;
  workspace_context?: {
    type: string;
    id: string;
    name: string;
  } | string;
  created_at?: string;
}

export interface EventTicketType {
  id: string;
  event_id: string;
  name: string;
  description: string;
  price: number;
  quota_total: number;
  quota_reserved: number;
  quota_sold: number;
  sales_start: string;
  sales_end: string;
  status: TicketTypeStatus;
}

export interface AppEvent {
  id: string; // e.g. "evt-business-expo"
  project_id?: string;
  title: string;
  description: string;
  organizer_unit: string;
  lead_organizer_user_id: string;
  poster_url: string;
  category: TicketCategory; // gratis | berbayar
  schedule_start: string;
  schedule_end: string;
  location: string;
  public_terms: string;
  visibility: "public" | "internal";
  status: EventStatus;
  qris_demo_image?: string;
}

export interface TicketReservation {
  id: string;
  event_id: string;
  ticket_type_id: string;
  participant_name: string;
  participant_nim: string;
  participant_email: string;
  participant_phone: string;
  participant_faculty: string;
  participant_study_program: string;
  amount: number;
  reservation_expires_at: string; // ISO (180s from creation)
  proof_file_name?: string;
  proof_submitted_at?: string;
  payment_status: PaymentStatus;
  registration_status: RegistrationStatus;
  created_at: string;
}

export interface IssuedTicket {
  id: string;
  reservation_id: string;
  event_id: string;
  ticket_type_id: string;
  ticket_token: string; // e.g. "DEMO-TKT-0001"
  participant_name: string;
  participant_nim: string;
  participant_email: string;
  issued_at: string;
  is_checked_in: boolean;
  checked_in_at?: string | null;
  check_in_operator_id?: string | null;
}

export interface CorrespondenceRequest {
  id: string; // e.g. "corr-demo-001"
  cabinet_id: string;
  submitter_user_id: string;
  submitter_name: string;
  unit_name: string;
  title: string;
  purpose: string;
  routing: CorrespondenceType;
  description: string;
  document_url: string;
  status: CorrespondenceStatus;
  checklist: { item: string; checked: boolean }[];
  reviewer_notes?: string;
  generated_letter_number?: string;
  issued_at?: string;
  ditmawa_status?: DitmawaDispatchStatus;
  ditmawa_notes?: string;
  reopen_reason?: string;
  created_at: string;
  updated_at: string;

  // Compatibility helper fields for action-center & legacy views
  subject?: string;
  requester_name?: string;
  destination?: string;
  reference_number_preview?: string;
  project_id?: string;
}

export interface FundRequest {
  id: string; // e.g. "fund-demo-001"
  cabinet_id: string;
  submitter_user_id: string;
  submitter_name: string;
  unit_name: string;
  project_id?: string;
  purpose: string;
  requested_amount: number;
  approved_amount?: number;
  items: { description: string; amount: number }[];
  proposal_url: string;
  status: FundRequestStatus;
  reviewer_notes?: string;
  tranches: {
    tranche_number: number;
    amount: number;
    disbursement_status: DisbursementStatus;
    transferred_at?: string;
    confirmed_at?: string;
  }[];
  created_at: string;
  updated_at: string;

  // Compatibility helper fields for action-center & legacy views
  title?: string;
  amount_requested?: number;
  requester_name?: string;
  disbursement_bank?: string;
  disbursement_account_number?: string;
  disbursement_status?: string;
}

export interface FinanceTransaction {
  id: string;
  cabinet_id: string;
  unit_id?: string;
  date: string;
  type: "income" | "expense" | "transfer";
  category: string;
  amount: number;
  description: string;
  source_account: string;
  destination_account?: string;
  status: "draft" | "posted";
  reference_id?: string;
}

export interface DocumentItem {
  id: string; // e.g. "doc-demo-001"
  cabinet_id: string;
  uploader_user_id: string;
  title: string;
  category: "Proposal" | "Surat" | "LPJ" | "Dokumentasi" | "Lainnya";
  file_or_url: string;
  version: number;
  status: "draft" | "active" | "archived";
  related_project_id?: string;
  created_at: string;
  updated_at: string;
}

export interface LPJItem {
  id: string; // e.g. "lpj-demo-001"
  project_id: string;
  cabinet_id: string;
  submitter_user_id: string;
  title: string;
  // 7 sections per DOC-05
  section_1_identity: string;
  section_2_summary: string;
  section_3_execution: string;
  section_4_attendance: string;
  section_5_finance: string;
  section_6_documentation: string;
  section_7_evaluation: string;
  status: LPJStatus;
  reviewer_user_id?: string;
  reviewer_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CadreBusiness {
  id: string; // e.g. "business-demo-001"
  owner_user_id: string;
  owner_name: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  products_services: string[];
  contact_public: string;
  social_links: { platform: string; url: string }[];
  review_status: BusinessReviewStatus;
  publication_status: BusinessPublicationStatus;
  reviewer_notes?: string;
  created_at: string;
}

export interface CompanyPartner {
  id: string; // e.g. "company-demo-001"
  name: string;
  category: "Sponsor" | "Mitra Strategis" | "Media Partner" | "Vendor";
  industry: string;
  official_contact: string;
  pic_private_name: string;
  pic_private_contact: string;
  relation_status: "Aktif" | "Penjajakan" | "Selesai";
  history_notes: { date: string; notes: string; project_name?: string }[];
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_url: string;
  category: string;
  author_name: string;
  status: "draft" | "review" | "published" | "archived";
  published_at?: string;
  created_at: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  level: "Nasional" | "Internasional" | "Regional" | "Universitas";
  year: string;
  description: string;
  linked_cadre_ids: string[]; // Support multi-cadre
  cadre_names: string[];
  documentation_url: string;
  status: "draft" | "review" | "published";
  published_at?: string;
}

export interface MedpartSubmission {
  id: string; // e.g. "medpart-demo-001"
  tracking_code: string; // e.g. "MP-DEMO-0001"
  applicant_name: string;
  organization: string;
  contact_email: string;
  contact_phone: string;
  event_name: string;
  package_type: "Gratis" | "Berbayar";
  package_name: string;
  amount: number;
  requested_publish_date: string;
  poster_url: string;
  payment_proof_url?: string;
  status: MedpartStatus;
  reviewer_notes?: string;
  published_at?: string;
  created_at: string;
}

export interface FeedbackItem {
  id: string; // e.g. "feedback-demo-001"
  category: "Aspirasi" | "Kritik" | "Saran" | "Pertanyaan";
  title: string;
  message: string;
  sender_name_optional?: string;
  sender_contact_optional?: string;
  receipt_code: string;
  status: FeedbackStatus;
  routed_to_unit?: string;
  followup_notes?: string;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id?: string; // If undefined, global/shared
  category: "correspondence" | "finance" | "event" | "task" | "lpj" | "cadre" | "cms" | "system";
  title: string;
  message: string;
  source_route: string;
  read: boolean;
  created_at: string;
}

export interface ActivityHistory {
  id: string;
  actor_name: string;
  action: string;
  target: string;
  module: string;
  timestamp: string;
}

export interface AuditEvent {
  id: string;
  actor_id: string;
  actor_name: string;
  action: string;
  resource_type: string;
  resource_id: string;
  before_state?: string;
  after_state?: string;
  timestamp: string;
}

// Full Store Structure
export interface MockStoreData {
  schema_version: string;
  current_user_id: string;
  users: User[];
  faculties: Faculty[];
  cabinets: Cabinet[];
  fields: Field[];
  compartments: Compartment[];
  projects: Project[];
  tasks: ProjectTask[];
  roster: RosterMember[];
  calendar_events?: CalendarEvent[];
  events: AppEvent[];
  ticket_types: EventTicketType[];
  reservations: TicketReservation[];
  tickets: IssuedTicket[];
  correspondence: CorrespondenceRequest[];
  fund_requests: FundRequest[];
  finance_transactions: FinanceTransaction[];
  documents: DocumentItem[];
  lpjs: LPJItem[];
  businesses: CadreBusiness[];
  companies: CompanyPartner[];
  articles: ArticleItem[];
  achievements: AchievementItem[];
  medpart_submissions: MedpartSubmission[];
  feedback: FeedbackItem[];
  notifications: AppNotification[];
  activity_history: ActivityHistory[];
  audit_events: AuditEvent[];
}
