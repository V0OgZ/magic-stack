package com.magicstack.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feature_logs")
public class FeatureLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String mageId;
    
    @Column(nullable = false)
    private String feature;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private Double x = 0.0;
    
    @Column(nullable = false)
    private Double y = 0.0;
    
    @Column(nullable = false)
    private Double z = 0.0;
    
    @Column(nullable = false)
    private Double t = 0.0; // temps
    
    @Column(nullable = false)
    private Double c = 0.0; // causalité
    
    @Column(nullable = false)
    private Double psi = 0.0; // identité
    
    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
    
    @Column
    private String status = "active";
    
    @Column
    private Double luminosity = 1.0; // pour la visualisation
    
    @Column
    private String color = "#00ff00"; // couleur de la feature

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getMageId() { return mageId; }
    public void setMageId(String mageId) { this.mageId = mageId; }
    
    public String getFeature() { return feature; }
    public void setFeature(String feature) { this.feature = feature; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
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
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Double getLuminosity() { return luminosity; }
    public void setLuminosity(Double luminosity) { this.luminosity = luminosity; }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}