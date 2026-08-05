use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
pub struct CipherState {
    config: Mutex<CipherConfig>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct CipherConfig {
    pub api_url: String,
    pub api_key: String,
    pub mc_server_id: String,
}

impl Default for CipherConfig {
    fn default() -> Self {
        CipherConfig {
            api_url: "https://bluefin-1.tailb7ce7e.ts.net".to_string(),
            api_key: String::new(),
            mc_server_id: "mc_msdo12kq227vc3".to_string(),
        }
    }
}

#[derive(Serialize, Deserialize)]
pub struct BotHealth {
    pub status: String,
    pub timestamp: f64,
    pub supabase: bool,
}

#[derive(Serialize, Deserialize)]
pub struct BotStats {
    pub guilds: u64,
    pub members: u64,
    pub uptime: f64,
    pub commands: u64,
}

#[derive(Serialize, Deserialize)]
pub struct BotGuild {
    pub id: String,
    pub name: String,
    pub member_count: u64,
    pub icon: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct McServerList {
    pub servers: Vec<McServerInfo>,
}

#[derive(Serialize, Deserialize)]
pub struct McServerInfo {
    pub id: String,
    pub name: String,
    pub guild_id: String,
    pub rcon_host: String,
    pub rcon_port: u16,
    pub enabled: i32,
}

#[derive(Serialize, Deserialize)]
pub struct McServerStats {
    pub online: bool,
    pub players: u64,
    pub max_players: u64,
    pub tps: f64,
    pub motd: String,
    pub version: String,
}

#[derive(Serialize, Deserialize)]
pub struct McPlayer {
    pub name: String,
    pub uuid: String,
}

#[derive(Serialize, Deserialize)]
pub struct ConsoleLogs {
    pub lines: Vec<String>,
}

fn get_config(state: &State<CipherState>) -> CipherConfig {
    state.config.lock().unwrap().clone()
}

async fn api_get<T: serde::de::DeserializeOwned>(
    config: &CipherConfig,
    path: &str,
) -> Result<T, String> {
    let url = format!("{}{}", config.api_url, path);
    let client = reqwest::Client::new();
    let mut req = client.get(&url);
    if !config.api_key.is_empty() {
        req = req.header("x-api-key", &config.api_key);
    }
    let resp = req
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status()));
    }
    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse failed: {}", e))
}

async fn api_post<T: serde::de::DeserializeOwned>(
    config: &CipherConfig,
    path: &str,
    body: &serde_json::Value,
) -> Result<T, String> {
    let url = format!("{}{}", config.api_url, path);
    let client = reqwest::Client::new();
    let mut req = client.post(&url).json(body);
    if !config.api_key.is_empty() {
        req = req.header("x-api-key", &config.api_key);
    }
    let resp = req
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;
    if !resp.status().is_success() {
        let status = resp.status();
        let text = resp.text().await.unwrap_or_default();
        return Err(format!("HTTP {} — {}", status, text));
    }
    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse failed: {}", e))
}

// ─── Tauri Commands ──────────────────────────────────────

#[tauri::command]
pub fn set_cipher_config(
    state: State<CipherState>,
    api_url: String,
    api_key: String,
    mc_server_id: String,
) -> Result<(), String> {
    let mut cfg = state.config.lock().unwrap();
    cfg.api_url = api_url;
    cfg.api_key = api_key;
    cfg.mc_server_id = mc_server_id;
    Ok(())
}

#[tauri::command]
pub fn get_cipher_config(state: State<CipherState>) -> Result<CipherConfig, String> {
    Ok(get_config(&state))
}

#[tauri::command]
pub async fn cipher_health(state: State<'_, CipherState>) -> Result<BotHealth, String> {
    let config = get_config(&state);
    api_get::<BotHealth>(&config, "/api/health").await
}

#[tauri::command]
pub async fn cipher_stats(state: State<'_, CipherState>) -> Result<BotStats, String> {
    let config = get_config(&state);
    api_get::<BotStats>(&config, "/api/stats").await
}

#[tauri::command]
pub async fn cipher_bot_guilds(state: State<'_, CipherState>) -> Result<Vec<BotGuild>, String> {
    let config = get_config(&state);
    api_get::<Vec<BotGuild>>(&config, "/api/bot-guilds").await
}

#[tauri::command]
pub async fn mc_server_status(state: State<'_, CipherState>) -> Result<McServerStats, String> {
    let config = get_config(&state);
    if config.mc_server_id.is_empty() {
        return Err("No MC server ID configured".to_string());
    }
    let path = format!("/api/minecraft/{}/stats", config.mc_server_id);
    api_get::<McServerStats>(&config, &path).await
}

#[tauri::command]
pub async fn mc_server_players(state: State<'_, CipherState>) -> Result<Vec<McPlayer>, String> {
    let config = get_config(&state);
    if config.mc_server_id.is_empty() {
        return Err("No MC server ID configured".to_string());
    }
    let path = format!("/api/minecraft/{}/players", config.mc_server_id);
    api_get::<Vec<McPlayer>>(&config, &path).await
}

#[tauri::command]
pub async fn mc_server_command(
    state: State<'_, CipherState>,
    command: String,
) -> Result<String, String> {
    let config = get_config(&state);
    if config.mc_server_id.is_empty() {
        return Err("No MC server ID configured".to_string());
    }
    let path = format!("/api/minecraft/{}/command", config.mc_server_id);
    let body = serde_json::json!({ "command": command });
    api_post::<serde_json::Value>(&config, &path, &body)
        .await
        .map(|v| v.to_string())
}

#[tauri::command]
pub async fn mc_server_start(state: State<'_, CipherState>) -> Result<String, String> {
    let config = get_config(&state);
    let path = format!("/api/minecraft/{}/start", config.mc_server_id);
    let body = serde_json::json!({});
    api_post::<serde_json::Value>(&config, &path, &body)
        .await
        .map(|v| v.to_string())
}

#[tauri::command]
pub async fn mc_server_stop(state: State<'_, CipherState>) -> Result<String, String> {
    let config = get_config(&state);
    let path = format!("/api/minecraft/{}/stop", config.mc_server_id);
    let body = serde_json::json!({});
    api_post::<serde_json::Value>(&config, &path, &body)
        .await
        .map(|v| v.to_string())
}

#[tauri::command]
pub async fn mc_server_restart(state: State<'_, CipherState>) -> Result<String, String> {
    let config = get_config(&state);
    let path = format!("/api/minecraft/{}/restart", config.mc_server_id);
    let body = serde_json::json!({});
    api_post::<serde_json::Value>(&config, &path, &body)
        .await
        .map(|v| v.to_string())
}

#[tauri::command]
pub async fn mc_console_logs(
    state: State<'_, CipherState>,
    lines: Option<u32>,
) -> Result<ConsoleLogs, String> {
    let config = get_config(&state);
    let n = lines.unwrap_or(50);
    let path = format!("/api/minecraft/{}/console?lines={}", config.mc_server_id, n);
    api_get::<ConsoleLogs>(&config, &path).await
}
