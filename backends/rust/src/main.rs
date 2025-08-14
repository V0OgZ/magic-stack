#![allow(non_snake_case)]
#![allow(dead_code)]
//! Magic Stack Rust Server - High-Performance Critical Components
//! 
//! This server provides ultra-fast implementations of critical Magic Stack operations:
//! - Q* Algorithm for 6D searches
//! - World State Graph updates  
//! - Temporal Grammar parsing
//! - 6D Vector operations
//!
//! It works alongside the Java Spring Boot backend, handling performance-critical tasks.

use magic_stack_core::*;
use magic_stack_core::temporal_grammar::{ExecutionContext as TgExecutionContext, TemporalFormula as TgTemporalFormula};
use sha2::{Digest, Sha256};
use magic_stack_core::pathfinding::{a_star_path_weighted, Cell as PfCell, PathfindingOptions as PfOpts, Topology as PfTopology};
use magic_stack_core::mapgen::{generate_map, MapGenParams};

// Module Multiplayer V2
mod multiplayer_v2;
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{Json, Html},
    routing::{get, post},
    Router,
};
use axum::extract::Path as AxPath;
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, error};
use tracing_subscriber;
use uuid::Uuid;
use tower_http::cors::{Any, CorsLayer};
use axum::http::Method;
use rand::SeedableRng;
use rand::distributions::Distribution;

/// Application state shared across handlers
#[derive(Clone)]
struct AppState {
    qstar_engine: Arc<RwLock<QStarEngine>>,
    world_state: Arc<WorldStateGraph>,
    java_connector: Arc<JavaConnector>,
    matches: Arc<RwLock<HashMap<String, MatchState>>>,
    vector_api_base: String,
    inventories: Arc<RwLock<HashMap<String, Vec<InventoryItem>>>>,
    tick_interval_ms: u64,
    minigame_sessions: Arc<RwLock<HashMap<String, MinigameSession>>>,
    heroes: Arc<RwLock<HashMap<String, HeroStatus>>>,
    processed_resolve: Arc<RwLock<HashSet<String>>>,
    processed_collapse: Arc<RwLock<HashSet<String>>>,
    // Orchestrator session/idempotency (MVP)
    orchestrator_sessions: Arc<RwLock<HashSet<String>>>,
    orchestrator_idempotency: Arc<RwLock<HashMap<String, HashSet<String>>>>,
    orchestrator_tick: Arc<RwLock<u64>>,
    // Multiplayer V2 Controller (optionnel)
    v2_controller: Option<Arc<multiplayer_v2::MultiplayerOfficialController>>,
}

/// Health check response
#[derive(Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    components: HashMap<String, String>,
}

/// Q* search request
#[derive(Deserialize)]
struct SearchRequest {
    query: String,
    center_x: f64,
    center_y: f64,
    center_z: f64,
    center_t: f64,
    center_c: f64,
    center_psi: f64,
    radius: f64,
    max_results: Option<usize>,
    entity_types: Option<Vec<String>>,
}

/// World state node creation request
#[derive(Deserialize)]
struct CreateNodeRequest {
    id: String,
    position: Position6DDto,
    node_type: String,
    properties: HashMap<String, serde_json::Value>,
}

#[derive(Deserialize, Serialize, Clone)]
struct Position6DDto {
    x: f64,
    y: f64,
    z: f64,
    t: f64,
    c: f64,
    psi: f64,
}

// ==== Agents DTOs ====
#[derive(Deserialize)]
struct TickViewport {
    width: Option<u32>,
    height: Option<u32>,
    portals: Option<Vec<serde_json::Value>>, // future
    entities: Option<Vec<serde_json::Value>>, // future
}

#[derive(Deserialize)]
struct TickMeta {
    mode: Option<String>,
    difficulty: Option<String>,
    matchId: Option<String>,
}

#[derive(Deserialize)]
struct TickRequest { viewport: Option<TickViewport>, meta: Option<TickMeta> }

#[derive(Serialize)]
struct TickResponse { commands: Vec<serde_json::Value>, serverTime: u64, nextTickMs: u64 }

#[derive(Deserialize)]
struct PlanRequest {
    start: Option<Position2D>,
    goal: Option<Position2D>,
    opts: Option<HashMap<String, serde_json::Value>>,
    // New: map and agent parameters
    map: Option<MapDto>,
    agent: Option<AgentDto>,
}

#[derive(Deserialize, Serialize, Clone)]
struct Position2D { x: i32, y: i32, #[serde(default="default_tl")] tl: String }

fn default_tl() -> String { "principale".to_string() }

#[derive(Serialize)]
struct PlanResponse { path: Vec<Position2D>, cost: f64, ok: bool }

#[derive(Deserialize, Serialize, Clone)]
struct MapDto {
    // 0 free, 1 obstacle
    obstacles: Vec<Vec<u8>>,            
    // optional per-cell additive terrain cost (relative)
    terrain: Option<Vec<Vec<f64>>>,
    // optional per-cell causal stability C in [0,1]
    causal_c: Option<Vec<Vec<f64>>>,
}

#[derive(Deserialize, Serialize, Clone)]
struct AgentDto {
    speed_multiplier: Option<f64>,
    alpha_causal: Option<f64>,
    // If negative, le temps « recule ». On utilise la valeur du signe uniquement ici
    time_velocity: Option<f64>,
}

// ==== Causality Resolution DTOs ====
#[derive(Deserialize, Serialize, Clone)]
enum ResolutionMode { QUANTUM, TCG }

#[derive(Deserialize, Serialize, Clone)]
struct ResolveRequest {
    // Area to check: either explicit node_ids or a 6D zone
    node_ids: Option<Vec<String>>,
    center: Option<Position6DDto>,
    radius: Option<f64>,
    mode: Option<ResolutionMode>,
    seed: Option<u64>,
}

#[derive(Serialize)]
struct ResolveOutcome {
    mode: ResolutionMode,
    involved: Vec<String>,
    winner: Option<String>,
    started_match_id: Option<String>,
}

#[derive(Deserialize)]
struct CreateMatchRequest {
    mode: Option<String>,
    seed: Option<String>,
    map: Option<HashMap<String, i32>>,
    agents: Option<Vec<HashMap<String, serde_json::Value>>>,
}

#[derive(Serialize, Clone)]
struct MatchState { tick: u64, entities: Vec<serde_json::Value>, score: HashMap<String, f64> }

#[derive(Serialize)]
struct CreateMatchResponse { matchId: String }

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();
    
    info!("🦀 Magic Stack Rust Server starting...");
    
    // Initialize components
    let qstar_engine = Arc::new(RwLock::new(QStarEngine::new()));
    let world_state = Arc::new(WorldStateGraph::new());
    let java_connector = Arc::new(JavaConnector::new(None));
    let matches = Arc::new(RwLock::new(HashMap::<String, MatchState>::new()));
    let vector_api_base = std::env::var("VECTOR_API_BASE").unwrap_or_else(|_| "http://localhost:5001".to_string());
    let tick_interval_ms: u64 = std::env::var("RUST_TICK_MS").ok().and_then(|s| s.parse().ok()).unwrap_or(2000);
    let inventories = Arc::new(RwLock::new(HashMap::<String, Vec<InventoryItem>>::new()));
    let minigame_sessions = Arc::new(RwLock::new(HashMap::<String, MinigameSession>::new()));
    let heroes = Arc::new(RwLock::new(HashMap::<String, HeroStatus>::new()));
    let processed_resolve = Arc::new(RwLock::new(HashSet::<String>::new()));
    let processed_collapse = Arc::new(RwLock::new(HashSet::<String>::new()));
    let orchestrator_sessions = Arc::new(RwLock::new(HashSet::<String>::new()));
    let orchestrator_idempotency = Arc::new(RwLock::new(HashMap::<String, HashSet<String>>::new()));
    let orchestrator_tick = Arc::new(RwLock::new(0u64));
    
    // Test Java connection
    match java_connector.test_connection().await {
        Ok(true) => info!("✅ Java backend connection established"),
        Ok(false) => info!("⚠️ Java backend connection issues"),
        Err(e) => info!("⚠️ Java backend not available: {}", e),
    }
    
    // Create Multiplayer V2 Controller (optional)
    let v2_sessions = Arc::new(RwLock::new(HashMap::<String, serde_json::Value>::new()));
    let v2_controller = if std::env::var("V2_ENABLED").unwrap_or("true".to_string()) == "true" {
        info!("🎮 Multiplayer V2 Controller: ENABLED");
        Some(Arc::new(multiplayer_v2::MultiplayerOfficialController::new(
            v2_sessions.clone(),
            None, // Default config
        )))
    } else {
        info!("⏸️ Multiplayer V2 Controller: DISABLED");
        None
    };
    
    let app_state = AppState {
        qstar_engine,
        world_state,
        java_connector,
        matches,
        vector_api_base,
        inventories,
        tick_interval_ms,
        minigame_sessions,
        heroes,
        processed_resolve,
        processed_collapse,
        orchestrator_sessions,
        orchestrator_idempotency,
        orchestrator_tick,
        v2_controller,
    };
    
    // Build router
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers(Any);

    let app = Router::new()
        // Agents endpoints (MVP)
        .route("/health", post(agents_health))
        .route("/agents/tick", post(agents_tick))
        .route("/agents/plan", post(agents_plan))
        .route("/agents/fork", post(agents_fork))
        .route("/agents/merge", post(agents_merge))
        .route("/agents/control", post(agents_control))
        .route("/agents/cast", post(agents_cast))
        .route("/matches", post(create_match))
        .route("/matches/:id/state", get(get_match_state))
        // Existing endpoints
        .route("/health", get(health_check))
        .route("/api/qstar/search", post(qstar_search))
        .route("/api/world-state/nodes", post(create_node))
        .route("/api/world-state/nodes/:id", get(get_node))
        .route("/api/world-state/nodes/:id/position", post(update_position))
        .route("/api/world-state/identities/:id/doubles", get(get_identity_doubles))
        .route("/api/world-state/nodes/radius", get(get_nodes_in_radius))
        .route("/api/world-state/collapse", post(observation_collapse))
        .route("/api/causality/resolve", post(causality_resolve))
        .route("/api/test/all-formulas", post(test_all_formulas))
        .route("/api/integration/formula-cast", post(integrated_formula_cast))
        .route("/openapi", get(openapi_handler))
        .route("/openapi/all", get(openapi_all_handler))
        .route("/docs/openapi", get(openapi_ui_handler))
        .route("/explorer", get(api_explorer_handler))
        .route("/api/map/generate", post(map_generate))
        .route("/api/map/init", post(map_init))
        // Temporal grammar endpoints (for Java integration)
        .route("/temporal/parse", post(temporal_parse))
        .route("/temporal/execute", post(temporal_execute))
        // Archives (Vector DB local proxy)
        .route("/api/archives/status", get(archives_status))
        .route("/api/archives/search", post(archives_search))
        .route("/api/archives/build", post(archives_build))
        // Economy / Craft / Runes
        .route("/api/economy/inventory", get(get_inventory))
        .route("/api/economy/collect", post(economy_collect))
        .route("/api/economy/arcade-result", post(economy_arcade_result))
        .route("/api/craft/potion", post(craft_potion))
        .route("/api/craft/crystal", post(craft_crystal))
        .route("/api/craft/artifact", post(craft_artifact))
        .route("/api/mage/learn-runes", post(mage_learn_runes))
        // Nearby (WSG)
        .route("/api/panopticon/world-state-graph/nearby", get(get_nodes_in_radius))
        // Minigames
        .route("/api/minigames/catalog", get(minigames_catalog))
        .route("/api/minigames/start", post(minigame_start))
        .route("/api/minigames/:id", get(minigame_get))
        .route("/api/minigames/:id/result", post(minigame_result))
        .route("/api/minigames/auto-trigger", post(minigame_auto_trigger))
        // Hero XP/Perks (local MVP)
        .route("/api/hero/status", get(hero_status))
        .route("/api/hero/add-xp", post(hero_add_xp))
        .route("/api/hero/apply-perk", post(hero_apply_perk))
        // Orchestrator (MVP)
        .route("/orchestrator/session", post(orc_session))
        .route("/orchestrator/intent", post(orc_intent))
        .route("/orchestrator/decision-policy", get(orc_policy))
        .route("/orchestrator/snapshot", get(orc_snapshot))
        // TCG AI (MVP)
        .route("/tcg/ai/decide", post(tcg_ai_decide))
        .route("/tcg/ai/coach", post(tcg_ai_coach))
        .route("/tcg/ai/telemetry/:id", get(tcg_ai_telemetry))
        // Combat/Observation compact views
        .route("/combat/state/:id", get(get_combat_state_compact))
        .route("/observe/compact", get(observe_compact))
        // === Multiplayer V2 Routes (optional) ===
        .route("/api/v2/tick", post(v2_tick_handler))
        .route("/api/v2/entity/:id", get(v2_get_entity_handler))
        .route("/api/v2/migrate-entity", post(v2_migrate_entity_handler))
        .route("/api/v2/config", get(v2_config_handler))
        // New minimal V2 endpoints for playable editor
        .route("/api/v2/entity", post(v2_upsert_entity_handler))
        .route("/api/v2/regulators/vince", post(v2_reg_vince_handler))
        .route("/api/v2/regulators/anna", post(v2_reg_anna_handler))
        .route("/api/v2/regulators/overload", post(v2_reg_overload_handler))
        .layer(cors)
        .with_state(app_state);
    
    // Start server
    let port = std::env::var("RUST_PORT").unwrap_or_else(|_| "3001".to_string());
    let addr = format!("0.0.0.0:{}", port);
    
    info!("🚀 Magic Stack Rust Server listening on {}", addr);
    info!("🌀 Q* Algorithm: READY");
    info!("🌐 World State Graph: READY");
    info!("⚡ High-performance mode: ENABLED");
    
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// ===== MULTIPLAYER V2 HANDLERS =====

async fn v2_tick_handler(
    State(state): State<AppState>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        match controller.tick(state.tick_interval_ms).await {
            Ok(result) => Json(serde_json::json!({
                "success": true,
                "result": result
            })),
            Err(e) => Json(serde_json::json!({
                "success": false,
                "error": e
            }))
        }
    } else {
        Json(serde_json::json!({
            "success": false,
            "error": "V2 controller not enabled"
        }))
    }
}

async fn v2_get_entity_handler(
    State(state): State<AppState>,
    AxPath(id): AxPath<String>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let entities = controller.entities_v2.read().await;
        if let Some(entity) = entities.get(&id) {
            Json(serde_json::json!({
                "success": true,
                "entity": entity
            }))
        } else {
            Json(serde_json::json!({
                "success": false,
                "error": "Entity not found"
            }))
        }
    } else {
        Json(serde_json::json!({
            "success": false,
            "error": "V2 controller not enabled"
        }))
    }
}

async fn v2_migrate_entity_handler(
    State(state): State<AppState>,
    Json(req): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let id = req["id"].as_str().unwrap_or("unknown");
        let pos_x = req["x"].as_i64().unwrap_or(0) as i32;
        let pos_y = req["y"].as_i64().unwrap_or(0) as i32;
        let energy = req["energy"].as_f64().unwrap_or(100.0);
        
        let entity_v2 = multiplayer_v2::EntityV2 {
            id: id.to_string(),
            position: (pos_x, pos_y),
            energy,
            temporal: Some(multiplayer_v2::TemporalState {
                t_e: 0.0,
                day_hidden: 0,
                drift_rate: 0.02,
                last_tick: 0,
            }),
            energy_complex: Some(multiplayer_v2::EnergyComplexV2 {
                a: energy,
                phi: Some(1.0),
                debt_a: 0.0,
                a_max: 100.0,
            }),
            identity: Some(multiplayer_v2::IdentityV2 {
                psi_vector: vec![1.0, 0.0],
                coherence: 1.0,
                entanglements: vec![],
                interference_cache: HashMap::new(),
            }),
            visibility: None,
        };
        
        let mut entities = controller.entities_v2.write().await;
        entities.insert(id.to_string(), entity_v2.clone());
        
        Json(serde_json::json!({
            "success": true,
            "message": "Entity migrated to V2",
            "entity": entity_v2
        }))
    } else {
        Json(serde_json::json!({
            "success": false,
            "error": "V2 controller not enabled"
        }))
    }
}

async fn v2_config_handler(
    State(state): State<AppState>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        Json(serde_json::json!({
            "v2_enabled": controller.config.v2_enabled,
            "features": {
                "temporal": controller.config.v2_enabled,
                "phi": controller.config.phi_enabled,
                "regulators": controller.config.regulators_enabled,
                "debt": controller.config.debt_enabled,
            },
            "tick_ms": controller.config.tick_ms,
            "drift_base": controller.config.drift_base,
        }))
    } else {
        Json(serde_json::json!({
            "v2_enabled": false,
            "features": {},
            "message": "V2 controller not enabled"
        }))
    }
}

/// Upsert a V2 entity (create or update minimal fields)
async fn v2_upsert_entity_handler(
    State(state): State<AppState>,
    Json(req): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let id = req["id"].as_str().unwrap_or("").to_string();
        if id.is_empty() {
            return Json(serde_json::json!({"success": false, "error": "missing id"}));
        }
        let px = req["position"]["x"].as_i64().unwrap_or(0) as i32;
        let py = req["position"]["y"].as_i64().unwrap_or(0) as i32;
        let te = req["te"].as_f64().unwrap_or(0.0);
        let a = req["energy_complex"]["A"].as_f64()
            .or_else(|| req["energy_complex"]["amplitude"].as_f64())
            .unwrap_or(req["energy"].as_f64().unwrap_or(100.0));
        let phi = req["energy_complex"]["phi"].as_f64()
            .or_else(|| req["energy_complex"]["phase"].as_f64())
            .unwrap_or(0.0);
        let mut entities = controller.entities_v2.write().await;
        use crate::multiplayer_v2::*;
        let entry = entities.entry(id.clone()).or_insert_with(|| EntityV2 {
            id: id.clone(),
            position: (px, py),
            energy: a,
            temporal: Some(TemporalState { t_e: te, day_hidden: 0, drift_rate: 0.02, last_tick: 0 }),
            energy_complex: Some(EnergyComplexV2 { a, phi: Some(phi), debt_a: 0.0, a_max: 150.0 }),
            identity: Some(IdentityV2 { psi_vector: vec![1.0, 0.0], coherence: 1.0, entanglements: vec![], interference_cache: std::collections::HashMap::new() }),
            visibility: None,
        });
        // Update fields if already existed
        entry.position = (px, py);
        entry.energy = a;
        if let Some(t) = &mut entry.temporal { t.t_e = te; }
        if let Some(ec) = &mut entry.energy_complex { ec.a = a; if let Some(p) = &mut ec.phi { *p = phi; } else { ec.phi = Some(phi); } }
        drop(entities);
        return Json(serde_json::json!({"success": true, "id": id, "position": {"x": px, "y": py}, "A": a, "phi": phi }));
    }
    Json(serde_json::json!({"success": false, "error": "V2 controller not enabled"}))
}

#[derive(serde::Deserialize)]
struct VinceReq { position: Option<Position2D>, intensity: Option<f64> }

/// Activate/pulse Vince regulator (pierce fog)
async fn v2_reg_vince_handler(
    State(state): State<AppState>,
    Json(_req): Json<VinceReq>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let mut regs = controller.regulators.write().await;
        regs.vince.active = true;
        regs.vince.cooldown_remaining = 0.0;
        drop(regs);
        return Json(serde_json::json!({"success": true, "regulator": "vince"}));
    }
    Json(serde_json::json!({"success": false, "error": "V2 controller not enabled"}))
}

#[derive(serde::Deserialize)]
struct AnnaReq { decay_rate: Option<f64>, zone: Option<String> }

/// Activate Anna regulator with optional decay rate
async fn v2_reg_anna_handler(
    State(state): State<AppState>,
    Json(req): Json<AnnaReq>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let mut regs = controller.regulators.write().await;
        regs.anna.active = true;
        if let Some(r) = req.decay_rate { regs.anna.decay_rate = r; }
        drop(regs);
        return Json(serde_json::json!({"success": true, "regulator": "anna"}));
    }
    Json(serde_json::json!({"success": false, "error": "V2 controller not enabled"}))
}

/// Trigger Overload regulator (mark last_trigger)
async fn v2_reg_overload_handler(
    State(state): State<AppState>,
    Json(_req): Json<serde_json::Value>,
) -> Json<serde_json::Value> {
    if let Some(controller) = &state.v2_controller {
        let mut regs = controller.regulators.write().await;
        regs.overload.last_trigger = crate::now_ms();
        drop(regs);
        return Json(serde_json::json!({"success": true, "regulator": "overload"}));
    }
    Json(serde_json::json!({"success": false, "error": "V2 controller not enabled"}))
}
// ==== Agents Handlers (MVP) ====
async fn agents_health() -> Json<serde_json::Value> {
    Json(serde_json::json!({"ok": true, "version": env!("CARGO_PKG_VERSION"), "timestamp": now_ms()}))
}

async fn agents_tick(State(state): State<AppState>, Json(_req): Json<TickRequest>) -> Json<TickResponse> {
    let cmd = serde_json::json!({
        "type": "say",
        "text": "Agents tick processed",
        "level": "info"
    });

    // Send lightweight telemetry to Java regulators (best effort)
    // Not blocking the tick; failures are ignored but logged by connector
    // Using a fixed player id for MVP until matchmaking provides it
    // Capture a connector via a minimal static holder to avoid locking issues
    // For simplicity in MVP, we just skip if not available in this scope
    // (handlers below have access via State when needed)
    let java_opt: Option<Arc<JavaConnector>> = None;
    tokio::spawn(async move {
        let mut context = std::collections::HashMap::new();
        context.insert("serverTime".to_string(), serde_json::json!(now_ms()));
        context.insert("tick".to_string(), serde_json::json!("heartbeat"));
        if let Some(java) = java_opt {
            let _ = java.record_hunter_event("anonymous", "TICK_HEARTBEAT", context).await;
        }
    });

    Json(TickResponse { commands: vec![cmd], serverTime: now_ms(), nextTickMs: state.tick_interval_ms as u64 })
}

async fn agents_plan(Json(req): Json<PlanRequest>) -> Json<PlanResponse> {
    let start = req.start.unwrap_or(Position2D { x: 0, y: 0, tl: default_tl() });
    let goal = req.goal.unwrap_or(Position2D { x: 5, y: 0, tl: default_tl() });
    if let Some(map) = req.map.clone() {
        let agent = req.agent.clone().unwrap_or(AgentDto { speed_multiplier: Some(1.0), alpha_causal: Some(0.0), time_velocity: Some(1.0) });
        let speed = agent.speed_multiplier.unwrap_or(1.0).max(0.01);
        let alpha = agent.alpha_causal.unwrap_or(0.0).max(0.0);
        let inverted_time = agent.time_velocity.unwrap_or(1.0) < 0.0;
        let topology = req.opts.as_ref().and_then(|o| o.get("topology").and_then(|v| v.as_str())).map(|s| PfTopology::from_str(s)).unwrap_or(PfTopology::Plane);

        let terrain_ref = map.terrain.as_ref().map(|v| v.as_slice());
        let causal_ref = map.causal_c.as_ref().map(|v| v.as_slice());
        let start_c = PfCell { x: start.x, y: start.y };
        let goal_c = PfCell { x: goal.x, y: goal.y };
        let opts = Some(PfOpts { allow_diagonal: false });
        match a_star_path_weighted(&map.obstacles, terrain_ref, causal_ref, start_c, goal_c, opts, speed, alpha, inverted_time, topology) {
            Some((cells, cost)) => {
                let path = cells.into_iter().map(|c| Position2D { x: c.x, y: c.y, tl: start.tl.clone() }).collect();
                return Json(PlanResponse { path, cost, ok: true });
            }
            None => {
                return Json(PlanResponse { path: vec![], cost: f64::INFINITY, ok: false });
            }
        }
    }

    // Fallback: simple straight line along X
    let mut path = Vec::new();
    let dx = if goal.x >= start.x { 1 } else { -1 };
    let mut x = start.x;
    while x != goal.x { path.push(Position2D { x, y: start.y, tl: start.tl.clone() }); x += dx; }
    path.push(Position2D { x: goal.x, y: goal.y, tl: start.tl.clone() });
    Json(PlanResponse { path, cost: (goal.x - start.x).abs() as f64, ok: true })
}

async fn create_match(State(state): State<AppState>, Json(_req): Json<CreateMatchRequest>) -> Json<CreateMatchResponse> {
    let id = Uuid::new_v4().to_string();
    let mut score = HashMap::new();
    score.insert("A".to_string(), 0.0);
    score.insert("B".to_string(), 0.0);
    let st = MatchState { tick: 0, entities: vec![], score };
    state.matches.write().await.insert(id.clone(), st);
    Json(CreateMatchResponse { matchId: id })
}

async fn get_match_state(State(state): State<AppState>, AxPath(id): AxPath<String>) -> Result<Json<MatchState>, StatusCode> {
    let mut guard = state.matches.write().await;
    if let Some(mut st) = guard.get(&id).cloned() {
        st.tick += 1;
        guard.insert(id.clone(), st.clone());
        Ok(Json(st))
    } else {
        Err(StatusCode::NOT_FOUND)
    }
}

#[derive(Deserialize)]
struct ForkRequest { from_node_id: String, new_node_id: String, timeline_id: String, position: Position6DDto }

async fn agents_fork(State(state): State<AppState>, Json(req): Json<ForkRequest>) -> Result<Json<world_state::StateNode>, StatusCode> {
    let pos = Position6D::new(req.position.x, req.position.y, req.position.z, req.position.t, req.position.c, req.position.psi)
        .map_err(|_| StatusCode::BAD_REQUEST)?;
    match state.world_state.fork_identity(&req.from_node_id, &req.new_node_id, &req.timeline_id, pos) {
        Ok(node) => Ok(Json(node)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

#[derive(Deserialize)]
struct MergeRequest { identity_id: String, into_node_id: String, merged_node_id: String }

async fn agents_merge(State(state): State<AppState>, Json(req): Json<MergeRequest>) -> Result<Json<String>, StatusCode> {
    match state.world_state.merge_identity(&req.identity_id, &req.into_node_id, &req.merged_node_id) {
        Ok(()) => Ok(Json("OK".to_string())),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

async fn get_identity_doubles(State(state): State<AppState>, AxPath(identity_id): AxPath<String>) -> Json<Vec<world_state::StateNode>> {
    let nodes = state.world_state.get_identity_doubles(&identity_id);
    Json(nodes)
}

#[derive(Deserialize)]
struct ControlRequest { node_id: String, mode: String }

/// Set control mode for a node ("player" or "ai")
async fn agents_control(State(state): State<AppState>, Json(req): Json<ControlRequest>) -> Result<Json<world_state::StateNode>, StatusCode> {
    let mut node = match state.world_state.get_node(&req.node_id) {
        Some(n) => n,
        None => return Err(StatusCode::NOT_FOUND),
    };
    let mode = if req.mode.to_lowercase() == "player" { "player" } else { "ai" };
    node.properties.insert("controller".to_string(), serde_json::json!(mode));
    match state.world_state.update_node(node.clone()) {
        Ok(()) => Ok(Json(node)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

#[derive(Deserialize)]
struct CastRequest {
    formula: String,
    target: Option<String>,
    power: Option<i32>,
    formula_type: Option<String>,
    caster_node_id: String,
    parameters: Option<HashMap<String, serde_json::Value>>,
    caster_identity: Option<String>,
}

/// Cast a power/formula via Java backend
async fn agents_cast(State(state): State<AppState>, Json(req): Json<CastRequest>) -> Result<Json<java_connector::JavaMagicResponse>, StatusCode> {
    let mut params = req.parameters.unwrap_or_default();
    if let Some(t) = req.target { params.insert("target".to_string(), serde_json::json!(t)); }
    if let Some(p) = req.power { params.insert("power".to_string(), serde_json::json!(p)); }
    let caster_id = req.caster_identity.unwrap_or(req.caster_node_id);
    let request = java_connector::JavaMagicRequest {
        formula_type: req.formula_type.unwrap_or_else(|| "SIMPLE".to_string()),
        formula: req.formula,
        caster_id,
        parameters: params,
    };
    match state.java_connector.cast_formula(request).await {
        Ok(resp) => Ok(Json(resp)),
        Err(_) => Err(StatusCode::BAD_GATEWAY),
    }
}

fn now_ms() -> u64 {
    std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_millis() as u64
}


/// Health check endpoint
async fn health_check(State(state): State<AppState>) -> Json<HealthResponse> {
    let qstar_count = {
        let engine = state.qstar_engine.read().await;
        engine.entity_count()
    };
    
    let world_state_count = state.world_state.node_count();
    
    let mut components = HashMap::new();
    components.insert("qstar_engine".to_string(), format!("{} entities", qstar_count));
    components.insert("world_state".to_string(), format!("{} nodes", world_state_count));
    components.insert("performance".to_string(), "OPTIMIZED".to_string());
    
    Json(HealthResponse {
        status: "OK".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        components,
    })
}

/// Q* search endpoint
async fn qstar_search(
    State(state): State<AppState>,
    Json(request): Json<SearchRequest>,
) -> Result<Json<Vec<qstar::SearchResult>>, StatusCode> {
    let center = match Position6D::new(
        request.center_x,
        request.center_y,
        request.center_z,
        request.center_t,
        request.center_c,
        request.center_psi,
    ) {
        Ok(pos) => pos,
        Err(e) => {
            error!("Invalid 6D position: {}", e);
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    let query = qstar::SearchQuery {
        query_text: request.query,
        center,
        radius: request.radius,
        max_results: request.max_results.unwrap_or(10),
        entity_types: request.entity_types,
    };
    
    let engine = state.qstar_engine.read().await;
    match engine.search(&query) {
        Ok(results) => {
            info!("Q* search completed: {} results", results.len());
            Ok(Json(results))
        }
        Err(e) => {
            error!("Q* search failed: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Create world state node
async fn create_node(
    State(state): State<AppState>,
    Json(request): Json<CreateNodeRequest>,
) -> Result<Json<String>, StatusCode> {
    let position = match Position6D::new(
        request.position.x,
        request.position.y,
        request.position.z,
        request.position.t,
        request.position.c,
        request.position.psi,
    ) {
        Ok(pos) => pos,
        Err(e) => {
            error!("Invalid 6D position: {}", e);
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    let node_type = match request.node_type.as_str() {
        "entity" => world_state::NodeType::Entity,
        "location" => world_state::NodeType::Location,
        "object" => world_state::NodeType::Object,
        "event" => world_state::NodeType::Event,
        "abstract" => world_state::NodeType::Abstract,
        _ => {
            error!("Invalid node type: {}", request.node_type);
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    let node = world_state::StateNode {
        id: request.id.clone(),
        position,
        node_type,
        properties: request.properties,
        connections: std::collections::HashSet::new(),
        last_updated: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_millis() as u64,
        identity_id: None,
        timeline_id: None,
    };
    
    match state.world_state.update_node(node) {
        Ok(()) => {
            info!("Created world state node: {}", request.id);
            Ok(Json(request.id))
        }
        Err(e) => {
            error!("Failed to create node: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Get world state node by ID
async fn get_node(
    State(state): State<AppState>,
    axum::extract::Path(id): axum::extract::Path<String>,
) -> Result<Json<world_state::StateNode>, StatusCode> {
    match state.world_state.get_node(&id) {
        Some(node) => Ok(Json(node)),
        None => Err(StatusCode::NOT_FOUND),
    }
}

/// Update node position
async fn update_position(
    State(state): State<AppState>,
    axum::extract::Path(id): axum::extract::Path<String>,
    Json(position_dto): Json<Position6DDto>,
) -> Result<Json<String>, StatusCode> {
    let position = match Position6D::new(
        position_dto.x,
        position_dto.y,
        position_dto.z,
        position_dto.t,
        position_dto.c,
        position_dto.psi,
    ) {
        Ok(pos) => pos,
        Err(e) => {
            error!("Invalid 6D position: {}", e);
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    match state.world_state.update_position(&id, position) {
        Ok(()) => {
            info!("Updated position for node: {}", id);
            Ok(Json("OK".to_string()))
        }
        Err(e) => {
            error!("Failed to update position: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Get nodes within radius
async fn get_nodes_in_radius(
    State(state): State<AppState>,
    Query(params): Query<HashMap<String, String>>,
) -> Result<Json<Vec<world_state::StateNode>>, StatusCode> {
    let center = match (
        params.get("x").and_then(|s| s.parse::<f64>().ok()),
        params.get("y").and_then(|s| s.parse::<f64>().ok()),
        params.get("z").and_then(|s| s.parse::<f64>().ok()),
        params.get("t").and_then(|s| s.parse::<f64>().ok()),
        params.get("c").and_then(|s| s.parse::<f64>().ok()),
        params.get("psi").and_then(|s| s.parse::<f64>().ok()),
    ) {
        (Some(x), Some(y), Some(z), Some(t), Some(c), Some(psi)) => {
            match Position6D::new(x, y, z, t, c, psi) {
                Ok(pos) => pos,
                Err(e) => {
                    error!("Invalid 6D position: {}", e);
                    return Err(StatusCode::BAD_REQUEST);
                }
            }
        }
        _ => {
            error!("Missing or invalid position parameters");
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    let radius = match params.get("radius").and_then(|s| s.parse::<f64>().ok()) {
        Some(r) => r,
        None => {
            error!("Missing or invalid radius parameter");
            return Err(StatusCode::BAD_REQUEST);
        }
    };
    
    match state.world_state.get_nodes_in_radius(&center, radius) {
        Ok(nodes) => {
            info!("Found {} nodes in radius {}", nodes.len(), radius);
            Ok(Json(nodes))
        }
        Err(e) => {
            error!("Failed to get nodes in radius: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Resolve causality collisions inside an area or among explicit nodes
async fn causality_resolve(
    State(state): State<AppState>,
    Json(req): Json<ResolveRequest>,
) -> Result<Json<ResolveOutcome>, StatusCode> {
    // Collect candidates
    let mut ids: Vec<String> = req.node_ids.unwrap_or_default();
    if ids.is_empty() {
        if let (Some(center_dto), Some(radius)) = (req.center.clone(), req.radius) {
            let center = Position6D::new(
                center_dto.x, center_dto.y, center_dto.z,
                center_dto.t, center_dto.c, center_dto.psi,
            ).map_err(|_| StatusCode::BAD_REQUEST)?;
            let nodes = state.world_state.get_nodes_in_radius(&center, radius).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
            ids = nodes.into_iter().map(|n| n.id).collect();
        }
    }

    // Filter by identity groups if desired: for MVP we just take all
    let mode = req.mode.unwrap_or(ResolutionMode::QUANTUM);

    if ids.len() <= 1 {
        // Nothing to resolve
        return Ok(Json(ResolveOutcome { mode, involved: ids, winner: None, started_match_id: None }));
    }

    match mode {
        ResolutionMode::QUANTUM => {
            // Simple probabilistic winner based on causal stability C and identity Ψ
            let nodes: Vec<_> = ids.iter().filter_map(|id| state.world_state.get_node(id)).collect();
            if nodes.is_empty() {
                return Ok(Json(ResolveOutcome { mode, involved: ids, winner: None, started_match_id: None }));
            }
            let mut weights: Vec<f64> = nodes.iter().map(|n| (n.position.c.max(0.0) + n.position.psi.max(0.0)) / 2.0 ).collect();
            // Normalize or fallback
            let sum: f64 = weights.iter().sum();
            if sum <= 0.0 { for w in &mut weights { *w = 1.0; } }

            // Deterministic RNG with seed for reproducibility if provided
            let seed = req.seed.unwrap_or(0);
            let mut rng = if seed == 0 { rand::rngs::StdRng::from_entropy() } else { rand::rngs::StdRng::seed_from_u64(seed) };
            let dist = rand::distributions::WeightedIndex::new(&weights).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
            let winner_idx = dist.sample(&mut rng);
            let winner = nodes[winner_idx].id.clone();

            // Collapse: mark observed and keep winner flagged
            let _ = state.world_state.mark_observed(&ids, "causality_resolution");
            if let Some(mut win_node) = state.world_state.get_node(&winner) {
                let mut props = win_node.properties.clone();
                props.insert("resolution_winner".to_string(), serde_json::json!(true));
                win_node.properties = props;
                let _ = state.world_state.update_node(win_node);
            }
            // Idempotent XP award
            let key = format!("resolve:{}:{}", winner, now_ms()/1000);
            let mut seen = state.processed_resolve.write().await;
            if !seen.contains(&key) {
                seen.insert(key);
                drop(seen);
                award_hero_xp(&state, &winner, 40).await;
            }
            Ok(Json(ResolveOutcome { mode, involved: ids, winner: Some(winner), started_match_id: None }))
        }
        ResolutionMode::TCG => {
            // Start a match with involved entities
            let match_id = uuid::Uuid::new_v4().to_string();
            let mut score = HashMap::new();
            for (i, _id) in ids.iter().enumerate() {
                score.insert(format!("P{}", i+1), 0.0);
            }
            let st = MatchState { tick: 0, entities: ids.iter().map(|id| serde_json::json!({"id": id})).collect(), score };
            state.matches.write().await.insert(match_id.clone(), st);

            // Mark area observed (collapse) upon entering combat
            let _ = state.world_state.mark_observed(&ids, "tcg_match_started");
            Ok(Json(ResolveOutcome { mode, involved: ids, winner: None, started_match_id: Some(match_id) }))
        }
    }
}

#[derive(Deserialize)]
struct CollapseRequest {
    node_ids: Option<Vec<String>>,
    center: Option<Position6DDto>,
    radius: Option<f64>,
    description: Option<String>,
    playerId: Option<String>,
}

/// Trigger an observation collapse on selected nodes (by ids or by radius around a 6D center)
async fn observation_collapse(
    State(state): State<AppState>,
    Json(request): Json<CollapseRequest>,
) -> Result<Json<serde_json::Value>, StatusCode> {
    let mut ids: Vec<String> = request.node_ids.unwrap_or_default();

    if ids.is_empty() {
        if let (Some(center_dto), Some(radius)) = (request.center, request.radius) {
            let center = Position6D::new(
                center_dto.x, center_dto.y, center_dto.z,
                center_dto.t, center_dto.c, center_dto.psi,
            ).map_err(|_| StatusCode::BAD_REQUEST)?;
            match state.world_state.get_nodes_in_radius(&center, radius) {
                Ok(nodes) => {
                    ids = nodes.into_iter().map(|n| n.id).collect();
                }
                Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR),
            }
        }
    }

    if ids.is_empty() {
        return Ok(Json(serde_json::json!({"updated": 0, "ok": true})));
    }

    let count = state
        .world_state
        .mark_observed(&ids, &request.description.unwrap_or_else(|| "observation".to_string()))
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    // Idempotent XP small award
    let key = format!("collapse:{}:{}", ids.join("+"), now_ms()/1000);
    let mut seen = state.processed_collapse.write().await;
    if !seen.contains(&key) {
        seen.insert(key);
        drop(seen);
        let hero = request.playerId.unwrap_or_else(|| "hero:anonymous".into());
        let xp = std::cmp::min(count as u32, 5);
        if xp > 0 { award_hero_xp(&state, &hero, xp).await; }
    }
    Ok(Json(serde_json::json!({"updated": count, "ok": true})))
}

/// Test all formulas endpoint (Tucker style)
async fn test_all_formulas(
    State(state): State<AppState>,
) -> Result<Json<Vec<java_connector::IntegratedFormulaResult>>, StatusCode> {
    info!("🧪 Starting comprehensive formula testing");
    
    // Common formulas to test
    let formulas = vec![
        "TELEPORT_HERO",
        "HEAL_HERO", 
        "FIREBALL",
        "CREATE_SHIELD",
        "LIGHTNING_BOLT",
        "TRIPLE_VOIX_QUANTIQUE",
        "ECHO_TEMPOREL",
        "MEMOIRE_FRACTALE",
    ];
    
    match state.java_connector.test_all_formulas(formulas).await {
        Ok(results) => {
            info!("✅ Formula testing completed: {} results", results.len());
            Ok(Json(results))
        }
        Err(e) => {
            error!("❌ Formula testing failed: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Integrated formula cast endpoint
async fn integrated_formula_cast(
    State(state): State<AppState>,
    Json(request): Json<IntegratedCastRequest>,
) -> Result<Json<java_connector::IntegratedFormulaResult>, StatusCode> {
    info!("⚡ Integrated formula cast: {}", request.formula);
    
    let qstar_engine = state.qstar_engine.read().await;
    
    match state.java_connector.integrated_formula_execution(
        &*qstar_engine,
        &request.formula,
        &request.formula_type.unwrap_or_else(|| "SIMPLE".to_string()),
        &request.caster_id.unwrap_or_else(|| "rust-user".to_string()),
    ).await {
        Ok(result) => {
            info!("✅ Integrated cast completed in {}ms", result.total_time_ms);
            Ok(Json(result))
        }
        Err(e) => {
            error!("❌ Integrated cast failed: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

/// Minimal OpenAPI descriptor for Rust endpoints (for compare-apis)
async fn openapi_handler() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "openapi":"3.0.0",
        "info": {"title":"Magic Stack Rust","version": env!("CARGO_PKG_VERSION")},
        "paths": {
            "/agents/plan": {"post": {"summary":"A* weighted planning"}},
            "/agents/fork": {"post": {"summary":"Fork identity"}},
            "/agents/merge": {"post": {"summary":"Merge identity"}},
            "/agents/control": {"post": {"summary":"Set controller (player/ai)"}},
            "/agents/cast": {"post": {"summary":"Cast formula via Java"}},
            "/api/world-state/collapse": {"post": {"summary":"Observation collapse"}},
            "/api/causality/resolve": {"post": {"summary":"Resolve causality (QUANTUM/TCG)"}},
            "/api/map/generate": {"post": {"summary":"Generate contiguous biome map"}},
            "/api/map/init": {"post": {"summary":"Initialize 6D entities from map"}}
        }
    }))
}

/// Aggregate OpenAPI: Rust + Java
async fn openapi_all_handler(State(state): State<AppState>) -> Json<serde_json::Value> {
    let rust = openapi_handler().await.0;
    let java = match state.java_connector.get_openapi_spec().await {
        Ok(spec) => spec,
        Err(e) => serde_json::json!({"error":"java_openapi_unavailable","message":format!("{}", e)}),
    };
    Json(serde_json::json!({
        "rust": rust,
        "java": java
    }))
}

/// Simple HTML page embedding Redoc that loads the aggregated OpenAPI
async fn openapi_ui_handler() -> Html<String> {
    let html = r#"<!doctype html>
<html>
  <head>
    <meta charset=\"utf-8\" />
    <title>Magic Stack API Docs</title>
    <script src=\"https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js\"></script>
    <style>body,html{margin:0;padding:0;height:100%}#container{height:100%}</style>
  </head>
  <body>
    <div id=\"container\"></div>
    <script>
      // Load aggregated spec from Rust
      fetch('/openapi/all').then(r=>r.json()).then(all=>{
        // Prefer Java spec if available, otherwise use Rust
        const spec = all.java && all.java.openapi ? all.java : all.rust;
        Redoc.init(spec, {}, document.getElementById('container'));
      }).catch(err=>{
        document.getElementById('container').innerText = 'Failed to load OpenAPI: '+err;
      });
    </script>
  </body>
</html>"#;
    Html(html.to_string())
}

/// API Explorer - Interface unifiée pour tester toutes les APIs
async fn api_explorer_handler() -> Html<String> {
    let html = include_str!("../explorer.html");
    Html(html.to_string())
}

// ===== Temporal grammar endpoints =====
#[derive(Deserialize)]
struct TemporalParseReq { formula: String }

#[derive(Serialize)]
struct TemporalParseResp { ok: bool, ast: serde_json::Value, normalized: String }

async fn temporal_parse(Json(req): Json<TemporalParseReq>) -> Result<Json<TemporalParseResp>, StatusCode> {
    let mut parser = TemporalParser::new();
    match parser.parse(&req.formula) {
        Ok(tf) => {
            let ast = serde_json::to_value(&tf.ast).unwrap_or(serde_json::json!({"error":"serialize_ast"}));
            Ok(Json(TemporalParseResp { ok: true, ast, normalized: tf.source }))
        }
        Err(e) => {
            eprintln!("temporal_parse error: {}", e);
            Err(StatusCode::BAD_REQUEST)
        }
    }
}

#[derive(Deserialize)]
struct TemporalExecuteReq { formula: String, context: Option<serde_json::Value>, seed: Option<u64> }

#[derive(Serialize)]
struct TemporalExecuteResp { ok: bool, result: serde_json::Value, trace_hash: String }

async fn temporal_execute(Json(req): Json<TemporalExecuteReq>) -> Result<Json<TemporalExecuteResp>, StatusCode> {
    let mut parser = TemporalParser::new();
    let tf = parser.parse(&req.formula).map_err(|_| StatusCode::BAD_REQUEST)?;
    let ctx_json = req.context.unwrap_or_else(|| serde_json::json!({}));
    let mut vars = std::collections::HashMap::new();
    if let Some(map) = ctx_json.as_object() {
        for (k, v) in map.iter() { vars.insert(k.clone(), v.clone()); }
    }
    let ctx = TgExecutionContext { variables: vars, temporal_position: 0.0, causal_probability: 1.0, identity_coherence: 0.8 };
    let result = parser.execute(&tf, &ctx).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    // Stable trace hash: hash of normalized source + seed (if any) + result JSON canonical
    let mut hasher = Sha256::new();
    hasher.update(tf.source.as_bytes());
    if let Some(s) = req.seed { hasher.update(&s.to_le_bytes()); }
    hasher.update(serde_json::to_vec(&result).unwrap_or_default());
    let trace_hash = format!("{:x}", hasher.finalize());
    Ok(Json(TemporalExecuteResp { ok: true, result, trace_hash }))
}

// ===== Vector Archives Proxy =====
#[derive(Deserialize)]
struct ArchiveSearchReq { query: String, top_k: Option<usize>, mode: Option<String>, filters: Option<HashMap<String, String>> }

async fn archives_status(State(_state): State<AppState>) -> Result<Json<serde_json::Value>, StatusCode> {
    // Utiliser directement le bridge Python local
    use tokio::process::Command;
    
    let output = Command::new("python3")
        .arg("vector_bridge.py")
        .arg("status")
        .current_dir("backends/rust")
        .output()
        .await;
        
    match output {
        Ok(out) => {
            if out.status.success() {
                let json_str = String::from_utf8_lossy(&out.stdout);
                match serde_json::from_str(&json_str) {
                    Ok(json) => Ok(Json(json)),
                    Err(_) => {
                        eprintln!("VectorDB status parse error: {}", json_str);
                        Err(StatusCode::INTERNAL_SERVER_ERROR)
                    }
                }
            } else {
                eprintln!("VectorDB status error: {}", String::from_utf8_lossy(&out.stderr));
                Err(StatusCode::SERVICE_UNAVAILABLE)
            }
        }
        Err(e) => {
            eprintln!("VectorDB bridge error: {}", e);
            Err(StatusCode::SERVICE_UNAVAILABLE)
        }
    }
}

#[derive(Deserialize)]
struct ArchiveBuildReq { mode: Option<String> }

async fn archives_build(State(_state): State<AppState>, maybe: Option<Json<ArchiveBuildReq>>) -> Result<Json<serde_json::Value>, StatusCode> {
    // Utiliser directement le bridge Python local
    use tokio::process::Command;
    
    let mode = maybe.and_then(|j| j.0.mode).unwrap_or_else(|| "story".to_string());
    
    let output = Command::new("python3")
        .arg("vector_bridge.py")
        .arg("build")
        .arg(&mode)
        .current_dir("backends/rust")
        .output()
        .await;
        
    match output {
        Ok(out) => {
            if out.status.success() {
                let json_str = String::from_utf8_lossy(&out.stdout);
                match serde_json::from_str(&json_str) {
                    Ok(json) => Ok(Json(json)),
                    Err(_) => {
                        eprintln!("VectorDB build parse error: {}", json_str);
                        Err(StatusCode::INTERNAL_SERVER_ERROR)
                    }
                }
            } else {
                eprintln!("VectorDB build error: {}", String::from_utf8_lossy(&out.stderr));
                Err(StatusCode::SERVICE_UNAVAILABLE)
            }
        }
        Err(e) => {
            eprintln!("VectorDB bridge error: {}", e);
            Err(StatusCode::SERVICE_UNAVAILABLE)
        }
    }
}

async fn archives_search(State(_state): State<AppState>, Json(req): Json<ArchiveSearchReq>) -> Result<Json<serde_json::Value>, StatusCode> {
    // Utiliser directement le bridge Python local
    use tokio::process::Command;
    use tokio::io::AsyncWriteExt;
    
    let mode = req.mode.unwrap_or_else(|| "story".to_string());
    let top_k = req.top_k.unwrap_or(10);
    
    let mut cmd = Command::new("python3")
        .arg("vector_bridge.py")
        .arg("search")
        .arg(&req.query)
        .arg(&mode)
        .arg(top_k.to_string())
        .current_dir("backends/rust")
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .map_err(|e| {
            eprintln!("Failed to spawn VectorDB bridge: {}", e);
            StatusCode::SERVICE_UNAVAILABLE
        })?;
        
    // Envoyer les filtres via stdin si présents
    if let Some(filters) = req.filters {
        if !filters.is_empty() {
            if let Some(mut stdin) = cmd.stdin.take() {
                let filters_json = serde_json::to_string(&filters).unwrap_or_default();
                let _ = stdin.write_all(filters_json.as_bytes()).await;
            }
        }
    }
    
    let output = cmd.wait_with_output().await.map_err(|e| {
        eprintln!("VectorDB bridge error: {}", e);
        StatusCode::SERVICE_UNAVAILABLE
    })?;
    
    if output.status.success() {
        let json_str = String::from_utf8_lossy(&output.stdout);
        match serde_json::from_str(&json_str) {
            Ok(json) => Ok(Json(json)),
            Err(_) => {
                eprintln!("VectorDB search parse error: {}", json_str);
                Err(StatusCode::INTERNAL_SERVER_ERROR)
            }
        }
    } else {
        eprintln!("VectorDB search error: {}", String::from_utf8_lossy(&output.stderr));
        Err(StatusCode::SERVICE_UNAVAILABLE)
    }
}
// ==== Map generation endpoints ====
#[derive(Deserialize)]
struct MapGenerateRequest { width: Option<usize>, height: Option<usize>, seed: Option<u64>, sea_ratio: Option<f64>, mountain_ratio: Option<f64>, forest_ratio: Option<f64> }

#[derive(Deserialize, Serialize, Clone)]
struct MapGenerateResponse { obstacles: Vec<Vec<u8>>, terrain: Vec<Vec<f64>>, causal_c: Vec<Vec<f64>>, biomes: Vec<Vec<String>> }

async fn map_generate(Json(req): Json<MapGenerateRequest>) -> Json<MapGenerateResponse> {
    let mut params = MapGenParams::default();
    if let Some(w) = req.width { params.width = w; }
    if let Some(h) = req.height { params.height = h; }
    if let Some(s) = req.seed { params.seed = s; }
    if let Some(r) = req.sea_ratio { params.sea_ratio = r; }
    if let Some(r) = req.mountain_ratio { params.mountain_ratio = r; }
    if let Some(r) = req.forest_ratio { params.forest_ratio = r; }
    let g = generate_map(&params);
    let biomes = g.biomes.into_iter().map(|row| row.into_iter().map(|b| match b { magic_stack_core::mapgen::Biome::Sea=>"sea".into(), magic_stack_core::mapgen::Biome::Mountain=>"mountain".into(), magic_stack_core::mapgen::Biome::Forest=>"forest".into(), magic_stack_core::mapgen::Biome::Plain=>"plain".into() }).collect()).collect();
    Json(MapGenerateResponse { obstacles: g.obstacles, terrain: g.terrain, causal_c: g.causal_c, biomes })
}

#[derive(Deserialize)]
struct MapInitRequest { map: MapGenerateResponse, time_windows: Option<Vec<serde_json::Value>> }

#[derive(Serialize)]
struct MapInitResponse { created: usize, total: usize }

/// Initialize some treasures/creatures in 6D with simple time windows
async fn map_init(State(state): State<AppState>, Json(_req): Json<MapInitRequest>) -> Json<MapInitResponse> {
    // Simple implementation: place a few treasures/creatures with temporal windows
    // using map biomes as hints.
    let mut created = 0usize;
    let mut to_create: Vec<world_state::StateNode> = Vec::new();

    // Heuristics: one entity per 24 cells approximately
    let h = _req.map.biomes.len();
    let w = if h>0 { _req.map.biomes[0].len() } else { 0 };
    if h>0 && w>0 {
        let step_y = (h.max(1) / 6).max(1);
        let step_x = (w.max(1) / 8).max(1);
        for y in (0..h).step_by(step_y) {
            for x in (0..w).step_by(step_x) {
                let biome = _req.map.biomes[y][x].clone();
                let id = format!("ent_{}_{}_{}", biome, x, y);
                let t = 0.0;
                let c = _req.map.causal_c.get(y).and_then(|r| r.get(x)).copied().unwrap_or(1.0);
                let psi = 0.5;
                if let Ok(pos) = Position6D::new(x as f64, y as f64, 0.0, t, c, psi) {
                    let mut props = HashMap::new();
                    props.insert("biome".to_string(), serde_json::json!(biome));
                    props.insert("windows".to_string(), serde_json::json!([{"start": 2, "end": 8, "period": 12}]));
                    let node = world_state::StateNode {
                        id,
                        position: pos,
                        node_type: world_state::NodeType::Entity,
                        properties: props,
                        connections: std::collections::HashSet::new(),
                        last_updated: now_ms(),
                        identity_id: None,
                        timeline_id: Some("principale".to_string()),
                    };
                    to_create.push(node);
                }

                // Also create a gathering spot with stable ID and schema
                let spot_id = format!("spot_{}_{}", x, y);
                if let Ok(pos2) = Position6D::new(x as f64, y as f64, 0.0, 0.0, c, 0.0) {
                    let kind = match biome.as_str() { "forest" => "herb", "mountain" => "mineral", "sea" => "essence", _ => "herb" };
                    let mut props2 = HashMap::new();
                    props2.insert("kind".to_string(), serde_json::json!(kind));
                    props2.insert("pos".to_string(), serde_json::json!({"x":x,"y":y,"z":0,"t":0,"c":c,"psi":0}));
                    props2.insert("windows".to_string(), serde_json::json!([{"start":1,"end":23,"period":24}]));
                    props2.insert("yield".to_string(), serde_json::json!({"min":1,"max":3}));
                    props2.insert("depleted".to_string(), serde_json::json!(false));
                    let node2 = world_state::StateNode {
                        id: spot_id,
                        position: pos2,
                        node_type: world_state::NodeType::Object,
                        properties: props2,
                        connections: std::collections::HashSet::new(),
                        last_updated: now_ms(),
                        identity_id: None,
                        timeline_id: Some("principale".to_string()),
                    };
                    to_create.push(node2);
                }
            }
        }
    }

    let mut total = state.world_state.node_count();
    if !to_create.is_empty() {
        let created_now = to_create.len();
        let _ = state.world_state.batch_update(to_create).ok();
        created = created_now;
        total = state.world_state.node_count();
    }

    Json(MapInitResponse { created, total })
}

/// Request for integrated formula casting
#[derive(Deserialize)]
struct IntegratedCastRequest {
    formula: String,
    formula_type: Option<String>,
    caster_id: Option<String>,
}

// ===== Economy / Craft / Runes =====
#[derive(Clone, Serialize, Deserialize)]
struct InventoryItem { id: String, kind: String, qty: u32, #[serde(skip_serializing_if="Option::is_none")] quality: Option<f64>, #[serde(skip_serializing_if="Option::is_none")] purity: Option<f64>, #[serde(skip_serializing_if="Option::is_none")] stability: Option<f64>, #[serde(skip_serializing_if="Option::is_none")] affinity: Option<String> }

#[derive(Deserialize)]
struct CollectRequest { spotId: String, #[serde(default)] playerId: Option<String> }

async fn get_inventory(State(state): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Json<serde_json::Value> {
    let player_id = q.get("playerId").cloned().unwrap_or_else(|| "anonymous".to_string());
    let inv = state.inventories.read().await;
    let items = inv.get(&player_id).cloned().unwrap_or_default();
    Json(serde_json::json!({"items": items}))
}

async fn economy_collect(State(state): State<AppState>, Json(req): Json<CollectRequest>) -> Json<serde_json::Value> {
    let player_id = req.playerId.unwrap_or_else(|| "anonymous".to_string());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player_id.clone()).or_default();
    // Infer resource kind from spot node if exists
    let mut kind = "herb".to_string();
    if let Some(node) = state.world_state.get_node(&req.spotId) {
        if let Some(v) = node.properties.get("kind").and_then(|v| v.as_str()) {
            kind = v.to_string();
        }
    }
    let item = InventoryItem { id: format!("{}_{}", kind, now_ms()), kind: kind.clone(), qty: 1, quality: Some(0.6), purity: Some(0.5), stability: Some(0.7), affinity: Some("nature".into()) };
    entry.push(item.clone());
    Json(serde_json::json!({"added": [item], "inventory": entry}))
}

#[derive(Deserialize)]
struct ArcadeResultReq { gameId: String, success: bool, rewards: Option<Vec<HashMap<String, serde_json::Value>>>, #[serde(default)] playerId: Option<String> }

async fn economy_arcade_result(State(state): State<AppState>, Json(req): Json<ArcadeResultReq>) -> Json<serde_json::Value> {
    let player_id = req.playerId.unwrap_or_else(|| "anonymous".to_string());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player_id.clone()).or_default();
    if req.success {
        if let Some(rews) = req.rewards {
            for r in rews {
                let kind = r.get("kind").and_then(|v| v.as_str()).unwrap_or("token");
                let qty = r.get("qty").and_then(|v| v.as_u64()).unwrap_or(1) as u32;
                entry.push(InventoryItem { id: format!("{}_{}", kind, now_ms()), kind: kind.to_string(), qty, quality: None, purity: None, stability: None, affinity: None });
            }
        }
    }
    Json(serde_json::json!({"ok": true, "inventory": entry}))
}

#[derive(Deserialize)]
struct CraftReq { recipeId: String, ingredients: Option<Vec<HashMap<String, serde_json::Value>>>, #[serde(default)] playerId: Option<String> }

async fn craft_potion(State(state): State<AppState>, Json(req): Json<CraftReq>) -> Json<serde_json::Value> {
    let player_id = req.playerId.unwrap_or_else(|| "anonymous".to_string());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player_id.clone()).or_default();
    // MVP: ne consomme pas réellement, ajoute la potion
    let crafted = InventoryItem { id: format!("potion_{}_{}", req.recipeId, now_ms()), kind: "potion".into(), qty: 1, quality: Some(0.8), purity: Some(0.7), stability: Some(0.9), affinity: Some("healing".into()) };
    entry.push(crafted.clone());
    Json(serde_json::json!({"item": crafted, "inventory": entry}))
}

async fn craft_crystal(State(state): State<AppState>, Json(req): Json<CraftReq>) -> Json<serde_json::Value> {
    let player_id = req.playerId.unwrap_or_else(|| "anonymous".to_string());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player_id.clone()).or_default();
    let crafted = InventoryItem { id: format!("crystal_{}_{}", req.recipeId, now_ms()), kind: "crystal".into(), qty: 1, quality: Some(0.85), purity: Some(0.9), stability: Some(0.95), affinity: Some("earth".into()) };
    entry.push(crafted.clone());
    Json(serde_json::json!({"item": crafted, "inventory": entry}))
}

async fn craft_artifact(State(state): State<AppState>, Json(req): Json<CraftReq>) -> Json<serde_json::Value> {
    let player_id = req.playerId.unwrap_or_else(|| "anonymous".to_string());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player_id.clone()).or_default();
    let crafted = InventoryItem { id: format!("artifact_{}_{}", req.recipeId, now_ms()), kind: "artifact".into(), qty: 1, quality: Some(0.92), purity: Some(0.92), stability: Some(0.92), affinity: Some("legend".into()) };
    entry.push(crafted.clone());
    Json(serde_json::json!({"item": crafted, "inventory": entry}))
}

#[derive(Deserialize)]
struct LearnRunesReq { miniGameResult: Option<HashMap<String, serde_json::Value>>, #[serde(default)] playerId: Option<String> }

async fn mage_learn_runes(Json(req): Json<LearnRunesReq>) -> Json<serde_json::Value> {
    let score = req.miniGameResult.as_ref().and_then(|m| m.get("score")).and_then(|v| v.as_f64()).unwrap_or(0.0);
    let unlocked = if score >= 80.0 { vec!["SIGMA", "TAU", "OMEGA"] } else if score >= 50.0 { vec!["SIGMA"] } else { vec![] };
    Json(serde_json::json!({"unlocked": unlocked}))
}

// ===== Minigames =====
#[derive(Clone, Serialize, Deserialize)]
struct MinigameCatalogItem { id: String, title: String, url: String, rewards: Vec<HashMap<String, serde_json::Value>> }

#[derive(Clone, Serialize, Deserialize)]
struct MinigameSession {
    id: String,
    player_id: String,
    r#type: String,
    url: String,
    objective: String,
    started_at: u64,
    expires_at: u64,
    status: String, // PENDING|RUNNING|DONE
}

fn minigames_catalog_items() -> Vec<MinigameCatalogItem> { vec![
    MinigameCatalogItem{ id:"SAVE_JORDI".into(), title:"Sauver Jordi".into(), url:"/REALGAME/arcade/save_jordi.html".into(), rewards: vec![json_obj_to_hashmap(serde_json::json!({"kind":"xp","qty":50}))]},
    MinigameCatalogItem{ id:"BROKEN_WATCH".into(), title:"Montre brisée".into(), url:"/REALGAME/arcade/broken_watch.html".into(), rewards: vec![json_obj_to_hashmap(serde_json::json!({"kind":"essence","qty":2}))]},
    MinigameCatalogItem{ id:"CAUSAL_PATCH".into(), title:"Patch causal".into(), url:"/REALGAME/arcade/causal_patch.html".into(), rewards: vec![json_obj_to_hashmap(serde_json::json!({"kind":"token","qty":1}))]},
]}

async fn minigames_catalog() -> Json<Vec<MinigameCatalogItem>> { Json(minigames_catalog_items()) }

#[derive(Deserialize)]
struct MinigameStartReq { playerId: Option<String>, r#type: Option<String>, context: Option<HashMap<String, serde_json::Value>> }

async fn minigame_start(State(state): State<AppState>, Json(req): Json<MinigameStartReq>) -> Json<serde_json::Value> {
    let player = req.playerId.unwrap_or_else(|| "anonymous".into());
    let typ = req.r#type.unwrap_or_else(|| "SAVE_JORDI".into());
    let cat = minigames_catalog_items();
    let chosen = cat.into_iter().find(|c| c.id==typ).unwrap_or(MinigameCatalogItem{ id:"SAVE_JORDI".into(), title:"Sauver Jordi".into(), url:"/REALGAME/arcade/save_jordi.html".into(), rewards: vec![]});
    let now = now_ms();
    let sid = uuid::Uuid::new_v4().to_string();
    let session = MinigameSession { id: sid.clone(), player_id: player.clone(), r#type: chosen.id.clone(), url: chosen.url.clone(), objective: format!("{}: accomplir l'objectif avant la limite", chosen.title), started_at: now, expires_at: now + 120_000, status: "RUNNING".into() };
    state.minigame_sessions.write().await.insert(sid.clone(), session.clone());
    Json(serde_json::json!({ "sessionId": sid, "type": session.r#type, "url": session.url, "objective": session.objective, "deadlineMs": session.expires_at, "rewardsPreview": chosen.rewards }))
}

async fn minigame_get(State(state): State<AppState>, AxPath(id): AxPath<String>) -> Result<Json<MinigameSession>, StatusCode> {
    match state.minigame_sessions.read().await.get(&id).cloned() { Some(s)=> Ok(Json(s)), None => Err(StatusCode::NOT_FOUND) }
}

#[derive(Deserialize)]
struct MinigameResultReq { success: bool, score: Option<f64>, rewards: Option<Vec<HashMap<String, serde_json::Value>>>, playerId: Option<String> }

async fn minigame_result(State(state): State<AppState>, AxPath(id): AxPath<String>, Json(req): Json<MinigameResultReq>) -> Result<Json<serde_json::Value>, StatusCode> {
    let mut sessions = state.minigame_sessions.write().await;
    let sess = match sessions.get_mut(&id) { Some(s)=> s, None=> return Err(StatusCode::NOT_FOUND) };
    sess.status = "DONE".into();
    // Grant rewards via inventory
    let player = req.playerId.clone().unwrap_or_else(|| sess.player_id.clone());
    let mut inv = state.inventories.write().await;
    let entry = inv.entry(player.clone()).or_default();
    let mut granted: Vec<InventoryItem> = Vec::new();
    if req.success {
        if let Some(rews) = req.rewards {
            for r in rews {
                let kind = r.get("kind").and_then(|v| v.as_str()).unwrap_or("token");
                let qty = r.get("qty").and_then(|v| v.as_u64()).unwrap_or(1) as u32;
                let it = InventoryItem { id: format!("{}_{}", kind, now_ms()), kind: kind.to_string(), qty, quality: None, purity: None, stability: None, affinity: None };
                entry.push(it.clone());
                granted.push(it);
            }
        }
        // Award XP: map score to [5..50]
        let score = req.score.unwrap_or(0.0).max(0.0).min(1000.0);
        let xp = (5.0 + (score/1000.0)*45.0).round() as u32;
        award_hero_xp(&state, &player, xp).await;
    }
    Ok(Json(serde_json::json!({"ok": true, "grantedRewards": granted, "inventory": entry})))
}

#[derive(Deserialize)]
struct AutoTriggerReq { playerId: Option<String>, metrics: Option<HashMap<String, serde_json::Value>> }

async fn minigame_auto_trigger(State(state): State<AppState>, Json(req): Json<AutoTriggerReq>) -> Json<serde_json::Value> {
    let metrics = req.metrics.unwrap_or_default();
    let tv = metrics.get("timeVelocity").and_then(|v| v.as_f64()).unwrap_or(0.0);
    let debt = metrics.get("causalDebt").and_then(|v| v.as_f64()).unwrap_or(0.0);
    let triggered = tv < -0.8 || debt > 0.3;
    if triggered {
        // start default minigame
        let player = req.playerId.clone();
        let start_req = MinigameStartReq { playerId: player, r#type: None, context: None };
        let resp = minigame_start(State(state.clone()), Json(start_req)).await;
        Json(serde_json::json!({"triggered": true, "session": resp.0}))
    } else {
        Json(serde_json::json!({"triggered": false}))
    }
}

fn json_obj_to_hashmap(v: serde_json::Value) -> HashMap<String, serde_json::Value> {
    match v {
        serde_json::Value::Object(map) => map.into_iter().collect(),
        _ => HashMap::new(),
    }
}

// ===== Hero XP/Perks (MVP local) =====
#[derive(Clone, Serialize, Deserialize)]
struct HeroStatus { level: u32, xp: u32, #[serde(rename = "xpNext")] xp_next: u32, perks: Vec<String> }

fn default_hero() -> HeroStatus { HeroStatus { level: 1, xp: 0, xp_next: 100, perks: vec![] } }

fn add_xp_to_hero(hero: &mut HeroStatus, amount: u32) -> bool {
    hero.xp = hero.xp.saturating_add(amount);
    let mut leveled = false;
    while hero.xp >= hero.xp_next {
        hero.xp -= hero.xp_next;
        hero.level += 1;
        hero.xp_next = hero.xp_next + 50; // progression simple
        leveled = true;
    }
    leveled
}

// ===== Orchestrator (MVP) =====
#[derive(Deserialize, Serialize, Clone)]
struct OrcSessionReq { heroId: Option<String>, clientVersion: Option<String> }

#[derive(Serialize, Clone)]
struct OrcSessionResp { sessionId: String, tick: u64, idempotencySalt: String }

#[derive(Deserialize, Serialize, Clone)]
#[serde(tag = "type")] 
enum OrcIntentInner {
    MOVE { heroId: String, to: Position6DDto },
    COLLECT { heroId: String, spotId: String },
    OBSERVE { heroId: String, node_ids: Option<Vec<String>>, center: Option<Position6DDto>, radius: Option<f64> },
    RequestResolve { heroId: Option<String>, mode: Option<String>, center: Option<Position6DDto>, radius: Option<f64> },
}

#[derive(Deserialize, Serialize, Clone)]
struct OrcIntentReq { sessionId: String, intent: OrcIntentInner }

#[derive(Serialize, Clone)]
struct OrcIntentResp { accepted: bool, #[serde(rename = "willApplyAtTick")] will_apply_at_tick: u64, seq: u64 }

async fn orc_session(State(state): State<AppState>, Json(_req): Json<OrcSessionReq>) -> Json<OrcSessionResp> {
    let session_id = format!("sess_{}", Uuid::new_v4());
    {
        let mut s = state.orchestrator_sessions.write().await;
        s.insert(session_id.clone());
    }
    let salt = format!("{}", Uuid::new_v4());
    let tick = { *state.orchestrator_tick.read().await };
    Json(OrcSessionResp { sessionId: session_id, tick, idempotencySalt: salt })
}

async fn orc_intent(State(state): State<AppState>, headers: axum::http::HeaderMap, Json(req): Json<OrcIntentReq>) -> Json<OrcIntentResp> {
    // Idempotency (per-session)
    let idempotency_key = headers.get("Idempotency-Key").and_then(|v| v.to_str().ok()).unwrap_or("").to_string();
    if !idempotency_key.is_empty() {
        let mut map = state.orchestrator_idempotency.write().await;
        let set = map.entry(req.sessionId.clone()).or_insert_with(HashSet::new);
        if set.contains(&idempotency_key) {
            let tick = { *state.orchestrator_tick.read().await } + 1;
            return Json(OrcIntentResp { accepted: true, will_apply_at_tick: tick, seq: 0 });
        }
        set.insert(idempotency_key);
    }

    // Very small scheduler: apply next tick
    let mut apply_tick = state.orchestrator_tick.write().await;
    *apply_tick += 1;
    let will_tick = *apply_tick;
    drop(apply_tick);

    // Proxy intents to existing endpoints (MVP)
    match req.intent {
        OrcIntentInner::COLLECT { heroId: _h, spotId } => {
            let payload = CollectRequest { spotId, playerId: None };
            let _ = economy_collect(State(state.clone()), Json(payload)).await;
        }
        OrcIntentInner::OBSERVE { heroId, node_ids, center, radius } => {
            let payload = CollapseRequest { node_ids, center, radius, description: Some("orchestrator_observe".into()), playerId: Some(heroId) };
            let _ = observation_collapse(State(state.clone()), Json(payload)).await;
        }
        OrcIntentInner::RequestResolve { heroId: _h, mode, center, radius } => {
            let m = match mode.as_deref() { Some("QUANTUM") => Some(ResolutionMode::QUANTUM), Some("TCG") => Some(ResolutionMode::TCG), _ => None };
            let payload = ResolveRequest { node_ids: None, center, radius, mode: m, seed: None };
            let _ = causality_resolve(State(state.clone()), Json(payload)).await;
        }
        OrcIntentInner::MOVE { .. } => {
            // TODO: integrate with world-state movement; placeholder accept
        }
    }

    Json(OrcIntentResp { accepted: true, will_apply_at_tick: will_tick, seq: will_tick })
}

#[derive(Serialize, Clone)]
struct OrcPolicy { #[serde(rename = "tauPsi")] tau_psi: f64, #[serde(rename = "tauLow")] tau_low: f64, #[serde(rename = "tauHigh")] tau_high: f64, #[serde(rename = "tauObs")] tau_obs: u32, #[serde(rename = "pvpEnabled")] pvp_enabled: bool, #[serde(rename = "escapeHorizonTicks")] escape_horizon_ticks: u64 }

async fn orc_policy() -> Json<OrcPolicy> {
    Json(OrcPolicy { tau_psi: 0.65, tau_low: 0.35, tau_high: 0.8, tau_obs: 3, pvp_enabled: true, escape_horizon_ticks: 40 })
}

#[derive(Serialize, Clone)]
struct OrcSnapshot { tick: u64, #[serde(rename = "fullOrDelta")] full_or_delta: String }

async fn orc_snapshot(State(state): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Json<OrcSnapshot> {
    let since = q.get("sinceTick").and_then(|s| s.parse::<u64>().ok()).unwrap_or(0);
    let t = { *state.orchestrator_tick.read().await };
    let kind = if since == 0 { "full" } else { "delta" };
    Json(OrcSnapshot { tick: t, full_or_delta: kind.to_string() })
}
async fn award_hero_xp(state: &AppState, hero_id: &str, amount: u32) {
    let mut heroes = state.heroes.write().await;
    let entry = heroes.entry(hero_id.to_string()).or_insert_with(default_hero);
    let _ = add_xp_to_hero(entry, amount);
}

// ===== TCG AI (MVP stubs) =====
#[derive(Deserialize, Serialize, Clone)]
struct TcgStateCompact {
    game_id: String,
    turn: u32,
    active_player: String,
    mana: u32,
    hand: Vec<HashMap<String, serde_json::Value>>,
    board: HashMap<String, serde_json::Value>,
    flags: Option<HashMap<String, serde_json::Value>>,
    rng_seed: Option<String>,
}

#[derive(Deserialize, Serialize, Clone)]
struct TcgAiPrefs { mode: Option<String>, difficulty: Option<String>, risk: Option<String>, time_budget_ms: Option<u64> }

#[derive(Deserialize, Serialize, Clone)]
struct TcgAiDecideReq { state: TcgStateCompact, ai_prefs: Option<TcgAiPrefs> }

#[derive(Deserialize, Serialize, Clone)]
struct TcgAction { r#type: String, card_id: Option<String>, target: Option<String>, name: Option<String> }

#[derive(Deserialize, Serialize, Clone)]
struct TcgAiDecideResp { actions: Vec<TcgAction>, explain: Option<String> }

async fn tcg_ai_decide(Json(req): Json<TcgAiDecideReq>) -> Json<TcgAiDecideResp> {
    // Stub heuristique: si main non vide, jouer première carte puis END_TURN
    let mut acts: Vec<TcgAction> = Vec::new();
    if let Some(first) = req.state.hand.get(0) {
        let card_id = first.get("id").and_then(|v| v.as_str()).unwrap_or("C_001").to_string();
        acts.push(TcgAction { r#type: "PLAY_CARD".into(), card_id: Some(card_id), target: None, name: None });
    }
    acts.push(TcgAction { r#type: "END_TURN".into(), card_id: None, target: None, name: None });
    Json(TcgAiDecideResp { actions: acts, explain: Some("stub: play first card then end".into()) })
}

#[derive(Deserialize, Serialize, Clone)]
struct TcgAiCoachReq { state: TcgStateCompact, question: Option<String>, ai_prefs: Option<TcgAiPrefs> }

#[derive(Deserialize, Serialize, Clone)]
struct TcgAiCoachResp { lines: Vec<HashMap<String, serde_json::Value>> }

async fn tcg_ai_coach(Json(req): Json<TcgAiCoachReq>) -> Json<TcgAiCoachResp> {
    let mut line = HashMap::new();
    line.insert("plan".into(), serde_json::json!([{"type":"PLAY_CARD"},{"type":"END_TURN"}]));
    line.insert("why".into(), serde_json::json!(req.question.unwrap_or_else(|| "tempo safe".into())));
    line.insert("risk".into(), serde_json::json!("medium"));
    Json(TcgAiCoachResp { lines: vec![line] })
}

async fn tcg_ai_telemetry(AxPath(_id): AxPath<String>) -> Json<serde_json::Value> {
    Json(serde_json::json!({"ok": true, "events": []}))
}

async fn get_combat_state_compact(AxPath(id): AxPath<String>) -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "game_id": id,
        "turn": 1,
        "active_player": "hero:alice",
        "mana": 3,
        "hand": [{"id":"C_001","cost":1}],
        "board": {"ally":[], "enemy":[], "effects":[]},
        "flags": {"superpositions": 0, "collapse_imminent": false}
    }))
}

async fn observe_compact(Query(_q): Query<HashMap<String, String>>) -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "nodes": [
            {"id":"n0","p":0.6},
            {"id":"n1","p":0.3},
            {"id":"n2","p":0.1}
        ],
        "edges": [
            ["n0","n1"],
            ["n1","n2"]
        ],
        "collapse_counter": 3
    }))
}
async fn hero_status(State(state): State<AppState>, Query(q): Query<HashMap<String, String>>) -> Json<HeroStatus> {
    let hero_id = q.get("heroId").cloned().unwrap_or_else(|| "hero:anonymous".to_string());
    let mut heroes = state.heroes.write().await;
    let st = heroes.entry(hero_id).or_insert_with(default_hero).clone();
    Json(st)
}

#[derive(Deserialize)]
struct HeroAddXpReq { #[serde(rename = "heroId")] hero_id: String, amount: u32, source: Option<String> }

#[derive(Serialize)]
struct HeroAddXpResp { level: u32, xp: u32, #[serde(rename = "xpNext")] xp_next: u32, #[serde(rename = "levelUp")] level_up: bool }

async fn hero_add_xp(State(state): State<AppState>, Json(req): Json<HeroAddXpReq>) -> Json<HeroAddXpResp> {
    let mut heroes = state.heroes.write().await;
    let entry = heroes.entry(req.hero_id).or_insert_with(default_hero);
    let leveled = add_xp_to_hero(entry, req.amount);
    Json(HeroAddXpResp { level: entry.level, xp: entry.xp, xp_next: entry.xp_next, level_up: leveled })
}

#[derive(Deserialize)]
struct HeroPerkReq { #[serde(rename = "heroId")] hero_id: String, #[serde(rename = "perkId")] perk_id: String }

async fn hero_apply_perk(State(state): State<AppState>, Json(req): Json<HeroPerkReq>) -> Json<serde_json::Value> {
    let mut heroes = state.heroes.write().await;
    let entry = heroes.entry(req.hero_id).or_insert_with(default_hero);
    if !entry.perks.iter().any(|p| p == &req.perk_id) {
        entry.perks.push(req.perk_id);
    }
    Json(serde_json::json!({"ok": true, "perks": entry.perks}))
}