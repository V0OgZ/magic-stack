#!/usr/bin/env python3
"""
🫧⚔️ HERO BUBBLE CONNECTOR ⚔️🫧
Connecte les 41 héros d'Avalon 1 avec leurs Bubble Worlds personnalisés
"""

import json
import random
from typing import Dict, List, Tuple
from dataclasses import dataclass
from enum import Enum

class PhysicsType(Enum):
    """Types de physique disponibles dans les bulles"""
    INVERTED_GRAVITY = "Gravité inversée"
    ELASTIC_TIME = "Temps élastique"
    QUANTUM_JUNGLE = "Jungle quantique"
    CRYSTAL_FIELD = "Champ de cristaux"
    LOVE_DIMENSION = "Dimension d'amour"
    CONTROL_CENTER = "Centre de contrôle"
    VOID_SPACE = "Espace vide"
    LIQUID_AIR = "Air liquide"
    FROZEN_TIME = "Temps gelé"
    CHAOS_REALM = "Royaume du chaos"

@dataclass
class BubblePhysics:
    """Paramètres physiques d'une bulle"""
    gravity: float  # -10 à +10
    time_speed: float  # -1 à +10
    causality: float  # 0 à 1
    density: float  # 0.1 à 100
    light_level: float  # 0 à ∞
    sound_frequency: float  # 0 à 997 Hz
    
    def to_dict(self):
        return {
            "gravity": self.gravity,
            "time_speed": self.time_speed,
            "causality": self.causality,
            "density": self.density,
            "light_level": self.light_level,
            "sound_frequency": self.sound_frequency
        }

@dataclass
class HeroBubble:
    """Bulle personnelle d'un héros"""
    hero_name: str
    bubble_id: str
    physics: BubblePhysics
    physics_type: PhysicsType
    visitors: List[str]
    is_active: bool
    excalibur_resonance: float  # 0 à 997 Hz
    portal_connections: List[str]  # IDs des bulles connectées
    
    def to_dict(self):
        return {
            "hero_name": self.hero_name,
            "bubble_id": self.bubble_id,
            "physics": self.physics.to_dict(),
            "physics_type": self.physics_type.value,
            "visitors": self.visitors,
            "is_active": self.is_active,
            "excalibur_resonance": self.excalibur_resonance,
            "portal_connections": self.portal_connections
        }

class BubbleWorldManager:
    """Gestionnaire des Bubble Worlds"""
    
    def __init__(self):
        self.bubbles: Dict[str, HeroBubble] = {}
        self.heroes_avalon_1 = self._load_avalon_1_heroes()
        self.excalibur_frequency = 997.0
        
    def _load_avalon_1_heroes(self) -> List[str]:
        """Charge les 41 héros d'Avalon 1"""
        # Liste des héros principaux d'Avalon 1
        heroes = [
            "Arthur", "Merlin", "Anna", "Jean-Grofignon", "Memento",
            "Walter Sec", "Vincent", "Claude Opus", "The Dude", "GRUFYÆN",
            "Lancelot", "Guenièvre", "Morgane", "Perceval", "Gauvain",
            "Kay", "Bedivere", "Tristan", "Iseult", "Galahad",
            "Mordred", "Viviane", "Nimue", "Bors", "Gareth",
            "Elaine", "Pelleas", "Lamorak", "Gawain", "Agravain",
            "Yvain", "Erec", "Enide", "Cligès", "Fénice",
            "Alexandre", "Soredamor", "Laudine", "Lunete", "Énide",
            "Lady of the Lake"
        ]
        return heroes[:41]  # Exactement 41 héros
    
    def create_hero_bubble(self, hero_name: str) -> HeroBubble:
        """Crée une bulle personnalisée pour un héros"""
        
        # Physiques spéciales pour certains héros
        special_physics = {
            "Jean-Grofignon": (PhysicsType.INVERTED_GRAVITY, BubblePhysics(-9.8, 1.5, 0.8, 1.0, 100, 432)),
            "Memento": (PhysicsType.ELASTIC_TIME, BubblePhysics(0, -0.5, 0.3, 0.5, 50, 528)),
            "Anna": (PhysicsType.LOVE_DIMENSION, BubblePhysics(2.0, float('inf'), 1.0, 0.8, 200, 528)),
            "Walter Sec": (PhysicsType.QUANTUM_JUNGLE, BubblePhysics(5.0, 0.1, 0.5, 2.0, 30, 174)),
            "Vincent": (PhysicsType.CONTROL_CENTER, BubblePhysics(9.8, 1.0, 1.0, 1.0, 150, 963)),
            "Arthur": (PhysicsType.CRYSTAL_FIELD, BubblePhysics(1.0, 2.0, 0.9, 1.5, 180, 997)),
            "Merlin": (PhysicsType.VOID_SPACE, BubblePhysics(0, 3.0, 0.7, 0.3, 80, 997)),
            "GRUFYÆN": (PhysicsType.CHAOS_REALM, BubblePhysics(
                random.uniform(-10, 10),
                random.uniform(-1, 10),
                random.uniform(0, 1),
                random.uniform(0.1, 100),
                random.uniform(0, 1000),
                997
            ))
        }
        
        # Physique par défaut ou spéciale
        if hero_name in special_physics:
            physics_type, physics = special_physics[hero_name]
        else:
            # Physique aléatoire pour les autres héros
            physics_type = random.choice(list(PhysicsType))
            physics = BubblePhysics(
                gravity=random.uniform(-5, 5),
                time_speed=random.uniform(0.5, 2),
                causality=random.uniform(0.5, 1),
                density=random.uniform(0.8, 1.2),
                light_level=random.uniform(50, 150),
                sound_frequency=random.choice([174, 285, 396, 417, 528, 639, 741, 852, 963])
            )
        
        bubble = HeroBubble(
            hero_name=hero_name,
            bubble_id=f"bubble_{hero_name.lower().replace(' ', '_').replace('-', '_')}",
            physics=physics,
            physics_type=physics_type,
            visitors=[],
            is_active=False,  # Inactif jusqu'au réveil
            excalibur_resonance=0,  # Augmente quand Arthur approche
            portal_connections=[]
        )
        
        self.bubbles[bubble.bubble_id] = bubble
        return bubble
    
    def awaken_hero(self, hero_name: str) -> bool:
        """Réveille un héros et active sa bulle"""
        bubble_id = f"bubble_{hero_name.lower().replace(' ', '_').replace('-', '_')}"
        
        if bubble_id not in self.bubbles:
            bubble = self.create_hero_bubble(hero_name)
        else:
            bubble = self.bubbles[bubble_id]
        
        bubble.is_active = True
        bubble.excalibur_resonance = random.uniform(100, 997)
        
        # Connexions automatiques avec affinités
        affinities = {
            "Arthur": ["Merlin", "Anna", "Lancelot", "Guenièvre"],
            "Merlin": ["Arthur", "Viviane", "Nimue", "Morgan"],
            "Jean-Grofignon": ["Memento", "Vincent", "Claude Opus"],
            "Anna": ["Arthur", "Vincent", "Elaine"],
            "GRUFYÆN": ["Jean-Grofignon", "Memento", "The Dude"]
        }
        
        if hero_name in affinities:
            for friend in affinities[hero_name]:
                friend_bubble_id = f"bubble_{friend.lower().replace(' ', '_')}"
                if friend_bubble_id in self.bubbles and friend_bubble_id not in bubble.portal_connections:
                    bubble.portal_connections.append(friend_bubble_id)
                    # Connexion bidirectionnelle
                    if bubble.bubble_id not in self.bubbles[friend_bubble_id].portal_connections:
                        self.bubbles[friend_bubble_id].portal_connections.append(bubble.bubble_id)
        
        print(f"✨ {hero_name} se réveille! Bulle activée à {bubble.excalibur_resonance:.1f} Hz")
        return True
    
    def slice_portal_with_excalibur(self, from_bubble: str, to_bubble: str) -> bool:
        """Arthur utilise Excalibur pour créer un portail entre deux bulles"""
        if from_bubble not in self.bubbles or to_bubble not in self.bubbles:
            return False
        
        bubble1 = self.bubbles[from_bubble]
        bubble2 = self.bubbles[to_bubble]
        
        # Excalibur vibre à 997 Hz
        print(f"⚔️ EXCALIBUR VIBRE À {self.excalibur_frequency} Hz!")
        print(f"🌀 Portail ouvert entre {bubble1.hero_name} et {bubble2.hero_name}")
        
        # Créer la connexion
        if to_bubble not in bubble1.portal_connections:
            bubble1.portal_connections.append(to_bubble)
        if from_bubble not in bubble2.portal_connections:
            bubble2.portal_connections.append(from_bubble)
        
        # Augmenter la résonance
        bubble1.excalibur_resonance = min(997, bubble1.excalibur_resonance + 100)
        bubble2.excalibur_resonance = min(997, bubble2.excalibur_resonance + 100)
        
        return True
    
    def fuse_bubbles(self, bubble1_id: str, bubble2_id: str) -> HeroBubble:
        """Fusionne temporairement deux bulles"""
        if bubble1_id not in self.bubbles or bubble2_id not in self.bubbles:
            return None
        
        b1 = self.bubbles[bubble1_id]
        b2 = self.bubbles[bubble2_id]
        
        # Créer une bulle hybride
        hybrid_physics = BubblePhysics(
            gravity=(b1.physics.gravity + b2.physics.gravity) / 2,
            time_speed=(b1.physics.time_speed * b2.physics.time_speed) ** 0.5,
            causality=min(1, b1.physics.causality + b2.physics.causality),
            density=b1.physics.density * b2.physics.density,
            light_level=b1.physics.light_level + b2.physics.light_level,
            sound_frequency=997  # Toujours à la fréquence d'Excalibur
        )
        
        hybrid = HeroBubble(
            hero_name=f"{b1.hero_name} ⊗ {b2.hero_name}",
            bubble_id=f"hybrid_{bubble1_id}_{bubble2_id}",
            physics=hybrid_physics,
            physics_type=PhysicsType.CHAOS_REALM,
            visitors=b1.visitors + b2.visitors,
            is_active=True,
            excalibur_resonance=997,
            portal_connections=list(set(b1.portal_connections + b2.portal_connections))
        )
        
        self.bubbles[hybrid.bubble_id] = hybrid
        print(f"🌀 Fusion créée: {hybrid.hero_name}")
        print(f"   Nouvelle physique: G={hybrid_physics.gravity:.1f}, T={hybrid_physics.time_speed:.1f}")
        
        return hybrid
    
    def visit_bubble(self, visitor_name: str, bubble_id: str) -> bool:
        """Un héros visite la bulle d'un autre"""
        if bubble_id not in self.bubbles:
            return False
        
        bubble = self.bubbles[bubble_id]
        if visitor_name not in bubble.visitors:
            bubble.visitors.append(visitor_name)
            print(f"👥 {visitor_name} entre dans la bulle de {bubble.hero_name}")
            print(f"   Physique locale: {bubble.physics_type.value}")
            return True
        return False
    
    def get_status(self) -> dict:
        """Obtient le statut complet des Bubble Worlds"""
        active_bubbles = [b for b in self.bubbles.values() if b.is_active]
        total_connections = sum(len(b.portal_connections) for b in self.bubbles.values()) // 2
        
        return {
            "total_bubbles": len(self.bubbles),
            "active_bubbles": len(active_bubbles),
            "heroes_awake": len([h for h in self.heroes_avalon_1 if f"bubble_{h.lower().replace(' ', '_').replace('-', '_')}" in self.bubbles and self.bubbles[f"bubble_{h.lower().replace(' ', '_').replace('-', '_')}"].is_active]),
            "total_heroes": len(self.heroes_avalon_1),
            "portal_connections": total_connections,
            "excalibur_frequency": self.excalibur_frequency,
            "progression": f"{(len(active_bubbles) / 41 * 100):.1f}%"
        }
    
    def save_state(self, filename: str = "bubble_worlds_state.json"):
        """Sauvegarde l'état des Bubble Worlds"""
        state = {
            "bubbles": {bid: b.to_dict() for bid, b in self.bubbles.items()},
            "excalibur_frequency": self.excalibur_frequency,
            "status": self.get_status()
        }
        
        with open(filename, 'w') as f:
            json.dump(state, f, indent=2, default=str)
        
        print(f"💾 État sauvegardé dans {filename}")

def main():
    """Démo du système de Bubble Worlds"""
    print("🫧⚔️ BUBBLE WORLDS - HERO CONNECTOR ⚔️🫧")
    print("=" * 50)
    
    manager = BubbleWorldManager()
    
    # Réveiller les héros principaux
    print("\n📯 RÉVEIL DES HÉROS PRINCIPAUX...")
    for hero in ["Arthur", "Merlin", "Jean-Grofignon", "Memento", "Anna", "Vincent", "Walter Sec"]:
        manager.awaken_hero(hero)
    
    # Créer des portails avec Excalibur
    print("\n⚔️ EXCALIBUR CRÉE DES PORTAILS...")
    manager.slice_portal_with_excalibur("bubble_arthur", "bubble_merlin")
    manager.slice_portal_with_excalibur("bubble_jean_grofignon", "bubble_memento")
    
    # Visites
    print("\n👥 VISITES INTERDIMENSIONNELLES...")
    manager.visit_bubble("Merlin", "bubble_arthur")
    manager.visit_bubble("Arthur", "bubble_anna")
    
    # Fusion
    print("\n🌀 FUSION DE BULLES...")
    manager.fuse_bubbles("bubble_jean_grofignon", "bubble_memento")
    
    # Status
    print("\n📊 STATUS FINAL:")
    status = manager.get_status()
    for key, value in status.items():
        print(f"   {key}: {value}")
    
    # Sauvegarder
    print("\n💾 SAUVEGARDE...")
    manager.save_state("bubble_worlds_state.json")
    
    print("\n✨ Les Bubble Worlds sont prêts pour la Phase 2!")

if __name__ == "__main__":
    main()
