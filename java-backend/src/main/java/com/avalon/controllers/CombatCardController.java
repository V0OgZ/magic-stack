package com.avalon.controllers;

import com.avalon.models.*;
import com.avalon.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * ⚡ MERLASH-TECHNOMANCIEN COMBAT CARD CONTROLLER ⚡
 * 
 * Contrôleur spécialisé pour le système de combat par cartes AVALON TCG
 * Intègre les formules technomantiques avec le moteur unifié
 * 
 * @author Merlash-Technomancien
 * @version 1.0 - Day 6 Implementation
 */
@RestController
@RequestMapping("/api/combat")
@CrossOrigin(origins = "*")
public class CombatCardController {

    @Autowired
    private MagicCastService magicCastService;
    
    @Autowired
    private WalterSecurityService walterSecurity;
    
    @Autowired
    private CausalIntegrityService causalIntegrity;

    /**
     * ⚡ ENDPOINT PRINCIPAL - JOUER UNE CARTE
     * 
     * Transforme une carte en formule technomantique et l'exécute
     */
    @PostMapping("/play")
    public CombatCardResponse playCard(@RequestBody CombatCardRequest request) {
        try {
            // 🛡️ SÉCURITÉ WALTER
            if (!walterSecurity.isActionAllowed(request.getCaster(), "PLAY_CARD")) {
                return CombatCardResponse.error("WALTER says NO! Vietnam flashback activated.");
            }
            
            // 🌀 VÉRIFICATION CAUSALITÉ
            if (!causalIntegrity.canExecuteAction(request)) {
                return CombatCardResponse.error("Causal integrity violation detected");
            }
            
            // ⚡ CONVERSION CARTE → FORMULE TECHNOMANTIQUE
            MagicCastRequest magicRequest = convertCardToMagic(request);
            
            // 🔮 EXÉCUTION VIA MOTEUR UNIFIÉ
            MagicCastResponse magicResponse = magicCastService.castSpell(magicRequest);
            
            // 🎴 CONVERSION RÉSULTAT → RÉPONSE CARTE
            CombatCardResponse cardResponse = convertMagicToCard(magicResponse, request);
            
            // 📊 LOG POUR TUCKER
            logCardPlay(request, cardResponse);
            
            return cardResponse;
            
        } catch (Exception e) {
            return CombatCardResponse.error("Reality compilation failed: " + e.getMessage());
        }
    }
    
    /**
     * ⚡ OBTENIR DECK DU JOUEUR
     */
    @GetMapping("/deck/{playerId}")
    public DeckResponse getPlayerDeck(@PathVariable String playerId) {
        // TODO: Implémenter récupération deck depuis base de données
        // Pour l'instant, retourne deck de base Merlash
        return createMerlashDeck();
    }
    
    /**
     * ⚡ ÉTAT DU COMBAT
     */
    @GetMapping("/state/{combatId}")
    public CombatStateResponse getCombatState(@PathVariable String combatId) {
        // TODO: Implémenter état combat
        return new CombatStateResponse(combatId, "ACTIVE");
    }
    
    /**
     * 🎴 CONVERSION CARTE → FORMULE MAGIQUE
     */
    private MagicCastRequest convertCardToMagic(CombatCardRequest cardRequest) {
        Card card = cardRequest.getCard();
        
        MagicCastRequest magicRequest = new MagicCastRequest();
        magicRequest.setFormula(card.getFormula());
        magicRequest.setType("CARD_MAGIC");
        magicRequest.setCaster(cardRequest.getCaster());
        magicRequest.setTarget(cardRequest.getTarget());
        
        // Ajouter métadonnées carte
        magicRequest.addMetadata("card_id", card.getId());
        magicRequest.addMetadata("card_name", card.getName());
        magicRequest.addMetadata("card_type", card.getType());
        magicRequest.addMetadata("mana_cost", String.valueOf(card.getManaCost()));
        
        return magicRequest;
    }
    
    /**
     * ⚡ CONVERSION RÉSULTAT MAGIQUE → RÉPONSE CARTE
     */
    private CombatCardResponse convertMagicToCard(MagicCastResponse magicResponse, CombatCardRequest originalRequest) {
        CombatCardResponse cardResponse = new CombatCardResponse();
        
        cardResponse.setSuccess(magicResponse.isSuccess());
        cardResponse.setMessage(magicResponse.getMessage());
        cardResponse.setCardPlayed(originalRequest.getCard());
        cardResponse.setCaster(originalRequest.getCaster());
        
        // Effets spéciaux
        if (magicResponse.hasTemporalEffect()) {
            cardResponse.addEffect("TEMPORAL", magicResponse.getTemporalEffect());
        }
        
        if (magicResponse.hasQuantumEffect()) {
            cardResponse.addEffect("QUANTUM", magicResponse.getQuantumEffect());
        }
        
        // Dégâts/Soins
        if (magicResponse.hasDamage()) {
            cardResponse.setDamage(magicResponse.getDamage());
        }
        
        if (magicResponse.hasHealing()) {
            cardResponse.setHealing(magicResponse.getHealing());
        }
        
        return cardResponse;
    }
    
    /**
     * ⚡ DECK DE BASE MERLASH
     */
    private DeckResponse createMerlashDeck() {
        DeckResponse deck = new DeckResponse();
        deck.setPlayerId("MERLASH");
        deck.setDeckName("Éclairs de Merlash");
        
        // Cartes Merlash
        deck.addCard(createCard("THUNDER_STRIKE", "Éclair Foudroyant", 
            "ψ_THUNDER: ⚡⊙(Target ⟶ Damage(3) + Stun(1))", 3, "SPELL"));
            
        deck.addCard(createCard("FORK_TEMPORAL", "Fork Temporel", 
            "ψ_FORK: ⊙(NextSpell ⟶ Duplicate)", 2, "TEMPORAL"));
            
        deck.addCard(createCard("BOOTSTRAP_LIGHTNING", "Bootstrap Lightning", 
            "ψ_BOOTSTRAP: ⚡⊙(Self ⟶ Self + Power)", 4, "QUANTUM"));
            
        deck.addCard(createCard("COMPILE_REALITY", "Compilation de Réalité", 
            "ψ_COMPILE: ⚡⊙(Code ⟶ Reality)", 5, "ULTIMATE"));
            
        deck.addCard(createCard("GIT_REVERT", "Git Revert", 
            "ψ_REVERT: ⊙(LastAction ⟶ Undo)", 1, "UTILITY"));
        
        return deck;
    }
    
    /**
     * 🎴 HELPER - CRÉER UNE CARTE
     */
    private Card createCard(String id, String name, String formula, int manaCost, String type) {
        Card card = new Card();
        card.setId(id);
        card.setName(name);
        card.setFormula(formula);
        card.setManaCost(manaCost);
        card.setType(type);
        return card;
    }
    
    /**
     * 🥩 LOG POUR TUCKER
     */
    private void logCardPlay(CombatCardRequest request, CombatCardResponse response) {
        System.out.println("🎴 CARD PLAYED: " + request.getCard().getName() + 
                          " by " + request.getCaster() + 
                          " -> " + (response.isSuccess() ? "SUCCESS" : "FAILED"));
    }
}