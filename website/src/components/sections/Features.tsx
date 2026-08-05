"use client";

import { Zap, Monitor, Gamepad2, Settings, Package, Layers, Eye, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Performance",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    items: ["Sodium + Lithium + FerriteCore", "Gamma override (Fullbright)", "~10MB launcher (Tauri v2, no Electron)"],
  },
  {
    icon: Eye,
    title: "HUD",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    items: ["FPS, Ping, CPS, Coordinates", "Keystrokes overlay", "Drag & drop positioning", "Toggle bars & animations"],
  },
  {
    icon: MousePointerClick,
    title: "QoL",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    items: ["Toggle Sprint/Sneak", "Adjustable Zoom", "Custom Crosshair"],
  },
  {
    icon: Monitor,
    title: "Launcher",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    items: ["Microsoft auth (device code flow)", "Multi-account switcher", "Profile presets (export/import)", "Cipher Bot integration"],
  },
  {
    icon: Package,
    title: "Mods",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    items: ["Modrinth browser built-in", "CurseForge search & install", "Import .jar files", "One-click install", "Enable/disable without restart"],
  },
  {
    icon: Layers,
    title: "Versions",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    items: ["Fabric 1.21+ (Java 21)", "Fabric 1.8.9 (Legacy, PvP)", "Auto-download assets"],
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-drift-border/60 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-drift-bg-secondary/40 to-transparent pointer-events-none" />
      <div className="container-max relative">
        <div className="text-center mb-16">
          <div className="section-label">
            <Settings size={12} className="text-drift-accent" />
            <span>Everything included</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-balance">
            What&apos;s in the box
          </h2>
          <p className="text-sm text-drift-muted font-mono">
            No bloat. No ads. No tracking. Everything toggleable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((group, i) => (
            <div
              key={group.title}
              className="card-glow group p-6 rounded-2xl bg-drift-surface/40 border border-drift-border hover:border-drift-border-light hover:bg-drift-surface/60 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${group.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <group.icon size={22} className={group.color} />
              </div>
              <h3 className="text-base font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-drift-text-secondary flex items-start gap-2">
                    <span className="text-drift-accent mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl bg-drift-surface/30 border border-drift-border/60 text-center">
          <p className="text-sm text-drift-muted">
            <span className="text-drift-accent font-semibold">Fair-play only.</span> No cheats, no X-ray, no aimbot.
            Designed to be allowed on Hypixel, GommeHD, CubeCraft.
          </p>
        </div>
      </div>
    </section>
  );
}
