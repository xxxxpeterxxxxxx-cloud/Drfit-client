import { getCurrentWindow } from "@tauri-apps/api/window";

export function TitleBar() {
  const appWindow = getCurrentWindow();

  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-between h-10 bg-drift-surface border-b border-drift-border px-3"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-drift-accent to-drift-accent-dark flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 6L2 10V2Z" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-drift-text">Drift</span>
        <span className="text-xs text-drift-muted">v0.2.0</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => appWindow.minimize()}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-drift-border text-drift-muted transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 5h10" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
        <button
          onClick={() => appWindow.toggleMaximize()}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-drift-border text-drift-muted transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" rx="1" /></svg>
        </button>
        <button
          onClick={() => appWindow.close()}
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-500/80 hover:text-white text-drift-muted transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M0 0l10 10M10 0L0 10" stroke="currentColor" strokeWidth="1.5" /></svg>
        </button>
      </div>
    </div>
  );
}
