package com.magicstack.dto;

public class CastRequest {
    private String formula;
    private double power;
    private double targetX;
    private double targetY;
    private double targetZ;
    
    public String getFormula() {
        return formula;
    }
    
    public void setFormula(String formula) {
        this.formula = formula;
    }
    
    public double getPower() {
        return power;
    }
    
    public void setPower(double power) {
        this.power = power;
    }
    
    public double getTargetX() {
        return targetX;
    }
    
    public void setTargetX(double targetX) {
        this.targetX = targetX;
    }
    
    public double getTargetY() {
        return targetY;
    }
    
    public void setTargetY(double targetY) {
        this.targetY = targetY;
    }
    
    public double getTargetZ() {
        return targetZ;
    }
    
    public void setTargetZ(double targetZ) {
        this.targetZ = targetZ;
    }
}