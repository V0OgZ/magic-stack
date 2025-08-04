package com.magicstack.dto;

public class FeatureLogRequest {
    private String mageId;
    private String feature;
    private String description;
    private Double x;
    private Double y;
    private Double z;
    private String color;
    
    // Getters et Setters
    public String getMageId() { return mageId; }
    public void setMageId(String mageId) { this.mageId = mageId; }
    
    public String getFeature() { return feature; }
    public void setFeature(String feature) { this.feature = feature; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
    
    public Double getZ() { return z; }
    public void setZ(Double z) { this.z = z; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}