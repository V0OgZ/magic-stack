# 🔗 RÈGLES DÉFINITIVES POUR LES SYMLINKS

## ❌ CE QU'IL NE FAUT JAMAIS FAIRE
```bash
# JAMAIS ÇA :
git add docs_shared/     # Git va COPIER tout le contenu !
git add docs_shared/*    # Pareil, copie tout !
```

## ✅ CE QU'IL FAUT FAIRE

### 1. CRÉER LE SYMLINK
```bash
ln -s /Volumes/HOTS_GAME/HOT_DEV/docs docs_shared
```

### 2. AJOUTER AU .gitignore IMMÉDIATEMENT
```bash
echo "docs_shared" >> .gitignore
```

### 3. NE JAMAIS TRACKER LE SYMLINK
- Git ne doit JAMAIS voir le symlink
- Le symlink reste LOCAL sur chaque machine
- Chaque développeur recrée son propre symlink

## 📌 RÉSUMÉ EN 3 POINTS

1. **SYMLINKS = LOCAL ONLY** (jamais dans Git)
2. **TOUJOURS dans .gitignore**
3. **Chaque dev refait son symlink localement**

## 🚨 SI ACCIDENT (comme aujourd'hui)

```bash
# 1. Reset tout
git reset --soft origin/main

# 2. Virer les merdes
git reset HEAD docs_shared/
git reset HEAD .venv_vec/

# 3. Ajouter au .gitignore
echo "docs_shared" >> .gitignore
echo ".venv_vec/" >> .gitignore

# 4. Recommiter proprement
git add .gitignore
git add [vos vrais fichiers]
git commit -m "votre message"
```

## 💡 POURQUOI C'EST COMME ÇA

- Git ne peut pas stocker de vrais symlinks vers l'extérieur du repo
- Soit il copie tout (désastre)
- Soit on l'ignore (solution)

**LA SEULE SOLUTION : Ne JAMAIS mettre les symlinks dans Git !**
