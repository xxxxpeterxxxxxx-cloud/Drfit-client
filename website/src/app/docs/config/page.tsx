export default function ConfigPage() {
  return (
    <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Configuration Reference</h1>
          <p className="text-drift-text-secondary mb-8">
            All configuration options for Drift Client, stored in <code className="text-drift-accent">~/.minecraft/config/drift/</code>.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">Config File Location</h2>
              <p className="text-drift-text-secondary mb-2">
                Drift Client stores its configuration as JSON files:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text">
{`~/.minecraft/config/drift/
├── drift.json          # Main config
├── hud.json            # HUD element positions
├── qol.json            # QoL feature settings
└── perf.json           # Performance mod config`}
              </pre>
              <p className="text-sm text-drift-text-secondary mt-2">
                Configs are hot-reloadable — changes take effect without restarting the game.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Module Toggles</h2>
              <p className="text-drift-text-secondary mb-3">
                Enable or disable entire Drift modules:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text">
{`{
  "modules": {
    "core": true,
    "hud": true,
    "qol": true,
    "perf": true,
    "legacy": false
  }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">HUD Configuration</h2>
              <p className="text-drift-text-secondary mb-3">
                Each HUD element has position, scale, and enable toggle:
              </p>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text">
{`{
  "hud": {
    "preset": "default",
    "elements": [
      {
        "id": "fps",
        "enabled": true,
        "x": 5,
        "y": 5,
        "scale": 1.0
      },
      {
        "id": "ping",
        "enabled": true,
        "x": 5,
        "y": 20,
        "scale": 1.0
      },
      {
        "id": "cps",
        "enabled": false,
        "x": 5,
        "y": 35,
        "scale": 1.0
      },
      {
        "id": "coordinates",
        "enabled": true,
        "x": 5,
        "y": 50,
        "scale": 1.0
      },
      {
        "id": "keystrokes",
        "enabled": true,
        "x": 10,
        "y": 200,
        "scale": 1.0
      }
    ]
  }
}`}
              </pre>
              <p className="text-sm text-drift-text-secondary mt-2">
                Available presets: <code className="text-drift-accent">default</code>,{" "}
                <code className="text-drift-accent">bedwars</code>,{" "}
                <code className="text-drift-accent">skyblock</code>,{" "}
                <code className="text-drift-accent">survival</code>,{" "}
                <code className="text-drift-accent">custom</code>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">QoL Configuration</h2>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text">
{`{
  "qol": {
    "toggleSprint": true,
    "toggleSneak": false,
    "fullbright": false,
    "discordRpc": true,
    "zoom": {
      "enabled": true,
      "fov": 30
    },
    "customCrosshair": {
      "enabled": false,
      "shape": "cross",
      "color": "#FFFFFF",
      "size": 2
    }
  }
}`}
              </pre>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Performance Configuration</h2>
              <pre className="bg-drift-bg rounded-lg p-4 text-sm font-mono text-drift-text">
{`{
  "perf": {
    "sodium": true,
    "lithium": true,
    "ferriteCore": true,
    "iris": false,
    "ramLimit": 4096,
    "jvmArgs": []
  }
}`}
              </pre>
              <p className="text-sm text-drift-text-secondary mt-2">
                <strong>Note:</strong> Iris (shaders) is disabled by default for maximum FPS.
                Enable it if you want to use shader packs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Profile Presets</h2>
              <p className="text-drift-text-secondary mb-3">
                Export your current configuration as a <code className="text-drift-accent">.drift-profile</code> file:
              </p>
              <ul className="space-y-2 text-drift-text-secondary text-sm">
                <li>• Open the launcher → Settings → Export Profile</li>
                <li>• Choose a name and save the file</li>
                <li>• Share the file or import it on another machine</li>
                <li>• Import via Settings → Import Profile</li>
              </ul>
            </section>
          </div>
    </div>
  );
}
