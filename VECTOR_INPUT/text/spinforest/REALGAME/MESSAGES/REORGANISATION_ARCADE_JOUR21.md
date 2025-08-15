# RÉORGANISATION ARCADE - JOUR 21

## ACTIONS EFFECTUÉES

### Mini-games déplacés dans ARCADE/
1. **AVALON_RETRO_ARCADE.html** - Jeux rétro style arcade
2. **AVALON_ARCADE_CONNECTED.html** - Version connectée
3. **AVALON_ULTIMATE_ARCADE.html** - Version complète
4. **AVALON_BUBBLE_UNIVERSE.html** - Univers de bulles
5. **AVALON_BUBBLE_ENGINE.js** - Moteur physique bulles
6. **q3_arena_grofi_enterprise_3d.html** - Demo 3D Quake
7. **goldorak_3d_demo.html** - Test rendu 3D
8. **panoramix-cauldron-ui.html** - Interface potions

### Tests/Démos déplacés
1. **test-temporal-creatures.html** - Test créatures temporelles
2. **test-tcg-map-integration.html** - Test intégration TCG
3. **minimap-6d-shaman-integration.html** - Test minimap 6D

## STRUCTURE CLARIFIÉE

### Jeu Principal (reste à la racine)
- **play.html** - Heroes of Time
- **tutorial.html** - Tutoriel
- **welcome.html** - Accueil

### Mini-games (dans ARCADE/)
- Tous les jeux secondaires
- Démos techniques
- Tests visuels

## PRINCIPE
Le dossier ARCADE contient tout ce qui n'est PAS le gameplay principal.
Cela permet de garder le focus sur le vrai jeu : Heroes of Time avec exploration 6D et combat TCG intégré !

## ACCÈS ARCADE
Les mini-games restent accessibles via :
- Menu dans le jeu principal
- Portails spéciaux
- Tour d'Avalon