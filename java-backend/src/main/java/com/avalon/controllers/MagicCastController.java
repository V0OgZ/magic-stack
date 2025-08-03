package com.avalon.controllers;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.services.MagicCastService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

/**
 * 🎯 Contrôleur principal pour le lancement de sorts magiques
 * Point d'entrée unifié pour toute la magie d'AVALON
 */
@RestController
@RequestMapping("/api/magic")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class MagicCastController {
    
    private final MagicCastService magicCastService;
    
    /**
     * 🌀 Endpoint principal pour lancer un sort
     */
    @PostMapping("/cast")
    public ResponseEntity<MagicCastResponse> castSpell(@Valid @RequestBody MagicCastRequest request) {
        log.info("🎯 Lancement de sort: type={}, formula={}", request.getFormulaType(), request.getFormula());
        
        try {
            MagicCastResponse response = magicCastService.cast(request);
            
            if (response.isSuccess()) {
                log.info("✅ Sort lancé avec succès: {}", response.getMessage());
                return ResponseEntity.ok(response);
            } else {
                log.warn("⚠️ Échec du sort: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("💥 Erreur lors du lancement du sort", e);
            return ResponseEntity.internalServerError()
                .body(MagicCastResponse.builder()
                    .success(false)
                    .message("Erreur critique: " + e.getMessage())
                    .build());
        }
    }
    
    /**
     * 🔍 Vérifier l'état du système magique
     */
    @GetMapping("/status")
    public ResponseEntity<MagicSystemStatus> getStatus() {
        return ResponseEntity.ok(magicCastService.getSystemStatus());
    }
    
    /**
     * 📚 Lister toutes les formules disponibles
     */
    @GetMapping("/formulas")
    public ResponseEntity<FormulaCatalog> getFormulas(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String caster) {
        return ResponseEntity.ok(magicCastService.getAvailableFormulas(type, caster));
    }
    
    /**
     * État du système magique
     */
    public record MagicSystemStatus(
        boolean grofiActive,
        boolean grutActive,
        boolean temporalCodexActive,
        boolean walterSecurityActive,
        int activeQuantumStates,
        double systemQuantumStress,
        String message
    ) {}
    
    /**
     * Catalogue des formules
     */
    public record FormulaCatalog(
        int totalFormulas,
        java.util.Map<String, Integer> formulasByType,
        java.util.List<FormulaInfo> formulas
    ) {}
    
    public record FormulaInfo(
        String id,
        String name,
        String type,
        String formula,
        int manaCost,
        String description
    ) {}
}