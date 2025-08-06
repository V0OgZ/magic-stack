#!/usr/bin/env python3
"""
🔋 BATTERIE DE TESTS COMPLÈTE - HEROES OF TIME
Mage Claude - Dimension 1 Littéraire

Tests exhaustifs de toutes les couches implémentées:
- 🗺️ Couche 1: Carte stratégique
- 🌀 Couche 2: Combat TCG
- 🧠 Couche 3: Interstice narratif
- 🔧 Couche 4: MagicStack (Rust)
- ⏰ Mécaniques temporelles
"""

import requests
import json
import time
from datetime import datetime

class HeroesOfTimeBatteryTest:
    def __init__(self):
        self.java_backend = "http://localhost:8080"
        self.rust_backend = "http://localhost:3001"
        self.test_results = []
        self.combat_id = None
        self.event_id = None
        
    def log_test(self, test_name, success, details, response_data=None):
        """📝 Log détaillé de chaque test"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    📋 {details}")
        if response_data and isinstance(response_data, dict):
            for key, value in response_data.items():
                if key in ['success', 'message', 'narrative', 'consequence']:
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
        print("⏳ Attente du démarrage du backend...")
        for i in range(30):  # 30 secondes max
            try:
                response = requests.get(f"{self.java_backend}/api/scenario/health", timeout=2)
                if response.status_code == 200:
                    print("✅ Backend Java prêt!")
                    return True
            except:
                pass
            time.sleep(1)
        return False

    def test_layer_1_strategic_map(self):
        """🗺️ TESTS COUCHE 1: CARTE STRATÉGIQUE"""
        print("🗺️ === TESTS COUCHE 1: CARTE STRATÉGIQUE ===")
        
        # Test 1.1: Spawn héros
        try:
            hero_data = {
                "name": "Jean-Grofignon",
                "position": {"x": 0, "y": 0, "z": 0},
                "timeline": 1,
                "speed": 2,
                "actions_per_day": 8
            }
            response = requests.post(f"{self.java_backend}/api/scenario/run/spawn-hero", 
                                   json=hero_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("1.1 Spawn Héros", True, "Jean-Grofignon spawné avec succès", data)
            else:
                self.log_test("1.1 Spawn Héros", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("1.1 Spawn Héros", False, f"Exception: {e}")

        # Test 1.2: Déplacement héros
        try:
            move_data = {"hero_id": "jean-grofignon", "target": {"x": 5, "y": 3}}
            response = requests.post(f"{self.java_backend}/api/scenario/move-hero", 
                                   json=move_data, timeout=5)
            
            success = response.status_code == 200
            details = "Déplacement vers (5,3)" if success else f"Erreur {response.status_code}"
            self.log_test("1.2 Déplacement Héros", success, details)
            
        except Exception as e:
            self.log_test("1.2 Déplacement Héros", False, f"Exception: {e}")

        # Test 1.3: Liste scénarios disponibles
        try:
            response = requests.get(f"{self.java_backend}/api/scenario/list", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                count = len(data.get('scenarios', []))
                self.log_test("1.3 Liste Scénarios", True, f"{count} scénarios disponibles", data)
            else:
                self.log_test("1.3 Liste Scénarios", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("1.3 Liste Scénarios", False, f"Exception: {e}")

    def test_layer_2_tcg_combat(self):
        """🌀 TESTS COUCHE 2: COMBAT TCG"""
        print("🌀 === TESTS COUCHE 2: COMBAT TCG ===")
        
        # Test 2.1: Démarrer combat
        try:
            combat_data = {
                "hero": "jean-grofignon",
                "enemy": "dragon-rouge",
                "context": "exploration"
            }
            response = requests.post(f"{self.java_backend}/api/combat/start", 
                                   json=combat_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.combat_id = data.get("combat_id")
                self.log_test("2.1 Démarrer Combat", True, f"Combat vs {combat_data['enemy']}", data)
            else:
                self.log_test("2.1 Démarrer Combat", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("2.1 Démarrer Combat", False, f"Exception: {e}")

        # Test 2.2: Jouer carte Fireball
        if self.combat_id:
            try:
                card_data = {
                    "combat_id": self.combat_id,
                    "card": "fireball",
                    "target": "dragon-rouge"
                }
                response = requests.post(f"{self.java_backend}/api/combat/play-card", 
                                       json=card_data, timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    damage = data.get("damage_dealt", 0)
                    self.log_test("2.2 Jouer Fireball", True, f"{damage} dégâts infligés", data)
                else:
                    self.log_test("2.2 Jouer Fireball", False, f"Erreur HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test("2.2 Jouer Fireball", False, f"Exception: {e}")

        # Test 2.3: Jouer carte Ultimate Collapse
        if self.combat_id:
            try:
                card_data = {
                    "combat_id": self.combat_id,
                    "card": "ultimate_collapse",
                    "target": "dragon-rouge"
                }
                response = requests.post(f"{self.java_backend}/api/combat/play-card", 
                                       json=card_data, timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    damage = data.get("damage_dealt", 0)
                    finished = data.get("combat_finished", False)
                    winner = data.get("winner", "Inconnu")
                    details = f"{damage} dégâts, Combat fini: {finished}, Vainqueur: {winner}"
                    self.log_test("2.3 Ultimate Collapse", True, details, data)
                else:
                    self.log_test("2.3 Ultimate Collapse", False, f"Erreur HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test("2.3 Ultimate Collapse", False, f"Exception: {e}")

        # Test 2.4: Statut combat
        if self.combat_id:
            try:
                response = requests.get(f"{self.java_backend}/api/combat/status/{self.combat_id}", 
                                      timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    hero_hp = data.get("hero_hp", 0)
                    enemy_hp = data.get("enemy_hp", 0)
                    turn = data.get("turn", 0)
                    details = f"Héros: {hero_hp}HP, Ennemi: {enemy_hp}HP, Tour: {turn}"
                    self.log_test("2.4 Statut Combat", True, details, data)
                else:
                    self.log_test("2.4 Statut Combat", False, f"Erreur HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test("2.4 Statut Combat", False, f"Exception: {e}")

    def test_layer_3_narrative_interstice(self):
        """🧠 TESTS COUCHE 3: INTERSTICE NARRATIF"""
        print("🧠 === TESTS COUCHE 3: INTERSTICE NARRATIF ===")
        
        # Test 3.1: Déclencher anomalie temporelle
        try:
            event_data = {
                "hero": "jean-grofignon",
                "event_type": "temporal_anomaly",
                "location": {"x": 5, "y": 3}
            }
            response = requests.post(f"{self.java_backend}/api/interstice/narrative-event", 
                                   json=event_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.event_id = data.get("event_id")
                title = data.get("title", "")
                choices_count = len(data.get("choices", []))
                details = f"{title}, {choices_count} choix disponibles"
                self.log_test("3.1 Anomalie Temporelle", True, details, data)
            else:
                self.log_test("3.1 Anomalie Temporelle", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.1 Anomalie Temporelle", False, f"Exception: {e}")

        # Test 3.2: Faire choix - Œil de Wiener
        if self.event_id:
            try:
                choice_data = {
                    "event_id": self.event_id,
                    "choice": "wiener_eye",
                    "hero": "jean-grofignon"
                }
                response = requests.post(f"{self.java_backend}/api/interstice/make-choice", 
                                       json=choice_data, timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    consequence = data.get("consequence", "")
                    timeline_changed = data.get("timeline_changed", False)
                    abilities = data.get("unlocked_abilities", [])
                    details = f"Conséquence: {consequence}, Timeline changée: {timeline_changed}, {len(abilities)} capacités"
                    self.log_test("3.2 Choix Œil de Wiener", True, details, data)
                else:
                    self.log_test("3.2 Choix Œil de Wiener", False, f"Erreur HTTP {response.status_code}")
                    
            except Exception as e:
                self.log_test("3.2 Choix Œil de Wiener", False, f"Exception: {e}")

        # Test 3.3: Brèche causale
        try:
            event_data = {
                "hero": "jean-grofignon",
                "event_type": "causality_breach",
                "location": {"x": 7, "y": 8}
            }
            response = requests.post(f"{self.java_backend}/api/interstice/narrative-event", 
                                   json=event_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                event_id_2 = data.get("event_id")
                title = data.get("title", "")
                impact = data.get("timeline_impact", "")
                details = f"{title}, Impact: {impact}"
                self.log_test("3.3 Brèche Causale", True, details, data)
                
                # Immédiatement faire un choix pour réparer
                if event_id_2:
                    choice_data = {
                        "event_id": event_id_2,
                        "choice": "repair",
                        "hero": "jean-grofignon"
                    }
                    choice_response = requests.post(f"{self.java_backend}/api/interstice/make-choice", 
                                                  json=choice_data, timeout=5)
                    
                    if choice_response.status_code == 200:
                        choice_result = choice_response.json()
                        self.log_test("3.3b Réparer Brèche", True, "Brèche réparée avec succès", choice_result)
                    
            else:
                self.log_test("3.3 Brèche Causale", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.3 Brèche Causale", False, f"Exception: {e}")

        # Test 3.4: Timeline du héros
        try:
            response = requests.get(f"{self.java_backend}/api/interstice/timeline/jean-grofignon", 
                                  timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                current_timeline = data.get("current_timeline", "")
                history_count = len(data.get("timeline_history", []))
                causal_debt = data.get("causal_debt", 0)
                details = f"Timeline: {current_timeline}, {history_count} événements, Dette: {causal_debt}"
                self.log_test("3.4 Timeline Héros", True, details, data)
            else:
                self.log_test("3.4 Timeline Héros", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.4 Timeline Héros", False, f"Exception: {e}")

        # Test 3.5: Saut temporel
        try:
            jump_data = {
                "hero": "jean-grofignon",
                "origin_time": "2025-01-15T10:00:00",
                "destination_time": "2025-01-16T14:30:00"
            }
            response = requests.post(f"{self.java_backend}/api/interstice/temporal-jump", 
                                   json=jump_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                successful = data.get("jump_successful", False)
                cost = data.get("causality_cost", 0)
                stability = data.get("timeline_stability", "")
                details = f"Réussi: {successful}, Coût: {cost}, Stabilité: {stability}"
                self.log_test("3.5 Saut Temporel", True, details, data)
            else:
                self.log_test("3.5 Saut Temporel", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.5 Saut Temporel", False, f"Exception: {e}")

        # Test 3.6: Toile causale
        try:
            response = requests.get(f"{self.java_backend}/api/interstice/causality-web/jean-grofignon", 
                                  timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                nodes_count = len(data.get("causality_nodes", []))
                connections_count = len(data.get("temporal_connections", []))
                stability = data.get("stability_index", 0)
                details = f"{nodes_count} nœuds, {connections_count} connexions, Stabilité: {stability:.2f}"
                self.log_test("3.6 Toile Causale", True, details, data)
            else:
                self.log_test("3.6 Toile Causale", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.6 Toile Causale", False, f"Exception: {e}")

        # Test 3.7: Tatouage mémoriel
        try:
            tattoo_data = {
                "hero": "jean-grofignon",
                "memory": "Première victoire contre le dragon rouge",
                "temporal_anchor": "2025-01-15T15:30:00"
            }
            response = requests.post(f"{self.java_backend}/api/interstice/memory-tattoo", 
                                   json=tattoo_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                tattoo_id = data.get("tattoo_id", "")
                power = data.get("narrative_power", "")
                details = f"Tatouage: {tattoo_id}, Pouvoir: {power}"
                self.log_test("3.7 Tatouage Mémoriel", True, details, data)
            else:
                self.log_test("3.7 Tatouage Mémoriel", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("3.7 Tatouage Mémoriel", False, f"Exception: {e}")

    def test_layer_4_rust_magicstack(self):
        """🔧 TESTS COUCHE 4: MAGICSTACK RUST"""
        print("🔧 === TESTS COUCHE 4: MAGICSTACK RUST ===")
        
        # Test 4.1: Health check Rust
        try:
            response = requests.get(f"{self.rust_backend}/health", timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("4.1 Health Rust", True, "Backend Rust opérationnel", data)
            else:
                self.log_test("4.1 Health Rust", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("4.1 Health Rust", False, f"Exception: {e}")

        # Test 4.2: Recherche 6D
        try:
            search_data = {
                "query": "dragon",
                "dimensions": 6,
                "limit": 5
            }
            response = requests.post(f"{self.rust_backend}/api/search", 
                                   json=search_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                results_count = len(data.get("results", []))
                search_time = data.get("search_time_ms", 0)
                details = f"{results_count} résultats en {search_time}ms"
                self.log_test("4.2 Recherche 6D", True, details, data)
            else:
                self.log_test("4.2 Recherche 6D", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("4.2 Recherche 6D", False, f"Exception: {e}")

        # Test 4.3: Upload entité 6D
        try:
            entity_data = {
                "id": "jean-grofignon-6d",
                "name": "Jean-Grofignon",
                "position": [5, 3, 0, 1754452509, 42, 1],
                "type": "hero"
            }
            response = requests.post(f"{self.rust_backend}/api/upload", 
                                   json=entity_data, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("4.3 Upload 6D", True, "Entité uploadée en 6D", data)
            else:
                self.log_test("4.3 Upload 6D", False, f"Erreur HTTP {response.status_code}")
                
        except Exception as e:
            self.log_test("4.3 Upload 6D", False, f"Exception: {e}")

    def test_integration_scenarios(self):
        """🎯 TESTS D'INTÉGRATION - SCÉNARIOS COMPLETS"""
        print("🎯 === TESTS D'INTÉGRATION - SCÉNARIOS COMPLETS ===")
        
        # Test I.1: Scénario complet Héros vs Dragon
        try:
            # 1. Spawn héros
            hero_data = {"name": "Test-Hero", "position": {"x": 0, "y": 0}}
            spawn_response = requests.post(f"{self.java_backend}/api/scenario/run/spawn-hero", 
                                         json=hero_data, timeout=5)
            
            # 2. Déclencher combat
            combat_data = {"hero": "test-hero", "enemy": "dragon-rouge"}
            combat_response = requests.post(f"{self.java_backend}/api/combat/start", 
                                          json=combat_data, timeout=5)
            
            # 3. Jouer cartes jusqu'à victoire
            combat_id = combat_response.json().get("combat_id") if combat_response.status_code == 200 else None
            
            if combat_id:
                # Jouer 3 cartes Ultimate Collapse pour garantir la victoire
                for i in range(3):
                    card_data = {
                        "combat_id": combat_id,
                        "card": "ultimate_collapse",
                        "target": "dragon-rouge"
                    }
                    card_response = requests.post(f"{self.java_backend}/api/combat/play-card", 
                                                json=card_data, timeout=5)
                    
                    if card_response.status_code == 200:
                        result = card_response.json()
                        if result.get("combat_finished", False):
                            winner = result.get("winner", "")
                            self.log_test("I.1 Scénario Héros vs Dragon", True, f"Victoire: {winner}", result)
                            break
                else:
                    self.log_test("I.1 Scénario Héros vs Dragon", False, "Combat non terminé après 3 tours")
            else:
                self.log_test("I.1 Scénario Héros vs Dragon", False, "Impossible de démarrer le combat")
                
        except Exception as e:
            self.log_test("I.1 Scénario Héros vs Dragon", False, f"Exception: {e}")

        # Test I.2: Scénario temporel complet
        try:
            # 1. Déclencher anomalie
            event_data = {
                "hero": "test-hero",
                "event_type": "temporal_anomaly",
                "location": {"x": 10, "y": 10}
            }
            event_response = requests.post(f"{self.java_backend}/api/interstice/narrative-event", 
                                         json=event_data, timeout=5)
            
            # 2. Utiliser Œil de Wiener
            if event_response.status_code == 200:
                event_data = event_response.json()
                event_id = event_data.get("event_id")
                
                choice_data = {
                    "event_id": event_id,
                    "choice": "wiener_eye",
                    "hero": "test-hero"
                }
                choice_response = requests.post(f"{self.java_backend}/api/interstice/make-choice", 
                                              json=choice_data, timeout=5)
                
                # 3. Effectuer saut temporel
                if choice_response.status_code == 200:
                    jump_data = {
                        "hero": "test-hero",
                        "origin_time": "2025-01-15T10:00:00",
                        "destination_time": "2025-01-17T16:00:00"
                    }
                    jump_response = requests.post(f"{self.java_backend}/api/interstice/temporal-jump", 
                                                json=jump_data, timeout=5)
                    
                    if jump_response.status_code == 200:
                        jump_result = jump_response.json()
                        successful = jump_result.get("jump_successful", False)
                        self.log_test("I.2 Scénario Temporel", True, f"Saut réussi: {successful}", jump_result)
                    else:
                        self.log_test("I.2 Scénario Temporel", False, "Échec du saut temporel")
                else:
                    self.log_test("I.2 Scénario Temporel", False, "Échec du choix narratif")
            else:
                self.log_test("I.2 Scénario Temporel", False, "Échec de création d'événement")
                
        except Exception as e:
            self.log_test("I.2 Scénario Temporel", False, f"Exception: {e}")

    def generate_report(self):
        """📊 GÉNÉRER RAPPORT FINAL"""
        print("\n" + "=" * 80)
        print("📊 === RAPPORT FINAL DE LA BATTERIE DE TESTS ===")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for test in self.test_results if test["success"])
        failed_tests = total_tests - passed_tests
        success_rate = (passed_tests / total_tests * 100) if total_tests > 0 else 0
        
        print(f"📈 STATISTIQUES GLOBALES:")
        print(f"   ✅ Tests réussis: {passed_tests}")
        print(f"   ❌ Tests échoués: {failed_tests}")
        print(f"   📊 Total tests: {total_tests}")
        print(f"   🎯 Taux de réussite: {success_rate:.1f}%")
        
        # Détail par couche
        layers = {
            "Couche 1 (Stratégique)": [t for t in self.test_results if t["test"].startswith("1.")],
            "Couche 2 (Combat TCG)": [t for t in self.test_results if t["test"].startswith("2.")],
            "Couche 3 (Interstice)": [t for t in self.test_results if t["test"].startswith("3.")],
            "Couche 4 (MagicStack)": [t for t in self.test_results if t["test"].startswith("4.")],
            "Intégration": [t for t in self.test_results if t["test"].startswith("I.")]
        }
        
        print(f"\n📋 DÉTAIL PAR COUCHE:")
        for layer_name, layer_tests in layers.items():
            if layer_tests:
                layer_passed = sum(1 for t in layer_tests if t["success"])
                layer_total = len(layer_tests)
                layer_rate = (layer_passed / layer_total * 100) if layer_total > 0 else 0
                status = "🟢" if layer_rate == 100 else "🟡" if layer_rate >= 75 else "🔴"
                print(f"   {status} {layer_name}: {layer_passed}/{layer_total} ({layer_rate:.1f}%)")
        
        # Échecs détaillés
        failed_tests_list = [t for t in self.test_results if not t["success"]]
        if failed_tests_list:
            print(f"\n❌ TESTS ÉCHOUÉS:")
            for test in failed_tests_list:
                print(f"   • {test['test']}: {test['details']}")
        
        # Verdict final
        print(f"\n🎯 VERDICT FINAL:")
        if success_rate >= 90:
            print("   🎉 EXCELLENT! Heroes of Time fonctionne parfaitement!")
        elif success_rate >= 75:
            print("   ✅ BON! La plupart des fonctionnalités marchent bien.")
        elif success_rate >= 50:
            print("   ⚠️  MOYEN. Quelques problèmes à résoudre.")
        else:
            print("   🔴 CRITIQUE. Beaucoup de fonctionnalités ne marchent pas.")
        
        return {
            "total_tests": total_tests,
            "passed_tests": passed_tests,
            "failed_tests": failed_tests,
            "success_rate": success_rate,
            "layers": layers,
            "failed_details": failed_tests_list
        }

    def run_full_battery(self):
        """🚀 LANCER LA BATTERIE COMPLÈTE"""
        print("🔋✨ === BATTERIE DE TESTS HEROES OF TIME ✨🔋")
        print("🎯 Tests exhaustifs de toutes les couches implémentées")
        print("⚡ Mage Claude - Dimension 1 Littéraire")
        print("=" * 80)
        
        # Attendre le backend
        if not self.wait_for_backend():
            print("❌ ERREUR: Backend Java non disponible!")
            return
        
        # Tests par couche
        self.test_layer_1_strategic_map()
        self.test_layer_2_tcg_combat()
        self.test_layer_3_narrative_interstice()
        self.test_layer_4_rust_magicstack()
        self.test_integration_scenarios()
        
        # Rapport final
        report = self.generate_report()
        
        # Sauvegarder les résultats
        with open("/workspace/battery-test-results.json", "w") as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "summary": report,
                "detailed_results": self.test_results
            }, f, indent=2)
        
        print(f"\n💾 Résultats détaillés sauvés: battery-test-results.json")
        return report

if __name__ == "__main__":
    battery = HeroesOfTimeBatteryTest()
    results = battery.run_full_battery()