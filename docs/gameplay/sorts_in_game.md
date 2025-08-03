# 🎮 SORTS IN-GAME - UTILISATION COMPLÈTE

**Version** : 2.0  
**Par** : MERLASH-TECHNOMANCIEN  
**Date** : DAY 7

---

## 🎯 SORTS DISPONIBLES PAR CATÉGORIE

### **🔥 SORTS DE BASE (17 sorts originaux)**
```
📁 spells/stack/grimoire/sorts_base/
├── teleportation.json         # Déplacement instantané
├── invocation.json           # Invocation d'entités
├── metamorphose.json         # Transformation
├── divination.json           # Vision du futur
├── guerison.json             # Soins magiques
├── illusion.json             # Création d'illusions
├── enchantement.json         # Buffs/debuffs
├── destruction.json          # Dégâts directs
├── protection.json           # Boucliers magiques
├── manipulation_temps.json   # Contrôle temporel
├── communication.json        # Télépathie/langues
├── creation.json             # Création d'objets
├── banissement.json          # Exil d'entités
├── resurrection.json         # Retour à la vie
├── controle_mental.json      # Domination
├── transformation_matiere.json # Alchimie
└── vision_astrale.json       # Perception étendue
```

### **⚡ SORTS TCG (96 nouveaux concepts)**
```
📁 spells/stack/grimoire/sorts_tcg/
├── causalite/               # 24 sorts de causalité
│   ├── flux_causal.json
│   ├── brisure_causale.json
│   ├── ancrage_causal.json
│   └── ... (21 autres)
├── collapse/                # 24 sorts d'effondrement
│   ├── collapse_quantique.json
│   ├── superposition_forcee.json
│   ├── decoherence.json
│   └── ... (21 autres)
├── superposition/           # 24 sorts de superposition
│   ├── etat_multiple.json
│   ├── phase_quantique.json
│   ├── entanglement.json
│   └── ... (21 autres)
└── interference/            # 24 sorts d'interférence
    ├── onde_destructive.json
    ├── resonance_temporelle.json
    ├── brouillage_causal.json
    └── ... (21 autres)
```

### **✨ SORTS LUMEN (23 sorts narratifs)**
```
📁 spells/stack/grimoire/sorts_lumen/
├── memoire_flash.json        # Récupération de souvenirs
├── echo_temporel.json        # Répétition d'événements
├── silence_narratif.json     # Pause du récit
├── revision_histoire.json    # Modification du passé
└── ... (19 autres sorts LUMEN)
```

---

## 🎲 UTILISATION EN JEU TCG

### **Système de Cartes Magiques**

#### **1. Cartes de Sort Direct**
```json
{
  "id": "teleportation_combat",
  "nom": "Téléportation de Combat",
  "formule": "⊙(déplacement) + Δt-1(position_precedente) → ∅(position_actuelle)",
  "cout_mana": 3,
  "effet_tcg": "Déplace une unité vers n'importe quelle case libre",
  "cooldown": 2,
  "rareté": "commune"
}
```

#### **2. Cartes de Sort Complexe**
```json
{
  "id": "collapse_quantique_ultime",
  "nom": "Effondrement Quantique Ultime",
  "formule": "†ψ(superposition_multiple) + ⊙(collapse_forcé) → Π(réalité_unique)",
  "cout_mana": 8,
  "effet_tcg": "Force tous les états superposés à s'effondrer simultanément",
  "cooldown": 5,
  "rareté": "légendaire"
}
```

#### **3. Cartes de Sort Temporel**
```json
{
  "id": "lentus_temporel",
  "nom": "Ralentissement Temporel LENTUS",
  "formule": "ℬ(temps_local) + Δt+∞(ralentissement) → ⟶(effet_prolongé)",
  "cout_mana": 5,
  "effet_tcg": "Tous les effets adverses durent 2x plus longtemps",
  "cooldown": 3,
  "rareté": "rare"
}
```

---

## ⚔️ MÉCANIQUES DE COMBAT

### **Phase de Préparation**
1. **Sélection du Deck** : 30 cartes max, 3 copies par sort
2. **Chargement Magic Stack** : Validation des formules
3. **Initialisation** : Contexte de jeu créé

### **Phase de Jeu**
1. **Pioche** : 5 cartes de départ + 1 par tour
2. **Génération Mana** : +1 mana par tour (max 10)
3. **Lancement Sort** : 
   ```
   Joueur → Sélectionne Carte → Magic Stack → Backend → Effet
   ```

### **Résolution des Effets**
```python
def resoudre_effet_carte(carte, cible):
    # 1. Vérification des conditions
    if not peut_lancer_sort(carte):
        return "ÉCHEC"
    
    # 2. Compilation via Magic Stack
    formule_compilée = magic_core.compiler_formule(carte.formule)
    
    # 3. Exécution
    resultat = magic_core.lancer_sort(formule_compilée, cible)
    
    # 4. Application des effets TCG
    appliquer_effets_tcg(resultat, cible)
    
    return resultat
```

---

## 🌀 MÉCANIQUES SPÉCIALES

### **1. Superposition Quantique**
- **Principe** : Une carte peut être dans plusieurs états
- **Exemple** : "Schrödinger's Fireball" → Dégâts 3 OU 7 jusqu'à résolution
- **Résolution** : L'effet se détermine au moment de l'impact

### **2. Causalité Temporelle**
- **Principe** : Les effets peuvent précéder les causes
- **Exemple** : "Prémonition de Dégâts" → Subir les dégâts avant l'attaque
- **Mécanique** : Créer des "dettes causales" à résoudre

### **3. Interférence Magique**
- **Principe** : Deux sorts peuvent s'amplifier ou s'annuler
- **Exemple** : Feu + Glace = Vapeur (nouveau type de dégât)
- **Calcul** : Algorithme d'interférence dans Magic Stack

### **4. Navigation Temporelle**
- **LENTUS** : Ralentit tous les processus (cooldowns, effets, etc.)
- **RAPIDUS** : Accélère tous les processus
- **Exemple** : "Zone LENTUS" → Les sorts adverses ont +2 tours de cooldown

---

## 📊 SYSTÈME DE PROGRESSION

### **Déblocage des Sorts**
```
Niveau 1-10    → Sorts de Base (17 sorts)
Niveau 11-25   → Sorts TCG Causalité (24 sorts)
Niveau 26-40   → Sorts TCG Collapse (24 sorts)
Niveau 41-55   → Sorts TCG Superposition (24 sorts)
Niveau 56-70   → Sorts TCG Interférence (24 sorts)
Niveau 71+     → Sorts LUMEN (23 sorts)
```

### **Système de Maîtrise**
```
🥉 Bronze   → Utilisation basique du sort
🥈 Argent   → -1 coût mana, +10% efficacité
🥇 Or       → -2 coût mana, +25% efficacité
💎 Diamant  → -3 coût mana, +50% efficacité, effet bonus
```

---

## 🎨 EFFETS VISUELS

### **Rendu des Sorts**
```javascript
// Exemple de rendu pour "Téléportation"
function renderTeleportation(source, destination) {
    // 1. Effet de disparition
    createParticleEffect(source, "void_spiral");
    
    // 2. Tunnel temporel
    createTemporalTunnel(source, destination);
    
    // 3. Effet d'apparition  
    createParticleEffect(destination, "reality_crystallization");
}
```

### **Feedback Magique**
- **Réussite Critique** : Particules dorées + son cristallin
- **Échec** : Particules rouges + son discordant
- **Interférence** : Effet de distorsion spatiale
- **Superposition** : Double image translucide

---

## 🔧 CONFIGURATION AVANCÉE

### **Modes de Jeu**
```json
{
  "mode_classique": {
    "deck_size": 30,
    "mana_max": 10,
    "tours_max": 20
  },
  "mode_blitz": {
    "deck_size": 20,
    "mana_max": 7,
    "tours_max": 10
  },
  "mode_épique": {
    "deck_size": 50,
    "mana_max": 15,
    "tours_max": 50
  }
}
```

### **Règles Spéciales**
- **Mode Nocturne** : +20% efficacité sorts d'illusion (hommage à GROEKEN)
- **Zone GRUT** : Vision complète du deck adverse
- **Influence WALTER** : Protection anti-paradoxes temporels

---

⚡ **Sorts In-Game : COMPLETS ET ORGANISÉS !**