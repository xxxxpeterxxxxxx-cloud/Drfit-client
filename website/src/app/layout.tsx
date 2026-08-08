import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { AmbientBackground } from "@/components/AmbientBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Drift Client — Open-source Minecraft client",
  description:
    "Lightweight Minecraft client with Sodium, Lithium, custom HUD, and QoL features. Tauri v2, Rust + React, GPL-3.0.",
  keywords: ["minecraft client", "drift client", "fabric mods", "minecraft launcher", "open source"],
  authors: [{ name: "Drift Client" }],
  openGraph: {
    title: "Drift Client — Open-source Minecraft client",
    description: "Sodium, Lithium, custom HUD, Modrinth integration. ~10MB, no Electron.",
    type: "website",
    siteName: "Drift Client",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift Client",
    description: "Open-source Minecraft client. Tauri v2, Rust + React.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable}`}>
      <body className="font-sans antialiased">
        <AmbientBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
