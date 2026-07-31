import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-drift-muted text-sm mb-8">Last updated: July 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">No Tracking</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client does not collect telemetry, analytics, or usage data.
                We do not track what mods you install, what servers you play on,
                or how you use the client. Your data stays on your machine.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Account Data</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Your Microsoft account credentials are stored securely in your
                operating system's native credential store (Windows Credential Manager,
                macOS Keychain, or Linux Secret Service). Drift Client never transmits
                your password to any server other than Microsoft's official OAuth2
                endpoints.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Third-Party Services</h2>
              <p className="text-drift-text-secondary leading-relaxed mb-3">
                Drift Client communicates with the following third-party services:
              </p>
              <ul className="space-y-2 text-drift-text-secondary text-sm">
                <li>• <strong>Microsoft / Xbox Live</strong> — Account authentication (OAuth2)</li>
                <li>• <strong>Mojang / Minecraft Services</strong> — Game version downloads, skin fetching</li>
                <li>• <strong>Modrinth API</strong> — Mod search and installation</li>
                <li>• <strong>Fabric</strong> — Fabric loader downloads</li>
              </ul>
              <p className="text-sm text-drift-muted mt-3">
                No data is sent to these services beyond what is required for
                authentication and downloading files.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Local Data</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Configuration files are stored in{" "}
                <code className="text-drift-accent">~/.minecraft/config/drift/</code>{" "}
                as plain JSON. You can inspect, edit, or delete these files at any time.
                No hidden databases, no encrypted blobs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Open Source</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                You can verify everything stated here by reading the source code on{" "}
                <a href="https://github.com/driftclient" className="text-drift-accent hover:underline">GitHub</a>.
                If you find anything that contradicts this policy, please open an issue.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
