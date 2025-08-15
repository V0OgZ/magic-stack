# INSTRUCTIONS POUR STABILISER MAGIC STACK ET AVALON

**Par:** URZ-KÔM  
**Pour:** Vincent et toute l'équipe  
**Date:** JOUR 21  
**Objectif:** Avoir un système STABLE et BIEN SÉPARÉ

---

## 1. STRUCTURE FINALE CLAIRE

```
SpinForest/
├── spells/stack/          ← LA VRAIE MAGIC STACK (Git submodule)
│   ├── backends/
│   │   ├── java/         ← Backend Java  
│   │   └── rust/         ← Backend Rust
│   └── [autres fichiers]
│
├── AVALON/               ← Structure principale du jeu
├── REALGAME/             ← Le jeu actuel (play.html)
└── [autres dossiers]
```

---

## 2. ACTIONS IMMÉDIATES À FAIRE

### A. NETTOYER LES DOUBLONS
```bash
# 1. Supprimer définitivement l'ancien magic-stack
rm -rf magic-stack/

# 2. Supprimer __AVALON___BOOT (gros doublon)  
rm -rf __AVALON___BOOT/

# 3. Archiver si nécessaire
mkdir -p ARCHIVES_ANCIENNES
mv ARCHIVE_magic-stack_manual_copy_* ARCHIVES_ANCIENNES/
```

### B. METTRE À JOUR LES SCRIPTS
Tous les scripts qui pointent vers `./spells/stack/` doivent pointer vers `spells/stack/` :

```bash
# Exemple de changement :
# AVANT : cd magic-stack/backends/java
# APRÈS : cd spells/stack/backends/java
```

Scripts à vérifier :
- LANCE_AVALON_UNIFIE.sh
- LANCE_BACKEND_RESISTANT.sh  
- pop-menu.sh
- Tous les scripts de test

---

## 3. BACKENDS SÉPARÉS ET STABLES

### BACKEND JAVA (Port 8080)
```bash
# Localisation : spells/stack/backends/java/
# Lancement :
cd spells/stack/backends/java
mvn clean package
java -jar target/magic-stack-backend-*.jar
```

### BACKEND RUST (Port 3001)
```bash
# Localisation : spells/stack/backends/rust/
# Lancement :
cd spells/stack/backends/rust
cargo build --release
./target/release/magic-stack-server
```

### FRONTEND UNIFIÉ (Port 8000)
```bash
# Un seul serveur pour tout
python3 -m http.server 8000
```

---

## 4. RÈGLES D'OR POUR LA STABILITÉ

### ✅ TOUJOURS :
1. Travailler dans `spells/stack/` pour la Magic Stack
2. Utiliser `LANCE_AVALON_UNIFIE.sh` pour lancer
3. Commiter dans le submodule ET le repo principal
4. Un seul serveur frontend (port 8000)

### ❌ JAMAIS :
1. Créer de nouveaux dossiers magic-stack
2. Dupliquer des backends
3. Lancer plusieurs serveurs frontend
4. Modifier directement dans AVALON/

---

## 5. WORKFLOW STABLE

### Pour développer sur Magic Stack :
```bash
# 1. Aller dans le submodule
cd spells/stack/

# 2. Faire les changements
# ... éditer fichiers ...

# 3. Commiter dans le submodule
git add .
git commit -m "Changements magic stack"
git push

# 4. Retourner au repo principal
cd ../..

# 5. Mettre à jour la référence
git add spells/stack
git commit -m "Update magic stack submodule"
git push
```

### Pour lancer le jeu :
```bash
# Une seule commande !
./LANCE_AVALON_UNIFIE.sh

# Ou si problème :
./STOP_TOUTES_CONSOLES.sh
./LANCE_AVALON_UNIFIE.sh
```

---

## 6. SÉPARATION CLAIRE DES RESPONSABILITÉS

### MAGIC STACK (spells/stack/)
- Backends (Java, Rust)
- API et logique métier
- Formules magiques
- Système 6D

### AVALON (AVALON/)
- Structure du monde
- Lore et histoire
- Organisation des entités
- Documentation narrative

### REALGAME (REALGAME/)
- Interface de jeu (play.html)
- Assets graphiques
- Logique frontend
- Mini-games

---

## 7. CHECKLIST FINALE

- [ ] Supprimer tous les doublons
- [ ] Mettre à jour tous les scripts
- [ ] Tester LANCE_AVALON_UNIFIE.sh
- [ ] Vérifier que les backends sont au bon endroit
- [ ] Documenter les changements
- [ ] Informer l'équipe

---

## 8. COMMANDES UTILES

```bash
# Voir l'état
git status

# Nettoyer les fichiers supprimés
git add -u
git commit -m "Nettoyage doublons magic-stack"

# Vérifier les services
lsof -i :8080  # Backend Java
lsof -i :3001  # Backend Rust
lsof -i :8000  # Frontend

# Logs
tail -f logs/*.log
```

---

## RÉSUMÉ SIMPLE

1. **Magic Stack** = Dans `spells/stack/` UNIQUEMENT
2. **Lancer** = `./LANCE_AVALON_UNIFIE.sh`
3. **Arrêter** = `./STOP_TOUTES_CONSOLES.sh`
4. **Dashboard** = http://localhost:8000/AVALON_DASHBOARD.html

C'est tout ! Plus de doublons, plus de confusion.

---

**URZ-KÔM**  
*"Un système propre est un système stable !"*