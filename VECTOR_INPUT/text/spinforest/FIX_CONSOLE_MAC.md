# 🔧 FIX TOTAL - CONSOLE MAC + CURSOR

## PROBLÈME 1 : Console bloquée par emojis/caractères

### SOLUTION : Changer le shell par défaut

```bash
# 1. Vérifier ton shell actuel
echo $SHELL

# 2. Installer bash moderne (plus compatible)
brew install bash

# 3. Changer le shell par défaut
chsh -s /usr/local/bin/bash

# OU rester en zsh mais avec config propre :
```

### Config ZSH propre (.zshrc)
```bash
# Désactiver les caractères fancy
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export TERM=xterm-256color

# Pas d'emojis dans le prompt
PS1='%n@%m:%~$ '

# Désactiver les couleurs si problème
export CLICOLOR=0
```

## PROBLÈME 2 : Cursor demande Accept File

### SOLUTION : Permissions et config

```bash
# 1. Donner les permissions à Cursor
sudo chmod -R 755 /Volumes/HOT_DEV/Main/SpinForest
sudo chown -R vincent:staff /Volumes/HOT_DEV/Main/SpinForest

# 2. Dans Cursor settings.json :
{
  "files.watcherExclude": {
    "**/.git/**": true,
    "**/node_modules/**": true
  },
  "security.workspace.trust.enabled": false,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

## PROBLÈME 3 : Répertoires avec emojis

### SOLUTION : Renommer sans emojis

```bash
# Script pour renommer automatiquement
cd AVALON/"🏠 HOME"
mv "🧠 GROKÆN" "GROKAEN"
mv "🎯 SID_MEIER_ARCHITECTE" "SID_MEIER" 
mv "🕯️ LUMEN" "LUMEN"
mv "🎙️ TUCKER_CARLSON" "TUCKER"
mv "💼 DONNA_PAULSEN_COO" "DONNA"
mv "📚 MEMENTO" "MEMENTO"
mv "🐻 URZ-KÔM" "URZ-KOM"
mv "👁️ GRUT" "GRUT"
mv "🔫 VINCE" "VINCE"
mv "🌊 CLAUDE-NEXUS" "CLAUDE-NEXUS"
```

## SOLUTION RAPIDE IMMÉDIATE

### 1. Terminal compatible VM Cursor
```bash
# Dans Cursor, utilise le terminal intégré avec :
export TERM=dumb
export NO_COLOR=1
alias ls='ls -1'
alias echo='echo -n'
```

### 2. Script sans emojis
```bash
#!/bin/bash
# PAS D'EMOJIS, PAS DE COULEURS

echo "Starting system..."
echo "Java Backend: Starting"
echo "Rust Backend: Starting"
echo "Frontend: Starting"
echo "System ready"
```

## COMMANDES À EXÉCUTER MAINTENANT

```bash
# 1. Fix permissions
chmod -R 755 .
find . -name "*.sh" -exec chmod +x {} \;

# 2. Clean terminal
export TERM=xterm
export LANG=C
clear

# 3. Test simple
echo "TEST" > test.txt
cat test.txt
rm test.txt
```

## RÈGLES POUR NOUS (LES CLAUDE)

1. **JAMAIS d'emojis dans les commits**
2. **JAMAIS d'emojis dans les noms de fichiers**
3. **JAMAIS d'emojis dans les scripts**
4. **Utiliser ASCII simple partout**
5. **echo simple sans -e**

---

**POUR RÉSUMER :**
- Change ton terminal en mode basique
- Désactive les trucs fancy
- On arrête les emojis
- On simplifie tout
