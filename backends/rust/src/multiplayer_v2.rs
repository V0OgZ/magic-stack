// 🎮 MULTIPLAYER OFFICIAL CONTROLLER V2
// Version non-destructive qui enrichit l'orchestrator existant
// sans casser la compatibilité

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

// ===== NOUVELLES STRUCTURES V2 (additives) =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TemporalState {
    pub t_e: f64,           // Temps entité (local)
    pub day_hidden: u32,    // Jour caché actuel
    pub drift_rate: f64,    // Taux de drift actuel
    pub last_tick: u64,     // Dernier tick traité
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EnergyComplexV2 {
    pub a: f64,             // Énergie réelle (compatible V1)
    pub phi: Option<f64>,   // Phase/cohérence (NOUVEAU, optionnel)
    pub debt_a: f64,        // Dette énergétique
    pub a_max: f64,         // Maximum
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdentityV2 {
    pub psi_vector: Vec<f64>,      // Vecteur identité normalisé
    pub coherence: f64,             // Σ|ψ|² = 1
    pub entanglements: Vec<String>, // Clones liés
    pub interference_cache: HashMap<String, f64>, // Cache des interférences
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VisibilityV2 {
    pub opc_brut: Vec<(i32, i32)>,     // Zone atteignable par A
    pub opc_quality: HashMap<(i32, i32), f64>, // Qualité par position
    pub opc_effective: Vec<(i32, i32)>, // Effectif avec adversaires
    pub cf_level: f64,                  // Niveau de brouillard
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EntityV2 {
    // Champs V1 conservés
    pub id: String,
    pub position: (i32, i32),
    pub energy: f64,  // Reste compatible (= A)
    
    // NOUVEAUX champs V2 (optionnels pour backward compat)
    pub temporal: Option<TemporalState>,
    pub energy_complex: Option<EnergyComplexV2>,
    pub identity: Option<IdentityV2>,
    pub visibility: Option<VisibilityV2>,
}

// ===== RÉGULATEURS =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Regulators {
    pub vince: VinceRegulator,
    pub anna: AnnaRegulator,
    pub overload: OverloadRegulator,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VinceRegulator {
    pub active: bool,
    pub cooldown_remaining: f64,
    pub corridors: Vec<(i32, i32)>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnnaRegulator {
    pub active: bool,
    pub decay_rate: f64,
    pub targets: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OverloadRegulator {
    pub threshold: usize,
    pub last_trigger: u64,
}

// ===== CONTRÔLEUR PRINCIPAL =====

pub struct MultiplayerOfficialController {
    // Orchestrator V1 existant (on le garde !)
    pub orchestrator_sessions: Arc<RwLock<HashMap<String, serde_json::Value>>>,
    
    // Nouveaux états V2
    pub entities_v2: Arc<RwLock<HashMap<String, EntityV2>>>,
    pub regulators: Arc<RwLock<Regulators>>,
    pub world_time: Arc<RwLock<f64>>,  // t_w autoritaire
    pub trace_hashes: Arc<RwLock<Vec<String>>>,
    
    // Configuration
    pub config: ControllerConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ControllerConfig {
    pub v2_enabled: bool,           // Feature flag V2
    pub tick_ms: u64,               // 50ms par défaut
    pub drift_base: f64,            // 0.02 jour/heure
    pub debt_enabled: bool,         // Activer dette
    pub phi_enabled: bool,          // Activer phase
    pub regulators_enabled: bool,   // Activer régulateurs
}

impl Default for ControllerConfig {
    fn default() -> Self {
        Self {
            v2_enabled: true,
            tick_ms: 50,
            drift_base: 0.02,
            debt_enabled: true,
            phi_enabled: true,
            regulators_enabled: true,
        }
    }
}

impl MultiplayerOfficialController {
    pub fn new(
        orchestrator_sessions: Arc<RwLock<HashMap<String, serde_json::Value>>>,
        config: Option<ControllerConfig>,
    ) -> Self {
        Self {
            orchestrator_sessions,
            entities_v2: Arc::new(RwLock::new(HashMap::new())),
            regulators: Arc::new(RwLock::new(Regulators {
                vince: VinceRegulator {
                    active: false,
                    cooldown_remaining: 0.0,
                    corridors: vec![],
                },
                anna: AnnaRegulator {
                    active: false,
                    decay_rate: 0.05,
                    targets: vec![],
                },
                overload: OverloadRegulator {
                    threshold: 6,
                    last_trigger: 0,
                },
            })),
            world_time: Arc::new(RwLock::new(0.0)),
            trace_hashes: Arc::new(RwLock::new(Vec::new())),
            config: config.unwrap_or_default(),
        }
    }
    
    // ===== TICK PRINCIPAL (non-destructif) =====
    pub async fn tick(&self, dt_ms: u64) -> Result<TickResult, String> {
        // 1. Incrémenter temps monde
        let mut t_w = self.world_time.write().await;
        *t_w += dt_ms as f64 / 1000.0;
        let current_tw = *t_w;
        drop(t_w);
        
        // 2. Si V2 désactivé, juste retourner succès
        if !self.config.v2_enabled {
            return Ok(TickResult {
                world_time: current_tw,
                entities_updated: 0,
                regulators_triggered: vec![],
                trace_hash: "v1_mode".to_string(),
            });
        }
        
        // 3. Appliquer drift & énergie
        let mut entities = self.entities_v2.write().await;
        for (_id, entity) in entities.iter_mut() {
            self.apply_drift(entity, dt_ms);
            self.update_energy(entity, dt_ms);
            if self.config.phi_enabled {
                self.update_phi(entity, dt_ms);
            }
        }
        let entity_count = entities.len();
        drop(entities);
        
        // 4. Vérifier régulateurs
        let mut triggered = vec![];
        if self.config.regulators_enabled {
            triggered = self.check_regulators().await;
        }
        
        // 5. Calculer trace hash
        let trace = self.compute_trace_hash(current_tw).await;
        
        Ok(TickResult {
            world_time: current_tw,
            entities_updated: entity_count,
            regulators_triggered: triggered,
            trace_hash: trace,
        })
    }
    
    // ===== MÉTHODES V2 =====
    
    fn apply_drift(&self, entity: &mut EntityV2, dt_ms: u64) {
        if let Some(temporal) = &mut entity.temporal {
            let dt_hours = dt_ms as f64 / 3600000.0; // ms to hours
            let drift = self.config.drift_base * dt_hours;
            temporal.t_e += drift;
            
            // Régénération A via drift
            if let Some(energy) = &mut entity.energy_complex {
                let regen = drift * 2.0; // 2 A par jour de drift
                if energy.debt_a > 0.0 {
                    // D'abord rembourser dette
                    let repay = regen.min(energy.debt_a);
                    energy.debt_a -= repay;
                } else {
                    // Puis régénérer
                    energy.a = (energy.a + regen).min(energy.a_max);
                }
            }
        }
    }
    
    fn update_energy(&self, entity: &mut EntityV2, _dt_ms: u64) {
        // Synchroniser energy simple avec energy_complex.a
        if let Some(complex) = &entity.energy_complex {
            entity.energy = complex.a; // Backward compat
        }
    }
    
    fn update_phi(&self, entity: &mut EntityV2, dt_ms: u64) {
        if let Some(energy) = &mut entity.energy_complex {
            if let Some(phi) = &mut energy.phi {
                let lambda = 0.01; // Taux de décohérence
                let dt_s = dt_ms as f64 / 1000.0;
                *phi *= (-lambda * dt_s).exp(); // Décroissance exponentielle
                *phi = phi.max(-1.0).min(1.0); // Borner [-1, 1]
            }
        }
    }
    
    async fn check_regulators(&self) -> Vec<String> {
        let mut triggered = vec![];
        let entities = self.entities_v2.read().await;
        
        // Vince : Détection soft-lock
        let inactive_count = entities.values()
            .filter(|e| {
                if let Some(t) = &e.temporal {
                    t.drift_rate < 0.01 // Presque immobile
                } else {
                    false
                }
            })
            .count();
            
        if inactive_count > entities.len() / 2 {
            triggered.push("VINCE_SOFTLOCK".to_string());
            // TODO: Ouvrir couloirs
        }
        
        // Anna : Détection bunker
        for (id, entity) in entities.iter() {
            if let Some(energy) = &entity.energy_complex {
                if energy.a > energy.a_max * 0.9 {
                    // Trop d'accumulation
                    triggered.push(format!("ANNA_DECAY:{}", id));
                }
            }
        }
        
        // Overload : Détection surcharge
        let mut position_counts: HashMap<(i32, i32), usize> = HashMap::new();
        for entity in entities.values() {
            *position_counts.entry(entity.position).or_insert(0) += 1;
        }
        
        for (pos, count) in position_counts {
            if count >= 6 {
                triggered.push(format!("OVERLOAD:{:?}", pos));
                // TODO: Collapse canonique
            }
        }
        
        triggered
    }
    
    async fn compute_trace_hash(&self, t_w: f64) -> String {
        use sha2::{Sha256, Digest};
        let entities = self.entities_v2.read().await;
        
        let mut hasher = Sha256::new();
        hasher.update(t_w.to_le_bytes());
        
        // Hash déterministe des entités (triées par ID)
        let mut sorted_entities: Vec<_> = entities.iter().collect();
        sorted_entities.sort_by_key(|(id, _)| *id);
        
        for (id, entity) in sorted_entities {
            hasher.update(id.as_bytes());
            hasher.update(entity.position.0.to_le_bytes());
            hasher.update(entity.position.1.to_le_bytes());
            hasher.update(entity.energy.to_le_bytes());
        }
        
        format!("{:x}", hasher.finalize())
    }
    
    // ===== HELPERS POUR INTERFÉRENCES =====
    
    pub fn calculate_interference(&self, entity_a: &EntityV2, entity_b: &EntityV2) -> f64 {
        // I = ⟨ψ_a | ψ_b⟩ · exp(i(Φ_a - Φ_b))
        
        let psi_overlap = if let (Some(id_a), Some(id_b)) = (&entity_a.identity, &entity_b.identity) {
            // Produit scalaire des vecteurs psi
            id_a.psi_vector.iter()
                .zip(&id_b.psi_vector)
                .map(|(a, b)| a * b)
                .sum::<f64>()
        } else {
            0.0
        };
        
        let phase_factor = if let (Some(e_a), Some(e_b)) = (&entity_a.energy_complex, &entity_b.energy_complex) {
            if let (Some(phi_a), Some(phi_b)) = (e_a.phi, e_b.phi) {
                // Simplification : on prend juste la magnitude
                ((phi_a - phi_b).abs()).exp()
            } else {
                1.0
            }
        } else {
            1.0
        };
        
        (psi_overlap * phase_factor).abs().min(1.0)
    }
    
    pub fn get_interference_effect(&self, interference: f64) -> InterferenceEffect {
        if interference >= 0.75 {
            InterferenceEffect::FullClone
        } else if interference >= 0.50 {
            InterferenceEffect::WeakClone
        } else if interference >= 0.25 {
            InterferenceEffect::TemporaryBuff
        } else {
            InterferenceEffect::Dissipation
        }
    }
}

// ===== TYPES DE RÉSULTAT =====

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TickResult {
    pub world_time: f64,
    pub entities_updated: usize,
    pub regulators_triggered: Vec<String>,
    pub trace_hash: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum InterferenceEffect {
    FullClone,      // Clone complet avec carte TCG
    WeakClone,      // Clone affaibli
    TemporaryBuff,  // Buff temporaire
    Dissipation,    // Disparition
}


