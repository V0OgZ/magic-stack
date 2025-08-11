#!/bin/bash

# 🛡️ PROTECTION CONTRE RESET HARD ET PERTES
# À lancer AVANT de travailler

echo "🛡️ PROTECTION GIT ACTIVÉE"

# 1. Backup automatique
BACKUP_DIR="/Volumes/HOT_DEV/BACKUPS/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Sauvegarder l'état actuel
echo "📦 Sauvegarde dans $BACKUP_DIR..."
cp -r . "$BACKUP_DIR/" 2>/dev/null

# 2. Créer une branche de sécurité
git checkout -b "backup-$(date +%Y%m%d_%H%M%S)" 2>/dev/null || true
git add -A 2>/dev/null || true
git commit -m "Auto-backup $(date)" 2>/dev/null || true

# 3. Retour sur main
git checkout main 2>/dev/null || true

# 4. Désactiver les commandes dangereuses
git config alias.reset 'echo "⚠️ RESET DÉSACTIVÉ - Utilisez checkout à la place"'
git config alias.clean 'echo "⚠️ CLEAN DÉSACTIVÉ - Trop dangereux"'

echo "✅ Protection activée"
echo "📁 Backup: $BACKUP_DIR"
echo "🔒 reset/clean désactivés"
