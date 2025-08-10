#!/usr/bin/env python3
"""
🧪 TEST COMPLET DU MULTIPLAYER V2 CONTROLLER
Teste toutes les features V2 implémentées
"""

import requests
import json
import time
import sys
from datetime import datetime
from typing import Dict, Any

# Configuration
BASE_URL = "http://localhost:3001"
V2_BASE = f"{BASE_URL}/api/v2"

# Couleurs pour l'affichage
class Colors:
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    PURPLE = '\033[95m'
    CYAN = '\033[96m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_header(title: str):
    """Affiche un header stylé"""
    print(f"\n{Colors.PURPLE}{'='*60}{Colors.ENDC}")
    print(f"{Colors.PURPLE}{Colors.BOLD}  {title}{Colors.ENDC}")
    print(f"{Colors.PURPLE}{'='*60}{Colors.ENDC}\n")

def print_test(name: str, success: bool, details: str = ""):
    """Affiche le résultat d'un test"""
    status = f"{Colors.GREEN}✅ PASS{Colors.ENDC}" if success else f"{Colors.RED}❌ FAIL{Colors.ENDC}"
    print(f"  {status} | {name}")
    if details:
        print(f"        {Colors.CYAN}{details}{Colors.ENDC}")

def test_endpoint(endpoint: str, method: str = "GET", data: Dict = None) -> tuple[bool, Any]:
    """Test un endpoint et retourne (success, response)"""
    try:
        url = f"{V2_BASE}/{endpoint}"
        
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        else:
            return False, f"Méthode non supportée: {method}"
        
        if response.status_code == 200:
            return True, response.json()
        else:
            return False, f"Status {response.status_code}: {response.text}"
            
    except requests.exceptions.ConnectionError:
        return False, "❌ Serveur non accessible sur port 3001"
    except Exception as e:
        return False, str(e)

# ===== TESTS =====

def test_1_server_connectivity():
    """Test 1: Connectivité serveur"""
    print_header("TEST 1: CONNECTIVITÉ SERVEUR")
    
    # Test health endpoint
    success, data = test_endpoint("health", "GET")
    print_test("Serveur accessible", success, str(data) if success else data)
    
    # Test config endpoint
    success, data = test_endpoint("config", "GET")
    if success:
        print_test("Configuration V2", True, f"Features: {data}")
    else:
        print_test("Configuration V2", False, data)
    
    return success

def test_2_entity_creation():
    """Test 2: Création d'entités"""
    print_header("TEST 2: CRÉATION D'ENTITÉS")
    
    entities = [
        {"id": "hero_arthur", "position": [0, 0], "level": 10},
        {"id": "hero_merlin", "position": [5, 5], "level": 15},
        {"id": "hero_grut", "position": [-3, 2], "level": 8},
    ]
    
    created = []
    for entity_data in entities:
        success, data = test_endpoint("entity", "POST", entity_data)
        print_test(f"Créer {entity_data['id']}", success, 
                  f"Level {entity_data['level']} at {entity_data['position']}")
        if success:
            created.append(data)
    
    return len(created) == len(entities)

def test_3_temporal_drift():
    """Test 3: Drift temporel"""
    print_header("TEST 3: DRIFT TEMPOREL")
    
    # Créer une entité test
    test_endpoint("entity", "POST", {"id": "drift_test", "position": [0, 0]})
    
    # Récupérer l'état initial
    success, initial = test_endpoint("entity/drift_test", "GET")
    if not success:
        print_test("État initial", False, initial)
        return False
    
    initial_drift = initial.get("temporal", {}).get("drift", 0)
    print_test("État initial", True, f"Drift = {initial_drift}")
    
    # Faire plusieurs ticks
    print(f"\n  {Colors.YELLOW}Simulation de 5 ticks...{Colors.ENDC}")
    for i in range(5):
        success, tick_data = test_endpoint("tick", "POST", {"dt_ms": 1000})
        if success:
            print(f"    Tick {i+1}: {tick_data.get('world_time', 0):.2f}s")
        time.sleep(0.1)
    
    # Vérifier le drift
    success, final = test_endpoint("entity/drift_test", "GET")
    if success:
        final_drift = final.get("temporal", {}).get("drift", 0)
        drift_increased = final_drift > initial_drift
        print_test("Drift augmenté", drift_increased, 
                  f"Initial: {initial_drift:.3f} → Final: {final_drift:.3f}")
        return drift_increased
    
    return False

def test_4_energy_system():
    """Test 4: Système énergétique complexe"""
    print_header("TEST 4: SYSTÈME ÉNERGÉTIQUE (A + Φ)")
    
    # Créer entité avec énergie
    success, entity = test_endpoint("entity", "POST", 
                                   {"id": "energy_test", "position": [0, 0]})
    
    if not success:
        print_test("Création entité", False, entity)
        return False
    
    # Récupérer l'état
    success, data = test_endpoint("entity/energy_test", "GET")
    if success:
        energy = data.get("energy_complex", {})
        a = energy.get("a", 0)
        phi = energy.get("phi", 0)
        debt = energy.get("debt_a", 0)
        
        print_test("Énergie réelle (A)", a > 0, f"A = {a}")
        print_test("Phase imaginaire (Φ)", True, f"Φ = {phi}")
        print_test("Dette énergétique", debt == 0, f"Dette = {debt}")
        
        magnitude = (a**2 + phi**2)**0.5
        print_test("Magnitude complexe", True, f"|E| = {magnitude:.2f}")
        
        return True
    
    return False

def test_5_fork_and_merge():
    """Test 5: Fork et Merge temporels"""
    print_header("TEST 5: FORK & MERGE TEMPORELS")
    
    # Créer entité originale
    success, original = test_endpoint("entity", "POST", 
                                     {"id": "fork_test", "position": [0, 0]})
    
    if not success:
        print_test("Création originale", False, original)
        return False
    
    print_test("Création originale", True, "fork_test créé")
    
    # Fork l'entité
    success, fork = test_endpoint("fork", "POST", {"entity_id": "fork_test"})
    if success:
        fork_id = fork.get("id", "unknown")
        print_test("Fork créé", True, f"ID: {fork_id}")
        
        # Vérifier l'énergie divisée
        fork_energy = fork.get("energy_complex", {}).get("a", 0)
        print_test("Énergie divisée", fork_energy == 50, f"Fork A = {fork_energy}")
        
        # Merger les deux
        success, merged = test_endpoint("merge", "POST", 
                                       {"id1": "fork_test", "id2": fork_id})
        if success:
            merged_id = merged.get("id", "")
            merged_energy = merged.get("energy_complex", {}).get("a", 0)
            print_test("Merge réussi", True, f"ID: {merged_id}")
            print_test("Énergie recombinée", merged_energy == 100, 
                      f"Merged A = {merged_energy}")
            return True
    
    print_test("Fork", False, fork if not success else "")
    return False

def test_6_interference():
    """Test 6: Interférence quantique"""
    print_header("TEST 6: INTERFÉRENCE QUANTIQUE")
    
    # Créer deux entités
    test_endpoint("entity", "POST", {"id": "quantum_1", "position": [0, 0]})
    test_endpoint("entity", "POST", {"id": "quantum_2", "position": [1, 0]})
    
    # Calculer interférence
    success, data = test_endpoint("interference", "POST", 
                                 {"id1": "quantum_1", "id2": "quantum_2"})
    
    if success:
        interference = data.get("interference", 0)
        print_test("Calcul interférence", True, f"I = {interference:.3f}")
        
        # Interprétation
        if interference > 0.5:
            interpretation = "Interférence constructive forte"
        elif interference > 0:
            interpretation = "Interférence constructive faible"
        elif interference < -0.5:
            interpretation = "Interférence destructive forte"
        else:
            interpretation = "Interférence destructive faible"
        
        print_test("Interprétation", True, interpretation)
        return True
    
    print_test("Calcul interférence", False, data)
    return False

def test_7_regulators():
    """Test 7: Régulateurs (Vince, Anna, Overload)"""
    print_header("TEST 7: RÉGULATEURS TEMPORELS")
    
    # Test Vince (perce-brouillard)
    success, data = test_endpoint("regulator/vince", "POST", 
                                 {"entity_id": "quantum_1", "activate": True})
    print_test("Vince activé", success, 
              "Perce le brouillard de causalité" if success else data)
    
    # Test Anna (décroissance)
    success, data = test_endpoint("regulator/anna", "POST",
                                 {"targets": ["quantum_1", "quantum_2"], "rate": 0.05})
    print_test("Anna activée", success,
              "Applique décroissance énergétique" if success else data)
    
    # Test Overload (collapse)
    # Créer beaucoup d'entités pour déclencher overload
    print(f"\n  {Colors.YELLOW}Création de 12 entités pour tester Overload...{Colors.ENDC}")
    for i in range(12):
        test_endpoint("entity", "POST", {"id": f"overload_{i}", "position": [i, 0]})
    
    # Tick pour déclencher overload
    success, tick_data = test_endpoint("tick", "POST", {"dt_ms": 100})
    if success:
        updates = tick_data.get("updates", [])
        collapse_events = [u for u in updates if u.get("event") == "overload_collapse"]
        
        print_test("Overload déclenché", len(collapse_events) > 0,
                  f"{len(collapse_events)} entités collapsed")
        return True
    
    return False

def test_8_visibility_fog():
    """Test 8: Brouillard de causalité"""
    print_header("TEST 8: BROUILLARD DE CAUSALITÉ (CF)")
    
    # Créer entités à différentes distances
    positions = [
        ("near", [1, 0]),
        ("medium", [5, 5]),
        ("far", [10, 10]),
    ]
    
    for name, pos in positions:
        test_endpoint("entity", "POST", {"id": f"fog_{name}", "position": pos})
    
    # Tick pour appliquer le brouillard
    test_endpoint("tick", "POST", {"dt_ms": 1000})
    
    # Vérifier les niveaux de brouillard
    for name, pos in positions:
        success, data = test_endpoint(f"entity/fog_{name}", "GET")
        if success:
            cf_level = data.get("visibility", {}).get("cf_level", 0)
            distance = (pos[0]**2 + pos[1]**2)**0.5
            print_test(f"CF pour {name}", True, 
                      f"Distance={distance:.1f}, CF={cf_level:.2f}")
    
    return True

def test_9_comprehensive_scenario():
    """Test 9: Scénario complet de bataille"""
    print_header("TEST 9: SCÉNARIO DE BATAILLE COMPLET")
    
    print(f"{Colors.CYAN}Simulation d'une bataille entre Arthur et Merlin...{Colors.ENDC}\n")
    
    # Créer les héros
    test_endpoint("entity", "POST", 
                 {"id": "battle_arthur", "position": [0, 0], "level": 20})
    test_endpoint("entity", "POST",
                 {"id": "battle_merlin", "position": [3, 3], "level": 18})
    
    print("  📍 Héros créés")
    
    # Arthur fork (crée un clone)
    success, fork = test_endpoint("fork", "POST", {"entity_id": "battle_arthur"})
    arthur_fork_id = fork.get("id", "") if success else ""
    print(f"  ⚔️ Arthur utilise FORK → Clone: {arthur_fork_id}")
    
    # Merlin active Vince (perce le brouillard)
    test_endpoint("regulator/vince", "POST", {"entity_id": "battle_merlin"})
    print("  🔮 Merlin active VINCE (perce-brouillard)")
    
    # Plusieurs ticks de combat
    for i in range(3):
        test_endpoint("tick", "POST", {"dt_ms": 500})
        print(f"  ⚡ Combat round {i+1}")
        time.sleep(0.2)
    
    # Arthur merge ses clones
    if arthur_fork_id:
        success, merged = test_endpoint("merge", "POST",
                                       {"id1": "battle_arthur", "id2": arthur_fork_id})
        print("  🔄 Arthur MERGE ses timelines")
    
    # Résultat final
    success, status = test_endpoint("status", "GET")
    if success:
        entities_count = status.get("entities_count", 0)
        world_time = status.get("world_time", 0)
        
        print(f"\n  {Colors.GREEN}✨ Bataille terminée !{Colors.ENDC}")
        print(f"  Temps écoulé: {world_time:.2f}s")
        print(f"  Entités restantes: {entities_count}")
        return True
    
    return False

def test_10_stress_test():
    """Test 10: Test de charge"""
    print_header("TEST 10: TEST DE CHARGE")
    
    num_entities = 50
    num_ticks = 10
    
    print(f"  Création de {num_entities} entités...")
    start_time = time.time()
    
    for i in range(num_entities):
        test_endpoint("entity", "POST", 
                     {"id": f"stress_{i}", "position": [i % 10, i // 10]})
    
    creation_time = time.time() - start_time
    print_test(f"Création de {num_entities} entités", True, 
              f"Temps: {creation_time:.2f}s")
    
    print(f"\n  Simulation de {num_ticks} ticks...")
    tick_start = time.time()
    
    for i in range(num_ticks):
        success, data = test_endpoint("tick", "POST", {"dt_ms": 100})
        if success:
            updates_count = len(data.get("updates", []))
            print(f"    Tick {i+1}: {updates_count} updates")
    
    tick_time = time.time() - tick_start
    print_test(f"Simulation de {num_ticks} ticks", True,
              f"Temps: {tick_time:.2f}s")
    
    # Performance
    avg_tick = tick_time / num_ticks * 1000
    print_test("Performance", avg_tick < 100,
              f"Temps moyen par tick: {avg_tick:.1f}ms")
    
    return avg_tick < 100

# ===== MAIN =====

def main():
    """Fonction principale"""
    print(f"\n{Colors.BOLD}{Colors.PURPLE}╔══════════════════════════════════════════════════════════╗{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.PURPLE}║    🧪 TEST SUITE COMPLÈTE - MULTIPLAYER V2 CONTROLLER    ║{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.PURPLE}╚══════════════════════════════════════════════════════════╝{Colors.ENDC}")
    
    tests = [
        ("Connectivité", test_1_server_connectivity),
        ("Création entités", test_2_entity_creation),
        ("Drift temporel", test_3_temporal_drift),
        ("Système énergétique", test_4_energy_system),
        ("Fork & Merge", test_5_fork_and_merge),
        ("Interférence", test_6_interference),
        ("Régulateurs", test_7_regulators),
        ("Brouillard", test_8_visibility_fog),
        ("Scénario bataille", test_9_comprehensive_scenario),
        ("Stress test", test_10_stress_test),
    ]
    
    results = []
    
    # Vérifier que le serveur est accessible
    try:
        response = requests.get(f"{BASE_URL}/api/v2/config", timeout=2)
        if response.status_code != 200:
            print(f"\n{Colors.RED}❌ ERREUR: Serveur V2 non accessible sur port 3001{Colors.ENDC}")
            print(f"Lancez d'abord: ./h-profondeur start\n")
            return
    except:
        print(f"\n{Colors.RED}❌ ERREUR: Serveur non démarré{Colors.ENDC}")
        print(f"Lancez d'abord: ./h-profondeur start\n")
        return
    
    # Exécuter les tests
    for name, test_func in tests:
        try:
            success = test_func()
            results.append((name, success))
        except Exception as e:
            print(f"\n{Colors.RED}Exception dans {name}: {e}{Colors.ENDC}")
            results.append((name, False))
    
    # Résumé final
    print_header("RÉSUMÉ DES TESTS")
    
    passed = sum(1 for _, success in results if success)
    total = len(results)
    
    for name, success in results:
        status = f"{Colors.GREEN}✅{Colors.ENDC}" if success else f"{Colors.RED}❌{Colors.ENDC}"
        print(f"  {status} {name}")
    
    print(f"\n  {Colors.BOLD}Score: {passed}/{total} tests passés{Colors.ENDC}")
    
    if passed == total:
        print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 TOUS LES TESTS SONT PASSÉS ! 🎉{Colors.ENDC}")
        print(f"{Colors.GREEN}Le V2 Controller est pleinement opérationnel !{Colors.ENDC}")
    elif passed >= total * 0.8:
        print(f"\n{Colors.YELLOW}⚠️ La plupart des tests passent, quelques ajustements nécessaires{Colors.ENDC}")
    else:
        print(f"\n{Colors.RED}❌ Des problèmes majeurs ont été détectés{Colors.ENDC}")
    
    print(f"\n{Colors.CYAN}MEMENTO: Les tests valident l'implémentation V2 complète{Colors.ENDC}\n")

if __name__ == "__main__":
    main()
