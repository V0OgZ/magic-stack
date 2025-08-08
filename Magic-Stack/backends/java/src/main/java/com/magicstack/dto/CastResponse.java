package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class CastResponse {
    private String spellId;
    private boolean success;
    private String effect;
    private Position6D position6D;
    private String message;
    
    public String getSpellId() {
        return spellId;
    }
    
    public void setSpellId(String spellId) {
        this.spellId = spellId;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getEffect() {
        return effect;
    }
    
    public void setEffect(String effect) {
        this.effect = effect;
    }
    
    public Position6D getPosition6D() {
        return position6D;
    }
    
    public void setPosition6D(Position6D position6D) {
        this.position6D = position6D;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}