use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::State;

#[derive(Default)]
pub struct CurseForgeState {
    api_key: std::sync::Mutex<Option<String>>,
}

#[derive(Serialize, Deserialize)]
pub struct CFMod {
    pub id: u64,
    pub name: String,
    pub summary: String,
    pub download_count: f64,
    pub website_url: String,
    pub icon_url: Option<String>,
    pub authors: Vec<String>,
    pub categories: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct CFSearchResult {
    pub data: Vec<CFMod>,
}

#[derive(Serialize, Deserialize)]
pub struct CFFile {
    pub id: u64,
    pub file_name: String,
    pub file_date: String,
    pub download_url: String,
    pub file_length: u64,
    pub release_type: u8,
    pub game_versions: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct CFFilesResult {
    pub data: Vec<CFFile>,
}

const CF_BASE: &str = "https://api.curseforge.com/v1";
const CF_GAME_ID: u64 = 432; // Minecraft
const CF_CLASS_ID: u64 = 6; // Mods

fn get_api_key(state: &State<CurseForgeState>) -> Option<String> {
    state.api_key.lock().unwrap().clone()
}

async fn cf_get<T: serde::de::DeserializeOwned>(
    api_key: &str,
    path: &str,
) -> Result<T, String> {
    let url = format!("{}{}", CF_BASE, path);
    let client = reqwest::Client::new();
    let resp = client
        .get(&url)
        .header("x-api-key", api_key)
        .header("Accept", "application/json")
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {} — CurseForge API error", resp.status()));
    }
    resp.json::<T>()
        .await
        .map_err(|e| format!("Parse failed: {}", e))
}

#[tauri::command]
pub fn set_curseforge_key(state: State<CurseForgeState>, key: String) -> Result<(), String> {
    *state.api_key.lock().unwrap() = if key.is_empty() { None } else { Some(key) };
    Ok(())
}

#[tauri::command]
pub async fn curseforge_search(
    state: State<'_, CurseForgeState>,
    query: String,
    page: Option<u32>,
) -> Result<Vec<CFMod>, String> {
    let api_key = get_api_key(&state).ok_or("No CurseForge API key set")?;
    let p = page.unwrap_or(0);
    let path = format!(
        "/mods/search?gameId={}&classId={}&searchFilter={}&index={}&pageSize=20",
        CF_GAME_ID, CF_CLASS_ID, urlencode(&query), p * 20
    );
    let result: CFSearchResult = cf_get(&api_key, &path).await?;
    Ok(result.data)
}

#[tauri::command]
pub async fn curseforge_files(
    state: State<'_, CurseForgeState>,
    mod_id: u64,
) -> Result<Vec<CFFile>, String> {
    let api_key = get_api_key(&state).ok_or("No CurseForge API key set")?;
    let path = format!("/mods/{}/files?pageSize=20", mod_id);
    let result: CFFilesResult = cf_get(&api_key, &path).await?;
    Ok(result.data)
}

#[tauri::command]
pub async fn curseforge_install(
    state: State<'_, CurseForgeState>,
    download_url: String,
    filename: String,
    profile_id: String,
) -> Result<String, String> {
    let _api_key = get_api_key(&state).ok_or("No CurseForge API key set")?;

    // Get profile mods directory
    let home = dirs::data_dir()
        .ok_or("Cannot find data directory")?;
    let mods_dir = home.join("gg.drift.client").join("profiles").join(&profile_id).join("mods");
    std::fs::create_dir_all(&mods_dir)
        .map_err(|e| format!("Failed to create mods dir: {}", e))?;

    let dest = mods_dir.join(&filename);

    // Download the file
    let client = reqwest::Client::new();
    let resp = client
        .get(&download_url)
        .send()
        .await
        .map_err(|e| format!("Download failed: {}", e))?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status()));
    }
    let bytes = resp
        .bytes()
        .await
        .map_err(|e| format!("Failed to read body: {}", e))?;
    std::fs::write(&dest, &bytes)
        .map_err(|e| format!("Failed to write file: {}", e))?;

    Ok(format!("Installed {} to {}", filename, dest.display()))
}

#[tauri::command]
pub async fn import_mod(
    profile_id: String,
    file_path: String,
) -> Result<String, String> {
    let src = PathBuf::from(&file_path);
    if !src.exists() {
        return Err(format!("File not found: {}", file_path));
    }

    let home = dirs::data_dir()
        .ok_or("Cannot find data directory")?;
    let mods_dir = home.join("gg.drift.client").join("profiles").join(&profile_id).join("mods");
    std::fs::create_dir_all(&mods_dir)
        .map_err(|e| format!("Failed to create mods dir: {}", e))?;

    let filename = src.file_name()
        .ok_or("Invalid filename")?
        .to_string_lossy()
        .to_string();

    // Validate it's a jar or zip
    if !filename.ends_with(".jar") && !filename.ends_with(".zip") && !filename.ends_with(".disabled") {
        return Err("Only .jar, .zip, or .disabled files can be imported".to_string());
    }

    let dest = mods_dir.join(&filename);
    std::fs::copy(&src, &dest)
        .map_err(|e| format!("Failed to copy file: {}", e))?;

    Ok(format!("Imported {} to mods folder", filename))
}

fn urlencode(s: &str) -> String {
    s.chars().map(|c| {
        if c.is_alphanumeric() || c == '-' || c == '_' || c == '.' || c == '~' {
            c.to_string()
        } else {
            format!("%{:02X}", c as u8)
        }
    }).collect()
}
