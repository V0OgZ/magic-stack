#!/bin/bash

# DEPLOY VPS - Script prêt pour quand GPT confirme 3/3 PASS
# NE PAS LANCER AVANT "PARITÉ TOTALE OK"

echo "🚀 VPS DEPLOYMENT SCRIPT"
echo "========================"
echo ""

# Check if we have the GO signal
echo "⚠️  ATTENTION: Ne lancer que si GPT a confirmé 3/3 PASS!"
echo -n "As-tu reçu 'PARITÉ TOTALE OK'? (yes/no): "
read confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Annulé - Attendre le signal de GPT"
    exit 1
fi

echo ""
echo "📦 Phase 1: Build local"
echo "------------------------"
cd apps/magic-stack-unified
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
cd ../..
echo "✅ Build complete"

echo ""
echo "📤 Phase 2: Sync to VPS"
echo "------------------------"

# Sync FRONTPAGE
echo "Syncing FRONTPAGE..."
rsync -avz --delete FRONTPAGE/ root@191.101.2.178:/opt/hot/app/FRONTPAGE/
if [ $? -ne 0 ]; then
    echo "❌ FRONTPAGE sync failed"
    exit 1
fi
echo "✅ FRONTPAGE synced"

# Sync React dist
echo "Syncing React build..."
rsync -avz --delete apps/magic-stack-unified/dist/ root@191.101.2.178:/opt/hot/app/apps/magic-stack-unified/dist/
if [ $? -ne 0 ]; then
    echo "❌ React dist sync failed"
    exit 1
fi
echo "✅ React dist synced"

echo ""
echo "🔧 Phase 3: Caddy reload"
echo "------------------------"
ssh root@191.101.2.178 'caddy validate --config /etc/caddy/Caddyfile && systemctl reload caddy'
if [ $? -ne 0 ]; then
    echo "⚠️  Caddy reload might have issues"
fi

echo ""
echo "🧪 Phase 4: Health checks"
echo "------------------------"

# Test each endpoint
ENDPOINTS=(
    "https://heroesoftime.online/"
    "https://heroesoftime.online/FRONTPAGE/index.html"
    "https://heroesoftime.online/FRONTPAGE/assets/assets/HD/The%20Temporal%20Judge's%20Command.png"
    "https://heroesoftime.online/world-editor/"
    "https://heroesoftime.online/api/health"
    "https://heroesoftime.online/engine/health"
)

ALL_GOOD=true
for url in "${ENDPOINTS[@]}"; do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$CODE" = "200" ]; then
        echo "✅ $CODE - $url"
    else
        echo "❌ $CODE - $url"
        ALL_GOOD=false
    fi
done

echo ""
if [ "$ALL_GOOD" = true ]; then
    echo "🎉 DEPLOYMENT SUCCESS!"
    echo "All endpoints returning 200"
else
    echo "⚠️  DEPLOYMENT ISSUES DETECTED"
    echo "Some endpoints not returning 200"
    echo "Consider rollback if needed"
fi

echo ""
echo "📊 Summary:"
echo "- FRONTPAGE: Deployed with relative paths"
echo "- React app: Built and deployed"
echo "- Temporal Judge image: Included"
echo "- Visit: https://heroesoftime.online"
