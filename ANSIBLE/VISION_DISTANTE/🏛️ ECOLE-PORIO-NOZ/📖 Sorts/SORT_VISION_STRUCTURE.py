#!/usr/bin/env python3
# Sort de Vision Structurelle

import os
import json

print("👁️ ψ_VISION: ⊙(Δt+0 ⟶ REVEAL(STRUCTURE))")
print("👁️ L'œil quantique s'ouvre...\n")

structure = {}
for root, dirs, files in os.walk(".", topdown=True):
    # Skip hidden and git
    dirs[:] = [d for d in dirs if not d.startswith('.')]
    level = root.replace(".", "").count(os.sep)
    indent = " " * 2 * level
    print(f"{indent}📁 {os.path.basename(root)}/")
    subindent = " " * 2 * (level + 1)
    for file in files:
        if not file.startswith('.'):
            print(f"{subindent}📄 {file}")

print("\n✨ La structure est révélée dans sa totalité quantique.")