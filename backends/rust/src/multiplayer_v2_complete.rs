// 🎮 MULTIPLAYER OFFICIAL CONTROLLER V2 - COMPLETE IMPLEMENTATION
// Toutes les features V2 implémentées

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use sha2::{Sha256, Digest};

// ===== STRUCTURES V2 =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TemporalState {
    pub t_e: f64,           // Temps entité (local)
    pub t_w: f64,           // Temps monde (serveur)
    pub drift: f64,         // Δt = t_e - t_w
    pub day_hidden: u32,    // Jour caché
    pub drift_rate: f64,    // Taux de drift par tick
    pub last_tick: u64,     // Dernier tick traité
    pub trace_hash: String, // Hash de la trace temporelle
}

impl TemporalState {
    pub fn update_drift(&mut self, dt_ms: f64, passive_drift: f64) {
        // Drift passif selon la formule V2
        self.drift += passive_drift * (dt_ms / 1000.0);
        self.t_e = self.t_w + self.drift;
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EnergyComplexV2 {
    pub a: f64,             // Énergie réelle (action points)
    pub phi: f64,           // Phase/cohérence imaginaire
    pub debt_a: f64,        // Dette énergétique
    pub a_max: f64,         // Maximum théorique
}

impl EnergyComplexV2 {
    pub fn magnitude(&self) -> f64 {
        (self.a * self.a + self.phi * self.phi).sqrt()
    }

    pub fn apply_debt(&mut self, amount: f64) {
        self.debt_a += amount;
        self.a = (self.a - amount).max(0.0);
    }

    pub fn regenerate(&mut self, rate: f64, dt_s: f64) {
        let regen = rate * dt_s;
        if self.debt_a > 0.0 {
            // Rembourser dette d'abord
            let repay = regen.min(self.debt_a);
            self.debt_a -= repay;
            self.a += regen - repay;
        } else {
            self.a = (self.a + regen).min(self.a_max);
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdentityV2 {
    pub psi_vector: Vec<f64>,      // |ψ⟩ normalisé
    pub coherence: f64,             // Σ|ψ|² = 1
    pub entanglements: Vec<String>, // IDs des clones
    pub interference_cache: HashMap<String, f64>,
}

impl IdentityV2 {
    pub fn normalize(&mut self) {
        let norm = self.psi_vector.iter().map(|x| x * x).sum::<f64>().sqrt();
        if norm > 0.0 {
            for component in &mut self.psi_vector {
                *component /= norm;
            }
        }
        self.coherence = 1.0;
    }

    pub fn compute_interference(&self, other: &IdentityV2, phi_diff: f64) -> f64 {
        // I = cos(Δφ) * ⟨ψ₁|ψ₂⟩
        let overlap: f64 = self.psi_vector.iter()
            .zip(&other.psi_vector)
            .map(|(a, b)| a * b)
            .sum();
        
        overlap * phi_diff.cos()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VisibilityV2 {
    pub opc_brut: Vec<(i32, i32)>,
    pub opc_quality: HashMap<(i32, i32), f64>,
    pub opc_effective: Vec<(i32, i32)>,
    pub cf_level: f64,  // Brouillard de causalité
}

impl VisibilityV2 {
    pub fn apply_fog(&mut self, base_fog: f64, distance: f64) {
        // CF augmente avec la distance
        self.cf_level = base_fog * (1.0 + distance / 10.0);
        self.cf_level = self.cf_level.min(1.0);
    }

    pub fn pierce_fog(&mut self, pierce_strength: f64) {
        self.cf_level = (self.cf_level - pierce_strength).max(0.0);
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EntityV2 {
    pub id: String,
    pub position: (i32, i32),
    pub level: u32,
    
    // V2 features
    pub temporal: TemporalState,
    pub energy_complex: EnergyComplexV2,
    pub identity: IdentityV2,
    pub visibility: VisibilityV2,
    
    // Méta
    pub last_action: String,
    pub created_at: u64,
}

// ===== RÉGULATEURS =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VinceRegulator {
    pub active: bool,
    pub pierce_strength: f64,
    pub cooldown: f64,
    pub corridors: Vec<(i32, i32)>,
}

impl VinceRegulator {
    pub fn activate(&mut self, target: &mut VisibilityV2) {
        if self.cooldown <= 0.0 && self.active {
            target.pierce_fog(self.pierce_strength);
            self.cooldown = 60.0; // 60s cooldown
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnnaRegulator {
    pub active: bool,
    pub decay_rate: f64,
    pub idle_threshold: f64,
    pub targets: Vec<String>,
}

impl AnnaRegulator {
    pub fn apply_decay(&self, entity: &mut EntityV2, dt_s: f64) {
        if self.active && self.targets.contains(&entity.id) {
            entity.energy_complex.a *= 1.0 - (self.decay_rate * dt_s);
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OverloadRegulator {
    pub threshold: usize,
    pub collapse_strength: f64,
    pub last_trigger: u64,
}

impl OverloadRegulator {
    pub fn check_collapse(&mut self, stack_size: usize, tick: u64) -> bool {
        if stack_size > self.threshold && tick - self.last_trigger > 100 {
            self.last_trigger = tick;
            return true;
        }
        false
    }
}

// ===== CONFIGURATION =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct V2Config {
    pub phi_enabled: bool,
    pub drift_enabled: bool,
    pub regulators_enabled: bool,
    pub debt_enabled: bool,
    pub passive_drift_rate: f64,
    pub base_fog_level: f64,
    pub interference_threshold: f64,
}

impl Default for V2Config {
    fn default() -> Self {
        V2Config {
            phi_enabled: true,
            drift_enabled: true,
            regulators_enabled: true,
            debt_enabled: true,
            passive_drift_rate: 0.01,
            base_fog_level: 0.3,
            interference_threshold: 0.5,
        }
    }
}

// ===== CONTRÔLEUR PRINCIPAL =====

pub struct MultiplayerOfficialController {
    pub entities: Arc<RwLock<HashMap<String, EntityV2>>>,
    pub vince: Arc<RwLock<VinceRegulator>>,
    pub anna: Arc<RwLock<AnnaRegulator>>,
    pub overload: Arc<RwLock<OverloadRegulator>>,
    pub world_time: Arc<RwLock<f64>>,
    pub tick_count: Arc<RwLock<u64>>,
    pub config: V2Config,
}

impl MultiplayerOfficialController {
    pub fn new(config: Option<V2Config>) -> Self {
        Self {
            entities: Arc::new(RwLock::new(HashMap::new())),
            vince: Arc::new(RwLock::new(VinceRegulator {
                active: true,
                pierce_strength: 0.5,
                cooldown: 0.0,
                corridors: vec![],
            })),
            anna: Arc::new(RwLock::new(AnnaRegulator {
                active: true,
                decay_rate: 0.05,
                idle_threshold: 60.0,
                targets: vec![],
            })),
            overload: Arc::new(RwLock::new(OverloadRegulator {
                threshold: 10,
                collapse_strength: 0.7,
                last_trigger: 0,
            })),
            world_time: Arc::new(RwLock::new(0.0)),
            tick_count: Arc::new(RwLock::new(0)),
            config: config.unwrap_or_default(),
        }
    }

    // === TICK PRINCIPAL ===
    pub async fn tick(&self, dt_ms: u64) -> Result<serde_json::Value, String> {
        let dt_s = dt_ms as f64 / 1000.0;
        
        // Update world time
        {
            let mut t_w = self.world_time.write().await;
            *t_w += dt_s;
        }
        
        let mut tick = self.tick_count.write().await;
        *tick += 1;
        
        let mut entities = self.entities.write().await;
        let mut updates = vec![];
        
        for (id, entity) in entities.iter_mut() {
            // 1. DRIFT TEMPOREL
            if self.config.drift_enabled {
                entity.temporal.t_w = *self.world_time.read().await;
                entity.temporal.update_drift(dt_ms as f64, self.config.passive_drift_rate);
            }
            
            // 2. RÉGÉNÉRATION ÉNERGIE
            entity.energy_complex.regenerate(1.0, dt_s);
            
            // 3. RÉGULATEUR ANNA (decay)
            if self.config.regulators_enabled {
                let anna = self.anna.read().await;
                anna.apply_decay(entity, dt_s);
            }
            
            // 4. MISE À JOUR BROUILLARD
            let distance = ((entity.position.0.pow(2) + entity.position.1.pow(2)) as f64).sqrt();
            entity.visibility.apply_fog(self.config.base_fog_level, distance);
            
            // 5. NORMALISATION IDENTITÉ
            entity.identity.normalize();
            
            updates.push(serde_json::json!({
                "id": id,
                "drift": entity.temporal.drift,
                "energy": entity.energy_complex.a,
                "phi": entity.energy_complex.phi,
                "debt": entity.energy_complex.debt_a,
                "fog": entity.visibility.cf_level,
                "coherence": entity.identity.coherence,
            }));
        }
        
        // 6. VÉRIFIER OVERLOAD
        if self.config.regulators_enabled {
            let mut overload = self.overload.write().await;
            if overload.check_collapse(entities.len(), *tick) {
                // Collapse le plus ancien
                if let Some(oldest_id) = entities.keys().next().cloned() {
                    entities.remove(&oldest_id);
                    updates.push(serde_json::json!({
                        "event": "overload_collapse",
                        "entity": oldest_id,
                    }));
                }
            }
        }
        
        Ok(serde_json::json!({
            "tick": *tick,
            "world_time": *self.world_time.read().await,
            "entities_count": entities.len(),
            "updates": updates,
        }))
    }

    // === CRÉER ENTITÉ ===
    pub async fn create_entity(&self, id: String, pos: (i32, i32)) -> EntityV2 {
        let t_w = *self.world_time.read().await;
        
        let entity = EntityV2 {
            id: id.clone(),
            position: pos,
            level: 1,
            temporal: TemporalState {
                t_e: t_w,
                t_w,
                drift: 0.0,
                day_hidden: 1,
                drift_rate: self.config.passive_drift_rate,
                last_tick: *self.tick_count.read().await,
                trace_hash: self.compute_hash(&id),
            },
            energy_complex: EnergyComplexV2 {
                a: 100.0,
                phi: 0.0,
                debt_a: 0.0,
                a_max: 150.0,
            },
            identity: IdentityV2 {
                psi_vector: vec![1.0, 0.0, 0.0, 0.0],
                coherence: 1.0,
                entanglements: vec![],
                interference_cache: HashMap::new(),
            },
            visibility: VisibilityV2 {
                opc_brut: vec![pos],
                opc_quality: HashMap::new(),
                opc_effective: vec![pos],
                cf_level: self.config.base_fog_level,
            },
            last_action: "created".to_string(),
            created_at: *self.tick_count.read().await,
        };
        
        self.entities.write().await.insert(id, entity.clone());
        entity
    }

    // === CALCULER INTERFÉRENCE ===
    pub async fn compute_interference(&self, id1: &str, id2: &str) -> f64 {
        let entities = self.entities.read().await;
        
        if let (Some(e1), Some(e2)) = (entities.get(id1), entities.get(id2)) {
            let phi_diff = (e1.energy_complex.phi - e2.energy_complex.phi).abs();
            e1.identity.compute_interference(&e2.identity, phi_diff)
        } else {
            0.0
        }
    }

    // === FORK (créer clone) ===
    pub async fn fork_entity(&self, original_id: &str) -> Result<EntityV2, String> {
        let entities = self.entities.read().await;
        
        if let Some(original) = entities.get(original_id) {
            let fork_id = format!("{}_fork_{}", original_id, self.tick_count.read().await);
            let mut fork = original.clone();
            
            fork.id = fork_id.clone();
            fork.energy_complex.a /= 2.0;  // Divise l'énergie
            fork.energy_complex.phi += std::f64::consts::PI / 2.0; // Déphasage
            fork.identity.entanglements.push(original_id.to_string());
            fork.temporal.drift += 1.0; // Fork dans le futur
            
            drop(entities);
            self.entities.write().await.insert(fork_id, fork.clone());
            
            Ok(fork)
        } else {
            Err("Entity not found".to_string())
        }
    }

    // === MERGE (fusionner clones) ===
    pub async fn merge_entities(&self, id1: &str, id2: &str) -> Result<EntityV2, String> {
        let mut entities = self.entities.write().await;
        
        if let (Some(e1), Some(e2)) = (entities.remove(id1), entities.remove(id2)) {
            let merged_id = format!("{}_{}_merged", id1, id2);
            
            let merged = EntityV2 {
                id: merged_id.clone(),
                position: e1.position, // Garde position de e1
                level: e1.level.max(e2.level),
                temporal: TemporalState {
                    t_e: (e1.temporal.t_e + e2.temporal.t_e) / 2.0,
                    t_w: e1.temporal.t_w,
                    drift: (e1.temporal.drift + e2.temporal.drift) / 2.0,
                    day_hidden: e1.temporal.day_hidden.max(e2.temporal.day_hidden),
                    drift_rate: self.config.passive_drift_rate,
                    last_tick: *self.tick_count.read().await,
                    trace_hash: self.compute_hash(&merged_id),
                },
                energy_complex: EnergyComplexV2 {
                    a: e1.energy_complex.a + e2.energy_complex.a,
                    phi: (e1.energy_complex.phi + e2.energy_complex.phi) / 2.0,
                    debt_a: e1.energy_complex.debt_a + e2.energy_complex.debt_a,
                    a_max: e1.energy_complex.a_max.max(e2.energy_complex.a_max),
                },
                identity: IdentityV2 {
                    psi_vector: e1.identity.psi_vector.iter()
                        .zip(&e2.identity.psi_vector)
                        .map(|(a, b)| (a + b) / 2.0)
                        .collect(),
                    coherence: 1.0,
                    entanglements: vec![],
                    interference_cache: HashMap::new(),
                },
                visibility: VisibilityV2 {
                    opc_brut: e1.visibility.opc_brut,
                    opc_quality: e1.visibility.opc_quality,
                    opc_effective: e1.visibility.opc_effective,
                    cf_level: e1.visibility.cf_level.min(e2.visibility.cf_level),
                },
                last_action: "merged".to_string(),
                created_at: *self.tick_count.read().await,
            };
            
            entities.insert(merged_id, merged.clone());
            Ok(merged)
        } else {
            Err("One or both entities not found".to_string())
        }
    }

    // === ACTIVER RÉGULATEUR VINCE ===
    pub async fn activate_vince(&self, entity_id: &str) -> Result<(), String> {
        let mut entities = self.entities.write().await;
        let mut vince = self.vince.write().await;
        
        if let Some(entity) = entities.get_mut(entity_id) {
            vince.activate(&mut entity.visibility);
            Ok(())
        } else {
            Err("Entity not found".to_string())
        }
    }

    // === HELPERS ===
    fn compute_hash(&self, input: &str) -> String {
        let mut hasher = Sha256::new();
        hasher.update(input.as_bytes());
        format!("{:x}", hasher.finalize())
    }

    pub async fn get_status(&self) -> serde_json::Value {
        let entities = self.entities.read().await;
        let vince = self.vince.read().await;
        let anna = self.anna.read().await;
        let overload = self.overload.read().await;
        
        serde_json::json!({
            "world_time": *self.world_time.read().await,
            "tick": *self.tick_count.read().await,
            "entities_count": entities.len(),
            "regulators": {
                "vince": {
                    "active": vince.active,
                    "cooldown": vince.cooldown,
                },
                "anna": {
                    "active": anna.active,
                    "targets": anna.targets.len(),
                },
                "overload": {
                    "threshold": overload.threshold,
                    "last_trigger": overload.last_trigger,
                }
            },
            "config": serde_json::to_value(&self.config).unwrap(),
        })
    }
}

// === TESTS ===
#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_entity_creation() {
        let controller = MultiplayerOfficialController::new(None);
        let entity = controller.create_entity("test".to_string(), (0, 0)).await;
        
        assert_eq!(entity.id, "test");
        assert_eq!(entity.energy_complex.a, 100.0);
        assert_eq!(entity.temporal.drift, 0.0);
    }

    #[tokio::test]
    async fn test_drift_accumulation() {
        let controller = MultiplayerOfficialController::new(None);
        controller.create_entity("drift_test".to_string(), (0, 0)).await;
        
        // Tick 1000ms
        controller.tick(1000).await.unwrap();
        
        let entities = controller.entities.read().await;
        let entity = entities.get("drift_test").unwrap();
        
        // Drift should have increased
        assert!(entity.temporal.drift > 0.0);
    }

    #[tokio::test]
    async fn test_fork_and_merge() {
        let controller = MultiplayerOfficialController::new(None);
        controller.create_entity("original".to_string(), (0, 0)).await;
        
        // Fork
        let fork = controller.fork_entity("original").await.unwrap();
        assert!(fork.id.contains("fork"));
        assert_eq!(fork.energy_complex.a, 50.0); // Half energy
        
        // Merge
        let merged = controller.merge_entities("original", &fork.id).await.unwrap();
        assert!(merged.id.contains("merged"));
        assert_eq!(merged.energy_complex.a, 100.0); // Combined energy
    }

    #[tokio::test]
    async fn test_interference() {
        let controller = MultiplayerOfficialController::new(None);
        controller.create_entity("e1".to_string(), (0, 0)).await;
        controller.create_entity("e2".to_string(), (1, 0)).await;
        
        let interference = controller.compute_interference("e1", "e2").await;
        assert!(interference >= -1.0 && interference <= 1.0);
    }
}
