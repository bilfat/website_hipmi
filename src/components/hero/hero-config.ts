export interface LeadershipProfile {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
}

export interface HeroSlideData {
  id: string;
  backdropWord: string;
  introBadge: string;
  introTitle: string;
  introDescription: string;
  ctaText: string;
  ctaHref: string;
  messageTitle: string;
  messageLines: string[];
  leaders: [LeadershipProfile, LeadershipProfile];
}

export interface FloatingLogoConfig {
  id: string;
  size: number; // px at desktop 1440
  left: string; // percentage or clamp
  top: string;
  rotation: number; // degrees
  duration: number; // 3.2s to 5.0s
  delay: number; // negative delay in seconds
  isBlurred?: boolean;
  blurClass?: string;
  opacity: number;
  scale?: number;
  src?: string;
  className?: string;
  hideOnMobile?: boolean;
}

// 5 sharp logos in central/midground + 2 blurred corner logos (Mix of HIPMI & ARTHAKARSA)
// On mobile, only 2 delicate logos are shown in the upper perimeter so the center content (silhouette & text) stays 100% clean and neat.
export const FLOATING_LOGOS: FloatingLogoConfig[] = [
  // 1. Top Left - Medium Sharp (above intro area) -> Logo Resmi HIPMI
  {
    id: "fl-1",
    src: "/assets/assets_logo/logo_hipmi.png",
    size: 56,
    left: "12%",
    top: "14%",
    rotation: -8,
    duration: 3.8,
    delay: -1.2,
    opacity: 0.9,
    className: "top-[6%] left-[4%] w-[30px] h-[30px] md:top-[10%] md:left-[8%] md:w-[44px] md:h-[44px]",
    hideOnMobile: false,
  },
  // 2. Top Right - Medium Sharp (above message area) -> Logo ARTHAKARSA
  {
    id: "fl-2",
    src: "/assets/assets_logo/logo_ARTHAKARSA.PNG",
    size: 52,
    left: "84%",
    top: "16%",
    rotation: 10,
    duration: 4.2,
    delay: -0.7,
    opacity: 0.85,
    className: "top-[7%] right-[4%] w-[28px] h-[28px] md:top-[12%] md:left-[88%] md:right-auto md:w-[42px] md:h-[42px]",
    hideOnMobile: false,
  },
  // 3. Center Left Mid - Small Sharp -> Logo Resmi HIPMI
  {
    id: "fl-3",
    src: "/assets/assets_logo/logo_hipmi.png",
    size: 44,
    left: "22%",
    top: "38%",
    rotation: 8,
    duration: 3.4,
    delay: -2.1,
    opacity: 0.85,
    className: "hidden md:block md:top-[34%] md:left-[20%] md:w-[38px] md:h-[38px]",
    hideOnMobile: true,
  },
  // 4. Center Right Mid - Small Sharp -> Logo ARTHAKARSA
  {
    id: "fl-4",
    src: "/assets/assets_logo/logo_ARTHAKARSA.PNG",
    size: 46,
    left: "74%",
    top: "42%",
    rotation: -10,
    duration: 4.6,
    delay: -1.8,
    opacity: 0.75,
    className: "hidden md:block md:top-[36%] md:left-[76%] md:w-[40px] md:h-[40px]",
    hideOnMobile: true,
  },
  // 5. Center Bottom - Small-Medium Sharp -> Logo Resmi HIPMI
  {
    id: "fl-5",
    src: "/assets/assets_logo/logo_hipmi.png",
    size: 46,
    left: "26%",
    top: "78%",
    rotation: -6,
    duration: 4.0,
    delay: -0.4,
    opacity: 0.8,
    className: "hidden md:block md:top-[74%] md:left-[22%] md:w-[38px] md:h-[38px]",
    hideOnMobile: true,
  },
  // 6. Deep Corner Top Left - Large Blurred -> Logo ARTHAKARSA (Only for desktop screens)
  {
    id: "fl-blur-1",
    src: "/assets/assets_logo/logo_ARTHAKARSA.PNG",
    size: 140,
    left: "2%",
    top: "6%",
    rotation: -25,
    duration: 4.8,
    delay: -3.0,
    isBlurred: true,
    blurClass: "blur-md",
    opacity: 0.22,
    className: "hidden lg:block lg:top-[6%] lg:left-[2%] lg:w-[140px] lg:h-[140px] blur-md",
    hideOnMobile: true,
  },
  // 7. Deep Corner Bottom Right - Large Blurred -> Logo Resmi HIPMI (Only for desktop screens)
  {
    id: "fl-blur-2",
    src: "/assets/assets_logo/logo_hipmi.png",
    size: 150,
    left: "88%",
    top: "68%",
    rotation: 18,
    duration: 4.5,
    delay: -1.5,
    isBlurred: true,
    blurClass: "blur-lg",
    opacity: 0.22,
    className: "hidden lg:block lg:top-[68%] lg:left-[88%] lg:w-[150px] lg:h-[150px] blur-lg",
    hideOnMobile: true,
  },
];

export const DEFAULT_HERO_SLIDE: HeroSlideData = {
  id: "arthakarsa-main",
  backdropWord: "ARTHAKARSA",
  introBadge: "HIPMI PT TELKOM UNIVERSITY",
  introTitle: "HIPMI PERGURUAN TINGGI TELKOM UNIVERSITY",
  introDescription:
    "Organisasi mahasiswa yang menjadi wadah bagi mahasiswa Telkom University untuk bertumbuh, berkolaborasi, dan menciptakan dampak nyata di bidang kewirausahaan.",
  ctaText: "Kenali Lebih Lanjut",
  ctaHref: "/tentang-kami",
  messageTitle: "MENCETAK WIRAUSAHA MUDA BERDAYA SAING",
  messageLines: [
    "MENCETAK",
    "WIRAUSAHA MUDA",
    "BERDAYA SAING",
  ],
  leaders: [
    {
      name: "Muhammad Fathur",
      role: "KETUA UMUM",
      bio: "FEB S1 MBTI • Kabinet ARTHAKARSA",
    },
    {
      name: "Sarah Andini",
      role: "WAKIL KETUA UMUM",
      bio: "FRI S1 Teknik Industri • Kabinet ARTHAKARSA",
    },
  ],
};

export const HERO_SLIDES: HeroSlideData[] = [DEFAULT_HERO_SLIDE];
