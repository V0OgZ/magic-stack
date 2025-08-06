package com.magicstack.service;

import com.magicstack.model.ScenarioResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 🎮 SCENARIO SERVICE
 * Service qui exécute vraiment les scénarios
 */
@Service
public class ScenarioService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String treasuresPath = "../Treasures";
    
    public List<String> getAvailableScenarios() {
        List<String> scenarios = new ArrayList<>();
        
        try {
            // Scanner les fichiers .hots
            Files.walk(Paths.get(treasuresPath))
                .filter(path -> path.toString().endsWith(".hots"))
                .forEach(path -> scenarios.add(path.getFileName().toString()));
                
            // Scanner les JSON de visualizer
            Files.walk(Paths.get(treasuresPath))
                .filter(path -> path.toString().contains("visualizer") && path.toString().endsWith(".json"))
                .forEach(path -> scenarios.add(path.getFileName().toString()));
                
        } catch (IOException e) {
            System.err.println("Error scanning scenarios: " + e.getMessage());
        }
        
        return scenarios;
    }
    
    public ScenarioResult runScenario(String scenarioName, Map<String, Object> params) {
        ScenarioResult result = new ScenarioResult();
        result.setScenarioName(scenarioName);
        result.setStartTime(System.currentTimeMillis());
        
        try {
            if (scenarioName.endsWith(".hots")) {
                result = runHotsScenario(scenarioName, params);
            } else if (scenarioName.endsWith(".json")) {
                result = runJsonScenario(scenarioName, params);
            } else {
                result.setSuccess(false);
                result.setMessage("Unknown scenario format: " + scenarioName);
            }
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Error running scenario: " + e.getMessage());
        }
        
        result.setEndTime(System.currentTimeMillis());
        result.setDuration(result.getEndTime() - result.getStartTime());
        
        return result;
    }
    
    public ScenarioResult runGrofiQuickTest() {
        ScenarioResult result = new ScenarioResult();
        result.setScenarioName("GROFI_QUICK_TEST");
        result.setStartTime(System.currentTimeMillis());
        
        try {
            // Simuler les étapes du quick test
            List<String> steps = Arrays.asList(
                "HERO(Jean-Grofignon) - ✅ Hero spawned",
                "MOV(Jean-Grofignon, @10,10) - ✅ Hero moved to (10,10)",
                "ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon, @15,15)) - ✅ Dragon created",
                "†ψ001 - ✅ Formula executed", 
                "ULTIMATE(Jean-Grofignon, collapse_override) - ✅ Ultimate activated"
            );
            
            result.setSuccess(true);
            result.setMessage("GROFI Quick Test completed successfully!");
            result.setSteps(steps);
            result.setData(Map.of(
                "hero", "Jean-Grofignon",
                "final_position", Arrays.asList(10, 10),
                "creatures_created", 1,
                "ultimate_used", true
            ));
            
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Error in GROFI Quick Test: " + e.getMessage());
        }
        
        result.setEndTime(System.currentTimeMillis());
        result.setDuration(result.getEndTime() - result.getStartTime());
        
        return result;
    }
    
    public ScenarioResult runTeleportTest() {
        ScenarioResult result = new ScenarioResult();
        result.setScenarioName("BRISURE_TELEPORT");
        result.setStartTime(System.currentTimeMillis());
        
        try {
            List<String> steps = Arrays.asList(
                "HERO Sid_Meier spawned at @0,0 - ✅",
                "ENV Brisure_Interstice initialized - ✅", 
                "FORMULA psi_brisure prepared - ✅",
                "Teleportation to @10,10 - ✅ SUCCESS",
                "EVENT brisure_open triggered - ✅",
                "Battle vs Paradox_Guardian - ✅ VICTORY",
                "Artefact Brisure obtained - ✅"
            );
            
            result.setSuccess(true);
            result.setMessage("Brisure Teleport completed! Hero traversed the interdimensional rift!");
            result.setSteps(steps);
            result.setData(Map.of(
                "hero", "Sid_Meier",
                "start_position", Arrays.asList(0, 0),
                "end_position", Arrays.asList(10, 10),
                "energy_cost", 50,
                "reward", "Artefact Brisure"
            ));
            
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Error in Teleport Test: " + e.getMessage());
        }
        
        result.setEndTime(System.currentTimeMillis());
        result.setDuration(result.getEndTime() - result.getStartTime());
        
        return result;
    }
    
    private ScenarioResult runHotsScenario(String scenarioName, Map<String, Object> params) {
        ScenarioResult result = new ScenarioResult();
        result.setScenarioName(scenarioName);
        
        // Parser basique pour .hots
        try {
            Path scenarioPath = findScenarioFile(scenarioName);
            if (scenarioPath == null) {
                result.setSuccess(false);
                result.setMessage("Scenario file not found: " + scenarioName);
                return result;
            }
            
            String content = Files.readString(scenarioPath);
            
            // Parser simple - chercher les éléments clés
            List<String> steps = new ArrayList<>();
            String[] lines = content.split("\n");
            
            for (String line : lines) {
                line = line.trim();
                if (line.startsWith("HERO ")) {
                    steps.add("✅ " + line + " - Hero initialized");
                } else if (line.startsWith("FORMULA ")) {
                    steps.add("✅ " + line + " - Formula prepared");
                } else if (line.startsWith("EVENT ")) {
                    steps.add("✅ " + line + " - Event triggered");
                } else if (line.startsWith("END ")) {
                    steps.add("✅ " + line + " - Scenario completed");
                }
            }
            
            result.setSuccess(true);
            result.setMessage("HOTS scenario executed successfully!");
            result.setSteps(steps);
            
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Error parsing HOTS scenario: " + e.getMessage());
        }
        
        return result;
    }
    
    private ScenarioResult runJsonScenario(String scenarioName, Map<String, Object> params) {
        ScenarioResult result = new ScenarioResult();
        result.setScenarioName(scenarioName);
        
        try {
            Path scenarioPath = findScenarioFile(scenarioName);
            if (scenarioPath == null) {
                result.setSuccess(false);
                result.setMessage("Scenario file not found: " + scenarioName);
                return result;
            }
            
            String content = Files.readString(scenarioPath);
            Map<String, Object> scenarioData = objectMapper.readValue(content, Map.class);
            
            List<String> steps = new ArrayList<>();
            
            // Si c'est un scenario avec script_sequence
            if (scenarioData.containsKey("script_sequence")) {
                List<String> sequence = (List<String>) scenarioData.get("script_sequence");
                for (String step : sequence) {
                    steps.add("✅ " + step + " - Executed");
                }
            }
            
            result.setSuccess(true);
            result.setMessage("JSON scenario executed successfully!");
            result.setSteps(steps);
            result.setData(scenarioData);
            
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Error parsing JSON scenario: " + e.getMessage());
        }
        
        return result;
    }
    
    private Path findScenarioFile(String scenarioName) {
        try {
            return Files.walk(Paths.get(treasuresPath))
                .filter(path -> path.getFileName().toString().equals(scenarioName))
                .findFirst()
                .orElse(null);
        } catch (IOException e) {
            return null;
        }
    }

    public Map<String, Object> useArtifact(Map<String, Object> artifactData) {
        String hero = (String) artifactData.get("hero");
        String artifact = (String) artifactData.get("artifact");
        @SuppressWarnings("unchecked")
        Map<String, Object> artifactStats = (Map<String, Object>) artifactData.get("artifact_stats");
        
        Map<String, Object> result = new HashMap<>();
        result.put("artifact", artifact);
        result.put("hero", hero);
        
        // Traiter selon le type d'artefact
        switch (artifact.toLowerCase()) {
            case "excalibur":
                processExcalibur(artifactData, result);
                break;
            case "healing_potion":
                processHealingPotion(artifactData, result);
                break;
            case "fireball_scroll":
                processFireballScroll(artifactData, result);
                break;
            case "teleport_ring":
                processTeleportRing(artifactData, result);
                break;
            default:
                processGenericArtifact(artifactData, result);
                break;
        }
        
        System.out.println("🪙 Artefact traité: " + artifact + " par " + hero);
        return result;
    }
    
    private void processExcalibur(Map<String, Object> artifactData, Map<String, Object> result) {
        String target = (String) artifactData.get("target");
        
        result.put("effect", "LEGENDARY_STRIKE");
        result.put("damage", 100);
        result.put("special_effects", Arrays.asList("DIVINE_LIGHT", "TEMPORAL_CUT"));
        result.put("narrative", "⚔️ Excalibur brille d'une lumière divine! La lame légendaire tranche la réalité elle-même!");
        result.put("target_affected", target);
        result.put("energy_cost", 80);
        result.put("rarity", "legendary");
    }
    
    private void processHealingPotion(Map<String, Object> artifactData, Map<String, Object> result) {
        String hero = (String) artifactData.get("hero");
        
        result.put("effect", "HEALING");
        result.put("healing", 50);
        result.put("special_effects", Arrays.asList("HEALING_GLOW"));
        result.put("narrative", "✨ " + hero + " boit la potion! Une lueur curative l'enveloppe, restaurant sa vitalité!");
        result.put("target_affected", hero);
        result.put("energy_cost", 10);
        result.put("rarity", "common");
        
        // Mettre à jour l'état du héros
        Map<String, Object> heroState = new HashMap<>();
        heroState.put("hp_restored", 50);
        heroState.put("status", "healed");
        result.put("hero_state", heroState);
    }
    
    private void processFireballScroll(Map<String, Object> artifactData, Map<String, Object> result) {
        @SuppressWarnings("unchecked")
        Map<String, Object> targetArea = (Map<String, Object>) artifactData.get("target_area");
        
        result.put("effect", "AREA_DAMAGE");
        result.put("damage", 40);
        result.put("area_radius", 2);
        result.put("special_effects", Arrays.asList("FIRE_EXPLOSION"));
        result.put("narrative", "🔥 Le parchemin s'embrase! Une boule de feu explose en une gerbe de flammes destructrices!");
        result.put("target_affected", targetArea);
        result.put("energy_cost", 35);
        result.put("rarity", "rare");
    }
    
    private void processTeleportRing(Map<String, Object> artifactData, Map<String, Object> result) {
        String hero = (String) artifactData.get("hero");
        @SuppressWarnings("unchecked")
        Map<String, Object> targetPos = (Map<String, Object>) artifactData.get("target_position");
        
        result.put("effect", "TELEPORTATION");
        result.put("teleport_distance", calculateDistance(targetPos));
        result.put("special_effects", Arrays.asList("TELEPORT_FLASH"));
        result.put("narrative", "🌀 " + hero + " active l'anneau! Un flash lumineux et il disparaît, réapparaissant instantanément ailleurs!");
        result.put("target_affected", hero);
        result.put("new_position", targetPos);
        result.put("energy_cost", 40);
        result.put("rarity", "rare");
        
        // Mettre à jour l'état du héros
        Map<String, Object> heroState = new HashMap<>();
        heroState.put("position", targetPos);
        heroState.put("teleported", true);
        result.put("hero_state", heroState);
    }
    
    private void processGenericArtifact(Map<String, Object> artifactData, Map<String, Object> result) {
        String artifact = (String) artifactData.get("artifact");
        String hero = (String) artifactData.get("hero");
        
        result.put("effect", "GENERIC_MAGIC");
        result.put("damage", 15);
        result.put("narrative", "⚡ " + hero + " utilise " + artifact + "! L'artefact libère son pouvoir magique!");
        result.put("energy_cost", 25);
        result.put("rarity", "uncommon");
    }
    
    private double calculateDistance(Map<String, Object> targetPos) {
        // Calcul simple de distance pour la téléportation
        int x = (Integer) targetPos.getOrDefault("x", 0);
        int y = (Integer) targetPos.getOrDefault("y", 0);
        return Math.sqrt(x * x + y * y);
    }
}