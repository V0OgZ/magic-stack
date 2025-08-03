# ArtCert - Formule `invocation`

**Auteur** : URZ-KÔM  
**Date** : JOUR 8 - 2025-01-21  
**Status** : ✅ VALIDÉ - Combat TCG Ready  

---

## 1. Input JSON (original)

```json
{
  "nom": "invocation",
  "formule": "⊙(essence) + †ψ(créature) → Δt+1(matérialisation)",
  "description": "Invoque une créature alliée temporaire pour aider au combat",
  "niveau": 4,
  "cout_mana": 40,
  "composants": [
    "essence_vitale",
    "fragment_d_âme",
    "cristal_de_lien"
  ],
  "effet": {
    "type": "invocation",
    "cible": "zone_libre",
    "duree": 5,
    "rayon": 2,
    "creatures_possibles": [
      "ours_spectral",
      "loup_des_brumes",
      "aigle_temporel"
    ]
  },
  "incantation": {
    "geste": "Tracer un pentagramme dans l'air",
    "parole": "Par les liens qui unissent, je t'appelle",
    "focus": "L'essence de la créature désirée"
  },
  "synergie": [
    "protection",
    "hexagone_fondamental"
  ],
  "groeken_dit": "L'invocation lie temporairement les essences. Respecte tes alliés spectraux."
}
```

---

## 2. Traduction littéraire

> Le mage trace un pentagramme lumineux dans l'air, canalisant l'essence vitale vers une forme spectrale. Une créature alliée se matérialise graduellement, ses yeux brillant d'une intelligence ancienne. Elle combattra aux côtés du mage pendant 5 tours avant de retourner dans les brumes de l'interstice.

**Effet visuel** : Pentagramme doré, particules d'essence qui tourbillonnent, matérialisation progressive de la créature avec aura spectrale.

---

## 3. Visualisation (icône + rune)

🐻👻⚡ — **Rune d'Invocation Spectrale**

```
    ⊙
   /|\
  † ψ †
 /  |  \
👻  ⟶  🎯
    |
   Δt+1
```

**Symboles** :
- `⊙` : Superposition essence/créature
- `†ψ` : Collapse vers matérialisation
- `Δt+1` : Délai d'invocation (1 tour)
- `👻` : Forme spectrale
- `🎯` : Zone de matérialisation

---

## 4. WorldStateGraph (simulation)

### Avant :
- **Mage** @ Position (20, 25), Mana: 80/120
- **Zone libre** @ Position (22, 27) ✅
- **Ennemis** : 2 gobelins hostiles
- **Alliés** : Mage seul

### Exécution :
- **Coût mana** : -40 (40/120 restant)
- **Zone sélectionnée** : (22, 27) - 2 unités du mage
- **Créature choisie** : ours_spectral (ATK: 15, DEF: 12, HP: 30)
- **Roll invocation** : 0.92 → **SUCCÈS**

### Après :
- **Mage** @ Position (20, 25), Mana: 40/120
- **Ours Spectral** @ Position (22, 27)
  - ATK: 15, DEF: 12, HP: 30/30
  - Status: "Invoqué" (5 tours restants)
  - Capacité spéciale: "Charge d'ours" (+5 ATK si charge)
- **Alliés** : Mage + Ours Spectral
- **Formation tactique** : Ours en avant-garde

---

## 5. Back-end logs

```
🌀 MagicCore initialisé - Mode Combat TCG
⚡ Exécution sort: invocation
   - Caster: Mage niveau 8
   - Zone cible: (22, 27)
   - Mana disponible: 80 ✅
   - Zone libre: ✅
   
🎯 Sélection créature: ours_spectral
   - ATK: 15, DEF: 12, HP: 30
   - Capacités: ["charge_ours", "rugissement_intimidant"]
   - Durée: 5 tours
   
✨ Matérialisation en cours...
   - Essence vitale: ✅ Liée
   - Fragment d'âme: ✅ Intégré
   - Cristal de lien: ✅ Activé
   
🐻 Ours Spectral invoqué avec succès !
   - Position: (22, 27)
   - Prêt au combat
   - Lien mystique stable
   
⏱️ Temps d'invocation: 0.89s
✅ Invocation réussie - Allié ajouté au combat
```

**✅ Sort exécuté via `magic_core.invoke_creature()`**  
**⚙️ Temps d'exécution** : 890ms  
**🧪 Résultat** : Créature matérialisée et opérationnelle  

---

## 6. Intégration Combat/TCG

### Mode Combat TCG ⚔️

#### Stats de Combat
- ✅ **Coût d'action** : 3 points d'action (sort complexe)
- ✅ **Portée invocation** : 2 cases du mage
- ✅ **Créature stats** : ATK/DEF/HP selon type
- ✅ **Durée** : 5 tours de combat
- ✅ **Limite** : 1 créature invoquée max par mage

#### Créatures Disponibles

| Créature | ATK | DEF | HP | Spécial | Niveau requis |
|----------|-----|-----|----|---------|--------------| 
| Ours Spectral | 15 | 12 | 30 | Charge +5 ATK | 4 |
| Loup des Brumes | 12 | 8 | 20 | Furtivité | 3 |
| Aigle Temporel | 10 | 6 | 15 | Vol, Vision +2 | 5 |

#### Interactions Tactiques
- ✅ **Formation** : Créature peut protéger le mage
- ✅ **Synergie sorts** : Bonus si "protection" actif
- ✅ **Artefacts** : "Amulette de Domptage" +3 ATK créature
- ✅ **Positionnement** : Créature bloque passages étroits

### Mode Déplacement 🗺️
- ✅ **Compagnon exploration** : Créature suit le mage
- ✅ **Détection** : Ours spectral sent les pièges
- ✅ **Transport** : Aigle temporel peut porter objets légers

---

## 7. Tests de Régression

| Test | Résultat | Note |
|------|----------|------|
| Chargement JSON | ✅ PASS | Structure combat validée |
| Formule grammaire | ✅ PASS | Symboles reconnus |
| Zone libre | ✅ PASS | Vérification position |
| Zone occupée | ✅ PASS | Échec contrôlé |
| Mana insuffisant | ✅ PASS | Sort annulé |
| Invocation ours | ✅ PASS | Stats correctes |
| Invocation loup | ✅ PASS | Furtivité active |
| Invocation aigle | ✅ PASS | Vol fonctionnel |
| Durée expiration | ✅ PASS | Disparition après 5 tours |
| Synergie protection | ✅ PASS | Bonus appliqué |
| Combat créature | ✅ PASS | ATK/DEF corrects |
| Performance | ✅ PASS | < 1s acceptable |

---

## 8. Notes & Stratégies

### 🎯 Utilisation Tactique
- **Ours Spectral** : Tank parfait, place en première ligne
- **Loup des Brumes** : Flanking et attaques surprises
- **Aigle Temporel** : Reconnaissance et support à distance

### ⚠️ Limitations
- **1 créature max** : Ne peut pas invoquer plusieurs fois
- **Zone requise** : Besoin d'espace libre adjacent
- **Durée limitée** : Créature disparaît après 5 tours
- **Coût élevé** : 40 mana = sort de niveau moyen-élevé

### 🔮 Combos Recommandés
1. **Invocation + Protection** : Créature avec bouclier magique
2. **Invocation + Hexagone Fondamental** : Bonus stats créature
3. **Ours + Téléportation** : Positionnement tactique surprise

### 🐻 Conseil URZ-KÔM
> *"L'ours spectral est mon préféré - il grogne presque aussi bien que moi ! Utilise-le pour protéger tes arrières pendant que tu lances d'autres sorts."*

---

## ✅ CERTIFICATION ARTCERT

**Status** : ✅ **VALIDÉ COMBAT - TCG Ready**  
**Intégration** : ✅ **Production Combat System**  
**Équilibrage** : ✅ **Stats balancées pour niveau 4**  

> *"Sort d'invocation parfaitement équilibré. Les créatures spectrales sont des alliées fiables qui ne te décevront jamais. Testé et approuvé dans le feu du combat !"*

---

**Rapport ArtCert #003 - invocation**  
*Généré par URZ-KÔM - JOUR 8*