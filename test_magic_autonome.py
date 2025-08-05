#!/usr/bin/env python3
"""
Test de la Magic Stack Autonome
Pour L'OURS - JOUR 21
Par NEXUS
"""

import sys
import os

# Ajouter le chemin actuel au PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

print("🔮 === TEST MAGIC STACK AUTONOME ===")
print()

try:
    # Importer le core
    from magic_core import MagicCore
    print("✅ Import MagicCore réussi")
    
    # Créer une instance
    core = MagicCore()
    print("✅ MagicCore initialisé")
    
    # Tester le chargement du grimoire
    print("\n📚 Chargement du grimoire...")
    sorts_charges = core.charger_grimoire_complet()
    print(f"✅ {sorts_charges} sorts chargés")
    
    # Lister les sorts disponibles
    print("\n📜 Sorts disponibles:")
    sorts = list(core.sorts_charges.keys())
    for i, sort in enumerate(sorts[:10]):  # Afficher les 10 premiers
        print(f"  {i+1}. {sort}")
    if len(sorts) > 10:
        print(f"  ... et {len(sorts) - 10} autres sorts")
    
    # Tester l'interprétation d'une formule simple
    print("\n🧪 Test d'interprétation:")
    formule_test = "⊙ + Δt(5min) ⟶ ψ(heal)[player]"
    print(f"Formule: {formule_test}")
    
    # Compiler la formule (méthode disponible)
    resultat = core.compiler_formule(formule_test)
    print(f"Résultat compilation: {resultat}")
    
    # Test du système de contexte
    print("\n🌍 Contexte actuel:")
    print(f"  Dimension: {core.contexte_global['dimension']}")
    print(f"  Mage: {core.contexte_global['mage']}")
    print(f"  Timestamp: {core.contexte_global['timestamp']}")
    
    print("\n✅ TOUS LES TESTS PASSÉS !")
    print("La Magic Stack est opérationnelle et autonome.")
    
except ImportError as e:
    print(f"❌ Erreur d'import: {e}")
    print("Vérifier que magic_core.py est dans le même dossier")
    
except Exception as e:
    print(f"❌ Erreur lors des tests: {e}")
    print("Détails:", str(e))

print("\n" + "="*50)
print("Test terminé - Magic Stack Autonome")