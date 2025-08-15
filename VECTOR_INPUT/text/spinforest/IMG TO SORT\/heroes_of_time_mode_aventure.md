# Heroes of Time – Cahier des charges Mode Aventure, VectorDB et Archivage

## 1. Introduction & Contexte
Le développement du mode aventure de *Heroes of Time* a pris une direction qui ne correspond pas à la vision initiale.
Le jeu ne doit pas se limiter à une grande carte unique avec un enchaînement confus. L'expérience voulue est un parcours structuré, progressif et immersif, qui amène le joueur de scénarios simples à des batailles complexes.

## 2. Constat & Problème
- **Ce qui existe actuellement** : une grosse carte monolithique, peu de transitions, rythme cassé.
- **Ce qui était prévu** : plusieurs petites aventures/scénarios, chacun avec sa propre mini-map, ambiance, objectifs et transitions.
- **Effet actuel** : le joueur peut se sentir perdu dès l'entrée, sans objectifs clairs.

## 3. Ressources existantes à retrouver
- **Scénarios d’initiation** : progression pédagogique pour apprendre les mécaniques (brouillard de causalité, superposition, Nontius, Rapidus…).
- **Scripts JSON** : définissent la structure et les événements.
- **Fichiers Markdown (MD)** : contiennent les textes, dialogues et lore associés aux JSON.
- **Arborescence organisée** : ces contenus existent sur le disque (probablement dans `Avalon` ou un dossier de débuts de partie).

### Important :
Ces contenus sont déjà créés. **Il ne faut pas les recréer**, mais les retrouver et les réintégrer.

## 4. Vision du mode aventure
### 4.1 Déroulement joueur
1. **Introduction** : le joueur est un héros amnésique, sans pouvoirs temporels.
2. **Scénarios d’initiation** :
   - Labs quantiques/physiques.
   - Cartes avec HTML/décoration personnalisée.
   - Enseignement progressif des mécaniques.
3. **Petites aventures** :
   - Mini-maps dédiées (linéaires au début, puis semi-linéaires/non-linéaires).
   - Quêtes variées : forêt mystérieuse, chasse temporelle, artefact, événements surprises.
4. **Découverte progressive des pouvoirs temporels**.
5. **Grande carte finale** (style Heroes/Magic 3) : exploration libre, gestion de ressources, bataille majeure.

### 4.2 Arborescence
```
Héros sans pouvoirs / amnésique
│
├── Scénarios d’initiation
│   ├─ Labs quantiques/physiques
│   ├─ Brouillard de causalité
│   ├─ Superposition / collapse
│   ├─ Nontius (lent)
│   └─ Rapidus (rapide)
│
├── Petites aventures
│   ├─ Linéaires (early game)
│   ├─ Semi-linéaires / non-linéaires
│   └─ Spéciales (chasse temporelle, surprises)
│
├── Découverte pouvoirs temporels
│
└── Grande carte finale
```

## 5. Actions immédiates côté Front
1. Explorer l’arborescence manuellement (pas de recherches rapides uniquement).
2. Lister tous les scénarios existants (initiation et petites aventures).
3. Associer chaque JSON à son MD.
4. Fournir un inventaire clair.
5. Remplacer la grosse carte par la structure prévue (missions séparées avec transitions).
6. Vérifier la génération de terrain (taille et variété conformes).

## 6. Projet VectorDB (Back-End)
### 6.1 Objectif
Indexer tous les contenus du projet pour permettre une recherche sémantique rapide par humains et IA.

### 6.2 Sources
- `.json` : scripts, scénarios, assets.
- `.md` : textes et lore liés aux JSON.
- Optionnel : `.txt`, `.html`.

### 6.3 Pipeline
1. Scan récursif du dossier racine.
2. Extraction texte + métadonnées (chemin, type, taille, date).
3. Découpage en chunks (500–1000 tokens).
4. Embeddings (modèle OpenAI ou local).
5. Stockage dans Qdrant ou Weaviate.
6. API `/search` et `/doc/{id}`.
7. Interface web + CLI.

### 6.4 Utilité
- Recherche rapide dans 8 000+ fichiers.
- Autonomie de l’équipe.
- Consultation possible par IA.

## 7. Rôle de l’Archiviste
### Mission
- Parcourir l’arborescence, produire un inventaire complet (JSON + MD).
- Lier chaque JSON à son MD.
- Signaler doublons et fichiers orphelins.
- Fournir un tableau clair au back-end.

### Estimation temps (Mac mini M4, 8 cœurs, ~8 000 fichiers)
- Inventaire + hash : 5–15 min.
- Liens JSON↔MD : 3–10 min.
- Index classique (grep) : 1–2 min.
- Vector embeddings (local compact) : 20–60 min.
- Total premier passage : 45–120 min local / 1h30–3h API distante.

## 8. Synthèse finale
- Le mode aventure doit revenir à la vision initiale : petites missions variées, progression claire, apprentissage progressif des mécaniques, puis grande bataille finale.
- Ne pas recréer les contenus existants : ils doivent être retrouvés et réintégrés.
- Le VectorDB est l’outil clé pour rendre tout le contenu accessible rapidement.
- L’archiviste est le point d’entrée pour préparer ces données et permettre leur exploitation par le front et le back.
