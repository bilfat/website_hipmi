import {
  MockStoreData,
  User,
  Faculty,
  Cabinet,
  Field,
  Compartment,
  Project,
  RosterMember,
  ProjectTask,
  CalendarEvent,
  AppEvent,
  EventTicketType,
  TicketReservation,
  IssuedTicket,
  CorrespondenceRequest,
  FundRequest,
  FinanceTransaction,
  DocumentItem,
  LPJItem,
  CadreBusiness,
  CompanyPartner,
  ArticleItem,
  AchievementItem,
  MedpartSubmission,
  FeedbackItem,
  AppNotification,
  ActivityHistory,
  AuditEvent
} from "@/types/domain";

export const DEMO_PASSWORD = "HIPMI-Demo-2026!";

// ----------------------------------------------------------------------------
// 1. Faculties & Study Programs
// ----------------------------------------------------------------------------
export const seedFaculties: Faculty[] = [
  {
    id: "fac-fit",
    code: "FIT",
    name: "Fakultas Ilmu Terapan",
    study_programs: [
      { id: "sp-d3si", name: "D3 Sistem Informasi" },
      { id: "sp-d3tk", name: "D3 Teknologi Komputer" },
      { id: "sp-d3tt", name: "D3 Teknik Telekomunikasi" },
      { id: "sp-d4rpla", name: "D4 Rekayasa Perangkat Lunak Aplikasi" }
    ]
  },
  {
    id: "fac-fri",
    code: "FRI",
    name: "Fakultas Rekayasa Industri",
    study_programs: [
      { id: "sp-s1ti", name: "S1 Teknik Industri" },
      { id: "sp-s1si", name: "S1 Sistem Informasi" }
    ]
  },
  {
    id: "fac-fte",
    code: "FTE",
    name: "Fakultas Teknik Elektro",
    study_programs: [
      { id: "sp-s1te", name: "S1 Teknik Elektro" },
      { id: "sp-s1tt", name: "S1 Teknik Telekomunikasi" }
    ]
  },
  {
    id: "fac-fif",
    code: "FIF",
    name: "Fakultas Informatika",
    study_programs: [
      { id: "sp-s1if", name: "S1 Informatika" },
      { id: "sp-s1ds", name: "S1 Sains Data" }
    ]
  },
  {
    id: "fac-feb",
    code: "FEB",
    name: "Fakultas Ekonomi dan Bisnis",
    study_programs: [
      { id: "sp-s1mb", name: "S1 Manajemen Bisnis Telekomunikasi & Informatika" },
      { id: "sp-s1ak", name: "S1 Akuntansi" }
    ]
  },
  {
    id: "fac-fkb",
    code: "FKB",
    name: "Fakultas Komunikasi dan Bisnis",
    study_programs: [
      { id: "sp-s1ik", name: "S1 Ilmu Komunikasi" },
      { id: "sp-s1ad", name: "S1 Administrasi Bisnis" }
    ]
  },
  {
    id: "fac-fik",
    code: "FIK",
    name: "Fakultas Industri Kreatif",
    study_programs: [
      { id: "sp-s1dkv", name: "S1 Desain Komunikasi Visual" },
      { id: "sp-s1di", name: "S1 Desain Interior" }
    ]
  }
];

// ----------------------------------------------------------------------------
// 2. 28 Demo Users (DEMO-01 to DEMO-28)
// ----------------------------------------------------------------------------
export const seedUsers: User[] = [
  {
    id: "usr-demo-01",
    demo_id: "DEMO-01",
    name: "Raka Pratama",
    email: "demo.mahasiswa@example.test",
    nim: "DEMO-2026-001",
    phone: "081200000001",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-01.jpg",
    account_status: "active",
    cadre_status: "not_verified",
    base_role: "mahasiswa",
    additional_permissions: [],
    created_at: "2026-09-01T08:00:00Z"
  },
  {
    id: "usr-demo-02",
    demo_id: "DEMO-02",
    name: "Nabila Putri",
    email: "demo.kader@example.test",
    nim: "DEMO-2026-002",
    phone: "081200000002",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-02.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "kader",
    additional_permissions: ["cadre:profile"],
    created_at: "2026-08-15T09:00:00Z"
  },
  {
    id: "usr-demo-03",
    demo_id: "DEMO-03",
    name: "Dimas Wicaksono",
    email: "demo.anggota@example.test",
    nim: "DEMO-2026-003",
    phone: "081200000003",
    faculty_id: "fac-fit",
    study_program_id: "sp-d3si",
    avatar_url: "/assets/demo/avatars/usr-03.jpg",
    account_status: "active",
    cadre_status: "not_verified",
    base_role: "mahasiswa",
    additional_permissions: [],
    created_at: "2026-09-10T10:00:00Z"
  },
  {
    id: "usr-demo-04",
    demo_id: "DEMO-04",
    name: "Fajar Ramadhan",
    email: "demo.pengelola@example.test",
    nim: "DEMO-2026-004",
    phone: "081200000004",
    faculty_id: "fac-fri",
    study_program_id: "sp-s1ti",
    avatar_url: "/assets/demo/avatars/usr-04.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["project:manage_assigned", "task:manage"],
    created_at: "2026-08-01T11:00:00Z"
  },
  {
    id: "usr-demo-05",
    demo_id: "DEMO-05",
    name: "Alya Safitri",
    email: "demo.staff.basic@example.test",
    nim: "DEMO-2026-005",
    phone: "081200000005",
    faculty_id: "fac-fif",
    study_program_id: "sp-s1if",
    avatar_url: "/assets/demo/avatars/usr-05.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: [],
    created_at: "2026-08-20T08:30:00Z"
  },
  {
    id: "usr-demo-06",
    demo_id: "DEMO-06",
    name: "Bima Saputra",
    email: "demo.staff.surat@example.test",
    nim: "DEMO-2026-006",
    phone: "081200000006",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ik",
    avatar_url: "/assets/demo/avatars/usr-06.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["correspondence:create"],
    created_at: "2026-08-20T09:00:00Z"
  },
  {
    id: "usr-demo-07",
    demo_id: "DEMO-07",
    name: "Citra Maharani",
    email: "demo.staff.finance@example.test",
    nim: "DEMO-2026-007",
    phone: "081200000007",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1ak",
    avatar_url: "/assets/demo/avatars/usr-07.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["finance:create", "fund_request:create"],
    created_at: "2026-08-20T09:30:00Z"
  },
  {
    id: "usr-demo-08",
    demo_id: "DEMO-08",
    name: "Gita Permata",
    email: "demo.kakom@example.test",
    nim: "DEMO-2026-008",
    phone: "081200000008",
    faculty_id: "fac-fri",
    study_program_id: "sp-s1si",
    avatar_url: "/assets/demo/avatars/usr-08.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "kakom",
    additional_permissions: ["project:create", "roster:manage", "manager:assign", "project:close"],
    created_at: "2026-07-15T10:00:00Z"
  },
  {
    id: "usr-demo-09",
    demo_id: "DEMO-09",
    name: "Arif Nugraha",
    email: "demo.kabid@example.test",
    nim: "DEMO-2026-009",
    phone: "081200000009",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-09.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "kabid",
    additional_permissions: ["field:manage", "workspace:monitor"],
    created_at: "2026-07-10T10:00:00Z"
  },
  {
    id: "usr-demo-10",
    demo_id: "DEMO-10",
    name: "Ketua Umum Demo",
    email: "demo.ketum@example.test",
    nim: "DEMO-2026-010",
    phone: "081200000010",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-10.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "ketum",
    additional_permissions: ["org:monitor_full"],
    created_at: "2026-07-01T08:00:00Z"
  },
  {
    id: "usr-demo-11",
    demo_id: "DEMO-11",
    name: "Wakil Ketua Umum Demo",
    email: "demo.waketum@example.test",
    nim: "DEMO-2026-011",
    phone: "081200000011",
    faculty_id: "fac-fri",
    study_program_id: "sp-s1ti",
    avatar_url: "/assets/demo/avatars/usr-11.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "waketum",
    additional_permissions: ["org:monitor_full"],
    created_at: "2026-07-01T08:30:00Z"
  },
  {
    id: "usr-demo-12",
    demo_id: "DEMO-12",
    name: "Sekretaris Jenderal Demo",
    email: "demo.sekjen@example.test",
    nim: "DEMO-2026-012",
    phone: "081200000012",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ad",
    avatar_url: "/assets/demo/avatars/usr-12.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "sekjen",
    additional_permissions: ["org:monitor_full"],
    created_at: "2026-07-01T09:00:00Z"
  },
  {
    id: "usr-demo-13",
    demo_id: "DEMO-13",
    name: "Sekretaris Umum Demo",
    email: "demo.sekum@example.test",
    nim: "DEMO-2026-013",
    phone: "081200000013",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ik",
    avatar_url: "/assets/demo/avatars/usr-13.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "sekum",
    additional_permissions: [
      "correspondence:review",
      "correspondence:complete",
      "correspondence:reopen",
      "letter:number",
      "ditmawa:manage"
    ],
    created_at: "2026-07-01T09:30:00Z"
  },
  {
    id: "usr-demo-14",
    demo_id: "DEMO-14",
    name: "Bendahara Umum Demo",
    email: "demo.bendum@example.test",
    nim: "DEMO-2026-014",
    phone: "081200000014",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1ak",
    avatar_url: "/assets/demo/avatars/usr-14.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "bendum",
    additional_permissions: [
      "finance:review",
      "finance:approve",
      "finance:disburse",
      "finance:monitor"
    ],
    created_at: "2026-07-01T10:00:00Z"
  },
  {
    id: "usr-demo-15",
    demo_id: "DEMO-15",
    name: "Organizer Demo",
    email: "demo.organizer@example.test",
    nim: "DEMO-2026-015",
    phone: "081200000015",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-15.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["event:manage", "payment:verify", "ticket:deliver"],
    created_at: "2026-08-01T12:00:00Z"
  },
  {
    id: "usr-demo-16",
    demo_id: "DEMO-16",
    name: "Check-in Staff Demo",
    email: "demo.checkin@example.test",
    nim: "DEMO-2026-016",
    phone: "081200000016",
    faculty_id: "fac-fif",
    study_program_id: "sp-s1ds",
    avatar_url: "/assets/demo/avatars/usr-16.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["attendance:scan", "attendance:manual"],
    created_at: "2026-08-01T12:30:00Z"
  },
  {
    id: "usr-demo-17",
    demo_id: "DEMO-17",
    name: "Medkom Demo",
    email: "demo.medkom@example.test",
    nim: "DEMO-2026-017",
    phone: "081200000017",
    faculty_id: "fac-fik",
    study_program_id: "sp-s1dkv",
    avatar_url: "/assets/demo/avatars/usr-17.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["medpart:review", "medpart:payment_verify", "medpart:publish_manual"],
    created_at: "2026-08-05T13:00:00Z"
  },
  {
    id: "usr-demo-18",
    demo_id: "DEMO-18",
    name: "Content Creator Demo",
    email: "demo.editor@example.test",
    nim: "DEMO-2026-018",
    phone: "081200000018",
    faculty_id: "fac-fik",
    study_program_id: "sp-s1dkv",
    avatar_url: "/assets/demo/avatars/usr-18.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["content_creator"],
    created_at: "2026-08-10T14:00:00Z"
  },
  {
    id: "usr-demo-19",
    demo_id: "DEMO-19",
    name: "Publisher Demo",
    email: "demo.publisher@example.test",
    nim: "DEMO-2026-019",
    phone: "081200000019",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ik",
    avatar_url: "/assets/demo/avatars/usr-19.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["publisher"],
    created_at: "2026-08-10T14:30:00Z"
  },
  {
    id: "usr-demo-20",
    demo_id: "DEMO-20",
    name: "Editor + Publisher Demo",
    email: "demo.editorpublisher@example.test",
    nim: "DEMO-2026-020",
    phone: "081200000020",
    faculty_id: "fac-fik",
    study_program_id: "sp-s1dkv",
    avatar_url: "/assets/demo/avatars/usr-20.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["content_creator", "publisher"],
    created_at: "2026-08-10T15:00:00Z"
  },
  {
    id: "usr-demo-21",
    demo_id: "DEMO-21",
    name: "PSDM Demo",
    email: "demo.psdm@example.test",
    nim: "DEMO-2026-021",
    phone: "081200000021",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-21.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["cadre:manage", "cadre:verify"],
    created_at: "2026-08-12T11:00:00Z"
  },
  {
    id: "usr-demo-22",
    demo_id: "DEMO-22",
    name: "Partnership Demo",
    email: "demo.partnership@example.test",
    nim: "DEMO-2026-022",
    phone: "081200000022",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ad",
    avatar_url: "/assets/demo/avatars/usr-22.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["partnership:read", "partnership:manage"],
    created_at: "2026-08-12T11:30:00Z"
  },
  {
    id: "usr-demo-23",
    demo_id: "DEMO-23",
    name: "Feedback Operator Demo",
    email: "demo.feedback@example.test",
    nim: "DEMO-2026-023",
    phone: "081200000023",
    faculty_id: "fac-fkb",
    study_program_id: "sp-s1ik",
    avatar_url: "/assets/demo/avatars/usr-23.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["feedback:triage", "feedback:route", "feedback:close"],
    created_at: "2026-08-15T16:00:00Z"
  },
  {
    id: "usr-demo-24",
    demo_id: "DEMO-24",
    name: "LPJ Reviewer Demo",
    email: "demo.lpjreviewer@example.test",
    nim: "DEMO-2026-024",
    phone: "081200000024",
    faculty_id: "fac-fri",
    study_program_id: "sp-s1ti",
    avatar_url: "/assets/demo/avatars/usr-24.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["lpj:review"],
    created_at: "2026-08-15T16:30:00Z"
  },
  {
    id: "usr-demo-25",
    demo_id: "DEMO-25",
    name: "Admin Sistem Demo",
    email: "demo.admin@example.test",
    nim: null,
    phone: "081200000025",
    faculty_id: "fac-fif",
    study_program_id: "sp-s1if",
    avatar_url: "/assets/demo/avatars/usr-25.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "system_admin",
    additional_permissions: ["system:superadmin"],
    created_at: "2026-06-01T00:00:00Z"
  },
  {
    id: "usr-demo-26",
    demo_id: "DEMO-26",
    name: "Multi-Assignment Demo",
    email: "demo.multirole@example.test",
    nim: "DEMO-2026-026",
    phone: "081200000026",
    faculty_id: "fac-fri",
    study_program_id: "sp-s1ti",
    avatar_url: "/assets/demo/avatars/usr-26.jpg",
    account_status: "active",
    cadre_status: "verified",
    base_role: "staff",
    additional_permissions: ["project:manage_assigned", "content_creator"],
    created_at: "2026-08-01T10:00:00Z"
  },
  {
    id: "usr-demo-27",
    demo_id: "DEMO-27",
    name: "Akun Belum Verifikasi",
    email: "demo.pending@example.test",
    nim: "DEMO-2026-027",
    phone: "081200000027",
    faculty_id: "fac-fit",
    study_program_id: "sp-d3si",
    avatar_url: "/assets/demo/avatars/usr-27.jpg",
    account_status: "verification_pending",
    cadre_status: "not_verified",
    base_role: "mahasiswa",
    additional_permissions: [],
    created_at: "2026-11-10T12:00:00Z"
  },
  {
    id: "usr-demo-28",
    demo_id: "DEMO-28",
    name: "Akun Ditangguhkan",
    email: "demo.suspended@example.test",
    nim: "DEMO-2026-028",
    phone: "081200000028",
    faculty_id: "fac-feb",
    study_program_id: "sp-s1mb",
    avatar_url: "/assets/demo/avatars/usr-28.jpg",
    account_status: "suspended",
    cadre_status: "not_verified",
    base_role: "mahasiswa",
    additional_permissions: [],
    created_at: "2026-07-20T12:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 3. Cabinets
// ----------------------------------------------------------------------------
export const seedCabinets: Cabinet[] = [
  {
    id: "cab-arthakarsa-2627",
    name: "ARTHAKARSA 2026/2027",
    logo: "/assets/logo/hipmi.png",
    philosophy: "Artha melambangkan kemakmuran dan nilai ekonomi; Karsa melambangkan tekad kuat, kehendak luhur, dan aksi nyata dalam memajukan wirausaha muda Telkom University.",
    vision: "Mewujudkan HIPMI PT Universitas Telkom sebagai episentrum pengusaha muda berdaya saing global, berintegritas tinggi, dan berkontribusi nyata pada ekosistem ekonomi digital nusantara.",
    mission: [
      "Mengakselerasi pembinaan kader wirausaha melalui kurikulum praktikal dan inkubasi kolaboratif.",
      "Membangun jejaring sinergis dengan korporasi, investor, dan alumni HIPMI se-Indonesia.",
      "Mengembangkan platform digital HIPMI CENTRAL sebagai pusat operasional dan etalase karya kader.",
      "Menumbuhkan kepekaan sosial dan etika bisnis yang berkelanjutan bagi seluruh anggota."
    ],
    period_start: "2026-07-01",
    period_end: "2027-06-30",
    status: "active"
  },
  {
    id: "cab-demo-2526",
    name: "Kabinet Contoh 2025/2026",
    logo: "/assets/logo/hipmi.png",
    philosophy: "Kabinet perintis fondasi kolaborasi intra-kampus.",
    vision: "Fondasi kokoh sinergi wirausaha kampus.",
    mission: [
      "Meningkatkan literasi finansial mahasiswa.",
      "Menyelenggarakan pameran wirausaha kampus perdana."
    ],
    period_start: "2025-07-01",
    period_end: "2026-06-30",
    status: "archived"
  }
];

// ----------------------------------------------------------------------------
// 4. Fields (4 Bidang)
// ----------------------------------------------------------------------------
export const seedFields: Field[] = [
  {
    id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Bidang 1: Organisasi & Kaderisasi",
    code: "B-01",
    leader_name: "Arif Nugraha",
    leader_user_id: "usr-demo-09",
    description: "Bertanggung jawab atas manajemen internal organisasi, regenerasi kader, dan tata kelola keanggotaan.",
    icon_path: "/assets/logo/hipmi.png"
  },
  {
    id: "field-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Bidang 2: Ekonomi Kreatif & Usaha",
    code: "B-02",
    leader_name: "Rizky Fauzi",
    leader_user_id: "usr-demo-04",
    description: "Mengembangkan inkubasi bisnis kader, kemandirian finansial, dan program expo komersial.",
    icon_path: "/assets/logo/hipmi.png"
  },
  {
    id: "field-demo-03",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Bidang 3: Hubungan Eksternal & Kerjasama",
    code: "B-03",
    leader_name: "Dian Anggraini",
    leader_user_id: "usr-demo-22",
    description: "Menjalin kemitraan strategis bersama universitas, korporasi mitra, serta HIPMI BPC/BPD.",
    icon_path: "/assets/logo/hipmi.png"
  },
  {
    id: "field-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Bidang 4: Media, Komunikasi & Informasi",
    code: "B-04",
    leader_name: "Kevin Sanjaya",
    leader_user_id: "usr-demo-17",
    description: "Mengelola publikasi, etalase digital, media partner, serta hubungan pers dan masyarakat.",
    icon_path: "/assets/logo/hipmi.png"
  }
];

// ----------------------------------------------------------------------------
// 5. Compartments (8 Kompartemen)
// ----------------------------------------------------------------------------
export const seedCompartments: Compartment[] = [
  {
    id: "comp-demo-01",
    field_id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Kaderisasi",
    code: "K-01",
    leader_name: "Gita Permata",
    leader_user_id: "usr-demo-08",
    description: "Pengembangan dan pembinaan kader wirausaha baru serta evaluasi keanggotaan."
  },
  {
    id: "comp-demo-02",
    field_id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Riset & Tata Kelola",
    code: "K-02",
    leader_name: "Hendra Wijaya",
    leader_user_id: "usr-demo-21",
    description: "Standardisasi SOP organisasi dan riset tren kewirausahaan kampus."
  },
  {
    id: "comp-demo-03",
    field_id: "field-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Inkubasi Bisnis",
    code: "K-03",
    leader_name: "Maya Novita",
    leader_user_id: "usr-demo-04",
    description: "Pendampingan usaha kader pemula melalui workshop, mentorship, dan akses modal."
  },
  {
    id: "comp-demo-04",
    field_id: "field-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Akselerasi Usaha",
    code: "K-04",
    leader_name: "Doni Kurniawan",
    leader_user_id: "usr-demo-26",
    description: "Akselerasi pasar dan scaling up usaha kader mature menuju skala regional."
  },
  {
    id: "comp-demo-05",
    field_id: "field-demo-03",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Hubungan Kelembagaan",
    code: "K-05",
    leader_name: "Anisa Rahma",
    leader_user_id: "usr-demo-22",
    description: "Sinergi dengan Ditmawa, rektorat, ormawa kampus, dan BPC/BPD HIPMI."
  },
  {
    id: "comp-demo-06",
    field_id: "field-demo-03",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Kemitraan Strategis",
    code: "K-06",
    leader_name: "Budi Santoso",
    leader_user_id: "usr-demo-22",
    description: "Hubungan sponsorship, korporasi swasta, BUMN, dan jejaring investor."
  },
  {
    id: "comp-demo-07",
    field_id: "field-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Media & Publikasi",
    code: "K-07",
    leader_name: "Sarah Amanda",
    leader_user_id: "usr-demo-17",
    description: "Produksi konten visual, siaran pers, pengelolaan media sosial, dan portal web."
  },
  {
    id: "comp-demo-08",
    field_id: "field-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Kompartemen Teknologi Informasi",
    code: "K-08",
    leader_name: "Farhan Hakim",
    leader_user_id: "usr-demo-20",
    description: "Pengembangan sistem digital, database organisasi, dan pemeliharaan HIPMI CENTRAL."
  }
];

// ----------------------------------------------------------------------------
// 6. Projects (8 Proker)
// ----------------------------------------------------------------------------
export const seedProjects: Project[] = [
  {
    id: "proj-business-expo",
    compartment_id: "comp-demo-01",
    field_id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "HIPMI Business Expo 2026",
    purpose: "Pameran wirausaha mahasiswa terbesar di Telkom University untuk mengenalkan produk kader ke pasar luas.",
    description: "Menampilkan 40+ tenant bisnis kreatif kader HIPMI, sesi pitching investor, dan live business showcase.",
    start_date: "2026-10-01",
    main_event_date: "2026-12-15",
    target_date: "2026-12-20",
    hide_main_event_date_public: false,
    location: "Gedung Serba Guna Telkom University & Open Hall",
    logo_url: "/assets/demo/projects/expo.png",
    operational_status: "ongoing",
    publication_status: "published",
    managers: [
      {
        user_id: "usr-demo-04",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-10-01T08:00:00Z",
        status: "active"
      },
      {
        user_id: "usr-demo-26",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-10-01T08:00:00Z",
        status: "active"
      }
    ],
    progress_notes: [
      {
        id: "pn-01",
        stage: "Fase 1: Persiapan & Open Recruitment Tenant",
        achievements: "Pendaftaran tenant berhasil menjaring 45 pendaftar bisnis kader.",
        obstacles: "Konfirmasi venue GSG sempat tertunda administrasi.",
        plans: "Finalisasi layout booth dan technical meeting tenant.",
        created_at: "2026-10-20T10:00:00Z"
      },
      {
        id: "pn-02",
        stage: "Fase 2: Promosi & Penjualan Tiket",
        achievements: "Tiket presale batch 1 terjual 80%. Sponsorship utama telah menandatangani MoU.",
        obstacles: "Alur verifikasi pembayaran membutuhkan review manual berkala.",
        plans: "Buka penjualan reguler dan koordinasi pengamanan panggung.",
        created_at: "2026-11-10T14:30:00Z"
      }
    ]
  },
  {
    id: "proj-company-visit",
    compartment_id: "comp-demo-01",
    field_id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Company Visit Demo 2026",
    purpose: "Kunjungan industri untuk mempelajari tata kelola startup teknologi unicorn.",
    description: "Kunjungan eksklusif 35 mahasiswa ke kantor pusat unicorn Jakarta.",
    start_date: "2026-11-01",
    main_event_date: "2026-12-20",
    target_date: "2026-12-25",
    hide_main_event_date_public: false,
    location: "Jakarta Tech Hub",
    operational_status: "planned",
    publication_status: "published",
    managers: [],
    progress_notes: []
  },
  {
    id: "proj-cadre-training",
    compartment_id: "comp-demo-02",
    field_id: "field-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Cadre Training & Leadership Demo",
    purpose: "Pelatihan kepemimpinan dan nilai dasar kader HIPMI Telkom.",
    description: "Diklat intensif 2 hari 1 malam bagi calon kader baru.",
    start_date: "2026-12-01",
    main_event_date: "2027-01-10",
    target_date: "2027-01-15",
    hide_main_event_date_public: true,
    location: "Auditorium FIT Telkom University",
    operational_status: "draft",
    publication_status: "unpublished",
    managers: [],
    progress_notes: []
  },
  {
    id: "proj-workshop",
    compartment_id: "comp-demo-03",
    field_id: "field-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Workshop Kewirausahaan Digital Demo",
    purpose: "Membekali mahasiswa dengan kemampuan validasi ide bisnis berbasis digital.",
    description: "Workshop hands-on gratis dengan mentor praktisi industri startup.",
    start_date: "2026-10-15",
    main_event_date: "2026-12-05",
    target_date: "2026-12-08",
    hide_main_event_date_public: false,
    location: "Coworking Space Telkom Landmark Tower & Zoom",
    logo_url: "/assets/demo/projects/workshop.png",
    operational_status: "ongoing",
    publication_status: "published",
    managers: [
      {
        user_id: "usr-demo-04",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-10-15T09:00:00Z",
        status: "active"
      },
      {
        user_id: "usr-demo-26",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-10-15T09:00:00Z",
        status: "active"
      }
    ],
    progress_notes: [
      {
        id: "pn-03",
        stage: "Fase Kurikulum & Pemateri",
        achievements: "Pemateri dari alumni HIPMI terkonfirmasi.",
        obstacles: "Peminat melebihi kapasitas ruangan offline.",
        plans: "Buka opsi hybrid online via Zoom.",
        created_at: "2026-11-05T10:00:00Z"
      }
    ]
  },
  {
    id: "proj-campus-day",
    compartment_id: "comp-demo-04",
    field_id: "field-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Campus Business Day Demo",
    purpose: "Bazar kilat dan seminar bisnis di pelataran fakultas.",
    description: "Kegiatan pop-up store produk mahasiswa bersamaan dengan seminar mini.",
    start_date: "2026-11-15",
    main_event_date: "2026-12-12",
    target_date: "2026-12-14",
    hide_main_event_date_public: false,
    location: "Plaza Fakultas Ekonomi & Bisnis",
    operational_status: "planned",
    publication_status: "published",
    managers: [
      {
        user_id: "usr-demo-04",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-11-15T08:00:00Z",
        status: "active"
      }
    ],
    progress_notes: []
  },
  {
    id: "proj-collab-festival",
    compartment_id: "comp-demo-05",
    field_id: "field-demo-03",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Collaboration Festival Demo",
    purpose: "Festival kolaborasi multi-organisasi mahasiswa wirausaha se-Bandung Raya.",
    description: "Networking dinner, forum diskusi pemuda, dan pentas musik apresiasi karya muda.",
    start_date: "2026-09-01",
    main_event_date: "2026-11-01",
    target_date: "2026-11-05",
    hide_main_event_date_public: false,
    location: "Amphitheater Telkom University",
    operational_status: "completed",
    publication_status: "published",
    managers: [
      {
        user_id: "usr-demo-26",
        assigned_by: "usr-demo-08",
        assigned_at: "2026-09-01T08:00:00Z",
        status: "ended"
      }
    ],
    progress_notes: [
      {
        id: "pn-04",
        stage: "Pasca Acara",
        achievements: "Dihadiri 600+ peserta dan 15 ormawa mitra se-Bandung.",
        obstacles: "Penyusunan LPJ memerlukan waktu konsolidasi bukti nota.",
        plans: "Pengajuan LPJ dan penyelesaian administrasi sponsorship.",
        created_at: "2026-11-06T15:00:00Z"
      }
    ]
  },
  {
    id: "proj-market-day",
    compartment_id: "comp-demo-07",
    field_id: "field-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Market Day Demo",
    purpose: "Program uji pasar berkala semester ganjil.",
    description: "Kegiatan rutin penjualan produk olahan pangan dan apparel karya mahasiswa.",
    start_date: "2026-08-15",
    main_event_date: "2026-10-01",
    target_date: "2026-10-05",
    hide_main_event_date_public: false,
    location: "Kantin Asrama Telkom University",
    operational_status: "archived",
    publication_status: "published",
    managers: [],
    progress_notes: []
  },
  {
    id: "proj-leadership-class",
    compartment_id: "comp-demo-08",
    field_id: "field-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    name: "Leadership Class Demo",
    purpose: "Kelas daring kepemimpinan organisasi.",
    description: "Dibatalkan karena jadwal bentrok dengan kalender ujian tengah semester.",
    start_date: "2026-09-20",
    main_event_date: "2026-10-15",
    target_date: "2026-10-20",
    hide_main_event_date_public: true,
    location: "Online",
    operational_status: "cancelled",
    publication_status: "unpublished",
    managers: [],
    progress_notes: []
  }
];

// ----------------------------------------------------------------------------
// 7. Roster Members (24 Fixtures)
// ----------------------------------------------------------------------------
export const seedRoster: RosterMember[] = [
  {
    id: "member-demo-001",
    project_id: "proj-business-expo",
    user_id: "usr-demo-04",
    name: "Fajar Ramadhan",
    nim: "DEMO-2026-004",
    role_title: "Project Leader / Manager",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-01"
  },
  {
    id: "member-demo-002",
    project_id: "proj-business-expo",
    user_id: "usr-demo-26",
    name: "Multi-Assignment Demo",
    nim: "DEMO-2026-026",
    role_title: "Co-Project Leader",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-01"
  },
  {
    id: "member-demo-003",
    project_id: "proj-business-expo",
    user_id: "usr-demo-03",
    name: "Dimas Wicaksono",
    nim: "DEMO-2026-003",
    role_title: "Staff Divisi Acara",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-10-05"
  },
  {
    id: "member-demo-004",
    project_id: "proj-business-expo",
    user_id: null,
    name: "Anggota Demo 04",
    nim: "DEMO-2026-099",
    role_title: "Staff Logistik & Booth",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-10-05"
  },
  {
    id: "member-demo-005",
    project_id: "proj-workshop",
    user_id: "usr-demo-04",
    name: "Fajar Ramadhan",
    nim: "DEMO-2026-004",
    role_title: "Project Director",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-15"
  },
  {
    id: "member-demo-006",
    project_id: "proj-workshop",
    user_id: "usr-demo-26",
    name: "Multi-Assignment Demo",
    nim: "DEMO-2026-026",
    role_title: "Operational Manager",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-15"
  },
  {
    id: "member-demo-007",
    project_id: "proj-workshop",
    user_id: "usr-demo-05",
    name: "Alya Safitri",
    nim: "DEMO-2026-005",
    role_title: "Staff Registrasi & Peserta",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-16"
  },
  {
    id: "member-demo-008",
    project_id: "proj-campus-day",
    user_id: "usr-demo-04",
    name: "Fajar Ramadhan",
    nim: "DEMO-2026-004",
    role_title: "Koordinator Utama",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-11-15"
  },
  {
    id: "member-demo-009",
    project_id: "proj-campus-day",
    user_id: "usr-demo-06",
    name: "Bima Saputra",
    nim: "DEMO-2026-006",
    role_title: "Staff Humas & Perizinan",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-11-16"
  },
  {
    id: "member-demo-010",
    project_id: "proj-collab-festival",
    user_id: "usr-demo-26",
    name: "Multi-Assignment Demo",
    nim: "DEMO-2026-026",
    role_title: "Festival Director",
    access_level: "Manager",
    status: "ended",
    is_cadre: true,
    joined_at: "2026-09-01",
    ended_at: "2026-11-05"
  },
  {
    id: "member-demo-011",
    project_id: "proj-collab-festival",
    user_id: "usr-demo-07",
    name: "Citra Maharani",
    nim: "DEMO-2026-007",
    role_title: "Bendahara Pelaksana",
    access_level: "Member",
    status: "ended",
    is_cadre: true,
    joined_at: "2026-09-01",
    ended_at: "2026-11-05"
  },
  {
    id: "member-demo-012",
    project_id: "proj-company-visit",
    user_id: "usr-demo-02",
    name: "Nabila Putri",
    nim: "DEMO-2026-002",
    role_title: "Staff Liason Officer",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-11-05"
  },
  {
    id: "member-demo-013",
    project_id: "proj-company-visit",
    user_id: null,
    name: "Rizky Santoso",
    nim: "DEMO-2026-031",
    role_title: "Staff Transportasi",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-11-05"
  },
  {
    id: "member-demo-014",
    project_id: "proj-cadre-training",
    user_id: "usr-demo-21",
    name: "PSDM Demo",
    nim: "DEMO-2026-021",
    role_title: "Master of Training",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-12-01"
  },
  {
    id: "member-demo-015",
    project_id: "proj-cadre-training",
    user_id: "usr-demo-08",
    name: "Gita Permata",
    nim: "DEMO-2026-008",
    role_title: "Penanggung Jawab Kompartemen",
    access_level: "Manager",
    status: "active",
    is_cadre: true,
    joined_at: "2026-12-01"
  },
  {
    id: "member-demo-016",
    project_id: "proj-market-day",
    user_id: null,
    name: "Bayu Aji",
    nim: "DEMO-2026-032",
    role_title: "PIC Lapangan",
    access_level: "Member",
    status: "ended",
    is_cadre: false,
    joined_at: "2026-08-15",
    ended_at: "2026-10-05"
  },
  {
    id: "member-demo-017",
    project_id: "proj-leadership-class",
    user_id: "usr-demo-18",
    name: "Content Creator Demo",
    nim: "DEMO-2026-018",
    role_title: "Desainer Publikasi",
    access_level: "Member",
    status: "ended",
    is_cadre: true,
    joined_at: "2026-09-20",
    ended_at: "2026-10-15"
  },
  {
    id: "member-demo-018",
    project_id: "proj-business-expo",
    user_id: "usr-demo-15",
    name: "Organizer Demo",
    nim: "DEMO-2026-015",
    role_title: "Divisi Ticketing & Gate",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-01"
  },
  {
    id: "member-demo-019",
    project_id: "proj-business-expo",
    user_id: "usr-demo-16",
    name: "Check-in Staff Demo",
    nim: "DEMO-2026-016",
    role_title: "Staff Scanner Tiket",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-01"
  },
  {
    id: "member-demo-020",
    project_id: "proj-business-expo",
    user_id: "usr-demo-17",
    name: "Medkom Demo",
    nim: "DEMO-2026-017",
    role_title: "Koordinator Publikasi Media",
    access_level: "Member",
    status: "active",
    is_cadre: true,
    joined_at: "2026-10-01"
  },
  {
    id: "member-demo-021",
    project_id: "proj-business-expo",
    user_id: null,
    name: "Tegar Nugroho",
    nim: "DEMO-2026-033",
    role_title: "Staff Konsumsi Tenant",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-10-10"
  },
  {
    id: "member-demo-022",
    project_id: "proj-workshop",
    user_id: null,
    name: "Indah Permatasari",
    nim: "DEMO-2026-034",
    role_title: "Notulen & Dokumentasi",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-10-18"
  },
  {
    id: "member-demo-023",
    project_id: "proj-campus-day",
    user_id: null,
    name: "Faris Ramli",
    nim: "DEMO-2026-035",
    role_title: "Staff Listrik & Sound",
    access_level: "Member",
    status: "active",
    is_cadre: false,
    joined_at: "2026-11-18"
  },
  {
    id: "member-demo-024",
    project_id: "proj-collab-festival",
    user_id: null,
    name: "Dewi Lestari",
    nim: "DEMO-2026-036",
    role_title: "Staff Stage Management",
    access_level: "Member",
    status: "ended",
    is_cadre: false,
    joined_at: "2026-09-05",
    ended_at: "2026-11-05"
  }
];

// ----------------------------------------------------------------------------
// 8. Project Tasks (12 Tasks: 3 To Do, 3 In Progress, 3 Blocked, 3 Done)
// Strictly NO individual PIC / assignee per rules
// ----------------------------------------------------------------------------
export const seedTasks: ProjectTask[] = [
  {
    id: "task-demo-01",
    project_id: "proj-business-expo",
    title: "Finalisasi Desain Denah Booth & Arus Pengunjung",
    description: "Menyusun peta lantai pameran untuk 40 tenant, panggung utama, dan pintu darurat sesuai regulasi gedung.",
    status: "To Do",
    created_at: "2026-11-10T08:00:00Z",
    updated_at: "2026-11-10T08:00:00Z"
  },
  {
    id: "task-demo-02",
    project_id: "proj-business-expo",
    title: "Pencetakan Id Card & Goodie Bag Tenant",
    description: "Kirim desain ke vendor percetakan dan konfirmasi sampel bahan lanyard dan tas ramah lingkungan.",
    status: "To Do",
    created_at: "2026-11-11T09:00:00Z",
    updated_at: "2026-11-11T09:00:00Z"
  },
  {
    id: "task-demo-03",
    project_id: "proj-workshop",
    title: "Uji Coba Tautan Streaming & Room Zoom Webinar",
    description: "Persiapan akun Zoom berkapasitas 500 audiens dan pengecekan breakout room untuk sesi mentoring.",
    status: "To Do",
    created_at: "2026-11-12T10:00:00Z",
    updated_at: "2026-11-12T10:00:00Z"
  },
  {
    id: "task-demo-04",
    project_id: "proj-business-expo",
    title: "Verifikasi Pembayaran Tiket VIP & Regular Batch 1",
    description: "Memeriksa mutasi rekening dan bukti transfer yang diunggah peserta melalui sistem registrasi.",
    status: "In Progress",
    created_at: "2026-11-08T11:00:00Z",
    updated_at: "2026-11-15T16:00:00Z"
  },
  {
    id: "task-demo-05",
    project_id: "proj-business-expo",
    title: "Pengadaan Genset Cadangan & Instalasi Listrik GSG",
    description: "Koordinasi bersama pengelola sarana prasarana kampus untuk penambahan daya 15.000 watt.",
    status: "In Progress",
    created_at: "2026-11-09T13:00:00Z",
    updated_at: "2026-11-16T10:00:00Z"
  },
  {
    id: "task-demo-06",
    project_id: "proj-workshop",
    title: "Pengumpulan Slide Materi & Lembar Kerja Praktik",
    description: "Menghubungi pembicara utama untuk finalisasi modul studi kasus dan rubrik penilaian ide bisnis.",
    status: "In Progress",
    created_at: "2026-11-10T14:00:00Z",
    updated_at: "2026-11-16T11:30:00Z"
  },
  {
    id: "task-demo-07",
    project_id: "proj-business-expo",
    title: "Izin Keramaian Kepolisian Sektor Dayeuhkolot",
    description: "Dokumen proposal surat pengantar dari Ditmawa masih menunggu tanda tangan pembina ormawa.",
    status: "Blocked",
    created_at: "2026-11-05T09:00:00Z",
    updated_at: "2026-11-14T15:00:00Z"
  },
  {
    id: "task-demo-08",
    project_id: "proj-business-expo",
    title: "Pencairan Dana Sponsorship Termin 1 Bank BJB",
    description: "Tertunda karena invoice resmi organisasi memerlukan stempel basah BPC HIPMI.",
    status: "Blocked",
    created_at: "2026-11-06T10:00:00Z",
    updated_at: "2026-11-15T09:30:00Z"
  },
  {
    id: "task-demo-09",
    project_id: "proj-campus-day",
    title: "Peminjaman Tenda Sarnafil dari Kemahasiswaan",
    description: "Gudang kampus menyatakan kuota tenda bentrok dengan acara wisuda gelombang November.",
    status: "Blocked",
    created_at: "2026-11-12T11:00:00Z",
    updated_at: "2026-11-16T14:00:00Z"
  },
  {
    id: "task-demo-10",
    project_id: "proj-business-expo",
    title: "Kurasi & Seleksi 40 Tenant Bisnis Kader",
    description: "Penilaian pitch deck dan sampel produk dari 45 pendaftar, hasil seleksi telah diumumkan via email.",
    status: "Done",
    created_at: "2026-10-15T08:00:00Z",
    updated_at: "2026-10-28T17:00:00Z"
  },
  {
    id: "task-demo-11",
    project_id: "proj-business-expo",
    title: "Peluncuran Halaman Pemesanan Tiket Publik",
    description: "Sistem ticketing online telah aktif dengan alur reservasi 180 detik dan QRIS terintegrasi.",
    status: "Done",
    created_at: "2026-10-25T10:00:00Z",
    updated_at: "2026-11-01T00:00:00Z"
  },
  {
    id: "task-demo-12",
    project_id: "proj-workshop",
    title: "Penyebaran Poster & Publikasi Broadcast Kampus",
    description: "Publikasi telah disiarkan melalui 12 media partner dan grup angkatan 7 fakultas.",
    status: "Done",
    created_at: "2026-10-26T12:00:00Z",
    updated_at: "2026-11-02T16:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 9. Calendar Events (CAL-01..04)
// ----------------------------------------------------------------------------
export const seedCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-demo-01",
    cabinet_id: "cab-arthakarsa-2627",
    title: "Rapat Koordinasi Mingguan BPH & Pengurus",
    category: "Rapat",
    start_time: "2026-11-20T19:00:00Z",
    end_time: "2026-11-20T21:00:00Z",
    location: "Zoom Meeting & Ruang Sekretariat HIPMI",
    description: "Evaluasi mingguan progres kepengurusan, kendala perizinan proker, dan review arus kas.",
    visibility: "internal",
    owner_user_id: "usr-demo-13"
  },
  {
    id: "cal-demo-02",
    cabinet_id: "cab-arthakarsa-2627",
    title: "HIPMI Business Expo 2026 - Main Exhibition Day",
    category: "Main Event Proker",
    start_time: "2026-12-15T08:00:00Z",
    end_time: "2026-12-15T22:00:00Z",
    location: "Gedung Serba Guna Telkom University",
    description: "Puncak expo wirausaha mahasiswa menghadirkan 40 tenant, 10 investor venture capital, dan bintang tamu.",
    visibility: "public",
    owner_user_id: "usr-demo-04",
    linked_event_id: "evt-business-expo",
    linked_project_id: "proj-business-expo",
    workspace_context: {
      type: "project",
      id: "proj-business-expo",
      name: "HIPMI Business Expo 2026"
    }
  },
  {
    id: "cal-demo-03",
    cabinet_id: "cab-arthakarsa-2627",
    title: "Workshop Kewirausahaan Digital: Zero to Seed",
    category: "Event Formal",
    start_time: "2026-12-05T09:00:00Z",
    end_time: "2026-12-05T15:00:00Z",
    location: "Coworking Space Telkom Landmark Tower & Zoom",
    description: "Sesi intensif pemodelan bisnis Lean Canvas untuk mahasiswa calon founder.",
    visibility: "public",
    owner_user_id: "usr-demo-04",
    linked_event_id: "evt-workshop",
    linked_project_id: "proj-workshop",
    workspace_context: {
      type: "project",
      id: "proj-workshop",
      name: "Workshop Kewirausahaan Digital Demo"
    }
  },
  {
    id: "cal-demo-04",
    cabinet_id: "cab-arthakarsa-2627",
    title: "Sidang Pleno Kompartemen Kaderisasi Evaluasi Tengah Periode",
    category: "Pleno",
    start_time: "2026-12-02T13:00:00Z",
    end_time: "2026-12-02T17:00:00Z",
    location: "Ruang Rapat Gedung B Lantai 2",
    description: "Pemeriksaan keaktifan kader dan review data verifikasi anggota baru.",
    visibility: "internal",
    owner_user_id: "usr-demo-08",
    workspace_context: {
      type: "compartment",
      id: "comp-demo-01",
      name: "Kompartemen Kaderisasi"
    }
  },
  {
    id: "cal-demo-05",
    cabinet_id: "cab-arthakarsa-2627",
    title: "Campus Business Day FEB",
    category: "Main Event Proker",
    start_time: "2026-12-12T08:30:00Z",
    end_time: "2026-12-12T16:30:00Z",
    location: "Plaza FEB Telkom University",
    description: "Bazar kreatif dan talkshow mini kewirausahaan.",
    visibility: "public",
    owner_user_id: "usr-demo-04",
    linked_event_id: "evt-payment-pending",
    linked_project_id: "proj-campus-day"
  },
  {
    id: "cal-demo-06",
    cabinet_id: "cab-arthakarsa-2627",
    title: "Rapat Koordinasi Bidang 1 Organisasi",
    category: "Rapat",
    start_time: "2026-11-25T16:00:00Z",
    end_time: "2026-11-25T18:00:00Z",
    location: "Gedung FIT R.301",
    description: "Sinkronisasi program kerja Bidang 1 antar Kompartemen Kaderisasi dan Riset.",
    visibility: "internal",
    owner_user_id: "usr-demo-09",
    workspace_context: {
      type: "field",
      id: "field-demo-01",
      name: "Bidang 1: Organisasi & Kaderisasi"
    }
  }
];

// ----------------------------------------------------------------------------
// 10. App Events & Ticket Types
// ----------------------------------------------------------------------------
export const seedEvents: AppEvent[] = [
  {
    id: "evt-business-expo",
    project_id: "proj-business-expo",
    title: "HIPMI Business Expo 2026",
    description: "Pameran wirausaha mahasiswa terbesar di Telkom University. Temukan produk inovatif karya kader, ikuti seminar bisnis, dan jalin networking bersama ekosistem startup.",
    organizer_unit: "Kompartemen Inkubasi Bisnis & BPH HIPMI",
    lead_organizer_user_id: "usr-demo-04",
    poster_url: "/assets/demo/events/expo-poster.jpg",
    category: "berbayar",
    schedule_start: "2026-12-15T08:00:00Z",
    schedule_end: "2026-12-15T22:00:00Z",
    location: "Gedung Serba Guna Telkom University",
    public_terms: "1. Tiket berlaku untuk 1 orang per transaksi. 2. Harap membawa e-tiket dengan barcode saat check-in. 3. Tidak ada pengembalian dana (refund) untuk tiket yang telah dibeli.",
    visibility: "public",
    status: "published",
    qris_demo_image: "/assets/demo/qris/qris-expo.png"
  },
  {
    id: "evt-workshop",
    project_id: "proj-workshop",
    title: "Workshop Kewirausahaan Digital 2026",
    description: "Pelajari strategi validasi ide bisnis, riset pasar digital, dan pitching investor secara langsung dari praktisi industri.",
    organizer_unit: "Kompartemen Inkubasi Bisnis",
    lead_organizer_user_id: "usr-demo-04",
    poster_url: "/assets/demo/events/workshop-poster.jpg",
    category: "gratis",
    schedule_start: "2026-12-05T09:00:00Z",
    schedule_end: "2026-12-05T15:00:00Z",
    location: "Coworking Space Telkom Landmark Tower & Zoom",
    public_terms: "1. Terbuka untuk seluruh mahasiswa aktif Telkom University. 2. Wajib hadir 15 menit sebelum acara dimulai.",
    visibility: "public",
    status: "published"
  },
  {
    id: "evt-company-visit",
    project_id: "proj-company-visit",
    title: "Company Visit Tech Unicorn Demo",
    description: "Eksplorasi budaya kerja dan operasional teknologi startup unicorn di Jakarta.",
    organizer_unit: "Kompartemen Kemitraan Strategis",
    lead_organizer_user_id: "usr-demo-22",
    poster_url: "/assets/demo/events/visit-poster.jpg",
    category: "berbayar",
    schedule_start: "2026-12-20T06:00:00Z",
    schedule_end: "2026-12-20T20:00:00Z",
    location: "Jakarta Tech Hub",
    public_terms: "1. Biaya termasuk transportasi PP dan makan siang. 2. Kuota terbatas 35 orang.",
    visibility: "public",
    status: "draft",
    qris_demo_image: "/assets/demo/qris/qris-visit.png"
  },
  {
    id: "evt-pleno",
    title: "Pleno Kompartemen Kaderisasi Demo",
    description: "Sidang pleno evaluasi kinerja triwulan Kompartemen Kaderisasi.",
    organizer_unit: "Kompartemen Kaderisasi",
    lead_organizer_user_id: "usr-demo-08",
    poster_url: "/assets/demo/events/internal-poster.jpg",
    category: "gratis",
    schedule_start: "2026-12-02T13:00:00Z",
    schedule_end: "2026-12-02T17:00:00Z",
    location: "Gedung B Telkom University R.201",
    public_terms: "Khusus pengurus dan kader aktif.",
    visibility: "internal",
    status: "published"
  },
  {
    id: "evt-market-day",
    project_id: "proj-market-day",
    title: "Market Day Ganjil 2026",
    description: "Bazar mingguan mahasiswa di kantin asrama kampus.",
    organizer_unit: "Kompartemen Inkubasi Bisnis",
    lead_organizer_user_id: "usr-demo-04",
    poster_url: "/assets/demo/events/market-poster.jpg",
    category: "berbayar",
    schedule_start: "2026-10-01T08:00:00Z",
    schedule_end: "2026-10-01T17:00:00Z",
    location: "Kantin Asrama Telkom University",
    public_terms: "Acara telah selesai.",
    visibility: "public",
    status: "completed"
  },
  {
    id: "evt-collab",
    project_id: "proj-collab-festival",
    title: "Collaboration Festival Bandung Raya",
    description: "Ajang apresiasi karya inovasi dan musik pemuda.",
    organizer_unit: "Bidang 3 Hubungan Eksternal",
    lead_organizer_user_id: "usr-demo-26",
    poster_url: "/assets/demo/events/collab-poster.jpg",
    category: "gratis",
    schedule_start: "2026-11-01T15:00:00Z",
    schedule_end: "2026-11-01T22:00:00Z",
    location: "Amphitheater Telkom University",
    public_terms: "Acara telah selesai.",
    visibility: "public",
    status: "completed"
  },
  {
    id: "evt-payment-pending",
    project_id: "proj-campus-day",
    title: "Seminar Kewirausahaan Campus Business Day",
    description: "Seminar kiat membangun brand fashion dan kuliner lokal.",
    organizer_unit: "Kompartemen Akselerasi Usaha",
    lead_organizer_user_id: "usr-demo-04",
    poster_url: "/assets/demo/events/seminar-poster.jpg",
    category: "berbayar",
    schedule_start: "2026-12-12T09:00:00Z",
    schedule_end: "2026-12-12T13:00:00Z",
    location: "Auditorium FEB",
    public_terms: "1. Termasuk sertifikat dan snack. 2. Wajib unggah bukti bayar.",
    visibility: "public",
    status: "published",
    qris_demo_image: "/assets/demo/qris/qris-seminar.png"
  },
  {
    id: "evt-soldout",
    project_id: "proj-business-expo",
    title: "Mini Expo & VIP Pitching Demo",
    description: "Sesi temu bisnis privat dengan investor terpilih.",
    organizer_unit: "Kompartemen Akselerasi Usaha",
    lead_organizer_user_id: "usr-demo-04",
    poster_url: "/assets/demo/events/miniexpo-poster.jpg",
    category: "berbayar",
    schedule_start: "2026-12-14T18:00:00Z",
    schedule_end: "2026-12-14T21:00:00Z",
    location: "Executive Lounge Telkom University",
    public_terms: "Seluruh kuota telah habis dipesan.",
    visibility: "public",
    status: "published",
    qris_demo_image: "/assets/demo/qris/qris-miniexpo.png"
  },
  {
    id: "evt-cancelled",
    project_id: "proj-leadership-class",
    title: "Leadership Webinar Series Demo",
    description: "Kelas daring kepemimpinan.",
    organizer_unit: "Kompartemen Teknologi Informasi",
    lead_organizer_user_id: "usr-demo-20",
    poster_url: "/assets/demo/events/webinar-poster.jpg",
    category: "gratis",
    schedule_start: "2026-10-15T19:00:00Z",
    schedule_end: "2026-10-15T21:00:00Z",
    location: "Online",
    public_terms: "Dibatalkan.",
    visibility: "public",
    status: "cancelled"
  }
];

export const seedTicketTypes: EventTicketType[] = [
  {
    id: "tt-business-regular",
    event_id: "evt-business-expo",
    name: "Tiket Regular Exhibition",
    description: "Akses penuh ke seluruh area pameran tenant, main stage seminar, dan souvenir expo.",
    price: 50000,
    quota_total: 100,
    quota_reserved: 45,
    quota_sold: 40,
    sales_start: "2026-10-25T00:00:00Z",
    sales_end: "2026-12-14T23:59:59Z",
    status: "open"
  },
  {
    id: "tt-business-vip",
    event_id: "evt-business-expo",
    name: "Tiket VIP All-Access + Gala Dinner",
    description: "Akses barisan depan seminar, business networking dinner bersama kurator investor, dan VIP goodie bag.",
    price: 100000,
    quota_total: 20,
    quota_reserved: 12,
    quota_sold: 10,
    sales_start: "2026-10-25T00:00:00Z",
    sales_end: "2026-12-14T23:59:59Z",
    status: "open"
  },
  {
    id: "tt-workshop-free",
    event_id: "evt-workshop",
    name: "Akses Gratis Mahasiswa",
    description: "Tiket gratis untuk mahasiswa aktif. Termasuk e-sertifikat dan modul latihan digital.",
    price: 0,
    quota_total: 80,
    quota_reserved: 35,
    quota_sold: 35,
    sales_start: "2026-11-01T00:00:00Z",
    sales_end: "2026-12-04T23:59:59Z",
    status: "open"
  },
  {
    id: "tt-company-early",
    event_id: "evt-company-visit",
    name: "Early Bird Seat",
    description: "Tiket potongan harga kuota terbatas.",
    price: 35000,
    quota_total: 30,
    quota_reserved: 0,
    quota_sold: 0,
    sales_start: "2026-11-25T00:00:00Z",
    sales_end: "2026-12-05T23:59:59Z",
    status: "scheduled"
  },
  {
    id: "tt-company-regular",
    event_id: "evt-company-visit",
    name: "Regular Seat",
    description: "Tiket tarif normal kunjungan industri.",
    price: 50000,
    quota_total: 50,
    quota_reserved: 0,
    quota_sold: 0,
    sales_start: "2026-12-06T00:00:00Z",
    sales_end: "2026-12-18T23:59:59Z",
    status: "scheduled"
  },
  {
    id: "tt-payment-regular",
    event_id: "evt-payment-pending",
    name: "Tiket Seminar Campus Day",
    description: "Tiket seminar bisnis dan konsumsi ringan.",
    price: 25000,
    quota_total: 60,
    quota_reserved: 20,
    quota_sold: 15,
    sales_start: "2026-11-18T00:00:00Z",
    sales_end: "2026-12-11T23:59:59Z",
    status: "open"
  },
  {
    id: "tt-soldout-regular",
    event_id: "evt-soldout",
    name: "Tiket Mini Expo Investor",
    description: "Akses temu investor privat.",
    price: 40000,
    quota_total: 10,
    quota_reserved: 10,
    quota_sold: 10,
    sales_start: "2026-11-01T00:00:00Z",
    sales_end: "2026-11-10T23:59:59Z",
    status: "soldout"
  }
];

// ----------------------------------------------------------------------------
// 11. Ticket Reservations & Issued Tickets (Minimum 18 records)
// ----------------------------------------------------------------------------
export const seedReservations: TicketReservation[] = [
  {
    id: "reg-demo-001",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Raka Pratama",
    participant_nim: "DEMO-2026-001",
    participant_email: "demo.mahasiswa@example.test",
    participant_phone: "081200000001",
    participant_faculty: "Fakultas Ekonomi dan Bisnis",
    participant_study_program: "S1 Manajemen Bisnis",
    amount: 50000,
    reservation_expires_at: "2026-11-10T10:03:00Z",
    proof_file_name: "bukti_tf_raka.jpg",
    proof_submitted_at: "2026-11-10T10:02:15Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-10T10:00:00Z"
  },
  {
    id: "reg-demo-002",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-vip",
    participant_name: "Nabila Putri",
    participant_nim: "DEMO-2026-002",
    participant_email: "demo.kader@example.test",
    participant_phone: "081200000002",
    participant_faculty: "Fakultas Ekonomi dan Bisnis",
    participant_study_program: "S1 Manajemen Bisnis",
    amount: 100000,
    reservation_expires_at: "2026-11-17T18:03:00Z",
    proof_file_name: "bukti_nabila_vip.jpg",
    proof_submitted_at: "2026-11-17T18:01:45Z",
    payment_status: "pending_verification",
    registration_status: "pending_verification",
    created_at: "2026-11-17T18:00:00Z"
  },
  {
    id: "reg-demo-003",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    participant_name: "Dimas Wicaksono",
    participant_nim: "DEMO-2026-003",
    participant_email: "demo.anggota@example.test",
    participant_phone: "081200000003",
    participant_faculty: "Fakultas Ilmu Terapan",
    participant_study_program: "D3 Sistem Informasi",
    amount: 0,
    reservation_expires_at: "2026-11-05T09:03:00Z",
    payment_status: "not_required",
    registration_status: "issued",
    created_at: "2026-11-05T09:00:00Z"
  },
  {
    id: "reg-demo-004",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Andi Saputra",
    participant_nim: "DEMO-2026-104",
    participant_email: "peserta04@example.test",
    participant_phone: "081200000104",
    participant_faculty: "Fakultas Teknik Elektro",
    participant_study_program: "S1 Teknik Elektro",
    amount: 50000,
    reservation_expires_at: "2026-11-08T11:03:00Z",
    proof_file_name: "bukti_tf_andi.jpg",
    proof_submitted_at: "2026-11-08T11:02:00Z",
    payment_status: "approved",
    registration_status: "checked_in",
    created_at: "2026-11-08T11:00:00Z"
  },
  {
    id: "reg-demo-005",
    event_id: "evt-payment-pending",
    ticket_type_id: "tt-payment-regular",
    participant_name: "Siti Rahma",
    participant_nim: "DEMO-2026-105",
    participant_email: "peserta05@example.test",
    participant_phone: "081200000105",
    participant_faculty: "Fakultas Rekayasa Industri",
    participant_study_program: "S1 Sistem Informasi",
    amount: 25000,
    reservation_expires_at: "2026-11-12T14:03:00Z",
    proof_file_name: "struk_buram.jpg",
    proof_submitted_at: "2026-11-12T14:02:10Z",
    payment_status: "rejected",
    registration_status: "rejected",
    created_at: "2026-11-12T14:00:00Z"
  },
  {
    id: "reg-demo-006",
    event_id: "evt-company-visit",
    ticket_type_id: "tt-company-early",
    participant_name: "Budi Utomo",
    participant_nim: "DEMO-2026-106",
    participant_email: "peserta06@example.test",
    participant_phone: "081200000106",
    participant_faculty: "Fakultas Informatika",
    participant_study_program: "S1 Informatika",
    amount: 35000,
    reservation_expires_at: "2026-11-14T08:03:00Z",
    payment_status: "expired",
    registration_status: "expired",
    created_at: "2026-11-14T08:00:00Z"
  },
  {
    id: "reg-demo-007",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Hani Farida",
    participant_nim: "DEMO-2026-107",
    participant_email: "peserta07@example.test",
    participant_phone: "081200000107",
    participant_faculty: "Fakultas Industri Kreatif",
    participant_study_program: "S1 Desain Komunikasi Visual",
    amount: 50000,
    reservation_expires_at: "2026-11-15T09:03:00Z",
    proof_file_name: "tf_hani.png",
    proof_submitted_at: "2026-11-15T09:02:20Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-15T09:00:00Z"
  },
  {
    id: "reg-demo-008",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-vip",
    participant_name: "Rizaldy Ilham",
    participant_nim: "DEMO-2026-108",
    participant_email: "peserta08@example.test",
    participant_phone: "081200000108",
    participant_faculty: "Fakultas Ekonomi dan Bisnis",
    participant_study_program: "S1 Akuntansi",
    amount: 100000,
    reservation_expires_at: "2026-11-16T10:03:00Z",
    proof_file_name: "vip_rizaldy.jpg",
    proof_submitted_at: "2026-11-16T10:01:30Z",
    payment_status: "pending_verification",
    registration_status: "pending_verification",
    created_at: "2026-11-16T10:00:00Z"
  },
  {
    id: "reg-demo-009",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    participant_name: "Tania Aurelia",
    participant_nim: "DEMO-2026-109",
    participant_email: "peserta09@example.test",
    participant_phone: "081200000109",
    participant_faculty: "Fakultas Komunikasi dan Bisnis",
    participant_study_program: "S1 Ilmu Komunikasi",
    amount: 0,
    reservation_expires_at: "2026-11-06T11:03:00Z",
    payment_status: "not_required",
    registration_status: "issued",
    created_at: "2026-11-06T11:00:00Z"
  },
  {
    id: "reg-demo-010",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Guntur Tri",
    participant_nim: "DEMO-2026-110",
    participant_email: "peserta10@example.test",
    participant_phone: "081200000110",
    participant_faculty: "Fakultas Teknik Elektro",
    participant_study_program: "S1 Teknik Telekomunikasi",
    amount: 50000,
    reservation_expires_at: "2026-11-11T13:03:00Z",
    proof_file_name: "guntur_tf.jpg",
    proof_submitted_at: "2026-11-11T13:02:12Z",
    payment_status: "approved",
    registration_status: "checked_in",
    created_at: "2026-11-11T13:00:00Z"
  },
  {
    id: "reg-demo-011",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Mega Pertiwi",
    participant_nim: "DEMO-2026-111",
    participant_email: "peserta11@example.test",
    participant_phone: "081200000111",
    participant_faculty: "Fakultas Rekayasa Industri",
    participant_study_program: "S1 Teknik Industri",
    amount: 50000,
    reservation_expires_at: "2026-11-13T15:03:00Z",
    proof_file_name: "mega_bukti.jpg",
    proof_submitted_at: "2026-11-13T15:02:00Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-13T15:00:00Z"
  },
  {
    id: "reg-demo-012",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    participant_name: "Joko Susilo",
    participant_nim: "DEMO-2026-112",
    participant_email: "peserta12@example.test",
    participant_phone: "081200000112",
    participant_faculty: "Fakultas Ilmu Terapan",
    participant_study_program: "D3 Teknik Komputer",
    amount: 0,
    reservation_expires_at: "2026-11-07T16:03:00Z",
    payment_status: "not_required",
    registration_status: "absent",
    created_at: "2026-11-07T16:00:00Z"
  },
  {
    id: "reg-demo-013",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Laras Setyowati",
    participant_nim: "DEMO-2026-113",
    participant_email: "peserta13@example.test",
    participant_phone: "081200000113",
    participant_faculty: "Fakultas Ekonomi dan Bisnis",
    participant_study_program: "S1 Manajemen Bisnis",
    amount: 50000,
    reservation_expires_at: "2026-11-14T09:03:00Z",
    payment_status: "unpaid",
    registration_status: "reserved",
    created_at: "2026-11-14T09:01:00Z"
  },
  {
    id: "reg-demo-014",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Vino Bastian",
    participant_nim: "DEMO-2026-114",
    participant_email: "peserta14@example.test",
    participant_phone: "081200000114",
    participant_faculty: "Fakultas Komunikasi dan Bisnis",
    participant_study_program: "S1 Administrasi Bisnis",
    amount: 50000,
    reservation_expires_at: "2026-11-14T11:03:00Z",
    proof_file_name: "vino_tf.jpg",
    proof_submitted_at: "2026-11-14T11:02:40Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-14T11:00:00Z"
  },
  {
    id: "reg-demo-015",
    event_id: "evt-payment-pending",
    ticket_type_id: "tt-payment-regular",
    participant_name: "Zahra Amalia",
    participant_nim: "DEMO-2026-115",
    participant_email: "peserta15@example.test",
    participant_phone: "081200000115",
    participant_faculty: "Fakultas Industri Kreatif",
    participant_study_program: "S1 Desain Interior",
    amount: 25000,
    reservation_expires_at: "2026-11-16T14:03:00Z",
    proof_file_name: "zahra_tf.jpg",
    proof_submitted_at: "2026-11-16T14:02:00Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-16T14:00:00Z"
  },
  {
    id: "reg-demo-016",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    participant_name: "Iqbal Ramadhan",
    participant_nim: "DEMO-2026-116",
    participant_email: "peserta16@example.test",
    participant_phone: "081200000116",
    participant_faculty: "Fakultas Informatika",
    participant_study_program: "S1 Sains Data",
    amount: 0,
    reservation_expires_at: "2026-11-08T09:03:00Z",
    payment_status: "not_required",
    registration_status: "checked_in",
    created_at: "2026-11-08T09:00:00Z"
  },
  {
    id: "reg-demo-017",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    participant_name: "Kania Dewi",
    participant_nim: "DEMO-2026-117",
    participant_email: "peserta17@example.test",
    participant_phone: "081200000117",
    participant_faculty: "Fakultas Ilmu Terapan",
    participant_study_program: "D4 Rekayasa Perangkat Lunak Aplikasi",
    amount: 50000,
    reservation_expires_at: "2026-11-15T16:03:00Z",
    proof_file_name: "tf_salah_nominal.jpg",
    proof_submitted_at: "2026-11-15T16:02:10Z",
    payment_status: "rejected",
    registration_status: "rejected",
    created_at: "2026-11-15T16:00:00Z"
  },
  {
    id: "reg-demo-018",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-vip",
    participant_name: "Darmawan Santosa",
    participant_nim: "DEMO-2026-118",
    participant_email: "peserta18@example.test",
    participant_phone: "081200000118",
    participant_faculty: "Fakultas Ekonomi dan Bisnis",
    participant_study_program: "S1 Manajemen Bisnis",
    amount: 100000,
    reservation_expires_at: "2026-11-16T17:03:00Z",
    proof_file_name: "vip_darmawan.jpg",
    proof_submitted_at: "2026-11-16T17:01:50Z",
    payment_status: "approved",
    registration_status: "issued",
    created_at: "2026-11-16T17:00:00Z"
  }
];

export const seedTickets: IssuedTicket[] = [
  {
    id: "tkt-demo-0001",
    reservation_id: "reg-demo-001",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0001",
    participant_name: "Raka Pratama",
    participant_nim: "DEMO-2026-001",
    participant_email: "demo.mahasiswa@example.test",
    issued_at: "2026-11-10T11:00:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0002",
    reservation_id: "reg-demo-003",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    ticket_token: "DEMO-TKT-0002",
    participant_name: "Dimas Wicaksono",
    participant_nim: "DEMO-2026-003",
    participant_email: "demo.anggota@example.test",
    issued_at: "2026-11-05T09:05:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0003",
    reservation_id: "reg-demo-004",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0003",
    participant_name: "Andi Saputra",
    participant_nim: "DEMO-2026-104",
    participant_email: "peserta04@example.test",
    issued_at: "2026-11-08T11:30:00Z",
    is_checked_in: true,
    checked_in_at: "2026-11-15T09:12:00Z",
    check_in_operator_id: "usr-demo-16"
  },
  {
    id: "tkt-demo-0004",
    reservation_id: "reg-demo-007",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0004",
    participant_name: "Hani Farida",
    participant_nim: "DEMO-2026-107",
    participant_email: "peserta07@example.test",
    issued_at: "2026-11-15T10:00:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0005",
    reservation_id: "reg-demo-009",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    ticket_token: "DEMO-TKT-0005",
    participant_name: "Tania Aurelia",
    participant_nim: "DEMO-2026-109",
    participant_email: "peserta09@example.test",
    issued_at: "2026-11-06T11:10:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0006",
    reservation_id: "reg-demo-010",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0006",
    participant_name: "Guntur Tri",
    participant_nim: "DEMO-2026-110",
    participant_email: "peserta10@example.test",
    issued_at: "2026-11-11T14:00:00Z",
    is_checked_in: true,
    checked_in_at: "2026-11-15T10:45:00Z",
    check_in_operator_id: "usr-demo-16"
  },
  {
    id: "tkt-demo-0007",
    reservation_id: "reg-demo-011",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0007",
    participant_name: "Mega Pertiwi",
    participant_nim: "DEMO-2026-111",
    participant_email: "peserta11@example.test",
    issued_at: "2026-11-13T16:00:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0008",
    reservation_id: "reg-demo-014",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-regular",
    ticket_token: "DEMO-TKT-0008",
    participant_name: "Vino Bastian",
    participant_nim: "DEMO-2026-114",
    participant_email: "peserta14@example.test",
    issued_at: "2026-11-14T12:00:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0009",
    reservation_id: "reg-demo-015",
    event_id: "evt-payment-pending",
    ticket_type_id: "tt-payment-regular",
    ticket_token: "DEMO-TKT-0009",
    participant_name: "Zahra Amalia",
    participant_nim: "DEMO-2026-115",
    participant_email: "peserta15@example.test",
    issued_at: "2026-11-16T15:00:00Z",
    is_checked_in: false
  },
  {
    id: "tkt-demo-0010",
    reservation_id: "reg-demo-016",
    event_id: "evt-workshop",
    ticket_type_id: "tt-workshop-free",
    ticket_token: "DEMO-TKT-0010",
    participant_name: "Iqbal Ramadhan",
    participant_nim: "DEMO-2026-116",
    participant_email: "peserta16@example.test",
    issued_at: "2026-11-08T09:15:00Z",
    is_checked_in: true,
    checked_in_at: "2026-11-08T09:30:00Z",
    check_in_operator_id: "usr-demo-16"
  },
  {
    id: "tkt-demo-0011",
    reservation_id: "reg-demo-018",
    event_id: "evt-business-expo",
    ticket_type_id: "tt-business-vip",
    ticket_token: "DEMO-TKT-0011",
    participant_name: "Darmawan Santosa",
    participant_nim: "DEMO-2026-118",
    participant_email: "peserta18@example.test",
    issued_at: "2026-11-16T18:00:00Z",
    is_checked_in: false
  }
];

// ----------------------------------------------------------------------------
// 12. Correspondence Requests (COR-01..07)
// ----------------------------------------------------------------------------
export const seedCorrespondence: CorrespondenceRequest[] = [
  {
    id: "corr-demo-001",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-06",
    submitter_name: "Bima Saputra",
    unit_name: "Kompartemen Kaderisasi",
    title: "Surat Permohonan Peminjaman Ruang Auditorium FIT",
    purpose: "Peminjaman ruangan untuk pembekalan calon kader wirausaha angkatan 2026.",
    routing: "Surat Umum",
    description: "Kegiatan direncanakan hari Sabtu, 28 November 2026 pukul 08.00–16.00 WIB.",
    document_url: "/assets/demo/docs/permohonan-ruang.pdf",
    status: "submitted",
    checklist: [
      { item: "Kop surat HIPMI resmi terpasang", checked: true },
      { item: "Nama penanggung jawab dan kontak jelas", checked: true },
      { item: "Lampiran rundown kegiatan disertakan", checked: true },
      { item: "Tanda tangan basah pemohon tertera", checked: false }
    ],
    created_at: "2026-11-15T09:00:00Z",
    updated_at: "2026-11-15T09:00:00Z"
  },
  {
    id: "corr-demo-002",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "HIPMI Business Expo 2026",
    title: "Surat Pengantar Pengajuan SK Kepanitiaan ke Ditmawa",
    purpose: "Pengesahan susunan panitia Expo agar mendapatkan poin TAK kemahasiswaan.",
    routing: "Untuk Ditmawa",
    description: "Memerlukan penyesuaian format lampiran tabel nama panitia sesuai template terbaru Ditmawa.",
    document_url: "/assets/demo/docs/pengantar-ditmawa.pdf",
    status: "revision",
    checklist: [
      { item: "Format formulir Ditmawa v3", checked: true },
      { item: "NIM dan program studi tervalidasi", checked: true },
      { item: "Tanda tangan Ketua Umum terlampir", checked: true }
    ],
    reviewer_notes: "Lampiran tabel NIM panitia kolom ke-4 terpotong margin. Mohon upload ulang format A4 portrait.",
    created_at: "2026-11-10T11:00:00Z",
    updated_at: "2026-11-12T14:00:00Z"
  },
  {
    id: "corr-demo-003",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-08",
    submitter_name: "Gita Permata",
    unit_name: "Kompartemen Kaderisasi",
    title: "Surat Undangan Pembicara Alumni HIPMI Pusat",
    purpose: "Undangan resmi kepada Ketum BPC Bandung sebagai keynote speaker.",
    routing: "Surat Umum",
    description: "Surat resmi telah diverifikasi dan nomor resmi telah diterbitkan oleh Sekum.",
    document_url: "/assets/demo/docs/undangan-alumni.pdf",
    status: "completed",
    checklist: [
      { item: "Kop surat HIPMI resmi terpasang", checked: true },
      { item: "Tanda tangan Sekum dan Ketum lengkap", checked: true },
      { item: "Nomor registrasi persuratan valid", checked: true }
    ],
    generated_letter_number: "ORG/HIPMI-TELU/XI/2026/042",
    issued_at: "2026-11-05T15:00:00Z",
    created_at: "2026-11-03T10:00:00Z",
    updated_at: "2026-11-05T15:00:00Z"
  },
  {
    id: "corr-demo-004",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "HIPMI Business Expo 2026",
    title: "Permohonan Rekomendasi Kegiatan & Izin Keramaian Ditmawa",
    purpose: "Pengantar izin resmi penyelenggaraan acara terbuka di area GSG Telkom.",
    routing: "Untuk Ditmawa",
    description: "Selesai review internal Sekum, menunggu penerusan fisik / disposisi ke loket Ditmawa.",
    document_url: "/assets/demo/docs/permohonan-rekomendasi.pdf",
    status: "completed",
    checklist: [
      { item: "Proposal kegiatan terlampir", checked: true },
      { item: "Surat persetujuan pembina ormawa", checked: true },
      { item: "Kajian risiko keselamatan", checked: true }
    ],
    generated_letter_number: "DTM/HIPMI-TELU/XI/2026/018",
    issued_at: "2026-11-14T10:00:00Z",
    ditmawa_status: "sent",
    ditmawa_notes: "Diserahkan ke staf Ditmawa loket 2, estimasi tanda tangan pimpinan 3 hari kerja.",
    created_at: "2026-11-08T10:00:00Z",
    updated_at: "2026-11-14T10:00:00Z"
  },
  {
    id: "corr-demo-005",
    cabinet_id: "cab-demo-2526",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "Kabinet Contoh Periode Lalu",
    title: "Surat Serah Terima Aset Organisasi Periode 2025/2026",
    purpose: "Arsip administratif serah terima kepengurusan lama.",
    routing: "Surat Umum",
    description: "Dokumen historis pengurus periode sebelumnya.",
    document_url: "/assets/demo/docs/serah-terima-2526.pdf",
    status: "archived",
    checklist: [
      { item: "Daftar inventaris", checked: true },
      { item: "Tanda tangan kedua pihak", checked: true }
    ],
    generated_letter_number: "ARS/HIPMI-TELU/VI/2026/099",
    issued_at: "2026-06-25T10:00:00Z",
    created_at: "2026-06-20T08:00:00Z",
    updated_at: "2026-06-25T10:00:00Z"
  },
  {
    id: "corr-demo-006",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-06",
    submitter_name: "Bima Saputra",
    unit_name: "Kompartemen Kaderisasi",
    title: "Draf Permohonan Kerjasama Media Partner Radio Kampus",
    purpose: "Menjalin kemitraan publikasi kegiatan kaderisasi.",
    routing: "Surat Umum",
    description: "Draf surat pengajuan sponsorship barter konten yang belum diajukan ke Sekum.",
    document_url: "/assets/demo/docs/draft-medpart.pdf",
    status: "draft",
    checklist: [
      { item: "Kop surat HIPMI", checked: true },
      { item: "Benefit barter dicantumkan", checked: false }
    ],
    created_at: "2026-11-16T17:00:00Z",
    updated_at: "2026-11-16T17:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 13. Fund Requests & Finance Transactions (FIN-01..10)
// ----------------------------------------------------------------------------
export const seedFundRequests: FundRequest[] = [
  {
    id: "fund-demo-001",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-07",
    submitter_name: "Citra Maharani",
    unit_name: "Kompartemen Kaderisasi",
    purpose: "Pembelian ATK, banner backdrop, dan konsumsi rapat koordinasi akbar pengurus.",
    requested_amount: 1500000,
    items: [
      { description: "Cetak Banner Backdrop 4x2 meter", amount: 350000 },
      { description: "Konsumsi Rapat 30 orang @Rp30.000", amount: 900000 },
      { description: "ATK, Spidol, Kertas Flipchart", amount: 250000 }
    ],
    proposal_url: "/assets/demo/docs/proposal-rab-kaderisasi.pdf",
    status: "submitted",
    tranches: [
      {
        tranche_number: 1,
        amount: 1500000,
        disbursement_status: "pending"
      }
    ],
    created_at: "2026-11-14T10:00:00Z",
    updated_at: "2026-11-14T10:00:00Z"
  },
  {
    id: "fund-demo-002",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "HIPMI Business Expo 2026",
    project_id: "proj-business-expo",
    purpose: "Uang muka sewa booth modular partisi aluminium 40 tenant.",
    requested_amount: 2000000,
    approved_amount: 2000000,
    items: [
      { description: "DP 50% Sewa Partisi Stand Expo", amount: 2000000 }
    ],
    proposal_url: "/assets/demo/docs/proposal-booth-expo.pdf",
    status: "approved",
    reviewer_notes: "Disetujui penuh. Pastikan invoice resmi vendor dilampirkan saat pelaporan LPJ termin 1.",
    tranches: [
      {
        tranche_number: 1,
        amount: 2000000,
        disbursement_status: "pending"
      }
    ],
    created_at: "2026-11-10T09:00:00Z",
    updated_at: "2026-11-12T11:00:00Z"
  },
  {
    id: "fund-demo-003",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "Workshop Kewirausahaan Digital",
    project_id: "proj-workshop",
    purpose: "Honorarium narasumber praktisi dan lisensi platform streaming.",
    requested_amount: 750000,
    items: [
      { description: "Honorarium Pemateri Tamu", amount: 500000 },
      { description: "Upgrade Add-on Zoom 500 Peserta", amount: 250000 }
    ],
    proposal_url: "/assets/demo/docs/rab-workshop.pdf",
    status: "revision",
    reviewer_notes: "Mohon lampirkan CV pemateri dan nomor rekening bank atas nama bersangkutan secara lengkap.",
    tranches: [
      {
        tranche_number: 1,
        amount: 750000,
        disbursement_status: "pending"
      }
    ],
    created_at: "2026-11-11T13:00:00Z",
    updated_at: "2026-11-13T10:00:00Z"
  },
  {
    id: "fund-demo-004",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-05",
    submitter_name: "Alya Safitri",
    unit_name: "Kompartemen Riset & Tata Kelola",
    purpose: "Pengadaan merchandise jaket seragam pengurus non-kegiatan.",
    requested_amount: 500000,
    items: [
      { description: "Subsidi Polo Shirt Pengurus", amount: 500000 }
    ],
    proposal_url: "/assets/demo/docs/pengajuan-seragam.pdf",
    status: "rejected",
    reviewer_notes: "Ditolak sesuai AD/ART anggaran kas operasional; seragam pengurus menggunakan skema iuran mandiri.",
    tranches: [],
    created_at: "2026-11-01T10:00:00Z",
    updated_at: "2026-11-03T14:00:00Z"
  },
  {
    id: "fund-demo-005",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    submitter_name: "Fajar Ramadhan",
    unit_name: "HIPMI Business Expo 2026",
    project_id: "proj-business-expo",
    purpose: "Produksi panggung utama, sound system, dan lighting pameran (2 termin).",
    requested_amount: 3000000,
    approved_amount: 3000000,
    items: [
      { description: "Termin 1: Uang Muka Sewa Sound & Rigging Stage", amount: 1500000 },
      { description: "Termin 2: Pelunasan Pasca Gladi Bersih", amount: 1500000 }
    ],
    proposal_url: "/assets/demo/docs/rab-stage-lighting.pdf",
    status: "disbursed_partial",
    tranches: [
      {
        tranche_number: 1,
        amount: 1500000,
        disbursement_status: "received",
        transferred_at: "2026-11-08T10:00:00Z",
        confirmed_at: "2026-11-08T14:00:00Z"
      },
      {
        tranche_number: 2,
        amount: 1500000,
        disbursement_status: "pending"
      }
    ],
    created_at: "2026-11-05T08:00:00Z",
    updated_at: "2026-11-08T14:00:00Z"
  },
  {
    id: "fund-demo-006",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-26",
    submitter_name: "Multi-Assignment Demo",
    unit_name: "Collaboration Festival",
    project_id: "proj-collab-festival",
    purpose: "Biaya perizinan venue dan keamanan acara kolaborasi mahasiswa.",
    requested_amount: 1200000,
    approved_amount: 1200000,
    items: [
      { description: "Retribusi Kebersihan & Keamanan Kampus", amount: 700000 },
      { description: "Air Mineral Dus & Konsumsi Petugas Keamanan", amount: 500000 }
    ],
    proposal_url: "/assets/demo/docs/rab-keamanan-festival.pdf",
    status: "settled",
    tranches: [
      {
        tranche_number: 1,
        amount: 1200000,
        disbursement_status: "received",
        transferred_at: "2026-10-25T11:00:00Z",
        confirmed_at: "2026-10-25T15:00:00Z"
      }
    ],
    created_at: "2026-10-20T09:00:00Z",
    updated_at: "2026-11-02T16:00:00Z"
  }
];

export const seedTransactions: FinanceTransaction[] = [
  {
    id: "trx-demo-001",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-10-15",
    type: "income",
    category: "Sponsorship",
    amount: 10000000,
    description: "Sponsorship Utama Bank BJB Cabang Telkom University",
    source_account: "Bank BJB Eksternal",
    destination_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "SPONSOR-BJB-01"
  },
  {
    id: "trx-demo-002",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-10-20",
    type: "income",
    category: "Penjualan Tiket",
    amount: 2000000,
    description: "Akumulasi Tiket Expo Batch 1 (40 Peserta Regular)",
    source_account: "QRIS Merchant HIPMI",
    destination_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "TKT-AGG-001"
  },
  {
    id: "trx-demo-003",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-10-22",
    type: "income",
    category: "Iuran Anggota / Pendaftaran Tenant",
    amount: 4000000,
    description: "Biaya Registrasi 20 Booth Tenant Bisnis Mahasiswa @Rp200.000",
    source_account: "Transfer Mandiri Peserta",
    destination_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "TENANT-REG-01"
  },
  {
    id: "trx-demo-004",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-10-25",
    type: "expense",
    category: "Operasional Proker",
    amount: 1200000,
    description: "Pencairan Dana Retribusi & Keamanan Collaboration Festival (fund-demo-006)",
    source_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "fund-demo-006"
  },
  {
    id: "trx-demo-005",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-01",
    type: "transfer",
    category: "Transfer Internal",
    amount: 3000000,
    description: "Alokasi Kas Operasional dari Rekening Utama ke Kas Kecil BPH",
    source_account: "Kas Utama HIPMI (Mandiri)",
    destination_account: "Kas Operasional Petty Cash",
    status: "posted",
    reference_id: "INTERNAL-TRF-01"
  },
  {
    id: "trx-demo-006",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-05",
    type: "expense",
    category: "Administrasi & Kesekretariatan",
    amount: 350000,
    description: "Pembelian Kertas Sertifikat, Tinta Printer, dan Stempel Kabinet",
    source_account: "Kas Operasional Petty Cash",
    status: "posted",
    reference_id: "NOTA-ATK-44"
  },
  {
    id: "trx-demo-007",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-08",
    type: "expense",
    category: "Uang Muka Vendor Proker",
    amount: 1500000,
    description: "Pencairan Termin 1 Sound System & Rigging Expo (fund-demo-005)",
    source_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "fund-demo-005-T1"
  },
  {
    id: "trx-demo-008",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-12",
    type: "income",
    category: "Media Partner Fee",
    amount: 250000,
    description: "Pembayaran Paket Medpart Publikasi Event Eksternal (MP-DEMO-0004)",
    source_account: "QRIS Merchant HIPMI",
    destination_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "MP-PAY-004"
  },
  {
    id: "trx-demo-009",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-14",
    type: "expense",
    category: "Konsumsi Rapat",
    amount: 180000,
    description: "Konsumsi Rapat Koordinasi Panitia Divisi Acara Expo",
    source_account: "Kas Operasional Petty Cash",
    status: "posted",
    reference_id: "NOTA-KONS-12"
  },
  {
    id: "trx-demo-010",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-16",
    type: "income",
    category: "Penjualan Tiket VIP",
    amount: 1000000,
    description: "Akumulasi Tiket VIP Expo Batch 1 (10 Tiket VIP)",
    source_account: "QRIS Merchant HIPMI",
    destination_account: "Kas Utama HIPMI (Mandiri)",
    status: "posted",
    reference_id: "TKT-AGG-VIP"
  },
  {
    id: "trx-demo-011",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-16",
    type: "expense",
    category: "Reversal Demo",
    amount: -50000,
    description: "Koreksi kelebihan catat pengeluaran fotokopi surat",
    source_account: "Kas Operasional Petty Cash",
    status: "posted",
    reference_id: "REV-KOREKSI-01"
  },
  {
    id: "trx-demo-012",
    cabinet_id: "cab-arthakarsa-2627",
    date: "2026-11-17",
    type: "expense",
    category: "Uang Muka Vendor Proker",
    amount: 2000000,
    description: "Draf Pencairan Uang Muka Booth Partisi (fund-demo-002)",
    source_account: "Kas Utama HIPMI (Mandiri)",
    status: "draft",
    reference_id: "fund-demo-002"
  }
];

// ----------------------------------------------------------------------------
// 14. Documents & LPJ (DOC-01..06)
// ----------------------------------------------------------------------------
export const seedDocuments: DocumentItem[] = [
  {
    id: "doc-demo-001",
    cabinet_id: "cab-arthakarsa-2627",
    uploader_user_id: "usr-demo-04",
    title: "Master Proposal Kegiatan HIPMI Business Expo 2026",
    category: "Proposal",
    file_or_url: "/assets/demo/docs/proposal-master-expo.pdf",
    version: 1,
    status: "active",
    related_project_id: "proj-business-expo",
    created_at: "2026-10-10T08:00:00Z",
    updated_at: "2026-10-10T08:00:00Z"
  },
  {
    id: "doc-demo-002",
    cabinet_id: "cab-arthakarsa-2627",
    uploader_user_id: "usr-demo-13",
    title: "Standar Operasional Prosedur (SOP) Persuratan & Penomoran Dokumen",
    category: "Surat",
    file_or_url: "/assets/demo/docs/sop-persuratan-2627.pdf",
    version: 2,
    status: "active",
    created_at: "2026-08-01T10:00:00Z",
    updated_at: "2026-09-01T12:00:00Z"
  },
  {
    id: "doc-demo-003",
    cabinet_id: "cab-arthakarsa-2627",
    uploader_user_id: "usr-demo-18",
    title: "Official Poster & Branding Kit Workshop Kewirausahaan",
    category: "Dokumentasi",
    file_or_url: "/assets/demo/docs/branding-kit-workshop.zip",
    version: 1,
    status: "active",
    related_project_id: "proj-workshop",
    created_at: "2026-10-25T14:00:00Z",
    updated_at: "2026-10-25T14:00:00Z"
  },
  {
    id: "doc-demo-004",
    cabinet_id: "cab-arthakarsa-2627",
    uploader_user_id: "usr-demo-14",
    title: "Rekapitulasi Bukti Transaksi Kas Organisasi Bulan Oktober 2026",
    category: "Lainnya",
    file_or_url: "/assets/demo/docs/rekap-keuangan-okt.pdf",
    version: 1,
    status: "active",
    created_at: "2026-11-02T16:00:00Z",
    updated_at: "2026-11-02T16:00:00Z"
  }
];

export const seedLPJs: LPJItem[] = [
  {
    id: "lpj-demo-001",
    project_id: "proj-cadre-training",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-21",
    title: "Laporan Pertanggungjawaban Cadre Training & Leadership 2026",
    section_1_identity: "Program kerja Kompartemen Kaderisasi di bawah Bidang 1 Organisasi.",
    section_2_summary: "Pelatihan kepemimpinan dasar bertujuan membentuk karakter wirausaha mandiri.",
    section_3_execution: "Pelaksanaan dijadwalkan secara bertahap meliputi sesi kelas dan simulasi bisnis.",
    section_4_attendance: "Target peserta 50 mahasiswa baru dari 7 fakultas.",
    section_5_finance: "Anggaran estimasi Rp4.500.000 bersumber dari kas organisasi dan dana hibah.",
    section_6_documentation: "Dokumentasi masih dalam proses persiapan modul.",
    section_7_evaluation: "Draf awal untuk pembahasan internal kepanitiaan.",
    status: "draft",
    created_at: "2026-11-12T09:00:00Z",
    updated_at: "2026-11-12T09:00:00Z"
  },
  {
    id: "lpj-demo-002",
    project_id: "proj-business-expo",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    title: "Laporan Pertanggungjawaban Tahap Persiapan HIPMI Business Expo",
    section_1_identity: "HIPMI Business Expo 2026 — Kompartemen Inkubasi Bisnis.",
    section_2_summary: "Laporan progres pertengahan mencakup seleksi tenant dan realisasi termin 1 panggung.",
    section_3_execution: "Tenant telah terkumpul 40 tim bisnis, technical meeting terlaksana lancar.",
    section_4_attendance: "Total pendaftar awal mencapai 120 peserta reguler.",
    section_5_finance: "Penerimaan sponsorship Rp10.000.000, pengeluaran termin 1 panggung Rp1.500.000.",
    section_6_documentation: "Lampiran foto rapat koordinasi dan bukti transfer termin 1 terlampir.",
    section_7_evaluation: "Perlu perbaikan format laporan bukti nota konsumsi yang belum bernomor urut.",
    status: "revision",
    reviewer_user_id: "usr-demo-24",
    reviewer_notes: "Kuitansi nota konsumsi rapat pada lampiran 5.2 buram dan belum ada tanda tangan penerima dana. Mohon direvisi.",
    created_at: "2026-11-10T14:00:00Z",
    updated_at: "2026-11-13T11:00:00Z"
  },
  {
    id: "lpj-demo-003",
    project_id: "proj-collab-festival",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-26",
    title: "Laporan Pertanggungjawaban Akhir Collaboration Festival Bandung Raya",
    section_1_identity: "Collaboration Festival Bandung Raya 2026, Kompartemen Hubungan Kelembagaan.",
    section_2_summary: "Kegiatan sukses menyatukan 15 ormawa kewirausahaan dengan 600+ pengunjung.",
    section_3_execution: "Dilaksanakan 1 November 2026 di Amphitheater Telkom University mulai 15.00–22.00 WIB.",
    section_4_attendance: "Target 500 audiens tercapai 612 peserta hadir terverifikasi tiket.",
    section_5_finance: "Total realisasi belanja Rp1.200.000 sesuai permohonan fund-demo-006. Saldo sisa Rp0.",
    section_6_documentation: "Foto panggung, piagam apresiasi 15 ormawa, dan kliping berita media partner lengkap.",
    section_7_evaluation: "Kepanitiaan berjalan solid; alur loading booth selesai 1 jam lebih cepat dari jadwal.",
    status: "approved",
    reviewer_user_id: "usr-demo-24",
    reviewer_notes: "LPJ lengkap, nota sesuai nominal pencairan Bendum, dokumentasi memenuhi standar. Disetujui penuh.",
    created_at: "2026-11-04T10:00:00Z",
    updated_at: "2026-11-07T16:00:00Z"
  },
  {
    id: "lpj-demo-004",
    project_id: "proj-market-day",
    cabinet_id: "cab-arthakarsa-2627",
    submitter_user_id: "usr-demo-04",
    title: "Laporan Pertanggungjawaban Market Day Ganjil 2026",
    section_1_identity: "Market Day Ganjil 2026, Kompartemen Media & Publikasi.",
    section_2_summary: "Bazar mahasiswa semester ganjil di kantin kampus.",
    section_3_execution: "Terlaksana pada 1 Oktober 2026 di Kantin Asrama.",
    section_4_attendance: "18 tenant mahasiswa dan 350 transaksi pembelian tercatat.",
    section_5_finance: "Biaya kebersihan dan tenda Rp450.000 telah lunas dibayarkan dari uang sewa tenant.",
    section_6_documentation: "Foto stan bazar dan nota sewa terlampir.",
    section_7_evaluation: "Program selesai dengan baik dan telah diarsipkan.",
    status: "archived",
    created_at: "2026-10-06T09:00:00Z",
    updated_at: "2026-10-10T15:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 15. Cadre Businesses & Company Partners (DIR-04..08)
// ----------------------------------------------------------------------------
export const seedBusinesses: CadreBusiness[] = [
  {
    id: "business-demo-001",
    owner_user_id: "usr-demo-02",
    owner_name: "Nabila Putri",
    name: "Dapur Kreasi Nusantara",
    category: "Food & Beverage",
    description: "Catering harian mahasiswa dan olahan sambal kemasan higienis berbasis rempah nusantara.",
    image_url: "/assets/demo/businesses/dapur-kreasi.jpg",
    products_services: ["Rice Bowl Nusantara", "Sambal Cumi Kemasan Botol", "Snack Box Rapat Ormawa"],
    contact_public: "081299990001",
    social_links: [{ platform: "Instagram", url: "https://instagram.com/dapurkreasi.demo" }],
    review_status: "draft",
    publication_status: "unpublished",
    created_at: "2026-11-10T10:00:00Z"
  },
  {
    id: "business-demo-002",
    owner_user_id: "usr-demo-04",
    owner_name: "Fajar Ramadhan",
    name: "Karya Digital Studio",
    category: "Teknologi & Jasa Kreatif",
    description: "Agensi pembuatan landing page, UI/UX design, dan identitas visual brand UMKM muda.",
    image_url: "/assets/demo/businesses/karya-digital.jpg",
    products_services: ["Pembuatan Website Next.js", "Design System Figma", "Social Media Content Kit"],
    contact_public: "081299990002",
    social_links: [
      { platform: "Instagram", url: "https://instagram.com/karyadigital.demo" },
      { platform: "Website", url: "https://karyadigital.demo" }
    ],
    review_status: "review",
    publication_status: "unpublished",
    created_at: "2026-11-08T11:00:00Z"
  },
  {
    id: "business-demo-003",
    owner_user_id: "usr-demo-08",
    owner_name: "Gita Permata",
    name: "Snack Corner Tel-U",
    category: "Food & Beverage",
    description: "Kudapan keripik pisang aneka rasa kekinian favorit mahasiswa asrama.",
    image_url: "/assets/demo/businesses/snack-corner.jpg",
    products_services: ["Keripik Pisang Cokelat Lumer", "Keripik Singkong Pedas Daun Jeruk"],
    contact_public: "081299990003",
    social_links: [{ platform: "Instagram", url: "https://instagram.com/snackcorner.demo" }],
    review_status: "revision",
    publication_status: "unpublished",
    reviewer_notes: "Foto logo brand resolusi rendah. Mohon sertakan nomor legalitas P-IRT atau sertifikat halal bila ada.",
    created_at: "2026-11-05T09:00:00Z"
  },
  {
    id: "business-demo-004",
    owner_user_id: "usr-demo-09",
    owner_name: "Arif Nugraha",
    name: "Apparel Kampus Sejati",
    category: "Fashion & Merchandise",
    description: "Konveksi jaket angkatan, kemeja bordir, dan totebag kampus dengan bahan katun premium.",
    image_url: "/assets/demo/businesses/apparel-kampus.jpg",
    products_services: ["Jaket Varsity Angkatan", "PDH Bordir Komputer", "Totebag Kanvas Sablon"],
    contact_public: "081299990004",
    social_links: [{ platform: "Instagram", url: "https://instagram.com/apparelkampus.demo" }],
    review_status: "approved",
    publication_status: "unpublished",
    reviewer_notes: "Profil bisnis telah diverifikasi tim kurasi. Siap dipublikasikan pada rilis katalog berikutnya.",
    created_at: "2026-10-25T14:00:00Z"
  },
  {
    id: "business-demo-005",
    owner_user_id: "usr-demo-26",
    owner_name: "Multi-Assignment Demo",
    name: "Edukasi Kreatif Kids",
    category: "Pendidikan & Edutech",
    description: "Mainan edukasi sains berbasis kayu dan workshop coding anak tingkat sekolah dasar.",
    image_url: "/assets/demo/businesses/edukasi-kreatif.jpg",
    products_services: ["Kit Robotika Pemula", "Puzzle Kayu Peta Indonesia", "Coding Bootcamp Anak"],
    contact_public: "081299990005",
    social_links: [
      { platform: "Instagram", url: "https://instagram.com/edukasikreatif.demo" },
      { platform: "Shopee", url: "https://shopee.co.id/edukasikreatifdemo" }
    ],
    review_status: "approved",
    publication_status: "published",
    created_at: "2026-10-15T08:00:00Z"
  }
];

export const seedCompanies: CompanyPartner[] = [
  {
    id: "company-demo-001",
    name: "PT Contoh Mitra Nusantara",
    category: "Sponsor",
    industry: "Perbankan & Jasa Keuangan",
    official_contact: "partnership@mitranusantara.test",
    pic_private_name: "Bambang Sudibyo (VP Corporate Relations)",
    pic_private_contact: "081122334455 (Privat - Khusus BPH)",
    relation_status: "Aktif",
    history_notes: [
      { date: "2026-08-10", notes: "Audiensi awal penawaran paket sponsor tahunan kabinet." },
      { date: "2026-10-15", notes: "Penandatanganan MoU Platinum Sponsor Rp10.000.000 untuk Business Expo.", project_name: "HIPMI Business Expo 2026" }
    ]
  },
  {
    id: "company-demo-002",
    name: "CV Mitra Kampus Demo",
    category: "Vendor",
    industry: "Percetakan & Merchandise",
    official_contact: "admin@mitrakampus.test",
    pic_private_name: "Ibu Hartati (Owner)",
    pic_private_contact: "081399887766 (Privat)",
    relation_status: "Aktif",
    history_notes: [
      { date: "2026-09-05", notes: "Negosiasi diskon 15% untuk pencetakan lanyard dan id card seluruh proker." }
    ]
  },
  {
    id: "company-demo-003",
    name: "Brand Teknologi Demo",
    category: "Mitra Strategis",
    industry: "Teknologi Informasi & Cloud",
    official_contact: "devrel@brandtekno.test",
    pic_private_name: "Satria Pratama (Community Lead)",
    pic_private_contact: "081900112233 (Privat)",
    relation_status: "Aktif",
    history_notes: [
      { date: "2026-10-02", notes: "Pemberian credit cloud server untuk infrastruktur website proker mahasiswa." }
    ]
  },
  {
    id: "company-demo-004",
    name: "Media Partner Info Jabar",
    category: "Media Partner",
    industry: "Media Digital & Portal Berita",
    official_contact: "redaksi@infojabar.test",
    pic_private_name: "Lina Kusuma (Editor Eksekutif)",
    pic_private_contact: "081744556677 (Privat)",
    relation_status: "Aktif",
    history_notes: [
      { date: "2026-10-20", notes: "Barter publikasi artikel rilis media expo dengan pencantuman logo di flyer." }
    ]
  },
  {
    id: "company-demo-005",
    name: "Sponsor Kegiatan Mandiri",
    category: "Sponsor",
    industry: "FMCG / Minuman Ringan",
    official_contact: "marketing@minumandemo.test",
    pic_private_name: "Agus Salim (Brand Activation)",
    pic_private_contact: "081822334499 (Privat)",
    relation_status: "Penjajakan",
    history_notes: [
      { date: "2026-11-05", notes: "Pengiriman proposal penawaran booth sampling produk saat pameran." }
    ]
  }
];

// ----------------------------------------------------------------------------
// 16. Articles & Achievements (CMS-04..07)
// ----------------------------------------------------------------------------
export const seedArticles: ArticleItem[] = [
  {
    id: "art-demo-001",
    title: "Pelantikan Pengurus HIPMI PT Telkom Periode 2026/2027: Mengusung Semangat ARTHAKARSA",
    slug: "pelantikan-pengurus-hipmi-telkom-arthakarsa",
    excerpt: "Sebanyak 45 pengurus resmi dilantik dalam upacara khidmat di Aula GSG Telkom University.",
    body: "Bandung, 15 Juli 2026 — Himpunan Pengusaha Muda Indonesia Perguruan Tinggi (HIPMI PT) Universitas Telkom secara resmi mengukuhkan kepengurusan periode 2026/2027 di bawah panji kabinet ARTHAKARSA. Acara dihadiri langsung oleh jajaran Direktorat Kemahasiswaan serta pimpinan BPC HIPMI Kabupaten Bandung.",
    cover_url: "/assets/demo/articles/pelantikan.jpg",
    category: "Organisasi",
    author_name: "Sarah Amanda",
    status: "published",
    published_at: "2026-07-20T10:00:00Z",
    created_at: "2026-07-16T08:00:00Z"
  },
  {
    id: "art-demo-002",
    title: "Strategi UMKM Muda Mahasiswa Menghadapi Persaingan Pasar Digital Nasional",
    slug: "strategi-umkm-muda-mahasiswa-pasar-digital",
    excerpt: "Tiga kunci fundamental bagi wirausaha pemula dalam mengoptimalkan konversi di platform digital.",
    body: "Dalam lanskap ekonomi digital yang kian dinamis, mahasiswa wirausaha dituntut untuk tidak hanya kreatif menciptakan produk, tetapi juga piawai membaca metrik data pemasaran digital...",
    cover_url: "/assets/demo/articles/umkm-digital.jpg",
    category: "Edukasi Bisnis",
    author_name: "Content Creator Demo",
    status: "published",
    published_at: "2026-09-10T14:00:00Z",
    created_at: "2026-09-05T09:00:00Z"
  },
  {
    id: "art-demo-003",
    title: "Persiapan Matang Menuju Gelaran Akbar HIPMI Business Expo 2026",
    slug: "persiapan-matang-hipmi-business-expo-2026",
    excerpt: "Kurasi ketat 40 tenant bisnis mahasiswa siap memeriahkan pameran tahunan.",
    body: "Draf artikel liputan persiapan teknis pameran expo...",
    cover_url: "/assets/demo/articles/persiapan-expo.jpg",
    category: "Proker",
    author_name: "Editor + Publisher Demo",
    status: "draft",
    created_at: "2026-11-12T11:00:00Z"
  },
  {
    id: "art-demo-004",
    title: "Mengenal Program Mentorship Eksklusif Bersama Mentor Alumni HIPMI",
    slug: "mengenal-mentorship-alumni-hipmi",
    excerpt: "Program inkubasi intensif 3 bulan bersama para pendiri korporasi sukses.",
    body: "Draf artikel panduan pendaftaran mentorship...",
    cover_url: "/assets/demo/articles/mentorship.jpg",
    category: "Edukasi Bisnis",
    author_name: "Content Creator Demo",
    status: "draft",
    created_at: "2026-11-14T15:00:00Z"
  },
  {
    id: "art-demo-005",
    title: "Refleksi Sukses Collaboration Festival Bandung Raya: Sinergi Pemuda Mandiri",
    slug: "refleksi-collaboration-festival-bandung-raya",
    excerpt: "Lebih dari 600 mahasiswa hadir menyatukan visi kewirausahaan pemuda.",
    body: "Artikel pasca acara yang sedang dalam proses review redaksi sebelum dipublikasikan...",
    cover_url: "/assets/demo/articles/collab-review.jpg",
    category: "Proker",
    author_name: "Multi-Assignment Demo",
    status: "review",
    created_at: "2026-11-05T13:00:00Z"
  },
  {
    id: "art-demo-006",
    title: "Dokumentasi Arsip Bazar Kampus Periode 2025/2026",
    slug: "arsip-bazar-kampus-2025",
    excerpt: "Catatan rekam jejak program kerja kabinet terdahulu.",
    body: "Arsip rilis berita kepengurusan sebelumnya.",
    cover_url: "/assets/demo/articles/arsip-bazar.jpg",
    category: "Arsip",
    author_name: "Admin Sistem Demo",
    status: "archived",
    created_at: "2026-06-30T10:00:00Z"
  }
];

export const seedAchievements: AchievementItem[] = [
  {
    id: "achievement-demo-001",
    title: "Juara 1 National Business Plan Competition Entrepreneur Festival 2026",
    category: "Kompetisi Bisnis",
    level: "Nasional",
    year: "2026",
    description: "Kader HIPMI Telkom berhasil menyabet medali emas dengan inovasi pengolahan limbah organik berbasis biokonversi maggot.",
    linked_cadre_ids: ["usr-demo-02", "usr-demo-04"],
    cadre_names: ["Nabila Putri", "Fajar Ramadhan"],
    documentation_url: "/assets/demo/achievements/juara-nasional-expo.jpg",
    status: "published",
    published_at: "2026-10-05T09:00:00Z"
  },
  {
    id: "achievement-demo-002",
    title: "Best Social Enterprise Award pada ASEAN Youth Socialpreneur Summit",
    category: "Wirausaha Sosial",
    level: "Internasional",
    year: "2026",
    description: "Penghargaan bergengsi tingkat Asia Tenggara atas inisiatif pemberdayaan perajin lokal Jawa Barat.",
    linked_cadre_ids: ["usr-demo-26"],
    cadre_names: ["Multi-Assignment Demo"],
    documentation_url: "/assets/demo/achievements/asean-youth.jpg",
    status: "published",
    published_at: "2026-09-18T11:00:00Z"
  },
  {
    id: "achievement-demo-003",
    title: "Juara 2 Kategori Teknologi Tepat Guna KMI Expo Kemendikbudristek",
    category: "Inovasi Teknologi",
    level: "Nasional",
    year: "2026",
    description: "Alat monitoring pertanian presisi berbasis sensor IoT buatan tim kader FT.",
    linked_cadre_ids: ["usr-demo-08"],
    cadre_names: ["Gita Permata"],
    documentation_url: "/assets/demo/achievements/kmi-expo.jpg",
    status: "published",
    published_at: "2026-08-30T14:00:00Z"
  },
  {
    id: "achievement-demo-004",
    title: "Top 10 Startup Mahasiswa Terbaik Telkom University Innovation Award",
    category: "Inkubasi Kampus",
    level: "Universitas",
    year: "2026",
    description: "Aplikasi pencatatan stok cerdas UMKM binaan kompartemen inkubasi.",
    linked_cadre_ids: ["usr-demo-04"],
    cadre_names: ["Fajar Ramadhan"],
    documentation_url: "/assets/demo/achievements/telu-award.jpg",
    status: "published",
    published_at: "2026-07-28T16:00:00Z"
  },
  {
    id: "achievement-demo-005",
    title: "Finalis Lomba Ide Bisnis Regional Jawa Barat Dispora",
    category: "Kompetisi Bisnis",
    level: "Regional",
    year: "2026",
    description: "Proposal platform digital logistik dingin bahan pangan segar.",
    linked_cadre_ids: ["usr-demo-09"],
    cadre_names: ["Arif Nugraha"],
    documentation_url: "/assets/demo/achievements/dispora.jpg",
    status: "review",
    created_at: "2026-11-10T12:00:00Z"
  } as any,
  {
    id: "achievement-demo-006",
    title: "Juara 3 Pitching Pitch-a-Thon Mahasiswa Bandung",
    category: "Kompetisi Bisnis",
    level: "Regional",
    year: "2026",
    description: "Koreksi lampiran piagam penghargaan yang belum bertanda tangan juri.",
    linked_cadre_ids: ["usr-demo-02"],
    cadre_names: ["Nabila Putri"],
    documentation_url: "/assets/demo/achievements/pitchathon.jpg",
    status: "draft",
    created_at: "2026-11-12T15:00:00Z"
  } as any
];

// ----------------------------------------------------------------------------
// 17. Medpart Submissions (PUB-15..17 & CMS-08..09)
// Deterministic tracking codes: MP-DEMO-0001 to MP-DEMO-0006
// ----------------------------------------------------------------------------
export const seedMedpartSubmissions: MedpartSubmission[] = [
  {
    id: "medpart-demo-001",
    tracking_code: "MP-DEMO-0001",
    applicant_name: "Farhan Maulana",
    organization: "BEM Fakultas Ilmu Terapan",
    contact_email: "bemfit@example.test",
    contact_phone: "081233445566",
    event_name: "FIT Technopreneur Festival 2026",
    package_type: "Gratis",
    package_name: "Paket Barter Media (Logo & Story IG)",
    amount: 0,
    requested_publish_date: "2026-11-25",
    poster_url: "/assets/demo/medpart/fit-fest.jpg",
    status: "submitted",
    created_at: "2026-11-15T10:00:00Z"
  },
  {
    id: "medpart-demo-002",
    tracking_code: "MP-DEMO-0002",
    applicant_name: "Salsabila Firdaus",
    organization: "Himpunan Mahasiswa Manajemen Bisnis",
    contact_email: "hmmb@example.test",
    contact_phone: "081277889900",
    event_name: "Management Business Summit 2026",
    package_type: "Berbayar",
    package_name: "Paket Premium Feed + Story + Live Coverage",
    amount: 250000,
    requested_publish_date: "2026-11-28",
    poster_url: "/assets/demo/medpart/mbs-2026.jpg",
    status: "payment_pending",
    reviewer_notes: "Permohonan disetujui secara teknis. Silakan lakukan pembayaran dan unggah bukti transfer.",
    created_at: "2026-11-14T11:30:00Z"
  },
  {
    id: "medpart-demo-003",
    tracking_code: "MP-DEMO-0003",
    applicant_name: "Yusuf Kalla",
    organization: "Komunitas Robotika Kampus",
    contact_email: "robotika@example.test",
    contact_phone: "081311223344",
    event_name: "Telkom Robotic Exhibition 2026",
    package_type: "Gratis",
    package_name: "Paket Barter Media Standar",
    amount: 0,
    requested_publish_date: "2026-12-01",
    poster_url: "/assets/demo/medpart/robotic-expo.jpg",
    status: "approved",
    reviewer_notes: "Materi lolos verifikasi redaksi. Siap dipublikasikan sesuai jadwal antrean tayang.",
    created_at: "2026-11-10T09:00:00Z"
  },
  {
    id: "medpart-demo-004",
    tracking_code: "MP-DEMO-0004",
    applicant_name: "Nadine Chandrawinata",
    organization: "Youth Eco Action Bandung",
    contact_email: "action@youtheco.test",
    contact_phone: "081355667788",
    event_name: "Green Business Summit 2026",
    package_type: "Berbayar",
    package_name: "Paket Premium Berbayar",
    amount: 250000,
    requested_publish_date: "2026-11-12",
    poster_url: "/assets/demo/medpart/green-biz.jpg",
    payment_proof_url: "/assets/demo/medpart/tf-green.jpg",
    status: "published",
    published_at: "2026-11-12T14:00:00Z",
    created_at: "2026-11-06T10:00:00Z"
  },
  {
    id: "medpart-demo-005",
    tracking_code: "MP-DEMO-0005",
    applicant_name: "Aldi Taher",
    organization: "Komunitas Musik Mahasiswa",
    contact_email: "musik@example.test",
    contact_phone: "081388990011",
    event_name: "Music & Entrepreneur Night",
    package_type: "Gratis",
    package_name: "Paket Barter Media",
    amount: 0,
    requested_publish_date: "2026-11-20",
    poster_url: "/assets/demo/medpart/music-night.jpg",
    status: "revision",
    reviewer_notes: "Logo HIPMI pada poster promosi terbalik dan menggunakan logo kabinet lama. Harap perbaiki.",
    created_at: "2026-11-13T16:00:00Z"
  },
  {
    id: "medpart-demo-006",
    tracking_code: "MP-DEMO-0006",
    applicant_name: "Rian D'Masiv",
    organization: "Vendor Komersial Luar",
    contact_email: "komersial@example.test",
    contact_phone: "081300998877",
    event_name: "Promosi Produk Luar Kampus Non-Edukasi",
    package_type: "Berbayar",
    package_name: "Paket Khusus",
    amount: 500000,
    requested_publish_date: "2026-11-18",
    poster_url: "/assets/demo/medpart/produk-luar.jpg",
    status: "rejected",
    reviewer_notes: "Tidak sesuai dengan pedoman kemitraan media HIPMI PT Universitas Telkom (produk rokok/vape dilarang).",
    created_at: "2026-11-11T14:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 18. Feedback / Kotak Suara (PUB-22 & CMS-12..13)
// Strictly private content
// ----------------------------------------------------------------------------
export const seedFeedback: FeedbackItem[] = [
  {
    id: "feedback-demo-001",
    category: "Saran",
    title: "Usulan Penambahan Kategori F&B Halal pada Business Expo",
    message: "Mohon dipertimbangkan kurasi tenant khusus makanan halal tersertifikasi agar memudahkan pengunjung muslim.",
    sender_name_optional: "Ahmad Mahasiswa FEB",
    sender_contact_optional: "ahmad@student.telkomuniversity.ac.id",
    receipt_code: "FB-2026-0001",
    status: "submitted",
    created_at: "2026-11-15T09:30:00Z"
  },
  {
    id: "feedback-demo-002",
    category: "Aspirasi",
    title: "Permintaan Sesi Mentoring Khusus Bisnis Mahasiswa Tingkat Awal",
    message: "Banyak mahasiswa tingkat 1 yang memiliki ide usaha namun bingung mencari rekan tim satu frekuensi.",
    sender_name_optional: "Anonim Mahasiswa FIK",
    receipt_code: "FB-2026-0002",
    status: "under_review",
    created_at: "2026-11-12T11:00:00Z"
  },
  {
    id: "feedback-demo-003",
    category: "Kritik",
    title: "Alur Pembelian Tiket Expo Perlu Instruksi QRIS Lebih Jelas",
    message: "Waktu 180 detik sempat membuat panik karena nomor rekening tujuan dan nominal harus dicek manual.",
    sender_name_optional: "Calon Pengunjung Expo",
    sender_contact_optional: "081234567890",
    receipt_code: "FB-2026-0003",
    status: "routed_to_unit",
    routed_to_unit: "Kompartemen IT & Ticketing Proker Expo",
    followup_notes: "Diteruskan ke tim IT untuk perbaikan teks panduan countdown timer.",
    created_at: "2026-11-10T14:00:00Z"
  },
  {
    id: "feedback-demo-004",
    category: "Pertanyaan",
    title: "Syarat Menjadi Anggota Kader Resmi HIPMI Tel-U",
    message: "Kapan jadwal open recruitment diklat kaderisasi berikutnya dibuka?",
    sender_name_optional: "Dinda Mahasiswi FRI",
    receipt_code: "FB-2026-0004",
    status: "closed",
    routed_to_unit: "Kompartemen Kaderisasi",
    followup_notes: "Telah dijawab melalui email informasi jadwal Diklatda Januari 2027.",
    created_at: "2026-11-01T08:00:00Z"
  }
];

// ----------------------------------------------------------------------------
// 19. App Notifications (Minimum 20 records)
// ----------------------------------------------------------------------------
export const seedNotifications: AppNotification[] = [
  {
    id: "notif-01",
    user_id: "usr-demo-13",
    category: "correspondence",
    title: "Pengajuan Surat Masuk Baru",
    message: "Bima Saputra mengajukan 'Surat Permohonan Peminjaman Ruang Auditorium FIT'.",
    source_route: "/organisasi/surat/detail?id=corr-demo-001",
    read: false,
    created_at: "2026-11-15T09:05:00Z"
  },
  {
    id: "notif-02",
    user_id: "usr-demo-14",
    category: "finance",
    title: "Pengajuan Dana Menunggu Review",
    message: "Citra Maharani mengajukan pencairan dana Rp1.500.000 untuk kegiatan Kaderisasi.",
    source_route: "/organisasi/keuangan/detail?id=fund-demo-001",
    read: false,
    created_at: "2026-11-14T10:05:00Z"
  },
  {
    id: "notif-03",
    user_id: "usr-demo-04",
    category: "event",
    title: "Tiket Expo Baru Terjual",
    message: "Pembelian tiket regular oleh Raka Pratama telah disetujui (DEMO-TKT-0001).",
    source_route: "/organisasi/event/peserta?eventId=evt-business-expo",
    read: true,
    created_at: "2026-11-10T11:05:00Z"
  },
  {
    id: "notif-04",
    user_id: "usr-demo-04",
    category: "correspondence",
    title: "Revisi Surat Ditmawa Diperlukan",
    message: "Sekum meminta revisi format lampiran tabel pada surat nomor pengantar Ditmawa.",
    source_route: "/organisasi/surat/detail?id=corr-demo-002",
    read: false,
    created_at: "2026-11-12T14:10:00Z"
  },
  {
    id: "notif-05",
    user_id: "usr-demo-04",
    category: "finance",
    title: "Pencairan Dana Termin 1 Diterima",
    message: "Dana termin 1 panggung sebesar Rp1.500.000 telah ditransfer oleh Bendum.",
    source_route: "/organisasi/keuangan/detail?id=fund-demo-005",
    read: true,
    created_at: "2026-11-08T14:05:00Z"
  },
  {
    id: "notif-06",
    user_id: "usr-demo-08",
    category: "task",
    title: "Task Proker Diblokir",
    message: "Task 'Izin Keramaian Kepolisian' pada Business Expo berstatus Blocked.",
    source_route: "/organisasi/workspace/proker?id=proj-business-expo&tab=tasks",
    read: false,
    created_at: "2026-11-14T15:05:00Z"
  },
  {
    id: "notif-07",
    user_id: "usr-demo-24",
    category: "lpj",
    title: "LPJ Baru Siap Ditinjau",
    message: "Fajar Ramadhan mengajukan LPJ Tahap Persiapan HIPMI Business Expo.",
    source_route: "/organisasi/dokumen/lpj/detail?id=lpj-demo-002",
    read: true,
    created_at: "2026-11-10T14:15:00Z"
  },
  {
    id: "notif-08",
    user_id: "usr-demo-21",
    category: "cadre",
    title: "Pengajuan Verifikasi Kader",
    message: "Nabila Putri mengajukan verifikasi profil kader HIPMI Tel-U.",
    source_route: "/organisasi/direktori/kader/detail?id=usr-demo-02",
    read: true,
    created_at: "2026-08-16T10:00:00Z"
  },
  {
    id: "notif-09",
    user_id: "usr-demo-17",
    category: "cms",
    title: "Pengajuan Medpart Baru Masuk",
    message: "BEM FIT mengajukan kerjasama medpart 'FIT Technopreneur Festival' (MP-DEMO-0001).",
    source_route: "/organisasi/cms/medpart/detail?id=medpart-demo-001",
    read: false,
    created_at: "2026-11-15T10:10:00Z"
  },
  {
    id: "notif-10",
    user_id: "usr-demo-23",
    category: "cms",
    title: "Aspirasi Kotak Suara Baru",
    message: "Kotak suara menerima masukan baru dengan kode FB-2026-0001.",
    source_route: "/organisasi/cms/kotak-suara/detail?id=feedback-demo-001",
    read: false,
    created_at: "2026-11-15T09:35:00Z"
  },
  {
    id: "notif-11",
    user_id: "usr-demo-01",
    category: "event",
    title: "E-Tiket Siap Diunduh",
    message: "Pembayaran tiket Regular HIPMI Business Expo berhasil diverifikasi. Token: DEMO-TKT-0001.",
    source_route: "/personal/tiket",
    read: false,
    created_at: "2026-11-10T11:01:00Z"
  },
  {
    id: "notif-12",
    user_id: "usr-demo-02",
    category: "event",
    title: "Bukti Transfer Sedang Diverifikasi",
    message: "Bukti pembayaran tiket VIP Anda sedang ditinjau oleh panitia.",
    source_route: "/personal/tiket",
    read: true,
    created_at: "2026-11-17T18:02:00Z"
  },
  {
    id: "notif-13",
    user_id: "usr-demo-26",
    category: "task",
    title: "Penugasan Manager Proker",
    message: "Anda ditugaskan oleh Gita Permata sebagai Co-Project Leader HIPMI Business Expo.",
    source_route: "/organisasi/workspace/proker?id=proj-business-expo",
    read: true,
    created_at: "2026-10-01T08:10:00Z"
  },
  {
    id: "notif-14",
    user_id: "usr-demo-19",
    category: "cms",
    title: "Draf Artikel Siap Dipublikasikan",
    message: "Artikel 'Refleksi Sukses Collaboration Festival' membutuhkan persetujuan publisher.",
    source_route: "/organisasi/cms/artikel/detail?id=art-demo-005",
    read: false,
    created_at: "2026-11-05T13:10:00Z"
  },
  {
    id: "notif-15",
    user_id: "usr-demo-15",
    category: "event",
    title: "Antrean Pembayaran Tiket VIP Masuk",
    message: "Terdapat 2 bukti transfer tiket VIP baru yang membutuhkan verifikasi Anda.",
    source_route: "/organisasi/event/peserta?eventId=evt-business-expo",
    read: false,
    created_at: "2026-11-17T18:05:00Z"
  },
  {
    id: "notif-16",
    user_id: "usr-demo-16",
    category: "event",
    title: "Jadwal Tugas Scanner Gate",
    message: "Anda ditugaskan sebagai operator check-in pada pintu masuk pameran 15 Desember.",
    source_route: "/organisasi/event/kehadiran?eventId=evt-business-expo",
    read: true,
    created_at: "2026-10-01T09:00:00Z"
  },
  {
    id: "notif-17",
    user_id: "usr-demo-02",
    category: "cadre",
    title: "Koreksi Pengajuan Profil Bisnis",
    message: "Tim kurator meminta pembaruan foto logo pada profil 'Snack Corner Tel-U'.",
    source_route: "/personal/bisnis/detail?id=business-demo-003",
    read: false,
    created_at: "2026-11-05T09:30:00Z"
  },
  {
    id: "notif-18",
    category: "system",
    title: "Pengumuman Pemeliharaan Mock Store",
    message: "Sistem LocalStorage v1.1 aktif dengan skema data deterministik.",
    source_route: "/__demo",
    read: true,
    created_at: "2026-11-17T18:00:00Z"
  },
  {
    id: "notif-19",
    user_id: "usr-demo-10",
    category: "correspondence",
    title: "Laporan Persuratan Bulanan Siap",
    message: "Sekum telah menutup 42 nomor surat selama periode bulan berjalan.",
    source_route: "/organisasi/surat",
    read: true,
    created_at: "2026-11-06T08:00:00Z"
  },
  {
    id: "notif-20",
    user_id: "usr-demo-14",
    category: "finance",
    title: "Rekonsiliasi Kas Utama Selesai",
    message: "Penerimaan tiket dan sponsorship telah cocok dengan mutasi kas Mandiri.",
    source_route: "/organisasi/keuangan",
    read: true,
    created_at: "2026-11-16T18:30:00Z"
  }
];

// ----------------------------------------------------------------------------
// 20. Activity History (Minimum 30 records)
// ----------------------------------------------------------------------------
export const seedActivityHistory: ActivityHistory[] = [
  { id: "act-01", actor_name: "Bima Saputra", action: "mengajukan surat permohonan", target: "Auditorium FIT", module: "Persuratan", timestamp: "2026-11-15T09:00:00Z" },
  { id: "act-02", actor_name: "Citra Maharani", action: "mengajukan pencairan dana", target: "RAB Kaderisasi Rp1.500.000", module: "Keuangan", timestamp: "2026-11-14T10:00:00Z" },
  { id: "act-03", actor_name: "Sekretaris Umum Demo", action: "menerbitkan nomor surat", target: "ORG/HIPMI-TELU/XI/2026/042", module: "Persuratan", timestamp: "2026-11-05T15:00:00Z" },
  { id: "act-04", actor_name: "Bendahara Umum Demo", action: "menyetujui pencairan termin 1", target: "Panggung Expo Rp1.500.000", module: "Keuangan", timestamp: "2026-11-08T10:00:00Z" },
  { id: "act-05", actor_name: "Fajar Ramadhan", action: "memindahkan task board", target: "Sistem Ticketing -> Done", module: "Workspace Proker", timestamp: "2026-11-01T00:00:00Z" },
  { id: "act-06", actor_name: "Fajar Ramadhan", action: "membuat proker baru", target: "HIPMI Business Expo 2026", module: "Workspace Kompartemen", timestamp: "2026-10-01T08:00:00Z" },
  { id: "act-07", actor_name: "Gita Permata", action: "menunjuk Project Manager", target: "Fajar Ramadhan pada Business Expo", module: "Workspace Kompartemen", timestamp: "2026-10-01T08:05:00Z" },
  { id: "act-08", actor_name: "Raka Pratama", action: "melakukan reservasi tiket", target: "Tiket Regular Expo (DEMO-TKT-0001)", module: "Ticketing", timestamp: "2026-11-10T10:00:00Z" },
  { id: "act-09", actor_name: "Organizer Demo", action: "memverifikasi pembayaran tiket", target: "Peserta Raka Pratama", module: "Ticketing", timestamp: "2026-11-10T11:00:00Z" },
  { id: "act-10", actor_name: "Check-in Staff Demo", action: "melakukan scan tiket hadir", target: "Andi Saputra (DEMO-TKT-0003)", module: "Presensi", timestamp: "2026-11-15T09:12:00Z" },
  { id: "act-11", actor_name: "Medkom Demo", action: "menyetujui pengajuan medpart", target: "Youth Eco Action Bandung", module: "CMS Medpart", timestamp: "2026-11-10T10:00:00Z" },
  { id: "act-12", actor_name: "Medkom Demo", action: "menerbitkan konten medpart manual", target: "Green Business Summit 2026", module: "CMS Medpart", timestamp: "2026-11-12T14:00:00Z" },
  { id: "act-13", actor_name: "Feedback Operator Demo", action: "melakukan disposisi suara", target: "FB-2026-0003 ke Unit IT", module: "Kotak Suara", timestamp: "2026-11-10T14:30:00Z" },
  { id: "act-14", actor_name: "Feedback Operator Demo", action: "menutup status aspirasi", target: "FB-2026-0004 Selesai", module: "Kotak Suara", timestamp: "2026-11-01T09:00:00Z" },
  { id: "act-15", actor_name: "LPJ Reviewer Demo", action: "menyetujui laporan akhir", target: "LPJ Collaboration Festival", module: "Dokumen LPJ", timestamp: "2026-11-07T16:00:00Z" },
  { id: "act-16", actor_name: "LPJ Reviewer Demo", action: "mengirim catatan revisi", target: "LPJ Persiapan Business Expo", module: "Dokumen LPJ", timestamp: "2026-11-13T11:00:00Z" },
  { id: "act-17", actor_name: "PSDM Demo", action: "memverifikasi status kader", target: "Nabila Putri verified", module: "Direktori Kader", timestamp: "2026-08-16T11:00:00Z" },
  { id: "act-18", actor_name: "Partnership Demo", action: "mencatat riwayat negosiasi", target: "PT Contoh Mitra Nusantara", module: "Direktori Perusahaan", timestamp: "2026-10-15T11:00:00Z" },
  { id: "act-19", actor_name: "Sarah Amanda", action: "menerbitkan artikel publik", target: "Pelantikan Pengurus ARTHAKARSA", module: "CMS Artikel", timestamp: "2026-07-20T10:00:00Z" },
  { id: "act-20", actor_name: "Editor + Publisher Demo", action: "membuat draf artikel", target: "Persiapan Matang Expo", module: "CMS Artikel", timestamp: "2026-11-12T11:00:00Z" },
  { id: "act-21", actor_name: "Nabila Putri", action: "mendaftarkan profil bisnis", target: "Dapur Kreasi Nusantara", module: "Bisnis Saya", timestamp: "2026-11-10T10:00:00Z" },
  { id: "act-22", actor_name: "Multi-Assignment Demo", action: "memperbarui profil bisnis", target: "Edukasi Kreatif Kids", module: "Bisnis Saya", timestamp: "2026-10-15T08:00:00Z" },
  { id: "act-23", actor_name: "Sekretaris Umum Demo", action: "memperbarui status Ditmawa", target: "DTM/HIPMI-TELU/XI/2026/018 -> Terkirim", module: "Persuratan", timestamp: "2026-11-14T10:00:00Z" },
  { id: "act-24", actor_name: "Bendahara Umum Demo", action: "mencatat jurnal kas masuk", target: "Sponsorship BJB Rp10.000.000", module: "Keuangan", timestamp: "2026-10-15T10:00:00Z" },
  { id: "act-25", actor_name: "Bendahara Umum Demo", action: "melakukan transfer kas internal", target: "Kas Utama ke Petty Cash Rp3.000.000", module: "Keuangan", timestamp: "2026-11-01T10:00:00Z" },
  { id: "act-26", actor_name: "Arif Nugraha", action: "meninjau workspace kompartemen", target: "Kompartemen Kaderisasi", module: "Workspace Bidang", timestamp: "2026-11-15T14:00:00Z" },
  { id: "act-27", actor_name: "Ketua Umum Demo", action: "meninjau dashboard eksekutif", target: "Ringkasan Laporan ARTHAKARSA", module: "Organization Area", timestamp: "2026-11-16T09:00:00Z" },
  { id: "act-28", actor_name: "Fajar Ramadhan", action: "menambahkan catatan progres", target: "Fase 2 Promosi & Tiket", module: "Workspace Proker", timestamp: "2026-11-10T14:30:00Z" },
  { id: "act-29", actor_name: "Dimas Wicaksono", action: "mendaftar tiket workshop gratis", target: "Workshop Digital Zero to Seed", module: "Ticketing", timestamp: "2026-11-05T09:00:00Z" },
  { id: "act-30", actor_name: "Admin Sistem Demo", action: "mengarsipkan dokumen kabinet lama", target: "Kabinet Contoh 2025/2026", module: "Admin Panel", timestamp: "2026-07-01T00:00:00Z" }
];

// ----------------------------------------------------------------------------
// 21. Admin Audit Events (Only DEMO-25 can view; minimum 20 records)
// ----------------------------------------------------------------------------
export const seedAuditEvents: AuditEvent[] = [
  { id: "aud-01", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "CABINET_SWITCH", resource_type: "Cabinet", resource_id: "cab-arthakarsa-2627", before_state: "None", after_state: "Active Selection", timestamp: "2026-07-01T00:01:00Z" },
  { id: "aud-02", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "USER_ROLE_ASSIGN", resource_type: "User", resource_id: "usr-demo-10", before_state: "kader", after_state: "ketum", timestamp: "2026-07-01T00:05:00Z" },
  { id: "aud-03", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "USER_ROLE_ASSIGN", resource_type: "User", resource_id: "usr-demo-13", before_state: "kader", after_state: "sekum", timestamp: "2026-07-01T00:06:00Z" },
  { id: "aud-04", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "USER_ROLE_ASSIGN", resource_type: "User", resource_id: "usr-demo-14", before_state: "kader", after_state: "bendum", timestamp: "2026-07-01T00:07:00Z" },
  { id: "aud-05", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "FIELD_CREATE", resource_type: "Field", resource_id: "field-demo-01", before_state: "null", after_state: "Bidang 1: Organisasi & Kaderisasi", timestamp: "2026-07-01T01:00:00Z" },
  { id: "aud-06", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "COMPARTMENT_CREATE", resource_type: "Compartment", resource_id: "comp-demo-01", before_state: "null", after_state: "Kompartemen Kaderisasi", timestamp: "2026-07-01T01:30:00Z" },
  { id: "aud-07", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "MODULE_CONFIG_UPDATE", resource_type: "SystemModule", resource_id: "mod-ticketing", before_state: "maintenance: false", after_state: "maintenance: false, max_reserve: 180s", timestamp: "2026-07-05T08:00:00Z" },
  { id: "aud-08", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-06", before_state: "staff", after_state: "staff + correspondence:create", timestamp: "2026-08-20T09:05:00Z" },
  { id: "aud-09", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-07", before_state: "staff", after_state: "staff + finance:create", timestamp: "2026-08-20T09:35:00Z" },
  { id: "aud-10", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-15", before_state: "staff", after_state: "staff + event:manage, payment:verify", timestamp: "2026-08-01T12:05:00Z" },
  { id: "aud-11", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-16", before_state: "staff", after_state: "staff + attendance:scan", timestamp: "2026-08-01T12:35:00Z" },
  { id: "aud-12", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-17", before_state: "staff", after_state: "staff + medpart:review, medpart:publish_manual", timestamp: "2026-08-05T13:05:00Z" },
  { id: "aud-13", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-23", before_state: "staff", after_state: "staff + feedback:triage", timestamp: "2026-08-15T16:05:00Z" },
  { id: "aud-14", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "PERMISSION_GRANT", resource_type: "User", resource_id: "usr-demo-24", before_state: "staff", after_state: "staff + lpj:review", timestamp: "2026-08-15T16:35:00Z" },
  { id: "aud-15", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "USER_SUSPEND", resource_type: "User", resource_id: "usr-demo-28", before_state: "active", after_state: "suspended", timestamp: "2026-07-20T12:05:00Z" },
  { id: "aud-16", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "CABINET_ARCHIVE", resource_type: "Cabinet", resource_id: "cab-demo-2526", before_state: "active", after_state: "archived", timestamp: "2026-07-01T00:00:00Z" },
  { id: "aud-17", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "SYSTEM_BACKUP_SNAPSHOT", resource_type: "SystemData", resource_id: "backup-v1-init", before_state: "null", after_state: "Snapshot Generated", timestamp: "2026-09-01T00:00:00Z" },
  { id: "aud-18", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "POSITION_STRUCTURE_LOCK", resource_type: "OrganizationStructure", resource_id: "struct-arthakarsa", before_state: "draft", after_state: "locked", timestamp: "2026-09-15T00:00:00Z" },
  { id: "aud-19", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "EMAIL_OUTBOX_PURGE_TEST", resource_type: "EmailServiceMock", resource_id: "outbox-test-queue", before_state: "12 records", after_state: "Purged Test Queue", timestamp: "2026-10-01T00:00:00Z" },
  { id: "aud-20", actor_id: "usr-demo-25", actor_name: "Admin Sistem Demo", action: "SECURITY_AUDIT_LOG_EXPORT", resource_type: "AuditReport", resource_id: "audit-oct-2026", before_state: "None", after_state: "Exported JSON", timestamp: "2026-11-01T00:00:00Z" }
];

// ----------------------------------------------------------------------------
// Master Seed State Initializer
// ----------------------------------------------------------------------------
export function createInitialStoreData(): MockStoreData {
  return {
    schema_version: "1.1",
    current_user_id: "usr-demo-01", // Default to DEMO-01 (Mahasiswa Biasa)
    users: seedUsers,
    faculties: seedFaculties,
    cabinets: seedCabinets,
    fields: seedFields,
    compartments: seedCompartments,
    projects: seedProjects,
    roster: seedRoster,
    tasks: seedTasks,
    calendar_events: seedCalendarEvents,
    events: seedEvents,
    ticket_types: seedTicketTypes,
    reservations: seedReservations,
    tickets: seedTickets,
    correspondence: seedCorrespondence,
    fund_requests: seedFundRequests,
    finance_transactions: seedTransactions,
    documents: seedDocuments,
    lpjs: seedLPJs,
    businesses: seedBusinesses,
    companies: seedCompanies,
    articles: seedArticles,
    achievements: seedAchievements,
    medpart_submissions: seedMedpartSubmissions,
    feedback: seedFeedback,
    notifications: seedNotifications,
    activity_history: seedActivityHistory,
    audit_events: seedAuditEvents
  };
}
