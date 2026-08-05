#!/bin/bash
# Run Drift Launcher with correct PKG_CONFIG_PATH for Homebrew dependencies
# Needed because the system -devel packages are staged but not yet active (needs reboot)

BREW="/var/home/linuxbrew/.linuxbrew"

export PKG_CONFIG="$BREW/bin/pkg-config"
export PKG_CONFIG_PATH="$BREW/lib/pkgconfig:$BREW/share/pkgconfig:$BREW/opt/gtk+3/lib/pkgconfig:$BREW/opt/webkitgtk/lib/pkgconfig:$BREW/opt/glib/lib/pkgconfig:$BREW/opt/cairo/lib/pkgconfig:$BREW/opt/pango/lib/pkgconfig:$BREW/opt/harfbuzz/lib/pkgconfig:$BREW/opt/gdk-pixbuf/lib/pkgconfig:$BREW/opt/atk/lib/pkgconfig:$BREW/Cellar/xorgproto/2025.1/share/pkgconfig:$BREW/Cellar/libx11/1.8.13/lib/pkgconfig:$BREW/Cellar/libxext/1.3.6/lib/pkgconfig:$BREW/Cellar/libxrender/0.9.12/lib/pkgconfig:$BREW/Cellar/libxau/1.0.12/lib/pkgconfig:$BREW/Cellar/libxdmcp/1.1.5/lib/pkgconfig:$BREW/Cellar/libxcb/1.17.0/lib/pkgconfig"
export LD_LIBRARY_PATH="$BREW/lib:${LD_LIBRARY_PATH:-}"

cd "$(dirname "$0")"

# Build frontend if dist doesn't exist
if [ ! -d "dist" ]; then
  echo "Building frontend..."
  npx vite build
fi

# Run in dev mode
exec npx tauri dev
