#!/usr/bin/env bash
set -euo pipefail

# Drift Client — Cross-platform build script
# Usage: ./build.sh [linux|windows|macos|flatpak|all]

TARGET="${1:-linux}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."

# Common PKG_CONFIG_PATH for Linux builds (Homebrew)
if [[ "$(uname)" == "Linux" ]] && command -v brew &>/dev/null; then
  export PKG_CONFIG_PATH="$(ls -d /home/linuxbrew/.linuxbrew/opt/*/lib/pkgconfig /home/linuxbrew/.linuxbrew/lib/pkgconfig /home/linuxbrew/.linuxbrew/opt/*/share/pkgconfig /home/linuxbrew/.linuxbrew/share/pkgconfig 2>/dev/null | paste -sd:)"
  export LD_LIBRARY_PATH="$(ls -d /home/linuxbrew/.linuxbrew/lib /home/linuxbrew/.linuxbrew/opt/*/lib 2>/dev/null | paste -sd:)"
fi

build_linux() {
  echo "📦 Building Linux (deb + rpm + AppImage)..."
  cd "$PROJECT_DIR/launcher"
  pnpm tauri build --target x86_64-unknown-linux-gnu
  echo "✅ Linux bundles in src-tauri/target/release/bundle/"
}

build_windows() {
  echo "📦 Building Windows (NSIS + MSI)..."
  cd "$PROJECT_DIR/launcher"
  pnpm tauri build --target x86_64-pc-windows-msvc
  echo "✅ Windows bundles in src-tauri/target/x86_64-pc-windows-msvc/release/bundle/"
}

build_macos() {
  echo "📦 Building macOS (DMG + app)..."
  cd "$PROJECT_DIR/launcher"
  # ARM64 (Apple Silicon)
  pnpm tauri build --target aarch64-apple-darwin
  # Intel
  pnpm tauri build --target x86_64-apple-darwin
  echo "✅ macOS bundles in src-tauri/target/*/release/bundle/"
}

build_flatpak() {
  echo "📦 Building Flatpak..."
  cd "$PROJECT_DIR/launcher/src-tauri"
  
  # First build the AppImage
  cd "$PROJECT_DIR/launcher"
  pnpm tauri build --target x86_64-unknown-linux-gnu
  
  # Then build Flatpak
  cd "$PROJECT_DIR/launcher/src-tauri/flatpak"
  flatpak-builder --user --install --force-clean build-dir gg.drift.client.json
  echo "✅ Flatpak installed: flatpak run gg.drift.client"
}

case "$TARGET" in
  linux)   build_linux ;;
  windows) build_windows ;;
  macos)   build_macos ;;
  flatpak) build_flatpak ;;
  all)
    build_linux
    build_windows
    build_macos
    build_flatpak
    ;;
  *)
    echo "Usage: $0 [linux|windows|macos|flatpak|all]"
    exit 1
    ;;
esac
