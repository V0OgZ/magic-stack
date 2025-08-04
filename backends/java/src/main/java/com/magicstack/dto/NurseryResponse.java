package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class NurseryResponse {
    private String entityId;
    private String status;
    private String message;
    private Position6D startingCoordinates;
    private String trainingPlan;
    
    public String getEntityId() {
        return entityId;
    }
    
    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Position6D getStartingCoordinates() {
        return startingCoordinates;
    }
    
    public void setStartingCoordinates(Position6D startingCoordinates) {
        this.startingCoordinates = startingCoordinates;
    }
    
    public String getTrainingPlan() {
        return trainingPlan;
    }
    
    public void setTrainingPlan(String trainingPlan) {
        this.trainingPlan = trainingPlan;
    }
}