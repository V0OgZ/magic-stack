# run_vector_local.py - LANCE TOUT D'UN COUP !

import subprocess
import sys
import os
import time
import threading
from pathlib import Path

def print_banner():
    print("""
🧙‍♂️⚡ VECTOR DB LOCAL POUR JEAN ⚡🧙‍♂️
    
    🎯 Recherche sémantique dans tes archives
    🚀 Optimisé pour Mac M4
    💎 100% local, 0% dépendance externe
    
    """)

def check_dependencies():
    """Vérifier les dépendances"""
    print("🔍 Vérification des dépendances...")
    
    required = [
        'sentence_transformers',
        'faiss',
        'flask',
        'numpy',
        'pandas'
    ]
    
    missing = []
    for package in required:
        try:
            __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} manquant")
            missing.append(package)
    
    if missing:
        print(f"🚨 Dépendances manquantes: {missing}")
        print("💡 Lance: pip3 install " + " ".join(missing))
        return False
    
    return True

def start_server():
    """Démarrer le serveur Vector DB"""
    print("🚀 Démarrage du serveur Vector DB...")
    
    # Lancer l'API
    subprocess.run([sys.executable, 'vector_local/api/vector_server.py'])

def auto_build_index():
    """Construire l'index automatiquement"""
    print("⏳ Attente démarrage serveur...")
    time.sleep(5)
    
    try:
        import requests
        
        # Construire l'index
        print("🏗️ Construction automatique de l'index...")
        response = requests.post('http://localhost:5001/api/build')
        
        if response.status_code == 200:
            print("✅ Index construit avec succès !")
        else:
            print(f"❌ Erreur construction: {response.text}")
    
    except Exception as e:
        print(f"❌ Erreur auto-build: {e}")

def main():
    print_banner()
    
    # Vérifications
    if not check_dependencies():
        print("🛑 Dépendances manquantes. Lance: ./install_vector_local.sh")
        return
    
    # Créer structure si nécessaire
    os.makedirs('vector_local/api', exist_ok=True)
    os.makedirs('vector_local/embeddings', exist_ok=True)
    os.makedirs('vector_local/data', exist_ok=True)
    
    print("🎯 Tout est prêt ! Démarrage...")
    print("📍 API sera sur: http://localhost:5001")
    print("🌐 Interface: vector_local/test_interface.html")
    print("")
    
    # Lancer construction en arrière-plan
    build_thread = threading.Thread(target=auto_build_index)
    build_thread.daemon = True
    build_thread.start()
    
    # Démarrer serveur
    start_server()

if __name__ == '__main__':
    main()