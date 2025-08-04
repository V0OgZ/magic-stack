package com.magicstack.dto;

public class ForkRequest {
    private String sourceWorldId;
    private String forkName;
    
    public String getSourceWorldId() {
        return sourceWorldId;
    }
    
    public void setSourceWorldId(String sourceWorldId) {
        this.sourceWorldId = sourceWorldId;
    }
    
    public String getForkName() {
        return forkName;
    }
    
    public void setForkName(String forkName) {
        this.forkName = forkName;
    }
}