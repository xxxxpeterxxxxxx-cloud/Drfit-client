import { NavLink } from "react-router-dom";
import { Home, Package, Palette, Layers, Settings, User } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/mods", icon: Package, label: "Mods" },
  { to: "/cosmetics", icon: Palette, label: "Cosmetics" },
  { to: "/profiles", icon: Layers, label: "Profiles" },
  { to: "/account", icon: User, label: "Account" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <nav className="w-56 bg-drift-surface border-r border-drift-border flex flex-col py-4 px-3 gap-1">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) => (isActive ? "nav-item-active" : "nav-item")}
        >
          <Icon size={18} />
          <span className="text-sm">{label}</span>
        </NavLink>
      ))}
      <div className="mt-auto pt-4 border-t border-drift-border">
        <p className="text-xs text-drift-muted px-3">Not affiliated with Minecraft</p>
      </div>
    </nav>
  );
}
