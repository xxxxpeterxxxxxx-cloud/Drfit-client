import { User, Plus, LogOut, Check, Shield } from "lucide-react";

const accounts = [
  { username: "Steve_Builds", uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", active: true },
  { username: "Alex_PvP", uuid: "b2c3d4e5-f6a7-8901-bcde-f12345678901", active: false },
];

export default function AccountPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-drift-muted text-sm mt-1">Manage your Microsoft accounts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {accounts.map((account) => (
          <div
            key={account.uuid}
            className={`card p-5 transition-colors ${
              account.active ? "border-drift-accent/50 bg-drift-accent/5" : ""
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
                    {account.active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 flex items-center gap-1">
                        <Check size={10} /> Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-drift-muted font-mono mt-0.5">{account.uuid}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!account.active && (
                  <button className="btn-secondary text-xs px-3 py-1.5">Switch</button>
                )}
                <button className="text-drift-muted hover:text-red-500 p-1.5 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="card p-5 w-full text-left hover:border-drift-accent/30 transition-colors border-dashed">
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

      <div className="card p-4 bg-drift-bg/50">
        <div className="flex items-start gap-3">
          <Shield size={16} className="text-drift-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium">Secure Authentication</p>
            <p className="text-xs text-drift-muted mt-1 leading-relaxed">
              Your credentials are stored in your OS keychain. Drift Client never sees
              or stores your password. Authentication uses Microsoft's official OAuth2 flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
