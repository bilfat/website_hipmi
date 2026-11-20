import { BaseRole, CadreStatus } from "@/types/domain";

export const ROLE_LABELS: Record<string, string> = {
  ketum: "Ketua Umum",
  waketum: "Wakil Ketua Umum",
  sekjen: "Sekretaris Jenderal",
  sekum: "Sekretaris Umum",
  bendum: "Bendahara Umum",
  kabid: "Kepala Bidang",
  kakom: "Kepala Kompartemen",
  staff: "Staf Pengurus",
  kader: "Kader HIPMI",
  system_admin: "Admin Sistem",
  mahasiswa: "Mahasiswa Umum",
};

export const CADRE_STATUS_LABELS: Record<string, string> = {
  verified: "Kader Resmi Terverifikasi",
  candidate: "Calon Kader (Diklat)",
  pending_verification: "Menunggu Verifikasi Kader",
  not_verified: "Mahasiswa Umum",
  unverified: "Mahasiswa Umum",
  rejected: "Pengajuan Ditolak",
};

export const ACCOUNT_STATUS_LABELS: Record<string, string> = {
  active: "Akun Aktif",
  verification_pending: "Menunggu Verifikasi",
  inactive: "Tidak Aktif",
  suspended: "Ditangguhkan",
};

export const REGISTRATION_STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  issued: { label: "Tiket Terbit", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  approved: { label: "Disetujui", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  confirmed: { label: "Terkonfirmasi", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  checked_in: { label: "Sudah Hadir", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  registered: { label: "Terdaftar", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  reserved: { label: "Menunggu Pembayaran", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  pending_verification: { label: "Menunggu Verifikasi", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  expired: { label: "Kedaluwarsa", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
  cancelled: { label: "Dibatalkan", tone: "bg-red-50 text-red-700 border-red-200" },
  rejected: { label: "Ditolak", tone: "bg-red-50 text-red-700 border-red-200" },
  absent: { label: "Tidak Hadir", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

export const PROJECT_STATUS_LABELS: Record<string, { label: string; tone: string }> = {
  draft: { label: "Perencanaan Awal", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  planned: { label: "Terjadwal", tone: "bg-sky-50 text-sky-800 border-sky-200" },
  ongoing: { label: "Sedang Berjalan", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  completed: { label: "Selesai", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  cancelled: { label: "Dibatalkan", tone: "bg-red-50 text-red-700 border-red-200" },
  archived: { label: "Diarsipkan", tone: "bg-neutral-100 text-neutral-600 border-neutral-200" },
};

export const BUSINESS_REVIEW_LABELS: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "bg-neutral-100 text-neutral-700 border-neutral-200" },
  review: { label: "Menunggu Kurasi", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  in_review: { label: "Sedang Dikurasi", tone: "bg-amber-50 text-amber-800 border-amber-200" },
  revision: { label: "Perlu Revisi", tone: "bg-orange-50 text-orange-800 border-orange-200" },
  revision_needed: { label: "Perlu Revisi", tone: "bg-orange-50 text-orange-800 border-orange-200" },
  approved: { label: "Lolos Kurasi", tone: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  rejected: { label: "Ditolak", tone: "bg-red-50 text-red-700 border-red-200" },
};

export function formatRoleLabel(role: BaseRole | string): string {
  return ROLE_LABELS[role] || role;
}

export function formatCadreStatus(status: CadreStatus | string): string {
  return CADRE_STATUS_LABELS[status] || "Mahasiswa Umum";
}

export function formatAccountStatus(status: string): string {
  return ACCOUNT_STATUS_LABELS[status] || status;
}

export function isStructuralRole(role: BaseRole | string): boolean {
  return ["ketum", "waketum", "sekjen", "sekum", "bendum", "kabid", "kakom", "staff"].includes(role);
}

export function getCadreLevel(role: BaseRole | string, cadreStatus: CadreStatus | string): {
  level: 1 | 2 | 3;
  title: string;
  description: string;
} {
  if (cadreStatus !== "verified") {
    return {
      level: 1,
      title: "Belum Terverifikasi",
      description: "Ikuti Diklat Pengenalan Organisasi untuk menjadi Kader Tingkat 1.",
    };
  }
  if (["ketum", "waketum", "sekjen", "sekum", "bendum", "kabid"].includes(role)) {
    return {
      level: 3,
      title: "Kader Tingkat 3 (Pimpinan & Strategis)",
      description: "Telah menuntaskan jenjang kaderisasi lanjut dan mengemban amanah pimpinan kabinet.",
    };
  }
  if (["kakom", "staff"].includes(role)) {
    return {
      level: 2,
      title: "Kader Tingkat 2 (Pengurus Operasional)",
      description: "Lulus Latihan Kepemimpinan Kader (LKK) dan aktif dalam struktur kepengurusan.",
    };
  }
  return {
    level: 1,
    title: "Kader Tingkat 1 (Kader Muda)",
    description: "Lulus Diklat Pengenalan Organisasi (DPO) dan resmi tercatat sebagai Kader HIPMI PT Telkom University.",
  };
}
