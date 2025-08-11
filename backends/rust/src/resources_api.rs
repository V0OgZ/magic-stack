// 📦 RESOURCES API - Sert les données depuis hot/content/
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub struct Resource {
    pub id: String,
    pub name: String,
    pub icon: String,
    pub category: String,
    #[serde(flatten)]
    pub data: Value,
}

// GET /api/heroes
pub async fn get_heroes() -> Result<Json<Vec<Resource>>, StatusCode> {
    load_resources_from_dir("hot/content/heroes")
}

// GET /api/creatures  
pub async fn get_creatures() -> Result<Json<Vec<Resource>>, StatusCode> {
    load_resources_from_dir("hot/content/creatures")
}

// GET /api/artifacts
pub async fn get_artifacts() -> Result<Json<Vec<Resource>>, StatusCode> {
    load_resources_from_dir("hot/content/artifacts")
}

// GET /api/portals
pub async fn get_portals() -> Result<Json<Vec<Resource>>, StatusCode> {
    // Pour l'instant on retourne les portails hardcodés
    let portals = vec![
        Resource {
            id: "portal_avalon".to_string(),
            name: "Portail d'Avalon".to_string(),
            icon: "🌀".to_string(),
            category: "dimensional".to_string(),
            data: serde_json::json!({
                "type": "dimensional",
                "destination": "AVALON_ETERNAL",
                "requirements": ["magic_level_5"]
            })
        },
        Resource {
            id: "portal_pocket".to_string(),
            name: "Portail de Poche".to_string(),
            icon: "🌌".to_string(),
            category: "pocket_world".to_string(),
            data: serde_json::json!({
                "type": "pocket_world",
                "destination": "POCKET_DIMENSION"
            })
        },
        Resource {
            id: "portal_temporal".to_string(),
            name: "Portail Temporel".to_string(),
            icon: "⏳".to_string(),
            category: "temporal".to_string(),
            data: serde_json::json!({
                "type": "temporal",
                "destination": "PAST_OR_FUTURE"
            })
        }
    ];
    
    Ok(Json(portals))
}

// GET /api/resources/all - Tout en un seul appel
pub async fn get_all_resources() -> Result<Json<Value>, StatusCode> {
    let heroes = load_resources_from_dir("hot/content/heroes").unwrap_or_else(|_| Json(vec![])).0;
    let creatures = load_resources_from_dir("hot/content/creatures").unwrap_or_else(|_| Json(vec![])).0;
    let artifacts = load_resources_from_dir("hot/content/artifacts").unwrap_or_else(|_| Json(vec![])).0;
    let portals = get_portals().await.unwrap_or_else(|_| Json(vec![])).0;
    
    Ok(Json(serde_json::json!({
        "heroes": heroes,
        "creatures": creatures,
        "artifacts": artifacts,
        "portals": portals
    })))
}

// Fonction helper pour charger depuis un dossier
fn load_resources_from_dir(dir: &str) -> Result<Json<Vec<Resource>>, StatusCode> {
    let base_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent().unwrap()
        .parent().unwrap()
        .join(dir);
    
    let mut resources = Vec::new();
    
    // Pour l'instant on retourne des données mockées si le dossier n'existe pas
    // TODO: Parser les vrais JSON depuis hot/content/
    if !base_path.exists() {
        // Mock data pour tester
        if dir.contains("heroes") {
            resources.push(Resource {
                id: "jean_grofignon".to_string(),
                name: "Jean Grofignon".to_string(),
                icon: "🚬".to_string(),
                category: "cosmic".to_string(),
                data: serde_json::json!({
                    "power": 99,
                    "knowledge": 99
                })
            });
        }
    }
    
    Ok(Json(resources))
}
