# Guide Créateur — Éditeur Jouable (V2)

Objectif: créer une map jouable en 3 minutes, sans être développeur.

## 1) Lancer l'éditeur
- Démarrez tout: `./go start`
- Ouvrez le client: `http://localhost:5175/unified`

## 2) Créer un monde et une map
- En haut à gauche:
  - Cliquez « 🆕 Nouveau World » (20x20 recommandé au début)
  - Une map « Nouvelle Map » est créée automatiquement

## 3) Placer des éléments (ressources/créatures/bâtiments…)
- Mode « resources » (par défaut):
  - À gauche, choisissez une catégorie (ex: "🐉 Créatures", "💎 Ressources")
  - Cliquez une icône (ex: dragon, gem)
  - Cliquez dans la zone centrale pour la placer
  - Astuce: Shift+clic pour zoomer/dézoomer via la mini-map

Types (automatique selon la catégorie):
- 🐉 Créatures → type "creature"
- 💎 Ressources → type "resource"
- 🏗️ Bâtiments → type "building"
- 📍 Marqueurs/⏰ Temporel/⚔️ Combats → type "marker"/"artifact"

## 4) Éditer une entité
- Cliquez une icône placée → panneau de droite
  - Position 6D: X/Y/Z/T/C/Ψ
  - Énergie complexe (A, Φ) si utile
  - Taille/Rotation/Opacité
  - Supprimer l’icône si besoin

## 5) Sauvegarder et recharger
- Bouton « 💾 Save Map »: sauvegarde (Java 8082 si dispo, sinon local)
- Bouton « ⤓ Load Last »: recharge la dernière map sauvegardée localement

## 6) Synchroniser au moteur
- Bouton « 🔄 Sync to Engine »: envoie toutes les entités de la map au moteur (Rust 3001)
  - Appels REST: `POST /api/v2/entity` pour chaque ressource
  - Format minimal:
    ```json
    {
      "id": "resource_123",
      "position": { "x": 120, "y": 340 },
      "te": 0.0,
      "energy_complex": { "A": 75, "phi": 1.57 }
    }
    ```

## 7) Jouer
- Si au moins une ressource est placée, le bouton « ▶️ PLAY THIS MAP » apparait
- Cliquez pour entrer en mode jeu
  - Déplacement: cliquez sur une entité puis sur une cellule (grille hex)
  - Fin de tour: « ⏭️ Fin de Tour »

## 8) Régulateurs (optionnel)
- Dans l’éditeur d’icônes (MapIconPlacer V2), utilisez les boutons:
  - ⚡ Vince (brouillard)
  - 🌀 Anna (décroissance)
  - 💥 Overload (stack)
  - Effets visibles dans l’UI et utilisés au tick

## 9) Dépannage rapide
- API Explorer: `http://localhost:5175/html/API_EXPLORER_COMPLETE.html`
- Rust health: `http://localhost:3001/health`
- Java health: `http://localhost:8082/health`
- Vector DB: `http://localhost:7500/health`

## 10) Export/Partage
- Menu « 💾 Export »: télécharge un JSON (world + map)
- Partagez le fichier à un autre créateur; il peut « Importer » et continuer


