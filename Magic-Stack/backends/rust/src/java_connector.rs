//! Java Backend Connector - Bridge between Rust and Java backends
//! 
//! Allows Rust high-performance components to trigger Java magic formulas
//! and integrate with the ShamanCardService and other Java services.

use crate::{MagicResult, MagicError};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tracing::{info, error, warn};

/// Java backend connector
pub struct JavaConnector {
    client: Client,
    java_base_url: String,
}

/// Magic formula request to Java backend
#[derive(Debug, Serialize)]
pub struct JavaMagicRequest {
    #[serde(rename = "formulaType")]
    pub formula_type: String,
    pub formula: String,
    #[serde(rename = "casterId")]
    pub caster_id: String,
    pub parameters: HashMap<String, serde_json::Value>,
}

/// Magic formula response from Java backend
#[derive(Debug, Deserialize)]
pub struct JavaMagicResponse {
    pub success: bool,
    pub message: String,
    #[serde(rename = "formulaType")]
    pub formula_type: Option<String>,
    #[serde(rename = "formulaExecuted")]
    pub formula_executed: Option<String>,
    #[serde(rename = "executionTimeMs")]
    pub execution_time_ms: Option<u64>,
    pub timestamp: Option<String>,
}

/// Shaman card cast request
#[derive(Debug, Serialize)]
pub struct ShamanCastRequest {
    #[serde(rename = "cardName")]
    pub card_name: String,
    #[serde(rename = "powerLevel")]
    pub power_level: i32,
}

/// Shaman card cast response
#[derive(Debug, Deserialize)]
pub struct ShamanCastResponse {
    pub success: bool,
    pub message: String,
    #[serde(rename = "powerLevel")]
    pub power_level: i32,
    pub timestamp: String,
}

/// Formula execution result combining Rust search + Java execution
#[derive(Debug, Serialize)]
pub struct IntegratedFormulaResult {
    pub rust_search_time_ms: u64,
    pub java_execution_time_ms: u64,
    pub total_time_ms: u64,
    pub formula: String,
    pub success: bool,
    pub message: String,
    pub performance_gain: f64, // Rust vs pure Java performance
}

impl JavaConnector {
    /// Create new Java connector
    pub fn new(java_base_url: Option<String>) -> Self {
        let base_url = java_base_url.unwrap_or_else(|| "http://localhost:8082".to_string());
        
        JavaConnector {
            client: Client::new(),
            java_base_url: base_url,
        }
    }
    
    /// Test connection to Java backend
    pub async fn test_connection(&self) -> MagicResult<bool> {
        let url = format!("{}/api/magic/status", self.java_base_url);
        
        match self.client.get(&url).send().await {
            Ok(response) => {
                let is_ok = response.status().is_success();
                if is_ok {
                    info!("✅ Java backend connection OK");
                } else {
                    warn!("⚠️ Java backend responded with status: {}", response.status());
                }
                Ok(is_ok)
            }
            Err(e) => {
                error!("❌ Failed to connect to Java backend: {}", e);
                Err(MagicError::VectorOperationFailed(format!("Java connection failed: {}", e)))
            }
        }
    }
    
    /// Execute magic formula on Java backend
    pub async fn cast_formula(&self, request: JavaMagicRequest) -> MagicResult<JavaMagicResponse> {
        let url = format!("{}/api/magic/cast", self.java_base_url);
        
        info!("🔮 Casting formula '{}' on Java backend", request.formula);
        
        match self.client
            .post(&url)
            .json(&request)
            .send()
            .await
        {
            Ok(response) => {
                if response.status().is_success() {
                    match response.json::<JavaMagicResponse>().await {
                        Ok(java_response) => {
                            info!("✅ Formula '{}' executed successfully", request.formula);
                            Ok(java_response)
                        }
                        Err(e) => {
                            error!("❌ Failed to parse Java response: {}", e);
                            Err(MagicError::VectorOperationFailed(format!("Parse error: {}", e)))
                        }
                    }
                } else {
                    error!("❌ Java backend returned error: {}", response.status());
                    Err(MagicError::VectorOperationFailed(
                        format!("Java backend error: {}", response.status())
                    ))
                }
            }
            Err(e) => {
                error!("❌ Failed to send request to Java backend: {}", e);
                Err(MagicError::VectorOperationFailed(format!("Request failed: {}", e)))
            }
        }
    }
    
    /// Cast Shaman card via Java ShamanCardService
    pub async fn cast_shaman_spirit(&self, request: ShamanCastRequest) -> MagicResult<ShamanCastResponse> {
        let url = format!("{}/api/shaman/cast-spirit", self.java_base_url);
        
        info!("🐻 Casting Shaman spirit '{}' with power {}", request.card_name, request.power_level);
        
        match self.client
            .post(&url)
            .json(&request)
            .send()
            .await
        {
            Ok(response) => {
                if response.status().is_success() {
                    match response.json::<ShamanCastResponse>().await {
                        Ok(shaman_response) => {
                            info!("✅ Shaman spirit '{}' cast successfully", request.card_name);
                            Ok(shaman_response)
                        }
                        Err(e) => {
                            error!("❌ Failed to parse Shaman response: {}", e);
                            Err(MagicError::VectorOperationFailed(format!("Parse error: {}", e)))
                        }
                    }
                } else {
                    error!("❌ Shaman service returned error: {}", response.status());
                    Err(MagicError::VectorOperationFailed(
                        format!("Shaman service error: {}", response.status())
                    ))
                }
            }
            Err(e) => {
                error!("❌ Failed to send Shaman request: {}", e);
                Err(MagicError::VectorOperationFailed(format!("Shaman request failed: {}", e)))
            }
        }
    }
    
    /// Integrated workflow: Rust Q* search → Java formula execution
    pub async fn integrated_formula_execution(
        &self,
        qstar_engine: &crate::QStarEngine,
        formula_query: &str,
        formula_type: &str,
        caster_id: &str,
    ) -> MagicResult<IntegratedFormulaResult> {
        let start_time = std::time::Instant::now();
        
        // Phase 1: Rust Q* search for formula optimization
        info!("🦀 Phase 1: Q* search for formula '{}'", formula_query);
        let search_start = std::time::Instant::now();
        
        let search_query = crate::qstar::SearchQuery {
            query_text: formula_query.to_string(),
            center: crate::Position6D::new(0.0, 0.0, 0.0, 0.0, 1.0, 0.0)?,
            radius: 100.0,
            max_results: 5,
            entity_types: Some(vec!["formula".to_string(), "spell".to_string()]),
        };
        
        let _search_results = qstar_engine.search(&search_query)?;
        let rust_search_time = search_start.elapsed().as_millis() as u64;
        
        // Phase 2: Java formula execution
        info!("☕ Phase 2: Java formula execution");
        let java_start = std::time::Instant::now();
        
        let java_request = JavaMagicRequest {
            formula_type: formula_type.to_string(),
            formula: formula_query.to_string(),
            caster_id: caster_id.to_string(),
            parameters: HashMap::new(),
        };
        
        let java_response = self.cast_formula(java_request).await?;
        let java_execution_time = java_response.execution_time_ms.unwrap_or(
            java_start.elapsed().as_millis() as u64
        );
        
        let total_time = start_time.elapsed().as_millis() as u64;
        
        // Calculate performance gain (estimated)
        let estimated_pure_java_time = java_execution_time * 2; // Rough estimate
        let performance_gain = estimated_pure_java_time as f64 / total_time as f64;
        
        info!("⚡ Integrated execution complete: {}ms total ({}ms Rust + {}ms Java)",
              total_time, rust_search_time, java_execution_time);
        
        Ok(IntegratedFormulaResult {
            rust_search_time_ms: rust_search_time,
            java_execution_time_ms: java_execution_time,
            total_time_ms: total_time,
            formula: formula_query.to_string(),
            success: java_response.success,
            message: java_response.message,
            performance_gain,
        })
    }
    
    /// Batch test all formulas (equivalent to Tucker's tests)
    pub async fn test_all_formulas(&self, formulas: Vec<&str>) -> MagicResult<Vec<IntegratedFormulaResult>> {
        info!("🧪 Starting batch formula testing (Tucker style)");
        let mut results = Vec::new();
        
        // Create a temporary Q* engine for testing
        let qstar_engine = crate::QStarEngine::new();
        
        for formula in formulas {
            info!("Testing formula: {}", formula);
            
            match self.integrated_formula_execution(
                &qstar_engine,
                formula,
                "SIMPLE",
                "tucker-test"
            ).await {
                Ok(result) => {
                    if result.success {
                        info!("✅ {} - SUCCESS ({}ms)", formula, result.total_time_ms);
                    } else {
                        warn!("⚠️ {} - FAILED: {}", formula, result.message);
                    }
                    results.push(result);
                }
                Err(e) => {
                    error!("❌ {} - ERROR: {}", formula, e);
                    // Create error result
                    results.push(IntegratedFormulaResult {
                        rust_search_time_ms: 0,
                        java_execution_time_ms: 0,
                        total_time_ms: 0,
                        formula: formula.to_string(),
                        success: false,
                        message: format!("Error: {}", e),
                        performance_gain: 0.0,
                    });
                }
            }
        }
        
        // Summary
        let total_tests = results.len();
        let successful_tests = results.iter().filter(|r| r.success).count();
        let failed_tests = total_tests - successful_tests;
        
        info!("🏁 Batch testing complete:");
        info!("   Total: {}", total_tests);
        info!("   Success: {}", successful_tests);
        info!("   Failed: {}", failed_tests);
        
        if failed_tests == 0 {
            info!("🎉 ALL FORMULAS PASSED! Magic Stack is ready!");
        }
        
        Ok(results)
    }
    
    /// Get list of available formulas from Java backend
    pub async fn get_available_formulas(&self) -> MagicResult<Vec<String>> {
        let url = format!("{}/api/magic/formulas", self.java_base_url);
        
        match self.client.get(&url).send().await {
            Ok(response) => {
                if response.status().is_success() {
                    match response.json::<Vec<String>>().await {
                        Ok(formulas) => {
                            info!("📋 Retrieved {} formulas from Java backend", formulas.len());
                            Ok(formulas)
                        }
                        Err(e) => {
                            warn!("⚠️ Failed to parse formulas list: {}", e);
                            // Fallback to common formulas
                            Ok(vec![
                                "TELEPORT_HERO".to_string(),
                                "HEAL_HERO".to_string(),
                                "FIREBALL".to_string(),
                                "CREATE_SHIELD".to_string(),
                                "LIGHTNING_BOLT".to_string(),
                                "TRIPLE_VOIX_QUANTIQUE".to_string(),
                                "ECHO_TEMPOREL".to_string(),
                                "MEMOIRE_FRACTALE".to_string(),
                            ])
                        }
                    }
                } else {
                    warn!("⚠️ Failed to get formulas list: {}", response.status());
                    Ok(vec![])
                }
            }
            Err(e) => {
                error!("❌ Failed to connect for formulas list: {}", e);
                Err(MagicError::VectorOperationFailed(format!("Connection failed: {}", e)))
            }
        }
    }
}

impl Default for JavaConnector {
    fn default() -> Self {
        Self::new(None)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_java_connector_creation() {
        let connector = JavaConnector::new(Some("http://localhost:8082".to_string()));
        assert_eq!(connector.java_base_url, "http://localhost:8082");
    }

    #[tokio::test]
    async fn test_magic_request_serialization() {
        let mut params = HashMap::new();
        params.insert("test".to_string(), serde_json::Value::String("value".to_string()));
        
        let request = JavaMagicRequest {
            formula_type: "SIMPLE".to_string(),
            formula: "TELEPORT_HERO".to_string(),
            caster_id: "test".to_string(),
            parameters: params,
        };
        
        let json = serde_json::to_string(&request).unwrap();
        assert!(json.contains("TELEPORT_HERO"));
        assert!(json.contains("formulaType"));
    }
}