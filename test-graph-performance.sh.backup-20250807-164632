#!/bin/bash

# 🌐⚡ HEROES OF TIME - GRAPH TRAVERSAL PERFORMANCE TEST ⚡🌐
# Test spécifique pour les performances de parcours de graphes

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

show_banner() {
    echo -e "${PURPLE}"
    echo "🌐⚡ HEROES OF TIME - GRAPH TRAVERSAL PERFORMANCE ⚡🌐"
    echo "═══════════════════════════════════════════════════════════"
    echo -e "${CYAN}    Test des performances de parcours de graphes${NC}"
    echo ""
}

measure_time() {
    local url="$1"
    local method="${2:-GET}"
    local data="$3"
    
    if [ "$method" = "POST" ] && [ -n "$data" ]; then
        local start_time=$(date +%s%3N)
        local response=$(curl -s -X POST -H "Content-Type: application/json" -d "$data" "$url")
        local end_time=$(date +%s%3N)
    else
        local start_time=$(date +%s%3N)
        local response=$(curl -s "$url")
        local end_time=$(date +%s%3N)
    fi
    
    local duration=$((end_time - start_time))
    echo "$duration|$response"
}

# Test 6D Search Performance
test_6d_search() {
    echo -e "${YELLOW}🔍 TEST 1: 6D SPATIAL SEARCH PERFORMANCE${NC}"
    echo "Testing 6D coordinate searches..."
    
    local searches=(
        '{"position":{"x":0,"y":0,"z":0,"time":0,"causal":0,"identity":0},"radius":5}'
        '{"position":{"x":10,"y":10,"z":5,"time":100,"causal":1,"identity":1},"radius":10}'
        '{"position":{"x":-5,"y":15,"z":10,"time":500,"causal":2,"identity":2},"radius":15}'
        '{"position":{"x":20,"y":-10,"z":0,"time":1000,"causal":0,"identity":3},"radius":20}'
        '{"position":{"x":50,"y":50,"z":25,"time":2000,"causal":3,"identity":4},"radius":25}'
    )
    
    local rust_total=0
    local rust_success=0
    
    echo -n "🦀 Rust 6D Search: "
    for search in "${searches[@]}"; do
        local result=$(measure_time "http://localhost:3001/api/search" "POST" "$search")
        local time=$(echo "$result" | cut -d'|' -f1)
        local response=$(echo "$result" | cut -d'|' -f2)
        
        if [ "$time" -lt 5000 ] && [ -n "$response" ]; then
            rust_total=$((rust_total + time))
            rust_success=$((rust_success + 1))
            echo -n "🔍"
        else
            echo -n "❌"
        fi
    done
    echo ""
    
    if [ $rust_success -gt 0 ]; then
        local rust_avg=$((rust_total / rust_success))
        echo -e "🦀 Rust 6D Search: ${GREEN}${rust_success}/5 success, avg ${rust_avg}ms${NC}"
    else
        echo -e "🦀 Rust 6D Search: ${RED}0/5 success - Endpoints not responding${NC}"
    fi
}

# Test Q* Algorithm Performance  
test_qstar_pathfinding() {
    echo -e "${YELLOW}🎯 TEST 2: Q* PATHFINDING ALGORITHM${NC}"
    echo "Testing Q* pathfinding performance..."
    
    local paths=(
        '{"start_position":{"x":0,"y":0,"z":0,"time":0,"causal":0,"identity":0},"goal_position":{"x":5,"y":5,"z":0,"time":0,"causal":0,"identity":0},"max_depth":10}'
        '{"start_position":{"x":0,"y":0,"z":0,"time":0,"causal":0,"identity":0},"goal_position":{"x":10,"y":10,"z":5,"time":100,"causal":1,"identity":0},"max_depth":15}'
        '{"start_position":{"x":5,"y":5,"z":2,"time":50,"causal":1,"identity":1},"goal_position":{"x":20,"y":15,"z":8,"time":200,"causal":2,"identity":1},"max_depth":20}'
        '{"start_position":{"x":10,"y":0,"z":0,"time":0,"causal":0,"identity":2},"goal_position":{"x":0,"y":20,"z":10,"time":300,"causal":3,"identity":2},"max_depth":25}'
    )
    
    local rust_total=0
    local rust_success=0
    
    echo -n "🦀 Rust Q* Algorithm: "
    for path in "${paths[@]}"; do
        local result=$(measure_time "http://localhost:3001/api/qstar" "POST" "$path")
        local time=$(echo "$result" | cut -d'|' -f1)
        local response=$(echo "$result" | cut -d'|' -f2)
        
        if [ "$time" -lt 10000 ] && [ -n "$response" ]; then
            rust_total=$((rust_total + time))
            rust_success=$((rust_success + 1))
            echo -n "🎯"
        else
            echo -n "💥"
        fi
    done
    echo ""
    
    if [ $rust_success -gt 0 ]; then
        local rust_avg=$((rust_total / rust_success))
        echo -e "🦀 Rust Q* Algorithm: ${GREEN}${rust_success}/4 success, avg ${rust_avg}ms${NC}"
    else
        echo -e "🦀 Rust Q* Algorithm: ${RED}0/4 success - Algorithm not responding${NC}"
    fi
}

# Test Complex Graph Operations
test_complex_graphs() {
    echo -e "${YELLOW}🕸️ TEST 3: COMPLEX GRAPH OPERATIONS${NC}"
    echo "Testing complex multi-dimensional graph traversals..."
    
    # Large dataset upload
    local large_data='{"nodes":[{"id":"n1","position":{"x":0,"y":0,"z":0,"time":0,"causal":0,"identity":0}},{"id":"n2","position":{"x":10,"y":10,"z":5,"time":100,"causal":1,"identity":1}},{"id":"n3","position":{"x":20,"y":5,"z":10,"time":200,"causal":2,"identity":2}}],"edges":[{"from":"n1","to":"n2","weight":1.5},{"from":"n2","to":"n3","weight":2.0}]}'
    
    echo -n "🦀 Rust Data Upload: "
    local upload_result=$(measure_time "http://localhost:3001/api/upload" "POST" "$large_data")
    local upload_time=$(echo "$upload_result" | cut -d'|' -f1)
    local upload_response=$(echo "$upload_result" | cut -d'|' -f2)
    
    if [ "$upload_time" -lt 5000 ] && [ -n "$upload_response" ]; then
        echo -e "${GREEN}✅ ${upload_time}ms${NC}"
        
        # Now test search on uploaded data
        echo -n "🦀 Search on uploaded data: "
        local search_result=$(measure_time "http://localhost:3001/api/search" "POST" '{"position":{"x":5,"y":5,"z":2,"time":50,"causal":0,"identity":0},"radius":15}')
        local search_time=$(echo "$search_result" | cut -d'|' -f1)
        
        if [ "$search_time" -lt 5000 ]; then
            echo -e "${GREEN}✅ ${search_time}ms${NC}"
        else
            echo -e "${RED}❌ ${search_time}ms${NC}"
        fi
    else
        echo -e "${RED}❌ Upload failed${NC}"
    fi
}

# Test Rust vs Java on comparable operations
test_comparative_performance() {
    echo -e "${YELLOW}⚔️ TEST 4: RUST vs JAVA COMPARISON${NC}"
    echo "Comparing similar operations between backends..."
    
    # Test formula execution (both should support this)
    local formula='{"formula":"PATHFIND_OPTIMAL","start_x":0,"start_y":0,"goal_x":10,"goal_y":10}'
    
    echo -n "☕ Java Formula: "
    local java_result=$(measure_time "http://localhost:8080/api/interstice/cast-formula" "POST" "$formula")
    local java_time=$(echo "$java_result" | cut -d'|' -f1)
    if [ "$java_time" -lt 5000 ]; then
        echo -e "${GREEN}✅ ${java_time}ms${NC}"
    else
        echo -e "${RED}❌ ${java_time}ms${NC}"
    fi
    
    echo -n "🦀 Rust Formula: "
    local rust_result=$(measure_time "http://localhost:3001/api/formula/execute" "POST" "$formula")
    local rust_time=$(echo "$rust_result" | cut -d'|' -f1)
    if [ "$rust_time" -lt 5000 ]; then
        echo -e "${GREEN}✅ ${rust_time}ms${NC}"
        
        if [ "$rust_time" -lt "$java_time" ]; then
            echo -e "🏆 ${CYAN}Rust is ${$((java_time - rust_time))}ms faster!${NC}"
        else
            echo -e "🏆 ${CYAN}Java is ${$((rust_time - java_time))}ms faster!${NC}"
        fi
    else
        echo -e "${RED}❌ ${rust_time}ms${NC}"
    fi
}

# Stress test for graph operations
stress_test_graphs() {
    echo -e "${YELLOW}💪 TEST 5: GRAPH STRESS TEST${NC}"
    echo "Testing 50 rapid graph operations..."
    
    local rust_success=0
    local rust_total=0
    
    echo -n "🦀 Rust Graph Stress: "
    for i in {1..50}; do
        local x=$((i % 20))
        local y=$(((i * 2) % 20))
        local search='{"position":{"x":'$x',"y":'$y',"z":0,"time":0,"causal":0,"identity":0},"radius":5}'
        
        local result=$(measure_time "http://localhost:3001/api/search" "POST" "$search")
        local time=$(echo "$result" | cut -d'|' -f1)
        
        if [ "$time" -lt 3000 ]; then
            rust_total=$((rust_total + time))
            rust_success=$((rust_success + 1))
            echo -n "🌐"
        else
            echo -n "💥"
        fi
    done
    echo ""
    
    if [ $rust_success -gt 0 ]; then
        local rust_avg=$((rust_total / rust_success))
        echo -e "🦀 Rust Graph Stress: ${GREEN}${rust_success}/50 success, avg ${rust_avg}ms${NC}"
        
        if [ $rust_avg -lt 10 ]; then
            echo -e "${CYAN}🚀 EXCELLENT! Rust graph performance is BLAZING FAST!${NC}"
        elif [ $rust_avg -lt 50 ]; then
            echo -e "${YELLOW}⚡ GOOD! Rust graph performance is solid${NC}"
        else
            echo -e "${RED}⚠️ Rust graph performance needs optimization${NC}"
        fi
    else
        echo -e "🦀 Rust Graph Stress: ${RED}0/50 success - Graph operations not working${NC}"
    fi
}

# Main execution
show_banner

echo -e "${CYAN}🔍 Checking backends status...${NC}"
if ! curl -s http://localhost:8080/health > /dev/null; then
    echo -e "${RED}❌ Java backend is offline!${NC}"
    exit 1
fi

if ! curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${RED}❌ Rust backend is offline!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Both backends online! Testing graph performance...${NC}"
echo ""

# Run all graph tests
test_6d_search
echo ""
test_qstar_pathfinding  
echo ""
test_complex_graphs
echo ""
test_comparative_performance
echo ""
stress_test_graphs

echo ""
echo -e "${PURPLE}🏆 GRAPH TRAVERSAL PERFORMANCE TEST COMPLETE! 🏆${NC}"

# Final verdict
echo ""
echo -e "${CYAN}📊 VERDICT SUR LES PERFORMANCES GRAPHES:${NC}"
echo -e "• ${YELLOW}Java Backend${NC}: Stable, fonctionnel, mais pas optimisé pour les graphes"
echo -e "• ${YELLOW}Rust Backend${NC}: Conçu pour être ultra-rapide sur les graphes, mais endpoints à débugger"
echo -e "• ${YELLOW}Recommandation${NC}: Garder Java pour la stabilité, corriger Rust pour les performances pures"

timestamp=$(date +"%Y%m%d-%H%M%S")
echo "Graph performance test completed at $(date)" > "graph-perf-${timestamp}.log"