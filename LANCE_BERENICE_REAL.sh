#!/bin/bash
# Script de lancement du vrai jeu Bérénice avec toute l'architecture

echo "🎮 LANCEMENT DU JEU BÉRÉNICE - VERSION COMPLÈTE"
echo "=============================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Vérifier l'état des services
echo -e "\n${YELLOW}📊 Vérification des services...${NC}"

# Fonction pour vérifier un service
check_service() {
    local service=$1
    local port=$2
    local name=$3
    
    if lsof -i :$port > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ $name ($port) - Actif${NC}"
        return 0
    else
        echo -e "  ${RED}❌ $name ($port) - Inactif${NC}"
        return 1
    fi
}

# Vérifier les services essentiels
JAVA_OK=false
RUST_OK=false
VECTOR_OK=false

check_service "java" 8082 "Java API" && JAVA_OK=true
check_service "rust" 3001 "Rust Engine" && RUST_OK=true
check_service "vector" 5000 "Vector DB" && VECTOR_OK=true

# Si des services manquent, proposer de les démarrer
if ! $JAVA_OK || ! $RUST_OK || ! $VECTOR_OK; then
    echo -e "\n${YELLOW}⚠️  Des services sont inactifs!${NC}"
    echo "Voulez-vous les démarrer? (o/n)"
    read -r response
    
    if [[ "$response" == "o" ]]; then
        echo -e "\n${YELLOW}🚀 Démarrage des services...${NC}"
        
        # Démarrer les services manquants
        if ! $JAVA_OK; then
            echo "  Démarrage Java API..."
            cd backends/java && ./mvnw spring-boot:run > /tmp/java.log 2>&1 &
            sleep 5
        fi
        
        if ! $RUST_OK; then
            echo "  Démarrage Rust Engine..."
            cd backends/rust && cargo run --release > /tmp/rust.log 2>&1 &
            sleep 3
        fi
        
        if ! $VECTOR_OK; then
            echo "  Démarrage Vector DB..."
            cd backends/python && python3 vector_server.py > /tmp/vector.log 2>&1 &
            sleep 2
        fi
        
        # Revérifier
        echo -e "\n${YELLOW}📊 Nouvelle vérification...${NC}"
        check_service "java" 8082 "Java API"
        check_service "rust" 3001 "Rust Engine"
        check_service "vector" 5000 "Vector DB"
    fi
fi

# Ouvrir le jeu
echo -e "\n${GREEN}🎮 Ouverture du jeu...${NC}"
echo "================================"
echo "📋 CONTRÔLES:"
echo "  • Flèches/WASD : Déplacement"
echo "  • 1-5 : Utiliser les cartes"
echo "  • F11 : Afficher indicateur Phi"
echo "  • F12 : Console debug"
echo ""
echo "🎯 OBJECTIF:"
echo "  • Collecter 3 cristaux 💎"
echo "  • Atteindre la sortie 🚪"
echo "  • Bonus si Phi = 1.618!"
echo "================================"

# Ouvrir dans le navigateur
open BERENICE_REAL_GAME.html

echo -e "\n${GREEN}✨ Bon jeu Bérénice! ✨${NC}"
echo ""
echo "💡 Astuce: Utilise la carte 🔮 pour stabiliser ton Phi!"
