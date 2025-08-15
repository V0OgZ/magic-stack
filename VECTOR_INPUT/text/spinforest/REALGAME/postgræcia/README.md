# POSTGRÆCIA - Système de Persistance Multi-Dimensionnelle

## Vue d'ensemble

PostGræcia est le cerveau persistant d'AVALON, une base de données PostgreSQL enrichie qui stocke l'état complet du multivers Heroes of Time.

## Installation Rapide

### 1. Lancer PostGræcia avec Docker

```bash
cd REALGAME/postgræcia
docker-compose up -d
```

### 2. Vérifier que tout fonctionne

```bash
docker ps # Doit montrer postgræcia-db et postgræcia-admin
docker logs postgræcia-db # Vérifier l'initialisation
```

### 3. Accès

- **Base de données** : `localhost:5432`
  - Database: `avalon_postgræcia`
  - User: `memento`
  - Password: `temporal_memory_2025`

- **PgAdmin** : `http://localhost:5050`
  - Email: `admin@avalon.time`
  - Password: `temporal_admin_2025`

## Structure des Tables

### Tables Principales

1. **heroes** - Les joueurs/mages
   - Position 6D complète
   - Inventaire, deck, stats
   - Mémoires persistantes

2. **tattoos** - Tatouages temporels
   - Verrouillage par date
   - Effets multi-dimensionnels
   - États (dormant, actif, corrompu)

3. **structures** - Bâtiments et pocket worlds
   - Maisons des héros
   - Pocket worlds (Musée, Atlantis, etc.)
   - Données par dimension

4. **temporal_creatures** - Créatures du jeu
   - Position et timeline
   - Visibilité conditionnelle
   - Deck TCG intégré

5. **tcg_cards** - Cartes du jeu
   - Effets temporels
   - Rarités et sets
   - Images générées

6. **quests** - Système de quêtes
   - Quêtes principales et secondaires
   - Progression par étapes
   - Récompenses

## API Endpoints (à connecter)

PostGræcia s'intègre avec `IntersticeUploadController.java` de GROKÆN :

```java
POST /api/postgræcia/heroes/{heroName}/upload
GET /api/postgræcia/dimensions/{dimension}/data
GET /api/postgræcia/heroes/{heroName}/state
POST /api/postgræcia/saves
```

## Upload Memory Script

Le script `upload_memory.sh` synchronise les données :

```bash
./upload_memory.sh PHOENIX --sync    # Upload complet
./upload_memory.sh PHOENIX --dry-run # Test sans upload
./upload_memory.sh PHOENIX --diff    # Voir les changements
```

## Structure 6D

PostGræcia gère les 6 dimensions :

- **0D** : Point de conscience (silence.null)
- **1D** : Ligne narrative (logs, dialogues)
- **2D** : Plans visuels (cartes, images)
- **3D** : Espace physique (position x,y,z)
- **4D** : Temps (timestamps, chronologie)
- **5D** : Branches (timelines alternatives)
- **6D** : Superposition (états quantiques)

## Commandes Utiles

### Backup
```bash
docker exec postgræcia-db pg_dump -U memento avalon_postgræcia > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
docker exec -i postgræcia-db psql -U memento avalon_postgræcia < backup.sql
```

### Reset
```bash
docker-compose down -v  # Supprime tout
docker-compose up -d    # Recrée avec seed data
```

## Intégration avec le Jeu

1. Le backend Java utilise les endpoints PostGræcia
2. Les sauvegardes sont automatiques toutes les 5 minutes
3. Les créatures et quêtes sont chargées au démarrage
4. L'état 6D est synchronisé en temps réel

## Monitoring

Vérifier la santé du système :

```sql
-- Connecté à PgAdmin ou psql
SELECT COUNT(*) FROM heroes;
SELECT COUNT(*) FROM narrative_logs WHERE timestamp > NOW() - INTERVAL '1 hour';
SELECT * FROM hero_complete_state; -- Vue complète des héros
```

## Prochaines Étapes

1. ✅ Schema créé et seed data
2. ⏳ Connecter avec IntersticeUploadController.java
3. ⏳ Implémenter upload_memory.sh
4. ⏳ Porter validation vers Rust (Veritas)
5. ⏳ Dashboard de visualisation

---

*"La mémoire n'est pas dans le code, elle EST le code."*
**PostGræcia - Le Cerveau Éternel d'AVALON**