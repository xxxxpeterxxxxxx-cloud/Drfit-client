import { useLaunchStore } from "../store/launchStore";
import { Play, Zap, Activity } from "lucide-react";

export default function HomePage() {
  const { isLaunching, progress, status } = useLaunchStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Welcome to Drift</h1>
        <p className="text-drift-muted text-sm mt-1">Everything you need. Nothing you don't.</p>
      </div>

      <div className="card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-drift-accent/20 flex items-center justify-center">
            <Play size={24} className="text-drift-accent" />
          </div>
          <div>
            <p className="font-semibold">Quick Launch</p>
            <p className="text-sm text-drift-muted">Drift 1.21.x — Fabric</p>
          </div>
        </div>
        <button className="btn-primary" disabled={isLaunching}>
          {isLaunching ? `Launching... ${progress}%` : "Play"}
        </button>
      </div>

      {isLaunching && (
        <div className="card">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-drift-accent" />
            <span className="text-sm">{status || "Preparing..."}</span>
          </div>
          <div className="h-2 bg-drift-bg rounded-full overflow-hidden">
            <div className="h-full bg-drift-accent transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Zap} label="Active Profile" value="1.21.x" />
        <StatCard icon={Activity} label="Mods Installed" value="0" />
        <StatCard icon={Play} label="Playtime" value="0h" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="card">
      <Icon size={18} className="text-drift-muted mb-2" />
      <p className="text-xs text-drift-muted">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
