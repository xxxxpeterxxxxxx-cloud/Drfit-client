import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-drift-muted text-sm mt-1">Configure your Drift Client experience.</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <Settings size={40} className="text-drift-muted mx-auto mb-3" />
          <p className="text-drift-muted">Settings panel coming soon</p>
        </div>
      </div>
    </div>
  );
}
