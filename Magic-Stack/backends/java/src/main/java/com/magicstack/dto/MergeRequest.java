package com.magicstack.dto;

import java.util.List;

public class MergeRequest {
    private List<String> worldIds;
    private String mergeStrategy;
    
    public List<String> getWorldIds() {
        return worldIds;
    }
    
    public void setWorldIds(List<String> worldIds) {
        this.worldIds = worldIds;
    }
    
    public String getMergeStrategy() {
        return mergeStrategy;
    }
    
    public void setMergeStrategy(String mergeStrategy) {
        this.mergeStrategy = mergeStrategy;
    }
}