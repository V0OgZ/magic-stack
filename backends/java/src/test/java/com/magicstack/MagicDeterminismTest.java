package com.magicstack;

import com.magicstack.services.MagicEngineService;
import com.magicstack.services.FormulaRegistryService;
import com.magicstack.dto.CastRequest;
import com.magicstack.dto.CastResponse;
import com.magicstack.dto.TranslateRequest;
import com.magicstack.dto.TranslateResponse;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class MagicDeterminismTest {
    @Test
    public void traceHashStableBetweenSimulateAndApply() {
        MagicEngineService svc = new MagicEngineService(new FormulaRegistryService());
        String formula = "ψ001: ⊙(Δt+1 @10,10 ⟶ MOV(Arthur, @10,10))";

        CastRequest sim = new CastRequest();
        sim.setFormula(formula);
        sim.setMode("simulate");
        sim.setSeed(42L);
        CastResponse simRes = svc.cast(sim);

        CastRequest app = new CastRequest();
        app.setFormula(formula);
        app.setMode("apply");
        app.setSeed(42L);
        CastResponse appRes = svc.cast(app);

        assertNotNull(simRes.getTraceHash());
        assertNotNull(appRes.getTraceHash());
        assertEquals(simRes.getTraceHash(), appRes.getTraceHash(), "traceHash must match for same seed and input");
    }

    @Test
    public void translateIncludesTraceHashWhenRequested() {
        MagicEngineService svc = new MagicEngineService(new FormulaRegistryService());
        TranslateRequest tr = new TranslateRequest();
        tr.setFormula("ψ002: ⊙(Δt+2 @5,5 ⟶ CREATE(CREATURE, Dragon, @5,5))");
        tr.setTargetFormat("all");
        tr.setIncludeQuantum(true);
        TranslateResponse resp = svc.translate(tr);
        assertNotNull(resp.getTranslations().get("traceHash"));
    }
}


