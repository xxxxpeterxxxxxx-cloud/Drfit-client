import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollText, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Licenses — Drift Client",
  description: "Open-source licenses for all third-party libraries and mods used by Drift Client.",
};

interface LicenseEntry {
  name: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl?: string;
}

const modLicenses: LicenseEntry[] = [
  { name: "Fabric API", author: "modmuss50", license: "Apache 2.0", licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0", sourceUrl: "https://modrinth.com/mod/fabric-api" },
  { name: "Sodium", author: "CaffeineMC", license: "PolyForm Shield 1.0.0", licenseUrl: "https://polyformproject.org/licenses/shield/1.0.0", sourceUrl: "https://modrinth.com/mod/sodium" },
  { name: "Lithium", author: "CaffeineMC", license: "GPL 3.0", licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html", sourceUrl: "https://modrinth.com/mod/lithium" },
  { name: "FerriteCore", author: "malte0811", license: "MIT", licenseUrl: "https://opensource.org/license/mit", sourceUrl: "https://modrinth.com/mod/ferrite-core" },
  { name: "Iris Shaders", author: "IrisShaders", license: "LGPL 3.0", licenseUrl: "https://www.gnu.org/licenses/lgpl-3.0.html", sourceUrl: "https://modrinth.com/mod/iris" },
  { name: "Mod Menu", author: "Terraformers", license: "MIT", licenseUrl: "https://opensource.org/license/mit", sourceUrl: "https://modrinth.com/mod/modmenu" },
];

const launcherLicenses: LicenseEntry[] = [
  { name: "Tauri", author: "Tauri Programme", license: "Apache 2.0 / MIT", licenseUrl: "https://github.com/tauri-apps/tauri/blob/dev/LICENSE", sourceUrl: "https://github.com/tauri-apps/tauri" },
  { name: "React", author: "Meta", license: "MIT", licenseUrl: "https://github.com/facebook/react/blob/main/LICENSE", sourceUrl: "https://github.com/facebook/react" },
  { name: "React Router", author: "Remix", license: "MIT", licenseUrl: "https://github.com/remix-run/react-router/blob/main/LICENSE.md", sourceUrl: "https://github.com/remix-run/react-router" },
  { name: "Zustand", author: "Poimandres", license: "MIT", licenseUrl: "https://github.com/pmndrs/zustand/blob/main/LICENSE", sourceUrl: "https://github.com/pmndrs/zustand" },
  { name: "Tailwind CSS", author: "Tailwind Labs", license: "MIT", licenseUrl: "https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE", sourceUrl: "https://github.com/tailwindlabs/tailwindcss" },
  { name: "Vite", author: "Evan You", license: "MIT", licenseUrl: "https://github.com/vitejs/vite/blob/main/LICENSE", sourceUrl: "https://github.com/vitejs/vite" },
  { name: "Lucide Icons", author: "Lucide Contributors", license: "ISC", licenseUrl: "https://github.com/lucide-icons/lucide/blob/main/LICENSE", sourceUrl: "https://github.com/lucide-icons/lucide" },
  { name: "reqwest", author: "Sean McArthur", license: "MIT / Apache 2.0", licenseUrl: "https://github.com/seanmonstar/reqwest/blob/master/LICENSE", sourceUrl: "https://github.com/seanmonstar/reqwest" },
  { name: "serde", author: "Erick Tryzelaar", license: "MIT / Apache 2.0", licenseUrl: "https://github.com/serde-rs/serde/blob/master/LICENSE", sourceUrl: "https://github.com/serde-rs/serde" },
  { name: "tokio", author: "Tokio Contributors", license: "MIT", licenseUrl: "https://github.com/tokio-rs/tokio/blob/master/LICENSE", sourceUrl: "https://github.com/tokio-rs/tokio" },
  { name: "keyring", author: "Walther Ch. Dulai", license: "MIT / Apache 2.0", licenseUrl: "https://github.com/hwchen/keyring-rs/blob/master/LICENSE", sourceUrl: "https://github.com/hwchen/keyring-rs" },
];

function LicenseTable({ entries }: { entries: LicenseEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-drift-border text-left text-xs text-drift-muted uppercase tracking-wider">
            <th className="py-3 pr-4 font-medium">Name</th>
            <th className="py-3 pr-4 font-medium">Author</th>
            <th className="py-3 pr-4 font-medium">License</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.name} className="border-b border-drift-border/40 hover:bg-drift-surface/40 transition-colors">
              <td className="py-3 pr-4">
                {entry.sourceUrl ? (
                  <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-drift-text hover:text-drift-accent transition-colors inline-flex items-center gap-1.5">
                    {entry.name}
                    <ExternalLink size={12} className="text-drift-muted" />
                  </a>
                ) : (
                  <span className="text-drift-text">{entry.name}</span>
                )}
              </td>
              <td className="py-3 pr-4 text-drift-text-secondary">{entry.author}</td>
              <td className="py-3 pr-4">
                <a href={entry.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-drift-accent hover:underline font-mono text-xs">
                  {entry.license}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LicensesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 min-h-screen">
        <div className="container-max">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-drift-accent/20 to-drift-accent/5 flex items-center justify-center border border-drift-accent/20">
              <ScrollText size={20} className="text-drift-accent" />
            </div>
            <h1 className="text-3xl font-bold">Open Source Licenses</h1>
          </div>
          <p className="text-drift-muted text-sm mb-10 max-w-2xl">
            Transparency matters. Drift Client is built on top of amazing open-source projects.
            Below you'll find all third-party libraries and mods we use, along with their licenses.
          </p>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-1">Bundled Mods</h2>
            <p className="text-drift-muted text-xs mb-4">Minecraft mods shipped with Drift Client.</p>
            <div className="card p-6">
              <LicenseTable entries={modLicenses} />
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-1">Launcher Dependencies</h2>
            <p className="text-drift-muted text-xs mb-4">Libraries powering the Drift Client launcher (Rust + TypeScript).</p>
            <div className="card p-6">
              <LicenseTable entries={launcherLicenses} />
            </div>
          </section>

          <section className="card p-6 border-drift-accent/20">
            <h2 className="text-lg font-semibold mb-2">Drift Client License</h2>
            <p className="text-sm text-drift-text-secondary mb-3">
              Drift Client itself is licensed under the{" "}
              <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-drift-accent hover:underline">
                GNU General Public License v3.0
              </a>.
            </p>
            <p className="text-xs text-drift-muted">
              Drift Client is not affiliated with or endorsed by Mojang or Microsoft.
              Minecraft is a trademark of Mojang Synergies AB.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
