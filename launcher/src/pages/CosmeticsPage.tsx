import { Palette, Sparkles, Lock, Check } from "lucide-react";

const cosmetics = [
  { name: "Classic Cape", type: "Cape", equipped: true, premium: false, color: "#3B82F6" },
  { name: "Drift Cape", type: "Cape", equipped: false, premium: true, color: "#8B5CF6" },
  { name: "Rainbow Cape", type: "Cape", equipped: false, premium: true, color: "#EC4899" },
  { name: "Pixel Cape", type: "Cape", equipped: false, premium: false, color: "#10B981" },
  { name: "Gold Trim", type: "Border", equipped: false, premium: true, color: "#F59E0B" },
  { name: "Neon Glow", type: "Effect", equipped: false, premium: true, color: "#06B6D4" },
];

export default function CosmeticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Cosmetics</h1>
        <p className="text-drift-muted text-sm mt-1">Customize your look with capes and cosmetics.</p>
      </div>

      <div className="card p-6 bg-gradient-to-br from-drift-accent/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-drift-accent/20 to-drift-accent/5 border border-drift-accent/20 flex items-center justify-center">
            <Sparkles size={28} className="text-drift-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Drift Premium</h3>
            <p className="text-xs text-drift-muted mt-0.5">
              Unlock exclusive capes, borders, and effects. Support development.
            </p>
          </div>
          <button className="btn-primary text-sm">Upgrade</button>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-sm mb-3">Your Cosmetics</h2>
        <div className="grid grid-cols-2 gap-4">
          {cosmetics.map((cosmetic) => (
            <div
              key={cosmetic.name}
              className={`card p-4 transition-colors ${
                cosmetic.equipped ? "border-drift-accent/50" : "hover:border-drift-accent/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-12 h-12 rounded-xl border border-drift-border flex items-center justify-center"
                  style={{ background: `${cosmetic.color}20` }}
                >
                  <Palette size={20} style={{ color: cosmetic.color }} />
                </div>
                {cosmetic.premium && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center gap-1">
                    <Lock size={10} /> Pro
                  </span>
                )}
              </div>
              <h3 className="font-medium text-sm">{cosmetic.name}</h3>
              <p className="text-xs text-drift-muted mt-0.5">{cosmetic.type}</p>
              {cosmetic.equipped ? (
                <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                  <Check size={12} /> Equipped
                </div>
              ) : (
                <button className="btn-secondary text-xs w-full mt-3 py-1.5">
                  {cosmetic.premium ? "Unlock" : "Equip"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
