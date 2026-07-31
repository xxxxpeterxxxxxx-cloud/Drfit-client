import Link from "next/link";
import { Github, Discord } from "lucide-react";

const footerLinks = {
  Resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/changelog", label: "Changelog" },
    { href: "/blog", label: "Blog" },
  ],
  Community: [
    { href: "/#community", label: "Discord" },
    { href: "https://github.com/driftclient", label: "GitHub" },
    { href: "/contribute", label: "Contribute" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/tos", label: "Terms of Service" },
    { href: "/licenses", label: "Licenses" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-drift-border bg-drift-bg-secondary">
      <div className="container-max py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-drift-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-semibold">Drift Client</span>
            </div>
            <p className="text-sm text-drift-muted">
              A better way to play Minecraft.
            </p>
            <div className="flex gap-3 mt-4">
              <Link href="https://github.com/driftclient" className="text-drift-muted hover:text-drift-text">
                <Github size={20} />
              </Link>
              <Link href="/discord" className="text-drift-muted hover:text-drift-text">
                <Discord size={20} />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-drift-muted hover:text-drift-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-drift-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-drift-muted">
            © {new Date().getFullYear()} Drift Client. GPL-3.0. Not affiliated with Minecraft/Mojang.
          </p>
        </div>
      </div>
    </footer>
  );
}
