import { useLaunchStore } from "../store/launchStore";
import { Play, Zap, Activity, Settings, ChevronRight, Clock, Package, Cpu } from "lucide-react";

export default function HomePage() {
  const { isLaunching, progress, status } = useLaunchStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Drift</h1>
        <p className="text-drift-muted text-sm mt-1">Everything you need. Nothing you don't.</p>
      </div>

      <div className="card p-6 flex items-center justify-between hover:border-drift-accent/30 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-drift-accent/20 to-drift-accent/5 flex items-center justify-center border border-drift-accent/20">
            <Play size={28} className="text-drift-accent" fill="currentColor" />
          </div>
          <div>
            <p className="font-semibold text-lg">Quick Launch</p>
            <p className="text-sm text-drift-muted">Drift 1.21.x — Fabric</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Ready</span>
              <span className="text-xs text-drift-muted">Java 21</span>
            </div>
          </div>
        </div>
        <button className="btn-primary text-lg px-8 py-3" disabled={isLaunching}>
          {isLaunching ? `Launching... ${progress}%` : "Play"}
        </button>
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
        <StatCard icon={Cpu} label="Active Profile" value="1.21.x" sublabel="Fabric 0.15" />
        <StatCard icon={Package} label="Mods Installed" value="0" sublabel="Browse mods" />
        <StatCard icon={Clock} label="Playtime" value="0h" sublabel="This week" />
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Activity</h2>
          <button className="text-xs text-drift-muted hover:text-drift-text">View all</button>
        </div>
        <div className="space-y-3">
          <ActivityRow icon={Settings} title="Settings updated" time="2 hours ago" />
          <ActivityRow icon={Package} title="Profile created: Bedwars 1.8.9" time="1 day ago" />
          <ActivityRow icon={Play} title="Played on Drift 1.21.x" time="2 days ago" />
        </div>
      </div>

      <div className="card p-6 bg-gradient-to-br from-drift-accent/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-drift-accent/10 flex items-center justify-center flex-shrink-0">
            <Zap size={20} className="text-drift-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Performance Mode Active</h3>
            <p className="text-xs text-drift-muted leading-relaxed">
              Sodium, Lithium, and FerriteCore are enabled. Your game is optimized for maximum FPS.
              Disable in Settings if you need shader support.
            </p>
          </div>
          <ChevronRight size={16} className="text-drift-muted" />
        </div>
      </div>
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

function ActivityRow({ icon: Icon, title, time }: { icon: any; title: string; time: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-drift-bg flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-drift-muted" />
      </div>
      <div className="flex-1">
        <p className="text-sm">{title}</p>
      </div>
      <span className="text-xs text-drift-muted">{time}</span>
    </div>
  );
}
