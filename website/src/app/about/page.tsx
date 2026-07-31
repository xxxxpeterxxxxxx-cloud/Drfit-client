import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">About Drift Client</h1>
          <p className="text-drift-text-secondary mb-8">
            A modern, open-source Minecraft client built by players, for players.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client exists because we believe Minecraft players deserve a client
                that is fast, customizable, and respects their privacy. No bloatware,
                no ads, no tracking — just the features you actually need, packaged in
                a lightweight launcher that starts instantly and uses minimal resources.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Fair Play First</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client will never include cheats. No aimbot, no X-ray, no killaura.
                Every feature is designed to be allowed on major servers like Hypixel,
                GommeHD, and CubeCraft. We believe skill should determine outcomes,
                not software.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Open Source</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client is licensed under GPL-3.0. The entire codebase — launcher,
                mods, and website — is available on{" "}
                <a href="https://github.com/driftclient" className="text-drift-accent hover:underline">GitHub</a>.
                We welcome contributions from the community.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Built With</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4">
                  <h3 className="font-medium text-sm">Launcher</h3>
                  <p className="text-sm text-drift-muted mt-1">Tauri v2, React 18, Rust, Tailwind CSS</p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm">Mods</h3>
                  <p className="text-sm text-drift-muted mt-1">Fabric, Java 21, Kotlin 2.0, Fabric Loom</p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm">Website</h3>
                  <p className="text-sm text-drift-muted mt-1">Next.js 14, Tailwind CSS, Vercel</p>
                </div>
                <div className="card p-4">
                  <h3 className="font-medium text-sm">CI/CD</h3>
                  <p className="text-sm text-drift-muted mt-1">GitHub Actions, pnpm, Gradle</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Not Affiliated</h2>
              <p className="text-sm text-drift-muted">
                Drift Client is not affiliated with or endorsed by Mojang, Microsoft,
                or any Minecraft server network. Minecraft is a trademark of Mojang
                Synergies AB.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
