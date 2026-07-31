use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
pub struct ProfileState {
    pub profiles: Mutex<Vec<Profile>>,
    pub active: Mutex<Option<String>>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Profile {
    pub id: String,
    pub name: String,
    pub minecraft_version: String,
    pub mod_loader: String,
    pub java_version: u32,
    pub ram_limit: u32,
    pub created_at: String,
}

fn drift_dir() -> PathBuf {
    let home = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
    home.join(".drift")
}

fn profiles_file() -> PathBuf {
    drift_dir().join("profiles.json")
}

#[derive(Serialize, Deserialize)]
struct PersistedState {
    profiles: Vec<Profile>,
    active: Option<String>,
}

impl PersistedState {
    fn load() -> Self {
        let path = profiles_file();
        if path.exists() {
            match fs::read_to_string(&path) {
                Ok(data) => serde_json::from_str(&data).unwrap_or_default(),
                Err(_) => Self::default(),
            }
        } else {
            Self::default()
        }
    }

    fn save(&self) -> Result<(), String> {
        let dir = drift_dir();
        fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
        let data = serde_json::to_string_pretty(self).map_err(|e| e.to_string())?;
        fs::write(profiles_file(), data).map_err(|e| e.to_string())
    }
}

impl Default for PersistedState {
    fn default() -> Self {
        Self {
            profiles: vec![],
            active: None,
        }
    }
}

pub fn init_state() -> ProfileState {
    let persisted = PersistedState::load();
    ProfileState {
        profiles: Mutex::new(persisted.profiles),
        active: Mutex::new(persisted.active),
    }
}

fn persist(state: &ProfileState) {
    let persisted = PersistedState {
        profiles: state.profiles.lock().unwrap().clone(),
        active: state.active.lock().unwrap().clone(),
    };
    let _ = persisted.save();
}

pub fn profile_dir(profile_id: &str) -> PathBuf {
    drift_dir().join("profiles").join(profile_id)
}

pub fn profile_mods_dir(profile_id: &str) -> PathBuf {
    profile_dir(profile_id).join("mods")
}

#[tauri::command]
pub fn create_profile(
    name: String,
    minecraft_version: String,
    mod_loader: String,
    state: State<'_, ProfileState>,
) -> Result<Profile, String> {
    let profile = Profile {
        id: format!("profile-{}", chrono::Utc::now().timestamp()),
        name,
        minecraft_version,
        mod_loader,
        java_version: 21,
        ram_limit: 4096,
        created_at: chrono::Utc::now().to_rfc3339(),
    };

    let pdir = profile_dir(&profile.id);
    fs::create_dir_all(pdir).map_err(|e| e.to_string())?;
    fs::create_dir_all(profile_mods_dir(&profile.id)).map_err(|e| e.to_string())?;

    state.profiles.lock().unwrap().push(profile.clone());
    persist(&state);
    Ok(profile)
}

#[tauri::command]
pub fn list_profiles(state: State<'_, ProfileState>) -> Vec<Profile> {
    state.profiles.lock().unwrap().clone()
}

#[tauri::command]
pub fn delete_profile(id: String, state: State<'_, ProfileState>) -> Result<(), String> {
    let mut profiles = state.profiles.lock().unwrap();
    profiles.retain(|p| p.id != id);

    let dir = profile_dir(&id);
    if dir.exists() {
        let _ = fs::remove_dir_all(&dir);
    }

    let mut active = state.active.lock().unwrap();
    if active.as_deref() == Some(id.as_str()) {
        *active = profiles.first().map(|a| a.id.clone());
    }
    drop(profiles);
    drop(active);
    persist(&state);
    Ok(())
}

#[tauri::command]
pub fn get_active_profile(state: State<'_, ProfileState>) -> Option<Profile> {
    let active_id = state.active.lock().unwrap().clone()?;
    state
        .profiles
        .lock()
        .unwrap()
        .iter()
        .find(|p| p.id == active_id)
        .cloned()
}

#[tauri::command]
pub fn set_active_profile(id: String, state: State<'_, ProfileState>) -> Result<(), String> {
    let profiles = state.profiles.lock().unwrap();
    if profiles.iter().any(|p| p.id == id) {
        *state.active.lock().unwrap() = Some(id);
        drop(profiles);
        persist(&state);
        Ok(())
    } else {
        Err("Profile not found".into())
    }
}
