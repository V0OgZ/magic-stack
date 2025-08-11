# 🚀 DEVOPS - GUIDE DE DÉPLOIEMENT PRODUCTION

## 📦 ARCHITECTURE COMPLÈTE ✅

```
MAGIC STACK (STATUS: TOUT FONCTIONNE!)
├── Frontend (1 seul!)
│   └── React App (5175) → apps/magic-stack-unified ✅
│
├── Backend (2 services principaux)
│   ├── Rust (3001) → backends/rust      [Calculs 6D, Q*] ✅
│   └── Java (8082) → backends/java      [CRUD, APIs] ✅
│
└── Services IA (ACTIFS!)
    ├── Vector DB (7500) → scripts/vector_db ✅
    └── LLM Clippy (7501) → scripts/clippy ✅
```

### Ports en production:
- **5175**: Frontend React (Vite)
- **3001**: Backend Rust (calculs complexes)
- **8082**: Backend Java (Spring Boot) ⚠️ NOTE: Port 8082, pas 8080!
- **7500**: Vector DB (recherche sémantique)
- **7501**: LLM Clippy (IA conversationnelle)

## 🔧 PRÉREQUIS SERVEUR

```bash
# OS: Ubuntu 22.04 LTS recommandé
# RAM: 8GB minimum, 16GB recommandé
# CPU: 4 cores minimum
# Disque: 50GB minimum

# Installer les dépendances système
sudo apt update
sudo apt install -y \
    build-essential \
    curl \
    git \
    nginx \
    postgresql-14 \
    redis-server \
    python3-pip \
    openjdk-17-jdk \
    maven
    
# Installer Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Installer Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 📁 STRUCTURE DÉPLOIEMENT

```bash
/opt/magic-stack/
├── app/              # Code source
├── logs/             # Logs des services
├── data/             # Données persistantes
│   ├── postgres/
│   ├── redis/
│   └── vector_db/
└── scripts/          # Scripts de gestion
```

## 🚀 SCRIPT DE DÉPLOIEMENT

### 1. Clone et Setup Initial

```bash
#!/bin/bash
# deploy.sh

# Variables
DEPLOY_DIR="/opt/magic-stack"
REPO_URL="https://github.com/YOUR_USERNAME/magic-stack.git"

# Création structure
sudo mkdir -p $DEPLOY_DIR/{app,logs,data,scripts}
cd $DEPLOY_DIR

# Clone du repo
git clone $REPO_URL app
cd app

# Installation des dépendances
cd backends/rust && cargo build --release
cd ../java && ./mvnw clean package
cd ../python && pip3 install -r requirements.txt
cd ../../apps/magic-stack-unified && npm ci && npm run build
```

### 2. Configuration Nginx

```nginx
# /etc/nginx/sites-available/magic-stack

server {
    listen 80;
    server_name your-domain.com;

    # Frontend React
    location / {
        proxy_pass http://localhost:5175;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API Rust
    location /api/v2/ {
        proxy_pass http://localhost:3001;
    }

    # API Java
    location /api/ {
        proxy_pass http://localhost:8080;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 3. Services SystemD

```ini
# /etc/systemd/system/magic-rust.service
[Unit]
Description=Magic Stack Rust Backend
After=network.target

[Service]
Type=simple
User=magic
WorkingDirectory=/opt/magic-stack/app/backends/rust
ExecStart=/opt/magic-stack/app/backends/rust/target/release/magic-rust
Restart=always
Environment="RUST_LOG=info"

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/magic-java.service
[Unit]
Description=Magic Stack Java Backend
After=network.target

[Service]
Type=simple
User=magic
WorkingDirectory=/opt/magic-stack/app/backends/java
ExecStart=/usr/bin/java -jar target/magic-stack.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/magic-frontend.service
[Unit]
Description=Magic Stack Frontend
After=network.target

[Service]
Type=simple
User=magic
WorkingDirectory=/opt/magic-stack/app/apps/magic-stack-unified
ExecStart=/usr/bin/npm run preview
Restart=always
Environment="NODE_ENV=production"

[Install]
WantedBy=multi-user.target
```

## 🔑 VARIABLES D'ENVIRONNEMENT

```bash
# /opt/magic-stack/.env

# Database
DATABASE_URL=postgresql://magic:password@localhost/magic_stack
REDIS_URL=redis://localhost:6379

# Ports
RUST_PORT=3001
JAVA_PORT=8080
PYTHON_PORT=5001
FRONTEND_PORT=5175

# API Keys (optionnel)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...

# Logs
LOG_LEVEL=info
LOG_DIR=/opt/magic-stack/logs
```

## 📊 MONITORING

### Script de santé

```bash
#!/bin/bash
# health-check.sh

check_service() {
    if curl -f http://localhost:$1/health 2>/dev/null; then
        echo "✅ $2 OK"
    else
        echo "❌ $2 DOWN"
    fi
}

echo "=== MAGIC STACK HEALTH ==="
check_service 5175 "Frontend"
check_service 3001 "Rust Backend"
check_service 8080 "Java Backend"
check_service 5001 "Python Backend"
```

### Logs centralisés

```bash
# Tous les logs dans /opt/magic-stack/logs/
tail -f /opt/magic-stack/logs/*.log
```

## 🚀 COMMANDES DE GESTION

```bash
# Démarrer tous les services
sudo systemctl start magic-rust magic-java magic-frontend

# Arrêter tous les services
sudo systemctl stop magic-rust magic-java magic-frontend

# Redémarrer
sudo systemctl restart magic-rust magic-java magic-frontend

# Voir les logs
journalctl -u magic-rust -f
journalctl -u magic-java -f
journalctl -u magic-frontend -f

# Status
systemctl status magic-*
```

## 🔒 SÉCURITÉ

1. **Firewall**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

2. **HTTPS avec Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

3. **Utilisateur dédié**
```bash
sudo useradd -r -s /bin/bash magic
sudo chown -R magic:magic /opt/magic-stack
```

## 🐳 OPTION DOCKER

### docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build: ./apps/magic-stack-unified
    ports:
      - "5175:5175"
    depends_on:
      - rust
      - java

  rust:
    build: ./backends/rust
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=${DATABASE_URL}

  java:
    build: ./backends/java
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=${DATABASE_URL}

  postgres:
    image: postgres:14
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=magic_stack
      - POSTGRES_USER=magic
      - POSTGRES_PASSWORD=password

volumes:
  postgres_data:
```

### Déploiement Docker
```bash
# Build et lancement
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêt
docker-compose down
```

## 🎯 CHECKLIST DÉPLOIEMENT

- [ ] Serveur configuré avec prérequis
- [ ] Code cloné dans /opt/magic-stack
- [ ] Dépendances installées
- [ ] Variables d'environnement configurées
- [ ] Services SystemD créés
- [ ] Nginx configuré
- [ ] SSL/HTTPS activé
- [ ] Firewall configuré
- [ ] Monitoring en place
- [ ] Backups configurés
- [ ] Tests de santé OK

## 📝 NOTES IMPORTANTES

1. **Ports en production**: Changer les ports par défaut
2. **Secrets**: Ne JAMAIS commiter les .env en prod
3. **Backups**: Sauvegarder /opt/magic-stack/data quotidiennement
4. **Logs**: Rotation automatique avec logrotate
5. **Updates**: Script de mise à jour avec zero-downtime

## 🆘 TROUBLESHOOTING

### Service ne démarre pas
```bash
journalctl -xe
systemctl status magic-*
```

### Port déjà utilisé
```bash
sudo lsof -i:PORT
sudo kill -9 PID
```

### Permissions
```bash
sudo chown -R magic:magic /opt/magic-stack
```

### Reset complet
```bash
sudo systemctl stop magic-*
cd /opt/magic-stack/app
git pull
# Rebuild...
sudo systemctl start magic-*
```
