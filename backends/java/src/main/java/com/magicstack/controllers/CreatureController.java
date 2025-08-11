package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🐉 CREATURE CRUD API
 * Gère toutes les créatures du jeu
 */
@RestController
@RequestMapping("/api/creatures")
@CrossOrigin(origins = "*")
public class CreatureController {

    private final Map<String, Creature> creatures = new ConcurrentHashMap<>();
    
    public CreatureController() {
        initDefaultCreatures();
    }
    
    private void initDefaultCreatures() {
        // Dragons
        addCreature(new Creature("red_dragon", "Dragon Rouge", "🐉", "dragon",
            Map.of("attack", 20, "defense", 20, "hp", 250, "speed", 8),
            List.of("Fire Breath", "Flying", "Magic Immunity")));
            
        addCreature(new Creature("temporal_dragon", "Dragon Temporel", "🐲", "dragon",
            Map.of("attack", 18, "defense", 18, "hp", 200, "speed", 10),
            List.of("Time Breath", "Phase Shift", "Temporal Shield")));
            
        // Créatures magiques
        addCreature(new Creature("phoenix", "Phénix", "🔥", "magical",
            Map.of("attack", 15, "defense", 12, "hp", 150, "speed", 9),
            List.of("Rebirth", "Fire Aura", "Flying")));
            
        addCreature(new Creature("unicorn", "Licorne", "🦄", "magical",
            Map.of("attack", 10, "defense", 10, "hp", 80, "speed", 7),
            List.of("Magic Aura", "Healing", "Teleport")));
            
        // Unités de base
        addCreature(new Creature("knight", "Chevalier", "⚔️", "human",
            Map.of("attack", 8, "defense", 10, "hp", 40, "speed", 4),
            List.of("Charge", "Shield Wall")));
            
        addCreature(new Creature("archer", "Archer", "🏹", "human",
            Map.of("attack", 6, "defense", 4, "hp", 25, "speed", 5),
            List.of("Ranged Attack", "Double Shot")));
            
        addCreature(new Creature("mage", "Mage", "🧙‍♂️", "human",
            Map.of("attack", 4, "defense", 3, "hp", 20, "speed", 3),
            List.of("Fireball", "Shield", "Teleport")));
            
        // Morts-vivants
        addCreature(new Creature("skeleton", "Squelette", "💀", "undead",
            Map.of("attack", 4, "defense", 3, "hp", 15, "speed", 4),
            List.of("Undead", "No Morale")));
            
        addCreature(new Creature("lich", "Liche", "👻", "undead",
            Map.of("attack", 12, "defense", 10, "hp", 100, "speed", 6),
            List.of("Death Cloud", "Undead", "Raise Dead")));
    }
    
    private void addCreature(Creature creature) {
        creatures.put(creature.id, creature);
    }
    
    /**
     * GET /api/creatures - Liste toutes les créatures
     */
    @GetMapping
    public List<Creature> getAllCreatures() {
        return new ArrayList<>(creatures.values());
    }
    
    /**
     * GET /api/creatures/{id} - Récupère une créature
     */
    @GetMapping("/{id}")
    public ResponseEntity<Creature> getCreature(@PathVariable String id) {
        Creature creature = creatures.get(id);
        if (creature != null) {
            return ResponseEntity.ok(creature);
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * POST /api/creatures - Crée une nouvelle créature
     */
    @PostMapping
    public ResponseEntity<Creature> createCreature(@RequestBody Creature creature) {
        if (creature.id == null || creature.id.isEmpty()) {
            creature.id = UUID.randomUUID().toString();
        }
        if (creatures.containsKey(creature.id)) {
            return ResponseEntity.badRequest().build();
        }
        creatures.put(creature.id, creature);
        return ResponseEntity.ok(creature);
    }
    
    /**
     * PUT /api/creatures/{id} - Met à jour une créature
     */
    @PutMapping("/{id}")
    public ResponseEntity<Creature> updateCreature(@PathVariable String id, @RequestBody Creature creature) {
        if (!creatures.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        creature.id = id;
        creatures.put(id, creature);
        return ResponseEntity.ok(creature);
    }
    
    /**
     * DELETE /api/creatures/{id} - Supprime une créature
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCreature(@PathVariable String id) {
        if (!creatures.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        creatures.remove(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * GET /api/creatures/search?type={type} - Recherche par type
     */
    @GetMapping("/search")
    public List<Creature> searchCreatures(@RequestParam(required = false) String type,
                                          @RequestParam(required = false) Integer minAttack) {
        var stream = creatures.values().stream();
        
        if (type != null && !type.isEmpty()) {
            stream = stream.filter(c -> c.type.equalsIgnoreCase(type));
        }
        
        if (minAttack != null) {
            stream = stream.filter(c -> c.stats.getOrDefault("attack", 0) >= minAttack);
        }
        
        return stream.toList();
    }
    
    /**
     * GET /api/creatures/types - Liste tous les types
     */
    @GetMapping("/types")
    public Set<String> getCreatureTypes() {
        return creatures.values().stream()
            .map(c -> c.type)
            .collect(HashSet::new, Set::add, Set::addAll);
    }
    
    // Classe Creature
    public static class Creature {
        public String id;
        public String name;
        public String emoji;
        public String type;
        public Map<String, Integer> stats;
        public List<String> abilities;
        public String description;
        public Integer stack_size = 1;
        
        public Creature() {}
        
        public Creature(String id, String name, String emoji, String type,
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
}
