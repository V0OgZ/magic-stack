use axum::{
    extract::Json,
    http::StatusCode,
    response::Json as ResponseJson,
};
use std::time::Instant;
use uuid::Uuid;
use chrono;

use crate::models::*;
use crate::services::*;

// 6D Search Handler
pub async fn search_6d_handler(
    Json(request): Json<Search6DRequest>,
) -> Result<ResponseJson<Search6DResponse>, StatusCode> {
    let start_time = Instant::now();
    
    println!("🔍 6D Search request: query='{}', center=({},{},{})", 
        request.query, request.center_x, request.center_y, request.center_z);
    
    // Process search
    let center_position = request.get_center_position();
    let results = search_6d_service(&request).await;
    
    let search_time_ms = start_time.elapsed().as_millis() as f64;
    
    let response = Search6DResponse {
        success: true,
        query: request.query.clone(),
        results,
        total_found: 3, // Mock data for now
        search_time_ms,
        center_position,
        radius_searched: request.radius,
        performance_metrics: SearchMetrics {
            index_hits: 15,
            cache_hits: 3,
            cpu_time_ms: search_time_ms * 0.8,
            memory_used_kb: 256,
            io_operations: 5,
        },
    };
    
    println!("✅ 6D Search completed in {:.2}ms", search_time_ms);
    Ok(ResponseJson(response))
}

// Data Upload Handler
pub async fn upload_data_handler(
    Json(request): Json<UploadDataRequest>,
) -> Result<ResponseJson<UploadDataResponse>, StatusCode> {
    println!("📤 Upload data request at position: ({},{},{})", 
        request.position.x, request.position.y, request.position.z);
    
    let id = Uuid::new_v4();
    let stored_at = chrono::Utc::now().to_rfc3339();
    
    // Process upload
    upload_data_service(&request).await;
    
    let response = UploadDataResponse {
        success: true,
        id,
        position: request.position,
        stored_at,
        message: "Data uploaded successfully to 6D space".to_string(),
    };
    
    println!("✅ Data uploaded with ID: {}", id);
    Ok(ResponseJson(response))
}

// Formula Execution Handler
pub async fn execute_formula_handler(
    Json(request): Json<FormulaExecutionRequest>,
) -> Result<ResponseJson<FormulaExecutionResponse>, StatusCode> {
    let start_time = Instant::now();
    
    println!("⚡ Formula execution request: '{}'", request.formula);
    
    // Process formula
    let (result, temporal_effects) = execute_formula_service(&request).await;
    
    let execution_time_ms = start_time.elapsed().as_millis() as f64;
    
    let response = FormulaExecutionResponse {
        success: true,
        formula: request.formula.clone(),
        result,
        execution_time_ms,
        temporal_effects,
        causality_impact: 0.3,
        energy_consumed: 25.0,
    };
    
    println!("✅ Formula executed in {:.2}ms", execution_time_ms);
    Ok(ResponseJson(response))
}

// Formula Analysis Handler
pub async fn analyze_formula_handler(
    Json(request): Json<FormulaAnalysisRequest>,
) -> Result<ResponseJson<FormulaAnalysisResponse>, StatusCode> {
    println!("🔬 Formula analysis request: '{}'", request.formula);
    
    let analysis = analyze_formula_service(&request).await;
    
    println!("✅ Formula analysis completed");
    Ok(ResponseJson(analysis))
}

// Analytics Handler
pub async fn get_analytics_handler() -> Result<ResponseJson<SystemAnalytics>, StatusCode> {
    println!("📊 System analytics request");
    
    let analytics = SystemAnalytics {
        uptime_seconds: 3600, // 1 hour mock
        total_searches: 42,
        total_uploads: 15,
        total_formulas_executed: 8,
        average_search_time_ms: 3.2,
        cache_hit_rate: 0.75,
        memory_usage_mb: 128,
        active_connections: 3,
        last_updated: chrono::Utc::now().to_rfc3339(),
    };
    
    Ok(ResponseJson(analytics))
}

// Performance Handler
pub async fn get_performance_handler() -> Result<ResponseJson<PerformanceStats>, StatusCode> {
    println!("⚡ Performance stats request");
    
    let stats = PerformanceStats {
        current_rps: 15.3,
        avg_response_time_ms: 2.8,
        p95_response_time_ms: 8.5,
        p99_response_time_ms: 15.2,
        error_rate: 0.001,
        cpu_usage_percent: 12.5,
        memory_usage_percent: 8.3,
        disk_usage_percent: 45.2,
        network_io_mbps: 1.2,
    };
    
    Ok(ResponseJson(stats))
}

// Q* Search Handler
pub async fn qstar_search_handler(
    Json(request): Json<QStarSearchRequest>,
) -> Result<ResponseJson<QStarSearchResponse>, StatusCode> {
    let start_time = Instant::now();
    
    println!("🌟 Q* Search request: objective='{}'", request.objective);
    
    let result = qstar_search_service(&request).await;
    
    let computation_time_ms = start_time.elapsed().as_millis() as f64;
    
    let mut response = result;
    response.computation_time_ms = computation_time_ms;
    
    println!("✅ Q* Search completed in {:.2}ms", computation_time_ms);
    Ok(ResponseJson(response))
}

// Q* Optimization Handler
pub async fn qstar_optimize_handler(
    Json(request): Json<QStarSearchRequest>,
) -> Result<ResponseJson<QStarSearchResponse>, StatusCode> {
    println!("🎯 Q* Optimization request: objective='{}'", request.objective);
    
    // For now, use same logic as search but with optimization focus
    let result = qstar_optimize_service(&request).await;
    
    println!("✅ Q* Optimization completed");
    Ok(ResponseJson(result))
}