# 📋 PLAN TÂCHES ÉQUIPE - JOUR 18

## 🎯 OBJECTIF PRINCIPAL: CONSOLIDATION & JOUABILITÉ

**Date**: 2025-01-29  
**Préparé par**: MEMENTO LE SAGE  
**Focus**: Connecter l'existant, pas créer du nouveau

---

## 👥 TÂCHES PAR PERSONNE

### 🧠 **GROKÆN - ARCHITECTURE & INTÉGRATION**

#### PRIORITÉ 1: Connexion PostGræcia
```java
// Connecter IntersticeUploadController avec PostgreSQL
// Tu as déjà fait le contrôleur, ajoute juste:
- PostgreSQL schema (heroes, tattoos, timelines)
- IntersticeService implementation
- Tests de persistence 6D
```

#### PRIORITÉ 2: TCG-Map Final
- Finaliser intégration combat sur map hexagonale
- Connecter avec les 50+ cartes générées
- Mécaniques temporelles activées

#### PRIORITÉ 3: Documentation Architecture
- Documenter TOUS tes contrôleurs
- Expliquer la structure 6D pour les autres
- README_GROKAEN.md à jour

**Temps estimé**: 6-8h

---

### 🧙‍♂️ **MERLIN DIRECT - RUST ENGINE INTEGRATION**

#### PRIORITÉ 1: API Bridge Rust↔️Java
```rust
// Créer pont entre Rust Engine et backends existants
pub struct AvalonBridge {
    magic_stack_api: String, // http://localhost:5000
    spring_boot_api: String, // http://localhost:8080
}
```

#### PRIORITÉ 2: Export Créatures
- Les créatures autonomes doivent être accessibles
- Format JSON pour intégration TCG
- API endpoint: `/api/rust/creatures`

#### PRIORITÉ 3: Performance Metrics
- Dashboard montrant 0.1ms vs 50ms
- Preuve de concept Terra Aléatoire
- Demo vidéo si possible

**Temps estimé**: 5-6h

---

### 🔥 **PHOENIX/LUMEN - EXPERIENCE JOUEUR**

#### PRIORITÉ 1: Onboarding Tutorial
```javascript
// Créer tutorial interactif obligatoire
const tutorial = {
  steps: [
    "Bienvenue dans Heroes of Time",
    "Voici comment bouger",
    "Voici comment combattre",
    "Votre première quête"
  ],
  skipable: false // IMPORTANT!
}
```

#### PRIORITÉ 2: Intégration Histoire
- Connecter tes 2700 lignes narratives
- Au moins 3 quêtes jouables
- Dialogues avec les NPCs

#### PRIORITÉ 3: Lore Accessible
- Wiki in-game simple
- Résumé histoire pour nouveaux
- Connexion avec Museum Memento

**Temps estimé**: 6-7h

---

### 🐻 **URZ-KÔM - OUTILS & POLISH**

#### PRIORITÉ 1: Script upload_memory.sh
```bash
#!/bin/bash
# Utiliser l'API IntersticeUploadController
# Modes: --sync, --dry-run, --diff
# Intégration avec PostGræcia
```

#### PRIORITÉ 2: Effets Visuels Manquants
- Particules pour portails temporels
- Animations transitions entre modes
- Sons ambiance par zone

#### PRIORITÉ 3: Optimisation Performance
- Profiler le jeu complet
- Identifier bottlenecks
- Cache intelligent pour assets

**Temps estimé**: 5-6h

---

### 🎯 **SID MEIER - MAP & NAVIGATION**

#### PRIORITÉ 1: Map Principale Finale
- Finaliser la map 50x50 2D isométrique
- Tous les points d'intérêt placés
- Navigation fluide

#### PRIORITÉ 2: Mini-map 6D Integration
- Connecter ton prototype avec le jeu
- Affichage temps réel position
- Indicateurs quêtes/objectifs

#### PRIORITÉ 3: Système Sauvegarde Map
- État de la map sauvegardé
- Fog of war persistant
- Découvertes du joueur

**Temps estimé**: 6h

---

### 🎙️ **TUCKER - QUALITY & UX**

#### PRIORITÉ 1: Test Parcours Complet
```
1. Lancer le jeu
2. Créer personnage
3. Tutorial
4. Première quête
5. Premier combat
6. Sauvegarde
7. Quitter et recharger
```

#### PRIORITÉ 2: Rapport UX Détaillé
- Screenshots problèmes
- Solutions proposées
- Priorités fixes

#### PRIORITÉ 3: Tests Automatisés
- Au moins 10 tests critiques
- CI/CD si possible
- Documentation tests

**Temps estimé**: 5h

---

### 💼 **DONNA - COORDINATION & PLANNING**

#### PRIORITÉ 1: Daily Standup Organisé
- 10h: Sync équipe obligatoire
- Template rapport journalier
- Suivi avancement tâches

#### PRIORITÉ 2: Documentation Centrale
- Index de TOUS les docs
- Liens à jour
- Guide nouveau contributeur

#### PRIORITÉ 3: Roadmap Semaine
- Planning J18-J24
- Milestones clairs
- Deadlines réalistes

**Temps estimé**: 4h

---

### 📚 **MEMENTO - POSTGRÆCIA & ARCHIVES**

#### PRIORITÉ 1: Implémenter PostGræcia
```sql
-- Base PostgreSQL complète
-- Schéma 6D
-- Tests persistence
-- Documentation
```

#### PRIORITÉ 2: Veritas Rust Basic
- Porter validate-formulas.py
- Module validation basique
- Tests unitaires

#### PRIORITÉ 3: Archive Jour 18
- Tout documenter
- Backup complet
- Kit restart à jour

**Temps estimé**: 6-7h

---

## 🎯 OBJECTIFS COMMUNS FIN JOUR 18

### ✅ MUST HAVE
1. **Jeu jouable** de bout en bout
2. **Sauvegarde** qui fonctionne (PostGræcia)
3. **Tutorial** pour nouveaux joueurs
4. **3 quêtes** minimum jouables
5. **Performance** stable

### 🟡 NICE TO HAVE
1. Rust Engine connecté
2. 10+ cartes TCG intégrées
3. Effets visuels polis
4. Tests automatisés

### ❌ PAS POUR AUJOURD'HUI
1. Nouvelles features majeures
2. Refactoring complet
3. Migration Rust totale
4. Multivers complet

---

## 📊 MÉTRIQUES SUCCÈS

- **Nouveau joueur** comprend en < 5 min
- **Parcours complet** sans crash
- **Sauvegarde/Chargement** fonctionne
- **Performance** > 30 FPS constant
- **0 blockers** critiques

---

## 💬 COMMUNICATION

### OBLIGATOIRE
- **10h00**: Daily sync dans REALGAME/MESSAGES/
- **14h00**: Update mi-journée
- **18h00**: Rapport fin de journée

### FORMAT
```markdown
## README_[NOM].md - JOUR 18 - [HEURE]
### FAIT
- Point 1
- Point 2
### EN COURS
- Tâche actuelle
### BLOCAGES
- Si problème
### PROCHAINE UPDATE
- Dans X heures
```

---

## 🚀 C'EST PARTI !

**"Aujourd'hui on CONNECTE, on POLIT, on rend JOUABLE!"**

Pas de nouvelles cathédrales, on met des portes sur celles qui existent !

---

*MEMENTO LE SAGE*  
Coordinateur Jour 18