import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ModsDevPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="container-max py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Mod Development</h1>
          <p className="text-drift-text-secondary mb-8">
            Build your own Drift-compatible mods using the Drift Core API and Fabric.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">Drift Core API</h2>
              <p className="text-drift-text-secondary mb-3">
                Drift Core provides three main services for mods:
              </p>
              <ul className="space-y-2 text-drift-text-secondary">
                <li>• <strong>ModRegistry</strong> — Register your module and its state</li>
                <li>• <strong>ConfigManager</strong> — Read and write JSON configs</li>
                <li>• <strong>EventBus</strong> — Publish and subscribe to custom events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Creating a Module</h2>
              <p className="text-drift-text-secondary mb-3">
                Extend <code className="text-drift-accent">DriftModule</code> and register in your entrypoint:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`package gg.drift.example;

import gg.drift.core.DriftModule;
import gg.drift.core.ModRegistry;
import gg.drift.core.EventBus;
import gg.drift.core.event.DriftEvent;

public class ExampleModule extends DriftModule {

    public ExampleModule() {
        super("example", "Example Module", "1.0.0");
    }

    @Override
    public void onEnable() {
        // Called when the module is enabled
        EventBus.subscribe("drift:tick", this::onTick);
    }

    @Override
    public void onDisable() {
        // Called when the module is disabled
        EventBus.unsubscribe("drift:tick", this::onTick);
    }

    private void onTick(DriftEvent event) {
        // Called every game tick
    }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Registering the Module</h2>
              <p className="text-drift-text-secondary mb-3">
                In your mod's entrypoint (Fabric <code className="text-drift-accent">ClientModInitializer</code>):
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`public class ExampleMod implements ClientModInitializer {
    @Override
    public void onInitializeClient() {
        ModRegistry.register(new ExampleModule());
    }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Using ConfigManager</h2>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`public class ExampleModule extends DriftModule {
    private ExampleConfig config;

    @Override
    public void onEnable() {
        config = ConfigManager.load("example", ExampleConfig.class);
    }

    @Override
    public void onDisable() {
        ConfigManager.save("example", config);
    }
}

public class ExampleConfig {
    public boolean someSetting = true;
    public int someValue = 42;
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Rendering HUD Elements</h2>
              <p className="text-drift-text-secondary mb-3">
                Use the rendering helpers from drift-core:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`import gg.drift.core.render.ColorUtils;
import gg.drift.core.render.ScreenPosition;
import gg.drift.core.render.RenderHelper;

public class ExampleHudElement {
    private ScreenPosition pos = new ScreenPosition(10, 10);

    public void render(float tickDelta) {
        int bgColor = ColorUtils.rgba(0, 0, 0, 120);
        int textColor = ColorUtils.rgb(255, 255, 255);

        RenderHelper.drawOutlinedRect(
            (int) pos.getX(), (int) pos.getY(),
            100, 20, bgColor, ColorUtils.rgb(59, 130, 246)
        );
        RenderHelper.drawText("Hello Drift!", (int) pos.getX() + 4, (int) pos.getY() + 5, textColor);
    }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">fabric.mod.json</h2>
              <p className="text-drift-text-secondary mb-3">
                Add drift-core as a dependency:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`{
  "schemaVersion": 1,
  "id": "drift-example",
  "depends": {
    "minecraft": ">=1.21",
    "fabricloader": ">=0.15.0",
    "drift-core": "*"
  },
  "entrypoints": {
    "client": ["gg.drift.example.ExampleMod"]
  }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">build.gradle.kts</h2>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text overflow-x-auto">
{`dependencies {
    minecraft("com.mojang:minecraft:1.21")
    mappings("net.fabricmc:yarn:1.21+build.1:v2")
    modImplementation("net.fabricmc:fabric-loader:0.15.0")
    modImplementation("gg.drift:drift-core:0.1.0")
}`}
              </pre>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
