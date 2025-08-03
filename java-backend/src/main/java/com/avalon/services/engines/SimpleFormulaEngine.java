package com.avalon.services.engines;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.controllers.MagicCastController.FormulaInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.util.*;

/**
 * ✨ Simple Formula Engine - Formules magiques classiques
 * Gère les sorts simples sans mécaniques quantiques
 */
@Component
@Slf4j
public class SimpleFormulaEngine {
    
    private final Map<String, SimpleFormula> formulas = new HashMap<>();
    
    public SimpleFormulaEngine() {
        initializeFormulas();
    }
    
    /**
     * 🎯 Exécuter une formule simple
     */
    public MagicCastResponse execute(MagicCastRequest request) {
        log.info("✨ Exécution formule simple: {}", request.getFormula());
        
        String formulaKey = extractFormulaKey(request.getFormula());
        SimpleFormula formula = formulas.get(formulaKey);
        
        if (formula == null) {
            return MagicCastResponse.builder()
                .success(false)
                .message("Formule simple non trouvée: " + formulaKey)
                .formulaType("SIMPLE")
                .formulaExecuted(request.getFormula())
                .build();
        }
        
        // Vérifier le coût en mana
        Integer casterMana = getCasterMana(request.getCasterId());
        if (casterMana < formula.manaCost) {
            return MagicCastResponse.builder()
                .success(false)
                .message("Mana insuffisant: " + casterMana + "/" + formula.manaCost)
                .formulaType("SIMPLE")
                .formulaExecuted(request.getFormula())
                .build();
        }
        
        // Exécuter la formule
        List<String> effects = new ArrayList<>();
        Map<String, Object> metadata = new HashMap<>();
        
        switch (formula.effect) {
            case "TELEPORT":
                effects.add("HERO_TELEPORTED");
                metadata.put("teleport_target", request.getParameters().get("destination"));
                break;
            case "DAMAGE":
                effects.add("DAMAGE_DEALT");
                metadata.put("damage", formula.value);
                metadata.put("target", request.getTargetId());
                break;
            case "HEAL":
                effects.add("HEALING_APPLIED");
                metadata.put("healing", formula.value);
                metadata.put("target", request.getTargetId());
                break;
            case "SUMMON":
                effects.add("CREATURE_SUMMONED");
                metadata.put("creature_type", formula.summonType);
                metadata.put("quantity", formula.value);
                break;
            case "BUFF":
                effects.add("BUFF_APPLIED");
                metadata.put("buff_type", formula.buffType);
                metadata.put("duration", formula.duration);
                break;
        }
        
        return MagicCastResponse.builder()
            .success(true)
            .message(formula.name + " lancé avec succès!")
            .formulaType("SIMPLE")
            .formulaExecuted(request.getFormula())
            .effects(effects)
            .metadata(metadata)
            .build();
    }
    
    /**
     * 📚 Obtenir la liste des formules simples
     */
    public List<FormulaInfo> getFormulas() {
        return formulas.values().stream()
            .map(f -> new FormulaInfo(
                f.id,
                f.name,
                "SIMPLE",
                f.formula,
                f.manaCost,
                f.description
            ))
            .toList();
    }
    
    private void initializeFormulas() {
        // Sorts de base
        addFormula(new SimpleFormula("teleport_hero", "Téléportation Héros", 
            "TELEPORT_HERO", "TELEPORT", 20, 0, null, null, 0,
            "Téléporte un héros à une destination"));
        
        addFormula(new SimpleFormula("fireball", "Boule de Feu",
            "FIREBALL", "DAMAGE", 30, 50, null, null, 0,
            "Lance une boule de feu infligeant 50 dégâts"));
        
        addFormula(new SimpleFormula("heal", "Soin",
            "HEAL", "HEAL", 15, 30, null, null, 0,
            "Soigne la cible de 30 points de vie"));
        
        addFormula(new SimpleFormula("summon_dragon", "Invocation Dragon",
            "SUMMON_DRAGON", "SUMMON", 100, 1, "Dragon", null, 0,
            "Invoque un puissant dragon"));
        
        addFormula(new SimpleFormula("haste", "Hâte",
            "HASTE", "BUFF", 25, 0, null, "speed", 3,
            "Augmente la vitesse pour 3 tours"));
        
        // Sorts des héros spécifiques
        addFormula(new SimpleFormula("zen_collapse", "Zen Collapse",
            "ZEN_COLLAPSE", "SPECIAL", 40, 0, null, null, 0,
            "The Dude calme le stress causal"));
        
        addFormula(new SimpleFormula("kill_process", "Kill Process",
            "KILL_PROCESS", "DAMAGE", 60, 100, null, null, 0,
            "Vince Vega exécute un processus ennemi"));
        
        addFormula(new SimpleFormula("enforcement_protocol", "Enforcement Protocol",
            "ENFORCEMENT_PROTOCOL", "BUFF", 50, 0, null, "defense", 5,
            "Walter renforce les règles de réalité"));
    }
    
    private void addFormula(SimpleFormula formula) {
        formulas.put(formula.formula, formula);
    }
    
    private String extractFormulaKey(String formula) {
        // Extraire le nom de la formule (ex: "TELEPORT_HERO" de "TELEPORT_HERO(Arthur, @10,10)")
        int parenIndex = formula.indexOf('(');
        if (parenIndex > 0) {
            return formula.substring(0, parenIndex).trim();
        }
        return formula.trim();
    }
    
    private Integer getCasterMana(String casterId) {
        // Simuler la récupération du mana du lanceur
        return 100; // Par défaut
    }
    
    private record SimpleFormula(
        String id,
        String name,
        String formula,
        String effect,
        int manaCost,
        int value,
        String summonType,
        String buffType,
        int duration,
        String description
    ) {}
}