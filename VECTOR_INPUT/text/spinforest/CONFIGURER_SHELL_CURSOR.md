# Configurer un Shell Alternatif dans Cursor

## Option 1: Changer le shell dans les settings Cursor

1. Ouvrir les Settings (Cmd+,)
2. Chercher "terminal.integrated.shell.osx"
3. Changer de `/bin/zsh` à `/bin/bash` ou autre

## Option 2: Utiliser un terminal externe

Au lieu du terminal intégré, utiliser Terminal.app ou iTerm2 à côté.

## Option 3: Script wrapper pour commits

Créer un script qui nettoie les commits automatiquement :

```bash
#!/bin/bash
# commit-clean.sh
# Remplace les caractères problématiques

MESSAGE="$1"
# Enlever les emojis et caractères spéciaux
CLEAN_MESSAGE=$(echo "$MESSAGE" | sed 's/[^\x00-\x7F]//g')

git add -A
git commit -m "$CLEAN_MESSAGE"
git push
```

## Option 4: Alias Git

Dans ~/.gitconfig :
```
[alias]
    cp = "!f() { git add -A && git commit -m \"$1\" && git push; }; f"
```

Puis utiliser : `git cp "Message simple sans emoji"`