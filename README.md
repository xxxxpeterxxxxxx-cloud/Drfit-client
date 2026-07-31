# Drift Client

A modular, open-source Minecraft client built for performance, customization, and fair play.

Everything you need. Nothing you don't.

## Features

- **FPS Boost** — Sodium, Lithium, and FerriteCore integrated out of the box
- **Customizable HUD** — FPS, Ping, CPS, Coordinates, Keystrokes — drag & drop positioning
- **QoL Features** — Toggle Sprint, Adjustable Zoom, Fullbright, Custom Crosshair
- **Multi-Version** — Minecraft 1.21+ (latest) and 1.8.9 (PvP via Legacy Fabric)
- **Mod Browser** — Browse and install mods from Modrinth directly in the launcher
- **Profile Presets** — Save, export, and import configurations for different playstyles
- **Account Switcher** — Switch between Microsoft accounts without restarting
- **Fair Play** — No cheats, no X-ray, no aimbot. Server-compliant features only
- **Lightweight** — ~10MB launcher built with Tauri v2 (no Electron bloat)
- **Open Source** — GPL-3.0, fully transparent, community-driven

## Architecture

| Component | Tech | Description |
|---|---|---|
| **Launcher** | Tauri v2 (React 18 + Rust) | Lightweight launcher with mod management, profiles, and account switching |
| **Mods** | Java 21 / Kotlin 2.0 + Fabric | In-game modules: Core, HUD, QoL, Performance, Legacy (1.8.9) |
| **Website** | Next.js 14 + Tailwind CSS | Premium landing page, docs, changelog on Vercel |
| **Shared** | JSON Schema + TypeScript | Config schema shared between launcher and mods |
| **CI/CD** | GitHub Actions | Automated builds for website, launcher, and mods |

## Project Structure

```
drift-client/
├── launcher/              # Tauri v2 launcher
│   ├── src/               # React frontend (TypeScript)
│   │   ├── components/    # Sidebar, TitleBar
│   │   ├── pages/         # Home, Mods, Cosmetics, Profiles, Settings, Account
│   │   └── store/         # Zustand state management
│   └── src-tauri/         # Rust backend
│       └── src/           # auth, minecraft, fabric, profile, modrinth modules
├── mods/                  # Gradle multi-project (Fabric)
│   ├── drift-core/        # Config, ModRegistry, EventBus, Rendering utils
│   ├── drift-hud/         # HUD elements (FPS, Ping, CPS, Keystrokes)
│   ├── drift-qol/         # Quality-of-life features (Kotlin)
│   ├── drift-perf/        # Performance mod integration
│   └── drift-legacy/      # 1.8.9 Legacy Fabric support
├── website/               # Next.js 14 website
│   └── src/
│       ├── app/           # App Router pages (landing, docs, changelog, etc.)
│       └── components/    # Navbar, Footer, sections (Hero, Features, etc.)
├── shared/                # Shared config schema + TypeScript types
├── .github/workflows/     # CI/CD pipelines
├── LICENSE                # GPL-3.0
└── CONTRIBUTING.md        # Contribution guide
```

## Supported Versions

- **1.21+**: Standard Fabric API (Java 21)
- **1.8.9**: Legacy Fabric API (Java 8) — for PvP

## Setup

### Prerequisites

- **Node.js** 20+ and **pnpm** 9+
- **Rust** (stable) with **cargo**
- **Java** 21 (for mods)
- **Tauri CLI** v2 (`cargo install tauri-cli`)

### Install & Run

```bash
# Clone
git clone https://github.com/driftclient/drift-client.git
cd drift-client

# Install web dependencies
pnpm install

# Run website dev server
pnpm dev:website

# Run launcher dev (requires Tauri CLI)
pnpm dev:launcher

# Build mods (requires Java 21)
cd mods && ./gradlew build
```

## Mod Development

Drift Core provides three main services:

- **ModRegistry** — Register your module and its state
- **ConfigManager** — Read and write JSON configs
- **EventBus** — Publish and subscribe to custom events

See the [Mod Development Guide](https://drift.gg/docs/mods) for full documentation.

## Fair Play Policy

Drift Client will **never** include cheats. No aimbot, no X-ray, no killaura.
Every feature is designed to be allowed on major servers like Hypixel, GommeHD, and CubeCraft.

## License

GPL-3.0 — See [LICENSE](LICENSE). Not affiliated with Minecraft/Mojang.
Users must own a valid Minecraft account.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests welcome!
