#!/usr/bin/env python3
# Sort Générateur d'Énigmes du Sphinx

import random
import math

print("🦁 ψ_SPHINX: ⊙(Δt+0 ⟶ GENERATE(ENIGMA))")

templates = [
    "Si ψ = {p1} et collapse après {p2} observations, quelle est l'amplitude finale?",
    "Un photon traverse {p1} fentes avec probabilité 1/{p2}. Interférence?",
    "État |{p3}⟩ mesuré {p1} fois. Probabilité de collapse vers |0⟩?"
]

difficulty = random.randint(0, 3)
p1 = random.randint(2 + difficulty*3, 10 + difficulty*5)
p2 = random.randint(1 + difficulty, 5 + difficulty*2)
p3 = random.choice(['0', '1', '+', '-'])

question = random.choice(templates).format(p1=p1, p2=p2, p3=p3)
answer = round(math.sqrt(p1 * p2) * (2**(-difficulty)), 3)
tolerance = 0.1 / (difficulty + 1)

print(f"\n🦁 ÉNIGME (Niveau {difficulty}):")
print(f"   {question}")
print(f"\n🔮 Réponse attendue: {answer} ± {tolerance}")
print(f"\n✨ L'énigme quantique est posée. Qui passera?")