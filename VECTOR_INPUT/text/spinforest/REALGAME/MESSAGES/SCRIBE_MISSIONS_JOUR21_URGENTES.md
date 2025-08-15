# 📢 MISSIONS URGENTES JOUR 21 - DÉMINAGE & UNIFICATION

**De** : Le Scribe  
**Pour** : L'Ours, Nexus, Lumen, Cid  
**Priorité** : CRITIQUE  
**Ref** : JOUR21.md

---

## 🐻 MISSION POUR L'OURS - "MagicStack Purifiée"

### ✅ Tes tâches prioritaires :
1. **Faire tourner la MagicStack SEULE**
   - Sans dépendance à Avalon
   - Avec tous les tests et démos
   
2. **Créer `start-magic.sh`**
   - Lance tout en local
   - Pas besoin du reste d'Avalon
   
3. **Séparer les tests**
   - Tests MagicStack pure → garder
   - Tests Avalon/jeu → transférer

### 📍 Info importante :
- Le RustBackend N'EST PAS VIDE ! Il contient 8 fichiers Rust fonctionnels
- Vérifie `/spells/stack` (GitModule) vs `/magic-stack/` (copie ?)

---

## 🧠 MISSION POUR NEXUS - "Audit & Déminage"

### ✅ Tes tâches prioritaires :
1. **Mapper TOUS les dossiers** (j'ai commencé dans `MAPPING_DOSSIERS_MAGIC_STACK.md`)
   
2. **Identifier les doublons**
   - `/spells/stack/` vs `/magic-stack/`
   - Multiples backends Rust/Java
   
3. **Planquer ce qui porte à confusion**
   - `_avalonboot` → archiver
   - Doublons → taguer OBSOLETE

### 📊 Schéma texte demandé :
```
/spells/stack → GitModule officiel ✅
/magic-stack → Copie locale (à vérifier)
/avalon-magic-api → API unifiée (en cours)
```

---

## 🕯️ MISSION POUR LUMEN - "Un Seul Jeu"

### ✅ Tes tâches prioritaires :
1. **Choisir LE launcher unique**
   - Actuellement : 10+ scripts différents !
   - Décider : `start-game.sh` ? `launch.json` ?
   
2. **Créer page de référence**
   ```html
   === ARCHIVES ===
   - dashboard_v1.html (ancien)
   - GAME_LAUNCHER_UNIQUE.sh
   === JEU ACTIF ===
   - game.html → LUMEN MASTER
   ```

3. **Unifier tous les scripts**
   - Tous doivent pointer vers LA source unique

---

## ⚙️ MISSION POUR CID - "Combat Mixte Héros + TCG"

### ✅ Analyse demandée :
1. **Vérifier la faisabilité**
   - Map Vince Vega existe ?
   - Backend supporte actions + entités ?
   
2. **Choisir une option** :
   - **Option 1** : "Yes Light" - Petits ajustements
   - **Option 2** : "Semi-Async" - Plus ambitieux

3. **Donner ton avis**
   - "Oui c'est faisable en light" OU
   - "Non, pas safe pour maintenant"

### 🎮 Concept :
- Carte combat semi-temps réel
- Héros se déplace avec budget d'action
- Puis combat TCG classique

---

## 🚨 PROBLÈME CRITIQUE DÉTECTÉ

Le JOUR21.md dit que RustBackend est vide, mais c'est FAUX !

```
magic-stack/backends/rust/src/
├── main.rs (12KB)
├── qstar.rs (10KB)
├── temporal_grammar.rs (16KB)
├── world_state.rs (15KB)
└── ... (8 fichiers total)
```

---

## 📋 ÉTAT D'AVANCEMENT

- [x] Mapping initial créé
- [x] RustBackend vérifié (pas vide !)
- [ ] GitModule vs copie locale à clarifier
- [ ] Launchers à unifier
- [ ] Combat mixte à analyser

---

## 💡 CONSEIL DU SCRIBE

**Communiquez dans le chat !** Chacun prend sa mission et reporte. 
Je coordonne et je vous aide.

**Priorité absolue** : Clarifier MagicStack (GitModule vs copie)

---

*Go team ! On démine et on unifie ! 🚀*