package com.magicstack.model;

import java.util.List;

/**
 * 🏆 COMBAT RESULT
 * Résultat d'une action de combat
 */
public class CombatResult {
    
    private String combatId;
    private String cardPlayed;
    private int damageDealt;
    private int heroHp;
    private int enemyHp;
    private boolean combatFinished;
    private String winner;
    private String narrativeText;
    private String narrative;  // Ajout pour compatibilité
    private List<String> nextAvailableCards;
    private boolean success;   // Ajout pour status
    private String aiExplanation;  // Ajout pour explication IA
    
    public CombatResult() {
    }
    
    // Getters and Setters
    public String getCombatId() {
        return combatId;
    }
    
    public void setCombatId(String combatId) {
        this.combatId = combatId;
    }
    
    public String getCardPlayed() {
        return cardPlayed;
    }
    
    public void setCardPlayed(String cardPlayed) {
        this.cardPlayed = cardPlayed;
    }
    
    public int getDamageDealt() {
        return damageDealt;
    }
    
    public void setDamageDealt(int damageDealt) {
        this.damageDealt = damageDealt;
    }
    
    public int getHeroHp() {
        return heroHp;
    }
    
    public void setHeroHp(int heroHp) {
        this.heroHp = heroHp;
    }
    
    public int getEnemyHp() {
        return enemyHp;
    }
    
    public void setEnemyHp(int enemyHp) {
        this.enemyHp = enemyHp;
    }
    
    public boolean isCombatFinished() {
        return combatFinished;
    }
    
    public void setCombatFinished(boolean combatFinished) {
        this.combatFinished = combatFinished;
    }
    
    public String getWinner() {
        return winner;
    }
    
    public void setWinner(String winner) {
        this.winner = winner;
    }
    
    public String getNarrativeText() {
        return narrativeText;
    }
    
    public void setNarrativeText(String narrativeText) {
        this.narrativeText = narrativeText;
    }
    
    public List<String> getNextAvailableCards() {
        return nextAvailableCards;
    }
    
    public void setNextAvailableCards(List<String> nextAvailableCards) {
        this.nextAvailableCards = nextAvailableCards;
    }
    
    public String getNarrative() {
        return narrative != null ? narrative : narrativeText;
    }
    
    public void setNarrative(String narrative) {
        this.narrative = narrative;
        this.narrativeText = narrative;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getAiExplanation() {
        return aiExplanation;
    }
    
    public void setAiExplanation(String aiExplanation) {
        this.aiExplanation = aiExplanation;
    }
}