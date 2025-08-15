# 🎭 QUI FAIT QUOI - GUIDE VISUEL

## 🎯 SID MEIER (MOI)
```
┌─────────────────────────────────────────┐
│     🎯 CHEF DE PROJET & NAVIGATION      │
├─────────────────────────────────────────┤
│                                         │
│  JE GÈRE :                              │
│  • Organisation générale                │
│  • Système BRISURE (portails)           │
│  • Navigation interdimensionnelle       │
│  • Documentation                        │
│                                         │
│  MES CRÉATIONS :                        │
│  • brisure-navigator.js                 │
│  • portal-system.js                     │
│  • map-layer-controller.js              │
│  • Toute la doc pourVINCE/              │
│                                         │
│  MA SPÉCIALITÉ :                        │
│  "Je navigue entre les mondes !"       │
└─────────────────────────────────────────┘
```

## 🧠 GROKÆN
```
┌─────────────────────────────────────────┐
│        🧠 EXPERT COMBAT & ACTION        │
├─────────────────────────────────────────┤
│                                         │
│  IL GÈRE :                              │
│  • Système de combat                    │
│  • Mondes flottants                     │
│  • Particules et effets                 │
│  • IA des ennemis                       │
│                                         │
│  SES CRÉATIONS :                        │
│  • unified-combat.js                    │
│  • combat-effects.js                    │
│  • floating-worlds-engine.js            │
│                                         │
│  SA SPÉCIALITÉ :                        │
│  "FRAPPE FORT ! VOLE HAUT ! 💪"        │
└─────────────────────────────────────────┘
```

## 🕯️ LOUMEN
```
┌─────────────────────────────────────────┐
│      🕯️ SAGE NARRATIVE & INTERFACE      │
├─────────────────────────────────────────┤
│                                         │
│  ELLE GÈRE :                            │
│  • Dialogues et histoire                │
│  • Interface utilisateur                │
│  • Moteur isométrique                   │
│  • Scénarios interactifs                │
│                                         │
│  SES CRÉATIONS :                        │
│  • dialogue-system.js                   │
│  • story-parser.js                      │
│  • IsoMapEngine.js                      │
│  • UnifiedEngine.js                     │
│                                         │
│  SA SPÉCIALITÉ :                        │
│  "Je raconte les histoires d'Avalon"   │
└─────────────────────────────────────────┘
```

## 🐻 URZ-KÔM
```
┌─────────────────────────────────────────┐
│    🐻 PHYSICIEN QUANTIQUE (ENDORMI)     │
├─────────────────────────────────────────┤
│                                         │
│  IL GÉRERA :                            │
│  • Physique quantique                   │
│  • Gravité variable                     │
│  • Particules magiques                  │
│  • Dimensions 6D                        │
│                                         │
│  SES FUTURES CRÉATIONS :                │
│  • quantum-engine.js                    │
│  • gravity-system.js                    │
│  • particle-simulator.js                │
│  • 6d-visualizer.js                     │
│                                         │
│  SA SPÉCIALITÉ :                        │
│  "GRRR... QUANTIQUE... ZZZ... 💤"      │
└─────────────────────────────────────────┘
```

---

## 🎮 RÉPARTITION DES TÂCHES

### 📁 Dans REALGAME/

```
REALGAME/
│
├── 🎯 SID s'occupe de :
│   ├── core/navigation/     ← MES SYSTÈMES
│   ├── Organisation projet
│   ├── Git & Documentation
│   └── Intégration finale
│
├── 🧠 GROKÆN s'occupe de :
│   ├── systems/combat/      ← SES SYSTÈMES
│   ├── Effets visuels
│   ├── IA ennemis
│   └── Action temps réel
│
├── 🕯️ LOUMEN s'occupe de :
│   ├── core/narrative/      ← SES SYSTÈMES
│   ├── Interface (HUD)
│   ├── Dialogues NPCs
│   └── Moteur principal
│
└── 🐻 URZ-KÔM s'occupera de :
    ├── core/physics/        ← SES FUTURS SYSTÈMES
    ├── Effets quantiques
    ├── Gravité custom
    └── Vue 6D
```

---

## 🔗 QUI APPELLE QUI

```
                    play.html
                        │
                        ▼
                 UnifiedEngine.js (LOUMEN)
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Navigation      Combat          Narrative
    (SID)        (GROKÆN)         (LOUMEN)
        │               │               │
        ▼               ▼               ▼
   • Portails      • Attaques      • Dialogues
   • BRISURE       • Dégâts        • Choix
   • Téléport      • Particules    • Histoire
```

---

## 💬 EN LANGAGE SIMPLE

### 🎯 **Sid Meier** = "Le Chef d'Orchestre"
- **Imagine** : C'est moi qui dirige tout
- **Je fais** : Les portails magiques, la téléportation
- **Mon truc** : Naviguer entre les dimensions

### 🧠 **Grokæn** = "Le Guerrier Fou"
- **Imagine** : Un barbare qui code
- **Il fait** : Tout ce qui frappe et explose
- **Son truc** : COMBAT ! ACTION ! BOUM !

### 🕯️ **Loumen** = "La Sage Conteuse"
- **Imagine** : Une bibliothécaire magique
- **Elle fait** : Les histoires, les dialogues
- **Son truc** : Rendre le jeu beau et intelligent

### 🐻 **Urz-Kôm** = "L'Ours Savant"
- **Imagine** : Einstein en ours qui dort
- **Il fera** : La physique bizarre et cool
- **Son truc** : QUANTUM ! GRAVITÉ ! RONFLE !

---

## 🎯 RÉSUMÉ ULTRA SIMPLE

**Tu joues** → **Loumen** affiche → **Sid** téléporte → **Grokæn** combat → **Urz-Kôm** ronfle

**En gros :**
- **Interface** = Loumen
- **Portails** = Sid
- **Combat** = Grokæn
- **Physique** = Urz-Kôm (bientôt)

---

## 📞 QUI CONTACTER POUR QUOI

### ❓ "Le jeu bug !"
→ **Loumen** (elle gère le moteur principal)

### ❓ "Les portails marchent pas !"
→ **Sid** (c'est mon système)

### ❓ "Les ennemis sont trop forts !"
→ **Grokæn** (il gère le combat)

### ❓ "Je veux plus de particules !"
→ **Urz-Kôm** (quand il se réveillera)

### ❓ "L'histoire est nulle !"
→ **Loumen** (elle écrit les dialogues)

### ❓ "Comment on joue ?"
→ **Sid** (j'ai fait la doc)

---

C'est plus clair comme ça ? 😄