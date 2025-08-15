package com.magicstack.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EncounterControllerTest {

    @Test
    public void testResolveKnight() throws Exception {
        EncounterController controller = new EncounterController(new CreatureController());
        MockMvc mvc = MockMvcBuilders.standaloneSetup(controller).build();

        mvc.perform(post("/api/encounter/resolve")
                .contentType("application/json")
                .content("{\"playerId\":\"local\",\"creatureId\":\"knight\",\"stack\":1}"))
           .andExpect(status().isOk());
    }
}


