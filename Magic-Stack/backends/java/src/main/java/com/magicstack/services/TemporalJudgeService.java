package com.magicstack.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 🤖⚖️ TEMPORAL JUDGE SERVICE ⚖️🤖
 * 
 * Service régulateur pour maintenir l'équilibre temporel du jeu.
 * Agent IA autonome qui surveille et corrige les déséquilibres.
 * 
 * Responsabilités:
 * - Surveillance des métriques de jeu en temps réel
 * - Détection des déséquilibres (joueurs trop forts/faibles)
 * - Application de corrections automatiques
 * - Maintien de l'équité et du fun factor
 * 
 * @author MERLIN L'ÉTERNEL TRANSCENDANT
 * @version 1.0 - Finale Heroes of Time
 */
@Service
@Slf4j
public class TemporalJudgeService {

    // Seuils d'équilibrage
    private static final double POWER_BALANCE_THRESHOLD = 0.3; // 30% d'écart max
    private static final double WIN_RATE_THRESHOLD = 0.7; // 70% winrate max
    private static final int MIN_GAMES_FOR_ANALYSIS = 5;
    private static final long REGULATION_COOLDOWN_MS = 30000; // 30 secondes

    // Cache des métriques joueurs
    private final Map<String, PlayerMetrics> playerMetricsCache = new ConcurrentHashMap<>();
    private final Map<String, Long> lastRegulationTime = new ConcurrentHashMap<>();
    
    // Statistiques du régulateur
    private long totalRegulations = 0;
    private long successfulRegulations = 0;

    /**
     * Métriques d'un joueur pour l'analyse d'équilibrage
     */
    public static class PlayerMetrics {
        public String playerId;
        public double powerLevel;
        public double winRate;
        public int gamesPlayed;
        public long lastGameTime;
        public List<GameResult> recentGames;
        public Map<String, Integer> spellUsage;
        
        public PlayerMetrics(String playerId) {
            this.playerId = playerId;
            this.recentGames = new ArrayList<>();
            this.spellUsage = new HashMap<>();
            this.lastGameTime = Instant.now().toEpochMilli();
        }
    }

    /**
     * Résultat d'une partie pour l'analyse
     */
    public static class GameResult {
        public boolean won;
        public double finalPower;
        public int turnCount;
        public long timestamp;
        public String opponent;
        
        public GameResult(boolean won, double finalPower, int turnCount, String opponent) {
            this.won = won;
            this.finalPower = finalPower;
            this.turnCount = turnCount;
            this.opponent = opponent;
            this.timestamp = Instant.now().toEpochMilli();
        }
    }

    /**
     * Décision de régulation du Juge Temporel
     */
    public static class RegulationDecision {
        public boolean shouldRegulate;
        public String reason;
        public RegulationType type;
        public double adjustmentFactor;
        public Map<String, Object> parameters;
        
        public RegulationDecision(boolean shouldRegulate, String reason) {
            this.shouldRegulate = shouldRegulate;
            this.reason = reason;
            this.parameters = new HashMap<>();
        }
    }

    public enum RegulationType {
        POWER_NERF,      // Réduire la puissance
        POWER_BUFF,      // Augmenter la puissance
        SPELL_COOLDOWN,  // Modifier les cooldowns
        RESOURCE_ADJUST, // Ajuster les ressources
        DIFFICULTY_SCALE // Ajuster la difficulté des adversaires
    }

    /**
     * Enregistre le résultat d'une partie pour analyse
     */
    public void recordGameResult(String playerId, boolean won, double finalPower, 
                                int turnCount, String opponent, Map<String, Integer> spellsUsed) {
        log.debug("🤖 Juge Temporel - Enregistrement partie: {} (win: {}, power: {})", 
                 playerId, won, finalPower);
        
        PlayerMetrics metrics = playerMetricsCache.computeIfAbsent(playerId, PlayerMetrics::new);
        
        // Ajouter le résultat
        GameResult result = new GameResult(won, finalPower, turnCount, opponent);
        metrics.recentGames.add(result);
        
        // Garder seulement les 20 dernières parties
        if (metrics.recentGames.size() > 20) {
            metrics.recentGames.remove(0);
        }
        
        // Mettre à jour les statistiques
        updatePlayerStatistics(metrics, spellsUsed);
        
        // Vérifier si régulation nécessaire
        RegulationDecision decision = analyzePlayerBalance(playerId, metrics);
        if (decision.shouldRegulate) {
            applyRegulation(playerId, decision);
        }
    }

    /**
     * Met à jour les statistiques d'un joueur
     */
    private void updatePlayerStatistics(PlayerMetrics metrics, Map<String, Integer> spellsUsed) {
        List<GameResult> games = metrics.recentGames;
        if (games.isEmpty()) return;

        // Calculer le winrate
        long wins = games.stream().mapToLong(g -> g.won ? 1 : 0).sum();
        metrics.winRate = (double) wins / games.size();
        
        // Calculer le niveau de puissance moyen
        metrics.powerLevel = games.stream()
                .mapToDouble(g -> g.finalPower)
                .average()
                .orElse(0.0);
        
        metrics.gamesPlayed = games.size();
        metrics.lastGameTime = Instant.now().toEpochMilli();
        
        // Mettre à jour l'usage des sorts
        if (spellsUsed != null) {
            spellsUsed.forEach((spell, count) -> 
                metrics.spellUsage.merge(spell, count, Integer::sum));
        }
    }

    /**
     * Analyse l'équilibre d'un joueur et décide si régulation nécessaire
     */
    public RegulationDecision analyzePlayerBalance(String playerId, PlayerMetrics metrics) {
        if (metrics.gamesPlayed < MIN_GAMES_FOR_ANALYSIS) {
            return new RegulationDecision(false, "Pas assez de données");
        }

        // Vérifier le cooldown de régulation
        Long lastRegulation = lastRegulationTime.get(playerId);
        if (lastRegulation != null && 
            (Instant.now().toEpochMilli() - lastRegulation) < REGULATION_COOLDOWN_MS) {
            return new RegulationDecision(false, "Cooldown régulation actif");
        }

        RegulationDecision decision = new RegulationDecision(false, "Équilibré");

        // Analyser le winrate
        if (metrics.winRate > WIN_RATE_THRESHOLD) {
            decision.shouldRegulate = true;
            decision.reason = String.format("Winrate trop élevé: %.2f%%", metrics.winRate * 100);
            decision.type = RegulationType.POWER_NERF;
            decision.adjustmentFactor = 0.9 - (metrics.winRate - WIN_RATE_THRESHOLD);
            
        } else if (metrics.winRate < (1 - WIN_RATE_THRESHOLD)) {
            decision.shouldRegulate = true;
            decision.reason = String.format("Winrate trop faible: %.2f%%", metrics.winRate * 100);
            decision.type = RegulationType.POWER_BUFF;
            decision.adjustmentFactor = 1.1 + (WIN_RATE_THRESHOLD - metrics.winRate);
        }

        // Analyser le niveau de puissance vs moyenne globale
        double globalAveragePower = calculateGlobalAveragePower();
        double powerRatio = metrics.powerLevel / Math.max(globalAveragePower, 1.0);
        
        if (powerRatio > (1 + POWER_BALANCE_THRESHOLD)) {
            decision.shouldRegulate = true;
            decision.reason += " | Puissance excessive vs moyenne globale";
            decision.type = RegulationType.POWER_NERF;
            
        } else if (powerRatio < (1 - POWER_BALANCE_THRESHOLD)) {
            decision.shouldRegulate = true;
            decision.reason += " | Puissance insuffisante vs moyenne globale";
            decision.type = RegulationType.POWER_BUFF;
        }

        // Analyser l'usage des sorts (détection de spam/exploit)
        analyzeSpellUsagePatterns(metrics, decision);

        return decision;
    }

    /**
     * Analyse les patterns d'usage des sorts pour détecter les exploits
     */
    private void analyzeSpellUsagePatterns(PlayerMetrics metrics, RegulationDecision decision) {
        if (metrics.spellUsage.isEmpty()) return;

        // Détecter le spam d'un sort spécifique
        int totalSpells = metrics.spellUsage.values().stream().mapToInt(Integer::intValue).sum();
        for (Map.Entry<String, Integer> entry : metrics.spellUsage.entrySet()) {
            double spellRatio = (double) entry.getValue() / totalSpells;
            if (spellRatio > 0.6) { // Plus de 60% d'usage d'un seul sort
                decision.shouldRegulate = true;
                decision.reason += " | Spam détecté: " + entry.getKey();
                decision.type = RegulationType.SPELL_COOLDOWN;
                decision.parameters.put("spellToRegulate", entry.getKey());
                decision.parameters.put("cooldownMultiplier", 1.5);
            }
        }
    }

    /**
     * Applique une régulation sur un joueur
     */
    public void applyRegulation(String playerId, RegulationDecision decision) {
        log.info("⚖️ RÉGULATION APPLIQUÉE - Joueur: {} | Type: {} | Raison: {}", 
                playerId, decision.type, decision.reason);

        totalRegulations++;
        lastRegulationTime.put(playerId, Instant.now().toEpochMilli());

        try {
            switch (decision.type) {
                case POWER_NERF:
                    applyPowerAdjustment(playerId, decision.adjustmentFactor);
                    break;
                case POWER_BUFF:
                    applyPowerAdjustment(playerId, decision.adjustmentFactor);
                    break;
                case SPELL_COOLDOWN:
                    applySpellCooldownRegulation(playerId, decision.parameters);
                    break;
                case RESOURCE_ADJUST:
                    applyResourceAdjustment(playerId, decision.adjustmentFactor);
                    break;
                case DIFFICULTY_SCALE:
                    applyDifficultyScaling(playerId, decision.adjustmentFactor);
                    break;
            }
            successfulRegulations++;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'application de la régulation: {}", e.getMessage());
        }
    }

    /**
     * Applique un ajustement de puissance
     */
    private void applyPowerAdjustment(String playerId, double factor) {
        // Formule temporelle pour ajustement de puissance
        log.debug("⚡ Ajustement puissance: {} -> facteur {}", playerId, factor);
        
        // TODO: Intégration avec le système de jeu pour appliquer le modificateur
        // Cette méthode sera connectée au système de combat/sorts
        
        // Pour l'instant, on log l'action
        String action = factor < 1.0 ? "NERF" : "BUFF";
        log.info("🎯 {} appliqué à {} - Facteur: {:.2f}", action, playerId, factor);
    }

    /**
     * Applique une régulation de cooldown sur les sorts
     */
    private void applySpellCooldownRegulation(String playerId, Map<String, Object> parameters) {
        String spell = (String) parameters.get("spellToRegulate");
        Double multiplier = (Double) parameters.get("cooldownMultiplier");
        
        log.info("🕐 Régulation cooldown: {} -> Sort: {} x{}", playerId, spell, multiplier);
        
        // TODO: Intégration avec le système de sorts
    }

    /**
     * Applique un ajustement de ressources
     */
    private void applyResourceAdjustment(String playerId, double factor) {
        log.info("💎 Ajustement ressources: {} -> facteur {}", playerId, factor);
        // TODO: Intégration avec le système de ressources
    }

    /**
     * Applique un scaling de difficulté
     */
    private void applyDifficultyScaling(String playerId, double factor) {
        log.info("🎚️ Scaling difficulté: {} -> facteur {}", playerId, factor);
        // TODO: Intégration avec le système de matchmaking
    }

    /**
     * Calcule la puissance moyenne globale de tous les joueurs
     */
    private double calculateGlobalAveragePower() {
        if (playerMetricsCache.isEmpty()) return 100.0; // Valeur par défaut

        return playerMetricsCache.values().stream()
                .filter(m -> m.gamesPlayed >= MIN_GAMES_FOR_ANALYSIS)
                .mapToDouble(m -> m.powerLevel)
                .average()
                .orElse(100.0);
    }

    /**
     * Obtient les métriques d'un joueur
     */
    public PlayerMetrics getPlayerMetrics(String playerId) {
        return playerMetricsCache.get(playerId);
    }

    /**
     * Obtient les statistiques du régulateur
     */
    public Map<String, Object> getRegulatorStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRegulations", totalRegulations);
        stats.put("successfulRegulations", successfulRegulations);
        stats.put("successRate", totalRegulations > 0 ? 
                 (double) successfulRegulations / totalRegulations : 0.0);
        stats.put("playersMonitored", playerMetricsCache.size());
        stats.put("globalAveragePower", calculateGlobalAveragePower());
        stats.put("activeRegulations", lastRegulationTime.size());
        
        return stats;
    }

    /**
     * Reset des métriques (pour tests ou nouvelle session)
     */
    public void resetMetrics() {
        log.info("🔄 Reset métriques Juge Temporel");
        playerMetricsCache.clear();
        lastRegulationTime.clear();
        totalRegulations = 0;
        successfulRegulations = 0;
    }

    /**
     * Formule temporelle du Juge: ⚖️ Π(déséquilibre) + ℬ(correction) → Δt+0(équilibre)
     */
    public String getTemporalFormula() {
        return "⚖️ Π(déséquilibre) + ℬ(correction) → Δt+0(équilibre_restauré)";
    }
}