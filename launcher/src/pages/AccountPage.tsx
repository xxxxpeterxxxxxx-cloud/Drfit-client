import { User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-drift-muted text-sm mt-1">Manage your Microsoft accounts.</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <User size={40} className="text-drift-muted mx-auto mb-3" />
          <p className="text-drift-muted">Microsoft OAuth login coming soon</p>
        </div>
      </div>
    </div>
  );
}
