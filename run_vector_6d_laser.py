# 🚀🔮 LANCEUR VECTOR 6D RETRO LASER 🔮🚀
# GOODORQCK LASER LAUNCHER FOR JEAN !

import subprocess
import sys
import os
import time
import threading
from pathlib import Path

def print_retro_laser_banner():
    print("""
🚀🔮⚡ VECTOR 6D RETRO LASER EDITION ⚡🔮🚀

    ████████╗██╗  ██╗███████╗    ██╗      █████╗ ███████╗███████╗██████╗ 
    ╚══██╔══╝██║  ██║██╔════╝    ██║     ██╔══██╗██╔════╝██╔════╝██╔══██╗
       ██║   ███████║█████╗      ██║     ███████║███████╗█████╗  ██████╔╝
       ██║   ██╔══██║██╔══╝      ██║     ██╔══██║╚════██║██╔══╝  ██╔══██╗
       ██║   ██║  ██║███████╗    ███████╗██║  ██║███████║███████╗██║  ██║
       ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
    
    🧙‍♂️ HEROES OF TIME 6D VECTOR CAVE 🧙‍♂️
    ⚡ GOODORQCK LASER MODE ACTIVATED ⚡
    🌟 Recherche spatiotemporelle causale 🌟
    🔥 LASER POWER: MAXIMUM 🔥
    
    """)

def check_laser_dependencies():
    """🔍 Vérifier dépendances laser"""
    print("🔍 VÉRIFICATION DÉPENDANCES LASER...")
    
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
            print(f"✅ {package} - LASER READY")
        except ImportError:
            print(f"❌ {package} - LASER OFFLINE")
            missing.append(package)
    
    if missing:
        print(f"🚨 DÉPENDANCES MANQUANTES: {missing}")
        print("💡 Lance: pip3 install " + " ".join(missing))
        return False
    
    print("✅ TOUTES DÉPENDANCES LASER READY!")
    return True

def start_6d_laser_server():
    """🚀 Démarrer serveur Vector 6D Laser"""
    print("🚀 DÉMARRAGE SERVEUR 6D LASER...")
    
    # Lancer l'API 6D
    subprocess.run([sys.executable, 'vector_local/api/vector_server_6d.py'])

def auto_build_6d_index():
    """🏗️ Construire index 6D automatiquement"""
    print("⏳ ATTENTE DÉMARRAGE LASER SERVER...")
    time.sleep(8)
    
    try:
        import requests
        
        print("🏗️ CONSTRUCTION AUTOMATIQUE INDEX 6D...")
        response = requests.post('http://localhost:5002/api/build')
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ {data['message']}")
            print(f"⚡ {data['entities_indexed']} entités indexées!")
            print(f"🔥 {data['laser_status']}")
        else:
            print(f"❌ Erreur construction: {response.text}")
    
    except Exception as e:
        print(f"❌ Erreur auto-build: {e}")

def open_laser_playground():
    """🎮 Ouvrir playground retro laser"""
    print("⏳ ATTENTE SERVEUR LASER...")
    time.sleep(10)
    
    try:
        import webbrowser
        print("🎮 OUVERTURE PLAYGROUND RETRO LASER...")
        webbrowser.open('http://localhost:5002/api/playground')
        print("✅ PLAYGROUND OUVERT DANS NAVIGATEUR!")
    except Exception as e:
        print(f"❌ Erreur ouverture playground: {e}")
        print("💡 Ouvre manuellement: http://localhost:5002/api/playground")

def main():
    print_retro_laser_banner()
    
    # Vérifications laser
    if not check_laser_dependencies():
        print("🛑 LASER OFFLINE - Dépendances manquantes")
        print("💡 Lance: ./install_vector_local.sh")
        return
    
    # Créer structure laser si nécessaire
    os.makedirs('vector_local/api', exist_ok=True)
    os.makedirs('vector_local/embeddings', exist_ok=True)
    os.makedirs('vector_local/data', exist_ok=True)
    
    print("🎯 LASER SYSTEMS READY!")
    print("📍 Serveur 6D sur: http://localhost:5002")
    print("🎮 Playground sur: http://localhost:5002/api/playground")
    print("🔮 Endpoints API:")
    print("   📊 GET  /api/status      - Status laser")
    print("   🏗️ POST /api/build       - Build index 6D")
    print("   🔍 POST /api/search/6d   - Recherche 6D")
    print("   📋 GET  /api/entities    - Liste entités")
    print("   🎮 GET  /api/playground  - Interface retro")
    print("")
    print("⚡ GOODORQCK LASER ACTIVATION EN COURS... ⚡")
    print("")
    
    # Lancer construction en arrière-plan
    build_thread = threading.Thread(target=auto_build_6d_index)
    build_thread.daemon = True
    build_thread.start()
    
    # Lancer playground en arrière-plan
    playground_thread = threading.Thread(target=open_laser_playground)
    playground_thread.daemon = True
    playground_thread.start()
    
    # Démarrer serveur laser
    start_6d_laser_server()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n🔥 LASER SHUTDOWN INITIATED 🔥")
        print("⚡ GOODORQCK LASER DEACTIVATED ⚡")
        print("🧙‍♂️ À bientôt dans la Cave 6D ! 🧙‍♂️")