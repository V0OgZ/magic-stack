package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 💎 ARTIFACT CRUD API
 * Gère tous les artefacts du jeu
 */
@RestController
@RequestMapping("/api/artifacts")
@CrossOrigin(origins = "*")
public class ArtifactController {

    private final Map<String, Artifact> artifacts = new ConcurrentHashMap<>();
    
    public ArtifactController() {
        initDefaultArtifacts();
    }
    
    private void initDefaultArtifacts() {
        // Artefacts légendaires
        addArtifact(new Artifact("excalibur", "Excalibur", "⚔️", "weapon",
            Map.of("attack", 10, "defense", 5, "morale", 3),
            "L'épée légendaire du Roi Arthur"));
            
        addArtifact(new Artifact("graal", "Saint Graal", "🏆", "relic",
            Map.of("power", 5, "knowledge", 5, "mana", 20),
            "Le calice sacré d'Avalon"));
            
        addArtifact(new Artifact("temporal_crown", "Couronne Temporelle", "👑", "crown",
            Map.of("knowledge", 8, "time_resist", 50),
            "Protège des paradoxes temporels"));
            
        // Armures
        addArtifact(new Artifact("dragon_armor", "Armure de Dragon", "🛡️", "armor",
            Map.of("defense", 8, "magic_resist", 30),
            "Forgée dans les écailles de dragon"));
            
        addArtifact(new Artifact("mithril_mail", "Cotte de Mithril", "🎽", "armor",
            Map.of("defense", 5, "speed", 2),
            "Légère comme une plume, solide comme l'acier"));
            
        // Accessoires magiques
        addArtifact(new Artifact("boots_speed", "Bottes de Vitesse", "👢", "boots",
            Map.of("speed", 4, "movement", 2),
            "Permet de se déplacer plus vite"));
            
        addArtifact(new Artifact("ring_power", "Anneau de Puissance", "💍", "ring",
            Map.of("power", 3, "mana_regen", 2),
            "Amplifie les pouvoirs magiques"));
            
        addArtifact(new Artifact("amulet_life", "Amulette de Vie", "📿", "amulet",
            Map.of("hp", 50, "hp_regen", 5),
            "Protège et régénère"));
            
        // Objets temporels
        addArtifact(new Artifact("chrono_watch", "Montre Chrono", "⌚", "temporal",
            Map.of("time_control", 3, "initiative", 5),
            "Permet de manipuler le temps"));
            
        addArtifact(new Artifact("paradox_cube", "Cube Paradoxal", "🎲", "temporal",
            Map.of("quantum", 5, "causality", -2),
            "Crée des paradoxes contrôlés"));
            
        // Ressources spéciales
        addArtifact(new Artifact("mana_crystal", "Cristal de Mana", "💎", "resource",
            Map.of("mana", 10, "mana_max", 5),
            "Source pure de mana"));
            
        addArtifact(new Artifact("gold_mine", "Mine d'Or", "⛏️", "resource",
            Map.of("gold_income", 1000),
            "Génère de l'or chaque tour"));
    }
    
    private void addArtifact(Artifact artifact) {
        artifacts.put(artifact.id, artifact);
    }
    
    /**
     * GET /api/artifacts - Liste tous les artefacts
     */
    @GetMapping
    public List<Artifact> getAllArtifacts() {
        return new ArrayList<>(artifacts.values());
    }
    
    /**
     * GET /api/artifacts/{id} - Récupère un artefact
     */
    @GetMapping("/{id}")
    public ResponseEntity<Artifact> getArtifact(@PathVariable String id) {
        Artifact artifact = artifacts.get(id);
        if (artifact != null) {
            return ResponseEntity.ok(artifact);
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * POST /api/artifacts - Crée un nouvel artefact
     */
    @PostMapping
    public ResponseEntity<Artifact> createArtifact(@RequestBody Artifact artifact) {
        if (artifact.id == null || artifact.id.isEmpty()) {
            artifact.id = UUID.randomUUID().toString();
        }
        if (artifacts.containsKey(artifact.id)) {
            return ResponseEntity.badRequest().build();
        }
        artifacts.put(artifact.id, artifact);
        return ResponseEntity.ok(artifact);
    }
    
    /**
     * PUT /api/artifacts/{id} - Met à jour un artefact
     */
    @PutMapping("/{id}")
    public ResponseEntity<Artifact> updateArtifact(@PathVariable String id, @RequestBody Artifact artifact) {
        if (!artifacts.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        artifact.id = id;
        artifacts.put(id, artifact);
        return ResponseEntity.ok(artifact);
    }
    
    /**
     * DELETE /api/artifacts/{id} - Supprime un artefact
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArtifact(@PathVariable String id) {
        if (!artifacts.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        artifacts.remove(id);
        return ResponseEntity.noContent().build();
    }
    
    /**
     * GET /api/artifacts/search?type={type} - Recherche par type
     */
    @GetMapping("/search")
    public List<Artifact> searchArtifacts(@RequestParam(required = false) String type,
                                          @RequestParam(required = false) String slot) {
        var stream = artifacts.values().stream();
        
        if (type != null && !type.isEmpty()) {
            stream = stream.filter(a -> a.type.equalsIgnoreCase(type));
        }
        
        if (slot != null && !slot.isEmpty()) {
            stream = stream.filter(a -> a.slot != null && a.slot.equalsIgnoreCase(slot));
        }
        
        return stream.toList();
    }
    
    /**
     * GET /api/artifacts/types - Liste tous les types
     */
    @GetMapping("/types")
    public Set<String> getArtifactTypes() {
        return artifacts.values().stream()
            .map(a -> a.type)
            .collect(HashSet::new, Set::add, Set::addAll);
    }
    
    // Classe Artifact
    public static class Artifact {
        public String id;
        public String name;
        public String emoji;
        public String type;
        public String slot; // weapon, armor, ring, etc.
        public Map<String, Integer> bonuses;
        public String description;
        public Boolean equipped = false;
        public String hero_id; // ID du héros qui le porte
        
        public Artifact() {}
        
        public Artifact(String id, String name, String emoji, String type,
                       Map<String, Integer> bonuses, String description) {
            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.type = type;
            this.slot = type;
            this.bonuses = bonuses;
            this.description = description;
        }
    }
}
