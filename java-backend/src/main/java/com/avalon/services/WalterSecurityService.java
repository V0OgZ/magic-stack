package com.avalon.services;

import com.avalon.models.MagicCastRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.*;

/**
 * 🛡️ WALTER Security Service - Protection contre les intrusions et paradoxes
 * "This is not 'Nam. This is bowling. There are rules."
 */
@Service
@Slf4j
public class WalterSecurityService {
    
    private final Set<String> blacklistedFormulas = new HashSet<>();
    private final Map<String, Integer> requestCounts = new HashMap<>();
    private final Set<String> authorizedCasters = new HashSet<>();
    private boolean vietnamMode = false;
    
    public WalterSecurityService() {
        initializeSecurity();
    }
    
    /**
     * 🔒 Valider une requête magique
     */
    public boolean validateRequest(MagicCastRequest request) {
        log.info("🛡️ WALTER: Vérification sécurité pour {}", request.getFormula());
        
        // Vérifier les formules interdites
        if (isBlacklisted(request.getFormula())) {
            log.warn("🚨 WALTER: FORMULE INTERDITE DÉTECTÉE!");
            return false;
        }
        
        // Vérifier le rate limiting
        if (isRateLimited(request.getCasterId())) {
            log.warn("🚨 WALTER: TROP DE REQUÊTES! C'est pas le Vietnam ici!");
            return false;
        }
        
        // Vérifier les paradoxes temporels dangereux
        if (containsDangerousParadox(request)) {
            log.warn("🚨 WALTER: PARADOXE DANGEREUX! Ça me rappelle Firebase Alpha '69!");
            activateVietnamMode();
            return false;
        }
        
        // Vérifier l'autorisation du lanceur
        if (!isAuthorizedCaster(request.getCasterId())) {
            log.warn("🚨 WALTER: LANCEUR NON AUTORISÉ! You're entering a world of pain!");
            return false;
        }
        
        log.info("✅ WALTER: Requête validée. Respect des règles confirmé.");
        return true;
    }
    
    /**
     * 🎖️ Activer le mode Vietnam (sécurité maximale)
     */
    private void activateVietnamMode() {
        if (!vietnamMode) {
            vietnamMode = true;
            log.error("🔥 WALTER: MODE VIETNAM ACTIVÉ! FIREBASE CHARLIE UNDER ATTACK!");
            
            // Bloquer toutes les formules dangereuses
            blacklistedFormulas.add("FORD_CONTROL");
            blacklistedFormulas.add("REALITY_REWRITE");
            blacklistedFormulas.add("TIMELINE_DESTRUCTION");
            
            // Alerter tous les systèmes
            log.error("🚨 TOUS LES SYSTÈMES EN ALERTE ROUGE!");
        }
    }
    
    /**
     * 🔍 Vérifier si la formule est blacklistée
     */
    private boolean isBlacklisted(String formula) {
        return blacklistedFormulas.stream()
            .anyMatch(formula.toUpperCase()::contains);
    }
    
    /**
     * ⏱️ Vérifier le rate limiting
     */
    private boolean isRateLimited(String casterId) {
        if (casterId == null) return false;
        
        int count = requestCounts.getOrDefault(casterId, 0);
        requestCounts.put(casterId, count + 1);
        
        // Max 10 requêtes par minute
        return count > 10;
    }
    
    /**
     * ⚠️ Détecter les paradoxes dangereux
     */
    private boolean containsDangerousParadox(MagicCastRequest request) {
        String formula = request.getFormula().toUpperCase();
        
        // Paradoxes interdits
        if (formula.contains("SELF_CREATION") || 
            formula.contains("GRANDFATHER_PARADOX") ||
            formula.contains("TIMELINE_ERASE")) {
            return true;
        }
        
        // Vérifier les boucles infinies
        if (request.getParameters() != null) {
            Object loopCount = request.getParameters().get("loop_count");
            if (loopCount instanceof Integer && (Integer) loopCount > 1000) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 👤 Vérifier si le lanceur est autorisé
     */
    private boolean isAuthorizedCaster(String casterId) {
        if (casterId == null) return true; // Anonyme autorisé par défaut
        
        // En mode Vietnam, seuls les autorisés passent
        if (vietnamMode) {
            return authorizedCasters.contains(casterId);
        }
        
        return true;
    }
    
    /**
     * 🔧 Initialiser la sécurité
     */
    private void initializeSecurity() {
        // Formules toujours interdites
        blacklistedFormulas.add("DESTROY_AVALON");
        blacklistedFormulas.add("CORRUPT_REALITY");
        blacklistedFormulas.add("INFINITE_LOOP");
        
        // Lanceurs autorisés
        authorizedCasters.add("jean-grofignon");
        authorizedCasters.add("walter");
        authorizedCasters.add("vince");
        authorizedCasters.add("dude");
        authorizedCasters.add("opus");
        authorizedCasters.add("memento");
        
        log.info("🛡️ WALTER Security initialisé. Les règles sont établies.");
    }
    
    public boolean isActive() {
        return true;
    }
    
    /**
     * 🔄 Réinitialiser les compteurs (appelé périodiquement)
     */
    public void resetCounters() {
        requestCounts.clear();
        log.info("🔄 WALTER: Compteurs réinitialisés");
    }
    
    /**
     * 📊 Obtenir le statut de sécurité
     */
    public SecurityStatus getSecurityStatus() {
        return new SecurityStatus(
            vietnamMode,
            blacklistedFormulas.size(),
            requestCounts.size(),
            authorizedCasters.size(),
            "WALTER Security opérationnel"
        );
    }
    
    public record SecurityStatus(
        boolean vietnamModeActive,
        int blacklistedFormulas,
        int activeRequests,
        int authorizedCasters,
        String message
    ) {}
}