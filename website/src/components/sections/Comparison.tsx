"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "FPS Boost (Sodium/Lithium)", drift: true, vanilla: false },
  { feature: "Customizable HUD", drift: true, vanilla: false },
  { feature: "Keystrokes Overlay", drift: true, vanilla: false },
  { feature: "Toggle Sprint/Sneak", drift: true, vanilla: false },
  { feature: "Adjustable Zoom", drift: true, vanilla: false },
  { feature: "Fullbright", drift: true, vanilla: false },
  { feature: "Custom Crosshair", drift: true, vanilla: false },
  { feature: "Fast Account Switcher", drift: true, vanilla: false },
  { feature: "Mod Browser (Modrinth)", drift: true, vanilla: false },
  { feature: "Profile Presets", drift: true, vanilla: false },
  { feature: "1.8.9 PvP Support", drift: true, vanilla: true },
  { feature: "Fair-Play Mode", drift: true, vanilla: true },
  { feature: "Lightweight (~10MB)", drift: true, vanilla: false },
  { feature: "Open Source (GPL-3.0)", drift: true, vanilla: false },
];

export function Comparison() {
  return (
    <section className="py-24">
      <div className="container-max">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Drift vs <span className="text-drift-muted">Vanilla</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card overflow-hidden max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-3 border-b border-drift-border">
            <div className="p-4 font-semibold">Feature</div>
            <div className="p-4 font-semibold text-center text-drift-accent">Drift</div>
            <div className="p-4 font-semibold text-center text-drift-muted">Vanilla</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-drift-bg/30" : ""}`}
            >
              <div className="p-4 text-sm text-drift-text-secondary">{row.feature}</div>
              <div className="p-4 flex justify-center">
                {row.drift ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <X size={18} className="text-drift-muted" />
                )}
              </div>
              <div className="p-4 flex justify-center">
                {row.vanilla ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <X size={18} className="text-drift-muted" />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
