package com.avalon.models;

/**
 * ⚡ REQUÊTE POUR JOUER UNE CARTE - AVALON TCG
 * 
 * @author Merlash-Technomancien
 */
public class CombatCardRequest {
    private Card card;
    private String caster;
    private String target;
    private String combatId;
    private int turn;
    
    // Constructeurs
    public CombatCardRequest() {}
    
    public CombatCardRequest(Card card, String caster, String target) {
        this.card = card;
        this.caster = caster;
        this.target = target;
    }
    
    // Getters & Setters
    public Card getCard() { return card; }
    public void setCard(Card card) { this.card = card; }
    
    public String getCaster() { return caster; }
    public void setCaster(String caster) { this.caster = caster; }
    
    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }
    
    public String getCombatId() { return combatId; }
    public void setCombatId(String combatId) { this.combatId = combatId; }
    
    public int getTurn() { return turn; }
    public void setTurn(int turn) { this.turn = turn; }
}