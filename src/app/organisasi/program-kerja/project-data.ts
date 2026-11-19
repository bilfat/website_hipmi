export interface ProjectVisualMeta {
  image: string;
  tag: string;
  progress: number;
  progressStage: string;
}

export const PROJECT_VISUAL_MAP: Record<string, ProjectVisualMeta> = {
  "proj-business-expo": {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    tag: "Flagship Annual Event",
    progress: 75,
    progressStage: "Fase 2: Promosi & Penjualan Tiket",
  },
  "proj-company-visit": {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    tag: "Kunjungan Industri",
    progress: 35,
    progressStage: "Fase Kurasi Perusahaan Mitra",
  },
  "proj-cadre-training": {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    tag: "Kaderisasi Internal",
    progress: 45,
    progressStage: "Fase Penyusunan Modul",
  },
  "proj-workshop": {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    tag: "Edukasi & Workshop",
    progress: 60,
    progressStage: "Fase Kurikulum & Pemateri",
  },
  "proj-campus-day": {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    tag: "Bazar & Kampus",
    progress: 40,
    progressStage: "Fase Registrasi Tenant Mahasiswa",
  },
  "proj-collab-festival": {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    tag: "Festival Kolaborasi",
    progress: 100,
    progressStage: "Pasca Acara (LPJ Terverifikasi)",
  },
  "proj-market-day": {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    tag: "Uji Pasar Produk",
    progress: 100,
    progressStage: "Arsip Sukses Periode Ganjil",
  },
  "proj-leadership-class": {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    tag: "Leadership Forum",
    progress: 20,
    progressStage: "Penyusunan Rencana Ulang",
  },
};

export const DEFAULT_PROJECT_VISUAL: ProjectVisualMeta = {
  image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
  tag: "Program Kerja",
  progress: 50,
  progressStage: "Tahap Eksekusi Program",
};

export function getProjectVisual(projectId: string): ProjectVisualMeta {
  return PROJECT_VISUAL_MAP[projectId] || DEFAULT_PROJECT_VISUAL;
}

export const BIDANG_ICONS: Record<string, string> = {
  "field-demo-01": "/assets/asset_bidang/01-bidang-okk.png",
  "field-demo-02": "/assets/asset_bidang/04-bidang-ekraf.png",
  "field-demo-03": "/assets/asset_bidang/02-bidang-eksternal.png",
  "field-demo-04": "/assets/asset_bidang/03-bidang-medkominfo.png",
};
