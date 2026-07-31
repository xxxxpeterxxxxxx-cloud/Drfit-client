"use client";

import { motion } from "framer-motion";
import { Download, Apple, Monitor, Terminal } from "lucide-react";

const platforms = [
  {
    icon: Monitor,
    name: "Windows",
    description: "Windows 10/11 (64-bit)",
    size: "~10 MB",
    format: ".msi / .exe",
  },
  {
    icon: Apple,
    name: "macOS",
    description: "macOS 11+ (Universal)",
    size: "~12 MB",
    format: ".dmg",
  },
  {
    icon: Terminal,
    name: "Linux",
    description: "Most distributions",
    size: "~10 MB",
    format: ".AppImage / .deb",
  },
];

export function DownloadPage() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 text-center hover:border-drift-accent/50 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-drift-accent/10 flex items-center justify-center mx-auto mb-4">
                <platform.icon size={28} className="text-drift-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-1">{platform.name}</h3>
              <p className="text-sm text-drift-muted mb-4">{platform.description}</p>
              <div className="flex justify-center gap-4 text-xs text-drift-muted mb-6">
                <span>{platform.size}</span>
                <span>·</span>
                <span>{platform.format}</span>
              </div>
              <button className="btn-primary w-full" disabled>
                <Download size={18} />
                Coming Soon
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-drift-muted">
          <p>
            Drift Client v0.1.0 is currently in development.
            Star us on GitHub to get notified when the first release drops.
          </p>
        </div>
      </div>
    </section>
  );
}
