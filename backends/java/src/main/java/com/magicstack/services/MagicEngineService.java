package com.magicstack.services;

import org.springframework.stereotype.Service;
import com.magicstack.models.Position6D;
import com.magicstack.dto.*;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

/**
 * Core Magic Engine - handles all magical operations
 * Based on GROKAEN's 6D system
 */
@Service
public class MagicEngineService {
    private static final Logger log = LoggerFactory.getLogger(MagicEngineService.class);
    
    private final Map<String, Object> activeSpells = new HashMap<>();
    private final Random random = new Random();
    private final FormulaRegistryService registry;
    private final UltimateSpecService ultimates;
    private final RustTemporalClient rust;
     // Latest snapshot (lock-free read), plus un historique léger si besoin
    private final AtomicReference<Map<String,Object>> latestWorldDiff = new AtomicReference<>();
    private final Deque<Map<String, Object>> recentWorldDiffSnapshots = new ArrayDeque<>();
    private static final int WORLD_DIFF_HISTORY_LIMIT = 50;

    public MagicEngineService(FormulaRegistryService registry) {
        this.registry = registry;
        this.rust = new RustTemporalClient(System.getenv().getOrDefault("RUST_BASE_URL", "http://localhost:3001"));
        this.ultimates = new UltimateSpecService();
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
    
    /**
     * Record a world diff snapshot in memory, normalizing to the shape:
     * { ts: <ms>, diffs: [...], bbox: {xMin,xMax,yMin,yMax} | null }
     */
    public void recordWorldDiff(Object diffRaw) {
        try {
            long ts = System.currentTimeMillis();
            List<Object> diffs = new ArrayList<>();
            if (diffRaw instanceof Map<?,?> map) {
                Object d = map.get("diffs");
                if (d instanceof Collection<?> col) {
                    diffs.addAll((Collection<?>) col);
                } else if (map.containsKey("entities")) {
                    Object entities = map.get("entities");
                    if (entities instanceof Collection<?> col2) {
                        diffs.addAll(col2);
                    } else if (entities instanceof Map<?,?> m2) {
                        diffs.add(m2);
                    } else {
                        diffs.add(map);
                    }
                } else {
                    diffs.add(map);
                }
            } else if (diffRaw instanceof Collection<?> col) {
                diffs.addAll((Collection<?>) col);
            } else if (diffRaw != null) {
                diffs.add(diffRaw);
            }
            Map<String, Object> bbox = computeBboxFromDiffs(diffs);
            Map<String, Object> snapshot = new HashMap<>();
            snapshot.put("ts", ts);
            snapshot.put("diffs", diffs);
            snapshot.put("bbox", bbox);
            
            latestWorldDiff.set(snapshot); // lecture instantanée côté GET
            synchronized (recentWorldDiffSnapshots) {
                if (recentWorldDiffSnapshots.size() >= WORLD_DIFF_HISTORY_LIMIT) {
                    recentWorldDiffSnapshots.pollFirst();
                }
                recentWorldDiffSnapshots.addLast(snapshot);
            }
        } catch (Exception e) {
            if (log.isDebugEnabled()) log.debug("recordWorldDiff failed: {}", e.getMessage());
        }
    }
    
    private Map<String, Object> computeBboxFromDiffs(List<Object> diffs) {
        Double xMin = null, xMax = null, yMin = null, yMax = null;
        for (Object o : diffs) {
            if (o instanceof Map<?,?> m) {
                Object pos = m.get("position");
                if (pos instanceof Map<?,?> pm) {
                    xMin = minD(xMin, pm.get("x")); xMax = maxD(xMax, pm.get("x"));
                    yMin = minD(yMin, pm.get("y")); yMax = maxD(yMax, pm.get("y"));
                } else {
                    xMin = minD(xMin, m.get("x")); xMax = maxD(xMax, m.get("x"));
                    yMin = minD(yMin, m.get("y")); yMax = maxD(yMax, m.get("y"));
                }
            }
        }
        if (xMin == null || xMax == null || yMin == null || yMax == null) return null;
        Map<String, Object> bbox = new HashMap<>();
        bbox.put("xMin", xMin); bbox.put("xMax", xMax);
        bbox.put("yMin", yMin); bbox.put("yMax", yMax);
        return bbox;
    }
    
    private Double minD(Double a, Object b) {
        Double v = toDouble(b); if (v == null) return a; return a == null ? v : Math.min(a, v);
    }
    private Double maxD(Double a, Object b) {
        Double v = toDouble(b); if (v == null) return a; return a == null ? v : Math.max(a, v);
    }
    private Double toDouble(Object o) {
        try { return o == null ? null : Double.parseDouble(String.valueOf(o)); } catch (Exception e) { return null; }
    }
    
    /** Return the most recent world diff snapshot, or an empty one. */
    public Map<String, Object> getLatestWorldDiffSnapshot() {
        Map<String, Object> last = latestWorldDiff.get();
        if (last == null) {
            Map<String, Object> empty = new HashMap<>();
            empty.put("ts", System.currentTimeMillis());
            empty.put("diffs", Collections.emptyList());
            empty.put("bbox", null);
            return empty;
        }
        return new HashMap<>(last); // defensive copy
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
        // Ultimate guard (FOUB Millennium Controller)
        boolean handledAsUltimate = false;
        boolean isMillennium = key != null && "MILLENNIUM_CONTROLLER".equalsIgnoreCase(key.trim());
        String activeHeroId = null;
        try {
            if (request.getContext() instanceof java.util.Map<?, ?> ctx) {
                Object ah = ctx.get("activeHeroId");
                if (ah != null) activeHeroId = String.valueOf(ah);
            }
        } catch (Exception ignored) { }

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
        // Apply FOUB guard after default effect/message
        if (isMillennium) {
            if (activeHeroId == null || !activeHeroId.toLowerCase().contains("foub")) {
                response.setSuccess(false);
                response.setEffect("NOT_FOUB_PALADIN");
                response.setMessage("🚫 MILLENNIUM CONTROLLER: Seul Foub peut utiliser cet ultimate !");
                Map<String, String> outputs = new HashMap<>();
                outputs.put("literary", "Le pouvoir refuse l'appel. Seul Foub peut invoquer la Lueur du Juste.");
                outputs.put("iconic", "⛔");
                outputs.put("runic", "FORBIDDEN");
                outputs.put("quantum", normalized);
                response.setOutputs(outputs);
                response.setEffects(Arrays.asList("ultimate_denied"));
                response.setSounds(Arrays.asList("error"));
                response.setApplied("apply".equalsIgnoreCase(request.getMode()));
                return response;
            } else {
                handledAsUltimate = true;
                response.setEffect("MILLENNIUM_CONTROLLER_ACTIVATED");
                response.setMessage("🏆 MILLENNIUM CONTROLLER ACTIVÉ ! Foub invoque la Lueur du Juste – résurrection de masse et protection divine.");
            }
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
            response.setTraceHash(exec.traceHash);
            if (handledAsUltimate) {
                Map<String, String> outputs = new HashMap<>();
                outputs.put("literary", response.getMessage());
                outputs.put("iconic", "🛡️");
                outputs.put("runic", "MILLENNIUM");
                outputs.put("quantum", "SEQ(transform→mass_rez→exhaustion→recovery)");
                response.setOutputs(outputs);
                response.setEffects(Arrays.asList("ultimate_transform","divine_bubble","mass_resurrection","divine_exhaustion","recovery"));
                response.setSounds(Arrays.asList("aura_dbz","bubble","rez_mass","exhaust","recover"));
            } else {
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
            }

            // Apply mode: delegate to Rust /temporal/apply for world diff (MVP)
            boolean isApply = "apply".equalsIgnoreCase(request.getMode());
            response.setApplied(isApply);
            if (isApply) {
                try {
                    RustTemporalClient.ApplyResult applyRes = rust.apply(normalized, request.getContext(), request.getSeed());
                    if (log.isDebugEnabled()) {
                        log.debug("/temporal/apply traceHash={}", applyRes.traceHash);
                    }
                    // Parse world_diff from returned JSON string
                    Map<String, Object> parsed = new com.fasterxml.jackson.databind.ObjectMapper().readValue(applyRes.worldDiffJson, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>(){});
                    Object wd = parsed.get("world_diff");
                    if (log.isDebugEnabled()) {
                        log.debug("Parsed apply payload keys={}, has_world_diff={}", parsed.keySet(), (wd != null));
                    }
                    if (wd instanceof Map<?, ?> tmp) {
                        Map<String, Object> wdm = new HashMap<>();
                        for (Map.Entry<?, ?> e : tmp.entrySet()) {
                            wdm.put(String.valueOf(e.getKey()), e.getValue());
                        }
                        if (handledAsUltimate) {
                            wdm.putIfAbsent("ultimate", "MILLENNIUM_CONTROLLER");
                            wdm.putIfAbsent("phases", Arrays.asList("transform","divine_bubble","mass_rez","exhaustion","recovery"));
                        }
                        response.setWorldDiff(wdm);
                        recordWorldDiff(wdm);
                    } else if (parsed.containsKey("world_diff") && parsed.get("world_diff") == null) {
                        // Ensure not null in response
                        Map<String, Object> empty = new HashMap<>();
                        empty.put("notes", "world_diff missing; empty diff");
                        if (handledAsUltimate) empty.put("ultimate", "MILLENNIUM_CONTROLLER");
                        response.setWorldDiff(empty);
                        recordWorldDiff(empty);
                    } else {
                        // If structure differs, expose full payload under raw
                        Map<String, Object> fallback = new HashMap<>();
                        fallback.put("raw", parsed);
                        if (handledAsUltimate) fallback.put("ultimate", "MILLENNIUM_CONTROLLER");
                        response.setWorldDiff(fallback);
                        recordWorldDiff(fallback);
                    }
                } catch (Exception e) {
                    log.error("Apply mode failed (rust unavailable or parse error)", e);
                    throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "rust_unavailable");
                }
            }
        } catch (Exception e) {
            log.error("Cast failed", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "cast_failed");
        }
        
        return response;
    }

    public CastResponse castUltimate(String formulaId, Map<String, Object> context) {
        CastRequest req = new CastRequest();
        req.setFormulaId(formulaId);
        req.setMode("simulate");
        req.setContext(context);
        // If an UltimateSpec exists, use its engineFormula and decorate outputs
        Optional<UltimateSpecService.UltimateSpec> specOpt = ultimates.getById(formulaId);
        if (specOpt.isEmpty()) {
            CastResponse r = new CastResponse();
            r.setSuccess(false);
            r.setMessage("Unknown ultimate: " + formulaId);
            return r;
        }
        UltimateSpecService.UltimateSpec spec = specOpt.get();
        req.setFormula(spec.engineFormula != null ? spec.engineFormula : formulaId);
        CastResponse base = cast(req);
        if (spec.outputs != null) base.setOutputs(new HashMap<>(spec.outputs));
        if (spec.effects != null) base.setEffects(new ArrayList<>(spec.effects));
        if (spec.sounds != null) base.setSounds(new ArrayList<>(spec.sounds));
        if (base.getWorldDiff() != null && spec.phases != null) {
            base.getWorldDiff().putIfAbsent("ultimate", formulaId);
            base.getWorldDiff().putIfAbsent("phases", spec.phases);
        }
        return base;
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
	        } else {
	            // Non-runic: try JSON-asset translation then fallback to redacted description
	            String literary =
	                tryTranslateJsonAsset(normalized)
	                    .orElse(applyRedactionLayer("Activation de la formule: " + normalized));
	            translations.put("literary", literary);
	            translations.put("runic", deriveRunicToken(normalized));
	            translations.put("iconic", buildIconicFromText(normalized));
	        }
	        
        // Optional: include quantum/trace by simulating a no-op execution in Rust
        if (Boolean.TRUE.equals(request.getIncludeQuantum())) {
            translations.put("quantum", normalized);
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