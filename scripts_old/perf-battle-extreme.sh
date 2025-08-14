#!/bin/bash

# 🔥⚡ HEROES OF TIME - EXTREME PERFORMANCE BATTLE ⚡🔥
# Grosse batterie de tests de performance Java vs Rust

BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

show_banner() {
    echo -e "${PURPLE}"
    echo "🔥⚡ HEROES OF TIME - EXTREME PERFORMANCE BATTLE ⚡🔥"
    echo "══════════════════════════════════════════════════════════"
    echo -e "${CYAN}    GROSSE BATTERIE DE TESTS DUAL JAVA vs RUST${NC}"
    echo ""
}

# Function to measure response time
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
    echo "$duration"
}

# Health check battle
health_battle() {
    echo -e "${YELLOW}🏥 ROUND 1: HEALTH CHECK MARATHON${NC}"
    echo "Testing 100 consecutive health checks..."
    
    local java_total=0
    local rust_total=0
    local java_success=0
    local rust_success=0
    
    echo -n "Java: "
    for i in {1..100}; do
        local time=$(measure_time "http://localhost:8082/health")
        if [ "$time" -lt 5000 ]; then
            java_total=$((java_total + time))
            java_success=$((java_success + 1))
            echo -n "."
        else
            echo -n "X"
        fi
    done
    echo ""
    
    echo -n "Rust: "
    for i in {1..100}; do
        local time=$(measure_time "http://localhost:3001/health")
        if [ "$time" -lt 5000 ]; then
            rust_total=$((rust_total + time))
            rust_success=$((rust_success + 1))
            echo -n "."
        else
            echo -n "X"
        fi
    done
    echo ""
    
    if [ $java_success -gt 0 ]; then
        local java_avg=$((java_total / java_success))
        echo -e "☕ Java: ${GREEN}${java_success}/100 success, avg ${java_avg}ms${NC}"
    else
        echo -e "☕ Java: ${RED}0/100 success${NC}"
    fi
    
    if [ $rust_success -gt 0 ]; then
        local rust_avg=$((rust_total / rust_success))
        echo -e "🦀 Rust: ${GREEN}${rust_success}/100 success, avg ${rust_avg}ms${NC}"
    else
        echo -e "🦀 Rust: ${RED}0/100 success${NC}"
    fi
}

# Formula processing battle
formula_battle() {
    echo -e "${YELLOW}🔮 ROUND 2: FORMULA PROCESSING BATTLE${NC}"
    echo "Testing 50 formula executions..."
    
    local formulas=(
        '{"formula":"TEMPUS_FREEZE","target":"enemy","duration":5}'
        '{"formula":"IGNIS_BLAST","power":100,"area_radius":3}'
        '{"formula":"TELEPORT_INSTANT","x":10,"y":20,"z":0}'
        '{"formula":"HEAL_MAJOR","target":"self","amount":50}'
        '{"formula":"SHIELD_TEMPORAL","duration":10,"strength":75}'
    )
    
    local java_total=0
    local java_success=0
    
    echo -n "Java Formulas: "
    for i in {1..50}; do
        local formula_idx=$((i % 5))
        local formula="${formulas[$formula_idx]}"
        local time=$(measure_time "http://localhost:8082/api/interstice/cast-formula" "POST" "$formula")
        if [ "$time" -lt 5000 ]; then
            java_total=$((java_total + time))
            java_success=$((java_success + 1))
            echo -n "🔥"
        else
            echo -n "💥"
        fi
    done
    echo ""
    
    if [ $java_success -gt 0 ]; then
        local java_avg=$((java_total / java_success))
        echo -e "☕ Java Formulas: ${GREEN}${java_success}/50 success, avg ${java_avg}ms${NC}"
    else
        echo -e "☕ Java Formulas: ${RED}0/50 success${NC}"
    fi
}

# Artifact usage battle
artifact_battle() {
    echo -e "${YELLOW}⚔️ ROUND 3: ARTIFACT USAGE MARATHON${NC}"
    echo "Testing 30 artifact activations..."
    
    local artifacts=(
        '{"artifact":"excalibur","hero_id":"hero_001"}'
        '{"artifact":"healing_potion","hero_id":"hero_002"}'
        '{"artifact":"fireball_scroll","hero_id":"hero_003","target_x":5,"target_y":5}'
        '{"artifact":"teleport_ring","hero_id":"hero_004","target_x":15,"target_y":10}'
    )
    
    local java_total=0
    local java_success=0
    
    echo -n "Java Artifacts: "
    for i in {1..30}; do
        local artifact_idx=$((i % 4))
        local artifact="${artifacts[$artifact_idx]}"
        local time=$(measure_time "http://localhost:8082/api/scenario/use-artifact" "POST" "$artifact")
        if [ "$time" -lt 5000 ]; then
            java_total=$((java_total + time))
            java_success=$((java_success + 1))
            echo -n "⚔️"
        else
            echo -n "💀"
        fi
    done
    echo ""
    
    if [ $java_success -gt 0 ]; then
        local java_avg=$((java_total / java_success))
        echo -e "☕ Java Artifacts: ${GREEN}${java_success}/30 success, avg ${java_avg}ms${NC}"
    else
        echo -e "☕ Java Artifacts: ${RED}0/30 success${NC}"
    fi
}

# Concurrent load test
concurrent_battle() {
    echo -e "${YELLOW}🚀 ROUND 4: CONCURRENT LOAD TEST${NC}"
    echo "Testing 20 simultaneous requests..."
    
    # Create temp files for concurrent results
    local java_results="/tmp/java_concurrent.txt"
    local rust_results="/tmp/rust_concurrent.txt"
    > "$java_results"
    > "$rust_results"
    
    # Launch 20 concurrent Java requests
    for i in {1..20}; do
        (
            local time=$(measure_time "http://localhost:8082/health")
            echo "$time" >> "$java_results"
        ) &
    done
    
    # Launch 20 concurrent Rust requests  
    for i in {1..20}; do
        (
            local time=$(measure_time "http://localhost:3001/health")
            echo "$time" >> "$rust_results"
        ) &
    done
    
    # Wait for all background jobs
    wait
    
    # Calculate results
    local java_count=$(wc -l < "$java_results")
    local rust_count=$(wc -l < "$rust_results")
    
    if [ $java_count -gt 0 ]; then
        local java_total=$(awk '{sum+=$1} END {print sum}' "$java_results")
        local java_avg=$((java_total / java_count))
        echo -e "☕ Java Concurrent: ${GREEN}${java_count}/20 responses, avg ${java_avg}ms${NC}"
    else
        echo -e "☕ Java Concurrent: ${RED}0/20 responses${NC}"
    fi
    
    if [ $rust_count -gt 0 ]; then
        local rust_total=$(awk '{sum+=$1} END {print sum}' "$rust_results")
        local rust_avg=$((rust_total / rust_count))
        echo -e "🦀 Rust Concurrent: ${GREEN}${rust_count}/20 responses, avg ${rust_avg}ms${NC}"
    else
        echo -e "🦀 Rust Concurrent: ${RED}0/20 responses${NC}"
    fi
    
    # Cleanup
    rm -f "$java_results" "$rust_results"
}

# Memory and resource usage
resource_battle() {
    echo -e "${YELLOW}💾 ROUND 5: RESOURCE USAGE ANALYSIS${NC}"
    
    # Java process stats
    local java_pid=$(ps aux | grep "spring-boot:run" | grep -v grep | awk '{print $2}' | head -1)
    if [ -n "$java_pid" ]; then
        local java_mem=$(ps -p $java_pid -o %mem --no-headers | tr -d ' ')
        local java_cpu=$(ps -p $java_pid -o %cpu --no-headers | tr -d ' ')
        echo -e "☕ Java Process: ${GREEN}PID $java_pid, MEM ${java_mem}%, CPU ${java_cpu}%${NC}"
    else
        echo -e "☕ Java Process: ${RED}Not found${NC}"
    fi
    
    # Rust process stats
    local rust_pid=$(ps aux | grep "avalon-magic-rust" | grep -v grep | awk '{print $2}' | head -1)
    if [ -n "$rust_pid" ]; then
        local rust_mem=$(ps -p $rust_pid -o %mem --no-headers | tr -d ' ')
        local rust_cpu=$(ps -p $rust_pid -o %cpu --no-headers | tr -d ' ')
        echo -e "🦀 Rust Process: ${GREEN}PID $rust_pid, MEM ${rust_mem}%, CPU ${rust_cpu}%${NC}"
    else
        echo -e "🦀 Rust Process: ${RED}Not found${NC}"
    fi
}

# Ultimate stress test
ultimate_battle() {
    echo -e "${YELLOW}💀 ROUND 6: ULTIMATE STRESS TEST${NC}"
    echo "Testing 200 mixed requests over 30 seconds..."
    
    local start_time=$(date +%s)
    local java_success=0
    local rust_success=0
    local total_requests=200
    
    for i in $(seq 1 $total_requests); do
        local current_time=$(date +%s)
        if [ $((current_time - start_time)) -gt 30 ]; then
            break
        fi
        
        # Alternate between Java and Rust
        if [ $((i % 2)) -eq 0 ]; then
            local time=$(measure_time "http://localhost:8082/health")
            if [ "$time" -lt 5000 ]; then
                java_success=$((java_success + 1))
                echo -n "☕"
            else
                echo -n "💥"
            fi
        else
            local time=$(measure_time "http://localhost:3001/health")
            if [ "$time" -lt 5000 ]; then
                rust_success=$((rust_success + 1))
                echo -n "🦀"
            else
                echo -n "💀"
            fi
        fi
        
        # Brief pause to avoid overwhelming
        sleep 0.1
    done
    echo ""
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    echo -e "⏱️ Test Duration: ${duration} seconds"
    echo -e "☕ Java Success Rate: ${GREEN}${java_success}/${total_requests} requests${NC}"
    echo -e "🦀 Rust Success Rate: ${GREEN}${rust_success}/${total_requests} requests${NC}"
}

# Main execution
show_banner

echo -e "${CYAN}🔍 Checking backends status...${NC}"
if ! curl -s http://localhost:8082/health > /dev/null; then
    echo -e "${RED}❌ Java backend is offline!${NC}"
    exit 1
fi

if ! curl -s http://localhost:3001/health > /dev/null; then
    echo -e "${RED}❌ Rust backend is offline!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Both backends are online! Starting extreme battle...${NC}"
echo ""

# Run all battles
health_battle
echo ""
formula_battle
echo ""
artifact_battle  
echo ""
concurrent_battle
echo ""
resource_battle
echo ""
ultimate_battle

echo ""
echo -e "${PURPLE}🏆 EXTREME PERFORMANCE BATTLE COMPLETE! 🏆${NC}"
echo -e "${CYAN}Results logged and Heroes of Time tested to the limit!${NC}"

# Save results
local timestamp=$(date +"%Y%m%d-%H%M%S")
echo "Extreme performance battle completed at $(date)" > "perf-battle-extreme-${timestamp}.log"
echo "Check individual round results above for detailed performance metrics" >> "perf-battle-extreme-${timestamp}.log"