#!/usr/bin/env python3
"""
Script pour mettre à jour tous les JSONs avec les champs d'assets obligatoires
"""

import json
import os
from pathlib import Path
import random

# Mappings par défaut
DEFAULT_ICONS = {
    'hero': '🦸',
    'creature': '🐉',
    'artifact': '💎',
    'spell': '✨',
    'resource': '💰',
    'structure': '🏰',
    'terrain': '🌍',
    'event': '⚡',
    'quest': '📜',
    'npc': '👤'
}

DEFAULT_FX = {
    'legendary': 'artifact_shine',
    'epic': 'glow',
    'rare': 'pulse',
    'common': 'fade_in',
    'hero': 'quantum_phase',
    'creature': 'bounce',
    'spell': 'spark_trail',
    'artifact': 'artifact_shine',
    'damage': 'damage_flash',
    'heal': 'heal_aura'
}

DEFAULT_SOUNDS = {
    'hero': 'artifact_activate',
    'creature': 'combat_sword_01',
    'artifact': 'artifact_pickup',
    'spell': 'magic_cast',
    'collect': 'collect_gold',
    'activate': 'artifact_activate',
    'combat': 'sword_hit'
}

DEFAULT_COLORS = {
    'legendary': '#FFD700',
    'epic': '#9932CC',
    'rare': '#4169E1',
    'common': '#808080',
    'hero': '#FFD700',
    'creature': '#DC143C',
    'spell': '#9932CC',
    'artifact': '#FF6347'
}

def get_entity_type(data):
    """Devine le type d'entité basé sur les clés du JSON"""
    if 'class' in data or 'abilities' in data:
        return 'hero'
    if 'damage' in data or 'attack' in data:
        return 'creature'
    if 'cast_cost' in data or 'mana_cost' in data:
        return 'spell'
    if 'bonus' in data or 'effect' in data:
        return 'artifact'
    return 'entity'

def generate_runic_text(text):
    """Génère une version runique basique"""
    runic_map = {
        'a': 'ᚨ', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛞ', 'e': 'ᛖ',
        'f': 'ᚠ', 'g': 'ᚷ', 'h': 'ᚺ', 'i': 'ᛁ', 'j': 'ᛃ',
        'k': 'ᚲ', 'l': 'ᛚ', 'm': 'ᛗ', 'n': 'ᚾ', 'o': 'ᛟ',
        'p': 'ᛈ', 'q': 'ᚲ', 'r': 'ᚱ', 's': 'ᛊ', 't': 'ᛏ',
        'u': 'ᚢ', 'v': 'ᚹ', 'w': 'ᚹ', 'x': 'ᛉ', 'y': 'ᛃ', 'z': 'ᛉ',
        ' ': '᛫'
    }
    return ''.join(runic_map.get(c.lower(), c) for c in text[:20])

def update_entity(entity, entity_type='entity'):
    """Ajoute les champs manquants à une entité"""
    
    # Ne pas écraser les champs existants
    if 'icon_id' not in entity:
        entity['icon_id'] = DEFAULT_ICONS.get(entity_type, '❓')
    
    if 'fx_preset' not in entity:
        rarity = entity.get('rarity', 'common')
        entity['fx_preset'] = DEFAULT_FX.get(rarity, DEFAULT_FX.get(entity_type, 'fade_in'))
    
    if 'sound_event' not in entity:
        entity['sound_event'] = DEFAULT_SOUNDS.get(entity_type, 'ui_click')
    
    if 'theme_color' not in entity:
        rarity = entity.get('rarity', 'common')
        entity['theme_color'] = DEFAULT_COLORS.get(rarity, DEFAULT_COLORS.get(entity_type, '#808080'))
    
    if 'output_modes' not in entity:
        name = entity.get('name', 'Unknown')
        desc = entity.get('description', entity.get('flavor', ''))
        
        entity['output_modes'] = {
            'literary': desc if desc else f"The mysterious {name}",
            'runic': generate_runic_text(name),
            'iconic': entity['icon_id'] + ('⚔️' if entity_type == 'hero' else '') + ('✨' if entity_type == 'spell' else '')
        }
    
    return entity

def update_json_file(filepath):
    """Met à jour un fichier JSON avec les nouveaux champs"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        modified = False
        
        # Détecter le format du fichier
        if 'heroes' in data:
            for hero in data['heroes']:
                update_entity(hero, 'hero')
            modified = True
        elif 'creatures' in data:
            for creature in data['creatures']:
                update_entity(creature, 'creature')
            modified = True
        elif 'artifacts' in data:
            for artifact in data['artifacts']:
                update_entity(artifact, 'artifact')
            modified = True
        elif 'spells' in data:
            for spell in data['spells']:
                update_entity(spell, 'spell')
            modified = True
        elif 'cards' in data:
            for card in data['cards']:
                entity_type = 'spell' if 'cast_cost' in card else 'creature'
                update_entity(card, entity_type)
            modified = True
        elif isinstance(data, list):
            # Liste d'entités
            for item in data:
                entity_type = get_entity_type(item)
                update_entity(item, entity_type)
            modified = True
        elif 'id' in data and 'name' in data:
            # Entité unique
            entity_type = get_entity_type(data)
            update_entity(data, entity_type)
            modified = True
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"✅ Mis à jour: {filepath}")
            return True
        else:
            print(f"⏭️  Pas de modification: {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ Erreur avec {filepath}: {e}")
        return False

def main():
    hot_dir = Path('/Volumes/HOT_DEV/Magic/hot')
    
    # Dossiers à scanner
    dirs_to_scan = [
        'entities',
        'items',
        'cards',
        'scenarios',
        'events'
    ]
    
    total_updated = 0
    total_scanned = 0
    
    for dir_name in dirs_to_scan:
        dir_path = hot_dir / dir_name
        if not dir_path.exists():
            print(f"⚠️  Dossier non trouvé: {dir_path}")
            continue
        
        print(f"\n📁 Scan de {dir_name}/...")
        
        for json_file in dir_path.rglob('*.json'):
            # Skip les fichiers de config
            if json_file.name in ['package.json', 'tsconfig.json', 'manifest.json']:
                continue
                
            total_scanned += 1
            if update_json_file(json_file):
                total_updated += 1
    
    print(f"\n📊 Résumé:")
    print(f"  - Fichiers scannés: {total_scanned}")
    print(f"  - Fichiers mis à jour: {total_updated}")
    print(f"  - Fichiers inchangés: {total_scanned - total_updated}")

if __name__ == '__main__':
    main()
