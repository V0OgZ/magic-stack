package com.magicstack.dto;

public class ForkResponse {
    private String newWorldId;
    private String sourceWorldId;
    private boolean success;
    
    public String getNewWorldId() {
        return newWorldId;
    }
    
    public void setNewWorldId(String newWorldId) {
        this.newWorldId = newWorldId;
    }
    
    public String getSourceWorldId() {
        return sourceWorldId;
    }
    
    public void setSourceWorldId(String sourceWorldId) {
        this.sourceWorldId = sourceWorldId;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
}