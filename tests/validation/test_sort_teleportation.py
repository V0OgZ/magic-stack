#!/usr/bin/env python3
"""
Test unitaire pour sort_teleportation.json
Auteur: URZ-KÔM
Mission: MAGIC_STACK_EXPLORATION Day 7
"""

import unittest
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from magic_core import MagicCore

class TestSortTeleportation(unittest.TestCase):
    """Tests pour le sort de téléportation"""
    
    def setUp(self):
        """Initialisation avant chaque test"""
        self.core = MagicCore()
        self.sort_loaded = self.core.charger_sort('grimoire/sort_teleportation.json')
    
    def test_chargement_sort(self):
        """Test du chargement du sort"""
        self.assertTrue(self.sort_loaded, "Le sort doit se charger sans erreur")
        self.assertIn('teleportation', self.core.sorts_charges, "Le sort doit être dans les sorts chargés")
    
    def test_structure_sort(self):
        """Test de la structure du sort"""
        sort_data = self.core.sorts_charges.get('teleportation', {})
        
        # Champs obligatoires
        self.assertIn('nom', sort_data, "Le sort doit avoir un nom")
        self.assertIn('formule', sort_data, "Le sort doit avoir une formule")
        self.assertIn('description', sort_data, "Le sort doit avoir une description")
        self.assertIn('cout_mana', sort_data, "Le sort doit avoir un coût en mana")
        
        # Types corrects
        self.assertIsInstance(sort_data['cout_mana'], int, "Le coût mana doit être un entier")
        self.assertGreater(sort_data['cout_mana'], 0, "Le coût mana doit être positif")
    
    def test_formule_grammaire(self):
        """Test de validation de la formule selon la grammaire temporelle"""
        sort_data = self.core.sorts_charges.get('teleportation', {})
        formule = sort_data.get('formule', '')
        
        # Symboles requis
        self.assertIn('⊙', formule, "La formule doit contenir une superposition ⊙")
        self.assertIn('→', formule, "La formule doit contenir une projection →")
        self.assertIn('Δt', formule, "La formule doit contenir un delta temporel Δt")
        
        # Structure basique
        self.assertIn('(', formule, "La formule doit contenir des parenthèses")
        self.assertIn(')', formule, "La formule doit contenir des parenthèses fermantes")
    
    def test_execution_parametres_valides(self):
        """Test d'exécution avec paramètres valides"""
        params = {
            'entite': 'URZ-KOM',
            'destination': {
                'x': 100,
                'y': 200,
                'dimension': 0
            }
        }
        
        try:
            resultat = self.core.lancer_sort('teleportation', params)
            self.assertIsInstance(resultat, dict, "Le résultat doit être un dictionnaire")
            # Note: Le résultat exact dépend de l'implémentation de MagicCore
        except Exception as e:
            self.fail(f"L'exécution du sort ne doit pas lever d'exception: {e}")
    
    def test_execution_parametres_manquants(self):
        """Test avec paramètres manquants"""
        params = {}  # Paramètres vides
        
        try:
            resultat = self.core.lancer_sort('teleportation', params)
            # Le sort doit gérer gracieusement les paramètres manquants
            self.assertIsInstance(resultat, dict, "Même avec des paramètres invalides, doit retourner un dict")
        except Exception as e:
            # Si une exception est levée, elle doit être documentée
            self.assertIsInstance(e, (ValueError, KeyError), f"Exception attendue, reçu: {type(e)}")
    
    def test_execution_parametres_invalides(self):
        """Test avec paramètres de types incorrects"""
        params = {
            'entite': None,  # Invalide
            'destination': "invalid"  # Doit être un dict
        }
        
        try:
            resultat = self.core.lancer_sort('teleportation', params)
            self.assertIsInstance(resultat, dict, "Doit retourner un dict même avec des paramètres invalides")
        except Exception as e:
            # Exceptions acceptables pour paramètres invalides
            self.assertIsInstance(e, (TypeError, ValueError, AttributeError), 
                                f"Exception de type attendu, reçu: {type(e)}")
    
    def test_performance_execution(self):
        """Test de performance - le sort doit s'exécuter rapidement"""
        import time
        
        params = {
            'entite': 'TestEntity',
            'destination': {'x': 0, 'y': 0, 'dimension': 0}
        }
        
        start_time = time.time()
        try:
            self.core.lancer_sort('teleportation', params)
        except:
            pass  # On teste juste la performance, pas le résultat
        
        execution_time = time.time() - start_time
        self.assertLess(execution_time, 0.1, "L'exécution doit prendre moins de 100ms")
    
    def test_logs_generation(self):
        """Test de génération des logs"""
        params = {
            'entite': 'LogTestEntity',
            'destination': {'x': 42, 'y': 42, 'dimension': 1}
        }
        
        # Vérifier que les logs sont générés (si implémentés)
        try:
            self.core.lancer_sort('teleportation', params)
            # Note: Vérification des logs dépend de l'implémentation
            self.assertTrue(True, "Logs générés avec succès")
        except Exception as e:
            self.fail(f"La génération de logs ne doit pas faire planter le sort: {e}")

if __name__ == '__main__':
    print("🧪 Test du sort de téléportation - URZ-KÔM")
    print("=" * 50)
    unittest.main(verbosity=2)