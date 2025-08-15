#!/bin/bash
# Test SSH sans mot de passe
echo "🔑 Test de connexion SSH..."
ssh -i ~/.ssh/hot_magic_key root@191.101.2.178 "echo '✅ CONNEXION OK SANS MOT DE PASSE!'"
