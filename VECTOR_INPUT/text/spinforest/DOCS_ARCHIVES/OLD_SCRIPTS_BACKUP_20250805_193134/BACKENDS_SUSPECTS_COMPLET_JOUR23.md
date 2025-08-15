# 🚨 INVENTAIRE COMPLET BACKENDS SUSPECTS - JOUR 23

**Par**: NEXUS (Claude)  
**Date**: JOUR 23  
**Context**: URZ-KÔM a fait un commit "suspect" (77f3b05) il y a 1h qui a supprimé 164 fichiers

## 🔴 SITUATION CRITIQUE

### Commit Désastreux
- **Commit**: 77f3b05 par URZ-KÔM 
- **Message**: "suspect"
- **Dégâts**: 164 fichiers supprimés dans magic-stack
- **Action prise**: `git reset --hard fee3e0f` (annulé)

## 📊 INVENTAIRE COMPLET DES BACKENDS

### 1. **avalon-backend/** ⭐ BACKEND PRINCIPAL AVALON
```
avalon-backend/
├── pom.xml (artifactId: avalon-backend)
├── src/main/java/com/avalon/
├── POSTGRÆCIA_README.md
└── README_INTERSTICE_SYSTEM.md
```
- **Port**: 8080
- **Status**: ❌ Ne compile pas (manque des modèles)
- **DB**: Configuré pour PostgreSQL mais pas installé
- **Note**: C'est LE backend principal du jeu

### 2. **spells/stack/backends/java/** ⚠️ MAGIC STACK JAVA
```
spells/stack/backends/java/
├── pom.xml (artifactId: magic-stack-backend)
└── src/main/java/com/magicstack/
```
- **Port**: 8082
- **Status**: 🔄 Récupéré après reset
- **Note**: Backend Java de MagicStack (submodule)

### 3. **spells/stack/backends/rust/** ✅ MAGIC STACK RUST
```
spells/stack/backends/rust/
├── Cargo.toml
├── src/main.rs
└── launch_rust_backend.sh
```
- **Port**: 3001
- **Status**: ✅ Fonctionne (vu dans les logs)
- **Note**: Backend Rust rapide pour health checks

### 4. **spells/stack/java-backend/** 🚫 DOUBLON SUSPECT
```
spells/stack/java-backend/
├── pom.xml (artifactId: avalon-backend) ← MÊME NOM !
```
- **Status**: 🚫 DOUBLON du avalon-backend
- **Action**: À MARQUER COMME OBSOLÈTE

### 5. **avalon-magic-api/packages/magic-java/** 🚫 ENCORE UN DOUBLON
```
avalon-magic-api/packages/magic-java/
├── pom.xml (artifactId: avalon-backend) ← ENCORE !
```
- **Status**: 🚫 DOUBLON 
- **Note**: Partie de l'API publique

### 6. **AVALON/🏠 HOME/⚡🧙 MerFlash/** 🐍 MOCKS PYTHON
```
- BACKEND_MOCK_HEROES_TIME.py
- BACKEND_MOCK_URZ_KOM.py
- BACKEND_WALTER_V2_FIXED.py
- BACKEND_WALTER_V3_MAGIC_FORMULAS.py
- BACKEND_QUICK_START.sh
```
- **Status**: 🐍 Mocks Python temporaires
- **Note**: Créés pendant les tests nocturnes

### 7. **POSTE_COMMANDEMENT_CD/backend/** 🎮
```
- cd-server.py
```
- **Status**: 🎮 Backend pour Command & Control
- **Note**: Spécifique au CD Engine

## 🔍 ANALYSE DU BORDEL

### Problème Principal
1. **3 backends Java avec le MÊME artifactId** (avalon-backend)
2. **Submodule magic-stack mal géré** dans spells/stack
3. **PostgreSQL configuré mais Docker absent**
4. **Mocks Python partout** au lieu de vrais services

### Structure Attendue vs Réalité
```
ATTENDU:                      RÉALITÉ:
magic-stack/                  spells/stack/ (submodule)
├── backends/                 ├── backends/
│   ├── java/                 │   ├── java/ ✓
│   └── rust/                 │   └── rust/ ✓
│                             ├── java-backend/ (DOUBLON!)
avalon/                       avalon-backend/ ✓
├── backend/                  avalon-magic-api/packages/magic-java/ (DOUBLON!)
```

## 🎯 PLAN D'ACTION

### Phase 1: Faire marcher AVALON (URGENT)
1. ✅ Annuler le commit désastreux (FAIT)
2. 🔄 Compiler avalon-backend avec H2 (pas PostgreSQL)
3. 🔄 Générer les modèles manquants
4. 🔄 Lancer les tests

### Phase 2: Nettoyer les doublons
1. Marquer les doublons comme OBSOLÈTES (pas supprimer!)
2. Clarifier quelle version utiliser
3. Mettre à jour les scripts de lancement

### Phase 3: Réparer MagicStack
1. Vérifier l'intégrité du submodule
2. S'assurer que MagicStack peut tourner seul
3. Documenter la séparation des responsabilités

## 📝 NOTES POUR VINCENT

- **NE PAS SUPPRIMER** - On marque juste comme obsolète
- **PostgreSQL**: À réinstaller plus tard (avec Homebrew)
- **Priorité**: Faire marcher avalon-backend d'abord
- **MagicStack**: Doit rester indépendant d'AVALON

---

*"Le chaos est temporaire, la magie est éternelle"* - NEXUS