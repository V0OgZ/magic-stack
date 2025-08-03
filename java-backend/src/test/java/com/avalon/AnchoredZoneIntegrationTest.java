package com.avalon;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.services.CausalIntegrityService;
import com.avalon.services.engines.GrofiEngine;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AnchoredZoneIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CausalIntegrityService causalIntegrityService;
    
    @Autowired
    private GrofiEngine grofiEngine;

    @BeforeEach
    void setUp() {
        // Nettoyer les états et les zones ancrées avant chaque test
        grofiEngine.clearStates();
        causalIntegrityService.clearAll();
    }

    @Test
    void testSuperpositionInAnchoredZoneForcesImmediateCollapse() throws Exception {
        // 1. Définir une zone comme étant "ancrée"
        String anchoredCoordinates = "10,10";
        causalIntegrityService.addAnchoredZone(anchoredCoordinates);

        // 2. Tenter de créer une superposition dans cette zone ancrée
        MagicCastRequest superpositionRequest = new MagicCastRequest();
        superpositionRequest.setFormulaType("RUNIC");
        superpositionRequest.setFormula("ψ1: ⊙(MOV(Arthur, @10,10))");
        superpositionRequest.setCasterId("Arthur");
        superpositionRequest.setParameters(Map.of(
            "coordinates", anchoredCoordinates
        ));

        MvcResult result = mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(superpositionRequest)))
                .andExpect(status().isOk())
                .andReturn();
        
        String responseString = result.getResponse().getContentAsString();
        MagicCastResponse response = objectMapper.readValue(responseString, MagicCastResponse.class);

        // 3. Valider le résultat
        assertTrue(response.isSuccess(), "La requête aurait dû réussir.");
        
        // Le message doit indiquer un effondrement
        assertTrue(response.getMessage().contains("effondré"), "Le message devrait indiquer un effondrement.");
        
        // L'état quantique doit être directement "COLLAPSED"
        assertNotNull(response.getQuantumState(), "La réponse devrait contenir un état quantique.");
        assertEquals("COLLAPSED", response.getQuantumState().getState(), "L'état devrait être directement effondré.");
        
        // L'effet de l'action sous-jacente (MOV) doit être présent
        assertTrue(response.getEffects().contains("HERO_TELEPORTED"), "L'effet du mouvement devrait être appliqué.");
        // Et l'effet de l'effondrement aussi
        assertTrue(response.getEffects().contains("QUANTUM_COLLAPSE_EXECUTED"), "L'effet de l'effondrement devrait être présent.");

        // 4. Vérifier l'état interne du moteur
        GrofiEngine.QuantumState finalState = grofiEngine.getQuantumState("ψ1");
        assertNotNull(finalState, "L'état ψ1 devrait exister dans le moteur.");
        assertEquals("COLLAPSED", finalState.state, "L'état interne devrait aussi être marqué comme effondré.");
        
        // Le nombre d'états actifs (superposés) doit être de 0
        assertEquals(0, grofiEngine.getActiveQuantumStates(), "Il ne devrait y avoir aucun état actif en superposition.");
    }
}