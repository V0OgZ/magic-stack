package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

/**
 * 🎮 RESOURCE UNIFIED API
 * Point d'entrée unique pour toutes les ressources du jeu
 */
@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {

    @Autowired(required = false)
    private HeroController heroController;
    
    @Autowired(required = false)
    private CreatureController creatureController;
    
    @Autowired(required = false)
    private ArtifactController artifactController;
    
    public ResourceController() {
        // Auto-init si pas d'injection
        if (heroController == null) {
            heroController = new HeroController();
        }
        if (creatureController == null) {
            creatureController = new CreatureController();
        }
        if (artifactController == null) {
            artifactController = new ArtifactController();
        }
    }
    
    /**
     * GET /api/resources/all - Récupère TOUTES les ressources
     */
    @GetMapping("/all")
    public Map<String, Object> getAllResources() {
        Map<String, Object> resources = new HashMap<>();
        resources.put("heroes", heroController.getAllHeroes());
        resources.put("creatures", creatureController.getAllCreatures());
        resources.put("artifacts", artifactController.getAllArtifacts());
        resources.put("total_count", 
            heroController.getAllHeroes().size() + 
            creatureController.getAllCreatures().size() + 
            artifactController.getAllArtifacts().size());
        return resources;
    }
    
    /**
     * GET /api/resources/summary - Résumé des ressources
     */
    @GetMapping("/summary")
    public Map<String, Object> getResourceSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("heroes_count", heroController.getAllHeroes().size());
        summary.put("creatures_count", creatureController.getAllCreatures().size());
        summary.put("artifacts_count", artifactController.getAllArtifacts().size());
        summary.put("hero_types", heroController.searchHeroes(null).stream()
            .map(h -> h.type).distinct().toList());
        summary.put("creature_types", creatureController.getCreatureTypes());
        summary.put("artifact_types", artifactController.getArtifactTypes());
        return summary;
    }
    
    /**
     * GET /api/resources/icons - Tous les emojis/icônes
     */
    @GetMapping("/icons")
    public Map<String, List<IconResource>> getAllIcons() {
        Map<String, List<IconResource>> icons = new HashMap<>();
        
        // Icônes des héros
        icons.put("heroes", heroController.getAllHeroes().stream()
            .map(h -> new IconResource(h.id, h.name, h.emoji, "hero"))
            .toList());
            
        // Icônes des créatures
        icons.put("creatures", creatureController.getAllCreatures().stream()
            .map(c -> new IconResource(c.id, c.name, c.emoji, "creature"))
            .toList());
            
        // Icônes des artefacts
        icons.put("artifacts", artifactController.getAllArtifacts().stream()
            .map(a -> new IconResource(a.id, a.name, a.emoji, "artifact"))
            .toList());
            
        return icons;
    }
    
    /**
     * GET /api/resources/search?q={query} - Recherche globale
     */
    @GetMapping("/search")
    public Map<String, Object> searchResources(@RequestParam String q) {
        String query = q.toLowerCase();
        Map<String, Object> results = new HashMap<>();
        
        // Recherche dans les héros
        results.put("heroes", heroController.getAllHeroes().stream()
            .filter(h -> h.name.toLowerCase().contains(query) || 
                        h.type.toLowerCase().contains(query))
            .toList());
            
        // Recherche dans les créatures
        results.put("creatures", creatureController.getAllCreatures().stream()
            .filter(c -> c.name.toLowerCase().contains(query) || 
                        c.type.toLowerCase().contains(query))
            .toList());
            
        // Recherche dans les artefacts
        results.put("artifacts", artifactController.getAllArtifacts().stream()
            .filter(a -> a.name.toLowerCase().contains(query) || 
                        a.type.toLowerCase().contains(query))
            .toList());
            
        return results;
    }
    
    /**
     * GET /api/resources/for-editor - Ressources formatées pour l'éditeur
     */
    @GetMapping("/for-editor")
    public EditorResources getResourcesForEditor() {
        EditorResources resources = new EditorResources();
        
        // Format pour l'éditeur unifié
        resources.categories = List.of(
            new Category("Heroes", "hero", heroController.getAllHeroes().stream()
                .map(h -> new EditorResource(h.id, h.name, h.emoji, "hero", h.type))
                .toList()),
            new Category("Creatures", "creature", creatureController.getAllCreatures().stream()
                .map(c -> new EditorResource(c.id, c.name, c.emoji, "creature", c.type))
                .toList()),
            new Category("Artifacts", "artifact", artifactController.getAllArtifacts().stream()
                .map(a -> new EditorResource(a.id, a.name, a.emoji, "artifact", a.type))
                .toList())
        );
        
        return resources;
    }
    
    // Classes internes pour les réponses
    public static class IconResource {
        public String id;
        public String name;
        public String emoji;
        public String type;
        
        public IconResource(String id, String name, String emoji, String type) {
            this.id = id;
            this.name = name;
            this.emoji = emoji;
            this.type = type;
        }
    }
    
    public static class EditorResource {
        public String id;
        public String name;
        public String icon;
        public String category;
        public String subtype;
        
        public EditorResource(String id, String name, String icon, String category, String subtype) {
            this.id = id;
            this.name = name;
            this.icon = icon;
            this.category = category;
            this.subtype = subtype;
        }
    }
    
    public static class Category {
        public String name;
        public String type;
        public List<EditorResource> items;
        
        public Category(String name, String type, List<EditorResource> items) {
            this.name = name;
            this.type = type;
            this.items = items;
        }
    }
    
    public static class EditorResources {
        public List<Category> categories;
    }
}
