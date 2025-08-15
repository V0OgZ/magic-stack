# IMPLÉMENTATION POCKET WORLDS - GUIDE PRIORITÉ ABSOLUE

## POURQUOI C'EST RÉVOLUTIONNAIRE

1. **Densité infinie** : Une ville de 20 bâtiments = 20 mondes complets
2. **Performance** : Charge seulement ce qui est nécessaire
3. **Surprise constante** : Jamais savoir ce qui nous attend
4. **Narration immersive** : Vivre l'histoire, pas juste la lire

## IMPLEMENTATION PHASE 1 - LE MUSÉE

### Structure de base
```
MAP PRINCIPALE
    └── Bâtiment Musée (petit, 20x30 tiles)
         └── POCKET WORLD MUSÉE (immense, 500x500 tiles minimum)
              ├── Hall Central (hub)
              ├── Aile Passé (5 salles → 5 pocket worlds)
              ├── Aile Présent (expositions interactives)
              └── Aile Futur (3 visions → 3 pocket worlds)
```

### Premier Pocket World Test : "La Bataille Oubliée"
**Tableau dans le musée** : Peinture 2x3 tiles
**Pocket World** : Champ de bataille 100x100 tiles

**Implémentation** :
1. Joueur approche du tableau
2. Prompt "Examiner 'La Bataille Oubliée'"
3. Écran devient le tableau (zoom)
4. Le tableau s'anime
5. Joueur "tombe" dans le tableau
6. Spawn au milieu de la bataille

**Gameplay** :
- Pas de combat direct
- Mission : Retrouver l'étendard perdu
- Utiliser la Vision Temporelle pour voir où il est tombé
- Le ramener change l'issue de la bataille
- Sortie : Toucher les bords du tableau

### Mécaniques simples pour commencer
1. **Entrée/Sortie**
   - Point d'entrée fixe
   - Points de sortie multiples (bords du monde)
   - Transition : Fondu noir simple

2. **Règles du Pocket World**
   - Temps figé : Les soldats bougent seulement quand vous bougez
   - Échelle : Vous êtes plus petit (perspective de peinture)
   - Physique : Peut marcher sur les lances volantes

3. **Récompenses**
   - Ramener l'étendard = Il apparaît dans le musée réel
   - Débloquer la description historique
   - +1 Fragment Temporel

## PHASE 2 - EXPANSION RAPIDE

### 5 Pocket Worlds prioritaires

1. **"Le Jardin Éternel"** (Diorama)
   - Mini jardin → Jardin infini
   - Puzzle : Faire pousser l'Arbre de Vie
   - Mécanique : Saisons en accéléré

2. **"Le Navire Fantôme"** (Maquette)
   - Bateau miniature → Galion complet
   - Explorer les cabines temporelles
   - Trouver le journal du capitaine

3. **"La Première Cité"** (Carte ancienne)
   - Plan 2D → Ville 3D vivante
   - Rencontrer les fondateurs
   - Découvrir le secret de la fondation

4. **"L'Armure du Héros"** (Objet exposé)
   - Entrer dans les souvenirs de l'armure
   - Revivre 3 batailles clés
   - Comprendre le sacrifice du héros

5. **"Le Miroir des Possibles"** (Installation)
   - Reflet → Monde miroir
   - Tout est inversé (gauche/droite, temps)
   - Coopérer avec son reflet

## PHASE 3 - SYSTÈME COMPLET

### Types de transitions
1. **Tableau** : Zoom + animation du cadre
2. **Porte** : Ouvrir → autre dimension
3. **Objet** : Toucher → rétrécir et entrer
4. **Miroir** : Traverser la surface
5. **Livre** : Pages qui s'ouvrent autour du joueur

### Interconnexions
- Passage secret du Navire → Jardin
- Miroir dans l'Armure → Monde inversé
- Carte dans la Cité → Nouveau quartier

### Progression
- Débloquer des "Clés de Conservateur"
- Accéder aux pocket worlds verrouillés
- Devenir "Maître du Musée" (accès total)

## CODE STRUCTURE SIMPLE

```python
# Structure Pocket World
pocket_worlds = {
    "musee_bataille": {
        "name": "La Bataille Oubliée",
        "size": (100, 100),
        "entry_type": "painting_zoom",
        "special_rules": ["time_freeze", "small_scale"],
        "objectives": ["find_banner"],
        "rewards": ["banner_artifact", "temporal_fragment"],
        "exit_method": "touch_border"
    }
}

# Transition
def enter_pocket_world(world_id, entry_point):
    current_world.pause()
    transition_effect(pocket_worlds[world_id]["entry_type"])
    new_world = load_pocket_world(world_id)
    player.position = entry_point
    apply_special_rules(new_world.rules)
    new_world.start()

# Dans le Musée principal
def interact_with_painting():
    if player.near("bataille_painting"):
        show_prompt("Entrer dans 'La Bataille Oubliée'?")
        if confirm():
            enter_pocket_world("musee_bataille", (50, 50))
```

## BÉNÉFICES IMMÉDIATS

1. **Contenu infini** : Ajouter un pocket world = ajouter un niveau complet
2. **Mystère** : Les joueurs exploreront TOUT
3. **Rejouabilité** : Certains pocket worlds changent à chaque visite
4. **Performance** : Petite map principale, mondes séparés
5. **Narration** : Vivre l'histoire directement

## PROCHAINES ÉTAPES

1. Créer le Musée sur la map principale
2. Implémenter le premier pocket world (Bataille)
3. Tester les transitions
4. Ajouter 2-3 pocket worlds
5. Système de récompenses/progression

Le POCKET WORLD MUSÉE devient LE feature qui rend le jeu unique !