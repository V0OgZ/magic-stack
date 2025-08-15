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
    private Boolean applied;               // true when mode=apply
    private Map<String, Object> worldDiff; // optional world diff when applied
    
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

    public Boolean getApplied() {
        return applied;
    }

    public void setApplied(Boolean applied) {
        this.applied = applied;
    }

    public Map<String, Object> getWorldDiff() {
        return worldDiff;
    }

    public void setWorldDiff(Map<String, Object> worldDiff) {
        this.worldDiff = worldDiff;
    }
}