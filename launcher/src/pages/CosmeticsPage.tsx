import { useState } from "react";
import { Check, Lock, Sparkles, Crown, Flame, Star, Rainbow, Search } from "lucide-react";

type CosmeticCategory = "capes" | "borders" | "effects" | "titles";

interface Cosmetic {
  id: string;
  name: string;
  category: CosmeticCategory;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  gradient: string;
  description: string;
}

const COSMETICS: Cosmetic[] = [
  { id: "cape-classic", name: "Classic Drift", category: "capes", rarity: "common", unlocked: true, gradient: "from-emerald-500 to-emerald-700", description: "The original Drift cape" },
  { id: "cape-aurora", name: "Aurora", category: "capes", rarity: "rare", unlocked: true, gradient: "from-cyan-400 via-blue-500 to-purple-600", description: "Northern lights inspired" },
  { id: "cape-inferno", name: "Inferno", category: "capes", rarity: "epic", unlocked: false, gradient: "from-orange-500 via-red-500 to-yellow-500", description: "Forged in the nether" },
  { id: "cape-galaxy", name: "Galaxy", category: "capes", rarity: "epic", unlocked: false, gradient: "from-indigo-900 via-purple-800 to-pink-700", description: "A piece of the cosmos" },
  { id: "cape-royal", name: "Royal", category: "capes", rarity: "legendary", unlocked: false, gradient: "from-yellow-400 via-amber-500 to-orange-600", description: "Fit for a king" },
  { id: "cape-prism", name: "Prism", category: "capes", rarity: "rare", unlocked: true, gradient: "from-pink-400 via-purple-400 to-indigo-400", description: "Refracted light" },
  { id: "cape-void", name: "Void", category: "capes", rarity: "epic", unlocked: false, gradient: "from-gray-700 via-gray-900 to-black", description: "Emptiness incarnate" },
  { id: "cape-forest", name: "Forest", category: "capes", rarity: "common", unlocked: true, gradient: "from-green-600 via-green-700 to-green-900", description: "One with nature" },
  { id: "border-gold", name: "Gold Trim", category: "borders", rarity: "rare", unlocked: true, gradient: "from-yellow-400 to-amber-600", description: "Shiny gold frame" },
  { id: "border-neon", name: "Neon Glow", category: "borders", rarity: "epic", unlocked: false, gradient: "from-cyan-400 to-blue-500", description: "Electric edges" },
  { id: "border-rose", name: "Rose", category: "borders", rarity: "common", unlocked: true, gradient: "from-rose-400 to-pink-600", description: "Soft and elegant" },
  { id: "effect-sparkle", name: "Sparkle Trail", category: "effects", rarity: "rare", unlocked: true, gradient: "from-yellow-300 to-amber-400", description: "Leave a trail of stars" },
  { id: "effect-flame", name: "Flame Aura", category: "effects", rarity: "epic", unlocked: false, gradient: "from-orange-500 to-red-600", description: "Walk through fire" },
  { id: "effect-rainbow", name: "Rainbow", category: "effects", rarity: "legendary", unlocked: false, gradient: "from-red-500 via-yellow-500 via-green-500 to-blue-500", description: "All colors at once" },
  { id: "title-alpha", name: "Alpha Tester", category: "titles", rarity: "rare", unlocked: true, gradient: "from-emerald-400 to-cyan-500", description: "Been here from the start" },
  { id: "title-beta", name: "Beta Warrior", category: "titles", rarity: "common", unlocked: true, gradient: "from-blue-400 to-indigo-500", description: "Joined during beta" },
];

const RARITY_CONFIG = {
  common: { label: "Common", color: "text-gray-400", border: "border-gray-500/30", icon: Star },
  rare: { label: "Rare", color: "text-blue-400", border: "border-blue-500/30", icon: Sparkles },
  epic: { label: "Epic", color: "text-purple-400", border: "border-purple-500/30", icon: Flame },
  legendary: { label: "Legendary", color: "text-amber-400", border: "border-amber-500/30", icon: Crown },
};

const CATEGORIES: { key: CosmeticCategory; label: string }[] = [
  { key: "capes", label: "Capes" },
  { key: "borders", label: "Borders" },
  { key: "effects", label: "Effects" },
  { key: "titles", label: "Titles" },
];

export default function CosmeticsPage() {
  const [activeCategory, setActiveCategory] = useState<CosmeticCategory>("capes");
  const [equipped, setEquipped] = useState<Record<CosmeticCategory, string | null>>({
    capes: "cape-classic",
    borders: null,
    effects: null,
    titles: null,
  });
  const [search, setSearch] = useState("");

  const filtered = COSMETICS.filter(
    (c) => c.category === activeCategory &&
    (search === "" || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleEquip = (cosmetic: Cosmetic) => {
    if (!cosmetic.unlocked) return;
    setEquipped((prev) => ({
      ...prev,
      [cosmetic.category]: prev[cosmetic.category] === cosmetic.id ? null : cosmetic.id,
    }));
  };

  const equippedCount = Object.values(equipped).filter(Boolean).length;
  const unlockedCount = COSMETICS.filter((c) => c.unlocked).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cosmetics</h1>
          <p className="text-drift-muted text-sm mt-1">Personalize your Drift experience.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-drift-muted">Unlocked</p>
            <p className="text-sm font-semibold">{unlockedCount}/{COSMETICS.length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-drift-muted">Equipped</p>
            <p className="text-sm font-semibold text-drift-accent">{equippedCount}</p>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 border-b border-drift-border">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeCategory === cat.key
                ? "text-drift-accent border-drift-accent"
                : "text-drift-muted border-transparent hover:text-drift-text"
            }`}
          >
            {cat.label}
            <span className="text-xs text-drift-muted">
              ({COSMETICS.filter((c) => c.category === cat.key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-drift-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeCategory}...`}
          className="w-full bg-drift-bg border border-drift-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-drift-accent"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((cosmetic) => {
          const rarity = RARITY_CONFIG[cosmetic.rarity];
          const isEquipped = equipped[cosmetic.category] === cosmetic.id;
          const RarityIcon = rarity.icon;

          return (
            <div
              key={cosmetic.id}
              className={`card overflow-hidden transition-all duration-200 ${rarity.border} ${
                isEquipped ? "ring-2 ring-drift-accent/50" : ""
              } ${!cosmetic.unlocked ? "opacity-60" : ""}`}
            >
              {/* Preview area */}
              <div className={`relative h-32 bg-gradient-to-br ${cosmetic.gradient} flex items-center justify-center`}>
                {activeCategory === "capes" && (
                  <div className="w-16 h-20 rounded-t-lg bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div className="w-12 h-16 rounded-t-md bg-gradient-to-b from-white/10 to-transparent" />
                  </div>
                )}
                {activeCategory === "borders" && (
                  <div className="w-20 h-20 rounded-xl border-4 border-white/30 backdrop-blur-sm" />
                )}
                {activeCategory === "effects" && (
                  <Sparkles size={32} className="text-white/80" />
                )}
                {activeCategory === "titles" && (
                  <span className="text-sm font-bold text-white/90 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                    {cosmetic.name}
                  </span>
                )}

                {/* Rarity badge */}
                <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm ${rarity.color}`}>
                  <RarityIcon size={10} />
                  {rarity.label}
                </div>

                {/* Lock overlay */}
                {!cosmetic.unlocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock size={20} className="text-white/60" />
                  </div>
                )}

                {/* Equipped badge */}
                {isEquipped && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-drift-accent text-white">
                    <Check size={10} />
                    Equipped
                  </div>
                )}
              </div>

              {/* Info + action */}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{cosmetic.name}</p>
                    <p className="text-xs text-drift-muted">{cosmetic.description}</p>
                  </div>
                  <button
                    onClick={() => handleEquip(cosmetic)}
                    disabled={!cosmetic.unlocked}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-colors flex-shrink-0 ${
                      !cosmetic.unlocked
                        ? "bg-drift-border text-drift-muted cursor-not-allowed"
                        : isEquipped
                        ? "bg-drift-surface-hover text-drift-text hover:bg-drift-border"
                        : "bg-drift-accent/10 text-drift-accent hover:bg-drift-accent/20"
                    }`}
                  >
                    {!cosmetic.unlocked ? (
                      <span className="flex items-center gap-1"><Lock size={10} /> Locked</span>
                    ) : isEquipped ? (
                      "Unequip"
                    ) : (
                      "Equip"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 text-center">
          <p className="text-sm text-drift-muted">No cosmetics found matching your search.</p>
        </div>
      )}

      {/* Info card */}
      <div className="card p-4 bg-gradient-to-br from-drift-accent/5 to-transparent">
        <div className="flex items-start gap-3">
          <Rainbow size={16} className="text-drift-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium">How to unlock more cosmetics</p>
            <p className="text-xs text-drift-muted mt-1 leading-relaxed">
              Play on Drift-supported servers, participate in events, and complete achievements to earn
              exclusive cosmetics. Some cosmetics are also available through the Drift Discord.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
