"use client";

import { Monitor, Cpu, MemoryStick } from "lucide-react";

export function Showcase() {
  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
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
            <div className="card p-2 rounded-2xl shadow-2xl shadow-drift-accent/10">
              <div className="rounded-xl overflow-hidden bg-drift-bg">
                {/* Mock launcher UI */}
                <div className="flex">
                  <div className="w-48 bg-drift-surface p-3 border-r border-drift-border min-h-[400px]">
                    <div className="space-y-1">
                      {["Home", "Mods", "Cosmetics", "Profiles", "Cipher", "Account", "Settings"].map((item, i) => (
                        <div
                          key={item}
                          className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            i === 0
                              ? "bg-drift-accent/10 text-drift-accent font-medium"
                              : "text-drift-muted hover:text-drift-text-secondary"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="text-xl font-bold mb-1">Welcome to Drift</div>
                    <div className="text-sm text-drift-muted mb-6">Everything you need. Nothing you don&apos;t.</div>
                    <div className="card p-4 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-drift-accent/20 flex items-center justify-center">
                          <span className="text-drift-accent font-bold">▶</span>
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Quick Launch</div>
                          <div className="text-xs text-drift-muted">Drift 1.21.x — Fabric</div>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-lg bg-drift-accent text-white text-sm font-medium">
                        Play
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {["1.21.x", "0 mods", "0h"].map((val, i) => (
                        <div key={i} className="card p-3">
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
      <div className="w-10 h-10 rounded-xl bg-drift-surface border border-drift-border flex items-center justify-center">
        <Icon size={18} className="text-drift-accent" />
      </div>
      <div>
        <div className="text-sm text-drift-muted">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}
