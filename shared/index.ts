export const DRIFT_CONFIG_SCHEMA = "./config-schema.json" as const;

export type DriftModule = "core" | "hud" | "qol" | "perf" | "legacy";

export interface HudElementConfig {
  id: string;
  enabled: boolean;
  x: number;
  y: number;
  scale: number;
}

export interface DriftConfig {
  version: string;
  profile: {
    name: string;
    minecraftVersion: string;
    modLoader: "fabric" | "legacy-fabric";
    javaVersion?: number;
  };
  modules: Record<DriftModule, boolean>;
  hud?: {
    elements: HudElementConfig[];
    preset: "default" | "bedwars" | "skyblock" | "survival" | "custom";
  };
  qol?: {
    toggleSprint: boolean;
    toggleSneak: boolean;
    zoom: { enabled: boolean; fov: number };
    fullbright: boolean;
    customCrosshair: {
      enabled: boolean;
      shape: "cross" | "dot" | "circle" | "plus";
      color: string;
      size: number;
    };
    discordRpc: boolean;
  };
  perf?: {
    sodium: boolean;
    lithium: boolean;
    ferriteCore: boolean;
    iris: boolean;
    ramLimit: number;
    jvmArgs: string[];
  };
}
