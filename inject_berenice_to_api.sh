#!/bin/bash

echo "🚀 Injection de Bérénice dans l'API Java..."

# Vérifier que l'API est up
if ! curl -s -f http://localhost:8082/api/health > /dev/null; then
    echo "❌ Java API n'est pas démarrée (port 8082)"
    echo "Lance d'abord: cd backends/java && mvn spring-boot:run"
    exit 1
fi

# Lire le JSON et l'adapter pour l'API
echo "📄 Lecture de heroes/berenice_hacker.json..."

# POST Bérénice à l'API
curl -X POST http://localhost:8082/api/heroes \
  -H "Content-Type: application/json" \
  -d '{
    "id": "berenice_temporalhacker",
    "name": "Bérénice",
    "icon": "👧",
    "class": "technomancer",
    "stats": {
      "attack": 4,
      "defense": 3,
      "power": 8,
      "knowledge": 9
    },
    "abilities": [
      "Time.sleep()",
      "Ctrl+Z Temporel",
      "Fork Reality",
      "SSH Tunnel",
      "Kernel Panic"
    ]
  }'

echo ""
echo "✅ Bérénice injectée!"
echo ""
echo "🔍 Vérification..."
curl -s http://localhost:8082/api/heroes/berenice_temporalhacker | python3 -m json.tool

echo ""
echo "💡 Pour voir tous les héros: curl http://localhost:8082/api/heroes"
