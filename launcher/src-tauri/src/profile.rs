use serde::{Deserialize, Serialize};
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
    state.profiles.lock().unwrap().push(profile.clone());
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
        Ok(())
    } else {
        Err("Profile not found".into())
    }
}
