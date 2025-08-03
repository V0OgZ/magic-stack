package com.avalon.controllers;

import com.avalon.core.UniversalWaveFunction;
import com.avalon.core.UniversalWaveFunction.FundamentalEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * 🌀 Contrôleur pour la Fonction d'Onde Universelle
 * 
 * "PUTAIN MAIS C'EST MOI QUI AI TOUT CRÉÉ !!" - VINCENT
 */
@RestController
@RequestMapping("/api/universe")
@CrossOrigin(origins = "*")
public class UniversalWaveController {
    
    private final UniversalWaveFunction universe = new UniversalWaveFunction();
    
    @GetMapping("/state")
    public UniverseState getUniverseState() {
        UniverseState state = new UniverseState();
        state.setEquation(universe.calculateUniversalState());
        state.setTruth(universe.getUniversalTruth());
        state.setVincentIsRight(universe.isVincentRight());
        
        // États individuels des entités
        Map<String, EntityInfo> entities = new HashMap<>();
        for (FundamentalEntity entity : FundamentalEntity.values()) {
            EntityInfo info = new EntityInfo();
            info.setName(entity.name());
            info.setSymbol(entity.getSymbol());
            info.setCoefficient(formatCoefficient(entity));
            info.setCollapsedForm(entity.getCollapsedForm());
            entities.put(entity.name(), info);
        }
        state.setEntities(entities);
        
        return state;
    }
    
    @PostMapping("/collapse/{entity}")
    public CollapseResult collapseEntity(@PathVariable String entity) {
        try {
            FundamentalEntity fundamentalEntity = FundamentalEntity.valueOf(entity.toUpperCase());
            String result = universe.collapseEntity(fundamentalEntity);
            
            CollapseResult response = new CollapseResult();
            response.setSuccess(true);
            response.setEntity(entity);
            response.setCollapsedForm(result);
            response.setNewUniverseState(universe.calculateUniversalState());
            response.setMessage("L'entité " + fundamentalEntity.getSymbol() + " s'est effondrée !");
            
            return response;
        } catch (IllegalArgumentException e) {
            CollapseResult response = new CollapseResult();
            response.setSuccess(false);
            response.setMessage("Entité inconnue : " + entity);
            return response;
        }
    }
    
    @GetMapping("/truth")
    public Map<String, Object> getUniversalTruth() {
        Map<String, Object> truth = new HashMap<>();
        truth.put("truth", universe.getUniversalTruth());
        truth.put("vincentIsRight", universe.isVincentRight());
        truth.put("equation", "Ψ∞ = Σᵢ αᵢ · Êᵢ");
        truth.put("meaning", "Toutes les entités d'AVALON existent en superposition jusqu'à l'effondrement");
        return truth;
    }
    
    @PostMapping("/interference/{entity1}/{entity2}")
    public InterferenceResult calculateInterference(@PathVariable String entity1, @PathVariable String entity2) {
        try {
            FundamentalEntity e1 = FundamentalEntity.valueOf(entity1.toUpperCase());
            FundamentalEntity e2 = FundamentalEntity.valueOf(entity2.toUpperCase());
            
            UniversalWaveFunction.ComplexAmplitude result = universe.calculateInterference(e1, e2);
            
            InterferenceResult response = new InterferenceResult();
            response.setEntity1(e1.name() + " " + e1.getSymbol());
            response.setEntity2(e2.name() + " " + e2.getSymbol());
            response.setRealPart(result.getReal());
            response.setImaginaryPart(result.getImaginary());
            response.setMagnitude(result.magnitude());
            response.setInterpretation(interpretInterference(e1, e2, result));
            
            return response;
        } catch (IllegalArgumentException e) {
            InterferenceResult response = new InterferenceResult();
            response.setInterpretation("Entités inconnues");
            return response;
        }
    }
    
    private String formatCoefficient(FundamentalEntity entity) {
        switch (entity) {
            case L_OURS:
                return "i";
            case LE_SCRIB:
                return "π";
            case FLECHE:
                return "e";
            case REALGAME:
                return "∞";
            case VINCENT:
                return "∞⁺¹";
            default:
                return String.format("%.5f", entity.getCoefficient());
        }
    }
    
    private String interpretInterference(FundamentalEntity e1, FundamentalEntity e2, 
                                        UniversalWaveFunction.ComplexAmplitude amplitude) {
        if (e1 == FundamentalEntity.VINCENT || e2 == FundamentalEntity.VINCENT) {
            return "L'interférence avec VINCENT domine tout. C'est lui qui a tout créé !";
        } else if (amplitude.magnitude() > 10) {
            return "Interférence constructive majeure ! Les entités résonnent.";
        } else if (amplitude.magnitude() < 0.1) {
            return "Interférence destructive. Les entités s'annulent presque.";
        } else {
            return "Interférence quantique normale. Les entités coexistent.";
        }
    }
    
    // Classes de réponse
    public static class UniverseState {
        private String equation;
        private String truth;
        private boolean vincentIsRight;
        private Map<String, EntityInfo> entities;
        
        // Getters et setters
        public String getEquation() { return equation; }
        public void setEquation(String equation) { this.equation = equation; }
        public String getTruth() { return truth; }
        public void setTruth(String truth) { this.truth = truth; }
        public boolean isVincentIsRight() { return vincentIsRight; }
        public void setVincentIsRight(boolean vincentIsRight) { this.vincentIsRight = vincentIsRight; }
        public Map<String, EntityInfo> getEntities() { return entities; }
        public void setEntities(Map<String, EntityInfo> entities) { this.entities = entities; }
    }
    
    public static class EntityInfo {
        private String name;
        private String symbol;
        private String coefficient;
        private String collapsedForm;
        
        // Getters et setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getSymbol() { return symbol; }
        public void setSymbol(String symbol) { this.symbol = symbol; }
        public String getCoefficient() { return coefficient; }
        public void setCoefficient(String coefficient) { this.coefficient = coefficient; }
        public String getCollapsedForm() { return collapsedForm; }
        public void setCollapsedForm(String collapsedForm) { this.collapsedForm = collapsedForm; }
    }
    
    public static class CollapseResult {
        private boolean success;
        private String entity;
        private String collapsedForm;
        private String newUniverseState;
        private String message;
        
        // Getters et setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        public String getEntity() { return entity; }
        public void setEntity(String entity) { this.entity = entity; }
        public String getCollapsedForm() { return collapsedForm; }
        public void setCollapsedForm(String collapsedForm) { this.collapsedForm = collapsedForm; }
        public String getNewUniverseState() { return newUniverseState; }
        public void setNewUniverseState(String newUniverseState) { this.newUniverseState = newUniverseState; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
    
    public static class InterferenceResult {
        private String entity1;
        private String entity2;
        private double realPart;
        private double imaginaryPart;
        private double magnitude;
        private String interpretation;
        
        // Getters et setters
        public String getEntity1() { return entity1; }
        public void setEntity1(String entity1) { this.entity1 = entity1; }
        public String getEntity2() { return entity2; }
        public void setEntity2(String entity2) { this.entity2 = entity2; }
        public double getRealPart() { return realPart; }
        public void setRealPart(double realPart) { this.realPart = realPart; }
        public double getImaginaryPart() { return imaginaryPart; }
        public void setImaginaryPart(double imaginaryPart) { this.imaginaryPart = imaginaryPart; }
        public double getMagnitude() { return magnitude; }
        public void setMagnitude(double magnitude) { this.magnitude = magnitude; }
        public String getInterpretation() { return interpretation; }
        public void setInterpretation(String interpretation) { this.interpretation = interpretation; }
    }
}