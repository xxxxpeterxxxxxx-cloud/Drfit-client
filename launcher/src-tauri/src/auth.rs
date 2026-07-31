use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
pub struct AuthState {
    pub accounts: Mutex<Vec<Account>>,
    pub active_account: Mutex<Option<String>>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Account {
    pub uuid: String,
    pub username: String,
    pub access_token: String,
}

#[tauri::command]
pub async fn login_microsoft(_state: State<'_, AuthState>) -> Result<Account, String> {
    // TODO: Implement MSAL OAuth2 flow
    // 1. Open browser to Microsoft login URL
    // 2. Receive auth code via redirect
    // 3. Exchange code for access token
    // 4. Fetch Minecraft profile (username, UUID)
    // 5. Store token in OS keychain
    Err("Microsoft OAuth not yet implemented".into())
}

#[tauri::command]
pub fn get_accounts(state: State<'_, AuthState>) -> Vec<Account> {
    state.accounts.lock().unwrap().clone()
}

#[tauri::command]
pub fn switch_account(uuid: String, state: State<'_, AuthState>) -> Result<(), String> {
    let accounts = state.accounts.lock().unwrap();
    if accounts.iter().any(|a| a.uuid == uuid) {
        *state.active_account.lock().unwrap() = Some(uuid);
        Ok(())
    } else {
        Err("Account not found".into())
    }
}

#[tauri::command]
pub fn logout(uuid: String, state: State<'_, AuthState>) -> Result<(), String> {
    let mut accounts = state.accounts.lock().unwrap();
    accounts.retain(|a| a.uuid != uuid);
    let mut active = state.active_account.lock().unwrap();
    if active.as_deref() == Some(uuid.as_str()) {
        *active = accounts.first().map(|a| a.uuid.clone());
    }
    Ok(())
}
