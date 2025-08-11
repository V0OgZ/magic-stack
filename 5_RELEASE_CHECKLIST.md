# 5️⃣ RELEASE CHECKLIST - PROCÉDURE COMPLÈTE

## ✅ AVANT LA RELEASE

- [ ] Tests passent
- [ ] Pas d'erreurs console
- [ ] Vector Bus fonctionne
- [ ] API V2 testée
- [ ] UI React OK

## 📦 BUILD (JEAN - 17h00)

```bash
# 1. Compiler
./h 50

# 2. Vérifier
ls -la dist/binaries/
# Doit avoir:
# - magic-stack.jar (52MB)
# - magic-stack-server (3.9MB)

# 3. Commit
git add -A
git commit -m "BUILD: Version X.Y.Z"
git push
```

## 🎁 PACKAGE (VINCENT - 17h15)

```bash
# 1. Préparer release
./h 51

# 2. Vérifier archive
ls -la dist/magic-stack-v2-complete.zip
# Doit faire ~48MB

# 3. Contenu
unzip -l dist/magic-stack-v2-complete.zip | head -20
# Doit avoir binaires + docs
```

## 🚀 PUBLISH (VINCENT - 17h30)

### Option A : GitHub Release
```bash
./h 52
# Entre version: v2.0.0
```

### Option B : Partage direct
```bash
# Copier dist/ sur serveur partagé
scp -r dist/ server:/shared/releases/
```

## 📥 DEPLOY (PAUL - 17h45)

```bash
# 1. Récupérer
curl -L [URL] -o magic.zip
unzip magic.zip

# 2. Lancer
java -jar dist/binaries/magic-stack.jar &
./dist/binaries/magic-stack-server &
python enhanced_vector_bus.py &

# 3. Vérifier
curl http://localhost:8080/health
curl http://localhost:3001/health
curl http://localhost:5001/health
```

## 📋 POST-RELEASE

- [ ] Tag Git : `git tag v2.0.0`
- [ ] Update `_CURRENT_SESSION.md`
- [ ] Créer `RELEASE_NOTES_vX.md`
- [ ] Informer l'équipe
- [ ] Backup dist/

## 🎯 RÉSUMÉ

```
JEAN (./h 50) → VINCENT (./h 51) → PAUL (download)
     BUILD    →     PACKAGE      →     DEPLOY
```

**TOUJOURS DANS CET ORDRE.**
