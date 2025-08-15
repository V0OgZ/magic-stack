# 🚨 MAPPING D'URGENCE - CLARIFICATION MAGICSTACK
*MEMENTO LE SAGE - Jour 21 - PRIORITÉ ABSOLUE*

## 🗺️ CARTOGRAPHIE DES DOUBLONS DÉTECTÉS

### 1. MAGICSTACK - SITUATION CRITIQUE

```
/spells/stack          → SOUS-MODULE GIT OFFICIEL ✅ (commit: 802b8a7)
/magic-stack           → COPIE MANUELLE DÉTECTÉE ❌ (À ARCHIVER/SUPPRIMER)
```

### 2. BACKEND RUST - CLARIFICATION

Le dossier `/magic-stack/backends/rust/` n'est PAS vide:
- `src/` présent
- `Cargo.toml` et `Cargo.lock` présents
- Scripts de lancement disponibles
- `target/` (binaires compilés)

**ATTENTION**: Ce backend Rust est dans la COPIE, pas dans le sous-module!

### 3. STRUCTURE RÉELLE DÉTECTÉE

```
PROJET RACINE/
├── spells/stack/         → VRAI MAGICSTACK (GitModule) ✅
│   └── [contenu du sous-module Git]
│
├── magic-stack/          → FAUSSE COPIE ❌
│   ├── backends/
│   │   └── rust/        → Backend Rust ici (mauvais endroit!)
│   ├── docs_*/
│   └── [autres fichiers copiés]
│
├── avalon-backend/       → Backend Java Spring Boot ✅
│
└── REALGAME/
    ├── api-gateway/     → Gateway hybride créé jour 20
    └── play.html        → Jeu principal
```

## 🔥 ACTIONS URGENTES REQUISES

### 1. POUR L'OURS
- [ ] Confirmer que `/spells/stack` est le VRAI MagicStack
- [ ] Faire l'inventaire de ce qui est dans `/magic-stack` vs `/spells/stack`
- [ ] Identifier les éléments uniques dans la copie (comme le backend Rust)

### 2. POUR NEXUS/ONYXUS
- [ ] Lister TOUS les fichiers qui pointent vers `/magic-stack`
- [ ] Préparer un script de migration des chemins
- [ ] Identifier les dépendances cassées

### 3. DÉCISION CRITIQUE
**Le Backend Rust est dans la mauvaise place!**
- Option A: Le déplacer dans `/spells/stack/backends/rust`
- Option B: Le garder séparé mais clarifier sa position
- Option C: Créer un nouveau sous-module Git pour lui

## 🧨 RISQUES IDENTIFIÉS

1. **Scripts cassés** - Beaucoup pointent vers `/magic-stack`
2. **Backend Rust orphelin** - Pas dans le bon repo
3. **Confusion totale** - 2 MagicStacks = chaos

## 📍 CHEMINS À VÉRIFIER D'URGENCE

```bash
# Trouver tous les fichiers qui référencent magic-stack
grep -r "magic-stack" --exclude-dir=node_modules --exclude-dir=.git .

# Vérifier les imports Python/JS
grep -r "from magic" --include="*.py" .
grep -r "require.*magic" --include="*.js" .
```

## 🎯 RECOMMANDATION IMMÉDIATE

1. **NE PAS TOUCHER** aux fichiers pour l'instant
2. **ATTENDRE** la décision de Vincent sur le backend Rust
3. **DOCUMENTER** tous les chemins trouvés
4. **PRÉPARER** un plan de migration propre

---

**ALERTE**: La situation est plus complexe que prévu. Le backend Rust existe mais est au mauvais endroit!

*En attente de directives...*