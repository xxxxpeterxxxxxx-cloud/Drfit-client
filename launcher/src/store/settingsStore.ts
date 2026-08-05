import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  // Performance
  sodium: boolean;
  lithium: boolean;
  ferriteCore: boolean;
  iris: boolean;

  // Java & Memory
  ramLimit: number;
  javaPath: string;
  javaArgs: string;

  // Appearance
  darkMode: boolean;
  compactSidebar: boolean;
  animations: boolean;
  accentColor: string;
  borderRadius: number;

  // Launcher features
  discordRpc: boolean;
  autoUpdate: boolean;
  closeOnLaunch: boolean;
  showNews: boolean;

  // In-game HUD settings
  hudArmor: boolean;
  hudPotion: boolean;
  hudSpeed: boolean;
  hudBiome: boolean;
  hudDirection: boolean;
  hudWatermark: boolean;
  hudFpsGraph: boolean;
  hudMemory: boolean;

  // Actions
  toggle: (key: keyof SettingsState) => void;
  set: (key: keyof SettingsState, value: any) => void;
  reset: () => void;
}

const defaults = {
  sodium: true,
  lithium: true,
  ferriteCore: true,
  iris: false,
  ramLimit: 4096,
  javaPath: "/usr/lib/jvm/java-21-openjdk/bin/java",
  javaArgs: "-XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200",
  darkMode: true,
  compactSidebar: false,
  animations: true,
  accentColor: "#10B981",
  borderRadius: 8,
  discordRpc: true,
  autoUpdate: true,
  closeOnLaunch: false,
  showNews: true,
  hudArmor: true,
  hudPotion: true,
  hudSpeed: false,
  hudBiome: false,
  hudDirection: false,
  hudWatermark: true,
  hudFpsGraph: false,
  hudMemory: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      toggle: (key) => set((state) => ({ [key]: !state[key] }) as Partial<SettingsState>),
      set: (key, value) => set({ [key]: value } as Partial<SettingsState>),
      reset: () => set(defaults),
    }),
    { name: "drift-settings" }
  )
);
