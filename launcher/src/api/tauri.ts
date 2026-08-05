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
  downloadDriftMods: (profileId: string) => invoke<void>("download_drift_mods", { profileId }),
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
  detectJavaPath: () => invoke<string>("detect_java_path"),
  getSupportedVersions: () => invoke<string[]>("get_supported_versions"),
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

export interface DeviceCodeInfo {
  user_code: string;
  verification_uri: string;
  device_code: string;
  interval: number;
  expires_in: number;
}

export function onDeviceCode(cb: (data: DeviceCodeInfo) => void): Promise<UnlistenFn> {
  return listen("device-code", (e) => cb(e.payload as DeviceCodeInfo));
}

// ─── Cipher Bot API ──────────────────────────────────────

export interface CipherConfig {
  api_url: string;
  api_key: string;
  mc_server_id: string;
}

export interface BotHealth {
  status: string;
  timestamp: number;
  supabase: boolean;
}

export interface BotStats {
  guilds: number;
  members: number;
  uptime: number;
  commands: number;
}

export interface BotGuild {
  id: string;
  name: string;
  member_count: number;
  icon: string | null;
}

export interface McServerStats {
  online: boolean;
  players: number;
  max_players: number;
  tps: number;
  motd: string;
  version: string;
}

export interface McPlayer {
  name: string;
  uuid: string;
}

export interface ConsoleLogs {
  lines: string[];
}

export const cipherApi = {
  setConfig: (apiUrl: string, apiKey: string, mcServerId: string) =>
    invoke<void>("set_cipher_config", { apiUrl, apiKey, mcServerId }),
  getConfig: () => invoke<CipherConfig>("get_cipher_config"),
  health: () => invoke<BotHealth>("cipher_health"),
  stats: () => invoke<BotStats>("cipher_stats"),
  botGuilds: () => invoke<BotGuild[]>("cipher_bot_guilds"),
  mcStatus: () => invoke<McServerStats>("mc_server_status"),
  mcPlayers: () => invoke<McPlayer[]>("mc_server_players"),
  mcCommand: (command: string) => invoke<string>("mc_server_command", { command }),
  mcStart: () => invoke<string>("mc_server_start"),
  mcStop: () => invoke<string>("mc_server_stop"),
  mcRestart: () => invoke<string>("mc_server_restart"),
  mcConsole: (lines?: number) => invoke<ConsoleLogs>("mc_console_logs", { lines: lines ?? 50 }),
};

// ─── CurseForge API ──────────────────────────────────────

export interface CFMod {
  id: number;
  name: string;
  summary: string;
  download_count: number;
  website_url: string;
  icon_url: string | null;
  authors: string[];
  categories: string[];
}

export interface CFFile {
  id: number;
  file_name: string;
  file_date: string;
  download_url: string;
  file_length: number;
  release_type: number;
  game_versions: string[];
}

export const curseforgeApi = {
  setKey: (key: string) => invoke<void>("set_curseforge_key", { key }),
  search: (query: string, page?: number) =>
    invoke<CFMod[]>("curseforge_search", { query, page: page ?? 0 }),
  files: (modId: number) => invoke<CFFile[]>("curseforge_files", { modId }),
  install: (downloadUrl: string, filename: string, profileId: string) =>
    invoke<string>("curseforge_install", { downloadUrl, filename, profileId }),
  importMod: (profileId: string, filePath: string) =>
    invoke<string>("import_mod", { profileId, filePath }),
};
