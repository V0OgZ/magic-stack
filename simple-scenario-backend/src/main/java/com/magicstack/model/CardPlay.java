package com.magicstack.model;

/**
 * 🃏 CARD PLAY
 * Modèle d'une carte jouée dans un combat
 */
public class CardPlay {
    
    private String combatId;
    private String card;
    private String target;
    private String player;  // Ajout pour identifier qui joue (hero/enemy)
    
    public CardPlay() {
    }
    
    // Getters and Setters
    public String getCombatId() {
        return combatId;
    }
    
    public void setCombatId(String combatId) {
        this.combatId = combatId;
    }
    
    public String getCard() {
        return card;
    }
    
    public void setCard(String card) {
        this.card = card;
    }
    
    public String getTarget() {
        return target;
    }
    
    public void setTarget(String target) {
        this.target = target;
    }
    
    public String getPlayer() {
        return player;
    }
    
    public void setPlayer(String player) {
        this.player = player;
    }
}