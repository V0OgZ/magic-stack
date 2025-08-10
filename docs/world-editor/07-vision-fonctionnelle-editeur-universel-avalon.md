# Vision fonctionnelle – Éditeur Universel Avalon

## Contexte (jeu + moteur)
**Avalon** = plateforme moteur temps/causalité/multivers.  
**MagicStack** gère : World State Graph, Timelines, Agents régulateurs, Paradoxes (TCG/auto), Minijeux, Planner Q*.  
Implémentation de référence : **Heroes of Time** (exploration temps fluide + combats TCG + brouillard de causalité).

## Pourquoi un éditeur ?
- Réduire l’entrée technique (React + APIs) pour **créer du contenu** rapidement.
- Ouvrir la création aux **bricoleurs HTML/JS** et designers non techniques.
- Tout faire **visuellement**, laisser du **code optionnel**.

## Principes UX
- **Drag & drop** (terrain, objets, agents).
- **Timeline visuelle** (événements, liens causaux).
- **Paramétrage monde** (sliders, checkboxes).
- **Playtest instantané**.
- **Fenêtre code intégrée** (JS/TS/Python).
- **Memento** en sidebar (guide + recherche vectorDB, y compris **V2Spec**).

## Parcours utilisateur
1. **Template** (Heroes-like / TCG / Sandbox / Point-and-click).
2. **Carte** (placer objets/agents).
3. **Timeline** (événements + causalité).
4. **Paramètres** (règles globales).
5. **Test** (simulate/play).
6. **Export** (standalone ou projet Avalon).

## Résultats attendus (MVP)
- Créer une map 2D, 2 agents régulateurs, 3 événements timeline, simuler +300s, résoudre un paradoxe TCG → **sans écrire de code**.
02_SPEC_TECHNIQUE_EDITOR.md
