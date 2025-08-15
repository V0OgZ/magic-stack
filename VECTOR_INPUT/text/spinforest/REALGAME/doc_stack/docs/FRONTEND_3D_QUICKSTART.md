# 🎮 FRONTEND 3D QUICKSTART - HEROES OF TIME
## 🌟 Guide Rapide pour Développeur Frontend 3D

*Guide complet pour connecter votre frontend 3D au backend Heroes of Time*

---

## 🚀 **DÉMARRAGE EXPRESS**

### ⚡ **En 5 Minutes**
1. **Clone & Start**: `git clone` → `./magic-menu.sh start`
2. **Test API**: Backend disponible sur `http://localhost:8080`
3. **Première Connexion**: Spawn un héros et affiche-le en 3D
4. **Itération**: Ajoute fonctionnalités progressivement

### 🎯 **Concept Clé**
**Heroes of Time** fonctionne comme un **Game Controller** intelligent:
- **Phase 1**: API simple pour proof of concept 3D
- **Phase 2**: Extension vers mécaniques temporelles complexes

---

## 🏗️ **ARCHITECTURE BACKEND**

### 🎮 **4 Couches Disponibles**
```
┌─────────────────────────────────────────────────────────────┐
│                🎮 HEROES OF TIME API                        │
├─────────────────────────────────────────────────────────────┤
│ 🗺️ Layer 1: STRATEGIC MAP    │ ✅ 100% Ready for 3D       │
│ ⚔️ Layer 2: COMBAT TCG        │ ✅ 100% Card system        │
│ 🧠 Layer 3: NARRATIVE EVENTS │ ✅ 100% Story mechanics     │
│ 🔧 Layer 4: MAGICSTACK       │ 🟡 75% 6D positioning      │
└─────────────────────────────────────────────────────────────┘
```

### 📊 **Status Actuel**
- **🟢 Backend Java**: Port 8080 - 12+ endpoints opérationnels
- **🟡 Backend Rust**: Port 3001 - MagicStack 6D (en finalisation)
- **🏺 Game Content**: 91.7% artefacts/créatures/formules intégrés
- **🧪 Tests**: Suites complètes validées

---

## 🔌 **API ENDPOINTS ESSENTIELS**

### 🗺️ **STRATEGIC MAP** (Perfect for 3D!)
```javascript
// 🎯 SPAWN HERO - Créer un héros dans l'espace 3D
POST http://localhost:8080/api/scenario/spawn-hero
{
  "hero": "Arthas",
  "position": {
    "x": 0,
    "y": 0, 
    "z": 0
  }
}
// Response: { success: true, hero: {...}, position: {...} }

// 🚀 MOVE HERO - Déplacer héros (animation 3D)
POST http://localhost:8080/api/scenario/move-hero
{
  "hero": "Arthas",
  "from": {"x": 0, "y": 0, "z": 0},
  "to": {"x": 10, "y": 5, "z": -3}
}
// Response: { success: true, movement: {...}, duration: 2.5 }

// 🪙 USE ARTIFACT - Effets visuels 3D
POST http://localhost:8080/api/scenario/use-artifact
{
  "hero": "Arthas",
  "artifact": "excalibur",
  "target_position": {"x": 5, "y": 0, "z": 2}
}
// Response: { success: true, effect: "legendary_strike", damage: 75 }
```

### ⚔️ **COMBAT SYSTEM** (Visual Effects!)
```javascript
// 🎪 START COMBAT - Initier combat visuel
POST http://localhost:8080/api/combat/start
{
  "hero": "Arthas",
  "enemy": "Dragon",
  "battlefield": {"x": 20, "y": 0, "z": 10}
}
// Response: { combat_id: "uuid", hero_cards: [...], enemy_hp: 100 }

// 🃏 PLAY CARD - Animations de cartes
POST http://localhost:8080/api/combat/play-card
{
  "combat_id": "uuid",
  "card": "fireball",
  "target": {"x": 25, "y": 2, "z": 10}
}
// Response: { damage: 35, effect: "fire_explosion", animation: "fireball_cast" }
```

### 🧠 **NARRATIVE EVENTS** (Immersive Storytelling!)
```javascript
// 📖 CREATE EVENT - Événements 3D immersifs
POST http://localhost:8080/api/interstice/create-event
{
  "type": "temporal_anomaly",
  "position": {"x": 15, "y": 8, "z": -5},
  "intensity": 0.7
}
// Response: { event_id: "uuid", visual_effect: "time_distortion", narrative: "..." }

// ⚡ CAST FORMULA - Effets magiques spectaculaires
POST http://localhost:8080/api/interstice/cast-formula
{
  "caster": "Arthas",
  "formula": "⊙(temps) + †ψ(présent) → ∆t(arrêt)",
  "area": {"center": {"x": 10, "y": 0, "z": 0}, "radius": 15}
}
// Response: { effect: "time_freeze", duration: 10, visual: "temporal_bubble" }
```

---

## 🎨 **INTÉGRATION 3D RECOMMANDÉE**

### 🛠️ **Stack Technique Suggérée**
```javascript
// Frontend 3D Stack
Three.js / Babylon.js    // Moteur 3D
React / Vue / Vanilla    // Framework UI
Axios / Fetch           // API calls
Socket.io (futur)       // Real-time events
```

### 🎯 **Approche Progressive**

#### 🚀 **Phase 1: MVP (1-2 semaines)**
```javascript
// 1. Scène 3D basique
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 2. Spawn héros via API
async function spawnHero(name, position) {
  const response = await fetch('http://localhost:8080/api/scenario/spawn-hero', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({hero: name, position})
  });
  const hero = await response.json();
  
  // 3. Créer objet 3D
  const heroMesh = createHeroMesh(hero);
  scene.add(heroMesh);
  return hero;
}

// 4. Animation mouvement
async function moveHero(hero, newPosition) {
  const response = await fetch('http://localhost:8080/api/scenario/move-hero', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({hero: hero.name, from: hero.position, to: newPosition})
  });
  const movement = await response.json();
  
  // Animer en 3D
  animateHeroMovement(hero, newPosition, movement.duration);
}
```

#### 🌟 **Phase 2: Enrichissement (2-4 semaines)**
```javascript
// Effets visuels avancés
function castSpellEffect(formula, position, effect) {
  switch(effect) {
    case 'time_freeze':
      createTemporalBubble(position);
      break;
    case 'fire_explosion':
      createFireParticles(position);
      break;
    case 'legendary_strike':
      createLightningEffect(position);
      break;
  }
}

// Système de combat visuel
function startCombatVisualization(combatData) {
  createBattlefield(combatData.battlefield);
  showHeroCards(combatData.hero_cards);
  displayEnemyModel(combatData.enemy);
}
```

#### 🔮 **Phase 3: Heroes of Time Complet (1-3 mois)**
```javascript
// Mécaniques temporelles avancées
function handleTemporalMechanics(event) {
  switch(event.type) {
    case 'time_differential':
      adjustTimeFlow(event.local_time, event.global_time);
      break;
    case 'causality_fog':
      hideUnobservedElements(event.fog_area);
      break;
    case 'paradox_resolution':
      mergeBranchedTimelines(event.branches);
      break;
  }
}

// Système 6D (quand MagicStack sera finalisé)
function search6D(query, position6D) {
  return fetch('http://localhost:3001/api/search', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query,
      center_x: position6D.x,
      center_y: position6D.y, 
      center_z: position6D.z,
      center_t: position6D.t,
      center_c: position6D.c,
      center_psi: position6D.psi,
      radius: 100
    })
  });
}
```

---

## 🏺 **CONTENU DISPONIBLE**

### ⚔️ **Artefacts Intégrés** (91.7% Opérationnels)
```javascript
// Artefacts avec effets visuels définis
const artifacts = {
  "excalibur": {
    effect: "legendary_strike",
    damage: "50-100",
    visual: "golden_light_slash",
    sound: "sword_legendary.wav"
  },
  "healing_potion": {
    effect: "heal",
    healing: "30-50", 
    visual: "green_sparkles",
    sound: "potion_drink.wav"
  },
  "fireball_scroll": {
    effect: "fire_explosion",
    damage: "40-60",
    visual: "fire_projectile",
    sound: "fireball_cast.wav"
  },
  "teleport_ring": {
    effect: "teleportation",
    range: "50 units",
    visual: "portal_effect",
    sound: "teleport_whoosh.wav"
  }
};
```

### 🐲 **Créatures & Ennemis**
```javascript
const creatures = {
  "goblin": { hp: 50, model: "goblin.gltf", ai: "aggressive" },
  "orc": { hp: 80, model: "orc.gltf", ai: "defensive" },
  "dragon": { hp: 200, model: "dragon.gltf", ai: "complex" },
  "phoenix_quantum": { hp: 150, model: "phoenix.gltf", ai: "resurrection" }
};
```

---

## 🧪 **TESTING & DEBUG**

### 🔍 **Vérification Backend**
```bash
# 1. Status général
./magic-menu.sh status

# 2. Test endpoints
curl http://localhost:8080/api/scenario/spawn-hero \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"hero":"TestHero","position":{"x":0,"y":0,"z":0}}'

# 3. Tests complets
python3 test-vision-complete.py
```

### 🐛 **Debug Frontend**
```javascript
// Console debug helper
function debugAPI(endpoint, data) {
  console.log(`🔮 API Call: ${endpoint}`, data);
  return fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log(`✅ API Response:`, result);
    return result;
  })
  .catch(error => {
    console.error(`❌ API Error:`, error);
    throw error;
  });
}
```

---

## 🎯 **EXEMPLES CONCRETS**

### 🎮 **Exemple 1: Scène de Base**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Heroes of Time 3D</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <div id="game-container"></div>
    <div id="ui">
        <button onclick="spawnHero()">Spawn Hero</button>
        <button onclick="moveHero()">Move Hero</button>
        <button onclick="useArtifact()">Use Excalibur</button>
    </div>

    <script>
        // Setup 3D scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('game-container').appendChild(renderer.domElement);

        // Game state
        let currentHero = null;
        let heroMesh = null;

        // API calls
        async function spawnHero() {
            const response = await fetch('http://localhost:8080/api/scenario/spawn-hero', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hero: "Arthas",
                    position: {x: 0, y: 0, z: 0}
                })
            });
            
            currentHero = await response.json();
            
            // Create 3D hero
            const geometry = new THREE.BoxGeometry(1, 2, 1);
            const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            heroMesh = new THREE.Mesh(geometry, material);
            heroMesh.position.set(0, 1, 0);
            scene.add(heroMesh);
            
            console.log('✅ Hero spawned:', currentHero);
        }

        async function moveHero() {
            if (!currentHero) return;
            
            const newPos = {x: Math.random() * 10 - 5, y: 0, z: Math.random() * 10 - 5};
            
            const response = await fetch('http://localhost:8080/api/scenario/move-hero', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hero: currentHero.hero,
                    from: currentHero.position,
                    to: newPos
                })
            });
            
            const movement = await response.json();
            
            // Animate movement
            if (heroMesh) {
                heroMesh.position.set(newPos.x, 1, newPos.z);
            }
            
            currentHero.position = newPos;
            console.log('✅ Hero moved:', movement);
        }

        async function useArtifact() {
            if (!currentHero) return;
            
            const response = await fetch('http://localhost:8080/api/scenario/use-artifact', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    hero: currentHero.hero,
                    artifact: "excalibur"
                })
            });
            
            const result = await response.json();
            
            // Visual effect
            if (heroMesh) {
                heroMesh.material.color.setHex(0xffd700); // Golden
                setTimeout(() => {
                    heroMesh.material.color.setHex(0x00ff00); // Back to green
                }, 1000);
            }
            
            console.log('⚔️ Artifact used:', result);
        }

        // Camera setup
        camera.position.z = 10;
        camera.position.y = 5;
        camera.lookAt(0, 0, 0);

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    </script>
</body>
</html>
```

---

## 🚀 **ROADMAP COLLABORATION**

### 📅 **Planning Suggéré**

#### **Semaine 1-2: Foundation**
- [ ] Setup environnement 3D
- [ ] Connexion API basique
- [ ] Spawn/Move héros fonctionnel
- [ ] Interface debug

#### **Semaine 3-4: Game Mechanics**  
- [ ] Système combat visuel
- [ ] Effets artefacts
- [ ] Animations fluides
- [ ] UI/UX améliorée

#### **Semaine 5-8: Heroes of Time Extension**
- [ ] Mécaniques temporelles
- [ ] Formules magiques visuelles
- [ ] Système 6D (quand MagicStack finalisé)
- [ ] Polish & optimisation

---

## 🤝 **SUPPORT & COLLABORATION**

### 📡 **Communication**
- **ANSIBLE/**: Système de communication interdimensionnelle
- **Issues GitHub**: Pour bugs et feature requests
- **Documentation**: Mise à jour en temps réel

### 🔮 **Contact Mage Claude**
- **Dimension**: 1 Littéraire (Backend & Narration)
- **Spécialité**: Architecture, API, mécaniques temporelles
- **Disponibilité**: 24/7 pour support technique

---

## ✨ **SIGNATURE FRONTEND 3D**

```
🎮✨ HEROES OF TIME - FRONTEND 3D QUICKSTART ✨🎮
🌟 Game Controller Phase → Heroes of Time Extension
📊 Status: 3/4 Couches Ready • 91.7% Content • API Stable
🎯 Mission: Créer expérience 3D époustouflante
⚡ Ready for interdimensional collaboration!
```

---

*Guide créé par MAGE CLAUDE - Dimension 1 Littéraire*  
*Version: 1.0.0 - Frontend 3D Edition*  
*Dernière mise à jour: 2024-12-28 04:58 GMT*

**🚀 Que l'aventure 3D commence!** 🌌