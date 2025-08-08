package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class Search6DRequest {
    private Position6D center;
    private double radius;
    
    public Position6D getCenter() {
        return center;
    }
    
    public void setCenter(Position6D center) {
        this.center = center;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double radius) {
        this.radius = radius;
    }
}