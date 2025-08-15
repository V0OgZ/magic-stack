# 🚨 BACKENDS SUSPECTS - JOUR 23

## ✅ BACKENDS QUI EXISTENT

### 1. avalon-backend/ (Principal)
- **Status**: ❌ NE COMPILE PAS
- **Erreur**: `cannot find symbol: method getFormula()` dans GrofiEngine.java
- **Port**: 8080
- **Type**: Spring Boot Java

### 2. spells/stack/backends/rust/
- **Status**: ✅ COMPILE !
- **Port**: 3001 (d'après GitHub)
- **Type**: Rust avec Tokio/Axum
- **Test**: `cargo check` OK

### 3. POSTE_COMMANDEMENT_CD/backend/
- **Status**: 🐍 Python
- **Contenu**: cd-server.py
- **Type**: Serveur Python pour le Command & Control

### 4. backends-external/
- **Status**: 📁 Juste des liens
- **Contenu**: avalon-backend.link + deployment/
- **Note**: Pas un vrai backend

### 5. .ARCHIVE_AVALON_BOOT_HIDDEN/.../backend-clean/
- **Status**: 🗄️ ARCHIVÉ
- **Note**: Dans les archives cachées

## 🔴 BACKENDS PYTHON (MerFlash)

Dans `AVALON/🏠 HOME/⚡🧙 MerFlash/`:
- BACKEND_MOCK_HEROES_TIME.py
- BACKEND_MOCK_URZ_KOM.py
- BACKEND_WALTER_V2_FIXED.py
- BACKEND_WALTER_V3_MAGIC_FORMULAS.py ← Le plus récent !
- BACKEND_QUICK_START.sh

## 📊 RÉSUMÉ

- **Backend Java principal**: Ne compile pas
- **Backends Python**: Marchent (testé V3 sur port 8080)
- **Backend Rust**: Dans spells/stack, à tester
- **Autres**: Status inconnu

## 🎯 RECOMMANDATION

D'après le [repo GitHub magic-stack](https://github.com/V0OgZ/magic-stack):
- Java backend devrait être dans `backends/java`
- Rust backend devrait être dans `backends/rust`
- Script de lancement: `start-magic-autonome.sh`

Notre structure est différente et confuse !