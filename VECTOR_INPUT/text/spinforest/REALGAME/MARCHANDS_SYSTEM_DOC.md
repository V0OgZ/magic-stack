# SYSTÈME DES MARCHANDS - HEROES OF TIME 6D

## VISION GÉNÉRALE
Le système de marchands utilise la temporalité et les dimensions pour créer des interactions commerciales uniques dans l'univers 6D.

## TYPES DE MARCHANDS

### 1. ELDER MERCHANT (Marchand Temporel)
- **Concept** : Vendeur d'objets volés au temps
- **Localisation** : Gathering spots temporels instables
- **Inventaire** : Artefacts temporels, cristaux de causalité
- **Mécanique** : Prix en "années de vie" ou fragments temporels
- **Backend** : `/api/economy/temporal-marketplace`

### 2. VINCE LE TRADER DE L'INTERSTICE
- **Concept** : Courtier entre dimensions
- **Spécialité** : Échange d'objets entre réalités parallèles
- **Monnaie** : Flux dimensionnels, paradoxes résolus
- **Distinction** : ≠ Vince Vega (personnage différent)

### 3. MARCHANDS DE GUILD
- **Alchimistes** : Potions, composants magiques
- **Forgerons Temporels** : Armes 6D, armures causales
- **Runistes** : Formules magiques, grimoires

### 4. MARCHANDS ITINÉRANTS
- **Caravanes Dimensionnelles** : Apparition aléatoire
- **Nomades Temporels** : Suivent les courants de temps

## MÉCANIQUES D'INTERACTION

### Interface Chat/Dialogue
- Système de négociation avec IA
- Réponses contextuelles selon l'inventaire joueur
- Quêtes marchandes générées dynamiquement

### Système de Prix Multidimensionnel
- **Or classique** : Objets communs
- **Fragments temporels** : Artefacts rares
- **Paradoxes résolus** : Objets légendaires
- **Années de vie** : Items maudits/puissants

### Économie Dynamique
- Prix fluctuent selon les événements temporels
- Demande/offre basée sur les actions joueurs
- Marchés parallèles entre dimensions

## INTÉGRATION TECHNIQUE

### Assets Vector DB
- Inventaires marchands stockés dans `API_DOC_LINK/VECTOR_DB_ASSETS/`
- Dialogues et quêtes marchandes dans `/lore/`
- Items spéciaux dans `/artifacts/`

### APIs Backend
- `GET /api/economy/merchants` : Liste marchands disponibles
- `POST /api/economy/trade` : Exécuter transaction
- `GET /api/economy/market-state` : État économique global

### Frontend Integration
- Modal dialogue avec système chat
- Inventaire visuel avec drag & drop
- Animation transition entre dimensions

## ÉVOLUTION DU SYSTÈME

### Court terme
- Implémentation Elder Merchant complet
- Interface basique trade

### Moyen terme
- Système négociation IA
- Marchands itinérants

### Long terme
- Économie inter-dimensionnelle
- Guildes marchandes joueurs

---

*Cette doc sert de référence pour le développement. Pas de code ici, juste la vision.*
