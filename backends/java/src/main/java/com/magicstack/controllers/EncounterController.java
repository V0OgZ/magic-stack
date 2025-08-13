package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;
import java.util.HashMap;

/**
 * EncounterController
 * Minimal auto-resolve encounters when colliding with a creature on the map
 */
@RestController
@RequestMapping("/api/encounter")
@CrossOrigin(origins = "*")
public class EncounterController {

    private final CreatureController creatureController;

    public EncounterController() {
        this.creatureController = new CreatureController();
    }

    public EncounterController(CreatureController creatureController) {
        this.creatureController = creatureController != null ? creatureController : new CreatureController();
    }

    public static class ResolveRequest {
        public String playerId;
        public String creatureId;
        public Integer stack; // optional, default 1
        public Map<String, Integer> heroStats; // optional future use
    }

    public static class ResolveResponse {
        public String status = "OK";
        public String outcome; // WIN/LOSE
        public Map<String, Integer> rewards = new HashMap<>();
    }

    @PostMapping("/resolve")
    public ResponseEntity<ResolveResponse> resolve(@RequestBody ResolveRequest req) {
        if (req.creatureId == null || req.creatureId.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        var creatureResp = creatureController.getCreature(req.creatureId);
        if (!creatureResp.getStatusCode().is2xxSuccessful() || creatureResp.getBody() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        var creature = creatureResp.getBody();
        int stack = req.stack != null ? Math.max(1, req.stack) : 1;

        // Minimal auto resolve: hero wins vs small stacks; later plug TCG
        ResolveResponse resp = new ResolveResponse();
        resp.outcome = "WIN";

        // Rewards depending on creature type
        int base = Math.max(1, stack);
        switch (creature.type.toLowerCase()) {
            case "human" -> {
                resp.rewards.put("gold", 25 * base);
                resp.rewards.put("crystals", 1 * base);
            }
            case "magical" -> {
                resp.rewards.put("crystals", 3 * base);
                resp.rewards.put("herbs", 1 * base);
            }
            case "undead" -> {
                resp.rewards.put("crystals", 2 * base);
            }
            case "dragon" -> {
                resp.rewards.put("gold", 100 * base);
                resp.rewards.put("crystals", 5 * base);
            }
            default -> {
                resp.rewards.put("gold", 10 * base);
            }
        }
        return ResponseEntity.ok(resp);
    }
}


