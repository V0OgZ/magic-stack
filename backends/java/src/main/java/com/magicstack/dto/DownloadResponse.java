package com.magicstack.dto;

import com.magicstack.models.Position6D;
import java.util.Map;

public class DownloadResponse {
    private String entityId;
    private Map<String, Object> entityData;
    private Position6D coordinates;
    private String worldHash;
    
    public String getEntityId() {
        return entityId;
    }
    
    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }
    
    public Map<String, Object> getEntityData() {
        return entityData;
    }
    
    public void setEntityData(Map<String, Object> entityData) {
        this.entityData = entityData;
    }
    
    public Position6D getCoordinates() {
        return coordinates;
    }
    
    public void setCoordinates(Position6D coordinates) {
        this.coordinates = coordinates;
    }
    
    public String getWorldHash() {
        return worldHash;
    }
    
    public void setWorldHash(String worldHash) {
        this.worldHash = worldHash;
    }
}