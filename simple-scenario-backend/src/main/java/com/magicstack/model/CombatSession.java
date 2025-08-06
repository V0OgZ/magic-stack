package com.magicstack.model;

import java.util.List;

/**
 * 🌀 COMBAT SESSION
 * Modèle d'une session de combat TCG active
 */
public class CombatSession {
    
    private String combatId;
    private String hero;
    private String enemy;
    private int heroHp;
    private int enemyHp;
    private int turn;
    private List<String> availableCards;
    private List<String> combatLog;
    private boolean finished;
    
    public CombatSession() {
    }
    
    // Getters and Setters
    public String getCombatId() {
        return combatId;
    }
    
    public void setCombatId(String combatId) {
        this.combatId = combatId;
    }
    
    public String getHero() {
        return hero;
    }
    
    public void setHero(String hero) {
        this.hero = hero;
    }
    
    public String getEnemy() {
        return enemy;
    }
    
    public void setEnemy(String enemy) {
        this.enemy = enemy;
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
    
    public int getTurn() {
        return turn;
    }
    
    public void setTurn(int turn) {
        this.turn = turn;
    }
    
    public List<String> getAvailableCards() {
        return availableCards;
    }
    
    public void setAvailableCards(List<String> availableCards) {
        this.availableCards = availableCards;
    }
    
    public List<String> getCombatLog() {
        return combatLog;
    }
    
    public void setCombatLog(List<String> combatLog) {
        this.combatLog = combatLog;
    }
    
    public boolean isFinished() {
        return finished;
    }
    
    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}