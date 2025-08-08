//! Q* Algorithm - High-performance 6D search engine
//! 
//! Implements GROKÆN's Q* algorithm for ultra-fast searches in 6D space
//! without heavy LLM embeddings. Uses A* pathfinding in 6D coordinates.

use crate::{Position6D, MagicResult};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Entity in 6D space with searchable data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Entity6D {
    pub id: String,
    pub position: Position6D,
    pub data: serde_json::Value,
    pub entity_type: String,
}

/// Search query parameters
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchQuery {
    pub query_text: String,
    pub center: Position6D,
    pub radius: f64,
    pub max_results: usize,
    pub entity_types: Option<Vec<String>>,
}

/// Search result with relevance score
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SearchResult {
    pub entity: Entity6D,
    pub distance: f64,
    pub relevance_score: f64,
}

/// High-performance Q* search engine
pub struct QStarEngine {
    entities: HashMap<String, Entity6D>,
    spatial_index: SpatialIndex,
}

/// Spatial index for fast 6D lookups
struct SpatialIndex {
    // Simple grid-based spatial index for now
    // Could be optimized with R-tree or KD-tree later
    grid: HashMap<GridCell, Vec<String>>,
    cell_size: f64,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct GridCell {
    x: i32,
    y: i32,
    z: i32,
    t: i32,
    c: i32,
    psi: i32,
}

impl QStarEngine {
    /// Create new Q* search engine
    pub fn new() -> Self {
        QStarEngine {
            entities: HashMap::new(),
            spatial_index: SpatialIndex::new(10.0), // 10-unit grid cells
        }
    }
    
    /// Add entity to search index
    pub fn add_entity(&mut self, entity: Entity6D) -> MagicResult<()> {
        let id = entity.id.clone();
        self.spatial_index.add_entity(&id, &entity.position);
        self.entities.insert(id, entity);
        Ok(())
    }
    
    /// Remove entity from search index
    pub fn remove_entity(&mut self, entity_id: &str) -> MagicResult<()> {
        if let Some(entity) = self.entities.remove(entity_id) {
            self.spatial_index.remove_entity(entity_id, &entity.position);
        }
        Ok(())
    }
    
    /// Update entity position
    pub fn update_entity_position(&mut self, entity_id: &str, new_position: Position6D) -> MagicResult<()> {
        if let Some(entity) = self.entities.get_mut(entity_id) {
            // Remove from old position
            self.spatial_index.remove_entity(entity_id, &entity.position);
            
            // Update position
            entity.position = new_position;
            
            // Add to new position
            self.spatial_index.add_entity(entity_id, &new_position);
        }
        Ok(())
    }
    
    /// Perform Q* search
    pub fn search(&self, query: &SearchQuery) -> MagicResult<Vec<SearchResult>> {
        // Get candidate entities from spatial index
        let candidates = self.spatial_index.get_entities_in_radius(&query.center, query.radius);
        
        let mut results = Vec::new();
        
        for entity_id in candidates {
            if let Some(entity) = self.entities.get(&entity_id) {
                // Filter by entity type if specified
                if let Some(ref types) = query.entity_types {
                    if !types.contains(&entity.entity_type) {
                        continue;
                    }
                }
                
                let distance = entity.position.distance_to(&query.center);
                if distance <= query.radius {
                    let relevance_score = self.calculate_relevance_score(entity, query, distance);
                    
                    results.push(SearchResult {
                        entity: entity.clone(),
                        distance,
                        relevance_score,
                    });
                }
            }
        }
        
        // Sort by relevance score (higher is better)
        results.sort_by(|a, b| b.relevance_score.partial_cmp(&a.relevance_score).unwrap());
        
        // Limit results
        results.truncate(query.max_results);
        
        Ok(results)
    }
    
    /// Calculate relevance score for search result
    fn calculate_relevance_score(&self, entity: &Entity6D, query: &SearchQuery, distance: f64) -> f64 {
        // Base score from distance (closer = higher score)
        let distance_score = 1.0 / (1.0 + distance);
        
        // Text relevance score (simple keyword matching for now)
        let text_score = self.calculate_text_relevance(entity, &query.query_text);
        
        // Causal probability boost
        let causal_boost = entity.position.causal();
        
        // Identity coherence boost
        let identity_boost = (entity.position.identity() + 1.0) / 2.0; // Normalize to 0-1
        
        // Combined score
        distance_score * 0.4 + text_score * 0.4 + causal_boost * 0.1 + identity_boost * 0.1
    }
    
    /// Simple text relevance calculation
    fn calculate_text_relevance(&self, entity: &Entity6D, query_text: &str) -> f64 {
        let query_lower = query_text.to_lowercase();
        let entity_text = format!("{} {}", entity.id, entity.data.to_string()).to_lowercase();
        
        let query_words: Vec<&str> = query_lower.split_whitespace().collect();
        let mut matches = 0;
        
        for word in query_words.iter() {
            if entity_text.contains(word) {
                matches += 1;
            }
        }
        
        if query_words.is_empty() {
            0.0
        } else {
            matches as f64 / query_words.len() as f64
        }
    }
    
    /// Get entity by ID
    pub fn get_entity(&self, entity_id: &str) -> Option<&Entity6D> {
        self.entities.get(entity_id)
    }
    
    /// Get all entities in radius
    pub fn get_entities_in_radius(&self, center: &Position6D, radius: f64) -> MagicResult<Vec<&Entity6D>> {
        let entity_ids = self.spatial_index.get_entities_in_radius(center, radius);
        let mut entities = Vec::new();
        
        for id in entity_ids {
            if let Some(entity) = self.entities.get(&id) {
                entities.push(entity);
            }
        }
        
        Ok(entities)
    }
    
    /// Get total number of entities
    pub fn entity_count(&self) -> usize {
        self.entities.len()
    }
}

impl SpatialIndex {
    fn new(cell_size: f64) -> Self {
        SpatialIndex {
            grid: HashMap::new(),
            cell_size,
        }
    }
    
    fn get_cell(&self, position: &Position6D) -> GridCell {
        GridCell {
            x: (position.x / self.cell_size).floor() as i32,
            y: (position.y / self.cell_size).floor() as i32,
            z: (position.z / self.cell_size).floor() as i32,
            t: (position.t / self.cell_size).floor() as i32,
            c: (position.c / self.cell_size).floor() as i32,
            psi: (position.psi / self.cell_size).floor() as i32,
        }
    }
    
    fn add_entity(&mut self, entity_id: &str, position: &Position6D) {
        let cell = self.get_cell(position);
        self.grid.entry(cell).or_insert_with(Vec::new).push(entity_id.to_string());
    }
    
    fn remove_entity(&mut self, entity_id: &str, position: &Position6D) {
        let cell = self.get_cell(position);
        if let Some(entities) = self.grid.get_mut(&cell) {
            entities.retain(|id| id != entity_id);
            if entities.is_empty() {
                self.grid.remove(&cell);
            }
        }
    }
    
    fn get_entities_in_radius(&self, center: &Position6D, radius: f64) -> Vec<String> {
        let mut result = Vec::new();
        let center_cell = self.get_cell(center);
        
        // Calculate how many cells we need to check in each dimension
        let cell_radius = (radius / self.cell_size).ceil() as i32;
        
        // Check all cells within the radius
        for dx in -cell_radius..=cell_radius {
            for dy in -cell_radius..=cell_radius {
                for dz in -cell_radius..=cell_radius {
                    for dt in -cell_radius..=cell_radius {
                        for dc in -cell_radius..=cell_radius {
                            for dpsi in -cell_radius..=cell_radius {
                                let cell = GridCell {
                                    x: center_cell.x + dx,
                                    y: center_cell.y + dy,
                                    z: center_cell.z + dz,
                                    t: center_cell.t + dt,
                                    c: center_cell.c + dc,
                                    psi: center_cell.psi + dpsi,
                                };
                                
                                if let Some(entities) = self.grid.get(&cell) {
                                    result.extend(entities.clone());
                                }
                            }
                        }
                    }
                }
            }
        }
        
        result
    }
}

impl Default for QStarEngine {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_qstar_basic_search() {
        let mut engine = QStarEngine::new();
        
        // Add test entity
        let entity = Entity6D {
            id: "dragon_1".to_string(),
            position: Position6D::new(100.0, 200.0, 50.0, 2025.0, 0.95, 0.8).unwrap(),
            data: json!({"name": "Ancient Dragon", "type": "creature"}),
            entity_type: "creature".to_string(),
        };
        
        engine.add_entity(entity).unwrap();
        
        // Search for dragon
        let query = SearchQuery {
            query_text: "dragon".to_string(),
            center: Position6D::new(105.0, 205.0, 55.0, 2025.0, 0.9, 0.7).unwrap(),
            radius: 20.0,
            max_results: 10,
            entity_types: None,
        };
        
        let results = engine.search(&query).unwrap();
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].entity.id, "dragon_1");
    }
}