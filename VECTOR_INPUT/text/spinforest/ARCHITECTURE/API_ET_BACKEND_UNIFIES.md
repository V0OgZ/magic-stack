# 🔥 API ET BACKEND UNIFIÉS - DOCUMENTATION CENTRALE

**Date** : 4 Août 2025  
**Par** : GROEKEN (Boss Engine)  
**Statut** : ✅ **DOCUMENTATION CONSOLIDÉE**

---

## 🎯 RÉSUMÉ EXÉCUTIF

Suite à la fusion des backends, voici la documentation UNIQUE et OFFICIELLE pour l'API et l'architecture.

---

## 🏗️ ARCHITECTURE ACTUELLE

### Backend Principal : `avalon-backend` (Spring Boot)

```
avalon-backend/
├── src/main/java/com/avalon/
│   ├── controllers/
│   │   ├── GameController.java      # 🎮 Jeu + Magie unifiés
│   │   ├── MagicCastController.java # 🔮 Magie pure (legacy)
│   │   └── FormulaExplorerController.java
│   ├── services/
│   │   ├── GameService.java
│   │   ├── MagicCastService.java    # 869 formules
│   │   ├── CombatService.java
│   │   └── WorldMapService.java
│   └── models/
│       ├── game/                    # Modèles de jeu
│       └── magic/                   # Modèles magiques
└── resources/
    └── static/                      # Dashboard web
```

### Frontend : Multi-interfaces

```
REALGAME/
├── index.html                       # Launcher principal
├── maps/                           # Cartes ISO/Hex
├── systems/                        # Systèmes de jeu
│   └── combat/                     # Combat unifié
└── integration/                    # Connexion backend
```

---

## 📡 API ENDPOINTS PRINCIPAUX

### 🎮 Endpoints de Jeu

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/game/new` | Créer une partie |
| GET | `/api/game/session/{id}` | État de la partie |
| POST | `/api/game/hero/{id}/move` | Déplacer héros |
| POST | `/api/game/combat/start` | Démarrer combat |

### 🔮 Endpoints de Magie (NOUVEAU)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/game/magic/cast` | Lancer sort en jeu |
| GET | `/api/game/hero/{id}/spells` | Sorts disponibles |
| GET | `/api/magic/formulas` | Liste 869 formules |
| GET | `/api/magic/status` | État systèmes magiques |

### 🗺️ Endpoints de Carte

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/game/map/{id}/view` | Vue de la carte |
| GET | `/api/game/map/{id}/fog` | Brouillard de guerre |
| POST | `/api/game/structure/{id}/interact` | Interagir structure |

---

## 🔧 TECHNOLOGIES UTILISÉES

### Backend
- **Java 17** + Spring Boot 3.x
- **Maven** pour la compilation
- **H2 Database** (en mémoire)
- **WebSocket** (prévu pour multijoueur)

### Frontend
- **Vanilla JS** (pas de framework)
- **HTML5 Canvas** pour les cartes
- **CSS3** animations
- **WebGL** (optionnel pour 3D)

### Infrastructure
- **Git** + branches multivers
- **GitHub Pages** pour hébergement static
- **Docker** (optionnel pour déploiement)

---

## 🚀 DÉMARRAGE RAPIDE

### 1. Lancer le Backend
```bash
cd avalon-backend
mvn clean install
mvn spring-boot:run
# Serveur sur http://localhost:8080
```

### 2. Accéder aux Interfaces
- Dashboard : http://localhost:8080
- Jeu : Ouvrir `REALGAME/index.html`
- API Docs : http://localhost:8080/swagger-ui.html

---

## 📊 ÉTAT DES SYSTÈMES

### ✅ Fonctionnel
- GameController avec magie intégrée
- 869 formules magiques validées
- Combat tour par tour
- Maps hexagonales
- Pathfinding A*

### 🚧 En Développement
- Multijoueur WebSocket
- Sauvegarde persistante
- Éditeur de cartes
- Mode campagne

### 📅 Prévu
- API GraphQL
- Mobile responsive
- Mod support
- Steam integration

---

## 🔗 LIENS IMPORTANTS

### Documentation Détaillée
- [`avalon-backend/API_UNIFIED_DOCUMENTATION.md`](../avalon-backend/API_UNIFIED_DOCUMENTATION.md) - API complète
- [`ARCHITECTURE/SCHEMA_GLOBAL_SYSTEME.md`](./SCHEMA_GLOBAL_SYSTEME.md) - Vue système
- [`REALGAME/README.md`](../REALGAME/README.md) - Guide du jeu

### Exemples de Code
```javascript
// Connexion au backend unifié
const api = new AvalonAPI('http://localhost:8080');

// Lancer un sort GROFI
const result = await api.castSpell({
  sessionId: gameSession,
  heroId: selectedHero,
  formulaType: 'GROFI',
  formula: 'FUSION(GROFI, FOREST_THOUGHT)'
});
```

---

## 🛡️ SÉCURITÉ & PERFORMANCE

### Sécurité WALTER
- Rate limiting : 10 req/min
- Validation des formules
- Anti-triche serveur
- JWT tokens (prévu)

### Performance
- Cache des formules fréquentes
- Lazy loading des assets
- Compression gzip
- CDN pour images

---

## 📝 NOTES DE MIGRATION

### Pour les Anciens Backends
1. **Python Mocks** → Archivés dans `/ARCHIVE/`
2. **backend-clean** → Maintenant `avalon-backend`
3. **Magic API séparée** → Intégrée dans GameController

### Breaking Changes
- `/api/temporal/execute` → `/api/game/magic/cast`
- Format requête modifié (voir docs)
- Authentification requise (future)

---

## 🤝 CONTRIBUTION

### Zones de Travail
- **GROEKEN** : Backend + Engine
- **SID** : Architecture + Maps
- **LOUMEN** : Narration + UI
- **URZ-KÔM** : Effets + Physics
- **Technomancien** : Consultant Magie

### Process
1. Branch depuis `main`
2. Préfixe commits : `GROK feat:`
3. Tests obligatoires
4. Review par GROEKEN

---

## 💡 CONCLUSION

**UN BACKEND. UNE API. UNE VISION.**

Cette documentation remplace TOUTES les anciennes. 
En cas de doute, ce document fait foi.

---

*Maintenu par GROEKEN - Boss de l'Engine*  
*Dernière mise à jour : 4 Août 2025, 19h15*