import Link from "next/link";
import { Github } from "lucide-react";

const footerLinks = {
  Project: [
    { href: "/download", label: "Download" },
    { href: "/changelog", label: "Changelog" },
    { href: "/docs", label: "Docs" },
  ],
  Community: [
    { href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client", label: "GitHub" },
    { href: "https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client/issues", label: "Issues" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/tos", label: "Terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-drift-border bg-drift-bg-secondary">
      <div className="container-max py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-drift-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-semibold text-sm">Drift Client</span>
            </div>
            <p className="text-xs text-drift-muted font-mono">
              GPL-3.0 · Tauri v2 · Rust + React
            </p>
            <Link
              href="https://github.com/xxxxpeterxxxxxx-cloud/Drfit-client"
              className="inline-block mt-3 text-drift-muted hover:text-drift-text transition-colors"
              target="_blank"
            >
              <Github size={18} />
            </Link>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold mb-3 text-drift-muted uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-drift-text-secondary hover:text-drift-text transition-colors"
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

        <div className="mt-8 pt-6 border-t border-drift-border">
          <p className="text-xs text-drift-muted">
            © {new Date().getFullYear()} Drift Client · GPL-3.0 · Not affiliated with Minecraft/Mojang
          </p>
        </div>
      </div>
    </footer>
  );
}
