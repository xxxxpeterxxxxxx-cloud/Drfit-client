import { useEffect, useState } from "react";
import { Package, Search, Download, AlertCircle, Loader2, Power, Upload, Key, X, Globe } from "lucide-react";
import { modrinthApi, curseforgeApi, profileApi, type ModrinthMod, type InstalledMod, type Profile, type CFMod, type CFFile } from "../api/tauri";

type Source = "modrinth" | "curseforge";

export default function ModsPage() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<Source>("modrinth");
  const [results, setResults] = useState<ModrinthMod[]>([]);
  const [cfResults, setCfResults] = useState<CFMod[]>([]);
  const [installed, setInstalled] = useState<InstalledMod[]>([]);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [installing, setInstalling] = useState<string | null>(null);
  const [showInstalled, setShowInstalled] = useState(false);
  const [showCfKey, setShowCfKey] = useState(false);
  const [cfKey, setCfKey] = useState("");
  const [cfFiles, setCfFiles] = useState<Record<number, CFFile[]>>({});
  const [expandedMod, setExpandedMod] = useState<number | null>(null);

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
      if (source === "modrinth") {
        const res = await modrinthApi.search(query, 20);
        setResults(res.hits);
      } else {
        const res = await curseforgeApi.search(query);
        setCfResults(res);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setSearching(false);
    }
  };

  const handleInstall = async (mod: ModrinthMod) => {
    if (!activeProfile) { setError("No active profile — create one first"); return; }
    if (mod.versions.length === 0) { setError("No versions available for this mod"); return; }
    setInstalling(mod.project_id);
    try {
      await modrinthApi.install(mod.project_id, mod.versions[0], activeProfile.id);
      refreshInstalled();
    } catch (e) { setError(String(e)); } finally { setInstalling(null); }
  };

  const handleCfInstall = async (file: CFFile) => {
    if (!activeProfile) { setError("No active profile"); return; }
    setInstalling(file.id.toString());
    try {
      await curseforgeApi.install(file.download_url, file.file_name, activeProfile.id);
      refreshInstalled();
    } catch (e) { setError(String(e)); } finally { setInstalling(null); }
  };

  const handleToggle = async (filename: string, enabled: boolean) => {
    if (!activeProfile) return;
    try {
      await modrinthApi.toggle(activeProfile.id, filename, !enabled);
      refreshInstalled();
    } catch (e) { setError(String(e)); }
  };

  const handleImport = async () => {
    if (!activeProfile) { setError("No active profile"); return; }
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".jar,.zip,.disabled";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        setInstalling("import-" + file.name);
        try {
          // Tauri provides file.path on File objects in webview
          const filePath = (file as any).path || file.name;
          await curseforgeApi.importMod(activeProfile.id, filePath);
          refreshInstalled();
        } catch (err) { setError(String(err)); } finally { setInstalling(null); }
      };
      input.click();
    } catch (e) { setError(String(e)); }
  };

  const handleSaveCfKey = async () => {
    try {
      await curseforgeApi.setKey(cfKey);
      setShowCfKey(false);
      setError(null);
    } catch (e) { setError(String(e)); }
  };

  const loadCfFiles = async (modId: number) => {
    if (cfFiles[modId]) {
      setExpandedMod(expandedMod === modId ? null : modId);
      return;
    }
    try {
      const files = await curseforgeApi.files(modId);
      setCfFiles({ ...cfFiles, [modId]: files });
      setExpandedMod(modId);
    } catch (e) { setError(String(e)); }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mods</h1>
          <p className="text-drift-muted text-sm mt-1">
            {activeProfile ? `Managing mods for: ${activeProfile.name}` : "No active profile"}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost text-sm flex items-center gap-1.5" onClick={handleImport} disabled={!activeProfile || installing?.startsWith("import")}>
            {installing?.startsWith("import") ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Import
          </button>
          <button className="btn-ghost text-sm flex items-center gap-1.5" onClick={() => setShowCfKey(!showCfKey)}>
            <Key size={14} />
            CF Key
          </button>
        </div>
      </div>

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
          <button className="ml-auto text-xs text-red-400 hover:text-red-300" onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {showCfKey && (
        <div className="card p-6 space-y-4 border-drift-accent/30">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm flex items-center gap-2">
              <Key size={16} className="text-drift-accent" />
              CurseForge API Key
            </h2>
            <button onClick={() => setShowCfKey(false)} className="text-drift-muted hover:text-drift-text">
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-drift-muted">
            Get a free API key at{" "}
            <a href="https://console.curseforge.com/" target="_blank" rel="noopener" className="text-drift-accent hover:underline">
              console.curseforge.com
            </a>
          </p>
          <input
            type="password"
            value={cfKey}
            onChange={(e) => setCfKey(e.target.value)}
            placeholder="$2a$10$..."
            className="w-full bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-sm font-mono focus:border-drift-accent outline-none"
          />
          <button className="btn-primary text-sm" onClick={handleSaveCfKey}>Save Key</button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${source === "modrinth" ? "bg-drift-accent text-white" : "bg-drift-bg text-drift-muted border border-drift-border"}`}
          onClick={() => { setSource("modrinth"); setResults([]); setCfResults([]); }}
        >
          <Globe size={12} className="inline mr-1" /> Modrinth
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${source === "curseforge" ? "bg-drift-accent text-white" : "bg-drift-bg text-drift-muted border border-drift-border"}`}
          onClick={() => { setSource("curseforge"); setResults([]); setCfResults([]); }}
        >
          <Package size={12} className="inline mr-1" /> CurseForge
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-drift-muted" />
          <input
            type="text"
            placeholder={`Search mods on ${source === "modrinth" ? "Modrinth" : "CurseForge"}...`}
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

      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!showInstalled ? "bg-drift-accent text-white" : "bg-drift-bg text-drift-muted border border-drift-border"}`}
          onClick={() => setShowInstalled(false)}
        >
          Search Results
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${showInstalled ? "bg-drift-accent text-white" : "bg-drift-bg text-drift-muted border border-drift-border"}`}
          onClick={() => setShowInstalled(true)}
        >
          Installed ({installed.length})
        </button>
      </div>

      {showInstalled ? (
        <div className="grid grid-cols-1 gap-3">
          {installed.length === 0 ? (
            <div className="card p-8 text-center text-drift-muted text-sm">
              No mods installed yet. Search and install some, or use Import to add a .jar file.
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
      ) : source === "modrinth" ? (
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
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {cfResults.length === 0 && !searching && (
            <div className="card p-8 text-center text-drift-muted text-sm">
              {cfKey === "" ? "Set your CurseForge API key first (CF Key button above)." : "Search for mods above to see results."}
            </div>
          )}
          {cfResults.map((mod) => (
            <div key={mod.id} className="card p-4 hover:border-drift-accent/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-drift-accent/15 to-drift-accent/5 border border-drift-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {mod.icon_url ? (
                    <img src={mod.icon_url} alt={mod.name} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={20} className="text-drift-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{mod.name}</h3>
                  <p className="text-xs text-drift-muted mt-1">{mod.summary}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-drift-muted">
                    <span className="flex items-center gap-1">
                      <Download size={12} /> {Math.round(mod.download_count).toLocaleString()}
                    </span>
                    {mod.categories.length > 0 && (
                      <span>{mod.categories.slice(0, 3).join(", ")}</span>
                    )}
                  </div>
                  {expandedMod === mod.id && cfFiles[mod.id] && (
                    <div className="mt-3 space-y-1.5 border-t border-drift-border pt-3">
                      {cfFiles[mod.id].slice(0, 10).map((file) => (
                        <div key={file.id} className="flex items-center justify-between gap-2 py-1">
                          <div className="text-xs min-w-0 flex-1">
                            <span className="text-drift-text">{file.file_name}</span>
                            <span className="text-drift-muted ml-2">
                              {(file.file_length / 1024 / 1024).toFixed(1)} MB
                            </span>
                            {file.game_versions.length > 0 && (
                              <span className="text-drift-muted ml-2">
                                {file.game_versions.slice(-3).join(", ")}
                              </span>
                            )}
                          </div>
                          <button
                            className="btn-secondary text-xs px-2 py-1 flex-shrink-0"
                            onClick={() => handleCfInstall(file)}
                            disabled={installing === file.id.toString()}
                          >
                            {installing === file.id.toString() ? <Loader2 size={12} className="animate-spin" /> : "Install"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="btn-secondary text-xs px-3 py-1.5 flex-shrink-0"
                  onClick={() => loadCfFiles(mod.id)}
                >
                  {expandedMod === mod.id ? "Hide" : "Files"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
