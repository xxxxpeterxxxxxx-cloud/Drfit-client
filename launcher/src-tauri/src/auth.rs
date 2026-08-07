use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::{Emitter, State};

const CLIENT_ID: &str = "00000000402b5328";
const SCOPE: &str = "XboxLive.signin offline_access";

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
    #[serde(skip_serializing, skip_deserializing)]
    pub ms_refresh_token: Option<String>,
}

#[derive(Deserialize)]
struct DeviceCodeResponse {
    device_code: String,
    user_code: String,
    verification_uri: String,
    expires_in: u64,
    interval: u64,
}

#[derive(Deserialize)]
struct TokenResponse {
    access_token: Option<String>,
    refresh_token: Option<String>,
    expires_in: Option<u64>,
    error: Option<String>,
    error_description: Option<String>,
}

#[derive(Deserialize)]
struct XblResponse {
    Token: String,
}

#[derive(Deserialize)]
struct XstsResponse {
    Token: String,
}

#[derive(Deserialize)]
struct McLoginResponse {
    access_token: String,
}

#[derive(Deserialize)]
struct McProfileResponse {
    id: String,
    name: String,
}

#[derive(Serialize, Clone)]
pub struct DeviceCodeInfo {
    user_code: String,
    verification_uri: String,
    device_code: String,
    interval: u64,
    expires_in: u64,
}

fn drift_dir() -> std::path::PathBuf {
    let home = dirs::home_dir().unwrap_or_else(|| std::path::PathBuf::from("."));
    home.join(".drift")
}

fn accounts_file() -> std::path::PathBuf {
    drift_dir().join("accounts.json")
}

#[derive(Serialize, Deserialize)]
struct PersistedAccount {
    uuid: String,
    username: String,
    access_token: String,
    ms_refresh_token: Option<String>,
}

fn save_accounts(state: &AuthState) {
    let accounts = state.accounts.lock().unwrap();
    let persisted: Vec<PersistedAccount> = accounts
        .iter()
        .map(|a| PersistedAccount {
            uuid: a.uuid.clone(),
            username: a.username.clone(),
            access_token: a.access_token.clone(),
            ms_refresh_token: a.ms_refresh_token.clone(),
        })
        .collect();
    let active = state.active_account.lock().unwrap().clone();

    let data = serde_json::json!({
        "accounts": persisted,
        "active": active,
    });

    let dir = drift_dir();
    let _ = std::fs::create_dir_all(&dir);
    let _ = std::fs::write(accounts_file(), serde_json::to_string_pretty(&data).unwrap_or_default());
}

pub fn init_state() -> AuthState {
    let path = accounts_file();
    if path.exists() {
        if let Ok(data) = std::fs::read_to_string(&path) {
            if let Ok(v) = serde_json::from_str::<serde_json::Value>(&data) {
                let accounts: Vec<PersistedAccount> =
                    serde_json::from_value(v["accounts"].clone()).unwrap_or_default();
                let active: Option<String> =
                    serde_json::from_value(v["active"].clone()).unwrap_or_default();

                let accounts: Vec<Account> = accounts
                    .into_iter()
                    .map(|a| Account {
                        uuid: a.uuid,
                        username: a.username,
                        access_token: a.access_token,
                        ms_refresh_token: a.ms_refresh_token,
                    })
                    .collect();

                return AuthState {
                    accounts: Mutex::new(accounts),
                    active_account: Mutex::new(active),
                };
            }
        }
    }
    AuthState::default()
}

async fn request_device_code() -> Result<DeviceCodeResponse, String> {
    let client = reqwest::Client::new();
    let params = [
        ("client_id", CLIENT_ID),
        ("scope", SCOPE),
    ];

    let resp = client
        .post("https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode")
        .form(&params)
        .send()
        .await
        .map_err(|e| format!("Failed to request device code: {}", e))?;

    resp.json::<DeviceCodeResponse>()
        .await
        .map_err(|e| format!("Failed to parse device code response: {}", e))
}

async fn poll_for_token(device_code: &str, interval: u64) -> Result<TokenResponse, String> {
    let client = reqwest::Client::new();
    let params = [
        ("grant_type", "urn:ietf:params:oauth:grant-type:device_code"),
        ("client_id", CLIENT_ID),
        ("device_code", device_code),
    ];

    loop {
        tokio::time::sleep(std::time::Duration::from_secs(interval)).await;

        let resp = client
            .post("https://login.microsoftonline.com/consumers/oauth2/v2.0/token")
            .form(&params)
            .send()
            .await
            .map_err(|e| format!("Token poll failed: {}", e))?;

        let token: TokenResponse = resp.json().await.map_err(|e| format!("Token parse failed: {}", e))?;

        if let Some(err) = &token.error {
            if err == "authorization_pending" {
                continue;
            }
            if err == "slow_down" {
                tokio::time::sleep(std::time::Duration::from_secs(interval + 5)).await;
                continue;
            }
            if err == "expired_token" {
                return Err("Device code expired. Please try logging in again.".into());
            }
            let desc = token.error_description.unwrap_or_else(|| "Unknown error".into());
            return Err(format!("Auth error: {} — {}", err, desc));
        }

        if token.access_token.is_none() {
            return Err("Token response missing access_token".into());
        }

        return Ok(token);
    }
}

async fn exchange_xbl(ms_token: &str) -> Result<String, String> {
    let client = reqwest::Client::new();
    let body = serde_json::json!({
        "Properties": {
            "AuthMethod": "RPS",
            "SiteName": "user.auth.xboxlive.com",
            "RpsTicket": format!("d={}", ms_token),
        },
        "RelyingParty": "http://auth.xboxlive.com",
        "TokenType": "JWT",
    });

    let resp = client
        .post("https://user.auth.xboxlive.com/user/authenticate")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("XBL auth failed: {}", e))?;

    let xbl: XblResponse = resp.json().await.map_err(|e| format!("XBL parse failed: {}", e))?;
    Ok(xbl.Token)
}

async fn exchange_xsts(xbl_token: &str) -> Result<String, String> {
    let client = reqwest::Client::new();
    let body = serde_json::json!({
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [xbl_token],
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT",
    });

    let resp = client
        .post("https://xsts.auth.xboxlive.com/xsts/authorize")
        .header("Content-Type", "application/json")
        .header("Accept", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("XSTS auth failed: {}", e))?;

    let xsts: XstsResponse = resp.json().await.map_err(|e| format!("XSTS parse failed: {}", e))?;
    Ok(xsts.Token)
}

async fn exchange_mc_token(xsts_token: &str) -> Result<String, String> {
    let client = reqwest::Client::new();
    let body = serde_json::json!({
        "identityToken": format!("XBL3.0 x={};", xsts_token),
    });

    let resp = client
        .post("https://api.minecraftservices.com/authentication/login_with_xbox")
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await
        .map_err(|e| format!("MC auth failed: {}", e))?;

    let mc: McLoginResponse = resp.json().await.map_err(|e| format!("MC token parse failed: {}", e))?;
    Ok(mc.access_token)
}

async fn fetch_mc_profile(mc_token: &str) -> Result<(String, String), String> {
    let client = reqwest::Client::new();
    let resp = client
        .get("https://api.minecraftservices.com/minecraft/profile")
        .header("Authorization", format!("Bearer {}", mc_token))
        .send()
        .await
        .map_err(|e| format!("Profile fetch failed: {}", e))?;

    if !resp.status().is_success() {
        return Err("No Minecraft profile found. Do you own Minecraft?".into());
    }

    let profile: McProfileResponse = resp.json().await.map_err(|e| format!("Profile parse failed: {}", e))?;
    Ok((profile.id, profile.name))
}

#[tauri::command]
pub async fn login_microsoft(app: tauri::AppHandle, state: State<'_, AuthState>) -> Result<Account, String> {
    let device_code = request_device_code().await?;

    let info = DeviceCodeInfo {
        user_code: device_code.user_code.clone(),
        verification_uri: device_code.verification_uri.clone(),
        device_code: device_code.device_code.clone(),
        interval: device_code.interval,
        expires_in: device_code.expires_in,
    };
    let _ = app.emit("device-code", &info);

    let ms_token = poll_for_token(&device_code.device_code, device_code.interval).await?;
    let ms_access = ms_token.access_token.clone().unwrap_or_default();
    let ms_refresh = ms_token.refresh_token.clone();

    let xbl_token = exchange_xbl(&ms_access).await?;
    let xsts_token = exchange_xsts(&xbl_token).await?;
    let mc_token = exchange_mc_token(&xsts_token).await?;
    let (uuid, username) = fetch_mc_profile(&mc_token).await?;

    let account = Account {
        uuid,
        username,
        access_token: mc_token,
        ms_refresh_token: ms_refresh,
    };

    let mut accounts = state.accounts.lock().unwrap();
    accounts.retain(|a| a.uuid != account.uuid);
    accounts.push(account.clone());
    *state.active_account.lock().unwrap() = Some(account.uuid.clone());
    drop(accounts);

    save_accounts(&state);
    Ok(account)
}

#[tauri::command]
pub fn get_accounts(state: State<'_, AuthState>) -> Vec<Account> {
    state
        .accounts
        .lock()
        .unwrap()
        .iter()
        .map(|a| Account {
            ms_refresh_token: None,
            ..a.clone()
        })
        .collect()
}

#[tauri::command]
pub fn switch_account(uuid: String, state: State<'_, AuthState>) -> Result<(), String> {
    let accounts = state.accounts.lock().unwrap();
    if accounts.iter().any(|a| a.uuid == uuid) {
        *state.active_account.lock().unwrap() = Some(uuid);
        drop(accounts);
        save_accounts(&state);
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
    drop(accounts);
    drop(active);
    save_accounts(&state);
    Ok(())
}
