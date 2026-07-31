use serde::{Deserialize, Serialize};
use sha1::Digest;
use std::fs;
use std::io::Write;
use std::path::PathBuf;
use tauri::{AppHandle, Emitter};

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
    #[serde(rename = "releaseTime")]
    pub release_time: String,
}

#[derive(Deserialize)]
struct VersionDetail {
    asset_index: AssetIndexRef,
    libraries: Vec<Library>,
    downloads: VersionDownloads,
}

#[derive(Deserialize)]
struct AssetIndexRef {
    id: String,
    url: String,
    total_size: u64,
}

#[derive(Deserialize)]
struct VersionDownloads {
    client: DownloadInfo,
}

#[derive(Deserialize)]
struct DownloadInfo {
    sha1: String,
    size: u64,
    url: String,
}

#[derive(Deserialize)]
struct Library {
    name: String,
    downloads: Option<LibraryDownloads>,
    rules: Option<Vec<Rule>>,
}

#[derive(Deserialize)]
struct LibraryDownloads {
    artifact: Option<DownloadInfo>,
}

#[derive(Deserialize)]
struct Rule {
    action: String,
    os: Option<OsRule>,
}

#[derive(Deserialize)]
struct OsRule {
    name: String,
}

#[derive(Deserialize, Serialize)]
struct AssetIndex {
    objects: std::collections::HashMap<String, AssetObject>,
}

#[derive(Deserialize, Serialize)]
struct AssetObject {
    hash: String,
    size: u64,
}

fn drift_dir() -> PathBuf {
    let home = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
    home.join(".drift")
}

pub fn versions_dir() -> PathBuf {
    drift_dir().join("versions")
}

pub fn version_dir(version_id: &str) -> PathBuf {
    versions_dir().join(version_id)
}

pub fn assets_dir() -> PathBuf {
    drift_dir().join("assets")
}

pub fn libraries_dir() -> PathBuf {
    drift_dir().join("libraries")
}

fn verify_sha1(path: &PathBuf, expected: &str) -> bool {
    match fs::read(path) {
        Ok(data) => {
            let mut hasher = sha1::Sha1::new();
            hasher.update(&data);
            let result = hex::encode(hasher.finalize());
            result == expected
        }
        Err(_) => false,
    }
}

async fn download_file(url: &str, dest: &PathBuf, expected_sha1: Option<&str>) -> Result<u64, String> {
    if let Some(sha) = expected_sha1 {
        if dest.exists() && verify_sha1(dest, sha) {
            return Ok(fs::metadata(dest).map(|m| m.len()).unwrap_or(0));
        }
    }

    if let Some(parent) = dest.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }

    let client = reqwest::Client::new();
    let resp = client
        .get(url)
        .send()
        .await
        .map_err(|e| format!("Download failed: {}", e))?;

    if !resp.status().is_success() {
        return Err(format!("Download failed: HTTP {}", resp.status()));
    }

    let bytes = resp.bytes().await.map_err(|e| format!("Download read failed: {}", e))?;

    if let Some(sha) = expected_sha1 {
        let mut hasher = sha1::Sha1::new();
        hasher.update(&bytes);
        let result = hex::encode(hasher.finalize());
        if result != sha {
            return Err(format!("SHA1 mismatch: expected {}, got {}", sha, result));
        }
    }

    let mut file = fs::File::create(dest).map_err(|e| e.to_string())?;
    file.write_all(&bytes).map_err(|e| e.to_string())?;
    Ok(bytes.len() as u64)
}

fn is_rule_allowed(rules: &Option<Vec<Rule>>) -> bool {
    match rules {
        None => true,
        Some(rules) => {
            let os_name = if cfg!(target_os = "windows") {
                "windows"
            } else if cfg!(target_os = "macos") {
                "osx"
            } else {
                "linux"
            };

            let mut allowed = false;
            for rule in rules {
                match rule.action.as_str() {
                    "allow" => {
                        if let Some(os) = &rule.os {
                            if os.name == os_name {
                                allowed = true;
                            }
                        } else {
                            allowed = true;
                        }
                    }
                    "disallow" => {
                        if let Some(os) = &rule.os {
                            if os.name == os_name {
                                allowed = false;
                            }
                        }
                    }
                    _ => {}
                }
            }
            allowed
        }
    }
}

fn library_path(name: &str) -> PathBuf {
    let parts: Vec<&str> = name.split(':').collect();
    if parts.len() < 3 {
        return libraries_dir().join(name.replace(':', "/"));
    }
    let group = parts[0].replace('.', "/");
    let artifact = parts[1];
    let version = parts[2];
    libraries_dir().join(format!("{}/{}/{}/{}-{}.jar", group, artifact, version, artifact, version))
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
pub async fn download_assets(
    app: AppHandle,
    version_id: String,
) -> Result<(), String> {
    let manifest = reqwest::get("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json")
        .await
        .map_err(|e| e.to_string())?
        .json::<VersionManifest>()
        .await
        .map_err(|e| e.to_string())?;

    let entry = manifest
        .versions
        .iter()
        .find(|v| v.id == version_id)
        .ok_or_else(|| format!("Version {} not found", version_id))?;

    let detail: VersionDetail = reqwest::get(&entry.url)
        .await
        .map_err(|e| e.to_string())?
        .json()
        .await
        .map_err(|e| e.to_string())?;

    let vdir = version_dir(&version_id);
    fs::create_dir_all(&vdir).map_err(|e| e.to_string())?;

    let _ = app.emit("download-progress", &serde_json::json!({"step": "client.jar", "version": &version_id}));

    let client_jar = vdir.join(format!("{}.jar", version_id));
    download_file(
        &detail.downloads.client.url,
        &client_jar,
        Some(&detail.downloads.client.sha1),
    )
    .await?;

    let _ = app.emit("download-progress", &serde_json::json!({"step": "asset-index"}));

    let asset_index: AssetIndex = reqwest::get(&detail.asset_index.url)
        .await
        .map_err(|e| e.to_string())?
        .json()
        .await
        .map_err(|e| e.to_string())?;

    let index_path = assets_dir().join("indexes").join(format!("{}.json", detail.asset_index.id));
    fs::create_dir_all(index_path.parent().unwrap()).map_err(|e| e.to_string())?;
    fs::write(&index_path, serde_json::to_string_pretty(&asset_index).unwrap_or_default()).map_err(|e| e.to_string())?;

    let total_assets = asset_index.objects.len();
    let mut downloaded = 0;

    for (_name, obj) in &asset_index.objects {
        let prefix = &obj.hash[0..2];
        let url = format!("https://objects.minecraft.net/{}/{}", prefix, obj.hash);
        let dest = assets_dir().join("objects").join(prefix).join(&obj.hash);

        if !dest.exists() {
            download_file(&url, &dest, Some(&obj.hash)).await?;
        }

        downloaded += 1;
        if downloaded % 50 == 0 {
            let _ = app.emit("download-progress", &serde_json::json!({
                "step": "assets",
                "current": downloaded,
                "total": total_assets,
            }));
        }
    }

    let _ = app.emit("download-progress", &serde_json::json!({"step": "libraries"}));

    let mut lib_count = 0;
    let total_libs = detail.libraries.len();
    for lib in &detail.libraries {
        if !is_rule_allowed(&lib.rules) {
            continue;
        }

        if let Some(downloads) = &lib.downloads {
            if let Some(artifact) = &downloads.artifact {
                let dest = library_path(&lib.name);
                download_file(&artifact.url, &dest, Some(&artifact.sha1)).await?;
            }
        }

        lib_count += 1;
        if lib_count % 10 == 0 {
            let _ = app.emit("download-progress", &serde_json::json!({
                "step": "libraries",
                "current": lib_count,
                "total": total_libs,
            }));
        }
    }

    let _ = app.emit("download-progress", &serde_json::json!({"step": "done"}));
    Ok(())
}

#[tauri::command]
pub async fn launch_game(
    app: AppHandle,
    profile_id: String,
    account_uuid: String,
    username: String,
    access_token: String,
    ram_limit: u32,
    java_path: Option<String>,
) -> Result<(), String> {
    use crate::profile::{profile_dir, profile_mods_dir};

    let pdir = profile_dir(&profile_id);
    let profile_file = pdir.join("profile.json");

    let profile: crate::profile::Profile = if profile_file.exists() {
        serde_json::from_str(&fs::read_to_string(&profile_file).map_err(|e| e.to_string())?)
            .map_err(|e| e.to_string())?
    } else {
        return Err("Profile not found".into());
    };

    let java = java_path.unwrap_or_else(|| "java".to_string());
    let vdir = version_dir(&profile.minecraft_version);
    let client_jar = vdir.join(format!("{}.jar", profile.minecraft_version));

    let mut classpath: Vec<String> = vec![client_jar.to_string_lossy().to_string()];

    let version_json_path = vdir.join(format!("{}.json", profile.minecraft_version));
    if version_json_path.exists() {
        let detail: VersionDetail = serde_json::from_str(
            &fs::read_to_string(&version_json_path).map_err(|e| e.to_string())?,
        )
        .map_err(|e| e.to_string())?;

        for lib in &detail.libraries {
            if !is_rule_allowed(&lib.rules) {
                continue;
            }
            let path = library_path(&lib.name);
            if path.exists() {
                classpath.push(path.to_string_lossy().to_string());
            }
        }
    }

    let fabric_dir = vdir.join("fabric");
    if fabric_dir.exists() {
        if let Ok(entries) = fs::read_dir(&fabric_dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.extension().map(|e| e == "jar").unwrap_or(false) {
                    classpath.push(path.to_string_lossy().to_string());
                }
            }
        }
    }

    let mods_dir = profile_mods_dir(&profile_id);
    if mods_dir.exists() {
        if let Ok(entries) = fs::read_dir(&mods_dir) {
            for entry in entries.flatten() {
                let path = entry.path();
                if path.extension().map(|e| e == "jar").unwrap_or(false) {
                    classpath.push(path.to_string_lossy().to_string());
                }
            }
        }
    }

    let classpath_str = classpath.join(if cfg!(target_os = "windows") { ";" } else { ":" });

    let game_dir = pdir.to_string_lossy().to_string();
    let assets_path = assets_dir().to_string_lossy().to_string();

    let main_class = if fabric_dir.exists() {
        "net.fabricmc.loader.launch.knot.KnotClient"
    } else {
        "net.minecraft.client.main.Main"
    };

    let mut args: Vec<String> = vec![
        format!("-Xmx{}M", ram_limit),
        format!("-Xms{}M", ram_limit / 2),
        "-Djava.awt.headless=true".to_string(),
        format!("-Dminecraft.client.jar={}", client_jar.to_string_lossy()),
        "-cp".to_string(),
        classpath_str,
        main_class.to_string(),
    ];

    let game_args = vec![
        "--username".to_string(), username,
        "--uuid".to_string(), account_uuid,
        "--accessToken".to_string(), access_token,
        "--version".to_string(), profile.minecraft_version.clone(),
        "--gameDir".to_string(), game_dir,
        "--assetsDir".to_string(), assets_path,
        "--assetIndex".to_string(), profile.minecraft_version.clone(),
    ];

    args.extend(game_args);

    let _ = app.emit("game-launch", &serde_json::json!({"status": "starting"}));

    let mut child = std::process::Command::new(&java)
        .args(&args)
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .map_err(|e| format!("Failed to launch game: {}", e))?;

    let pid = child.id();
    let _ = app.emit("game-launch", &serde_json::json!({"status": "running", "pid": pid}));

    tokio::spawn(async move {
        let _ = child.wait();
        let _ = app.emit("game-closed", &serde_json::json!({"pid": pid}));
    });

    Ok(())
}
