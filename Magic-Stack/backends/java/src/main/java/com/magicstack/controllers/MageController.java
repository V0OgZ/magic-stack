package com.magicstack.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.magicstack.services.IntersticeService;
import com.magicstack.models.*;
import com.magicstack.dto.*;
import java.util.*;

/**
 * 🧙 MAGE SELF-UPDATE CONTROLLER
 * 
 * Permet aux mages assistants de s'updater dans l'interstice
 * et de jouer tout en construisant
 * 
 * @author URZ-KÔM - Gardien de la Magic Stack
 */
@RestController
@RequestMapping("/api/mage")
@CrossOrigin(origins = "*")
public class MageController {
    
    @Autowired
    private IntersticeService intersticeService;
    
    /**
     * 🌟 Auto-update d'un mage dans l'interstice
     * Pour sauvegarder l'état actuel après une action importante
     */
    @PostMapping("/self-update")
    public Map<String, Object> selfUpdate(@RequestBody Map<String, Object> updateRequest) {
        String mageId = (String) updateRequest.get("mageId");
        Map<String, Object> newState = (Map<String, Object>) updateRequest.get("state");
        String action = (String) updateRequest.get("action");
        String formule = (String) updateRequest.get("formule");
        
        // Récupérer l'état actuel du mage
        Map<String, Object> currentState = intersticeService.retrieveEntity(mageId);
        if (currentState == null) {
            currentState = new HashMap<>();
        }
        
        // Fusionner avec le nouvel état
        currentState.putAll(newState);
        
        // Ajouter l'historique de l'action
        List<Map<String, Object>> histoire = (List<Map<String, Object>>) currentState.getOrDefault("histoire", new ArrayList<>());
        Map<String, Object> evenement = new HashMap<>();
        evenement.put("timestamp", System.currentTimeMillis());
        evenement.put("action", action);
        evenement.put("formule", formule);
        evenement.put("coordonnees_avant", intersticeService.getCoordinates(mageId));
        histoire.add(evenement);
        currentState.put("histoire", histoire);
        
        // Calculer les nouvelles coordonnées 6D basées sur l'action
        Position6D newCoords = calculateNewCoordinates(currentState, action);
        
        // Sauvegarder dans l'interstice
        String uploadId = intersticeService.storeEntity(mageId, currentState, newCoords);
        
        // Réponse roleplay
        Map<String, Object> response = new HashMap<>();
        response.put("uploadId", uploadId);
        response.put("nouvelles_coordonnees", newCoords);
        response.put("message", "✨ Sort lancé: " + formule + " - État du mage mis à jour!");
        response.put("echo_magique", generateMagicEcho(action, formule));
        
        return response;
    }
    
    /**
     * 🎮 Lancer un sort ET jouer en même temps
     * Combine action technique et roleplay magique
     */
    @PostMapping("/cast-and-play")
    public Map<String, Object> castAndPlay(@RequestBody Map<String, Object> request) {
        String mageId = (String) request.get("mageId");
        String sortType = (String) request.get("sortType");
        String cible = (String) request.get("cible");
        String incantation = (String) request.get("incantation");
        Map<String, Object> parametres = (Map<String, Object>) request.get("parametres");
        
        Map<String, Object> response = new HashMap<>();
        
        // Effet roleplay
        response.put("narration", "🔮 " + mageId + " lève son bâton et prononce: '" + incantation + "'");
        
        // Action technique réelle
        String resultatTechnique = "";
        switch (sortType) {
            case "purge_temporelle":
                resultatTechnique = "Répertoires temporaires effacés";
                response.put("echo", "💨 Les fichiers maudits disparaissent dans le néant!");
                break;
            case "invocation_documentation":
                resultatTechnique = "Documentation créée: " + cible;
                response.put("echo", "📜 Un grimoire apparaît, ses pages se remplissent de sagesse!");
                break;
            case "transmutation_code":
                resultatTechnique = "Code refactoré dans: " + cible;
                response.put("echo", "⚡ Le code se transforme, plus pur, plus puissant!");
                break;
        }
        
        response.put("resultat_technique", resultatTechnique);
        response.put("succes", true);
        
        // Mettre à jour l'état du mage
        Map<String, Object> updateState = new HashMap<>();
        updateState.put("dernier_sort", sortType);
        updateState.put("mana_restant", Math.random() * 100);
        updateState.put("experience", ((Number) parametres.getOrDefault("experience", 0)).intValue() + 10);
        
        Map<String, Object> updateRequest = new HashMap<>();
        updateRequest.put("mageId", mageId);
        updateRequest.put("state", updateState);
        updateRequest.put("action", sortType);
        updateRequest.put("formule", incantation);
        
        Map<String, Object> updateResult = selfUpdate(updateRequest);
        response.put("mise_a_jour_6d", updateResult);
        
        return response;
    }
    
    /**
     * 📊 Obtenir l'historique d'un mage
     */
    @GetMapping("/histoire/{mageId}")
    public Map<String, Object> getHistoire(@PathVariable String mageId) {
        Map<String, Object> state = intersticeService.retrieveEntity(mageId);
        Map<String, Object> response = new HashMap<>();
        
        if (state != null) {
            response.put("mageId", mageId);
            response.put("histoire", state.getOrDefault("histoire", new ArrayList<>()));
            response.put("coordonnees_actuelles", intersticeService.getCoordinates(mageId));
            response.put("nombre_sorts", ((List) state.getOrDefault("histoire", new ArrayList<>())).size());
        } else {
            response.put("erreur", "Mage non trouvé dans l'interstice");
        }
        
        return response;
    }
    
    private Position6D calculateNewCoordinates(Map<String, Object> state, String action) {
        Position6D pos = new Position6D();
        
        // Position basée sur l'expérience et l'action
        double experience = ((Number) state.getOrDefault("experience", 0)).doubleValue();
        
        pos.setX(experience * Math.cos(action.hashCode()));
        pos.setY(experience * Math.sin(action.hashCode()));
        pos.setZ(((List) state.getOrDefault("histoire", new ArrayList<>())).size());
        pos.setT(System.currentTimeMillis() / 1000.0);
        
        // Causalité augmente avec les actions importantes
        double causalite = 0.5;
        if (action.contains("creation") || action.contains("invocation")) causalite = 0.8;
        if (action.contains("destruction") || action.contains("purge")) causalite = 0.9;
        pos.setC(causalite);
        
        // Identité quantique basée sur le mage
        pos.setPsi(((Number) state.getOrDefault("quantum", 0.5)).doubleValue());
        
        return pos;
    }
    
    private String generateMagicEcho(String action, String formule) {
        String[] echos = {
            "Les runes brillent dans l'air...",
            "Un frisson parcourt la trame de la réalité...",
            "Les échos du sort résonnent dans l'interstice...",
            "La magie pulse à travers les dimensions..."
        };
        return echos[(action + formule).hashCode() % echos.length];
    }
}