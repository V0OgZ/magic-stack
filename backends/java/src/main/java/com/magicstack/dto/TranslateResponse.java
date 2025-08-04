package com.magicstack.dto;

import java.util.Map;

public class TranslateResponse {
    private String formula;
    private Map<String, String> translations;
    private String format;
    
    public String getFormula() {
        return formula;
    }
    
    public void setFormula(String formula) {
        this.formula = formula;
    }
    
    public Map<String, String> getTranslations() {
        return translations;
    }
    
    public void setTranslations(Map<String, String> translations) {
        this.translations = translations;
    }
    
    public String getFormat() {
        return format;
    }
    
    public void setFormat(String format) {
        this.format = format;
    }
}