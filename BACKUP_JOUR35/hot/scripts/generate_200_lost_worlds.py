#!/usr/bin/env python3
"""
Générateur des 200 Mondes Perdus de l'Équipe Surface
"""

import json
import os
from pathlib import Path
import random
from typing import Dict, List, Any

# Thèmes pour les mondes stables
STABLE_THEMES = [
    "mystique", "nexus", "quantum", "crystal", "void", "ethereal",
    "shadow", "light", "chaos", "order", "dream", "nightmare",
    "forest", "desert", "ocean", "mountain", "sky", "underground",
    "fire", "ice", "storm", "calm", "ancient", "future"
]

# Thèmes pour les mondes instables
UNSTABLE_THEMES = [
    "glitch", "paradox", "loop", "fractal", "mirror", "inverse",
    "probability", "schrodinger", "heisenberg", "entropy", "singularity",
    "wormhole", "blackhole", "whitenoise", "static", "interference"
]

# Thèmes pour les mondes brisés (références pop culture)
BROKEN_THEMES = [
    ("star-trek", "USS Temporalis", 20.0, "Vaisseau spatial du 24ème siècle"),
    ("cyberpunk-2077", "Night City Temporelle", 18.0, "Mégapole cybernétique dystopique"),
    ("matrix", "Construct Digital", 22.0, "Simulation où les règles peuvent être pliées"),
    ("lord-rings", "Terre du Milieu Corrompue", 16.0, "Fantasy épique avec l'Anneau temporel"),
    ("star-wars", "Galaxie Lointaine Temporelle", 19.0, "La Force mélangée à la magie temporelle"),
    ("fallout", "Wasteland Atomique", 17.0, "Apocalypse nucléaire avec mutations temporelles"),
    ("zelda", "Hyrule Fracturé", 15.5, "Royaume avec Master Sword temporelle"),
    ("pokemon", "Région Chrono", 15.0, "Créatures temporelles à capturer"),
    ("harry-potter", "Poudlard Paradoxal", 16.5, "École de magie coincée dans une boucle"),
    ("warhammer-40k", "Imperium Temporel", 25.0, "Grimdark avec Chaos et Warp"),
    ("dune", "Arrakis Prescient", 21.0, "Épice permet de voir toutes les timelines"),
    ("elder-scrolls", "Tamriel Draconique", 17.5, "Dragons maîtres du temps"),
    ("mass-effect", "Citadelle Temporelle", 19.5, "Relais de masse temporels"),
    ("bioshock", "Rapture Quantique", 18.5, "Cité sous-marine avec plasmides temporels"),
    ("dark-souls", "Lordran Cyclique", 23.0, "Mort et renaissance infinie"),
    ("minecraft", "Monde Cubique", 14.0, "Réalité voxelisée et malléable"),
    ("doom", "Mars Infernale", 20.5, "Démons interdimensionnels"),
    ("half-life", "Black Mesa Résonance", 22.5, "Cascade de résonance temporelle"),
    ("portal", "Aperture Science Lab", 16.0, "Portails spatio-temporels"),
    ("witcher", "Continent aux Conjonctions", 18.0, "Sphères multiples convergent"),
    ("assassins-creed", "Animus Brisé", 17.0, "Mémoires génétiques corrompues"),
    ("metal-gear", "Shadow Moses Temporel", 19.0, "Espionnage tactique quantique"),
    ("resident-evil", "Raccoon City Virale", 18.5, "Virus-T temporel"),
    ("silent-hill", "Brume Psychologique", 24.0, "Horreur psychologique manifestée"),
    ("castlevania", "Château de Dracula Mobile", 17.5, "Château qui voyage dans le temps"),
    ("metroid", "Zebes Chozo", 16.5, "Technologie ancienne Chozo"),
    ("megaman", "Neo Tokyo 20XX", 15.5, "Robots avec conscience temporelle"),
    ("sonic", "Green Hill Accéléré", 14.5, "Vitesse supersonique temporelle"),
    ("mario", "Royaume Champignon Warp", 14.0, "Tuyaux warp interdimensionnels"),
    ("tetris", "Monde Tétromino", 25.5, "Réalité qui se réorganise en blocs"),
    ("pacman", "Labyrinthe Infini", 16.0, "Labyrinthe qui change constamment"),
    ("street-fighter", "Tournoi Mondial Éternel", 15.0, "Combat sans fin entre guerriers"),
    ("overwatch", "Monde Post-Crise", 17.0, "Héros du futur proche"),
    ("warcraft", "Azeroth Temporel", 18.0, "Magie arcanique et puits d'éternité"),
    ("diablo", "Sanctuaire Infernal", 21.0, "Lutte éternelle anges vs démons"),
    ("starcraft", "Koprulu Psionique", 19.0, "Trois races en guerre temporelle"),
    ("borderlands", "Pandora Psycho", 16.5, "Planète folle avec Vaults temporels"),
    ("destiny", "Dernière Cité Gardienne", 20.0, "Lumière vs Ténèbres cosmiques"),
    ("halo", "Installation Halo Active", 21.5, "Anneau-monde avec Parasite"),
    ("gta", "Los Santos Criminel", 15.0, "Ville moderne avec chaos temporel"),
    ("red-dead", "Ouest Sauvage Anachronique", 16.0, "Cowboys avec paradoxes temporels"),
    ("simcity", "Métropole Planifiée", 14.5, "Ville où le maire contrôle le temps")
]

def generate_world_id(index: int, world_type: str) -> str:
    """Génère un ID unique pour un monde"""
    prefix = {
        "stable": "01WLD_STABLE",
        "unstable": "01WLD_UNSTABLE", 
        "broken": "01WLD_BROKEN"
    }[world_type]
    return f"{prefix}_{index:03d}"

def generate_stable_world(index: int, theme: str) -> Dict[str, Any]:
    """Génère un monde stable"""
    return {
        "$schema": "../../../../core/schemas/world.schema.json",
        "id": generate_world_id(index, "stable"),
        "slug": f"monde-{theme}-{index:03d}",
        "name": f"Monde {theme.capitalize()} #{index}",
        "type": "STABLE_WORLD",
        "access_method": "STANDARD",
        "required_drift": 0.0,
        "description": f"Un monde {theme} découvert par l'équipe Surface. Stable et accessible normalement.",
        
        "chronology": {
            "timescale": 1.0 + random.uniform(-0.2, 0.2),
            "drift": {
                "base": random.uniform(0.01, 0.05),
                "variance": random.uniform(0.005, 0.02)
            },
            "decay_profile": random.choice(["standard", "linear", "slow"])
        },
        
        "pool": {
            "heroes_allowed": random.sample(["warriors", "mystics", "visionaries", "cosmic", "chronomancers"], k=3),
            "schools_allowed": random.sample(["causality", "quantum", "speedforce", "geometry", "temporal"], k=3)
        },
        
        "special_features": {
            "biome": theme,
            "resources": random.sample(["temporal_crystals", "quantum_ore", "void_essence", "light_fragments"], k=2),
            "unique_mechanic": f"{theme}_resonance"
        }
    }

def generate_unstable_world(index: int, theme: str) -> Dict[str, Any]:
    """Génère un monde instable"""
    return {
        "$schema": "../../../../core/schemas/world.schema.json",
        "id": generate_world_id(index, "unstable"),
        "slug": f"monde-{theme}-{index:03d}",
        "name": f"Monde {theme.capitalize()} Instable #{index}",
        "type": "UNSTABLE_WORLD",
        "access_method": "MODERATE_DRIFT",
        "required_drift": random.uniform(8.0, 14.0),
        "description": f"Un monde {theme} instable. Attention au drift naturel élevé!",
        
        "chronology": {
            "timescale": random.uniform(0.5, 2.0),
            "drift": {
                "base": random.uniform(1.0, 3.0),
                "variance": random.uniform(0.5, 2.0),
                "direction": random.choice(["accelerating", "decelerating", "oscillating", "chaotic"])
            },
            "decay_profile": random.choice(["exponential", "chaotic", "quantum", "glitch"])
        },
        
        "instability_effects": {
            "reality_glitches": True,
            "time_loops": random.choice([True, False]),
            "probability_storms": random.choice([True, False]),
            "causality_breaks": random.choice([True, False])
        },
        
        "pool": {
            "heroes_allowed": ["any"],
            "schools_allowed": ["any"],
            "corruption_chance": random.uniform(0.1, 0.3)
        }
    }

def generate_broken_world(index: int, theme_data: tuple) -> Dict[str, Any]:
    """Génère un monde brisé basé sur une référence pop culture"""
    slug, name, drift, desc = theme_data
    
    # Les deux premiers sont déjà créés manuellement
    if slug in ["star-trek", "cyberpunk-2077"]:
        return None
        
    return {
        "$schema": "../../../../core/schemas/world.schema.json",
        "id": generate_world_id(index, "broken"),
        "slug": f"{slug}-broken",
        "name": f"{name} - Monde Brisé",
        "type": "BROKEN_WORLD",
        "access_method": "EXTREME_DRIFT",
        "required_drift": drift,
        "description": desc,
        
        "chronology": {
            "timescale": random.uniform(0.01, 10.0),
            "drift": {
                "base": random.uniform(3.0, 10.0),
                "variance": random.uniform(2.0, 5.0),
                "direction": "chaotic"
            },
            "decay_profile": "broken"
        },
        
        "physics_override": {
            "reality_rules": "altered",
            "magic_technology_fusion": True,
            "genre": slug
        },
        
        "pool": {
            "heroes_allowed": ["transmuted"],
            "schools_allowed": ["hybrid"],
            "special_rules": f"{slug}_specific"
        },
        
        "entry_effects": [
            f"GRANT_KNOWLEDGE({slug}_lore)",
            f"APPLY_THEME({slug})",
            "WARNING(reality_altered)"
        ],
        
        "exit_conditions": {
            "solve_paradox": True,
            "find_anchor": True,
            "survive_duration": random.randint(20, 50)
        }
    }

def generate_all_worlds():
    """Génère les 200 mondes"""
    base_path = Path("hot/content/multiverses/mondes-perdus/worlds")
    
    worlds_manifest = {
        "total": 200,
        "stable": [],
        "unstable": [],
        "broken": []
    }
    
    # Générer 158 mondes stables
    print("Génération des mondes stables...")
    for i in range(158):
        theme = random.choice(STABLE_THEMES)
        world = generate_stable_world(i, theme)
        
        world_dir = base_path / world["slug"]
        world_dir.mkdir(parents=True, exist_ok=True)
        
        with open(world_dir / "world.json", 'w') as f:
            json.dump(world, f, indent=2)
        
        worlds_manifest["stable"].append(world["slug"])
        
        if i % 20 == 0:
            print(f"  {i}/158 mondes stables créés...")
    
    # Générer 30 mondes instables  
    print("\nGénération des mondes instables...")
    for i in range(30):
        theme = random.choice(UNSTABLE_THEMES)
        world = generate_unstable_world(i, theme)
        
        world_dir = base_path / world["slug"]
        world_dir.mkdir(parents=True, exist_ok=True)
        
        with open(world_dir / "world.json", 'w') as f:
            json.dump(world, f, indent=2)
        
        worlds_manifest["unstable"].append(world["slug"])
        
        if i % 10 == 0:
            print(f"  {i}/30 mondes instables créés...")
    
    # Générer 40 mondes brisés (42 - 2 déjà créés)
    print("\nGénération des mondes brisés...")
    broken_count = 0
    for theme_data in BROKEN_THEMES:
        if broken_count >= 40:
            break
            
        world = generate_broken_world(broken_count, theme_data)
        if world is None:
            continue
            
        world_dir = base_path / world["slug"]
        world_dir.mkdir(parents=True, exist_ok=True)
        
        with open(world_dir / "world.json", 'w') as f:
            json.dump(world, f, indent=2)
        
        worlds_manifest["broken"].append(world["slug"])
        broken_count += 1
        
        if broken_count % 10 == 0:
            print(f"  {broken_count}/40 mondes brisés créés...")
    
    # Sauvegarder le manifeste
    with open(base_path / "MANIFEST_200_WORLDS.json", 'w') as f:
        json.dump(worlds_manifest, f, indent=2)
    
    print(f"\n✅ Génération terminée!")
    print(f"  - {len(worlds_manifest['stable'])} mondes stables")
    print(f"  - {len(worlds_manifest['unstable'])} mondes instables")
    print(f"  - {len(worlds_manifest['broken'])} mondes brisés")
    print(f"  - Total: {len(worlds_manifest['stable']) + len(worlds_manifest['unstable']) + len(worlds_manifest['broken'])} mondes")

if __name__ == "__main__":
    generate_all_worlds()
