# 🏗️ ARCHITECTURE PROPRE AVALON + MAGIC STACK

## 🎯 PRINCIPE : SÉPARATION MAGIE / MÉTIER

### ✅ CE QUI ÉTAIT BIEN FAIT
- **Magic Stack** (port 8082) : Toute la magie, 6D, formules
- **Magic Router Python** (port 5000) : Proxy unifié vers Magic Stack
- **Avalon Backend** (port 8080) : Logique métier du JEU (RealGame)

### ❌ CE QUI A ÉTÉ CASSÉ
Au lieu d'appeler la Magic Stack, avalon-backend a DUPLIQUÉ :
- `MagicCastService` - Refait tout en interne au lieu d'appeler Magic Stack
- `IntersticeService` - Dupliqué au lieu d'utiliser l'API Magic Stack
- `GrofiEngine`, `GrutEngine` - Recodés alors qu'ils existent dans Magic Stack

## 🏗️ ARCHITECTURE CORRECTE

```
┌─────────────────┐
│   FRONTEND      │ 
│   (RealGame)    │
└────────┬────────┘
         │ Port 8080
┌────────▼────────┐     ┌──────────────────┐
│ AVALON BACKEND  │────▶│  MAGIC ROUTER    │
│ (Métier Jeu)    │     │  Python (5000)   │
└─────────────────┘     └────────┬─────────┘
                                 │ Routes vers
                        ┌────────▼────────┐
                        │  MAGIC STACK    │
                        │  Java (8082)    │
                        │  Rust (3001)    │
                        └─────────────────┘
```

## 📁 RESPONSABILITÉS

### Avalon Backend (8080) - MÉTIER JEU
```
Services:
├── GameService         # Gestion des parties
├── HeroService         # Héros et progression  
├── CombatService       # Combat TCG
├── MapService          # Carte HoMM3
├── ShamanCardService   # Cartes spéciales
└── MagicProxyService   # Appelle Magic Stack via router

Controllers:
├── GameController      # /api/games, /api/game/*
├── CombatController    # /api/combat/*
├── HeroController      # /api/heroes/*
└── ShamanController    # /api/spells/shaman/*
```

### Magic Stack (8082/3001) - MAGIE
```
Services:
├── MagicEngineService  # Formules et sorts
├── IntersticeService   # Système 6D
├── PanopticonService   # Visualisation
└── FeatureLogService   # Logs temporels

APIs exposées:
├── /api/magic/*        # Sorts et formules
├── /api/interstice/*   # Upload/download 6D
├── /api/panopticon/*   # Logs et états
└── /api/mage/*         # Opérations mages
```

## 🔧 IMPLÉMENTATION

### 1. MagicProxyService dans Avalon
```java
@Service
public class MagicProxyService {
    private static final String MAGIC_ROUTER_URL = "http://localhost:5000";
    
    public MagicCastResponse castSpell(MagicCastRequest request) {
        // Appeler Magic Stack via le router Python
        return restTemplate.postForObject(
            MAGIC_ROUTER_URL + "/api/magic/cast",
            request,
            MagicCastResponse.class
        );
    }
    
    public IntersticeEntity uploadEntity(UploadRequest request) {
        // Appeler Magic Stack pour upload 6D
        return restTemplate.postForObject(
            MAGIC_ROUTER_URL + "/api/interstice/upload",
            request,
            IntersticeEntity.class
        );
    }
}
```

### 2. GameService utilise MagicProxyService
```java
@Service
public class GameService {
    @Autowired
    private MagicProxyService magicProxy;
    
    public void castHeroSpell(String heroId, String spell) {
        // Logique métier du jeu
        Hero hero = getHero(heroId);
        
        // Appeler la Magic Stack pour l'effet magique
        MagicCastResponse result = magicProxy.castSpell(
            new MagicCastRequest(spell, heroId)
        );
        
        // Appliquer les effets au héros
        applyEffects(hero, result);
    }
}
```

## ✅ AVANTAGES
1. **Séparation claire** : Magie vs Métier
2. **Pas de duplication** : Un seul endroit pour la magie
3. **Évolutivité** : Magic Stack peut évoluer indépendamment
4. **Performance** : Le proxy Python peut faire du load balancing

## 🚀 ÉTAPES DE RESTAURATION
1. Supprimer les services dupliqués dans avalon-backend
2. Créer MagicProxyService
3. Réactiver les controllers métier (Game, Combat, etc.)
4. Implémenter les vrais services métier
5. Faire appeler Magic Stack pour tout ce qui est magique