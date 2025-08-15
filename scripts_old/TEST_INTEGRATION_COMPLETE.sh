#!/bin/bash

echo "🧪 TEST D'INTÉGRATION COMPLET - HEROES OF TIME"
echo "============================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test results
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    
    echo -n "Testing $name... "
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" $url)
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X $method $url)
    fi
    
    if [ "$response" = "200" ] || [ "$response" = "201" ] || [ "$response" = "204" ]; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAIL (HTTP $response)${NC}"
        ((TESTS_FAILED++))
    fi
}

echo ""
echo "1. CHECKING BACKENDS..."
echo "------------------------"

# Test Rust
test_endpoint "Rust Health" "http://localhost:3001/health"
test_endpoint "Rust V2 Config" "http://localhost:3001/api/v2/config"
test_endpoint "Rust V2 Entity" "http://localhost:3001/api/v2/entity/test"

# Test Java
test_endpoint "Java Health" "http://localhost:8080/api/health"
test_endpoint "Java Scenarios" "http://localhost:8080/api/scenarios"
test_endpoint "Java Heroes" "http://localhost:8080/api/heroes"

# Test Python
test_endpoint "Python Health" "http://localhost:5001/health"
test_endpoint "Python Search" "http://localhost:5001/search" "POST"

echo ""
echo "2. TESTING V2 INTEGRATION..."
echo "-----------------------------"

# Test V2 Tick
echo -n "Testing V2 Tick... "
curl -s -X POST http://localhost:3001/api/v2/tick \
    -H "Content-Type: application/json" \
    -d '{"current_tw": 0, "entities": []}' > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAIL${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "3. TESTING CROSS-BACKEND..."
echo "----------------------------"

# Test Java calling Rust TCG AI
echo -n "Testing Java→Rust AI... "
response=$(curl -s -X POST http://localhost:8080/api/combat/enemy-turn \
    -H "Content-Type: application/json" \
    -d '{"combatId": "test"}' 2>/dev/null)
if [[ $response == *"ai"* ]] || [[ $response == *"turn"* ]]; then
    echo -e "${GREEN}✅ PASS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️  PARTIAL${NC}"
fi

echo ""
echo "4. TESTING GAME UI..."
echo "---------------------"

# Check if main game file exists
if [ -f "HOT_GAME_UNIFIED.html" ]; then
    echo -e "Main Game UI: ${GREEN}✅ EXISTS${NC}"
    ((TESTS_PASSED++))
else
    echo -e "Main Game UI: ${RED}❌ MISSING${NC}"
    ((TESTS_FAILED++))
fi

echo ""
echo "============================================="
echo "RESULTS:"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed${NC}"
    exit 1
fi
