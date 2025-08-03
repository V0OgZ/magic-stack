package com.avalon.models;

import java.util.List;
import java.util.ArrayList;

/**
 * 🗺️ MINIMAP RESPONSE MODEL
 * Réponse pour la Mini-map 6D révolutionnaire
 * Par : MERLASH-TECHNOMANCIEN
 */
public class MinimapResponse {
    
    private boolean success;
    private String message;
    private List<Timeline> revealedTimelines;
    private MinimapRequest.Position6D newPosition;
    private String causalState;
    private List<BrisurePoint> availableBrisures;
    private String temporalStatus;
    
    // Constructeurs
    public MinimapResponse() {
        this.revealedTimelines = new ArrayList<>();
        this.availableBrisures = new ArrayList<>();
    }
    
    public MinimapResponse(boolean success, String message) {
        this();
        this.success = success;
        this.message = message;
    }
    
    // Timeline révélée
    public static class Timeline {
        private String id;
        private String name;
        private String description;
        private double probabilityWeight;
        private String status; // ACTIVE, COLLAPSED, SUPERPOSED
        private List<String> connectedTimelines;
        
        public Timeline() {
            this.connectedTimelines = new ArrayList<>();
        }
        
        public Timeline(String id, String name, String description, double probabilityWeight) {
            this();
            this.id = id;
            this.name = name;
            this.description = description;
            this.probabilityWeight = probabilityWeight;
            this.status = "ACTIVE";
        }
        
        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        
        public double getProbabilityWeight() { return probabilityWeight; }
        public void setProbabilityWeight(double probabilityWeight) { this.probabilityWeight = probabilityWeight; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public List<String> getConnectedTimelines() { return connectedTimelines; }
        public void setConnectedTimelines(List<String> connectedTimelines) { this.connectedTimelines = connectedTimelines; }
    }
    
    // Point de Brisure (Navigation)
    public static class BrisurePoint {
        private String id;
        private String name;
        private MinimapRequest.Position6D position;
        private String targetDimension;
        private boolean accessible;
        private String requirements;
        
        public BrisurePoint() {}
        
        public BrisurePoint(String id, String name, MinimapRequest.Position6D position, String targetDimension) {
            this.id = id;
            this.name = name;
            this.position = position;
            this.targetDimension = targetDimension;
            this.accessible = true;
        }
        
        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public MinimapRequest.Position6D getPosition() { return position; }
        public void setPosition(MinimapRequest.Position6D position) { this.position = position; }
        
        public String getTargetDimension() { return targetDimension; }
        public void setTargetDimension(String targetDimension) { this.targetDimension = targetDimension; }
        
        public boolean isAccessible() { return accessible; }
        public void setAccessible(boolean accessible) { this.accessible = accessible; }
        
        public String getRequirements() { return requirements; }
        public void setRequirements(String requirements) { this.requirements = requirements; }
    }
    
    // Getters et Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public List<Timeline> getRevealedTimelines() { return revealedTimelines; }
    public void setRevealedTimelines(List<Timeline> revealedTimelines) { this.revealedTimelines = revealedTimelines; }
    
    public MinimapRequest.Position6D getNewPosition() { return newPosition; }
    public void setNewPosition(MinimapRequest.Position6D newPosition) { this.newPosition = newPosition; }
    
    public String getCausalState() { return causalState; }
    public void setCausalState(String causalState) { this.causalState = causalState; }
    
    public List<BrisurePoint> getAvailableBrisures() { return availableBrisures; }
    public void setAvailableBrisures(List<BrisurePoint> availableBrisures) { this.availableBrisures = availableBrisures; }
    
    public String getTemporalStatus() { return temporalStatus; }
    public void setTemporalStatus(String temporalStatus) { this.temporalStatus = temporalStatus; }
}