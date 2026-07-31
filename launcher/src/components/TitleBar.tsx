import { getCurrentWindow } from "@tauri-apps/api/window";

export function TitleBar() {
  const appWindow = getCurrentWindow();

  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-between h-9 bg-drift-surface border-b border-drift-border px-3"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-drift-text">Drift Client</span>
        <span className="text-xs text-drift-muted">v0.1.0</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => appWindow.minimize()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-drift-border text-drift-muted"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <button
          onClick={() => appWindow.toggleMaximize()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-drift-border text-drift-muted"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <button
          onClick={() => appWindow.close()}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/80 text-drift-muted"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>
    </div>
  );
}
