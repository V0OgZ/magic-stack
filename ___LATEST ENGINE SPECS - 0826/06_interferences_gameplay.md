# Heroes of Time — Interférences → Gameplay

## Calcul d’interférence
`I = ⟨ψ_a | ψ_b⟩ · exp(i(Φ_a - Φ_b))` ; on utilise `|I|` pour la qualité.

## Seuils (exemple à calibrer)
- `|I| ≥ 0.75` → **Clone complet** : carte TCG pleine, double contrôle/AI élite, buff de synergie.
- `0.50 ≤ |I| < 0.75` → **Clone affaibli** : carte jouable mais stats réduites / pouvoirs limités.
- `0.25 ≤ |I| < 0.50` → **Pas de carte** : **buff temporaire** (vitesse/dégâts/vision) puis dissipation.
- `< 0.25` → **Dissipation immédiate**.

## Objets qui modulent |I| et Φ
- **Accordeur de phase** (+Φ), **Ancre quantique** (bloque décroissance Φ),
- **Prisme interférentiel** (multiplie `|I|` localement),
- **Perturbateur** (Φ adverse ↓ avant rencontre).
