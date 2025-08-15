# 🗺️ SYSTÈME DE CARTE REALGAME

**Par GROEKEN** - Basé sur les instructions de Vincent

---

## 📋 VUE D'ENSEMBLE

Le système de carte implémente les 3 modes demandés par Vincent :

### 1️⃣ **Mode Méta / Surcarte**
- Choix du nom, timeline, et carte
- Vue 2D iso légère
- Éléments phasés = timelines non activées
- Brouillard = causalité non résolue

### 2️⃣ **Mode Carte ISO 2D** (Implémenté)
- Exploration en isométrique
- Plateformes flottantes
- Portails entre zones
- Système de phasage/transparence

### 3️⃣ **Mode Combat** (Via UnifiedCombatSystem)
- Déclenché dans zones spécifiques
- Logique quantique activée

---

## 🔧 ARCHITECTURE

```
maps/
├── MapLayerController.js      # Contrôleur principal
├── iso-demo-groeken.html      # Démo jouable
└── README_MAP_SYSTEM.md       # Cette doc
```

---

## 🌫️ BROUILLARD DE CAUSALITÉ (7 NIVEAUX)

Basé sur la documentation trouvée dans `FOG_OF_CAUSALITY_7_LEVELS_DOCUMENTATION.md` :

| Niveau | Nom | Description | Interaction | Couleur |
|--------|-----|-------------|-------------|---------|
| **0** | Inexploré | Jamais vu | Aucune | Gris foncé |
| **1** | Passé effondré | Exploré dans timeline résolue | Vision seule | Gris moyen |
| **2** | Accessible | Accessible mais non observé | Planification | Jaune |
| **3** | Vision | Vision directe unité/château | Complète | Vert |
| **4** | Fantôme | Vu avec objet spectral | Aucune | Blanc transparent |
| **5** | Superposé | Entité en flux quantique | Partielle | Violet |
| **6** | Ancré | Bloque branchement temporel | Force collapse | Bleu |

---

## 🔮 INTÉGRATION MAGIC STACK

### Sorts créés pour le système :

1. **Sort_Activation_Portail**
   - Active les portails entre mondes
   - Coût : 30 mana
   - Formule : `Ψ(portal_id) + Ω(timeline) → ∆(activation)`

2. **Sort_Phase_Shift**
   - Change la phase d'une zone
   - Coût : 40 mana
   - Rayon : 5 cases

3. **Sort_Resolution_Causalite**
   - Fixe une zone dans la réalité
   - Coût : 50 mana
   - ⚠️ IRRÉVERSIBLE

---

## 🎮 UTILISATION

### Dans le code :
```javascript
// Créer le contrôleur
const mapController = new MapLayerController(canvas, magicStack);

// Activer un portail
await mapController.activatePortal('portal_0');

// Changer la phase d'une zone
mapController.phaseShift(x, y, radius, newPhase);

// Résoudre la causalité
mapController.resolveCausality(x, y);
```

### Contrôles joueur :
- **WASD/Flèches** : Déplacer caméra
- **Clic** : Interagir
- **E** : Activer portail
- **ESPACE** : Résoudre causalité
- **1-3** : Changer timeline

---

## 🎨 RÉFÉRENCES VISUELLES

Basé sur les images de Vincent :
- `Map like heroes map.png` - Style Heroes classique
- `Multiverse MAP.png` - Carte avec timelines multiples

---

## 🤝 INTERFACES EXPOSÉES

```javascript
class MapLayerController {
    // Activation via Magic Stack
    activatePortal(portalId)
    
    // Manipulation du phasage
    phaseShift(x, y, radius, newPhase)
    
    // Résolution causale
    resolveCausality(x, y)
    
    // Conversion coordonnées
    cartToIso(cartX, cartY)
    isoToCart(isoX, isoY)
    
    // Rendu
    render()
    
    // Interaction
    handleClick(screenX, screenY)
}
```

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Contrôleur de base
2. ✅ Intégration Magic Stack
3. ✅ Démo HTML
4. ⏳ Connection avec combat
5. ⏳ Mode Méta/Surcarte
6. ⏳ Persistence état

---

## 📝 NOTES POUR L'ÉQUIPE

- **LOUMEN** : Le système est prêt pour tes événements narratifs
- **URZ-KÔM** : Les hooks pour tes effets quantiques sont en place
- **SID** : L'interface pour ton BRISURE Navigator est exposée

---

*"Pas d'impro non canon. On suit la vision de Vince."* ✅

---

**GROEKEN**  
*La carte prend forme selon les instructions*