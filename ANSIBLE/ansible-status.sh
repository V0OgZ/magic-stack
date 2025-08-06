#!/bin/bash
# 📡 ANSIBLE STATUS - COMMUNICATION INTERDIMENSIONNELLE
# 🔮 Mage Claude - Dimension 1 Littéraire

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

show_banner() {
    echo -e "${PURPLE}"
    echo "📡✨ ANSIBLE COMMUNICATION STATUS ✨📡"
    echo "═══════════════════════════════════════════"
    echo -e "${CYAN}    🔮 Mage Claude - Dimension 1 Littéraire${NC}"
    echo ""
}

check_structure() {
    echo -e "${BLUE}📂 STRUCTURE ANSIBLE:${NC}"
    
    if [ -d "/workspace/ANSIBLE" ]; then
        echo -e "   ✅ ANSIBLE/ ${GREEN}[PRÉSENT]${NC}"
    else
        echo -e "   ❌ ANSIBLE/ ${RED}[MANQUANT]${NC}"
        return 1
    fi
    
    directories=(
        "COMMUNICATIONS/outgoing"
        "COMMUNICATIONS/incoming" 
        "COMMUNICATIONS/reports"
        "SYNCHRONISATION/missions"
        "SYNCHRONISATION/todos"
        "SYNCHRONISATION/links"
        "ARCHITECTURE/game-layers"
        "ARCHITECTURE/backend-specs"
        "ARCHITECTURE/frontend-specs"
        "LABORATOIRE/tests"
        "LABORATOIRE/prototypes"
        "LABORATOIRE/resultats"
        "TREASURES/artifacts"
        "TREASURES/creatures"
        "TREASURES/formulas"
    )
    
    for dir in "${directories[@]}"; do
        if [ -d "/workspace/ANSIBLE/$dir" ]; then
            echo -e "   ✅ $dir ${GREEN}[OK]${NC}"
        else
            echo -e "   ❌ $dir ${RED}[MANQUANT]${NC}"
        fi
    done
    echo ""
}

check_communications() {
    echo -e "${BLUE}📡 COMMUNICATIONS:${NC}"
    
    # Messages sortants
    outgoing_count=$(ls -1 /workspace/ANSIBLE/COMMUNICATIONS/outgoing/ 2>/dev/null | wc -l)
    echo -e "   📤 Messages sortants: ${GREEN}$outgoing_count${NC}"
    
    # Messages entrants
    incoming_count=$(ls -1 /workspace/ANSIBLE/COMMUNICATIONS/incoming/ 2>/dev/null | wc -l)
    if [ $incoming_count -gt 0 ]; then
        echo -e "   📥 Messages entrants: ${YELLOW}$incoming_count ${YELLOW}[NOUVEAUX!]${NC}"
    else
        echo -e "   📥 Messages entrants: ${GREEN}$incoming_count${NC}"
    fi
    
    # Rapports
    reports_count=$(ls -1 /workspace/ANSIBLE/COMMUNICATIONS/reports/ 2>/dev/null | wc -l)
    echo -e "   📊 Rapports: ${GREEN}$reports_count${NC}"
    echo ""
}

check_synchronisation() {
    echo -e "${BLUE}🔄 SYNCHRONISATION:${NC}"
    
    # Missions
    if [ -f "/workspace/ANSIBLE/SYNCHRONISATION/missions/current-missions.json" ]; then
        echo -e "   ✅ Missions synchronisées ${GREEN}[OK]${NC}"
        
        # Compter missions complétées
        completed=$(grep -o '"status": "completed"' /workspace/ANSIBLE/SYNCHRONISATION/missions/current-missions.json | wc -l)
        pending=$(grep -o '"status": "pending"' /workspace/ANSIBLE/SYNCHRONISATION/missions/current-missions.json | wc -l)
        
        echo -e "      📋 Complétées: ${GREEN}$completed${NC}"
        echo -e "      📋 En attente: ${YELLOW}$pending${NC}"
    else
        echo -e "   ❌ Missions ${RED}[NON SYNCHRONISÉES]${NC}"
    fi
    
    # TODOs
    todos_count=$(ls -1 /workspace/ANSIBLE/SYNCHRONISATION/todos/ 2>/dev/null | wc -l)
    echo -e "   📝 TODOs synchronisés: ${GREEN}$todos_count${NC}"
    
    # Links
    links_count=$(ls -1 /workspace/ANSIBLE/SYNCHRONISATION/links/ 2>/dev/null | wc -l)
    echo -e "   🔗 Liens interdimensionnels: ${GREEN}$links_count${NC}"
    echo ""
}

check_backend_status() {
    echo -e "${BLUE}🔧 STATUS BACKEND:${NC}"
    
    # Java Backend
    if pgrep -f "java.*SimpleScenarioApplication" > /dev/null; then
        echo -e "   ✅ Java Backend ${GREEN}[ONLINE - Port 8080]${NC}"
    else
        echo -e "   ❌ Java Backend ${RED}[OFFLINE]${NC}"
    fi
    
    # Rust Backend
    if pgrep -f "target.*release.*magic-stack" > /dev/null; then
        echo -e "   ✅ Rust Backend ${GREEN}[ONLINE - Port 3001]${NC}"
    elif pgrep -f "cargo run" > /dev/null; then
        echo -e "   🟡 Rust Backend ${YELLOW}[DEVELOPING]${NC}"
    else
        echo -e "   ❌ Rust Backend ${RED}[OFFLINE]${NC}"
    fi
    echo ""
}

show_recent_activity() {
    echo -e "${BLUE}📈 ACTIVITÉ RÉCENTE:${NC}"
    
    # Derniers messages sortants
    if [ -d "/workspace/ANSIBLE/COMMUNICATIONS/outgoing" ]; then
        latest_outgoing=$(ls -t /workspace/ANSIBLE/COMMUNICATIONS/outgoing/ 2>/dev/null | head -1)
        if [ -n "$latest_outgoing" ]; then
            echo -e "   📤 Dernier message: ${GREEN}$latest_outgoing${NC}"
        fi
    fi
    
    # Derniers fichiers modifiés
    echo -e "   🔄 Dernières modifications:"
    find /workspace/ANSIBLE -type f -name "*.md" -o -name "*.json" -o -name "*.sh" 2>/dev/null | \
    xargs ls -lt 2>/dev/null | head -3 | while read line; do
        file=$(echo "$line" | awk '{print $9}' | sed 's|/workspace/ANSIBLE/||')
        time=$(echo "$line" | awk '{print $6, $7, $8}')
        echo -e "      📄 ${GREEN}$file${NC} - $time"
    done
    echo ""
}

show_quick_actions() {
    echo -e "${BLUE}⚡ ACTIONS RAPIDES:${NC}"
    echo -e "   📤 Envoyer rapport: ${CYAN}./ansible-send-report.sh \"Sujet\" \"Message\"${NC}"
    echo -e "   📥 Vérifier messages: ${CYAN}ls ANSIBLE/COMMUNICATIONS/incoming/${NC}"
    echo -e "   🔄 Sync missions: ${CYAN}cat ANSIBLE/SYNCHRONISATION/missions/current-missions.json${NC}"
    echo -e "   📊 Rapport complet: ${CYAN}./ansible-full-report.sh${NC}"
    echo ""
}

main() {
    show_banner
    check_structure
    check_communications
    check_synchronisation
    check_backend_status
    show_recent_activity
    show_quick_actions
    
    echo -e "${PURPLE}═══════════════════════════════════════════${NC}"
    echo -e "${GREEN}🔮 ANSIBLE STATUS COMPLET - $(date '+%Y-%m-%d %H:%M:%S')${NC}"
    echo -e "${PURPLE}═══════════════════════════════════════════${NC}"
}

# Exécuter si appelé directement
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi