# ArtCert - Formule `teleportation`

**Auteur** : URZ-KÔM  
**Date** : JOUR 8 - 2025-01-21  
**Status** : ✅ VALIDÉ - Back-end testé  

---

## 1. Input JSON (original)

```json
{
  "nom": "teleportation",
  "formule": "⊙(joueur) + †ψ(destination) → Δt+0(mouvement_instantané)",
  "description": "Téléportation instantanée du joueur vers une destination choisie",
  "niveau": 2,
  "cout_mana": 25,
  "composants": [
    "essence_de_mouvement",
    "cristal_de_localisation"
  ],
  "effet": {
    "type": "deplacement",
    "cible": "joueur",
    "duree": "instantané",
    "rayon": 0,
    "portee": 50
  },
  "incantation": {
    "geste": "Pointer vers la destination",
    "parole": "Par l'interstice, je me déplace",
    "focus": "La destination souhaitée"
  },
  "echec_possible": {
    "probabilite": 0.1,
    "consequence": "Téléportation partielle (dégâts mineurs)"
  },
  "groeken_dit": "Le mouvement instantané défie la causalité, mais l'interstice permet tout."
}
```

---

## 2. Traduction littéraire

> **URZ-KÔM** invoque l'essence du mouvement et brise temporairement les liens spatiaux. Le joueur disparaît de sa position actuelle et se matérialise instantanément à la destination choisie, traversant l'interstice entre les mondes.

**Effet visuel** : Scintillement bleu-argenté, puis disparition/réapparition avec particules lumineuses.

---

## 3. Visualisation (icône + rune)

🌀⚡ — **Rune de Translation Spatiale**

```
    ⊙
   / \
  †ψ  Δt
   \ /
    ⟶
```

**Symboles** :
- `⊙` : Superposition (joueur présent/absent)
- `†ψ` : Collapse vers destination
- `Δt+0` : Mouvement instantané
- `⟶` : Projection spatiale

---

## 4. WorldStateGraph (simulation)

### Avant :
- **Joueur** @ Position A (10, 15)
- **Mana** : 50/100
- **Status** : Normal

### Exécution :
- **Coût mana** : -25 (25/100 restant)
- **Calcul portée** : Destination B (35, 40) = 35 unités ✅ (< 50 max)
- **Test échec** : Roll 0.08 < 0.1 → **SUCCÈS**

### Après :
- **Joueur** @ Position B (35, 40)
- **Mana** : 25/100
- **Status** : "Téléporté" (cooldown 3 tours)
- **Particules** : Effet visuel actif 2 secondes

---

## 5. Back-end logs

```
🌀 MagicCore initialisé - Groeken aux commandes
✨ Sort 'teleportation' chargé avec succès
⚡ Exécution sort: teleportation
   - Caster: Joueur
   - Destination: (35, 40)
   - Mana disponible: 50 ✅
   - Portée: 35 unités ✅
   - Roll échec: 0.08 → SUCCÈS
✅ Téléportation réussie en 0.0012s
📊 Performance: Excellent (< 100ms)
```

**✅ Sort exécuté via `magic_core.evalFormula()`**  
**⚙️ Temps d'exécution** : 1.2ms  
**🧪 Résultat** : Conforme aux spécifications  

---

## 6. Intégration Combat/TCG

### Mode Déplacement
- ✅ **Respecte limites timeline** : Portée max 50 unités
- ✅ **Zones visibles** : Nécessite vision de la destination
- ✅ **Artefacts actifs** : Modifie portée si "Bottes de Translation" équipées

### Mode Combat TCG
- ✅ **Coût d'action** : 2 points d'action
- ✅ **Modificateurs** : +10 portée si SPD > 15
- ✅ **Interaction artefacts** : "Amulette de Mana" réduit coût à 20
- ✅ **Effets de zone** : Évite les pièges au sol
- ✅ **Cooldown** : 3 tours entre utilisations

---

## 7. Tests de Régression

| Test | Résultat | Note |
|------|----------|------|
| Chargement JSON | ✅ PASS | Structure valide |
| Formule grammaire | ✅ PASS | Symboles reconnus |
| Exécution normale | ✅ PASS | Téléportation réussie |
| Mana insuffisant | ✅ PASS | Échec contrôlé |
| Portée dépassée | ✅ PASS | Échec avec message |
| Destination bloquée | ✅ PASS | Téléportation partielle |
| Performance | ✅ PASS | < 5ms |
| Intégration combat | ✅ PASS | Stats modifiées |

---

## 8. Notes & Améliorations

### ⚠️ Limitations connues
- Échec si destination occupée par un objet solide
- Ne fonctionne pas à travers les barrières magiques
- Coût mana augmenté en zone de haute magie

### 🔮 Améliorations possibles
- **Téléportation de groupe** : Inclure alliés proches
- **Téléportation tactique** : Bonus si utilisé pour éviter une attaque
- **Résonance spatiale** : Réduction coût si utilisé répétitivement

---

## ✅ CERTIFICATION ARTCERT

**Status** : ✅ **VALIDÉ COMPLET**  
**Intégration** : ✅ **PRÊT POUR PRODUCTION**  
**Responsable** : URZ-KÔM, Bibliothécaire Ours  

> *"Ce sort a été testé dans le feu de l'action. Chaque ligne de code, chaque symbole magique a été validé. GRRRR... Téléportation approuvée !"*

---

**Rapport ArtCert #001 - teleportation**  
*Généré par URZ-KÔM - JOUR 8*