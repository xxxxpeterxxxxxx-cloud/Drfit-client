mod auth;
mod minecraft;
mod fabric;
mod profile;
mod modrinth;

use tracing_subscriber;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt::init();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(auth::init_state())
        .manage(profile::init_state())
        .invoke_handler(tauri::generate_handler![
            auth::login_microsoft,
            auth::get_accounts,
            auth::switch_account,
            auth::logout,
            minecraft::get_version_manifest,
            minecraft::download_assets,
            minecraft::launch_game,
            fabric::install_fabric,
            fabric::install_legacy_fabric,
            profile::create_profile,
            profile::list_profiles,
            profile::delete_profile,
            profile::get_active_profile,
            profile::set_active_profile,
            modrinth::search_mods,
            modrinth::install_mod,
            modrinth::list_installed_mods,
            modrinth::toggle_mod,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Drift Client launcher");
}
