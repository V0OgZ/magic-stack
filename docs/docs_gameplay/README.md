# 🎮 Gameplay - Magic Stack

## 🎯 Usage In-Game

La Magic Stack transforme les intentions des joueurs en effets magiques concrets dans Heroes of Time.

## ⚡ Types d'Effets Magiques

### 1. **Sorts de Déplacement**
- **Téléportation** : Déplacement instantané
- **BRISURE** : Navigation interdimensionnelle
- **Phase Shift** : Changement de phase temporelle

### 2. **Sorts de Combat**
- **Invocation** : Créatures et alliés
- **Protection** : Boucliers et défenses
- **Sorts offensifs** : Dégâts et contrôle

### 3. **Sorts Utilitaires**
- **Communication** : Dialogue interdimensionnel
- **Mémoire** : Persistance d'états
- **Organisation** : Structuration de l'espace

## 🎲 Mécaniques de Jeu

### **Coût en Mana**
Chaque sort a un coût énergétique :
```json
{
  "cout_mana": 50,
  "cooldown": 3,
  "niveau_requis": 5
}
```

### **Effets Temporels**
- **Δt+0** : Effet immédiat
- **Δt+1** : Effet au tour suivant
- **Δt+n** : Effet différé

### **Synergies**
- **Combo sorts** : Effets combinés
- **Chaînes magiques** : Séquences d'effets
- **Résonance** : Amplification mutuelle

## 🃏 Intégration Cartes (ALPHACARDS)

### **Cartes Magiques**
Les sorts deviennent des cartes jouables :
- **Coût** : Mana requis
- **Effet** : Formule magique
- **Visuel** : Animation correspondante

### **Exemples**
```json
{
  "carte": "Téléportation Cosmique",
  "sort": "sort_teleportation.json",
  "effet_visuel": "cosmic_teleport",
  "formule": "⊙(entité) + Π(destination) → Δt+0(téléportation)"
}
```

## 🌟 Interactions Joueur

### **Interface Simplifiée**
1. **Sélection sort** → Menu/Cartes
2. **Ciblage** → Clic/Sélection
3. **Exécution** → Animation + Effet
4. **Résultat** → Feedback visuel

### **Feedback Magique**
- **Particules** : Effets visuels
- **Sons** : Audio magique
- **Vibrations** : Retour haptique (mobile)

## 🎭 Narratif et RP

### **Sorts Narratifs**
Chaque sort enrichit l'histoire :
- **Descriptions** immersives
- **Conséquences** narratives
- **Évolution** du monde

### **Personnalisation**
- **Styles magiques** par héros
- **Évolution** des sorts
- **Apprentissage** progressif

---

*Guide gameplay par URZ-KÔM - Gardien des Effets Magiques*