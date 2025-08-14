package com.magicstack.services;

import org.springframework.stereotype.Service;
import com.magicstack.models.Position6D;
import com.magicstack.dto.*;
import java.util.*;

/**
 * Core Magic Engine - handles all magical operations
 * Based on GROKAEN's 6D system
 */
@Service
public class MagicEngineService {
    
    private final Map<String, Object> activeSpells = new HashMap<>();
    private final Random random = new Random();
    private final FormulaRegistryService registry;
    private final RustTemporalClient rust;

    public MagicEngineService(FormulaRegistryService registry) {
        this.registry = registry;
        this.rust = new RustTemporalClient(System.getenv().getOrDefault("RUST_BASE_URL", "http://localhost:3001"));
    }
    
    public CastResponse cast(CastRequest request) {
        CastResponse response = new CastResponse();
        
        // Generate spell ID
        String spellId = "spell_" + UUID.randomUUID().toString();
        
        // Calculate 6D position for spell effect
        Position6D position = new Position6D();
        position.setX(request.getTargetX());
        position.setY(request.getTargetY());
        position.setZ(request.getTargetZ());
        position.setT(System.currentTimeMillis() / 1000.0);
        position.setC(0.8); // High causality for spells
        position.setPsi(random.nextDouble()); // Quantum fluctuation
        
        // Normalize formula via registry (Vector DB)
        String key = request.getFormulaId() != null ? request.getFormulaId() : request.getFormula();
        String normalized = registry.resolveFormulaText(key);

        // Store active spell
        Map<String, Object> spellData = new HashMap<>();
        
        // Special handling for URZ-KÔM's Mémoire Fractale
        if ("MEMOIRE_FRACTALE".equals(request.getFormula())) {
            // This spell reveals causal patterns
            position.setC(1.0); // Maximum causality
            response.setEffect("FRACTAL_PATTERNS_REVEALED");
            response.setMessage("Les patterns cachés se révèlent dans un rayon de 30 unités!");
            
            // Add pattern data to response
            Map<String, Object> patterns = new HashMap<>();
            patterns.put("radius", 30);
            patterns.put("connections", random.nextInt(10) + 5);
            patterns.put("causalStrength", 0.8 + random.nextDouble() * 0.2);
            spellData.put("patterns", patterns);
        } else {
            response.setEffect("SPELL_CAST_SUCCESS");
            response.setMessage("Formula " + normalized + " cast successfully!");
        }
        spellData.put("formula", request.getFormula());
        spellData.put("power", request.getPower());
        spellData.put("position", position);
        spellData.put("timestamp", System.currentTimeMillis());
        activeSpells.put(spellId, spellData);
        
        // Build response
        response.setSpellId(spellId);
        response.setSuccess(true);
        response.setPosition6D(position);

        // Call Rust temporal grammar executor (simulate/apply)
        try {
            RustTemporalClient.ExecuteResult exec = rust.execute(normalized, request.getContext(), request.getSeed());
            Map<String, String> outputs = new HashMap<>();
            outputs.put("literary", response.getMessage());
            // Iconic: keep heuristic for now
            String upper = (response.getEffect() + ":" + normalized).toUpperCase();
            String icon = upper.contains("FREEZE") ? "❄️"
                : upper.contains("TELEPORT") ? "🌀"
                : upper.contains("FIRE") ? "🔥"
                : upper.contains("SHIELD") ? "🛡️" : "✨";
            outputs.put("iconic", icon);
            String formulaText = (request.getFormulaId() != null ? request.getFormulaId() : (request.getFormula() != null ? request.getFormula() : ""));
            String runic = formulaText.replaceAll("[^A-Z_]", "").replaceAll("__+", "_");
            if (runic.length() > 16) runic = runic.substring(0, 16);
            outputs.put("runic", runic.isEmpty() ? "ᚠᚢᚦ" : runic);
            outputs.put("quantum", normalized);
            response.setOutputs(outputs);
            response.setEffects(Arrays.asList("magic_cast"));
            response.setSounds(Arrays.asList("magic_cast"));
            response.setTraceHash(exec.traceHash);

            // Apply mode stub: mark applied and return a minimal world diff structure
            boolean isApply = "apply".equalsIgnoreCase(request.getMode());
            response.setApplied(isApply);
            if (isApply) {
                Map<String, Object> diff = new HashMap<>();
                diff.put("entitiesUpdated", 1);
                diff.put("notes", "stub world_diff; to be replaced by real state changes");
                response.setWorldDiff(diff);
            }
        } catch (Exception e) {
            // Fallback to previous placeholder
            Map<String, String> outputs = new HashMap<>();
            outputs.put("literary", response.getMessage());
            outputs.put("iconic", "✨");
            outputs.put("runic", "ᚠᚢᚦ");
            outputs.put("quantum", normalized);
            response.setOutputs(outputs);
            response.setEffects(Arrays.asList("magic_cast"));
            response.setSounds(Arrays.asList("magic_cast"));
            response.setTraceHash(Integer.toHexString(normalized.hashCode()));
            boolean isApply = "apply".equalsIgnoreCase(request.getMode());
            response.setApplied(isApply);
        }
        
        return response;
    }
    
    public TranslateResponse translate(TranslateRequest request) {
        TranslateResponse response = new TranslateResponse();
        
        // Simple translation logic - in reality would use the 869 formulas
        Map<String, String> translations = new HashMap<>();
        
        String formula = request.getFormula();
        translations.put("literary", "Invoke the ancient powers of " + formula);
        translations.put("runic", "ᚠᚢᚦᚨᚱᚲ " + formula.substring(0, Math.min(formula.length(), 3)));
        translations.put("iconic", "🔮✨" + formula.charAt(0) + "⚡");
        
        response.setFormula(formula);
        response.setTranslations(translations);
        response.setFormat(request.getTargetFormat());
        
        return response;
    }
    
    public ShiftResponse temporalShift(ShiftRequest request) {
        ShiftResponse response = new ShiftResponse();
        
        // Calculate temporal shift
        double currentTime = System.currentTimeMillis() / 1000.0;
        double shiftedTime = currentTime + request.getTemporalDelta();
        
        Position6D newPosition = new Position6D();
        newPosition.setX(request.getPosition().getX());
        newPosition.setY(request.getPosition().getY());
        newPosition.setZ(request.getPosition().getZ());
        newPosition.setT(shiftedTime);
        newPosition.setC(request.getPosition().getC() * 0.9); // Causality decreases with time shift
        newPosition.setPsi(request.getPosition().getPsi());
        
        response.setOriginalPosition(request.getPosition());
        response.setShiftedPosition(newPosition);
        response.setTemporalDelta(request.getTemporalDelta());
        response.setSuccess(true);
        
        return response;
    }
    
    public Map<String, Object> getActiveSpells() {
        return new HashMap<>(activeSpells);
    }
    
    public ForkResponse realityFork(ForkRequest request) {
        ForkResponse response = new ForkResponse();
        
        String newWorldId = "world_" + UUID.randomUUID().toString();
        response.setNewWorldId(newWorldId);
        response.setSourceWorldId(request.getSourceWorldId());
        response.setSuccess(true);
        
        return response;
    }
    
    public MergeResponse timelineMerge(MergeRequest request) {
        MergeResponse response = new MergeResponse();
        
        String mergedWorldId = "merged_" + UUID.randomUUID().toString();
        response.setMergedWorldId(mergedWorldId);
        response.setEntitiesCount(request.getWorldIds().size() * 100); // Simulated count
        response.setSuccess(true);
        
        return response;
    }
    
    public Map<String, Object> getAllFormulas() {
        Map<String, Object> formulas = new HashMap<>();
        formulas.put("count", 869);
        formulas.put("categories", Arrays.asList("elemental", "temporal", "dimensional", "quantum"));
        formulas.put("status", "LOADED");
        return formulas;
    }
    
    public Position6D getEntityPosition(String entityId) {
        // For now, return a random position
        Position6D pos = new Position6D();
        pos.setX(random.nextDouble() * 100);
        pos.setY(random.nextDouble() * 100);
        pos.setZ(random.nextDouble() * 100);
        pos.setT(System.currentTimeMillis() / 1000.0);
        pos.setC(0.5);
        pos.setPsi(0.5);
        return pos;
    }
}