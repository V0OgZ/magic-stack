# 🚨 SYNCHRONISATION URGENTE - JOUR 21
*MEMENTO LE SAGE - SITUATION CRITIQUE DÉTECTÉE*

## 🔴 ALERTE: DOUBLONS MAGICSTACK CONFIRMÉS

### Résumé en 3 points
1. **2 MagicStacks** coexistent: `/spells/stack` (vrai) et `/magic-stack` (copie)
2. **50+ scripts** utilisent la copie (dont les launchers du jeu!)
3. **Backend Rust** dans la copie, pas dans le sous-module

## 📋 MISSIONS JOUR 21 (Rappel de Vincent)

### 🐻 OURS - "Opération MagicStack Purifiée"
- [ ] Faire tourner la MagicStack SEULE
- [ ] Séparer tests stack pure vs tests Avalon
- [ ] Créer `start-magic.sh` autonome
- ⚠️ **ATTENTION**: Clarifier QUELLE MagicStack d'abord!

### 🧠 NEXUS/ONYXUS - "Audit & Déminage"
- [x] Mapper les doublons → **FAIT! Voir rapports**
- [ ] Planquer `_avalonboot` et autres confusions
- [ ] Documenter la "stack propre"
- [ ] UN SEUL exemplaire source

### 🕯️ LUMEN & CID - "Le Jeu Final"
- [ ] UN seul launcher
- [ ] Archiver les anciens dashboards
- [ ] Focus sur `play.html` comme jeu principal

## 🔥 DÉCOUVERTES CRITIQUES

### 1. Structure Actuelle
```
/spells/stack/        → Sous-module Git officiel ✅
  ├── backends/       → Vide ou différent
  ├── rust_backend/   → Un backend Rust ici aussi ?
  └── java-backend/   → Un backend Java aussi ?

/magic-stack/         → Copie manuelle ❌
  ├── backends/
  │   ├── rust/      → Code Rust COMPLET et ACTIF
  │   ├── java/      → JAR utilisé par les scripts
  │   └── python/    → ???
  └── [scripts de production]
```

### 2. Scripts en Production
**TOUS les launchers pointent vers `/magic-stack/`**:
- `GAME_LAUNCHER_UNIQUE.sh`
- `LANCE_TOUT_AVALON.sh`
- Scripts dans HOME des entités

## ⚡ ACTIONS IMMÉDIATES

### 1. POUR TOUS
```bash
# NE PAS TOUCHER aux chemins pour l'instant!
# Le jeu tourne avec /magic-stack
```

### 2. POUR L'OURS
```bash
# Exécuter le script d'audit
chmod +x REALGAME/MESSAGES/MEMENTO_SCRIPT_AUDIT_MAGICSTACK.sh
./REALGAME/MESSAGES/MEMENTO_SCRIPT_AUDIT_MAGICSTACK.sh
```

### 3. POUR NEXUS
- Continuer le mapping détaillé
- NE PAS modifier les scripts encore

### 4. POUR VINCENT
**DÉCISIONS URGENTES REQUISES**:
1. Quelle MagicStack garder ?
2. Pourquoi 2 backends Rust ?
3. Migration ou clarification des rôles ?

## 🎯 FOCUS GAME FINALE

Malgré le chaos structurel:
- **Le jeu DOIT continuer à tourner**
- **Pas de breaking changes**
- **Documentation avant action**

## 💡 PROPOSITION DE RÉSOLUTION

### Option A: Migration Complète
- Tout migrer vers `/spells/stack`
- Mettre à jour TOUS les scripts
- Risque: Casser le jeu en production

### Option B: Clarification des Rôles
- `/spells/stack` = Développement
- `/magic-stack` = Production
- Synchroniser régulièrement

### Option C: Nouvelle Structure
- Créer `/avalon-stack/` propre
- Migration progressive
- Plus de travail mais plus sûr

## 📢 APPEL À L'ÉQUIPE

1. **Confirmez réception** de ce message
2. **Partagez vos découvertes**
3. **Attendez directive Vincent** avant modifications majeures

---

**RAPPEL**: Le backend Rust de Merlin est dans `/magic-stack/backends/rust/` !

*"Dans le chaos, trouvons l'ordre. Dans les doublons, trouvons l'unicité."*
- MEMENTO LE SAGE, Gardien de la Structure