use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;

use crate::profile::profile_mods_dir;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ModrinthSearchResult {
    pub hits: Vec<ModrinthMod>,
    pub total_hits: u32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ModrinthMod {
    pub project_id: String,
    pub title: String,
    pub description: String,
    pub icon_url: Option<String>,
    pub downloads: u64,
    pub versions: Vec<String>,
}

#[derive(Deserialize)]
struct ModrinthVersionInfo {
    files: Vec<ModrinthFile>,
}

#[derive(Deserialize)]
struct ModrinthFile {
    filename: String,
    url: String,
    primary: bool,
}

#[tauri::command]
pub async fn search_mods(query: String, limit: Option<u32>) -> Result<ModrinthSearchResult, String> {
    let limit = limit.unwrap_or(20);
    let url = format!(
        "https://api.modrinth.com/v2/search?query={}&limit={}&facets=[[%22project_type:mod%22]]",
        query, limit
    );
    let resp = reqwest::get(&url)
        .await
        .map_err(|e| e.to_string())?
        .json::<ModrinthSearchResult>()
        .await
        .map_err(|e| e.to_string())?;
    Ok(resp)
}

#[tauri::command]
pub async fn install_mod(
    project_id: String,
    version_id: String,
    profile_id: String,
) -> Result<String, String> {
    let url = format!(
        "https://api.modrinth.com/v2/project/{}/version/{}",
        project_id, version_id
    );

    let resp = reqwest::get(&url)
        .await
        .map_err(|e| format!("Modrinth API failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Mod version {} not found", version_id));
    }

    let version_info: ModrinthVersionInfo = resp.json().await.map_err(|e| format!("Modrinth parse failed: {}", e))?;

    let file = version_info
        .files
        .iter()
        .find(|f| f.primary)
        .or_else(|| version_info.files.first())
        .ok_or("No downloadable file found")?;

    let mods_dir = profile_mods_dir(&profile_id);
    fs::create_dir_all(&mods_dir).map_err(|e| e.to_string())?;

    let dest = mods_dir.join(&file.filename);

    if dest.exists() {
        return Ok(format!("Mod {} already installed", file.filename));
    }

    let client = reqwest::Client::new();
    let file_resp = client
        .get(&file.url)
        .send()
        .await
        .map_err(|e| format!("Mod download failed: {}", e))?;

    if !file_resp.status().is_success() {
        return Err(format!("Mod download failed: HTTP {}", file_resp.status()));
    }

    let bytes = file_resp.bytes().await.map_err(|e| format!("Mod read failed: {}", e))?;
    let mut f = fs::File::create(&dest).map_err(|e| e.to_string())?;
    f.write_all(&bytes).map_err(|e| e.to_string())?;

    Ok(format!("Installed {}", file.filename))
}

#[tauri::command]
pub async fn list_installed_mods(profile_id: String) -> Result<Vec<InstalledMod>, String> {
    let mods_dir = profile_mods_dir(&profile_id);

    if !mods_dir.exists() {
        return Ok(vec![]);
    }

    let mut mods = vec![];
    let entries = fs::read_dir(&mods_dir).map_err(|e| e.to_string())?;

    for entry in entries.flatten() {
        let path = entry.path();
        let filename = path.file_name().map(|n| n.to_string_lossy().to_string()).unwrap_or_default();

        if filename.ends_with(".jar") {
            let size = entry.metadata().map(|m| m.len()).unwrap_or(0);
            mods.push(InstalledMod {
                filename,
                enabled: true,
                file_size: size,
            });
        } else if filename.ends_with(".jar.disabled") {
            let size = entry.metadata().map(|m| m.len()).unwrap_or(0);
            let clean_name = filename.replace(".disabled", "");
            mods.push(InstalledMod {
                filename: clean_name,
                enabled: false,
                file_size: size,
            });
        }
    }

    mods.sort_by(|a, b| a.filename.cmp(&b.filename));
    Ok(mods)
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct InstalledMod {
    pub filename: String,
    pub enabled: bool,
    pub file_size: u64,
}

#[tauri::command]
pub async fn toggle_mod(
    profile_id: String,
    mod_filename: String,
    enable: bool,
) -> Result<(), String> {
    let mods_dir = profile_mods_dir(&profile_id);

    if enable {
        let disabled = mods_dir.join(format!("{}.disabled", mod_filename));
        let enabled = mods_dir.join(&mod_filename);
        if disabled.exists() {
            fs::rename(&disabled, &enabled).map_err(|e| e.to_string())?;
        }
    } else {
        let enabled = mods_dir.join(&mod_filename);
        let disabled = mods_dir.join(format!("{}.disabled", mod_filename));
        if enabled.exists() {
            fs::rename(&enabled, &disabled).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}
