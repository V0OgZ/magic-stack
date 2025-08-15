#!/bin/bash

# 🔄 VPS SAFE SYNC - Synchronisation intelligente qui préserve les configs
# Ce script met à jour depuis GitHub SANS écraser les configs VPS

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "🔄 VPS SAFE SYNC - Mise à jour intelligente"
echo "==========================================="
echo ""

# Aller dans le bon dossier
cd /opt/hot/app || exit 1

# 1. SAUVEGARDER les configs importantes
echo -e "${YELLOW}💾 Sauvegarde des configs VPS...${NC}"
cp /etc/caddy/Caddyfile /tmp/Caddyfile.backup 2>/dev/null
cp .env.production /tmp/.env.production.backup 2>/dev/null
cp -r backup_vps /tmp/backup_vps.backup 2>/dev/null

# 2. STASH les changements locaux
echo -e "${YELLOW}📦 Stash des changements locaux...${NC}"
git stash push -m "VPS local changes $(date +%Y%m%d-%H%M%S)"

# 3. MISE À JOUR depuis GitHub (sans reset --hard)
echo -e "${YELLOW}🔽 Pull depuis GitHub (prod, no-hard-reset)...${NC}"
git fetch origin prod
# S'assurer d'être sur prod
git checkout -q prod 2>/dev/null || git checkout -qb prod
# Fast‑forward uniquement pour éviter les merges/conflicts
if ! git merge --ff-only origin/prod; then
  echo -e "${YELLOW}⚠️ FF impossible; bascule douce vers origin/prod (reset --keep)${NC}"
  git reset --keep origin/prod || {
    echo -e "${RED}❌ Impossible d'aligner la branche. Abandon.${NC}"; exit 2;
  }
fi

# 4. RESTAURER les configs VPS
echo -e "${YELLOW}♻️ Restauration des configs VPS...${NC}"
cp /tmp/Caddyfile.backup /etc/caddy/Caddyfile 2>/dev/null
cp /tmp/.env.production.backup .env.production 2>/dev/null
cp -r /tmp/backup_vps.backup backup_vps 2>/dev/null

# 5. IGNORER certains fichiers pour les futurs pulls (configs VPS uniquement)
echo -e "${YELLOW}📝 Mise à jour .gitignore local...${NC}"
cat > .git/info/exclude << 'EOF'
# Configs spécifiques au VPS
Caddyfile
.env.production
backup_vps/
*.pid
*.log
logs/
backends/java/data/*.db
*.mv.db
FRONTPAGE/assets/HD/
FRONTPAGE/assets/compressed/
assets/generated/
EOF

# 6. BUILD si nécessaire
echo -e "${YELLOW}🔨 Build des backends...${NC}"
if [ -f "backends/rust/Cargo.toml" ]; then
    cd backends/rust && cargo build --release && cd ../..
fi

if [ -f "backends/java/pom.xml" ]; then
    cd backends/java && mvn clean package -DskipTests && cd ../..
fi

# 7. RESTART les services
echo -e "${YELLOW}🔄 Restart des services...${NC}"
systemctl restart caddy magic-java magic-rust magic-vector magic-clippy

# 8. VÉRIFICATION
echo ""
echo -e "${GREEN}✅ Vérification des services:${NC}"
systemctl status --no-pager caddy | grep Active
systemctl status --no-pager magic-java | grep Active
systemctl status --no-pager magic-rust | grep Active
systemctl status --no-pager magic-vector | grep Active
systemctl status --no-pager magic-clippy | grep Active

echo ""
echo -e "${GREEN}✨ SYNC TERMINÉ!${NC}"
echo "Les configs VPS sont préservées"
echo "Le code est à jour avec GitHub prod"
