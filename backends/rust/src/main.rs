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
use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use tracing::{info, error};
use tracing_subscriber;

/// Application state shared across handlers
#[derive(Clone)]
struct AppState {
    qstar_engine: Arc<RwLock<QStarEngine>>,
    world_state: Arc<WorldStateGraph>,
    java_connector: Arc<JavaConnector>,
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

#[derive(Deserialize, Serialize)]
struct Position6DDto {
    x: f64,
    y: f64,
    z: f64,
    t: f64,
    c: f64,
    psi: f64,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();
    
    info!("🦀 Magic Stack Rust Server starting...");
    
    // Initialize components
    let qstar_engine = Arc::new(RwLock::new(QStarEngine::new()));
    let world_state = Arc::new(WorldStateGraph::new());
    let java_connector = Arc::new(JavaConnector::new(None));
    
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
    };
    
    // Build router
    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/qstar/search", post(qstar_search))
        .route("/api/world-state/nodes", post(create_node))
        .route("/api/world-state/nodes/:id", get(get_node))
        .route("/api/world-state/nodes/:id/position", post(update_position))
        .route("/api/world-state/nodes/radius", get(get_nodes_in_radius))
        .route("/api/test/all-formulas", post(test_all_formulas))
        .route("/api/integration/formula-cast", post(integrated_formula_cast))
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

/// Request for integrated formula casting
#[derive(Deserialize)]
struct IntegratedCastRequest {
    formula: String,
    formula_type: Option<String>,
    caster_id: Option<String>,
}