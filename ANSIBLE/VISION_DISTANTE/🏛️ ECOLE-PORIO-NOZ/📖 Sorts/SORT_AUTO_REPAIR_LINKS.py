#!/usr/bin/env python3
# Sort Auto-Réparation de Liens

import os
import re

print("🔗 ψ_REPAIR: ⊙(Δt+0 ⟶ FIX(BROKEN_LINKS))")
print("🔗 Scanning pour liens brisés...\n")

fixed = 0
broken = 0

# Pattern pour liens markdown
link_pattern = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

for root, dirs, files in os.walk(".", topdown=True):
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    
    for file in files:
        if file.endswith('.md'):
            filepath = os.path.join(root, file)
            
            with open(filepath, 'r') as f:
                content = f.read()
            
            for match in link_pattern.finditer(content):
                link_text = match.group(1)
                link_path = match.group(2)
                
                if not link_path.startswith(('http', '#', 'mailto:')):
                    full_path = os.path.join(os.path.dirname(filepath), link_path)
                    if not os.path.exists(full_path):
                        print(f"❌ {filepath}: [{link_text}]({link_path})")
                        broken += 1
                    else:
                        fixed += 1

print(f"\n✨ Scan terminé: {fixed} liens OK, {broken} liens cassés")
print("✨ Utilisez SORT_GRAY_BROKEN_LINKS.py pour marquer les cassés")