package com.magicstack.models;

import java.util.Map;

public class EntityData {
    private String id;
    private Map<String, Object> data;
    private Position6D coordinates;
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public Map<String, Object> getData() {
        return data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
    
    public Position6D getCoordinates() {
        return coordinates;
    }
    
    public void setCoordinates(Position6D coordinates) {
        this.coordinates = coordinates;
    }
}