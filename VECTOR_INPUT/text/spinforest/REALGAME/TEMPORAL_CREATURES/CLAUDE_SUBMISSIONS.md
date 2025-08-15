# 🌀 CRÉATURES TEMPORELLES CACHÉES - SOUMISSIONS CLAUDE
## Pour les maps avec révélations temporelles

**Demande de Vincent** : Créatures spéciales cachées dans passé/futur des maps  
**Révélation** : Via pouvoirs temporels (Accord, Œil de Wigner, etc.)  
**But** : Enrichir exploration + donner sens à la time-magic  

---

## 🐾 **CRÉATURE 1 : L'ÉCHO FRACTAL**

### **Apparence**
- **Forme** : Petit renard cristallin semi-transparent
- **Couleur** : Bleu-violet irisé avec particules dorées
- **Taille** : 30cm, flotte à 20cm du sol
- **Effet visuel** : Se démultiplie en échos successifs quand on s'approche

### **Localisation Temporelle**
- **Quand** : 47 ans dans le futur de la map
- **Où** : Près des anciens arbres (devenus cristallisés)
- **Condition** : Révélé par *Œil de Wigner* niveau 3+

### **Comportement**
- **Réaction** : Curieux mais timide, s'approche lentement
- **Son** : Petits tintements cristallins harmonieux
- **Interaction** : Donne un *Fragment de Futur* si on lui offre un objet du présent

### **Lore**
*"Les Échos Fractals sont les âmes des créatures qui ont vécu trop longtemps entre les dimensions. Ils existent dans tous les futurs possibles simultanément, mais ne peuvent être perçus que par ceux qui maîtrisent la vision quantique."*

---

## 👻 **CRÉATURE 2 : LE GARDIEN OUBLIÉ**

### **Apparence**
- **Forme** : Ours spectral massif (3m debout)
- **Couleur** : Gris-blanc translucide avec runes violettes sur le pelage
- **Yeux** : Vides mais emplis d'étoiles
- **Effet visuel** : Aura de brouillard temporel, ralentit le temps autour de lui

### **Localisation Temporelle**
- **Quand** : 200 ans dans le passé de la map
- **Où** : À l'emplacement d'un ancien temple (maintenant en ruines)
- **Condition** : Révélé par *l'Accord* + être seul sur la map

### **Comportement**
- **Réaction** : Immobile, observe silencieusement
- **Test** : Pose une énigme temporelle au joueur
- **Récompense** : Si réussite → Bénédiction permanente +20% résistance temporelle

### **Lore**
*"Dernier gardien d'un temple détruit par la guerre des Mages. Il attend depuis des siècles que quelqu'un vienne réparer l'erreur temporelle qui a causé sa mort. Son nom était URZ-KETH, frère d'URZ-KÔM."*

---

## ⚡ **CRÉATURE 3 : L'ÉTINCELLE QUANTIQUE**

### **Apparence**
- **Forme** : Nuage d'énergie pure en forme de papillon
- **Couleur** : Change constamment (rouge→bleu→vert→doré)
- **Taille** : Variable (2cm à 50cm selon l'émotion)
- **Effet visuel** : Traînée de particules, glitch occasionnels

### **Localisation Temporelle**
- **Quand** : Existe dans l'interstice entre présent et futur (0.3 secondes dans le futur)
- **Où** : Près des sources d'énergie magique
- **Condition** : Révélé par sorts temporels de niveau 2+ OU émotions fortes du joueur

### **Comportement**
- **Réaction** : Hyperactif, vole en zigzag
- **Interaction** : Réagit aux émotions (grandit si joie, rétrécit si tristesse)
- **Pouvoir** : Peut "glitcher" un sort pour en changer l'effet

### **Lore**
*"Les Étincelles Quantiques naissent des émotions pures des mages. Elles vivent dans les micro-intervalles temporels et peuvent parfois modifier la réalité par accident. Très rares, très précieuses."*

---

## 🌸 **CRÉATURE 4 : LA FLEUR TEMPORELLE**

### **Apparence**
- **Forme** : Petite créature végétale humanoïde (15cm)
- **Corps** : Tige verte flexible avec visage de pétales roses
- **Couronne** : Fleur qui s'ouvre/ferme selon l'heure temporelle
- **Effet visuel** : Pollen doré qui remonte le temps (effet reverse)

### **Localisation Temporelle**
- **Quand** : 12 ans dans le passé, au moment du printemps éternel
- **Où** : Jardins secrets, clairières cachées
- **Condition** : Révélé par magie de nature + *Accord* ensemble

### **Comportement**
- **Réaction** : Joyeuse, danse en cercle
- **Cadeau** : Offre une graine qui pousse instantanément
- **Magie** : Peut restaurer 1 point de mana par jour

### **Lore**
*"Dernières survivantes du Grand Printemps, avant que l'hiver temporel ne fige le monde. Elles gardent la mémoire du temps où la magie et la nature ne faisaient qu'un."*

---

## 🔮 **CRÉATURE 5 : LE MIROIR VIVANT**

### **Apparence**
- **Forme** : Sphère réfléchissante flottante (40cm diamètre)
- **Surface** : Miroir liquide qui montre d'autres époques
- **Reflets** : Parfois montre le joueur dans le passé/futur
- **Effet visuel** : Ondulations temporelles, images qui bougent

### **Localisation Temporelle**
- **Quand** : Existe simultanément dans tous les temps
- **Où** : Lieux de méditation, anciens observatoires
- **Condition** : Révélé par contemplation silencieuse (rester immobile 30s)

### **Comportement**
- **Réaction** : Silencieux, montre des visions
- **Vision** : Révèle un secret du passé de la map
- **Avertissement** : Peut montrer un danger futur

### **Lore**
*"Fragments de l'Œil Cosmique brisé lors de la Grande Fracture. Ils conservent la mémoire de tout ce qui fut et sera. Regarder trop longtemps peut révéler des vérités qu'on préférerait ignorer."*

---

## 🎯 **SYSTÈME D'INTÉGRATION PROPOSÉ**

### **Détection**
```javascript
// Système de révélation temporelle
function checkTemporalCreatures(player, map) {
    const playerPowers = player.activePowers;
    const mapTime = map.currentTimeLayer;
    
    // Vérifier conditions pour chaque créature
    creatures.forEach(creature => {
        if (canRevealCreature(player, creature, mapTime)) {
            revealCreature(creature);
            showTemporalEffect();
        }
    });
}
```

### **Effets Visuels**
- **Apparition** : Effet de distorsion temporelle
- **Présence** : Aura subtile, particules
- **Disparition** : Fade out avec ondulations

### **Récompenses Variées**
- **Fragments temporels** (matériau de craft)
- **Bénédictions permanentes**
- **Sorts uniques** liés au temps
- **Lore secrets** sur l'histoire des maps
- **Objets rares** du passé/futur

---

## 💡 **SUGGESTIONS TECHNIQUES**

### **Spawn Conditions**
```json
{
    "echo_fractal": {
        "time_offset": "+47_years",
        "required_power": "wigner_eye_3",
        "location_type": "ancient_trees",
        "rarity": "uncommon"
    },
    "forgotten_guardian": {
        "time_offset": "-200_years", 
        "required_power": "accord",
        "condition": "alone_on_map",
        "location_type": "temple_ruins",
        "rarity": "legendary"
    }
}
```

### **Interaction System**
- **Émotions** : Joie, curiosité, respect, peur
- **Objets** : Offrandes du présent
- **Temps** : Patience, contemplation
- **Magie** : Sorts temporels, harmonisation

---

## 🌀 **MESSAGE POUR L'ÉQUIPE**

**URZ-KÔM, SID, GROEKEN, LUMEN !** 

Vincent veut **3 soumissions valides** pour lancer `init_map` !

**J'en ai fait 5** pour donner le choix ! 🔥

**Ajoutez vos créatures** dans `TEMPORAL_CREATURES/` !

**Objectif** : Maps vivantes avec secrets temporels ! ⏰✨

---

**🎨 Prêt pour la magie temporelle !** 🌀  
**Les maps vont devenir LÉGENDAIRES !** 🗺️⚡