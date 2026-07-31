import { Package, Search, Download, Star, Check } from "lucide-react";

const featuredMods = [
  { name: "Sodium", author: "CaffeineMC", description: "Modern rendering engine with great FPS.", downloads: "45M", stars: "4.9", installed: true, category: "Performance" },
  { name: "Lithium", author: "CaffeineMC", description: "Game logic optimization for server & client.", downloads: "30M", stars: "4.8", installed: true, category: "Performance" },
  { name: "FerriteCore", author: "malte0811", description: "Memory usage optimization mod.", downloads: "12M", stars: "4.7", installed: true, category: "Performance" },
  { name: "Iris Shaders", author: "coderbot", description: "Shader support for Sodium.", downloads: "20M", stars: "4.8", installed: false, category: "Visual" },
  { name: "Mod Menu", author: "Terraformers", description: "Adds a mod menu to view installed mods.", downloads: "35M", stars: "4.9", installed: true, category: "Utility" },
  { name: "Fabric API", author: "FabricMC", description: "Core Fabric library required by most mods.", downloads: "50M", stars: "5.0", installed: true, category: "Library" },
];

const categories = ["All", "Performance", "Visual", "Utility", "Library", "QoL"];

export default function ModsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Mods</h1>
        <p className="text-drift-muted text-sm mt-1">Browse and manage your installed mods.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-drift-muted" />
          <input
            type="text"
            placeholder="Search mods on Modrinth..."
            className="w-full bg-drift-bg border border-drift-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-drift-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-drift-accent text-white"
                : "bg-drift-bg text-drift-muted hover:text-drift-text hover:bg-drift-surface border border-drift-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {featuredMods.map((mod) => (
          <div key={mod.name} className="card p-4 hover:border-drift-accent/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-drift-accent/15 to-drift-accent/5 border border-drift-border flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-drift-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{mod.name}</h3>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-drift-bg text-drift-muted">{mod.category}</span>
                </div>
                <p className="text-xs text-drift-muted mt-1">{mod.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-drift-muted">
                  <span className="flex items-center gap-1">
                    <Download size={12} /> {mod.downloads}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {mod.stars}
                  </span>
                  <span>by {mod.author}</span>
                </div>
              </div>
              {mod.installed ? (
                <div className="flex items-center gap-1.5 text-xs text-green-500 flex-shrink-0">
                  <Check size={14} />
                  Installed
                </div>
              ) : (
                <button className="btn-secondary text-xs px-3 py-1.5 flex-shrink-0">
                  Install
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
