import Link from "next/link";
import { Github } from "lucide-react";

const footerLinks = {
  Project: [
    { href: "/download", label: "Download" },
    { href: "/changelog", label: "Changelog" },
    { href: "/docs", label: "Docs" },
    { href: "/community", label: "Community" },
  ],
  Resources: [
    { href: "/docs/install", label: "Installation" },
    { href: "/docs/config", label: "Configuration" },
    { href: "/docs/mods", label: "Mods Guide" },
    { href: "/docs/api", label: "API Reference" },
  ],
  Community: [
    { href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client", label: "GitHub" },
    { href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/issues", label: "Issues" },
    { href: "/about", label: "About" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/tos", label: "Terms" },
    { href: "/licenses", label: "Licenses" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-drift-border/60 bg-drift-bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-drift-accent/5 to-transparent pointer-events-none" />
      <div className="container-max py-14 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-drift-accent to-drift-accent-hover flex items-center justify-center shadow-lg shadow-drift-accent/30">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-sm">Drift Client</span>
            </div>
            <p className="text-xs text-drift-muted font-mono leading-relaxed mb-4">
              The open-source Minecraft client.<br />
              No bloat. No tracking. Just performance.
            </p>
            <Link
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              className="inline-flex items-center gap-2 text-xs text-drift-muted hover:text-drift-accent transition-colors"
              target="_blank"
            >
              <Github size={16} />
              Star on GitHub
            </Link>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold mb-4 text-drift-muted uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-drift-text-secondary hover:text-drift-accent transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-drift-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-drift-muted">
            © {new Date().getFullYear()} Drift Client · GPL-3.0 · Not affiliated with Minecraft/Mojang
          </p>
          <div className="flex items-center gap-4 text-xs text-drift-muted font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-drift-accent animate-pulse" />
              v0.2.0
            </span>
            <span>Tauri v2</span>
            <span>Rust + React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
