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
    
    public Map<String, Object> getRegistryInfo() { return registry.getRegistryInfo(); }
    public Map<String, String> getAllCachedFormulas() { return registry.getAllCachedFormulas(); }
    public Map<String, Object> getRecentChanges(Integer limit) {
        try {
            return rust.getRecentChanges(limit);
        } catch (Exception e) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "rust_changes_unavailable");
            err.put("message", e.getMessage());
            return err;
        }
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

            // Apply mode: delegate to Rust /temporal/apply for world diff (MVP)
            boolean isApply = "apply".equalsIgnoreCase(request.getMode());
            response.setApplied(isApply);
            if (isApply) {
                try {
                    RustTemporalClient.ApplyResult applyRes = rust.apply(normalized, request.getContext(), request.getSeed());
                    // Parse world_diff from returned JSON string
                    Map<String, Object> parsed = new com.fasterxml.jackson.databind.ObjectMapper().readValue(applyRes.worldDiffJson, Map.class);
                    Object wd = parsed.get("world_diff");
                    if (wd instanceof Map) {
                        //noinspection unchecked
                        response.setWorldDiff((Map<String, Object>) wd);
                    } else if (parsed.containsKey("world_diff") && parsed.get("world_diff") == null) {
                        // Ensure not null in response
                        Map<String, Object> empty = new HashMap<>();
                        empty.put("notes", "world_diff missing; empty diff");
                        response.setWorldDiff(empty);
                    } else {
                        // If structure differs, expose full payload under raw
                        Map<String, Object> fallback = new HashMap<>();
                        fallback.put("raw", parsed);
                        response.setWorldDiff(fallback);
                    }
                } catch (Exception ignore) {
                    Map<String, Object> diff = new HashMap<>();
                    diff.put("entitiesUpdated", 0);
                    diff.put("notes", "apply fallback; rust unavailable");
                    response.setWorldDiff(diff);
                }
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
	        String input = request.getFormula() != null ? request.getFormula() : "";
	        String normalized = registry.resolveFormulaText(input);
	        
	        Map<String, String> translations = new LinkedHashMap<>();
	        
	        // 1) Runic detection (ψ123: ⊙(...)) and narrative translation with light redaction layer
	        if (isRunicFormula(normalized)) {
	            String narrative = translateRunicContent(normalized);
	            translations.put("literary", narrative);
	            translations.put("runic", extractRunicGlyph(normalized));
	            translations.put("iconic", buildIconicFromText(normalized));
	            translations.put("quantum", normalized);
	        } else {
	            // Non-runic: try JSON-asset translation then fallback to redacted description
	            String literary =
	                tryTranslateJsonAsset(normalized)
	                    .orElse(applyRedactionLayer("Activation de la formule: " + normalized));
	            translations.put("literary", literary);
	            translations.put("runic", deriveRunicToken(normalized));
	            translations.put("iconic", buildIconicFromText(normalized));
	            translations.put("quantum", normalized);
	        }
	        
        // Optional: include quantum/trace by simulating a no-op execution in Rust
        if (Boolean.TRUE.equals(request.getIncludeQuantum())) {
            try {
                RustTemporalClient.ExecuteResult exec = rust.execute(normalized, Map.of(), null);
                translations.put("traceHash", exec.traceHash);
            } catch (Exception ignored) { }
        }

        response.setFormula(input);
        response.setTranslations(translations);
        response.setFormat(request.getTargetFormat());
        return response;
    }

	    // ===== Translation helpers (ported/adapted from legacy AVALON-1 concepts) =====
	    private boolean isRunicFormula(String formula) {
	        if (formula == null) return false;
	        return formula.matches("^ψ\\d+:\\s*⊙\\(.*\\)$");
	    }

	    private String translateRunicContent(String runicFormula) {
	        try {
	            // Prefer embedded narrative if present (legacy assets sometimes embed description in JSON-ish payload)
	            String llm = extractLLMDescription(runicFormula);
	            if (llm != null && !llm.isEmpty()) {
	                return applyRedactionLayer("" + llm);
	            }
	            // Fallback: generate narrative from recognizable tokens
	            return applyRedactionLayer(generateSimpleTranslation(runicFormula));
	        } catch (Exception e) {
	            return "Traduction indisponible";
	        }
	    }

	    private String extractLLMDescription(String content) {
	        try {
	            String[] fields = {"description", "narrative", "story", "lore", "flavor_text", "text_description", "llm_description"};
	            for (String f : fields) {
	                java.util.regex.Matcher m = java.util.regex.Pattern
	                    .compile("\"" + f + "\"\\s*:\\s*\"([^\"]+)\"")
	                    .matcher(content);
	                if (m.find()) return m.group(1);
	            }
	        } catch (Exception ignored) { }
	        return null;
	    }

	    private String generateSimpleTranslation(String content) {
	        // Time Δt+n
	        String timePhrase = "";
	        java.util.regex.Matcher tm = java.util.regex.Pattern.compile("Δt\\+(\\d+)").matcher(content);
	        if (tm.find()) {
	            timePhrase = "dans " + tm.group(1) + " tours, ";
	        }
	        // Coordinates @x,y
	        String locPhrase = "";
	        java.util.regex.Matcher cm = java.util.regex.Pattern.compile("@(\\d+),(\\d+)").matcher(content);
	        if (cm.find()) {
	            locPhrase = "aux coordonnées (" + cm.group(1) + ", " + cm.group(2) + "), ";
	        }
	        String action = "une énergie quantique se manifeste";
	        if (content.contains("MOV(")) action = "un déplacement quantique s'opère";
	        else if (content.contains("HEAL_HERO")) action = "une lumière dorée restaure la vie";
	        else if (content.contains("DAMAGE_ENEMY")) action = "des éclairs de destruction frappent";
	        else if (content.contains("BATTLE(")) action = "les destins s'entrechoquent dans un combat";
	        else if (content.contains("CREATE(")) action = "la réalité se plie et façonne un objet";
	        
	        return "" + timePhrase + action + (locPhrase.isEmpty() ? "" : (" "+locPhrase)).trim();
	    }

	    // ===== JSON assets translation (heuristics inspired by legacy) =====
	    private java.util.Optional<String> tryTranslateJsonAsset(String text) {
	        if (text == null) return java.util.Optional.empty();
	        boolean looksJson = text.contains("{") && text.contains(":");
	        if (!looksJson) return java.util.Optional.empty();
	        try {
	            Map<?,?> map = new com.fasterxml.jackson.databind.ObjectMapper().readValue(text, Map.class);
	            StringBuilder sb = new StringBuilder();
	            if (map.containsKey("paradoxRisk")) {
	                sb.append("Évaluation du risque de paradoxe: ").append(String.valueOf(map.get("paradoxRisk"))).append(". ");
	            }
	            if (map.containsKey("temporalStability")) {
	                sb.append("Stabilité temporelle: ").append(String.valueOf(map.get("temporalStability"))).append(". ");
	            }
	            if (map.containsKey("affectedRadius")) {
	                sb.append("Zone affectée de rayon ").append(String.valueOf(map.get("affectedRadius"))).append(". ");
	            }
	            if (map.containsKey("damage")) {
	                sb.append("Dégâts infligés: ").append(String.valueOf(map.get("damage"))).append(". ");
	            }
	            if (map.containsKey("healing")) {
	                sb.append("Soins prodigués: ").append(String.valueOf(map.get("healing"))).append(". ");
	            }
	            String s = sb.toString().trim();
	            return s.isEmpty() ? java.util.Optional.empty() : java.util.Optional.of(applyRedactionLayer(s));
	        } catch (Exception ignored) {
	            return java.util.Optional.empty();
	        }
	    }

	    private String applyRedactionLayer(String text) {
	        if (text == null) return null;
	        // Minimal synonym/lexicon mapping to hide engine tokens
	        String[][] map = new String[][]{
	            {"MOV", "déplacement"},
	            {"HEAL_HERO", "guérison"},
	            {"DAMAGE_ENEMY", "frappe"},
	            {"CREATE", "manifeste"},
	            {"AMPLIFY", "amplifie"},
	            {"CONSTRUCTIVE", "interférence constructive"},
	            {"DESTRUCTIVE", "interférence destructive"},
	            {"QUANTUM", "quantique"},
	            {"RUNIC", "runique"},
	            {"EXCALIBUR", "épée sacrée"},
            {"BANKAI", "révélation ultime"},
            {"ETH", "énergie éthérique"},
            {"FACES", "visages du destin"},
            {"GROFI", "philosophie Grofi"}
	        };
	        String redacted = text;
	        for (String[] kv : map) {
	            redacted = redacted.replace(kv[0], kv[1]);
	        }
	        return redacted;
	    }

	    private String extractRunicGlyph(String runicFormula) {
	        // Keep a short marker for UI
	        String psi = "ψ";
	        java.util.regex.Matcher m = java.util.regex.Pattern.compile("^ψ(\\d+):").matcher(runicFormula);
	        if (m.find()) psi += m.group(1);
	        return psi;
	    }

	    private String deriveRunicToken(String text) {
	        if (text == null) return "ᚠᚢᚦ";
	        String cleaned = text.toUpperCase().replaceAll("[^A-Z_]", "").replaceAll("__+", "_");
	        return cleaned.isEmpty() ? "ᚠᚢᚦ" : cleaned.substring(0, Math.min(16, cleaned.length()));
	    }

	    private String buildIconicFromText(String text) {
	        if (text == null) return "✨";
	        String upper = text.toUpperCase();
	        if (upper.contains("FIRE")) return "🔥";
	        if (upper.contains("HEAL")) return "💚";
	        if (upper.contains("TELEPORT") || upper.contains("MOV(")) return "🌀";
	        if (upper.contains("SHIELD")) return "🛡️";
	        if (upper.contains("DAMAGE")) return "⚔️";
	        return "✨";
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