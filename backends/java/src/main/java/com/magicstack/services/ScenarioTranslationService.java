package com.magicstack.services;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ScenarioTranslationService {

    private final FormulaTranslationService formulaTranslator;

    public ScenarioTranslationService(FormulaTranslationService formulaTranslator) {
        this.formulaTranslator = formulaTranslator;
    }

    /**
     * Translate a whole HOT script into Morgana-style Markdown.
     */
    public String translateHotsScriptToMarkdown(String hotsScript, Long seed) {
        return formulaTranslator.translateHotsToMarkdown(hotsScript, seed);
    }
}


