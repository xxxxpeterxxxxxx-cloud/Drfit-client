use serde::{Deserialize, Serialize};

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
) -> Result<(), String> {
    // TODO: Download mod JAR from Modrinth CDN
    // 1. Fetch version info from https://api.modrinth.com/v2/project/{id}/version/{version}
    // 2. Download the primary file
    // 3. Place in profile's mods directory
    let _ = (project_id, version_id, profile_id);
    Err("Mod installation not yet implemented".into())
}

#[tauri::command]
pub async fn list_installed_mods(profile_id: String) -> Result<Vec<InstalledMod>, String> {
    // TODO: Scan profile mods directory for .jar files
    let _ = profile_id;
    Ok(vec![])
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
    // TODO: Rename .jar to .jar.disabled or vice versa
    let _ = (profile_id, mod_filename, enable);
    Err("Mod toggle not yet implemented".into())
}
