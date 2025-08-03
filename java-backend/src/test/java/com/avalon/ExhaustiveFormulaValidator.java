package com.avalon;

import com.avalon.controllers.MagicCastController;
import com.avalon.models.MagicCastRequest;
import com.avalon.models.MagicCastResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

/**
 * 🌀 AVALON - Validateur Exhaustif de Formules
 * 
 * Ce test charge et exécute TOUTES les formules extraites
 * pour valider le fonctionnement complet du moteur unifié.
 */
@SpringBootTest
public class ExhaustiveFormulaValidator {
    
    @Autowired
    private MagicCastController magicCastController;
    
    private List<FormulaTest> allFormulas = new ArrayList<>();
    private Map<String, AtomicInteger> successByType = new HashMap<>();
    private Map<String, AtomicInteger> failureByType = new HashMap<>();
    private List<String> failedFormulas = new ArrayList<>();
    
    @BeforeEach
    void setUp() {
        // Initialiser les compteurs
        for (String type : Arrays.asList("SIMPLE", "RUNIC", "GROFI", "GRUT", "TEMPORAL", "COMPLEX")) {
            successByType.put(type, new AtomicInteger(0));
            failureByType.put(type, new AtomicInteger(0));
        }
    }
    
    @Test
    void validateAllFormulas() throws IOException {
        System.out.println("\n🌀 AVALON - VALIDATION EXHAUSTIVE DU MOTEUR UNIFIÉ");
        System.out.println("==================================================\n");
        
        // 1. Charger toutes les formules
        loadFormulas("all-formulas-test.txt");
        System.out.println("📊 Formules chargées: " + allFormulas.size());
        
        // 2. Exécuter les tests par batch
        int batchSize = 50;
        int totalBatches = (allFormulas.size() + batchSize - 1) / batchSize;
        
        for (int batch = 0; batch < totalBatches; batch++) {
            System.out.println("\n🔄 Batch " + (batch + 1) + "/" + totalBatches);
            
            int start = batch * batchSize;
            int end = Math.min(start + batchSize, allFormulas.size());
            
            for (int i = start; i < end; i++) {
                FormulaTest test = allFormulas.get(i);
                executeFormulaTest(test, i + 1);
            }
            
            // Afficher la progression
            printProgress(end);
        }
        
        // 3. Générer le rapport final
        generateReport();
        
        // 4. Assertions finales
        int totalSuccess = successByType.values().stream().mapToInt(AtomicInteger::get).sum();
        int totalFailure = failureByType.values().stream().mapToInt(AtomicInteger::get).sum();
        
        System.out.println("\n✅ VALIDATION TERMINÉE");
        System.out.println("Total succès: " + totalSuccess + "/" + allFormulas.size());
        System.out.println("Total échecs: " + totalFailure);
        
        // Le test réussit si au moins 90% des formules passent
        double successRate = (double) totalSuccess / allFormulas.size();
        assertTrue(successRate >= 0.9, 
            String.format("Taux de succès insuffisant: %.2f%% (minimum requis: 90%%)", successRate * 100));
    }
    
    private void loadFormulas(String filename) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Ignorer les commentaires et lignes vides
                if (line.startsWith("#") || line.trim().isEmpty()) {
                    continue;
                }
                
                // Parser le format: TYPE|FORMULA|SOURCE|EXPECTED
                String[] parts = line.split("\\|");
                if (parts.length >= 4) {
                    FormulaTest test = new FormulaTest();
                    test.type = parts[0];
                    test.formula = parts[1];
                    test.source = parts[2];
                    test.expected = parts[3];
                    allFormulas.add(test);
                }
            }
        }
    }
    
    private void executeFormulaTest(FormulaTest test, int testNumber) {
        try {
            // Créer la requête
            MagicCastRequest request = new MagicCastRequest();
            request.setFormulaType(mapToRequestType(test.type));
            request.setFormula(test.formula);
            request.setCasterId("VALIDATOR_" + testNumber);
            
            // Pour les formules complexes, ajouter des paramètres par défaut
            if (test.type.equals("COMPLEX") || test.type.equals("RUNIC")) {
                Map<String, Object> params = new HashMap<>();
                params.put("test_mode", true);
                params.put("auto_resolve", true);
                request.setParameters(params);
            }
            
            // Exécuter la formule
            MagicCastResponse response = magicCastController.castMagic(request);
            
            // Vérifier le résultat
            if (response.isSuccess()) {
                successByType.get(test.type).incrementAndGet();
                
                // Log uniquement les formules spéciales qui réussissent
                if (test.type.equals("RUNIC") || test.type.equals("GROFI") || test.type.equals("GRUT")) {
                    System.out.println("✅ [" + test.type + "] " + test.formula.substring(0, Math.min(test.formula.length(), 50)) + "...");
                }
            } else {
                failureByType.get(test.type).incrementAndGet();
                failedFormulas.add(String.format("[%s] %s - Raison: %s", 
                    test.type, test.formula, response.getMessage()));
                
                // Log les échecs importants
                if (!test.type.equals("COMPLEX")) {
                    System.err.println("❌ [" + test.type + "] " + test.formula + " - " + response.getMessage());
                }
            }
            
        } catch (Exception e) {
            failureByType.get(test.type).incrementAndGet();
            failedFormulas.add(String.format("[%s] %s - Exception: %s", 
                test.type, test.formula, e.getMessage()));
        }
    }
    
    private String mapToRequestType(String testType) {
        // Mapper les types du test vers les types de requête
        switch (testType) {
            case "SIMPLE":
            case "COMPLEX":
                return "SIMPLE";
            case "RUNIC":
                return "RUNIC";
            case "GROFI":
                return "GROFI";
            case "GRUT":
                return "GRUT";
            case "TEMPORAL":
                return "TEMPORAL";
            default:
                return "SIMPLE";
        }
    }
    
    private void printProgress(int processed) {
        System.out.println("\n📊 Progression: " + processed + "/" + allFormulas.size());
        for (Map.Entry<String, AtomicInteger> entry : successByType.entrySet()) {
            String type = entry.getKey();
            int success = entry.getValue().get();
            int failure = failureByType.get(type).get();
            int total = success + failure;
            
            if (total > 0) {
                double rate = (double) success / total * 100;
                System.out.printf("  %s: %d/%d (%.1f%%)\n", type, success, total, rate);
            }
        }
    }
    
    private void generateReport() throws IOException {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
        String reportFile = "validation-report-" + timestamp + ".txt";
        
        try (FileWriter writer = new FileWriter(reportFile)) {
            writer.write("🌀 AVALON - RAPPORT DE VALIDATION EXHAUSTIVE\n");
            writer.write("============================================\n\n");
            writer.write("Date: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + "\n");
            writer.write("Total formules testées: " + allFormulas.size() + "\n\n");
            
            // Résultats par type
            writer.write("RÉSULTATS PAR TYPE:\n");
            writer.write("-------------------\n");
            
            int totalSuccess = 0;
            int totalFailure = 0;
            
            for (String type : successByType.keySet()) {
                int success = successByType.get(type).get();
                int failure = failureByType.get(type).get();
                int total = success + failure;
                
                totalSuccess += success;
                totalFailure += failure;
                
                if (total > 0) {
                    double rate = (double) success / total * 100;
                    writer.write(String.format("%s: %d/%d (%.1f%%) ✅\n", type, success, total, rate));
                }
            }
            
            writer.write("\nTOTAL GLOBAL: " + totalSuccess + "/" + allFormulas.size() + "\n");
            writer.write("Taux de succès global: " + String.format("%.1f%%", (double) totalSuccess / allFormulas.size() * 100) + "\n\n");
            
            // Formules échouées (limité aux 50 premières)
            if (!failedFormulas.isEmpty()) {
                writer.write("FORMULES ÉCHOUÉES (max 50):\n");
                writer.write("---------------------------\n");
                for (int i = 0; i < Math.min(50, failedFormulas.size()); i++) {
                    writer.write(failedFormulas.get(i) + "\n");
                }
                if (failedFormulas.size() > 50) {
                    writer.write("\n... et " + (failedFormulas.size() - 50) + " autres échecs\n");
                }
            }
            
            writer.write("\n✅ VALIDATION TERMINÉE\n");
        }
        
        System.out.println("\n📄 Rapport généré: " + reportFile);
    }
    
    // Classe interne pour représenter un test de formule
    private static class FormulaTest {
        String type;
        String formula;
        String source;
        String expected;
    }
}