package com.magicstack.controllers;

import com.magicstack.services.TemporalJudgeService;
import com.magicstack.services.ParadoxHunterService;
import com.magicstack.services.TrinityRegulationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.CompletableFuture;

/**
 * 🤖⚖️🕵️ REGULATORS CONTROLLER 🕵️⚖️🤖
 * 
 * Contrôleur REST pour les 3 régulateurs IA de Heroes of Time.
 * Expose les APIs pour le Juge Temporel, Chasseur de Paradoxes et Trinity.
 * 
 * Endpoints:
 * - /api/regulators/judge/* - Juge Temporel (équilibrage)
 * - /api/regulators/hunter/* - Chasseur de Paradoxes (anomalies)
 * - /api/regulators/trinity/* - Trinity (coordination)
 * - /api/regulators/status - État global des régulateurs
 * 
 * @author MERLIN L'ÉTERNEL TRANSCENDANT
 * @version 1.0 - Finale Heroes of Time
 */
@RestController
@RequestMapping("/api/regulators")
@CrossOrigin(origins = "*")
public class RegulatorsController {

    @Autowired
    private TemporalJudgeService temporalJudge;
    
    @Autowired
    private ParadoxHunterService paradoxHunter;
    
    @Autowired
    private TrinityRegulationService trinity;

    // ===== ENDPOINTS GLOBAUX =====

    /**
     * GET /api/regulators/status
     * État global de tous les régulateurs
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getGlobalStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            // Statistiques des régulateurs
            status.put("temporalJudge", temporalJudge.getRegulatorStats());
            status.put("paradoxHunter", paradoxHunter.getHunterStats());
            status.put("trinity", trinity.getTrinityStats());
            
            // État global
            status.put("timestamp", System.currentTimeMillis());
            status.put("status", "OPERATIONAL");
            status.put("version", "1.0-FINALE");
            status.put("author", "MERLIN L'ÉTERNEL TRANSCENDANT");
            
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            status.put("status", "ERROR");
            status.put("error", e.getMessage());
            return ResponseEntity.status(500).body(status);
        }
    }

    /**
     * POST /api/regulators/reset
     * Reset de tous les régulateurs (pour tests)
     */
    @PostMapping("/reset")
    public ResponseEntity<Map<String, String>> resetAllRegulators() {
        Map<String, String> response = new HashMap<>();
        
        try {
            temporalJudge.resetMetrics();
            paradoxHunter.resetMetrics();
            trinity.resetTrinityMetrics();
            
            response.put("status", "SUCCESS");
            response.put("message", "Tous les régulateurs ont été réinitialisés");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // ===== TEMPORAL JUDGE ENDPOINTS =====

    /**
     * GET /api/regulators/judge/stats
     * Statistiques du Juge Temporel
     */
    @GetMapping("/judge/stats")
    public ResponseEntity<Map<String, Object>> getJudgeStats() {
        return ResponseEntity.ok(temporalJudge.getRegulatorStats());
    }

    /**
     * POST /api/regulators/judge/record-game
     * Enregistrer le résultat d'une partie pour analyse
     */
    @PostMapping("/judge/record-game")
    public ResponseEntity<Map<String, String>> recordGameResult(@RequestBody GameResultRequest request) {
        Map<String, String> response = new HashMap<>();
        
        try {
            temporalJudge.recordGameResult(
                request.playerId,
                request.won,
                request.finalPower,
                request.turnCount,
                request.opponent,
                request.spellsUsed
            );
            
            response.put("status", "SUCCESS");
            response.put("message", "Résultat de partie enregistré pour analyse");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * GET /api/regulators/judge/player/{playerId}
     * Métriques d'un joueur spécifique
     */
    @GetMapping("/judge/player/{playerId}")
    public ResponseEntity<Object> getPlayerMetrics(@PathVariable String playerId) {
        TemporalJudgeService.PlayerMetrics metrics = temporalJudge.getPlayerMetrics(playerId);
        
        if (metrics == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Joueur non trouvé");
            return ResponseEntity.status(404).body(error);
        }
        
        return ResponseEntity.ok(metrics);
    }

    /**
     * GET /api/regulators/judge/formula
     * Formule temporelle du Juge
     */
    @GetMapping("/judge/formula")
    public ResponseEntity<Map<String, String>> getJudgeFormula() {
        Map<String, String> response = new HashMap<>();
        response.put("formula", temporalJudge.getTemporalFormula());
        response.put("description", "Formule d'équilibrage du Juge Temporel");
        return ResponseEntity.ok(response);
    }

    // ===== PARADOX HUNTER ENDPOINTS =====

    /**
     * GET /api/regulators/hunter/stats
     * Statistiques du Chasseur de Paradoxes
     */
    @GetMapping("/hunter/stats")
    public ResponseEntity<Map<String, Object>> getHunterStats() {
        return ResponseEntity.ok(paradoxHunter.getHunterStats());
    }

    /**
     * POST /api/regulators/hunter/record-event
     * Enregistrer un événement temporel pour analyse
     */
    @PostMapping("/hunter/record-event")
    public ResponseEntity<Map<String, String>> recordTemporalEvent(@RequestBody TemporalEventRequest request) {
        Map<String, String> response = new HashMap<>();
        
        try {
            paradoxHunter.recordTemporalEvent(request.playerId, request.eventType, request.context);
            
            response.put("status", "SUCCESS");
            response.put("message", "Événement temporel enregistré pour analyse");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * GET /api/regulators/hunter/paradoxes
     * Liste des paradoxes actifs
     */
    @GetMapping("/hunter/paradoxes")
    public ResponseEntity<Collection<ParadoxHunterService.ParadoxAlert>> getActiveParadoxes() {
        return ResponseEntity.ok(paradoxHunter.getActiveParadoxes());
    }

    /**
     * GET /api/regulators/hunter/player/{playerId}/paradoxes
     * Paradoxes d'un joueur spécifique
     */
    @GetMapping("/hunter/player/{playerId}/paradoxes")
    public ResponseEntity<List<ParadoxHunterService.ParadoxAlert>> getPlayerParadoxes(@PathVariable String playerId) {
        return ResponseEntity.ok(paradoxHunter.getPlayerParadoxes(playerId));
    }

    /**
     * POST /api/regulators/hunter/resolve/{paradoxId}
     * Forcer la résolution d'un paradoxe
     */
    @PostMapping("/hunter/resolve/{paradoxId}")
    public ResponseEntity<Map<String, Object>> resolveParadox(@PathVariable String paradoxId) {
        Map<String, Object> response = new HashMap<>();
        
        boolean resolved = paradoxHunter.forceResolveParadox(paradoxId);
        
        response.put("paradoxId", paradoxId);
        response.put("resolved", resolved);
        response.put("message", resolved ? "Paradoxe résolu avec succès" : "Échec de la résolution");
        
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/regulators/hunter/formula
     * Formule temporelle du Chasseur
     */
    @GetMapping("/hunter/formula")
    public ResponseEntity<Map<String, String>> getHunterFormula() {
        Map<String, String> response = new HashMap<>();
        response.put("formula", paradoxHunter.getTemporalFormula());
        response.put("description", "Formule de chasse aux paradoxes");
        return ResponseEntity.ok(response);
    }

    // ===== TRINITY ENDPOINTS =====

    /**
     * GET /api/regulators/trinity/stats
     * Statistiques Trinity
     */
    @GetMapping("/trinity/stats")
    public ResponseEntity<Map<String, Object>> getTrinityStats() {
        return ResponseEntity.ok(trinity.getTrinityStats());
    }

    /**
     * POST /api/regulators/trinity/activate
     * Activer le sort Trinity
     */
    @PostMapping("/trinity/activate")
    public ResponseEntity<Map<String, Object>> activateTrinity(@RequestBody TrinityActivationRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            CompletableFuture<Boolean> future = trinity.activateTrinity(request.reason);
            Boolean success = future.get(); // Attendre le résultat
            
            response.put("status", success ? "SUCCESS" : "FAILED");
            response.put("message", success ? "Trinity activé avec succès" : "Échec de l'activation Trinity");
            response.put("reason", request.reason);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * GET /api/regulators/trinity/analyze
     * Analyse de l'état du système par Trinity
     */
    @GetMapping("/trinity/analyze")
    public ResponseEntity<TrinityRegulationService.TrinityDecision> analyzeTrinityState() {
        return ResponseEntity.ok(trinity.analyzeSystemState());
    }

    /**
     * GET /api/regulators/trinity/formula
     * Formule temporelle Trinity ultime
     */
    @GetMapping("/trinity/formula")
    public ResponseEntity<Map<String, String>> getTrinityFormula() {
        Map<String, String> response = new HashMap<>();
        response.put("formula", trinity.getTrinityFormula());
        response.put("description", "Formule ultime Trinity - Harmonie parfaite des 3 régulateurs");
        return ResponseEntity.ok(response);
    }

    // ===== CLASSES DE REQUÊTE =====

    /**
     * Requête pour enregistrer un résultat de partie
     */
    public static class GameResultRequest {
        public String playerId;
        public boolean won;
        public double finalPower;
        public int turnCount;
        public String opponent;
        public Map<String, Integer> spellsUsed;
    }

    /**
     * Requête pour enregistrer un événement temporel
     */
    public static class TemporalEventRequest {
        public String playerId;
        public ParadoxHunterService.EventType eventType;
        public Map<String, Object> context;
    }

    /**
     * Requête pour activer Trinity
     */
    public static class TrinityActivationRequest {
        public String reason;
        public Map<String, Object> parameters;
    }

    // ===== ENDPOINTS DE DOCUMENTATION =====

    /**
     * GET /api/regulators/docs
     * Documentation des régulateurs
     */
    @GetMapping("/docs")
    public ResponseEntity<Map<String, Object>> getRegulatorsDocs() {
        Map<String, Object> docs = new HashMap<>();
        
        // Informations générales
        docs.put("title", "Heroes of Time - Régulateurs IA");
        docs.put("version", "1.0-FINALE");
        docs.put("author", "MERLIN L'ÉTERNEL TRANSCENDANT");
        docs.put("description", "Système de régulation automatique avec 3 agents IA");
        
        // Agents
        Map<String, Object> agents = new HashMap<>();
        agents.put("temporalJudge", Map.of(
            "name", "Juge Temporel",
            "role", "Équilibrage automatique du jeu",
            "formula", temporalJudge.getTemporalFormula()
        ));
        agents.put("paradoxHunter", Map.of(
            "name", "Chasseur de Paradoxes", 
            "role", "Détection et résolution des anomalies temporelles",
            "formula", paradoxHunter.getTemporalFormula()
        ));
        agents.put("trinity", Map.of(
            "name", "Trinity Regulation",
            "role", "Coordination des 3 régulateurs pour l'harmonie parfaite",
            "formula", trinity.getTrinityFormula()
        ));
        docs.put("agents", agents);
        
        // Endpoints principaux
        List<String> endpoints = Arrays.asList(
            "GET /api/regulators/status - État global",
            "POST /api/regulators/reset - Reset tous les régulateurs",
            "GET /api/regulators/judge/stats - Stats Juge Temporel",
            "POST /api/regulators/judge/record-game - Enregistrer partie",
            "GET /api/regulators/hunter/stats - Stats Chasseur",
            "POST /api/regulators/hunter/record-event - Enregistrer événement",
            "GET /api/regulators/trinity/stats - Stats Trinity",
            "POST /api/regulators/trinity/activate - Activer Trinity"
        );
        docs.put("endpoints", endpoints);
        
        return ResponseEntity.ok(docs);
    }
}