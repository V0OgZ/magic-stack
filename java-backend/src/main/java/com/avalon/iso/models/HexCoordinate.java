package com.avalon.iso.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 🎲 Coordonnées hexagonales (système axial)
 * Utilise le système de coordonnées q,r pour les hexagones
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HexCoordinate {
    private int q; // Colonne
    private int r; // Ligne
    
    /**
     * Calcule la coordonnée s (pour les calculs)
     */
    public int getS() {
        return -q - r;
    }
    
    /**
     * Convertit en coordonnées cubiques
     */
    public CubeCoordinate toCube() {
        return new CubeCoordinate(q, r, getS());
    }
    
    /**
     * Crée une coordonnée depuis des coordonnées cubiques
     */
    public static HexCoordinate fromCube(int x, int y, int z) {
        return new HexCoordinate(x, y);
    }
    
    @Override
    public String toString() {
        return String.format("Hex(%d,%d)", q, r);
    }
    
    /**
     * Coordonnées cubiques pour les calculs
     */
    @Data
    @AllArgsConstructor
    public static class CubeCoordinate {
        private int x;
        private int y; 
        private int z;
    }
}