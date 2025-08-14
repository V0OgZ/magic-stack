#!/bin/bash

# SERVICE GUARDIAN - Auto-restart sans toucher aux assets
# Run: ./service_guardian.sh &

while true; do
    # Check CORS server
    if ! lsof -i :8000 > /dev/null 2>&1; then
        echo "⚠️ CORS down - Restarting..."
        python3 cors_server.py 8000 > /dev/null 2>&1 &
        echo "✅ CORS restarted on 8000"
    fi
    
    # Check Java backend
    if ! lsof -i :8082 > /dev/null 2>&1; then
        echo "⚠️ Java down - Restarting..."
        cd backends/java && java -jar target/*.jar > /dev/null 2>&1 &
        cd ../..
        echo "✅ Java restarted on 8082"
    fi
    
    # DO NOT restart React - GPT manages it
    
    # Sleep 30 seconds before next check
    sleep 30
done
