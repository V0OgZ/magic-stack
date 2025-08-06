package com.magicstack.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
public class OpenApiController {

    @GetMapping("/openapi")
    public ResponseEntity<Map<String, Object>> getOpenApiSpec() {
        Map<String, Object> openapi = new HashMap<>();
        openapi.put("openapi", "3.0.0");
        
        // Info
        Map<String, Object> info = new HashMap<>();
        info.put("title", "Heroes of Time - Java Backend API");
        info.put("version", "1.0.0");
        info.put("description", "☕ Backend Java - Couches 1-3: Strategic Map, Combat TCG, Narrative Interstice");
        openapi.put("info", info);
        
        // Servers
        List<Map<String, Object>> servers = new ArrayList<>();
        Map<String, Object> server = new HashMap<>();
        server.put("url", "http://localhost:8080");
        server.put("description", "Java Backend - Heroes of Time");
        servers.add(server);
        openapi.put("servers", servers);
        
        // Paths
        Map<String, Object> paths = new HashMap<>();
        
        // Health endpoint
        Map<String, Object> healthPath = new HashMap<>();
        Map<String, Object> healthGet = new HashMap<>();
        healthGet.put("summary", "Health Check");
        healthGet.put("description", "Vérification santé du backend Java");
        
        Map<String, Object> healthResponse = new HashMap<>();
        Map<String, Object> response200 = new HashMap<>();
        response200.put("description", "Backend Java opérationnel");
        healthResponse.put("200", response200);
        healthGet.put("responses", healthResponse);
        
        healthPath.put("get", healthGet);
        paths.put("/health", healthPath);
        
        // Spawn Hero endpoint
        Map<String, Object> spawnPath = new HashMap<>();
        Map<String, Object> spawnPost = new HashMap<>();
        spawnPost.put("summary", "🎯 Spawn Hero");
        spawnPost.put("description", "Créer un héros sur la carte stratégique");
        spawnPost.put("tags", Arrays.asList("Strategic Map"));
        
        Map<String, Object> spawnRequest = new HashMap<>();
        Map<String, Object> spawnContent = new HashMap<>();
        Map<String, Object> spawnSchema = new HashMap<>();
        spawnSchema.put("type", "object");
        Map<String, Object> spawnProps = new HashMap<>();
        
        Map<String, Object> heroProp = new HashMap<>();
        heroProp.put("type", "string");
        heroProp.put("example", "Arthas");
        spawnProps.put("hero", heroProp);
        
        Map<String, Object> positionProp = new HashMap<>();
        positionProp.put("type", "object");
        Map<String, Object> posProps = new HashMap<>();
        posProps.put("x", Map.of("type", "number", "example", 0));
        posProps.put("y", Map.of("type", "number", "example", 0));
        posProps.put("z", Map.of("type", "number", "example", 0));
        positionProp.put("properties", posProps);
        spawnProps.put("position", positionProp);
        
        spawnSchema.put("properties", spawnProps);
        spawnContent.put("application/json", Map.of("schema", spawnSchema));
        spawnRequest.put("content", spawnContent);
        spawnPost.put("requestBody", spawnRequest);
        
        Map<String, Object> spawnResponses = new HashMap<>();
        spawnResponses.put("200", Map.of("description", "Héros créé avec succès"));
        spawnPost.put("responses", spawnResponses);
        
        spawnPath.put("post", spawnPost);
        paths.put("/api/scenario/spawn-hero", spawnPath);
        
        // Use Artifact endpoint
        Map<String, Object> artifactPath = new HashMap<>();
        Map<String, Object> artifactPost = new HashMap<>();
        artifactPost.put("summary", "🪙 Use Artifact");
        artifactPost.put("description", "Utiliser un artefact magique");
        artifactPost.put("tags", Arrays.asList("Strategic Map"));
        
        Map<String, Object> artifactRequest = new HashMap<>();
        Map<String, Object> artifactContent = new HashMap<>();
        Map<String, Object> artifactSchema = new HashMap<>();
        artifactSchema.put("type", "object");
        Map<String, Object> artifactProps = new HashMap<>();
        artifactProps.put("hero", Map.of("type", "string", "example", "Arthas"));
        artifactProps.put("artifact", Map.of("type", "string", "example", "excalibur"));
        artifactSchema.put("properties", artifactProps);
        artifactContent.put("application/json", Map.of("schema", artifactSchema));
        artifactRequest.put("content", artifactContent);
        artifactPost.put("requestBody", artifactRequest);
        
        Map<String, Object> artifactResponses = new HashMap<>();
        artifactResponses.put("200", Map.of("description", "Artefact utilisé avec succès"));
        artifactPost.put("responses", artifactResponses);
        
        artifactPath.put("post", artifactPost);
        paths.put("/api/scenario/use-artifact", artifactPath);
        
        // Cast Formula endpoint
        Map<String, Object> formulaPath = new HashMap<>();
        Map<String, Object> formulaPost = new HashMap<>();
        formulaPost.put("summary", "⚡ Cast Formula");
        formulaPost.put("description", "Lancer une formule temporelle");
        formulaPost.put("tags", Arrays.asList("Narrative Interstice"));
        
        Map<String, Object> formulaRequest = new HashMap<>();
        Map<String, Object> formulaContent = new HashMap<>();
        Map<String, Object> formulaSchema = new HashMap<>();
        formulaSchema.put("type", "object");
        Map<String, Object> formulaProps = new HashMap<>();
        formulaProps.put("caster", Map.of("type", "string", "example", "Arthas"));
        formulaProps.put("formula", Map.of("type", "string", "example", "⊙(temps) + †ψ(présent) → ∆t(arrêt)"));
        formulaSchema.put("properties", formulaProps);
        formulaContent.put("application/json", Map.of("schema", formulaSchema));
        formulaRequest.put("content", formulaContent);
        formulaPost.put("requestBody", formulaRequest);
        
        Map<String, Object> formulaResponses = new HashMap<>();
        formulaResponses.put("200", Map.of("description", "Formule lancée avec succès"));
        formulaPost.put("responses", formulaResponses);
        
        formulaPath.put("post", formulaPost);
        paths.put("/api/interstice/cast-formula", formulaPath);
        
        openapi.put("paths", paths);
        
        // Tags
        List<Map<String, Object>> tags = new ArrayList<>();
        tags.add(Map.of("name", "Strategic Map", "description", "🗺️ Couche 1: Gestion héros et carte"));
        tags.add(Map.of("name", "Combat TCG", "description", "⚔️ Couche 2: Système de combat"));
        tags.add(Map.of("name", "Narrative Interstice", "description", "🧠 Couche 3: Événements narratifs"));
        openapi.put("tags", tags);
        
        return ResponseEntity.ok(openapi);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "OK");
        health.put("backend", "java");
        health.put("version", "1.0.0");
        health.put("layers", Arrays.asList("strategic_map", "combat_tcg", "narrative_interstice"));
        health.put("timestamp", java.time.Instant.now().toString());
        return ResponseEntity.ok(health);
    }
}