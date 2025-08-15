# 🌙 PLAN MIGRATION NOCTURNE - H2 → POSTGRESQL

**PAR:** GRUT & Assistant  
**DATE:** Nuit du 30 janvier 2025  
**MISSION:** Migration totale vers PostgreSQL + Service Import CSV

---

## 🎯 OBJECTIF

1. **Lancer PostgreSQL** via Docker
2. **Migrer toutes les données** de H2 vers PostgreSQL
3. **Créer service d'import CSV** comme cdimport
4. **Tout automatiser** pour le futur

---

## 📋 ÉTAPES DE MIGRATION

### **ÉTAPE 1: LANCER POSTGRESQL**
```bash
cd REALGAME/postgræcia
docker-compose up -d
```

### **ÉTAPE 2: VÉRIFIER LA CONNEXION**
```bash
docker exec -it postgræcia-db psql -U memento -d avalon_postgræcia -c "SELECT version();"
```

### **ÉTAPE 3: EXPORTER DONNÉES H2**
```bash
# Script pour dumper H2 vers JSON
java -cp h2*.jar org.h2.tools.Script -url jdbc:h2:mem:avalon -user sa -script backup.sql
```

### **ÉTAPE 4: IMPORTER DANS POSTGRESQL**
```bash
# Utiliser le script de migration
./migrate_h2_to_postgres.sh
```

### **ÉTAPE 5: SERVICE IMPORT CSV**
```java
// Service comme cdimport pour importer des CSV
@RestController
@RequestMapping("/api/import")
public class CsvImportController {
    
    @PostMapping("/roster")
    public ResponseEntity<?> importRoster(@RequestParam("file") MultipartFile file) {
        // Parse CSV
        // Validate data
        // Insert into PostgreSQL
        return ResponseEntity.ok("Import successful");
    }
}
```

---

## 🔧 CONFIGURATION POSTGRESQL

### **application.properties (nouveau)**
```properties
# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/avalon_postgræcia
spring.datasource.username=memento
spring.datasource.password=temporal_memory_2025
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true

# Keep H2 console for debug
spring.h2.console.enabled=false
```

---

## 📊 TABLES À CRÉER

### **1. TABLE ROSTER**
```sql
CREATE TABLE roster (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    classe VARCHAR(255),
    adresse TEXT,
    niveau INTEGER,
    statut_interstice VARCHAR(50),
    taches_principales TEXT,
    json_hero_path TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);
```

### **2. TABLE HEROES_6D**
```sql
CREATE TABLE heroes_6d (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    position_x FLOAT,
    position_y FLOAT,
    position_z FLOAT,
    position_t TIMESTAMP,
    position_c FLOAT,
    position_psi FLOAT,
    hero_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 SERVICE IMPORT CSV

### **CsvImportService.java**
```java
@Service
public class CsvImportService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public void importRosterCsv(MultipartFile file) {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] headers = reader.readNext();
            String[] line;
            
            while ((line = reader.readNext()) != null) {
                String sql = "INSERT INTO roster (nom, classe, adresse, niveau, statut_interstice, taches_principales, json_hero_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
                
                jdbcTemplate.update(sql, 
                    line[0], // nom
                    line[1], // classe
                    line[2], // adresse
                    Integer.parseInt(line[3]), // niveau
                    line[4], // statut
                    line[5], // taches
                    line[6]  // json_hero
                );
            }
        } catch (Exception e) {
            throw new RuntimeException("Import failed", e);
        }
    }
    
    public void exportRosterCsv(OutputStream out) {
        String sql = "SELECT * FROM roster ORDER BY id";
        List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);
        
        try (CSVWriter writer = new CSVWriter(new OutputStreamWriter(out))) {
            // Headers
            writer.writeNext(new String[]{"Nom", "Classe", "Adresse", "Niveau", "Statut", "Tâches", "JSON Hero"});
            
            // Data
            for (Map<String, Object> row : rows) {
                writer.writeNext(new String[]{
                    (String) row.get("nom"),
                    (String) row.get("classe"),
                    (String) row.get("adresse"),
                    String.valueOf(row.get("niveau")),
                    (String) row.get("statut_interstice"),
                    (String) row.get("taches_principales"),
                    (String) row.get("json_hero_path")
                });
            }
        } catch (Exception e) {
            throw new RuntimeException("Export failed", e);
        }
    }
}
```

---

## 🎮 ENDPOINTS API

### **Import/Export CSV**
```
POST /api/import/roster - Upload CSV file
GET /api/export/roster - Download CSV file
GET /api/roster - Get all roster data as JSON
POST /api/roster/sync - Sync with interstice
```

### **Gestion 6D**
```
POST /api/heroes/upload - Upload hero to 6D space
GET /api/heroes/{name}/position - Get current 6D position
PUT /api/heroes/{name}/move - Update position
GET /api/dimension/{dim}/heroes - List heroes in dimension
```

---

## 🔄 SCRIPT MIGRATION AUTOMATIQUE

### **migrate_all_to_postgres.sh**
```bash
#!/bin/bash

echo "🌙 Migration nocturne H2 → PostgreSQL"

# 1. Start PostgreSQL
echo "📦 Démarrage PostgreSQL..."
cd REALGAME/postgræcia
docker-compose up -d

# 2. Wait for DB
echo "⏳ Attente démarrage DB..."
sleep 10

# 3. Create schema
echo "🏗️ Création des tables..."
docker exec -i postgræcia-db psql -U memento -d avalon_postgræcia < schema.sql

# 4. Import JSON data
echo "📥 Import des données JSON..."
python3 import_json_to_postgres.py

# 5. Import CSV roster
echo "📊 Import du roster CSV..."
curl -X POST http://localhost:8080/api/import/roster \
  -F "file=@../../AVALON/🏠 HOME/ROSTER_COMPLET_H_ROS_AVALON.csv"

# 6. Verify
echo "✅ Vérification..."
docker exec postgræcia-db psql -U memento -d avalon_postgræcia -c "SELECT COUNT(*) FROM roster;"
docker exec postgræcia-db psql -U memento -d avalon_postgræcia -c "SELECT COUNT(*) FROM heroes_6d;"

echo "🎉 Migration terminée!"
```

---

## ✅ CHECKLIST FINALE

- [ ] PostgreSQL lancé via Docker
- [ ] Tables créées (roster, heroes_6d, etc.)
- [ ] Service import CSV fonctionnel
- [ ] Données migrées de H2
- [ ] API endpoints testés
- [ ] Backup automatique configuré
- [ ] Documentation mise à jour

---

**PRÊT POUR LA MIGRATION NOCTURNE !**