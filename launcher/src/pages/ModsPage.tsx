import { useEffect, useState } from "react";
import { Package, Search, Download, AlertCircle, Loader2, Power } from "lucide-react";
import { modrinthApi, profileApi, type ModrinthMod, type InstalledMod, type Profile } from "../api/tauri";

export default function ModsPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ModrinthMod[]>([]);
  const [installed, setInstalled] = useState<InstalledMod[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [installing, setInstalling] = useState<string | null>(null);
  const [showInstalled, setShowInstalled] = useState(false);

  useEffect(() => {
    profileApi.getActive().then(setActiveProfile).catch(() => {});
  }, []);

  const refreshInstalled = async () => {
    if (!activeProfile) return;
    try {
      const mods = await modrinthApi.listInstalled(activeProfile.id);
      setInstalled(mods);
    } catch (e) {
      // ignore — may not have mods dir yet
    }
  };

  useEffect(() => { refreshInstalled(); }, [activeProfile]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setError(null);
    try {
      const res = await modrinthApi.search(query, 20);
      setResults(res.hits);
    } catch (e) {
      setError(String(e));
    } finally {
      setSearching(false);
    }
  };

  const handleInstall = async (mod: ModrinthMod) => {
    if (!activeProfile) {
      setError("No active profile — create one first");
      return;
    }
    if (mod.versions.length === 0) {
      setError("No versions available for this mod");
      return;
    }
    setInstalling(mod.project_id);
    try {
      await modrinthApi.install(mod.project_id, mod.versions[0], activeProfile.id);
      refreshInstalled();
    } catch (e) {
      setError(String(e));
    } finally {
      setInstalling(null);
    }
  };

  const handleToggle = async (filename: string, enabled: boolean) => {
    if (!activeProfile) return;
    try {
      await modrinthApi.toggle(activeProfile.id, filename, !enabled);
      refreshInstalled();
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Mods</h1>
        <p className="text-drift-muted text-sm mt-1">
          {activeProfile ? `Managing mods for: ${activeProfile.name}` : "No active profile"}
        </p>
      </div>

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-drift-muted" />
          <input
            type="text"
            placeholder="Search mods on Modrinth..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-drift-bg border border-drift-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-drift-accent transition-colors"
          />
        </div>
        <button className="btn-primary text-sm px-4 py-2.5" onClick={handleSearch} disabled={searching}>
          {searching ? <Loader2 size={16} className="animate-spin" /> : "Search"}
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            showInstalled ? "bg-drift-bg text-drift-muted border border-drift-border" : "bg-drift-accent text-white"
          }`}
          onClick={() => setShowInstalled(false)}
        >
          Search Results
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            showInstalled ? "bg-drift-accent text-white" : "bg-drift-bg text-drift-muted border border-drift-border"
          }`}
          onClick={() => setShowInstalled(true)}
        >
          Installed ({installed.length})
        </button>
      </div>

      {showInstalled ? (
        <div className="grid grid-cols-1 gap-3">
          {installed.length === 0 ? (
            <div className="card p-8 text-center text-drift-muted text-sm">
              No mods installed yet. Search and install some!
            </div>
          ) : (
            installed.map((mod) => (
              <div key={mod.filename} className="card p-4 hover:border-drift-accent/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-drift-accent/15 to-drift-accent/5 border border-drift-border flex items-center justify-center flex-shrink-0">
                      <Package size={18} className="text-drift-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{mod.filename}</h3>
                      <p className="text-xs text-drift-muted mt-0.5">
                        {(mod.file_size / 1024 / 1024).toFixed(1)} MB · {mod.enabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`p-2 rounded-lg transition-colors ${mod.enabled ? "text-green-500 hover:bg-green-500/10" : "text-drift-muted hover:bg-drift-bg"}`}
                    onClick={() => handleToggle(mod.filename, mod.enabled)}
                  >
                    <Power size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {results.length === 0 && !searching && (
            <div className="card p-8 text-center text-drift-muted text-sm">
              Search for mods above to see results.
            </div>
          )}
          {results.map((mod) => (
            <div key={mod.project_id} className="card p-4 hover:border-drift-accent/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-drift-accent/15 to-drift-accent/5 border border-drift-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {mod.icon_url ? (
                    <img src={mod.icon_url} alt={mod.title} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={20} className="text-drift-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{mod.title}</h3>
                  <p className="text-xs text-drift-muted mt-1">{mod.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-drift-muted">
                    <span className="flex items-center gap-1">
                      <Download size={12} /> {mod.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  className="btn-secondary text-xs px-3 py-1.5 flex-shrink-0"
                  onClick={() => handleInstall(mod)}
                  disabled={installing === mod.project_id}
                >
                  {installing === mod.project_id ? <Loader2 size={14} className="animate-spin" /> : "Install"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
