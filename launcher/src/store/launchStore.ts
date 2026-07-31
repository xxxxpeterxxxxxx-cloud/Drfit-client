import { create } from "zustand";

interface LaunchState {
  isLaunching: boolean;
  progress: number;
  status: string;
  selectedProfileId: string | null;
  setLaunching: (v: boolean) => void;
  setProgress: (p: number) => void;
  setStatus: (s: string) => void;
  selectProfile: (id: string) => void;
}

export const useLaunchStore = create<LaunchState>((set) => ({
  isLaunching: false,
  progress: 0,
  status: "",
  selectedProfileId: null,
  setLaunching: (v) => set({ isLaunching: v }),
  setProgress: (p) => set({ progress: p }),
  setStatus: (s) => set({ status: s }),
  selectProfile: (id) => set({ selectedProfileId: id }),
}));
