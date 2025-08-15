# SYSTÈME POCKET WORLDS - RÉVOLUTION DU LEVEL DESIGN

## CONCEPT CORE : POCKET WORLDS

### Principe fondamental
- **Extérieur** : Bâtiment normal sur la carte principale
- **Intérieur** : MONDE ENTIER miniature avec ses propres règles temporelles
- **Transition** : Portail/porte = changement d'échelle et de dimension

### Avantages techniques
1. **Performance** : Charge seulement le pocket world actif
2. **Densité** : Chaque bâtiment = niveau complet
3. **Surprise** : Extérieur petit → Intérieur immense
4. **Modularité** : Facile d'ajouter de nouveaux pocket worlds

## LE MUSÉE TEMPOREL - POCKET WORLD MAJEUR

### Concept
Un musée qui semble petit dehors mais contient L'HISTOIRE ENTIÈRE du monde

### Structure du Musée
```
HALL D'ENTRÉE
    |
    ├── AILE DU PASSÉ (Pocket Worlds historiques)
    ├── AILE DU PRÉSENT (Expositions interactives)
    ├── AILE DU FUTUR (Visions possibles)
    └── SOUS-SOL SECRET (Paradoxes et temps alternatifs)
```

### Mécaniques du Musée
1. **TABLEAUX VIVANTS**
   - Entrer dans un tableau = Pocket World de cette époque
   - Interagir avec la scène historique
   - Modifier le passé = changer l'exposition

2. **DIORAMAS TEMPORELS**
   - Maquettes qui deviennent des mondes réels
   - Échelle 1:1000 → Échelle 1:1 en entrant
   - Les figurines deviennent des PNJ vivants

3. **OBJETS EXPOSÉS**
   - Toucher un artefact = vivre son histoire
   - Armure ancienne → Bataille épique (pocket world)
   - Couronne royale → Cour royale (pocket world)
   - Carte au trésor → Île mystérieuse (pocket world)

## TYPES DE POCKET WORLDS

### 1. POCKET WORLDS BÂTIMENTS
**Taverne "Le Temps Perdu"**
- Extérieur : Petite taverne
- Intérieur : 5 étages temporels
  - Cave : Contrebandiers du passé
  - RDC : Bar normal
  - Étage 1 : Chambres qui mènent à d'autres époques
  - Étage 2 : Casino temporel
  - Grenier : Observatoire des futurs

**Tour du Mage**
- Extérieur : Tour de 3 étages
- Intérieur : 100 étages impossibles
  - Bibliothèque infinie
  - Laboratoires dimensionnels
  - Prison pour créatures temporelles
  - Sommet : Vue sur TOUS les temps

### 2. POCKET WORLDS VÉHICULES
**Navire "Chronos"**
- Extérieur : Bateau normal
- Intérieur : 
  - Cale : Océan préhistorique
  - Pont : Mer actuelle
  - Cabines : Portails vers d'autres mers
  - Nid de pie : Phare temporel

**Train Fantôme**
- Chaque wagon = époque différente
- Locomotive = salle de contrôle temporel
- Voyager entre les wagons = voyager dans le temps

### 3. POCKET WORLDS OBJETS
**Boîte à musique**
- Ouvrir = entrer dans un bal de 1850
- La musique contrôle le temps
- Danser pour résoudre des énigmes

**Livre ancien**
- Entrer littéralement dans l'histoire
- Chapitres = niveaux différents
- Modifier le texte = changer le monde

### 4. POCKET WORLDS NATURELS
**Arbre Millénaire**
- Entrer par une cavité
- Intérieur : Forêt entière à travers les saisons
- Racines : Monde souterrain
- Branches : Royaume céleste

**Grotte Cristalline**
- Petit trou → Immense réseau
- Chaque cristal = fenêtre temporelle
- Reflets créent des mondes miroirs

## MÉCANIQUES D'IMPLÉMENTATION

### Transition Pocket World
```
1. Approcher de l'entrée
2. Prompt "Entrer dans [Nom du Pocket World]"
3. Effet visuel (zoom, tourbillon, fondu)
4. Chargement du pocket world
5. Spawn dans le nouveau monde
```

### Règles spéciales par Pocket World
- **Gravité modifiée** : Marcher sur les murs/plafond
- **Temps accéléré/ralenti** : 1 minute dehors = 1 heure dedans
- **Physique alternative** : Nager dans l'air, voler sous l'eau
- **Échelle variable** : Grandir/rétrécir selon les zones

### Interconnexions
- Certains pocket worlds connectés entre eux
- Passages secrets entre les mondes
- Téléporteurs cachés
- Puzzles multi-pocket worlds

## EXEMPLES CONCRETS POUR LE MUSÉE

### Salle des Batailles Perdues
**Tableau** : "La Dernière Charge"
- Entrer : Revivre la bataille
- Objectif : Sauver le héros oublié
- Récompense : Son épée apparaît dans le musée

### Galerie des Futurs Possibles
**Installation** : "Cristal de Probabilité"
- 5 futurs différents accessibles
- Choisir ses actions influence quel futur se réalise
- Le musée change selon vos choix

### Archive Vivante
**Livre géant** : "Chroniques d'Avalon"
- Chaque page = pocket world d'un événement
- Corriger les erreurs historiques
- Débloquer les chapitres cachés

### Aile des Civilisations Perdues
**Maquette** : "Atlantis Miniature"
- Entrer : Ville entière sous-marine
- Rencontrer les derniers habitants
- Découvrir pourquoi elle a coulé

## PROGRESSION ET RÉCOMPENSES

### Système de Tickets
- Tickets temporels pour accéder aux pocket worlds premium
- Gagner des tickets en résolvant des énigmes
- Tickets VIP : Accès aux pocket worlds secrets

### Collection
- Compléter le musée en ramenant des artefacts
- Chaque pocket world = nouvel objet exposé
- Débloquer de nouvelles ailes

### Capacités spéciales
- **Vision du Conservateur** : Voir les entrées cachées
- **Passe Musée** : Accès illimité
- **Gants du Restaurateur** : Interagir avec plus d'objets

## POTENTIEL NARRATIF

### Quêtes principales via Pocket Worlds
1. Retrouver les 7 tableaux volés (7 mondes)
2. Restaurer la fresque temporelle (puzzle multi-mondes)
3. Libérer le Gardien du Musée (boss dans un pocket world)

### Révélations histoire
- Chaque pocket world révèle un fragment du lore
- Les visiteurs du musée donnent des indices
- Le directeur du musée = personnage clé mystérieux

### Easter eggs
- Pocket worlds cachés dans les toilettes
- Monde miniature dans une tasse de thé
- Univers entier dans un grain de poussière

## IMPLÉMENTATION TECHNIQUE SIMPLE

```javascript
// Structure basique
PocketWorld = {
  id: "musee_tableau_01",
  name: "Bataille des Mille Lunes",
  type: "tableau_vivant",
  scale_factor: 1000,
  time_rules: "accelerated_x10",
  entry_point: {x: 100, y: 200},
  exit_points: [{id: "musee_hall", x: 0, y: 0}],
  special_physics: "low_gravity"
}

// Transition
function enterPocketWorld(worldId) {
  fadeOut();
  unloadCurrentWorld();
  loadPocketWorld(worldId);
  applyWorldRules(worldId);
  fadeIn();
}
```

Ce système transforme CHAQUE bâtiment en aventure complète ! Le musée devient le HUB parfait pour découvrir l'histoire et les mécaniques du jeu !