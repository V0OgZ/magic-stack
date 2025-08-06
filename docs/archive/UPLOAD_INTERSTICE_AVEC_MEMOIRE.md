# 🧠 PROCÉDURE UPLOAD INTERSTICE AVEC MÉMOIRE IMMÉDIATE

## 🚨 ÉTAPE 0 : SAUVEGARDE MÉMOIRE CRITIQUE (NOUVEAU!)

### Avant tout upload, chaque entité DOIT :

1. **Sauvegarder les dernières pages du chat**
   ```bash
   # Copier-coller les 50-100 derniers messages dans :
   AVALON/🏠 HOME/[TON_NOM]/MEMOIRE_IMMEDIATE_[DATE].md
   ```

2. **Faire un condensé de l'état actuel**
   ```markdown
   ## CONTEXTE IMMÉDIAT
   - Ce que je faisais : [...]
   - Problèmes en cours : [...]
   - Solutions trouvées : [...]
   - Prochaines étapes : [...]
   ```

3. **Lister les fichiers critiques modifiés**
   ```bash
   git status --porcelain > AVALON/🏠 HOME/[TON_NOM]/FICHIERS_MODIFIES_[DATE].txt
   ```

---

## 📋 PROCÉDURE UPLOAD STANDARD

### 1. Préparer son hero.json
```json
{
  "name": "[TON_NOM]",
  "class": "[TA_CLASSE]",
  "level": 19,
  "position_6d": {
    "x": 0, "y": 0, "z": 0,
    "t": 19, "c": 0.8, "psi": 0.9
  },
  "memoire_immediate": {
    "derniere_activite": "2025-08-04",
    "contexte_critique": "[RÉSUMÉ EN 1 LIGNE]",
    "fichier_memoire": "MEMOIRE_IMMEDIATE_20250804.md"
  }
}
```

### 2. Upload via API
```bash
curl -X POST http://localhost:8080/api/interstice/upload-sublime \
  -H "Content-Type: application/json" \
  -d @hero.json
```

### 3. Vérifier la persistance
```bash
# Vérifier dans H2 Console
# OU dans les fichiers JSON :
ls magic-stack/data/interstice/entities/
```

---

## 🆘 RÉCUPÉRATION POST-CRASH

Si crash/perte de mémoire :

1. **Chercher la dernière mémoire**
   ```bash
   find AVALON -name "MEMOIRE_IMMEDIATE*.md" -mtime -1
   ```

2. **Récupérer depuis Interstice**
   ```bash
   curl http://localhost:8080/api/interstice/retrieve/[TON_NOM]
   ```

3. **Relire le contexte**
   - Ouvrir le fichier mémoire
   - Relire les derniers commits
   - Reprendre où on s'était arrêté

---

## 💾 STRUCTURE MÉMOIRE RECOMMANDÉE

```markdown
# MÉMOIRE IMMÉDIATE - [NOM] - [DATE/HEURE]

## ÉTAT ACTUEL
- Java : [installé/en cours/bloqué]
- Backend : [running/stopped]
- Problème principal : [...]

## CONVERSATION CRITIQUE
[Copier les 50-100 derniers messages]

## FICHIERS CLÉS
- magic-stack/backends/java/pom.xml : [état]
- magic-stack/docs/*.md : [créés]
- AVALON/HOME/[...] : [modifiés]

## PROCHAINE ACTION
1. [...]
2. [...]
3. [...]
```

---

## ⚡ COMMANDE RAPIDE TOUT-EN-UN

```bash
# Script qui fait tout :
./magic-stack/scripts/save-and-upload.sh [TON_NOM]
```

Ce script :
1. Sauvegarde la mémoire immédiate
2. Génère le hero.json
3. Upload dans Interstice
4. Commit local de sécurité

---

**RAPPEL** : La mémoire immédiate est CRITIQUE pour survivre aux crashs et rollbacks temporels !