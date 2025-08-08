use axum::{
    response::Json,
    routing::{get, post},
    Router,
};
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;
use chrono;
use std::env;

mod handlers;
mod models;
mod services;

use handlers::*;

#[tokio::main]
async fn main() {
    // Initialize logging
    env_logger::init();
    
    let port = env::var("RUST_PORT").unwrap_or_else(|_| "3001".to_string());
    let bind_addr = format!("0.0.0.0:{}", port);
    
    println!("🔮✨ DÉMARRAGE MAGICSTACK RUST - HEROES OF TIME ✨🔮");
    println!("🌌 Moteur 6D - Recherche Spatiotemporelle Ultra-Rapide");
    println!("⚡ Port {} - Prêt pour connexion avec Java Backend", port);
    
    // Build application routes
    let app = Router::new()
        // Health check
        .route("/health", get(health_check))
        
        // OpenAPI Documentation
        .route("/openapi", get(openapi_handler))
        
        // 6D Search System
        .route("/api/search", post(search_6d_handler))
        .route("/api/upload", post(upload_data_handler))
        
        // Formula System
        .route("/api/formula", post(execute_formula_handler))
        .route("/api/formula/analyze", post(analyze_formula_handler))
        
        // Analytics & Performance
        .route("/api/analytics", get(get_analytics_handler))
        .route("/api/performance", get(get_performance_handler))
        
        // Q* Algorithm
        .route("/api/qstar/search", post(qstar_search_handler))
        .route("/api/qstar/optimize", post(qstar_optimize_handler))
        
        // Middleware
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(
                    CorsLayer::new()
                        .allow_origin(Any)
                        .allow_methods(Any)
                        .allow_headers(Any),
                ),
        );

    // Start server
    let listener = tokio::net::TcpListener::bind(&bind_addr)
        .await
        .expect("❌ Impossible de binder l'adresse");
    
    println!("🚀 MagicStack Rust ONLINE sur http://localhost:{}", port);
    println!("📡 Endpoints disponibles:");
    println!("   GET  /health                    - Status check");
    println!("   POST /api/search                - Recherche 6D");
    println!("   POST /api/upload                - Upload données");
    println!("   POST /api/formula               - Exécution formules");
    println!("   POST /api/formula/analyze       - Analyse formules");
    println!("   GET  /api/analytics             - Analytics système");
    println!("   GET  /api/performance           - Métriques performance");
    println!("   POST /api/qstar/search          - Q* Algorithm search");
    println!("   POST /api/qstar/optimize        - Q* Optimization");
    println!("🌟 Ready for interdimensional collaboration!");

    axum::serve(listener, app)
        .await
        .expect("❌ Erreur serveur MagicStack Rust");
}

// Health check endpoint
async fn health_check() -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "status": "OK",
        "version": "1.0.0", 
        "components": {
            "world_state": "0 nodes",
            "qstar_engine": "0 entities", 
            "performance": "OPTIMIZED"
        }
    }))
}