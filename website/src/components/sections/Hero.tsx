"use client";

import Link from "next/link";
import { Github, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-drift-bg" />

      <div className="container-max relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-drift-surface border border-drift-border mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-drift-accent" />
            <span className="text-xs font-mono text-drift-text-secondary">v0.1.0-alpha — in active development</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            A Minecraft client
            <br />
            <span className="text-drift-accent">that doesn&apos;t suck.</span>
          </h1>

          <p className="mt-6 text-lg text-drift-text-secondary max-w-xl leading-relaxed">
            Open-source launcher with Sodium, Lithium, and FerriteCore built in.
            Custom HUD, QoL features, Modrinth integration. No Electron, no bloat,
            no tracking. ~10MB, Rust + React.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/download" className="btn-primary text-sm px-6 py-2.5">
              <Terminal size={16} />
              Build from source
            </Link>
            <Link
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              className="btn-secondary text-sm px-6 py-2.5"
              target="_blank"
            >
              <Github size={16} />
              GitHub
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-xs font-mono text-drift-muted">
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
    </section>
  );
}
