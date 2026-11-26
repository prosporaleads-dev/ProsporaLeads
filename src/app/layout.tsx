import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { getSiteSettings } from "@/lib/content";
import { getAppUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010f33",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: getAppUrl(),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultSeoDescription,
    applicationName: settings.siteName,
    keywords: [
      "B2B lead generation",
      "B2B appointment setting",
      "sales qualified leads",
      "personalised email outreach",
      "LinkedIn outreach agency",
      "B2B market research",
      "data verification and enrichment",
      "outbound sales agency",
      "USA B2B lead generation",
      "Canada B2B leads",
      "Middle East B2B outreach",
      "Australia B2B lead generation",
      "Prospora Leads",
    ],
    authors: [{ name: settings.siteName, url: getAppUrl().origin }],
    creator: settings.siteName,
    publisher: settings.siteName,
    category: "Business",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: settings.siteName,
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      url: "/",
      images: [
        {
          url: "/brand/og-banner.png",
          width: 1200,
          height: 630,
          alt: "Prospora Leads — B2B Lead Generation & Appointment Setting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: ["/brand/og-banner.png"],
    },
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt — AI Agent Overview"
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3"
        >
          Skip to content
        </a>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
