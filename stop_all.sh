#!/bin/bash
echo "Arrêt de tous les services..."
kill 31994 32023 32046 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null
echo "✅ Tous les services arrêtés"
