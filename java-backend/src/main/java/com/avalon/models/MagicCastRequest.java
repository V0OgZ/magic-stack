package com.avalon.models;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;

/**
 * 🎯 Requête pour lancer un sort magique unifié
 * Supporte tous les types de formules: Simple, Runique (ψ), JSON
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MagicCastRequest {
    
    @NotBlank(message = "Le type de formule est requis")
    private String formulaType; // "SIMPLE", "RUNIC", "JSON", "GROFI", "TEMPORAL"
    
    @NotBlank(message = "La formule est requise")
    private String formula; // La formule brute à exécuter
    
    private String casterId; // ID du lanceur (héros, entité)
    
    private String targetId; // ID de la cible (optionnel)
    
    private Map<String, Object> parameters; // Paramètres additionnels
    
    private Integer gameId; // ID du jeu (optionnel)
    
    private Integer timeline; // Timeline actuelle (pour le Codex Temporel)
    
    private ComplexAmplitude amplitude; // Amplitude complexe ψ (optionnel)
    
    /**
     * Amplitude complexe pour les formules temporelles
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ComplexAmplitude {
        private double real; // Partie réelle
        private double imaginary; // Partie imaginaire
        
        public double getMagnitude() {
            return Math.sqrt(real * real + imaginary * imaginary);
        }
        
        public double getPhase() {
            return Math.atan2(imaginary, real);
        }
        
        public double getProbability() {
            return getMagnitude() * getMagnitude();
        }
        
        @Override
        public String toString() {
            if (imaginary >= 0) {
                return String.format("%.3f+%.3fi", real, imaginary);
            } else {
                return String.format("%.3f%.3fi", real, imaginary);
            }
        }
    }
}