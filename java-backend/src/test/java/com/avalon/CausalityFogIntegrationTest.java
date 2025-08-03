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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CausalityFogIntegrationTest {

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
        // Réinitialiser les états avant chaque test
        grofiEngine.clearStates();
        // Configurer les états temporels pour le scénario AXISI vs LENTUS
        causalIntegrityService.setTemporalState("AXISI", 3.0);
        causalIntegrityService.setTemporalState("LENTUS", 1.6);
    }

    @Test
    void testCausalBlockingPreventsCollapse() throws Exception {
        // 1. Mettre en superposition le vol du trésor par AXISI
        MagicCastRequest superpositionRequest = new MagicCastRequest();
        superpositionRequest.setFormulaType("RUNIC");
        superpositionRequest.setFormula("ψ1: ⊙(TEMPORAL_THEFT)");
        superpositionRequest.setCasterId("AXISI");
        superpositionRequest.setParameters(Map.of(
            "target", "Coffre des Merveilles",
            "owner", "LENTUS",
            "anchorTime", 3.0 // Le trésor est ancré au jour 3 de LENTUS
        ));

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(superpositionRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.quantumState.state").value("SUPERPOSITION"));

        // Vérifier que l'état quantique a bien été créé
        assertNotNull(grofiEngine.getQuantumState("ψ1"));
        assertEquals("SUPERPOSED", grofiEngine.getQuantumState("ψ1").state);

        // 2. Tenter de faire effondrer l'état
        MagicCastRequest collapseRequest = new MagicCastRequest();
        collapseRequest.setFormulaType("RUNIC");
        collapseRequest.setFormula("ψ1: †");
        collapseRequest.setCasterId("AXISI"); // C'est AXISI qui observe et tente de collapser

        MvcResult result = mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest)))
                .andExpect(status().isOk()) // L'API réussit, mais la logique métier bloque
                .andReturn();
        
        String responseString = result.getResponse().getContentAsString();
        MagicCastResponse response = objectMapper.readValue(responseString, MagicCastResponse.class);
        
        // 3. Valider que l'effondrement a échoué à cause du blocage causal
        assertFalse(response.isSuccess(), "L'effondrement aurait dû échouer");
        assertEquals("CAUSAL_BLOCKING: Les conditions pour l'effondrement de ψ1 ne sont pas réunies.", response.getMessage());
        assertTrue(response.getEffects().contains("CAUSAL_BLOCKING"));
        
        // 4. Vérifier que l'état est toujours en superposition
        assertEquals("SUPERPOSED", grofiEngine.getQuantumState("ψ1").state, "L'état ne devrait pas avoir été effondré.");
    }
}