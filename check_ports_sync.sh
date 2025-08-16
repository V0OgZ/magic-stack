#!/bin/bash

# 🔍 VÉRIFICATION SYNCHRONISATION PORTS MAC ↔ VPS
# ================================================

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🔍 VÉRIFICATION SYNCHRONISATION PORTS MAC ↔ VPS${NC}"
echo "=================================================="
echo ""

# Fonction pour tester un port local
check_local_port() {
    local port=$1
    nc -z localhost $port 2>/dev/null
}

# Fonction pour tester un port VPS
check_vps_port() {
    local port=$1
    ssh -i ~/.ssh/hot_vps_key -o ConnectTimeout=3 root@191.101.2.178 "nc -z localhost $port" 2>/dev/null
}

# Fonction pour tester une API locale
check_local_api() {
    local url=$1
    curl -s --connect-timeout 3 "$url" >/dev/null 2>&1
}

# Fonction pour tester une API VPS
check_vps_api() {
    local url=$1
    curl -s --connect-timeout 3 "$url" >/dev/null 2>&1
}

echo -e "${CYAN}⚙️ BACKENDS CORE (doivent être identiques)${NC}"
echo "--------------------------------------------"

# Rust Engine - 3001
echo -n "Rust Engine (3001):     "
if check_local_port 3001; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_port 3001; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

# Java Spring Boot - 8082
echo -n "Java Backend (8082):    "
if check_local_port 8082; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_port 8082; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

echo ""
echo -e "${CYAN}🤖 AI SERVICES (doivent être identiques)${NC}"
echo "----------------------------------------"

# Clippy LLM - 7777
echo -n "Clippy LLM (7777):      "
if check_local_port 7777; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_port 7777; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

# MCP Server - 9000
echo -n "MCP Server (9000):      "
if check_local_port 9000; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_port 9000; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

echo ""
echo -e "${CYAN}📊 VECTOR DB (différents par design)${NC}"
echo "------------------------------------"

# Vector DB Local - 5000
echo -n "Vector DB Local (5000): "
if check_local_port 5000; then
    echo -e "${GREEN}✅ Mac (dev)${NC}"
else
    echo -e "${RED}❌ Mac (dev)${NC}"
fi

# Vector DB VPS - 7500
echo -n "Vector DB Prod (7500):  "
if check_vps_port 7500; then
    echo -e "${GREEN}✅ VPS (prod)${NC}"
else
    echo -e "${RED}❌ VPS (prod)${NC}"
fi

echo ""
echo -e "${CYAN}🎨 FRONTEND (Mac uniquement)${NC}"
echo "----------------------------"

# World Editor - 5173
echo -n "World Editor (5173):    "
if check_local_port 5173; then
    echo -e "${GREEN}✅ Mac${NC}"
else
    echo -e "${YELLOW}⚪ Mac (dev only)${NC}"
fi

# Unified App - 5176
echo -n "Unified App (5176):     "
if check_local_port 5176; then
    echo -e "${GREEN}✅ Mac${NC}"
else
    echo -e "${YELLOW}⚪ Mac (dev only)${NC}"
fi

# HTML Server - 8000
echo -n "HTML Server (8000):     "
if check_local_port 8000; then
    echo -e "${GREEN}✅ Mac${NC}"
else
    echo -e "${YELLOW}⚪ Mac (dev only)${NC}"
fi

echo ""
echo -e "${CYAN}🌐 TESTS API${NC}"
echo "-------------"

# Test API Java
echo -n "Java API Health:        "
if check_local_api "http://localhost:8082/api/health"; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_api "https://heroesoftime.online/api/health"; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

# Test API MCP
echo -n "MCP API Health:         "
if check_local_api "http://localhost:9000/mcp/health"; then
    echo -n -e "${GREEN}✅ Mac${NC} "
else
    echo -n -e "${RED}❌ Mac${NC} "
fi

if check_vps_api "https://heroesoftime.online/mcp/health"; then
    echo -e "${GREEN}✅ VPS${NC}"
else
    echo -e "${RED}❌ VPS${NC}"
fi

echo ""
echo -e "${BLUE}📋 RÉSUMÉ${NC}"
echo "----------"
echo -e "${GREEN}✅${NC} = Service actif"
echo -e "${RED}❌${NC} = Service inactif"  
echo -e "${YELLOW}⚪${NC} = Service dev uniquement"
echo ""
echo "Pour démarrer les services Mac: ${CYAN}./go start${NC}"
echo "Pour vérifier le VPS: ${CYAN}./go vps-status${NC}"