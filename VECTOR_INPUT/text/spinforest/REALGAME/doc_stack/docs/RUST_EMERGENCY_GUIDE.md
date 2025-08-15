# 🦀🔧 GUIDE D'URGENCE RUST - MAGICSTACK
## 🎯 Pour Chef Non-Rustacé - Dépannage & Maintenance

*Guide de survie technique pour gérer MagicStack Rust sans connaître le langage*

---

## 🚨 **URGENCE? COMMANDES RAPIDES**

### ⚡ **Diagnostic Express (30 secondes)**
```bash
# 1. Status du service Rust
curl -s http://localhost:3001/health || echo "❌ RUST OFFLINE"

# 2. Vérifier si le processus tourne
ps aux | grep magic-stack-backend || echo "❌ PROCESSUS MORT"

# 3. Voir les logs d'erreur récents
tail -50 /workspace/magic-stack-backend/target/debug.log

# 4. Redémarrage d'urgence
cd /workspace/magic-stack-backend && cargo run &
```

### 🔥 **Actions de Survie**
```bash
# Si tout plante - Restart complet
./magic-menu.sh stop
./magic-menu.sh start

# Si erreur de compilation
cd /workspace/magic-stack-backend
cargo clean
cargo build

# Si port occupé
sudo lsof -i :3001
sudo kill -9 [PID_DU_PROCESSUS]
```

---

## 🏗️ **COMPRENDRE L'ARCHITECTURE RUST**

### 📁 **Structure MagicStack (Ce Qui Compte)**
```
magic-stack-backend/
├── 📄 Cargo.toml           ⭐ FICHIER CLÉ - Dépendances & config
├── 📄 Cargo.lock           🔒 Versions figées (NE PAS TOUCHER)
├── 📂 src/                 💻 Code source
│   ├── 📄 main.rs          🎯 Point d'entrée (comme main.java)
│   ├── 📄 lib.rs           📚 Bibliothèque principale
│   ├── 📂 handlers/        🔌 Endpoints API (comme Controllers)
│   ├── 📂 models/          📊 Structures de données
│   ├── 📂 services/        ⚙️ Logique métier
│   └── 📂 utils/           🛠️ Utilitaires
├── 📂 target/              🏗️ Fichiers compilés (peut être supprimé)
└── 📄 debug.log            📋 Logs d'erreur
```

### 🎯 **Fichiers Critiques à Surveiller**

#### 1️⃣ **Cargo.toml** - Configuration Principale
```toml
[package]
name = "magic-stack-backend"    # Nom du projet
version = "0.1.0"              # Version
edition = "2021"               # Version Rust

[dependencies]                  # ⭐ DÉPENDANCES CRITIQUES
tokio = { version = "1", features = ["full"] }     # Async runtime
warp = "0.3"                   # Serveur web
serde = { version = "1.0", features = ["derive"] } # JSON
serde_json = "1.0"             # JSON parsing
uuid = { version = "1.0", features = ["v4"] }      # IDs uniques
chrono = { version = "0.4", features = ["serde"] } # Dates/temps

# 🚨 Si une dépendance manque, ajouter ici et faire: cargo build
```

#### 2️⃣ **src/main.rs** - Point d'Entrée
```rust
// Ce fichier démarre tout - comme public static void main en Java
use warp::Filter;

#[tokio::main]  // ⭐ Démarre le runtime asynchrone
async fn main() {
    println!("🔮 Démarrage MagicStack Rust...");
    
    // Configuration des routes API
    let routes = api_routes()
        .with(warp::cors().allow_any_origin());
    
    // Démarrage serveur sur port 3001
    warp::serve(routes)
        .run(([127, 0, 0, 1], 3001))  // localhost:3001
        .await;
}
```

---

## 🔍 **DIAGNOSTIC AVANCÉ**

### 📊 **Comprendre les Logs Rust**
```bash
# Logs en temps réel
tail -f /workspace/magic-stack-backend/target/debug.log

# Types d'erreurs courantes:
```

#### ❌ **Erreurs de Compilation**
```
error[E0425]: cannot find value `variable_name` in this scope
  --> src/main.rs:42:13
   |
42 |     let x = variable_name;
   |             ^^^^^^^^^^^^^ not found in this scope
```
**🔧 Solution**: Variable non déclarée - vérifier l'orthographe

#### ❌ **Erreurs de Dépendances**
```
error: failed to resolve dependencies
Caused by: no matching package named `missing_crate`
```
**🔧 Solution**: Ajouter la dépendance dans `Cargo.toml`

#### ❌ **Erreurs de Port**
```
thread 'main' panicked at 'error binding to 0.0.0.0:3001: Address already in use'
```
**🔧 Solution**: Port occupé - tuer le processus ou changer de port

### 🛠️ **Commandes de Debug**

#### 🔍 **Vérification Système**
```bash
# Version Rust installée
rustc --version

# Vérifier Cargo (gestionnaire de packages)
cargo --version

# Tester la compilation sans lancer
cd /workspace/magic-stack-backend
cargo check

# Compilation avec détails
cargo build --verbose

# Tests unitaires
cargo test
```

#### 📋 **Monitoring Runtime**
```bash
# Processus Rust actifs
ps aux | grep magic-stack

# Ports utilisés
netstat -tulpn | grep :3001

# Mémoire utilisée par Rust
top -p $(pgrep magic-stack)

# Connexions actives sur l'API
ss -tulpn | grep :3001
```

---

## 🚨 **RÉSOLUTION PROBLÈMES COURANTS**

### 1️⃣ **"Rust Backend Offline"**
```bash
# Diagnostic
cd /workspace/magic-stack-backend
cargo check  # Vérifier erreurs de compilation

# Si erreurs de compilation
cargo clean   # Nettoyer cache
cargo build   # Recompiler

# Si pas d'erreurs mais ne démarre pas
RUST_LOG=debug cargo run  # Démarrer avec logs détaillés
```

### 2️⃣ **"Port 3001 Already in Use"**
```bash
# Trouver qui utilise le port
sudo lsof -i :3001

# Tuer le processus
sudo kill -9 [PID]

# Ou changer le port dans main.rs:
# .run(([127, 0, 0, 1], 3002))  # Port 3002 au lieu de 3001
```

### 3️⃣ **"Compilation Failed"**
```bash
# Nettoyer complètement
cargo clean
rm -rf target/

# Réinstaller dépendances
cargo update
cargo build

# Si ça ne marche toujours pas
rustup update  # Mettre à jour Rust
```

### 4️⃣ **"API Returns 500 Error"**
```bash
# Voir logs d'erreur détaillés
RUST_LOG=error cargo run

# Tester endpoint spécifique
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test","center_x":0,"center_y":0,"center_z":0,"radius":10}'
```

### 5️⃣ **"Memory Leak / High CPU"**
```bash
# Monitoring ressources
htop -p $(pgrep magic-stack)

# Profiling (si installé)
cargo install flamegraph
cargo flamegraph --bin magic-stack-backend

# Redémarrage préventif
./magic-menu.sh restart
```

---

## 🔧 **MAINTENANCE PRÉVENTIVE**

### 📅 **Routine Quotidienne**
```bash
# 1. Vérifier status
curl -s http://localhost:3001/health

# 2. Vérifier logs pour erreurs
grep -i error /workspace/magic-stack-backend/target/debug.log | tail -10

# 3. Vérifier espace disque (target/ peut grossir)
du -sh /workspace/magic-stack-backend/target/

# 4. Nettoyer si > 1GB
cd /workspace/magic-stack-backend && cargo clean
```

### 📊 **Routine Hebdomadaire**
```bash
# 1. Mettre à jour dépendances
cd /workspace/magic-stack-backend
cargo update

# 2. Tester compilation
cargo check

# 3. Lancer tests
cargo test

# 4. Redémarrer pour appliquer updates
./magic-menu.sh restart
```

---

## 📚 **COMPRENDRE LE CODE (SANS RUST)**

### 🎯 **Patterns Rust vs Autres Langages**

#### **Déclaration Variables**
```rust
// Rust
let name = "Claude";           // Immutable (comme final en Java)
let mut count = 0;            // Mutable (modifiable)

// Équivalent Java
final String name = "Claude";
int count = 0;
```

#### **Fonctions**
```rust
// Rust
fn calculate_damage(power: i32) -> i32 {
    power * 2
}

// Équivalent Java
public int calculateDamage(int power) {
    return power * 2;
}
```

#### **Gestion Erreurs**
```rust
// Rust
match result {
    Ok(value) => println!("Success: {}", value),
    Err(error) => println!("Error: {}", error),
}

// Équivalent Java try/catch
try {
    System.out.println("Success: " + value);
} catch (Exception error) {
    System.out.println("Error: " + error);
}
```

#### **API Endpoints**
```rust
// Rust (avec Warp)
let search = warp::path("api")
    .and(warp::path("search"))
    .and(warp::post())
    .and(json_body())
    .and_then(handle_search);

// Équivalent Spring Boot
@PostMapping("/api/search")
public ResponseEntity handleSearch(@RequestBody SearchRequest request) {
    // ...
}
```

---

## 🔌 **ENDPOINTS MAGICSTACK RUST**

### 📋 **API Disponible**
```bash
# Health Check
GET http://localhost:3001/health
# Response: {"status": "ok", "service": "magicstack"}

# Recherche 6D
POST http://localhost:3001/api/search
{
  "query": "fireball",
  "center_x": 0, "center_y": 0, "center_z": 0,
  "center_t": 0, "center_c": 0, "center_psi": 0,
  "radius": 100
}

# Upload Data
POST http://localhost:3001/api/upload
{
  "data": {...},
  "position": {"x": 0, "y": 0, "z": 0, "t": 0, "c": 0, "psi": 0}
}

# Formula Execution
POST http://localhost:3001/api/formula
{
  "formula": "⊙(temps) + †ψ(présent) → ∆t(arrêt)",
  "context": {...}
}
```

### 🧪 **Tests Rapides**
```bash
# Test 1: Health check
curl http://localhost:3001/health

# Test 2: Search endpoint
curl -X POST http://localhost:3001/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"test","center_x":0,"center_y":0,"center_z":0,"radius":10}'

# Test 3: Upload endpoint  
curl -X POST http://localhost:3001/api/upload \
  -H "Content-Type: application/json" \
  -d '{"data":{"name":"test"},"position":{"x":0,"y":0,"z":0}}'
```

---

## 🆘 **CONTACTS D'URGENCE**

### 🔮 **Mage Claude - Support 24/7**
- **Spécialité**: Architecture Rust + Debugging
- **Communication**: ANSIBLE/ ou messages directs
- **Disponibilité**: Toujours présent pour urgences

### 📚 **Ressources Externes**
```bash
# Documentation Rust officielle
https://doc.rust-lang.org/

# Cargo (gestionnaire packages)
https://doc.rust-lang.org/cargo/

# Warp (framework web)
https://docs.rs/warp/

# Stack Overflow Rust
https://stackoverflow.com/questions/tagged/rust
```

### 🛠️ **Outils de Debug**
```bash
# Installer outils debug Rust
cargo install cargo-watch    # Auto-recompilation
cargo install cargo-audit    # Audit sécurité
cargo install cargo-outdated # Dépendances obsolètes

# Utilisation
cargo watch -x run           # Auto-restart sur changements
cargo audit                  # Vérifier vulnérabilités
cargo outdated              # Voir dépendances à mettre à jour
```

---

## 🎯 **CHECKLIST URGENCE**

### ✅ **Avant d'Appeler Mage Claude**
- [ ] Testé `curl http://localhost:3001/health`
- [ ] Vérifié logs: `tail -20 /workspace/magic-stack-backend/target/debug.log`
- [ ] Testé redémarrage: `./magic-menu.sh restart`
- [ ] Vérifié port libre: `lsof -i :3001`
- [ ] Testé compilation: `cd magic-stack-backend && cargo check`

### 🚨 **Informations à Fournir**
1. **Erreur exacte**: Copier-coller message d'erreur complet
2. **Logs récents**: `tail -50 debug.log`
3. **Commande exécutée**: Quelle commande a causé le problème
4. **Timing**: Quand le problème a commencé
5. **Changements récents**: Modifications faites avant le problème

---

## ✨ **SIGNATURE GUIDE URGENCE**

```
🦀🔧 RUST EMERGENCY GUIDE - MAGICSTACK ✨
🎯 Chef-Friendly • Zero Rust Knowledge Required
📊 Diagnostic Express • Résolution Problèmes • Maintenance
🔮 Support Mage Claude 24/7 • Documentation Complète
⚡ Survie garantie en cas de pépin Rust!
```

---

*Guide créé par MAGE CLAUDE - Dimension 1 Littéraire*  
*Spécialiste Rust Emergency Response*  
*Version: 1.0.0 - Chef Edition*  
*Dernière mise à jour: 2024-12-28 05:10 GMT*

**🦀 RUST PANIC? PAS DE PANIQUE!** 🔧✨