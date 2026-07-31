import { create } from "zustand";
import { profileApi, minecraftApi, authApi, onDownloadProgress, onGameClosed } from "../api/tauri";
import type { Profile, Account } from "../api/tauri";

interface LaunchState {
  isLaunching: boolean;
  progress: number;
  status: string;
  selectedProfileId: string | null;
  activeProfile: Profile | null;
  accounts: Account[];
  activeAccount: Account | null;
  error: string | null;
  setLaunching: (v: boolean) => void;
  setProgress: (p: number) => void;
  setStatus: (s: string) => void;
  selectProfile: (id: string) => void;
  setError: (e: string | null) => void;
  loadProfiles: () => Promise<void>;
  loadAccounts: () => Promise<void>;
  launch: () => Promise<void>;
}

export const useLaunchStore = create<LaunchState>((set, get) => ({
  isLaunching: false,
  progress: 0,
  status: "",
  selectedProfileId: null,
  activeProfile: null,
  accounts: [],
  activeAccount: null,
  error: null,

  setLaunching: (v) => set({ isLaunching: v }),
  setProgress: (p) => set({ progress: p }),
  setStatus: (s) => set({ status: s }),
  selectProfile: (id) => set({ selectedProfileId: id }),
  setError: (e) => set({ error: e }),

  loadProfiles: async () => {
    try {
      const active = await profileApi.getActive();
      set({ activeProfile: active, selectedProfileId: active?.id ?? null });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  loadAccounts: async () => {
    try {
      const accounts = await authApi.getAccounts();
      const active = accounts.length > 0 ? accounts[0] : null;
      set({ accounts, activeAccount: active });
    } catch (e) {
      set({ error: String(e) });
    }
  },

  launch: async () => {
    const state = get();
    const profile = state.activeProfile;
    const account = state.activeAccount;

    if (!profile) {
      set({ error: "No active profile" });
      return;
    }
    if (!account) {
      set({ error: "No account — please login first" });
      return;
    }

    set({ isLaunching: true, progress: 0, status: "Downloading assets...", error: null });

    try {
      const unlisten = await onDownloadProgress((data: any) => {
        if (data.progress != null) set({ progress: data.progress });
        if (data.step) set({ status: data.step });
      });

      await minecraftApi.downloadAssets(profile.minecraft_version);
      set({ status: "Launching game..." });

      await minecraftApi.launchGame(
        profile.id,
        account.uuid,
        account.username,
        account.access_token,
        profile.ram_limit,
      );

      set({ status: "Game running", progress: 100 });
      unlisten();
    } catch (e) {
      set({ error: String(e), isLaunching: false, status: "" });
    }
  },
}));

// Listen for game-closed event globally
onGameClosed(() => {
  useLaunchStore.setState({ isLaunching: false, status: "", progress: 0 });
});
