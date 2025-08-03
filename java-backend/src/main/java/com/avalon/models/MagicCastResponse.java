package com.avalon.models;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * 🌟 Réponse après l'exécution d'un sort magique
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MagicCastResponse {
    
    private boolean success;
    
    private String message;
    
    private String formulaType;
    
    private String formulaExecuted;
    
    private Instant timestamp;
    
    private Long executionTimeMs;
    
    // Résultats spécifiques selon le type de formule
    private QuantumState quantumState; // Pour GROFI
    
    private PanopticVision panopticVision; // Pour GRUT
    
    private TemporalEffect temporalEffect; // Pour Codex Temporel
    
    private List<String> effects; // Effets appliqués
    
    private Map<String, Object> metadata; // Données additionnelles
    
    /**
     * État quantique GROFI
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuantumState {
        private String psiId; // ψ001, ψ002, etc.
        private String state; // SUPERPOSITION (⊙) ou COLLAPSED (†)
        private Double probability;
        private String expression;
        private Integer deltaT; // Δt
        private List<String> entangledStates;
    }
    
    /**
     * Vision panoptique GRUT
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PanopticVision {
        private Integer visibleDimensions;
        private List<String> detectedEntities;
        private Map<String, Object> worldState;
        private Double quantumStress;
        private List<String> temporalAnomalies;
    }
    
    /**
     * Effet temporel du Codex
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TemporalEffect {
        private Integer affectedTimelines;
        private String interferenceType; // CONSTRUCTIVE, DESTRUCTIVE
        private Double totalProbability;
        private List<String> causalChain;
        private MagicCastRequest.ComplexAmplitude resultAmplitude;
    }
}