package com.magicstack.dto;

import java.util.Map;

public class UploadRequest {
    private String entityId;
    private Map<String, Object> entityData;
    
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
}