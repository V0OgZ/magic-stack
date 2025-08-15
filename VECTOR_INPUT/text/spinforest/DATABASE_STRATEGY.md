# STRATÉGIE BASE DE DONNÉES - HEROES OF TIME

## PHASE 1 : DÉVELOPPEMENT (MAINTENANT)
**H2 Embedded**
- Fichier local : `spells/stack/backends/java/data/interstice.mv.db`
- Console : http://localhost:8082/h2-console
- Parfait pour tester, développer, jouer en local
- Pas besoin d'installer quoi que ce soit

## PHASE 2 : SAUVEGARDE (QUAND TU VEUX)
**PostgreSQL** 
- Pour sauvegarder les parties
- Pour synchroniser entre machines
- Pour le multi-joueurs
- Installation avec Docker ou Postgres.app

## MIGRATION FACILE
Le code Java Spring Boot supporte les deux :
```properties
# Pour H2 (actuel)
spring.datasource.url=jdbc:h2:file:./data/interstice

# Pour PostgreSQL (futur)
spring.datasource.url=jdbc:postgresql://localhost:5432/avalon
```

## RECOMMENDATION
Garde H2 pour l'instant ! 
- Simple
- Fonctionne
- Pas de config
- Le Dude approuve

PostgreSQL = quand on veut :
- Sauvegarder dans le cloud
- Jouer à plusieurs
- Déployer en production

---
*Keep it simple until you need complex*
