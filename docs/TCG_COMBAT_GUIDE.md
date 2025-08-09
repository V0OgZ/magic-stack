# Heroes of Time — Combat TCG (Design & Intégration)

## 1) Constat rapide
Aujourd’hui, les IA savent se déplacer (graphe CD), mais ne jouent pas encore les cartes en combat. Le TCG doit piloter des transformations causales (superposition, collapse, ancrages) et non des +X dégâts statiques.

## 2) Modes d’usage
- Auto-combat (comme Heroes): profils Chill / Balanced / Aggro / Control
- Coach: 2–3 lignes proposées avec explications
- PNJ / Régulateurs: mêmes capacités, avec personnalité

## 3) Endpoints côté back (MVP)
- GET `/combat/state/:id` → état compact du combat
- POST `/tcg/ai/decide` → `{ actions: TcgAction[], explain? }`
- POST `/tcg/ai/coach` → `{ lines: [{plan, why, risk}] }`
- GET `/tcg/ai/telemetry/:id` → events (replay, debug)

## 4) Flux d’intégration front
1. Pendant un TCG, récupérer l’état compact
2. Demander une décision AI (si auto) ou coach (si conseil)
3. Appliquer les actions (via orchestrateur / moteur TCG)
4. Afficher un mini journal (actions, triggers) + options “reprendre la main”

## 5) DTO compacts (exemples)
```json
{
  "state": {
    "game_id":"m1","turn":1,"active_player":"hero:alice","mana":3,
    "hand":[{"id":"C_001","cost":1}],
    "board":{"ally":[],"enemy":[],"effects":[]},
    "flags":{"superpositions":0,"collapse_imminent":false}
  }
}
```
Réponse decide:
```json
{ "actions": [{"type":"PLAY_CARD","card_id":"C_001"},{"type":"END_TURN"}], "explain":"stub" }
```

## 6) UI/UX
- Bouton “Auto/Coach” visible, état clair
- Mini-journal des actions
- Affichage du mode de résolution choisi (QUANTUM/TCG/ESCAPE/STASIS)

## 7) Roadmap
- Semaine 1: decide stub + auto Balanced
- Semaine 2: coach + mini-map multiverse combat
- Semaine 3: profils IA + replays déterministes
