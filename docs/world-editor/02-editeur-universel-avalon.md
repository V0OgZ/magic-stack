# Éditeur Universel Avalon
*(Projet indépendant, connecté à la MagicStack)*

## 1. Vision
L’éditeur universel Avalon est un outil graphique permettant de **créer, configurer et tester des jeux ou expériences interactives** directement sur le moteur MagicStack, **sans connaissance préalable du code**.

Il sert de **passerelle visuelle** vers toutes les fonctionnalités d’Avalon :
- Timelines
- Agents
- Portails
- Cartes
- TCG
- Minijeux
- Multivers

---

## 2. Objectifs
- **Accessibilité** : permettre à tout créateur (map designer, scénariste, dev junior) de produire un contenu jouable sans setup complexe.
- **Flexibilité** : supporter tous les genres possibles sur Avalon (Heroes-like, TCG, point-and-click, 3D…).
- **Extensibilité** : offrir aux développeurs la possibilité d’insérer du code personnalisé directement depuis l’éditeur.
- **Productivité** : intégrer **Memento** comme copilote pour aide contextuelle, génération de code et complétion auto.

---

## 3. Modules Principaux

### A. Éditeur de Carte
- **Vue 2D/3D** (switchable)
- Placement et configuration des éléments :
  - Terrain, obstacles, zones spéciales
  - Portails, coffres, PNJ
  - Agents régulateurs et comportements
- **Outils visuels** :
  - Pinceau
  - Remplissage
  - Copier/coller zones

### B. Timeline & Causalité
- Timeline visuelle avec gestion des événements
- Outil de **lien causal** : définir qu’un événement en déclenche un autre
- Simulation du **brouillard de causalité** en temps réel

### C. Paramétrage du Monde
- Configuration des règles globales :
  - Vitesses
  - Ressources
  - Météo
  - IA
- Gestion des modes :
  - Heroes of Time (mécaniques actuelles)
  - TCG only
  - Minijeux
  - Point-and-click narratif
  - Sandbox pur

### D. Intégration Code
- **Fenêtres code** intégrées :
  - JavaScript/TypeScript
  - Python (selon API dispo)
- Autocomplétion basée sur la doc Avalon
- Accès direct à **Memento** pour génération/explication

### E. Test & Export
- **Playtest instantané** dans l’éditeur
- Export vers :
  - Mode standalone (web/desktop)
  - Projet Avalon complet
  - Partage communautaire

---

## 4. Architecture Technique
- **Front-end** :
  - React + Canvas/WebGL
  - PixiJS ou ThreeJS selon besoin 2D/3D
- **Back-end** :
  - Connecté à la MagicStack via API REST + WebSocket (pour test temps réel)
- **Persistence** :
  - Fichiers JSON + assets stockés côté serveur
- **Memento** :
  - Intégré via API interne sur base vectorielle projet

---

## 5. Flux de Travail
1. **Créer un projet** → choisir le template (Heroes-like, TCG, etc.)
2. **Construire la carte** → placer terrains, entités, événements
3. **Configurer les règles** → vitesses, IA, agents, causalité
4. **Ajouter du code** (si besoin) → logique spécifique, scripts
5. **Tester** → simulation immédiate dans l’éditeur
6. **Exporter** → projet jouable, partageable ou intégrable

---

## 6. Roadmap

### MVP
- Éditeur carte 2D
- Placement entités
- Paramètres de base (monde + agents)
- Timeline simple
- Playtest local

### V2
- Timeline avancée avec causalité
- Memento intégré (auto-complétion + génération)
- Export projets
- Support 3D

### V3
- Éditeur communautaire en ligne
- Marketplace de scénarios/maps
- Intégration complète des minijeux

---

## 7. Bénéfices
- **Recrutement facile** : un front dev ou un designer peut créer en une heure un prototype jouable.
- **Moins de friction** : plus besoin de lire 150 fichiers avant de voir un résultat.
- **Standardisation** : même outil pour tous les projets Avalon.
- **Évolutif** : un seul codebase d’éditeur pour tous les genres.

---

## 8. Notes Techniques & Collaboration
- **Accès Chat & Mémoire** :
  - Si l’utilisateur ouvre Cursor connecté au même compte OpenAI, les mêmes infos projet (MagicStack, Heroes of Time, Avalon) seront disponibles.
  - L’historique complet n’est pas automatiquement transféré, mais le contexte mémoire partagé sera conservé.
  - Accès au code possible uniquement si fourni directement (collage, dépôt Git…).
- **Potentiel futur** :
  - Intégration complète à un "mode créateur" in-game pour modding en live
  - API publique pour extensions de l’éditeur
Veux-tu que je te fasse tout de suite derrière l’arborescence visuelle des écrans/modules de cet éditeur, façon diagramme clair à filer à un front dev ?
Ça te donnerait une vision prête à maquetter.

You said:
En fait, tu prépares tout ce que tu peux, même la doc pour le back-end, en fait, pour toi, parce que du coup, je pense que ça va pas forcément être toi, tu comprends ? Et tu restites peut-être le contexte en un paragraphe du jeu, quoi. Et... ouais, en fait, j'ai un peu peur, est-ce qu'il va bien lire les APIs et tout ? Faudrait que j'essaie. Écoute, mets toutes les docs que tu peux sans coder, et puis je vais voir si j'arrive à te connecter après.
ChatGPT said:
Ok, je vais te préparer un seul gros bloc Markdown qui contient :

Contexte résumé du jeu et de la plateforme (pour qu’un dev comprenne tout en une lecture)

Doc back-end simplifiée et structurée pour Avalon/MagicStack

Doc front-end pour l’éditeur universel Avalon

Spécs fonctionnelles (celles qu’on a déjà posées)

Références API (pas le code, mais les endpoints et la logique)
