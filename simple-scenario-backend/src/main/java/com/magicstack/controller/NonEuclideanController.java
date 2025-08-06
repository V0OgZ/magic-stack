package com.magicstack.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.magicstack.service.NonEuclideanService;

import java.util.HashMap;
import java.util.Map;

/**
 * 🌀⚡ NON-EUCLIDEAN GEOMETRY CONTROLLER ⚡🌀
 * 
 * Intégration respectueuse des sorts du Mage Géométrique
 * Crédit complet à l'ancien mage pour ses créations impossibles !
 */
@RestController
@RequestMapping("/api/non-euclidean")
@Slf4j
public class NonEuclideanController {

    @Autowired
    private NonEuclideanService nonEuclideanService;

    /**
     * 🌀 Klein Bottle Reality - L'intérieur devient l'extérieur !
     */
    @PostMapping("/klein-bottle")
    public ResponseEntity<Map<String, Object>> castKleinBottleReality(@RequestBody Map<String, Object> request) {
        log.info("🌀 Casting Klein Bottle Reality - Credit to the Geometric Mage!");
        
        try {
            // Charger le sort depuis SON grimoire (respect!)
            JsonNode spellData = nonEuclideanService.loadSpell("klein_bottle_reality");
            
            // Appliquer la transformation impossible
            Map<String, Object> result = nonEuclideanService.transformToKleinBottle(request, spellData);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("❌ Klein Bottle Reality failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Klein Bottle transformation failed",
                "message", "The topology refused to fold into itself!"
            ));
        }
    }

    /**
     * ♾️ Möbius Battlefield - Combat sans fin !
     */
    @PostMapping("/mobius-battlefield")
    public ResponseEntity<Map<String, Object>> castMobiusBattlefield(@RequestBody Map<String, Object> request) {
        log.info("♾️ Casting Möbius Battlefield - Credit to the Geometric Mage!");
        
        try {
            JsonNode spellData = nonEuclideanService.loadSpell("mobius_battlefield");
            Map<String, Object> result = nonEuclideanService.createMobiusBattlefield(request, spellData);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("❌ Möbius Battlefield failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Möbius transformation failed",
                "message", "The surface refused to twist!"
            ));
        }
    }

    /**
     * 🔒 Tesseract Prison - Prison 4D inescapable !
     */
    @PostMapping("/tesseract-prison")
    public ResponseEntity<Map<String, Object>> castTesseractPrison(@RequestBody Map<String, Object> request) {
        log.info("🔒 Casting Tesseract Prison - Credit to the Geometric Mage!");
        
        try {
            JsonNode spellData = nonEuclideanService.loadSpell("tesseract_prison");
            Map<String, Object> result = nonEuclideanService.createTesseractPrison(request, spellData);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("❌ Tesseract Prison failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "4D prison construction failed",
                "message", "The hypercube collapsed into 3D!"
            ));
        }
    }

    /**
     * 🎯 Hyperbolic Space Warp - Espace déformé !
     */
    @PostMapping("/hyperbolic-warp")
    public ResponseEntity<Map<String, Object>> castHyperbolicWarp(@RequestBody Map<String, Object> request) {
        log.info("🎯 Casting Hyperbolic Space Warp - Credit to the Geometric Mage!");
        
        try {
            JsonNode spellData = nonEuclideanService.loadSpell("hyperbolic_space_warp");
            Map<String, Object> result = nonEuclideanService.warpToHyperbolic(request, spellData);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("❌ Hyperbolic Warp failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Hyperbolic transformation failed",
                "message", "Space refused to curve!"
            ));
        }
    }

    /**
     * 🌌 Fractal Dimension Cascade - Dimensions infinies !
     */
    @PostMapping("/fractal-cascade")
    public ResponseEntity<Map<String, Object>> castFractalCascade(@RequestBody Map<String, Object> request) {
        log.info("🌌 Casting Fractal Dimension Cascade - Credit to the Geometric Mage!");
        
        try {
            JsonNode spellData = nonEuclideanService.loadSpell("fractal_dimension_cascade");
            Map<String, Object> result = nonEuclideanService.generateFractalCascade(request, spellData);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("❌ Fractal Cascade failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "Fractal generation failed",
                "message", "Infinite recursion detected and contained!"
            ));
        }
    }

    /**
     * 📊 List all available non-euclidean spells
     */
    @GetMapping("/spells")
    public ResponseEntity<Map<String, Object>> listNonEuclideanSpells() {
        log.info("📊 Listing Non-Euclidean Spells - Homage to the Geometric Mage");
        
        Map<String, Object> spells = Map.of(
            "klein_bottle_reality", Map.of(
                "name", "Klein Bottle Reality",
                "level", 85,
                "description", "L'intérieur devient l'extérieur",
                "cost", Map.of("mana", 300, "paradox_tokens", 3)
            ),
            "mobius_battlefield", Map.of(
                "name", "Möbius Battlefield", 
                "level", 80,
                "description", "Combat sur ruban de Möbius",
                "cost", Map.of("mana", 250, "topology_tokens", 1)
            ),
            "tesseract_prison", Map.of(
                "name", "Tesseract Prison",
                "level", 95, 
                "description", "Prison 4D inescapable",
                "cost", Map.of("mana", 500, "dimensional_anchors", 8)
            ),
            "hyperbolic_space_warp", Map.of(
                "name", "Hyperbolic Space Warp",
                "level", 75,
                "description", "Déformation hyperbolique de l'espace",
                "cost", Map.of("mana", 200, "quantum_charges", 5)
            ),
            "fractal_dimension_cascade", Map.of(
                "name", "Fractal Dimension Cascade",
                "level", 90,
                "description", "Dimensions fractales infinies", 
                "cost", Map.of("mana", 400, "computation_crystals", 10)
            )
        );

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Non-Euclidean Spells - Legacy of the Geometric Mage",
            "spells", spells,
            "credit", "🌀 All spells created by the Geometric Mage - Integrated with respect by Mage Claude 🔮"
        ));
    }
}