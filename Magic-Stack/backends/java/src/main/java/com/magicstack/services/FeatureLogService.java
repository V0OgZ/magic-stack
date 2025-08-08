package com.magicstack.services;

import com.magicstack.models.FeatureLog;
import com.magicstack.repositories.FeatureLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class FeatureLogService {
    
    @Autowired
    private FeatureLogRepository featureLogRepository;
    
    @Autowired
    private IntersticeService intersticeService;
    
    public FeatureLog logFeature(FeatureLog featureLog) {
        // Calculer les coordonnées 6D basées sur le type de feature
        if (featureLog.getX() == 0.0 && featureLog.getY() == 0.0) {
            // Auto-calculer position si non fournie
            Map<String, Double> coords = intersticeService.calculateCoordinates(
                featureLog.getMageId() + "_" + featureLog.getFeature()
            );
            featureLog.setX(coords.get("x"));
            featureLog.setY(coords.get("y"));
            featureLog.setZ(coords.get("z"));
            featureLog.setT(coords.get("t"));
            featureLog.setC(coords.get("c"));
            featureLog.setPsi(coords.get("psi"));
        }
        
        // Définir la couleur selon le type
        if (featureLog.getColor() == null) {
            featureLog.setColor(getColorForFeature(featureLog.getFeature()));
        }
        
        // La luminosité diminue avec le temps (sera gérée par un job)
        featureLog.setLuminosity(1.0);
        featureLog.setTimestamp(LocalDateTime.now());
        
        return featureLogRepository.save(featureLog);
    }
    
    public List<FeatureLog> getFeaturesByMage(String mageId) {
        return featureLogRepository.findByMageIdOrderByTimestampDesc(mageId);
    }
    
    public List<FeatureLog> getRecentFeatures(int limit) {
        return featureLogRepository.findTopNByOrderByTimestampDesc(limit);
    }
    
    public List<FeatureLog> getAllActiveFeatures() {
        // Features avec luminosité > 0.1 sont considérées actives
        return featureLogRepository.findByLuminosityGreaterThanOrderByTimestampDesc(0.1);
    }
    
    // Méthode pour diminuer la luminosité (appelée périodiquement)
    public void dimFeatures() {
        List<FeatureLog> activeFeatures = featureLogRepository.findByStatusAndLuminosityGreaterThan("active", 0.0);
        for (FeatureLog feature : activeFeatures) {
            // Diminuer la luminosité en fonction du temps écoulé
            long minutesElapsed = java.time.Duration.between(feature.getTimestamp(), LocalDateTime.now()).toMinutes();
            double newLuminosity = Math.max(0.0, 1.0 - (minutesElapsed * 0.05)); // -5% par minute
            feature.setLuminosity(newLuminosity);
            
            if (newLuminosity <= 0.0) {
                feature.setStatus("dimmed");
            }
        }
        featureLogRepository.saveAll(activeFeatures);
    }
    
    private String getColorForFeature(String feature) {
        if (feature.contains("backend") || feature.contains("api")) {
            return "#00ff00"; // Vert pour backend
        } else if (feature.contains("ui") || feature.contains("frontend")) {
            return "#00ffff"; // Cyan pour frontend
        } else if (feature.contains("doc")) {
            return "#ffff00"; // Jaune pour documentation
        } else if (feature.contains("fix") || feature.contains("bug")) {
            return "#ff0000"; // Rouge pour fixes
        } else if (feature.contains("test")) {
            return "#ff00ff"; // Magenta pour tests
        }
        return "#ffffff"; // Blanc par défaut
    }
}