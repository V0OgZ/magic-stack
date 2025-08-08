//! World State Graph - High-performance game state tracking
//! 
//! Manages the complete state of AVALON's world with ultra-fast updates.
//! Replaces JavaScript implementation for critical performance.

use crate::{Position6D, MagicResult, MagicError};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::sync::{Arc, RwLock};
use std::time::{SystemTime, UNIX_EPOCH};
use rayon::prelude::*;

/// Game state node representing an entity or location
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StateNode {
    pub id: String,
    pub position: Position6D,
    pub node_type: NodeType,
    pub properties: HashMap<String, serde_json::Value>,
    pub connections: HashSet<String>,
    pub last_updated: u64,
    /// Optional identity grouping across timelines
    #[serde(default)]
    pub identity_id: Option<String>,
    /// Optional timeline identifier
    #[serde(default)]
    pub timeline_id: Option<String>,
}

/// Types of nodes in the world state graph
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum NodeType {
    Entity,      // Player, NPC, creature
    Location,    // Room, area, landmark
    Object,      // Item, artifact, spell effect
    Event,       // Temporal event, action result
    Abstract,    // Concept, memory, relationship
}

/// State change event
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StateChange {
    pub node_id: String,
    pub change_type: ChangeType,
    pub old_value: Option<serde_json::Value>,
    pub new_value: Option<serde_json::Value>,
    pub timestamp: u64,
    pub causal_chain: Vec<String>,
}

/// Types of state changes
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ChangeType {
    NodeCreated,
    NodeDestroyed,
    PropertyChanged(String),
    PositionChanged,
    ConnectionAdded(String),
    ConnectionRemoved(String),
    /// An identity was forked into a new node on a (possibly) different timeline
    IdentityForked { identity_id: String, from_node_id: String, to_node_id: String },
    /// Two identity instances merged (conceptually collapsing timelines)
    IdentityMerged { identity_id: String, into_node_id: String, merged_node_id: String },
    /// An observation collapsed superpositions in an area/description
    ObservationCollapse { description: String },
}

/// World state update batch for atomic operations
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateBatch {
    pub changes: Vec<StateChange>,
    pub batch_id: String,
    pub timestamp: u64,
}

/// High-performance world state graph
pub struct WorldStateGraph {
    nodes: Arc<RwLock<HashMap<String, StateNode>>>,
    change_history: Arc<RwLock<Vec<StateChange>>>,
    spatial_index: Arc<RwLock<SpatialQuadTree>>,
    observers: Arc<RwLock<Vec<Box<dyn StateObserver + Send + Sync>>>>,
}

/// Spatial index using quadtree for fast spatial queries
struct SpatialQuadTree {
    // Simplified quadtree implementation
    // In production, would use a proper spatial data structure
    spatial_map: HashMap<(i32, i32, i32), Vec<String>>,
    cell_size: f64,
}

/// Observer pattern for state changes
pub trait StateObserver {
    fn on_state_change(&self, change: &StateChange);
    fn on_batch_update(&self, batch: &UpdateBatch);
}

impl WorldStateGraph {
    /// Create new world state graph
    pub fn new() -> Self {
        WorldStateGraph {
            nodes: Arc::new(RwLock::new(HashMap::new())),
            change_history: Arc::new(RwLock::new(Vec::new())),
            spatial_index: Arc::new(RwLock::new(SpatialQuadTree::new(50.0))),
            observers: Arc::new(RwLock::new(Vec::new())),
        }
    }
    
    /// Add or update a node in the graph
    pub fn update_node(&self, node: StateNode) -> MagicResult<()> {
        let timestamp = current_timestamp();
        let node_id = node.id.clone();
        let position = node.position;
        
        let change = {
            let mut nodes = self.nodes.write().unwrap();
            let change = if nodes.contains_key(&node_id) {
                StateChange {
                    node_id: node_id.clone(),
                    change_type: ChangeType::PropertyChanged("updated".to_string()),
                    old_value: None,
                    new_value: Some(serde_json::to_value(&node)?),
                    timestamp,
                    causal_chain: vec![node_id.clone()],
                }
            } else {
                StateChange {
                    node_id: node_id.clone(),
                    change_type: ChangeType::NodeCreated,
                    old_value: None,
                    new_value: Some(serde_json::to_value(&node)?),
                    timestamp,
                    causal_chain: vec![node_id.clone()],
                }
            };
            
            nodes.insert(node_id.clone(), node);
            change
        };
        
        // Update spatial index
        {
            let mut spatial_index = self.spatial_index.write().unwrap();
            spatial_index.update_node(&node_id, &position);
        }
        
        // Record change
        self.record_change(change)?;
        
        Ok(())
    }
    
    /// Remove a node from the graph
    pub fn remove_node(&self, node_id: &str) -> MagicResult<()> {
        let timestamp = current_timestamp();
        
        let change = {
            let mut nodes = self.nodes.write().unwrap();
            if let Some(old_node) = nodes.remove(node_id) {
                StateChange {
                    node_id: node_id.to_string(),
                    change_type: ChangeType::NodeDestroyed,
                    old_value: Some(serde_json::to_value(&old_node)?),
                    new_value: None,
                    timestamp,
                    causal_chain: vec![node_id.to_string()],
                }
            } else {
                return Ok(()); // Node doesn't exist
            }
        };
        
        // Remove from spatial index
        {
            let mut spatial_index = self.spatial_index.write().unwrap();
            spatial_index.remove_node(node_id);
        }
        
        // Record change
        self.record_change(change)?;
        
        Ok(())
    }
    
    /// Update node position (optimized for frequent position updates)
    pub fn update_position(&self, node_id: &str, new_position: Position6D) -> MagicResult<()> {
        let timestamp = current_timestamp();
        
        let change = {
            let mut nodes = self.nodes.write().unwrap();
            if let Some(node) = nodes.get_mut(node_id) {
                let old_position = node.position;
                node.position = new_position;
                node.last_updated = timestamp;
                
                StateChange {
                    node_id: node_id.to_string(),
                    change_type: ChangeType::PositionChanged,
                    old_value: Some(serde_json::to_value(&old_position)?),
                    new_value: Some(serde_json::to_value(&new_position)?),
                    timestamp,
                    causal_chain: vec![node_id.to_string()],
                }
            } else {
                return Err(MagicError::WorldStateUpdateFailed(
                    format!("Node {} not found", node_id)
                ));
            }
        };
        
        // Update spatial index
        {
            let mut spatial_index = self.spatial_index.write().unwrap();
            spatial_index.update_node(node_id, &new_position);
        }
        
        // Record change
        self.record_change(change)?;
        
        Ok(())
    }
    
    /// Batch update multiple nodes atomically
    pub fn batch_update(&self, updates: Vec<StateNode>) -> MagicResult<UpdateBatch> {
        let batch_id = uuid::Uuid::new_v4().to_string();
        let timestamp = current_timestamp();
        let mut changes = Vec::new();
        
        // Process updates in parallel
        let update_results: Vec<_> = updates.par_iter().map(|node| {
            // Create change record
            let change = StateChange {
                node_id: node.id.clone(),
                change_type: ChangeType::PropertyChanged("batch_update".to_string()),
                old_value: None,
                new_value: serde_json::to_value(node).ok(),
                timestamp,
                causal_chain: vec![batch_id.clone()],
            };
            (node.clone(), change)
        }).collect();
        
        // Apply updates atomically
        {
            let mut nodes = self.nodes.write().unwrap();
            let mut spatial_index = self.spatial_index.write().unwrap();
            
            for (node, change) in update_results {
                nodes.insert(node.id.clone(), node.clone());
                spatial_index.update_node(&node.id, &node.position);
                changes.push(change);
            }
        }
        
        let batch = UpdateBatch {
            changes: changes.clone(),
            batch_id,
            timestamp,
        };
        
        // Record all changes
        {
            let mut history = self.change_history.write().unwrap();
            history.extend(changes);
        }
        
        // Notify observers
        self.notify_batch_update(&batch);
        
        Ok(batch)
    }
    
    /// Get node by ID
    pub fn get_node(&self, node_id: &str) -> Option<StateNode> {
        let nodes = self.nodes.read().unwrap();
        nodes.get(node_id).cloned()
    }
    
    /// Get all nodes within radius of position
    pub fn get_nodes_in_radius(&self, center: &Position6D, radius: f64) -> MagicResult<Vec<StateNode>> {
        let candidate_ids = {
            let spatial_index = self.spatial_index.read().unwrap();
            spatial_index.get_nodes_in_radius(center, radius)
        };
        
        let nodes = self.nodes.read().unwrap();
        let mut result = Vec::new();
        
        for node_id in candidate_ids {
            if let Some(node) = nodes.get(&node_id) {
                if node.position.distance_to(center) <= radius {
                    result.push(node.clone());
                }
            }
        }
        
        Ok(result)
    }
    
    /// Get nodes by type
    pub fn get_nodes_by_type(&self, node_type: NodeType) -> Vec<StateNode> {
        let nodes = self.nodes.read().unwrap();
        nodes.values()
            .filter(|node| node.node_type == node_type)
            .cloned()
            .collect()
    }
    
    /// Get recent changes
    pub fn get_recent_changes(&self, limit: usize) -> Vec<StateChange> {
        let history = self.change_history.read().unwrap();
        history.iter()
            .rev()
            .take(limit)
            .cloned()
            .collect()
    }
    
    /// Add state observer
    pub fn add_observer(&self, observer: Box<dyn StateObserver + Send + Sync>) {
        let mut observers = self.observers.write().unwrap();
        observers.push(observer);
    }
    
    /// Get total node count
    pub fn node_count(&self) -> usize {
        let nodes = self.nodes.read().unwrap();
        nodes.len()
    }
    
    /// Record a state change
    fn record_change(&self, change: StateChange) -> MagicResult<()> {
        {
            let mut history = self.change_history.write().unwrap();
            history.push(change.clone());
            
            // Keep history bounded (last 10000 changes)
            if history.len() > 10000 {
                history.drain(0..1000);
            }
        }
        
        // Notify observers
        self.notify_change(&change);
        
        Ok(())
    }
    
    /// Notify observers of state change
    fn notify_change(&self, change: &StateChange) {
        let observers = self.observers.read().unwrap();
        for observer in observers.iter() {
            observer.on_state_change(change);
        }
    }
    
    /// Notify observers of batch update
    fn notify_batch_update(&self, batch: &UpdateBatch) {
        let observers = self.observers.read().unwrap();
        for observer in observers.iter() {
            observer.on_batch_update(batch);
        }
    }

    /// Return all nodes sharing the same identity_id
    pub fn get_identity_doubles(&self, identity_id: &str) -> Vec<StateNode> {
        let nodes = self.nodes.read().unwrap();
        nodes.values()
            .filter(|n| n.identity_id.as_deref() == Some(identity_id))
            .cloned()
            .collect()
    }

    /// Fork an identity: duplicate a node into a new node on a target timeline/position
    pub fn fork_identity(
        &self,
        from_node_id: &str,
        new_node_id: &str,
        new_timeline_id: &str,
        new_position: Position6D,
    ) -> MagicResult<StateNode> {
        let timestamp = current_timestamp();
        let mut created_node_opt = None;

        {
            let mut nodes = self.nodes.write().unwrap();
            let from_node = nodes.get(from_node_id)
                .ok_or_else(|| MagicError::WorldStateUpdateFailed(format!("Node {} not found", from_node_id)))?;
            let identity_id = from_node.identity_id.clone().unwrap_or_else(|| from_node.id.clone());
            let mut properties = from_node.properties.clone();
            properties.insert("forked_from".to_string(), serde_json::json!(from_node_id));

            let new_node = StateNode {
                id: new_node_id.to_string(),
                position: new_position,
                node_type: from_node.node_type.clone(),
                properties,
                connections: HashSet::new(),
                last_updated: timestamp,
                identity_id: Some(identity_id.clone()),
                timeline_id: Some(new_timeline_id.to_string()),
            };

            nodes.insert(new_node_id.to_string(), new_node.clone());
            created_node_opt = Some(new_node);
        }

        // Record change
        self.record_change(StateChange {
            node_id: new_node_id.to_string(),
            change_type: ChangeType::IdentityForked {
                identity_id: self.nodes.read().unwrap().get(new_node_id).and_then(|n| n.identity_id.clone()).unwrap_or_else(|| new_node_id.to_string()),
                from_node_id: from_node_id.to_string(),
                to_node_id: new_node_id.to_string(),
            },
            old_value: None,
            new_value: None,
            timestamp: current_timestamp(),
            causal_chain: vec![from_node_id.to_string(), new_node_id.to_string()],
        })?;

        Ok(created_node_opt.unwrap())
    }

    /// Merge two identity instances. Keeps `into_node_id`, removes `merged_node_id`.
    pub fn merge_identity(&self, identity_id: &str, into_node_id: &str, merged_node_id: &str) -> MagicResult<()> {
        let timestamp = current_timestamp();
        {
            let mut nodes = self.nodes.write().unwrap();
            // Optionally transfer connections/properties (simple approach: keep into as-is)
            nodes.remove(merged_node_id);
            if let Some(into) = nodes.get_mut(into_node_id) {
                into.last_updated = timestamp;
            }
        }

        self.record_change(StateChange {
            node_id: into_node_id.to_string(),
            change_type: ChangeType::IdentityMerged {
                identity_id: identity_id.to_string(),
                into_node_id: into_node_id.to_string(),
                merged_node_id: merged_node_id.to_string(),
            },
            old_value: None,
            new_value: None,
            timestamp,
            causal_chain: vec![into_node_id.to_string(), merged_node_id.to_string()],
        })?;
        Ok(())
    }

    /// Mark a set of nodes as "observed" (collapse superposition) and record events
    pub fn mark_observed(&self, node_ids: &[String], description: &str) -> MagicResult<usize> {
        let timestamp = current_timestamp();
        let mut updated_count = 0usize;

        {
            let mut nodes = self.nodes.write().unwrap();
            for node_id in node_ids.iter() {
                if let Some(node) = nodes.get_mut(node_id) {
                    node.properties.insert("observed".to_string(), serde_json::json!(true));
                    node.last_updated = timestamp;
                    updated_count += 1;
                }
            }
        }

        // Record a collapse change per node for traceability
        for node_id in node_ids.iter() {
            let change = StateChange {
                node_id: node_id.clone(),
                change_type: ChangeType::ObservationCollapse { description: description.to_string() },
                old_value: None,
                new_value: None,
                timestamp,
                causal_chain: vec![node_id.clone()],
            };
            self.record_change(change)?;
        }

        Ok(updated_count)
    }
}

impl SpatialQuadTree {
    fn new(cell_size: f64) -> Self {
        SpatialQuadTree {
            spatial_map: HashMap::new(),
            cell_size,
        }
    }
    
    fn get_cell_key(&self, position: &Position6D) -> (i32, i32, i32) {
        (
            (position.x / self.cell_size).floor() as i32,
            (position.y / self.cell_size).floor() as i32,
            (position.z / self.cell_size).floor() as i32,
        )
    }
    
    fn update_node(&mut self, node_id: &str, position: &Position6D) {
        // Remove from old cells (if any)
        self.remove_node(node_id);
        
        // Add to new cell
        let key = self.get_cell_key(position);
        self.spatial_map.entry(key).or_insert_with(Vec::new).push(node_id.to_string());
    }
    
    fn remove_node(&mut self, node_id: &str) {
        // Remove from all cells (inefficient but simple)
        for (_, nodes) in self.spatial_map.iter_mut() {
            nodes.retain(|id| id != node_id);
        }
        
        // Clean up empty cells
        self.spatial_map.retain(|_, nodes| !nodes.is_empty());
    }
    
    fn get_nodes_in_radius(&self, center: &Position6D, radius: f64) -> Vec<String> {
        let center_key = self.get_cell_key(center);
        let cell_radius = (radius / self.cell_size).ceil() as i32;
        
        let mut result = Vec::new();
        
        for dx in -cell_radius..=cell_radius {
            for dy in -cell_radius..=cell_radius {
                for dz in -cell_radius..=cell_radius {
                    let key = (
                        center_key.0 + dx,
                        center_key.1 + dy,
                        center_key.2 + dz,
                    );
                    
                    if let Some(nodes) = self.spatial_map.get(&key) {
                        result.extend(nodes.clone());
                    }
                }
            }
        }
        
        result
    }
}

fn current_timestamp() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis() as u64
}

impl Default for WorldStateGraph {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_world_state_basic_operations() {
        let graph = WorldStateGraph::new();
        
        let node = StateNode {
            id: "test_entity".to_string(),
            position: Position6D::new(10.0, 20.0, 30.0, 100.0, 0.8, 0.5).unwrap(),
            node_type: NodeType::Entity,
            properties: {
                let mut props = HashMap::new();
                props.insert("name".to_string(), json!("Test Entity"));
                props
            },
            connections: HashSet::new(),
            last_updated: current_timestamp(),
            identity_id: None,
            timeline_id: None,
        };
        
        // Add node
        graph.update_node(node.clone()).unwrap();
        assert_eq!(graph.node_count(), 1);
        
        // Get node
        let retrieved = graph.get_node("test_entity").unwrap();
        assert_eq!(retrieved.id, "test_entity");
        
        // Update position
        let new_pos = Position6D::new(15.0, 25.0, 35.0, 101.0, 0.9, 0.6).unwrap();
        graph.update_position("test_entity", new_pos).unwrap();
        
        let updated = graph.get_node("test_entity").unwrap();
        assert_eq!(updated.position.x, 15.0);
        
        // Remove node
        graph.remove_node("test_entity").unwrap();
        assert_eq!(graph.node_count(), 0);
    }
}