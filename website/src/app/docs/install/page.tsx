export default function InstallPage() {
  return (
    <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Installation Guide</h1>
          <p className="text-drift-text-secondary mb-8">
            Get Drift Client running on your system in under 5 minutes.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
              <ul className="space-y-2 text-drift-text-secondary">
                <li>• A valid Minecraft account (Microsoft login)</li>
                <li>• Minecraft Java Edition purchased</li>
                <li>• Windows 10/11, macOS 11+, or Linux</li>
                <li>• At least 2GB of free RAM for Minecraft</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Step 1: Download</h2>
              <p className="text-drift-text-secondary mb-3">
                Download the launcher for your platform from the{" "}
                <a href="/download" className="text-drift-accent hover:underline">download page</a>.
                The launcher is only ~10MB — no large runtime bundled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Step 2: Install</h2>
              <div className="space-y-4">
                <div className="card p-4">
                  <h3 className="font-medium mb-2">Windows</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Run the <code className="text-drift-accent">.msi</code> installer.
                    Follow the setup wizard. The launcher will be available in your Start menu.
                  </p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium mb-2">macOS</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Open the <code className="text-drift-accent">.dmg</code> file and drag Drift Client to your Applications folder.
                    On first launch, right-click and select "Open" to bypass Gatekeeper.
                  </p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium mb-2">Linux</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Make the <code className="text-drift-accent">.AppImage</code> executable:
                  </p>
                  <pre className="mt-2 bg-drift-bg rounded-lg p-3 text-sm font-mono text-drift-text">
{`chmod +x DriftClient-*.AppImage
./DriftClient-*.AppImage`}
                  </pre>
                  <p className="text-sm text-drift-text-secondary mt-2">
                    Or install the <code className="text-drift-accent">.deb</code> package:
                  </p>
                  <pre className="mt-2 bg-drift-bg rounded-lg p-3 text-sm font-mono text-drift-text">
{`sudo dpkg -i driftclient_*.deb`}
                  </pre>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Step 3: Login</h2>
              <p className="text-drift-text-secondary">
                On first launch, you'll be prompted to log in with your Microsoft account.
                Click "Login" and follow the browser redirect. Your credentials are stored
                securely in your OS keychain — Drift Client never sees your password.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Step 4: Create a Profile</h2>
              <p className="text-drift-text-secondary">
                Go to the <strong>Profiles</strong> tab and click "New Profile". Select your
                Minecraft version (1.21.x for latest, 1.8.9 for PvP) and Drift Client will
                automatically install the correct Fabric loader and performance mods.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Step 5: Play</h2>
              <p className="text-drift-text-secondary">
                Head back to <strong>Home</strong> and click <strong>Play</strong>. Drift Client
                will download Minecraft, apply mods, and launch the game. The first launch takes
                longer due to asset downloads — subsequent launches are much faster.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Troubleshooting</h2>
              <div className="space-y-3">
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-1">"Login failed" error</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Make sure you own Minecraft Java Edition on your Microsoft account.
                    Check your internet connection and try again.
                  </p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-1">Game crashes on launch</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Check that you have the correct Java version installed. Drift Client
                    manages Java automatically, but if you have a manual override, ensure
                    it matches (Java 21 for 1.21+, Java 8 for 1.8.9).
                  </p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm mb-1">Mods not loading</h3>
                  <p className="text-sm text-drift-text-secondary">
                    Go to the <strong>Mods</strong> tab and verify your mods are enabled.
                    If a mod is incompatible with your Minecraft version, it will be
                    highlighted with a warning icon.
                  </p>
                </div>
              </div>
            </section>
          </div>
    </div>
  );
}
