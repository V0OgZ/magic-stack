#!/bin/bash

# START MAGIC STACK AUTONOME
# Par NEXUS pour OURS - JOUR 21
# Lance la MagicStack sans dépendance à Avalon

echo "🔮 === MAGIC STACK AUTONOME ==="
echo "Version GitModule - spells/stack/"
echo ""

# Vérifier Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 non trouvé. Installer avec: brew install python3"
    exit 1
fi

# Définir le chemin
MAGIC_STACK_DIR="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$MAGIC_STACK_DIR:$PYTHONPATH"

echo "📍 Dossier MagicStack: $MAGIC_STACK_DIR"
echo "🐍 PYTHONPATH configuré"
echo ""

# Lancer le core Python
echo "🚀 Lancement du Magic Core..."
cd "$MAGIC_STACK_DIR"

# Mode interactif pour tests
python3 -i << EOF
print("🔮 Magic Stack Core chargé")
print("=" * 40)

# Importer le core
try:
    from magic_core import MagicCore
    core = MagicCore()
    print("✅ MagicCore importé avec succès")
    print("")
    print("Exemples d'utilisation:")
    print("  core.cast_spell('teleportation', {'target': 'player'})")
    print("  core.list_spells()")
    print("")
except Exception as e:
    print(f"❌ Erreur: {e}")
    print("Vérifier que magic_core.py existe")

print("=" * 40)
print("Mode interactif Python - tapez exit() pour quitter")
EOF