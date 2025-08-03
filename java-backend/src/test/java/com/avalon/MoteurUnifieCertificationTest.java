package com.avalon;

import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import com.avalon.services.CausalIntegrityService;
import com.avalon.services.engines.GrofiEngine;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Map;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * 🏆 CERTIFICATION COMPLÈTE DU MOTEUR UNIFIÉ
 * Test exhaustif utilisant les vraies formules d'AVALON
 */
@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("🏆 Certification du Moteur Unifié AVALON")
public class MoteurUnifieCertificationTest {

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
        grofiEngine.clearStates();
        causalIntegrityService.clearAll();
    }

    // ========== TESTS DES FORMULES SIMPLES ==========

    @Test
    @DisplayName("✨ Test Formule Simple: TELEPORT_HERO")
    void testSimpleTeleportHero() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("SIMPLE");
        request.setFormula("TELEPORT_HERO(Arthur, @10,10)");
        request.setCasterId("Arthur");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.effects[0]").value("HERO_TELEPORTED"));
    }

    @Test
    @DisplayName("🔥 Test Formule Simple: AREA_DAMAGE (Fireball)")
    void testSimpleAreaDamage() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("SIMPLE");
        request.setFormula("AREA_DAMAGE(target, 2, 40)");
        request.setCasterId("Merlin");
        request.setTargetId("Dragon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    // ========== TESTS DES FORMULES QUANTIQUES (ψ) ==========

    @Test
    @DisplayName("🌀 Test Quantique: Création État Superposé Simple")
    void testQuantumSuperposition() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("RUNIC");
        request.setFormula("ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon, @15,15))");
        request.setCasterId("Jean-Grofignon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.quantumState.state").value("SUPERPOSITION"))
                .andExpect(jsonPath("$.quantumState.psiId").value("ψ001"));

        assertEquals(1, grofiEngine.getActiveQuantumStates());
    }

    @Test
    @DisplayName("💥 Test Quantique: Effondrement État")
    void testQuantumCollapse() throws Exception {
        // 1. Créer la superposition
        MagicCastRequest superpositionRequest = new MagicCastRequest();
        superpositionRequest.setFormulaType("RUNIC");
        superpositionRequest.setFormula("ψ002: ⊙(MOV(Arthur, @20,20))");
        superpositionRequest.setCasterId("Arthur");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(superpositionRequest)))
                .andExpect(status().isOk());

        // 2. Effondrer l'état
        MagicCastRequest collapseRequest = new MagicCastRequest();
        collapseRequest.setFormulaType("RUNIC");
        collapseRequest.setFormula("ψ002: †");
        collapseRequest.setCasterId("Arthur");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.quantumState.state").value("COLLAPSED"))
                .andExpect(jsonPath("$.effects").value(hasItem("QUANTUM_COLLAPSE_EXECUTED")));

        assertEquals(0, grofiEngine.getActiveQuantumStates());
    }

    // ========== TESTS DES FORMULES GROFI ==========

    @Test
    @DisplayName("🌲 Test GROFI: Fusion avec la Forêt")
    void testGrofiFusion() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("GROFI");
        request.setFormula("FUSION(GROFI, FOREST_THOUGHT)");
        request.setCasterId("Jean-Grofignon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("GROFI A FUSIONNÉ AVEC SA FORÊT!"))
                .andExpect(jsonPath("$.effects").value(hasItem("CONSCIENCE_VEGETALE_DISTRIBUEE")));
    }

    @Test
    @DisplayName("🛡️ Test GROFI: Collapse Override")
    void testGrofiCollapseOverride() throws Exception {
        // 1. Créer et effondrer un état
        MagicCastRequest superpositionRequest = new MagicCastRequest();
        superpositionRequest.setFormulaType("RUNIC");
        superpositionRequest.setFormula("ψ003: ⊙(CREATE(CREATURE, Phoenix))");
        superpositionRequest.setCasterId("Jean-Grofignon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(superpositionRequest)));

        MagicCastRequest collapseRequest = new MagicCastRequest();
        collapseRequest.setFormulaType("RUNIC");
        collapseRequest.setFormula("ψ003: †");
        collapseRequest.setCasterId("Jean-Grofignon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest)));

        // 2. Utiliser Collapse Override
        MagicCastRequest overrideRequest = new MagicCastRequest();
        overrideRequest.setFormulaType("GROFI");
        overrideRequest.setFormula("COLLAPSE_OVERRIDE(all_timelines)");
        overrideRequest.setCasterId("Jean-Grofignon");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(overrideRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.metadata.restored_states").value(1));
    }

    // ========== TESTS DES FORMULES GRUT ==========

    @Test
    @DisplayName("👁️ Test GRUT: Scan Panoptique")
    void testGrutPanopticScan() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("GRUT");
        request.setFormula("PANOPTIC_SCAN(all_dimensions)");
        request.setCasterId("GRUT");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.panopticVision.visibleDimensions").value(6))
                .andExpect(jsonPath("$.panopticVision.detectedEntities").isNotEmpty());
    }

    // ========== TESTS DES FORMULES TEMPORELLES ==========

    @Test
    @DisplayName("⏳ Test Temporal: Interférence Temporelle")
    void testTemporalInterference() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("TEMPORAL");
        request.setFormula("TEMPORAL_INTERFERENCE(ψ1, ψ2)");
        request.setCasterId("Chronos");
        request.setAmplitude(new MagicCastRequest.ComplexAmplitude(0.8, 0.6));

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.temporalEffect.interferenceType").exists());
    }

    // ========== TESTS DES CAS LIMITES ==========

    @Test
    @DisplayName("🚫 Test Limite: Formule Blacklistée par WALTER")
    void testWalterSecurityBlacklist() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("SIMPLE");
        request.setFormula("DESTROY_AVALON");
        request.setCasterId("EvilHacker");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("WALTER SECURITY: Requête non autorisée!"));
    }

    @Test
    @DisplayName("⚡ Test Limite: Double Effondrement")
    void testDoubleCollapse() throws Exception {
        // 1. Créer la superposition
        MagicCastRequest superpositionRequest = new MagicCastRequest();
        superpositionRequest.setFormulaType("RUNIC");
        superpositionRequest.setFormula("ψ004: ⊙(BATTLE(Arthur, Dragon))");
        superpositionRequest.setCasterId("Arthur");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(superpositionRequest)));

        // 2. Premier effondrement - succès
        MagicCastRequest collapseRequest1 = new MagicCastRequest();
        collapseRequest1.setFormulaType("RUNIC");
        collapseRequest1.setFormula("ψ004: †");
        collapseRequest1.setCasterId("Arthur");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // 3. Deuxième effondrement - échec
        MagicCastRequest collapseRequest2 = new MagicCastRequest();
        collapseRequest2.setFormulaType("RUNIC");
        collapseRequest2.setFormula("ψ004: †");
        collapseRequest2.setCasterId("GRUT");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest2)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

    // ========== TESTS DES FORMULES COMPLEXES D'ARTEFACTS ==========

    @Test
    @DisplayName("⚔️ Test Artefact: Excalibur Quantum Slash")
    void testExcaliburQuantumSlash() throws Exception {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("RUNIC");
        request.setFormula("ψ001: ⊙(Δt+1 @target ⟶ USE(excalibur_arthur, POWER_SLASH_QUANTUM))");
        request.setCasterId("Arthur");
        request.setParameters(Map.of("target", "Dragon"));

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.quantumState.state").value("SUPERPOSITION"));
    }

    // ========== TESTS D'INTÉGRATION COMPLÈTE ==========

    @Test
    @DisplayName("🌟 Test Intégration: Scénario Complet Multi-Formules")
    void testScenarioCompletMultiFormules() throws Exception {
        // 1. Scan GRUT pour détecter les entités
        MagicCastRequest scanRequest = new MagicCastRequest();
        scanRequest.setFormulaType("GRUT");
        scanRequest.setFormula("PANOPTIC_SCAN(all_dimensions)");
        scanRequest.setCasterId("GRUT");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(scanRequest)))
                .andExpect(status().isOk());

        // 2. Créer une superposition quantique
        MagicCastRequest quantumRequest = new MagicCastRequest();
        quantumRequest.setFormulaType("RUNIC");
        quantumRequest.setFormula("ψ005: ⊙(CREATE(CREATURE, Phoenix, @25,25))");
        quantumRequest.setCasterId("Merlin");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(quantumRequest)))
                .andExpect(status().isOk());

        // 3. Créer une interférence temporelle
        MagicCastRequest temporalRequest = new MagicCastRequest();
        temporalRequest.setFormulaType("TEMPORAL");
        temporalRequest.setFormula("TIMELINE_BRANCH(current → new)");
        temporalRequest.setCasterId("Chronos");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(temporalRequest)))
                .andExpect(status().isOk());

        // 4. Effondrer l'état quantique
        MagicCastRequest collapseRequest = new MagicCastRequest();
        collapseRequest.setFormulaType("RUNIC");
        collapseRequest.setFormula("ψ005: †");
        collapseRequest.setCasterId("Merlin");

        mockMvc.perform(post("/api/magic/cast")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(collapseRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // 5. Vérifier l'état du système
        mockMvc.perform(get("/api/magic/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.grofiActive").value(true))
                .andExpect(jsonPath("$.grutActive").value(true))
                .andExpect(jsonPath("$.temporalCodexActive").value(true))
                .andExpect(jsonPath("$.walterSecurityActive").value(true));
    }

    // ========== TESTS DE PERFORMANCE ==========

    @Test
    @DisplayName("⚡ Test Performance: 100 Formules Rapides")
    void testPerformance100Formulas() throws Exception {
        long startTime = System.currentTimeMillis();

        for (int i = 0; i < 100; i++) {
            MagicCastRequest request = new MagicCastRequest();
            request.setFormulaType("SIMPLE");
            request.setFormula("MOV(Hero" + i + ", @" + i + "," + i + ")");
            request.setCasterId("Hero" + i);

            mockMvc.perform(post("/api/magic/cast")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                    .andExpect(status().isOk());
        }

        long endTime = System.currentTimeMillis();
        long totalTime = endTime - startTime;
        
        System.out.println("🏆 Performance: 100 formules exécutées en " + totalTime + "ms");
        assertTrue(totalTime < 5000, "Les 100 formules doivent s'exécuter en moins de 5 secondes");
    }
}

// Classe helper pour les assertions personnalisées
class CustomMatchers {
    public static org.hamcrest.Matcher<java.lang.Iterable<? extends String>> hasItem(String item) {
        return org.hamcrest.Matchers.hasItem(item);
    }
}