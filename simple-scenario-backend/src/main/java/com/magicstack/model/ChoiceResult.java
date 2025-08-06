package com.magicstack.model;

import java.util.List;
import java.util.Map;

/**
 * 🎯 CHOICE RESULT
 * Résultat d'un choix narratif dans l'Interstice
 */
public class ChoiceResult {
    
    private String eventId;
    private String choiceMade;
    private String hero;
    private String consequence;
    private String narrativeText;
    private boolean timelineChanged;
    private String newTimelineId;
    private Map<String, Object> heroState;
    private List<String> unlockedAbilities;
    private List<String> nextEvents;
    
    public ChoiceResult() {
    }
    
    // Getters and Setters
    public String getEventId() {
        return eventId;
    }
    
    public void setEventId(String eventId) {
        this.eventId = eventId;
    }
    
    public String getChoiceMade() {
        return choiceMade;
    }
    
    public void setChoiceMade(String choiceMade) {
        this.choiceMade = choiceMade;
    }
    
    public String getHero() {
        return hero;
    }
    
    public void setHero(String hero) {
        this.hero = hero;
    }
    
    public String getConsequence() {
        return consequence;
    }
    
    public void setConsequence(String consequence) {
        this.consequence = consequence;
    }
    
    public String getNarrativeText() {
        return narrativeText;
    }
    
    public void setNarrativeText(String narrativeText) {
        this.narrativeText = narrativeText;
    }
    
    public boolean isTimelineChanged() {
        return timelineChanged;
    }
    
    public void setTimelineChanged(boolean timelineChanged) {
        this.timelineChanged = timelineChanged;
    }
    
    public String getNewTimelineId() {
        return newTimelineId;
    }
    
    public void setNewTimelineId(String newTimelineId) {
        this.newTimelineId = newTimelineId;
    }
    
    public Map<String, Object> getHeroState() {
        return heroState;
    }
    
    public void setHeroState(Map<String, Object> heroState) {
        this.heroState = heroState;
    }
    
    public List<String> getUnlockedAbilities() {
        return unlockedAbilities;
    }
    
    public void setUnlockedAbilities(List<String> unlockedAbilities) {
        this.unlockedAbilities = unlockedAbilities;
    }
    
    public List<String> getNextEvents() {
        return nextEvents;
    }
    
    public void setNextEvents(List<String> nextEvents) {
        this.nextEvents = nextEvents;
    }
}