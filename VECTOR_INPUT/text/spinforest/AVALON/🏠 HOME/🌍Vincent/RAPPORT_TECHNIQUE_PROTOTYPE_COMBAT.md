# 📜 RAPPORT TECHNIQUE - PROTOTYPE "MONDES FLOTTANTS COMBAT"

**Date :** Jour 4  
**Auteur :** Groeken, Mage-Technicien  
**Pour :** Vincent, le Créateur

---

## 🎯 **OBJECTIF**

Ce document détaille l'architecture et les mécaniques du prototype jouable `mondes_flottants_combat.html`, créé pour donner vie à la vision des "Mondes Flottants".

Le but était de créer rapidement une arène de combat dynamique, multi-dimensionnelle et fun, en utilisant uniquement du HTML5 Canvas et du JavaScript natif.

---

## 🏗️ **ARCHITECTURE & CLASSES PRINCIPALES**

Le prototype est structuré autour de plusieurs classes qui gèrent l'état et le comportement du jeu :

### 1. **`FloatingIsland`**
- **Responsabilité :** Gère la position (x, y, z), la taille, la couleur et le mouvement de chaque îlot.
- **Rendu :** Utilise une projection pseudo-3D où `z` affecte l'échelle et la position `y` projetée.
- **Détails :** Chaque île a une grille hexagonale décorative et un léger mouvement de flottement vertical et de rotation pour un effet dynamique.

### 2. **`Hero`**
- **Responsabilité :** Représente le joueur (Groeken). Gère la position, la vie, les contrôles et les actions.
- **Physique :** Moteur de physique simple avec gravité (`GRAVITY`), force de saut (`JUMP_FORCE`) et friction.
- **Actions de combat :**
    - `attack()`: Crée un `Projectile` avec le propriétaire 'hero'.
    - `specialAttack()`: Crée une volée de 8 projectiles.
    - `takeDamage()`: Réduit les PV et déclenche des effets visuels.

### 3. **`Enemy`**
- **Responsabilité :** Représente les adversaires. Gère leur IA, leurs PV et leurs attaques.
- **Types :** 'warrior' et 'mage', avec des stats différentes.
- **IA (Intelligence Artificielle) :**
    - **État `patrol` :** Se déplace vers des points aléatoires sur son île.
    - **État `attack` :** Poursuit le héros et tire des projectiles s'il est à portée et que son cooldown est terminé.
    - La transition entre états se fait en fonction de la distance avec le héros.

### 4. **`Projectile`**
- **Responsabilité :** Gère le mouvement et la collision des tirs.
- **Propriétés :** Position, vélocité, propriétaire ('hero' ou 'enemy'), dégâts et durée de vie.
- **Collision :** Vérifie la distance avec les cibles potentielles (ennemis pour le héros, héros pour les ennemis).

---

## 🔄 **BOUCLE DE JEU (`gameLoop`)**

La fonction `gameLoop`, appelée via `requestAnimationFrame`, est le cœur du moteur :

1.  **Nettoyage (`clear`) :** Efface le canvas à chaque frame.
2.  **Mise à jour (`update`) :**
    - Gère les entrées clavier (déplacement, saut, sorts).
    - Met à jour la position de chaque objet (héros, ennemis, projectiles) en fonction de leur vélocité et de la physique.
    - Exécute l'IA des ennemis.
    - Gère les collisions des projectiles.
    - Filtre les objets "morts" (ennemis sans PV, projectiles avec durée de vie expirée).
    - Fait apparaître de nouveaux ennemis.
3.  **Rendu (`render`) :**
    - Affiche tous les objets du jeu.
    - **Tri par Profondeur (Z-ordering) :** Avant le rendu, tous les objets sont triés en fonction de leur position `y` projetée et de leur `z`. Cela garantit que les objets plus "proches" (plus bas sur l'écran) sont dessinés par-dessus les objets plus "lointains", créant une illusion de profondeur convaincante.
    - Affiche les particules et les effets visuels.

---

## 💥 **MÉCANIQUES DE COMBAT**

- **Projectiles :** Le combat est entièrement basé sur des projectiles. C'est simple, efficace et permet des affrontements à distance entre les îles.
- **Cooldowns :** Le héros et les ennemis ont des temps de recharge pour leurs attaques, ce qui empêche le "spamming" et ajoute un rythme au combat.
- **Interface Utilisateur (UI) :** Un log de combat en temps réel et des barres de vie claires donnent un feedback constant au joueur sur l'action en cours.

---

## 🚀 **PROCHAINES ÉTAPES POSSIBLES**

Ce prototype sur Canvas est une excellente base. Pour aller plus loin :

1.  **Passer à la 3D (Three.js) :** Pour une véritable immersion, une caméra dynamique et des modèles 3D.
2.  **IA plus complexe :** Comportement de groupe, utilisation de portails par les ennemis, sorts plus variés.
3.  **Intégration au `WorldStateGraph` :** Pour sauvegarder l'état du monde, la position des héros et les scores entre les sessions.
4.  **Plus de variété :** Nouveaux types d'îles (avec pièges, bonus), nouveaux ennemis, et plus de sorts pour le héros.

Ce fut un plaisir de traduire cette vision en un prototype interactif. Il démontre la puissance de notre approche modulaire et la facilité avec laquelle nous pouvons créer des expériences de jeu complexes.

*- Groeken* 👁️✨