import { useEffect, useState, useCallback } from "react";
import {
  cipherApi,
  type BotHealth,
  type McServerStats,
  type McPlayer,
  type CipherConfig,
} from "../api/tauri";
import {
  Bot,
  Server,
  Play,
  Square,
  RotateCw,
  Terminal,
  Users,
  Zap,
  Activity,
  Settings,
  ChevronDown,
  ChevronRight,
  CircleDot,
} from "lucide-react";

export default function CipherPage() {
  const [config, setConfig] = useState<CipherConfig | null>(null);
  const [health, setHealth] = useState<BotHealth | null>(null);
  const [stats, setStats] = useState<{ guilds: number; members: number; uptime: number } | null>(null);
  const [mcStatus, setMcStatus] = useState<McServerStats | null>(null);
  const [players, setPlayers] = useState<McPlayer[]>([]);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const [cmdInput, setCmdInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cfgUrl, setCfgUrl] = useState("");
  const [cfgKey, setCfgKey] = useState("");
  const [cfgServer, setCfgServer] = useState("");
  const [showConsole, setShowConsole] = useState(true);

  const loadConfig = useCallback(async () => {
    try {
      const cfg = await cipherApi.getConfig();
      setConfig(cfg);
      setCfgUrl(cfg.api_url);
      setCfgKey(cfg.api_key);
      setCfgServer(cfg.mc_server_id);
    } catch (e) {
      setError(`Config load failed: ${e}`);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [h, s, p, st] = await Promise.all([
        cipherApi.health().catch(() => null),
        cipherApi.mcStatus().catch(() => null),
        cipherApi.mcPlayers().catch(() => []),
        cipherApi.stats().catch(() => null),
      ]);
      setHealth(h);
      setMcStatus(s);
      setPlayers(p);
      setStats(st);
    } catch (e: any) {
      setError(e?.toString() || "Failed to fetch");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (config) refreshAll();
    const interval = setInterval(() => {
      if (config) refreshAll();
    }, 10000);
    return () => clearInterval(interval);
  }, [config, refreshAll]);

  useEffect(() => {
    if (showConsole && config) loadConsole();
  }, [showConsole, config]);

  const sendCommand = async () => {
    if (!cmdInput.trim()) return;
    try {
      await cipherApi.mcCommand(cmdInput.trim());
      setCmdInput("");
      const logs = await cipherApi.mcConsole(30);
      setConsoleLines(logs.lines);
    } catch (e: any) {
      setError(e?.toString() || "Command failed");
    }
  };

  const loadConsole = async () => {
    try {
      const logs = await cipherApi.mcConsole(50);
      setConsoleLines(logs.lines);
    } catch (e: any) {
      setError(e?.toString() || "Console fetch failed");
    }
  };

  const saveConfig = async () => {
    try {
      await cipherApi.setConfig(cfgUrl, cfgKey, cfgServer);
      setConfig({ api_url: cfgUrl, api_key: cfgKey, mc_server_id: cfgServer });
      setShowSettings(false);
      refreshAll();
    } catch (e: any) {
      setError(e?.toString() || "Save failed");
    }
  };

  const botOnline = health?.status === "ok";
  const mcOnline = mcStatus?.online === true;
  const uptimeStr = stats
    ? `${Math.floor(stats.uptime / 86400)}d ${Math.floor((stats.uptime % 86400) / 3600)}h`
    : "—";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot size={24} className="text-drift-accent" />
            Cipher Integration
          </h1>
          <p className="text-drift-muted text-sm mt-1">
            Discord Bot & Minecraft Server control from your launcher
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-ghost text-sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={16} className="inline mr-1" />
            Settings
          </button>
          <button
            className="btn-ghost text-sm"
            onClick={refreshAll}
            disabled={loading}
          >
            <RotateCw size={16} className={`inline mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <Activity size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
          <button className="ml-auto text-xs text-red-400 hover:text-red-300" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Settings size={18} className="text-drift-muted" />
            Cipher Bot Connection
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-xs text-drift-muted">Bot API URL</label>
              <input
                type="text"
                value={cfgUrl}
                onChange={(e) => setCfgUrl(e.target.value)}
                placeholder="https://bluefin-1.tailb7ce7e.ts.net"
                className="w-full mt-1 bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-sm focus:border-drift-accent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-drift-muted">API Key</label>
              <input
                type="password"
                value={cfgKey}
                onChange={(e) => setCfgKey(e.target.value)}
                placeholder="x-api-key value"
                className="w-full mt-1 bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-sm focus:border-drift-accent outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-drift-muted">MC Server ID (in bot)</label>
              <input
                type="text"
                value={cfgServer}
                onChange={(e) => setCfgServer(e.target.value)}
                placeholder="e.g. ciphercraft"
                className="w-full mt-1 bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-sm focus:border-drift-accent outline-none"
              />
            </div>
          </div>
          <button className="btn-primary text-sm" onClick={saveConfig}>
            Save & Connect
          </button>
        </div>
      )}

      {/* Status Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bot Status Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${botOnline ? "bg-green-500/10" : "bg-red-500/10"}`}>
                <Bot size={20} className={botOnline ? "text-green-500" : "text-red-500"} />
              </div>
              <div>
                <p className="font-semibold">Cipher Bot</p>
                <p className="text-xs text-drift-muted">Cipher Bot v2</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${botOnline ? "text-green-500" : "text-red-500"}`}>
              <CircleDot size={10} fill="currentColor" />
              {botOnline ? "Online" : "Offline"}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatBox icon={Users} label="Guilds" value={stats?.guilds?.toString() ?? "—"} />
            <StatBox icon={Activity} label="Members" value={stats?.members?.toString() ?? "—"} />
            <StatBox icon={Zap} label="Uptime" value={uptimeStr} />
          </div>
        </div>

        {/* MC Server Status Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mcOnline ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                <Server size={20} className={mcOnline ? "text-green-500" : "text-yellow-500"} />
              </div>
              <div>
                <p className="font-semibold">MC Server</p>
                <p className="text-xs text-drift-muted">{mcStatus?.version ?? "Unknown version"}</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 text-xs ${mcOnline ? "text-green-500" : "text-yellow-500"}`}>
              <CircleDot size={10} fill="currentColor" />
              {mcOnline ? "Online" : "Offline"}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatBox icon={Users} label="Players" value={mcStatus ? `${mcStatus.players}/${mcStatus.max_players}` : "—"} />
            <StatBox icon={Zap} label="TPS" value={mcStatus?.tps?.toFixed(1) ?? "—"} />
            <StatBox icon={Activity} label="MOTD" value={mcStatus?.motd?.substring(0, 12) ?? "—"} />
          </div>
          {/* Server Controls */}
          <div className="flex gap-2 mt-4">
            <button className="btn-ghost text-xs flex items-center gap-1" onClick={() => cipherApi.mcStart().then(refreshAll)}>
              <Play size={14} /> Start
            </button>
            <button className="btn-ghost text-xs flex items-center gap-1" onClick={() => cipherApi.mcStop().then(refreshAll)}>
              <Square size={14} /> Stop
            </button>
            <button className="btn-ghost text-xs flex items-center gap-1" onClick={() => cipherApi.mcRestart().then(refreshAll)}>
              <RotateCw size={14} /> Restart
            </button>
          </div>
        </div>
      </div>

      {/* Online Players */}
      <div className="card p-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Users size={18} className="text-drift-muted" />
          Online Players ({players.length})
        </h2>
        {players.length === 0 ? (
          <p className="text-sm text-drift-muted">No players online.</p>
        ) : (
          <div className="space-y-2">
            {players.map((p) => (
              <div key={p.uuid} className="flex items-center gap-3 py-1.5">
                <div className="w-8 h-8 rounded-lg bg-drift-bg flex items-center justify-center text-xs font-bold">
                  {p.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="text-sm">{p.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Console */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <button
            className="font-semibold flex items-center gap-2 text-sm"
            onClick={() => {
              setShowConsole(!showConsole);
              if (!showConsole) loadConsole();
            }}
          >
            {showConsole ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Terminal size={18} className="text-drift-muted" />
            Server Console
          </button>
          <button className="text-xs text-drift-muted hover:text-drift-text" onClick={loadConsole}>
            Load logs
          </button>
        </div>
        {showConsole && (
          <>
            <div className="bg-drift-bg rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs space-y-0.5 mb-3">
              {consoleLines.length === 0 ? (
                <p className="text-drift-muted">Click "Load logs" to fetch console output.</p>
              ) : (
                consoleLines.map((line, i) => (
                  <div key={i} className="text-drift-muted leading-tight">
                    {line}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendCommand()}
                placeholder="Type a command... (e.g. list, say Hello, tp Player1 Player2)"
                className="flex-1 bg-drift-bg border border-drift-border rounded-lg px-3 py-2 text-sm font-mono focus:border-drift-accent outline-none"
              />
              <button className="btn-primary text-sm" onClick={sendCommand}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-drift-bg rounded-lg p-3">
      <Icon size={14} className="text-drift-muted mb-1" />
      <p className="text-xs text-drift-muted">{label}</p>
      <p className="text-sm font-semibold truncate">{value}</p>
    </div>
  );
}
