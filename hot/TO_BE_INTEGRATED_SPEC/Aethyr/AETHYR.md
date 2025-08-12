# AETHYR — Gardien de l’Interstice

- Alias: Aethyr, Le Médiateur
- Rôle: Stabilise la causalité (réduit |tw−te|), révèle le brouillard de causalité, déclenche des résolutions TCG quand l’entropie locale est trop haute.
- Hooks gameplay:
  - Rencontre → choix: Négocier, Ancrer le temps, Démarrer un duel TCG (AI vs AI / PvP)
  - En éditeur: placer Aethyr comme balise de test TCG et zone d’ancrage temporel

## Endpoints utilisés
- POST `/engine/api/v2/entity` — upsert de l’entité (proxy → Rust)
- POST `/api/combat/start` — démarrer un duel TCG (proxy → Java)
- POST `/api/regulators/vince` — réduire le drift temporel

## Ressources
- Image: `Aethyr, Guardian of the Library.png`
- Données entité: `aethyr.entity.json`

## Prompt image (archive)
Portrait full-body of “Aethyr, Guardian of the Interstice”: luminous sigils (Ψ, Δt, Q*) orbiting, glassy mantle with refracted hex‑map shards, soft volumetric light, cool violets & silver, ethereal librarian‑warrior vibe, slight motion blur glyphs, high detail, painterly realism, 4k, standing in a misty library‑void with floating runes, elegant staff made of braided light --ar 3:4 --v 6 --style raw
