package com.magicstack.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;

/**
 * Service pour connecter avec l'IA TCG du backend Rust
 * Permet au combat Java d'utiliser l'IA Rust pour les décisions
 */
@Service
public class TcgAiService {
    
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final String RUST_API_URL = "http://localhost:3001";
    
    public TcgAiService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }
    
    /**
     * Demande à l'IA Rust de décider quelle carte jouer
     */
    public TcgAiDecision getAiDecision(CombatState combatState) {
        try {
            // Convertir l'état de combat Java vers le format Rust
            Map<String, Object> tcgState = new HashMap<>();
            tcgState.put("game_id", combatState.getCombatId());
            tcgState.put("turn", combatState.getTurn());
            tcgState.put("active_player", "enemy:" + combatState.getEnemy());
            tcgState.put("mana", combatState.getEnemyMana());
            
            // Convertir les cartes disponibles
            List<Map<String, Object>> hand = new ArrayList<>();
            for (String card : combatState.getEnemyCards()) {
                Map<String, Object> cardMap = new HashMap<>();
                cardMap.put("id", card);
                cardMap.put("cost", getCardCost(card));
                hand.add(cardMap);
            }
            tcgState.put("hand", hand);
            
            // Board state
            Map<String, Object> board = new HashMap<>();
            board.put("ally", new ArrayList<>());
            board.put("enemy", new ArrayList<>());
            board.put("effects", new ArrayList<>());
            tcgState.put("board", board);
            
            // Flags
            Map<String, Object> flags = new HashMap<>();
            flags.put("hero_hp", combatState.getHeroHp());
            flags.put("enemy_hp", combatState.getEnemyHp());
            flags.put("superpositions", 0);
            flags.put("collapse_imminent", false);
            tcgState.put("flags", flags);
            
            // AI preferences
            Map<String, Object> aiPrefs = new HashMap<>();
            aiPrefs.put("mode", combatState.getDifficulty());
            aiPrefs.put("difficulty", "normal");
            aiPrefs.put("risk", "medium");
            aiPrefs.put("time_budget_ms", 100);
            
            // Request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("state", tcgState);
            requestBody.put("ai_prefs", aiPrefs);
            
            // Call Rust API
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                RUST_API_URL + "/tcg/ai/decide",
                request,
                Map.class
            );
            
            // Parse response
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> actions = (List<Map<String, Object>>) responseBody.get("actions");
            String explanation = (String) responseBody.get("explain");
            
            // Convert to decision
            TcgAiDecision decision = new TcgAiDecision();
            
            for (Map<String, Object> action : actions) {
                String type = (String) action.get("type");
                if ("PLAY_CARD".equals(type)) {
                    decision.setCardToPlay((String) action.get("card_id"));
                    decision.setTarget((String) action.get("target"));
                } else if ("END_TURN".equals(type)) {
                    decision.setShouldEndTurn(true);
                }
            }
            
            decision.setExplanation(explanation);
            decision.setSuccess(true);
            
            System.out.println("AI Decision from Rust: " + decision);
            return decision;
            
        } catch (Exception e) {
            System.err.println("Error calling Rust AI: " + e.getMessage());
            e.printStackTrace();
            
            // Fallback to simple AI
            return getSimpleAiDecision(combatState);
        }
    }
    
    /**
     * Simple fallback AI if Rust is not available
     */
    private TcgAiDecision getSimpleAiDecision(CombatState combatState) {
        TcgAiDecision decision = new TcgAiDecision();
        
        // Simple heuristic: play highest damage card
        List<String> cards = combatState.getEnemyCards();
        if (!cards.isEmpty()) {
            String bestCard = cards.get(0);
            for (String card : cards) {
                if (card.equals("fireball")) {
                    bestCard = card;
                    break;
                }
            }
            decision.setCardToPlay(bestCard);
            decision.setTarget("hero");
            decision.setExplanation("Fallback AI: Playing " + bestCard);
        }
        
        decision.setShouldEndTurn(true);
        decision.setSuccess(true);
        
        return decision;
    }
    
    /**
     * Get card cost (simplified)
     */
    private int getCardCost(String card) {
        switch(card.toLowerCase()) {
            case "fireball": return 3;
            case "shield": return 2;
            case "heal": return 2;
            case "lightning": return 4;
            case "freeze": return 3;
            default: return 2;
        }
    }
    
    /**
     * Ask AI for coaching advice
     */
    public TcgCoachAdvice getCoachingAdvice(CombatState combatState, String question) {
        try {
            Map<String, Object> requestBody = new HashMap<>();
            // Similar to getAiDecision but for coaching endpoint
            requestBody.put("state", convertToTcgState(combatState));
            requestBody.put("question", question);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<Map> response = restTemplate.postForEntity(
                RUST_API_URL + "/tcg/ai/coach",
                request,
                Map.class
            );
            
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> lines = (List<Map<String, Object>>) responseBody.get("lines");
            
            TcgCoachAdvice advice = new TcgCoachAdvice();
            if (!lines.isEmpty()) {
                Map<String, Object> firstLine = lines.get(0);
                advice.setPlan((List<Map<String, Object>>) firstLine.get("plan"));
                advice.setWhy((String) firstLine.get("why"));
                advice.setRisk((String) firstLine.get("risk"));
            }
            
            return advice;
            
        } catch (Exception e) {
            System.err.println("Error calling Rust coach: " + e.getMessage());
            
            TcgCoachAdvice fallback = new TcgCoachAdvice();
            fallback.setWhy("Focus on damage when enemy is low");
            fallback.setRisk("low");
            return fallback;
        }
    }
    
    private Map<String, Object> convertToTcgState(CombatState combatState) {
        // Reuse conversion logic from getAiDecision
        Map<String, Object> tcgState = new HashMap<>();
        tcgState.put("game_id", combatState.getCombatId());
        tcgState.put("turn", combatState.getTurn());
        // ... rest of conversion
        return tcgState;
    }
    
    // Inner classes for responses
    public static class TcgAiDecision {
        private String cardToPlay;
        private String target;
        private boolean shouldEndTurn;
        private String explanation;
        private boolean success;
        
        // Getters and setters
        public String getCardToPlay() { return cardToPlay; }
        public void setCardToPlay(String cardToPlay) { this.cardToPlay = cardToPlay; }
        public String getTarget() { return target; }
        public void setTarget(String target) { this.target = target; }
        public boolean isShouldEndTurn() { return shouldEndTurn; }
        public void setShouldEndTurn(boolean shouldEndTurn) { this.shouldEndTurn = shouldEndTurn; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        @Override
        public String toString() {
            return "TcgAiDecision{card=" + cardToPlay + ", target=" + target + 
                   ", endTurn=" + shouldEndTurn + ", explain=" + explanation + "}";
        }
    }
    
    public static class TcgCoachAdvice {
        private List<Map<String, Object>> plan;
        private String why;
        private String risk;
        
        // Getters and setters
        public List<Map<String, Object>> getPlan() { return plan; }
        public void setPlan(List<Map<String, Object>> plan) { this.plan = plan; }
        public String getWhy() { return why; }
        public void setWhy(String why) { this.why = why; }
        public String getRisk() { return risk; }
        public void setRisk(String risk) { this.risk = risk; }
    }
    
    // Mock CombatState for compilation
    public static class CombatState {
        private String combatId;
        private int turn;
        private String enemy;
        private int enemyMana;
        private List<String> enemyCards;
        private int heroHp;
        private int enemyHp;
        private String difficulty;
        
        // All getters
        public String getCombatId() { return combatId; }
        public int getTurn() { return turn; }
        public String getEnemy() { return enemy; }
        public int getEnemyMana() { return enemyMana; }
        public List<String> getEnemyCards() { return enemyCards; }
        public int getHeroHp() { return heroHp; }
        public int getEnemyHp() { return enemyHp; }
        public String getDifficulty() { return difficulty; }
    }
}
