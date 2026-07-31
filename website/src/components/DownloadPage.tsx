"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Apple, Monitor, Terminal, Copy, Check, Package, Coffee, Github, Hammer, Rocket } from "lucide-react";

type Platform = "windows" | "macos" | "linux";

const platformData: Record<Platform, {
  icon: any;
  name: string;
  description: string;
  prereqs: string[];
  buildSteps: string[];
}> = {
  windows: {
    icon: Monitor,
    name: "Windows",
    description: "Windows 10/11 (64-bit)",
    prereqs: ["Node.js 18+", "Rust (rustup)", "Visual Studio C++ Build Tools", "Git"],
    buildSteps: [
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# Installer findet sich in src-tauri/target/release/bundle/",
    ],
  },
  macos: {
    icon: Apple,
    name: "macOS",
    description: "macOS 11+ (Universal)",
    prereqs: ["Node.js 18+", "Rust (rustup)", "Xcode Command Line Tools", "Git"],
    buildSteps: [
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# DMG findet sich in src-tauri/target/release/bundle/dmg/",
    ],
  },
  linux: {
    icon: Terminal,
    name: "Linux",
    description: "Ubuntu, Fedora, Arch, etc.",
    prereqs: ["Node.js 18+", "Rust (rustup)", "webkit2gtk-4.1, libgtk-3, libayatana-appindicator3", "Git"],
    buildSteps: [
      "# Ubuntu/Debian:",
      "sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev",
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# AppImage/deb/rpm in src-tauri/target/release/bundle/",
    ],
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
      aria-label="Copy command"
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
            Free and open source. Build from source — prebuilt binaries coming soon.
          </p>
        </div>

        {/* Status banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12 card-glass p-6 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-drift-gold/10 flex items-center justify-center flex-shrink-0">
            <Hammer size={20} className="text-drift-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">Prebuilt binaries not yet available</h3>
            <p className="text-sm text-drift-text-secondary leading-relaxed">
              Drift Client is in active development (v0.1.0-dev). You can build it from source right now
              using the instructions below. Prebuilt installers will be available with the first stable release.
            </p>
            <a
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm text-drift-accent hover:underline"
            >
              <Github size={16} />
              View source on GitHub
            </a>
          </div>
        </motion.div>

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
          {/* Prerequisites */}
          <motion.div
            key={`pre-${activePlatform}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-drift-accent" />
              <h3 className="font-semibold">Prerequisites — {platform.name}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {platform.prereqs.map((req) => (
                <div key={req} className="flex items-center gap-2 text-sm text-drift-text-secondary">
                  <Check size={14} className="text-drift-accent flex-shrink-0" />
                  {req}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Build instructions */}
          <motion.div
            key={`build-${activePlatform}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal size={18} className="text-drift-accent" />
              <h3 className="font-semibold">Build from Source</h3>
            </div>
            <div className="space-y-2">
              {platform.buildSteps.map((cmd, i) => {
                const isComment = cmd.startsWith("#");
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      isComment ? "bg-transparent" : "bg-drift-bg border border-drift-border"
                    }`}
                  >
                    {!isComment && (
                      <span className="text-xs text-drift-muted font-mono w-6 flex-shrink-0">{i + 1}</span>
                    )}
                    <code
                      className={`text-sm font-mono break-all flex-1 ${
                        isComment ? "text-drift-muted italic" : "text-drift-text-secondary"
                      }`}
                    >
                      {cmd}
                    </code>
                    {!isComment && <CopyButton text={cmd} />}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* System requirements */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 flex items-center gap-3">
              <Package size={20} className="text-drift-accent" />
              <div>
                <div className="text-sm font-medium">Build Size</div>
                <div className="text-xs text-drift-muted">~15 MB binary</div>
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
              <Rocket size={20} className="text-drift-accent" />
              <div>
                <div className="text-sm font-medium">License</div>
                <div className="text-xs text-drift-muted">GPL-3.0, free forever</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-drift-muted mb-4">
              Want to be notified when prebuilt binaries drop?
            </p>
            <a
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm inline-flex"
            >
              <Github size={16} />
              Star & Watch on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
