import { Palette } from "lucide-react";

export default function CosmeticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Cosmetics</h1>
        <p className="text-drift-muted text-sm mt-1">Customize your look with capes and cosmetics.</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <Palette size={40} className="text-drift-muted mx-auto mb-3" />
          <p className="text-drift-muted">Cosmetics system coming soon</p>
        </div>
      </div>
    </div>
  );
}
