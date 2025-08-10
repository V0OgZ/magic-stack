package com.magicstack.controller;

import com.magicstack.service.CombatService;
import com.magicstack.model.CombatSession;
import com.magicstack.model.CardPlay;
import com.magicstack.model.CombatResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

/**
 * 🌀 COMBAT TCG CONTROLLER
 * Gère les combats via système de cartes
 * Dimension 1 Littéraire: Combat = Résolution d'événements narratifs
 */
@RestController
@RequestMapping("/api/combat")
@CrossOrigin(origins = "*")
public class CombatController {

    @Autowired
    private CombatService combatService;

    @PostMapping("/start")
    public Map<String, Object> startCombat(@RequestBody Map<String, Object> combatData) {
        System.out.println("🌀 Déclenchement combat TCG");
        System.out.println("📝 Données: " + combatData);
        
        try {
            CombatSession session = combatService.initiateCombat(combatData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("combat_id", session.getCombatId());
            response.put("hero", session.getHero());
            response.put("enemy", session.getEnemy());
            response.put("available_cards", session.getAvailableCards());
            response.put("hero_hp", session.getHeroHp());
            response.put("enemy_hp", session.getEnemyHp());
            response.put("turn", session.getTurn());
            response.put("message", "Combat initié! Choisissez votre première carte.");
            
            System.out.println("✅ Combat créé: " + session.getCombatId());
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/enemy-turn")
    public Map<String, Object> playEnemyTurn(@RequestBody Map<String, Object> request) {
        System.out.println("IA joue son tour");
        String combatId = (String) request.get("combat_id");
        
        try {
            CombatResult result = combatService.playEnemyTurn(combatId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", result.isSuccess());
            response.put("damage_dealt", result.getDamageDealt());
            response.put("hero_hp", result.getHeroHp());
            response.put("enemy_hp", result.getEnemyHp());
            response.put("narrative", result.getNarrative());
            response.put("combat_finished", result.isCombatFinished());
            
            if (result.isCombatFinished()) {
                response.put("winner", result.getWinner());
            }
            
            System.out.println("IA a joué, résultat: " + response);
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }
    
    @PostMapping("/play-card")
    public Map<String, Object> playCard(@RequestBody Map<String, Object> cardData) {
        System.out.println("🃏 Jeu de carte TCG");
        System.out.println("📝 Carte jouée: " + cardData);
        
        try {
            CardPlay cardPlay = new CardPlay();
            cardPlay.setCombatId((String) cardData.get("combat_id"));
            cardPlay.setCard((String) cardData.get("card"));
            cardPlay.setTarget((String) cardData.get("target"));
            
            CombatResult result = combatService.playCard(cardPlay);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("combat_id", result.getCombatId());
            response.put("card_played", result.getCardPlayed());
            response.put("damage_dealt", result.getDamageDealt());
            response.put("hero_hp", result.getHeroHp());
            response.put("enemy_hp", result.getEnemyHp());
            response.put("combat_finished", result.isCombatFinished());
            response.put("winner", result.getWinner());
            response.put("narrative", result.getNarrativeText());
            response.put("next_available_cards", result.getNextAvailableCards());
            
            System.out.println("✅ Carte jouée: " + cardPlay.getCard() + " -> " + result.getDamageDealt() + " dégâts");
            
            if (result.isCombatFinished()) {
                System.out.println("🏆 Combat terminé! Vainqueur: " + result.getWinner());
            }
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @GetMapping("/status/{combatId}")
    public Map<String, Object> getCombatStatus(@PathVariable String combatId) {
        System.out.println("📊 Statut combat: " + combatId);
        
        try {
            CombatSession session = combatService.getCombatSession(combatId);
            
            Map<String, Object> status = new HashMap<>();
            status.put("combat_id", session.getCombatId());
            status.put("hero", session.getHero());
            status.put("enemy", session.getEnemy());
            status.put("hero_hp", session.getHeroHp());
            status.put("enemy_hp", session.getEnemyHp());
            status.put("turn", session.getTurn());
            status.put("available_cards", session.getAvailableCards());
            status.put("combat_log", session.getCombatLog());
            status.put("finished", session.isFinished());
            
            return status;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/end/{combatId}")
    public Map<String, Object> endCombat(@PathVariable String combatId) {
        System.out.println("🛑 Fin de combat: " + combatId);
        
        try {
            combatService.endCombat(combatId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Combat terminé");
            response.put("combat_id", combatId);
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }
}