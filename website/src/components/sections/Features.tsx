"use client";

const features = [
  {
    title: "Performance",
    items: ["Sodium + Lithium + FerriteCore", "Gamma override (Fullbright)", "~10MB launcher (Tauri v2, no Electron)"],
  },
  {
    title: "HUD",
    items: ["FPS, Ping, CPS, Coordinates", "Keystrokes overlay", "Drag & drop positioning"],
  },
  {
    title: "QoL",
    items: ["Toggle Sprint/Sneak", "Adjustable Zoom", "Custom Crosshair"],
  },
  {
    title: "Launcher",
    items: ["Microsoft auth (device code flow)", "Multi-account switcher", "Profile presets (export/import)"],
  },
  {
    title: "Mods",
    items: ["Modrinth browser built-in", "One-click install", "Enable/disable without restart"],
  },
  {
    title: "Versions",
    items: ["Fabric 1.21+ (Java 21)", "Fabric 1.8.9 (Legacy, PvP)", "Auto-download assets"],
  },
];

export function Features() {
  return (
    <section className="py-20 border-t border-drift-border">
      <div className="container-max">
        <h2 className="text-2xl font-bold mb-2">What&apos;s in the box</h2>
        <p className="text-sm text-drift-muted mb-12 font-mono">
          No bloat. No ads. No tracking. Everything toggleable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {features.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-drift-accent mb-4 font-mono">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-drift-text-secondary flex items-start gap-2">
                    <span className="text-drift-muted mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-drift-border">
          <p className="text-sm text-drift-muted">
            Fair-play only. No cheats, no X-ray, no aimbot.
            Designed to be allowed on Hypixel, GommeHD, CubeCraft.
          </p>
        </div>
      </div>
    </section>
  );
}
