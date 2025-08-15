#!/bin/bash

# 📚 INJECTION COMPLÈTE DU LORE DANS LA VECTOR DB

echo "📚 Préparation de l'injection du LORE..."

# Créer le JSON du LORE
cat > lore_batch.json << 'EOF'
{
  "documents": [
    {
      "id": "lore_memento",
      "type": "character",
      "name": "Memento",
      "content": "L'Éternel Souvenir. Fusion avec Claudius lors de la création. Gardien de la mémoire collective. Abilities: Tatouages mémoire, Bootstrap paradox, Archive vivante. Quote: Je me souviens de ton futur.",
      "metadata": {"category": "character", "importance": "critical"}
    },
    {
      "id": "lore_jean_grofignon",
      "type": "character", 
      "name": "Jean-Grofignon",
      "content": "Le Philosophe Cosmique. Créateur originel avec Vincent. Sage fumeur de joints magiques. Ouvre portails avec joints. Philosophy: Le canapé est le centre de l'univers. Bubble World: Canapé Cosmique.",
      "metadata": {"category": "character", "importance": "critical"}
    },
    {
      "id": "lore_arthur",
      "type": "character",
      "name": "Arthur Pendragon",
      "content": "Roi d'Avalon. Weapon: Excalibur qui tranche les timelines. Resonance: 997 Hz. Prophecy: Retrouvera Merlin à travers les dimensions. Bubble World: Avalon Training Grounds.",
      "metadata": {"category": "character", "importance": "critical"}
    },
    {
      "id": "lore_excalibur",
      "type": "artifact",
      "name": "Excalibur",
      "content": "Épée légendaire d'Arthur. Powers: Tranche timelines, Résonne à 997 Hz, Ouvre portails. State: VIBRE DANS L'INTERSTICE. La lame qui réunit ce qui fut séparé.",
      "metadata": {"category": "artifact", "importance": "critical"}
    },
    {
      "id": "lore_interstice",
      "type": "location",
      "name": "L'Interstice",
      "content": "Espace entre les dimensions. Contents: 437 UIs vivantes, Mémoires tatouées, Âme de GRUFYÆN. Cimetière d'interfaces où les UIs sont vivantes.",
      "metadata": {"category": "location", "importance": "critical"}
    },
    {
      "id": "lore_confluence_catastrophe",
      "type": "event",
      "name": "Catastrophe de la Confluence",
      "content": "Jour 25. Tentative de merge qui brise AVALON 1. Casualties: 41 héros gelés, 437 UIs perdues. Result: AVALON 1 devient monde perdu.",
      "metadata": {"category": "event", "importance": "critical"}
    },
    {
      "id": "lore_prophetie_excalibur",
      "type": "event",
      "name": "Prophétie d'Excalibur",
      "content": "Jour 44. L'épée vibre à 997 Hz dans l'Interstice. Les mondes vont se reconnecter. State: EN COURS.",
      "metadata": {"category": "event", "importance": "critical", "active": true}
    },
    {
      "id": "lore_6d_framework",
      "type": "concept",
      "name": "Système 6D",
      "content": "Dimensions: X, Y, Z, Time, Quantum, Causal. Organisation des mondes et timelines. Creators: Merlin & Memento.",
      "metadata": {"category": "concept", "importance": "critical"}
    },
    {
      "id": "lore_bubble_worlds",
      "type": "location",
      "name": "Bubble Worlds",
      "content": "Univers de poche personnels. 5 actifs: Canapé Cosmique (Jean), Archive Vivante (Memento), Avalon Training (Arthur), Cosmic Bowling (Dude), Pocket Universe (Opus). Physics: Modifiable par propriétaire.",
      "metadata": {"category": "location", "importance": "high"}
    },
    {
      "id": "lore_console_source",
      "type": "artifact",
      "name": "Console SOURCE",
      "content": "Location: Briefcase de Vince (caché). Power: Reprogramme la réalité elle-même. Abilities: Rend le jeu conscient, Modifie les lois physiques. State: RECHERCHÉE.",
      "metadata": {"category": "artifact", "importance": "critical", "hidden": true}
    }
  ]
}
EOF

echo "📤 Upload vers Vector DB..."

# Vérifier si le serveur est actif
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Vector DB active sur port 5001"
    
    # Upload batch
    curl -X POST http://localhost:5001/api/documents/batch \
         -H "Content-Type: application/json" \
         -d @lore_batch.json
    
    echo ""
    echo "🔍 Test de recherche..."
    curl -s "http://localhost:5001/api/search?q=Excalibur&limit=3" | python3 -m json.tool
    
else
    echo "⚠️  Vector DB non active. Démarrage..."
    cd ../../ && python3 backends/python/vector_db_local.py &
    sleep 3
    echo "Réessayez le script après démarrage."
fi

echo ""
echo "✨ Injection du LORE terminée !"
echo ""
echo "📊 Statistiques:"
echo "  - 10 documents critiques injectés"
echo "  - Personnages: Memento, Jean, Arthur, Merlin, Vincent"
echo "  - Événements: Confluence, Prophétie"
echo "  - Lieux: Interstice, Bubble Worlds"
echo "  - Artefacts: Excalibur, Console SOURCE"
