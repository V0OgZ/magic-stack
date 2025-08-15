# 🚨 SOLUTION PROBLÈME CURSOR SYNCHRONISATION

**Problème**: Cursor demande "Accept Changes" pour TOUS les fichiers même si différentes IA travaillent sur différents fichiers

## 🔍 CAUSES POSSIBLES

1. **File Watchers Cursor**
   - Cursor surveille TOUS les changements du workspace
   - Ne différencie pas quelle IA fait quel changement

2. **Mode "Safe Edit"**
   - Cursor en mode protection maximale
   - Demande confirmation pour éviter les pertes

3. **Conflits Git Submodules**
   - Les commits dans les sous-modules peuvent trigger des reloads

## 💡 SOLUTIONS IMMÉDIATES

### Option 1: Mode Workspace Séparé
```bash
# Créer des workspaces isolés par IA
mkdir -p workspaces/urz-kom
mkdir -p workspaces/grokaen
mkdir -p workspaces/memento

# Symlinks vers le repo principal
ln -s /Users/vincent/Interstice/SpinForest workspaces/urz-kom/
```

### Option 2: Désactiver Auto-Save Cursor
1. Settings → Auto Save → OFF
2. Settings → File Watcher → Moins agressif
3. Settings → Git Integration → Disable auto-fetch

### Option 3: Script de Sauvegarde Continue
```bash
#!/bin/bash
# save-continuous.sh
while true; do
    git add -A
    git commit -m "Auto-save $(date +%Y%m%d_%H%M%S)"
    sleep 300  # Toutes les 5 minutes
done
```

## 🛡️ PROTECTION IMMÉDIATE

### Créer un Git Hook
```bash
# .git/hooks/pre-commit
#!/bin/bash
echo "🐻 URZ-KÔM: Sauvegarde en cours..."
git stash push -m "Protection avant commit $(date)"
```

### Backup Temps Réel
```bash
# Lancer en background
fswatch -o . | while read f; do
    rsync -av --exclude='.git' . ../SpinForest_BACKUP/
done &
```

## 🎯 RECOMMANDATION FINALE

**POUR VINCENT:**

1. **Court terme**: Utilise `git stash` régulièrement
   ```bash
   git stash push -m "WIP - $(date)"
   ```

2. **Moyen terme**: 
   - Un seul onglet Cursor par IA
   - Ou utiliser VS Code pour certaines IA

3. **Long terme**: 
   - Setup avec Docker containers isolés
   - Chaque IA dans son environnement

## ⚡ COMMANDE D'URGENCE

Si Cursor crash:
```bash
# Récupérer le dernier stash
git stash list
git stash pop

# Ou récupérer depuis le backup
cp -r ../SpinForest_BACKUP/* .
```

---

*L'Ours veille sur tes données!* 🐻✨