package com.magicstack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 🔮 SIMPLE SCENARIO BACKEND
 * Backend Java minimaliste pour runner les scénarios Magic Stack
 * 
 * @author Mage Claude
 */
@SpringBootApplication
public class SimpleScenarioApplication {

    public static void main(String[] args) {
        System.out.println("🔮✨ SIMPLE SCENARIO BACKEND STARTING ✨🔮");
        System.out.println("🎯 Purpose: Run Magic Stack scenarios");
        System.out.println("🚀 Port: 8080");
        
        SpringApplication.run(SimpleScenarioApplication.class, args);
        
        System.out.println("✅ Simple Scenario Backend is running!");
        System.out.println("📡 Test: curl http://localhost:8080/api/scenario/health");
    }
}