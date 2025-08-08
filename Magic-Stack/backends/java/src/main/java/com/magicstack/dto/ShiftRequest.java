package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class ShiftRequest {
    private Position6D position;
    private double temporalDelta;
    
    public Position6D getPosition() {
        return position;
    }
    
    public void setPosition(Position6D position) {
        this.position = position;
    }
    
    public double getTemporalDelta() {
        return temporalDelta;
    }
    
    public void setTemporalDelta(double temporalDelta) {
        this.temporalDelta = temporalDelta;
    }
}