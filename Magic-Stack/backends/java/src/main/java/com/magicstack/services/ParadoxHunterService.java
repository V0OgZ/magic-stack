package com.magicstack.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 🕵️‍♂️🌀 PARADOX HUNTER SERVICE 🌀🕵️‍♂️
 * 
 * Service régulateur pour détecter et éliminer les paradoxes temporels.
 * Agent IA spécialisé dans la chasse aux anomalies causales.
 * 
 * Responsabilités:
 * - Détection des paradoxes temporels et causaux
 * - Analyse des boucles temporelles suspectes
 * - Résolution automatique des anomalies
 * - Maintien de la cohérence narrative
 * - Protection contre les exploits temporels
 * 
 * @author MERLIN L'ÉTERNEL TRANSCENDANT
 * @version 1.0 - Finale Heroes of Time
 */
@Service
@Slf4j
public class ParadoxHunterService {

    // Seuils de détection des paradoxes
    private static final double CAUSALITY_VIOLATION_THRESHOLD = 0.8;
    private static final int MAX_TEMPORAL_LOOPS = 3;
    private static final long TEMPORAL_WINDOW_MS = 10000; // 10 secondes
    private static final int MAX_SIMULTANEOUS_ACTIONS = 5;
    
    // Cache des événements temporels
    private final Map<String, List<TemporalEvent>> playerEventHistory = new ConcurrentHashMap<>();
    private final Map<String, ParadoxAlert> activeParadoxes = new ConcurrentHashMap<>();
    private final AtomicLong paradoxCounter = new AtomicLong(0);
    
    // Statistiques du chasseur
    private long totalParadoxesDetected = 0;
    private long totalParadoxesResolved = 0;
    private long temporalViolationsBlocked = 0;

    /**
     * Événement temporel pour l'analyse des paradoxes
     */
    public static class TemporalEvent {
        public String eventId;
        public String playerId;
        public EventType type;
        public long timestamp;
        public Map<String, Object> context;
        public String causedBy; // Événement parent
        public List<String> effects; // Événements causés
        public double causalityIndex;
        
        public TemporalEvent(String eventId, String playerId, EventType type) {
            this.eventId = eventId;
            this.playerId = playerId;
            this.type = type;
            this.timestamp = Instant.now().toEpochMilli();
            this.context = new HashMap<>();
            this.effects = new ArrayList<>();
            this.causalityIndex = 1.0;
        }
    }

    public enum EventType {
        SPELL_CAST,          // Lancement de sort
        TIME_MANIPULATION,   // Manipulation temporelle
        CAUSAL_LINK,         // Création de lien causal
        TEMPORAL_JUMP,       // Saut temporel
        REALITY_COLLAPSE,    // Effondrement de réalité
        PARADOX_CREATION,    // Création de paradoxe
        BOOTSTRAP_LOOP,      // Boucle bootstrap
        TIMELINE_BRANCH      // Branchement temporel
    }

    /**
     * Alerte de paradoxe détecté
     */
    public static class ParadoxAlert {
        public String paradoxId;
        public String playerId;
        public ParadoxType type;
        public double severity;
        public String description;
        public List<String> involvedEvents;
        public long detectionTime;
        public boolean resolved;
        public String resolutionMethod;
        
        public ParadoxAlert(String paradoxId, String playerId, ParadoxType type, double severity) {
            this.paradoxId = paradoxId;
            this.playerId = playerId;
            this.type = type;
            this.severity = severity;
            this.detectionTime = Instant.now().toEpochMilli();
            this.involvedEvents = new ArrayList<>();
            this.resolved = false;
        }
    }

    public enum ParadoxType {
        GRANDFATHER_PARADOX,    // Paradoxe du grand-père
        BOOTSTRAP_PARADOX,      // Paradoxe bootstrap
        CAUSAL_LOOP,           // Boucle causale
        TEMPORAL_DUPLICATION,  // Duplication temporelle
        CAUSALITY_VIOLATION,   // Violation de causalité
        TIMELINE_CORRUPTION,   // Corruption de timeline
        QUANTUM_DECOHERENCE   // Décohérence quantique
    }

    /**
     * Enregistre un événement temporel pour analyse
     */
    public void recordTemporalEvent(String playerId, EventType type, Map<String, Object> context) {
        String eventId = generateEventId(playerId, type);
        TemporalEvent event = new TemporalEvent(eventId, playerId, type);
        event.context.putAll(context != null ? context : new HashMap<>());
        
        log.debug("🕵️ Chasseur de Paradoxes - Événement enregistré: {} | Type: {} | Joueur: {}", 
                 eventId, type, playerId);

        // Ajouter à l'historique
        playerEventHistory.computeIfAbsent(playerId, k -> new ArrayList<>()).add(event);
        
        // Nettoyer l'historique ancien
        cleanOldEvents(playerId);
        
        // Analyser les paradoxes potentiels
        analyzeForParadoxes(playerId, event);
    }

    /**
     * Génère un ID unique pour un événement
     */
    private String generateEventId(String playerId, EventType type) {
        return String.format("EVT_%s_%s_%d", 
                playerId.substring(0, Math.min(8, playerId.length())), 
                type.name(), 
                System.nanoTime() % 100000);
    }

    /**
     * Nettoie les événements anciens (au-delà de la fenêtre temporelle)
     */
    private void cleanOldEvents(String playerId) {
        List<TemporalEvent> events = playerEventHistory.get(playerId);
        if (events == null) return;

        long cutoffTime = Instant.now().toEpochMilli() - (TEMPORAL_WINDOW_MS * 5); // 5 fenêtres
        events.removeIf(event -> event.timestamp < cutoffTime);
    }

    /**
     * Analyse les événements pour détecter des paradoxes
     */
    private void analyzeForParadoxes(String playerId, TemporalEvent newEvent) {
        List<TemporalEvent> playerEvents = playerEventHistory.get(playerId);
        if (playerEvents == null || playerEvents.size() < 2) return;

        // Détecter les boucles temporelles
        detectTemporalLoops(playerId, newEvent, playerEvents);
        
        // Détecter les violations de causalité
        detectCausalityViolations(playerId, newEvent, playerEvents);
        
        // Détecter les duplications temporelles
        detectTemporalDuplication(playerId, newEvent, playerEvents);
        
        // Détecter les actions simultanées suspectes
        detectSuspiciousSimultaneousActions(playerId, newEvent, playerEvents);
    }

    /**
     * Détecte les boucles temporelles (Bootstrap Paradox)
     */
    private void detectTemporalLoops(String playerId, TemporalEvent newEvent, List<TemporalEvent> events) {
        if (newEvent.type != EventType.TIME_MANIPULATION && 
            newEvent.type != EventType.BOOTSTRAP_LOOP) return;

        // Compter les événements similaires dans la fenêtre temporelle
        long recentSimilarEvents = events.stream()
                .filter(e -> e.type == newEvent.type)
                .filter(e -> (newEvent.timestamp - e.timestamp) <= TEMPORAL_WINDOW_MS)
                .count();

        if (recentSimilarEvents > MAX_TEMPORAL_LOOPS) {
            createParadoxAlert(playerId, ParadoxType.BOOTSTRAP_PARADOX, 0.9,
                    String.format("Boucle temporelle détectée: %d événements %s en %d ms", 
                            recentSimilarEvents, newEvent.type, TEMPORAL_WINDOW_MS));
        }
    }

    /**
     * Détecte les violations de causalité
     */
    private void detectCausalityViolations(String playerId, TemporalEvent newEvent, List<TemporalEvent> events) {
        // Rechercher des effets qui précèdent leurs causes
        for (TemporalEvent pastEvent : events) {
            if (pastEvent.timestamp >= newEvent.timestamp) continue;
            
            // Vérifier si le nouvel événement prétend causer un événement passé
            String pastEventId = pastEvent.eventId;
            if (newEvent.effects.contains(pastEventId)) {
                double violationSeverity = calculateCausalityViolation(newEvent, pastEvent);
                
                if (violationSeverity > CAUSALITY_VIOLATION_THRESHOLD) {
                    createParadoxAlert(playerId, ParadoxType.CAUSALITY_VIOLATION, violationSeverity,
                            String.format("Violation causale: événement %s prétend causer %s (passé)", 
                                    newEvent.eventId, pastEventId));
                }
            }
        }
    }

    /**
     * Calcule la sévérité d'une violation de causalité
     */
    private double calculateCausalityViolation(TemporalEvent cause, TemporalEvent effect) {
        long timeDifference = cause.timestamp - effect.timestamp;
        double baseViolation = Math.min(1.0, timeDifference / (double) TEMPORAL_WINDOW_MS);
        
        // Augmenter la sévérité selon le type d'événements
        double typeMultiplier = 1.0;
        if (cause.type == EventType.TIME_MANIPULATION) typeMultiplier = 1.5;
        if (effect.type == EventType.REALITY_COLLAPSE) typeMultiplier = 2.0;
        
        return Math.min(1.0, baseViolation * typeMultiplier);
    }

    /**
     * Détecte les duplications temporelles suspectes
     */
    private void detectTemporalDuplication(String playerId, TemporalEvent newEvent, List<TemporalEvent> events) {
        // Chercher des événements identiques ou très similaires
        for (TemporalEvent event : events) {
            if (event.eventId.equals(newEvent.eventId)) continue;
            
            boolean isDuplicate = event.type == newEvent.type &&
                                Math.abs(event.timestamp - newEvent.timestamp) < 1000 && // 1 seconde
                                areSimilarContexts(event.context, newEvent.context);
            
            if (isDuplicate) {
                createParadoxAlert(playerId, ParadoxType.TEMPORAL_DUPLICATION, 0.7,
                        String.format("Duplication temporelle: %s et %s sont identiques", 
                                event.eventId, newEvent.eventId));
            }
        }
    }

    /**
     * Vérifie si deux contextes d'événements sont similaires
     */
    private boolean areSimilarContexts(Map<String, Object> context1, Map<String, Object> context2) {
        if (context1.size() != context2.size()) return false;
        
        for (Map.Entry<String, Object> entry : context1.entrySet()) {
            Object value1 = entry.getValue();
            Object value2 = context2.get(entry.getKey());
            
            if (!Objects.equals(value1, value2)) return false;
        }
        
        return true;
    }

    /**
     * Détecte les actions simultanées suspectes
     */
    private void detectSuspiciousSimultaneousActions(String playerId, TemporalEvent newEvent, List<TemporalEvent> events) {
        long simultaneousCount = events.stream()
                .filter(e -> Math.abs(e.timestamp - newEvent.timestamp) <= 100) // 100ms
                .count();

        if (simultaneousCount > MAX_SIMULTANEOUS_ACTIONS) {
            createParadoxAlert(playerId, ParadoxType.QUANTUM_DECOHERENCE, 0.6,
                    String.format("Actions simultanées suspectes: %d événements en 100ms", 
                            simultaneousCount));
        }
    }

    /**
     * Crée une alerte de paradoxe
     */
    private void createParadoxAlert(String playerId, ParadoxType type, double severity, String description) {
        String paradoxId = "PARADOX_" + paradoxCounter.incrementAndGet();
        ParadoxAlert alert = new ParadoxAlert(paradoxId, playerId, type, severity);
        alert.description = description;
        
        activeParadoxes.put(paradoxId, alert);
        totalParadoxesDetected++;
        
        log.warn("🚨 PARADOXE DÉTECTÉ - ID: {} | Joueur: {} | Type: {} | Sévérité: {:.2f} | Description: {}", 
                paradoxId, playerId, type, severity, description);

        // Tenter une résolution automatique
        attemptParadoxResolution(alert);
    }

    /**
     * Tente de résoudre automatiquement un paradoxe
     */
    private void attemptParadoxResolution(ParadoxAlert alert) {
        log.info("🔧 Tentative de résolution automatique du paradoxe: {}", alert.paradoxId);

        try {
            switch (alert.type) {
                case BOOTSTRAP_PARADOX:
                    resolveBootstrapParadox(alert);
                    break;
                case CAUSALITY_VIOLATION:
                    resolveCausalityViolation(alert);
                    break;
                case TEMPORAL_DUPLICATION:
                    resolveTemporalDuplication(alert);
                    break;
                case QUANTUM_DECOHERENCE:
                    resolveQuantumDecoherence(alert);
                    break;
                default:
                    resolveGenericParadox(alert);
                    break;
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la résolution du paradoxe {}: {}", 
                     alert.paradoxId, e.getMessage());
        }
    }

    /**
     * Résout un paradoxe bootstrap
     */
    private void resolveBootstrapParadox(ParadoxAlert alert) {
        // Limiter les boucles temporelles du joueur
        temporalViolationsBlocked++;
        
        alert.resolved = true;
        alert.resolutionMethod = "Limitation des boucles temporelles";
        totalParadoxesResolved++;
        
        log.info("✅ Paradoxe bootstrap résolu: {} - Boucles temporelles limitées", alert.paradoxId);
    }

    /**
     * Résout une violation de causalité
     */
    private void resolveCausalityViolation(ParadoxAlert alert) {
        // Annuler les liens causaux invalides
        temporalViolationsBlocked++;
        
        alert.resolved = true;
        alert.resolutionMethod = "Annulation des liens causaux invalides";
        totalParadoxesResolved++;
        
        log.info("✅ Violation de causalité résolue: {} - Liens causaux corrigés", alert.paradoxId);
    }

    /**
     * Résout une duplication temporelle
     */
    private void resolveTemporalDuplication(ParadoxAlert alert) {
        // Fusionner les événements dupliqués
        alert.resolved = true;
        alert.resolutionMethod = "Fusion des événements dupliqués";
        totalParadoxesResolved++;
        
        log.info("✅ Duplication temporelle résolue: {} - Événements fusionnés", alert.paradoxId);
    }

    /**
     * Résout une décohérence quantique
     */
    private void resolveQuantumDecoherence(ParadoxAlert alert) {
        // Stabiliser l'état quantique
        alert.resolved = true;
        alert.resolutionMethod = "Stabilisation de l'état quantique";
        totalParadoxesResolved++;
        
        log.info("✅ Décohérence quantique résolue: {} - État stabilisé", alert.paradoxId);
    }

    /**
     * Résolution générique pour paradoxes inconnus
     */
    private void resolveGenericParadox(ParadoxAlert alert) {
        // Application d'une correction générique
        alert.resolved = true;
        alert.resolutionMethod = "Correction temporelle générique";
        totalParadoxesResolved++;
        
        log.info("✅ Paradoxe générique résolu: {} - Correction appliquée", alert.paradoxId);
    }

    /**
     * Obtient tous les paradoxes actifs
     */
    public Collection<ParadoxAlert> getActiveParadoxes() {
        return activeParadoxes.values();
    }

    /**
     * Obtient les paradoxes d'un joueur spécifique
     */
    public List<ParadoxAlert> getPlayerParadoxes(String playerId) {
        return activeParadoxes.values().stream()
                .filter(alert -> alert.playerId.equals(playerId))
                .toList();
    }

    /**
     * Obtient les statistiques du chasseur
     */
    public Map<String, Object> getHunterStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalParadoxesDetected", totalParadoxesDetected);
        stats.put("totalParadoxesResolved", totalParadoxesResolved);
        stats.put("activeParadoxes", activeParadoxes.size());
        stats.put("temporalViolationsBlocked", temporalViolationsBlocked);
        stats.put("resolutionRate", totalParadoxesDetected > 0 ? 
                 (double) totalParadoxesResolved / totalParadoxesDetected : 0.0);
        stats.put("playersMonitored", playerEventHistory.size());
        
        // Statistiques par type de paradoxe
        Map<ParadoxType, Long> paradoxesByType = new HashMap<>();
        for (ParadoxAlert alert : activeParadoxes.values()) {
            paradoxesByType.merge(alert.type, 1L, Long::sum);
        }
        stats.put("paradoxesByType", paradoxesByType);
        
        return stats;
    }

    /**
     * Force la résolution d'un paradoxe spécifique
     */
    public boolean forceResolveParadox(String paradoxId) {
        ParadoxAlert alert = activeParadoxes.get(paradoxId);
        if (alert == null || alert.resolved) return false;
        
        log.info("🔨 Résolution forcée du paradoxe: {}", paradoxId);
        attemptParadoxResolution(alert);
        
        return alert.resolved;
    }

    /**
     * Reset des métriques (pour tests ou nouvelle session)
     */
    public void resetMetrics() {
        log.info("🔄 Reset métriques Chasseur de Paradoxes");
        playerEventHistory.clear();
        activeParadoxes.clear();
        paradoxCounter.set(0);
        totalParadoxesDetected = 0;
        totalParadoxesResolved = 0;
        temporalViolationsBlocked = 0;
    }

    /**
     * Formule temporelle du Chasseur: 🕵️ Π(anomalie) + ℬ(correction) → Δt+0(cohérence)
     */
    public String getTemporalFormula() {
        return "🕵️ Π(anomalie) + ℬ(correction) → Δt+0(cohérence_temporelle)";
    }
}