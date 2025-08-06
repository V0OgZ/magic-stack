package com.magicstack.service;

import com.magicstack.model.NarrativeEvent;
import com.magicstack.model.ChoiceResult;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🧠 INTERSTICE SERVICE
 * Logique narrative et mécanique temporelle
 * Dimension 1 Littéraire: Chaque choix tisse la trame du temps
 */
@Service
public class IntersticeService {

    private final Map<String, NarrativeEvent> activeEvents = new ConcurrentHashMap<>();
    private final Map<String, Map<String, Object>> heroTimelines = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public NarrativeEvent createNarrativeEvent(Map<String, Object> eventData) {
        String eventId = "event_" + System.currentTimeMillis();
        String eventType = (String) eventData.get("event_type");
        String hero = (String) eventData.get("hero");
        
        NarrativeEvent event = new NarrativeEvent();
        event.setEventId(eventId);
        event.setEventType(eventType);
        event.setHero(hero);
        event.setLocation((Map<String, Object>) eventData.get("location"));
        
        // Générer événement selon le type
        switch (eventType.toLowerCase()) {
            case "temporal_anomaly":
                generateTemporalAnomalyEvent(event);
                break;
            case "causality_breach":
                generateCausalityBreachEvent(event);
                break;
            case "memory_fragment":
                generateMemoryFragmentEvent(event);
                break;
            case "timeline_convergence":
                generateTimelineConvergenceEvent(event);
                break;
            default:
                generateGenericEvent(event, eventType);
                break;
        }
        
        activeEvents.put(eventId, event);
        
        System.out.println("🧠 Événement narratif créé: " + event.getTitle());
        return event;
    }

    public ChoiceResult processChoice(Map<String, Object> choiceData) {
        String eventId = (String) choiceData.get("event_id");
        String choice = (String) choiceData.get("choice");
        String hero = (String) choiceData.get("hero");
        
        NarrativeEvent event = activeEvents.get(eventId);
        if (event == null) {
            throw new RuntimeException("Événement introuvable: " + eventId);
        }
        
        ChoiceResult result = new ChoiceResult();
        result.setEventId(eventId);
        result.setChoiceMade(choice);
        result.setHero(hero);
        
        // Traiter le choix selon l'événement
        processChoiceByEventType(event, choice, result);
        
        // Mettre à jour la timeline du héros
        updateHeroTimeline(hero, event, result);
        
        // Marquer l'événement comme résolu
        activeEvents.remove(eventId);
        
        System.out.println("🎯 Choix traité: " + choice + " -> " + result.getConsequence());
        
        return result;
    }

    public Map<String, Object> getHeroTimeline(String heroId) {
        Map<String, Object> timeline = heroTimelines.getOrDefault(heroId, createDefaultTimeline(heroId));
        
        System.out.println("📊 Timeline récupérée pour: " + heroId);
        return timeline;
    }

    public Map<String, Object> performTemporalJump(Map<String, Object> jumpData) {
        String hero = (String) jumpData.get("hero");
        String originTime = (String) jumpData.get("origin_time");
        String destinationTime = (String) jumpData.get("destination_time");
        
        Map<String, Object> result = new HashMap<>();
        
        // Calculer le coût de causalité
        int causalityCost = calculateCausalityCost(originTime, destinationTime);
        boolean jumpSuccessful = causalityCost <= 100; // Limite arbitraire
        
        result.put("jump_successful", jumpSuccessful);
        result.put("origin_time", originTime);
        result.put("destination_time", destinationTime);
        result.put("causality_cost", causalityCost);
        result.put("timeline_stability", jumpSuccessful ? "STABLE" : "UNSTABLE");
        
        if (jumpSuccessful) {
            result.put("narrative_consequence", generateJumpNarrative(hero, originTime, destinationTime));
            result.put("available_actions", generateJumpActions(destinationTime));
        } else {
            result.put("narrative_consequence", "🌀 Le saut temporel échoue! La causalité résiste...");
            result.put("available_actions", Arrays.asList("Attendre", "Essayer plus tard"));
        }
        
        System.out.println("⏰ Saut temporel: " + originTime + " -> " + destinationTime + " (coût: " + causalityCost + ")");
        
        return result;
    }

    public Map<String, Object> getCausalityWeb(String heroId) {
        Map<String, Object> web = new HashMap<>();
        
        // Générer la toile causale
        List<Map<String, Object>> nodes = generateCausalityNodes(heroId);
        List<Map<String, Object>> connections = generateTemporalConnections(heroId);
        List<String> butterflyEffects = generateButterflyEffects(heroId);
        List<String> paradoxRisks = generateParadoxRisks(heroId);
        double stabilityIndex = calculateStabilityIndex(heroId);
        
        web.put("causality_nodes", nodes);
        web.put("temporal_connections", connections);
        web.put("butterfly_effects", butterflyEffects);
        web.put("paradox_risks", paradoxRisks);
        web.put("stability_index", stabilityIndex);
        
        System.out.println("🕸️ Toile causale générée pour: " + heroId + " (stabilité: " + stabilityIndex + ")");
        
        return web;
    }

    public Map<String, Object> createMemoryTattoo(Map<String, Object> tattooData) {
        String hero = (String) tattooData.get("hero");
        String memory = (String) tattooData.get("memory");
        String temporalAnchor = (String) tattooData.get("temporal_anchor");
        
        String tattooId = "tattoo_" + System.currentTimeMillis();
        
        Map<String, Object> result = new HashMap<>();
        result.put("tattoo_id", tattooId);
        result.put("memory_encoded", memory);
        result.put("temporal_anchor", temporalAnchor);
        result.put("causality_protection", "ACTIVE");
        result.put("narrative_power", generateTattooPower(memory));
        
        System.out.println("🔮 Tatouage mémoriel créé: " + tattooId + " pour " + hero);
        
        return result;
    }

    public Map<String, Object> castMagicalFormula(Map<String, Object> formulaData) {
        String caster = (String) formulaData.get("caster");
        String formula = (String) formulaData.get("formula");
        String context = (String) formulaData.get("context");
        Integer energyCost = (Integer) formulaData.getOrDefault("energy_cost", 30);
        
        Map<String, Object> result = new HashMap<>();
        result.put("formula", formula);
        result.put("caster", caster);
        result.put("context", context);
        result.put("energy_consumed", energyCost);
        
        // Analyser et traiter la formule selon son type
        if (formula.contains("⊙(temps)") && formula.contains("†ψ(présent)")) {
            processTimeFreeze(formulaData, result);
        } else if (formula.contains("Π(paradoxe)") && formula.contains("ℬ7(branches)")) {
            processParadoxResolution(formulaData, result);
        } else if (formula.contains("⊙(héros)") && formula.contains("†ψ(fusion)")) {
            processUltimateVictory(formulaData, result);
        } else if (formula.contains("LEGENDARY_STRIKE")) {
            processLegendaryStrike(formulaData, result);
        } else if (formula.contains("MODIFY_ENERGY")) {
            processEnergyModification(formulaData, result);
        } else if (formula.contains("AREA_DAMAGE")) {
            processAreaDamage(formulaData, result);
        } else if (formula.contains("TELEPORT_HERO")) {
            processTeleportation(formulaData, result);
        } else {
            processGenericFormula(formulaData, result);
        }
        
        System.out.println("⚡ Formule magique traitée: " + formula + " par " + caster);
        return result;
    }
    
    private void processTimeFreeze(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "TIME_FREEZE");
        result.put("power_level", "MODERATE");
        result.put("narrative", "⏰ " + caster + " fige le moment présent! Le temps s'arrête autour de lui, créant une bulle temporelle!");
        result.put("temporal_impact", "LOCAL_TIME_STOP");
        result.put("reality_altered", true);
        result.put("timeline_affected", false);
        result.put("duration", "30_seconds");
    }
    
    private void processParadoxResolution(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "PARADOX_RESOLUTION");
        result.put("power_level", "HIGH");
        result.put("narrative", "🌀 " + caster + " résout les paradoxes temporels! Les branches conflictuelles se fusionnent harmonieusement!");
        result.put("temporal_impact", "PARADOX_ELIMINATED");
        result.put("reality_altered", true);
        result.put("timeline_affected", true);
        result.put("branches_resolved", 7);
        result.put("stability_gained", 0.8);
    }
    
    private void processUltimateVictory(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "ULTIMATE_VICTORY");
        result.put("power_level", "LEGENDARY");
        result.put("narrative", "🌟 " + caster + " unifie toutes les timelines! Un pouvoir cosmique émane de lui, forgeant la victoire ultime!");
        result.put("temporal_impact", "TIMELINE_CONVERGENCE");
        result.put("reality_altered", true);
        result.put("timeline_affected", true);
        result.put("victory_achieved", true);
        result.put("cosmic_power", true);
    }
    
    private void processLegendaryStrike(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "LEGENDARY_STRIKE");
        result.put("power_level", "LEGENDARY");
        result.put("narrative", "⚔️ " + caster + " déchaîne une frappe légendaire! La réalité tremble sous la puissance divine!");
        result.put("temporal_impact", "REALITY_CUT");
        result.put("reality_altered", true);
        result.put("timeline_affected", false);
        result.put("damage", 100);
        result.put("divine_light", true);
    }
    
    private void processEnergyModification(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "ENERGY_MODIFICATION");
        result.put("power_level", "MODERATE");
        result.put("narrative", "✨ " + caster + " manipule l'énergie vitale! Les flux magiques se réorganisent selon sa volonté!");
        result.put("temporal_impact", "ENERGY_FLOW_ALTERED");
        result.put("reality_altered", false);
        result.put("timeline_affected", false);
        result.put("energy_modified", 50);
        result.put("healing_glow", true);
    }
    
    private void processAreaDamage(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "AREA_DAMAGE");
        result.put("power_level", "HIGH");
        result.put("narrative", "🔥 " + caster + " déchaîne une explosion destructrice! Les flammes magiques ravagent tout sur leur passage!");
        result.put("temporal_impact", "LOCALIZED_DESTRUCTION");
        result.put("reality_altered", false);
        result.put("timeline_affected", false);
        result.put("damage", 40);
        result.put("area_radius", 2);
        result.put("fire_explosion", true);
    }
    
    private void processTeleportation(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        
        result.put("effect", "TELEPORTATION");
        result.put("power_level", "MODERATE");
        result.put("narrative", "🌀 " + caster + " se téléporte instantanément! L'espace se plie à sa volonté!");
        result.put("temporal_impact", "SPACE_FOLDING");
        result.put("reality_altered", false);
        result.put("timeline_affected", false);
        result.put("teleport_flash", true);
        result.put("instant_travel", true);
    }
    
    private void processGenericFormula(Map<String, Object> formulaData, Map<String, Object> result) {
        String caster = (String) formulaData.get("caster");
        String formula = (String) formulaData.get("formula");
        
        result.put("effect", "GENERIC_MAGIC");
        result.put("power_level", "MODERATE");
        result.put("narrative", "⚡ " + caster + " lance une formule mystérieuse! L'énergie magique crépite dans l'air!");
        result.put("temporal_impact", "MINOR_DISTURBANCE");
        result.put("reality_altered", false);
        result.put("timeline_affected", false);
        result.put("magic_energy", true);
        
        // Analyser les symboles dans la formule pour plus de détails
        if (formula.contains("⊙")) {
            result.put("circle_power", true);
        }
        if (formula.contains("ψ")) {
            result.put("psi_energy", true);
        }
        if (formula.contains("∆")) {
            result.put("delta_change", true);
        }
    }

    // === MÉTHODES PRIVÉES ===

    private void generateTemporalAnomalyEvent(NarrativeEvent event) {
        event.setTitle("⏰ Anomalie Temporelle Détectée");
        event.setDescription("L'espace-temps se distord devant vous. Des échos du passé et du futur se mélangent, créant une brèche dans la causalité.");
        
        List<Map<String, Object>> choices = Arrays.asList(
            createChoice("investigate", "🔍 Investiguer l'anomalie", "RISQUÉ", "Peut révéler des secrets temporels"),
            createChoice("bypass", "🚶 Contourner prudemment", "SÛR", "Évite les complications mais perd l'opportunité"),
            createChoice("wiener_eye", "👁️ Utiliser l'Œil de Wiener", "PUISSANT", "Force l'observation et collapse les possibilités")
        );
        
        event.setChoices(choices);
        event.setTimelineImpact("MODERATE");
    }

    private void generateCausalityBreachEvent(NarrativeEvent event) {
        event.setTitle("🌀 Brèche Causale");
        event.setDescription("La trame du temps s'effiloche. Vos actions passées créent des ondulations qui menacent la stabilité de votre timeline.");
        
        List<Map<String, Object>> choices = Arrays.asList(
            createChoice("repair", "🔧 Réparer la brèche", "TECHNIQUE", "Restaure la stabilité temporelle"),
            createChoice("exploit", "⚡ Exploiter la brèche", "OPPORTUNISTE", "Gagne du pouvoir mais déstabilise davantage"),
            createChoice("ignore", "🙈 Ignorer et continuer", "NÉGLIGENT", "Laisse le problème s'aggraver")
        );
        
        event.setChoices(choices);
        event.setTimelineImpact("HIGH");
    }

    private void generateMemoryFragmentEvent(NarrativeEvent event) {
        event.setTitle("💭 Fragment de Mémoire");
        event.setDescription("Un souvenir oublié refait surface, porteur d'une vérité sur votre passé. Cette révélation pourrait changer votre compréhension du monde.");
        
        List<Map<String, Object>> choices = Arrays.asList(
            createChoice("embrace", "🤗 Embrasser le souvenir", "ÉMOTIONNEL", "Intègre la mémoire et gagne en sagesse"),
            createChoice("resist", "🛡️ Résister au souvenir", "DÉFENSIF", "Préserve votre identité actuelle"),
            createChoice("tattoo", "🔮 Encoder en tatouage", "MAGIQUE", "Transforme la mémoire en pouvoir permanent")
        );
        
        event.setChoices(choices);
        event.setTimelineImpact("PERSONAL");
    }

    private void generateTimelineConvergenceEvent(NarrativeEvent event) {
        event.setTitle("🌐 Convergence des Timelines");
        event.setDescription("Plusieurs versions de vous-même se rencontrent en ce point temporel. Cette convergence rare offre des possibilités uniques.");
        
        List<Map<String, Object>> choices = Arrays.asList(
            createChoice("merge", "🔄 Fusionner les timelines", "INTÉGRATIF", "Combine les expériences mais risque la confusion"),
            createChoice("choose", "👤 Choisir une timeline", "SÉLECTIF", "Garde une version pure mais perd les autres"),
            createChoice("stabilize", "⚖️ Stabiliser la convergence", "ÉQUILIBRÉ", "Maintient l'équilibre entre toutes les versions")
        );
        
        event.setChoices(choices);
        event.setTimelineImpact("EXTREME");
    }

    private void generateGenericEvent(NarrativeEvent event, String eventType) {
        event.setTitle("⚡ Événement: " + eventType);
        event.setDescription("Un événement narratif se présente, offrant des choix qui façonneront votre destinée.");
        
        List<Map<String, Object>> choices = Arrays.asList(
            createChoice("action1", "⚔️ Action courageuse", "HÉROÏQUE", "Affronte le défi de front"),
            createChoice("action2", "🧠 Approche réfléchie", "SAGE", "Analyse avant d'agir"),
            createChoice("action3", "🌟 Solution créative", "INNOVANT", "Trouve une alternative inattendue")
        );
        
        event.setChoices(choices);
        event.setTimelineImpact("MODERATE");
    }

    private Map<String, Object> createChoice(String id, String text, String type, String description) {
        Map<String, Object> choice = new HashMap<>();
        choice.put("id", id);
        choice.put("text", text);
        choice.put("type", type);
        choice.put("description", description);
        return choice;
    }

    private void processChoiceByEventType(NarrativeEvent event, String choice, ChoiceResult result) {
        switch (event.getEventType().toLowerCase()) {
            case "temporal_anomaly":
                processTemporalAnomalyChoice(choice, result);
                break;
            case "causality_breach":
                processCausalityBreachChoice(choice, result);
                break;
            case "memory_fragment":
                processMemoryFragmentChoice(choice, result);
                break;
            case "timeline_convergence":
                processTimelineConvergenceChoice(choice, result);
                break;
            default:
                processGenericChoice(choice, result);
                break;
        }
    }

    private void processTemporalAnomalyChoice(String choice, ChoiceResult result) {
        switch (choice.toLowerCase()) {
            case "investigate":
                result.setConsequence("REVELATION");
                result.setNarrativeText("🔍 Vous plongez dans l'anomalie et découvrez un fragment de futur alternatif!");
                result.setUnlockedAbilities(Arrays.asList("Vision Temporelle", "Écho du Futur"));
                result.setTimelineChanged(false);
                break;
            case "bypass":
                result.setConsequence("SAFETY");
                result.setNarrativeText("🚶 Vous contournez prudemment l'anomalie, préservant votre timeline.");
                result.setUnlockedAbilities(Arrays.asList("Prudence Temporelle"));
                result.setTimelineChanged(false);
                break;
            case "wiener_eye":
                result.setConsequence("COLLAPSE");
                result.setNarrativeText("👁️ L'Œil de Wiener force l'observation! La réalité se fixe selon votre volonté!");
                result.setUnlockedAbilities(Arrays.asList("Collapse Quantique", "Maîtrise Causale"));
                result.setTimelineChanged(true);
                result.setNewTimelineId("timeline_collapsed_" + System.currentTimeMillis());
                break;
        }
    }

    private void processCausalityBreachChoice(String choice, ChoiceResult result) {
        switch (choice.toLowerCase()) {
            case "repair":
                result.setConsequence("RESTORATION");
                result.setNarrativeText("🔧 Vous réparez habilement la brèche causale, restaurant l'ordre temporel.");
                result.setUnlockedAbilities(Arrays.asList("Réparation Temporelle", "Stabilité Causale"));
                result.setTimelineChanged(false);
                break;
            case "exploit":
                result.setConsequence("POWER");
                result.setNarrativeText("⚡ Vous exploitez la brèche pour gagner en pouvoir, mais la timeline se fragilise!");
                result.setUnlockedAbilities(Arrays.asList("Manipulation Causale", "Pouvoir Temporel"));
                result.setTimelineChanged(true);
                result.setNewTimelineId("timeline_exploited_" + System.currentTimeMillis());
                break;
            case "ignore":
                result.setConsequence("DEGRADATION");
                result.setNarrativeText("🙈 Vous ignorez la brèche... Les conséquences se feront sentir plus tard.");
                result.setUnlockedAbilities(Arrays.asList("Dette Causale"));
                result.setTimelineChanged(false);
                break;
        }
    }

    private void processMemoryFragmentChoice(String choice, ChoiceResult result) {
        switch (choice.toLowerCase()) {
            case "embrace":
                result.setConsequence("WISDOM");
                result.setNarrativeText("🤗 Vous embrassez le souvenir, gagnant en sagesse et en compréhension.");
                result.setUnlockedAbilities(Arrays.asList("Sagesse Ancienne", "Mémoire Parfaite"));
                result.setTimelineChanged(false);
                break;
            case "resist":
                result.setConsequence("PRESERVATION");
                result.setNarrativeText("🛡️ Vous résistez au souvenir, préservant votre identité actuelle.");
                result.setUnlockedAbilities(Arrays.asList("Résistance Mentale", "Identité Stable"));
                result.setTimelineChanged(false);
                break;
            case "tattoo":
                result.setConsequence("ENCODING");
                result.setNarrativeText("🔮 Vous encodez le souvenir en tatouage magique, le transformant en pouvoir!");
                result.setUnlockedAbilities(Arrays.asList("Tatouage Mémoriel", "Pouvoir Narratif"));
                result.setTimelineChanged(false);
                break;
        }
    }

    private void processTimelineConvergenceChoice(String choice, ChoiceResult result) {
        switch (choice.toLowerCase()) {
            case "merge":
                result.setConsequence("FUSION");
                result.setNarrativeText("🔄 Vous fusionnez avec vos autres versions, devenant un être multidimensionnel!");
                result.setUnlockedAbilities(Arrays.asList("Conscience Multiple", "Expérience Combinée"));
                result.setTimelineChanged(true);
                result.setNewTimelineId("timeline_merged_" + System.currentTimeMillis());
                break;
            case "choose":
                result.setConsequence("SELECTION");
                result.setNarrativeText("👤 Vous choisissez votre timeline préférée, sacrifiant les autres versions.");
                result.setUnlockedAbilities(Arrays.asList("Pureté Temporelle", "Choix Définitif"));
                result.setTimelineChanged(true);
                result.setNewTimelineId("timeline_selected_" + System.currentTimeMillis());
                break;
            case "stabilize":
                result.setConsequence("BALANCE");
                result.setNarrativeText("⚖️ Vous stabilisez la convergence, maintenant l'équilibre entre toutes les versions.");
                result.setUnlockedAbilities(Arrays.asList("Équilibre Temporel", "Stabilité Multiple"));
                result.setTimelineChanged(false);
                break;
        }
    }

    private void processGenericChoice(String choice, ChoiceResult result) {
        result.setConsequence("GENERIC_OUTCOME");
        result.setNarrativeText("⚡ Votre choix façonne la réalité de manière subtile mais significative.");
        result.setUnlockedAbilities(Arrays.asList("Expérience Narrative"));
        result.setTimelineChanged(false);
    }

    private void updateHeroTimeline(String hero, NarrativeEvent event, ChoiceResult result) {
        Map<String, Object> timeline = heroTimelines.computeIfAbsent(hero, this::createDefaultTimeline);
        
        // Ajouter l'événement à l'historique
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> history = (List<Map<String, Object>>) timeline.get("timeline_history");
        
        Map<String, Object> eventRecord = new HashMap<>();
        eventRecord.put("event_id", event.getEventId());
        eventRecord.put("event_type", event.getEventType());
        eventRecord.put("choice_made", result.getChoiceMade());
        eventRecord.put("consequence", result.getConsequence());
        eventRecord.put("timestamp", System.currentTimeMillis());
        
        history.add(eventRecord);
        
        // Mettre à jour la timeline actuelle si changée
        if (result.isTimelineChanged()) {
            timeline.put("current_timeline", result.getNewTimelineId());
        }
    }

    private Map<String, Object> createDefaultTimeline(String heroId) {
        Map<String, Object> timeline = new HashMap<>();
        timeline.put("current_timeline", "timeline_origin_" + heroId);
        timeline.put("timeline_history", new ArrayList<>());
        timeline.put("branching_points", new ArrayList<>());
        timeline.put("fixed_events", new ArrayList<>());
        timeline.put("causal_debt", 0);
        return timeline;
    }

    private int calculateCausalityCost(String originTime, String destinationTime) {
        // Calcul simplifié basé sur la différence temporelle
        try {
            long origin = Long.parseLong(originTime.replaceAll("\\D", ""));
            long destination = Long.parseLong(destinationTime.replaceAll("\\D", ""));
            return (int) Math.abs(destination - origin) / 1000; // Coût proportionnel
        } catch (Exception e) {
            return 50; // Coût par défaut
        }
    }

    private String generateJumpNarrative(String hero, String originTime, String destinationTime) {
        return "⏰ " + hero + " traverse le temps de " + originTime + " vers " + destinationTime + ". La réalité se réajuste autour de vous!";
    }

    private List<String> generateJumpActions(String destinationTime) {
        return Arrays.asList(
            "Explorer cette époque",
            "Chercher des alliés temporels",
            "Modifier des événements clés",
            "Retourner au présent"
        );
    }

    private List<Map<String, Object>> generateCausalityNodes(String heroId) {
        List<Map<String, Object>> nodes = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Map<String, Object> node = new HashMap<>();
            node.put("id", "node_" + i);
            node.put("type", "CAUSAL_EVENT");
            node.put("impact", random.nextInt(100));
            node.put("stability", 0.8 + random.nextDouble() * 0.2);
            nodes.add(node);
        }
        return nodes;
    }

    private List<Map<String, Object>> generateTemporalConnections(String heroId) {
        List<Map<String, Object>> connections = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Map<String, Object> connection = new HashMap<>();
            connection.put("from", "node_" + i);
            connection.put("to", "node_" + (i + 1));
            connection.put("strength", 0.5 + random.nextDouble() * 0.5);
            connections.add(connection);
        }
        return connections;
    }

    private List<String> generateButterflyEffects(String heroId) {
        return Arrays.asList(
            "🦋 Votre sourire à un inconnu change sa journée",
            "🦋 Un livre déplacé influence un futur lecteur",
            "🦋 Une décision mineure crée une cascade d'événements"
        );
    }

    private List<String> generateParadoxRisks(String heroId) {
        return Arrays.asList(
            "⚠️ Risque de boucle temporelle si vous rencontrez votre passé",
            "⚠️ Paradoxe du grand-père en cas d'intervention majeure",
            "⚠️ Effondrement causal si trop de modifications simultanées"
        );
    }

    private double calculateStabilityIndex(String heroId) {
        return 0.7 + random.nextDouble() * 0.3; // 70-100% de stabilité
    }

    private String generateTattooPower(String memory) {
        return "💫 Pouvoir narratif: Peut invoquer l'essence de '" + memory + "' pour influencer la réalité";
    }
}