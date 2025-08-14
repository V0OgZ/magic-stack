package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * GAME CONTROLLER
 * Backend counters for Dr. Stone-style resources and pickups
 */
@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    private final ConcurrentHashMap<String, Inventory> inventories = new ConcurrentHashMap<>();

    private Inventory getOrCreate(String playerId) {
        return inventories.computeIfAbsent(playerId == null ? "default" : playerId, k -> new Inventory());
    }

    @GetMapping("/inventory/{playerId}")
    public Inventory getInventory(@PathVariable String playerId) {
        return getOrCreate(playerId);
    }

    @PostMapping("/resources/pickup")
    public Inventory pickup(@RequestBody PickupRequest req) {
        final String pid = req.playerId == null || req.playerId.isBlank() ? "default" : req.playerId;
        Inventory inv = getOrCreate(pid);

        inv.wood += n(req.woodDelta);
        inv.stone += n(req.stoneDelta);
        inv.herbs += n(req.herbsDelta);
        inv.flowers += n(req.flowersDelta);

        inv.gold += n(req.goldDelta);
        inv.crystals += n(req.crystalsDelta);
        inv.energy = clamp(inv.energy + n(req.energyDelta), 0, 100);
        inv.temporal += n(req.temporalDelta);

        // XP: simple rule — crystals/2 add to XP
        inv.xp += Math.max(0, n(req.crystalsDelta)) / 2;
        inv.lastUpdatedEpochMs = System.currentTimeMillis();
        return inv;
    }

    @PostMapping("/inventory/reset/{playerId}")
    public Inventory reset(@PathVariable String playerId) {
        Inventory inv = new Inventory();
        inventories.put(playerId == null ? "default" : playerId, inv);
        return inv;
    }

    private static int n(Integer v) { return v == null ? 0 : v; }
    private static int clamp(int v, int min, int max) { return Math.max(min, Math.min(max, v)); }

    /**
     * Inventory DTO
     */
    public static class Inventory {
        public int wood;
        public int stone;
        public int herbs;
        public int flowers;

        public int gold;
        public int crystals;
        public int energy;
        public int temporal;
        public int xp;

        public long lastUpdatedEpochMs = System.currentTimeMillis();
    }

    /**
     * Pickup request DTO
     */
    public static class PickupRequest {
        public String playerId;
        public Integer woodDelta;
        public Integer stoneDelta;
        public Integer herbsDelta;
        public Integer flowersDelta;

        public Integer goldDelta;
        public Integer crystalsDelta;
        public Integer energyDelta;
        public Integer temporalDelta;
    }
}


