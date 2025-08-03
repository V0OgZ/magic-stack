package com.avalon.controllers;

import com.avalon.models.game.*;
import com.avalon.services.GameService;
import com.avalon.services.WorldMapService;
import com.avalon.services.HeroService;
import com.avalon.services.CombatService;
import com.avalon.services.MagicCastService;
import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.UUID;

/**
 * 🎮 Contrôleur principal pour Heroes of AVALON
 * Gère les parties, héros, cartes et combats
 */
@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @Autowired
    private WorldMapService worldMapService;
    
    @Autowired
    private HeroService heroService;
    
    @Autowired
    private CombatService combatService;
    
    @Autowired
    private MagicCastService magicCastService;
    
    // ========== GESTION DES PARTIES ==========
    
    @PostMapping("/new")
    public ResponseEntity<GameSession> createNewGame(@RequestBody NewGameRequest request) {
        GameSession session = gameService.createNewGame(
            request.getPlayerName(),
            request.getMapSize(),
            request.getDifficulty()
        );
        return ResponseEntity.ok(session);
    }
    
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<GameSession> getGameSession(@PathVariable String sessionId) {
        return ResponseEntity.ok(gameService.getSession(sessionId));
    }
    
    @PostMapping("/session/{sessionId}/save")
    public ResponseEntity<SaveGameResponse> saveGame(@PathVariable String sessionId) {
        String saveId = gameService.saveGame(sessionId);
        return ResponseEntity.ok(new SaveGameResponse(saveId, "Partie sauvegardée"));
    }
    
    @GetMapping("/saves")
    public ResponseEntity<List<SavedGame>> getSavedGames() {
        return ResponseEntity.ok(gameService.getSavedGames());
    }
    
    @PostMapping("/load/{saveId}")
    public ResponseEntity<GameSession> loadGame(@PathVariable String saveId) {
        GameSession session = gameService.loadGame(saveId);
        return ResponseEntity.ok(session);
    }
    
    // ========== GESTION DE LA CARTE ==========
    
    @GetMapping("/session/{sessionId}/map")
    public ResponseEntity<WorldMap> getWorldMap(@PathVariable String sessionId) {
        return ResponseEntity.ok(worldMapService.getMap(sessionId));
    }
    
    @GetMapping("/session/{sessionId}/map/visible")
    public ResponseEntity<VisibleMapData> getVisibleMap(
            @PathVariable String sessionId,
            @RequestParam int centerX,
            @RequestParam int centerY,
            @RequestParam int radius) {
        return ResponseEntity.ok(worldMapService.getVisibleArea(sessionId, centerX, centerY, radius));
    }
    
    @GetMapping("/session/{sessionId}/map/tile/{x}/{y}")
    public ResponseEntity<TileInfo> getTileInfo(
            @PathVariable String sessionId,
            @PathVariable int x,
            @PathVariable int y) {
        return ResponseEntity.ok(worldMapService.getTileInfo(sessionId, x, y));
    }
    
    // ========== GESTION DES HÉROS ==========
    
    @GetMapping("/session/{sessionId}/heroes")
    public ResponseEntity<List<Hero>> getHeroes(@PathVariable String sessionId) {
        return ResponseEntity.ok(heroService.getHeroesInSession(sessionId));
    }
    
    @GetMapping("/hero/{heroId}")
    public ResponseEntity<Hero> getHero(@PathVariable String heroId) {
        return ResponseEntity.ok(heroService.getHero(heroId));
    }
    
    @PostMapping("/hero/{heroId}/move")
    public ResponseEntity<MoveResult> moveHero(
            @PathVariable String heroId,
            @RequestBody MoveRequest request) {
        MoveResult result = heroService.moveHero(heroId, request.getPath());
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/hero/{heroId}/cast")
    public ResponseEntity<SpellCastResult> castSpell(
            @PathVariable String heroId,
            @RequestBody SpellCastRequest request) {
        // Intégration avec le système de magie existant
        SpellCastResult result = heroService.castSpell(
            heroId, 
            request.getSpellId(), 
            request.getTargetX(), 
            request.getTargetY()
        );
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/hero/{heroId}/levelup")
    public ResponseEntity<Hero> levelUpHero(
            @PathVariable String heroId,
            @RequestBody LevelUpRequest request) {
        Hero hero = heroService.levelUp(heroId, request.getStatToIncrease());
        return ResponseEntity.ok(hero);
    }
    
    // ========== GESTION DES CRÉATURES ==========
    
    @GetMapping("/session/{sessionId}/creatures")
    public ResponseEntity<List<Creature>> getCreatures(@PathVariable String sessionId) {
        return ResponseEntity.ok(worldMapService.getCreatures(sessionId));
    }
    
    @PostMapping("/session/{sessionId}/spawn")
    public ResponseEntity<Creature> spawnCreature(
            @PathVariable String sessionId,
            @RequestBody SpawnCreatureRequest request) {
        Creature creature = worldMapService.spawnCreature(
            sessionId,
            request.getType(),
            request.getX(),
            request.getY(),
            request.getLevel()
        );
        return ResponseEntity.ok(creature);
    }
    
    // ========== SYSTÈME DE COMBAT ==========
    
    @PostMapping("/combat/start")
    public ResponseEntity<Combat> startCombat(@RequestBody StartCombatRequest request) {
        Combat combat = combatService.initiateCombat(
            request.getHeroId(),
            request.getTargetId(),
            request.getCombatType()
        );
        return ResponseEntity.ok(combat);
    }
    
    @GetMapping("/combat/{combatId}")
    public ResponseEntity<Combat> getCombatState(@PathVariable String combatId) {
        return ResponseEntity.ok(combatService.getCombat(combatId));
    }
    
    @PostMapping("/combat/{combatId}/action")
    public ResponseEntity<CombatResult> performCombatAction(
            @PathVariable String combatId,
            @RequestBody CombatAction action) {
        CombatResult result = combatService.performAction(combatId, action);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/combat/{combatId}/auto")
    public ResponseEntity<CombatResult> autoCombat(@PathVariable String combatId) {
        CombatResult result = combatService.autoResolve(combatId);
        return ResponseEntity.ok(result);
    }
    
    // ========== GESTION DES STRUCTURES ==========
    
    @GetMapping("/session/{sessionId}/structures")
    public ResponseEntity<List<Structure>> getStructures(@PathVariable String sessionId) {
        return ResponseEntity.ok(worldMapService.getStructures(sessionId));
    }
    
    @PostMapping("/structure/{structureId}/interact")
    public ResponseEntity<InteractionResult> interactWithStructure(
            @PathVariable String structureId,
            @RequestBody InteractionRequest request) {
        InteractionResult result = worldMapService.interactWithStructure(
            structureId,
            request.getHeroId(),
            request.getAction()
        );
        return ResponseEntity.ok(result);
    }
    
    // ========== SYSTÈME DE TOURS ==========
    
    @PostMapping("/session/{sessionId}/endturn")
    public ResponseEntity<TurnResult> endTurn(@PathVariable String sessionId) {
        TurnResult result = gameService.endTurn(sessionId);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/session/{sessionId}/events")
    public ResponseEntity<List<GameEvent>> getEvents(
            @PathVariable String sessionId,
            @RequestParam(defaultValue = "0") int fromTurn) {
        return ResponseEntity.ok(gameService.getEvents(sessionId, fromTurn));
    }
    
    // ========== SYSTÈME D'INVENTAIRE ==========
    
    @GetMapping("/hero/{heroId}/inventory")
    public ResponseEntity<Inventory> getInventory(@PathVariable String heroId) {
        return ResponseEntity.ok(heroService.getInventory(heroId));
    }
    
    @PostMapping("/hero/{heroId}/equip")
    public ResponseEntity<Hero> equipItem(
            @PathVariable String heroId,
            @RequestBody EquipRequest request) {
        Hero hero = heroService.equipItem(heroId, request.getItemId(), request.getSlot());
        return ResponseEntity.ok(hero);
    }
    
    @PostMapping("/hero/{heroId}/use")
    public ResponseEntity<UseItemResult> useItem(
            @PathVariable String heroId,
            @RequestBody UseItemRequest request) {
        UseItemResult result = heroService.useItem(heroId, request.getItemId());
        return ResponseEntity.ok(result);
    }
    
    // ========== SYSTÈME DE MAGIE INTÉGRÉ ==========
    
    /**
     * 🔮 Lancer un sort dans le contexte du jeu
     * Utilise le système de magie unifié avec validation du contexte de jeu
     */
    @PostMapping("/magic/cast")
    public ResponseEntity<GameMagicResult> castSpellInGame(
            @RequestBody GameMagicRequest request) {
        
        // Vérifier que le héros existe et peut lancer le sort
        Hero caster = heroService.getHero(request.getHeroId());
        if (caster == null) {
            return ResponseEntity.badRequest().body(
                GameMagicResult.builder()
                    .success(false)
                    .message("Héros introuvable")
                    .build()
            );
        }
        
        // Créer la requête pour le système de magie unifié
        MagicCastRequest magicRequest = MagicCastRequest.builder()
            .formulaType(request.getFormulaType())
            .formula(request.getFormula())
            .casterId(caster.getName())
            .parameters(request.getParameters())
            .build();
        
        // Exécuter via le système de magie unifié
        MagicCastResponse magicResponse = magicCastService.cast(magicRequest);
        
        // Appliquer les effets au contexte de jeu
        GameMagicResult gameResult = GameMagicResult.builder()
            .success(magicResponse.isSuccess())
            .message(magicResponse.getMessage())
            .effects(magicResponse.getEffects())
            .metadata(magicResponse.getMetadata())
            .build();
        
        if (magicResponse.isSuccess()) {
            // Appliquer les effets sur la carte, les unités, etc.
            applyMagicEffectsToGame(request.getSessionId(), caster, magicResponse);
            
            // Consommer le mana du héros
            int manaCost = calculateManaCost(request.getFormula());
            heroService.consumeMana(caster.getId(), manaCost);
            gameResult.setManaCost(manaCost);
            gameResult.setRemainingMana(caster.getMana() - manaCost);
        }
        
        return ResponseEntity.ok(gameResult);
    }
    
    /**
     * 🌟 Obtenir la liste des sorts disponibles pour un héros
     */
    @GetMapping("/hero/{heroId}/spells")
    public ResponseEntity<List<SpellInfo>> getAvailableSpells(@PathVariable String heroId) {
        Hero hero = heroService.getHero(heroId);
        List<SpellInfo> spells = magicCastService.getAvailableSpells(hero);
        return ResponseEntity.ok(spells);
    }
    
    private void applyMagicEffectsToGame(String sessionId, Hero caster, MagicCastResponse response) {
        // Appliquer les effets selon le type de sort
        if (response.getEffects().contains("DAMAGE")) {
            // Appliquer des dégâts aux ennemis proches
            combatService.applyAreaDamage(sessionId, caster.getPosition(), 
                (Integer) response.getMetadata().get("damage"));
        }
        
        if (response.getEffects().contains("TELEPORT")) {
            // Téléporter le héros
            Position newPos = (Position) response.getMetadata().get("destination");
            worldMapService.moveHero(caster.getId(), newPos);
        }
        
        if (response.getEffects().contains("SUMMON")) {
            // Invoquer une créature
            String creatureType = (String) response.getMetadata().get("creature");
            worldMapService.summonCreature(sessionId, caster.getPosition(), creatureType);
        }
        
        // Ajouter l'événement au log de jeu
        gameService.addEvent(sessionId, new GameEvent(
            "SPELL_CAST",
            caster.getName() + " lance " + response.getFormulaExecuted(),
            response.getEffects()
        ));
    }
    
    private int calculateManaCost(String formula) {
        // Logique pour calculer le coût en mana selon la formule
        if (formula.contains("TEMPORAL")) return 50;
        if (formula.contains("GROFI")) return 30;
        if (formula.contains("TELEPORT")) return 20;
        return 10; // Coût par défaut
    }
}

// Classes internes pour les requêtes/réponses spécifiques au jeu

class GameMagicRequest {
    private String sessionId;
    private String heroId;
    private String formulaType;
    private String formula;
    private Map<String, Object> parameters;
    private Position targetPosition;
    // getters/setters...
}

class GameMagicResult {
    private boolean success;
    private String message;
    private List<String> effects;
    private Map<String, Object> metadata;
    private int manaCost;
    private int remainingMana;
    // builder pattern...
}

class UseItemRequest {
    private String itemId;
    // getters/setters...
}