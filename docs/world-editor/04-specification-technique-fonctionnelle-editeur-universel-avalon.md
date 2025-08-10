# 📜 Spécification Technique & Fonctionnelle – Éditeur Universel Avalon

---

## 0. Contexte Résumé

Avalon est une **plateforme moteur de jeu** reposant sur MagicStack, conçue pour gérer :
- Des mondes persistants
- Des timelines multiples
- Des agents régulateurs IA
- Des combats TCG
- Des minijeux intégrés (200+)
- Des règles paramétrables pour tout type de gameplay

L’implémentation phare actuelle est **Heroes of Time** :
- Exploration type Heroes of Might and Magic (mais temps fluide)
- Combats en mode TCG
- Brouillard de causalité et rythmes temporels différents par héros
- Résolution de paradoxes (combat forcé ou auto-résolution)

**Problème actuel** :  
Entrée trop technique pour produire du contenu → il faut **simplifier l’accès** via un **éditeur universel**, visuel, connecté aux APIs, capable de créer du contenu sans écrire de code au départ.

---

## 1. Objectif de l’Éditeur Universel Avalon

### 1.1 But
- Fournir une interface **visuelle et interactive** pour créer des mondes, maps et scénarios.
- Centraliser toutes les mécaniques Avalon (cartes, timelines, agents, TCG, règles…).
- Offrir des points d’entrée aux **créateurs non techniques** tout en permettant aux devs d’étendre via code intégré.

### 1.2 Fonctionnalités Clés
- Éditeur de carte 2D/3D
- Gestion de timeline et causalité
- Paramétrage complet du monde
- Placement et configuration des agents régulateurs
- Fenêtre d’insertion de code
- Test en temps réel
- Export vers projet Avalon ou standalone

---

## 2. Architecture Globale

[Éditeur Avalon - React/WebGL]
↕ API REST / WebSocket
[MagicStack Backend - Rust/Python]
↕
[Base de données JSON/Assets]


- **Front-end** : React, PixiJS (2D) ou ThreeJS (3D)
- **Back-end** : Rust (moteur temps réel) + Python (contrôleurs/API)
- **Persistence** : JSON (maps, timelines, agents) + stockage assets
- **IA Memento** : intégré pour aide contextuelle et génération de code

---

## 3. Modules Front-End (Vue Éditeur)

### 3.1 Dashboard Principal
- Liste des projets
- Boutons : Nouveau Projet, Import, Export
- Aperçu rapide : nom, genre, date modif

### 3.2 Éditeur de Carte
- Outils : pinceau, gomme, remplissage, copier/coller
- Placement objets :
  - Portails
  - Coffres
  - PNJ
  - Agents régulateurs
- Layers :
  - Terrain
  - Éléments interactifs
  - Zones spéciales

### 3.3 Timeline & Causalité
- Barre chronologique interactive
- Ajout d’événements
- Liaisons causales (drag-and-drop)
- Simulation brouillard de causalité

### 3.4 Paramètres Monde
- Règles globales :
  - Vitesse temps
  - Météo
  - Ressources
  - IA globale
- Sélection du **mode de jeu** (Heroes-like, TCG, Sandbox, etc.)

### 3.5 Fenêtre Code
- Éditeur intégré (JS/TS/Python)
- Autocomplétion API Avalon
- Interaction avec Memento

### 3.6 Test & Export
- Playtest en live
- Export projet complet
- Export standalone jouable
- Partage communautaire

---

## 4. Modules Back-End

### 4.1 Contrôleurs Clés
- **World State Graph Controller**
  - Stocke et gère état complet du monde
  - Synchro temps réel avec front
- **Gustave Search Logic (Q\*)**
  - Parcours optimal temporel
  - Évalue effets objets, buffs, portails
- **Agent Controllers**
  - Spawn agents régulateurs
  - Config comportement (méchanceté, vitesse réaction…)
- **Paradox Resolution**
  - Combat forcé ou auto-simulation

---

## 5. Endpoints API (Détail)

| Endpoint | Méthode | Paramètres | Réponse |
|----------|---------|------------|---------|
| `/world/state` | GET | `project_id` | JSON état complet |
| `/world/update` | POST | `{changes: {...}}` | Confirmation + état maj |
| `/agent/spawn` | POST | `{type, position, params}` | Agent ID + état monde |
| `/agent/config` | POST | `{agent_id, params}` | Confirmation |
| `/timeline/add_event` | POST | `{time, type, params}` | Event ID |
| `/timeline/simulate` | GET | `project_id` | Résultat simulation |
| `/paradox/resolve` | POST | `{mode, entities}` | Résultat résolution |

---

## 6. Flux de Travail Utilisateur

1. **Créer un projet**
2. **Construire la carte**
3. **Ajouter événements timeline**
4. **Configurer paramètres monde**
5. **Placer agents régulateurs**
6. (Optionnel) **Coder des extensions**
7. **Tester**
8. **Exporter**

---

## 7. Roadmap

### MVP
- Carte 2D
- Placement entités
- Timeline basique
- Paramètres monde simples
- Test local

### V2
- Timeline avancée
- Memento intégré
- Export complet
- Support 3D

### V3
- Éditeur communautaire online
- Marketplace scénarios/maps
- Intégration minijeux

---

## 8. Exigences Qualité
- **Code front** : React fonctionnel + composants modulaires
- **Code back** : Rust optimisé + endpoints documentés
- **UX** : drag-and-drop fluide, 60 fps
- **Testabilité** : chaque module testable isolément
- **Compatibilité** : Chrome, Firefox, Safari, Edge

---

## 9. Diagramme d’Écrans

[Dashboard]
├── [Nouveau Projet]
│ ├── Choix template
│ └── Import JSON
├── [Éditeur Carte]
│ ├── Terrain
│ ├── Objets
│ └── Agents
├── [Timeline]
│ ├── Ajout Event
│ └── Lien Causal
├── [Paramètres Monde]
├── [Fenêtre Code]
└── [Test & Export]


---

## 10. Notes Collaboration
- Utiliser **Swagger/OpenAPI** pour générer doc API
- Prévoir hooks front pour rafraîchir données temps réel via WebSocket
- Utiliser stockage versionné pour assets et maps
Avec ça, même une équipe offshore qui ne connaît pas le projet peut comprendre :

le contexte

les modules

le rôle de chaque API

la roadmap MVP → complet

et comment brancher front & back.

Si tu veux, je peux te préparer aussi le schéma technique back-end complet, avec tous les contrôleurs, leurs dépendances et leurs relations API, pour que même un nouveau dev Rust/Python comprenne en 10 minutes comment ça s’emboîte.
Ça te ferait un vrai plan d’attaque pour l’implémentation.

You said:
Ouais, tu me donnes tout ce que tu peux, parce que le but, en fait, de tout ça, ce sera quand même qu'on le donne à des potes un peu développeurs. Et tu vois, le mec qui bricole, qui sait faire une page HTML, qui connaît un peu de logique, tu vois, avec cet éditeur, il devrait être capable de faire des choses, tu vois. Et même si les formules temporelles, c'est compliqué, il y aura des petits boutons, des machins, de l'aide de mes mentaux, enfin, il faut qu'on rende le truc accueillant, quoi.
ChatGPT said:
Parfait, je vais te livrer la version intégrale chef de projet + onboarding développeur “bricoleur”.
Elle va intégrer :

Contexte clair et motivant (pour qu’un dev ou créateur comprenne ce qu’il va manipuler)

Présentation fonctionnelle grand public (style accessible pour ceux qui savent bricoler en HTML/JS)

Doc technique complète (pour ceux qui veulent aller plus loin côté back-end/front-end)

Exemples d’actions simples qu’on peut faire dans l’éditeur sans coder, et avec un peu de code si on veut.
