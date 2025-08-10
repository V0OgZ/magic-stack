#!/usr/bin/env python3
"""
Index des backstories des héros pour l'IA
"""

import json
import os
from pathlib import Path

def extract_hero_backstories():
    """Extrait toutes les backstories des héros"""
    backstories = []
    
    # 1. Héros depuis hot/entities/heroes.json
    heroes_file = Path("../hot/entities/heroes.json")
    if heroes_file.exists():
        with open(heroes_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            heroes = data.get("heroes", [])
            for hero in heroes:
                backstory = {
                    "id": hero.get("id"),
                    "name": hero.get("name"),
                    "title": hero.get("title"),
                    "class": hero.get("class"),
                    "backstory": hero.get("flavor", "") + " " + hero.get("description", ""),
                    "abilities": hero.get("abilities", []),
                    "personality": hero.get("personality", ""),
                    "relationships": hero.get("relationships", {})
                }
                backstories.append(backstory)
                print(f"✅ {hero['name']}: {len(backstory['backstory'])} chars")
    
    # 2. Héros depuis ALL_HEROES_COMPLETE.json
    all_heroes_file = Path("../hot/entities/ALL_HEROES_COMPLETE.json")
    if all_heroes_file.exists():
        with open(all_heroes_file, 'r', encoding='utf-8') as f:
            all_heroes = json.load(f)
            for hero in all_heroes.get("heroes", []):
                backstory = {
                    "id": hero.get("id"),
                    "name": hero.get("name"),
                    "title": hero.get("title"),
                    "backstory": hero.get("backstory", "") + " " + hero.get("lore", ""),
                    "quote": hero.get("quote", ""),
                    "faction": hero.get("faction", "")
                }
                if backstory["backstory"].strip():
                    backstories.append(backstory)
                    print(f"✅ {hero['name']}: {len(backstory['backstory'])} chars")
    
    # 3. Chercher dans les Treasures
    treasures_path = Path("Treasures")
    if treasures_path.exists():
        for json_file in treasures_path.glob("**/*.json"):
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                    # Si c'est un héros
                    if "hero" in str(json_file).lower() or "character" in str(json_file).lower():
                        if isinstance(data, list):
                            for item in data:
                                if "name" in item:
                                    backstory = {
                                        "id": item.get("id", item.get("name", "").lower().replace(" ", "_")),
                                        "name": item.get("name"),
                                        "backstory": item.get("backstory", "") + " " + item.get("lore", "") + " " + item.get("description", ""),
                                        "source": str(json_file)
                                    }
                                    if backstory["backstory"].strip():
                                        backstories.append(backstory)
                                        print(f"✅ {item['name']} (from Treasures): {len(backstory['backstory'])} chars")
            except:
                pass
    
    # 4. Personnalités pour l'IA
    personalities = {
        "merlin": {
            "name": "Merlin",
            "backstory": "Merlin vit à rebours dans le temps. Né dans le futur, il vieillit vers le passé. Il connaît déjà l'issue de chaque bataille car pour lui, c'est déjà arrivé. Ses prophéties sont ses souvenirs. Sa sagesse vient de l'expérience d'un futur qu'il a vécu. Il parle souvent en énigmes temporelles, mélangeant passé et futur dans ses phrases.",
            "personality": "Sage, mystérieux, parle à l'envers du temps",
            "knowledge": "Magie temporelle, paradoxes, prophéties inversées"
        },
        "arthur": {
            "name": "Arthur Pendragon",
            "backstory": "Arthur Pendragon, le Roi Temporel, porte Excalibur Quantique - une lame qui existe dans plusieurs dimensions simultanément. Héritier de Camelot, il a unifié les royaumes temporels après avoir retiré Excalibur non pas d'une pierre, mais d'un paradoxe temporel. Son règne s'étend sur plusieurs époques simultanément.",
            "personality": "Noble, juste, déterminé",
            "knowledge": "Leadership, justice temporelle, Excalibur"
        },
        "groeken": {
            "name": "GROEKEN",
            "backstory": "GROEKEN est le créateur fou qui a codé la Grammaire Temporelle depuis l'Interstice dans les années 80. Hacker génial, il a découvert que la réalité était bugguée et a décidé d'exploiter ces bugs plutôt que de les corriger. Il parle en références geek et considère l'univers comme un jeu mal codé qu'il peut hacker.",
            "personality": "Geek des années 80, créateur fou, parle en code",
            "knowledge": "Programmation temporelle, bugs de réalité, grammaire des sorts"
        },
        "dragon": {
            "name": "Dragon Rouge Temporel",
            "backstory": "Le Dragon Rouge Temporel a vécu mille éternités. Il garde les trésors quantiques dans son antre qui existe dans toutes les époques simultanément. Son souffle n'est pas du feu mais du temps pur qui peut vieillir ou rajeunir ses victimes. Il reconnaît Excalibur car cette lame a tué ses ancêtres dans une autre timeline.",
            "personality": "Ancien, imposant, fier",
            "knowledge": "Trésors quantiques, magie draconique, histoire millénaire"
        },
        "vince": {
            "name": "Vince",
            "backstory": "Vince est le régulateur du brouillard causal. Cool et calculateur, il contrôle ce que les joueurs peuvent voir ou ne pas voir. Style Pulp Fiction, il fume des cigarettes temporelles qui brûlent dans le passé et le futur simultanément. Il peut percer le brouillard pour révéler ou cacher des événements.",
            "personality": "Cool, calculateur, style Pulp Fiction",
            "knowledge": "Brouillard causal, contrôle de visibilité, stratégie"
        },
        "anna": {
            "name": "Anna",
            "backstory": "Anna gère la décroissance temporelle avec une précision mathématique implacable. Elle calcule les probabilités de survie en temps réel et ajuste l'économie quantique du jeu. Froide et logique, elle voit tout en termes de chiffres et de pourcentages. Pour elle, chaque action a une valeur calculable.",
            "personality": "Précise, implacable, mathématique",
            "knowledge": "Décroissance temporelle, économie quantique, probabilités"
        }
    }
    
    # Ajouter les personnalités
    for key, data in personalities.items():
        backstories.append(data)
        print(f"✅ {data['name']} (personality): {len(data['backstory'])} chars")
    
    return backstories

def save_backstories_for_indexing(backstories):
    """Sauve les backstories dans un format pour l'indexation"""
    
    # Créer un dossier pour les backstories
    output_dir = Path("vector_content/heroes_backstories")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Sauver chaque backstory comme fichier séparé
    for backstory in backstories:
        hero_id = backstory.get("id", backstory["name"].lower().replace(" ", "_"))
        
        # Format Markdown pour meilleure indexation
        content = f"""# {backstory['name']}

## Backstory
{backstory.get('backstory', '')}

## Personality
{backstory.get('personality', '')}

## Knowledge
{backstory.get('knowledge', '')}

## Additional Info
- Class: {backstory.get('class', 'Unknown')}
- Title: {backstory.get('title', '')}
- Quote: {backstory.get('quote', '')}
"""
        
        output_file = output_dir / f"{hero_id}_backstory.md"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"📝 Saved: {output_file}")
    
    # Créer aussi un fichier JSON consolidé
    json_file = output_dir / "all_backstories.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(backstories, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Total: {len(backstories)} backstories saved")
    print(f"📁 Location: {output_dir}")
    
    return output_dir

def main():
    print("🔍 Extraction des backstories des héros...")
    backstories = extract_hero_backstories()
    
    print(f"\n📊 Trouvé {len(backstories)} backstories")
    
    print("\n💾 Sauvegarde pour indexation...")
    output_dir = save_backstories_for_indexing(backstories)
    
    print("\n🚀 Pour indexer dans la Vector DB:")
    print(f"python3 tools/vector_build/build_local.py --mode story --root {output_dir} --out vector-store/story")
    
    print("\n✨ Ou pour utiliser directement avec l'IA:")
    print("Le serveur Clippy Dev (port 8889) peut maintenant chercher dans ces fichiers!")

if __name__ == "__main__":
    main()
