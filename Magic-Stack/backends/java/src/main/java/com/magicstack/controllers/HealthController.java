package com.magicstack.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
public class HealthController {
    
    @GetMapping("/api/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "magic-stack-backend");
        response.put("version", "1.0.0-APOLLO");
        response.put("timestamp", java.time.Instant.now().toString());
        return response;
    }
    
    @GetMapping("/api/status")
    public Map<String, Object> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "ONLINE");
        response.put("service", "Magic Stack Backend");
        response.put("endpoints", Map.of(
            "health", "/api/health",
            "status", "/api/status", 
            "interstice", "/api/interstice/*",
            "magic", "/api/magic/*"
        ));
        response.put("uptime", System.currentTimeMillis());
        return response;
    }
    
    @GetMapping("/")
    public String root() {
        return "🔮 Magic Stack Backend - ONLINE ✨\n" +
               "📍 Endpoints disponibles:\n" +
               "  - GET /api/health\n" +
               "  - GET /api/status\n" +
               "  - POST /api/interstice/*\n" +
               "  - POST /api/magic/*\n";
    }
}