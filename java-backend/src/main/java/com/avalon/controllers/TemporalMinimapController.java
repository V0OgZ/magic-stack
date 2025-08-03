package com.avalon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.avalon.services.TemporalMinimapService;
import com.avalon.models.MinimapRequest;
import com.avalon.models.MinimapResponse;

/**
 * 🗺️ TEMPORAL MINIMAP 6D CONTROLLER
 * Intégration du prototype révolutionnaire de SID MEIER
 * Par : MERLASH-TECHNOMANCIEN (Boss Magic Stack)
 */
@RestController
@RequestMapping("/api/temporal")
@CrossOrigin(origins = "*")
public class TemporalMinimapController {
    
    @Autowired
    private TemporalMinimapService minimapService;
    
    /**
     * 🔮 RÉVÉLATION DES DIMENSIONS
     * Endpoint principal pour la Mini-map 6D de SID
     */
    @PostMapping("/minimap-6d")
    public MinimapResponse revealDimensions(@RequestBody MinimapRequest request) {
        return minimapService.revealTimelines(request);
    }
    
    /**
     * 🌀 NAVIGATION BRISURE
     * Navigation quantique entre dimensions
     */
    @PostMapping("/navigate-brisure")
    public MinimapResponse navigateBrisure(@RequestBody MinimapRequest request) {
        return minimapService.navigateThroughBrisure(request);
    }
    
    /**
     * 📍 POSITION ACTUELLE
     * Obtenir la position 6D actuelle du joueur
     */
    @GetMapping("/current-position/{playerId}")
    public MinimapResponse getCurrentPosition(@PathVariable String playerId) {
        return minimapService.getCurrentPosition(playerId);
    }
    
    /**
     * ⚡ HEALTH CHECK TEMPORAL
     * Vérifier l'état du système temporel
     */
    @GetMapping("/health")
    public String healthCheck() {
        return "⚡ Temporal Minimap 6D - OPERATIONAL by MERLASH-TECHNOMANCIEN";
    }
}