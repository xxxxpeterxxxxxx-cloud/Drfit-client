"use client";

import { useEffect, useMemo, type CSSProperties } from "react";
import {
  useAmbient,
  SEASONAL_ACCENTS,
  type Season,
  type TimeOfDay,
  type Weather,
} from "@/lib/useAmbient";

const SEASON_GRADIENTS: Record<Season, string> = {
  spring:
    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(91, 186, 58, 0.05) 0%, transparent 70%)",
  summer:
    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(38, 184, 171, 0.04) 0%, transparent 70%)",
  autumn:
    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74, 237, 216, 0.04) 0%, transparent 70%)",
  winter:
    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(96, 165, 250, 0.04) 0%, transparent 70%)",
};

const TIME_OVERLAYS: Record<TimeOfDay, string> = {
  dawn: "linear-gradient(180deg, rgba(91, 186, 58, 0.02) 0%, transparent 50%)",
  day: "linear-gradient(180deg, rgba(38, 184, 171, 0.02) 0%, transparent 50%)",
  dusk: "linear-gradient(180deg, rgba(74, 237, 216, 0.03) 0%, transparent 50%)",
  night: "linear-gradient(180deg, rgba(10, 14, 18, 0.12) 0%, transparent 50%)",
};

const SPECIAL_TINTS: Record<string, string> = {
  christmas:
    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(220, 50, 50, 0.04) 0%, transparent 60%)",
  halloween:
    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255, 140, 0, 0.04) 0%, transparent 60%)",
  newyear: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(252, 211, 77, 0.04) 0%, transparent 60%)",
  "newyear-eve":
    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(252, 211, 77, 0.04) 0%, transparent 60%)",
  "mc-birthday":
    "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(91, 186, 58, 0.05) 0%, transparent 60%)",
};

interface Particle {
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  sway: number;
  rotation: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 8 + Math.random() * 14,
    size: 2 + Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.35,
    sway: Math.random() * 60 - 30,
    rotation: Math.random() * 360,
  }));
}

const LEAF_COLORS = ["#4AEDD8", "#3DD0C0", "#5BBA3A", "#26B8AB", "#7CDA4E"];

export function AmbientBackground() {
  const ambient = useAmbient();
  const accent = SEASONAL_ACCENTS[ambient.season];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", `${accent.h} ${accent.s}% ${accent.l}%`);
    root.style.setProperty(
      "--accent-hover",
      `${accent.h} ${accent.s}% ${Math.max(accent.l - 7, 0)}%`
    );
    root.style.setProperty(
      "--accent-dark",
      `${accent.h} ${accent.s}% ${Math.max(accent.l - 13, 0)}%`
    );
    root.style.setProperty(
      "--accent-light",
      `${accent.h} ${accent.s}% ${Math.min(accent.l + 12, 100)}%`
    );
  }, [accent.h, accent.s, accent.l]);

  const particles = useMemo(() => {
    const w = ambient.weather;
    if (w === "snow") return generateParticles(25);
    if (w === "rain") return generateParticles(35);
    if (ambient.season === "autumn") return generateParticles(12);
    if (ambient.season === "spring" && w === "clear") return generateParticles(8);
    return [];
  }, [ambient.weather, ambient.season]);

  const specialTint = ambient.special ? SPECIAL_TINTS[ambient.special] : null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
        style={{ background: SEASON_GRADIENTS[ambient.season] }}
      />
      <div
        className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
        style={{ background: TIME_OVERLAYS[ambient.timeOfDay] }}
      />
      {specialTint && (
        <div className="absolute inset-0" style={{ background: specialTint }} />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {ambient.weather === "snow" &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={
              {
                left: `${p.left}%`,
                top: "-10px",
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
                "--sway": `${p.sway}px`,
              } as CSSProperties
            }
          />
        ))}

      {ambient.weather === "rain" &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${p.left}%`,
              top: "-20px",
              width: "1px",
              height: `${12 + p.size * 2}px`,
              opacity: p.opacity + 0.15,
              background: "rgba(150, 180, 220, 0.4)",
              animation: `rainfall ${p.duration * 0.25}s linear ${p.delay}s infinite`,
            }}
          />
        ))}

      {ambient.season === "autumn" &&
        ambient.weather !== "rain" &&
        ambient.weather !== "snow" &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-sm"
            style={
              {
                left: `${p.left}%`,
                top: "-10px",
                width: `${p.size + 2}px`,
                height: `${p.size + 1}px`,
                opacity: p.opacity + 0.1,
                background: LEAF_COLORS[i % LEAF_COLORS.length],
                animation: `leaffall ${p.duration}s ease-in-out ${p.delay}s infinite`,
                "--sway": `${p.sway}px`,
                "--rot": `${p.rotation}deg`,
              } as CSSProperties
            }
          />
        ))}

      {ambient.season === "spring" &&
        ambient.weather === "clear" &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={
              {
                left: `${p.left}%`,
                bottom: "-10px",
                width: `${Math.max(p.size - 1, 1)}px`,
                height: `${Math.max(p.size - 1, 1)}px`,
                opacity: p.opacity * 0.5,
                background: "rgba(124, 218, 78, 0.5)",
                animation: `pollenfloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                "--sway": `${p.sway * 0.5}px`,
              } as CSSProperties
            }
          />
        ))}
    </div>
  );
}
