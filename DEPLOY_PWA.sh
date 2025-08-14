#!/bin/bash

echo "========================================="
echo "DEPLOY PWA TO HEROESOFTIME.ONLINE"
echo "========================================="
echo ""
echo "Files to deploy:"
echo "  - manifest.json"
echo "  - sw.js"
echo "  - icons/icon-192.png"
echo "  - icons/icon-512.png"
echo ""
echo "Deploying to hot@heroesoftime.online:/opt/hot/app/"
echo ""

# Try deployment
rsync -avz manifest.json sw.js icons/ hot@heroesoftime.online:/opt/hot/app/

echo ""
echo "After deployment, update Caddy on VPS:"
echo "  sudo nano /etc/caddy/Caddyfile"
echo "  sudo systemctl restart caddy"
echo ""
echo "Then test:"
echo "  https://heroesoftime.online/manifest.json"
echo "  https://heroesoftime.online/sw.js"
