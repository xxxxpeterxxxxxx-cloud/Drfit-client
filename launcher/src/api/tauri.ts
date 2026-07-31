import { invoke } from "@tauri-apps/api/core";
import { listen, type UnlistenFn } from "@tauri-apps/api/event";

// ─── Types ───────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string;
  minecraft_version: string;
  mod_loader: string;
  java_version: number;
  ram_limit: number;
  created_at: string;
}

export interface Account {
  uuid: string;
  username: string;
  access_token: string;
  ms_refresh_token: string;
}

export interface VersionManifest {
  latest: { release: string; snapshot: string };
  versions: { id: string; type: string; url: string }[];
}

export interface ModrinthMod {
  project_id: string;
  title: string;
  description: string;
  icon_url: string | null;
  downloads: number;
  versions: string[];
}

export interface ModrinthSearchResult {
  hits: ModrinthMod[];
  total_hits: number;
}

export interface InstalledMod {
  filename: string;
  enabled: boolean;
  file_size: number;
}

// ─── Auth API ────────────────────────────────────────────

export const authApi = {
  loginMicrosoft: () => invoke<Account>("login_microsoft"),
  getAccounts: () => invoke<Account[]>("get_accounts"),
  switchAccount: (uuid: string) => invoke<void>("switch_account", { uuid }),
  logout: (uuid: string) => invoke<void>("logout", { uuid }),
};

// ─── Profile API ─────────────────────────────────────────

export const profileApi = {
  create: (name: string, minecraftVersion: string, modLoader: string) =>
    invoke<Profile>("create_profile", { name, minecraftVersion, modLoader }),
  list: () => invoke<Profile[]>("list_profiles"),
  delete: (id: string) => invoke<void>("delete_profile", { id }),
  getActive: () => invoke<Profile | null>("get_active_profile"),
  setActive: (id: string) => invoke<void>("set_active_profile", { id }),
};

// ─── Minecraft API ───────────────────────────────────────

export const minecraftApi = {
  getVersionManifest: () => invoke<VersionManifest>("get_version_manifest"),
  downloadAssets: (versionId: string) => invoke<void>("download_assets", { versionId }),
  launchGame: (
    profileId: string,
    accountUuid: string,
    username: string,
    accessToken: string,
    ramLimit: number,
    javaPath?: string,
  ) =>
    invoke<void>("launch_game", {
      profileId,
      accountUuid,
      username,
      accessToken,
      ramLimit,
      javaPath: javaPath ?? null,
    }),
};

// ─── Fabric API ──────────────────────────────────────────

export const fabricApi = {
  install: (versionId: string) => invoke<void>("install_fabric", { versionId }),
  installLegacy: (versionId: string) => invoke<void>("install_legacy_fabric", { versionId }),
};

// ─── Modrinth API ────────────────────────────────────────

export const modrinthApi = {
  search: (query: string, limit?: number) =>
    invoke<ModrinthSearchResult>("search_mods", { query, limit: limit ?? 20 }),
  install: (projectId: string, versionId: string, profileId: string) =>
    invoke<string>("install_mod", { projectId, versionId, profileId }),
  listInstalled: (profileId: string) =>
    invoke<InstalledMod[]>("list_installed_mods", { profileId }),
  toggle: (profileId: string, modFilename: string, enable: boolean) =>
    invoke<void>("toggle_mod", { profileId, modFilename, enable }),
};

// ─── Event Listeners ─────────────────────────────────────

export function onDownloadProgress(cb: (data: any) => void): Promise<UnlistenFn> {
  return listen("download-progress", (e) => cb(e.payload));
}

export function onFabricProgress(cb: (data: any) => void): Promise<UnlistenFn> {
  return listen("fabric-progress", (e) => cb(e.payload));
}

export function onGameLaunch(cb: (data: any) => void): Promise<UnlistenFn> {
  return listen("game-launch", (e) => cb(e.payload));
}

export function onGameClosed(cb: (data: any) => void): Promise<UnlistenFn> {
  return listen("game-closed", (e) => cb(e.payload));
}
