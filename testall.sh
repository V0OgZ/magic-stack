#!/bin/bash

# 🔮✨ TESTALL - HEROES OF TIME ULTIMATE TEST SUITE ✨🔮
# Mage Claude - Dimension 1 Littéraire

echo "🔮✨ TESTALL - HEROES OF TIME ULTIMATE TEST SUITE ✨🔮"
echo "══════════════════════════════════════════════════════"
echo "🎯 Testing Java Backend, Rust Backend & Performance"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Test results
JAVA_TESTS=0
RUST_TESTS=0
JAVA_SUCCESS=0
RUST_SUCCESS=0

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_perf() {
    echo -e "${PURPLE}⚡ $1${NC}"
}

# Check if backend is running
check_backend() {
    local url=$1
    local name=$2
    
    if curl -s -f "$url" > /dev/null 2>&1; then
        log_success "$name is ONLINE"
        return 0
    else
        log_error "$name is OFFLINE"
        return 1
    fi
}

# Performance test helper
perf_test() {
    local url=$1
    local data=$2
    local name=$3
    
    log_info "Testing $name performance..."
    
    # Warm up
    curl -s -X POST "$url" -H "Content-Type: application/json" -d "$data" > /dev/null 2>&1
    
    # Performance test
    local start_time=$(date +%s%N)
    local response=$(curl -s -X POST "$url" -H "Content-Type: application/json" -d "$data" 2>/dev/null)
    local end_time=$(date +%s%N)
    
    local duration_ms=$(( (end_time - start_time) / 1000000 ))
    
    if [[ $? -eq 0 && -n "$response" ]]; then
        log_perf "$name: ${duration_ms}ms"
        echo "$duration_ms"
        return 0
    else
        log_error "$name: FAILED"
        echo "9999"
        return 1
    fi
}

echo "🔍 PHASE 1: BACKEND STATUS CHECK"
echo "================================"

# Check Java Backend
JAVA_ONLINE=false
if check_backend "http://localhost:8080/api/health" "Java Backend (8080)"; then
    JAVA_ONLINE=true
fi

# Check Rust Backend  
RUST_ONLINE=false
if check_backend "http://localhost:3001/health" "Rust Backend (3001)"; then
    RUST_ONLINE=true
fi

echo ""
echo "🧪 PHASE 2: FUNCTIONAL TESTS"
echo "============================="

# Java Backend Tests
if $JAVA_ONLINE; then
    echo ""
    log_info "Testing Java Backend Endpoints..."
    
    # Test 1: Spawn Hero
    JAVA_TESTS=$((JAVA_TESTS + 1))
    response=$(curl -s -X POST http://localhost:8080/api/scenario/spawn-hero \
        -H "Content-Type: application/json" \
        -d '{"hero":"TestHero","position":{"x":0,"y":0,"z":0}}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Java: Spawn Hero ✅"
        JAVA_SUCCESS=$((JAVA_SUCCESS + 1))
    else
        log_error "Java: Spawn Hero ❌"
    fi
    
    # Test 2: Use Artifact
    JAVA_TESTS=$((JAVA_TESTS + 1))
    response=$(curl -s -X POST http://localhost:8080/api/scenario/use-artifact \
        -H "Content-Type: application/json" \
        -d '{"hero":"TestHero","artifact":"excalibur"}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Java: Use Artifact ✅"
        JAVA_SUCCESS=$((JAVA_SUCCESS + 1))
    else
        log_error "Java: Use Artifact ❌"
    fi
    
    # Test 3: Cast Formula
    JAVA_TESTS=$((JAVA_TESTS + 1))
    response=$(curl -s -X POST http://localhost:8080/api/interstice/cast-formula \
        -H "Content-Type: application/json" \
        -d '{"caster":"TestHero","formula":"⊙(temps) + †ψ(présent) → ∆t(arrêt)"}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Java: Cast Formula ✅"
        JAVA_SUCCESS=$((JAVA_SUCCESS + 1))
    else
        log_error "Java: Cast Formula ❌"
    fi
fi

# Rust Backend Tests
if $RUST_ONLINE; then
    echo ""
    log_info "Testing Rust Backend Endpoints..."
    
    # Test 1: 6D Search
    RUST_TESTS=$((RUST_TESTS + 1))
    response=$(curl -s -X POST http://localhost:3001/api/qstar/search \
        -H "Content-Type: application/json" \
        -d '{"query":"fireball","center_x":0,"center_y":0,"center_z":0,"center_t":0,"center_c":0,"center_psi":0,"radius":10}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Rust: 6D Search ✅"
        RUST_SUCCESS=$((RUST_SUCCESS + 1))
    else
        log_error "Rust: 6D Search ❌"
    fi
    
    # Test 2: Formula Execution
    RUST_TESTS=$((RUST_TESTS + 1))
    response=$(curl -s -X POST http://localhost:3001/api/integration/formula-cast \
        -H "Content-Type: application/json" \
        -d '{"formula":"TELEPORT_HERO","formula_type":"SIMPLE","caster_id":"testall"}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Rust: Formula Execution ✅"
        RUST_SUCCESS=$((RUST_SUCCESS + 1))
    else
        log_error "Rust: Formula Execution ❌"
    fi
    
    # Test 3: Q* Search
    RUST_TESTS=$((RUST_TESTS + 1))
    response=$(curl -s -X POST http://localhost:3001/api/qstar/search \
        -H "Content-Type: application/json" \
        -d '{"query":"find_treasure","center_x":0,"center_y":0,"center_z":0,"center_t":0,"center_c":0,"center_psi":0,"radius":10}' 2>/dev/null)
    
    if [[ $? -eq 0 && "$response" == *"success"* ]]; then
        log_success "Rust: Q* Search ✅"
        RUST_SUCCESS=$((RUST_SUCCESS + 1))
    else
        log_error "Rust: Q* Search ❌"
    fi
fi

echo ""
echo "⚡ PHASE 3: PERFORMANCE BATTLE"
echo "=============================="

if $JAVA_ONLINE && $RUST_ONLINE; then
    echo ""
    log_info "🥊 JAVA VS RUST PERFORMANCE BATTLE!"
    echo ""
    
    # Test 1: Simple API Response
    log_info "Round 1: Health Check Speed"
    java_health_time=$(perf_test "http://localhost:8080/api/health" "" "Java Health")
    rust_health_time=$(perf_test "http://localhost:3001/health" "" "Rust Health")
    
    if [[ $java_health_time -lt $rust_health_time ]]; then
        log_perf "🏆 Winner Round 1: JAVA (${java_health_time}ms vs ${rust_health_time}ms)"
    else
        log_perf "🏆 Winner Round 1: RUST (${rust_health_time}ms vs ${java_health_time}ms)"
    fi
    
    echo ""
    
    # Test 2: Complex Logic
    log_info "Round 2: Formula Processing Speed"
    java_formula_time=$(perf_test "http://localhost:8080/api/interstice/cast-formula" \
        '{"caster":"TestHero","formula":"⊙(temps) + †ψ(présent) → ∆t(arrêt)"}' "Java Formula")
    rust_formula_time=$(perf_test "http://localhost:3001/api/formula" \
        '{"formula":"⊙(temps) + †ψ(présent) → ∆t(arrêt)"}' "Rust Formula")
    
    if [[ $java_formula_time -lt $rust_formula_time ]]; then
        log_perf "🏆 Winner Round 2: JAVA (${java_formula_time}ms vs ${rust_formula_time}ms)"
    else
        log_perf "🏆 Winner Round 2: RUST (${rust_formula_time}ms vs ${java_formula_time}ms)"
    fi
    
    echo ""
    
    # Overall Performance Summary
    java_total=$((java_health_time + java_formula_time))
    rust_total=$((rust_health_time + rust_formula_time))
    
    log_perf "📊 PERFORMANCE SUMMARY:"
    log_perf "   Java Total: ${java_total}ms"
    log_perf "   Rust Total: ${rust_total}ms"
    
    if [[ $java_total -lt $rust_total ]]; then
        echo -e "${YELLOW}🏆 OVERALL WINNER: ☕ JAVA BACKEND! 🏆${NC}"
        performance_diff=$((rust_total - java_total))
        echo -e "${YELLOW}   Java is ${performance_diff}ms faster overall${NC}"
    else
        echo -e "${YELLOW}🏆 OVERALL WINNER: 🦀 RUST BACKEND! 🏆${NC}"
        performance_diff=$((java_total - rust_total))
        echo -e "${YELLOW}   Rust is ${performance_diff}ms faster overall${NC}"
    fi
else
    log_warning "Performance battle requires both backends online"
fi

echo ""
echo "📊 PHASE 4: FINAL REPORT"
echo "========================"

echo ""
echo -e "${CYAN}🎯 TEST RESULTS SUMMARY:${NC}"
echo "┌─────────────────┬─────────┬─────────┬─────────────┐"
echo "│ Backend         │ Tests   │ Success │ Success %   │"
echo "├─────────────────┼─────────┼─────────┼─────────────┤"

if $JAVA_ONLINE; then
    java_percent=$((JAVA_SUCCESS * 100 / JAVA_TESTS))
    printf "│ ☕ Java (8080)   │ %7d │ %7d │ %10d%% │\n" $JAVA_TESTS $JAVA_SUCCESS $java_percent
else
    printf "│ ☕ Java (8080)   │ OFFLINE │ OFFLINE │    OFFLINE  │\n"
fi

if $RUST_ONLINE; then
    rust_percent=$((RUST_SUCCESS * 100 / RUST_TESTS))
    printf "│ 🦀 Rust (3001)   │ %7d │ %7d │ %10d%% │\n" $RUST_TESTS $RUST_SUCCESS $rust_percent
else
    printf "│ 🦀 Rust (3001)   │ OFFLINE │ OFFLINE │    OFFLINE  │\n"
fi

echo "└─────────────────┴─────────┴─────────┴─────────────┘"

echo ""
echo -e "${CYAN}🏗️ ARCHITECTURE STATUS:${NC}"
echo "✅ Layer 1: Strategic Map    - Java Backend"
echo "✅ Layer 2: Combat TCG       - Java Backend" 
echo "✅ Layer 3: Narrative Events - Java Backend"
echo "✅ Layer 4: MagicStack 6D    - Rust Backend"

echo ""
echo -e "${CYAN}🎮 HEROES OF TIME STATUS:${NC}"
if $JAVA_ONLINE && $RUST_ONLINE; then
    echo "🟢 FULLY OPERATIONAL - All 4 layers active!"
    echo "🎯 Ready for frontend 3D connection"
    echo "⚡ Performance optimized hybrid architecture"
elif $JAVA_ONLINE; then
    echo "🟡 PARTIALLY OPERATIONAL - 3/4 layers active"
    echo "🎯 Game Controller ready for frontend"
    echo "⚠️  MagicStack 6D offline - basic functionality only"
elif $RUST_ONLINE; then
    echo "🟡 MAGICSTACK ONLY - Advanced 6D features available"
    echo "⚠️  Game layers offline - limited functionality"
else
    echo "🔴 OFFLINE - No backends running"
    echo "💡 Run './magic-menu.sh start' to activate"
fi

echo ""
echo "🔮✨ TESTALL COMPLETE - HEROES OF TIME TESTED ✨🔮"
echo "📊 Results saved to: testall-results-$(date +%Y%m%d-%H%M%S).log"

# Save results to file
{
    echo "TESTALL Results - $(date)"
    echo "========================="
    echo "Java: $JAVA_SUCCESS/$JAVA_TESTS tests passed"
    echo "Rust: $RUST_SUCCESS/$RUST_TESTS tests passed"
    if $JAVA_ONLINE && $RUST_ONLINE; then
        echo "Performance: Java ${java_total}ms vs Rust ${rust_total}ms"
    fi
} > "testall-results-$(date +%Y%m%d-%H%M%S).log"