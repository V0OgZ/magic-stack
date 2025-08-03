package com.avalon;

import com.avalon.controllers.MagicCastController;
import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.services.HotsScenarioParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
@AutoConfigureMockMvc
public class HotsScenarioIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private HotsScenarioParser hotsScenarioParser;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testTomeInitiationSimpleScenario() throws Exception {
        // 1. Charger le scénario .hots
        String hotsScript = new String(Files.readAllBytes(Paths.get("../AVALON/🏠 HOME/🕯️ LUMEN/TOME_INITIATION_SIMPLE.hots")));

        // 2. Parser le scénario
        List<MagicCastRequest> requests = hotsScenarioParser.parse(hotsScript);
        assertFalse(requests.isEmpty(), "Le parser aurait dû générer des requêtes");

        // 3. Exécuter chaque requête et valider la réponse
        for (MagicCastRequest request : requests) {
            MvcResult result = mockMvc.perform(post("/api/magic/cast")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andReturn();

            String responseString = result.getResponse().getContentAsString();
            MagicCastResponse response = objectMapper.readValue(responseString, MagicCastResponse.class);
            assertTrue(response.isSuccess(), "La requête " + request.getFormula() + " aurait dû réussir");
        }
    }

    @Test
    void testVinceVegaGunPerduScenario() throws Exception {
        String hotsScript = new String(Files.readAllBytes(Paths.get("../AVALON/📜 Parchemins sauvage/scenarios/vince_vega_gun_perdu.hots")));
        List<MagicCastRequest> requests = hotsScenarioParser.parse(hotsScript);
        assertFalse(requests.isEmpty());

        for (MagicCastRequest request : requests) {
            MvcResult result = mockMvc.perform(post("/api/magic/cast")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk())
                    .andReturn();
            
            String responseString = result.getResponse().getContentAsString();
            MagicCastResponse response = objectMapper.readValue(responseString, MagicCastResponse.class);
            assertTrue(response.isSuccess(), "La requête " + request.getFormula() + "aurait dû réussir");
        }
    }
}