# Contributing to Drift Client

Thanks for your interest in contributing! This guide covers the basics.

## Project Structure

```
drift-client/
├── launcher/     # Tauri v2 launcher (React + Rust)
├── mods/         # Fabric mods (Java/Kotlin, Gradle multi-project)
├── website/      # Next.js 14 website
├── shared/       # Shared config schemas and types
└── .github/      # CI/CD workflows
```

## Prerequisites

- **Node.js** 20+ and **pnpm** 9+
- **Rust** (stable) with **cargo**
- **Java** 21 (for mods)
- **Tauri CLI** v2 (`cargo install tauri-cli`)

## Setup

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

## Code Style

### TypeScript/React (Launcher + Website)
- Use functional components with hooks
- Prefer `const` over `let`
- Use Tailwind classes for styling — no inline styles
- Keep files under 200 lines where possible
- Use `@/` path alias for imports

### Rust (Launcher backend)
- Use `tracing` for logging (not `println!`)
- Handle errors with `anyhow::Result` or `thiserror`
- Keep Tauri commands in their respective modules

### Java/Kotlin (Mods)
- Java: Follow Fabric conventions, use `org.slf4j.Logger`
- Kotlin: Use idiomatic Kotlin, prefer data classes
- All modules extend `DriftModule` and register with `ModRegistry`
- Config classes go in `gg.drift.core.config`

## Commit Convention

Use [conventional commits](https://www.conventionalcommits.org/):

```
feat: add FPS counter to HUD
fix: resolve crash on 1.8.9 world load
docs: update installation guide
refactor: simplify config loading
```

## Pull Requests

1. Fork the repo and create a branch: `feat/your-feature`
2. Make your changes, keep commits clean
3. Test locally: `pnpm build` and `./gradlew build`
4. Open a PR with a clear description of what and why

## Fair Play Policy

Drift Client is a **fair-play** client. We do NOT accept contributions that:
- Add cheats (aimbot, killaura, fly, xray, cave ESP)
- Bypass server anti-cheat systems
- Violate Mojang's EULA

## License

By contributing, you agree that your code will be licensed under GPL-3.0.
