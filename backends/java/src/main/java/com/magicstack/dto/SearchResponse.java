package com.magicstack.dto;

import java.util.List;
import java.util.Map;

public class SearchResponse {
    private int foundCount;
    private List<Map<String, Object>> entities;
    private String searchId;
    
    public int getFoundCount() {
        return foundCount;
    }
    
    public void setFoundCount(int foundCount) {
        this.foundCount = foundCount;
    }
    
    public List<Map<String, Object>> getEntities() {
        return entities;
    }
    
    public void setEntities(List<Map<String, Object>> entities) {
        this.entities = entities;
    }
    
    public String getSearchId() {
        return searchId;
    }
    
    public void setSearchId(String searchId) {
        this.searchId = searchId;
    }
}