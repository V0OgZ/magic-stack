#!/usr/bin/env python3
"""
Test d'intégration Combat/TCG pour Magic Stack
Auteur: URZ-KÔM
Mission: JOUR 8 - Vérification intégration système combat
"""

import json
import sys
import os
from magic_core import MagicCore

class CombatTCGSimulator:
    """Simulateur simple du système de combat TCG"""
    
    def __init__(self):
        self.heroes = {
            "mage": {
                "name": "Mage Testeur",
                "level": 8,
                "hp": 100,
                "max_hp": 100,
                "mana": 120,
                "max_mana": 120,
                "atk": 12,
                "def": 8,
                "spd": 10,
                "position": [20, 25],
                "action_points": 3,
                "artifacts": ["amulette_de_mana"],
                "status_effects": []
            }
        }
        
        self.enemies = [
            {
                "name": "Gobelin 1",
                "hp": 25,
                "max_hp": 25,
                "atk": 8,
                "def": 4,
                "position": [25, 30]
            },
            {
                "name": "Gobelin 2", 
                "hp": 25,
                "max_hp": 25,
                "atk": 8,
                "def": 4,
                "position": [18, 32]
            }
        ]
        
        self.battlefield = {
            "width": 50,
            "height": 50,
            "obstacles": [[30, 30], [31, 30], [32, 30]]
        }
        
        self.turn = 1
        self.combat_log = []
    
    def log(self, message):
        """Ajouter message au log de combat"""
        self.combat_log.append(f"Tour {self.turn}: {message}")
        print(f"🎮 Tour {self.turn}: {message}")
    
    def cast_spell(self, hero_name, spell_data, target_pos=None):
        """Simuler le lancement d'un sort en combat"""
        hero = self.heroes.get(hero_name)
        if not hero:
            return False, "Héros non trouvé"
        
        # Vérifier le mana
        cout_mana = spell_data.get("cout_mana", 0)
        if hero["mana"] < cout_mana:
            return False, f"Mana insuffisant ({hero['mana']}/{cout_mana})"
        
        # Vérifier les points d'action
        action_cost = self.get_action_cost(spell_data)
        if hero["action_points"] < action_cost:
            return False, f"Points d'action insuffisants ({hero['action_points']}/{action_cost})"
        
        # Calculer les effets selon le type de sort
        effet = spell_data.get("effet", {})
        if isinstance(effet, str):
            spell_type = "unknown"
        else:
            spell_type = effet.get("type", "unknown")
        
        if spell_type == "deplacement":
            return self.handle_teleportation(hero, spell_data, target_pos)
        elif spell_type == "invocation":
            return self.handle_invocation(hero, spell_data, target_pos)
        elif spell_type == "protection":
            return self.handle_protection(hero, spell_data)
        else:
            return self.handle_generic_spell(hero, spell_data)
    
    def get_action_cost(self, spell_data):
        """Calculer le coût en points d'action"""
        niveau = spell_data.get("niveau", 1)
        if niveau <= 2:
            return 1
        elif niveau <= 4:
            return 2
        else:
            return 3
    
    def handle_teleportation(self, hero, spell_data, target_pos):
        """Gérer la téléportation"""
        if not target_pos:
            return False, "Position cible requise pour téléportation"
        
        # Vérifier la portée
        portee = spell_data.get("effet", {}).get("portee", 30)
        distance = ((target_pos[0] - hero["position"][0])**2 + 
                   (target_pos[1] - hero["position"][1])**2)**0.5
        
        if distance > portee:
            return False, f"Cible trop éloignée ({distance:.1f} > {portee})"
        
        # Vérifier que la position est libre
        if target_pos in [e["position"] for e in self.enemies]:
            return False, "Position occupée par un ennemi"
        
        # Appliquer la téléportation
        old_pos = hero["position"].copy()
        hero["position"] = target_pos
        hero["mana"] -= spell_data["cout_mana"]
        hero["action_points"] -= self.get_action_cost(spell_data)
        
        self.log(f"{hero['name']} se téléporte de {old_pos} vers {target_pos}")
        return True, "Téléportation réussie"
    
    def handle_invocation(self, hero, spell_data, target_pos):
        """Gérer l'invocation de créature"""
        if not target_pos:
            target_pos = [hero["position"][0] + 2, hero["position"][1]]
        
        # Vérifier que la zone est libre
        if target_pos in [e["position"] for e in self.enemies]:
            return False, "Zone d'invocation occupée"
        
        # Créer la créature invoquée
        creatures = spell_data.get("effet", {}).get("creatures_possibles", ["ours_spectral"])
        creature_type = creatures[0]  # Prendre la première par défaut
        
        creature_stats = {
            "ours_spectral": {"atk": 15, "def": 12, "hp": 30},
            "loup_des_brumes": {"atk": 12, "def": 8, "hp": 20},
            "aigle_temporel": {"atk": 10, "def": 6, "hp": 15}
        }
        
        stats = creature_stats.get(creature_type, {"atk": 10, "def": 8, "hp": 20})
        
        # Ajouter la créature comme allié
        creature = {
            "name": creature_type.replace("_", " ").title(),
            "type": "invoked",
            "hp": stats["hp"],
            "max_hp": stats["hp"],
            "atk": stats["atk"],
            "def": stats["def"],
            "position": target_pos,
            "turns_remaining": spell_data.get("effet", {}).get("duree", 5),
            "owner": hero["name"]
        }
        
        if "allies" not in self.heroes:
            self.heroes["allies"] = []
        self.heroes["allies"].append(creature)
        
        hero["mana"] -= spell_data["cout_mana"]
        hero["action_points"] -= self.get_action_cost(spell_data)
        
        self.log(f"{hero['name']} invoque {creature['name']} en {target_pos}")
        return True, f"{creature['name']} invoqué avec succès"
    
    def handle_protection(self, hero, spell_data):
        """Gérer les sorts de protection"""
        duree = spell_data.get("effet", {}).get("duree", 3)
        bonus_def = 5  # Bonus défense standard
        
        # Ajouter l'effet de statut
        protection_effect = {
            "type": "protection",
            "bonus_def": bonus_def,
            "turns_remaining": duree
        }
        hero["status_effects"].append(protection_effect)
        
        hero["mana"] -= spell_data["cout_mana"]
        hero["action_points"] -= self.get_action_cost(spell_data)
        
        self.log(f"{hero['name']} active une protection (+{bonus_def} DEF pour {duree} tours)")
        return True, f"Protection activée (+{bonus_def} DEF)"
    
    def handle_generic_spell(self, hero, spell_data):
        """Gérer les sorts génériques"""
        hero["mana"] -= spell_data["cout_mana"]
        hero["action_points"] -= self.get_action_cost(spell_data)
        
        self.log(f"{hero['name']} lance {spell_data['nom']}")
        return True, f"Sort {spell_data['nom']} lancé"
    
    def get_combat_state(self):
        """Obtenir l'état actuel du combat"""
        return {
            "turn": self.turn,
            "heroes": self.heroes,
            "enemies": self.enemies,
            "log": self.combat_log[-5:]  # 5 dernières entrées
        }

def test_combat_integration():
    """Test principal d'intégration combat"""
    print("🎮 DÉMARRAGE TEST INTÉGRATION COMBAT/TCG")
    print("=" * 50)
    
    # Initialiser le simulateur de combat
    combat = CombatTCGSimulator()
    magic_core = MagicCore()
    
    # Charger les sorts de test
    test_spells = [
        "grimoire/sort_teleportation.json",
        "grimoire/sort_invocation.json", 
        "grimoire/sort_protection.json"
    ]
    
    results = []
    
    for spell_file in test_spells:
        if not os.path.exists(spell_file):
            print(f"❌ Fichier manquant: {spell_file}")
            continue
            
        print(f"\n🔮 Test du sort: {spell_file}")
        print("-" * 30)
        
        # Charger le sort
        try:
            with open(spell_file, 'r', encoding='utf-8') as f:
                spell_data = json.load(f)
        except Exception as e:
            print(f"❌ Erreur chargement: {e}")
            results.append({"spell": spell_file, "status": "FAILED", "error": str(e)})
            continue
        
        # Tester en combat
        spell_name = spell_data.get("nom", "unknown")
        effet = spell_data.get("effet", {})
        if isinstance(effet, str):
            spell_type = "unknown"
        else:
            spell_type = effet.get("type", "unknown")
        
        # État avant
        hero_before = combat.heroes["mage"].copy()
        print(f"Héros avant: Mana {hero_before['mana']}, Actions {hero_before['action_points']}")
        
        # Lancer le sort
        if spell_type == "deplacement":
            success, message = combat.cast_spell("mage", spell_data, [35, 40])
        elif spell_type == "invocation":
            success, message = combat.cast_spell("mage", spell_data, [22, 27])
        else:
            success, message = combat.cast_spell("mage", spell_data)
        
        # État après
        hero_after = combat.heroes["mage"]
        print(f"Héros après: Mana {hero_after['mana']}, Actions {hero_after['action_points']}")
        
        if success:
            print(f"✅ {message}")
            results.append({
                "spell": spell_name,
                "status": "SUCCESS",
                "message": message,
                "mana_used": hero_before["mana"] - hero_after["mana"],
                "actions_used": hero_before["action_points"] - hero_after["action_points"]
            })
        else:
            print(f"❌ {message}")
            results.append({
                "spell": spell_name,
                "status": "FAILED", 
                "error": message
            })
    
    # Afficher le résumé
    print("\n" + "=" * 50)
    print("📊 RÉSUMÉ DES TESTS COMBAT/TCG")
    print("=" * 50)
    
    success_count = sum(1 for r in results if r["status"] == "SUCCESS")
    total_count = len(results)
    
    print(f"Tests réussis: {success_count}/{total_count}")
    print(f"Taux de réussite: {success_count/total_count*100:.1f}%")
    
    for result in results:
        status_icon = "✅" if result["status"] == "SUCCESS" else "❌"
        print(f"{status_icon} {result['spell']}: {result.get('message', result.get('error', 'Unknown'))}")
    
    # État final du combat
    print(f"\n🎮 État final du combat:")
    state = combat.get_combat_state()
    hero = state["heroes"]["mage"]
    print(f"Héros: {hero['hp']}/{hero['max_hp']} HP, {hero['mana']}/{hero['max_mana']} Mana")
    
    if "allies" in state["heroes"]:
        for ally in state["heroes"]["allies"]:
            print(f"Allié: {ally['name']} - {ally['hp']}/{ally['max_hp']} HP")
    
    return success_count == total_count

if __name__ == "__main__":
    success = test_combat_integration()
    if success:
        print("\n🎉 TOUS LES TESTS COMBAT/TCG PASSÉS !")
        sys.exit(0)
    else:
        print("\n💥 CERTAINS TESTS ONT ÉCHOUÉ !")
        sys.exit(1)