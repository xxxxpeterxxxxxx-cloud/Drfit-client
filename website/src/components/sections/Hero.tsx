"use client";

import Link from "next/link";
import { Github, Zap, Shield, Download, ArrowRight, Sparkles, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-drift-bg" />

      {/* Aurora blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-hero-glow opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-drift-accent/8 blur-[100px] pointer-events-none animate-aurora" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-drift-gold/5 blur-[100px] pointer-events-none animate-aurora" style={{ animationDelay: "3s" }} />

      <div className="container-max relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="badge mb-8 animate-fade-in">
            <Sparkles size={12} className="text-drift-accent" />
            <span>v0.1.0-alpha — CurseForge, Cipher Bot, Flatpak</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-balance animate-fade-in-up">
            A Minecraft client
            <br />
            <span className="gradient-text animate-gradient">that doesn&apos;t suck.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-xl text-drift-text-secondary max-w-2xl leading-relaxed text-balance animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Open-source launcher with Sodium, Lithium, and FerriteCore built in.
            Custom HUD, QoL features, Modrinth + CurseForge integration.
            No Electron, no bloat, no tracking. <span className="text-drift-accent font-medium">~10MB</span>, Rust + React.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/download" className="btn-primary text-base px-7 py-3 group">
              <Download size={18} />
              Download Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              className="btn-secondary text-base px-7 py-3"
              target="_blank"
            >
              <Github size={18} />
              View Source
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-drift-muted animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-drift-accent" />
              Fair-play
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-drift-accent" />
              10MB
            </span>
            <span className="text-drift-border">|</span>
            <span>Fabric 1.21+</span>
            <span className="text-drift-border">|</span>
            <span>Fabric 1.8.9</span>
            <span className="text-drift-border">|</span>
            <span>GPL-3.0</span>
            <span className="text-drift-border">|</span>
            <span>Tauri v2</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-drift-muted animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="text-xs font-mono">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-drift-muted to-transparent" />
      </div>
    </section>
  );
}
