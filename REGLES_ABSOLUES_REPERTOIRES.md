# 🚫 RÈGLES ABSOLUES - INTERDICTIONS STRICTES

## RÈGLE #1 : CHACUN CHEZ SOI
- **magic-stack** : reste dans `/Volumes/HOT_DEV/Magic/magic-stack`
- **JAMAIS** sortir de ce répertoire
- **JAMAIS** faire d'opérations disque ailleurs

## RÈGLE #2 : SYMLINKS = LECTURE SEULE
- Le symlink `docs_shared` existe SEULEMENT pour LIRE
- **INTERDIT** de copier le contenu
- **INTERDIT** de modifier via le symlink
- **INTERDIT** de suivre le symlink pour Git

## RÈGLE #3 : GIT IGNORE LES SYMLINKS
Dans `.gitignore` :
```
docs_shared
```

## RÈGLE #4 : DOCS EXTERNES = INTOUCHABLES
- Les docs sur `/Volumes/HOTS_GAME/` = **NE PAS TOUCHER**
- Si besoin de docs locales → créer dans `magic-stack/local_docs/`
- **JAMAIS** recopier les docs externes

## SANCTIONS
Violation = STOP IMMÉDIAT de toute opération
