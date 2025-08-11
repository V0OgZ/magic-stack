package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🦸 HERO CRUD API
 * Gère tous les héros du jeu
 */
@RestController
@RequestMapping("/api/heroes")
@CrossOrigin(origins = "*")
public class HeroController {

    // Stockage en mémoire pour l'instant
    private final Map<String, Hero> heroes = new ConcurrentHashMap<>();
    
    public HeroController() {
        // Héros par défaut
        initDefaultHeroes();
    }
    
    private void initDefaultHeroes() {
        // Héros d'Avalon
        addHero(new Hero("merlin", "Merlin", "🧙", "mage", 
            Map.of("attack", 2, "defense", 2, "power", 8, "knowledge", 10),
            List.of("Lightning Bolt", "Teleport", "Wisdom")));
            
        addHero(new Hero("arthur", "Arthur Pendragon", "🤴", "knight",
            Map.of("attack", 8, "defense", 8, "power", 3, "knowledge", 3),
            List.of("Leadership", "Excalibur", "Rally")));
            
        addHero(new Hero("morgana", "Morgane la Fée", "🧙‍♀️", "sorceress",
            Map.of("attack", 3, "defense", 3, "power", 9, "knowledge", 7),
            List.of("Dark Magic", "Illusion", "Temporal Shift")));
            
        // Héros temporels
        addHero(new Hero("chronos", "Chronos", "⏰", "temporal_mage",
            Map.of("attack", 4, "defense", 4, "power", 7, "knowledge", 7),
            List.of("Time Stop", "Rewind", "Accelerate")));
            
        addHero(new Hero("paradox", "Paradox Hunter", "🔮", "paradox_hunter",
            Map.of("attack", 6, "defense", 5, "power", 6, "knowledge", 5),
            List.of("Detect Paradox", "Fix Timeline", "Quantum Jump")));
    }
    
    private void addHero(Hero hero) {
        heroes.put(hero.id, hero);
    }
    
    /**
     * GET /api/heroes - Liste tous les héros
     */
    @GetMapping
    public List<Hero> getAllHeroes() {
        return new ArrayList<>(heroes.values());
    }
    
    /**
     * GET /api/heroes/{id} - Récupère un héros
     */
    @GetMapping("/{id}")
    public ResponseEntity<Hero> getHero(@PathVariable String id) {
        Hero hero = heroes.get(id);
        if (hero != null) {
            return ResponseEntity.ok(hero);
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * POST /api/heroes - Crée un nouveau héros
     */
    @PostMapping
    public ResponseEntity<Hero> createHero(@RequestBody Hero hero) {
        if (hero.id == null || hero.id.isEmpty()) {
            hero.id = UUID.randomUUID().toString();
        }
        if (heroes.containsKey(hero.id)) {
            return ResponseEntity.badRequest().build();
        }
        heroes.put(hero.id, hero);
        return ResponseEntity.ok(hero);
    }
    
    /**
     * PUT /api/heroes/{id} - Met à jour un héros
     */
    @PutMapping("/{id}")
    public ResponseEntity<Hero> updateHero(@PathVariable String id, @RequestBody Hero hero) {
        if (!heroes.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        hero.id = id;
        heroes.put(id, hero);
        return ResponseEntity.ok(hero);
    }
    
    /**
     * DELETE /api/heroes/{id} - Supprime un héros
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHero(@PathVariable String id) {
        if (!heroes.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        heroes.remove(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * GET /api/heroes/search?type={type} - Recherche par type
     */
    @GetMapping("/search")
    public List<Hero> searchHeroes(@RequestParam(required = false) String type) {
        if (type == null || type.isEmpty()) {
            return getAllHeroes();
        }
        return heroes.values().stream()
            .filter(h -> h.type.equalsIgnoreCase(type))
            .toList();
    }
    
    // Classe Hero interne
    public static class Hero {
        public String id;
        public String name;
        public String emoji;
        public String type;
        public Map<String, Integer> stats;
        public List<String> abilities;
        public String description;
        public Position6D position;
        
        public Hero() {}
        
        public Hero(String id, String name, String emoji, String type, 
                   Map<String, Integer> stats, List<String> abilities) {
            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.type = type;
            this.stats = stats;
            this.abilities = abilities;
            this.description = name + " - " + type;
        }
    }
    
    // Position 6D pour la compatibilité
    public static class Position6D {
        public int x, y, z, t, c, psi;
    }
}
