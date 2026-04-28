import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SoundProvider } from "@/components/game/sound-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://susnoodle.com"),
  title: {
    default: "SusNoodle | Old Indian Games, Rebuilt Beautifully",
    template: "%s | SusNoodle"
  },
  description:
    "A premium, mobile-first web platform for traditional Indian games with tutorials, practice modes, and friend rooms.",
  openGraph: {
    title: "SusNoodle",
    description: "Old Indian games, rebuilt beautifully for today.",
    url: "https://susnoodle.com",
    siteName: "SusNoodle",
    type: "website",
    images: ["/susnoodle-hero.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "SusNoodle",
    description: "Old Indian games, rebuilt beautifully for today.",
    images: ["/susnoodle-hero.jpg"]
  },
  alternates: {
    canonical: "/"
  }
};

export const viewport: Viewport = {
  themeColor: "#070706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SoundProvider>
          <div className="grain" aria-hidden="true" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SoundProvider>
      </body>
    </html>
  );
}
