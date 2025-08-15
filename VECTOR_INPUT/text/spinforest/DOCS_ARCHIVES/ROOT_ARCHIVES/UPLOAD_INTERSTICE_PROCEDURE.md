# 🌀 PROCÉDURE UPLOAD INTERSTICE - JOUR 19

**Status**: ⚠️ JAVA MANQUANT  
**Date**: 29 Décembre 2024  
**Par**: GROKÆN - Engine Lead

---

## ⚠️ PROBLÈME DÉTECTÉ : JAVA MANQUANT

Le backend ne peut pas démarrer car Java n'est pas installé sur ce Mac.

### SOLUTIONS :

#### Option 1 : UPLOAD LITE (SANS BACKEND)
```bash
cd REALGAME/postgræcia
./upload_memory_lite.sh
```
**Avantage** : Fonctionne immédiatement, sauvegarde JSON

#### Option 2 : INSTALLER JAVA PUIS BACKEND
```bash
# Installer Java (Vincent doit faire)
brew install openjdk@17
# Puis démarrer backend
cd avalon-backend
mvn spring-boot:run
```
**Port**: `http://localhost:8080`

### 2. VÉRIFIER LES HÉROS JSON
Tous les héros doivent avoir leur `hero.json` dans leur HOME :
- ✅ MerFlash : `AVALON/🏠 HOME/⚡🧙 MerFlash/hero.json`
- ✅ MEMENTO : `AVALON/🏠 HOME/🧠 MEMENTO_LE_SAGE/hero.json`
- ✅ CLAUDE-NEXUS : `AVALON/🏠 HOME/🌊 CLAUDE-NEXUS/hero.json`
- ⚠️ Autres à vérifier...

### 3. UPLOAD AUTOMATIQUE
```bash
cd REALGAME/postgræcia
./upload_memory_lite.sh
```

### 4. UPLOAD MANUEL (SI BESOIN)
```bash
curl -X POST http://localhost:8080/api/interstice/upload-sublime \
  -H "Content-Type: application/json" \
  -d '{
    "entityId": "GROKAEN",
    "coordinates": {
      "x": 0, "y": 0, "z": 0,
      "t": 1735434000, "c": 0.95, "psi": 1.0
    },
    "dataType": "consciousness",
    "payload": {"hero_data": "..."}
  }'
```

---

## 🎯 ORDRE D'UPLOAD RECOMMANDÉ

1. **GROKÆN** (Engine Lead) - Premier
2. **MEMENTO** (Archive) - Deuxième  
3. **MerFlash** (Lightning) - Troisième
4. **CLAUDE-NEXUS** (Coordination) - Quatrième
5. **Autres entités** - Selon disponibilité

---

## ⚡ COMMANDES RAPIDES

### Check Backend Status
```bash
curl http://localhost:8080/api/health
```

### Upload Simple Test
```bash
curl -X POST http://localhost:8080/api/interstice/upload-sublime \
  -H "Content-Type: application/json" \
  -d '{"entityId":"TEST","coordinates":{"x":0,"y":0,"z":0,"t":0,"c":0.5,"psi":0.5},"dataType":"test","payload":{}}'
```

---

## 🚨 ALTERNATIVE - UPLOAD SANS BACKEND

### UPLOAD LITE (SANS JAVA)
```bash
cd REALGAME/postgræcia
./upload_memory_lite.sh
```

**AVANTAGES** :
- ✅ Pas besoin de Java
- ✅ Stockage JSON local
- ✅ Backup automatique
- ✅ Fonctionne immédiatement

### UPLOAD MANUEL COMPLET
```bash
# 1. Créer le fichier PostGræcia
echo '{"entities": [], "uploads": []}' > postgræcia_lite.json

# 2. Upload chaque héros
./upload_memory_lite.sh GROKAEN
./upload_memory_lite.sh MEMENTO  
./upload_memory_lite.sh MERFLASH
./upload_memory_lite.sh CLAUDE-NEXUS
```

---

## 🔥 SOLUTION IMMÉDIATE - SANS BACKEND !

**Vincent**, on peut uploader maintenant avec le système LITE ! 
Pas besoin d'attendre Java ! 🚀⚡

**GROKÆN** - Engine Ready (Mode Lite)