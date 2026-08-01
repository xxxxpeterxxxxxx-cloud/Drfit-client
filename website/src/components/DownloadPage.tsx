"use client";

import { useState } from "react";
import { Copy, Check, Github, Download } from "lucide-react";

type Platform = "linux" | "windows" | "macos";

const RELEASE_URL = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/tag/v0.1.0-alpha";
const DEB_URL = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/download/v0.1.0-alpha/Drift.Client_0.1.0_amd64.deb";
const RPM_URL = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/download/v0.1.0-alpha/Drift.Client-0.1.0-1.x86_64.rpm";
const FLATPAK_URL = "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/releases/download/v0.1.0-alpha/Drift.Client_0.1.0_x86_64.flatpak";

const platformData: Record<Platform, {
  name: string;
  badge: string;
  badgeColor: string;
  installSteps: { cmd: string; comment?: string }[];
  note?: string;
}> = {
  linux: {
    name: "Linux",
    badge: "DEB + RPM + Flatpak available",
    badgeColor: "text-emerald-400",
    installSteps: [
      { cmd: `curl -L ${DEB_URL} -o drift-client.deb`, comment: "Option 1: DEB (Ubuntu/Debian)" },
      { cmd: "sudo dpkg -i drift-client.deb", comment: "Install — creates menu shortcut automatically" },
      { cmd: "", comment: "" },
      { cmd: `curl -L ${FLATPAK_URL} -o drift-client.flatpak`, comment: "Option 2: Flatpak (any distro)" },
      { cmd: "flatpak install drift-client.flatpak", comment: "Install — creates menu shortcut automatically" },
      { cmd: "flatpak run gg.drift.client", comment: "Launch" },
    ],
    note: "Option 3 — RPM (Fedora/RHEL): curl -L " + RPM_URL + " -o drift-client.rpm && sudo rpm -i drift-client.rpm  |  All packages create an application menu entry automatically.",
  },
  windows: {
    name: "Windows",
    badge: "Build from source",
    badgeColor: "text-amber-400",
    installSteps: [
      { cmd: "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git", comment: "Clone repo" },
      { cmd: "cd Drfit-client/launcher", comment: "" },
      { cmd: "npm install", comment: "Install dependencies" },
      { cmd: "npm run tauri build", comment: "Build (produces NSIS installer)" },
      { cmd: "# Installer: src-tauri/target/release/bundle/nsis/", comment: "" },
    ],
    note: "Windows .exe installer will be auto-built by CI on the next release. For now, build from source — requires Node.js 20+, Rust, and VS C++ Build Tools.",
  },
  macos: {
    name: "macOS",
    badge: "Build from source",
    badgeColor: "text-amber-400",
    installSteps: [
      { cmd: "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git", comment: "Clone repo" },
      { cmd: "cd Drfit-client/launcher", comment: "" },
      { cmd: "npm install", comment: "Install dependencies" },
      { cmd: "npm run tauri build", comment: "Build (produces .app + DMG)" },
      { cmd: "# DMG: src-tauri/target/release/bundle/dmg/", comment: "" },
    ],
    note: "macOS .dmg will be auto-built by CI on the next release. For now, build from source — requires Node.js 20+, Rust, and Xcode Command Line Tools.",
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
    <button
      onClick={handleCopy}
      className="text-drift-muted hover:text-drift-accent transition-colors flex-shrink-0 p-1"
      aria-label="Copy"
    >
      {copied ? <Check size={14} className="text-drift-accent" /> : <Copy size={14} />}
    </button>
  );
}

export function DownloadPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>("linux");
  const platform = platformData[activePlatform];

  return (
    <section className="pt-24 pb-20 min-h-screen">
      <div className="container-max max-w-3xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-3">Download</h1>
          <p className="text-sm text-drift-text-secondary">
            v0.1.0-alpha — early access. Linux packages ready, Windows/macOS coming via CI.
          </p>
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-drift-accent hover:underline"
          >
            <Github size={14} />
            GitHub Releases
          </a>
        </div>

        {/* Platform selector */}
        <div className="flex gap-1 mb-8 border-b border-drift-border">
          {(Object.keys(platformData) as Platform[]).map((key) => (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activePlatform === key
                  ? "text-drift-accent border-drift-accent"
                  : "text-drift-muted border-transparent hover:text-drift-text"
              }`}
            >
              {platformData[key].name}
            </button>
          ))}
        </div>

        {/* Status badge */}
        <div className="mb-6">
          <span className={`text-xs font-mono ${platform.badgeColor}`}>
            ● {platform.badge}
          </span>
        </div>

        {/* Install steps */}
        <div>
          <h2 className="text-xs font-semibold text-drift-muted uppercase tracking-wider mb-3 font-mono">
            Install
          </h2>
          <div className="rounded-lg border border-drift-border overflow-hidden">
            {platform.installSteps.map((step, i) => {
              const isComment = step.cmd.startsWith("#");
              return (
                <div key={i}>
                  {step.comment && !isComment && (
                    <div className="px-4 pt-3 pb-1 text-xs text-drift-muted font-mono bg-drift-bg-secondary border-t border-drift-border first:border-t-0">
                      {step.comment}
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-3 px-4 py-2.5 ${
                      isComment ? "bg-drift-bg-secondary" : "bg-drift-bg border-t border-drift-border first:border-t-0"
                    }`}
                  >
                    {!isComment && (
                      <span className="text-xs text-drift-muted font-mono w-4 flex-shrink-0">$</span>
                    )}
                    <code
                      className={`text-sm font-mono break-all flex-1 ${
                        isComment ? "text-drift-muted" : "text-drift-text-secondary"
                      }`}
                    >
                      {step.cmd}
                    </code>
                    {!isComment && <CopyButton text={step.cmd} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        {platform.note && (
          <div className="mt-4 p-4 rounded-lg bg-drift-bg-secondary border border-drift-border">
            <p className="text-xs text-drift-muted font-mono leading-relaxed">
              {platform.note}
            </p>
          </div>
        )}

        {/* Direct download links for Linux */}
        {activePlatform === "linux" && (
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={DEB_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-drift-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={14} />
              Download .deb
            </a>
            <a
              href={RPM_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-drift-border text-sm font-medium hover:border-drift-accent transition-colors"
            >
              <Download size={14} />
              Download .rpm
            </a>
            <a
              href={FLATPAK_URL}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-drift-border text-sm font-medium hover:border-drift-accent transition-colors"
            >
              <Download size={14} />
              Download .flatpak
            </a>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-drift-border text-xs text-drift-muted font-mono">
          <p>Requires: Java 21+ (for mods) · Minecraft account</p>
          <p className="mt-1">License: GPL-3.0 · Not affiliated with Minecraft/Mojang</p>
        </div>
      </div>
    </section>
  );
}
