package com.magicstack.controller;

import com.magicstack.service.ScenarioService;
import com.magicstack.model.ScenarioResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

/**
 * 🎮 SCENARIO CONTROLLER
 * API pour runner les scénarios Magic Stack
 */
@RestController
@RequestMapping("/api/scenario")
@CrossOrigin(origins = "*")
public class ScenarioController {

    @Autowired
    private ScenarioService scenarioService;

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "ONLINE");
        status.put("service", "Simple Scenario Backend");
        status.put("version", "1.0.0");
        status.put("scenarios_available", scenarioService.getAvailableScenarios().size());
        status.put("message", "Ready to run scenarios! 🔮");
        return status;
    }

    @GetMapping("/list")
    public Map<String, Object> listScenarios() {
        return Map.of(
            "scenarios", scenarioService.getAvailableScenarios(),
            "total", scenarioService.getAvailableScenarios().size()
        );
    }

    @PostMapping("/run/{scenarioName}")
    public ScenarioResult runScenario(@PathVariable String scenarioName, 
                                    @RequestBody(required = false) Map<String, Object> params) {
        System.out.println("🎯 Running scenario: " + scenarioName);
        
        if (params != null) {
            System.out.println("📝 Parameters: " + params);
        }
        
        return scenarioService.runScenario(scenarioName, params);
    }

    @PostMapping("/run/quick-test")
    public ScenarioResult runQuickTest() {
        System.out.println("🚀 Running GROFI Quick Test...");
        return scenarioService.runGrofiQuickTest();
    }

    @PostMapping("/run/teleport-test")
    public ScenarioResult runTeleportTest() {
        System.out.println("🌀 Running Teleport Test...");
        return scenarioService.runTeleportTest();
    }

    @PostMapping("/cast")
    public Map<String, Object> castSpell(@RequestBody Map<String, Object> request) {
        String formula = (String) request.get("formula");
        String hero = (String) request.get("hero");
        
        System.out.println("⚡ Casting spell: " + formula + " for hero: " + hero);
        
        // Simulation simple
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("formula", formula);
        result.put("hero", hero);
        result.put("result", "Spell cast successfully! ✨");
        result.put("timestamp", System.currentTimeMillis());
        
        return result;
    }

    @PostMapping("/use-artifact")
    public Map<String, Object> useArtifact(@RequestBody Map<String, Object> artifactData) {
        System.out.println("🪙 Utilisation d'artefact");
        System.out.println("📝 Données: " + artifactData);
        
        try {
            Map<String, Object> result = scenarioService.useArtifact(artifactData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("artifact", result.get("artifact"));
            response.put("effect", result.get("effect"));
            response.put("damage", result.get("damage"));
            response.put("healing", result.get("healing"));
            response.put("narrative", result.get("narrative"));
            response.put("hero_state", result.get("hero_state"));
            response.put("target_affected", result.get("target_affected"));
            
            System.out.println("✅ Artefact utilisé: " + result.get("artifact"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }
}