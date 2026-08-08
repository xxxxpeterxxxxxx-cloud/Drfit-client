"use client";

import { Monitor, Cpu, MemoryStick } from "lucide-react";

export function Showcase() {
  return (
    <section id="showcase" className="py-24 border-t-2 border-drift-border relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade opacity-40" />
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-6">
              A launcher that <span className="text-gradient">gets out of your way</span>
            </h2>
            <p className="text-lg text-drift-text-secondary mb-8 leading-relaxed">
              Built with Tauri v2 — the launcher is only ~10MB, starts instantly,
              and uses minimal RAM. No Electron bloat, no background processes
              eating your system resources.
            </p>

            <div className="space-y-4">
              <Stat icon={Monitor} label="Launcher Size" value="~10 MB" />
              <Stat icon={MemoryStick} label="RAM Usage" value="< 50 MB" />
              <Stat icon={Cpu} label="Framework" value="Rust + React" />
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <div className="card p-2 shadow-2xl shadow-drift-accent/5 pixel-border border-drift-border" style={{ borderRadius: '4px' }}>
              <div className="overflow-hidden bg-drift-bg" style={{ borderRadius: '4px' }}>
                {/* Mock launcher UI */}
                <div className="flex">
                  <div className="w-48 bg-drift-surface/60 p-3 border-r-2 border-drift-border min-h-[400px]">
                    <div className="space-y-1">
                      {["Home", "Mods", "Cosmetics", "Profiles", "Cipher", "Account", "Settings"].map((item, i) => (
                        <div
                          key={item}
                          className={`px-3 py-2.5 text-sm transition-colors ${
                            i === 0
                              ? "bg-drift-mc-green/10 text-drift-mc-green font-medium"
                              : "text-drift-muted hover:text-drift-text-secondary"
                          }`}
                          style={{ borderRadius: '4px' }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="text-xl font-bold mb-1 font-pixel text-[14px]">Welcome to Drift</div>
                    <div className="text-sm text-drift-muted mb-6">Everything you need. Nothing you don&apos;t.</div>
                    <div className="card p-4 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-drift-mc-green/20 flex items-center justify-center" style={{ borderRadius: '4px' }}>
                          <span className="text-drift-mc-green font-bold">▶</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Quick Launch</div>
                          <div className="text-xs text-drift-muted">Drift 1.21.x — Fabric</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-drift-mc-green text-white text-sm font-medium" style={{ borderRadius: '4px' }}>
                        Play
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["1.21.x", "0 mods", "0h"].map((val, i) => (
                        <div key={i} className="card p-3" style={{ borderRadius: '4px' }}>
                          <div className="text-xs text-drift-muted">
                            {["Active Profile", "Mods Installed", "Playtime"][i]}
                          </div>
                          <div className="text-sm font-semibold mt-1">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-drift-surface border-2 border-drift-border flex items-center justify-center" style={{ borderRadius: '4px' }}>
        <Icon size={18} className="text-drift-mc-green" />
      </div>
      <div>
        <div className="text-sm text-drift-muted">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}
