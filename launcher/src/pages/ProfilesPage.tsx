import { Layers, Plus, Check, MoreVertical } from "lucide-react";

const profiles = [
  { name: "Drift 1.21.x", version: "1.21.1", loader: "Fabric 0.15.11", mods: 6, active: true, java: "Java 21" },
  { name: "Bedwars 1.8.9", version: "1.8.9", loader: "Legacy Fabric 0.16", mods: 4, active: false, java: "Java 8" },
  { name: "Skyblock 1.21", version: "1.21.1", loader: "Fabric 0.15.11", mods: 12, active: false, java: "Java 21" },
];

export default function ProfilesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profiles</h1>
          <p className="text-drift-muted text-sm mt-1">Switch between Minecraft versions and mod configurations.</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={16} />
          New Profile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            className={`card p-5 transition-colors cursor-pointer ${
              profile.active ? "border-drift-accent/50 bg-drift-accent/5" : "hover:border-drift-accent/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  profile.active ? "bg-drift-accent/20" : "bg-drift-bg border border-drift-border"
                }`}>
                  <Layers size={20} className={profile.active ? "text-drift-accent" : "text-drift-muted"} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{profile.name}</h3>
                    {profile.active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 flex items-center gap-1">
                        <Check size={10} /> Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-drift-muted">
                    <span>MC {profile.version}</span>
                    <span>·</span>
                    <span>{profile.loader}</span>
                    <span>·</span>
                    <span>{profile.mods} mods</span>
                    <span>·</span>
                    <span>{profile.java}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!profile.active && (
                  <button className="btn-secondary text-xs px-3 py-1.5">Set Active</button>
                )}
                <button className="text-drift-muted hover:text-drift-text p-1">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5 border-dashed">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl border border-dashed border-drift-border flex items-center justify-center">
            <Plus size={20} className="text-drift-muted" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Create New Profile</h3>
            <p className="text-xs text-drift-muted mt-0.5">
              Set up a new Minecraft version with custom mods and settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
