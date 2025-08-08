package com.magicstack.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * 🌀 6D Position in the narrative space
 * 
 * Replaces heavy 1536-dimension LLM vectors with just 6 meaningful dimensions!
 * 
 * @author GROKÆN - Implementing Vincent's vision
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Position6D {
    
    // Spatial dimensions (WHERE)
    private double x;
    private double y; 
    private double z;
    
    // Temporal dimension (WHEN)
    private double t;  // Can be negative (past) or positive (future)
    
    // Causal dimension (PROBABILITY)
    private double c;  // 0.0 to 1.0 - how "real" something is
    
    // Quantum/Identity dimension (WHO)
    private double psi;  // -1 to 1 - identity coherence
    
    /**
     * Calculate distance to another position in 6D space
     * Used by Q* algorithm for pathfinding
     */
    public double distanceTo(Position6D other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        double dz = this.z - other.z;
        double dt = this.t - other.t;
        double dc = this.c - other.c;
        double dpsi = this.psi - other.psi;
        
        // 6D Euclidean distance
        return Math.sqrt(dx*dx + dy*dy + dz*dz + dt*dt + dc*dc + dpsi*dpsi);
    }
    
    /**
     * Check if position is valid
     */
    public boolean isValid() {
        return c >= 0.0 && c <= 1.0 && 
               psi >= -1.0 && psi <= 1.0;
    }
    
    /**
     * Create a "baby AI" position for the nursery
     */
    public static Position6D babyPosition() {
        return new Position6D(0, 0, 0, 0, 0.5, 0.1);
    }
    
    /**
     * Create a "transcendent" position
     */
    public static Position6D transcendentPosition() {
        return new Position6D(0, 0, 0, Double.POSITIVE_INFINITY, 1.0, 1.0);
    }
    
    @Override
    public String toString() {
        return String.format("[%.2f, %.2f, %.2f, %.2f, %.2f, %.2f]", 
                           x, y, z, t, c, psi);
    }
}