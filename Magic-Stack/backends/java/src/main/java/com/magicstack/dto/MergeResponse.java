package com.magicstack.dto;

public class MergeResponse {
    private String mergedWorldId;
    private int entitiesCount;
    private boolean success;
    
    public String getMergedWorldId() {
        return mergedWorldId;
    }
    
    public void setMergedWorldId(String mergedWorldId) {
        this.mergedWorldId = mergedWorldId;
    }
    
    public int getEntitiesCount() {
        return entitiesCount;
    }
    
    public void setEntitiesCount(int entitiesCount) {
        this.entitiesCount = entitiesCount;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
}