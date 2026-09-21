import type { Metadata, Viewport } from "next";
import { Montserrat, Nunito, Dancing_Script } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import FloatingCall from "@/components/FloatingCall";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Gyógytorna, fizikoterápia és masszázs Kecskeméten`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "gyógytorna Kecskemét",
    "fizikoterápia Kecskemét",
    "lökéshullám terápia Kecskemét",
    "TR therapy Kecskemét",
    "mágnesterápia Kecskemét",
    "masszázs Kecskemét",
    "senior torna Kecskemét",
    "gerinctorna gyerekeknek Kecskemét",
    "Hírös Medical Center",
  ],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#1b3a63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${montserrat.variable} ${nunito.variable} ${script.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCall />
        </SmoothScroll>
      </body>
    </html>
  );
}
