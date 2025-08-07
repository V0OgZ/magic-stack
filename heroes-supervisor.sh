#!/bin/bash

# 🔮⚡ HEROES OF TIME - SUPERVISOR MANAGER ⚡🔮
# Gestion professionnelle des backends avec Supervisor

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

show_banner() {
    echo -e "${PURPLE}"
    echo "🔮⚡ HEROES OF TIME - SUPERVISOR MANAGER ⚡🔮"
    echo "═══════════════════════════════════════════════════"
    echo -e "${CYAN}    Gestion professionnelle des backends${NC}"
    echo ""
}

check_supervisor() {
    if ! systemctl is-active --quiet supervisor; then
        echo -e "${YELLOW}🔄 Démarrage de Supervisor...${NC}"
        sudo systemctl start supervisor
        sleep 2
    fi
    
    if systemctl is-active --quiet supervisor; then
        echo -e "${GREEN}✅ Supervisor est actif${NC}"
        return 0
    else
        echo -e "${RED}❌ Supervisor n'est pas actif!${NC}"
        return 1
    fi
}

show_status() {
    echo -e "${YELLOW}📊 STATUS HEROES OF TIME BACKENDS:${NC}"
    echo ""
    
    # Status général
    sudo supervisorctl status heroes-of-time-java heroes-of-time-rust
    echo ""
    
    # Test de connectivité
    echo -e "${CYAN}🔍 Tests de connectivité:${NC}"
    
    if curl -s http://localhost:8082/health > /dev/null 2>&1; then
        echo -e "  ☕ Java Backend (8080): ${GREEN}✅ ONLINE${NC}"
    else
        echo -e "  ☕ Java Backend (8080): ${RED}❌ OFFLINE${NC}"
    fi
    
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo -e "  🦀 Rust Backend (3001): ${GREEN}✅ ONLINE${NC}"
    else
        echo -e "  🦀 Rust Backend (3001): ${RED}❌ OFFLINE${NC}"
    fi
    
    echo ""
    echo -e "${CYAN}📈 Statistiques rapides:${NC}"
    
    # Test de performance rapide
    if curl -s http://localhost:8082/health > /dev/null 2>&1; then
        local java_time=$(curl -w "%{time_total}" -s -o /dev/null http://localhost:8082/health)
        echo -e "  ☕ Java Response Time: ${GREEN}${java_time}s${NC}"
    fi
    
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        local rust_time=$(curl -w "%{time_total}" -s -o /dev/null http://localhost:3001/health)
        echo -e "  🦀 Rust Response Time: ${GREEN}${rust_time}s${NC}"
    fi
}

start_backends() {
    echo -e "${YELLOW}🚀 DÉMARRAGE DES BACKENDS AVEC SUPERVISOR...${NC}"
    
    # Arrêter les anciens processus manuels pour éviter les conflits
    echo -e "${CYAN}🧹 Nettoyage des processus existants...${NC}"
    pkill -f "spring-boot:run" 2>/dev/null || true
    pkill -f "avalon-magic-rust" 2>/dev/null || true
    sleep 3
    
    # Recharger la configuration Supervisor
    sudo supervisorctl reread
    sudo supervisorctl update
    
    # Démarrer les services
    echo -e "${CYAN}☕ Démarrage Java Backend...${NC}"
    sudo supervisorctl start heroes-of-time-java
    
    echo -e "${CYAN}🦀 Démarrage Rust Backend...${NC}"
    sudo supervisorctl start heroes-of-time-rust
    
    sleep 5
    echo -e "${GREEN}✨ Backends démarrés avec Supervisor!${NC}"
    echo -e "${YELLOW}💡 Ils redémarreront automatiquement en cas de crash${NC}"
}

stop_backends() {
    echo -e "${YELLOW}🛑 ARRÊT DES BACKENDS...${NC}"
    
    sudo supervisorctl stop heroes-of-time-java heroes-of-time-rust
    
    echo -e "${GREEN}✅ Backends arrêtés${NC}"
}

restart_backends() {
    echo -e "${YELLOW}🔄 REDÉMARRAGE DES BACKENDS...${NC}"
    
    sudo supervisorctl restart heroes-of-time-java heroes-of-time-rust
    
    sleep 8
    echo -e "${GREEN}✅ Backends redémarrés${NC}"
}

show_logs() {
    local service="$1"
    
    if [ -z "$service" ]; then
        echo -e "${YELLOW}📋 LOGS DISPONIBLES:${NC}"
        echo "  ☕ java  - Logs du backend Java"
        echo "  🦀 rust  - Logs du backend Rust"
        echo "  📊 both  - Logs des deux backends"
        echo ""
        echo -e "${CYAN}Usage: $0 logs [java|rust|both]${NC}"
        return
    fi
    
    case "$service" in
        "java")
            echo -e "${YELLOW}📋 LOGS JAVA BACKEND:${NC}"
            echo ""
            sudo tail -50 /workspace/logs/java-backend-supervisor.log
            ;;
        "rust")
            echo -e "${YELLOW}📋 LOGS RUST BACKEND:${NC}"
            echo ""
            sudo tail -50 /workspace/logs/rust-backend-supervisor.log
            ;;
        "both")
            echo -e "${YELLOW}📋 LOGS JAVA BACKEND:${NC}"
            sudo tail -25 /workspace/logs/java-backend-supervisor.log
            echo ""
            echo -e "${YELLOW}📋 LOGS RUST BACKEND:${NC}"
            sudo tail -25 /workspace/logs/rust-backend-supervisor.log
            ;;
        *)
            echo -e "${RED}❌ Service inconnu: $service${NC}"
            ;;
    esac
}

performance_test() {
    echo -e "${YELLOW}⚡ TEST DE PERFORMANCE RAPIDE...${NC}"
    
    if ! curl -s http://localhost:8082/health > /dev/null || ! curl -s http://localhost:3001/health > /dev/null; then
        echo -e "${RED}❌ Un ou plusieurs backends sont offline!${NC}"
        return 1
    fi
    
    echo -e "${CYAN}🏥 Health Check Performance (10 tests):${NC}"
    
    # Test Java
    local java_total=0
    for i in {1..10}; do
        local time=$(curl -w "%{time_total}" -s -o /dev/null http://localhost:8082/health)
        local time_ms=$(echo "$time * 1000" | bc)
        java_total=$(echo "$java_total + $time_ms" | bc)
        echo -n "☕"
    done
    local java_avg=$(echo "scale=1; $java_total / 10" | bc)
    echo -e " Java avg: ${GREEN}${java_avg}ms${NC}"
    
    # Test Rust
    local rust_total=0
    for i in {1..10}; do
        local time=$(curl -w "%{time_total}" -s -o /dev/null http://localhost:3001/health)
        local time_ms=$(echo "$time * 1000" | bc)
        rust_total=$(echo "$rust_total + $time_ms" | bc)
        echo -n "🦀"
    done
    local rust_avg=$(echo "scale=1; $rust_total / 10" | bc)
    echo -e " Rust avg: ${GREEN}${rust_avg}ms${NC}"
    
    # Comparaison
    local diff=$(echo "$java_avg - $rust_avg" | bc)
    if (( $(echo "$rust_avg < $java_avg" | bc -l) )); then
        echo -e "🏆 ${CYAN}Rust is ${diff}ms faster!${NC}"
    else
        local diff_pos=$(echo "$rust_avg - $java_avg" | bc)
        echo -e "🏆 ${CYAN}Java is ${diff_pos}ms faster!${NC}"
    fi
}

monitor_backends() {
    echo -e "${YELLOW}👁️ MONITORING CONTINU DES BACKENDS...${NC}"
    echo -e "${CYAN}Appuyez sur Ctrl+C pour arrêter${NC}"
    echo ""
    
    while true; do
        clear
        show_banner
        show_status
        echo ""
        echo -e "${GRAY}Dernière mise à jour: $(date)${NC}"
        echo -e "${GRAY}Monitoring toutes les 10 secondes...${NC}"
        sleep 10
    done
}

# Fonction d'installation/configuration
setup_supervisor() {
    echo -e "${YELLOW}🔧 CONFIGURATION SUPERVISOR POUR HEROES OF TIME...${NC}"
    
    # Vérifier que supervisor est installé
    if ! command -v supervisorctl &> /dev/null; then
        echo -e "${RED}❌ Supervisor n'est pas installé!${NC}"
        echo -e "${CYAN}💡 Installez-le avec: sudo apt-get install supervisor${NC}"
        return 1
    fi
    
    # Créer le répertoire de logs
    sudo mkdir -p /workspace/logs
    sudo chown ubuntu:ubuntu /workspace/logs
    
    # Recharger la configuration
    sudo supervisorctl reread
    sudo supervisorctl update
    
    echo -e "${GREEN}✅ Configuration Supervisor mise à jour!${NC}"
}

# Menu d'aide
show_help() {
    echo -e "${CYAN}🎯 COMMANDES DISPONIBLES:${NC}"
    echo ""
    echo -e "  🚀 ${YELLOW}start${NC}     - Démarrer les backends avec Supervisor"
    echo -e "  🛑 ${YELLOW}stop${NC}      - Arrêter les backends"
    echo -e "  🔄 ${YELLOW}restart${NC}   - Redémarrer les backends"
    echo -e "  📊 ${YELLOW}status${NC}    - Afficher le statut des backends"
    echo -e "  📋 ${YELLOW}logs${NC}      - Afficher les logs [java|rust|both]"
    echo -e "  ⚡ ${YELLOW}perf${NC}      - Test de performance rapide"
    echo -e "  👁️ ${YELLOW}monitor${NC}   - Monitoring continu"
    echo -e "  🔧 ${YELLOW}setup${NC}     - Configuration Supervisor"
    echo ""
    echo -e "${PURPLE}💡 Avantages de Supervisor:${NC}"
    echo -e "   • Redémarrage automatique en cas de crash"
    echo -e "   • Logs centralisés et rotatifs"
    echo -e "   • Gestion professionnelle des processus"
    echo -e "   • Monitoring intégré"
    echo ""
    echo -e "${CYAN}Usage: $0 [start|stop|restart|status|logs|perf|monitor|setup]${NC}"
}

# Main execution
show_banner

# Vérifier que Supervisor est disponible
if ! check_supervisor; then
    echo -e "${RED}💥 Supervisor n'est pas disponible!${NC}"
    echo -e "${YELLOW}💡 Lancez: $0 setup pour configurer${NC}"
    exit 1
fi

case "${1:-help}" in
    "start")
        start_backends
        ;;
    "stop")
        stop_backends
        ;;
    "restart")
        restart_backends
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs "$2"
        ;;
    "perf")
        performance_test
        ;;
    "monitor")
        monitor_backends
        ;;
    "setup")
        setup_supervisor
        ;;
    "help"|*)
        show_help
        ;;
esac