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
                  v0.1.0
                </span>
                <span className="text-sm text-drift-muted">In Development</span>
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
