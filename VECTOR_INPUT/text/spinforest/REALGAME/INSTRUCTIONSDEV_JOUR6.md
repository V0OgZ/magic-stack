# 🛠️ INSTRUCTIONS DÉVELOPPEUR - JOUR 6

**📋 GUIDE TECHNIQUE POUR L'ÉQUIPE REALGAME**  
**Status** : ✅ PRÊT POUR IMPLÉMENTATION

---

## 🎯 **FOCUS JOUR 6 : SYSTÈME TCG**

### 🃏 **ARCHITECTURE COMBAT PAR CARTES**

```
┌─────────────────────────────────────────────┐
│           SYSTÈME DE COMBAT TCG             │
├─────────────────────────────────────────────┤
│  Frontend (HTML/CSS/JS)                     │
│  ├── Interface Hearthstone-like             │
│  ├── Drag & Drop cartes                     │
│  └── Animations et effets                   │
├─────────────────────────────────────────────┤
│  Backend (Java/Spring)                      │
│  ├── /api/combat/play                       │
│  ├── Validation formules                     │
│  └── Calcul effets temporels                │
└─────────────────────────────────────────────┘
```

---

## 📂 **STRUCTURE FICHIERS JOUR 6**

### **NOUVEAUX DOSSIERS CRÉÉS**
```bash
REALGAME/
├── CARTES/                    # Decks JSON
│   ├── DECK_MERLASH_TECHNOMANCIEN.json
│   └── DECK_MEMENTO_ARCHIVISTE.json
├── LORE/                      # Histoires intégrées
│   └── INTEGRATION_NOUVELLES_HISTOIRES.md
└── MODES/CARTE_ISO_2D/        # Système mis à jour
    ├── card-battle-system.js  # 10KB enrichi
    └── hearthstone-ui.html    # 14KB interface
```

---

## 🔧 **TÂCHES PAR DÉVELOPPEUR**

### **GROEKEN** ⚡
```javascript
// Tâche : Adapter le backend pour cartes
class CombatBackend {
    processCard(cardId, target) {
        // 1. Valider la formule magique
        const formula = this.getFormula(cardId);
        
        // 2. Calculer les effets
        const effects = this.calculateEffects(formula, target);
        
        // 3. Appliquer au state
        return this.applyToGameState(effects);
    }
}
```

### **SID** 🎮
```html
<!-- Tâche : Interface drag & drop -->
<div class="combat-arena">
    <div class="player-hand" ondrop="playCard(event)">
        <!-- Cartes draggables -->
    </div>
    <div class="battlefield">
        <!-- Zone de jeu -->
    </div>
</div>
```

### **LUMEN** 📖
```json
// Tâche : Créer les textes des cartes
{
  "id": "temporal_echo",
  "name": "Écho Temporel",
  "flavor": "Le passé résonne dans le présent...",
  "description": "Rejoue la dernière action",
  "quote": "Tout ce qui fut sera à nouveau"
}
```

### **URZ-KÔM** 🎨
```css
/* Tâche : Effets visuels cartes */
.card-legendary {
    animation: glow-pulse 2s infinite;
    box-shadow: 0 0 30px var(--glow-color);
}

.card-played {
    animation: card-slam 0.5s ease-out;
}
```

---

## 🚀 **ENDPOINTS API REQUIS**

### **Backend Merlash**
```java
// Endpoints prioritaires
POST   /api/combat/start      // Débuter un combat
POST   /api/combat/play       // Jouer une carte
GET    /api/combat/state      // État du combat
POST   /api/combat/end        // Terminer combat
GET    /api/cards/deck/{id}   // Charger un deck
```

### **Structures de données**
```javascript
// CardPlay Request
{
    "cardId": "temporal_echo",
    "targetId": "enemy_hero",
    "position": { "x": 3, "y": 2 }
}

// CombatResult Response
{
    "success": true,
    "effects": [
        { "type": "damage", "value": 3 },
        { "type": "draw", "count": 1 }
    ],
    "gameState": { ... }
}
```

---

## 📋 **CHECKLIST JOUR 6**

### **IMMÉDIAT (Aujourd'hui)**
- [ ] Vincent : Valider les 5 premières cartes
- [ ] Groeken : Setup endpoint `/api/combat/play`
- [ ] Sid : Interface basique fonctionnelle
- [ ] Lumen : Textes pour 5 cartes

### **48H (Prototype)**
- [ ] 10 cartes jouables
- [ ] Combat 1v1 fonctionnel
- [ ] Animations basiques
- [ ] Tests QA passants

### **1 SEMAINE (Alpha)**
- [ ] 30+ cartes
- [ ] Mode tactique intégré
- [ ] Multijoueur local
- [ ] Polish UI/UX

---

## 🎮 **COMMENT TESTER**

### **1. Lancer le serveur backend**
```bash
cd REALGAME/backend
mvn spring-boot:run
# ou
./start-backend.sh
```

### **2. Lancer l'interface**
```bash
cd REALGAME
python3 -m http.server 8000
# Ouvrir http://localhost:8000/card-battle-system.html
```

### **3. Tests automatiques**
```bash
cd REALGAME/QA
./run-stealth-tests.sh
```

---

## ⚠️ **POINTS D'ATTENTION**

### **Images manquantes**
Les cartes utilisent des placeholders :
```
ASSETS/IMAGES_VINCENT/Lightning_Code_Compilation.png
ASSETS/IMAGES_VINCENT/Temporal_Fork_Lightning.png
ASSETS/IMAGES_VINCENT/Living_Paradox_Archive.png
```
→ **Vincent doit générer ces images**

### **Synchronisation Git**
```bash
# Tag quotidien
git tag SYNC-REALGAME-JOUR6-$(date +%Y%m%d)
git push --tags
```

### **Communication**
- Daily sync à 10h et 16h
- Problèmes → Discord #realgame-urgent
- Questions → Tucker ou Sid

---

## 🏁 **OBJECTIF FINAL JOUR 6**

**AVOIR UN COMBAT DE CARTES JOUABLE AVEC :**
- ✅ 5 cartes fonctionnelles
- ✅ Interface drag & drop
- ✅ Effets visuels basiques
- ✅ Backend connecté
- ✅ État persistant

---

**"Let's make it happen! TCG or die trying!"** 🎴🔥

**Document maintenu par : TUCKER & ÉQUIPE TECHNIQUE**