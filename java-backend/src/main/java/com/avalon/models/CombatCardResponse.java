package com.avalon.models;

import java.util.HashMap;
import java.util.Map;

/**
 * ⚡ RÉPONSE APRÈS AVOIR JOUÉ UNE CARTE - AVALON TCG
 * 
 * @author Merlash-Technomancien
 */
public class CombatCardResponse {
    private boolean success;
    private String message;
    private Card cardPlayed;
    private String caster;
    private Map<String, Object> effects;
    private int damage;
    private int healing;
    private String temporalEffect;
    private String quantumEffect;
    
    // Constructeurs
    public CombatCardResponse() {
        this.effects = new HashMap<>();
    }
    
    public static CombatCardResponse error(String message) {
        CombatCardResponse response = new CombatCardResponse();
        response.setSuccess(false);
        response.setMessage(message);
        return response;
    }
    
    public static CombatCardResponse success(String message) {
        CombatCardResponse response = new CombatCardResponse();
        response.setSuccess(true);
        response.setMessage(message);
        return response;
    }
    
    // Getters & Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Card getCardPlayed() { return cardPlayed; }
    public void setCardPlayed(Card cardPlayed) { this.cardPlayed = cardPlayed; }
    
    public String getCaster() { return caster; }
    public void setCaster(String caster) { this.caster = caster; }
    
    public Map<String, Object> getEffects() { return effects; }
    public void setEffects(Map<String, Object> effects) { this.effects = effects; }
    public void addEffect(String type, Object effect) { this.effects.put(type, effect); }
    
    public int getDamage() { return damage; }
    public void setDamage(int damage) { this.damage = damage; }
    
    public int getHealing() { return healing; }
    public void setHealing(int healing) { this.healing = healing; }
    
    public String getTemporalEffect() { return temporalEffect; }
    public void setTemporalEffect(String temporalEffect) { this.temporalEffect = temporalEffect; }
    
    public String getQuantumEffect() { return quantumEffect; }
    public void setQuantumEffect(String quantumEffect) { this.quantumEffect = quantumEffect; }
}