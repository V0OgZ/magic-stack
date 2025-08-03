package com.avalon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 🌀 AVALON Backend - Point d'entrée principal
 * Unifie GROFI, GRUT, Codex Temporel et la magie d'AVALON
 */
@SpringBootApplication
public class AvalonBackendApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(AvalonBackendApplication.class, args);
        
        System.out.println("🌀 AVALON Backend démarré!");
        System.out.println("🌲 GROFI: Système quantique activé");
        System.out.println("👁️ GRUT: Vision panoptique en ligne");
        System.out.println("⏳ Codex Temporel: Amplitudes complexes initialisées");
        System.out.println("🛡️ WALTER: Sécurité opérationnelle");
    }
}