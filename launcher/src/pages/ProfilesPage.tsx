import { Layers } from "lucide-react";

export default function ProfilesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Profiles</h1>
        <p className="text-drift-muted text-sm mt-1">Switch between Minecraft versions and mod configurations.</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <Layers size={40} className="text-drift-muted mx-auto mb-3" />
          <p className="text-drift-muted">Profile management coming soon</p>
        </div>
      </div>
    </div>
  );
}
