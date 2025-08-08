package com.magicstack.models;

import java.util.Map;
import java.util.HashMap;

public class IntersticeEntity {
    private String intersticeId;
    private String name;
    private String type;
    private Map<String, Object> data = new HashMap<>();
    
    // Coordonnées 6D
    private Double x = 0.0;
    private Double y = 0.0;
    private Double z = 0.0;
    private Double t = 0.0; // temps
    private Double c = 0.0; // causalité
    private Double psi = 0.0; // identité

    // Getters et Setters
    public String getIntersticeId() { return intersticeId; }
    public void setIntersticeId(String intersticeId) { this.intersticeId = intersticeId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public Map<String, Object> getData() { return data; }
    public void setData(Map<String, Object> data) { this.data = data; }
    
    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }
    
    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }
    
    public Double getZ() { return z; }
    public void setZ(Double z) { this.z = z; }
    
    public Double getT() { return t; }
    public void setT(Double t) { this.t = t; }
    
    public Double getC() { return c; }
    public void setC(Double c) { this.c = c; }
    
    public Double getPsi() { return psi; }
    public void setPsi(Double psi) { this.psi = psi; }
}