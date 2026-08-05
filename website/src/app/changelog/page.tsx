import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Changelog</h1>
          <p className="text-drift-text-secondary mb-12">
            Version history and release notes for Drift Client.
          </p>

          <div className="space-y-8">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-drift-accent/20 text-drift-accent text-sm font-medium">
                  v0.2.0
                </span>
                <span className="text-sm text-drift-muted">Latest</span>
              </div>
              <h3 className="font-semibold mb-3">CurseForge, Cipher Bot & Flatpak</h3>
              <ul className="space-y-2 text-sm text-drift-text-secondary">
                <li>• CurseForge mod browser and installer integration</li>
                <li>• Cipher Bot panel — Discord bot & Minecraft server management</li>
                <li>• Flatpak packaging with org.freedesktop.Platform 24.08</li>
                <li>• Fixed NSIS installer hanging on Windows (WebView2 bootstrapper)</li>
                <li>• Fixed DMG installer issues on macOS</li>
                <li>• Updated Tauri to v2.1 across Rust and NPM</li>
                <li>• Website redesign: Comparison, FAQ, Community sections</li>
                <li>• Improved Linux deb/rpm dependency declarations</li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-drift-muted/20 text-drift-muted text-sm font-medium">
                  v0.1.0
                </span>
                <span className="text-sm text-drift-muted">Archived</span>
              </div>
              <h3 className="font-semibold mb-3">Initial Foundation</h3>
              <ul className="space-y-2 text-sm text-drift-text-secondary">
                <li>• Monorepo structure with launcher, mods, and website</li>
                <li>• Tauri v2 launcher skeleton (React + Rust)</li>
                <li>• Gradle multi-project for Fabric mods</li>
                <li>• drift-core: Config system, mod registry, event bus</li>
                <li>• drift-hud, drift-qol, drift-perf, drift-legacy modules</li>
                <li>• Premium landing page with feature showcase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
