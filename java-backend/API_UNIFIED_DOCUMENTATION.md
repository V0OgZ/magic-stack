# 🔥 API UNIFIÉE HEROES OF AVALON - DOCUMENTATION COMPLÈTE

**Version** : 2.0 FUSION  
**Par** : GROEKEN (Boss Engine)  
**Backend** : Spring Boot avec Magie Intégrée

---

## 🎯 ENDPOINTS PRINCIPAUX

### 🎮 Gestion de Jeu

#### `POST /api/game/new`
Créer une nouvelle partie
```json
{
  "playerName": "Vincent",
  "mapSize": "LARGE",
  "difficulty": "NORMAL"
}
```

#### `GET /api/game/session/{sessionId}`
Obtenir l'état d'une partie

#### `POST /api/game/session/{sessionId}/endturn`
Terminer le tour actuel

---

### ⚔️ Combat

#### `POST /api/game/combat/start`
Démarrer un combat
```json
{
  "sessionId": "xxx",
  "attackerId": "hero-123",
  "defenderId": "creature-456"
}
```

#### `POST /api/game/combat/{combatId}/action`
Effectuer une action en combat
```json
{
  "actionType": "ATTACK",
  "sourceId": "hero-123",
  "targetId": "creature-456"
}
```

---

### 🔮 MAGIE INTÉGRÉE (NOUVEAU!)

#### `POST /api/game/magic/cast`
Lancer un sort dans le contexte du jeu
```json
{
  "sessionId": "xxx",
  "heroId": "hero-123",
  "formulaType": "GROFI",
  "formula": "FUSION(GROFI, FOREST_THOUGHT)",
  "parameters": {
    "intensity": "maximum"
  },
  "targetPosition": {"x": 10, "y": 15}
}
```

**Réponse** :
```json
{
  "success": true,
  "message": "Sort lancé avec succès!",
  "effects": ["DAMAGE", "BURN"],
  "metadata": {
    "damage": 50,
    "duration": 3
  },
  "manaCost": 30,
  "remainingMana": 70
}
```

#### `GET /api/game/hero/{heroId}/spells`
Obtenir les sorts disponibles pour un héros

---

### 🗺️ Carte Hexagonale

#### `GET /api/game/map/{sessionId}/view`
Obtenir la vue de la carte
```
?centerX=50&centerY=50&radius=10
```

#### `POST /api/game/hero/{heroId}/move`
Déplacer un héros
```json
{
  "path": [
    {"q": 10, "r": 5},
    {"q": 11, "r": 5},
    {"q": 12, "r": 5}
  ]
}
```

---

### 🏰 Structures

#### `GET /api/game/structure/{structureId}`
Obtenir les infos d'une structure

#### `POST /api/game/structure/{structureId}/interact`
Interagir avec une structure
```json
{
  "heroId": "hero-123",
  "action": "ENTER"
}
```

---

## 🌟 SYSTÈME DE MAGIE UNIFIÉ

### Types de Formules Supportés

1. **SIMPLE** - Sorts classiques
   - `TELEPORT_HERO(hero, x, y)`
   - `FIREBALL(target, damage)`

2. **GROFI** - Système quantique
   - `FUSION(GROFI, FOREST_THOUGHT)`
   - `COLLAPSE_OVERRIDE(state)`

3. **GRUT** - Vision panoptique
   - `GRUT.SCAN(dimension, range)`
   - `GRUFIJAN_FUSION()`

4. **TEMPORAL** - Codex Temporel
   - `ψ(t) = Σ aₙe^(iωₙt)|n⟩`
   - `BRANCH_TIMELINE(t1, t2)`

5. **RUNIC/PSI** - États quantiques
   - `ψ001: ⊙(GRUT) + ∇(FOREST) → VISION_TOTALE`

---

## 🔗 INTÉGRATION FRONTEND

### Client JavaScript
```javascript
// Initialiser le client
const gameClient = new AvalonGameClient('http://localhost:8080');

// Lancer un sort
const result = await gameClient.castSpell({
  sessionId: currentSession,
  heroId: selectedHero,
  formulaType: 'GROFI',
  formula: 'FUSION(GROFI, FOREST_THOUGHT)',
  targetPosition: {x: 10, y: 15}
});

// Gérer le résultat
if (result.success) {
  updateManaBar(result.remainingMana);
  playSpellAnimation(result.effects);
}
```

---

## 🛡️ SÉCURITÉ WALTER

Le système WALTER vérifie automatiquement :
- ✅ Formules autorisées
- ✅ Rate limiting (10 requêtes/minute)
- ✅ Paradoxes temporels
- ✅ Autorisation des lanceurs

En cas de violation : **"This is not 'Nam. There are rules."**

---

## 🚀 DÉMARRAGE RAPIDE

```bash
# Compiler et lancer
cd avalon-backend
mvn clean install
mvn spring-boot:run

# Le serveur démarre sur http://localhost:8080
```

### Endpoints de test :
- `/actuator/health` - Santé du système
- `/api/magic/status` - État des systèmes magiques
- `/` - Dashboard web complet

---

## 📊 DASHBOARD INTÉGRÉ

Accessible sur http://localhost:8080 :
- Centre de commandement temps réel
- Testeur de sorts interactif
- Explorateur de 869+ formules
- Moniteur de performance
- Logs de combat

---

## 💡 EXEMPLES D'UTILISATION

### Créer une partie et lancer un sort
```bash
# 1. Créer une partie
curl -X POST http://localhost:8080/api/game/new \
  -H "Content-Type: application/json" \
  -d '{"playerName": "Vincent", "mapSize": "LARGE"}'

# 2. Lancer un sort de téléportation
curl -X POST http://localhost:8080/api/game/magic/cast \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "xxx",
    "heroId": "hero-123",
    "formulaType": "SIMPLE",
    "formula": "TELEPORT_HERO(hero, 20, 30)"
  }'
```

---

## 🔥 CONCLUSION

**UN SEUL BACKEND. TOUTE LA PUISSANCE.**

- Mécaniques de jeu ✅
- 869 formules magiques ✅
- Combat tactique ✅
- Maps hexagonales ✅
- Portails interdimensionnels ✅

**PRÊT À SHIPPER !** 🚀

---

*Documentation par GROEKEN - Boss de l'Engine*