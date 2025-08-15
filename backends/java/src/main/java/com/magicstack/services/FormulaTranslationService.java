package com.magicstack.services;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Rule-based translator for HOTS scripts and runic fragments into Morgana-style literary narration.
 * Deterministic and fast; no external LLM.
 */
@Service
public class FormulaTranslationService {

    private final Map<String, List<String>> heroVariations;
    private final Map<String, String> iconMap;
    private final Random seededRandom;

    public FormulaTranslationService() {
        this.heroVariations = buildHeroVariations();
        this.iconMap = buildIconMap();
        // Seed can be overridden by callers if they want; default fixed for determinism
        this.seededRandom = new Random(42L);
    }

    public String translateHotsToMarkdown(String hotsScript, Long seed) {
        Random rng = seed != null ? new Random(seed) : this.seededRandom;
        StringBuilder md = new StringBuilder();
        md.append("# ✨ Scénario - Traduction Littéraire\n\n");
        String[] lines = hotsScript.split("\r?\n");
        for (String raw : lines) {
            String line = raw.trim();
            if (line.isEmpty() || line.startsWith("#")) continue;
            String translated = translateLine(line, rng);
            if (translated != null && !translated.isEmpty()) {
                md.append("- ").append(translated).append("\n");
            }
        }
        return md.toString();
    }

    public String translateLine(String line) { return translateLine(line, this.seededRandom); }

    private String translateLine(String line, Random rng) {
        // HERO(name)
        Matcher mHero = Pattern.compile("^HERO\\(([^)]+)\\)").matcher(line);
        if (mHero.find()) {
            String name = mHero.group(1).trim();
            List<String> vars = heroVariations.getOrDefault(name, List.of(
                    "👑 Le héros légendaire " + name + " entre en scène"
            ));
            return pick(vars, rng);
        }

        // MOV(name, @x,y)
        Matcher mMov = Pattern.compile("^MOV\\(([^,]+),\\s*@([0-9]+(?:\\.[0-9]+)?),([0-9]+(?:\\.[0-9]+)?)\\)").matcher(line);
        if (mMov.find()) {
            String name = mMov.group(1).trim();
            String place = "les terres mystiques"; // redaction: hide coords
            return "🚶 " + name + " se déplace vers " + place;
        }

        // CREATE(type, name, ...)
        Matcher mCreate = Pattern.compile("^CREATE\\(([^,]+),\\s*([^,\n)]+).*").matcher(line);
        if (mCreate.find()) {
            String type = mCreate.group(1).trim();
            String name = mCreate.group(2).trim();
            return "✨ Une manifestation de type " + type.toLowerCase(Locale.ROOT) + " apparaît: " + name;
        }

        // BATTLE(a, b)
        Matcher mBattle = Pattern.compile("^BATTLE\\(([^,]+),\\s*([^)]+)\\)").matcher(line);
        if (mBattle.find()) {
            String a = mBattle.group(1).trim();
            String b = mBattle.group(2).trim();
            return "⚔️ " + a + " affronte " + b + " dans un duel des destins";
        }

        // CAST(SPELL, name, TARGET:entity)
        Matcher mCast = Pattern.compile("^CAST\\(SPELL,\\s*([^,\n)]+).*").matcher(line);
        if (mCast.find()) {
            String spell = mCast.group(1).trim();
            return "🔮 Le sort " + spell + " est invoqué";
        }

        // USE(ARTIFACT, name, HERO:hero)
        Matcher mUse = Pattern.compile("^USE\\(ARTIFACT,\\s*([^,\n)]+).*").matcher(line);
        if (mUse.find()) {
            String artifact = mUse.group(1).trim();
            return "📜 L'artefact " + artifact + " révèle son pouvoir";
        }

        // Runic short: ψ123 with MOV or CREATE
        if (line.startsWith("ψ") || line.contains("⊙(")) {
            return translateRunic(line);
        }

        // Default: keep raw (redacted)
        return redactTechnical(line);
    }

    private String translateRunic(String content) {
        // Δt + place redaction
        String time = "";
        Matcher mt = Pattern.compile("Δt\\+(\\d+)").matcher(content);
        if (mt.find()) time = "dans " + mt.group(1) + " tours, ";
        String action = content.contains("MOV(") ? "un déplacement quantique s'opère"
                : content.contains("CREATE(") ? "la réalité se plie et engendre une forme"
                : content.contains("BATTLE(") ? "les destins s'entrechoquent"
                : "une énergie ancienne se manifeste";
        return time + action + " (ψ)";
    }

    private String redactTechnical(String line) {
        // Hide coordinates and low-level tokens
        String red = line.replaceAll("@\\d+(?:\\.\\d+)?,\\d+(?:\\.\\d+)?", "les terres mystiques");
        String[][] lex = new String[][]{
                {"QUANTUM", "quantique"},
                {"RUNIC", "runique"},
                {"EXCALIBUR", "épée sacrée"},
                {"BANKAI", "révélation ultime"},
                {"ETH", "énergie éthérique"},
                {"FACES", "visages du destin"},
                {"GROFI", "philosophie Grofi"}
        };
        for (String[] kv : lex) red = red.replace(kv[0], kv[1]);
        return red;
    }

    private String pick(List<String> vars, Random rng) { return vars.get(vars.size() == 1 ? 0 : Math.abs(rng.nextInt()) % vars.size()); }

    private Map<String, List<String>> buildHeroVariations() {
        Map<String, List<String>> map = new HashMap<>();
        map.put("Arthur", List.of(
                "🛡️ Arthur, porteur d'Excalibur, répond à l'appel",
                "👑 Arthur s'avance, sûr de sa destinée"
        ));
        map.put("Merlin", List.of(
                "🔮 Merlin murmure aux fils du temps",
                "🌀 Merlin ouvre un passage au-delà du voile"
        ));
        return map;
    }

    private Map<String, String> buildIconMap() {
        Map<String, String> m = new HashMap<>();
        m.put("FIRE", "🔥");
        m.put("HEAL", "💚");
        m.put("TELEPORT", "🌀");
        m.put("SHIELD", "🛡️");
        return m;
    }
}


