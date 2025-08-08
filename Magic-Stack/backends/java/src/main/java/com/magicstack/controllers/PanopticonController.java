package com.magicstack.controllers;

import com.magicstack.models.FeatureLog;
import com.magicstack.models.IntersticeEntity;
import com.magicstack.services.IntersticeService;
import com.magicstack.services.FeatureLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/panopticon")
@CrossOrigin(origins = "*")
public class PanopticonController {
    
    @Autowired
    private IntersticeService intersticeService;
    
    @Autowired
    private FeatureLogService featureLogService;
    
    @GetMapping("/world-state-graph")
    public ResponseEntity<Map<String, Object>> getWorldStateGraph() {
        Map<String, Object> wsg = new HashMap<>();
        
        // Récupérer toutes les entités depuis l'interstice
        List<IntersticeEntity> entities = intersticeService.getAllEntities();
        
        // Construire les nodes
        List<Map<String, Object>> nodes = new ArrayList<>();
        for (IntersticeEntity entity : entities) {
            Map<String, Object> node = new HashMap<>();
            node.put("id", entity.getIntersticeId());
            node.put("name", entity.getName());
            node.put("type", entity.getType());
            node.put("dimension", getDimensionForType(entity.getType()));
            node.put("x", entity.getX());
            node.put("y", entity.getY());
            node.put("z", entity.getZ());
            node.put("t", entity.getT());
            node.put("c", entity.getC());
            node.put("psi", entity.getPsi());
            node.put("luminosity", 1.0);
            nodes.add(node);
        }
        
        // Ajouter les feature logs comme nodes temporaires lumineux
        List<FeatureLog> recentFeatures = featureLogService.getRecentFeatures(10);
        for (FeatureLog feature : recentFeatures) {
            Map<String, Object> node = new HashMap<>();
            node.put("id", "feature_" + feature.getId());
            node.put("name", feature.getFeature());
            node.put("type", "FEATURE");
            node.put("dimension", "ACTIVE");
            node.put("x", feature.getX());
            node.put("y", feature.getY());
            node.put("z", feature.getZ());
            node.put("luminosity", feature.getLuminosity());
            node.put("color", feature.getColor());
            node.put("mageId", feature.getMageId());
            nodes.add(node);
        }
        
        wsg.put("nodes", nodes);
        
        // Construire les edges (connexions entre entités)
        List<Map<String, Object>> edges = new ArrayList<>();
        // Pour l'instant, connecter chaque feature à son mage
        for (FeatureLog feature : recentFeatures) {
            Map<String, Object> edge = new HashMap<>();
            edge.put("from", feature.getMageId());
            edge.put("to", "feature_" + feature.getId());
            edge.put("type", "CREATES");
            edge.put("strength", feature.getLuminosity());
            edges.add(edge);
        }
        
        wsg.put("edges", edges);
        
        // Dimensions
        Map<String, Map<String, Object>> dimensions = new HashMap<>();
        dimensions.put("SPATIALE", Map.of("color", "#00ff00"));
        dimensions.put("TEMPORELLE", Map.of("color", "#0066ff"));
        dimensions.put("CAUSALE", Map.of("color", "#ff6600"));
        dimensions.put("QUANTIQUE", Map.of("color", "#ff00ff"));
        dimensions.put("IDENTITAIRE", Map.of("color", "#ffff00"));
        dimensions.put("NARRATIVE", Map.of("color", "#00ffff"));
        dimensions.put("ACTIVE", Map.of("color", "#ffffff")); // Features actives
        
        wsg.put("dimensions", dimensions);
        
        return ResponseEntity.ok(wsg);
    }
    
    @PostMapping("/feature-log")
    public ResponseEntity<FeatureLog> logFeature(@RequestBody FeatureLog featureLog) {
        FeatureLog saved = featureLogService.logFeature(featureLog);
        return ResponseEntity.ok(saved);
    }
    
    @GetMapping("/feature-logs/{mageId}")
    public ResponseEntity<List<FeatureLog>> getFeatureLogs(@PathVariable String mageId) {
        List<FeatureLog> logs = featureLogService.getFeaturesByMage(mageId);
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/feature-logs")
    public ResponseEntity<List<FeatureLog>> getAllFeatureLogs(
            @RequestParam(defaultValue = "20") int limit) {
        List<FeatureLog> logs = featureLogService.getRecentFeatures(limit);
        return ResponseEntity.ok(logs);
    }
    
    private String getDimensionForType(String type) {
        switch (type) {
            case "MAGE":
            case "GUARDIAN":
                return "SPATIALE";
            case "SPELL":
                return "CAUSALE";
            case "MEMORY":
                return "TEMPORELLE";
            case "ENTITY":
                return "IDENTITAIRE";
            default:
                return "QUANTIQUE";
        }
    }
}