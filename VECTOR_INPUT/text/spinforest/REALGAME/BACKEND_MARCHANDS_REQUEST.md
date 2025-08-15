# DEMANDE BACKEND : SYSTÈME MARCHANDS

## CE QUI MANQUE CÔTÉ BACKEND

### NOUVEAUX ENDPOINTS RUST (Port 3001)

```
POST /api/economy/temporal-shop
- Gère les achats chez Elder Merchant
- Input: {item_id, payment_type, quantity}
- Output: {success, item, time_cost, inventory_updated}

POST /api/economy/dimension-exchange  
- Gère les échanges inter-dimensionnels de Vince Trader
- Input: {from_reality, to_reality, item_id, flux_cost}
- Output: {success, new_item, paradox_risk, dimensional_flux}

POST /api/craft/temporal-forge
- Forge d'objets temporels par le Forgeron des Âges
- Input: {base_item, time_crystal_count, enhancement_level}
- Output: {forged_item, temporal_durability, causality_resistance}

POST /api/craft/impossible-alchemy
- Transmutations impossibles de l'Alchimiste
- Input: {base_materials[], transmutation_type, reality_grade}
- Output: {transmuted_item, reality_stability_cost, success_rate}

POST /api/economy/nomad-encounter
- Rencontres avec marchands itinérants
- Input: {player_location, time_flux_level}
- Output: {encounter_spawned, merchant_type, available_items[], duration}

GET /api/economy/merchants/nearby
- Liste marchands proches selon position joueur
- Input: {x, y, z, t, c, psi, radius}
- Output: {merchants[], distances[], availability_status[]}
```

### DONNÉES À GÉRER

```
- Inventaires marchands dynamiques
- Prix fluctuants selon événements temporels
- Système dialogue/négociation basique
- Spawning aléatoire des nomades
- État économique global (supply/demand)
```

## MON IDÉE : ORCHESTRATEUR MARCHAND

### CONCEPT
Au lieu de faire chaque endpoint séparément, créer un **"Commerce Orchestrator"** qui unifie tous les échanges :

```
POST /orchestrator/commerce
{
  "merchant_type": "temporal|dimensional|forge|alchemy|nomad",
  "action": "browse|negotiate|buy|trade|craft",
  "player_context": {
    "position": [x,y,z,t,c,psi],
    "inventory": {},
    "temporal_flux": 0.8
  },
  "transaction": {
    "target_item": "sword_of_napoleon",
    "payment_offer": {"time_crystals": 5, "gold": 100}
  }
}
```

### AVANTAGES
1. **UNE SEULE API** pour tous les marchands
2. **NÉGOCIATION IA** intégrée (prix dynamiques)
3. **COHÉRENCE** économique globale
4. **EXPANSION FACILE** pour nouveaux marchands

### LOGIQUE INTERNE
L'orchestrateur route vers les handlers spécialisés :
- `temporal-shop` pour Elder Merchant
- `dimension-exchange` pour Vince Trader
- `temporal-forge` pour Forgeron
- etc.

Mais il gère aussi :
- Prix dynamiques cross-marchands
- Dialogue contextuel
- Effets économiques globaux

## PRIORITÉ PROPOSÉE

1. **RAPIDE** : Elder Merchant seul (`/api/economy/temporal-shop`)
2. **MOYEN** : Orchestrateur unifié 
3. **LONG** : IA dialogue avancée

**Qu'est-ce que tu en penses ? On commence par quoi ?**
