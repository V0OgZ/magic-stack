package com.magicstack.controller;

import com.magicstack.service.IntersticeService;
import com.magicstack.model.NarrativeEvent;
import com.magicstack.model.ChoiceResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

/**
 * 🧠 INTERSTICE NARRATIF CONTROLLER
 * Gère les événements narratifs et les choix temporels
 * Dimension 1 Littéraire: Chaque choix forge la timeline
 */
@RestController
@RequestMapping("/api/interstice")
@CrossOrigin(origins = "*")
public class IntersticeController {

    @Autowired
    private IntersticeService intersticeService;

    @PostMapping("/narrative-event")
    public Map<String, Object> triggerNarrativeEvent(@RequestBody Map<String, Object> eventData) {
        System.out.println("🧠 Déclenchement événement narratif");
        System.out.println("📝 Données: " + eventData);
        
        try {
            NarrativeEvent event = intersticeService.createNarrativeEvent(eventData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("event_id", event.getEventId());
            response.put("event_type", event.getEventType());
            response.put("title", event.getTitle());
            response.put("description", event.getDescription());
            response.put("choices", event.getChoices());
            response.put("location", event.getLocation());
            response.put("hero", event.getHero());
            response.put("timeline_impact", event.getTimelineImpact());
            response.put("message", "Événement narratif déclenché! Faites votre choix.");
            
            System.out.println("✅ Événement créé: " + event.getEventId());
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/make-choice")
    public Map<String, Object> makeChoice(@RequestBody Map<String, Object> choiceData) {
        System.out.println("🎯 Choix narratif effectué");
        System.out.println("📝 Choix: " + choiceData);
        
        try {
            ChoiceResult result = intersticeService.processChoice(choiceData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("event_id", result.getEventId());
            response.put("choice_made", result.getChoiceMade());
            response.put("consequence", result.getConsequence());
            response.put("narrative_text", result.getNarrativeText());
            response.put("timeline_changed", result.isTimelineChanged());
            response.put("new_timeline_id", result.getNewTimelineId());
            response.put("hero_state", result.getHeroState());
            response.put("unlocked_abilities", result.getUnlockedAbilities());
            response.put("next_events", result.getNextEvents());
            
            System.out.println("✅ Choix traité: " + result.getChoiceMade() + " -> " + result.getConsequence());
            
            if (result.isTimelineChanged()) {
                System.out.println("⏰ Timeline altérée! Nouvelle timeline: " + result.getNewTimelineId());
            }
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @GetMapping("/timeline/{heroId}")
    public Map<String, Object> getHeroTimeline(@PathVariable String heroId) {
        System.out.println("📊 Récupération timeline héros: " + heroId);
        
        try {
            Map<String, Object> timeline = intersticeService.getHeroTimeline(heroId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("hero_id", heroId);
            response.put("current_timeline", timeline.get("current_timeline"));
            response.put("timeline_history", timeline.get("timeline_history"));
            response.put("branching_points", timeline.get("branching_points"));
            response.put("fixed_events", timeline.get("fixed_events"));
            response.put("causal_debt", timeline.get("causal_debt"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/temporal-jump")
    public Map<String, Object> performTemporalJump(@RequestBody Map<String, Object> jumpData) {
        System.out.println("⏰ Saut temporel demandé");
        System.out.println("📝 Données: " + jumpData);
        
        try {
            Map<String, Object> result = intersticeService.performTemporalJump(jumpData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("jump_successful", result.get("jump_successful"));
            response.put("origin_time", result.get("origin_time"));
            response.put("destination_time", result.get("destination_time"));
            response.put("causality_cost", result.get("causality_cost"));
            response.put("timeline_stability", result.get("timeline_stability"));
            response.put("narrative_consequence", result.get("narrative_consequence"));
            response.put("available_actions", result.get("available_actions"));
            
            System.out.println("✅ Saut temporel: " + result.get("origin_time") + " -> " + result.get("destination_time"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @GetMapping("/causality-web/{heroId}")
    public Map<String, Object> getCausalityWeb(@PathVariable String heroId) {
        System.out.println("🕸️ Récupération toile causale: " + heroId);
        
        try {
            Map<String, Object> web = intersticeService.getCausalityWeb(heroId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("hero_id", heroId);
            response.put("causality_nodes", web.get("causality_nodes"));
            response.put("temporal_connections", web.get("temporal_connections"));
            response.put("butterfly_effects", web.get("butterfly_effects"));
            response.put("paradox_risks", web.get("paradox_risks"));
            response.put("stability_index", web.get("stability_index"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/memory-tattoo")
    public Map<String, Object> createMemoryTattoo(@RequestBody Map<String, Object> tattooData) {
        System.out.println("🔮 Création tatouage mémoriel");
        System.out.println("📝 Données: " + tattooData);
        
        try {
            Map<String, Object> result = intersticeService.createMemoryTattoo(tattooData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tattoo_id", result.get("tattoo_id"));
            response.put("memory_encoded", result.get("memory_encoded"));
            response.put("temporal_anchor", result.get("temporal_anchor"));
            response.put("causality_protection", result.get("causality_protection"));
            response.put("narrative_power", result.get("narrative_power"));
            
            System.out.println("✅ Tatouage créé: " + result.get("tattoo_id"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }

    @PostMapping("/cast-formula")
    public Map<String, Object> castFormula(@RequestBody Map<String, Object> formulaData) {
        System.out.println("⚡ Lancement de formule magique");
        System.out.println("📝 Données: " + formulaData);
        
        try {
            Map<String, Object> result = intersticeService.castMagicalFormula(formulaData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("formula", result.get("formula"));
            response.put("caster", result.get("caster"));
            response.put("effect", result.get("effect"));
            response.put("power_level", result.get("power_level"));
            response.put("energy_consumed", result.get("energy_consumed"));
            response.put("narrative", result.get("narrative"));
            response.put("temporal_impact", result.get("temporal_impact"));
            response.put("reality_altered", result.get("reality_altered"));
            response.put("timeline_affected", result.get("timeline_affected"));
            
            System.out.println("✅ Formule lancée: " + result.get("formula"));
            
            return response;
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("error", e.getMessage());
            return error;
        }
    }
}