# Frontend — Contributors Start Here

Trois tâches simples pour démarrer vite:

## 1) Client Orchestrateur
- Implémenter le module d'exemple `FRONTEND_ORCHESTRATOR_CLIENT.md` dans votre codebase
- Ajout d'un bouton Start Session, et 3 intents (OBSERVE, REQUEST_RESOLVE, COLLECT)

## 2) Mini‑map Multiverse
- Suivre `FRONTEND_MINIMAP_MULTIVERSE.md`
- Afficher nodes/edges et collapse_counter

## 3) Panneau TCG Auto/Coach (MVP)
- Deux boutons: Auto (tcgDecide) et Coach (tcgCoach)
- Journal des actions

## Bonnes pratiques
- Envoyer `Idempotency-Key` pour les intents
- Feature flag `useOrchestrator`
- Gérer timeouts et retries (backoff)

## Liens utiles
- `docs/API.md`
- `docs/TCG_COMBAT_GUIDE.md`
- `docs/VECTORDB_STORY_DEV.md`
- `docs/FRONTEND_ORCHESTRATOR_CLIENT.md`
- `docs/FRONTEND_MINIMAP_MULTIVERSE.md`
