import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { getSiteSettings } from "@/lib/content";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
export const viewport: Viewport = { themeColor: "#102A4C", width: "device-width", initialScale: 1 };
export async function generateMetadata(): Promise<Metadata> { const settings = await getSiteSettings(); const url = process.env.APP_URL ?? "http://localhost:3000"; return { metadataBase: new URL(url), title: { default: settings.defaultSeoTitle, template: `%s | ${settings.siteName}` }, description: settings.defaultSeoDescription, applicationName: settings.siteName, openGraph: { type: "website", siteName: settings.siteName, title: settings.defaultSeoTitle, description: settings.defaultSeoDescription, images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Propspora Leads — B2B lead generation" }] }, twitter: { card: "summary_large_image", title: settings.defaultSeoTitle, description: settings.defaultSeoDescription, images: ["/og-image.png"] }, icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" }, robots: { index: true, follow: true } }; }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${inter.variable} ${manrope.variable}`}><body><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3">Skip to content</a>{children}<Toaster richColors position="top-right"/></body></html>; }
