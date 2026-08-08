"use client";

import { Zap, Monitor, Gamepad2, Settings, Package, Layers, Eye, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Performance",
    color: "text-drift-accent",
    bgColor: "bg-drift-accent/10",
    items: ["Sodium + Lithium + FerriteCore", "Gamma override (Fullbright)", "~10MB launcher (Tauri v2, no Electron)"],
  },
  {
    icon: Eye,
    title: "HUD",
    color: "text-drift-mc-green",
    bgColor: "bg-drift-mc-green/10",
    items: ["FPS, Ping, CPS, Coordinates", "Keystrokes overlay", "Drag & drop positioning", "Toggle bars & animations"],
  },
  {
    icon: MousePointerClick,
    title: "QoL",
    color: "text-drift-mc-diamond",
    bgColor: "bg-drift-mc-diamond/10",
    items: ["Toggle Sprint/Sneak", "Adjustable Zoom", "Custom Crosshair"],
  },
  {
    icon: Monitor,
    title: "Launcher",
    color: "text-drift-accent-light",
    bgColor: "bg-drift-accent-light/10",
    items: ["Microsoft auth (device code flow)", "Multi-account switcher", "Profile presets (export/import)", "Cipher Bot integration"],
  },
  {
    icon: Package,
    title: "Mods",
    color: "text-drift-mc-gold",
    bgColor: "bg-drift-mc-gold/10",
    items: ["Modrinth browser built-in", "CurseForge search & install", "Import .jar files", "One-click install", "Enable/disable without restart"],
  },
  {
    icon: Layers,
    title: "Versions",
    color: "text-drift-mc-green-light",
    bgColor: "bg-drift-mc-green-light/10",
    items: ["Fabric 1.21+ (Java 21)", "Fabric 1.8.9 (Legacy, PvP)", "Auto-download assets"],
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t-2 border-drift-border relative">
      <div className="absolute inset-0 bg-gradient-to-b from-drift-bg-secondary/40 to-transparent pointer-events-none" />
      <div className="container-max relative">
        <div className="text-center mb-16">
          <div className="section-label font-pixel text-[10px]">
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
              className="card-glow group p-6 bg-drift-surface/40 border-2 border-drift-border hover:border-drift-border-light hover:bg-drift-surface/60 transition-all duration-300 animate-fade-in-up pixel-shadow hover:translate-x-0.5 hover:translate-y-0.5"
              style={{ animationDelay: `${i * 0.08}s`, borderRadius: '4px' }}
            >
              <div className={`w-12 h-12 ${group.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`} style={{ borderRadius: '4px' }}>
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

        <div className="mt-16 p-6 bg-drift-surface/30 border-2 border-drift-border/60 text-center" style={{ borderRadius: '4px' }}>
          <p className="text-sm text-drift-muted">
            <span className="text-drift-mc-green font-semibold">Fair-play only.</span> No cheats, no X-ray, no aimbot.
            Designed to be allowed on Hypixel, GommeHD, CubeCraft.
          </p>
        </div>
      </div>
    </section>
  );
}
