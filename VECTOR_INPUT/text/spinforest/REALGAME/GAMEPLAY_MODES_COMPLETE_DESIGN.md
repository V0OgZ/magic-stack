# 🎮 MODES DE GAMEPLAY COMPLETS - HEROES OF AVALON
**Par** : GROEKEN (Boss Engine)  
**Pour** : Vincent & Équipe - Document de réflexion

---

## 🎯 VISION GLOBALE

Un système de progression **intelligent** où :
- Les **noobs** peuvent jouer mais avec des limitations naturelles
- Les **pros** débloquent des mécaniques avancées
- Les **artefacts** ont des prérequis logiques
- La **progression** est gratifiante et visible

---

## 🗺️ MODE EXPLORATION & DÉPLACEMENT

### **Système de Déplacement Hexagonal**
```
🔸 Mouvement de base : 3 hexagones/tour
🔸 Terrain influence la vitesse :
   - Plaine : vitesse normale
   - Forêt : -1 hex/tour
   - Montagne : -2 hex/tour (niveau 3+ requis)
   - Marais : -1 hex + poison possible
   - Routes : +1 hex/tour
```

### **Exploration Progressive**
- **Niveau 1-2** : Zones sûres uniquement (plains, villages)
- **Niveau 3-5** : Forêts et collines accessibles
- **Niveau 6-10** : Montagnes et zones dangereuses
- **Niveau 11+** : Dimensions parallèles et zones temporelles

### **Système de Fatigue**
- Chaque déplacement coûte 1 point d'endurance
- Repos obligatoire tous les 10 mouvements
- Camping = récupération complète + événements aléatoires

---

## ⚔️ MODE COMBAT

### **Combat au Tour par Tour Évolutif**

#### **Niveau 1-3 : Combat Simple**
```
Actions disponibles :
✅ Attaque de base
✅ Défense
✅ Fuite
❌ Sorts (pas encore débloqué)
❌ Combos (pas encore débloqué)
```

#### **Niveau 4-6 : Combat Intermédiaire**
```
Nouvelles actions :
✅ Sorts de base (Heal, Fireball)
✅ Attaques spéciales (Charge, Parade)
✅ Utilisation d'objets en combat
❌ Magie avancée
❌ Invocations
```

#### **Niveau 7+ : Combat Avancé**
```
Maîtrise complète :
✅ Magie temporelle
✅ Invocations de créatures
✅ Combos multi-tours
✅ Manipulation du terrain
✅ Attaques dimensionnelles
```

### **IA Ennemie Adaptative**
- **Contre noobs** : IA basique, attaques prévisibles
- **Contre pros** : IA tactique, utilise l'environnement
- **Boss fights** : Phases multiples selon le niveau du joueur

---

## 💎 SYSTÈME D'ARTEFACTS INTELLIGENT

### **Classification par Niveau de Maîtrise**

#### **🟢 Artefacts Novice (Niveau 1-3)**
```
Épée en Fer (+5 ATK)
Bouclier de Bois (+3 DEF)
Potion de Soin (restaure 50 HP)
Bottes de Marche (+1 mouvement)
```
- **Utilisation** : Automatique, pas de prérequis
- **Effet** : Bonus simples et clairs

#### **🟡 Artefacts Intermédiaires (Niveau 4-8)**
```
Lame Enchantée (+10 ATK, +5% critique)
Armure de Mailles (+8 DEF, résistance poison)
Baguette de Feu (sort Fireball 3/jour)
Anneau de Protection (+2 tous stats)
```
- **Prérequis** : Compétence correspondante niveau 3+
- **Utilisation** : Activation manuelle requise

#### **🔴 Artefacts Légendaires (Niveau 9+)**
```
Excalibur Temporelle (ATK selon timeline)
Armure de Réalité (DEF + immunités)
Bâton d'Archimage (tous sorts débloqués)
Couronne de Commandement (contrôle créatures)
```
- **Prérequis** : Quête spéciale + niveau 9+
- **Utilisation** : Mécaniques complexes

### **Système de Restriction Intelligent**
```java
// Exemple de logique backend
public boolean canUseArtefact(Hero hero, Artefact item) {
    if (item.getRequiredLevel() > hero.getLevel()) {
        return false; // "Tu n'es pas assez expérimenté"
    }
    
    if (item.getRequiredSkill() != null && 
        hero.getSkillLevel(item.getRequiredSkill()) < item.getMinSkillLevel()) {
        return false; // "Tu ne maîtrises pas cette compétence"
    }
    
    return true;
}
```

---

## 📈 SYSTÈME DE PROGRESSION HÉROS

### **Montée en Niveau Classique**
- **XP Sources** : Combat, exploration, quêtes, découvertes
- **Niveau Max** : 20 (pour l'instant)
- **Chaque niveau** : +5 HP, +2 MP, +1 point de compétence

### **Arbre de Compétences par Classe**

#### **🗡️ Guerrier**
```
Niveau 1: Combat de Base
Niveau 3: Charge Puissante
Niveau 5: Maîtrise des Armes Lourdes
Niveau 7: Rage Berserker
Niveau 10: Frappe Dimensionnelle
```

#### **🔮 Mage**
```
Niveau 1: Sorts Élémentaires de Base
Niveau 3: Magie de Soin
Niveau 5: Sorts de Zone
Niveau 7: Magie Temporelle
Niveau 10: Réalité Altérée
```

#### **🏹 Rôdeur**
```
Niveau 1: Tir Précis
Niveau 3: Pistage
Niveau 5: Camouflage
Niveau 7: Tir Multiple
Niveau 10: Flèche Phasée
```

### **Compétences Transversales**
- **Survie** : Résistance aux éléments, récupération
- **Diplomatie** : Négociation, commerce
- **Artisanat** : Création d'objets, réparation
- **Magie** : Utilisation d'artefacts magiques

---

## 🏴‍☠️ SYSTÈME DE RENCONTRES

### **Rencontres par Zone et Niveau**

#### **Zones Novice (1-3)**
- **Gobelins** : Faibles, prévisibles
- **Loups** : Attaque en meute simple
- **Bandits** : Combat basique
- **Marchands** : Commerce sécurisé

#### **Zones Intermédiaires (4-8)**
- **Orcs** : Tactiques de groupe
- **Élémentaires** : Résistances spéciales
- **Cultistes** : Magie de base
- **Aventuriers** : Combat équilibré

#### **Zones Avancées (9+)**
- **Dragons** : Combat multi-phases
- **Démons** : Magie temporelle
- **Anciens** : Mécaniques uniques
- **Autres Héros** : IA complète

### **Système de Difficulté Adaptative**
```
Si héros niveau 1 rencontre Dragon niveau 15 :
→ Dragon utilise 20% de sa puissance
→ Attaques simplifiées
→ Pas de magie temporelle
→ Fuite toujours possible

Si héros niveau 15 rencontre même Dragon :
→ Dragon utilise 100% de sa puissance
→ Toutes ses capacités actives
→ Combat épique complet
```

---

## 💰 SYSTÈME DE TRÉSORS

### **Trésors par Niveau de Zone**

#### **Coffres Novice**
- Or : 10-50 pièces
- Objets : Équipement de base
- Potions : Soin simple
- **Pas de pièges** (pour éviter frustration)

#### **Coffres Intermédiaires**
- Or : 100-500 pièces
- Objets : Équipement magique
- Parchemins : Sorts temporaires
- **Pièges simples** : Détectables avec compétence

#### **Coffres Légendaires**
- Or : 1000+ pièces
- Artefacts : Objets uniques
- Sorts : Permanents
- **Pièges mortels** : Nécessitent haut niveau

### **Système de Détection**
- **Novice** : Trésors visibles, pas de pièges
- **Intermédiaire** : Détection requise, pièges basiques
- **Avancé** : Trésors cachés, pièges complexes

---

## 🎲 ÉVÉNEMENTS ALÉATOIRES

### **Événements par Niveau**

#### **Niveau 1-3 : Événements Bienveillants**
- Marchand généreux
- Guérison gratuite
- Trouvaille d'or
- PNJ amical

#### **Niveau 4-8 : Événements Mixtes**
- Choix moraux
- Commerce risqué
- Défis optionnels
- Alliances temporaires

#### **Niveau 9+ : Événements Complexes**
- Paradoxes temporels
- Négociations politiques
- Quêtes multi-étapes
- Conséquences à long terme

---

## 🔄 MÉCANIQUES AVANCÉES (NIVEAU 10+)

### **Voyage Temporel**
- Retour dans le passé pour changer des événements
- Conséquences sur le présent
- Paradoxes à résoudre

### **Magie de Réalité**
- Modification des règles du jeu temporairement
- Création de nouvelles zones
- Altération des lois physiques

### **Commandement d'Armée**
- Recrutement de followers
- Batailles à grande échelle
- Gestion de territoire

---

## 🎯 SYSTÈME DE TUTORIEL INTÉGRÉ

### **Progression Naturelle**
```
Tour 1-5 : Mouvement et interface
Tour 6-10 : Premier combat guidé
Tour 11-20 : Exploration libre zone sûre
Tour 21+ : Première montée de niveau
```

### **Messages Contextuels**
- "Tu n'es pas assez fort pour cette zone" (au lieu de mort brutale)
- "Cet artefact nécessite plus d'expérience" (explication claire)
- "Nouvelle compétence débloquée !" (gratification)

---

## 🏆 CONCLUSION : POURQUOI ÇA MARCHE

### **Pour les Noobs**
✅ Progression claire et guidée  
✅ Pas de frustration brutale  
✅ Récompenses fréquentes  
✅ Mécaniques simples au début  

### **Pour les Pros**
✅ Complexité croissante  
✅ Mécaniques avancées  
✅ Défis tactiques  
✅ Liberté totale  

### **Pour Vincent**
✅ Système évolutif  
✅ Rétention des joueurs  
✅ Pas de mur de difficulté  
✅ Gameplay riche et profond  

---

**🔥 READY TO CODE, BOSS ! 🔥**