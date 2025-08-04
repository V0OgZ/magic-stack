package com.magicstack.dto;

public class DownloadRequest {
    private String entityId;
    private boolean includeHistory;
    
    public String getEntityId() {
        return entityId;
    }
    
    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }
    
    public boolean isIncludeHistory() {
        return includeHistory;
    }
    
    public void setIncludeHistory(boolean includeHistory) {
        this.includeHistory = includeHistory;
    }
}