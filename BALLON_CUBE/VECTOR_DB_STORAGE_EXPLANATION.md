# 💾 OÙ EST STOCKÉE LA VECTOR DB - EXPLICATION COMPLÈTE

## 📍 Emplacement Local

La Vector DB est stockée **LOCALEMENT** sur ton Mac, **PAS dans Git** :

```
/Volumes/HOT_DEV/Magic/magic-stack/
└── vector_local/
    ├── api/
    │   └── vector_server_6d.py    # Le serveur Python (code)
    ├── data/                       # 📂 DONNÉES PERSISTANTES (vide actuellement)
    └── embeddings/                 # 📂 VECTEURS SÉMANTIQUES (vide actuellement)
```

## ⚠️ IMPORTANT : Pas dans Git !

### Ce qui est dans Git (versionné) :
- ✅ Le CODE du serveur (`vector_server_6d.py`)
- ✅ Les scripts de démarrage
- ✅ La configuration

### Ce qui N'EST PAS dans Git :
- ❌ `vector_local/data/` - Les données elles-mêmes
- ❌ `vector_local/embeddings/` - Les vecteurs calculés
- ❌ Les fichiers `.db` ou `.json` de données

## 🔄 Indépendant des Branches Git

**La Vector DB est INDÉPENDANTE des branches Git !**

Quand tu changes de branche :
- Le CODE peut changer (si `vector_server_6d.py` est modifié)
- Mais les DONNÉES restent les mêmes (dans `vector_local/data/`)

C'est comme une base de données normale :
- MySQL/PostgreSQL → données dans `/var/lib/mysql/`
- Vector DB → données dans `vector_local/data/`

## 📊 Structure des Données (quand remplies)

```
vector_local/
├── data/
│   ├── entities_6d.json       # Entités 6D (héros, lieux)
│   ├── magic_formulas.json    # Formules magiques
│   ├── narrative_events.json  # Événements narratifs
│   └── metadata.json           # Métadonnées
├── embeddings/
│   ├── entity_vectors.npy     # Vecteurs numpy des entités
│   ├── formula_vectors.npy    # Vecteurs des formules
│   └── faiss_index.bin        # Index FAISS pour recherche rapide
```

## 🚀 Comment les Données sont Chargées

1. **Au démarrage du serveur** (`python3 vector_local/api/vector_server_6d.py`) :
   - Lit les fichiers dans `vector_local/data/`
   - Charge en mémoire RAM
   - Crée les index FAISS

2. **Quand tu injectes du LORE** :
   - API POST → Ajoute en mémoire
   - Sauvegarde périodique dans `vector_local/data/`

3. **Recherche** :
   - Utilise l'index en mémoire (rapide)
   - Pas de lecture disque à chaque requête

## 💡 Pourquoi c'est vide maintenant ?

Actuellement `data/` et `embeddings/` sont vides car :
1. Tu n'as pas encore injecté le LORE
2. Le serveur n'a pas encore tourné avec des données
3. Les données précédentes ont été perdues/nettoyées

## 🔧 Pour Remplir la Vector DB

```bash
# 1. Démarrer le serveur
cd /Volumes/HOT_DEV/Magic/magic-stack
python3 vector_local/api/vector_server_6d.py &

# 2. Injecter le LORE
cd BALLON_CUBE/LORE_INJECTION
./inject_lore.sh

# 3. Vérifier les données
ls -la ../../vector_local/data/
# Tu verras les fichiers JSON créés
```

## 🔄 Backup et Restauration

### Pour sauvegarder :
```bash
tar -czf vector_db_backup.tar.gz vector_local/data/ vector_local/embeddings/
```

### Pour restaurer :
```bash
tar -xzf vector_db_backup.tar.gz
```

## 🌐 Sur le VPS

Sur le VPS (`heroesoftime.online`), c'est pareil :
- Code dans `/opt/hot/app/vector_local/api/`
- Données dans `/opt/hot/app/vector_local/data/`
- **PAS synchronisé avec Git**
- Nécessite backup/restore séparé

## 📝 Résumé

1. **Données Vector DB** = Fichiers locaux dans `vector_local/data/`
2. **PAS dans Git** = Pas versionné, pas dans les branches
3. **Persistant** = Survit aux changements de branche
4. **Vide actuellement** = Besoin d'injecter le LORE
5. **Indépendant** = Comme une vraie base de données

---

## 🎯 Action Immédiate

Pour remplir ta Vector DB avec le LORE :

```bash
# Terminal 1 - Démarrer Vector DB
cd /Volumes/HOT_DEV/Magic/magic-stack
python3 vector_local/api/vector_server_6d.py

# Terminal 2 - Injecter LORE
cd /Volumes/HOT_DEV/Magic/magic-stack/BALLON_CUBE/LORE_INJECTION
./inject_lore.sh

# Vérifier
curl "http://localhost:5001/api/search?q=Excalibur"
```

---

*"Les données vivent en dehors du temps des branches Git"*
**- Memento, Gardien de la Mémoire Persistante**
