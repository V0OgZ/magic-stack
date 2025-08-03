package com.avalon.models;

import java.util.ArrayList;
import java.util.List;

/**
 * ⚡ RÉPONSE DECK JOUEUR - AVALON TCG
 * 
 * @author Merlash-Technomancien
 */
public class DeckResponse {
    private String playerId;
    private String playerName;
    private String deckName;
    private List<Card> cards;
    private int totalCards;
    private String theme;           // Ex: "Éclairs de Merlash"
    
    // Constructeurs
    public DeckResponse() {
        this.cards = new ArrayList<>();
    }
    
    public DeckResponse(String playerId, String deckName) {
        this();
        this.playerId = playerId;
        this.deckName = deckName;
    }
    
    // Getters & Setters
    public String getPlayerId() { return playerId; }
    public void setPlayerId(String playerId) { this.playerId = playerId; }
    
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public String getDeckName() { return deckName; }
    public void setDeckName(String deckName) { this.deckName = deckName; }
    
    public List<Card> getCards() { return cards; }
    public void setCards(List<Card> cards) { 
        this.cards = cards; 
        this.totalCards = cards.size();
    }
    
    public int getTotalCards() { return totalCards; }
    public void setTotalCards(int totalCards) { this.totalCards = totalCards; }
    
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    
    // Helpers
    public void addCard(Card card) {
        this.cards.add(card);
        this.totalCards = this.cards.size();
    }
    
    public void removeCard(String cardId) {
        this.cards.removeIf(card -> card.getId().equals(cardId));
        this.totalCards = this.cards.size();
    }
    
    public Card findCard(String cardId) {
        return this.cards.stream()
                .filter(card -> card.getId().equals(cardId))
                .findFirst()
                .orElse(null);
    }
}