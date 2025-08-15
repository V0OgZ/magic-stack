# Guide de Déploiement - RealGame Backends

## Problème actuel
Le port 8000 est déjà utilisé. Voici comment déployer proprement tes backends.

## Solution 1 : Script corrigé

```bash
cd REALGAME
./launch-pwa-fixed.sh
```

Ce script va :
- Trouver automatiquement un port libre
- Démarrer tous les backends disponibles
- Ouvrir la PWA automatiquement

## Solution 2 : Déploiement manuel

### Étape 1 : Nettoyer les ports
```bash
# Vérifier ce qui utilise le port 8000
lsof -i :8000

# Tuer les processus si nécessaire
pkill -f "python.*http.server"
pkill -f "java.*magic-stack-backend"
```

### Étape 2 : Démarrer les backends

#### Terminal 1 - Serveur HTTP
```bash
cd REALGAME
python3 -m http.server 8080
```

#### Terminal 2 - Backend Java (Magic Stack)
```bash
cd spells/stack/backends/java
java -jar target/magic-stack-backend-1.0.0-APOLLO.jar --server.port=8082
```

#### Terminal 3 - Backend Rust (si disponible)
```bash
cd spells/stack/backends/rust
cargo run -- --port 3001
```

### Étape 3 : Ouvrir la PWA
```
http://localhost:8080/REALGAME/pwa-realgame.html
```

## Solution 3 : Déploiement sur PC Windows

### Prérequis Windows
```powershell
# Installer Python
winget install Python.Python.3.9

# Installer Java
winget install Oracle.Java

# Installer Rust
winget install Rust.Rust
```

### Script Windows (deploy-windows.bat)
```batch
@echo off
echo Lancement RealGame PWA Windows...

REM Nettoyer les anciens processus
taskkill /f /im python.exe 2>nul
taskkill /f /im java.exe 2>nul

REM Démarrer serveur HTTP
start "HTTP Server" python -m http.server 8080

REM Démarrer backend Java
cd spells\stack\backends\java
start "Java Backend" java -jar target\magic-stack-backend-1.0.0-APOLLO.jar --server.port=8082
cd ..\..\..

REM Démarrer backend Rust
cd spells\stack\backends\rust
start "Rust Backend" cargo run -- --port 3001
cd ..\..\..

REM Ouvrir la PWA
timeout /t 3
start http://localhost:8080/REALGAME/pwa-realgame.html

echo PWA lancée sur http://localhost:8080/REALGAME/pwa-realgame.html
pause
```

## Solution 4 : Déploiement avec Docker

### Dockerfile pour le backend Java
```dockerfile
FROM openjdk:11-jre-slim
WORKDIR /app
COPY spells/stack/backends/java/target/magic-stack-backend-1.0.0-APOLLO.jar .
EXPOSE 8082
CMD ["java", "-jar", "magic-stack-backend-1.0.0-APOLLO.jar", "--server.port=8082"]
```

### Dockerfile pour le backend Rust
```dockerfile
FROM rust:1.70 as builder
WORKDIR /app
COPY spells/stack/backends/rust .
RUN cargo build --release

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/backend /usr/local/bin/
EXPOSE 3001
CMD ["backend", "--port", "3001"]
```

### docker-compose.yml
```yaml
version: '3.8'
services:
  http-server:
    image: python:3.9-slim
    ports:
      - "8080:8000"
    volumes:
      - .:/app
    working_dir: /app
    command: python -m http.server 8000

  java-backend:
    build:
      context: .
      dockerfile: Dockerfile.java
    ports:
      - "8082:8082"

  rust-backend:
    build:
      context: .
      dockerfile: Dockerfile.rust
    ports:
      - "3001:3001"
```

## Solution 5 : Déploiement en production

### Hébergement cloud (AWS/GCP/Azure)
```bash
# Exemple avec AWS EC2
ssh -i key.pem ubuntu@your-server.com

# Installer les dépendances
sudo apt update
sudo apt install openjdk-11-jdk python3 rustc cargo

# Cloner le projet
git clone your-repo
cd your-repo

# Démarrer les services
sudo systemctl start java-backend
sudo systemctl start rust-backend
sudo systemctl start nginx  # Pour servir les fichiers statiques
```

### Configuration Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/REALGAME;
        try_files $uri $uri/ /pwa-realgame.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:8082/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Vérification des services

### Script de vérification
```bash
#!/bin/bash
echo "Vérification des services RealGame..."

# Vérifier HTTP Server
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ HTTP Server: ACTIF"
else
    echo "❌ HTTP Server: INACTIF"
fi

# Vérifier Java Backend
if curl -s http://localhost:8082/health > /dev/null; then
    echo "✅ Java Backend: ACTIF"
else
    echo "❌ Java Backend: INACTIF"
fi

# Vérifier Rust Backend
if curl -s http://localhost:3001/health > /dev/null; then
    echo "✅ Rust Backend: ACTIF"
else
    echo "❌ Rust Backend: INACTIF"
fi
```

## Ports par défaut

| Service | Port | Description |
|---------|------|-------------|
| HTTP Server | 8080 | Fichiers statiques (PWA) |
| Java Backend | 8082 | Magic Stack API |
| Rust Backend | 3001 | Rust API |
| Database | 5432 | PostgreSQL (si utilisé) |

## Dépannage

### Port déjà utilisé
```bash
# Trouver le processus
lsof -i :8080

# Tuer le processus
kill -9 <PID>
```

### Backend ne démarre pas
```bash
# Vérifier les logs
tail -f /tmp/realgame_java.pid
tail -f /tmp/realgame_rust.pid

# Vérifier les dépendances
java -version
rustc --version
python3 --version
```

### PWA ne se charge pas
```bash
# Vérifier les fichiers
ls -la REALGAME/pwa-realgame.html
ls -la REALGAME/manifest.json
ls -la REALGAME/sw.js

# Vérifier les permissions
chmod +x REALGAME/*.sh
```

## Commandes utiles

```bash
# Démarrer tout
./launch-pwa-fixed.sh

# Arrêter tout
./STOP_TOUTES_CONSOLES.sh

# Vérifier les ports
netstat -tulpn | grep :808

# Vérifier les processus
ps aux | grep -E "(python|java|rust)"

# Logs en temps réel
tail -f /tmp/realgame_*.pid
```
