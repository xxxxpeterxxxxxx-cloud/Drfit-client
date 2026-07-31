import { Settings, Cpu, MemoryStick, Palette, Folder, Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-drift-muted text-sm mt-1">Configure your Drift Client experience.</p>
      </div>

      <SettingsSection icon={Cpu} title="Performance">
        <ToggleRow label="Sodium" description="Rendering engine optimization" enabled />
        <ToggleRow label="Lithium" description="Game logic optimization" enabled />
        <ToggleRow label="FerriteCore" description="Memory usage reduction" enabled />
        <ToggleRow label="Iris Shaders" description="Shader pack support (disables some Sodium features)" enabled={false} />
      </SettingsSection>

      <SettingsSection icon={MemoryStick} title="Java & Memory">
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">RAM Allocation</label>
              <span className="text-sm font-mono text-drift-accent">4096 MB</span>
            </div>
            <div className="h-2 bg-drift-bg rounded-full">
              <div className="h-full bg-drift-accent rounded-full" style={{ width: "50%" }} />
            </div>
            <div className="flex justify-between text-xs text-drift-muted mt-1">
              <span>1024 MB</span>
              <span>8192 MB</span>
            </div>
          </div>
          <div>
            <label className="text-sm block mb-1.5">Java Path</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue="/usr/lib/jvm/java-21-openjdk/bin/java"
                className="flex-1 bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-drift-accent"
                readOnly
              />
              <button className="btn-secondary text-xs px-3 py-2">Browse</button>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection icon={Palette} title="Appearance">
        <ToggleRow label="Dark Mode" description="Use dark theme" enabled />
        <ToggleRow label="Compact Sidebar" description="Reduce sidebar width" enabled={false} />
        <ToggleRow label="Animations" description="Enable UI transitions" enabled />
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
          <InfoRow label="Drift Client Version" value="0.1.0-dev" />
          <InfoRow label="Launcher Framework" value="Tauri v2" />
          <InfoRow label="Mod Loader" value="Fabric" />
          <InfoRow label="License" value="GPL-3.0" />
        </div>
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

function ToggleRow({ label, description, enabled }: { label: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs text-drift-muted">{description}</p>
      </div>
      <button
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
