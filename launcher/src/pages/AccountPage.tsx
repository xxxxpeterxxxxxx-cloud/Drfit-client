import { useEffect, useState } from "react";
import { User, Plus, LogOut, Check, Shield, AlertCircle, Loader2, ExternalLink, Copy } from "lucide-react";
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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-drift-muted text-sm mt-1">Manage your Microsoft accounts.</p>
      </div>

      {error && (
        <div className="card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-500">{error}</p>
          <button className="ml-auto text-xs text-red-400 hover:text-red-300" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {/* Device code display during login */}
      {loggingIn && deviceCode && (
        <div className="card p-6 border-drift-accent/40 bg-drift-accent/5">
          <div className="text-center space-y-4">
            <Loader2 size={24} className="text-drift-accent animate-spin mx-auto" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Authenticate with Microsoft</h3>
              <p className="text-xs text-drift-muted">
                Go to the link below and enter the code. We're waiting for you to sign in.
              </p>
            </div>
            <div className="bg-drift-bg rounded-xl p-4 border border-drift-border">
              <p className="text-xs text-drift-muted mb-1">Enter this code at:</p>
              <a
                href={deviceCode.verification_uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-drift-accent text-sm font-mono hover:underline inline-flex items-center gap-1"
              >
                {deviceCode.verification_uri}
                <ExternalLink size={12} />
              </a>
              <div className="mt-3 flex items-center justify-center gap-2">
                <code className="text-2xl font-mono font-bold tracking-widest text-drift-text bg-drift-surface px-4 py-2 rounded-lg border border-drift-border">
                  {deviceCode.user_code}
                </code>
                <button
                  onClick={copyCode}
                  className="btn-secondary text-xs px-2 py-2"
                  title="Copy code"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-drift-muted">
              Waiting for authentication... This window will close automatically when you're done.
            </p>
          </div>
        </div>
      )}

      {/* Logging in but no device code yet */}
      {loggingIn && !deviceCode && (
        <div className="card p-6 border-drift-accent/30 flex items-center gap-4">
          <Loader2 size={24} className="text-drift-accent animate-spin flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">Requesting device code...</h3>
            <p className="text-xs text-drift-muted mt-0.5">Preparing Microsoft authentication.</p>
          </div>
        </div>
      )}

      {/* Active account skin preview */}
      {accounts.length > 0 && activeUuid && (
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-semibold text-sm">Skin Preview</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://crafatar.com/renders/body/${activeUuid}?size=128&overlay`}
                alt="Skin body"
                className="h-48 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="text-xs text-drift-muted">Body</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://crafatar.com/renders/head/${activeUuid}?size=64&overlay`}
                alt="Skin head 3D"
                className="h-16 w-16"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="text-xs text-drift-muted">Head</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <img
                src={`https://crafatar.com/skins/${activeUuid}`}
                alt="Skin texture"
                className="h-16 w-64 image-render-pixelated rounded-lg border border-drift-border"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <p className="text-xs text-drift-muted">Texture</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <div
            key={account.uuid}
            className={`card p-5 transition-colors ${
              activeUuid === account.uuid ? "border-drift-accent/50 bg-drift-accent/5" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-drift-accent/20 to-drift-accent/5 border border-drift-border flex items-center justify-center overflow-hidden">
                  <User size={24} className="text-drift-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{account.username}</h3>
                    {activeUuid === account.uuid && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 flex items-center gap-1">
                        <Check size={10} /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-drift-muted font-mono mt-0.5">{account.uuid}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeUuid !== account.uuid && (
                  <button className="btn-secondary text-xs px-3 py-1.5" onClick={() => handleSwitch(account.uuid)}>
                    Switch
                  </button>
                )}
                <button
                  className="text-drift-muted hover:text-red-500 p-1.5 transition-colors"
                  onClick={() => handleLogout(account.uuid)}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loggingIn && (
        <button
          className="card p-5 w-full text-left hover:border-drift-accent/30 transition-colors border-dashed"
          onClick={handleLogin}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl border border-dashed border-drift-border flex items-center justify-center">
              <Plus size={24} className="text-drift-muted" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Add Microsoft Account</h3>
              <p className="text-xs text-drift-muted mt-0.5">
                Login with your Microsoft account to play Minecraft.
              </p>
            </div>
          </div>
        </button>
      )}

      <div className="card p-4 bg-drift-bg/50">
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-drift-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium">Secure Authentication</p>
            <p className="text-xs text-drift-muted mt-1 leading-relaxed">
              Drift Client uses Microsoft's official OAuth2 device code flow. Your password is
              never entered in the launcher — you authenticate directly with Microsoft in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
