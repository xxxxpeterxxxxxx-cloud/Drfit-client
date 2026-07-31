"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Apple, Monitor, Terminal, Copy, Check, Package, Coffee } from "lucide-react";

type Platform = "windows" | "macos" | "linux";

const platformData: Record<Platform, {
  icon: any;
  name: string;
  description: string;
  formats: string[];
  downloads: { label: string; format: string; url: string }[];
  commands: { label: string; cmd: string }[];
}> = {
  windows: {
    icon: Monitor,
    name: "Windows",
    description: "Windows 10/11 (64-bit)",
    formats: [".msi", ".exe (NSIS)"],
    downloads: [
      { label: "MSI Installer", format: ".msi", url: "#" },
      { label: "NSIS Installer", format: ".exe", url: "#" },
    ],
    commands: [
      { label: "Winget", cmd: "winget install driftclient.drift" },
      { label: "Scoop", cmd: "scoop install drift" },
    ],
  },
  macos: {
    icon: Apple,
    name: "macOS",
    description: "macOS 10.15+ (Universal Binary)",
    formats: [".dmg", ".app"],
    downloads: [
      { label: "DMG (Apple Silicon)", format: ".dmg", url: "#" },
      { label: "DMG (Intel)", format: ".dmg", url: "#" },
    ],
    commands: [
      { label: "Homebrew", cmd: "brew install --cask drift-client" },
      { label: "Manual", cmd: "sudo hdiutil attach Drift-Client.dmg && cp -R /Volumes/Drift\\ Client/Drift\\ Client.app /Applications/" },
    ],
  },
  linux: {
    icon: Terminal,
    name: "Linux",
    description: "Most distributions",
    formats: [".AppImage", ".deb", ".rpm", ".flatpak"],
    downloads: [
      { label: "AppImage", format: ".AppImage", url: "#" },
      { label: "DEB Package", format: ".deb", url: "#" },
      { label: "RPM Package", format: ".rpm", url: "#" },
      { label: "Flatpak", format: ".flatpak", url: "#" },
    ],
    commands: [
      { label: "AppImage", cmd: "chmod +x Drift-Client-0.1.0.AppImage && ./Drift-Client-0.1.0.AppImage" },
      { label: "DEB (Ubuntu/Debian)", cmd: "sudo dpkg -i drift-client_0.1.0_amd64.deb" },
      { label: "RPM (Fedora/RHEL)", cmd: "sudo rpm -i drift-client-0.1.0.x86_64.rpm" },
      { label: "Flatpak", cmd: "flatpak install drift-client-0.1.0.flatpak && flatpak run gg.drift.client" },
    ],
  },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-drift-muted hover:text-drift-accent transition-colors flex-shrink-0"
    >
      {copied ? <Check size={14} className="text-drift-accent" /> : <Copy size={14} />}
    </button>
  );
}

export function DownloadPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>("linux");

  const platform = platformData[activePlatform];

  return (
    <section className="pt-32 pb-24 min-h-screen">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Download <span className="text-gradient">Drift Client</span>
          </motion.h1>
          <p className="mt-4 text-lg text-drift-text-secondary">
            Free and open source. Available for all platforms.
          </p>
        </div>

        {/* Platform selector */}
        <div className="flex justify-center gap-2 mb-12">
          {(Object.keys(platformData) as Platform[]).map((key) => {
            const p = platformData[key];
            return (
              <button
                key={key}
                onClick={() => setActivePlatform(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activePlatform === key
                    ? "bg-drift-accent text-white shadow-lg shadow-drift-accent/30"
                    : "bg-drift-surface text-drift-text-secondary border border-drift-border hover:border-drift-border-light"
                }`}
              >
                <p.icon size={20} />
                {p.name}
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Download buttons */}
          <motion.div
            key={`dl-${activePlatform}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {platform.downloads.map((dl) => (
              <a
                key={dl.label}
                href={dl.url}
                className="card-glow p-6 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-drift-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-drift-accent/20 transition-colors">
                  <Download size={22} className="text-drift-accent" />
                </div>
                <div className="font-semibold text-sm mb-1">{dl.label}</div>
                <div className="text-xs text-drift-muted">{dl.format}</div>
              </a>
            ))}
          </motion.div>

          {/* Install commands */}
          <motion.div
            key={`cmd-${activePlatform}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={18} className="text-drift-accent" />
              <h3 className="font-semibold">Install via Terminal</h3>
            </div>
            <div className="space-y-3">
              {platform.commands.map((cmd) => (
                <div key={cmd.label} className="bg-drift-bg border border-drift-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="badge-accent">{cmd.label}</span>
                    <CopyButton text={cmd.cmd} />
                  </div>
                  <code className="text-sm text-drift-text-secondary font-mono break-all">
                    {cmd.cmd}
                  </code>
                </div>
              ))}
            </div>
          </motion.div>

          {/* System requirements */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 flex items-center gap-3">
              <Package size={20} className="text-drift-accent" />
              <div>
                <div className="text-sm font-medium">Size</div>
                <div className="text-xs text-drift-muted">~10 MB download</div>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Coffee size={20} className="text-drift-accent" />
              <div>
                <div className="text-sm font-medium">Requirements</div>
                <div className="text-xs text-drift-muted">Java 21+, Minecraft account</div>
              </div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <Download size={20} className="text-drift-accent" />
              <div>
                <div className="text-sm font-medium">License</div>
                <div className="text-xs text-drift-muted">GPL-3.0, free forever</div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-drift-muted">
            <p>
              Drift Client v0.1.0 is currently in development.
              Star us on{" "}
              <a href="https://github.com/driftclient" target="_blank" className="text-drift-accent hover:underline">GitHub</a>
              {" "}to get notified when the first release drops.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
