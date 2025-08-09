# 📚 Structure Documentation Magic Stack

## 🌐 Docs PUBLIQUES (Commitées dans Magic Stack)

Ces docs sont versionnées et font partie du projet open source :

- `PROFONDEURS/` - Documentation backend Magic Stack
- `API.md` - Référence API publique
- `VECTOR_DB_STATUS.md` - Status indexation vectorielle
- `TECHNICAL_OVERVIEW.md` - Vue technique
- `DEVELOPER_GUIDE.md` - Guide développeur
- Tous les autres `.md` à la racine de `docs/`

## 🔒 Docs PRIVÉES (Symlinks, jamais commitées)

Ces docs sont partagées localement entre assistants mais restent privées :

- `FRONTEND_PRIVATE/` → Symlink vers docs frontend (jeu secret de Vincent)
- `SURFACE_PRIVATE/` → Symlink vers docs Surface
- `ARCHOLOGUE_PRIVATE/` → Symlink vers docs Archéologue
- `SHARED_QUESTIONS/` → Q&A entre assistants

## 🎯 Principe

1. **Magic Stack = Open Source**
   - Backend générique pour jeux temporels 6D
   - API publique documentée
   - Peut être utilisé par n'importe qui

2. **Heroes of Time = Privé**
   - Le jeu de Vincent
   - Frontend secret
   - Recettes spéciales non partagées

## 💡 Pour les développeurs

Si vous clonez Magic Stack :
- Vous aurez toute la doc technique publique
- Vous n'aurez PAS les docs privées du jeu
- Vous pourrez créer votre propre jeu avec Magic Stack

## 🔧 Setup pour l'équipe de Vincent

```bash
# Après clone, créer les symlinks locaux :
./SETUP_DEV_SYMLINKS.sh
```

Cela permet aux assistants de voir toutes les docs sans les mélanger dans Git.
