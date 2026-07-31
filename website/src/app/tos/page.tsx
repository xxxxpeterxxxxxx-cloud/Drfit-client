import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TosPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-drift-muted text-sm mb-8">Last updated: July 2025</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">Acceptance</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                By downloading and using Drift Client, you agree to these terms.
                If you do not agree, do not use the software.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">License</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client is licensed under GPL-3.0. You are free to use, modify,
                and distribute the software under the terms of that license.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Minecraft Ownership</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                You must own a legitimate copy of Minecraft Java Edition to use
                Drift Client. Drift Client does not include or provide Minecraft.
                You are responsible for complying with Mojang's End User License Agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Fair Use</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client is designed for fair play. You agree not to:
              </p>
              <ul className="space-y-1 text-drift-text-secondary text-sm mt-2">
                <li>• Modify Drift Client to include cheats or exploits</li>
                <li>• Use Drift Client to violate server rules or anti-cheat policies</li>
                <li>• Distribute modified versions that violate the fair-play principle</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">No Warranty</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client is provided "as is" without warranty of any kind.
                We are not liable for any damages resulting from the use of this software.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Trademarks</h2>
              <p className="text-drift-text-secondary leading-relaxed">
                Drift Client is not affiliated with or endorsed by Mojang, Microsoft,
                Fabric, or any other trademark holder mentioned in our documentation.
                All trademarks belong to their respective owners.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
