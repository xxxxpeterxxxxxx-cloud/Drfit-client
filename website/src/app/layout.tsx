import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Drift Client — A better way to play Minecraft",
  description:
    "Drift Client is a fast, customizable Minecraft client with built-in performance mods, HUD overlays, and quality-of-life features.",
  keywords: ["minecraft client", "drift client", "fabric mods", "minecraft launcher", "PvP client"],
  authors: [{ name: "Drift Client" }],
  openGraph: {
    title: "Drift Client — A better way to play Minecraft",
    description: "Fast, customizable, fair-play Minecraft client with built-in mods and HUD features.",
    type: "website",
    siteName: "Drift Client",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift Client",
    description: "A better way to play Minecraft.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
