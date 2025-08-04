package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class ShiftResponse {
    private Position6D originalPosition;
    private Position6D shiftedPosition;
    private double temporalDelta;
    private boolean success;
    
    public Position6D getOriginalPosition() {
        return originalPosition;
    }
    
    public void setOriginalPosition(Position6D originalPosition) {
        this.originalPosition = originalPosition;
    }
    
    public Position6D getShiftedPosition() {
        return shiftedPosition;
    }
    
    public void setShiftedPosition(Position6D shiftedPosition) {
        this.shiftedPosition = shiftedPosition;
    }
    
    public double getTemporalDelta() {
        return temporalDelta;
    }
    
    public void setTemporalDelta(double temporalDelta) {
        this.temporalDelta = temporalDelta;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
}