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
use magic_stack_core::pathfinding::{a_star_path_weighted, Cell as PfCell, PathfindingOptions as PfOpts, Topology as PfTopology};
use magic_stack_core::mapgen::{generate_map, MapGenParams};
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::{Json, Html},
    routing::{get, post},
    Router,
};
use axum::extract::Path as AxPath;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, error};
use tracing_subscriber;
use uuid::Uuid;
use tower_http::cors::{Any, CorsLayer};
use axum::http::Method;
use rand::prelude::*;
use rand::SeedableRng;
use rand::distributions::Distribution;
use reqwest::Client as HttpClient;

/// Application state shared across handlers
#[derive(Clone)]
struct AppState {
    qstar_engine: Arc<RwLock<QStarEngine>>,
    world_state: Arc<WorldStateGraph>,
    java_connector: Arc<JavaConnector>,
    matches: Arc<RwLock<HashMap<String, MatchState>>>,
    vector_api_base: String,
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
    
    // Test Java connection
    match java_connector.test_connection().await {
        Ok(true) => info!("✅ Java backend connection established"),
        Ok(false) => info!("⚠️ Java backend connection issues"),
        Err(e) => info!("⚠️ Java backend not available: {}", e),
    }
    
    let app_state = AppState {
        qstar_engine,
        world_state,
        java_connector,
        matches,
        vector_api_base,
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
        .route("/api/map/generate", post(map_generate))
        .route("/api/map/init", post(map_init))
        // Archives (Vector DB local proxy)
        .route("/api/archives/status", get(archives_status))
        .route("/api/archives/search", post(archives_search))
        .route("/api/archives/build", post(archives_build))
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
// ==== Agents Handlers (MVP) ====
async fn agents_health() -> Json<serde_json::Value> {
    Json(serde_json::json!({"ok": true, "version": env!("CARGO_PKG_VERSION"), "timestamp": now_ms()}))
}

async fn agents_tick(Json(_req): Json<TickRequest>) -> Json<TickResponse> {
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

    Json(TickResponse { commands: vec![cmd], serverTime: now_ms(), nextTickMs: 1000 })
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
    formula_type: Option<String>,
    caster_node_id: String,
    parameters: Option<HashMap<String, serde_json::Value>>,
    caster_identity: Option<String>,
}

/// Cast a power/formula via Java backend
async fn agents_cast(State(state): State<AppState>, Json(req): Json<CastRequest>) -> Result<Json<java_connector::JavaMagicResponse>, StatusCode> {
    let params = req.parameters.unwrap_or_default();
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
            Ok(Json(ResolveOutcome { mode, involved: ids, winner: Some(winner), started_match_id: None }))
        }
        ResolutionMode::TCG => {
            // Start a match with involved entities
            let match_id = uuid::Uuid::new_v4().to_string();
            let mut score = HashMap::new();
            for (i, id) in ids.iter().enumerate() {
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

// ===== Vector Archives Proxy =====
#[derive(Deserialize)]
struct ArchiveSearchReq { query: String, top_k: Option<usize> }

async fn archives_status(State(state): State<AppState>) -> Result<Json<serde_json::Value>, StatusCode> {
    let url = format!("{}/api/status", state.vector_api_base);
    match HttpClient::new().get(url).send().await {
        Ok(resp) => resp.json::<serde_json::Value>().await.map(Json).map_err(|_| StatusCode::BAD_GATEWAY),
        Err(_) => Err(StatusCode::BAD_GATEWAY),
    }
}

async fn archives_build(State(state): State<AppState>) -> Result<Json<serde_json::Value>, StatusCode> {
    let url = format!("{}/api/build", state.vector_api_base);
    match HttpClient::new().post(url).send().await {
        Ok(resp) => resp.json::<serde_json::Value>().await.map(Json).map_err(|_| StatusCode::BAD_GATEWAY),
        Err(_) => Err(StatusCode::BAD_GATEWAY),
    }
}

async fn archives_search(State(state): State<AppState>, Json(req): Json<ArchiveSearchReq>) -> Result<Json<serde_json::Value>, StatusCode> {
    let url = format!("{}/api/search", state.vector_api_base);
    let top_k = req.top_k.unwrap_or(10);
    let body = serde_json::json!({"query": req.query, "top_k": top_k});
    match HttpClient::new().post(url).json(&body).send().await {
        Ok(resp) => resp.json::<serde_json::Value>().await.map(Json).map_err(|_| StatusCode::BAD_GATEWAY),
        Err(_) => Err(StatusCode::BAD_GATEWAY),
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
struct MapInitResponse { created: usize }

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
                    props.insert("time_window".to_string(), serde_json::json!({"start": 2, "end": 8, "period": 12}));
                    props.insert("recurrence".to_string(), serde_json::json!({"every": "lunar_day", "count": 9999}));
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
            }
        }
    }

    if !to_create.is_empty() {
        let created_now = to_create.len();
        let _ = state.world_state.batch_update(to_create).ok();
        created = created_now;
    }

    Json(MapInitResponse { created })
}

/// Request for integrated formula casting
#[derive(Deserialize)]
struct IntegratedCastRequest {
    formula: String,
    formula_type: Option<String>,
    caster_id: Option<String>,
}