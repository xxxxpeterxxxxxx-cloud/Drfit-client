mod auth;
mod minecraft;
mod fabric;
mod profile;
mod modrinth;
mod cipher;
mod curseforge;

use tracing_subscriber;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt::init();

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(auth::init_state())
        .manage(profile::init_state())
        .manage(cipher::CipherState::default())
        .manage(curseforge::CurseForgeState::default())
        .invoke_handler(tauri::generate_handler![
            auth::login_microsoft,
            auth::get_accounts,
            auth::switch_account,
            auth::logout,
            minecraft::get_version_manifest,
            minecraft::download_assets,
            minecraft::download_drift_mods,
            minecraft::launch_game,
            minecraft::detect_java_path,
            minecraft::get_supported_versions,
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
            cipher::set_cipher_config,
            cipher::get_cipher_config,
            cipher::cipher_health,
            cipher::cipher_stats,
            cipher::cipher_bot_guilds,
            cipher::mc_server_status,
            cipher::mc_server_players,
            cipher::mc_server_command,
            cipher::mc_server_start,
            cipher::mc_server_stop,
            cipher::mc_server_restart,
            cipher::mc_console_logs,
            curseforge::set_curseforge_key,
            curseforge::curseforge_search,
            curseforge::curseforge_files,
            curseforge::curseforge_install,
            curseforge::import_mod,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Drift Client launcher");
}
