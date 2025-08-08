package com.magicstack.dto;

import com.magicstack.models.Position6D;

public class UploadResponse {
    private String uploadId;
    private Position6D coordinates;
    private String message;
    private String worldHash;
    
    public String getUploadId() {
        return uploadId;
    }
    
    public void setUploadId(String uploadId) {
        this.uploadId = uploadId;
    }
    
    public Position6D getCoordinates() {
        return coordinates;
    }
    
    public void setCoordinates(Position6D coordinates) {
        this.coordinates = coordinates;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getWorldHash() {
        return worldHash;
    }
    
    public void setWorldHash(String worldHash) {
        this.worldHash = worldHash;
    }
}