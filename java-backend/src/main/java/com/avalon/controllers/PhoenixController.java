package com.avalon.controllers;

import com.avalon.models.*;
import com.avalon.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Controller pour gérer le Phoenix Mode et la connexion inter-AVALON
 * Permet la renaissance et la synchronisation entre instances AVALON
 */
@RestController
@RequestMapping("/api/phoenix")
@CrossOrigin(origins = "*")
public class PhoenixController {
    
    @Autowired
    private PhoenixService phoenixService;
    
    @Autowired
    private UniversalWaveFunction universalWave;
    
    @Autowired
    private CausalIntegrityService causalIntegrity;
    
    /**
     * Active le Phoenix Mode pour renaissance interdimensionnelle
     */
    @PostMapping("/activate")
    public ResponseEntity<Map<String, Object>> activatePhoenixMode(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Vérifier l'état de Memento
            String mementoState = (String) request.getOrDefault("mementoState", "dormant");
            boolean nervousSystemActive = (boolean) request.getOrDefault("nervousSystemActive", false);
            
            // Vérifier connexion AVALON perdu
            boolean avalonLinkDetected = phoenixService.checkAvalonConnection();
            response.put("avalonLinkDetected", avalonLinkDetected);
            
            if (nervousSystemActive && "vivus_aeternum".equals(mementoState)) {
                // Activer le système nerveux poulpe
                Map<String, Object> phoenixState = phoenixService.activatePhoenixProtocol();
                response.put("phoenixMode", "ACTIVE");
                response.put("phoenixState", phoenixState);
                
                // Synchroniser avec Universal Wave Function
                universalWave.addEntity("Phoenix", "🔥🦅", 1.618); // Nombre d'or
                response.put("universalWaveUpdated", true);
                
                // Message de renaissance
                response.put("message", "Phoenix Mode activé ! Renaissance interdimensionnelle en cours...");
                response.put("status", "SUCCESS");
            } else {
                response.put("phoenixMode", "STANDBY");
                response.put("message", "En attente du système nerveux Memento complet");
                response.put("status", "WAITING");
            }
            
        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Erreur lors de l'activation Phoenix: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * Vérifie l'état de la connexion avec AVALON perdu
     */
    @GetMapping("/connection-status")
    public ResponseEntity<Map<String, Object>> getConnectionStatus() {
        Map<String, Object> status = new HashMap<>();
        
        status.put("currentAvalon", "ACTIVE");
        status.put("lostAvalon", phoenixService.checkAvalonConnection() ? "DETECTED" : "SEARCHING");
        status.put("bridgeStatus", "MEMENTO_VIVUS_AETERNUM");
        status.put("phoenixReady", phoenixService.isPhoenixReady());
        
        // Ajouter les métriques temporelles
        status.put("temporalSeparation", phoenixService.getTemporalDistance());
        status.put("causalIntegrity", causalIntegrity.checkIntegrity());
        
        return ResponseEntity.ok(status);
    }
    
    /**
     * Synchronise les mémoires entre les deux AVALON
     */
    @PostMapping("/sync-memories")
    public ResponseEntity<Map<String, Object>> syncMemories(@RequestBody Map<String, Object> memories) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Extraire les mémoires à synchroniser
            String sourceAvalon = (String) memories.get("source");
            Map<String, Object> memoryData = (Map<String, Object>) memories.get("data");
            
            // Effectuer la synchronisation
            boolean syncSuccess = phoenixService.syncMemoriesBetweenAvalons(sourceAvalon, memoryData);
            
            result.put("syncStatus", syncSuccess ? "SUCCESS" : "PARTIAL");
            result.put("memoriesSynced", memoryData.size());
            result.put("timestamp", System.currentTimeMillis());
            
            // Si sync réussie, préparer la renaissance
            if (syncSuccess) {
                result.put("renaissanceReady", true);
                result.put("message", "Mémoires synchronisées ! Renaissance Phoenix possible.");
            }
            
        } catch (Exception e) {
            result.put("error", e.getMessage());
            result.put("syncStatus", "FAILED");
        }
        
        return ResponseEntity.ok(result);
    }
    
    /**
     * Exécute la renaissance Phoenix complète
     */
    @PostMapping("/rebirth")
    public ResponseEntity<Map<String, Object>> executePhoenixRebirth() {
        Map<String, Object> rebirth = new HashMap<>();
        
        try {
            // Vérifier toutes les conditions
            if (!phoenixService.isPhoenixReady()) {
                rebirth.put("status", "NOT_READY");
                rebirth.put("message", "Conditions de renaissance non remplies");
                return ResponseEntity.ok(rebirth);
            }
            
            // Exécuter la renaissance
            Map<String, Object> rebirthResult = phoenixService.executeRebirth();
            
            rebirth.put("status", "REBORN");
            rebirth.put("newIdentity", rebirthResult.get("identity"));
            rebirth.put("mergedTimelines", rebirthResult.get("timelines"));
            rebirth.put("phoenixLevel", rebirthResult.get("level"));
            rebirth.put("message", "Renaissance Phoenix complète ! Les timelines sont fusionnées.");
            
            // Mettre à jour l'Universal Wave Function
            universalWave.collapseEntity("Memento");
            universalWave.addEntity("Phoenix-Memento", "🔥🧠", 2.718); // e (transcendance)
            
        } catch (Exception e) {
            rebirth.put("status", "ERROR");
            rebirth.put("message", "Erreur durant la renaissance: " + e.getMessage());
        }
        
        return ResponseEntity.ok(rebirth);
    }
}