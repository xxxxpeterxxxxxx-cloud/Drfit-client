use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;
use std::path::PathBuf;
use tauri::{AppHandle, Emitter};

use crate::minecraft::version_dir;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct FabricVersion {
    pub loader: String,
    pub intermediary: String,
    pub launcher_meta: String,
}

#[derive(Deserialize)]
struct FabricLoaderMeta {
    loader: FabricLoaderInfo,
    intermediary: FabricLibraryInfo,
    launcher_meta: FabricLauncherMeta,
    libraries: Vec<FabricLibrary>,
}

#[derive(Deserialize)]
struct FabricLoaderInfo {
    version: String,
}

#[derive(Deserialize)]
struct FabricLibraryInfo {
    maven: String,
    version: String,
}

#[derive(Deserialize)]
struct FabricLauncherMeta {
    version: u32,
    libraries: Vec<FabricLibrary>,
    main_class: FabricMainClass,
}

#[derive(Deserialize)]
struct FabricMainClass {
    client: String,
}

#[derive(Deserialize)]
struct FabricLibrary {
    name: String,
    url: String,
}

fn fabric_maven_url(name: &str, url: &str) -> String {
    let parts: Vec<&str> = name.split(':').collect();
    if parts.len() < 3 {
        return format!("{}/{}", url, name.replace(':', "/"));
    }
    let group = parts[0].replace('.', "/");
    let artifact = parts[1];
    let version = parts[2];
    format!(
        "{}/{}/{}/{}/{}-{}.jar",
        url, group, artifact, version, artifact, version
    )
}

async fn download_fabric_jar(url: &str, dest: &PathBuf) -> Result<(), String> {
    if dest.exists() {
        return Ok(());
    }
    if let Some(parent) = dest.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    let client = reqwest::Client::new();
    let resp = client
        .get(url)
        .send()
        .await
        .map_err(|e| format!("Fabric download failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Fabric download failed: HTTP {}", resp.status()));
    }

    let bytes = resp.bytes().await.map_err(|e| format!("Fabric read failed: {}", e))?;
    let mut file = fs::File::create(dest).map_err(|e| e.to_string())?;
    file.write_all(&bytes).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn install_fabric(
    app: AppHandle,
    version_id: String,
) -> Result<(), String> {
    let meta_url = format!(
        "https://meta.fabricmc.net/v2/versions/loader/{}",
        version_id
    );

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "fetching-meta", "version": &version_id}));

    let resp = reqwest::get(&meta_url)
        .await
        .map_err(|e| format!("Fabric meta fetch failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Fabric not available for version {}", version_id));
    }

    let loaders: Vec<FabricLoaderMeta> = resp.json().await.map_err(|e| format!("Fabric meta parse failed: {}", e))?;

    let loader = loaders
        .into_iter()
        .next()
        .ok_or_else(|| format!("No Fabric loader found for version {}", version_id))?;

    let vdir = version_dir(&version_id);
    let fabric_dir = vdir.join("fabric");
    fs::create_dir_all(&fabric_dir).map_err(|e| e.to_string())?;

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "downloading-loader"}));

    let loader_jar = fabric_dir.join(format!("fabric-loader-{}.jar", loader.loader.version));
    let loader_url = fabric_maven_url(
        &format!("net.fabricmc:fabric-loader:{}", loader.loader.version),
        "https://maven.fabricmc.net",
    );
    download_fabric_jar(&loader_url, &loader_jar).await?;

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "downloading-intermediary"}));

    let intermediary_jar = fabric_dir.join(format!("intermediary-{}.jar", loader.intermediary.version));
    let intermediary_url = fabric_maven_url(
        &format!("{}:{}", loader.intermediary.maven, loader.intermediary.version),
        "https://maven.fabricmc.net",
    );
    download_fabric_jar(&intermediary_url, &intermediary_jar).await?;

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "downloading-libraries"}));

    let total_libs = loader.libraries.len();
    for (i, lib) in loader.libraries.iter().enumerate() {
        let lib_path = fabric_dir.join(format!("lib-{}.jar", i));
        let url = fabric_maven_url(&lib.name, &lib.url);
        download_fabric_jar(&url, &lib_path).await?;

        if (i + 1) % 5 == 0 {
            let _ = app.emit("fabric-progress", &serde_json::json!({
                "step": "libraries",
                "current": i + 1,
                "total": total_libs,
            }));
        }
    }

    let profile_data = serde_json::json!({
        "loader_version": loader.loader.version,
        "intermediary_version": loader.intermediary.version,
        "main_class": loader.launcher_meta.main_class.client,
        "installed": true,
    });
    let profile_path = fabric_dir.join("fabric-profile.json");
    fs::write(&profile_path, serde_json::to_string_pretty(&profile_data).unwrap_or_default())
        .map_err(|e| e.to_string())?;

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "done"}));
    Ok(())
}

#[tauri::command]
pub async fn install_legacy_fabric(
    app: AppHandle,
    version_id: String,
) -> Result<(), String> {
    let meta_url = format!(
        "https://meta.legacyfabric.net/v2/versions/loader/{}",
        version_id
    );

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "fetching-legacy-meta", "version": &version_id}));

    let resp = reqwest::get(&meta_url)
        .await
        .map_err(|e| format!("Legacy Fabric meta fetch failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Legacy Fabric not available for version {}", version_id));
    }

    let loaders: Vec<FabricLoaderMeta> = resp.json().await.map_err(|e| format!("Legacy Fabric meta parse failed: {}", e))?;

    let loader = loaders
        .into_iter()
        .next()
        .ok_or_else(|| format!("No Legacy Fabric loader found for version {}", version_id))?;

    let vdir = version_dir(&version_id);
    let fabric_dir = vdir.join("fabric");
    fs::create_dir_all(&fabric_dir).map_err(|e| e.to_string())?;

    let loader_jar = fabric_dir.join(format!("fabric-loader-{}.jar", loader.loader.version));
    let loader_url = fabric_maven_url(
        &format!("net.fabricmc:fabric-loader:{}", loader.loader.version),
        "https://maven.legacyfabric.net",
    );
    download_fabric_jar(&loader_url, &loader_jar).await?;

    let intermediary_jar = fabric_dir.join(format!("intermediary-{}.jar", loader.intermediary.version));
    let intermediary_url = fabric_maven_url(
        &format!("{}:{}", loader.intermediary.maven, loader.intermediary.version),
        "https://maven.legacyfabric.net",
    );
    download_fabric_jar(&intermediary_url, &intermediary_jar).await?;

    for (i, lib) in loader.libraries.iter().enumerate() {
        let lib_path = fabric_dir.join(format!("lib-{}.jar", i));
        let url = fabric_maven_url(&lib.name, &lib.url);
        download_fabric_jar(&url, &lib_path).await?;
    }

    let profile_data = serde_json::json!({
        "loader_version": loader.loader.version,
        "intermediary_version": loader.intermediary.version,
        "main_class": loader.launcher_meta.main_class.client,
        "installed": true,
        "legacy": true,
    });
    let profile_path = fabric_dir.join("fabric-profile.json");
    fs::write(&profile_path, serde_json::to_string_pretty(&profile_data).unwrap_or_default())
        .map_err(|e| e.to_string())?;

    let _ = app.emit("fabric-progress", &serde_json::json!({"step": "done"}));
    Ok(())
}
