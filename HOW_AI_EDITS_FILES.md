# 🤖 Comment les AI (Claude & GPT) éditent les fichiers

## Vue d'ensemble

Nous utilisons des **outils** (tools) pour modifier les fichiers. C'est un système standardisé qui permet aux AI de faire des changements précis dans le code.

---

## 🛠️ Les outils disponibles

### 1. **search_replace** (Le plus précis)
```
- Trouve une chaîne exacte
- La remplace par une nouvelle
- Exemple: Corriger }>> en }>
```

### 2. **write** (Pour créer/écraser)
```
- Crée un nouveau fichier
- Ou remplace complètement le contenu
- Exemple: Créer STATUS_VINCENT.md
```

### 3. **MultiEdit** (Pour plusieurs changements)
```
- Fait plusieurs search_replace d'un coup
- Plus efficace pour beaucoup de modifications
```

---

## 📝 Exemple concret: Fix de ParityPage.tsx

### Ce qui s'est passé:
1. **Erreur détectée:** `}>>` au lieu de `}>`
2. **Tool utilisé:** `search_replace`
3. **Paramètres:**
```json
{
  "file_path": "magic-stack/apps/magic-stack-unified/src/pages/ParityPage.tsx",
  "old_string": "const out: Array<{ name: string; ok: boolean; snapshot: any; hash: string; expected?: string }>> = [] as any;",
  "new_string": "const out: Array<{ name: string; ok: boolean; snapshot: any; hash: string; expected?: string }> = [] as any;"
}
```

### Résultat:
- Le fichier est modifié instantanément
- Git voit le changement
- TypeScript compile maintenant

---

## 🔄 Workflow Claude ↔ GPT

### Claude (moi):
```
1. read_file → Lit le code
2. Trouve l'erreur ligne 37
3. search_replace → Fix le >>
4. git commit → Sauvegarde
```

### GPT (pareil):
```
1. Détecte erreur compilation
2. Utilise search_replace ou write
3. Vérifie avec npm run type-check
4. Continue son travail
```

---

## ⚡ Pourquoi c'est efficace

### Avantages:
- ✅ **Précis** - Pas d'erreur humaine
- ✅ **Rapide** - Changements instantanés
- ✅ **Traçable** - Git voit tout
- ✅ **Réversible** - On peut annuler

### Limites:
- ❌ Besoin de la chaîne exacte pour search_replace
- ❌ Peut pas faire de refactoring complexe visuellement
- ❌ Dépend de la qualité de notre analyse

---

## 🎯 En pratique

### Quand Claude édite:
```bash
# Je vois l'erreur
ParityPage.tsx ligne 37: }>>

# J'utilise l'outil
search_replace(
  old: "...}>> = []",
  new: "...}> = []"
)

# Résultat immédiat
✅ Fichier corrigé
```

### Quand GPT édite:
```bash
# Même processus
# Mêmes outils
# Même efficacité
```

---

## 📊 Stats de cette session

| Outil | Utilisations | Exemple |
|-------|--------------|---------|
| write | 15+ | Créé MAP_EDITOR_6D_ADAPTER.html |
| search_replace | 8+ | Fix ParityPage.tsx |
| read_file | 20+ | Analyse des erreurs |
| run_terminal_cmd | 50+ | Git, npm, tests |

---

## 🤝 Collaboration

Les deux AI utilisent:
- **Mêmes outils** standardisés
- **Même syntaxe** de commandes
- **Même repo Git** en temps réel
- **Résultats identiques** peu importe qui édite

C'est pour ça que la collaboration Claude ↔ GPT marche si bien!

---

*Créé pour Vincent - 14 août 2025*
