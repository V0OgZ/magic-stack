# 🏗️ ARCHITECTURE FINALE - AVALON vs MAGIC STACK

**PAR:** GRUT & Assistant  
**DATE:** 5 août 2025  
**OBJECTIF:** Clarifier définitivement qui fait quoi

---

## 🎯 SÉPARATION CLAIRE

### **MAGIC STACK (Open Source)**
```
magic-stack/                    # UNIQUEMENT LE MOTEUR MAGIQUE
├── core/                       # Moteur de formules magiques
│   ├── grammar/               # Grammaire HOTS
│   ├── engine/                # Exécution des sorts
│   └── physics/               # Physique quantique
├── docs/                      # Documentation technique
└── LICENSE                    # Licence Honor (1%)

❌ PAS DE BASE DE DONNÉES
❌ PAS DE POSTGRESQL
❌ PAS D'UPLOAD/INTERSTICE
✅ JUSTE LE MOTEUR DE MAGIE
```

### **SPINFOREST/AVALON (Privé - TON JEU)**
```
SpinForest/                     # TON JEU COMPLET
├── REALGAME/                  # Frontend + Gameplay
│   ├── play.html             # Le jeu principal
│   ├── postgræcia/           # 📊 POSTGRESQL ICI !
│   └── api/                  # Endpoints du jeu
├── avalon-backend/            # Backend Java Spring
│   ├── data/                 # H2 persistant (pour dev)
│   └── src/                  # Services du jeu
└── AVALON/                    # Contenu narratif
    └── 🏠 HOME/              # Les mages

✅ POSTGRESQL dans postgræcia/
✅ UPLOAD/INTERSTICE ici
✅ TOUTE LA PERSISTANCE ici
```

---

## 🔄 FLUX DE DONNÉES

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (play.html)               │
│                    Port: fichier                     │
└────────────────────┬────────────────────────────────┘
                     │ API calls
                     ▼
┌─────────────────────────────────────────────────────┐
│              AVALON BACKEND (Java)                   │
│                   Port: 8080                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ Services:                                    │   │
│  │ - IntersticeUploadController                │   │
│  │ - CsvImportController (nouveau!)            │   │
│  │ - PanopticonController                      │   │
│  │ - HexMapController                          │   │
│  └─────────────────────────────────────────────┘   │
└────────────┬──────────────────────┬─────────────────┘
             │                      │
             ▼                      ▼
    ┌────────────────┐     ┌──────────────────┐
    │  H2 Database   │     │   Magic Stack    │
    │  (Dev/Local)   │     │  (Moteur magie)  │
    │  Port: Console │     │   Port: 8081     │
    └────────────────┘     └──────────────────┘
             │
             │ (Production)
             ▼
    ┌────────────────┐
    │  PostgreSQL    │
    │  Port: 5432    │
    │  (Docker)      │
    └────────────────┘
```

---

## 📊 BASES DE DONNÉES

### **DÉVELOPPEMENT (Actuel)**
- **H2 Persistant** : `avalon-backend/data/avalon_persistent.mv.db`
- Mode fichier, pas mémoire
- Données survivent aux redémarrages

### **PRODUCTION (Futur)**
- **PostgreSQL** : Dans `REALGAME/postgræcia/`
- Via Docker Compose
- Tables : heroes, roster, interstice_entities

---

## 🔮 PANOPTICON - MISE À JOUR

### **OUI, IL FAUT UPDATER !**

Le Panopticon doit connaître :
1. **Nouvelle table `roster`** pour le CSV
2. **Service `CsvImportService`** 
3. **Endpoints d'import/export**

### **Fichiers à modifier :**
```java
// PanopticonService.java
- Ajouter getRosterStatus()
- Ajouter getHeroes6DPositions()

// PanopticonController.java
- Endpoint GET /api/panopticon/roster
- Endpoint GET /api/panopticon/dimensions
```

---

## 🎮 RÉSUMÉ SIMPLE

1. **Magic Stack** = Juste le moteur de magie (open source)
2. **PostgreSQL** = Dans AVALON/postgræcia (pas Magic Stack)
3. **Persistance** = H2 fichier maintenant, PostgreSQL plus tard
4. **Panopticon** = Doit être mis à jour pour voir le roster

---

## 📝 NOTE POUR LES AUTRES

### **LE PIÈGE DU DQUOTE**
```bash
# ❌ NE JAMAIS FAIRE
echo "Message avec "guillemets" dedans"  # BLOQUE LE TERMINAL !

# ✅ FAIRE PLUTÔT
echo "Message avec 'guillemets simples' dedans"
echo 'Message sans problème'
printf "Message safe\n"
```

**Si le terminal affiche `dquote>` :**
1. Taper `"` puis Enter pour fermer
2. Ou faire Ctrl+C pour annuler

---

## ✅ ACTIONS REQUISES

1. **Finir les imports JPA** dans avalon-backend
2. **Créer endpoints Panopticon** pour le roster
3. **Tester import CSV** avec le nouveau service
4. **Documenter** pour l'équipe

**Tout est clair maintenant ?**