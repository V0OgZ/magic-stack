#!/bin/bash

# 🚀 INSTALLATION DU SYSTÈME DE SYNC VPS
# Lance ce script sur le VPS pour installer l'auto-update

echo "📦 INSTALLATION VPS SAFE SYNC"
echo "============================="
echo ""

# 1. Copier le script de sync
echo "→ Installation du script de sync..."
cp VPS_SAFE_SYNC.sh /opt/hot/app/
chmod +x /opt/hot/app/VPS_SAFE_SYNC.sh

# 2. Créer le service systemd pour auto-update au boot
echo "→ Installation du service systemd..."
cp hot-autoupdate.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable hot-autoupdate.service

# 3. Créer un cron pour sync quotidien (3h du matin)
echo "→ Configuration du cron quotidien..."
cat > /etc/cron.d/hot-sync << 'EOF'
# Sync automatique Heroes of Time à 3h du matin
0 3 * * * root /opt/hot/app/VPS_SAFE_SYNC.sh >> /var/log/hot-sync.log 2>&1
EOF

# 4. Créer le fichier de log
touch /var/log/hot-sync.log
chmod 644 /var/log/hot-sync.log

echo ""
echo "✅ INSTALLATION TERMINÉE!"
echo ""
echo "Le VPS va maintenant:"
echo "1. Se synchroniser au démarrage"
echo "2. Se synchroniser chaque nuit à 3h"
echo "3. Préserver les configs spéciales"
echo ""
echo "Commandes utiles:"
echo "  systemctl status hot-autoupdate   # Voir le statut"
echo "  journalctl -u hot-autoupdate      # Voir les logs"
echo "  /opt/hot/app/VPS_SAFE_SYNC.sh     # Sync manuel"
echo "  tail -f /var/log/hot-sync.log     # Voir logs cron"
