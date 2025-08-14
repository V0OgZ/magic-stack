package com.magicstack.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TreasureControllerTest {

    @Test
    public void testOpenPanoramixPotion() throws Exception {
        TreasureController controller = new TreasureController();
        MockMvc mvc = MockMvcBuilders.standaloneSetup(controller).build();

        mvc.perform(post("/api/treasure/open")
                .contentType("application/json")
                .content("{\"playerId\":\"local\",\"treasureType\":\"potion_panoramix\"}"))
           .andExpect(status().isOk());
    }
}


