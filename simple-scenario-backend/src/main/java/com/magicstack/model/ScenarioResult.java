package com.magicstack.model;

import java.util.List;
import java.util.Map;

/**
 * 🎯 SCENARIO RESULT
 * Résultat d'exécution d'un scénario
 */
public class ScenarioResult {
    
    private String scenarioName;
    private boolean success;
    private String message;
    private List<String> steps;
    private Map<String, Object> data;
    private long startTime;
    private long endTime;
    private long duration;
    
    public ScenarioResult() {
    }
    
    // Getters and Setters
    public String getScenarioName() {
        return scenarioName;
    }
    
    public void setScenarioName(String scenarioName) {
        this.scenarioName = scenarioName;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public List<String> getSteps() {
        return steps;
    }
    
    public void setSteps(List<String> steps) {
        this.steps = steps;
    }
    
    public Map<String, Object> getData() {
        return data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
    
    public long getStartTime() {
        return startTime;
    }
    
    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }
    
    public long getEndTime() {
        return endTime;
    }
    
    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }
    
    public long getDuration() {
        return duration;
    }
    
    public void setDuration(long duration) {
        this.duration = duration;
    }
}