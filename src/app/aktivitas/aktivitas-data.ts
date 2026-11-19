export interface EventVisualMeta {
  image: string;
  tag: string;
  priceDisplay: string;
  isFree: boolean;
}

export const EVENT_VISUAL_MAP: Record<string, EventVisualMeta> = {
  "evt-business-expo": {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    tag: "Expo Tahunan",
    priceDisplay: "Mulai Rp 25.000",
    isFree: false,
  },
  "evt-workshop": {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    tag: "Workshop Digital",
    priceDisplay: "Gratis Mahasiswa",
    isFree: true,
  },
  "evt-company-visit": {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    tag: "Kunjungan Industri",
    priceDisplay: "Rp 150.000 (Full Trip)",
    isFree: false,
  },
  "evt-pleno": {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80",
    tag: "Rapat Pleno",
    priceDisplay: "Internal Pengurus",
    isFree: true,
  },
  "evt-market-day": {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    tag: "Bazar Mahasiswa",
    priceDisplay: "Mulai Rp 10.000",
    isFree: false,
  },
  "evt-collab": {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    tag: "Festival Pemuda",
    priceDisplay: "Gratis Terbuka",
    isFree: true,
  },
  "evt-payment-pending": {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    tag: "Seminar Kampus",
    priceDisplay: "Rp 35.000",
    isFree: false,
  },
  "evt-soldout": {
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    tag: "VIP Pitching",
    priceDisplay: "Rp 75.000",
    isFree: false,
  },
  "evt-cancelled": {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    tag: "Webinar Online",
    priceDisplay: "Dibatalkan",
    isFree: true,
  },
};

export const DEFAULT_EVENT_VISUAL: EventVisualMeta = {
  image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
  tag: "Agenda HIPMI",
  priceDisplay: "Informasi Tiket",
  isFree: true,
};

export function getEventVisual(eventId: string): EventVisualMeta {
  return EVENT_VISUAL_MAP[eventId] || DEFAULT_EVENT_VISUAL;
}

export interface ArticleVisualMeta {
  image: string;
  readTime: string;
}

export const ARTICLE_VISUAL_MAP: Record<string, ArticleVisualMeta> = {
  "art-demo-001": {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    readTime: "3 mnt baca",
  },
  "art-demo-002": {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 mnt baca",
  },
  "art-demo-003": {
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    readTime: "3 mnt baca",
  },
  "art-demo-004": {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    readTime: "5 mnt baca",
  },
  "art-demo-005": {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    readTime: "4 mnt baca",
  },
  "art-demo-006": {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    readTime: "2 mnt baca",
  },
};

export const DEFAULT_ARTICLE_VISUAL: ArticleVisualMeta = {
  image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80",
  readTime: "3 mnt baca",
};

export function getArticleVisual(articleId: string): ArticleVisualMeta {
  return ARTICLE_VISUAL_MAP[articleId] || DEFAULT_ARTICLE_VISUAL;
}
