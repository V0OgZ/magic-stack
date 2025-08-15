package com.magicstack.dto;

public class TranslateRequest {
    private String formula;
    private String targetFormat; // literary, runic, iconic
    private Boolean includeQuantum; // if true, compute quantum/trace via simulate
    
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

    public Boolean getIncludeQuantum() {
        return includeQuantum;
    }

    public void setIncludeQuantum(Boolean includeQuantum) {
        this.includeQuantum = includeQuantum;
    }
}