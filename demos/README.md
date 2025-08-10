# 🎮 Démos & Archives HTML

## 📁 Organisation

Ces fichiers HTML sont les **versions historiques** du projet, conservées pour :
- 📚 Documentation de l'évolution
- 🧪 Tests de compatibilité
- 🎯 Démos rapides sans build
- 🏛️ Archive historique

## 🎯 Démos Principales (À GARDER)

### 1. **HOT_GAME_UNIFIED.html** ⭐
- Le jeu principal, version HTML standalone
- Fonctionne sans serveur
- Parfait pour démo rapide

### 2. **CHASSE_TEMPORELLE_MEGA_MAP.html** ⭐
- Mode aventure 120x120
- 4 niveaux de difficulté
- Audio atmosphérique

### 3. **API_EXPLORER_COMPLETE.html** ⭐
- Test toutes les APIs
- Documentation interactive
- Utile pour debug

### 4. **VECTOR_DB_EXPLORER_UI.html** ⭐
- Interface Vector DB
- Recherche sémantique
- Visualisation 6D

### 5. **MULTIPLAYER_DEMO_HOMM3.html** 🎮
- Démo multijoueur
- Style Heroes 3
- Test synchronisation

### 6. **IA_VS_IA_AUTOPLAY.html** 🤖
- Combat IA automatique
- Test algorithmes
- Mode spectateur

### 7. **SPECTATOR_GOD_MODE.html** 👁️
- Vue omnisciente
- Debug avancé
- Tous les paramètres V2

## 🗑️ Peuvent être Archivés

### Remplacés par le nouveau World Editor React:
- `WORLD_EDITOR.html` → Remplacé par `apps/world-editor/`
- `TEST_WEBSOCKET.html` → Intégré dans LivePreviewPanel
- `SCENARIOS_TEST_RUNNER.html` → Tests Playwright maintenant

### Documentation (déplacée dans /docs):
- `MANUEL_DU_JOUEUR_HOT.html`
- `MANUEL_FACILE_EASY_MODE.html`

## 📂 Structure Proposée

```
magic-stack/
├── apps/
│   └── world-editor/        # ✨ NOUVEAU - React PWA
├── demos/                   # 📁 NOUVEAU DOSSIER
│   ├── README.md
│   ├── game/
│   │   ├── HOT_GAME_UNIFIED.html
│   │   ├── CHASSE_TEMPORELLE_MEGA_MAP.html
│   │   └── HOMM3_PWA_IPAD_CLIPPY.html
│   ├── tools/
│   │   ├── API_EXPLORER_COMPLETE.html
│   │   ├── VECTOR_DB_EXPLORER_UI.html
│   │   └── VECTOR_DB_EXPLORER.html
│   ├── multiplayer/
│   │   └── MULTIPLAYER_DEMO_HOMM3.html
│   └── experimental/
│       ├── IA_VS_IA_AUTOPLAY.html
│       └── SPECTATOR_GOD_MODE.html
├── archive/                 # 🗄️ VIEUX TRUCS
│   ├── WORLD_EDITOR.html
│   ├── TEST_WEBSOCKET.html
│   └── SCENARIOS_TEST_RUNNER.html
└── shared/
    ├── v2-adapter.js       # ✨ Réutilisable partout
    └── clippy-helper.js

```

## 🚀 Migration V2

Tous les HTML peuvent maintenant utiliser le **v2-adapter.js** :

```html
<!-- Dans n'importe quel HTML -->
<script src="../shared/v2-adapter.js"></script>
<script>
  const adapter = new V2Adapter();
  // Boom! V2 ready
</script>
```

## 🎯 Utilisation

### Pour une démo rapide :
```bash
# Ouvre directement le HTML
open demos/game/HOT_GAME_UNIFIED.html
```

### Pour le nouveau système :
```bash
# Lance le World Editor React
./h 35

# Ou le jeu principal (quand migré)
./h 10
```

## 📊 Status Migration

| Composant | HTML Legacy | React New | Status |
|-----------|------------|-----------|---------|
| World Editor | ❌ Obsolète | ✅ Complet | Migré |
| Jeu Principal | ✅ Fonctionne | ⏳ À faire | En cours |
| Chasse Temporelle | ✅ Fonctionne | ⏳ À faire | Planifié |
| API Explorer | ✅ Fonctionne | - | Garder HTML |
| Vector DB UI | ✅ Fonctionne | Partial | Hybride |

---

**Note**: Les HTML restent utiles pour :
- Tests sans build process
- Compatibilité navigateurs anciens  
- Démos offline
- Documentation historique
