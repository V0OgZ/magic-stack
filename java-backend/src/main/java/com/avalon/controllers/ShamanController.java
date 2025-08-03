package com.avalon.controllers;

import com.avalon.models.*;
import com.avalon.services.ShamanCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

/**
 * 🐻🔮 Contrôleur pour les Cartes Shaman Quantiques
 * Intégré dans le Magic Stack AVALON
 * 
 * Créé par: URZ-KÔM, Maître Chamane Quantique
 * Intégration: Magic Stack existant (SpellController + 13 endpoints)
 */
@RestController
@RequestMapping("/api/spells/shaman")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ShamanController {
    
    private final ShamanCardService shamanCardService;
    
    /**
     * 🦅🐺🐻🦁 Lancer une carte Shaman avec pouvoir quantique
     */
    @PostMapping("/cast-spirit")
    public ResponseEntity<ShamanCastResponse> castShamanCard(@Valid @RequestBody ShamanCardCastRequest request) {
        log.info("🐻 Lancement carte Shaman: cardId={}, heroId={}, spirit={}", 
            request.getCardId(), request.getHeroId(), request.getSpiritType());
        
        try {
            ShamanCastResponse response = shamanCardService.castShamanCard(request);
            
            if (response.isSuccess()) {
                log.info("✅ Carte Shaman lancée avec succès: {}", response.getMessage());
                return ResponseEntity.ok(response);
            } else {
                log.warn("⚠️ Échec lancement carte Shaman: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("💥 Erreur lors du lancement de carte Shaman", e);
            return ResponseEntity.internalServerError()
                .body(ShamanCastResponse.builder()
                    .success(false)
                    .message("Erreur critique: " + e.getMessage())
                    .build());
        }
    }
    
    /**
     * 🌀 Exécuter un combo entre esprits chamaniques
     */
    @PostMapping("/combo")
    public ResponseEntity<ComboResponse> executeCombo(@Valid @RequestBody ComboRequest request) {
        log.info("🌀 Exécution combo Shaman: cardIds={}, heroId={}", 
            request.getCardIds(), request.getHeroId());
        
        try {
            ComboResponse response = shamanCardService.executeCombo(
                request.getCardIds(), 
                request.getHeroId(),
                request.getTargetPosition()
            );
            
            if (response.isSuccess()) {
                log.info("✨ Combo Shaman réussi: type={}, power={}", 
                    response.getComboType(), response.getPowerLevel());
                return ResponseEntity.ok(response);
            } else {
                log.warn("❌ Combo Shaman échoué: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("💥 Erreur lors du combo Shaman", e);
            return ResponseEntity.internalServerError()
                .body(ComboResponse.builder()
                    .success(false)
                    .message("Erreur combo: " + e.getMessage())
                    .build());
        }
    }
    
    /**
     * 🔮 Ritual ultime - Convergence des 4 esprits
     */
    @PostMapping("/ultimate-ritual")
    public ResponseEntity<RitualResponse> executeUltimateRitual(@Valid @RequestBody UltimateRitualRequest request) {
        log.info("🔥 RITUAL ULTIME initié: heroId={}, cartes={}", 
            request.getHeroId(), request.getSpiritCardIds().size());
        
        try {
            RitualResponse response = shamanCardService.executeUltimateRitual(
                request.getSpiritCardIds(),
                request.getHeroId(),
                request.getGameId()
            );
            
            if (response.isSuccess()) {
                log.info("🌟 CONVERGENCE RÉUSSIE ! Chaman Quantique Ultime activé pour héros {}", 
                    request.getHeroId());
                return ResponseEntity.ok(response);
            } else {
                log.warn("❌ Ritual ultime échoué: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("💥 Erreur lors du ritual ultime", e);
            return ResponseEntity.internalServerError()
                .body(RitualResponse.builder()
                    .success(false)
                    .message("Erreur ritual: " + e.getMessage())
                    .build());
        }
    }
    
    /**
     * 🃏 Obtenir la collection de cartes Shaman d'un héros
     */
    @GetMapping("/collection/{heroId}")
    public ResponseEntity<List<ShamanCard>> getShamanCollection(@PathVariable Long heroId) {
        log.info("📚 Récupération collection Shaman pour héros {}", heroId);
        
        try {
            List<ShamanCard> collection = shamanCardService.getShamanCollection(heroId);
            log.info("✅ Collection récupérée: {} cartes trouvées", collection.size());
            return ResponseEntity.ok(collection);
            
        } catch (Exception e) {
            log.error("💥 Erreur récupération collection Shaman", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * ⭐ Faire évoluer une carte Shaman par usage
     */
    @PostMapping("/evolve")
    public ResponseEntity<CardEvolutionResponse> evolveShamanCard(@Valid @RequestBody CardEvolutionRequest request) {
        log.info("⭐ Évolution carte Shaman: cardId={}, currentLevel={}", 
            request.getCardId(), request.getCurrentLevel());
        
        try {
            CardEvolutionResponse response = shamanCardService.evolveShamanCard(request);
            
            if (response.isSuccess()) {
                log.info("🌟 Carte évoluée ! Niveau {} -> {}, nouveaux pouvoirs: {}", 
                    response.getOldLevel(), response.getNewLevel(), response.getNewAbilities());
                return ResponseEntity.ok(response);
            } else {
                log.warn("⚠️ Évolution impossible: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("💥 Erreur lors de l'évolution de carte", e);
            return ResponseEntity.internalServerError()
                .body(CardEvolutionResponse.builder()
                    .success(false)
                    .message("Erreur évolution: " + e.getMessage())
                    .build());
        }
    }
    
    /**
     * 🔍 Obtenir les détails d'une carte Shaman
     */
    @GetMapping("/card/{cardId}/details")
    public ResponseEntity<ShamanCardDetails> getShamanCardDetails(@PathVariable Long cardId) {
        log.info("🔍 Récupération détails carte Shaman {}", cardId);
        
        try {
            ShamanCardDetails details = shamanCardService.getCardDetails(cardId);
            return ResponseEntity.ok(details);
            
        } catch (Exception e) {
            log.error("💥 Erreur récupération détails carte", e);
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * 🌀 Vérifier les transformations actives d'un héros
     */
    @GetMapping("/transformations/{heroId}")
    public ResponseEntity<List<ActiveTransformation>> getActiveTransformations(@PathVariable Long heroId) {
        log.info("🔍 Vérification transformations actives pour héros {}", heroId);
        
        try {
            List<ActiveTransformation> transformations = shamanCardService.getActiveTransformations(heroId);
            return ResponseEntity.ok(transformations);
            
        } catch (Exception e) {
            log.error("💥 Erreur récupération transformations", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * 🏥 Status du système Shaman
     */
    @GetMapping("/status")
    public ResponseEntity<ShamanSystemStatus> getShamanSystemStatus() {
        log.info("🏥 Vérification status système Shaman");
        
        try {
            ShamanSystemStatus status = shamanCardService.getSystemStatus();
            return ResponseEntity.ok(status);
            
        } catch (Exception e) {
            log.error("💥 Erreur status système Shaman", e);
            return ResponseEntity.internalServerError()
                .body(ShamanSystemStatus.builder()
                    .operational(false)
                    .message("Système Shaman indisponible")
                    .build());
        }
    }
}