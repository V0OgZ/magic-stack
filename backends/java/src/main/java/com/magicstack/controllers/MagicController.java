package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.magicstack.services.MagicEngineService;
import com.magicstack.services.UltimateSpecService;
import com.magicstack.models.*;
import com.magicstack.dto.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;

/**
 * 🎮 Main Magic API Controller
 * Handles all magical operations in 6D space
 */
@RestController
@RequestMapping("/api/magic")
@CrossOrigin(origins = "*")
public class MagicController {
    
    @Autowired
    private MagicEngineService magicEngine;
    @Autowired
    private UltimateSpecService ultimateSpecService;
    @Autowired
    private com.magicstack.services.ScenarioTranslationService scenarioTranslator;
    
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "MAGICAL");
        status.put("formulas_loaded", 869);
        status.put("dimensions", 6);
        status.put("temporal_grammar", "ACTIVE");
        status.put("message", "The magic abides!");
        return status;
    }
    
    @PostMapping("/cast")
    public CastResponse castSpell(@RequestBody CastRequest request) {
        // Cast magic formula in 6D space
        return magicEngine.cast(request);
    }

    @GetMapping("/ultimates")
    public Map<String, Object> listUltimates() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("ultimates", ultimateSpecService.listMeta());
        return resp;
    }

    @PostMapping("/cast-ultimate")
    public CastResponse castUltimate(@RequestBody Map<String, Object> body) {
        String formulaId = String.valueOf(body.getOrDefault("formulaId", ""));
        String activeHeroId = String.valueOf(body.getOrDefault("activeHeroId", ""));
        Object ctx = body.get("context");
        Map<String, Object> context = new HashMap<>();
        if (ctx instanceof Map<?, ?> m) {
            for (Map.Entry<?, ?> e : m.entrySet()) {
                context.put(String.valueOf(e.getKey()), e.getValue());
            }
        }
        context.put("activeHeroId", activeHeroId);
        return magicEngine.castUltimate(formulaId, context);
    }
    
    @PostMapping("/translate")
    public TranslateResponse translateFormula(@RequestBody TranslateRequest request) {
        // Translate formula to different formats (literary, runic, iconic)
        return magicEngine.translate(request);
    }
    
    @PostMapping("/shift")
    public ShiftResponse temporalShift(@RequestBody ShiftRequest request) {
        // Perform temporal shift operation
        return magicEngine.temporalShift(request);
    }
    
    @PostMapping("/fork")
    public ForkResponse realityFork(@RequestBody ForkRequest request) {
        // Fork reality into parallel timelines
        return magicEngine.realityFork(request);
    }
    
    @PostMapping("/merge")
    public MergeResponse timelineMerge(@RequestBody MergeRequest request) {
        // Merge multiple timelines
        return magicEngine.timelineMerge(request);
    }
    
    @GetMapping("/formulas")
    public Map<String, Object> listFormulas() {
        Map<String, Object> resp = new HashMap<>();
        resp.put("registry", magicEngine.getRegistryInfo());
        resp.put("formulas", magicEngine.getAllCachedFormulas());
        return resp;
    }
    
    @GetMapping("/dimensions/{entityId}")
    public Position6D getEntityPosition(@PathVariable String entityId) {
        return magicEngine.getEntityPosition(entityId);
    }

    @GetMapping("/world-state/changes")
    public Map<String, Object> recentChanges(@RequestParam(value = "limit", required = false) Integer limit) {
        return magicEngine.getRecentChanges(limit);
    }

    @PostMapping("/visibility/los")
    public Map<String, Object> visibilityLos(@RequestBody Map<String, Object> body) {
        try {
            // Passthrough to Rust /api/visibility/los via simple HTTP client
            com.magicstack.util.Http json = new com.magicstack.util.Http(System.getenv().getOrDefault("RUST_API_BASE", "http://localhost:3001"));
            String path = "/api/visibility/los";
            String res = json.postJson(path, new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(body));
            @SuppressWarnings("unchecked")
            Map<String, Object> map = new com.fasterxml.jackson.databind.ObjectMapper().readValue(res, Map.class);
            return map;
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", e.getMessage());
            return err;
        }
    }

    @PostMapping("/translate-scenario")
    public Map<String, Object> translateScenario(@RequestBody Map<String, Object> body) {
        String script = Objects.toString(body.getOrDefault("hots", ""));
        Long seed = null;
        Object s = body.get("seed");
        if (s instanceof Number) seed = ((Number) s).longValue();
        String md = scenarioTranslator.translateHotsScriptToMarkdown(script, seed);
        Map<String, Object> resp = new HashMap<>();
        resp.put("markdown", md);
        return resp;
    }
}