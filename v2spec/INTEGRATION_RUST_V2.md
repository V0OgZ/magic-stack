# 🦀 GUIDE D'INTÉGRATION RUST - MULTIPLAYER V2
## Comment brancher le nouveau contrôleur SANS CASSER l'existant

---

## 📦 **ÉTAPE 1 : AJOUTER LE MODULE**

### Dans `src/main.rs`, ajouter :
```rust
// Ajouter en haut avec les autres modules
mod multiplayer_v2;
use multiplayer_v2::{
    MultiplayerOfficialController, 
    ControllerConfig,
    tick_v2,
    get_entity_v2,
    migrate_entity_to_v2
};
```

### Dans la fonction `main()`, après l'init de l'orchestrator :
```rust
// EXISTANT - On garde !
let orchestrator_sessions = Arc::new(RwLock::new(HashMap::new()));

// NOUVEAU - On ajoute le contrôleur V2
let v2_controller = Arc::new(MultiplayerOfficialController::new(
    orchestrator_sessions.clone(), // Partage avec l'orchestrator
    Some(ControllerConfig {
        v2_enabled: true,        // Activé par défaut
        tick_ms: 50,
        drift_base: 0.02,
        debt_enabled: true,
        phi_enabled: true,
        regulators_enabled: true,
    })
));
```

---

## 🛣️ **ÉTAPE 2 : AJOUTER LES ROUTES**

### Dans le Router, APRÈS les routes existantes :
```rust
let app = Router::new()
    // ... TOUTES VOS ROUTES EXISTANTES (on touche PAS) ...
    
    // === NOUVELLES ROUTES V2 (à la fin) ===
    .route("/api/v2/tick", post(tick_v2))
    .route("/api/v2/entity/:id", get(get_entity_v2))
    .route("/api/v2/migrate-entity", post(migrate_entity_to_v2))
    .route("/api/v2/interference", post(calculate_interference_endpoint))
    .route("/api/v2/config", get(get_v2_config))
    
    // Passer le contrôleur V2 dans l'état (avec les autres)
    .with_state(AppStateV2 {
        // Vos états existants
        qstar_engine,
        world_state,
        java_connector,
        // ...
        
        // NOUVEAU
        v2_controller, // Ajouter ici
    });
```

---

## 🔧 **ÉTAPE 3 : ENRICHIR L'APPSTATE**

### Option A : Créer un nouveau AppStateV2
```rust
#[derive(Clone)]
struct AppStateV2 {
    // Tous vos champs existants
    pub qstar_engine: Arc<RwLock<QStarEngine>>,
    pub world_state: Arc<WorldStateGraph>,
    pub java_connector: Arc<JavaConnector>,
    // ...
    
    // NOUVEAU champ
    pub v2_controller: Arc<MultiplayerOfficialController>,
}
```

### Option B : Étendre l'AppState existant
```rust
// Dans votre AppState actuel, ajouter :
pub v2_controller: Option<Arc<MultiplayerOfficialController>>,
```

---

## 🔄 **ÉTAPE 4 : BRANCHER LE TICK**

### Option 1 : Tick automatique (recommandé)
```rust
// Après avoir lancé le serveur, dans main()
tokio::spawn(async move {
    let controller = v2_controller.clone();
    let mut interval = tokio::time::interval(Duration::from_millis(50));
    
    loop {
        interval.tick().await;
        
        // Tick V2 automatique
        if let Err(e) = controller.tick(50).await {
            warn!("V2 tick error: {}", e);
        }
    }
});
```

### Option 2 : Tick manuel via endpoint
```rust
// L'endpoint /api/v2/tick permet de déclencher manuellement
POST /api/v2/tick
```

---

## 🔌 **ÉTAPE 5 : CONNECTER AVEC L'ORCHESTRATOR**

### Dans les handlers orchestrator existants :
```rust
// Dans votre handler orc_intent existant
async fn orc_intent(
    State(state): State<AppStateV2>,
    Json(intent): Json<IntentRequest>,
) -> Json<serde_json::Value> {
    // VOTRE CODE EXISTANT
    let result = process_intent(intent);
    
    // NOUVEAU : Notifier le contrôleur V2
    if let Some(entity_id) = intent.entity_id {
        // Migrer automatiquement l'entité si pas déjà fait
        state.v2_controller.auto_migrate_if_needed(&entity_id).await;
    }
    
    // Retourner le résultat (compatible V1)
    result
}
```

---

## 📊 **ÉTAPE 6 : ENDPOINTS HELPER**

### Ajouter ces endpoints utiles :
```rust
// Config endpoint pour le front
async fn get_v2_config(
    State(state): State<AppStateV2>,
) -> Json<serde_json::Value> {
    Json(json!({
        "v2_enabled": state.v2_controller.config.v2_enabled,
        "features": {
            "temporal": state.v2_controller.config.v2_enabled,
            "phi": state.v2_controller.config.phi_enabled,
            "regulators": state.v2_controller.config.regulators_enabled,
        },
        "tick_ms": state.v2_controller.config.tick_ms,
    }))
}

// Calcul d'interférence
async fn calculate_interference_endpoint(
    State(state): State<AppStateV2>,
    Json(req): Json<InterferenceRequest>,
) -> Json<serde_json::Value> {
    let entities = state.v2_controller.entities_v2.read().await;
    
    if let (Some(a), Some(b)) = (
        entities.get(&req.entity_a),
        entities.get(&req.entity_b)
    ) {
        let interference = state.v2_controller.calculate_interference(a, b);
        let effect = state.v2_controller.get_interference_effect(interference);
        
        Json(json!({
            "success": true,
            "interference": interference,
            "effect": effect,
        }))
    } else {
        Json(json!({
            "success": false,
            "error": "Entities not found"
        }))
    }
}
```

---

## 🧪 **ÉTAPE 7 : TESTER**

### Test basique dans le terminal :
```bash
# 1. Vérifier que V2 est actif
curl http://localhost:3001/api/v2/config

# 2. Migrer une entité
curl -X POST http://localhost:3001/api/v2/migrate-entity \
  -H "Content-Type: application/json" \
  -d '{"id": "test_hero", "x": 10, "y": 20, "energy": 100}'

# 3. Déclencher un tick
curl -X POST http://localhost:3001/api/v2/tick

# 4. Récupérer l'entité enrichie
curl http://localhost:3001/api/v2/entity/test_hero
```

### Test avec le script Python :
```bash
# Utiliser le script de test fourni
python3 test_v2_controller.py
```

---

## ⚠️ **POINTS D'ATTENTION**

### 1. Dépendances Cargo.toml
```toml
# Ajouter si pas déjà présent
sha2 = "0.10"        # Pour trace_hash
```

### 2. Compilation
```bash
# Si erreurs de compilation
cargo clean
cargo build --release
```

### 3. Feature flags
```rust
// Pour désactiver V2 temporairement
let config = ControllerConfig {
    v2_enabled: false, // ← Désactive tout V2
    ...
};
```

---

## 🎯 **CHECKLIST D'INTÉGRATION**

- [ ] Module multiplayer_v2.rs ajouté
- [ ] Routes V2 ajoutées au Router
- [ ] AppState étendu avec v2_controller
- [ ] Tick automatique ou manuel configuré
- [ ] Config endpoint disponible
- [ ] Tests basiques passent
- [ ] Anciens endpoints V1 fonctionnent toujours
- [ ] Front peut ignorer les nouveaux champs

---

## 💡 **EXEMPLE COMPLET MINIMAL**

```rust
// main.rs (ajouts seulement)
mod multiplayer_v2;

#[tokio::main]
async fn main() {
    // ... init existante ...
    
    // Créer contrôleur V2
    let v2_controller = Arc::new(
        multiplayer_v2::MultiplayerOfficialController::new(
            orchestrator_sessions.clone(),
            None, // Config par défaut
        )
    );
    
    // Ajouter routes V2
    let app = Router::new()
        // ... routes existantes ...
        .route("/api/v2/tick", post(multiplayer_v2::tick_v2))
        .route("/api/v2/entity/:id", get(multiplayer_v2::get_entity_v2))
        .route("/api/v2/migrate-entity", post(multiplayer_v2::migrate_entity_to_v2))
        .with_state(AppState {
            // ... états existants ...
            v2_controller: Some(v2_controller.clone()),
        });
    
    // Lancer tick auto
    let tick_controller = v2_controller.clone();
    tokio::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_millis(50));
        loop {
            interval.tick().await;
            let _ = tick_controller.tick(50).await;
        }
    });
    
    // ... lancer serveur ...
}
```

---

## 🚀 **RÉSULTAT**

Avec cette intégration :
- ✅ **100% backward compatible** : V1 continue de marcher
- ✅ **Migration progressive** : Entités migrées une par une
- ✅ **Feature flags** : Activer/désactiver à volonté
- ✅ **Pas de refactor** : On ajoute, on ne modifie pas
- ✅ **Front compatible** : Peut ignorer les nouveaux champs

---

*Guide créé pour une intégration en douceur*
*Questions ? → Discord #backend-v2*
