#!/bin/bash

# 🧹🔥 HEROES OF TIME - NETTOYAGE SCRIPTS DANGEREUX 🔥🧹
# Suppression sécurisée des scripts obsolètes et dangereux

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

show_banner() {
    echo -e "${PURPLE}"
    echo "🧹🔥 HEROES OF TIME - NETTOYAGE SCRIPTS DANGEREUX 🔥🧹"
    echo "════════════════════════════════════════════════════════"
    echo -e "${CYAN}    Suppression sécurisée des fichiers obsolètes${NC}"
    echo ""
}

# Liste des scripts dangereux à supprimer
DANGEROUS_SCRIPTS=(
    "magic-menu.sh"                    # Ancien script avec mauvais chemins
    "start-magic-autonome.sh"          # Script obsolète
    "launch_magic_stack.sh"            # Script legacy dangereux
    "test_magic_autonome.py"           # Test obsolète
    "install-git-lfs.sh"               # Pas nécessaire
)

# Liste des logs de test à nettoyer
TEST_LOGS=(
    "testall-results-*.log"
    "graph-perf-*.log"
    "perf-battle-extreme-*.log"
    "vision-test-results.json"
    "battery-test-results.json"
    "audit-report.json"
    "treasures-test-results.json"
    "traducteur-test-results.json"
)

# Scripts de test à garder mais déplacer
TEST_SCRIPTS_TO_MOVE=(
    "test-graph-performance.sh"
    "perf-battle-extreme.sh"
    "testall.sh"
    "test-traducteur-fractal.py"
    "test-treasures-integration.py"
    "battery-test-complete.py"
    "test-vision-complete.py"
    "audit-scenarios.py"
)

cleanup_dangerous_scripts() {
    echo -e "${YELLOW}🗑️ SUPPRESSION DES SCRIPTS DANGEREUX...${NC}"
    
    local removed_count=0
    
    for script in "${DANGEROUS_SCRIPTS[@]}"; do
        if [ -f "$script" ]; then
            echo -e "${RED}🔥 Suppression: $script${NC}"
            rm -f "$script"
            removed_count=$((removed_count + 1))
        else
            echo -e "${GRAY}⚪ Déjà absent: $script${NC}"
        fi
    done
    
    echo -e "${GREEN}✅ $removed_count scripts dangereux supprimés${NC}"
}

cleanup_test_logs() {
    echo -e "${YELLOW}📋 NETTOYAGE DES LOGS DE TEST...${NC}"
    
    local removed_count=0
    
    for log_pattern in "${TEST_LOGS[@]}"; do
        for log_file in $log_pattern; do
            if [ -f "$log_file" ]; then
                echo -e "${CYAN}🧹 Suppression log: $log_file${NC}"
                rm -f "$log_file"
                removed_count=$((removed_count + 1))
            fi
        done
    done
    
    echo -e "${GREEN}✅ $removed_count fichiers de logs supprimés${NC}"
}

move_test_scripts() {
    echo -e "${YELLOW}📦 DÉPLACEMENT DES SCRIPTS DE TEST...${NC}"
    
    # Créer le dossier de test s'il n'existe pas
    mkdir -p tests/archived-scripts
    
    local moved_count=0
    
    for script in "${TEST_SCRIPTS_TO_MOVE[@]}"; do
        if [ -f "$script" ]; then
            echo -e "${CYAN}📦 Déplacement: $script → tests/archived-scripts/${NC}"
            mv "$script" "tests/archived-scripts/"
            moved_count=$((moved_count + 1))
        fi
    done
    
    echo -e "${GREEN}✅ $moved_count scripts de test déplacés vers tests/archived-scripts/${NC}"
}

cleanup_pycache() {
    echo -e "${YELLOW}🐍 NETTOYAGE PYTHON CACHE...${NC}"
    
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete 2>/dev/null || true
    
    echo -e "${GREEN}✅ Cache Python nettoyé${NC}"
}

show_safe_scripts() {
    echo -e "${YELLOW}✅ SCRIPTS SÉCURISÉS CONSERVÉS:${NC}"
    echo ""
    echo -e "${GREEN}🔮 heroes-supervisor.sh${NC} - Gestion Supervisor (SÉCURISÉ)"
    echo -e "${GREEN}📊 docs/SCHEMA_ARCHITECTURE_SIMPLE.md${NC} - Documentation architecture"
    echo -e "${GREEN}📚 docs/ARCHITECTURE_HYBRIDE_HEROES_OF_TIME.md${NC} - Doc technique"
    echo -e "${GREEN}🎮 compare-apis.html${NC} - Comparaison APIs"
    echo ""
    echo -e "${CYAN}💡 Utilisez heroes-supervisor.sh pour gérer les backends${NC}"
}

create_readme_cleanup() {
    echo -e "${YELLOW}📝 CRÉATION README NETTOYAGE...${NC}"
    
    cat > CLEANUP_REPORT.md << 'EOF'
# 🧹 RAPPORT DE NETTOYAGE - HEROES OF TIME

## ✅ **SCRIPTS SUPPRIMÉS (DANGEREUX)**
- `magic-menu.sh` - Ancien script avec chemins incorrects
- `start-magic-autonome.sh` - Script obsolète
- `launch_magic_stack.sh` - Script legacy dangereux
- `test_magic_autonome.py` - Test obsolète
- `install-git-lfs.sh` - Non nécessaire

## 📦 **SCRIPTS DÉPLACÉS (ARCHIVÉS)**
- Tests de performance → `tests/archived-scripts/`
- Scripts d'audit → `tests/archived-scripts/`
- Scripts de validation → `tests/archived-scripts/`

## 🔧 **SCRIPTS SÉCURISÉS CONSERVÉS**
- ✅ `heroes-supervisor.sh` - **UTILISER CELUI-CI**
- ✅ Documentation architecture
- ✅ APIs et interfaces

## 🚀 **COMMANDES RECOMMANDÉES**
```bash
# Gérer les backends
./heroes-supervisor.sh start|stop|restart|status

# Voir l'architecture
cat docs/SCHEMA_ARCHITECTURE_SIMPLE.md
```

## ⚠️ **IMPORTANT**
- **NE PLUS UTILISER** les anciens scripts
- **TOUJOURS PASSER** par Supervisor
- **ARCHITECTURE HYBRIDE** documentée et validée
EOF

    echo -e "${GREEN}✅ CLEANUP_REPORT.md créé${NC}"
}

# Fonction de confirmation
confirm_cleanup() {
    echo -e "${YELLOW}⚠️ ATTENTION: Cette opération va supprimer des fichiers!${NC}"
    echo ""
    echo -e "${CYAN}Scripts qui seront supprimés:${NC}"
    for script in "${DANGEROUS_SCRIPTS[@]}"; do
        if [ -f "$script" ]; then
            echo -e "  🔥 $script"
        fi
    done
    echo ""
    echo -e "${CYAN}Logs qui seront supprimés:${NC}"
    for log_pattern in "${TEST_LOGS[@]}"; do
        for log_file in $log_pattern; do
            if [ -f "$log_file" ]; then
                echo -e "  🧹 $log_file"
            fi
        done
    done
    echo ""
    read -p "Confirmer le nettoyage? (y/N): " confirm
    
    if [[ $confirm =~ ^[Yy]$ ]]; then
        return 0
    else
        echo -e "${RED}❌ Nettoyage annulé${NC}"
        return 1
    fi
}

# Main execution
show_banner

case "${1:-confirm}" in
    "force")
        echo -e "${RED}🔥 NETTOYAGE FORCÉ (sans confirmation)${NC}"
        cleanup_dangerous_scripts
        cleanup_test_logs
        move_test_scripts
        cleanup_pycache
        create_readme_cleanup
        show_safe_scripts
        ;;
    "confirm"|*)
        if confirm_cleanup; then
            echo ""
            cleanup_dangerous_scripts
            cleanup_test_logs
            move_test_scripts
            cleanup_pycache
            create_readme_cleanup
            show_safe_scripts
            echo ""
            echo -e "${PURPLE}🎉 NETTOYAGE TERMINÉ! Workspace sécurisé!${NC}"
        fi
        ;;
esac