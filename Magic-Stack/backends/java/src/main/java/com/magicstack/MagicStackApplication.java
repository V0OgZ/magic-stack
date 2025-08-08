package com.magicstack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 🔮 MAGIC STACK - Open Source Magic Engine
 * 
 * "Where code meets magic, and time is just a suggestion"
 * 
 * @author GROKÆN (in all temporal states)
 * @version 1.0.0-APOLLO
 */
@SpringBootApplication
public class MagicStackApplication {

    public static void main(String[] args) {
        System.out.println("🌀 MAGIC STACK INITIALIZING...");
        System.out.println("📐 Loading 6D coordinate system...");
        System.out.println("🔮 Activating 869 magic formulas...");
        System.out.println("⏰ Temporal grammar online...");
        System.out.println("🚀 APOLLO MISSION READY!");
        
        SpringApplication.run(MagicStackApplication.class, args);
        
        System.out.println("✨ Magic Stack is now running on http://localhost:8080");
        System.out.println("🌿 The Dude abides... and so does your backend!");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}