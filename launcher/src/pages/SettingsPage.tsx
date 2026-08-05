import { useState } from "react";
import { Cpu, MemoryStick, Palette, Folder, Info, RotateCcw, Zap, ScrollText, ExternalLink, Gamepad2, Search } from "lucide-react";
import { useSettingsStore } from "../store/settingsStore";
import { minecraftApi } from "../api/tauri";

const ACCENT_COLORS = [
  { name: "Emerald", value: "#10B981" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Red", value: "#EF4444" },
  { name: "Indigo", value: "#6366F1" },
];

export default function SettingsPage() {
  const s = useSettingsStore();
  const [showReset, setShowReset] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-drift-muted text-sm mt-1">Configure your Drift Client experience.</p>
        </div>
        <button className="btn-ghost text-xs flex items-center gap-1.5" onClick={() => setShowReset(true)}>
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {showReset && (
        <div className="card p-4 border-amber-500/30 bg-amber-500/5 flex items-center justify-between">
          <p className="text-sm text-amber-500">Reset all settings to defaults?</p>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs" onClick={() => setShowReset(false)}>Cancel</button>
            <button
              className="btn-primary text-xs"
              onClick={() => { s.reset(); setShowReset(false); }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <SettingsSection icon={Cpu} title="Performance">
        <ToggleRow label="Sodium" description="Rendering engine optimization" enabled={s.sodium} onToggle={() => s.toggle("sodium")} />
        <ToggleRow label="Lithium" description="Game logic optimization" enabled={s.lithium} onToggle={() => s.toggle("lithium")} />
        <ToggleRow label="FerriteCore" description="Memory usage reduction" enabled={s.ferriteCore} onToggle={() => s.toggle("ferriteCore")} />
        <ToggleRow label="Iris Shaders" description="Shader pack support (disables some Sodium features)" enabled={s.iris} onToggle={() => s.toggle("iris")} />
      </SettingsSection>

      <SettingsSection icon={MemoryStick} title="Java & Memory">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">RAM Allocation</label>
              <span className="text-sm font-mono text-drift-accent">{s.ramLimit} MB</span>
            </div>
            <input
              type="range"
              min={1024}
              max={16384}
              step={512}
              value={s.ramLimit}
              onChange={(e) => s.set("ramLimit", Number(e.target.value))}
              className="w-full h-2 bg-drift-bg rounded-full appearance-none cursor-pointer accent-drift-accent"
            />
            <div className="flex justify-between text-xs text-drift-muted mt-1">
              <span>1024 MB</span>
              <span>16384 MB</span>
            </div>
          </div>
          <div>
            <label className="text-sm block mb-1.5">Java Path</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={s.javaPath}
                onChange={(e) => s.set("javaPath", e.target.value)}
                className="flex-1 w-full bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-drift-accent"
              />
              <button
                className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 whitespace-nowrap"
                onClick={async () => {
                  try {
                    const path = await minecraftApi.detectJavaPath();
                    s.set("javaPath", path);
                  } catch (e) {
                    console.error("Java detection failed:", e);
                  }
                }}
              >
                <Search size={12} />
                Auto-detect
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm block mb-1.5">JVM Arguments</label>
            <input
              type="text"
              value={s.javaArgs}
              onChange={(e) => s.set("javaArgs", e.target.value)}
              className="flex-1 w-full bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-drift-accent"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection icon={Palette} title="Appearance">
        <ToggleRow label="Dark Mode" description="Use dark theme" enabled={s.darkMode} onToggle={() => s.toggle("darkMode")} />
        <ToggleRow label="Compact Sidebar" description="Reduce sidebar width" enabled={s.compactSidebar} onToggle={() => s.toggle("compactSidebar")} />
        <ToggleRow label="Animations" description="Enable UI transitions" enabled={s.animations} onToggle={() => s.toggle("animations")} />
        <div className="py-2">
          <label className="text-sm block mb-2">Accent Color</label>
          <div className="flex gap-2 flex-wrap">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => s.set("accentColor", c.value)}
                className={`w-8 h-8 rounded-lg transition-all ${s.accentColor === c.value ? "ring-2 ring-offset-2 ring-offset-drift-surface ring-white scale-110" : "hover:scale-105"}`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm">Border Radius</label>
            <span className="text-sm font-mono text-drift-accent">{s.borderRadius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={24}
            step={1}
            value={s.borderRadius}
            onChange={(e) => s.set("borderRadius", Number(e.target.value))}
            className="w-full h-2 bg-drift-bg rounded-full appearance-none cursor-pointer accent-drift-accent"
          />
        </div>
      </SettingsSection>

      <SettingsSection icon={Gamepad2} title="In-Game HUD">
        <ToggleRow label="Armor HUD" description="Show armor durability bar" enabled={s.hudArmor} onToggle={() => s.toggle("hudArmor")} />
        <ToggleRow label="Potion HUD" description="Show active potion effects" enabled={s.hudPotion} onToggle={() => s.toggle("hudPotion")} />
        <ToggleRow label="Speed HUD" description="Show movement speed" enabled={s.hudSpeed} onToggle={() => s.toggle("hudSpeed")} />
        <ToggleRow label="Biome HUD" description="Show current biome" enabled={s.hudBiome} onToggle={() => s.toggle("hudBiome")} />
        <ToggleRow label="Direction HUD" description="Show facing direction" enabled={s.hudDirection} onToggle={() => s.toggle("hudDirection")} />
        <ToggleRow label="Watermark" description="Show Drift Client watermark" enabled={s.hudWatermark} onToggle={() => s.toggle("hudWatermark")} />
        <ToggleRow label="FPS Graph" description="Show FPS history graph" enabled={s.hudFpsGraph} onToggle={() => s.toggle("hudFpsGraph")} />
        <ToggleRow label="Memory HUD" description="Show JVM memory usage" enabled={s.hudMemory} onToggle={() => s.toggle("hudMemory")} />
      </SettingsSection>

      <SettingsSection icon={Zap} title="Launcher Features">
        <ToggleRow label="Discord Rich Presence" description="Show Drift in your Discord status" enabled={s.discordRpc} onToggle={() => s.toggle("discordRpc")} />
        <ToggleRow label="Auto-Update Mods" description="Download mod updates automatically" enabled={s.autoUpdate} onToggle={() => s.toggle("autoUpdate")} />
        <ToggleRow label="Close on Launch" description="Close launcher when game starts" enabled={s.closeOnLaunch} onToggle={() => s.toggle("closeOnLaunch")} />
        <ToggleRow label="Show News Feed" description="Display Minecraft news on home page" enabled={s.showNews} onToggle={() => s.toggle("showNews")} />
      </SettingsSection>

      <SettingsSection icon={Folder} title="Directories">
        <div className="space-y-3">
          <DirRow label="Minecraft Directory" path="~/.minecraft" />
          <DirRow label="Mods Directory" path="~/.minecraft/mods" />
          <DirRow label="Drift Config" path="~/.minecraft/config/drift" />
        </div>
      </SettingsSection>

      <SettingsSection icon={Info} title="About">
        <div className="space-y-2 text-sm">
          <InfoRow label="Drift Client Version" value="0.2.0" />
          <InfoRow label="Launcher Framework" value="Tauri v2" />
          <InfoRow label="Mod Loader" value="Fabric" />
          <InfoRow label="License" value="GPL-3.0" />
        </div>
        <button
          className="btn-secondary text-sm flex items-center gap-2 mt-3 w-full justify-center"
          onClick={() => window.open("https://drift-client.vercel.app/licenses", "_blank")}
        >
          <ScrollText size={14} />
          View Open Source Licenses
          <ExternalLink size={12} className="text-drift-muted" />
        </button>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-drift-accent" />
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-drift-muted">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? "bg-drift-accent" : "bg-drift-border"}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function DirRow({ label, path }: { label: string; path: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-drift-muted font-mono">{path}</p>
      </div>
      <button className="btn-secondary text-xs px-2.5 py-1.5">Open</button>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-drift-muted">{label}</span>
      <span className="font-mono text-xs">{value}</span>
    </div>
  );
}
