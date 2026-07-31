"use client";

import { motion } from "framer-motion";
import {
  Gauge,
  Eye,
  Keyboard,
  ZoomIn,
  Sun,
  Crosshair,
  Users,
  Package,
  Layers,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "FPS & Performance",
    description:
      "Sodium, Lithium, and FerriteCore integrated out of the box. Get buttery-smooth frame rates without manual setup.",
  },
  {
    icon: Eye,
    title: "Customizable HUD",
    description:
      "FPS, Ping, CPS, Coordinates, Biome, and Armor durability — all freely positionable with drag & drop.",
  },
  {
    icon: Keyboard,
    title: "Keystrokes Overlay",
    description:
      "See your WASD and mouse inputs in real-time. Perfect for recording or streaming your gameplay.",
  },
  {
    icon: ZoomIn,
    title: "Adjustable Zoom",
    description:
      "Smooth zoom with customizable FOV reduction. Map it to any key you want.",
  },
  {
    icon: Sun,
    title: "Fullbright",
    description:
      "See in the dark with gamma override. Toggle on/off with a single keypress.",
  },
  {
    icon: Crosshair,
    title: "Custom Crosshair",
    description:
      "Pick your shape, color, and size. Replace the vanilla crosshair with something that fits your style.",
  },
  {
    icon: Users,
    title: "Fast Account Switcher",
    description:
      "Switch between Microsoft accounts instantly without restarting the game.",
  },
  {
    icon: Package,
    title: "Mod Management",
    description:
      "Browse and install mods from Modrinth directly in the launcher. No manual file dropping.",
  },
  {
    icon: Layers,
    title: "Profile Presets",
    description:
      "Save, export, and import configurations. Switch between Bedwars, Skyblock, and Survival presets instantly.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Built for players who <span className="text-gradient">care about details</span>
          </motion.h2>
          <p className="mt-4 text-lg text-drift-text-secondary max-w-2xl mx-auto">
            Every feature is designed to be useful, lightweight, and never get in your way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card p-6 hover:border-drift-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-drift-accent/10 flex items-center justify-center mb-4 group-hover:bg-drift-accent/20 transition-colors">
                <feature.icon size={24} className="text-drift-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-drift-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
