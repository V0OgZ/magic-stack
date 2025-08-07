package com.magicstack.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.time.Instant;
import java.util.concurrent.CompletableFuture;

/**
 * 🌟⚖️🕵️ TRINITY REGULATION SERVICE 🕵️⚖️🌟
 * 
 * Service ultime combinant les 3 régulateurs IA pour l'équilibrage parfait.
 * Sort Trinity : Anna Martel + Juge Temporel + Chasseur de Paradoxes
 * 
 * Responsabilités:
 * - Orchestration des 3 agents régulateurs
 * - Analyse globale de l'état du jeu
 * - Décisions de régulation coordonnées
 * - Sort ultime "Trinity Regulation"
 * - Maintien de l'harmonie parfaite
 * 
 * @author MERLIN L'ÉTERNEL TRANSCENDANT
 * @version 1.0 - Finale Heroes of Time
 */
@Service
@Slf4j
public class TrinityRegulationService {

    @Autowired
    private TemporalJudgeService temporalJudge;
    
    @Autowired
    private ParadoxHunterService paradoxHunter;
    
    // Anna Martel sera injectée quand disponible
    // @Autowired
    // private DecaySystemService annaMartel;

    // Seuils pour le sort Trinity
    private static final double TRINITY_ACTIVATION_THRESHOLD = 0.8;
    private static final long TRINITY_COOLDOWN_MS = 60000; // 1 minute
    private static final int TRINITY_MAX_USES_PER_SESSION = 3;

    // État du système Trinity
    private long lastTrinityActivation = 0;
    private int trinityUsesThisSession = 0;
    private boolean trinityActive = false;
    
    // Statistiques Trinity
    private long totalTrinityActivations = 0;
    private long successfulRegulations = 0;

    /**
     * État global du système pour analyse Trinity
     */
    public static class SystemState {
        public double globalBalance;
        public double temporalCoherence;
        public double decayLevel;
        public int activeParadoxes;
        public int playersNeedingRegulation;
        public double overallHealth;
        public long timestamp;
        
        public SystemState() {
            this.timestamp = Instant.now().toEpochMilli();
        }
    }

    /**
     * Décision de régulation Trinity
     */
    public static class TrinityDecision {
        public boolean shouldActivate;
        public String reason;
        public List<RegulationAction> actions;
        public double expectedImpact;
        public Map<String, Object> parameters;
        
        public TrinityDecision() {
            this.actions = new ArrayList<>();
            this.parameters = new HashMap<>();
        }
    }

    public static class RegulationAction {
        public String agentName;
        public String actionType;
        public String target;
        public Map<String, Object> parameters;
        
        public RegulationAction(String agent, String action, String target) {
            this.agentName = agent;
            this.actionType = action;
            this.target = target;
            this.parameters = new HashMap<>();
        }
    }

    /**
     * Analyse l'état global du système et décide si Trinity doit intervenir
     */
    public TrinityDecision analyzeSystemState() {
        log.debug("🌟 Trinity - Analyse de l'état global du système");
        
        SystemState state = gatherSystemState();
        TrinityDecision decision = new TrinityDecision();
        
        // Vérifier les conditions d'activation
        if (!canActivateTrinity()) {
            decision.shouldActivate = false;
            decision.reason = "Trinity en cooldown ou limite d'usage atteinte";
            return decision;
        }

        // Analyser la santé globale
        if (state.overallHealth < TRINITY_ACTIVATION_THRESHOLD) {
            decision.shouldActivate = true;
            decision.reason = String.format("Santé système critique: %.2f%%", state.overallHealth * 100);
            decision.expectedImpact = 1.0 - state.overallHealth;
            
            // Planifier les actions coordonnées
            planCoordinatedActions(state, decision);
        }

        return decision;
    }

    /**
     * Rassemble l'état de tous les sous-systèmes
     */
    private SystemState gatherSystemState() {
        SystemState state = new SystemState();
        
        try {
            // Données du Juge Temporel
            Map<String, Object> judgeStats = temporalJudge.getRegulatorStats();
            state.globalBalance = calculateBalanceScore(judgeStats);
            state.playersNeedingRegulation = ((Number) judgeStats.getOrDefault("playersMonitored", 0)).intValue();
            
            // Données du Chasseur de Paradoxes
            Map<String, Object> hunterStats = paradoxHunter.getHunterStats();
            state.temporalCoherence = calculateCoherenceScore(hunterStats);
            state.activeParadoxes = ((Number) hunterStats.getOrDefault("activeParadoxes", 0)).intValue();
            
            // Données d'Anna Martel (simulées pour l'instant)
            state.decayLevel = simulateDecayLevel();
            
            // Calculer la santé globale
            state.overallHealth = calculateOverallHealth(state);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la collecte de l'état système: {}", e.getMessage());
            state.overallHealth = 0.5; // État neutre en cas d'erreur
        }
        
        return state;
    }

    /**
     * Calcule le score d'équilibrage basé sur les stats du Juge
     */
    private double calculateBalanceScore(Map<String, Object> judgeStats) {
        double successRate = ((Number) judgeStats.getOrDefault("successRate", 1.0)).doubleValue();
        int totalRegulations = ((Number) judgeStats.getOrDefault("totalRegulations", 0)).intValue();
        
        // Plus il y a de régulations, plus le déséquilibre est élevé
        double regulationPenalty = Math.min(0.5, totalRegulations * 0.01);
        return Math.max(0.0, successRate - regulationPenalty);
    }

    /**
     * Calcule le score de cohérence temporelle
     */
    private double calculateCoherenceScore(Map<String, Object> hunterStats) {
        double resolutionRate = ((Number) hunterStats.getOrDefault("resolutionRate", 1.0)).doubleValue();
        int activeParadoxes = ((Number) hunterStats.getOrDefault("activeParadoxes", 0)).intValue();
        
        // Pénalité pour les paradoxes non résolus
        double paradoxPenalty = Math.min(0.3, activeParadoxes * 0.05);
        return Math.max(0.0, resolutionRate - paradoxPenalty);
    }

    /**
     * Simule le niveau de decay (en attendant Anna Martel)
     */
    private double simulateDecayLevel() {
        // Simulation basée sur le temps et l'activité
        long currentTime = Instant.now().toEpochMilli();
        double timeBasedDecay = (currentTime % 100000) / 100000.0;
        return Math.max(0.0, Math.min(1.0, 0.8 - timeBasedDecay));
    }

    /**
     * Calcule la santé globale du système
     */
    private double calculateOverallHealth(SystemState state) {
        double weights[] = {0.4, 0.3, 0.3}; // Balance, Cohérence, Decay
        double scores[] = {state.globalBalance, state.temporalCoherence, state.decayLevel};
        
        double weightedSum = 0.0;
        for (int i = 0; i < weights.length; i++) {
            weightedSum += weights[i] * scores[i];
        }
        
        // Pénalités pour problèmes actifs
        double paradoxPenalty = Math.min(0.2, state.activeParadoxes * 0.05);
        double regulationPenalty = Math.min(0.1, state.playersNeedingRegulation * 0.02);
        
        return Math.max(0.0, weightedSum - paradoxPenalty - regulationPenalty);
    }

    /**
     * Planifie les actions coordonnées des 3 régulateurs
     */
    private void planCoordinatedActions(SystemState state, TrinityDecision decision) {
        // Action du Juge Temporel
        if (state.globalBalance < 0.6) {
            RegulationAction judgeAction = new RegulationAction("TemporalJudge", "GLOBAL_REBALANCE", "ALL_PLAYERS");
            judgeAction.parameters.put("severity", 1.0 - state.globalBalance);
            decision.actions.add(judgeAction);
        }
        
        // Action du Chasseur de Paradoxes
        if (state.activeParadoxes > 0) {
            RegulationAction hunterAction = new RegulationAction("ParadoxHunter", "RESOLVE_ALL_PARADOXES", "SYSTEM");
            hunterAction.parameters.put("forceResolution", true);
            decision.actions.add(hunterAction);
        }
        
        // Action d'Anna Martel (simulée)
        if (state.decayLevel < 0.5) {
            RegulationAction annaAction = new RegulationAction("AnnaMartel", "ENTROPY_REGULATION", "SYSTEM");
            annaAction.parameters.put("targetDecayLevel", 0.7);
            decision.actions.add(annaAction);
        }
        
        // Action Trinity spéciale si situation critique
        if (state.overallHealth < 0.5) {
            RegulationAction trinityAction = new RegulationAction("Trinity", "EMERGENCY_RESET", "SYSTEM");
            trinityAction.parameters.put("resetLevel", "PARTIAL");
            decision.actions.add(trinityAction);
        }
    }

    /**
     * Vérifie si Trinity peut être activé (cooldown, limites)
     */
    private boolean canActivateTrinity() {
        long currentTime = Instant.now().toEpochMilli();
        
        // Vérifier le cooldown
        if ((currentTime - lastTrinityActivation) < TRINITY_COOLDOWN_MS) {
            return false;
        }
        
        // Vérifier la limite d'usage par session
        if (trinityUsesThisSession >= TRINITY_MAX_USES_PER_SESSION) {
            return false;
        }
        
        return true;
    }

    /**
     * Active le sort Trinity et exécute les régulations coordonnées
     */
    public CompletableFuture<Boolean> activateTrinity(String reason) {
        return CompletableFuture.supplyAsync(() -> {
            log.info("🌟 ACTIVATION TRINITY REGULATION - Raison: {}", reason);
            
            trinityActive = true;
            lastTrinityActivation = Instant.now().toEpochMilli();
            trinityUsesThisSession++;
            totalTrinityActivations++;
            
            try {
                // Analyser et planifier
                TrinityDecision decision = analyzeSystemState();
                
                if (!decision.shouldActivate) {
                    log.info("🤔 Trinity analysé mais pas d'action nécessaire");
                    trinityActive = false;
                    return true;
                }
                
                // Exécuter les actions coordonnées
                boolean success = executeCoordinatedActions(decision.actions);
                
                if (success) {
                    successfulRegulations++;
                    log.info("✅ TRINITY REGULATION RÉUSSIE - Actions: {}", decision.actions.size());
                } else {
                    log.warn("⚠️ TRINITY REGULATION PARTIELLE - Certaines actions ont échoué");
                }
                
                trinityActive = false;
                return success;
                
            } catch (Exception e) {
                log.error("❌ Erreur lors de l'activation Trinity: {}", e.getMessage());
                trinityActive = false;
                return false;
            }
        });
    }

    /**
     * Exécute les actions coordonnées des régulateurs
     */
    private boolean executeCoordinatedActions(List<RegulationAction> actions) {
        boolean allSuccess = true;
        
        for (RegulationAction action : actions) {
            try {
                boolean actionSuccess = executeAction(action);
                if (!actionSuccess) {
                    allSuccess = false;
                }
                
                log.debug("🔧 Action Trinity: {} - {} -> {}", 
                         action.agentName, action.actionType, actionSuccess ? "✅" : "❌");
                
            } catch (Exception e) {
                log.error("❌ Erreur action {}: {}", action.actionType, e.getMessage());
                allSuccess = false;
            }
        }
        
        return allSuccess;
    }

    /**
     * Exécute une action spécifique d'un régulateur
     */
    private boolean executeAction(RegulationAction action) {
        switch (action.agentName) {
            case "TemporalJudge":
                return executeJudgeAction(action);
            case "ParadoxHunter":
                return executeHunterAction(action);
            case "AnnaMartel":
                return executeAnnaAction(action);
            case "Trinity":
                return executeTrinityAction(action);
            default:
                log.warn("⚠️ Agent inconnu: {}", action.agentName);
                return false;
        }
    }

    /**
     * Exécute une action du Juge Temporel
     */
    private boolean executeJudgeAction(RegulationAction action) {
        switch (action.actionType) {
            case "GLOBAL_REBALANCE":
                // Réinitialiser les métriques pour un rééquilibrage global
                temporalJudge.resetMetrics();
                log.info("⚖️ Juge Temporel: Rééquilibrage global appliqué");
                return true;
            default:
                return false;
        }
    }

    /**
     * Exécute une action du Chasseur de Paradoxes
     */
    private boolean executeHunterAction(RegulationAction action) {
        switch (action.actionType) {
            case "RESOLVE_ALL_PARADOXES":
                // Forcer la résolution de tous les paradoxes actifs
                Collection<ParadoxHunterService.ParadoxAlert> paradoxes = paradoxHunter.getActiveParadoxes();
                int resolved = 0;
                for (ParadoxHunterService.ParadoxAlert paradox : paradoxes) {
                    if (paradoxHunter.forceResolveParadox(paradox.paradoxId)) {
                        resolved++;
                    }
                }
                log.info("🕵️ Chasseur de Paradoxes: {} paradoxes résolus", resolved);
                return resolved > 0;
            default:
                return false;
        }
    }

    /**
     * Exécute une action d'Anna Martel (simulée)
     */
    private boolean executeAnnaAction(RegulationAction action) {
        switch (action.actionType) {
            case "ENTROPY_REGULATION":
                // Simulation de régulation d'entropie
                log.info("🌀 Anna Martel: Régulation d'entropie appliquée (simulée)");
                return true;
            default:
                return false;
        }
    }

    /**
     * Exécute une action Trinity spéciale
     */
    private boolean executeTrinityAction(RegulationAction action) {
        switch (action.actionType) {
            case "EMERGENCY_RESET":
                // Reset partiel du système en cas d'urgence
                temporalJudge.resetMetrics();
                paradoxHunter.resetMetrics();
                log.warn("🚨 Trinity: Reset d'urgence du système appliqué");
                return true;
            default:
                return false;
        }
    }

    /**
     * Obtient les statistiques Trinity
     */
    public Map<String, Object> getTrinityStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalActivations", totalTrinityActivations);
        stats.put("successfulRegulations", successfulRegulations);
        stats.put("usesThisSession", trinityUsesThisSession);
        stats.put("maxUsesPerSession", TRINITY_MAX_USES_PER_SESSION);
        stats.put("isActive", trinityActive);
        stats.put("canActivate", canActivateTrinity());
        stats.put("lastActivation", lastTrinityActivation);
        stats.put("cooldownRemaining", Math.max(0, TRINITY_COOLDOWN_MS - (Instant.now().toEpochMilli() - lastTrinityActivation)));
        
        // État du système actuel
        SystemState currentState = gatherSystemState();
        stats.put("systemHealth", currentState.overallHealth);
        stats.put("globalBalance", currentState.globalBalance);
        stats.put("temporalCoherence", currentState.temporalCoherence);
        stats.put("decayLevel", currentState.decayLevel);
        
        return stats;
    }

    /**
     * Reset des métriques Trinity (pour tests)
     */
    public void resetTrinityMetrics() {
        log.info("🔄 Reset métriques Trinity");
        trinityUsesThisSession = 0;
        totalTrinityActivations = 0;
        successfulRegulations = 0;
        lastTrinityActivation = 0;
        trinityActive = false;
    }

    /**
     * Formule temporelle Trinity ultime
     */
    public String getTrinityFormula() {
        return "🌟 ⚖️(équilibre) + 🕵️(cohérence) + 🌀(entropie) → Δt+0(harmonie_parfaite)";
    }
}