#!/usr/bin/env python3
"""
🔮 TEST VISION COMPLÈTE - HEROES OF TIME
Mage Claude - Dimension 1 Littéraire

Test qui démontre TOUTE la vision:
- 🗺️ Carte stratégique (navigation)
- 🌀 Combat TCG (résolution)  
- 🧠 Interstice narratif (choix)
- 🔧 MagicStack (formules)
- ⏰ Temps différentiel (causalité)
"""

import requests
import json
import time
from datetime import datetime, timedelta

class HeroesOfTimeVisionTest:
    def __init__(self):
        self.rust_backend = "http://localhost:3001"
        self.java_backend = "http://localhost:8080"
        self.test_results = []
        
    def log_step(self, step, success, details):
        """📝 Log chaque étape du test"""
        status = "✅" if success else "❌"
        print(f"{status} {step}: {details}")
        self.test_results.append({
            "step": step,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
    
    def test_layer_1_strategic_map(self):
        """🗺️ COUCHE 1: Carte stratégique - Navigation héros"""
        print("\n🗺️ === TEST COUCHE 1: CARTE STRATÉGIQUE ===")
        
        # Créer un héros avec position initiale
        hero_data = {
            "name": "Jean-Grofignon",
            "position": {"x": 0, "y": 0, "z": 0},
            "timeline": 1,
            "speed": 2,
            "actions_per_day": 8
        }
        
        try:
            # Spawn héros
            response = requests.post(f"{self.java_backend}/api/scenario/run/spawn-hero", 
                                   json=hero_data, timeout=5)
            if response.status_code == 200:
                self.log_step("Spawn Héros", True, f"Jean-Grofignon spawné en (0,0)")
                
                # Déplacement stratégique
                move_data = {"hero_id": "jean-grofignon", "target": {"x": 5, "y": 3}}
                move_response = requests.post(f"{self.java_backend}/api/scenario/move-hero", 
                                            json=move_data, timeout=5)
                
                if move_response.status_code == 200:
                    self.log_step("Déplacement Stratégique", True, "Héros déplacé vers (5,3)")
                    return True
                    
        except Exception as e:
            self.log_step("Couche Stratégique", False, f"Erreur: {e}")
            return False
    
    def test_layer_2_tcg_combat(self):
        """🌀 COUCHE 2: Combat TCG - Résolution d'événements"""
        print("\n🌀 === TEST COUCHE 2: COMBAT TCG ===")
        
        # Déclencher un combat
        combat_data = {
            "hero": "jean-grofignon",
            "enemy": "dragon-rouge",
            "context": "exploration",
            "cards_available": ["fireball", "shield", "heal"]
        }
        
        try:
            response = requests.post(f"{self.java_backend}/api/scenario/start-combat", 
                                   json=combat_data, timeout=5)
            if response.status_code == 200:
                result = response.json()
                self.log_step("Déclenchement Combat", True, f"Combat vs {combat_data['enemy']}")
                
                # Jouer une carte
                card_play = {
                    "combat_id": result.get("combat_id", "test"),
                    "card": "fireball",
                    "target": "dragon-rouge"
                }
                
                card_response = requests.post(f"{self.java_backend}/api/scenario/play-card", 
                                            json=card_play, timeout=5)
                
                if card_response.status_code == 200:
                    self.log_step("Jeu de Carte", True, "Fireball lancée sur dragon")
                    return True
                    
        except Exception as e:
            self.log_step("Combat TCG", False, f"Erreur: {e}")
            return False
    
    def test_layer_3_narrative_interstice(self):
        """🧠 COUCHE 3: Interstice narratif - Choix et branches"""
        print("\n🧠 === TEST COUCHE 3: INTERSTICE NARRATIF ===")
        
        # Déclencher un événement narratif
        narrative_data = {
            "hero": "jean-grofignon",
            "event_type": "temporal_anomaly",
            "location": {"x": 5, "y": 3},
            "choices": [
                "Investiguer l'anomalie",
                "Contourner prudemment", 
                "Utiliser l'Œil de Wiener"
            ]
        }
        
        try:
            response = requests.post(f"{self.java_backend}/api/scenario/narrative-event", 
                                   json=narrative_data, timeout=5)
            if response.status_code == 200:
                self.log_step("Événement Narratif", True, "Anomalie temporelle détectée")
                
                # Faire un choix
                choice_data = {
                    "event_id": "temporal_anomaly_001",
                    "choice": "Utiliser l'Œil de Wiener",
                    "hero": "jean-grofignon"
                }
                
                choice_response = requests.post(f"{self.java_backend}/api/scenario/make-choice", 
                                              json=choice_data, timeout=5)
                
                if choice_response.status_code == 200:
                    self.log_step("Choix Narratif", True, "Œil de Wiener utilisé - timeline altérée")
                    return True
                    
        except Exception as e:
            self.log_step("Interstice Narratif", False, f"Erreur: {e}")
            return False
    
    def test_layer_4_magic_stack(self):
        """🔧 COUCHE 4: MagicStack - Formules et pouvoirs"""
        print("\n🔧 === TEST COUCHE 4: MAGICSTACK ===")
        
        # Test avec le backend Rust (MagicStack)
        formula_data = {
            "caster": "jean-grofignon",
            "formula": "ψ(temporal_shift) + ⊙(collapse) → ∆(timeline_fork)",
            "target_time": "+2_days",
            "energy_cost": 50
        }
        
        try:
            response = requests.post(f"{self.rust_backend}/api/magic/cast", 
                                   json=formula_data, timeout=5)
            if response.status_code == 200:
                result = response.json()
                self.log_step("Formule Magique", True, f"Timeline fork créée: {result}")
                
                # Vérifier l'état 6D
                state_response = requests.get(f"{self.rust_backend}/api/6d/entity/jean-grofignon", 
                                            timeout=5)
                
                if state_response.status_code == 200:
                    state = state_response.json()
                    self.log_step("État 6D", True, f"Position 6D: {state}")
                    return True
                    
        except Exception as e:
            self.log_step("MagicStack", False, f"Erreur: {e}")
            return False
    
    def test_temporal_differential(self):
        """⏰ TEST BONUS: Temps différentiel et causalité"""
        print("\n⏰ === TEST TEMPS DIFFÉRENTIEL ===")
        
        # Créer deux héros à des moments différents
        hero_1 = {"name": "Héros-Présent", "local_time": "2025-01-15T10:00:00"}
        hero_2 = {"name": "Héros-Futur", "local_time": "2025-01-17T14:30:00"}
        
        try:
            # Test de synchronisation temporelle
            sync_data = {
                "heroes": [hero_1, hero_2],
                "world_time": "2025-01-16T12:00:00",
                "causality_check": True
            }
            
            response = requests.post(f"{self.java_backend}/api/scenario/sync-temporal", 
                                   json=sync_data, timeout=5)
            
            if response.status_code == 200:
                result = response.json()
                self.log_step("Synchronisation Temporelle", True, 
                            f"Écart temporel géré: {result}")
                return True
                
        except Exception as e:
            self.log_step("Temps Différentiel", False, f"Erreur: {e}")
            return False
    
    def run_complete_vision_test(self):
        """🚀 LANCER LE TEST COMPLET DE LA VISION"""
        print("🔮✨ === TEST VISION COMPLÈTE HEROES OF TIME ✨🔮")
        print("🎯 Test des 4 couches + mécaniques temporelles")
        print("=" * 60)
        
        # Tester chaque couche
        layer_1 = self.test_layer_1_strategic_map()
        layer_2 = self.test_layer_2_tcg_combat()  
        layer_3 = self.test_layer_3_narrative_interstice()
        layer_4 = self.test_layer_4_magic_stack()
        temporal = self.test_temporal_differential()
        
        # Résultats finaux
        print("\n" + "=" * 60)
        print("📊 === RÉSULTATS FINAUX ===")
        
        total_tests = len(self.test_results)
        successful_tests = sum(1 for r in self.test_results if r["success"])
        
        print(f"✅ Tests réussis: {successful_tests}/{total_tests}")
        print(f"📈 Taux de succès: {(successful_tests/total_tests)*100:.1f}%")
        
        # Vision complète validée?
        if successful_tests >= total_tests * 0.8:  # 80% de réussite
            print("\n🎉✨ VISION COMPLÈTE VALIDÉE! ✨🎉")
            print("🔮 Heroes of Time: Architecture cohérente et fonctionnelle!")
        else:
            print("\n⚠️ Vision partiellement validée")
            print("🔧 Ajustements nécessaires sur certaines couches")
        
        return {
            "vision_validated": successful_tests >= total_tests * 0.8,
            "results": self.test_results,
            "summary": {
                "total": total_tests,
                "successful": successful_tests,
                "success_rate": (successful_tests/total_tests)*100
            }
        }

if __name__ == "__main__":
    tester = HeroesOfTimeVisionTest()
    results = tester.run_complete_vision_test()
    
    # Sauvegarder les résultats
    with open("/workspace/vision-test-results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\n💾 Résultats sauvés dans: vision-test-results.json")