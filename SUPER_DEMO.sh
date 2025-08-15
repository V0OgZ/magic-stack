#!/bin/bash

clear

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║     🎮 SUPER DÉMO VISUELLE BÉRÉNICE 🎮      ║"
echo "  ║         AVEC EFFETS SPÉCIAUX !              ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""
echo "  Cette démo AUTOMATIQUE va montrer:"
echo ""
echo "  📍 NIVEAU 0: Terminal Hacker"
echo "     └─ Mode texte, commandes bash"
echo ""
echo "  📍 NIVEAU 1: Prairie Magique" 
echo "     └─ Avatar: ber0.png (cartoon)"
echo ""
echo "  📍 NIVEAU 2: Serveur Quantique"
echo "     └─ Avatar: ber1.png (hacker)"
echo ""
echo "  📍 NIVEAU 3: Combat vs GROEKEN"
echo "     └─ Avatar: ber2.png (cyberpunk)"
echo ""
echo "  ⚡ Avec animations et effets visuels!"
echo ""
echo "  Appuie sur ENTER pour lancer..."
read

# Installer playwright si nécessaire
if ! npm list playwright >/dev/null 2>&1; then
    echo "📦 Installation de Playwright..."
    npm install playwright --no-save
fi

echo ""
echo "🚀 LANCEMENT..."
echo ""

# Lancer la super démo
node test_berenice_super_visible.js

echo ""
echo "✨ Démo terminée avec succès!"
echo ""
