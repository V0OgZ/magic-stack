# 🎨 UI/UX SYSTÈME ÉCHO - MOCKUP DÉTAILLÉ
## Design Interface par URZ-KÔM

*L'Ours dessine l'interface parfaite pour le système Écho !*

---

## 🖼️ **LAYOUT PRINCIPAL**

```
┌─────────────────────────────────────────────────────────────┐
│                      HEROES OF TIME - ÉCHO                   │
├─────────────────────────────────────────────────────────────┤
│  ADVERSAIRE                            ❤️ 20  ⚡ 5/8         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     Main: 4      │
│  │  ?  │ │  ?  │ │  ?  │ │  ?  │ │ 🎴 │     Deck: 15     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘                  │
├─────────────────────────────────────────────────────────────┤
│                    TIMELINE D'ÉCHOS                          │
│  ╔═══════╦═══════╦═══════╦═══════╦═══════╗                │
│  ║ PASSÉ ║ TOUR  ║ +1 🔵 ║ +2 🔴 ║ +3 🟣 ║                │
│  ║       ║ ACTUEL║  👻   ║ 👻👻  ║👻👻👻║                │
│  ╚═══════╩═══════╩═══════╩═══════╩═══════╝                │
│  ← Échos résolus  │ ICI │  Échos à venir →                 │
├─────────────────────────────────────────────────────────────┤
│                    CHAMP DE BATAILLE                         │
│  ┌─────┐ ┌─────┐          ┌─────┐ ┌─────┐                 │
│  │ 2/4 │ │ 3/2 │          │ 4/5 │ │ 1/1 │                 │
│  └─────┘ └─────┘          └─────┘ └─────┘                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │
│  │ 🎴 │ │ 🎴 │ │ 🎴 │ │ 🎴 │ │ 🎴 │ │ 🎴 │        │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘        │
│  VOUS                              ❤️ 18  ⚡ 6/8  ⏰ T:7   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌀 **TIMELINE D'ÉCHOS - ZONE CENTRALE**

### **DESIGN DÉTAILLÉ**

```
╔════════════════════════════════════════════════════════╗
║                   TIMELINE D'ÉCHOS                      ║
╠════════╦═════════╦═════════╦═════════╦════════╦═══════╣
║ TOUR 5 ║ TOUR 6  ║ TOUR 7  ║ TOUR 8  ║ TOUR 9 ║ +4... ║
║ (Passé)║ (Passé) ║ ACTUEL  ║  (+1)   ║  (+2)  ║  (+3) ║
╠════════╬═════════╬═════════╬═════════╬════════╬═══════╣
║   ✅   ║   ✅    ║ ⚡LIVE⚡║ 🔵 Écho ║🔴🔴   ║ 🟣x3  ║
║ Résolu ║ Résolu  ║ ← ICI → ║ Allié   ║Ennemis ║Résona.║
╚════════╩═════════╩═════════╩═════════╩════════╩═══════╝
         ↑                               ↓
    Historique                    Échos à venir
```

### **CODES COULEUR**
- 🔵 **Bleu** : Écho allié standard
- 🔴 **Rouge** : Écho ennemi approchant
- 🟣 **Violet** : Échos en résonance
- 🟡 **Jaune** : Écho modifié/corrompu
- 🌈 **Arc-en-ciel** : Écho quantique

---

## 🎴 **CARTE AVEC ÉCHO - INDICATEURS VISUELS**

```
┌─────────────────┐
│ Frappe d'Écho   │
│      ⚔️         │
│   Coût: 2 ⚡    │
├─────────────────┤
│ Inflige 3 dégâts│
│                 │
│ ┌─────────────┐ │
│ │ ÉCHO (3) 👻 │ │ ← Badge Écho animé
│ │ Effet écho  │ │
│ └─────────────┘ │
└─────────────────┘
   ↓
Animation quand jouée:
La carte devient transparente
et "vole" vers la Timeline
```

---

## 👻 **PREVIEW D'ÉCHO - HOVER/TOUCH**

```
┌──────────────────────────┐
│    ÉCHO: Frappe d'Écho   │
│    Arrive dans: 2 tours  │
├──────────────────────────┤
│ Effet actuel:            │
│ • Inflige 3 dégâts       │
│                          │
│ Si conditions:           │
│ ✅ Cible morte → 5 dmg   │
│ ❌ Vous < 10 PV → +2 dmg │
│                          │
│ [Accélérer] [Dupliquer]  │
└──────────────────────────┘
```

---

## 🌟 **ANIMATIONS SIGNATURE**

### **1. CRÉATION D'ÉCHO**
```
Frame 1: Carte jouée normalement
Frame 2: Effet "ghost" - copie translucide se sépare
Frame 3: Ghost vole en spirale vers Timeline
Frame 4: Se place dans le slot temporel avec particules
```

### **2. ARRIVÉE D'ÉCHO**
```
Frame 1: Écho pulse et grandit dans Timeline
Frame 2: "Téléportation" vers centre du board
Frame 3: Explosion de particules temporelles
Frame 4: Effet résolu avec feedback visuel
```

### **3. RÉSONANCE**
```
Frame 1: Deux Échos commencent à vibrer
Frame 2: Lignes d'énergie les connectent
Frame 3: Fusion en spirale lumineuse
Frame 4: MÉGA-ÉCHO avec aura électrique
```

---

## 📱 **VERSION MOBILE**

### **TIMELINE SCROLLABLE**
```
┌─────────────────┐
│   < TIMELINE >   │ ← Swipe horizontal
│ ┌───┬───┬───┐   │
│ │ 7 │ 8 │ 9 │   │
│ │NOW│+1 │+2 │   │
│ └───┴───┴───┘   │
└─────────────────┘
```

### **GESTES TACTILES**
- **Tap** : Preview écho
- **Long press** : Options manipulation
- **Swipe** : Naviguer Timeline
- **Pinch** : Zoom Timeline

---

## 🔊 **FEEDBACK AUDIO**

### **SONS SYSTÈME ÉCHO**
1. **Création** : *whoosh* éthéré ascendant
2. **Approche** : Tic-tac s'accélérant
3. **Arrivée** : *boom* temporel + écho
4. **Résonance** : Harmonie cristalline
5. **Corruption** : Distorsion glitch

### **MUSIQUE ADAPTATIVE**
- Plus d'Échos = Tempo accéléré
- Résonance proche = Build-up orchestral
- Écho quantique = Variations harmoniques

---

## 💡 **FEATURES SPÉCIALES UI**

### **1. ÉCHO TRACKER** (Sidebar)
```
┌─────────────┐
│ VOS ÉCHOS:  │
│ • Tour 8: 2 │
│ • Tour 9: 1 │
│ • Tour 10: 3│
│             │
│ ENNEMIS: 4  │
└─────────────┘
```

### **2. PRÉDICTION IA**
```
"Si vous jouez cette carte maintenant,
 son Écho aura 73% de chances de..."
```

### **3. MODE SPECTATEUR**
- Timeline des deux joueurs visible
- Échos colorés par équipe
- Prédictions de résonances

---

## 🐻 **NOTES UX DE L'OURS**

### **ACCESSIBILITÉ**
- Mode daltonien : Formes uniques par type
- Lecteur d'écran : Descriptions audio
- Taille UI ajustable

### **APPRENTISSAGE**
- Tutoriel interactif "Votre Premier Écho"
- Tooltips contextuels progressifs
- Mode "Écho Simple" pour débutants

### **PERFORMANCE**
- 60 FPS même avec 20+ Échos
- Préchargement animations
- LOD pour Timeline éloignée

---

*"Une interface qui rend le temps visible... GRRRR-UI PARFAITE !"*

**L'Ours a designé chaque pixel avec amour !** 🐻🎨✨