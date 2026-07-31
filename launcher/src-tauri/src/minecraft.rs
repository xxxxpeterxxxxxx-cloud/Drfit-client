use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VersionManifest {
    pub latest: LatestVersion,
    pub versions: Vec<VersionEntry>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LatestVersion {
    pub release: String,
    pub snapshot: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct VersionEntry {
    pub id: String,
    #[serde(rename = "type")]
    pub version_type: String,
    pub url: String,
    pub releaseTime: String,
}

#[tauri::command]
pub async fn get_version_manifest() -> Result<VersionManifest, String> {
    let resp = reqwest::get("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")
        .await
        .map_err(|e| e.to_string())?
        .json::<VersionManifest>()
        .await
        .map_err(|e| e.to_string())?;
    Ok(resp)
}

#[tauri::command]
pub async fn download_assets(version_id: String) -> Result<(), String> {
    // TODO: Download client.jar, assets, libraries for the given version
    // 1. Fetch version manifest -> find version entry
    // 2. Download version JSON from entry URL
    // 3. Download client.jar
    // 4. Download asset index + assets
    // 5. Download libraries
    // 6. Verify SHA1 hashes
    let _ = version_id;
    Err("Asset download not yet implemented".into())
}

#[tauri::command]
pub async fn launch_game(
    profile_id: String,
    account_uuid: String,
) -> Result<(), String> {
    // TODO: Launch Minecraft with proper JVM args, classpath, and game args
    // 1. Resolve profile (version, mod loader, mods)
    // 2. Determine correct Java version
    // 3. Build classpath from libraries + client.jar
    // 4. Construct JVM arguments (RAM, GC, tuning)
    // 5. Construct game arguments (username, UUID, token, version)
    // 6. Spawn process
    let _ = (profile_id, account_uuid);
    Err("Game launch not yet implemented".into())
}
