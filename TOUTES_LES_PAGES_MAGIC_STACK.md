# 🎮 TOUTES LES PAGES MAGIC STACK
## Liste complète pour tester

---

## 🚀 COMMANDES RAPIDES POUR OUVRIR

### 1. JEUX PRINCIPAUX
```bash
# LA MÉGA CHASSE TEMPORELLE (120x120!)
open CHASSE_TEMPORELLE_MEGA_MAP.html

# VERSION IPAD AVEC CLIPPY
open HOMM3_PWA_IPAD_CLIPPY.html

# JEU UNIFIÉ COMPLET
open HOT_GAME_UNIFIED.html

# MULTIPLAYER
open MULTIPLAYER_DEMO_HOMM3.html

# IA VS IA
open IA_VS_IA_AUTOPLAY.html

# MODE SPECTATEUR
open SPECTATOR_GOD_MODE.html
```

### 2. OUTILS DÉVELOPPEUR
```bash
# EXPLORATEUR D'API (GÉNIAL!)
open API_EXPLORER_COMPLETE.html

# EXPLORATEUR VECTOR DB
open VECTOR_DB_EXPLORER_UI.html

# ÉDITEUR DE MONDE
open archive/WORLD_EDITOR.html

# COMPARATEUR D'APIs
open compare-apis.html
```

### 3. INTERFACES VISUELLES
```bash
# Interface nocturne
open interfaces/interface_nocturne.html

# Interface magic visuelle
open interfaces/interface_visual_magic.html

# Interface standard
open interfaces/interface.html
```

### 4. DOCUMENTATION INTERACTIVE
```bash
# MANUEL DU JOUEUR
open MANUEL_DU_JOUEUR_HOT.html

# MODE FACILE
open MANUEL_FACILE_EASY_MODE.html

# INDEX PRINCIPAL
open index.html

# PLAQUETTE DE PRÉSENTATION
open "PLAQUETTE/Heroes of Time - Le Multivers vous attend.html"
```

### 5. APPS REACT
```bash
# App React principale
cd apps/magic-stack-unified && npm run dev
# Ouvre http://localhost:5173

# Éditeur de monde React
cd apps/world-editor && npm run dev
# Ouvre http://localhost:5174
```

### 6. DASHBOARDS CACHÉS
```bash
# Explorateur d'icônes
open apps/magic-stack-unified/public/assets/ICON_EXPLORER.html

# Placeur d'icônes sur map
open apps/magic-stack-unified/public/assets/MAP_ICON_PLACER.html

# Placeur avancé
open apps/magic-stack-unified/public/assets/MAP_ICON_PLACER_ADVANCED.html
```

### 7. TESTS & DÉMOS
```bash
# Test WebSocket
open archive/TEST_WEBSOCKET.html

# Test scénarios
open archive/SCENARIOS_TEST_RUNNER.html

# Test intégration V2
open shared/test-v2-integration.html
```

---

## 📊 TABLEAU RÉCAPITULATIF

| Catégorie | Fichier | Port nécessaire | Description |
|-----------|---------|-----------------|-------------|
| **JEU** | CHASSE_TEMPORELLE_MEGA_MAP.html | - | Map géante 120x120 |
| **JEU** | HOMM3_PWA_IPAD_CLIPPY.html | 7501 | Version iPad + Clippy |
| **JEU** | HOT_GAME_UNIFIED.html | 8080 | Jeu complet unifié |
| **JEU** | MULTIPLAYER_DEMO_HOMM3.html | 8001 | Mode 2-4 joueurs |
| **JEU** | IA_VS_IA_AUTOPLAY.html | 8080 | Combat auto IA |
| **JEU** | SPECTATOR_GOD_MODE.html | 3001 | Mode spectateur |
| **OUTIL** | API_EXPLORER_COMPLETE.html | 8080,3001 | Test endpoints |
| **OUTIL** | VECTOR_DB_EXPLORER_UI.html | 7500 | Explorer Vector DB |
| **OUTIL** | WORLD_EDITOR.html | - | Éditeur de monde |
| **UI** | interface_nocturne.html | - | Thème sombre |
| **UI** | interface_visual_magic.html | - | Effets visuels |
| **DOC** | MANUEL_DU_JOUEUR_HOT.html | - | Manuel complet |
| **REACT** | apps/magic-stack-unified | 5173 | App React principale |
| **REACT** | apps/world-editor | 5174 | Éditeur React |

---

## 🔧 LANCEMENT CORRECT

### Étape 1: Lancer les services backend
```bash
# Lance TOUT en mode dev
./LANCE_TOUT_MODE_DEV.sh

# Ou via le menu h
./h 1  # Lance tous les services
```

### Étape 2: Ouvrir les pages
```bash
# Ouvre toutes les pages d'un coup (ATTENTION!)
for page in *.html; do 
    open "$page"
    sleep 1  # Évite de surcharger
done
```

### Étape 3: Pour arrêter
```bash
./STOP_TOUT_MODE_DEV.sh
```

---

## ⚠️ IMPORTANT POUR LE FRONTEND

**NE PAS LANCER** ces services depuis SpinForest:
- ❌ Java Backend (8080) - Déjà lancé ici
- ❌ Rust Orchestrator (3001) - Déjà lancé ici
- ❌ Vector DB (7500) - Déjà lancé ici
- ❌ LLM Clippy (7501) - Déjà lancé ici

**UTILISER** ces endpoints depuis le frontend:
```javascript
const API_V2 = 'http://localhost:8080/api/v2';
const ORCHESTRATOR = 'http://localhost:3001/api';
const VECTOR_DB = 'http://localhost:7500/api';
const LLM_CLIPPY = 'http://localhost:7501/api';
```

---

## 📈 TOTAL

- **47 pages HTML**
- **6 jeux jouables**
- **3 outils développeur**
- **3 interfaces UI**
- **2 apps React**
- **5 documentations interactives**

---

*Tout est là, il suffit de lancer et tester!*
