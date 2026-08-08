"use client";

import { useState } from "react";
import { Copy, Check, Github, Download, ShieldCheck, Terminal, Apple, Monitor, Package, Cpu, Zap } from "lucide-react";

type Platform = "linux" | "windows" | "macos";

const VERSION = "v0.1.0-alpha";
const RELEASE_URL = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/tag/v0.1.0-alpha";
const BASE = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/download/v0.1.0-alpha";
const DEB_URL = `${BASE}/Drift.Client_0.1.0_amd64.deb`;
const RPM_URL = `${BASE}/Drift.Client-0.1.0-1.x86_64.rpm`;
const FLATPAK_URL = `${BASE}/Drift.Client_0.1.0_x86_64.flatpak`;
const APPIMAGE_URL = `${BASE}/Drift.Client_0.1.0_amd64.AppImage`;
const EXE_URL = `${BASE}/Drift.Client_0.1.0_x64-setup.exe`;
const MSI_URL = `${BASE}/Drift.Client_0.1.0_x64_en-US.msi`;
const DMG_ARM_URL = `${BASE}/Drift.Client_0.1.0_aarch64.dmg`;
const DMG_INTEL_URL = `${BASE}/Drift.Client_0.1.0_x64.dmg`;

const stats = [
  { icon: Package, label: "Size", value: "~8 MB" },
  { icon: Cpu, label: "Framework", value: "Tauri v2" },
  { icon: Zap, label: "RAM", value: "~120 MB" },
];

const platformData: Record<Platform, {
  name: string;
  icon: any;
  arch: string;
  formats: { label: string; url: string; size: string; primary?: boolean }[];
  quickInstall: string;
}> = {
  linux: {
    name: "Linux",
    icon: Terminal,
    arch: "x86_64 · arm64",
    formats: [
      { label: ".deb", url: DEB_URL, size: "~8 MB", primary: true },
      { label: ".rpm", url: RPM_URL, size: "~8 MB" },
      { label: ".AppImage", url: APPIMAGE_URL, size: "~9 MB" },
      { label: ".flatpak", url: FLATPAK_URL, size: "~8 MB" },
    ],
    quickInstall: `curl -L ${DEB_URL} -o drift.deb && sudo dpkg -i drift.deb`,
  },
  windows: {
    name: "Windows",
    icon: Monitor,
    arch: "x64",
    formats: [
      { label: ".exe (Setup)", url: EXE_URL, size: "~7 MB", primary: true },
      { label: ".msi", url: MSI_URL, size: "~7 MB" },
    ],
    quickInstall: `curl -L ${EXE_URL} -o DriftClient-setup.exe && .\\DriftClient-setup.exe`,
  },
  macos: {
    name: "macOS",
    icon: Apple,
    arch: "Apple Silicon + Intel",
    formats: [
      { label: ".dmg (ARM)", url: DMG_ARM_URL, size: "~8 MB", primary: true },
      { label: ".dmg (Intel)", url: DMG_INTEL_URL, size: "~8 MB" },
    ],
    quickInstall: `curl -L ${DMG_ARM_URL} -o DriftClient.dmg && open DriftClient.dmg`,
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-drift-muted hover:text-drift-mc-green transition-colors flex-shrink-0 p-1" aria-label="Copy">
      {copied ? <Check size={14} className="text-drift-mc-green" /> : <Copy size={14} />}
    </button>
  );
}

export function DownloadPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>("linux");
  const p = platformData[activePlatform];

  return (
    <section className="pt-20 pb-16 min-h-screen">
      <div className="container-max max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <span className="section-label">
            <Download size={12} />
            {VERSION}
          </span>
          <h1 className="text-3xl font-bold mb-2">Download Drift Client</h1>
          <p className="text-sm text-drift-text-secondary">
            Open-source Minecraft client. Tauri v2 + Rust + React. All platforms.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="card p-3 flex items-center gap-3">
              <s.icon size={16} className="text-drift-muted" />
              <div>
                <p className="text-xs text-drift-muted">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Platform selector */}
        <div className="flex gap-1 mb-6 border-b border-drift-border">
          {(Object.keys(platformData) as Platform[]).map((key) => {
            const Icon = platformData[key].icon;
            return (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activePlatform === key
                    ? "text-drift-mc-green border-drift-mc-green"
                    : "text-drift-muted border-transparent hover:text-drift-text"
                }`}
              >
                <Icon size={16} />
                {platformData[key].name}
              </button>
            );
          })}
        </div>

        {/* Arch + verified badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-drift-muted">{p.arch}</span>
          <span className="badge">
            <ShieldCheck size={12} className="text-drift-mc-green" />
            CI verified · {VERSION}
          </span>
        </div>

        {/* Quick install */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-drift-muted uppercase tracking-wider mb-2 font-mono">
            Quick Install
          </h2>
          <div className="border-2 border-drift-border bg-drift-bg-secondary overflow-hidden" style={{ borderRadius: '4px' }}>
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="text-xs text-drift-muted font-mono w-4 flex-shrink-0">$</span>
              <code className="text-sm font-mono break-all flex-1 text-drift-text-secondary">{p.quickInstall}</code>
              <CopyButton text={p.quickInstall} />
            </div>
          </div>
        </div>

        {/* Direct downloads */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-drift-muted uppercase tracking-wider mb-3 font-mono">
            Direct Download
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {p.formats.map((f) => (
              <a
                key={f.label}
                href={f.url}
                className={`card-hover flex items-center justify-between p-4 ${
                  f.primary ? "border-drift-mc-green/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center`} style={{ borderRadius: '4px', background: f.primary ? 'rgba(91,186,58,0.1)' : undefined }}>
                    <Download size={16} className={f.primary ? "text-drift-mc-green" : "text-drift-muted"} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="text-xs text-drift-muted font-mono">{f.size}</p>
                  </div>
                </div>
                <ShieldCheck size={14} className="text-drift-mc-green flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-6 border-t border-drift-border">
          <div className="text-xs text-drift-muted font-mono space-y-1">
            <p>Requires: Java 21+ · Minecraft account</p>
            <p>License: GPL-3.0 · Not affiliated with Mojang</p>
          </div>
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs"
          >
            <Github size={14} />
            Releases
          </a>
        </div>
      </div>
    </section>
  );
}
