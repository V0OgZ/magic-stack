use serde::{Deserialize, Serialize};
use uuid::Uuid;

// 6D Position System
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Position6D {
    pub x: f64,      // Space X
    pub y: f64,      // Space Y  
    pub z: f64,      // Space Z
    pub t: f64,      // Time
    pub c: f64,      // Causality
    pub psi: f64,    // Identity/Psi
}

impl Position6D {
    pub fn new(x: f64, y: f64, z: f64, t: f64, c: f64, psi: f64) -> Self {
        Self { x, y, z, t, c, psi }
    }
    
    pub fn distance_to(&self, other: &Position6D) -> f64 {
        let dx = self.x - other.x;
        let dy = self.y - other.y;
        let dz = self.z - other.z;
        let dt = self.t - other.t;
        let dc = self.c - other.c;
        let dpsi = self.psi - other.psi;
        
        (dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi).sqrt()
    }
}

// 6D Search Request
#[derive(Debug, Deserialize)]
pub struct Search6DRequest {
    pub query: String,
    pub center_x: f64,
    pub center_y: f64,
    pub center_z: f64,
    pub center_t: Option<f64>,
    pub center_c: Option<f64>,
    pub center_psi: Option<f64>,
    pub radius: f64,
    pub max_results: Option<usize>,
}

impl Search6DRequest {
    pub fn get_center_position(&self) -> Position6D {
        Position6D::new(
            self.center_x,
            self.center_y,
            self.center_z,
            self.center_t.unwrap_or(0.0),
            self.center_c.unwrap_or(0.0),
            self.center_psi.unwrap_or(0.0),
        )
    }
}

// 6D Search Result
#[derive(Debug, Serialize)]
pub struct Search6DResult {
    pub id: Uuid,
    pub data: serde_json::Value,
    pub position: Position6D,
    pub distance: f64,
    pub relevance_score: f64,
    pub temporal_stability: f64,
}

// 6D Search Response
#[derive(Debug, Serialize)]
pub struct Search6DResponse {
    pub success: bool,
    pub query: String,
    pub results: Vec<Search6DResult>,
    pub total_found: usize,
    pub search_time_ms: f64,
    pub center_position: Position6D,
    pub radius_searched: f64,
    pub performance_metrics: SearchMetrics,
}

// Data Upload Request
#[derive(Debug, Deserialize)]
pub struct UploadDataRequest {
    pub data: serde_json::Value,
    pub position: Position6D,
    pub metadata: Option<serde_json::Value>,
    pub ttl_seconds: Option<u64>,
}

// Data Upload Response
#[derive(Debug, Serialize)]
pub struct UploadDataResponse {
    pub success: bool,
    pub id: Uuid,
    pub position: Position6D,
    pub stored_at: String,
    pub message: String,
}

// Formula Execution Request
#[derive(Debug, Deserialize)]
pub struct FormulaExecutionRequest {
    pub formula: String,
    pub context: Option<serde_json::Value>,
    pub position: Option<Position6D>,
    pub parameters: Option<serde_json::Value>,
}

// Formula Analysis Request
#[derive(Debug, Deserialize)]
pub struct FormulaAnalysisRequest {
    pub formula: String,
    pub deep_analysis: Option<bool>,
}

// Formula Execution Response
#[derive(Debug, Serialize)]
pub struct FormulaExecutionResponse {
    pub success: bool,
    pub formula: String,
    pub result: serde_json::Value,
    pub execution_time_ms: f64,
    pub temporal_effects: Vec<TemporalEffect>,
    pub causality_impact: f64,
    pub energy_consumed: f64,
}

// Formula Analysis Response
#[derive(Debug, Serialize)]
pub struct FormulaAnalysisResponse {
    pub success: bool,
    pub formula: String,
    pub complexity_score: f64,
    pub temporal_stability: f64,
    pub causality_risk: f64,
    pub required_energy: f64,
    pub components: Vec<FormulaComponent>,
    pub recommendations: Vec<String>,
}

// Temporal Effect
#[derive(Debug, Serialize)]
pub struct TemporalEffect {
    pub effect_type: String,
    pub magnitude: f64,
    pub duration_seconds: f64,
    pub affected_area: Position6D,
    pub description: String,
}

// Formula Component
#[derive(Debug, Serialize)]
pub struct FormulaComponent {
    pub symbol: String,
    pub meaning: String,
    pub power_level: f64,
    pub stability: f64,
}

// Q* Search Request
#[derive(Debug, Deserialize)]
pub struct QStarSearchRequest {
    pub objective: String,
    pub constraints: Vec<String>,
    pub start_position: Position6D,
    pub max_depth: Option<usize>,
    pub optimization_target: Option<String>,
}

// Q* Search Response
#[derive(Debug, Serialize)]
pub struct QStarSearchResponse {
    pub success: bool,
    pub objective: String,
    pub optimal_path: Vec<Position6D>,
    pub estimated_cost: f64,
    pub confidence_score: f64,
    pub alternatives: Vec<QStarPath>,
    pub computation_time_ms: f64,
}

// Q* Path
#[derive(Debug, Serialize)]
pub struct QStarPath {
    pub path: Vec<Position6D>,
    pub cost: f64,
    pub risk_factor: f64,
    pub description: String,
}

// Performance Metrics
#[derive(Debug, Serialize)]
pub struct SearchMetrics {
    pub index_hits: usize,
    pub cache_hits: usize,
    pub cpu_time_ms: f64,
    pub memory_used_kb: usize,
    pub io_operations: usize,
}

// System Analytics
#[derive(Debug, Serialize)]
pub struct SystemAnalytics {
    pub uptime_seconds: u64,
    pub total_searches: usize,
    pub total_uploads: usize,
    pub total_formulas_executed: usize,
    pub average_search_time_ms: f64,
    pub cache_hit_rate: f64,
    pub memory_usage_mb: usize,
    pub active_connections: usize,
    pub last_updated: String,
}

// Performance Stats
#[derive(Debug, Serialize)]
pub struct PerformanceStats {
    pub current_rps: f64,        // Requests per second
    pub avg_response_time_ms: f64,
    pub p95_response_time_ms: f64,
    pub p99_response_time_ms: f64,
    pub error_rate: f64,
    pub cpu_usage_percent: f64,
    pub memory_usage_percent: f64,
    pub disk_usage_percent: f64,
    pub network_io_mbps: f64,
}

// Generic API Response
#[derive(Debug, Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub message: String,
    pub timestamp: String,
    pub request_id: Uuid,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T, message: &str) -> Self {
        Self {
            success: true,
            data: Some(data),
            message: message.to_string(),
            timestamp: chrono::Utc::now().to_rfc3339(),
            request_id: Uuid::new_v4(),
        }
    }
    
    pub fn error(message: &str) -> Self {
        Self {
            success: false,
            data: None,
            message: message.to_string(),
            timestamp: chrono::Utc::now().to_rfc3339(),
            request_id: Uuid::new_v4(),
        }
    }
}