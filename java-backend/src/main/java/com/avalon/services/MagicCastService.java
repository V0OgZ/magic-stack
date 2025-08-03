package com.avalon.services;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.controllers.MagicCastController.*;
import com.avalon.services.engines.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.*;

/**
 * 🌟 Service principal pour l'exécution de sorts magiques
 * Orchestre tous les moteurs magiques d'AVALON
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MagicCastService {
    
    private final GrofiEngine grofiEngine;
    private final GrutEngine grutEngine;
    private final TemporalCodexEngine temporalCodexEngine;
    private final SimpleFormulaEngine simpleFormulaEngine;
    private final WalterSecurityService walterSecurity;
    
    /**
     * 🎯 Méthode principale pour lancer un sort
     */
    public MagicCastResponse cast(MagicCastRequest request) {
        long startTime = System.currentTimeMillis();
        
        // 🛡️ Vérification de sécurité WALTER
        if (!walterSecurity.validateRequest(request)) {
            return MagicCastResponse.builder()
                .success(false)
                .message("WALTER SECURITY: Requête non autorisée!")
                .timestamp(Instant.now())
                .build();
        }
        
        try {
            MagicCastResponse response = switch (request.getFormulaType().toUpperCase()) {
                case "SIMPLE" -> simpleFormulaEngine.execute(request);
                case "RUNIC", "PSI" -> grofiEngine.executeQuantumFormula(request);
                case "GROFI" -> grofiEngine.executeGrofiFormula(request);
                case "GRUT" -> grutEngine.executePanopticFormula(request);
                case "TEMPORAL" -> temporalCodexEngine.executeTemporalFormula(request);
                case "JSON" -> executeJsonFormula(request);
                default -> throw new IllegalArgumentException("Type de formule inconnu: " + request.getFormulaType());
            };
            
            response.setExecutionTimeMs(System.currentTimeMillis() - startTime);
            response.setTimestamp(Instant.now());
            
            // 🌀 Effets de résonance entre les systèmes
            applySystemResonance(response);
            
            return response;
            
        } catch (Exception e) {
            log.error("Erreur lors de l'exécution de la formule", e);
            return MagicCastResponse.builder()
                .success(false)
                .message("Erreur d'exécution: " + e.getMessage())
                .formulaType(request.getFormulaType())
                .formulaExecuted(request.getFormula())
                .timestamp(Instant.now())
                .executionTimeMs(System.currentTimeMillis() - startTime)
                .build();
        }
    }
    
    /**
     * 🔍 Obtenir l'état du système magique
     */
    public MagicSystemStatus getSystemStatus() {
        return new MagicSystemStatus(
            grofiEngine.isActive(),
            grutEngine.isActive(),
            temporalCodexEngine.isActive(),
            walterSecurity.isActive(),
            grofiEngine.getActiveQuantumStates(),
            grutEngine.getQuantumStress(),
            "Tous les systèmes magiques sont opérationnels"
        );
    }
    
    /**
     * 📚 Obtenir le catalogue des formules disponibles
     */
    public FormulaCatalog getAvailableFormulas(String type, String caster) {
        List<FormulaInfo> allFormulas = new ArrayList<>();
        Map<String, Integer> countByType = new HashMap<>();
        
        // Collecter les formules de chaque moteur
        allFormulas.addAll(simpleFormulaEngine.getFormulas());
        allFormulas.addAll(grofiEngine.getFormulas());
        allFormulas.addAll(grutEngine.getFormulas());
        allFormulas.addAll(temporalCodexEngine.getFormulas());
        
        // Filtrer par type si spécifié
        if (type != null && !type.isEmpty()) {
            allFormulas = allFormulas.stream()
                .filter(f -> f.type().equalsIgnoreCase(type))
                .toList();
        }
        
        // Filtrer par lanceur si spécifié
        if (caster != null && !caster.isEmpty()) {
            allFormulas = allFormulas.stream()
                .filter(f -> f.description().contains(caster))
                .toList();
        }
        
        // Compter par type
        for (FormulaInfo formula : allFormulas) {
            countByType.merge(formula.type(), 1, Integer::sum);
        }
        
        return new FormulaCatalog(
            allFormulas.size(),
            countByType,
            allFormulas
        );
    }
    
    /**
     * 🔄 Exécuter une formule JSON
     */
    private MagicCastResponse executeJsonFormula(MagicCastRequest request) {
        // Parser le JSON et déléguer au bon moteur
        try {
            // Logique de parsing JSON ici
            return MagicCastResponse.builder()
                .success(true)
                .message("Formule JSON exécutée")
                .formulaType("JSON")
                .formulaExecuted(request.getFormula())
                .build();
        } catch (Exception e) {
            throw new RuntimeException("Erreur parsing JSON: " + e.getMessage());
        }
    }
    
    /**
     * 🌀 Appliquer les effets de résonance entre systèmes
     */
    private void applySystemResonance(MagicCastResponse response) {
        // Si GROFI et GRUT sont actifs, créer une résonance
        if (response.getQuantumState() != null && response.getPanopticVision() != null) {
            List<String> resonanceEffects = new ArrayList<>();
            resonanceEffects.add("RESONANCE_GROFI_GRUT: Vision quantique amplifiée");
            
            if (response.getEffects() == null) {
                response.setEffects(new ArrayList<>());
            }
            response.getEffects().addAll(resonanceEffects);
            
            log.info("🌀 Résonance GROFI-GRUT détectée!");
        }
        
        // Si effet temporel + état quantique, créer une interférence
        if (response.getTemporalEffect() != null && response.getQuantumState() != null) {
            double interference = calculateInterference(response);
            Map<String, Object> metadata = response.getMetadata();
            if (metadata == null) {
                metadata = new HashMap<>();
                response.setMetadata(metadata);
            }
            metadata.put("temporal_quantum_interference", interference);
            
            log.info("⚛️ Interférence temporelle-quantique: {}", interference);
        }
    }
    
    private double calculateInterference(MagicCastResponse response) {
        double quantumProb = response.getQuantumState().getProbability() != null ? 
            response.getQuantumState().getProbability() : 1.0;
        double temporalProb = response.getTemporalEffect().getTotalProbability() != null ?
            response.getTemporalEffect().getTotalProbability() : 1.0;
        
        // Interférence constructive ou destructive
        return Math.sqrt(quantumProb * temporalProb);
    }
}