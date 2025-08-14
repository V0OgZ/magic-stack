package com.magicstack.dto;

import com.magicstack.models.Position6D;
import java.util.Map;
import java.util.List;

public class CastResponse {
    private String spellId;
    private boolean success;
    private String effect;
    private Position6D position6D;
    private String message;
    private Map<String, String> outputs;   // iconic, literary, runic, quantum
    private List<String> effects;          // fx identifiers
    private List<String> sounds;           // sound identifiers
    private String traceHash;              // stable hash of normalized execution trace
    
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

    public Map<String, String> getOutputs() {
        return outputs;
    }

    public void setOutputs(Map<String, String> outputs) {
        this.outputs = outputs;
    }

    public List<String> getEffects() {
        return effects;
    }

    public void setEffects(List<String> effects) {
        this.effects = effects;
    }

    public List<String> getSounds() {
        return sounds;
    }

    public void setSounds(List<String> sounds) {
        this.sounds = sounds;
    }

    public String getTraceHash() {
        return traceHash;
    }

    public void setTraceHash(String traceHash) {
        this.traceHash = traceHash;
    }
}