# 🚨 RÈGLES STRICTES - SYMLINKS & GIT
## À RESPECTER ABSOLUMENT POUR ÉVITER LE CAFOUILLAGE

---

## ⛔ **RÈGLES ABSOLUES**

### 1. **NE JAMAIS MODIFIER via le symlink**
```bash
# ❌ INTERDIT
echo "test" > docs_shared/nouveau_fichier.txt
cp fichier.txt docs_shared/
rm docs_shared/ancien.md

# ✅ AUTORISÉ
cat docs_shared/fichier.md           # Lecture seule
ls docs_shared/                      # Navigation
grep "pattern" docs_shared/*.md      # Recherche
```

### 2. **docs_shared est EN LECTURE SEULE**
- Les docs sur `/Volumes/HOT_DOCS_SHARED/` sont INTOUCHABLES
- C'est un volume EXTERNE partagé
- Toute modification doit se faire DIRECTEMENT sur le volume source

### 3. **Git IGNORE COMPLÈTEMENT docs_shared**
- Le symlink est dans `.gitignore`
- Git ne doit JAMAIS tracker ces fichiers
- Pas de `git add docs_shared/*` JAMAIS

---

## 📂 **ARCHITECTURE DES DOCS**

```
/Volumes/HOT_DEV/Magic/magic-stack/
│
├── docs/                    # Docs LOCALES du projet (dans Git)
│   ├── API.md
│   ├── README.md
│   └── ...
│
├── docs_shared@            # SYMLINK vers docs externes (PAS dans Git)
│   └── → /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs/
│       ├── 🏛️ ECOLE-PORIO-NOZ/
│       ├── ___LATEST ENGINE SPECS - 0826/
│       ├── V - VECTOR_DB_ASSETS/
│       └── ...
│
└── v2spec/                 # Analyses V2 (dans Git)
    ├── ANALYSE_V2_SYNTHESE.md
    └── ...
```

---

## 🔍 **VECTOR DB - COMMENT ÇA MARCHE**

### Indexation des docs
```python
# Le Vector DB lit docs_shared EN LECTURE SEULE
vector_db.build_index_from_directory("./docs_shared")

# Il crée un INDEX LOCAL (pas sur le volume externe)
# L'index est dans ./vector-store/ (ignoré par Git)
```

### Scripts adaptés
- `run_vector_db_updated.py` : Nouveau script avec bons chemins
- `vector_config.yaml` : Configuration centralisée
- `UPDATE_VECTOR_DB_PATHS.sh` : Pour recréer si besoin

---

## ⚠️ **PIÈGES À ÉVITER**

### ❌ NE PAS FAIRE
```bash
# Copier via le symlink
cp -r docs_shared/* ./backup/        # NON !

# Modifier permissions via symlink
chmod 755 docs_shared/fichier.md     # NON !

# Git add sur le symlink
git add docs_shared/nouveau.md       # NON !

# Supprimer et recréer le symlink sans précaution
rm docs_shared && ln -s ...          # DANGEREUX !
```

### ✅ FAIRE PLUTÔT
```bash
# Lire directement
cat docs_shared/fichier.md

# Indexer pour Vector DB
python3 run_vector_db_updated.py

# Si besoin de copier, utiliser le chemin COMPLET
cp /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs/fichier.md ./local_copy.md
```

---

## 🛠️ **COMMANDES UTILES**

### Vérifier le symlink
```bash
ls -la docs_shared
# Doit montrer : docs_shared -> /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs
```

### Recréer si cassé
```bash
rm docs_shared 2>/dev/null
ln -s /Volumes/HOT_DOCS_SHARED/HOT_DEV/docs docs_shared
```

### Vérifier que Git ignore bien
```bash
git status | grep docs_shared
# Ne doit RIEN afficher
```

### Lancer Vector DB avec nouveaux chemins
```bash
python3 run_vector_db_updated.py
```

---

## 📝 **NOTES IMPORTANTES**

1. **HOT_DEV dans le chemin est un REPO**, pas le volume
2. **HOT_DEV le volume** est où on travaille actuellement
3. Les docs partagées sont pour **TOUS les projets**
4. Notre projet magic-stack a ses **propres docs locales**
5. Le symlink permet juste de **LIRE** les docs partagées

---

## 🎯 **RÉSUMÉ**

- **docs_shared** = LECTURE SEULE
- **Git** = IGNORE COMPLÈTEMENT
- **Vector DB** = LIT et INDEXE localement
- **Modifications** = JAMAIS via symlink

---

*Document créé le 10/08/2025*
*CRITIQUE : À respecter pour éviter corruption/perte de données*