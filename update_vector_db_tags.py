#!/usr/bin/env python3
"""
🏷️ Ajout des catégories/tags à la Vector DB
"""

import json
import os
from pathlib import Path

# Configuration des tags
TAGS = {
    "#lore": "Histoire et univers",
    "#backstory": "Histoires des personnages", 
    "#combat": "Mécaniques de combat",
    "#dev": "Documentation technique",
    "#6D": "Architecture 6 dimensions",
    "#tcg": "Trading Card Game",
    "#api": "Documentation API",
    "#ui": "Interface utilisateur",
    "#editor": "Éditeurs de contenu",
    "#temporal": "Mécaniques temporelles"
}

def categorize_document(file_path, content):
    """Détermine les tags pour un document"""
    tags = []
    file_name = file_path.lower()
    content_lower = content.lower() if content else ""
    
    # Règles de catégorisation
    if 'backstory' in file_name or 'hero' in file_name or 'personnage' in content_lower:
        tags.append("#backstory")
    
    if 'lore' in file_name or 'histoire' in content_lower or 'légende' in content_lower:
        tags.append("#lore")
    
    if 'combat' in file_name or 'tcg' in file_name or 'battle' in content_lower:
        tags.append("#combat")
        tags.append("#tcg")
    
    if 'api' in file_name or 'endpoint' in content_lower or '.md' in file_name:
        tags.append("#dev")
        tags.append("#api")
    
    if '6d' in file_name or 'dimension' in content_lower or 'spatial' in content_lower:
        tags.append("#6D")
    
    if 'temporal' in file_name or 'temps' in content_lower or 'drift' in content_lower:
        tags.append("#temporal")
    
    if 'editor' in file_name or 'éditeur' in content_lower:
        tags.append("#editor")
    
    if '.html' in file_name or 'interface' in content_lower:
        tags.append("#ui")
    
    # Au moins un tag par défaut
    if not tags:
        tags.append("#dev")
    
    return list(set(tags))  # Unique tags

def update_vector_index():
    """Met à jour l'index avec les tags"""
    
    # Chemins à indexer
    paths = [
        Path("vector_content"),
        Path("docs"),
        Path("v2spec"),
        Path("___LATEST ENGINE SPECS - 0826")
    ]
    
    indexed_docs = []
    
    for base_path in paths:
        if not base_path.exists():
            continue
            
        for file_path in base_path.rglob("*"):
            if file_path.is_file() and (file_path.suffix in ['.md', '.json', '.html']):
                try:
                    content = file_path.read_text(encoding='utf-8')
                    tags = categorize_document(str(file_path), content)
                    
                    doc = {
                        "id": str(file_path),
                        "path": str(file_path),
                        "type": file_path.suffix[1:],
                        "tags": tags,
                        "content": content[:500],  # Preview
                        "size": len(content)
                    }
                    indexed_docs.append(doc)
                    print(f"✅ {file_path.name} → {', '.join(tags)}")
                    
                except Exception as e:
                    print(f"⚠️ Erreur: {file_path}: {e}")
    
    # Sauvegarder l'index avec tags
    index_path = Path("vector_index_with_tags.json")
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump({
            "tags": TAGS,
            "documents": indexed_docs,
            "total": len(indexed_docs)
        }, f, indent=2, ensure_ascii=False)
    
    print(f"\n📊 Total: {len(indexed_docs)} documents indexés avec tags")
    print(f"💾 Sauvé dans: {index_path}")
    
    # Stats par tag
    tag_stats = {}
    for doc in indexed_docs:
        for tag in doc['tags']:
            tag_stats[tag] = tag_stats.get(tag, 0) + 1
    
    print("\n📈 Statistiques par tag:")
    for tag, count in sorted(tag_stats.items(), key=lambda x: x[1], reverse=True):
        print(f"  {tag}: {count} documents")

if __name__ == "__main__":
    print("🏷️ AJOUT DES TAGS À LA VECTOR DB")
    print("=" * 50)
    update_vector_index()
