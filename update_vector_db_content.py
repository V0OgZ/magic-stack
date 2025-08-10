#!/usr/bin/env python3
"""
Met à jour le Vector DB avec toutes les dernières docs
"""

import json
import os
from pathlib import Path

# Dossier de données pour le Vector DB
VECTOR_DATA_DIR = Path("docs_shared/V - VECTOR_DB_ASSETS")
VECTOR_DATA_DIR.mkdir(parents=True, exist_ok=True)

# Collecter toutes les nouvelles docs
new_docs = {
    "game_manuals": {
        "expert_manual": {
            "title": "Manuel Expert Heroes of Time",
            "content": "Système 6D complet, formules mathématiques, grammaire temporelle",
            "formulas": {
                "TEMPORAL_SHIFT": "Ψ(t) = Ψ₀ × e^(iωt) × R(Δt)",
                "QUANTUM_COLLAPSE": "|Ψ⟩ = Σ(α_i|i⟩) → |n⟩",
                "CAUSAL_FORK": "C(t₁→t₂) = ∫P(ξ)dξ × Θ(t₂-t₁)",
                "ENERGY_COMPLEX": "E = A × e^(iΦ) + ∇²Ψ"
            }
        },
        "easy_manual": {
            "title": "Manuel Facile Bilingue",
            "content": "3 scénarios simples pour débuter",
            "scenarios": [
                "Le Saut Impossible - TIME SLOW",
                "Les Deux Portes - QUANTUM SPLIT",
                "Le Dragon du Temps - FUTURE SIGHT"
            ]
        }
    },
    "test_scenarios": {
        "tcg_combat": {
            "name": "Combat TCG avec IA",
            "steps": ["init_combat", "play_card", "enemy_turn", "check_hp"],
            "expected": "Combat avec dégâts et IA Rust"
        },
        "temporal_shift": {
            "name": "Décalage temporel",
            "formula": "SHIFT(-5) puis SHIFT(+10)",
            "expected": "Entité bouge dans le temps"
        },
        "quantum_split": {
            "name": "Superposition quantique",
            "steps": ["FORK", "explorer branches", "MERGE"],
            "expected": "Création et fusion de timelines"
        },
        "6d_navigation": {
            "name": "Pathfinding Q* en 6D",
            "dimensions": ["X", "Y", "Z", "T", "C", "Ψ"],
            "expected": "Chemin optimal en 6 dimensions"
        }
    },
    "game_features": {
        "multiplayer_demo": "Démo HOMM3 avec carte hexagonale et TCG",
        "pwa_ipad": "Version mobile avec Clippy et support tactile",
        "spectator_mode": "Vue God Mode 4 joueurs simultanés",
        "test_runner": "Exécution automatique de tous les scénarios"
    },
    "technical_integration": {
        "java_rust": "Communication entre Java (8080) et Rust (3001) pour l'IA TCG",
        "v2_controller": "Multiplayer V2 avec régulateurs et énergie complexe",
        "vector_db": "Recherche sémantique 6D sur port 5001"
    }
}

# Sauvegarder dans le Vector DB
output_file = VECTOR_DATA_DIR / "HOT_GAME_COMPLETE.json"
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(new_docs, f, indent=2, ensure_ascii=False)

print(f"✅ Vector DB content updated: {output_file}")

# Créer aussi un index des formules
formulas_index = {
    "temporal": [
        "TEMPORAL_SHIFT: Ψ(t) = Ψ₀ × e^(iωt) × R(Δt)",
        "CHRONO_LOCK: L(t) = δ(t - t₀) × Ψ(t₀)",
        "TIME_DILATION: Δt' = Δt × √(1 - v²/c²)"
    ],
    "quantum": [
        "QUANTUM_COLLAPSE: |Ψ⟩ = Σ(α_i|i⟩) → |n⟩",
        "WAVE_FUNCTION: Ψ(x,t) = A × sin(kx - ωt + φ)"
    ],
    "causal": [
        "CAUSAL_FORK: C(t₁→t₂) = ∫P(ξ)dξ × Θ(t₂-t₁)"
    ],
    "dimensional": [
        "DIMENSION_FOLD: D⁶ = X³ × T × C × Ψ",
        "INTERSTICE_PORTAL: P = lim_{n→∞} (1 + z/n)ⁿ"
    ],
    "energy": [
        "ENERGY_COMPLEX: E = A × e^(iΦ) + ∇²Ψ",
        "REALITY_WEAVE: R = Σᵢⱼ (Mᵢⱼ × Ψᵢ × Ψⱼ*)"
    ]
}

formulas_file = VECTOR_DATA_DIR / "FORMULAS_INDEX.json"
with open(formulas_file, 'w', encoding='utf-8') as f:
    json.dump(formulas_index, f, indent=2, ensure_ascii=False)

print(f"✅ Formulas index created: {formulas_file}")
print("📚 Total categories:", len(new_docs))
print("🔮 Total formulas:", sum(len(v) for v in formulas_index.values()))
