import { useEffect, useState } from "react";
import { useLaunchStore } from "../store/launchStore";
import { useSettingsStore } from "../store/settingsStore";
import { Button } from "../components/ui/Button";
import { Play, Zap, Activity, ChevronRight, Clock, Cpu, AlertCircle, TrendingUp, MemoryStick, Rocket, Newspaper, Check, Loader2 } from "lucide-react";

interface ServerStatus {
  online: boolean;
  players?: { online: number; max: number };
}

const QUICK_PLAY_SERVERS = [
  { name: "Hypixel", ip: "mc.hypixel.net", icon: "H" },
  { name: "Drift SMP", ip: "play.drift.gg", icon: "D" },
  { name: "2b2t", ip: "2b2t.org", icon: "2" },
];

export default function HomePage() {
  const { isLaunching, progress, status, activeProfile, activeAccount, error, loadProfiles, loadAccounts, launch } = useLaunchStore();
  const settings = useSettingsStore();
  const [playtime, setPlaytime] = useState("0h 0m");
  const [copiedServer, setCopiedServer] = useState<string | null>(null);
  const [serverStatuses, setServerStatuses] = useState<Record<string, ServerStatus | null>>({});

  useEffect(() => {
    loadProfiles();
    loadAccounts();
    const updatePlaytime = () => {
      const saved = localStorage.getItem("drift-playtime");
      if (saved) {
        const mins = parseInt(saved, 10);
        setPlaytime(`${Math.floor(mins / 60)}h ${mins % 60}m`);
      }
    };
    updatePlaytime();
    const interval = setInterval(updatePlaytime, 5000);
    return () => clearInterval(interval);
  }, [loadProfiles, loadAccounts]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const results: Record<string, ServerStatus | null> = {};
      await Promise.all(QUICK_PLAY_SERVERS.map(async (s) => {
        try {
          const res = await fetch(`https://api.mcsrvstat.us/3/${s.ip}`);
          const data = await res.json();
          results[s.ip] = {
            online: data.online ?? false,
            players: data.players ? { online: data.players.online, max: data.players.max } : undefined,
          };
        } catch {
          results[s.ip] = null;
        }
      }));
      setServerStatuses(results);
    };
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const profileName = activeProfile ? activeProfile.name : "No profile";
  const mcVersion = activeProfile ? activeProfile.minecraft_version : "—";
  const loader = activeProfile ? activeProfile.mod_loader : "—";
  const accountName = activeAccount ? activeAccount.username : "Not logged in";

  const perfMods = [
    settings.sodium && "Sodium",
    settings.lithium && "Lithium",
    settings.ferriteCore && "FerriteCore",
    settings.iris && "Iris",
  ].filter(Boolean);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Drift</h1>
        <p className="text-drift-muted text-sm mt-1">Everything you need. Nothing you don't.</p>
      </div>

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
          <button className="ml-auto text-xs text-red-400 hover:text-red-300" onClick={() => useLaunchStore.getState().setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      <div className="card p-6 flex items-center justify-between hover:border-drift-accent/30 transition-colors animate-slide-up-fade">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-drift-accent/20 to-drift-accent/5 flex items-center justify-center border border-drift-accent/20 shadow-glow">
            <Play size={28} className="text-drift-accent" fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg text-shadow-sm">{profileName}</p>
              <span className="text-xs px-2 py-0.5 rounded-md bg-drift-accent/10 text-drift-accent font-mono">{mcVersion}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-drift-bg text-drift-muted font-mono border border-drift-border">{loader}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeAccount ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                {activeAccount ? "Ready" : "Login required"}
              </span>
              <span className="text-xs text-drift-muted">{accountName}</span>
            </div>
          </div>
        </div>
        <Button
          variant="3d"
          size="xl"
          disabled={isLaunching || !activeProfile || !activeAccount}
          onClick={() => launch()}
          icon={isLaunching ? <Loader2 size={20} className="animate-spin" /> : <Play size={22} fill="currentColor" />}
          className={!isLaunching && activeProfile && activeAccount ? "pulse-glow" : ""}
        >
          {isLaunching ? `${progress}%` : "Launch"}
        </Button>
      </div>

      {isLaunching && (
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-drift-accent animate-pulse" />
            <span className="text-sm">{status || "Preparing..."}</span>
          </div>
          <div className="h-2 bg-drift-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-drift-accent to-drift-accent-light transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Cpu} label="Active Profile" value={mcVersion} sublabel={loader} />
        <StatCard icon={MemoryStick} label="RAM Allocation" value={`${settings.ramLimit} MB`} sublabel="Java heap" />
        <StatCard icon={Clock} label="Playtime" value={playtime} sublabel="Total time played" />
      </div>

      {/* Performance status card */}
      <div className="card p-6 bg-gradient-to-br from-drift-accent/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-drift-accent/10 flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-drift-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">
              {perfMods.length > 0 ? "Performance Mode Active" : "Performance Mode Disabled"}
            </h3>
            <p className="text-xs text-drift-muted leading-relaxed">
              {perfMods.length > 0
                ? `${perfMods.join(", ")} ${perfMods.length === 1 ? "is" : "are"} enabled. Your game is optimized for maximum FPS.`
                : "No performance mods enabled. Visit Settings to enable Sodium, Lithium, and FerriteCore."}
            </p>
          </div>
          <ChevronRight size={16} className="text-drift-muted" />
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-drift-accent" />
            <h2 className="font-semibold text-sm">Quick Stats</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-drift-muted">Mod Loader</span>
              <span className="font-mono text-xs">{loader}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-drift-muted">Java Version</span>
              <span className="font-mono text-xs">Java 21</span>
            </div>
            <div className="flex justify-between">
              <span className="text-drift-muted">JVM Args</span>
              <span className="font-mono text-xs truncate ml-2 max-w-[160px]">{settings.javaArgs.substring(0, 30)}...</span>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-drift-accent" />
            <h2 className="font-semibold text-sm">System</h2>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-drift-muted">Launcher</span>
              <span className="font-mono text-xs">v0.2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-drift-muted">Framework</span>
              <span className="font-mono text-xs">Tauri v2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-drift-muted">Discord RPC</span>
              <span className={`font-mono text-xs ${settings.discordRpc ? "text-green-500" : "text-drift-muted"}`}>
                {settings.discordRpc ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Play presets */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Rocket size={16} className="text-drift-accent" />
          <h2 className="font-semibold text-sm">Quick Play</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {QUICK_PLAY_SERVERS.map((server) => {
            const status = serverStatuses[server.ip];
            return (
              <button
                key={server.name}
                className="bg-drift-bg rounded-lg p-3 hover:bg-drift-surface-hover transition-colors text-left group"
                onClick={() => {
                  navigator.clipboard.writeText(server.ip);
                  setCopiedServer(server.name);
                  setTimeout(() => setCopiedServer(null), 2000);
                }}
                title={`Click to copy: ${server.ip}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-drift-accent/10 flex items-center justify-center text-sm font-bold text-drift-accent">
                    {server.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{server.name}</p>
                    <p className="text-xs text-drift-muted font-mono">{server.ip}</p>
                  </div>
                  {copiedServer === server.name && (
                    <Check size={14} className="text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {status === undefined ? (
                    <Loader2 size={10} className="animate-spin text-drift-muted" />
                  ) : status === null ? (
                    <span className="text-xs text-drift-muted">Unknown</span>
                  ) : status.online ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs text-green-500">
                        {status.players ? `${status.players.online}/${status.players.max}` : "Online"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="text-xs text-red-500">Offline</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* News feed (toggleable) */}
      {settings.showNews && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper size={16} className="text-drift-accent" />
            <h2 className="font-semibold text-sm">Minecraft News</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Minecraft 1.21.4 released", date: "Dec 10, 2024", tag: "Update" },
              { title: "New bundles and item changes", date: "Dec 8, 2024", tag: "Feature" },
              { title: "Minecraft Live 2024 recap", date: "Sep 29, 2024", tag: "Event" },
            ].map((news) => (
              <div key={news.title} className="flex items-center justify-between py-2 border-b border-drift-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-drift-accent/10 text-drift-accent">{news.tag}</span>
                  <p className="text-sm">{news.title}</p>
                </div>
                <span className="text-xs text-drift-muted">{news.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel }: { icon: any; label: string; value: string; sublabel?: string }) {
  return (
    <div className="card p-4 hover:border-drift-accent/30 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <Icon size={16} className="text-drift-muted" />
      </div>
      <p className="text-xs text-drift-muted">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
      {sublabel && <p className="text-xs text-drift-muted mt-0.5">{sublabel}</p>}
    </div>
  );
}
