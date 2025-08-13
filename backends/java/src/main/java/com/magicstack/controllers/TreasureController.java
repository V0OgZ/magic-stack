package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.*;

/**
 * TreasureController
 * Simple treasure openings that grant temporary buffs and/or resource/XP rewards
 */
@RestController
@RequestMapping("/api/treasure")
@CrossOrigin(origins = "*")
public class TreasureController {

    public static class OpenRequest {
        public String playerId;
        public String treasureType; // e.g., chest_common, potion_panoramix, xp_scroll
    }

    public static class OpenResponse {
        public String status = "OK";
        public Map<String, Integer> rewards = new HashMap<>(); // gold, crystals, energy, xp
        public List<Buff> buffs = new ArrayList<>();
        public String chosen; // optional note if choice applied
    }

    public static class Buff {
        public String id;        // e.g., haste, luck, shield
        public String name;      // display name
        public int durationSec;  // temporary
        public Map<String, Integer> params = new HashMap<>();
    }

    @PostMapping("/open")
    public ResponseEntity<OpenResponse> open(@RequestBody OpenRequest req) {
        if (req.treasureType == null || req.treasureType.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String t = req.treasureType.toLowerCase(Locale.ROOT);
        OpenResponse resp = new OpenResponse();

        switch (t) {
            case "chest_common" -> {
                resp.rewards.put("gold", 150);
                resp.rewards.put("crystals", 2);
            }
            case "chest_rare" -> {
                resp.rewards.put("gold", 400);
                resp.rewards.put("crystals", 5);
                resp.buffs.add(buff("luck", "Lucky Hands", 60, Map.of("drop_rate", 10)));
            }
            case "potion_panoramix" -> {
                resp.rewards.put("energy", 20);
                resp.buffs.add(buff("haste", "Panoramix Haste", 45, Map.of("speed", 20)));
            }
            case "xp_scroll" -> {
                resp.rewards.put("xp", 100);
            }
            default -> {
                // fallback: small mixed reward
                resp.rewards.put("gold", 50);
                resp.rewards.put("crystals", 1);
            }
        }

        return ResponseEntity.ok(resp);
    }

    private static Buff buff(String id, String name, int dur, Map<String, Integer> params) {
        Buff b = new Buff();
        b.id = id; b.name = name; b.durationSec = dur;
        if (params != null) b.params.putAll(params);
        return b;
    }
}


