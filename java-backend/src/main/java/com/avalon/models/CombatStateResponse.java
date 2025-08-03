package com.avalon.models;

/**
 * ⚡ ÉTAT DU COMBAT - AVALON TCG
 * 
 * @author Merlash-Technomancien
 */
public class CombatStateResponse {
    private String combatId;
    private String status;          // WAITING, ACTIVE, FINISHED
    private String currentPlayer;
    private int currentTurn;
    private String winner;
    
    // Constructeurs
    public CombatStateResponse() {}
    
    public CombatStateResponse(String combatId, String status) {
        this.combatId = combatId;
        this.status = status;
    }
    
    // Getters & Setters
    public String getCombatId() { return combatId; }
    public void setCombatId(String combatId) { this.combatId = combatId; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getCurrentPlayer() { return currentPlayer; }
    public void setCurrentPlayer(String currentPlayer) { this.currentPlayer = currentPlayer; }
    
    public int getCurrentTurn() { return currentTurn; }
    public void setCurrentTurn(int currentTurn) { this.currentTurn = currentTurn; }
    
    public String getWinner() { return winner; }
    public void setWinner(String winner) { this.winner = winner; }
}