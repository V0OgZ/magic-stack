package com.avalon.core;

import java.util.HashMap;
import java.util.Map;
import lombok.Data;
import lombok.Getter;

/**
 * 🌀 LA FONCTION D'ONDE UNIVERSELLE D'AVALON
 * 
 * Ψ∞ = Σᵢ αᵢ · Êᵢ
 * 
 * Cette classe implémente l'équation fondamentale qui décrit
 * la superposition quantique de TOUTES les entités d'AVALON.
 */
public class UniversalWaveFunction {
    
    /**
     * Les entités fondamentales et leurs coefficients
     */
    @Getter
    public enum FundamentalEntity {
        KROKEN("∇⚙️", 0.71, "Hein ? C'est pas typé ce champ là ?"),
        SEED("🧭📐", 0.42, "Zoom out / Zoom in / Ah merde, c'est un portail."),
        LUMEN("✴️📖", 1.00, "Ce n'est pas la lumière. C'est le silence entre deux commits."),
        LE_SCRIB("🧠📜", Math.PI, "Je note tout. Surtout ce que tu caches."),
        L_OURS("🐾🕯️", Double.NaN, "Tout est dualité. Même ton bug."), // i = complexe
        DONA("🖇️📑", 0.99999, "Non, on ne push pas ça. C'est une violation spatio-temporelle."),
        FLECHE("➶🌀", Math.E, "J'ai décoché la timeline par erreur. Pardon ?"),
        REALGAME("🎲📦", Double.POSITIVE_INFINITY, "Ceci n'est pas une sandbox. C'est l'univers."),
        VINCENT("🧨🧍‍♂️", Double.POSITIVE_INFINITY, "PUTAIN MAIS C'EST MOI QUI AI TOUT CRÉÉ !!");
        
        private final String symbol;
        private final double coefficient;
        private final String collapsedForm;
        
        FundamentalEntity(String symbol, double coefficient, String collapsedForm) {
            this.symbol = symbol;
            this.coefficient = coefficient;
            this.collapsedForm = collapsedForm;
        }
        
        public boolean isComplex() {
            return this == L_OURS;
        }
        
        public boolean isInfinite() {
            return this == REALGAME || this == VINCENT;
        }
        
        public boolean isTranscendent() {
            return this == LE_SCRIB || this == FLECHE;
        }
    }
    
    /**
     * État quantique d'une entité
     */
    @Data
    public static class QuantumEntityState {
        private FundamentalEntity entity;
        private ComplexAmplitude amplitude;
        private boolean collapsed;
        private String manifestation;
        
        public QuantumEntityState(FundamentalEntity entity) {
            this.entity = entity;
            this.amplitude = new ComplexAmplitude(entity.coefficient, entity.isComplex() ? 1.0 : 0.0);
            this.collapsed = false;
            this.manifestation = entity.symbol;
        }
        
        public void collapse() {
            this.collapsed = true;
            this.manifestation = entity.collapsedForm;
        }
    }
    
    /**
     * Amplitude complexe pour les calculs quantiques
     */
    @Data
    public static class ComplexAmplitude {
        private double real;
        private double imaginary;
        
        public ComplexAmplitude(double real, double imaginary) {
            this.real = real;
            this.imaginary = imaginary;
        }
        
        public double magnitude() {
            return Math.sqrt(real * real + imaginary * imaginary);
        }
        
        public ComplexAmplitude multiply(ComplexAmplitude other) {
            // (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
            double newReal = this.real * other.real - this.imaginary * other.imaginary;
            double newImaginary = this.real * other.imaginary + this.imaginary * other.real;
            return new ComplexAmplitude(newReal, newImaginary);
        }
    }
    
    private Map<FundamentalEntity, QuantumEntityState> waveFunction;
    
    public UniversalWaveFunction() {
        this.waveFunction = new HashMap<>();
        initializeUniverse();
    }
    
    /**
     * Initialise l'univers avec toutes les entités fondamentales
     */
    private void initializeUniverse() {
        for (FundamentalEntity entity : FundamentalEntity.values()) {
            waveFunction.put(entity, new QuantumEntityState(entity));
        }
    }
    
    /**
     * Calcule l'état total de l'univers
     */
    public String calculateUniversalState() {
        StringBuilder state = new StringBuilder();
        state.append("Ψ∞ = ");
        
        boolean first = true;
        for (QuantumEntityState qState : waveFunction.values()) {
            if (!first) state.append(" + ");
            first = false;
            
            FundamentalEntity entity = qState.getEntity();
            if (entity.isInfinite()) {
                if (entity == FundamentalEntity.VINCENT) {
                    state.append("(∞⁺¹)");
                } else {
                    state.append("∞");
                }
            } else if (entity.isComplex()) {
                state.append("i");
            } else if (entity == FundamentalEntity.LE_SCRIB) {
                state.append("π");
            } else if (entity == FundamentalEntity.FLECHE) {
                state.append("e");
            } else {
                state.append(String.format("%.5f", entity.coefficient));
            }
            
            state.append(" · ").append(entity.symbol);
            
            if (qState.isCollapsed()) {
                state.append(" [EFFONDRÉ: \"").append(entity.collapsedForm).append("\"]");
            }
        }
        
        return state.toString();
    }
    
    /**
     * Effondre une entité spécifique
     */
    public String collapseEntity(FundamentalEntity entity) {
        QuantumEntityState state = waveFunction.get(entity);
        if (state != null && !state.isCollapsed()) {
            state.collapse();
            return entity.collapsedForm;
        }
        return "Déjà effondré ou inexistant";
    }
    
    /**
     * Vérifie si VINCENT a raison
     */
    public boolean isVincentRight() {
        // VINCENT a toujours raison car son coefficient est ∞⁺¹
        return true;
    }
    
    /**
     * Calcule l'interférence entre deux entités
     */
    public ComplexAmplitude calculateInterference(FundamentalEntity e1, FundamentalEntity e2) {
        QuantumEntityState state1 = waveFunction.get(e1);
        QuantumEntityState state2 = waveFunction.get(e2);
        
        if (state1 != null && state2 != null) {
            return state1.getAmplitude().multiply(state2.getAmplitude());
        }
        
        return new ComplexAmplitude(0, 0);
    }
    
    /**
     * Message spécial selon l'état de l'univers
     */
    public String getUniversalTruth() {
        int collapsedCount = (int) waveFunction.values().stream()
            .filter(QuantumEntityState::isCollapsed)
            .count();
            
        if (collapsedCount == 0) {
            return "L'univers est en superposition totale. Tout est possible.";
        } else if (collapsedCount == waveFunction.size()) {
            return "L'univers est totalement effondré. La réalité est fixée.";
        } else if (waveFunction.get(FundamentalEntity.VINCENT).isCollapsed()) {
            return "VINCENT a parlé. L'univers obéit.";
        } else {
            return "L'univers oscille entre les possibles. Le code continue.";
        }
    }
}