package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * 📚 API Documentation Controller
 * Fournit la documentation pour les autres assistants
 */
@RestController
@CrossOrigin(origins = "*")
public class ApiDocController {
    
    @GetMapping("/api")
    public Map<String, Object> getApiDocumentation() {
        Map<String, Object> doc = new HashMap<>();
        
        doc.put("title", "🔮 MAGIC STACK API - 869 Formules Disponibles");
        doc.put("status", "✅ OPÉRATIONNEL");
        doc.put("version", "1.0.0-APOLLO");
        
        // Endpoints principaux
        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("GET /api", "Cette documentation");
        endpoints.put("GET /api/magic/health", "Vérifier que la magie est active");
        endpoints.put("POST /api/magic/cast", "Lancer un sort");
        endpoints.put("POST /api/magic/translate", "Traduire une formule");
        endpoints.put("POST /api/magic/shift", "Décalage temporel");
        endpoints.put("POST /api/magic/fork", "Fork de réalité");
        endpoints.put("POST /api/magic/merge", "Fusion de timelines");
        endpoints.put("GET /api/magic/formulas", "Liste des 869 formules");
        endpoints.put("POST /api/interstice/upload", "Sauvegarder une entité en 6D");
        endpoints.put("POST /api/interstice/download", "Récupérer une entité");
        endpoints.put("POST /api/interstice/search", "Recherche 6D");
        doc.put("endpoints", endpoints);
        
        // Exemple de sort
        Map<String, Object> exemple = new HashMap<>();
        exemple.put("url", "POST http://localhost:8080/api/magic/cast");
        exemple.put("headers", Map.of("Content-Type", "application/json"));
        Map<String, Object> body = new HashMap<>();
        body.put("formula", "fire_ball_temporal");
        body.put("power", 50);
        body.put("targetX", 10);
        body.put("targetY", 20);
        body.put("targetZ", 0);
        exemple.put("body", body);
        doc.put("exemple_sort", exemple);
        
        // Système 6D
        Map<String, String> dimensions = new LinkedHashMap<>();
        dimensions.put("X,Y,Z", "Position spatiale");
        dimensions.put("T", "Temps (timestamp)");
        dimensions.put("C", "Causalité (0-1)");
        dimensions.put("Ψ", "Quantique/Identité (-1 à 1)");
        doc.put("systeme_6D", dimensions);
        
        // Message
        doc.put("message", "Utilisez ces endpoints pour lancer des sorts! Documentation complète: /API_MAGIC_DOCUMENTATION.md");
        doc.put("created_by", "URZ-KÔM pour les assistants magiques");
        
        return doc;
    }
    
    @GetMapping({"/", "/index"})
    public Map<String, String> home() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "🔮 Magic Stack Backend - Utilisez /api pour la documentation");
        response.put("health", "/api/magic/health");
        response.put("documentation", "/api");
        return response;
    }
}