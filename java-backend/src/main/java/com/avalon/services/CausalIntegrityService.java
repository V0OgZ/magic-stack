package com.avalon.services;

import org.springframework.stereotype.Service;
import com.avalon.models.MinimapRequest;

/**
 * 🔮 CAUSAL INTEGRITY SERVICE
 * Extension pour supporter la Mini-map 6D
 * Par : MERLASH-TECHNOMANCIEN
 */
@Service
public class CausalIntegrityService {
    
    /**
     * 🚫 VÉRIFICATION NAVIGATION AUTORISÉE
     * Nouvelle méthode pour la Mini-map 6D
     */
    public boolean isNavigationAllowed(MinimapRequest.Position6D position) {
        if (position == null) return false;
        
        // Vérifications d'intégrité causale
        double causalStrength = position.getC();
        double quantumState = Math.abs(position.getPsi());
        
        // Navigation bloquée si causalité trop faible
        if (causalStrength < 0.1) {
            return false;
        }
        
        // Navigation bloquée si état quantique instable
        if (quantumState > 0.95) {
            return false;
        }
        
        // Navigation autorisée
        return true;
    }
    
    /**
     * 🔒 VÉRIFICATION ZONE ANCRÉE
     * Méthode existante étendue
     */
    public boolean isAnchored(MinimapRequest.Position6D position) {
        if (position == null) return false;
        return position.getC() > 0.9;
    }
    
    /**
     * ⚖️ VÉRIFICATION CONDITIONS CAUSALES
     * Méthode existante - compatibilité
     */
    public boolean areCausalConditionsMet(String action, String context) {
        // Implémentation basique pour compatibilité
        return !action.contains("PARADOX") && !context.contains("FORBIDDEN");
    }
}