package com.avalon.services;

import com.avalon.models.MagicCastRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 🔥 HotsScenarioParser - Parser pour les fichiers de scénario .hots
 * Transforme un script .hots en une liste de requêtes MagicCastRequest
 */
@Service
@Slf4j
public class HotsScenarioParser {

    // Patterns pour extraire les commandes
    private static final Pattern HERO_PATTERN = Pattern.compile("HERO\\((.*?)\\)");
    private static final Pattern CREATE_PATTERN = Pattern.compile("CREATE\\((.*?),\\s*(.*?),\\s*@?(\\d+,\\d+)\\)");
    private static final Pattern MOV_PATTERN = Pattern.compile("MOV\\((.*?),\\s*@?(\\d+,\\d+)\\)");
    private static final Pattern CAST_PATTERN = Pattern.compile("CAST\\((.*?),\\s*\"(.*?)\"\\)");
    private static final Pattern PSI_PATTERN = Pattern.compile("(ψ_\\w+):\\s*(⊙\\(.*?\\))");
    private static final Pattern DIALOGUE_PATTERN = Pattern.compile("DIALOGUE\\((.*?),\\s*\"(.*?)\"\\)");


    public List<MagicCastRequest> parse(String hotsScript) {
        log.info("🔥 Parsing scénario .hots...");
        List<MagicCastRequest> requests = new ArrayList<>();
        String[] lines = hotsScript.split("\\r?\\n");

        for (String line : lines) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty() || trimmedLine.startsWith("#") || trimmedLine.startsWith("//")) {
                continue;
            }

            Matcher heroMatcher = HERO_PATTERN.matcher(trimmedLine);
            if (heroMatcher.find()) {
                requests.add(createSimpleRequest("CREATE_HERO", heroMatcher.group(1)));
                continue;
            }

            Matcher createMatcher = CREATE_PATTERN.matcher(trimmedLine);
            if (createMatcher.find()) {
                requests.add(createSimpleRequest("CREATE_ENTITY", createMatcher.group(2).trim()));
                continue;
            }

            Matcher movMatcher = MOV_PATTERN.matcher(trimmedLine);
            if (movMatcher.find()) {
                 requests.add(createSimpleRequest("MOV", movMatcher.group(1)));
                continue;
            }
            
            Matcher castMatcher = CAST_PATTERN.matcher(trimmedLine);
            if (castMatcher.find()) {
                requests.add(createSimpleRequest("CAST", castMatcher.group(2)));
                continue;
            }

            Matcher psiMatcher = PSI_PATTERN.matcher(trimmedLine);
            if (psiMatcher.find()) {
                MagicCastRequest request = new MagicCastRequest();
                request.setFormulaType("RUNIC");
                request.setFormula(psiMatcher.group(2).trim());
                requests.add(request);
                continue;
            }
             Matcher dialogueMatcher = DIALOGUE_PATTERN.matcher(trimmedLine);
            if (dialogueMatcher.find()) {
                 requests.add(createSimpleRequest("DIALOGUE", dialogueMatcher.group(1)));
                continue;
            }


        }

        log.info("✅ Scénario parsé: {} requêtes générées", requests.size());
        return requests;
    }
    
    private MagicCastRequest createSimpleRequest(String formula, String casterId) {
        MagicCastRequest request = new MagicCastRequest();
        request.setFormulaType("SIMPLE");
        request.setFormula(formula);
        request.setCasterId(casterId);
        return request;
    }
}