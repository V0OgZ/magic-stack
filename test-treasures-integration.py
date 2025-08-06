#!/usr/bin/env python3
"""
🏺 TEST INTÉGRATION TRÉSORS - HEROES OF TIME
Mage Claude - Dimension 1 Littéraire

Test des créatures, artefacts et formules des Trésors:
- 🧜‍♂️ Créatures (Phénix Quantique, Liche, Chevalier)
- 🪙 Artefacts (Excalibur, potions, sorts)
- ⚡ Formules magiques et effets
- 🔗 Intégration avec le système de combat
"""

import requests
import json
import time
from datetime import datetime

class TreasuresIntegrationTest:
    def __init__(self):
        self.java_backend = "http://localhost:8080"
        self.rust_backend = "http://localhost:3001"
        self.test_results = []
        
        # Données des Trésors (extraites des JSON)
        self.creatures = {
            "quantum_phoenix": {
                "name": "Phénix Quantique",
                "health": 120,
                "attack": 25,
                "abilities": ["quantum_rebirth", "timeline_flight", "temporal_fire"]
            },
            "quantum_knight": {
                "name": "Chevalier Quantique", 
                "health": 150,
                "attack": 30,
                "abilities": ["quantum_charge", "probability_shield", "reality_strike"]
            },
            "quantum_lich": {
                "name": "Liche Quantique",
                "health": 200,
                "attack": 35,
                "abilities": ["quantum_necromancy", "death_probability", "temporal_drain"]
            }
        }
        
        self.artifacts = {
            "excalibur": {
                "name": "Excalibur",
                "formula": "LEGENDARY_STRIKE(target, 100) + DIVINE_LIGHT(area, 3) + TEMPORAL_CUT(reality)",
                "energy_cost": 80,
                "rarity": "legendary"
            },
            "healing_potion": {
                "name": "Potion de Soin",
                "formula": "MODIFY_ENERGY(hero, 50) + CREATE_EFFECT(healing_glow, 2)",
                "energy_cost": 10,
                "rarity": "common"
            },
            "fireball_scroll": {
                "name": "Parchemin Boule de Feu",
                "formula": "AREA_DAMAGE(target, 2, 40) + CREATE_EFFECT(fire_explosion, 3)",
                "energy_cost": 35,
                "rarity": "rare"
            },
            "teleport_ring": {
                "name": "Anneau de Téléportation",
                "formula": "TELEPORT_HERO(hero, target_x, target_y) + CREATE_EFFECT(teleport_flash, 1)",
                "energy_cost": 40,
                "rarity": "rare"
            }
        }

    def log_test(self, test_name, success, details, response_data=None):
        """📝 Log détaillé de chaque test"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    📋 {details}")
        if response_data and isinstance(response_data, dict):
            for key, value in response_data.items():
                if key in ['success', 'message', 'narrative', 'damage_dealt', 'winner']:
                    print(f"    🔹 {key}: {value}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response": response_data,
            "timestamp": datetime.now().isoformat()
        })

    def wait_for_backend(self):
        """⏳ Attendre que le backend soit prêt"""
        print("⏳ Attente du backend...")
        for i in range(10):
            try:
                response = requests.get(f"{self.java_backend}/api/scenario/health", timeout=2)
                if response.status_code == 200:
                    print("✅ Backend prêt!")
                    return True
            except:
                pass
            time.sleep(1)
        return False

    def test_creatures_integration(self):
        """🧜‍♂️ TESTS CRÉATURES DES TRÉSORS"""
        print("🧜‍♂️ === TESTS CRÉATURES DES TRÉSORS ===")
        
        # Test C.1: Combat vs Phénix Quantique
        try:
            combat_data = {
                "hero": "jean-grofignon",
                "enemy": "quantum_phoenix",
                "enemy_stats": self.creatures["quantum_phoenix"],
                "context": "treasures_test"
            }
            response = requests.post(f"{self.java_backend}/api/combat/start", 
                                   json=combat_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                combat_id = data.get("combat_id")
                enemy_hp = data.get("enemy_hp", 0)
                details = f"Combat vs {self.creatures['quantum_phoenix']['name']}, HP: {enemy_hp}"
                self.log_test("C.1 Combat Phénix Quantique", True, details, data)
                
                # Tester capacité quantum_rebirth
                if combat_id:
                    self.test_quantum_ability(combat_id, "quantum_rebirth")
                    
            else:
                self.log_test("C.1 Combat Phénix Quantique", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("C.1 Combat Phénix Quantique", False, f"Exception: {e}")

        # Test C.2: Combat vs Chevalier Quantique
        try:
            combat_data = {
                "hero": "jean-grofignon",
                "enemy": "quantum_knight",
                "enemy_stats": self.creatures["quantum_knight"],
                "context": "treasures_test"
            }
            response = requests.post(f"{self.java_backend}/api/combat/start", 
                                   json=combat_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                enemy_hp = data.get("enemy_hp", 0)
                details = f"Combat vs {self.creatures['quantum_knight']['name']}, HP: {enemy_hp}"
                self.log_test("C.2 Combat Chevalier Quantique", True, details, data)
            else:
                self.log_test("C.2 Combat Chevalier Quantique", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("C.2 Combat Chevalier Quantique", False, f"Exception: {e}")

        # Test C.3: Combat vs Liche Quantique (Boss)
        try:
            combat_data = {
                "hero": "jean-grofignon",
                "enemy": "quantum_lich",
                "enemy_stats": self.creatures["quantum_lich"],
                "context": "boss_fight"
            }
            response = requests.post(f"{self.java_backend}/api/combat/start", 
                                   json=combat_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                enemy_hp = data.get("enemy_hp", 0)
                details = f"Combat vs {self.creatures['quantum_lich']['name']} (BOSS), HP: {enemy_hp}"
                self.log_test("C.3 Combat Liche Quantique", True, details, data)
            else:
                self.log_test("C.3 Combat Liche Quantique", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("C.3 Combat Liche Quantique", False, f"Exception: {e}")

    def test_quantum_ability(self, combat_id, ability):
        """🌀 Test d'une capacité quantique"""
        try:
            ability_data = {
                "combat_id": combat_id,
                "ability": ability,
                "caster": "quantum_phoenix"
            }
            response = requests.post(f"{self.java_backend}/api/combat/use-ability", 
                                   json=ability_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test(f"C.1b Capacité {ability}", True, f"Capacité quantique utilisée", data)
            else:
                self.log_test(f"C.1b Capacité {ability}", False, f"Capacité non supportée (normal)")
                
        except Exception as e:
            self.log_test(f"C.1b Capacité {ability}", False, f"Exception: {e}")

    def test_artifacts_integration(self):
        """🪙 TESTS ARTEFACTS DES TRÉSORS"""
        print("🪙 === TESTS ARTEFACTS DES TRÉSORS ===")
        
        # Test A.1: Utiliser Excalibur
        try:
            artifact_data = {
                "hero": "jean-grofignon",
                "artifact": "excalibur",
                "artifact_stats": self.artifacts["excalibur"],
                "target": "quantum_dragon",
                "context": "legendary_strike"
            }
            response = requests.post(f"{self.java_backend}/api/scenario/use-artifact", 
                                   json=artifact_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Excalibur utilisée: {self.artifacts['excalibur']['formula']}"
                self.log_test("A.1 Utiliser Excalibur", True, details, data)
            else:
                self.log_test("A.1 Utiliser Excalibur", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("A.1 Utiliser Excalibur", False, f"Exception: {e}")

        # Test A.2: Potion de Soin
        try:
            artifact_data = {
                "hero": "jean-grofignon",
                "artifact": "healing_potion",
                "artifact_stats": self.artifacts["healing_potion"],
                "context": "healing"
            }
            response = requests.post(f"{self.java_backend}/api/scenario/use-artifact", 
                                   json=artifact_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Potion utilisée: +50 HP"
                self.log_test("A.2 Potion de Soin", True, details, data)
            else:
                self.log_test("A.2 Potion de Soin", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("A.2 Potion de Soin", False, f"Exception: {e}")

        # Test A.3: Parchemin Boule de Feu
        try:
            artifact_data = {
                "hero": "jean-grofignon",
                "artifact": "fireball_scroll",
                "artifact_stats": self.artifacts["fireball_scroll"],
                "target_area": {"x": 10, "y": 10, "radius": 2},
                "context": "area_attack"
            }
            response = requests.post(f"{self.java_backend}/api/scenario/use-artifact", 
                                   json=artifact_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Boule de feu: 40 dégâts zone"
                self.log_test("A.3 Parchemin Boule de Feu", True, details, data)
            else:
                self.log_test("A.3 Parchemin Boule de Feu", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("A.3 Parchemin Boule de Feu", False, f"Exception: {e}")

        # Test A.4: Anneau de Téléportation
        try:
            artifact_data = {
                "hero": "jean-grofignon",
                "artifact": "teleport_ring",
                "artifact_stats": self.artifacts["teleport_ring"],
                "target_position": {"x": 50, "y": 50},
                "context": "teleportation"
            }
            response = requests.post(f"{self.java_backend}/api/scenario/use-artifact", 
                                   json=artifact_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Téléportation vers (50,50)"
                self.log_test("A.4 Anneau Téléportation", True, details, data)
            else:
                self.log_test("A.4 Anneau Téléportation", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("A.4 Anneau Téléportation", False, f"Exception: {e}")

    def test_formulas_integration(self):
        """⚡ TESTS FORMULES MAGIQUES"""
        print("⚡ === TESTS FORMULES MAGIQUES ===")
        
        # Test F.1: Formule temporelle basique
        try:
            formula_data = {
                "caster": "jean-grofignon",
                "formula": "⊙(temps) + †ψ(présent) → Δt+0(maintenant)",
                "context": "time_freeze",
                "energy_cost": 30
            }
            response = requests.post(f"{self.java_backend}/api/interstice/cast-formula", 
                                   json=formula_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Formule temporelle: Fige le moment présent"
                self.log_test("F.1 Formule Temporelle", True, details, data)
            else:
                self.log_test("F.1 Formule Temporelle", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("F.1 Formule Temporelle", False, f"Exception: {e}")

        # Test F.2: Formule de paradoxe
        try:
            formula_data = {
                "caster": "jean-grofignon",
                "formula": "Π(paradoxe) + ℬ7(branches) ⟶ Δt+∞(résolution)",
                "context": "paradox_resolution",
                "energy_cost": 60
            }
            response = requests.post(f"{self.java_backend}/api/interstice/cast-formula", 
                                   json=formula_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Formule de paradoxe: Résout les paradoxes temporels"
                self.log_test("F.2 Formule Paradoxe", True, details, data)
            else:
                self.log_test("F.2 Formule Paradoxe", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("F.2 Formule Paradoxe", False, f"Exception: {e}")

        # Test F.3: Formule de victoire ultime
        try:
            formula_data = {
                "caster": "jean-grofignon",
                "formula": "⊙(héros) + ⊙(timeline) + †ψ(fusion) → Δt+1(victoire)",
                "context": "ultimate_victory",
                "energy_cost": 100
            }
            response = requests.post(f"{self.java_backend}/api/interstice/cast-formula", 
                                   json=formula_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                details = f"Formule ultime: Unifie les timelines pour la victoire"
                self.log_test("F.3 Formule Victoire", True, details, data)
            else:
                self.log_test("F.3 Formule Victoire", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("F.3 Formule Victoire", False, f"Exception: {e}")

    def test_treasures_combat_scenario(self):
        """🎯 SCÉNARIO COMPLET AVEC TRÉSORS"""
        print("🎯 === SCÉNARIO COMPLET AVEC TRÉSORS ===")
        
        try:
            # 1. Spawn héros avec Excalibur
            hero_data = {
                "name": "Arthur-Quantique",
                "position": {"x": 0, "y": 0},
                "equipment": ["excalibur", "healing_potion"],
                "abilities": ["quantum_strike", "temporal_mastery"]
            }
            spawn_response = requests.post(f"{self.java_backend}/api/scenario/run/spawn-hero", 
                                         json=hero_data, timeout=5)
            
            # 2. Combat vs Liche Quantique avec Excalibur
            if spawn_response.status_code == 200:
                combat_data = {
                    "hero": "arthur-quantique",
                    "enemy": "quantum_lich",
                    "enemy_stats": self.creatures["quantum_lich"],
                    "hero_equipment": ["excalibur"],
                    "context": "legendary_boss_fight"
                }
                combat_response = requests.post(f"{self.java_backend}/api/combat/start", 
                                              json=combat_data, timeout=5)
                
                if combat_response.status_code == 200:
                    combat_data = combat_response.json()
                    combat_id = combat_data.get("combat_id")
                    
                    # 3. Utiliser Excalibur
                    if combat_id:
                        excalibur_data = {
                            "combat_id": combat_id,
                            "card": "excalibur_strike",
                            "target": "quantum_lich",
                            "artifact_power": True
                        }
                        excalibur_response = requests.post(f"{self.java_backend}/api/combat/play-card", 
                                                         json=excalibur_data, timeout=5)
                        
                        if excalibur_response.status_code == 200:
                            result = excalibur_response.json()
                            damage = result.get("damage_dealt", 0)
                            finished = result.get("combat_finished", False)
                            winner = result.get("winner", "")
                            
                            details = f"Excalibur vs Liche: {damage} dégâts, Fini: {finished}, Vainqueur: {winner}"
                            self.log_test("S.1 Scénario Excalibur vs Liche", True, details, result)
                        else:
                            self.log_test("S.1 Scénario Excalibur vs Liche", False, "Échec utilisation Excalibur")
                    else:
                        self.log_test("S.1 Scénario Excalibur vs Liche", False, "Combat ID manquant")
                else:
                    self.log_test("S.1 Scénario Excalibur vs Liche", False, "Échec démarrage combat")
            else:
                self.log_test("S.1 Scénario Excalibur vs Liche", False, "Échec spawn héros")
                
        except Exception as e:
            self.log_test("S.1 Scénario Excalibur vs Liche", False, f"Exception: {e}")

    def generate_treasures_report(self):
        """📊 RAPPORT FINAL TRÉSORS"""
        print("\n" + "=" * 80)
        print("🏺 === RAPPORT FINAL INTÉGRATION TRÉSORS ===")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for test in self.test_results if test["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"📈 STATISTIQUES:")
        print(f"   ✅ Tests réussis: {passed_tests}")
        print(f"   ❌ Tests échoués: {failed_tests}")
        print(f"   📊 Total: {total_tests}")
        print(f"   🎯 Taux de réussite: {success_rate:.1f}%")
        
        # Détail par catégorie
        categories = {
            "Créatures": [t for t in self.test_results if t["test"].startswith("C.")],
            "Artefacts": [t for t in self.test_results if t["test"].startswith("A.")],
            "Formules": [t for t in self.test_results if t["test"].startswith("F.")],
            "Scénarios": [t for t in self.test_results if t["test"].startswith("S.")]
        }
        
        print(f"\n📋 DÉTAIL PAR CATÉGORIE:")
        for cat_name, cat_tests in categories.items():
            if cat_tests:
                cat_passed = sum(1 for t in cat_tests if t["success"])
                cat_total = len(cat_tests)
                cat_rate = (cat_passed / cat_total * 100) if cat_total > 0 else 0
                status = "🟢" if cat_rate == 100 else "🟡" if cat_rate >= 75 else "🔴"
                print(f"   {status} {cat_name}: {cat_passed}/{cat_total} ({cat_rate:.1f}%)")
        
        # Verdict
        print(f"\n🎯 VERDICT TRÉSORS:")
        if success_rate >= 90:
            print("   🎉 EXCELLENT! Les Trésors s'intègrent parfaitement!")
        elif success_rate >= 75:
            print("   ✅ BON! La plupart des Trésors fonctionnent.")
        elif success_rate >= 50:
            print("   ⚠️  MOYEN. Certains Trésors nécessitent des ajustements.")
        else:
            print("   🔴 CRITIQUE. Les Trésors ne s'intègrent pas correctement.")
        
        return {
            "total_tests": total_tests,
            "passed_tests": passed_tests,
            "success_rate": success_rate,
            "categories": categories
        }

    def run_treasures_tests(self):
        """🚀 LANCER TOUS LES TESTS TRÉSORS"""
        print("🏺✨ === TESTS INTÉGRATION TRÉSORS ✨🏺")
        print("🎯 Validation des créatures, artefacts et formules")
        print("=" * 80)
        
        if not self.wait_for_backend():
            print("❌ Backend non disponible!")
            return
        
        # Tests par catégorie
        self.test_creatures_integration()
        self.test_artifacts_integration()
        self.test_formulas_integration()
        self.test_treasures_combat_scenario()
        
        # Rapport final
        report = self.generate_treasures_report()
        
        # Sauvegarder
        with open("/workspace/treasures-test-results.json", "w") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "summary": report,
                "detailed_results": self.test_results
            }, f, indent=2)
        
        print(f"\n💾 Résultats sauvés: treasures-test-results.json")
        return report

if __name__ == "__main__":
    tester = TreasuresIntegrationTest()
    results = tester.run_treasures_tests()