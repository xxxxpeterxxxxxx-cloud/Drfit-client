import { NavLink } from "react-router-dom";
import { Home, Package, Palette, Layers, Settings, User, Bot } from "lucide-react";
import { useSettingsStore } from "../store/settingsStore";
import { useLaunchStore } from "../store/launchStore";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/mods", icon: Package, label: "Mods" },
  { to: "/cosmetics", icon: Palette, label: "Cosmetics" },
  { to: "/profiles", icon: Layers, label: "Profiles" },
  { to: "/cipher", icon: Bot, label: "Cipher" },
  { to: "/account", icon: User, label: "Account" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const compact = useSettingsStore((s) => s.compactSidebar);
  const { activeAccount } = useLaunchStore();

  return (
    <nav className={`${compact ? "w-16" : "w-56"} bg-drift-surface border-r border-drift-border flex flex-col py-4 px-3 gap-1 transition-all duration-200`}>
      <div className={`flex items-center gap-2.5 px-2 py-3 mb-2 ${compact ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-drift-accent to-drift-accent-dark flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 6L2 10V2Z" fill="white" />
          </svg>
        </div>
        {!compact && (
          <div>
            <p className="text-sm font-bold leading-none">Drift</p>
            <p className="text-xs text-drift-muted leading-none mt-0.5">Client</p>
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `${isActive ? "nav-item-active" : "nav-item"} ${compact ? "justify-center px-2" : ""}`
            }
            title={compact ? label : undefined}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!compact && <span className="text-sm font-medium">{label}</span>}
          </NavLink>
        ))}
      </div>

      {!compact && activeAccount && (
        <div className="mt-auto">
          <div className="rounded-lg p-3 border border-drift-border flex items-center gap-3">
            <img
              src={`https://crafatar.com/avatars/${activeAccount.uuid}?size=32&overlay`}
              alt="skin"
              className="w-8 h-8 rounded-md image-render-pixelated"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activeAccount.username}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      )}
    </nav>
  );
}
