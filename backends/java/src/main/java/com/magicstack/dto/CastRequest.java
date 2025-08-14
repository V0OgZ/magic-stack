package com.magicstack.dto;

public class CastRequest {
    private String formula;        // free-text formula (fallback)
    private String formulaId;      // canonical formula id
    private String mode;           // simulate | apply
    private Object context;        // arbitrary context map
    private Long seed;             // deterministic seed
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

    public String getFormulaId() {
        return formulaId;
    }

    public void setFormulaId(String formulaId) {
        this.formulaId = formulaId;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public Object getContext() {
        return context;
    }

    public void setContext(Object context) {
        this.context = context;
    }

    public Long getSeed() {
        return seed;
    }

    public void setSeed(Long seed) {
        this.seed = seed;
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