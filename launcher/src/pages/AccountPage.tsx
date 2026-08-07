import { useEffect, useState } from "react";
import { LogOut, LogIn, Check, AlertCircle, Loader2, ExternalLink, Copy, Plus } from "lucide-react";
import { authApi, onDeviceCode, type Account, type DeviceCodeInfo } from "../api/tauri";

export default function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeUuid, setActiveUuid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [deviceCode, setDeviceCode] = useState<DeviceCodeInfo | null>(null);
  const [copied, setCopied] = useState(false);

  const load = async () => {
    try {
      const list = await authApi.getAccounts();
      setAccounts(list);
      setActiveUuid(list.length > 0 ? list[0].uuid : null);
    } catch (e) {
      setError(String(e));
    }
  };

  useEffect(() => {
    load();
    let unlistenFn: (() => void) | null = null;
    const unlistenPromise = onDeviceCode((info) => setDeviceCode(info));
    unlistenPromise.then((fn) => { unlistenFn = fn; });
    return () => { if (unlistenFn) unlistenFn(); };
  }, []);

  const handleLogin = async () => {
    setLoggingIn(true);
    setError(null);
    setDeviceCode(null);
    try {
      await authApi.loginMicrosoft();
      setDeviceCode(null);
      load();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoggingIn(false);
      setDeviceCode(null);
    }
  };

  const handleSwitch = async (uuid: string) => {
    try {
      await authApi.switchAccount(uuid);
      setActiveUuid(uuid);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const handleLogout = async (uuid: string) => {
    try {
      await authApi.logout(uuid);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const copyCode = () => {
    if (!deviceCode) return;
    navigator.clipboard.writeText(deviceCode.user_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/5 mb-6">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500 flex-1">{error}</p>
          <button className="text-xs text-red-400 hover:text-red-300" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {/* Device code display during login */}
      {loggingIn && deviceCode && (
        <div className="text-center space-y-6 py-8">
          <Loader2 size={28} className="text-drift-accent animate-spin mx-auto" />
          <div>
            <h2 className="font-semibold mb-1">Sign in with Microsoft</h2>
            <p className="text-sm text-drift-muted">Open the link below and enter the code.</p>
          </div>
          <div className="bg-drift-bg rounded-xl p-5 border border-drift-border">
            <a
              href={deviceCode.verification_uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-drift-accent text-sm font-mono hover:underline inline-flex items-center gap-1.5"
            >
              {deviceCode.verification_uri}
              <ExternalLink size={12} />
            </a>
            <div className="mt-4 flex items-center justify-center gap-2">
              <code className="text-2xl font-mono font-bold tracking-widest text-drift-text bg-drift-surface px-5 py-2.5 rounded-lg border border-drift-border">
                {deviceCode.user_code}
              </code>
              <button
                onClick={copyCode}
                className="h-11 w-11 rounded-lg bg-drift-surface-hover hover:bg-drift-border-light border border-drift-border flex items-center justify-center transition-colors"
                title="Copy code"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          <p className="text-xs text-drift-muted">Waiting for you to sign in...</p>
        </div>
      )}

      {/* Logging in but no device code yet */}
      {loggingIn && !deviceCode && (
        <div className="flex items-center gap-3 py-8 justify-center">
          <Loader2 size={20} className="text-drift-accent animate-spin" />
          <span className="text-sm text-drift-muted">Requesting device code...</span>
        </div>
      )}

      {/* Account list */}
      {!loggingIn && accounts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-drift-muted uppercase tracking-wider mb-4">Accounts</h2>
          {accounts.map((account) => (
            <div
              key={account.uuid}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                activeUuid === account.uuid
                  ? "border-drift-accent/40 bg-drift-accent/5"
                  : "border-drift-border bg-drift-surface"
              }`}
            >
              <img
                src={`https://crafatar.com/avatars/${account.uuid}?size=32&overlay`}
                alt=""
                className="w-9 h-9 rounded-md image-render-pixelated"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{account.username}</p>
                {activeUuid === account.uuid && (
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <Check size={10} /> Active
                  </p>
                )}
              </div>
              {activeUuid !== account.uuid && (
                <button
                  className="text-xs px-3 py-1.5 rounded-md bg-drift-surface-hover hover:bg-drift-border-light border border-drift-border transition-colors"
                  onClick={() => handleSwitch(account.uuid)}
                >
                  Switch
                </button>
              )}
              <button
                className="p-1.5 text-drift-muted hover:text-red-500 transition-colors"
                onClick={() => handleLogout(account.uuid)}
              >
                <LogOut size={16} />
              </button>
            </div>
          ))}

          <button
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-dashed border-drift-border hover:border-drift-accent/30 transition-colors text-left"
            onClick={handleLogin}
          >
            <div className="w-9 h-9 rounded-md border border-dashed border-drift-border flex items-center justify-center">
              <Plus size={18} className="text-drift-muted" />
            </div>
            <span className="text-sm text-drift-muted">Add another account</span>
          </button>
        </div>
      )}

      {/* No accounts — centered login */}
      {!loggingIn && accounts.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-xl font-bold mb-2">Sign in to play</h2>
          <p className="text-sm text-drift-muted mb-8">Login with your Microsoft account to launch Minecraft.</p>
          <button
            onClick={handleLogin}
            className="h-12 px-8 rounded-xl bg-drift-accent hover:bg-drift-accent-hover text-white font-medium transition-colors inline-flex items-center gap-2"
          >
            <LogIn size={18} />
            Login with Microsoft
          </button>
        </div>
      )}
    </div>
  );
}
