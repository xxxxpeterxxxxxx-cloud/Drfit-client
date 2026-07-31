import { useEffect, useState } from "react";
import { Layers, Plus, Check, Trash2, AlertCircle } from "lucide-react";
import { profileApi, type Profile } from "../api/tauri";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newVersion, setNewVersion] = useState("1.21.1");
  const [newLoader, setNewLoader] = useState("fabric");

  const load = async () => {
    try {
      const [list, active] = await Promise.all([profileApi.list(), profileApi.getActive()]);
      setProfiles(list);
      setActiveId(active?.id ?? null);
    } catch (e) {
      setError(String(e));
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await profileApi.create(newName, newVersion, newLoader);
      setNewName("");
      setShowCreate(false);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await profileApi.delete(id);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      await profileApi.setActive(id);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profiles</h1>
          <p className="text-drift-muted text-sm mt-1">Switch between Minecraft versions and mod configurations.</p>
        </div>
        <button className="btn-primary text-sm" onClick={() => setShowCreate(!showCreate)}>
          <Plus size={16} />
          New Profile
        </button>
      </div>

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      {showCreate && (
        <div className="card p-5 space-y-3">
          <h3 className="font-semibold text-sm">Create New Profile</h3>
          <input
            type="text"
            placeholder="Profile name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-drift-bg border border-drift-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-drift-accent"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Minecraft version"
              value={newVersion}
              onChange={(e) => setNewVersion(e.target.value)}
              className="flex-1 bg-drift-bg border border-drift-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-drift-accent"
            />
            <select
              value={newLoader}
              onChange={(e) => setNewLoader(e.target.value)}
              className="bg-drift-bg border border-drift-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-drift-accent"
            >
              <option value="fabric">Fabric</option>
              <option value="legacy-fabric">Legacy Fabric</option>
              <option value="vanilla">Vanilla</option>
            </select>
          </div>
          <button className="btn-primary text-sm" onClick={handleCreate}>Create</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`card p-5 transition-colors cursor-pointer ${
              activeId === profile.id ? "border-drift-accent/50 bg-drift-accent/5" : "hover:border-drift-accent/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeId === profile.id ? "bg-drift-accent/20" : "bg-drift-bg border border-drift-border"
                }`}>
                  <Layers size={20} className={activeId === profile.id ? "text-drift-accent" : "text-drift-muted"} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{profile.name}</h3>
                    {activeId === profile.id && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 flex items-center gap-1">
                        <Check size={10} /> Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-drift-muted">
                    <span>MC {profile.minecraft_version}</span>
                    <span>·</span>
                    <span>{profile.mod_loader}</span>
                    <span>·</span>
                    <span>Java {profile.java_version}</span>
                    <span>·</span>
                    <span>{profile.ram_limit}MB RAM</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeId !== profile.id && (
                  <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => handleSetActive(profile.id)}>
                    Set Active
                  </button>
                )}
                <button
                  className="text-drift-muted hover:text-red-500 p-1.5 transition-colors"
                  onClick={() => handleDelete(profile.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {profiles.length === 0 && !showCreate && (
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
      )}
    </div>
  );
}
