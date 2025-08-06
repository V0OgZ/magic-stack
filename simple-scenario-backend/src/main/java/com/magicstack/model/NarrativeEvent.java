package com.magicstack.model;

import java.util.List;
import java.util.Map;

/**
 * 🧠 NARRATIVE EVENT
 * Modèle d'un événement narratif dans l'Interstice
 */
public class NarrativeEvent {
    
    private String eventId;
    private String eventType;
    private String title;
    private String description;
    private String hero;
    private Map<String, Object> location;
    private List<Map<String, Object>> choices;
    private String timelineImpact;
    
    public NarrativeEvent() {
    }
    
    // Getters and Setters
    public String getEventId() {
        return eventId;
    }
    
    public void setEventId(String eventId) {
        this.eventId = eventId;
    }
    
    public String getEventType() {
        return eventType;
    }
    
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getHero() {
        return hero;
    }
    
    public void setHero(String hero) {
        this.hero = hero;
    }
    
    public Map<String, Object> getLocation() {
        return location;
    }
    
    public void setLocation(Map<String, Object> location) {
        this.location = location;
    }
    
    public List<Map<String, Object>> getChoices() {
        return choices;
    }
    
    public void setChoices(List<Map<String, Object>> choices) {
        this.choices = choices;
    }
    
    public String getTimelineImpact() {
        return timelineImpact;
    }
    
    public void setTimelineImpact(String timelineImpact) {
        this.timelineImpact = timelineImpact;
    }
}