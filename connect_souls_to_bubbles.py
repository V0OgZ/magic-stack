#!/usr/bin/env python3
"""
Connecteur Frozen Souls → Bubble Worlds
Intègre les 82 âmes dans le système de bulles
"""

import json
import os
import sys
from pathlib import Path

# Ajouter SpinForest au path pour importer le hero_bubble_connector
spinforest_path = Path("/Volumes/HOT_DEV/Main/SpinForest/BALLON_CUBE/BUBBLE_WORLDS")
if spinforest_path.exists():
    sys.path.insert(0, str(spinforest_path))
    try:
        from hero_bubble_connector import BubbleWorldManager, BubblePhysics, PhysicsType
        BUBBLE_AVAILABLE = True
    except ImportError:
        BUBBLE_AVAILABLE = False
        print("⚠️ hero_bubble_connector non disponible")
else:
    BUBBLE_AVAILABLE = False

class FrozenSoulsIntegrator:
    def __init__(self):
        self.souls_mapping = self.load_souls_mapping()
        self.bubble_manager = BubbleWorldManager() if BUBBLE_AVAILABLE else None
        self.awakened_count = 0
        self.frozen_count = 0
        
    def load_souls_mapping(self):
        """Charge le mapping des âmes depuis frozen_souls_mapping.json"""
        with open('frozen_souls_mapping.json', 'r') as f:
            return json.load(f)
    
    def create_hero_profile(self, name, data):
        """Crée un profil complet pour un héros"""
        profile = {
            "name": name,
            "images": data.get("images", []),
            "bubble_id": data.get("bubble_id"),
            "status": data.get("status", "frozen"),
            "resonance": data.get("resonance", 0),
            "primary_image": f"_FROZENSOULS/{data['images'][0]}" if data.get("images") else None,
            "phi_value": data.get("phi_value", None)
        }
        
        # Déterminer la physique selon le héros
        if name == "Jean-Grofignon":
            profile["physics"] = "inverted_gravity"
        elif name == "Memento":
            profile["physics"] = "elastic_time"
        elif name == "Anna":
            profile["physics"] = "love_dimension"
        elif name == "Walter Sec":
            profile["physics"] = "quantum_jungle"
        elif name == "Vincent":
            profile["physics"] = "control_center"
        elif name == "Arthur":
            profile["physics"] = "crystal_field"
        elif name == "Merlin":
            profile["physics"] = "void_space"
        else:
            profile["physics"] = "standard"
            
        return profile
    
    def awaken_soul(self, hero_name, profile):
        """Réveille une âme et crée sa bulle"""
        print(f"\n⚔️ Réveil de {hero_name}...")
        print(f"   Image principale: {profile['primary_image']}")
        print(f"   Résonance: {profile['resonance']} Hz")
        
        if profile.get("phi_value"):
            print(f"   Valeur Phi: {profile['phi_value']}")
        
        if self.bubble_manager:
            # Créer la bulle dans le système
            self.bubble_manager.awaken_hero(hero_name)
            print(f"   ✅ Bulle créée: {profile['bubble_id']}")
        
        self.awakened_count += 1
        return True
    
    def process_all_souls(self):
        """Traite toutes les âmes"""
        print("=" * 60)
        print("🌟 INTÉGRATION FROZEN SOULS → BUBBLE WORLDS")
        print("=" * 60)
        
        # Traiter les héros réveillés
        print("\n📯 HÉROS DÉJÀ RÉVEILLÉS:")
        for name, data in self.souls_mapping["soul_mappings"]["heroes_awakened"].items():
            profile = self.create_hero_profile(name, data)
            if data["status"] == "awakened":
                print(f"✅ {name} - Déjà actif à {data['resonance']} Hz")
                self.awakened_count += 1
        
        # Traiter les héros gelés
        print("\n❄️ HÉROS ENCORE GELÉS:")
        for name, data in self.souls_mapping["soul_mappings"]["heroes_frozen"].items():
            profile = self.create_hero_profile(name, data)
            print(f"❄️ {name} - En attente de réveil")
            self.frozen_count += 1
            
            # Réveiller quelques héros clés
            if name in ["Lancelot", "Morgane", "Lumen"]:
                if input(f"   Réveiller {name} maintenant? (y/n): ").lower() == 'y':
                    data["status"] = "awakening"
                    data["resonance"] = 500
                    self.awaken_soul(name, profile)
        
        # Afficher les objets de pouvoir
        print("\n⚔️ OBJETS DE POUVOIR:")
        for obj_name, data in self.souls_mapping["soul_mappings"]["objects_power"].items():
            print(f"🔮 {obj_name} - Pouvoir: {data['power']}")
            if obj_name == "Excalibur":
                print(f"   Fréquence: {data['frequency']} Hz")
        
        # Afficher les lieux
        print("\n🌍 LIEUX MYSTIQUES:")
        for loc_name, data in self.souls_mapping["soul_mappings"]["locations"].items():
            print(f"📍 {loc_name} - Status: {data['status']}")
            if loc_name == "Interstice":
                print(f"   Entités: {data['entities']} UIs perdues")
        
        # Créer les connexions spéciales
        if self.bubble_manager and BUBBLE_AVAILABLE:
            print("\n🌀 CRÉATION DES PORTAILS EXCALIBUR:")
            self.bubble_manager.slice_portal_with_excalibur("bubble_arthur", "bubble_anna")
            print("   ⚔️ Portail Arthur ↔ Anna créé!")
            
        # Sauvegarder l'état
        self.save_integration_state()
        
        # Rapport final
        self.print_final_report()
    
    def save_integration_state(self):
        """Sauvegarde l'état de l'intégration"""
        state = {
            "integration_complete": True,
            "awakened_heroes": self.awakened_count,
            "frozen_heroes": self.frozen_count,
            "total_souls": 82,
            "phi_equation": self.souls_mapping["phi_equation"],
            "timestamp": "Jour 44 - 21h45"
        }
        
        with open('souls_integration_state.json', 'w') as f:
            json.dump(state, f, indent=2)
        
        print("\n💾 État sauvegardé dans souls_integration_state.json")
    
    def print_final_report(self):
        """Affiche le rapport final"""
        print("\n" + "=" * 60)
        print("📊 RAPPORT FINAL D'INTÉGRATION")
        print("=" * 60)
        
        total = self.awakened_count + self.frozen_count
        progress = (self.awakened_count / 41) * 100 if total > 0 else 0
        
        print(f"""
        🌟 Âmes totales: 82
        ✅ Héros réveillés: {self.awakened_count}/41
        ❄️ Héros gelés: {self.frozen_count}/41
        📊 Progression: {progress:.1f}%
        
        📐 Équation Phi:
           Arthur: 1.0
           Merlin: 0.3 (présent)
           Anna: 0.318 (manquante)
           Total: {self.souls_mapping['phi_equation']['total']}
           
        ⚔️ Excalibur: 997 Hz
        🌀 Interstice: 437 UIs
        🫧 Bubble Worlds: {"Connectés!" if BUBBLE_AVAILABLE else "À connecter"}
        """)
        
        print("\n✨ Les Frozen Souls sont maintenant intégrées!")
        print("💫 L'Œuvre continue...")

def main():
    """Lance l'intégration"""
    print("❄️⚔️ FROZEN SOULS → BUBBLE WORLDS CONNECTOR ⚔️❄️")
    
    # Vérifier qu'on est dans le bon dossier
    if not os.path.exists('frozen_souls_mapping.json'):
        print("❌ frozen_souls_mapping.json non trouvé!")
        print("   Lancez depuis magic-stack/")
        return
    
    integrator = FrozenSoulsIntegrator()
    integrator.process_all_souls()
    
    print("\n🎯 Pour continuer:")
    print("1. cd /Volumes/HOT_DEV/Main/SpinForest/BALLON_CUBE/BUBBLE_WORLDS")
    print("2. python3 hero_bubble_connector.py")
    print("3. Ouvrir bubble_worlds_v2.html")
    
    print("\n⚔️ Excalibur vibre à 997 Hz...")
    print("💙 Anna t'attend à 0.318...")

if __name__ == "__main__":
    main()
