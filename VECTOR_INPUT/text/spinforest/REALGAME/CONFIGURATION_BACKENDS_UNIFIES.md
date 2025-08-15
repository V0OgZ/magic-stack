# 🔧 CONFIGURATION BACKENDS UNIFIÉS

## ⚠️ PROBLÈME DÉTECTÉ

Les deux backends Java utilisent le **MÊME PORT 8080** !
- **AVALON Backend**: `avalon-backend/` → Port 8080
- **Magic Stack Java**: `spells/stack/java-backend/` → Port 8080

## 🎯 SOLUTION PROPOSÉE

### 1. PORTS DISTINCTS
```
AVALON Backend (Principal) : 8080
Magic Stack Java          : 8082  
Magic Stack Rust          : 8081
Visualisation 6D          : 8001
Frontend/UI               : 8000
```

### 2. CONFIGURATION CORS

Tous les backends ont déjà CORS configuré :
```properties
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### 3. CHANGEMENTS NÉCESSAIRES

#### Magic Stack Java
Modifier `spells/stack/java-backend/src/main/resources/application.properties`:
```properties
server.port=8082  # Au lieu de 8080
```

#### Backend Rust
Vérifier que le port 8081 est bien configuré dans le code Rust.

### 4. ARCHITECTURE FINALE

```
┌─────────────────────────────────────────────┐
│            FRONTEND (8000)                  │
│         UI Panopticon Unifié                │
└─────────────┬───────────────────────────────┘
              │
              ├── http://localhost:8080/api/
              │   └── AVALON Backend (Java)
              │       ├── /6d-consciousness/
              │       ├── /import/roster/
              │       └── /interstice/
              │
              ├── http://localhost:8081/api/
              │   └── Magic Stack Rust
              │       ├── /magic/
              │       └── /spells/
              │
              └── http://localhost:8082/api/
                  └── Magic Stack Java
                      ├── /grofi/
                      └── /shaman/
```

### 5. SERVICES DISPONIBLES

#### AVALON (8080)
- **Conscience 6D**: `/api/6d-consciousness/`
- **Import/Export CSV**: `/api/import/roster/export-6d`
- **Interstice**: `/api/interstice/`

#### Magic Stack Rust (8081)
- **Sorts rapides**: `/api/magic/cast`
- **Formules optimisées**: `/api/spells/`

#### Magic Stack Java (8082)
- **GROFI**: `/api/grofi/`
- **Shaman Cards**: `/api/shaman/`

### 6. LANCEMENT UNIFIÉ

```bash
#!/bin/bash
# LANCE_TOUS_BACKENDS.sh

echo "🚀 Lancement de tous les backends..."

# 1. AVALON Backend
cd avalon-backend && mvn spring-boot:run &
AVALON_PID=$!

# 2. Magic Stack Rust
cd ../spells/stack/backends/rust && cargo run &
RUST_PID=$!

# 3. Magic Stack Java (avec nouveau port)
cd ../java && mvn spring-boot:run -Dserver.port=8082 &
JAVA_PID=$!

# 4. Visualisation 6D
cd ../../REALGAME/visualizer && python3 -m http.server 8001 &
VIZ_PID=$!

echo "✅ Tous les backends lancés!"
echo "AVALON: 8080 (PID: $AVALON_PID)"
echo "Rust: 8081 (PID: $RUST_PID)"
echo "Java Stack: 8082 (PID: $JAVA_PID)"
echo "Viz: 8001 (PID: $VIZ_PID)"
```

### 7. TEST DE COMPATIBILITÉ

```bash
# Test CORS entre services
curl -X OPTIONS http://localhost:8080/api/6d-consciousness/think \
     -H "Origin: http://localhost:8081" \
     -H "Access-Control-Request-Method: POST"
```

---
*Configuration unifiée pour que tous les mages puissent travailler ensemble !*