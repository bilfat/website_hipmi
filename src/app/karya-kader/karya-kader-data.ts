export interface BusinessCatalogItem {
  id: string;
  name: string;
  category: string;
  owner_name: string;
  faculty: string;
  description: string;
  image_url: string;
  products: string[];
  contact_whatsapp: string;
  instagram: string;
  tiktok: string;
}

export const BUSINESS_CATALOG_DATA: BusinessCatalogItem[] = [
  {
    id: "business-demo-001",
    name: "Dapur Kreasi Nusantara",
    category: "Food & Beverage",
    owner_name: "Nabila Putri",
    faculty: "Fakultas Ekonomi & Bisnis (S1 MBTI)",
    description:
      "Catering harian mahasiswa dan olahan sambal kemasan higienis berbasis rempah nusantara. Menghadirkan cita rasa autentik dengan kemasan praktis dan ramah lingkungan.",
    image_url:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    products: ["Rice Bowl Nusantara", "Sambal Cumi Botol", "Snack Box Rapat Ormawa"],
    contact_whatsapp: "+62 812-9999-0001",
    instagram: "@dapurkreasi.telu",
    tiktok: "@dapurkreasi.official",
  },
  {
    id: "business-demo-002",
    name: "Karya Digital Studio",
    category: "Teknologi & Jasa Kreatif",
    owner_name: "Fajar Ramadhan",
    faculty: "Fakultas Rekayasa Industri (S1 Teknik Industri)",
    description:
      "Agensi pembuatan website modern Next.js, UI/UX design Figma, dan identitas visual brand UMKM muda yang ingin go-digital.",
    image_url:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    products: ["Pembuatan Website Next.js", "Design System Figma", "Social Media Kit"],
    contact_whatsapp: "+62 812-9999-0002",
    instagram: "@karyadigital.studio",
    tiktok: "@karyadigital.id",
  },
  {
    id: "business-demo-003",
    name: "GreenLoop Eco Packaging",
    category: "Manufaktur & Ramah Lingkungan",
    owner_name: "Sarah Andini",
    faculty: "Fakultas Rekayasa Industri (S1 Teknik Industri)",
    description:
      "Solusi kemasan ramah lingkungan berbahan dasar serat alami dan bioplastik singkong yang mudah terurai untuk industri F&B dan retail kampus.",
    image_url:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    products: ["Eco Cassava Bag", "Food Container Biodegradable", "Paper Cup Compostable"],
    contact_whatsapp: "+62 812-9999-0003",
    instagram: "@greenloop.eco",
    tiktok: "@greenloop.pack",
  },
  {
    id: "business-demo-004",
    name: "Apparel Kampus Sejati",
    category: "Fashion & Merchandise",
    owner_name: "Arif Nugraha",
    faculty: "Fakultas Rekayasa Industri (S1 Sistem Informasi)",
    description:
      "Konveksi jaket varsity angkatan, PDH bordir komputer, dan totebag kampus dengan bahan katun premium berstandar ekspor.",
    image_url:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
    products: ["Jaket Varsity Angkatan", "PDH Bordir Komputer", "Totebag Kanvas Sablon"],
    contact_whatsapp: "+62 812-9999-0004",
    instagram: "@apparelkampus.id",
    tiktok: "@apparelkampus.official",
  },
  {
    id: "business-demo-005",
    name: "Edukasi Kreatif Kids",
    category: "Pendidikan & Edutech",
    owner_name: "Dimas Pratama",
    faculty: "Fakultas Industri Kreatif (S1 DKV)",
    description:
      "Mainan edukasi sains berbasis kayu ramah anak serta workshop coding anak interaktif untuk menumbuhkan logika wirausaha sejak dini.",
    image_url:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    products: ["Kit Robotika Pemula", "Puzzle Kayu Peta Nusantara", "Coding Bootcamp Anak"],
    contact_whatsapp: "+62 812-9999-0005",
    instagram: "@edukasikreatif.kids",
    tiktok: "@edukasikreatif.id",
  },
  {
    id: "business-demo-006",
    name: "Sinergi Kopi Kampus",
    category: "Food & Beverage",
    owner_name: "Rizky Fauzi",
    faculty: "Fakultas Ekonomi & Bisnis (S1 Manajemen)",
    description:
      "Kedai kopi artisanal berbasis biji kopi lokal Jawa Barat dengan konsep co-working santai untuk diskusi bisnis mahasiswa.",
    image_url:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    products: ["Cold Brew Arabika Malabar", "Kopi Susu Aren Gula Asli", "Croissant Artisan"],
    contact_whatsapp: "+62 812-9999-0006",
    instagram: "@sinergikopi.telu",
    tiktok: "@sinergikopi.id",
  },
];

export interface AchievementVisualMeta {
  image: string;
  medalTitle: string;
  organizer: string;
  laurelBadge: string;
  certificateNumber: string;
}

export const ACHIEVEMENT_VISUAL_MAP: Record<string, AchievementVisualMeta> = {
  "achievement-demo-001": {
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Juara 1 Medali Emas",
    organizer: "Entrepreneur Festival Indonesia",
    laurelBadge: "🥇 Gold Plaque",
    certificateNumber: "SK-HIPMI/ACH/2026/01",
  },
  "achievement-demo-002": {
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Best Social Enterprise Award",
    organizer: "ASEAN Youth Socialpreneur Summit",
    laurelBadge: "🏆 ASEAN Honor",
    certificateNumber: "SK-HIPMI/ACH/2026/02",
  },
  "achievement-demo-003": {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Juara 2 Medali Perak",
    organizer: "Kemendikbudristek KMI Expo Nasional",
    laurelBadge: "🥈 Silver Plaque",
    certificateNumber: "SK-HIPMI/ACH/2026/03",
  },
  "achievement-demo-004": {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Top 10 Startup Mahasiswa",
    organizer: "Telkom University Innovation Award",
    laurelBadge: "🏅 Top Finalist",
    certificateNumber: "SK-HIPMI/ACH/2026/04",
  },
  "achievement-demo-005": {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Finalis Lomba Ide Bisnis Regional",
    organizer: "Dispora Jawa Barat",
    laurelBadge: "🎖️ Finalis Jabar",
    certificateNumber: "SK-HIPMI/ACH/2026/05",
  },
  "achievement-demo-006": {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    medalTitle: "Juara 3 Pitching Pitch-a-Thon",
    organizer: "Bandung Startup Community",
    laurelBadge: "🥉 Bronze Plaque",
    certificateNumber: "SK-HIPMI/ACH/2026/06",
  },
};

export const DEFAULT_ACHIEVEMENT_VISUAL: AchievementVisualMeta = {
  image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80",
  medalTitle: "Penghargaan Prestasi",
  organizer: "HIPMI PT Telkom University",
  laurelBadge: "🏆 Award Winner",
  certificateNumber: "SK-HIPMI/ACH/2026/00",
};

export function getAchievementVisual(achievementId: string): AchievementVisualMeta {
  return ACHIEVEMENT_VISUAL_MAP[achievementId] || DEFAULT_ACHIEVEMENT_VISUAL;
}
