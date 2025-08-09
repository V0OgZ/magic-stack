#!/usr/bin/env python3
"""
🚀 TEST FORMULE TEMPORELLE 6D
Test de recherche temporelle dans l'espace 6D
"""

import requests
import json
import time

def test_temporal_formula():
    """Test formule temporelle Heroes of Time"""
    
    print("🔮 TEST FORMULE TEMPORELLE 6D")
    print("=" * 50)
    
    # 1. Vérifier status serveur
    try:
        response = requests.get("http://localhost:5002/api/status", timeout=2)
        if response.status_code == 200:
            status = response.json()
            print(f"✅ Serveur Vector 6D actif")
            print(f"   Entités indexées: {status.get('entities_indexed', 0)}")
        else:
            print("❌ Serveur ne répond pas correctement")
            return
    except:
        print("❌ Serveur Vector 6D pas lancé sur port 5002")
        print("💡 Lance d'abord: python3 vector_local/api/vector_server_6d.py")
        return
    
    # 2. Construire index si nécessaire
    if status.get('entities_indexed', 0) == 0:
        print("\n🏗️ Construction index 6D...")
        response = requests.post("http://localhost:5002/api/build")
        if response.status_code == 200:
            build_result = response.json()
            print(f"✅ Index construit: {build_result['entities_indexed']} entités")
        else:
            print("❌ Erreur construction index")
            return
    
    # 3. FORMULE TEMPORELLE: Recherche entités à t=1000 ±100
    print("\n⏰ FORMULE TEMPORELLE: Recherche à t=1000 (±100)")
    print("-" * 40)
    
    temporal_query = {
        "type": "temporal",
        "query": {
            "time": 1000,       # Point temporel central
            "time_radius": 100  # Rayon de recherche temporelle
        },
        "top_k": 5
    }
    
    print(f"📍 Point temporel: {temporal_query['query']['time']}")
    print(f"⭕ Rayon temporel: ±{temporal_query['query']['time_radius']}")
    
    response = requests.post(
        "http://localhost:5002/api/search/6d",
        json=temporal_query
    )
    
    if response.status_code == 200:
        results = response.json()
        search_results = results.get('search_results', {})
        
        print(f"\n🎯 {search_results.get('total_found', 0)} entités trouvées")
        print("-" * 40)
        
        for i, result in enumerate(search_results.get('results', [])[:5], 1):
            entity = result['entity']
            print(f"\n{i}. {entity['name']}")
            print(f"   Type: {entity['entity_type']}")
            print(f"   Position 6D: {entity['position_6d']}")
            print(f"   Distance temporelle: {result.get('time_distance', 'N/A')}")
            print(f"   Temps entité: t={result.get('entity_time', 'N/A')}")
    
    # 4. TEST FORMULE COMBINÉE 6D
    print("\n\n🌟 FORMULE COMBINÉE 6D: Héros niveau 40+ proche temporellement")
    print("-" * 40)
    
    combined_query = {
        "type": "combined_6d",
        "query": {
            "position_6d": [0, 0, 0, 1000, 0.7, 0.8],  # Position cible
            "semantic_text": "héros puissant magicien",
            "weights": [0, 0, 0, 2, 1, 1, 1]  # Poids fort sur le temps
        },
        "top_k": 3
    }
    
    response = requests.post(
        "http://localhost:5002/api/search/6d",
        json=combined_query
    )
    
    if response.status_code == 200:
        results = response.json()
        search_results = results.get('search_results', {})
        
        for i, result in enumerate(search_results.get('results', [])[:3], 1):
            entity = result['entity']
            print(f"\n{i}. {entity['name']}")
            print(f"   Score: {result.get('score', 'N/A')}")
            print(f"   Position 6D: {result['position_6d']}")

if __name__ == "__main__":
    test_temporal_formula()
