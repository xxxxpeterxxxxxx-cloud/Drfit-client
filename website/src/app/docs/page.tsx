import Link from "next/link";
import { BookOpen, Download, Settings, Code } from "lucide-react";

const docSections = [
  {
    icon: Download,
    title: "Installation",
    description: "Get Drift Client running on Windows, macOS, and Linux.",
    href: "/docs/install",
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Learn about all configuration options and profile presets.",
    href: "/docs/config",
  },
  {
    icon: Code,
    title: "Mod Development",
    description: "Build your own mods using the Drift Core API and Fabric.",
    href: "/docs/mods",
  },
  {
    icon: BookOpen,
    title: "Launcher API",
    description: "Understand the Tauri-based launcher architecture.",
    href: "/docs/api",
  },
];

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-drift-text-secondary mb-12 max-w-2xl">
        Everything you need to install, configure, and extend Drift Client.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="card p-6 hover:border-drift-accent/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-drift-accent/10 flex items-center justify-center flex-shrink-0">
                <section.icon size={24} className="text-drift-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-drift-accent transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-drift-text-secondary">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
