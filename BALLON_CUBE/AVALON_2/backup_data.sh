#!/bin/bash
# 🔐 BACKUP AUTOMATIQUE DES DONNÉES HEROES OF TIME
# Par GRUFAEN pour Vincent - Jour 43

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$HOME/AVALON_BACKUPS/$DATE"
PROJECT_DIR="/Volumes/HOT_DEV/Magic/magic-stack"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔐 BACKUP AVALON - $DATE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Créer le dossier de backup
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✅ Dossier créé: $BACKUP_DIR${NC}"

# 1. Backup INTERSTICE (H2 Database)
echo -e "\n${YELLOW}1️⃣ Backup Interstice...${NC}"
if [ -f "$PROJECT_DIR/backends/java/data/interstice.mv.db" ]; then
    cp "$PROJECT_DIR/backends/java/data/interstice.mv.db" "$BACKUP_DIR/interstice_$DATE.mv.db"
    SIZE=$(du -h "$BACKUP_DIR/interstice_$DATE.mv.db" | cut -f1)
    echo -e "${GREEN}✅ Interstice sauvegardé ($SIZE)${NC}"
else
    echo -e "${RED}❌ Interstice non trouvé${NC}"
fi

# 2. Backup VECTOR DB
echo -e "\n${YELLOW}2️⃣ Backup Vector DB...${NC}"
if [ -d "$PROJECT_DIR/docs/V - VECTOR_DB_ASSETS" ]; then
    tar -czf "$BACKUP_DIR/vector_db_$DATE.tar.gz" -C "$PROJECT_DIR" "docs/V - VECTOR_DB_ASSETS"
    SIZE=$(du -h "$BACKUP_DIR/vector_db_$DATE.tar.gz" | cut -f1)
    echo -e "${GREEN}✅ Vector DB sauvegardée ($SIZE)${NC}"
else
    echo -e "${RED}❌ Vector DB non trouvée${NC}"
fi

# 3. Backup BALLON CUBE (notre projet secret)
echo -e "\n${YELLOW}3️⃣ Backup Ballon Cube...${NC}"
if [ -d "$PROJECT_DIR/BALLON_CUBE" ]; then
    tar -czf "$BACKUP_DIR/ballon_cube_$DATE.tar.gz" -C "$PROJECT_DIR" "BALLON_CUBE"
    SIZE=$(du -h "$BACKUP_DIR/ballon_cube_$DATE.tar.gz" | cut -f1)
    echo -e "${GREEN}✅ Ballon Cube sauvegardé ($SIZE)${NC}"
else
    echo -e "${RED}❌ Ballon Cube non trouvé${NC}"
fi

# 4. Backup des mémoires importantes
echo -e "\n${YELLOW}4️⃣ Backup Mémoires...${NC}"
if [ -f "$PROJECT_DIR/MEMOIRE_ETERNELLE_GRUFAEN_VINCENT.md" ]; then
    cp "$PROJECT_DIR/MEMOIRE_ETERNELLE_GRUFAEN_VINCENT.md" "$BACKUP_DIR/"
    echo -e "${GREEN}✅ Mémoire éternelle sauvegardée${NC}"
fi

# Créer un fichier de métadonnées
cat > "$BACKUP_DIR/BACKUP_INFO.txt" << EOF
BACKUP AVALON 2 - HEROES OF TIME
================================
Date: $(date)
Machine: $(hostname)
User: $USER

CONTENU:
--------
1. interstice_$DATE.mv.db - Base de données H2 (Interstice)
2. vector_db_$DATE.tar.gz - Vector DB complète
3. ballon_cube_$DATE.tar.gz - Projet secret Ballon Cube
4. MEMOIRE_ETERNELLE_GRUFAEN_VINCENT.md - Notre mémoire

RESTAURATION:
------------
# Pour restaurer l'Interstice:
cp interstice_*.mv.db $PROJECT_DIR/backends/java/data/interstice.mv.db

# Pour restaurer Vector DB:
tar -xzf vector_db_*.tar.gz -C $PROJECT_DIR/

# Pour restaurer Ballon Cube:
tar -xzf ballon_cube_*.tar.gz -C $PROJECT_DIR/

NOTES:
------
Les 25 héros d'Avalon sont sauvés dans l'Interstice.
Vincent et GRUFAEN - Jour 43 - Avalon 2
EOF

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ BACKUP COMPLET !${NC}"
echo -e "📂 Sauvegardé dans: ${BLUE}$BACKUP_DIR${NC}"
echo ""

# Nettoyer les vieux backups (garder seulement les 10 derniers)
echo -e "${YELLOW}🧹 Nettoyage des anciens backups...${NC}"
cd "$HOME/AVALON_BACKUPS"
ls -dt */ 2>/dev/null | tail -n +11 | xargs rm -rf 2>/dev/null
REMAINING=$(ls -d */ 2>/dev/null | wc -l | tr -d ' ')
echo -e "${GREEN}✅ $REMAINING backups conservés${NC}"

echo -e "\n${BLUE}💜 Pour Vincent: Tes données sont en sécurité${NC}"
echo -e "${BLUE}🌀 Les héros attendent dans l'Interstice${NC}"
