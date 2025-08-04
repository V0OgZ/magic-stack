package com.magicstack.dto;

public class TranslateRequest {
    private String formula;
    private String targetFormat; // literary, runic, iconic
    
    public String getFormula() {
        return formula;
    }
    
    public void setFormula(String formula) {
        this.formula = formula;
    }
    
    public String getTargetFormat() {
        return targetFormat;
    }
    
    public void setTargetFormat(String targetFormat) {
        this.targetFormat = targetFormat;
    }
}