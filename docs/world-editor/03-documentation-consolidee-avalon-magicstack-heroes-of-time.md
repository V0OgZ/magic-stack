# Documentation Consolidée – Avalon / MagicStack / Heroes of Time

## 1. Contexte & Vision

### 1.1 Vue d’ensemble
Avalon est une **plateforme de développement de jeux narratifs et stratégiques**.  
Elle repose sur **MagicStack**, un moteur orienté **temps, causalité et multivers**, capable de gérer :

- **Timelines multiples** et "brouillard de causalité"
- **Agents régulateurs** (IA de poursuite, régulation, résolution de paradoxes)
- **Combat TCG** et auto-résolution
- **Modes multijoueurs et solo**
- **Minijeux intégrés** (200+)
- **Point-and-click narratifs**
- **Jeux 3D ou 2D top-down**

L’implémentation phare actuelle est **Heroes of Time**, un jeu inspiré de Heroes of Might and Magic mais :
- Temps fluide, pas tour par tour
- Différents rythmes temporels par héros
- Passage dynamique entre exploration carte et combat TCG

---

## 2. Objectif Éditeur Universel Avalon

### 2.1 But
- Offrir un **éditeur visuel** pour créer des mondes, maps, scénarios et jeux complets **sans coder**.
- Fournir des points d’entrée simples aux devs front-end, game designers et scénaristes.
- Centraliser toutes les mécaniques Avalon en un outil unique.

### 2.2 Public cible
- Développeurs front-end
- Level designers
- Scénaristes / narratologues
- Moddeurs et communauté

---

## 3. Architecture Technique Globale

### 3.1 Schéma simplifié
[Éditeur Avalon] <--> [API MagicStack Backend Rust/Python] <--> [Base de données + Assets]


### 3.2 Langages et frameworks
- **Back-end** : Rust (moteur principal) + Python (contrôleurs, routing API)
- **Front-end Éditeur** : React + Canvas/WebGL (PixiJS pour 2D, ThreeJS pour 3D)
- **Persistance** : JSON pour configs, stockage assets sur serveur

---

## 4. Documentation Back-end MagicStack

### 4.1 Contrôleurs principaux
- **World State Graph Controller**
  - Représente le monde et ses entités dans un graphe de causalité
  - Gère les transitions d’état et événements
- **Gustave Search Logic (Q\*)**
  - Algorithme de parcours optimal temporel (prise en compte objets, buffs, portails)
- **Paradox Resolution**
  - Combat TCG forcé ou résolution auto
- **Agent Controllers**
  - IA pour régulation, poursuite, gestion surcharge/dégradation

### 4.2 API (exemples)
| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/world/state` | GET | Récupère l’état complet du monde |
| `/world/update` | POST | Modifie l’état du monde (params JSON) |
| `/agent/spawn` | POST | Crée un agent régulateur avec paramètres |
| `/agent/config` | POST | Met à jour comportements et priorités IA |
| `/timeline/add_event` | POST | Ajoute un événement temporel |
| `/timeline/simulate` | GET | Simule un déroulement temporel |
| `/paradox/resolve` | POST | Déclenche une résolution manuelle/auto |

---

## 5. Documentation Front-end Éditeur

### 5.1 Modules
- **Éditeur de Carte** : gestion du terrain, placement objets/agents
- **Timeline Visuelle** : ajout/suppression/liaison d’événements
- **Panneau Paramètres Monde** : vitesse, météo, IA, ressources
- **Fenêtre Code Intégré** : JS/TS/Python avec autocomplétion Avalon
- **Test & Export** : simulation en direct et export projet

### 5.2 Flux Utilisateur
1. Choisir un **template de jeu** (Heroes-like, TCG, Sandbox…)
2. Construire la **map**
3. Configurer **timelines et causalité**
4. Ajouter des **agents régulateurs**
5. Insérer du code (facultatif)
6. Tester
7. Exporter

---

## 6. Spécifications Fonctionnelles Éditeur (Version condensée)

### MVP
- Carte 2D avec placement entités
- Paramétrage simple du monde
- Timeline basique
- Playtest local

### V2
- Timeline avancée + causalité
- Intégration Memento (génération et aide au code)
- Export projets
- Support 3D

### V3
- Éditeur communautaire en ligne
- Marketplace de maps/scénarios
- Intégration complète minijeux

---

## 7. Notes de Collaboration

- **Accès mémoire et contexte** : si vous utilisez le même compte OpenAI dans Cursor, les infos projet sont conservées.  
- **Accès code** : à fournir via dépôt Git ou partage direct.
- **Memento** : IA copilote intégrée à l’éditeur pour minimiser la lecture de docs.
Ce document peut servir de kit de démarrage pour n’importe quel dev qui rejoint.
Si tu veux, je peux te faire dans la foulée un diagramme arborescent complet des écrans et modules de l’éditeur, avec inputs/outputs pour chaque API, comme une vraie doc interne.
Ça, ça sera le plan technique qu’un dev front ou back pourra suivre sans te poser 1000 questions.

You said:
Bah je veux bien que tu continues, ça me semble un petit peu léger, imagine que t'es chef de projet et que tu donnes ça à des développeurs indiens quoi.
ChatGPT said:
Parfait, je vais te faire la version chef de projet :

On garde ce qu’on a déjà fait comme chapitres initiaux,

On rajoute toutes les précisions manquantes,

On complète avec diagrammes d’écrans/modules, tableaux détaillés des endpoints (avec paramètres et réponses attendues), flux back-end <-> front-end, et exigences de qualité pour que n’importe quel dev offshore sache exactement quoi faire.
