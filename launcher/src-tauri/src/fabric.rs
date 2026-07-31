use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct FabricVersion {
    pub loader: String,
    pub intermediary: String,
    pub launcher_meta: String,
}

#[tauri::command]
pub async fn install_fabric(version_id: String) -> Result<(), String> {
    // TODO: Install Fabric Loader for a given Minecraft version
    // 1. Fetch Fabric meta: https://meta.fabricmc.net/v2/versions/loader/{version}
    // 2. Download Fabric Loader JAR
    // 3. Download Intermediary mappings
    // 4. Generate launch profile with Fabric classpath
    let _ = version_id;
    Err("Fabric installation not yet implemented".into())
}

#[tauri::command]
pub async fn install_legacy_fabric(version_id: String) -> Result<(), String> {
    // TODO: Install Legacy Fabric for 1.8.9
    // Uses https://maven.legacyfabric.net/ instead of standard Fabric maven
    let _ = version_id;
    Err("Legacy Fabric installation not yet implemented".into())
}
