import { Package } from "lucide-react";

export default function ModsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Mods</h1>
        <p className="text-drift-muted text-sm mt-1">Browse and manage your installed mods.</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <Package size={40} className="text-drift-muted mx-auto mb-3" />
          <p className="text-drift-muted">Modrinth integration coming soon</p>
        </div>
      </div>
    </div>
  );
}
