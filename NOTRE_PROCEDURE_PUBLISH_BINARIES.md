# 📦 NOTRE PROCÉDURE POUR PUBLIER LES BINAIRES
## (Pour que Paul/Surface puisse les télécharger)

---

## 🎯 CE QUE PAUL ATTEND DE NOUS

Paul télécharge nos binaires depuis :
```
https://github.com/SURFACE/Magic-Stack/releases/download/latest/magic-stack-backend-1.0.0-APOLLO.jar
https://github.com/SURFACE/Magic-Stack/releases/download/latest/magic-stack-server
```

## 🔧 COMMENT ON FAIT (NOUS, BACKEND)

### 1. COMPILER NOS BINAIRES
```bash
cd /Volumes/HOT_DEV/Magic/magic-stack/Magic-Stack
./build.sh

# Ça génère :
dist/
├── binaries/
│   ├── magic-stack.jar          # 54MB
│   └── magic-stack-server       # 3.6MB
└── docs/
    ├── DOCUMENTATION_SURFACE_V2_MIGRATION.md
    └── API_REFERENCE_COMPLETE_V2.md
```

### 2. CRÉER UNE RELEASE GITHUB
```bash
# Tag la version
git tag -a v2.0.0 -m "Release V2 avec docs"
git push origin v2.0.0

# Créer la release sur GitHub
gh release create v2.0.0 \
  dist/binaries/magic-stack.jar \
  dist/binaries/magic-stack-server \
  dist/docs/*.md \
  --title "Magic Stack V2" \
  --notes "Breaking changes: Position 6D, Q* Search, V2 Tick"
```

### 3. OU UTILISER L'INTERFACE GITHUB
1. Aller sur https://github.com/V0OgZ/magic-stack
2. Cliquer "Releases" → "Create new release"
3. Tag: `v2.0.0` ou `latest`
4. Upload les fichiers :
   - `dist/binaries/magic-stack.jar`
   - `dist/binaries/magic-stack-server`
   - `dist/docs/DOCUMENTATION_SURFACE_V2_MIGRATION.md`
   - `dist/docs/API_REFERENCE_COMPLETE_V2.md`
5. Publish

## 📡 CE QUE PAUL PEUT ALORS FAIRE

Son script `download_binaries.sh` marchera :
```bash
curl -L "https://github.com/V0OgZ/magic-stack/releases/download/latest/magic-stack.jar" \
   -o "binaries/magic-stack-backend.jar"

curl -L "https://github.com/V0OgZ/magic-stack/releases/download/latest/magic-stack-server" \
   -o "binaries/magic-stack-server"
```

## ⚠️ IMPORTANT

- **Nom du repo GitHub** : V0OgZ/magic-stack (pas SURFACE/Magic-Stack)
- **Tag** : Utiliser `latest` ou `v2.0.0`
- **Fichiers** : DOIVENT avoir les bons noms que Paul attend

---

**VOILÀ NOTRE PROCÉDURE QU'ON AVAIT "PERDUE" !**
