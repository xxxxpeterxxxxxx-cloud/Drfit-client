# Drift Client

A modular, open-source Minecraft client built for performance, customization, and fair play.

## Architecture

| Component | Tech | Description |
|---|---|---|
| **Launcher** | Tauri v2 (React + Rust) | Lightweight launcher with mod management, profiles, and account switching |
| **Mods** | Java/Kotlin + Fabric | In-game modules: HUD, QoL, Performance, Legacy (1.8.9) |
| **Website** | Next.js 14 + Tailwind | Premium landing page, docs, changelog on Vercel |

## Supported Versions

- **1.21+**: Standard Fabric API
- **1.8.9**: Legacy Fabric API (PvP)

## License

GPL-3.0 — Not affiliated with Minecraft/Mojang. Users must own a valid Minecraft account.
