package com.magicstack.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * 🌀⚡ NON-EUCLIDEAN GEOMETRY SERVICE ⚡🌀
 * 
 * Implémentation des transformations géométriques impossibles
 * Crédit au Mage Géométrique pour ses formules révolutionnaires !
 */
@Service
@Slf4j
public class NonEuclideanService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String SPELLS_PATH = "grimoire/sorts_geometrie_non_euclidienne/";

    /**
     * 📜 Charge un sort depuis le grimoire du Mage Géométrique
     */
    public JsonNode loadSpell(String spellName) throws IOException {
        String filePath = SPELLS_PATH + spellName + ".json";
        File spellFile = new File(filePath);
        
        if (!spellFile.exists()) {
            throw new IOException("Spell not found: " + spellName + " (Path: " + filePath + ")");
        }
        
        log.info("📜 Loading spell from Geometric Mage's grimoire: " + spellName);
        return objectMapper.readTree(spellFile);
    }

    /**
     * 🌀 Klein Bottle Reality - Transformation topologique impossible
     */
    public Map<String, Object> transformToKleinBottle(Map<String, Object> request, JsonNode spellData) {
        log.info("🌀 Executing Klein Bottle transformation...");
        
        // Extraire les paramètres de la requête
        Map<String, Object> targetArea = (Map<String, Object>) request.get("target_area");
        Integer duration = (Integer) request.getOrDefault("duration", 60);
        
        // Générer la transformation Klein Bottle
        Map<String, Object> transformation = new HashMap<>();
        transformation.put("topology", "klein_bottle");
        transformation.put("self_intersection", true);
        transformation.put("dimension_folding", 4);
        
        // Effets visuels
        Map<String, Object> visualEffects = new HashMap<>();
        visualEffects.put("shader", "klein_bottle_projection");
        visualEffects.put("particles", "mobius_flow");
        visualEffects.put("transparency", "dynamic_based_on_angle");
        
        // Mécaniques de jeu
        Map<String, Object> gameplay = new HashMap<>();
        gameplay.put("gravity_reversal_zones", generateGravityZones(targetArea));
        gameplay.put("portal_auto_generation", generateAutoPortals(targetArea));
        gameplay.put("inside_outside_confusion", true);
        
        // Coût du sort
        Map<String, Object> cost = new HashMap<>();
        cost.put("mana", 300);
        cost.put("paradox_tokens", 3);
        cost.put("sanity_check", -20);
        
        return Map.of(
            "success", true,
            "spell", "Klein Bottle Reality",
            "credit", "🌀 Geometric Mage's Creation",
            "duration", duration,
            "transformation", transformation,
            "visual_effects", visualEffects,
            "gameplay_effects", gameplay,
            "cost_applied", cost,
            "message", "Reality has folded into itself! Inside is outside!"
        );
    }

    /**
     * ♾️ Möbius Battlefield - Surface twistée continue
     */
    public Map<String, Object> createMobiusBattlefield(Map<String, Object> request, JsonNode spellData) {
        log.info("♾️ Creating Möbius Battlefield...");
        
        Map<String, Object> targetArea = (Map<String, Object>) request.get("target_area");
        Integer width = (Integer) request.getOrDefault("width", 100);
        Integer height = (Integer) request.getOrDefault("height", 20);
        
        // Générer la surface de Möbius
        List<Map<String, Object>> mobiusSurface = generateMobiusSurface(width, height);
        
        // Mécaniques de gameplay
        Map<String, Object> gameplay = new HashMap<>();
        gameplay.put("gravity_follows_surface", true);
        gameplay.put("no_edges", true);
        gameplay.put("upside_down_combat", true);
        gameplay.put("continuous_chase", true);
        
        // Effets visuels
        Map<String, Object> visualEffects = new HashMap<>();
        visualEffects.put("shader", "mobius_surface");
        visualEffects.put("texture_mapping", "continuous_twist");
        visualEffects.put("gravity_arrows", "following_surface");
        
        return Map.of(
            "success", true,
            "spell", "Möbius Battlefield",
            "credit", "♾️ Geometric Mage's Creation",
            "surface", mobiusSurface,
            "gameplay_effects", gameplay,
            "visual_effects", visualEffects,
            "message", "The battlefield has no end! Chase your enemies forever!"
        );
    }

    /**
     * 🔒 Tesseract Prison - Prison 4D
     */
    public Map<String, Object> createTesseractPrison(Map<String, Object> request, JsonNode spellData) {
        log.info("🔒 Constructing Tesseract Prison...");
        
        List<String> targets = (List<String>) request.getOrDefault("targets", List.of("enemy_001"));
        Map<String, Object> center = (Map<String, Object>) request.get("center");
        
        // Générer l'hypercube 4D
        Map<String, Object> tesseract = generateTesseract(center);
        
        // Mécaniques de prison
        Map<String, Object> prisonMechanics = new HashMap<>();
        prisonMechanics.put("escape_difficulty", "extreme");
        prisonMechanics.put("internal_space", "non_euclidean");
        prisonMechanics.put("time_dilation", 0.1);
        prisonMechanics.put("4d_navigation", true);
        
        // Effets visuels 4D->3D
        Map<String, Object> visualEffects = new HashMap<>();
        visualEffects.put("projection_method", "stereographic");
        visualEffects.put("shadow_casting", "4d_to_3d");
        visualEffects.put("interaction", "quaternion_based");
        
        return Map.of(
            "success", true,
            "spell", "Tesseract Prison",
            "credit", "🔒 Geometric Mage's Creation",
            "imprisoned_targets", targets,
            "tesseract_structure", tesseract,
            "prison_mechanics", prisonMechanics,
            "visual_effects", visualEffects,
            "message", "Targets imprisoned in 4D hypercube! Escape requires 4D navigation!"
        );
    }

    /**
     * 🎯 Hyperbolic Space Warp - Déformation hyperbolique
     */
    public Map<String, Object> warpToHyperbolic(Map<String, Object> request, JsonNode spellData) {
        log.info("🎯 Applying Hyperbolic Space Warp...");
        
        Map<String, Object> center = (Map<String, Object>) request.get("center");
        Double radius = ((Number) request.getOrDefault("radius", 50)).doubleValue();
        Double curvature = ((Number) request.getOrDefault("curvature", -1.0)).doubleValue();
        
        // Génération de la déformation hyperbolique
        Map<String, Object> warp = new HashMap<>();
        warp.put("geometry_type", "hyperbolic");
        warp.put("curvature", curvature);
        warp.put("center", center);
        warp.put("radius", radius);
        
        // Effets sur les projectiles
        Map<String, Object> projectileEffects = new HashMap<>();
        projectileEffects.put("curved_trajectories", true);
        projectileEffects.put("geodesic_paths", generateGeodesicPaths(center, radius, curvature));
        projectileEffects.put("distance_distortion", true);
        
        // Shader pour la déformation visuelle
        String vertexShader = generateHyperbolicShader(curvature);
        
        return Map.of(
            "success", true,
            "spell", "Hyperbolic Space Warp",
            "credit", "🎯 Geometric Mage's Creation",
            "warp_parameters", warp,
            "projectile_effects", projectileEffects,
            "vertex_shader", vertexShader,
            "message", "Space has curved! Projectiles follow impossible paths!"
        );
    }

    /**
     * 🌌 Fractal Dimension Cascade - Génération fractale
     */
    public Map<String, Object> generateFractalCascade(Map<String, Object> request, JsonNode spellData) {
        log.info("🌌 Generating Fractal Dimension Cascade...");
        
        Integer maxDepth = (Integer) request.getOrDefault("max_depth", 5);
        String fractalType = (String) request.getOrDefault("fractal_type", "mandelbrot");
        Map<String, Object> seed = (Map<String, Object>) request.get("seed_point");
        
        // Génération des niveaux fractals
        List<Map<String, Object>> fractalLevels = new ArrayList<>();
        for (int depth = 0; depth < maxDepth; depth++) {
            Map<String, Object> level = new HashMap<>();
            level.put("depth", depth);
            level.put("scale", Math.pow(0.5, depth));
            level.put("complexity", Math.pow(2, depth));
            level.put("entities", generateFractalEntities(depth, fractalType));
            fractalLevels.add(level);
        }
        
        // Mécaniques de navigation
        Map<String, Object> navigation = new HashMap<>();
        navigation.put("zoom_creates_levels", true);
        navigation.put("infinite_depth", true);
        navigation.put("fractal_creatures", true);
        
        return Map.of(
            "success", true,
            "spell", "Fractal Dimension Cascade",
            "credit", "🌌 Geometric Mage's Creation",
            "fractal_type", fractalType,
            "levels_generated", fractalLevels,
            "navigation_mechanics", navigation,
            "message", "Infinite dimensions opened! Zoom to discover new worlds!"
        );
    }

    // ===== MÉTHODES UTILITAIRES =====

    private List<Map<String, Object>> generateGravityZones(Map<String, Object> area) {
        List<Map<String, Object>> zones = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Map<String, Object> zone = new HashMap<>();
            zone.put("id", "gravity_zone_" + i);
            zone.put("gravity_direction", Arrays.asList(
                Math.random() * 2 - 1, 
                Math.random() * 2 - 1, 
                Math.random() * 2 - 1
            ));
            zone.put("strength", 0.5 + Math.random());
            zones.add(zone);
        }
        return zones;
    }

    private List<Map<String, Object>> generateAutoPortals(Map<String, Object> area) {
        List<Map<String, Object>> portals = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            Map<String, Object> portal = new HashMap<>();
            portal.put("id", "auto_portal_" + i);
            portal.put("connects_to", "itself_inverted");
            portal.put("probability", 0.3);
            portals.add(portal);
        }
        return portals;
    }

    private List<Map<String, Object>> generateMobiusSurface(int width, int height) {
        List<Map<String, Object>> surface = new ArrayList<>();
        
        for (int u = 0; u < width; u++) {
            for (int v = 0; v < height; v++) {
                double t = (double) u / width * 2 * Math.PI;
                double s = (double) v / height - 0.5;
                
                // Paramètres du ruban de Möbius
                double x = (1 + s * Math.cos(t/2)) * Math.cos(t);
                double y = (1 + s * Math.cos(t/2)) * Math.sin(t);
                double z = s * Math.sin(t/2);
                
                Map<String, Object> point = new HashMap<>();
                point.put("u", u);
                point.put("v", v);
                point.put("x", x);
                point.put("y", y);
                point.put("z", z);
                point.put("normal_flipped", (u > width/2)); // Flip normal halfway
                
                surface.add(point);
            }
        }
        
        return surface;
    }

    private Map<String, Object> generateTesseract(Map<String, Object> center) {
        Map<String, Object> tesseract = new HashMap<>();
        
        // 8 cubes du tesseract
        List<Map<String, Object>> cubes = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            Map<String, Object> cube = new HashMap<>();
            cube.put("id", "cube_" + i);
            cube.put("4d_position", Arrays.asList(
                (i & 1) == 0 ? -1 : 1,
                (i & 2) == 0 ? -1 : 1, 
                (i & 4) == 0 ? -1 : 1,
                (i & 8) == 0 ? -1 : 1  // 4ème dimension
            ));
            cube.put("connections", getHypercubeConnections(i));
            cubes.add(cube);
        }
        
        tesseract.put("cubes", cubes);
        tesseract.put("center_4d", center);
        tesseract.put("dimension", 4);
        
        return tesseract;
    }

    private List<Integer> getHypercubeConnections(int cubeIndex) {
        List<Integer> connections = new ArrayList<>();
        for (int i = 0; i < 8; i++) {
            if (i != cubeIndex && Integer.bitCount(cubeIndex ^ i) == 1) {
                connections.add(i);
            }
        }
        return connections;
    }

    private List<Map<String, Object>> generateGeodesicPaths(Map<String, Object> center, double radius, double curvature) {
        List<Map<String, Object>> paths = new ArrayList<>();
        
        for (int angle = 0; angle < 360; angle += 30) {
            Map<String, Object> path = new HashMap<>();
            path.put("initial_angle", angle);
            path.put("curvature_factor", curvature);
            
            List<Map<String, Object>> points = new ArrayList<>();
            for (int t = 0; t < 100; t++) {
                double hyperbolicFactor = Math.tanh(t * 0.1 * Math.abs(curvature));
                double x = Math.cos(Math.toRadians(angle)) * t * hyperbolicFactor;
                double y = Math.sin(Math.toRadians(angle)) * t * hyperbolicFactor;
                
                points.add(Map.of("x", x, "y", y, "t", t));
            }
            
            path.put("points", points);
            paths.add(path);
        }
        
        return paths;
    }

    private String generateHyperbolicShader(double curvature) {
        return String.format(
            "vec3 hyperbolicTransform(vec3 pos) {\n" +
            "    float dist = length(pos.xz);\n" +
            "    float factor = tanh(dist * %.3f);\n" +
            "    return vec3(\n" +
            "        pos.x * factor / (dist + 0.001),\n" +
            "        pos.y,\n" +
            "        pos.z * factor / (dist + 0.001)\n" +
            "    );\n" +
            "}", Math.abs(curvature)
        );
    }

    private List<Map<String, Object>> generateFractalEntities(int depth, String fractalType) {
        List<Map<String, Object>> entities = new ArrayList<>();
        
        int entityCount = (int) Math.pow(2, depth + 1);
        for (int i = 0; i < entityCount; i++) {
            Map<String, Object> entity = new HashMap<>();
            entity.put("id", fractalType + "_entity_" + depth + "_" + i);
            entity.put("depth", depth);
            entity.put("scale", 1.0 / Math.pow(2, depth));
            entity.put("type", depth % 2 == 0 ? "creature" : "treasure");
            
            entities.add(entity);
        }
        
        return entities;
    }
}