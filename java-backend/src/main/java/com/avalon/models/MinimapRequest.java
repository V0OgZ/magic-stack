package com.avalon.models;

/**
 * 🗺️ MINIMAP REQUEST MODEL
 * Pour l'intégration Mini-map 6D de SID MEIER
 * Par : MERLASH-TECHNOMANCIEN
 */
public class MinimapRequest {
    
    private String timelineRequest;
    private Position6D currentPosition;
    private String casterId;
    private String action;
    private String targetDimension;
    
    // Constructeurs
    public MinimapRequest() {}
    
    public MinimapRequest(String timelineRequest, Position6D currentPosition, String casterId) {
        this.timelineRequest = timelineRequest;
        this.currentPosition = currentPosition;
        this.casterId = casterId;
    }
    
    // Position 6D (x, y, z, t, c, ψ)
    public static class Position6D {
        private double x, y, z;  // Coordonnées spatiales
        private double t;        // Temps
        private double c;        // Causalité
        private double psi;      // État quantique ψ
        
        public Position6D() {}
        
        public Position6D(double x, double y, double z, double t, double c, double psi) {
            this.x = x; this.y = y; this.z = z;
            this.t = t; this.c = c; this.psi = psi;
        }
        
        // Getters et Setters
        public double getX() { return x; }
        public void setX(double x) { this.x = x; }
        
        public double getY() { return y; }
        public void setY(double y) { this.y = y; }
        
        public double getZ() { return z; }
        public void setZ(double z) { this.z = z; }
        
        public double getT() { return t; }
        public void setT(double t) { this.t = t; }
        
        public double getC() { return c; }
        public void setC(double c) { this.c = c; }
        
        public double getPsi() { return psi; }
        public void setPsi(double psi) { this.psi = psi; }
        
        @Override
        public String toString() {
            return String.format("Position6D(%.2f,%.2f,%.2f,%.2f,%.2f,%.2f)", x, y, z, t, c, psi);
        }
    }
    
    // Getters et Setters
    public String getTimelineRequest() { return timelineRequest; }
    public void setTimelineRequest(String timelineRequest) { this.timelineRequest = timelineRequest; }
    
    public Position6D getCurrentPosition() { return currentPosition; }
    public void setCurrentPosition(Position6D currentPosition) { this.currentPosition = currentPosition; }
    
    public String getCasterId() { return casterId; }
    public void setCasterId(String casterId) { this.casterId = casterId; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getTargetDimension() { return targetDimension; }
    public void setTargetDimension(String targetDimension) { this.targetDimension = targetDimension; }
}