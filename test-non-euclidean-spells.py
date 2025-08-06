#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🌀⚡ TEST DES SORTS NON-EUCLIDIENS ⚡🌀

Test complet des sorts du Mage Géométrique intégrés dans Heroes of Time
Crédit complet au Mage Géométrique pour ses créations impossibles !
"""

import requests
import json
import time
from datetime import datetime

# Configuration
JAVA_BACKEND = "http://localhost:8080"
NON_EUCLIDEAN_BASE = f"{JAVA_BACKEND}/api/non-euclidean"

def print_banner():
    print("🌀⚡ HEROES OF TIME - TEST DES SORTS NON-EUCLIDIENS ⚡🌀")
    print("═" * 60)
    print("🎯 Test des créations du Mage Géométrique")
    print("🔮 Intégrées avec respect par Mage Claude")
    print("")

def test_backend_health():
    """Test de santé du backend"""
    print("🏥 Test de santé du backend...")
    try:
        response = requests.get(f"{JAVA_BACKEND}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Backend Java ONLINE")
            return True
        else:
            print(f"❌ Backend Java erreur: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend Java OFFLINE: {e}")
        return False

def test_spell_list():
    """Test de la liste des sorts disponibles"""
    print("\n📊 Test de la liste des sorts non-euclidiens...")
    
    try:
        response = requests.get(f"{NON_EUCLIDEAN_BASE}/spells", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Liste des sorts récupérée")
            
            spells = data.get('spells', {})
            print(f"🌀 {len(spells)} sorts disponibles:")
            
            for spell_id, spell_info in spells.items():
                name = spell_info.get('name', 'Unknown')
                level = spell_info.get('level', 0)
                description = spell_info.get('description', 'No description')
                print(f"  • {name} (Lv.{level}): {description}")
            
            credit = data.get('credit', 'No credit')
            print(f"\n🎯 {credit}")
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_klein_bottle_reality():
    """Test du sort Klein Bottle Reality"""
    print("\n🌀 Test de Klein Bottle Reality...")
    
    request_data = {
        "target_area": {"x": 0, "y": 0, "z": 0, "radius": 50},
        "duration": 120
    }
    
    try:
        response = requests.post(
            f"{NON_EUCLIDEAN_BASE}/klein-bottle",
            json=request_data,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Klein Bottle Reality lancé avec succès!")
            
            message = data.get('message', 'No message')
            print(f"📜 Message: {message}")
            
            transformation = data.get('transformation', {})
            topology = transformation.get('topology', 'unknown')
            print(f"🔄 Topologie: {topology}")
            
            gameplay = data.get('gameplay_effects', {})
            if gameplay.get('inside_outside_confusion'):
                print("🤯 Effet: L'intérieur est devenu l'extérieur!")
            
            gravity_zones = gameplay.get('gravity_reversal_zones', [])
            print(f"🌀 {len(gravity_zones)} zones de gravité inversée générées")
            
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_mobius_battlefield():
    """Test du sort Möbius Battlefield"""
    print("\n♾️ Test de Möbius Battlefield...")
    
    request_data = {
        "target_area": {"x": 0, "y": 0, "z": 0},
        "width": 80,
        "height": 15
    }
    
    try:
        response = requests.post(
            f"{NON_EUCLIDEAN_BASE}/mobius-battlefield",
            json=request_data,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Möbius Battlefield créé avec succès!")
            
            message = data.get('message', 'No message')
            print(f"📜 Message: {message}")
            
            surface = data.get('surface', [])
            print(f"🎯 Surface de Möbius: {len(surface)} points générés")
            
            gameplay = data.get('gameplay_effects', {})
            if gameplay.get('no_edges'):
                print("♾️ Effet: Champ de bataille sans bords!")
            if gameplay.get('continuous_chase'):
                print("🏃 Effet: Poursuite continue possible!")
            
            # Vérifier quelques points de la surface
            if surface:
                sample_point = surface[len(surface)//2]
                x, y, z = sample_point.get('x', 0), sample_point.get('y', 0), sample_point.get('z', 0)
                print(f"📍 Point échantillon: ({x:.2f}, {y:.2f}, {z:.2f})")
            
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_tesseract_prison():
    """Test du sort Tesseract Prison"""
    print("\n🔒 Test de Tesseract Prison...")
    
    request_data = {
        "targets": ["enemy_boss_001", "enemy_minion_002"],
        "center": {"x": 10, "y": 5, "z": 0, "w": 0}
    }
    
    try:
        response = requests.post(
            f"{NON_EUCLIDEAN_BASE}/tesseract-prison",
            json=request_data,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Tesseract Prison construit avec succès!")
            
            message = data.get('message', 'No message')
            print(f"📜 Message: {message}")
            
            imprisoned = data.get('imprisoned_targets', [])
            print(f"🔒 Cibles emprisonnées: {', '.join(imprisoned)}")
            
            tesseract = data.get('tesseract_structure', {})
            cubes = tesseract.get('cubes', [])
            print(f"🧊 Tesseract: {len(cubes)} cubes 4D générés")
            
            prison_mechanics = data.get('prison_mechanics', {})
            difficulty = prison_mechanics.get('escape_difficulty', 'unknown')
            time_dilation = prison_mechanics.get('time_dilation', 1.0)
            print(f"⏰ Difficulté d'évasion: {difficulty}")
            print(f"🕐 Dilatation temporelle: {time_dilation}x")
            
            # Vérifier les connexions 4D
            if cubes:
                cube_sample = cubes[0]
                connections = cube_sample.get('connections', [])
                print(f"🔗 Connexions 4D du premier cube: {len(connections)} connexions")
            
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_hyperbolic_warp():
    """Test du sort Hyperbolic Space Warp"""
    print("\n🎯 Test de Hyperbolic Space Warp...")
    
    request_data = {
        "center": {"x": 0, "y": 0, "z": 0},
        "radius": 75,
        "curvature": -1.5
    }
    
    try:
        response = requests.post(
            f"{NON_EUCLIDEAN_BASE}/hyperbolic-warp",
            json=request_data,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Hyperbolic Space Warp appliqué avec succès!")
            
            message = data.get('message', 'No message')
            print(f"📜 Message: {message}")
            
            warp_params = data.get('warp_parameters', {})
            curvature = warp_params.get('curvature', 0)
            geometry_type = warp_params.get('geometry_type', 'unknown')
            print(f"📐 Type de géométrie: {geometry_type}")
            print(f"🌀 Courbure: {curvature}")
            
            projectile_effects = data.get('projectile_effects', {})
            if projectile_effects.get('curved_trajectories'):
                print("🎯 Effet: Trajectoires de projectiles courbées!")
            
            geodesic_paths = projectile_effects.get('geodesic_paths', [])
            print(f"📈 {len(geodesic_paths)} chemins géodésiques générés")
            
            vertex_shader = data.get('vertex_shader', '')
            if vertex_shader:
                print("🎨 Shader de déformation hyperbolique généré")
            
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def test_fractal_cascade():
    """Test du sort Fractal Dimension Cascade"""
    print("\n🌌 Test de Fractal Dimension Cascade...")
    
    request_data = {
        "max_depth": 4,
        "fractal_type": "mandelbrot",
        "seed_point": {"x": 0, "y": 0, "z": 0}
    }
    
    try:
        response = requests.post(
            f"{NON_EUCLIDEAN_BASE}/fractal-cascade",
            json=request_data,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Fractal Dimension Cascade généré avec succès!")
            
            message = data.get('message', 'No message')
            print(f"📜 Message: {message}")
            
            fractal_type = data.get('fractal_type', 'unknown')
            print(f"🌀 Type de fractale: {fractal_type}")
            
            levels = data.get('levels_generated', [])
            print(f"📊 {len(levels)} niveaux fractals générés")
            
            total_entities = 0
            for level in levels:
                depth = level.get('depth', 0)
                scale = level.get('scale', 1.0)
                entities = level.get('entities', [])
                entity_count = len(entities)
                total_entities += entity_count
                print(f"  📈 Niveau {depth}: échelle {scale:.3f}, {entity_count} entités")
            
            print(f"🎯 Total: {total_entities} entités fractales créées")
            
            navigation = data.get('navigation_mechanics', {})
            if navigation.get('infinite_depth'):
                print("♾️ Effet: Profondeur infinie activée!")
            if navigation.get('zoom_creates_levels'):
                print("🔍 Effet: Zoom crée de nouveaux niveaux!")
            
            return True
            
        else:
            print(f"❌ Erreur {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur lors du test: {e}")
        return False

def run_performance_test():
    """Test de performance des sorts non-euclidiens"""
    print("\n⚡ Test de performance des sorts non-euclidiens...")
    
    spells_to_test = [
        ("klein-bottle", {"target_area": {"x": 0, "y": 0, "z": 0, "radius": 25}, "duration": 30}),
        ("mobius-battlefield", {"target_area": {"x": 0, "y": 0, "z": 0}, "width": 50, "height": 10}),
        ("hyperbolic-warp", {"center": {"x": 0, "y": 0, "z": 0}, "radius": 30, "curvature": -0.5}),
    ]
    
    results = []
    
    for spell_endpoint, test_data in spells_to_test:
        print(f"⚡ Test de performance: {spell_endpoint}")
        
        times = []
        success_count = 0
        
        for i in range(5):  # 5 tests par sort
            try:
                start_time = time.time()
                response = requests.post(
                    f"{NON_EUCLIDEAN_BASE}/{spell_endpoint}",
                    json=test_data,
                    timeout=10
                )
                end_time = time.time()
                
                if response.status_code == 200:
                    duration = (end_time - start_time) * 1000  # en ms
                    times.append(duration)
                    success_count += 1
                    print(f"  ✅ Test {i+1}: {duration:.1f}ms")
                else:
                    print(f"  ❌ Test {i+1}: Erreur {response.status_code}")
                    
            except Exception as e:
                print(f"  💥 Test {i+1}: Exception {e}")
        
        if times:
            avg_time = sum(times) / len(times)
            min_time = min(times)
            max_time = max(times)
            
            results.append({
                'spell': spell_endpoint,
                'success_rate': f"{success_count}/5",
                'avg_time': f"{avg_time:.1f}ms",
                'min_time': f"{min_time:.1f}ms",
                'max_time': f"{max_time:.1f}ms"
            })
            
            print(f"  📊 Moyenne: {avg_time:.1f}ms (min: {min_time:.1f}ms, max: {max_time:.1f}ms)")
        else:
            results.append({
                'spell': spell_endpoint,
                'success_rate': "0/5",
                'avg_time': "N/A",
                'min_time': "N/A", 
                'max_time': "N/A"
            })
    
    print("\n📊 RÉSUMÉ DES PERFORMANCES:")
    print("┌─────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┐")
    print("│ Sort                │ Succès      │ Temps Moy   │ Min         │ Max         │")
    print("├─────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┤")
    
    for result in results:
        spell = result['spell'][:19].ljust(19)
        success = result['success_rate'].ljust(11)
        avg = result['avg_time'].ljust(11)
        min_t = result['min_time'].ljust(11)
        max_t = result['max_time'].ljust(11)
        print(f"│ {spell} │ {success} │ {avg} │ {min_t} │ {max_t} │")
    
    print("└─────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┘")

def main():
    """Test principal"""
    print_banner()
    
    # Test de santé
    if not test_backend_health():
        print("💥 Backend non disponible, arrêt des tests")
        return
    
    # Tests des sorts
    tests = [
        ("Liste des sorts", test_spell_list),
        ("Klein Bottle Reality", test_klein_bottle_reality),
        ("Möbius Battlefield", test_mobius_battlefield), 
        ("Tesseract Prison", test_tesseract_prison),
        ("Hyperbolic Space Warp", test_hyperbolic_warp),
        ("Fractal Dimension Cascade", test_fractal_cascade)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n{'='*60}")
        print(f"🧪 TEST: {test_name}")
        print(f"{'='*60}")
        
        try:
            success = test_func()
            results.append((test_name, "✅ SUCCÈS" if success else "❌ ÉCHEC"))
        except Exception as e:
            print(f"💥 Erreur inattendue: {e}")
            results.append((test_name, "💥 ERREUR"))
    
    # Test de performance
    run_performance_test()
    
    # Résumé final
    print(f"\n{'='*60}")
    print("🏆 RÉSUMÉ FINAL DES TESTS NON-EUCLIDIENS")
    print(f"{'='*60}")
    
    success_count = 0
    for test_name, result in results:
        print(f"{result} {test_name}")
        if "SUCCÈS" in result:
            success_count += 1
    
    total_tests = len(results)
    success_rate = (success_count / total_tests) * 100
    
    print(f"\n📊 TAUX DE SUCCÈS: {success_count}/{total_tests} ({success_rate:.1f}%)")
    
    if success_rate >= 80:
        print("🎉 EXCELLENT! Les sorts du Mage Géométrique sont bien intégrés!")
    elif success_rate >= 60:
        print("👍 BIEN! La plupart des sorts fonctionnent correctement!")
    else:
        print("⚠️ ATTENTION! Plusieurs sorts nécessitent des corrections!")
    
    print(f"\n🌀 Crédit complet au Mage Géométrique pour ses sorts révolutionnaires!")
    print(f"🔮 Intégration respectueuse par Mage Claude - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"⚡ Heroes of Time - Géométrie Impossible Activée! ⚡")

if __name__ == "__main__":
    main()