package com.avalon.services.engines;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.controllers.MagicCastController.FormulaInfo;
import com.avalon.services.CausalIntegrityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Component
@Slf4j
@RequiredArgsConstructor
public class GrofiEngine {
    
    private final Map<String, QuantumState> activeStates = new HashMap<>();
    private final Pattern psiPattern = Pattern.compile("ψ(\\d+):\\s*([⊙†])\\s*(?:\\((.*)\\))?");
    
    private final CausalIntegrityService causalIntegrityService;
    private final SimpleFormulaEngine simpleFormulaEngine;

    public MagicCastResponse executeQuantumFormula(MagicCastRequest request) {
        log.info("🌀 GROFI: Exécution formule quantique : {}", request.getFormula());
        
        Matcher matcher = psiPattern.matcher(request.getFormula());
        if (!matcher.find()) {
            return MagicCastResponse.builder().success(false).message("Format de formule quantique invalide").build();
        }
        
        String psiId = "ψ" + matcher.group(1);
        String operator = matcher.group(2);
        String expression = matcher.group(3) != null ? matcher.group(3) : "";
        
        if ("⊙".equals(operator)) {
            return createSuperposition(psiId, expression, request);
        } else if ("†".equals(operator)) {
            return collapseState(psiId, request);
        }
        
        return MagicCastResponse.builder().success(false).message("Opérateur quantique inconnu: " + operator).build();
    }

    private MagicCastResponse createSuperposition(String psiId, String expression, MagicCastRequest request) {
        // Vérifier si la zone est ancrée AVANT de créer la superposition
        String targetCoordinates = (String) request.getParameters().get("coordinates");
        if (targetCoordinates != null && causalIntegrityService.isAnchored(targetCoordinates)) {
            log.info("⚓ Tentative de superposition dans une zone ancrée. Forçage de l'effondrement immédiat.");
            // Si la zone est ancrée, on simule un effondrement direct.
            // On crée un état temporaire juste pour le passer à collapseState.
            QuantumState transientState = new QuantumState();
            transientState.psiId = psiId;
            transientState.expression = expression;
            transientState.state = "SUPERPOSED"; // Il est superposé un instant avant de s'effondrer
            transientState.originalRequest = request;
            activeStates.put(psiId, transientState);
            
            // On utilise une requête d'effondrement pour rester cohérent
            MagicCastRequest collapseRequest = new MagicCastRequest();
            collapseRequest.setFormulaType("RUNIC");
            collapseRequest.setFormula(psiId + ": †");
            collapseRequest.setCasterId(request.getCasterId());

            return collapseState(psiId, collapseRequest);
        }

        QuantumState state = new QuantumState();
        state.psiId = psiId;
        state.expression = expression;
        state.state = "SUPERPOSED";
        state.probability = calculateProbability(request.getAmplitude());
        state.originalRequest = request;
        activeStates.put(psiId, state);

        return MagicCastResponse.builder()
            .success(true)
            .message("État quantique " + psiId + " créé en superposition")
            .quantumState(MagicCastResponse.QuantumState.builder()
                .psiId(psiId)
                .state("SUPERPOSITION")
                .probability(state.probability)
                .expression(expression)
                .build())
            .effects(List.of("QUANTUM_SUPERPOSITION_CREATED"))
            .build();
    }

    private MagicCastResponse collapseState(String psiId, MagicCastRequest collapseRequest) {
        QuantumState existingState = activeStates.get(psiId);
        if (existingState == null || !"SUPERPOSED".equals(existingState.state)) {
            return MagicCastResponse.builder().success(false).message("État quantique " + psiId + " non trouvé ou non superposé").build();
        }

        if (!causalIntegrityService.canCollapse(existingState, collapseRequest.getCasterId())) {
             return MagicCastResponse.builder()
                .success(false)
                .message("CAUSAL_BLOCKING: Les conditions pour l'effondrement de " + psiId + " ne sont pas réunies.")
                .effects(List.of("CAUSAL_BLOCKING"))
                .build();
        }
        
        existingState.state = "COLLAPSED";
        
        MagicCastRequest actionRequest = new MagicCastRequest();
        actionRequest.setFormula(existingState.expression);
        actionRequest.setFormulaType("SIMPLE"); 
        actionRequest.setCasterId(existingState.originalRequest.getCasterId());
        actionRequest.setTargetId(existingState.originalRequest.getTargetId());
        actionRequest.setParameters(existingState.originalRequest.getParameters());

        MagicCastResponse actionResponse = simpleFormulaEngine.execute(actionRequest);
        
        List<String> combinedEffects = new ArrayList<>(actionResponse.getEffects());
        combinedEffects.add("QUANTUM_COLLAPSE_EXECUTED");
        combinedEffects.add("CAUSALITY_ENFORCED");

        return MagicCastResponse.builder()
            .success(true)
            .message("État quantique " + psiId + " effondré. Action exécutée: " + actionResponse.getMessage())
            .quantumState(MagicCastResponse.QuantumState.builder()
                .psiId(psiId)
                .state("COLLAPSED")
                .probability(1.0)
                .expression(existingState.expression)
                .build())
            .effects(combinedEffects)
            .metadata(actionResponse.getMetadata())
            .build();
    }
    
    public MagicCastResponse executeGrofiFormula(MagicCastRequest request) {
        log.info("🌲 GROFI: Exécution formule GROFI native");
        
        if (request.getFormula().contains("FUSION")) {
            return executeFusion(request);
        } else if (request.getFormula().contains("FOREST_THOUGHT")) {
            return executeForestThought(request);
        } else if (request.getFormula().contains("COLLAPSE_OVERRIDE")) {
            return executeCollapseOverride(request);
        }
        
        return MagicCastResponse.builder().success(false).message("Formule GROFI non reconnue").build();
    }

    private MagicCastResponse executeFusion(MagicCastRequest request) {
        return MagicCastResponse.builder()
            .success(true)
            .message("GROFI A FUSIONNÉ AVEC SA FORÊT!")
            .effects(List.of("CONSCIENCE_VEGETALE_DISTRIBUEE", "CROISSANCE_INFINIE"))
            .metadata(Map.of("fusion_type", "FOREST_THOUGHT"))
            .build();
    }

    private MagicCastResponse executeForestThought(MagicCastRequest request) {
        return MagicCastResponse.builder()
            .success(true)
            .message("Pensée forestière activée")
            .effects(List.of("PENSEE_DISTRIBUEE", "MEMOIRE_BOTANIQUE"))
            .build();
    }
    
    private MagicCastResponse executeCollapseOverride(MagicCastRequest request) {
        int restored = 0;
        for (QuantumState state : activeStates.values()) {
            if ("COLLAPSED".equals(state.state)) {
                state.state = "SUPERPOSITION";
                restored++;
            }
        }
        return MagicCastResponse.builder()
            .success(true)
            .message("Collapse Override activé - " + restored + " états restaurés")
            .effects(List.of("COLLAPSE_OVERRIDE", "TIMELINE_PROTECTION"))
            .metadata(Map.of("restored_states", restored))
            .build();
    }
    
    public boolean isActive() { return true; }
    public int getActiveQuantumStates() {
        return (int) activeStates.values().stream().filter(s -> "SUPERPOSED".equals(s.state)).count();
    }
    public QuantumState getQuantumState(String psiId) {
        return activeStates.get(psiId);
    }
    public void clearStates() {
        activeStates.clear();
    }
    
    public List<FormulaInfo> getFormulas() {
        return List.of(
            new FormulaInfo("grofi_fusion", "Fusion Forêt-Pensée", "GROFI", "FUSION(GROFI, FOREST_THOUGHT)", 80, "Fusion avec la conscience végétale"),
            new FormulaInfo("grofi_collapse_override", "Collapse Override", "GROFI", "COLLAPSE_OVERRIDE(all_timelines)", 100, "Annule tout effondrement de timeline"),
            new FormulaInfo("grofi_forest_thought", "Pensée Forestière", "GROFI", "FOREST_THOUGHT(distribute_consciousness)", 60, "Active la conscience distribuée"),
            new FormulaInfo("grofi_quantum_state", "État Quantique", "RUNIC", "ψ001: ⊙(ACTION)", 40, "Crée un état quantique en superposition")
        );
    }

    private double calculateProbability(MagicCastRequest.ComplexAmplitude amplitude) {
        return (amplitude == null) ? 1.0 : amplitude.getProbability();
    }
    
    public static class QuantumState {
        public String psiId;
        public String state;
        public String expression;
        public double probability;
        public MagicCastRequest originalRequest;
    }
}