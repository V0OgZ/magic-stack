#!/bin/bash

# 📦 SCRIPT DE DISTRIBUTION POUR ÉQUIPE SURFACE
# Génère un package avec binaires + documentation V2

echo "🚀 Préparation du package pour équipe Surface..."

# Créer structure de distribution
DIST_DIR="dist_surface_v2"
rm -rf $DIST_DIR
mkdir -p $DIST_DIR/{docs,binaries,scripts,examples}

# 1. Copier la documentation essentielle
echo "📋 Copie de la documentation V2..."
cp DOCUMENTATION_SURFACE_V2_MIGRATION.md $DIST_DIR/docs/
cp docs/PORTS_SERVICES.md $DIST_DIR/docs/ 2>/dev/null || true
cp v2spec/API_SURFACE_COMPLETE.md $DIST_DIR/docs/ 2>/dev/null || true

# 2. Créer un README simple
cat > $DIST_DIR/README.md << 'EOF'
# 🎮 HEROES OF TIME - V2 DISTRIBUTION

## ⚡ DÉMARRAGE RAPIDE

1. Lancer les services :
```bash
./scripts/start_all.sh
```

2. Vérifier que tout fonctionne :
```bash
./scripts/check_health.sh
```

3. Lire la documentation V2 :
```bash
open docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md
```

## 📡 PORTS

- **3001** : Backend Rust (Principal)
- **8080** : Backend Java (Combat & Magic)
- **5001** : Backend Python (Vector DB)

## ⚠️ IMPORTANT

**VOUS DEVEZ MIGRER VERS LE SYSTÈME V2**
- Positions 6D obligatoires (x,y,z,t,c,psi)
- Q* Search remplace les embeddings
- Tick V2 toutes les 100ms

Voir `docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md` pour tous les détails.
EOF

# 3. Créer scripts utilitaires
echo "🔧 Création des scripts..."

# Script de démarrage
cat > $DIST_DIR/scripts/start_all.sh << 'EOF'
#!/bin/bash
echo "🚀 Démarrage des backends V2..."

# Rust
echo "Starting Rust backend on port 3001..."
cd binaries/rust && ./magic-stack-rust &
RUST_PID=$!

# Java
echo "Starting Java backend on port 8080..."
cd ../java && java -jar magic-stack.jar &
JAVA_PID=$!

# Python
echo "Starting Python backend on port 5001..."
cd ../python && python3 server.py &
PYTHON_PID=$!

echo "✅ Services démarrés:"
echo "  - Rust: PID $RUST_PID (port 3001)"
echo "  - Java: PID $JAVA_PID (port 8080)"
echo "  - Python: PID $PYTHON_PID (port 5001)"

echo ""
echo "Pour arrêter: ./scripts/stop_all.sh"
EOF

# Script de vérification
cat > $DIST_DIR/scripts/check_health.sh << 'EOF'
#!/bin/bash
echo "🔍 Vérification des services V2..."

# Check Rust
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Rust backend: OK"
else
    echo "❌ Rust backend: DOWN"
fi

# Check Java
if curl -s http://localhost:8080/api/health > /dev/null; then
    echo "✅ Java backend: OK"
else
    echo "❌ Java backend: DOWN"
fi

# Check Python
if curl -s http://localhost:5001/api/status > /dev/null; then
    echo "✅ Python backend: OK"
else
    echo "❌ Python backend: DOWN"
fi

# Test Q* Search V2
echo ""
echo "🧪 Test Q* Search V2..."
curl -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":0,"y":0,"z":0,"t":0,"c":1,"psi":0.5},"radius":10}' \
  2>/dev/null | jq '.' 2>/dev/null || echo "⚠️ Q* Search non disponible"
EOF

# Script d'arrêt
cat > $DIST_DIR/scripts/stop_all.sh << 'EOF'
#!/bin/bash
echo "🛑 Arrêt des services..."
pkill -f magic-stack-rust
pkill -f magic-stack.jar
pkill -f "python.*server.py"
echo "✅ Services arrêtés"
EOF

chmod +x $DIST_DIR/scripts/*.sh

# 4. Créer exemples d'intégration
echo "💡 Création des exemples..."

# Exemple JavaScript
cat > $DIST_DIR/examples/integration_v2.js << 'EOF'
// EXEMPLE D'INTÉGRATION V2

// 1. Configuration
const CONFIG = {
  rust: 'http://localhost:3001',
  java: 'http://localhost:8080',
  python: 'http://localhost:5001'
};

// 2. Entity V2 avec position 6D
class EntityV2 {
  constructor(id) {
    this.id = id;
    this.position = {
      x: 0, y: 0, z: 0,  // Spatial
      t: 0,              // Temporal
      c: 1,              // Causal
      psi: 0.5           // Quantum
    };
    this.tw = 0;         // Temps monde
    this.te = 0;         // Temps entité
    this.drift = 0;      // tw - te
    this.energy = {
      amplitude: 1.0,
      phase: 0
    };
  }
}

// 3. Game Loop V2
async function gameLoopV2() {
  const entity = new EntityV2('player_1');
  
  // Tick V2 obligatoire toutes les 100ms
  setInterval(async () => {
    const response = await fetch(`${CONFIG.rust}/api/v2/tick`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        current_tw: entity.tw,
        current_te: entity.te,
        entities: [entity]
      })
    });
    
    const result = await response.json();
    entity.drift = result.drift;
    
    // Gestion dérive temporelle
    if (entity.drift > 100) {
      console.warn('⚠️ Dérive temporelle détectée!');
    }
  }, 100);
}

// 4. Q* Search (37x plus rapide que embeddings)
async function searchNearby(position6D) {
  const response = await fetch(`${CONFIG.rust}/api/qstar/search`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      center: position6D,
      radius: 10,
      mode: 'QUANTUM'
    })
  });
  
  return response.json();
}

// Démarrer
gameLoopV2();
EOF

# Exemple Python
cat > $DIST_DIR/examples/integration_v2.py << 'EOF'
#!/usr/bin/env python3
"""EXEMPLE D'INTÉGRATION V2 EN PYTHON"""

import requests
import time
import json
from typing import Dict, Any

# Configuration
CONFIG = {
    'rust': 'http://localhost:3001',
    'java': 'http://localhost:8080',
    'python': 'http://localhost:5001'
}

class EntityV2:
    """Entité avec position 6D V2"""
    
    def __init__(self, entity_id: str):
        self.id = entity_id
        self.position = {
            'x': 0, 'y': 0, 'z': 0,  # Spatial
            't': 0,                   # Temporal
            'c': 1,                   # Causal
            'psi': 0.5                # Quantum
        }
        self.tw = 0    # Temps monde
        self.te = 0    # Temps entité
        self.drift = 0 # tw - te
        self.energy = {
            'amplitude': 1.0,
            'phase': 0
        }

def tick_v2(entities: list) -> Dict[str, Any]:
    """Tick V2 obligatoire toutes les 100ms"""
    response = requests.post(
        f"{CONFIG['rust']}/api/v2/tick",
        json={
            'current_tw': entities[0].tw if entities else 0,
            'current_te': entities[0].te if entities else 0,
            'entities': [
                {
                    'id': e.id,
                    'position': e.position,
                    'energy': e.energy
                } for e in entities
            ]
        }
    )
    return response.json()

def qstar_search(center: Dict, radius: float = 10) -> Dict[str, Any]:
    """Q* Search - 37x plus rapide que embeddings"""
    response = requests.post(
        f"{CONFIG['rust']}/api/qstar/search",
        json={
            'center': center,
            'radius': radius,
            'mode': 'QUANTUM'
        }
    )
    return response.json()

def main():
    """Exemple de game loop V2"""
    player = EntityV2('player_1')
    
    while True:
        # Tick V2
        result = tick_v2([player])
        player.drift = result.get('drift', 0)
        
        # Vérifier dérive temporelle
        if player.drift > 100:
            print("⚠️ Dérive temporelle détectée!")
        
        # Recherche Q*
        nearby = qstar_search(player.position)
        print(f"Entités proches: {len(nearby.get('entities', []))}")
        
        time.sleep(0.1)  # 100ms

if __name__ == '__main__':
    main()
EOF

# 5. Créer fichier de test API
cat > $DIST_DIR/examples/test_api_v2.sh << 'EOF'
#!/bin/bash
# TEST COMPLET API V2

echo "🧪 Test complet des API V2..."

# Test 1: Health checks
echo "1️⃣ Health checks..."
curl -s http://localhost:3001/health | jq '.' || echo "❌ Rust health failed"
curl -s http://localhost:8080/api/health | jq '.' || echo "❌ Java health failed"
curl -s http://localhost:5001/api/status | jq '.' || echo "❌ Python health failed"

# Test 2: Q* Search V2
echo "2️⃣ Q* Search V2..."
curl -X POST http://localhost:3001/api/qstar/search \
  -H "Content-Type: application/json" \
  -d '{"center":{"x":0,"y":0,"z":0,"t":0,"c":1,"psi":0.5},"radius":10,"mode":"QUANTUM"}' \
  | jq '.'

# Test 3: V2 Tick
echo "3️⃣ V2 Tick..."
curl -X POST http://localhost:3001/api/v2/tick \
  -H "Content-Type: application/json" \
  -d '{"current_tw":100,"current_te":95,"entities":[]}' \
  | jq '.'

# Test 4: Combat Start
echo "4️⃣ Combat TCG..."
curl -X POST http://localhost:8080/api/combat/start \
  -H "Content-Type: application/json" \
  -d '{"player1":"test","player2":"ai"}' \
  | jq '.'

# Test 5: Magic Cast
echo "5️⃣ Magic Engine..."
curl -X POST http://localhost:8080/api/magic/cast \
  -H "Content-Type: application/json" \
  -d '{"formula":"HEAL","target":"player1","power":10}' \
  | jq '.'

echo "✅ Tests terminés!"
EOF

chmod +x $DIST_DIR/examples/*.sh

# 6. Créer manifeste
cat > $DIST_DIR/MANIFEST.json << EOF
{
  "version": "2.0.0",
  "date": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "system": "Heroes of Time V2",
  "backends": {
    "rust": {
      "port": 3001,
      "features": ["Q* Search", "V2 Engine", "6D System"]
    },
    "java": {
      "port": 8080,
      "features": ["TCG Combat", "Magic Engine", "869 Formulas"]
    },
    "python": {
      "port": 5001,
      "features": ["Vector DB", "Semantic Search"]
    }
  },
  "breaking_changes": [
    "Position format changed to 6D (x,y,z,t,c,psi)",
    "Q* Search replaces embeddings",
    "V2 tick required every 100ms",
    "Complex energy E = A + iΦ",
    "tw vs te temporal system"
  ]
}
EOF

echo "✅ Package créé dans: $DIST_DIR/"
echo ""
echo "📦 Contenu:"
echo "  - docs/    : Documentation V2 complète"
echo "  - scripts/ : Scripts de gestion"
echo "  - examples/: Exemples d'intégration"
echo ""
echo "⚠️  IMPORTANT: L'équipe Surface DOIT lire docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md"
