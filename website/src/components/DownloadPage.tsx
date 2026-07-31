"use client";

import { useState } from "react";
import { Copy, Check, Github } from "lucide-react";

type Platform = "windows" | "macos" | "linux";

const platformData: Record<Platform, {
  name: string;
  prereqs: string[];
  buildSteps: string[];
}> = {
  windows: {
    name: "Windows",
    prereqs: ["Node.js 20+", "Rust (rustup)", "Visual Studio C++ Build Tools", "Git"],
    buildSteps: [
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# Installer: src-tauri/target/release/bundle/nsis/",
    ],
  },
  macos: {
    name: "macOS",
    prereqs: ["Node.js 20+", "Rust (rustup)", "Xcode Command Line Tools", "Git"],
    buildSteps: [
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# DMG: src-tauri/target/release/bundle/dmg/",
    ],
  },
  linux: {
    name: "Linux",
    prereqs: ["Node.js 20+", "Rust (rustup)", "webkit2gtk-4.1, libgtk-3, libayatana-appindicator3", "Git"],
    buildSteps: [
      "sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev",
      "git clone https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client.git",
      "cd Drfit-client/launcher",
      "npm install",
      "npm run tauri build",
      "# Output: src-tauri/target/release/bundle/",
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
          <h1 className="text-3xl font-bold mb-3">Build from source</h1>
          <p className="text-sm text-drift-text-secondary">
            No prebuilt binaries yet — the project is in early alpha.
            Build it yourself, it takes 5 minutes.
          </p>
          <a
            href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-drift-accent hover:underline"
          >
            <Github size={14} />
            github.com/xxxxpeterxxxxxx-cloud/Drfit-client
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

        {/* Prerequisites */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-drift-muted uppercase tracking-wider mb-3 font-mono">
            Prerequisites
          </h2>
          <ul className="space-y-1.5">
            {platform.prereqs.map((req) => (
              <li key={req} className="text-sm text-drift-text-secondary flex items-start gap-2">
                <span className="text-drift-muted mt-0.5">—</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Build steps */}
        <div>
          <h2 className="text-xs font-semibold text-drift-muted uppercase tracking-wider mb-3 font-mono">
            Build
          </h2>
          <div className="rounded-lg border border-drift-border overflow-hidden">
            {platform.buildSteps.map((cmd, i) => {
              const isComment = cmd.startsWith("#");
              return (
                <div
                  key={i}
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
                    {cmd}
                  </code>
                  {!isComment && <CopyButton text={cmd} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-drift-border text-xs text-drift-muted font-mono">
          <p>Requires: Java 21+ (for mods) · Minecraft account · ~2GB disk for build</p>
          <p className="mt-1">License: GPL-3.0 · Not affiliated with Minecraft/Mojang</p>
        </div>
      </div>
    </section>
  );
}
