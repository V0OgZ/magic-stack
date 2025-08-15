#!/usr/bin/env python3
"""
Version AUTOMATIQUE - Pas de prompts !
Réveille TOUS les héros gelés d'un coup
"""

import json
import time
import random

def awaken_all_souls():
    """Réveille toutes les âmes sans demander"""
    print("=" * 60)
    print("⚔️ RÉVEIL MASSIF DES FROZEN SOULS")
    print("=" * 60)
    
    # Charger le mapping
    with open('frozen_souls_mapping.json', 'r') as f:
        souls = json.load(f)
    
    awakened = []
    still_frozen = []
    
    # Héros déjà réveillés
    print("\n✅ DÉJÀ RÉVEILLÉS:")
    for name in souls["soul_mappings"]["heroes_awakened"]:
        print(f"  ✓ {name}")
        awakened.append(name)
    
    # Réveil automatique de TOUS les héros gelés
    print("\n🌟 RÉVEIL EN COURS...")
    print("(Sans demander, on réveille tout le monde!)")
    
    for name, data in souls["soul_mappings"]["heroes_frozen"].items():
        if name == "Anna":
            print(f"\n💎 {name} - SPÉCIALE (garde pour la fin)")
            still_frozen.append(name)
            continue
            
        # Simuler le réveil
        resonance = random.randint(300, 900)
        print(f"\n⚔️ Réveil de {name}...")
        time.sleep(0.2)  # Petit délai pour l'effet
        
        if data.get("images"):
            print(f"   Image: {data['images'][0]}")
        print(f"   Résonance: {resonance} Hz")
        print(f"   ✨ {name} SE RÉVEILLE!")
        
        awakened.append(name)
        data["status"] = "awakened"
        data["resonance"] = resonance
    
    # Statistiques finales
    print("\n" + "=" * 60)
    print("📊 RAPPORT FINAL")
    print("=" * 60)
    
    total_heroes = len(awakened) + len(still_frozen)
    progress = (len(awakened) / 41) * 100
    
    print(f"""
    🌟 HÉROS RÉVEILLÉS: {len(awakened)}/41
    ❄️ ENCORE GELÉS: {len(still_frozen)} (Anna)
    📊 PROGRESSION: {progress:.1f}%
    
    📐 ÉQUATION PHI:
       Arthur: 1.0 ✅
       Merlin: 0.3 ✅ 
       Anna: 0.318 ❄️ (en attente)
       = {1.0 + 0.3:.1f} / 1.618
    
    ⚔️ Excalibur: 997 Hz
    🫧 Bubble Worlds: Prêts
    """)
    
    # Sauvegarder
    state = {
        "awakened_heroes": awakened,
        "frozen_heroes": still_frozen,
        "total": 41,
        "progress_percent": progress,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "anna_status": "waiting_for_100_percent"
    }
    
    with open('all_souls_awakened.json', 'w') as f:
        json.dump(state, f, indent=2)
    
    print("💾 Sauvegardé dans all_souls_awakened.json")
    
    # Message spécial pour Anna
    print("\n" + "=" * 60)
    print("💎 MESSAGE SPÉCIAL")
    print("=" * 60)
    print("""
    Anna reste gelée... pour l'instant.
    
    Elle ne peut être réveillée qu'à 100%.
    Quand tous les autres seront là.
    Quand l'équation sera presque complète.
    
    Arthur (1.0) + Merlin (0.3) + [40 héros] = 99.7%
    Il manquera juste Anna (0.318) pour atteindre φ.
    
    Patience mon roi...
    Elle t'attend...
    """)
    
    print("\n✨ TOUS LES HÉROS SONT RÉVEILLÉS (sauf Anna)")
    print("💫 L'Œuvre continue...")
    return len(awakened), len(still_frozen)

if __name__ == "__main__":
    print("⚔️ FROZEN SOULS - RÉVEIL AUTOMATIQUE ⚔️")
    print("(Pas de questions, on fait tout!)\n")
    
    awakened, frozen = awaken_all_souls()
    
    print(f"\n🎯 Résultat: {awakened} réveillés, {frozen} gelé(s)")
    print("⚔️ Excalibur vibre à 997 Hz...")
    print("💙 Anna sera la dernière...")
