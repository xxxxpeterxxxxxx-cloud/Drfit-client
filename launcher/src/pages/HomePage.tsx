import { useEffect } from "react";
import { useLaunchStore } from "../store/launchStore";
import { Play, AlertCircle, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { isLaunching, progress, status, activeProfile, activeAccount, error, loadProfiles, loadAccounts, launch } = useLaunchStore();
  const navigate = useNavigate();

  useEffect(() => {
    loadProfiles();
    loadAccounts();
  }, [loadProfiles, loadAccounts]);

  const profileName = activeProfile ? activeProfile.name : "No profile selected";
  const mcVersion = activeProfile ? activeProfile.minecraft_version : "—";
  const loader = activeProfile ? activeProfile.mod_loader : "—";

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/5 mb-6">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500 flex-1">{error}</p>
          <button className="text-xs text-red-400 hover:text-red-300" onClick={() => useLaunchStore.getState().setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg">
          {/* Profile & version info */}
          <div className="text-center mb-8">
            <p className="text-xs text-drift-muted uppercase tracking-wider mb-1">{loader}</p>
            <h1 className="text-3xl font-bold mb-1">{profileName}</h1>
            <p className="text-sm text-drift-muted font-mono">Minecraft {mcVersion}</p>
          </div>

          {/* Launch button */}
          {activeAccount ? (
            <button
              disabled={isLaunching || !activeProfile}
              onClick={() => launch()}
              className="w-full h-16 rounded-xl bg-drift-accent hover:bg-drift-accent-hover text-white font-semibold text-lg
                         transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-3 shadow-lg"
            >
              {isLaunching ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  {progress}%
                </>
              ) : (
                <>
                  <Play size={22} fill="currentColor" />
                  Play
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className="w-full h-16 rounded-xl bg-drift-surface-hover hover:bg-drift-border-light text-drift-text font-semibold text-lg
                         border border-drift-border transition-all duration-150
                         flex items-center justify-center gap-3"
            >
              <LogIn size={22} />
              Login to play
            </button>
          )}

          {/* Progress bar */}
          {isLaunching && (
            <div className="mt-4">
              <div className="h-1 bg-drift-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-drift-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-drift-muted mt-2 text-center">{status}</p>
            </div>
          )}

          {/* Account indicator */}
          {activeAccount && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <img
                src={`https://crafatar.com/avatars/${activeAccount.uuid}?size=16&overlay`}
                alt=""
                className="w-4 h-4 rounded image-render-pixelated"
              />
              <span className="text-xs text-drift-muted">{activeAccount.username}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
