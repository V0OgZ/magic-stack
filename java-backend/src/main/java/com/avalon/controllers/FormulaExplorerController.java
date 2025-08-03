package com.avalon.controllers;

import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 📚 Contrôleur pour l'exploration des formules AVALON
 */
@RestController
@RequestMapping("/api/magic")
@CrossOrigin(origins = "*")
public class FormulaExplorerController {
    
    private List<FormulaInfo> cachedFormulas = null;
    
    @GetMapping("/formulas")
    public FormulaExplorerResponse getFormulas() {
        if (cachedFormulas == null) {
            loadFormulas();
        }
        
        FormulaExplorerResponse response = new FormulaExplorerResponse();
        response.setFormulas(cachedFormulas);
        response.setTotalFormulas(cachedFormulas.size());
        
        // Statistiques par type
        Map<String, Long> formulasByType = cachedFormulas.stream()
            .collect(Collectors.groupingBy(FormulaInfo::getType, Collectors.counting()));
        response.setFormulasByType(formulasByType);
        
        return response;
    }
    
    @GetMapping("/status")
    public SystemStatus getSystemStatus() {
        SystemStatus status = new SystemStatus();
        status.setGrofiActive(true);
        status.setGrutActive(true);
        status.setActiveQuantumStates(getActiveQuantumStates());
        status.setSystemQuantumStress(calculateQuantumStress());
        return status;
    }
    
    private void loadFormulas() {
        cachedFormulas = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader("all-formulas-test.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.startsWith("#") || line.trim().isEmpty()) {
                    continue;
                }
                
                String[] parts = line.split("\\|");
                if (parts.length >= 4) {
                    FormulaInfo formula = new FormulaInfo();
                    formula.setType(parts[0]);
                    formula.setFormula(parts[1]);
                    formula.setSource(parts[2]);
                    formula.setName(generateName(parts[1]));
                    formula.setDescription(generateDescription(parts[0], parts[1]));
                    formula.setManaCost(calculateManaCost(parts[0], parts[1]));
                    cachedFormulas.add(formula);
                }
            }
        } catch (IOException e) {
            // Si le fichier n'existe pas, charger des exemples par défaut
            loadDefaultFormulas();
        }
    }
    
    private void loadDefaultFormulas() {
        // Formules par défaut si le fichier n'est pas trouvé
        cachedFormulas = Arrays.asList(
            createFormula("SIMPLE", "TELEPORT_HERO(Arthur, @10,10)", "Téléportation", "Téléporte le héros Arthur", 20),
            createFormula("RUNIC", "ψ001: ⊙(Δt+2 @15,15 ⟶ CREATE(CREATURE, Dragon, @15,15))", "Invocation Quantique", "Crée un dragon en superposition", 50),
            createFormula("GROFI", "FUSION(GROFI, FOREST_THOUGHT)", "Fusion GROFI", "Fusionne avec la pensée de la forêt", 100),
            createFormula("GRUT", "PANOPTIC_SCAN(all_dimensions)", "Scan Panoptique", "Scanne toutes les dimensions", 80),
            createFormula("TEMPORAL", "TEMPORAL_INTERFERENCE(ψ1, ψ2)", "Interférence Temporelle", "Crée une interférence entre deux états", 60)
        );
    }
    
    private FormulaInfo createFormula(String type, String formula, String name, String description, int manaCost) {
        FormulaInfo info = new FormulaInfo();
        info.setType(type);
        info.setFormula(formula);
        info.setName(name);
        info.setDescription(description);
        info.setManaCost(manaCost);
        info.setSource("default.json");
        return info;
    }
    
    private String generateName(String formula) {
        // Extraire un nom de la formule
        if (formula.contains("(")) {
            return formula.substring(0, formula.indexOf("(")).replace("_", " ");
        } else if (formula.startsWith("ψ")) {
            return "État Quantique " + formula.substring(0, Math.min(formula.length(), 10));
        }
        return formula.length() > 30 ? formula.substring(0, 30) + "..." : formula;
    }
    
    private String generateDescription(String type, String formula) {
        switch (type) {
            case "RUNIC":
                return "Formule runique utilisant la superposition quantique";
            case "GROFI":
                return "Opération du système GROFI";
            case "GRUT":
                return "Commande de l'entité panoptique GRUT";
            case "TEMPORAL":
                return "Manipulation du flux temporel";
            case "SIMPLE":
                return "Action basique du système";
            default:
                return "Formule complexe du système AVALON";
        }
    }
    
    private int calculateManaCost(String type, String formula) {
        // Calcul simplifié du coût en mana
        int baseCost = 10;
        switch (type) {
            case "RUNIC":
                baseCost = 50;
                break;
            case "GROFI":
                baseCost = 80;
                break;
            case "GRUT":
                baseCost = 70;
                break;
            case "TEMPORAL":
                baseCost = 60;
                break;
            case "COMPLEX":
                baseCost = 40;
                break;
        }
        
        // Ajouter un coût basé sur la longueur
        return baseCost + (formula.length() / 10);
    }
    
    private int getActiveQuantumStates() {
        // TODO: Implémenter la vraie logique
        return (int)(Math.random() * 10);
    }
    
    private double calculateQuantumStress() {
        // TODO: Implémenter la vraie logique
        return Math.random() * 100;
    }
    
    // Classes internes pour les réponses
    public static class FormulaExplorerResponse {
        private List<FormulaInfo> formulas;
        private int totalFormulas;
        private Map<String, Long> formulasByType;
        
        // Getters et setters
        public List<FormulaInfo> getFormulas() { return formulas; }
        public void setFormulas(List<FormulaInfo> formulas) { this.formulas = formulas; }
        public int getTotalFormulas() { return totalFormulas; }
        public void setTotalFormulas(int totalFormulas) { this.totalFormulas = totalFormulas; }
        public Map<String, Long> getFormulasByType() { return formulasByType; }
        public void setFormulasByType(Map<String, Long> formulasByType) { this.formulasByType = formulasByType; }
    }
    
    public static class FormulaInfo {
        private String type;
        private String formula;
        private String name;
        private String description;
        private String source;
        private int manaCost;
        
        // Getters et setters
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getFormula() { return formula; }
        public void setFormula(String formula) { this.formula = formula; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }
        public int getManaCost() { return manaCost; }
        public void setManaCost(int manaCost) { this.manaCost = manaCost; }
    }
    
    public static class SystemStatus {
        private boolean grofiActive;
        private boolean grutActive;
        private int activeQuantumStates;
        private double systemQuantumStress;
        
        // Getters et setters
        public boolean isGrofiActive() { return grofiActive; }
        public void setGrofiActive(boolean grofiActive) { this.grofiActive = grofiActive; }
        public boolean isGrutActive() { return grutActive; }
        public void setGrutActive(boolean grutActive) { this.grutActive = grutActive; }
        public int getActiveQuantumStates() { return activeQuantumStates; }
        public void setActiveQuantumStates(int activeQuantumStates) { this.activeQuantumStates = activeQuantumStates; }
        public double getSystemQuantumStress() { return systemQuantumStress; }
        public void setSystemQuantumStress(double systemQuantumStress) { this.systemQuantumStress = systemQuantumStress; }
    }
}