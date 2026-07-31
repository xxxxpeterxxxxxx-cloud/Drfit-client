import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ApiPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Launcher Architecture</h1>
          <p className="text-drift-text-secondary mb-8">
            The Drift Client launcher is built with Tauri v2 (Rust backend + React frontend).
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`launcher/
├── src/                # React frontend (TypeScript)
│   ├── App.tsx         # Router + layout
│   ├── components/     # Sidebar, TitleBar
│   ├── pages/          # Home, Mods, Cosmetics, Profiles, Settings, Account
│   └── store/          # Zustand state management
└── src-tauri/
    └── src/
        ├── lib.rs      # Tauri builder + command registration
        ├── auth.rs     # Microsoft OAuth2 account management
        ├── minecraft.rs # Version manifest + game launch
        ├── fabric.rs   # Fabric loader installation
        ├── profile.rs  # Profile CRUD + persistence
        └── modrinth.rs # Modrinth API client`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tauri Commands</h2>
              <p className="text-drift-text-secondary mb-3">
                The Rust backend exposes commands to the frontend via Tauri's IPC:
              </p>
              <div className="space-y-3">
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-2">Auth</h3>
                  <ul className="text-sm text-drift-text-secondary space-y-1">
                    <li><code className="text-drift-accent">login_microsoft</code> — Start OAuth2 flow</li>
                    <li><code className="text-drift-accent">get_accounts</code> — List saved accounts</li>
                    <li><code className="text-drift-accent">switch_account(uuid)</code> — Set active account</li>
                    <li><code className="text-drift-accent">logout(uuid)</code> — Remove account</li>
                  </ul>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-2">Minecraft</h3>
                  <ul className="text-sm text-drift-text-secondary space-y-1">
                    <li><code className="text-drift-accent">get_version_manifest</code> — Fetch Mojang versions</li>
                    <li><code className="text-drift-accent">download_assets(version)</code> — Download game files</li>
                    <li><code className="text-drift-accent">launch_game(profile_id)</code> — Start Minecraft</li>
                  </ul>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-2">Fabric</h3>
                  <ul className="text-sm text-drift-text-secondary space-y-1">
                    <li><code className="text-drift-accent">install_fabric(version)</code> — Install Fabric loader</li>
                    <li><code className="text-drift-accent">install_legacy_fabric(version)</code> — Install for 1.8.9</li>
                  </ul>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-2">Profiles</h3>
                  <ul className="text-sm text-drift-text-secondary space-y-1">
                    <li><code className="text-drift-accent">create_profile(name, version)</code></li>
                    <li><code className="text-drift-accent">list_profiles</code></li>
                    <li><code className="text-drift-accent">delete_profile(id)</code></li>
                    <li><code className="text-drift-accent">set_active_profile(id)</code></li>
                  </ul>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-2">Modrinth</h3>
                  <ul className="text-sm text-drift-text-secondary space-y-1">
                    <li><code className="text-drift-accent">search_mods(query, filters)</code></li>
                    <li><code className="text-drift-accent">install_mod(project_id)</code></li>
                    <li><code className="text-drift-accent">list_installed_mods</code></li>
                    <li><code className="text-drift-accent">toggle_mod(mod_id, enabled)</code></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Shared Config Schema</h2>
              <p className="text-drift-text-secondary mb-3">
                Launcher and mods share a JSON schema for configuration:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`// shared/config-schema.json
{
  "modules": { "core": bool, "hud": bool, ... },
  "hud": { "preset": string, "elements": [...] },
  "qol": { "toggleSprint": bool, "zoom": {...}, ... },
  "perf": { "sodium": bool, "ramLimit": int, ... }
}`}
              </pre>
              <p className="text-sm text-drift-text-secondary mt-2">
                TypeScript types are in <code className="text-drift-accent">shared/index.ts</code>,
                Java POJOs in <code className="text-drift-accent">gg.drift.core.config.DriftConfig</code>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
