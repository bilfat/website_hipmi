export interface FieldVisualMeta {
  icon3D: string;
  mandat: string;
  themeColor: {
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
  };
  leaderInfo: {
    role: string;
    faculty: string;
    tagline: string;
  };
  focusAreas: string[];
}

export const BIDANG_META_MAP: Record<string, FieldVisualMeta> = {
  "field-demo-01": {
    icon3D: "/assets/asset_bidang/01-bidang-okk.png",
    mandat: "Pilar Tata Kelola, Keanggotaan & Regenerasi Kader",
    themeColor: {
      accent: "#5A1722",
      border: "border-brand-burgundy/30",
      bgBadge: "bg-brand-burgundy/10",
      textBadge: "text-brand-burgundy",
    },
    leaderInfo: {
      role: "Ketua Bidang 1 (OKK)",
      faculty: "Fakultas Rekayasa Industri",
      tagline: "Membangun pondasi kader tangguh, berintegritas tinggi, dan berjiwa wirausaha.",
    },
    focusAreas: [
      "Regenerasi & Standardisasi Kaderisasi HIPMI Telkom",
      "Manajemen Tata Kelola & Keanggotaan Berkelanjutan",
      "Penguatan Karakter Kepemimpinan Mandiri",
    ],
  },
  "field-demo-02": {
    icon3D: "/assets/asset_bidang/04-bidang-ekraf.png",
    mandat: "Pilar Inkubasi Bisnis, Riset Pasar & Komersialisasi",
    themeColor: {
      accent: "#D97706",
      border: "border-amber-500/30",
      bgBadge: "bg-amber-500/10",
      textBadge: "text-amber-800",
    },
    leaderInfo: {
      role: "Ketua Bidang 2 (Ekraf)",
      faculty: "Fakultas Ekonomi & Bisnis",
      tagline: "Mengakselerasi potensi komersial produk inovasi mahasiswa ke pasar nasional.",
    },
    focusAreas: [
      "Inkubasi Produk Bisnis Kreatif Mahasiswa",
      "Penyelenggaraan Expo Komersial & Business Pitching",
      "Akselerasi Pendanaan & Ekosistem Scale-Up",
    ],
  },
  "field-demo-03": {
    icon3D: "/assets/asset_bidang/02-bidang-eksternal.png",
    mandat: "Pilar Sinergi Ekosistem, Kerjasama Mitra & BPC/BPD",
    themeColor: {
      accent: "#1D4ED8",
      border: "border-blue-500/30",
      bgBadge: "bg-blue-500/10",
      textBadge: "text-blue-800",
    },
    leaderInfo: {
      role: "Ketua Bidang 3 (Hub. Eksternal)",
      faculty: "Fakultas Komunikasi & Bisnis",
      tagline: "Menghubungkan kader muda dengan jejaring pebisnis senior dan korporasi strategis.",
    },
    focusAreas: [
      "Kemitraan Strategis Kampus, BUMN, & Swasta",
      "Harmonisasi Kerjasama HIPMI BPC Bandung & BPD Jabar",
      "Forum Kolaborasi Lintas Organisasi Mahasiswa",
    ],
  },
  "field-demo-04": {
    icon3D: "/assets/asset_bidang/03-bidang-medkominfo.png",
    mandat: "Pilar Publikasi Digital, Hubungan Media & Branding",
    themeColor: {
      accent: "#7C2D12",
      border: "border-rose-500/30",
      bgBadge: "bg-rose-500/10",
      textBadge: "text-rose-900",
    },
    leaderInfo: {
      role: "Ketua Bidang 4 (Medkominfo)",
      faculty: "Fakultas Informatika",
      tagline: "Membawa nama ARTHAKARSA berkilau di lanskap media digital dan teknologi modern.",
    },
    focusAreas: [
      "Publikasi Citra & Kampanye Digital Organisasi",
      "Pengembangan Sistem Informasi & Platform Central",
      "Kemitraan Media Partner & Hubungan Pers Kampus",
    ],
  },
};

export function getFieldMeta(fieldId: string): FieldVisualMeta {
  return (
    BIDANG_META_MAP[fieldId] || {
      icon3D: "/assets/logo/hipmi.png",
      mandat: "Pilar Strategis ARTHAKARSA",
      themeColor: {
        accent: "#5A1722",
        border: "border-brand-burgundy/20",
        bgBadge: "bg-brand-burgundy/10",
        textBadge: "text-brand-burgundy",
      },
      leaderInfo: {
        role: "Ketua Bidang",
        faculty: "Telkom University",
        tagline: "Berdedikasi untuk kemajuan HIPMI PT Telkom University.",
      },
      focusAreas: [
        "Pengembangan Program Kerja Unggulan",
        "Pemberdayaan Anggota & Kader",
        "Sinergi Berkelanjutan",
      ],
    }
  );
}
