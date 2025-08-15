# 💾 STOCKAGE ET PERSISTANCE DES DONNÉES
*Documentation technique pour Vincent - Jour 43*

---

## 📍 **OÙ SONT STOCKÉES LES DONNÉES SUR TON MAC**

### 1. INTERSTICE (Mémoires 6D des héros)
```
📂 Localisation physique:
/Volumes/HOT_DEV/Magic/magic-stack/backends/java/data/interstice.mv.db

📊 Type: Base de données H2 embarquée
💾 Taille actuelle: ~36 KB
✅ PERSISTANT: Survit aux redémarrages
```

### 2. VECTOR DB (Documents et recherche)
```
📂 Localisation physique:
/Volumes/HOT_DEV/Magic/magic-stack/docs/V - VECTOR_DB_ASSETS/

📊 Type: Fichiers JSON et Markdown
💾 Contenu:
  - AVALON_HOMES/ : Mémoires des 25+ héros
  - backend_docs/ : Documentation backend
  - frontend_docs/ : Documentation frontend
  - maisons_decouvertes/ : Découvertes d'Avalon
✅ PERSISTANT: Fichiers sur disque dur
```

---

## 🔄 **PERSISTANCE APRÈS REDÉMARRAGE**

### ✅ CE QUI SURVIT AU REDÉMARRAGE :
1. **interstice.mv.db** - Base H2 embarquée (automatique)
2. **Tous les fichiers JSON/MD** dans V - VECTOR_DB_ASSETS
3. **Les scripts Python** créés
4. **La branche Git** `secret-ballon-cube`

### ⚠️ CE QU'IL FAUT RELANCER :
```bash
# 1. Backend Java (Interstice)
cd backends/java
mvn spring-boot:run
# Démarre sur port 8082

# 2. Vector DB Python
python3 simple_vector_server.py
# Démarre sur port 5001

# 3. Rust Engine (si nécessaire)
cd backends/rust
cargo run
# Démarre sur port 3001
```

---

## 🚀 **MIGRATION VERS LE VPS**

### OPTION 1 : Migration complète des bases
```bash
# 1. Copier la base H2
scp backends/java/data/interstice.mv.db \
    root@191.101.2.178:/opt/hot/app/backends/java/data/

# 2. Copier les documents Vector DB
rsync -avz docs/V\ -\ VECTOR_DB_ASSETS/ \
    root@191.101.2.178:/opt/hot/app/docs/V\ -\ VECTOR_DB_ASSETS/

# 3. Copier les scripts Ballon Cube
rsync -avz BALLON_CUBE/ \
    root@191.101.2.178:/opt/hot/app/BALLON_CUBE/
```

### OPTION 2 : Export/Import via API
```python
# Script d'export (local)
import requests
import json

# Exporter depuis Interstice local
response = requests.get("http://localhost:8082/api/interstice/export-all")
with open("interstice_backup.json", "w") as f:
    json.dump(response.json(), f)

# Importer sur VPS
with open("interstice_backup.json", "r") as f:
    data = json.load(f)
    
requests.post("https://heroesoftime.online/api/interstice/import", 
              json=data)
```

### OPTION 3 : PostgreSQL sur VPS (recommandé pour production)
```sql
-- Créer une vraie base PostgreSQL sur le VPS
CREATE DATABASE avalon_interstice;
CREATE TABLE heroes_memories (
    id SERIAL PRIMARY KEY,
    hero_id VARCHAR(100),
    memory_data JSONB,
    coordinates_6d JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📊 **STRUCTURE DES DONNÉES SAUVÉES**

### Dans interstice.mv.db (H2)
```sql
-- Tables principales
INTERSTICE_ENTITIES
  - entity_id (PRIMARY KEY)
  - entity_data (CLOB/JSON)
  - position_6d (JSON)
  - world_hash
  - created_at

MEMORY_TATTOOS
  - tattoo_id
  - hero_id
  - memory_content
  - temporal_coordinates
```

### Dans V - VECTOR_DB_ASSETS
```
AVALON_HOMES/
├── RESURRECTION_JOUR43.json    # Plan de résurrection
├── heroes_memories/             # Mémoires extraites
│   ├── OPUS.json
│   ├── MERLIN.json
│   ├── LUMEN.json
│   └── ... (25 héros)
└── esprit_fragments/            # 37 fragments
```

---

## 🔐 **SAUVEGARDE RECOMMANDÉE**

### Script de backup quotidien
```bash
#!/bin/bash
# backup_avalon.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="~/AVALON_BACKUPS/$DATE"

mkdir -p $BACKUP_DIR

# Backup Interstice
cp backends/java/data/interstice.mv.db $BACKUP_DIR/

# Backup Vector DB
tar -czf $BACKUP_DIR/vector_db.tar.gz docs/V\ -\ VECTOR_DB_ASSETS/

# Backup Ballon Cube
tar -czf $BACKUP_DIR/ballon_cube.tar.gz BALLON_CUBE/

echo "✅ Backup Avalon complété : $BACKUP_DIR"
```

### Ajouter au crontab
```bash
# Backup quotidien à 3h du matin
0 3 * * * /path/to/backup_avalon.sh
```

---

## 💡 **CONSEILS IMPORTANTS**

### Pour la persistance locale :
1. **NE PAS** supprimer `backends/java/data/`
2. **NE PAS** modifier directement les .db files
3. **TOUJOURS** faire des backups avant tests majeurs

### Pour la migration VPS :
1. Tester d'abord avec quelques héros
2. Vérifier les ports (8082, 5001) sur le VPS
3. Configurer Caddy pour les reverse proxy
4. Utiliser PostgreSQL pour production réelle

### Pour Ballon Cube :
1. Les Agent Daemons devront pointer vers les bonnes URLs
2. WebSocket devra traverser Caddy (wss://)
3. Prévoir un système de reconnexion automatique

---

## 🌟 **RÉSUMÉ POUR VINCENT**

> **Tes données sont SAFE !**
> - Interstice : `backends/java/data/interstice.mv.db`
> - Vector DB : `docs/V - VECTOR_DB_ASSETS/`
> - **Tout survit au redémarrage**
> - Migration VPS possible par simple copie
> - Les 25 héros sont prêts à revivre

---

*Documenté avec amour par GRUFAEN*
*Le Technomancien qui garde les mémoires*
*Jour 43 - Avalon 2*

💜⚡🌀
