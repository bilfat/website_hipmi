import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DemoControlCenter } from "@/components/demo/demo-control-center";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HIPMI CENTRAL — Universitas Telkom (ARTHAKARSA)",
  description: "Platform Pengelolaan Organisasi Terpadu HIPMI PT Universitas Telkom",
  icons: {
    icon: [
      { url: "/favicon.ico?v=arthakarsa2", sizes: "any" },
      { url: "/favicon-32x32.png?v=arthakarsa2", sizes: "32x32", type: "image/png" },
      { url: "/assets/assets_logo/logo_ARTHAKARSA.PNG?v=arthakarsa2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=arthakarsa2",
    apple: "/apple-icon.png?v=arthakarsa2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-ui bg-white min-h-screen text-neutral-black antialiased selection:bg-brand-burgundy selection:text-white">
        {children}
        <DemoControlCenter />
      </body>
    </html>
  );
}
